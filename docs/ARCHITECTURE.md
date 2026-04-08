# ARCHITECTURE.md — Technical Reference

Complete technical documentation for the seasonal trading dashboard system.

---

## Repository Structure

The project lives in a private GitHub repository and is deployed via GitHub Pages.

```
seasonal-dashboard/          ← root of GitHub repo
├── index.html               ← (planned) landing page / asset selector
├── aud_seasonal.html        ← AUD dashboard (complete)
├── gbp_seasonal.html        ← (planned)
├── xau_seasonal.html        ← (planned)
└── docs/
    ├── README.md
    ├── SKILL.md
    ├── ARCHITECTURE.md      ← this file
    ├── CHANGELOG.md
    ├── ROADMAP.md
    └── PROMPTS.md
```

**Deployment:** GitHub Pages serves the repo directly from the `main` branch root.  
Individual dashboards are accessible at:  
`https://[username].github.io/seasonal-dashboard/aud_seasonal.html`

**Local development:** Open folder in VSCode, use Live Server extension to preview with auto-refresh.

---

## Dashboard Anatomy

Each HTML file has six logical sections:

```
1. <head>          — Fonts, CSS variables, all styles
2. Header          — Asset name, source, legend
3. Individual TF Tables  — 5-YR, 15-YR, 34-YR separate tables
4. Combined Table  — Accordion with all 12 months + Wk1-4 expansion
5. AI Panel        — Claude API button and output area
6. <script>        — SEASONAL_DATA constant + API call + accordion builder
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
