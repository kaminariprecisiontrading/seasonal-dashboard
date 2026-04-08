# CHANGELOG.md — Version History

---

## v0.6 — April 2026
**Modularisation — Shared CSS, JS, Data, and Index Page**

### What Changed
- Extracted all shared CSS into `css/dashboard.css` — one file governs every dashboard's look
- Extracted accordion logic into `js/accordion.js` — asset-agnostic, reads config from data file
- Extracted Claude API call into `js/api.js` — shared across all assets
- Created per-asset data files in `data/` — each contains `ASSET_CONFIG`, `MONTHS[]`, `SEASONAL_DATA`
- Refactored all three asset dashboards into thin HTML shells in `assets/` (~120 lines each)
- Built `index.html` landing page — card grid showing all assets, live vs planned, current month displayed
- `ASSET_CONFIG` pattern introduced — each data file declares `ltKey`, `ltSigKey`, `ltLabel` so the shared accordion can handle any long-term timeframe (34-YR, 35-YR, 40-YR, etc.) without asset-specific code

### How the Load Order Works
Each asset HTML loads scripts in this order:
1. `data/[asset].js` — defines `ASSET_CONFIG`, `MONTHS[]`, `SEASONAL_DATA`
2. `js/accordion.js` — reads `ASSET_CONFIG`, builds the accordion, auto-opens current month
3. `js/api.js` — reads `SEASONAL_DATA` and `ASSET_CONFIG.ltLabel`, runs Claude API call on button click

### Important: Local Preview
External JS imports require a server context. Use **Live Server** in VSCode to preview locally. Opening HTML files directly from the filesystem will silently fail. GitHub Pages works correctly.

### Final Folder Structure
```
seasonal-dashboard/
├── index.html
├── assets/
│   ├── aud.html
│   ├── usd.html
│   └── jpy.html
├── css/
│   └── dashboard.css
├── js/
│   ├── accordion.js
│   └── api.js
├── data/
│   ├── aud.js
│   ├── usd.js
│   └── jpy.js
└── docs/
    ├── README.md
    ├── SKILL.md
    ├── ARCHITECTURE.md
    ├── CHANGELOG.md
    ├── ROADMAP.md
    └── PROMPTS.md
```

### Files Changed
- `css/dashboard.css` — created (new)
- `js/accordion.js` — created (new)
- `js/api.js` — created (new)
- `data/aud.js` — created (new)
- `data/usd.js` — created (new)
- `data/jpy.js` — created (new)
- `assets/aud.html` — created (new, replaces monolithic aud_seasonal.html)
- `assets/usd.html` — created (new, replaces monolithic usd_seasonal.html)
- `assets/jpy.html` — created (new, replaces monolithic jpy_seasonal.html)
- `index.html` — created (new)

---

## v0.5 — April 2026
**USD and JPY Dashboards + Dynamic Month Auto-Open**

### What Was Added
- US Dollar Index (ICE) dashboard — 35-Year seasonal (1985–2019), 15-YR, 5-YR
- Japanese Yen (CME) dashboard — 40-Year seasonal (1980–2019), 15-YR, 5-YR
- Dynamic current-month auto-open — accordion now uses `new Date().getMonth()` instead of hardcoded April
- "NOW" badge added to current month row in all dashboards
- `max_tokens` raised from 1000 to 2500 on USD and JPY dashboards for fuller AI analysis
- Hint text updated to "Current month opens automatically"

### Key Analysis Notes (USD)
- 35-yr peaks earliest of all TFs — late Feb (before 15-yr peaks in mid-Mar)
- Double-cycle structure: Feb/Mar peak → May trough → Jun/Jul bounce → Oct trough → Nov/Dec peak
- Nov/Dec is highest conviction LONG of year — all 3 TFs fully aligned
- April: SELL Wk1/2 confirmed by all TFs; Wk4 is actually a FLIP LONG not a continuation sell

### Key Analysis Notes (JPY)
- 40-yr is the longest TF at 40 years — variable naming updated throughout (sig40, s40)
- March is the highest conviction Q1 LONG — all 3 TFs aligned simultaneously
- Jul–Aug is the absolute annual peak — all 3 TFs hit ~95–100 together
- Sep is the highest conviction SHORT of the year — simultaneous collapse from Aug peak
- April is the most complex month: 40-yr still rising at Wk1 (playbook BUY) while 5-yr/15-yr already falling

### Files Changed
- `usd_seasonal.html` — created
- `jpy_seasonal.html` — created
- `aud_seasonal.html` — updated with dynamic month auto-open and NOW badge

---

## v0.4 — April 2026
**Development Environment: VSCode + GitHub Setup**

### What Was Set Up
- Local project folder initialised as a Git repository inside VSCode
- Private GitHub repository created: `seasonal-dashboard`
- SSH authentication configured for GitHub (ED25519 key, Authentication type)
- All project files pushed to `main` branch
- GitHub Pages enabled — dashboard now accessible as a live URL
- Claude Code (official Anthropic VSCode extension) installed and available for in-editor AI assistance

### Key Decisions Made
- GitHub Pages chosen for hosting: free, zero configuration, deploys directly from `main` branch
- Private repo for now — can be made public if the project evolves into a public resource
- SSH authentication chosen over Personal Access Token for long-term reliability
- VSCode + Claude Code for code editing; Claude.ai for design and new asset generation

### Authentication Notes
- GitHub requires SSH key or Personal Access Token — passwords over HTTPS are not accepted
- SSH key type: **Authentication Key** (not Signing Key)
- Generated using `ssh-keygen -t ed25519`
- Added to GitHub under Settings → SSH and GPG Keys

### Workflow Going Forward
1. Edit files locally in VSCode (with Claude Code assistance if needed)
2. Preview changes instantly with Live Server extension
3. Commit via VSCode Source Control panel
4. Push to GitHub — GitHub Pages deploys automatically

---

## v0.3 — April 2026
**Combined Table: Accordion Expansion**

### What Changed
- Replaced the flat combined table with a fully interactive accordion
- Each of the 12 months now has a clickable header row
- Clicking a month expands to reveal Wk1–4 breakdown for that month
- Each expanded week shows: 5-YR signal, 15-YR signal, 34-YR signal, combined conviction rating, action note
- April auto-opens on page load (priority month)
- Chevron indicator rotates to show open/closed state
- Added subtle green glow on open month rows
- `MONTHS[]` JavaScript data array now contains full Wk1–4 data for all 12 months

### What Was There Before
- Combined table was a flat list of rows: some were single months (Jan, Feb...), some were sub-monthly (Apr Wk1, Apr Wk2, Apr Wk3-4), inconsistently structured
- No expandable rows
- No week-by-week data for months other than April

### Files Changed
- `aud_seasonal.html` — combined table section replaced in full

---

## v0.2 — April 2026
**Initial Dashboard Build — AUD/USD**

### What Was Built
- Complete single-file HTML dashboard for Australian Dollar (AUD/USD)
- Three separate timeframe tables: 5-YR (pink), 15-YR (brown), 34-YR (blue)
- Each table has: Period, Yearly Bias, Monthly Overview, Weekly Detail (4-cell grid), Notes
- Combined bias table showing all timeframes side-by-side per period
- AI analysis panel with Claude API button
- Dark terminal aesthetic with IBM Plex Mono + Bebas Neue fonts
- CSS variable system for colour consistency
- Signal tags: bull (green), bear (red), chop (amber)
- Conviction ratings using star system (★★★★★)
- Colour-coded week cells (wk-bull, wk-bear, wk-chop)
- Section labels with coloured dot indicators matching chart line colours
- Legend row explaining colour coding
- Footnote with data source attribution

### Chart Analysis Performed (AUD)
**Source:** Moore Research Center — AUD/USD CME Futures, 34-Year Seasonal (1986–2019)

**5-Year Key Findings:**
- Jan–Mar: Strongly bullish, AUD at 80–85 range
- Early April: Absolute peak at score ~100 (highest point on chart)
- Apr Wk2 onwards: Sharp waterfall reversal
- May–Jun: Deep trough, strongest bear period
- Jul: Choppy, no clean trend
- Aug–Sep: Secondary bear leg
- Oct–Nov: Base forming
- Dec: Recovery into Q1

**15-Year Key Findings:**
- Jan–Mar: Strong rally, peaks slightly earlier than 5-yr (late March ~95–100)
- Apr Wk1: Final brief push then rollover
- Jul Wk1–2: Notable sharp bounce to ~75 (counter-trend, more pronounced than 5-yr)
- Oct–Nov: Slower recovery

**34-Year Key Findings:**
- Jan–Mar: Slowest but most reliable bull phase (~30 rising to ~85–90)
- Apr: More gradual rollover than shorter TFs
- Jul: Subdued bounce (structural weight continues)
- Oct–Dec: Slowest recovery of all three

**April Conviction Mapping:**
- Wk1: All 3 TFs bullish → LONG, flip by end of week (★★★★☆)
- Wk2: 5-yr + 15-yr bear, 34-yr transitioning → SHORT (★★★☆☆)
- Wk3: All 3 bear → HIGH CONVICTION SHORT (★★★★★)
- Wk4: All 3 bear, extend into May → HOLD SHORT (★★★★★)

### API Integration
- Model: `claude-sonnet-4-20250514`
- Endpoint: `https://api.anthropic.com/v1/messages`
- max_tokens: 1000
- SEASONAL_DATA prompt covers all 3 timeframes and includes TASK section
- Response rendered as plain text

---

## v0.1 — April 2026
**Project Conception**

### Initial Ideas Discussed
- Trading playbook for April reviewed — covering currencies and metals with weekly buy/sell/choppy signals
- Decision to build a structured seasonal analysis dashboard rather than flat notes
- Image batching strategy established: 4–6 images per Claude message
- Three-layer output structure defined:
  1. Separate tables per timeframe (5-YR, 15-YR, long-term)
  2. Combined table synthesising all timeframes
  3. AI layer generating written analysis from the combined data
- Hierarchy confirmed: yearly arc first, then monthly, then weekly
- Two billing systems clarified: Claude.ai subscription vs API credits

### Decisions Made
- Single HTML file per asset (no build process)
- Dark terminal aesthetic chosen
- IBM Plex Mono + Bebas Neue font pairing
- Signal colours: green/red/amber (trading convention)
- Star ratings for conviction
- April designated as priority month (auto-open)
- Moore Research Center as data source
