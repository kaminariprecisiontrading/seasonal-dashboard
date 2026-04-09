# Seasonal Trading Dashboard — Project Documentation

**Project:** Kaminari Precision Trading — Seasonal Confluence Engine  
**Project Start:** April 2026  
**Current Status:** v0.7 — AUD, USD, JPY, GBP futures complete · AUDUSD, GBPUSD, USDJPY forex complete · Sticky nav + section reorder live · GitHub Pages deployed  
**Primary Tool:** Claude (claude.ai) + Anthropic API + VSCode + Claude Code  
**Data Source:** Moore Research Center seasonal charts (futures) · Derived synthesis (forex)  
**Repository:** Private GitHub repo — `seasonal-dashboard`  
**Deployment:** GitHub Pages (static hosting, zero cost)

---

## What This Project Is

A personal trading confluence engine that converts Moore Research Center seasonal tendency charts into structured, interactive HTML dashboards. Each dashboard provides directional bias — Bullish, Bearish, or Choppy — broken down by timeframe (5-YR, 15-YR, long-term) and by granularity (yearly arc → monthly → weekly Wk1–4).

A live Claude AI analysis layer is embedded inside each dashboard, callable via button, which synthesises all timeframe data into written trade guidance.

**Long-term vision:** Expand beyond seasonals into a full trading confluence platform — layering seasonal tendency + macro data (NFP, CPI, PPI, interest rates) + raw price comparison (CSV from MT5) + live/delayed price charts — giving traders a single destination to build a high-confidence directional bias on any asset before entering a trade.

---

## Document Index

| File | Purpose |
|------|---------|
| `README.md` | This file. Project overview, asset tracker, vision. |
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

## Futures Seasonals — Live Assets

| Asset | File | Timeframes | Key Finding |
|-------|------|-----------|-------------|
| AUD/USD | `assets/aud.html` + `data/aud.js` | 5-YR, 15-YR, 34-YR | Q1 bull, Apr Wk1 peak→flip, May–Jun bear |
| USD Index | `assets/usd.html` + `data/usd.js` | 5-YR, 15-YR, 35-YR | Double cycle: Feb/Mar peak→May trough→Jul bounce→Oct trough→Nov/Dec peak |
| JPY/USD | `assets/jpy.html` + `data/jpy.js` | 5-YR, 15-YR, 40-YR | Mar bull, Jul–Aug peak, Sep highest conviction SHORT |
| GBP/USD | `assets/gbp.html` + `data/gbp.js` | 5-YR, 15-YR, 40-YR | Feb trough→Mar–Apr unanimous peak ~100→May waterfall→Sep trough→Oct–Nov bull→Dec weak |

## Forex Seasonals — Live Assets

| Pair | File | Components | Key Signal |
|------|------|-----------|-----------|
| AUDUSD | `assets/fx-audusd.html` + `data/fx-audusd.js` | AUD CME + USD ICE (inv.) | Jan–Mar LONG strongest; Oct–Nov SHORT (USD dominant) |
| USDJPY | `assets/fx-usdjpy.html` + `data/fx-usdjpy.js` | USD ICE + JPY CME (inv.) | Sep LONG standout — JPY collapse + USD recovery |
| GBPUSD | `assets/fx-gbpusd.html` + `data/fx-gbpusd.js` | GBP CME + USD ICE (inv.) | Mar LONG; Nov–Dec SHORT (GBP lows + USD peak) |

## Futures Seasonals — Planned

**Currencies:** CAD, NZD, EUR, CHF, MXN, BRL  
**Metals:** XAU, XAG, Copper, Platinum, Palladium  
**Energy:** Crude Oil, Brent, Natural Gas, Heating Oil, Gasoline, Gas Oil  
**Interest Rates:** T-Bond 30Y, T-Note 10Y/5Y/2Y, Eurodollar, Fed Funds, Aus T-Bonds/T-Bills, Long Gilt, Short Sterling, Euro-Bund, Euro-Bobl, Euro-Yen  
**Indices:** S&P 500, S&P eMini, Russell 2000, DJIA eMini, Nasdaq 100, S&P 400, GSCI, Nikkei 225, FTSE 100, SPI 200, DAX, CAC 40, Hang Seng  
**Softs:** Coffee, Sugar #11, Cocoa, Orange Juice, Rough Rice, London Sugar, London Cocoa, Robusta Coffee  
**Grains:** Soybeans, Soy Meal, Soy Oil, Wheat (CBOT/KCBT/MGE), Corn, Oats  
**Fiber:** Cotton, Lumber  
**Meats & Dairy:** Live Cattle, Feeder Cattle, Lean Hogs, Class III Milk

## Forex Seasonals — Planned

**Majors:** EURUSD, USDCAD, USDCHF (3 remaining)  
**Minors:** AUDCAD, AUDCHF, AUDNZD, EURAUD, EURCHF, EURGBP, GBPAUD, GBPCHF, NZDUSD  
**Crosses:** AUDJPY, CADCHF, CADJPY, EURCAD, EURJPY, EURNZD, GBPCAD, GBPJPY, GBPNZD, NZDCAD, NZDCHF, NZDJPY

---

## Product Vision — Confluence Engine Layers

| Layer | Status | Description |
|-------|--------|-------------|
| 1 — Seasonal Tendency | ✅ In progress | Structural long-term bias. The tide. |
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
