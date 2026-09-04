/**
 * patch_add_favicon.js — One-shot: inserts a favicon <link> into every page's
 * <head>. No repo has a favicon asset today (every page shows a broken/
 * default tab icon) — see docs/PLATFORM_ROADMAP.md Tier 1.
 *
 * Uses a data: URI SVG rather than a binary asset file — no new file to keep
 * in sync, and it's identical on every page regardless of nesting depth
 * (assets/, profiling-calendar/, profiling-profiles/, root), so there's no
 * relative-path risk of the kind that broke the Profiling tab's early links.
 *
 * Idempotent — safe to re-run; skips files that already have a favicon link.
 * Run from seasonal-dashboard/ root: node scripts/patch_add_favicon.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const FAVICON_LINK =
  '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Crect width=\'32\' height=\'32\' rx=\'7\' fill=\'%230a0c0f\'/%3E%3Cpath d=\'M7 23 L13 15 L18 19 L25 8\' fill=\'none\' stroke=\'%2322c55e\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3Ccircle cx=\'25\' cy=\'8\' r=\'2.4\' fill=\'%2322c55e\'/%3E%3C/svg%3E">';

const TARGET_FILES = [
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'profiling-calendar', 'index.html'),
  path.join(ROOT, 'profiling-profiles', 'detail.html'),
  ...fs.readdirSync(path.join(ROOT, 'assets'))
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(ROOT, 'assets', f))
];

let patched = 0, already = 0, skipped = 0;

TARGET_FILES.forEach(file => {
  if (!fs.existsSync(file)) { console.log('SKIP (not found):', file); skipped++; return; }
  const src = fs.readFileSync(file, 'utf8');
  if (src.includes('rel="icon"')) { already++; return; }
  if (!src.includes('<head>')) { console.log('SKIP (no <head>):', file); skipped++; return; }
  const out = src.replace('<head>', '<head>\n' + FAVICON_LINK);
  fs.writeFileSync(file, out, 'utf8');
  patched++;
});

console.log(`PATCHED: ${patched}, ALREADY: ${already}, SKIP: ${skipped}`);
