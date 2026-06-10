// data/sp500.js — S&P 500 (CME) · 39-Year Seasonal (1981–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 39-YR=97.58 · 15-YR=100 · 5-YR=90.71

const ASSET_CONFIG = {
  id:       "sp500",
  name:     "S&P 500 (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 39-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · S&P 500 CME (SP) · 39-Year Seasonal (1981–2019) · 15-Year · 5-Year overlays. Reference: 39-YR=97.58, 15-YR=100, 5-YR=90.71 at 02 Jan 2020.",
  ltLabel:  "39-YR",
  ltSigKey: "sig39",
  ltKey:    "s39",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig39:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all TFs near 0; BUY the year-start seasonal low",
    stars:5,
    note:"ANNUAL TROUGH: All three TFs begin the year at or near their lowest point (~0–5). This is the seasonal entry point for the year-long bull. January/early February marks the absolute floor of the S&P 500 seasonal cycle. Buy aggressively. The 39-year pattern shows that year-start weakness is the primary long entry — the year-end target is 97.58/100/90.71.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s39:"bear", com:"LONG ★★★★★", note:"Year-start trough; ALL TFs near 0; BUY MAX; year-end target 97+" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s39:"bear", com:"LONG ★★★★★", note:"Still at floor; add longs; recovery underway" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s39:"chop", com:"LONG ★★★★", note:"Trough confirmed; building long position" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"Recovery initiated; hold longs through year" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig39:"bear",
    combined:"bear", combinedLabel:"CHOP/SECONDARY TROUGH — brief February volatility; hold longs",
    stars:3,
    note:"A brief secondary dip in February — all TFs remain near 0-10 before recovering. The 'February Effect' is mild but present. This is a buy-on-dips opportunity, not a sell signal. 39-YR still at low single digits. Hold longs built in January.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s39:"chop", com:"CHOP ★★★", note:"Slight February dip; all TFs near 5-10; hold longs" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s39:"bear", com:"CHOP ★★", note:"Brief secondary trough; near 0; buy-on-dip" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Recovery from secondary trough; add longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"February recovery established; hold into March" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; 39-YR to ~25; spring momentum builds",
    stars:3,
    note:"All three TFs rising. 39-YR from ~15 to ~25. 15-YR at ~20–25. 5-YR at ~35–45 (stronger near-term). The spring bull builds from January's annual trough. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 18; all rising; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 22; 5-YR at 38; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"All TFs rising; Q2 continuation in view" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Hold into April; spring bull in force" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; 39-YR to ~35; 5-YR at ~50",
    stars:3,
    note:"Continued uptrend. 39-YR rising from ~25 to ~35. 15-YR at ~30–35. 5-YR at ~45–55. Q1 earnings season supports the seasonal. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 28; 5-YR at 47; all rising" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 32; 15-YR at 30; spring earnings" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 35; hold longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"All TFs rising; May continuation" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — steady uptrend; 39-YR to ~45; 5-YR at ~60",
    stars:3,
    note:"Steady uptrend. 39-YR from ~35 to ~45. 15-YR at ~38–45. 5-YR at ~55–65. \"Sell in May\" does NOT appear strongly in the 39-year pattern — the seasonal trend remains bullish. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 38; all rising; ignore 'Sell in May' — seasonal is bullish" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 42; 5-YR at 58; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 44; uptrend intact" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Hold into June; summer bull loading" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — summer consolidation; 5-YR peaks at ~65; 39-YR at ~50",
    stars:3,
    note:"39-YR at ~50 (mid-range). 15-YR at ~48–52. 5-YR at ~60–65 (summer peak zone). Some seasonal consolidation is typical but the 39-year trend remains bullish. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 48; 5-YR at 62; summer consolidation" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"5-YR near summer peak; 39-YR at 50" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s39:"bull", com:"LONG ★★★", note:"5-YR topping out; 39-YR holding; hold longs" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Hold; July seasonal summer bull continues" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — 5-YR summer bull peak at ~80; 39-YR at ~50; hold all longs",
    stars:4,
    note:"5-YR has its summer peak at ~80 — the highest level since year-start. 15-YR at ~60. 39-YR at ~50. Q2 earnings season drives the summer seasonal. The 5-YR running far ahead of the 39-YR signals the very recent years have been unusually bullish. Hold all longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"5-YR surging to 75; 39-YR at 50; earnings season bull" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"5-YR at summer peak ~80; hold max longs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"39-YR at 52; 15-YR at 60; all elevated" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Hold; August seasonal pause approaching" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — slight summer pause; 39-YR at ~50; 5-YR pulls back from peak",
    stars:3,
    note:"Slight summer seasonal pause. 39-YR holds near ~50. 15-YR at ~55. 5-YR pulls back from July's summer peak. The pause is typical August seasonality. Hold longs — September weakness is the risk but the 39-year trend remains intact.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"39-YR at 51; 5-YR at 77; slight summer pause" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Consolidating; 39-YR holding ~50" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Hold longs; September effect risk noted" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Hold; Q4 explosive rally loading" },
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"bull", sig39:"chop",
    combined:"chop", combinedLabel:"CHOP — mild September seasonality; 39-YR flat ~48; hold long bias",
    stars:2,
    note:"Mild September seasonal weakness — the weakest month in the 39-year S&P pattern but not a sell. 39-YR flat at ~48. 15-YR at ~55. 5-YR at ~72 (still elevated). The September seasonality is moderate. Hold longs with tighter risk management; do not short.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s39:"chop", com:"CHOP ★★", note:"Mild September weakness; 39-YR at 49; hold longs, no new shorts" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s39:"chop", com:"CHOP ★★", note:"Flat consolidation; 39-YR holding ~48" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s39:"chop", com:"CHOP ★★", note:"September seasonal acknowledged; hold longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★", note:"Q4 rally loading; October surge imminent" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 rally initiates; 39-YR surging from ~50 toward 65+",
    stars:4,
    note:"Q4 bull initiates. 39-YR surging from ~50 toward ~65. 15-YR from ~55 toward ~70. 5-YR from ~72 toward ~80. Historically, October often marks the beginning of the strongest seasonal period for US equities. Add to longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"Q4 rally begins; 39-YR surging from 50; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"39-YR through 58; 15-YR at 65; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"39-YR at 63; all TFs rising strongly" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★", note:"Hold max; November-December year-end surge" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"LONG — year-end surge; all TFs at 75+; maximum conviction",
    stars:5,
    note:"Year-end surge accelerates. 39-YR from ~65 to ~85. 15-YR from ~70 to ~90. 5-YR from ~80 to ~90. All three TFs in maximum bullish alignment. The \"year-end effect\" — tax-loss selling reversal, Santa Claus rally setup, and Q3 earnings reports — drives the seasonal high. Maximum longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"39-YR at 70; all surging; add maximum longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"39-YR at 80; 15-YR at 88; year-end rally in force" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"39-YR at 85; approaching annual highs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"Hold max longs into December; 97/100/91 targets" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig39:"bull",
    combined:"bull", combinedLabel:"YEAR-END ANNUAL HIGH — 39-YR=97.58/15-YR=100/5-YR=90.71",
    stars:5,
    note:"Year-end annual highs. 39-YR=97.58. 15-YR=100. 5-YR=90.71. ALL THREE TFs near their highest values of the year at December 31 — the S&P 500 seasonal is a year-long bull with year-end annual highs. The cycle then resets: January-February will mark the new annual trough. This is the highest combined conviction month in the entire dataset.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"39-YR at 93; 15-YR at 98; approaching annual highs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"39-YR at 96; 15-YR at 100; Santa Claus rally" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"At annual high zone; 97.58/100/90.71" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s39:"bull", com:"LONG ★★★★★", note:"Year-end close; ANNUAL HIGH; cycle resets to Jan trough" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Using the S&P 500 seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 39-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== S&P 500 CME — SEASONAL FRAMEWORK ===
Asset: S&P 500 CME (SP) · 39-Year Seasonal (1981–2019)
Reference 02 Jan 2020: 39-YR=97.58, 15-YR=100, 5-YR=90.71

YEARLY ARC:
January/February = ANNUAL TROUGH (all TFs near 0) — primary long entry.
H1 (Jan-Jun) = gradual bull trend; 5-YR outperforms 39-YR throughout.
July = 5-YR summer peak at ~80 (strongest near-term summer reading).
September = mild seasonal weakness (weakest calendar month; hold, do not short).
October = Q4 rally initiates.
November-December = YEAR-END SURGE to annual highs; year-end 39-YR=97.58/15-YR=100/5-YR=90.71.

=== PLAYBOOK SIGNALS ===
LONG #1: January Wk1 — annual trough near 0; BUY immediately; hold 12 months
LONG #2: October — Q4 rally initiates; add to longs
CAUTION: September — mild seasonal weakness; hold longs, do not initiate shorts
TARGET: Year-end near 100 for 39-YR and 15-YR

KEY FEATURES:
• Jan-Feb annual trough: ALL TFs near 0 — the only guaranteed entry in the S&P seasonal
• 5-YR consistently runs AHEAD of 39-YR throughout H1 (5-YR leads the bull)
• "Sell in May" is NOT supported by the 39-year pattern — seasonal trend remains bullish
• September weakness is mild (not a crash — just a pause)
• December annual highs: 39-YR=97.58, 15-YR=100, 5-YR=90.71 — all three at year's highs
• Amplitude: from 0 (January) to 97-100 (December) — the full year IS the trade

TF REFERENCE VALUES (02 Jan 2020):
• 39-YR: 97.58 | • 15-YR: 100 | • 5-YR: 90.71
Annual high: All TFs at year-end December | Annual low: All TFs in January
`;
