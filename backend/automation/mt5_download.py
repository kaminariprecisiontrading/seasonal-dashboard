"""
mt5_download.py — pulls new M1 bars from the MetaTrader 5 terminal(s) for each configured
asset and writes them as MT5 "Export Bars"-format CSVs into data/raw/incoming/, ready for
pipeline/concat_raw_csv.py (v1.29; docs/AUTOMATION.md).

For each asset in config.json (grouped by terminal, one terminal connection at a time —
the MetaTrader5 package can only talk to one terminal per process session):

  1. Read the last timestamp of data/raw/<KEY>_M1_full.csv (tail read, no full load).
  2. Fetch M1 bars from (last timestamp − overlap_days) to now, in chunks.
  3. Verify the overlap: the bars that are already in the full file must match it
     (OHLC identical). A low match rate means a different feed or a shifted server time
     zone, and the asset is skipped rather than merged — see "Overlap check" in AUTOMATION.md.
  4. Drop a trailing partial day: the last date is kept only if its final bar is at or
     after `complete_day_after` (e.g. 23:50 server time). A Friday close is kept for 5-day
     markets; a 7-day market's in-progress Sunday is dropped and picked up next week.
  5. Write data/raw/incoming/<KEY>_M1_<first>_<last>.csv with the exact header and number
     formatting of the existing exports.

Times: the MetaTrader5 package returns bar times as seconds in the broker's server time
(labelled UTC), which is exactly what Export Bars writes, so no conversion is applied.

Usage (from backend/, with the .venv that has MetaTrader5 installed):
    python automation/mt5_download.py [--assets EURUSD BTCUSD] [--dry-run]
Normally called by automation/weekly_run.py.
"""
import argparse
import datetime as dt
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.dirname(HERE)
RAW = os.path.join(BACKEND, "data", "raw")
INCOMING = os.path.join(RAW, "incoming")
HEADER = "<DATE>\t<TIME>\t<OPEN>\t<HIGH>\t<LOW>\t<CLOSE>\t<TICKVOL>\t<VOL>\t<SPREAD>\n"
UTC = dt.timezone.utc


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


def download_asset(mt5, asset, cfg, dry_run=False, log=print):
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
        res["msg"] = f"symbol {symbol} not available in this terminal: {mt5.last_error()}"
        return res
    info = mt5.symbol_info(symbol)
    digits = int(info.digits)

    start = last_ts - dt.timedelta(days=dcfg["overlap_days"])
    end = dt.datetime.now(UTC) + dt.timedelta(days=1)   # covers servers ahead of UTC
    bars = fetch(mt5, symbol, start, end, dcfg["chunk_days"])
    if not bars:
        res["msg"] = "no bars returned (market closed all week, or terminal history not loaded)"
        res["status"] = "nothing-new"
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
    if not checked:
        log(f"  {key}: no overlapping bars to verify against (gap since {last_ts:%Y-%m-%d %H:%M})")

    new = [b for b in bars if dt.datetime.fromtimestamp(int(b["time"]), tz=UTC) > last_ts]

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
    if dry_run:
        res.update(status="ok", msg="dry run — not written")
        return res
    os.makedirs(INCOMING, exist_ok=True)
    tmp = out + ".part"
    with open(tmp, "w", encoding="utf-8", newline="") as f:
        f.write(HEADER)
        for b in new:
            f.write(fmt_row(b, digits))
    os.replace(tmp, out)
    res.update(status="ok", file=out, msg=f"{len(new)} bars")
    return res


def download_all(cfg, only=None, dry_run=False, log=print):
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
        if not mt5.initialize(path=term["path"]):
            err = mt5.last_error()
            for a in group:
                results.append({"key": a["key"], "status": "error", "msg": f"could not start/connect to {term_id} terminal: {err}"})
            continue
        try:
            acct = mt5.account_info()
            if acct is None:
                log(f"  WARNING: {term_id} terminal not logged in — history may still load from cache")
            for a in group:
                try:
                    r = download_asset(mt5, a, cfg, dry_run=dry_run, log=log)
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
    a = ap.parse_args()
    results = download_all(load_config(a.config), only=a.assets, dry_run=a.dry_run)
    print(json.dumps(results, indent=1, default=str))
    sys.exit(1 if any(r["status"] == "error" for r in results) else 0)


if __name__ == "__main__":
    main()
