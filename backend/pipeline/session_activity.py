"""
Phase 3 support — Hourly session-activity export (Kaminari Market Profiling
System, Tier 5b)

Tier 5b's "session-overlap activity" question (market-profiling-system-spec.md
Sec4.5, noted alongside liquidity sweeps as a related-but-separate question):
independent of whether a sweep happens, is there a real activity/volatility
signature specifically at session OVERLAP windows (Asian-London 07:00 UTC,
London-NY 12:00-16:00 UTC) versus the surrounding single-session hours?

Validated empirically (2026-09-05) on GBPUSD/EURUSD/XAUUSD before writing
this: yes — both overlap windows show elevated mean hourly range versus
their immediate single-session neighbors, in every asset tested, with the
London-NY overlap consistently the most active window of the day (e.g.
XAUUSD: ~994 pips/hour average during the overlap vs. ~582-588 pips/hour
in the surrounding London-only/NY-only hours — a ~70% jump). See
market-profiling-system-spec.md Sec4.5 for the full write-up.

Needs hour-by-hour intraday range, which the cleaned daily CSV doesn't carry
(one row per day) -- re-parses the raw M1 file, reusing clean_mt5_csv.py's
own load_raw()/to_utc() (same broker-tz conversion, same NY-5pm trading-day
boundary) so results are directly comparable to everything else in this
pipeline, rather than duplicating that logic with a subtly different
convention. Same "needs the raw file" cost as export_profile_examples.py —
skippable via refresh_asset.py's --skip-hourly-activity for a faster
re-run when only re-validating the stats/taxonomy chain.

Usage:
    python3 session_activity.py <raw_m1_csv> <output_json> --asset GBPUSD --pip 0.0001
"""

import sys
import json
import argparse
import pandas as pd

from clean_mt5_csv import load_raw, to_utc

# A trading day's hour bucket needs most of its 60 possible M1 bars present
# to trust its range as real (not a data-gap hour dragging the average
# toward near-zero) -- same "cheap sanity floor, not a precise threshold"
# spirit as MIN_BARS_FOR_VALID_DAY elsewhere in this pipeline.
MIN_BARS_PER_HOUR = 45

# Session windows in UTC hour-of-day, matching clean_mt5_csv.py's own
# _in_asian()/_in_london()/_in_ny() boundaries (Asian 23:00-08:00, London
# 07:00-16:00, NY 12:00-21:00) -- overlap hours are where two of those
# ranges share an hour bucket.
SESSION_WINDOWS = {
    "asian_only":          [23, 0, 1, 2, 3, 4, 5, 6],
    "asian_london_overlap": [7],
    "london_only":         [8, 9, 10, 11],
    "london_ny_overlap":   [12, 13, 14, 15],
    "ny_only":             [16, 17, 18, 19, 20],
}


def compute_hourly_activity(df: pd.DataFrame, pip: float) -> pd.DataFrame:
    df = df.copy()
    df["hour"] = df["utc_dt"].dt.hour
    df["abs_move"] = (df["close"] - df["open"]).abs()

    g = df.groupby(["trading_day", "hour"])
    hourly = g.agg(
        high=("high", "max"),
        low=("low", "min"),
        activity=("abs_move", "sum"),
        n_bars=("close", "size"),
    ).reset_index()
    hourly["range_pips"] = (hourly["high"] - hourly["low"]) / pip
    hourly["activity_pips"] = hourly["activity"] / pip

    clean = hourly[hourly["n_bars"] >= MIN_BARS_PER_HOUR]
    return clean


def summarize(clean: pd.DataFrame) -> dict:
    by_hour = clean.groupby("hour").agg(
        mean_range_pips=("range_pips", "mean"),
        mean_activity_pips=("activity_pips", "mean"),
        n_days=("range_pips", "size"),
    ).round(2)

    hourly_out = {
        str(h): {
            "mean_range_pips": float(row.mean_range_pips),
            "mean_activity_pips": float(row.mean_activity_pips),
            "n_days": int(row.n_days),
        }
        for h, row in by_hour.iterrows()
    }

    windows_out = {}
    for name, hours in SESSION_WINDOWS.items():
        sub = by_hour.loc[by_hour.index.isin(hours)]
        windows_out[name] = {
            "hours": hours,
            "mean_range_pips": round(float(sub["mean_range_pips"].mean()), 2) if len(sub) else None,
            "mean_activity_pips": round(float(sub["mean_activity_pips"].mean()), 2) if len(sub) else None,
        }

    return {"hourly": hourly_out, "session_windows": windows_out}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_m1_csv")
    ap.add_argument("output_json")
    ap.add_argument("--asset", required=True)
    ap.add_argument("--pip", type=float, required=True, help="pip size for this asset, e.g. 0.01 for JPY pairs")
    args = ap.parse_args()

    print(f"Loading raw M1 data for {args.asset}...", file=sys.stderr)
    df = load_raw(args.raw_m1_csv)
    df = to_utc(df)

    clean = compute_hourly_activity(df, args.pip)
    result = summarize(clean)
    result["asset"] = args.asset

    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    print(f"\n=== {args.asset} hourly session-activity summary ===", file=sys.stderr)
    for name, w in result["session_windows"].items():
        print(f"  {name:24s} hours={w['hours']}  mean_range={w['mean_range_pips']}  mean_activity={w['mean_activity_pips']}", file=sys.stderr)
    print(f"\nwrote {args.output_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
