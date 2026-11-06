"""Checks that concat_raw_csv.py keeps the old file's line ending and copies its rows byte for byte.

Run from anywhere:  python backend/pipeline/test_concat_raw_csv.py
"""
import os
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "concat_raw_csv.py")
HEADER = "<DATE>\t<TIME>\t<OPEN>\t<HIGH>\t<LOW>\t<CLOSE>\t<TICKVOL>\t<VOL>\t<SPREAD>"


def row(date, time):
    return f"{date}\t{time}\t1.10000\t1.10010\t1.09990\t1.10005\t10\t0\t5"


OLD_ROWS = [row("2026.09.03", "23:58:00"), row("2026.09.03", "23:59:00"), row("2026.09.04", "00:00:00")]
NEW_ROWS = [row("2026.09.04", "00:01:00"), row("2026.09.04", "00:02:00"), row("2026.09.04", "00:03:00")]

passed = failed = 0


def check(name, ok, detail=""):
    global passed, failed
    if ok:
        passed += 1
        print(f"  ok    {name}")
    else:
        failed += 1
        print(f"  FAIL  {name} {detail}")


def make(path, rows, eol, final_eol=True):
    text = eol.join([HEADER] + rows) + (eol if final_eol else "")
    with open(path, "wb") as f:
        f.write(text.encode("utf-8"))


def merge(old_eol, new_eol, old_final_eol=True):
    with tempfile.TemporaryDirectory() as d:
        old, new, out = (os.path.join(d, n) for n in ("old.csv", "new.csv", "out.csv"))
        make(old, OLD_ROWS, old_eol, old_final_eol)
        make(new, NEW_ROWS, new_eol)
        r = subprocess.run([sys.executable, "-I", SCRIPT, old, new, out, "--keep-trailing"], capture_output=True, text=True)
        with open(old, "rb") as f:
            old_bytes = f.read()
        with open(out, "rb") as f:
            out_bytes = f.read()
        return r, old_bytes, out_bytes


def main():
    print("CRLF old file, LF new file (the forex raw files)")
    r, old_b, out_b = merge("\r\n", "\n")
    check("exit code 0", r.returncode == 0, r.stderr)
    check("old bytes kept as the start of the output", out_b.startswith(old_b))
    check("every line ends CRLF, no bare LF", out_b.count(b"\n") == out_b.count(b"\r\n"))
    check("three new rows added", out_b.count(b"\n") == 1 + len(OLD_ROWS) + len(NEW_ROWS))
    check("output is not smaller than the original", len(out_b) >= len(old_b))

    print("LF old file, LF new file (the other raw files)")
    r, old_b, out_b = merge("\n", "\n")
    check("exit code 0", r.returncode == 0, r.stderr)
    check("old bytes kept as the start of the output", out_b.startswith(old_b))
    check("no CR anywhere", b"\r" not in out_b)
    check("three new rows added", out_b.count(b"\n") == 1 + len(OLD_ROWS) + len(NEW_ROWS))

    print("LF old file, CRLF new file")
    r, old_b, out_b = merge("\n", "\r\n")
    check("exit code 0", r.returncode == 0, r.stderr)
    check("output stays LF", b"\r" not in out_b and out_b.startswith(old_b))

    print("CRLF old file with no final line ending")
    r, old_b, out_b = merge("\r\n", "\n", old_final_eol=False)
    check("exit code 0", r.returncode == 0, r.stderr)
    check("every line ends CRLF, no bare LF", out_b.count(b"\n") == out_b.count(b"\r\n"))
    check("three new rows added", out_b.count(b"\n") == 1 + len(OLD_ROWS) + len(NEW_ROWS))

    print(f"\n{passed} of {passed + failed} passed")
    sys.exit(1 if failed else 0)


main()
