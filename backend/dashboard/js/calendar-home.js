// Controller for the cross-asset homepage calendar (dashboard/calendar/
// index.html). Grid is colored by GBPUSD's profile (the primary/first-
// listed asset) since a single cell can't show two assets' colors at once;
// clicking a day shows both assets' stats side by side.

(function () {
  const ASSETS = ["GBPUSD", "EURUSD"];
  let state = { year: 2019, month: 12 };

  function weekdayName(dateStr) {
    const d = new Date(dateStr + "T00:00:00Z");
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getUTCDay()];
  }

  function assetColumnHtml(assetKey, rec) {
    if (!rec) {
      return `<div><div class="calendar-context-label">${assetKey}</div><div class="section-note" style="margin:0;">No data for this date.</div></div>`;
    }
    if (rec.is_data_gap) {
      return `<div><div class="calendar-context-label">${assetKey}</div><div class="section-note" style="margin:0;">Data-gap day (feed outage / no trading).</div></div>`;
    }
    const slug = kptProfileSlug(rec.profile);
    return `
      <div>
        <div class="calendar-context-label">${assetKey}</div>
        <div class="calendar-detail-row"><span>Profile</span><a href="../profiles/detail.html?p=${slug}" class="profile-link" style="--card-accent:${KPT_PROFILE_COLOR[rec.profile] || "var(--muted)"}">${kptProfileIconSvg(rec.profile, 20)} ${rec.profile}</a></div>
        <div class="calendar-detail-row"><span>High / Low</span><b>${rec.high} / ${rec.low}</b></div>
        <div class="calendar-detail-row"><span>Daily Range</span><b>${rec.range_pips} pips</b></div>
        <div class="calendar-detail-row"><span>High Time</span><b>${rec.high_time} UTC</b> <span class="muted-inline">(${rec.high_session.replace(/_/g, " ")})</span></div>
        <div class="calendar-detail-row"><span>Low Time</span><b>${rec.low_time} UTC</b> <span class="muted-inline">(${rec.low_session.replace(/_/g, " ")})</span></div>
        <div class="calendar-detail-row"><span>Week Range</span><b>${rec.week.range_pips} pips</b></div>
        <div class="calendar-detail-row"><span>Month Range</span><b>${rec.month.range_pips} pips</b></div>
      </div>`;
  }

  function renderDetail(dateStr) {
    const panel = document.getElementById("calendar-detail");
    panel.style.display = "block";
    Promise.all(ASSETS.map((a) => KPTCalendar.loadYear(a, dateStr.slice(0, 4)))).then(() => {
      const cols = ASSETS.map((a) => assetColumnHtml(a, KPTCalendar.getDay(a, dateStr))).join("");
      panel.innerHTML = `<div class="panel-title">${dateStr} &middot; ${weekdayName(dateStr)}</div><div class="two-col">${cols}</div>`;
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function renderGrid() {
    const container = document.getElementById("calendar-grid");
    KPTCalendar.renderMonthGrid(container, {
      year: state.year,
      month: state.month,
      assetKey: "GBPUSD",
      onDayClick: renderDetail,
    });
    document.getElementById("cal-label").textContent = `${KPTCalendar.MONTH_NAMES[state.month - 1]} ${state.year}`;
  }

  function goToMonth(year, month) {
    if (month < 1) { month = 12; year -= 1; }
    if (month > 12) { month = 1; year += 1; }
    state = { year, month };
    Promise.all(ASSETS.map((a) => KPTCalendar.loadYear(a, year))).then(renderGrid);
  }

  function buildSelectors(years) {
    const yearSelect = document.getElementById("cal-year-select");
    yearSelect.innerHTML = years.map((y) => `<option value="${y}">${y}</option>`).join("");
    yearSelect.value = state.year;
    yearSelect.addEventListener("change", () => goToMonth(Number(yearSelect.value), state.month));

    const monthSelect = document.getElementById("cal-month-select");
    monthSelect.innerHTML = KPTCalendar.MONTH_NAMES.map((m, i) => `<option value="${i + 1}">${m}</option>`).join("");
    monthSelect.value = state.month;
    monthSelect.addEventListener("change", () => goToMonth(state.year, Number(monthSelect.value)));

    document.getElementById("cal-prev").addEventListener("click", () => {
      goToMonth(state.year, state.month - 1);
      yearSelect.value = state.year;
      monthSelect.value = state.month;
    });
    document.getElementById("cal-next").addEventListener("click", () => {
      goToMonth(state.year, state.month + 1);
      yearSelect.value = state.year;
      monthSelect.value = state.month;
    });
  }

  function renderLegend() {
    const legend = document.getElementById("calendar-legend");
    legend.innerHTML = Object.keys(KPT_PROFILE_COLOR)
      .map((name) => `<span><span class="dot" style="background:${KPT_PROFILE_COLOR[name]}"></span>${name}</span>`)
      .join("");
  }

  function init() {
    KPTCalendar.loadManifest("GBPUSD").then((years) => {
      if (!years.length) return;
      state.year = years[years.length - 1];
      state.month = 12;
      buildSelectors(years);
      renderLegend();
      Promise.all(ASSETS.map((a) => KPTCalendar.loadYear(a, state.year))).then(renderGrid);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
