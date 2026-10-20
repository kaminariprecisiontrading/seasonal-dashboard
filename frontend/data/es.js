// data/es.js — S&P 500 E-Mini (CME) · 23-Year Seasonal (1997–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 23-YR=100 · 15-YR=100 · 5-YR=90.71

const ASSET_CONFIG = {
  id:       "es",
  name:     "S&P 500 eMini (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 23-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · S&P 500 E-Mini CME (ES) · 23-Year Seasonal (1997–2019) · 15-Year · 5-Year overlays. Reference: 23-YR=100, 15-YR=100, 5-YR=90.71 at 02 Jan 2020.",
  ltLabel:  "23-YR",
  ltSigKey: "sig23",
  ltKey:    "s23",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig23:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all TFs near 0; primary long entry",
    stars:5,
    note:"ANNUAL TROUGH: All three TFs begin the year near their lows. The E-Mini ES (23-year) tracks virtually identical to the SP 39-year with the same trough-to-peak seasonal arc. Buy January's weakness aggressively. The December year-end target is 100/100/90.71.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"bear", com:"LONG ★★★★★", note:"Annual trough; all TFs near 0; BUY MAX; hold 12 months" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"LONG ★★★★★", note:"Still at trough; continue accumulating longs" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"LONG ★★★★", note:"Trough confirmed; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★", note:"Recovery initiated; hold into year-end" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig23:"bear",
    combined:"bear", combinedLabel:"SECONDARY TROUGH — brief Feb dip; hold longs; buy on weakness",
    stars:3,
    note:"Brief secondary trough in February — all TFs near 0-10. This is a buy-on-weakness moment, not a sell. The ES pattern mirrors SP500. Hold longs through February volatility.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"Slight Feb dip; TFs near 5-10; hold longs" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"CHOP ★★", note:"Secondary trough; near 0; buy on dip" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Recovery from Feb trough; add longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Recovery established; hold into Q2" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; 23-YR to ~25; spring trend building",
    stars:3,
    note:"All TFs rising. 23-YR from ~10 to ~25. 15-YR at ~20. 5-YR at ~35–40. Spring seasonal builds from February trough. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 18; all rising; spring bull" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 22; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 25; hold into April" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Spring trend established; hold" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; 23-YR to ~45; Q1 earnings support",
    stars:3,
    note:"Strong April uptrend. 23-YR from ~25 to ~45. 15-YR at ~40. 5-YR at ~48. Q1 earnings season is a seasonal catalyst. The E-Mini shows a sharper April move than the SP500 39-year.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 30; 5-YR at 40; earnings season" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 38; rising strongly" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 42; 5-YR at 47" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold; May continuation" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; 23-YR to ~48; 5-YR at ~55",
    stars:3,
    note:"Continued uptrend. 23-YR at ~48. 15-YR at ~45. 5-YR at ~55. The May seasonal for the ES is bullish in the 23-year pattern. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 44; all rising; hold" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 47; 5-YR at 53" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 49; summer approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold into June" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — 5-YR summer peak at ~65; 23-YR at ~50; TF divergence widens",
    stars:3,
    note:"5-YR has its early summer peak at ~65 (recent years much stronger). 23-YR at ~50. 15-YR at ~48. The divergence between 5-YR and 23-YR reflects that recent years (post-2015) have had very strong summers. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"5-YR at 60; 23-YR at 50; summer divergence" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"5-YR at 62; 23-YR holding 50" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"5-YR summer peak zone; 23-YR flat" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold; July seasonal" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — 5-YR summer peak ~80; 23-YR at ~50; Q2 earnings",
    stars:4,
    note:"5-YR summer peak at ~80 — the annual high for the 5-year window. 15-YR at ~60. 23-YR at ~50 (notably lower). The divergence between recent (5-YR) and long-term (23-YR) is at its widest in summer. Q2 earnings drive the near-term bull. The 23-YR will close the gap in Q4.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★", note:"5-YR at 75; 23-YR at 50; earnings season; hold max" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★", note:"5-YR at 80 (summer peak); 23-YR holding 50" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Summer peak zone; 5-YR pulling back; 23-YR at 50" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold; August seasonal approaching" },
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"bull", sig23:"bear",
    combined:"chop", combinedLabel:"CHOP — 23-YR WEAKNESS to ~38; 5-YR pulling back; manage risk",
    stars:2,
    note:"UNIQUE ES FEATURE: The 23-YR shows pronounced August weakness — dropping from ~50 to ~38. This is more pronounced in the 23-year window than in the SP500 39-year. 5-YR pulling back from summer peak. 15-YR at ~55. August is the one month where the ES shows meaningful weakness. Reduce longs.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s23:"bear", com:"CHOP ★★", note:"23-YR declining to 45; 5-YR pulling back; reduce longs" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s23:"bear", com:"CHOP ★★", note:"23-YR at 40; August weakness in force" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"bear", com:"CHOP ★★", note:"23-YR at 37; hold reduced long; no new shorts" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"August bottom; add back longs; Q4 loading" },
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"bull", sig23:"chop",
    combined:"chop", combinedLabel:"CHOP — 23-YR at ~40; mild September weakness; hold long bias",
    stars:2,
    note:"Mild September seasonal weakness. 23-YR flat at ~40 (below 15-YR and 5-YR). 15-YR at ~55. 5-YR at ~73. The ES 23-YR is notably weaker in September than the broader SP500 pattern — perhaps reflecting that the 1997–2019 window includes multiple September corrections. Hold longs with tight stops.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"September weakness; 23-YR at 40; hold longs, tighter stops" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"Flat; 23-YR at 38; October Q4 rally loading" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"September seasonality acknowledged; no new longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Q4 loading; rebuild longs into October" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 rally; 23-YR surging from ~40 to ~60; maximum conviction",
    stars:5,
    note:"Q4 rally initiates. 23-YR surging from ~40 to ~60. 15-YR surging to ~70. 5-YR at ~78 and rising. All three TFs aligned bullish. October has historically marked the beginning of the most powerful seasonal period for equities. Add maximum longs for the year-end target of 100/100/90.71.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Q4 bull begins; 23-YR surging from 40; add MAX longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR through 50; 15-YR at 65; full bull alignment" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 57; all TFs surging; hold maximum" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Hold max; November-December surge to 100" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — year-end surge; all TFs at 75+; approaching 100",
    stars:5,
    note:"Year-end surge accelerates. 23-YR from ~60 to ~85. 15-YR at ~85. 5-YR at ~87. All three TFs converging toward the December 100 targets. Maximum conviction long month. The year-end effect, tax-loss selling reversal, and index rebalancing all drive the seasonal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 68; all surging; hold maximum longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 78; approaching annual highs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 83; year-end peak imminent" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Hold max; December 100 target in sight" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"YEAR-END ANNUAL HIGH — 23-YR=100/15-YR=100/5-YR=90.71",
    stars:5,
    note:"Year-end annual highs. 23-YR=100. 15-YR=100. 5-YR=90.71. ALL THREE TFs at their maximum values at December 31. The ES seasonal is a near-perfect year-long bull from January trough (0) to December peak (100). The cycle then resets. Note: 23-YR and 15-YR both hit exactly 100 — the most bullish combined year-end in all index seasonals.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 93; 15-YR at 97; approaching 100" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 98; 15-YR at 100; Santa Claus rally" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"At annual highs; 100/100/91; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Year-end; 23-YR=100/15-YR=100/5-YR=90.71; cycle resets" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Using the ES seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 23-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== S&P 500 E-MINI CME — SEASONAL FRAMEWORK ===
Asset: S&P 500 E-Mini CME (ES) · 23-Year Seasonal (1997–2019)
Reference 02 Jan 2020: 23-YR=100, 15-YR=100, 5-YR=90.71

YEARLY ARC:
January/February = ANNUAL TROUGH (all TFs near 0) — BUY.
H1 (Jan-Jun) = gradual bull; 5-YR outperforms 23-YR dramatically.
July = 5-YR summer peak ~80; 23-YR at only ~50.
August = PRONOUNCED 23-YR WEAKNESS to ~38 (unique ES feature vs SP500).
October = Q4 rally initiates; 23-YR surges from 38 to 60+.
November-December = YEAR-END at 100/100/90.71 (both 23-YR and 15-YR hit 100).

=== PLAYBOOK SIGNALS ===
LONG #1: January Wk1 — annual trough near 0; BUY immediately; hold 12 months
CAUTION: August — 23-YR drops to 38 (unique weakness); reduce longs or tighten stops
LONG #2: October Wk1 — Q4 bull begins; add maximum longs; 23-YR target 100 by Dec
TARGET: Both 23-YR and 15-YR hit exactly 100 at year-end (most bullish combined reading)

KEY FEATURES:
• Aug weakness is more pronounced in 23-YR (1997–2019) than SP500 39-YR (includes 2000–2002, 2008 crashes)
• 5-YR vs 23-YR gap in H1: 5-YR at 80 in July while 23-YR is only at 50 (recent years much stronger)
• October through December: 23-YR surges from 38 to 100 (+62 pts in 3 months)
• 23-YR and 15-YR both reach exactly 100 at year-end — perfect seasonal peak

TF REFERENCE VALUES (02 Jan 2020):
• 23-YR: 100 | • 15-YR: 100 | • 5-YR: 90.71
Annual high: ALL TFs at year-end December | Annual low: All TFs in January
`;
