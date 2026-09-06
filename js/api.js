/**
 * api.js — AI Synthesis for seasonal dashboards (Phase 5)
 *
 * Provider-agnostic: Claude (Anthropic) · Gemini Flash (Google) · Ollama (local)
 *
 * Context gathered and passed to the model:
 *   · Seasonal summary — generated live from MONTHS[] by _buildSeasonalSummary()
 *                        (falls back to SEASONAL_DATA string if MONTHS unavailable)
 *   · Seasonal curve   — computed live from MONTHS[] (always available)
 *   · Backtest stats   — from localStorage kpt-bt-{id} if uploaded
 *   · Intraday bias    — from localStorage kpt-idt-{id} if uploaded (schemaVer 3)
 *
 * Provider config stored in localStorage (shared across all asset pages):
 *   kpt-cfg-provider   — 'claude' | 'gemini' | 'ollama'
 *   kpt-cfg-claude-key — Anthropic API key
 *   kpt-cfg-gemini-key — Google AI Studio API key
 *   kpt-cfg-ollama-url — Ollama base URL  (default: http://localhost:11434)
 *   kpt-cfg-ollama-mdl — Ollama model     (default: llama3.2)
 *
 * Analysis cache keyed per asset + provider + ISO week.
 * Load order: after data.js, before ui.js
 */

/* ─── Config helpers ─────────────────────────────────────────────────────── */

var _CFG = {
  get: function (k) { try { return localStorage.getItem('kpt-cfg-' + k) || null; } catch (_) { return null; } },
  set: function (k, v) { try { localStorage.setItem('kpt-cfg-' + k, v); } catch (_) {} }
};

function _getProvider()    { return _CFG.get('provider')   || 'claude'; }
function _getClaudeKey()   { return _CFG.get('claude-key') || ''; }
function _getGeminiKey()   { return _CFG.get('gemini-key') || ''; }
function _getOllamaUrl()   { return (_CFG.get('ollama-url') || 'http://localhost:11434').replace(/\/$/, ''); }
function _getOllamaModel() { return _CFG.get('ollama-mdl') || 'llama3.2'; }

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
  return 'kpt-ai-' + ASSET_CONFIG.id + '-' + _getProvider() + '-' + now.getFullYear() + '-w' + _isoWeek(now);
}

function _cacheGet() {
  try { return localStorage.getItem(_cacheKey()); } catch (_) { return null; }
}

function _cacheSet(text) {
  try {
    var prefix = 'kpt-ai-' + ASSET_CONFIG.id + '-';
    var cur    = _cacheKey();
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var k = localStorage.key(i);
      if (k && k.indexOf(prefix) === 0 && k !== cur) localStorage.removeItem(k);
    }
    localStorage.setItem(cur, text);
  } catch (_) {}
}

/* ─── Load marked.js dynamically ────────────────────────────────────────── */

function _ensureMarked() {
  if (window.marked) return Promise.resolve();
  return new Promise(function (resolve, reject) {
    var s    = document.createElement('script');
    s.src    = 'https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js';
    s.onload = resolve;
    s.onerror = function () { reject(new Error('Failed to load marked.js')); };
    document.head.appendChild(s);
  });
}

/* ─── Shared helpers ─────────────────────────────────────────────────────── */

var _MONTH_ABBR  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var _MONTH_NAMES = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

/* ─── Context gatherer: Seasonal Curve ───────────────────────────────────── */

function _gatherCurveCtx() {
  if (typeof MONTHS === 'undefined' || !Array.isArray(MONTHS) || MONTHS.length !== 12) return null;
  try {
    var now        = new Date();
    var todayMonth = now.getMonth();
    var todayDay   = now.getDate();
    var todayWk    = todayDay <= 7 ? 0 : todayDay <= 14 ? 1 : todayDay <= 21 ? 2 : 3;
    var todayIdx   = todayMonth * 4 + todayWk;

    function comDelta(s) {
      if (!s) return 0;
      var u = String(s).toUpperCase();
      if (u.indexOf('LONG')  !== -1) return  1;
      if (u.indexOf('SHORT') !== -1) return -1;
      return 0;
    }

    var v = 0, pts = [];
    MONTHS.forEach(function (m) {
      if (Array.isArray(m.weeks)) m.weeks.forEach(function (w) { v += comDelta(w.com); pts.push(v); });
    });

    if (!pts.length) return null;

    var idx    = Math.min(todayIdx, pts.length - 1);
    var curVal = pts[idx];
    var prev4  = pts[Math.max(0, idx - 4)];
    var trend4 = curVal - prev4;

    var maxVal  = Math.max.apply(null, pts);
    var minVal  = Math.min.apply(null, pts);
    var range   = maxVal - minVal || 1;
    var pctPos  = Math.round((curVal - minVal) / range * 100);

    var trendLabel = trend4 >  2 ? 'rising strongly' :
                     trend4 >  0 ? 'rising'           :
                     trend4 < -2 ? 'falling strongly' :
                     trend4 <  0 ? 'falling'          : 'flat';

    // Current week's combined signal text
    var curCom = '';
    try { curCom = String((MONTHS[todayMonth].weeks[todayWk] || {}).com || ''); } catch (_) {}

    return {
      position:   _MONTH_ABBR[todayMonth] + ' Wk' + (todayWk + 1),
      curVal:     curVal,
      curCom:     curCom,
      sign:       curVal > 0 ? 'above zero (net bullish YTD)' :
                  curVal < 0 ? 'below zero (net bearish YTD)' : 'at zero',
      trendLabel: trendLabel,
      trend4:     trend4,
      pctOfRange: pctPos
    };
  } catch (e) { return null; }
}

/* ─── Context gatherer: Backtest ─────────────────────────────────────────── */

function _gatherBacktestCtx(assetId) {
  try {
    var r = JSON.parse(localStorage.getItem('kpt-up-' + assetId) || 'null');
    var s = r && r.historyStats;
    if (!s || !s.matrix || !s.yearRange) return null;
    var slots = s.slots || 4;

    // Month-level win rates across all directional (non-chop) weeks
    // (slots === 1 for a Monthly-bar upload — a single "week" per month)
    var monthWR = [];
    for (var m = 0; m < 12; m++) {
      var wins = 0, total = 0;
      for (var w = 0; w < slots; w++) {
        var c = s.matrix[m][w];
        if (c && c.signal !== 'chop' && c.total > 0) { wins += c.wins; total += c.total; }
      }
      if (total > 0) monthWR.push({ month: _MONTH_ABBR[m], wr: wins / total, n: total });
    }
    monthWR.sort(function (a, b) { return b.wr - a.wr; });

    // Overall weighted win rate
    var allW = 0, allN = 0;
    monthWR.forEach(function (m) { allW += m.wr * m.n; allN += m.n; });

    // Monthly avg returns sorted
    var monthAvg = (s.monthlyAvg || []).map(function (v, i) {
      return { month: _MONTH_ABBR[i], avg: v };
    }).sort(function (a, b) { return b.avg - a.avg; });

    return {
      yearRange:    s.yearRange,
      yearsCount:   s.yearsCount,
      overallWR:    allN > 0 ? (allW / allN * 100).toFixed(1) : null,
      topWR:        monthWR.slice(0, 3),
      bottomWR:     monthWR.slice(-3).reverse(),
      bestReturn:   monthAvg.slice(0, 3),
      worstReturn:  monthAvg.slice(-3).reverse()
    };
  } catch (e) { return null; }
}

/* ─── Context gatherer: Intraday ─────────────────────────────────────────── */

function _gatherIntradayCtx(assetId) {
  try {
    var r = JSON.parse(localStorage.getItem('kpt-up-' + assetId) || 'null');
    var s = r && r.sessionStats;
    if (!s || !s.groups || !s.groups.all) return null;

    var grp = s.groups.all;

    // Session label maps matching corrected UTC+2 definitions in upload.js
    var sessDefs = s.tier === 'H4' ? [
      { id: 'lateNY',  label: 'Late NY/Sydney (00 broker / ~22 UTC)' },
      { id: 'asian',   label: 'Asian (04–08 broker / 02–06 UTC)'     },
      { id: 'london',  label: 'London (12 broker / 10 UTC)'          },
      { id: 'overlap', label: 'L/NY Overlap (16 broker / 14 UTC)'    },
      { id: 'ny',      label: 'New York (20 broker / 18 UTC)'        }
    ] : [
      { id: 'lateNY',  label: 'Late NY (00–01 broker / 22–23 UTC)'      },
      { id: 'asian',   label: 'Asian (02–09 broker / 00–07 UTC)'        },
      { id: 'london',  label: 'London (10–14 broker / 08–12 UTC)'       },
      { id: 'overlap', label: 'L/NY Overlap (15–18 broker / 13–16 UTC)' },
      { id: 'ny',      label: 'New York (19–22 broker / 17–20 UTC)'     },
      { id: 'late',    label: 'After-hours (23 broker / 21 UTC)'        }
    ];

    var sessArr = sessDefs.map(function (sd) {
      var slot = grp.sessions[sd.id];
      if (!slot || slot.count < 50) return null;  // skip sparse slots
      return { label: sd.label, avg: slot.sumRet / slot.count, pct: slot.posCount / slot.count * 100, n: slot.count };
    }).filter(Boolean).sort(function (a, b) { return b.avg - a.avg; });

    var DAY = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    var dowArr = [1, 2, 3, 4, 5].map(function (d) {
      var slot = grp.dow[d];
      if (!slot || slot.count < 50) return null;
      return { label: DAY[d], avg: slot.sumRet / slot.count, pct: slot.posCount / slot.count * 100, n: slot.count };
    }).filter(Boolean).sort(function (a, b) { return b.avg - a.avg; });

    return {
      tfType:       s.tier,
      totalBars:    s.meta.intradayBars,
      dateRange:    s.meta.firstDate + ' to ' + s.meta.lastDate,
      bestSession:  sessArr[0]  || null,
      worstSession: sessArr[sessArr.length - 1] || null,
      bestDow:      dowArr[0]   || null,
      worstDow:     dowArr[dowArr.length - 1]   || null
    };
  } catch (e) { return null; }
}

/* ─── Context gatherer: Market Profiling ─────────────────────────────────── */
// Reads window.KPT_PROFILING_CURRENT, set by js/profiling.js only on the
// handful of pages with ported Profiling data (see MARKET_PROFILING_INTEGRATION.md).
// Returns null on every other page — same optional-layer pattern as backtest/intraday.

function _gatherProfilingCtx() {
  try {
    var cur = window.KPT_PROFILING_CURRENT;
    if (!cur || !cur.bundle) return null;
    var b = cur.bundle;
    var dist = b.profiles && b.profiles.profile_distribution;
    if (!dist) return null;

    var entries = Object.keys(dist).map(function (k) { return [k, dist[k]]; })
      .sort(function (a, c) { return c[1].n - a[1].n; });
    var mostCommon = entries[0];

    var timing = (b.profiles.extreme_timing_by_profile || {})[mostCommon ? mostCommon[0] : ''];
    var topTiming = timing
      ? Object.keys(timing).map(function (k) { return [k, timing[k]]; }).sort(function (a, c) { return c[1] - a[1]; })[0]
      : null;

    var s = b.stats || {};
    var fullDaily = s.daily_range && s.daily_range.windowed_distribution && s.daily_range.windowed_distribution.full;
    var adr20 = s.daily_range && s.daily_range.latest_adr && s.daily_range.latest_adr.ADR_20;

    return {
      asOf:               cur.asOf || s.as_of || null,
      medianDailyRange:   fullDaily ? fullDaily.median : null,
      adr20:              adr20 != null ? adr20 : null,
      mostCommonProfile:  mostCommon ? { name: mostCommon[0], pct: mostCommon[1].pct } : null,
      topTiming:          topTiming ? topTiming[0] : null
    };
  } catch (e) { return null; }
}

/* ─── Dynamic seasonal summary (replaces static SEASONAL_DATA string) ────── */
// Generates a structured month-by-month text from MONTHS[] so the AI context
// always reflects the current data file and can never drift from MONTHS[].
// Falls back to SEASONAL_DATA if MONTHS is unavailable (e.g. very old pages).

function _buildSeasonalSummary() {
  if (typeof MONTHS === 'undefined' || !Array.isArray(MONTHS) || MONTHS.length !== 12) {
    // Fallback to the static string if MONTHS is not available
    return typeof SEASONAL_DATA !== 'undefined' ? SEASONAL_DATA : '[Seasonal data not available]';
  }

  var cfg      = typeof ASSET_CONFIG !== 'undefined' ? ASSET_CONFIG : {};
  var ltLabel  = cfg.ltLabel  || 'LT';
  var ltKey    = cfg.ltKey    || 's34';
  var lines    = [];

  lines.push('Asset: ' + (cfg.name || 'Unknown'));
  lines.push('Timeframes: 5-YR  ·  15-YR  ·  ' + ltLabel);
  lines.push('');
  lines.push('Month-by-month combined bias (all 12 months, Wk1–4 detail):');

  MONTHS.forEach(function (m) {
    if (!m) return;

    // Stars: count ★ characters
    var starCount = typeof m.stars === 'number' ? m.stars : 0;
    var stars     = '★'.repeat(starCount) + '☆'.repeat(Math.max(0, 5 - starCount));

    lines.push('');
    lines.push(String(m.month || '').toUpperCase() +
               '  Combined: ' + (m.combinedLabel || m.combined || '?').toUpperCase() +
               '  ' + stars +
               (m.note ? '  — ' + m.note : ''));

    if (Array.isArray(m.weeks)) {
      m.weeks.forEach(function (w) {
        var s5  = (w.s5  || '—').substring(0, 4);  // bull/bear/chop/flip → 4 chars
        var s15 = (w.s15 || '—').substring(0, 4);
        var sLt = (w[ltKey] || '—').substring(0, 4);
        var com = (w.com || '').replace(/[★☆]+/, '').trim();
        var note = w.note ? ' | ' + w.note : '';
        lines.push('  ' + (w.wk || '') + ':  5YR=' + s5 +
                   '  15YR=' + s15 + '  ' + ltLabel + '=' + sLt +
                   '  → ' + com + note);
      });
    }
  });

  return lines.join('\n');
}

/* ─── Prompt builder ─────────────────────────────────────────────────────── */

function _buildPrompt(curveCtx, btCtx, idtCtx, profCtx) {
  var now = new Date();
  var wk  = now.getDate() <= 7 ? 1 : now.getDate() <= 14 ? 2 : now.getDate() <= 21 ? 3 : 4;
  var L   = [];

  var assetName = typeof ASSET_CONFIG !== 'undefined' ? ASSET_CONFIG.name : 'this asset';

  L.push('You are a professional seasonal trading analyst. Produce a structured synthesis for ' + assetName + '.');
  L.push('Date context: ' + _MONTH_NAMES[now.getMonth()] + ' Week ' + wk + ', ' + now.getFullYear());
  L.push('');
  L.push('=== SEASONAL DATA ===');
  L.push(_buildSeasonalSummary());

  if (curveCtx) {
    L.push('');
    L.push('=== SEASONAL CURVE POSITION ===');
    L.push('Now:           ' + curveCtx.position + '  |  Signal: ' + (curveCtx.curCom || '—'));
    L.push('Curve value:   ' + curveCtx.curVal + ' (' + curveCtx.sign + ')');
    L.push('4-week trend:  ' + curveCtx.trendLabel + ' (' + (curveCtx.trend4 >= 0 ? '+' : '') + curveCtx.trend4 + ' units over last 4 weeks)');
    L.push('Annual range:  ' + curveCtx.pctOfRange + '% of full-year range (0 = annual low, 100 = annual high)');
  }

  if (btCtx) {
    L.push('');
    L.push('=== HISTORICAL BACKTEST (' + btCtx.yearRange[0] + '–' + btCtx.yearRange[1] + ', ' + btCtx.yearsCount + ' years) ===');
    if (btCtx.overallWR)       L.push('Overall signal win rate: ' + btCtx.overallWR + '%');
    if (btCtx.topWR.length)    L.push('Highest-accuracy months: ' + btCtx.topWR.map(function (m) {
      return m.month + ' (' + (m.wr * 100).toFixed(0) + '%)';
    }).join(', '));
    if (btCtx.bottomWR.length) L.push('Lowest-accuracy months:  ' + btCtx.bottomWR.map(function (m) {
      return m.month + ' (' + (m.wr * 100).toFixed(0) + '%)';
    }).join(', '));
    if (btCtx.bestReturn.length) L.push('Best avg-return months:  ' + btCtx.bestReturn.map(function (m) {
      return m.month + ' (' + (m.avg >= 0 ? '+' : '') + m.avg.toFixed(3) + '%)';
    }).join(', '));
    if (btCtx.worstReturn.length) L.push('Worst avg-return months: ' + btCtx.worstReturn.map(function (m) {
      return m.month + ' (' + (m.avg >= 0 ? '+' : '') + m.avg.toFixed(3) + '%)';
    }).join(', '));
  }

  if (idtCtx) {
    L.push('');
    L.push('=== INTRADAY SESSION BIAS (' + idtCtx.tfType + ' · ' + idtCtx.totalBars.toLocaleString() + ' bars · ' + idtCtx.dateRange + ') ===');
    if (idtCtx.bestSession)  L.push('Strongest session: ' + idtCtx.bestSession.label  +
      ' | avg ' + (idtCtx.bestSession.avg  >= 0 ? '+' : '') + idtCtx.bestSession.avg.toFixed(4)  + '%' +
      ' | ' + idtCtx.bestSession.pct.toFixed(0)  + '% positive');
    if (idtCtx.worstSession) L.push('Weakest session:   ' + idtCtx.worstSession.label +
      ' | avg ' + (idtCtx.worstSession.avg >= 0 ? '+' : '') + idtCtx.worstSession.avg.toFixed(4) + '%' +
      ' | ' + idtCtx.worstSession.pct.toFixed(0) + '% positive');
    if (idtCtx.bestDow)  L.push('Strongest day: ' + idtCtx.bestDow.label  +
      ' | avg ' + (idtCtx.bestDow.avg  >= 0 ? '+' : '') + idtCtx.bestDow.avg.toFixed(4)  + '%' +
      ' | ' + idtCtx.bestDow.pct.toFixed(0)  + '% positive');
    if (idtCtx.worstDow) L.push('Weakest day:   ' + idtCtx.worstDow.label +
      ' | avg ' + (idtCtx.worstDow.avg >= 0 ? '+' : '') + idtCtx.worstDow.avg.toFixed(4) + '%' +
      ' | ' + idtCtx.worstDow.pct.toFixed(0) + '% positive');
  }

  if (profCtx) {
    L.push('');
    L.push('=== MARKET PROFILING (statistical, pre-computed' + (profCtx.asOf ? ', data as of ' + profCtx.asOf : '') + ') ===');
    if (profCtx.medianDailyRange != null) L.push('Median daily range: ' + profCtx.medianDailyRange + ' pips' + (profCtx.adr20 != null ? ' (20-day ADR: ' + profCtx.adr20 + ' pips)' : ''));
    if (profCtx.mostCommonProfile) L.push('Most common daily shape: ' + profCtx.mostCommonProfile.name + ' (' + profCtx.mostCommonProfile.pct + '% of days)');
    if (profCtx.topTiming) L.push('Dominant extreme-timing pattern: ' + profCtx.topTiming.replace(/_/g, ' '));
  }

  L.push('');
  L.push('=== REQUIRED OUTPUT FORMAT ===');
  L.push('Produce the following structure exactly. Do not add extra sections or change the headings.');
  L.push('');
  L.push('## VERDICT: [LONG / SHORT / NEUTRAL / WAIT]');
  L.push('One sentence stating the overall bias for this period and the primary reason.');
  L.push('');
  L.push('| Layer | Reading | Notes |');
  L.push('|---|---|---|');
  L.push('| Seasonal Signal | [current week combined signal + star rating] | [brief context] |');
  L.push('| Historical Accuracy | [overall win rate % — or N/A if no backtest data] | [most vs least reliable months] |');
  L.push('| Curve Position | [rising/falling/flat + above/below zero] | [what the seasonal arc implies] |');
  L.push('| Best Entry Window | [top session + top day of week — or N/A if no intraday data] | [timing note] |');
  L.push('| Key Risk | [main conflicting signal or caveat] | [what would invalidate the bias] |');
  L.push('');
  L.push('**3-Month Outlook**: One sentence per month for the next three calendar months.');
  L.push('Cover signal direction, any notable shifts, and whether historical accuracy is high or low in that period.');
  L.push('');
  L.push('**Trade Notes**');
  L.push('- [Entry timing note — when in the week/session to look for entries]');
  L.push('- [Signal strength note — how many timeframes align, any divergences]');
  L.push('- [Risk note — any seasonal/historical conflict or reason for caution]');
  L.push('');
  L.push('Be concise and data-driven. No padding. If a data layer is unavailable, mark it N/A and move on.');

  return L.join('\n');
}

/* ─── Provider: Claude (Anthropic SSE stream) ────────────────────────────── */

async function _callClaude(prompt, output) {
  var key = _getClaudeKey();
  if (!key) throw new Error('No Claude API key set — click ⚙ Settings to add one.');

  var resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-use': 'true',
      'x-api-key': key
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 2500,
      stream: true,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!resp.ok) {
    var err = {}; try { err = await resp.json(); } catch (_) {}
    throw new Error((err.error && err.error.message) || 'HTTP ' + resp.status);
  }

  return _readSSE(resp, output, function (evt) {
    if (evt.type === 'content_block_delta' && evt.delta && evt.delta.type === 'text_delta') {
      return evt.delta.text;
    }
    return '';
  });
}

/* ─── Provider: Gemini Flash (Google SSE stream) ─────────────────────────── */

async function _callGemini(prompt, output) {
  var key = _getGeminiKey();
  if (!key) throw new Error('No Gemini API key set — click ⚙ Settings to add one.');

  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent' +
            '?alt=sse&key=' + encodeURIComponent(key);

  var resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 2500, temperature: 0.3 }
    })
  });

  if (!resp.ok) {
    var err = {}; try { err = await resp.json(); } catch (_) {}
    throw new Error((err.error && err.error.message) || 'HTTP ' + resp.status);
  }

  return _readSSE(resp, output, function (evt) {
    try {
      var parts = evt.candidates[0].content.parts;
      return (parts && parts[0] && parts[0].text) ? parts[0].text : '';
    } catch (_) { return ''; }
  });
}

/* ─── Provider: Ollama (local NDJSON stream) ─────────────────────────────── */

async function _callOllama(prompt, output) {
  var url   = _getOllamaUrl() + '/api/generate';
  var model = _getOllamaModel();

  var resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: model, prompt: prompt, stream: true })
  });

  if (!resp.ok) {
    var err = {}; try { err = await resp.json(); } catch (_) {}
    throw new Error((err.error || 'HTTP ' + resp.status + ' — is Ollama running?'));
  }

  // Ollama streams NDJSON (newline-delimited JSON), not SSE
  var reader = resp.body.getReader();
  var dec    = new TextDecoder();
  var buf    = '', full = '';
  output.innerHTML = '';

  while (true) {
    var chunk = await reader.read();
    if (chunk.done) break;
    buf += dec.decode(chunk.value, { stream: true });
    var lines = buf.split('\n'); buf = lines.pop();
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i].trim();
      if (!ln) continue;
      try {
        var evt = JSON.parse(ln);
        if (evt.response) {
          full += evt.response;
          output.textContent = full;
          output.scrollTop   = output.scrollHeight;
        }
      } catch (_) {}
    }
  }
  return full;
}

/* ─── Shared SSE reader (Claude + Gemini) ────────────────────────────────── */

async function _readSSE(resp, output, extractor) {
  var reader = resp.body.getReader();
  var dec    = new TextDecoder();
  var buf    = '', full = '';
  output.innerHTML = '';

  while (true) {
    var chunk = await reader.read();
    if (chunk.done) break;
    buf += dec.decode(chunk.value, { stream: true });
    var lines = buf.split('\n'); buf = lines.pop();

    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (ln.indexOf('data: ') !== 0) continue;
      var pay = ln.slice(6).trim();
      if (!pay || pay === '[DONE]') continue;
      try {
        var text = extractor(JSON.parse(pay));
        if (text) {
          full += text;
          output.textContent = full;
          output.scrollTop   = output.scrollHeight;
        }
      } catch (_) {}
    }
  }
  return full;
}

/* ─── UI Injection ───────────────────────────────────────────────────────── */

(function _injectUI() {
  var btn = document.getElementById('run-btn');
  if (!btn) return;
  var panel = btn.closest('.ai-panel') || btn.parentElement;

  /* Provider selector row */
  var provRow = document.createElement('div');
  provRow.className = 'ai-provider-row';
  provRow.innerHTML = [
    '<span class="ai-provider-label">Provider</span>',
    '<div class="ai-provider-btns" id="ai-prov-btns">',
    '  <button class="ai-provider-btn" data-prov="claude">Claude</button>',
    '  <button class="ai-provider-btn" data-prov="gemini">Gemini 2.0 Flash</button>',
    '  <button class="ai-provider-btn" data-prov="ollama">Ollama</button>',
    '</div>',
    '<button class="ai-settings-toggle" id="ai-settings-toggle" title="API key settings">⚙ Settings</button>'
  ].join('');

  /* Settings panel */
  var settingsPanel = document.createElement('div');
  settingsPanel.id        = 'ai-settings-panel';
  settingsPanel.className = 'ai-settings-panel';
  settingsPanel.style.display = 'none';
  settingsPanel.innerHTML = [
    '<div class="ai-settings-grid">',
    '  <label class="ai-sett-label">Claude API key</label>',
    '  <input class="ai-sett-input" id="ai-claude-key" type="password" placeholder="sk-ant-api03-...">',
    '  <label class="ai-sett-label">Gemini API key</label>',
    '  <input class="ai-sett-input" id="ai-gemini-key" type="password" placeholder="AIza...">',
    '  <label class="ai-sett-label">Ollama URL</label>',
    '  <input class="ai-sett-input" id="ai-ollama-url" type="text" placeholder="http://localhost:11434">',
    '  <label class="ai-sett-label">Ollama model</label>',
    '  <input class="ai-sett-input" id="ai-ollama-mdl" type="text" placeholder="llama3.2">',
    '</div>',
    '<div class="ai-sett-footer">',
    '  <button class="ai-sett-save" id="ai-sett-save">Save</button>',
    '  <span class="ai-sett-saved" id="ai-sett-saved" style="display:none;">✓ Saved</span>',
    '  <span class="ai-sett-note">Keys stored in browser localStorage · never sent to this server</span>',
    '</div>'
  ].join('');

  /* Context availability bar */
  var ctxBar = document.createElement('div');
  ctxBar.id        = 'ai-ctx-bar';
  ctxBar.className = 'ai-ctx-bar';

  /* Hint text */
  var hint = document.createElement('div');
  hint.className = 'ai-hint';
  hint.id        = 'ai-hint-text';

  /* Insert before the run button */
  panel.insertBefore(provRow,       btn);
  panel.insertBefore(settingsPanel, btn);
  panel.insertBefore(ctxBar,        btn);
  panel.insertBefore(hint,          btn);

  /* ── Provider display names ── */
  function _providerLabel(prov) {
    if (prov === 'gemini') return 'Gemini 2.0 Flash';
    if (prov === 'ollama') return 'Ollama · ' + _getOllamaModel();
    return 'Claude Sonnet 5';
  }

  /* ── Update panel headings to reflect active provider ── */
  function _updatePanelHeadings(prov) {
    // Section label: "Claude AI — Week-by-Week Bias Analysis" → generic
    // Find the .section-label that precedes (or is inside) the ai-panel
    var aiPanel  = document.querySelector('.ai-panel');
    var sectLabel = aiPanel && aiPanel.previousElementSibling;
    while (sectLabel && !sectLabel.classList.contains('section-label')) {
      sectLabel = sectLabel.previousElementSibling;
    }
    if (sectLabel) {
      // Preserve the coloured dot <span> and replace only the text node
      var dot = sectLabel.querySelector('span');
      sectLabel.textContent = ' Seasonal Bias Analysis';
      if (dot) sectLabel.insertBefore(dot, sectLabel.firstChild);
    }

    // ai-label subtitle: "Claude Sonnet · Live Analysis" → active provider name
    var aiLabel = document.querySelector('.ai-panel .ai-label');
    if (aiLabel) {
      aiLabel.textContent = _providerLabel(prov) + ' · Live Analysis';
    }
  }

  /* ── Wire provider buttons ── */
  function setProvider(prov) {
    _CFG.set('provider', prov);
    document.querySelectorAll('.ai-provider-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.prov === prov);
    });
    _updatePanelHeadings(prov);
    _updateHint(prov);
  }

  document.getElementById('ai-prov-btns').addEventListener('click', function (e) {
    var b = e.target.closest('.ai-provider-btn');
    if (b) setProvider(b.dataset.prov);
  });

  /* ── Wire settings toggle ── */
  document.getElementById('ai-settings-toggle').addEventListener('click', function () {
    var p      = document.getElementById('ai-settings-panel');
    var isOpen = p.style.display !== 'none';
    p.style.display = isOpen ? 'none' : '';
    if (!isOpen) {
      // Populate fields on open
      document.getElementById('ai-claude-key').value = _getClaudeKey();
      document.getElementById('ai-gemini-key').value = _getGeminiKey();
      document.getElementById('ai-ollama-url').value = _CFG.get('ollama-url') || '';
      document.getElementById('ai-ollama-mdl').value = _CFG.get('ollama-mdl') || '';
    }
  });

  /* ── Wire save button ── */
  document.getElementById('ai-sett-save').addEventListener('click', function () {
    _CFG.set('claude-key', document.getElementById('ai-claude-key').value.trim());
    _CFG.set('gemini-key', document.getElementById('ai-gemini-key').value.trim());
    var url = document.getElementById('ai-ollama-url').value.trim();
    var mdl = document.getElementById('ai-ollama-mdl').value.trim();
    if (url) _CFG.set('ollama-url', url);
    if (mdl) _CFG.set('ollama-mdl', mdl);

    var saved = document.getElementById('ai-sett-saved');
    saved.style.display = '';
    setTimeout(function () { saved.style.display = 'none'; }, 2000);

    // Refresh headings + hint in case Ollama model name changed
    _updatePanelHeadings(_getProvider());
    _updateHint(_getProvider());
    _updateCtxBar();
  });

  /* ── Hint text updater ── */
  function _updateHint(prov) {
    var el = document.getElementById('ai-hint-text');
    if (!el) return;
    var provLabel = prov === 'gemini' ? 'Gemini 2.0 Flash (Google)' :
                    prov === 'ollama' ? 'Ollama (local — ' + _getOllamaModel() + ')' :
                                       'Claude (Anthropic)';
    el.textContent = provLabel + ' · seasonal + curve + backtest + session + profiling context · cached per week';
  }

  /* ── Context availability bar ── */
  function _updateCtxBar() {
    var bar = document.getElementById('ai-ctx-bar');
    if (!bar) return;
    var id    = typeof ASSET_CONFIG !== 'undefined' ? ASSET_CONFIG.id : '';
    var hasBt = !!(function () {
      try { return localStorage.getItem('kpt-bt-' + id); } catch (_) { return false; }
    }());
    var hasIdt = (function () {
      try {
        var parsed = JSON.parse(localStorage.getItem('kpt-idt-' + id) || 'null');
        return !!(parsed && parsed.schemaVer === 3);
      } catch (_) { return false; }
    }());
    var hasProf = !!(window.KPT_PROFILING_CURRENT && window.KPT_PROFILING_CURRENT.bundle);

    function chip(label, ok, title) {
      return '<span class="ai-ctx-chip' + (ok ? ' ai-ctx-ok' : ' ai-ctx-na') + '" title="' + (title || '') + '">' +
        (ok ? '✓' : '○') + '&nbsp;' + label + '</span>';
    }

    bar.innerHTML =
      '<span class="ai-ctx-label">Context included:</span>' +
      chip('Seasonal',  true,  'Always included — from the seasonal data file') +
      chip('Curve',     true,  'Always included — computed from MONTHS[] data') +
      chip('History',   hasBt, hasBt  ? 'Backtest stats loaded from localStorage'   : 'Upload a D1 CSV on the History tab to include') +
      chip('Sessions',  hasIdt, hasIdt ? 'Intraday session data loaded from localStorage' : 'Upload an H1/H4 CSV on the Sessions tab to include') +
      chip('Profiling', hasProf, hasProf ? 'Pre-computed Market Profiling stats for this asset' : 'Not available for this asset');
  }

  /* Initialise */
  setProvider(_getProvider());
  _updateCtxBar();
  window._kptUpdateCtxBar = _updateCtxBar; // expose so other tabs can refresh it
}());

/* ─── Load cached analysis on page open ─────────────────────────────────── */

(function _loadCache() {
  var cached = _cacheGet();
  if (!cached) return;
  var output = document.getElementById('ai-output');
  var btn    = document.getElementById('run-btn');
  if (!output || !btn) return;

  function _showCached(text) {
    btn.textContent = '↺  Cached — Re-run';
    // Inject a clear-cache button above the output
    var existingClearBar = document.getElementById('ai-cache-bar');
    if (!existingClearBar) {
      var bar = document.createElement('div');
      bar.id = 'ai-cache-bar';
      bar.className = 'ai-cache-bar';
      bar.innerHTML =
        '<span class="ai-cache-note">Cached result for this week</span>' +
        '<button class="ai-cache-clear-btn" id="ai-cache-clear">✕ Clear &amp; re-run</button>';
      output.parentNode.insertBefore(bar, output);
      document.getElementById('ai-cache-clear').addEventListener('click', function () {
        try { localStorage.removeItem(_cacheKey()); } catch(_) {}
        bar.remove();
        output.innerHTML = '';
        btn.textContent = '▶  Run Analysis';
        runAnalysis();
      });
    }
  }

  _ensureMarked().then(function () {
    output.innerHTML = window.marked.parse(cached);
    _showCached(cached);
  }).catch(function () {
    output.textContent = cached;
    _showCached(cached);
  });
}());

/* ─── Main analysis function ─────────────────────────────────────────────── */

async function runAnalysis() {
  var btn    = document.getElementById('run-btn');
  var output = document.getElementById('ai-output');
  var prov   = _getProvider();
  var id     = typeof ASSET_CONFIG !== 'undefined' ? ASSET_CONFIG.id : '';

  /* Gather all available context */
  var curveCtx = _gatherCurveCtx();
  var btCtx    = _gatherBacktestCtx(id);
  var idtCtx   = _gatherIntradayCtx(id);
  var profCtx  = _gatherProfilingCtx();

  /* Build the enriched prompt */
  var prompt = _buildPrompt(curveCtx, btCtx, idtCtx, profCtx);

  /* Loading state */
  var provLabel = prov === 'gemini' ? 'Gemini 2.0 Flash' : prov === 'ollama' ? 'Ollama' : 'Claude';
  var ctxLayers = ['seasonal', 'curve'];
  if (btCtx)   ctxLayers.push('backtest');
  if (idtCtx)  ctxLayers.push('session');
  if (profCtx) ctxLayers.push('profiling');

  btn.disabled    = true;
  btn.textContent = '⟳  Analysing via ' + provLabel + '...';
  output.innerHTML = '<span class="loading">Synthesising ' + ctxLayers.join(' · ') + ' data via ' + provLabel + '...</span>';

  try {
    await _ensureMarked();

    var full;
    if (prov === 'gemini') {
      full = await _callGemini(prompt, output);
    } else if (prov === 'ollama') {
      full = await _callOllama(prompt, output);
    } else {
      full = await _callClaude(prompt, output);
    }

    if (!full || !full.trim()) throw new Error('No response received from ' + provLabel + '. Check your API key and try again.');

    /* Final markdown render */
    output.innerHTML = window.marked.parse(full);
    _cacheSet(full);

    btn.textContent = '✓  Analysis complete — Re-run';
    btn.disabled    = false;

  } catch (err) {
    output.innerHTML = '<span style="color:#ef4444;font-size:12px;">⚠ ' + err.message + '</span>';
    btn.textContent  = '▶  Retry';
    btn.disabled     = false;
  }
}
