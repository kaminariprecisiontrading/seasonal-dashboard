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
MT5 exports from **TradersWay only**. Assets covered: GBPUSD, EURUSD, AUDUSD, NZDUSD, USDCAD,
USDCHF, USDJPY — one continuous full-history raw file per asset (`data/raw/<ASSET>_M1_full.csv`),
back to 1993 for most majors (NZDUSD/USDCHF only have M1 history from 2001). A prior session
mixed in a batch of raw exports from a different broker (IC Markets) by accident; that data was
discarded and every asset re-downloaded from TradersWay exclusively — see HANDOVER.md §5. Always
confirm which broker/account a raw export actually came from before feeding it into the pipeline;
the file format itself gives no indication.

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
| `n_bars` | Raw M1 bar count aggregated into this day — the basis for the two flags below |
| `is_data_gap` | Boolean — `n_bars` at/below threshold *and* within the M1-coverage era (real feed outage/artifact). Range set to NaN, excluded from everything. |
| `is_daily_only` | Boolean — `n_bars` at/below threshold but *before* the broker's M1 feed began (a genuine single EOD bar, not an artifact). Range/OHLC trusted and included everywhere that doesn't need intraday granularity (period highs/lows, range-distribution stats); excluded only where real intrabar timing is required (`extreme_timing` tag, candlestick chart exemplars). Auto-detected per asset, not a hardcoded date — see HANDOVER.md §5. |
| `asian_open/high/low/close`, `london_open/high/low/close`, `ny_open/high/low/close` | Each named session's *own* OHLC for that trading day — added for the liquidity-sweep profile family (§4.5.3). Uses each session's full native hour window (Asian 23:00–08:00 UTC, London 07:00–16:00 UTC, NY 12:00–21:00 UTC — same boundaries as `session_tag()`), including hours shared with an adjacent session, so a session's own high/low isn't understated by excluding its overlap hours. Deliberately **not** the same thing as grouping by `session_tag()`'s mutually-exclusive labels (Asian/London/New_York/two overlaps/**Other**) — that labeling answers "which single bucket did this specific extreme's timestamp fall into," this answers "what was session X's own true range." NaN when a day has no bars in that window (a data-gap day, or an `is_daily_only`-era day whose single bar falls outside it). **Known, deliberate gap — not fixed:** Asian + London + NY plus their overlaps leave 21:00–23:00 UTC covered by no named session (`session_tag()` returns `"Other"`; all three session-OHLC columns are NaN for a day whose only bars fall there). A same-day attempt to close this by widening Asian's start to 21:00 UTC was built, tested, and then **reverted** (2026-09-05) — that window sits right at this pipeline's own trading-day boundary (NY 5pm, landing at 21:00 or 22:00 UTC depending on DST), so a widened Asian session doesn't cleanly represent "the fresh start of a new trading day"; part of it can still conceptually belong to the tail of the *previous* trading day depending on the time of year. Decision: leave the gap unaccounted for by default, and handle it on a per-use-case basis if a specific future need genuinely requires that window's data, rather than redefining the session boundary globally now. `session_tag()` and `add_session_ohlc()` do still derive from the same three shared boundary functions (`_in_asian`/`_in_london`/`_in_ny` in `clean_mt5_csv.py`) so they can't drift apart from each other, even though the boundary values themselves reverted. |

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
- Implemented as a per-asset config value, not hardcoded (`PIP_REGISTRY` in
  `pipeline/refresh_asset.py`, mirrored as a fallback default in `clean_mt5_csv.py`):
  `0.0001` for GBPUSD, EURUSD, AUDUSD, NZDUSD, USDCAD, USDCHF; `0.01` for USDJPY (JPY pairs use
  2 decimal places, not 4). Adding crypto, stocks, or another JPY-style pair later is a
  registry entry, not a code change — confirmed by this asset roster expanding from 2 to 7
  assets without touching the pip-calculation logic itself.

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

### 4.5 Future profile families (ideas, not yet built)

Two more taxonomy axes the user wants developed at the appropriate time — noted now so they aren't
lost, not designed in detail yet. Both must go through the same empirical-validation-first process as
§4.4 before becoming real profiles (distribution/cross-tab analysis first, exact thresholds derived
from real data, not assumed from the description below).

**Session-defined extreme profiles.** Classify a day by *which FX session(s) contained its high and
low* — candidate buckets, in session order (Asian → London → New York): **Asian-only**,
**Asian-London**, **Asian-New York**, **London-only**, **London-New York**, **New York-only** (a day
whose high and low both fall within one session, or whose extremes span two adjacent/overlapping
sessions). "Non-outliers" per the user's note — i.e. this is meant to describe the ordinary case, so
extreme/outlier days (the largest historic ranges — Brexit, GFC days, etc.) should likely be excluded
or handled separately rather than distorting the buckets. Exact rule (e.g. does "spans two sessions"
mean the high is in one and the low in the other, specifically, or something looser) needs to be
nailed down empirically when this is built — the six-bucket list above is the starting shape, not a
locked definition. The cleaned daily CSV already has `high_time_session`/`low_time_session` per day
(§2.3), so the raw inputs for this already exist; no new pipeline data is needed to prototype it.

**News-release-timing profiles.** Profiles tied to *when scheduled macro events are typically
released* — e.g. an **NFP profile** (first Friday of the month, 8:30am NY time) and a more generic
"8:30 NY news embargo" profile (any scheduled high-impact release at that standard slot), with a
short, plain name that still captures the essence. This is explicitly **dependent on the news/event
annotation layer (§2.4)**, which is manual/curated and deliberately out of scope for the v1 pipeline —
this profile family can't be built (beyond the recurring, calendar-computable case of NFP, which
doesn't need the manual layer since "first Friday of the month" is derivable directly from the date)
until that layer has real data to join against for the general case. Naming judgment call: standard
macro-calendar shorthand like "NFP" is common financial vocabulary, not proprietary trading-education
jargon (like ICT terms) — the naming rule in §4.4.5 is about avoiding a specific school-of-trading's
invented terminology, not about avoiding all abbreviations a trader would already recognize.

**Liquidity-sweep / false-move profiles (added 2026-09-05).** A finer-grained, cross-session
sibling to the session-defined family above: not "which session contained the day's extreme" but
"did an *earlier* session's own high/low get pierced by a small margin during a *later* session,
then reject and reverse — with price subsequently moving further/more decisively in the reversed
direction than on non-sweep days." E.g. the Asian session's own high is swept during London, then
London (or NY) sells off meaningfully below it. Motivated by wanting a statistical basis for
day-trading setups keyed off these fakeout-then-follow-through moments, not just where the day's
extreme statistically tends to land.

Design decided so far, each still needing empirical validation before becoming a real profile
(same standing rule as §4.4):
- **Reference levels**: each named session's *own* high/low (§2.3's new `asian_high`/`london_low`/
  etc. columns), not the whole day's high/low — that data now exists in the cleaned daily CSV.
- **Sweep threshold scales with the asset and the specific session**, not a fixed pip/point value
  — a fixed "5 pips" means something very different for EURUSD (ADR ~50-100 pips) than for BTCUSD
  or gold, and even within one asset, the Asian session's typical range is much smaller than
  London's or NY's. Planned as a ratio of that **session's own average range** (an "Average
  Session Range," analogous to the existing ADR), not the whole day's ADR. The exact ratio
  (candidate range so far: roughly 3-15% of that session's ASR) is deliberately not fixed yet —
  to be derived from the real distribution once enough sweep events can be measured, the same way
  Compression/Expansion's p20/p80 thresholds were derived empirically rather than assumed.
- **Reversal rule**: a pierce only counts as a genuine sweep if price closes back on the other
  side of the swept level by the end of whichever session did the piercing — a coarse first rule,
  intentionally not more precise than that yet.
- **Build order (explicitly step-by-step, not a single leap):** (1) the session-OHLC columns
  above — done; (2) a one-off, informal descriptive study on an asset with full history (GBPUSD or
  EURUSD) measuring, across a few candidate thresholds, how often a sweep-by-that-definition
  happens and what price does afterward vs. non-sweep days — purely to establish whether a real,
  non-noise effect exists at all; (3) only if that shows something real, a formal profile/taxonomy
  addition with thresholds derived from step 2's data. Not proposed to build steps 2-3 until
  explicitly asked.
- **Session-overlap activity, a related but separate question**: independent of whether a sweep
  happened, is there a statistically real activity/volatility signature specifically at session
  *overlap* windows (Asian-London, London-NY) worth designing setups around? Noted alongside sweeps
  since they're likely to interact (a sweep is plausibly more likely to resolve right as liquidity
  shifts at an overlap boundary), but is its own question, not assumed to be the same finding.
- **Frankfurt as a distinct session boundary**: not yet supported — `session_tag()`/the new
  per-session OHLC only know Asian/London/New York. Needed before a "Frankfurt open" profile
  specifically (as opposed to "London," which currently starts at 07:00 UTC, already close to
  Frankfurt's own open) can be built.

Tracked in `seasonal-dashboard/docs/PLATFORM_ROADMAP.md` as **Tier 5b** — a sibling to Tier 5's
coarser (Daily→Weekly→Monthly→Yearly) direction, going finer (sub-daily/session-relative) instead.

### 4.6 Weekly profile taxonomy (Tier 5, implemented 2026-09-05)

`pipeline/profile_taxonomy_weekly.py` — the first step of Tier 5's coarser-than-Daily direction.
Same two primary axes as Daily (range regime, closing shape), same 8-profile combination logic
(names swap "Day"→"Week"), but empirically re-derived rather than assumed to transfer as-is —
per §4.4's standing rule, and because they didn't transfer identically:

- **Rolling window: 52 weeks**, not a re-derivation of Daily's 252. Chosen to match Daily's
  window in *real elapsed time* (252 trading days ≈ 1 calendar year, so does 52 weeks), not just
  unit count, so both granularities reflect "the trailing year" consistently. `MIN_PERIODS = 15`.
- **Range regime × closing shape are not as cleanly independent as Daily's axes were.** Correlation
  between weekly range and closing strength: **+0.155 (GBPUSD), +0.180 (EURUSD), +0.099 (XAUUSD)**
  — small but real and stable across three different assets (two FX pairs, one metal), not
  asset-specific noise. Disclosed here rather than treated as a design flaw: the two-axis split
  still produces a healthy, non-degenerate distribution (every range-regime × shape cell
  populated in the cross-tab check), so the same methodology was kept, with this correlation as a
  known, accepted characteristic of weekly bars rather than something corrected away.
- **Two secondary tags, not one:**
  - `extreme_timing` — direct analog of Daily's tag (`Late_Push`/`Early_Resolution`/
    `Late_Resolution`/`Fade_Risk`), same >=0.5-of-the-period rule, discretized to weekday
    granularity ("late" = Wed/Thu/Fri, the back half of a 5-day week). **Validated the exact same
    trend signature Daily found, independently, at weekly granularity**: across all three test
    assets, `Trend Week (Up/Down)` weeks are 84-91% `Late_Push` — the opposite extreme forms
    early in the week, the favored one late — strong cross-granularity confirmation the
    methodology transferred correctly, not just a plausible-sounding assumption.
  - `extreme_spread` — **new, no Daily analog** (a "how many days apart" concept only makes sense
    at a granularity coarser than one day). Added directly from a user-proposed idea: instead of
    only the two existing *marginal* charts (which weekday tends to have the high, which tends to
    have the low, tracked separately), track the *joint* (high-weekday, low-weekday) pair as one
    event. Empirically striking and consistent across all three assets: the high and low landing
    on the **same weekday is suppressed 5-15x** versus what the existing marginals alone would
    predict (2.8-3.2% observed vs. much higher expected under independence); pairs **2+ weekdays
    apart are consistently over-represented ~1.4-1.9x**. Bucketed as `Same_Day` / `Adjacent` /
    `Spread`. `Trend Week`s are 91%+ `Spread` and almost never `Same_Day` — a week's range needs
    to build progressively across days to actually trend, which the data confirms directly.
  - Both tags degrade gracefully to `Insufficient_History` (not a crash) for the rare trading day
    that lands on a calendar Saturday/Sunday — a DST spring-forward boundary artifact in
    `clean_mt5_csv.py`'s shared `trading_day` computation (13 occurrences in GBPUSD's full
    history, all late March 1994-2006, none since) that's out of scope to fix here since it
    touches a foundational function every other pipeline stage depends on.
- **Same-period pattern generalizes to other granularities** (explicitly noted by the user, not
  to be neglected when built): Monthly's analog is which week-of-month had the high vs. low
  (including the same-week case); Yearly's is which month. `profile_taxonomy_weekly.py`'s
  `extreme_spread` is the reference implementation for how to handle the same-period case
  correctly (as a real, explicitly-tracked outcome, not a dropped edge case) when those are built.
  **User preference (2026-09-05), for when Daily's own pairing is eventually built (Tier 5b, not
  yet started):** don't stop at a coarse bucket summary the way `extreme_spread` currently is —
  build the same *full joint table* treatment `weekday_pair_distribution` (§ below) gives Weekly,
  applied to Daily's own two pairings: **which hour had the day's high vs. which hour had the
  low** (a 24×24 table — session-relative work already has the per-session OHLC and UTC hour
  data this needs, see §4.5's session-defined/liquidity-sweep notes), and **which session had the
  high vs. which had the low** (a small session×session table, e.g. Asian/London/NY, the direct
  joint version of §4.5's "session-defined extreme profiles" idea). Same design principle as
  Weekly's heatmap: marginal charts already exist (which hour/session tends to have the high,
  tracked separately) — the value is in the *pairing*, not restating the marginals.
- **Dashboard-wired (2026-09-05).** `build_dashboard_data.py` now accepts `--weekly-summary` and
  folds the full weekly summary JSON into the same per-asset bundle as `stats`/`profiles`
  (`bundle.weekly`) — `refresh_asset.py` passes it automatically unless `--skip-weekly`. A fourth
  field was added specifically for the dashboard: `weekday_pair_distribution`, the full 5×5
  (low-weekday × high-weekday) joint table — not just the 3-bucket `extreme_spread` summary
  attached to each profile — so "how often does a Monday-low pair with a Friday-high,
  specifically" has a direct answer (e.g. GBPUSD: 13.68%), not just an aggregated bucket. See
  `seasonal-dashboard/docs/PLATFORM_ROADMAP.md` Tier 5 and that repo's own `js/profiling.js`/
  `js/profiling-profile-detail.js`/`js/profiling-compare.js` for the consuming side (a new "Weekly
  Profile Taxonomy" card grid mirroring Daily's, a "Week High/Low — Day Pairing" heatmap, and full
  detail/compare-page support including Daily/Weekly-grouped nav).

### 4.7 Monthly profile taxonomy (Tier 5, implemented 2026-09-05)

`pipeline/profile_taxonomy_monthly.py` — the second step of Tier 5's coarser-than-Daily/Weekly
direction. Same 8-profile taxonomy shape (names swap "Week"→"Month"), again re-derived rather than
assumed to transfer, per §4.4's standing rule and §4.6's own precedent:

- **Rolling window: 24 months** — a deliberate break from Daily's 252-day and Weekly's 52-week
  convention of matching "trailing ~1 real year." Tested 12/24/36-month windows on GBPUSD/EURUSD/
  XAUUSD: with only ~12 bars in a trailing window, a percentile rank moves in ~8%-wide steps, too
  coarse for the 20/80 split to mean much (2-3 raw points decide "Compression" or not). 24 months
  roughly halves that coarseness while still covering 96-98% of history across all three assets
  (9 months burned to burn-in, since months are far rarer than weeks/days to begin with) and
  produces a stable, non-degenerate regime split. `MIN_PERIODS = 10`.
- **Range regime × closing shape are, if anything, more independent than Weekly's.** Correlation
  between monthly range and closing strength: **+0.059 (GBPUSD), +0.132 (EURUSD), −0.048
  (XAUUSD)** — smaller in magnitude than Weekly's +0.10 to +0.18, and XAUUSD is even slightly
  negative. Two-axis design kept unchanged.
- **Two secondary tags, direct analogs of Weekly's, discretized to week-of-month instead of
  weekday** (reusing `stats_engine.py`'s own `((day_of_month-1)//7+1).clip(upper=5)` bucketing
  convention exactly, so this taxonomy's week-of-month fields mean the same thing as the ones
  already surfaced elsewhere in the dashboard):
  - `extreme_timing` — same >=0.5-of-the-period rule as Daily/Weekly, "late" = week 3, 4 or 5 of
    the month. `Trend Month (Up/Down)` months reproduce the same signature found at Daily and
    Weekly independently: 84-90%+ `Late_Push` across all three test assets.
  - `extreme_spread` — same-week-of-month vs. adjacent vs. spread-apart, bucketed `Same_Week` /
    `Adjacent` / `Spread`. Same generalizing pattern as Weekly's `weekday_pair_distribution`: the
    month's high and low landing in the **same week-of-month is suppressed to 3.5-5.6%** of months
    (vs. what the marginal week-of-month distributions alone would predict) across GBPUSD/EURUSD/
    XAUUSD; pairs spread 2+ weeks apart are consistently over-represented ~1.5-2.0x. `Trend Month`s
    are 90%+ `Spread`, almost never `Same_Week` — same "needs room to build" story as Weekly.
  - Both tags degrade gracefully to `Insufficient_History` for the same rare DST-boundary trading
    days documented in §4.6 (the week-of-month itself is always defined; it's the *weekday* lookup
    elsewhere in the pipeline that occasionally can't resolve, not relevant here — included for
    completeness since these fields share the same `.get()`-based defensive pattern).
- **Dashboard-wired from the start** (unlike Weekly, which was wired in a follow-up pass):
  `build_dashboard_data.py` accepts `--monthly-summary`, folded into the bundle as `bundle.monthly`
  — `refresh_asset.py` passes it automatically unless `--skip-monthly`. Includes the full joint
  table from the start, `week_of_month_pair_distribution` (5×5, `low_week_of_month` ×
  `high_week_of_month`) — the same full-table treatment Weekly's `weekday_pair_distribution` needed
  a follow-up request to add, applied here immediately per the standing preference recorded in
  §4.6's last bullet. **Dashboard UI shipped same-day (2026-09-05)**: a "Monthly Profile Taxonomy"
  card grid and a "Month High/Low — Week Pairing" heatmap on the Profiling tab, full detail/
  compare-page support (Daily/Weekly/Monthly-grouped nav) — see `seasonal-dashboard`'s
  `js/profiling*.js` and that repo's `docs/PLATFORM_ROADMAP.md` Tier 5.

### 4.8 Yearly profile taxonomy (Tier 5, implemented 2026-09-05)

`pipeline/profile_taxonomy_yearly.py` — Tier 5's coarsest granularity, completing the
Daily→Weekly→Monthly→Yearly direction. Same 8-profile taxonomy shape (names swap "Month"→"Year"),
re-derived per §4.4's standing rule — but this granularity needed an explicit scope decision from
the user before building anything permanent, not just a parameter choice, because the sample size
is genuinely thin:

- **~28-34 years of history per asset, only ~21-26 of those classifiable** after burn-in (GBPUSD/
  EURUSD/XAUUSD). Crossing two axes into 8 named profiles fragments this further — several
  profile buckets landed at **zero years for a given asset** in the validation check (e.g.
  GBPUSD's Quiet Drift Year (Down), XAUUSD's Compression Year and both Quiet Drift variants).
  Presented this honestly to the user as a genuine fork before writing any code — full 8-name
  taxonomy (disclosed) vs. a simplified 3-bucket range-only scheme vs. no formal yearly taxonomy
  at all — **user chose to keep the full 8-name taxonomy for consistency with Daily/Weekly/
  Monthly**, disclosed with a prominent small-sample note (mirroring the existing `yearly_range`
  panel's own "treat this as a much weaker signal" copy) rather than silently presented as
  equally reliable as the denser granularities.
- **No trailing rolling window** — unlike Daily (252 days) or Weekly/Monthly (52 weeks / 24
  months), a fixed trailing window doesn't make sense when the whole point is comparing a year to
  *other years* and there are only ~30 of them total. Uses an **expanding window** instead
  (percentile rank against all prior years, `MIN_PERIODS = 8`) — tested against small trailing
  windows (15yr/20yr) and results were nearly identical, so the simpler expanding form was kept.
  This also matches `stats_engine.py`'s own `build_yearly()`/`yearly_range`, which already
  abandoned trailing-window lookback for the identical reason, well before this taxonomy existed.
- **Range regime × closing shape correlation is small but inconsistent in sign** across assets:
  **+0.153 (GBPUSD), −0.206 (EURUSD), +0.142 (XAUUSD)**. Larger in magnitude and less consistent
  than Weekly/Monthly's, but still small enough that the two-axis split is defensible — disclosed,
  not treated as disqualifying.
- **Two secondary tags, direct analogs of Weekly's/Monthly's, discretized to calendar month**
  (reusing `stats_engine.py`'s own `yearly_high_month`/`yearly_low_month` convention — plain
  calendar month 1-12, not a coarser bucketing):
  - `extreme_timing` — same >=0.5-of-the-period rule, "late" = July-December.
  - `extreme_spread` — same-month vs. adjacent vs. spread-apart, bucketed `Same_Month` /
    `Adjacent` / `Spread`. **Linear, not circular** — December and January are NOT treated as
    adjacent, a known simplification consistent with how Weekly/Monthly also don't wrap their own
    period boundaries, disclosed rather than silently assumed away.
  - Both tags degrade gracefully to `Insufficient_History`, same defensive `.get()` pattern as
    Weekly/Monthly.
- **`month_pair_distribution` (12×12 joint table), included at the user's explicit request** even
  though the exploratory check found it genuinely very sparse: with ~28-34 years spread across 144
  cells, only 23-28 cells were non-zero and the max single-cell count was 2-3 years, across all
  three test assets. Same-month occurred 0/33 (GBPUSD), 0/33 (EURUSD), 0/28 (XAUUSD) — with this
  few years, that is **not** the same kind of "suppression finding" Weekly (thousands of weeks) or
  Monthly (hundreds of months) demonstrated; it's simply what near-total sparsity looks like at
  this n. Built and shipped, but the dashboard must disclose the small n prominently rather than
  implying the same confidence the denser granularities' heatmaps can claim.
- **Dashboard-wired same-day**: `build_dashboard_data.py` accepts `--yearly-summary`, folded into
  the bundle as `bundle.yearly` — `refresh_asset.py` passes it automatically unless
  `--skip-yearly`. A "Yearly Profile Taxonomy" card grid and a "Year High/Low — Month Pairing"
  heatmap on the Profiling tab, full detail/compare-page support (now grouped Daily/Weekly/
  Monthly/Yearly) — see `seasonal-dashboard`'s `js/profiling*.js`.

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

### 5.2 Calendar feature (implemented — `dashboard/calendar/`)

Pick a specific date and see that day's (and its containing week's/month's) stats for one asset
(`dashboard/calendar/asset.html?a=GBPUSD`), plus a cross-asset "all assets on this day" view from the
homepage (`dashboard/calendar/index.html`). Both architecture decisions flagged when this was planned
resolved as follows:

- **Data shape — chunked by year, as planned.** `pipeline/export_calendar_data.py` writes one JS file
  per asset per year (`dashboard/data/calendar/<asset>/<year>.js`), loaded on demand via a
  dynamically-injected `<script>` tag only when the calendar UI navigates to that year
  (`dashboard/js/calendar.js`'s `loadYear()`). **One real gotcha found while building this:** unlike
  the static per-page data files (`data/<asset>.js`), which can rely on the bare-identifier trick (see
  §5.3's note on `const` vs. `window` properties) because the consuming script always knows the exact
  variable name up front, the calendar loader needs to look up a file by a **runtime-constructed**
  asset+year — and `window["KPT_CALENDAR_GBPUSD_2016"]` would be `undefined` for the exact same reason
  `window.GBPUSD_DATA` was. Fixed by having the generated files assign onto a namespaced
  `window.KPT_CALENDAR[asset][year]` object instead of declaring a `const`, which *does* create a
  real, dynamically-lookupable `window` property.
- **Week/month context — solved via a merge, not a new stats_engine.py output.** Rather than adding a
  new persisted-with-dates output to `stats_engine.py`, `export_calendar_data.py` imports
  `build_weekly()`/`build_monthly()` directly from `stats_engine.py` and merges their result back onto
  the daily table by re-deriving the same ISO-week/month grouping keys — so the week/month aggregation
  logic still lives in exactly one place, and `stats_engine.py` itself didn't need to change.

**Scope actually built** (the "start simple" version): month-grid browser (prev/next + direct
year/month jump), each day colored by its profile (reusing `KPT_PROFILE_COLOR`), click a day for its
full OHLC/range/profile plus its week's and month's context. The homepage's cross-asset view colors
the grid by GBPUSD's profile (as the primary/first-listed asset — a single cell can't show two assets'
colors at once) and shows both assets' stats side by side when a day is clicked. **Not done:** a
split/dual-color day cell for the cross-asset view (deferred as unnecessary complexity for v1); a
visual legibility pass — "Normal Day" (grey, the majority-share profile by design, §4.2) renders as a
fairly low-contrast cell, close in appearance to an empty/no-data cell, which is arguably fine (the
eye is drawn to the "interesting" minority-share days instead) but is worth a second look once someone
actually uses this day to day.

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
