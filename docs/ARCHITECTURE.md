# ARCHITECTURE.md — Technical Reference

Complete technical documentation for the seasonal trading dashboard system.

---

## Repository Structure

```
seasonal-dashboard/          ← root of GitHub repo
├── index.html               ← landing page with sticky nav + asset card grid
├── assets/
│   ├── aud.html             ← AUD futures dashboard shell
│   ├── usd.html             ← USD futures dashboard shell
│   ├── jpy.html             ← JPY futures dashboard shell
│   ├── gbp.html             ← GBP futures dashboard shell
│   ├── fx-audusd.html       ← AUDUSD forex dashboard shell
│   ├── fx-usdjpy.html       ← USDJPY forex dashboard shell
│   ├── fx-gbpusd.html       ← GBPUSD forex dashboard shell
│   └── [asset].html         ← future assets follow same pattern
├── css/
│   └── dashboard.css        ← ALL shared styles — one file governs every dashboard
├── js/
│   ├── accordion.js         ← shared accordion builder + auto-open logic
│   └── api.js               ← shared Claude API call (max_tokens: 2500)
├── data/
│   ├── aud.js               ← AUD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── usd.js               ← USD: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── jpy.js               ← JPY: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── gbp.js               ← GBP: ASSET_CONFIG + MONTHS[] + SEASONAL_DATA
│   ├── fx-audusd.js         ← AUDUSD forex: derived synthesis data
│   ├── fx-usdjpy.js         ← USDJPY forex: derived synthesis data
│   ├── fx-gbpusd.js         ← GBPUSD forex: derived synthesis data
│   └── [asset].js           ← future assets follow same pattern
└── docs/
    ├── README.md
    ├── SKILL.md
    ├── ARCHITECTURE.md      ← this file
    ├── CHANGELOG.md
    ├── ROADMAP.md
    └── PROMPTS.md
```

**Deployment:** GitHub Pages serves from `main` branch root.
- Landing page: `https://[username].github.io/seasonal-dashboard/`
- Dashboards: `https://[username].github.io/seasonal-dashboard/assets/aud.html`

**Local development:** Use **Live Server** in VSCode. Modular JS imports require a server context — opening HTML files directly from the filesystem fails silently.

---

## Modular Architecture (v0.6+)

Four layers:

### Layer 1 — Shared Styles (`css/dashboard.css`)
Every CSS rule for every dashboard. CSS variables in `:root` define all colours, fonts, and tokens. Edit once → all dashboards update.

Key variables:
```css
--bg: #0a0c0f;
--surface: #111318;
--surface2: #181c23;
--border: #1e2430;
--accent-5yr: #e040a0;      /* pink */
--accent-15yr: #8b3a2a;     /* brown */
--accent-lt: #2563eb;       /* blue — long-term TF */
--accent-combined: #22c55e; /* green */
--bull: #22c55e;
--bear: #ef4444;
--chop: #f59e0b;
```

Typography: `Bebas Neue` (headings) + `IBM Plex Mono` (body/data)

### Layer 2 — Shared JavaScript (`js/accordion.js`, `js/api.js`)

**`accordion.js`** reads `ASSET_CONFIG` to determine:
- `ltKey` — week-level signal key (`"s34"` / `"s35"` / `"s40"` / `"sLt"`)
- `ltSigKey` — month-level signal key (`"sig34"` / `"sig35"` / `"sig40"` / `"sigLt"`)
- `ltLabel` — column header (`"34-YR"` / `"35-YR"` / `"40-YR"` / `"Long-YR"`)

Injects `ltLabel` into `id="acc-lt-header"`. Handles current month detection + NOW badge. Auto-opens current real calendar month.

**`api.js`** reads `SEASONAL_DATA` and `ASSET_CONFIG.ltLabel`. Calls Claude API (`claude-sonnet-4-20250514`, `max_tokens: 2500`). Renders response as plain text.

### Layer 3 — Asset Data Files (`data/[asset].js`)

Each file defines three globals:

```javascript
const ASSET_CONFIG = {
  id:       "aud",
  name:     "AUD / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · AUD/USD CME ...",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#2563eb",
};

const MONTHS = [ /* 12 month objects — see data model below */ ];

const SEASONAL_DATA = `/* AI prompt string */`;
```

### Layer 4 — Asset HTML Shells (`assets/[asset].html`)

Thin HTML files (~120–150 lines). Content order (v0.7):
1. `<head>` — link to shared CSS only
2. Header + legend
3. **Combined accordion** — first visible section (most actionable)
4. **AI panel** — immediately below accordion
5. Divider
6. Individual TF tables (5-YR, 15-YR, long-term) — supporting detail
7. Footnote with inline-styled copyright
8. Three `<script>` tags: `data/[asset].js` → `accordion.js` → `api.js`

**Script load order is critical** — data must be first.

---

## Dashboard Section Order (v0.7)

The combined accordion and AI panel are now **first** on every asset page. This was changed in v0.7 because the accordion is the most actionable element — the trader should see it immediately on load without scrolling.

Individual TF tables (5-YR, 15-YR, 40-YR) are below the divider as supporting reference detail.

---

## Index Page (`index.html`)

### Sticky Navigation Bar
A `position: sticky; top: 0` nav bar with `backdrop-filter: blur` sits above all content. Contains 13 jump links in two groups:

**Futures:** Currencies · Metals · Energy · Rates · Indices · Softs · Grains · Fiber · Meats  
**Forex:** Majors · Minors · Crosses

Active link highlights automatically via `IntersectionObserver` as the user scrolls. Nav scrolls horizontally on mobile without wrapping.

### Two Top-Level Sections
1. **Futures Seasonals** — source: Moore Research Center CME/CBOT/ICE/etc. charts
2. **Forex Seasonals** — derived from CME futures pair combinations

Each section has `id` attributes on all subsections matching the nav link `href` values.

### Asset Cards
- `status-complete` — clickable, full colour, shows "Live" badge + arrow
- `status-planned` — greyed out (opacity 0.45), pointer-events none, shows "PLANNED" badge
- Forex cards show `card-badge derived` pills for each component futures dataset

---

## Data Model

### Futures Asset — Month Object
```javascript
{
  month: "April",
  sig5:  "bear",      // 5-yr signal: bull | bear | chop | flip
  sig15: "bear",      // 15-yr signal
  sig34: "bear",      // long-term signal (key name varies: sig34 / sig35 / sig40)
  combined: "flip",   // combined signal
  combinedLabel: "FLIP MONTH",
  stars: 5,           // 1–5 conviction
  note: "Most critical month. Long Wk1, flip short Wk2 onwards.",
  weeks: [
    { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG → FLIP ★★★★☆", note:"..." },
    { wk:"Wk 2", s5:"bear", s15:"bear", s34:"chop", com:"SHORT ★★★☆☆",       note:"..." },
    { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★",       note:"..." },
    { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★",       note:"..." },
  ]
}
```

Signal values → CSS classes: `bull` → `.bull-tag` (green) · `bear` → `.bear-tag` (red) · `chop` / `flip` → `.chop-tag` (amber)

### Forex Asset — Month Object
Same structure but uses `sigLt` / `sLt` as the long-term key (since the "long-term" signal is the synthesised combination, not a single named timeframe).

---

## Forex Dashboard Differences

Forex dashboards (`assets/fx-*.html`) differ from futures dashboards:
- **No individual TF tables** — data is synthesised from two futures sources, not raw charts
- **Methodology note** at top explaining the derivation
- **Component cards** showing the two source futures datasets
- **`ASSET_CONFIG.ltLabel` = `"Long-YR"`** and `ltSigKey = "sigLt"`, `ltKey = "sLt"`
- Footnote credits both source datasets

---

## Adding a New Futures Asset

Three files required:

**1. `data/[asset].js`** — copy `data/aud.js` as template. Update:
- `ASSET_CONFIG` — all fields, especially `ltLabel`, `ltSigKey`, `ltKey`
- `MONTHS[]` — 12 month objects with full Wk1–4 week data
- `SEASONAL_DATA` — AI prompt string with all 3 TF readings + TASK section

**2. `assets/[asset].html`** — copy `assets/aud.html`. Update:
- `<title>`, `<h1>`, `.sub` text
- Legend long-term TF label
- All three static TF tables
- Footnote — use exact pattern with inline-styled copyright span (see SKILL.md)
- Script src tags → `data/[asset].js`

**3. `index.html`** — find the planned card, change:
- `status-planned` → `status-complete`
- `href="#"` → `href="assets/[asset].html"`
- Update timeframe badges to actual TFs

Deploy: commit all three files, push to `main`. GitHub Pages deploys automatically.

---

## Adding a New Forex Asset

Same three-file pattern but:
- `data/fx-[pair].js` — uses `sigLt`/`sLt` keys, `SEASONAL_DATA` explains component methodology
- `assets/fx-[pair].html` — copy `assets/fx-audusd.html`, update component cards and footnote
- No individual TF tables in the HTML shell

---

## Copyright Pattern (Critical)

Every asset footnote must use this exact pattern:

```html
<div class="footnote">
  Seasonal data source: Moore Research Center © 2020 · [ASSET] · [XX]-Year Seasonal ([YEAR]–2019) · 15-Year · 5-Year overlays.<br>
  This analysis is based on historical seasonal tendencies only and does not constitute financial advice. Past seasonals do not guarantee future performance.
  <span class="copyright" style="display:block;margin-top:10px;padding-top:10px;border-top:1px solid #1e2430;color:#94a3b8;letter-spacing:0.8px;font-size:11px;">© 2026 Kaminari Precision Trading. All rights reserved. &nbsp;·&nbsp; Dashboard interface design and analysis framework by Kaminari Precision Trading. Seasonal tendency data sourced from Moore Research Center.</span>
</div>
```

**The inline style on `<span>` is mandatory** — do not rely on the CSS class alone. The inline style ensures the copyright renders regardless of CSS load order or browser caching.

---

## Common Errors and Fixes

| Problem | Fix |
|---------|-----|
| Accordion doesn't build / page blank | Check browser console. Script load order must be: data → accordion → api |
| Long-term column shows wrong label | Check `ASSET_CONFIG.ltLabel` matches the HTML `id="acc-lt-header"` context |
| AI button cuts off mid-analysis | Raise `max_tokens` in `js/api.js` (currently 2500) |
| Copyright not showing | Ensure `<span>` uses inline styles, not CSS class only |
| Live Server works but GitHub Pages doesn't | Check relative paths — `../css/dashboard.css` requires assets in `assets/` subfolder |
| AI button returns empty | Check API key active at console.anthropic.com |
| Sticky nav doesn't highlight | Check section `id` attributes match nav link `href` values exactly |
