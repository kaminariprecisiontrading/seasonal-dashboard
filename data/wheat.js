// data/wheat.js — Wheat (CBOT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=84.16 · 15-YR=81.99 · 5-YR=43.75

const ASSET_CONFIG = {
  id:       "wheat",
  name:     "Wheat CBOT",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Wheat CBOT (ZW) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=84.16, 15-YR=81.99, 5-YR=43.75 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR starts at ANNUAL HIGH (~95+); SELL from year-start",
    stars:4,
    note:"40-YR begins the year at its ANNUAL HIGH (~95+). 15-YR at ~55–60. 5-YR at ~50. January is a SELL for the 40-YR — it peaks at year-start and spends the first half of the year declining to its June annual low. This inverse pattern (annual high in January, annual low in June) is the defining feature of CBOT Wheat seasonality.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 95+; ANNUAL HIGH; sell from year-start" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR declining from 95; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 85; declining trend established" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; 40-YR bear run targets June annual low" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR declining from 95 to ~75; 5-YR and 15-YR also weak",
    stars:3,
    note:"40-YR declining from ~95 to ~75. 15-YR at ~50 declining. 5-YR at ~40 declining. All three TFs in downtrend as winter wheat is dormant and the demand premium fades. Hold shorts targeting the June 40-YR annual low.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 88; declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 80; 5-YR at 38; trend intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; 40-YR at 76" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into March; April-June 40-YR trough loading" },
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR at ~65; all TFs declining toward June trough",
    stars:3,
    note:"40-YR declining from ~75 to ~65. 15-YR also declining. 5-YR at ~35 declining. Winter wheat enters its jointing stage but no seasonal bullish catalyst yet. Continue short positions.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 70; declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 65; 15-YR declining; trend intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR at 32; all TFs weak" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into April; 40-YR trough approaching" },
    ]
  },
  {
    month:"April", sig5:"chop", sig15:"chop", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR declining to ~45; 5-YR and 15-YR begin volatile recovery",
    stars:3,
    note:"40-YR declining from ~65 to ~45. 15-YR begins a volatile recovery from ~40. 5-YR volatile around ~30. Mixed signals as the 40-YR continues its bear while shorter TFs begin to respond to new-crop weather concerns. Hold 40-YR shorts; avoid long trades.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 58; still declining; hold short" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 50; near-trough zone loading" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 45; June absolute low approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★", note:"5-YR and 15-YR beginning to spike; divergence" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bear",
    combined:"chop", combinedLabel:"DIVERGENCE PEAK — 5-YR and 15-YR spike toward 100; 40-YR at annual low",
    stars:3,
    note:"MAXIMUM DIVERGENCE: 5-YR spikes toward ~80 and 15-YR spikes toward ~85–90, driven by new-crop weather scares and winter wheat heading. 40-YR continues declining toward its June annual low of ~5. The TF divergence is extreme — shorter TFs are bullish while 40-YR continues its bear. Trade the 5-YR spike; hold 40-YR shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"5-YR and 15-YR surging; 40-YR still falling; divergence" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"5-YR at 75; 15-YR at 85; 40-YR at 30; extreme divergence" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"All three: near-100 for 5/15-YR; near-0 for 40-YR" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"June 5-YR peak at 100; 40-YR annual low approaching" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig40:"bear",
    combined:"flip", combinedLabel:"5-YR AT 100 / 40-YR AT ANNUAL LOW (~5) — most extreme divergence in grains",
    stars:5,
    note:"THE most extreme TF divergence in the grain complex: 5-YR reaches 100 (annual high) while 40-YR reaches ~5 (annual low) — SIMULTANEOUSLY. 15-YR also at ~95–100. Then IMMEDIATE REVERSAL: 40-YR bounces sharply from ~5 while 5-YR and 15-YR crash. Exit all TF-5 and TF-15 longs immediately. Buy the 40-YR trough.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bear", com:"FLIP ★★★★★", note:"5-YR at 100; 40-YR at 5 — SIMULTANEOUS PEAK/TROUGH; EXIT 5-YR LONGS / BUY 40-YR" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bull", com:"LONG ★★★★★", note:"40-YR bouncing from trough; 5-YR crashing; hold 40-YR longs" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bull", com:"LONG ★★★★", note:"40-YR surging from 5 to 40+; July recovery underway" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bull", com:"LONG ★★★★", note:"40-YR at 50; hold; July continuation" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bull",
    combined:"chop", combinedLabel:"CHOP — 40-YR recovering sharply; 5-YR and 15-YR declining from peaks",
    stars:3,
    note:"40-YR recovers sharply from June annual low of ~5 to ~55–60. 5-YR declining from its June 100 peak to ~25. 15-YR declining from its June ~100 peak toward ~35. The divergence is converging. Hold 40-YR longs; don't try to play 5-YR direction.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"40-YR surging from trough; 5-YR crashing; hold 40-YR longs" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"40-YR at 55; 15-YR at 35; convergence underway" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"40-YR approaching 60; 5-YR at 28" },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bull", com:"CHOP ★★★", note:"40-YR at 62; 15-YR stabilizing; convergence near" },
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"chop", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 40-YR peaks at ~70; all TFs converging upward",
    stars:3,
    note:"40-YR continues recovering to ~70. 15-YR stabilizing and recovering to ~45–50. 5-YR at ~30–35. All TFs begin converging upward as the new-crop supply/demand picture clarifies. September volatility looms.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bull", com:"LONG ★★★", note:"40-YR at 67; hold longs; all TFs rising" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★", note:"15-YR recovering; 40-YR at 70" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Convergence underway; all TFs recovering" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs rising; October-December recovery loading" },
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — volatile; 40-YR pauses at ~60; 15-YR volatile",
    stars:2,
    note:"Volatile consolidation. 40-YR pauses around ~60 before the Q4 recovery. 15-YR volatile around ~45. 5-YR volatile around ~30. No clean directional edge in September. Wait for October-November clarity.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Volatile consolidation; 40-YR at 60; no edge" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"All TFs choppy; avoid new positions" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Q4 recovery loading; await October direction" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs firming; Q4 bull loading" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 bull; all TFs recovering toward year-end reference",
    stars:4,
    note:"Q4 bull begins in earnest. 40-YR from ~60 to ~75. 15-YR from ~45 to ~60. 5-YR from ~30 to ~40. All three TFs rising in alignment for the first time since June. The year-end recovery targets 84/82/44.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs rising; 40-YR at 70; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 75; 15-YR at 55; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs aligned upward; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into November; year-end reference approaching" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs at 80+; approaching year-end reference zone",
    stars:4,
    note:"40-YR at ~80. 15-YR at ~75. 5-YR at ~40. All three TFs approaching the year-end reference values of 84.16/81.99/43.75. Q4 bull is the high-conviction long period in CBOT wheat.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 80; 15-YR at 78; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Approaching reference zone; 40-YR at 83" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR at 80; year-end reference near" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into December; 84/82/44 in sight" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END; settles at 40-YR=84.16/15-YR=81.99/5-YR=43.75",
    stars:3,
    note:"Year-end recovery completes near the year-start levels for 40-YR (84.16) and 15-YR (81.99). 5-YR=43.75 (well below its prior-year level). The 40-YR ends the year nearly where it starts the new year (~84 vs ~95 start). The wheat cycle: Jan SELL from 95 → June trough at 5 → December recovery to 84.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 83; 15-YR at 81; approaching reference" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"At reference zone; 84/82/44" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end consolidation; reference values hit" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end close; 84/82/44; cycle resets for Jan SELL" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the CBOT wheat seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== WHEAT CBOT — SEASONAL FRAMEWORK ===
Asset: Wheat CBOT (ZW) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=84.16, 15-YR=81.99, 5-YR=43.75

YEARLY ARC:
January = SELL: 40-YR at annual high (~95); begins year-long bear.
Jun = 40-YR at ANNUAL LOW (~5) while 5-YR and 15-YR hit 100 simultaneously — most extreme TF divergence in grains.
Post-June: 40-YR bounces sharply from trough; 5-YR and 15-YR crash from peaks.
Oct-Dec = Q4 bull; all TFs converge upward to 84/82/44.

=== PLAYBOOK SIGNALS ===
SHORT #1: January Wk1 — 40-YR at annual high (~95); SELL IMMEDIATELY
LONG #1: May/June — 5-YR and 15-YR spike toward 100; play near-term longs; EXIT at 100
FLIP #1: June Wk1 — 5-YR at 100 / 40-YR at 5 — EXIT near-term longs / BUY 40-YR trough
SHORT #2: June near-term — 5-YR and 15-YR crash from 100 simultaneous peak
LONG #2: October — all TFs aligned upward; Q4 bull; hold into December

KEY FEATURES:
• Jan 40-YR starts at ~95 (annual high) — SELL immediately from year-start
• Jun divergence: 40-YR at 5 (annual low) while 5-YR and 15-YR at 100 — extreme simultaneous
• This divergence is the most extreme TF split in the grain complex
• 40-YR June-to-December recovery: from 5 to 84 (+79 points) — strongest H2 bull in grains
• December 40-YR=84.16 nearly matches January start of ~95 (40-YR is range-bound annually)

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 84.16 | • 15-YR: 81.99 | • 5-YR: 43.75
Annual high (40-YR): ~95 in January | Annual low (40-YR): ~5 in June
Annual high (5-YR and 15-YR): ~100 in June
`;
