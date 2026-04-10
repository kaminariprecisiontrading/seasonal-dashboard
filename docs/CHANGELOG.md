# CHANGELOG.md — Version History

---

## v0.8 — April 2026
**CAD, EUR, CHF Fixes + NZD Dashboard + Wk-Grid Pill Badges**

### CAD / EUR / CHF — Bug Fixes

Three critical ID mismatches were causing silent failures on all three dashboards:

1. **Empty Combined Bias table** — `accordion.js` targets `id="acc-body"` but CAD/EUR/CHF had `id="accordion-body"`. Fixed by renaming the tbody IDs.
2. **Broken AI button** — `api.js` targets `id="run-btn"` but files had `id="ai-btn"`. Class `.ai-btn` is also undefined in `dashboard.css`. Fixed by replacing the AI section with the AUD pattern: `id="run-btn"`, `class="run-btn"`, `id="ai-output"`.
3. **Column count mismatch in accordion** — CAD/EUR/CHF had 8 `<th>` elements (separate chevron column) but `accordion.js` generates 7 `<td>` cells (chevron embedded in month cell). Fixed by removing the extra empty `<th>`.
4. **Unstyled legend** — legend items had no colour dots and were missing the 7th item (Combined). Fixed by expanding to 7 items using CSS variable colours matching `dashboard.css` tokens.
5. **Section label dot missing** — `.section-label span` requires an 8px dot element. Added where missing.

Root cause: CAD/EUR/CHF were built from an older template predating the modular JS refactor in v0.6.

### Wk-Grid Pill Badges (CAD, EUR, CHF, NZD)

All TF-specific seasonal tables (5-YR, 15-YR, long-term) on CAD, EUR, CHF updated to use the same `.wk-grid` / `.wk-cell` / `.wk-bull` / `.wk-bear` / `.wk-chop` pill badge system as AUD, replacing plain unstyled `<td class="bear-cell">↓</td>` cells.

Tables also rebuilt: `<div class="section"><table class="tf-table">` → `<div class="table-wrap"><table>` with 5-column headers (Period | Bias | Monthly Overview | Wk1–Wk4 | Notes), matching AUD's structure.

### NZD/USD Futures Dashboard (new)

New dashboard built from scratch from Moore Research Center chart image (23-Year seasonal 1997–2019).

**Key NZD seasonal narrative:**
- Jan: Spike-and-collapse from Dec highs — structural bear open
- Mar: Annual trough flip — 23-YR troughs Wk1–2, then sharp reversal
- Apr: All TFs rallying — highest conviction LONG window
- May: Most critical flip month — 23-YR peaks ~85–90 early May, all TFs collapse by Wk2 (highest conviction short of the year)
- Jun: Absolute trough zone — hold shorts from May flip
- Jul: Counter-trend bounce (23-YR and 15-YR), 5-YR muted — cautious long available
- Sep: Secondary peak → Wk3 flip short
- Nov Wk4 → Dec: Year-end surge to ~95–100 on 23-YR

Files created: `data/nzd.js` + `assets/nzd.html`

### Index Page
- NZD card: `status-planned` → `status-complete`, `href="#"` → `href="assets/nzd.html"`, timeframe badges updated to 5-YR / 15-YR / 23-YR
- NZD card status corrected from hardcoded `BEAR` → `Live` (the BEAR label was incorrect; Apr Wk 2 NZD is bullish)

### Status System Design Discussion

Established design principles for a future dynamic status badge system on index cards (not yet implemented):

**Two distinct dimensions:**
- **Operational status** (PLANNED / LIVE / MAINTENANCE) — manual, managed via a central `data/status.js` config file. Only the developer knows when maintenance is in progress.
- **Seasonal signal** (BULL / BEAR / CHOP) — derivable from each asset's existing `MONTHS[]` data: read `MONTHS[currentMonth].weeks[currentWeek].com`. Fully automatic once the index page loads asset data files.

**Hybrid recommended approach:** Operational status in central config (manual); seasonal signal computed live from `MONTHS` data. `PLANNED` and `MAINTENANCE` override the signal. Index page currently loads no asset data files — this is the architectural bloat to solve when implementing.

**Important:** Signal labels on index cards must NOT be hardcoded (e.g. `<span class="bear-tag">BEAR</span>`) as they go stale immediately. Use `Live` for all current assets until dynamic derivation is implemented.

### Files Changed
- `assets/cad.html` — ID fixes, legend fix, section label fix, all 3 TF tables rebuilt with wk-grid
- `assets/eur.html` — same fixes, adapted for 22-YR long-term TF
- `assets/chf.html` — same fixes, adapted for 40-YR long-term TF
- `assets/nzd.html` — created (23-YR long-term TF)
- `data/nzd.js` — created
- `index.html` — NZD card live, status corrected to Live

---

## v0.7 — April 2026
**UI Improvements: Sticky Nav + Section Reorder**

### What Changed
- `index.html` — sticky navigation bar added at top of page
  - 13 jump links in two groups: Futures (Currencies · Metals · Energy · Rates · Indices · Softs · Grains · Fiber · Meats) and Forex (Majors · Minors · Crosses)
  - `position: sticky; top: 0` with `backdrop-filter: blur(8px)` for glass effect
  - Active link highlights automatically via `IntersectionObserver` as user scrolls
  - Horizontally scrollable on mobile without wrapping
  - All section `id` attributes added to match nav `href` values
- All four futures asset dashboards reordered:
  - **Before:** Header → Legend → 5-YR table → 15-YR table → LT table → Combined accordion → AI panel
  - **After:** Header → Legend → **Combined accordion** → **AI panel** → Divider → 5-YR table → 15-YR table → LT table
  - Combined accordion is now the first visible element — most actionable content appears immediately on load

### Files Changed
- `index.html` — sticky nav CSS + HTML + IntersectionObserver script + section IDs
- `assets/aud.html` — section reorder
- `assets/usd.html` — section reorder
- `assets/jpy.html` — section reorder
- `assets/gbp.html` — section reorder

---

## v0.6.1 — April 2026
**GBP Futures Dashboard + Forex Seasonals (AUDUSD, USDJPY, GBPUSD)**

### What Was Added

**GBP/USD (CME) — 40-Year (1980–2019)**
- Cleanest chart of all assets analysed — all 3 TFs (5-YR, 15-YR, 40-YR) peak simultaneously at ~95–100 in early April
- Feb is the annual trough for all TFs → Mar–Apr is the bull window → May waterfall → Sep secondary trough → Oct–Nov recovery → Dec structurally weak (unusual)
- Files: `data/gbp.js` + `assets/gbp.html`

**AUDUSD Forex Seasonal**
- Derived from AUD CME (34-YR) + USD ICE (35-YR) inverse
- Jan–Mar LONG strongest (AUD bull + USD bear aligned); Oct–Nov SHORT (USD seasonal dominance)
- Files: `data/fx-audusd.js` + `assets/fx-audusd.html`

**USDJPY Forex Seasonal**
- Derived from USD ICE (35-YR) + JPY CME (40-YR) inverse
- Sep LONG is the standout — JPY in sharpest seasonal collapse simultaneously with USD recovering
- Files: `data/fx-usdjpy.js` + `assets/fx-usdjpy.html`

**GBPUSD Forex Seasonal**
- Derived from GBP CME (40-YR) + USD ICE (35-YR) inverse
- Mar LONG (GBP surging to peak + USD declining = double tailwind); Nov–Dec SHORT (GBP at annual lows + USD peak = double headwind)
- Files: `data/fx-gbpusd.js` + `assets/fx-gbpusd.html`

### Forex Dashboard Architecture
Forex shells differ from futures shells — no individual TF tables (data is synthesised, not from raw charts). Instead: methodology note explaining derivation + component cards showing the two source futures datasets. ASSET_CONFIG uses `ltLabel: "Long-YR"`, `ltSigKey: "sigLt"`, `ltKey: "sLt"`.

### Index Updated
- GBP, AUDUSD, USDJPY, GBPUSD cards marked as Live
- Two top-level sections established: Futures Seasonals + Forex Seasonals

---

## v0.6 — April 2026
**Modularisation — Shared CSS, JS, Data, and Index Page**

### What Changed
- Extracted all shared CSS into `css/dashboard.css`
- Extracted accordion logic into `js/accordion.js` — asset-agnostic via `ASSET_CONFIG`
- Extracted Claude API call into `js/api.js`
- Created per-asset data files in `data/` — each contains `ASSET_CONFIG`, `MONTHS[]`, `SEASONAL_DATA`
- Refactored AUD, USD, JPY into thin HTML shells in `assets/` (~120 lines each)
- Built `index.html` landing page — card grid, live vs planned, current month label
- `ASSET_CONFIG` pattern introduced: `ltKey`, `ltSigKey`, `ltLabel` allow shared accordion to handle any long-term TF

### Script Load Order (Critical)
```html
<script src="../data/[asset].js"></script>   <!-- must be first -->
<script src="../js/accordion.js"></script>
<script src="../js/api.js"></script>
```

### Files Created
`css/dashboard.css` · `js/accordion.js` · `js/api.js` · `data/aud.js` · `data/usd.js` · `data/jpy.js` · `assets/aud.html` · `assets/usd.html` · `assets/jpy.html` · `index.html`

---

## v0.5 — April 2026
**USD Index + JPY Dashboards + Dynamic Month Auto-Open**

### What Was Added
- US Dollar Index (ICE) — 35-YR (1985–2019), 15-YR, 5-YR
- Japanese Yen (CME) — 40-YR (1980–2019), 15-YR, 5-YR
- Dynamic current-month auto-open via `new Date().getMonth()` — replaces hardcoded April
- "NOW" badge on current month row
- `max_tokens` raised from 1000 to 2500

### Key Analysis Notes — USD
- 35-YR peaks earliest (late Feb), before 15-YR (mid-Mar)
- Double-cycle: Feb/Mar peak → May trough → Jun/Jul bounce → Oct trough → Nov/Dec peak
- Nov/Dec highest conviction LONG — all 3 TFs fully aligned
- Apr Wk4 is a FLIP LONG, not a continuation sell

### Key Analysis Notes — JPY
- 40-YR — longest dataset in the project
- Mar is Q1 highest conviction LONG — all 3 TFs simultaneously aligned
- Jul–Aug absolute annual peak — all 3 TFs hit ~95–100 together
- Sep highest conviction SHORT — simultaneous collapse from Aug peak
- Apr most complex: 40-YR still rising Wk1 (playbook BUY) while 5-YR/15-YR already falling

---

## v0.4 — April 2026
**Development Environment Setup**

- Local Git repo initialised in VSCode
- Private GitHub repo created: `seasonal-dashboard`
- SSH authentication configured (ED25519 key, Authentication type — not Signing Key)
- GitHub Pages enabled
- Claude Code (Anthropic VSCode extension) installed
- Live Server (VSCode extension) for local preview
- Workflow: edit in VSCode → preview with Live Server → commit → push → GitHub Pages auto-deploys

---

## v0.3 — April 2026
**Combined Table: Accordion Expansion**

- Replaced flat combined table with expandable accordion
- 12 months as clickable header rows — click to expand Wk1–4 breakdown
- Chevron indicator rotates on open/close
- April hardcoded to auto-open (later replaced with dynamic month in v0.5)
- `MONTHS[]` JavaScript array with full Wk1–4 data for all 12 months

---

## v0.2 — April 2026
**Initial AUD/USD Dashboard**

- Complete single-file HTML dashboard for AUD/USD
- Three timeframe tables: 5-YR (pink), 15-YR (brown), 34-YR (blue)
- Combined bias table with star conviction ratings
- Claude AI analysis button — POST to `api.anthropic.com/v1/messages`
- Dark terminal aesthetic: IBM Plex Mono + Bebas Neue, green/red/amber signal system
- CSS variable system for colour consistency

### AUD Chart Analysis (Moore Research Center, 34-YR 1986–2019)
- Jan–Mar: Strongly bullish across all TFs
- Apr Wk1: 5-YR hits score ~100 (absolute peak). Exit longs, flip short
- Apr Wk2–4: All 3 TFs bearish — highest conviction short of the month
- May–Jun: Deepest waterfall. Hold short
- Jul: 15-YR sharp bounce to ~75, 5-YR and 34-YR choppy — avoid
- Aug–Sep: Secondary bear leg
- Oct–Nov: Base building
- Dec: Recovery into Q1 cycle

---

## v0.1 — April 2026
**Project Conception**

- April trading playbook reviewed — currencies and metals with weekly Buy/Sell/Choppy signals
- Decision: structured interactive dashboard rather than flat notes
- Image batching strategy: 4–6 charts per Claude message
- Three-layer output structure defined: individual TF tables → combined table → AI layer
- Hierarchy confirmed: yearly arc first, then monthly, then weekly
- Two billing systems clarified: Claude.ai subscription vs API credits at console.anthropic.com
