# CONTRIBUTING.md — Adding Assets & Maintaining the Dashboard

The definitive checklist for adding a new asset, updating existing data, and keeping the system consistent. For architectural context see `ARCHITECTURE.md`; for field-by-field schema see `DATA_DICTIONARY.md`.

---

## Adding a New Futures Asset

### 1. Create the data file

Copy `data/aud.js` as your starting template. Rename to `data/{assetid}.js`.

Update `ASSET_CONFIG`:

```javascript
const ASSET_CONFIG = {
  id:       "newasset",         // lowercase, hyphens OK — must be unique
  name:     "Asset Name",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · [XX]-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · [Asset] · [XX]-Year Seasonal ([YEAR]–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "[XX]-YR",          // e.g. "34-YR", "40-YR"
  ltSigKey: "sig[XX]",          // e.g. "sig34", "sig40"
  ltKey:    "s[XX]",            // e.g. "s34", "s40"
  ltAccent: "#2563eb",
};
```

Fill in all 12 months in `MONTHS[]`. See `DATA_DICTIONARY.md` for the full schema. Critical rules:
- Every month must have exactly 4 week objects
- `ltSigKey` at month level and `ltKey` at week level must match what you put in `ASSET_CONFIG`
- `com` strings must start with `LONG`, `SHORT`, `NEUTRAL`, `CHOP`, or `FLIP` for the signal filter to work correctly
- `stars` is 1–5 (integer)

### 2. Create the HTML shell

Copy `assets/aud.html` as template. Rename to `assets/{assetid}.html`.

Change in the new file:
- `<title>` — asset name
- `<h1>` / `.sub` — header text
- The `<script src="../data/aud.js">` tag → `<script src="../data/{assetid}.js">`
- Footnote text (if you want to customise beyond what `ASSET_CONFIG.footnote` provides)
- The three static TF tables (or delete them — `accordion.js` auto-generates them from `MONTHS[]` if no `.table-wrap` elements are present)

The 9 shared JS scripts must remain in this order, with `ui.js` last:
```html
<script src="../data/{assetid}.js"></script>
<script src="../js/accordion.js"></script>
<script src="../js/api.js"></script>
<script src="../js/tradingview.js"></script>
<script src="../js/backtest.js"></script>
<script src="../js/macro.js"></script>
<script src="../js/seasonal-chart.js"></script>
<script src="../js/intraday.js"></script>
<script src="../js/ui.js"></script>
```

### 3. Update index.html

Find the planned card for this asset (or add a new one). Change:
- `class="status-planned"` → `class="status-complete"`
- `href="#"` → `href="assets/{assetid}.html"`
- Update timeframe badges to match actual TFs

### 4. Rebuild the signals manifest

```bash
node scripts/gen_signals_manifest.js
```

This regenerates `data/signals_manifest.js` so the new asset's live signal chip appears on the index page. Run this any time you add or update a data file.

### 5. Verify in browser

Open the page via Live Server (not by opening the file directly — relative paths require a server). Check:
- Accordion builds with 12 months and correct week data
- AI Analysis tab panel appears (pill buttons visible)
- TradingView chart loads on the Price tab
- No console errors

### 6. Deploy

Commit and push via GitHub Desktop (or `git add` / `git commit` / `git push`). Netlify detects the push and auto-deploys within ~60 seconds. Live URL: https://kpt-seasonals.netlify.app/

---

## Adding a New Forex Pair

Forex pairs are derived by combining two CME futures seasonal signals. Use `data/fx-audusd.js` as template, not `data/aud.js`.

Key differences from futures:
- `ASSET_CONFIG.ltSigKey` = `"sigLt"`, `ASSET_CONFIG.ltKey` = `"sLt"`, `ASSET_CONFIG.ltLabel` = `"Long-YR"`
- Month objects use `sigLt` (not `sig34` etc.), week objects use `sLt`
- There are no three separate TF tables — only the combined accordion
- Use `assets/fx-audusd.html` as the HTML template (not `assets/aud.html`)

Derivation methodology: for each month/week, the FX signal is determined by comparing the two component futures:
- Component A bull + Component B bear → FX pair long (A is numerator)
- Component A bear + Component B bull → FX pair short
- Both same direction → combined signal follows dominant TF
- Mixed/conflicting → chop or flip

The 27 existing FX pairs cover all major, minor, and cross combinations of AUD, USD, EUR, GBP, CAD, CHF, NZD, and JPY.

---

## Updating an Existing Asset's Data

When Moore Research Center publishes updated seasonal charts:

1. Edit the relevant `data/{asset}.js` file — update `MONTHS[]` fields to reflect new analysis
2. Do NOT edit `SEASONAL_DATA` — it is a legacy fallback and no longer maintained
3. Rebuild the signals manifest: `node scripts/gen_signals_manifest.js`
4. Test in browser: open the asset page, check the Trend tab (curve should update) and Analysis tab (AI context shows updated seasonal data)
5. **Important:** The AI cache is weekly (`kpt-ai-{id}-{provider}-{year}-w{week}`). If you update data mid-week and want the AI to use the new data immediately, use the ✕ button on any cached Analysis result to clear and re-run

---

## Updating a Shared JS File

All 97 asset pages load the same 9 shared scripts from `js/`. Changes to any shared file affect all pages immediately.

Before editing a shared file:
- Understand which modules depend on which — see `ARCHITECTURE.md` load order
- Changes to `accordion.js`, `api.js`, or `intraday.js` are the highest risk (most logic)
- Changes to `tradingview.js`, `macro.js`, or `seasonal-chart.js` are lower risk (more self-contained)
- `ui.js` is the final bootstrap — if it errors, no tabs appear

After editing:
- Test on at least 3 different asset types (futures currency, metals, and a forex pair)
- Check browser console on each for errors
- Verify that localStorage-persisted data (backtest results, intraday stats) still loads correctly after a page reload

---

## Adding a New Tab / Feature

To add a new tab to all 97 pages:

1. Write the JS module as `js/newfeature.js` — self-contained IIFE, inject into `[data-kpt-panel="newfeature"]`
2. Add the tab entry to the `tabs` array in `ui.js`
3. Add panel markup to a template HTML file
4. Write a patch script to insert the new `<script>` tag before `ui.js` in all 97 HTML files (see `scripts/README.md` for the pattern)
5. Run the patch script: `node scripts/patch_add_newfeature.js`
6. Add the script to `scripts/README.md`
7. Update `ARCHITECTURE.md` load order table
8. Update `CHANGELOG.md` with the new version entry

---

## Conventions

**Asset IDs:** Lowercase ASCII, hyphens allowed. FX pairs must be prefixed with `fx-`. Examples: `aud`, `cl`, `fx-audusd`, `fx-gbpjpy`, `euro-bund`.

**File naming:** Data files: `data/{id}.js`. Asset pages: `assets/{id}.html`. The HTML filename must match the data file ID exactly (excluding the `fx-` prefix in some legacy cases).

**Copyright span:** Every page's footnote must include the `<span class="copyright">` with **inline styles** (not CSS class alone). This survives CSS caching. See the pattern in `assets/aud.html`.

**No hardcoded signals on index cards:** Index cards for live assets must not hardcode `BULL`/`BEAR` labels — signals are always derived at runtime from `signals_manifest.js`. Only planned/coming-soon cards use static labels.
