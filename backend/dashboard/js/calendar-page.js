// Controller for the per-asset calendar page (dashboard/calendar/asset.html
// ?a=GBPUSD). Month-grid browser colored by profile, click a day to see its
// full stats plus its containing week's and month's context.

(function () {
  const params = new URLSearchParams(window.location.search);
  const assetKey = (params.get("a") || "GBPUSD").toUpperCase();

  let state = { year: 2019, month: 12 };

  function weekdayName(dateStr) {
    const d = new Date(dateStr + "T00:00:00Z");
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getUTCDay()];
  }

  function renderDetail(dateStr, rec) {
    const panel = document.getElementById("calendar-detail");
    panel.style.display = "block";
    const slug = kptProfileSlug(rec.profile);
    panel.innerHTML = `
      <div class="panel-title">${dateStr} &middot; ${weekdayName(dateStr)}</div>
      <div class="two-col">
        <div>
          <div class="calendar-detail-row"><span>Profile</span><a href="../profiles/detail.html?p=${slug}" class="profile-link" style="--card-accent:${KPT_PROFILE_COLOR[rec.profile] || "var(--muted)"}">${kptProfileIconSvg(rec.profile, 22)} ${rec.profile}</a></div>
          <div class="calendar-detail-row"><span>Open / Close</span><b>${rec.open} / ${rec.close}</b></div>
          <div class="calendar-detail-row"><span>High / Low</span><b>${rec.high} / ${rec.low}</b></div>
          <div class="calendar-detail-row"><span>Daily Range</span><b>${rec.range_pips} pips</b></div>
          <div class="calendar-detail-row"><span>High Time</span><b>${rec.high_time} UTC</b> <span class="muted-inline">(${rec.high_session.replace(/_/g, " ")})</span></div>
          <div class="calendar-detail-row"><span>Low Time</span><b>${rec.low_time} UTC</b> <span class="muted-inline">(${rec.low_session.replace(/_/g, " ")})</span></div>
        </div>
        <div>
          <div class="calendar-context-label">Week (${rec.week.start} &rarr; ${rec.week.end})</div>
          <div class="calendar-detail-row"><span>Week Range</span><b>${rec.week.range_pips} pips</b></div>
          <div class="calendar-detail-row"><span>Week High / Low Day</span><b>${rec.week.high_weekday} / ${rec.week.low_weekday}</b></div>
          <div class="calendar-context-label" style="margin-top:14px;">Month (${rec.month.start} &rarr; ${rec.month.end})</div>
          <div class="calendar-detail-row"><span>Month Range</span><b>${rec.month.range_pips} pips</b></div>
          <div class="calendar-detail-row"><span>Month High / Low</span><b>${rec.month.high} / ${rec.month.low}</b></div>
        </div>
      </div>`;
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderGrid() {
    const container = document.getElementById("calendar-grid");
    KPTCalendar.renderMonthGrid(container, {
      year: state.year,
      month: state.month,
      assetKey,
      onDayClick: renderDetail,
    });
    document.getElementById("cal-label").textContent = `${KPTCalendar.MONTH_NAMES[state.month - 1]} ${state.year}`;
  }

  function goToMonth(year, month) {
    if (month < 1) { month = 12; year -= 1; }
    if (month > 12) { month = 1; year += 1; }
    state = { year, month };
    KPTCalendar.loadYear(assetKey, year).then(renderGrid);
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
    document.getElementById("calendar-asset-title").textContent = assetKey;
    document.querySelectorAll(".asset-back-link").forEach((a) => { a.href = `../assets/${assetKey.toLowerCase()}.html`; });

    KPTCalendar.loadManifest(assetKey).then((years) => {
      if (!years.length) return;
      state.year = years[years.length - 1];
      state.month = 12;
      buildSelectors(years);
      renderLegend();
      KPTCalendar.loadYear(assetKey, state.year).then(renderGrid);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
