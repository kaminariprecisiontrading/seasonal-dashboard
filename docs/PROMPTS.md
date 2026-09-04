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
- model: claude-sonnet-5
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

> **Note (v1.5):** The `SEASONAL_DATA` string is no longer the source of truth for the AI button. `api.js` now calls `_buildSeasonalSummary()` which generates an equivalent structured text live from `MONTHS[]` at runtime. This means the AI prompt is always in sync with the data — you do not need to maintain `SEASONAL_DATA` separately. The static string in each data file is retained as a legacy fallback for pages where `MONTHS` might be unavailable, but it is never read when `MONTHS` is present (which is all 97 current pages).
>
> The template below documents the format that `_buildSeasonalSummary()` produces dynamically, and remains useful as a reference for what the AI receives.

```
[ASSET NAME] — SEASONAL TENDENCY ANALYSIS
Asset: [name]
Timeframes: 5-YR  ·  15-YR  ·  [XX]-YR

Month-by-month combined bias (all 12 months, Wk1–4 detail):

JANUARY  Combined: LONG  ★★★★★  — [note]
  Wk 1:  5YR=bull  15YR=bull  [XX]-YR=bull  → LONG ★★★★★ | [action note]
  Wk 2:  ...
  ...

FEBRUARY  Combined: BEAR  ★★★☆☆  — [note]
  Wk 1:  ...
  ...
```

This format is generated automatically. The data file's `SEASONAL_DATA` string is only used as a fallback.

---

## 6. Asset Addition Prompt (Legacy — for Multi-Asset Dashboard)

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

## 7. AI Provider Setup (in-dashboard)

**Used for:** Configuring the Analysis tab's multi-provider AI panel on first use.

The Analysis tab supports three providers. Select via the pill buttons at the top of the panel, then click ⚙ to enter your credentials.

**Claude (Anthropic)**
- API key from: console.anthropic.com → API Keys
- Stored in localStorage as `kpt-cfg-claude-key`
- Model: `claude-sonnet-5` (hardcoded)

**Gemini (Google)**
- API key from: aistudio.google.com → Get API Key
- Stored in localStorage as `kpt-cfg-gemini-key`
- Model: `gemini-1.5-flash` (hardcoded)

**Ollama (local)**
- Run `start_kpt.bat` (or manually: `set OLLAMA_ORIGINS=* && ollama serve` in cmd)
- Default URL: `http://localhost:11434` — do NOT add `/v1`
- Model: whatever you have pulled (e.g. `mistral:latest`, `llama3.2`)
- Stored as `kpt-cfg-ollama-url` and `kpt-cfg-ollama-mdl`

**Context chips** below the provider row show ✓ or ○ for each data layer. Upload a D1 CSV on the History tab and an H1/H4 CSV on the Sessions tab to unlock all four context layers before running analysis.

---

## 8. Intraday CSV Upload Steps

**Used for:** Getting the right CSV from MT5 for the Sessions tab.

The Sessions tab accepts **H1 or H4** exports from MetaTrader 5. Steps:
1. Open MetaTrader 5
2. View → Symbols → select your asset
3. Go to the **Bars** tab
4. Select timeframe: **H1** (or H4) — NOT D1, NOT M1
5. Set start and end date (all available history recommended)
6. Click **Request**, then **Export Bars** in the bottom toolbar
7. Save as CSV, then drag-and-drop onto the Sessions tab upload area

**Important:** The file must include a TIME column (`HH:MM`). The same steps used for the History tab (D1) apply — just change the timeframe selection.

---

## Notes on Prompting

**Be explicit about timeframes.** Always state the long-term TF number (34-YR, not just "long-term"). Claude cannot always read the chart legend precisely.

**Correct immediately.** If Claude gets a peak timing wrong, correct it before proceeding to the dashboard build. Errors in the analysis propagate into all downstream tables.

**Name the priority month.** In any session, tell Claude which month is the priority (usually the current month or the next major seasonal turn). This affects what auto-opens in the accordion.

**Batching images.** 4–6 per message. Always include the asset name and timeframe labels with each image upload.

**Session continuity (Cowork / Claude Code).** When continuing across sessions in Cowork or Claude Code, load `README.md`, `ARCHITECTURE.md`, and `CHANGELOG.md` at the start of the session to restore context. The CHANGELOG tells Claude exactly what has already been built and what the current state of each file is.
