# CHANGELOG.md — Version History

---

## v1.1 — June 2026
**UI Layer Complete — Tab System, Sub-Tabs, Dynamic TF Tables, Topbar**

### Summary

Post-completion UI pass adding a full shared interaction layer via a new `js/ui.js` file, dynamic TF table generation for the 70 generator-built pages, and secondary timeframe sub-tabs within the Seasonals panel.

---

### New: `js/ui.js` — Shared UI Enhancements

New shared JavaScript file loaded on all 97 asset pages. Handles four independent features:

**1. Topbar — Date Chip + Prev/Next Navigation**
- Injects a live date chip (`WK N · MON YYYY`) into the topbar, computed from `new Date()`
- Injects `← Prev` / `Next →` navigation buttons for within-category asset browsing
- Derives prev/next IDs from a full `ASSET_CATEGORIES` map (97 assets across 11 categories)
- Auto-populates empty topbar titles on hand-built pages from `<h1>` text

**2. Legend Collapsible Toggle**
- Adds a Hide / Legend toggle button above the legend strip
- Collapses/expands the legend with a single click — saves screen space on mobile

**3. Primary Tab Layout — Seasonals · Chart · Analysis**
- Scans the page for `.combined-wrap`, `.ai-panel`, and `#tv-chart-section`
- Tags all discovered content elements with `data-kpt-panel` attributes (`seasonals` / `analysis` / `chart`)
- Builds a `kpt-tabs` bar and injects it before the first panel element
- Active tab shown/hidden via `.kpt-panel-active` CSS class; only tabs with content are rendered
- Falls back gracefully on pages without a given panel (e.g. FX pages without a TradingView section)

**4. Secondary TF Sub-Tabs — Combined · 5-YR · 15-YR · Long-term**
- Builds a secondary `kpt-tabs kpt-subtabs` bar within the Seasonals panel
- Four sub-tabs: Combined (green) · 5-YR (pink) · 15-YR (brown) · Long-term (asset-specific accent)
- Long-term label and accent pulled from `ASSET_CONFIG.ltLabel` / `ASSET_CONFIG.ltAccent`
- Sub-tab bar only visible when Seasonals is the active primary tab
- Selected sub-tab persisted to `localStorage` as `kpt-sub-{assetId}` — restored on next visit
- Hand-built pages (no `data-tf-section` attributes): tagged by DOM position at runtime
- **Insertion fix (v1.1):** `subBar` inserted immediately after `tabBar` (not before the "Combined Bias" section-label) — corrects an inverted visual hierarchy where secondary tabs appeared above primary tabs

---

### New: `buildTFTables()` in `accordion.js`

Dynamically generates the three individual timeframe tables (5-YR, 15-YR, Long-term) for the 70 generator-built futures pages that had no static TF tables.

- **Skip guard:** `if (document.querySelectorAll('.table-wrap').length > 0) return;` — silently skips the 27 hand-built pages that already have static tables; safe to load on all 97 pages
- **Columns:** Period | Yearly Bias | Monthly Overview | Weekly Detail | Notes — matches the hand-built AUD/GBP/etc. format exactly
- **Weekly Detail:** Rendered as a `wk-grid` of 4 `wk-cell` pill badges with directional arrows (↑ ↓ ± ⇄), matching the hand-built pages' visual system
- **`data-tf-section` tags:** `'five'` / `'fifteen'` / `'lt'` set on both the section-label and table-wrap — used by the secondary sub-tab system in `ui.js`
- **Insertion:** Injected before `#tv-chart-section` (fallback: `.footnote`), after the AI panel and divider
- **Keys:** Uses two keys per TF — `mSigKey` (month-level, e.g. `sig5`) for Yearly Bias and `wSigKey` (week-level, e.g. `s5`) for Weekly Detail

---

### New: `buildQuickJump()` in `accordion.js`

Month Quick-Jump bar — a row of 12 month buttons (Jan–Dec) inserted above the combined accordion. Clicking any month opens and scrolls to that accordion row. Current month button highlighted via `.qj-current`. Inserted via `wrap.parentElement.insertBefore(nav, wrap)` so it sits immediately above `.combined-wrap`.

---

### CSS Additions (`css/dashboard.css`)

- `.kpt-tabs` — primary tab bar; `border-bottom: 1px solid var(--border)`; active button: `border-bottom: 2px solid var(--accent-combined)` with `color` override
- `.kpt-subtabs` — secondary sub-tab bar; `margin-top: -28px` (cancels `kpt-tabs` bottom-margin so both rows sit flush); `padding-left: 8px` (subtle indent signals hierarchy)
- `.kpt-subtab-btn.active` — fallback active colour; overridden inline per TF accent by JS
- `.kpt-panel-active` — `display: block` for active panels; `[data-kpt-panel]:not(.kpt-panel-active)` hides others
- `.kpt-divider-hidden` — hides `.divider` elements when tabs are active (tabs replace visual separation)
- `.table-wrap tr.current-month` — subtle green tint + bold month name on the current calendar month row in TF tables
- `.month-quickjump` / `.qj-btn` / `.qj-current` — quick-jump bar pill buttons

---

### `.gitignore` Created

`seasonal-dashboard/.gitignore` added covering OS files (`.DS_Store`, `Thumbs.db`, `desktop.ini`), editor files (`.vscode/`, `*.swp`), and `node_modules/`.

---

### GitHub Version Control Initialised

Git repository initialised in `seasonal-dashboard/` and connected to a private GitHub remote. Deployment workflow via GitHub Desktop: stage → commit with a descriptive summary → Push origin. To revert: right-click any commit in GitHub Desktop history → Revert Changes in Commit.

---

### Files Changed
- `js/ui.js` — created (new shared UI file, 404 lines)
- `js/accordion.js` — `buildTFTables()` and `buildQuickJump()` added (file extended from 118 to 289 lines)
- `css/dashboard.css` — tab system styles, subtabs, quickjump, current-month highlight added
- `.gitignore` — created

---

## v1.0 — June 2026
**ALL ASSETS COMPLETE — 97 Dashboards Live · Dynamic Index Signals**

### Summary

Version 1.0 marks the completion of the full planned asset roster. Every futures asset across all categories has been built and verified — grains, indices, rates, softs, metals, energy, currencies, fiber, and meats. The index landing page now displays live runtime signals (BULL / BEAR / CHOP / FLIP) on every asset card, derived at page-load from each asset's seasonal data.

**Total assets live: 97** (70 futures + 27 derived FX pairs)

---

### Futures Completions (this milestone)

**Grains — 8 assets (CBOT)**
- Soybeans, Soy Meal, Soy Oil, Wheat (CBOT), Wheat (KCBT), Wheat (MGE), Corn, Oats
- All 40-YR datasets (1980–2019). Generator handles all 8 via `gen_futures_v2.js`.

**Indices — 13 assets**
- S&P 500 (CME 39-YR), S&P eMini (CME 23-YR), Russell 2000 (CME 17-YR), DJIA eMini (CBOT 23-YR), Nasdaq 100 (CME 24-YR), S&P 400 Mid-Cap (CME 29-YR), GSCI (CME 29-YR)
- Nikkei 225 (SIMEX 34-YR), FTSE 100 (LIFFE 37-YR), SPI 200 (SFE 21-YR), DAX (EUREX 30-YR), CAC 40 (MATIF 32-YR), Hang Seng (HKFE 34-YR)

**US Interest Rates — 5 assets (CBOT/CME)**
- T-Bonds 40-YR, T-Notes 10Y 39-YR, T-Notes 5Y 33-YR, T-Notes 2Y 30-YR, Eurodollar 39-YR

**SFE/LIFFE Rates — 5 assets**
- Aus T-Bonds 10Y (SFE 36-YR), Aus T-Bonds 3Y (SFE 33-YR), Aus T-Bills 3M (SFE 40-YR), Long Gilt (LIFFE 38-YR), Short Sterling (LIFFE 38-YR)

**EUREX/SGX/CBOT Rates — 4 assets**
- Euro-Bund (EUREX 30-YR), Euro-Bobl (EUREX 23-YR), Euro-Yen (SGX 31-YR), Fed Funds (CBOT 32-YR)
- Notable: Fed Funds is an inverted instrument (shorter TFs highest in January). Euro-Yen has the most dramatic single-month move in the entire rates complex (Feb 31-YR: 1→100).

**ICE Softs — 4 assets**
- Coffee "C" (ICE 40-YR), Sugar #11 (ICE 40-YR), Cocoa (ICE 40-YR), Orange Juice (ICE 40-YR)
- Notable: Sugar #11 has dual troughs (Jun + Sep). Cocoa has extreme TF divergence (May 40-YR at 0 while 5-YR/15-YR at 100). OJ has a 5-YR annual HIGH on January 1.

**LCE/CBOT Final Batch — 4 assets (completes all planned)**
- Rough Rice (CBOT 34-YR) — annual high at Dec/Jan cursor (~99); crashes immediately Jan 3; best long at April near-0 trough
- London Sugar (LCE 30-YR) — June 30-YR annual high (~95-100) is the most dramatic single-month LCE surge; August annual trough near 0
- London Cocoa (LCE 34-YR) — 34-YR visits near 0 FOUR times per year (Jan, Apr, Aug, Oct); most volatile soft in the dashboard
- Robusta Coffee (LCE 29-YR) — year ENDS at trough (29-YR ~31, 15-YR ~27, 5-YR ~17); February 29-YR annual high (~95-100); October annual low near 0

**Previously completed (MXN, BRL, Metals, Energy, Cotton, Lumber, Meats)**
- MXN (CME), BRL (CME)
- XAU, XAG, Copper, Platinum, Palladium
- Crude Oil (NYMEX), Brent Crude (ICE), Natural Gas (NYMEX), Heating Oil/ULSD (NYMEX), Gasoline/RBOB (NYMEX), Gas Oil (ICE)
- Cotton (NYBOT), Lumber (CME), Live Cattle (CME), Feeder Cattle (CME), Lean Hogs (CME), Class III Milk (CME)

---

### Quick Win — Dynamic Index Signals

**Problem:** All status-complete cards in `index.html` showed a hardcoded `<span class="bull-tag">Live</span>` that never changed regardless of the current seasonal signal.

**Solution implemented:**

1. **`gen_signals_manifest.js`** — new build script that reads all 97 data files (via `vm.createContext`), extracts the `com` string for every month × week, and writes `data/signals_manifest.js`.

2. **`data/signals_manifest.js`** — auto-generated file containing `SIGNALS_MANIFEST = { "aud": [...48 strings...], ... }`. Each asset gets a 48-element flat array (12 months × 4 weeks, Jan-Wk1 first). Regenerate by running `node gen_signals_manifest.js`.

3. **`index.html` injection** — two script blocks added before `</body>`:
   - `<script src="data/signals_manifest.js">` loads the manifest
   - Inline IIFE computes `currentMonth` and `currentWeek` from `new Date()`, then replaces `.card-signal` innerHTML on every `.asset-card.status-complete` card

4. **`comToTag()` mapper** — maps `com` string prefix to CSS class and label:
   - `LONG...` → `.bull-tag` / BULL
   - `SHORT...` → `.bear-tag` / BEAR
   - `FLIP...` → `.chop-tag` / FLIP
   - `AVOID...` → `.neutral-tag` / AVOID
   - `HOLD / NEUTRAL / MIXED / WATCH / CHOP...` → `.chop-tag` / CHOP

The 97 hardcoded `Live` spans remain in source HTML as a static fallback (for users with JavaScript disabled). All users with JS enabled see the runtime-derived signal.

---

### Generator State

- `gen_futures_v2.js`: GRAINS (8) + INDICES (13) + RATES (14) + SOFTS (8) = **43/43** HTML files generated
- `gen_signals_manifest.js`: **97/97** assets processed → `data/signals_manifest.js`

### Files Changed
- `data/roughrice.js` · `assets/roughrice.html` — created
- `data/londonsugar.js` · `assets/londonsugar.html` — created
- `data/londoncocoa.js` · `assets/londoncocoa.html` — created
- `data/robusta.js` · `assets/robusta.html` — created
- `gen_futures_v2.js` — SOFTS array expanded to 8 entries
- `gen_signals_manifest.js` — created (new build tool)
- `data/signals_manifest.js` — created (auto-generated, 97 assets)
- `index.html` — 4 planned cards converted to status-complete; signals IIFE injected

---

## v0.9 — June 2026
**Full Forex Pairs Roster Complete — 27 Derived FX Dashboards Live**

### Summary

Completed the build-out of every planned derived FX pair, taking the Forex Seasonals section from 3 live pairs (AUDUSD, USDJPY, GBPUSD, shipped in v0.6.1) to **27 live pairs** spanning majors, minors, and crosses. Work was tracked across an 8-task list (#1 reading source futures data, #2–#6 building pairs in batches, #7 wiring the index/docs, #8 verification).

**Majors (3 new):** EURUSD, USDCAD, USDCHF — completing the 6-pair major roster alongside the existing AUDUSD/GBPUSD/USDJPY.

**Minors (9 new):** AUDCAD, AUDCHF, AUDNZD, EURAUD (batch 1) · EURCHF, EURGBP, GBPAUD, GBPCHF, NZDUSD (batch 2).

**Crosses (12 new):** AUDJPY, CADCHF, CADJPY, EURCAD, EURJPY, EURNZD (batch 1) · GBPCAD, GBPJPY, GBPNZD, NZDCAD, NZDCHF, NZDJPY (batch 2).

### Cross Pairs Batch 2 (this session) — GBPCAD, GBPJPY, GBPNZD, NZDCAD, NZDCHF, NZDJPY

Each pair derived as base-currency-direct + quote-currency-inverted from the existing CME futures component datasets (no new chart images required). Narrative variety achieved through fresh thematic devices layered onto the established framework:

- **GBPCAD / GBPJPY:** Sustained Oct–Nov double-alignment LONG runs; GBPJPY also features a rare "dual trough" (Feb) and "dual flip" (Apr) month.
- **GBPNZD:** Two genuine defining collisions — May (both currencies' single highest-conviction trade of the year colliding head-on) and a remarkable December where both currencies' year-end defining moves coincidentally point the *same* direction, producing the calendar's cleanest alignment close.
- **NZDCAD:** Framed around "two similarly-cyclical commodity-bloc currencies" — an unusually high frequency of near-mirrored "coin-flip" months, a rare September dual-flip collision, and a clean single-component LONG dominance in December.
- **NZDCHF:** The most dramatic cross in the roster — THREE genuine maximum-conviction collisions (May, September, December), with December standing as the calendar's ultimate coin-flip: both currencies' single highest-conviction trades of their entire years firing in the same month, in directly opposing directions.
- **NZDJPY:** Clean resolving double-alignment windows in April and August (as JPY declines from its own historic flips), a defining September collision (NZD's secondary flip vs JPY's highest-conviction short of its year), and a December year-end stand-off between two strong, oppositely-aimed seasonal moves.

Two internal-consistency errors caught and corrected mid-build (self-contradictory signal/note pairings in GBPNZD's May section and NZDCAD's September Wk1) by re-deriving the correct combined-signal logic and rewriting the affected week blocks.

### Index & Docs Sync (Task #7)

- `index.html`: All 27 FX pair cards converted from `status-planned` (greyed, `href="#"`, "Planned" tag) to `status-complete` (`href="assets/fx-*.html"`, "Live" tag, accent colour matched to the base currency's brand colour — e.g. GBP pairs use `#22c55e`, NZD pairs use `#10b981`).
- `docs/README.md`: Forex Seasonals "Live Assets" table expanded from 3 to 27 entries (split into Majors / Minors / Crosses sub-tables with file paths, components, and key-signal summaries); the now-empty "Forex Seasonals — Planned" section replaced with a status summary.
- `docs/CHANGELOG.md`: This entry.

### Files Changed
- `index.html` — 27 FX cards updated (status, href, badges, signal tag, accent colour)
- `docs/README.md` — Forex Seasonals tables rebuilt and expanded; Planned section removed
- `docs/CHANGELOG.md` — v0.9 entry added
- `data/fx-{gbpcad,gbpjpy,gbpnzd,nzdcad,nzdchf,nzdjpy}.js` + `assets/fx-{...}.html` — created (batch 2, this session)

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
