/**
 * data/jpy.js — Japanese Yen (CME) seasonal data
 * Source: Moore Research Center · 40-Year (1980–2019) · 15-Year · 5-Year
 */

const ASSET_CONFIG = {
  id:       "jpy",
  name:     "Japanese Yen",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Japanese Yen (CME) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEARISH", stars: 3,
    note: "40-yr and 15-yr declining. 5-yr choppy. Net bearish but messy.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bear", s40:"bear", com:"MIXED ★★☆☆☆", note:"TFs split. No clean trade." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"40-yr and 15-yr both declining. Follow longer TFs short." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Bear continues. Hold short." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bear", com:"MIXED ★★☆☆☆", note:"15-yr base forming. Reduce short exposure." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "NEUTRAL", stars: 2,
    note: "40-yr hits primary trough. All TFs bottoming. Cover shorts, watch for reversal.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s40:"bear", com:"SHORT / COVER ★★☆☆☆", note:"40-yr near trough. Cover remaining shorts." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★☆☆☆", note:"Base forming. Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bull", com:"WATCH ★★☆☆☆", note:"40-yr begins recovery. Watch for confirmation." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LONG WATCH ★★★☆☆", note:"15-yr and 40-yr both turning. Cautious early long entry." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "All 3 TFs aligned bullish. Strongest Q1 window. Enter long, exit mid-Mar.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All 3 TFs rising together. Highest conviction LONG of Q1." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Acceleration. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG / EXIT ★★★★☆", note:"5-yr and 15-yr peaking mid-Mar. Begin exiting." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bull", com:"FLIP ★★★☆☆", note:"5-yr and 15-yr roll over. 40-yr still rising. Reduce longs." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig40: "chop",
    combined: "flip", combinedLabel: "SELL → WATCH", stars: 3,
    note: "Playbook: BUY Wk1 (40-yr peak), SELL end Wk2/early Wk3, re-entry Wk4.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bull", com:"MIXED ★★☆☆☆", note:"Playbook BUY Wk1 — 40-yr still at peak. 5-yr and 15-yr already falling. Brief long only, tight stop." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"Playbook SELL end Wk2. 5-yr and 15-yr declining. Enter short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"chop", com:"SHORT ★★★★☆", note:"Playbook SELL early Wk3. Best short entry — 5-yr and 15-yr accelerating down." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"COVER / WATCH ★★☆☆☆", note:"Playbook re-entry Wk4. All TFs near lows. Cover shorts, watch for reversal." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "bear", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "15-yr extends Apr decline into May trough. 5-yr and 40-yr choppy.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"15-yr still declining. Hold short if entered Apr." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"Trough approaching. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s40:"chop", com:"COVER ★★☆☆☆", note:"5-yr beginning recovery. Cover shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★☆☆☆", note:"Base forming. Stand aside." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig40: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "15-yr recovering. 5-yr volatile. 40-yr choppy. Transition month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"chop", com:"MIXED ★★☆☆☆", note:"15-yr lifting. Others flat. Cautious long only if confirmed." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"Best Jun week. All 3 TFs showing lift. Enter long." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"Hold. Building into Jul/Aug bull run." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"chop", com:"HOLD ★★☆☆☆", note:"Momentum building. Hold longs into Jul." },
    ]
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "All 3 TFs aligned strongly bullish. Enter long Jul. Hold into Aug peak.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs rising. Strong seasonal lift. Add to longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Acceleration. All TFs aligned." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Continued strength. No exit signal." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Into Aug. Hold. Peak approaching." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG → EXIT", stars: 4,
    note: "Absolute annual peak. All TFs hit highs ~95–100. EXIT longs Wk2, flip short Wk3.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Final push. All TFs at or near absolute highs. Hold but watch closely." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"EXIT LONGS ★★★★☆", note:"Peak zone. All 3 TFs at ~95–100. EXIT ALL LONGS." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs roll over simultaneously. Flip short. Highest conviction SHORT entry of year." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Waterfall begins. Hold short into Sep." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "All 3 TFs in sharp decline from Aug peak. Highest conviction SHORT of year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs waterfall decline. Hold/add short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Peak short pressure. Accelerating decline." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Continued steep decline." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Into Oct. Hold shorts. Trough not yet." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "15-yr and 40-yr secondary trough forming. 5-yr volatile. Hold short but tighten.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"15-yr and 40-yr still declining. Hold short." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Near secondary trough. Hold but watch." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"COVER ★★☆☆☆", note:"Trough zone. Cover shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★☆☆☆", note:"Base forming. Stand aside." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All 3 TFs drop sharply in Nov. 15-yr hits near-annual lows. Secondary bear leg.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"All TFs declining. Re-enter short if stood aside Oct." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Acceleration lower." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"5-yr and 40-yr flattening. 15-yr still weak. Hold." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"COVER ★★☆☆☆", note:"Near lows. Cover all shorts." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All 3 TFs recovering from Nov lows. Enter long for Dec/Jan seasonal cycle.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"All TFs turning. Enter long. Dec recovery confirmed." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Rally building. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Continued recovery." },
      { wk:"Wk 4", s5:"bull", s15:"chop", s40:"bull", com:"LONG ★★★☆☆", note:"Hold into Jan. Sets up for next Mar rally cycle." },
    ]
  },
];

const SEASONAL_DATA = `
JAPANESE YEN (JPY/CME) — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, 40-Year (1980–2019), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan: Low base (~10), choppy rise. Unreliable.
Feb: Volatile mid-range. No sustained direction.
Mar: Strong spike to ~65–70 mid-Mar. Peak then sharp drop Wk4.
Apr: Collapses from Mar peak. Near lows (~5–10) by end Apr. Wk1–3 SHORT.
May–Jun: Remains low and volatile. Partial Jun recovery fades.
Jul–Aug: Surges to absolute high ~100 in Aug. Strongest seasonal window.
Sep: Collapses from Aug peak. Sharp waterfall all month.
Oct: Wildly volatile. No reliable direction. Avoid.
Nov: Drops sharply to near lows (~5–10).
Dec: Recovery. Rising into year end.

=== 15-YEAR SEASONAL ===
Jan: Starts elevated (~55–60), declining sharply.
Feb: Near lows (~25). Bottoming. Recovery late Feb.
Mar: Surges to ~65–70 mid-Mar. Strong aligned move with 5-yr.
Apr: Sharp decline from Mar peak. Drops to ~30 by end Apr.
May: Continues weak. Trough ~25–30.
Jun–Jul: Strong recovery rally. Peaks ~90–95 in Aug.
Aug: Peaks ~90–95. Sharp rollover Wk3–4.
Sep–Oct: Sharp decline from Aug peak. Secondary trough Oct ~40.
Nov: Drops sharply to ~10–15. Near annual lows.
Dec: Moderate recovery.

=== 40-YEAR SEASONAL ===
Jan: Starts mid-range (~55), declines steadily. Primary Q1 bear.
Feb: Primary trough ~10–15. Hard base late Feb. Recovery begins.
Mar: Rallies from Feb trough. Peaks early Apr ~35–40.
Apr: Peaks early Wk1 then chops flat. More gradual than shorter TFs.
May–Jun: Sideways ~25–35. No strong directional bias.
Jul–Aug: Surges strongly. Absolute annual high ~95–100 in Aug.
Sep: Sharp structural decline from Aug peak.
Oct: Secondary trough forming. Slower decline than 5-yr/15-yr.
Nov: Continues declining. Extended bear phase.
Dec: Gradual recovery. Slowest of all 3 TFs.

=== PLAYBOOK SIGNALS (April) ===
JPY BUY: Wk1 of April (40-yr still at peak, brief long)
JPY SELL: End of Wk2 / early Wk3 of April
JPY RE-ENTRY/COMPOUND: Wk4 of April (watch for reversal)

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY — One paragraph covering the full-year seasonal arc for JPY. Note the two key cycles: Feb trough → Mar rally → Apr decline, and the Jul–Aug peak → Sep–Nov decline.

2. MONTH-BY-MONTH BIAS — Jan through Dec. Directional bias, best entry/exit timing, key divergences.

3. WEEK-BY-WEEK APRIL BIAS — Priority month. Each week: bias, reasoning from all 3 TFs, specific trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Entry timing, expected duration, conviction level, confirming timeframes.

Format clearly with headers. Be specific. Use exact week references. Flag all timeframe divergences.
`;
