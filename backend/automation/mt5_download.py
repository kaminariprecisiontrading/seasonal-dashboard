"""
mt5_download.py — pulls new M1 bars from the MetaTrader 5 terminal(s) for each configured
asset and writes them as MT5 "Export Bars"-format CSVs into data/raw/incoming/, ready for
pipeline/concat_raw_csv.py (v1.29; docs/AUTOMATION.md).

For each asset in config.json (grouped by terminal, one terminal connection at a time —
the MetaTrader5 package can only talk to one terminal per process session):

  1. Read the last timestamp of data/raw/<KEY>_M1_full.csv (tail read, no full load).
  2. Fetch M1 bars from (last timestamp − overlap_days) to now, in chunks, and keep re-reading
     until the history has settled. MT5 answers from its local cache and loads the rest in the
     background, so a first read after a cold start can be months short: re-read until
     sync_stable_reads reads in a row return the same bar count and the last bar has caught up
     with the symbol's latest tick. If that never happens, the asset is an error and nothing is
     written; the next run tries again.
  3. Verify the overlap: the bars that are already in the full file must match it
     (OHLC identical). A low match rate means a different feed or a shifted server time
     zone, and the asset is skipped rather than merged — see "Overlap check" in AUTOMATION.md.
     Refuse to merge if there's no overlap at all, or a gap longer than max_gap_days anywhere
     from the file's last bar to now: later runs start from the new last bar, so a hole would
     never be filled. A 5-day market's gaps count Monday to Friday only, because its weekend
     isn't missing data. For a real long closure, --accept-gap KEY merges it anyway.
  4. Drop a trailing partial day: the last date is kept only if its final bar is at or
     after `complete_day_after` (e.g. 23:50 server time). A Friday close is kept for 5-day
     markets; a 7-day market's in-progress Sunday is dropped and picked up next week.
  5. Write data/raw/incoming/<KEY>_M1_<first>_<last>.csv with the exact header and number
     formatting of the existing exports.

Times: the MetaTrader5 package returns bar times as seconds in the broker's server time
(labelled UTC), which is exactly what Export Bars writes, so no conversion is applied.

Usage (from backend/, with the .venv that has MetaTrader5 installed):
    python automation/mt5_download.py [--assets EURUSD BTCUSD] [--dry-run] [--accept-gap KEY ...]
Normally called by automation/weekly_run.py.
"""
import argparse
import datetime as dt
import json
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.dirname(HERE)
RAW = os.path.join(BACKEND, "data", "raw")
INCOMING = os.path.join(RAW, "incoming")
HEADER = "<DATE>\t<TIME>\t<OPEN>\t<HIGH>\t<LOW>\t<CLOSE>\t<TICKVOL>\t<VOL>\t<SPREAD>\n"
UTC = dt.timezone.utc
IPC_ERRORS = -10000                     # MetaTrader5's RES_E_INTERNAL_FAIL*: -10000 to -10005


class TerminalLost(RuntimeError):
    """The link to the terminal process broke, e.g. MT5 restarted to update itself."""


def check_ipc(mt5):
    code, msg = mt5.last_error()
    if code <= IPC_ERRORS:
        raise TerminalLost(f"{code} {msg}")
    return code, msg


def is_connected(mt5):
    info = mt5.terminal_info()
    if info is None:
        check_ipc(mt5)
    return bool(info and info.connected)


def load_config(path=None):
    with open(path or os.path.join(HERE, "config.json"), encoding="utf-8") as f:
        return json.load(f)


def full_csv(key):
    return os.path.join(RAW, f"{key}_M1_full.csv")


def tail_lines(path, n=3000):
    """Last n non-empty lines of a (large) text file, without loading it all."""
    with open(path, "rb") as f:
        f.seek(0, 2)
        size = f.tell()
        block, data = 65536, b""
        while True:
            step = min(block, size)
            f.seek(size - step)
            data = f.read(step)
            if data.count(b"\n") > n or step >= size:
                break
            block *= 2
    lines = [ln.decode("utf-8") for ln in data.splitlines() if ln.strip()]
    return [ln for ln in lines[-n:] if not ln.startswith("<DATE>")]


def parse_ts(date_s, time_s):
    return dt.datetime.strptime(date_s + " " + time_s, "%Y.%m.%d %H:%M:%S").replace(tzinfo=UTC)


def fmt_row(bar, digits):
    t = dt.datetime.fromtimestamp(int(bar["time"]), tz=UTC)
    p = lambda v: f"{float(v):.{digits}f}"
    return (f"{t:%Y.%m.%d}\t{t:%H:%M:%S}\t{p(bar['open'])}\t{p(bar['high'])}\t{p(bar['low'])}\t"
            f"{p(bar['close'])}\t{int(bar['tick_volume'])}\t{int(bar['real_volume'])}\t{int(bar['spread'])}\n")


def fetch(mt5, symbol, start, end, chunk_days):
    bars, cur = [], start
    while cur < end:
        nxt = min(end, cur + dt.timedelta(days=chunk_days))
        got = mt5.copy_rates_range(symbol, mt5.TIMEFRAME_M1, cur, nxt)
        if got is None:
            check_ipc(mt5)
            raise RuntimeError(f"copy_rates_range failed for {symbol}: {mt5.last_error()}")
        bars.extend(got)
        cur = nxt
    seen, out = set(), []
    for b in bars:                      # chunk edges can repeat a bar
        t = int(b["time"])
        if t not in seen:
            seen.add(t)
            out.append(b)
    out.sort(key=lambda b: int(b["time"]))
    return out


def minutes_behind(mt5, symbol, bars):
    """How far the last bar is behind the symbol's latest tick or bar. Ticks are live as soon as
    the terminal connects, while M1 history catches up afterwards, so this shows unfinished loads."""
    if not len(bars):
        return float("inf")
    info = mt5.symbol_info(symbol)
    newest = mt5.copy_rates_from_pos(symbol, mt5.TIMEFRAME_M1, 0, 1)
    if info is None or newest is None:
        check_ipc(mt5)
    latest = max(int(info.time) if info is not None else 0, int(newest[0]["time"]) if newest is not None and len(newest) else 0)
    if not latest:                      # unknown must never count as caught up
        return float("inf")
    return (latest - int(bars[-1]["time"])) / 60


def fetch_settled(mt5, symbol, start, end, dcfg):
    """Re-read until the bar count is stable and has reached the latest tick. Returns (bars, problem)."""
    deadline = time.monotonic() + dcfg["sync_timeout_seconds"]
    bars, previous, matching, behind, online = [], None, 0, float("inf"), False
    while True:
        online = is_connected(mt5)
        if online:
            bars = fetch(mt5, symbol, start, end, dcfg["chunk_days"])
            behind = minutes_behind(mt5, symbol, bars)
            matching = matching + 1 if len(bars) == previous else 1
            previous = len(bars)
            if matching >= dcfg["sync_stable_reads"] and behind <= dcfg["end_tolerance_minutes"]:
                return bars, None
        else:
            previous, matching = None, 0    # the connection dropped: whatever was read may be short
        if time.monotonic() >= deadline:
            if not online:
                return bars, "no connection to the broker"
            where = "latest tick unknown" if behind == float("inf") else f"{behind:.0f} min behind the latest tick"
            return bars, f"history still loading: {len(bars)} bars, {where}"
        time.sleep(dcfg["sync_poll_seconds"])


def gap_days(a, b, week):
    """Days between two bar times (epoch seconds). Only Monday to Friday counts for a 5-day market."""
    if week != "5d":
        return (b - a) / 86400
    total, cur = 0, a
    while cur < b:
        midnight = cur - cur % 86400
        nxt = min(b, midnight + 86400)
        if (midnight // 86400 + 3) % 7 < 5:     # 1970-01-01 was a Thursday
            total += nxt - cur
        cur = nxt
    return total / 86400


def largest_gap_days(last_ts, new, week):
    times = [int(last_ts.timestamp())] + [int(b["time"]) for b in new]
    return max((gap_days(x, y, week) for x, y in zip(times, times[1:])), default=0)


def download_asset(mt5, asset, cfg, dry_run=False, log=print, accept_gap=()):
    key, symbol = asset["key"], asset["symbol"]
    dcfg = cfg["download"]
    res = {"key": key, "symbol": symbol, "status": "error", "file": None, "bars": 0}
    src = full_csv(key)
    if not os.path.exists(src):
        res["msg"] = f"missing {os.path.relpath(src, BACKEND)} — do a first full export by hand (CONTRIBUTING.md)"
        return res
    tail = tail_lines(src)
    last = tail[-1].split("\t")
    last_ts = parse_ts(last[0], last[1])

    if not mt5.symbol_select(symbol, True):
        check_ipc(mt5)
        res["msg"] = f"symbol {symbol} not available in this terminal: {mt5.last_error()}"
        return res
    info = mt5.symbol_info(symbol)
    if info is None:
        check_ipc(mt5)
        res["msg"] = f"no symbol info for {symbol}: {mt5.last_error()}"
        return res
    digits = int(info.digits)

    start = last_ts - dt.timedelta(days=dcfg["overlap_days"])
    end = dt.datetime.now(UTC) + dt.timedelta(days=1)   # covers servers ahead of UTC
    bars, problem = fetch_settled(mt5, symbol, start, end, dcfg)
    if problem:
        res["msg"] = problem + ". Nothing written; the next run tries again."
        return res

    # Overlap check against the existing file.
    known = {}
    for ln in tail:
        c = ln.split("\t")
        if len(c) >= 6:
            known[c[0] + " " + c[1]] = tuple(c[2:6])
    checked = matched = 0
    for b in bars:
        row = fmt_row(b, digits).split("\t")
        k = row[0] + " " + row[1]
        if k in known:
            checked += 1
            matched += tuple(row[2:6]) == known[k]
    rate = matched / checked if checked else None
    res["overlap"] = {"checked": checked, "matched": matched}
    if checked and rate < dcfg["min_overlap_match"]:
        res["msg"] = (f"overlap mismatch: {matched}/{checked} bars match the existing file — different feed "
                      f"or server time zone? Not merged.")
        return res
    accepted = key in accept_gap
    if not checked:
        if not accepted:
            res["msg"] = (f"no bars overlap the existing file (it ends {last_ts:%Y-%m-%d %H:%M}), so this feed can't be "
                          f"verified. Not merged. Check it, then re-run with --accept-gap {key}.")
            return res
        log(f"  {key}: no overlapping bars to verify against (accepted with --accept-gap)")

    new = [b for b in bars if dt.datetime.fromtimestamp(int(b["time"]), tz=UTC) > last_ts]

    # Later runs start from the new last bar, so a hole merged now would never be filled.
    week = asset.get("week", "5d")
    weekday = "weekday " if week == "5d" else ""
    max_gap = dcfg["max_gap_days"][week]
    gap = largest_gap_days(last_ts, new, week)
    last_bar_t = dt.datetime.fromtimestamp(int(bars[-1]["time"]), tz=UTC)
    now = dt.datetime.now(UTC)
    age = gap_days(int(last_bar_t.timestamp()), int(now.timestamp()), week)
    res["largest_gap_days"] = round(gap, 1)
    if not accepted and (gap > max_gap or age > max_gap):
        days_ago = (now - last_bar_t).total_seconds() / 86400
        what = f"a {gap:.1f}-day {weekday}gap in the new bars" if gap > max_gap else f"history ending {days_ago:.1f} days ago ({last_bar_t:%Y-%m-%d %H:%M}, {age:.1f} {weekday}days)"
        res["msg"] = (f"{what}, over the {max_gap}-day limit. Not merged, because it would never be filled. "
                      f"If it's a real market closure, re-run with --accept-gap {key}.")
        return res

    # Drop a trailing partial day. The last day counts as complete if its final bar is at or
    # after `complete_day_after`, or if no bar has arrived for 12h+ since (the market has
    # closed — e.g. a Friday whose session ends before 23:50 server time, seen on a Sunday).
    if new:
        last_bar = dt.datetime.fromtimestamp(int(new[-1]["time"]), tz=UTC)
        hh, mm = map(int, dcfg["complete_day_after"].split(":"))
        quiet_hours = (dt.datetime.now(UTC) - last_bar).total_seconds() / 3600  # server time ≤ UTC+3
        if (last_bar.hour, last_bar.minute) < (hh, mm) and quiet_hours < 12:
            day = last_bar.date()
            dropped = sum(1 for b in new if dt.datetime.fromtimestamp(int(b["time"]), tz=UTC).date() == day)
            new = [b for b in new if dt.datetime.fromtimestamp(int(b["time"]), tz=UTC).date() != day]
            res["dropped_partial_day"] = {"date": day.isoformat(), "bars": dropped}

    if not new:
        res.update(status="nothing-new", msg="no complete new days yet")
        return res

    first_t = dt.datetime.fromtimestamp(int(new[0]["time"]), tz=UTC)
    last_t = dt.datetime.fromtimestamp(int(new[-1]["time"]), tz=UTC)
    name = f"{key}_M1_{first_t:%Y%m%d%H%M}_{last_t:%Y%m%d%H%M}.csv"
    out = os.path.join(INCOMING, name)
    res.update(bars=len(new), first=first_t.strftime("%Y-%m-%d %H:%M"), last=last_t.strftime("%Y-%m-%d %H:%M"))
    dropped = res.get("dropped_partial_day")
    detail = (f"{len(new)} bars, {res['first']} to {res['last']}, overlap {matched}/{checked}, largest {weekday}gap {gap:.1f}d"
              + (f", dropped partial {dropped['date']}" if dropped else ""))
    if dry_run:
        res.update(status="ok", msg=detail + " (dry run, not written)")
        return res
    os.makedirs(INCOMING, exist_ok=True)
    tmp = out + ".part"
    with open(tmp, "w", encoding="utf-8", newline="") as f:
        f.write(HEADER)
        for b in new:
            f.write(fmt_row(b, digits))
    os.replace(tmp, out)
    res.update(status="ok", file=out, msg=detail)
    return res


def connect(mt5, term, dcfg):
    """Start or attach to the terminal and wait for its broker connection. Returns a problem or None."""
    deadline = time.monotonic() + dcfg["connect_timeout_seconds"]
    problem = None
    while True:
        try:
            if mt5.initialize(path=term["path"]):
                if is_connected(mt5):
                    return None
                problem = "started, but not connected to the broker (is it logged in?)"
            else:
                problem = f"could not start or attach: {mt5.last_error()}"
        except TerminalLost as e:
            problem = f"lost the terminal: {e}"
        if time.monotonic() >= deadline:
            return problem
        time.sleep(dcfg["sync_poll_seconds"])


def download_all(cfg, only=None, dry_run=False, log=print, accept_gap=()):
    try:
        import MetaTrader5 as mt5
    except ImportError:
        raise SystemExit("MetaTrader5 package not installed in this Python — "
                         "pip install -r automation/requirements-automation.txt")
    results = []
    assets = [a for a in cfg["assets"] if not only or a["key"] in only]
    for term_id, term in cfg["terminals"].items():
        group = [a for a in assets if a["terminal"] == term_id]
        if not group:
            continue
        if not term.get("enabled", True):
            for a in group:
                results.append({"key": a["key"], "status": "skipped", "msg": f"terminal '{term_id}' disabled in config"})
            continue
        log(f"terminal {term_id}: {term['path']}")
        problem = connect(mt5, term, cfg["download"])
        if problem:
            for a in group:
                results.append({"key": a["key"], "status": "error", "msg": f"{term_id} terminal: {problem}"})
            continue
        try:
            for a in group:
                try:
                    try:
                        r = download_asset(mt5, a, cfg, dry_run=dry_run, log=log, accept_gap=accept_gap)
                    except TerminalLost as e:   # MT5 restarts itself to update: reconnect and retry once
                        log(f"  {a['key']}: lost the terminal ({e}), reconnecting")
                        mt5.shutdown()
                        problem = connect(mt5, term, cfg["download"])
                        if problem:
                            raise TerminalLost(problem)
                        r = download_asset(mt5, a, cfg, dry_run=dry_run, log=log, accept_gap=accept_gap)
                except Exception as e:  # one bad symbol never stops the rest
                    r = {"key": a["key"], "status": "error", "msg": f"{type(e).__name__}: {e}"}
                log(f"  {r['key']:<7} {r['status']:<11} {r.get('msg', '')}")
                results.append(r)
        finally:
            mt5.shutdown()
    return results


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--assets", nargs="*", help="only these asset keys")
    ap.add_argument("--config", default=None)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--accept-gap", nargs="*", default=[], metavar="KEY", help="merge these assets despite a long gap or no overlap, after checking by hand")
    a = ap.parse_args()
    results = download_all(load_config(a.config), only=a.assets, dry_run=a.dry_run, accept_gap=a.accept_gap)
    print(json.dumps(results, indent=1, default=str))
    sys.exit(1 if any(r["status"] == "error" for r in results) else 0)


if __name__ == "__main__":
    main()
