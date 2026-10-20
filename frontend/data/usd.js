/**
 * data/usd.js — US Dollar Index (ICE) seasonal data
 * Source: Moore Research Center · 35-Year (1985–2019) · 15-Year · 5-Year
 */

const ASSET_CONFIG = {
  id:       "usd",
  name:     "US Dollar Index",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 35-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · US Dollar Index (ICE) · 35-Year Seasonal (1985–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "35-YR",
  ltSigKey: "sig35",
  ltKey:    "s35",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig35: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs rising from year-end lows. Clean entry window.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★☆", note:"All 3 TFs in uptrend. Enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★☆", note:"Continuation. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★☆", note:"Trend intact. 35-yr leading." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★☆", note:"Building into Feb/Mar peak window." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sig35: "bull",
    combined: "bull", combinedLabel: "LONG → WATCH", stars: 3,
    note: "35-yr peaks late Feb. 15-yr still rising. 5-yr choppy. Begin watching for exit.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s35:"bull", com:"LONG ★★★☆☆", note:"35-yr and 15-yr bullish. 5-yr unreliable. Hold longs." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s35:"bull", com:"LONG ★★★★☆", note:"35-yr approaching peak. Final leg up." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s35:"bear", com:"WATCH ★★☆☆☆", note:"35-yr PEAKS late Feb. Begin exiting longs." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s35:"bear", com:"NEUTRAL ★★☆☆☆", note:"35-yr declining. 15-yr still up. Reduce exposure." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "bull", sig35: "bear",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "35-yr declining. 15-yr peaks mid-Mar. 5-yr erratic. High divergence.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s35:"bear", com:"MIXED ★★☆☆☆", note:"TFs split. No clean bias." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s35:"bear", com:"MIXED ★★☆☆☆", note:"15-yr approaching its peak. 35-yr declining." },
      { wk:"Wk 3", s5:"bull", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"15-yr peaks mid-Mar and rolls over. All TFs turning bear." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★☆", note:"All 3 TFs now declining. Establish short position." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig35: "bear",
    combined: "flip", combinedLabel: "SELL → FLIP", stars: 4,
    note: "Playbook: SELL Wk1/2, re-entry/compound Wk4. All TFs declining then flipping late Wk4.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★☆", note:"All 3 TFs aligned bearish. Playbook SELL Wk1. Enter/hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★★", note:"Peak short conviction. Playbook SELL Wk2. Add/hold." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"5-yr starting to flatten. 35-yr and 15-yr still declining. Hold." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"FLIP LONG ★★★★☆", note:"All 3 TFs turn. Playbook BUY end Wk4. Cover shorts, enter long." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "bear", sig35: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "35-yr and 15-yr hit deepest trough of year. Hold short from April into early May.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s35:"bear", com:"SHORT ★★★★☆", note:"35-yr and 15-yr waterfall continues. Hold short." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s35:"bear", com:"SHORT ★★★★☆", note:"Deepest trough approaching. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s35:"chop", com:"COVER ★★★☆☆", note:"Trough forming. Begin covering shorts." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★☆☆", note:"All TFs base and begin recovery. Enter long for Jun bounce." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig35: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Sharp mid-year bounce. 35-yr and 15-yr strong. 5-yr unreliable.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s35:"bull", com:"LONG ★★★☆☆", note:"35-yr and 15-yr bouncing sharply. Enter long." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s35:"bull", com:"LONG ★★★☆☆", note:"Strong bounce continues. Hold longs." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s35:"bull", com:"LONG ★★★☆☆", note:"Approaching mid-year peak. Watch for exit." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s35:"chop", com:"WATCH ★★☆☆☆", note:"Peak zone. Begin taking profit." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig35: "bear",
    combined: "chop", combinedLabel: "MIXED / EXIT", stars: 2,
    note: "Mid-year peak hits early Jul then 35-yr rolls over. Exit longs, prepare short re-entry.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s35:"bull", com:"LONG / EXIT ★★☆☆☆", note:"Final push. 35-yr peaks early Jul. Exit remaining longs Wk1." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s35:"bear", com:"NEUTRAL ★★☆☆☆", note:"Rollover begins. Stand aside." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"All TFs declining. Re-enter short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"Bear resumes. Hold short into Aug." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig35: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Secondary bear leg. All TFs declining. Re-entry short after Jul peak.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★☆", note:"All TFs aligned bear. Hold/add short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★☆", note:"Continued decline. Peak short pressure." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"5-yr flattening. 35-yr and 15-yr still weak. Hold." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s35:"chop", com:"HOLD ★★★☆☆", note:"Flattening. Tighten stops." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig35: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continuation of Aug decline into Sep trough.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"Bear continues. Hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"Deeper into trough." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s35:"bear", com:"SHORT / WATCH ★★★☆☆", note:"35-yr near secondary low. Watch for base." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s35:"chop", com:"NEUTRAL ★★☆☆☆", note:"Transition. Cover partial shorts." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sig35: "chop",
    combined: "flip", combinedLabel: "MAJOR REVERSAL", stars: 4,
    note: "35-yr hits major secondary trough (~5). Hard reversal late Oct. Cover all shorts, enter long.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★☆☆", note:"Final bear leg. 35-yr approaching major low." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s35:"bear", com:"COVER ★★★☆☆", note:"35-yr trough zone. Begin covering all shorts." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s35:"bull", com:"LONG WATCH ★★★☆☆", note:"35-yr reversal confirmed. Cautious long entry." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★☆", note:"All TFs turning. Enter long. Nov/Dec rally begins here." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig35: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Strongest seasonal window of the year. All 3 TFs surging. Highest conviction.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"All TFs fully aligned. Strong seasonal lift." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"Acceleration phase. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"Continued strength. No exit signal." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"Into Dec. All TFs remain bullish." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig35: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Peak of seasonal year. All TFs converge near 95–100. Hold longs into year end.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"All TFs surging. Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"Peak zone approaching. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"5-yr peaks ~95–100. All TFs at highs." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s35:"bull", com:"LONG / WATCH ★★★★☆", note:"Late Dec. 5-yr may roll. Hold into Jan." },
    ]
  },
];

const SEASONAL_DATA = `
US DOLLAR INDEX (ICE) — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, 35-Year (1985–2019), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan: Rising from very low base (~5–10). Clean uptrend.
Feb–Mar: Choppy and erratic. Peaks mid-Mar ~50–55 but unreliable.
Apr: Declining. Wk1–2 SHORT. Wk4 flip LONG.
May–Jun: Choppy. No sustained trend. Avoid.
Jul: Brief spike then collapse. No conviction.
Aug–Sep: Weak and declining. Secondary low.
Oct: Base forming. Late Oct recovery begins.
Nov–Dec: Strongest window. Surges to ~95–100 by Dec.

=== 15-YEAR SEASONAL ===
Jan: Rising from ~50. Steady bullish trend.
Feb–Mar: Peaks mid-March ~70–75. Strong rally then rollover.
Apr: Declining all month. Wk1–3 SHORT. Wk4 turn LONG.
May: Deepest trough ~5–10. Waterfall decline from Apr.
Jun–Jul: Sharp bounce to ~70. Peaks late Jun/early Jul.
Aug–Sep: Secondary decline from Jul peak.
Oct: Second trough ~25. Hard base late Oct.
Nov–Dec: Surges from ~25 to ~85–90. Strongest trend of year.

=== 35-YEAR SEASONAL ===
Jan: Rising from lows (~15–20). Structural uptrend.
Feb: Peaks EARLIEST — late Feb ~85–90. Sharp rollover begins.
Mar–Apr: Declining. Mar Wk3–4 SHORT. Apr Wk1–3 SHORT. Wk4 flip LONG.
May: Primary trough ~5–10. Deepest structural low.
Jun–Jul: Strongest mid-year bounce. Peaks ~90–95 early Jul.
Aug–Sep: Secondary decline from Jul peak.
Oct: MAJOR secondary trough ~5. Critical reversal. Cover all shorts late Oct.
Nov–Dec: Surges to ~95–100. Highest conviction LONG of entire year.

=== PLAYBOOK SIGNALS (April) ===
USD SELL: Wk1/2 of April
USD RE-ENTRY/COMPOUND: Wk4 — all 3 TFs flip bullish late Wk4
USD BUY: End of Wk4 April

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY — One paragraph covering the full-year seasonal arc for the US Dollar Index. Note the two major cycles: the Feb/Mar peak → May trough → Jun/Jul bounce → Oct trough → Nov/Dec peak structure.

2. MONTH-BY-MONTH BIAS — Jan through Dec. Directional bias, best entry/exit timing, key divergences.

3. WEEK-BY-WEEK APRIL BIAS — Priority month. Each week: bias, reasoning from all 3 TFs, specific trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Entry timing, expected duration, conviction level, confirming timeframes.

Format clearly with headers. Be specific. Use exact week references. Flag all timeframe divergences.
`;
