/**
 * landing.js — live data for the landing page (/): the hero "This week" panel and
 * the asset counts. Everything comes from js/signals.js (data/signals_manifest.js +
 * data/asset_index.js), the same code the dashboard uses, so the landing page and
 * /dashboard always agree for the same week.
 *
 * The panel's week label, tally and cards stay hidden until the data is in; if the
 * manifest didn't load, a link to the dashboard is shown instead — never 0 / 0 / 0.
 */
(function () {
  'use strict';

  // Featured assets in the hero panel (dashboard asset ids, in display order).
  var FEATURED = ['fx-eurusd', 'fx-usdcad', 'fx-gbpusd'];

  // Short labels for the coverage card lists (dashboard section label → card label).
  var SHORT = { 'FX Majors': 'Majors', 'FX Minors': 'Minors', 'FX Crosses': 'Crosses', 'Interest Rates': 'Rates', 'Soybeans, Grains & Oilseeds': 'Grains' };

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function fallback() {
    ['tw-week', 'tw-tally', 'tw-cards'].forEach(function (id) { $(id).hidden = true; });
    $('tw-fallback').hidden = false;
  }

  if (typeof KptSignals === 'undefined' || !KptSignals.hasManifest() || !window.KPT_ASSETS) { fallback(); return; }

  var live = KptSignals.liveAssets().filter(function (a) { return KptSignals.getSignal(a.id, 0, 0); });
  if (!live.length) { fallback(); return; }

  /* ── This week ─────────────────────────────────────────────────────────── */
  var w = KptSignals.currentWeek();
  var t = KptSignals.tally(w.month, w.week);
  if (!t.total) { fallback(); return; }

  $('tw-week').textContent = KptSignals.weekLabel(w);
  $('tw-bull').textContent = t.bull;
  $('tw-bear').textContent = t.bear;
  $('tw-other').textContent = t.other;

  $('tw-cards').innerHTML = FEATURED.map(function (id) {
    var a = KptSignals.asset(id);
    var s = KptSignals.getSignal(id, w.month, w.week);
    if (!a || !s) return '';
    return '<a class="tw-card" href="' + KptSignals.assetHref(id, '/') + '" style="--card-accent:' + esc(a.accent) + '">' +
      '<span class="tw-card-name"><span class="tw-card-ticker">' + esc(a.ticker) + '</span>' +
      '<span class="tw-card-meta">' + esc(a.badges.join(' · ')) + '</span></span>' +
      '<span class="tw-card-sig">' + KptSignals.convDots(s.conviction) + KptSignals.pill(s) + '</span>' +
    '</a>';
  }).join('');

  $('tw-week').hidden = false;
  $('tw-tally').hidden = false;
  $('tw-cards').hidden = false;

  /* ── Counts (from the dashboard's own card list) ──────────────────────── */
  document.querySelectorAll('[data-live-count]').forEach(function (el) { el.textContent = live.length; });

  var byGroup = KptSignals.assetsByGroup();
  ['futures', 'forex', 'crypto'].forEach(function (block) {
    var groups = byGroup.filter(function (g) { return g.group.block === block; });
    var n = groups.reduce(function (s, g) { return s + g.assets.length; }, 0);
    var countEl = document.querySelector('[data-cov-block="' + block + '"]');
    if (countEl && n) countEl.textContent = n;
    var listEl = document.querySelector('[data-cov-groups="' + block + '"]');
    if (listEl && groups.length) {
      listEl.innerHTML = groups.map(function (g) {
        return '<span>' + esc(SHORT[g.group.label] || g.group.label) + ' · ' + g.assets.length + '</span>';
      }).join('');
    }
  });
  var planned = (window.KPT_ASSETS || []).filter(function (a) { return a.status === 'planned' && a.block === 'crypto'; }).length;
  var plannedEl = document.querySelector('[data-cov-planned]');
  if (plannedEl) plannedEl.textContent = planned;
})();
