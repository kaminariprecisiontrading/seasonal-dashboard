/**
 * profiling-calendar.js — Powers profiling-calendar/index.html: a month-grid
 * day browser for one Profiling asset (?a=GBPUSD), or, with no `a` param, a
 * cross-asset "all assets on this day" home view.
 *
 * Ported/adapted from KPT-Market-Profiling/dashboard/js/{calendar,
 * calendar-page,calendar-home}.js — merged into one mode-detecting
 * controller (rather than three separate files/pages) since this repo hosts
 * both views behind a single route. Year data files
 * (data/profiling/calendar/<asset>/<year>.js) are loaded on demand via a
 * dynamically injected <script> tag and already assign onto
 * window.KPT_CALENDAR[asset][year] (copied verbatim by
 * scripts/sync_profiling_data.js — the source pipeline already solved the
 * const-vs-window lookup-by-runtime-name problem for this).
 *
 * Depends on: js/profiling-charts.js (glossary, tooltip, KPTP_PROFILE_*).
 */

/* ─── Shared grid-rendering + data-loading module ────────────────────────
 * (kept as its own object, KPTPCalendar, so it stays reusable if a future
 * page wants just the grid without this file's page-controller half.)
 */
var KPTPCalendar = (function () {
  var DATA_BASE = '../data/profiling/calendar';
  var loadedScripts = {};

  function loadScript(src) {
    if (loadedScripts[src]) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = function () { loadedScripts[src] = true; resolve(); };
      script.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(script);
    });
  }

  function loadManifest(assetKey) {
    if (window.KPT_CALENDAR_YEARS && window.KPT_CALENDAR_YEARS[assetKey]) {
      return Promise.resolve(window.KPT_CALENDAR_YEARS[assetKey]);
    }
    return loadScript(DATA_BASE + '/' + assetKey.toLowerCase() + '/manifest.js')
      .then(function () { return (window.KPT_CALENDAR_YEARS && window.KPT_CALENDAR_YEARS[assetKey]) || []; });
  }

  function loadYear(assetKey, year) {
    if (window.KPT_CALENDAR && window.KPT_CALENDAR[assetKey] && window.KPT_CALENDAR[assetKey][year]) {
      return Promise.resolve();
    }
    return loadScript(DATA_BASE + '/' + assetKey.toLowerCase() + '/' + year + '.js');
  }

  function getDay(assetKey, dateStr) {
    var year = dateStr.slice(0, 4);
    return (window.KPT_CALENDAR && window.KPT_CALENDAR[assetKey] && window.KPT_CALENDAR[assetKey][year])
      ? (window.KPT_CALENDAR[assetKey][year][dateStr] || null)
      : null;
  }

  var WEEKDAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function daysInMonth(year, month) { return new Date(year, month, 0).getDate(); }
  function firstWeekdayMon0(year, month) {
    var jsDay = new Date(year, month - 1, 1).getDay();
    return (jsDay + 6) % 7;
  }

  // opts: { year, month (1-12), assetKey, onDayClick(dateStr, record), colorFn(record) }
  function renderMonthGrid(container, opts) {
    container.innerHTML = '';
    var grid = document.createElement('div');
    grid.className = 'kptp-calendar-grid';

    WEEKDAY_HEADERS.forEach(function (h) {
      var cell = document.createElement('div');
      cell.className = 'kptp-calendar-header-cell';
      cell.textContent = h;
      grid.appendChild(cell);
    });

    var leading = firstWeekdayMon0(opts.year, opts.month);
    for (var i = 0; i < leading; i++) grid.appendChild(document.createElement('div'));

    var nDays = daysInMonth(opts.year, opts.month);
    for (var day = 1; day <= nDays; day++) {
      var dateStr = opts.year + '-' + String(opts.month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      var rec = getDay(opts.assetKey, dateStr);
      var cell = document.createElement('div');
      cell.className = 'kptp-calendar-cell';

      if (rec && !rec.is_data_gap) {
        var color = opts.colorFn ? opts.colorFn(rec) : (KPTP_PROFILE_COLOR[rec.profile] || 'var(--muted)');
        cell.style.setProperty('--cell-color', color);
        cell.classList.add('has-data');
        cell.innerHTML = '<span class="kptp-calendar-day-num">' + day + '</span>';
        cell.title = rec.profile + ' — ' + rec.range_pips + ' pips';
        cell.addEventListener('click', function (dateStr, rec) { return function () { opts.onDayClick(dateStr, rec); }; }(dateStr, rec));
      } else if (rec && rec.is_data_gap) {
        cell.classList.add('is-gap');
        cell.innerHTML = '<span class="kptp-calendar-day-num">' + day + '</span>';
        cell.title = 'Data-gap day (feed outage / no trading)';
      } else {
        cell.classList.add('no-data');
        cell.innerHTML = '<span class="kptp-calendar-day-num">' + day + '</span>';
      }
      grid.appendChild(cell);
    }

    container.appendChild(grid);
  }

  return { loadManifest: loadManifest, loadYear: loadYear, getDay: getDay, daysInMonth: daysInMonth, firstWeekdayMon0: firstWeekdayMon0, renderMonthGrid: renderMonthGrid, WEEKDAY_HEADERS: WEEKDAY_HEADERS, MONTH_NAMES: MONTH_NAMES };
})();

/* ─── Page controller ─────────────────────────────────────────────────── */
(function () {
  // Reverse of profiling.js's ASSET_MAP — which seasonal-dashboard page(s)
  // link back to each Profiling asset. Extend when Phase B adds an asset.
  var ASSET_PAGES = {
    GBPUSD: [{ id: 'gbp', label: 'GBP Futures' }, { id: 'fx-gbpusd', label: 'GBPUSD FX' }],
    EURUSD: [{ id: 'eur', label: 'EUR Futures' }, { id: 'fx-eurusd', label: 'EURUSD FX' }]
  };

  var params = new URLSearchParams(window.location.search);
  var assetParam = params.get('a');
  var isHome = !assetParam;
  var ASSETS = isHome ? Object.keys(ASSET_PAGES) : [assetParam.toUpperCase()];
  var primary = ASSETS[0];

  var state = { year: null, month: 12 };

  function weekdayName(dateStr) {
    var d = new Date(dateStr + 'T00:00:00Z');
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getUTCDay()];
  }

  function assetColumnHtml(assetKey, rec) {
    var label = isHome ? assetKey : null;
    if (!rec) {
      return label ? ('<div><div class="kptp-calendar-context-label">' + assetKey + '</div><div class="kptp-section-note" style="margin:0;">No data for this date.</div></div>') : '<div class="kptp-section-note" style="margin:0;">No data for this date.</div>';
    }
    if (rec.is_data_gap) {
      return (label ? ('<div class="kptp-calendar-context-label">' + assetKey + '</div>') : '') + '<div class="kptp-section-note" style="margin:0;">Data-gap day (feed outage / no trading).</div>';
    }
    var slug = kptpProfileSlug(rec.profile);
    return (label ? ('<div class="kptp-calendar-context-label">' + assetKey + '</div>') : '') +
      '<div class="kptp-calendar-detail-row"><span>Profile</span><a href="../profiling-profiles/detail.html?p=' + slug + '&a=' + assetKey.toLowerCase() + '" class="kptp-profile-link" style="--card-accent:' + (KPTP_PROFILE_COLOR[rec.profile] || 'var(--muted)') + '">' + kptpProfileIconSvg(rec.profile, 20) + ' ' + rec.profile + '</a></div>' +
      '<div class="kptp-calendar-detail-row"><span>Open / Close</span><b>' + rec.open + ' / ' + rec.close + '</b></div>' +
      '<div class="kptp-calendar-detail-row"><span>High / Low</span><b>' + rec.high + ' / ' + rec.low + '</b></div>' +
      '<div class="kptp-calendar-detail-row"><span>Daily Range</span><b>' + rec.range_pips + ' pips</b></div>' +
      '<div class="kptp-calendar-detail-row"><span>High Time</span><b>' + rec.high_time + ' UTC</b> <span class="kptp-muted-inline">(' + rec.high_session.replace(/_/g, ' ') + ')</span></div>' +
      '<div class="kptp-calendar-detail-row"><span>Low Time</span><b>' + rec.low_time + ' UTC</b> <span class="kptp-muted-inline">(' + rec.low_session.replace(/_/g, ' ') + ')</span></div>' +
      '<div class="kptp-calendar-detail-row"><span>Week Range</span><b>' + rec.week.range_pips + ' pips</b></div>' +
      '<div class="kptp-calendar-detail-row"><span>Month Range</span><b>' + rec.month.range_pips + ' pips</b></div>';
  }

  function renderDetail(dateStr) {
    var panel = document.getElementById('kptp-calendar-detail');
    panel.style.display = 'block';
    Promise.all(ASSETS.map(function (a) { return KPTPCalendar.loadYear(a, dateStr.slice(0, 4)); })).then(function () {
      var cols = ASSETS.map(function (a) { return '<div>' + assetColumnHtml(a, KPTPCalendar.getDay(a, dateStr)) + '</div>'; }).join('');
      panel.innerHTML = '<div class="kptp-panel-title">' + dateStr + ' &middot; ' + weekdayName(dateStr) + '</div><div class="kptp-two-col">' + cols + '</div>';
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function renderGrid() {
    var container = document.getElementById('kptp-calendar-grid');
    KPTPCalendar.renderMonthGrid(container, {
      year: state.year, month: state.month, assetKey: primary,
      onDayClick: renderDetail
    });
    document.getElementById('kptp-cal-label').textContent = KPTPCalendar.MONTH_NAMES[state.month - 1] + ' ' + state.year;
  }

  function goToMonth(year, month) {
    if (month < 1) { month = 12; year -= 1; }
    if (month > 12) { month = 1; year += 1; }
    state = { year: year, month: month };
    Promise.all(ASSETS.map(function (a) { return KPTPCalendar.loadYear(a, year); })).then(renderGrid);
  }

  function buildSelectors(years) {
    var yearSelect = document.getElementById('kptp-cal-year-select');
    yearSelect.innerHTML = years.map(function (y) { return '<option value="' + y + '">' + y + '</option>'; }).join('');
    yearSelect.value = state.year;
    yearSelect.addEventListener('change', function () { goToMonth(Number(yearSelect.value), state.month); });

    var monthSelect = document.getElementById('kptp-cal-month-select');
    monthSelect.innerHTML = KPTPCalendar.MONTH_NAMES.map(function (m, i) { return '<option value="' + (i + 1) + '">' + m + '</option>'; }).join('');
    monthSelect.value = state.month;
    monthSelect.addEventListener('change', function () { goToMonth(state.year, Number(monthSelect.value)); });

    document.getElementById('kptp-cal-prev').addEventListener('click', function () {
      goToMonth(state.year, state.month - 1);
      yearSelect.value = state.year; monthSelect.value = state.month;
    });
    document.getElementById('kptp-cal-next').addEventListener('click', function () {
      goToMonth(state.year, state.month + 1);
      yearSelect.value = state.year; monthSelect.value = state.month;
    });
  }

  function renderLegend() {
    var legend = document.getElementById('kptp-calendar-legend');
    legend.innerHTML = Object.keys(KPTP_PROFILE_COLOR).map(function (name) {
      return '<span><span class="kptp-dot" style="background:' + KPTP_PROFILE_COLOR[name] + '"></span>' + name + '</span>';
    }).join('');
  }

  function renderBackLinks() {
    var wrap = document.getElementById('kptp-back-links');
    if (!wrap) return;
    var pages = ASSET_PAGES[primary] || [];
    wrap.innerHTML = pages.map(function (p) {
      return '<a class="kptp-calendar-nav-btn" style="width:auto;padding:0 12px;font-size:10px;" href="../assets/' + p.id + '.html">' + p.label + ' &rarr;</a>';
    }).join(' ');
  }

  function init() {
    document.getElementById('kptp-calendar-title').textContent = isHome ? 'Calendar' : (primary + ' Calendar');
    document.getElementById('kptp-calendar-sub').textContent = isHome
      ? 'All Profiling assets, one date at a time — grid colored by ' + primary + '’s profile'
      : 'Pick a date to see that day’s, week’s, and month’s stats';
    renderBackLinks();

    KPTPCalendar.loadManifest(primary).then(function (years) {
      if (!years.length) {
        document.getElementById('kptp-calendar-root').innerHTML = '<div class="kptp-section-note">No Profiling calendar data available for ' + primary + ' yet.</div>';
        return;
      }
      state.year = years[years.length - 1];
      state.month = 12;
      buildSelectors(years);
      renderLegend();
      Promise.all(ASSETS.map(function (a) { return KPTPCalendar.loadYear(a, state.year); })).then(renderGrid);
    });
  }

  init();
})();
