"""
Phase 1 — Core statistics engine (Kaminari Market Profiling System)

Consumes the cleaned daily CSV produced by clean_mt5_csv.py and computes:
  - weekly / monthly aggregates (range in pips, which day/week the extreme fell on)
  - time-of-extreme statistics (mode bucket, circular mean, circular median,
    concentration) for daily highs/lows
  - range distributions (percentiles, ADR) across multiple lookback windows,
    both percentile-based and fixed-multiple-based regime thresholds

Output: a single JSON file per asset with everything the dashboard (Phase 3)
will need to visualize, plus a human-readable console summary for spot-checking.

Usage:
    python3 stats_engine.py <daily_clean_csv> <output_json> [--asset GBPUSD]
"""

import sys
import json
import argparse
import numpy as np
import pandas as pd

MINUTES_PER_DAY = 1440

LOOKBACK_WINDOWS = {
    "full": None,
    "5y": pd.DateOffset(years=5),
    "1y": pd.DateOffset(years=1),
    "3mo": pd.DateOffset(months=3),
}

ADR_DAY_WINDOWS = [5, 14, 20]
REGIME_PERCENTILES = {"compression_pct": 20, "expansion_pct": 80}
REGIME_MULTIPLES = {"compression_mult": 0.7, "expansion_mult": 1.3}  # vs. latest ADR20, kept as a comparison point only


# ---------------------------------------------------------------------------
# Circular time-of-day statistics
# ---------------------------------------------------------------------------

def _minutes_since_midnight(ts: pd.Series) -> np.ndarray:
    dt = pd.to_datetime(ts)
    return (dt.dt.hour * 60 + dt.dt.minute).to_numpy(dtype=float)


def circular_time_stats(time_series: pd.Series, bucket_minutes: int = 30) -> dict:
    """Mode (binned), circular mean, circular median (approx.), and a
    concentration score (0 = uniformly scattered, 1 = perfectly clustered)
    for a series of UTC timestamps' time-of-day."""
    mins = _minutes_since_midnight(time_series)
    n = len(mins)
    if n == 0:
        return {"n": 0}

    # Mode: bin into fixed buckets, report the most frequent bucket.
    n_buckets = MINUTES_PER_DAY // bucket_minutes
    bucket_idx = (mins // bucket_minutes).astype(int) % n_buckets
    counts = np.bincount(bucket_idx, minlength=n_buckets)
    mode_bucket = int(counts.argmax())
    mode_start_min = mode_bucket * bucket_minutes
    mode_pct = counts[mode_bucket] / n * 100

    # Circular mean + concentration (mean resultant length R), via unit vectors.
    theta = 2 * np.pi * mins / MINUTES_PER_DAY
    C = np.cos(theta).mean()
    S = np.sin(theta).mean()
    R = float(np.hypot(C, S))  # 0 = scattered, 1 = perfectly concentrated
    mean_angle = np.arctan2(S, C)
    circ_mean_min = (mean_angle / (2 * np.pi) * MINUTES_PER_DAY) % MINUTES_PER_DAY

    # Circular median (approx.): search candidate angles at each 5-min bin,
    # pick the one minimizing total circular distance to all observations.
    candidates = np.arange(0, MINUTES_PER_DAY, 5)
    cand_theta = 2 * np.pi * candidates / MINUTES_PER_DAY
    # circular distance matrix via broadcasting (n_candidates x n_obs) kept
    # small by using histogram counts per 5-min bin rather than raw n points
    hist_counts = np.bincount((mins // 5).astype(int) % (MINUTES_PER_DAY // 5),
                               minlength=MINUTES_PER_DAY // 5)
    diffs = np.abs(cand_theta[:, None] - (2 * np.pi * candidates / MINUTES_PER_DAY)[None, :])
    diffs = np.minimum(diffs, 2 * np.pi - diffs)
    total_dist = (diffs * hist_counts[None, :]).sum(axis=1)
    circ_median_min = float(candidates[total_dist.argmin()])

    def fmt(m):
        h, mm = divmod(int(round(m)) % MINUTES_PER_DAY, 60)
        return f"{h:02d}:{mm:02d}"

    # Full per-bucket histogram (not just the mode) — needed by the Phase 3
    # dashboard's time-of-extreme heatmap so it can show the whole
    # distribution's shape, not just call out a single winning bucket.
    histogram = [
        {
            "bucket_start_utc": fmt(b * bucket_minutes),
            "count": int(counts[b]),
            "pct": round(float(counts[b]) / n * 100, 2),
        }
        for b in range(n_buckets)
    ]

    return {
        "n": int(n),
        "mode_bucket_start_utc": fmt(mode_start_min),
        "mode_bucket_end_utc": fmt(mode_start_min + bucket_minutes),
        "mode_bucket_pct_of_days": round(float(mode_pct), 1),
        "circular_mean_utc": fmt(circ_mean_min),
        "circular_median_utc": fmt(circ_median_min),
        "concentration_R": round(R, 3),
        "histogram": histogram,
    }


def session_distribution(session_series: pd.Series) -> dict:
    counts = session_series.value_counts()
    pct = (counts / counts.sum() * 100).round(1)
    return {k: {"n": int(counts[k]), "pct": float(pct[k])} for k in counts.index}


# Tier 5b's session-defined extreme profile (market-profiling-system-spec.md
# §4.5): the joint (low_session, high_session) pattern -- not just the two
# existing marginal session_distribution()s (which session tends to have
# the high, which tends to have the low, tracked separately). Same full-
# joint-table treatment as Weekly's weekday_pair_distribution / Monthly's
# week_of_month_pair_distribution / Yearly's month_pair_distribution, one
# level finer (sub-daily). Uses session_tag()'s real 6-tag scheme (Asian/
# London/New_York/both overlaps/Other) rather than the spec's originally-
# proposed simplified 3-session bucket names -- validated (2026-09-06) that
# the overlap and Other tags carry real, non-trivial weight (e.g. London-NY
# overlap is the single most common session for both the high and the low
# in every asset checked), so collapsing them away would lose real
# information, matching how every other pairing table in this pipeline
# keeps the full natural category set rather than a forced simplification.
SESSION_TAGS = ["Asian", "Asian_London_Overlap", "London", "London_NY_Overlap", "New_York", "Other"]


def session_pair_distribution(high_session: pd.Series, low_session: pd.Series) -> dict:
    """high_session/low_session must already exclude is_data_gap and
    is_daily_only rows -- an is_daily_only day's high_time/low_time both
    collapse to its single bar's timestamp (a data-format artifact, not a
    genuine intraday fact), which would otherwise inject a false same-
    session spike (found 2026-09-06 while building this: XAUUSD's
    daily-only era showed 100% Other/Other before this exclusion)."""
    valid = pd.DataFrame({"high": high_session, "low": low_session}).dropna()
    valid = valid[valid["high"].isin(SESSION_TAGS) & valid["low"].isin(SESSION_TAGS)]

    n = len(valid)
    pairs = {}
    for low_tag in SESSION_TAGS:
        pairs[low_tag] = {}
        for high_tag in SESSION_TAGS:
            count = int(((valid["low"] == low_tag) & (valid["high"] == high_tag)).sum())
            pairs[low_tag][high_tag] = {"n": count, "pct": round(count / n * 100, 2) if n else 0.0}

    same_session_n = sum(pairs[t][t]["n"] for t in SESSION_TAGS)
    return {
        "n_days": n,
        "same_session_n": same_session_n,
        "same_session_pct": round(same_session_n / n * 100, 2) if n else 0.0,
        "pairs": pairs,  # pairs[low_session][high_session] = {n, pct}
    }


HOURS = list(range(24))


def hour_pair_distribution(high_time: pd.Series, low_time: pd.Series) -> dict:
    """Finer-grained sibling of session_pair_distribution() -- which
    *specific* UTC hour (not just which session) carries the day's high vs.
    low. Added 2026-09-06 at the user's request, to see which hours drive
    the session-pairing relationship above (e.g. is "London-NY overlap low
    + Asian high" concentrated at one edge of each window's hour range, or
    spread evenly across it). Same is_daily_only exclusion requirement as
    session_pair_distribution() -- a single-bar day's high_time/low_time
    are both a data-format artifact, not genuine intraday facts."""
    valid = pd.DataFrame({
        "high": high_time.dt.hour if hasattr(high_time, "dt") else high_time,
        "low": low_time.dt.hour if hasattr(low_time, "dt") else low_time,
    }).dropna()

    n = len(valid)
    pairs = {}
    for low_h in HOURS:
        pairs[str(low_h)] = {}
        for high_h in HOURS:
            count = int(((valid["low"] == low_h) & (valid["high"] == high_h)).sum())
            pairs[str(low_h)][str(high_h)] = {"n": count, "pct": round(count / n * 100, 2) if n else 0.0}

    same_hour_n = sum(pairs[str(h)][str(h)]["n"] for h in HOURS)
    return {
        "n_days": n,
        "same_hour_n": same_hour_n,
        "same_hour_pct": round(same_hour_n / n * 100, 2) if n else 0.0,
        "pairs": pairs,  # pairs[low_hour][high_hour] = {n, pct}
    }


# ---------------------------------------------------------------------------
# Range distribution statistics
# ---------------------------------------------------------------------------

MODE_HIST_BINS = 20


def binned_mode(v: pd.Series) -> dict | None:
    """The most frequent range *bucket*, not a single raw value — the
    statistically meaningful version of "mode" for continuous pip data,
    where almost every exact value occurs once or twice across ~5,000 days
    and a raw mode would just be noise (see raw_mode() below, which is kept
    for comparison since it was explicitly requested)."""
    if len(v) == 0:
        return None
    lo, hi = float(v.quantile(0.05)), float(v.quantile(0.95))
    if hi <= lo:
        lo, hi = float(v.min()), float(v.max())
    if hi <= lo:
        return None
    counts, edges = np.histogram(v, bins=MODE_HIST_BINS, range=(lo, hi))
    if counts.sum() == 0:
        return None
    idx = int(counts.argmax())
    return {
        "bin_low": round(float(edges[idx]), 1),
        "bin_high": round(float(edges[idx + 1]), 1),
        "count": int(counts[idx]),
        "pct_of_n": round(float(counts[idx]) / len(v) * 100, 1),
    }


def raw_mode(v: pd.Series) -> dict | None:
    """The single most-repeated exact value. Explicitly requested alongside
    binned_mode() for direct comparison — flagged in the UI as a weak signal
    on continuous data since it's often based on a handful of coincidentally
    identical days."""
    if len(v) == 0:
        return None
    m = v.mode()
    if len(m) == 0:
        return None
    val = float(m.iloc[0])
    count = int((v == val).sum())
    return {
        "value": round(val, 1),
        "count": count,
        "pct_of_n": round(count / len(v) * 100, 1),
        "n_values_tied": int(len(m)),
    }


def range_distribution(values: pd.Series) -> dict:
    v = values.dropna()
    if len(v) == 0:
        return {"n": 0}
    q_levels = [0.05, 0.10, 0.20, 0.25, 0.50, 0.75, 0.80, 0.90, 0.95]
    pct = v.quantile(q_levels)
    out = {
        "n": int(len(v)),
        "mean": round(float(v.mean()), 1),
        "median": round(float(v.median()), 1),
        "std": round(float(v.std()), 1),
        "min": round(float(v.min()), 1),
        "max": round(float(v.max()), 1),
        "mode_binned": binned_mode(v),
        "mode_raw": raw_mode(v),
    }
    for q in q_levels:
        out[f"p{int(q*100):02d}"] = round(float(pct[q]), 1)
    return out


def windowed_range_stats(df: pd.DataFrame, date_col: str, range_col: str) -> dict:
    """Range distribution stats computed at each lookback window, anchored to
    the most recent date in the dataset (not wall-clock 'today')."""
    valid = df[~df.get("is_data_gap", False)] if "is_data_gap" in df.columns else df
    as_of = valid[date_col].max()
    out = {}
    for label, offset in LOOKBACK_WINDOWS.items():
        cutoff = (as_of - offset) if offset is not None else None
        window = valid if cutoff is None else valid[valid[date_col] >= cutoff]
        stats = range_distribution(window[range_col])
        if stats.get("n", 0) > 0:
            stats["compression_threshold_pips"] = stats[f"p{REGIME_PERCENTILES['compression_pct']:02d}"] \
                if f"p{REGIME_PERCENTILES['compression_pct']:02d}" in stats else None
            stats["expansion_threshold_pips"] = stats[f"p{REGIME_PERCENTILES['expansion_pct']:02d}"] \
                if f"p{REGIME_PERCENTILES['expansion_pct']:02d}" in stats else None
        out[label] = stats
    return out


def latest_adr(df: pd.DataFrame, range_col: str) -> dict:
    valid = df[~df.get("is_data_gap", False)].sort_values("date") if "is_data_gap" in df.columns else df.sort_values("date")
    out = {}
    for n in ADR_DAY_WINDOWS:
        tail = valid[range_col].dropna().tail(n)
        out[f"ADR_{n}"] = round(float(tail.mean()), 1) if len(tail) == n else None
    if out.get(f"ADR_{ADR_DAY_WINDOWS[-1]}"):
        base = out[f"ADR_{ADR_DAY_WINDOWS[-1]}"]
        out["fixed_multiple_thresholds"] = {
            "compression_pips": round(base * REGIME_MULTIPLES["compression_mult"], 1),
            "expansion_pips": round(base * REGIME_MULTIPLES["expansion_mult"], 1),
            "based_on": f"ADR_{ADR_DAY_WINDOWS[-1]}",
        }
    return out


def windowed_circular_stats(df: pd.DataFrame, date_col: str, time_col: str) -> dict:
    """Circular time-of-day stats computed at each lookback window — the same
    dial as range stats, since concentration can look very different in the
    full 20-year blend vs. the current regime."""
    as_of = df[date_col].max()
    out = {}
    for label, offset in LOOKBACK_WINDOWS.items():
        cutoff = (as_of - offset) if offset is not None else None
        window = df if cutoff is None else df[df[date_col] >= cutoff]
        out[label] = circular_time_stats(window[time_col])
    return out


# ---------------------------------------------------------------------------
# Weekly / monthly aggregation
# ---------------------------------------------------------------------------

def build_weekly(daily: pd.DataFrame, pip: float) -> pd.DataFrame:
    d = daily[~daily["is_data_gap"]].copy()
    d["iso_year"] = d["date"].dt.isocalendar().year
    d["iso_week"] = d["date"].dt.isocalendar().week
    d["weekday"] = d["date"].dt.day_name()

    g = d.groupby(["iso_year", "iso_week"])
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    weekly = pd.DataFrame({
        "week_start": g["date"].min().values,
        "week_end": g["date"].max().values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "high_weekday": d.loc[high_idx, "weekday"].values,
        "low_weekday": d.loc[low_idx, "weekday"].values,
        "n_days": g.size().values,
    })
    weekly["range_pips"] = ((weekly["high"] - weekly["low"]) / pip).round(1)
    return weekly


def build_monthly(daily: pd.DataFrame, pip: float) -> pd.DataFrame:
    d = daily[~daily["is_data_gap"]].copy()
    d["year"] = d["date"].dt.year
    d["month"] = d["date"].dt.month
    d["dom"] = d["date"].dt.day
    d["week_of_month"] = ((d["dom"] - 1) // 7 + 1).clip(upper=5)

    g = d.groupby(["year", "month"])
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    monthly = pd.DataFrame({
        "month_start": g["date"].min().values,
        "month_end": g["date"].max().values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "high_week_of_month": d.loc[high_idx, "week_of_month"].values,
        "low_week_of_month": d.loc[low_idx, "week_of_month"].values,
        "n_days": g.size().values,
    })
    monthly["range_pips"] = ((monthly["high"] - monthly["low"]) / pip).round(1)
    return monthly


def build_yearly(daily: pd.DataFrame, pip: float) -> pd.DataFrame:
    d = daily[~daily["is_data_gap"]].copy()
    d["year"] = d["date"].dt.year

    g = d.groupby("year")
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    yearly = pd.DataFrame({
        "year_start": g["date"].min().values,
        "year_end": g["date"].max().values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "high_month": d.loc[high_idx, "date"].dt.month.values,
        "low_month": d.loc[low_idx, "date"].dt.month.values,
        # ISO week-of-year (1-52/53) the yearly extreme fell in — same basis
        # as build_weekly()'s iso_week grouping, so this lines up with the
        # week numbers shown elsewhere (e.g. the calendar day-detail panel).
        # .astype(int) — isocalendar() returns pandas' nullable UInt32Dtype,
        # whose numpy.uint32 scalars json.dump() can't use as dict keys
        # (unlike plain int64, which .dt.month already happens to produce).
        "high_week": d.loc[high_idx, "date"].dt.isocalendar().week.astype(int).values,
        "low_week": d.loc[low_idx, "date"].dt.isocalendar().week.astype(int).values,
        "n_days": g.size().values,
    })
    yearly["range_pips"] = ((yearly["high"] - yearly["low"]) / pip).round(1)
    return yearly


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("daily_csv")
    ap.add_argument("output_json")
    ap.add_argument("--asset", default="GBPUSD")
    ap.add_argument("--pip", type=float, default=0.0001)
    ap.add_argument("--unit", default="pips", help="display label for range values, e.g. 'points' for a non-FX instrument (default: pips)")
    args = ap.parse_args()

    daily = pd.read_csv(args.daily_csv, parse_dates=["date", "open_time", "high_time", "low_time", "close_time"])
    daily_valid = daily[~daily["is_data_gap"]]
    # is_daily_only days (pre-M1-coverage era, one EOD bar per day) have no
    # real intraday high_time/low_time -- that single bar's timestamp is a
    # data-format artifact, not a genuine "the extreme occurred here" fact,
    # so session_tag() bucketing it (or the circular-stats calc) injects a
    # false, tightly-clustered-looking signal into the Full History window
    # (found 2026-09-06: XAUUSD's Full History daily-high concentration_R
    # was 0.672 -- every legitimate finding elsewhere in this pipeline tops
    # out around 0.25-0.30 -- driven entirely by 64% of XAUUSD's history
    # being this era). The 5Y/1Y/3mo windows are unaffected since this era
    # is always the oldest part of history by construction. Everything else
    # that uses daily_valid (n_days, as_of, weekday/week-of-month/month-of-
    # year marginals) is a calendar fact independent of intraday timing and
    # correctly stays inclusive of these days.
    daily_valid_intraday = daily_valid[~daily_valid["is_daily_only"]]

    weekly = build_weekly(daily, args.pip)
    monthly = build_monthly(daily, args.pip)
    yearly = build_yearly(daily, args.pip)

    result = {
        "asset": args.asset,
        "unit": args.unit,
        "as_of": str(daily_valid["date"].max().date()),
        "n_days": int(len(daily_valid)),
        "n_weeks": int(len(weekly)),
        "n_months": int(len(monthly)),
        "n_years": int(len(yearly)),

        "daily_range": {
            "windowed_distribution": windowed_range_stats(daily, "date", "daily_range_pips"),
            "latest_adr": latest_adr(daily, "daily_range_pips"),
        },
        "weekly_range": {
            "windowed_distribution": windowed_range_stats(weekly, "week_start", "range_pips"),
        },
        "monthly_range": {
            "windowed_distribution": windowed_range_stats(monthly, "month_start", "range_pips"),
        },
        # Not windowed by lookback (unlike daily/weekly/monthly) — with only
        # ~20 years of history, a "1Y"/"3mo" slice of yearly bars would be 0-1
        # samples and meaningless. Always reflects the full history; the small
        # n itself is shown in the UI rather than hidden behind a dial.
        "yearly_range": {
            "distribution": range_distribution(yearly["range_pips"]),
        },

        "daily_high_time": {
            "windowed_circular_stats": windowed_circular_stats(daily_valid_intraday, "date", "high_time"),
            "session_distribution": session_distribution(daily_valid_intraday["high_time_session"]),
        },
        "daily_low_time": {
            "windowed_circular_stats": windowed_circular_stats(daily_valid_intraday, "date", "low_time"),
            "session_distribution": session_distribution(daily_valid_intraday["low_time_session"]),
        },
        "daily_session_pair_distribution": session_pair_distribution(
            daily_valid_intraday["high_time_session"], daily_valid_intraday["low_time_session"]
        ),
        "daily_hour_pair_distribution": hour_pair_distribution(
            daily_valid_intraday["high_time"], daily_valid_intraday["low_time"]
        ),

        "weekly_high_day": weekly["high_weekday"].value_counts().to_dict(),
        "weekly_low_day": weekly["low_weekday"].value_counts().to_dict(),
        "monthly_high_week_of_month": monthly["high_week_of_month"].value_counts().sort_index().to_dict(),
        "monthly_low_week_of_month": monthly["low_week_of_month"].value_counts().sort_index().to_dict(),
        "yearly_high_month": yearly["high_month"].value_counts().sort_index().to_dict(),
        "yearly_low_month": yearly["low_month"].value_counts().sort_index().to_dict(),
        "yearly_high_week": yearly["high_week"].value_counts().sort_index().to_dict(),
        "yearly_low_week": yearly["low_week"].value_counts().sort_index().to_dict(),
    }

    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, default=str)

    # console summary for spot-checking
    print(f"\n=== {args.asset} stats summary (as of {result['as_of']}) ===")
    print(f"Days: {result['n_days']}  Weeks: {result['n_weeks']}  Months: {result['n_months']}")
    print("\nDaily range (full history):", result["daily_range"]["windowed_distribution"]["full"])
    print("\nLatest ADR:", result["daily_range"]["latest_adr"])
    for w in LOOKBACK_WINDOWS:
        print(f"\nDaily HIGH time-of-day [{w}]:", result["daily_high_time"]["windowed_circular_stats"][w])
        print(f"Daily LOW time-of-day  [{w}]:", result["daily_low_time"]["windowed_circular_stats"][w])
    print("\nHigh-time session distribution (full history):", result["daily_high_time"]["session_distribution"])
    print("Low-time session distribution (full history):", result["daily_low_time"]["session_distribution"])
    print("\nWeekly high falls on:", result["weekly_high_day"])
    print("Weekly low falls on:", result["weekly_low_day"])
    print(f"\nwrote {args.output_json}")


if __name__ == "__main__":
    main()
