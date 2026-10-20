"""
gen_seasonal_signal.py — Derives a Moore-Research-shaped seasonal signal from
raw price history, for assets MRCI doesn't cover (crypto, and eventually
synthetics — see seasonal-dashboard's PLATFORM_ROADMAP.md Tier 6).

Replicates seasonal-dashboard/js/backtest.js's week-of-month bucketing and
"Raw Price Tendency" convention exactly, so the derived signal means the same
thing as the site's own validation tooling (its only existing "derive stats
from raw price" precedent):

  - wkSlot = 0 if day<=7, 1 if day<=14, 2 if day<=21, else 3  (NOT ISO weeks)
  - weekly close = the last daily close within (year, month, wkSlot)
  - pctReturn = (thisClose - prevClose) / prevClose * 100, prevClose being the
    immediately preceding week-slot bucket (rolls back across month/year
    boundaries)
  - upPct = fraction of years where pctReturn > 0 (strict), across all
    available years for that (month, wkSlot)
  - bull if upPct >= 0.60, bear if upPct <= 0.39, else chop — matching
    backtest.js's renderRawHeatmap() thresholds (the model-agnostic ones; the
    stricter 65%/50% pair validates an existing prediction and doesn't apply
    when *generating* a fresh one)

Two lookback windows are computed per (month, wkSlot): "5yr" (the most recent
5 distinct calendar years in the data) and "full" (every year available).
There is no real 15-year window for an asset with ~9 years of history, so the
"full" window's result is reused for both the 15-YR and long-term columns —
see seasonal-dashboard's assets/btc.html .derived-note for the disclosure
this requires; do not silently present it as a genuine 15-year sample.

Star conviction is capped GLOBALLY at GLOBAL_MAX_STARS, not per-bucket: this
dataset has ~9 years of daily data, so almost every (month, wkSlot) bucket
ends up with essentially the same small n (one observation per year) — there
is no meaningful per-bucket variance to penalize individually the way there
would be for a 40-year MRC asset with uneven data quality across cells. A
single asset with this little history can never earn the conviction a
34-40yr Moore Research dataset represents, so 5 stars is never awarded here.
A separate floor-cap additionally protects the handful of buckets right at
the start of the dataset (2017) that have unusually low n even by this
asset's own standard, because prev_key() has no antecedent for them.

Usage:
    python3 gen_seasonal_signal.py <ASSET> [--clean PATH]

    <ASSET>  e.g. BTCUSD — reads data/clean/<asset_lower>_daily_clean.csv by
             default.
    Writes:  output/<asset_lower>_seasonal.json
"""

import sys
import json
import argparse
from collections import defaultdict

import pandas as pd

GLOBAL_MAX_STARS = 4
ABS_MIN_N_FOR_STARS = 5  # buckets backed by fewer years than this get floor-capped to 2 stars
RECENT_WINDOW_YEARS = 5

MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"]


def week_slot(day: int) -> int:
    if day <= 7:
        return 0
    if day <= 14:
        return 1
    if day <= 21:
        return 2
    return 3


def prev_key(year: int, month: int, wk: int):
    if wk > 0:
        return (year, month, wk - 1)
    if month > 1:
        return (year, month - 1, 3)
    return (year - 1, 12, 3)


def load_daily_closes(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path, parse_dates=["date"])
    # is_data_gap excludes real feed-outage days and the live/trailing partial
    # day (see clean_mt5_csv.py) — is_daily_only rows have a real close and
    # are kept, same as clean_mt5_csv.py treats them everywhere else.
    df = df[~df["is_data_gap"]].copy()
    df["year"] = df["date"].dt.year
    df["month"] = df["date"].dt.month
    df["day"] = df["date"].dt.day
    df["wk"] = df["day"].apply(week_slot)
    return df.sort_values("date")


def build_weekly_closes(daily: pd.DataFrame) -> dict:
    """(year, month, wk) -> last close in that bucket. Data is sorted by date
    ascending, so the last row per group is the bucket's closing price."""
    closes = {}
    for (y, m, w), g in daily.groupby(["year", "month", "wk"], sort=False):
        closes[(y, m, w)] = float(g["close"].iloc[-1])
    return closes


def build_week_returns(weekly_closes: dict) -> dict:
    """(month, wk) -> list of (year, pctReturn) tuples, across every year
    that has both this bucket and its immediately preceding bucket."""
    out = defaultdict(list)
    for (y, m, w), close in weekly_closes.items():
        pk = prev_key(y, m, w)
        prev_close = weekly_closes.get(pk)
        if prev_close is None:
            continue
        pct = (close - prev_close) / prev_close * 100.0
        out[(m, w)].append((y, pct))
    return out


def up_pct(returns: list) -> float:
    if not returns:
        return None
    up = sum(1 for _, r in returns if r > 0)
    return up / len(returns)


def classify(pct) -> str:
    if pct is None:
        return "chop"
    if pct >= 0.60:
        return "bull"
    if pct <= 0.39:
        return "bear"
    return "chop"


def stars_for(pct, n: int) -> int:
    if pct is None or n == 0:
        return 1
    dist = abs(pct * 100 - 50)
    if dist >= 35:
        base = GLOBAL_MAX_STARS
    elif dist >= 25:
        base = 3
    elif dist >= 15:
        base = 2
    else:
        base = 1
    base = min(base, GLOBAL_MAX_STARS)
    if n < ABS_MIN_N_FOR_STARS:
        base = min(base, 2)
    return base


def star_glyphs(n: int) -> str:
    n = max(0, min(5, n))
    return "★" * n + "☆" * (5 - n)


def dir_label(d: str) -> str:
    return {"bull": "LONG", "bear": "SHORT", "chop": "CHOP"}[d]


def window_stats(returns_by_year: list, years_filter: set = None) -> dict:
    filtered = [(y, r) for y, r in returns_by_year if years_filter is None or y in years_filter]
    pct = up_pct(filtered)
    n = len(filtered)
    direction = classify(pct)
    stars = stars_for(pct, n)
    return {"direction": direction, "up_pct": pct, "n": n, "stars": stars}


def combined_of(a: dict, b: dict) -> tuple:
    """Two-window agreement rule: same direction on both windows -> that
    direction, with the fuller (full-history) window's conviction; otherwise
    'chop' at low conviction, since disagreement between the short and long
    window is itself the weaker signal."""
    if a["direction"] == b["direction"] and a["direction"] != "chop":
        return a["direction"], b["stars"]
    return "chop", 1


def majority(directions: list) -> str:
    counts = {"bull": 0, "bear": 0, "chop": 0}
    for d in directions:
        counts[d] += 1
    best = max(counts, key=lambda k: counts[k])
    return best if counts[best] >= 3 else "chop"


def build_months(week_returns: dict, all_years: set, recent_years: set) -> list:
    months_out = []
    for m in range(1, 13):
        week_objs = []
        week_combined_dirs = []
        week_combined_stars = []
        week_recent_dirs = []
        week_full_dirs = []
        for w in range(4):
            returns = week_returns.get((m, w), [])
            recent = window_stats(returns, recent_years)
            full = window_stats(returns, all_years)
            combined_dir, combined_stars = combined_of(recent, full)

            week_objs.append({
                "wk": f"Wk {w + 1}",
                "s5": recent["direction"],
                "s15": full["direction"],
                "com": f"{dir_label(combined_dir)} {star_glyphs(combined_stars)}",
                "note": (f"{round((recent['up_pct'] or 0) * 100)}% of last {recent['n']} years positive "
                         f"(5-YR); {round((full['up_pct'] or 0) * 100)}% of {full['n']} years positive (full history)."),
            })
            week_combined_dirs.append(combined_dir)
            week_combined_stars.append(combined_stars)
            week_recent_dirs.append(recent["direction"])
            week_full_dirs.append(full["direction"])

        month_s5 = majority(week_recent_dirs)
        month_s15 = majority(week_full_dirs)
        month_combined = month_s15 if month_s15 == month_s5 else "chop"
        month_stars = min(GLOBAL_MAX_STARS, round(sum(week_combined_stars) / 4)) if week_combined_stars else 1
        combined_label = {"bull": "LONG", "bear": "SHORT", "chop": "MIXED"}[month_combined]

        months_out.append({
            "month": MONTH_NAMES[m - 1],
            "sig5": month_s5,
            "sig15": month_s15,
            "combined": month_combined,
            "combinedLabel": combined_label,
            "stars": month_stars,
            "note": f"Statistically derived from real price history — {combined_label.lower()} lean, "
                    f"{sum(1 for d in week_combined_dirs if d == month_combined)}/4 weeks agree.",
            "weeks": week_objs,
        })
    return months_out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("asset")
    ap.add_argument("--clean", default=None, help="cleaned daily CSV path (default: data/clean/<asset_lower>_daily_clean.csv)")
    args = ap.parse_args()

    asset = args.asset.upper()
    asset_lower = asset.lower()
    clean_csv = args.clean or f"data/clean/{asset_lower}_daily_clean.csv"

    daily = load_daily_closes(clean_csv)
    weekly_closes = build_weekly_closes(daily)
    week_returns = build_week_returns(weekly_closes)

    all_years = sorted(daily["year"].unique().tolist())
    recent_years = set(all_years[-RECENT_WINDOW_YEARS:])
    all_years_set = set(all_years)

    months = build_months(week_returns, all_years_set, recent_years)

    first_date, last_date = daily["date"].min(), daily["date"].max()
    elapsed_years = round((last_date - first_date).days / 365.25, 1)

    result = {
        "asset": asset,
        "as_of": str(last_date.date()),
        "first_date": str(first_date.date()),
        # distinct calendar years touched (includes partial years at both
        # ends) -- for internal bucketing/disclosure text, NOT for the
        # user-facing "N-YR" label. Use elapsed_years for that instead.
        "n_years": len(all_years),
        "elapsed_years": elapsed_years,
        "year_range": f"{all_years[0]}-{all_years[-1]}",
        "recent_window_years": sorted(recent_years),
        "months": months,
    }

    out_path = f"output/{asset_lower}_seasonal.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    print(f"=== {asset} statistically-derived seasonal signal ===", file=sys.stderr)
    print(f"years: {result['year_range']} ({result['n_years']} calendar years touched, "
          f"recent window: {result['recent_window_years']})", file=sys.stderr)
    for mo in months:
        print(f"  {mo['month']:10s} {mo['combinedLabel']:6s} {'*' * mo['stars']:4s} {mo['note']}", file=sys.stderr)
    print(f"wrote {out_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
