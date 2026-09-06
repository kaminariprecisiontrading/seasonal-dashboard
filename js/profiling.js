/**
 * profiling.js — Injects the "Profiling" tab panel (Market Profiling &
 * Statistics) on asset pages that have ported data available.
 *
 * Ported/adapted from KPT-Market-Profiling/dashboard/js/dashboard.js — that
 * version assumed it owned the whole page (a static HTML shell pre-declaring
 * ~15 fixed-ID containers). This module instead builds its own
 * <section data-kpt-panel="profiling"> and all inner containers, then runs
 * the same rendering logic against them — so it can sit inside one panel
 * among six other tabs, injected before .footnote exactly like
 * js/macro.js/js/upload.js.
 *
 * Creates <section data-kpt-panel="profiling"> — ui.js discovers it and adds
 * the Profiling tab automatically, on exactly the pages that load this
 * script (only 4, unlike the other 9 shared scripts which load on all 97 —
 * see ARCHITECTURE.md's load-order table).
 *
 * Depends on: ASSET_CONFIG.id, js/profiling-charts.js (KPTPTooltip,
 * KPTPCharts, glossary, profile-meta helpers) — both must load before this.
 * Script load order: data.js -> ... -> profiling-charts.js -> profiling.js -> ui.js
 */
(function () {

  if (typeof ASSET_CONFIG === 'undefined') return;

  /* ─── Resolve this page's asset to a Profiling data key ─────────────────
   * Data is keyed by lowercase pair id (e.g. "gbpusd"), matching KPT_PROFILING/
   * KPT_PROFILING_EXAMPLES. KPT_CALENDAR (copied verbatim from the source
   * pipeline) keys by uppercase pair id instead — see calendarAssetUrlParam().
   * Add an entry here whenever a new asset's data is synced via
   * scripts/sync_profiling_data.js and wired onto its page(s) (Phase B).
   */
  var ASSET_MAP = {
    gbp: 'gbpusd', 'fx-gbpusd': 'gbpusd',
    eur: 'eurusd', 'fx-eurusd': 'eurusd',
    aud: 'audusd', 'fx-audusd': 'audusd',
    nzd: 'nzdusd', 'fx-nzdusd': 'nzdusd',
    cad: 'usdcad', 'fx-usdcad': 'usdcad',
    chf: 'usdchf', 'fx-usdchf': 'usdchf',
    jpy: 'usdjpy', 'fx-usdjpy': 'usdjpy',
    xau: 'xauusd',
    brent: 'brent',
    cl: 'wti',
    sp500: 'us500',
    nq: 'ustech',
    ym: 'us30',
    btc: 'btcusd'
  };

  var assetKey = ASSET_MAP[ASSET_CONFIG.id];
  if (!assetKey) return; // no Profiling data for this asset — render nothing

  var bundle = window.KPT_PROFILING && window.KPT_PROFILING[assetKey];
  if (!bundle) {
    console.error('profiling.js: window.KPT_PROFILING.' + assetKey + ' not found — check data/profiling/' + assetKey + '.js is loaded before this script.');
    return;
  }

  var pairUpper = assetKey.toUpperCase();
  var meta = (window.KPT_PROFILING_META && window.KPT_PROFILING_META[assetKey]) || {};
  // Range-value display label — "pips" for actual currency pairs, "points"
  // for everything else (metals, energies, indices, crypto). Comes from the
  // pipeline (KPT-Market-Profiling/pipeline/refresh_asset.py's
  // ASSET_REGISTRY); falls back to "pips" for any older bundle without it.
  var unit = (bundle.stats && bundle.stats.unit) || 'pips';

  // Exposed so other shared scripts (js/api.js's Analysis context gatherer)
  // can find this page's resolved Profiling data without duplicating
  // ASSET_MAP above. api.js defines its context-bar refresh hook before this
  // script runs (load order: api.js -> ... -> profiling.js), but only
  // *calls* it here at user-interaction time (Run Analysis click) or via the
  // explicit refresh below — never at api.js's own parse time — so the
  // load-order difference doesn't matter.
  window.KPT_PROFILING_CURRENT = { key: assetKey, bundle: bundle, asOf: meta.asOf };
  if (typeof window._kptUpdateCtxBar === 'function') window._kptUpdateCtxBar();

  var WINDOWS = [
    { key: 'full', label: 'Full History' },
    { key: '5y', label: '5Y' },
    { key: '1y', label: '1Y' },
    { key: '3mo', label: '3M' }
  ];
  var WEEKDAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Per-UTC-hour session/color/label lookup for the Hourly Activity chart --
  // matches session_activity.py's own SESSION_WINDOWS exactly (Tier 5b).
  // Built here rather than imported from KPTPCharts' private SESSION_COLOR
  // (that map is module-scoped inside profiling-charts.js's KPTPCharts IIFE,
  // not exported) -- same CSS custom-property names, so colors stay
  // visually identical to the Daily High/Low session-colored heatmaps above.
  var HOUR_SESSION_COLOR = {};
  var HOUR_SESSION_LABEL = {};
  (function () {
    var windows = {
      asian_only: [23, 0, 1, 2, 3, 4, 5, 6],
      asian_london_overlap: [7],
      london_only: [8, 9, 10, 11],
      london_ny_overlap: [12, 13, 14, 15],
      ny_only: [16, 17, 18, 19, 20]
    };
    var color = {
      asian_only: 'var(--kptp-asian)', asian_london_overlap: 'var(--kptp-overlap)',
      london_only: 'var(--kptp-london)', london_ny_overlap: 'var(--kptp-overlap)',
      ny_only: 'var(--kptp-ny)'
    };
    var label = {
      asian_only: 'Asian session', asian_london_overlap: 'Asian / London overlap',
      london_only: 'London session', london_ny_overlap: 'London / New York overlap',
      ny_only: 'New York session'
    };
    Object.keys(windows).forEach(function (w) {
      windows[w].forEach(function (h) { HOUR_SESSION_COLOR[h] = color[w]; HOUR_SESSION_LABEL[h] = label[w]; });
    });
  })();

  /* ─── Small formatting helpers (module-local — source left these global) ── */
  function concentrationBadge(R) {
    if (R >= 0.25) return { cls: 'kptp-conc-high', label: 'Tight clustering' };
    if (R >= 0.18) return { cls: 'kptp-conc-mid', label: 'Moderate clustering' };
    return { cls: 'kptp-conc-low', label: 'Weak clustering' };
  }

  function shortLabel(k) {
    var map = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };
    return map[k] || k;
  }

  function orderedEntries(dict, order, contextFmt) {
    var total = Object.keys(dict).reduce(function (s, k) { return s + (dict[k] || 0); }, 0) || 1;
    return order.map(function (k) {
      var value = dict[k] || 0;
      var pct = Math.round((value / total) * 1000) / 10;
      return { label: shortLabel(k), value: value, tooltip: contextFmt ? ('<b>' + k + '</b><br>' + contextFmt(value, pct)) : undefined };
    });
  }

  function numericSortedEntries(dict, labelPrefix, contextFmt) {
    var total = Object.keys(dict).reduce(function (s, k) { return s + dict[k]; }, 0) || 1;
    return Object.keys(dict).sort(function (a, b) { return Number(a) - Number(b); }).map(function (k) {
      var value = dict[k];
      var pct = Math.round((value / total) * 1000) / 10;
      var label = (labelPrefix || 'Wk ') + k;
      return { label: label, value: value, tooltip: contextFmt ? ('<b>' + label + '</b><br>' + contextFmt(value, pct)) : undefined };
    });
  }

  function monthEntries(dict, contextFmt) {
    var total = Object.keys(dict).reduce(function (s, k) { return s + dict[k]; }, 0) || 1;
    return Object.keys(dict).sort(function (a, b) { return Number(a) - Number(b); }).map(function (k) {
      var value = dict[k];
      var pct = Math.round((value / total) * 1000) / 10;
      var name = MONTH_NAMES[Number(k) - 1] || k;
      return { label: name, value: value, tooltip: contextFmt ? ('<b>' + name + '</b><br>' + contextFmt(value, pct)) : undefined };
    });
  }

  // Zero-fills every ISO week 1-53 (unlike numericSortedEntries/monthEntries
  // above, which only emit entries for keys actually present in the dict).
  // With ~20-40 total yearly-extreme occurrences spread across 52 possible
  // weeks, most weeks have zero occurrences and would otherwise be *absent*
  // from the dict rather than present-with-zero — plotting only the present
  // keys would space bars by array index, not by actual week-of-year
  // distance, misrepresenting how far apart two occurrences really are.
  function weekOfYearEntries(dict, contextFmt) {
    var total = Object.keys(dict).reduce(function (s, k) { return s + dict[k]; }, 0) || 1;
    var entries = [];
    for (var w = 1; w <= 53; w++) {
      var value = dict[w] || 0;
      var pct = Math.round((value / total) * 1000) / 10;
      var label = 'Wk ' + w;
      entries.push({ label: label, value: value, tooltip: contextFmt ? ('<b>' + label + '</b><br>' + contextFmt(value, pct)) : undefined });
    }
    return entries;
  }

  function modeNoteHtml(dist, unitPlural) {
    unitPlural = unitPlural || 'days';
    var parts = [];
    if (dist.mode_binned) {
      parts.push('<span>Most common range' + kptpGlossaryIcon('mode_binned') + ': <b>' + dist.mode_binned.bin_low + '–' + dist.mode_binned.bin_high + ' ' + unit + '</b> (' + dist.mode_binned.pct_of_n + '% of ' + unitPlural + ')</span>');
    }
    if (dist.mode_raw && dist.mode_raw.count > 1) {
      parts.push('<span>Exact repeated value' + kptpGlossaryIcon('mode_raw') + ': <b>' + dist.mode_raw.value + ' ' + unit + '</b> (' + dist.mode_raw.count + ' ' + unitPlural + ', ' + dist.mode_raw.pct_of_n + '%)</span>');
    } else {
      parts.push('<span>Exact repeated value' + kptpGlossaryIcon('mode_raw') + ': <b>none</b> — every value in this window was unique</span>');
    }
    return parts.join('');
  }

  /* ─── Build the panel markup ──────────────────────────────────────────── */
  // ../ because this panel is injected inside assets/<page>.html, but
  // profiling-calendar/ and profiling-profiles/ live at the repo root.
  var calendarHref = '../profiling-calendar/index.html?a=' + pairUpper;
  var freshness = meta.asOf ? ('Data as of ' + meta.asOf) : '';

  var panel = document.createElement('section');
  panel.setAttribute('data-kpt-panel', 'profiling');
  panel.className = 'kptp-panel';

  panel.innerHTML =
    '<div class="kptp-tab-header">' +
      '<div class="kptp-tab-header-left">' +
        '<div class="kptp-tab-label">Market Profiling &amp; Statistics</div>' +
        '<div class="kptp-tab-sub">' + pairUpper + ' &middot; Daily / Weekly / Monthly / Yearly &middot; ' + (freshness || 'historical statistics') + '</div>' +
      '</div>' +
      '<a class="kptp-calendar-link-btn" href="' + calendarHref + '">Browse ' + pairUpper + ' by date &rarr;</a>' +
    '</div>' +

    '<div class="kptp-stat-grid" id="kptp-stat-grid"></div>' +

    // Granularity switcher -- the primary navigation for everything below.
    // Added 2026-09-05 after user feedback that scrolling through all four
    // granularities stacked on one page took too long; content that used to
    // stack (Profile Taxonomy -> Range Distribution -> Extreme Timing, once
    // per granularity) now lives in one panel per granularity, one visible
    // at a time. See PLATFORM_ROADMAP.md's earlier "granularity selector,
    // similar in spirit to the lookback dial" note -- this is that idea.
    '<div class="kptp-gran-switch" id="kptp-gran-switch">' +
      '<button class="kptp-gran-btn active" data-gran="daily">Daily</button>' +
      '<button class="kptp-gran-btn" data-gran="weekly">Weekly</button>' +
      '<button class="kptp-gran-btn" data-gran="monthly">Monthly</button>' +
      '<button class="kptp-gran-btn" data-gran="yearly">Yearly</button>' +
    '</div>' +

    // ── Daily panel ──────────────────────────────────────────────────────
    // Lookback dial slot: the actual dial (built once, see buildDial()/
    // switchGranularity()) gets physically relocated into whichever
    // granularity's slot is active, rather than duplicated per panel --
    // it's one cross-cutting preference, not a per-granularity setting.
    // Sits just above Range Distribution (what it actually affects), not
    // above Profile Taxonomy (what it doesn't) -- moved here after initial
    // feedback that its first position, above everything, implied it
    // affected the taxonomy above it too. No slot in the Yearly panel --
    // the dial has no effect there (yearly stats are always full-history,
    // too few years to meaningfully window) so it simply doesn't travel
    // there and stays invisible, parked inside whichever panel is hidden.
    '<div class="kptp-gran-panel" id="kptp-gran-daily" data-gran-panel="daily">' +
      '<div class="kptp-section-label">Daily Profile Taxonomy</div>' +
      '<div class="kptp-section-note" id="kptp-profile-summary-note">Rule-based daily profile classification, built from closing strength' + kptpGlossaryIcon('closing_strength') + ' and range regime. Click any card for the full rule, why it&rsquo;s named that way, and a real illustrative chart.</div>' +
      '<div class="kptp-profile-grid" id="kptp-profile-grid"></div>' +

      '<div class="kptp-dial-slot" id="kptp-dial-slot-daily"></div>' +
      '<div class="kptp-section-label">Daily Range Distribution</div>' +
      '<div class="kptp-section-note">Range percentile' + kptpGlossaryIcon('percentile') + ' strip (p05&ndash;p95), IQR' + kptpGlossaryIcon('iqr') + ' boxed, median' + kptpGlossaryIcon('median') + ' marked. Dashed lines mark the compression' + kptpGlossaryIcon('compression') + ' (p20) / expansion' + kptpGlossaryIcon('expansion') + ' (p80) regime thresholds used by the profile taxonomy above. Hover any part of the chart for an explanation.</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Daily Range</div>' +
        '<div class="kptp-range-strip-wrap"><div id="kptp-range-daily"></div></div>' +
        '<div class="kptp-range-strip-caption" id="kptp-range-daily-caption"></div>' +
        '<div class="kptp-mode-note" id="kptp-range-daily-mode-note"></div>' +
      '</div>' +

      '<div class="kptp-section-label">Time of Extreme</div>' +
      '<div class="kptp-section-note">When the daily high/low tends to form, UTC. Bar height = share of days in that half-hour bucket; the mode bucket is outlined white, the dashed amber line marks the circular mean' + kptpGlossaryIcon('circular_mean') + '. Bars are coloured by FX session' + kptpGlossaryIcon('session') + '. The badge shows how tightly clustered (concentrated' + kptpGlossaryIcon('concentration') + ') the timing actually is &mdash; hover any bar for its exact time window.</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Daily High</div>' +
        '<div id="kptp-heatmap-high"></div>' +
        '<div class="kptp-clock-caption" id="kptp-heatmap-high-caption"></div>' +
        '<div class="kptp-session-legend"></div>' +
      '</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Daily Low</div>' +
        '<div id="kptp-heatmap-low"></div>' +
        '<div class="kptp-clock-caption" id="kptp-heatmap-low-caption"></div>' +
        '<div class="kptp-session-legend"></div>' +
      '</div>' +
      '<div class="kptp-panel-card" id="kptp-session-pair-card" hidden>' +
        '<div class="kptp-panel-title">Day High/Low &mdash; Session Pairing</div>' +
        '<div class="kptp-section-note" style="margin-bottom:12px;">The two charts above show which session tends to have the high and which tends to have the low, ' +
          '<i>separately</i>. This is the <i>joint</i> pattern &mdash; e.g. how often an Asian low pairs with a London-NY-overlap high, specifically. Rows = low session, columns = high session. Darker = more frequent; the diagonal (same session) is real but consistently rare.</div>' +
        '<div id="kptp-session-pair-heatmap"></div>' +
      '</div>' +
      '<div class="kptp-panel-card" id="kptp-hour-pair-card" hidden>' +
        '<div class="kptp-panel-title">Daily High/Low &mdash; Hour Pairing</div>' +
        '<div class="kptp-section-note" style="margin-bottom:12px;">The session pairing above shows which whole <i>session</i> tends to pair with which. This drills into which <i>specific UTC hour</i> ' +
          'drives that relationship &mdash; e.g. is the "London-NY overlap low + Asian high" pattern concentrated at one edge of each window, or spread evenly across it. Rows = low hour, columns = high hour. Darker = more frequent; the diagonal (same hour) is real but consistently rare.</div>' +
        '<div id="kptp-hour-pair-heatmap"></div>' +
      '</div>' +

      '<div class="kptp-section-label" id="kptp-hourly-activity-label" hidden>Hourly Activity</div>' +
      '<div class="kptp-section-note" id="kptp-hourly-activity-note" hidden></div>' +
      '<div class="kptp-panel-card" id="kptp-hourly-activity-card" hidden>' +
        '<div class="kptp-panel-title">Mean Range by Hour of Day (UTC)</div>' +
        '<div id="kptp-hourly-activity-chart"></div>' +
        '<div class="kptp-section-note" id="kptp-hourly-activity-caption" style="margin:10px 0 0;"></div>' +
        '<div class="kptp-session-legend"></div>' +
      '</div>' +

      '<div class="kptp-section-label" id="kptp-nfp-label" hidden>NFP Fridays</div>' +
      '<div class="kptp-section-note" id="kptp-nfp-note" hidden></div>' +
      '<div class="kptp-panel-card" id="kptp-nfp-card" hidden>' +
        '<div class="kptp-panel-title">NFP Fridays vs. Other Fridays</div>' +
        '<div class="kptp-stat-grid" id="kptp-nfp-stat-grid"></div>' +
        '<div class="kptp-section-note" id="kptp-nfp-caption" style="margin:10px 0 0;"></div>' +
      '</div>' +

      '<div class="kptp-section-note" id="kptp-nfp-profile-note" hidden style="margin-top:24px;"></div>' +
      '<div class="kptp-profile-grid" id="kptp-nfp-profile-grid" hidden></div>' +
      '<div class="kptp-section-note" id="kptp-nfp-examples-note" hidden style="margin-top:20px;"></div>' +
      '<div id="kptp-nfp-examples-wrap" hidden></div>' +
    '</div>' +

    // ── Weekly panel ─────────────────────────────────────────────────────
    '<div class="kptp-gran-panel" id="kptp-gran-weekly" data-gran-panel="weekly" hidden>' +
      '<div class="kptp-section-label" id="kptp-weekly-profile-label" hidden>Weekly Profile Taxonomy</div>' +
      '<div class="kptp-section-note" id="kptp-weekly-profile-summary-note" hidden></div>' +
      '<div class="kptp-profile-grid" id="kptp-weekly-profile-grid" hidden></div>' +

      '<div class="kptp-dial-slot" id="kptp-dial-slot-weekly"></div>' +
      '<div class="kptp-section-label">Weekly Range Distribution</div>' +
      '<div class="kptp-section-note">Same percentile-strip reading as Daily, computed from weekly bars.</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Weekly Range</div>' +
        '<div class="kptp-range-strip-wrap"><div id="kptp-range-weekly"></div></div>' +
        '<div class="kptp-range-strip-caption" id="kptp-range-weekly-caption"></div>' +
        '<div class="kptp-mode-note" id="kptp-range-weekly-mode-note"></div>' +
      '</div>' +

      '<div class="kptp-section-label">Extreme Timing &mdash; Day of Week</div>' +
      '<div class="kptp-section-note">Which weekday the week&rsquo;s high/low falls on. Full history &mdash; not affected by the lookback window above. Hover any bar for the exact count.</div>' +
      '<div class="kptp-two-col">' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Week High &mdash; Day of Week</div><div id="kptp-weekday-high-chart"></div></div>' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Week Low &mdash; Day of Week</div><div id="kptp-weekday-low-chart"></div></div>' +
      '</div>' +
      '<div class="kptp-panel-card" id="kptp-weekday-pair-card" hidden>' +
        '<div class="kptp-panel-title">Week High/Low &mdash; Day Pairing</div>' +
        '<div class="kptp-section-note" style="margin-bottom:12px;">The two charts above show which day tends to have the high and which tends to have the low, ' +
          '<i>separately</i>. This is the <i>joint</i> pattern &mdash; e.g. how often a Monday low pairs with a Friday high, specifically. Rows = low day, columns = high day. Darker = more frequent; the diagonal (same day) is real but consistently rare.</div>' +
        '<div id="kptp-weekday-pair-heatmap"></div>' +
      '</div>' +
    '</div>' +

    // ── Monthly panel ────────────────────────────────────────────────────
    '<div class="kptp-gran-panel" id="kptp-gran-monthly" data-gran-panel="monthly" hidden>' +
      '<div class="kptp-section-label" id="kptp-monthly-profile-label" hidden>Monthly Profile Taxonomy</div>' +
      '<div class="kptp-section-note" id="kptp-monthly-profile-summary-note" hidden></div>' +
      '<div class="kptp-profile-grid" id="kptp-monthly-profile-grid" hidden></div>' +

      '<div class="kptp-dial-slot" id="kptp-dial-slot-monthly"></div>' +
      '<div class="kptp-section-label">Monthly Range Distribution</div>' +
      '<div class="kptp-section-note">Same percentile-strip reading as Daily/Weekly, computed from monthly bars.</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Monthly Range</div>' +
        '<div class="kptp-range-strip-wrap"><div id="kptp-range-monthly"></div></div>' +
        '<div class="kptp-range-strip-caption" id="kptp-range-monthly-caption"></div>' +
        '<div class="kptp-mode-note" id="kptp-range-monthly-mode-note"></div>' +
      '</div>' +

      '<div class="kptp-section-label">Extreme Timing &mdash; Week of Month</div>' +
      '<div class="kptp-section-note">Which week-of-month the month&rsquo;s high/low falls on. Full history &mdash; not affected by the lookback window above. Hover any bar for the exact count.</div>' +
      '<div class="kptp-two-col">' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Month High &mdash; Week of Month</div><div id="kptp-wom-high-chart"></div></div>' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Month Low &mdash; Week of Month</div><div id="kptp-wom-low-chart"></div></div>' +
      '</div>' +
      '<div class="kptp-panel-card" id="kptp-wom-pair-card" hidden>' +
        '<div class="kptp-panel-title">Month High/Low &mdash; Week Pairing</div>' +
        '<div class="kptp-section-note" style="margin-bottom:12px;">The two charts above show which week-of-month tends to have the high and which tends to have the low, ' +
          '<i>separately</i>. This is the <i>joint</i> pattern &mdash; e.g. how often a week-1 low pairs with a week-4 high, specifically. Rows = low week, columns = high week. Darker = more frequent; the diagonal (same week) is real but consistently rare.</div>' +
        '<div id="kptp-wom-pair-heatmap"></div>' +
      '</div>' +
    '</div>' +

    // ── Yearly panel ─────────────────────────────────────────────────────
    '<div class="kptp-gran-panel" id="kptp-gran-yearly" data-gran-panel="yearly" hidden>' +
      '<div class="kptp-section-label" id="kptp-yearly-profile-label" hidden>Yearly Profile Taxonomy</div>' +
      '<div class="kptp-section-note" id="kptp-yearly-profile-summary-note" hidden></div>' +
      '<div class="kptp-profile-grid" id="kptp-yearly-profile-grid" hidden></div>' +

      '<div class="kptp-section-label">Yearly Range Distribution</div>' +
      '<div class="kptp-section-note">Same percentile-strip reading as the other granularities, computed from yearly bars &mdash; always full history (no lookback window; too few years to meaningfully window).</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Yearly Range</div>' +
        '<div class="kptp-range-strip-wrap"><div id="kptp-range-yearly"></div></div>' +
        '<div class="kptp-range-strip-caption" id="kptp-range-yearly-caption"></div>' +
        '<div class="kptp-mode-note" id="kptp-range-yearly-mode-note"></div>' +
        '<div class="kptp-section-note" id="kptp-range-yearly-sample-note" style="margin-top:10px;margin-bottom:0;"></div>' +
      '</div>' +

      '<div class="kptp-section-label">Extreme Timing &mdash; Month &amp; Week of Year</div>' +
      '<div class="kptp-section-note">Which calendar month, and which week of the year (ISO week numbering), the year&rsquo;s high/low falls in. Full history. Hover any bar for the exact count. <span class="kptp-muted-inline">ISO weeks: the week containing each year&rsquo;s first Thursday is Week 1, so a late-December date can land in Week 1 of the following year.</span></div>' +
      '<div class="kptp-two-col">' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Year High &mdash; Month</div><div id="kptp-year-high-month-chart"></div></div>' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Year Low &mdash; Month</div><div id="kptp-year-low-month-chart"></div></div>' +
      '</div>' +
      '<div class="kptp-panel-card" id="kptp-year-month-pair-card" hidden>' +
        '<div class="kptp-panel-title">Year High/Low &mdash; Month Pairing</div>' +
        '<div class="kptp-section-note" style="margin-bottom:12px;">The two charts above show which month tends to have the year&rsquo;s high and which tends to have the low, ' +
          '<i>separately</i>. This is the <i>joint</i> pattern &mdash; e.g. how often a January low pairs with a December high, specifically. Rows = low month, columns = high month. Darker = more frequent. <b>Only ~25-30 years of history per asset &mdash; most cells are 0 or 1 by construction; treat this as a much weaker signal than the Weekly/Monthly pairing heatmaps.</b></div>' +
        '<div id="kptp-year-month-pair-heatmap"></div>' +
      '</div>' +
      '<div class="kptp-two-col">' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Year High &mdash; Week of Year</div><div id="kptp-year-high-week-chart"></div></div>' +
        '<div class="kptp-panel-card"><div class="kptp-panel-title">Year Low &mdash; Week of Year</div><div id="kptp-year-low-week-chart"></div></div>' +
      '</div>' +
    '</div>' +

    '<div class="kptp-footnote">' +
      'Historical data: TradersWay MT5 export, ' + pairUpper + (bundle.stats && bundle.stats.n_days ? (', ' + bundle.stats.n_days + ' trading days through ' + bundle.stats.as_of) : '') + ' (data-gap days excluded from statistics). Statistics are probability-weighted historical tendencies, not guaranteed outcomes.' +
      '<span class="copyright" style="display:block;margin-top:10px;padding-top:10px;border-top:1px solid #1e2430;color:#94a3b8;letter-spacing:0.8px;font-size:11px;">&copy; 2026 Kaminari Precision Trading. All rights reserved. &nbsp;&middot;&nbsp; Market Profiling methodology and pipeline by Kaminari Precision Trading, built from raw MT5 price history.</span>' +
    '</div>';

  var footnote = document.querySelector('.footnote');
  if (footnote) {
    footnote.parentElement.insertBefore(panel, footnote);
  } else {
    (document.querySelector('.container') || document.body).appendChild(panel);
  }

  /* ─── Render functions (adapted from source dashboard.js) ────────────── */
  function renderStatTiles() {
    var grid = document.getElementById('kptp-stat-grid');
    if (!grid) return;
    var s = bundle.stats;
    var adr = s.daily_range.latest_adr || {};
    var full = s.daily_range.windowed_distribution.full;
    var tiles = [
      { label: 'Trading Days', value: s.n_days, unit: '', glossary: 'trading_days' },
      { label: 'ADR 20', value: (adr.ADR_20 != null ? adr.ADR_20 : '—'), unit: unit, glossary: 'adr' },
      { label: 'ADR 5', value: (adr.ADR_5 != null ? adr.ADR_5 : '—'), unit: unit, glossary: 'adr' },
      { label: 'Median Daily Range', value: full.median, unit: unit, glossary: 'median' },
      { label: 'Data As Of', value: s.as_of, unit: '' }
    ];
    grid.innerHTML = '';
    tiles.forEach(function (t) {
      var div = document.createElement('div');
      div.className = 'kptp-stat-tile';
      var icon = t.glossary ? kptpGlossaryIcon(t.glossary) : '';
      div.innerHTML = '<div class="kptp-stat-label">' + t.label + icon + '</div><div class="kptp-stat-value">' + t.value + '<span class="kptp-unit">' + t.unit + '</span></div>';
      grid.appendChild(div);
    });
    kptpAttachGlossaryIcons(grid);
  }

  function renderRangeSection(windowKey) {
    var s = bundle.stats;
    var daily = s.daily_range.windowed_distribution[windowKey];
    var weekly = s.weekly_range.windowed_distribution[windowKey];
    var monthly = s.monthly_range.windowed_distribution[windowKey];

    [
      ['kptp-range-daily', daily, 'Daily', 'days'],
      ['kptp-range-weekly', weekly, 'Weekly', 'weeks'],
      ['kptp-range-monthly', monthly, 'Monthly', 'months']
    ].forEach(function (row) {
      var id = row[0], dist = row[1], label = row[2], unitPlural = row[3];
      var container = document.getElementById(id);
      if (!container) return;
      KPTPCharts.renderRangeStrip(container, dist, unit);
      var cap = document.getElementById(id + '-caption');
      var modeNote = document.getElementById(id + '-mode-note');
      if (cap) {
        if (dist && dist.n) {
          cap.innerHTML = '<span>' + label + ' range &middot; n=' + dist.n + '</span><span class="kptp-median-note">median ' + dist.median + ' ' + unit + ' (mean ' + dist.mean + ')</span>';
        } else {
          cap.innerHTML = '<span>' + label + ' range &middot; insufficient data in this window</span>';
        }
      }
      if (modeNote) {
        modeNote.innerHTML = (dist && dist.n) ? modeNoteHtml(dist, unitPlural) : '';
        kptpAttachGlossaryIcons(modeNote);
      }
    });
  }

  function renderTimeSection(windowKey) {
    var s = bundle.stats;
    [
      ['kptp-heatmap-high', s.daily_high_time.windowed_circular_stats[windowKey], 'High'],
      ['kptp-heatmap-low', s.daily_low_time.windowed_circular_stats[windowKey], 'Low']
    ].forEach(function (row) {
      var id = row[0], circ = row[1], label = row[2];
      var container = document.getElementById(id);
      if (!container) return;
      KPTPCharts.renderTimeHeatmap(container, circ);
      var cap = document.getElementById(id + '-caption');
      if (cap) {
        if (circ && circ.n) {
          var badge = concentrationBadge(circ.concentration_R);
          cap.innerHTML =
            'Daily ' + label + ' mode: <b>' + circ.mode_bucket_start_utc + '&ndash;' + circ.mode_bucket_end_utc + ' UTC</b> ' +
            '(' + circ.mode_bucket_pct_of_days + '% of days) &middot; circular mean ' + circ.circular_mean_utc + ' UTC' +
            '<span class="kptp-concentration-badge ' + badge.cls + '">' + badge.label + ' &middot; R=' + circ.concentration_R + '</span>';
        } else {
          cap.textContent = 'Daily ' + label + ': insufficient data in this window';
        }
      }
    });
  }

  function renderSessionLegend() {
    panel.querySelectorAll('.kptp-session-legend').forEach(function (legend) {
      legend.innerHTML = [
        ['Asian', 'var(--kptp-asian)'],
        ['London', 'var(--kptp-london)'],
        ['New York', 'var(--kptp-ny)'],
        ['Overlap', 'var(--kptp-overlap)']
      ].map(function (pair) {
        return '<span><span class="kptp-dot" style="background:' + pair[1] + '"></span>' + pair[0] + '</span>';
      }).join('');
    });
  }

  // Mean intra-hour range across full history, one bar per UTC hour --
  // Tier 5b's session-overlap activity finding (market-profiling-system-spec.md
  // Sec4.5): validated across GBPUSD/EURUSD/XAUUSD, both overlap windows
  // (Asian/London ~07:00 UTC, London/New York ~12:00-16:00 UTC) show real,
  // consistently elevated activity versus their neighboring single-session
  // hours -- not an artifact of any one asset. See
  // KPT-Market-Profiling/pipeline/session_activity.py.
  function renderHourlyActivity() {
    var label = document.getElementById('kptp-hourly-activity-label');
    var note = document.getElementById('kptp-hourly-activity-note');
    var card = document.getElementById('kptp-hourly-activity-card');
    if (!card || !bundle.hourly_activity) return;

    label.hidden = false;
    note.hidden = false;
    card.hidden = false;

    var ha = bundle.hourly_activity;
    var entries = [];
    for (var h = 0; h < 24; h++) {
      var hd = ha.hourly[String(h)];
      var hourLabel = String(h).padStart(2, '0') + ':00';
      var nextLabel = String((h + 1) % 24).padStart(2, '0') + ':00';
      var sessionLabel = HOUR_SESSION_LABEL[h] || 'Outside main sessions';
      var color = HOUR_SESSION_COLOR[h] || 'var(--muted)';
      var value = hd ? hd.mean_range_pips : 0;
      var tooltip = hd
        ? ('<b>' + hourLabel + '&ndash;' + nextLabel + ' UTC</b><br>' + sessionLabel + '<br>Mean range: ' + hd.mean_range_pips + ' ' + unit + ' (n=' + hd.n_days + ' days)')
        : ('<b>' + hourLabel + ' UTC</b><br>No data');
      entries.push({ label: hourLabel, value: value, color: color, tooltip: tooltip });
    }
    KPTPCharts.renderBarChart(document.getElementById('kptp-hourly-activity-chart'), entries, {
      valueFmt: function (v) { return Math.round(v); }
    });

    if (note) {
      note.innerHTML =
        'Average range within each UTC hour, full history &mdash; how much price typically ' +
        'moves during that hour, not where the day&rsquo;s high/low tends to land (that&rsquo;s the Time of Extreme section above). ' +
        'Both session-overlap windows (amber) show real, consistently elevated activity versus their neighboring single-session ' +
        'hours &mdash; validated across GBPUSD/EURUSD/XAUUSD, not specific to this one asset. Always full history, not affected by the lookback window.';
      kptpAttachGlossaryIcons(note);
    }

    var sw = ha.session_windows;
    var cap = document.getElementById('kptp-hourly-activity-caption');
    if (cap && sw) {
      cap.innerHTML =
        '<b>' + pairUpper + '</b> &mdash; Asian: ' + sw.asian_only.mean_range_pips + ' ' + unit +
        ' &middot; Asian/London overlap: <b>' + sw.asian_london_overlap.mean_range_pips + ' ' + unit + '</b>' +
        ' &middot; London: ' + sw.london_only.mean_range_pips + ' ' + unit +
        ' &middot; London/NY overlap: <b>' + sw.london_ny_overlap.mean_range_pips + ' ' + unit + '</b>' +
        ' &middot; NY: ' + sw.ny_only.mean_range_pips + ' ' + unit +
        ' <span class="kptp-muted-inline">(mean range per hour, averaged across each window&rsquo;s hours)</span>';
    }
  }

  // Tier 5b's news-release-timing profile family (market-profiling-system-
  // spec.md §4.5) -- the NFP case specifically, the one that's calendar-
  // computable (first Friday of the month, 8:30am NY local, DST-aware)
  // without the not-yet-built news/event annotation layer the general case
  // needs. Validated (2026-09-06) across GBPUSD/EURUSD/XAUUSD before this
  // was built: NFP Fridays show a real, consistent, cross-asset difference
  // from other Fridays -- larger range and markedly more clustering of the
  // day's own high/low inside the release window. See
  // KPT-Market-Profiling/pipeline/stats_engine.py's nfp_profile().
  function renderNfpProfile() {
    var label = document.getElementById('kptp-nfp-label');
    var note = document.getElementById('kptp-nfp-note');
    var card = document.getElementById('kptp-nfp-card');
    var np = bundle.stats && bundle.stats.nfp_profile;
    if (!card || !np) return;

    label.hidden = false;
    note.hidden = false;
    card.hidden = false;

    if (note) {
      note.innerHTML =
        'NFP is always the first Friday of the month, 8:30am NY local time (a calendar rule, not the exact historical release ' +
        'calendar, which occasionally shifts for a holiday). Compares NFP Fridays against every other Friday using the identical ' +
        'release-window definition (' + np.release_window_minutes_before + ' min before to ' + np.release_window_minutes_after +
        ' min after 8:30am NY, DST-aware) &mdash; so the difference below is a genuine NFP-specific effect, not an artifact of how it&rsquo;s measured.';
    }

    var grid = document.getElementById('kptp-nfp-stat-grid');
    if (grid) {
      var tiles = [
        { label: 'NFP Fridays (n)', value: np.nfp_fridays.n, unit: '' },
        { label: 'NFP Mean Range', value: np.nfp_fridays.mean_range_pips, unit: unit },
        { label: 'NFP Extreme in Release Window', value: np.nfp_fridays.extreme_in_release_window_pct, unit: '%' },
        { label: 'Other Fridays (n)', value: np.other_fridays.n, unit: '' },
        { label: 'Other Fri Mean Range', value: np.other_fridays.mean_range_pips, unit: unit },
        { label: 'Other Fri Extreme in Window', value: np.other_fridays.extreme_in_release_window_pct, unit: '%' }
      ];
      grid.innerHTML = '';
      tiles.forEach(function (t) {
        var div = document.createElement('div');
        div.className = 'kptp-stat-tile';
        div.innerHTML = '<div class="kptp-stat-label">' + t.label + '</div><div class="kptp-stat-value">' + t.value + '<span class="kptp-unit">' + t.unit + '</span></div>';
        grid.appendChild(div);
      });
    }

    var cap = document.getElementById('kptp-nfp-caption');
    if (cap) {
      var rangeDiffPct = np.other_fridays.mean_range_pips
        ? Math.round((np.nfp_fridays.mean_range_pips / np.other_fridays.mean_range_pips - 1) * 1000) / 10
        : null;
      var windowDiffPts = Math.round((np.nfp_fridays.extreme_in_release_window_pct - np.other_fridays.extreme_in_release_window_pct) * 10) / 10;
      cap.innerHTML = '<b>' + pairUpper + '</b> &mdash; NFP Fridays run ' + (rangeDiffPct != null ? (rangeDiffPct >= 0 ? '+' : '') + rangeDiffPct + '%' : 'n/a') +
        ' bigger range and land an extreme in the release window ' + (windowDiffPts >= 0 ? '+' : '') + windowDiffPts + ' percentage points more often than other Fridays.';
    }
  }

  // NFP Fridays' Daily Profile Taxonomy breakdown -- reuse-based design
  // (2026-09-06, at the user's request): rather than inventing new
  // breakout/fakeout/whipsaw labels, shows the EXISTING 8-profile Daily
  // taxonomy's distribution specifically on NFP days (profile_taxonomy.py's
  // nfp_profile_distribution(), bundle.profiles.nfp). Same profile cards
  // and detail-page links as renderProfiles() -- these are the identical
  // profile names, no new taxonomy to explain. Candlestick examples for
  // the top profiles are loaded separately (renderNfpExamples()) since
  // they need the profile-examples data file, not yet loaded on this page.
  var NFP_TOP_N_EXAMPLES = 3;

  function nfpSortedProfiles() {
    var nfp = bundle.profiles && bundle.profiles.nfp;
    if (!nfp || !nfp.nfp_profile_distribution) return null;
    var dist = nfp.nfp_profile_distribution;
    return Object.keys(dist).map(function (k) { return [k, dist[k]]; }).sort(function (a, b) { return b[1].n - a[1].n; });
  }

  function renderNfpProfileGrid() {
    var note = document.getElementById('kptp-nfp-profile-note');
    var grid = document.getElementById('kptp-nfp-profile-grid');
    var entries = nfpSortedProfiles();
    if (!note || !grid || !entries) return;

    note.hidden = false;
    grid.hidden = false;
    note.innerHTML =
      '<b>NFP Day Profile Breakdown</b> &mdash; which of the existing Daily profiles NFP Fridays actually land in. ' +
      'A whipsaw ("both sides destroyed") day shows up as <b>Volatile Reversal Day</b> (big range, closed back near the middle); ' +
      'a clean breakout as <b>Trend Day</b>; an ambiguous, no-clear-resolution day as <b>Volatile Day</b>. Same cards, same detail pages as the main Daily Profile Taxonomy above.';

    grid.innerHTML = '';
    entries.forEach(function (entry) {
      var name = entry[0], v = entry[1];
      var a = document.createElement('a');
      a.className = 'kptp-profile-card';
      a.href = '../profiling-profiles/detail.html?p=' + kptpProfileSlug(name) + '&a=' + assetKey;
      a.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
      a.innerHTML =
        '<div class="kptp-profile-card-top">' +
          '<div><div class="kptp-profile-name">' + name + '</div><div class="kptp-profile-pct">' + v.pct + '%</div></div>' +
          kptpProfileIconSvg(name, 46) +
        '</div>' +
        '<div class="kptp-profile-meta">' +
          'n=' + v.n + ' NFP days &middot; avg range ' + v.mean_range_pips + ' ' + unit +
        '</div>' +
        '<div class="kptp-profile-card-link">See profile details &rarr;</div>';
      grid.appendChild(a);
    });
  }

  // Loads the profile-examples data file on demand (not loaded by default
  // on this page -- only detail.html/compare.html load it today) via
  // KPTPData.loadAsset(), then renders real candlestick examples for the
  // top NFP profiles. Async because of the dynamic script load; every
  // other render*() call on this page is synchronous against data already
  // in `bundle`, so this one is deliberately kept separate rather than
  // forcing the whole init sequence to wait on it.
  function renderNfpExamples() {
    var note = document.getElementById('kptp-nfp-examples-note');
    var wrap = document.getElementById('kptp-nfp-examples-wrap');
    var entries = nfpSortedProfiles();
    if (!note || !wrap || !entries || !entries.length) return;

    KPTPData.loadAsset(assetKey, '../data/profiling').then(function () {
      var ex = window.KPT_PROFILING_EXAMPLES && window.KPT_PROFILING_EXAMPLES[assetKey];
      var nfpEx = ex && ex._nfp;
      if (!nfpEx) return;

      var top = entries.filter(function (e) { return nfpEx[e[0]]; }).slice(0, NFP_TOP_N_EXAMPLES);
      if (!top.length) return;

      note.hidden = false;
      note.innerHTML = '<b>Real NFP-day examples</b> &mdash; the ' + top.length + ' most common NFP profile' + (top.length > 1 ? 's' : '') +
        ' for ' + pairUpper + ', each a genuine historical NFP Friday closest to that profile&rsquo;s own average NFP-day range (not cherry-picked). M15 candles, UTC.';

      wrap.hidden = false;
      wrap.innerHTML = '';
      top.forEach(function (entry) {
        var name = entry[0];
        var example = nfpEx[name];
        var panel = document.createElement('div');
        panel.className = 'kptp-panel-card';
        var chartId = 'kptp-nfp-candle-' + kptpProfileSlug(name);
        panel.innerHTML =
          '<div class="kptp-panel-title">' + name + ' &mdash; ' + example.date + '</div>' +
          '<div id="' + chartId + '"></div>';
        wrap.appendChild(panel);
        KPTPCharts.renderCandlestick(document.getElementById(chartId), example.bars);
      });
    }).catch(function (err) {
      console.error('renderNfpExamples: failed to load profile-examples data', err);
    });
  }

  function renderWeeklyMonthly() {
    var s = bundle.stats;
    function fmt(thing) { return function (v, pct) { return 'The week’s ' + thing + ' landed here on ' + v + ' of ' + s.n_weeks + ' weeks (' + pct + '%).'; }; }
    function fmtWom(thing) { return function (v, pct) { return 'The month’s ' + thing + ' landed in this week-of-month on ' + v + ' of ' + s.n_months + ' months (' + pct + '%).'; }; }
    KPTPCharts.renderBarChart(document.getElementById('kptp-weekday-high-chart'), orderedEntries(s.weekly_high_day, WEEKDAY_ORDER, fmt('high')), { valueFmt: function (v) { return v + '×'; } });
    KPTPCharts.renderBarChart(document.getElementById('kptp-weekday-low-chart'), orderedEntries(s.weekly_low_day, WEEKDAY_ORDER, fmt('low')), { valueFmt: function (v) { return v + '×'; } });
    KPTPCharts.renderBarChart(document.getElementById('kptp-wom-high-chart'), numericSortedEntries(s.monthly_high_week_of_month, 'Wk ', fmtWom('high')), { valueFmt: function (v) { return v + '×'; } });
    KPTPCharts.renderBarChart(document.getElementById('kptp-wom-low-chart'), numericSortedEntries(s.monthly_low_week_of_month, 'Wk ', fmtWom('low')), { valueFmt: function (v) { return v + '×'; } });
  }

  function renderYearlySection() {
    var s = bundle.stats;
    if (!s.yearly_range) return;
    var dist = s.yearly_range.distribution;

    var container = document.getElementById('kptp-range-yearly');
    if (container) {
      KPTPCharts.renderRangeStrip(container, dist, unit);
      var cap = document.getElementById('kptp-range-yearly-caption');
      if (cap && dist && dist.n) {
        cap.innerHTML = '<span>Yearly range &middot; n=' + dist.n + ' years</span><span class="kptp-median-note">median ' + dist.median + ' ' + unit + ' (mean ' + dist.mean + ')</span>';
      }
      var modeNote = document.getElementById('kptp-range-yearly-mode-note');
      if (modeNote && dist && dist.n) {
        modeNote.innerHTML = modeNoteHtml(dist, 'years');
        kptpAttachGlossaryIcons(modeNote);
      }
      var smallSample = document.getElementById('kptp-range-yearly-sample-note');
      if (smallSample) {
        smallSample.innerHTML = 'Built from only ' + dist.n + ' years of history' + kptpGlossaryIcon('n_sample') + ' &mdash; treat this section as a much weaker signal than the daily/weekly/monthly ones above.';
        kptpAttachGlossaryIcons(smallSample);
      }
    }

    function fmtY(thing) { return function (v, pct) { return 'The year’s ' + thing + ' landed in this month on ' + v + ' of ' + s.n_years + ' years (' + pct + '%).'; }; }
    KPTPCharts.renderBarChart(document.getElementById('kptp-year-high-month-chart'), monthEntries(s.yearly_high_month, fmtY('high')), { valueFmt: function (v) { return v + '×'; } });
    KPTPCharts.renderBarChart(document.getElementById('kptp-year-low-month-chart'), monthEntries(s.yearly_low_month, fmtY('low')), { valueFmt: function (v) { return v + '×'; } });

    if (s.yearly_high_week && s.yearly_low_week) {
      function fmtYW(thing) { return function (v, pct) { return v ? ('The year’s ' + thing + ' landed in this week on ' + v + ' of ' + s.n_years + ' years (' + pct + '%).') : 'No year in this dataset had its ' + thing + ' fall in this week.'; }; }
      var weekChartOpts = { valueFmt: function (v) { return v + '×'; }, labelEvery: 4 };
      var highWeekChart = document.getElementById('kptp-year-high-week-chart');
      var lowWeekChart = document.getElementById('kptp-year-low-week-chart');
      if (highWeekChart) KPTPCharts.renderBarChart(highWeekChart, weekOfYearEntries(s.yearly_high_week, fmtYW('high')), weekChartOpts);
      if (lowWeekChart) KPTPCharts.renderBarChart(lowWeekChart, weekOfYearEntries(s.yearly_low_week, fmtYW('low')), weekChartOpts);
    }
  }

  function renderProfiles() {
    var grid = document.getElementById('kptp-profile-grid');
    if (!grid) return;
    var dist = bundle.profiles.profile_distribution;
    var avgRange = bundle.profiles.avg_range_pips_by_profile;
    var timing = bundle.profiles.extreme_timing_by_profile;

    var entries = Object.keys(dist).map(function (k) { return [k, dist[k]]; }).sort(function (a, b) { return b[1].n - a[1].n; });
    grid.innerHTML = '';
    entries.forEach(function (entry) {
      var name = entry[0], v = entry[1];
      var timingEntries = timing[name] ? Object.keys(timing[name]).map(function (k) { return [k, timing[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;
      var range = avgRange[name];
      var a = document.createElement('a');
      a.className = 'kptp-profile-card';
      a.href = '../profiling-profiles/detail.html?p=' + kptpProfileSlug(name) + '&a=' + assetKey;
      a.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
      a.innerHTML =
        '<div class="kptp-profile-card-top">' +
          '<div><div class="kptp-profile-name">' + name + '</div><div class="kptp-profile-pct">' + v.pct + '%</div></div>' +
          kptpProfileIconSvg(name, 46) +
        '</div>' +
        '<div class="kptp-profile-meta">' +
          'n=' + v.n + ' days' + (range ? (' &middot; avg range ' + range.mean + ' ' + unit) : '') +
          (topTiming ? ('<br>most common timing' + kptpGlossaryIcon('extreme_timing') + ': ' + topTiming[0].replace('_', ' ') + ' (' + topTiming[1] + ')') : '') +
        '</div>' +
        '<div class="kptp-profile-card-link">See profile details &rarr;</div>';
      grid.appendChild(a);
    });
    kptpAttachGlossaryIcons(grid);

    var note = document.getElementById('kptp-profile-summary-note');
    if (note) {
      note.textContent = bundle.profiles.n_labeled_days + ' labeled days · ' + bundle.profiles.n_data_gap_days + ' data-gap days excluded · ' + bundle.profiles.n_insufficient_history_days + ' days pending sufficient trailing history.';
    }
  }

  function renderWeeklyProfiles() {
    var grid = document.getElementById('kptp-weekly-profile-grid');
    var label = document.getElementById('kptp-weekly-profile-label');
    var note = document.getElementById('kptp-weekly-profile-summary-note');
    if (!grid || !bundle.weekly) return;

    grid.hidden = false;
    if (label) label.hidden = false;
    if (note) note.hidden = false;

    var weekly = bundle.weekly;
    var dist = weekly.profile_distribution;
    var avgRange = weekly.avg_range_pips_by_profile;
    var timing = weekly.extreme_timing_by_profile;
    var spread = weekly.extreme_spread_by_profile;

    var entries = Object.keys(dist).map(function (k) { return [k, dist[k]]; }).sort(function (a, b) { return b[1].n - a[1].n; });
    grid.innerHTML = '';
    entries.forEach(function (entry) {
      var name = entry[0], v = entry[1];

      var timingEntries = timing[name] ? Object.keys(timing[name]).map(function (k) { return [k, timing[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;

      var spreadEntries = spread[name] ? Object.keys(spread[name]).map(function (k) { return [k, spread[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topSpread = spreadEntries && spreadEntries.length ? spreadEntries[0] : null;

      var range = avgRange[name];
      var a = document.createElement('a');
      a.className = 'kptp-profile-card';
      a.href = '../profiling-profiles/detail.html?p=' + kptpProfileSlug(name) + '&a=' + assetKey;
      a.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
      a.innerHTML =
        '<div class="kptp-profile-card-top">' +
          '<div><div class="kptp-profile-name">' + name + '</div><div class="kptp-profile-pct">' + v.pct + '%</div></div>' +
          kptpProfileIconSvg(name, 46) +
        '</div>' +
        '<div class="kptp-profile-meta">' +
          'n=' + v.n + ' weeks' + (range ? (' &middot; avg range ' + range.mean + ' ' + unit) : '') +
          (topTiming ? ('<br>most common timing: ' + topTiming[0].replace('_', ' ') + ' (' + topTiming[1] + ')') : '') +
          (topSpread ? ('<br>most common day-pattern: ' + topSpread[0].replace('_', ' ') + ' (' + topSpread[1] + ')') : '') +
        '</div>' +
        '<div class="kptp-profile-card-link">See profile details &rarr;</div>';
      grid.appendChild(a);
    });

    if (note) {
      note.innerHTML =
        'Same two axes as the daily taxonomy above (range regime, closing strength), independently re-derived at weekly granularity' +
        ' &mdash; not assumed to transfer as-is. Two timing tags: which half of the week each extreme formed in, and how many' +
        ' weekdays apart the week&rsquo;s high and low landed (not just which single day tends to have each one).<br>' +
        weekly.n_labeled_weeks + ' labeled weeks · ' + weekly.n_short_weeks + ' short weeks excluded · ' +
        weekly.n_insufficient_history_weeks + ' weeks pending sufficient trailing history.';
    }
  }

  function renderMonthlyProfiles() {
    var grid = document.getElementById('kptp-monthly-profile-grid');
    var label = document.getElementById('kptp-monthly-profile-label');
    var note = document.getElementById('kptp-monthly-profile-summary-note');
    if (!grid || !bundle.monthly) return;

    grid.hidden = false;
    if (label) label.hidden = false;
    if (note) note.hidden = false;

    var monthly = bundle.monthly;
    var dist = monthly.profile_distribution;
    var avgRange = monthly.avg_range_pips_by_profile;
    var timing = monthly.extreme_timing_by_profile;
    var spread = monthly.extreme_spread_by_profile;

    var entries = Object.keys(dist).map(function (k) { return [k, dist[k]]; }).sort(function (a, b) { return b[1].n - a[1].n; });
    grid.innerHTML = '';
    entries.forEach(function (entry) {
      var name = entry[0], v = entry[1];

      var timingEntries = timing[name] ? Object.keys(timing[name]).map(function (k) { return [k, timing[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;

      var spreadEntries = spread[name] ? Object.keys(spread[name]).map(function (k) { return [k, spread[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topSpread = spreadEntries && spreadEntries.length ? spreadEntries[0] : null;

      var range = avgRange[name];
      var a = document.createElement('a');
      a.className = 'kptp-profile-card';
      a.href = '../profiling-profiles/detail.html?p=' + kptpProfileSlug(name) + '&a=' + assetKey;
      a.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
      a.innerHTML =
        '<div class="kptp-profile-card-top">' +
          '<div><div class="kptp-profile-name">' + name + '</div><div class="kptp-profile-pct">' + v.pct + '%</div></div>' +
          kptpProfileIconSvg(name, 46) +
        '</div>' +
        '<div class="kptp-profile-meta">' +
          'n=' + v.n + ' months' + (range ? (' &middot; avg range ' + range.mean + ' ' + unit) : '') +
          (topTiming ? ('<br>most common timing: ' + topTiming[0].replace('_', ' ') + ' (' + topTiming[1] + ')') : '') +
          (topSpread ? ('<br>most common week-pattern: ' + topSpread[0].replace('_', ' ') + ' (' + topSpread[1] + ')') : '') +
        '</div>' +
        '<div class="kptp-profile-card-link">See profile details &rarr;</div>';
      grid.appendChild(a);
    });

    if (note) {
      note.innerHTML =
        'Same two axes as the daily/weekly taxonomies above (range regime, closing strength), independently re-derived at monthly granularity' +
        ' &mdash; using a 24-month rolling window rather than the ~1-year convention Daily/Weekly use, since a 12-month window makes the percentile' +
        ' ranking too coarse with so few monthly bars. Two timing tags: which half of the month each extreme formed in, and how many' +
        ' weeks-of-month apart the month&rsquo;s high and low landed (not just which single week tends to have each one).<br>' +
        monthly.n_labeled_months + ' labeled months · ' + monthly.n_short_months + ' short months excluded · ' +
        monthly.n_insufficient_history_months + ' months pending sufficient trailing history.';
    }
  }

  // The joint (low_week_of_month, high_week_of_month) table -- e.g. "how
  // often does a week-1 low pair with a week-4 high, specifically" -- not
  // just the two existing marginal bar charts (which week-of-month tends to
  // have the high, which tends to have the low, tracked separately). See
  // KPT-Market-Profiling/pipeline/profile_taxonomy_monthly.py's
  // week_of_month_pair_distribution() for how this is computed.
  function renderWeekOfMonthPairHeatmap() {
    var card = document.getElementById('kptp-wom-pair-card');
    var container = document.getElementById('kptp-wom-pair-heatmap');
    if (!card || !container || !bundle.monthly || !bundle.monthly.week_of_month_pair_distribution) return;

    card.hidden = false;
    var wp = bundle.monthly.week_of_month_pair_distribution;
    var weeks = ['1', '2', '3', '4', '5'];

    var maxPct = 0;
    weeks.forEach(function (lo) { weeks.forEach(function (hi) { maxPct = Math.max(maxPct, wp.pairs[lo][hi].pct); }); });

    var html = '<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;font-size:11px;">';
    html += '<tr><td style="padding:6px 8px;"></td>' +
      '<td colspan="5" style="padding:6px 8px;text-align:center;color:var(--muted);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;">High Week &rarr;</td></tr>';
    html += '<tr><td style="padding:6px 8px;"></td>' + weeks.map(function (w) {
      return '<td style="padding:6px 8px;text-align:center;color:var(--muted);font-weight:600;">Wk ' + w + '</td>';
    }).join('') + '</tr>';

    weeks.forEach(function (lo) {
      html += '<tr>';
      html += '<td style="padding:6px 8px;color:var(--muted);font-weight:600;white-space:nowrap;">Wk ' + lo + ' low</td>';
      weeks.forEach(function (hi) {
        var cell = wp.pairs[lo][hi];
        var isSameWeek = lo === hi;
        var intensity = maxPct ? cell.pct / maxPct : 0;
        var bg = isSameWeek
          ? 'rgba(148,163,184,' + (0.06 + intensity * 0.1) + ')'
          : 'rgba(34,197,94,' + (0.05 + intensity * 0.55) + ')';
        html += '<td title="Wk ' + lo + ' low + Wk ' + hi + ' high: ' + cell.pct + '% (n=' + cell.n + ')' + (isSameWeek ? ' — same week' : '') + '"' +
          ' style="padding:8px;text-align:center;background:' + bg + ';border:1px solid var(--border);' + (isSameWeek ? 'color:var(--muted);' : 'color:var(--text);') + '">' +
          cell.pct + '%</td>';
      });
      html += '</tr>';
    });
    html += '</table></div>';
    html += '<div class="kptp-section-note" style="margin-top:10px;margin-bottom:0;">n=' + wp.n_months + ' months &middot; same-week (diagonal) occurs in ' + wp.same_week_pct + '% of months. Hover any cell for the exact count.</div>';

    container.innerHTML = html;
  }

  function renderYearlyProfiles() {
    var grid = document.getElementById('kptp-yearly-profile-grid');
    var label = document.getElementById('kptp-yearly-profile-label');
    var note = document.getElementById('kptp-yearly-profile-summary-note');
    if (!grid || !bundle.yearly) return;

    grid.hidden = false;
    if (label) label.hidden = false;
    if (note) note.hidden = false;

    var yearly = bundle.yearly;
    var dist = yearly.profile_distribution;
    var avgRange = yearly.avg_range_pips_by_profile;
    var timing = yearly.extreme_timing_by_profile;
    var spread = yearly.extreme_spread_by_profile;

    var entries = Object.keys(dist).map(function (k) { return [k, dist[k]]; }).sort(function (a, b) { return b[1].n - a[1].n; });
    grid.innerHTML = '';
    entries.forEach(function (entry) {
      var name = entry[0], v = entry[1];

      var timingEntries = timing[name] ? Object.keys(timing[name]).map(function (k) { return [k, timing[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;

      var spreadEntries = spread[name] ? Object.keys(spread[name]).map(function (k) { return [k, spread[name][k]]; }).sort(function (a, b) { return b[1] - a[1]; }) : null;
      var topSpread = spreadEntries && spreadEntries.length ? spreadEntries[0] : null;

      var range = avgRange[name];
      var a = document.createElement('a');
      a.className = 'kptp-profile-card';
      a.href = '../profiling-profiles/detail.html?p=' + kptpProfileSlug(name) + '&a=' + assetKey;
      a.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
      a.innerHTML =
        '<div class="kptp-profile-card-top">' +
          '<div><div class="kptp-profile-name">' + name + '</div><div class="kptp-profile-pct">' + v.pct + '%</div></div>' +
          kptpProfileIconSvg(name, 46) +
        '</div>' +
        '<div class="kptp-profile-meta">' +
          'n=' + v.n + ' years' + (range ? (' &middot; avg range ' + range.mean + ' ' + unit) : '') +
          (topTiming ? ('<br>most common timing: ' + topTiming[0].replace('_', ' ') + ' (' + topTiming[1] + ')') : '') +
          (topSpread ? ('<br>most common month-pattern: ' + topSpread[0].replace('_', ' ') + ' (' + topSpread[1] + ')') : '') +
        '</div>' +
        '<div class="kptp-profile-card-link">See profile details &rarr;</div>';
      grid.appendChild(a);
    });

    if (note) {
      note.innerHTML =
        'Same two axes as the daily/weekly/monthly taxonomies above (range regime, closing strength), independently re-derived at yearly granularity' +
        ' &mdash; using an expanding window (percentile against all prior years) rather than a fixed trailing window, since there are only ~' + (yearly.n_labeled_years + yearly.n_short_years + yearly.n_insufficient_history_years) + ' years of history total to compare against.' +
        ' <b>Built from only ' + yearly.n_labeled_years + ' classified years &mdash; treat every card above as a much weaker signal than the Daily/Weekly/Monthly readings.</b> Some profiles may show n=0-2 for a given asset; that is a real reflection of how little yearly history exists, not a bug.<br>' +
        yearly.n_labeled_years + ' labeled years · ' + yearly.n_short_years + ' short years excluded · ' +
        yearly.n_insufficient_history_years + ' years pending sufficient trailing history.';
    }
  }

  // The joint (low_month, high_month) table -- e.g. "how often does a
  // January low pair with a December high, specifically" -- not just the
  // two existing marginal bar charts (which month tends to have the year's
  // high, which tends to have the low, tracked separately). See
  // KPT-Market-Profiling/pipeline/profile_taxonomy_yearly.py's
  // month_pair_distribution() for how this is computed. Genuinely sparse at
  // this sample size (~25-30 years across 144 cells) -- built at the user's
  // explicit request, disclosed prominently rather than presented with the
  // same confidence the denser Weekly/Monthly heatmaps can claim.
  function renderYearMonthPairHeatmap() {
    var card = document.getElementById('kptp-year-month-pair-card');
    var container = document.getElementById('kptp-year-month-pair-heatmap');
    if (!card || !container || !bundle.yearly || !bundle.yearly.month_pair_distribution) return;

    card.hidden = false;
    var mp = bundle.yearly.month_pair_distribution;
    var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    var shortMonth = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };

    var maxPct = 0;
    months.forEach(function (lo) { months.forEach(function (hi) { maxPct = Math.max(maxPct, mp.pairs[lo][hi].pct); }); });

    var html = '<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;font-size:10px;">';
    html += '<tr><td style="padding:4px 5px;"></td>' +
      '<td colspan="12" style="padding:4px 5px;text-align:center;color:var(--muted);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;">High Month &rarr;</td></tr>';
    html += '<tr><td style="padding:4px 5px;"></td>' + months.map(function (m) {
      return '<td style="padding:4px 3px;text-align:center;color:var(--muted);font-weight:600;">' + shortMonth[m] + '</td>';
    }).join('') + '</tr>';

    months.forEach(function (lo) {
      html += '<tr>';
      html += '<td style="padding:4px 5px;color:var(--muted);font-weight:600;white-space:nowrap;">' + shortMonth[lo] + ' low</td>';
      months.forEach(function (hi) {
        var cell = mp.pairs[lo][hi];
        var isSameMonth = lo === hi;
        var intensity = maxPct ? cell.pct / maxPct : 0;
        var bg = isSameMonth
          ? 'rgba(148,163,184,' + (0.06 + intensity * 0.1) + ')'
          : (cell.n > 0 ? 'rgba(34,197,94,' + (0.08 + intensity * 0.6) + ')' : 'transparent');
        html += '<td title="' + shortMonth[lo] + ' low + ' + shortMonth[hi] + ' high: ' + cell.pct + '% (n=' + cell.n + ')' + (isSameMonth ? ' — same month' : '') + '"' +
          ' style="padding:5px 3px;text-align:center;background:' + bg + ';border:1px solid var(--border);' + (isSameMonth ? 'color:var(--muted);' : 'color:var(--text);') + '">' +
          (cell.n > 0 ? cell.n : '') + '</td>';
      });
      html += '</tr>';
    });
    html += '</table></div>';
    html += '<div class="kptp-section-note" style="margin-top:10px;margin-bottom:0;">n=' + mp.n_years + ' years total &mdash; cells show raw count (n), not %, since most cells are 0 or 1. Same-month occurred in ' + mp.same_month_pct + '% of years. Hover any cell for the exact percentage.</div>';

    container.innerHTML = html;
  }

  // The joint (low_weekday, high_weekday) table -- e.g. "how often does a
  // Monday low pair with a Friday high, specifically" -- not just the two
  // existing marginal bar charts (which day tends to have the high, which
  // tends to have the low, tracked separately). See
  // KPT-Market-Profiling/pipeline/profile_taxonomy_weekly.py's
  // weekday_pair_distribution() for how this is computed.
  function renderWeekdayPairHeatmap() {
    var card = document.getElementById('kptp-weekday-pair-card');
    var container = document.getElementById('kptp-weekday-pair-heatmap');
    if (!card || !container || !bundle.weekly || !bundle.weekly.weekday_pair_distribution) return;

    card.hidden = false;
    var wp = bundle.weekly.weekday_pair_distribution;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var shortDay = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri' };

    var maxPct = 0;
    days.forEach(function (lo) { days.forEach(function (hi) { maxPct = Math.max(maxPct, wp.pairs[lo][hi].pct); }); });

    var html = '<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;font-size:11px;">';
    html += '<tr><td style="padding:6px 8px;"></td>' +
      '<td colspan="5" style="padding:6px 8px;text-align:center;color:var(--muted);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;">High Day &rarr;</td></tr>';
    html += '<tr><td style="padding:6px 8px;"></td>' + days.map(function (d) {
      return '<td style="padding:6px 8px;text-align:center;color:var(--muted);font-weight:600;">' + shortDay[d] + '</td>';
    }).join('') + '</tr>';

    days.forEach(function (lo) {
      html += '<tr>';
      html += '<td style="padding:6px 8px;color:var(--muted);font-weight:600;white-space:nowrap;">' + shortDay[lo] + ' low</td>';
      days.forEach(function (hi) {
        var cell = wp.pairs[lo][hi];
        var isSameDay = lo === hi;
        var intensity = maxPct ? cell.pct / maxPct : 0;
        var bg = isSameDay
          ? 'rgba(148,163,184,' + (0.06 + intensity * 0.1) + ')'
          : 'rgba(34,197,94,' + (0.05 + intensity * 0.55) + ')';
        html += '<td title="' + shortDay[lo] + ' low + ' + shortDay[hi] + ' high: ' + cell.pct + '% (n=' + cell.n + ')' + (isSameDay ? ' — same day' : '') + '"' +
          ' style="padding:8px;text-align:center;background:' + bg + ';border:1px solid var(--border);' + (isSameDay ? 'color:var(--muted);' : 'color:var(--text);') + '">' +
          cell.pct + '%</td>';
      });
      html += '</tr>';
    });
    html += '</table></div>';
    html += '<div class="kptp-section-note" style="margin-top:10px;margin-bottom:0;">n=' + wp.n_weeks + ' weeks &middot; same-day (diagonal) occurs in ' + wp.same_day_pct + '% of weeks. Hover any cell for the exact count.</div>';

    container.innerHTML = html;
  }

  // The joint (low_session, high_session) table -- e.g. "how often does an
  // Asian low pair with a London-NY-overlap high, specifically" -- not just
  // the two existing marginal Daily High/Daily Low heatmaps (which session
  // tends to have the high, which tends to have the low, tracked
  // separately). Lives in bundle.stats (not bundle.profiles/weekly/monthly/
  // yearly like the other pairing tables) since it's computed by
  // stats_engine.py alongside the other Time-of-Extreme stats, not a
  // profile-taxonomy script. See
  // KPT-Market-Profiling/pipeline/stats_engine.py's
  // session_pair_distribution() for how this is computed -- already
  // excludes is_daily_only-era days (found and fixed 2026-09-06; a
  // single-bar day's high/low session tags are a data-format artifact, not
  // a real fact, and would otherwise inject a false same-session spike).
  function renderSessionPairHeatmap() {
    var card = document.getElementById('kptp-session-pair-card');
    var container = document.getElementById('kptp-session-pair-heatmap');
    var sp = bundle.stats && bundle.stats.daily_session_pair_distribution;
    if (!card || !container || !sp) return;

    card.hidden = false;
    var tags = ['Asian', 'Asian_London_Overlap', 'London', 'London_NY_Overlap', 'New_York', 'Other'];
    var shortTag = {
      Asian: 'Asian', Asian_London_Overlap: 'A/L', London: 'London',
      London_NY_Overlap: 'L/NY', New_York: 'NY', Other: 'Other'
    };

    var maxPct = 0;
    tags.forEach(function (lo) { tags.forEach(function (hi) { maxPct = Math.max(maxPct, sp.pairs[lo][hi].pct); }); });

    var html = '<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;font-size:11px;">';
    html += '<tr><td style="padding:6px 8px;"></td>' +
      '<td colspan="6" style="padding:6px 8px;text-align:center;color:var(--muted);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;">High Session &rarr;</td></tr>';
    html += '<tr><td style="padding:6px 8px;"></td>' + tags.map(function (t) {
      return '<td style="padding:6px 6px;text-align:center;color:var(--muted);font-weight:600;">' + shortTag[t] + '</td>';
    }).join('') + '</tr>';

    tags.forEach(function (lo) {
      html += '<tr>';
      html += '<td style="padding:6px 8px;color:var(--muted);font-weight:600;white-space:nowrap;">' + shortTag[lo] + ' low</td>';
      tags.forEach(function (hi) {
        var cell = sp.pairs[lo][hi];
        var isSameSession = lo === hi;
        var intensity = maxPct ? cell.pct / maxPct : 0;
        var bg = isSameSession
          ? 'rgba(148,163,184,' + (0.06 + intensity * 0.1) + ')'
          : 'rgba(34,197,94,' + (0.05 + intensity * 0.55) + ')';
        html += '<td title="' + shortTag[lo] + ' low + ' + shortTag[hi] + ' high: ' + cell.pct + '% (n=' + cell.n + ')' + (isSameSession ? ' — same session' : '') + '"' +
          ' style="padding:7px 4px;text-align:center;background:' + bg + ';border:1px solid var(--border);' + (isSameSession ? 'color:var(--muted);' : 'color:var(--text);') + '">' +
          cell.pct + '%</td>';
      });
      html += '</tr>';
    });
    html += '</table></div>';
    html += '<div class="kptp-section-note" style="margin-top:10px;margin-bottom:0;">n=' + sp.n_days + ' days &middot; same-session (diagonal) occurs in ' + sp.same_session_pct + '% of days. Hover any cell for the exact count.</div>';

    container.innerHTML = html;
  }

  // Finer-grained sibling of renderSessionPairHeatmap() -- which specific
  // UTC hour (not just which session) drives the day's high/low pairing.
  // 24x24 is much denser than the 6x6 session table, so cells stay blank
  // when pct is 0 (same convention Yearly's sparse month_pair_distribution
  // table already uses) rather than printing "0.0%" 576 times. See
  // KPT-Market-Profiling/pipeline/stats_engine.py's hour_pair_distribution().
  function renderHourPairHeatmap() {
    var card = document.getElementById('kptp-hour-pair-card');
    var container = document.getElementById('kptp-hour-pair-heatmap');
    var hp = bundle.stats && bundle.stats.daily_hour_pair_distribution;
    if (!card || !container || !hp) return;

    card.hidden = false;
    var hours = [];
    for (var i = 0; i < 24; i++) hours.push(String(i));

    var maxPct = 0;
    hours.forEach(function (lo) { hours.forEach(function (hi) { maxPct = Math.max(maxPct, hp.pairs[lo][hi].pct); }); });

    var html = '<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;font-size:9px;">';
    html += '<tr><td style="padding:3px 4px;"></td>' +
      '<td colspan="24" style="padding:3px 4px;text-align:center;color:var(--muted);font-size:8px;letter-spacing:1px;text-transform:uppercase;">High Hour (UTC) &rarr;</td></tr>';
    html += '<tr><td style="padding:3px 4px;"></td>' + hours.map(function (h) {
      return '<td style="padding:3px 1px;text-align:center;color:var(--muted);font-weight:600;">' + h + '</td>';
    }).join('') + '</tr>';

    hours.forEach(function (lo) {
      html += '<tr>';
      html += '<td style="padding:3px 4px;color:var(--muted);font-weight:600;white-space:nowrap;">' + lo + ' low</td>';
      hours.forEach(function (hi) {
        var cell = hp.pairs[lo][hi];
        var isSameHour = lo === hi;
        var intensity = maxPct ? cell.pct / maxPct : 0;
        var bg = isSameHour
          ? 'rgba(148,163,184,' + (0.06 + intensity * 0.1) + ')'
          : (cell.n > 0 ? 'rgba(34,197,94,' + (0.08 + intensity * 0.6) + ')' : 'transparent');
        html += '<td title="' + lo + ':00 low + ' + hi + ':00 high (UTC): ' + cell.pct + '% (n=' + cell.n + ')' + (isSameHour ? ' — same hour' : '') + '"' +
          ' style="padding:3px 1px;text-align:center;background:' + bg + ';border:1px solid var(--border);' + (isSameHour ? 'color:var(--muted);' : 'color:var(--text);') + '">' +
          (cell.pct > 0 ? cell.pct : '') + '</td>';
      });
      html += '</tr>';
    });
    html += '</table></div>';
    html += '<div class="kptp-section-note" style="margin-top:10px;margin-bottom:0;">n=' + hp.n_days + ' days &middot; same-hour (diagonal) occurs in ' + hp.same_hour_pct + '% of days &middot; cells show %, blank = 0. Hover any cell for the exact count.</div>';

    container.innerHTML = html;
  }

  function buildDial() {
    var dial = document.getElementById('kptp-dial');
    if (!dial) return;
    dial.innerHTML = '';
    WINDOWS.forEach(function (w, i) {
      var btn = document.createElement('button');
      btn.textContent = w.label;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', function () {
        dial.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderRangeSection(w.key);
        renderTimeSection(w.key);
      });
      dial.appendChild(btn);
    });
  }

  // What the shared lookback dial actually affects differs by which
  // granularity tab is showing -- Daily's Range Distribution AND its Time
  // of Extreme heatmaps both respond to it, Weekly/Monthly's Range
  // Distribution alone does, and Yearly ignores it entirely (no slot for
  // it there -- see switchGranularity below). One physical dial node is
  // built once, then relocated (not duplicated) into whichever panel's
  // .kptp-dial-slot is active, right above that panel's Range Distribution
  // section -- avoids both triplicated buttons/listeners and the earlier
  // "sits above everything, implies it affects the taxonomy above it too"
  // placement issue.
  var DIAL_NOTES = {
    daily: 'Lookback window' + kptpGlossaryIcon('lookback_window') + ' &mdash; affects the Range Distribution and Time of Extreme charts below.',
    weekly: 'Lookback window' + kptpGlossaryIcon('lookback_window') + ' &mdash; affects the Weekly Range chart below (not the Day-of-Week extreme charts, which are always full history).',
    monthly: 'Lookback window' + kptpGlossaryIcon('lookback_window') + ' &mdash; affects the Monthly Range chart below (not the Week-of-Month extreme charts, which are always full history).'
  };

  var dialWrap = null; // set by buildGranularitySwitch(), moved by switchGranularity()

  function switchGranularity(gran) {
    panel.querySelectorAll('.kptp-gran-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.gran === gran);
    });
    panel.querySelectorAll('.kptp-gran-panel').forEach(function (p) {
      p.hidden = p.dataset.granPanel !== gran;
    });
    var slot = document.getElementById('kptp-dial-slot-' + gran);
    if (slot && dialWrap) {
      slot.appendChild(dialWrap); // moves the existing node -- click listeners travel with it
      var dialNote = document.getElementById('kptp-dial-note');
      if (dialNote && DIAL_NOTES[gran]) {
        dialNote.innerHTML = DIAL_NOTES[gran];
        kptpAttachGlossaryIcons(dialNote);
      }
    }
    // No slot on the Yearly panel -- dialWrap simply stays parked inside
    // whichever panel it was last moved into, which is now hidden, so it
    // disappears from view with no extra hide/show bookkeeping needed.
  }

  function buildGranularitySwitch() {
    var switcher = document.getElementById('kptp-gran-switch');
    if (!switcher) return;
    dialWrap = document.createElement('div');
    dialWrap.id = 'kptp-dial-wrap';
    dialWrap.innerHTML =
      '<div class="kptp-section-note" id="kptp-dial-note" style="margin-bottom:8px;"></div>' +
      '<div class="kptp-dial" id="kptp-dial"></div>';
    switcher.querySelectorAll('.kptp-gran-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchGranularity(btn.dataset.gran); });
    });
    switchGranularity('daily');
  }

  /* ─── Init ────────────────────────────────────────────────────────────
   * Script is `defer`-loaded, so the DOM is already parsed by the time this
   * runs — no DOMContentLoaded wrapper needed (matches this repo's own
   * macro.js/upload.js convention).
   */
  renderStatTiles();
  buildGranularitySwitch();
  buildDial();
  renderRangeSection('full');
  renderTimeSection('full');
  renderSessionLegend();
  renderSessionPairHeatmap();
  renderHourPairHeatmap();
  renderHourlyActivity();
  renderNfpProfile();
  renderNfpProfileGrid();
  renderNfpExamples();
  renderWeeklyMonthly();
  renderWeekdayPairHeatmap();
  renderWeekOfMonthPairHeatmap();
  renderYearlySection();
  renderYearMonthPairHeatmap();
  renderProfiles();
  renderWeeklyProfiles();
  renderMonthlyProfiles();
  renderYearlyProfiles();

})();
