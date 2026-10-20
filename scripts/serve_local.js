/**
 * serve_local.js — local preview server that behaves like Netlify for this site.
 *
 * Plain static servers (VSCode Live Server, `python -m http.server`) don't apply
 * netlify.toml, so root-absolute routes like /dashboard, /risk or /this-week 404
 * locally. This server applies the [[redirects]] rules from netlify.toml (200
 * rewrites, 301s, forced 404s, `*` splats), Netlify's default "pretty URL"
 * behaviour (/foo -> foo.html) and its 404.html fallback, plus the [[headers]]
 * blocks (so the Content-Security-Policy can be tested locally).
 *
 * Run from seasonal-dashboard/ root:  node scripts/serve_local.js [port]
 * Then open http://localhost:8888/
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)
const TOML = path.join(__dirname, '..', 'netlify.toml');  // at the repo root, like Netlify reads it
const PORT = +process.argv[2] || 8888;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.ico': 'image/x-icon'
};

function parseToml() {
  const file = TOML;
  const redirects = [], headers = [];
  if (!fs.existsSync(file)) return { redirects, headers };
  const src = fs.readFileSync(file, 'utf8');
  src.split(/^\s*\[\[/m).slice(1).forEach(block => {
    const kind = block.slice(0, block.indexOf(']]')).trim();
    const val = k => { const m = new RegExp('^\\s*' + k + '\\s*=\\s*(?:"([^"]*)"|(\\S+))', 'm').exec(block); return m ? (m[1] !== undefined ? m[1] : m[2]) : undefined; };
    if (kind === 'redirects') {
      redirects.push({ from: val('from'), to: val('to'), status: +(val('status') || 301), force: val('force') === 'true' });
    } else if (kind === 'headers') {
      const values = {};
      const vm = /\[headers\.values\]([\s\S]*)/.exec(block) || /values\s*=\s*\{([\s\S]*?)\}/.exec(block);
      if (vm) {
        const re = /^\s*([A-Za-z-]+)\s*=\s*(?:"""([\s\S]*?)"""|"([^"]*)")/gm;
        let m; while ((m = re.exec(vm[1]))) values[m[1]] = (m[2] !== undefined ? m[2] : m[3]).replace(/\s*\n\s*/g, ' ').trim();
      }
      headers.push({ for: val('for'), values });
    }
  });
  return { redirects, headers };
}

function matchRule(from, p) {
  // Netlify ignores a trailing slash when matching rules (/dashboard/ matches /dashboard).
  if (p.length > 1) p = p.replace(/\/+$/, '');
  if (from.endsWith('/*')) {
    const base = from.slice(0, -2);
    if (p === base || p.startsWith(base + '/')) return { splat: p.slice(base.length + 1) };
    return null;
  }
  return p === from ? {} : null;
}

function fileFor(p) {
  const f = path.join(ROOT, decodeURIComponent(p));
  if (!f.startsWith(ROOT)) return null;
  if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  if (fs.existsSync(f) && fs.statSync(f).isDirectory() && fs.existsSync(path.join(f, 'index.html'))) return path.join(f, 'index.html');
  if (fs.existsSync(f + '.html')) return f + '.html';  // Netlify pretty URLs
  return null;
}

function send(res, status, file, extraHeaders) {
  const body = fs.readFileSync(file);
  res.writeHead(status, Object.assign({ 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }, extraHeaders));
  res.end(body);
}

http.createServer((req, res) => {
  const { redirects, headers } = parseToml();  // re-read each request: edit netlify.toml without restarting
  const url = new URL(req.url, 'http://localhost');
  let p = url.pathname;
  const hdrs = {};
  headers.forEach(h => { if (h.for === '/*' || matchRule(h.for, p)) Object.assign(hdrs, h.values); });

  for (const r of redirects) {
    const hit = matchRule(r.from, p);
    if (!hit) continue;
    const existing = fileFor(p);
    if (existing && !r.force && r.status === 200) break;  // shadowing: real files win unless forced
    const to = r.to.replace(':splat', hit.splat || '');
    if (r.status === 301 || r.status === 302) { res.writeHead(r.status, { Location: to }); return res.end(); }
    const f = fileFor(to);
    if (f) return send(res, r.status, f, hdrs);
  }
  const f = fileFor(p);
  if (f) return send(res, 200, f, hdrs);
  const nf = path.join(ROOT, '404.html');
  if (fs.existsSync(nf)) return send(res, 404, nf, hdrs);
  res.writeHead(404); res.end('Not found');
}).listen(PORT, '127.0.0.1', () => console.log('Serving ' + ROOT + ' at http://localhost:' + PORT + '/'));
