# ROADMAP.md — Development Roadmap

---

## ✅ Completed

### Infrastructure
- Modular architecture (v0.6): `css/dashboard.css` · `js/accordion.js` · `js/api.js` · per-asset `data/` files · thin HTML shells in `assets/`
- `index.html` landing page with full asset directory (Futures + Forex sections)
- Sticky navigation bar with section jump links + IntersectionObserver active state
- GitHub private repo + SSH authentication + GitHub Pages deployment
- Claude Code (VSCode extension) installed and available
- Dynamic current-month auto-open + NOW badge
- Copyright: dual attribution (Moore Research Center + Kaminari Precision Trading) with inline styles
- `gen_futures_v2.js` generator — produces HTML shells for all futures assets from `ASSET_CONFIG` (43/43)
- `gen_signals_manifest.js` — reads all 97 data files and writes `data/signals_manifest.js` (rebuild any time)

### Dynamic Index Card Signals (Quick Win — ✅ Complete)
All status-complete index cards now show a runtime-derived seasonal signal (BULL / BEAR / CHOP / FLIP / AVOID) instead of a hardcoded "Live" tag. Signal is read from `MONTHS[currentMonth].weeks[currentWeek].com` via `data/signals_manifest.js`, loaded as a single script tag on `index.html`. To update after rebuilding data files: re-run `node gen_signals_manifest.js`.

### Futures Dashboards — ✅ ALL COMPLETE (70 assets)

**Currencies (10)**
- AUD/USD (CME) — 5-YR · 15-YR · 34-YR
- USD Index (ICE) — 5-YR · 15-YR · 35-YR
- JPY/USD (CME) — 5-YR · 15-YR · 40-YR
- GBP/USD (CME) — 5-YR · 15-YR · 40-YR
- CAD/USD (CME) — 5-YR · 15-YR · 40-YR
- EUR/USD (CME) — 5-YR · 15-YR · 22-YR
- CHF/USD (CME) — 5-YR · 15-YR · 40-YR
- NZD/USD (CME) — 5-YR · 15-YR · 23-YR
- MXN (CME) — 5-YR · 15-YR · long-YR
- BRL (CME) — 5-YR · 15-YR · long-YR

**Metals (5)**
- XAU Gold (CMX) · XAG Silver (CMX) · Copper (CMX) · Platinum (CMX) · Palladium (CMX)

**Energy (6)**
- Crude Oil (NYMEX) · Brent Crude (ICE) · Natural Gas (NYMEX) · Heating Oil/ULSD (NYMEX) · Gasoline/RBOB (NYMEX) · Gas Oil (ICE)

**Interest Rates (14)**
- T-Bonds 40-YR · T-Notes 10Y 39-YR · T-Notes 5Y 33-YR · T-Notes 2Y 30-YR · Eurodollar 39-YR (CBOT/CME)
- Aus T-Bonds 10Y 36-YR · Aus T-Bonds 3Y 33-YR · Aus T-Bills 3M 40-YR (SFE)
- Long Gilt 38-YR · Short Sterling 38-YR (LIFFE)
- Euro-Bund 30-YR · Euro-Bobl 23-YR (EUREX) · Euro-Yen 31-YR (SGX) · Fed Funds 32-YR (CBOT)

**Indices (13)**
- S&P 500 39-YR · S&P eMini 23-YR · Russell 2000 17-YR · DJIA eMini 23-YR · Nasdaq 100 24-YR · S&P 400 29-YR · GSCI 29-YR (CME/CBOT)
- Nikkei 225 34-YR (SIMEX) · FTSE 100 37-YR (LIFFE) · SPI 200 21-YR (SFE) · DAX 30-YR (EUREX) · CAC 40 32-YR (MATIF) · Hang Seng 34-YR (HKFE)

**Softs (8)**
- Coffee "C" 40-YR · Sugar #11 40-YR · Cocoa 40-YR · Orange Juice 40-YR (ICE)
- Rough Rice 34-YR (CBOT) · London Sugar 30-YR · London Cocoa 34-YR · Robusta Coffee 29-YR (LCE)

**Fiber & Meats (8)**
- Cotton (NYBOT) · Lumber (CME)
- Live Cattle · Feeder Cattle · Lean Hogs · Class III Milk (CME)
- (Note: 2 fiber + 4 meats = 6, plus Cotton and Lumber = 8 total in this category)

**Grains (8)**
- Soybeans · Soy Meal · Soy Oil · Wheat (CBOT) · Wheat (KCBT) · Wheat (MGE) · Corn · Oats (CBOT)

### Forex Dashboards — ✅ ALL COMPLETE (27 pairs)
All derived FX pairs live (v0.9), each combining two CME futures seasonal components.

- **Majors (6):** AUDUSD · EURUSD · GBPUSD · USDCAD · USDCHF · USDJPY
- **Minors (9):** AUDCAD · AUDCHF · AUDNZD · EURAUD · EURCHF · EURGBP · GBPAUD · GBPCHF · NZDUSD
- **Crosses (12):** AUDJPY · CADCHF · CADJPY · EURCAD · EURJPY · EURNZD · GBPCAD · GBPJPY · GBPNZD · NZDCAD · NZDCHF · NZDJPY

See `docs/README.md` for the full per-pair file listing, components, and key-signal summaries.

---

## ✅ Phase 2 — CSV Price Data Layer (Complete — v1.2)

**What was built:** A fully client-side CSV analysis engine embedded in every asset dashboard. Upload an MT5 D1 CSV → three-section results panel rendered instantly in the browser. No backend, no dependencies beyond Chart.js (loaded on demand from cdnjs).

**Three results sections (in order):**
1. **Raw Price Tendency** — model-agnostic heatmap showing % of years price rose per (month, week) cell. Green ≥60%, amber 40–59%, red ≤39%. The baseline: what the market actually did.
2. **Win Rate by Period** — how often the seasonal signal was directionally correct. Green ≥65%, amber 50–64%, red <50%. Chop/Flip cells show `~`. Stricter threshold than Raw Tendency because validating model accuracy requires a higher bar than observing raw price frequency.
3. **Average Weekly Return by Month** — Chart.js bar chart showing average weekly move magnitude per month. Pairs with Win Rate: high win rate + tall bar = reliable and meaningful.

**Key technical decisions:**
- Pure client-side. D1 CSV is ~430KB — well within browser limits.
- Parser handles D1 and sub-daily formats (M1/H1/H4) with automatic aggregation to daily closes.
- Computed stats stored in `localStorage` keyed by asset ID — results persist across page reloads without re-uploading.
- MT5 export guide built into the upload screen (7-step numbered instructions).
- Collapsible "How to read this" toggles on each section (closed by default).

**Files:** `js/backtest.js` (new, ~330 lines) · `patch_add_backtest.js` (one-shot patch) · `css/dashboard.css` (backtest styles) · all 97 `assets/*.html` (script tag added by patch script)

---

### Phase 2.5 — Intraday Bias Tool *(planned, not yet built)*

**Idea:** The D1 backtest gives week-level historical context. A companion intraday tool would show where price sits *within the current session* — helping align intraday entries with the broader daily and seasonal bias.

**How it differs from the D1 backtest:**
- D1 data answers: "Was this week historically bullish?" — a week-level question.
- Intraday data answers: "Given I am in Wk3 of a bearish seasonal, is this hour's price action aligned or diverging from that bias?" — a session-level question.

**Data format:** Would require H1 or H4 CSV, not D1. D1 bars have no intraday structure. H1 is ~6k rows/year; H4 ~1.5k rows/year — both manageable client-side. M1 is ~100k rows for just 3.5 months — too heavy for browser processing at scale.

**Seasonal model compatibility:** The existing week-level signals (BULL/BEAR/CHOP) are directly applicable — directional bias is timeframe-agnostic. Basis differences between CME futures and spot are negligible for directional analysis.

**Scope when built:** Likely a separate tab or sub-panel within the Backtest section. Upload an H1 or H4 CSV → see intraday price distribution by time-of-day or session, overlaid with the current week's seasonal signal.

---

## ✅ Phase 3 — Macro Data Layer (Complete — v1.3)

**What was built:** An Investing.com economic calendar embed + collapsible asset-class interpretation guide, injected as a Macro tab on all 97 asset pages.

**ForexFactory:** Was the original target but blocks iframe embedding (`X-Frame-Options: SAMEORIGIN`). Investing.com's `sslecal2.investing.com` webmaster widget is used instead — free, embeddable, filterable by country and importance, with built-in datepicker and timezone controls.

**Per-asset filtering:** `macro.js` contains a 97-entry `FF_CURRENCIES` map (asset ID → currency codes) and a `CC` map (currency → Investing.com country IDs). Each embed URL is constructed dynamically for the specific asset loaded.

**Two-column layout:** 680px-fixed Investing.com iframe on the left, collapsible asset-class guide on the right. Six guide templates (fx / rates / indices / metals / energy / ags), each covering key events, interpretation advice, and a category-specific note. Impact legend (HIGH / MED / LOW) at the top of every guide.

**Features:** `importance=2,3` default (medium + high); `features=...,filters` exposes in-widget importance toggle; pseudo dark-mode via CSS `filter: invert(1) hue-rotate(180deg)`; loading time note in header (~30 sec for cold load); external links to Investing.com and ForexFactory.

**Delivered:** `js/macro.js` (new, ~200 lines) · `js/ui.js` updated (Macro tab added) · `css/dashboard.css` updated (~120 lines of macro styles) · all 97 `assets/*.html` patched via `patch_add_macro.js`

**To evolve:** Phase 5 (AI Synthesis) can query the macro context programmatically when Investing.com provides an API, or integrate FRED/Tradingeconomics for deeper event data per asset.

---

## Phase 4 — Live Price Context

**Quick win (immediate):** TradingView embedded widget — real-time chart, zero code, professional quality. Add as a "Price" tab on each asset page.

**Better option (medium effort):** Twelve Data API (free tier: 800 req/day, 15-min delay) with lightweight-charts rendering native OHLC candlesticks. Allows timeframe selector (1H, 4H, D, W).

**Killer feature (harder):** Overlay the seasonal tendency line directly on the live price chart — so the trader sees both current price position and seasonal expectation on the same chart. This is the genuinely differentiated feature.

---

## Phase 5 — AI Synthesis Upgrade

**What:** Upgrade the Claude API button from "analyse seasonal data only" to "synthesise all available layers."

When Phases 2–4 are built, the AI button reads:
- Seasonal data (already built)
- CSV statistics (Phase 2)
- Upcoming macro events for this asset (Phase 3)
- Current price position relative to seasonal model (Phase 4)

And produces a single weekly bias verdict: what the confluence is saying, where layers agree, where they conflict, and the highest-probability scenario.

---

### Quick Wins Batch — ✅ ALL COMPLETE

**Streaming AI Response + Markdown Rendering** (one unit of work in `js/api.js`):
- `stream: true` added; response body read via `response.body.getReader()` + `TextDecoder`
- SSE chunks parsed for `content_block_delta.text_delta` events; text appended live to `output.textContent`
- On stream completion, `marked.js` loaded dynamically from cdnjs (one HTTP request, cached), output re-rendered via `output.innerHTML = marked.parse(full)`
- Required headers added: `anthropic-version`, `anthropic-dangerous-direct-browser-use`
- Zero HTML file changes needed (marked.js loads dynamically from api.js itself)

**TradingView Price Chart** (97 asset pages):
- `js/tradingview.js` created — self-contained IIFE, 97-entry symbol table, injects widget script into `#tv-chart-section > .tv-widget-inner`
- Widget config: Weekly interval · Dark theme · Allow symbol change · 430px height
- Generator template (`gen_futures_v2.js`) updated to include chart section + script tag; all 43 futures pages regenerated
- `patch_handbuilt_tv.js` batch script patched all 54 hand-built HTML files (currencies, metals, energy, fiber/meats, 27 FX pairs)
- Coverage: 97/97 pages confirmed

**Month Quick-Jump Buttons** ✅ Complete:
- `buildQuickJump()` added to `accordion.js` — row of Jan–Dec buttons above the combined accordion
- Click any month → opens and scrolls to that accordion row. Current month highlighted with `.qj-current`

**Tab Layout — Seasonals · Chart · Analysis** ✅ Complete:
- `js/ui.js` created — new shared UI layer loaded on all 97 asset pages
- Primary tab bar separates Seasonals (combined accordion + TF tables), Chart (TradingView), and Analysis (AI panel)
- Tabs built dynamically from DOM scan — adapts to pages missing a given panel

**Secondary TF Sub-Tabs — Combined · 5-YR · 15-YR · Long-term** ✅ Complete:
- Sub-tab bar within the Seasonals tab; color-coded by TF (green / pink / brown / asset-specific)
- Selected sub-tab persisted to `localStorage`; restored on next visit
- Works on both hand-built pages (static TF tables) and generator pages (dynamic via `buildTFTables()`)

**Dynamic TF Table Generation** ✅ Complete:
- `buildTFTables()` added to `accordion.js` — generates 5-YR, 15-YR, and Long-term tables from `MONTHS[]`
- Skips hand-built pages automatically via `.table-wrap` count guard
- Covers all 70 generator pages with zero HTML file changes

**Topbar — Date Chip + Prev/Next Navigation** ✅ Complete:
- Live date chip (`WK N · MON YYYY`) and within-category prev/next navigation buttons injected by `ui.js`

**GitHub Version Control** ✅ Complete:
- `.gitignore` created; git repo initialised in `seasonal-dashboard/`; private GitHub remote connected
- Deployment workflow: GitHub Desktop → stage → commit → Push origin

**Price Backtest Tool** ✅ Complete (Phase 2):
- `js/backtest.js` created — full CSV engine, three-section results panel, Chart.js bar chart
- MT5 export guide on upload screen, collapsible "How to read this" per section
- localStorage persistence per asset; sub-daily CSV auto-aggregated to D1
- All 97 asset pages patched with `backtest.js` script tag via `patch_add_backtest.js`

**Macro Calendar** ✅ Complete (Phase 3):
- `js/macro.js` created — Investing.com embed, per-asset currency/country filtering, two-column guide layout
- All 97 asset pages patched with `macro.js` script tag via `patch_add_macro.js`

**All 97 data files complete** ✅ (v1.3):
- All 5 SFE/LIFFE interest rates data files written (`austbonds10`, `austbonds3`, `austbills3m`, `longgilt`, `shortsterling`)
- Correct seasonal analysis from Moore Research Center charts, including complex TF divergence patterns and inverted T-Bill structure

---

## Remaining Quick Wins

### Dynamic SEASONAL_DATA Generation
Auto-generate the `SEASONAL_DATA` prompt string from `MONTHS[]` instead of maintaining it separately. Prevents the two from drifting out of sync.

### Print / Export to PDF
CSS `@media print` styles — hide AI panel and buttons, render clean tables only for offline reference.

---

## Scope Boundary (Deliberately Excluded)

- **Annotated chart interpretation** (Elliott waves, Fibonacci retracements, market structure identification) — too subjective, requires the user's own framework, better handled in Claude.ai or ChatGPT directly
- **ML/AI pattern recognition on price charts** — different class of engineering problem, not in scope
- **Broker integration / live position tracking** — possible future addition but not priority

The tool provides **objective data confluence**. The trader brings their own execution framework to the final entry decision.
