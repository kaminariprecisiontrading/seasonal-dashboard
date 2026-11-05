/**
 * patch_add_sources.js — one-shot codemod (v1.29): loads data/asset_index.js and
 * data/asset_sources.js on every asset page, right after js/signals.js, so the page can show
 * its data source (js/site.js) and tell whether it's a synthetic (js/site.js, js/profiling.js).
 * Idempotent. Run from the repo root:  node scripts/patch_add_sources.js
 */
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)
let changed = 0, skipped = 0;
fs.readdirSync(path.join(SITE, 'assets')).filter(f => f.endsWith('.html')).forEach(f => {
  const p = path.join(SITE, 'assets', f);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('data/asset_sources.js')) { skipped++; return; }
  const m = /([ \t]*)<script src="\.\.\/js\/signals\.js" defer><\/script>/.exec(s);
  if (!m) throw new Error(f + ': signals.js script tag not found');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  s = s.replace(m[0], m[0] + nl + m[1] + '<script src="../data/asset_index.js" defer></script>' + nl + m[1] + '<script src="../data/asset_sources.js" defer></script>');
  fs.writeFileSync(p, s, 'utf8');
  changed++;
});
console.log('asset pages patched: ' + changed + ', already had it: ' + skipped);
