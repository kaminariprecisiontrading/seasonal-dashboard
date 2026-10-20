"""
Phase 2d — Rule-based yearly profile taxonomy (Kaminari Market Profiling System)

Yearly sibling of profile_taxonomy.py / _weekly.py / _monthly.py (Tier 5's
coarsest granularity). Builds yearly bars from the cleaned daily CSV and
assigns each calendar year one of the same 8 named profiles as Daily/Weekly/
Monthly, from the same two axes (range regime, closing shape).

Exploratory analysis (GBPUSD/EURUSD/XAUUSD full history, 2026-09-05) found
this granularity is genuinely thin -- ~28-34 years of history per asset,
~21-26 of those classifiable after burn-in -- and flagged this to the user
before building anything permanent (per the standing validate-first rule).
Explicit decision: keep the full 8-name taxonomy for consistency with
Daily/Weekly/Monthly (not a reduced 3-bucket range-only scheme), disclosed
with a prominent small-sample note rather than silently presented as
equally reliable. Key differences from Weekly/Monthly as a result:

  - **No trailing rolling window.** Daily/Weekly/Monthly all use a window
    matched to (or, for Monthly, deliberately widened from) roughly one
    trailing real year -- meaningless at yearly granularity itself, where
    the whole point is comparing a year to *other years*. Tested an
    EXPANDING window (percentile against all prior years) against small
    trailing windows (15yr/20yr); results were nearly identical, so the
    simpler expanding form was kept -- this also matches stats_engine.py's
    own build_yearly()/yearly_range, which already abandoned trailing-
    window lookback entirely for the same reason ("only ~20 years of
    history, a windowed slice would be 0-1 samples").
  - **Range regime x closing shape correlation is small but inconsistent in
    sign** across assets: +0.153 (GBPUSD), -0.206 (EURUSD), +0.142
    (XAUUSD) -- disclosed, not treated as a problem; still small enough
    that the two-axis split is defensible.
  - **Profile bucket sizes are genuinely thin and some are empty for a
    given asset** -- e.g. GBPUSD's Quiet_Drift_Year_Down had 0 years in the
    exploratory check; several other buckets had only 1-3. Every summary
    JSON this script produces carries n alongside every percentage so this
    is visible, never hidden, and the dashboard side must show the same
    "treat this as a much weaker signal" note the existing yearly_range
    panel already uses (spec/HANDOVER references, not duplicated here).
  - **month_pair_distribution (12x12) is real but very sparse** -- with
    ~30 years spread across 144 cells, most cells are 0 or 1 by
    construction. Included anyway (the user explicitly asked for it, same
    "joint pattern, not just the marginals" idea as Weekly's weekday-pair
    and Monthly's week-of-month-pair tables) but the dashboard must
    disclose the small n prominently rather than implying the same
    confidence Weekly's (thousands of weeks) or Monthly's (hundreds of
    months) heatmaps can claim.

Usage:
    python3 profile_taxonomy_yearly.py <daily_clean_csv> <output_csv> <output_json> --asset GBPUSD --pip 0.0001
"""

import sys
import json
import argparse
import numpy as np
import pandas as pd

# No trailing window -- see module docstring. Percentile rank for year N is
# computed against all years up to and including N (expanding), not a fixed
# lookback. min_periods=8 chosen from the exploratory check: coverage was
# ~79% (26/33 years for GBPUSD/EURUSD) without over-thinning the burn-in
# further (min_periods=10 dropped coverage to ~73% for only a marginal
# distribution-stability gain).
MIN_PERIODS = 8

# Same thresholds as Daily/Weekly/Monthly -- kept for consistency even
# though, at n~25, a 20th-percentile cut lands close to the 5th-smallest
# value (coarse quantization is an accepted, disclosed characteristic of
# this granularity, not something correctable by threshold-tuning).
RANGE_REGIME_PERCENTILES = {"compression": 20, "expansion": 80}
SHAPE_PERCENTILES = {"balanced": 25, "directional": 75}

# A calendar year with fewer trading days than this is a partial year (the
# in-progress current year, or a rare partial first/last year of history)
# -- excluded from classification. ~250-260 days is a full trading year;
# 200 leaves room for a genuinely short-but-real year without admitting an
# obviously-partial one.
MIN_DAYS_FOR_VALID_YEAR = 200

MONTHS = list(range(1, 13))
MONTH_INDEX = {m: m - 1 for m in MONTHS}  # 0-11, same "late = back half" convention as Weekly/Monthly


def expanding_percentile_rank(s: pd.Series, min_periods: int) -> pd.Series:
    """Same rank definition as the Daily/Weekly/Monthly rolling versions
    (percentile of the current value within the window), just against an
    expanding window instead of a fixed trailing one -- see module
    docstring for why. Kept as its own function, not a rolling() call with
    window=len(s), since expanding() is the direct, self-documenting way to
    express "all history up to now"."""
    return s.expanding(min_periods=min_periods).apply(
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


def classify_extreme_timing(close_side_month, far_side_month) -> str:
    """Direct month-granularity analog of Daily's/Weekly's/Monthly's tag:
    "late" means the back half of the year (Jul-Dec) rather than >=50% of
    the period's elapsed span -- the same >=0.5-of-the-period rule,
    discretized to 12 calendar months (index/11 >= 0.5 <=> index >= 6,
    i.e. July on)."""
    if pd.isna(close_side_month) or pd.isna(far_side_month):
        return "Insufficient_History"
    close_idx = MONTH_INDEX.get(int(close_side_month))
    far_idx = MONTH_INDEX.get(int(far_side_month))
    if close_idx is None or far_idx is None:
        return "Insufficient_History"
    close_late = close_idx >= 6
    far_late = far_idx >= 6
    if close_late and not far_late:
        return "Late_Push"
    if not close_late and not far_late:
        return "Early_Resolution"
    if close_late and far_late:
        return "Late_Resolution"
    return "Fade_Risk"


def classify_extreme_spread(high_month, low_month) -> str:
    """Direct analog of Weekly's/Monthly's extreme_spread field, discretized
    to calendar-month gap (linear, not circular -- Dec/Jan are NOT treated
    as adjacent; a known simplification, consistent with how Weekly/Monthly
    also don't wrap their own period boundaries, disclosed rather than
    silently assumed away)."""
    if pd.isna(high_month) or pd.isna(low_month):
        return "Insufficient_History"
    high_idx = MONTH_INDEX.get(int(high_month))
    low_idx = MONTH_INDEX.get(int(low_month))
    if high_idx is None or low_idx is None:
        return "Insufficient_History"
    gap = abs(high_idx - low_idx)
    if gap == 0:
        return "Same_Month"
    if gap == 1:
        return "Adjacent"
    return "Spread"


def profile_name(range_regime: str, shape: str, direction: str) -> str:
    if range_regime == "Insufficient_History" or shape == "Insufficient_History":
        return "Insufficient_History"
    if range_regime == "Expansion":
        if shape == "Directional":
            return f"Trend Year ({direction})"
        if shape == "Mixed":
            return "Volatile Year"
        return "Volatile Reversal Year"
    if range_regime == "Compression":
        if shape == "Directional":
            return f"Quiet Drift Year ({direction})"
        return "Compression Year"
    return "Normal Year"


def build_yearly_bars(daily: pd.DataFrame) -> pd.DataFrame:
    """Yearly OHLC + month-of-extreme tracking from the cleaned daily CSV.
    Same is_data_gap exclusion / is_daily_only inclusion philosophy as
    Daily/Weekly/Monthly. Month-of-extreme uses the same calendar-month
    convention as stats_engine.py's build_yearly() (high_month/low_month),
    kept consistent rather than inventing a different bucketing here."""
    d = daily[~daily["is_data_gap"]].copy()
    d["year"] = d["date"].dt.year
    d["month"] = d["date"].dt.month

    g = d.groupby("year", sort=False)
    open_idx = g["date"].idxmin()
    close_idx = g["date"].idxmax()
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    yearly = pd.DataFrame({
        "year_start": g["date"].min().values,
        "year_end": g["date"].max().values,
        "open": d.loc[open_idx, "open"].values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "close": d.loc[close_idx, "close"].values,
        "high_month": d.loc[high_idx, "month"].values,
        "low_month": d.loc[low_idx, "month"].values,
        "n_days": g.size().values,
    }).sort_values("year_start").reset_index(drop=True)

    yearly["is_short_year"] = yearly["n_days"] < MIN_DAYS_FOR_VALID_YEAR
    return yearly


def build_profiles(yearly: pd.DataFrame, pip: float) -> pd.DataFrame:
    valid = yearly[~yearly["is_short_year"]].copy()

    rng = valid["high"] - valid["low"]
    valid["range_pips"] = (rng / pip).round(1)  # same field name stats_engine.py's build_yearly() already uses
    valid["close_position"] = (valid["close"] - valid["low"]) / rng
    valid["cs"] = 2 * (valid["close_position"] - 0.5).abs()
    valid["direction"] = np.where(valid["close_position"] >= 0.5, "Up", "Down")

    close_near_high = valid["close_position"] >= 0.5
    valid["close_side_month"] = np.where(close_near_high, valid["high_month"], valid["low_month"])
    valid["far_side_month"] = np.where(close_near_high, valid["low_month"], valid["high_month"])

    valid["range_pctile"] = expanding_percentile_rank(valid["range_pips"], MIN_PERIODS)
    valid["cs_pctile"] = expanding_percentile_rank(valid["cs"], MIN_PERIODS)

    valid["range_regime"] = valid["range_pctile"].apply(classify_range_regime)
    valid["shape"] = valid["cs_pctile"].apply(classify_shape)
    valid["extreme_timing"] = valid.apply(
        lambda r: classify_extreme_timing(r["close_side_month"], r["far_side_month"]), axis=1
    )
    valid["extreme_spread"] = valid.apply(
        lambda r: classify_extreme_spread(r["high_month"], r["low_month"]), axis=1
    )
    valid["profile"] = valid.apply(
        lambda r: profile_name(r["range_regime"], r["shape"], r["direction"]), axis=1
    )

    out_cols = [
        "year_start", "year_end", "open", "high", "low", "close", "range_pips",
        "high_month", "low_month", "close_position", "cs", "direction",
        "range_pctile", "cs_pctile", "range_regime", "shape",
        "close_side_month", "far_side_month", "extreme_timing", "extreme_spread",
        "n_days", "profile",
    ]
    result = yearly[["year_start", "is_short_year"]].merge(valid[out_cols], on="year_start", how="left")
    result.loc[result["is_short_year"], "profile"] = "Short_Year"
    result["profile"] = result["profile"].fillna("Short_Year")
    return result


def month_pair_distribution(result: pd.DataFrame) -> dict:
    """The full (low_month, high_month) 12x12 joint table -- e.g. "how often
    does a January low pair with a December high, specifically". Computed
    from every valid year regardless of range/shape classification (excludes
    only Short_Year). Genuinely sparse at this sample size (~28-34 years
    across 144 cells) -- included because it was explicitly requested and
    is the same joint-pattern idea as Weekly's/Monthly's tables, but the
    dashboard consuming this must disclose the small n prominently, not
    imply the same confidence those denser tables can claim."""
    have_months = result[result["profile"] != "Short_Year"].dropna(subset=["high_month", "low_month"])
    have_months = have_months[
        have_months["high_month"].isin(MONTHS) & have_months["low_month"].isin(MONTHS)
    ]

    n = len(have_months)
    pairs = {}
    for low_m in MONTHS:
        pairs[str(low_m)] = {}
        for high_m in MONTHS:
            count = int(((have_months["low_month"] == low_m) & (have_months["high_month"] == high_m)).sum())
            pairs[str(low_m)][str(high_m)] = {"n": count, "pct": round(count / n * 100, 2) if n else 0.0}

    same_month_n = sum(pairs[str(m)][str(m)]["n"] for m in MONTHS)
    return {
        "n_years": n,
        "same_month_n": same_month_n,
        "same_month_pct": round(same_month_n / n * 100, 2) if n else 0.0,
        "pairs": pairs,  # pairs[low_month][high_month] = {n, pct}
    }


def summarize(result: pd.DataFrame) -> dict:
    labeled = result[~result["profile"].isin(["Short_Year", "Insufficient_History"])]
    profile_counts = labeled["profile"].value_counts()
    profile_pct = (profile_counts / len(labeled) * 100).round(2) if len(labeled) else profile_counts

    timing_by_profile = {}
    spread_by_profile = {}
    for p in profile_counts.index:
        sub = labeled[labeled["profile"] == p]
        timing_by_profile[p] = sub["extreme_timing"].value_counts().to_dict()
        spread_by_profile[p] = sub["extreme_spread"].value_counts().to_dict()

    range_by_profile = labeled.groupby("profile")["range_pips"].agg(["mean", "median"]).round(1)

    return {
        "n_labeled_years": int(len(labeled)),
        "n_short_years": int((result["profile"] == "Short_Year").sum()),
        "n_insufficient_history_years": int((result["profile"] == "Insufficient_History").sum()),
        "profile_distribution": {
            p: {"n": int(profile_counts[p]), "pct": float(profile_pct[p])} for p in profile_counts.index
        },
        "extreme_timing_by_profile": timing_by_profile,
        "extreme_spread_by_profile": spread_by_profile,
        "avg_range_pips_by_profile": range_by_profile.to_dict(orient="index"),
        "month_pair_distribution": month_pair_distribution(result),
        "min_periods_years": MIN_PERIODS,
        # No rolling_window field (unlike Weekly/Monthly's rolling_window_weeks/
        # months) -- this taxonomy uses an expanding window, not a fixed one;
        # see module docstring. Flagged explicitly so a dashboard/consumer
        # doesn't go looking for a window field that doesn't apply here.
        "window_type": "expanding",
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

    yearly = build_yearly_bars(daily)
    result = build_profiles(yearly, args.pip)
    result.to_csv(args.output_csv, index=False)

    summary = summarize(result)
    summary["asset"] = args.asset
    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, default=str)

    print(f"\n=== {args.asset} yearly profile taxonomy summary ===", file=sys.stderr)
    print(f"Labeled years: {summary['n_labeled_years']}  "
          f"Short years: {summary['n_short_years']}  "
          f"Insufficient history: {summary['n_insufficient_history_years']}", file=sys.stderr)
    print("\nProfile distribution (small-n granularity -- treat every count as a weak signal):", file=sys.stderr)
    for p, v in sorted(summary["profile_distribution"].items(), key=lambda kv: -kv[1]["n"]):
        print(f"  {p:28s} n={v['n']:5d}  {v['pct']:5.1f}%", file=sys.stderr)
    print(f"\nwrote {args.output_csv}", file=sys.stderr)
    print(f"wrote {args.output_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
