/**
 * profiling-profile-detail.js — Controller for profiling-profiles/detail.html
 * (?p=<slug>&a=<assetkey>). Renders one profile's rule/why/timing copy, and
 * — when arriving from a specific asset's Profiling tab (?a=<key>) — that
 * asset's own stats and a real illustrative candlestick example.
 *
 * Cross-asset comparison lives on the separate profiling-profiles/compare.html
 * page now, not inline here — with only 2 Profiling assets this page used to
 * render every known asset inline behind a toggle, which doesn't scale as
 * more assets are added (Phase B rollout). See docs/PLATFORM_ROADMAP.md
 * Tier 2 and js/profiling-compare.js.
 *
 * Loads only the focused asset's data on demand via KPTPData.loadAsset()
 * (js/profiling-charts.js) — no hardcoded per-asset <script> tags on this
 * page, and no hardcoded asset list in this file, so adding a new Profiling
 * asset needs zero changes here.
 *
 * Depends on: js/profiling-charts.js.
 */
(function () {
  var DATA_BASE = '../data/profiling';

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
    var subtitle = document.getElementById('kptp-profile-subtitle');
    if (subtitle) subtitle.textContent = 'Rule-based ' + (kptpIsWeeklyProfile(name) ? 'weekly' : 'daily') + ' profile · Market Profiling';
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

  // Single-asset stats + example, shown when arriving with ?a=<assetkey>.
  function renderFeaturedAsset(name, assetKey) {
    var wrap = document.getElementById('kptp-featured-asset');
    if (!wrap) return;
    var label = assetKey.toUpperCase();
    var d  = window.KPT_PROFILING && window.KPT_PROFILING[assetKey];
    var ex = window.KPT_PROFILING_EXAMPLES && window.KPT_PROFILING_EXAMPLES[assetKey];

    if (!d) {
      wrap.innerHTML = '<div class="kptp-section-note">No Profiling data available for ' + label + '.</div>';
      return;
    }

    var isWeekly = kptpIsWeeklyProfile(name);
    var source = isWeekly ? d.weekly : d.profiles;
    var periodWord = isWeekly ? 'weeks' : 'days';

    if (isWeekly && !source) {
      wrap.innerHTML = '<div class="kptp-section-label">' + label + ' &mdash; This Profile</div>' +
        '<div class="kptp-section-note">No Weekly Profile data available yet for ' + label + '.</div>';
      return;
    }

    var dist = source.profile_distribution[name];
    var range = source.avg_range_pips_by_profile[name];
    var unit = (d.stats && d.stats.unit) || 'pips';
    var timing = source.extreme_timing_by_profile[name];
    var timingEntries = timing ? Object.keys(timing).map(function (k) { return [k, timing[k]]; }).sort(function (x, y) { return y[1] - x[1]; }) : null;
    var topTiming = timingEntries && timingEntries.length ? timingEntries[0] : null;
    // extreme_spread has no Daily analog -- only present on the weekly bundle.
    var spread = isWeekly ? source.extreme_spread_by_profile[name] : null;
    var spreadEntries = spread ? Object.keys(spread).map(function (k) { return [k, spread[k]]; }).sort(function (x, y) { return y[1] - x[1]; }) : null;
    var topSpread = spreadEntries && spreadEntries.length ? spreadEntries[0] : null;
    var example = (!isWeekly && ex) ? ex[name] : null;

    var statHtml = !dist
      ? '<div class="kptp-stat-value" style="font-size:16px;color:var(--muted)">No ' + label + ' ' + periodWord + ' classified as this profile</div>'
      : '<div class="kptp-stat-value">' + dist.pct + '<span class="kptp-unit">% of ' + periodWord + ' (n=' + dist.n + ')</span></div>' +
        '<div class="kptp-profile-meta" style="margin-top:8px;">' +
          (range ? ('Avg range: <b>' + range.mean + ' ' + unit + '</b><br>') : '') +
          (topTiming ? ('Most common timing: <b>' + topTiming[0].replace('_', ' ') + '</b> (' + topTiming[1] + ' ' + periodWord + ')') : '') +
          (topSpread ? ('<br>Most common day-pattern: <b>' + topSpread[0].replace('_', ' ') + '</b> (' + topSpread[1] + ' ' + periodWord + ')') : '') +
        '</div>';

    var exampleHtml;
    if (isWeekly) {
      exampleHtml = '<div class="kptp-panel-card"><div class="kptp-panel-title">' + label + ' Example</div>' +
        '<div class="kptp-section-note" style="margin:0;">Illustrative weekly charts aren&rsquo;t built yet &mdash; only Daily profiles have a real example chart today.</div></div>';
    } else if (example) {
      exampleHtml = '<div class="kptp-panel-card">' +
          '<div class="kptp-panel-title">' + label + ' Example &mdash; ' + example.date + '</div>' +
          '<div id="kptp-candlestick-featured"></div>' +
          '<div class="kptp-section-note" style="margin:10px 0 0;">A real historical day picked as a typical example of this profile &mdash; its range is close to this profile’s own average, not a cherry-picked extreme. M15 candles, UTC. Hover any candle for its OHLC values.</div>' +
        '</div>';
    } else {
      exampleHtml = '<div class="kptp-panel-card"><div class="kptp-panel-title">' + label + ' Example</div><div class="kptp-section-note" style="margin:0;">No example day available.</div></div>';
    }

    wrap.innerHTML =
      '<div class="kptp-section-label">' + label + ' &mdash; This Profile</div>' +
      '<div class="kptp-section-note">' + label + '’s own history for this profile.</div>' +
      '<div class="kptp-panel-card"><div class="kptp-stat-label">' + label + '</div>' + statHtml + '</div>' +
      exampleHtml;

    if (example) KPTPCharts.renderCandlestick(document.getElementById('kptp-candlestick-featured'), example.bars);
  }

  function renderCompareLink(slug, assetKey) {
    var wrap = document.getElementById('kptp-compare-link-wrap');
    if (!wrap) return;
    var href = 'compare.html?p=' + slug + (assetKey ? ('&a=' + assetKey) : '');
    wrap.innerHTML = '<a class="kptp-calendar-nav-btn" style="width:auto;padding:8px 16px;font-size:11px;display:inline-block;" href="' + href + '">Compare across all assets &rarr;</a>';
  }

  function renderAllProfilesNav(currentName, assetKey) {
    var nav = document.getElementById('kptp-all-profiles-nav');
    if (!nav) return;
    var suffix = assetKey ? ('&a=' + assetKey) : '';
    function pill(name) {
      var active = name === currentName ? ' active' : '';
      return '<a class="kptp-profile-nav-pill' + active + '" href="detail.html?p=' + kptpProfileSlug(name) + suffix + '" style="--pill-accent:' + (KPTP_PROFILE_COLOR[name] || 'var(--muted)') + '">' + name + '</a>';
    }
    var names = Object.keys(KPTP_PROFILE_META);
    var daily = names.filter(function (n) { return !kptpIsWeeklyProfile(n); });
    var weekly = names.filter(kptpIsWeeklyProfile);
    var groupLabel = '<span style="width:100%;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin:10px 0 2px;">';
    nav.innerHTML =
      groupLabel + 'Daily</span>' + daily.map(pill).join('') +
      (weekly.length ? groupLabel + 'Weekly</span>' + weekly.map(pill).join('') : '');
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

    var assetKey = (params.get('a') || '').toLowerCase() || null;

    renderHeader(name);
    renderDescription(name);
    renderAllProfilesNav(name, assetKey);
    renderCompareLink(slug, assetKey);
    kptpAttachGlossaryIcons();

    if (assetKey) {
      var wrap = document.getElementById('kptp-featured-asset');
      if (wrap) wrap.innerHTML = '<div class="kptp-section-note">Loading&hellip;</div>';
      KPTPData.loadAsset(assetKey, DATA_BASE)
        .then(function () { renderFeaturedAsset(name, assetKey); })
        .catch(function () {
          if (wrap) wrap.innerHTML = '<div class="kptp-section-note">No Profiling data available for ' + assetKey.toUpperCase() + '.</div>';
        });
    } else {
      var promptWrap = document.getElementById('kptp-featured-asset');
      if (promptWrap) {
        promptWrap.innerHTML = '<div class="kptp-section-note">Viewing this profile generally. Open it from a specific asset’s Profiling tab to see that asset’s own numbers, or use "Compare across all assets" below.</div>';
      }
    }
  }

  init();
})();
