"""
Phase 1 — MT5 CSV cleaning pipeline (Kaminari Market Profiling System)

Reads raw MT5 M1 export (tab-separated, broker-local time), converts to UTC
using the empirically-confirmed EET/EEST (EU) DST convention, aggregates to
daily bars, and produces the cleaned column set defined in the project spec.

Usage:
    python3 clean_mt5_csv.py <input_csv> <output_csv> [--asset GBPUSD]
"""

import sys
import time
import argparse
import pandas as pd
import numpy as np
from zoneinfo import ZoneInfo

BROKER_TZ = ZoneInfo("Europe/Bucharest")  # EET/EEST, follows EU DST transition dates
UTC = ZoneInfo("UTC")
NY_TZ = ZoneInfo("America/New_York")

# A trading day is flagged as a data gap/artifact (feed outage, stray weekend
# tick, etc.) rather than a genuinely quiet session if it has this few 1-minute
# bars. Chosen from the observed distribution: real low-liquidity sessions
# (Good Friday, Easter Sunday open, New Year's Day) still have 10-60+ bars in
# this dataset; only actual artifacts had 1-2. Re-validate this threshold if a
# future asset/broker shows a different quiet-session floor.
MIN_BARS_FOR_VALID_DAY = 5

PIP_SIZE = {
    "GBPUSD": 0.0001,
    "EURUSD": 0.0001,
    "AUDUSD": 0.0001,
    "NZDUSD": 0.0001,
    "USDCAD": 0.0001,
    "USDCHF": 0.0001,
    "USDJPY": 0.01,  # JPY pair — pip is 2 decimal places, not 4
    "XAUUSD": 0.01,  # gold, quoted to 2 decimals
    "BTCUSD": 0.01,  # quoted to 2 decimals; "pip" here is just the smallest quote increment
    "BRENT": 0.01,   # Brent crude, quoted to 2 decimals
    "WTI": 0.01,     # WTI crude, quoted to 2 decimals
    "US500": 0.1,    # S&P 500 index CFD, quoted to 1 decimal
    "USTECH": 0.1,   # Nasdaq 100 index CFD, quoted to 1 decimal
    "US30": 1.0,     # Dow Jones index CFD, quoted as whole points
    # Fallback default only — pipeline/refresh_asset.py always passes --pip
    # explicitly per its own registry, so this dict mainly matters for
    # direct/manual invocation of this script without --pip.
}


# Single source of truth for session hour boundaries (UTC, fixed year-round --
# an approximation, not DST-aware). Used by both session_tag() below (mutually
# exclusive labeling of a single timestamp) and add_session_ohlc() (each
# session's own full OHLC, including overlap hours) so the two can't drift
# apart into disagreeing about what "Asian"/"London"/"NY" mean.
#
# Asian starts at 21:00 UTC, not 23:00 -- widened from the original boundary
# specifically to close a real gap: 23:00/07:00/12:00-21:00 windows plus their
# overlaps left 21:00-23:00 UTC covered by no session at all (confirmed
# empirically: every case where a day's overall high/low wasn't reflected in
# any of the three session-OHLC columns traced to exactly this window). 21:00
# UTC is also the conventional Sydney-open time many retail FX session models
# already use as the start of the broader "Asian/Pacific" session, so this
# isn't an arbitrary stretch -- it's a real, commonly-used boundary the
# original definition simply didn't use. With this widening, Asian + London +
# NY covers all 24 hours with no gap.
def _in_asian(h):
    # | not "or" -- must vectorize over a pandas Series (add_session_ohlc's
    # bulk hour column) as well as work on a plain scalar float (session_tag).
    return (h >= 21.0) | (h < 8.0)


def _in_london(h):
    # chained comparison (7.0 <= h < 16.0) implicitly uses "and", which
    # breaks on a pandas Series -- write it out explicitly with "&" instead.
    return (h >= 7.0) & (h < 16.0)


def _in_ny(h):
    return (h >= 12.0) & (h < 21.0)


def session_tag(utc_dt: pd.Timestamp) -> str:
    """Approximate standard FX session tag from a UTC timestamp's time-of-day."""
    h = utc_dt.hour + utc_dt.minute / 60.0
    in_asian = _in_asian(h)
    in_london = _in_london(h)
    in_ny = _in_ny(h)
    if in_london and in_ny:
        return "London_NY_Overlap"
    if in_asian and in_london:
        return "Asian_London_Overlap"
    if in_london:
        return "London"
    if in_ny:
        return "New_York"
    if in_asian:
        return "Asian"
    return "Other"  # unreachable now that Asian+London+NY cover all 24 hours; kept as a safety fallback


def load_raw(path: str) -> pd.DataFrame:
    t0 = time.time()
    df = pd.read_csv(
        path,
        sep="\t",
        skiprows=1,
        names=["date", "time", "open", "high", "low", "close", "tickvol", "vol", "spread"],
        dtype={
            "date": "string",
            "time": "string",
            "open": "float64",
            "high": "float64",
            "low": "float64",
            "close": "float64",
            "tickvol": "int32",
            "vol": "int32",
            "spread": "int16",
        },
        engine="c",
    )
    print(f"  loaded {len(df):,} rows in {time.time()-t0:.1f}s", file=sys.stderr)
    return df


def to_utc(df: pd.DataFrame) -> pd.DataFrame:
    t0 = time.time()

    naive = pd.to_datetime(df["date"] + " " + df["time"], format="%Y.%m.%d %H:%M:%S")
    local = naive.dt.tz_localize(BROKER_TZ, ambiguous="NaT", nonexistent="NaT")
    df["utc_dt"] = local.dt.tz_convert(UTC)

    n_bad = df["utc_dt"].isna().sum()
    if n_bad:
        print(f"  WARNING: {n_bad} rows fell in an ambiguous/nonexistent local time "
              f"(DST transition) and were dropped", file=sys.stderr)
        df = df.dropna(subset=["utc_dt"])

    df["utc_date"] = df["utc_dt"].dt.date

    # Trading-day boundary: standard FX convention rolls the day at 5pm New York
    # local time (not UTC midnight or broker midnight). Using pure UTC-calendar-day
    # buckets was tested and found to split the Sunday market open into its own
    # ~40-120-minute fragment (~1,035 spurious "days" in this dataset) because the
    # week reopens around 21:00-22:00 UTC Sunday. Rolling at NY 5pm (DST-aware, via
    # the real America/New_York tz rules) puts that Sunday-evening open where it
    # actually belongs: at the start of Monday's trading day.
    ny_dt = df["utc_dt"].dt.tz_convert(NY_TZ)
    df["trading_day"] = (ny_dt + pd.Timedelta(hours=7)).dt.date

    print(f"  UTC conversion done in {time.time()-t0:.1f}s", file=sys.stderr)
    return df


def detect_daily_only_cutoff(daily: pd.DataFrame, min_bars: int,
                              sustain_window: int = 20, sustain_frac: float = 0.9) -> "pd.Timestamp | None":
    """Some brokers only have Daily-resolution history before their M1 feed
    began (e.g. 1993-1998 on this dataset's broker, cutting over sharply on
    1999.01.04) -- MT5's M1 export still emits one row per day for that era,
    at n_bars == 1, indistinguishable from a real data gap on bar count
    alone. Detects the date M1 coverage actually starts, so those early rows
    can be trusted as real (if coarse) daily OHLC instead of excluded as gaps.

    A "candidate" day (n_bars > min_bars) only counts as the real cutover if
    at least `sustain_frac` of the following `sustain_window` days are also
    dense -- guards against a single early spike (e.g. a busy news day)
    being mistaken for the start of continuous M1 coverage. Returns None if
    no such sustained transition exists (the file is M1-dense from its very
    first day, e.g. an asset with no pre-M1 history at all).
    """
    daily = daily.sort_values("date").reset_index(drop=True)
    dense = daily["n_bars"] > min_bars
    # forward-looking fraction of dense days over the next `sustain_window`
    # entries (reverse -> trailing rolling mean -> reverse back)
    forward_frac = dense[::-1].rolling(sustain_window, min_periods=1).mean()[::-1]
    candidates = daily.index[dense & (forward_frac >= sustain_frac)]
    if len(candidates) == 0:
        return None
    return daily.loc[candidates[0], "date"]


def add_session_ohlc(df: pd.DataFrame, daily: pd.DataFrame) -> pd.DataFrame:
    """Adds each session's own open/high/low/close as separate columns per
    trading day -- distinct from session_tag()'s mutually-exclusive labels
    (used elsewhere to tag which single bucket a specific extreme's time
    falls into). A session's own OHLC needs its *full* native hour window,
    including hours it shares with an adjacent session (e.g. London's own
    high/low must include the London/NY overlap hours) -- excluding those
    hours would understate that session's real traded range. This data
    exists to answer "was session X's own high/low pierced during session
    Y," which needs each session's true extremes, not a mutually-exclusive
    slice of them, so overlap-hour bars deliberately count toward both
    sessions they belong to.

    A day with no bars in a given session's window (a data gap, or the old
    daily-only era's single EOD bar landing outside that window) leaves that
    session's four columns as NaN -- the honest result of genuinely having
    no intraday data for that window, same as elsewhere in this pipeline.
    """
    t0 = time.time()
    hour = df["utc_dt"].dt.hour + df["utc_dt"].dt.minute / 60.0
    windows = {
        "asian": _in_asian(hour),
        "london": _in_london(hour),
        "ny": _in_ny(hour),
    }

    for name, mask in windows.items():
        sub = df[mask]
        if sub.empty:
            for col in ["open", "high", "low", "close"]:
                daily[f"{name}_{col}"] = np.nan
            continue
        g = sub.groupby("trading_day", sort=True)
        open_idx = g["utc_dt"].idxmin()
        close_idx = g["utc_dt"].idxmax()
        sess = pd.DataFrame({
            "date": pd.to_datetime(list(g.groups.keys())),
            f"{name}_open": sub.loc[open_idx, "open"].values,
            f"{name}_high": g["high"].max().values,
            f"{name}_low": g["low"].min().values,
            f"{name}_close": sub.loc[close_idx, "close"].values,
        })
        daily = daily.merge(sess, on="date", how="left")

    print(f"  session OHLC computed in {time.time()-t0:.1f}s", file=sys.stderr)
    return daily


def aggregate_daily(df: pd.DataFrame, asset: str, pip: float = None) -> pd.DataFrame:
    t0 = time.time()
    if pip is None:
        if asset not in PIP_SIZE:
            raise KeyError(
                f"No pip size known for {asset!r} and none passed via --pip. "
                f"Pass --pip explicitly (e.g. 0.01 for JPY pairs, 0.0001 otherwise)."
            )
        pip = PIP_SIZE[asset]
    df = df.sort_values("utc_dt").reset_index(drop=True)

    g = df.groupby("trading_day", sort=True)

    open_idx = g["utc_dt"].idxmin()
    close_idx = g["utc_dt"].idxmax()
    high_idx = g["high"].idxmax()
    low_idx = g["low"].idxmin()

    daily = pd.DataFrame({
        "date": pd.to_datetime(list(g.groups.keys())),
        "open": df.loc[open_idx, "open"].values,
        "high": g["high"].max().values,
        "low": g["low"].min().values,
        "close": df.loc[close_idx, "close"].values,
        "open_time": df.loc[open_idx, "utc_dt"].values,
        "high_time": df.loc[high_idx, "utc_dt"].values,
        "low_time": df.loc[low_idx, "utc_dt"].values,
        "close_time": df.loc[close_idx, "utc_dt"].values,
        "n_bars": g.size().values,
    })

    low_bar_count = daily["n_bars"] <= MIN_BARS_FOR_VALID_DAY

    cutoff = detect_daily_only_cutoff(daily, MIN_BARS_FOR_VALID_DAY)
    is_pre_cutoff = (daily["date"] < cutoff) if cutoff is not None else pd.Series(False, index=daily.index)

    # Low-bar-count days before the detected M1-coverage cutoff are a real
    # (if coarse) single daily bar, not a feed outage -- keep their OHLC/
    # range trusted. Same low bar count at/after the cutoff is a genuine gap.
    daily["is_daily_only"] = low_bar_count & is_pre_cutoff
    daily["is_data_gap"] = low_bar_count & ~is_pre_cutoff
    daily["daily_range_pips"] = ((daily["high"] - daily["low"]) / pip).round(1)
    daily.loc[daily["is_data_gap"], "daily_range_pips"] = np.nan

    if daily["is_daily_only"].any():
        n_daily_only = int(daily["is_daily_only"].sum())
        print(f"  daily-only historical era detected: {n_daily_only} days before {cutoff.date()} "
              f"(single EOD bar/day, no intrabar granularity -- trusted, not treated as a gap)", file=sys.stderr)

    for col in ["open_time", "high_time", "low_time", "close_time"]:
        daily[col + "_session"] = pd.to_datetime(daily[col]).apply(session_tag)

    print(f"  daily aggregation done in {time.time()-t0:.1f}s "
          f"({len(daily):,} trading days)", file=sys.stderr)
    return daily


def add_period_flags(daily: pd.DataFrame) -> pd.DataFrame:
    daily = daily.sort_values("date").reset_index(drop=True)
    d = daily["date"]

    iso = d.dt.isocalendar()
    daily["iso_year"] = iso["year"]
    daily["iso_week"] = iso["week"]
    daily["year"] = d.dt.year
    daily["month"] = d.dt.month

    # Data-gap days (see MIN_BARS_FOR_VALID_DAY) are excluded from period
    # high/low determination so a stray dummy tick can't masquerade as a
    # weekly/monthly/yearly extreme. Their own high/low values are still shown
    # in the output, just not eligible to win the period comparison.
    high_valid = daily["high"].where(~daily["is_data_gap"])
    low_valid = daily["low"].where(~daily["is_data_gap"])

    # Retrospective flags: true only for the actual high/low bar of a *complete* period.
    for period_cols, prefix in [
        (["iso_year", "iso_week"], "week"),
        (["year", "month"], "month"),
        (["year"], "year"),
    ]:
        period_high = high_valid.groupby([daily[c] for c in period_cols]).transform("max")
        period_low = low_valid.groupby([daily[c] for c in period_cols]).transform("min")
        daily[f"is_{prefix}_high"] = (~daily["is_data_gap"] & (daily["high"] == period_high)).astype("boolean")
        daily[f"is_{prefix}_low"] = (~daily["is_data_gap"] & (daily["low"] == period_low)).astype("boolean")

        # mark the final period in the file as incomplete (can't retrospectively
        # confirm its high/low until more data arrives) rather than silently
        # asserting a flag that later CSV uploads could invalidate
        last_period = daily[period_cols].iloc[-1]
        is_last_period = (daily[period_cols] == last_period).all(axis=1)
        daily.loc[is_last_period, f"is_{prefix}_high"] = pd.NA
        daily.loc[is_last_period, f"is_{prefix}_low"] = pd.NA

        # "so-far" running values, for live use during an in-progress period.
        # Gap days are excluded from setting a new so-far extreme, then
        # forward-filled so a gap day still shows the last genuine running
        # value instead of a blank.
        keys = [daily[c] for c in period_cols]
        daily[f"{prefix}_high_so_far"] = high_valid.groupby(keys).cummax().groupby(keys).ffill()
        daily[f"{prefix}_low_so_far"] = low_valid.groupby(keys).cummin().groupby(keys).ffill()

    return daily


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_csv")
    ap.add_argument("output_csv")
    ap.add_argument("--asset", default="GBPUSD")
    ap.add_argument("--pip", type=float, default=None, help="pip size for this asset, e.g. 0.01 for JPY pairs. Falls back to the PIP_SIZE table above if omitted.")
    args = ap.parse_args()

    print(f"Phase 1 cleaning: {args.asset}", file=sys.stderr)
    df = load_raw(args.input_csv)
    df = to_utc(df)
    daily = aggregate_daily(df, args.asset, args.pip)
    daily = add_session_ohlc(df, daily)
    daily = add_period_flags(daily)

    col_order = [
        "date", "open", "high", "low", "close", "daily_range_pips",
        "open_time", "high_time", "low_time", "close_time",
        "open_time_session", "high_time_session", "low_time_session", "close_time_session",
        "asian_open", "asian_high", "asian_low", "asian_close",
        "london_open", "london_high", "london_low", "london_close",
        "ny_open", "ny_high", "ny_low", "ny_close",
        "is_week_high", "is_week_low", "week_high_so_far", "week_low_so_far",
        "is_month_high", "is_month_low", "month_high_so_far", "month_low_so_far",
        "is_year_high", "is_year_low", "year_high_so_far", "year_low_so_far",
        "is_data_gap", "is_daily_only", "n_bars",
    ]
    daily[col_order].to_csv(args.output_csv, index=False)
    print(f"  wrote {args.output_csv}", file=sys.stderr)


if __name__ == "__main__":
    main()
