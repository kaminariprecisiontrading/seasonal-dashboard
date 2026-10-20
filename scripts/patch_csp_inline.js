/**
 * patch_csp_inline.js — one-shot codemod (v1.21) so the Content-Security-Policy can
 * forbid inline script (no 'unsafe-inline' in script-src):
 *   1. assets/*.html: removes the only inline handler on the site,
 *      onclick="runAnalysis()" on the Analysis tab's Run button — js/api.js now
 *      attaches that listener itself.
 *   2. dashboard.html: moves its two inline <script> blocks, unchanged and in the
 *      same order, into js/dashboard.js, loaded right after js/signals.js.
 * Idempotent.
 *
 * Run from seasonal-dashboard/ root:  node scripts/patch_csp_inline.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)

// 1. Run-button inline handler
let pages = 0;
fs.readdirSync(path.join(ROOT, 'assets')).filter(f => f.endsWith('.html')).forEach(f => {
  const p = path.join(ROOT, 'assets', f);
  const s = fs.readFileSync(p, 'utf8');
  const out = s.replace(/ onclick="runAnalysis\(\)"/g, '');
  if (out !== s) { fs.writeFileSync(p, out, 'utf8'); pages++; }
});
console.log('asset pages: removed onclick from ' + pages);

// 2. Dashboard inline scripts → js/dashboard.js
const dp = path.join(ROOT, 'dashboard.html');
let html = fs.readFileSync(dp, 'utf8');
const blocks = [];
html = html.replace(/<script>\r?\n([\s\S]*?)<\/script>\r?\n?/g, (m, code) => { blocks.push(code); return ''; });
if (blocks.length) {
  if (blocks.length !== 2) throw new Error('expected 2 inline scripts in dashboard.html, found ' + blocks.length);
  const js = [
    '/**',
    ' * dashboard.js — the dashboard index\'s page script (dashboard.html, served at /dashboard).',
    ' * Moved out of two inline <script> blocks in v1.21 so the Content-Security-Policy',
    ' * can forbid inline script; the code is unchanged and runs in the same order.',
    ' * Loaded after data/signals_manifest.js and js/signals.js.',
    ' */',
    '',
    '/* ═══ Part 1 (was the first inline block): month label, sticky nav, search ═══ */',
    blocks[0].replace(/\s+$/, ''),
    '',
    '/* ═══ Part 2 (was the second inline block): live signal injection ═══ */',
    blocks[1].replace(/\s+$/, ''),
    ''
  ].join('\n');
  fs.writeFileSync(path.join(ROOT, 'js', 'dashboard.js'), js, 'utf8');
  const tag = '<script src="/js/signals.js"></script>';
  if (html.split(tag).length !== 2) throw new Error('signals.js tag not found exactly once');
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  html = html.replace(tag, tag + nl + '<script src="/js/dashboard.js"></script>');
  fs.writeFileSync(dp, html, 'utf8');
  console.log('dashboard.html: moved ' + blocks.length + ' inline scripts to js/dashboard.js');
} else {
  console.log('dashboard.html: no inline scripts left');
}
