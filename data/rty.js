// data/rty.js — Russell 2000 Mini (CME) · 17-Year Seasonal (2003–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 17-YR=98.26 · 15-YR=96.93 · 5-YR=79.92

const ASSET_CONFIG = {
  id:       "rty",
  name:     "Russell 2000 (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 17-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Russell 2000 Mini CME (RTY) · 17-Year Seasonal (2003–2019) · 15-Year · 5-Year overlays. Reference: 17-YR=98.26, 15-YR=96.93, 5-YR=79.92 at 02 Jan 2020.",
  ltLabel:  "17-YR",
  ltSigKey: "sig17",
  ltKey:    "s17",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig17:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all TFs near 0; buy small-cap year-start weakness",
    stars:5,
    note:"ANNUAL TROUGH: All three TFs begin the year near 0. Small-cap seasonal trough is similar to large-cap. Buy January weakness aggressively. Russell 2000 is more volatile than S&P 500, making the entry risk/reward more extreme in both directions.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s17:"bear", com:"LONG ★★★★★", note:"Annual trough; all TFs near 0; BUY MAX; volatile entry" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s17:"bear", com:"LONG ★★★★", note:"Still at trough; add longs" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s17:"chop", com:"LONG ★★★★", note:"Trough confirmed; build position" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"Recovery underway; hold" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig17:"bear",
    combined:"bear", combinedLabel:"CHOP — brief secondary dip; hold longs",
    stars:2,
    note:"Brief secondary dip — all TFs near 0-15. Hold longs. The Russell is more volatile than S&P during February seasonality but the same trough dynamics apply.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s17:"chop", com:"CHOP ★★", note:"Secondary dip; hold longs; add on weakness" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s17:"bear", com:"CHOP ★★", note:"Near trough; buy on dip" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Recovery; add longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Hold into Q2" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; 17-YR to ~25; spring small-cap bull",
    stars:3,
    note:"All TFs rising. 17-YR from ~15 to ~25. 15-YR at ~20–25. 5-YR at ~35–40. Small-cap spring seasonal mirrors large-cap. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 18; all rising; spring bull" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 22; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 25; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Hold into April" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; small-cap earnings season; 17-YR to ~40",
    stars:3,
    note:"Continued uptrend. 17-YR from ~25 to ~40. 15-YR at ~35. 5-YR at ~42. Q1 small-cap earnings season supports the seasonal. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 30; earnings season" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 35; 5-YR at 40" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 39; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Hold; May continuation" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — 5-YR peaks at ~75; 17-YR at ~45; small-cap premium",
    stars:4,
    note:"5-YR has a strong May peak at ~75–80. 15-YR at ~65–70. 17-YR at ~45. Small-cap outperforms large-cap in May (Russell 5-YR higher than SP500 5-YR). Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"5-YR at 68; 17-YR at 42; small-cap leading" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"5-YR at 75; 17-YR at 45; hold max" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"5-YR at 77; peak zone for near-term" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Hold; June-July summer loading" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — summer consolidation; 17-YR at ~45; 5-YR at ~75",
    stars:3,
    note:"Summer consolidation. 17-YR flat at ~45. 15-YR at ~53. 5-YR at ~75 (near summer peak). Russell 2000 shows typical late spring consolidation before the July summer bull.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"5-YR at 75; 17-YR at 44; summer consolidation" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"All elevated; hold longs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"17-YR at 45; 5-YR near summer peak" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Hold; July push loading" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — 5-YR summer peak ~80; small-cap July effect; 17-YR at ~48",
    stars:4,
    note:"5-YR at summer peak ~80. 15-YR at ~60. 17-YR at ~48. The Russell 2000 has a stronger \"July effect\" than the S&P 500 — small-cap outperforms in Q2 earnings season. The 5-YR gap vs 17-YR is widest now. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"5-YR at 77; small-cap July effect; hold max" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"5-YR summer peak ~80; 17-YR at 48" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Hold longs; August risk approaching" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s17:"chop", com:"CHOP ★★★", note:"Manage longs into August seasonality" },
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"bull", sig17:"chop",
    combined:"chop", combinedLabel:"CHOP — 17-YR volatile; small-cap August weakness more severe",
    stars:2,
    note:"August shows more pronounced small-cap weakness than large-cap. 17-YR volatile around ~40-45. 15-YR at ~55. 5-YR pulling back from peak. Russell 2000 is more sensitive to August risk-off events. Hold reduced longs.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s17:"chop", com:"CHOP ★★", note:"17-YR volatile; 5-YR pulling back; manage position size" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s17:"chop", com:"CHOP ★★", note:"August weakness; reduce longs" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s17:"chop", com:"CHOP ★★", note:"Hold reduced; September risk approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★", note:"Bottom of Aug-Sep weakness; reload longs" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"chop", sig17:"bear",
    combined:"bear", combinedLabel:"SEPTEMBER EFFECT — 17-YR CRASHES to ~25; most extreme Sept dip in index seasonals",
    stars:3,
    note:"UNIQUE RUSSELL FEATURE: 17-YR drops to ~25 in September — the most dramatic September seasonal drop in the index complex. Small-cap is most vulnerable to September risk-off. 5-YR also drops to ~55. 15-YR at ~45. This is NOT a short-sell — buy the September dip for the October-November explosion.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s17:"bear", com:"BEAR ★★★", note:"17-YR dropping to 35; September small-cap weakness" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s17:"bear", com:"BEAR ★★★", note:"17-YR at 25 (annual low zone); extreme September dip" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s17:"chop", com:"CHOP ★★", note:"September trough; buy signal loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"September bottom confirmed; BUY; November spike imminent" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 rally; 17-YR recovery from 25 toward 50; small-cap outperforms",
    stars:4,
    note:"Q4 rally. 17-YR recovering from ~25 to ~50. 15-YR at ~55. 5-YR at ~65. Russell 2000 small-cap tends to outperform large-cap in Q4. Add maximum longs for the November-December surge to 98.26/96.93.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"17-YR recovering from 25; small-cap Q4 outperformance" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"17-YR at 40; add longs aggressively" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"17-YR at 47; all TFs rising" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"Hold max; November surge imminent" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"LONG — YEAR-END SURGE; 17-YR/15-YR spike to near 100; ALL at peak",
    stars:5,
    note:"THE strongest month in Russell 2000 seasonality: all three TFs spike to near 100 in November before a slight December pullback. 17-YR to ~100. 15-YR to ~97. 5-YR to ~100. The November small-cap effect is the most dramatic in the index seasonal calendar. The December year-end pulls back slightly.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★★", note:"17-YR surging from 50 to 80; add maximum longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★★", note:"All TFs at 90+; approaching November annual highs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★★", note:"17-YR at 98; 5-YR at 100; maximum conviction" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★★", note:"Hold; partial exit as Dec pullback may occur" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig17:"bull",
    combined:"bull", combinedLabel:"YEAR-END — settles at 17-YR=98.26/15-YR=96.93/5-YR=79.92",
    stars:4,
    note:"Year-end settles at 17-YR=98.26/15-YR=96.93/5-YR=79.92. Note: 5-YR pulls back from November's 100 to 79.92 in December — the only major December pullback in the index complex. The 17-YR and 15-YR remain near annual highs. The slight December 5-YR pullback reflects year-end small-cap profit-taking.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"17-YR at 98; 15-YR at 97; near annual highs" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s17:"bull", com:"LONG ★★★★", note:"5-YR pulling back from 100; 17-YR holding" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s17:"bull", com:"CHOP ★★★", note:"Year-end profit-taking in 5-YR; 17-YR at 98.26" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s17:"bull", com:"CHOP ★★★", note:"Year-end close; 98.26/96.93/79.92; cycle complete" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Using the Russell 2000 seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 17-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== RUSSELL 2000 CME — SEASONAL FRAMEWORK ===
Asset: Russell 2000 Mini CME (RTY) · 17-Year Seasonal (2003–2019)
Reference 02 Jan 2020: 17-YR=98.26, 15-YR=96.93, 5-YR=79.92

YEARLY ARC:
January = ANNUAL TROUGH (all TFs near 0) — BUY.
H1 (Jan-Jun): small-cap bull; 5-YR summer peak at ~80 in May-July.
September = 17-YR CRASHES to ~25 (most extreme September drop in index seasonals).
October = Q4 rally; small-cap outperforms large-cap.
November = ALL TFs spike to near 100 (most extreme November in index complex).
December = slight 5-YR pullback; year-end 98.26/96.93/79.92.

=== PLAYBOOK SIGNALS ===
LONG #1: January Wk1 — annual trough near 0; BUY small-cap immediately
LONG #2: September Wk4 — September trough confirmed; BUY for November spike to 100
TARGET: November 17-YR and 15-YR at near 100 (November is the annual high month)
NOTE: 5-YR pulls back from November 100 to December 79.92 — partial exit in November

KEY FEATURES:
• September 17-YR drops to ~25: most extreme September weakness in the index complex
• November ALL TFs near 100: the most explosive single month in Russell seasonality
• December 5-YR pullback (100 → 79.92): unique small-cap year-end profit-taking
• Small-cap (Russell) vs large-cap (SP500): Russell has more extreme seasonal swings
• 17-YR and 15-YR both near annual highs at year-end (98/97)

TF REFERENCE VALUES (02 Jan 2020):
• 17-YR: 98.26 | • 15-YR: 96.93 | • 5-YR: 79.92
Annual high: 17-YR in November near 100 | Annual low: All TFs in January
`;
