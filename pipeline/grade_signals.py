"""
grade_signals.py — grades the seasonal-dashboard's weekly signals against what price
actually did, for the seasonal-dashboard's /track-record page
(docs/specs/2026-10-site-expansion/NEW_PAGES_BUILD_NOTES.md Phase 3, grading rules as
confirmed by the owner 2026-10-20).

Scope: the 14 assets with full MT5 history (data/clean/<asset>_daily_clean.csv), each
graded against the dashboard page that shows that instrument (spot FX pairs → the fx-*
pair pages; XAUUSD → xau; WTI → cl; US500 → sp500; USTECH → nq; US30 → ym; …).

For every Mon–Fri week since --since:
  - Signal: the dashboard's signal for the week slot the week's Monday falls in
    (month + week-of-month: days 1-7 = Wk1, 8-14 = Wk2, 15-21 = Wk3, 22+ = Wk4), using
    exactly the dashboard's com → signal mapping (js/signals.js comToTag, mirrored below).
  - Move: first trading day's open → last trading day's close of that Mon–Fri week
    (trading days as cleaned by the pipeline, ending at the 5pm New York close),
    expressed as a multiple of ADR20 (mean daily high−low of the 20 trading days
    before the week).
  - HIT = BULL and the move is up, or BEAR and the move is down. A flat week is a miss.
  - CHOP (and AVOID) are not graded.
  - FLIP is graded on the second half of the week (first trading day from Wednesday →
    Friday close), in the post-turn direction: the next week's signal if it is BULL or
    BEAR, otherwise the opposite of the previous week's BULL/BEAR; ungraded if neither.

Two kinds of history, kept separate (`source`):
  - backfill — graded with today's signals_manifest.js. In-sample: the seasonal charts
    already include those years.
  - live — graded with the signals *as shown at the time*, from weekly snapshots in
    seasonal-dashboard/data/signal_history/YYYY-MM-Wn.json (written by
    seasonal-dashboard/scripts/snapshot_signals.js). Where a snapshot exists it replaces
    the backfill row for that week; later edits to the data never rewrite it.

Output: output/track_record.json — synced into seasonal-dashboard/data/track_record.js by
seasonal-dashboard/scripts/sync_track_record.js.

Usage (from KPT-Market-Profiling/):
    python pipeline/grade_signals.py [--since 2016-01-04]
        [--dashboard ../seasonal-dashboard] [--out output/track_record.json]
"""
import argparse
import datetime as dt
import json
import os
import re
import sys

import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

# Pipeline asset key → (dashboard page id, display label)
ASSETS = [
    ("eurusd", "fx-eurusd", "EURUSD"), ("gbpusd", "fx-gbpusd", "GBPUSD"), ("audusd", "fx-audusd", "AUDUSD"),
    ("nzdusd", "fx-nzdusd", "NZDUSD"), ("usdcad", "fx-usdcad", "USDCAD"), ("usdchf", "fx-usdchf", "USDCHF"),
    ("usdjpy", "fx-usdjpy", "USDJPY"), ("xauusd", "xau", "XAUUSD"), ("brent", "brent", "BRENT"),
    ("wti", "cl", "WTI"), ("us500", "sp500", "US500"), ("ustech", "nq", "USTECH"),
    ("us30", "ym", "US30"), ("btcusd", "btc", "BTCUSD"),
]

# Mirror of the dashboard's comToTag() (seasonal-dashboard/js/signals.js) — keep in sync.
_PREFIX = [("LONG", "BULL"), ("SHORT", "BEAR"), ("FLIP", "FLIP"), ("AVOID", "AVOID"),
           ("HOLD", "CHOP"), ("NEUTRAL", "CHOP"), ("MIXED", "CHOP"), ("WATCH", "CHOP")]


def com_to_signal(com):
    u = (com or "").upper()
    for p, sig in _PREFIX:
        if u.startswith(p):
            return sig
    return "CHOP"


def conviction(com):
    return (com or "").count("★")


def slot(d):
    """Dashboard week slot (month 0-11, week 0-3) for a date."""
    return d.month - 1, min(3, (d.day - 1) // 7)


def load_manifest(dashboard):
    s = open(os.path.join(dashboard, "data", "signals_manifest.js"), encoding="utf-8").read()
    key = "SIGNALS_MANIFEST = "
    i = s.index(key) + len(key)
    return json.loads(s[i:s.rindex("}") + 1])


def load_snapshots(dashboard):
    """{(year, month0, week0): {asset_id: com}} from data/signal_history/YYYY-MM-Wn.json."""
    d = os.path.join(dashboard, "data", "signal_history")
    snaps = {}
    if not os.path.isdir(d):
        return snaps
    for f in os.listdir(d):
        m = re.match(r"^(\d{4})-(\d{2})-W([1-4])\.json$", f)
        if not m:
            continue
        with open(os.path.join(d, f), encoding="utf-8") as fh:
            snaps[(int(m.group(1)), int(m.group(2)) - 1, int(m.group(3)) - 1)] = json.load(fh)["signals"]
    return snaps


def weekly_frames(clean_csv):
    d = pd.read_csv(clean_csv, usecols=["date", "open", "high", "low", "close", "is_data_gap"], parse_dates=["date"])
    d = d[d.open.notna() & d.close.notna() & d.high.notna() & d.low.notna()].copy()
    d["rng"] = d.high - d.low
    d["adr20_prior"] = d.rng.rolling(20).mean().shift(1)
    d = d[d.date.dt.dayofweek < 5]                       # Mon–Fri weeks for every asset
    d["monday"] = d.date - pd.to_timedelta(d.date.dt.dayofweek, unit="D")
    return d


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--since", default="2016-01-04")
    ap.add_argument("--dashboard", default=os.path.join(ROOT, "..", "seasonal-dashboard"))
    ap.add_argument("--out", default=os.path.join(ROOT, "output", "track_record.json"))
    args = ap.parse_args()

    manifest = load_manifest(args.dashboard)
    snaps = load_snapshots(args.dashboard)
    since = pd.Timestamp(args.since)
    rows, as_of = [], None

    for ai, (key, page_id, label) in enumerate(ASSETS):
        d = weekly_frames(os.path.join(ROOT, "data", "clean", f"{key}_daily_clean.csv"))
        as_of = max(as_of, d.date.max()) if as_of is not None else d.date.max()
        weeks = sorted(m for m in d.monday.unique() if pd.Timestamp(m) >= since)
        last_monday = pd.Timestamp(weeks[-1]) if weeks else None
        for mon in weeks:
            mon = pd.Timestamp(mon)
            wk = d[d.monday == mon]
            # The data's final week may still be in progress — grade it only once it has its Friday.
            # (Earlier weeks without a Friday bar are holiday weeks: graded to their last trading day.)
            if wk.empty or (mon == last_monday and wk.date.max().dayofweek < 4):
                continue
            first, last = wk.iloc[0], wk.iloc[-1]
            adr = first.adr20_prior
            if not adr or pd.isna(adr):
                continue
            m0, w0 = slot(mon)
            snap = snaps.get((mon.year, m0, w0))
            if snap is not None and page_id in snap:
                com, source = snap[page_id], "live"
            else:
                com, source = manifest[page_id][m0 * 4 + w0], "backfill"
            sig, conv = com_to_signal(com), conviction(com)

            move = (last.close - first.open) / adr
            result, graded_move, direction = "-", move, None
            if sig in ("BULL", "BEAR"):
                direction = sig
            elif sig == "FLIP":
                nxt = mon + pd.Timedelta(days=7)
                prv = mon - pd.Timedelta(days=7)
                nm, nw = slot(nxt)
                pm, pw = slot(prv)
                ns = com_to_signal(manifest[page_id][nm * 4 + nw])
                ps = com_to_signal(manifest[page_id][pm * 4 + pw])
                direction = ns if ns in ("BULL", "BEAR") else ({"BULL": "BEAR", "BEAR": "BULL"}.get(ps))
                half = wk[wk.date.dt.dayofweek >= 2]
                if direction and not half.empty:
                    graded_move = (last.close - half.iloc[0].open) / adr
                else:
                    direction = None
            if direction:
                result = "H" if (graded_move > 0 if direction == "BULL" else graded_move < 0) else "M"
            rows.append([mon.strftime("%Y-%m-%d"), ai, sig, conv, round(float(graded_move), 2), result, source[0],
                         direction if (sig == "FLIP" and direction) else ""])

    rows.sort(key=lambda r: (r[0], r[1]))
    out = {
        "generatedAt": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "asOf": as_of.strftime("%Y-%m-%d") if as_of is not None else None,
        "since": args.since,
        "assets": [{"key": k, "id": i, "label": l} for k, i, l in ASSETS],
        "columns": ["week", "asset", "signal", "conviction", "moveAdr", "result", "source", "flipDir"],
        "rows": rows,
    }
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(out, f, separators=(",", ":"))

    graded = [r for r in rows if r[5] != "-"]
    hits = sum(r[5] == "H" for r in graded)
    live = sum(r[6] == "l" for r in rows)
    print(f"weeks graded: {len(graded)} of {len(rows)} rows · hit rate {hits / max(1, len(graded)):.1%} · "
          f"live rows {live} · data as of {out['asOf']} · wrote {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
