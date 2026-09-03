// Plain-language explanations for every statistical term used on the
// dashboard. Added so the raw numbers (kept deliberately rigorous — see
// HANDOVER "Framing discipline") stay approachable for a non-technical
// trader without diluting them for anyone reading the underlying stats.
//
// Usage: static HTML — `<span class="glossary-icon" data-glossary-key="adr">?</span>`.
// Dynamically-rendered stat tiles — pass `glossary: "adr"` into the tile
// object in dashboard.js; it renders the same icon.

const KPT_GLOSSARY = {
  adr: "Average Daily Range — the average size of the day's price swing (high minus low) over a trailing window of days.",
  trading_days: "The number of valid trading days in the dataset, after excluding feed-outage/data-gap days.",
  percentile: "Shows where a value ranks against history. 'p20' means 20% of days had a smaller range than this — 80% had a bigger one.",
  iqr: "The Interquartile Range (the solid box on the chart) — the middle 50% of all days, from the 25th to 75th percentile. Where most 'ordinary' days fall.",
  median: "The middle value when every day is sorted smallest to largest — half of days were bigger, half were smaller. Less skewed by a handful of extreme days than the mean.",
  mean: "The mathematical average of all days. Can be pulled higher by a few extreme days (e.g. a crash) even if most days were smaller — compare against the median to see if that's happening.",
  mode_binned: "The single most common range 'bucket' — the size range more days landed in than any other. The most statistically meaningful way to answer 'what's typical' for continuous price data.",
  mode_raw: "The exact value that repeated most often across history. Shown for reference, but with continuous price data this is often based on very few coincidentally-identical days — a much weaker signal than the binned mode above.",
  concentration: "How tightly the high/low cluster around one time of day, from 0 (scattered randomly) to 1 (always the same time). Higher = a more reliable timing pattern.",
  circular_mean: "The 'average' time of day, calculated correctly across the midnight boundary — so 11pm and 1am average to midnight, not to noon.",
  circular_median: "The 'middle' time of day by the same midnight-safe logic as the circular mean — less pulled around by a few outlier times.",
  session: "Which FX trading session (Asian, London, New York, or an overlap) was active at that time, in UTC.",
  lookback_window: "How far back the statistics look. Full History uses 20 years of data; shorter windows (5Y/1Y/3M) react faster to current market conditions but rest on a smaller sample.",
  compression: "A day/week/month with an unusually small range compared to its own recent history (bottom 20th percentile).",
  expansion: "A day/week/month with an unusually large range compared to its own recent history (top 20th percentile).",
  closing_strength: "How close the day closed to one edge of its own range vs. the middle. High = closed near a high/low (the move held); low = closed near the middle (the move was given back).",
  extreme_timing: "Describes when the day's high and low formed relative to each other — e.g. whether it pushed to new extremes late, or settled early and went quiet.",
  n_sample: "The number of historical days/weeks/months/years behind this statistic. A stat built on a small sample deserves less confidence than the same-looking stat built on thousands of days.",
};

function kptGlossaryIcon(key) {
  return `<span class="glossary-icon" data-glossary-key="${key}" tabindex="0">?</span>`;
}

function kptAttachGlossaryIcons(root) {
  (root || document).querySelectorAll(".glossary-icon").forEach((iconEl) => {
    if (iconEl.dataset.kptBound) return;
    iconEl.dataset.kptBound = "1";
    const key = iconEl.getAttribute("data-glossary-key");
    const text = KPT_GLOSSARY[key] || "No description available.";
    const label = key.replace(/_/g, " ");
    KPTTooltip.attach(iconEl, `<b>${label}</b><br>${text}`);
  });
}

document.addEventListener("DOMContentLoaded", () => kptAttachGlossaryIcons());
