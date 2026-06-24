/**
 * patch_add_backtest.js
 *
 * Inserts <script src="../js/backtest.js" defer></script> immediately before
 * <script src="../js/ui.js" defer></script> in every HTML file under assets/.
 *
 * Run once from the seasonal-dashboard root:
 *   node patch_add_backtest.js
 */

const fs   = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');
const NEEDLE     = '<script src="../js/ui.js" defer></script>';
const INSERT     = '<script src="../js/backtest.js" defer></script>\n  ';

let patched = 0;
let skipped = 0;
let already = 0;

const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(ASSETS_DIR, file);
  const src      = fs.readFileSync(filePath, 'utf8');

  if (src.includes('backtest.js')) {
    already++;
    return;
  }

  if (!src.includes(NEEDLE)) {
    console.warn(`  SKIP — needle not found: ${file}`);
    skipped++;
    return;
  }

  const updated = src.replace(NEEDLE, INSERT + NEEDLE);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`  ✓ patched: ${file}`);
  patched++;
});

console.log(`\nDone — ${patched} patched, ${already} already had backtest.js, ${skipped} skipped.`);
