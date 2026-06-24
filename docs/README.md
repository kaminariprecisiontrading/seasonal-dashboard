# Seasonal Trading Dashboard — Project Documentation

**Project:** Kaminari Precision Trading — Seasonal Confluence Engine  
**Project Start:** April 2026  
**Current Status:** v1.6 — All 5 build phases complete · 97 assets · 7 tabs per dashboard  
**Primary Tool:** Claude (claude.ai) + Anthropic API + VSCode  
**Data Source:** Moore Research Center seasonal charts (futures) · Derived synthesis (forex)  
**Repository:** Private GitHub repo — `seasonal-dashboard`  
**Deployment:** Netlify — https://kpt-seasonals.netlify.app/ (free static hosting; auto-deploys from private GitHub repo on push)

---

## What This Project Is

A personal trading confluence engine that converts Moore Research Center seasonal tendency charts into structured, interactive HTML dashboards. Each dashboard provides directional bias — Bullish, Bearish, or Choppy — broken down by timeframe (5-YR, 15-YR, long-term) and by granularity (yearly arc → monthly → weekly Wk1–4).

**All five confluence layers are now live.** Every asset dashboard has seven tabs:

| Tab | Panel | What it does |
|-----|-------|-------------|
| Seasonals | Accordion | Combined + individual TF tables; month quick-jump; current month auto-opens |
| Trend | Seasonal curve | Cumulative directional-bias chart from `MONTHS[]`; NOW marker; monthly shading |
| Price | TradingView | Embedded live/delayed price chart |
| History | Backtest | Upload MT5 D1 CSV → raw tendency, win-rate, and avg-return heatmaps vs the seasonal model |
| Sessions | Intraday bias | Upload MT5 H1/H4 CSV → average return by hour, by session, by day of week; filterable by seasonal signal |
| Macro | Calendar | Investing.com economic calendar filtered per asset + collapsible interpretation guide |
| Analysis | AI synthesis | Claude Sonnet / Gemini Flash / Ollama — structured LONG/SHORT/NEUTRAL/WAIT verdict drawing on all available data layers |

The index landing page displays real-time seasonal signals (BULL / BEAR / CHOP / FLIP) on every asset card, derived from each asset's `MONTHS[]` data via `data/signals_manifest.js` at page load.

**Vision achieved:** A single-destination confluence tool — seasonal tendency + historical validation + macro calendar + intraday timing + AI synthesis — where the trader brings their own execution framework and the dashboard provides objective data from every relevant angle.

---

## Document Index

| File | Purpose |
|------|---------|
| `README.md` | This file. Project overview, asset roster, vision. |
| `ARCHITECTURE.md` | Technical deep-dive: code structure, file layout, ASSET_CONFIG pattern, adding new assets. |
| `CHANGELOG.md` | Full version history of what was built and when. |
| `ROADMAP.md` | Completed items + prioritised future development. |
| `DATA_DICTIONARY.md` | Complete schema reference — ASSET_CONFIG fields, MONTHS[] structure, signal vocabulary, localStorage keys. |
| `CONTRIBUTING.md` | Step-by-step checklists for adding new assets, updating data, and adding new tabs. |
| `USER_GUIDE.md` | End-user guide — how to use every tab, upload CSVs, configure AI providers, and print. |
| `PROMPTS.md` | Copy-paste prompt library for all key Claude interactions. |
| `SKILL.md` | How to recreate any asset dashboard from scratch. Step-by-step prompt guide for Claude sessions. |

**Recommended Claude project files** (load these at the start of every new session):
- `README.md` — what the project is and where it stands
- `ARCHITECTURE.md` — how the code is structured
- `CHANGELOG.md` — what's been built and decided
- `SKILL.md` — how to build new assets

---

## Futures Seasonals — Live Assets (70 assets)

### Currencies (10)

| Asset | File | Timeframes | Key Finding |
|-------|------|-----------|-------------|
| AUD/USD | `assets/aud.html` | 5-YR · 15-YR · 34-YR | Q1 bull, Apr Wk1 peak→flip, May–Jun bear |
| USD Index | `assets/usd.html` | 5-YR · 15-YR · 35-YR | Double cycle: Feb/Mar peak→May trough→Jul bounce→Oct trough→Nov/Dec peak |
| JPY/USD | `assets/jpy.html` | 5-YR · 15-YR · 40-YR | Mar bull, Jul–Aug peak, Sep highest conviction SHORT |
| GBP/USD | `assets/gbp.html` | 5-YR · 15-YR · 40-YR | Feb trough→Mar–Apr unanimous peak ~100→May waterfall→Sep trough→Oct–Nov bull |
| CAD/USD | `assets/cad.html` | 5-YR · 15-YR · 40-YR | Jan spike-and-collapse, Apr Wk1 bull→Wk2 flip short, May–Jun waterfall |
| EUR/USD | `assets/eur.html` | 5-YR · 15-YR · 22-YR | EUR launched 1999 (22-YR only); strong Q1 bull, Apr Wk4 highest conviction LONG |
| CHF/USD | `assets/chf.html` | 5-YR · 15-YR · 40-YR | May ~100 peak; Dec year-end secondary peak on 40-YR |
| NZD/USD | `assets/nzd.html` | 5-YR · 15-YR · 23-YR | Jan waterfall, May Wk2 highest conviction short, Nov Wk4→Dec year-end surge |
| MXN | `assets/mxn.html` | 5-YR · 15-YR · long-YR | Long-hold bear Apr→Dec; one of the dashboard's sustained trend instruments |
| BRL | `assets/brl.html` | 5-YR · 15-YR · long-YR | Apr→mid-May bear; BRL seasonal arc shorter and sharper than MXN |

### Metals (5)

| Asset | File | Timeframes | Key Finding |
|-------|------|-----------|-------------|
| XAU Gold | `assets/xau.html` | 5-YR · 15-YR · long-YR | Jan bull, Feb–Mar peak, Apr Wk2 short, Jul/Aug/Sep secondary surge |
| XAG Silver | `assets/xag.html` | 5-YR · 15-YR · long-YR | Apr Wk3/4 short; more volatile than Gold |
| Copper | `assets/copper.html` | 5-YR · 15-YR · long-YR | Apr Wk4 short; Jan–Feb bull; Sep recovery |
| Platinum | `assets/platinum.html` | 5-YR · 15-YR · long-YR | Apr Wk1 buy + Wk4 sell; Feb–Mar peak |
| Palladium | `assets/palladium.html` | 5-YR · 15-YR · long-YR | Apr Wk1 buy; Wk4 sell; most volatile metal |

### Energy (6)

| Asset | File | Exchange | Key Finding |
|-------|------|---------|-------------|
| Crude Oil | `assets/cl.html` | NYMEX | Q1 bull, summer peak, autumn trough |
| Brent Crude | `assets/brent.html` | ICE | Similar arc to WTI; slightly earlier seasonal peaks |
| Natural Gas | `assets/ng.html` | NYMEX | Oct–Nov annual high; Apr–Aug trough zone |
| Heating Oil/ULSD | `assets/ulsd.html` | NYMEX | Winter-driven; Jan–Feb peak, spring decline |
| Gasoline/RBOB | `assets/rb.html` | NYMEX | Spring driving season; Apr–May peak |
| Gas Oil | `assets/gasoil.html` | ICE | European distillate; winter-driven like Heating Oil |

### Interest Rates (14)

| Asset | File | Exchange | TF | Key Finding |
|-------|------|---------|---|-------------|
| T-Bonds | `assets/tbonds.html` | CBOT | 40-YR | Nov/Dec annual high; June/Jul annual low |
| T-Notes 10Y | `assets/tnotes10.html` | CBOT | 39-YR | Similar to T-Bonds with 10Y compression |
| T-Notes 5Y | `assets/tnotes5.html` | CBOT | 33-YR | More volatile version of 10Y pattern |
| T-Notes 2Y | `assets/tnotes2.html` | CBOT | 30-YR | Shortest US rate; most monetary-policy-reactive |
| Eurodollar | `assets/eurodollar.html` | CME | 39-YR | Dec annual high; Jun/Jul annual low |
| Aus T-Bonds 10Y | `assets/austbonds10.html` | SFE | 36-YR | Year-end bull; Q2 trough |
| Aus T-Bonds 3Y | `assets/austbonds3.html` | SFE | 33-YR | Similar to 10Y with higher short-TF volatility |
| Aus T-Bills 3M | `assets/austbills3m.html` | SFE | 40-YR | Smoothest Australian rates instrument |
| Long Gilt | `assets/longgilt.html` | LIFFE | 38-YR | UK rates; year-end highs; summer trough |
| Short Sterling | `assets/shortsterling.html` | LIFFE | 38-YR | UK short rate; similar arc to Long Gilt |
| Euro-Bund | `assets/eurobund.html` | EUREX | 30-YR | Year-end extreme highs; Feb-Mar spike then crash; Aug reversal |
| Euro-Bobl | `assets/eurobobl.html` | EUREX | 23-YR | Year-end extreme highs (23-YR ~100); Nov annual high |
| Euro-Yen | `assets/euroyen.html` | SGX | 31-YR | Feb EXPLOSIVE spike (31-YR 1→100); most dramatic move in rates complex |
| Fed Funds | `assets/fedfunds.html` | CBOT | 32-YR | INVERTED instrument: Jan 5-YR at annual HIGH; Jun/Jul at absolute trough |

### Indices (13)

| Asset | File | Exchange | TF | Key Finding |
|-------|------|---------|---|-------------|
| S&P 500 | `assets/sp500.html` | CME | 39-YR | Nov/Dec annual high; strong Q4 bull |
| S&P eMini | `assets/es.html` | CME | 23-YR | Similar to SP500; confirmed by shorter dataset |
| Russell 2000 | `assets/rty.html` | CME | 17-YR | Small-cap divergence; Jan/Dec peaks |
| DJIA eMini | `assets/ym.html` | CBOT | 23-YR | Blue-chip seasonals; Nov annual high |
| Nasdaq 100 | `assets/nq.html` | CME | 24-YR | Tech bias; Jan/Dec surges; summer weakness |
| S&P 400 | `assets/md.html` | CME | 29-YR | Mid-cap; less volatile than RTY |
| GSCI | `assets/gsci.html` | CME | 29-YR | Commodity index; unique seasonal driven by energy weightings |
| Nikkei 225 | `assets/nk.html` | SIMEX | 34-YR | Jan/Feb peak; Sep trough; year-end recovery |
| FTSE 100 | `assets/ftse.html` | LIFFE | 37-YR | Jan bull; May/Jun weakness; Nov/Dec recovery |
| SPI 200 | `assets/spi.html` | SFE | 21-YR | Australian equities; Apr peak; Sep/Oct trough |
| DAX | `assets/dax.html` | EUREX | 30-YR | Jan bull; May correction; Nov/Dec annual high |
| CAC 40 | `assets/cac.html` | MATIF | 32-YR | Mirrors DAX with slight lag |
| Hang Seng | `assets/hsi.html` | HKFE | 34-YR | Jan surge; Q2 weakness; Oct/Nov recovery |

### Softs (8)

| Asset | File | Exchange | TF | Key Finding |
|-------|------|---------|---|-------------|
| Coffee "C" | `assets/coffee.html` | ICE | 40-YR | Jan 5-YR high; Feb 15-YR peak; Jun annual trough; Jul flip long |
| Sugar #11 | `assets/sugar11.html` | ICE | 40-YR | DUAL TROUGH: Jun first trough, Sep second trough; Oct explosive surge |
| Cocoa | `assets/cocoa.html` | ICE | 40-YR | May: 40-YR at 0 while 5-YR/15-YR at 100 (most extreme TF divergence in dashboard) |
| Orange Juice | `assets/oj.html` | ICE | 40-YR | Jan 5-YR at annual HIGH; 40-YR dual crashes (Feb + Aug near 0) |
| Rough Rice | `assets/roughrice.html` | CBOT | 34-YR | Dec/Jan annual high ~99→crashes to 5 on Jan 3; April near-0 trough = best long entry |
| London Sugar | `assets/londonsugar.html` | LCE | 30-YR | June 30-YR ANNUAL HIGH (~95-100); most dramatic LCE spike; August annual trough near 0 |
| London Cocoa | `assets/londoncocoa.html` | LCE | 34-YR | 34-YR visits near 0 FOUR TIMES per year (Jan/Apr/Aug/Oct); Feb 34-YR annual high |
| Robusta Coffee | `assets/robusta.html` | LCE | 29-YR | Year ENDS at trough; Feb 29-YR annual high (~95-100); Oct annual low near 0 |

### Grains (8)

| Asset | File | Exchange | TF | Key Finding |
|-------|------|---------|---|-------------|
| Soybeans | `assets/soybeans.html` | CBOT | 40-YR | Jun/Jul annual high; harvest pressure Sep/Oct |
| Soy Meal | `assets/sbmeal.html` | CBOT | 40-YR | Similar arc to Soybeans; tighter seasonal range |
| Soy Oil | `assets/sboil.html` | CBOT | 40-YR | More volatile than Meal; tropical oil linkage |
| Wheat (CBOT) | `assets/wheat.html` | CBOT | 40-YR | Jul annual high; winter wheat planting dip |
| Wheat (KCBT) | `assets/wheatk.html` | KCBT | 40-YR | Hard red winter wheat; similar to CBOT Wheat |
| Wheat (MGE) | `assets/wheatm.html` | MGE | 40-YR | Spring wheat; Jul peak aligns with CBOT/KCBT |
| Corn | `assets/corn.html` | CBOT | 40-YR | Jun/Jul annual high; Sep harvest pressure trough |
| Oats | `assets/oats.html` | CBOT | 40-YR | Feb/Mar peak; Oct trough; thinner market |

### Fiber, Meats & Dairy (6)

| Asset | File | Exchange | Key Finding |
|-------|------|---------|-------------|
| Cotton | `assets/cotton.html` | NYBOT | Mar peak; Sep/Oct trough |
| Lumber | `assets/lumber.html` | CME | Spring building season surge; winter trough |
| Live Cattle | `assets/lc.html` | CME | Q1 bull; summer trough; Q4 recovery |
| Feeder Cattle | `assets/fc.html` | CME | Similar to Live Cattle; corn-feed cost linkage |
| Lean Hogs | `assets/lh.html` | CME | May/Jun peak (summer BBQ season); winter trough |
| Class III Milk | `assets/milk.html` | CME | Feb/Mar peak (butter/cheese demand); Jul/Aug trough |

---

## Forex Seasonals — Live Assets (27 pairs)

All 27 derived FX pairs are complete. Each pair combines two CME futures seasonal components — base currency direct, quote currency inverted.

**Majors**

| Pair | File | Components | Key Signal |
|------|------|-----------|-----------|
| AUDUSD | `assets/fx-audusd.html` | AUD CME + USD ICE (inv.) | Jan–Mar LONG strongest; Oct–Nov SHORT (USD dominant) |
| EURUSD | `assets/fx-eurusd.html` | EUR CME + USD ICE (inv.) | Jan–Feb SHORT strongest; Mar FLIP MONTH; May SHORT (component collision) |
| GBPUSD | `assets/fx-gbpusd.html` | GBP CME + USD ICE (inv.) | Mar LONG; Nov–Dec SHORT (GBP lows + USD peak) |
| USDCAD | `assets/fx-usdcad.html` | USD ICE + CAD CME (inv.) | Jan–Feb & May LONG strongest; Apr SHORT (flip collision) |
| USDCHF | `assets/fx-usdchf.html` | USD ICE + CHF CME (inv.) | Jan–Feb LONG; Mar FLIP MONTH → SHORT; Apr SHORT continuation |
| USDJPY | `assets/fx-usdjpy.html` | USD ICE + JPY CME (inv.) | Sep LONG standout — JPY collapse + USD recovery |

**Minors**

| Pair | File | Components | Key Signal |
|------|------|-----------|-----------|
| AUDCAD | `assets/fx-audcad.html` | AUD CME + CAD CME (inv.) | Jan–Mar LONG strongest run; Apr FLIP MONTH |
| AUDCHF | `assets/fx-audchf.html` | AUD CME + CHF CME (inv.) | Jan–Feb LONG; Apr FLIP MONTH; May SHORT |
| AUDNZD | `assets/fx-audnzd.html` | AUD CME + NZD CME (inv.) | Jan–Mar LONG strongest run; Apr FLIP MONTH |
| EURAUD | `assets/fx-euraud.html` | EUR CME + AUD CME (inv.) | Jan–Feb SHORT; Apr FLIP MONTH; Nov SHORT |
| EURCHF | `assets/fx-eurchf.html` | EUR CME + CHF CME (inv.) | May & Sep–Nov SHORT; Jun LONG |
| EURGBP | `assets/fx-eurgbp.html` | EUR CME + GBP CME (inv.) | Apr FLIP MONTH; Nov SHORT; Dec LONG |
| GBPAUD | `assets/fx-gbpaud.html` | GBP CME + AUD CME (inv.) | Jan & Dec SHORT; Oct LONG |
| GBPCHF | `assets/fx-gbpchf.html` | GBP CME + CHF CME (inv.) | Oct DOUBLE ALIGNMENT LONG; Dec DOUBLE ALIGNMENT SHORT |
| NZDUSD | `assets/fx-nzdusd.html` | NZD CME + USD ICE (inv.) | Jan/Feb/Jun DOUBLE ALIGNMENT SHORT; Aug DOUBLE ALIGNMENT LONG |

**Crosses**

| Pair | File | Components | Key Signal |
|------|------|-----------|-----------|
| AUDJPY | `assets/fx-audjpy.html` | AUD CME + JPY CME (inv.) | Jan DOUBLE ALIGNMENT LONG; Feb LONG |
| CADCHF | `assets/fx-cadchf.html` | CAD CME + CHF CME (inv.) | Jul DOUBLE ALIGNMENT LONG; Dec SHORT |
| CADJPY | `assets/fx-cadjpy.html` | CAD CME + JPY CME (inv.) | Mar SHORT standout |
| EURCAD | `assets/fx-eurcad.html` | EUR CME + CAD CME (inv.) | May SHORT stand-off; Jun DOUBLE ALIGNMENT LONG; Jul & Nov SHORT |
| EURJPY | `assets/fx-eurjpy.html` | EUR CME + JPY CME (inv.) | May, Jul & Nov SHORT strongest |
| EURNZD | `assets/fx-eurnzd.html` | EUR CME + NZD CME (inv.) | May MAXIMUM CONFLICT; Jun DOUBLE ALIGNMENT LONG; Dec defining year-end collision |
| GBPCAD | `assets/fx-gbpcad.html` | GBP CME + CAD CME (inv.) | Sep MAXIMUM CONFLICT; Oct–Nov DOUBLE ALIGNMENT LONG |
| GBPJPY | `assets/fx-gbpjpy.html` | GBP CME + JPY CME (inv.) | Mar & Sep MAXIMUM CONFLICT; Oct–Nov DOUBLE ALIGNMENT LONG |
| GBPNZD | `assets/fx-gbpnzd.html` | GBP CME + NZD CME (inv.) | May & Dec defining collisions |
| NZDCAD | `assets/fx-nzdcad.html` | NZD CME + CAD CME (inv.) | Sep rare dual-flip collision; Dec clean LONG dominance |
| NZDCHF | `assets/fx-nzdchf.html` | NZD CME + CHF CME (inv.) | THREE maximum-conviction collisions (May, Sep, Dec) |
| NZDJPY | `assets/fx-nzdjpy.html` | NZD CME + JPY CME (inv.) | Sep defining collision; Dec year-end stand-off |

---

## Dynamic Index Signals

Each status-complete card on the landing page shows a runtime-derived signal computed at page load from `data/signals_manifest.js`. The manifest contains the full 12-month × 4-week `com` string for all 97 assets. The landing page reads `currentMonth` and `currentWeek` from the system clock and maps the relevant entry to BULL / BEAR / CHOP / FLIP / AVOID.

A **signal filter bar** (All / Bull / Bear / Other) allows filtering the index by signal type. Each card is tagged with `data-sig-type` during the manifest injection pass. A **manifest freshness note** below the filter bar shows when the manifest was last regenerated, sourced from `const SIGNALS_GENERATED` in `signals_manifest.js`.

**To regenerate the manifest** (after updating any data file):
```
node gen_signals_manifest.js
```
Run from the `scripts/` directory. The script reads all 97 data files and overwrites `data/signals_manifest.js`.

---

## Confluence Engine — Build Status

| Layer | Phase | Status | Tab |
|-------|-------|--------|-----|
| Seasonal tendency | Phase 1 | ✅ Complete (v1.0) | Seasonals |
| Seasonal curve chart | Phase 4 | ✅ Complete (v1.4) | Trend |
| Live price chart | Quick win | ✅ Complete (v1.1) | Price |
| D1 price backtest | Phase 2 | ✅ Complete (v1.2) | History |
| H1/H4 intraday bias | Phase 2.5 | ✅ Complete (v1.5) | Sessions |
| Macro calendar | Phase 3 | ✅ Complete (v1.3) | Macro |
| AI synthesis | Phase 5 | ✅ Complete (v1.5) | Analysis |

**All seven layers delivered.** The AI Analysis tab draws on all available data — seasonal signals, curve position, backtest win rates, and intraday session bias — to produce a structured LONG/SHORT/NEUTRAL/WAIT verdict. Providers: Claude Sonnet, Gemini Flash, or any local Ollama model.

**v1.6 additions (UX layer):** Configurable broker timezone offset on Sessions tab · AI cache clear button · TradingView symbol override (`tvSymbol`) · Single-tab print mode · Signal filter bar + manifest freshness on index · Three new reference docs (DATA_DICTIONARY, CONTRIBUTING, USER_GUIDE) · `scripts/` folder with utility script documentation.

**Scope boundary:** No annotated chart interpretation (Elliott waves, Fibonacci, market structure). The tool provides objective data confluence. The trader applies their own execution framework.

---

## Building a Trade Idea — Step-by-Step Workflow

The dashboard is designed to be worked through in layer order, from broad seasonal context down to execution timing. Each step narrows the picture.

**1. Scan the index for current-week bias.**
Open `index.html`. Every asset card shows a live signal (BULL / BEAR / CHOP / FLIP) for the current week, derived from the signals manifest. Use the filter bar to isolate all BULL or BEAR assets at a glance. The freshness note shows when the manifest was last regenerated.

**2. Open an asset and check the Seasonals tab.**
The combined accordion auto-opens to the current month. Read the week-level combined signal and conviction stars (★★★★★ = maximum confluence across all three timeframes). Expand adjacent weeks to see whether the bias is building or fading. Use the quick-jump buttons to check the broader monthly arc.

**3. Confirm direction on the Trend tab.**
The seasonal curve shows the cumulative directional bias across the year. The NOW marker shows where the asset sits in its seasonal cycle today. A rising curve confirms a bullish seasonal; a curve already past its peak is a caution signal even if the week reads BULL.

**4. Check current price on the Price tab.**
The live TradingView chart shows where price is trading relative to recent structure. Seasonal bias is directional context — not an entry signal. Price should be approaching a logical level before acting.

**5. Validate the edge on the History tab.**
Upload a D1 CSV export from MT5 (see `USER_GUIDE.md` for the 7-step export process). The backtest panel shows raw tendency, win rate, and average return for each month and week historically. A seasonal signal with a 35% win rate over 30 years is much less interesting than one with 70%.

**6. Find the timing window on the Sessions tab.**
Upload an H1 or H4 CSV. The Sessions panel breaks down average return by hour of day, by session (London / New York / Asian / Pacific), and by day of week. This answers "given the seasonal is bullish this week, *when* in the week has price historically moved?" Filter the session cards by seasonal signal to isolate the relevant subset.

**7. Check for macro risk on the Macro tab.**
The Investing.com calendar is pre-filtered to the currencies and events most relevant to the asset. A high-impact event mid-week can override any seasonal tendency. The interpretation guide explains which event types matter most for each asset class.

**8. Run the AI synthesis on the Analysis tab.**
Click Run Analysis. The AI draws on all available data layers — seasonal signals, curve position, backtest win rates, and session timing — and produces a structured verdict: LONG / SHORT / NEUTRAL / WAIT, with rationale and a risk note. Use the provider toggle to switch between Claude, Gemini, or a local Ollama model. Results are cached weekly so subsequent opens are instant.

**9. Apply your own execution framework.**
The dashboard provides objective confluence data. Entry trigger, position sizing, stop placement, and trade management are the trader's own decisions. The tool's job is to ensure every angle has been considered before a bias is formed.

> For detailed usage instructions on any tab, see `docs/USER_GUIDE.md`.

---

## Tools & Environment

- **Chart Source:** Moore Research Center (mooreres.com) — seasonal tendency overlays
- **AI Engine (building):** Claude via claude.ai (Cowork) — design, analysis, dashboard generation
- **AI Engine (in-dashboard, option 1):** Anthropic API — Claude Sonnet (`claude-sonnet-4-20250514`)
- **AI Engine (in-dashboard, option 2):** Google AI Studio API — Gemini Flash (`gemini-2.0-flash`)
- **AI Engine (in-dashboard, option 3):** Ollama — any local model (e.g. `mistral:latest`)
- **API Console:** console.anthropic.com / aistudio.google.com — separate billing from claude.ai subscription
- **Code Editor:** Visual Studio Code
- **Version Control:** Git + GitHub (private repository)
- **Hosting:** Netlify — https://kpt-seasonals.netlify.app/ · free tier · auto-deploys from private GitHub repo on every push · HTTPS included
- **Local Preview:** Live Server (VSCode extension) — required for correct `http://` context; do not open HTML files directly via `file://`
- **Local AI server:** Ollama — requires `set OLLAMA_ORIGINS=* && ollama serve` for browser CORS; `start_kpt.bat` automates this

| Context | Tool | Best Used For |
|---------|------|--------------|
| Design & planning | Claude.ai / Cowork | New asset analysis, architectural decisions, doc updates |
| Dashboard AI (cloud) | Claude API / Gemini API | Production weekly analysis with structured verdict output |
| Dashboard AI (local) | Ollama | Offline analysis; no API costs; model choice (mistral, llama3, etc.) |

---

## Copyright & Attribution

All pages carry dual attribution:
- **Moore Research Center © 2020** — seasonal tendency data source
- **© 2026 Kaminari Precision Trading** — dashboard interface design and analysis framework

The copyright line uses **inline styles** on the `<span>` (not a CSS class) so it always renders regardless of CSS load order or caching.
