"""
refresh_asset.py — One-command pipeline runner for a single asset.

Runs the full chain, in dependency order, that previously had to be invoked
as several separate manual commands:

    clean_mt5_csv.py -> profile_taxonomy.py -> stats_engine.py
        -> profile_taxonomy_weekly.py -> profile_taxonomy_monthly.py
        -> profile_taxonomy_yearly.py -> session_activity.py
        -> forecast_range.py -> build_dashboard_data.py
        -> export_profile_examples.py -> export_calendar_data.py

profile_taxonomy_weekly.py / profile_taxonomy_monthly.py / profile_taxonomy_yearly.py
(Tier 5's Weekly/Monthly/Yearly Profiles, added 2026-09-05) are parallel
siblings to profile_taxonomy.py, not a dependency of anything after them in
the chain -- each produces its own <asset>_<period>_profiles.csv/_<period>_
profile_summary.json, folded into the dashboard bundle by
build_dashboard_data.py's --weekly-summary/--monthly-summary/--yearly-summary
flags. See market-profiling-system-spec.md §4 and HANDOVER.md §5 for the
methodology and the empirical validation behind each.

session_activity.py (Tier 5b, added 2026-09-05) needs the raw M1 file (like
export_profile_examples.py) but its output is folded into the same dashboard
bundle (--hourly-activity -> bundle.hourly_activity), so it has to run
*before* build_dashboard_data.py, unlike export_profile_examples.py which
writes its own separate file and can run after.

forecast_range.py (Range Outlook, added 2026-10-06) needs PyTorch + timesfm,
which live in a separate venv (.venv-forecast/) so the core pipeline's .venv
stays light. It is run with that venv's interpreter when it exists; when it
doesn't, the stage is skipped with a warning and the bundle simply has no
range_forecast (the dashboard hides the card) -- never a stale one. Validated
first in research/timesfm_benchmark/. Its forecast cache
(data/forecast/<asset>_timesfm_cache.csv) is a pure speed-up keyed by each
forecast's exact input window, so this stage keeps the "always reprocess
everything" contract below.

Built to be safe to re-run at any cadence (daily/weekly/monthly/ad hoc) --
every stage always reprocesses the *complete* history from the current raw
CSV, never a delta, so there is no incremental-state to get out of sync.
Re-running after concat_raw_csv.py has appended new data just regenerates
every output from scratch, deterministically. See docs/PLATFORM_ROADMAP.md
(seasonal-dashboard repo) for why "always reprocess everything" is the
right design at this data scale, not a shortcut.

Output paths are asset-keyed only (no date range baked into the filename,
unlike some of the original manual-era files) — freshness is tracked via
each output's own `as_of` field (and, downstream, the seasonal-dashboard
manifest's asOf), not the filename, so re-running never leaves stale dated
variants behind to track manually.

Usage:
    python3 refresh_asset.py <ASSET> [--raw PATH] [--pip PIP]
                              [--skip-examples] [--skip-calendar] [--skip-weekly]

    <ASSET>   e.g. GBPUSD — uppercase canonical form used throughout outputs
              and the KPT_PROFILING_* window globals downstream.
    --raw     defaults to data/raw/<ASSET>_M1_full.csv
    --pip     defaults to the PIP_REGISTRY below; required (fails loudly,
              does not silently guess) for any asset not yet listed there
    --skip-examples   skip the M15 example export (re-parses the full raw
                       M1 file — the slowest single stage; safe to skip when
                       only re-validating the stats/taxonomy chain)
    --skip-calendar   skip the per-year calendar export
    --skip-weekly     skip the weekly profile taxonomy (Tier 5)
    --skip-monthly    skip the monthly profile taxonomy (Tier 5)
    --skip-yearly     skip the yearly profile taxonomy (Tier 5)
    --skip-hourly-activity   skip the hourly session-activity export (Tier 5b —
                       re-parses the full raw M1 file, like --skip-examples)
    --skip-forecast   skip the TimesFM Range Outlook stage (the bundle then
                       has no range_forecast)
"""
import sys
import os
import subprocess
import argparse

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

# Per-asset config — single source of truth for the whole chain, passed
# explicitly to every script that needs it (clean_mt5_csv.py, stats_engine.py,
# export_calendar_data.py) rather than relying on each script's own,
# separately-maintained default. Add a new asset here when you add its data.
#
# `unit` is the display label for range values downstream (dashboard stat
# tiles/charts) — "pips" only for actual currency pairs (the term has a real,
# specific meaning there); every other asset class (metals, energies,
# indices, and future crypto/synthetics) uses "points" instead, since
# "pips" reads wrong on e.g. a Dow Jones or gold page. Not auto-detected
# from the symbol (a BTCUSD/XAUUSD ticker superficially looks FX-shaped) —
# always set explicitly per asset here.
ASSET_REGISTRY = {
    "GBPUSD": {"pip": 0.0001, "unit": "pips"},
    "EURUSD": {"pip": 0.0001, "unit": "pips"},
    "AUDUSD": {"pip": 0.0001, "unit": "pips"},
    "NZDUSD": {"pip": 0.0001, "unit": "pips"},
    "USDCAD": {"pip": 0.0001, "unit": "pips"},
    "USDCHF": {"pip": 0.0001, "unit": "pips"},
    "USDJPY": {"pip": 0.01, "unit": "pips"},   # JPY pair
    "XAUUSD": {"pip": 0.01, "unit": "points"}, # gold, quoted to 2 decimals
    "BTCUSD": {"pip": 0.01, "unit": "points"}, # quoted to 2 decimals
    "BRENT":  {"pip": 0.01, "unit": "points"}, # Brent crude, quoted to 2 decimals
    "WTI":    {"pip": 0.01, "unit": "points"}, # WTI crude, quoted to 2 decimals
    "US500":  {"pip": 0.1, "unit": "points"},  # S&P 500 index CFD, quoted to 1 decimal
    "USTECH": {"pip": 0.1, "unit": "points"},  # Nasdaq 100 index CFD, quoted to 1 decimal
    "US30":   {"pip": 1.0, "unit": "points"},  # Dow Jones index CFD, quoted as whole points
}


def find_forecast_python():
    """Interpreter of the separate forecast venv (Windows or POSIX layout), or None."""
    for rel in (("Scripts", "python.exe"), ("bin", "python")):
        p = os.path.join(ROOT, ".venv-forecast", *rel)
        if os.path.exists(p):
            return p
    return None


def run(cmd):
    print(f"\n$ {' '.join(cmd)}", file=sys.stderr)
    subprocess.run(cmd, check=True, cwd=HERE)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("asset")
    ap.add_argument("--raw", default=None, help="raw M1 CSV path (default: data/raw/<ASSET>_M1_full.csv)")
    ap.add_argument("--pip", type=float, default=None, help="pip size override (default: ASSET_REGISTRY lookup)")
    ap.add_argument("--unit", default=None, help="range-value display label override (default: ASSET_REGISTRY lookup, or 'pips' if the asset isn't registered)")
    ap.add_argument("--skip-examples", action="store_true")
    ap.add_argument("--skip-calendar", action="store_true")
    ap.add_argument("--skip-weekly", action="store_true")
    ap.add_argument("--skip-monthly", action="store_true")
    ap.add_argument("--skip-yearly", action="store_true")
    ap.add_argument("--skip-hourly-activity", action="store_true")
    ap.add_argument("--skip-forecast", action="store_true")
    args = ap.parse_args()

    asset = args.asset.upper()
    asset_lower = asset.lower()

    entry = ASSET_REGISTRY.get(asset, {})
    pip = args.pip if args.pip is not None else entry.get("pip")
    unit = args.unit if args.unit is not None else entry.get("unit", "pips")
    if pip is None:
        print(f"ERROR: no pip size known for {asset}. Pass --pip explicitly, "
              f"or add it to ASSET_REGISTRY in this script.", file=sys.stderr)
        sys.exit(1)

    raw_csv = args.raw or os.path.join(ROOT, "data", "raw", f"{asset}_M1_full.csv")
    if not os.path.exists(raw_csv):
        print(f"ERROR: raw file not found: {raw_csv}\n"
              f"(Expected data/raw/{asset}_M1_full.csv — pass --raw to point at a "
              f"different file, e.g. a first-time full download not yet renamed.)", file=sys.stderr)
        sys.exit(1)

    clean_dir = os.path.join(ROOT, "data", "clean")
    output_dir = os.path.join(ROOT, "output")
    dashboard_data_dir = os.path.join(ROOT, "dashboard", "data")
    os.makedirs(clean_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(os.path.join(dashboard_data_dir, "profile-examples"), exist_ok=True)
    os.makedirs(os.path.join(dashboard_data_dir, "calendar"), exist_ok=True)

    clean_csv    = os.path.join(clean_dir, f"{asset_lower}_daily_clean.csv")
    profiles_csv = os.path.join(clean_dir, f"{asset_lower}_daily_profiles.csv")
    summary_json = os.path.join(output_dir, f"{asset_lower}_profile_summary.json")
    stats_json   = os.path.join(output_dir, f"{asset_lower}_stats.json")
    weekly_profiles_csv  = os.path.join(clean_dir, f"{asset_lower}_weekly_profiles.csv")
    weekly_summary_json  = os.path.join(output_dir, f"{asset_lower}_weekly_profile_summary.json")
    monthly_profiles_csv = os.path.join(clean_dir, f"{asset_lower}_monthly_profiles.csv")
    monthly_summary_json = os.path.join(output_dir, f"{asset_lower}_monthly_profile_summary.json")
    yearly_profiles_csv  = os.path.join(clean_dir, f"{asset_lower}_yearly_profiles.csv")
    yearly_summary_json  = os.path.join(output_dir, f"{asset_lower}_yearly_profile_summary.json")
    hourly_activity_json = os.path.join(output_dir, f"{asset_lower}_hourly_activity.json")
    range_forecast_json  = os.path.join(output_dir, f"{asset_lower}_range_forecast.json")
    dashboard_js = os.path.join(dashboard_data_dir, f"{asset_lower}.js")
    examples_js  = os.path.join(dashboard_data_dir, "profile-examples", f"{asset_lower}.js")
    calendar_dir = os.path.join(dashboard_data_dir, "calendar")

    py = sys.executable

    print(f"=== Refreshing {asset} (pip={pip}, unit={unit}) ===", file=sys.stderr)
    print(f"raw: {raw_csv}", file=sys.stderr)

    run([py, "clean_mt5_csv.py", raw_csv, clean_csv, "--asset", asset, "--pip", str(pip)])
    run([py, "profile_taxonomy.py", clean_csv, profiles_csv, summary_json, "--asset", asset])
    run([py, "stats_engine.py", clean_csv, stats_json, "--asset", asset, "--pip", str(pip), "--unit", unit])

    build_dashboard_cmd = [py, "build_dashboard_data.py", stats_json, summary_json, dashboard_js, "--asset", asset]
    if not args.skip_weekly:
        run([py, "profile_taxonomy_weekly.py", clean_csv, weekly_profiles_csv, weekly_summary_json, "--asset", asset, "--pip", str(pip)])
        build_dashboard_cmd += ["--weekly-summary", weekly_summary_json]
    else:
        print("\n(skipped --skip-weekly)", file=sys.stderr)
    if not args.skip_monthly:
        run([py, "profile_taxonomy_monthly.py", clean_csv, monthly_profiles_csv, monthly_summary_json, "--asset", asset, "--pip", str(pip)])
        build_dashboard_cmd += ["--monthly-summary", monthly_summary_json]
    else:
        print("\n(skipped --skip-monthly)", file=sys.stderr)
    if not args.skip_yearly:
        run([py, "profile_taxonomy_yearly.py", clean_csv, yearly_profiles_csv, yearly_summary_json, "--asset", asset, "--pip", str(pip)])
        build_dashboard_cmd += ["--yearly-summary", yearly_summary_json]
    else:
        print("\n(skipped --skip-yearly)", file=sys.stderr)
    if not args.skip_hourly_activity:
        run([py, "session_activity.py", raw_csv, hourly_activity_json, "--asset", asset, "--pip", str(pip)])
        build_dashboard_cmd += ["--hourly-activity", hourly_activity_json]
    else:
        print("\n(skipped --skip-hourly-activity)", file=sys.stderr)
    forecast_py = find_forecast_python()
    if args.skip_forecast:
        print("\n(skipped --skip-forecast)", file=sys.stderr)
    elif forecast_py is None:
        print("\nWARNING: .venv-forecast/ not found -- skipping the Range Outlook stage "
              "(forecast_range.py needs PyTorch + timesfm). See README 'Range Outlook' to set it up.",
              file=sys.stderr)
    else:
        run([forecast_py, "forecast_range.py", clean_csv, range_forecast_json, "--asset", asset])
        build_dashboard_cmd += ["--range-forecast", range_forecast_json]
    run(build_dashboard_cmd)

    if not args.skip_examples:
        run([py, "export_profile_examples.py", raw_csv, profiles_csv, summary_json, examples_js, "--asset", asset])
    else:
        print("\n(skipped --skip-examples)", file=sys.stderr)

    if not args.skip_calendar:
        run([py, "export_calendar_data.py", clean_csv, profiles_csv, calendar_dir, "--asset", asset, "--pip", str(pip)])
    else:
        print("(skipped --skip-calendar)", file=sys.stderr)

    print(f"\n=== {asset} refresh complete ===", file=sys.stderr)
    print("Next: from seasonal-dashboard/, add this asset to scripts/sync_profiling_data.js's "
          "ASSETS list if new, then run `node scripts/sync_profiling_data.js`.", file=sys.stderr)


if __name__ == "__main__":
    main()
