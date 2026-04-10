# ROADMAP.md — Development Roadmap

---

## ✅ Completed

### Infrastructure
- Modular architecture (v0.6): `css/dashboard.css` · `js/accordion.js` · `js/api.js` · per-asset `data/` files · thin HTML shells in `assets/`
- `index.html` landing page with full asset directory (Futures + Forex sections)
- Sticky navigation bar with 13 section jump links + IntersectionObserver active state
- GitHub private repo + SSH authentication + GitHub Pages deployment
- Claude Code (VSCode extension) installed and available
- Dynamic current-month auto-open + NOW badge
- Copyright: dual attribution (Moore Research Center + Kaminari Precision Trading) with inline styles

### Futures Dashboards Live
- AUD/USD (CME) — 5-YR · 15-YR · 34-YR
- USD Index (ICE) — 5-YR · 15-YR · 35-YR
- JPY/USD (CME) — 5-YR · 15-YR · 40-YR
- GBP/USD (CME) — 5-YR · 15-YR · 40-YR
- CAD/USD (CME) — 5-YR · 15-YR · 40-YR
- EUR/USD (CME) — 5-YR · 15-YR · 22-YR (launched 1999)
- CHF/USD (CME) — 5-YR · 15-YR · 40-YR
- NZD/USD (CME) — 5-YR · 15-YR · 23-YR

### Forex Dashboards Live
- AUDUSD — derived from AUD CME + USD ICE
- USDJPY — derived from USD ICE + JPY CME
- GBPUSD — derived from GBP CME + USD ICE

### UI Fixes (v0.7)
- Combined accordion moved to top of all asset pages (most actionable content first)
- AI panel immediately below accordion
- Individual TF tables moved below divider as supporting detail

---

## Phase 1 — Remaining Futures Assets (Next Priority)

Build these in order — each requires a Moore Research Center chart image:

| Asset | Exchange | Why Next |
|-------|---------|---------|
| MXN | CME | Long-hold trade (Apr → Dec), unique structure |
| BRL | CME | Long-hold trade (Apr → mid-May) |
| XAU (Gold) | CMX | Metals — Apr Wk2 sell, high trader interest |
| XAG (Silver) | CMX | Metals — Apr Wk3/4 sell |
| Copper | CMX | Metals — Apr Wk4 sell |
| Platinum | CMX | Metals |
| Palladium | CMX | Metals — Apr Wk1 buy + Wk4 sell |

CAD, NZD, EUR, CHF are complete (moved to ✅ Completed above).

As each futures asset is completed, corresponding forex pairs unlock automatically.

---

## Phase 2 — CSV Price Data Layer

**What:** Upload a raw MT5 OHLCV CSV export → compare actual price behaviour vs seasonal model.

**Scope:** Pure price data only. No annotation, no indicator interpretation. The tool calculates statistics from the raw numbers and overlays them against seasonal tendency.

**Key outputs:**
- Average return by month / week-of-month across the dataset
- Percentage of years the seasonal signal was correct (historical win rate)
- Current year's price path overlaid against the seasonal curve
- Simple visual: are we tracking the seasonal or diverging from it?

**Tech stack:**
- PapaParse (already in project's available libraries) for CSV parsing
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
- BarchartS.com (broader commodity coverage)

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

## Quick Wins — Can Be Done Anytime

### Dynamic Status Badges on Index Cards

Currently all live asset cards show a hardcoded `<span class="bull-tag">Live</span>`. The enhancement: automatically show the current seasonal signal (BULL / BEAR / CHOP) derived from each asset's `MONTHS[]` data.

**Design (two distinct layers):**

- **Operational status** (PLANNED / LIVE / MAINTENANCE) — managed via a central `data/status.js` config. Manual update when an asset is under maintenance or being rebuilt. Always overrides the signal.
- **Seasonal signal** (BULL / BEAR / CHOP) — computed at runtime: read `MONTHS[currentMonth].weeks[currentWeek].com` from each asset's data file and render the appropriate tag class.

**Architectural constraint:** `index.html` currently loads no asset data files. To compute signals, either (a) load all `data/*.js` files on the index page (12+ script tags — verbose), or (b) consolidate current signal into `data/status.js` (manual but clean). Option (b) is recommended as a first step — one file to update at each month/week turn.

**Tag classes available:** `.bull-tag` (green) · `.bear-tag` (red) · `.chop-tag` (amber)

---

### Markdown Rendering in AI Output
Replace `output.textContent = text` with a lightweight markdown parser (`marked.js` from cdnjs) and `output.innerHTML`. Headers and bold in Claude's response will render properly.

### Streaming AI Response
Use Anthropic streaming API (`stream: true`) — response appears word by word instead of all at once after a 5–10 second blank wait.

### Month Quick-Jump Buttons
A row of month buttons (Jan–Dec) above the accordion. Click → scrolls to that month row + auto-opens it. Useful as asset count grows.

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
