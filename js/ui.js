/**
 * ui.js — Asset page UI enhancements.
 *
 * Features:
 *  1. Date chip in topbar ("Week N · Month Year")
 *  2. Prev / Next asset navigation buttons in topbar
 *  3. Tab layout — Seasonals · Chart · Analysis
 *  4. Legend collapsible toggle
 *
 * Depends on: ASSET_CONFIG.id (from each asset's data file, loaded before this).
 * Safe to load on pages without an accordion — all DOM checks are guarded.
 */

(function () {

  /* ─── Full ordered asset list ─────────────────────────────────────────── */
  /* Assets are grouped by category for prev/next navigation within-category. */
  var ASSET_CATEGORIES = [
    { label: 'Currencies',
      ids: ['aud','usd','jpy','gbp','cad','eur','chf','nzd','mxn','brl'] },
    { label: 'Metals',
      ids: ['xau','xag','copper','platinum','palladium'] },
    { label: 'Energy',
      ids: ['cl','brent','ng','ulsd','rb','gasoil'] },
    { label: 'Interest Rates',
      ids: ['tbonds','tnotes10','tnotes5','tnotes2','eurodollar',
            'austbonds10','austbonds3','austbills3m','longgilt','shortsterling',
            'eurobund','eurobobl','euroyen','fedfunds'] },
    { label: 'Indices',
      ids: ['sp500','es','rty','ym','nq','md','gsci','nk','ftse','spi','dax','cac','hsi'] },
    { label: 'Softs',
      ids: ['coffee','sugar11','cocoa','oj','roughrice','londonsugar','londoncocoa','robusta'] },
    { label: 'Grains',
      ids: ['soybeans','sbmeal','sboil','wheat','wheatk','wheatm','corn','oats'] },
    { label: 'Fiber & Meats',
      ids: ['cotton','lumber','lc','fc','lh','milk'] },
    { label: 'FX Majors',
      ids: ['fx-audusd','fx-eurusd','fx-gbpusd','fx-usdcad','fx-usdchf','fx-usdjpy'] },
    { label: 'FX Minors',
      ids: ['fx-audcad','fx-audchf','fx-audnzd','fx-euraud','fx-eurchf',
            'fx-eurgbp','fx-gbpaud','fx-gbpchf','fx-nzdusd'] },
    { label: 'FX Crosses',
      ids: ['fx-audjpy','fx-cadchf','fx-cadjpy','fx-eurcad','fx-eurjpy','fx-eurnzd',
            'fx-gbpcad','fx-gbpjpy','fx-gbpnzd','fx-nzdcad','fx-nzdchf','fx-nzdjpy'] }
  ];

  /* ─── Week-of-year helper ─────────────────────────────────────────────── */
  function getISOWeek(d) {
    var date = new Date(d);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var jan4 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date - jan4) / 86400000 - 3 + (jan4.getDay() + 6) % 7) / 7);
  }

  /* ─── Helpers ─────────────────────────────────────────────────────────── */
  function weekOfMonth(date) {
    return Math.min(4, Math.floor((date.getDate() - 1) / 7) + 1);
  }

  var MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* ─── Early exit if not an asset page ─────────────────────────────────── */
  var currentId = (typeof ASSET_CONFIG !== 'undefined') ? ASSET_CONFIG.id : null;
  if (!currentId) return;

  /* ─── 1. TOPBAR — Date chip + title fill + prev/next ──────────────────── */
  var topbar = document.querySelector('.topbar');

  // Auto-populate empty topbar title for hand-built pages
  if (topbar) {
    var titleSpan = topbar.querySelector('.topbar-title');
    if (titleSpan && !titleSpan.textContent.trim()) {
      var h1 = document.querySelector('.header h1');
      if (h1) titleSpan.textContent = h1.textContent;
    }
  }

  // Date chip
  var now = new Date();
  var dateChipText = 'WK ' + weekOfMonth(now) + ' · ' +
                     MONTH_ABBR[now.getMonth()].toUpperCase() + ' ' + now.getFullYear();

  if (topbar) {
    var chip = document.createElement('span');
    chip.className = 'topbar-date-chip';
    chip.textContent = dateChipText;
    topbar.appendChild(chip);
  }

  // Prev / Next nav buttons
  var currentCat = null;
  var currentIdx = -1;
  for (var ci = 0; ci < ASSET_CATEGORIES.length; ci++) {
    var catIdx = ASSET_CATEGORIES[ci].ids.indexOf(currentId);
    if (catIdx !== -1) {
      currentCat = ASSET_CATEGORIES[ci];
      currentIdx = catIdx;
      break;
    }
  }

  if (topbar && currentCat) {
    var prevId = currentIdx > 0 ? currentCat.ids[currentIdx - 1] : null;
    var nextId = currentIdx < currentCat.ids.length - 1 ? currentCat.ids[currentIdx + 1] : null;

    var navWrap = document.createElement('div');
    navWrap.className = 'asset-nav';

    if (prevId) {
      var prevBtn = document.createElement('a');
      prevBtn.className = 'asset-nav-btn';
      prevBtn.href = prevId + '.html';
      prevBtn.innerHTML = '&#8592; Prev';
      prevBtn.title = prevId;
      navWrap.appendChild(prevBtn);
    }
    if (nextId) {
      var nextBtn = document.createElement('a');
      nextBtn.className = 'asset-nav-btn';
      nextBtn.href = nextId + '.html';
      nextBtn.innerHTML = 'Next &#8594;';
      nextBtn.title = nextId;
      navWrap.appendChild(nextBtn);
    }

    // Insert nav before the date chip
    if (navWrap.children.length > 0) {
      topbar.insertBefore(navWrap, chip);
    }
  }

  // "Print this tab" button — triggers single-panel print mode
  if (topbar) {
    var printBtn = document.createElement('button');
    printBtn.className = 'topbar-print-btn';
    printBtn.title = 'Print current tab only (use browser Print for all panels)';
    printBtn.innerHTML = '&#128438; Print tab';
    printBtn.addEventListener('click', function () {
      document.body.classList.add('print-single-tab');
      window.print();
      // Remove class after print dialog closes (slight delay for Safari)
      setTimeout(function () { document.body.classList.remove('print-single-tab'); }, 1000);
    });
    topbar.appendChild(printBtn);
  }

  /* ─── 2. LEGEND COLLAPSIBLE ────────────────────────────────────────────── */
  var legend = document.querySelector('.legend');
  if (legend) {
    var legendParent = legend.parentElement;

    // Create header wrapper
    var legendHeader = document.createElement('div');
    legendHeader.className = 'legend-header';

    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'legend-toggle-btn';
    toggleBtn.textContent = 'Hide';

    legendHeader.appendChild(toggleBtn);
    legendParent.insertBefore(legendHeader, legend);

    var collapsed = false;
    toggleBtn.addEventListener('click', function () {
      collapsed = !collapsed;
      if (collapsed) {
        legend.style.display = 'none';
        toggleBtn.textContent = 'Legend';
      } else {
        legend.style.display = '';
        toggleBtn.textContent = 'Hide';
      }
    });
  }

  /* ─── 3. TAB LAYOUT ─────────────────────────────────────────────────────── */
  var combinedWrap = document.querySelector('.combined-wrap');
  var aiPanel      = document.querySelector('.ai-panel');
  var tvSection    = document.getElementById('tv-chart-section');

  if (!combinedWrap && !aiPanel && !tvSection) return; // no tabbed content

  // Collect all .divider elements in the page scope (inside container or at body)
  var scope = document.querySelector('.container') || document.body;
  var dividers = Array.from(scope.querySelectorAll('.divider'));

  // Walk backwards from an element to collect immediately-preceding section-labels and <p>
  function collectPreceding(el) {
    var result = [];
    var sib = el.previousElementSibling;
    while (sib) {
      if (sib.classList.contains('section-label') || sib.tagName === 'P') {
        result.unshift(sib);
        sib = sib.previousElementSibling;
      } else {
        break;
      }
    }
    return result;
  }

  // Mark elements with a panel group
  function markPanel(el, panelName) {
    if (!el) return;
    el.dataset.kptPanel = panelName;
  }

  // Mark the combined (seasonals) section
  var seasonalHeaders = collectPreceding(combinedWrap || aiPanel);
  seasonalHeaders.forEach(function (el) { markPanel(el, 'seasonals'); });
  markPanel(combinedWrap, 'seasonals');

  // Mark any .table-wrap sections (TF tables, hand-built files) as seasonals
  // These appear after the combined-wrap, before the AI panel
  var tableWraps = Array.from(scope.querySelectorAll('.table-wrap'));
  tableWraps.forEach(function (tw) {
    var twHeaders = collectPreceding(tw);
    twHeaders.forEach(function (el) { markPanel(el, 'seasonals'); });
    markPanel(tw, 'seasonals');
  });

  // Mark analysis section
  if (aiPanel) {
    var aiHeaders = collectPreceding(aiPanel);
    aiHeaders.forEach(function (el) { markPanel(el, 'analysis'); });
    markPanel(aiPanel, 'analysis');
  }

  // Mark chart section
  markPanel(tvSection, 'chart');

  // Hide dividers (tabs replace visual separation)
  dividers.forEach(function (d) {
    // Only hide if it's adjacent to tabbed content (not inside .footnote etc.)
    d.classList.add('kpt-divider-hidden');
  });

  // Build the tab bar
  var tabs = [
    { id: 'seasonals', label: 'Seasonals'  },
    { id: 'scurve',    label: 'Trend'      },
    { id: 'profiling', label: 'Profiling'  },
    { id: 'chart',     label: 'Live Price' },
    { id: 'macro',     label: 'Macro'      },
    { id: 'upload',    label: 'Upload'     },
    { id: 'analysis',  label: 'Analysis'   }
  ];

  // Only include tabs that have content
  tabs = tabs.filter(function (t) {
    return scope.querySelector('[data-kpt-panel="' + t.id + '"]');
  });

  if (tabs.length < 2) {
    // Not enough panels to tab — remove marks and abort
    scope.querySelectorAll('[data-kpt-panel]').forEach(function (el) {
      delete el.dataset.kptPanel;
    });
    dividers.forEach(function (d) { d.classList.remove('kpt-divider-hidden'); });
    return;
  }

  // Declared here so activateTab (hoisted) can reference it via closure.
  // Assigned later once the secondary tab bar is built.
  var subBar = null;

  var tabBar = document.createElement('div');
  tabBar.className = 'kpt-tabs';
  tabs.forEach(function (t, i) {
    var btn = document.createElement('button');
    btn.className = 'kpt-tab-btn' + (i === 0 ? ' active' : '');
    btn.dataset.tab = t.id;
    btn.textContent = t.label;
    btn.addEventListener('click', function () { activateTab(t.id); });
    tabBar.appendChild(btn);
  });

  // Insert tab bar: find the first element marked as a panel (earliest in DOM)
  var allPanelEls = Array.from(scope.querySelectorAll('[data-kpt-panel]'));
  if (allPanelEls.length > 0) {
    allPanelEls[0].parentElement.insertBefore(tabBar, allPanelEls[0]);
  }

  // Activate first tab initially (subBar is null here — that's fine)
  activateTab(tabs[0].id);

  /* ─── 4. SECONDARY TABS — TF selector within Seasonals ──────────────────── */
  (function () {
    var allTableWraps = Array.from(scope.querySelectorAll('.table-wrap'));
    if (allTableWraps.length < 3) return; // no individual TF tables on this page

    // ── Ensure table-wraps are tagged (hand-built pages have no data-tf-section) ──
    var tfOrder = ['five', 'fifteen', 'lt'];
    allTableWraps.slice(0, 3).forEach(function (tw, i) {
      if (!tw.dataset.tfSection) tw.dataset.tfSection = tfOrder[i];
    });

    // ── Also tag the preceding section-labels on hand-built pages ────────────
    allTableWraps.slice(0, 3).forEach(function (tw) {
      var tfId = tw.dataset.tfSection;
      var sib = tw.previousElementSibling;
      while (sib && sib.classList.contains('section-label')) {
        sib.dataset.tfSection = tfId;
        sib = sib.previousElementSibling;
      }
    });

    // ── Build element groups ──────────────────────────────────────────────────
    // TF groups — each is [section-label, table-wrap]
    var tfGroups = {};
    allTableWraps.slice(0, 3).forEach(function (tw) {
      var id = tw.dataset.tfSection;
      var sls = Array.from(scope.querySelectorAll('.section-label[data-tf-section="' + id + '"]'));
      tfGroups[id] = sls.concat([tw]);
    });

    // Combined group — everything that belongs to the accordion section:
    // Walk backwards from .month-quickjump to collect its preceding section-label/p;
    // then include quickjump and combined-wrap themselves.
    var combinedGroupEls = [];
    var qj = scope.querySelector('.month-quickjump');
    var anchor = qj || combinedWrap;
    if (anchor) {
      collectPreceding(anchor).forEach(function (el) { combinedGroupEls.push(el); });
      if (qj) combinedGroupEls.push(qj);
    }
    if (combinedWrap) combinedGroupEls.push(combinedWrap);

    // ── Sub-tab definitions ───────────────────────────────────────────────────
    var ltCfgLabel  = ASSET_CONFIG.ltLabel  || 'Long-term';
    var ltCfgAccent = ASSET_CONFIG.ltAccent || 'var(--accent-lt)';

    var subTabDefs = [
      { id: 'combined', label: 'Combined', color: 'var(--accent-combined)' },
      { id: 'five',     label: '5-YR',     color: 'var(--accent-5yr)'      },
      { id: 'fifteen',  label: '15-YR',    color: 'var(--accent-15yr)'     },
      { id: 'lt',       label: ltCfgLabel, color: ltCfgAccent              }
    ];

    // ── Activate a sub-tab ────────────────────────────────────────────────────
    function activateSubTab(subId) {
      // Combined group visibility
      combinedGroupEls.forEach(function (el) {
        el.style.display = (subId === 'combined') ? '' : 'none';
      });
      // TF group visibility
      tfOrder.forEach(function (id) {
        var show = (id === subId);
        (tfGroups[id] || []).forEach(function (el) {
          el.style.display = show ? '' : 'none';
        });
      });
      // Button active styles (color-coded by TF)
      if (subBar) {
        subBar.querySelectorAll('.kpt-subtab-btn').forEach(function (btn) {
          var active = (btn.dataset.subtab === subId);
          btn.classList.toggle('active', active);
          btn.style.color             = active ? btn.dataset.color : '';
          btn.style.borderBottomColor = active ? btn.dataset.color : '';
        });
      }
      try { localStorage.setItem('kpt-sub-' + currentId, subId); } catch (e) {}
    }

    // ── Build the sub-tab bar ─────────────────────────────────────────────────
    subBar = document.createElement('div');
    subBar.className = 'kpt-tabs kpt-subtabs';

    subTabDefs.forEach(function (t) {
      var btn = document.createElement('button');
      btn.className = 'kpt-tab-btn kpt-subtab-btn';
      btn.dataset.subtab = t.id;
      btn.dataset.color  = t.color;
      btn.textContent    = t.label;
      btn.addEventListener('click', function () { activateSubTab(t.id); });
      subBar.appendChild(btn);
    });

    // Insert subBar immediately after the primary tabBar so hierarchy is
    // visually correct: primary tabs on top, secondary tabs below.
    // (Inserting before combinedGroupEls[0] placed it above tabBar in the
    // DOM because the "Combined Bias" section-label precedes the first
    // kpt-panel element where tabBar was inserted — inverting the hierarchy.)
    tabBar.parentElement.insertBefore(subBar, tabBar.nextSibling);

    // Restore persisted sub-tab or default to 'combined'
    var savedSub = null;
    try { savedSub = localStorage.getItem('kpt-sub-' + currentId); } catch (e) {}
    activateSubTab(savedSub || 'combined');

    // subBar is now set — show it (we're on Seasonals tab by default)
    subBar.style.display = (tabs[0].id === 'seasonals') ? 'flex' : 'none';
  }());

  function activateTab(panelId) {
    // Buttons
    tabBar.querySelectorAll('.kpt-tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === panelId);
    });
    // Panels
    scope.querySelectorAll('[data-kpt-panel]').forEach(function (el) {
      el.classList.toggle('kpt-panel-active', el.dataset.kptPanel === panelId);
    });
    // Show secondary tab bar only while Seasonals is active
    if (subBar) subBar.style.display = (panelId === 'seasonals') ? 'flex' : 'none';
    // Resize Chart.js canvas when Upload tab becomes visible
    if (panelId === 'upload' && typeof window.kptUpRefresh === 'function') {
      window.kptUpRefresh();
    }
    // When switching to chart tab — re-trigger layout so TradingView iframe renders
    if (panelId === 'chart' && tvSection) {
      var inner = tvSection.querySelector('.tv-widget-inner');
      if (inner) {
        inner.style.display = 'none';
        // Force reflow
        void inner.offsetHeight;
        inner.style.display = '';
      }
    }
  }

})();
