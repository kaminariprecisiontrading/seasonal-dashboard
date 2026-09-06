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

## Tier 2 — Profile-detail: asset-specific default view — ✅ Complete (v1.9)

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

**Effort:** contained, moderate. No pipeline changes, no new data.

**Implemented, then revised same-day after user feedback on scale.** The first pass (v1.9) did
exactly what "Implementation shape" below describes — an inline collapsible toggle reusing
`renderCrossAssetStats()`/`renderExampleCharts()`, which loop over a hardcoded `ASSETS` array.
Correctly flagged as not scaling: fine at 2 Profiling assets, but wrong shape once Phase B adds
more (and eventually Deriv synthetics/crypto, Tier 6). Revised same day (v1.9 amended) to:

- A **separate page**, `profiling-profiles/compare.html`, not an inline reveal — keeps
  `detail.html` light regardless of how many assets exist.
- A **picker capped at 10 assets**, not "show everything" — bounded rendering no matter how large
  the Profiling roster grows.
- The asset list is **read from `window.KPT_PROFILING_META`** (`data/profiling/manifest.js`), not
  a hardcoded array — a new Profiling asset appears in the picker automatically once its data is
  synced (`scripts/sync_profiling_data.js`), zero code change.
- New shared `KPTPData.loadAsset()` (`js/profiling-charts.js`) loads a given asset's data on
  demand via injected `<script>` tags — same pattern `js/profiling-calendar.js`'s year-file loader
  already used. Both `detail.html` and `compare.html` now use this instead of hardcoding a
  `<script>` tag per known asset; `detail.html` in particular no longer needs *any* asset data
  script tags at all (only loads what the current `?a=` asset needs, on demand) — one fewer place
  the "Adding a New Profiling Asset" checklist (`CONTRIBUTING.md`) needs updating per asset.
- Selection state round-trips through the `assets` URL param (`history.replaceState`), so a
  specific N-asset comparison is bookmarkable/shareable.

~~Implementation shape~~ (superseded — kept below for the historical record of what changed):
a rendering-mode branch in `js/profiling-profile-detail.js`, the same pattern already used in
`js/profiling-calendar.js` for its `isHome` asset-vs-home split. Not a new page or route —
`renderCrossAssetStats()`/`renderExampleCharts()` already loop over all `ASSETS`; the change is
which asset(s) render by default and adding the toggle/link.

Full record: `docs/CHANGELOG.md` v1.9 (original) and its same-day amendment.

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

- **Granularity selector: done (2026-09-05).** Underline-tab switcher (`.kptp-gran-switch`,
  visually matching the page's own primary tab bar) — Daily / Weekly / Monthly / Yearly — added to
  the Profiling tab after user feedback that scrolling through all four granularities stacked on
  one page took too long. Content that used to stack (Profile Taxonomy → Range Distribution →
  Extreme Timing, once per granularity) now lives in one panel per granularity, one visible at a
  time; the lookback-window dial stays a single global control (not duplicated per panel) and
  hides itself entirely on the Yearly tab, where it has no effect. See `js/profiling.js`'s
  `switchGranularity()`/`buildGranularitySwitch()`.
- The Seasonals tab's own accordion likely stays the primary *reading* surface for the yearly
  story even after this ships — the change is in what generates its underlying signal (rule-based
  statistics vs. chart-image interpretation), not necessarily its presentation.

### Sequencing

Paced by MT5 data availability, not a blocking phase — runs alongside Tier-6-adjacent asset
rollout (adding more Profiling assets as CSVs are cleaned). Daily is done. **Weekly is done and
dashboard-wired** (2026-09-05) — `KPT-Market-Profiling/pipeline/profile_taxonomy_weekly.py`,
validated across GBPUSD/EURUSD/XAUUSD, not just one asset; full methodology and findings in that
repo's `market-profiling-system-spec.md` §4.6 and `HANDOVER.md` §5, not duplicated here. Headline
result: the same trend-day timing signature Daily found was independently reproduced at weekly
granularity, plus a strong new cross-asset finding from a user-proposed idea (the *joint*
high-weekday/low-weekday pattern, not just the two existing marginal charts — same-day extremes
are suppressed 5-15x vs. independence). Generated and dashboard-wired for all 14 Profiling assets
— a "Weekly Profile Taxonomy" card grid, a "Week High/Low — Day Pairing" heatmap, and full
detail/compare-page support.

**Monthly is done and dashboard-wired** (2026-09-05, same pass this time — unlike Weekly, which
had its dashboard wiring as a separate follow-up) —
`KPT-Market-Profiling/pipeline/profile_taxonomy_monthly.py`, same validate-first process across
GBPUSD/EURUSD/XAUUSD; full methodology and findings in `market-profiling-system-spec.md` §4.7 and
`HANDOVER.md` §5. Same generalizing pattern as Weekly's, one level coarser (same-week-of-month
suppressed to 3.5-5.6% of months vs. independence); one deliberate deviation from Daily/Weekly's
"trailing ~1 real year" window convention — a 24-month rolling window instead of 12, since 12
monthly bars makes percentile ranking too coarse. Generated and dashboard-wired for all 14
Profiling assets — a "Monthly Profile Taxonomy" card grid, a "Month High/Low — Week Pairing"
heatmap, and full detail/compare-page support (now grouped Daily/Weekly/Monthly).

**Yearly is done and dashboard-wired** (2026-09-05, same day) —
`KPT-Market-Profiling/pipeline/profile_taxonomy_yearly.py`; full methodology and findings in
`market-profiling-system-spec.md` §4.8 and `HANDOVER.md` §5. This granularity needed the most
methodological care, per the sample-size table above (~20-34 years, "very thin") — validated
first, then presented the user an explicit fork before writing any permanent code: full 8-name
taxonomy (disclosed) vs. a simplified 3-bucket range-only scheme vs. no formal yearly taxonomy at
all. **User chose the full 8-name taxonomy for consistency with Daily/Weekly/Monthly**, disclosed
with a prominent small-sample note rather than silently equated with the denser granularities —
several profile buckets land at 0-2 years for a given asset (real, not a bug). Uses an expanding
window (percentile against all prior years), not a trailing one, matching `stats_engine.py`'s own
`yearly_range` precedent. The `month_pair_distribution` (12×12 joint table) was built at the
user's explicit request despite being genuinely sparse at this n (most of 144 cells are 0 or 1) —
shipped with raw counts instead of percentages and the same small-sample disclosure. Generated and
dashboard-wired for all 14 Profiling assets, including very-young ones (BTCUSD: only 2 classified
years) rendering an honest near-empty grid rather than crashing or hiding — a "Yearly Profile
Taxonomy" card grid, a "Year High/Low — Month Pairing" heatmap, and full detail/compare-page
support (now grouped Daily/Weekly/Monthly/Yearly).

**Tier 5's full Daily → Weekly → Monthly → Yearly ladder is now complete.**

---

## Tier 5b — Sub-session profiles (finer than Daily, not coarser)

**The sibling direction to Tier 5:** Tier 5 generalizes the daily taxonomy *coarser*
(Weekly/Monthly/Yearly). This tier generalizes it *finer* — sub-daily, session-relative patterns —
covering the three profile families noted in `KPT-Market-Profiling/market-profiling-system-spec.md`
§4.5: session-defined extreme profiles, news-release-timing profiles, and (added 2026-09-05)
liquidity-sweep / false-move profiles. Full design detail lives in that spec doc, not duplicated
here — this entry exists so the workstream has a tier of its own, same visibility as Tier 5.

**Status (2026-09-05):** infrastructure step one done — `clean_mt5_csv.py` computes each named
session's own OHLC per day (`asian_/london_/ny_open/high/low/close`). Step two done for both
branches noted so far, with **opposite outcomes**:

- **Liquidity-sweep / false-move profiles: parked, no real effect found.** The descriptive study
  (GBPUSD/EURUSD/XAUUSD, 4 candidate thresholds, both session-pairs) found no clean, non-noise,
  cross-asset effect — a `close_position`-based metric looked consistent but is very likely
  mechanical (the sweep event itself creates the day's new extreme, which mechanically pulls the
  close away from it); the cleaner point-to-point follow-through metric showed no consistent
  signal. Per the spec's own build-order rule, **not pushed to a formal profile** — parked rather
  than iterated on further. Full write-up: `KPT-Market-Profiling/market-profiling-system-spec.md`
  §4.5's 2026-09-05 update.
- **Session-overlap activity: real, replicated, shipped.** Mean intra-hour range across full
  history, all three test assets: both overlap windows (Asian/London ~07:00 UTC, London/New York
  12:00-16:00 UTC) show consistently elevated activity vs. their single-session neighbors, with
  London-NY the most active window of the day in every asset (XAUUSD: ~994 pips/hour vs. ~582-588
  in the surrounding hours — a ~70% jump). Not an event-conditioned comparison, so no
  tautological-artifact risk like the sweep study had. Shipped as an "Hourly Activity" chart on
  the Profiling tab's Daily view, backfilled for all 14 assets
  (`KPT-Market-Profiling/pipeline/session_activity.py` → `build_dashboard_data.py
  --hourly-activity` → `bundle.hourly_activity`).

- **Session-defined extreme profiles: shipped (2026-09-06), as a joint table not a collapsed
  bucket scheme.** Validated the joint (low-session × high-session) distribution first — same-
  session diagonal genuinely rare (4.8-8.9%) once correctly excluding `is_daily_only`-era days (a
  real bug found in the process, see below). Kept the full natural 6×6 category set rather than
  the spec's originally-proposed simplified 3-session bucket naming, since London-NY overlap is
  the single most common session for both the high and the low in every asset checked — collapsing
  it away would lose real information. Shipped as a "Day High/Low — Session Pairing" heatmap on
  the Profiling tab's Daily view, backfilled for all 14 assets
  (`KPT-Market-Profiling/pipeline/stats_engine.py`'s `session_pair_distribution()` →
  `bundle.stats.daily_session_pair_distribution`).
- **Bug found and fixed (2026-09-06):** `stats_engine.py`'s Full History Time-of-Extreme stats
  didn't exclude `is_daily_only`-era days — inflated XAUUSD's Full History daily-high
  `concentration_R` to a false 0.672 (every legitimate finding elsewhere tops out ~0.25-0.30).
  Fixed narrowly (11 of 14 assets affected, only the Full History window). Full write-up:
  `KPT-Market-Profiling/HANDOVER.md` §5.

Still open, not designed or built ahead of need: news-release-timing profiles, Frankfurt as a
distinct session boundary. The 21:00-23:00 UTC session gap the infrastructure step surfaced
remains deliberately left open (a same-day attempt to widen the Asian session to close it was
reverted — see `KPT-Market-Profiling/HANDOVER.md` §5 for why).

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

### Analysis tab: chat interface (noted 2026-09-05, not designed in detail)

The Analysis tab (`js/api.js`) is currently one-shot, not conversational: `runAnalysis()` gathers
four context layers per click (`_gatherCurveCtx()` — seasonal, `_gatherBacktestCtx()`,
`_gatherIntradayCtx()`, `_gatherProfilingCtx()`), builds a single big prompt via `_buildPrompt()`
(a fixed markdown template — signal/accuracy/curve/entry-window table, 3-month outlook, trade
notes), and sends it as a single `messages: [{role:'user', content: prompt}]` call to whichever
provider the user has configured (Claude/Gemini/Ollama — bring-your-own API key, called directly
from the browser, no backend). Streams one response, renders it, done — no conversation state.

**Near-term (the actual current ask):** keep it exactly this shape — a single button that exports
a neat technical summary of the dashboard's most critical information in one shot. This is already
close to what `_buildPrompt()` produces; revisit its exact template/content once the other tiers
above (especially Tier 5's weekly/monthly/yearly profiles, and any session/news/liquidity-sweep
profiles — see `KPT-Market-Profiling/market-profiling-system-spec.md` §4.5 and its liquidity-sweep
addendum) have more data to fold in.

**Later, if/when chat is worth building:** the lowest-overhead path is to keep the identical
architecture (BYO API key, direct browser `fetch()`, no new backend) and add only what's missing
for a real back-and-forth:
- An accumulating `messages[]` array instead of rebuilding one fresh prompt per click, persisted
  per-asset (matching the existing `kpt-ai-{id}-*` localStorage convention already in
  `docs/DATA_DICTIONARY.md`'s localStorage table) so a conversation survives a page reload.
- Move the four gathered context layers into the API's `system` parameter, sent once per
  conversation, rather than re-stated inside a `user` message on every call as today — cheaper
  per-turn and closer to how the Messages API is meant to be used for multi-turn context.
- Small UI change: a scrollable message thread + text input instead of one button + one replaced
  output block, plus a "new conversation" reset. Same panel, same streaming/markdown-render
  plumbing already built (`_readSSE()`, `marked.parse()`) — no new dependency.
- No architectural leap required — Anthropic's Messages API (and the other two providers already
  wired) are standard multi-turn conversation APIs already; today's implementation just happens to
  only ever send one turn.

---

## Summary — execution order

1. **Tier 1** — ✅ done (v1.8).
2. **Tier 2** — ✅ done (v1.9).
3. **Tier 3 + Tier 4 together** — mobile pass done as part of the tab restructure, not before it.
4. **Tier 5** — ✅ done (2026-09-05). Daily, **Weekly** (a "Weekly Profile Taxonomy" card grid and
   a "Week High/Low — Day Pairing" heatmap), **Monthly** (a "Monthly Profile Taxonomy" card grid
   and a "Month High/Low — Week Pairing" heatmap), and **Yearly** (a "Yearly Profile Taxonomy"
   card grid, disclosed small-sample, and a "Year High/Low — Month Pairing" heatmap) are all done
   and dashboard-wired for all 14 Profiling assets, full detail/compare-page support grouped
   Daily/Weekly/Monthly/Yearly. The full Daily → Weekly → Monthly → Yearly ladder is complete.
5. **Tier 5b** — ongoing. Liquidity-sweep branch: descriptive study done, **parked** (no real
   cross-asset effect found). Session-overlap activity branch: ✅ done, an "Hourly Activity" chart
   shipped on the Profiling tab's Daily view. Still open: session-defined extreme profiles,
   news-release-timing profiles, Frankfurt as a distinct session.
6. **Tier 6** — parked, no action until explicitly raised again.
