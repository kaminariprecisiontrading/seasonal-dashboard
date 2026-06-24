/**
 * intraday.js — Intraday Bias Tool (Phase 2.5)
 *
 * Upload an H1 or H4 CSV from MT5 → average return per hour of day,
 * session breakdown (Asian / London / L-NY Overlap / New York),
 * and day-of-week tendencies.
 *
 * Signal filter: narrow results to bars from Bull / Bear / Chop weeks
 * using the current asset's MONTHS[] seasonal data.
 *
 * Injects <section data-kpt-panel="intraday"> → ui.js auto-discovers it.
 * Load order: after data.js, before ui.js
 */
(function () {
  'use strict';

  if (typeof ASSET_CONFIG === 'undefined' || typeof MONTHS === 'undefined') return;

  var ASSET_ID  = ASSET_CONFIG.id;
  var STORE_KEY = 'kpt-idt-' + ASSET_ID;
  var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /* ── Current seasonal signal ─────────────────────────────────────────── */

  var now      = new Date();
  var curMonth = now.getMonth();
  var curDay   = now.getDate();
  var curWkSlot = curDay <= 7 ? 0 : curDay <= 14 ? 1 : curDay <= 21 ? 2 : 3;

  var curCom = (function () {
    var m = MONTHS[curMonth];
    if (!m || !Array.isArray(m.weeks)) return '';
    return String((m.weeks[curWkSlot] || {}).com || '');
  })();

  var curSignal = curCom.toUpperCase().indexOf('LONG')  !== -1 ? 'bull' :
                  curCom.toUpperCase().indexOf('SHORT') !== -1 ? 'bear' : 'chop';

  var curSignalLabel = curSignal === 'bull' ? 'LONG' :
                       curSignal === 'bear' ? 'SHORT' : 'CHOP';

  /* ── Session definitions ─────────────────────────────────────────────── */
  // Hours are in broker server time (EET: UTC+2 winter / UTC+3 summer).
  // 00:00 broker = 22:00 UTC (winter) / 21:00 UTC (summer).
  // UTC equivalents shown in comments assume UTC+2 (winter/standard offset).
  // H1: 24 hour slots · H4: 6 hour slots (0,4,8,12,16,20)

  var SESSIONS_H1 = [
    { id: 'lateNY',  label: 'Late NY',      sublabel: '00–01',  color: 'rgba(148,163,184,0.07)', hours: [0, 1]              }, // 22–23 UTC
    { id: 'asian',   label: 'Asian',        sublabel: '02–09',  color: 'rgba(59,130,246,0.1)',   hours: [2,3,4,5,6,7,8,9]  }, // 00–07 UTC
    { id: 'london',  label: 'London',       sublabel: '10–14',  color: 'rgba(245,158,11,0.1)',   hours: [10,11,12,13,14]    }, // 08–12 UTC
    { id: 'overlap', label: 'L/NY Overlap', sublabel: '15–18',  color: 'rgba(167,139,250,0.14)', hours: [15,16,17,18]       }, // 13–16 UTC
    { id: 'ny',      label: 'New York',     sublabel: '19–22',  color: 'rgba(34,197,94,0.1)',    hours: [19,20,21,22]       }, // 17–20 UTC
    { id: 'late',    label: 'After-hours',  sublabel: '23',     color: 'rgba(148,163,184,0.04)', hours: [23]                }  // 21 UTC
  ];

  var SESSIONS_H4 = [
    { id: 'lateNY',  label: 'Late NY / Sydney', sublabel: '00',    color: 'rgba(148,163,184,0.07)', hours: [0]      }, // 22 UTC
    { id: 'asian',   label: 'Asian',            sublabel: '04–08', color: 'rgba(59,130,246,0.1)',   hours: [4, 8]   }, // 02–06 UTC
    { id: 'london',  label: 'London',           sublabel: '12',    color: 'rgba(245,158,11,0.1)',   hours: [12]     }, // 10 UTC
    { id: 'overlap', label: 'L/NY Overlap',     sublabel: '16',    color: 'rgba(167,139,250,0.14)', hours: [16]     }, // 14 UTC
    { id: 'ny',      label: 'New York',         sublabel: '20',    color: 'rgba(34,197,94,0.1)',    hours: [20]     }  // 18 UTC
  ];

  /* ── State ───────────────────────────────────────────────────────────── */

  var activeFilter  = 'all';
  var lastStats     = null;
  var chartInstance = null;

  /* ── Panel HTML ──────────────────────────────────────────────────────── */

  var section = document.createElement('section');
  section.setAttribute('data-kpt-panel', 'intraday');
  section.className = 'idt-panel';
  section.innerHTML = [

    '<div class="idt-header">',
    '  <div class="idt-header-left">',
    '    <span class="idt-label">INTRADAY BIAS</span>',
    '    <span class="idt-sub">Hour of day &nbsp;·&nbsp; Session &nbsp;·&nbsp; Day of week &nbsp;·&nbsp; ' + ASSET_CONFIG.name + '</span>',
    '  </div>',
    '  <div class="idt-now">',
    '    <span class="idt-now-text">Current seasonal signal</span>',
    '    <span class="idt-now-sig ' + curSignal + '-tag">' + curSignalLabel + '</span>',
    '    <span class="idt-now-week">' + curCom + '</span>',
    '  </div>',
    '</div>',

    /* ── Explainer toggle ── */
    '<details class="bt-desc-toggle">',
    '  <summary>How to read this</summary>',
    '  <div class="idt-explainer">',
    '    <div class="idt-exp-grid">',

    '    <div class="idt-exp-col">',
    '      <p class="sc-exp-heading">What this shows</p>',
    '      <p class="sc-exp-body">Each bar shows the <strong>average return (%)</strong> for that hour of day, '
      + 'measured from bar open to bar close across all years in the dataset. '
      + 'Green bars = price has historically tended to rise during that hour. '
      + 'Red bars = price has historically tended to fall.</p>',
    '      <p class="sc-exp-body">The <strong>amber line</strong> (right axis) shows the percentage of bars '
      + 'in that hour slot that closed higher than they opened. Above 50% = historically bullish hour; '
      + 'below 50% = historically bearish.</p>',
    '    </div>',

    '    <div class="idt-exp-col">',
    '      <p class="sc-exp-heading">Signal filter</p>',
    '      <p class="sc-exp-body">The <strong>signal filter</strong> narrows the dataset to only bars from '
      + 'weeks where the seasonal signal was LONG (bull), SHORT (bear), or CHOP — '
      + 'as derived from the seasonal data in the Seasonals tab.</p>',
    '      <p class="sc-exp-body">For example, filtering to <strong>Bear weeks</strong> shows the average '
      + 'hourly return distribution during seasonally bearish periods — '
      + 'revealing which sessions and hours historically see the strongest selling pressure '
      + 'when the seasonal bias is already short.</p>',
    '      <p class="sc-exp-body">The current week\'s signal is shown in the header. '
      + 'Filtering to match it gives the most contextually relevant intraday view.</p>',
    '    </div>',

    '    <div class="idt-exp-col">',
    '      <p class="sc-exp-heading">Sessions &amp; timezone</p>',
    '      <p class="sc-exp-body">Session times are mapped to <strong>broker server time (EET)</strong> — '
      + 'UTC+2 in winter, UTC+3 in summer. '
      + '00:00 broker = 22:00 UTC (winter) / 21:00 UTC (summer).</p>',
    '      <p class="sc-exp-body">Corrected session boundaries (broker time): '
      + 'Late NY (00–01) · Asian (02–09) · London (10–14) · '
      + 'L/NY Overlap (15–18) · New York (19–22) · After-hours (23). '
      + 'London opens at 10:00 broker (08:00 UTC); '
      + 'New York at 15:00 broker (13:00 UTC).</p>',
    '      <p class="sc-exp-body">In European summer (Apr–Oct) all sessions shift ~1 hour later in broker time. '
      + 'The <strong>day-of-week</strong> section shows which day is typically '
      + 'strongest or weakest — useful for timing entries within the week.</p>',
    '    </div>',

    '    </div>',
    '  </div>',
    '</details>',

    /* ── Upload area ── */
    '<div id="idt-upload-wrap">',
    '  <div id="idt-upload-area" class="idt-upload-area">',
    '    <input type="file" id="idt-file-input" accept=".csv,.txt" style="display:none;">',
    '    <div class="idt-upload-inner" onclick="document.getElementById(\'idt-file-input\').click()">',
    '      <div class="idt-upload-icon">⏱</div>',
    '      <div class="idt-upload-title">Upload H1 or H4 CSV</div>',
    '      <div class="idt-upload-hint">Drag &amp; drop or click &nbsp;·&nbsp; MT5 H1 / H4 history export &nbsp;·&nbsp; Same export steps as Backtest tab</div>',
    '    </div>',
    '  </div>',
    '</div>',

    /* ── Results (hidden until data loaded) ── */
    '<div id="idt-results" style="display:none;">',

    '  <div class="idt-meta-row" id="idt-meta-row"></div>',

    '  <div class="idt-controls">',
    '    <span class="idt-filter-label">Show weeks:</span>',
    '    <div class="idt-filter-btns" id="idt-filter-btns">',
    '      <button class="idt-filter-btn active" data-filter="all">All weeks</button>',
    '      <button class="idt-filter-btn" data-filter="bull">Bull (Long) weeks</button>',
    '      <button class="idt-filter-btn" data-filter="bear">Bear (Short) weeks</button>',
    '      <button class="idt-filter-btn" data-filter="chop">Chop weeks</button>',
    '    </div>',
    '    <button class="idt-clear-btn" id="idt-clear-btn">✕ Clear data</button>',
    '  </div>',

    '  <div class="idt-chart-section">',
    '    <p class="idt-chart-title" id="idt-chart-title">Average return by hour of day (%)</p>',
    '    <div class="idt-chart-wrap">',
    '      <canvas id="idt-canvas"></canvas>',
    '    </div>',
    '    <div class="idt-session-legend" id="idt-session-legend"></div>',
    '  </div>',

    '  <div class="idt-lower">',
    '    <div id="idt-sessions"></div>',
    '    <div id="idt-dow"></div>',
    '  </div>',

    '</div>',

    '<div class="idt-status" id="idt-status"></div>',

  ].join('\n');

  /* Insert before .footnote */
  var footnote = document.querySelector('.footnote');
  if (footnote && footnote.parentNode) {
    footnote.parentNode.insertBefore(section, footnote);
  } else {
    (document.querySelector('.container') || document.body).appendChild(section);
  }

  /* ── Wire up interactions ────────────────────────────────────────────── */

  var uploadArea = document.getElementById('idt-upload-area');
  var fileInput  = document.getElementById('idt-file-input');

  fileInput.addEventListener('change', function (e) {
    if (e.target.files[0]) processFile(e.target.files[0]);
  });
  uploadArea.addEventListener('dragover',  function (e) { e.preventDefault(); uploadArea.classList.add('idt-drag'); });
  uploadArea.addEventListener('dragleave', function ()  { uploadArea.classList.remove('idt-drag'); });
  uploadArea.addEventListener('drop',      function (e) {
    e.preventDefault(); uploadArea.classList.remove('idt-drag');
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  });

  document.getElementById('idt-filter-btns').addEventListener('click', function (e) {
    var btn = e.target.closest('.idt-filter-btn');
    if (!btn || !lastStats) return;
    document.querySelectorAll('.idt-filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    refreshViews();
  });

  document.getElementById('idt-clear-btn').addEventListener('click', function () {
    localStorage.removeItem(STORE_KEY);
    lastStats = null;
    chartInstance = null;
    document.getElementById('idt-results').style.display = 'none';
    document.getElementById('idt-upload-wrap').style.display = '';
    activeFilter = 'all';
    document.querySelectorAll('.idt-filter-btn').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
    setStatus('');
  });

  /* ── Restore from localStorage ───────────────────────────────────────── */

  (function () {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      // schemaVer 2: sessionDefs removed from cache; old entries are incompatible.
      if (s && s.schemaVer === 2 && s.meta && s.groups && s.hourList) {
        lastStats = s; renderResults(s);
      } else if (s) {
        // Stale cache (old session IDs) — discard silently so user sees upload prompt
        localStorage.removeItem(STORE_KEY);
      }
    } catch (e) {}
  })();

  /* ── File processing ─────────────────────────────────────────────────── */

  function processFile(file) {
    setStatus('Parsing ' + file.name + ' …');
    var reader = new FileReader();
    reader.onload = function (e) {
      var stats = parseAndCompute(e.target.result);
      if (!stats) return;
      lastStats = stats;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch (ex) {}
      renderResults(stats);
      setStatus('');
    };
    reader.readAsText(file);
  }

  function setStatus(msg) {
    var el = document.getElementById('idt-status');
    if (el) { el.textContent = msg; el.style.display = msg ? '' : 'none'; }
  }

  /* ── CSV parse and compute ───────────────────────────────────────────── */

  function getSignal(month, day) {
    var wkSlot = day <= 7 ? 0 : day <= 14 ? 1 : day <= 21 ? 2 : 3;
    var m = MONTHS[month];
    if (!m || !Array.isArray(m.weeks) || !m.weeks[wkSlot]) return 'chop';
    var com = String(m.weeks[wkSlot].com || '').toUpperCase();
    if (com.indexOf('LONG')  !== -1) return 'bull';
    if (com.indexOf('SHORT') !== -1) return 'bear';
    return 'chop';
  }

  function makeSlot() { return { count: 0, posCount: 0, sumRet: 0 }; }

  function accumulate(slot, ret) {
    slot.count++;
    slot.sumRet += ret;
    if (ret > 0) slot.posCount++;
  }

  function parseAndCompute(content) {
    var lines = content.split('\n');
    if (lines.length < 10) { setStatus('CSV appears empty or too short.'); return null; }

    /* Pass 1: count bars per date to identify D1-disguised early data */
    var barsPerDate = {};
    var parsed = [];

    for (var i = 1; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var cols = line.split('\t');
      if (cols.length < 6) continue;

      var dateParts = cols[0].split('.');
      var timeParts = cols[1].split(':');
      if (dateParts.length < 3) continue;

      var year  = parseInt(dateParts[0], 10);
      var month = parseInt(dateParts[1], 10) - 1;   // 0–11
      var day   = parseInt(dateParts[2], 10);
      var hour  = parseInt(timeParts[0], 10) || 0;
      var open  = parseFloat(cols[2]);
      var close = parseFloat(cols[5]);

      if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(open) || isNaN(close) || open === 0) continue;

      var dateKey = cols[0]; // 'YYYY.MM.DD'
      barsPerDate[dateKey] = (barsPerDate[dateKey] || 0) + 1;

      parsed.push({ dateKey: dateKey, year: year, month: month, day: day, hour: hour, open: open, close: close });
    }

    /* Pass 2: keep only true intraday bars (days with >1 bar) */
    var intradayBars = [];
    for (var j = 0; j < parsed.length; j++) {
      var b = parsed[j];
      if (barsPerDate[b.dateKey] > 1) intradayBars.push(b);
    }

    if (intradayBars.length < 200) {
      setStatus('Not enough intraday bars found (' + intradayBars.length + '). Please upload an H1 or H4 file, not D1.');
      return null;
    }

    /* Detect timeframe from unique hour values */
    var uniqueHoursSet = {};
    for (var k = 0; k < intradayBars.length; k++) uniqueHoursSet[intradayBars[k].hour] = true;
    var hourList = Object.keys(uniqueHoursSet).map(Number).sort(function (a, b) { return a - b; });
    var tfType    = hourList.length <= 8 ? 'H4' : 'H1';
    var sessionDefs = tfType === 'H4' ? SESSIONS_H4 : SESSIONS_H1;

    /* Build accumulator */
    function makeGroup() {
      var hourly = {}, sess = {}, dow = {};
      hourList.forEach(function (h) { hourly[h] = makeSlot(); });
      sessionDefs.forEach(function (s) { sess[s.id] = makeSlot(); });
      for (var d = 1; d <= 5; d++) dow[d] = makeSlot();
      return { hourly: hourly, sessions: sess, dow: dow };
    }

    var groups = { all: makeGroup(), bull: makeGroup(), bear: makeGroup(), chop: makeGroup() };

    /* Pass 3: accumulate stats */
    for (var n = 0; n < intradayBars.length; n++) {
      var bar    = intradayBars[n];
      var ret    = (bar.close - bar.open) / bar.open * 100;
      var signal = getSignal(bar.month, bar.day);
      var dow    = new Date(bar.year, bar.month, bar.day).getDay(); // 0=Sun

      /* Hourly */
      if (groups.all.hourly[bar.hour]) {
        accumulate(groups.all.hourly[bar.hour], ret);
        if (groups[signal]) accumulate(groups[signal].hourly[bar.hour], ret);
      }

      /* Sessions */
      sessionDefs.forEach(function (s) {
        if (s.hours.indexOf(bar.hour) !== -1) {
          accumulate(groups.all.sessions[s.id], ret);
          if (groups[signal]) accumulate(groups[signal].sessions[s.id], ret);
        }
      });

      /* Day of week (Mon=1 … Fri=5) */
      if (dow >= 1 && dow <= 5) {
        accumulate(groups.all.dow[dow], ret);
        if (groups[signal]) accumulate(groups[signal].dow[dow], ret);
      }
    }

    /* Date range */
    var dateKeys = Object.keys(barsPerDate).sort();

    return {
      schemaVer:  2,          // bump when session IDs change — forces old cache to discard
      groups:     groups,
      hourList:   hourList,
      tfType:     tfType,
      // sessionDefs is NOT stored — always derived live from SESSIONS_H1/H4 so
      // code updates to session boundaries take effect without requiring re-upload.
      meta: {
        firstDate:    dateKeys[0]                   || '',
        lastDate:     dateKeys[dateKeys.length - 1]  || '',
        totalBars:    parsed.length,
        intradayBars: intradayBars.length
      }
    };
  }

  /* ── Render ──────────────────────────────────────────────────────────── */

  function renderResults(stats) {
    document.getElementById('idt-upload-wrap').style.display = 'none';
    document.getElementById('idt-results').style.display    = '';

    var meta = stats.meta;
    var el = document.getElementById('idt-meta-row');
    if (el) el.textContent = stats.tfType + ' · ' + meta.intradayBars.toLocaleString() + ' intraday bars · ' +
      meta.firstDate + ' → ' + meta.lastDate;

    /* Highlight filter button matching current seasonal signal */
    document.querySelectorAll('.idt-filter-btn').forEach(function (btn) {
      btn.classList.remove('idt-filter-btn--current');
      if (btn.dataset.filter === curSignal) btn.classList.add('idt-filter-btn--current');
    });

    lastStats = stats;
    refreshViews();
  }

  function refreshViews() {
    if (!lastStats) return;
    renderChart(lastStats);
    renderSessions(lastStats);
    renderDow(lastStats);
  }

  /* ── Chart (hourly bar chart) ────────────────────────────────────────── */

  function renderChart(stats) {
    var grp        = stats.groups[activeFilter] || stats.groups.all;
    var hourList   = stats.hourList;
    var sessionDefs = stats.tfType === 'H4' ? SESSIONS_H4 : SESSIONS_H1;

    var labels     = hourList.map(function (h) { return pad(h) + ':00'; });
    var avgReturns = hourList.map(function (h) {
      var s = grp.hourly[h];
      return (s && s.count > 0) ? round4(s.sumRet / s.count) : 0;
    });
    var posPcts = hourList.map(function (h) {
      var s = grp.hourly[h];
      return (s && s.count > 0) ? round1(s.posCount / s.count * 100) : 50;
    });
    var barColors = avgReturns.map(function (v) {
      return v >= 0 ? 'rgba(34,197,94,0.75)' : 'rgba(239,68,68,0.75)';
    });

    /* Update chart title */
    var totalBars = hourList.reduce(function (acc, h) { return acc + ((grp.hourly[h] && grp.hourly[h].count) || 0); }, 0);
    var filterLabel = { all: 'All weeks', bull: 'Bull (Long) weeks', bear: 'Bear (Short) weeks', chop: 'Chop weeks' }[activeFilter] || activeFilter;
    var titleEl = document.getElementById('idt-chart-title');
    if (titleEl) titleEl.textContent = 'Average return by hour — ' + filterLabel + ' — ' + totalBars.toLocaleString() + ' bars';

    /* Session shading plugin */
    var sessionPlugin = {
      id: 'idtSessionBg',
      beforeDraw: function (chart) {
        var c2     = chart.ctx;
        var ca     = chart.chartArea;
        var xScale = chart.scales.x;
        var barW   = (ca.right - ca.left) / hourList.length;

        sessionDefs.forEach(function (sess) {
          sess.hours.forEach(function (h) {
            var idx = hourList.indexOf(h);
            if (idx === -1) return;
            var cx = xScale.getPixelForValue(idx);
            c2.save();
            c2.fillStyle = sess.color;
            c2.fillRect(cx - barW / 2, ca.top, barW, ca.bottom - ca.top);
            c2.restore();
          });
        });
      }
    };

    /* Zero baseline plugin */
    var zeroPlugin = {
      id: 'idtZero',
      afterDraw: function (chart) {
        var c2     = chart.ctx;
        var ca     = chart.chartArea;
        var yScale = chart.scales.y;
        var y0     = yScale.getPixelForValue(0);
        if (y0 < ca.top || y0 > ca.bottom) return;
        c2.save();
        c2.strokeStyle = '#2a3345';
        c2.lineWidth   = 1;
        c2.setLineDash([3, 5]);
        c2.beginPath();
        c2.moveTo(ca.left, y0);
        c2.lineTo(ca.right, y0);
        c2.stroke();
        c2.restore();
      }
    };

    /* If chart exists, update data in-place */
    if (chartInstance) {
      chartInstance.data.labels                       = labels;
      chartInstance.data.datasets[0].data            = avgReturns;
      chartInstance.data.datasets[0].backgroundColor = barColors;
      chartInstance.data.datasets[1].data            = posPcts;
      chartInstance.update('none');
      buildSessionLegend(sessionDefs);
      return;
    }

    function doRender() {
      var canvas = document.getElementById('idt-canvas');
      if (!canvas) return;
      chartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Avg return (%)',
              data: avgReturns,
              backgroundColor: barColors,
              borderWidth: 0,
              yAxisID: 'y',
              order: 1,
            },
            {
              label: '% positive',
              data: posPcts,
              type: 'line',
              borderColor: '#f59e0b',
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              pointRadius: 3,
              pointBackgroundColor: '#f59e0b',
              pointHoverRadius: 5,
              tension: 0.3,
              yAxisID: 'y2',
              order: 0,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 400 },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: { family: 'IBM Plex Mono', size: 10 },
                boxWidth: 20, padding: 14,
              }
            },
            tooltip: {
              backgroundColor: '#0d1117',
              borderColor: '#1e2430',
              borderWidth: 1,
              titleColor: '#f1f5f9',
              bodyColor: '#94a3b8',
              titleFont: { family: 'IBM Plex Mono', size: 11, weight: 'bold' },
              bodyFont:  { family: 'IBM Plex Mono', size: 10 },
              padding: 10,
              callbacks: {
                title: function (items) { return labels[items[0].dataIndex] + ' server time'; },
                label: function (item) {
                  if (item.datasetIndex === 0) {
                    var v = item.raw;
                    return '  Avg return: ' + (v >= 0 ? '+' : '') + v.toFixed(4) + '%';
                  }
                  return '  % positive: ' + item.raw.toFixed(1) + '%';
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#64748b',
                font: { family: 'IBM Plex Mono', size: 10 },
                maxRotation: 0,
              },
              grid: { color: 'rgba(30,36,48,0.8)' }
            },
            y: {
              position: 'left',
              ticks: {
                color: '#64748b',
                font: { family: 'IBM Plex Mono', size: 10 },
                callback: function (v) { return (v >= 0 ? '+' : '') + v.toFixed(3) + '%'; }
              },
              grid: { color: 'rgba(30,36,48,0.8)' }
            },
            y2: {
              position: 'right',
              min: 30, max: 70,
              ticks: {
                color: '#f59e0b',
                font: { family: 'IBM Plex Mono', size: 10 },
                callback: function (v) { return v + '%'; }
              },
              grid: { drawOnChartArea: false }
            }
          }
        },
        plugins: [sessionPlugin, zeroPlugin]
      });
      buildSessionLegend(sessionDefs);
    }

    if (window.Chart) {
      doRender();
    } else {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
      s.onload = doRender;
      document.head.appendChild(s);
    }
  }

  function buildSessionLegend(sessionDefs) {
    var el = document.getElementById('idt-session-legend');
    if (!el) return;
    el.innerHTML = sessionDefs.map(function (s) {
      return '<span class="idt-sess-chip" style="background:' + s.color + ';border-color:' + s.color.replace(/[\d.]+\)/, '0.4)') + '">' +
        s.label + ' ' + s.sublabel + '</span>';
    }).join('');
  }

  /* ── Session summary cards ───────────────────────────────────────────── */

  function renderSessions(stats) {
    var grp  = stats.groups[activeFilter] || stats.groups.all;
    var defs = stats.tfType === 'H4' ? SESSIONS_H4 : SESSIONS_H1;
    var el   = document.getElementById('idt-sessions');
    if (!el) return;

    var html = '<p class="idt-section-title">By Session</p><div class="idt-sess-cards">';
    defs.forEach(function (sess) {
      var s = grp.sessions[sess.id];
      if (!s || s.count === 0) return;
      var avg = s.sumRet / s.count;
      var pct = s.posCount / s.count * 100;
      var cls = avg >= 0 ? 'idt-card--bull' : 'idt-card--bear';
      html += '<div class="idt-sess-card ' + cls + '">' +
        '<span class="idt-card-name">' + sess.label + '</span>' +
        '<span class="idt-card-sub">' + sess.sublabel + ' server time</span>' +
        '<span class="idt-card-return">' + (avg >= 0 ? '+' : '') + avg.toFixed(4) + '%</span>' +
        '<span class="idt-card-pct">' + pct.toFixed(0) + '% positive</span>' +
        '<span class="idt-card-count">' + s.posCount.toLocaleString() + ' / ' + s.count.toLocaleString() + ' bars</span>' +
        '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  /* ── Day-of-week table ───────────────────────────────────────────────── */

  function renderDow(stats) {
    var grp = stats.groups[activeFilter] || stats.groups.all;
    var el  = document.getElementById('idt-dow');
    if (!el) return;

    var html = '<p class="idt-section-title">By Day of Week</p><div class="idt-dow-cards">';
    [1, 2, 3, 4, 5].forEach(function (d) {
      var s = grp.dow[d];
      if (!s || s.count === 0) return;
      var avg = s.sumRet / s.count;
      var pct = s.posCount / s.count * 100;
      var cls = avg >= 0 ? 'idt-card--bull' : 'idt-card--bear';
      html += '<div class="idt-dow-card ' + cls + '">' +
        '<span class="idt-card-name">' + DAY_NAMES[d] + '</span>' +
        '<span class="idt-card-return">' + (avg >= 0 ? '+' : '') + avg.toFixed(4) + '%</span>' +
        '<span class="idt-card-pct">' + pct.toFixed(0) + '% pos</span>' +
        '<span class="idt-card-count">' + s.posCount.toLocaleString() + ' / ' + s.count.toLocaleString() + '</span>' +
        '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  /* ── Utility ─────────────────────────────────────────────────────────── */

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function round4(v) { return Math.round(v * 10000) / 10000; }
  function round1(v) { return Math.round(v * 10) / 10; }

  /* ── Expose resize hook (called by ui.js on tab activation) ─────────── */
  window.kptIdtRefresh = function () {
    if (chartInstance) chartInstance.resize();
  };

})();
