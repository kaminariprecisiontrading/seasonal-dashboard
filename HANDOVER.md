# Handover — Kaminari Market Profiling & Statistics Dashboard
### For continuing this project in Claude Code

This document is the entry point for a new Claude Code session. Read this first, then
`market-profiling-system-spec.md` for the full project spec.

---

## 1. What this project is

A statistical market-profiling system for GBPUSD (and later EURUSD), built to answer:
when does the daily/weekly/monthly high and low statistically tend to form, how big are
typical ranges, and what recurring "shape"/profile is a given day or week likely following.
End goal: a dashboard (static site, same pattern as the existing
[Kaminari Seasonals Dashboard](https://kpt-seasonals.netlify.app/)) that a discretionary
trader can check each morning alongside their chart platform.

Full scope, architecture decisions, and phased roadmap: **`market-profiling-system-spec.md`**
(the canonical spec — keep it updated as decisions change).

---

## 2. Suggested local folder structure

```
KPT-Market-Profiling/
├── HANDOVER.md                          (this file)
├── market-profiling-system-spec.md      (canonical spec — read this next)
├── data/
│   ├── raw/                             (raw MT5 exports go here, e.g. the GBPUSD M1 CSV)
│   └── clean/
│       ├── gbpusd_daily_clean_2000_2019.csv
│       ├── eurusd_daily_clean_2000_2019.csv
│       ├── gbpusd_daily_profiles_2000_2019.csv
│       └── eurusd_daily_profiles_2000_2019.csv
├── pipeline/
│   ├── clean_mt5_csv.py
│   ├── stats_engine.py
│   ├── profile_taxonomy.py
│   ├── build_dashboard_data.py
│   ├── export_profile_examples.py
│   └── export_calendar_data.py
├── output/
│   ├── gbpusd_stats.json / eurusd_stats.json
│   └── gbpusd_profile_summary.json / eurusd_profile_summary.json
└── dashboard/                           (Phase 3 — built, see §3/§5/§7)
    ├── index.html
    ├── assets/gbpusd.html, eurusd.html
    ├── profiles/detail.html             (?p=<slug> template, all 8 profiles)
    ├── calendar/asset.html, index.html  (?a=<ASSET> template + cross-asset home view)
    ├── data/                            (generated — do not hand-edit)
    │   ├── gbpusd.js, eurusd.js
    │   ├── profile-examples/gbpusd.js, eurusd.js
    │   └── calendar/gbpusd/, calendar/eurusd/   (one <year>.js per year + manifest.js)
    ├── css/dashboard.css
    └── js/                              (charts, tooltip, glossary, profile-meta,
                                           calendar, and one controller per page type)
```

Move the files listed in §3 below into this structure (or your own equivalent) as the
first step in Claude Code.

---

## 3. Files produced so far

| File | Purpose |
|---|---|
| `market-profiling-system-spec.md` | Canonical project spec: goals, architecture, methodology, phased roadmap. **Source of truth for all design decisions.** |
| `clean_mt5_csv.py` | Phase 1 pipeline: raw MT5 M1 CSV → UTC-normalized, cleaned daily OHLC CSV. Reusable for future CSV uploads/assets. |
| `gbpusd_daily_clean_2000_2019.csv` | Cleaned daily output for GBPUSD, 2000-01-03 → 2019-12-31 (5,190 rows). |
| `eurusd_daily_clean_2000_2019.csv` | Cleaned daily output for EURUSD, same date range (5,191 rows) — same pipeline, no code changes needed. |
| `stats_engine.py` | Phase 1 stats engine: reads the cleaned daily CSV, produces range distributions, circular time-of-extreme stats, and weekly/monthly aggregates. |
| `gbpusd_stats.json` / `eurusd_stats.json` | Stats engine output per asset — everything the dashboard (Phase 3) will consume. |
| `profile_taxonomy.py` | Phase 2 pipeline: reads the cleaned daily CSV, assigns each day one of 8 named profiles (see spec §4) from two independent, self-calibrating axes (range regime, closing shape) plus a secondary extreme-timing tag. |
| `gbpusd_daily_profiles_2000_2019.csv` / `eurusd_daily_profiles_2000_2019.csv` | Per-day profile labels + underlying features, both assets — the labeled historical dataset for backtesting/dashboard use. |
| `gbpusd_profile_summary.json` / `eurusd_profile_summary.json` | Profile distribution counts/percentages, avg range per profile, extreme-timing breakdown per profile — sanity-check + dashboard input. |
| `build_dashboard_data.py` | Phase 3 pipeline: bundles one asset's `*_stats.json` + `*_profile_summary.json` into a single `dashboard/data/<asset>.js` (a plain `const <ASSET>_DATA = {...}` global) — same data-as-JS-file pattern as the sibling Seasonals Dashboard, so the dashboard works from a plain `file://` open with no server/build step. Re-run this (after re-running `stats_engine.py`/`profile_taxonomy.py`) any time the underlying data changes — the `dashboard/data/*.js` files are generated, not hand-edited. |
| `export_profile_examples.py` | Phase 3 pipeline: picks one real "typical" exemplar day per profile (closest to that profile's own average range) per asset, extracts its M1 bars from the raw export, resamples to M15, and writes `dashboard/data/profile-examples/<asset>.js` — the real-chart data behind the profile detail pages. Re-run if the raw CSV, `profile_taxonomy.py`, or its thresholds change. |
| `export_calendar_data.py` | Phase 3 pipeline: builds the calendar feature's per-day data — one JS file per asset per year (`dashboard/data/calendar/<asset>/<year>.js`, chunked so the dashboard doesn't load all ~5,185 days upfront) plus a manifest of available years. Imports `build_weekly()`/`build_monthly()` from `stats_engine.py` so each day's week/month context reuses that logic rather than duplicating it. |
| `dashboard/` | Phase 3 static dashboard — see §5 for what's built and §7 for what's left. |

---

## 4. Environment / dependencies

```
python3 -m pip install pandas numpy scipy --break-system-packages   # (or in a venv)
```
Tested with: pandas 3.0.2, numpy, scipy 1.17.1, Python 3.

No other services or API keys are required for Phases 1–2. A free economic-calendar
API and a database (if/when migrating off static files) are evaluated later — see spec §7–§8.

---

## 5. Key decisions already made (don't re-litigate these without reason)

- **Broker timezone:** TradersWay/MT5 broker time follows **EET/EEST (EU DST transition
  dates)**, confirmed empirically via NFP-release volume-spike timing across two separate
  years (2018, 2019) — *not* US/NY DST dates as originally assumed. Implemented via
  `ZoneInfo("Europe/Bucharest")` in `clean_mt5_csv.py`.
- **Trading-day boundary:** rolls at **5pm New York local time** (DST-aware), the standard
  FX day-boundary convention — not UTC midnight. Midnight UTC was tried first and rejected:
  it split the Sunday market reopen into ~1,035 spurious tiny "days." This fix brought day
  count to 5,190, matching the raw broker day count (5,182) closely.
- **Data-gap detection:** generic rule (`n_bars ≤ 5`), not a hardcoded date list — validated
  against the real bar-count distribution so genuine quiet sessions (Good Friday, Christmas,
  Easter Sunday open — all 10+ bars) aren't falsely flagged, while actual feed-outage
  artifacts (1-bar dummy rows) are. This generalizes to future CSV uploads automatically.
- **Sanity validation:** the cleaned data's largest daily-range outliers land exactly on
  real historic events (Brexit referendum 2016-06-24, GBP flash crash 2016-10-07, 2008 GFC
  days) — strong evidence the pipeline is correct, referenced here so a future session
  doesn't have to re-derive this confidence from scratch.
- **Regime thresholds:** computed **both** ways (percentile-based *and* fixed-ADR-multiple)
  side by side, percentile-based preferred as the default since it self-calibrates per
  asset. Both are exposed, not just one.
- **Framing discipline:** every statistical output is a probability-weighted window, never
  a guaranteed target. This applies to future dashboard copy and any trading logic too —
  see spec §3.3.
- **OHLC chart viewer (added to spec, not yet built):** viewing a specific day's candlestick/
  line chart needs the day's *intraday* bars, which the daily-aggregate CSV doesn't contain.
  Plan is for the pipeline to also emit small per-day chart-ready files (M1 resampled to
  M5/M15) rather than shipping the full M1 history to the dashboard — see spec §5.1.
- **Phase 2 daily taxonomy (implemented, `profile_taxonomy.py`):** two independent,
  self-calibrating axes — range regime (Compression/Normal/Expansion) and closing shape
  (Balanced/Mixed/Directional) — combine into 8 named profiles (Trend Day, Volatile Day,
  Volatile Reversal Day, Quiet Drift Day, Compression Day, Normal Day, plus
  Insufficient_History/Data_Gap). Both axes use a **trailing 252-day rolling percentile rank**
  (not a static full-history threshold) specifically to avoid look-ahead bias and stay
  regime-aware. Confirmed empirically that range size and closing shape are independent
  (compression days show the full spread of closing shapes, not just "balanced"), and that
  Trend Days have a validated timing signature (opposite extreme early, favored extreme late —
  tagged as `Late_Push` in the secondary `extreme_timing` field). Full definitions, naming
  rationale, and the logic for adding future profile names: spec §4.
- **Phase 3 dashboard (built, `dashboard/`):** plain static HTML/CSS/JS, no build step, no
  framework, no external chart library — same architectural pattern as the sibling Kaminari
  Seasonals Dashboard (`../seasonal-dashboard`), including its CSS design tokens/fonts (Bebas
  Neue + IBM Plex Mono, dark theme) for brand consistency, and its data-as-a-JS-global pattern
  (`data/<asset>.js` defines `const <ASSET>_DATA = {...}`, loaded via a plain `<script>` tag —
  avoids fetch()/CORS issues when opened straight from disk). Charts (range percentile strips,
  time-of-extreme session-colored heatmaps, weekday/week-of-month bar charts) are hand-rolled
  vanilla-JS SVG in `js/charts.js` — deliberately no charting library dependency. Verified
  working end-to-end (both assets, all sections populated, lookback dial re-renders correctly)
  via a headless-Edge Playwright check during the build — see spec §5 for the view list actually
  implemented vs. deferred to a later phase.
- **`stats_engine.py`'s circular time-of-day stats now also emit a full 48-bucket histogram**
  (not just the mode bucket) — added specifically so the dashboard's time-of-extreme heatmap
  could show the whole distribution shape, not just call out one winning bucket. Non-breaking
  addition to the existing JSON structure; re-run `stats_engine.py` for both assets if you pull
  an older `*_stats.json`.
- **Dashboard usability pass (jargon layer, mode, yearly extremes, interactivity):** first-user
  feedback was that the raw statistical framing is right for a professional but opaque to a
  trader who just wants a quick correct read. Resolved additively, not by removing rigor — see
  spec §5.0a. Also added: `range_distribution()` now reports **both binned mode and raw mode**
  (spec §3.2 explains why continuous pip data needs the binned version to be meaningful, and how
  the raw mode is flagged/suppressed when it isn't — e.g. yearly range, where all 20 samples are
  distinct); a **Yearly Extremes** section (yearly range distribution + which month the yearly
  high/low tends to fall in), built from the `is_year_high`/`is_year_low` flags Phase 1 already
  computed but never surfaced; and a shared hover-tooltip component (`dashboard/js/tooltip.js`)
  wired into every chart element and every glossary icon. Verified via the same headless-Edge
  Playwright approach, including simulated hovers on tooltip-bearing elements — caught and fixed
  one real bug (mode-note captions said "% of days" even for weekly/monthly/yearly ranges).
- **Yearly Extremes folded into existing sections** (user request, post-build): the Yearly Range
  strip now lives inside Range Distribution (alongside daily/weekly/monthly), and the Year
  High/Low — Month charts now live inside a renamed "Weekly, Monthly and Yearly Extremes"
  section — no standalone "Yearly Extremes" section anymore. Pure markup reorganization;
  `dashboard.js` renders by element ID regardless of DOM position, so no JS changed.
- **Profile detail pages + stylized icons (implemented, `dashboard/profiles/detail.html`):** one
  templated page (`?p=<slug>` query param, not 8 duplicated files) showing each profile's rule,
  "why this name" copy (reused from spec §4.2), cross-asset stats, and — the core of the
  original ask — a **real illustrative candlestick chart** per asset. Exemplar day = the real
  historical day within that profile whose range is closest to the profile's own average (a
  typical day, not a cherry-picked extreme); `pipeline/export_profile_examples.py` picks it and
  exports M15 bars via `clean_mt5_csv.py`'s own `load_raw()`/`to_utc()`. Spot-checked by eye: the
  chosen Trend Day (Up) examples for both assets visibly show the exact "early low, late push to
  new highs" signature the copy describes — good evidence the selection method produces
  genuinely representative days. Profile cards on each asset dashboard now link to their detail
  page and show the same stylized shape icon (`dashboard/js/profile-meta.js`, shared with the
  detail pages so they can't drift apart). Full design rationale: spec §5.3.
- **Real bug hit + fixed, worth remembering for any future multi-bundle page:** `window.GBPUSD_DATA`
  is `undefined` even after `data/gbpusd.js` has loaded — a top-level `const X` in a classic
  `<script>` creates a global *lexical* binding (visible as the bare identifier `X` to later
  script tags), not a `window` property. The asset pages sidestep this with an explicit
  `window.ASSET_DATA = GBPUSD_DATA;`; `profile-detail.js` (which needs both assets' data
  simultaneously) references the bare identifiers directly instead.
- **Generated-file encoding bug found and fixed (affected every pipeline script that writes a
  file):** every `open(path, "w")` in the pipeline was relying on Windows' default `cp1252`
  file encoding rather than UTF-8, which mangled the em dash in each file's own
  "auto-generated, do not edit" header comment (`—` → `�`). JSON outputs escaped it away
  automatically (`json.dump`'s default `ensure_ascii=True`), so this was invisible in
  `*_stats.json`/`*_profile_summary.json`, but it was live in every dashboard `.js` bundle.
  Fixed by adding `encoding="utf-8"` to every `open()` call across all five pipeline scripts
  that write output, and re-ran the full pipeline for both assets to regenerate every affected
  file. Worth remembering for any new script: **always pass `encoding="utf-8"` explicitly** —
  don't rely on the platform default, which differs between Windows and Linux/macOS.
- **Calendar feature (implemented, `dashboard/calendar/`):** month-grid browser per asset
  (`asset.html?a=GBPUSD`) plus a cross-asset "all assets on this day" homepage view
  (`calendar/index.html`), both colored by profile and showing full day/week/month context on
  click. `pipeline/export_calendar_data.py` chunks the data by year (one JS file per asset per
  year, loaded on demand) and reuses `stats_engine.py`'s `build_weekly()`/`build_monthly()`
  rather than duplicating that logic. **A second instance of the `const`-vs-`window` gotcha**
  above, in a form that actually broke the feature until caught: the calendar loader needs to
  look up a data file by a runtime-constructed asset+year, so even the "reference the bare
  identifier" workaround doesn't apply (the name isn't known until runtime) — fixed by having
  the generated calendar files assign onto a namespaced `window.KPT_CALENDAR[asset][year]`
  object instead of declaring a `const`. Full design rationale: spec §5.2.

---

## 6. Known open items / things to watch

- **EU DST timezone finding** was confirmed with strong empirical evidence but only two
  data points (NFP Nov 2018, Nov 2019) — if you ever get access to TradersWay's own server
  documentation stating their DST policy explicitly, worth a quick cross-check.
- **Trading-day boundary** (NY 5pm) is a judgment call — reasonable and standard, but not
  the only valid convention. Revisit if downstream stats look off.
- **`MIN_BARS_FOR_VALID_DAY = 5`** threshold in `clean_mt5_csv.py` was tuned on GBPUSD
  2000–2019 specifically. Re-validate this threshold against the real bar-count distribution
  before reusing it for EURUSD or any other asset/broker feed.
- Full history (20 years) shows **weak time-of-day clustering** for daily high/low
  (concentration R ≈ 0.14–0.18), tightening somewhat in shorter/recent windows
  (R ≈ 0.19–0.29). This is a real, honest finding — not a bug — and should inform how
  confidently the eventual dashboard/trading logic presents time-of-extreme predictions.
- **Weekly extremes cluster on Friday/Monday** in this dataset, not Tuesday/Wednesday as
  ICT lore suggests. Worth keeping in mind when building the Phase 2 profile taxonomy —
  your own labels may end up meaningfully different from ICT's.

---

## 7. Next step

The Phase 3 dashboard is built and verified working for both assets, including the usability
pass, the profile detail pages, and the calendar feature (§5 above).

**Built:** time-of-extreme heatmap (session-colored, mode + concentration badge, lookback
dial), daily/weekly/monthly/yearly range-distribution percentile strips (lookback dial for
daily/weekly/monthly; yearly is full-history only), weekday/week-of-month/month-of-year
extreme-location bar charts, profile-classification panel (distribution + avg range + dominant
timing tag per profile), glossary tooltips on every jargon term, hover tooltips on every chart
element, profile detail pages (rule/why copy, cross-asset stats, real illustrative M15
candlestick chart per asset, stylized shape icon, cross-profile nav) linked from every profile
card, and a calendar feature (per-asset month-grid + cross-asset homepage view, both colored by
profile, click any day for its full day/week/month context).

**Next up, in priority order:**

1. **"Today's" live profile match** — blocked on Phase 4 (a live/current data feed); the
   dashboard is a historical-statistics browser until then.
2. **Weekly taxonomy** — the daily profile logic (`profile_taxonomy.py`) only labels individual
   days; a weekly version needs its own empirical validation pass (per spec §4.4's naming logic).
3. **Deployment** — not yet pushed to Netlify/hosting; currently local-only, viewable by opening
   `dashboard/index.html` directly or serving the `dashboard/` folder.
4. **Polish pass** — an actual trader hasn't used this yet; expect UI/copy feedback once someone
   tries it against a real morning routine. One known nit already flagged: "Normal Day" cells on
   the calendar are low-contrast, close in appearance to empty/no-data cells (spec §5.2).
5. **Full OHLC chart viewer** (spec §5.1) — the profile-detail exemplar charts (§5.3) cover 8
   days per asset; viewing an arbitrary historical day still needs the full per-day export.
6. **Session-defined extreme profiles + news-release-timing profiles** — two new profile
   families the user wants eventually (spec §4.5), not designed in detail yet.

**Noted for later, not actionable now:**

- A possible future merge with the sibling Seasonals Dashboard (Seasonals = top-level macro
  view, this dashboard = zoomed-in daily/weekly view) — kept in mind for navigation/data-format
  decisions so a merge stays a consolidation rather than a rewrite. See spec §5.0b.
- Two more profile families the user wants eventually: **session-defined extreme profiles**
  (Asian-only / Asian-London / Asian-New York / London-only / London-New York / New York-only,
  by which session(s) contained the day's high and low) and **news-release-timing profiles**
  (an NFP profile, a generic "8:30 NY news embargo" profile) — the latter depends on the
  news/event annotation layer (§2.4) for the general case. Full notes, including the
  empirical-validation-first requirement before either becomes a real profile: spec §4.5.

EURUSD data cleaning is done (§3 table) — both assets are first-class throughout, not
GBPUSD-only with EURUSD bolted on later.
