# scripts/ — Utility Scripts

One-shot and maintenance scripts for the KPT Seasonal Dashboard. All scripts run from the **`seasonal-dashboard/` root** (not from within this folder) and require Node.js.

---

## Patch Scripts — One-Shot, Already Applied

These scripts were used to retroactively add new shared JS modules to all 97 asset HTML files when each phase was built. They are **idempotent** (safe to re-run — they skip files that already contain the target script tag), but there is no reason to run them again unless you are rebuilding the HTML shells from scratch.

### `patch_add_backtest.js`

Inserts `<script src="../js/backtest.js" defer></script>` before `ui.js` in all `assets/*.html` files.

- **Added in:** Phase 2 (History tab, v1.2)
- **Status:** Already applied to all 97 files
- **Run:** `node scripts/patch_add_backtest.js` (from `seasonal-dashboard/`)

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

### `patch_add_intraday.js`

Inserts `<script src="../js/intraday.js" defer></script>` before `ui.js` in all `assets/*.html` files.

- **Added in:** Phase 2.5 (Sessions tab, v1.5)
- **Status:** Already applied to all 97 files
- **Run:** `node scripts/patch_add_intraday.js`

---

## Generator Scripts — Run As Needed

These scripts were run from a separate working environment and are not committed to the repo. They are documented here for reference.

### `gen_futures_v2.js` *(not in repo)*

Generates HTML shells for all futures assets from a config table. Produced the initial 43+ futures `assets/*.html` files. If you need to regenerate futures shells from scratch, this script (or a rebuild of it) would be required.

### `gen_signals_manifest.js` *(not in repo)*

Reads all 97 `data/*.js` files and writes `data/signals_manifest.js`, which powers the live signal chips on `index.html`. 

**Run this whenever:**
- A new asset data file is added or updated
- The calendar has advanced to a new month and you want index cards to reflect the new current-week signals
- You change any `MONTHS[].weeks[].com` values in any data file

To rebuild, run from `seasonal-dashboard/`: `node scripts/gen_signals_manifest.js`

The generated file includes a `SIGNALS_GENERATED` timestamp so you can see when it was last rebuilt.

---

## Writing a New Patch Script

If you add a new shared JS module (e.g. `js/newfeature.js`) and need to insert it into all 97 HTML files, copy the pattern from any existing patch script:

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
