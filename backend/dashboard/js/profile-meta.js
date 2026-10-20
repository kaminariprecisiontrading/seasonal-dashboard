// Shared profile metadata — colors, stylized shape icons, and descriptive
// copy — used by both the per-asset dashboard (profile cards) and the
// profile detail pages (dashboard/profiles/). Single source so the two
// never drift apart. Descriptive copy is sourced directly from
// market-profiling-system-spec.md §4.2 — keep the two in sync if either
// changes.

const KPT_PROFILE_COLOR = {
  "Trend Day (Up)": "var(--bull)",
  "Trend Day (Down)": "var(--bear)",
  "Volatile Day": "var(--expansion)",
  "Volatile Reversal Day": "var(--chop)",
  "Quiet Drift Day (Up)": "var(--bull)",
  "Quiet Drift Day (Down)": "var(--bear)",
  "Compression Day": "var(--compression)",
  "Normal Day": "var(--normal)",
};

// Small stylized sparkline-style shape per profile — a visual mnemonic for
// the profile's characteristic price path, NOT a real historical example
// (that's the candlestick chart on the detail page, built from an actual
// exemplar day). Deliberately simple: a single stroked polyline in a
// 100x40 viewBox.
const KPT_PROFILE_ICON_PATH = {
  "Trend Day (Up)": "M5,26 L16,30 L32,22 L50,15 L70,9 L95,4",
  "Trend Day (Down)": "M5,14 L16,10 L32,18 L50,25 L70,31 L95,36",
  "Volatile Day": "M5,20 L20,6 L35,32 L50,10 L65,30 L80,14 L95,22",
  "Volatile Reversal Day": "M5,20 L25,4 L50,36 L75,18 L95,20",
  "Quiet Drift Day (Up)": "M5,24 L30,22 L55,19 L75,16 L95,13",
  "Quiet Drift Day (Down)": "M5,16 L30,18 L55,21 L75,24 L95,27",
  "Compression Day": "M5,20 L20,17 L35,23 L50,18 L65,22 L80,19 L95,20",
  "Normal Day": "M5,22 L20,14 L35,24 L50,12 L65,26 L80,16 L95,20",
};

const KPT_PROFILE_META = {
  "Trend Day (Up)": {
    axisRange: "Expansion",
    axisShape: "Directional",
    rule: "Expansion + Directional, closed near the day's high.",
    why: "Big range <b>and</b> closed near an extreme &mdash; the move was both large and held. Matches the everyday trading sense of \"trended persistently and didn't give it back.\"",
    timingSignature: "Typically shows the <b>Late Push</b> timing signature: the low forms early in the day, then price grinds to new highs right into the close.",
  },
  "Trend Day (Down)": {
    axisRange: "Expansion",
    axisShape: "Directional",
    rule: "Expansion + Directional, closed near the day's low.",
    why: "Big range <b>and</b> closed near an extreme &mdash; the move was both large and held. Matches the everyday trading sense of \"trended persistently and didn't give it back.\"",
    timingSignature: "Typically shows the <b>Late Push</b> timing signature: the high forms early in the day, then price grinds to new lows right into the close.",
  },
  "Volatile Day": {
    axisRange: "Expansion",
    axisShape: "Mixed",
    rule: "Expansion + Mixed closing shape.",
    why: "Big range but closed only moderately off the midpoint &mdash; real two-way movement without a clean directional resolution. \"Volatile,\" not \"Trend,\" because size dominates the story, not direction.",
    timingSignature: "No single dominant timing signature &mdash; that's part of what makes it \"Mixed\" rather than a clean Trend or Reversal shape.",
  },
  "Volatile Reversal Day": {
    axisRange: "Expansion",
    axisShape: "Balanced",
    rule: "Expansion + Balanced closing shape.",
    why: "Big range but closed essentially back at the midpoint &mdash; a big move that got substantially or fully retraced. \"Reversal\" captures the round-trip; split out from Volatile Day because the give-back, not just the size, is now the dominant fact about the day.",
    timingSignature: "Often shows <b>Late Resolution</b> or <b>Fade Risk</b> timing &mdash; the day stays undecided, or gives back an early move later on.",
  },
  "Quiet Drift Day (Up)": {
    axisRange: "Compression",
    axisShape: "Directional",
    rule: "Compression + Directional, closed near the day's high.",
    why: "Small range, but still closed at an edge of that small range &mdash; persistently one-sided without much amplitude. \"Drift\" is the low-energy version of \"Trend\"; kept separate because the <b>amount</b> of conviction differs even though the shape (closed at an edge) is the same.",
    timingSignature: "The same directional-conviction shape as Trend Day, just at much smaller amplitude.",
  },
  "Quiet Drift Day (Down)": {
    axisRange: "Compression",
    axisShape: "Directional",
    rule: "Compression + Directional, closed near the day's low.",
    why: "Small range, but still closed at an edge of that small range &mdash; persistently one-sided without much amplitude. \"Drift\" is the low-energy version of \"Trend\"; kept separate because the <b>amount</b> of conviction differs even though the shape (closed at an edge) is the same.",
    timingSignature: "The same directional-conviction shape as Trend Day, just at much smaller amplitude.",
  },
  "Compression Day": {
    axisRange: "Compression",
    axisShape: "Balanced / Mixed",
    rule: "Compression range regime, Balanced or Mixed closing shape.",
    why: "Small range, closed near the middle &mdash; the \"coiling,\" non-committal day. Default label for small-range days without a clear directional tilt.",
    timingSignature: "No dominant timing signature expected &mdash; low amplitude, no strong directional push to time.",
  },
  "Normal Day": {
    axisRange: "Normal",
    axisShape: "Any",
    rule: "Range regime between the 20th and 80th percentile, any closing shape.",
    why: "Deliberately the largest, least differentiated bucket (~57% of days on both assets). Most days are neither unusually big nor unusually small, so they don't earn a directional-shape label &mdash; a rule that fires on most days isn't adding decision value.",
    timingSignature: "No dominant timing signature by design &mdash; this bucket intentionally doesn't distinguish shape.",
  },
};

function kptProfileSlug(name) {
  return name.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, "-");
}

function kptProfileIconSvg(name, size) {
  size = size || 44;
  const path = KPT_PROFILE_ICON_PATH[name];
  const color = KPT_PROFILE_COLOR[name] || "var(--muted)";
  if (!path) return "";
  return `<svg viewBox="0 0 100 40" width="${size}" height="${size * 0.4}" class="profile-icon">
    <polyline points="${path.replace(/[ML]/g, "").trim()}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;
}
