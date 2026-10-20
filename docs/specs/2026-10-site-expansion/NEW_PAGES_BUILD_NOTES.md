# New Pages — Build Brief for Claude Code

**Repo:** `kaminariprecisiontrading/seasonal-dashboard` · **Host:** Netlify
**Prerequisite:** the landing-page brief (`LANDING_PAGE_BUILD_NOTES.md`) is built first. These pages reuse its routing pattern, `/dashboard`, the shared `js/signals.js` and the shared styles.

**Design references** (attach them all; each is a static snapshot of the mockup's initial state):

| File | Page | Route |
|---|---|---|
| `methodology.html` | Methodology | `/methodology` |
| `whatchanged.html` | This Week digest + watchlist + alerts | `/this-week` |
| `trackrecord.html` | Signal track record | `/track-record` |
| `heatmap.html` | Seasonal heatmap | `/heatmap` |

All numbers, signals and patterns in the mockups are **sample data**. Copy, layout, colours and type are approved. Remove the amber "sample data" banners when the pages are wired to real data.

Before starting, read `README.md`, `ARCHITECTURE.md`, `DATA_DICTIONARY.md`, `data/signals_manifest.js` and `PLATFORM_ROADMAP.md`.

**Build order:** one branch and PR per phase, so each can ship on its own.

| Phase | Page | Needs new data? |
|---|---|---|
| 1 | Methodology | No |
| 2 | This Week + watchlist | No (alerts delivery: yes, see 2c) |
| 3 | Track Record | Yes: grading pipeline |
| 4 | Heatmap | No |

---

## 0. Shared work (do first)

1. **Routes.** Add a Netlify `200` rewrite for each route in the table above, the same way `/dashboard` → `dashboard.html` is done. Use files `methodology.html`, `this-week.html`, `track-record.html` and `heatmap.html` at the repo root, so relative asset paths keep working.
2. **Shared nav.** Add one header (logo + DASHBOARD · THIS WEEK · HEATMAP · TRACK RECORD · METHODOLOGY) used by:
   - the landing page
   - `/dashboard`
   - the four new pages

   Implement it once as a small JS include or a shared partial; don't paste copies. Mark the current page with `aria-current="page"`. It must wrap at phone width.
3. **Shared styles.** Promote the landing page's CSS tokens to a shared `css/site.css`: colours, fonts, `.pill .bull .bear .chop .flip`, and the `.seg` / `.seg-on` toggle buttons. Each page adds only its own extras.
4. **Signals module.** Extend `js/signals.js` from the landing brief with helpers. All pages use these; no page re-implements signal logic.
   - `getSignal(assetKey, month, week)` → `{ signal, conviction }`
   - `currentWeek()` / `shiftWeek(monthWeek, ±n)`, handling Wk4 → next month Wk1 and Dec → Jan
   - `assetsByGroup()`, the asset-class grouping already used by the dashboard tabs
5. Add the new pages to `README.md`, `ARCHITECTURE.md`, `docs/USER_GUIDE.md` and `CHANGELOG.md`.
6. **Footer.** Every new page uses the shared site footer from `LEGAL_PAGES_BUILD_NOTES.md` §2: legal links, the Embeds setting, and the operator and disclaimer line. If the legal pages aren't built yet, link to their routes anyway.
7. **Methodology** ends with three buttons: See how signals performed → `/track-record`, Open dashboard → `/dashboard`, Read the risk disclosure → `/risk`.

---

## Phase 1 — Methodology (`/methodology`)

Mostly static content, copied from the mockup.

- **Check every claim against the code and `DATA_DICTIONARY.md` before publishing.** Report anything that doesn't match, especially:
  - how conviction (1–5) is actually derived from the three timeframes
  - when a week becomes CHOP vs FLIP vs AVOID
- The three "timeframe agreement" example rows are labelled illustrative. Replace them with examples that match the real mapping exactly.
- FX synthesis section: base direct + quote inverted, using the terms already used in the asset data (double alignment, collision, maximum conflict).
- The data sources table must match the README.
- Link to it from the landing page footer, the shared nav, and the Analysis tab's disclaimer.

---

## Phase 2 — This Week (`/this-week`)

### 2a. Digest (data from `signals_manifest.js`)

| Block | Logic |
|---|---|
| Week header + ‹ › buttons | Defaults to the current week. Arrows browse ±weeks; reflect the week in the URL (`?w=2026-10-3`) |
| Tally cards | BULL / BEAR / OTHER counts for the selected week, with the delta vs the previous week. "Signals changed" = count where the signal differs from the previous week |
| Signals that flipped | Assets whose signal differs from last week, shown as `from → to`. Sort by conviction descending. Show the top 6, plus a "See all N" link that expands the full list |
| New max conviction | Conviction = 5 this week **and** below 5 last week |
| Coming up | The next 4 weeks: per week, assets with conviction ≥ 4, top 3 by conviction. Show "Nothing above 3 dots" when empty |

- Every asset row links to its asset page.
- Planned (not live) assets are excluded everywhere.

### 2b. Watchlist

- A ★ toggle button on every dashboard card and in every asset page header, with `aria-pressed` and `aria-label="Add EURUSD to watchlist"`.
- Store it in `localStorage` key `kpt.watchlist` as an array of asset keys. Wrap reads and writes in try/catch; the site must work with storage blocked.
- Add the key to `DATA_DICTIONARY.md` → localStorage keys.
- Watchlist strip on `/this-week`. Empty state: "Star any asset card to add it here."
- The dashboard gets a "★ Watchlist" filter button next to All / Bull / Bear / Other.

### 2c. Alerts (email / Telegram): DEFERRED

> **Not in the current build.** Leave the alerts section out of `/this-week` for now. The mockup shows it with a "LATER · NOT IN CURRENT BUILD" tag. This section stays as the plan for later. When it's built, the Privacy Policy must be updated too (provider, what's stored, unsubscribe).

This is a static site with no backend, so it would be built in two steps.

1. **UI + sign-up capture.**
   - Build the form from the mockup: channel toggle, address field, "watchlist assets only" checkbox.
   - Wire it to **Netlify Forms** (`data-netlify="true"`, honeypot field).
   - The success state is the "You're in" panel.
2. **Delivery pipeline.** **Stop and ask me before building this.** I need to choose:
   - an email provider (e.g. Buttondown or Resend)
   - whether Telegram is a public channel (simplest: a bot posts the digest, no personal data stored) or per-user DMs

   Scheduling would be a GitHub Action cron or a Netlify scheduled function, every Monday at 06:00 UTC (before the London open). It renders the same digest from `signals_manifest.js`.

Also:
- Collecting emails means adding a short privacy note under the form (what's stored, how to unsubscribe) and an unsubscribe link in every email.
- **Before alerts go live, flag the Moore Research licensing question to me.** Pushing derived signals out by email increases redistribution.

---

## Phase 3 — Track Record (`/track-record`)

### 3a. Data pipeline (Python, in the `KPT-Market-Profiling` repo)

Script `pipeline/grade_signals.py`:

- **Scope:** the 14 assets with M1 history (asset keys listed in the README's Market Profiling section).
- **For each week:** look up the signal and conviction for that asset, then pull that week's Monday-open and Friday-close prices from the M1 data (broker time).
- **Grading rules** (as in the mockup; **confirm with me before coding**):
  - HIT = close-to-close move in the signal's direction
  - CHOP is not graded
  - FLIP is graded on the second half of the week, in the post-turn direction
  - Moves are expressed as multiples of ADR20
- **Two kinds of history — keep them separate:**
  - *Backfilled*: past weeks graded using today's seasonal data. This is in-sample, because the seasonal charts already include those years.
  - *Live-recorded*: from now on, archive each week's signals as they were shown at the time, in `data/signal_history/YYYY-MM-Wn.json`. Grade those snapshots, never the current data.

  Label the backfilled rows clearly on the page and default the headline KPIs to live-recorded once there are 12+ weeks of it.
- **Output:** `data/track_record.js`, holding rows `{ week, asset, signal, conviction, moveAdr, result, source: "backfill"|"live" }` and a `generatedAt` timestamp.
- Sync it into this repo the same way profiling data is synced (`scripts/sync_profiling_data.js` pattern).

### 3b. Page

| Block | Logic |
|---|---|
| Period toggle | 12W / 26W / 52W / All, filtering all blocks below |
| KPIs | Hit rate (graded only) · signals graded · avg move on hits / misses (×ADR20) · 5-dot hit rate |
| Hit rate by conviction | Bars for 1–5 dots, with a 50% reference line. Show `n` per bar; grey out any bar with n < 20 and add "too few signals" |
| Last 12 weeks | Weekly hit-rate columns; below 50% dimmed. Each column has a `title`/tooltip |
| Disclaimer (below KPIs) | Past performance / hypothetical, excludes costs / backfilled = in-sample, with a Risk link (text from the mockup) |
| Signal log | Asset filter, newest first, paginated at 25 rows, ✓ HIT / ✗ MISS / — NOT GRADED, plus a SOURCE column with a LIVE / BACKFILL badge |
| Grading rules | Static text from the mockup, updated to match whatever rules are confirmed |

Rule: never hide or round away misses. The page exists to show honest performance.

---

## Phase 4 — Heatmap (`/heatmap`)

- **Data:** the manifest's 12-month × 4-week strings for all live assets, through `js/signals.js`.
  - **Month view:** one cell per month. Use the month-level combined signal if `MONTHS[]` has one. Otherwise use the majority of the 4 weeks, with conviction = the average rounded. Document the rule chosen in `DATA_DICTIONARY.md`.
  - **Week view:** a rolling 12 weeks (4 before the current month, the current month, 4 after), with the column labels updated to match.
- **Rows:** grouped by asset class, with the same groups as the dashboard tabs (FX Majors / Minors / Crosses, the 9 futures groups, Crypto). Group filter chips: All + each group.
- **Cells:** `<button>`s showing the symbol ▲ ▼ – ↻ and coloured by signal. Opacity scales with conviction for BULL/BEAR.
  - Every cell has an `aria-label` like "EURUSD, OCT: BEAR, conviction 5 of 5".
  - The current period's column header is highlighted.
  - Clicking a cell shows it in the side panel; "Open asset →" links to the asset page.
- **Layout:** sticky first column (asset names). The grid scrolls horizontally inside its box at phone width; the page itself never scrolls sideways.
- **Performance:** 98 rows × 12 cells is fine as plain DOM. Build it in one pass, not cell by cell with reflows.

---

## Acceptance checklist

- [ ] All four routes work, and the shared nav appears on landing, dashboard and the new pages.
- [ ] The This Week page and the dashboard agree on every signal for the same week (same `js/signals.js`).
- [ ] Week arrows cross month and year boundaries correctly (Oct Wk4 → Nov Wk1, Dec Wk4 → Jan Wk1).
- [ ] The watchlist persists across reloads and degrades gracefully with storage blocked.
- [ ] The Track Record separates backfilled from live-recorded rows. The grading rules on the page match the code.
- [ ] The Heatmap's current-month column matches the dashboard's current signals.
- [ ] Every page is checked at 1440px, 768px and 390px widths, with no horizontal page scroll.
- [ ] Interactive controls are real buttons/links with visible focus, and text contrast is ≥ 4.5:1.
- [ ] Docs and `CHANGELOG.md` are updated, with one PR per phase and nothing pushed straight to `main`.

## Out of scope

- Accounts or logins.
- Changing how seasonal signals themselves are computed.
- Paid tiers.
- The alerts delivery pipeline, until I choose a provider (2c).
