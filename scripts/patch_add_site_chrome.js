/**
 * patch_add_site_chrome.js — one-shot codemod (v1.19): adds the shared site footer
 * (legal links, Embeds setting, operator/disclaimer line) to every page that doesn't
 * get it from its own template — all asset pages and the profiling calendar /
 * profile-detail / compare pages — by inserting:
 *   <link rel="stylesheet" href="../css/chrome.css">   after the page's dashboard.css link
 *   <script src="../js/site.js" defer></script>         before </body>
 * js/site.js then appends the footer to <body> (these pages keep their own topbar,
 * so no primary nav). Idempotent: pages that already have site.js are skipped.
 *
 * Run from seasonal-dashboard/ root:  node scripts/patch_add_site_chrome.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)
const files = []
  .concat(fs.readdirSync(path.join(ROOT, 'assets')).filter(f => f.endsWith('.html')).map(f => path.join('assets', f)))
  .concat(['profiling-calendar/index.html', 'profiling-profiles/detail.html', 'profiling-profiles/compare.html']);

let changed = 0, skipped = 0;
files.forEach(rel => {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('js/site.js')) { skipped++; return; }
  const css = /<link rel="stylesheet" href="\.\.\/css\/dashboard\.css"\s*\/?>/;
  if (!css.test(s)) throw new Error(rel + ': no ../css/dashboard.css link');
  if (s.split('</body>').length !== 2) throw new Error(rel + ': expected exactly one </body>');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  s = s.replace(css, m => m + nl + '<link rel="stylesheet" href="../css/chrome.css">');
  s = s.replace('</body>', '<script src="../js/site.js" defer></script>' + nl + '</body>');
  fs.writeFileSync(p, s, 'utf8');
  changed++;
});
console.log('pages patched: ' + changed + ', already had it: ' + skipped);
