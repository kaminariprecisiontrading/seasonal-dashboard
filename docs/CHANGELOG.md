# CHANGELOG.md — Version History

---

## v1.7 — September 2026
**Market Profiling — 8th tab (Profiling), GBPUSD/EURUSD, ported from KPT-Market-Profiling**

### Summary

Adds a "Profiling" tab — statistical range distributions, time-of-extreme clustering, and a rule-based 8-profile daily taxonomy — ported from the sibling `KPT-Market-Profiling` repo onto the 4 pages with real ported data: `gbp.html`, `fx-gbpusd.html`, `eur.html`, `fx-eurusd.html`. Unlike every prior shared-tab addition, this one is **not** loaded on all 97 pages — only where Profiling data exists, per `docs/MARKET_PROFILING_INTEGRATION.md`. `KPT-Market-Profiling` becomes a pure data-pipeline repo going forward; this repo is the one deployed product. Data is 2019-vintage (matching the source pipeline's current output) — refreshed via the new sync script whenever fresher CSVs are uploaded and re-piped.

### New: `js/profiling.js`, `js/profiling-charts.js`

- `profiling-charts.js` — page-independent shared library: `KPTPTooltip` (hover tooltip), `KPTPCharts` (vanilla-SVG range strips, time-of-extreme heatmap, bar charts, candlesticks — no charting library), a plain-language glossary, and the 8-profile taxonomy's colour/icon/rule/why/timing metadata. No `ASSET_CONFIG` dependency — also loaded directly by the two new standalone pages below.
- `profiling.js` — resolves `ASSET_CONFIG.id` to a Profiling data key (`gbp`/`fx-gbpusd` → `gbpusd`, `eur`/`fx-eurusd` → `eurusd`; early-returns/renders nothing if unmapped), builds `<section data-kpt-panel="profiling">` and all inner containers from scratch (the source's `dashboard.js` assumed a static HTML shell with ~15 fixed-ID containers — doesn't work inside one panel among seven other tabs), and reads from `window.KPT_PROFILING.<key>`.
- `ui.js` — added `{ id: 'profiling', label: 'Profiling' }` to the `tabs` array (one line; existing filter logic handles pages without the panel automatically).

### New: `data/profiling/` + `scripts/sync_profiling_data.js`

`scripts/sync_profiling_data.js` reads `../KPT-Market-Profiling/dashboard/data/` and regenerates `data/profiling/{gbpusd,eurusd}.js`, `data/profiling/profile-examples/*.js`, `data/profiling/calendar/*/`, and `data/profiling/manifest.js` (per-asset freshness). Not a one-time port — re-run any time the pipeline is re-run. The source's asset/profile-example bundles declare a bare `const X = {...}` (a lexical binding, invisible to `window`); the sync script rewrites these onto `window.KPT_PROFILING.<key>` / `window.KPT_PROFILING_EXAMPLES.<key>` so `profiling.js` can resolve them by a runtime-constructed key — the same fix the source's own calendar loader already needed for its per-year files (calendar data is copied verbatim; it was already namespaced correctly).

### New: `profiling-calendar/index.html`, `profiling-profiles/detail.html`

Linked from inside the Profiling tab panel, not sub-tabs (mirrors how `assets/` sits outside the tab system).

- `profiling-calendar/index.html` (+ `js/profiling-calendar.js`) — month-grid day browser. `?a=GBPUSD` shows that asset; no param shows a cross-asset "all assets on this day" home view. One merged controller (the source split this into three files; merged here since both views share one route).
- `profiling-profiles/detail.html` (+ `js/profiling-profile-detail.js`) — one templated page for all 8 profiles (`?p=<slug>&a=<assetkey>`), showing rule/why/timing copy, cross-asset stats, and a real illustrative M15 candlestick example day per asset.

### `css/dashboard.css` — `.kptp-` namespace

The source `KPT-Market-Profiling/dashboard/css/dashboard.css` was seeded from an early, much smaller snapshot of this file — several of its class names (`.panel`, `.section-label`, `.header`, `.sub`, `.divider`, `.footnote`, `.dial`, `.mode-note`) now collide with this file's own, unrelated, already-load-bearing classes. Every class the Profiling feature introduces is prefixed `.kptp-` (blanket rule, not per-class judgment). Seven new CSS variables added to `:root` (`--kptp-compression`, `--kptp-expansion`, `--kptp-normal`, `--kptp-asian`, `--kptp-london`, `--kptp-ny`, `--kptp-overlap`); the 11 base tokens are reused directly since they're byte-for-byte identical between both repos.

### Bug fix: broken Profiling link paths (found in user review)

`js/profiling.js`'s "Browse … by date →" link and profile-card links were written without the `../` needed to reach `profiling-calendar/` and `profiling-profiles/` from inside `assets/<page>.html` — the calendar link also pointed at a `asset.html` filename that was never actually created (the real file is `profiling-calendar/index.html?a=…`). Both fixed; re-verified by actually clicking each link end-to-end rather than only navigating to the destination pages directly (the gap that let this ship in the first place).

### New: Week-of-Year — a bonus feature requested after the initial merge

Added a "Year High/Low — Week of Year" bar-chart pair to the Profiling tab's "Weekly, Monthly and Yearly Extremes" section (alongside the existing Weekday / Week-of-Month / Month-of-Year charts), and surfaced the ISO week number in the calendar's day-detail panel (both single-asset and cross-asset home views).

This required a small pipeline extension in `KPT-Market-Profiling`, not just a dashboard-side change — the underlying stats didn't previously track which week-of-year a yearly extreme fell in, only which month:
- `stats_engine.py`'s `build_yearly()` now also captures the ISO week (1-53) of each yearly high/low, emitted as new `yearly_high_week`/`yearly_low_week` histograms (`isocalendar()` needed an explicit `.astype(int)` — its nullable `UInt32Dtype` scalars aren't valid JSON dict keys, unlike the plain `int64` `.dt.month` already produced).
- `export_calendar_data.py` now includes `week_of_year` in every day's `week` sub-object — the ISO week was already computed as a merge key, just not previously carried through to the output record.
- Re-ran `stats_engine.py`, `build_dashboard_data.py`, and `export_calendar_data.py` for both assets, then `node scripts/sync_profiling_data.js` to pull the new fields in.

Dashboard-side:
- `js/profiling-charts.js`'s `renderBarChart()` gained an optional `labelEvery` option — with 53 possible week buckets (vs. 12 months / 7 weekdays / 5 weeks-of-month), labeling every bar would overlap illegibly; every bar still renders and hovers for its exact count, only the text label is thinned (every 4th bar). Existing callers are unaffected (default `labelEvery: 1`).
- `js/profiling.js` added a `weekOfYearEntries()` helper that zero-fills all 53 ISO weeks (unlike the existing `numericSortedEntries()`/`monthEntries()`, which only emit entries for keys actually present in the data) — with only ~20-40 yearly-extreme occurrences spread across 52 possible weeks, most weeks have zero occurrences; plotting only the present keys would space bars by array index rather than true week-of-year distance, misrepresenting how far apart two occurrences actually are.
- `js/profiling-calendar.js`: added a "Week of Year" row to the compact cross-asset home-view detail, and the ISO week number to the single-asset view's "Week (...)" context header (e.g. "Week 37 (2019-09-09 → 2019-09-13)").
- Section note now explains ISO week numbering, since it produces a genuinely surprising result at the year boundary: a late-December date can land in Week 1 of the *following* year (confirmed empirically — 2019-12-30/31 both report as Week 1).

### Bug fix: calendar day-detail panel used the wrong (compact) layout for single-asset view

Found by comparing the ported `profiling-calendar/index.html?a=GBPUSD` against the source `KPT-Market-Profiling/dashboard/calendar/asset.html?a=GBPUSD` side by side. The source has two different day-detail layouts: a compact one-column-per-asset layout for the cross-asset home view (`calendar-home.js`), and a richer two-column layout for single-asset view (`calendar-page.js`) that adds week/month context headers ("WEEK (start → end)", "MONTH (start → end)") plus "Week High / Low Day" and "Month High / Low" rows. `js/profiling-calendar.js` merged both source files into one controller but only ported the compact layout, using it for both modes — so single-asset view was silently missing four rows/headers of real data that the underlying record already contained (`rec.week.high_weekday`/`low_weekday`, `rec.month.high`/`low`, both start/end dates). Added `assetDetailHtml()` (the full two-column layout) and switched `renderDetail()` to use it in asset mode, keeping the compact `assetColumnHtml()` for home mode only. Verified the asset-mode detail panel now renders identically to the source's, field-for-field.

### Bug fix: pre-existing `.combined-wrap` gap on `cad.html`, `chf.html`, `eur.html` (found via user report, unrelated to Profiling)

Found while investigating a user report that `eur.html`'s Seasonals accordion stayed visible underneath the Profiling panel instead of hiding when another tab was active. Root cause: these three pages (out of all 97) used an older, divergent HTML template — the combined accordion table sat inside a plain `<div class="section">` with no `.combined-wrap` wrapper, so `ui.js`'s `markPanel(combinedWrap, 'seasonals')` had nothing to mark (`combinedWrap` was `null`), and the accordion never received `data-kpt-panel` at all. This is a **pre-existing bug that predates Profiling entirely** — it would have left the Seasonals accordion visible under every tab (Trend, Price, Macro, etc.), not just Profiling; it just became obvious once Profiling's content appeared directly beneath the un-hidden accordion. The same template also duplicated the "← All Assets" back-link (once in `.topbar`, once unstyled inside a `.header-inner` wrapper) and, as a side effect of the missing `.combined-wrap`, silently dropped the month quick-jump bar (`buildQuickJump()` in `accordion.js` also targets `.combined-wrap` to find its insertion point) and the secondary TF sub-tabs.

Fixed all three pages to match the standard template: accordion table wrapped in `.combined-wrap`, `.divider` added after it (before the AI panel, matching every other page), and the redundant `.header-inner`/duplicate back-link removed. Verified via automated check across all 97 pages that `.combined-wrap` is now present everywhere, and via Playwright that `eur.html`'s accordion now correctly toggles `display: none`/`block` when switching tabs (including switching back to Seasonals), that the month quick-jump bar and TF sub-tabs now render, and that the accordion's 84 month/week rows are unaffected.

### Correction: Macro tab's Investing.com embed was NOT actually broken — reverted

An earlier pass in this same v1.7 branch replaced the Macro tab's Investing.com iframe with a permanent "unavailable" fallback, based on a **headless** Playwright check that got HTTP 403 + `X-Frame-Options: sameorigin` even on the live deployed domain. That diagnosis was wrong: user testing with a real browser confirmed the embed loads correctly on `kpt-seasonals.netlify.app` — the 403 was almost certainly Investing.com's bot-detection rejecting the automated/headless traffic itself, not a real embedding block. The fallback has been fully reverted; `js/macro.js` is back to its original iframe-based implementation, and the associated `.macro-embed-fallback` CSS was removed.

The real, narrower issue: the embed does **not** load when testing via Live Server on `127.0.0.1` — most likely because Investing.com's free widget requires the parent domain to be registered with them, and localhost never would be. This is a local-testing-only caveat, not a bug, and is now documented as such in `ARCHITECTURE.md` and `USER_GUIDE.md` rather than "fixed" in code. Lesson for future automated verification on this project: a headless-browser check that fails against a live third-party embed is not sufficient evidence the embed is actually broken for real users — confirm with a real browser against the live domain before concluding a working feature needs replacing.

### Verified

All 4 in-scope pages render the Profiling tab (stat tiles, 4 range-distribution charts, 2 time-of-extreme heatmaps, 8 profile cards) with a clean console; 3 out-of-scope pages (`aud.html`, `xau.html`, `fx-audusd.html`) correctly show no Profiling tab with no regressions; `profiling-calendar/index.html` (both modes, including all-asset back-links) and `profiling-profiles/detail.html` render and are interactive (day click, nav pills, candlestick charts) with a clean console, verified via a full click-through chain (tab → calendar → day → profile detail → nav pill → back to index), not just direct navigation to each destination; existing `kpt-sub-{id}` localStorage persistence confirmed unaffected by the `ui.js` tabs-array change; `js/macro.js` confirmed reverted to its original, working implementation.

### Files Changed
- `js/profiling.js`, `js/profiling-charts.js`, `js/profiling-calendar.js`, `js/profiling-profile-detail.js` — created
- `js/ui.js` — Profiling tab added to `tabs` array
- `js/macro.js` — unchanged (a fallback was added and then reverted within this same release — see the correction above)
- `css/dashboard.css` — 7 new CSS variables + full `.kptp-` styles block added
- `scripts/sync_profiling_data.js` — created
- `data/profiling/` — created (gbpusd.js, eurusd.js, profile-examples/, calendar/, manifest.js)
- `profiling-calendar/index.html`, `profiling-profiles/detail.html` — created
- `assets/gbp.html`, `assets/fx-gbpusd.html`, `assets/eur.html`, `assets/fx-eurusd.html` — 4 script tags added before `ui.js`
- `docs/ARCHITECTURE.md`, `docs/CONTRIBUTING.md`, `docs/USER_GUIDE.md`, `scripts/README.md`, `docs/MARKET_PROFILING_INTEGRATION.md` — updated

---

## v1.6.2 — June 2026
**Deployment & Hosting — Netlify migration, Netlify bug fixes**

### Summary

Migrated hosting from GitHub Pages (unavailable on private repos) to Netlify free tier. Fixed two production bugs exposed by the Netlify environment: signal injection failing due to Pretty URLs rewriting hrefs, and the Trend tab NOW badge wrapping caused by the scrollbar narrowing the viewport.

---

### Deployment

- **Netlify hosting** — Dashboard now live at `https://kpt-seasonals.netlify.app/`. Netlify was chosen over GitHub Pages (requires public repo on free plan) and Cloudflare Pages (Workers UI confusion). Netlify free tier supports private GitHub repos and auto-deploys on push within ~60 seconds.

### `index.html` — Signal Injection Regex

- **Netlify Pretty URLs compatibility** — Netlify's Pretty URLs feature rewrites `href="assets/aud.html"` to `href="/assets/aud"` in the served HTML, stripping the `.html` extension and making the path absolute. The signal injection regex `/assets\/(.+)\.html/` failed to match. Fixed to `/assets\/([^./?#]+)/` which handles both the local `assets/aud.html` format and the Netlify `/assets/aud` format.

### `css/dashboard.css` — Trend Tab Layout

- **sc-header flex-wrap fix** — The NOW badge in the Trend tab header was wrapping to a second line on Netlify, overlapping the "How to Read This" section. Root cause: `flex-wrap: wrap` on `.sc-header` combined with Netlify pages having a vertical scrollbar (~17px narrower than the local `file://` view). Fixed with `flex-wrap: nowrap` on `.sc-header` and `min-width: 0` on `.sc-header-left` to prevent the left column from expanding beyond available width.

---

## v1.6 — June 2026
**Polish & Tooling — Project structure, new docs, UI improvements, code fixes**

### Summary

Refinement release with no new data features. Improves maintainability (scripts/ folder, three new reference documents), fixes the Gemini provider label, and adds five user-facing improvements: index signal filter, AI cache clear button, broker timezone selector, ⓘ tooltips on session cards, and a single-tab print mode.

---

### Project Structure

- **`scripts/` folder** — Moved all four patch scripts (`patch_add_backtest.js`, `patch_add_intraday.js`, `patch_add_macro.js`, `patch_add_seasonal_chart.js`) from project root to `scripts/`. Root now contains only `index.html`, `assets/`, `css/`, `js/`, `data/`, `docs/`, and `scripts/`.
- **`scripts/README.md`** — New. Documents all patch and generator scripts: purpose, run command, status (one-shot vs maintenance), and instructions for writing new patch scripts.

### New Documentation

- **`docs/DATA_DICTIONARY.md`** — Complete field-by-field reference for `ASSET_CONFIG` and `MONTHS[]`. Covers all field names, types, allowed values, and which JS files consume each field. Especially clarifies the frequently-confused `ltKey`/`ltSigKey`/`sLt`/`sigLt` variants and the `com` field parsing convention used by `intraday.js`.
- **`docs/CONTRIBUTING.md`** — Single authoritative add-an-asset checklist. Covers new futures assets, FX pairs, updating existing data, editing shared JS, and adding new tabs. Replaces guidance previously spread across SKILL.md and ARCHITECTURE.md.
- **`docs/USER_GUIDE.md`** — End-user guide (no coding required). Covers all seven tabs, CSV upload steps, AI provider setup (Claude/Gemini/Ollama), and how to interpret all outputs (Win Rate heatmap, By Session/DoW cards, Trend curve, AI VERDICT block).

### `js/api.js` — AI Analysis Tab

- **Gemini label updated** — Provider button and all display labels changed from "Gemini Flash" → "Gemini 2.0 Flash" to match the current model (`gemini-2.0-flash` model string was already correct in v1.5).
- **AI cache clear button** — When a cached result is loaded on page open, a bar now appears above the output showing "Cached result for this week" and a "✕ Clear & re-run" button. Clicking clears `localStorage` for the current cache key and immediately re-runs analysis. Fixes the problem where new CSV uploads wouldn't be reflected until the weekly cache expired. CSS: `.ai-cache-bar`, `.ai-cache-note`, `.ai-cache-clear-btn`.

### `js/intraday.js` — Sessions Tab

- **Broker timezone selector** — New UTC offset dropdown (UTC+0 / UTC+1 / UTC+2 / UTC+3) added below the upload area. Default remains UTC+2 (EET). Stored per asset as `kpt-tz-{id}`. Changing the offset clears the cached stats and prompts re-upload, since the hour normalisation changes. Session defs remain in EET; raw hours from the CSV are shifted by `(rawHour - (offset - 2) + 24) % 24` to normalise before stat accumulation.
- **ⓘ tooltips on session/DoW count labels** — "N / M sessions" and "N / M days" labels now include a hoverable ⓘ icon with explanatory tooltip text. CSS: `.idt-count-tip`.

### `js/tradingview.js` — Price Tab

- **`tvSymbol` ASSET_CONFIG override** — `tradingview.js` now checks `ASSET_CONFIG.tvSymbol` before looking up the built-in 97-entry symbol table. Set this field in any data file to override the default symbol without editing the shared JS file (e.g. to use a CFD ticker or a different contract).

### `js/ui.js` — Shared UI

- **"Print this tab" button** — New button added to topbar. Clicking adds `.print-single-tab` to `<body>`, calls `window.print()`, then removes the class after 1 second. When `.print-single-tab` is active, `@media print` shows only the active panel (`.kpt-panel-active`) instead of all seven. The existing browser Print (Ctrl+P) without the button continues to print all panels.

### `index.html` — Landing Page

- **Signal filter bar** — New filter row added between the search bar and sticky nav: "All / Bull / Bear / Other" buttons. On click, hides `.asset-card.status-complete` elements whose `data-sig-type` doesn't match the selection. Requires `SIGNALS_MANIFEST` to be loaded (signals manifest provides the type per card). CSS: `.signal-filter-bar`, `.sig-filter-btn`, `.signal-filter-count`.
- **"Signal data as of" timestamp** — When `SIGNALS_GENERATED` is defined in `signals_manifest.js`, a formatted date note appears at the bottom of the This Week panel. Makes manifest staleness visible without opening developer tools.
- **`data/signals_manifest.js`** — Added `const SIGNALS_GENERATED = '…'` variable (previously only a comment). `index.html` reads this to display the freshness note.

### `css/dashboard.css` — Shared Styles

New CSS additions in v1.6:
- `.ai-cache-bar`, `.ai-cache-note`, `.ai-cache-clear-btn` — AI cache indicator bar
- `.idt-count-tip` — Session/DoW ⓘ tooltip icon
- `.idt-tz-row`, `.idt-tz-label`, `.idt-tz-select`, `.idt-tz-note` — Broker timezone selector row
- `.topbar-print-btn` — Print this tab button
- `.signal-filter-bar`, `.sig-filter-btn` variants, `.signal-filter-count` — Index filter bar
- `.asset-card.sig-hidden` — Hidden state for signal-filtered cards
- `body.print-single-tab [data-kpt-panel]` / `.kpt-panel-active` — Single-tab print mode

---

## v1.5 — June 2026
**Phase 2.5 — Sessions Panel · Phase 5 — Multi-Provider AI Synthesis**

### Summary

Two major feature additions. Phase 2.5 adds the Sessions intraday bias tool — upload an H1 or H4 MT5 CSV to see average return by hour of day, by trading session, and by day of week, all filterable by the current seasonal signal. Phase 5 upgrades the Analysis tab's AI engine from a Claude-only button to a provider-agnostic panel supporting Claude Sonnet, Gemini Flash, and Ollama local models, with enriched context drawn from backtest and intraday data.

---

### New: `js/intraday.js` — Sessions (Intraday Bias) Panel

New shared JavaScript file (~600 lines), loaded on all 97 asset pages between `seasonal-chart.js` and `ui.js`. Self-contained IIFE.

**Panel injection**
- Creates `<section data-kpt-panel="intraday">` and inserts it before `.footnote`
- `ui.js` discovers it and adds a Sessions tab — no HTML changes required

**CSV format**
- Expects MT5 H1 or H4 tab-separated export with a TIME column (`YYYY.MM.DD HH:MM`)
- Auto-detects timeframe: H1 (24-bucket) vs H4 (6-bucket: 00, 04, 08, 12, 16, 20)
- Same separator auto-detection and date validation as `backtest.js`

**Signal filter**
- Filter buttons: All bars / Bull weeks / Bear weeks / Chop weeks
- Reads `MONTHS[month].weeks[wkSlot].com` to classify each bar by seasonal context
- Allows isolating intraday patterns within specific seasonal conditions

**Three result sections**
1. **By Hour** — 24-bar (H1) or 6-bar (H4) Chart.js bar chart of average return per hour; green/red by sign; session shading overlay matches session colours
2. **By Session** — stat cards for each session zone; shows avg return, direction arrow, and occurrence count (`N / total bars`)
3. **By Day of Week** — stat cards for Mon–Fri; avg return, direction arrow, occurrence count (`N / total bars`)

**Session definitions (UTC+2 broker offset)**
All hours are in broker server time (EET: UTC+2 winter / UTC+3 summer):

| Session | H1 hours (broker) | UTC equivalent |
|---------|-------------------|----------------|
| Late NY | 00–01 | 22–23 UTC |
| Asian | 02–09 | 00–07 UTC |
| London | 10–14 | 08–12 UTC |
| L/NY Overlap | 15–18 | 13–16 UTC |
| New York | 19–22 | 17–20 UTC |
| After-hours | 23 | 21 UTC |

H4 maps to: `00` (Late NY/Sydney), `04–08` (Asian), `12` (London), `16` (L/NY Overlap), `20` (New York).

**`schemaVer: 2` cache invalidation**
- Stored stats objects include `schemaVer: 2`; `sessionDefs` is NOT stored (prevents stale session boundaries surviving across code updates)
- On page load, cache is rejected unless `schemaVer === 2 && meta && groups && hourList` — old-format cache is discarded silently
- `renderChart()` and `renderSessions()` always derive session defs from the live `SESSIONS_H1` / `SESSIONS_H4` variables based on `stats.tfType`

**`window.kptIdtRefresh()`**
- Called by `ui.js` on Sessions tab activation
- Triggers Chart.js `resize()` so the canvas renders at the correct size after `display:none`

**localStorage key:** `kpt-idt-{assetId}` (schemaVer 2 format)

---

### Updated: `js/ui.js` — Tab Rename + Sessions Tab

All tab labels renamed for clarity. Tabs array now has seven entries:

```javascript
{ id: 'seasonals', label: 'Seasonals' }
{ id: 'scurve',    label: 'Trend'     }  ← was 'Curve'
{ id: 'chart',     label: 'Price'     }  ← was 'Chart'
{ id: 'backtest',  label: 'History'   }  ← was 'Backtest'
{ id: 'intraday',  label: 'Sessions'  }  ← NEW (Phase 2.5)
{ id: 'macro',     label: 'Macro'     }
{ id: 'analysis',  label: 'Analysis'  }
```

Panel IDs are unchanged — only display labels changed. `activateTab` logic is unaffected.

**Updated script load order (all 97 asset pages — now 9 scripts):**
```html
<script src="../data/[asset].js"></script>
<script src="../js/accordion.js" defer></script>
<script src="../js/api.js" defer></script>
<script src="../js/tradingview.js" defer></script>
<script src="../js/backtest.js" defer></script>
<script src="../js/macro.js" defer></script>
<script src="../js/seasonal-chart.js" defer></script>
<script src="../js/intraday.js" defer></script>    ← NEW
<script src="../js/ui.js" defer></script>
```

---

### Bug Fix: Session chips and shading used stale cached definitions after timezone correction

**Problem:** `sessionDefs` was serialised into the stats object stored in localStorage. After the UTC+2 timezone correction, users with a previously uploaded CSV saw old session boundaries in chart shading and legend chips — the cache was restored and `stats.sessionDefs` (the stale cached copy) was used instead of the updated `SESSIONS_H1`/`SESSIONS_H4` constants.

**Fix:** `sessionDefs` removed from the stored stats object; `schemaVer: 2` added as a discriminator; cache restore guard rejects any object without `schemaVer === 2`; render functions always derive session defs from live module-level variables.

---

### Phase 5 — `js/api.js` Complete Rewrite

`api.js` rebuilt from scratch. Replaces the single-provider Claude button with a provider-agnostic multi-model AI panel.

**Three providers**

| Provider | Model | API |
|----------|-------|-----|
| Claude | claude-sonnet-4-20250514 | Anthropic SSE (`/v1/messages`) |
| Gemini | gemini-1.5-flash | Google SSE (`streamGenerateContent?alt=sse`) |
| Ollama | user-configured | Local NDJSON (`/api/generate`) |

Config stored in `localStorage` under `kpt-cfg-{provider}-key`, `kpt-cfg-ollama-url`, `kpt-cfg-ollama-model`. Settings panel toggled via a gear icon — no page reload required.

**Four context layers**

Each AI call gathers up to four layers before building the prompt:

1. **Seasonal** (always) — `MONTHS[]` week-level signals for the full year
2. **Curve** (always) — computed from `MONTHS[]`; current 48-point cumulative value, 4-week trend direction, position as % of annual range
3. **History** (if available) — reads `kpt-bt-{id}` from localStorage; overall win rate, top/bottom months by accuracy and avg return
4. **Sessions** (if available, schemaVer 2 only) — reads `kpt-idt-{id}`; best/worst session and day of week

**Context bar chips** — displayed below the provider row; green tick (✓) if data is present, hollow circle (○) if not:
```
✓ Seasonal   ✓ Curve   ✓ History   ○ Sessions
```

**Structured verdict output**
The prompt forces the model to produce:
- `## VERDICT: [LONG / SHORT / NEUTRAL / WAIT]` heading
- 5-row data table (current position, 4-wk trend, backtest win rate, best session, key risk)
- 3-month outlook paragraph
- 3 trade note bullets

**AI cache key:** `kpt-ai-{id}-{provider}-{year}-w{week}` — includes provider so switching models produces a fresh analysis.

**Dynamic panel headings**
`_updatePanelHeadings(prov)` overwrites two elements at runtime on every provider switch:
- `.section-label` preceding `.ai-panel` → `"Seasonal Bias Analysis"` (preserving the coloured dot span)
- `.ai-panel .ai-label` → `_providerLabel(prov) + ' · Live Analysis'`

`_providerLabel()` returns: `"Claude Sonnet"` / `"Gemini Flash"` / `"Ollama · {model}"`. The hardcoded heading text in all 97 HTML files is overridden at runtime — no HTML patch required.

**Streaming:**
- Claude + Gemini: shared `_readSSE(resp, output, extractor)` reader
- Ollama: NDJSON line-by-line via `_callOllama()`
- Output rendered as Markdown on completion via dynamically loaded `marked.js`

---

### New: `start_kpt.bat` — Local Server Launcher

Starts Ollama with browser CORS enabled, then starts Docker Desktop and Odysseus containers:

```batch
start "Ollama Server" /min cmd /c "set OLLAMA_ORIGINS=* && ollama serve"
```

**Ollama CORS requirement:** `OLLAMA_ORIGINS=*` must be set in the same `cmd` process as `ollama serve` — both commands joined with `&&` inside a single `cmd /c "..."` call. Setting the variable in a parent shell then calling `ollama serve` separately does not inherit the variable.

**Ollama URL:** `http://localhost:11434` — no `/v1` suffix (endpoint is `/api/generate`, not `/v1/api/generate`).

---

### CSS Additions (`css/dashboard.css`)

**Phase 2.5 — Sessions panel:**
`.idt-panel`, `.idt-header`, `.idt-header-left`, `.idt-label`, `.idt-sub`, `.idt-signal-chip`, `.idt-filter-row`, `.idt-filter-btn` (+ `.active`), `.idt-chart-wrap`, `.idt-section-title`, `.idt-cards`, `.idt-card`, `.idt-card-label`, `.idt-card-sublabel`, `.idt-card-val`, `.idt-card-arrow`, `.idt-card-count` (9px, `#4a5568`)

**Phase 5 — AI provider panel:**
`.ai-provider-row`, `.ai-provider-label`, `.ai-provider-btns`, `.ai-provider-btn` (+ `.active`), `.ai-settings-toggle`, `.ai-settings-panel`, `.ai-settings-grid`, `.ai-sett-label`, `.ai-sett-input`, `.ai-sett-footer`, `.ai-sett-save`, `.ai-sett-saved`, `.ai-sett-note`, `.ai-ctx-bar`, `.ai-ctx-label`, `.ai-ctx-chip` (+ `.ai-ctx-ok`, `.ai-ctx-na`), `.ai-output` markdown styles (`h2`, `table`, `th`, `td`, `td:first-child`, `strong`, `em`, `p`, `ul`, `li`)

---

### Files Changed
- `js/intraday.js` — created (~600 lines)
- `js/ui.js` — Sessions tab added; Trend / Price / History labels applied
- `js/api.js` — completely rewritten for Phase 5 multi-provider support
- `css/dashboard.css` — Sessions panel styles + Phase 5 AI panel styles added
- `assets/*.html` (all 97) — `intraday.js` script tag inserted
- `start_kpt.bat` — created

---

## v1.4 — June 2026
**Phase 4 — Seasonal Curve Tab**

### Summary

Adds a Curve tab to all 97 asset pages — a Chart.js line chart that visualises the full seasonal year as a cumulative directional-bias curve derived from `MONTHS[]` data. Shows three timeframe lines (5-YR / 15-YR / LT) plus a Combined line, monthly background shading, a horizontal zero baseline, and an amber dashed marker at today's position. No external data source or API key required.

---

### New: `js/seasonal-chart.js`

New shared JavaScript file (~230 lines), loaded on all 97 asset pages between `macro.js` and `ui.js`. Self-contained IIFE.

**Curve generation**
- Converts week-level signals to ±1 (bull/long = +1, bear/short = −1, chop/flip = 0) and accumulates them across all 48 weekly slots
- Produces four 48-point datasets: 5-YR (pink), 15-YR (brown), LT (asset accent), Combined (green)
- Reads `ASSET_CONFIG.ltKey` to select the correct long-term signal key (`s34`, `s35`, `s40`, `sLt` etc.)
- Works on all data file formats (futures with `s34/s35/s40` and forex with `sLt`)

**Panel injection**
- Creates `<section data-kpt-panel="scurve">` and inserts it before `.footnote`
- `ui.js` discovers it and adds a Curve tab — no HTML changes required

**Visual features**
- Monthly background shading: green (bull months), red (bear months), amber (chop)
- Amber dashed vertical line at today's weekly slot
- Horizontal zero baseline (dashed)
- "NOW" badge in the header showing current month/week and combined signal
- Tooltip on hover: month + week + combined signal + per-TF values
- Combined line is filled (translucent green) and rendered in front

**Chart.js**
- Loads `Chart.js 4.4.0` from cdnjs on demand (shared with `backtest.js`)
- If `window.Chart` already exists (e.g. Backtest tab was opened first), renders immediately without a second network request

---

### Updated: `js/ui.js` — Curve Tab Added

Tabs array now has six entries:
```javascript
{ id: 'seasonals', label: 'Seasonals' }
{ id: 'backtest',  label: 'Backtest'  }
{ id: 'chart',     label: 'Chart'     }
{ id: 'scurve',    label: 'Curve'     }  ← NEW
{ id: 'macro',     label: 'Macro'     }
{ id: 'analysis',  label: 'Analysis'  }
```

---

### New: `patch_add_seasonal_chart.js`

One-shot Node.js patch script. Inserts `<script src="../js/seasonal-chart.js" defer></script>` before `<script src="../js/ui.js" defer></script>` in all 97 HTML files. Result: 97 patched, 0 skipped, 0 errors.

**Updated script load order (all 97 asset pages — now 8 scripts):**
```html
<script src="../data/[asset].js"></script>
<script src="../js/accordion.js" defer></script>
<script src="../js/api.js" defer></script>
<script src="../js/tradingview.js" defer></script>
<script src="../js/backtest.js" defer></script>
<script src="../js/macro.js" defer></script>
<script src="../js/seasonal-chart.js" defer></script>    ← NEW
<script src="../js/ui.js" defer></script>
```

### CSS Additions (`css/dashboard.css`)

- `.scurve-panel` — panel container (matching `.bt-panel` surface/border style)
- `.sc-header` / `.sc-header-left` — flex header row
- `.sc-label` — Bebas Neue title ("SEASONAL CURVE")
- `.sc-sub` — IBM Plex Mono subtitle with asset name
- `.sc-now` / `.sc-now-dot` / `.sc-now-text` / `.sc-now-signal` — amber "NOW" badge showing current month/week and combined signal
- `.sc-chart-wrap` — 250px high canvas container
- `.sc-footer` — bottom note explaining curve interpretation

### Files Changed
- `js/seasonal-chart.js` — created (~230 lines)
- `js/ui.js` — Curve tab added
- `patch_add_seasonal_chart.js` — created (one-shot, can be deleted)
- `css/dashboard.css` — seasonal curve styles added (~80 lines)
- `assets/*.html` (all 97) — `seasonal-chart.js` script tag inserted

---

## v1.3 — June 2026
**Phase 3 Complete — Macro Events Tab · SFE/LIFFE Data Files · Investing.com Calendar Embed**

### Summary

Adds a Macro tab to all 97 asset pages — an Investing.com economic calendar embed filtered by the currencies relevant to each asset, with a two-column layout pairing the calendar with a collapsible asset-class-specific interpretation guide. Also completes the five remaining SFE/LIFFE interest rates data files with correct seasonal analysis.

---

### New: `js/macro.js`

New shared JavaScript file (~200 lines), loaded on all 97 asset pages between `backtest.js` and `ui.js`. Self-contained IIFE. Key components:

**Panel injection**
- Creates `<section data-kpt-panel="macro">` and inserts it before `.footnote`
- `ui.js` discovers it and adds a Macro tab automatically — no HTML changes needed

**Currency and country mapping**
- `FF_CURRENCIES` — maps all 97 asset IDs to relevant currency arrays (e.g. `longgilt → ['GBP']`, `fx-audusd → ['AUD','USD']`)
- `CC` — maps currencies to Investing.com country ID strings (e.g. `EUR → '17,26,22'` for Eurozone + Germany + France)
- Deduplicates country IDs so multi-currency assets don't repeat countries

**Investing.com embed**
- Source: `sslecal2.investing.com` (Investing.com's free webmaster calendar widget)
- URL parameters: `columns`, `features=datepicker,timezone,filters`, `countries` (per-asset), `importance=2,3` (medium + high default), `calType=week`, `timeZone=20` (UTC), `lang=1`
- `filters` feature exposes an in-widget importance toggle — user can switch between All / High / Medium / Low without leaving the page
- ForexFactory was the original target but blocks embedding via X-Frame-Options

**Two-column layout**
- Left column: Investing.com iframe (680px fixed, CSS `filter: invert(1) hue-rotate(180deg)` for pseudo dark-mode)
- Right column: collapsible guide panel (flex: 1, fills remaining space)

**Currency chips + external links**
- Currency chips displayed in the header (e.g. `GBP`, `AUD · USD`)
- Two external link buttons: `Investing.com ↗` and `ForexFactory ↗`
- Source note: `Default: Medium & High · use filter bar to adjust · allow ~30 sec to load`

**Asset-class guide (collapsible, open by default)**
- `ASSET_CLASS` — maps all 97 asset IDs to one of 6 categories: `fx`, `rates`, `indices`, `metals`, `energy`, `ags`
- `GUIDE` — six category entries, each with 3 sections: key events, how to interpret the data, and a category-specific note (timing / macro regimes / further research)
- Impact legend (HIGH / MED / LOW badges with plain-English descriptions) appears at the top of every guide
- Guide content is asset-class aware: FX assets see central bank / CPI / employment guidance; rates assets see bond-specific inversion logic; energy assets see EIA inventory interpretation; agricultural assets note the USDA WASDE report; etc.
- `<details open>` with rotating `▶` arrow; collapses to a single summary row

---

### New: `patch_add_macro.js`

One-shot Node.js script that inserted `<script src="../js/macro.js" defer></script>` before `<script src="../js/ui.js" defer></script>` in all 97 HTML files. Result: 97 patched, 0 skipped.

**Updated script load order (all 97 asset pages — now 7 scripts):**
```html
<script src="../data/[asset].js"></script>
<script src="../js/accordion.js" defer></script>
<script src="../js/api.js" defer></script>
<script src="../js/tradingview.js" defer></script>
<script src="../js/backtest.js" defer></script>
<script src="../js/macro.js" defer></script>    ← NEW
<script src="../js/ui.js" defer></script>
```

`macro.js` must load before `ui.js` so the injected `[data-kpt-panel="macro"]` element exists when `ui.js` scans for panels.

---

### Updated: `js/ui.js` — Macro Tab Added

The tabs array now has five entries:
```javascript
{ id: 'seasonals', label: 'Seasonals' }
{ id: 'backtest',  label: 'Backtest'  }
{ id: 'chart',     label: 'Chart'     }
{ id: 'macro',     label: 'Macro'     }  ← NEW
{ id: 'analysis',  label: 'Analysis'  }
```

---

### CSS Additions (`css/dashboard.css`)

- `.macro-panel` — top-level section container
- `.macro-header` / `.macro-header-left` / `.macro-links` — header row with label, currency chips, and external link buttons
- `.macro-label` / `.macro-source` — monospace label and source note text
- `.macro-currency-chip` — light-blue chip badges (e.g. GBP, AUD)
- `.macro-open-btn` — external link buttons (Investing.com / ForexFactory)
- `.macro-body` — flex container for two-column layout
- `.macro-embed-outer` — left column (flex: 0 0 680px, height: 560px, white background for iframe)
- `.macro-iframe` — iframe with `filter: invert(1) hue-rotate(180deg)` for pseudo dark-mode
- `.macro-guide` — right column (flex: 1, min-width: 0)
- `.macro-guide-toggle` — `<details>` with rotating `▶` summary arrow (same pattern as `.bt-desc-toggle`)
- `.macro-guide-section` / `.macro-guide-heading` — content block and heading
- `.macro-guide-section--impact` — impact legend section with bottom border separator
- `.macro-impact-row` / `.macro-imp` / `.macro-imp-high/med/low` / `.macro-imp-desc` — impact level rows with coloured badges
- `.macro-guide-body-text` / `.macro-guide-list` / `.macro-guide-item` — body text and bulleted list styles
- `@media (max-width: 1100px)` — stacks columns vertically on narrow screens

---

### SFE/LIFFE Data Files Completed

Five interest rates data files rewritten with correct seasonal analysis from Moore Research Center chart images:

**`data/austbonds10.js`** — 10-YR Aus T-Bonds (SFE), 36-YR (1984–2019)
- January starts at LOWS (~5–10 on 36-YR) — NOT the year-end highs shown in the legend
- Bull windows: Feb, Apr, May, Jul (★★★★★), Aug (★★★★★ — year peak)
- Bear windows: Mar (annual trough), Jun, Sep FLIP (36-YR peaks ~100)
- Key insight: legend values at "02 Jan 2020" represent the YEAR-END cursor position, not January starting levels

**`data/austbonds3.js`** — 3-YR Aus T-Bonds (SFE), 33-YR (1987–2019)
- Very similar structure to 10-YR but May is stronger (★★★★★ vs ★★★★) and 5-YR more volatile
- Sep reversal sharper on shorter TFs

**`data/austbills3m.js`** — 3-Mth Aus T-Bills (SFE), 40-YR (1980–2019)
- Inverted structure vs T-Bonds: 40-YR starts LOW, 15-YR/5-YR start HIGH in January
- Trough: Feb–Mar (15-YR/5-YR crash to near 0); Peak: Jun (★★★★★, 15-YR ~90–95)
- Rare second convergence in October (all TFs at ~90–100 simultaneously)
- Jul–Sep complex TF divergence: 40-YR still rising while shorter TFs diverge

**`data/longgilt.js`** — Long Gilt (LIFFE), 38-YR (1982–2019)
- Defining feature: ALL three TFs crash to near 0 simultaneously in June (★★★★★)
- July is the mirror — massive surge from near 0, all TFs (★★★★★)
- August: all TFs near 95–100 (annual peak)
- December: extreme TF divergence — 38-YR near 100, 5-YR at ~30–35

**`data/shortsterling.js`** — 3-Mth Short Sterling (LIFFE), 38-YR (1982–2019)
- Most complex chart: extreme TF divergences throughout (15-YR starts Jan at ~75–80 while 38-YR is at ~25)
- Two devastating bear months: March (all crash, ★★★★★) and September (15-YR/5-YR crash from ~90 to near 0, ★★★★★)
- May: all TFs converge at ~90–100 (★★★★★ — peak month)
- June: intra-month FLIP — all high early, then 15-YR/5-YR crash while 38-YR holds

**TradingView symbols for SFE/LIFFE assets** remain as original exchange symbols (`ASX:XT1!`, `ICEEUR:R1!`, etc.) — free proxy alternatives were investigated but equally paywalled; exchange symbols at least show historical data.

---

### Files Changed
- `js/macro.js` — created (~200 lines)
- `js/ui.js` — Macro tab added to tabs array
- `patch_add_macro.js` — created (one-shot, can be deleted)
- `css/dashboard.css` — macro panel styles added (~120 lines)
- `assets/*.html` (all 97) — `macro.js` script tag inserted by patch script
- `data/austbonds10.js` — completely rewritten with correct chart analysis
- `data/austbonds3.js` — completely rewritten with correct chart analysis
- `data/austbills3m.js` — completely rewritten with correct chart analysis
- `data/longgilt.js` — completely rewritten with correct chart analysis
- `data/shortsterling.js` — completely rewritten with correct chart analysis

---

## v1.2 — June 2026
**Phase 2 Complete — CSV Backtest Tool · Three-Section Results Panel · UI Polish**

### Summary

Adds the Price Backtest tab to all 97 asset pages — a fully client-side CSV analysis engine that validates the seasonal model against real MT5 price history. Results are presented in three ordered sections: Raw Price Tendency (model-agnostic baseline), Win Rate by Period (model accuracy), and Average Weekly Return by Month (return magnitude). All processing runs in the browser with no backend required.

---

### New: `js/backtest.js`

New shared JavaScript file (~330 lines), loaded on all 97 asset pages immediately before `ui.js`. Self-contained IIFE. Key components:

**Panel injection**
- Creates a `<section id="backtest-section" data-kpt-panel="backtest">` and inserts it before `.footnote` (fallback: appends to `.container`)
- `ui.js` discovers this element at DOM-scan time and automatically adds a Backtest tab to the primary tab bar — no HTML changes needed

**CSV parser (`parseCSV`)**
- Auto-detects separator (tab or comma)
- Auto-detects D1 vs sub-daily format by checking whether `cols[1]` looks like a time value (`HH:MM`)
- Sub-daily files (M1, H1, H4) are automatically aggregated to one daily close per calendar day — the parser is timeframe-agnostic
- Date format: `YYYY.MM.DD` (MT5 default) or `YYYY-MM-DD`
- Validates year range (1970–2100) and rejects non-numeric rows

**Signal extractor (`getSignal`)**
- Reads `MONTHS[monthIdx].weeks[wkIdx].com` — the existing week-level combined bias text
- Strips star characters (`★☆`) then checks if the string begins with `LONG`/`BUY` (→ `bull`) or `SHORT`/`SELL` (→ `bear`); everything else → `chop`

**Stats engine (`computeStats`)**
- Builds `weeklyCloses` map keyed `"year-month-wkSlot"` → last close of that week
- Week-slot mapping: days 1–7 → slot 0, 8–14 → slot 1, 15–21 → slot 2, 22+ → slot 3
- `prevKey()` helper wraps correctly across month and year boundaries (Dec Wk4 → Nov Wk3)
- Builds three outputs from a single weekly-return loop:
  - `rawTendency[m][w]` — `{ up, total, upPct }` (model-agnostic; all 48 cells always populated)
  - `matrix[m][w]` — `{ signal, wins, total, winRate, avgReturn }` (only bull/bear cells have win counts)
  - `monthlyAvg[m]` — average weekly return across all four week-slots per month

**Render layer**
- `renderRawHeatmap(rawTendency)` — 12×4 table; green ≥60%, amber 40–59%, red ≤39%; ▲/▼ arrow per cell; tooltip shows raw count
- `renderHeatmap(matrix)` — 12×4 table; green ≥65%, amber 50–64%, red <50%; `~` for Chop/Flip; tooltip shows wins/total
- `renderChart(monthlyAvg)` — Chart.js 4.4.0 bar chart loaded dynamically from cdnjs on first use; green/red bars by sign; previous instance destroyed before redraw

**localStorage persistence**
- Key: `kpt-bt-{assetId}` — stores the computed `stats` object (not raw bars)
- On page load: reads stored stats and calls `displayResults()` if valid — CSV does not need to be re-uploaded
- On upload: overwrites stored stats with freshly computed values
- Includes `rawTendency` in the stored object (validated on restore with `stats.rawTendency && stats.matrix && stats.yearRange` guard)

**Tab-activation refresh hook**
- `window.kptBtRefresh()` — called by `ui.js` when the Backtest tab is activated
- Calls `btChartInstance.resize()` to fix Chart.js canvas sizing after the panel becomes visible from `display:none`

---

### Three-Section Results Layout

Results are displayed in this fixed order after a CSV is uploaded (or restored from localStorage):

**1. Raw Price Tendency**
What price actually did, independent of any model signal. For each (month, week) cell, counts how many years out of the total had positive weekly return. Threshold: green ≥60%, amber 40–59%, red ≤39%. All 48 cells always show a value (no model dependency).

**2. Win Rate by Period**
How often the seasonal signal was directionally correct. Only bull/bear cells have win rates — chop/flip cells show `~`. Threshold: green ≥65% (stricter than Raw Tendency because validating a model requires a higher bar than observing raw frequency). Tooltip shows `N / total years correct`.

**3. Average Weekly Return by Month (%)**
Average magnitude of weekly price moves per calendar month across all years. Bar chart; green = positive average drift, red = negative. Used in conjunction with Win Rate: high win rate + tall bar = both reliable and meaningful.

Each section has a collapsible "How to read this" toggle (`<details>`) that is closed by default. Win Rate's toggle also contains the threshold-difference explanation (65% vs 60%).

---

### New: MT5 Export Guide (upload screen)

The upload screen now shows a numbered 7-step guide explaining how to export a D1 CSV from MetaTrader 5:
1. Open MetaTrader 5
2. View → Symbols
3. Go to the Bars tab
4. Select asset / D1 / start–end date / click Request
5. Click Export Bars in the bottom toolbar
6. Save to a known location (e.g. Downloads)
7. Click Choose D1 CSV to upload

---

### New: `patch_add_backtest.js`

One-shot Node.js script that inserted `<script src="../js/backtest.js" defer></script>` before `<script src="../js/ui.js" defer></script>` in all 97 HTML files. Result: 97 patched, 0 skipped. Script preserved for future re-patching if needed.

**Updated script load order (all 97 asset pages):**
```html
<script src="../data/[asset].js"></script>
<script src="../js/accordion.js" defer></script>
<script src="../js/api.js" defer></script>
<script src="../js/tradingview.js" defer></script>
<script src="../js/backtest.js" defer></script>   ← NEW
<script src="../js/ui.js" defer></script>
```

`backtest.js` must load before `ui.js` so the injected `#backtest-section` exists in the DOM when `ui.js` scans for `[data-kpt-panel]` elements.

---

### CSS Additions (`css/dashboard.css`)

Full backtest panel styles added at end of file:

- `.bt-upload-area` — dashed-border upload state container
- `.bt-desc` / `.bt-hint` — upload screen intro and hint text
- `.bt-upload-steps` — numbered MT5 export guide; `position: absolute` step numbers avoid the flex/grid wrapping bug where `<strong>` elements become separate grid items
- `.bt-results` / `.bt-summary` / `.bt-chip` — results container and summary chips
- `.bt-section-title` — section sub-heading with inline legend
- `.bt-legend` / `.bt-leg-item` / `.bt-leg-bull/mid/bear/chop` — colour-coded heatmap legend
- `.bt-desc-toggle` / `summary` — collapsible "How to read this" using native `<details>`; `::before` triangle rotates 90° on open
- `.bt-section-desc` — interpretive paragraph text; no `max-width` (matches full table width)
- `.bt-threshold-note` — left-bordered callout explaining the 65% vs 60% threshold difference
- `.bt-heatmap-scroll` — horizontal scroll wrapper for narrow viewports
- `.bt-table` / `.bt-corner` / `.bt-row-label` / `.bt-cell` / `.bt-arrow` / `.bt-rate` — heatmap table layout
- `.bt-cell-bull/mid/bear/chop/nodata` — cell colour variants
- `.bt-chart-wrap` — Chart.js canvas container (height 260px)
- `.bt-note` — spot-vs-futures basis disclaimer
- `.bt-clear-btn` — clear uploaded data button

---

### Files Changed
- `js/backtest.js` — created (~330 lines)
- `patch_add_backtest.js` — created (one-shot, can be deleted)
- `css/dashboard.css` — backtest panel styles added
- `assets/*.html` (all 97) — `backtest.js` script tag inserted by patch script

---

## v1.1 — June 2026
**UI Layer Complete — Tab System, Sub-Tabs, Dynamic TF Tables, Topbar**

### Summary

Post-completion UI pass adding a full shared interaction layer via a new `js/ui.js` file, dynamic TF table generation for the 70 generator-built pages, and secondary timeframe sub-tabs within the Seasonals panel.

---

### New: `js/ui.js` — Shared UI Enhancements

New shared JavaScript file loaded on all 97 asset pages. Handles four independent features:

**1. Topbar — Date Chip + Prev/Next Navigation**
- Injects a live date chip (`WK N · MON YYYY`) into the topbar, computed from `new Date()`
- Injects `← Prev` / `Next →` navigation buttons for within-category asset browsing
- Derives prev/next IDs from a full `ASSET_CATEGORIES` map (97 assets across 11 categories)
- Auto-populates empty topbar titles on hand-built pages from `<h1>` text

**2. Legend Collapsible Toggle**
- Adds a Hide / Legend toggle button above the legend strip
- Collapses/expands the legend with a single click — saves screen space on mobile

**3. Primary Tab Layout — Seasonals · Chart · Analysis**
- Scans the page for `.combined-wrap`, `.ai-panel`, and `#tv-chart-section`
- Tags all discovered content elements with `data-kpt-panel` attributes (`seasonals` / `analysis` / `chart`)
- Builds a `kpt-tabs` bar and injects it before the first panel element
- Active tab shown/hidden via `.kpt-panel-active` CSS class; only tabs with content are rendered
- Falls back gracefully on pages without a given panel (e.g. FX pages without a TradingView section)

**4. Secondary TF Sub-Tabs — Combined · 5-YR · 15-YR · Long-term**
- Builds a secondary `kpt-tabs kpt-subtabs` bar within the Seasonals panel
- Four sub-tabs: Combined (green) · 5-YR (pink) · 15-YR (brown) · Long-term (asset-specific accent)
- Long-term label and accent pulled from `ASSET_CONFIG.ltLabel` / `ASSET_CONFIG.ltAccent`
- Sub-tab bar only visible when Seasonals is the active primary tab
- Selected sub-tab persisted to `localStorage` as `kpt-sub-{assetId}` — restored on next visit
- Hand-built pages (no `data-tf-section` attributes): tagged by DOM position at runtime
- **Insertion fix (v1.1):** `subBar` inserted immediately after `tabBar` (not before the "Combined Bias" section-label) — corrects an inverted visual hierarchy where secondary tabs appeared above primary tabs

---

### New: `buildTFTables()` in `accordion.js`

Dynamically generates the three individual timeframe tables (5-YR, 15-YR, Long-term) for the 70 generator-built futures pages that had no static TF tables.

- **Skip guard:** `if (document.querySelectorAll('.table-wrap').length > 0) return;` — silently skips the 27 hand-built pages that already have static tables; safe to load on all 97 pages
- **Columns:** Period | Yearly Bias | Monthly Overview | Weekly Detail | Notes — matches the hand-built AUD/GBP/etc. format exactly
- **Weekly Detail:** Rendered as a `wk-grid` of 4 `wk-cell` pill badges with directional arrows (↑ ↓ ± ⇄), matching the hand-built pages' visual system
- **`data-tf-section` tags:** `'five'` / `'fifteen'` / `'lt'` set on both the section-label and table-wrap — used by the secondary sub-tab system in `ui.js`
- **Insertion:** Injected before `#tv-chart-section` (fallback: `.footnote`), after the AI panel and divider
- **Keys:** Uses two keys per TF — `mSigKey` (month-level, e.g. `sig5`) for Yearly Bias and `wSigKey` (week-level, e.g. `s5`) for Weekly Detail

---

### New: `buildQuickJump()` in `accordion.js`

Month Quick-Jump bar — a row of 12 month buttons (Jan–Dec) inserted above the combined accordion. Clicking any month opens and scrolls to that accordion row. Current month button highlighted via `.qj-current`. Inserted via `wrap.parentElement.insertBefore(nav, wrap)` so it sits immediately above `.combined-wrap`.

---

### CSS Additions (`css/dashboard.css`)

- `.kpt-tabs` — primary tab bar; `border-bottom: 1px solid var(--border)`; active button: `border-bottom: 2px solid var(--accent-combined)` with `color` override
- `.kpt-subtabs` — secondary sub-tab bar; `margin-top: -28px` (cancels `kpt-tabs` bottom-margin so both rows sit flush); `padding-left: 8px` (subtle indent signals hierarchy)
- `.kpt-subtab-btn.active` — fallback active colour; overridden inline per TF accent by JS
- `.kpt-panel-active` — `display: block` for active panels; `[data-kpt-panel]:not(.kpt-panel-active)` hides others
- `.kpt-divider-hidden` — hides `.divider` elements when tabs are active (tabs replace visual separation)
- `.table-wrap tr.current-month` — subtle green tint + bold month name on the current calendar month row in TF tables
- `.month-quickjump` / `.qj-btn` / `.qj-current` — quick-jump bar pill buttons

---

### `.gitignore` Created

`seasonal-dashboard/.gitignore` added covering OS files (`.DS_Store`, `Thumbs.db`, `desktop.ini`), editor files (`.vscode/`, `*.swp`), and `node_modules/`.

---

### GitHub Version Control Initialised

Git repository initialised in `seasonal-dashboard/` and connected to a private GitHub remote. Deployment workflow via GitHub Desktop: stage → commit with a descriptive summary → Push origin. To revert: right-click any commit in GitHub Desktop history → Revert Changes in Commit.

---

### Files Changed
- `js/ui.js` — created (new shared UI file, 404 lines)
- `js/accordion.js` — `buildTFTables()` and `buildQuickJump()` added (file extended from 118 to 289 lines)
- `css/dashboard.css` — tab system styles, subtabs, quickjump, current-month highlight added
- `.gitignore` — created

---

## v1.0 — June 2026
**ALL ASSETS COMPLETE — 97 Dashboards Live · Dynamic Index Signals**

### Summary

Version 1.0 marks the completion of the full planned asset roster. Every futures asset across all categories has been built and verified — grains, indices, rates, softs, metals, energy, currencies, fiber, and meats. The index landing page now displays live runtime signals (BULL / BEAR / CHOP / FLIP) on every asset card, derived at page-load from each asset's seasonal data.

**Total assets live: 97** (70 futures + 27 derived FX pairs)

---

### Futures Completions (this milestone)

**Grains — 8 assets (CBOT)**
- Soybeans, Soy Meal, Soy Oil, Wheat (CBOT), Wheat (KCBT), Wheat (MGE), Corn, Oats
- All 40-YR datasets (1980–2019). Generator handles all 8 via `gen_futures_v2.js`.

**Indices — 13 assets**
- S&P 500 (CME 39-YR), S&P eMini (CME 23-YR), Russell 2000 (CME 17-YR), DJIA eMini (CBOT 23-YR), Nasdaq 100 (CME 24-YR), S&P 400 Mid-Cap (CME 29-YR), GSCI (CME 29-YR)
- Nikkei 225 (SIMEX 34-YR), FTSE 100 (LIFFE 37-YR), SPI 200 (SFE 21-YR), DAX (EUREX 30-YR), CAC 40 (MATIF 32-YR), Hang Seng (HKFE 34-YR)

**US Interest Rates — 5 assets (CBOT/CME)**
- T-Bonds 40-YR, T-Notes 10Y 39-YR, T-Notes 5Y 33-YR, T-Notes 2Y 30-YR, Eurodollar 39-YR

**SFE/LIFFE Rates — 5 assets**
- Aus T-Bonds 10Y (SFE 36-YR), Aus T-Bonds 3Y (SFE 33-YR), Aus T-Bills 3M (SFE 40-YR), Long Gilt (LIFFE 38-YR), Short Sterling (LIFFE 38-YR)

**EUREX/SGX/CBOT Rates — 4 assets**
- Euro-Bund (EUREX 30-YR), Euro-Bobl (EUREX 23-YR), Euro-Yen (SGX 31-YR), Fed Funds (CBOT 32-YR)
- Notable: Fed Funds is an inverted instrument (shorter TFs highest in January). Euro-Yen has the most dramatic single-month move in the entire rates complex (Feb 31-YR: 1→100).

**ICE Softs — 4 assets**
- Coffee "C" (ICE 40-YR), Sugar #11 (ICE 40-YR), Cocoa (ICE 40-YR), Orange Juice (ICE 40-YR)
- Notable: Sugar #11 has dual troughs (Jun + Sep). Cocoa has extreme TF divergence (May 40-YR at 0 while 5-YR/15-YR at 100). OJ has a 5-YR annual HIGH on January 1.

**LCE/CBOT Final Batch — 4 assets (completes all planned)**
- Rough Rice (CBOT 34-YR) — annual high at Dec/Jan cursor (~99); crashes immediately Jan 3; best long at April near-0 trough
- London Sugar (LCE 30-YR) — June 30-YR annual high (~95-100) is the most dramatic single-month LCE surge; August annual trough near 0
- London Cocoa (LCE 34-YR) — 34-YR visits near 0 FOUR times per year (Jan, Apr, Aug, Oct); most volatile soft in the dashboard
- Robusta Coffee (LCE 29-YR) — year ENDS at trough (29-YR ~31, 15-YR ~27, 5-YR ~17); February 29-YR annual high (~95-100); October annual low near 0

**Previously completed (MXN, BRL, Metals, Energy, Cotton, Lumber, Meats)**
- MXN (CME), BRL (CME)
- XAU, XAG, Copper, Platinum, Palladium
- Crude Oil (NYMEX), Brent Crude (ICE), Natural Gas (NYMEX), Heating Oil/ULSD (NYMEX), Gasoline/RBOB (NYMEX), Gas Oil (ICE)
- Cotton (NYBOT), Lumber (CME), Live Cattle (CME), Feeder Cattle (CME), Lean Hogs (CME), Class III Milk (CME)

---

### Quick Win — Dynamic Index Signals

**Problem:** All status-complete cards in `index.html` showed a hardcoded `<span class="bull-tag">Live</span>` that never changed regardless of the current seasonal signal.

**Solution implemented:**

1. **`gen_signals_manifest.js`** — new build script that reads all 97 data files (via `vm.createContext`), extracts the `com` string for every month × week, and writes `data/signals_manifest.js`.

2. **`data/signals_manifest.js`** — auto-generated file containing `SIGNALS_MANIFEST = { "aud": [...48 strings...], ... }`. Each asset gets a 48-element flat array (12 months × 4 weeks, Jan-Wk1 first). Regenerate by running `node gen_signals_manifest.js`.

3. **`index.html` injection** — two script blocks added before `</body>`:
   - `<script src="data/signals_manifest.js">` loads the manifest
   - Inline IIFE computes `currentMonth` and `currentWeek` from `new Date()`, then replaces `.card-signal` innerHTML on every `.asset-card.status-complete` card

4. **`comToTag()` mapper** — maps `com` string prefix to CSS class and label:
   - `LONG...` → `.bull-tag` / BULL
   - `SHORT...` → `.bear-tag` / BEAR
   - `FLIP...` → `.chop-tag` / FLIP
   - `AVOID...` → `.neutral-tag` / AVOID
   - `HOLD / NEUTRAL / MIXED / WATCH / CHOP...` → `.chop-tag` / CHOP

The 97 hardcoded `Live` spans remain in source HTML as a static fallback (for users with JavaScript disabled). All users with JS enabled see the runtime-derived signal.

---

### Generator State

- `gen_futures_v2.js`: GRAINS (8) + INDICES (13) + RATES (14) + SOFTS (8) = **43/43** HTML files generated
- `gen_signals_manifest.js`: **97/97** assets processed → `data/signals_manifest.js`

### Files Changed
- `data/roughrice.js` · `assets/roughrice.html` — created
- `data/londonsugar.js` · `assets/londonsugar.html` — created
- `data/londoncocoa.js` · `assets/londoncocoa.html` — created
- `data/robusta.js` · `assets/robusta.html` — created
- `gen_futures_v2.js` — SOFTS array expanded to 8 entries
- `gen_signals_manifest.js` — created (new build tool)
- `data/signals_manifest.js` — created (auto-generated, 97 assets)
- `index.html` — 4 planned cards converted to status-complete; signals IIFE injected

---

## v0.9 — June 2026
**Full Forex Pairs Roster Complete — 27 Derived FX Dashboards Live**

### Summary

Completed the build-out of every planned derived FX pair, taking the Forex Seasonals section from 3 live pairs (AUDUSD, USDJPY, GBPUSD, shipped in v0.6.1) to **27 live pairs** spanning majors, minors, and crosses. Work was tracked across an 8-task list (#1 reading source futures data, #2–#6 building pairs in batches, #7 wiring the index/docs, #8 verification).

**Majors (3 new):** EURUSD, USDCAD, USDCHF — completing the 6-pair major roster alongside the existing AUDUSD/GBPUSD/USDJPY.

**Minors (9 new):** AUDCAD, AUDCHF, AUDNZD, EURAUD (batch 1) · EURCHF, EURGBP, GBPAUD, GBPCHF, NZDUSD (batch 2).

**Crosses (12 new):** AUDJPY, CADCHF, CADJPY, EURCAD, EURJPY, EURNZD (batch 1) · GBPCAD, GBPJPY, GBPNZD, NZDCAD, NZDCHF, NZDJPY (batch 2).

### Cross Pairs Batch 2 (this session) — GBPCAD, GBPJPY, GBPNZD, NZDCAD, NZDCHF, NZDJPY

Each pair derived as base-currency-direct + quote-currency-inverted from the existing CME futures component datasets (no new chart images required). Narrative variety achieved through fresh thematic devices layered onto the established framework:

- **GBPCAD / GBPJPY:** Sustained Oct–Nov double-alignment LONG runs; GBPJPY also features a rare "dual trough" (Feb) and "dual flip" (Apr) month.
- **GBPNZD:** Two genuine defining collisions — May (both currencies' single highest-conviction trade of the year colliding head-on) and a remarkable December where both currencies' year-end defining moves coincidentally point the *same* direction, producing the calendar's cleanest alignment close.
- **NZDCAD:** Framed around "two similarly-cyclical commodity-bloc currencies" — an unusually high frequency of near-mirrored "coin-flip" months, a rare September dual-flip collision, and a clean single-component LONG dominance in December.
- **NZDCHF:** The most dramatic cross in the roster — THREE genuine maximum-conviction collisions (May, September, December), with December standing as the calendar's ultimate coin-flip: both currencies' single highest-conviction trades of their entire years firing in the same month, in directly opposing directions.
- **NZDJPY:** Clean resolving double-alignment windows in April and August (as JPY declines from its own historic flips), a defining September collision (NZD's secondary flip vs JPY's highest-conviction short of its year), and a December year-end stand-off between two strong, oppositely-aimed seasonal moves.

Two internal-consistency errors caught and corrected mid-build (self-contradictory signal/note pairings in GBPNZD's May section and NZDCAD's September Wk1) by re-deriving the correct combined-signal logic and rewriting the affected week blocks.

### Index & Docs Sync (Task #7)

- `index.html`: All 27 FX pair cards converted from `status-planned` (greyed, `href="#"`, "Planned" tag) to `status-complete` (`href="assets/fx-*.html"`, "Live" tag, accent colour matched to the base currency's brand colour — e.g. GBP pairs use `#22c55e`, NZD pairs use `#10b981`).
- `docs/README.md`: Forex Seasonals "Live Assets" table expanded from 3 to 27 entries (split into Majors / Minors / Crosses sub-tables with file paths, components, and key-signal summaries); the now-empty "Forex Seasonals — Planned" section replaced with a status summary.
- `docs/CHANGELOG.md`: This entry.

### Files Changed
- `index.html` — 27 FX cards updated (status, href, badges, signal tag, accent colour)
- `docs/README.md` — Forex Seasonals tables rebuilt and expanded; Planned section removed
- `docs/CHANGELOG.md` — v0.9 entry added
- `data/fx-{gbpcad,gbpjpy,gbpnzd,nzdcad,nzdchf,nzdjpy}.js` + `assets/fx-{...}.html` — created (batch 2, this session)

---

## v0.8 — April 2026
**CAD, EUR, CHF Fixes + NZD Dashboard + Wk-Grid Pill Badges**

### CAD / EUR / CHF — Bug Fixes

Three critical ID mismatches were causing silent failures on all three dashboards:

1. **Empty Combined Bias table** — `accordion.js` targets `id="acc-body"` but CAD/EUR/CHF had `id="accordion-body"`. Fixed by renaming the tbody IDs.
2. **Broken AI button** — `api.js` targets `id="run-btn"` but files had `id="ai-btn"`. Class `.ai-btn` is also undefined in `dashboard.css`. Fixed by replacing the AI section with the AUD pattern: `id="run-btn"`, `class="run-btn"`, `id="ai-output"`.
3. **Column count mismatch in accordion** — CAD/EUR/CHF had 8 `<th>` elements (separate chevron column) but `accordion.js` generates 7 `<td>` cells (chevron embedded in month cell). Fixed by removing the extra empty `<th>`.
4. **Unstyled legend** — legend items had no colour dots and were missing the 7th item (Combined). Fixed by expanding to 7 items using CSS variable colours matching `dashboard.css` tokens.
5. **Section label dot missing** — `.section-label span` requires an 8px dot element. Added where missing.

Root cause: CAD/EUR/CHF were built from an older template predating the modular JS refactor in v0.6.

### Wk-Grid Pill Badges (CAD, EUR, CHF, NZD)

All TF-specific seasonal tables (5-YR, 15-YR, long-term) on CAD, EUR, CHF updated to use the same `.wk-grid` / `.wk-cell` / `.wk-bull` / `.wk-bear` / `.wk-chop` pill badge system as AUD, replacing plain unstyled `<td class="bear-cell">↓</td>` cells.

Tables also rebuilt: `<div class="section"><table class="tf-table">` → `<div class="table-wrap"><table>` with 5-column headers (Period | Bias | Monthly Overview | Wk1–Wk4 | Notes), matching AUD's structure.

### NZD/USD Futures Dashboard (new)

New dashboard built from scratch from Moore Research Center chart image (23-Year seasonal 1997–2019).

**Key NZD seasonal narrative:**
- Jan: Spike-and-collapse from Dec highs — structural bear open
- Mar: Annual trough flip — 23-YR troughs Wk1–2, then sharp reversal
- Apr: All TFs rallying — highest conviction LONG window
- May: Most critical flip month — 23-YR peaks ~85–90 early May, all TFs collapse by Wk2 (highest conviction short of the year)
- Jun: Absolute trough zone — hold shorts from May flip
- Jul: Counter-trend bounce (23-YR and 15-YR), 5-YR muted — cautious long available
- Sep: Secondary peak → Wk3 flip short
- Nov Wk4 → Dec: Year-end surge to ~95–100 on 23-YR

Files created: `data/nzd.js` + `assets/nzd.html`

### Index Page
- NZD card: `status-planned` → `status-complete`, `href="#"` → `href="assets/nzd.html"`, timeframe badges updated to 5-YR / 15-YR / 23-YR
- NZD card status corrected from hardcoded `BEAR` → `Live` (the BEAR label was incorrect; Apr Wk 2 NZD is bullish)

### Status System Design Discussion

Established design principles for a future dynamic status badge system on index cards (not yet implemented):

**Two distinct dimensions:**
- **Operational status** (PLANNED / LIVE / MAINTENANCE) — manual, managed via a central `data/status.js` config file. Only the developer knows when maintenance is in progress.
- **Seasonal signal** (BULL / BEAR / CHOP) — derivable from each asset's existing `MONTHS[]` data: read `MONTHS[currentMonth].weeks[currentWeek].com`. Fully automatic once the index page loads asset data files.

**Hybrid recommended approach:** Operational status in central config (manual); seasonal signal computed live from `MONTHS` data. `PLANNED` and `MAINTENANCE` override the signal. Index page currently loads no asset data files — this is the architectural bloat to solve when implementing.

**Important:** Signal labels on index cards must NOT be hardcoded (e.g. `<span class="bear-tag">BEAR</span>`) as they go stale immediately. Use `Live` for all current assets until dynamic derivation is implemented.

### Files Changed
- `assets/cad.html` — ID fixes, legend fix, section label fix, all 3 TF tables rebuilt with wk-grid
- `assets/eur.html` — same fixes, adapted for 22-YR long-term TF
- `assets/chf.html` — same fixes, adapted for 40-YR long-term TF
- `assets/nzd.html` — created (23-YR long-term TF)
- `data/nzd.js` — created
- `index.html` — NZD card live, status corrected to Live

---

## v0.7 — April 2026
**UI Improvements: Sticky Nav + Section Reorder**

### What Changed
- `index.html` — sticky navigation bar added at top of page
  - 13 jump links in two groups: Futures (Currencies · Metals · Energy · Rates · Indices · Softs · Grains · Fiber · Meats) and Forex (Majors · Minors · Crosses)
  - `position: sticky; top: 0` with `backdrop-filter: blur(8px)` for glass effect
  - Active link highlights automatically via `IntersectionObserver` as user scrolls
  - Horizontally scrollable on mobile without wrapping
  - All section `id` attributes added to match nav `href` values
- All four futures asset dashboards reordered:
  - **Before:** Header → Legend → 5-YR table → 15-YR table → LT table → Combined accordion → AI panel
  - **After:** Header → Legend → **Combined accordion** → **AI panel** → Divider → 5-YR table → 15-YR table → LT table
  - Combined accordion is now the first visible element — most actionable content appears immediately on load

### Files Changed
- `index.html` — sticky nav CSS + HTML + IntersectionObserver script + section IDs
- `assets/aud.html` — section reorder
- `assets/usd.html` — section reorder
- `assets/jpy.html` — section reorder
- `assets/gbp.html` — section reorder

---

## v0.6.1 — April 2026
**GBP Futures Dashboard + Forex Seasonals (AUDUSD, USDJPY, GBPUSD)**

### What Was Added

**GBP/USD (CME) — 40-Year (1980–2019)**
- Cleanest chart of all assets analysed — all 3 TFs (5-YR, 15-YR, 40-YR) peak simultaneously at ~95–100 in early April
- Feb is the annual trough for all TFs → Mar–Apr is the bull window → May waterfall → Sep secondary trough → Oct–Nov recovery → Dec structurally weak (unusual)
- Files: `data/gbp.js` + `assets/gbp.html`

**AUDUSD Forex Seasonal**
- Derived from AUD CME (34-YR) + USD ICE (35-YR) inverse
- Jan–Mar LONG strongest (AUD bull + USD bear aligned); Oct–Nov SHORT (USD seasonal dominance)
- Files: `data/fx-audusd.js` + `assets/fx-audusd.html`

**USDJPY Forex Seasonal**
- Derived from USD ICE (35-YR) + JPY CME (40-YR) inverse
- Sep LONG is the standout — JPY in sharpest seasonal collapse simultaneously with USD recovering
- Files: `data/fx-usdjpy.js` + `assets/fx-usdjpy.html`

**GBPUSD Forex Seasonal**
- Derived from GBP CME (40-YR) + USD ICE (35-YR) inverse
- Mar LONG (GBP surging to peak + USD declining = double tailwind); Nov–Dec SHORT (GBP at annual lows + USD peak = double headwind)
- Files: `data/fx-gbpusd.js` + `assets/fx-gbpusd.html`

### Forex Dashboard Architecture
Forex shells differ from futures shells — no individual TF tables (data is synthesised, not from raw charts). Instead: methodology note explaining derivation + component cards showing the two source futures datasets. ASSET_CONFIG uses `ltLabel: "Long-YR"`, `ltSigKey: "sigLt"`, `ltKey: "sLt"`.

### Index Updated
- GBP, AUDUSD, USDJPY, GBPUSD cards marked as Live
- Two top-level sections established: Futures Seasonals + Forex Seasonals

---

## v0.6 — April 2026
**Modularisation — Shared CSS, JS, Data, and Index Page**

### What Changed
- Extracted all shared CSS into `css/dashboard.css`
- Extracted accordion logic into `js/accordion.js` — asset-agnostic via `ASSET_CONFIG`
- Extracted Claude API call into `js/api.js`
- Created per-asset data files in `data/` — each contains `ASSET_CONFIG`, `MONTHS[]`, `SEASONAL_DATA`
- Refactored AUD, USD, JPY into thin HTML shells in `assets/` (~120 lines each)
- Built `index.html` landing page — card grid, live vs planned, current month label
- `ASSET_CONFIG` pattern introduced: `ltKey`, `ltSigKey`, `ltLabel` allow shared accordion to handle any long-term TF

### Script Load Order (Critical)
```html
<script src="../data/[asset].js"></script>   <!-- must be first -->
<script src="../js/accordion.js"></script>
<script src="../js/api.js"></script>
```

### Files Created
`css/dashboard.css` · `js/accordion.js` · `js/api.js` · `data/aud.js` · `data/usd.js` · `data/jpy.js` · `assets/aud.html` · `assets/usd.html` · `assets/jpy.html` · `index.html`

---

## v0.5 — April 2026
**USD Index + JPY Dashboards + Dynamic Month Auto-Open**

### What Was Added
- US Dollar Index (ICE) — 35-YR (1985–2019), 15-YR, 5-YR
- Japanese Yen (CME) — 40-YR (1980–2019), 15-YR, 5-YR
- Dynamic current-month auto-open via `new Date().getMonth()` — replaces hardcoded April
- "NOW" badge on current month row
- `max_tokens` raised from 1000 to 2500

### Key Analysis Notes — USD
- 35-YR peaks earliest (late Feb), before 15-YR (mid-Mar)
- Double-cycle: Feb/Mar peak → May trough → Jun/Jul bounce → Oct trough → Nov/Dec peak
- Nov/Dec highest conviction LONG — all 3 TFs fully aligned
- Apr Wk4 is a FLIP LONG, not a continuation sell

### Key Analysis Notes — JPY
- 40-YR — longest dataset in the project
- Mar is Q1 highest conviction LONG — all 3 TFs simultaneously aligned
- Jul–Aug absolute annual peak — all 3 TFs hit ~95–100 together
- Sep highest conviction SHORT — simultaneous collapse from Aug peak
- Apr most complex: 40-YR still rising Wk1 (playbook BUY) while 5-YR/15-YR already falling

---

## v0.4 — April 2026
**Development Environment Setup**

- Local Git repo initialised in VSCode
- Private GitHub repo created: `seasonal-dashboard`
- SSH authentication configured (ED25519 key, Authentication type — not Signing Key)
- GitHub Pages enabled
- Claude Code (Anthropic VSCode extension) installed
- Live Server (VSCode extension) for local preview
- Workflow: edit in VSCode → preview with Live Server → commit → push → GitHub Pages auto-deploys

---

## v0.3 — April 2026
**Combined Table: Accordion Expansion**

- Replaced flat combined table with expandable accordion
- 12 months as clickable header rows — click to expand Wk1–4 breakdown
- Chevron indicator rotates on open/close
- April hardcoded to auto-open (later replaced with dynamic month in v0.5)
- `MONTHS[]` JavaScript array with full Wk1–4 data for all 12 months

---

## v0.2 — April 2026
**Initial AUD/USD Dashboard**

- Complete single-file HTML dashboard for AUD/USD
- Three timeframe tables: 5-YR (pink), 15-YR (brown), 34-YR (blue)
- Combined bias table with star conviction ratings
- Claude AI analysis button — POST to `api.anthropic.com/v1/messages`
- Dark terminal aesthetic: IBM Plex Mono + Bebas Neue, green/red/amber signal system
- CSS variable system for colour consistency

### AUD Chart Analysis (Moore Research Center, 34-YR 1986–2019)
- Jan–Mar: Strongly bullish across all TFs
- Apr Wk1: 5-YR hits score ~100 (absolute peak). Exit longs, flip short
- Apr Wk2–4: All 3 TFs bearish — highest conviction short of the month
- May–Jun: Deepest waterfall. Hold short
- Jul: 15-YR sharp bounce to ~75, 5-YR and 34-YR choppy — avoid
- Aug–Sep: Secondary bear leg
- Oct–Nov: Base building
- Dec: Recovery into Q1 cycle

---

## v0.1 — April 2026
**Project Conception**

- April trading playbook reviewed — currencies and metals with weekly Buy/Sell/Choppy signals
- Decision: structured interactive dashboard rather than flat notes
- Image batching strategy: 4–6 charts per Claude message
- Three-layer output structure defined: individual TF tables → combined table → AI layer
- Hierarchy confirmed: yearly arc first, then monthly, then weekly
- Two billing systems clarified: Claude.ai subscription vs API credits at console.anthropic.com
