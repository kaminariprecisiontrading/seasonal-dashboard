# PLATFORM_ROADMAP.md — Platform Evolution Plan

**Status:** Planning document, agreed 2026-09-04. Captures the direction discussed after the
Market Profiling merge (`docs/MARKET_PROFILING_INTEGRATION.md`) shipped and was reviewed live.
This doc is broader than that one — it covers the index page, the tab/column structure across
all 97 asset pages, and the multi-timeframe profile vision that reframes what
`MARKET_PROFILING_INTEGRATION.md` §9.3 called "Phase C." That section now points here.

Read this top to bottom for the full plan; each tier below is roughly the order of execution,
though tiers can overlap in practice (e.g. Tier 5 is ongoing/paced by data availability, not a
blocking phase).

---

## Tier 1 — Quick wins — ✅ Complete (v1.8)

Small, independent, low-risk. No architectural decisions, no cross-file redesign.

| Item | What | Files |
|---|---|---|
| ✅ Favicon | No `<link rel="icon">` anywhere in the repo — every page shows a broken/default tab icon. | `scripts/patch_add_favicon.js` (new), all HTML |
| ✅ AI model strings | `claude-sonnet-4-20250514` → `claude-sonnet-5`, label → "Claude Sonnet 5". | `js/api.js`, `docs/ARCHITECTURE.md`, `docs/PROMPTS.md` |
| ✅ Print CSS gap | Added print-appropriate overrides for the 7 `--kptp-*` tokens, darkened the same way `--bull`/`--bear`/`--chop` already are. | `css/dashboard.css` |
| ✅ Profiling → AI context | Added `js/profiling.js`'s `window.KPT_PROFILING_CURRENT` exposure + `js/api.js`'s `_gatherProfilingCtx()` as a 5th context layer (median daily range, ADR20, most-common profile, dominant timing) with its own ✓/○ chip. | `js/api.js`, `js/profiling.js` |
| ✅ Profile Taxonomy above Range Distribution | Pure markup reorder, zero logic risk as predicted. | `js/profiling.js` |
| ✅ Index page — Forex first | Exact block swap (line-slice, not manual retyping) of the two top-level sections + sticky-nav groups; card count and every href/id verified unchanged. | `index.html` |

Full record: `docs/CHANGELOG.md` v1.8.

---

## Tier 2 — Profile-detail: asset-specific default view

**Problem:** `profiling-profiles/detail.html?p=<slug>&a=<assetkey>` always shows the cross-asset
comparison (every Profiling asset's stats for that profile, side by side), regardless of whether
the visitor arrived from a specific asset's Profiling tab or navigated there directly. The `a`
param exists today but is only used for nav-pill/back-link construction, not to change what's
shown by default.

**Desired behavior:**
- Arriving with `a=gbpusd` (i.e. clicked "Normal Day" from `fx-gbpusd.html`'s Profile Taxonomy
  grid) → show GBPUSD's own stats and example chart first, prominently.
- A visible "Compare across all assets →" control reveals/expands the existing cross-asset view
  as a secondary, opt-in step.
- Arriving with no `a` param (the "general" page) → today's cross-asset comparison, unchanged —
  this is already effectively the "general Normal Day page," it just needs to stop being the
  *only* mode.

**Implementation shape:** a rendering-mode branch in `js/profiling-profile-detail.js`, the same
pattern already used in `js/profiling-calendar.js` for its `isHome` asset-vs-home split. Not a
new page or route — `renderCrossAssetStats()`/`renderExampleCharts()` already loop over all
`ASSETS`; the change is which asset(s) render by default and adding the toggle/link.

**Effort:** contained, moderate. No pipeline changes, no new data.

---

## Tier 3 — Mobile responsiveness pass

Already tracked as ROADMAP.md Phase 6C ("Planned," never started). Re-flagged here because
Profiling's stat-grids and two-column layouts (range distribution, weekly/monthly/yearly
extremes) make the gap more visible than it was pre-Profiling, and because Tier 4's tab
restructure is a natural point to do this once rather than twice — the tab bar itself needs
mobile treatment (horizontal scroll strip) as part of that restructure anyway.

**Recommendation:** sequence this pass together with Tier 4, not before or fully separately.

---

## Tier 4 — Tab/column restructure

**Current 8 tabs:** Seasonals · Trend · Price · History · Sessions · Macro · Profiling · Analysis

**Proposed 7 tabs:** Seasonals (HTF) · Trend (HTF) · Profiling (LTF) · Live Price · Macro ·
Upload · Analysis

Endorsed direction — the order reads as a coherent narrative: macro seasonal bias → trend
confirmation → granular timing stats → where price actually is → external risk calendar → your
own data → AI synthesis of all of it.

### The History+Sessions → "Upload" merge

These aren't the same tool at different timeframes under the hood — they're different
statistical engines:
- `js/backtest.js` (History, 564 lines) — D1-only input, computes raw tendency / win-rate /
  avg-return per (month, week-slot), validates the *seasonal* signal.
- `js/intraday.js` (Sessions, 782 lines) — H1/H4-only input, computes by-hour / by-session /
  by-day-of-week bias, reveals *intraday timing*.

"Merge" means one upload flow that auto-detects the CSV's granularity and routes to the right
engine(s) — not literally combining the two computation functions into one.

**Useful fact already true today:** `backtest.js`'s parser already aggregates sub-daily bars
(M1/H1/H4) up to one daily close per calendar day — "sub-daily files are automatically
aggregated... the engine always works on D1-equivalent data regardless of input timeframe." That
means a single H1 upload can already power *both* outputs (History-style from the aggregated
daily closes, Sessions-style from the raw bars) without asking the user to choose. A pure D1
upload only supports the History-style output (no intraday bars to compute session/hour bias
from) — the Upload tab should just show whichever sections the data actually supports.

**Two implementation paths, in increasing order of cleanliness/effort:**
1. **Interim:** keep `backtest.js`/`intraday.js` as separate internal modules, each still owning
   their own `data-kpt-panel` value, but present them behind one "Upload" tab entry with an
   internal sub-view (similar to the existing TF sub-tabs pattern). Lower risk, faster.
2. **Clean end state:** a genuinely unified `js/upload.js` — one upload UI, one shared CSV
   parser/timeframe-detector (both files currently have their own near-duplicate detection
   logic), routing to whichever render functions apply. Bigger refactor, better long-term.

**localStorage:** keep `kpt-bt-{id}` and `kpt-idt-{id}` as separate keys internally even after the
UI merges, at least initially — avoids a data-migration step for existing saved uploads, at the
cost of two keys instead of one. Revisit only if it becomes awkward.

### The convergence worth designing toward (not building now)

Once "Upload" is timeframe-agnostic and produces both weekly-validation stats *and* intraday-
timing stats from one CSV, it becomes structurally close to what the pre-computed **Profiling**
tab already does (range distributions, time-of-extreme clustering, profile taxonomy) — just
computed live in-browser from the user's own data instead of pre-computed by the Python
pipeline.

Long-term direction: "Upload" could reuse `js/profiling-charts.js`'s rendering primitives
(`KPTPCharts.renderRangeStrip`, `renderTimeHeatmap`) directly, fed by a lightweight client-side
port of the relevant slices of `stats_engine.py`'s math (percentile distributions, circular
time-of-day stats). That would make pre-computed Profiling and user-uploaded Upload two views of
the *same* engine and the same visual language, rather than parallel systems that happen to look
similar. It would also deliver the future multi-broker idea (Tier 6, parked) essentially for
free — any broker's CSV could power an ad-hoc Profiling-style view without needing a matching
pre-computed pipeline run.

**Not proposed for the near-term merge.** Design the Upload merge with this direction in mind
(shared parser, shared chart primitives where reasonable) so it isn't precluded later — but the
near-term deliverable is just the two existing engines cleanly unified behind one upload flow.

### Risk / blast radius

Touches `ui.js`'s shared tabs array (all 97 pages) plus a real merge of two substantial modules,
and changes/removes existing tab labels and panel ids. Treat as its own phase with the same
branch-and-test discipline used for the Profiling merge (`docs/MARKET_PROFILING_INTEGRATION.md`
§6) — not a quick edit.

---

## Tier 5 — Multi-timeframe profiles (Daily → Weekly → Monthly → Yearly), absorbing former "Phase C"

**The unifying idea:** the daily profile taxonomy (Trend Day, Volatile Day, Compression Day,
etc. — already built, `KPT-Market-Profiling/pipeline/profile_taxonomy.py`) is one granularity of
a more general concept. The same range-regime × closing-shape methodology, applied to weekly,
monthly, and yearly bars instead of daily ones, would produce Weekly/Monthly/Yearly Profiles.

**The reframing that supersedes old "Phase C":** the existing Seasonals tab's month-by-month,
week-by-week bull/bear/chop breakdown (`MONTHS[]`) is naturally a *detailed narrative layer
inside a year's overall profile* — not a separate system that happens to cover similar ground.
So instead of two parallel workstreams ("re-derive Seasonals statistically" + "build a Yearly
Profile"), there's one: **build the Yearly Profile layer, and let it inform/eventually replace
the chart-image-interpreted parts of Seasonals where the two disagree.** The previous
recommendation from `MARKET_PROFILING_INTEGRATION.md` §9.3 — additive cross-check first
(extends `ROADMAP.md` Phase 9A), targeted correction only where validated, never a wholesale
swap — still applies, now as the plan for this merged workstream rather than a separate one.

### Why this is real research work, not just more dashboard UI

The daily taxonomy's rolling-percentile approach doesn't translate directly to coarser bars, and
sample size drops fast as granularity coarsens (over a 20-year history):

| Granularity | Approx. sample size | Note |
|---|---|---|
| Daily | ~5,000 | Existing taxonomy, trailing 252-day window |
| Weekly | ~1,000 | Needs its own trailing-window size (not 252 days) |
| Monthly | ~240 | Getting thin |
| Yearly | **~20** | Very thin |

`KPT-Market-Profiling/market-profiling-system-spec.md` §4.4 is explicit that a new axis needs
empirical validation (distribution/cross-tab analysis on real data) before it becomes a real
profile — this isn't optional rigor, it's the standing rule for this taxonomy. And the pipeline
already treats yearly-granularity stats with extra caution for exactly this reason (yearly range
distribution is deliberately *not* lookback-windowed, and its small `n` is shown in the UI
rather than hidden). A Yearly Profile taxonomy with ~20 samples needs at least that much care,
probably more — likely wider/softer thresholds, or an explicit low-confidence framing rather
than clean rule-based buckets the way Daily/Weekly can support.

### Scope boundary (already correctly identified)

Applies only to assets with real MT5 data behind them (currently GBPUSD/EURUSD, growing per
Tier-4-adjacent Phase B rollout in `MARKET_PROFILING_INTEGRATION.md`). Assets without MT5
data keep the existing Moore Research–derived Seasonals as-is — no forced parity, no assets left
without a Seasonals view just because they lack MT5 coverage.

### Where this eventually surfaces in the UI

Not designed in detail yet — flagged so a future session has the shape of the problem, not to
lock in an implementation:
- A granularity selector on the Profiling tab (or a new dedicated view), similar in spirit to the
  existing lookback-window dial — Daily / Weekly / Monthly / Yearly.
- The Seasonals tab's own accordion likely stays the primary *reading* surface for the yearly
  story even after this ships — the change is in what generates its underlying signal (rule-based
  statistics vs. chart-image interpretation), not necessarily its presentation.

### Sequencing

Paced by MT5 data availability, not a blocking phase — runs alongside Tier-6-adjacent asset
rollout (adding more Profiling assets as CSVs are cleaned). Daily is done. Weekly is the natural
next validation target (largest remaining sample size of the three new ones). Monthly and Yearly
follow, with Yearly requiring the most methodological care per the sample-size table above.

---

## Tier 6 — Parked (noted, not started)

No design work yet — recorded so they aren't lost, revisited only when explicitly brought up.

### Synthetics (Deriv) and Crypto

Add index-page sections for Deriv synthetics and crypto (e.g. BTCUSD via an MT5-available
forex/CFD equivalent), once MT5 data upload is a consistent, ongoing habit rather than a
one-time backfill. Revisit after Tier 1–5 groundwork is in place.

### Multi-broker data labeling

Future ability to hold multiple brokers' cleaned data for the same asset (TradersWay, Deriv, IC
Markets, eventually Dukascopy/NinjaTrader/cTrader) and switch between them in the dashboard UI —
e.g. a broker selector on `fx-gbpusd.html` analogous to the lookback-window dial.

**Architectural note (free, already true):** the `data/profiling/` and
`scripts/sync_profiling_data.js` design is already keyed by asset string, not hardcoded to one
source — extending the key to an asset+broker pair (e.g. `gbpusd_tradersway` vs `gbpusd_deriv`)
is a natural extension of the existing pattern, not a redesign. Nothing done so far needs to be
undone for this to happen later.

---

## Summary — execution order

1. **Tier 1** — ✅ done (v1.8).
2. **Tier 2** — profile-detail asset-specific view, contained.
3. **Tier 3 + Tier 4 together** — mobile pass done as part of the tab restructure, not before it.
4. **Tier 5** — ongoing, paced by MT5 data uploads, runs in parallel with continued Profiling
   asset rollout (`MARKET_PROFILING_INTEGRATION.md` §9.2).
5. **Tier 6** — parked, no action until explicitly raised again.
