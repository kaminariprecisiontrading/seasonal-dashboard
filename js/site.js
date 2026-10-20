/**
 * site.js — the site-wide "chrome": primary nav, site footer, and the Embeds
 * setting. Loaded (defer) on every page: landing, dashboard, all asset pages,
 * the legal pages and the new pages. Styles: css/chrome.css.
 *
 *  - Nav: rendered into a `<header data-kpt-nav></header>` placeholder if the page
 *    has one (landing, dashboard, new pages, legal pages). Asset pages keep their
 *    own topbar and don't get the primary nav.
 *  - Footer: rendered into `<footer data-kpt-footer></footer>` if present,
 *    otherwise appended to <body>. If the page already carries the dual
 *    attribution span (`.copyright`, every asset page + the dashboard), the footer
 *    leaves it out instead of repeating it.
 *  - Embeds setting (`kpt-embeds`: "always" | "ask"): read/written through
 *    window.KptEmbeds; every change fires a `kpt-embeds-change` event so the
 *    footer <select> and the click-to-load placeholders stay in sync.
 *
 * Links are root-absolute (/dashboard, /risk, ...) — served by the 200 rewrites
 * in netlify.toml. For local preview use `node scripts/serve_local.js`, which
 * applies the same rewrites.
 */
(function () {
  'use strict';

  /* ── Single source of truth for operator/site facts ───────────────────── */
  var SITE = window.KPT_SITE = {
    OPERATOR_NAME: 'G T',
    PUBLISHER: 'Kaminari Precision Trading',
    SITE_NAME: 'Kaminari Seasonals Dashboard',
    CONTACT_EMAIL: 'kaminariprecisiontrading@gmail.com',
    REPO_URL: 'https://github.com/kaminariprecisiontrading/seasonal-dashboard'
  };

  /* ── Storage that never throws (blocked storage, private mode, ...) ───── */
  function store(kind) {
    return {
      get: function (k) { try { return window[kind].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window[kind].setItem(k, v); return true; } catch (e) { return false; } },
      remove: function (k) { try { window[kind].removeItem(k); } catch (e) { /* blocked */ } }
    };
  }
  window.KptStore = { local: store('localStorage'), session: store('sessionStorage') };

  /* ── Embeds setting ───────────────────────────────────────────────────── */
  var EMBEDS_KEY = 'kpt-embeds';
  window.KptEmbeds = {
    get: function () { return KptStore.local.get(EMBEDS_KEY) === 'always' ? 'always' : 'ask'; },
    set: function (v) {
      v = v === 'always' ? 'always' : 'ask';
      if (v === 'always') KptStore.local.set(EMBEDS_KEY, 'always'); else KptStore.local.remove(EMBEDS_KEY);
      window.dispatchEvent(new CustomEvent('kpt-embeds-change', { detail: { value: this.get() } }));
    }
  };
  // Another tab changed it.
  window.addEventListener('storage', function (e) {
    if (e.key === EMBEDS_KEY) window.dispatchEvent(new CustomEvent('kpt-embeds-change', { detail: { value: KptEmbeds.get() } }));
  });

  /* ── Routes ───────────────────────────────────────────────────────────── */
  var NAV = [
    ['/dashboard', 'Dashboard'],
    ['/this-week', 'This Week'],
    ['/heatmap', 'Heatmap'],
    ['/track-record', 'Track Record'],
    ['/methodology', 'Methodology']
  ];
  var LEGAL = [
    ['/risk', 'Risk Disclosure'],
    ['/terms', 'Terms'],
    ['/privacy', 'Privacy'],
    ['/sources', 'Data Sources'],
    ['/about', 'About &amp; Contact']
  ];

  function currentRoute() {
    var p = location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/+$/, '');
    return p === '' ? '/' : p;
  }

  var LOGO = '<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>';

  function renderNav() {
    var host = document.querySelector('[data-kpt-nav]');
    if (!host) return;
    var here = currentRoute();
    host.classList.add('kpt-sitenav');
    host.innerHTML =
      '<nav class="kpt-sitenav-inner" aria-label="Primary">' +
        '<a class="kpt-sitenav-brand" href="/">' + LOGO + '<span>KPT Seasonals</span></a>' +
        '<div class="kpt-sitenav-links">' +
          NAV.map(function (n) {
            return '<a href="' + n[0] + '"' + (here === n[0] ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
          }).join('') +
        '</div>' +
      '</nav>';
  }

  function renderFooter() {
    var host = document.querySelector('[data-kpt-footer]');
    if (!host) {
      host = document.createElement('footer');
      document.body.appendChild(host);
    }
    host.classList.add('kpt-sitefoot');
    var hasAttribution = !!document.querySelector('.copyright');
    var year = 2026;
    var note =
      'Historical patterns only · Not financial advice. Seasonal tendencies describe what has happened, not what will happen. ' +
      SITE.SITE_NAME + ' is a free personal project by ' + SITE.OPERATOR_NAME + ', published as ' + SITE.PUBLISHER + '.' +
      (hasAttribution ? '' :
        ' <span class="copyright" style="color:#8b93a1;">Futures seasonal data: Moore Research Center © 2020 · © ' + year + ' ' + SITE.PUBLISHER + '.</span>');
    host.innerHTML =
      '<div class="kpt-sitefoot-inner">' +
        '<div class="kpt-sitefoot-row">' +
          '<span class="kpt-sitefoot-brand">' + SITE.PUBLISHER + '</span>' +
          '<nav class="kpt-sitefoot-links" aria-label="Site">' +
            '<a href="/dashboard">Dashboard</a>' +
            '<a href="' + SITE.REPO_URL + '">GitHub</a>' +
            NAV.slice(1).map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join('') +
          '</nav>' +
        '</div>' +
        '<div class="kpt-sitefoot-row">' +
          '<nav class="kpt-sitefoot-links" aria-label="Legal">' +
            LEGAL.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join('') +
          '</nav>' +
          '<label class="kpt-sitefoot-embeds">Embeds' +
            '<select data-kpt-embeds-select aria-label="Third-party embeds">' +
              '<option value="ask">Ask each time</option><option value="always">Always load</option>' +
            '</select>' +
          '</label>' +
        '</div>' +
        '<p class="kpt-sitefoot-note">' + note + '</p>' +
      '</div>';

    var sel = host.querySelector('[data-kpt-embeds-select]');
    sel.value = KptEmbeds.get();
    sel.addEventListener('change', function () { KptEmbeds.set(sel.value); });
    window.addEventListener('kpt-embeds-change', function (e) { sel.value = e.detail.value; });
  }

  // Dashboard-styled pages pad <body> (css/dashboard.css: 32px 24px); cancel that
  // padding so the nav/footer still run edge to edge, whatever the page's padding is.
  function fullBleed(el, where) {
    if (!el || el.parentElement !== document.body) return;
    var cs = getComputedStyle(document.body);
    var l = parseFloat(cs.paddingLeft) || 0, r = parseFloat(cs.paddingRight) || 0;
    if (!l && !r && !parseFloat(cs.paddingTop) && !parseFloat(cs.paddingBottom)) return;
    el.style.marginLeft = -l + 'px';
    el.style.marginRight = -r + 'px';
    if (where === 'top') { el.style.marginTop = -(parseFloat(cs.paddingTop) || 0) + 'px'; el.style.marginBottom = '32px'; }
    else el.style.marginBottom = -(parseFloat(cs.paddingBottom) || 0) + 'px';
  }

  function init() {
    renderNav();
    renderFooter();
    fullBleed(document.querySelector('[data-kpt-nav]'), 'top');
    fullBleed(document.querySelector('.kpt-sitefoot'), 'bottom');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
