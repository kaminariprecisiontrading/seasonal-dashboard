# Seasonal Trading Dashboard — Project Documentation

**Project:** Kaminari Precision Trading — Seasonal Confluence Engine  
**Project Start:** April 2026  
**Current Status:** v1.0 — ALL 97 ASSETS COMPLETE · Dynamic index signals live  
**Primary Tool:** Claude (claude.ai) + Anthropic API + VSCode + Claude Code  
**Data Source:** Moore Research Center seasonal charts (futures) · Derived synthesis (forex)  
**Repository:** Private GitHub repo — `seasonal-dashboard`  
**Deployment:** GitHub Pages (static hosting, zero cost)

---

## What This Project Is

A personal trading confluence engine that converts Moore Research Center seasonal tendency charts into structured, interactive HTML dashboards. Each dashboard provides directional bias — Bullish, Bearish, or Choppy — broken down by timeframe (5-YR, 15-YR, long-term) and by granularity (yearly arc → monthly → weekly Wk1–4).

A live Claude AI analysis layer is embedded inside each dashboard, callable via button, which synthesises all timeframe data into written trade guidance.

The index landing page displays real-time seasonal signals (BULL / BEAR / CHOP / FLIP) on every asset card, derived from each asset's `MONTHS[]` data via `data/signals_manifest.js` at page load.

**Long-term vision:** Expand beyond seasonals into a full trading confluence platform — layering seasonal tendency + macro data (NFP, CPI, PPI, interest rates) + raw price comparison (CSV from MT5) + live/delayed price charts — giving traders a single destination to build a high-confidence directional bias on any asset before entering a trade.

---

## Document Index

| File | Purpose |
|------|---------|
| `README.md` | This file. Project overview, asset roster, vision. |
| `SKILL.md` | How to recreate any asset dashboard from scratch. Step-by-step prompt guide. |
| `ARCHITECTURE.md` | Technical deep-dive: code structure, file layout, ASSET_CONFIG pattern, adding new assets. |
| `CHANGELOG.md` | Full version history of what was built and when. |
| `ROADMAP.md` | Completed items + prioritised future development. |
| `PROMPTS.md` | Copy-paste prompt library for all key Claude interactions. |

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

### Fiber, Meats & Dairy (8)

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

**To regenerate the manifest** (after updating any data file):
```
node gen_signals_manifest.js
```
Run from the project root. The script reads all 97 data files and overwrites `data/signals_manifest.js`.

---

## Product Vision — Confluence Engine Layers

| Layer | Status | Description |
|-------|--------|-------------|
| 1 — Seasonal Tendency | ✅ Complete | Structural long-term bias. 97 assets live. The tide. |
| 2 — Price Data (CSV) | 🔲 Phase 2 next | Upload raw MT5 OHLCV CSV. Compare actual price behaviour vs seasonal model. No annotation — pure data. |
| 3 — Macro Data | 🔲 Phase 3 | NFP, CPI, PPI, interest rates. ForexFactory embed → API (Tradingeconomics / FRED). |
| 4 — Live Price Context | 🔲 Phase 4 | TradingView embedded widget (quick win) then Twelve Data API for native OHLC charts. |
| 5 — AI Synthesis | 🔲 Phase 5 | Claude reads all layers and produces a single consolidated weekly bias verdict. |

**Scope boundary:** No annotated chart interpretation (Elliott waves, Fibonacci, market structure). The tool provides objective data confluence. The trader applies their own execution framework.

---

## The Trading Playbook (April — Source Context)

**BUY (April):** AUD Wk1, GBP Wk1, CAD Wk1, USD end Wk4, EUR very strong Wk4, JPY Wk1, CHF end Wk3/early Wk4, NZD Wk1, Palladium Wk1

**SELL (April):** AUD Wk2/3, GBP Wk4, CAD Wk2–4, USD Wk1/2 + re-entry Wk4, JPY end Wk2/early Wk3 + re-entry Wk4, CHF Wk1 + early Wk4, MXN anytime Wk1–4 hold to early Dec, NZD Wk2–4, BRL Wk1–3 hold to mid-May, XAU Wk2, XAG Wk3/4, Copper Wk4, Platinum Wk2/3, Palladium Wk4

**CHOPPY (April):** EUR Wk1–3, CHF all month, MXN all month, BRL Wk1–3

---

## Tools & Environment

- **Chart Source:** Moore Research Center (mooreres.com) — seasonal tendency overlays
- **AI Engine (building):** Claude via claude.ai — design, analysis, dashboard generation
- **AI Engine (in-dashboard):** Anthropic API — Claude Sonnet called via button
- **API Console:** console.anthropic.com — separate billing from Claude.ai subscription
- **Model Used:** `claude-sonnet-4-20250514` (in dashboard AI button)
- **Code Editor:** Visual Studio Code
- **AI Coding Assistant:** Claude Code (official Anthropic VSCode extension)
- **Version Control:** Git + GitHub (private repository)
- **Hosting:** GitHub Pages — static site, free, deployed from main branch
- **Local Preview:** Live Server (VSCode extension)

| Context | Tool | Best Used For |
|---------|------|--------------|
| Design & planning | Claude.ai (this chat) | New asset analysis, generating dashboards, architectural decisions |
| Code editing | Claude Code in VSCode | Editing existing files, multi-file changes, commits, iterating on code |

---

## Copyright & Attribution

All pages carry dual attribution:
- **Moore Research Center © 2020** — seasonal tendency data source
- **© 2026 Kaminari Precision Trading** — dashboard interface design and analysis framework

The copyright line uses **inline styles** on the `<span>` (not a CSS class) so it always renders regardless of CSS load order or caching.
