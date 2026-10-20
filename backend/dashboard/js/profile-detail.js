// Controller for dashboard/profiles/detail.html — reads the profile name
// from the ?p=<slug> query param, and renders its description, cross-asset
// stats, and a real illustrative example-day candlestick chart per asset.

(function () {
  // NOTE: reference the bare identifiers, not window.GBPUSD_DATA etc. — a
  // top-level `const` in a classic <script> creates a global *lexical*
  // binding (visible to other script tags in the document), not a
  // property on `window`, so `window.GBPUSD_DATA` would always be undefined.
  const ASSETS = [
    { key: "GBPUSD", data: () => (typeof GBPUSD_DATA !== "undefined" ? GBPUSD_DATA : null), examples: () => (typeof GBPUSD_PROFILE_EXAMPLES !== "undefined" ? GBPUSD_PROFILE_EXAMPLES : null) },
    { key: "EURUSD", data: () => (typeof EURUSD_DATA !== "undefined" ? EURUSD_DATA : null), examples: () => (typeof EURUSD_PROFILE_EXAMPLES !== "undefined" ? EURUSD_PROFILE_EXAMPLES : null) },
  ];

  function slugToName() {
    const map = {};
    Object.keys(KPT_PROFILE_META).forEach((name) => { map[kptProfileSlug(name)] = name; });
    return map;
  }

  function renderHeader(name) {
    document.title = `${name} — Kaminari Market Profiling`;
    document.getElementById("profile-title").textContent = name;
    document.getElementById("profile-icon-large").innerHTML = kptProfileIconSvg(name, 90);
    document.documentElement.style.setProperty("--card-accent", KPT_PROFILE_COLOR[name] || "var(--muted)");
  }

  function renderDescription(name) {
    const meta = KPT_PROFILE_META[name];
    if (!meta) return;
    document.getElementById("profile-rule").innerHTML = meta.rule;
    document.getElementById("profile-why").innerHTML = meta.why;
    document.getElementById("profile-timing").innerHTML = meta.timingSignature;
    document.getElementById("profile-axis-range").textContent = meta.axisRange;
    document.getElementById("profile-axis-shape").textContent = meta.axisShape;
  }

  function renderCrossAssetStats(name) {
    const wrap = document.getElementById("cross-asset-stats");
    wrap.innerHTML = "";
    ASSETS.forEach(({ key, data }) => {
      const d = data();
      if (!d) return;
      const dist = d.profiles.profile_distribution[name];
      const range = d.profiles.avg_range_pips_by_profile[name];
      const timing = d.profiles.extreme_timing_by_profile[name];
      const topTiming = timing ? Object.entries(timing).sort((a, b) => b[1] - a[1])[0] : null;
      const div = document.createElement("div");
      div.className = "stat-tile";
      if (!dist) {
        div.innerHTML = `<div class="stat-label">${key}</div><div class="stat-value" style="font-size:14px;color:var(--muted)">No days classified as this profile</div>`;
      } else {
        div.innerHTML = `
          <div class="stat-label">${key}</div>
          <div class="stat-value">${dist.pct}<span class="unit">% of days (n=${dist.n})</span></div>
          <div class="profile-meta" style="margin-top:8px;">
            ${range ? `Avg range: <b>${range.mean} pips</b><br>` : ""}
            ${topTiming ? `Most common timing: <b>${topTiming[0].replace("_", " ")}</b> (${topTiming[1]} days)` : ""}
          </div>`;
      }
      wrap.appendChild(div);
    });
  }

  function renderExampleCharts(name) {
    const wrap = document.getElementById("example-charts");
    wrap.innerHTML = "";
    let anyFound = false;
    ASSETS.forEach(({ key, examples }) => {
      const ex = examples();
      const panel = document.createElement("div");
      panel.className = "panel";
      const example = ex ? ex[name] : null;
      if (!example) {
        panel.innerHTML = `<div class="panel-title">${key} Example</div><div class="section-note" style="margin:0;">No example day available.</div>`;
        wrap.appendChild(panel);
        return;
      }
      anyFound = true;
      panel.innerHTML = `
        <div class="panel-title">${key} Example &mdash; ${example.date}</div>
        <div id="candlestick-${key}"></div>
        <div class="section-note" style="margin:10px 0 0;">
          A real historical day picked as a typical example of this profile &mdash; its range is close to this
          profile's own average, not a cherry-picked extreme. M15 candles, UTC. Hover any candle for its OHLC values.
        </div>`;
      wrap.appendChild(panel);
      KPTCharts.renderCandlestick(document.getElementById(`candlestick-${key}`), example.bars);
    });
    return anyFound;
  }

  function renderAllProfilesNav(currentName) {
    const nav = document.getElementById("all-profiles-nav");
    if (!nav) return;
    nav.innerHTML = Object.keys(KPT_PROFILE_META)
      .map((name) => {
        const active = name === currentName ? " active" : "";
        return `<a class="profile-nav-pill${active}" href="detail.html?p=${kptProfileSlug(name)}" style="--pill-accent:${KPT_PROFILE_COLOR[name] || "var(--muted)"}">${name}</a>`;
      })
      .join("");
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("p");
    const name = slugToName()[slug];

    if (!name) {
      document.getElementById("profile-detail-root").innerHTML =
        `<div class="section-note">Unknown profile "${slug || ""}". <a href="../index.html">Back to dashboard</a>.</div>`;
      return;
    }

    renderHeader(name);
    renderDescription(name);
    renderCrossAssetStats(name);
    renderExampleCharts(name);
    renderAllProfilesNav(name);
    kptAttachGlossaryIcons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
