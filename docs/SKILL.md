---
name: seasonal-dashboard
description: How to build a seasonal trading analysis dashboard from a Moore Research Center chart image. Covers chart analysis, dashboard generation, accordion table, Claude API button, and GitHub deployment. Use this skill whenever building or recreating an asset dashboard from scratch.
version: 1.2.0
updated: April 2026
futures_complete: AUD/USD (34-YR), USD Index (35-YR), JPY/USD (40-YR), GBP/USD (40-YR)
forex_complete: AUDUSD, USDJPY, GBPUSD
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

## Step 6 — The AI Analysis Button

The button fires a POST to `https://api.anthropic.com/v1/messages`:
- Model: `claude-sonnet-4-20250514`
- `max_tokens`: 2500 (set in `js/api.js` — shared file, edit there)
- Sends `SEASONAL_DATA` string (defined in each asset's data file)
- Response rendered in `ai-output` div

`SEASONAL_DATA` should contain:
- All 3 TF readings period-by-period
- Playbook signals (buy/sell weeks from trading plan)
- TASK section instructing Claude to produce: yearly bias summary, month-by-month table, week-by-week priority month breakdown, top 3 trade setups

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

Script tags — must be in this order:
```html
<script src="../data/[asset].js"></script>
<script src="../js/accordion.js"></script>
<script src="../js/api.js"></script>
```

Do NOT edit `js/accordion.js` or `js/api.js` — they are shared.

**3. `index.html`** — find the planned card, change:
- `status-planned` → `status-complete`
- `href="#"` → `href="assets/[asset].html"`
- Update timeframe badges

**Deploy:**
```bash
# In VSCode Source Control panel:
# 1. Stage all changes
# 2. Commit: "Add [ASSET] seasonal dashboard"
# 3. Sync / Push
```

**Local preview:** Live Server only. Cannot open HTML files directly from filesystem.

---

## Step 9 — Dashboard Section Order (v0.7)

The correct order for all asset pages is:

1. Header + legend
2. **Combined accordion** (first — most actionable)
3. **AI panel** (immediately below accordion)
4. `<div class="divider">`
5. 5-YR table
6. 15-YR table
7. Long-term table
8. Footnote
9. Script tags

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

## Common Errors and Fixes

| Problem | Fix |
|---------|-----|
| Accordion doesn't build / page blank | Script load order must be: data → accordion → api. Check browser console. |
| Long-term column shows wrong label | Check `ASSET_CONFIG.ltLabel` and `ltSigKey` / `ltKey` match the month data keys |
| AI button loading message says wrong TF | Check `ASSET_CONFIG.ltLabel` |
| Live Server works but GitHub Pages doesn't | Check relative paths — `../css/dashboard.css` requires `assets/` subfolder |
| AI button returns empty | Check API key active at console.anthropic.com |
| AI button cuts off | Raise `max_tokens` in `js/api.js` (currently 2500) |
| Copyright not showing | Ensure `<span>` has inline styles — do not rely on CSS class alone |
| Sticky nav not highlighting | Verify section `id` attributes match nav `href` values exactly |
| Chart analysis peak timing wrong | Correct Claude explicitly before building dashboard |
