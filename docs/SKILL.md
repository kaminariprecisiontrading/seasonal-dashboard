---
name: seasonal-dashboard
description: How to build a seasonal trading analysis dashboard from a Moore Research Center chart image. Covers chart analysis, dashboard generation, accordion table, Claude API button, and Netlify deployment. Use this skill whenever building or recreating an asset dashboard from scratch.
version: 1.6.2
updated: June 2026
futures_complete: AUD/USD (34-YR), USD Index (35-YR), JPY/USD (40-YR), GBP/USD (40-YR), CAD/USD (40-YR), EUR/USD (22-YR), CHF/USD (40-YR), NZD/USD (23-YR)
forex_complete: AUDUSD, USDJPY, GBPUSD, AUDJPY, EURJPY, GBPJPY, CADJPY, NZDJPY, CHFJPY, EURUSD, EURGBP, EURCAD, EURAUD, EURNZD, EURCHF, GBPCAD, GBPAUD, GBPNZD, GBPCHF, AUDCAD, AUDNZD, AUDCHF, CADCHF, NZDCAD, NZDCHF, NZDUSD, USDCAD, USDCHF
total_assets: 98 (70 futures + 27 FX pairs + BTCUSD)
tabs: Seasonals | Trend | Profiling | Live Price | Macro | Upload | Analysis
scripts: 8 (data → accordion → api → tradingview → macro → seasonal-chart → upload → ui)
---

# SKILL.md — How to Build a Seasonal Trading Dashboard

This document is a complete recreation guide. Follow these steps in order to produce any asset dashboard to the same standard as existing assets.

---

## Prerequisites

- Access to Claude (claude.ai, Pro plan or higher recommended)
- Moore Research Center seasonal charts for your target asset
- An Anthropic API account (console.anthropic.com) with billing enabled
- VSCode with Live Server extension installed
- Git + GitHub account with SSH authentication configured

---

## Step 1 — Gather Your Charts

For each asset, you need the seasonal overlay chart from Moore Research Center. The chart shows three lines:

| Line Colour | Timeframe |
|------------|-----------|
| Pink / Magenta | 5-Year seasonal |
| Brown / Dark Red | 15-Year seasonal |
| Blue | Long-term (34-YR, 35-YR, 40-YR — varies by asset) |

**Image batching rule:** Paste no more than 4–6 images per Claude message. Recommended groupings:
- Batch 1: AUD, GBP, CAD, JPY, NZD
- Batch 2: USD, EUR, CHF
- Batch 3: MXN, BRL
- Batch 4: XAU, XAG, Copper, Platinum, Palladium

Always name the asset and confirm the timeframes when pasting (e.g. "GBP — 5-YR pink, 15-YR brown, 40-YR blue").

---

## Step 2 — Prompt Claude to Analyse the Chart

```
I am sending you a seasonal tendency chart for [ASSET].
Timeframes: [5-YR = pink], [15-YR = brown], [XX-YR = blue].

Please analyse each timeframe line carefully and provide:

1. YEARLY BIAS — The macro seasonal arc across the full year (Jan–Dec)
2. MONTHLY BIAS — For each month, overall directional bias and approximate peak/trough timing
3. WEEKLY BIAS — For each month, what do Wk1, Wk2, Wk3, Wk4 look like
4. KEY OBSERVATIONS — Divergences between timeframes, notable confluence zones, anomalies

Format: Yearly bias first, then monthly, then weekly.
Separate each timeframe. Then provide a combined synthesis.
```

---

## Step 3 — Review and Correct the Analysis

Check:
- Do peak timings match what you see on the chart?
- Are trough months correct?
- Do shorter TFs (5-YR) align or diverge from longer ones?
- Are divergences flagged?

Correct Claude explicitly before proceeding. Example: "The 5-YR peaks in early April not late March."

---

## Step 4 — Request the Dashboard

```
Now build a full interactive HTML dashboard for [ASSET] based on this analysis.

Structure:
1. Header with asset name
2. Legend (pink=5YR, brown=15YR, blue=XX-YR)
3. Combined accordion table FIRST (most actionable) — 12 months, Wk1–4 expandable, current month auto-opens
4. AI analysis panel below accordion
5. Divider
6. Three separate TF tables below (5-YR, 15-YR, long-term) as supporting detail

Design: dark terminal aesthetic, IBM Plex Mono + Bebas Neue, green/red/amber signals, star conviction ratings.
Single HTML file using shared CSS/JS from the modular architecture.
```

---

## Step 5 — The Combined Accordion Table

The accordion must:
- Show one row per month at top level
- Click to expand → Wk1–4 breakdown table inside
- Each week: 5-YR signal | 15-YR signal | Long-term signal | Combined signal + stars | Action note
- Current real calendar month auto-opens (not hardcoded April)
- Chevron rotates on open/close

---

## Step 6 — The Analysis Tab (Multi-Provider AI)

The Analysis tab in v1.5 supports three AI providers, selectable via pill buttons at the top of the panel:

**Claude (Anthropic)** — SSE streaming, `claude-sonnet-4-20250514`
**Gemini Flash (Google)** — SSE streaming, `gemini-1.5-flash`  
**Ollama (local)** — NDJSON streaming, any locally-pulled model

All configuration is in `js/api.js` (shared). Provider credentials and settings are stored in `localStorage` with `kpt-cfg-*` keys. The ⚙ settings button opens the credentials panel.

**Context layers** — four chips shown below the provider row, each ✓ when data is present:

| Chip | Source | When available |
|------|--------|----------------|
| Seasonal | `MONTHS[]` in data file | Always |
| Curve | Cumulative data derived from `MONTHS[]` | Always |
| History | D1-and-coarser CSV uploaded on Upload tab | After upload |
| Sessions | Sub-daily (M1–H4) CSV uploaded on Upload tab | After upload, tier-permitting |

**Dynamic SEASONAL_DATA (v1.5):** The `SEASONAL_DATA` static string in each data file is no longer the source of truth. `api.js` calls `_buildSeasonalSummary()` which generates an equivalent text live from `MONTHS[]` at runtime. You do not need to maintain the static string — it is only a fallback for edge cases where `MONTHS` is undefined.

**AI cache key:** `kpt-ai-{id}-{provider}-{year}-w{week}` — per-provider, refreshes weekly.

**Panel headings** update dynamically when the provider pill is clicked (`_updatePanelHeadings(prov)`) — no HTML changes to any of the 97 asset files needed.

**Ollama local setup:** Run `start_kpt.bat` (or manually: `set OLLAMA_ORIGINS=* && ollama serve` in a Windows cmd window). The URL field must be `http://localhost:11434` — do NOT append `/v1`. Enter the model name exactly as shown by `ollama list` (e.g. `mistral:latest`).

---

## Step 7 — Data Structure for Each Month

```javascript
{
  month: "January",
  sig5: "bull",       // bull | bear | chop | flip
  sig15: "bull",
  sig34: "bull",      // key name matches ASSET_CONFIG.ltSigKey
  combined: "bull",
  combinedLabel: "LONG",
  stars: 5,
  note: "Short description of overall month bias",
  weeks: [
    { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
    { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
    { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
    { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
  ]
}
```

The week-level key name (`s34`, `s35`, `s40`) must match `ASSET_CONFIG.ltKey`.

Signal values → CSS: `bull` → green · `bear` → red · `chop` / `flip` → amber

---

## Step 8 — File Output and Deployment

Three files required:

**1. `data/[asset].js`** — copy `data/aud.js` as template. Update `ASSET_CONFIG`:

```javascript
const ASSET_CONFIG = {
  id:       "gbp",
  name:     "GBP / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · GBP/USD CME · 40-Year Seasonal (1980–2019) ...",
  ltLabel:  "40-YR",    // ← update to match actual long-term TF
  ltSigKey: "sig40",    // ← update (sig34 / sig35 / sig40)
  ltKey:    "s40",      // ← update (s34 / s35 / s40)
  ltAccent: "#2563eb",
};
```

**2. `assets/[asset].html`** — copy `assets/aud.html`. Update:
- `<title>`, `<h1>`, `.sub` text
- Legend long-term TF label
- Combined accordion header `id="acc-lt-header"` will auto-populate from `ASSET_CONFIG.ltLabel`
- All three static TF tables
- Footnote — use this exact pattern:

```html
<div class="footnote">
  Seasonal data source: Moore Research Center © 2020 · [ASSET] · [XX]-Year Seasonal ([YEAR]–2019) · 15-Year · 5-Year overlays.<br>
  This analysis is based on historical seasonal tendencies only and does not constitute financial advice. Past seasonals do not guarantee future performance.
  <span class="copyright" style="display:block;margin-top:10px;padding-top:10px;border-top:1px solid #1e2430;color:#94a3b8;letter-spacing:0.8px;font-size:11px;">© 2026 Kaminari Precision Trading. All rights reserved. &nbsp;·&nbsp; Dashboard interface design and analysis framework by Kaminari Precision Trading. Seasonal tendency data sourced from Moore Research Center.</span>
</div>
```

**IMPORTANT:** The copyright span uses inline styles — do NOT use a CSS class alone. This ensures it always renders regardless of CSS caching.

Script tags — must be in this exact order (8 scripts total):
```html
<script src="../data/[asset].js"></script>   <!-- ASSET_CONFIG, MONTHS[], SEASONAL_DATA -->
<script src="../js/accordion.js"></script>    <!-- builds combined accordion from MONTHS[] -->
<script src="../js/api.js"></script>          <!-- multi-provider AI (Claude/Gemini/Ollama) -->
<script src="../js/tradingview.js"></script>  <!-- TradingView Live Price tab widget -->
<script src="../js/macro.js"></script>        <!-- Macro tab: economic calendar links -->
<script src="../js/seasonal-chart.js"></script> <!-- Trend tab: S-curve chart renderer -->
<script src="../js/upload.js"></script>       <!-- Upload tab: any-timeframe CSV upload + tendency/session stats -->
<script src="../js/ui.js"></script>           <!-- tab switching, shared UI init (loads last) -->
```

Do NOT edit any shared JS files for asset-specific changes — they serve all 98 pages. Asset-specific customisation belongs in `data/[asset].js` only.

**3. `index.html`** — find the planned card, change:
- `status-planned` → `status-complete`
- `href="#"` → `href="assets/[asset].html"`
- Update timeframe badges

**Deploy:**
```bash
# Option A — VSCode Source Control panel:
# 1. Stage all changes
# 2. Commit: "Add [ASSET] seasonal dashboard"
# 3. Sync / Push

# Option B — Git CLI:
git add data/[asset].js assets/[asset].html index.html data/signals_manifest.js
git commit -m "Add [ASSET] seasonal dashboard"
git push
```

Netlify detects the push and auto-deploys within ~60 seconds. Live URL: `https://kpt-seasonals.netlify.app/`

**Netlify note — Pretty URLs:** Netlify rewrites `href="assets/aud.html"` → `href="/assets/aud"` in the served HTML. The signal injection regex in `index.html` already accounts for this (`/assets\/([^./?#]+)/`). Do not change this regex back to `/assets\/(.+)\.html/` — that breaks on Netlify.

**Local preview:** Live Server only. Cannot open HTML files directly from filesystem.

---

## Step 9 — Tab System (Tier 4)

All asset pages use a 7-tab layout. There is no static tab nav anywhere in the HTML shells —
`ui.js` builds the entire tab bar at runtime from its own `tabs` array, and only renders a button
for a tab whose panel element (`[data-kpt-panel="<id>"]`) actually exists in the DOM. Each feature
module injects its own panel section at script-load time, before `ui.js` runs:

| Tab label | Panel ID (`data-kpt-panel`) | Injected by |
|-----------|------------------------------|-------------|
| Seasonals | `seasonals` | `ui.js` itself (tags `.combined-wrap`) |
| Trend | `scurve` | `seasonal-chart.js` |
| Profiling | `profiling` | `profiling.js` (only on pages with ported Profiling data) |
| Live Price | `chart` | `ui.js` itself (tags `#tv-chart-section`) |
| Macro | `macro` | `macro.js` |
| Upload | `upload` | `upload.js` |
| Analysis | `analysis` | `ui.js` itself (tags `.ai-panel`) |

The **Seasonals** tab is the landing tab (always `tabs[0]`, activated unconditionally on every
page load — the primary tab is not persisted) and contains:
1. Header + legend
2. Combined accordion (12 months, Wk1–4 expandable, current month auto-opens)
3. Divider
4. 5-YR table
5. 15-YR table
6. Long-term table
7. Footnote

The **Analysis** tab's panel is `.ai-panel`, already present as static markup in every HTML shell
(not JS-injected like the others) — `ui.js` just tags it with `data-kpt-panel="analysis"`.
`api.js` calls `_injectUI()` on DOMContentLoaded to build the provider pills, settings, context
bar, and output area inside it. No additional AI markup is required in the HTML shell.

---

## Step 10 — Upload Tab (CSV price-history tool)

The Upload tab accepts an MT5 CSV export at **any granularity from M1 (1-minute) through MN1
(Monthly)** — a single shared parser and timeframe detector, replacing the former separate
History and Sessions tabs. Two views render, only when the detected tier supports them:

- **Seasonal Tendency** (available for every tier) — raw up-frequency, win-rate vs. the seasonal
  model, and average return per (month, week-of-month) slot. A Monthly-bar upload collapses the
  week-of-month axis to a single "Month" slot (disclosed in-panel) since one bar per month carries
  no sub-month resolution.
- **Intraday Timing** (sub-daily tiers only — M1/M5/M15/M30/H1/H4) — average return by hour of
  day, by trading session (Asian/London/Overlap/New York), and by day of week.

**Exporting from MT5:**
1. View → Symbols → select asset → Bars tab
2. Timeframe: any, M1 through MN1
3. Set date range (all available history)
4. Click Request → Export Bars → save as CSV

**Timeframe detection:** `detectTier()` computes the *median* gap between consecutive bar
timestamps in minutes (a median, not a mean, so weekend/holiday gaps don't skew the result) and
matches it to the nearest of nine standard tiers.

**Occurrence count methodology (Intraday Timing view):**
- Session cards and day-of-week cards count **distinct trading days**, not individual bars
- "N / M sessions" means N days where the session closed up, out of M total days where the session had any data
- The hourly chart remains bar-level (each bar slot is the atomic unit for an hour)

**Storage:** single `kpt-up-{id}` key (schemaVer 1) holds the tier plus both views' computed
stats. Broker UTC offset is still stored separately at `kpt-tz-{id}`.

**Signal filter:** the Intraday Timing view shows statistics for the full dataset ("All") and
filtered by the current seasonal signal ("Long"/"Short"/"Choppy") derived from `MONTHS[]`.

---

## Building a Forex Dashboard

Forex dashboards differ from futures dashboards:

1. **No individual TF tables** — data is synthesised, not from raw charts
2. Use `assets/fx-audusd.html` as template (not `assets/aud.html`)
3. `ASSET_CONFIG` uses `ltLabel: "Long-YR"`, `ltSigKey: "sigLt"`, `ltKey: "sLt"`
4. Month objects use `sigLt` / `sLt` keys instead of `sig34` / `s34`
5. `SEASONAL_DATA` explains the derivation methodology and component readings
6. Footnote credits both source futures datasets

Forex pairs that can be built from current futures data:
- AUDUSD ✅ (AUD + USD) · USDJPY ✅ · GBPUSD ✅
- AUDJPY (AUD + JPY) · GBPJPY (GBP + JPY) — ready to build now

---

## Critical IDs — Do Not Get These Wrong

Every asset HTML shell must have these element IDs exactly. Both `accordion.js` and `api.js` are shared and hard-code these targets:

| Element | Required |
|---------|---------|
| Accordion `<tbody>` | `id="acc-body"` |
| AI run button | `id="run-btn"` + `class="run-btn"` |
| AI output div | `id="ai-output"` |

If you copy from an old template (pre-v0.6), it may have `id="accordion-body"` and `id="ai-btn"` — both wrong. The accordion will build empty and the AI button will do nothing with no console error.

---

## Common Errors and Fixes

| Problem | Fix |
|---------|-----|
| Accordion table empty (no rows) | `<tbody>` must have exactly `id="acc-body"` — not `accordion-body`, not anything else |
| AI button does nothing | Button needs `id="run-btn"` and `class="run-btn"` (not `ai-btn`) |
| AI button unstyled / looks plain | `.ai-btn` is undefined in `dashboard.css` — must use `class="run-btn"` |
| Long-term column shows wrong label | Check `ASSET_CONFIG.ltLabel` and `ltSigKey` / `ltKey` match the month data keys |
| AI button loading message says wrong TF | Check `ASSET_CONFIG.ltLabel` |
| Live Server works but Netlify deploy doesn't render correctly | Check relative paths — `../css/dashboard.css` requires `assets/` subfolder; never use absolute paths starting with `/` |
| Signals not injecting on Netlify (index shows STATUS LIVE instead of actual signal) | Netlify Pretty URLs rewrites `href="assets/aud.html"` → `href="/assets/aud"`. The signal injection regex must be `/assets\/([^./?#]+)/`, not `/assets\/(.+)\.html/`. The `.html` pattern never matches Netlify-served hrefs. |
| Trend tab NOW badge wraps to second line on Netlify | Netlify pages have a vertical scrollbar (~17px narrower than local). With `flex-wrap: wrap` on `.sc-header`, this pushes the NOW badge to a second line. Fix: `flex-wrap: nowrap` on `.sc-header` + `min-width: 0` on `.sc-header-left`. Do not restore `flex-wrap: wrap`. |
| AI button returns empty | Check API key active at console.anthropic.com |
| AI button cuts off | Raise `max_tokens` in `js/api.js` (currently 2500) |
| Copyright not showing | Ensure `<span>` has inline styles — do not rely on CSS class alone |
| Sticky nav not highlighting | Verify section `id` attributes match nav `href` values exactly |
| Chart analysis peak timing wrong | Correct Claude explicitly before building dashboard |
| Index card showing wrong signal label | Never hardcode BEAR/BULL on index cards — use `<span class="bull-tag">Live</span>` for all live assets |
| Ollama button gives CORS error | Must run `set OLLAMA_ORIGINS=* && ollama serve` (not just `ollama serve`). Use `start_kpt.bat`. |
| Ollama URL field — what to enter | Enter `http://localhost:11434` exactly — no trailing slash, no `/v1` suffix |
| Analysis tab blank / no pills | `api.js` must load AFTER `data/[asset].js` — check script order in HTML shell |
| Intraday Timing view bar counts seem too high | Expected — occurrence count uses day-level not bar-level for session/DoW cards |
| Upload's Intraday Timing view missing after upload | Expected for D1/W1/MN1 uploads — that view only renders for sub-daily tiers (M1–H4) |
| Upload signal filter shows nothing | `MONTHS[]` must be defined (data file loaded) before `upload.js` runs — check script order |
| Wrong provider name in Analysis panel heading | Heading is set by `_updatePanelHeadings(prov)` — fires on provider pill click. Check `api.js` is v1.5. |
| Tab missing from nav / tab does nothing | Each tab's JS must load in the correct order; `ui.js` must be last. Check the 8-script load order. |
| Print output shows dark background | `@media print` block in `dashboard.css` overrides CSS vars to white — check dashboard.css is current v1.5 file |
