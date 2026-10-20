"""
Phase 2c — Rule-based monthly profile taxonomy (Kaminari Market Profiling System)

Monthly sibling of profile_taxonomy.py / profile_taxonomy_weekly.py (Tier 5's
coarser direction: Daily -> Weekly -> Monthly -> Yearly). Builds monthly bars
from the cleaned daily CSV (clean_mt5_csv.py output) using the exact same
(year, month) grouping and week-of-month bucketing convention already used by
stats_engine.py's build_monthly() (`((day_of_month-1)//7+1).clip(upper=5)`),
so this taxonomy's week-of-month fields mean the same thing as the ones
already shown elsewhere in the dashboard (calendar export, stats output).
Assigns each calendar month one of the same 8 named profiles as Daily/Weekly,
from the same two axes:

  1. Range regime   — Compression / Normal / Expansion, trailing percentile
                       rank of monthly range (own rolling window, see below).
  2. Closing shape   — Balanced / Mixed / Directional, trailing percentile
                       rank of closing strength (cs = 2*|close_position-0.5|),
                       exactly as Daily/Weekly define it.

Exploratory analysis (GBPUSD/EURUSD/XAUUSD full history, 2026-09-05) found:
  - The two axes are, if anything, MORE independent than Weekly's: monthly
    range and closing strength correlate at -0.05 to +0.13 across all three
    assets (Weekly's own correlation was +0.10 to +0.18). Two-axis design
    kept, same as Daily/Weekly.
  - Window choice deliberately breaks from Daily/Weekly's "match ~1 trailing
    real year" convention (which would mean a 12-month window here). With
    only ~12 monthly bars in a trailing window, a percentile rank only has
    ~8%-wide steps -- too coarse for a 20/80 split to mean much (2-3 raw
    points decide "Compression" or not). A 24-month window halves that
    coarseness while still covering 96-98% of history across all three
    assets (only 9 months lost to burn-in, since months are so much rarer
    than days/weeks to begin with) and produces a stable, non-degenerate
    regime split (Normal ~55-60%, Expansion ~21-29%, Compression ~14-22%).
    This is a deliberate one-off deviation from the real-time-duration rule,
    not an oversight -- disclosed here since it's the one design choice that
    doesn't just mirror Weekly's.
  - The same day-pair pattern found at Weekly (high/low landing on the same
    calendar unit is heavily suppressed; landing far apart is over-
    represented) generalizes again, one level coarser: which *week of the
    month* carries the high vs. the low. Same-week-of-month is suppressed to
    3.5-5.6% of months (vs. what the marginal week-of-month distributions
    alone would predict) across all three assets, and spread-apart pairs
    (week 1 low + week 4/5 high, or week 4 low + week 1/2 high) are
    consistently over-represented 1.5-2.0x. Captured below as two fields,
    `extreme_timing` (direct week-of-month-granularity analog of Daily's
    tag) and `extreme_spread` (direct analog of Weekly's field, discretized
    to week-of-month gap instead of weekday gap), plus the full joint table
    in `week_of_month_pair_distribution` (Weekly's `weekday_pair_distribution`
    treatment, one level coarser) -- including the same-week-of-month case
    per instruction, not just a coarse bucket summary.

Usage:
    python3 profile_taxonomy_monthly.py <daily_clean_csv> <output_csv> <output_json> --asset GBPUSD --pip 0.0001
"""

import sys
import json
import argparse
import numpy as np
import pandas as pd

# 24 months -- deliberately NOT matched to Daily/Weekly's "trailing ~1 real
# year" convention (see module docstring): with so few monthly bars, a
# 12-month window makes percentile rank too coarse to be meaningful. 24
# months still costs only ~9 months of burn-in (validated across 3 assets)
# and produces a stable, non-degenerate regime split.
ROLLING_WINDOW = 24
MIN_PERIODS = 10

# Same thresholds as Daily/Weekly -- confirmed on real data to still produce
# a sensible, non-degenerate split at monthly granularity.
RANGE_REGIME_PERCENTILES = {"compression": 20, "expansion": 80}
SHAPE_PERCENTILES = {"balanced": 25, "directional": 75}

# A month with fewer trading days than this can't meaningfully carry a
# range-regime/shape/week-pair signal (a partial calendar month at either
# end of the dataset's history) -- excluded from classification, analogous
# to Weekly's is_short_week (2/5 = 40% of a normal week; ~10/21 = ~48% of a
# normal trading month, same spirit).
MIN_DAYS_FOR_VALID_MONTH = 10

# Same bucketing convention as stats_engine.py's build_monthly() -- kept
# byte-identical so week_of_month here means the same thing as it already
# does elsewhere in the dashboard (calendar export, stats output).
WEEKS_OF_MONTH = [1, 2, 3, 4, 5]
WOM_INDEX = {w: w - 1 for w in WEEKS_OF_MONTH}


def rolling_percentile_rank(s: pd.Series, window: int, min_periods: int) -> pd.Series:
    """Same definition as profile_taxonomy.py's / profile_taxonomy_weekly.py's
    -- kept identical rather than imported, see those files' own notes on why
    Daily/Weekly/Monthly/Yearly aren't parametrized into one shared script."""
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


def classify_extreme_timing(close_side_wom, far_side_wom) -> str:
    """Direct week-of-month-granularity analog of Daily's/Weekly's tag:
    "late" means the back half of the month (week 3, 4 or 5) rather than
    >=50% of the day's/week's elapsed span -- the same >=0.5-of-the-period
    rule, discretized to 5 weeks-of-month (index/4 >= 0.5 <=> index >= 2,
    i.e. week 3 on)."""
    if pd.isna(close_side_wom) or pd.isna(far_side_wom):
        return "Insufficient_History"
    close_idx = WOM_INDEX.get(int(close_side_wom))
    far_idx = WOM_INDEX.get(int(far_side_wom))
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


def classify_extreme_spread(high_wom, low_wom) -> str:
    """Direct analog of Weekly's extreme_spread field, discretized to
    week-of-month gap instead of weekday gap. Empirically validated
    (2026-09-05, 3 assets): same-week-of-month is suppressed to 3.5-5.6% of
    months vs. what independent marginals predict; spread-apart weeks are
    consistently over-represented 1.5-2.0x."""
    if pd.isna(high_wom) or pd.isna(low_wom):
        return "Insufficient_History"
    high_idx = WOM_INDEX.get(int(high_wom))
    low_idx = WOM_INDEX.get(int(low_wom))
    if high_idx is None or low_idx is None:
        return "Insufficient_History"
    gap = abs(high_idx - low_idx)
    if gap == 0:
        return "Same_Week"
    if gap == 1:
        return "Adjacent"
    return "Spread"


def profile_name(range_regime: str, shape: str, direction: str) -> str:
    if range_regime == "Insufficient_History" or shape == "Insufficient_History":
        return "Insufficient_History"
    if range_regime == "Expansion":
        if shape == "Directional":
            return f"Trend Month ({direction})"
        if shape == "Mixed":
            return "Volatile Month"
        return "Volatile Reversal Month"
    if range_regime == "Compression":
        if shape == "Directional":
            return f"Quiet Drift Month ({direction})"
        return "Compression Month"
    return "Normal Month"


def build_monthly_bars(daily: pd.DataFrame) -> pd.DataFrame:
    """Monthly OHLC + week-of-month-of-extreme tracking from the cleaned
    daily CSV. is_data_gap days are excluded (same philosophy as Daily/
    Weekly) so a feed-outage artifact can't masquerade as a month's real
    extreme; is_daily_only days are kept (their OHLC is trusted). Week-of-
    month bucketing matches stats_engine.py's build_monthly() exactly."""
    d = daily[~daily["is_data_gap"]].copy()
    d["year"] = d["date"].dt.year
    d["month"] = d["date"].dt.month
    d["dom"] = d["date"].dt.day
    d["week_of_month"] = ((d["dom"] - 1) // 7 + 1).clip(upper=5)

    g = d.groupby(["year", "month"], sort=False)
    open_idx = g["date"].idxmin()
    close_idx = g["date"].idxmax()
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    monthly = pd.DataFrame({
        "month_start": g["date"].min().values,
        "month_end": g["date"].max().values,
        "open": d.loc[open_idx, "open"].values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "close": d.loc[close_idx, "close"].values,
        "high_week_of_month": d.loc[high_idx, "week_of_month"].values,
        "low_week_of_month": d.loc[low_idx, "week_of_month"].values,
        "n_days": g.size().values,
    }).sort_values("month_start").reset_index(drop=True)

    monthly["is_short_month"] = monthly["n_days"] < MIN_DAYS_FOR_VALID_MONTH
    return monthly


def build_profiles(monthly: pd.DataFrame, pip: float) -> pd.DataFrame:
    valid = monthly[~monthly["is_short_month"]].copy()

    rng = valid["high"] - valid["low"]
    valid["range_pips"] = (rng / pip).round(1)  # same field name stats_engine.py's build_monthly() already uses
    valid["close_position"] = (valid["close"] - valid["low"]) / rng
    valid["cs"] = 2 * (valid["close_position"] - 0.5).abs()
    valid["direction"] = np.where(valid["close_position"] >= 0.5, "Up", "Down")

    close_near_high = valid["close_position"] >= 0.5
    valid["close_side_wom"] = np.where(close_near_high, valid["high_week_of_month"], valid["low_week_of_month"])
    valid["far_side_wom"] = np.where(close_near_high, valid["low_week_of_month"], valid["high_week_of_month"])

    valid["range_pctile"] = rolling_percentile_rank(valid["range_pips"], ROLLING_WINDOW, MIN_PERIODS)
    valid["cs_pctile"] = rolling_percentile_rank(valid["cs"], ROLLING_WINDOW, MIN_PERIODS)

    valid["range_regime"] = valid["range_pctile"].apply(classify_range_regime)
    valid["shape"] = valid["cs_pctile"].apply(classify_shape)
    valid["extreme_timing"] = valid.apply(
        lambda r: classify_extreme_timing(r["close_side_wom"], r["far_side_wom"]), axis=1
    )
    valid["extreme_spread"] = valid.apply(
        lambda r: classify_extreme_spread(r["high_week_of_month"], r["low_week_of_month"]), axis=1
    )
    valid["profile"] = valid.apply(
        lambda r: profile_name(r["range_regime"], r["shape"], r["direction"]), axis=1
    )

    out_cols = [
        "month_start", "month_end", "open", "high", "low", "close", "range_pips",
        "high_week_of_month", "low_week_of_month", "close_position", "cs", "direction",
        "range_pctile", "cs_pctile", "range_regime", "shape",
        "close_side_wom", "far_side_wom", "extreme_timing", "extreme_spread",
        "n_days", "profile",
    ]
    result = monthly[["month_start", "is_short_month"]].merge(valid[out_cols], on="month_start", how="left")
    result.loc[result["is_short_month"], "profile"] = "Short_Month"
    result["profile"] = result["profile"].fillna("Short_Month")
    return result


def week_of_month_pair_distribution(result: pd.DataFrame) -> dict:
    """The full (low_week_of_month, high_week_of_month) joint table -- e.g.
    "how often does a week-1 low pair with a week-4 high specifically" --
    not just the 3-bucket Same_Week/Adjacent/Spread summary attached to each
    profile. Computed from every valid month regardless of range/shape
    classification (excludes only Short_Month; Insufficient_History months
    still have real high/low_week_of_month values from the rolling-window-
    independent monthly bar construction, so including them maximizes
    sample size) -- this is a direct empirical fact about the price data,
    not something that needs the taxonomy's own rolling-window burn-in."""
    have_woms = result[result["profile"] != "Short_Month"].dropna(
        subset=["high_week_of_month", "low_week_of_month"]
    )
    have_woms = have_woms[
        have_woms["high_week_of_month"].isin(WEEKS_OF_MONTH)
        & have_woms["low_week_of_month"].isin(WEEKS_OF_MONTH)
    ]

    n = len(have_woms)
    pairs = {}
    for low_wom in WEEKS_OF_MONTH:
        pairs[str(low_wom)] = {}
        for high_wom in WEEKS_OF_MONTH:
            count = int(((have_woms["low_week_of_month"] == low_wom) & (have_woms["high_week_of_month"] == high_wom)).sum())
            pairs[str(low_wom)][str(high_wom)] = {"n": count, "pct": round(count / n * 100, 2) if n else 0.0}

    same_week_n = sum(pairs[str(w)][str(w)]["n"] for w in WEEKS_OF_MONTH)
    return {
        "n_months": n,
        "same_week_n": same_week_n,
        "same_week_pct": round(same_week_n / n * 100, 2) if n else 0.0,
        "pairs": pairs,  # pairs[low_week_of_month][high_week_of_month] = {n, pct}
    }


def summarize(result: pd.DataFrame) -> dict:
    labeled = result[~result["profile"].isin(["Short_Month", "Insufficient_History"])]
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
        "n_labeled_months": int(len(labeled)),
        "n_short_months": int((result["profile"] == "Short_Month").sum()),
        "n_insufficient_history_months": int((result["profile"] == "Insufficient_History").sum()),
        "profile_distribution": {
            p: {"n": int(profile_counts[p]), "pct": float(profile_pct[p])} for p in profile_counts.index
        },
        "extreme_timing_by_profile": timing_by_profile,
        "extreme_spread_by_profile": spread_by_profile,
        "avg_range_pips_by_profile": range_by_profile.to_dict(orient="index"),
        "week_of_month_pair_distribution": week_of_month_pair_distribution(result),
        "rolling_window_months": ROLLING_WINDOW,
        "min_periods_months": MIN_PERIODS,
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

    monthly = build_monthly_bars(daily)
    result = build_profiles(monthly, args.pip)
    result.to_csv(args.output_csv, index=False)

    summary = summarize(result)
    summary["asset"] = args.asset
    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, default=str)

    print(f"\n=== {args.asset} monthly profile taxonomy summary ===", file=sys.stderr)
    print(f"Labeled months: {summary['n_labeled_months']}  "
          f"Short months: {summary['n_short_months']}  "
          f"Insufficient history: {summary['n_insufficient_history_months']}", file=sys.stderr)
    print("\nProfile distribution:", file=sys.stderr)
    for p, v in sorted(summary["profile_distribution"].items(), key=lambda kv: -kv[1]["n"]):
        print(f"  {p:28s} n={v['n']:5d}  {v['pct']:5.1f}%", file=sys.stderr)
    print(f"\nwrote {args.output_csv}", file=sys.stderr)
    print(f"wrote {args.output_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
