/**
 * patch_dashboard_links.js — one-shot codemod for the v1.18 route change: the
 * dashboard moved from /index.html to /dashboard (index.html is now the landing
 * page), so every "back to all assets" link that pointed at ../index.html is
 * repointed to /dashboard.
 *
 * Covers all asset pages (assets/*.html), the profiling calendar/detail/compare
 * pages, and the two JS files that build a "Back to dashboard" link. Idempotent:
 * re-running finds nothing left to change.
 *
 * Run from the repo root:  node scripts/patch_dashboard_links.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)
const files = []
  .concat(fs.readdirSync(path.join(ROOT, 'assets')).filter(f => f.endsWith('.html')).map(f => path.join('assets', f)))
  .concat(['profiling-calendar/index.html', 'profiling-profiles/detail.html', 'profiling-profiles/compare.html',
           'js/profiling-compare.js', 'js/profiling-profile-detail.js']);

let filesChanged = 0, linksChanged = 0;
files.forEach(rel => {
  const p = path.join(ROOT, rel);
  const src = fs.readFileSync(p, 'utf8');
  let n = 0;
  const out = src.replace(/href="\.\.\/index\.html"/g, () => { n++; return 'href="/dashboard"'; });
  if (n) {
    fs.writeFileSync(p, out, 'utf8');
    filesChanged++;
    linksChanged += n;
  }
});
console.log('files changed: ' + filesChanged + ', links repointed: ' + linksChanged);
