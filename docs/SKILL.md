---
name: seasonal-dashboard
description: How to build a seasonal trading analysis dashboard from a Moore Research Center chart image. Covers chart analysis, dashboard generation, accordion table, Claude API button, and GitHub deployment. Use this skill whenever building or recreating an asset dashboard from scratch.
version: 1.1.0
updated: April 2026
assets_covered: AUD/USD (complete), GBP, CAD, JPY, NZD, USD, EUR, CHF, MXN, BRL, XAU, XAG, Copper, Platinum, Palladium (planned)
---

# SKILL.md — How to Build a Seasonal Trading Dashboard

This document is a complete recreation guide. If you are starting from scratch, follow these steps in order and you will reproduce any asset dashboard to the same standard as the AUD prototype.

---

## Prerequisites

- Access to Claude (claude.ai, Pro plan or higher recommended)
- Moore Research Center seasonal charts for your target asset
- An Anthropic API account (console.anthropic.com) with billing enabled, for the in-dashboard AI button
- A browser to view the output HTML file
- VSCode with Live Server extension installed (for local development)
- Git + GitHub account with SSH authentication configured (see CHANGELOG v0.4 for setup notes)

---

## Step 1 — Gather Your Charts

For each asset, you need the seasonal overlay chart from Moore Research Center. The chart shows three lines:

| Line Colour | Timeframe |
|------------|-----------|
| Pink / Magenta | 5-Year seasonal |
| Brown / Dark Red | 15-Year seasonal |
| Blue | Long-term (may be 25-YR, 30-YR, 34-YR, or 40-YR depending on asset) |

**Image batching rule:** Paste no more than 4–6 images per Claude message. Beyond that, analysis quality degrades. Recommended groupings:
- Batch 1: AUD, GBP, CAD, JPY, NZD
- Batch 2: USD, EUR, CHF
- Batch 3: MXN, BRL
- Batch 4: XAU, XAG, Copper, Platinum, Palladium

Always name the asset and confirm the timeframes when pasting (e.g. "AUD — 5-YR, 15-YR, 34-YR").

---

## Step 2 — Prompt Claude to Analyse the Chart

Use this prompt structure when submitting a chart image:

```
I am sending you a seasonal tendency chart for [ASSET].
Timeframes: [5-YR = pink], [15-YR = brown], [XX-YR = blue].

Please analyse each timeframe line carefully and provide:

1. YEARLY BIAS — The macro seasonal arc across the full year (Jan–Dec)
2. MONTHLY BIAS — For each month, what is the overall directional bias and approximate peak/trough timing
3. WEEKLY BIAS — For each month, what do Wk1, Wk2, Wk3, Wk4 look like
4. KEY OBSERVATIONS — Any divergences between timeframes, notable confluence zones, or anomalies

Format: Yearly bias first (largest trend), then monthly, then weekly. 
Separate each timeframe. Then provide a combined synthesis.
```

---

## Step 3 — Review and Correct the Analysis

Claude will read the chart visually. Check:
- Does the peak timing match what you see on the chart?
- Are the trough months correct?
- Do shorter timeframes (5-yr) align or diverge from longer ones (34-yr)?
- Are divergences flagged (e.g. 15-yr shows July bounce that 5-yr and 34-yr don't)?

Correct Claude if anything is wrong before proceeding to dashboard creation.

---

## Step 4 — Request the Dashboard

Once the chart analysis is confirmed, use this prompt:

```
Now build a full interactive HTML dashboard for [ASSET] based on this analysis.

Structure:
1. Header with asset name and timeframe legend (pink=5YR, brown=15YR, blue=XX-YR)
2. Three separate tables — one per timeframe — each showing:
   - Period (Jan, Feb, etc.)
   - Yearly bias tag (Bullish / Bearish / Choppy)
   - Monthly overview description
   - Weekly detail grid (Wk1 Wk2 Wk3 Wk4 colour-coded)
   - Notes
3. One combined table (accordion style) showing all 12 months with Wk1–4 expandable per month. April should auto-open by default.
4. An AI analysis panel at the bottom with a button that calls the Claude API and generates a written week-by-week bias report.

Design requirements:
- Dark background (#0a0c0f)
- IBM Plex Mono font for body, Bebas Neue for headings
- Green (#22c55e) for bullish, Red (#ef4444) for bearish, Amber (#f59e0b) for choppy
- Colour-coded signal tags throughout
- Star conviction ratings (★★★★★)
- Professional trading terminal aesthetic
- Single HTML file, no external dependencies except Google Fonts
```

---

## Step 5 — The Combined Table (Accordion)

The combined table must:
- Show one row per month at top level (collapsed by default)
- Clicking a month expands to reveal Wk1–4 breakdown
- Each week shows: 5-YR signal | 15-YR signal | Long-term signal | Combined signal + stars | Action note
- April auto-expands since it is the priority month
- Use CSS `display:none` / `display:table-row` toggled via JavaScript `classList.toggle`

If Claude produces the old flat table format instead of the accordion, use this correction prompt:
```
Replace the combined table with an expandable accordion. Top level = month row. 
Click to expand = Wk1–4 breakdown table inside. April should be pre-opened.
```

---

## Step 6 — The AI Analysis Button

The button at the bottom of the dashboard:
- Fires a POST request to `https://api.anthropic.com/v1/messages`
- Sends a pre-written `SEASONAL_DATA` string containing all the timeframe readings
- Uses model `claude-sonnet-4-20250514` (or latest Sonnet)
- `max_tokens` is currently set to 1000 — increase to 2500–4000 for richer output
- Response is rendered as plain text in the `ai-output` div

**The SEASONAL_DATA string should contain:**
- 5-YR readings by period
- 15-YR readings by period
- Long-term readings by period
- Playbook signals (from the trading plan)
- A TASK section instructing Claude to produce: yearly bias, month-by-month table, week-by-week priority month breakdown, and top 3 trade setups

---

## Step 7 — Data Structure for Each Month (JavaScript)

Each month in the accordion is defined as a JavaScript object. Template:

```javascript
{
  month: "January",
  sig5: "bull",       // bull | bear | chop | flip
  sig15: "bull",
  sig34: "bull",
  combined: "bull",
  combinedLabel: "LONG",
  stars: 5,           // 1–5
  note: "Short description of overall month bias",
  weeks: [
    { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
    { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
    { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
    { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Action note" },
  ]
}
```

Signal values map to CSS classes:
- `bull` → `.bull-tag` (green)
- `bear` → `.bear-tag` (red)
- `chop` → `.chop-tag` (amber)
- `flip` → `.chop-tag` (amber, used for transition months like April)

---

## Step 8 — File Output and Deployment

The project uses a modular structure. Adding a new asset requires three files:

**1. Create `data/[asset].js`**
Define `ASSET_CONFIG`, `MONTHS[]`, and `SEASONAL_DATA`. Copy `data/aud.js` as a template and replace all content. Key fields to update in `ASSET_CONFIG`:

```javascript
const ASSET_CONFIG = {
  id:       "gbp",
  name:     "GBP / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · GBP/USD CME · 34-Year Seasonal ...",
  ltLabel:  "34-YR",    // ← update to match actual long-term TF
  ltSigKey: "sig34",    // ← update to match (sig34 / sig35 / sig40 etc.)
  ltKey:    "s34",      // ← update to match week-level key
  ltAccent: "#2563eb",
};
```

**2. Create `assets/[asset].html`**
Copy any existing asset shell (e.g. `assets/aud.html`). Update:
- `<title>` tag
- Header `<h1>` and `.sub` text
- Legend long-term TF label
- All three static TF tables (5-YR, 15-YR, long-term)
- Section label for long-term table
- Footnote text — use this exact pattern, updating only the asset-specific data line:

```html
<div class="footnote">
  Seasonal data source: Moore Research Center © 2020 · [ASSET] · [XX]-Year Seasonal ([YEAR]–2019) · 15-Year · 5-Year overlays.<br>
  This analysis is based on historical seasonal tendencies only and does not constitute financial advice. Past seasonals do not guarantee future performance.
  <span class="copyright" style="display:block;margin-top:10px;padding-top:10px;border-top:1px solid #1e2430;color:#94a3b8;letter-spacing:0.8px;font-size:11px;">© 2026 Kaminari Precision Trading. All rights reserved. &nbsp;·&nbsp; Dashboard interface design and analysis framework by Kaminari Precision Trading. Seasonal tendency data sourced from Moore Research Center.</span>
</div>
```

**Important:** The copyright span uses inline styles, not a CSS class. This ensures it always renders correctly regardless of CSS load order or caching issues.

- The three `<script>` src tags — change `data/aud.js` to `data/[asset].js`

Do not change `js/accordion.js` or `js/api.js` — they are shared.

**3. Update `index.html`**
Find the planned card for the new asset and:
- Change `status-planned` to `status-complete`
- Set `href="assets/[asset].html"`
- Update the timeframe badges to reflect the actual TFs

**To deploy:** commit all three files and push to `main`. GitHub Pages deploys automatically.

```bash
# Git workflow in VSCode:
# 1. Source Control panel → stage all changes
# 2. Commit message: "Add GBP seasonal dashboard"
# 3. Click Sync / Push
```

**Local preview:** use Live Server in VSCode. The modular JS imports require a server context — the HTML files cannot be opened directly from the filesystem.

---

## Common Errors and Fixes

| Problem | Fix |
|---------|-----|
| Accordion doesn't build / page blank | Check browser console. Usually means data file loaded after accordion.js — verify script order: data → accordion → api |
| Long-term column shows wrong label | Check `ASSET_CONFIG.ltLabel` in the data file matches what's in the TF tables |
| AI button loading message says wrong TF | Check `ASSET_CONFIG.ltLabel` in the data file |
| Live Server works but GitHub Pages doesn't | Check file paths — `../css/dashboard.css` requires assets to be in `assets/` subfolder |
| AI button returns empty response | Check API key is active at console.anthropic.com |
| AI button cuts off mid-analysis | Raise `max_tokens` in `js/api.js` (currently 2500) |
| Chart analysis peak timing is wrong | Correct Claude explicitly before building dashboard |
| April not the open month | It shouldn't be — accordion now opens the current real month dynamically |
