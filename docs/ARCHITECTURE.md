# ARCHITECTURE.md — Technical Reference

Complete technical documentation for the seasonal trading dashboard system.

---

## Repository Structure

The project lives in a private GitHub repository and is deployed via GitHub Pages.

```
seasonal-dashboard/          ← root of GitHub repo
├── index.html               ← landing page / asset card grid
├── assets/
│   ├── aud.html             ← AUD dashboard shell (complete)
│   ├── usd.html             ← USD dashboard shell (complete)
│   ├── jpy.html             ← JPY dashboard shell (complete)
│   └── [asset].html         ← future assets follow same pattern
├── css/
│   └── dashboard.css        ← ALL shared styles — one file for every dashboard
├── js/
│   ├── accordion.js         ← shared accordion builder + auto-open logic
│   └── api.js               ← shared Claude API call
├── data/
│   ├── aud.js               ← AUD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── usd.js               ← USD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── jpy.js               ← JPY: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   └── [asset].js           ← future assets follow same pattern
└── docs/
    ├── README.md
    ├── SKILL.md
    ├── ARCHITECTURE.md      ← this file
    ├── CHANGELOG.md
    ├── ROADMAP.md
    └── PROMPTS.md
```

**Deployment:** GitHub Pages serves the repo directly from the `main` branch root.  
- Landing page: `https://[username].github.io/seasonal-dashboard/`
- Individual dashboards: `https://[username].github.io/seasonal-dashboard/assets/aud.html`

**Local development:** Open folder in VSCode, use **Live Server** to preview. The modular JS imports require a server context — opening HTML files directly from the filesystem will fail silently.

---

## Modular Architecture (v0.6+)

The system is split into four layers:

### Layer 1 — Shared Styles (`css/dashboard.css`)
Contains every CSS rule used across all dashboards. CSS variables in `:root` define all colours, fonts, and spacing tokens. A single edit here updates every dashboard simultaneously. The `--accent-lt` variable is used for the long-term TF colour (blue) and is consistent across all assets.

### Layer 2 — Shared JavaScript (`js/accordion.js`, `js/api.js`)
**`accordion.js`** — Reads `ASSET_CONFIG` from the asset data file to determine:
- `ltKey` — the week-level signal key (e.g. `"s34"`, `"s35"`, `"s40"`)
- `ltSigKey` — the month-level signal key (e.g. `"sig34"`, `"sig35"`, `"sig40"`)
- `ltLabel` — the column header text (e.g. `"34-YR"`, `"35-YR"`, `"40-YR"`)

Dynamically injects the correct long-term TF label into the accordion table header via `document.getElementById("acc-lt-header")`. Handles current month detection and NOW badge.

**`api.js`** — Reads `SEASONAL_DATA` (the prompt string) and `ASSET_CONFIG.ltLabel` (for the loading message). Calls the Claude API and renders the response. Uses `max_tokens: 2500`.

### Layer 3 — Asset Data Files (`data/[asset].js`)
Each file defines three things:

```javascript
// 1. Configuration object — tells shared JS how to handle this asset
const ASSET_CONFIG = {
  id:       "aud",          // asset identifier
  name:     "AUD / USD",    // display name
  sub:      "...",          // subtitle/source line
  footnote: "...",          // page footnote
  ltLabel:  "34-YR",        // long-term TF label for accordion header
  ltSigKey: "sig34",        // month-level signal key in MONTHS[]
  ltKey:    "s34",          // week-level signal key in weeks[]
  ltAccent: "#2563eb",      // colour (currently unused, reserved for future)
};

// 2. Month data array — drives both the accordion and the AI prompt
const MONTHS = [ ... ];     // 12 month objects with sig5, sig15, sig[lt], weeks[]

// 3. AI prompt string — sent to Claude API on button press
const SEASONAL_DATA = `...`;
```

### Layer 4 — Asset HTML Shells (`assets/[asset].html`)
Thin HTML files (~120 lines) containing only:
- `<head>` with link to shared CSS
- Page header, legend, and static individual TF tables (5-YR, 15-YR, long-term)
- Combined accordion table wrapper with `id="acc-body"` and `id="acc-lt-header"`
- AI panel HTML
- Three `<script>` tags loading: data file → accordion.js → api.js

**Script load order is critical:**
```html
<script src="../data/aud.js"></script>   ← must be first (defines globals)
<script src="../js/accordion.js"></script> ← reads ASSET_CONFIG + MONTHS
<script src="../js/api.js"></script>       ← reads SEASONAL_DATA
```

---

## Adding a New Asset

To add a new asset (e.g. GBP):

1. Create `data/gbp.js` — define `ASSET_CONFIG`, `MONTHS[]`, `SEASONAL_DATA`
2. Create `assets/gbp.html` — copy any existing asset shell, update header/legend/TF tables, change script src to `../data/gbp.js`
3. Update `index.html` — change the GBP card from `status-planned` to `status-complete`, set `href="assets/gbp.html"`
4. Commit and push — GitHub Pages deploys automatically

No changes needed to `css/dashboard.css`, `js/accordion.js`, or `js/api.js`.

---

## Dashboard Anatomy (Asset HTML Shell)

```
1. <head>              — Link to shared CSS only (no inline styles)
2. Header              — Asset name, source subtitle
3. Legend              — Timeframe colour dots
4. 5-YR Table          — Static HTML, asset-specific content
5. 15-YR Table         — Static HTML, asset-specific content
6. Long-term Table     — Static HTML, asset-specific content (34/35/40-YR)
7. Accordion Section   — Empty table shell, populated by accordion.js
8. AI Panel            — Button triggers api.js
9. Footnote            — Data source attribution
10. <script> tags      — data → accordion → api (order matters)
```

---

## CSS Design System

### Variables (`:root`)

```css
--bg: #0a0c0f;           /* Page background — near black */
--surface: #111318;      /* Panel backgrounds */
--surface2: #181c23;     /* Table hover / header backgrounds */
--border: #1e2430;       /* All borders */
--accent-5yr: #e040a0;   /* Pink — matches chart line */
--accent-15yr: #8b3a2a;  /* Brown — matches chart line */
--accent-34yr: #2563eb;  /* Blue — matches chart line */
--accent-combined: #22c55e; /* Green — combined signal accent */
--bull: #22c55e;         /* Bullish green */
--bear: #ef4444;         /* Bearish red */
--chop: #f59e0b;         /* Choppy amber */
--text: #e2e8f0;         /* Primary text */
--muted: #64748b;        /* Secondary / label text */
--dim: #94a3b8;          /* Tertiary text, table body */
```

### Typography

```
Headings:  'Bebas Neue' (Google Fonts) — uppercase, wide tracking
Body/Data: 'IBM Plex Mono' (Google Fonts) — monospace, terminal feel
```

### Signal Tags

```css
.bull-tag  — green background + border, uppercase "BULL" / "LONG"
.bear-tag  — red background + border, uppercase "BEAR" / "SHORT"
.chop-tag  — amber background + border, uppercase "CHOP" / "NEUTRAL"
.neutral-tag — grey background + border
```

### Week Grid (inside individual TF tables)

```css
.wk-grid   — CSS grid, 4 columns
.wk-bull   — green cell
.wk-bear   — red cell
.wk-chop   — amber cell
```

---

## Individual Timeframe Tables

Three tables, one per timeframe. Columns:

| Column | Content |
|--------|---------|
| Period | Month or range (e.g. "Jan – Mar", "Apr", "Dec") |
| Yearly Bias | Signal tag for overall direction |
| Monthly Overview | 1–2 sentence description |
| Weekly Detail | 4-cell wk-grid (Wk1–Wk4) |
| Notes | Trade action guidance |

These tables are static HTML — no JavaScript interaction.

---

## Combined Accordion Table

### HTML Structure

```html
<table class="acc-table">
  <thead>...</thead>
  <tbody id="acc-body">
    <!-- Dynamically injected by buildAccordion() -->
    <tr class="acc-row-month" data-idx="0">   ← January header row
    <tr class="acc-row-weeks" data-idx="0">   ← January expanded weeks
    <tr class="acc-row-month" data-idx="1">   ← February header row
    <tr class="acc-row-weeks" data-idx="1">   ← February expanded weeks
    ...
  </tbody>
</table>
```

### Accordion JavaScript Logic

```javascript
// Data structure
const MONTHS = [
  {
    month: "January",
    sig5: "bull",      // 5-yr signal
    sig15: "bull",     // 15-yr signal
    sig34: "bull",     // long-term signal
    combined: "bull",  // overall
    combinedLabel: "LONG",
    stars: 5,
    note: "Description",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"..." },
      // Wk2, Wk3, Wk4...
    ]
  },
  // 11 more months...
];

// Signal → CSS class mapping
const sigClass = { bull:"bull-tag", bear:"bear-tag", chop:"chop-tag", flip:"chop-tag" };
const sigLabel = { bull:"Bull", bear:"Bear", chop:"Chop", flip:"Flip" };

// buildAccordion() — runs once on page load
// Creates month rows + week rows, attaches click listeners
// Auto-opens April (data-idx="3")
```

### Toggle Mechanism

```javascript
trMonth.addEventListener("click", () => {
  const open = trMonth.classList.toggle("is-open");
  if (open) trWeeks.classList.add("is-open");
  else trWeeks.classList.remove("is-open");
});
```

```css
.acc-row-weeks { display: none; }
.acc-row-weeks.is-open { display: table-row; }
```

---

## AI Analysis Panel

### HTML

```html
<div class="ai-panel">
  <div class="ai-label">Claude Sonnet · Live Analysis</div>
  <div class="ai-output" id="ai-output">Awaiting analysis run...</div>
  <button class="run-btn" onclick="runAnalysis()">▶ Generate Week-by-Week Bias</button>
</div>
```

### API Call

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: SEASONAL_DATA }]
  })
});

const data = await response.json();
const text = data.content?.map(b => b.text || '').join('') || 'No response received.';
output.textContent = text;
```

### SEASONAL_DATA String Contents

The string passed to the API contains:
1. Asset identifier and source
2. 5-YR readings (period-by-period)
3. 15-YR readings (period-by-period)
4. 34-YR readings (period-by-period)
5. Playbook signals (buy/sell weeks from trading plan)
6. TASK section — instructs Claude to produce 4 outputs:
   - Yearly Bias Summary (paragraph)
   - Month-by-Month Bias Table
   - Week-by-Week priority month breakdown
   - Top 3 highest conviction trade setups

### API Costs (Current)

- Model: claude-sonnet-4-20250514
- Input: ~500 tokens per press → $0.0015
- Output: ~1000 tokens per press → $0.015
- **Total per press: ~$0.017 (~1.7 cents)**
- 60 presses ≈ $1.00
- Separate from Claude.ai subscription — billed via console.anthropic.com

---

## Data Flow Diagram

```
User opens HTML file in browser
         ↓
buildAccordion() runs → renders 12 month rows from MONTHS[] data
         ↓
User reads static TF tables (5-YR, 15-YR, 34-YR)
         ↓
User clicks month row → week expansion toggles
         ↓
User clicks "Generate Week-by-Week Bias" button
         ↓
runAnalysis() fires → POST to api.anthropic.com/v1/messages
         ↓
Claude Sonnet receives SEASONAL_DATA + TASK prompt
         ↓
Response text rendered in ai-output div
```

---

## Known Limitations (Current Version)

| Limitation | Impact | Fix (see ROADMAP.md) |
|-----------|--------|---------------------|
| max_tokens = 1000 | AI analysis truncated | Increase to 3000 |
| No streaming | Output appears all at once | Add streaming API |
| Plain text output | No formatting in AI panel | Return styled HTML or parse markdown |
| Static SEASONAL_DATA | Must be manually updated per asset | Dynamic generation from MONTHS[] |
| No conversation memory | Each press is independent | Add follow-up input box |
| No error detail | Auth failures show generic message | Improve error handling |
| Single asset per file | No multi-asset switching | Asset selector + shared template |
