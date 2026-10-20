# scripts/ — Utility Scripts

One-shot and maintenance scripts for the KPT Seasonal Dashboard. All scripts run from the **`seasonal-dashboard/` root** (not from within this folder) and require Node.js.

---

## Patch Scripts — One-Shot, Already Applied

These scripts were used to retroactively add new shared JS modules to all 97 asset HTML files when each phase was built. They are **idempotent** (safe to re-run — they skip files that already contain the target script tag), but there is no reason to run them again unless you are rebuilding the HTML shells from scratch.

### `patch_add_backtest.js` — superseded

Inserted `<script src="../js/backtest.js" defer></script>` before `ui.js` in all `assets/*.html` files.

- **Added in:** Phase 2 (History tab, v1.2)
- **Status:** **Obsolete as of v1.12/Tier 4** — `js/backtest.js` was deleted and merged into `js/upload.js`. Left in place as historical record only; do not run (there is nothing left for it to patch toward — it would reinsert a script tag for a file that no longer exists). See `patch_swap_upload.js` below for the script that superseded it.

### `patch_add_macro.js`

Inserts `<script src="../js/macro.js" defer></script>` before `ui.js` in all `assets/*.html` files.

- **Added in:** Phase 3 (Macro tab, v1.3)
- **Status:** Already applied to all 97 files
- **Run:** `node scripts/patch_add_macro.js`

### `patch_add_seasonal_chart.js`

Inserts `<script src="../js/seasonal-chart.js" defer></script>` before `ui.js` in all `assets/*.html` files.

- **Added in:** Phase 4 (Trend tab, v1.4)
- **Status:** Already applied to all 97 files
- **Run:** `node scripts/patch_add_seasonal_chart.js`

### `patch_add_intraday.js` — superseded

Inserted `<script src="../js/intraday.js" defer></script>` before `ui.js` in all `assets/*.html` files.

- **Added in:** Phase 2.5 (Sessions tab, v1.5)
- **Status:** **Obsolete as of v1.12/Tier 4** — `js/intraday.js` was deleted and merged into `js/upload.js`. Left in place as historical record only; do not run. See `patch_swap_upload.js` below.

### `patch_swap_upload.js`

Removed the `backtest.js`/`intraday.js` script tags and inserted a single `<script src="../js/upload.js" defer></script>` before `ui.js`, across all 98 `assets/*.html` files. The one-shot codemod for the Tier 4 History+Sessions → Upload merge.

- **Added in:** v1.12 (`docs/PLATFORM_ROADMAP.md` Tier 4)
- **Status:** Already applied to all 98 files
- **Run:** `node scripts/patch_swap_upload.js` (from `seasonal-dashboard/`) — accepts an optional list of specific filenames to patch a subset instead of all pages (used during Tier 4's own branch-and-test rollout)

### `patch_dashboard_links.js`

Repoints every `href="../index.html"` link to `/dashboard`, after the dashboard index moved from `index.html` to `dashboard.html` (served at `/dashboard`; `/` is now the landing page). Covers all asset pages, the profiling calendar/detail/compare pages and the two JS files that build a "Back to dashboard" link.

- **Added in:** v1.18 (landing page)
- **Status:** Already applied — 103 files, 123 links. Idempotent (a re-run changes nothing).
- **Run:** `node scripts/patch_dashboard_links.js`

### `patch_add_favicon.js`

Inserts a `<link rel="icon">` (inline SVG data URI, no separate asset file) right after `<head>` in every page — `index.html` (then the dashboard index; renamed `dashboard.html` in v1.18), `profiling-calendar/index.html`, `profiling-profiles/detail.html`, and all `assets/*.html`. No favicon existed anywhere before this.

- **Added in:** v1.8 (`docs/PLATFORM_ROADMAP.md` Tier 1)
- **Status:** Already applied to all 100 files
- **Run:** `node scripts/patch_add_favicon.js`

---

### `sync_profiling_data.js`

Regenerates `data/profiling/*` from the sibling `KPT-Market-Profiling` repo's pipeline output (`../KPT-Market-Profiling/dashboard/data/`). Not a one-shot — this is the repeatable bridge between that data-pipeline repo and this one; re-run any time the pipeline is re-run for an asset (new/updated CSV, taxonomy change).

- **Added in:** v1.7 (Profiling tab)
- **Status:** Maintenance script, run as needed (not idempotent-skip like the patch scripts above — it always regenerates)
- **Run:** `node scripts/sync_profiling_data.js` (from `seasonal-dashboard/`)
- **To add a new asset:** add its lowercase key to the `ASSETS` array at the top of the script, then re-run. See `docs/CONTRIBUTING.md` → "Adding a New Profiling Asset" for the full downstream checklist (asset-key maps in `js/profiling.js`/`js/profiling-calendar.js`/`js/profiling-profile-detail.js`, script tags on the relevant page(s)).

---

## Site Scripts — Run As Needed

### `build_legal_pages.js`

Generates `risk.html`, `terms.html`, `privacy.html` and `sources.html` from the approved mockups in `docs/specs/2026-10-site-expansion/mockups/`: extracts the header, contents list and article verbatim, maps the mockups' inline styles to the shared `.legal` classes (fails on any unmapped style), points mockup links at the real routes, marks the operator name for `js/site.js`, and applies the explicit `EDITS` wording changes (each must match exactly once).

- **Added in:** v1.19
- **Run:** `node scripts/build_legal_pages.js` — only if the mockups/EDITS change; otherwise edit the generated pages directly.

### `patch_csp_inline.js`

One-shot codemod so the CSP can forbid inline script: removes `onclick="runAnalysis()"` from all 98 asset pages (`js/api.js` attaches the listener instead) and moves `dashboard.html`'s two inline `<script>` blocks, unchanged and in order, into `js/dashboard.js`. Idempotent.

- **Added in:** v1.21
- **Status:** Already applied.
- **Run:** `node scripts/patch_csp_inline.js`

### `patch_add_site_chrome.js`

One-shot codemod: adds `../css/chrome.css` and `../js/site.js` to every asset page and the three profiling pages so they get the shared site footer. Idempotent.

- **Added in:** v1.19
- **Status:** Already applied — 101 pages (98 asset + 3 profiling).
- **Run:** `node scripts/patch_add_site_chrome.js`


### `gen_asset_index.js`

Regenerates `data/asset_index.js` — the shared asset registry (`window.KPT_ASSETS`, `window.KPT_ASSET_GROUPS`: id, ticker, name, badges, accent colour, dashboard section, live/planned) — from `dashboard.html`'s asset cards. Used by `js/signals.js` and every page outside the dashboard.

- **Added in:** v1.18
- **Run:** `node scripts/gen_asset_index.js` after adding, renaming or regrouping a dashboard card.

### `gen_month_signals.js`

Regenerates `data/month_signals.js` (each asset's 12 month-level `combined` signals + `stars` from its data file) for the Heatmap's Months view. Fails loudly on a missing month or an unexpected `combined` value.

- **Added in:** v1.24
- **Run:** `node scripts/gen_month_signals.js` after changing any `data/<asset>.js`.

### `snapshot_signals.js`

Archives the current week's signals (all 98 assets' `com` strings for this week slot) to `data/signal_history/YYYY-MM-Wn.json` — the *live-recorded* history the Track Record grades. Never overwrites an existing snapshot (`--force` only to repair a bad file); `--date YYYY-MM-DD` for a specific week.

- **Added in:** v1.25 — first snapshot `2026-10-W3`.
- **Run:** `node scripts/snapshot_signals.js` **every week, ideally Monday** (commit the new file). A missed week can't be recreated later — it would fall back to backfill.

### `sync_track_record.js`

Copies `../KPT-Market-Profiling/output/track_record.json` (from `pipeline/grade_signals.py`) into `data/track_record.js`.

- **Added in:** v1.25
- **Run:** `node scripts/sync_track_record.js` after re-running the grader.

### `serve_local.js`

Local preview server that behaves like Netlify: applies `netlify.toml`'s `[[redirects]]` (200 rewrites, 301s, forced 404s, splats) and `[[headers]]`, Netlify's pretty URLs (`/foo` → `foo.html`), trailing-slash matching and the `404.html` fallback. Needed because the site's clean routes (`/dashboard`, …) don't resolve on plain static servers.

- **Added in:** v1.18
- **Run:** `node scripts/serve_local.js [port]` → http://localhost:8888/

---

## Generator Scripts — Run As Needed

These scripts were run from a separate working environment and are not committed to the repo. They are documented here for reference.

### `gen_futures_v2.js` *(not in repo)*

Generates HTML shells for all futures assets from a config table. Produced the initial 43+ futures `assets/*.html` files. If you need to regenerate futures shells from scratch, this script (or a rebuild of it) would be required.

### `gen_signals_manifest.js` *(not in repo)*

Reads all 97 `data/*.js` files and writes `data/signals_manifest.js`, which powers the live signal chips on the dashboard index (`dashboard.html`) and the landing page's tally. 

**Run this whenever:**
- A new asset data file is added or updated
- The calendar has advanced to a new month and you want index cards to reflect the new current-week signals
- You change any `MONTHS[].weeks[].com` values in any data file

To rebuild, run from `seasonal-dashboard/`: `node scripts/gen_signals_manifest.js`

The generated file includes a `SIGNALS_GENERATED` timestamp so you can see when it was last rebuilt.

---

## Writing a New Patch Script

If you add a new shared JS module (e.g. `js/newfeature.js`) and need to insert it into all 98 HTML files, copy the pattern from any existing patch script:

```javascript
const ASSETS_DIR = path.join(__dirname, '..', 'assets'); // note: run from root, so __dirname is scripts/
const NEEDLE     = '<script src="../js/ui.js" defer></script>';
const INSERT     = '<script src="../js/newfeature.js" defer></script>\n  ';
```

Key rules:
- Always insert **before** `ui.js` (ui.js must remain last)
- Always include an idempotency check (`if (src.includes('newfeature.js')) { already++; return; }`)
- Log `PATCHED`, `SKIP`, and `ALREADY` counts at the end
- Document the script here after adding it
