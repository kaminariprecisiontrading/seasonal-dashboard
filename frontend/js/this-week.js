/**
 * this-week.js — the /this-week digest (NEW_PAGES_BUILD_NOTES.md Phase 2).
 *
 * Everything is computed from data/signals_manifest.js through js/signals.js — the same
 * mapping the dashboard uses, so the two always agree for a given week. Planned
 * (not live) assets are excluded everywhere (KptSignals.liveAssets()).
 *
 *  - Week: current week by default; ‹ › browse ±1 week (Wk4 → next month Wk1,
 *    Dec → Jan of the next year), reflected in the URL as ?w=YYYY-M-W.
 *  - Tallies: BULL / BEAR / OTHER for the week + change vs the previous week;
 *    "Signals changed" = assets whose signal label differs from the previous week.
 *  - Signals that flipped: those assets, previous → current, by conviction
 *    (highest first); top 6, "See all N" expands the rest.
 *  - New max conviction: conviction 5 this week and below 5 last week.
 *  - Coming up: each of the next 4 weeks, the top 3 BULL/BEAR assets with conviction
 *    ≥ 4 ("Nothing above 3 dots" when none).
 *  - Watchlist: starred assets (KptWatchlist, js/site.js) for the selected week.
 */
(function () {
  'use strict';
  var S = window.KptSignals;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  if (!S || !S.hasManifest() || !window.KPT_ASSETS || !S.liveAssets().length) { $('tw-fallback').hidden = false; return; }

  var MON = S.MONTH_ABBR;
  var live = S.liveAssets().filter(function (a) { return S.getSignal(a.id, 0, 0); });
  var params = new URLSearchParams(location.search);
  var week = S.parseWeekParam(params.get('w')) || S.currentWeek();

  function title(w) { return MON[w.month] + ' Wk' + (w.week + 1) + ' · ' + w.year; }
  function shortLabel(w) { return MON[w.month].toUpperCase() + ' WK' + (w.week + 1); }
  function nameCell(a) {
    return '<span class="row-name"><span class="row-title">' + esc(S.displayName(a)) + '</span><span class="row-sub">' + esc(S.subLabel(a)) + '</span></span>';
  }
  function href(a) { return S.assetHref(a.id, '/'); }

  function render() {
    var prev = S.shiftWeek(week, -1);
    document.title = 'KPT Seasonals — This Week · ' + title(week);
    $('tw-h1').textContent = title(week);

    var rows = live.map(function (a) {
      return { a: a, now: S.getSignal(a.id, week.month, week.week), before: S.getSignal(a.id, prev.month, prev.week) };
    });

    /* Tallies */
    var t = S.tally(week.month, week.week), tp = S.tally(prev.month, prev.week);
    var changed = rows.filter(function (r) { return r.now.signal !== r.before.signal; });
    function delta(n, p, cls) {
      var d = n - p;
      return '<span class="tally-delta ' + cls + '">' + (d > 0 ? '▲ ' + d : d < 0 ? '▼ ' + (-d) : '= no change') + (d ? ' vs last week' : '') + '</span>';
    }
    $('tw-tallies').innerHTML =
      '<div class="tally-card"><span class="pill bull">BULL</span><span class="tally-num">' + t.bull + '</span>' + delta(t.bull, tp.bull, 'up') + '</div>' +
      '<div class="tally-card"><span class="pill bear">BEAR</span><span class="tally-num">' + t.bear + '</span>' + delta(t.bear, tp.bear, 'down') + '</div>' +
      '<div class="tally-card"><span class="pill chop">OTHER</span><span class="tally-num">' + t.other + '</span>' + delta(t.other, tp.other, 'flat') + '</div>' +
      '<div class="tally-card tally-hl"><span class="mini-lbl">SIGNALS CHANGED</span><span class="tally-num accent">' + changed.length + '</span><span class="tally-delta flat">of ' + t.total + ' assets</span></div>';

    /* Signals that flipped */
    changed.sort(function (x, y) { return y.now.conviction - x.now.conviction; });
    var TOP = 6;
    function flipRow(r, extra) {
      return '<a class="flip-row' + (extra ? ' flip-extra' : '') + '" href="' + href(r.a) + '"' + (extra ? ' hidden' : '') + '>' + nameCell(r.a) +
        '<span class="flip-from">' + S.pill(r.before) + '</span><span class="flip-arrow" aria-hidden="true">→</span>' + S.pill(r.now) +
        '<span class="visually-hidden">, changed from ' + r.before.signal + ' to ' + r.now.signal + '</span></a>';
    }
    var flipsHtml = changed.length
      ? changed.map(function (r, i) { return flipRow(r, i >= TOP); }).join('')
      : '<p class="note empty">No signal changed from last week.</p>';
    if (changed.length > TOP) flipsHtml += '<button type="button" class="see-all" id="tw-see-all" aria-expanded="false">See all ' + changed.length + ' changes →</button>';
    $('tw-flips').innerHTML = flipsHtml;
    var seeAll = $('tw-see-all');
    if (seeAll) seeAll.addEventListener('click', function () {
      var open = seeAll.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.flip-extra').forEach(function (el) { el.hidden = !open; });
      seeAll.setAttribute('aria-expanded', open ? 'true' : 'false');
      seeAll.textContent = open ? 'Show top ' + TOP + ' only' : 'See all ' + changed.length + ' changes →';
    });

    /* New max conviction */
    var maxNew = rows.filter(function (r) { return r.now.conviction === 5 && r.before.conviction < 5; });
    $('tw-maxconv').innerHTML = maxNew.length
      ? maxNew.map(function (r) {
          return '<a class="mc-row" href="' + href(r.a) + '"><span class="row-title">' + esc(S.displayName(r.a)) + '</span><span class="mc-sig">' + S.convDots(5) + S.pill(r.now) + '</span></a>';
        }).join('')
      : '<p class="note empty">No new five-dot signals this week.</p>';

    /* Coming up: next 4 weeks */
    var up = '';
    for (var i = 1; i <= 4; i++) {
      var w = S.shiftWeek(week, i);
      var top = live.map(function (a) { return { a: a, s: S.getSignal(a.id, w.month, w.week) }; })
        .filter(function (x) { return x.s.conviction >= 4 && (x.s.type === 'bull' || x.s.type === 'bear'); })
        .sort(function (x, y) { return y.s.conviction - x.s.conviction; })
        .slice(0, 3);
      up += '<div class="up-col"><span class="mini-lbl">' + shortLabel(w) + '</span>' +
        (top.length ? top.map(function (x) {
          return '<a class="up-row" href="' + href(x.a) + '"><span class="row-title">' + esc(S.displayName(x.a)) + '</span><span class="mc-sig">' + S.convDots(x.s.conviction) + S.pill(x.s) + '</span></a>';
        }).join('') : '<p class="note empty">Nothing above 3 dots</p>') + '</div>';
    }
    $('tw-upcoming').innerHTML = up;

    renderWatchlist();
    $('tw-content').hidden = false;
  }

  function renderWatchlist() {
    var ids = window.KptWatchlist ? KptWatchlist.get() : [];
    var items = ids.map(function (id) { return S.asset(id); }).filter(function (a) { return a && a.status === 'live'; });
    $('tw-watchlist').innerHTML = items.length
      ? items.map(function (a) {
          var s = S.getSignal(a.id, week.month, week.week);
          return '<div class="wl-card"><a class="wl-link" href="' + href(a) + '">' + nameCell(a) +
            '<span class="wl-sig">' + S.pill(s) + S.convDots(s.conviction) + '</span></a></div>';
        }).join('')
      : '<p class="note empty">Star any asset card to add it here.</p>';
    // ★ toggles on each watchlist card (un-star from here too)
    document.querySelectorAll('#tw-watchlist .wl-card').forEach(function (card, i) {
      card.appendChild(KptWatchlist.button(items[i].id, S.displayName(items[i])));
    });
  }

  function go(n) {
    week = S.shiftWeek(week, n);
    var url = new URL(location.href);
    url.searchParams.set('w', S.weekParam(week));
    history.replaceState(null, '', url.pathname + url.search);
    render();
  }
  $('tw-prev').addEventListener('click', function () { go(-1); });
  $('tw-next').addEventListener('click', function () { go(1); });
  window.addEventListener('kpt-watchlist-change', renderWatchlist);

  render();
})();
