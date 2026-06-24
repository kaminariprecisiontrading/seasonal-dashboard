/**
 * seasonal-chart.js — Seasonal Curve tab (Phase 4)
 *
 * Generates a cumulative-directional-bias line chart from MONTHS[] data.
 * Injects <section data-kpt-panel="scurve"> before .footnote so ui.js
 * auto-discovers it and adds a "Curve" tab to the tab bar.
 *
 * Three TF lines (5-YR pink · 15-YR brown · LT asset colour) plus a
 * Combined line (green, filled). Monthly background shading reflects the
 * overall combined signal per month. An amber dashed line marks today's
 * position in the seasonal year.
 *
 * Load order: after data.js, before ui.js (8th script)
 */
(function () {
  'use strict';

  if (typeof ASSET_CONFIG === 'undefined' || typeof MONTHS === 'undefined' || !Array.isArray(MONTHS) || MONTHS.length !== 12) return;

  /* ── Signal helpers ───────────────────────────────────────────────── */

  /** Convert raw signal string ('bull' | 'bear' | 'chop' | 'flip') to ±1 / 0 */
  function sigDelta(s) {
    if (!s) return 0;
    var u = String(s).toLowerCase();
    if (u === 'bull') return 1;
    if (u === 'bear') return -1;
    return 0; // chop, flip, avoid
  }

  /** Convert combined week label ("LONG ★★★") to ±1 / 0 */
  function comDelta(s) {
    if (!s) return 0;
    var u = String(s).toUpperCase();
    if (u.indexOf('LONG')  !== -1) return 1;
    if (u.indexOf('SHORT') !== -1) return -1;
    return 0;
  }

  /** Build a 48-point cumulative array (one point per week slot) */
  function buildCurve(getter) {
    var v = 0;
    var pts = [];
    MONTHS.forEach(function (m) {
      if (!Array.isArray(m.weeks)) return;
      m.weeks.forEach(function (w) {
        v += getter(w);
        pts.push(v);
      });
    });
    return pts;
  }

  /* ── Curve data ───────────────────────────────────────────────────── */

  var ltKey    = ASSET_CONFIG.ltKey    || 's34';
  var ltLabel  = ASSET_CONFIG.ltLabel  || 'LT';
  var ltAccent = ASSET_CONFIG.ltAccent || '#2563eb';

  var curve5   = buildCurve(function (w) { return sigDelta(w.s5);     });
  var curve15  = buildCurve(function (w) { return sigDelta(w.s15);    });
  var curveLt  = buildCurve(function (w) { return sigDelta(w[ltKey]); });
  var curveCom = buildCurve(function (w) { return comDelta(w.com);    });

  /* ── Today marker ─────────────────────────────────────────────────── */

  var now        = new Date();
  var todayMonth = now.getMonth();    // 0-11
  var todayDay   = now.getDate();
  var todayWk    = todayDay <= 7 ? 0 : todayDay <= 14 ? 1 : todayDay <= 21 ? 2 : 3;
  var todayIdx   = todayMonth * 4 + todayWk;

  var MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* ── X-axis labels (48 points: month abbr on Wk1, blank on Wk2-4) ── */

  var xLabels = [];
  MONTHS.forEach(function (m, mi) {
    if (!Array.isArray(m.weeks)) return;
    m.weeks.forEach(function (_, wi) {
      xLabels.push(wi === 0 ? MONTH_ABBR[mi] : '');
    });
  });

  /* ── Monthly background colors ────────────────────────────────────── */

  var monthBg = MONTHS.map(function (m) {
    var c = String(m.combined || '').toLowerCase();
    if (c === 'bull') return 'rgba(34,197,94,0.08)';
    if (c === 'bear') return 'rgba(239,68,68,0.08)';
    return 'rgba(245,158,11,0.04)';
  });

  /* ── Current week info for the header ────────────────────────────── */

  var currentMonth = MONTHS[todayMonth] || {};
  var currentWks   = Array.isArray(currentMonth.weeks) ? currentMonth.weeks : [];
  var currentWk    = currentWks[todayWk] || {};
  var currentCom   = currentWk.com || '—';

  /* ── Inject panel HTML ────────────────────────────────────────────── */

  var section = document.createElement('section');
  section.setAttribute('data-kpt-panel', 'scurve');
  section.className = 'scurve-panel';
  section.innerHTML =
    '<div class="sc-header">' +
      '<div class="sc-header-left">' +
        '<span class="sc-label">SEASONAL CURVE</span>' +
        '<span class="sc-sub">Cumulative directional bias &nbsp;·&nbsp; ' + ASSET_CONFIG.name + '</span>' +
      '</div>' +
      '<div class="sc-now">' +
        '<span class="sc-now-dot" aria-hidden="true">▸</span>' +
        '<span class="sc-now-text">NOW &nbsp;·&nbsp; ' + MONTH_ABBR[todayMonth] + ' Wk' + (todayWk + 1) + '</span>' +
        '<span class="sc-now-signal">' + currentCom + '</span>' +
      '</div>' +
    '</div>' +
    '<details class="bt-desc-toggle">' +
      '<summary>How to read this</summary>' +
      '<div class="sc-explainer">' +
        '<div class="sc-exp-grid">' +

          '<div class="sc-exp-col">' +
            '<p class="sc-exp-heading">What the curve shows</p>' +
            '<p class="sc-exp-body">Each line accumulates the weekly directional signal across the year. ' +
            'A rising curve means the seasonal tendency is bullish for that timeframe — each week is adding net upward bias. ' +
            'A falling curve means the opposite. ' +
            'The curve does <em>not</em> represent price — it represents the strength and direction of the seasonal pattern.</p>' +
            '<p class="sc-exp-body">The <strong>zero line</strong> (dashed) is the neutral baseline. ' +
            'When the combined line (green) is above zero, the net seasonal bias since January has been bullish. ' +
            'Below zero means net bearish. Crossing the zero line signals a seasonal regime shift.</p>' +
          '</div>' +

          '<div class="sc-exp-col">' +
            '<p class="sc-exp-heading">The four lines</p>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:#e040a0;"></span>' +
              '<span><strong>5-YR (pink)</strong> — recent seasonal pattern. Most responsive to modern market structure; can diverge sharply from longer history.</span>' +
            '</div>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:#8b3a2a;"></span>' +
              '<span><strong>15-YR (brown)</strong> — medium-term pattern. Balances recent behaviour with enough history to smooth out one-off years.</span>' +
            '</div>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:' + ltAccent + ';"></span>' +
              '<span><strong>' + ltLabel + ' (accent)</strong> — long-term historical baseline. Most statistically robust; slowest to reflect structural market changes.</span>' +
            '</div>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:#22c55e;"></span>' +
              '<span><strong>Combined (green)</strong> — synthesised signal across all timeframes. The primary actionable line.</span>' +
            '</div>' +
          '</div>' +

          '<div class="sc-exp-col">' +
            '<p class="sc-exp-heading">Colour shading &amp; markers</p>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:rgba(34,197,94,0.25);border:1px solid rgba(34,197,94,0.4);"></span>' +
              '<span><strong>Green background</strong> — month\'s combined signal is LONG (bullish).</span>' +
            '</div>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:rgba(239,68,68,0.25);border:1px solid rgba(239,68,68,0.4);"></span>' +
              '<span><strong>Red background</strong> — month\'s combined signal is SHORT (bearish).</span>' +
            '</div>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch" style="background:rgba(245,158,11,0.2);border:1px solid rgba(245,158,11,0.35);"></span>' +
              '<span><strong>Amber background</strong> — CHOP or FLIP month; no clear directional bias.</span>' +
            '</div>' +
            '<div class="sc-exp-legend">' +
              '<span class="sc-exp-swatch sc-exp-swatch--dashed"></span>' +
              '<span><strong>Amber dashed line</strong> — today\'s position in the seasonal year.</span>' +
            '</div>' +
            '<p class="sc-exp-body" style="margin-top:10px;">' +
            '<strong>Confluence:</strong> when all four lines slope the same direction at once, the seasonal signal is strong. ' +
            'When they diverge — especially 5-YR vs LT — use caution and wait for confirmation.' +
            '</p>' +
          '</div>' +

        '</div>' +
      '</div>' +
    '</details>' +
    '<div class="sc-chart-wrap">' +
      '<canvas id="sc-canvas"></canvas>' +
    '</div>' +
    '<p class="sc-footer">' +
      'Rising = seasonal tailwind &nbsp;·&nbsp; Falling = headwind &nbsp;·&nbsp; ' +
      'Shading = monthly combined signal &nbsp;·&nbsp; ' +
      '<span style="color:#f59e0b;">&#9472;&#9472;</span> = today' +
    '</p>';

  /* Insert before .footnote (same pattern as backtest.js / macro.js) */
  var footnote = document.querySelector('.footnote');
  if (footnote && footnote.parentNode) {
    footnote.parentNode.insertBefore(section, footnote);
  } else {
    var container = document.querySelector('.container');
    if (container) container.appendChild(section);
  }

  /* ── Chart render ─────────────────────────────────────────────────── */

  function renderChart() {
    var canvas = document.getElementById('sc-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    /* Plugin: monthly background blocks + today dashed line */
    var decorPlugin = {
      id: 'scDecor',
      beforeDraw: function (chart) {
        var c2     = chart.ctx;
        var ca     = chart.chartArea;
        var xScale = chart.scales.x;

        /* Monthly background shading */
        MONTHS.forEach(function (m, mi) {
          var x0 = xScale.getPixelForValue(mi * 4);
          var x1 = xScale.getPixelForValue(mi * 4 + 3.99);
          c2.save();
          c2.fillStyle = monthBg[mi];
          c2.fillRect(x0, ca.top, x1 - x0, ca.bottom - ca.top);
          c2.restore();
        });

        /* Today dashed vertical line */
        var tx = xScale.getPixelForValue(todayIdx);
        c2.save();
        c2.strokeStyle = '#f59e0b';
        c2.lineWidth   = 1.5;
        c2.setLineDash([5, 3]);
        c2.beginPath();
        c2.moveTo(tx, ca.top);
        c2.lineTo(tx, ca.bottom);
        c2.stroke();
        c2.restore();
      }
    };

    /* Plugin: horizontal zero baseline */
    var zeroPlugin = {
      id: 'scZero',
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

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: xLabels,
        datasets: [
          {
            label: '5-YR',
            data: curve5,
            borderColor: '#e040a0',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#e040a0',
            tension: 0.35,
            order: 3,
          },
          {
            label: '15-YR',
            data: curve15,
            borderColor: '#8b3a2a',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#8b3a2a',
            tension: 0.35,
            order: 2,
          },
          {
            label: ltLabel,
            data: curveLt,
            borderColor: ltAccent,
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: ltAccent,
            tension: 0.35,
            order: 1,
          },
          {
            label: 'Combined',
            data: curveCom,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34,197,94,0.06)',
            fill: true,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#22c55e',
            tension: 0.35,
            order: 0,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 500, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: '#94a3b8',
              font: { family: 'IBM Plex Mono', size: 10 },
              boxWidth: 20,
              boxHeight: 2,
              padding: 14,
              usePointStyle: false,
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
            caretPadding: 6,
            callbacks: {
              title: function (items) {
                var idx = items[0].dataIndex;
                var mi  = Math.floor(idx / 4);
                var wi  = idx % 4;
                var m   = MONTHS[mi] || {};
                var wks = Array.isArray(m.weeks) ? m.weeks : [];
                var wk  = wks[wi] || {};
                return MONTH_ABBR[mi] + ' Wk' + (wi + 1) + '  ·  ' + (wk.com || '—');
              },
              label: function (item) {
                var v = item.raw;
                return '  ' + item.dataset.label + ': ' + (v >= 0 ? '+' : '') + v;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#4a5568',
              font: { family: 'IBM Plex Mono', size: 10 },
              maxRotation: 0,
              autoSkip: false,
            },
            grid: { color: 'rgba(30,36,48,0.8)' },
          },
          y: {
            ticks: { display: false },
            grid: { color: 'rgba(30,36,48,0.8)' },
          }
        }
      },
      plugins: [decorPlugin, zeroPlugin]
    });
  }

  /* Load Chart.js on demand (shared with backtest.js) */
  if (window.Chart) {
    renderChart();
  } else {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
    s.onload = renderChart;
    document.head.appendChild(s);
  }

})();
