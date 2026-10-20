"""
concat_raw_csv.py — Merges a new MT5 M1 raw export into an existing raw CSV,
producing one continuous file for clean_mt5_csv.py.

Handles three cases automatically, based on comparing timestamp ranges:

  - APPEND (the common case, e.g. a weekly/monthly incremental update): the
    new file's data comes after the old file's last timestamp. Overlapping
    rows are dropped (old file wins), and the new file's own trailing/most-
    recent date is always dropped whole -- a fresh "up to today" export risks
    ending mid-day, and that date is picked up complete on the next update.

  - PREPEND (backfilling earlier history discovered after the fact, e.g. a
    source that goes back to 2000 turns up when the existing file only starts
    in 2007): the new file's data comes before the old file's first
    timestamp. Overlapping rows are still dropped (old file wins), but
    nothing is auto-dropped from the new file's edge -- there's no "live now"
    edge on this side, so cutting a day short there would delete real
    history, not trim an export artifact. The summary reports the bar count
    of the boundary day (the new file's last date, immediately before the old
    file's first date) so you can sanity-check it wasn't cut short by the
    source.

  - BOTH: the new file spans past the old file's range on both sides (e.g. a
    from-scratch full-history re-export). Each side gets its own rule above.

Streams both files line by line rather than loading them into memory --
built for the ~150-600MB M1 exports these pairs produce over decades. The
new file's rows are briefly staged into two temp files (before-segment,
after-segment) so the final output can be written in old-header, prepend,
old-body, append order without holding anything large in memory.

Usage:
    python3 concat_raw_csv.py <old_csv> <new_csv> <output_csv>

Does not modify or delete either input file.
"""
import sys
import os
import tempfile
from collections import defaultdict


def read_header(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.readline()


def first_data_line(path):
    with open(path, "r", encoding="utf-8") as f:
        f.readline()  # header
        for line in f:
            if line.strip():
                return line.rstrip("\n")
    raise ValueError(f"{path}: no data rows found")


def last_data_line(path):
    """Tail-read the final non-empty line without loading the whole file."""
    with open(path, "rb") as f:
        f.seek(0, 2)
        size = f.tell()
        block = 4096
        data = b""
        while True:
            step = min(block, size)
            f.seek(size - step)
            data = f.read(step) + data
            if data.count(b"\n") >= 2 or step >= size:
                break
            block *= 2
        lines = [ln for ln in data.splitlines() if ln.strip()]
        return lines[-1].decode("utf-8")


def row_key(line):
    parts = line.split("\t")
    return parts[0] + " " + parts[1]  # "YYYY.MM.DD HH:MM:SS" sorts lexicographically == chronologically


def row_date(line):
    return line.split("\t")[0]


def main():
    if len(sys.argv) != 4:
        print("Usage: python3 concat_raw_csv.py <old_csv> <new_csv> <output_csv>")
        sys.exit(1)
    old_path, new_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

    old_header = read_header(old_path)
    new_header = read_header(new_path)
    if old_header != new_header:
        print("ERROR: header mismatch between old and new files -- refusing to concatenate.")
        print("  old:", repr(old_header))
        print("  new:", repr(new_header))
        sys.exit(1)

    old_first_key = row_key(first_data_line(old_path))
    old_last_key = row_key(last_data_line(old_path))
    new_max_date = row_date(last_data_line(new_path))

    new_total = 0
    before_kept = 0
    after_kept = 0
    dropped_overlap = 0
    dropped_trailing = 0
    before_date_counts = defaultdict(int)

    before_fd, before_path = tempfile.mkstemp(prefix="concat_before_", suffix=".tmp")
    after_fd, after_path = tempfile.mkstemp(prefix="concat_after_", suffix=".tmp")
    os.close(before_fd)
    os.close(after_fd)

    try:
        with open(before_path, "w", encoding="utf-8", newline="") as before_f, \
             open(after_path, "w", encoding="utf-8", newline="") as after_f, \
             open(new_path, "r", encoding="utf-8") as f:
            next(f)  # skip header
            for line in f:
                if not line.strip():
                    continue
                new_total += 1
                key = row_key(line)
                line_out = line if line.endswith("\n") else line + "\n"

                if key < old_first_key:
                    before_f.write(line_out)
                    before_kept += 1
                    before_date_counts[row_date(line)] += 1
                elif key > old_last_key:
                    if row_date(line) == new_max_date:
                        dropped_trailing += 1
                        continue
                    after_f.write(line_out)
                    after_kept += 1
                else:
                    dropped_overlap += 1

        old_count = 0
        with open(out_path, "w", encoding="utf-8", newline="") as out:
            out.write(old_header)
            with open(before_path, "r", encoding="utf-8") as bf:
                for line in bf:
                    out.write(line)
            with open(old_path, "r", encoding="utf-8") as f:
                next(f)
                for line in f:
                    out.write(line if line.endswith("\n") else line + "\n")
                    old_count += 1
            with open(after_path, "r", encoding="utf-8") as af:
                for line in af:
                    out.write(line)
    finally:
        os.remove(before_path)
        os.remove(after_path)

    print(f"Old file:      {old_count:>10} data rows, {old_first_key} -> {old_last_key}")
    print(f"New file:      {new_total:>10} data rows total")
    print(f"  dropped (overlap with old, old wins): {dropped_overlap}")
    if before_kept:
        boundary_date = max(before_date_counts)
        print(f"  PREPEND side kept: {before_kept} rows (before {old_first_key})")
        print(f"    boundary day adjacent to old data: {boundary_date} "
              f"({before_date_counts[boundary_date]} bars -- sanity-check this wasn't cut short by the source)")
    if dropped_trailing:
        print(f"  dropped (trailing partial day, {new_max_date}): {dropped_trailing}")
    if after_kept:
        print(f"  APPEND side kept: {after_kept} rows (after {old_last_key})")
    if not before_kept and not after_kept:
        print("  NOTE: nothing kept -- new file's entire range is already covered by old file.")
    if dropped_overlap > 20000:
        print(f"  NOTE: overlap of {dropped_overlap} rows is larger than a typical few-day safety margin (~1-2 weeks of M1 data) -- worth a sanity check that the intended range was exported.")
    print(f"Output:        {old_count + before_kept + after_kept:>10} total data rows -> {out_path}")


if __name__ == "__main__":
    main()
