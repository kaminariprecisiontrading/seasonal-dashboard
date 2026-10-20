/**
 * heatmap.js — the /heatmap page (NEW_PAGES_BUILD_NOTES.md Phase 4).
 *
 * Rows: every live asset, grouped by the dashboard's sections (FX Majors / Minors /
 * Crosses, the 9 futures groups, Crypto), filterable by group chip.
 * Two views:
 *  - Months: 12 columns, each the asset's month-level verdict from MONTHS[]
 *    (`combined` + `stars`, via data/month_signals.js → KptSignals.getMonthSignal).
 *    Rule documented in DATA_DICTIONARY.md → "Heatmap month view".
 *  - Weeks: a rolling 12 weeks — the 4 before the current month, the current month's 4,
 *    the 4 after — each the weekly signal the dashboard shows (KptSignals.getSignal),
 *    so the current-week column matches the dashboard exactly.
 * Cells are <button>s (▲ ▼ – ↻) coloured by signal, opacity scaled by conviction for
 * BULL/BEAR, each with an aria-label; clicking shows the cell in the side panel.
 * The whole grid is built as one HTML string (one reflow), with one delegated
 * click listener.
 */
(function () {
  'use strict';
  var S = window.KptSignals;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  if (!S || !S.hasManifest() || !window.KPT_ASSETS || !window.KPT_MONTH_SIGNALS) { $('hm-fallback').hidden = false; return; }

  var MON = S.MONTH_ABBR;
  var now = S.currentWeek();
  var groups = S.assetsByGroup();
  var state = { view: 'months', group: 'all', sel: null };

  var SYMBOL = { BULL: '▲', BEAR: '▼', CHOP: '–', AVOID: '–', FLIP: '↻' };
  function cellStyle(s) {
    if (s.signal === 'BULL') return 'background: rgba(34,197,94,' + (0.2 + 0.13 * s.conviction).toFixed(2) + ')';
    if (s.signal === 'BEAR') return 'background: rgba(239,68,68,' + (0.2 + 0.13 * s.conviction).toFixed(2) + ')';
    if (s.signal === 'FLIP') return 'background: #2a313b';
    return 'background: rgba(245,158,11,0.3)';
  }

  // Column definitions for the current view.
  function columns() {
    if (state.view === 'months') {
      return MON.map(function (m, i) { return { key: 'm' + i, label: m.toUpperCase(), aria: m.toUpperCase(), month: i, current: i === now.month }; });
    }
    var start = S.shiftWeek({ year: now.year, month: now.month, week: 0 }, -4);
    var cols = [];
    for (var i = 0; i < 12; i++) {
      var w = S.shiftWeek(start, i);
      var cur = w.month === now.month && w.week === now.week && w.year === now.year;
      cols.push({ key: 'w' + i, label: MON[w.month].toUpperCase() + ' W' + (w.week + 1), aria: MON[w.month].toUpperCase() + ' WK' + (w.week + 1), month: w.month, week: w.week, current: cur });
    }
    return cols;
  }
  function sigFor(a, col) {
    return state.view === 'months' ? S.getMonthSignal(a.id, col.month) : S.getSignal(a.id, col.month, col.week);
  }

  function render() {
    var cols = columns();
    var tpl = 'grid-template-columns: 170px repeat(' + cols.length + ', minmax(0, 1fr))';
    var html = '<div class="hm-row hm-colhead" style="' + tpl + '"><span class="hm-name"></span>' +
      cols.map(function (c) { return '<span class="hm-col' + (c.current ? ' hm-col-now' : '') + '"' + (c.current ? ' aria-current="date"' : '') + '>' + c.label + '</span>'; }).join('') + '</div>';
    groups.forEach(function (g) {
      if (state.group !== 'all' && state.group !== g.group.id) return;
      html += '<div class="hm-group">' + esc(g.group.label.toUpperCase()) + '</div>';
      g.assets.forEach(function (a) {
        var name = S.displayName(a);
        html += '<div class="hm-row" style="' + tpl + '"><span class="hm-name" title="' + esc(a.name) + '">' + esc(name) + '</span>';
        cols.forEach(function (c, ci) {
          var s = sigFor(a, c);
          if (!s) { html += '<span class="hm-cell hm-empty"></span>'; return; }
          var selected = state.sel && state.sel.id === a.id && state.sel.ci === ci;
          html += '<button type="button" class="hm-cell' + (c.current ? ' hm-cell-now' : '') + (selected ? ' hm-cell-sel' : '') + '" data-id="' + a.id + '" data-ci="' + ci + '" style="' + cellStyle(s) + '" aria-label="' +
            esc(name) + ', ' + c.aria + ': ' + s.signal + ', conviction ' + s.conviction + ' of 5"' + (selected ? ' aria-pressed="true"' : '') + '>' + SYMBOL[s.signal] + '</button>';
        });
        html += '</div>';
      });
    });
    $('hm-grid').innerHTML = html;
    $('hm-grid').style.minWidth = (170 + cols.length * 52) + 'px';
    renderSelected(cols);
    $('hm-legend-note').textContent = state.view === 'months'
      ? 'Months show each month\'s overall verdict from the seasonal data. Stronger colour means higher conviction. The current month is highlighted.'
      : 'Weeks show the same weekly signal as the dashboard. Stronger colour means higher conviction. The current week is highlighted.';
  }

  function renderSelected(cols) {
    var box = $('hm-selected');
    if (!state.sel) { box.innerHTML = '<span class="mini-lbl">SELECTED</span><span class="note">Click any cell for details.</span>'; return; }
    var a = S.asset(state.sel.id), c = cols[state.sel.ci], s = a && c && sigFor(a, c);
    if (!s) { state.sel = null; return renderSelected(cols); }
    box.innerHTML = '<span class="mini-lbl">SELECTED</span>' +
      '<span class="hm-sel-name">' + esc(S.displayName(a)) + '</span>' +
      '<span class="hm-sel-when">' + c.aria + ' · ' + (state.view === 'months' ? 'monthly bias' : 'weekly signal') + '</span>' +
      '<span class="hm-sel-sig">' + S.pill(s) + S.convDots(s.conviction) + '</span>' +
      '<a class="btn hm-open" href="' + S.assetHref(a.id, '/') + '">Open asset →</a>';
  }

  /* ── Controls ─────────────────────────────────────────────────────────── */
  $('hm-groups').innerHTML = '<button type="button" class="seg" data-group="all" aria-pressed="true">All</button>' +
    groups.map(function (g) { return '<button type="button" class="seg" data-group="' + g.group.id + '" aria-pressed="false">' + esc(g.group.label) + '</button>'; }).join('');
  var wStart = S.shiftWeek({ year: now.year, month: now.month, week: 0 }, -4), wEnd = S.shiftWeek(wStart, 11);
  $('hm-weeks-btn').textContent = 'Weeks · ' + MON[wStart.month] + '–' + MON[wEnd.month];

  function press(container, attr, value) {
    container.querySelectorAll('[' + attr + ']').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute(attr) === value ? 'true' : 'false'); });
  }
  $('hm-groups').addEventListener('click', function (e) {
    var b = e.target.closest('[data-group]'); if (!b) return;
    state.group = b.getAttribute('data-group'); press($('hm-groups'), 'data-group', state.group); render();
  });
  $('hm-controls').addEventListener('click', function (e) {
    var b = e.target.closest('[data-view]'); if (!b) return;
    state.view = b.getAttribute('data-view'); state.sel = null;
    press($('hm-controls'), 'data-view', state.view); render();
  });
  $('hm-grid').addEventListener('click', function (e) {
    var b = e.target.closest('.hm-cell[data-id]'); if (!b) return;
    var prevSel = $('hm-grid').querySelector('.hm-cell-sel');
    if (prevSel) { prevSel.classList.remove('hm-cell-sel'); prevSel.removeAttribute('aria-pressed'); }
    b.classList.add('hm-cell-sel'); b.setAttribute('aria-pressed', 'true');
    state.sel = { id: b.getAttribute('data-id'), ci: +b.getAttribute('data-ci') };
    renderSelected(columns());
  });

  // Default selection: first asset in the current period, so the panel isn't empty.
  var firstCols = columns(), nowIdx = firstCols.findIndex(function (c) { return c.current; });
  if (groups.length) state.sel = { id: groups[0].assets[0].id, ci: nowIdx };
  $('hm-controls').hidden = false;
  $('hm-layout').hidden = false;
  render();
})();
