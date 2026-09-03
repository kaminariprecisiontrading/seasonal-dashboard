# Kaminari Market Profiling & Statistics Dashboard — Project Spec
### v1.0 draft — agreed scope, architecture, and phased roadmap

---

## 1. Purpose

A statistical decision-support system, built on the same static-dashboard pattern as the
[Kaminari Seasonals Dashboard](https://kpt-seasonals.netlify.app/), that answers three questions
from historical OHLC data:

1. **When** does a given asset's daily/weekly/monthly high and low statistically tend to form?
2. **How big** is the typical daily/weekly/monthly range, and how does today/this week compare to history?
3. **What "shape"** is the current day/week most likely following, based on a rule-based taxonomy of
   recurring, self-defined market profiles?

The system is a **probability/confidence tool**, not a certainty machine. Every output should be framed
as "highest statistically probable window/level," never as a guaranteed outcome. This framing applies to
UI copy, documentation, and any trading logic built on top of it.

Initial asset scope: **GBPUSD (GU) and EURUSD (EU)**. Architecture must generalize to JPY pairs,
crypto, and stocks later without a rebuild (see §8).

---

## 2. Data Pipeline

### 2.1 Source
MT5 exports from TradersWay. Exact column layout to be confirmed against the first real sample CSV —
do not assume a fixed schema until then.

### 2.2 Timezone normalization (critical — done once, correctly, at ingest)
- TradersWay/MT5 server time is **GMT+3**, and shifts in line with **US (New York) daylight saving
  transitions** — not UK/EU DST dates. This means the broker's GMT offset relative to UK time is not
  constant year-round (it steps between roughly GMT+2 and GMT+3-equivalent depending on which side of
  the US DST boundary you're on, since UK and US DST changeover dates don't align).
- **All timestamps are converted to UTC on ingest** and stored in UTC as the canonical value.
- Session labels (Asian / London / New York / overlaps) are **derived columns**, computed from the UTC
  timestamp against the correct current session boundaries for that calendar date — not hardcoded
  offsets — so the DST step is handled once, centrally, in the pipeline.
- "Trading day" boundary: to be finalized once we see real data, but default assumption is a
  **midnight UTC open**, consistent with the common institutional/ICT convention, unless testing shows
  broker-day (terminal) boundaries produce meaningfully different — and more useful — results.

### 2.3 Cleaned output columns (v1)
| Column | Notes |
|---|---|
| `date` | Trading day (UTC-anchored) |
| `open`, `high`, `low`, `close` | Raw prices |
| `daily_range_pips` | `(high - low)` converted to pips, asset-aware (see §2.5) |
| `open_time`, `high_time`, `low_time`, `close_time` | UTC, plus derived session tag |
| `is_week_high`, `is_week_low` | Boolean, **retrospective** — true only once the week has closed |
| `is_month_high`, `is_month_low` | Boolean, retrospective |
| `is_year_high`, `is_year_low` | Boolean, retrospective |
| `week_high_so_far`, `week_low_so_far` | Running/live version for use during an in-progress week |
| `month_high_so_far`, `month_low_so_far` | Running/live version |

Retrospective flags and "so-far" running values are kept as **separate columns** — they serve different
purposes (backtesting/labeling vs. live dashboard state) and conflating them was identified as a
likely source of subtle bugs.

### 2.4 News/event annotation layer
- A separate, manually-curated table (`event_date`, `event_time_utc`, `category`, `description`,
  `source_url`), kept deliberately simple to fill in.
- Not auto-scraped. ForexFactory and Investing.com calendars are the natural reference sources for
  scheduled macro events, but their terms of use generally don't permit direct scraping — proper
  calendar APIs/feeds will be evaluated when this phase starts (§8).
- For unscheduled/geopolitical shocks (wars, disruptive-tech news, etc.), this stays a manual entry —
  no reliable automated classifier exists for "this headline moved this candle."
- Out of scope for v1 pipeline build; the schema is defined now so the column exists to join against later.

### 2.5 Asset-aware pip calculation
- v1: standard 4/5-decimal FX pairs (GU, EU) — `1 pip = 0.0001`.
- Architecture note: pip/point size, and eventually "typical unit of measure" (pips vs. points vs. %),
  should be a **per-asset config value**, not hardcoded — so adding JPY pairs (`0.01`), crypto, or
  stocks later is a config-table entry, not a code change.

---

## 3. Statistical Methodology

### 3.1 Time-of-extreme statistics
Clock time is circular (wraps at midnight), so naive mean/median produce nonsense when extremes
cluster across the midnight boundary. Approach:
- **Mode first** — bucket high/low times into fixed intervals (e.g., 15/30-min bins) and report the
  modal bucket per session. This is the most intuitive measure and maps directly to a histogram/heatmap.
- **Circular mean and circular median** (treating time-of-day as an angle on a 24h circle) as
  supplementary measures, alongside a **concentration measure** (circular variance / von Mises
  concentration parameter) so the dashboard can show not just *when* the high/low tends to form, but
  *how reliable* that clustering actually is. A tight, high-confidence cluster and a wide, noisy spread
  should look visibly different on the dashboard, not be flattened into a single number.

### 3.2 Range statistics (daily / weekly / monthly)
- Computed at **multiple lookback windows simultaneously** (e.g., full history, 5y, 1y, 3mo) rather
  than a single fixed period, exposed as a **visible dial/selector on the dashboard** — this was
  flagged as necessary to avoid silently mixing outdated regimes with current conditions, and confirmed
  as a required feature rather than a nice-to-have.
- Both **fixed-multiple** (e.g., "1.3x trailing ADR") and **percentile-based** (e.g., "top 20th
  percentile of trailing-N-day ranges") threshold methods computed side by side, so thresholds can be
  empirically tuned per asset rather than borrowed from generic retail-education defaults. Percentile-based
  is the preferred default given it self-calibrates; fixed-multiple is kept as a comparison/sanity-check.
- ADR/ATR-style window lengths (5, 14, 20-day, etc.) are configurable, not hardcoded — the "right"
  window is a bias-variance tradeoff (shorter = more reactive but noisier; longer = smoother but
  slower to reflect real regime change), not a fixed truth, and should be tunable per how the data
  actually looks for GU/EU once we have it.
- **Yearly range is computed too, but deliberately not windowed** the way daily/weekly/monthly are —
  with only ~20 years of history, a "1Y"/"3mo" slice of yearly bars would be 0–1 samples and
  meaningless. Yearly stats always reflect full history, and the dashboard shows the small sample
  size explicitly rather than hiding it behind a dial that would otherwise imply the same rigor as
  the daily/weekly/monthly sections.
- **Mode is reported two ways, both computed in `stats_engine.py`'s `range_distribution()`:**
  - **Binned mode** — the most frequent range *bucket* (20 bins spanning p05–p95). This is the
    statistically meaningful version for continuous pip data, where at daily granularity almost
    every exact value occurs once or twice across ~5,000 days.
  - **Raw mode** — the single exact value that repeated most often, kept alongside the binned mode
    for direct comparison since a literal "most common value" was explicitly requested. Flagged in
    the UI as a weak signal (its sample count is always shown), and treated as not meaningful at all
    when every value in a window is unique (e.g. yearly range, where 20 samples are essentially
    guaranteed to be 20 distinct numbers) — shown as "none" rather than an arbitrary tie-break.

### 3.3 Framing discipline
Every statistical output surfaced to the UI is a **probability-weighted window or level**, with its
supporting sample size and concentration/confidence measure shown alongside it — never a bare number
presented as a guaranteed target.

---

## 4. Regime / Profile Taxonomy

- **Rule-based first.** Explicit, human-readable, auditable rules (e.g., range percentile + directional
  persistence + time-of-extreme location) define each profile. This mirrors the "reason before coding"
  approach already used for indicator development.
- **Own naming convention**, not ICT terminology.
- Applied **retrospectively** to build a labeled historical dataset (for backtesting "how often did
  profile X actually play out"), and **live** to the current, in-progress day/week (showing which
  profile(s) are still consistent with price action so far, and which have been invalidated).
- **ML/clustering (e.g., k-means, HMM on range/directionality/time-of-extreme features) is a Phase 2+
  validation step** — used to check whether the rule-based labels agree with what an unsupervised
  method finds, not as the initial engine.

**v1 daily taxonomy implemented and validated in `pipeline/profile_taxonomy.py`** — the final shapes
below were derived from real GBPUSD/EURUSD distributions, not assumed upfront. §4.1–§4.4 document the
definitions, so this stays the single source of truth for what each label means and why it exists.

### 4.1 Two independent axes

Direct analysis of both assets' full 2000–2019 daily history showed that **range size and directional
closing behavior are genuinely independent** — compression (small-range) days show the *full spread* of
closing shapes (median closing-strength ≈ 0.41, quartiles 0.20–0.64), not a cluster near "balanced" as
might be assumed. So the taxonomy is built from two separate axes rather than one blended score:

- **Range regime** — `Compression` / `Normal` / `Expansion`. From a **trailing rolling percentile rank**
  of `daily_range_pips` (252-trading-day window ≈ 1y, minimum 60 days of history before a day is
  eligible for a label), thresholds at the 20th/80th percentile — the same percentile-based,
  self-calibrating philosophy as §3.2. A *trailing* window (not a single static full-history number) is
  used deliberately: each day is judged only against data available up to that day, which avoids
  look-ahead bias and keeps the classification regime-aware rather than blended across two decades of
  changing volatility.
- **Closing shape** — `Balanced` / `Mixed` / `Directional`. From the same trailing-rolling-percentile
  method applied to **closing strength**, `cs = 2 × |close_position − 0.5|`, where
  `close_position = (close − low) / (high − low)`. `cs = 0` means the day closed exactly at its own
  range midpoint (it gave the move back); `cs = 1` means it closed right at one edge (it held the move).
  Thresholds at the 25th/75th percentile.

### 4.2 What each profile name means, and why it's named that way

| Profile | Rule | Why this name |
|---|---|---|
| **Trend Day (Up / Down)** | Expansion + Directional | Big range **and** closed near an extreme — the move was both large and held. Matches the everyday trading sense of "trended persistently and didn't give it back." |
| **Volatile Day** | Expansion + Mixed | Big range but closed only moderately off the midpoint — real two-way movement without a clean directional resolution. "Volatile," not "Trend," because size dominates the story, not direction. |
| **Volatile Reversal Day** | Expansion + Balanced | Big range but closed essentially back at the midpoint — a big move that got substantially or fully retraced. "Reversal" captures the round-trip; split out from Volatile Day because the give-back, not just the size, is now the dominant fact about the day. |
| **Quiet Drift Day (Up / Down)** | Compression + Directional | Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. "Drift" is the low-energy version of "Trend"; kept as a separate name (not folded into Trend Day) because the *amount* of conviction differs even though the *shape* (closed at an edge) is the same. |
| **Compression Day** | Compression + Balanced/Mixed | Small range, closed near the middle — the "coiling," non-committal day. Default label for small-range days without a clear directional tilt. |
| **Normal Day** | Normal range regime (20th–80th percentile), any shape | Deliberately the largest, least differentiated bucket (~57% of days on both assets). Most days are neither unusually big nor unusually small, so they don't earn a directional-shape label — see the naming principle in §4.4 about not over-labeling the majority case. |
| **Insufficient_History** | First ~59 trading days of any asset's dataset | The trailing 252-day window hasn't filled yet, so the percentile rank can't self-calibrate — no label is assigned rather than one derived from a tiny, misleading sample. |
| **Data_Gap** | Inherited from `is_data_gap` (§2.3 / Phase 1) | Feed-outage / dummy-tick days are excluded from classification entirely, same as they're excluded from period-high/low determination. |

### 4.3 Secondary tag: extreme timing

Independently of the primary profile name, every day also gets an `extreme_timing` tag describing
*when* its high and low formed relative to each other, using `close_side_frac` / `far_side_frac` — the
fraction of the trading day elapsed when the extreme **nearer** the close, and the extreme **farther**
from the close, were each set:

- **Late_Push** — the extreme the day closed *away* from formed early; the extreme it closed *near*
  formed late. Price pushed to new extremes right into the close. This is the validated "textbook trend
  day" signature: on Expansion+Directional days, median far-side fraction ≈ 30% into the day, median
  close-side fraction ≈ 90%, confirmed independently on both GBPUSD and EURUSD.
- **Early_Resolution** — both extremes formed in the first half of the day; the second half was
  comparatively quiet.
- **Late_Resolution** — both extremes formed in the second half; the day stayed undecided well into the
  session.
- **Fade_Risk** — the extreme the day closed near formed *early*, but price then pushed to a new extreme
  on the other side *later* without breaking through to a new close-side extreme — a day that held its
  early move but had a late scare.

This tag is most informative layered on top of Trend Day / Quiet Drift Day (where "did the move hold or
fade" is the key question), but is computed and reported for every labeled day.

### 4.4 Logic for naming future profiles

Any profile added later (weekly/monthly taxonomy, a third axis, etc.) should follow the same rules used
above, so the taxonomy stays self-consistent and auditable rather than growing ad hoc:

1. **A name describes a finished shape, not a prediction.** Names are hindsight descriptions of what a
   day/week turned out to look like — never phrased as a forward-looking call ("Breakout Day" implies a
   prediction; "Trend Day" just describes what happened).
2. **Every name maps to an explicit, numeric rule stated in this document.** If the threshold can't be
   written down, it isn't a profile yet — no name without a rule.
3. **A new axis must be justified empirically before it's added** — run the same kind of
   distribution/cross-tab analysis used to confirm range-regime and closing-shape were independent
   (§4.1) before combining a new feature into the taxonomy. Don't add an axis just because it sounds
   plausible.
4. **Reserve descriptive names for statistically distinguishable, minority-share buckets.** The
   majority/default case stays a plain, low-information label (like "Normal Day") — a rule that fires on
   most days isn't adding decision value and shouldn't get an evocative name.
5. **No ICT or third-party terminology** — names should describe the shape in plain language a
   discretionary trader recognizes without needing outside jargon (per the original naming decision).
6. **Directional variants are a name suffix, not a separate profile family**, when a profile's Up/Down
   versions are true mirror images (as with Trend Day and Quiet Drift Day) — this avoids doubling the
   taxonomy size for no added distinction.

---

## 5. Dashboard

- **Static-site architecture**, following the existing Seasonals Dashboard pattern (data-as-a-JS-file,
  no build step, no framework, no external charting library — hand-rolled vanilla-JS SVG) — no live
  backend/database in v1, per the stated preference for free, low-maintenance tooling over an
  ambitious build. Shares the Seasonals Dashboard's CSS design tokens/fonts for brand consistency.
- Core views (v1, implemented in `dashboard/`):
  - Time-of-extreme histogram/heatmap, session-colored, with the mode called out and a
    confidence/concentration indicator.
  - Range-distribution chart (daily/weekly/monthly/yearly — see §3.2 on why yearly isn't windowed)
    with both **binned mode and raw mode** shown alongside the percentile/IQR view.
  - Lookback-window dial (§3.2) affecting the daily/weekly/monthly charts.
  - Profile-classification panel: full-history distribution, average range, and dominant
    extreme-timing tag per profile. *Not yet built:* a live "today's best-match profile" view — this
    needs a live/current data feed and is explicitly deferred to Phase 4 (§9), so v1 is a historical-
    statistics browser, not a live one.
- **Screenshot-in-chart analysis is a later, secondary feature** (§8) — a qualitative sanity-check
  layer for quick reads or less-technical use, explicitly **not** the source of truth. CSV-derived data
  always takes priority.

### 5.0a Plain-language layer (jargon vs. rigor)

Early user feedback: the raw statistical framing (percentiles, concentration/R, IQR, circular mean,
etc.) is exactly right for a professional reading the numbers directly, but opaque to a trader who
just wants a quick, correct read each morning. Resolved as an additive layer, not a rewrite:

- **Every jargon term gets a small "?" info icon** (`.glossary-icon` in `dashboard/css/dashboard.css`,
  content sourced from a single `KPT_GLOSSARY` dictionary in `dashboard/js/glossary.js`) that shows a
  plain-English, one-line explanation on hover/tap. The underlying numbers, sample sizes, and
  confidence measures are never removed or dumbed down — see §3.3 Framing discipline, which this
  layer exists to make *accessible* rather than override.
- **Every chart element is hoverable** (range-strip regions, time-of-extreme bars, weekday/week-of-
  month/month-of-year bars) via a single shared tooltip component (`dashboard/js/tooltip.js`), so a
  trader can point at any bar and get its exact value/date-range/context rather than having to
  decode an axis. This was chosen over placing a small icon under every bar (e.g. 48 icons under a
  time-of-extreme strip) — that many static icons would be visual noise; hover is the standard,
  clean solution for "let me drill into one specific element."
- Applies to any future addition too: new jargon gets a glossary entry before it ships, new chart
  elements get a tooltip before they ship. This is a standing rule, not a one-time pass.

### 5.0b Future: merge with the Kaminari Seasonals Dashboard

Not planned for v1, but flagged now while it's cheap to keep the door open. Intended relationship:
the Seasonals Dashboard gives the **top-level, macro/monthly-bias view**; this Market Profiling
dashboard gives the **zoomed-in, daily/weekly/timing view** — a trader would land on a Seasonals
asset page for the month's structural bias, then drill into this dashboard for "ok, but when in the
day/week does it actually tend to move, and how big." Kept compatible on purpose:

- Both are static/no-build-step/vanilla JS, both use the same data-as-a-JS-file loading pattern
  (`data/<asset>.js` → `const <ASSET>_DATA = {...}`), and this dashboard reuses the Seasonals
  Dashboard's CSS design tokens/fonts outright.
- Any future navigation, URL structure, or data-format decision here should keep this relationship in
  mind so a later merge is a consolidation (shared nav, shared asset picker, cross-links between the
  two views) rather than a rewrite of either side.

### 5.1 OHLC chart viewer (added after initial dashboard scoping)
When viewing a specific day (e.g., drilling into a day flagged as a particular profile, or a historical
day surfaced by the stats), the dashboard should let the user view that day's actual price action as a
**candlestick or line chart**, not just the summary stats — seeing the shape of the day is often what
confirms or contradicts a profile classification at a glance.

Architecture implication this creates, noted here so it's designed for rather than retrofitted:
- The daily-aggregate CSV (§2.3) only holds one OHLC bar *per day* — it has no intraday shape to plot.
  Charting a single day requires the **intraday bars for that specific day**, sourced from the original
  M1 export.
- Shipping the full M1 history to a static site is impractical (the 2000–2019 GBPUSD M1 file alone is
  ~7.1M rows / ~435MB). The pipeline should instead generate **small, per-day chart-ready files**
  (e.g., one lightweight JSON per trading day, M1 resampled to a coarser granularity such as M5/M15 for
  display) as an additional Phase-1-pipeline output, loaded by the dashboard on demand only for the
  day(s) being viewed — not bundled into the main stats payload.
- This is a natural extension of the existing cleaning pipeline (`clean_mt5_csv.py` already parses and
  UTC-normalizes the M1 data before aggregating it away) rather than a separate system.

### 5.2 Calendar feature (planned, not yet built)

Pick a specific date and see that day's (and its containing week's/month's) stats for one asset, plus
a cross-asset "all assets on this day" view from the homepage. Two architecture decisions to make
before building, flagged here so the "start simple" build doesn't paint into a corner:

- **Data shape.** The current dashboard embeds one small summary JSON per asset (~56KB). A calendar
  needs per-day lookups across all ~5,185 days per asset — too much to embed in one file upfront
  without a heavy initial page load. Plan: chunk by year (one small JS file per asset per year),
  dynamically injected via a `<script>` tag only when the user navigates to that year — stays on the
  same "no server, no fetch()" file-based pattern (fetch()/XHR is CORS-blocked on `file://`; a plain
  `<script src>` tag isn't).
- **Week/month context for a selected day.** `stats_engine.py` currently only *aggregates* the
  weekly/monthly tables in memory (§ Weekly / monthly aggregation) — it doesn't persist them with
  dates. Needs its own output artifact (the actual weekly/monthly table, dated) so "click a date → see
  its week and month too" has something to look up.

### 5.3 Profile detail pages (implemented — `dashboard/profiles/detail.html`)

Goal per the original feature request: a trader should be able to look at a real price chart later and
recognize "that's a Trend Day" — both a descriptive and a visual understanding of each profile, so the
taxonomy becomes intuitive rather than just a label.

- **Descriptive part** reuses §4.2 directly — `dashboard/js/profile-meta.js`'s `KPT_PROFILE_META` holds
  the rule/why/timing-signature copy for each profile, kept in sync with this document by hand (no
  auto-generation — if one changes, update the other).
- **Stylized icon per profile** — a small hand-drawn SVG sparkline shape (`KPT_PROFILE_ICON_PATH` in
  the same file), shown on both the asset dashboard's profile cards and the detail page header. No real
  data dependency — purely a visual mnemonic, distinct from the real chart below.
- **Illustrative real example chart** — one real historical day per asset, shown as an actual M15
  candlestick chart. Exemplar-selection method (`pipeline/export_profile_examples.py`): for each
  profile, pick the real day within that profile whose `daily_range_pips` is **closest to the
  profile's own average** (from `profile_summary.json`) — a *typical* day, not a cherry-picked
  extreme. Validated by inspection: the chosen Trend Day (Up) example for both assets visibly shows
  the exact "low forms early, grinds to new highs into the close" signature described in §4.3's
  `Late_Push` timing tag — the method produces genuinely representative examples, not odd edge cases.
  Scoped down from the full OHLC viewer (§5.1) to just the ~8×2 exemplar days needed here, reusing
  `clean_mt5_csv.py`'s `load_raw()`/`to_utc()` for the UTC conversion and trading-day boundary so that
  logic stays in exactly one place. Output: `dashboard/data/profile-examples/<asset>.js`.
- **One-page template, not 8 static files** — `dashboard/profiles/detail.html` reads which profile to
  show from a `?p=<slug>` query param (via `dashboard/js/profile-detail.js`) rather than being
  duplicated 8 times, so the page structure/styling only needs to be maintained in one place. A pill
  nav of all 8 profiles at the bottom of every detail page gives cross-navigation without needing a
  separate hub/index page.
- **A real gotcha hit and fixed during this build, worth remembering for any future page that loads
  several `data/*.js` bundles at once:** a top-level `const X = ...` in a classic `<script>` tag
  creates a global *lexical* binding (visible to other script tags in the same document as the bare
  identifier `X`), **not** a property on `window` — so `window.GBPUSD_DATA` is `undefined` even right
  after `data/gbpusd.js` has loaded. The asset dashboard pages avoid this by explicitly doing
  `window.ASSET_DATA = GBPUSD_DATA;` inline; `profile-detail.js` (which needs both assets' data at
  once, so can't use that single-variable pattern) instead references the bare identifiers directly.

---

## 6. Accuracy Tracking / Feedback Loop

- Each day's/week's predicted profile + predicted high/low window is logged before the outcome is known.
- End-of-day (or end-of-week) CSV update is compared against the logged prediction to score accuracy.
- Over time this becomes the evidence base for refining rule thresholds — and eventually for deciding
  whether specific rules are actually adding predictive value or just noise.

---

## 7. Future: Migration to a Live Database

Not needed for v1 — flagged here so the decision is easy to make later without re-architecting from
scratch.

**Trigger conditions to consider migrating:**
- Static rebuild-per-CSV-upload becomes too slow or manual as history grows.
- A need for true real-time (intraday, streaming) updates rather than end-of-day/end-of-week CSV batches.
- Multi-asset scaling makes a flat-file/static-site data layer unwieldy.
- Wanting the prediction-logging/accuracy-tracking loop (§6) to run automatically instead of manually.

**Migration path (when the time comes):**
1. Keep the cleaned-CSV schema (§2.3) as the canonical data contract — this means the ingest/cleaning
   logic barely changes; only the *storage* layer changes.
2. Move to a free-tier managed database (e.g., Supabase/Postgres or similar) that keeps hosting costs
   at zero or near-zero for this scale of data.
3. Rebuild the static dashboard's data-fetch layer to query the database instead of reading pre-built
   JSON/CSV bundles — the frontend/visualization layer itself needs minimal changes if the data
   contract (column names/types) stays stable.
4. Add a lightweight ingest job (scheduled function or manual-trigger script) that replaces "re-run the
   static build after CSV upload" with "upload CSV → auto-parse → auto-insert."
5. This is the point where live/automated prediction-logging (§6) and, later, a live economic-calendar
   feed (§2.4) become practical to fully automate.

This is explicitly deferred — v1 optimizes for **free, easy-to-build-and-maintain, low time
investment**, not for scalability headroom that isn't needed yet.

---

## 8. Multi-Asset & Future Feature Roadmap (not built in v1)

- **Asset expansion:** JPY pairs, crypto, stocks — enabled by the per-asset pip/unit config (§2.5),
  built when the first non-GU/EU CSV is provided.
- **Economic calendar integration:** evaluate free/paid calendar APIs (not scraping ForexFactory/
  Investing.com directly) once this phase is prioritized.
- **News/geopolitical annotation layer:** manual, curated, kept simple — reliable sourcing
  recommendations to be provided when this phase starts.
- **Screenshot-based chart analysis:** secondary/qualitative feature for quick reads; never
  authoritative over CSV-derived stats.
- **ML-assisted regime clustering:** validation layer against the rule-based taxonomy (§4).

---

## 9. Phased Build Order

1. CSV cleaning pipeline + timezone/UTC normalization + core stats engine (time-of-extreme, range
   distributions, multi-window comparisons).
2. Rule-based regime/profile taxonomy + retrospective labeling of historical GU/EU data.
3. Static dashboard visualizing the above (Seasonals-Dashboard pattern).
4. Live "current day/week" comparison against the model.
5. Prediction logging + accuracy tracking (§6).
6. Later: screenshot analysis, news-event correlation, multi-asset expansion, ML validation layer,
   live-database migration if/when triggered (§7).

---

## 10. Open Items

- **Sample MT5 CSV export** from TradersWay needed to finalize the exact source-column mapping (§2.1)
  and confirm the trading-day boundary convention (§2.2).
- Final profile taxonomy names/definitions to be derived from real data in Phase 2, not fixed in advance.
- ADR/percentile threshold values to be empirically tuned per asset once real GU/EU history is loaded,
  per the bias-variance discussion in §3.2.
