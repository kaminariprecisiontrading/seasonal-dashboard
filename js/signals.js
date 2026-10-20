/**
 * signals.js — the one place that turns SIGNALS_MANIFEST strings into signals.
 *
 * Used by the dashboard, the landing page, This Week and the Heatmap, so they can
 * never disagree about an asset's signal for a given week. The mapping below is
 * the dashboard's original inline logic, moved here unchanged.
 *
 * Needs (load first): data/signals_manifest.js (SIGNALS_MANIFEST, 48 `com`
 * strings per asset: Jan-Wk1 … Dec-Wk4) and, for asset names/groups,
 * data/asset_index.js (KPT_ASSETS / KPT_ASSET_GROUPS).
 *
 * Weeks are {year, month 0-11, week 0-3}. Week-of-month is the dashboard's rule:
 * days 1-7 = Wk1, 8-14 = Wk2, 15-21 = Wk3, 22+ = Wk4.
 */
var KptSignals = (function () {
  'use strict';

  var MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function manifest() { return (typeof SIGNALS_MANIFEST !== 'undefined') ? SIGNALS_MANIFEST : null; }

  /* ── Week arithmetic ──────────────────────────────────────────────────── */
  function weekOf(date) {
    return { year: date.getFullYear(), month: date.getMonth(), week: Math.min(3, Math.floor((date.getDate() - 1) / 7)) };
  }
  function currentWeek() { return weekOf(new Date()); }
  function shiftWeek(w, n) {
    var flat = w.year * 48 + w.month * 4 + w.week + n;
    return { year: Math.floor(flat / 48), month: Math.floor((flat % 48) / 4), week: flat % 4 };
  }
  function weekLabel(w) { return MONTH_ABBR[w.month].toUpperCase() + ' WK' + (w.week + 1) + ' · ' + w.year; }
  // URL form used by /this-week (?w=2026-10-3): year-month(1-12)-week(1-4)
  function weekParam(w) { return w.year + '-' + (w.month + 1) + '-' + (w.week + 1); }
  function parseWeekParam(s) {
    var m = /^(\d{4})-(\d{1,2})-([1-4])$/.exec(s || '');
    if (!m || +m[2] < 1 || +m[2] > 12) return null;
    return { year: +m[1], month: +m[2] - 1, week: +m[3] - 1 };
  }

  /* ── com string → signal (unchanged dashboard mapping) ────────────────── */
  function comToTag(com) {
    if (!com) return { cls: 'chop-tag', label: 'CHOP', type: 'chop' };
    var u = com.toUpperCase();
    if (u.indexOf('LONG')    === 0) return { cls: 'bull-tag',    label: 'BULL',  type: 'bull' };
    if (u.indexOf('SHORT')   === 0) return { cls: 'bear-tag',    label: 'BEAR',  type: 'bear' };
    if (u.indexOf('FLIP')    === 0) return { cls: 'chop-tag',    label: 'FLIP',  type: 'chop' };
    if (u.indexOf('AVOID')   === 0) return { cls: 'neutral-tag', label: 'AVOID', type: 'chop' };
    if (u.indexOf('HOLD')    === 0) return { cls: 'chop-tag',    label: 'CHOP',  type: 'chop' };
    if (u.indexOf('NEUTRAL') === 0) return { cls: 'chop-tag',    label: 'CHOP',  type: 'chop' };
    if (u.indexOf('MIXED')   === 0) return { cls: 'chop-tag',    label: 'CHOP',  type: 'chop' };
    if (u.indexOf('WATCH')   === 0) return { cls: 'chop-tag',    label: 'CHOP',  type: 'chop' };
    return { cls: 'chop-tag', label: 'CHOP', type: 'chop' };
  }
  // Conviction = filled stars (★) in the com string, 0-5.
  function starCount(com) { return ((com || '').match(/★/g) || []).length; }

  /**
   * getSignal(assetId, month, week) → { com, signal, type, cls, conviction } or null
   * signal: BULL | BEAR | CHOP | FLIP | AVOID; type: bull | bear | chop (the
   * dashboard's three filter groups — "Other" = chop).
   */
  function getSignal(id, month, week) {
    var m = manifest();
    var arr = m && m[id];
    if (!arr) return null;
    var com = arr[month * 4 + week] || '';
    var t = comToTag(com);
    return { com: com, signal: t.label, type: t.type, cls: t.cls, conviction: starCount(com) };
  }

  /**
   * getMonthSignal(assetId, month) → { signal, type, cls, conviction } or null.
   * The month-level verdict from MONTHS[].combined / .stars (data/month_signals.js),
   * used by the Heatmap's Months view. Not the same thing as any one week's signal.
   */
  var MONTH_SIG = { bull: ['BULL', 'bull', 'bull-tag'], bear: ['BEAR', 'bear', 'bear-tag'], chop: ['CHOP', 'chop', 'chop-tag'], flip: ['FLIP', 'chop', 'chop-tag'] };
  function getMonthSignal(id, month) {
    var m = window.KPT_MONTH_SIGNALS && window.KPT_MONTH_SIGNALS[id];
    if (!m || !m[month]) return null;
    var t = MONTH_SIG[m[month][0]] || MONTH_SIG.chop;
    return { signal: t[0], type: t[1], cls: t[2], conviction: m[month][1] };
  }

  /* ── Assets ───────────────────────────────────────────────────────────── */
  function liveAssets() {
    return (window.KPT_ASSETS || []).filter(function (a) { return a.status === 'live' && a.id; });
  }
  function asset(id) {
    var list = window.KPT_ASSETS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function assetHref(id, prefix) { return (prefix || '') + 'assets/' + id + '.html'; }
  // [{ group: {id,label,block}, assets: [...] }] in dashboard order, live assets only.
  function assetsByGroup() {
    var live = liveAssets();
    return (window.KPT_ASSET_GROUPS || []).map(function (g) {
      return { group: g, assets: live.filter(function (a) { return a.group === g.id; }) };
    }).filter(function (x) { return x.assets.length; });
  }

  // Short group labels for compact rows ("Metals · CMX", "FX cross").
  var GROUP_SHORT = {
    'fx-majors': 'FX major', 'fx-minors': 'FX minor', 'fx-crosses': 'FX cross',
    'fut-currencies': 'Currencies', 'fut-metals': 'Metals', 'fut-energy': 'Energy', 'fut-rates': 'Rates',
    'fut-indices': 'Indices', 'fut-softs': 'Softs', 'fut-grains': 'Grains', 'fut-fiber': 'Fiber',
    'fut-meats': 'Meats & Dairy', 'crypto-major': 'Crypto'
  };
  function groupShort(groupId) { return GROUP_SHORT[groupId] || groupId; }
  // FX pairs read best by ticker (EURUSD); futures by name without the exchange suffix (Gold).
  function displayName(a) {
    if (!a) return '';
    if (a.block === 'forex') return a.ticker;
    return (a.name || a.ticker).replace(/\s*\([^)]*\)\s*$/, '') || a.ticker;
  }
  // "Metals · CMX", "FX major", "Crypto · price-derived"
  function subLabel(a) {
    if (!a) return '';
    var m = /\(([^)]*)\)\s*$/.exec(a.name || '');
    var extra = a.block === 'crypto' ? 'price-derived' : (a.block === 'forex' ? '' : (m ? m[1] : ''));
    return groupShort(a.group) + (extra ? ' · ' + extra : '');
  }

  /** tally(month, week) → { bull, bear, other, total } over live assets in the manifest. */
  function tally(month, week) {
    var t = { bull: 0, bear: 0, other: 0, total: 0 };
    liveAssets().forEach(function (a) {
      var s = getSignal(a.id, month, week);
      if (!s) return;
      t.total++;
      if (s.type === 'bull') t.bull++; else if (s.type === 'bear') t.bear++; else t.other++;
    });
    return t;
  }

  /* ── Shared markup ────────────────────────────────────────────────────── */
  // Dashboard-style conviction pips (css/dashboard.css .conv-pips).
  function convPips(n) {
    var html = '<span class="conv-pips" role="img" aria-label="Conviction ' + n + ' of 5">';
    for (var i = 0; i < 5; i++) html += '<span class="conv-pip' + (i < n ? ' filled' : '') + '"></span>';
    return html + '</span>';
  }
  // Site-style conviction dots (css/site.css .dots).
  function convDots(n) {
    var html = '<span class="dots" role="img" aria-label="Conviction ' + n + ' of 5">';
    for (var i = 0; i < 5; i++) html += '<span class="dot' + (i < n ? ' on' : '') + '"></span>';
    return html + '</span>';
  }
  // Site-style signal pill (css/site.css .pill .bull/.bear/.chop/.flip).
  function pill(sig) {
    var cls = sig.signal === 'BULL' ? 'bull' : sig.signal === 'BEAR' ? 'bear' : sig.signal === 'FLIP' ? 'flip' : 'chop';
    return '<span class="pill ' + cls + '">' + sig.signal + '</span>';
  }

  return {
    MONTH_ABBR: MONTH_ABBR,
    weekOf: weekOf, currentWeek: currentWeek, shiftWeek: shiftWeek, weekLabel: weekLabel,
    weekParam: weekParam, parseWeekParam: parseWeekParam,
    comToTag: comToTag, starCount: starCount, getSignal: getSignal, getMonthSignal: getMonthSignal,
    liveAssets: liveAssets, asset: asset, assetHref: assetHref, assetsByGroup: assetsByGroup, tally: tally,
    groupShort: groupShort, displayName: displayName, subLabel: subLabel,
    convPips: convPips, convDots: convDots, pill: pill,
    hasManifest: function () { return !!manifest(); }
  };
})();
