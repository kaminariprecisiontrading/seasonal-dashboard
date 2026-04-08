# SKILL.md — How to Build a Seasonal Trading Dashboard

This document is a complete recreation guide. If you are starting from scratch, follow these steps in order and you will reproduce any asset dashboard to the same standard as the AUD prototype.

---

## Prerequisites

- Access to Claude (claude.ai, Pro plan or higher recommended)
- Moore Research Center seasonal charts for your target asset
- An Anthropic API account (console.anthropic.com) with billing enabled, for the in-dashboard AI button
- A browser to view the output HTML file

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

## Step 8 — File Output

Save the dashboard as: `[ASSET]_seasonal.html`

Examples:
- `aud_seasonal.html`
- `gbp_seasonal.html`
- `xau_seasonal.html`

All files are self-contained single HTML files. No build process, no dependencies, no server required. Open directly in any browser.

---

## Prompting Tips

- Always tell Claude the long-term timeframe explicitly (e.g. "the blue line is 34-YR, not 40-YR")
- If Claude merges months (e.g. "Aug–Sep" as one row), ask it to split them into individual months
- If the AI button analysis is too brief, increase `max_tokens` to 3000 and add more detail to the TASK section
- For assets with "choppy all month" designation (CHF, MXN), flag this explicitly so Claude treats every week with appropriate uncertainty
- Multi-month hold trades (e.g. MXN sell April → early December) need a dedicated note in the combined table — they are not intra-month trades

---

## Common Errors and Fixes

| Problem | Fix |
|---------|-----|
| Combined table shows flat rows, not accordion | Ask Claude to rewrite combined table as expandable accordion with Wk1-4 per month |
| AI button returns empty response | Check API key is active at console.anthropic.com |
| AI button cuts off mid-analysis | Increase `max_tokens` from 1000 to 3000 |
| Chart analysis peak timing is wrong | Correct Claude explicitly: "The 5-yr peaks in early April not late March" |
| Weeks table missing for some months | Claude sometimes merges multi-month periods — ask it to expand each month individually |
| April not auto-opening | Check `data-idx="3"` selector in buildAccordion() — April is index 3 (0-based) |
