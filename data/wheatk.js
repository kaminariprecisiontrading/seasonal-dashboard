// data/wheatk.js — Wheat (KCBT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=69.04 · 15-YR=71.12 · 5-YR=50.46

const ASSET_CONFIG = {
  id:       "wheatk",
  name:     "Wheat KCBT",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Wheat KCBT (KE) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=69.04, 15-YR=71.12, 5-YR=50.46 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 5-YR starts at ~90 (elevated); 40-YR at annual high; sell",
    stars:4,
    note:"KCBT Wheat mirrors CBOT pattern: 40-YR begins the year at its annual high (~90–95). 5-YR also starts elevated at ~90 and declining. 15-YR at ~80 and declining. January is a SELL — the first-half bear dominates KCBT's seasonal pattern. Hard red winter wheat supply build pressures prices.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"5-YR at 90; 40-YR at 93; SELL from year-start" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining; 40-YR through 85" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"5-YR declining from 90 to 65; hold short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 80; bear trend established" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — all TFs declining; 40-YR to ~65; February bear in force",
    stars:3,
    note:"40-YR declining from ~80 to ~65. 15-YR declining from ~80 to ~35–40. 5-YR declining from ~65 to ~50. All three TFs in downtrend. Winter wheat in dormancy; harvest is months away. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 73; declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"15-YR declining sharply to 45; 40-YR at 67" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 63; 5-YR at 52" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into March; June trough loading" },
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"bull", sig40:"bear",
    combined:"chop", combinedLabel:"CHOP — 40-YR declining to ~45; 15-YR volatile; mixed signals",
    stars:2,
    note:"40-YR declining from ~65 to ~45. 15-YR volatile — bouncing from ~35 toward ~65, then oscillating. 5-YR declining around ~45. No clean combined edge. Wait for April-May direction or the June divergence play.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bear", com:"CHOP ★★", note:"40-YR at 58; 15-YR bouncing; mixed" },
      { wk:"Wk 2", s5:"bear", s15:"bull", s40:"bear", com:"CHOP ★★", note:"15-YR spiking; 40-YR declining; divergence" },
      { wk:"Wk 3", s5:"bear", s15:"bull", s40:"bear", com:"CHOP ★★", note:"40-YR at 47; no clean edge" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bear", com:"CHOP ★★", note:"Await April-May for cleaner setup" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bear",
    combined:"chop", combinedLabel:"CHOP → DIVERGENCE; 5-YR and 15-YR rising; 40-YR declining to ~45",
    stars:2,
    note:"5-YR recovering to ~50 and rising. 15-YR recovering to ~65–70. 40-YR declining from ~45 toward its June annual low. Divergence building between TFs. June simultaneous peak for 5-YR and 15-YR (at ~100) while 40-YR bottoms.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★", note:"5-YR at 55; 15-YR at 65; 40-YR at 44; divergence" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★", note:"Divergence widening; June setups loading" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★", note:"5-YR and 15-YR approaching peak; 40-YR approaching trough" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"June simultaneous divergence peak/trough approaching" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bear",
    combined:"chop", combinedLabel:"DIVERGENCE — 5-YR and 15-YR near 100; 40-YR at annual low zone",
    stars:3,
    note:"5-YR surging toward ~100. 15-YR surging toward ~95. 40-YR at near annual low (~15–20). KCBT Wheat mirrors the CBOT divergence structure. June will mark the simultaneous peak (5-YR and 15-YR at 100) and trough (40-YR near 5).",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"5-YR at 80; 15-YR at 85; 40-YR at 20; trade near-term" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"5-YR at 90; 15-YR at 92; 40-YR at 12" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★", note:"June divergence peak imminent" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bear", com:"CHOP ★★★★", note:"5-YR and 15-YR approaching 100; prepare for flip" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bull",
    combined:"flip", combinedLabel:"SIMULTANEOUS PEAK/TROUGH — 5-YR/15-YR at 100; 40-YR near 5 → FLIP",
    stars:5,
    note:"5-YR reaches ~100 (annual high) while 40-YR reaches ~5 (annual low) simultaneously. 15-YR also at ~95–100. EXIT near-term longs / FLIP SHORT. BUY the 40-YR trough. Then the 40-YR bounces sharply while 5-YR and 15-YR crash. November will see a 15-YR spike to near-annual-high levels.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bear", com:"FLIP ★★★★★", note:"5-YR at 100; 40-YR at 5; EXIT near-term / BUY 40-YR trough" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bull", com:"LONG ★★★★★", note:"40-YR bouncing from trough; 5-YR crashing; hold 40-YR longs" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bull", com:"LONG ★★★★", note:"40-YR surging from 5 to 35+; July recovery" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bull", com:"LONG ★★★★", note:"40-YR at 50; hold into July-August" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bull",
    combined:"chop", combinedLabel:"CHOP — 40-YR recovering to ~60; 5-YR and 15-YR crashing from peaks",
    stars:3,
    note:"40-YR recovering from June's near-0 trough toward ~60. 5-YR and 15-YR crashing from their June peaks. 15-YR has a SECONDARY TROUGH in August (near 0) — the most distinctive KCBT feature. Hold 40-YR longs.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"40-YR surging; 5-YR and 15-YR crashing; hold 40-YR" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"40-YR at 55; 15-YR at 20; convergence" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"40-YR at 60; 15-YR approaching secondary trough" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bull", com:"CHOP ★★★", note:"August secondary trough for 15-YR loading" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SECONDARY TROUGH — 40-YR re-tests lows; 15-YR hits secondary near-0",
    stars:3,
    note:"UNIQUE KCBT FEATURE: 40-YR dips to a secondary trough (~35–40) in August before recovering. 15-YR hits its secondary trough near 0. 5-YR near 0. Then an explosive November 15-YR spike loading. Hold shorts for August; buy the August trough for the Q4 bull.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR re-testing lows at 38; 15-YR at near-0" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"15-YR at secondary near-0 trough; buy signal loading" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing at secondary trough; Q4 recovery loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery from secondary trough; add longs for Q4" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — recovery from August secondary trough; all TFs rising",
    stars:3,
    note:"Recovery from August's secondary trough. 40-YR from ~35 to ~55. 15-YR recovering from near 0 toward ~35. 5-YR recovering. The Q4 bull begins. November will bring the 15-YR spike to near-annual-high levels.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs recovering; 40-YR at 50" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 55; 15-YR at 30" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Momentum building; add longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold into October-November; peak recovery loading" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 bull; 40-YR to ~65; 15-YR recovering toward November spike",
    stars:4,
    note:"40-YR recovering to ~65. 15-YR recovering from ~35 toward the November spike at ~85. 5-YR recovering to ~40. All three TFs in alignment. November will see the 15-YR spike — the most distinctive KCBT recovery signal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 60; all recovering; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 65; 15-YR at 50; November spike approaching" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs rising; 15-YR approaching 60" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into November; 15-YR spike imminent" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 15-YR SPIKES NEAR 85; 40-YR at ~85; year-end reference loading",
    stars:5,
    note:"15-YR spikes to near ~80–85 — one of its highest readings of the year, emerging from the August near-0 trough. 40-YR at ~85. 5-YR recovering to ~45. All three TFs strongly bullish in November. December will settle at 69/71/50 — the 15-YR spike begins to consolidate.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR spiking to 75; 40-YR at 83; hold max longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 82; 40-YR at 86; peak zone" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR at peak; year-end reference approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into December; December settlement approaching" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END; settles at 40-YR=69.04/15-YR=71.12/5-YR=50.46",
    stars:3,
    note:"Year-end settles at 69.04/71.12/50.46. The 40-YR at 69 (below the January start of ~90) reflects the net H1 bear pressure. 15-YR at 71 and 5-YR at 50 — both at solid mid-to-upper range levels after the November spike. The KCBT cycle: Jan SELL from ~90 → Jun trough at ~5 → Nov spike to ~83 → Dec consolidation at 69/71/50.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 70; 15-YR at 73; approaching reference" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"At reference zone; 69/71/50" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end consolidation at reference values" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end close; 69/71/50; cycle resets for Jan SELL" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the KCBT wheat seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== WHEAT KCBT — SEASONAL FRAMEWORK ===
Asset: Wheat KCBT (KE) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=69.04, 15-YR=71.12, 5-YR=50.46

YEARLY ARC:
January = SELL: 5-YR at ~90 (annual high); 40-YR at ~90 (annual high). Begin H1 bear.
June = 40-YR at ANNUAL LOW (~5) while 5-YR and 15-YR at ~100 simultaneously → FLIP.
August = SECONDARY TROUGH for 40-YR and 15-YR (unique KCBT feature, not in CBOT).
November = 15-YR SPIKES to ~83 (from August near-0 — most extreme KCBT recovery).
December year-end = 69/71/50.

=== PLAYBOOK SIGNALS ===
SHORT #1: January Wk1 — 5-YR and 40-YR at annual highs; SELL immediately
FLIP #1: June Wk1 — 5-YR/15-YR at 100; 40-YR at 5; EXIT near-term / BUY 40-YR trough
LONG #1: August Wk4 — secondary trough for 40-YR and 15-YR; buy for Q4 bull
LONG #2: October — all TFs aligned; November 15-YR spike target
EXIT: November Wk2 — 15-YR at ~83 (peak of spike); partial profit

KEY FEATURES:
• Jan 5-YR at ~90 AND 40-YR at ~90 (both at annual highs simultaneously — SELL)
• June TF divergence: same as CBOT wheat (5-YR/15-YR at 100; 40-YR at 5)
• August SECONDARY TROUGH: unique to KCBT — 40-YR re-tests lows after June bounce
• November 15-YR spike to ~83 from August near-0: +83 point move in 3 months
• Year-end 40-YR=69.04 (below January start of ~90) — net annual bear for 40-YR

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 69.04 | • 15-YR: 71.12 | • 5-YR: 50.46
Annual high (40-YR): ~90 in January | Annual low (40-YR): ~5 in June
Annual high (15-YR/5-YR): ~100 in June | Secondary high (15-YR): ~83 in November
`;
