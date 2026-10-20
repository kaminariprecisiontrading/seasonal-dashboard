"""
Phase 2b — Rule-based weekly profile taxonomy (Kaminari Market Profiling System)

Weekly sibling of profile_taxonomy.py (Tier 5b/5's finer/coarser split — this
is the coarser Tier 5 direction: Daily -> Weekly -> Monthly -> Yearly). Builds
weekly bars from the cleaned daily CSV (clean_mt5_csv.py output; there is no
separate weekly raw data source) and assigns each ISO week one of the same
8 named profiles as Daily, from the same two axes:

  1. Range regime   — Compression / Normal / Expansion, trailing percentile
                       rank of weekly range (own rolling window, see below —
                       NOT Daily's 252-day window, a week is a coarser unit).
  2. Closing shape   — Balanced / Mixed / Directional, trailing percentile
                       rank of closing strength (cs = 2*|close_position-0.5|),
                       exactly as Daily defines it, just on weekly OHLC.

Exploratory analysis (GBPUSD/EURUSD/XAUUSD full history, 2026-09-05) found:
  - The two axes are NOT as cleanly independent as Daily's: weekly range and
    closing strength correlate at +0.10 to +0.18 across all three assets
    (stable, not asset-specific noise). Real and disclosed here, not treated
    as a design failure — the two-axis split still produces a healthy,
    non-degenerate distribution (every range-regime x shape cell populated,
    smallest ~4% of the labeled sample), so the same two-axis approach is
    kept, with this correlation as a known, accepted characteristic rather
    than something corrected away.
  - A day-of-week pattern in where the week's high and low land, much
    stronger and highly consistent across all three assets: the high and low
    landing on the *same weekday* is suppressed 5-15x versus what the
    existing marginal (which day tends to have the high, which the low)
    distributions alone would predict; day-pairs that are spread apart in
    the week are consistently over-represented (~1.4-1.9x). Captured below
    as two new fields (`extreme_timing`, mirroring Daily's tag exactly but
    discretized to weekday granularity, and `extreme_spread`, new -- there is
    no Daily analog, since "how many days apart" only makes sense at a
    granularity coarser than one day).

Usage:
    python3 profile_taxonomy_weekly.py <daily_clean_csv> <output_csv> <output_json> [--asset GBPUSD]
"""

import sys
import json
import argparse
import numpy as np
import pandas as pd

# 52 weeks -- chosen to match Daily's ROLLING_WINDOW in real-world duration
# (252 trading days is ~1 calendar year; so is 52 weeks), not just its unit
# count, so both granularities reflect "the trailing year" the same way.
# min_periods scaled to roughly the same fraction of the window Daily uses
# (60/252 ~= 24%; 15/52 ~= 29%, close enough given the much smaller n).
ROLLING_WINDOW = 52
MIN_PERIODS = 15

# Same thresholds as Daily (profile_taxonomy.py) -- confirmed on real data to
# still produce a sensible, non-degenerate split at weekly granularity.
RANGE_REGIME_PERCENTILES = {"compression": 20, "expansion": 80}
SHAPE_PERCENTILES = {"balanced": 25, "directional": 75}

# A week with fewer trading days than this can't meaningfully carry a
# range-regime/shape/day-pair signal (e.g. a single-day week from an extreme
# holiday closure) -- excluded from classification, analogous in spirit to
# Daily's is_data_gap, though this is a short week, not missing data.
MIN_DAYS_FOR_VALID_WEEK = 2

WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
WEEKDAY_INDEX = {d: i for i, d in enumerate(WEEKDAYS)}


def rolling_percentile_rank(s: pd.Series, window: int, min_periods: int) -> pd.Series:
    """Same definition as profile_taxonomy.py's -- kept identical rather than
    imported, since these are two independent, parallel scripts (see that
    file's own note on why Daily/Weekly/Monthly/Yearly aren't parametrized
    into one shared script: different rolling windows, different day-of-X
    granularity, not worth forcing into one generic function yet)."""
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


def classify_extreme_timing(close_side_wd: str, far_side_wd: str) -> str:
    """Direct weekday-granularity analog of Daily's tag: "late" means the
    back half of the trading week (Wed/Thu/Fri) rather than >=50% of the
    day's elapsed span -- the same >=0.5-of-the-period rule Daily uses,
    discretized to 5 weekdays (index/4 >= 0.5 <=> index >= 2, i.e. Wed on).

    A handful of trading days (13 in GBPUSD's full history, all late March
    1994-2006, then none) land on a calendar Saturday/Sunday -- a DST
    spring-forward boundary artifact in clean_mt5_csv.py's shared
    trading_day computation, out of scope to fix here (touches every other
    pipeline stage). WEEKDAY_INDEX.get() returns None for those, so a week
    whose high or low happens to fall on one is gracefully marked
    Insufficient_History for this field rather than crashing -- its
    range_regime/shape (which don't depend on weekday) are unaffected."""
    if pd.isna(close_side_wd) or pd.isna(far_side_wd):
        return "Insufficient_History"
    close_idx = WEEKDAY_INDEX.get(close_side_wd)
    far_idx = WEEKDAY_INDEX.get(far_side_wd)
    if close_idx is None or far_idx is None:
        return "Insufficient_History"
    close_late = close_idx >= 2
    far_late = far_idx >= 2
    if close_late and not far_late:
        return "Late_Push"
    if not close_late and not far_late:
        return "Early_Resolution"
    if close_late and far_late:
        return "Late_Resolution"
    return "Fade_Risk"


def classify_extreme_spread(high_wd: str, low_wd: str) -> str:
    """New field, no Daily analog -- how many weekdays apart the high and
    low landed. Empirically validated (2026-09-05, 3 assets): same-day is
    suppressed 5-15x vs. what independent marginals predict; 2+ days apart
    is consistently over-represented ~1.4-1.9x. Named descriptively, not
    given invented jargon -- see spec §4.4's naming rule. See
    classify_extreme_timing()'s docstring for the rare weekend-date case."""
    if pd.isna(high_wd) or pd.isna(low_wd):
        return "Insufficient_History"
    high_idx = WEEKDAY_INDEX.get(high_wd)
    low_idx = WEEKDAY_INDEX.get(low_wd)
    if high_idx is None or low_idx is None:
        return "Insufficient_History"
    gap = abs(high_idx - low_idx)
    if gap == 0:
        return "Same_Day"
    if gap == 1:
        return "Adjacent"
    return "Spread"


def profile_name(range_regime: str, shape: str, direction: str) -> str:
    if range_regime == "Insufficient_History" or shape == "Insufficient_History":
        return "Insufficient_History"
    if range_regime == "Expansion":
        if shape == "Directional":
            return f"Trend Week ({direction})"
        if shape == "Mixed":
            return "Volatile Week"
        return "Volatile Reversal Week"
    if range_regime == "Compression":
        if shape == "Directional":
            return f"Quiet Drift Week ({direction})"
        return "Compression Week"
    return "Normal Week"


def build_weekly_bars(daily: pd.DataFrame) -> pd.DataFrame:
    """Weekly OHLC + day-of-extreme tracking from the cleaned daily CSV.
    is_data_gap days are excluded (same as Daily's own philosophy) so a
    feed-outage artifact can't masquerade as a week's real extreme;
    is_daily_only days are kept (their OHLC is trusted, same as Daily) --
    and, unlike Daily's own extreme_timing, the day-pair fields here only
    need to know *which calendar day* had the extreme, not intraday timing
    within it, so is_daily_only-era weeks work fine, no exclusion needed."""
    d = daily[~daily["is_data_gap"]].copy()
    d["weekday"] = d["date"].dt.day_name()
    d["iso_year"] = d["date"].dt.isocalendar().year
    d["iso_week"] = d["date"].dt.isocalendar().week

    g = d.groupby(["iso_year", "iso_week"], sort=False)
    open_idx = g["date"].idxmin()
    close_idx = g["date"].idxmax()
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    weekly = pd.DataFrame({
        "week_start": g["date"].min().values,
        "week_end": g["date"].max().values,
        "open": d.loc[open_idx, "open"].values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "close": d.loc[close_idx, "close"].values,
        "high_weekday": d.loc[high_idx, "weekday"].values,
        "low_weekday": d.loc[low_idx, "weekday"].values,
        "n_days": g.size().values,
    }).sort_values("week_start").reset_index(drop=True)

    weekly["is_short_week"] = weekly["n_days"] < MIN_DAYS_FOR_VALID_WEEK
    return weekly


def build_profiles(weekly: pd.DataFrame, pip: float) -> pd.DataFrame:
    valid = weekly[~weekly["is_short_week"]].copy()

    rng = valid["high"] - valid["low"]
    valid["range_pips"] = (rng / pip).round(1)  # same field name stats_engine.py's build_weekly() already uses
    valid["close_position"] = (valid["close"] - valid["low"]) / rng
    valid["cs"] = 2 * (valid["close_position"] - 0.5).abs()
    valid["direction"] = np.where(valid["close_position"] >= 0.5, "Up", "Down")

    close_near_high = valid["close_position"] >= 0.5
    valid["close_side_weekday"] = np.where(close_near_high, valid["high_weekday"], valid["low_weekday"])
    valid["far_side_weekday"] = np.where(close_near_high, valid["low_weekday"], valid["high_weekday"])

    valid["range_pctile"] = rolling_percentile_rank(valid["range_pips"], ROLLING_WINDOW, MIN_PERIODS)
    valid["cs_pctile"] = rolling_percentile_rank(valid["cs"], ROLLING_WINDOW, MIN_PERIODS)

    valid["range_regime"] = valid["range_pctile"].apply(classify_range_regime)
    valid["shape"] = valid["cs_pctile"].apply(classify_shape)
    valid["extreme_timing"] = valid.apply(
        lambda r: classify_extreme_timing(r["close_side_weekday"], r["far_side_weekday"]), axis=1
    )
    valid["extreme_spread"] = valid.apply(
        lambda r: classify_extreme_spread(r["high_weekday"], r["low_weekday"]), axis=1
    )
    valid["profile"] = valid.apply(
        lambda r: profile_name(r["range_regime"], r["shape"], r["direction"]), axis=1
    )

    out_cols = [
        "week_start", "week_end", "open", "high", "low", "close", "range_pips",
        "high_weekday", "low_weekday", "close_position", "cs", "direction",
        "range_pctile", "cs_pctile", "range_regime", "shape",
        "close_side_weekday", "far_side_weekday", "extreme_timing", "extreme_spread",
        "n_days", "profile",
    ]
    result = weekly[["week_start", "is_short_week"]].merge(valid[out_cols], on="week_start", how="left")
    result.loc[result["is_short_week"], "profile"] = "Short_Week"
    result["profile"] = result["profile"].fillna("Short_Week")
    return result


def weekday_pair_distribution(result: pd.DataFrame) -> dict:
    """The full (low_weekday, high_weekday) joint table -- e.g. "how often
    does a Monday-low pair with a Friday-high specifically" -- not just the
    3-bucket Same_Day/Adjacent/Spread summary attached to each profile.
    Computed from every valid week regardless of range/shape classification
    (excludes only Short_Week; Insufficient_History weeks still have real
    high_weekday/low_weekday values from the rolling-window-independent
    weekly bar construction, so including them maximizes sample size) --
    this is a direct empirical fact about the price data, not something that
    needs the taxonomy's own rolling-window burn-in."""
    have_days = result[result["profile"] != "Short_Week"].dropna(subset=["high_weekday", "low_weekday"])
    have_days = have_days[have_days["high_weekday"].isin(WEEKDAYS) & have_days["low_weekday"].isin(WEEKDAYS)]

    n = len(have_days)
    pairs = {}
    for low_wd in WEEKDAYS:
        pairs[low_wd] = {}
        for high_wd in WEEKDAYS:
            count = int(((have_days["low_weekday"] == low_wd) & (have_days["high_weekday"] == high_wd)).sum())
            pairs[low_wd][high_wd] = {"n": count, "pct": round(count / n * 100, 2) if n else 0.0}

    same_day_n = sum(pairs[d][d]["n"] for d in WEEKDAYS)
    return {
        "n_weeks": n,
        "same_day_n": same_day_n,
        "same_day_pct": round(same_day_n / n * 100, 2) if n else 0.0,
        "pairs": pairs,  # pairs[low_weekday][high_weekday] = {n, pct}
    }


def summarize(result: pd.DataFrame) -> dict:
    labeled = result[~result["profile"].isin(["Short_Week", "Insufficient_History"])]
    profile_counts = labeled["profile"].value_counts()
    profile_pct = (profile_counts / len(labeled) * 100).round(2)

    timing_by_profile = {}
    spread_by_profile = {}
    for p in profile_counts.index:
        sub = labeled[labeled["profile"] == p]
        timing_by_profile[p] = sub["extreme_timing"].value_counts().to_dict()
        spread_by_profile[p] = sub["extreme_spread"].value_counts().to_dict()

    range_by_profile = labeled.groupby("profile")["range_pips"].agg(["mean", "median"]).round(1)

    return {
        "n_labeled_weeks": int(len(labeled)),
        "n_short_weeks": int((result["profile"] == "Short_Week").sum()),
        "n_insufficient_history_weeks": int((result["profile"] == "Insufficient_History").sum()),
        "profile_distribution": {
            p: {"n": int(profile_counts[p]), "pct": float(profile_pct[p])} for p in profile_counts.index
        },
        "extreme_timing_by_profile": timing_by_profile,
        "extreme_spread_by_profile": spread_by_profile,
        "avg_range_pips_by_profile": range_by_profile.to_dict(orient="index"),
        "weekday_pair_distribution": weekday_pair_distribution(result),
        "rolling_window_weeks": ROLLING_WINDOW,
        "min_periods_weeks": MIN_PERIODS,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("daily_csv")
    ap.add_argument("output_csv")
    ap.add_argument("output_json")
    ap.add_argument("--asset", default="GBPUSD")
    ap.add_argument("--pip", type=float, required=True, help="pip size for this asset, e.g. 0.01 for JPY pairs")
    args = ap.parse_args()

    daily = pd.read_csv(args.daily_csv, parse_dates=["date"])
    daily["is_data_gap"] = daily["is_data_gap"].astype(bool)

    weekly = build_weekly_bars(daily)
    result = build_profiles(weekly, args.pip)
    result.to_csv(args.output_csv, index=False)

    summary = summarize(result)
    summary["asset"] = args.asset
    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, default=str)

    print(f"\n=== {args.asset} weekly profile taxonomy summary ===", file=sys.stderr)
    print(f"Labeled weeks: {summary['n_labeled_weeks']}  "
          f"Short weeks: {summary['n_short_weeks']}  "
          f"Insufficient history: {summary['n_insufficient_history_weeks']}", file=sys.stderr)
    print("\nProfile distribution:", file=sys.stderr)
    for p, v in sorted(summary["profile_distribution"].items(), key=lambda kv: -kv[1]["n"]):
        print(f"  {p:28s} n={v['n']:5d}  {v['pct']:5.1f}%", file=sys.stderr)
    print(f"\nwrote {args.output_csv}", file=sys.stderr)
    print(f"wrote {args.output_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
