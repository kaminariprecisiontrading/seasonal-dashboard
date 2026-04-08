# PROMPTS.md — Prompt Reference Library

A record of every key prompt used in this project, what it produced, and how to reuse or adapt it.

---

## 1. Initial Context Prompt — Trading Playbook

**Used for:** Setting up the project context at the start of a session  
**Copy and paste this at the start of any new Claude conversation to restore context:**

```
You are a professional trading analyst and economist.

I am building a seasonal trading analysis dashboard system. The data source is Moore Research Center seasonal tendency charts. Each chart shows three overlaid lines:
- Pink / Magenta = 5-Year seasonal
- Brown / Dark Red = 15-Year seasonal  
- Blue = Long-term seasonal (varies per asset: 25-YR, 30-YR, 34-YR, or 40-YR)

My April trading playbook is as follows:

BUY: AUD Wk1, GBP Wk1, CAD Wk1, USD end Wk4, EUR very strong Wk4, JPY Wk1, CHF end Wk3/early Wk4, NZD Wk1, Palladium Wk1

SELL: AUD Wk2/3, GBP Wk4, CAD Wk2-4, USD Wk1/2 + re-entry Wk4, JPY end Wk2/early Wk3 + re-entry Wk4, CHF Wk1 + early Wk4, MXN anytime Wk1-4 hold to early Dec, NZD Wk2-4, BRL Wk1-3 hold to mid-May, XAU Wk2, XAG Wk3/4, Copper Wk4, Platinum Wk2/3, Palladium Wk4

CHOPPY: EUR Wk1-3, CHF all month, MXN all month, BRL Wk1-3

I have already completed the AUD/USD dashboard. We are now working on [NEXT ASSET].
```

---

## 2. Chart Analysis Prompt

**Used for:** Analysing a Moore Research Center seasonal chart image  
**Adapt:** Change asset name and timeframes to match your image

```
I am sending you the [ASSET] seasonal tendency chart.
Timeframes: 5-YR = pink line, 15-YR = brown line, [XX]-YR = blue line.

Analyse each timeframe carefully and provide:

1. YEARLY BIAS — The full-year macro arc (Jan–Dec). Where are the peaks and troughs? When do major directional shifts occur?

2. MONTHLY BIAS — For each month individually, what is the overall directional bias and key timing notes?

3. WEEKLY BIAS — For each month, describe what Wk1, Wk2, Wk3, Wk4 look like across all 3 timeframes.

4. DIVERGENCES — Where do the timeframes disagree? Which timeframe is leading/lagging?

Format: Yearly bias first (largest trend), then monthly, then weekly.
Create a separate section for each timeframe. Then a combined synthesis at the end.
Priority: Be specific about timing. Do not give vague ranges — use week references.
```

---

## 3. Dashboard Build Prompt

**Used for:** Building the HTML dashboard after chart analysis is confirmed

```
Now build a full interactive HTML dashboard for [ASSET] based on the analysis above.

STRUCTURE:
1. Header — Asset name (large Bebas Neue), data source, timeframe legend
2. Three separate timeframe tables (5-YR, 15-YR, [XX]-YR) each containing:
   - Period column
   - Yearly bias tag (Bullish / Bearish / Choppy)
   - Monthly overview description
   - Weekly detail: 4-cell colour-coded grid (Wk1 Wk2 Wk3 Wk4)
   - Notes / trade action
3. Combined table — accordion format, one row per month (Jan–Dec), clickable to expand Wk1–4. April pre-opened.
4. AI analysis panel — button that calls Claude API with SEASONAL_DATA prompt

DESIGN:
- Dark background: #0a0c0f
- Fonts: IBM Plex Mono (body), Bebas Neue (headings)
- Bull = #22c55e (green), Bear = #ef4444 (red), Chop = #f59e0b (amber)
- Signal tags with coloured borders
- Star conviction ratings (★★★★★ scale)
- Terminal / trading desk aesthetic
- Self-contained single HTML file

ACCORDION SPEC:
- Each month has a header row (collapsed by default)
- Click opens week breakdown table: Wk1–Wk4 with 5-YR, 15-YR, [XX]-YR signals, combined conviction, action note
- April (index 3) auto-opens on load
- Chevron indicator on month row rotates when open

AI PANEL SPEC:
- model: claude-sonnet-4-20250514
- max_tokens: 3000
- SEASONAL_DATA includes: all 3 TF readings, playbook signals, TASK section
- TASK requests: yearly summary, month-by-month table, week-by-week priority month, top 3 setups
- Response rendered as formatted text (parse markdown if possible)
```

---

## 4. Accordion Fix Prompt

**Used for:** If Claude builds a flat table instead of an expandable accordion

```
Replace the combined table with an accordion. Requirements:
- Top-level: one row per month (Jan–Dec), collapsed by default
- Each month row is clickable and shows a chevron indicator
- Clicking expands to reveal a sub-table with Wk1, Wk2, Wk3, Wk4
- Each week row shows: 5-YR signal, 15-YR signal, [XX]-YR signal, combined conviction + stars, action note
- April (array index 3) auto-opens on page load
- Use CSS display:none / display:table-row toggled via classList
- Maintain all existing styling (signal tags, colours, fonts)
```

---

## 5. SEASONAL_DATA Template (for AI Button)

**Used for:** Populating the `SEASONAL_DATA` string in the JavaScript that gets sent to the Claude API  
**Adapt the readings to match your specific asset analysis**

```javascript
const SEASONAL_DATA = `
[ASSET NAME] — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, [XX]-Year ([START YEAR]–[END YEAR]), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan–Mar: [description]
Apr Wk1: [description]
Apr Wk2: [description]
Apr Wk3–4: [description]
May–Jun: [description]
Jul: [description]
Aug–Sep: [description]
Oct–Nov: [description]
Dec: [description]

=== 15-YEAR SEASONAL ===
Jan–Mar: [description]
Apr Wk1: [description]
Apr Wk2–4: [description]
May–Jun: [description]
Jul Wk1–2: [description]
Jul Wk3–4: [description]
Aug–Sep: [description]
Oct–Nov: [description]
Dec: [description]

=== [XX]-YEAR SEASONAL ===
Jan–Mar: [description]
Apr Wk1: [description]
Apr Wk2: [description]
Apr Wk3–4: [description]
May–Jun: [description]
Jul: [description]
Aug–Sep: [description]
Oct–Dec: [description]

=== PLAYBOOK SIGNALS ===
[ASSET] BUY: [week reference]
[ASSET] SELL: [week reference]
[Note any multi-month holds or special conditions]

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY — One paragraph covering the full-year seasonal arc.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: directional bias, best entry timing, key caveat.

3. WEEK-BY-WEEK [PRIORITY MONTH] BIAS — For each week of [month]: bias direction, reasoning from all timeframes, specific trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Entry month/week, expected duration, conviction level, key risk.

Format clearly with headers. Be specific. Use exact week references. Base everything on the seasonal data provided.
`;
```

---

## 6. Asset Addition Prompt (for Multi-Asset Dashboard)

**Used for:** When building a unified multi-asset dashboard (future feature)

```
I want to add [ASSET] to the existing dashboard system.

Here are the seasonal readings for [ASSET]:
[paste analysis]

Add [ASSET] to the asset selector. Clicking it should:
1. Update the header with the new asset name and timeframe details
2. Replace all three TF tables with [ASSET] data
3. Replace the combined accordion with [ASSET] month/week data
4. Update the SEASONAL_DATA string for the AI button
5. Keep all styling and UI behaviour identical

Do not break the existing [PREVIOUS ASSET] data — it should remain accessible via the selector.
```

---

## Notes on Prompting

**Be explicit about timeframes.** Always state the long-term TF number (34-YR, not just "long-term"). Claude cannot always read the chart legend precisely.

**Correct immediately.** If Claude gets a peak timing wrong, correct it before proceeding to the dashboard build. Errors in the analysis propagate into all downstream tables and the AI prompt.

**Name the priority month.** In any session, tell Claude which month is the priority (usually the current month or the next major seasonal turn). This affects what auto-opens and what the AI button focuses on.

**Batching images.** 4–6 per message. Always include the asset name and timeframe labels with each image upload.

**Session continuity.** Claude has no memory between sessions. Start each new session with Prompt #1 (Initial Context) and reference the CHANGELOG so Claude knows what has already been built.
