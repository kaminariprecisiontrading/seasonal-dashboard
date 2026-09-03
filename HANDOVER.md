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
│       └── gbpusd_daily_clean_2000_2019.csv
├── pipeline/
│   ├── clean_mt5_csv.py
│   └── stats_engine.py
├── output/
│   └── gbpusd_stats.json
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
| `stats_engine.py` | Phase 1 stats engine: reads the cleaned daily CSV, produces range distributions, circular time-of-extreme stats, and weekly/monthly aggregates. |
| `gbpusd_stats.json` | Stats engine output for GBPUSD — everything the dashboard (Phase 3) will consume. |

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

## 7. Next step: Phase 2

Per the spec's phased roadmap (§9): **rule-based regime/profile taxonomy** — defining and
naming the recurring daily/weekly "shapes" (one-sided day, compression day, etc.), applying
them retrospectively to the cleaned historical data, using the stats already computed in
`gbpusd_stats.json` as the quantitative basis for the classification rules.

EURUSD data cleaning (running the same `clean_mt5_csv.py` pipeline on an EU CSV once
available) can happen in parallel or before Phase 2 — it's independent of the taxonomy work.
