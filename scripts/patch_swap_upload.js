/**
 * patch_swap_upload.js — Tier 4: replaces backtest.js + intraday.js script
 * tags with the single unified upload.js tag across asset HTML files.
 *
 * Removes: <script src="../js/backtest.js" defer></script>
 *          <script src="../js/intraday.js" defer></script>
 * Inserts: <script src="../js/upload.js" defer></script>
 * Before:  <script src="../js/ui.js" defer></script>
 *
 * Run from the seasonal-dashboard/ directory:
 *   node scripts/patch_swap_upload.js                  (all asset pages)
 *   node scripts/patch_swap_upload.js fx-eurusd.html fx-gbpusd.html   (subset)
 */

const fs   = require('fs');
const path = require('path');

const ASSETS_DIR  = path.join(__dirname, '..', 'assets');
const UI_TAG       = '<script src="../js/ui.js" defer></script>';
const UPLOAD_TAG   = '<script src="../js/upload.js" defer></script>';
const BT_RE         = /[ \t]*<script src="\.\.\/js\/backtest\.js" defer><\/script>\r?\n/g;
const IDT_RE        = /[ \t]*<script src="\.\.\/js\/intraday\.js" defer><\/script>\r?\n/g;

let patched = 0, skipped = 0, errors = 0;

const argFiles = process.argv.slice(2);
const files = argFiles.length
  ? argFiles
  : fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(ASSETS_DIR, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('upload.js')) {
      console.log(`SKIP  ${file} (already patched)`);
      skipped++;
      return;
    }
    if (!content.includes(UI_TAG)) {
      console.warn(`WARN  ${file} — ui.js tag not found; skipping`);
      skipped++;
      return;
    }

    const before = content;
    content = content.replace(BT_RE, '').replace(IDT_RE, '');
    content = content.replace(UI_TAG, UPLOAD_TAG + '\n  ' + UI_TAG);

    if (content === before) {
      console.warn(`WARN  ${file} — no change made; skipping`);
      skipped++;
      return;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`OK    ${file}`);
    patched++;
  } catch (err) {
    console.error(`ERR   ${file}: ${err.message}`);
    errors++;
  }
});

console.log(`\nDone — patched: ${patched} · skipped: ${skipped} · errors: ${errors}`);
