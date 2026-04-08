/**
 * accordion.js — Shared accordion builder for all seasonal dashboards.
 *
 * Depends on: ASSET_CONFIG (defined in each asset's data file) which provides:
 *   - ASSET_CONFIG.ltKey  {string}  the long-term signal key on each week object
 *                                   e.g. "s34" | "s35" | "s40"
 *   - ASSET_CONFIG.ltLabel {string} column header for the long-term TF
 *                                   e.g. "34-YR" | "35-YR" | "40-YR"
 *   - MONTHS               {Array}  the month data array
 */

const sigClass = { bull: "bull-tag", bear: "bear-tag", chop: "chop-tag", flip: "chop-tag" };
const sigLabel  = { bull: "Bull",    bear: "Bear",    chop: "Chop",    flip: "Flip"    };
const stars = n => "★".repeat(n) + "☆".repeat(5 - n);

function buildAccordion() {
  const body            = document.getElementById("acc-body");
  const currentMonthIdx = new Date().getMonth(); // 0 = Jan … 11 = Dec
  const ltKey           = ASSET_CONFIG.ltKey;    // e.g. "s34"
  const ltSigKey        = ASSET_CONFIG.ltSigKey; // e.g. "sig34"
  const ltLabel         = ASSET_CONFIG.ltLabel;  // e.g. "34-YR"

  // Inject long-term column header into accordion table
  document.getElementById("acc-lt-header").textContent = ltLabel;

  MONTHS.forEach((m, i) => {
    /* ── Month summary row ── */
    const trMonth = document.createElement("tr");
    trMonth.className = "acc-row-month";
    if (i === currentMonthIdx) trMonth.classList.add("current-month");
    trMonth.dataset.idx = i;

    const ltSig = m[ltSigKey] || "chop";

    trMonth.innerHTML = `
      <td><span class="chevron"></span>${m.month}</td>
      <td><span class="${sigClass[m.sig5]}">${sigLabel[m.sig5]}</span></td>
      <td><span class="${sigClass[m.sig15]}">${sigLabel[m.sig15]}</span></td>
      <td><span class="${sigClass[ltSig]}">${sigLabel[ltSig]}</span></td>
      <td><span class="${sigClass[m.combined]}">${m.combinedLabel}</span></td>
      <td>${stars(m.stars)}</td>
      <td style="color:var(--dim);font-size:12px">${m.note}</td>
    `;

    /* ── Expanded weeks row ── */
    const trWeeks = document.createElement("tr");
    trWeeks.className = "acc-row-weeks";
    trWeeks.dataset.idx = i;

    const wkRows = m.weeks.map(w => {
      const ltWkSig = w[ltKey] || "chop";
      return `
        <tr>
          <td>${w.wk}</td>
          <td><span class="${sigClass[w.s5]  || 'chop-tag'}">${sigLabel[w.s5]  || w.s5}</span></td>
          <td><span class="${sigClass[w.s15] || 'chop-tag'}">${sigLabel[w.s15] || w.s15}</span></td>
          <td><span class="${sigClass[ltWkSig] || 'chop-tag'}">${sigLabel[ltWkSig] || ltWkSig}</span></td>
          <td style="color:var(--text);font-weight:500">${w.com}</td>
          <td style="color:var(--dim)">${w.note}</td>
        </tr>
      `;
    }).join("");

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

    trMonth.addEventListener("click", () => {
      const open = trMonth.classList.toggle("is-open");
      if (open) trWeeks.classList.add("is-open");
      else       trWeeks.classList.remove("is-open");
    });

    body.appendChild(trMonth);
    body.appendChild(trWeeks);
  });

  /* ── Auto-open current month ── */
  const curMonth = body.querySelector(`[data-idx="${currentMonthIdx}"]:not(.acc-row-weeks)`);
  const curWeeks = body.querySelector(`.acc-row-weeks[data-idx="${currentMonthIdx}"]`);
  if (curMonth && curWeeks) {
    curMonth.classList.add("is-open");
    curWeeks.classList.add("is-open");
  }
}

// Run on load
buildAccordion();
