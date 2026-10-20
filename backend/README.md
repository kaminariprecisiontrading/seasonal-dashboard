# Kaminari Market Profiling & Statistics — Data Pipeline (`backend/`)

> **Monorepo (v1.27):** this was the standalone `KPT-Market-Profiling` repo; it now lives in the
> seasonal-dashboard repo as `backend/`, with its full history. The published site is `../frontend/`
> and the Node sync scripts are in `../scripts/`. Run the Python commands below from `backend/`.

A statistical market-profiling system for 14 instruments: GBPUSD, EURUSD, AUDUSD, NZDUSD, USDCAD,
USDCHF, USDJPY, XAUUSD, BRENT, WTI, US500, USTECH, US30 and BTCUSD (TradersWay MT5 export, full
available history per asset — back to 1993 for most majors).
It answers three questions from historical OHLC data:

1. **When** does the daily/weekly/monthly/yearly high and low statistically tend to form?
2. **How big** is a typical range, and how does it compare across lookback windows?
3. **What "shape"** — a rule-based, self-defined taxonomy (Trend Day, Compression Day, etc.) — is a
   given day most likely following?

Every statistic is shown as a probability-weighted tendency alongside its sample size and
confidence/concentration measure — never as a guaranteed outcome. The dashboard is a static site
(no backend, no build step) meant to sit alongside a trader's chart platform each morning.

It feeds the [Kaminari Seasonals site](https://kpt-seasonals.netlify.app/) (`../frontend/`): the
Profiling tab, BTCUSD's derived seasonals, the Range Outlook and the Track Record. The site gives the
top-level macro/monthly-bias view; this pipeline is the zoomed-in daily/weekly view.

---

## Documentation

| Doc | Purpose |
|---|---|
| **`HANDOVER.md`** | Entry point for continuing this project in Claude Code — current state, key decisions, and what's next. Read this first if you're picking the project back up. |
| **`market-profiling-system-spec.md`** | Canonical spec — goals, architecture, methodology, the full profile taxonomy definitions, and the phased roadmap. Source of truth for design decisions. |

---

## Project structure

```
backend/
├── data/
│   ├── raw/                  Raw MT5 M1 CSV exports (gitignored — too large for GitHub)
│   │                         <ASSET>_M1_full.csv — one continuous full-history file per asset
│   ├── clean/                Cleaned daily OHLC CSVs + per-day profile labels, all assets
│   └── forecast/             TimesFM forecast caches (Range Outlook)
├── pipeline/                 Python data pipeline (see below)
├── output/                   Stats engine + profile taxonomy JSON output
├── dashboard/                Static dashboard (plain HTML/CSS/JS, no build step)
│   ├── index.html            Asset picker + calendar landing page
│   ├── assets/                GBPUSD/EURUSD dashboard pages
│   ├── profiles/               Profile detail pages (?p=<slug> template)
│   ├── calendar/                Per-asset (?a=<ASSET>) + cross-asset calendar pages
│   ├── data/                    Generated data-as-JS-file bundles (do not hand-edit)
│   ├── css/                       Shared styles
│   └── js/                          Chart rendering, tooltips, glossary, page controllers
├── research/timesfm_benchmark/  TimesFM vs ADR20 benchmark
├── requirements.txt, requirements-forecast.txt  Pinned packages for the two venvs
└── .venv/, .venv-forecast/   Local Python virtualenvs (gitignored)
```

## Pipeline

### Refreshing an asset (normal case)

One command runs the full 6-stage chain (clean → stats → taxonomy → dashboard bundle → profile
examples → calendar) against `data/raw/<ASSET>_M1_full.csv`:

```bash
python pipeline/refresh_asset.py <ASSET>          # e.g. GBPUSD
```

Every stage always reprocesses the *complete* history from scratch — never a delta — so this is
safe to re-run at any cadence (daily/weekly/monthly/ad hoc) and always deterministic. Pip size is
looked up from a per-asset registry inside the script (override with `--pip` for a new asset not
yet listed there). `dashboard/data/**/*.js`, `data/clean/*.csv` and `output/*.json` are all
generated — never hand-edited.

### Updating `data/raw/<ASSET>_M1_full.csv` with a new export

MT5's Export Bars has a rolling ~20-year lookback cap, so a fresh export from today won't reach
back to the existing file's start — merge the new export in instead of replacing the file:

```bash
python pipeline/concat_raw_csv.py data/raw/<ASSET>_M1_full.csv <new_export.csv> data/raw/<ASSET>_M1_full.csv.new
mv data/raw/<ASSET>_M1_full.csv.new data/raw/<ASSET>_M1_full.csv
```

Auto-detects, from the timestamp ranges, whether the new export is a routine **append** (new data
after the existing file — the common case), a **prepend** (earlier history discovered later, e.g.
a source that reaches back further than the current file's start), or **both**. Overlapping rows
are always dropped in favor of the existing file; only an append's own trailing date is dropped
automatically (a fresh "up to today" export risks ending mid-day) — a prepend's boundary day is
reported, not auto-dropped, since there's no live edge on that side. Then re-run
`refresh_asset.py` to regenerate everything from the merged file.

### Individual stages (for debugging one stage in isolation)

```bash
python pipeline/clean_mt5_csv.py data/raw/<ASSET>_M1_full.csv data/clean/<asset>_daily_clean.csv --asset <ASSET> --pip 0.0001
python pipeline/stats_engine.py data/clean/<asset>_daily_clean.csv output/<asset>_stats.json --asset <ASSET> --pip 0.0001
python pipeline/profile_taxonomy.py data/clean/<asset>_daily_clean.csv data/clean/<asset>_daily_profiles.csv output/<asset>_profile_summary.json --asset <ASSET>
python pipeline/build_dashboard_data.py output/<asset>_stats.json output/<asset>_profile_summary.json dashboard/data/<asset>.js --asset <ASSET>
python pipeline/export_profile_examples.py data/raw/<ASSET>_M1_full.csv data/clean/<asset>_daily_profiles.csv output/<asset>_profile_summary.json dashboard/data/profile-examples/<asset>.js --asset <ASSET>
python pipeline/export_calendar_data.py data/clean/<asset>_daily_clean.csv data/clean/<asset>_daily_profiles.csv dashboard/data/calendar --asset <ASSET> --pip 0.0001
```

Replace `<ASSET>`/`<asset>` with the uppercase/lowercase asset symbol, e.g. `GBPUSD`/`gbpusd`.

### Environment

```bash
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows; use .venv/bin/python on macOS/Linux
```

### Track Record grading (all assets at once)

After refreshing assets, grade the site's weekly signals and sync them over:

```bash
python pipeline/grade_signals.py            # → output/track_record.json (since 2016-01-04 by default)
cd .. && node scripts/sync_track_record.js
```

Weeks with a snapshot in `../frontend/data/signal_history/` are graded as *live-recorded*
(the signals shown at the time); all others as *backfilled* (today's data, in-sample).

### Range Outlook (TimesFM) environment

The Range Outlook stage (`pipeline/forecast_range.py`, TimesFM 2.5 daily-range forecasts) needs
PyTorch, so it has its own venv rather than bloating `.venv/`:

```bash
python -m venv .venv-forecast
.venv-forecast/Scripts/python.exe -m pip install -r requirements-forecast.txt   # timesfm[torch], pandas, scipy
```

`refresh_asset.py` finds `.venv-forecast/` automatically and runs the stage with it; without it,
the stage is skipped with a warning and the bundle has no `range_forecast` (the site's
card then stays hidden). The first run per asset computes ~1,000 forecasts (~5 min on CPU) and
caches them in `data/forecast/<asset>_timesfm_cache.csv`; later refreshes only compute the new
days. Validation behind it: `research/timesfm_benchmark/README.md`.

## Viewing the pipeline's own dashboard

The published site is `../frontend/` (`node scripts/serve_local.js` from the repo root). This
folder's `dashboard/` is the pipeline's original prototype viewer and the source the sync scripts
read from. Plain static files — open `dashboard/index.html` directly in a browser, or serve the folder:

```bash
cd dashboard && python -m http.server 8000
```

Then visit `http://localhost:8000/`.

---

## Status

Phases 1–2 (data pipeline + daily profile taxonomy) and an initial Phase 3 dashboard are complete
for all 14 assets, including profile
detail pages with real illustrative charts and a calendar feature. Data source is TradersWay MT5
export exclusively (a prior session accidentally mixed in an IC Markets export for some recent
data — since corrected with a full clean re-download per asset). See `HANDOVER.md` §7 for exactly
what's built and what's next.

© 2026 Kaminari Precision Trading. All rights reserved.
