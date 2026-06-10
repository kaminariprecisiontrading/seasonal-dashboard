// data/ulsd.js — NY Harbor ULSD (NYM) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=68.24 · 15-YR=67.33 · 5-YR=53.78
// Formerly: Heating Oil (HO). Now: Ultra-Low Sulfur Diesel (ULSD)

const ASSET_CONFIG = {
  id:       "ulsd",
  name:     "NY Harbor ULSD (NYM)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · NY Harbor ULSD NYMEX (HO/ULSD) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=68.24, 15-YR=67.33, 5-YR=53.78 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"BEAR — 40-YR falls from ~50 toward annual low; all declining",
    stars:2,
    note:"40-YR starts January at a mid-range ~50 but falls rapidly toward its annual low. 15-YR starts very low (~5–10). 5-YR also near lows (~15). All three TFs declining through January. The year begins bearishly for ULSD — unlike crude which just idles low, ULSD is actively falling.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR falling from ~50; 15-YR and 5-YR already low" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR through 30; all TFs declining toward annual low" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All three pressing toward February trough" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Hold short or flat; February annual low approaching" },
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"TROUGH — 40-YR hits annual low ~5; all three at annual lows",
    stars:2,
    note:"40-YR hits its ANNUAL LOW (~5–8) in early February. 15-YR also near 0. 5-YR near 0. This is the most extreme trough zone for ULSD's long-term seasonal. Recovery begins mid-month. This is the H1 long entry setup — confirm before acting.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Final capitulation; 40-YR pressing to annual low ~5" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Annual low forming; all three TFs near 0 — basing" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"BULL ★★★", note:"Recovery beginning across all TFs; early long entry" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"BULL ★★★", note:"All three lifting — confirm with price before adding" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — H1 spring recovery; 15-YR leads, 40-YR climbing",
    stars:3,
    note:"Recovery gains traction. 40-YR climbs from ~5 to ~15–20. 15-YR surges more aggressively toward 40–50. 5-YR recovering steadily. The April 5-YR peak is the target — build position in March.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Recovery confirmed; 15-YR leading the move up" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR through 10–15; accelerating recovery" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs rising; April 5-YR spike within sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into April peak zone setup" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → PEAK — 5-YR spikes to 100 early April; 15-YR ~80–85",
    stars:4,
    note:"5-YR surges to its ANNUAL HIGH (~100) in early April. 15-YR also peaks at ~80–85 in April. 40-YR less extreme but also rising to ~35–45. The spring diesel demand surge. Longs should be tightened by mid-April when the 5-YR peak is confirmed — sharp reversal follows.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR surging toward 100; 15-YR at 80; maximum long" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR at or near 100 peak — tighten stops aggressively" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bull", com:"CHOP ★★", note:"5-YR beginning reversal from 100; 15-YR also rolling" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"chop", com:"CHOP ★★", note:"5-YR crash underway; manage remaining longs; May volatility ahead" },
    ]
  },
  {
    month:"May", sig5:"bear", sig15:"bear", sig40:"chop",
    combined:"chop", combinedLabel:"TRANSITION — 5-YR crashes from April 100 peak; 40-YR still elevated",
    stars:2,
    note:"5-YR crashes hard from its April 100 peak. 15-YR also falling. 40-YR is more resilient but choppy. This is the classic refinery maintenance → injection season transition. 40-YR holds better because the long-term demand profile remains supported.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"chop", com:"CHOP ★★", note:"5-YR and 15-YR reversing from April peak; 40-YR lagging" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All three declining; transition to summer mode" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Continued selling; June trough in view" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Hold flat/short into June H1 trough" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"H1 TROUGH — 40-YR hits ~20; all three at local lows",
    stars:2,
    note:"The H1 trough. 40-YR falls to ~20 (its local seasonal low). 15-YR at ~50–55. 5-YR at ~25. This is the summer doldrums for heating oil/diesel. The H2 recovery entry is being set up — late June / early July is the inflection.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All TFs heading to June local lows" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR near ~20; approaching H1 seasonal low" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Local low forming; basing action begins" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"BULL ★★★", note:"H2 recovery setup: early long entry as TFs lift from trough" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — H2 recovery begins; heating demand season approaching",
    stars:3,
    note:"H2 recovery gains traction as the market looks ahead to winter heating demand. 40-YR rises from ~20 to ~50. 15-YR from ~50 to ~65. 5-YR from ~25 to ~35–40. All three TFs recovering in sync. Build position for the September-October annual peak.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"H2 recovery confirmed; build position" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR through 30; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs rising in sync; stay with trend" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR approaching 45–50; August continuation ahead" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — H2 surge; 15-YR approaches ~80; September peak loading",
    stars:4,
    note:"H2 heating demand surge accelerates. 15-YR approaches ~80 by end of August. 40-YR rising toward ~60–65. 5-YR also strong. September-October annual peak is the target. Conviction high.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR through 65; 40-YR through 55; full bull alignment" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs rising strongly; hold and add on dips" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR approaching 80; October 100 in view" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"September peak loading; hold maximum long" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 15-YR near 100; 40-YR surging toward October annual peak",
    stars:5,
    note:"15-YR hits near 100 in September — its annual high. 40-YR surging strongly toward its October peak. 5-YR also near peak (~80). This is the highest-conviction long window of H2 for ULSD. Full TF alignment driven by winter heating demand.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Full TF alignment; maximum long exposure; winter demand peak loading" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR approaching 100; 40-YR through 80; hold all longs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR near annual high; October 40-YR peak approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Hold into October; 40-YR annual high in October" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"flip", combinedLabel:"40-YR ANNUAL HIGH ~100 → FLIP SHORT; winter demand peak",
    stars:5,
    note:"40-YR hits its ANNUAL HIGH (~100) in early-to-mid October. 15-YR also near 100. 5-YR peaks ~80. This is the ULSD seasonal high — the year's most critical reversal point. Exit longs at 40-YR 100 and flip short. The winter demand is fully priced in; rollover follows.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR surging toward 100; stay long until peak confirmed" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"FLIP ★★★★★", note:"40-YR at/near 100 — EXIT LONGS / FLIP SHORT; peak confirmed" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs rolling over from October peak; short aggressively" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Rollover confirmed; hold short into November" },
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — rollover from October annual high; all TFs declining",
    stars:3,
    note:"Continued seasonal decline from October's annual high. 40-YR falls from ~100 to ~70–75. 15-YR from ~95 to ~65–70. 5-YR from ~80 to ~55. All three declining. The winter demand is fully priced; seasonal selling takes over.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Rollover confirmed; all TFs declining from October peak" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR through 85; 15-YR also declining; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining in sync; stay with the seasonal" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into December moderate continuation" },
    ]
  },
  {
    month:"December", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"BEAR — moderate year-end decline; 40-YR settles at 68.24",
    stars:3,
    note:"Continued moderate seasonal decline. 40-YR falls to ~68.24 by year-end. 15-YR to ~67.33. 5-YR to ~53.78. The decline is orderly — less dramatic than CL's December. Year ends at mid-to-high range for 40-YR and 15-YR, reflecting the structural winter demand support.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Continued post-October decline; 40-YR through 75" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining toward year-end reference values" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR approaching ~70; moderate decline pace" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Year-end: 40-YR=68.24, 15-YR=67.33, 5-YR=53.78; cover near reference" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the ULSD/Heating Oil seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== NY HARBOR ULSD NYM — SEASONAL FRAMEWORK ===
Asset: NY Harbor Ultra-Low Sulfur Diesel (HO/ULSD) NYMEX | 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=68.24, 15-YR=67.33, 5-YR=53.78

YEARLY ARC:
Year begins with 40-YR falling from ~50 to its ANNUAL LOW (~5–8) in February. Spring recovery follows.
April = 5-YR annual high (~100) — spring diesel demand surge. June = H1 trough (~20 for 40-YR).
July–September = strong H2 recovery driven by winter heating demand. September = 15-YR annual high (~100).
October = 40-YR annual high (~100) → FLIP SHORT. November–December = orderly rollover to ~68/67/54.

=== PLAYBOOK SIGNALS ===
LONG #1: February Wk3 entry (annual low confirmed) | BUILD through March–April
FLIP #1: April Wk2 — 5-YR at 100; EXIT SPRING LONGS | Wait for June H1 trough
LONG #2: Late June / July — H2 recovery entry; hold Sep–Oct
FLIP #2: October Wk2 — 40-YR at 100; EXIT LONGS / FLIP SHORT; primary seasonal short of the year

KEY FEATURES:
• 40-YR annual LOW in early February (~5) — deepest trough of the year
• 5-YR annual HIGH in early April (~100) — spring diesel demand surge
• October = 40-YR annual high; the year's most important reversal point
• December decline is ORDERLY (ends at ~68), unlike CL's volatile December crash
• 15-YR and 40-YR both near 67–68 at year-end — strong structural support for winter heating pricing

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 68.24 | • 15-YR: 67.33 | • 5-YR: 53.78
Annual high: 40-YR ~100 in October | Annual low: 40-YR ~5 in February
`;
