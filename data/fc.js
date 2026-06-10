// data/fc.js — Feeder Cattle (CME) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=69.63 · 15-YR=68.86 · 5-YR=35.31

const ASSET_CONFIG = {
  id:       "fc",
  name:     "Feeder Cattle (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Feeder Cattle CME (GF) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=69.63, 15-YR=68.86, 5-YR=35.31 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — 5-YR starts high and declines; 40-YR mid-range; divergent",
    stars:2,
    note:"5-YR starts January at ~75–80 (annual high for 5-YR) and begins declining. 40-YR at ~65–70. 15-YR at ~60–65. Divergence between near-term (5-YR declining from highs) and long-term (40-YR stable). No clean combined signal.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR declining from highs; 40-YR flat; mixed" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR falling; no clean edge" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"CHOP ★★", note:"40-YR beginning to soften; 5-YR still declining" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★★", note:"All TFs declining toward April trough; short developing" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — all TFs declining toward April annual low",
    stars:3,
    note:"All three TFs declining. 40-YR from ~65 to ~55. 15-YR from ~60 to ~50. 5-YR falling sharply from ~70 to ~50. The feedlot placement-cycle pressure builds as spring grazing season approaches. Short bias; April trough in view.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; 40-YR through 60; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR through 60; 40-YR at 55; trend intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; April trough approaching" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into March; April near-0 trough in view" },
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — near-trough; all TFs falling toward April annual low",
    stars:4,
    note:"Approaching the annual trough. 40-YR falling from ~55 to ~20–25. 15-YR falling to ~20. 5-YR falling to ~25–30. The trough for Feeder Cattle is in April — spring grass-fed demand weak before growing season. Hold shorts; maximum compression coming.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs accelerating lower; 40-YR through 40" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 30; near trough zone; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs at 20–25; approaching absolute lows" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Near trough; April final low imminent; tighten shorts" },
    ]
  },
  {
    month:"April", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ANNUAL LOW — 40-YR near 10–15; most extreme trough in meats",
    stars:2,
    note:"ANNUAL TROUGH: 40-YR at ~10–15 (near absolute low). 15-YR at ~10–15. 5-YR at ~15–20. This is the year's floor for all three TFs simultaneously. The July 15-YR recovery to 100 is the single most powerful recovery move in feeder cattle. Begin covering shorts in April.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR at 15; near annual low; cover shorts" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing at absolute lows; first recovery signals" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"chop", com:"CHOP ★★★", note:"Recovery underway; April trough confirmed; begin longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs recovering from trough; May-July bull incoming" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — strong recovery from April trough; all TFs surging",
    stars:4,
    note:"Strong recovery from April annual low. 40-YR from ~15 to ~55. 15-YR from ~15 to ~55. 5-YR from ~20 to ~50. Spring grass season demand surge and pasture-to-feedlot transition drives the seasonal. The July 15-YR spike to 100 is loading.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery accelerating; 40-YR through 30; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 40; 15-YR at 40; strong momentum" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR at 50; all TFs surging; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into June-July; 15-YR 100-spike setup loading" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — continued bull; 15-YR approaching 80; July 100 in sight",
    stars:4,
    note:"Continued strong recovery. 40-YR to ~70. 15-YR surging to ~75–80. 5-YR to ~60. The July annual high for 15-YR is approaching. Hold longs and prepare to exit when 15-YR reaches 100 in July.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR approaching 75; hold all longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 65; 15-YR at 80; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR at 60; July 100 peak imminent; stay long" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold; July 15-YR annual high approaching; prepare exit" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bull", sig40:"bull",
    combined:"flip", combinedLabel:"15-YR HITS 100 — ANNUAL HIGH; FLIP SHORT; 5-YR peaks first",
    stars:5,
    note:"15-YR hits 100 in July — the ANNUAL HIGH for 15-YR in feeder cattle. 40-YR also peaks around ~80–85. 5-YR peaks slightly earlier (~90) and begins declining. This is the primary exit signal: 15-YR at 100 → EXIT ALL LONGS AND FLIP SHORT. 5-YR hits near-0 by October.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR surging toward 100; hold longs; near exit" },
      { wk:"Wk 2", s5:"bear", s15:"bull", s40:"bull", com:"FLIP ★★★★★", note:"15-YR at 100; 5-YR peaked — EXIT ALL LONGS; FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs rolling over from July peak; short aggressively" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; October 5-YR near-0 trough incoming" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-July-peak bear; all TFs declining toward autumn lows",
    stars:4,
    note:"Post-peak decline. 40-YR from ~85 to ~55. 15-YR from ~100 to ~65. 5-YR from ~90 to ~45. Hot summer feedlot stress, high grain costs, and reduced demand drive the seasonal bear. October 5-YR near-0 is the target.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining from July peak; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR through 70; 15-YR through 80; trend intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"5-YR approaching 50; October near-0 loading" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short into September; trough approaching" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — approaching October trough; 5-YR heading toward near 0",
    stars:3,
    note:"Continued decline. 40-YR at ~45. 15-YR at ~50. 5-YR approaching ~15–20. The autumn feedlot season drives supply pressure. October 5-YR trough is the target for covering shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; 5-YR through 30; trough in view" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR at 20; approaching absolute low; tighten stops" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Mixed signals; 5-YR near trough; begin covering" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing action; October reversal loading" },
    ]
  },
  {
    month:"October", sig5:"bear", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"5-YR NEAR TROUGH; recovery loading for Nov-Dec",
    stars:3,
    note:"5-YR reaches near 0 — its autumn trough. 40-YR and 15-YR at ~40–50 (mid-range). Mixed signals: 5-YR bottoming, 40-YR and 15-YR beginning to firm. Cover remaining shorts and begin scaling longs for the year-end recovery.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR near 0; cover shorts; 40-YR flat" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR at absolute trough; reversal loading" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs beginning recovery; add longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Year-end bull confirmed; hold longs into Dec" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — year-end recovery; 40-YR and 15-YR heading to reference",
    stars:4,
    note:"Year-end recovery continues. 40-YR recovering to ~60. 15-YR recovering to ~65. 5-YR recovering to ~30. December targets: 40-YR=69.63, 15-YR=68.86, 5-YR=35.31.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery accelerating; 40-YR through 55; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 60; 15-YR at 62; year-end targets in sight" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR at 30; all TFs recovering; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into December; reference values approaching" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → YEAR-END; settles at 40-YR=69.63/15-YR=68.86/5-YR=35.31",
    stars:3,
    note:"Year-end recovery completes. 40-YR=69.63. 15-YR=68.86. 5-YR=35.31 (still below mid-range — 5-YR did not recover to its January starting level). The feeder cattle seasonal year-end is moderate — strongest signal remains the Jul peak and April trough.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Approaching reference zone; 40-YR at 67" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 69; 15-YR at 68; reference values" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"At reference zone; year-end consolidation" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end close; reset for January cycle" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the feeder cattle seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== FEEDER CATTLE CME — SEASONAL FRAMEWORK ===
Asset: Feeder Cattle CME (GF) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=69.63, 15-YR=68.86, 5-YR=35.31

YEARLY ARC:
Jan = 5-YR at annual high (~75–80) and declining; short. Feb-Mar = all TFs bear toward April trough.
April = annual low for all TFs (~10–15) — most extreme trough in meats.
May-Jun = strong recovery. July = 15-YR hits 100 (annual high) → FLIP SHORT.
Aug-Sep = post-peak decline. Oct = 5-YR near 0 (autumn trough). Nov-Dec = year-end recovery to 69/68/35.

=== PLAYBOOK SIGNALS ===
SHORT #1: Jan–March — all TFs declining from 5-YR annual high toward April near-0 trough
LONG #1: April Wk3 — trough confirmed; buy; hold through June
FLIP #1: July Wk2 — 15-YR hits 100 (annual high); FLIP SHORT aggressively
SHORT #2: August-September — post-peak bear; 5-YR heading to near-0 in October
LONG #2: October Wk3 — 5-YR autumn trough; begin year-end recovery longs

KEY FEATURES:
• April trough at ~10–15 for all three TFs — most extreme annual low in the meats complex
• July 15-YR at 100 is the annual HIGH signal — opposite to January for most assets
• The 5-YR ends the year at 35.31 — well below its January starting level (~75–80)
• Two full seasonal cycles visible per year: Jan-high → Apr-trough → Jul-high → Oct-trough → Dec-mid
• Most asymmetric asset in meats: 5-YR has a 75-point peak-to-trough swing

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 69.63 | • 15-YR: 68.86 | • 5-YR: 35.31
Annual high (15-YR): ~100 in July | Annual low: All three TFs at ~10–15 in April
`;
