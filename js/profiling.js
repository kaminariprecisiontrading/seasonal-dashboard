/**
 * profiling.js — Injects the "Profiling" tab panel (Market Profiling &
 * Statistics) on asset pages that have ported data available.
 *
 * Ported/adapted from KPT-Market-Profiling/dashboard/js/dashboard.js — that
 * version assumed it owned the whole page (a static HTML shell pre-declaring
 * ~15 fixed-ID containers). This module instead builds its own
 * <section data-kpt-panel="profiling"> and all inner containers, then runs
 * the same rendering logic against them — so it can sit inside one panel
 * among seven other tabs, injected before .footnote exactly like
 * js/macro.js/js/intraday.js.
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

    '<div class="kptp-section-label">Profile Taxonomy</div>' +
    '<div class="kptp-section-note" id="kptp-profile-summary-note">Rule-based daily profile classification, built from closing strength' + kptpGlossaryIcon('closing_strength') + ' and range regime. Click any card for the full rule, why it&rsquo;s named that way, and a real illustrative chart.</div>' +
    '<div class="kptp-profile-grid" id="kptp-profile-grid"></div>' +

    '<div class="kptp-section-label">Range Distribution</div>' +
    '<div class="kptp-section-note">Daily/weekly/monthly/yearly range percentile' + kptpGlossaryIcon('percentile') + ' strips (p05&ndash;p95), IQR' + kptpGlossaryIcon('iqr') + ' boxed, median' + kptpGlossaryIcon('median') + ' marked. Dashed lines mark the compression' + kptpGlossaryIcon('compression') + ' (p20) / expansion' + kptpGlossaryIcon('expansion') + ' (p80) regime thresholds used by the profile taxonomy below. Hover any part of a chart for an explanation. The lookback window' + kptpGlossaryIcon('lookback_window') + ' affects the daily/weekly/monthly charts &mdash; not the yearly chart, which has only a small sample and always shows full history.</div>' +
    '<div class="kptp-dial" id="kptp-dial"></div>' +

    '<div class="kptp-panel-card">' +
      '<div class="kptp-panel-title">Daily Range</div>' +
      '<div class="kptp-range-strip-wrap"><div id="kptp-range-daily"></div></div>' +
      '<div class="kptp-range-strip-caption" id="kptp-range-daily-caption"></div>' +
      '<div class="kptp-mode-note" id="kptp-range-daily-mode-note"></div>' +
    '</div>' +
    '<div class="kptp-two-col">' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Weekly Range</div>' +
        '<div class="kptp-range-strip-wrap"><div id="kptp-range-weekly"></div></div>' +
        '<div class="kptp-range-strip-caption" id="kptp-range-weekly-caption"></div>' +
        '<div class="kptp-mode-note" id="kptp-range-weekly-mode-note"></div>' +
      '</div>' +
      '<div class="kptp-panel-card">' +
        '<div class="kptp-panel-title">Monthly Range</div>' +
        '<div class="kptp-range-strip-wrap"><div id="kptp-range-monthly"></div></div>' +
        '<div class="kptp-range-strip-caption" id="kptp-range-monthly-caption"></div>' +
        '<div class="kptp-mode-note" id="kptp-range-monthly-mode-note"></div>' +
      '</div>' +
    '</div>' +
    '<div class="kptp-panel-card">' +
      '<div class="kptp-panel-title">Yearly Range</div>' +
      '<div class="kptp-range-strip-wrap"><div id="kptp-range-yearly"></div></div>' +
      '<div class="kptp-range-strip-caption" id="kptp-range-yearly-caption"></div>' +
      '<div class="kptp-mode-note" id="kptp-range-yearly-mode-note"></div>' +
      '<div class="kptp-section-note" id="kptp-range-yearly-sample-note" style="margin-top:10px;margin-bottom:0;"></div>' +
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

    '<div class="kptp-section-label">Weekly, Monthly and Yearly Extremes</div>' +
    '<div class="kptp-section-note">Which weekday the week&rsquo;s high/low falls on; which week-of-month the month&rsquo;s high/low falls on; which calendar month, and which week of the year (ISO week numbering), the year&rsquo;s high/low falls in. Full history &mdash; not affected by the lookback dial above. Hover any bar for the exact count. <span class="kptp-muted-inline">ISO weeks: the week containing each year&rsquo;s first Thursday is Week 1, so a late-December date can land in Week 1 of the following year.</span></div>' +
    '<div class="kptp-two-col">' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Week High &mdash; Day of Week</div><div id="kptp-weekday-high-chart"></div></div>' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Week Low &mdash; Day of Week</div><div id="kptp-weekday-low-chart"></div></div>' +
    '</div>' +
    '<div class="kptp-two-col">' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Month High &mdash; Week of Month</div><div id="kptp-wom-high-chart"></div></div>' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Month Low &mdash; Week of Month</div><div id="kptp-wom-low-chart"></div></div>' +
    '</div>' +
    '<div class="kptp-two-col">' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Year High &mdash; Month</div><div id="kptp-year-high-month-chart"></div></div>' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Year Low &mdash; Month</div><div id="kptp-year-low-month-chart"></div></div>' +
    '</div>' +
    '<div class="kptp-two-col">' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Year High &mdash; Week of Year</div><div id="kptp-year-high-week-chart"></div></div>' +
      '<div class="kptp-panel-card"><div class="kptp-panel-title">Year Low &mdash; Week of Year</div><div id="kptp-year-low-week-chart"></div></div>' +
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

  /* ─── Init ────────────────────────────────────────────────────────────
   * Script is `defer`-loaded, so the DOM is already parsed by the time this
   * runs — no DOMContentLoaded wrapper needed (matches this repo's own
   * macro.js/intraday.js/backtest.js convention).
   */
  renderStatTiles();
  buildDial();
  renderRangeSection('full');
  renderTimeSection('full');
  renderSessionLegend();
  renderWeeklyMonthly();
  renderYearlySection();
  renderProfiles();

})();
