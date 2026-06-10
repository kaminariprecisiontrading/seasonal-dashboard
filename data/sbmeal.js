// data/sbmeal.js — Soybean Meal (CBOT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=39.59 · 15-YR=44.6 · 5-YR=18.01

const ASSET_CONFIG = {
  id:       "sbmeal",
  name:     "Soybean Meal (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Soybean Meal CBOT (ZM) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=39.59, 15-YR=44.6, 5-YR=18.01 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — 5-YR declining from ~65; 40-YR at ~50; divergent signals",
    stars:2,
    note:"5-YR starts the year elevated (~65) and declining. 40-YR at ~50. 15-YR at ~40–45. Mixed signals with the 5-YR falling while 40-YR and 15-YR hold. The February 40-YR trough (the most extreme single-month drop in soy meal) is loading. Avoid new longs.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR declining; 40-YR flat; mixed" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"5-YR at 55; 40-YR holding 48; no edge" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★★", note:"40-YR beginning to drop; February trough setup" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; February low imminent" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"40-YR PLUNGES TO ~15 — most extreme single-month drop in soy meal",
    stars:4,
    note:"THE defining February event in soy meal: 40-YR plunges from ~50 to ~15 — a 35-point drop in a single month. This is the largest single-month decline for 40-YR in the soy complex. 15-YR also drops sharply to ~25. 5-YR continues declining to ~45. Cover shorts and begin scaling longs in late February for the March-June bull.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR plunging from 50; February crash accelerating" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 25; most extreme monthly move in soy meal" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"40-YR at 15; trough approaching; cover shorts" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Trough confirmed; add longs; March-June bull loading" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — recovery from February trough; 40-YR from 15 to 35–40",
    stars:4,
    note:"Strong recovery from February's extreme trough. 40-YR from ~15 to ~35–40. 15-YR recovering from ~25 to ~40. 5-YR more volatile but recovering. The crushing margin demand begins building as US soy crush season approaches. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR recovering from 15; add longs aggressively" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 25; 15-YR through 35; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 35; June 100-peak in sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; April-June bull continuation" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs recovering; 40-YR to ~50; 15-YR to ~55",
    stars:4,
    note:"Continued recovery. 40-YR from ~35 to ~50. 15-YR from ~40 to ~55. 5-YR recovering more aggressively. Soy meal demand builds with livestock feed requirements and export demand. June THREE-WAY PEAK at 100 is loading.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 40; 15-YR at 48; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs rising; 40-YR at 45; add" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 50; June peak approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold; May surge incoming" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 40-YR to ~70; 15-YR to ~80; approaching June simultaneous peak",
    stars:4,
    note:"40-YR surges from ~50 to ~70. 15-YR surges to ~80. 5-YR surging to ~85. All three TFs approaching the June simultaneous peak at 100. The crush season peak demand and new crop acreage concerns drive the seasonal. Hold maximum longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 58; all surging; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR at 75; 5-YR approaching 80; peak imminent" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 68; approaching 100 zone" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"June three-way 100 peak approaching; hold max longs" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"flip", combinedLabel:"THREE-WAY 100 PEAK → FLIP SHORT; 40-YR/15-YR/5-YR all at 100",
    stars:5,
    note:"ALL THREE TFs reach ~100 simultaneously in early June — the year's absolute peak. Then THE CRASH. 40-YR from 100 to ~65 by month-end. 15-YR from 100 to ~70. 5-YR from 100 to ~75 then crashes further. This simultaneous three-way peak is one of the cleanest flip signals in the grain complex. EXIT ALL / FLIP SHORT.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Three-way near-100; FINAL LONG WEEK; EXIT NOW" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"THREE-WAY 100 PEAK; EXIT ALL / FLIP SHORT AGGRESSIVELY" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Post-peak crash; 40-YR from 100 to 70; hold short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; September-October near-0 trough in view" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-peak crash continues; all TFs declining toward October trough",
    stars:4,
    note:"Post-peak crash. 40-YR declining from ~65 to ~35. 15-YR declining from ~70 to ~40. 5-YR crashing toward near 0. The combination of US harvest progress, crush margin compression, and South American competition drives the bear.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 60; crash continuing; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining; 15-YR at 55; momentum intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 40; October near-0 trough in view" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; August-September near-trough approaching" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — near-trough; all TFs at ~25; October absolute low loading",
    stars:3,
    note:"All three TFs at ~25. 5-YR crashing toward near 0. October will mark the absolute annual trough. Hold shorts; resist any bounce trades.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 30; near trough; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs at 25; October near-0 approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR near 10; absolute low zone" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Near trough; tighten stops; October reversal loading" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — approaching October trough; all TFs heading to near 0",
    stars:2,
    note:"All three TFs heading to near 0. 40-YR at ~20. 15-YR at ~20. 5-YR near 0. Do not add new shorts. Begin covering in late September and prepare for the October long entry.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR at 20; near-0 approaching; cover shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"Near absolute low zone; tighten stops" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing action; October reversal loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"CHOP ★★★", note:"Early recovery; scale into longs for Oct" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"NEAR-0 TROUGH → RECOVERY; all TFs at annual lows; BUY",
    stars:5,
    note:"ALL THREE TFs at or near 0 — the absolute annual trough. 40-YR near 0. 15-YR near 0. 5-YR near 0. Buy aggressively. December targets: 39.59/44.6/18.01. Export demand and new crop positioning drives the seasonal recovery.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Near-0 trough; BUY MAX; hold into December" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Recovery underway; all TFs surging from near 0" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 20; 15-YR through 25; momentum" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; November-December continuation" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — recovery continues; all TFs heading to year-end reference",
    stars:3,
    note:"Recovery continuation. 40-YR from ~10 to ~35. 15-YR from ~10 to ~40. 5-YR from near 0 to ~15. December targets in sight: 39.59/44.6/18.01. Note: 5-YR ending at only 18.01 means the near-term recovery is partial — the 5-YR didn't fully recover from the October trough.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Recovery accelerating; 40-YR through 20" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 30; 15-YR at 35; year-end target near" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"15-YR approaching 42; December close near" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold into December; reference values approaching" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END; settles at 40-YR=39.59/15-YR=44.6/5-YR=18.01",
    stars:2,
    note:"Year-end recovery completes. 40-YR=39.59. 15-YR=44.6. 5-YR=18.01 — extremely low near-term (barely recovered from October trough). The 5-YR at 18.01 is the most notable year-end value: it reflects the recent weakness of the 5-year window relative to the longer-term. Year-end is below mid-range for all TFs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★", note:"40-YR at 36; approaching reference" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★", note:"At reference zone; 39/44/18" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end consolidation at reference values" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end close; 5-YR at 18 — lowest in soy complex" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the soybean meal seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== SOYBEAN MEAL CBOT — SEASONAL FRAMEWORK ===
Asset: Soybean Meal CBOT (ZM) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=39.59, 15-YR=44.6, 5-YR=18.01

YEARLY ARC:
Jan-Feb = bear; 40-YR PLUNGES from 50 to 15 in February (most extreme single-month drop in soy complex).
Mar-May = strong recovery bull. June = THREE-WAY 100 PEAK (all TFs at 100 simultaneously) → FLIP SHORT.
Jul-Sep = post-peak crash. October = ALL THREE TFs near 0 (annual trough).
Nov-Dec = partial recovery to 39.59/44.6/18.01 (5-YR barely recovers to 18).

=== PLAYBOOK SIGNALS ===
SHORT #1: January–February — 40-YR plunges to 15 (most extreme drop in soy meal)
LONG #1: February Wk4 — trough confirmed; buy; hold through May
EXIT #1: June Wk1 — all three TFs approaching simultaneous 100 peak; SELL ALL / FLIP SHORT
SHORT #2: June Wk2 through September — three-way 100 peak flip; hold short to near-0 trough
LONG #2: October Wk1 — near-0 trough; BUY AGGRESSIVELY

KEY FEATURES:
• February 40-YR plunge to 15: -35 points in one month — the most extreme single-TF monthly drop
• June THREE-WAY simultaneous 100 peak: cleanest multi-TF flip signal in grains
• 5-YR at 18.01 year-end: most depressed year-end near-term value in the grain complex
• Full amplitude: ~100 points from June peak to October trough
• The cycle is compressed relative to soybeans: steeper V-shape from Feb trough to June peak

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 39.59 | • 15-YR: 44.6 | • 5-YR: 18.01
Annual high: All three TFs at ~100 in June | Annual low: All three TFs near 0 in October
`;
