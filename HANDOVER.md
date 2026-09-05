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
│   ├── raw/                             (raw MT5 exports, gitignored — <ASSET>_M1_full.csv,
│   │                                      one continuous full-history file per asset)
│   └── clean/
│       ├── gbpusd_daily_clean.csv, gbpusd_daily_profiles.csv
│       └── ... one pair per asset (eurusd, audusd, nzdusd, usdcad, usdchf, usdjpy)
├── pipeline/
│   ├── clean_mt5_csv.py
│   ├── concat_raw_csv.py                (merges a new raw export into <ASSET>_M1_full.csv)
│   ├── refresh_asset.py                 (one-command runner for the 6-stage chain below)
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
| `clean_mt5_csv.py` | Phase 1 pipeline: raw MT5 M1 CSV → UTC-normalized, cleaned daily OHLC CSV. Reusable for future CSV uploads/assets. Auto-detects a per-asset "daily-only" historical era (single EOD bar/day, before the broker's M1 feed began) and flags it `is_daily_only` rather than misclassifying it as `is_data_gap` — see §5. |
| `concat_raw_csv.py` | Merges a new raw MT5 export into an asset's `<ASSET>_M1_full.csv`, auto-detecting append/prepend/both from the timestamp ranges (needed because MT5's Export Bars has a rolling ~20-year lookback cap, so a single from-scratch full-history export isn't always possible) — see §5. |
| `refresh_asset.py` | One-command runner for the full 6-stage chain (`clean_mt5_csv.py` → `profile_taxonomy.py` → `stats_engine.py` → `build_dashboard_data.py` → `export_profile_examples.py` → `export_calendar_data.py`) for one asset. Looks up pip size and unit label from its own per-asset registry. Replaces manually invoking all 6 scripts in order — see §5. |
| `gen_seasonal_signal.py` | Separate, optional stage — derives a Moore-Research-*shaped* seasonal signal (`MONTHS[]`-style, 12 months × 4 weeks) from a cleaned daily CSV, for assets MRCI doesn't cover (currently BTCUSD only). Not part of `refresh_asset.py`'s chain (different consumer — `seasonal-dashboard`'s Seasonals tab, not Profiling). See §5. |
| `profile_taxonomy_weekly.py` | Tier 5's Weekly Profile — parallel sibling to `profile_taxonomy.py`, same two axes and 8-profile scheme re-derived (not assumed) at weekly granularity, plus two secondary tags (`extreme_timing`, `extreme_spread`). Part of `refresh_asset.py`'s chain (`--skip-weekly` to opt out). Not yet consumed by `build_dashboard_data.py`. See §5. |
| `<asset>_weekly_profiles.csv` / `<asset>_weekly_profile_summary.json` | Weekly taxonomy output, one pair per asset, same role as the daily profiles/summary pair. |
| `<asset>_daily_clean.csv` | Cleaned daily output, one per asset, full available history (back to 1993 for most majors) — see §5's asset roster. File naming deliberately drops the date-range suffix these files originally had (`_2000_2019` etc.): the range keeps growing with every refresh, so a baked-in suffix would immediately go stale. Freshness is tracked via each output's own `as_of` field instead. |
| `stats_engine.py` | Phase 1 stats engine: reads the cleaned daily CSV, produces range distributions, circular time-of-extreme stats, and weekly/monthly aggregates. |
| `<asset>_stats.json` | Stats engine output, one per asset — everything the dashboard (Phase 3) will consume. |
| `profile_taxonomy.py` | Phase 2 pipeline: reads the cleaned daily CSV, assigns each day one of 8 named profiles (see spec §4) from two independent, self-calibrating axes (range regime, closing shape) plus a secondary extreme-timing tag. `is_daily_only` days flow through normally (their OHLC-derived range regime/shape are real) but the intrabar-dependent `extreme_timing` tag naturally resolves to `Insufficient_History` for them (zero intraday time span) — no special-casing needed. |
| `<asset>_daily_profiles.csv` | Per-day profile labels + underlying features, one per asset — the labeled historical dataset for backtesting/dashboard use. |
| `<asset>_profile_summary.json` | Profile distribution counts/percentages, avg range per profile, extreme-timing breakdown per profile — sanity-check + dashboard input. |
| `build_dashboard_data.py` | Phase 3 pipeline: bundles one asset's `*_stats.json` + `*_profile_summary.json` into a single `dashboard/data/<asset>.js` (a plain `const <ASSET>_DATA = {...}` global) — same data-as-JS-file pattern as the sibling Seasonals Dashboard, so the dashboard works from a plain `file://` open with no server/build step. Re-run this (after re-running `stats_engine.py`/`profile_taxonomy.py`) any time the underlying data changes — the `dashboard/data/*.js` files are generated, not hand-edited. |
| `export_profile_examples.py` | Phase 3 pipeline: picks one real "typical" exemplar day per profile (closest to that profile's own average range) per asset, extracts its M1 bars from the raw export, resamples to M15, and writes `dashboard/data/profile-examples/<asset>.js` — the real-chart data behind the profile detail pages. Excludes `is_daily_only` days from exemplar candidacy (a single EOD bar can't back a candlestick chart). Re-run if the raw CSV, `profile_taxonomy.py`, or its thresholds change. |
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
- **Full asset roster + full-history data source correction (2026-09-04):** expanded from
  GBPUSD/EURUSD-only (2000-2019) to all 7 majors — GBPUSD, EURUSD, AUDUSD, NZDUSD, USDCAD,
  USDCHF, USDJPY — each with the full history TradersWay's MT5 export makes available (back to
  1993 for most; NZDUSD/USDCHF only have M1 history from 2001). Mid-effort, discovered that a
  batch of freshly-downloaded raw exports (5 new assets' full history, plus a 2020-2026 tail for
  GBPUSD/EURUSD) had accidentally come from an **IC Markets** MT5 account instead of TradersWay —
  a different broker, not guaranteed to share the same EET/EEST timezone convention (§5 above)
  or spread/tick conventions this pipeline's cleaning logic was validated against. Rather than
  trying to reconcile two brokers' data, all of it was discarded and re-downloaded fresh from
  TradersWay only, one continuous full-history file per asset. **Lesson: always confirm which
  MT5 account/broker a raw export actually came from before feeding it into the pipeline** — the
  file format gives no indication, and a wrong-broker file can pass every existing validation
  check while still being subtly (or not so subtly) wrong.
- **`concat_raw_csv.py` generalized to auto-detect append vs. prepend vs. both (2026-09-04):**
  originally append-only (built to merge a fresh "up to today" export onto the end of an
  existing file, for MT5's rolling ~20-year export cap). Generalized after realizing the same
  need applies in reverse — discovering an earlier-history source after the fact (e.g. a file
  that only goes back to 2007, then finding one that reaches back to 2000) needs prepending, not
  appending. Auto-detects the direction per merge from the two files' timestamp ranges: an
  append's trailing/most-recent date is still always dropped whole (a fresh export risks ending
  mid-day); a prepend's boundary day is *not* auto-dropped (no "live now" edge on that side —
  dropping it would delete real history), just reported with its bar count so the day can be
  eyeballed for completeness. Overlap is always resolved in favor of the existing file on either
  side. Regression-tested against the already-verified GBPUSD append merge (byte-identical
  output) plus synthetic prepend/both-sides cases before rolling out to all 7 assets.
- **`refresh_asset.py` orchestrator added (2026-09-04):** one command
  (`python pipeline/refresh_asset.py <ASSET>`) replaces manually invoking all 6 pipeline scripts
  in dependency order. Holds a per-asset pip-size registry (fails loudly, not silently, for an
  asset not yet listed) and asset-keyed output paths with no date-range suffix baked in (see the
  `<asset>_daily_clean.csv` row in §3) — freshness is tracked via each output's own `as_of`
  field instead, so a re-run never leaves stale dated variants to track by hand.
- **Daily-only historical era detected and handled (2026-09-04):** TradersWay's broker history
  for most of these assets only has *Daily*-resolution bars before their M1 feed began — MT5's
  M1 export still emits one row per day for that era (open==high time==low time==close time,
  but real, meaningful OHLC — not a data-feed artifact). At bar-count == 1 this was
  indistinguishable from `is_data_gap` under the original logic, silently discarding real,
  usable history (1,469 days for GBPUSD alone; see the per-asset table in this session's commit).
  Fixed in `clean_mt5_csv.py` (`detect_daily_only_cutoff()`): finds the date M1 coverage actually
  becomes *sustained* (≥90% of the following 20 trading days also dense — guards against one
  early spike day being mistaken for the real cutover), and reclassifies low-bar-count days
  before that date as `is_daily_only` (trusted OHLC/range, eligible for period high/low, included
  in `stats_engine.py`'s range distributions) rather than `is_data_gap` (excluded everywhere,
  range set to NaN). Days at/after the cutover keep the original gap logic unchanged — confirmed
  against a known later anomaly (GBPUSD 2018-02-26, a genuine 1-bar gap) still classifying
  correctly. The cutover landed on **1999-01-04 for every asset that has one** (GBPUSD, EURUSD,
  AUDUSD, USDCAD, USDJPY) — an industry-wide broker-history boundary, not an asset-specific
  quirk — while NZDUSD/USDCHF (whose files only start in 2001) correctly show no daily-only era
  at all. All other pipeline stages needed zero changes: `profile_taxonomy.py`,
  `stats_engine.py`, and `export_calendar_data.py` all key exclusively off `is_data_gap`, so
  narrowing that flag upstream was sufficient — the one genuine gap was `export_profile_examples.py`
  needing to exclude `is_daily_only` days from exemplar candidacy (see its §3 row).
- **Per-asset unit label added (2026-09-05):** `stats_engine.py` now accepts `--unit` and includes
  it in its output JSON (default `"pips"`, backward compatible). `refresh_asset.py`'s
  `PIP_REGISTRY` became `ASSET_REGISTRY`, pairing each asset's pip size with a unit label — "pips"
  for actual currency pairs, "points" for everything else (metals, energies, indices, crypto).
  Fixed a real display bug on `seasonal-dashboard`'s new non-FX Profiling pages ("ADR 20: 427.8
  pips" on the Dow Jones page, which should say "points").
- **`pipeline/gen_seasonal_signal.py` added (2026-09-05):** derives a Moore-Research-*shaped*
  seasonal signal (12 months × 4 weeks, `bull`/`bear`/`chop` per bucket) from a cleaned daily CSV,
  for assets MRCI doesn't cover — currently just BTCUSD. Deliberately replicates
  `seasonal-dashboard/js/backtest.js`'s exact week-of-month bucketing (day-of-month buckets, not
  ISO weeks) and Raw Price Tendency thresholds (60%/40%), so the derived signal means the same
  thing as that site's own validation tooling instead of inventing a new methodology. Star
  conviction is capped globally, not per-bucket — a ~9-year sample gives almost every bucket the
  same small n (one observation per year), so there's no meaningful per-cell variance to penalize
  the way there would be for a 40-year Moore Research asset; the honest fix is a ceiling on the
  whole asset (never 5 stars), not a per-cell heuristic. Bridged into `seasonal-dashboard` by its
  own new `scripts/sync_derived_seasonal.js` — see that repo's `docs/CHANGELOG.md` v1.11 and
  `docs/DATA_DICTIONARY.md`'s "Statistically-derived assets" section for the consuming side.
- **Per-session OHLC added (2026-09-05), first step toward liquidity-sweep profiles:**
  `clean_mt5_csv.py`'s `add_session_ohlc()` computes each named session's own open/high/low/close
  per trading day (`asian_*`/`london_*`/`ny_*` columns). Deliberately uses each session's *full*
  native hour window, including hours shared with an adjacent session — grouping by
  `session_tag()`'s own mutually-exclusive labels instead would understate a session's real range
  by excluding its overlap hours, and the whole point of this data is to know each session's true
  extremes so a later session's sweep of them can be detected.

  Confirmed empirically on GBPUSD that the *original* three windows (Asian 23:00-08:00, London
  07:00-16:00, NY 12:00-21:00 UTC) plus their overlaps didn't cover the full 24 hours — a real
  ~2-hour gap at 21:00-23:00 UTC with no session OHLC at all. User asked for full 24-hour coverage
  (same day, once the gap was reported) — fixed by widening Asian's start to **21:00 UTC**, the
  conventional Sydney-open time several retail FX session models already use as the start of the
  broader "Asian/Pacific" session, not an arbitrary stretch. Asian ∪ London ∪ NY now spans all 24
  hours with no gap. `session_tag()` and `add_session_ohlc()` now both derive from the same three
  shared boundary functions (`_in_asian`/`_in_london`/`_in_ny`) instead of duplicating the hour
  logic, so they can't drift apart again.

  **This change has real, visible effect on already-shipped features**, not just new unused
  columns — `session_tag()`'s output feeds `stats_engine.py`'s time-of-extreme circular stats (the
  Profiling tab's session-colored heatmap, already live) and `export_calendar_data.py`'s per-day
  session labels (the calendar feature, already live). A day whose high/low previously landed in
  the 21:00-23:00 gap (rendered with no session color at all) now correctly shows as Asian. Ran the
  full 6-stage `refresh_asset.py` chain for all 14 assets, not just `clean_mt5_csv.py` alone, to
  keep every downstream consumer in sync with the new boundary — this couldn't be staged as a
  clean-only change the way the initial version could.

  See `market-profiling-system-spec.md` §2.3/§4.5 for the full writeup and the sweep-profile design
  this unblocks. No downstream stage consumes the new session-OHLC *columns* themselves yet
  (deliberately staged step-by-step, not built ahead of the actual sweep-detection logic) — only
  the boundary widening itself was live-visible, via the pre-existing `session_tag()` consumers.
- **Asian-widening reverted, same day (2026-09-05):** on reflection, decided the 21:00 UTC widening
  above was the wrong fix, even though it mechanically worked. That window sits right at this
  pipeline's own trading-day boundary (NY 5pm, landing at 21:00 or 22:00 UTC depending on DST), so
  a widened Asian session doesn't cleanly represent "the fresh start of a new trading day" — part
  of it can still conceptually belong to the tail of the *previous* trading day depending on the
  time of year, which felt like carrying over stray data rather than a clean session boundary.
  Reverted `_in_asian()` back to 23:00 UTC; the 21:00-23:00 UTC gap (`"Other"` in `session_tag()`,
  NaN in the session-OHLC columns) is deliberate again, not a defect — read as "not much happens
  here," not "unaccounted for." The shared-boundary-functions refactor (`_in_asian`/`_in_london`/
  `_in_ny` as one source of truth for both `session_tag()` and `add_session_ohlc()`) stayed; only
  the specific hour values reverted. If a concrete future use case genuinely needs that window's
  data, handle it for that case specifically rather than redefining the boundary globally again.
  Re-ran the full 6-stage chain for all 14 assets a second time to restore the original session
  labeling everywhere (this and the widening above never reached `origin/main` — both the fix and
  the revert happened in local commits before any push, so there was no live-site impact either way).
- **Weekly Profile taxonomy implemented (2026-09-05), Tier 5's first granularity beyond Daily:**
  `profile_taxonomy_weekly.py`, same two-axis methodology as `profile_taxonomy.py` but re-derived
  empirically at weekly granularity per spec §4.4's standing rule, not assumed to transfer as-is
  from Daily. Full methodology and findings: spec §4.6. Headline results, validated across GBPUSD/
  EURUSD/XAUUSD (not GBPUSD-only): the range/closing-shape correlation is real (+0.10 to +0.18,
  stable across assets) but small enough that the two-axis split still works; a user-proposed new
  secondary tag (`extreme_spread` — the *joint* high-weekday/low-weekday pattern, not just the two
  existing marginal charts) found a strong, consistent, cross-asset pattern — same-day extremes
  suppressed 5-15x vs. independence, spread-apart pairs over-represented ~1.4-1.9x — and Weekly's
  existing `extreme_timing` tag independently reproduced Daily's own trend-day signature
  (`Late_Push` in 84-91% of Trend Weeks), a genuine cross-granularity confirmation the design
  transferred correctly rather than just a plausible-sounding assumption. Wired into
  `refresh_asset.py`'s chain (`--skip-weekly` to opt out) and backfilled for all 14 assets. Not yet
  consumed by `build_dashboard_data.py` or any dashboard page — this pass was explicitly scoped to
  data/methodology validation; dashboard surfacing is a separate future step.

---

## 6. Known open items / things to watch

- **EU DST timezone finding** was confirmed with strong empirical evidence but only two
  data points (NFP Nov 2018, Nov 2019) — if you ever get access to TradersWay's own server
  documentation stating their DST policy explicitly, worth a quick cross-check.
- **Trading-day boundary** (NY 5pm) is a judgment call — reasonable and standard, but not
  the only valid convention. Revisit if downstream stats look off.
- **`MIN_BARS_FOR_VALID_DAY = 5`** threshold in `clean_mt5_csv.py` was tuned on GBPUSD
  2000–2019 specifically, and now also does double duty as the daily-only-era detection
  threshold (§5). It's held up across all 7 assets so far (the M1-coverage cutover detects
  cleanly everywhere it should exist), but re-validate against the real bar-count distribution
  before reusing it for a new asset/broker feed, especially one without a clean industry-wide
  cutover date to sanity-check against.
- Full history (20 years) shows **weak time-of-day clustering** for daily high/low
  (concentration R ≈ 0.14–0.18), tightening somewhat in shorter/recent windows
  (R ≈ 0.19–0.29). This is a real, honest finding — not a bug — and should inform how
  confidently the eventual dashboard/trading logic presents time-of-extreme predictions.
- **Weekly extremes cluster on Friday/Monday** in this dataset, not Tuesday/Wednesday as
  ICT lore suggests. Worth keeping in mind when building the Phase 2 profile taxonomy —
  your own labels may end up meaningfully different from ICT's.

---

## 7. Next step

The Phase 3 dashboard is built and verified working for all 7 assets, including the usability
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

**Merge into the Kaminari Seasonals Dashboard is now the plan for deployment** (superseding the
old "push this dashboard to Netlify standalone" item) — see
`../seasonal-dashboard/docs/MARKET_PROFILING_INTEGRATION.md` for the full execution brief. Repo
roles going forward: **this repo becomes the data pipeline** (Python scripts stay here, and this
remains the fast local testbed for pipeline/taxonomy changes without risking the live site); the
standalone `dashboard/` here is a staging area to build/verify against, not the long-term
deliverable — `seasonal-dashboard` is. That work happens in its own Claude Code session, anchored
in that repo, per the user's explicit preference — not carried over from this session.

**Next up, in priority order:**

1. **"Today's" live profile match** — blocked on Phase 4 (a live/current data feed); the
   dashboard is a historical-statistics browser until then.
2. ~~**Weekly taxonomy**~~ — done (2026-09-05), see §5's entry and spec §4.6. Not yet surfaced on
   any dashboard page — that's the natural next step for this item specifically, separate from
   Monthly/Yearly (the rest of Tier 5) or Tier 5b's liquidity-sweep work.
3. **Polish pass** — an actual trader hasn't used this yet; expect UI/copy feedback once someone
   tries it against a real morning routine. One known nit already flagged: "Normal Day" cells on
   the calendar are low-contrast, close in appearance to empty/no-data cells (spec §5.2).
4. **Full OHLC chart viewer** (spec §5.1) — the profile-detail exemplar charts (§5.3) cover 8
   days per asset; viewing an arbitrary historical day still needs the full per-day export.
5. **Session-defined extreme profiles + news-release-timing profiles** — two new profile
   families the user wants eventually (spec §4.5), not designed in detail yet.

**Noted for later, not actionable now:**

- Two more profile families the user wants eventually: **session-defined extreme profiles**
  (Asian-only / Asian-London / Asian-New York / London-only / London-New York / New York-only,
  by which session(s) contained the day's high and low) and **news-release-timing profiles**
  (an NFP profile, a generic "8:30 NY news embargo" profile) — the latter depends on the
  news/event annotation layer (§2.4) for the general case. Full notes, including the
  empirical-validation-first requirement before either becomes a real profile: spec §4.5.

All 7 assets (§3 table) are first-class throughout, sharing the same pipeline/orchestrator with
no per-asset code branches — adding an 8th is a data download + a `PIP_REGISTRY` entry, not new
code.
