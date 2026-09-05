/**
 * profiling-charts.js — Shared, page-independent library for the Market
 * Profiling feature: floating tooltip, vanilla-SVG chart primitives,
 * plain-language glossary, and profile colour/icon/copy metadata.
 *
 * Ported from KPT-Market-Profiling/dashboard/js/{tooltip,charts,glossary,
 * profile-meta}.js — same zero-dependency vanilla-SVG approach as this
 * repo's own accordion.js/seasonal-chart.js, adapted so every global and
 * CSS class is namespaced (KPTP* / .kptp-) to avoid collisions with this
 * repo's own .panel/.section-label/.header/.dial/etc. classes, which
 * already carry unrelated meaning in css/dashboard.css.
 *
 * No dependency on ASSET_CONFIG or any page structure — loaded by asset
 * pages (before js/profiling.js) and directly by profiling-calendar/ and
 * profiling-profiles/ pages.
 */

/* ─── Dynamic per-asset data loader ───────────────────────────────────────
 * Loads data/profiling/<key>.js and profile-examples/<key>.js on demand via
 * an injected <script> tag (same pattern js/profiling-calendar.js already
 * uses for its per-year calendar files — fetch()/XHR would be CORS-blocked
 * on a plain file:// open). Lets pages that only need one or a few assets'
 * worth of data (profiling-profiles/detail.html, compare.html) avoid
 * hardcoding a <script> tag per known Profiling asset, which doesn't scale
 * as more assets are added (see docs/PLATFORM_ROADMAP.md Tier 2 follow-up).
 */
var KPTPData = (function () {
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

  // dataBase: relative path to data/profiling/ from the calling page.
  function loadAsset(key, dataBase) {
    var p1 = (window.KPT_PROFILING && window.KPT_PROFILING[key])
      ? Promise.resolve()
      : loadScript(dataBase + '/' + key + '.js');
    var p2 = (window.KPT_PROFILING_EXAMPLES && window.KPT_PROFILING_EXAMPLES[key])
      ? Promise.resolve()
      : loadScript(dataBase + '/profile-examples/' + key + '.js');
    return Promise.all([p1, p2]);
  }

  return { loadScript: loadScript, loadAsset: loadAsset };
})();

/* ─── Tooltip ──────────────────────────────────────────────────────────── */
var KPTPTooltip = (function () {
  var tipEl;

  function ensureEl() {
    if (!tipEl) {
      tipEl = document.createElement('div');
      tipEl.className = 'kptp-tooltip';
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }

  function position(x, y) {
    var el = ensureEl();
    var pad = 14;
    var rect = el.getBoundingClientRect();
    var left = x + pad;
    var top = y + pad;
    if (left + rect.width > window.innerWidth - 8) left = x - rect.width - pad;
    if (top + rect.height > window.innerHeight - 8) top = y - rect.height - pad;
    el.style.left = Math.max(4, left) + 'px';
    el.style.top = Math.max(4, top) + 'px';
  }

  function show(x, y, html) {
    var el = ensureEl();
    el.innerHTML = html;
    el.style.display = 'block';
    position(x, y);
  }

  function hide() {
    if (tipEl) tipEl.style.display = 'none';
  }

  function attach(target, htmlOrFn) {
    function resolve() { return (typeof htmlOrFn === 'function') ? htmlOrFn() : htmlOrFn; }
    target.addEventListener('mouseenter', function (e) { show(e.clientX, e.clientY, resolve()); });
    target.addEventListener('mousemove', function (e) { position(e.clientX, e.clientY); });
    target.addEventListener('mouseleave', hide);
    target.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      show(t.clientX, t.clientY, resolve());
      e.stopPropagation();
    });
  }

  document.addEventListener('touchstart', hide);

  return { show: show, hide: hide, attach: attach };
})();

/* ─── Glossary ─────────────────────────────────────────────────────────── */
var KPT_PROFILING_GLOSSARY = {
  adr: 'Average Daily Range — the average size of the day’s price swing (high minus low) over a trailing window of days.',
  trading_days: 'The number of valid trading days in the dataset, after excluding feed-outage/data-gap days.',
  percentile: 'Shows where a value ranks against history. ‘p20’ means 20% of days had a smaller range than this — 80% had a bigger one.',
  iqr: 'The Interquartile Range (the solid box on the chart) — the middle 50% of all days, from the 25th to 75th percentile. Where most ‘ordinary’ days fall.',
  median: 'The middle value when every day is sorted smallest to largest — half of days were bigger, half were smaller. Less skewed by a handful of extreme days than the mean.',
  mean: 'The mathematical average of all days. Can be pulled higher by a few extreme days (e.g. a crash) even if most days were smaller — compare against the median to see if that’s happening.',
  mode_binned: 'The single most common range ‘bucket’ — the size range more days landed in than any other. The most statistically meaningful way to answer ‘what’s typical’ for continuous price data.',
  mode_raw: 'The exact value that repeated most often across history. Shown for reference, but with continuous price data this is often based on very few coincidentally-identical days — a much weaker signal than the binned mode above.',
  concentration: 'How tightly the high/low cluster around one time of day, from 0 (scattered randomly) to 1 (always the same time). Higher = a more reliable timing pattern.',
  circular_mean: 'The ‘average’ time of day, calculated correctly across the midnight boundary — so 11pm and 1am average to midnight, not to noon.',
  circular_median: 'The ‘middle’ time of day by the same midnight-safe logic as the circular mean — less pulled around by a few outlier times.',
  session: 'Which FX trading session (Asian, London, New York, or an overlap) was active at that time, in UTC.',
  lookback_window: 'How far back the statistics look. Full History uses all available years of data; shorter windows (5Y/1Y/3M) react faster to current market conditions but rest on a smaller sample.',
  compression: 'A day/week/month with an unusually small range compared to its own recent history (bottom 20th percentile).',
  expansion: 'A day/week/month with an unusually large range compared to its own recent history (top 20th percentile).',
  closing_strength: 'How close the day closed to one edge of its own range vs. the middle. High = closed near a high/low (the move held); low = closed near the middle (the move was given back).',
  extreme_timing: 'Describes when the day’s high and low formed relative to each other — e.g. whether it pushed to new extremes late, or settled early and went quiet.',
  n_sample: 'The number of historical days/weeks/months/years behind this statistic. A stat built on a small sample deserves less confidence than the same-looking stat built on thousands of days.'
};

function kptpGlossaryIcon(key) {
  return '<span class="kptp-glossary-icon" data-glossary-key="' + key + '" tabindex="0">?</span>';
}

function kptpAttachGlossaryIcons(root) {
  (root || document).querySelectorAll('.kptp-glossary-icon').forEach(function (iconEl) {
    if (iconEl.dataset.kptpBound) return;
    iconEl.dataset.kptpBound = '1';
    var key = iconEl.getAttribute('data-glossary-key');
    var text = KPT_PROFILING_GLOSSARY[key] || 'No description available.';
    var label = key.replace(/_/g, ' ');
    KPTPTooltip.attach(iconEl, '<b>' + label + '</b><br>' + text);
    iconEl.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
  });
}

/* ─── Profile metadata (colour / icon / descriptive copy) ────────────────
 * Copy sourced from KPT-Market-Profiling/market-profiling-system-spec.md §4.2
 * — keep in sync if either changes (same convention the source repo used).
 */
var KPTP_PROFILE_COLOR = {
  'Trend Day (Up)': 'var(--bull)',
  'Trend Day (Down)': 'var(--bear)',
  'Volatile Day': 'var(--kptp-expansion)',
  'Volatile Reversal Day': 'var(--chop)',
  'Quiet Drift Day (Up)': 'var(--bull)',
  'Quiet Drift Day (Down)': 'var(--bear)',
  'Compression Day': 'var(--kptp-compression)',
  'Normal Day': 'var(--kptp-normal)',
  // Weekly profiles reuse the exact same colors as their Daily equivalent —
  // same concept, same visual language, not a distinct palette.
  'Trend Week (Up)': 'var(--bull)',
  'Trend Week (Down)': 'var(--bear)',
  'Volatile Week': 'var(--kptp-expansion)',
  'Volatile Reversal Week': 'var(--chop)',
  'Quiet Drift Week (Up)': 'var(--bull)',
  'Quiet Drift Week (Down)': 'var(--bear)',
  'Compression Week': 'var(--kptp-compression)',
  'Normal Week': 'var(--kptp-normal)',
  // Monthly profiles reuse the exact same colors as their Daily/Weekly equivalent.
  'Trend Month (Up)': 'var(--bull)',
  'Trend Month (Down)': 'var(--bear)',
  'Volatile Month': 'var(--kptp-expansion)',
  'Volatile Reversal Month': 'var(--chop)',
  'Quiet Drift Month (Up)': 'var(--bull)',
  'Quiet Drift Month (Down)': 'var(--bear)',
  'Compression Month': 'var(--kptp-compression)',
  'Normal Month': 'var(--kptp-normal)'
};

var KPTP_PROFILE_ICON_PATH = {
  'Trend Day (Up)': 'M5,26 L16,30 L32,22 L50,15 L70,9 L95,4',
  'Trend Day (Down)': 'M5,14 L16,10 L32,18 L50,25 L70,31 L95,36',
  'Volatile Day': 'M5,20 L20,6 L35,32 L50,10 L65,30 L80,14 L95,22',
  'Volatile Reversal Day': 'M5,20 L25,4 L50,36 L75,18 L95,20',
  'Quiet Drift Day (Up)': 'M5,24 L30,22 L55,19 L75,16 L95,13',
  'Quiet Drift Day (Down)': 'M5,16 L30,18 L55,21 L75,24 L95,27',
  'Compression Day': 'M5,20 L20,17 L35,23 L50,18 L65,22 L80,19 L95,20',
  'Normal Day': 'M5,22 L20,14 L35,24 L50,12 L65,26 L80,16 L95,20',
  // Weekly profiles reuse the exact same icon shapes as their Daily equivalent.
  'Trend Week (Up)': 'M5,26 L16,30 L32,22 L50,15 L70,9 L95,4',
  'Trend Week (Down)': 'M5,14 L16,10 L32,18 L50,25 L70,31 L95,36',
  'Volatile Week': 'M5,20 L20,6 L35,32 L50,10 L65,30 L80,14 L95,22',
  'Volatile Reversal Week': 'M5,20 L25,4 L50,36 L75,18 L95,20',
  'Quiet Drift Week (Up)': 'M5,24 L30,22 L55,19 L75,16 L95,13',
  'Quiet Drift Week (Down)': 'M5,16 L30,18 L55,21 L75,24 L95,27',
  'Compression Week': 'M5,20 L20,17 L35,23 L50,18 L65,22 L80,19 L95,20',
  'Normal Week': 'M5,22 L20,14 L35,24 L50,12 L65,26 L80,16 L95,20',
  // Monthly profiles reuse the exact same icon shapes as their Daily/Weekly equivalent.
  'Trend Month (Up)': 'M5,26 L16,30 L32,22 L50,15 L70,9 L95,4',
  'Trend Month (Down)': 'M5,14 L16,10 L32,18 L50,25 L70,31 L95,36',
  'Volatile Month': 'M5,20 L20,6 L35,32 L50,10 L65,30 L80,14 L95,22',
  'Volatile Reversal Month': 'M5,20 L25,4 L50,36 L75,18 L95,20',
  'Quiet Drift Month (Up)': 'M5,24 L30,22 L55,19 L75,16 L95,13',
  'Quiet Drift Month (Down)': 'M5,16 L30,18 L55,21 L75,24 L95,27',
  'Compression Month': 'M5,20 L20,17 L35,23 L50,18 L65,22 L80,19 L95,20',
  'Normal Month': 'M5,22 L20,14 L35,24 L50,12 L65,26 L80,16 L95,20'
};

var KPTP_PROFILE_META = {
  'Trend Day (Up)': {
    axisRange: 'Expansion', axisShape: 'Directional',
    rule: 'Expansion + Directional, closed near the day’s high.',
    why: 'Big range <b>and</b> closed near an extreme — the move was both large and held. Matches the everyday trading sense of "trended persistently and didn’t give it back."',
    timingSignature: 'Typically shows the <b>Late Push</b> timing signature: the low forms early in the day, then price grinds to new highs right into the close.'
  },
  'Trend Day (Down)': {
    axisRange: 'Expansion', axisShape: 'Directional',
    rule: 'Expansion + Directional, closed near the day’s low.',
    why: 'Big range <b>and</b> closed near an extreme — the move was both large and held. Matches the everyday trading sense of "trended persistently and didn’t give it back."',
    timingSignature: 'Typically shows the <b>Late Push</b> timing signature: the high forms early in the day, then price grinds to new lows right into the close.'
  },
  'Volatile Day': {
    axisRange: 'Expansion', axisShape: 'Mixed',
    rule: 'Expansion + Mixed closing shape.',
    why: 'Big range but closed only moderately off the midpoint — real two-way movement without a clean directional resolution. "Volatile," not "Trend," because size dominates the story, not direction.',
    timingSignature: 'No single dominant timing signature — that’s part of what makes it "Mixed" rather than a clean Trend or Reversal shape.'
  },
  'Volatile Reversal Day': {
    axisRange: 'Expansion', axisShape: 'Balanced',
    rule: 'Expansion + Balanced closing shape.',
    why: 'Big range but closed essentially back at the midpoint — a big move that got substantially or fully retraced. "Reversal" captures the round-trip; split out from Volatile Day because the give-back, not just the size, is now the dominant fact about the day.',
    timingSignature: 'Often shows <b>Late Resolution</b> or <b>Fade Risk</b> timing — the day stays undecided, or gives back an early move later on.'
  },
  'Quiet Drift Day (Up)': {
    axisRange: 'Compression', axisShape: 'Directional',
    rule: 'Compression + Directional, closed near the day’s high.',
    why: 'Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. "Drift" is the low-energy version of "Trend"; kept separate because the <b>amount</b> of conviction differs even though the shape (closed at an edge) is the same.',
    timingSignature: 'The same directional-conviction shape as Trend Day, just at much smaller amplitude.'
  },
  'Quiet Drift Day (Down)': {
    axisRange: 'Compression', axisShape: 'Directional',
    rule: 'Compression + Directional, closed near the day’s low.',
    why: 'Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. "Drift" is the low-energy version of "Trend"; kept separate because the <b>amount</b> of conviction differs even though the shape (closed at an edge) is the same.',
    timingSignature: 'The same directional-conviction shape as Trend Day, just at much smaller amplitude.'
  },
  'Compression Day': {
    axisRange: 'Compression', axisShape: 'Balanced / Mixed',
    rule: 'Compression range regime, Balanced or Mixed closing shape.',
    why: 'Small range, closed near the middle — the "coiling," non-committal day. Default label for small-range days without a clear directional tilt.',
    timingSignature: 'No dominant timing signature expected — low amplitude, no strong directional push to time.'
  },
  'Normal Day': {
    axisRange: 'Normal', axisShape: 'Any',
    rule: 'Range regime between the 20th and 80th percentile, any closing shape.',
    why: 'Deliberately the largest, least differentiated bucket (~57% of days on both assets in the original study). Most days are neither unusually big nor unusually small, so they don’t earn a directional-shape label — a rule that fires on most days isn’t adding decision value.',
    timingSignature: 'No dominant timing signature by design — this bucket intentionally doesn’t distinguish shape.'
  },
  // Weekly profiles — same two axes, same 8-name scheme, independently
  // re-derived (not assumed) at weekly granularity. See
  // KPT-Market-Profiling/market-profiling-system-spec.md §4.6 for the full
  // methodology and cross-asset validation behind the timing-signature text.
  'Trend Week (Up)': {
    axisRange: 'Expansion', axisShape: 'Directional',
    rule: 'Expansion + Directional, closed near the week’s high.',
    why: 'Big range <b>and</b> closed near an extreme — the move was both large and held across the week. Same reasoning as Trend Day, one level up.',
    timingSignature: 'Validated across multiple assets: typically <b>Late Push</b> (the low forms in the first half of the week, price pushes to new highs into Friday) and the high/low land on well-separated weekdays, not close together — a trend week needs room to build.'
  },
  'Trend Week (Down)': {
    axisRange: 'Expansion', axisShape: 'Directional',
    rule: 'Expansion + Directional, closed near the week’s low.',
    why: 'Big range <b>and</b> closed near an extreme — the move was both large and held across the week. Same reasoning as Trend Day, one level up.',
    timingSignature: 'Validated across multiple assets: typically <b>Late Push</b> (the high forms in the first half of the week, price pushes to new lows into Friday) and the high/low land on well-separated weekdays, not close together — a trend week needs room to build.'
  },
  'Volatile Week': {
    axisRange: 'Expansion', axisShape: 'Mixed',
    rule: 'Expansion + Mixed closing shape.',
    why: 'Big range but closed only moderately off the midpoint — real two-way movement without a clean directional resolution across the week.',
    timingSignature: 'No single dominant timing signature — that’s part of what makes it "Mixed" rather than a clean Trend or Reversal shape.'
  },
  'Volatile Reversal Week': {
    axisRange: 'Expansion', axisShape: 'Balanced',
    rule: 'Expansion + Balanced closing shape.',
    why: 'Big range but closed essentially back at the midpoint — a big weekly move that got substantially or fully retraced.',
    timingSignature: 'Often shows <b>Late Resolution</b> or <b>Fade Risk</b> timing — the week stays undecided, or gives back an early move later on.'
  },
  'Quiet Drift Week (Up)': {
    axisRange: 'Compression', axisShape: 'Directional',
    rule: 'Compression + Directional, closed near the week’s high.',
    why: 'Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. The low-energy version of Trend Week.',
    timingSignature: 'The same directional-conviction shape as Trend Week, just at much smaller amplitude.'
  },
  'Quiet Drift Week (Down)': {
    axisRange: 'Compression', axisShape: 'Directional',
    rule: 'Compression + Directional, closed near the week’s low.',
    why: 'Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. The low-energy version of Trend Week.',
    timingSignature: 'The same directional-conviction shape as Trend Week, just at much smaller amplitude.'
  },
  'Compression Week': {
    axisRange: 'Compression', axisShape: 'Balanced / Mixed',
    rule: 'Compression range regime, Balanced or Mixed closing shape.',
    why: 'Small range, closed near the middle — the "coiling," non-committal week. Default label for small-range weeks without a clear directional tilt.',
    timingSignature: 'No dominant timing signature or day-pattern expected — low amplitude, no strong directional push to time.'
  },
  'Normal Week': {
    axisRange: 'Normal', axisShape: 'Any',
    rule: 'Range regime between the 20th and 80th percentile, any closing shape.',
    why: 'Deliberately the largest, least differentiated bucket, same as Normal Day. Most weeks are neither unusually big nor unusually small.',
    timingSignature: 'No dominant timing signature by design — this bucket intentionally doesn’t distinguish shape.'
  },
  // Monthly profiles — same two axes, same 8-name scheme, independently
  // re-derived (not assumed) at monthly granularity, using a 24-month
  // rolling window rather than Daily/Weekly's "trailing ~1 real year"
  // convention (too few monthly bars in 12 months for a meaningful
  // percentile rank). See
  // KPT-Market-Profiling/market-profiling-system-spec.md §4.7 for the full
  // methodology and cross-asset validation behind the timing-signature text.
  'Trend Month (Up)': {
    axisRange: 'Expansion', axisShape: 'Directional',
    rule: 'Expansion + Directional, closed near the month’s high.',
    why: 'Big range <b>and</b> closed near an extreme — the move was both large and held across the month. Same reasoning as Trend Week, one level up.',
    timingSignature: 'Validated across multiple assets: typically <b>Late Push</b> (the low forms in the first half of the month, price pushes to new highs later on) and the high/low land in well-separated weeks-of-month, not close together — a trend month needs room to build.'
  },
  'Trend Month (Down)': {
    axisRange: 'Expansion', axisShape: 'Directional',
    rule: 'Expansion + Directional, closed near the month’s low.',
    why: 'Big range <b>and</b> closed near an extreme — the move was both large and held across the month. Same reasoning as Trend Week, one level up.',
    timingSignature: 'Validated across multiple assets: typically <b>Late Push</b> (the high forms in the first half of the month, price pushes to new lows later on) and the high/low land in well-separated weeks-of-month, not close together — a trend month needs room to build.'
  },
  'Volatile Month': {
    axisRange: 'Expansion', axisShape: 'Mixed',
    rule: 'Expansion + Mixed closing shape.',
    why: 'Big range but closed only moderately off the midpoint — real two-way movement without a clean directional resolution across the month.',
    timingSignature: 'No single dominant timing signature — that’s part of what makes it "Mixed" rather than a clean Trend or Reversal shape.'
  },
  'Volatile Reversal Month': {
    axisRange: 'Expansion', axisShape: 'Balanced',
    rule: 'Expansion + Balanced closing shape.',
    why: 'Big range but closed essentially back at the midpoint — a big monthly move that got substantially or fully retraced.',
    timingSignature: 'Often shows <b>Late Resolution</b> or <b>Fade Risk</b> timing — the month stays undecided, or gives back an early move later on.'
  },
  'Quiet Drift Month (Up)': {
    axisRange: 'Compression', axisShape: 'Directional',
    rule: 'Compression + Directional, closed near the month’s high.',
    why: 'Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. The low-energy version of Trend Month.',
    timingSignature: 'The same directional-conviction shape as Trend Month, just at much smaller amplitude.'
  },
  'Quiet Drift Month (Down)': {
    axisRange: 'Compression', axisShape: 'Directional',
    rule: 'Compression + Directional, closed near the month’s low.',
    why: 'Small range, but still closed at an edge of that small range — persistently one-sided without much amplitude. The low-energy version of Trend Month.',
    timingSignature: 'The same directional-conviction shape as Trend Month, just at much smaller amplitude.'
  },
  'Compression Month': {
    axisRange: 'Compression', axisShape: 'Balanced / Mixed',
    rule: 'Compression range regime, Balanced or Mixed closing shape.',
    why: 'Small range, closed near the middle — the "coiling," non-committal month. Default label for small-range months without a clear directional tilt.',
    timingSignature: 'No dominant timing signature or week-pattern expected — low amplitude, no strong directional push to time.'
  },
  'Normal Month': {
    axisRange: 'Normal', axisShape: 'Any',
    rule: 'Range regime between the 20th and 80th percentile, any closing shape.',
    why: 'Deliberately the largest, least differentiated bucket, same as Normal Day/Week. Most months are neither unusually big nor unusually small.',
    timingSignature: 'No dominant timing signature by design — this bucket intentionally doesn’t distinguish shape.'
  }
};

function kptpProfileSlug(name) {
  return name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-');
}

// Weekly profile names always contain "Week" (profile_taxonomy_weekly.py's
// profile_name() is a deliberate clone of the Daily version, prefix swapped)
// -- used wherever a page needs to know which bundle field ("weekly" vs
// "profiles") a given profile name belongs to.
function kptpIsWeeklyProfile(name) {
  return name.indexOf('Week') !== -1;
}

// Monthly profile names always contain "Month" (profile_taxonomy_monthly.py's
// profile_name() is a deliberate clone of the Daily/Weekly version, prefix
// swapped) -- used wherever a page needs to know which bundle field
// ("monthly" vs "weekly" vs "profiles") a given profile name belongs to.
function kptpIsMonthlyProfile(name) {
  return name.indexOf('Month') !== -1;
}

function kptpProfileIconSvg(name, size) {
  size = size || 44;
  var path = KPTP_PROFILE_ICON_PATH[name];
  var color = KPTP_PROFILE_COLOR[name] || 'var(--muted)';
  if (!path) return '';
  return '<svg viewBox="0 0 100 40" width="' + size + '" height="' + (size * 0.4) + '" class="kptp-profile-icon">' +
    '<polyline points="' + path.replace(/[ML]/g, '').trim() + '" fill="none" stroke="' + color + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
}

/* ─── Chart primitives (vanilla SVG, no library) ─────────────────────────
 * Ported near-verbatim from KPT-Market-Profiling/dashboard/js/charts.js —
 * this part has no DOM-ownership assumption (each render* fn takes its own
 * container), only CSS classes/hover wiring were renamed to the .kptp-
 * namespace.
 */
var KPTPCharts = (function () {
  var SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var e = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function hover(target, html) {
    target.classList.add('kptp-hoverable');
    KPTPTooltip.attach(target, html);
  }

  function clear(container) { container.innerHTML = ''; }

  // Matches KPT-Market-Profiling's pipeline/clean_mt5_csv.py session_tag()
  // so on-page session colouring stays consistent with the pipeline labels.
  function sessionTag(hhmm) {
    var parts = hhmm.split(':').map(Number);
    var h = parts[0] + parts[1] / 60;
    var inAsian = h >= 23.0 || h < 8.0;
    var inLondon = h >= 7.0 && h < 16.0;
    var inNY = h >= 12.0 && h < 21.0;
    if (inLondon && inNY) return 'London_NY_Overlap';
    if (inAsian && inLondon) return 'Asian_London_Overlap';
    if (inLondon) return 'London';
    if (inNY) return 'New_York';
    if (inAsian) return 'Asian';
    return 'Other';
  }

  var SESSION_COLOR = {
    Asian: 'var(--kptp-asian)', London: 'var(--kptp-london)', New_York: 'var(--kptp-ny)',
    London_NY_Overlap: 'var(--kptp-overlap)', Asian_London_Overlap: 'var(--kptp-overlap)', Other: 'var(--muted)'
  };
  var SESSION_LABEL = {
    Asian: 'Asian session', London: 'London session', New_York: 'New York session',
    London_NY_Overlap: 'London / New York overlap', Asian_London_Overlap: 'Asian / London overlap',
    Other: 'Outside main sessions'
  };

  function minutesOf(hhmm) {
    var parts = hhmm.split(':').map(Number);
    return parts[0] * 60 + parts[1];
  }
  function addMinutes(hhmm, mins) {
    var total = (minutesOf(hhmm) + mins) % 1440;
    var h = Math.floor(total / 60), m = total % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  function renderRangeStrip(container, dist, unitLabel) {
    clear(container);
    unitLabel = unitLabel || 'pips';
    if (!dist || !dist.n) { container.textContent = 'No data for this window.'; return; }
    var W = 1000, H = 70, padL = 10, padR = 10;
    var lo = dist.p05, hi = dist.p95;
    function scale(v) { return padL + ((v - lo) / (hi - lo)) * (W - padL - padR); }

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'kptp-range-strip-svg' });
    var midY = H / 2 - 4;

    svg.appendChild(el('line', { x1: padL, x2: W - padR, y1: midY, y2: midY, stroke: 'var(--border)', 'stroke-width': 2 }));

    var x05 = scale(lo), x25 = scale(dist.p25), x75 = scale(dist.p75), x95 = scale(hi);
    var wLeft = el('line', { x1: x05, x2: x25, y1: midY, y2: midY, stroke: 'var(--dim)', 'stroke-width': 1.5 });
    hover(wLeft, '<b>5th percentile</b><br>Only 5% of days had a smaller range than ' + dist.p05 + ' ' + unitLabel + '.');
    svg.appendChild(wLeft);
    var wRight = el('line', { x1: x75, x2: x95, y1: midY, y2: midY, stroke: 'var(--dim)', 'stroke-width': 1.5 });
    hover(wRight, '<b>95th percentile</b><br>Only 5% of days had a bigger range than ' + dist.p95 + ' ' + unitLabel + '.');
    svg.appendChild(wRight);

    var iqr = el('rect', { x: x25, y: midY - 12, width: Math.max(2, x75 - x25), height: 24, fill: 'rgba(34,197,94,0.12)', stroke: 'var(--bull)', 'stroke-width': 1, rx: 3 });
    hover(iqr, '<b>Interquartile range</b><br>The middle 50% of days: ' + dist.p25 + '–' + dist.p75 + ' ' + unitLabel + '. This is where a typical day falls.');
    svg.appendChild(iqr);

    var xMed = scale(dist.p50);
    var medLine = el('line', { x1: xMed, x2: xMed, y1: midY - 16, y2: midY + 16, stroke: '#fff', 'stroke-width': 2.5 });
    hover(medLine, '<b>Median</b><br>' + dist.p50 + ' ' + unitLabel + ' — half of days were bigger, half smaller.');
    svg.appendChild(medLine);

    if (dist.compression_threshold_pips != null) {
      var xC = scale(dist.compression_threshold_pips);
      var lineC = el('line', { x1: xC, x2: xC, y1: midY - 20, y2: midY + 20, stroke: 'var(--kptp-compression)', 'stroke-width': 1.5, 'stroke-dasharray': '3,2' });
      hover(lineC, '<b>Compression threshold (p20)</b><br>Days below ' + dist.compression_threshold_pips + ' ' + unitLabel + ' count as "Compression" in the profile taxonomy.');
      svg.appendChild(lineC);
    }
    if (dist.expansion_threshold_pips != null) {
      var xE = scale(dist.expansion_threshold_pips);
      var lineE = el('line', { x1: xE, x2: xE, y1: midY - 20, y2: midY + 20, stroke: 'var(--kptp-expansion)', 'stroke-width': 1.5, 'stroke-dasharray': '3,2' });
      hover(lineE, '<b>Expansion threshold (p80)</b><br>Days above ' + dist.expansion_threshold_pips + ' ' + unitLabel + ' count as "Expansion" in the profile taxonomy.');
      svg.appendChild(lineE);
    }

    if (dist.mode_binned) {
      var mb = dist.mode_binned;
      var bx = scale(mb.bin_low), bx2 = scale(mb.bin_high);
      var band = el('rect', { x: bx, y: midY + 22, width: Math.max(2, bx2 - bx), height: 8, fill: 'var(--chop)', opacity: 0.7, rx: 2 });
      hover(band, '<b>Most common range (binned mode)</b><br>' + mb.bin_low + '–' + mb.bin_high + ' ' + unitLabel + ' — ' + mb.pct_of_n + '% of days (n=' + mb.count + ') landed here, more than any other range bucket.');
      svg.appendChild(band);
    }

    if (dist.mode_raw && dist.mode_raw.count > 1) {
      var mr = dist.mode_raw;
      var xR = scale(mr.value);
      var tick = el('path', { d: 'M ' + xR + ' ' + (midY - 24) + ' l -4 -6 l 8 0 z', fill: 'var(--kptp-overlap)' });
      hover(tick, '<b>Exact most-repeated value (raw mode)</b><br>' + mr.value + ' ' + unitLabel + ', repeated on ' + mr.count + ' days (' + mr.pct_of_n + '%). A weaker signal than the binned mode below.');
      svg.appendChild(tick);
    }

    var t1 = el('text', { x: x05, y: H - 4, 'font-size': 9, fill: 'var(--muted)', 'text-anchor': 'start' });
    t1.textContent = 'p05 ' + lo;
    var t2 = el('text', { x: x95, y: H - 4, 'font-size': 9, fill: 'var(--muted)', 'text-anchor': 'end' });
    t2.textContent = 'p95 ' + hi;
    svg.appendChild(t1);
    svg.appendChild(t2);

    container.appendChild(svg);
  }

  function renderTimeHeatmap(container, circ) {
    clear(container);
    if (!circ || !circ.n || !circ.histogram) { container.textContent = 'No data for this window.'; return; }
    var W = 1000, H = 70, padL = 4, padR = 4, padB = 14;
    var n = circ.histogram.length;
    var barW = (W - padL - padR) / n;
    var maxPct = Math.max.apply(null, circ.histogram.map(function (b) { return b.pct; }).concat([0.01]));
    function scaleY(pct) { return (pct / maxPct) * (H - padB - 6); }

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'kptp-clock-svg' });

    circ.histogram.forEach(function (b, i) {
      var h = scaleY(b.pct);
      var x = padL + i * barW;
      var y = H - padB - h;
      var isMode = b.bucket_start_utc === circ.mode_bucket_start_utc;
      var tag = sessionTag(b.bucket_start_utc);
      var bar = el('rect', {
        x: x, y: y, width: Math.max(1, barW - 0.5), height: Math.max(h, 1),
        fill: SESSION_COLOR[tag], opacity: isMode ? 1 : 0.55,
        stroke: isMode ? '#fff' : 'none', 'stroke-width': isMode ? 1 : 0
      });
      var end = addMinutes(b.bucket_start_utc, 30);
      hover(bar, '<b>' + b.bucket_start_utc + '–' + end + ' UTC</b>' + (isMode ? ' (mode)' : '') + '<br>' + SESSION_LABEL[tag] + '<br>' + b.pct + '% of days (n=' + b.count + ')');
      svg.appendChild(bar);
    });

    for (var h4 = 0; h4 <= 24; h4 += 4) {
      var xg = padL + (h4 * 60 / 1440) * (W - padL - padR);
      svg.appendChild(el('line', { x1: xg, x2: xg, y1: 0, y2: H - padB, stroke: 'var(--border)', 'stroke-width': 1 }));
      var tg = el('text', { x: xg, y: H - 2, 'font-size': 8, fill: 'var(--muted)', 'text-anchor': 'middle' });
      tg.textContent = String(h4).padStart(2, '0') + ':00';
      svg.appendChild(tg);
    }

    var xMean = padL + (minutesOf(circ.circular_mean_utc) / 1440) * (W - padL - padR);
    var meanLine = el('line', { x1: xMean, x2: xMean, y1: 0, y2: H - padB, stroke: 'var(--chop)', 'stroke-width': 1.5, 'stroke-dasharray': '2,2' });
    hover(meanLine, '<b>Circular mean</b><br>' + circ.circular_mean_utc + ' UTC — the "average" time of day, calculated correctly across the midnight boundary.');
    svg.appendChild(meanLine);

    container.appendChild(svg);
  }

  function renderBarChart(container, entries, opts) {
    clear(container);
    opts = opts || {};
    if (!entries.length) { container.textContent = 'No data.'; return; }
    var W = 1000, H = 160, padL = 30, padR = 10, padB = 24, padT = 10;
    var max = Math.max.apply(null, entries.map(function (e) { return e.value; }).concat([1]));
    var total = entries.reduce(function (s, e) { return s + e.value; }, 0) || 1;
    var barGap = 8;
    var barW = (W - padL - padR - barGap * (entries.length - 1)) / entries.length;
    // High-cardinality axes (e.g. 53 ISO weeks) pass labelEvery so only every
    // Nth bar gets a text label — every bar still renders + hovers, this
    // just keeps the labels from overlapping. Default 1 = label every bar
    // (unchanged behaviour for the existing weekday/week-of-month/month callers).
    var labelEvery = opts.labelEvery || 1;

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'kptp-bar-chart-svg' });
    svg.appendChild(el('line', { x1: padL, x2: W - padR, y1: H - padB, y2: H - padB, stroke: 'var(--border)', 'stroke-width': 1 }));

    entries.forEach(function (e, i) {
      var h = ((e.value / max) * (H - padT - padB)) || 0;
      var x = padL + i * (barW + barGap);
      var y = H - padB - h;
      var pct = Math.round((e.value / total) * 1000) / 10;
      var bar = el('rect', { x: x, y: y, width: barW, height: Math.max(h, 1), fill: e.color || 'var(--accent-combined)', rx: 3, opacity: e.value ? 0.85 : 0.25 });
      hover(bar, e.tooltip || ('<b>' + e.label + '</b><br>' + e.value + ' occurrences — ' + pct + '% of the total.'));
      svg.appendChild(bar);

      if (i % labelEvery === 0) {
        var vt = el('text', { x: x + barW / 2, y: y - 4, 'font-size': 10, fill: 'var(--text)', 'text-anchor': 'middle' });
        vt.textContent = opts.valueFmt ? opts.valueFmt(e.value) : e.value;
        svg.appendChild(vt);
        var lt = el('text', { x: x + barW / 2, y: H - padB + 12, 'font-size': 9, fill: 'var(--muted)', 'text-anchor': 'middle' });
        lt.textContent = e.label;
        svg.appendChild(lt);
      }
    });

    container.appendChild(svg);
  }

  function renderCandlestick(container, bars) {
    clear(container);
    if (!bars || !bars.length) { container.textContent = 'No intraday data available for this example day.'; return; }
    var W = 1000, H = 320, padL = 46, padR = 10, padT = 16, padB = 24;
    var lo = Math.min.apply(null, bars.map(function (b) { return b.l; }));
    var hi = Math.max.apply(null, bars.map(function (b) { return b.h; }));
    function scaleY(v) { return padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB); }
    var n = bars.length;
    var slotW = (W - padL - padR) / n;
    var bodyW = Math.max(2, slotW * 0.6);

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'kptp-candlestick-svg' });

    for (var i4 = 0; i4 <= 4; i4++) {
      var v = lo + (hi - lo) * (i4 / 4);
      var y = scaleY(v);
      svg.appendChild(el('line', { x1: padL, x2: W - padR, y1: y, y2: y, stroke: 'var(--border)', 'stroke-width': 1 }));
      var t = el('text', { x: padL - 6, y: y + 3, 'font-size': 9, fill: 'var(--muted)', 'text-anchor': 'end' });
      t.textContent = v.toFixed(4);
      svg.appendChild(t);
    }

    bars.forEach(function (b, i) {
      var x = padL + i * slotW + slotW / 2;
      var up = b.c >= b.o;
      var color = up ? 'var(--bull)' : 'var(--bear)';
      var wick = el('line', { x1: x, x2: x, y1: scaleY(b.h), y2: scaleY(b.l), stroke: color, 'stroke-width': 1.2 });
      svg.appendChild(wick);
      var yOpen = scaleY(b.o), yClose = scaleY(b.c);
      var bodyTop = Math.min(yOpen, yClose);
      var bodyH = Math.max(1, Math.abs(yClose - yOpen));
      var body = el('rect', { x: x - bodyW / 2, y: bodyTop, width: bodyW, height: bodyH, fill: color, opacity: 0.9 });
      var time = b.t.slice(11, 16);
      hover(body, '<b>' + time + ' UTC</b><br>O ' + b.o.toFixed(4) + ' · H ' + b.h.toFixed(4) + '<br>L ' + b.l.toFixed(4) + ' · C ' + b.c.toFixed(4));
      svg.appendChild(body);

      if (i % 4 === 0) {
        var lbl = el('text', { x: x, y: H - padB + 12, 'font-size': 8, fill: 'var(--muted)', 'text-anchor': 'middle' });
        lbl.textContent = time;
        svg.appendChild(lbl);
      }
    });

    container.appendChild(svg);
  }

  return {
    renderRangeStrip: renderRangeStrip,
    renderTimeHeatmap: renderTimeHeatmap,
    renderBarChart: renderBarChart,
    renderCandlestick: renderCandlestick,
    sessionTag: sessionTag
  };
})();
