/**
 * data/aud.js — Australian Dollar (AUD/USD) seasonal data
 * Source: Moore Research Center · 34-Year (1986–2019) · 15-Year · 5-Year
 */

const ASSET_CONFIG = {
  id:       "aud",
  name:     "AUD / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · AUD/USD CME Futures · 34-Year Seasonal (1986–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "All month. Enter Dec/Jan lows.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Strong seasonal lift. Enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Continuation. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Trend intact across all 3." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Into Feb. No signal to exit yet." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Full month bullish. Hold longs.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Sustained rally continues." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Mid-month strength." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"No top signal yet." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Building into March peak." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Final leg of Q1 bull. Peak approaches end of month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Strong. All TFs aligned." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Acceleration phase." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"15-yr approaching peak." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG → WATCH ★★★★☆", note:"15-yr peaks late Mar. Begin watching for reversal signals." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "Most critical month. Long Wk1, flip short Wk2 onwards.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG → FLIP ★★★★☆", note:"All 3 TFs still bullish early Wk1. 5-yr hits score 100. Exit longs / flip short by end of Wk1." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"chop", com:"SHORT ★★★☆☆", note:"5-yr & 15-yr rolling over. 34-yr still transitioning. Short bias." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★", note:"All 3 TFs aligned bearish. Highest conviction short of the month." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★", note:"Sustained decline. Hold shorts into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "Deepest waterfall decline of the year. Hold short from Apr.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★", note:"Steep decline continues. Hold / add." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★★", note:"Acceleration lower. Peak short pressure." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"Ongoing decline. 34-yr trough forming." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"HOLD / WATCH ★★★☆☆", note:"Late May chop. Watch for trough signal. Begin tightening stops." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Trough forming. Begin covering into month end.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"Still declining. Hold remaining shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"Near trough zone. Begin partial cover." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s34:"bear", com:"SHORT / COVER ★★★☆☆", note:"5-yr starts flattening. Reduce exposure." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"Trough. Cover shorts. Await Jul bounce signal." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sig34: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "15-yr bounce sharp but 5-yr & 34-yr choppy. Short-term long only.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s34:"chop", com:"MIXED ★★☆☆☆", note:"15-yr lifts sharply. 5-yr & 34-yr neutral. Cautious long only." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★☆☆", note:"Best week of Jul. All 3 show some lift. Short-term long trade." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"Bounce fades. Exit longs. Avoid." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★☆☆", note:"Rollover resumes. Re-enter short." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Re-entry short after Jul bounce. Secondary bear leg.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"All TFs decline again. Re-enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"Secondary low forming. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s34:"chop", com:"HOLD ★★★☆☆", note:"Slight flattening. Maintain but watch." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"HOLD ★★★☆☆", note:"Into Sep. No reversal yet." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Continuation of Aug decline. 34-yr bear extends longest.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"Bear resumes. Hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★☆", note:"Mid-Sep decline." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s34:"bear", com:"SHORT / WATCH ★★★☆☆", note:"5-yr & 15-yr flattening. 34-yr still weak." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"Transition. Begin watching for base." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sig34: "chop",
    combined: "chop", combinedLabel: "NEUTRAL", stars: 2,
    note: "Base building. All TFs choppy. Avoid or minimal exposure.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"No edge. Avoid." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"Sideways grinding." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s34:"chop", com:"WATCH ★★☆☆☆", note:"5-yr starting to lift. Early signal only." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"chop", com:"LONG WATCH ★★★☆☆", note:"5-yr & 15-yr turn. 34-yr lagging. Cautious early long." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sig34: "chop",
    combined: "chop", combinedLabel: "NEUTRAL", stars: 2,
    note: "Continued base. Bias shifts late Nov into Dec.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"Still base-building." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s34:"chop", com:"NEUTRAL ★★☆☆☆", note:"No clean direction." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s34:"chop", com:"WATCH ★★☆☆☆", note:"5-yr recovering. Monitor for confirmation." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★☆", note:"Late Nov: all 3 TFs turn. Enter long for Dec/Q1 cycle." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Recovery confirmed. All 3 aligned. Entry for Q1 bull.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"chop", com:"LONG ★★★★☆", note:"5-yr & 15-yr leading. 34-yr lagging but turning." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"All 3 aligned. Best Dec entry." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s34:"bull", com:"LONG ★★★☆☆", note:"15-yr briefly flat. 5-yr & 34-yr continue up." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s34:"bull", com:"LONG ★★★★☆", note:"Into Jan. Hold for Q1 seasonal bull cycle." },
    ]
  },
];

const SEASONAL_DATA = `
AUSTRALIAN DOLLAR (AUD/USD) — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, 34-Year (1986–2019), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan–Mar: Strongly bullish. AUD elevated 80–85 range. All weeks bullish.
Apr Wk1: Peak at score ~100 (absolute high of year). Brief long still valid.
Apr Wk2: Reversal begins. Short bias.
Apr Wk3–4: Steep decline. Strong short.
May–Jun: Waterfall decline. Deep trough. Strong short all weeks.
Jul: Choppy. Minor bounce attempts. No clean trend.
Aug–Sep: Secondary bear leg. Short bias.
Oct–Nov: Bottoming. Choppy. Base formation.
Dec: Recovery begins. Long bias.

=== 15-YEAR SEASONAL ===
Jan–Mar: Strongly bullish. Peaks late March/very early April around 95–100.
Apr Wk1: Brief final push, then rollover. Peak comes slightly before 5-yr.
Apr Wk2–4: Sharp decline. Strong short from Wk2.
May–Jun: Deep trough ~25–30. Waterfall. Confirms 5-yr bear.
Jul Wk1–2: Sharp bounce to ~75. Notable counter-trend rally. Cover shorts / long trade.
Jul Wk3–4: Bounce fades. Chop/rollover.
Aug–Sep: Resumption of decline. Re-enter short.
Oct–Nov: Choppy base. Bias turns late Nov.
Dec: Moderate recovery. Long bias confirmed.

=== 34-YEAR SEASONAL ===
Jan–Mar: Structural bull. Rises from ~30 to ~85–90. Slowest but most reliable.
Apr Wk1: Peak at 85–90. Slightly more gradual rollover than shorter timeframes.
Apr Wk2: Chop/transition. 34-yr lagged slightly.
Apr Wk3–4: All 3 timeframes aligned bearish. Highest conviction short.
May–Jun: Structural decline. Trough ~25. Longest timeframe confirms the sell.
Jul: Subdued bounce only. Structural bear weight continues.
Aug–Sep: Secondary low. 34-yr bear extends longer.
Oct–Dec: Gradual base and recovery. Slowest of all 3. Structural base only.

=== PLAYBOOK SIGNALS ===
AUD BUY: Week 1 of April.
AUD SELL: Week 2–3 of April.

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY (one paragraph covering the macro seasonal arc for AUD across the full year)

2. MONTH-BY-MONTH BIAS TABLE (Jan through Dec, with overall directional bias and best entry timing per month)

3. WEEK-BY-WEEK APRIL BIAS (this is the priority month — give specific week-by-week guidance for April Wk1, Wk2, Wk3, Wk4 with: bias, reasoning from all 3 timeframes, and the best trade action)

4. KEY SEASONAL TRADE SETUPS (top 3 highest conviction trades for AUD across the year with entry, expected duration, and conviction level)

Format your response clearly with headers. Be specific, analytical, and professional. Use exact week references.
`;
