# Kaminari Market Profiling & Statistics Dashboard

A statistical market-profiling system for GBPUSD and EURUSD. It answers three questions from
historical OHLC data:

1. **When** does the daily/weekly/monthly/yearly high and low statistically tend to form?
2. **How big** is a typical range, and how does it compare across lookback windows?
3. **What "shape"** — a rule-based, self-defined taxonomy (Trend Day, Compression Day, etc.) — is a
   given day most likely following?

Every statistic is shown as a probability-weighted tendency alongside its sample size and
confidence/concentration measure — never as a guaranteed outcome. The dashboard is a static site
(no backend, no build step) meant to sit alongside a trader's chart platform each morning.

Companion project: the [Kaminari Seasonals Dashboard](https://kpt-seasonals.netlify.app/), which
gives the top-level macro/monthly-bias view — this project is the zoomed-in daily/weekly view.

---

## Documentation

| Doc | Purpose |
|---|---|
| **`HANDOVER.md`** | Entry point for continuing this project in Claude Code — current state, key decisions, and what's next. Read this first if you're picking the project back up. |
| **`market-profiling-system-spec.md`** | Canonical spec — goals, architecture, methodology, the full profile taxonomy definitions, and the phased roadmap. Source of truth for design decisions. |

---

## Project structure

```
KPT-Market-Profiling/
├── data/
│   ├── raw/                  Raw MT5 M1 CSV exports (gitignored — too large for GitHub)
│   └── clean/                Cleaned daily OHLC CSVs + per-day profile labels, both assets
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
└── .venv/                    Local Python virtualenv (gitignored)
```

## Pipeline (run in order)

```bash
# 1. Clean a raw MT5 M1 export into a UTC-normalized daily OHLC CSV
python pipeline/clean_mt5_csv.py data/raw/<ASSET>_M1_*.csv data/clean/<asset>_daily_clean_2000_2019.csv --asset <ASSET>

# 2. Compute range distributions, time-of-extreme stats, weekly/monthly/yearly aggregates
python pipeline/stats_engine.py data/clean/<asset>_daily_clean_2000_2019.csv output/<asset>_stats.json --asset <ASSET> --pip 0.0001

# 3. Classify each day into a named profile (Trend Day, Compression Day, etc.)
python pipeline/profile_taxonomy.py data/clean/<asset>_daily_clean_2000_2019.csv data/clean/<asset>_daily_profiles_2000_2019.csv output/<asset>_profile_summary.json --asset <ASSET>

# 4. Bundle the stats + profile summary into a dashboard-ready JS data file
python pipeline/build_dashboard_data.py output/<asset>_stats.json output/<asset>_profile_summary.json dashboard/data/<asset>.js --asset <ASSET>

# 5. Pick one real "typical" exemplar day per profile and export its intraday chart data
python pipeline/export_profile_examples.py data/raw/<ASSET>_M1_*.csv data/clean/<asset>_daily_profiles_2000_2019.csv output/<asset>_profile_summary.json dashboard/data/profile-examples/<asset>.js --asset <ASSET>

# 6. Export the calendar feature's per-day data (chunked by year)
python pipeline/export_calendar_data.py data/clean/<asset>_daily_clean_2000_2019.csv data/clean/<asset>_daily_profiles_2000_2019.csv dashboard/data/calendar --asset <ASSET> --pip 0.0001
```

Replace `<ASSET>`/`<asset>` with `GBPUSD`/`gbpusd` or `EURUSD`/`eurusd`. Re-run steps 2–6 any time
step 1's output changes; `dashboard/data/**/*.js` files are generated, never hand-edited.

### Environment

```bash
python -m venv .venv
.venv/Scripts/pip install pandas numpy scipy   # Windows; use .venv/bin/pip on macOS/Linux
```

## Viewing the dashboard

Plain static files — open `dashboard/index.html` directly in a browser, or serve the folder:

```bash
cd dashboard && python -m http.server 8000
```

Then visit `http://localhost:8000/`.

---

## Status

Phases 1–2 (data pipeline + daily profile taxonomy) and an initial Phase 3 dashboard are complete
for both assets, including profile detail pages with real illustrative charts and a calendar
feature. See `HANDOVER.md` §7 for exactly what's built and what's next.

© 2026 Kaminari Precision Trading. All rights reserved.
