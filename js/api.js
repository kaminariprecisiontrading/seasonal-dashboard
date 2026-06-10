/**
 * api.js — Shared Claude API call for all seasonal dashboards.
 * Streams the response token-by-token and renders final output as Markdown.
 * Results are cached in localStorage keyed to asset + ISO week number.
 *
 * Depends on:
 *   SEASONAL_DATA        — string defined in each asset's data file
 *   ASSET_CONFIG.id      — used as cache key prefix
 *   ASSET_CONFIG.ltLabel — used in loading message
 *
 * API key: add  'x-api-key': 'sk-ant-...'  to the headers object below.
 */

/* ─── Cache helpers ─────────────────────────────────────────────────────── */
function _isoWeek(date) {
  var d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  var jan4 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - jan4) / 86400000 - 3 + (jan4.getDay() + 6) % 7) / 7);
}

function _cacheKey() {
  var now = new Date();
  return 'kpt-ai-' + ASSET_CONFIG.id + '-' + now.getFullYear() + '-w' + _isoWeek(now);
}

function _cacheGet() {
  try { return localStorage.getItem(_cacheKey()); } catch (_) { return null; }
}

function _cacheSet(text) {
  try {
    // Prune any old entries for this asset (different week keys)
    var prefix = 'kpt-ai-' + ASSET_CONFIG.id + '-';
    var currentKey = _cacheKey();
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var k = localStorage.key(i);
      if (k && k.indexOf(prefix) === 0 && k !== currentKey) {
        localStorage.removeItem(k);
      }
    }
    localStorage.setItem(currentKey, text);
  } catch (_) { /* storage unavailable — ignore */ }
}

/* ─── Load marked.js dynamically (cached on window.marked) ─────────────── */
function _ensureMarked() {
  if (window.marked) return Promise.resolve();
  return new Promise(function (resolve, reject) {
    var s    = document.createElement('script');
    s.src    = 'https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js';
    s.onload = resolve;
    s.onerror = function () { reject(new Error('Failed to load marked.js from cdnjs')); };
    document.head.appendChild(s);
  });
}

/* ─── Inject hint text under the run button ─────────────────────────────── */
(function _injectHint() {
  // Wait for DOM to be ready (this file runs with defer)
  var btn = document.getElementById('run-btn');
  if (!btn) return;
  if (btn.parentElement.querySelector('.ai-hint')) return; // already injected
  var hint = document.createElement('div');
  hint.className = 'ai-hint';
  hint.textContent = '~10–15 sec · synthesises 5-YR, 15-YR and ' +
    (typeof ASSET_CONFIG !== 'undefined' ? ASSET_CONFIG.ltLabel : 'long-term') +
    ' data into a weekly bias · cached per week';
  btn.insertAdjacentElement('afterend', hint);
})();

/* ─── Load cached analysis on page open ─────────────────────────────────── */
(function _loadCache() {
  var cached = _cacheGet();
  if (!cached) return;
  var output = document.getElementById('ai-output');
  var btn    = document.getElementById('run-btn');
  if (!output || !btn) return;

  _ensureMarked().then(function () {
    output.innerHTML = window.marked.parse(cached);
    btn.textContent  = '↺  Cached — Re-run';
  }).catch(function () {
    output.textContent = cached; // fallback: plain text
    btn.textContent    = '↺  Cached — Re-run';
  });
})();

/* ─── Main analysis function ─────────────────────────────────────────────── */
async function runAnalysis() {
  var btn    = document.getElementById('run-btn');
  var output = document.getElementById('ai-output');

  btn.disabled     = true;
  btn.textContent  = '⟳  Analysing...';
  output.innerHTML = '<span class="loading">Running seasonal analysis across 5-YR, 15-YR and '
    + ASSET_CONFIG.ltLabel + ' data...</span>';

  try {
    await _ensureMarked();

    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-use': 'true'
        // 'x-api-key': 'YOUR_KEY_HERE'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2500,
        stream: true,
        messages: [{ role: 'user', content: SEASONAL_DATA }]
      })
    });

    if (!response.ok) {
      var errData = {};
      try { errData = await response.json(); } catch (_) {}
      throw new Error((errData.error && errData.error.message) || ('HTTP ' + response.status));
    }

    /* Read SSE stream */
    var reader  = response.body.getReader();
    var decoder = new TextDecoder();
    var buffer  = '';
    var full    = '';

    output.innerHTML = ''; // clear loading spinner

    while (true) {
      var chunk = await reader.read();
      if (chunk.done) break;

      buffer += decoder.decode(chunk.value, { stream: true });
      var lines = buffer.split('\n');
      buffer = lines.pop(); // hold incomplete trailing line

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.indexOf('data: ') !== 0) continue;
        var payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          var evt = JSON.parse(payload);
          if (evt.type === 'content_block_delta' &&
              evt.delta && evt.delta.type === 'text_delta') {
            full            += evt.delta.text;
            output.textContent = full;          // live plain-text preview
            output.scrollTop   = output.scrollHeight;
          }
        } catch (_) { /* skip malformed SSE chunks */ }
      }
    }

    /* Final render: Markdown → HTML */
    var rendered = window.marked.parse(full || 'No response received.');
    output.innerHTML = rendered;

    /* Save to cache */
    _cacheSet(full);

    btn.textContent  = '✓  Analysis Complete — Re-run';
    btn.disabled     = false;

  } catch (err) {
    output.textContent = 'Error: ' + err.message;
    btn.textContent    = '▶  Retry';
    btn.disabled       = false;
  }
}
