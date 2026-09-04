/**
 * profiling-profile-detail.js — Controller for profiling-profiles/detail.html
 * (?p=<slug>&a=<assetkey>). Renders one profile's rule/why/timing copy,
 * cross-asset stats, and a real illustrative candlestick example per asset.
 *
 * Ported/adapted from KPT-Market-Profiling/dashboard/js/profile-detail.js.
 * The source needed a "reference the bare identifier, not window.X" workaround
 * because its data files were plain `const X = {...}` (see its own comment,
 * and market-profiling-system-spec.md §5.3). This repo's ported data
 * (scripts/sync_profiling_data.js) already assigns onto window.KPT_PROFILING /
 * window.KPT_PROFILING_EXAMPLES, so that workaround isn't needed here.
 *
 * Depends on: js/profiling-charts.js. Add to ASSETS below as Phase B adds
 * more Profiling assets.
 */
(function () {
  var ASSETS = [
    { key: 'gbpusd', label: 'GBPUSD' },
    { key: 'eurusd', label: 'EURUSD' }
  ];

  function dataFor(key) { return window.KPT_PROFILING && window.KPT_PROFILING[key]; }
  function examplesFor(key) { return window.KPT_PROFILING_EXAMPLES && window.KPT_PROFILING_EXAMPLES[key]; }

  function slugToName() {
    var map = {};
    Object.keys(KPTP_PROFILE_META).forEach(function (name) { map[kptpProfileSlug(name)] = name; });
    return map;
  }

  function renderHeader(name) {
    document.title = name + ' — Kaminari Precision Trading';
    document.getElementById('kptp-profile-title').textContent = name;
    document.getElementById('kptp-profile-icon-large').innerHTML = kptpProfileIconSvg(name, 90);
    document.documentElement.style.setProperty('--card-accent', KPTP_PROFILE_COLOR[name] || 'var(--muted)');
  }

  function renderDescription(name) {
    var meta = KPTP_PROFILE_META[name];
    if (!meta) return;
    document.getElementById('kptp-profile-rule').innerHTML = meta.rule;
    document.getElementById('kptp-profile-why').innerHTML = meta.why;
    document.getElementById('kptp-profile-timing').innerHTML = meta.timingSignature;
    document.getElementById('kptp-profile-axis-range').textContent = meta.axisRange;
    document.getElementById('kptp-profile-axis-shape').textContent = meta.axisShape;
  }

  function renderCrossAssetStats(name) {
    var wrap = document.getElementById('kptp-cross-asset-stats');
    wrap.innerHTML = '';
    ASSETS.forEach(function (a) {
      var d = dataFor(a.key);
      if (!d) return;
      var dist = d.profiles.profile_distribution[name];
      var range = d.profiles.avg_range_pips_by_profile[name];
      var timing = d.profiles.extreme_timing_by_profile[name];
      var timingEntries = timing ? Object.keys(timing).map(function (k) { return [k, timing[k]]; }).sort(function (x, y) { return y[1] - x[1]; }) : null;
      var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;
      var div = document.createElement('div');
      div.className = 'kptp-stat-tile';
      if (!dist) {
        div.innerHTML = '<div class="kptp-stat-label">' + a.label + '</div><div class="kptp-stat-value" style="font-size:14px;color:var(--muted)">No days classified as this profile</div>';
      } else {
        div.innerHTML =
          '<div class="kptp-stat-label">' + a.label + '</div>' +
          '<div class="kptp-stat-value">' + dist.pct + '<span class="kptp-unit">% of days (n=' + dist.n + ')</span></div>' +
          '<div class="kptp-profile-meta" style="margin-top:8px;">' +
            (range ? ('Avg range: <b>' + range.mean + ' pips</b><br>') : '') +
            (topTiming ? ('Most common timing: <b>' + topTiming[0].replace('_', ' ') + '</b> (' + topTiming[1] + ' days)') : '') +
          '</div>';
      }
      wrap.appendChild(div);
    });
  }

  function renderExampleCharts(name) {
    var wrap = document.getElementById('kptp-example-charts');
    wrap.innerHTML = '';
    ASSETS.forEach(function (a) {
      var ex = examplesFor(a.key);
      var panel = document.createElement('div');
      panel.className = 'kptp-panel-card';
      var example = ex ? ex[name] : null;
      if (!example) {
        panel.innerHTML = '<div class="kptp-panel-title">' + a.label + ' Example</div><div class="kptp-section-note" style="margin:0;">No example day available.</div>';
        wrap.appendChild(panel);
        return;
      }
      panel.innerHTML =
        '<div class="kptp-panel-title">' + a.label + ' Example &mdash; ' + example.date + '</div>' +
        '<div id="kptp-candlestick-' + a.key + '"></div>' +
        '<div class="kptp-section-note" style="margin:10px 0 0;">A real historical day picked as a typical example of this profile &mdash; its range is close to this profile’s own average, not a cherry-picked extreme. M15 candles, UTC. Hover any candle for its OHLC values.</div>';
      wrap.appendChild(panel);
      KPTPCharts.renderCandlestick(document.getElementById('kptp-candlestick-' + a.key), example.bars);
    });
  }

  // Featured single-asset view (arriving with ?a=<assetkey>, e.g. clicked
  // from that asset's own Profiling tab). Renders the same stat-tile +
  // candlestick content renderCrossAssetStats()/renderExampleCharts()
  // produce for one asset, but prominently, above the (now-collapsed)
  // full cross-asset comparison — see docs/PLATFORM_ROADMAP.md Tier 2.
  function renderFeaturedAsset(name, focusAsset) {
    var wrap = document.getElementById('kptp-featured-asset');
    if (!wrap) return;
    var d = dataFor(focusAsset.key);
    var ex = examplesFor(focusAsset.key);
    var dist = d && d.profiles.profile_distribution[name];
    var range = d && d.profiles.avg_range_pips_by_profile[name];
    var timing = d && d.profiles.extreme_timing_by_profile[name];
    var timingEntries = timing ? Object.keys(timing).map(function (k) { return [k, timing[k]]; }).sort(function (x, y) { return y[1] - x[1]; }) : null;
    var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;
    var example = ex ? ex[name] : null;

    var statHtml = !dist
      ? '<div class="kptp-stat-value" style="font-size:16px;color:var(--muted)">No ' + focusAsset.label + ' days classified as this profile</div>'
      : '<div class="kptp-stat-value">' + dist.pct + '<span class="kptp-unit">% of days (n=' + dist.n + ')</span></div>' +
        '<div class="kptp-profile-meta" style="margin-top:8px;">' +
          (range ? ('Avg range: <b>' + range.mean + ' pips</b><br>') : '') +
          (topTiming ? ('Most common timing: <b>' + topTiming[0].replace('_', ' ') + '</b> (' + topTiming[1] + ' days)') : '') +
        '</div>';

    wrap.innerHTML =
      '<div class="kptp-section-label">' + focusAsset.label + ' &mdash; This Profile</div>' +
      '<div class="kptp-section-note">' + focusAsset.label + '’s own history for this profile. See it in action below, or compare against every other Profiling asset further down.</div>' +
      '<div class="kptp-panel-card"><div class="kptp-stat-label">' + focusAsset.label + '</div>' + statHtml + '</div>' +
      (example
        ? '<div class="kptp-panel-card">' +
            '<div class="kptp-panel-title">' + focusAsset.label + ' Example &mdash; ' + example.date + '</div>' +
            '<div id="kptp-candlestick-featured"></div>' +
            '<div class="kptp-section-note" style="margin:10px 0 0;">A real historical day picked as a typical example of this profile &mdash; its range is close to this profile’s own average, not a cherry-picked extreme. M15 candles, UTC. Hover any candle for its OHLC values.</div>' +
          '</div>'
        : '<div class="kptp-panel-card"><div class="kptp-panel-title">' + focusAsset.label + ' Example</div><div class="kptp-section-note" style="margin:0;">No example day available.</div></div>');

    if (example) KPTPCharts.renderCandlestick(document.getElementById('kptp-candlestick-featured'), example.bars);
  }

  // Collapsed-by-default toggle around the cross-asset comparison section,
  // shown only in featured (asset-focused) mode — general/no-`a` mode leaves
  // the comparison always visible, unchanged from before this feature.
  function renderCompareToggle() {
    var toggleWrap = document.getElementById('kptp-compare-toggle');
    var section = document.getElementById('kptp-compare-section');
    if (!toggleWrap || !section) return;
    section.style.display = 'none';
    var btn = document.createElement('button');
    btn.className = 'kptp-calendar-nav-btn';
    btn.style.cssText = 'width:auto;padding:8px 16px;font-size:11px;margin-bottom:20px;';
    btn.textContent = 'Compare across all assets →';
    btn.addEventListener('click', function () {
      var showing = section.style.display !== 'none';
      section.style.display = showing ? 'none' : '';
      btn.textContent = showing ? 'Compare across all assets →' : 'Hide cross-asset comparison';
    });
    toggleWrap.appendChild(btn);
  }

  function renderAllProfilesNav(currentName) {
    var nav = document.getElementById('kptp-all-profiles-nav');
    if (!nav) return;
    var aParam = new URLSearchParams(window.location.search).get('a');
    var suffix = aParam ? ('&a=' + aParam) : '';
    nav.innerHTML = Object.keys(KPTP_PROFILE_META).map(function (name) {
      var active = name === currentName ? ' active' : '';
      return '<a class="kptp-profile-nav-pill' + active + '" href="detail.html?p=' + kptpProfileSlug(name) + suffix + '" style="--pill-accent:' + (KPTP_PROFILE_COLOR[name] || 'var(--muted)') + '">' + name + '</a>';
    }).join('');
  }

  function init() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('p');
    var name = slugToName()[slug];

    if (!name) {
      document.getElementById('kptp-profile-detail-root').innerHTML =
        '<div class="kptp-section-note">Unknown profile "' + (slug || '') + '". <a href="../index.html">Back to dashboard</a>.</div>';
      return;
    }

    var aParam = (params.get('a') || '').toLowerCase();
    var focusAsset = ASSETS.filter(function (a) { return a.key === aParam; })[0] || null;

    renderHeader(name);
    renderDescription(name);
    renderCrossAssetStats(name);
    renderExampleCharts(name);
    renderAllProfilesNav(name);

    if (focusAsset) {
      renderFeaturedAsset(name, focusAsset);
      renderCompareToggle();
    }

    kptpAttachGlossaryIcons();
  }

  init();
})();
