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
│   ├── macro.js             ← Investing.com economic calendar embed + asset-class guide
│   ├── seasonal-chart.js    ← seasonal bias curve chart (Chart.js, 48-point cumulative)
│   ├── upload.js            ← unified CSV upload tool (Tier 4): any timeframe M1–MN1 → seasonal
│   │                            tendency (ex-Backtest) + intraday timing (ex-Sessions) stats
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
│   ├── patch_add_macro.js           ← one-shot: inserted macro.js into all 97 HTML files
│   ├── patch_add_seasonal_chart.js  ← one-shot: inserted seasonal-chart.js into all 97 HTML files
│   └── patch_swap_upload.js         ← one-shot (Tier 4): replaced backtest.js+intraday.js tags
│                                        with upload.js across all 98 HTML files
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

### Layer 2 — Shared JavaScript (`js/accordion.js`, `js/api.js`, `js/tradingview.js`, `js/upload.js`, `js/macro.js`, `js/ui.js`)

**`accordion.js`** reads `ASSET_CONFIG` to determine:
- `ltKey` — week-level signal key (`"s34"` / `"s35"` / `"s40"` / `"sLt"`)
- `ltSigKey` — month-level signal key (`"sig34"` / `"sig35"` / `"sig40"` / `"sigLt"`)
- `ltLabel` — column header (`"34-YR"` / `"35-YR"` / `"40-YR"` / `"Long-YR"`)

Injects `ltLabel` into `id="acc-lt-header"`. Handles current month detection. Auto-opens current real calendar month. Also runs `buildQuickJump()` (month quick-jump bar above the accordion) and `buildTFTables()` (dynamic TF table generation — see dedicated section below).

**`api.js`** is the multi-provider AI analysis engine. Gathers up to four context layers (seasonal, curve, backtest, intraday) before calling the selected provider. Supports Claude Sonnet (Anthropic SSE), Gemini Flash (Google SSE), and Ollama (local NDJSON streaming). Config and API keys stored in `localStorage` under `kpt-cfg-*` keys. Injects the provider selector, settings panel, and context bar before `#run-btn` at page load. Dynamically overwrites the panel heading and subtitle at runtime so the label reflects the active provider without requiring HTML changes to any of the 97 asset files. Output streamed token-by-token; rendered as Markdown via dynamically loaded `marked.js`. AI response cached per `kpt-ai-{id}-{provider}-{year}-w{week}`.

**`tradingview.js`** injects a TradingView embedded chart widget into `#tv-chart-section > .tv-widget-inner`. Contains a 97-entry symbol lookup table mapping asset IDs to TradingView symbol strings. Widget config: Weekly interval · Dark theme · Allow symbol change · 430px height. Re-triggers layout on Live Price tab activation to force iframe render.

**`upload.js`** (Tier 4, replaces the former `backtest.js` + `intraday.js`) is the unified CSV upload tool. One shared parser/timeframe detector accepts any MT5 export granularity from M1 (1-minute) through MN1 (Monthly) — a real median inter-bar-timestamp gap in minutes is matched to the nearest standard tier, robust to weekend/holiday gaps. Two views, shown only when the detected tier supports them: Seasonal Tendency (ex-Backtest — raw up-frequency, win-rate vs. the seasonal model, and average return per month/week-of-month slot; available for every tier, with MN1 uploads collapsing to a single "Month" slot since a monthly bar has no week-of-month resolution) and Intraday Timing (ex-Sessions — average return by hour, session, and day of week; only possible for sub-daily tiers M1–H4). It injects a single `<section data-kpt-panel="upload">` before the footnote. Must load before `ui.js`. See the Upload Panel section below.

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

**Script load order is critical (8 scripts as of Tier 4):**
```html
<script src="../data/[asset].js"></script>           <!-- must be first — defines ASSET_CONFIG, MONTHS, SEASONAL_DATA -->
<script src="../js/accordion.js" defer></script>     <!-- reads ASSET_CONFIG; runs buildAccordion(), buildTFTables() -->
<script src="../js/api.js" defer></script>           <!-- multi-provider AI panel; gathers context from MONTHS, upload, profiling -->
<script src="../js/tradingview.js" defer></script>   <!-- injects TradingView widget -->
<script src="../js/macro.js" defer></script>         <!-- injects [data-kpt-panel="macro"] before ui.js scans -->
<script src="../js/seasonal-chart.js" defer></script><!-- injects [data-kpt-panel="scurve"] before ui.js scans -->
<script src="../js/upload.js" defer></script>        <!-- injects [data-kpt-panel="upload"] before ui.js scans -->
<script src="../js/ui.js" defer></script>            <!-- must be last — builds tabs after all content is in DOM -->
```

`macro.js`, `seasonal-chart.js`, and `upload.js` must all load before `ui.js` so their injected `[data-kpt-panel]` elements are in the DOM when `ui.js` scans for panels. `ui.js` must load last because it scans the fully-built DOM for `.combined-wrap`, `.ai-panel`, `.table-wrap`, `#tv-chart-section`, and `[data-kpt-panel]` elements to construct the tab system.

**Profiling exception (v1.7, extended Tier 4 — 11 pages):** the pages with ported Market Profiling data load four additional scripts between `upload.js` and `ui.js`:

```html
<script src="../js/upload.js" defer></script>
<script src="../data/profiling/manifest.js" defer></script>          <!-- freshness (KPT_PROFILING_META) -->
<script src="../data/profiling/[key].js" defer></script>             <!-- window.KPT_PROFILING.<key> -->
<script src="../js/profiling-charts.js" defer></script>              <!-- tooltip/glossary/profile-meta/SVG charts, no ASSET_CONFIG dependency -->
<script src="../js/profiling.js" defer></script>                     <!-- injects [data-kpt-panel="profiling"] before ui.js scans -->
<script src="../js/ui.js" defer></script>
```

Unlike every other shared script, these are **not** loaded on all 98 pages — only where Profiling data exists for that asset (see the Profiling Panel section below and `docs/MARKET_PROFILING_INTEGRATION.md`). `profiling.js` early-returns (renders nothing) if `ASSET_CONFIG.id` isn't in its internal asset-key map, so it's harmless to load on an unmapped page, but the convention going forward is still to only add the tag where data actually exists.

---

## Dashboard Section Order (v1.5)

The combined accordion and AI panel are **first** on every asset page. Individual TF tables are below the divider as supporting reference detail. TradingView chart is last before the footnote.

```
Header + Legend (toggle)
[TAB BAR: Seasonals · Trend · Profiling · Live Price · Macro · Upload · Analysis]  ← injected by ui.js
  [SUB-TAB BAR: Combined · 5-YR · 15-YR · LT]   ← only on Seasonals tab
  Month quick-jump bar                            ← injected by accordion.js
  Combined accordion
  AI panel
  ── divider ──
  5-YR table | 15-YR table | LT table            ← switched by sub-tabs
[Trend panel: seasonal bias curve chart (scurve)]
[Profiling panel: pre-computed Market Profiling stats (11 pages only)]
[Live Price panel: TradingView widget (chart)]
[Macro panel: Investing.com calendar + guide]
[Upload panel: unified CSV upload tool — Seasonal Tendency + Intraday Timing views (upload)]
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
| `profiling` | Profiling | `profiling.js` (11 pages only — see load-order exception above) |
| `chart` | Live Price | `ui.js` (tags `#tv-chart-section`) |
| `macro` | Macro | `macro.js` |
| `upload` | Upload | `upload.js` |
| `analysis` | Analysis | `ui.js` (tags `.ai-panel`) |

**Tier 4 note (unified Upload tab):** `upload` replaced the former `backtest`/`intraday` tab pair. `id: 'chart'` was kept unchanged (only its label became "Live Price") so the TradingView reflow special-case in `activateTab()` didn't need touching. The order above is the actual visual order — array order in `js/ui.js`'s `tabs` list drives tab-bar order directly.

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

## Upload Panel (`js/upload.js`) — Tier 4

A fully client-side CSV upload tool injected on all 98 asset pages. No backend required — all processing runs in the browser. Replaces the former separate Backtest ("History") and Sessions panels with one shared parser and two views, each shown only when the uploaded data supports it.

### Panel Injection

`upload.js` creates a `<section id="upload-section" data-kpt-panel="upload">` and inserts it before `.footnote` (fallback: appends to `.container`). Because `ui.js` dynamically scans for `[data-kpt-panel]` elements, the Upload tab appears automatically in the primary tab bar with zero HTML changes. `upload.js` must load before `ui.js`.

### CSV Format & Timeframe Detection

Expects an MT5 export, tab- or comma-separated (auto-detected from the first 5 lines), either:
```
<DATE>  <OPEN>  <HIGH>  <LOW>  <CLOSE>  <TICKVOL>  <VOL>  <SPREAD>     (no TIME column — D1/W1/MN1)
<DATE>  <TIME>  <OPEN>  <HIGH>  <LOW>  <CLOSE>  <TICKVOL>  <VOL>  <SPREAD>   (has TIME column — M1–H4)
```

Timeframe is detected by `detectTier()` from the **median gap between consecutive bar timestamps, in minutes** (a median rather than a mean so weekend/holiday gaps don't skew the coarser tiers) — matched to the nearest of nine standard tiers by relative error:

| Tier | Minutes | Tier | Minutes |
|------|---------|------|---------|
| M1  | 1  | H4  | 240 |
| M5  | 5  | D1  | 1440 |
| M15 | 15 | W1  | 10080 |
| M30 | 30 | MN1 | 43200 |
| H1  | 60 | | |

This is a deliberate replacement of the old `intraday.js` heuristic (counting unique hours-of-day, ≤8 → H4 else H1), which only distinguished two tiers and would have silently misclassified M1–M30 data as H1.

### Two Views

**Seasonal Tendency** (ex-Backtest/History) — available for every tier. M1–D1 bars are first aggregated to one close per calendar day (`toPeriodBars()`); W1 bars are used as-is (already one bar per week); MN1 bars collapse the week-of-month axis to a single "Month" slot (`slots: 1` instead of `4`) since a monthly bar carries no week-of-month resolution — disclosed via a note in the panel. Same three sections as the old Backtest panel: Raw Price Tendency, Win Rate by Period, Average Return by Month.

**Intraday Timing** (ex-Sessions) — only for sub-daily tiers (M1–H4). Session-bucket selection: H4 uses the 6-bucket `SESSIONS_H4` array; every finer tier (M1–H1) uses the 24-bucket `SESSIONS_H1` hourly buckets — `accumulate()`'s sum/average logic already handles multiple bars landing in the same hour, so M1–M30 need no new bucket shape. Session definitions (broker server time, EET UTC+2 winter baseline) are unchanged from the old `intraday.js`:

| Session | Hours (broker) | UTC (winter) |
|---------|---------------|--------------|
| Late NY | 00–01 | 22–23 UTC |
| Asian | 02–09 | 00–07 UTC |
| London | 10–14 | 08–12 UTC |
| L/NY Overlap | 15–18 | 13–16 UTC |
| New York | 19–22 | 17–20 UTC |
| After-hours | 23 | 21 UTC |

**H4 sessions:** `00` (Late NY/Sydney) · `04,08` (Asian) · `12` (London) · `16` (L/NY Overlap) · `20` (New York)

A small underline-tab switcher (`.up-view-switch`/`.up-view-btn`, styled like `.kptp-gran-switch`) toggles between the two views — hidden entirely when only one view applies to the uploaded tier.

### Signal Filter (Intraday Timing view only)

Each bar is classified using `MONTHS[month].weeks[wkSlot].com`: `LONG…` → `bull`, `SHORT…` → `bear`, everything else → `chop`. Filter buttons (All / Bull / Bear / Chop) re-render the session/DoW cards from the same stored stats object — no re-parsing required.

### Result Shape (`kpt-up-{assetId}`, schemaVer 1)

```javascript
{
  schemaVer: 1,
  tier: 'H1',            // one of M1/M5/M15/M30/H1/H4/D1/W1/MN1
  totalBars: Number,
  historyStats: {         // always present
    slots: 4,              // 1 for MN1 uploads, 4 otherwise
    rawTendency: [ /* [12][slots] — { up, total, upPct } */ ],
    matrix:      [ /* [12][slots] — { signal, wins, total, winRate, avgReturn } */ ],
    monthlyAvg:  [ /* [12] */ ],
    yearRange: [firstYear, lastYear], yearsCount: Number, totalBars: Number
  },
  sessionStats: {          // null for D1/W1/MN1 uploads
    groups: { all, bull, bear, chop },  // each { hourly, sessions, dow }
    hourList: [ /* unique hours present */ ],
    tier: 'H1',
    meta: { firstDate, lastDate, totalBars, intradayBars }
  }
}
```

### localStorage

| Key | Contents |
|-----|----------|
| `kpt-up-{assetId}` | Full result object above (schemaVer 1). Restore guard: `schemaVer === 1 && tier && (historyStats || sessionStats)`. Not a migration of the old `kpt-bt-{id}`/`kpt-idt-{id}` caches — those go inert (nothing reads them) once `backtest.js`/`intraday.js` were removed. |
| `kpt-tz-{assetId}` | Broker UTC offset integer (0–3). Default 2 (EET). Unchanged from the old Sessions panel — reused as-is. |

### `window.kptUpRefresh()`

Called by `ui.js` each time the Upload tab is activated. Resizes whichever Chart.js canvas belongs to the currently active view (`btChartInstance` for Seasonal Tendency, `idtChartInstance` for Intraday Timing), or renders it for the first time from stored stats if no instance exists yet. **Must be defined before the restore-on-load IIFE runs** — `displayResult()`'s call path guards the reference with `typeof window.kptUpRefresh === 'function'` specifically because the restore IIFE executes earlier in the file's top-to-bottom run than the `window.kptUpRefresh` assignment itself; without the guard, restoring a cached result on page load throws and the results panel never becomes visible (caught during Tier 4 testing).

### `js/api.js` context gatherers

`_gatherBacktestCtx()`/`_gatherIntradayCtx()` in `api.js` were repointed to read `kpt-up-{id}`'s nested `historyStats`/`sessionStats` (previously separate `kpt-bt-{id}`/`kpt-idt-{id}` keys) — their return shape is unchanged, so `_buildPrompt()` and everything downstream needed no changes. `_gatherBacktestCtx()` also loops `w < slots` instead of a hardcoded `w < 4`, so a Monthly-bar upload's single-slot `historyStats` doesn't throw.

---

## Profiling Panel (`js/profiling.js`, `js/profiling-charts.js`) — v1.7

A statistical market-profiling browser — range distributions, time-of-extreme clustering, and a rule-based 8-profile daily taxonomy — ported from the sibling `KPT-Market-Profiling` repo. Unlike every other panel, it's **not** injected on all 97 pages: only on `gbp.html`, `fx-gbpusd.html`, `eur.html`, `fx-eurusd.html` (the 4 pages with ported GBPUSD/EURUSD data). Full background: `docs/MARKET_PROFILING_INTEGRATION.md`.

### Data source

`KPT-Market-Profiling` is a pure Python data-pipeline repo (sibling, `../KPT-Market-Profiling`) — its `stats_engine.py` and `profile_taxonomy.py` compute everything this panel displays from cleaned MT5 daily OHLC history. `scripts/sync_profiling_data.js` (run from this repo's root) reads that pipeline's output and regenerates `data/profiling/*` — re-run it any time the pipeline is re-run for an asset (new CSV, taxonomy change). Not a one-time port: adding an asset means adding it to the script's `ASSETS` list and re-running.

### Panel injection

`profiling.js` resolves `ASSET_CONFIG.id` to a Profiling data key via an internal map (`gbp`/`fx-gbpusd` → `gbpusd`, `eur`/`fx-eurusd` → `eurusd`) and early-returns (renders nothing) if unmapped. When mapped, it reads `window.KPT_PROFILING.<key>` (set by `data/profiling/<key>.js`), builds a `<section data-kpt-panel="profiling">` with all inner containers created by JS (not a static HTML template — see below), and inserts it before `.footnote`, same as `macro.js`/`upload.js`. `ui.js` discovers it and adds the Profiling tab automatically.

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

A multi-provider AI analysis engine that gathers seasonal, curve, history, session, and Market Profiling context before calling the selected model.

### Provider Support

| Provider | Model | Endpoint | Streaming |
|----------|-------|----------|-----------|
| Claude | claude-sonnet-5 | `api.anthropic.com/v1/messages` | SSE (`text_stream`) |
| Gemini | gemini-1.5-flash | `generativelanguage.googleapis.com/…/streamGenerateContent?alt=sse` | SSE |
| Ollama | user-configured | `{url}/api/generate` | NDJSON line-by-line |

Config stored in localStorage: `kpt-cfg-claude-key`, `kpt-cfg-gemini-key`, `kpt-cfg-ollama-url`, `kpt-cfg-ollama-model`.

### Context Layers

`runAnalysis()` gathers five context layers before building the prompt:

**1. Seasonal** (always) — reads `MONTHS[]` directly; extracts month-level combined signal and top/bottom 3 months by conviction stars.

**2. Curve** (`_gatherCurveCtx()`) — converts `MONTHS[]` to a 48-point cumulative directional curve (same algorithm as `seasonal-chart.js`). Returns:
- `curVal` — current cumulative value at today's week slot
- `trend4w` — change over last 4 weeks (`up` / `down` / `flat`)
- `pctRange` — current value as % of the annual min–max range

**3. History** (`_gatherBacktestCtx(assetId)`) — reads `kpt-up-{id}`'s `historyStats`. Returns overall win rate, plus top 2 months by win rate and top 2 months by avg return (and their bottom counterparts). Loops `w < (historyStats.slots || 4)` so a Monthly-bar upload's single-slot data doesn't throw. Returns `null` if nothing uploaded yet.

**4. Sessions** (`_gatherIntradayCtx(assetId)`) — reads `kpt-up-{id}`'s `sessionStats` (`null` for D1/W1/MN1 uploads — no intraday information to gather). Returns best and worst session (by avg return) and best and worst day of week. Returns `null` if nothing uploaded yet or the uploaded tier had no sub-daily data.

**5. Market Profiling** (`_gatherProfilingCtx()`) — reads `window.KPT_PROFILING_CURRENT` (set by
`profiling.js`, only on pages with ported pipeline data). Returns `null` entirely if unavailable.
Otherwise pulls, each independently guarded so a missing tier just omits that line rather than
breaking:
- Daily: median daily range, 20-day ADR, most common daily profile shape + dominant extreme-timing
  pattern (unchanged from v1.8/Tier 1).
- Weekly / Monthly / Yearly (added in this pass): top profile shape + share, via a shared
  `_topProfile(dist)`/`_topTiming(timingByProfile, name)` helper reused across all four
  granularities rather than four copies of the same sort/pick logic. The Yearly line always
  includes its sample size (`n_labeled_years`) and an explicit small-sample caveat in the prompt
  text itself, since that tier's window is expanding and n is typically well under 30 — matches the
  small-sample-disclosure convention already used in the Yearly Profile UI.
- NFP event risk (added in this pass, via `_thisWeeksNfpFriday()`): only populated when *this*
  calendar week's Friday falls on day-of-month ≤ 7 (the same rule `stats_engine.py`/
  `profile_taxonomy.py` use) — purely calendar-computed, no price-feed dependency, so it's knowable
  with certainty (unlike any "today's developing profile" claim, which nothing in this codebase can
  make — there is no live feed; Phase 4 per `HANDOVER.md`, not started). When populated, pulls
  `stats.nfp_profile`'s NFP-vs-other-Friday mean/median range-pips and extreme-in-release-window %
  comparison, plus the top profile shape for NFP days from `profiles.nfp.nfp_profile_distribution`.
  Feeds a dedicated `=== EVENT RISK THIS WEEK — NON-FARM PAYROLLS ===` prompt block, explicitly
  framed to the model as a volatility/timing factor, not a directional one.

Deliberately **not** pulled into the prompt: `hourly_activity` and the session/hour pairing tables
— range-*magnitude* diagnostics with no directional read, better suited to the Profiling tab's own
visual browsing than a "be concise, no padding" synthesis prompt.

### UI Injection (`_injectUI()`)

Called once at page load. Inserts before `#run-btn`:
- Provider pill buttons (Claude · Gemini · Ollama)
- Settings gear toggle → expandable panel with key/URL/model inputs + Save button
- Context bar chips (✓ Seasonal · ✓ Curve · ✓/○ History · ✓/○ Sessions · ✓/○ Profiling), built by
  `_updateCtxBar()` — History/Sessions chips read `kpt-up-{id}`'s `historyStats`/`sessionStats`
  presence (fixed in this pass: they were still checking the retired `kpt-bt-{id}`/`kpt-idt-{id}`
  keys with a `schemaVer === 3` guard left over from before the Tier 4 Upload-tab merge, so both
  chips permanently showed unavailable regardless of what the user had uploaded)
- Hint text showing which provider is active

### Required Output Format — Market Profile row

The fixed `REQUIRED OUTPUT FORMAT` table `_buildPrompt()` instructs the model to produce now
includes a `Market Profile` row (added alongside the Weekly/Monthly/Yearly/NFP context additions
above) — without a dedicated row, the model would often ignore the Profiling context entirely even
when it was present in the prompt (observed directly: Ollama's `gemma3:e2b` produced a full verdict
with zero mention of Profiling data despite the context block being included). The closing
instruction line also now explicitly says the row must be filled in, not left generic, when
Profiling data was provided — same reasoning as the NFP block's own explicit "factor this in" line.

### Result Bar — download as `.md`

Once an analysis completes (fresh run or cache-restored), a result bar (`#ai-cache-bar`, reused
from the pre-existing cache-bar element — built by `_showResultBar(opts)`) appears above
`#ai-output` with a generation-time note and a "⬇ Download .md" button
(`_downloadAnalysisMarkdown()`); a cache-restored result also gets the "✕ Clear & re-run" button
next to it. Downloading works identically whether the result is a fresh run or a cache restore,
since the raw markdown is captured into module-level `_lastMarkdown`/`_lastMarkdownAt` at both
points — `_lastMarkdownAt` for a restored result is the *original* generation time (the cache
value's own `generatedAt` field, not the moment of reload/download), so downloading later still
reflects when the analysis was actually produced.

- **Filename:** `{asset name, sanitized}_Analysis_{YYYY-MM-DD}_{HHmm}.md`, e.g.
  `EUR-USD_Analysis_2026-09-02_1400.md` — `_sanitizeFilenamePart()` strips filesystem-unsafe
  characters and collapses whitespace to `-`.
- **File content:** a small header (asset name, generation timestamp, provider label — reused from
  the UI-injection IIFE's `_providerLabel()`, exposed as `window._kptProviderLabel` for this) above
  the raw markdown body verbatim.
- **Mechanism:** a `Blob` + `URL.createObjectURL()` + a synthetic `<a download>` click, revoked
  after 1s — standard client-side download, no backend involved (this repo has none).
- **Cache format change:** `kpt-ai-{id}-{provider}-{year}-w{week}` now stores
  `{text, generatedAt}` (was a bare string) so a restored result carries its real generation time.
  `_cacheGet()` reads a legacy bare-string value back as `{text: rawValue, generatedAt: null}` — old
  cached entries from before this change still load, just without a real timestamp (falls back to
  "now" for filename purposes).

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
4. History stats (if uploaded)
5. Intraday bias (if the uploaded tier had sub-daily data)
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
- Script src tags in correct order: `data/[asset].js` → `accordion.js` → `api.js` → `tradingview.js` → `macro.js` → `seasonal-chart.js` → `upload.js` → `ui.js` (8 scripts total)

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
| Upload tab missing from tab bar | `upload.js` must load before `ui.js` — the `[data-kpt-panel="upload"]` element must exist when `ui.js` scans the DOM |
| Upload chart not visible on tab activate | `window.kptUpRefresh()` is called by `ui.js` on tab activation; check `kptUpRefresh` is defined in `upload.js` and `upload.js` loads before `ui.js` |
| "Only N valid bars found" alert on valid CSV | Check separator is tab or comma; ensure date format is `YYYY.MM.DD` or `YYYY-MM-DD`; check there's enough history (10+ years recommended for D1-and-coarser data) |
| Upload results lost on page reload | localStorage key is `kpt-up-{assetId}` (schemaVer 1) — check `ASSET_CONFIG.id` is set correctly in the data file; if a result restores but the results panel stays hidden, check `window.kptUpRefresh` is defined and `switchView()`'s call to it is still guarded with `typeof window.kptUpRefresh === 'function'` (the restore IIFE runs before that assignment in file order) |
| `<strong>` text in upload guide breaks to new line | `.bt-upload-steps li` uses `position: absolute` for the step number — do not change to `display: grid` or `display: flex`, which turns `<strong>` inline elements into separate grid/flex items |
| Macro tab missing from tab bar | `macro.js` must load before `ui.js` — the `[data-kpt-panel="macro"]` element must exist when `ui.js` scans the DOM |
| Macro calendar shows wrong country events | Check `FF_CURRENCIES` map in `macro.js` has the correct asset ID and currency codes; check `CC` map has the correct Investing.com country ID for that currency |
| Macro embed shows blank white iframe / "restore the link" message when testing locally | Expected on `127.0.0.1`/Live Server — Investing.com's free widget requires the parent domain to be registered with them; localhost isn't. Works correctly on the deployed domain. Do not treat this as evidence the embed is broken in production — verify against the live site with a real browser before "fixing" anything here (see v1.7's correction entry in `CHANGELOG.md`). |
| Macro embed white theme clashing with dark dashboard | `filter: invert(1) hue-rotate(180deg)` on `.macro-iframe` — check it hasn't been removed from `dashboard.css` |
| Macro guide shows wrong content | Check `ASSET_CLASS` map in `macro.js` has the correct asset ID mapped to one of: fx, rates, indices, metals, energy, ags |
| New asset has no macro tab | Add the new asset ID to both `FF_CURRENCIES` and `ASSET_CLASS` in `macro.js`; ensure `macro.js` script tag is in the asset HTML before `ui.js` |
| Intraday Timing view doesn't appear after upload | Expected for D1/W1/MN1 uploads — that view only renders for sub-daily tiers (M1–H4); check `#up-view-switch` is `hidden` and the tier chip in the summary row matches what you expect from the file |
| Intraday Timing shows old session shading after a code change | Session defs are always derived at render time from the live `SESSIONS_H1`/`SESSIONS_H4` module-level arrays in `upload.js` using `stats.tier` — not stored in the cached result — so a code change to session boundaries takes effect on next render without needing a schema bump |
| Upload shows "only N valid bars" on a sub-daily CSV | Verify the TIME column is present and format is `HH:MM`; separator must be tab or comma |
| Session filter (Bull/Bear/Chop) shows no bars | CSV uploaded when `MONTHS[]` data was unavailable or `ASSET_CONFIG` undefined — re-upload; check data file loads before `upload.js` |
| Wrong tier detected (e.g. M15 file shows as H1) | `detectTier()` uses the *median* gap between consecutive bar timestamps — a file with very few bars, or a mostly-empty/corrupted export, can throw the median off; check `totalBars` in the summary chip and re-export with more history if it looks too small |
| AI panel says "Claude AI" instead of active provider | `_updatePanelHeadings()` is called at init — check `api.js` loads and `#run-btn` exists in the DOM; the function rewrites `.ai-label` at startup |
| AI Settings panel not appearing | `_injectUI()` targets `#run-btn` — check the AI button has `id="run-btn"` (not `id="ai-btn"`) |
| Ollama "Failed to fetch" | (1) Ollama not running — run `start_kpt.bat`; (2) CORS not enabled — must use `set OLLAMA_ORIGINS=* && ollama serve` in same process; (3) Wrong URL — use `http://localhost:11434`, not `…/v1` |
| Gemini / Claude returns 401 | Check API key is saved via the Settings gear icon; key stored in `kpt-cfg-{provider}-key` in localStorage |
| AI response not cached (re-calls on every page load) | Cache key is `kpt-ai-{id}-{provider}-{year}-w{week}` — check `ASSET_CONFIG.id` is set correctly; cache expires automatically when the week changes |
| AI cached result doesn't reflect new CSV data | Click the "✕ Clear & re-run" button in the cache bar above the AI output; it removes the localStorage entry and re-runs `runAnalysis()` immediately |
| Signal filter bar missing or shows no buttons | `data/signals_manifest.js` must be loaded in `index.html` before the signal injection `<script>` block; the filter bar is hidden until `SIGNALS_MANIFEST` is defined |
| Signal filter shows "0 assets" for a category | The `data-sig-type` attribute is only set during the manifest injection loop — if a card was added to `index.html` without a matching entry in `SIGNALS_MANIFEST`, it will not be tagged and will never show under a filter |
| Signals freshness note is missing or shows wrong date | `SIGNALS_GENERATED` must be exported as a `const` (not just a comment) in `signals_manifest.js` — run the manifest generator script and verify `const SIGNALS_GENERATED = '…'` is present |
| Upload: changing timezone shows "re-upload" prompt | Expected behaviour — timezone offset is applied at parse time, so existing cached intraday data cannot be reused; re-upload the CSV to recalculate with the new offset |
| Intraday hour bars shifted by 1 after broker TZ change | Check `_normHour()` in `upload.js` — formula is `(rawHour - (offset - 2) + 24) % 24`; offset is stored in `kpt-tz-{id}` localStorage key (unchanged from the old Sessions panel); EET (UTC+2) → offset 2 = zero shift |
| TradingView chart shows wrong instrument | Add `tvSymbol: "EXCHANGE:SYMBOL"` to the asset's `ASSET_CONFIG` in its data file; `tradingview.js` checks `ASSET_CONFIG.tvSymbol` first, then falls back to the built-in `TV_SYMBOLS` table |
| "Print tab" button shows all tabs in print output | `body.print-single-tab` class must be present during the print call; `ui.js` adds it, opens `window.print()`, then removes it in a `setTimeout(1000)` — if the class is stuck (e.g. from a crash), open DevTools console and run `document.body.classList.remove('print-single-tab')` |
| Signals not injecting on Netlify (index shows STATUS LIVE instead of SIGNAL CHOP) | Netlify Pretty URLs rewrites `href="assets/aud.html"` → `href="/assets/aud"`, breaking the old regex `/assets\/(.+)\.html/`. The fixed regex is `/assets\/([^./?#]+)/` — this matches both the local `.html` format and the Netlify pretty-URL format. If reverting, do not use `.+\.html` as the capture. |
| Trend tab NOW badge wraps to second line on Netlify | Netlify pages have a vertical scrollbar (~17px) that narrows the viewport, pushing `.sc-header` past its wrap threshold. Fix: set `flex-wrap: nowrap` on `.sc-header` and `min-width: 0` on `.sc-header-left`. Do not restore `flex-wrap: wrap` — it was only harmless locally because the local `file://` view has no scrollbar. |
| Profiling tab missing on gbp/eur pages | `profiling.js` must load before `ui.js`, and both `data/profiling/manifest.js` + `data/profiling/{gbpusd\|eurusd}.js` must load before `profiling.js` — check the 4 script tags are present and in order (see the Profiling load-order exception above). `profiling.js` also silently no-ops if `ASSET_CONFIG.id` isn't in its internal asset-key map. |
| Profiling tab shows on a page it shouldn't | Only add the `profiling.js`/`profiling-charts.js`/data script tags to pages with ported data — `profiling.js`'s early-return means it's harmless but pointless to load elsewhere; keep the convention of only wiring the 4 (growing) in-scope pages |
| Profiling charts/tooltips broken or unstyled | Check `js/profiling-charts.js` loads before `js/profiling.js`; check no new profiling class was introduced without the `.kptp-` prefix (audit `css/dashboard.css`'s Market Profiling block before adding one) |
| Profiling data stale after a fresh CSV upload | Re-run the KPT-Market-Profiling pipeline, then `node scripts/sync_profiling_data.js` from `seasonal-dashboard/` root — the Profiling tab shows "Data as of …" sourced from `data/profiling/manifest.js`, regenerated by that script |
| Profiling calendar/profile-detail/compare page blank or console error | `profiling-calendar/index.html`, `profiling-profiles/detail.html`, and `profiling-profiles/compare.html` each load `js/profiling-charts.js` directly (they're outside the tab system, not `ASSET_CONFIG`-dependent) — check that tag is present. `detail.html` and `compare.html` no longer hardcode per-asset data script tags — they load via `KPTPData.loadAsset()` on demand; check the browser network tab for a failed `data/profiling/<key>.js` or `profile-examples/<key>.js` request if a specific asset's data doesn't appear. `compare.html` also needs `data/profiling/manifest.js` loaded for its asset picker. |
