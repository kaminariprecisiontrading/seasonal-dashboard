# CHANGELOG.md — Version History

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
