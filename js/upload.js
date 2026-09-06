/**
 * upload.js — Unified price-history upload tool (Tier 4 merge of the former
 * backtest.js "History" tab and intraday.js "Sessions" tab).
 *
 * One CSV upload, one shared parser/timeframe detector spanning any
 * granularity from M1 (1-minute) through MN1 (Monthly) bars. The detector
 * measures the median gap between consecutive bar timestamps (in minutes)
 * and matches it to the nearest standard timeframe — robust to weekend/
 * holiday gaps since a median ignores the minority of oversized deltas.
 *
 * Two independent views, shown only when the uploaded tier supports them:
 *   - Seasonal Tendency (ex-Backtest): raw up-frequency, win-rate vs the
 *     seasonal model, and average return per (month, week-of-month) slot.
 *     Available for every tier. M1–D1 bars are first aggregated to one
 *     close per calendar day; W1 bars are used as-is (already one bar per
 *     week); MN1 bars collapse the week-of-month axis to a single "Month"
 *     slot (disclosed in the UI) since a monthly bar carries no intra-month
 *     resolution to validate a week-of-month signal against.
 *   - Intraday Timing (ex-Sessions): average return by hour of day, by
 *     session (Asian/London/Overlap/NY), and by day of week. Only possible
 *     for sub-daily tiers (M1–H4) — D1/W1/MN1 uploads simply don't render
 *     this view, same "show whichever sections the data supports" rule.
 *
 * Depends on: ASSET_CONFIG.id, MONTHS[] (loaded before this script).
 * Must load BEFORE ui.js so the injected <section data-kpt-panel="upload">
 * exists when ui.js scans for [data-kpt-panel] elements.
 *
 * Exposes: window.kptUpRefresh() — called by ui.js on Upload tab activation
 * to resize whichever Chart.js canvas is currently visible.
 *
 * Storage: kpt-up-{id} (schemaVer 1) holds the full computed result — tier,
 * meta, historyStats, sessionStats. This is a clean key, not a migration of
 * the old kpt-bt-{id}/kpt-idt-{id} caches, which go inert once backtest.js/
 * intraday.js are removed. kpt-tz-{id} (broker UTC offset) is reused as-is.
 */
(function () {
  'use strict';

  if (typeof ASSET_CONFIG === 'undefined' || typeof MONTHS === 'undefined') return;

  var ASSET_ID  = ASSET_CONFIG.id;
  var STORE_KEY = 'kpt-up-' + ASSET_ID;
  var TZ_KEY    = 'kpt-tz-' + ASSET_ID;

  var MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DAY_NAMES  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /* ── Broker UTC offset (session hour buckets are defined in EET/UTC+2) ──── */
  function _getBrokerOffset() {
    try { var v = parseInt(localStorage.getItem(TZ_KEY), 10); if (!isNaN(v)) return v; } catch (_) {}
    return 2;
  }
  function _saveBrokerOffset(v) { try { localStorage.setItem(TZ_KEY, String(v)); } catch (_) {} }
  function _normHour(rawHour) { return (rawHour - (_getBrokerOffset() - 2) + 24) % 24; }

  /* ── Session definitions (broker server time, EET winter baseline) ──────── */
  var SESSIONS_H1 = [
    { id: 'lateNY',  label: 'Late NY',      sublabel: '00–01', color: 'rgba(148,163,184,0.07)', hours: [0, 1] },
    { id: 'asian',   label: 'Asian',        sublabel: '02–09', color: 'rgba(59,130,246,0.1)',   hours: [2,3,4,5,6,7,8,9] },
    { id: 'london',  label: 'London',       sublabel: '10–14', color: 'rgba(245,158,11,0.1)',   hours: [10,11,12,13,14] },
    { id: 'overlap', label: 'L/NY Overlap', sublabel: '15–18', color: 'rgba(167,139,250,0.14)', hours: [15,16,17,18] },
    { id: 'ny',      label: 'New York',     sublabel: '19–22', color: 'rgba(34,197,94,0.1)',    hours: [19,20,21,22] },
    { id: 'late',    label: 'After-hours',  sublabel: '23',    color: 'rgba(148,163,184,0.04)', hours: [23] }
  ];
  var SESSIONS_H4 = [
    { id: 'lateNY',  label: 'Late NY / Sydney', sublabel: '00',    color: 'rgba(148,163,184,0.07)', hours: [0] },
    { id: 'asian',   label: 'Asian',            sublabel: '04–08', color: 'rgba(59,130,246,0.1)',   hours: [4, 8] },
    { id: 'london',  label: 'London',           sublabel: '12',    color: 'rgba(245,158,11,0.1)',   hours: [12] },
    { id: 'overlap', label: 'L/NY Overlap',     sublabel: '16',    color: 'rgba(167,139,250,0.14)', hours: [16] },
    { id: 'ny',      label: 'New York',         sublabel: '20',    color: 'rgba(34,197,94,0.1)',    hours: [20] }
  ];

  /* ── Timeframe tiers, in minutes, nearest-match by relative error ───────── */
  var TIERS = [
    { id: 'M1',  minutes: 1 },
    { id: 'M5',  minutes: 5 },
    { id: 'M15', minutes: 15 },
    { id: 'M30', minutes: 30 },
    { id: 'H1',  minutes: 60 },
    { id: 'H4',  minutes: 240 },
    { id: 'D1',  minutes: 1440 },
    { id: 'W1',  minutes: 10080 },
    { id: 'MN1', minutes: 43200 }
  ];
  var SUB_DAILY_TIERS = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4'];

  /* ── State ────────────────────────────────────────────────────────────── */
  var activeFilter    = 'all';
  var activeView       = 'history';
  var lastResult        = null;
  var btChartInstance  = null;
  var idtChartInstance = null;

  /* ─── 1. Inject the Upload panel ─────────────────────────────────────────── */

  var section = document.createElement('section');
  section.id               = 'upload-section';
  section.className        = 'up-panel';
  section.dataset.kptPanel = 'upload';

  section.innerHTML = [

    /* ── Upload area ── */
    '<div id="up-upload-area" class="bt-upload-area">',
    '  <div class="section-label"><span style="background:var(--chop)"></span> Price History Upload</div>',
    '  <p class="bt-desc">Upload a CSV export from MetaTrader 5 — any granularity from 1-minute up to Monthly bars is supported. Daily-and-coarser data validates the seasonal model week by week and month by month; 1-minute-through-H4 data additionally reveals intraday hour/session/day-of-week timing.</p>',
    '  <ol class="bt-upload-steps">',
    '    <li>Open <strong>MetaTrader 5</strong></li>',
    '    <li>On the top menu bar, click <strong>View → Symbols</strong></li>',
    '    <li>Inside the Symbols window, go to the <strong>Bars</strong> tab</li>',
    '    <li>Select your <strong>asset</strong>, set any timeframe from <strong>M1 to MN1</strong>, choose a <strong>start</strong> and <strong>end date</strong>, then click <strong>Request</strong></li>',
    '    <li>Once the bars load, click <strong>Export Bars</strong> in the bottom toolbar of the window</li>',
    '    <li>Save the file to a location you can find easily (e.g. your <strong>Downloads</strong> folder)</li>',
    '    <li>Click <strong>Choose CSV</strong> below and navigate to the saved file to upload it</li>',
    '  </ol>',
    '  <label class="bt-upload-btn" id="up-upload-label">',
    '    <input type="file" id="up-file-input" accept=".csv,.txt" style="display:none">',
    '    ↑ &nbsp;Choose CSV',
    '  </label>',
    '  <p class="bt-hint">Tab- or comma-separated MT5 export &nbsp;·&nbsp; any timeframe M1–MN1 &nbsp;·&nbsp; 10+ years recommended for daily-and-coarser data</p>',
    '  <div class="idt-tz-row">',
    '    <label class="idt-tz-label" for="up-tz-select">Broker server time (UTC offset):</label>',
    '    <select class="idt-tz-select" id="up-tz-select">',
    '      <option value="0">UTC+0</option>',
    '      <option value="1">UTC+1</option>',
    '      <option value="2" selected>UTC+2 (EET winter — default)</option>',
    '      <option value="3">UTC+3 (EET summer / Moscow)</option>',
    '    </select>',
    '    <span class="idt-tz-note">Only affects intraday hour/session buckets on sub-daily uploads (M1–H4). Change this if your broker uses a different offset.</span>',
    '  </div>',
    '</div>',

    /* ── Results panel ── */
    '<div id="up-results" class="bt-results" style="display:none">',

    '  <div id="up-summary" class="bt-summary"></div>',

    '  <div id="up-view-switch" class="up-view-switch" hidden>',
    '    <button class="up-view-btn active" data-view="history">Seasonal Tendency</button>',
    '    <button class="up-view-btn" data-view="session">Intraday Timing</button>',
    '  </div>',

    /* ═══ View: Seasonal Tendency (ex-Backtest) ═══ */
    '  <div id="up-view-history" class="up-view-panel">',

    '    <p id="up-mn1-note" class="bt-note" hidden>Monthly-bar upload — showing month-level tendency only. A single bar per month carries no week-of-month resolution, so Sections 1–2 (which are shaped around week-of-month slots) aren\'t meaningful here; only the average monthly return below applies.</p>',

    '    <div id="up-hist-sections">',
    '    <div class="bt-section-title">',
    '      1. Raw Price Tendency',
    '      <span class="bt-legend">',
    '        <span class="bt-leg-item bt-leg-bull">■ ≥60% up</span>',
    '        <span class="bt-leg-item bt-leg-mid">■ 40–59%</span>',
    '        <span class="bt-leg-item bt-leg-bear">■ ≤39% up</span>',
    '      </span>',
    '    </div>',
    '    <details class="bt-desc-toggle">',
    '      <summary>How to read this</summary>',
    '      <p class="bt-section-desc">How often price moved <em>up</em> in each week of each month, across all years of your uploaded history — with no reference to the seasonal model. This is the baseline: what the market actually did. <strong>Green (≥60%)</strong> means price rose in the majority of years. <strong>Amber (40–59%)</strong> means mixed — no clear lean. <strong>Red (≤39%)</strong> means price fell more often than it rose. Hover any cell to see the raw count.</p>',
    '    </details>',
    '    <div class="bt-heatmap-scroll"><div id="up-raw-heatmap" class="bt-heatmap"></div></div>',

    '    <div class="bt-section-title">',
    '      2. Win Rate by Period',
    '      <span class="bt-legend">',
    '        <span class="bt-leg-item bt-leg-bull">■ ≥65%</span>',
    '        <span class="bt-leg-item bt-leg-mid">■ 50–64%</span>',
    '        <span class="bt-leg-item bt-leg-bear">■ &lt;50%</span>',
    '        <span class="bt-leg-item bt-leg-chop">■ Chop / Flip</span>',
    '      </span>',
    '    </div>',
    '    <details class="bt-desc-toggle">',
    '      <summary>How to read this</summary>',
    '      <p class="bt-section-desc">How often the seasonal model\'s directional signal was correct, week by week. <strong>Green (≥65%)</strong> means the model was right in 2 out of every 3 years or more — a reliable signal. <strong>Amber (50–64%)</strong> means slightly better than chance. <strong>Red (&lt;50%)</strong> means the model was wrong more often than right. Cells marked <em>~</em> are Chop or Flip weeks — no directional call was made, so there is nothing to validate. Hover any cell to see the raw count (e.g. 22 / 33 years correct).</p>',
    '      <p class="bt-threshold-note">The green threshold here is 65% — higher than the 60% used in Raw Tendency above. Raw Tendency simply asks whether price went up; a 60% frequency is already a meaningful lean in unfiltered data. Win Rate asks whether a specific model prediction was correct, which is a stricter test — so a higher bar of 65% is used to identify signals that are genuinely reliable rather than just marginally better than chance.</p>',
    '    </details>',
    '    <div class="bt-heatmap-scroll"><div id="up-heatmap" class="bt-heatmap"></div></div>',
    '    </div>',

    '    <div class="bt-section-title" id="up-chart-title">3. Average Weekly Return by Month (%)</div>',
    '    <details class="bt-desc-toggle">',
    '      <summary>How to read this</summary>',
    '      <p class="bt-section-desc">The average size of a weekly price move within each month, across all years of history. <strong>Green bars</strong> mean the month has historically drifted upward on average; <strong>red bars</strong> mean downward drift; bars near zero mean moves tend to cancel out. Use this alongside Win Rate: a green cell in section 2 paired with a tall green bar here means the model is both reliable and meaningful — right often, and the moves are worth capturing.</p>',
    '    </details>',
    '    <div class="bt-chart-wrap"><canvas id="up-bt-chart"></canvas></div>',

    '    <p class="bt-note">Seasonal model built from CME futures data; uploaded CSV is spot price — basis differences are negligible for directional analysis.</p>',

    '  </div>',

    /* ═══ View: Intraday Timing (ex-Sessions) ═══ */
    '  <div id="up-view-session" class="up-view-panel" hidden>',

    '    <div class="idt-meta-row" id="up-idt-meta-row"></div>',

    '    <div class="idt-controls">',
    '      <span class="idt-filter-label">Show weeks:</span>',
    '      <div class="idt-filter-btns" id="up-filter-btns">',
    '        <button class="idt-filter-btn active" data-filter="all">All weeks</button>',
    '        <button class="idt-filter-btn" data-filter="bull">Bull (Long) weeks</button>',
    '        <button class="idt-filter-btn" data-filter="bear">Bear (Short) weeks</button>',
    '        <button class="idt-filter-btn" data-filter="chop">Chop weeks</button>',
    '      </div>',
    '    </div>',

    '    <div class="idt-chart-section">',
    '      <p class="idt-chart-title" id="up-idt-chart-title">Average return by hour of day (%)</p>',
    '      <div class="idt-chart-wrap"><canvas id="up-idt-canvas"></canvas></div>',
    '      <div class="idt-session-legend" id="up-session-legend"></div>',
    '    </div>',

    '    <div class="idt-lower">',
    '      <div id="up-sessions"></div>',
    '      <div id="up-dow"></div>',
    '    </div>',

    '  </div>',

    '  <button id="up-clear-btn" class="bt-clear-btn">✕ &nbsp;Clear uploaded data</button>',

    '</div>',

    '<div class="idt-status" id="up-status"></div>'

  ].join('\n');

  var footnote  = document.querySelector('.footnote');
  var container = document.querySelector('.container') || document.body;
  if (footnote) footnote.parentElement.insertBefore(section, footnote);
  else          container.appendChild(section);

  /* ─── 2. Shared CSV parser ───────────────────────────────────────────────── */
  // MT5 layout: DATE [TIME] OPEN HIGH LOW CLOSE TICKVOL VOL SPREAD.
  // hasTime distinguishes D1/W1/MN1 (no time column) from sub-daily exports.

  function parseCSV(text) {
    var rawBars = [];
    var lines   = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

    var sep = '\t';
    for (var li = 0; li < Math.min(lines.length, 5); li++) {
      if (lines[li] && lines[li].indexOf('\t') !== -1) { sep = '\t'; break; }
      if (lines[li] && lines[li].indexOf(',')  !== -1) { sep = ',';  break; }
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;

      var cols = line.split(sep);
      var col0 = cols[0].trim().replace(/[<>]/g, '');
      if (col0.toUpperCase() === 'DATE') continue;

      var hasTime = /^\d{2}:\d{2}/.test((cols[1] || '').trim());
      var oIdx = hasTime ? 2 : 1;
      var hIdx = hasTime ? 3 : 2;
      var lIdx = hasTime ? 4 : 3;
      var cIdx = hasTime ? 5 : 4;

      var dateSep = col0.indexOf('.') !== -1 ? '.' : '-';
      var dp = col0.split(dateSep);
      if (dp.length !== 3) continue;

      var year  = parseInt(dp[0], 10);
      var month = parseInt(dp[1], 10) - 1;
      var day   = parseInt(dp[2], 10);

      var hour = 0, minute = 0;
      if (hasTime) {
        var tp = cols[1].trim().split(':');
        hour   = _normHour(parseInt(tp[0], 10) || 0);
        minute = parseInt(tp[1], 10) || 0;
      }

      var open  = parseFloat(cols[oIdx]);
      var high  = parseFloat(cols[hIdx]);
      var low   = parseFloat(cols[lIdx]);
      var close = parseFloat(cols[cIdx]);

      if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(open) || isNaN(close) || open === 0) continue;
      if (year < 1970 || year > 2100) continue;

      rawBars.push({
        year: year, month: month, day: day, hour: hour, minute: minute,
        open: open, high: isNaN(high) ? open : high, low: isNaN(low) ? open : low, close: close,
        ts: new Date(year, month, day, hour, minute).getTime()
      });
    }

    rawBars.sort(function (a, b) { return a.ts - b.ts; });
    return rawBars;
  }

  /* ─── 3. Granularity detector ────────────────────────────────────────────── */
  // Median inter-bar gap (minutes), matched to the nearest standard tier by
  // relative error — a median is robust to weekend/holiday gaps that would
  // otherwise skew a plain average toward the coarser side.

  function detectTier(bars) {
    if (bars.length < 3) return 'D1';
    var deltas = [];
    for (var i = 1; i < bars.length; i++) {
      var d = (bars[i].ts - bars[i - 1].ts) / 60000;
      if (d > 0) deltas.push(d);
    }
    if (!deltas.length) return 'D1';
    deltas.sort(function (a, b) { return a - b; });
    var median = deltas[Math.floor(deltas.length / 2)];

    var best = TIERS[0], bestErr = Infinity;
    TIERS.forEach(function (t) {
      var err = Math.abs(median - t.minutes) / t.minutes;
      if (err < bestErr) { bestErr = err; best = t; }
    });
    return best.id;
  }

  /* ─── 4. Signal extractor (shared by both engines) ──────────────────────── */

  function wkSlotForDay(day, slots) {
    if (slots === 1) return 0;
    return day <= 7 ? 0 : day <= 14 ? 1 : day <= 21 ? 2 : 3;
  }

  function getSignal(monthIdx, wkIdx) {
    if (!MONTHS || !MONTHS[monthIdx]) return 'chop';
    var wks = MONTHS[monthIdx].weeks;
    if (!wks || !wks[wkIdx]) return 'chop';
    var com = (wks[wkIdx].com || '').trim().toUpperCase().replace(/[★☆]/g, '').trim();
    if (com.indexOf('LONG')  === 0 || com.indexOf('BUY')  === 0) return 'bull';
    if (com.indexOf('SHORT') === 0 || com.indexOf('SELL') === 0) return 'bear';
    return 'chop';
  }

  /* ─── 5. Seasonal Tendency engine (generalized backtest.js) ─────────────── */

  function toPeriodBars(bars, tier) {
    if (tier === 'W1' || tier === 'MN1') {
      return bars.map(function (b) { return { year: b.year, month: b.month, day: b.day, close: b.close }; });
    }
    var dayMap = {};
    bars.forEach(function (b) {
      var dk = b.year + '-' + b.month + '-' + b.day;
      dayMap[dk] = { year: b.year, month: b.month, day: b.day, close: b.close };
    });
    return Object.keys(dayMap).sort().map(function (dk) { return dayMap[dk]; });
  }

  function computeHistoryStats(bars, tier) {
    var periodBars = toPeriodBars(bars, tier);
    var slots = tier === 'MN1' ? 1 : 4;

    var groups = {};
    periodBars.forEach(function (b) {
      var wk  = wkSlotForDay(b.day, slots);
      var key = b.year + '-' + b.month + '-' + wk;
      if (!groups[key]) groups[key] = [];
      groups[key].push({ day: b.day, close: b.close });
    });

    var closes = {};
    Object.keys(groups).forEach(function (key) {
      var sorted = groups[key].slice().sort(function (a, b) { return a.day - b.day; });
      closes[key] = sorted[sorted.length - 1].close;
    });

    function prevKey(year, month, wk) {
      var py = year, pm = month, pw = wk - 1;
      if (pw < 0) { pm--; pw = slots - 1; }
      if (pm < 0) { pm = 11; py--; }
      return py + '-' + pm + '-' + pw;
    }

    var weekReturns = [];
    for (var m = 0; m < 12; m++) {
      weekReturns[m] = [];
      for (var w = 0; w < slots; w++) weekReturns[m][w] = [];
    }

    Object.keys(closes).forEach(function (key) {
      var parts     = key.split('-');
      var ky        = parseInt(parts[0], 10);
      var km        = parseInt(parts[1], 10);
      var kw        = parseInt(parts[2], 10);
      var thisClose = closes[key];
      var prevClose = closes[prevKey(ky, km, kw)];
      if (!prevClose) return;
      weekReturns[km][kw].push((thisClose - prevClose) / prevClose * 100);
    });

    var rawTendency = [];
    for (var rm = 0; rm < 12; rm++) {
      rawTendency[rm] = [];
      for (var rw = 0; rw < slots; rw++) {
        var rets  = weekReturns[rm][rw];
        var up    = rets.filter(function (r) { return r > 0; }).length;
        rawTendency[rm][rw] = { up: up, total: rets.length, upPct: rets.length > 0 ? up / rets.length : null };
      }
    }

    var matrix = [];
    for (var mm = 0; mm < 12; mm++) {
      matrix[mm] = [];
      for (var mw = 0; mw < slots; mw++) {
        var signal = getSignal(mm, mw);
        var wins = 0, total = 0;
        var mRets = weekReturns[mm][mw];
        mRets.forEach(function (ret) {
          if (signal === 'bull' || signal === 'bear') {
            total++;
            if ((signal === 'bull' && ret > 0) || (signal === 'bear' && ret < 0)) wins++;
          }
        });
        var avgReturn = mRets.length > 0 ? mRets.reduce(function (a, b) { return a + b; }, 0) / mRets.length : null;
        matrix[mm][mw] = { signal: signal, wins: wins, total: total, winRate: total > 0 ? wins / total : null, avgReturn: avgReturn };
      }
    }

    var monthlyAvg = weekReturns.map(function (wks) {
      var all = [].concat.apply([], wks);
      if (!all.length) return 0;
      return all.reduce(function (a, b) { return a + b; }, 0) / all.length;
    });

    var allYears = periodBars
      .map(function (b) { return b.year; })
      .filter(function (y, i, a) { return a.indexOf(y) === i; })
      .sort(function (a, b) { return a - b; });

    return {
      slots: slots,
      rawTendency: rawTendency,
      matrix: matrix,
      monthlyAvg: monthlyAvg,
      yearRange: [allYears[0], allYears[allYears.length - 1]],
      yearsCount: allYears.length,
      totalBars: periodBars.length
    };
  }

  /* ─── 6. Intraday Timing engine (generalized intraday.js), sub-daily only ── */

  function makeSlot() { return { count: 0, posCount: 0, sumRet: 0 }; }
  function accumulate(slot, ret) { slot.count++; slot.sumRet += ret; if (ret > 0) slot.posCount++; }

  function computeSessionStats(bars, tier) {
    var barsPerDate = {};
    bars.forEach(function (b) {
      var dk = b.year + '-' + b.month + '-' + b.day;
      barsPerDate[dk] = (barsPerDate[dk] || 0) + 1;
    });
    var intradayBars = bars.filter(function (b) { return barsPerDate[b.year + '-' + b.month + '-' + b.day] > 1; });
    if (intradayBars.length < 200) return null;

    var sessionDefs = tier === 'H4' ? SESSIONS_H4 : SESSIONS_H1;
    var uniqueHours = {};
    intradayBars.forEach(function (b) { uniqueHours[b.hour] = true; });
    var hourList = Object.keys(uniqueHours).map(Number).sort(function (a, b) { return a - b; });

    function makeGroup() {
      var hourly = {}, sess = {}, dow = {};
      hourList.forEach(function (h) { hourly[h] = makeSlot(); });
      sessionDefs.forEach(function (s) { sess[s.id] = makeSlot(); });
      for (var d = 1; d <= 5; d++) dow[d] = makeSlot();
      return { hourly: hourly, sessions: sess, dow: dow };
    }
    var groups = { all: makeGroup(), bull: makeGroup(), bear: makeGroup(), chop: makeGroup() };

    intradayBars.forEach(function (bar) {
      var ret    = (bar.close - bar.open) / bar.open * 100;
      var wk     = wkSlotForDay(bar.day, 4);
      var signal = getSignal(bar.month, wk);
      if (groups.all.hourly[bar.hour]) {
        accumulate(groups.all.hourly[bar.hour], ret);
        if (groups[signal]) accumulate(groups[signal].hourly[bar.hour], ret);
      }
    });

    var byDate = {};
    intradayBars.forEach(function (b) {
      var dk = b.year + '-' + b.month + '-' + b.day;
      if (!byDate[dk]) {
        byDate[dk] = { signal: getSignal(b.month, wkSlotForDay(b.day, 4)), dow: new Date(b.year, b.month, b.day).getDay(), bars: [] };
      }
      byDate[dk].bars.push({ hour: b.hour, ret: (b.close - b.open) / b.open * 100 });
    });

    Object.keys(byDate).forEach(function (dk) {
      var date = byDate[dk];
      var sig  = date.signal, dow = date.dow, dbars = date.bars;

      var dayRet = 0;
      dbars.forEach(function (b) { dayRet += b.ret; });
      if (dow >= 1 && dow <= 5) {
        accumulate(groups.all.dow[dow], dayRet);
        if (groups[sig]) accumulate(groups[sig].dow[dow], dayRet);
      }

      sessionDefs.forEach(function (sess) {
        var sessRet = 0, hasBars = false;
        dbars.forEach(function (b) {
          if (sess.hours.indexOf(b.hour) !== -1) { sessRet += b.ret; hasBars = true; }
        });
        if (hasBars) {
          accumulate(groups.all.sessions[sess.id], sessRet);
          if (groups[sig]) accumulate(groups[sig].sessions[sess.id], sessRet);
        }
      });
    });

    var dateKeys = Object.keys(barsPerDate).sort();
    return {
      groups: groups,
      hourList: hourList,
      tier: tier,
      meta: {
        firstDate: dateKeys[0] || '',
        lastDate: dateKeys[dateKeys.length - 1] || '',
        totalBars: bars.length,
        intradayBars: intradayBars.length
      }
    };
  }

  /* ─── 7. Render: Seasonal Tendency ───────────────────────────────────────── */

  function renderRawHeatmap(rawTendency, slots) {
    var wkLabels = slots === 1 ? ['Month'] : ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'];
    var html = '<table class="bt-table"><thead><tr><th class="bt-corner"></th>';
    MONTH_ABBR.forEach(function (m) { html += '<th>' + m + '</th>'; });
    html += '</tr></thead><tbody>';
    for (var w = 0; w < slots; w++) {
      html += '<tr><td class="bt-row-label">' + wkLabels[w] + '</td>';
      for (var m = 0; m < 12; m++) {
        var c = rawTendency[m][w];
        var cls, arrow, rateTxt, titleTxt;
        if (c.upPct === null) {
          cls = 'bt-cell bt-cell-nodata'; arrow = '—'; rateTxt = ''; titleTxt = 'No data';
        } else {
          var pct = Math.round(c.upPct * 100);
          arrow = c.upPct >= 0.5 ? '▲' : '▼';
          rateTxt = pct + '%';
          titleTxt = c.up + ' / ' + c.total + ' years price rose';
          cls = pct >= 60 ? 'bt-cell bt-cell-bull' : pct >= 40 ? 'bt-cell bt-cell-mid' : 'bt-cell bt-cell-bear';
        }
        html += '<td class="' + cls + '" title="' + titleTxt + '"><span class="bt-arrow">' + arrow + '</span>' +
          (rateTxt ? '<span class="bt-rate">' + rateTxt + '</span>' : '') + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    document.getElementById('up-raw-heatmap').innerHTML = html;
  }

  function renderHeatmap(matrix, slots) {
    var wkLabels = slots === 1 ? ['Month'] : ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'];
    var html = '<table class="bt-table"><thead><tr><th class="bt-corner"></th>';
    MONTH_ABBR.forEach(function (m) { html += '<th>' + m + '</th>'; });
    html += '</tr></thead><tbody>';
    for (var w = 0; w < slots; w++) {
      html += '<tr><td class="bt-row-label">' + wkLabels[w] + '</td>';
      for (var m = 0; m < 12; m++) {
        var c = matrix[m][w];
        var cls, arrow, rateTxt, titleTxt;
        if (c.signal === 'bull' || c.signal === 'bear') {
          arrow = c.signal === 'bull' ? '▲' : '▼';
          var pct = c.winRate !== null ? Math.round(c.winRate * 100) : null;
          if (pct === null) { cls = 'bt-cell bt-cell-nodata'; rateTxt = '—'; }
          else if (pct >= 65) { cls = 'bt-cell bt-cell-bull'; rateTxt = pct + '%'; }
          else if (pct >= 50) { cls = 'bt-cell bt-cell-mid'; rateTxt = pct + '%'; }
          else { cls = 'bt-cell bt-cell-bear'; rateTxt = pct + '%'; }
          titleTxt = c.wins + ' / ' + c.total + ' years correct' +
            (c.avgReturn !== null ? ' · avg ' + (c.avgReturn >= 0 ? '+' : '') + c.avgReturn.toFixed(3) + '%' : '');
        } else {
          cls = 'bt-cell bt-cell-chop'; arrow = '~'; rateTxt = ''; titleTxt = 'Chop / Flip — no directional signal to validate';
        }
        html += '<td class="' + cls + '" title="' + titleTxt + '"><span class="bt-arrow">' + arrow + '</span>' +
          (rateTxt ? '<span class="bt-rate">' + rateTxt + '</span>' : '') + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    document.getElementById('up-heatmap').innerHTML = html;
  }

  function renderHistoryChart(monthlyAvg) {
    if (typeof Chart === 'undefined') {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
      s.onload = function () { drawHistoryChart(monthlyAvg); };
      document.head.appendChild(s);
    } else {
      drawHistoryChart(monthlyAvg);
    }
  }

  function drawHistoryChart(returns) {
    var canvas = document.getElementById('up-bt-chart');
    if (!canvas) return;
    if (btChartInstance) { btChartInstance.destroy(); btChartInstance = null; }
    btChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: MONTH_ABBR,
        datasets: [{
          data: returns,
          backgroundColor: returns.map(function (v) { return v >= 0 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)'; }),
          borderColor: returns.map(function (v) { return v >= 0 ? '#22c55e' : '#ef4444'; }),
          borderWidth: 1, borderRadius: 3
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111318', borderColor: '#1e2430', borderWidth: 1,
            titleColor: '#94a3b8', bodyColor: '#e2e8f0',
            titleFont: { family: "'IBM Plex Mono', monospace", size: 11 },
            bodyFont: { family: "'IBM Plex Mono', monospace", size: 12 },
            callbacks: {
              title: function (items) { return items[0].label; },
              label: function (ctx) { var v = ctx.parsed.y; return (v >= 0 ? '+' : '') + v.toFixed(4) + '%  avg return'; }
            }
          }
        },
        scales: {
          x: { grid: { color: '#1e2430' }, ticks: { color: '#94a3b8', font: { family: "'IBM Plex Mono', monospace", size: 11 } } },
          y: {
            grid: { color: '#1e2430' },
            ticks: { color: '#94a3b8', font: { family: "'IBM Plex Mono', monospace", size: 11 },
              callback: function (v) { return (v >= 0 ? '+' : '') + v.toFixed(2) + '%'; } }
          }
        }
      }
    });
  }

  /* ─── 8. Render: Intraday Timing ─────────────────────────────────────────── */

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function round4(v) { return Math.round(v * 10000) / 10000; }
  function round1(v) { return Math.round(v * 10) / 10; }

  function renderIdtChart(stats) {
    var grp = stats.groups[activeFilter] || stats.groups.all;
    var hourList = stats.hourList;
    var sessionDefs = stats.tier === 'H4' ? SESSIONS_H4 : SESSIONS_H1;

    var labels = hourList.map(function (h) { return pad(h) + ':00'; });
    var avgReturns = hourList.map(function (h) { var s = grp.hourly[h]; return (s && s.count > 0) ? round4(s.sumRet / s.count) : 0; });
    var posPcts = hourList.map(function (h) { var s = grp.hourly[h]; return (s && s.count > 0) ? round1(s.posCount / s.count * 100) : 50; });
    var barColors = avgReturns.map(function (v) { return v >= 0 ? 'rgba(34,197,94,0.75)' : 'rgba(239,68,68,0.75)'; });

    var totalBars = hourList.reduce(function (acc, h) { return acc + ((grp.hourly[h] && grp.hourly[h].count) || 0); }, 0);
    var filterLabel = { all: 'All weeks', bull: 'Bull (Long) weeks', bear: 'Bear (Short) weeks', chop: 'Chop weeks' }[activeFilter] || activeFilter;
    var titleEl = document.getElementById('up-idt-chart-title');
    if (titleEl) titleEl.textContent = 'Average return by hour — ' + filterLabel + ' — ' + totalBars.toLocaleString() + ' bars';

    var sessionPlugin = {
      id: 'upSessionBg',
      beforeDraw: function (chart) {
        var c2 = chart.ctx, ca = chart.chartArea, xScale = chart.scales.x;
        var barW = (ca.right - ca.left) / hourList.length;
        sessionDefs.forEach(function (sess) {
          sess.hours.forEach(function (h) {
            var idx = hourList.indexOf(h);
            if (idx === -1) return;
            var cx = xScale.getPixelForValue(idx);
            c2.save(); c2.fillStyle = sess.color;
            c2.fillRect(cx - barW / 2, ca.top, barW, ca.bottom - ca.top);
            c2.restore();
          });
        });
      }
    };
    var zeroPlugin = {
      id: 'upZero',
      afterDraw: function (chart) {
        var c2 = chart.ctx, ca = chart.chartArea, yScale = chart.scales.y;
        var y0 = yScale.getPixelForValue(0);
        if (y0 < ca.top || y0 > ca.bottom) return;
        c2.save(); c2.strokeStyle = '#2a3345'; c2.lineWidth = 1; c2.setLineDash([3, 5]);
        c2.beginPath(); c2.moveTo(ca.left, y0); c2.lineTo(ca.right, y0); c2.stroke(); c2.restore();
      }
    };

    if (idtChartInstance) {
      idtChartInstance.data.labels = labels;
      idtChartInstance.data.datasets[0].data = avgReturns;
      idtChartInstance.data.datasets[0].backgroundColor = barColors;
      idtChartInstance.data.datasets[1].data = posPcts;
      idtChartInstance.update('none');
      buildSessionLegend(sessionDefs);
      return;
    }

    function doRender() {
      var canvas = document.getElementById('up-idt-canvas');
      if (!canvas) return;
      idtChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'Avg return (%)', data: avgReturns, backgroundColor: barColors, borderWidth: 0, yAxisID: 'y', order: 1 },
            { label: '% positive', data: posPcts, type: 'line', borderColor: '#f59e0b', backgroundColor: 'transparent',
              borderWidth: 1.5, pointRadius: 3, pointBackgroundColor: '#f59e0b', pointHoverRadius: 5, tension: 0.3, yAxisID: 'y2', order: 0 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false, animation: { duration: 400 },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { labels: { color: '#94a3b8', font: { family: 'IBM Plex Mono', size: 10 }, boxWidth: 20, padding: 14 } },
            tooltip: {
              backgroundColor: '#0d1117', borderColor: '#1e2430', borderWidth: 1,
              titleColor: '#f1f5f9', bodyColor: '#94a3b8',
              titleFont: { family: 'IBM Plex Mono', size: 11, weight: 'bold' },
              bodyFont: { family: 'IBM Plex Mono', size: 10 }, padding: 10,
              callbacks: {
                title: function (items) { return labels[items[0].dataIndex] + ' server time'; },
                label: function (item) {
                  if (item.datasetIndex === 0) { var v = item.raw; return '  Avg return: ' + (v >= 0 ? '+' : '') + v.toFixed(4) + '%'; }
                  return '  % positive: ' + item.raw.toFixed(1) + '%';
                }
              }
            }
          },
          scales: {
            x: { ticks: { color: '#64748b', font: { family: 'IBM Plex Mono', size: 10 }, maxRotation: 0 }, grid: { color: 'rgba(30,36,48,0.8)' } },
            y: { position: 'left', ticks: { color: '#64748b', font: { family: 'IBM Plex Mono', size: 10 },
                callback: function (v) { return (v >= 0 ? '+' : '') + v.toFixed(3) + '%'; } }, grid: { color: 'rgba(30,36,48,0.8)' } },
            y2: { position: 'right', min: 30, max: 70, ticks: { color: '#f59e0b', font: { family: 'IBM Plex Mono', size: 10 },
                callback: function (v) { return v + '%'; } }, grid: { drawOnChartArea: false } }
          }
        },
        plugins: [sessionPlugin, zeroPlugin]
      });
      buildSessionLegend(sessionDefs);
    }

    if (window.Chart) doRender();
    else {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
      s.onload = doRender;
      document.head.appendChild(s);
    }
  }

  function buildSessionLegend(sessionDefs) {
    var el = document.getElementById('up-session-legend');
    if (!el) return;
    el.innerHTML = sessionDefs.map(function (s) {
      return '<span class="idt-sess-chip" style="background:' + s.color + ';border-color:' + s.color.replace(/[\d.]+\)/, '0.4)') + '">' + s.label + ' ' + s.sublabel + '</span>';
    }).join('');
  }

  function renderSessions(stats) {
    var grp = stats.groups[activeFilter] || stats.groups.all;
    var defs = stats.tier === 'H4' ? SESSIONS_H4 : SESSIONS_H1;
    var el = document.getElementById('up-sessions');
    if (!el) return;
    var html = '<p class="idt-section-title">By Session</p><div class="idt-sess-cards">';
    defs.forEach(function (sess) {
      var s = grp.sessions[sess.id];
      if (!s || s.count === 0) return;
      var avg = s.sumRet / s.count, pct = s.posCount / s.count * 100;
      var cls = avg >= 0 ? 'idt-card--bull' : 'idt-card--bear';
      html += '<div class="idt-sess-card ' + cls + '">' +
        '<span class="idt-card-name">' + sess.label + '</span>' +
        '<span class="idt-card-sub">' + sess.sublabel + ' server time</span>' +
        '<span class="idt-card-return">' + (avg >= 0 ? '+' : '') + avg.toFixed(4) + '%</span>' +
        '<span class="idt-card-pct">' + pct.toFixed(0) + '% of sessions up</span>' +
        '<span class="idt-card-count">' + s.posCount.toLocaleString() + ' / ' + s.count.toLocaleString() + ' sessions' +
          '<span class="idt-count-tip" title="Days where this session closed positive / Total trading days where this session had data">ⓘ</span></span>' +
        '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderDow(stats) {
    var grp = stats.groups[activeFilter] || stats.groups.all;
    var el = document.getElementById('up-dow');
    if (!el) return;
    var html = '<p class="idt-section-title">By Day of Week</p><div class="idt-dow-cards">';
    [1, 2, 3, 4, 5].forEach(function (d) {
      var s = grp.dow[d];
      if (!s || s.count === 0) return;
      var avg = s.sumRet / s.count, pct = s.posCount / s.count * 100;
      var cls = avg >= 0 ? 'idt-card--bull' : 'idt-card--bear';
      html += '<div class="idt-dow-card ' + cls + '">' +
        '<span class="idt-card-name">' + DAY_NAMES[d] + '</span>' +
        '<span class="idt-card-return">' + (avg >= 0 ? '+' : '') + avg.toFixed(4) + '%</span>' +
        '<span class="idt-card-pct">' + pct.toFixed(0) + '% of days up</span>' +
        '<span class="idt-card-count">' + s.posCount.toLocaleString() + ' / ' + s.count.toLocaleString() + ' days' +
          '<span class="idt-count-tip" title="Days closing positive / Total trading days falling on this weekday">ⓘ</span></span>' +
        '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  /* ─── 9. Orchestration ───────────────────────────────────────────────────── */

  function switchView(view) {
    activeView = view;
    document.querySelectorAll('.up-view-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.view === view); });
    var histEl = document.getElementById('up-view-history');
    var sessEl = document.getElementById('up-view-session');
    if (histEl) histEl.hidden = view !== 'history';
    if (sessEl) sessEl.hidden = view !== 'session';
    if (view === 'session' && lastResult && lastResult.sessionStats) refreshSessionViews();
    else if (view === 'history' && lastResult && lastResult.historyStats && typeof window.kptUpRefresh === 'function') window.kptUpRefresh();
  }

  function refreshSessionViews() {
    if (!lastResult || !lastResult.sessionStats) return;
    renderIdtChart(lastResult.sessionStats);
    renderSessions(lastResult.sessionStats);
    renderDow(lastResult.sessionStats);
  }

  function displayResult(result) {
    lastResult = result;
    var hist = result.historyStats, sess = result.sessionStats;

    document.getElementById('up-summary').innerHTML =
      '<span class="bt-chip">' + result.tier + '</span>' +
      (hist ? '<span class="bt-chip">' + hist.yearRange[0] + '–' + hist.yearRange[1] + '</span><span class="bt-chip">' + hist.yearsCount + ' years</span>' : '') +
      '<span class="bt-chip">' + result.totalBars.toLocaleString() + ' bars</span>' +
      '<span class="bt-chip">' + ASSET_CONFIG.name + '</span>';

    var switchEl = document.getElementById('up-view-switch');
    var hasBoth = !!hist && !!sess;
    if (switchEl) switchEl.hidden = !hasBoth;

    if (hist) {
      document.getElementById('up-hist-sections').hidden = hist.slots === 1;
      document.getElementById('up-mn1-note').hidden = hist.slots !== 1;
      document.getElementById('up-chart-title').textContent =
        hist.slots === 1 ? '3. Average Monthly Return (%)' : '3. Average Weekly Return by Month (%)';
      renderRawHeatmap(hist.rawTendency, hist.slots);
      renderHeatmap(hist.matrix, hist.slots);
    }

    if (sess) {
      var metaEl = document.getElementById('up-idt-meta-row');
      if (metaEl) metaEl.textContent = sess.tier + ' · ' + sess.meta.intradayBars.toLocaleString() + ' intraday bars · ' + sess.meta.firstDate + ' → ' + sess.meta.lastDate;
    }

    switchView(hist ? 'history' : 'session');

    document.getElementById('up-results').style.display = '';
    document.getElementById('up-upload-area').style.display = 'none';
  }

  /* ─── 10. File upload handler ────────────────────────────────────────────── */

  function setStatus(msg) {
    var el = document.getElementById('up-status');
    if (el) { el.textContent = msg; el.style.display = msg ? '' : 'none'; }
  }

  function processFile(file) {
    var label = document.getElementById('up-upload-label');
    if (label) { label.childNodes[0].nodeValue = ''; label.insertAdjacentText('beforeend', 'Parsing ' + file.name + '…'); }

    var reader = new FileReader();
    reader.onload = function (e) {
      var bars = parseCSV(e.target.result);
      if (bars.length < 50) {
        alert('Only ' + bars.length + ' valid bars found.\n\nPlease ensure:\n• The file is a valid MT5 bars export\n• The file contains enough history (10+ years recommended for daily-and-coarser data)\n• The format is tab- or comma-separated');
        resetUploadLabel();
        return;
      }

      var tier = detectTier(bars);
      var historyStats = computeHistoryStats(bars, tier);
      var sessionStats = SUB_DAILY_TIERS.indexOf(tier) !== -1 ? computeSessionStats(bars, tier) : null;

      var result = { schemaVer: 1, tier: tier, totalBars: bars.length, historyStats: historyStats, sessionStats: sessionStats };
      try { localStorage.setItem(STORE_KEY, JSON.stringify(result)); } catch (ex) {}
      displayResult(result);
    };
    reader.onerror = function () { alert('Could not read the file. Please try again.'); resetUploadLabel(); };
    reader.readAsText(file, 'utf-8');
  }

  function resetUploadLabel() {
    var label = document.getElementById('up-upload-label');
    if (!label) return;
    label.innerHTML = '<input type="file" id="up-file-input" accept=".csv,.txt" style="display:none">↑ &nbsp;Choose CSV';
    var newInput = document.getElementById('up-file-input');
    if (newInput) newInput.addEventListener('change', onFileInputChange);
  }

  function onFileInputChange(evt) {
    var file = evt.target.files[0];
    if (file) processFile(file);
  }

  var fileInput = document.getElementById('up-file-input');
  if (fileInput) fileInput.addEventListener('change', onFileInputChange);

  var uploadArea = document.getElementById('up-upload-area');
  if (uploadArea) {
    uploadArea.addEventListener('dragover', function (e) { e.preventDefault(); });
    uploadArea.addEventListener('drop', function (e) {
      e.preventDefault();
      if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
    });
  }

  var viewSwitch = document.getElementById('up-view-switch');
  if (viewSwitch) {
    viewSwitch.addEventListener('click', function (e) {
      var btn = e.target.closest('.up-view-btn');
      if (btn) switchView(btn.dataset.view);
    });
  }

  var filterBtns = document.getElementById('up-filter-btns');
  if (filterBtns) {
    filterBtns.addEventListener('click', function (e) {
      var btn = e.target.closest('.idt-filter-btn');
      if (!btn || !lastResult || !lastResult.sessionStats) return;
      document.querySelectorAll('#up-filter-btns .idt-filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      refreshSessionViews();
    });
  }

  var tzSel = document.getElementById('up-tz-select');
  if (tzSel) {
    tzSel.value = String(_getBrokerOffset());
    tzSel.addEventListener('change', function () {
      _saveBrokerOffset(parseInt(tzSel.value, 10));
      setStatus('Timezone changed — please re-upload your CSV to recompute intraday timing.');
    });
  }

  /* ─── 11. Clear button ───────────────────────────────────────────────────── */

  var clearBtn = document.getElementById('up-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (btChartInstance) { btChartInstance.destroy(); btChartInstance = null; }
      if (idtChartInstance) { idtChartInstance.destroy(); idtChartInstance = null; }
      lastResult = null;
      activeFilter = 'all';
      try { localStorage.removeItem(STORE_KEY); } catch (ex) {}
      document.getElementById('up-results').style.display = 'none';
      document.getElementById('up-upload-area').style.display = '';
      setStatus('');
    });
  }

  /* ─── 12. Restore from localStorage on page load ─────────────────────────── */

  (function () {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (!saved) return;
      var result = JSON.parse(saved);
      if (result && result.schemaVer === 1 && result.tier && (result.historyStats || result.sessionStats)) {
        displayResult(result);
      }
    } catch (ex) {}
  }());

  /* ─── 13. Tab-activation refresh hook (called by ui.js) ─────────────────── */

  window.kptUpRefresh = function () {
    if (activeView === 'history') {
      if (btChartInstance) btChartInstance.resize();
      else if (lastResult && lastResult.historyStats) renderHistoryChart(lastResult.historyStats.monthlyAvg);
    } else {
      if (idtChartInstance) idtChartInstance.resize();
      else if (lastResult && lastResult.sessionStats) refreshSessionViews();
    }
  };

}());
