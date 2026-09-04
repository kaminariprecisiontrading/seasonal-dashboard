"""
Phase 3 support — Calendar data export (Kaminari Market Profiling System)

Builds one small JS chunk file per asset per calendar year
(dashboard/data/calendar/<asset>/<year>.js), each a JS object keyed by ISO
date string, holding that day's OHLC/range/profile plus its containing
week's and month's context — the data behind the calendar feature
(spec §5.2). Chunked by year, not one big file, so the dashboard only loads
the years a user actually browses to, via a dynamically-injected
<script> tag (works from a plain file:// open — fetch()/XHR would be
CORS-blocked there). Also writes a small manifest listing which years
exist, so the calendar UI doesn't need to hardcode or probe the range.

Reuses stats_engine.py's build_weekly()/build_monthly() so the week/month
aggregation logic stays in exactly one place.

Usage:
    python3 export_calendar_data.py <daily_clean_csv> <daily_profiles_csv> \
        <output_dir> --asset GBPUSD --pip 0.0001
"""

import os
import json
import argparse
import pandas as pd

from stats_engine import build_weekly, build_monthly


def build_calendar_table(daily: pd.DataFrame, profiles: pd.DataFrame, pip: float) -> pd.DataFrame:
    d = daily.copy()
    d["iso_year"] = d["date"].dt.isocalendar().year
    d["iso_week"] = d["date"].dt.isocalendar().week
    d["year"] = d["date"].dt.year
    d["month"] = d["date"].dt.month

    weekly = build_weekly(daily, pip)
    weekly["iso_year"] = weekly["week_start"].dt.isocalendar().year
    weekly["iso_week"] = weekly["week_start"].dt.isocalendar().week
    weekly = weekly.rename(columns={
        "high": "week_high", "low": "week_low", "range_pips": "week_range_pips",
        "high_weekday": "week_high_weekday", "low_weekday": "week_low_weekday",
    })

    monthly = build_monthly(daily, pip)
    monthly["year"] = monthly["month_start"].dt.year
    monthly["month"] = monthly["month_start"].dt.month
    monthly = monthly.rename(columns={
        "high": "month_high", "low": "month_low", "range_pips": "month_range_pips",
        "high_week_of_month": "month_high_wom", "low_week_of_month": "month_low_wom",
    })

    d = d.merge(
        weekly[["iso_year", "iso_week", "week_start", "week_end", "week_high", "week_low",
                "week_range_pips", "week_high_weekday", "week_low_weekday"]],
        on=["iso_year", "iso_week"], how="left",
    )
    d = d.merge(
        monthly[["year", "month", "month_start", "month_end", "month_high", "month_low",
                  "month_range_pips", "month_high_wom", "month_low_wom"]],
        on=["year", "month"], how="left",
    )
    d = d.merge(profiles[["date", "profile"]], on="date", how="left")
    d["profile"] = d["profile"].fillna("Data_Gap")
    return d


def _num(v, digits=5):
    return None if pd.isna(v) else round(float(v), digits)


def _date(v):
    return None if pd.isna(v) else pd.Timestamp(v).strftime("%Y-%m-%d")


def _time(v):
    return None if pd.isna(v) else pd.Timestamp(v).strftime("%H:%M")


def row_to_record(row) -> dict:
    return {
        "profile": row["profile"],
        "is_data_gap": bool(row["is_data_gap"]),
        "open": _num(row["open"]),
        "high": _num(row["high"]),
        "low": _num(row["low"]),
        "close": _num(row["close"]),
        "range_pips": _num(row["daily_range_pips"], 1),
        "high_time": _time(row["high_time"]),
        "high_session": row["high_time_session"],
        "low_time": _time(row["low_time"]),
        "low_session": row["low_time_session"],
        "week": {
            "start": _date(row["week_start"]),
            "end": _date(row["week_end"]),
            "high": _num(row["week_high"]),
            "low": _num(row["week_low"]),
            "range_pips": _num(row["week_range_pips"], 1),
            "high_weekday": row["week_high_weekday"] if not pd.isna(row["week_high_weekday"]) else None,
            "low_weekday": row["week_low_weekday"] if not pd.isna(row["week_low_weekday"]) else None,
            # ISO week-of-year (1-52/53) this date's containing week belongs
            # to — already computed above as the iso_year/iso_week merge key,
            # just not previously carried through to the output record.
            "week_of_year": None if pd.isna(row["iso_week"]) else int(row["iso_week"]),
        },
        "month": {
            "start": _date(row["month_start"]),
            "end": _date(row["month_end"]),
            "high": _num(row["month_high"]),
            "low": _num(row["month_low"]),
            "range_pips": _num(row["month_range_pips"], 1),
        },
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("daily_csv")
    ap.add_argument("daily_profiles_csv")
    ap.add_argument("output_dir")
    ap.add_argument("--asset", required=True)
    ap.add_argument("--pip", type=float, default=0.0001)
    args = ap.parse_args()

    daily = pd.read_csv(
        args.daily_csv,
        parse_dates=["date", "open_time", "high_time", "low_time", "close_time"],
    )
    profiles = pd.read_csv(args.daily_profiles_csv, parse_dates=["date"])

    table = build_calendar_table(daily, profiles, args.pip)
    table["year"] = table["date"].dt.year

    asset_lower = args.asset.lower()
    out_dir = os.path.join(args.output_dir, asset_lower)
    os.makedirs(out_dir, exist_ok=True)

    # Written as an assignment into a namespaced `window.KPT_CALENDAR` object,
    # NOT `const NAME = ...` — the calendar UI loads these files dynamically
    # (only the year currently being browsed), and the variable name would
    # need to be built at runtime from the asset+year. A top-level `const` in
    # a classic <script> is a global *lexical* binding, not a `window`
    # property (see spec §5.3's note on this exact gotcha), so it can't be
    # looked up dynamically via `window[name]` the way this loader needs —
    # explicitly assigning onto `window.KPT_CALENDAR` sidesteps that.
    asset_key = args.asset.upper()
    years = sorted(table["year"].unique().tolist())
    for year in years:
        year_table = table[table["year"] == year]
        records = {
            row["date"].strftime("%Y-%m-%d"): row_to_record(row)
            for _, row in year_table.iterrows()
        }
        out_path = os.path.join(out_dir, f"{year}.js")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write("// Auto-generated by pipeline/export_calendar_data.py — do not edit by hand.\n")
            f.write("window.KPT_CALENDAR = window.KPT_CALENDAR || {};\n")
            f.write(f'window.KPT_CALENDAR["{asset_key}"] = window.KPT_CALENDAR["{asset_key}"] || {{}};\n')
            f.write(f'window.KPT_CALENDAR["{asset_key}"]["{year}"] = ')
            json.dump(records, f, separators=(",", ":"))
            f.write(";\n")

    manifest_path = os.path.join(out_dir, "manifest.js")
    with open(manifest_path, "w", encoding="utf-8") as f:
        f.write("// Auto-generated by pipeline/export_calendar_data.py — do not edit by hand.\n")
        f.write("window.KPT_CALENDAR_YEARS = window.KPT_CALENDAR_YEARS || {};\n")
        f.write(f'window.KPT_CALENDAR_YEARS["{asset_key}"] = {json.dumps(years)};\n')

    print(f"wrote {len(years)} year files + manifest to {out_dir}")


if __name__ == "__main__":
    main()
