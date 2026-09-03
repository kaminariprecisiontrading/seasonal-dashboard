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
    # JPY pairs, crypto, stocks etc. added here as the system expands (see spec §2.5 / §8)
}


def session_tag(utc_dt: pd.Timestamp) -> str:
    """Approximate standard FX session tag from a UTC timestamp's time-of-day."""
    h = utc_dt.hour + utc_dt.minute / 60.0
    in_asian = (h >= 23.0) or (h < 8.0)
    in_london = 7.0 <= h < 16.0
    in_ny = 12.0 <= h < 21.0
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
    return "Other"


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


def aggregate_daily(df: pd.DataFrame, asset: str) -> pd.DataFrame:
    t0 = time.time()
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

    daily["is_data_gap"] = daily["n_bars"] <= MIN_BARS_FOR_VALID_DAY
    daily["daily_range_pips"] = ((daily["high"] - daily["low"]) / pip).round(1)
    daily.loc[daily["is_data_gap"], "daily_range_pips"] = np.nan

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
    args = ap.parse_args()

    print(f"Phase 1 cleaning: {args.asset}", file=sys.stderr)
    df = load_raw(args.input_csv)
    df = to_utc(df)
    daily = aggregate_daily(df, args.asset)
    daily = add_period_flags(daily)

    col_order = [
        "date", "open", "high", "low", "close", "daily_range_pips",
        "open_time", "high_time", "low_time", "close_time",
        "open_time_session", "high_time_session", "low_time_session", "close_time_session",
        "is_week_high", "is_week_low", "week_high_so_far", "week_low_so_far",
        "is_month_high", "is_month_low", "month_high_so_far", "month_low_so_far",
        "is_year_high", "is_year_low", "year_high_so_far", "year_low_so_far",
        "is_data_gap", "n_bars",
    ]
    daily[col_order].to_csv(args.output_csv, index=False)
    print(f"  wrote {args.output_csv}", file=sys.stderr)


if __name__ == "__main__":
    main()
