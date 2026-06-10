// data/ym.js — E-mini DJIA Index (CBOT) · 23-Year Seasonal (1997–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 23-YR=100 · 15-YR=100 · 5-YR=90.64

const ASSET_CONFIG = {
  id:       "ym",
  name:     "DJIA Index eMini (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 23-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · E-mini DJIA Index CBOT (YM) · 23-Year Seasonal (1997–2019) · 15-Year · 5-Year overlays. Reference: 23-YR=100, 15-YR=100, 5-YR=90.64 at 02 Jan 2020.",
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
    note:"ANNUAL TROUGH: All three TFs begin near 0. The DJIA E-Mini seasonal pattern is virtually identical to the ES with the same year-long bull from January trough to December peak. Buy aggressively. Year-end target: 100/100/90.64.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"bear", com:"LONG ★★★★★", note:"Annual trough; all TFs near 0; BUY MAX" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"LONG ★★★★★", note:"Still at trough; accumulate longs" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"LONG ★★★★", note:"Trough confirmed; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★", note:"Recovery underway; hold year-long" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig23:"bear",
    combined:"bear", combinedLabel:"CHOP — brief secondary dip; January-type weakness continues",
    stars:2,
    note:"Brief secondary dip. All TFs near 0-15. Hold longs. The DJIA has a somewhat extended January-February trough period compared to the NASDAQ.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"Feb dip; all TFs near 5-15; hold longs" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"CHOP ★★", note:"Near secondary trough; buy on dip" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Recovery; add longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold into March" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; NOTABLE: 23-YR has brief mid-March dip to near 0",
    stars:3,
    note:"Generally rising but with a notable DJIA-specific feature: the 23-YR briefly touches near 0 in mid-March before recovering sharply. This is likely driven by the March futures roll and Q1 quarter-end positioning. Buy the mid-March dip aggressively.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 20; spring bull building" },
      { wk:"Wk 2", s5:"bull", s15:"chop", s23:"chop", com:"CHOP ★★", note:"DJIA-specific mid-March 23-YR dip; BUY the dip aggressively" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★", note:"23-YR recovering sharply from mid-March dip; add" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"March dip bought; hold into April" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — Q1 earnings; 23-YR rising to ~45; all TFs in bull alignment",
    stars:3,
    note:"Strong April uptrend following March recovery. 23-YR from ~25 to ~45. 15-YR at ~40. 5-YR at ~48. Q1 DJIA earnings (blue-chip companies) are a seasonal catalyst.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 30; 5-YR at 40; Q1 earnings" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 38; all rising" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 42; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold; May continuation" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — 23-YR at ~47; 5-YR at ~48; steady uptrend",
    stars:3,
    note:"Steady uptrend. 23-YR at ~47. 15-YR at ~43. 5-YR at ~48. The DJIA May seasonal is moderate — not as aggressive as small-cap or NASDAQ.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 44; all rising; hold" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 46; 5-YR at 47" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 47; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold into June" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs holding near ~45–55; summer bull consolidation",
    stars:3,
    note:"Summer consolidation. 23-YR at ~42. 15-YR at ~44. 5-YR at ~50. Some June volatility (seasonal range 33–60). Hold longs into July earnings season.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 44; summer consolidation" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s23:"chop", com:"CHOP ★★", note:"Minor June volatility; hold longs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 43; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Hold; July earnings loading" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — Q2 earnings; 5-YR spikes to ~60; blue-chip summer bull",
    stars:3,
    note:"Q2 blue-chip earnings season. 5-YR at ~55–60 (summer peak for 5-YR). 15-YR at ~55. 23-YR at ~50. DJIA July seasonality is more muted than small-cap but still bullish. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"5-YR at 55; 23-YR at 49; earnings season" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"5-YR summer peak ~60; 23-YR at 50" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"23-YR at 50; hold longs" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s23:"chop", com:"CHOP ★★★", note:"Manage into August" },
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"bull", sig23:"chop",
    combined:"chop", combinedLabel:"CHOP — 23-YR slight pullback; summer seasonality pause",
    stars:2,
    note:"Slight summer pause. 23-YR flat to slightly declining around ~45–50. 15-YR at ~52. 5-YR at ~50–55. August volatility is present but not as extreme as the ES 23-YR drop. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s23:"chop", com:"CHOP ★★", note:"23-YR at 48; slight summer pause" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"23-YR at 45; hold reduced longs" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"Flat; September approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Bottom; reload longs for Q4" },
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"bull", sig23:"chop",
    combined:"chop", combinedLabel:"CHOP — mild September weakness; 23-YR flat; hold long bias",
    stars:2,
    note:"Mild September seasonality. 23-YR flat around ~38–45. 15-YR at ~50. 5-YR at ~50. DJIA September weakness is less severe than Russell 2000 but still present. Hold longs with tight stops.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"September weakness; 23-YR at 40; hold" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"Flat; 23-YR at 38; October Q4 loading" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★", note:"September trough acknowledged" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★", note:"Q4 loading; rebuild longs" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 bull; 23-YR surging from ~38 to ~60; maximum conviction",
    stars:5,
    note:"Q4 bull initiates strongly. 23-YR surging from ~38 to ~60. 15-YR at ~65. 5-YR from ~50 to ~65. All TFs aligned. Add maximum longs for the November-December year-end surge to 100/100/90.64.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Q4 bull begins; 23-YR surging from 38; add MAX" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 50; all TFs rising; hold max" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 57; Q4 in full force" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Hold max; November-December surge to 100" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"LONG — year-end surge; all TFs at 80+; approaching 100",
    stars:5,
    note:"Year-end surge. 23-YR from ~65 to ~90. 15-YR at ~88. 5-YR at ~88. All TFs converging toward 100 at December year-end. The DJIA November seasonal is driven by blue-chip index rebalancing and year-end fund positioning.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 70; all surging; hold maximum" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 80; 15-YR at 85; year-end in sight" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 87; approaching 100" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Hold max; December 100 target" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig23:"bull",
    combined:"bull", combinedLabel:"YEAR-END ANNUAL HIGH — 23-YR=100/15-YR=100/5-YR=90.64",
    stars:5,
    note:"Year-end annual highs. 23-YR=100. 15-YR=100. 5-YR=90.64. ALL THREE TFs at maximum values at year-end. The DJIA E-Mini mirrors the ES exactly with 23-YR and 15-YR both at 100. The cycle resets: January trough at 0 begins again.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 93; approaching 100" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR at 98; 15-YR at 100; Santa Claus" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"At annual highs; 100/100/90.64" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Year-end close; cycle resets to Jan trough" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Using the DJIA E-Mini seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 23-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== DJIA E-MINI CBOT — SEASONAL FRAMEWORK ===
Asset: E-mini DJIA Index CBOT (YM) · 23-Year Seasonal (1997–2019)
Reference 02 Jan 2020: 23-YR=100, 15-YR=100, 5-YR=90.64

YEARLY ARC:
January/February = ANNUAL TROUGH (all TFs near 0) — BUY.
March = DJIA-specific mid-month 23-YR dip to near 0 (buy the dip!).
H1 (Jan-Jun): gradual bull with blue-chip earnings as catalysts.
July = 5-YR summer peak ~60 (more muted than NASDAQ/small-cap).
August-September = mild seasonal weakness.
October = Q4 rally initiates.
November-December = YEAR-END at 100/100/90.64.

=== PLAYBOOK SIGNALS ===
LONG #1: January Wk1 — annual trough near 0; BUY immediately
BUY DIP: March Wk2 — DJIA-specific 23-YR dip to near 0; add aggressively
LONG #2: October Wk1 — Q4 bull; add maximum longs; target 100
TARGET: 23-YR and 15-YR at 100 by December (matches ES pattern exactly)

KEY FEATURES:
• March mid-month 23-YR dip: unique DJIA seasonal feature (likely futures roll/Q1 end)
• Summer (Jul-Aug) is more muted than small-cap (DJIA = large/stable blue chips)
• 23-YR and 15-YR both hit 100 at year-end — same as ES
• 5-YR at 90.64 (slightly below ES 5-YR at 90.71 — nearly identical)
• Blue-chip index: September effect is less severe than Russell 2000

TF REFERENCE VALUES (02 Jan 2020):
• 23-YR: 100 | • 15-YR: 100 | • 5-YR: 90.64
Annual high: ALL TFs at year-end December | Annual low: All TFs in January
`;
