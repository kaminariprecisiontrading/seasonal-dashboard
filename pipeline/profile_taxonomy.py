"""
Phase 2 — Rule-based daily profile taxonomy (Kaminari Market Profiling System)

Consumes the cleaned daily CSV (clean_mt5_csv.py output) and assigns each
trading day one of a small set of named profiles, built from two empirically
validated, independent axes rather than assumed upfront (see spec §4):

  1. Range regime   — Compression / Normal / Expansion, from a trailing
                       percentile rank of daily_range_pips (self-calibrating,
                       regime-aware — see ROLLING_WINDOW below).
  2. Closing shape   — Balanced / Mixed / Directional, from a trailing
                       percentile rank of "closing strength"
                       (cs = 2*|close_position - 0.5|), i.e. how close the
                       day ended to one edge of its own range vs the middle.

Exploratory analysis (GBPUSD + EURUSD, 2000-2019) confirmed these two axes
are genuinely independent: compression days show the full spread of closing
shapes, not just "balanced." It also confirmed a consistent timing signature
for big-range + high-closing-strength ("trend-like") days: the extreme price
closed *away* from forms early (median ~30% into the day) and the extreme it
closed *near* forms late (median ~90% into the day). This is captured as a
secondary `extreme_timing` tag.

Both percentile ranks use a trailing rolling window (not a static
full-history threshold) deliberately: it avoids look-ahead bias (each day is
classified only against data available up to that day) and stays
regime-aware, consistent with the spec's percentile-based-preferred
methodology (§3.2).

Usage:
    python3 profile_taxonomy.py <daily_clean_csv> <output_csv> <output_json> [--asset GBPUSD]
"""

import sys
import json
import argparse
import numpy as np
import pandas as pd

# Trailing window for the self-calibrating percentile ranks below. ~1 trading
# year: long enough to be stable, short enough to reflect the current
# volatility regime rather than a 20-year blend. min_periods gates output
# until the window has enough history to be meaningful.
ROLLING_WINDOW = 252
MIN_PERIODS = 60

RANGE_REGIME_PERCENTILES = {"compression": 20, "expansion": 80}  # matches stats_engine.py REGIME_PERCENTILES
SHAPE_PERCENTILES = {"balanced": 25, "directional": 75}


def rolling_percentile_rank(s: pd.Series, window: int, min_periods: int) -> pd.Series:
    """For each point, the percentile rank (0-100) of that value within the
    trailing `window` observations ending at (and including) it."""
    return s.rolling(window, min_periods=min_periods).apply(
        lambda x: (x <= x[-1]).mean() * 100, raw=True
    )


def classify_range_regime(pctile: float) -> str:
    if pd.isna(pctile):
        return "Insufficient_History"
    if pctile <= RANGE_REGIME_PERCENTILES["compression"]:
        return "Compression"
    if pctile >= RANGE_REGIME_PERCENTILES["expansion"]:
        return "Expansion"
    return "Normal"


def classify_shape(pctile: float) -> str:
    if pd.isna(pctile):
        return "Insufficient_History"
    if pctile <= SHAPE_PERCENTILES["balanced"]:
        return "Balanced"
    if pctile >= SHAPE_PERCENTILES["directional"]:
        return "Directional"
    return "Mixed"


def classify_extreme_timing(close_side_frac: float, far_side_frac: float) -> str:
    if pd.isna(close_side_frac) or pd.isna(far_side_frac):
        return "Insufficient_History"
    close_late = close_side_frac >= 0.5
    far_late = far_side_frac >= 0.5
    if close_late and not far_late:
        return "Late_Push"       # validated trend-day signature: opposite extreme early, favored extreme late
    if not close_late and not far_late:
        return "Early_Resolution"  # both extremes settled in the first half; day went quiet after
    if close_late and far_late:
        return "Late_Resolution"   # both extremes decided late; day was undecided into the close
    return "Fade_Risk"             # favored extreme formed early, price pushed the other way late but didn't close there


def profile_name(range_regime: str, shape: str, direction: str) -> str:
    if range_regime == "Insufficient_History" or shape == "Insufficient_History":
        return "Insufficient_History"
    if range_regime == "Expansion":
        if shape == "Directional":
            return f"Trend Day ({direction})"
        if shape == "Mixed":
            return "Volatile Day"
        return "Volatile Reversal Day"
    if range_regime == "Compression":
        if shape == "Directional":
            return f"Quiet Drift Day ({direction})"
        return "Compression Day"
    return "Normal Day"


def build_profiles(daily: pd.DataFrame) -> pd.DataFrame:
    daily = daily.sort_values("date").reset_index(drop=True)
    valid = daily[~daily["is_data_gap"]].copy()

    rng = valid["high"] - valid["low"]
    valid["close_position"] = (valid["close"] - valid["low"]) / rng
    valid["cs"] = 2 * (valid["close_position"] - 0.5).abs()
    valid["direction"] = np.where(valid["close_position"] >= 0.5, "Up", "Down")

    day_span = (valid["close_time"] - valid["open_time"]).dt.total_seconds()
    close_near_high = valid["close_position"] >= 0.5
    close_side_extreme_time = np.where(close_near_high, valid["high_time"], valid["low_time"])
    far_side_extreme_time = np.where(close_near_high, valid["low_time"], valid["high_time"])
    valid["close_side_frac"] = (pd.to_datetime(close_side_extreme_time) - valid["open_time"]).dt.total_seconds() / day_span
    valid["far_side_frac"] = (pd.to_datetime(far_side_extreme_time) - valid["open_time"]).dt.total_seconds() / day_span

    valid["range_pctile"] = rolling_percentile_rank(valid["daily_range_pips"], ROLLING_WINDOW, MIN_PERIODS)
    valid["cs_pctile"] = rolling_percentile_rank(valid["cs"], ROLLING_WINDOW, MIN_PERIODS)

    valid["range_regime"] = valid["range_pctile"].apply(classify_range_regime)
    valid["shape"] = valid["cs_pctile"].apply(classify_shape)
    valid["extreme_timing"] = valid.apply(
        lambda r: classify_extreme_timing(r["close_side_frac"], r["far_side_frac"]), axis=1
    )
    valid["profile"] = valid.apply(
        lambda r: profile_name(r["range_regime"], r["shape"], r["direction"]), axis=1
    )

    out_cols = [
        "date", "daily_range_pips", "close_position", "cs", "direction",
        "range_pctile", "cs_pctile", "range_regime", "shape",
        "close_side_frac", "far_side_frac", "extreme_timing", "profile",
    ]
    result = daily[["date", "is_data_gap", "is_daily_only"]].merge(valid[out_cols], on="date", how="left")
    result.loc[result["is_data_gap"], "profile"] = "Data_Gap"
    result["profile"] = result["profile"].fillna("Data_Gap")
    return result


def summarize(result: pd.DataFrame) -> dict:
    labeled = result[~result["profile"].isin(["Data_Gap", "Insufficient_History"])]
    profile_counts = labeled["profile"].value_counts()
    profile_pct = (profile_counts / len(labeled) * 100).round(2)

    timing_by_profile = {}
    for p in profile_counts.index:
        sub = labeled[labeled["profile"] == p]
        timing_by_profile[p] = sub["extreme_timing"].value_counts().to_dict()

    range_by_profile = labeled.groupby("profile")["daily_range_pips"].agg(["mean", "median"]).round(1)

    return {
        "n_labeled_days": int(len(labeled)),
        "n_data_gap_days": int((result["profile"] == "Data_Gap").sum()),
        "n_insufficient_history_days": int((result["profile"] == "Insufficient_History").sum()),
        "profile_distribution": {
            p: {"n": int(profile_counts[p]), "pct": float(profile_pct[p])} for p in profile_counts.index
        },
        "extreme_timing_by_profile": timing_by_profile,
        "avg_range_pips_by_profile": range_by_profile.to_dict(orient="index"),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("daily_csv")
    ap.add_argument("output_csv")
    ap.add_argument("output_json")
    ap.add_argument("--asset", default="GBPUSD")
    args = ap.parse_args()

    daily = pd.read_csv(
        args.daily_csv,
        parse_dates=["date", "open_time", "high_time", "low_time", "close_time"],
    )
    daily["is_data_gap"] = daily["is_data_gap"].astype(bool)
    if "is_daily_only" not in daily.columns:
        daily["is_daily_only"] = False
    daily["is_daily_only"] = daily["is_daily_only"].astype(bool)

    result = build_profiles(daily)
    result.to_csv(args.output_csv, index=False)

    summary = summarize(result)
    summary["asset"] = args.asset
    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, default=str)

    print(f"\n=== {args.asset} profile taxonomy summary ===", file=sys.stderr)
    print(f"Labeled days: {summary['n_labeled_days']}  "
          f"Data gap: {summary['n_data_gap_days']}  "
          f"Insufficient history: {summary['n_insufficient_history_days']}", file=sys.stderr)
    print("\nProfile distribution:", file=sys.stderr)
    for p, v in sorted(summary["profile_distribution"].items(), key=lambda kv: -kv[1]["n"]):
        print(f"  {p:28s} n={v['n']:5d}  {v['pct']:5.1f}%", file=sys.stderr)
    print(f"\nwrote {args.output_csv}", file=sys.stderr)
    print(f"wrote {args.output_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
