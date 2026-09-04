# ARCHITECTURE.md — Technical Reference

Complete technical documentation for the seasonal trading dashboard system.

---

## Repository Structure

```
seasonal-dashboard/          ← root of GitHub repo
├── index.html               ← landing page with sticky nav + asset card grid
├── assets/
│   ├── aud.html             ← AUD futures dashboard shell
│   ├── usd.html             ← USD futures dashboard shell
│   ├── jpy.html             ← JPY futures dashboard shell
│   ├── gbp.html             ← GBP futures dashboard shell
│   ├── cad.html             ← CAD futures dashboard shell
│   ├── eur.html             ← EUR futures dashboard shell
│   ├── chf.html             ← CHF futures dashboard shell
│   ├── nzd.html             ← NZD futures dashboard shell
│   ├── fx-audusd.html       ← AUDUSD forex dashboard shell
│   ├── fx-usdjpy.html       ← USDJPY forex dashboard shell
│   ├── fx-gbpusd.html       ← GBPUSD forex dashboard shell
│   └── [asset].html         ← future assets follow same pattern
├── css/
│   └── dashboard.css        ← ALL shared styles — one file governs every dashboard
├── js/
│   ├── accordion.js         ← shared accordion builder + buildTFTables() + buildQuickJump()
│   ├── api.js               ← multi-provider AI panel (Claude / Gemini / Ollama); enriched context
│   ├── tradingview.js       ← TradingView widget injector (97-entry symbol table)
│   ├── backtest.js          ← CSV price history analysis engine (D1 / sub-daily)
│   ├── macro.js             ← Investing.com economic calendar embed + asset-class guide
│   ├── seasonal-chart.js    ← seasonal bias curve chart (Chart.js, 48-point cumulative)
│   ├── intraday.js          ← intraday bias tool (H1/H4 CSV → session/DoW stats)
│   └── ui.js                ← shared UI layer: tabs, sub-tabs, topbar, legend toggle
├── data/
│   ├── aud.js               ← AUD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── usd.js               ← USD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── jpy.js               ← JPY: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── gbp.js               ← GBP: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── cad.js               ← CAD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── eur.js               ← EUR: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── chf.js               ← CHF: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── nzd.js               ← NZD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── fx-audusd.js         ← AUDUSD forex: derived synthesis data
│   ├── fx-usdjpy.js         ← USDJPY forex: derived synthesis data
│   ├── fx-gbpusd.js         ← GBPUSD forex: derived synthesis data
│   └── [asset].js           ← future assets follow same pattern
├── scripts/
│   ├── README.md                    ← documents all scripts (purpose, run command, status)
│   ├── patch_add_backtest.js        ← one-shot: inserted backtest.js into all 97 HTML files
│   ├── patch_add_macro.js           ← one-shot: inserted macro.js into all 97 HTML files
│   ├── patch_add_seasonal_chart.js  ← one-shot: inserted seasonal-chart.js into all 97 HTML files
│   └── patch_add_intraday.js        ← one-shot: inserted intraday.js into all 97 HTML files
└── docs/
    ├── README.md
    ├── SKILL.md
    ├── ARCHITECTURE.md      ← this file
    ├── CHANGELOG.md
    ├── ROADMAP.md
    ├── PROMPTS.md
    ├── CONTRIBUTING.md      ← add-an-asset checklist; update/maintain guide
    ├── USER_GUIDE.md        ← end-user guide (CSV upload, AI setup, reading outputs)
    └── DATA_DICTIONARY.md   ← ASSET_CONFIG and MONTHS[] field reference
```

**Deployment:** Netlify — connected to the private GitHub repo, auto-deploys on every push to `main`.
- Live URL: https://kpt-seasonals.netlify.app/
- GitHub Pages is not used (requires public repo on the free plan)
- Dashboards: `https://[username].github.io/seasonal-dashboard/assets/aud.html`

**Local development:** Use **Live Server** in VSCode. Modular JS imports require a server context — opening HTML files directly from the filesystem fails silently.

---

## Modular Architecture (v1.3+)

Four layers:

### Layer 1 — Shared Styles (`css/dashboard.css`)
Every CSS rule for every dashboard. CSS variables in `:root` define all colours, fonts, and tokens. Edit once → all dashboards update.

Key variables:
```css
--bg: #0a0c0f;
--surface: #111318;
--surface2: #181c23;
--border: #1e2430;
--accent-5yr: #e040a0;      /* pink */
--accent-15yr: #8b3a2a;     /* brown */
--accent-lt: #2563eb;       /* blue — long-term TF */
--accent-combined: #22c55e; /* green */
--bull: #22c55e;
--bear: #ef4444;
--chop: #f59e0b;
```

Typography: `Bebas Neue` (headings) + `IBM Plex Mono` (body/data)

### Layer 2 — Shared JavaScript (`js/accordion.js`, `js/api.js`, `js/tradingview.js`, `js/backtest.js`, `js/macro.js`, `js/ui.js`)

**`accordion.js`** reads `ASSET_CONFIG` to determine:
- `ltKey` — week-level signal key (`"s34"` / `"s35"` / `"s40"` / `"sLt"`)
- `ltSigKey` — month-level signal key (`"sig34"` / `"sig35"` / `"sig40"` / `"sigLt"`)
- `ltLabel` — column header (`"34-YR"` / `"35-YR"` / `"40-YR"` / `"Long-YR"`)

Injects `ltLabel` into `id="acc-lt-header"`. Handles current month detection. Auto-opens current real calendar month. Also runs `buildQuickJump()` (month quick-jump bar above the accordion) and `buildTFTables()` (dynamic TF table generation — see dedicated section below).

**`api.js`** is the multi-provider AI analysis engine. Gathers up to four context layers (seasonal, curve, backtest, intraday) before calling the selected provider. Supports Claude Sonnet (Anthropic SSE), Gemini Flash (Google SSE), and Ollama (local NDJSON streaming). Config and API keys stored in `localStorage` under `kpt-cfg-*` keys. Injects the provider selector, settings panel, and context bar before `#run-btn` at page load. Dynamically overwrites the panel heading and subtitle at runtime so the label reflects the active provider without requiring HTML changes to any of the 97 asset files. Output streamed token-by-token; rendered as Markdown via dynamically loaded `marked.js`. AI response cached per `kpt-ai-{id}-{provider}-{year}-w{week}`.

**`intraday.js`** is the intraday bias tool. Accepts H1 or H4 MT5 CSV exports; auto-detects timeframe. Produces three result sections: average return by hour (Chart.js bar chart with session shading), by trading session (stat cards with occurrence counts), and by day of week (stat cards with occurrence counts). A signal filter (All / Bull / Bear / Chop) isolates bars from weeks matching the current seasonal signal. Session hours use broker server time (EET, UTC+2). Cache stored as `kpt-idt-{id}` with `schemaVer: 3` — old-format cache is discarded on load so session boundary changes take effect without manual clearing. Session and DoW slots are day-level (one data point per session occurrence / trading day); hourly slots are bar-level. Injects `<section data-kpt-panel="intraday">` before `ui.js` runs.

**`tradingview.js`** injects a TradingView embedded chart widget into `#tv-chart-section > .tv-widget-inner`. Contains a 97-entry symbol lookup table mapping asset IDs to TradingView symbol strings. Widget config: Weekly interval · Dark theme · Allow symbol change · 430px height. Re-triggers layout on Chart tab activation to force iframe render.

**`backtest.js`** is a self-contained CSV price history analysis engine. It injects a `<section data-kpt-panel="backtest">` before the footnote, which `ui.js` discovers and adds as a Backtest tab. Must load before `ui.js`. See the Backtest Panel section below.

**`macro.js`** injects a `<section data-kpt-panel="macro">` containing an Investing.com economic calendar embed, filtered by the currencies relevant to each asset, plus a collapsible asset-class-specific interpretation guide. Must load before `ui.js`. See the Macro Panel section below.

**`ui.js`** is a shared UI enhancement layer loaded on all asset pages. It is a single IIFE with four independent features — see the Tab Layout System and Topbar sections below.

### Layer 3 — Asset Data Files (`data/[asset].js`)

Each file defines three globals:

```javascript
const ASSET_CONFIG = {
  id:       "aud",
  name:     "AUD / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · AUD/USD CME ...",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#2563eb",
};

const MONTHS = [ /* 12 month objects — see data model below */ ];

const SEASONAL_DATA = `/* AI prompt string */`;
```

### Layer 4 — Asset HTML Shells (`assets/[asset].html`)

Thin HTML files (~120–150 lines). Content order (v1.3):
1. `<head>` — link to shared CSS only
2. Topbar (`.topbar`) — prev/next nav and date chip injected by `ui.js`
3. Header + legend — legend toggle injected by `ui.js`
4. **Combined accordion** — first visible section (most actionable); month quick-jump bar injected above it by `accordion.js`
5. **AI panel** — immediately below accordion
6. Divider
7. Individual TF tables (5-YR, 15-YR, long-term) — static on 27 hand-built pages; dynamically generated by `buildTFTables()` on 70 generator pages
8. `#tv-chart-section` — TradingView chart; widget injected by `tradingview.js`
9. Footnote with inline-styled copyright
10. **Nine `<script>` tags** in load order (see below) — **thirteen** on the 4 Profiling-enabled pages (see the Profiling exception below)

**Script load order is critical (9 scripts as of v1.5):**
```html
<script src="../data/[asset].js"></script>           <!-- must be first — defines ASSET_CONFIG, MONTHS, SEASONAL_DATA -->
<script src="../js/accordion.js" defer></script>     <!-- reads ASSET_CONFIG; runs buildAccordion(), buildTFTables() -->
<script src="../js/api.js" defer></script>           <!-- multi-provider AI panel; gathers context from MONTHS, backtest, intraday -->
<script src="../js/tradingview.js" defer></script>   <!-- injects TradingView widget -->
<script src="../js/backtest.js" defer></script>      <!-- injects [data-kpt-panel="backtest"] before ui.js scans -->
<script src="../js/macro.js" defer></script>         <!-- injects [data-kpt-panel="macro"] before ui.js scans -->
<script src="../js/seasonal-chart.js" defer></script><!-- injects [data-kpt-panel="scurve"] before ui.js scans -->
<script src="../js/intraday.js" defer></script>      <!-- injects [data-kpt-panel="intraday"] before ui.js scans -->
<script src="../js/ui.js" defer></script>            <!-- must be last — builds tabs after all content is in DOM -->
```

`backtest.js`, `macro.js`, `seasonal-chart.js`, and `intraday.js` must all load before `ui.js` so their injected `[data-kpt-panel]` elements are in the DOM when `ui.js` scans for panels. `ui.js` must load last because it scans the fully-built DOM for `.combined-wrap`, `.ai-panel`, `.table-wrap`, `#tv-chart-section`, and `[data-kpt-panel]` elements to construct the tab system.

**Profiling exception (v1.7):** `gbp.html`, `fx-gbpusd.html`, `eur.html`, and `fx-eurusd.html` — the only pages with ported Market Profiling data — load four additional scripts between `intraday.js` and `ui.js`:

```html
<script src="../js/intraday.js" defer></script>
<script src="../data/profiling/manifest.js" defer></script>          <!-- freshness (KPT_PROFILING_META) -->
<script src="../data/profiling/gbpusd.js" defer></script>            <!-- or eurusd.js — window.KPT_PROFILING.<key> -->
<script src="../js/profiling-charts.js" defer></script>              <!-- tooltip/glossary/profile-meta/SVG charts, no ASSET_CONFIG dependency -->
<script src="../js/profiling.js" defer></script>                     <!-- injects [data-kpt-panel="profiling"] before ui.js scans -->
<script src="../js/ui.js" defer></script>
```

Unlike every other shared script, these are **not** loaded on all 97 pages — only where Profiling data exists for that asset (see the Profiling Panel section below and `docs/MARKET_PROFILING_INTEGRATION.md`). `profiling.js` early-returns (renders nothing) if `ASSET_CONFIG.id` isn't in its internal asset-key map, so it's harmless to load on an unmapped page, but the convention going forward is still to only add the tag where data actually exists.

---

## Dashboard Section Order (v1.5)

The combined accordion and AI panel are **first** on every asset page. Individual TF tables are below the divider as supporting reference detail. TradingView chart is last before the footnote.

```
Header + Legend (toggle)
[TAB BAR: Seasonals · Trend · Price · History · Sessions · Macro · Analysis]  ← injected by ui.js
  [SUB-TAB BAR: Combined · 5-YR · 15-YR · LT]   ← only on Seasonals tab
  Month quick-jump bar                            ← injected by accordion.js
  Combined accordion
  AI panel
  ── divider ──
  5-YR table | 15-YR table | LT table            ← switched by sub-tabs
[Trend panel: seasonal bias curve chart (scurve)]
[Price panel: TradingView widget (chart)]
[History panel: CSV backtest tool (backtest)]
[Sessions panel: H1/H4 intraday bias tool (intraday)]
[Macro panel: Investing.com calendar + guide]
[Analysis panel: multi-provider AI output]
Footnote + copyright
```

---

## Tab Layout System (`js/ui.js`)

`ui.js` scans the DOM after all other scripts have run and builds the tab navigation system. It is a single IIFE that runs four independent routines:

### Topbar
Injects a live date chip (`WK N · MON YYYY`) and Prev / Next asset navigation buttons into `.topbar`. Prev/Next links are derived from a full `ASSET_CATEGORIES` map (all 97 assets grouped into 11 categories). Navigation stays within category — AUD next goes to USD, USD next goes to JPY, etc.

### Legend Toggle
Inserts a Hide / Legend toggle button above `.legend`. Collapse state is not persisted (resets on page load).

### Primary Tab Bar
Scans for all `[data-kpt-panel]` elements in the DOM. The full ordered tab list (v1.5):

| Panel ID | Tab label | Injected by |
|----------|-----------|-------------|
| `seasonals` | Seasonals | `ui.js` (tags `.combined-wrap`) |
| `scurve` | Trend | `seasonal-chart.js` |
| `chart` | Price | `ui.js` (tags `#tv-chart-section`) |
| `backtest` | History | `backtest.js` |
| `intraday` | Sessions | `intraday.js` |
| `macro` | Macro | `macro.js` |
| `profiling` | Profiling | `profiling.js` (4 pages only — see load-order exception above) |
| `analysis` | Analysis | `ui.js` (tags `.ai-panel`) |

Only tabs whose panel element exists in the DOM are rendered. Tags discovered elements with `data-kpt-panel` using `collectPreceding()` to also capture immediately preceding `.section-label` and `<p>` elements. Builds a `kpt-tabs` bar and inserts it before the first `[data-kpt-panel]` element. Tab switching applies/removes `.kpt-panel-active` (CSS handles visibility). If fewer than 2 panels are found, aborts gracefully.

**Key detail — `.month-quickjump` interrupt:** `collectPreceding()` stops at any non-section-label element. The quickjump bar sits between the "Combined Bias" section-label and `.combined-wrap`, so that label does not get `data-kpt-panel`. This is handled by building `combinedGroupEls` differently (walking back from the quickjump element itself, then appending quickjump + combined-wrap). The orphaned label is a known minor cosmetic issue on Chart/Analysis tabs.

### Secondary TF Sub-Tabs
Builds a `kpt-tabs kpt-subtabs` bar for the four timeframe views: Combined · 5-YR · 15-YR · Long-term. Only activates if at least 3 `.table-wrap` elements exist (skips FX pages and pages without TF tables). Sub-tab switching uses `el.style.display` (inline styles win over `.kpt-panel-active` CSS specificity). Selected sub-tab is persisted to `localStorage` as `kpt-sub-{assetId}`.

**Insertion order (critical):** `subBar` is inserted with `tabBar.parentElement.insertBefore(subBar, tabBar.nextSibling)` — immediately after the primary tab bar in the DOM. An earlier implementation inserted it before `combinedGroupEls[0]` which caused the sub-tabs to appear visually above the primary tabs (inverted hierarchy). The current insertion ensures correct top-to-bottom flow: primary tabs → secondary tabs → content.

**CSS — `.kpt-subtabs`:** `margin-top: -28px` cancels `kpt-tabs`' own `margin-bottom: 28px` so the two rows sit flush. `padding-left: 8px` provides a subtle left indent signalling the secondary level.

---

## Dynamic TF Tables (`buildTFTables()` in `accordion.js`)

`buildTFTables()` is called at the end of `accordion.js` (after `buildAccordion()`). It generates the three individual timeframe tables (5-YR, 15-YR, Long-term) from the `MONTHS[]` data array.

**Why it exists:** The 27 hand-built futures pages (aud, gbp, cad, etc.) have static TF tables coded directly in their HTML. The 70 generator-built pages (`gen_futures_v2.js` output) do not — `buildTFTables()` provides them dynamically with zero HTML file changes.

**Skip guard:** `if (document.querySelectorAll('.table-wrap').length > 0) return;` — if any `.table-wrap` already exists in the HTML, the function exits immediately. This makes it safe to load on all 97 pages.

**Table columns:** Period · Yearly Bias · Monthly Overview · Weekly Detail · Notes — matching the hand-built pages exactly.

**`data-tf-section` tags:** Each generated section-label and table-wrap receives `data-tf-section="five|fifteen|lt"`. The secondary sub-tab system in `ui.js` reads these to show/hide the correct content.

**Insertion:** All generated elements are appended before `#tv-chart-section` (fallback: `.footnote`) to maintain the canonical section order.

---

## Backtest Panel (`js/backtest.js`)

A fully client-side CSV analysis engine injected on all 97 asset pages. No backend required — all processing runs in the browser.

### Panel Injection

`backtest.js` creates a `<section id="backtest-section" data-kpt-panel="backtest">` and inserts it before `.footnote` (fallback: appends to `.container`). Because `ui.js` dynamically scans for `[data-kpt-panel]` elements, the Backtest tab appears automatically in the primary tab bar with zero HTML changes.

### CSV Format

Expects MT5 D1 tab-separated export:
```
<DATE>  <OPEN>  <HIGH>  <LOW>  <CLOSE>  <TICKVOL>  <VOL>  <SPREAD>
1993.05.12  1.53700  1.54450  ...
```

The parser also accepts sub-daily files (M1, H1, H4 — detected by the presence of a `TIME` column). Sub-daily bars are automatically aggregated to one daily close per calendar day, so the engine always works on D1-equivalent data regardless of input timeframe.

### Week-Slot Mapping

Days within a month are assigned to four week slots:

| Days | Slot | Label |
|------|------|-------|
| 1–7  | 0    | Wk 1  |
| 8–14 | 1    | Wk 2  |
| 15–21| 2    | Wk 3  |
| 22+  | 3    | Wk 4  |

### Three-Section Results

**1. Raw Price Tendency** — for each (month, week) cell, the percentage of years in the dataset where the weekly return was positive. Completely model-agnostic. Thresholds: green ≥60%, amber 40–59%, red ≤39%. All 48 cells always have a value.

**2. Win Rate by Period** — for directional (bull/bear) cells only: percentage of years the seasonal signal was correct. Chop/Flip cells show `~` (nothing to validate). Threshold: green ≥65%. The 65% bar is intentionally stricter than the 60% used in Raw Tendency — raw frequency just needs a meaningful lean, while model accuracy needs a genuinely reliable signal.

**3. Average Weekly Return by Month (%)** — average magnitude of weekly price moves per month across all years. Chart.js 4.4.0 bar chart, loaded dynamically from cdnjs on first use. Green bars = positive average drift; red bars = negative drift.

### `computeStats()` Output

```javascript
{
  rawTendency: [ /* [12][4] — { up, total, upPct } */ ],
  matrix:      [ /* [12][4] — { signal, wins, total, winRate, avgReturn } */ ],
  monthlyAvg:  [ /* [12] — average weekly return per month */ ],
  yearRange:   [firstYear, lastYear],
  yearsCount:  Number,
  totalBars:   Number
}
```

### localStorage

Key: `kpt-bt-{assetId}`. Stores the full `stats` object (not raw bars — typically <50KB). On page load, if a stored stats object exists and passes the `rawTendency && matrix && yearRange` guard, results are restored without requiring re-upload. The CSV upload itself is not cached.

### `window.kptBtRefresh()`

Called by `ui.js` each time the Backtest tab is activated. Calls `btChartInstance.resize()` so the Chart.js canvas renders at the correct size after being revealed from `display:none`. If no chart instance exists but `lastStats` is available, re-renders the chart from stored stats.

---

---

## Macro Panel (`js/macro.js`)

A fully client-side economic calendar panel injected on all 97 asset pages. Displays a currency-filtered Investing.com calendar iframe alongside a collapsible asset-class-specific interpretation guide.

### Panel Injection

`macro.js` creates a `<section data-kpt-panel="macro">` and inserts it before `.footnote`. Because `ui.js` dynamically scans for `[data-kpt-panel]` elements, the Macro tab appears automatically in the primary tab bar with zero HTML changes required. `macro.js` must load before `ui.js`.

### Calendar Embed

Source: `https://sslecal2.investing.com` — Investing.com's free webmaster embed widget, explicitly designed for third-party embedding.

**URL structure:**
```
https://sslecal2.investing.com
  ?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous
  &features=datepicker,timezone,filters
  &countries={countryIds}       ← comma-separated Investing.com country ID codes
  &importance=2,3               ← default: medium + high; user can adjust via widget
  &calType=week
  &timeZone=20                  ← UTC
  &lang=1
```

The `filters` feature parameter exposes an in-widget importance toggle bar, so users can switch between High / Medium / Low / All without leaving the dashboard.

**Loading time:** The iframe makes a cold HTTP request to Investing.com on each page load. Expect ~30 seconds on first reveal. The panel header notes this. Within-widget navigation (forward/back week) is fast once loaded.

**Local testing caveat (found v1.7):** The widget works correctly on the deployed domain (`kpt-seasonals.netlify.app`) but fails to load when testing via Live Server on `127.0.0.1` — most likely because Investing.com's free embed widget requires the parent domain to be registered with them, and localhost obviously never was. This is a local-testing-only limitation, not a code bug; don't "fix" it by replacing the iframe based on local test results alone. (An earlier pass in v1.7 mistakenly did exactly this — see `CHANGELOG.md`'s correction entry — after a headless-browser automated check returned a 403 even on the live domain, which turned out to be bot-detection against the automated traffic itself, not a real embedding block. Verify any future Macro-tab issue against a real browser on the live domain before concluding the embed is actually broken.)

**Dark-mode treatment:** The embed uses a white theme. `filter: invert(1) hue-rotate(180deg)` is applied to the iframe — inverts lightness to match the dark dashboard, and the 180° hue rotation corrects colour inversion (red stays red, green stays green).

**ForexFactory:** Was the original target but blocks embedding via `X-Frame-Options: SAMEORIGIN`. A ForexFactory ↗ external link button is still provided for manual use.

### Currency and Country Mapping

Two maps drive the per-asset filtering:

**`FF_CURRENCIES`** — maps all 97 asset IDs to an array of currency codes:
```javascript
'longgilt':   ['GBP'],
'fx-audusd':  ['AUD', 'USD'],
'es':         ['USD'],
```

**`CC`** (Currency → Country IDs) — maps currency codes to Investing.com country ID strings:
```javascript
USD: '5',        GBP: '4',        EUR: '17,26,22',   JPY: '35',
AUD: '25',       CAD: '6',        NZD: '43',         CHF: '12',
MXN: '71',       BRL: '32',       HKD: '39',
```

The `EUR` entry uses `17,26,22` (Eurozone + Germany + France) since Investing.com uses national accounts rather than a single EUR code. Country IDs are deduplicated before constructing the URL — multi-currency assets (e.g. AUDUSD) don't repeat IDs.

### Two-Column Layout

```
┌─────────────────────────────────────────────────┐
│  Macro Header: label · currency chips · links   │
│  Source note: "Default: Medium & High · ..."    │
├────────────────────────┬────────────────────────┤
│  Investing.com iframe  │  Collapsible Guide     │
│  (680px fixed width)   │  (flex: 1, fills rest) │
│  ~560px height         │  ▶ How to use ...      │
│                        │  IMPACT LEGEND         │
│                        │  HIGH / MED / LOW      │
│                        │  Key Events            │
│                        │  How to Interpret      │
│                        │  Category Note         │
└────────────────────────┴────────────────────────┘
```

At `max-width: 1100px`, columns stack vertically (iframe first, then guide below).

### Asset-Class Guide

`ASSET_CLASS` maps all 97 asset IDs to one of 6 categories: `fx`, `rates`, `indices`, `metals`, `energy`, `ags`.

`GUIDE` holds 6 category templates, each with 3 sections:
- **Impact Legend** — HIGH / MED / LOW badge row with plain-English descriptions (shared across all categories)
- **Key Events** — bullet list of the most market-moving releases for that asset class (e.g. rates assets list CPI, FOMC, NFP, GDP, bond auctions)
- **How to Interpret** — category-specific guidance (e.g. metals note the dollar inverse relationship; energy notes EIA inventory surprises; FX notes central bank divergence)
- **Category Note** — one further section: timing (FX/rates), sector rotation (indices), USDA/WASDE (ags), supply chain (energy), macro regimes (metals)

The guide is rendered as a `<details open>` collapsible, using the same `::before` rotating arrow pattern as the Backtest panel's "How to read this" toggle. Default state is open.

### Currency Chips and External Links

The panel header shows:
- Currency chips (e.g. `AUD · USD`) — light-blue badge pills listing which currencies are being filtered
- `Investing.com ↗` — opens the full Investing.com economic calendar
- `ForexFactory ↗` — opens ForexFactory calendar (external, since FF blocks embedding)

---

## Sessions Panel (`js/intraday.js`)

A fully client-side intraday bias analysis tool. Accepts H1 or H4 MT5 CSV exports and produces three result sections: average return by hour, by trading session, and by day of week. Results can be filtered to bars from Bull, Bear, or Chop seasonal weeks.

### Panel Injection

`intraday.js` creates a `<section data-kpt-panel="intraday">` and inserts it before `.footnote`. Because `ui.js` dynamically scans for `[data-kpt-panel]` elements, the Sessions tab appears automatically in the primary tab bar with zero HTML changes. `intraday.js` must load before `ui.js`.

### CSV Format

Expects MT5 H1 or H4 tab-separated export with a TIME column:
```
<DATE>  <TIME>  <OPEN>  <HIGH>  <LOW>  <CLOSE>  ...
2024.01.02  00:00  ...
```

Timeframe is auto-detected from the TIME values: if hour values include 01, 02, 03 etc., it's H1 (24-bucket); if all TIME values end in `:00` with hours only at 00, 04, 08, 12, 16, 20, it's H4 (6-bucket).

### Broker Timezone Offset (v1.6)

A UTC offset dropdown (UTC+0 / UTC+1 / UTC+2 / UTC+3) appears below the upload area. Default is UTC+2 (EET winter). Stored per asset as `kpt-tz-{id}` in localStorage.

Raw hour values from the CSV are normalised to EET before stat accumulation using:
```javascript
normHour = (rawHour - (brokerOffset - 2) + 24) % 24
```
Changing the offset invalidates the cached stats (`localStorage.removeItem(STORE_KEY)`) and requires re-upload.

### Session Definitions (UTC+2 Broker Offset)

All session hours are in **broker server time (EET: UTC+2 winter / UTC+3 summer)**. MT5 exports use the broker's server clock. 00:00 broker = 22:00 UTC (winter standard offset). The `normHour` function normalises CSV hours to this basis regardless of which broker offset the user selects.

**H1 sessions:**

| Session | Hours (broker) | UTC (winter) |
|---------|---------------|--------------|
| Late NY | 00–01 | 22–23 UTC |
| Asian | 02–09 | 00–07 UTC |
| London | 10–14 | 08–12 UTC |
| L/NY Overlap | 15–18 | 13–16 UTC |
| New York | 19–22 | 17–20 UTC |
| After-hours | 23 | 21 UTC |

**H4 sessions:** `00` (Late NY/Sydney) · `04,08` (Asian) · `12` (London) · `16` (L/NY Overlap) · `20` (New York)

### Signal Filter

Each bar is classified using `MONTHS[month].weeks[wkSlot].com`:
- `LONG…` → `bull`
- `SHORT…` → `bear`
- Everything else → `chop`

Filter buttons (All / Bull / Bear / Chop) re-render all three result sections from the same stored stats object — no re-parsing required.

### Three Result Sections

**1. By Hour** — Chart.js bar chart. H1: 24 hourly bars. H4: 6 bars (00, 04, 08, 12, 16, 20). Session zones rendered as coloured background rectangles behind the bars. Green bars = positive average return; red = negative.

**2. By Session** — One stat card per session zone. Each card shows: session name + hour range sublabel, average return percentage, directional arrow (▲ / ▼), and occurrence count (`N / total bars`).

**3. By Day of Week** — One stat card per trading day (Mon–Fri). Same layout as session cards: avg return, arrow, occurrence count.

### `computeStats()` Output

```javascript
{
  schemaVer: 3,               // cache discriminator — MUST be 3 for restore to succeed
  meta: { tf, tfType, totalBars, filteredBars, filter },
  hourList: [ /* 24 or 6 floats — avg return per hour slot */ ],
  groups: {                   // by-session results
    lateNY:  { avg, posCount, count },
    asian:   { avg, posCount, count },
    london:  { avg, posCount, count },
    overlap: { avg, posCount, count },
    ny:      { avg, posCount, count },
    late:    { avg, posCount, count }   // H1 only
  },
  dow: [
    { day: 'Mon', avg, posCount, count },
    ...
  ]
}
```

**Critical:** `sessionDefs` is NOT stored in the stats object. `renderChart()` and `renderSessions()` always derive session definitions from the live `SESSIONS_H1` / `SESSIONS_H4` module-level variables using `stats.tfType`. This prevents stale session boundaries surviving a code update.

### `schemaVer` Cache Invalidation

On page load, the stored `kpt-idt-{id}` object is checked:
```javascript
if (s && s.schemaVer === 3 && s.meta && s.groups && s.hourList) {
  lastStats = s; renderResults(s);
} else if (s) {
  localStorage.removeItem(STORE_KEY); // discard old-format cache silently
}
```

When session boundary definitions change in future, increment `schemaVer` to force all users to re-upload their CSVs.

### `window.kptIdtRefresh()`

Called by `ui.js` each time the Sessions tab is activated. Calls `chartInstance.resize()` so the Chart.js canvas renders at the correct size after being revealed from `display:none`. If no chart instance exists but `lastStats` is available, re-renders from stored stats.

### localStorage

| Key | Contents |
|-----|----------|
| `kpt-idt-{assetId}` | Full stats object (schemaVer 3, ~<30KB). Restore guard: `schemaVer === 3 && meta && groups && hourList`. |
| `kpt-tz-{assetId}` | Broker UTC offset integer (0–3). Default 2 (EET). Written by the timezone selector dropdown. |

---

## Profiling Panel (`js/profiling.js`, `js/profiling-charts.js`) — v1.7

A statistical market-profiling browser — range distributions, time-of-extreme clustering, and a rule-based 8-profile daily taxonomy — ported from the sibling `KPT-Market-Profiling` repo. Unlike every other panel, it's **not** injected on all 97 pages: only on `gbp.html`, `fx-gbpusd.html`, `eur.html`, `fx-eurusd.html` (the 4 pages with ported GBPUSD/EURUSD data). Full background: `docs/MARKET_PROFILING_INTEGRATION.md`.

### Data source

`KPT-Market-Profiling` is a pure Python data-pipeline repo (sibling, `../KPT-Market-Profiling`) — its `stats_engine.py` and `profile_taxonomy.py` compute everything this panel displays from cleaned MT5 daily OHLC history. `scripts/sync_profiling_data.js` (run from this repo's root) reads that pipeline's output and regenerates `data/profiling/*` — re-run it any time the pipeline is re-run for an asset (new CSV, taxonomy change). Not a one-time port: adding an asset means adding it to the script's `ASSETS` list and re-running.

### Panel injection

`profiling.js` resolves `ASSET_CONFIG.id` to a Profiling data key via an internal map (`gbp`/`fx-gbpusd` → `gbpusd`, `eur`/`fx-eurusd` → `eurusd`) and early-returns (renders nothing) if unmapped. When mapped, it reads `window.KPT_PROFILING.<key>` (set by `data/profiling/<key>.js`), builds a `<section data-kpt-panel="profiling">` with all inner containers created by JS (not a static HTML template — see below), and inserts it before `.footnote`, same as `macro.js`/`intraday.js`. `ui.js` discovers it and adds the Profiling tab automatically.

### Why it's a from-scratch DOM build, not a static template

The source `KPT-Market-Profiling/dashboard/js/dashboard.js` assumes it owns the whole page — its HTML shell pre-declares ~15 fixed-ID containers (`#stat-grid`, `#dial`, `#range-daily`, `#heatmap-high`, etc.) that it fills in. That doesn't work inside one panel among seven other tabs, so `profiling.js` instead builds those same containers itself (prefixed `kptp-`) and runs the ported rendering logic against them. The statistical/SVG-drawing logic itself (`js/profiling-charts.js`) has no DOM-ownership assumption baked in — only the "expects a static template" half needed adapting.

### `js/profiling-charts.js` — shared, page-independent library

No dependency on `ASSET_CONFIG` or page structure — loaded by the 4 asset pages (before `profiling.js`) **and** directly by `profiling-calendar/index.html` and `profiling-profiles/detail.html`. Contains:

- `KPTPTooltip` — floating hover tooltip (glossary icons + every chart element attach here)
- `KPTPCharts` — vanilla-SVG chart primitives (`renderRangeStrip`, `renderTimeHeatmap`, `renderBarChart`, `renderCandlestick`) — no charting library, same zero-dependency approach as `accordion.js`/`seasonal-chart.js`
- `KPT_PROFILING_GLOSSARY` + `kptpGlossaryIcon()`/`kptpAttachGlossaryIcons()` — plain-language explanations for every statistical term (percentile, IQR, concentration, etc.)
- `KPTP_PROFILE_COLOR` / `KPTP_PROFILE_ICON_PATH` / `KPTP_PROFILE_META` + `kptpProfileSlug()`/`kptpProfileIconSvg()` — the 8-profile taxonomy's colour, stylized icon, and rule/why/timing copy (sourced from `KPT-Market-Profiling/market-profiling-system-spec.md` §4.2 — keep in sync by hand if either changes)

### CSS — `.kptp-` namespace (critical)

`KPT-Market-Profiling/dashboard/css/dashboard.css` was seeded from an early, much smaller snapshot of this repo's own CSS — several of its class names (`.panel`, `.section-label`, `.header`, `.sub`, `.divider`, `.footnote`, `.dial`, `.mode-note`) now collide with this file's own, unrelated, already-load-bearing classes (`.section-label` in particular is read by `ui.js`'s tab-grouping walk). Every class the Profiling feature introduces is therefore prefixed `.kptp-`, including ones that don't currently collide — this is a blanket rule, not a per-class judgment call. Seven new CSS variables (`--kptp-compression`, `--kptp-expansion`, `--kptp-normal`, `--kptp-asian`, `--kptp-london`, `--kptp-ny`, `--kptp-overlap`) were added to `:root`; the 11 base tokens (`--bg`, `--surface`, `--surface2`, `--border`, `--accent-combined`, `--bull`, `--bear`, `--chop`, `--text`, `--muted`, `--dim`) are reused directly since they're byte-for-byte identical between both repos' `:root` blocks.

### `profiling-calendar/` and `profiling-profiles/` (repo root)

Not sub-tabs — linked from inside the Profiling tab panel ("View full calendar →" / "See profile details →"), same pattern as `assets/` living outside the tab system.

- **`profiling-calendar/index.html`** — a month-grid day browser. With `?a=GBPUSD`, shows that asset's calendar; with no `a` param, shows a cross-asset "all assets on this day" home view (grid coloured by the first-listed asset, click a day to see every asset's stats side by side). One merged controller, `js/profiling-calendar.js` (the source repo split this into three files — `calendar.js`/`calendar-page.js`/`calendar-home.js` — merged here into one mode-detecting controller since both views live behind a single route in this repo). Year data (`data/profiling/calendar/<asset>/<year>.js`) loads on demand via a dynamically injected `<script>` tag, already namespaced `window.KPT_CALENDAR[ASSET][YEAR]` by the source pipeline (copied verbatim — no transform needed).
- **`profiling-profiles/detail.html`** (`?p=<slug>&a=<assetkey>`) — one templated page for all 8 profiles (not 8 files), showing the rule/why/timing copy. With `a` present, loads just that asset's data on demand (`KPTPData.loadAsset()`, `js/profiling-charts.js`) and shows its stats + a real illustrative M15 candlestick example. With no `a`, shows a prompt instead of any data. Controller: `js/profiling-profile-detail.js`. Unlike the source (which had to reference bare `const` identifiers because its data files weren't `window`-namespaced — see `market-profiling-system-spec.md` §5.3), this port's data already resolves via `window.KPT_PROFILING`/`window.KPT_PROFILING_EXAMPLES`, so that workaround isn't needed.
- **`profiling-profiles/compare.html`** (`?p=<slug>&a=<focus-assetkey>&assets=key1,key2,...`) — v1.9 follow-up (see `docs/PLATFORM_ROADMAP.md` Tier 2): cross-asset comparison for one profile, with a picker capped at 10 assets. Replaced an earlier inline "compare across all assets" toggle on `detail.html` that rendered every known asset inline — fine at 2 assets, but doesn't scale as more are added. The asset list comes from `Object.keys(window.KPT_PROFILING_META)` (`data/profiling/manifest.js`), not a hardcoded array — a new Profiling asset appears in the picker automatically once its data is synced, no code change. Each selected asset's data loads on demand via the same `KPTPData.loadAsset()`; only picked assets are ever fetched. Controller: `js/profiling-compare.js`. Selection state round-trips through the `assets` URL param (`history.replaceState`) so a specific comparison is bookmarkable/shareable.
- **`js/profiling-charts.js`'s `KPTPData`** — the shared dynamic-loading helper both of the above use (`loadAsset(key, dataBase)`), added alongside `compare.html`. Same on-demand `<script>`-injection pattern `js/profiling-calendar.js`'s year-file loader already used, generalized so pages needing one or a few assets' data don't need to hardcode a `<script>` tag per known Profiling asset.

### `scripts/sync_profiling_data.js`

Reads `../KPT-Market-Profiling/dashboard/data/{<asset>.js, profile-examples/<asset>.js, calendar/<asset>/}` for each asset in its `ASSETS` list (`vm.createContext` to safely evaluate the source's `const X = {...}` files) and writes:

- `data/profiling/<asset>.js` → `window.KPT_PROFILING.<asset> = {...}` (const-vs-window fix — the source declares a bare `const`, a lexical binding invisible to `window`, same gotcha `KPT-Market-Profiling`'s own calendar loader already had to solve once)
- `data/profiling/profile-examples/<asset>.js` → `window.KPT_PROFILING_EXAMPLES.<asset> = {...}` (same fix)
- `data/profiling/calendar/<asset>/*` — copied verbatim (already correctly namespaced by the source pipeline)
- `data/profiling/manifest.js` → `window.KPT_PROFILING_META` (per-asset `asOf` freshness, sourced from each bundle's own `stats.as_of`)

Run any time the KPT-Market-Profiling pipeline is re-run for an asset. Adding a new asset is: add its key to `ASSETS`, re-run the script, add its id(s) to `profiling.js`'s asset-key map, add the 4 script tags + attribution to its page(s).

---

## Analysis Panel (`js/api.js`)

A multi-provider AI analysis engine that gathers seasonal, curve, backtest, and intraday context before calling the selected model.

### Provider Support

| Provider | Model | Endpoint | Streaming |
|----------|-------|----------|-----------|
| Claude | claude-sonnet-5 | `api.anthropic.com/v1/messages` | SSE (`text_stream`) |
| Gemini | gemini-1.5-flash | `generativelanguage.googleapis.com/…/streamGenerateContent?alt=sse` | SSE |
| Ollama | user-configured | `{url}/api/generate` | NDJSON line-by-line |

Config stored in localStorage: `kpt-cfg-claude-key`, `kpt-cfg-gemini-key`, `kpt-cfg-ollama-url`, `kpt-cfg-ollama-model`.

### Context Layers

`runAnalysis()` gathers four context layers before building the prompt:

**1. Seasonal** (always) — reads `MONTHS[]` directly; extracts month-level combined signal and top/bottom 3 months by conviction stars.

**2. Curve** (`_gatherCurveCtx()`) — converts `MONTHS[]` to a 48-point cumulative directional curve (same algorithm as `seasonal-chart.js`). Returns:
- `curVal` — current cumulative value at today's week slot
- `trend4w` — change over last 4 weeks (`up` / `down` / `flat`)
- `pctRange` — current value as % of the annual min–max range

**3. History** (`_gatherBacktestCtx(assetId)`) — reads `kpt-bt-{id}`. Returns overall win rate, plus top 2 months by win rate and top 2 months by avg return (and their bottom counterparts). Returns `null` if no backtest data uploaded.

**4. Sessions** (`_gatherIntradayCtx(assetId)`) — reads `kpt-idt-{id}`. Rejects if `schemaVer !== 3`. Returns best and worst session (by avg return) and best and worst day of week. Returns `null` if no intraday data uploaded or cache is stale.

### UI Injection (`_injectUI()`)

Called once at page load. Inserts before `#run-btn`:
- Provider pill buttons (Claude · Gemini · Ollama)
- Settings gear toggle → expandable panel with key/URL/model inputs + Save button
- Context bar chips (✓ Seasonal · ✓ Curve · ✓/○ History · ✓/○ Sessions)
- Hint text showing which provider is active

### Dynamic Panel Headings (`_updatePanelHeadings(prov)`)

Rewrites two DOM elements at runtime on every provider switch and on page load:
- The `.section-label` immediately preceding `.ai-panel` → `"Seasonal Bias Analysis"` (preserving the coloured dot span)
- `.ai-panel .ai-label` → `_providerLabel(prov) + ' · Live Analysis'`

`_providerLabel()` returns `"Claude Sonnet"` / `"Gemini Flash"` / `"Ollama · {model}"`.

This allows all 97 HTML files to keep their original hardcoded heading text as a static fallback — the JS overwrites it on every load. No HTML patch required.

### Prompt Structure

`_buildPrompt(curveCtx, btCtx, idtCtx)` assembles a structured prompt with:
1. Asset identity (name, current date, current seasonal signal)
2. Full 12-month seasonal grid (month · combined signal · stars · week-level detail)
3. Curve position (current value · trend · % of annual range)
4. Backtest stats (if available)
5. Intraday bias (if available)
6. Explicit output format instructions (VERDICT heading, data table, outlook, trade notes)

### AI Cache

Key: `kpt-ai-{id}-{provider}-{year}-w{week}`. Cache is per-week and per-provider — switching models produces a fresh call. Cached response is restored on page load if the week matches.

**Cache clear button (v1.6):** When a cached response is loaded on page open, a `.ai-cache-bar` element is inserted above the output. It contains a "✕ Clear & re-run" button that calls `localStorage.removeItem(_cacheKey())` and immediately re-runs analysis. This allows users to incorporate newly uploaded CSV data without waiting for the weekly cache expiry.

---

## Index Page (`index.html`)

### Sticky Navigation Bar
A `position: sticky; top: 0` nav bar with `backdrop-filter: blur` sits above all content. Contains 13 jump links in two groups:

**Futures:** Currencies · Metals · Energy · Rates · Indices · Softs · Grains · Fiber · Meats  
**Forex:** Majors · Minors · Crosses

Active link highlights automatically via `IntersectionObserver` as the user scrolls. Nav scrolls horizontally on mobile without wrapping.

### Two Top-Level Sections
1. **Futures Seasonals** — source: Moore Research Center CME/CBOT/ICE/etc. charts
2. **Forex Seasonals** — derived from CME futures pair combinations

Each section has `id` attributes on all subsections matching the nav link `href` values.

### Asset Cards
- `status-complete` — clickable, full colour, shows "Live" badge + arrow
- `status-planned` — greyed out (opacity 0.45), pointer-events none, shows "PLANNED" badge
- Forex cards show `card-badge derived` pills for each component futures dataset

**Status badge rule:** The badge inside `.card-signal` must always use `<span class="bull-tag">Live</span>` for all live assets initially. At page load, the signal injection IIFE replaces this with the live signal from `SIGNALS_MANIFEST`.

**Signal type tagging (v1.6):** The signal injection loop also sets `card.dataset.sigType = t.type` (`bull` / `bear` / `chop`) on each card. The signal filter bar reads this attribute to show/hide cards without re-querying the manifest.

### Signal Filter Bar (v1.6)

An "All / Bull / Bear / Other" filter strip between the search bar and sticky nav. Implemented as a small IIFE at the end of the signal injection `<script>`. On click, toggles `.sig-hidden` on cards whose `data-sig-type` doesn't match. Also dims grid section headers where all cards are hidden (`.section-all-hidden`). The filter bar is hidden until `SIGNALS_MANIFEST` loads (`panel.style.display = ''`).

### Signals Manifest Freshness (v1.6)

`data/signals_manifest.js` now exports `const SIGNALS_GENERATED = '…ISO date…'` in addition to `SIGNALS_MANIFEST`. The signal injection IIFE reads this and shows a "Signal data as of [date]" note inside the This Week panel. Allows users to see when the manifest was last rebuilt without opening DevTools.

**Available signal tag classes:** `.bull-tag` (green) · `.bear-tag` (red) · `.chop-tag` (amber) · `.neutral-tag` (grey, for PLANNED)

---

## Data Model

### Futures Asset — Month Object
```javascript
{
  month: "April",
  sig5:  "bear",      // 5-yr signal: bull | bear | chop | flip
  sig15: "bear",      // 15-yr signal
  sig34: "bear",      // long-term signal (key name varies: sig34 / sig35 / sig40)
  combined: "flip",   // combined signal
  combinedLabel: "FLIP MONTH",
  stars: 5,           // 1–5 conviction
  note: "Most critical month. Long Wk1, flip short Wk2 onwards.",
  weeks: [
    { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG → FLIP ★★★★☆", note:"..." },
    { wk:"Wk 2", s5:"bear", s15:"bear", s34:"chop", com:"SHORT ★★★☆☆",       note:"..." },
    { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★",       note:"..." },
    { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★",       note:"..." },
  ]
}
```

Signal values → CSS classes: `bull` → `.bull-tag` (green) · `bear` → `.bear-tag` (red) · `chop` / `flip` → `.chop-tag` (amber)

### Forex Asset — Month Object
Same structure but uses `sigLt` / `sLt` as the long-term key (since the "long-term" signal is the synthesised combination, not a single named timeframe).

---

## Forex Dashboard Differences

Forex dashboards (`assets/fx-*.html`) differ from futures dashboards:
- **No individual TF tables** — data is synthesised from two futures sources, not raw charts
- **Methodology note** at top explaining the derivation
- **Component cards** showing the two source futures datasets
- **`ASSET_CONFIG.ltLabel` = `"Long-YR"`** and `ltSigKey = "sigLt"`, `ltKey = "sLt"`
- Footnote credits both source datasets

---

## Adding a New Futures Asset

Three files required:

**1. `data/[asset].js`** — copy `data/aud.js` as template. Update:
- `ASSET_CONFIG` — all fields, especially `ltLabel`, `ltSigKey`, `ltKey`
- `MONTHS[]` — 12 month objects with full Wk1–4 week data
- `SEASONAL_DATA` — AI prompt string with all 3 TF readings + TASK section

**2. `assets/[asset].html`** — copy `assets/aud.html`. Update:
- `<title>`, `<h1>`, `.sub` text
- Legend long-term TF label
- All three static TF tables (hand-built pages only; generator pages use `buildTFTables()`)
- Footnote — use exact pattern with inline-styled copyright span (see SKILL.md)
- Script src tags in correct order: `data/[asset].js` → `accordion.js` → `api.js` → `tradingview.js` → `backtest.js` → `macro.js` → `seasonal-chart.js` → `intraday.js` → `ui.js` (9 scripts total)

**3. `index.html`** — find the planned card, change:
- `status-planned` → `status-complete`
- `href="#"` → `href="assets/[asset].html"`
- Update timeframe badges to actual TFs

**4. If using the generator (`gen_futures_v2.js`):** Add the new asset config to the relevant category array and re-run `node gen_futures_v2.js`. Re-run `node gen_signals_manifest.js` to update the index signals.

Deploy: commit all changed files, push to `main`. Netlify detects the push and auto-deploys within ~60 seconds.

---

## Adding a New Forex Asset

Same three-file pattern but:
- `data/fx-[pair].js` — uses `sigLt`/`sLt` keys, `SEASONAL_DATA` explains component methodology
- `assets/fx-[pair].html` — copy `assets/fx-audusd.html`, update component cards and footnote
- No individual TF tables in the HTML shell

---

## Copyright Pattern (Critical)

Every asset footnote must use this exact pattern:

```html
<div class="footnote">
  Seasonal data source: Moore Research Center © 2020 · [ASSET] · [XX]-Year Seasonal ([YEAR]–2019) · 15-Year · 5-Year overlays.<br>
  This analysis is based on historical seasonal tendencies only and does not constitute financial advice. Past seasonals do not guarantee future performance.
  <span class="copyright" style="display:block;margin-top:10px;padding-top:10px;border-top:1px solid #1e2430;color:#94a3b8;letter-spacing:0.8px;font-size:11px;">© 2026 Kaminari Precision Trading. All rights reserved. &nbsp;·&nbsp; Dashboard interface design and analysis framework by Kaminari Precision Trading. Seasonal tendency data sourced from Moore Research Center.</span>
</div>
```

**The inline style on `<span>` is mandatory** — do not rely on the CSS class alone. The inline style ensures the copyright renders regardless of CSS load order or browser caching.

---

## Critical ID Requirements

`accordion.js` and `api.js` are shared files that target specific hard-coded element IDs. Every asset HTML shell must have these exactly:

| Element | Required ID / class | Used by |
|---------|-------------------|---------|
| Accordion tbody | `id="acc-body"` | `accordion.js` |
| AI button | `id="run-btn"` + `class="run-btn"` | `api.js` |
| AI output div | `id="ai-output"` | `api.js` |
| LT column header | `id="acc-lt-header"` | `accordion.js` (auto-populated from `ASSET_CONFIG.ltLabel`) |

**Common failure mode:** If a new asset page is copied from an older template (pre-v0.6), it may have `id="accordion-body"` and `id="ai-btn"` — both wrong. The accordion builds silently empty and the AI button does nothing. Always verify IDs when a page looks broken.

---

## Common Errors and Fixes

| Problem | Fix |
|---------|-----|
| Accordion table empty / not building | `accordion.js` targets `id="acc-body"` — check the `<tbody>` has exactly this ID (not `accordion-body` or anything else) |
| AI button does nothing | `api.js` targets `id="run-btn"` — check the button has `id="run-btn"` and `class="run-btn"` (not `ai-btn`) |
| AI button unstyled | `.ai-btn` is NOT defined in `dashboard.css`. Must use `class="run-btn"` |
| Long-term column shows wrong label | Check `ASSET_CONFIG.ltLabel` matches `ltSigKey` / `ltKey` keys used in `MONTHS[]` |
| AI button cuts off mid-analysis | Raise `max_tokens` in `js/api.js` (currently 2500) |
| Copyright not showing | Ensure `<span>` uses inline styles, not CSS class only |
| Live Server works but Netlify deploy doesn't render correctly | Check relative paths — `../css/dashboard.css` requires assets in `assets/` subfolder; do not use absolute paths starting with `/` |
| AI button returns empty | Check API key active at console.anthropic.com |
| Sticky nav doesn't highlight | Check section `id` attributes match nav link `href` values exactly |
| Index card shows wrong signal (BEAR/BULL on live asset) | Hardcoded signal tags go stale — always use `<span class="bull-tag">Live</span>` until dynamic status is implemented |
| Tab bar missing / content not switching | `ui.js` must load after all other scripts — it scans the DOM for content elements built by accordion.js and api.js |
| Secondary sub-tabs not showing | Page needs at least 3 `.table-wrap` elements; FX pages and pages missing TF tables will not get sub-tabs |
| Sub-tabs appear above primary tabs | The subBar insertion must use `tabBar.parentElement.insertBefore(subBar, tabBar.nextSibling)` — inserting before `combinedGroupEls[0]` places it above the primary tabs |
| TF tables generated twice | The `buildTFTables()` skip guard checks `.table-wrap` count — if static tables exist in HTML, generation is skipped |
| Prev/Next nav links wrong category | Check that `ASSET_CONFIG.id` exactly matches the ID string in the `ASSET_CATEGORIES` map in `ui.js` |
| Backtest tab missing from tab bar | `backtest.js` must load before `ui.js` — the `[data-kpt-panel="backtest"]` element must exist when `ui.js` scans the DOM |
| Backtest chart not visible on tab activate | `window.kptBtRefresh()` is called by `ui.js` on tab activation; check `kptBtRefresh` is defined in `backtest.js` and `backtest.js` loads before `ui.js` |
| "Only N valid bars found" alert on valid CSV | Check the file is D1 (not tick data); check separator is tab or comma; ensure date format is `YYYY.MM.DD` or `YYYY-MM-DD` |
| Backtest results lost on page reload | localStorage key is `kpt-bt-{assetId}` — check `ASSET_CONFIG.id` is set correctly in the data file |
| `<strong>` text in upload guide breaks to new line | `.bt-upload-steps li` uses `position: absolute` for the step number — do not change to `display: grid` or `display: flex`, which turns `<strong>` inline elements into separate grid/flex items |
| Macro tab missing from tab bar | `macro.js` must load before `ui.js` — the `[data-kpt-panel="macro"]` element must exist when `ui.js` scans the DOM |
| Macro calendar shows wrong country events | Check `FF_CURRENCIES` map in `macro.js` has the correct asset ID and currency codes; check `CC` map has the correct Investing.com country ID for that currency |
| Macro embed shows blank white iframe / "restore the link" message when testing locally | Expected on `127.0.0.1`/Live Server — Investing.com's free widget requires the parent domain to be registered with them; localhost isn't. Works correctly on the deployed domain. Do not treat this as evidence the embed is broken in production — verify against the live site with a real browser before "fixing" anything here (see v1.7's correction entry in `CHANGELOG.md`). |
| Macro embed white theme clashing with dark dashboard | `filter: invert(1) hue-rotate(180deg)` on `.macro-iframe` — check it hasn't been removed from `dashboard.css` |
| Macro guide shows wrong content | Check `ASSET_CLASS` map in `macro.js` has the correct asset ID mapped to one of: fx, rates, indices, metals, energy, ags |
| New asset has no macro tab | Add the new asset ID to both `FF_CURRENCIES` and `ASSET_CLASS` in `macro.js`; ensure `macro.js` script tag is in the asset HTML before `ui.js` |
| Sessions tab missing from tab bar | `intraday.js` must load before `ui.js` — the `[data-kpt-panel="intraday"]` element must exist when `ui.js` scans the DOM |
| Sessions chart not visible on tab activate | `window.kptIdtRefresh()` is called by `ui.js` on activation; check `kptIdtRefresh` is defined in `intraday.js` and `intraday.js` loads before `ui.js` |
| Sessions shows old session shading after timezone fix | Old cache used `stats.sessionDefs` (stale). Fix: cache now requires `schemaVer: 3`; session defs are always derived at render time from live `SESSIONS_H1`/`SESSIONS_H4` variables |
| Sessions upload shows "only N valid bars" on H1 CSV | Verify the TIME column is present and format is `HH:MM`; separator must be tab or comma |
| Session filter (Bull/Bear/Chop) shows no bars | CSV uploaded when `MONTHS[]` data was unavailable or `ASSET_CONFIG` undefined — re-upload; check data file loads before `intraday.js` |
| AI panel says "Claude AI" instead of active provider | `_updatePanelHeadings()` is called at init — check `api.js` loads and `#run-btn` exists in the DOM; the function rewrites `.ai-label` at startup |
| AI Settings panel not appearing | `_injectUI()` targets `#run-btn` — check the AI button has `id="run-btn"` (not `id="ai-btn"`) |
| Ollama "Failed to fetch" | (1) Ollama not running — run `start_kpt.bat`; (2) CORS not enabled — must use `set OLLAMA_ORIGINS=* && ollama serve` in same process; (3) Wrong URL — use `http://localhost:11434`, not `…/v1` |
| Gemini / Claude returns 401 | Check API key is saved via the Settings gear icon; key stored in `kpt-cfg-{provider}-key` in localStorage |
| AI response not cached (re-calls on every page load) | Cache key is `kpt-ai-{id}-{provider}-{year}-w{week}` — check `ASSET_CONFIG.id` is set correctly; cache expires automatically when the week changes |
| AI cached result doesn't reflect new CSV data | Click the "✕ Clear & re-run" button in the cache bar above the AI output; it removes the localStorage entry and re-runs `runAnalysis()` immediately |
| Signal filter bar missing or shows no buttons | `data/signals_manifest.js` must be loaded in `index.html` before the signal injection `<script>` block; the filter bar is hidden until `SIGNALS_MANIFEST` is defined |
| Signal filter shows "0 assets" for a category | The `data-sig-type` attribute is only set during the manifest injection loop — if a card was added to `index.html` without a matching entry in `SIGNALS_MANIFEST`, it will not be tagged and will never show under a filter |
| Signals freshness note is missing or shows wrong date | `SIGNALS_GENERATED` must be exported as a `const` (not just a comment) in `signals_manifest.js` — run the manifest generator script and verify `const SIGNALS_GENERATED = '…'` is present |
| Sessions tab: changing timezone shows "re-upload" prompt | Expected behaviour — timezone offset is applied at parse time, so existing cached data cannot be reused; re-upload the CSV to recalculate with the new offset |
| Sessions hour bars shifted by 1 after broker TZ change | Check `_normHour()` in `intraday.js` — formula is `(rawHour - (offset - 2) + 24) % 24`; offset is stored in `kpt-tz-{id}` localStorage key; EET (UTC+2) → offset 2 = zero shift |
| TradingView chart shows wrong instrument | Add `tvSymbol: "EXCHANGE:SYMBOL"` to the asset's `ASSET_CONFIG` in its data file; `tradingview.js` checks `ASSET_CONFIG.tvSymbol` first, then falls back to the built-in `TV_SYMBOLS` table |
| "Print tab" button shows all tabs in print output | `body.print-single-tab` class must be present during the print call; `ui.js` adds it, opens `window.print()`, then removes it in a `setTimeout(1000)` — if the class is stuck (e.g. from a crash), open DevTools console and run `document.body.classList.remove('print-single-tab')` |
| Signals not injecting on Netlify (index shows STATUS LIVE instead of SIGNAL CHOP) | Netlify Pretty URLs rewrites `href="assets/aud.html"` → `href="/assets/aud"`, breaking the old regex `/assets\/(.+)\.html/`. The fixed regex is `/assets\/([^./?#]+)/` — this matches both the local `.html` format and the Netlify pretty-URL format. If reverting, do not use `.+\.html` as the capture. |
| Trend tab NOW badge wraps to second line on Netlify | Netlify pages have a vertical scrollbar (~17px) that narrows the viewport, pushing `.sc-header` past its wrap threshold. Fix: set `flex-wrap: nowrap` on `.sc-header` and `min-width: 0` on `.sc-header-left`. Do not restore `flex-wrap: wrap` — it was only harmless locally because the local `file://` view has no scrollbar. |
| Profiling tab missing on gbp/eur pages | `profiling.js` must load before `ui.js`, and both `data/profiling/manifest.js` + `data/profiling/{gbpusd\|eurusd}.js` must load before `profiling.js` — check the 4 script tags are present and in order (see the Profiling load-order exception above). `profiling.js` also silently no-ops if `ASSET_CONFIG.id` isn't in its internal asset-key map. |
| Profiling tab shows on a page it shouldn't | Only add the `profiling.js`/`profiling-charts.js`/data script tags to pages with ported data — `profiling.js`'s early-return means it's harmless but pointless to load elsewhere; keep the convention of only wiring the 4 (growing) in-scope pages |
| Profiling charts/tooltips broken or unstyled | Check `js/profiling-charts.js` loads before `js/profiling.js`; check no new profiling class was introduced without the `.kptp-` prefix (audit `css/dashboard.css`'s Market Profiling block before adding one) |
| Profiling data stale after a fresh CSV upload | Re-run the KPT-Market-Profiling pipeline, then `node scripts/sync_profiling_data.js` from `seasonal-dashboard/` root — the Profiling tab shows "Data as of …" sourced from `data/profiling/manifest.js`, regenerated by that script |
| Profiling calendar/profile-detail/compare page blank or console error | `profiling-calendar/index.html`, `profiling-profiles/detail.html`, and `profiling-profiles/compare.html` each load `js/profiling-charts.js` directly (they're outside the tab system, not `ASSET_CONFIG`-dependent) — check that tag is present. `detail.html` and `compare.html` no longer hardcode per-asset data script tags — they load via `KPTPData.loadAsset()` on demand; check the browser network tab for a failed `data/profiling/<key>.js` or `profile-examples/<key>.js` request if a specific asset's data doesn't appear. `compare.html` also needs `data/profiling/manifest.js` loaded for its asset picker. |
