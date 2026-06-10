// data/milk.js — Class III Milk (CME) · 25-Year Seasonal (1995–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 25-YR=18.63 · 15-YR=26.41 · 5-YR=5.99

const ASSET_CONFIG = {
  id:       "milk",
  name:     "Class III Milk (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 25-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Class III Milk CME (DC) · 25-Year Seasonal (1995–2019) · 15-Year · 5-Year overlays. Reference: 25-YR=18.63, 15-YR=26.41, 5-YR=5.99 at 02 Jan 2020.",
  ltLabel:  "25-YR",
  ltSigKey: "sig25",
  ltKey:    "s25",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"chop", sig25:"bear",
    combined:"bear", combinedLabel:"BEAR — post-December-crash lows; 5-YR near 0; 25-YR depressed",
    stars:2,
    note:"Recovering from December's catastrophic crash. 25-YR at ~20–25 (depressed). 15-YR at ~30. 5-YR at near-0 after December crash. February annual low in sight. The milk seasonal begins the year at depressed levels and the annual low is in February.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"BEAR ★★", note:"Post-crash; near annual lows; no long signal yet" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s25:"bear", com:"BEAR ★★", note:"25-YR at 22; February annual low approaching" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s25:"bear", com:"BEAR ★★", note:"Flat low; February trough setup loading" },
      { wk:"Wk 4", s5:"bear", s15:"chop", s25:"bear", com:"BEAR ★★", note:"Hold short; February trough imminent" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig25:"bear",
    combined:"bear", combinedLabel:"ANNUAL LOW — all TFs at year's lowest point; trough then recovery",
    stars:2,
    note:"ANNUAL LOW: All three TFs at their year's lowest point in February. 25-YR at ~15–20. 15-YR at ~20–25. 5-YR at near-0. Winter milk production cycle drives seasonal weakness. The September THREE-WAY peak of ~100 is the target from this February trough — a 100-point recovery.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"BEAR ★★", note:"Annual trough zone; all TFs at lows; cover shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"BEAR ★", note:"Absolute low; 25-YR at ~15; near 0 for 5-YR" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s25:"chop", com:"CHOP ★★", note:"Trough confirmed; begin scaling longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"Recovery underway from February trough; add longs" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"bull", combinedLabel:"LONG — recovery from February trough; all TFs recovering strongly",
    stars:3,
    note:"Strong recovery from February annual low. 25-YR from ~15 to ~35. 15-YR from ~20 to ~40. 5-YR from near-0 to ~20. The spring flush period — increased milk production but forward demand premium builds. Hold longs from February through September.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"Recovery confirmed; 25-YR through 25; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"All TFs rising; 15-YR through 30; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"25-YR at 35; hold; September 100 in view" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"Hold longs; April-September extended bull continues" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"bull", combinedLabel:"LONG — spring bull; all TFs recovering toward mid-range",
    stars:3,
    note:"Spring bull continuation. 25-YR from ~35 to ~50. 15-YR from ~40 to ~55. 5-YR from ~20 to ~35. The extended bull from February through September is one of the longest sustained directional moves in the dairy complex.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"All TFs rising; 25-YR at 40; hold" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"25-YR at 45; 15-YR at 50; strong momentum" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"5-YR at 30; all TFs in sync bull" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"Hold; May-June acceleration incoming" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"bull", combinedLabel:"LONG — bull acceleration; all TFs heading toward June-September peak zone",
    stars:4,
    note:"Bull acceleration. 25-YR from ~50 to ~65. 15-YR from ~55 to ~70. 5-YR from ~35 to ~55. Cheese and butter demand builds into summer. September three-way peak is approaching. Hold longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Bull accelerating; 25-YR through 55; add to longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"15-YR at 65; momentum strong; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"5-YR at 50; all TFs surging" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Hold into June; September peak in sight" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"bull", combinedLabel:"LONG — strong bull; all TFs approaching 80+; September 100 loading",
    stars:4,
    note:"25-YR from ~65 to ~80. 15-YR from ~70 to ~85. 5-YR from ~55 to ~70. All three TFs approaching high territory. September's three-way simultaneous peak of ~100 is the seasonal target. Hold all longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"All TFs at 70+; hold; September 100 in view" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"25-YR at 75; 15-YR at 80; approaching peak zone" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"5-YR at 65; all TFs surging; stay long" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Hold max longs; July-September final surge" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"bull", combinedLabel:"LONG — final surge to September peak; all TFs at 85–90",
    stars:4,
    note:"Final surge toward September three-way peak. 25-YR from ~80 to ~90. 15-YR from ~85 to ~95. 5-YR from ~70 to ~85. All three TFs approach 100. The September exit is one month away. Hold maximum longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"All TFs at 85+; September 100 in sight; hold max longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"25-YR at 88; 15-YR at 92; peak imminent" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"5-YR at 82; all TFs at ~90; stay long" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Hold; September simultaneous peak is the exit signal" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"bull", combinedLabel:"LONG — at peak zone; all TFs near 100; hold for September exit",
    stars:5,
    note:"All three TFs at or approaching 100. The seasonal high is very close. 25-YR at ~95+. 15-YR at ~95+. 5-YR at ~90+. Hold longs — the September simultaneous three-way peak is the exit. Don't exit early in August; hold for the September signal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Near simultaneous 100; do NOT exit; hold max longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"All TFs at 95+; peak imminent; stay long" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Three-way near-100; September exit in sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Hold; September simultaneous peak = EXIT all longs" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig25:"bull",
    combined:"flip", combinedLabel:"THREE-WAY 100 → CATASTROPHIC CRASH; December 5-YR = 5.99",
    stars:5,
    note:"THE defining seasonal event in Class III Milk. ALL THREE TFs simultaneously hit 100 in September — the year's absolute peak. Then THE CATASTROPHIC CRASH begins. 5-YR crashes from 100 to 5.99 at year-end (essentially 0). 25-YR falls from 100 to 18.63. 15-YR falls from 100 to 26.41. EXIT ALL LONGS at September peak; FLIP SHORT aggressively.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Three-way 100 simultaneous peak — SELL NOW / EXIT ALL LONGS" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"FLIP ★★★★★", note:"CATASTROPHIC CRASH BEGINS — all TFs from 100; FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"Crash accelerating; fastest fall in dairy complex; hold short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"All TFs crashing toward December 5.99/18.63/26.41 targets" },
    ]
  },
  {
    month:"October", sig5:"bear", sig15:"bear", sig25:"bear",
    combined:"bear", combinedLabel:"SHORT — catastrophic crash continues; 5-YR heading to near 0",
    stars:5,
    note:"Catastrophic crash continues. 5-YR from ~80 to ~30. 25-YR from ~80 to ~50. 15-YR from ~80 to ~55. December's 5-YR=5.99 target is in sight. The post-September collapse is one of the most extreme seasonal moves in the agricultural complex. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"Crash intact; 5-YR through 60; December 5.99 target in view" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"25-YR through 60; 15-YR through 65; crash intensifying" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"5-YR at 40; approaching near-0; hold short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"Hold into November; December 5.99 target close" },
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig25:"bear",
    combined:"bear", combinedLabel:"SHORT — crash final leg; 5-YR heading to near 0",
    stars:4,
    note:"Final crash leg. 5-YR from ~30 to ~10. 25-YR from ~50 to ~25. 15-YR from ~55 to ~30. December's catastrophic year-end close is imminent. Hold shorts into December. 5-YR at 5.99 by year-end is one of the most extreme reference values in the entire dataset.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"Crash final leg; 5-YR at 20; December near-0 approaching" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"25-YR at 30; 15-YR at 32; near reference values" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"5-YR at 10; December 5.99 target close" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"Hold into December; year-end crash completes" },
    ]
  },
  {
    month:"December", sig5:"bear", sig15:"bear", sig25:"bear",
    combined:"bear", combinedLabel:"YEAR-END CATASTROPHE — 5-YR=5.99 (essentially 0); 25-YR=18.63; 15-YR=26.41",
    stars:3,
    note:"YEAR-END CATASTROPHIC CLOSE. 5-YR=5.99 — essentially 0. This is the most extreme year-end reference value in the entire seasonal dataset. 25-YR=18.63. 15-YR=26.41. The milk seasonal year ends in collapse. February will be the annual low (all TFs at ~15–20), and then the entire 100-point recovery begins again.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★", note:"5-YR approaching 10; 25-YR at 22; crash completing" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★", note:"5-YR at 8; December reference zone approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★", note:"At reference zone: 25-YR=18.63/15-YR=26.41/5-YR=5.99" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★", note:"Year-end; 5-YR at ~6 (essentially 0); reset for February bull" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the Class III Milk seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 25-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== CLASS III MILK CME — SEASONAL FRAMEWORK ===
Asset: Class III Milk CME (DC) · 25-Year Seasonal (1995–2019)
Reference 02 Jan 2020: 25-YR=18.63, 15-YR=26.41, 5-YR=5.99

YEARLY ARC:
January at depressed lows. February = ANNUAL LOW for all TFs (~15–20).
March-August = extended bull (25-YR from ~15 to ~100 — longest bull run in dairy).
September = THREE-WAY SIMULTANEOUS PEAK at ~100 for ALL THREE TFs → CATASTROPHIC CRASH.
October-December = catastrophic collapse. Year-end: 25-YR=18.63/15-YR=26.41/5-YR=5.99 (5-YR essentially 0).

=== PLAYBOOK SIGNALS ===
LONG #1: February Wk3/Wk4 — annual trough confirmed; buy; hold 7 months through September
HOLD: March through August — extended bull plateau; DO NOT EXIT EARLY; hold max longs to September
EXIT #1: September Wk1 — THREE-WAY SIMULTANEOUS PEAK at ~100; EXIT ALL LONGS NOW
FLIP #1: September Wk2 — catastrophic crash begins; FLIP SHORT; hold to year-end
SHORT #1: September Wk2 through December — most extreme post-peak crash in the dairy complex

KEY FEATURES:
• February annual low and September annual high: 100-point seasonal range across 7 months
• The 7-month extended bull (Feb-Sep) is the longest sustained directional move in dairy
• September THREE-WAY SIMULTANEOUS 100 peak is the cleanest exit signal in the dataset
• 5-YR=5.99 at December year-end — most extreme near-zero year-end value in the dataset
• 25-YR label (not 40-YR): shorter history (1995-2019); unique in the meats/dairy complex
• The post-September crash (Sep→Dec: -80 to -94 points per TF) is the most violent seasonal fall

TF REFERENCE VALUES (02 Jan 2020):
• 25-YR: 18.63 | • 15-YR: 26.41 | • 5-YR: 5.99
Annual high: All three TFs at ~100 simultaneously in September
Annual low: All three TFs at ~15–20 in February (25-YR and 15-YR) / near-0 (5-YR)
`;
