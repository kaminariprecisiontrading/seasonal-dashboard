/**
 * data/gbp.js — British Pound (GBP/CME) seasonal data
 * Source: Moore Research Center · 40-Year (1980–2019) · 15-Year · 5-Year
 */

const ASSET_CONFIG = {
  id:       "gbp",
  name:     "GBP / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · British Pound (CME) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEARISH", stars: 2,
    note: "40-yr and 15-yr declining from Dec. 5-yr volatile. Net bearish but no clean trade.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★☆☆☆", note:"40-yr and 15-yr declining. 5-yr choppy. Follow longer TFs cautiously." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★☆☆☆", note:"Continued decline. No clean edge." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Approaching Feb trough window. Hold short." },
      { wk:"Wk 4", s5:"chop", s15:"bear", s40:"bear", com:"SHORT / WATCH ★★☆☆☆", note:"Near Feb trough. Begin watching for reversal." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "TROUGH / BASE", stars: 2,
    note: "Primary annual trough. 15-yr near zero, 40-yr at lows. Cover shorts, watch for reversal.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s40:"bear", com:"COVER ★★☆☆☆", note:"Near annual lows. Cover remaining shorts." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★☆☆☆", note:"Base forming. Stand aside." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG WATCH ★★★☆☆", note:"All TFs beginning recovery. Early long entry — Feb trough confirmed." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Rally beginning. Enter long. Mar surge incoming." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "All 3 TFs surge together from Feb trough. Strongest and cleanest bull window of year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs accelerating. Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Strong momentum. All 3 TFs aligned." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Final leg into Apr peak. Hold." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG / WATCH ★★★★☆", note:"Approaching absolute peak. Begin planning exit. Watch closely." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "flip", combinedLabel: "PEAK → SELL", stars: 5,
    note: "Playbook: BUY Wk1 (absolute peak), SELL Wk4. All 3 TFs hit ~100 simultaneously then collapse.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"EXIT LONGS ★★★★★", note:"Playbook BUY Wk1 — all 3 TFs at absolute peak ~95–100. This is the highest conviction exit / flip point of year. Exit all longs, flip short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All 3 TFs rolling over simultaneously. Highest conviction SHORT entry. Add." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Waterfall decline. All TFs aligned. Hold short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Playbook SELL Wk4 confirmed. All TFs declining. Hold into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "Steep waterfall continuation from Apr peak. All TFs declining. Hold short.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Steep decline continues. Hold / add." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Peak short pressure. All TFs waterfall." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continued decline. Approaching Jun trough zone." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"HOLD / WATCH ★★★☆☆", note:"Late May flattening. Tighten stops. Watch for base." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "5-yr sharp bounce to ~80 — notable but not confirmed by 40-yr or 15-yr. Avoid or short-term only.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", s40:"chop", com:"MIXED ★★☆☆☆", note:"5-yr bounces sharply. 40-yr and 15-yr still flat/weak. Cautious long only." },
      { wk:"Wk 2", s5:"bull", s15:"chop", s40:"chop", com:"MIXED ★★☆☆☆", note:"5-yr still elevated. Longer TFs not confirming. No conviction." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"chop", com:"NEUTRAL ★★☆☆☆", note:"5-yr rolling over from bounce. Exit any longs." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"chop", com:"NEUTRAL ★★☆☆☆", note:"Back to choppy. Stand aside." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "All 3 TFs volatile and directionless. No reliable signal. Avoid.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"No edge. All TFs directionless." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"Volatile. Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"No clean bias." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"Into Aug. Still no edge." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "Continued chop across all TFs. No directional bias. Avoid.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"Volatile mid-range. No edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"All TFs flat/choppy." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"AVOID ★☆☆☆☆", note:"Still no clean direction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Late Aug: all TFs beginning secondary decline into Sep trough." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All 3 TFs declining to secondary annual trough ~30. Clear short window.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"All TFs declining. Secondary trough approaching. Enter/hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continued decline. Hold." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Near Sep trough. Hold but watch." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"COVER ★★★☆☆", note:"Trough forming. Cover shorts. Oct recovery incoming." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All 3 TFs recovering from Sep trough. Clean seasonal lift. Enter long.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"All TFs turning up from Sep low. Enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Recovery rally underway. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Continued strength. Hold into Nov." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Building into Nov. All TFs aligned." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "40-yr peaks ~75–80 in Nov. Strong bull month. Begin watching for Dec weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"40-yr and 5-yr strong. Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Continued strength." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bull", com:"LONG / WATCH ★★★☆☆", note:"40-yr near peak. 5-yr and 15-yr flattening. Begin planning exit." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"EXIT ★★★☆☆", note:"All TFs rolling. Exit longs. Dec weakness begins." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "WEAK / SHORT", stars: 3,
    note: "All TFs decline into year end. 15-yr and 5-yr hit near-annual lows in Dec. Seasonal weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"All TFs declining. Short bias confirmed." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Continued weakness." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"5-yr and 15-yr near annual lows. 40-yr flattening." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"chop", com:"COVER / WATCH ★★☆☆☆", note:"Late Dec. Begin covering. Feb trough cycle repeating." },
    ]
  },
];

const SEASONAL_DATA = `
BRITISH POUND (GBP/CME) — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, 40-Year (1980–2019), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan: High and volatile (~55–60). Declining.
Feb: Choppy mid-range. No sustained direction.
Mar: Strong surge — peaks late Mar/early Apr ~100.
Apr Wk1: Absolute peak. Sharp reversal begins.
Apr Wk2–4: Steep waterfall decline. Strong short.
May: Steep continued decline.
Jun: Sharp bounce to ~80 — notable but not confirmed by longer TFs.
Jul–Aug: Choppy. No edge.
Aug Wk4 – Sep: Declining to secondary trough (~5–10).
Oct–Nov: Recovery rally.
Dec: Sharp decline to near-annual lows.

=== 15-YEAR SEASONAL ===
Jan: Near zero. Primary annual trough approaching.
Feb: Absolute trough (~5–10). Hard base.
Mar: Strong rally from Feb trough.
Apr Wk1: Peak ~95–100. Aligns exactly with 40-yr peak.
Apr Wk2–4: Sharp decline. Confirms sell.
May: Continued waterfall.
Jun–Aug: Choppy. No reliable signal.
Sep: Secondary trough ~30.
Oct–Nov: Recovery.
Dec: Drops sharply to near-annual lows (~5–10).

=== 40-YEAR SEASONAL ===
Jan: Declining from Dec highs (~75 → ~20).
Feb: Primary trough (~20). Base forming late Feb.
Mar: Strong structural rally from Feb trough.
Apr Wk1: Absolute annual peak ~95–100. All 3 TFs peak simultaneously — most significant point of year.
Apr Wk2–4: Structural decline begins.
May: Waterfall decline continues.
Jun–Aug: Choppy, mid-range. No directional bias.
Sep: Secondary trough (~30). Structural low.
Oct–Nov: Recovery rally. 40-yr peaks ~75–80 in Nov.
Dec: Slight pullback from Nov highs.

=== PLAYBOOK SIGNALS (April) ===
GBP BUY: Wk1 of April (all 3 TFs at absolute peak — enter and immediately exit/flip)
GBP SELL: Wk4 of April (all 3 TFs declining — hold from Wk1 flip)

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY — One paragraph covering the full-year seasonal arc for GBP. Note the Feb trough → Mar–Apr peak → May waterfall → Sep secondary trough → Oct–Nov recovery → Dec weakness cycle.

2. MONTH-BY-MONTH BIAS — Jan through Dec. Directional bias, best entry/exit timing, key divergences.

3. WEEK-BY-WEEK APRIL BIAS — Priority month. Each week: bias, reasoning from all 3 TFs, specific trade action. Note the BUY Wk1 (immediate flip) and SELL Wk4 playbook signals.

4. TOP 3 SEASONAL TRADE SETUPS — The 3 highest conviction trades for GBP. Entry timing, expected duration, conviction level, confirming timeframes.

Format clearly with headers. Be specific. Use exact week references. Flag all timeframe divergences.
`;
