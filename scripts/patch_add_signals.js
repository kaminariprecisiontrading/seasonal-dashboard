/**
 * patch_add_signals.js — one-shot codemod (v1.26): loads js/signals.js on every asset page,
 * right after the page's own data/<id>.js, so the Trend curve (seasonal-chart.js), the
 * Upload backtest (upload.js) and the AI prompt (api.js) use the same week → signal mapping
 * as the dashboard and the site pages (KptSignals.comToTag / comDirection).
 * Idempotent. Run from the repo's site root:  node scripts/patch_add_signals.js
 */
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..');
let changed = 0, skipped = 0;
fs.readdirSync(path.join(SITE, 'assets')).filter(f => f.endsWith('.html')).forEach(f => {
  const p = path.join(SITE, 'assets', f);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('js/signals.js')) { skipped++; return; }
  const id = f.replace('.html', '');
  const re = new RegExp('([ \\t]*)<script src="\\.\\./data/' + id.replace(/[-]/g, '\\-') + '\\.js" defer></script>');
  const m = re.exec(s);
  if (!m) throw new Error(f + ': own data script tag not found');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  s = s.replace(re, m[0] + nl + m[1] + '<script src="../js/signals.js" defer></script>');
  fs.writeFileSync(p, s, 'utf8');
  changed++;
});
console.log('asset pages patched: ' + changed + ', already had it: ' + skipped);
