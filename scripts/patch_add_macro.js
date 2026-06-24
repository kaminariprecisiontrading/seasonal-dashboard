/**
 * patch_add_macro.js — Adds macro.js script tag to all 97 asset HTML files.
 *
 * Inserts:  <script src="../js/macro.js" defer></script>
 * Before:   <script src="../js/ui.js" defer></script>
 *
 * Run once from the seasonal-dashboard/ directory:
 *   node patch_add_macro.js
 */

const fs   = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');
const TARGET     = '<script src="../js/ui.js" defer></script>';
const INSERT     = '<script src="../js/macro.js" defer></script>\n  ';

let patched = 0;
let skipped = 0;
let errors  = 0;

const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(ASSETS_DIR, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('macro.js')) {
      console.log(`SKIP  ${file} (already patched)`);
      skipped++;
      return;
    }

    if (!content.includes(TARGET)) {
      console.warn(`WARN  ${file} — ui.js script tag not found; skipping`);
      skipped++;
      return;
    }

    content = content.replace(TARGET, INSERT + TARGET);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`OK    ${file}`);
    patched++;
  } catch (err) {
    console.error(`ERR   ${file}: ${err.message}`);
    errors++;
  }
});

console.log(`\nDone — patched: ${patched} · skipped: ${skipped} · errors: ${errors}`);
