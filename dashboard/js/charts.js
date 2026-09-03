// Vanilla SVG chart helpers for the Kaminari Market Profiling dashboard.
// No external charting library — same zero-dependency, plain-<script>-tag
// pattern as the sibling Seasonals Dashboard (js/accordion.js, js/api.js).
// Every render* function clears `container` and appends a fresh SVG sized
// via viewBox, so it can be called again on a lookback-window dial change.

const KPTCharts = (() => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
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

  function minutesOf(hhmm) {
    const [hh, mm] = hhmm.split(":").map(Number);
    return hh * 60 + mm;
  }

  // ── Range percentile strip ────────────────────────────────────────────────
  // Draws a min→max axis with an IQR box (p25-p75), a median line, whiskers
  // to p05/p95, and dashed markers for the compression/expansion thresholds.
  function renderRangeStrip(container, dist) {
    clear(container);
    if (!dist || !dist.n) {
      container.textContent = "No data for this window.";
      return;
    }
    const W = 1000, H = 60, padL = 10, padR = 10;
    const lo = dist.p05, hi = dist.p95;
    const scale = (v) => padL + ((v - lo) / (hi - lo)) * (W - padL - padR);

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "range-strip-svg" });

    // baseline
    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: H / 2, y2: H / 2, stroke: "var(--border)", "stroke-width": 2 }));

    // IQR box
    const x25 = scale(dist.p25), x75 = scale(dist.p75);
    svg.appendChild(el("rect", { x: x25, y: H / 2 - 12, width: Math.max(2, x75 - x25), height: 24, fill: "rgba(34,197,94,0.12)", stroke: "var(--bull)", "stroke-width": 1, rx: 3 }));

    // whiskers p05 - p95
    svg.appendChild(el("line", { x1: scale(lo), x2: x25, y1: H / 2, y2: H / 2, stroke: "var(--dim)", "stroke-width": 1.5 }));
    svg.appendChild(el("line", { x1: x75, x2: scale(hi), y1: H / 2, y2: H / 2, stroke: "var(--dim)", "stroke-width": 1.5 }));

    // median
    const xMed = scale(dist.p50);
    svg.appendChild(el("line", { x1: xMed, x2: xMed, y1: H / 2 - 16, y2: H / 2 + 16, stroke: "#fff", "stroke-width": 2.5 }));

    // compression / expansion threshold markers
    if (dist.compression_threshold_pips != null) {
      const x = scale(dist.compression_threshold_pips);
      svg.appendChild(el("line", { x1: x, x2: x, y1: H / 2 - 20, y2: H / 2 + 20, stroke: "var(--compression)", "stroke-width": 1.5, "stroke-dasharray": "3,2" }));
    }
    if (dist.expansion_threshold_pips != null) {
      const x = scale(dist.expansion_threshold_pips);
      svg.appendChild(el("line", { x1: x, x2: x, y1: H / 2 - 20, y2: H / 2 + 20, stroke: "var(--expansion)", "stroke-width": 1.5, "stroke-dasharray": "3,2" }));
    }

    // p05 / p95 end labels — anchored start/end (not middle) so the label
    // text doesn't overflow past the SVG's left/right edge and get clipped
    // when the container is narrow (e.g. the two-column weekly/monthly strips).
    const t1 = el("text", { x: scale(lo), y: H - 4, "font-size": 9, fill: "var(--muted)", "text-anchor": "start" });
    t1.textContent = `p05 ${lo}`;
    const t2 = el("text", { x: scale(hi), y: H - 4, "font-size": 9, fill: "var(--muted)", "text-anchor": "end" });
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
      svg.appendChild(el("rect", {
        x, y, width: Math.max(1, barW - 0.5), height: h,
        fill: SESSION_COLOR[sessionTag(b.bucket_start_utc)],
        opacity: isMode ? 1 : 0.55,
        stroke: isMode ? "#fff" : "none",
        "stroke-width": isMode ? 1 : 0,
      }));
    });

    // hour gridlines + labels every 4h
    for (let h = 0; h <= 24; h += 4) {
      const x = padL + (h * 60 / 1440) * (W - padL - padR);
      svg.appendChild(el("line", { x1: x, x2: x, y1: 0, y2: H - padB, stroke: "var(--border)", "stroke-width": 1 }));
      const t = el("text", { x, y: H - 2, "font-size": 8, fill: "var(--muted)", "text-anchor": "middle" });
      t.textContent = `${String(h).padStart(2, "0")}:00`;
      svg.appendChild(t);
    }

    // mean / median markers
    const xMean = padL + (minutesOf(circ.circular_mean_utc) / 1440) * (W - padL - padR);
    svg.appendChild(el("line", { x1: xMean, x2: xMean, y1: 0, y2: H - padB, stroke: "var(--chop)", "stroke-width": 1.5, "stroke-dasharray": "2,2" }));

    container.appendChild(svg);
  }

  // ── Generic vertical bar chart (weekday / week-of-month / profile counts) ──
  function renderBarChart(container, entries, opts) {
    // entries: [{label, value, color?}]
    clear(container);
    opts = opts || {};
    if (!entries.length) {
      container.textContent = "No data.";
      return;
    }
    const W = 1000, H = 160, padL = 30, padR = 10, padB = 24, padT = 10;
    const max = Math.max(...entries.map((e) => e.value), 1);
    const barGap = 8;
    const barW = (W - padL - padR - barGap * (entries.length - 1)) / entries.length;

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "bar-chart-svg" });

    // y-axis baseline
    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: H - padB, y2: H - padB, stroke: "var(--border)", "stroke-width": 1 }));

    entries.forEach((e, i) => {
      const h = ((e.value / max) * (H - padT - padB)) || 0;
      const x = padL + i * (barW + barGap);
      const y = H - padB - h;
      svg.appendChild(el("rect", { x, y, width: barW, height: h, fill: e.color || "var(--accent-combined)", rx: 3, opacity: 0.85 }));
      const vt = el("text", { x: x + barW / 2, y: y - 4, "font-size": 10, fill: "var(--text)", "text-anchor": "middle" });
      vt.textContent = opts.valueFmt ? opts.valueFmt(e.value) : e.value;
      svg.appendChild(vt);
      const lt = el("text", { x: x + barW / 2, y: H - padB + 12, "font-size": 9, fill: "var(--muted)", "text-anchor": "middle" });
      lt.textContent = e.label;
      svg.appendChild(lt);
    });

    container.appendChild(svg);
  }

  return { renderRangeStrip, renderTimeHeatmap, renderBarChart, sessionTag };
})();
