/**
 * profiling-compare.js — Controller for profiling-profiles/compare.html
 * (?p=<slug>&a=<focus-assetkey>&assets=key1,key2,...). Lets the user pick up
 * to 10 Profiling assets and see this profile's stats + example day for each,
 * side by side.
 *
 * Replaces the earlier inline "Compare across all assets" toggle on
 * profiling-profiles/detail.html, which rendered every known asset inline —
 * fine at 2 assets, but doesn't scale as more are added (Phase B rollout,
 * eventually synthetics/crypto). See docs/PLATFORM_ROADMAP.md Tier 2.
 *
 * The asset list is read from window.KPT_PROFILING_META (data/profiling/
 * manifest.js, written by scripts/sync_profiling_data.js) rather than
 * hardcoded here — adding a new Profiling asset makes it appear in the
 * picker automatically, no change to this file required. Each selected
 * asset's actual stats/examples data loads on demand via
 * KPTPData.loadAsset() (js/profiling-charts.js) — only the picked assets'
 * data is ever fetched, not all of them.
 *
 * Depends on: js/profiling-charts.js (KPTPData, KPTPCharts, glossary,
 * profile-meta helpers), data/profiling/manifest.js.
 */
(function () {
  var MAX_SELECT = 10;
  var DATA_BASE = '../data/profiling';

  function init() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('p');

    var slugMap = {};
    Object.keys(KPTP_PROFILE_META).forEach(function (n) { slugMap[kptpProfileSlug(n)] = n; });
    var name = slugMap[slug];

    if (!name) {
      document.getElementById('kptp-compare-root').innerHTML =
        '<div class="kptp-section-note">Unknown profile "' + (slug || '') + '". <a href="../index.html">Back to dashboard</a>.</div>';
      return;
    }

    document.title = 'Compare ' + name + ' — Kaminari Precision Trading';
    document.getElementById('kptp-compare-title').textContent = 'Compare: ' + name;
    document.getElementById('kptp-compare-icon').innerHTML = kptpProfileIconSvg(name, 90);
    document.documentElement.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
    var examplesLabel = document.getElementById('kptp-compare-examples-label');
    if (examplesLabel) examplesLabel.textContent = kptpIsYearlyProfile(name) ? 'Example Years' : kptpIsMonthlyProfile(name) ? 'Example Months' : kptpIsWeeklyProfile(name) ? 'Example Weeks' : 'Example Days';

    var focusAssetKey = (params.get('a') || '').toLowerCase();
    var backLink = document.getElementById('kptp-compare-back');
    backLink.href = 'detail.html?p=' + slug + (focusAssetKey ? ('&a=' + focusAssetKey) : '');
    backLink.textContent = focusAssetKey ? ('← Back to ' + focusAssetKey.toUpperCase()) : '← Back to profile';

    var availableKeys = (window.KPT_PROFILING_META ? Object.keys(window.KPT_PROFILING_META) : []).sort();

    if (!availableKeys.length) {
      document.getElementById('kptp-asset-picker').innerHTML = '<div class="kptp-section-note">No Profiling assets available yet.</div>';
      return;
    }

    var fromParam = params.get('assets');
    var selected = fromParam
      ? fromParam.split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(function (k) { return availableKeys.indexOf(k) !== -1; })
      : [];
    if (!selected.length && focusAssetKey && availableKeys.indexOf(focusAssetKey) !== -1) selected.push(focusAssetKey);
    if (!selected.length) selected = availableKeys.slice(0, 2);
    selected = selected.slice(0, MAX_SELECT);

    function updateUrl() {
      var url = new URL(window.location.href);
      url.searchParams.set('assets', selected.join(','));
      window.history.replaceState(null, '', url);
    }

    function renderPicker() {
      var wrap = document.getElementById('kptp-asset-picker');
      wrap.innerHTML = availableKeys.map(function (key) {
        var active = selected.indexOf(key) !== -1;
        var atCap = !active && selected.length >= MAX_SELECT;
        return '<button type="button" class="kptp-profile-nav-pill' + (active ? ' active' : '') + '"' +
          (atCap ? ' disabled style="opacity:0.35;cursor:not-allowed;"' : '') +
          ' data-key="' + key + '" style="--pill-accent:var(--accent-combined);">' + key.toUpperCase() + '</button>';
      }).join('');
      wrap.querySelectorAll('button[data-key]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.dataset.key;
          var idx = selected.indexOf(key);
          if (idx !== -1) {
            if (selected.length === 1) return; // keep at least one selected
            selected.splice(idx, 1);
          } else {
            if (selected.length >= MAX_SELECT) return;
            selected.push(key);
          }
          onSelectionChange();
        });
      });
      var countEl = document.getElementById('kptp-compare-count');
      if (countEl) countEl.textContent = '(' + selected.length + ' / ' + MAX_SELECT + ' selected)';
    }

    function renderComparison() {
      var statsWrap = document.getElementById('kptp-compare-stats');
      var chartsWrap = document.getElementById('kptp-compare-charts');
      statsWrap.innerHTML = '';
      chartsWrap.innerHTML = '';

      var isYearly = kptpIsYearlyProfile(name);
      var isMonthly = !isYearly && kptpIsMonthlyProfile(name);
      var isWeekly = !isYearly && !isMonthly && kptpIsWeeklyProfile(name);
      var isCoarser = isYearly || isMonthly || isWeekly;
      var periodWord = isYearly ? 'years' : isMonthly ? 'months' : isWeekly ? 'weeks' : 'days';
      var patternWord = isYearly ? 'month-pattern' : isMonthly ? 'week-pattern' : 'day-pattern';
      var granularityLabel = isYearly ? 'Yearly' : isMonthly ? 'Monthly' : 'Weekly';
      var bundleKey = isYearly ? 'yearly' : isMonthly ? 'monthly' : isWeekly ? 'weekly' : 'profiles';

      selected.forEach(function (key) {
        var d = window.KPT_PROFILING && window.KPT_PROFILING[key];
        var ex = window.KPT_PROFILING_EXAMPLES && window.KPT_PROFILING_EXAMPLES[key];
        var label = key.toUpperCase();
        var source = d && d[bundleKey];

        var dist  = source && source.profile_distribution[name];
        var range = source && source.avg_range_pips_by_profile[name];
        var unit = (d && d.stats && d.stats.unit) || 'pips';
        var timing = source && source.extreme_timing_by_profile[name];
        var timingEntries = timing ? Object.keys(timing).map(function (k) { return [k, timing[k]]; }).sort(function (x, y) { return y[1] - x[1]; }) : null;
        var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;
        var spread = (isCoarser && source) ? source.extreme_spread_by_profile[name] : null;
        var spreadEntries = spread ? Object.keys(spread).map(function (k) { return [k, spread[k]]; }).sort(function (x, y) { return y[1] - x[1]; }) : null;
        var topSpread = spreadEntries && spreadEntries.length ? spreadEntries[0] : null;
        var smallSampleNote = (isYearly && source)
          ? '<div class="kptp-section-note" style="margin:6px 0 0;color:var(--muted);font-size:10px;">n=' + source.n_labeled_years + ' classified years total &mdash; weak signal.</div>'
          : '';

        var tile = document.createElement('div');
        tile.className = 'kptp-stat-tile';
        tile.innerHTML = !dist
          ? '<div class="kptp-stat-label">' + label + '</div><div class="kptp-stat-value" style="font-size:14px;color:var(--muted)">No ' + (source ? periodWord : (granularityLabel + ' Profile data yet for ' + label)) + (source ? ' classified as this profile' : '') + '</div>' + smallSampleNote
          : '<div class="kptp-stat-label">' + label + '</div>' +
            '<div class="kptp-stat-value">' + dist.pct + '<span class="kptp-unit">% of ' + periodWord + ' (n=' + dist.n + ')</span></div>' +
            '<div class="kptp-profile-meta" style="margin-top:8px;">' +
              (range ? ('Avg range: <b>' + range.mean + ' ' + unit + '</b><br>') : '') +
              (topTiming ? ('Most common timing: <b>' + topTiming[0].replace('_', ' ') + '</b> (' + topTiming[1] + ' ' + periodWord + ')') : '') +
              (topSpread ? ('<br>Most common ' + patternWord + ': <b>' + topSpread[0].replace('_', ' ') + '</b> (' + topSpread[1] + ' ' + periodWord + ')') : '') +
            '</div>' + smallSampleNote;
        statsWrap.appendChild(tile);

        var example = (!isCoarser && ex) ? ex[name] : null;
        var panel = document.createElement('div');
        panel.className = 'kptp-panel-card';
        if (isCoarser) {
          panel.innerHTML = '<div class="kptp-panel-title">' + label + ' Example</div><div class="kptp-section-note" style="margin:0;">Illustrative ' + granularityLabel.toLowerCase() + ' charts aren&rsquo;t built yet.</div>';
        } else if (!example) {
          panel.innerHTML = '<div class="kptp-panel-title">' + label + ' Example</div><div class="kptp-section-note" style="margin:0;">No example day available.</div>';
        } else {
          panel.innerHTML =
            '<div class="kptp-panel-title">' + label + ' Example &mdash; ' + example.date + '</div>' +
            '<div id="kptp-cmp-candlestick-' + key + '"></div>' +
            '<div class="kptp-section-note" style="margin:10px 0 0;">A real historical day picked as a typical example of this profile &mdash; its range is close to this profile’s own average, not a cherry-picked extreme. M15 candles, UTC.</div>';
        }
        chartsWrap.appendChild(panel);
        if (example) KPTPCharts.renderCandlestick(document.getElementById('kptp-cmp-candlestick-' + key), example.bars);
      });

      kptpAttachGlossaryIcons();
    }

    function onSelectionChange() {
      updateUrl();
      renderPicker();
      document.getElementById('kptp-compare-stats').innerHTML = '<div class="kptp-section-note">Loading&hellip;</div>';
      document.getElementById('kptp-compare-charts').innerHTML = '';
      Promise.all(selected.map(function (key) { return KPTPData.loadAsset(key, DATA_BASE); }))
        .then(renderComparison)
        .catch(function (err) {
          document.getElementById('kptp-compare-stats').innerHTML = '<div class="kptp-section-note">Error loading data: ' + err.message + '</div>';
        });
    }

    renderPicker();
    onSelectionChange();
  }

  init();
})();
