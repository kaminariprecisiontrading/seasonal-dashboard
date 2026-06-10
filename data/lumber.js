// data/lumber.js — Lumber (CME) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=61.47 · 15-YR=64.03 · 5-YR=73.42

const ASSET_CONFIG = {
  id:       "lumber",
  name:     "Lumber (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Lumber CME · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=61.47, 15-YR=64.03, 5-YR=73.42 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR and 15-YR start at annual highs; immediate SELL",
    stars:4,
    note:"OPPOSITE of most commodities: 40-YR begins the year at ~90 and 15-YR near ~90 — these are the ANNUAL HIGHS. 5-YR starts lower (~50) and continues declining. The January sell-from-highs setup is the most unique feature of lumber's seasonal — a year-start short, not a long.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR and 15-YR at annual highs; sell immediately" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Seasonal top in place; all TFs declining; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining from peaks; February bear accelerating" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short into February continuation" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-peak bear continues; 40-YR declining from 90",
    stars:4,
    note:"40-YR declining from ~90 to ~70. 15-YR declining from ~90 to ~70. 5-YR weak around ~40–45. Post-winter-peak bear in full force. The housing/construction demand has peaked going into winter and lumber begins pricing in the shoulder-season slowdown.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR through 80; 15-YR through 80; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining; approaching mid-cycle support" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 75; 15-YR at 72; 5-YR at 40" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into March; 5-YR June spike setting up" },
    ]
  },
  {
    month:"March", sig5:"chop", sig15:"chop", sig40:"bear",
    combined:"chop", combinedLabel:"CHOP — 40-YR continuing down; 5-YR and 15-YR stabilizing",
    stars:2,
    note:"40-YR continuing to decline to ~60. 15-YR stabilizing around ~60–65. 5-YR beginning to base around ~45. Mixed signals as the spring construction season approaches but the long-term bear continues. Not a clean entry month.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bear", com:"CHOP ★★", note:"40-YR still declining; 5-YR basing; avoid new positions" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bear", com:"CHOP ★★", note:"Mixed signals; 15-YR stabilizing; no clean edge" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"CHOP ★★", note:"40-YR at ~65; spring construction season loading" },
      { wk:"Wk 4", s5:"bull", s15:"chop", s40:"bear", com:"CHOP ★★", note:"5-YR starting to firm; June spike narrative building" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"chop", sig40:"bear",
    combined:"chop", combinedLabel:"CHOP — 5-YR begins spring surge; 40-YR and 15-YR flat/declining",
    stars:2,
    note:"40-YR falls to ~50. 15-YR at ~55. 5-YR begins recovering to ~55. Divergence month — 5-YR picking up spring construction momentum while 40-YR long-term bear continues. No clean combined signal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"chop", s40:"bear", com:"CHOP ★★", note:"TF divergence; 5-YR surging; 40-YR still falling" },
      { wk:"Wk 2", s5:"bull", s15:"chop", s40:"bear", com:"CHOP ★★", note:"5-YR through 55; 40-YR at 50; mixed" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s40:"chop", com:"CHOP ★★", note:"40-YR basing; 5-YR surging; no edge" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"chop", com:"CHOP ★★", note:"15-YR beginning to firm; May/June 5-YR spike incoming" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"chop",
    combined:"bull", combinedLabel:"LONG — 5-YR spring surge; 15-YR recovering; 40-YR flat",
    stars:3,
    note:"5-YR recovering strongly toward ~65–70. 15-YR recovering to ~60. 40-YR flat/recovering around ~50–55. Spring construction season drives near-term TFs. Begin scaling into longs — June 5-YR spike to 100 approaching.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"chop", com:"LONG ★★★", note:"5-YR surging; 15-YR recovering; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"chop", com:"LONG ★★★", note:"5-YR approaching 70; 15-YR at 60; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"chop", com:"LONG ★★★", note:"5-YR through 70; June 100-spike setup loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR beginning to recover; all TFs aligned; hold" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"PEAK — 5-YR SPIKES TO 100; exit June; September trough incoming",
    stars:5,
    note:"THE defining June move: 5-YR spikes to NEAR 100 — the annual high for the near-term timeframe. 15-YR at ~80. 40-YR recovering to ~65–70. Spring/summer construction season at full throttle. EXIT LONGS by mid-June before the September trough sets up. The peak is sharp and fast.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR surging toward 100; hold all longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"FLIP ★★★★★", note:"5-YR at/near 100; 15-YR at 80 — EXIT ALL LONGS; reverse signal" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Post-peak reversal; all TFs rolling; sell aggressively" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short into July; September near-0 trough in view" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-June-peak bear; all TFs declining toward September trough",
    stars:4,
    note:"All TFs declining post-peak. 5-YR falling from ~100 to ~55. 40-YR falling from ~65 to ~45. 15-YR falling from ~80 to ~55. Summer construction ends and the seasonal bear accelerates. September will mark the annual low for all three TFs.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Post-June bear confirmed; all TFs declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"5-YR through 75; 40-YR through 55; momentum intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining; no support zones apparent" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold into August; September trough approach" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — all TFs declining toward September annual low",
    stars:3,
    note:"Continued decline toward September's near-0 trough. 5-YR to ~30. 15-YR to ~30. 40-YR to ~25–30. The construction season is fully priced, lumber inventory builds, and mills cut prices. Short bias throughout with trough expected in September.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; 5-YR at 40; September trough approaching" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 30; 15-YR at 30; near-trough acceleration" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All near trough zone; begin tightening shorts" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Final leg down; September trough imminent" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all three TFs near 0; year's lowest point",
    stars:2,
    note:"ALL THREE TFs reach near 0 simultaneously in September — the annual low for all timeframes. 5-YR to ~5–10. 15-YR to ~5–10. 40-YR to ~5–10. This is the year's floor. Do not add new shorts here; the October-December recovery will be explosive from these levels.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All TFs at near-0; absolute annual trough; reduce shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Near 0 zone; maximum compression; watch for reversal" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing begins; October recovery loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"CHOP ★★★", note:"Early recovery signals; begin scaling longs for Oct-Dec" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — explosive recovery from September trough; all TFs surging",
    stars:5,
    note:"Strong October recovery from September near-0 trough. All three TFs surge from ~5 to ~35–45. 5-YR to ~40. 15-YR to ~45. 40-YR to ~40. The pre-winter construction demand and mill restocking drives the seasonal rebound. Hold longs through December.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Near-0 trough reversal confirmed; BUY; hold into Dec" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Explosive recovery underway; all TFs surging from trough" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 30; 15-YR through 35; momentum strong" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; November-December continuation targets in sight" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — recovery continues; all TFs heading to year-end reference",
    stars:4,
    note:"Recovery continuation. 5-YR approaches ~60–65. 15-YR approaches ~55–60. 40-YR approaches ~55. December targets: 40-YR=61.47, 15-YR=64.03, 5-YR=73.42. Hold longs built in October.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery continues; 5-YR at 55; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 50; 15-YR through 55; trend intact" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR approaching 65; year-end reference near" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into December; January annual-high target in view" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → YEAR-END HIGH; 5-YR=73.42 near annual high; hold into Jan top",
    stars:4,
    note:"Year-end recovery completes and extends toward annual highs. 40-YR=61.47 (reference). 15-YR=64.03 (reference). 5-YR=73.42 — approaching the annual high zone that was the January start point. December buyers hold into the January SELL setup. The lumber cycle completes: Jan high → Sep trough → Dec high again.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 58; 15-YR at 62; approaching reference values" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR at 70; approaching 73.42 reference; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs at reference zone; 61/64/73; hold into January" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold — January annual high will be the SELL signal" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the lumber seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== LUMBER CME — SEASONAL FRAMEWORK ===
Asset: Lumber CME · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=61.47, 15-YR=64.03, 5-YR=73.42

YEARLY ARC:
Jan = annual high for 40-YR and 15-YR (~90) → IMMEDIATE SELL from year-start.
Feb-March = continued bear. May = 5-YR spring recovery. June = 5-YR SPIKES TO 100 → FLIP SHORT.
July-August = all TFs falling. September = ALL THREE TFs at near 0 simultaneously (annual trough).
October-December = explosive recovery to 61/64/73.

=== PLAYBOOK SIGNALS ===
SHORT #1: January Wk1 — 40-YR and 15-YR at annual highs (~90); SELL from year-start
LONG #1: May–June — 5-YR spring surge; scale longs; EXIT June Wk2 when 5-YR at 100
FLIP #1: June Wk2 — 5-YR at 100; FLIP SHORT; target September near-0 trough
LONG #2: September/October — near-0 for all three TFs; BUY the trough; hold into December

KEY FEATURES:
• Lumber SELLS from the first trading day of January — 40-YR and 15-YR at ~90 (annual highs)
• The 5-YR spring spike to 100 in June is the best near-term momentum long of the year
• September near-0 for all three TFs simultaneously — most extreme annual trough in fiber/lumber
• 5-YR ends the year at 73.42 — approaching the January annual high starting point again
• Full-cycle pattern: Jan high → Sep trough → Dec high → Jan SELL (repeating annually)

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 61.47 | • 15-YR: 64.03 | • 5-YR: 73.42
Annual high: 40-YR and 15-YR at ~90 in January | Annual low: All three TFs near 0 in September
`;
