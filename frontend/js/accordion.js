/**
 * accordion.js — Shared accordion builder for all seasonal dashboards.
 *
 * Depends on: ASSET_CONFIG (defined in each asset's data file) which provides:
 *   - ASSET_CONFIG.ltKey   {string}  the long-term signal key on each week object
 *                                    e.g. "s34" | "s35" | "s40"
 *   - ASSET_CONFIG.ltLabel {string}  column header for the long-term TF
 *                                    e.g. "34-YR" | "35-YR" | "40-YR"
 *   - MONTHS               {Array}   the month data array
 */

const sigClass = { bull: 'bull-tag', bear: 'bear-tag', chop: 'chop-tag', flip: 'chop-tag' };
const sigLabel  = { bull: 'Bull',    bear: 'Bear',    chop: 'Chop',    flip: 'Flip'    };

/** Render conviction as filled / empty dot pips */
function convPips(n) {
  var html = '<span class="conv-pips">';
  for (var i = 0; i < 5; i++) {
    html += '<span class="conv-pip' + (i < n ? ' filled' : '') + '"></span>';
  }
  html += '</span>';
  return html;
}

function buildAccordion() {
  const body            = document.getElementById('acc-body');
  const currentMonthIdx = new Date().getMonth(); // 0 = Jan … 11 = Dec
  const ltKey           = ASSET_CONFIG.ltKey;    // e.g. "s34"
  const ltSigKey        = ASSET_CONFIG.ltSigKey; // e.g. "sig34"
  const ltLabel         = ASSET_CONFIG.ltLabel;  // e.g. "34-YR"

  // Inject long-term column header into accordion table
  const ltHeader = document.getElementById('acc-lt-header');
  if (ltHeader) ltHeader.textContent = ltLabel;

  MONTHS.forEach((m, i) => {
    /* ── Month summary row ── */
    const trMonth = document.createElement('tr');
    trMonth.className = 'acc-row-month';
    if (i === currentMonthIdx) trMonth.classList.add('current-month');
    trMonth.dataset.idx = i;

    const ltSig = m[ltSigKey] || 'chop';

    trMonth.innerHTML = `
      <td><span class="chevron"></span>${m.month}</td>
      <td><span class="${sigClass[m.sig5]}">${sigLabel[m.sig5]}</span></td>
      <td><span class="${sigClass[m.sig15]}">${sigLabel[m.sig15]}</span></td>
      <td><span class="${sigClass[ltSig]}">${sigLabel[ltSig]}</span></td>
      <td><span class="${sigClass[m.combined]}">${m.combinedLabel}</span></td>
      <td>${convPips(m.stars)}</td>
      <td style="color:var(--dim);font-size:12px">${m.note}</td>
    `;

    /* ── Expanded weeks row ── */
    const trWeeks = document.createElement('tr');
    trWeeks.className = 'acc-row-weeks';
    trWeeks.dataset.idx = i;

    const wkRows = m.weeks.map(w => {
      const ltWkSig = w[ltKey] || 'chop';
      // Extract star count from com string (e.g. "LONG ★★★☆☆" → 3)
      const starCount = (w.com.match(/★/g) || []).length;
      return `
        <tr>
          <td>${w.wk}</td>
          <td><span class="${sigClass[w.s5]  || 'chop-tag'}">${sigLabel[w.s5]  || w.s5}</span></td>
          <td><span class="${sigClass[w.s15] || 'chop-tag'}">${sigLabel[w.s15] || w.s15}</span></td>
          <td><span class="${sigClass[ltWkSig] || 'chop-tag'}">${sigLabel[ltWkSig] || ltWkSig}</span></td>
          <td style="color:var(--text);font-weight:500;white-space:nowrap">
            ${w.com.replace(/\s*★[★☆]*/g, '')} ${convPips(starCount)}
          </td>
          <td style="color:var(--dim)">${w.note}</td>
        </tr>
      `;
    }).join('');

    trWeeks.innerHTML = `
      <td colspan="7">
        <div class="weeks-inner">
          <table class="wk-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>5-YR</th>
                <th>15-YR</th>
                <th>${ltLabel}</th>
                <th>Combined</th>
                <th>Action / Note</th>
              </tr>
            </thead>
            <tbody>${wkRows}</tbody>
          </table>
        </div>
      </td>
    `;

    trMonth.addEventListener('click', () => {
      const open = trMonth.classList.toggle('is-open');
      if (open) trWeeks.classList.add('is-open');
      else       trWeeks.classList.remove('is-open');
    });

    body.appendChild(trMonth);
    body.appendChild(trWeeks);
  });

  /* ── Auto-open current month ── */
  const curMonth = body.querySelector(`[data-idx="${currentMonthIdx}"]:not(.acc-row-weeks)`);
  const curWeeks = body.querySelector(`.acc-row-weeks[data-idx="${currentMonthIdx}"]`);
  if (curMonth && curWeeks) {
    curMonth.classList.add('is-open');
    curWeeks.classList.add('is-open');
  }

  /* ── Month Quick-Jump Row ── */
  buildQuickJump();
}

function buildQuickJump() {
  const wrap = document.querySelector('.combined-wrap');
  if (!wrap) return;

  const MONTHS_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const currentMon  = new Date().getMonth();

  const nav = document.createElement('div');
  nav.className = 'month-quickjump';

  MONTHS_ABBR.forEach(function (label, idx) {
    const btn = document.createElement('button');
    btn.className = 'qj-btn' + (idx === currentMon ? ' qj-current' : '');
    btn.textContent = label;
    btn.addEventListener('click', function () {
      // Find the month row
      const body = document.getElementById('acc-body');
      if (!body) return;
      const monthRow = body.querySelector(`.acc-row-month[data-idx="${idx}"]`);
      const weeksRow = body.querySelector(`.acc-row-weeks[data-idx="${idx}"]`);
      if (!monthRow) return;

      // Open it
      monthRow.classList.add('is-open');
      if (weeksRow) weeksRow.classList.add('is-open');

      // Scroll into view with a slight delay so it's expanded first
      setTimeout(function () {
        monthRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
    nav.appendChild(btn);
  });

  // Insert before .combined-wrap
  wrap.parentElement.insertBefore(nav, wrap);
}

// Run on load
buildAccordion();

/**
 * buildTFTables — Dynamically generates the three timeframe tables (5-YR,
 * 15-YR, long-term) from the MONTHS data array.
 *
 * Columns match the hand-built futures pages (aud.html, gbp.html, etc.):
 *   Period | Yearly Bias | Monthly Overview | Weekly Detail | Notes
 *
 * Automatically skipped on pages that already have static .table-wrap
 * elements (the 27 hand-built futures pages), so it is safe to load on all
 * 97 asset pages.
 *
 * Insertion point: immediately before #tv-chart-section (falling back to
 * .footnote), matching the canonical section order:
 *   combined accordion → AI panel → divider → 5-YR → 15-YR → LT → TV chart
 */
function buildTFTables() {
  // Skip if static TF tables are already present in the HTML
  if (document.querySelectorAll('.table-wrap').length > 0) return;

  const currentMonthIdx = new Date().getMonth();

  // Signal → CSS tag class (for Yearly Bias column)
  const TAG_CLASS = { bull: 'bull-tag', bear: 'bear-tag', chop: 'chop-tag', flip: 'chop-tag' };
  const TAG_LABEL = { bull: 'Bullish',  bear: 'Bearish',  chop: 'Choppy',   flip: 'Reversing' };

  // Signal → wk-cell class + arrow symbol (for Weekly Detail column)
  const WK_CLASS  = { bull: 'wk-bull', bear: 'wk-bear', chop: 'wk-chop', flip: 'wk-chop' };
  const WK_ARROW  = { bull: '↑',       bear: '↓',       chop: '±',       flip: '⇄'        };

  /**
   * makeTable — builds [sectionLabel, tableWrap] elements for one timeframe.
   *
   * @param {string} mSigKey    Month-level signal key  e.g. "sig5" | "sig15" | "sigLt"
   * @param {string} wSigKey    Week-level  signal key  e.g. "s5"   | "s15"   | "sLt"
   * @param {string} heading    Display label            e.g. "5-Year" | "15-Year" | "40-YR"
   * @param {string} accent     CSS color string for the section-label dot
   * @param {string} tfId       Section identifier for secondary tab system ('five'|'fifteen'|'lt')
   * @returns {[HTMLElement, HTMLElement]}
   */
  function makeTable(mSigKey, wSigKey, heading, accent, tfId) {
    // ── Section label ──────────────────────────────────────────────────────
    var sl = document.createElement('div');
    sl.className = 'section-label';
    if (tfId) sl.dataset.tfSection = tfId;
    sl.innerHTML = '<span style="background:' + accent + '"></span> ' + heading + ' Seasonal Outlook';

    // ── Table wrapper ──────────────────────────────────────────────────────
    var wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    if (tfId) wrap.dataset.tfSection = tfId;

    var tbl   = document.createElement('table');
    var thead = document.createElement('thead');
    thead.innerHTML =
      '<tr>' +
        '<th style="min-width:90px">Period</th>' +
        '<th style="min-width:100px">Yearly Bias</th>' +
        '<th>Monthly Overview</th>' +
        '<th style="min-width:220px">Weekly Detail</th>' +
        '<th>Notes</th>' +
      '</tr>';

    var tbody = document.createElement('tbody');

    MONTHS.forEach(function (m, i) {
      var tr = document.createElement('tr');
      if (i === currentMonthIdx) tr.classList.add('current-month');

      // ── Yearly Bias ──────────────────────────────────────────────────────
      var mSig    = m[mSigKey] || 'chop';
      var tagCls  = TAG_CLASS[mSig] || 'chop-tag';
      var tagLbl  = TAG_LABEL[mSig] || mSig;

      // ── Weekly Detail ─────────────────────────────────────────────────────
      var wkCells = '';
      m.weeks.forEach(function (w) {
        var sig  = w[wSigKey] || 'chop';
        var cls  = WK_CLASS[sig] || 'wk-chop';
        var arr  = WK_ARROW[sig] || '±';
        wkCells += '<div class="wk-cell ' + cls + '">' + w.wk + ' ' + arr + '</div>';
      });

      tr.innerHTML =
        '<td>' + m.month + '</td>' +
        '<td><span class="' + tagCls + '">' + tagLbl + '</span></td>' +
        '<td style="color:var(--dim);font-size:12px;line-height:1.5">' + (m.note || '') + '</td>' +
        '<td><div class="wk-grid">' + wkCells + '</div></td>' +
        '<td style="color:var(--dim);font-size:12px">' + (m.combinedLabel || '') + '</td>';

      tbody.appendChild(tr);
    });

    tbl.appendChild(thead);
    tbl.appendChild(tbody);
    wrap.appendChild(tbl);

    return [sl, wrap];
  }

  // ── Find insertion target ──────────────────────────────────────────────────
  var tvSection = document.getElementById('tv-chart-section');
  var footnote  = document.querySelector('.footnote');
  var target    = tvSection || footnote;
  if (!target) return;

  var parent = target.parentElement;

  // ── Gather ASSET_CONFIG values ────────────────────────────────────────────
  var ltSigKey = ASSET_CONFIG.ltSigKey;                   // e.g. "sig40" | "sigLt"
  var ltKey    = ASSET_CONFIG.ltKey;                      // e.g. "s40"   | "sLt"
  var ltLabel  = ASSET_CONFIG.ltLabel;                    // e.g. "40-YR" | "Long-YR"
  var ltAccent = ASSET_CONFIG.ltAccent || 'var(--accent-lt)';

  // ── Build three tables ────────────────────────────────────────────────────
  var r5  = makeTable('sig5',   's5',  '5-Year',  'var(--accent-5yr)',  'five');
  var r15 = makeTable('sig15',  's15', '15-Year', 'var(--accent-15yr)', 'fifteen');
  var rLt = makeTable(ltSigKey, ltKey, ltLabel,   ltAccent,             'lt');

  // ── Divider separating AI panel from TF tables ────────────────────────────
  var divider = document.createElement('div');
  divider.className = 'divider';

  // ── Inject all elements before the target ─────────────────────────────────
  [divider, r5[0], r5[1], r15[0], r15[1], rLt[0], rLt[1]].forEach(function (el) {
    parent.insertBefore(el, target);
  });
}

buildTFTables();
