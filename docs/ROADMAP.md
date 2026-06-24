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

### Phase 2.5 — Intraday Bias Tool (Sessions) — ✅ Complete (v1.5)

**What was built:** A fully client-side intraday bias tool injected as a Sessions tab on all 97 asset pages. Upload an H1 or H4 MT5 CSV → three result sections rendered instantly in the browser.

**Three results sections:**
1. **By Hour** — Chart.js bar chart (24 hourly slots for H1, 6 for H4) showing average return per time slot; amber line overlay for % positive; session shading backdrop
2. **By Session** — Stat cards for each session zone (Late NY / Asian / London / L/NY Overlap / New York / After-hours); avg return and occurrence count expressed as *days* (e.g. "847 / 1,653 sessions"), not individual bars
3. **By Day of Week** — Stat cards for Mon–Fri; avg return and *day-level* occurrence count (e.g. "682 / 1,654 days"), not bar counts

**Signal filter:** All weeks / Bull (Long) weeks / Bear (Short) weeks / Chop weeks — narrows the dataset to bars from weeks matching the current seasonal signal, derived from `MONTHS[]`.

**Session timezone:** All session hours in broker server time (EET, UTC+2 winter). Corrected from original UTC assumption: Asian starts 02:00 broker (not 00:00), London 10:00 broker (not 08:00).

**Occurrence-count methodology:** Session and DoW cards count *distinct day occurrences*, not individual bars. A session occurrence is one aggregated data point per session per trading day (net return = sum of all bars in that session window on that date). A day occurrence is one trading day. This gives immediately interpretable denominators — ~50 Mondays/year rather than ~50 × 24 H1 bars/year. Hourly chart retains bar-level counts (since a bar is the natural atomic unit for an hour slot).

**Key technical decisions:**
- `schemaVer: 3` discriminator in cached stats; old caches automatically discarded on page load
- `sessionDefs` never stored in cache — always derived live from module-level constants so session boundary changes take effect without re-upload
- `window.kptIdtRefresh()` called by `ui.js` on tab activation to resize the Chart.js canvas

**Files:** `js/intraday.js` (new, ~700 lines) · `js/ui.js` updated (Sessions tab added; Trend/Price/History labels applied) · `css/dashboard.css` updated (Sessions panel styles + Phase 5 AI panel styles) · all 97 `assets/*.html` (script tag added) · `start_kpt.bat` created

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

## ✅ Phase 4 — Seasonal Curve Tab (Complete — v1.4)

**What was built:** A Chart.js seasonal curve chart injected as a "Curve" tab on all 97 asset pages. Shows the seasonal year as a cumulative directional-bias line derived entirely from `MONTHS[]` data — no external API or price feed required.

**Curve generation:** Each week's signal (bull/bear/chop/flip) is converted to ±1 / 0 and accumulated across 48 weekly slots. The result is a curve showing the net seasonal trend: rising = tailwind, falling = headwind. Four curves rendered: 5-YR (pink), 15-YR (brown), LT (asset accent), Combined (green, filled).

**Visual features:** Monthly background shading (green/red/amber reflecting combined signal), amber dashed vertical line at today's position, zero baseline, NOW badge in the header showing current month/week + signal, cross-hair tooltip with signal detail per TF.

**Delivered:** `js/seasonal-chart.js` (~230 lines) · `js/ui.js` (Trend tab added — was Curve) · `css/dashboard.css` (~80 lines of curve styles) · all 97 HTML files patched via `patch_add_seasonal_chart.js` · load order now 8 scripts (9 after Phase 2.5).

**Live price overlay (future):** The TradingView iframe is cross-origin and cannot accept injected overlays. To overlay price and seasonal on the same chart, replace TradingView with Lightweight Charts + a price data API (e.g. Twelve Data free tier: 800 req/day). The seasonal curve would then be a second dataset on the same chart instance. Requires an API key.

---

## ✅ Phase 5 — AI Synthesis Upgrade (Complete — v1.5)

**What was built:** `js/api.js` completely rewritten. The single-provider Claude button is replaced with a provider-agnostic multi-model AI panel injected dynamically at page load.

**Three providers:**
- **Claude Sonnet** (`claude-sonnet-4-20250514`) — Anthropic SSE streaming
- **Gemini Flash** (`gemini-1.5-flash`) — Google SSE streaming
- **Ollama** — any locally running model (e.g. `mistral:latest`); NDJSON streaming; requires `OLLAMA_ORIGINS=*` for browser CORS

Provider, API keys, and Ollama URL/model stored in `localStorage` under `kpt-cfg-*` keys. Settings panel toggled via a gear icon. No page reload required when switching providers.

**Four context layers gathered before every call:**
1. **Seasonal** — generated live from `MONTHS[]` by `_buildSeasonalSummary()` (replaces the static `SEASONAL_DATA` string — can never drift from the actual data)
2. **Curve** — computed live from `MONTHS[]`; returns current cumulative value, 4-week trend direction, position as % of annual range
3. **History** — reads `kpt-bt-{id}` from localStorage; overall signal win rate, top/bottom months by accuracy and avg return (`null` if no backtest uploaded)
4. **Sessions** — reads `kpt-idt-{id}` (`schemaVer: 3` only); best/worst session and day of week (`null` if no intraday data uploaded)

**Context bar:** Chips below the provider selector show ✓ (data available) or ○ (not available) for each layer, so users know which data is feeding the analysis.

**Structured verdict output:** Prompt forces the model to produce `## VERDICT: [LONG / SHORT / NEUTRAL / WAIT]`, a 5-row data table, a 3-month outlook paragraph, and 3 trade note bullets.

**Dynamic panel headings:** `_updatePanelHeadings()` rewrites the section label and subtitle at runtime on every provider switch. No changes to any of the 97 HTML files required.

**AI cache key:** `kpt-ai-{id}-{provider}-{year}-w{week}` — provider-scoped and weekly; switching models produces a fresh call; old provider caches auto-expire when the week rolls over.

---

### Additional Quick Wins — ✅ Complete (v1.5)

**Tab Rename (v1.5):** All four content tabs renamed for clarity — Curve→**Trend**, Chart→**Price**, Backtest→**History**, Intraday→**Sessions**. Panel IDs unchanged; only display labels changed. All 97 pages updated via `ui.js` tabs array.

**Dynamic SEASONAL_DATA (v1.5):** `_buildSeasonalSummary()` added to `api.js`. Generates a structured month-by-month text from `MONTHS[]` at runtime, replacing the static `SEASONAL_DATA` string in each data file as the source of truth. Falls back to `SEASONAL_DATA` if `MONTHS` is unavailable. The AI prompt now always reflects the current data — static strings in data files are kept as legacy fallback only.

**Print / PDF Export (v1.5):** `@media print` block (~90 lines) added to `dashboard.css`. Shows all panels regardless of tab state, hides navigation/buttons/iframes, inverts dark theme to white background with readable colours, adjusts signal tags and heatmap cells, adds page breaks between major panels.

**Session occurrence-count fix (v1.5):** By Session and By Day of Week cards now show *day-level* occurrence counts (distinct session days / distinct trading days) rather than individual bar counts. Denominators are now ~1,650 for a 33-year dataset rather than ~1,650 × 24 (H1 bars per weekday). `schemaVer` bumped 2→3.

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

## Phase 6 — Mobile Access & Deployment (Planned)

### 6A — Static Hosting Migration (Free) — ✅ Complete

Deployed to **Netlify** — connected to the private GitHub repo, auto-deploys on every push to `main`. No code changes were required.

- **Live URL:** https://kpt-seasonals.netlify.app/
- GitHub Pages was not viable (requires public repo on the free plan)
- Custom domain (`kpt.app` or similar) is a low-cost future upgrade

### 6B — Progressive Web App (PWA)
Adds installability and offline support. Requires three files, no framework, no build step:

1. **`manifest.json`** — app name, icons (192px + 512px PNG), `display: standalone`, `start_url: ./index.html`
2. **`service-worker.js`** — cache-first strategy: caches all HTML/CSS/JS/data files on install, serves from cache on fetch
3. **Registration snippet** in `index.html` `<head>`: `navigator.serviceWorker.register('./service-worker.js')`
4. **iOS install banner** — dismissible first-visit prompt explaining Share → "Add to Home Screen" (iOS does not show native install prompts)

PWA benefits: full-screen native-app feel on iPhone/iPad, instant load from cache, works offline (localStorage AI cache + all seasonals data remain accessible).

### 6C — Mobile-Responsive Layout (Planned)
The dashboard was built desktop-first. Responsive work required:
- Horizontal tab bar → scrollable strip on narrow screens
- Accordion table columns → collapse to combined signal only on mobile; tap to expand TF detail
- TradingView chart panel → constrained height on narrow screens
- AI output panel → readable single-column layout
- Signal filter bar → icon-only on mobile
- Implementation approach: CSS `@media (max-width: 768px)` blocks added to `dashboard.css`; no JS changes expected

---

## Phase 7 — UI Theme System (Planned)

### 7A — Dark / Light Mode Toggle (Simple, Priority)
Dashboard already uses CSS custom properties throughout, making theme switching straightforward:

- **Auto (system):** `@media (prefers-color-scheme: light)` CSS block redefines `:root` variables — zero JS, no UI needed
- **Manual toggle:** Sun/moon icon button in topbar (added by `ui.js`); writes `body.light-mode` class + `localStorage` preference key
- **Combined (recommended):** Respect system default, allow user override stored in `localStorage`
- Light theme requires careful design — not just an inversion, but a considered warm-neutral palette with readable signal colours on white backgrounds

### 7B — Custom Themes (Future)
Theme selector in settings panel; themes stored as CSS variable preset objects in a `themes.js` file. Initial theme options could include: Terminal Dark (current), Terminal Warm, High Contrast, Solarised. User selection persisted to `localStorage`.

### 7C — Time-Based / Session-Based Theme Switching (Future / Optional)
Auto-switch theme based on market session (London open → light, US close → dark) or local time (sunrise/sunset). Noted as a feature concept; likely too surprising as default behaviour; better as an opt-in setting.

---

## Phase 8 — AI Chat & Context Layer (Planned)

### 8A — Basic In-App Chat (Phase 1)
Extend the Analysis tab with a multi-turn chat interface below the existing one-shot analysis output. Same API providers (Claude / Gemini / Ollama). Conversation history maintained as a JS array; full thread sent with each request. Implementation:
- "Continue in chat" collapsible section below AI output
- Chat input + Send button
- Message thread rendered as alternating user/assistant bubbles
- Thread stored in `localStorage` per asset (`kpt-chat-{id}`)

### 8B — Context Window Management + Chat Compaction (Phase 1, same unit)
At N messages before estimated context limit (N-3 as early warning), trigger a compaction workflow:
- Warning appears in thread: "Chat approaching context limit."
- "Compact & Continue" button fires a summarisation prompt to the AI: produces a structured handoff document (conclusions reached, key signals highlighted, open questions)
- Handoff doc displayed in thread with "Copy" button
- Thread resets; input pre-populated with compaction template for user to paste summary and resume
- Handoff doc also saved to `localStorage` (`kpt-chat-summary-{id}`) so it survives accidental tab close

### 8C — Cross-Asset Queries (Phase 2)
Allow questions that reference more than one asset (e.g. "compare AUDUSD and NZDUSD in September"). Requires lazy-loading data files for referenced assets on demand (`<script>` injection from `data/*.js`). AI receives combined context block for both assets.

### 8D — Image / Chart Input (Phase 3)
Accept pasted or uploaded images in the chat input (TradingView screenshots, chart annotations). Base64-encode and include in the messages array. Supported by Claude and Gemini APIs natively. Ollama: only available if a multimodal model (LLaVA etc.) is loaded — degrade gracefully with a clear message when not supported.

### 8E — Portfolio & Relationship Queries (Phase 4)
"If AUDUSD is bearish in November, what does that imply for NZDUSD and AUDJPY?" Pure prompt engineering once Phase 2 data loading exists. No new architecture required; context builder aggregates all requested asset data blocks automatically.

---

## Phase 9 — Statistical Depth (Planned)

Inspired by platforms like Rise Statistics (risestatistics.app / risestatistics.com) — statistical probability dashboards for financial markets. Features in that class of tool that would add meaningful value to KPT:

### 9A — Explicit Win-Rate Percentages in Accordion (Priority)
The raw material already exists in `MONTHS[]` via star ratings and signal values, but win-rate is not surfaced as an explicit percentage. Add a "Win Rate" column or tooltip to each accordion week row: e.g. "73% bullish over 15 years." Data would need to be added to the `MONTHS[]` schema as a `wr5`, `wr15`, `wrLt` field per week, populated when data files are written or updated.

### 9B — Heatmap Visualisation Mode (Priority)
A 12×4 grid (months × weeks) colour-coded by signal strength / win rate. Extremely readable at a glance — far more scannable than the accordion for full-year pattern recognition. Implemented as a toggle on the Seasonals tab ("Accordion / Heatmap" view switch); no data changes required, just a new rendering mode in `accordion.js`.

### 9C — Backtesting Equity Curve (Medium)
The History tab currently shows per-trade backtest results as a bar chart. Extend with a cumulative equity curve: running P&L if every seasonal signal had been traded with a fixed lot size. Makes the historical edge visually compelling. Implemented in `backtest.js` as a second Chart.js dataset on the existing chart or a separate chart below.

### 9D — Cross-Asset Correlation Explorer (Larger)
A dedicated view (index page or new analysis page) showing signal confluence across all 97 assets in a matrix. "In September, which assets are all aligned bullish?" Requires a manifest-style aggregation of all monthly signals — similar in concept to `signals_manifest.js` but covering all months × weeks, not just the current week.

---

---

## Scope Boundary (Deliberately Excluded)

- **Annotated chart interpretation** (Elliott waves, Fibonacci retracements, market structure identification) — too subjective, requires the user's own framework, better handled in Claude.ai or ChatGPT directly
- **ML/AI pattern recognition on price charts** — different class of engineering problem, not in scope
- **Broker integration / live position tracking** — possible future addition but not priority

The tool provides **objective data confluence**. The trader brings their own execution framework to the final entry decision.
