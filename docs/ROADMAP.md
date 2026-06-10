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

## Phase 2 — CSV Price Data Layer

**What:** Upload a raw MT5 OHLCV CSV export → compare actual price behaviour vs seasonal model.

**Scope:** Pure price data only. No annotation, no indicator interpretation. The tool calculates statistics from the raw numbers and overlays them against seasonal tendency.

**Architectural decisions (confirmed):**
- **Primary metric first:** Win-rate by signal (% of years the BULL/BEAR/CHOP signal was correct). Most intuitive and immediately actionable. Other metrics (avg return, drawdown, etc.) added afterwards.
- **Per-asset scope:** CSV upload is embedded in each individual asset dashboard (not a standalone tool). Once general logic is down, notes on building a standalone tool can be added.

**Key outputs — build order:**
1. Win-rate by signal — "In X% of years, the BULL signal in April Wk2 was followed by positive price action"
2. Average return by month / week-of-month across the dataset
3. Current year's price path overlaid against the seasonal curve
4. Simple visual: are we tracking the seasonal or diverging from it?

**Preparation before building:**
- Export 2–3 MT5 CSV files (one currency, one commodity, one index) — daily bars, 10+ years of history
- Paste one to Claude to establish the exact format before building the parser

**Tech stack:**
- PapaParse for CSV parsing
- Chart.js or lightweight-charts for rendering
- All processing client-side — no backend required
- Claude API button can then compare the CSV statistics against seasonal data

**Effort:** Medium — 2–3 sessions. Hardest part is deciding which statistics are most useful.

---

## Phase 3 — Macro Data Layer

**What:** Economic calendar and macro data indicators per asset — NFP, CPI, PPI, interest rate decisions, central bank sentiment.

**Sources (free/low cost):**
- ForexFactory embedded calendar widget (zero effort, instant)
- FRED API (US macro: free, comprehensive)
- Tradingeconomics.com (free tier: limited calls/month, good FX coverage)
- Barchart.com (broader commodity coverage)

**Start with:** ForexFactory iframe embed in a new "Macro" tab on each asset page. This is a 30-minute implementation with immediate value.

**Evolve to:** API-driven panel that filters relevant events per asset and shows them alongside the seasonal signal with a confluence note.

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

**ForexFactory Calendar**: see Phase 3 below. Most relevant for FX/currency pages only; deferred to dedicated Phase 3 implementation.

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
