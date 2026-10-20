// Vanilla SVG chart helpers for the Kaminari Market Profiling dashboard.
// No external charting library — same zero-dependency, plain-<script>-tag
// pattern as the sibling Seasonals Dashboard (js/accordion.js, js/api.js).
// Every render* function clears `container` and appends a fresh SVG sized
// via viewBox, so it can be called again on a lookback-window dial change.
//
// Every chart element that carries meaning is `.hoverable` and wired to
// KPTTooltip (tooltip.js, must load before this file) so a trader can point
// at any bar/marker and get a plain-language explanation of exactly what
// it is, not just glance at an unlabelled shape.

const KPTCharts = (() => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function hover(target, html) {
    target.classList.add("hoverable");
    KPTTooltip.attach(target, html);
  }

  function clear(container) {
    container.innerHTML = "";
  }

  // Matches pipeline/clean_mt5_csv.py session_tag() exactly, so on-page
  // session colouring stays consistent with the pipeline's own labels.
  function sessionTag(hhmm) {
    const [hh, mm] = hhmm.split(":").map(Number);
    const h = hh + mm / 60;
    const inAsian = h >= 23.0 || h < 8.0;
    const inLondon = h >= 7.0 && h < 16.0;
    const inNY = h >= 12.0 && h < 21.0;
    if (inLondon && inNY) return "London_NY_Overlap";
    if (inAsian && inLondon) return "Asian_London_Overlap";
    if (inLondon) return "London";
    if (inNY) return "New_York";
    if (inAsian) return "Asian";
    return "Other";
  }

  const SESSION_COLOR = {
    Asian: "var(--asian)",
    London: "var(--london)",
    New_York: "var(--ny)",
    London_NY_Overlap: "var(--overlap)",
    Asian_London_Overlap: "var(--overlap)",
    Other: "var(--muted)",
  };
  const SESSION_LABEL = {
    Asian: "Asian session",
    London: "London session",
    New_York: "New York session",
    London_NY_Overlap: "London / New York overlap",
    Asian_London_Overlap: "Asian / London overlap",
    Other: "Outside main sessions",
  };

  function minutesOf(hhmm) {
    const [hh, mm] = hhmm.split(":").map(Number);
    return hh * 60 + mm;
  }

  function addMinutes(hhmm, mins) {
    const total = (minutesOf(hhmm) + mins) % 1440;
    const h = Math.floor(total / 60), m = total % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  // ── Range percentile strip ────────────────────────────────────────────────
  // Draws a p05->p95 axis with an IQR box (p25-p75), a median line, dashed
  // compression/expansion threshold markers, a binned-mode band, and (when
  // meaningful) a raw-mode tick — every element hoverable for an explanation.
  function renderRangeStrip(container, dist, unitLabel) {
    clear(container);
    unitLabel = unitLabel || "pips";
    if (!dist || !dist.n) {
      container.textContent = "No data for this window.";
      return;
    }
    const W = 1000, H = 70, padL = 10, padR = 10;
    const lo = dist.p05, hi = dist.p95;
    const scale = (v) => padL + ((v - lo) / (hi - lo)) * (W - padL - padR);

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "range-strip-svg" });
    const midY = H / 2 - 4;

    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: midY, y2: midY, stroke: "var(--border)", "stroke-width": 2 }));

    // whiskers
    const x05 = scale(lo), x25 = scale(dist.p25), x75 = scale(dist.p75), x95 = scale(hi);
    const wLeft = el("line", { x1: x05, x2: x25, y1: midY, y2: midY, stroke: "var(--dim)", "stroke-width": 1.5 });
    hover(wLeft, `<b>5th percentile</b><br>Only 5% of days had a smaller range than ${dist.p05} ${unitLabel}.`);
    svg.appendChild(wLeft);
    const wRight = el("line", { x1: x75, x2: x95, y1: midY, y2: midY, stroke: "var(--dim)", "stroke-width": 1.5 });
    hover(wRight, `<b>95th percentile</b><br>Only 5% of days had a bigger range than ${dist.p95} ${unitLabel}.`);
    svg.appendChild(wRight);

    // IQR box
    const iqr = el("rect", { x: x25, y: midY - 12, width: Math.max(2, x75 - x25), height: 24, fill: "rgba(34,197,94,0.12)", stroke: "var(--bull)", "stroke-width": 1, rx: 3 });
    hover(iqr, `<b>Interquartile range</b><br>The middle 50% of days: ${dist.p25}&ndash;${dist.p75} ${unitLabel}. This is where a typical day falls.`);
    svg.appendChild(iqr);

    // median
    const xMed = scale(dist.p50);
    const medLine = el("line", { x1: xMed, x2: xMed, y1: midY - 16, y2: midY + 16, stroke: "#fff", "stroke-width": 2.5 });
    hover(medLine, `<b>Median</b><br>${dist.p50} ${unitLabel} &mdash; half of days were bigger, half smaller.`);
    svg.appendChild(medLine);

    // compression / expansion thresholds
    if (dist.compression_threshold_pips != null) {
      const x = scale(dist.compression_threshold_pips);
      const line = el("line", { x1: x, x2: x, y1: midY - 20, y2: midY + 20, stroke: "var(--compression)", "stroke-width": 1.5, "stroke-dasharray": "3,2" });
      hover(line, `<b>Compression threshold (p20)</b><br>Days below ${dist.compression_threshold_pips} ${unitLabel} count as "Compression" in the profile taxonomy.`);
      svg.appendChild(line);
    }
    if (dist.expansion_threshold_pips != null) {
      const x = scale(dist.expansion_threshold_pips);
      const line = el("line", { x1: x, x2: x, y1: midY - 20, y2: midY + 20, stroke: "var(--expansion)", "stroke-width": 1.5, "stroke-dasharray": "3,2" });
      hover(line, `<b>Expansion threshold (p80)</b><br>Days above ${dist.expansion_threshold_pips} ${unitLabel} count as "Expansion" in the profile taxonomy.`);
      svg.appendChild(line);
    }

    // binned mode band (below the axis)
    if (dist.mode_binned) {
      const mb = dist.mode_binned;
      const bx = scale(mb.bin_low), bx2 = scale(mb.bin_high);
      const band = el("rect", { x: bx, y: midY + 22, width: Math.max(2, bx2 - bx), height: 8, fill: "var(--chop)", opacity: 0.7, rx: 2 });
      hover(band, `<b>Most common range (binned mode)</b><br>${mb.bin_low}&ndash;${mb.bin_high} ${unitLabel} &mdash; ${mb.pct_of_n}% of days (n=${mb.count}) landed here, more than any other range bucket.`);
      svg.appendChild(band);
    }

    // raw mode tick (above the axis) — only drawn when it reflects a real
    // repeat (count > 1); with continuous data a count of 1 means every
    // value was unique and a "mode" isn't a meaningful concept.
    if (dist.mode_raw && dist.mode_raw.count > 1) {
      const mr = dist.mode_raw;
      const x = scale(mr.value);
      const tick = el("path", { d: `M ${x} ${midY - 24} l -4 -6 l 8 0 z`, fill: "var(--overlap)" });
      hover(tick, `<b>Exact most-repeated value (raw mode)</b><br>${mr.value} ${unitLabel}, repeated on ${mr.count} days (${mr.pct_of_n}%). A weaker signal than the binned mode below — see the info icon in the section header.`);
      svg.appendChild(tick);
    }

    const t1 = el("text", { x: x05, y: H - 4, "font-size": 9, fill: "var(--muted)", "text-anchor": "start" });
    t1.textContent = `p05 ${lo}`;
    const t2 = el("text", { x: x95, y: H - 4, "font-size": 9, fill: "var(--muted)", "text-anchor": "end" });
    t2.textContent = `p95 ${hi}`;
    svg.appendChild(t1);
    svg.appendChild(t2);

    container.appendChild(svg);
  }

  // ── Time-of-extreme heatmap strip ────────────────────────────────────────
  // 48 half-hour buckets across the UTC day, bar height = frequency,
  // colour = FX session, mode bucket outlined, mean/median as tick markers.
  function renderTimeHeatmap(container, circ) {
    clear(container);
    if (!circ || !circ.n || !circ.histogram) {
      container.textContent = "No data for this window.";
      return;
    }
    const W = 1000, H = 70, padL = 4, padR = 4, padB = 14;
    const n = circ.histogram.length;
    const barW = (W - padL - padR) / n;
    const maxPct = Math.max(...circ.histogram.map((b) => b.pct), 0.01);
    const scaleY = (pct) => (pct / maxPct) * (H - padB - 6);

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "clock-svg" });

    circ.histogram.forEach((b, i) => {
      const h = scaleY(b.pct);
      const x = padL + i * barW;
      const y = H - padB - h;
      const isMode = b.bucket_start_utc === circ.mode_bucket_start_utc;
      const tag = sessionTag(b.bucket_start_utc);
      const bar = el("rect", {
        x, y, width: Math.max(1, barW - 0.5), height: Math.max(h, 1),
        fill: SESSION_COLOR[tag],
        opacity: isMode ? 1 : 0.55,
        stroke: isMode ? "#fff" : "none",
        "stroke-width": isMode ? 1 : 0,
      });
      const end = addMinutes(b.bucket_start_utc, 30);
      hover(bar, `<b>${b.bucket_start_utc}&ndash;${end} UTC</b>${isMode ? " (mode)" : ""}<br>${SESSION_LABEL[tag]}<br>${b.pct}% of days (n=${b.count})`);
      svg.appendChild(bar);
    });

    // hour gridlines + labels every 4h
    for (let h = 0; h <= 24; h += 4) {
      const x = padL + (h * 60 / 1440) * (W - padL - padR);
      svg.appendChild(el("line", { x1: x, x2: x, y1: 0, y2: H - padB, stroke: "var(--border)", "stroke-width": 1 }));
      const t = el("text", { x, y: H - 2, "font-size": 8, fill: "var(--muted)", "text-anchor": "middle" });
      t.textContent = `${String(h).padStart(2, "0")}:00`;
      svg.appendChild(t);
    }

    // mean marker
    const xMean = padL + (minutesOf(circ.circular_mean_utc) / 1440) * (W - padL - padR);
    const meanLine = el("line", { x1: xMean, x2: xMean, y1: 0, y2: H - padB, stroke: "var(--chop)", "stroke-width": 1.5, "stroke-dasharray": "2,2" });
    hover(meanLine, `<b>Circular mean</b><br>${circ.circular_mean_utc} UTC &mdash; the "average" time of day, calculated correctly across the midnight boundary.`);
    svg.appendChild(meanLine);

    container.appendChild(svg);
  }

  // ── Generic vertical bar chart (weekday / week-of-month / month-of-year) ──
  function renderBarChart(container, entries, opts) {
    // entries: [{label, value, color?, tooltip?}]
    clear(container);
    opts = opts || {};
    if (!entries.length) {
      container.textContent = "No data.";
      return;
    }
    const W = 1000, H = 160, padL = 30, padR = 10, padB = 24, padT = 10;
    const max = Math.max(...entries.map((e) => e.value), 1);
    const total = entries.reduce((s, e) => s + e.value, 0) || 1;
    const barGap = 8;
    const barW = (W - padL - padR - barGap * (entries.length - 1)) / entries.length;

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "bar-chart-svg" });

    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: H - padB, y2: H - padB, stroke: "var(--border)", "stroke-width": 1 }));

    entries.forEach((e, i) => {
      const h = ((e.value / max) * (H - padT - padB)) || 0;
      const x = padL + i * (barW + barGap);
      const y = H - padB - h;
      const pct = Math.round((e.value / total) * 1000) / 10;
      const bar = el("rect", { x, y, width: barW, height: Math.max(h, 1), fill: e.color || "var(--accent-combined)", rx: 3, opacity: 0.85 });
      hover(bar, e.tooltip || `<b>${e.label}</b><br>${e.value} occurrences &mdash; ${pct}% of the total.`);
      svg.appendChild(bar);

      const vt = el("text", { x: x + barW / 2, y: y - 4, "font-size": 10, fill: "var(--text)", "text-anchor": "middle" });
      vt.textContent = opts.valueFmt ? opts.valueFmt(e.value) : e.value;
      svg.appendChild(vt);
      const lt = el("text", { x: x + barW / 2, y: H - padB + 12, "font-size": 9, fill: "var(--muted)", "text-anchor": "middle" });
      lt.textContent = e.label;
      svg.appendChild(lt);
    });

    container.appendChild(svg);
  }

  // ── Candlestick chart (illustrative real example days on profile pages) ────
  // bars: [{t: ISO string, o, h, l, c}, ...] M15 bars for one trading day.
  // Evenly spaced by index (not true elapsed time) — simpler to read than
  // gapped time-axis spacing for a single compact day, and every bar here is
  // already a fixed 15-minute step.
  function renderCandlestick(container, bars) {
    clear(container);
    if (!bars || !bars.length) {
      container.textContent = "No intraday data available for this example day.";
      return;
    }
    const W = 1000, H = 320, padL = 46, padR = 10, padT = 16, padB = 24;
    const lo = Math.min(...bars.map((b) => b.l));
    const hi = Math.max(...bars.map((b) => b.h));
    const scaleY = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
    const n = bars.length;
    const slotW = (W - padL - padR) / n;
    const bodyW = Math.max(2, slotW * 0.6);

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "candlestick-svg" });

    // y-axis gridlines/labels (5 evenly spaced price levels)
    for (let i = 0; i <= 4; i++) {
      const v = lo + (hi - lo) * (i / 4);
      const y = scaleY(v);
      svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y, y2: y, stroke: "var(--border)", "stroke-width": 1 }));
      const t = el("text", { x: padL - 6, y: y + 3, "font-size": 9, fill: "var(--muted)", "text-anchor": "end" });
      t.textContent = v.toFixed(4);
      svg.appendChild(t);
    }

    bars.forEach((b, i) => {
      const x = padL + i * slotW + slotW / 2;
      const up = b.c >= b.o;
      const color = up ? "var(--bull)" : "var(--bear)";
      const wick = el("line", { x1: x, x2: x, y1: scaleY(b.h), y2: scaleY(b.l), stroke: color, "stroke-width": 1.2 });
      svg.appendChild(wick);
      const yOpen = scaleY(b.o), yClose = scaleY(b.c);
      const bodyTop = Math.min(yOpen, yClose);
      const bodyH = Math.max(1, Math.abs(yClose - yOpen));
      const body = el("rect", { x: x - bodyW / 2, y: bodyTop, width: bodyW, height: bodyH, fill: color, opacity: 0.9 });
      const time = b.t.slice(11, 16);
      hover(body, `<b>${time} UTC</b><br>O ${b.o.toFixed(4)} &middot; H ${b.h.toFixed(4)}<br>L ${b.l.toFixed(4)} &middot; C ${b.c.toFixed(4)}`);
      svg.appendChild(body);

      if (i % 4 === 0) {
        const t = el("text", { x, y: H - padB + 12, "font-size": 8, fill: "var(--muted)", "text-anchor": "middle" });
        t.textContent = time;
        svg.appendChild(t);
      }
    });

    container.appendChild(svg);
  }

  return { renderRangeStrip, renderTimeHeatmap, renderBarChart, renderCandlestick, sessionTag };
})();
