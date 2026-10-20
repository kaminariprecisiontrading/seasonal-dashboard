// Shared floating tooltip used dashboard-wide: glossary "?" icons and every
// chart element (range strip regions, heatmap bars, bar-chart bars) attach
// to this single component rather than each building its own popup.

const KPTTooltip = (() => {
  let tipEl;

  function ensureEl() {
    if (!tipEl) {
      tipEl = document.createElement("div");
      tipEl.className = "kpt-tooltip";
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }

  function position(x, y) {
    const el = ensureEl();
    const pad = 14;
    const rect = el.getBoundingClientRect();
    let left = x + pad;
    let top = y + pad;
    if (left + rect.width > window.innerWidth - 8) left = x - rect.width - pad;
    if (top + rect.height > window.innerHeight - 8) top = y - rect.height - pad;
    el.style.left = Math.max(4, left) + "px";
    el.style.top = Math.max(4, top) + "px";
  }

  function show(x, y, html) {
    const el = ensureEl();
    el.innerHTML = html;
    el.style.display = "block";
    position(x, y);
  }

  function hide() {
    if (tipEl) tipEl.style.display = "none";
  }

  // `htmlOrFn` may be a fixed string or a function evaluated at hover-time
  // (used where the tooltip content depends on live chart data).
  function attach(target, htmlOrFn) {
    const resolve = () => (typeof htmlOrFn === "function" ? htmlOrFn() : htmlOrFn);
    target.addEventListener("mouseenter", (e) => show(e.clientX, e.clientY, resolve()));
    target.addEventListener("mousemove", (e) => position(e.clientX, e.clientY));
    target.addEventListener("mouseleave", hide);
    target.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      show(t.clientX, t.clientY, resolve());
      e.stopPropagation();
    });
  }

  document.addEventListener("touchstart", hide);

  return { show, hide, attach };
})();
