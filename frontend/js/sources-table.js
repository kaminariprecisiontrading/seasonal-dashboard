/**
 * sources-table.js — the "Sources by asset" table on /sources (v1.29).
 *
 * One row per KPT_SOURCES key, with the number of live assets that resolve to it through
 * kptSourceOf() (data/asset_sources.js), so the counts can't drift from the labels shown on
 * the rest of the site. Without the data files, the placeholder stays empty.
 */
(function () {
  'use strict';
  var box = document.getElementById('kpt-source-table');
  if (!box || !window.KPT_SOURCES || !window.KPT_ASSETS || !window.kptSourceOf) return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var counts = {};
  window.KPT_ASSETS.forEach(function (a) {
    if (a.status !== 'live') return;
    var s = window.kptSourceOf(a);
    if (s) counts[s.key] = (counts[s.key] || 0) + 1;
  });

  var rows = Object.keys(window.KPT_SOURCES).map(function (key) {
    var s = window.KPT_SOURCES[key];
    return '<tr data-source="' + esc(key) + '"><td><span class="kpt-source-chip">' + esc(s.short) + '</span></td><td>' +
      esc(s.label) + '</td><td>' + esc(s.desc) + '</td><td>' + (counts[key] || 0) + '</td></tr>';
  }).join('');

  box.className = 'legal-table-wrap';
  box.innerHTML = '<table><thead><tr><th scope="col">TAG</th><th scope="col">SOURCE</th><th scope="col">WHAT IT MEANS</th><th scope="col">ASSETS</th></tr></thead><tbody>' + rows + '</tbody></table>';
})();
