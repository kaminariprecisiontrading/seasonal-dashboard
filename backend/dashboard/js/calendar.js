// Shared calendar-grid rendering + dynamic year-data loading, used by both
// the per-asset calendar page (dashboard/calendar/asset.html) and the
// cross-asset homepage calendar (dashboard/calendar/index.html).
//
// Year data files (dashboard/data/calendar/<asset>/<year>.js) are loaded
// on demand — only the year currently being browsed — via a dynamically
// injected <script> tag, since fetch()/XHR is CORS-blocked on a plain
// file:// open. They attach to window.KPT_CALENDAR[asset][year] (NOT a
// `const`, deliberately — see pipeline/export_calendar_data.py's comment
// on why a lexically-scoped const can't be looked up by a dynamic name).

const KPTCalendar = (() => {
  const DATA_BASE = "../data/calendar";
  const loadedScripts = new Set();

  function loadScript(src) {
    if (loadedScripts.has(src)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => { loadedScripts.add(src); resolve(); };
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  function loadManifest(assetKey) {
    if (window.KPT_CALENDAR_YEARS && window.KPT_CALENDAR_YEARS[assetKey]) {
      return Promise.resolve(window.KPT_CALENDAR_YEARS[assetKey]);
    }
    return loadScript(`${DATA_BASE}/${assetKey.toLowerCase()}/manifest.js`)
      .then(() => (window.KPT_CALENDAR_YEARS && window.KPT_CALENDAR_YEARS[assetKey]) || []);
  }

  function loadYear(assetKey, year) {
    if (window.KPT_CALENDAR && window.KPT_CALENDAR[assetKey] && window.KPT_CALENDAR[assetKey][year]) {
      return Promise.resolve();
    }
    return loadScript(`${DATA_BASE}/${assetKey.toLowerCase()}/${year}.js`);
  }

  function getDay(assetKey, dateStr) {
    const year = dateStr.slice(0, 4);
    return (window.KPT_CALENDAR && window.KPT_CALENDAR[assetKey] && window.KPT_CALENDAR[assetKey][year])
      ? window.KPT_CALENDAR[assetKey][year][dateStr] || null
      : null;
  }

  const WEEKDAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function firstWeekdayMon0(year, month) {
    const jsDay = new Date(year, month - 1, 1).getDay(); // 0=Sun..6=Sat
    return (jsDay + 6) % 7; // 0=Mon..6=Sun
  }

  // opts: { year, month (1-12), assetKey, onDayClick(dateStr, record), colorFn(record) }
  function renderMonthGrid(container, opts) {
    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "calendar-grid";

    WEEKDAY_HEADERS.forEach((h) => {
      const cell = document.createElement("div");
      cell.className = "calendar-header-cell";
      cell.textContent = h;
      grid.appendChild(cell);
    });

    const leading = firstWeekdayMon0(opts.year, opts.month);
    for (let i = 0; i < leading; i++) {
      grid.appendChild(document.createElement("div"));
    }

    const nDays = daysInMonth(opts.year, opts.month);
    for (let day = 1; day <= nDays; day++) {
      const dateStr = `${opts.year}-${String(opts.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const rec = getDay(opts.assetKey, dateStr);
      const cell = document.createElement("div");
      cell.className = "calendar-cell";

      if (rec && !rec.is_data_gap) {
        const color = opts.colorFn ? opts.colorFn(rec) : (KPT_PROFILE_COLOR[rec.profile] || "var(--muted)");
        cell.style.setProperty("--cell-color", color);
        cell.classList.add("has-data");
        cell.innerHTML = `<span class="calendar-day-num">${day}</span>`;
        cell.title = `${rec.profile} — ${rec.range_pips} pips`;
        cell.addEventListener("click", () => opts.onDayClick(dateStr, rec));
      } else if (rec && rec.is_data_gap) {
        cell.classList.add("is-gap");
        cell.innerHTML = `<span class="calendar-day-num">${day}</span>`;
        cell.title = "Data-gap day (feed outage / no trading)";
      } else {
        cell.classList.add("no-data");
        cell.innerHTML = `<span class="calendar-day-num">${day}</span>`;
      }
      grid.appendChild(cell);
    }

    container.appendChild(grid);
  }

  return {
    loadManifest, loadYear, getDay,
    daysInMonth, firstWeekdayMon0, renderMonthGrid,
    WEEKDAY_HEADERS, MONTH_NAMES,
  };
})();
