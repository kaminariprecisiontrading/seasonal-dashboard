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
│   └── profile_taxonomy.py
├── output/
│   ├── gbpusd_stats.json / eurusd_stats.json
│   └── gbpusd_profile_summary.json / eurusd_profile_summary.json
└── dashboard/                           (not started yet — Phase 3)
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

## 7. Next step: Phase 3 (dashboard) or extend Phase 2 to weekly

Phase 2's **daily** taxonomy is done for both assets (§5, §6 above; full definitions in spec
§4). Two directions from here, not mutually exclusive:

- **Extend Phase 2 to a weekly taxonomy.** The daily profile logic (`profile_taxonomy.py`)
  only labels individual days; the spec's original scope (§4) also calls for a weekly "shape."
  Would need its own empirical validation pass (per spec §4.4's naming logic) rather than
  just re-running the daily rules on weekly bars — weekly range/closing-shape distributions
  haven't been explored yet.
- **Start Phase 3: the static dashboard** (spec §5), consuming `gbpusd_stats.json` /
  `eurusd_stats.json` and the new `*_daily_profiles_2000_2019.csv` / `*_profile_summary.json`
  outputs. `dashboard/` is currently empty — this is a from-scratch build following the
  Seasonals Dashboard pattern.

EURUSD data cleaning is done (§3 table) — both assets now have matching cleaned CSVs, stats
JSON, and profile labels/summaries, so anything built from here should treat both as first-class
from the start rather than GBPUSD-only with EURUSD bolted on later.
