// Page controller for a single asset's market-profiling dashboard.
// Expects the asset HTML shell to set `window.ASSET_DATA = <TICKER>_DATA;`
// (from data/<asset>.js) in an inline <script> before this file loads.

(function () {
  const WINDOWS = [
    { key: "full", label: "Full History" },
    { key: "5y", label: "5Y" },
    { key: "1y", label: "1Y" },
    { key: "3mo", label: "3M" },
  ];

  const WEEKDAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const PROFILE_COLOR = {
    "Trend Day (Up)": "var(--bull)",
    "Trend Day (Down)": "var(--bear)",
    "Volatile Day": "var(--expansion)",
    "Volatile Reversal Day": "var(--chop)",
    "Quiet Drift Day (Up)": "var(--bull)",
    "Quiet Drift Day (Down)": "var(--bear)",
    "Compression Day": "var(--compression)",
    "Normal Day": "var(--normal)",
  };

  function concentrationBadge(R) {
    // Cutoffs chosen from the observed R range across both assets/windows
    // (~0.14 full-history blend up to ~0.37 in tighter recent windows) —
    // see HANDOVER §6 "weak time-of-day clustering" finding.
    if (R >= 0.25) return { cls: "conc-high", label: "Tight clustering" };
    if (R >= 0.18) return { cls: "conc-mid", label: "Moderate clustering" };
    return { cls: "conc-low", label: "Weak clustering" };
  }

  function orderedEntries(dict, order, contextFmt) {
    const total = Object.values(dict).reduce((s, v) => s + v, 0) || 1;
    return order.map((k) => {
      const value = dict[k] || 0;
      const pct = Math.round((value / total) * 1000) / 10;
      return {
        label: shortLabel(k),
        value,
        tooltip: contextFmt ? `<b>${k}</b><br>${contextFmt(value, pct)}` : undefined,
      };
    });
  }

  function shortLabel(k) {
    const map = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun" };
    return map[k] || k;
  }

  function numericSortedEntries(dict, labelPrefix, contextFmt) {
    const total = Object.values(dict).reduce((s, v) => s + v, 0) || 1;
    return Object.keys(dict)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => {
        const value = dict[k];
        const pct = Math.round((value / total) * 1000) / 10;
        return {
          label: (labelPrefix || "Wk ") + k,
          value,
          tooltip: contextFmt ? `<b>${(labelPrefix || "Wk ") + k}</b><br>${contextFmt(value, pct)}` : undefined,
        };
      });
  }

  function monthEntries(dict, contextFmt) {
    const total = Object.values(dict).reduce((s, v) => s + v, 0) || 1;
    return Object.keys(dict)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => {
        const value = dict[k];
        const pct = Math.round((value / total) * 1000) / 10;
        const name = MONTH_NAMES[Number(k) - 1] || k;
        return {
          label: name,
          value,
          tooltip: contextFmt ? `<b>${name}</b><br>${contextFmt(value, pct)}` : undefined,
        };
      });
  }

  function renderStatTiles(data) {
    const grid = document.getElementById("stat-grid");
    if (!grid) return;
    const s = data.stats;
    const adr = s.daily_range.latest_adr;
    const full = s.daily_range.windowed_distribution.full;
    const tiles = [
      { label: "Trading Days", value: s.n_days, unit: "", glossary: "trading_days" },
      { label: "ADR 20", value: adr.ADR_20 ?? "—", unit: "pips", glossary: "adr" },
      { label: "ADR 5", value: adr.ADR_5 ?? "—", unit: "pips", glossary: "adr" },
      { label: "Median Daily Range", value: full.median, unit: "pips", glossary: "median" },
      { label: "Data As Of", value: s.as_of, unit: "" },
    ];
    grid.innerHTML = "";
    tiles.forEach((t) => {
      const div = document.createElement("div");
      div.className = "stat-tile";
      const icon = t.glossary ? kptGlossaryIcon(t.glossary) : "";
      div.innerHTML = `<div class="stat-label">${t.label}${icon}</div><div class="stat-value">${t.value}<span class="unit">${t.unit}</span></div>`;
      grid.appendChild(div);
    });
    kptAttachGlossaryIcons(grid);
  }

  function modeNoteHtml(dist, unitPlural) {
    unitPlural = unitPlural || "days";
    const parts = [];
    if (dist.mode_binned) {
      parts.push(`<span>Most common range${kptGlossaryIcon("mode_binned")}: <b>${dist.mode_binned.bin_low}&ndash;${dist.mode_binned.bin_high} pips</b> (${dist.mode_binned.pct_of_n}% of ${unitPlural})</span>`);
    }
    if (dist.mode_raw && dist.mode_raw.count > 1) {
      parts.push(`<span>Exact repeated value${kptGlossaryIcon("mode_raw")}: <b>${dist.mode_raw.value} pips</b> (${dist.mode_raw.count} ${unitPlural}, ${dist.mode_raw.pct_of_n}%)</span>`);
    } else {
      parts.push(`<span>Exact repeated value${kptGlossaryIcon("mode_raw")}: <b>none</b> &mdash; every value in this window was unique</span>`);
    }
    return parts.join("");
  }

  function renderRangeSection(data, windowKey) {
    const s = data.stats;
    const daily = s.daily_range.windowed_distribution[windowKey];
    const weekly = s.weekly_range.windowed_distribution[windowKey];
    const monthly = s.monthly_range.windowed_distribution[windowKey];

    [
      ["range-daily", daily, "Daily", "days"],
      ["range-weekly", weekly, "Weekly", "weeks"],
      ["range-monthly", monthly, "Monthly", "months"],
    ].forEach(([id, dist, label, unitPlural]) => {
      const container = document.getElementById(id);
      if (!container) return;
      KPTCharts.renderRangeStrip(container, dist);
      const cap = document.getElementById(id + "-caption");
      const modeNote = document.getElementById(id + "-mode-note");
      if (cap) {
        if (dist && dist.n) {
          cap.innerHTML = `<span>${label} range · n=${dist.n}</span><span class="median-note">median ${dist.median} pips (mean ${dist.mean})</span>`;
        } else {
          cap.innerHTML = `<span>${label} range · insufficient data in this window</span>`;
        }
      }
      if (modeNote) {
        modeNote.innerHTML = dist && dist.n ? modeNoteHtml(dist, unitPlural) : "";
        kptAttachGlossaryIcons(modeNote);
      }
    });
  }

  function renderTimeSection(data, windowKey) {
    const s = data.stats;
    [
      ["heatmap-high", s.daily_high_time.windowed_circular_stats[windowKey], "High"],
      ["heatmap-low", s.daily_low_time.windowed_circular_stats[windowKey], "Low"],
    ].forEach(([id, circ, label]) => {
      const container = document.getElementById(id);
      if (!container) return;
      KPTCharts.renderTimeHeatmap(container, circ);
      const cap = document.getElementById(id + "-caption");
      if (cap) {
        if (circ && circ.n) {
          const badge = concentrationBadge(circ.concentration_R);
          cap.innerHTML =
            `Daily ${label} mode: <b>${circ.mode_bucket_start_utc}–${circ.mode_bucket_end_utc} UTC</b> ` +
            `(${circ.mode_bucket_pct_of_days}% of days) · circular mean ${circ.circular_mean_utc} UTC` +
            `<span class="concentration-badge ${badge.cls}">${badge.label} · R=${circ.concentration_R}</span>`;
        } else {
          cap.textContent = `Daily ${label}: insufficient data in this window`;
        }
      }
    });
  }

  function renderSessionLegend() {
    document.querySelectorAll(".session-legend").forEach((legend) => {
      legend.innerHTML = [
        ["Asian", "var(--asian)"],
        ["London", "var(--london)"],
        ["New York", "var(--ny)"],
        ["Overlap", "var(--overlap)"],
      ]
        .map(([label, color]) => `<span><span class="dot" style="background:${color}"></span>${label}</span>`)
        .join("");
    });
  }

  function renderWeeklyMonthly(data) {
    const s = data.stats;
    const fmt = (thing) => (v, pct) => `The week's ${thing} landed here on ${v} of ${s.n_weeks} weeks (${pct}%).`;
    const fmtWom = (thing) => (v, pct) => `The month's ${thing} landed in this week-of-month on ${v} of ${s.n_months} months (${pct}%).`;
    KPTCharts.renderBarChart(document.getElementById("weekday-high-chart"), orderedEntries(s.weekly_high_day, WEEKDAY_ORDER, fmt("high")), { valueFmt: (v) => v + "×" });
    KPTCharts.renderBarChart(document.getElementById("weekday-low-chart"), orderedEntries(s.weekly_low_day, WEEKDAY_ORDER, fmt("low")), { valueFmt: (v) => v + "×" });
    KPTCharts.renderBarChart(document.getElementById("wom-high-chart"), numericSortedEntries(s.monthly_high_week_of_month, "Wk ", fmtWom("high")), { valueFmt: (v) => v + "×" });
    KPTCharts.renderBarChart(document.getElementById("wom-low-chart"), numericSortedEntries(s.monthly_low_week_of_month, "Wk ", fmtWom("low")), { valueFmt: (v) => v + "×" });
  }

  function renderYearlySection(data) {
    const s = data.stats;
    if (!s.yearly_range) return;
    const dist = s.yearly_range.distribution;

    const container = document.getElementById("range-yearly");
    if (container) {
      KPTCharts.renderRangeStrip(container, dist);
      const cap = document.getElementById("range-yearly-caption");
      if (cap && dist && dist.n) {
        cap.innerHTML = `<span>Yearly range · n=${dist.n} years</span><span class="median-note">median ${dist.median} pips (mean ${dist.mean})</span>`;
      }
      const modeNote = document.getElementById("range-yearly-mode-note");
      if (modeNote && dist && dist.n) {
        modeNote.innerHTML = modeNoteHtml(dist, "years");
        kptAttachGlossaryIcons(modeNote);
      }
      const smallSample = document.getElementById("range-yearly-sample-note");
      if (smallSample) {
        smallSample.innerHTML = `Built from only ${dist.n} years of history${kptGlossaryIcon("n_sample")} — treat this section as a much weaker signal than the daily/weekly/monthly ones above.`;
        kptAttachGlossaryIcons(smallSample);
      }
    }

    const fmtY = (thing) => (v, pct) => `The year's ${thing} landed in this month on ${v} of ${s.n_years} years (${pct}%).`;
    KPTCharts.renderBarChart(document.getElementById("year-high-month-chart"), monthEntries(s.yearly_high_month, fmtY("high")), { valueFmt: (v) => v + "×" });
    KPTCharts.renderBarChart(document.getElementById("year-low-month-chart"), monthEntries(s.yearly_low_month, fmtY("low")), { valueFmt: (v) => v + "×" });
  }

  function renderProfiles(data) {
    const grid = document.getElementById("profile-grid");
    if (!grid) return;
    const dist = data.profiles.profile_distribution;
    const avgRange = data.profiles.avg_range_pips_by_profile;
    const timing = data.profiles.extreme_timing_by_profile;

    const entries = Object.entries(dist).sort((a, b) => b[1].n - a[1].n);
    grid.innerHTML = "";
    entries.forEach(([name, v]) => {
      const topTiming = timing[name]
        ? Object.entries(timing[name]).sort((a, b) => b[1] - a[1])[0]
        : null;
      const range = avgRange[name];
      const div = document.createElement("div");
      div.className = "profile-card";
      div.style.setProperty("--card-accent", PROFILE_COLOR[name] || "var(--muted)");
      div.innerHTML = `
        <div class="profile-name">${name}</div>
        <div class="profile-pct">${v.pct}%</div>
        <div class="profile-meta">
          n=${v.n} days${range ? ` · avg range ${range.mean} pips` : ""}${topTiming ? `<br>most common timing${kptGlossaryIcon("extreme_timing")}: ${topTiming[0].replace("_", " ")} (${topTiming[1]})` : ""}
        </div>`;
      grid.appendChild(div);
    });
    kptAttachGlossaryIcons(grid);

    const note = document.getElementById("profile-summary-note");
    if (note) {
      note.textContent = `${data.profiles.n_labeled_days} labeled days · ${data.profiles.n_data_gap_days} data-gap days excluded · ${data.profiles.n_insufficient_history_days} days pending sufficient trailing history.`;
    }
  }

  function buildDial(data) {
    const dial = document.getElementById("dial");
    if (!dial) return;
    dial.innerHTML = "";
    WINDOWS.forEach((w, i) => {
      const btn = document.createElement("button");
      btn.textContent = w.label;
      if (i === 0) btn.classList.add("active");
      btn.addEventListener("click", () => {
        dial.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderRangeSection(data, w.key);
        renderTimeSection(data, w.key);
      });
      dial.appendChild(btn);
    });
  }

  function init() {
    const data = window.ASSET_DATA;
    if (!data) {
      console.error("window.ASSET_DATA not set — check the asset HTML shell's inline script.");
      return;
    }
    renderStatTiles(data);
    buildDial(data);
    renderRangeSection(data, "full");
    renderTimeSection(data, "full");
    renderSessionLegend();
    renderWeeklyMonthly(data);
    renderYearlySection(data);
    renderProfiles(data);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
