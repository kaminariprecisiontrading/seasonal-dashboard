/**
 * track-record.js — the /track-record page (NEW_PAGES_BUILD_NOTES.md Phase 3b).
 *
 * Data: window.KPT_TRACK_RECORD (data/track_record.js), rows of
 *   [week (Monday ISO), assetIndex, signal, conviction, moveAdr, result H|M|-, source b|l, flipDir]
 * moveAdr is the raw move of the graded part of the week in ADR20 multiples (+ = up).
 *
 * Headline KPIs use live-recorded rows once 12+ live weeks are graded, otherwise all rows
 * (backfilled, in-sample) — always labelled. Periods (12W/26W/52W/All) count back from the
 * newest graded week. Misses are never hidden or rounded away.
 */
(function () {
  'use strict';
  var TR = window.KPT_TRACK_RECORD;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  if (!TR || !Array.isArray(TR.rows) || !TR.rows.length) { $('tr-fallback').hidden = false; return; }

  var S = window.KptSignals;
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var rows = TR.rows.map(function (r) {
    return { week: r[0], asset: TR.assets[r[1]], signal: r[2], conv: r[3], move: r[4], result: r[5], live: r[6] === 'l', flipDir: r[7] };
  });
  var weeksAll = Array.from(new Set(rows.map(function (r) { return r.week; }))).sort();
  var liveWeeks = Array.from(new Set(rows.filter(function (r) { return r.live && r.result !== '-'; }).map(function (r) { return r.week; })));
  var useLive = liveWeeks.length >= 12;
  var state = { weeks: '26', asset: 'all', page: 0 };
  var PAGE = 25;

  function weekLabel(iso) {   // "Oct W3"
    var d = new Date(iso + 'T12:00:00');
    return MON[d.getMonth()] + ' W' + (Math.min(3, Math.floor((d.getDate() - 1) / 7)) + 1);
  }
  function inPeriod(r) {
    if (state.weeks === 'all') return true;
    var n = +state.weeks;
    return r.week >= weeksAll[Math.max(0, weeksAll.length - n)];
  }
  function dirOf(r) { return r.signal === 'FLIP' ? r.flipDir : r.signal; }
  function pct(h, n) { return n ? Math.round(100 * h / n) + '%' : '—'; }
  function sigObj(r) { return { signal: r.signal }; }

  function kpis(set) {
    var graded = set.filter(function (r) { return r.result !== '-'; });
    var hits = graded.filter(function (r) { return r.result === 'H'; });
    var misses = graded.filter(function (r) { return r.result === 'M'; });
    function avgDir(list) {
      if (!list.length) return null;
      return list.reduce(function (s, r) { return s + (dirOf(r) === 'BEAR' ? -r.move : r.move); }, 0) / list.length;
    }
    var ah = avgDir(hits), am = avgDir(misses);
    var five = graded.filter(function (r) { return r.conv === 5; });
    var fiveH = five.filter(function (r) { return r.result === 'H'; }).length;
    function fmt(x) { return x == null ? '—' : (x >= 0 ? '+' : '−') + Math.abs(x).toFixed(1) + '×'; }
    $('tr-kpis').innerHTML =
      '<div class="tally-card tally-hl"><span class="mini-lbl">HIT RATE</span><span class="tally-num accent">' + pct(hits.length, graded.length) + '</span><span class="note">of directional signals moved the right way (' + hits.length + ' hits / ' + misses.length + ' misses)</span></div>' +
      '<div class="tally-card"><span class="mini-lbl">SIGNALS GRADED</span><span class="tally-num">' + graded.length + '</span><span class="note">BULL + BEAR + FLIP · CHOP excluded</span></div>' +
      '<div class="tally-card"><span class="mini-lbl">AVG MOVE · HIT / MISS</span><span class="tally-num"><span class="up">' + fmt(ah) + '</span> <span class="tr-slash">/</span> <span class="down">' + fmt(am) + '</span></span><span class="note">in multiples of ADR20, in the signal\'s direction</span></div>' +
      '<div class="tally-card"><span class="mini-lbl">5-DOT HIT RATE</span><span class="tally-num">' + pct(fiveH, five.length) + '</span><span class="note">does conviction actually matter? (n=' + five.length + ')</span></div>';

    var bars = '';
    for (var c = 1; c <= 5; c++) {
      var g = graded.filter(function (r) { return r.conv === c; });
      var h = g.filter(function (r) { return r.result === 'H'; }).length;
      var rate = g.length ? h / g.length : 0;
      var thin = g.length < 20;
      bars += '<div class="tr-bar-row' + (thin ? ' tr-thin' : '') + '"><span class="tr-bar-lbl">' + c + ' dot' + (c > 1 ? 's' : '') + '</span>' +
        '<span class="tr-bar" role="img" aria-label="' + c + ' dots: ' + pct(h, g.length) + ' hit rate, ' + g.length + ' signals"><span class="tr-bar-fill" style="width:' + (rate * 100).toFixed(1) + '%"></span><span class="tr-bar-50"></span></span>' +
        '<span class="tr-bar-val">' + pct(h, g.length) + ' <span class="tr-n">n=' + g.length + (thin ? ' · too few signals' : '') + '</span></span></div>';
    }
    $('tr-byconv').innerHTML = bars;
  }

  function lastWeeks(set) {
    var gradedWeeks = Array.from(new Set(set.filter(function (r) { return r.result !== '-'; }).map(function (r) { return r.week; }))).sort().slice(-12);
    var cols = '', labels = '';
    gradedWeeks.forEach(function (w) {
      var g = set.filter(function (r) { return r.week === w && r.result !== '-'; });
      var h = g.filter(function (r) { return r.result === 'H'; }).length;
      var rate = g.length ? h / g.length : 0;
      var t = weekLabel(w) + ' (week of ' + w + '): ' + pct(h, g.length) + ' · ' + h + '/' + g.length + ' signals';
      cols += '<span class="tr-col' + (rate >= 0.5 ? '' : ' tr-col-dim') + '" style="height:' + Math.max(4, rate * 160).toFixed(1) + 'px" title="' + t + '" role="img" aria-label="' + t + '"></span>';
      labels += '<span>' + weekLabel(w) + '</span>';
    });
    $('tr-weeks').innerHTML = cols;
    $('tr-week-labels').innerHTML = labels;
  }

  function log() {
    var list = rows.filter(function (r) { return inPeriod(r) && (state.asset === 'all' || r.asset.id === state.asset); })
      .sort(function (a, b) { return a.week < b.week ? 1 : a.week > b.week ? -1 : a.asset.label.localeCompare(b.asset.label); });
    var pages = Math.max(1, Math.ceil(list.length / PAGE));
    state.page = Math.min(state.page, pages - 1);
    var slice = list.slice(state.page * PAGE, state.page * PAGE + PAGE);
    $('tr-log').innerHTML = slice.map(function (r) {
      var res = r.result === 'H' ? '<span class="up">✓ HIT</span>' : r.result === 'M' ? '<span class="down">✗ MISS</span>' : '<span class="flat">— NOT GRADED</span>';
      var mv = (r.move >= 0 ? '+' : '−') + Math.abs(r.move).toFixed(2) + '×' + (r.signal === 'FLIP' && r.flipDir ? ' <span class="tr-n">2nd half · ' + r.flipDir + '</span>' : '');
      return '<tr><td class="mono">' + r.week + '</td><td><a href="/assets/' + r.asset.id + '.html">' + esc(r.asset.label) + '</a></td><td>' +
        (S ? S.pill(sigObj(r)) : r.signal) + '</td><td>' + (S ? S.convDots(r.conv) : r.conv) + '</td><td class="mono">' + mv + '</td><td class="mono">' + res + '</td><td>' +
        '<span class="src ' + (r.live ? 'src-live">LIVE' : 'src-back">BACKFILL') + '</span></td></tr>';
    }).join('') || '<tr><td colspan="7" class="note">No signals in this period.</td></tr>';
    $('tr-page').textContent = list.length ? ('Rows ' + (state.page * PAGE + 1) + '–' + Math.min(list.length, (state.page + 1) * PAGE) + ' of ' + list.length) : '';
    $('tr-prev').disabled = state.page === 0;
    $('tr-next').disabled = state.page >= pages - 1;
  }

  function render() {
    var period = rows.filter(inPeriod);
    var headline = useLive ? period.filter(function (r) { return r.live; }) : period;
    $('tr-basis').innerHTML = useLive
      ? 'Headline figures: <span class="src src-live">LIVE</span> live-recorded signals only (' + liveWeeks.length + ' graded weeks so far).'
      : 'Headline figures: <span class="src src-back">BACKFILL</span> in-sample results graded with today\'s seasonal data. Live-recorded history ' +
        (liveWeeks.length ? 'has ' + liveWeeks.length + ' graded week' + (liveWeeks.length === 1 ? '' : 's') : 'started with the first weekly snapshot and has no graded weeks yet') +
        '; the headline switches to it once it reaches 12 weeks.';
    kpis(headline);
    lastWeeks(headline);
    log();
  }

  /* Controls */
  TR.assets.forEach(function (a) { var o = document.createElement('option'); o.value = a.id; o.textContent = a.label; $('tr-asset').appendChild(o); });
  $('tr-period').addEventListener('click', function (e) {
    var b = e.target.closest('[data-weeks]'); if (!b) return;
    state.weeks = b.getAttribute('data-weeks'); state.page = 0;
    $('tr-period').querySelectorAll('[data-weeks]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    render();
  });
  $('tr-asset').addEventListener('change', function () { state.asset = this.value; state.page = 0; log(); });
  $('tr-prev').addEventListener('click', function () { state.page--; log(); });
  $('tr-next').addEventListener('click', function () { state.page++; log(); });

  $('tr-scope').textContent = 'Scope: ' + TR.assets.map(function (a) { return a.label; }).join(', ') + '. Weeks from ' + TR.since +
    ' to ' + weeksAll[weeksAll.length - 1] + ' (price data as of ' + TR.asOf + '). Graded ' + TR.generatedAt.slice(0, 10) + '.';
  $('tr-content').hidden = false;
  render();
})();
