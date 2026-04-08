# Seasonal Trading Dashboard — Project Documentation

**Project Start:** April 2026  
**Current Status:** Active Development — AUD Prototype Complete, VSCode + GitHub configured  
**Primary Tool:** Claude (claude.ai) + Anthropic API + VSCode + Claude Code  
**Data Source:** Moore Research Center seasonal charts  
**Repository:** Private GitHub repo — `seasonal-dashboard`  
**Deployment:** GitHub Pages (static hosting, zero cost)

---

## What This Project Is

A personal seasonal trading analysis system that converts visual seasonal tendency charts (from Moore Research Center) into structured, interactive HTML dashboards. Each dashboard provides directional bias — Bullish, Bearish, or Choppy — broken down by timeframe (5-YR, 15-YR, 34-YR) and by granularity (yearly arc → monthly → weekly).

A live Claude AI analysis layer is embedded inside each dashboard, callable via button, which synthesises all timeframe data into written trade guidance.

---

## Document Index

| File | Purpose |
|------|---------|
| `README.md` | This file. Project overview and navigation. |
| `SKILL.md` | How to recreate any asset dashboard from scratch using Claude. Step-by-step prompt guide. |
| `ARCHITECTURE.md` | Technical deep-dive into the dashboard code structure, API integration, and data model. |
| `CHANGELOG.md` | Full version history of what was built and when. |
| `ROADMAP.md` | Planned enhancements and future development ideas. |
| `PROMPTS.md` | Copy-paste prompt library for all key Claude interactions in this project. |

---

## Assets Covered So Far

| Asset | Type | Timeframes | Dashboard Status |
|-------|------|-----------|-----------------|
| AUD/USD | Currency | 5-YR, 15-YR, 34-YR | ✅ Complete |

**Planned next** (from trading playbook):
- GBP, CAD, JPY, NZD, USD, EUR, CHF (currencies)
- MXN, BRL (long-hold currencies)
- XAU, XAG, Copper, Platinum, Palladium (metals)

---

## The Trading Playbook (Source Context)

The dashboards are built around a monthly seasonal playbook. The April playbook that initiated this project:

**BUY (April):** AUD Wk1, GBP Wk1, CAD Wk1, USD end Wk4, EUR very strong Wk4, JPY Wk1, CHF end Wk3/early Wk4, NZD Wk1, Palladium Wk1

**SELL (April):** AUD Wk2/3, GBP Wk4, CAD Wk2-4, USD Wk1/2 + re-entry Wk4, JPY end Wk2/early Wk3 + re-entry Wk4, CHF Wk1 + early Wk4, MXN anytime Wk1-4 hold to early Dec, NZD Wk2-4, BRL Wk1-3 hold to mid-May, XAU Wk2, XAG Wk3/4, Copper Wk4, Platinum Wk2/3, Palladium Wk4

**CHOPPY (April):** EUR Wk1-3, CHF all month, MXN all month, BRL Wk1-3

---

## Tools & Environment

- **Chart Source:** Moore Research Center (mooreres.com) — seasonal tendency overlays
- **AI Engine (building):** Claude via claude.ai — used for design, analysis, and generating dashboards
- **AI Engine (in-dashboard):** Anthropic API — Claude Sonnet called via button inside each dashboard
- **API Console:** console.anthropic.com — separate billing from Claude.ai subscription
- **Model Used:** claude-sonnet-4-20250514 (in dashboard AI button)
- **Code Editor:** Visual Studio Code
- **AI Coding Assistant:** Claude Code (official Anthropic VSCode extension) — for editing files directly in the project
- **Version Control:** Git + GitHub (private repository)
- **Hosting:** GitHub Pages — static site, free, deployed from main branch
- **Local Preview:** Live Server (VSCode extension) — auto-refreshes browser on file save

## Two Ways to Work With Claude

| Context | Tool | Best Used For |
|---------|------|--------------|
| Design & planning | Claude.ai (this chat) | New asset analysis, generating dashboards, architectural decisions |
| Code editing | Claude Code in VSCode | Editing existing files, multi-file changes, commits, iterating on code |
