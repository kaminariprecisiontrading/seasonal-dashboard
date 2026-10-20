// data/cotton.js — Cotton (ICE) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=53.11 · 15-YR=72.54 · 5-YR=52.95

const ASSET_CONFIG = {
  id:       "cotton",
  name:     "Cotton (ICE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Cotton ICE (CT) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=53.11, 15-YR=72.54, 5-YR=52.95 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — all TFs mid-range, no clean seasonal edge",
    stars:2,
    note:"All three TFs around 35–40. 5-YR has a brief early-January spike then falls back to ~30. No strong directional bias — the market is in transition between the prior year's cotton cycle and the new crop planting season pressure building in February.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR early spike then fades; no directional edge" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR declining; 15-YR and 40-YR flat around 35–40" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Consolidation; await February 15-YR surge setup" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"chop", com:"CHOP ★★", note:"15-YR beginning to stir; 40-YR basing; February bull loading" },
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 15-YR surges to ~80–85; new crop planting season demand",
    stars:4,
    note:"THE defining February move: 15-YR surges from ~35 to ~80–85 — new crop planting-season demand drives the seasonal. 40-YR also rises to ~50. 5-YR recovers to ~55–60. The long-term seasonal is powered by new-crop positioning ahead of Southern US planting. High conviction long.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR surging toward 80; add longs — new crop demand" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR at 80–85; 40-YR through 45; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs in broad bull; hold longs into March" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into March continuation; April multi-TF peak approaching" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — broad bull maintained; all TFs at elevated levels",
    stars:3,
    note:"15-YR holds around 80. 40-YR rises to ~80–85. 5-YR at ~55–65. The planting season bull is in full force. Longs from February should be held. Begin planning the April exit when 5-YR approaches 100.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs elevated; 40-YR through 70; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR approaching 80; 15-YR at 80; broad alignment" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs holding; April 5-YR peak in sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into April; 5-YR approaching 100 peak zone" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"flip", combinedLabel:"PEAK → FLIP SHORT — 5-YR spikes to ~100; multi-TF seasonal top",
    stars:5,
    note:"THE seasonal peak for cotton. 5-YR spikes to near 100. 40-YR at ~85. 15-YR at ~80–85. All three TFs at elevated levels simultaneously — the planting-season premium is fully priced. The May-September extended bear begins from this peak. Exit longs aggressively in April and flip short.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs elevated; 5-YR surging toward 100; stay long" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"FLIP ★★★★★", note:"5-YR at/near 100; 40-YR at 85 — EXIT ALL LONGS / FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Seasonal top confirmed; all TFs rolling; short aggressively" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; May-September extended bear underway" },
    ]
  },
  {
    month:"May", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — extended bear begins; planting complete, supply builds",
    stars:3,
    note:"Extended bear phase begins post-peak. All three TFs declining from their April highs. 40-YR from ~85 toward ~65. 15-YR from ~80 toward ~60. 5-YR crashing from 100. The harvest-season supply build begins to be priced in.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Post-peak bear confirmed; all TFs declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR through 70; 15-YR through 65; trend intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR crashing fast; all TFs in sync decline" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into June; five-month bear cycle underway" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — mid-bear; 40-YR falling toward 50; crop report pressure",
    stars:3,
    note:"Extended bear continues. 40-YR falling from ~65 to ~50. 15-YR from ~60 to ~50. 5-YR weak (~25–30). Crop condition reports drive seasonal pressure as summer growing season reveals potential yield. Short bias throughout.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Bear intact; 40-YR through 60 and falling" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; 15-YR approaching 55" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 50; 5-YR very weak; trend intact" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into July; September trough in view" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — harvest season bear; all TFs continuing lower",
    stars:3,
    note:"Harvest season bear acceleration. 40-YR falls to ~40–45. 15-YR to ~45–50. 5-YR to ~35–40. The approach to September's annual low continues. Cotton's extended bear is unique in the commodity complex — 5 consecutive months of decline.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Bear continues; all TFs declining toward harvest lows" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR through 45; approaching September trough zone" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; maximum harvest supply pressure" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into August; September absolute low approaching" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — near-trough; all three heading to September annual low",
    stars:3,
    note:"All three TFs declining toward the September annual low. 40-YR falls to ~20–25. 15-YR to ~20–25. 5-YR to ~15–20. The harvest is being picked and supply fears peak. Almost at the seasonal floor.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs heading to near-trough; 40-YR through 30" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 25; 15-YR near 25; approaching absolute low" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All near annual lows; September collapse imminent" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Final leg down; October reversal setup loading" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"NEAR TROUGH — all TFs approaching absolute annual lows",
    stars:2,
    note:"All three TFs at near-annual lows (~10–15). The extended bear is exhausting itself. Late September marks the final leg down before October's explosive reversal. Do not initiate new shorts here — the reversal risk is extreme.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All TFs at ~10–15; near absolute lows; reduce shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Final compression; October reversal imminent" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Near 0 zone; extreme trough; watch for reversal candle" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing action begins; October explosive recovery loading" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"THREE-WAY NEAR-0 → EXPLOSIVE RECOVERY; highest-conviction reversal",
    stars:5,
    note:"THE year's most extreme reversal. ALL THREE TFs crash to near 0 simultaneously in early October, then EXPLODE upward. 40-YR from ~5 to ~35–40. 15-YR from near 0 to ~55. 5-YR from near 0 to ~40. The harvest is complete, supply fears recede, and new-crop demand begins. Buy the October trough aggressively.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Three-way near-0 trough; BUY AGGRESSIVELY — harvest-complete reversal" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Explosive recovery underway; all TFs surging from 0; hold and add" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 25; 15-YR through 35; momentum strong" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs into November continuation" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — strong recovery continues; all TFs heading to year-end reference",
    stars:4,
    note:"Strong year-end recovery continuation. 40-YR from ~35 to ~45–50. 15-YR from ~55 to ~65. 5-YR from ~40 to ~50. All three TFs recovering strongly. December target values are 40-YR=53.11, 15-YR=72.54, 5-YR=52.95.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery continues; 15-YR approaching 60; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs rising; 40-YR through 40; trend intact" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR approaching 70; December targets in sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into December; year-end reference values approaching" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — year-end recovery; settles at 53.11/72.54/52.95",
    stars:3,
    note:"Year-end recovery completes. 40-YR reaches ~53.11 (reference). 15-YR reaches ~72.54 (above mid-range — new crop demand still elevated). 5-YR reaches ~52.95. All three TFs settled at mid-to-high levels. The cotton seasonal year ends with the new crop demand premium priced in for January delivery.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Recovery approaching year-end target; 40-YR through 48" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"15-YR approaching 70; year-end reference zone" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs at reference zone; 40-YR=53, 15-YR=72, 5-YR=53" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end consolidation at reference values; hold or flatten" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the cotton seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== COTTON ICE — SEASONAL FRAMEWORK ===
Asset: Cotton ICE (CT) | 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=53.11, 15-YR=72.54, 5-YR=52.95

YEARLY ARC:
Jan is neutral. Feb = 15-YR surges to ~80 (new crop planting-season demand). Mar–Apr = broad bull peak.
April = 5-YR hits ~100; MULTI-TF PEAK; flip short. May–September = EXTENDED 5-MONTH BEAR.
October = ALL THREE TFs near 0 simultaneously → EXPLOSIVE REVERSAL LONG. Nov–Dec = strong recovery to 53/72/53.

=== PLAYBOOK SIGNALS ===
LONG #1: February entry (15-YR surge to 80); hold through March; EXIT April when 5-YR at 100
FLIP #1: April Wk2 — 5-YR at 100, multi-TF peak; FLIP SHORT immediately
SHORT #1: May through September — 5-month extended bear; most sustained bear in the fiber complex
LONG #2: October Wk1 — THREE-WAY near-0 trough; highest-conviction reversal; BUY AGGRESSIVELY

KEY FEATURES:
• February: 15-YR jumps +45 points in a single month (new crop planting demand)
• April: All TFs elevated simultaneously; 5-YR at 100; cleanest H1 exit signal
• The 5-month bear (May–Sep) is the longest sustained directional move in the fiber complex
• October: Near-0 for all three TFs simultaneously — most extreme annual trough in the dataset
• December: 15-YR ends at 72.54 (well above mid-range) — new crop demand persists into year-end

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 53.11 | • 15-YR: 72.54 | • 5-YR: 52.95
Annual high: 5-YR at ~100 in April | Annual low: All three TFs near 0 in October
`;
