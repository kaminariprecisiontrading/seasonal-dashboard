/**
 * build_legal_pages.js — builds risk.html, terms.html, privacy.html and sources.html
 * from the approved mockups in docs/specs/2026-10-site-expansion/mockups/.
 *
 * The legal text is approved word for word, so it's extracted from the mockups
 * programmatically rather than retyped: header (H1, last-updated, lead), the
 * "On this page" contents and the article body. Inline styles are mapped to the
 * shared `.legal` classes in css/site.css (any style attribute left over is an
 * error), mockup links are pointed at the real routes, and the operator's name is
 * marked up so js/site.js fills it from KPT_SITE.OPERATOR_NAME.
 *
 * The only wording changes are the EDITS list below — each must match exactly
 * once, and each is recorded in docs/CHANGELOG.md. To change legal text later,
 * edit the generated page directly (this script is kept for the record) or edit
 * the mockup + EDITS and re-run:  node scripts/build_legal_pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)
const MOCK = path.join(__dirname, '..', 'docs', 'specs', '2026-10-site-expansion', 'mockups');

const ROUTES = {
  'risk.html': '/risk', 'terms.html': '/terms', 'privacy.html': '/privacy', 'sources.html': '/sources',
  'about.html': '/about', 'landing-mockup.html': '/', 'https://kpt-seasonals.netlify.app/': '/dashboard',
  'whatchanged.html': '/this-week', 'heatmap.html': '/heatmap', 'trackrecord.html': '/track-record',
  'methodology.html': '/methodology'
};

// Approved wording changes (listed in CHANGELOG v1.19).
const EDITS = {
  risk: [
    ['sends data to a third-party AI model you choose (Anthropic Claude, Google Gemini, or a local Ollama model)',
     'sends data to a third-party AI model you choose (Anthropic Claude, OpenAI ChatGPT, Google Gemini, or a local Ollama model)'],
  ],
  terms: [
    ['AI analysis uses an API key that <strong>you</strong> supply for Anthropic or Google, or a local Ollama model you run yourself.',
     'AI analysis uses an API key that <strong>you</strong> supply for Anthropic, OpenAI or Google, or a local Ollama model you run yourself.'],
    ['including TradingView, Investing.com, Anthropic, Google, Netlify and cdnjs.',
     'including TradingView, Investing.com, Anthropic, OpenAI, Google, Netlify and cdnjs.'],
  ],
  privacy: [
    ['<li><strong>Anthropic Claude or Google Gemini:</strong> sent <strong>directly from your browser</strong>',
     '<li><strong>Anthropic Claude, OpenAI ChatGPT or Google Gemini:</strong> sent <strong>directly from your browser</strong>'],
    ['Netlify, Anthropic, Google, TradingView, Investing.com and Cloudflare operate outside Botswana',
     'Netlify, Anthropic, OpenAI, Google, TradingView, Investing.com and Cloudflare operate outside Botswana'],
    // Storage table reconciled with the keys actually used in the code (brief §1.7).
    ['<tr><td>AI settings</td><td><code>kpt-cfg-*</code></td><td>Chosen provider, your API key(s) if you choose to remember them, Ollama URL and model</td></tr>',
     '<tr><td>AI settings</td><td><code>kpt-cfg-*</code></td><td>Chosen provider and models, Ollama URL, whether to remember keys (<code>kpt-cfg-keep</code>), and your API key(s) if you choose to remember them. Keys kept for this session only are held in session storage instead, which your browser clears when you close the tab</td></tr>'],
    ['<tr><td>Preferences</td><td><code>kpt-tz-*</code>, <code>kpt-sub-*</code></td><td>Broker time-zone offset; last sub-tab viewed</td></tr>',
     '<tr><td>Preferences</td><td><code>kpt-tz-*</code>, <code>kpt-sub-*</code>, <code>kpt-tw-open</code></td><td>Broker time-zone offset; last sub-tab viewed; whether the dashboard\'s This Week panel is open</td></tr>'],
    // Fonts are self-hosted: keep the sentence, drop the amber build note (brief §1.6).
    [' <span style="color: #fbbf24">[If fonts are still loaded from Google Fonts at launch, replace this sentence with: "Fonts are loaded from Google Fonts, so your browser contacts Google when pages load."]</span>', ''],
  ],
  sources: [
    ['The Analysis tab can use <strong>Claude</strong> (Anthropic), <strong>Gemini</strong> (Google) or a local model',
     'The Analysis tab can use <strong>Claude</strong> (Anthropic), <strong>ChatGPT</strong> (OpenAI), <strong>Gemini</strong> (Google) or a local model'],
    ['<tr><td>Chart.js</td><td>Charts</td><td>MIT</td></tr>', '<tr><td>Chart.js 4.4.0</td><td>Charts</td><td>MIT</td></tr>'],
    ['<tr><td>marked</td><td>Formatting AI output</td><td>MIT</td></tr>', '<tr><td>marked 9.1.6</td><td>Formatting AI output</td><td>MIT</td></tr>'],
    ['<tr><td>Bebas Neue, JetBrains Mono, Barlow, IBM Plex Mono</td><td>Typefaces</td><td>SIL Open Font License 1.1</td></tr>',
     '<tr><td>Bebas Neue, IBM Plex Mono, Barlow</td><td>Typefaces (served from this site)</td><td>SIL Open Font License 1.1</td></tr>'],
    ['Claude, Anthropic, Gemini, Google, Ollama and the exchange names above',
     'Claude, Anthropic, ChatGPT, OpenAI, Gemini, Google, Ollama and the exchange names above'],
  ]
};

// Inline styles → classes (every style attribute in the extracted HTML must be covered).
const STYLE_MAP = [
  [/<h2 id="([^"]+)" style="margin-top: 0">/g, '<h2 id="$1" class="legal-first">'],
  [/<div style="overflow-x: auto; border: 1px solid #1f252e; border-radius: 8px; margin-bottom: 14px">/g, '<div class="legal-table-wrap">'],
  [/<div role="note" style="background: #11141a; border: 1px solid #6b4a12;[^"]*">/g, '<div role="note" class="legal-summary legal-summary-warn">'],
  [/<div role="note" style="background: #11141a; border: 1px solid #1d5c35;[^"]*">/g, '<div role="note" class="legal-summary legal-summary-ok legal-summary-grid">'],
  [/<span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 2px; color: #fbbf24">/g, '<span class="lbl legal-summary-title">'],
  [/<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 14px 24px">/g, '<div class="legal-summary-grid">'],
  [/<span style="font-size: 15px;[^"]*">/g, '<span class="legal-summary-text">'],
];

function between(s, a, b, from) {
  const i = s.indexOf(a, from || 0);
  if (i < 0) throw new Error('missing ' + a);
  const j = s.indexOf(b, i + a.length);
  if (j < 0) throw new Error('missing ' + b);
  return s.slice(i + a.length, j);
}
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

function fixLinks(html) {
  return html.replace(/href="([^"#]+)"/g, (m, href) => ROUTES[href] ? 'href="' + ROUTES[href] + '"' : m);
}
function operator(html) {
  return html.replace(/<strong>G T<\/strong>/g, '<strong data-kpt-operator>G T</strong>')
             .replace(/(^|[^>])\bG T\b(?!<\/strong>)/g, '$1<span data-kpt-operator>G T</span>');
}
function applyEdits(name, html) {
  (EDITS[name] || []).forEach(([a, b]) => {
    const n = html.split(a).length - 1;
    if (n !== 1) throw new Error(name + ': edit matched ' + n + 'x: ' + a.slice(0, 70));
    html = html.replace(a, () => b);
  });
  return html;
}

function page(name) {
  const src = fs.readFileSync(path.join(MOCK, name + '.html'), 'utf8');
  const title = between(src, '<title>', '</title>');
  const head = between(src, '<section style="max-width: 1200px; margin: 0 auto; padding: 64px 24px 40px;', '</section>');
  const h1 = between(head, '">', '</h1>', head.indexOf('<h1'));
  const updated = head.slice(head.indexOf('Last updated'), head.indexOf('</span>', head.indexOf('Last updated')));
  const lead = between(head, '">', '</p>', head.indexOf('<p'));
  const tocRaw = between(src, '<nav aria-label="On this page" class="toc"', '</nav>');
  const toc = tocRaw.slice(tocRaw.indexOf('</span>') + 7).trim();
  let article = between(src, '<article class="lg"', '</article>');
  article = article.slice(article.indexOf('>') + 1);

  let body = applyEdits(name, article);
  STYLE_MAP.forEach(([re, rep]) => { body = body.replace(re, rep); });
  if (/style="/.test(body)) throw new Error(name + ': unmapped inline style: ' + body.match(/<[^>]*style="[^"]*"[^>]*>/)[0]);
  body = operator(fixLinks(body)).trim();

  const leadHtml = operator(fixLinks(lead));
  const out = `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230a0c0f'/%3E%3Cpath d='M7 23 L13 15 L18 19 L25 8' fill='none' stroke='%2322c55e' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='25' cy='8' r='2.4' fill='%2322c55e'/%3E%3C/svg%3E">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${strip(lead).replace(/G T/g, 'the operator').replace(/"/g, '&quot;')}">
<link rel="stylesheet" href="/css/site.css">
</head>
<body>
<!-- Generated by scripts/build_legal_pages.js from docs/specs/2026-10-site-expansion/mockups/${name}.html -->
<header data-kpt-nav></header>
<main>
<section class="wrap legal-head">
  <span class="eyebrow">Legal</span>
  <h1 class="display legal-h1">${h1}</h1>
  <span class="legal-updated">${updated}</span>
  <p class="legal-lead">${leadHtml}</p>
</section>
<div class="wrap legal-layout">
<nav aria-label="On this page" class="legal-toc">
<span class="lbl">On this page</span>
${toc}
</nav>
<article class="legal">
${body}
</article>
</div>
</main>
<footer data-kpt-footer></footer>
<script src="/js/site.js" defer></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, name + '.html'), out, 'utf8');
  console.log('wrote ' + name + '.html (' + (EDITS[name] || []).length + ' wording edits)');
}

['risk', 'terms', 'privacy', 'sources'].forEach(page);
