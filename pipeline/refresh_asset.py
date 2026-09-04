"""
refresh_asset.py — One-command pipeline runner for a single asset.

Runs the full chain, in dependency order, that previously had to be invoked
as five separate manual commands:

    clean_mt5_csv.py -> profile_taxonomy.py -> stats_engine.py
        -> build_dashboard_data.py -> export_profile_examples.py
        -> export_calendar_data.py

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
                              [--skip-examples] [--skip-calendar]

    <ASSET>   e.g. GBPUSD — uppercase canonical form used throughout outputs
              and the KPT_PROFILING_* window globals downstream.
    --raw     defaults to data/raw/<ASSET>_M1_full.csv
    --pip     defaults to the PIP_REGISTRY below; required (fails loudly,
              does not silently guess) for any asset not yet listed there
    --skip-examples   skip the M15 example export (re-parses the full raw
                       M1 file — the slowest single stage; safe to skip when
                       only re-validating the stats/taxonomy chain)
    --skip-calendar   skip the per-year calendar export
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
    dashboard_js = os.path.join(dashboard_data_dir, f"{asset_lower}.js")
    examples_js  = os.path.join(dashboard_data_dir, "profile-examples", f"{asset_lower}.js")
    calendar_dir = os.path.join(dashboard_data_dir, "calendar")

    py = sys.executable

    print(f"=== Refreshing {asset} (pip={pip}, unit={unit}) ===", file=sys.stderr)
    print(f"raw: {raw_csv}", file=sys.stderr)

    run([py, "clean_mt5_csv.py", raw_csv, clean_csv, "--asset", asset, "--pip", str(pip)])
    run([py, "profile_taxonomy.py", clean_csv, profiles_csv, summary_json, "--asset", asset])
    run([py, "stats_engine.py", clean_csv, stats_json, "--asset", asset, "--pip", str(pip), "--unit", unit])
    run([py, "build_dashboard_data.py", stats_json, summary_json, dashboard_js, "--asset", asset])

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
