/**
 * backtest.js — Price history upload and seasonal win-rate analyser.
 *
 * Three sections (in order):
 *   1. Raw Price Tendency  — model-agnostic up-frequency per (month, week)
 *   2. Win Rate by Period  — how often the seasonal signal was correct
 *   3. Avg Weekly Return   — average size of weekly move per month
 *
 * Expected CSV format (MT5 D1 export, tab-separated):
 *   <DATE>  <OPEN>  <HIGH>  <LOW>  <CLOSE>  <TICKVOL>  <VOL>  <SPREAD>
 *   1993.05.12  1.53700  1.54450  1.52900  1.53380  2781  0  50
 *
 * Also handles M1/H1/H4 exports (DATE + TIME columns) — auto-detected.
 * Sub-daily files are aggregated to one daily close per calendar day.
 *
 * Depends on: ASSET_CONFIG.id, MONTHS[] (loaded before this script).
 * Must load BEFORE ui.js so the injected #backtest-section exists when
 * ui.js scans for [data-kpt-panel] elements.
 *
 * Exposes: window.kptBtRefresh() — called by ui.js on Backtest tab
 * activation to resize the Chart.js canvas after it becomes visible.
 */

(function () {

  if (typeof ASSET_CONFIG === 'undefined' || typeof MONTHS === 'undefined') return;

  var currentId  = ASSET_CONFIG.id;
  var STORE_KEY  = 'kpt-bt-' + currentId;
  var MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var WK_LABELS  = ['Wk 1','Wk 2','Wk 3','Wk 4'];

  var btChartInstance = null;
  var lastStats       = null;

  /* ─── 1. Inject the Backtest panel ──────────────────────────────────────── */

  var section = document.createElement('section');
  section.id               = 'backtest-section';
  section.dataset.kptPanel = 'backtest';

  section.innerHTML = [

    /* ── Upload area ── */
    '<div id="bt-upload-area" class="bt-upload-area">',
    '  <div class="section-label"><span style="background:var(--chop)"></span> Price Backtest</div>',
    '  <p class="bt-desc">Upload a D1 (daily bar) CSV from MetaTrader 5 to validate the seasonal model against real price history — week by week, month by month, across all available years.</p>',
    '  <ol class="bt-upload-steps">',
    '    <li>Open <strong>MetaTrader 5</strong></li>',
    '    <li>On the top menu bar, click <strong>View → Symbols</strong></li>',
    '    <li>Inside the Symbols window, go to the <strong>Bars</strong> tab</li>',
    '    <li>Select your <strong>asset</strong>, set timeframe to <strong>D1</strong>, choose a <strong>start</strong> and <strong>end date</strong>, then click <strong>Request</strong></li>',
    '    <li>Once the bars load, click <strong>Export Bars</strong> in the bottom toolbar of the window</li>',
    '    <li>Save the file to a location you can find easily (e.g. your <strong>Downloads</strong> folder)</li>',
    '    <li>Click <strong>Choose D1 CSV</strong> below and navigate to the saved file to upload it</li>',
    '  </ol>',
    '  <label class="bt-upload-btn" id="bt-upload-label">',
    '    <input type="file" id="bt-file-input" accept=".csv" style="display:none">',
    '    ↑ &nbsp;Choose D1 CSV',
    '  </label>',
    '  <p class="bt-hint">Tab-separated MT5 export &nbsp;·&nbsp; D1 timeframe &nbsp;·&nbsp; 10+ years recommended</p>',
    '</div>',

    /* ── Results panel ── */
    '<div id="bt-results" class="bt-results" style="display:none">',

    '  <div id="bt-summary" class="bt-summary"></div>',

    /* Section 1 — Raw Price Tendency */
    '  <div class="bt-section-title">',
    '    1. Raw Price Tendency',
    '    <span class="bt-legend">',
    '      <span class="bt-leg-item bt-leg-bull">■ ≥60% up</span>',
    '      <span class="bt-leg-item bt-leg-mid">■ 40–59%</span>',
    '      <span class="bt-leg-item bt-leg-bear">■ ≤39% up</span>',
    '    </span>',
    '  </div>',
    '  <details class="bt-desc-toggle">',
    '    <summary>How to read this</summary>',
    '    <p class="bt-section-desc">How often price moved <em>up</em> in each week of each month, across all years of your uploaded history — with no reference to the seasonal model. This is the baseline: what the market actually did. <strong>Green (≥60%)</strong> means price rose in the majority of years. <strong>Amber (40–59%)</strong> means mixed — no clear lean. <strong>Red (≤39%)</strong> means price fell more often than it rose. Hover any cell to see the raw count.</p>',
    '  </details>',
    '  <div class="bt-heatmap-scroll">',
    '    <div id="bt-raw-heatmap" class="bt-heatmap"></div>',
    '  </div>',

    /* Section 2 — Win Rate */
    '  <div class="bt-section-title">',
    '    2. Win Rate by Period',
    '    <span class="bt-legend">',
    '      <span class="bt-leg-item bt-leg-bull">■ ≥65%</span>',
    '      <span class="bt-leg-item bt-leg-mid">■ 50–64%</span>',
    '      <span class="bt-leg-item bt-leg-bear">■ &lt;50%</span>',
    '      <span class="bt-leg-item bt-leg-chop">■ Chop / Flip</span>',
    '    </span>',
    '  </div>',
    '  <details class="bt-desc-toggle">',
    '    <summary>How to read this</summary>',
    '    <p class="bt-section-desc">How often the seasonal model\'s directional signal was correct, week by week. <strong>Green (≥65%)</strong> means the model was right in 2 out of every 3 years or more — a reliable signal. <strong>Amber (50–64%)</strong> means slightly better than chance. <strong>Red (&lt;50%)</strong> means the model was wrong more often than right. Cells marked <em>~</em> are Chop or Flip weeks — no directional call was made, so there is nothing to validate. Hover any cell to see the raw count (e.g. 22 / 33 years correct).</p>',
    '    <p class="bt-threshold-note">The green threshold here is 65% — higher than the 60% used in Raw Tendency above. Raw Tendency simply asks whether price went up; a 60% frequency is already a meaningful lean in unfiltered data. Win Rate asks whether a specific model prediction was correct, which is a stricter test — so a higher bar of 65% is used to identify signals that are genuinely reliable rather than just marginally better than chance.</p>',
    '  </details>',
    '  <div class="bt-heatmap-scroll">',
    '    <div id="bt-heatmap" class="bt-heatmap"></div>',
    '  </div>',

    /* Section 3 — Avg Weekly Return */
    '  <div class="bt-section-title">3. Average Weekly Return by Month (%)</div>',
    '  <details class="bt-desc-toggle">',
    '    <summary>How to read this</summary>',
    '    <p class="bt-section-desc">The average size of a weekly price move within each month, across all years of history. <strong>Green bars</strong> mean the month has historically drifted upward on average; <strong>red bars</strong> mean downward drift; bars near zero mean moves tend to cancel out. Use this alongside Win Rate: a green cell in section 2 paired with a tall green bar here means the model is both reliable and meaningful — right often, and the moves are worth capturing.</p>',
    '  </details>',
    '  <div class="bt-chart-wrap"><canvas id="bt-chart"></canvas></div>',

    /* Footer */
    '  <p class="bt-note">Seasonal model built from CME futures data; uploaded CSV is spot price — basis differences are negligible for directional analysis.</p>',
    '  <button id="bt-clear-btn" class="bt-clear-btn">✕ &nbsp;Clear uploaded data</button>',

    '</div>'

  ].join('\n');

  var footnote  = document.querySelector('.footnote');
  var container = document.querySelector('.container') || document.body;
  if (footnote) footnote.parentElement.insertBefore(section, footnote);
  else          container.appendChild(section);

  /* ─── 2. CSV parser ──────────────────────────────────────────────────────── */

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

      // D1: DATE OPEN HIGH LOW CLOSE ...
      // sub-daily: DATE TIME OPEN HIGH LOW CLOSE ...
      var hasTime  = /^\d{2}:\d{2}/.test((cols[1] || '').trim());
      var closeIdx = hasTime ? 5 : 4;
      var closeStr = (cols[closeIdx] || '').trim();

      var dateSep  = col0.indexOf('.') !== -1 ? '.' : '-';
      var dp       = col0.split(dateSep);
      if (dp.length !== 3) continue;

      var year  = parseInt(dp[0], 10);
      var month = parseInt(dp[1], 10) - 1;
      var day   = parseInt(dp[2], 10);
      var close = parseFloat(closeStr);

      if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(close)) continue;
      if (year < 1970 || year > 2100) continue;

      rawBars.push({ year: year, month: month, day: day, close: close });
    }

    // Aggregate sub-daily: keep last close per calendar day
    var dayMap = {};
    rawBars.forEach(function (b) {
      var dk = b.year + '-' + b.month + '-' + b.day;
      dayMap[dk] = { year: b.year, month: b.month, day: b.day, close: b.close };
    });

    return Object.keys(dayMap).sort().map(function (dk) {
      var d      = dayMap[dk];
      var wkSlot = d.day <= 7 ? 0 : d.day <= 14 ? 1 : d.day <= 21 ? 2 : 3;
      return { year: d.year, month: d.month, day: d.day, wkSlot: wkSlot, close: d.close };
    });
  }

  /* ─── 3. Signal extractor ────────────────────────────────────────────────── */

  function getSignal(monthIdx, wkIdx) {
    if (!MONTHS || !MONTHS[monthIdx]) return 'chop';
    var wks = MONTHS[monthIdx].weeks;
    if (!wks || !wks[wkIdx]) return 'chop';
    var com = (wks[wkIdx].com || '').trim().toUpperCase().replace(/[★☆]/g, '').trim();
    if (com.indexOf('LONG')  === 0 || com.indexOf('BUY')  === 0) return 'bull';
    if (com.indexOf('SHORT') === 0 || com.indexOf('SELL') === 0) return 'bear';
    return 'chop';
  }

  /* ─── 4. Stats computation ───────────────────────────────────────────────── */

  function computeStats(bars) {

    // Build weeklyCloses: "year-month-wkSlot" → last close of that week
    var groups = {};
    bars.forEach(function (b) {
      var key = b.year + '-' + b.month + '-' + b.wkSlot;
      if (!groups[key]) groups[key] = [];
      groups[key].push({ day: b.day, close: b.close });
    });

    var weeklyCloses = {};
    Object.keys(groups).forEach(function (key) {
      var sorted = groups[key].slice().sort(function (a, b) { return a.day - b.day; });
      weeklyCloses[key] = sorted[sorted.length - 1].close;
    });

    function prevKey(year, month, wkSlot) {
      var py = year, pm = month, pw = wkSlot - 1;
      if (pw < 0) { pm--; pw = 3; }
      if (pm < 0) { pm = 11; py--; }
      return py + '-' + pm + '-' + pw;
    }

    // Shared weekly-return loop — compute returns once, reuse for all three outputs
    // returns[m][w] = array of pct returns across all years
    var weekReturns = [];
    for (var m = 0; m < 12; m++) {
      weekReturns[m] = [];
      for (var w = 0; w < 4; w++) {
        weekReturns[m][w] = [];
      }
    }

    Object.keys(weeklyCloses).forEach(function (key) {
      var parts     = key.split('-');
      var ky        = parseInt(parts[0], 10);
      var km        = parseInt(parts[1], 10);
      var kw        = parseInt(parts[2], 10);
      var thisClose = weeklyCloses[key];
      var prevClose = weeklyCloses[prevKey(ky, km, kw)];
      if (!prevClose || prevClose === 0) return;
      weekReturns[km][kw].push((thisClose - prevClose) / prevClose * 100);
    });

    // ── Section 1: Raw Price Tendency (model-agnostic) ─────────────────────
    var rawTendency = [];
    for (var m = 0; m < 12; m++) {
      rawTendency[m] = [];
      for (var w = 0; w < 4; w++) {
        var rets  = weekReturns[m][w];
        var up    = rets.filter(function (r) { return r > 0; }).length;
        var total = rets.length;
        rawTendency[m][w] = {
          up:    up,
          total: total,
          upPct: total > 0 ? up / total : null
        };
      }
    }

    // ── Section 2: Win Rate vs seasonal model ─────────────────────────────
    var matrix = [];
    for (var m = 0; m < 12; m++) {
      matrix[m] = [];
      for (var w = 0; w < 4; w++) {
        var signal = getSignal(m, w);
        var wins = 0, total = 0;
        var rets = weekReturns[m][w];

        rets.forEach(function (ret) {
          if (signal === 'bull' || signal === 'bear') {
            total++;
            if ((signal === 'bull' && ret > 0) || (signal === 'bear' && ret < 0)) wins++;
          }
        });

        var avgReturn = rets.length > 0
          ? rets.reduce(function (a, b) { return a + b; }, 0) / rets.length
          : null;

        matrix[m][w] = {
          signal:    signal,
          wins:      wins,
          total:     total,
          winRate:   total > 0 ? wins / total : null,
          avgReturn: avgReturn
        };
      }
    }

    // ── Section 3: Monthly average return ─────────────────────────────────
    var monthlyAvg = weekReturns.map(function (wks) {
      var all = [].concat.apply([], wks);
      if (!all.length) return 0;
      return all.reduce(function (a, b) { return a + b; }, 0) / all.length;
    });

    var allYears = bars
      .map(function (b) { return b.year; })
      .filter(function (y, i, a) { return a.indexOf(y) === i; })
      .sort(function (a, b) { return a - b; });

    return {
      rawTendency: rawTendency,
      matrix:      matrix,
      monthlyAvg:  monthlyAvg,
      yearRange:   [allYears[0], allYears[allYears.length - 1]],
      yearsCount:  allYears.length,
      totalBars:   bars.length
    };
  }

  /* ─── 5. Render: Raw Price Tendency heatmap ──────────────────────────────── */

  function renderRawHeatmap(rawTendency) {
    var html = '<table class="bt-table"><thead><tr><th class="bt-corner"></th>';
    MONTH_ABBR.forEach(function (m) { html += '<th>' + m + '</th>'; });
    html += '</tr></thead><tbody>';

    for (var w = 0; w < 4; w++) {
      html += '<tr><td class="bt-row-label">' + WK_LABELS[w] + '</td>';
      for (var m = 0; m < 12; m++) {
        var c   = rawTendency[m][w];
        var cls, arrow, rateTxt, titleTxt;

        if (c.upPct === null) {
          cls      = 'bt-cell bt-cell-nodata';
          arrow    = '—';
          rateTxt  = '';
          titleTxt = 'No data';
        } else {
          var pct  = Math.round(c.upPct * 100);
          arrow    = c.upPct >= 0.5 ? '▲' : '▼';
          rateTxt  = pct + '%';
          titleTxt = c.up + ' / ' + c.total + ' years price rose';

          if (pct >= 60)      cls = 'bt-cell bt-cell-bull';
          else if (pct >= 40) cls = 'bt-cell bt-cell-mid';
          else                cls = 'bt-cell bt-cell-bear';
        }

        html +=
          '<td class="' + cls + '" title="' + titleTxt + '">' +
            '<span class="bt-arrow">' + arrow + '</span>' +
            (rateTxt ? '<span class="bt-rate">' + rateTxt + '</span>' : '') +
          '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    document.getElementById('bt-raw-heatmap').innerHTML = html;
  }

  /* ─── 6. Render: Win Rate heatmap ───────────────────────────────────────── */

  function renderHeatmap(matrix) {
    var html = '<table class="bt-table"><thead><tr><th class="bt-corner"></th>';
    MONTH_ABBR.forEach(function (m) { html += '<th>' + m + '</th>'; });
    html += '</tr></thead><tbody>';

    for (var w = 0; w < 4; w++) {
      html += '<tr><td class="bt-row-label">' + WK_LABELS[w] + '</td>';
      for (var m = 0; m < 12; m++) {
        var c = matrix[m][w];
        var cls, arrow, rateTxt, titleTxt;

        if (c.signal === 'bull' || c.signal === 'bear') {
          arrow    = c.signal === 'bull' ? '▲' : '▼';
          var pct  = c.winRate !== null ? Math.round(c.winRate * 100) : null;

          if (pct === null) {
            cls     = 'bt-cell bt-cell-nodata';
            rateTxt = '—';
          } else if (pct >= 65) {
            cls     = 'bt-cell bt-cell-bull';
            rateTxt = pct + '%';
          } else if (pct >= 50) {
            cls     = 'bt-cell bt-cell-mid';
            rateTxt = pct + '%';
          } else {
            cls     = 'bt-cell bt-cell-bear';
            rateTxt = pct + '%';
          }

          titleTxt = c.wins + ' / ' + c.total + ' years correct' +
            (c.avgReturn !== null
              ? ' · avg ' + (c.avgReturn >= 0 ? '+' : '') + c.avgReturn.toFixed(3) + '%'
              : '');
        } else {
          cls      = 'bt-cell bt-cell-chop';
          arrow    = '~';
          rateTxt  = '';
          titleTxt = 'Chop / Flip — no directional signal to validate';
        }

        html +=
          '<td class="' + cls + '" title="' + titleTxt + '">' +
            '<span class="bt-arrow">' + arrow + '</span>' +
            (rateTxt ? '<span class="bt-rate">' + rateTxt + '</span>' : '') +
          '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    document.getElementById('bt-heatmap').innerHTML = html;
  }

  /* ─── 7. Render: Monthly return bar chart ────────────────────────────────── */

  function renderChart(monthlyAvg) {
    if (typeof Chart === 'undefined') {
      var s    = document.createElement('script');
      s.src    = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
      s.onload = function () { drawChart(monthlyAvg); };
      document.head.appendChild(s);
    } else {
      drawChart(monthlyAvg);
    }
  }

  function drawChart(returns) {
    var canvas = document.getElementById('bt-chart');
    if (!canvas) return;
    if (btChartInstance) { btChartInstance.destroy(); btChartInstance = null; }

    btChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: MONTH_ABBR,
        datasets: [{
          data: returns,
          backgroundColor: returns.map(function (v) {
            return v >= 0 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)';
          }),
          borderColor: returns.map(function (v) {
            return v >= 0 ? '#22c55e' : '#ef4444';
          }),
          borderWidth: 1,
          borderRadius: 3
        }]
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111318',
            borderColor:     '#1e2430',
            borderWidth:     1,
            titleColor:      '#94a3b8',
            bodyColor:       '#e2e8f0',
            titleFont: { family: "'IBM Plex Mono', monospace", size: 11 },
            bodyFont:  { family: "'IBM Plex Mono', monospace", size: 12 },
            callbacks: {
              title: function (items) { return items[0].label; },
              label: function (ctx) {
                var v = ctx.parsed.y;
                return (v >= 0 ? '+' : '') + v.toFixed(4) + '%  avg weekly return';
              }
            }
          }
        },
        scales: {
          x: {
            grid:  { color: '#1e2430' },
            ticks: { color: '#94a3b8', font: { family: "'IBM Plex Mono', monospace", size: 11 } }
          },
          y: {
            grid:  { color: '#1e2430' },
            ticks: {
              color: '#94a3b8',
              font:  { family: "'IBM Plex Mono', monospace", size: 11 },
              callback: function (v) { return (v >= 0 ? '+' : '') + v.toFixed(2) + '%'; }
            }
          }
        }
      }
    });
  }

  /* ─── 8. Display all results ─────────────────────────────────────────────── */

  function displayResults(stats) {
    lastStats = stats;

    document.getElementById('bt-summary').innerHTML =
      '<span class="bt-chip">' + stats.yearRange[0] + '–' + stats.yearRange[1] + '</span>' +
      '<span class="bt-chip">' + stats.yearsCount + ' years of data</span>' +
      '<span class="bt-chip">' + stats.totalBars.toLocaleString() + ' daily bars</span>' +
      '<span class="bt-chip">' + ASSET_CONFIG.name + '</span>';

    renderRawHeatmap(stats.rawTendency);
    renderHeatmap(stats.matrix);
    renderChart(stats.monthlyAvg);

    document.getElementById('bt-results').style.display    = '';
    document.getElementById('bt-upload-area').style.display = 'none';
  }

  /* ─── 9. File upload handler ─────────────────────────────────────────────── */

  var fileInput = document.getElementById('bt-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', function (evt) {
      var file = evt.target.files[0];
      if (!file) return;

      var label = document.getElementById('bt-upload-label');
      if (label) {
        label.childNodes[0].nodeValue = '';
        label.insertAdjacentText('beforeend', 'Parsing ' + file.name + '…');
      }

      var reader    = new FileReader();
      reader.onload = function (e) {
        var bars = parseCSV(e.target.result);
        if (bars.length < 50) {
          alert('Only ' + bars.length + ' valid daily bars found.\n\nPlease ensure:\n• The file is a D1 (daily) export from MetaTrader 5\n• The file contains at least 1 year of history\n• The format is tab-separated');
          if (label) label.innerHTML = '<input type="file" id="bt-file-input" accept=".csv" style="display:none">↑ &nbsp;Choose D1 CSV';
          var newInput = document.getElementById('bt-file-input');
          if (newInput) newInput.addEventListener('change', arguments.callee);
          return;
        }
        var stats = computeStats(bars);
        try { localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch (ex) {}
        displayResults(stats);
      };
      reader.onerror = function () { alert('Could not read the file. Please try again.'); };
      reader.readAsText(file, 'utf-8');
    });
  }

  /* ─── 10. Clear button ───────────────────────────────────────────────────── */

  var clearBtn = document.getElementById('bt-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (btChartInstance) { btChartInstance.destroy(); btChartInstance = null; }
      lastStats = null;
      try { localStorage.removeItem(STORE_KEY); } catch (ex) {}
      document.getElementById('bt-results').style.display    = 'none';
      document.getElementById('bt-upload-area').style.display = '';
    });
  }

  /* ─── 11. Restore from localStorage on page load ─────────────────────────── */

  (function () {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (!saved) return;
      var stats = JSON.parse(saved);
      if (stats && stats.rawTendency && stats.matrix && stats.yearRange) displayResults(stats);
    } catch (ex) {}
  }());

  /* ─── 12. Tab-activation refresh hook (called by ui.js) ─────────────────── */

  window.kptBtRefresh = function () {
    if (btChartInstance) {
      btChartInstance.resize();
    } else if (lastStats) {
      renderChart(lastStats.monthlyAvg);
    }
  };

}());
