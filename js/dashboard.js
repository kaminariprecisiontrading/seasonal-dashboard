/**
 * dashboard.js — the dashboard index's page script (dashboard.html, served at /dashboard).
 * Moved out of two inline <script> blocks in v1.21 so the Content-Security-Policy
 * can forbid inline script; the code is unchanged and runs in the same order.
 * Loaded after data/signals_manifest.js and js/signals.js.
 */

/* ═══ Part 1 (was the first inline block): month label, sticky nav, search ═══ */
  /* ── Month label ── */
  const MONTH_NAMES = ["January","February","March","April","May","June",
                       "July","August","September","October","November","December"];
  const MONTH_ABBR  = ["Jan","Feb","Mar","Apr","May","Jun",
                       "Jul","Aug","Sep","Oct","Nov","Dec"];
  document.getElementById('month-name').textContent = MONTH_NAMES[new Date().getMonth()];

  /* ── Sticky nav active state (IntersectionObserver) ── */
  const navLinks = document.querySelectorAll('.nav-link');
  const navSections = Array.from(navLinks)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  // Track the topmost visible section
  const sectionVisibility = new Map();
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      sectionVisibility.set(entry.target.id, entry.isIntersecting);
    });
    // Find first visible section (in DOM order)
    for (const s of navSections) {
      if (sectionVisibility.get(s.id)) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${s.id}"]`);
        if (active) active.classList.add('active');
        break;
      }
    }
  }, { rootMargin: '-5% 0px -75% 0px', threshold: 0 });

  navSections.forEach(s => navObserver.observe(s));

  /* ── Search / filter ── */
  var allCards  = Array.from(document.querySelectorAll('.asset-card.status-complete'));
  var totalComplete = allCards.length;

  function updateSearch(query) {
    var q = query.trim().toLowerCase();
    var visible = 0;

    allCards.forEach(function (card) {
      var ticker = (card.querySelector('.card-ticker') || {}).textContent || '';
      var name   = (card.querySelector('.card-name')   || {}).textContent || '';
      var match  = !q || ticker.toLowerCase().indexOf(q) !== -1 || name.toLowerCase().indexOf(q) !== -1;
      card.classList.toggle('search-hidden', !match);
      if (match) visible++;
    });

    // Grey out sections where all cards are hidden
    document.querySelectorAll('.grid-section').forEach(function (gs) {
      var grid = gs.nextElementSibling;
      if (!grid || !grid.classList.contains('asset-grid')) return;
      var anyVisible = Array.from(grid.querySelectorAll('.asset-card.status-complete'))
                           .some(function (c) { return !c.classList.contains('search-hidden'); });
      gs.classList.toggle('section-all-hidden', !anyVisible);
    });

    var countEl = document.getElementById('search-count');
    if (countEl) {
      countEl.textContent = q ? (visible + '/' + totalComplete) : '';
    }
  }

  var searchInput = document.getElementById('asset-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () { updateSearch(this.value); });
    searchInput.addEventListener('search', function () { updateSearch(this.value); });
  }

/* ═══ Part 2 (was the second inline block): live signal injection ═══ */
(function () {
  if (typeof SIGNALS_MANIFEST === 'undefined') return;

  // Signal mapping, conviction and week-of-month all come from js/signals.js —
  // shared with the landing page, This Week and the Heatmap so they always agree.
  var now   = new Date();
  var cw    = KptSignals.weekOf(now);
  var mon   = cw.month;
  var wkIdx = cw.week;

  /* ── Category map: asset ID → display label ── */
  var ASSET_CAT = {
    aud:'Currencies', usd:'Currencies', jpy:'Currencies', gbp:'Currencies',
    cad:'Currencies', eur:'Currencies', chf:'Currencies', nzd:'Currencies',
    mxn:'Currencies', brl:'Currencies',
    xau:'Metals', xag:'Metals', copper:'Metals', platinum:'Metals', palladium:'Metals',
    cl:'Energy', brent:'Energy', ng:'Energy', ulsd:'Energy', rb:'Energy', gasoil:'Energy',
    tbonds:'Rates', tnotes10:'Rates', tnotes5:'Rates', tnotes2:'Rates',
    eurodollar:'Rates', austbonds10:'Rates', austbonds3:'Rates', austbills3m:'Rates',
    longgilt:'Rates', shortsterling:'Rates', eurobund:'Rates', eurobobl:'Rates',
    euroyen:'Rates', fedfunds:'Rates',
    sp500:'Indices', es:'Indices', rty:'Indices', ym:'Indices', nq:'Indices',
    md:'Indices', gsci:'Indices', nk:'Indices', ftse:'Indices', spi:'Indices',
    dax:'Indices', cac:'Indices', hsi:'Indices',
    coffee:'Softs', sugar11:'Softs', cocoa:'Softs', oj:'Softs',
    roughrice:'Softs', londonsugar:'Softs', londoncocoa:'Softs', robusta:'Softs',
    soybeans:'Grains', sbmeal:'Grains', sboil:'Grains', wheat:'Grains',
    wheatk:'Grains', wheatm:'Grains', corn:'Grains', oats:'Grains',
    cotton:'Fiber & Meats', lumber:'Fiber & Meats', lc:'Fiber & Meats',
    fc:'Fiber & Meats', lh:'Fiber & Meats', milk:'Fiber & Meats',
    btc:'Crypto',
    'fx-audusd':'FX Majors', 'fx-eurusd':'FX Majors', 'fx-gbpusd':'FX Majors',
    'fx-usdcad':'FX Majors', 'fx-usdchf':'FX Majors', 'fx-usdjpy':'FX Majors',
    'fx-audcad':'FX Minors', 'fx-audchf':'FX Minors', 'fx-audnzd':'FX Minors',
    'fx-euraud':'FX Minors', 'fx-eurchf':'FX Minors', 'fx-eurgbp':'FX Minors',
    'fx-gbpaud':'FX Minors', 'fx-gbpchf':'FX Minors', 'fx-nzdusd':'FX Minors',
    'fx-audjpy':'FX Crosses', 'fx-cadchf':'FX Crosses', 'fx-cadjpy':'FX Crosses',
    'fx-eurcad':'FX Crosses', 'fx-eurjpy':'FX Crosses', 'fx-eurnzd':'FX Crosses',
    'fx-gbpcad':'FX Crosses', 'fx-gbpjpy':'FX Crosses', 'fx-gbpnzd':'FX Crosses',
    'fx-nzdcad':'FX Crosses', 'fx-nzdchf':'FX Crosses', 'fx-nzdjpy':'FX Crosses'
  };

  var convPips = KptSignals.convPips;

  /* ── Scan all complete cards → classify into bull/bear/chop ── */
  var bulls = [], bears = [], chops = [];

  var cards = document.querySelectorAll('.asset-card.status-complete');
  cards.forEach(function (card) {
    var href = card.getAttribute('href') || '';
    var m    = href.match(/assets\/([^./?#]+)/);
    if (!m) return;
    var id   = m[1];
    var s = KptSignals.getSignal(id, mon, wkIdx);
    if (!s) return;

    var t      = s;
    var stars  = s.conviction;
    var sigDiv = card.querySelector('.card-signal');
    if (sigDiv) {
      sigDiv.innerHTML =
        '<span class="card-signal-label">Signal</span>' +
        '<span class="' + t.cls + '">' + t.signal + '</span>' +
        convPips(stars);
    }
    // Tag card with signal type for the filter bar
    card.dataset.sigType = t.type;

    var ticker = (card.querySelector('.card-ticker') || {}).textContent || id;
    var entry  = { id: id, href: href, ticker: ticker, stars: stars };
    if (t.type === 'bull')      bulls.push(entry);
    else if (t.type === 'bear') bears.push(entry);
    else                        chops.push(entry);
  });

  /* ── Build This Week accordion ── */
  var panel = document.getElementById('this-week-panel');
  if (!panel || (bulls.length + bears.length + chops.length === 0)) return;

  // Counts
  var wkNum = wkIdx + 1;
  var dateLabel = document.getElementById('tw-date-label');
  if (dateLabel) dateLabel.textContent = MONTH_ABBR[mon].toUpperCase() + ' WK' + wkNum + ' · ' + now.getFullYear();

  function byStars(a, b) { return b.stars - a.stars; }
  bulls.sort(byStars); bears.sort(byStars); chops.sort(byStars);

  document.getElementById('tw-bull-count').textContent = bulls.length;
  document.getElementById('tw-bear-count').textContent = bears.length;
  document.getElementById('tw-chop-count').textContent = chops.length;

  /* Build expanded columns — grouped by category, sorted by conviction */
  var twCols = document.getElementById('tw-cols');
  if (!twCols) return;

  function buildColumn(list, sigClass, sigLabel, count) {
    var col = document.createElement('div');
    col.className = 'tw-col';

    var head = document.createElement('div');
    head.className = 'tw-col-head ' + sigClass;
    head.innerHTML = sigLabel + ' <span class="tw-count">' + count + '</span>';
    col.appendChild(head);

    // Group by category (preserving conviction sort within each category)
    var catMap = {}, catOrder = [];
    list.forEach(function (item) {
      var cat = ASSET_CAT[item.id] || 'Other';
      if (!catMap[cat]) { catMap[cat] = []; catOrder.push(cat); }
      catMap[cat].push(item);
    });

    catOrder.forEach(function (cat) {
      var catEl = document.createElement('div');
      catEl.className = 'tw-cat-label';
      catEl.textContent = cat;
      col.appendChild(catEl);

      catMap[cat].forEach(function (item) {
        var a = document.createElement('a');
        a.className = 'tw-asset-link';
        a.href = item.href;
        a.innerHTML = '<span class="tw-ticker">' + item.ticker + '</span>' + convPips(item.stars);
        col.appendChild(a);
      });
    });

    return col;
  }

  twCols.appendChild(buildColumn(bulls, 'bull', 'Bull', bulls.length));
  twCols.appendChild(buildColumn(bears, 'bear', 'Bear', bears.length));
  twCols.appendChild(buildColumn(chops, 'chop', 'Other', chops.length));

  // Show panel
  panel.style.display = '';

  /* ── Signal data freshness note ── */
  var freshEl = document.getElementById('signal-freshness');
  if (freshEl && typeof SIGNALS_GENERATED !== 'undefined') {
    try {
      var d = new Date(SIGNALS_GENERATED);
      var fmt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      freshEl.textContent = 'Signal data as of ' + fmt;
      freshEl.style.display = '';
    } catch(_) {}
  }

  /* ── Signal filter bar ── */
  var filterBar = document.getElementById('signal-filter-bar');
  if (filterBar) {
    filterBar.style.display = '';
    var filterBtns = filterBar.querySelectorAll('.sig-filter-btn');
    var filterCountEl = document.getElementById('sig-filter-count');
    var activeFilter = 'all';

    function applySignalFilter(filter) {
      activeFilter = filter;
      var visible = 0, total = 0;
      var allComplete = document.querySelectorAll('.asset-card.status-complete');
      allComplete.forEach(function (card) {
        total++;
        // 'watch' = ★ Watchlist filter (v1.23): cards whose asset is starred.
        var show = filter === 'all' ||
          (filter === 'watch' ? !!(window.KptWatchlist && KptWatchlist.has(cardAssetId(card))) : card.dataset.sigType === filter);
        card.classList.toggle('sig-hidden', !show);
        if (show) visible++;
      });
      // Dim sections where all cards are hidden
      document.querySelectorAll('.grid-section').forEach(function (gs) {
        var grid = gs.nextElementSibling;
        if (!grid || !grid.classList.contains('asset-grid')) return;
        var anyVis = Array.from(grid.querySelectorAll('.asset-card.status-complete'))
                         .some(function (c) { return !c.classList.contains('sig-hidden') && !c.classList.contains('search-hidden'); });
        gs.classList.toggle('section-all-hidden', !anyVis);
      });
      if (filterCountEl) filterCountEl.textContent = filter === 'all' ? '' : visible + ' / ' + total;
      filterBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.filter === filter); });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () { applySignalFilter(btn.dataset.filter); });
    });
    // Un-starring a card while the Watchlist filter is on should drop it straight away.
    window.addEventListener('kpt-watchlist-change', function () {
      if (activeFilter === 'watch') applySignalFilter('watch');
    });
  }

  /* ── Watchlist stars on live cards (v1.23) ── */
  // Each live card is wrapped in a .kpt-card-cell with a ★ button beside (not inside)
  // the card link — a button nested in an <a> is invalid HTML. KptWatchlist comes
  // from js/site.js, which is deferred, so wait for DOMContentLoaded.
  function cardAssetId(card) {
    var m = (card.getAttribute('href') || '').match(/assets\/([^./?#]+)/);
    return m ? m[1] : null;
  }
  function addStars() {
    if (!window.KptWatchlist) return;
    document.querySelectorAll('.asset-card.status-complete').forEach(function (card) {
      var id = cardAssetId(card);
      if (!id || (card.parentElement && card.parentElement.classList.contains('kpt-card-cell'))) return;
      var cell = document.createElement('div');
      cell.className = 'kpt-card-cell';
      card.parentNode.insertBefore(cell, card);
      cell.appendChild(card);
      var label = ((card.querySelector('.card-ticker') || {}).textContent || id).trim();
      cell.appendChild(KptWatchlist.button(id, label));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addStars);
  else addStars();

  /* ── Accordion toggle ── */
  var toggle   = document.getElementById('tw-toggle');
  var body     = document.getElementById('tw-body');
  var STORE_KEY = 'kpt-tw-open';

  if (toggle && body) {
    // Restore last state (default: closed)
    var wasOpen = false;
    try { wasOpen = localStorage.getItem(STORE_KEY) === '1'; } catch(_) {}

    if (wasOpen) {
      body.classList.add('tw-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      var nowOpen = body.classList.toggle('tw-open');
      toggle.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      try { localStorage.setItem(STORE_KEY, nowOpen ? '1' : '0'); } catch(_) {}
    });
  }
})();
