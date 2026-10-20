// data/gasoil.js — Gas Oil (ICE) · 34-Year Seasonal (1986–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 34-YR=66.32 · 15-YR=62.43 · 5-YR=46.77

const ASSET_CONFIG = {
  id:       "gasoil",
  name:     "Gas Oil (ICE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Gas Oil ICE (G) · 34-Year Seasonal (1986–2019) · 15-Year · 5-Year overlays. Reference: 34-YR=66.32, 15-YR=62.43, 5-YR=46.77 at 02 Jan 2020.",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"chop", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"BEAR — 34-YR falling toward annual low; 15-YR and 5-YR weak",
    stars:2,
    note:"34-YR begins January around ~20 and falls toward its annual low. 15-YR near 5–10 and declining. 5-YR starts at ~25 but also declining. All three heading toward the February trough. Gas Oil is a middle-distillate contract closely correlated with ULSD — same pattern, different exchange.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bear", s34:"bear", com:"BEAR ★★", note:"34-YR declining from ~20; 15-YR near 5–10 and falling" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"All TFs declining toward February annual low" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"Continued weakness; February trough approaching" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"Hold flat; annual low imminent in February" },
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig34:"chop",
    combined:"chop", combinedLabel:"TROUGH — 34-YR annual low ~5–10; all three at annual lows",
    stars:2,
    note:"34-YR hits its annual low (~5–10) in early February. 15-YR near 0. 5-YR near 0. This is the deepest seasonal trough for Gas Oil's long-term average — identical timing to ULSD. Recovery begins mid-month. Confirm the turn before initiating longs.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"Final capitulation; 34-YR pressing to annual low ~5–10" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★", note:"Annual low forming; all three TFs near 0 — basing" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★", note:"Recovery beginning; early long entry on confirmation" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★", note:"All three lifting; confirm with price before adding" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"LONG — H1 spring recovery; 15-YR surges strongly",
    stars:3,
    note:"Recovery gains momentum. 34-YR climbs from ~10 to ~30–35. 15-YR surges aggressively from ~5 to ~55–60. 5-YR recovering from near 0 to ~20–25. Spring diesel/heating demand drives the recovery. Build position for the April-May peak zone.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★", note:"Recovery confirmed; 15-YR leading aggressively" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★", note:"34-YR through 20; 15-YR surging toward 50" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★", note:"All TFs in sync; hold longs into April-May peak" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"Hold into April; 5-YR spike to ~100 approaching" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"LONG → TOP WATCH — 15-YR peaks ~85–90; 5-YR approaching ~100",
    stars:4,
    note:"15-YR peaks at ~85–90 in April. 34-YR still rising toward ~50. 5-YR approaching ~100 in early May. April is the peak zone for the 15-YR — manage longs tightly in the second half of April. The May 5-YR spike is the final seasonal high.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"All TFs rising; 15-YR approaching 85; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"15-YR near peak ~85–90; tighten stops" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s34:"bull", com:"CHOP ★★", note:"15-YR beginning to roll from peak; reduce exposure" },
      { wk:"Wk 4", s5:"bull", s15:"chop", s34:"chop", com:"CHOP ★★", note:"15-YR declining; 5-YR still surging toward May 100 spike" },
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"bear", sig34:"chop",
    combined:"chop", combinedLabel:"VOLATILE — 5-YR spikes to ~100 early May then crashes",
    stars:1,
    note:"5-YR spikes to ~100 in very early May then crashes hard — identical to the CL pattern. 15-YR falling from its April peak. 34-YR choppy. This is the most treacherous month for Gas Oil — stay flat. The H1 seasonal bull is over.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bear", s34:"chop", com:"CHOP ★", note:"5-YR spiking to ~100 while 15-YR already falling; flat" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"5-YR reversing from ~100; all TFs declining" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"Broad selling from May peak; short if price confirms" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"Heading into June H1 trough; hold flat or short" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"H1 TROUGH — all three at seasonal lows; July reversal setup",
    stars:2,
    note:"H1 trough. 34-YR at ~30–35. 15-YR at ~25–35. 5-YR at ~30–35. All three at local lows. The H2 winter heating demand recovery is being set up. Late June / early July is the inflection point — watch for the reversal.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"All TFs heading toward June trough" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"34-YR at ~30–35; approaching H1 seasonal low" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★", note:"Local low forming; basing action begins" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★", note:"H2 recovery setup: lift from trough — early long entry" },
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"LONG — H2 heating demand recovery; all TFs rising from June lows",
    stars:3,
    note:"H2 recovery begins as the market prices in winter heating demand. 34-YR rising from ~30 toward ~55. 15-YR from ~30 toward ~50. 5-YR also recovering. This is the H2 long entry — hold through the October annual peak.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★", note:"H2 bull confirmed; build position from June trough" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★", note:"34-YR through 40; 15-YR recovering; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★", note:"All TFs rising; hold and add on dips" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"34-YR through 50; August-September acceleration ahead" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"LONG — H2 surge accelerates; 15-YR approaching ~80",
    stars:4,
    note:"H2 heating demand surge in full force. 15-YR approaches ~80 by end of August. 34-YR climbing toward ~70–75. 5-YR also strong. October annual peak is the target. Very similar to ULSD's August pattern.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"15-YR through 60; 34-YR through 60; full bull alignment" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"All TFs rising strongly; add on dips" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★", note:"15-YR approaching 80; October 100 in view" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"September acceleration ahead; maximum long" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"LONG — primary H2 bull; 15-YR and 34-YR surging toward 100",
    stars:5,
    note:"September is the peak acceleration month for Gas Oil's H2 bull. 15-YR surges toward 90–95. 34-YR surging strongly toward ~85–90. 5-YR at ~65–70. Full TF alignment. The October annual peak for both 15-YR and 34-YR is approaching. Highest conviction long of H2.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Full TF alignment; maximum long — winter demand surge" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"15-YR through 80; 34-YR through 75; hold all" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"All TFs accelerating toward October 100 peak" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Hold maximum long into October; annual peak imminent" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"flip", combinedLabel:"15-YR AND 34-YR BOTH AT 100 → FLIP SHORT; dual annual peak",
    stars:5,
    note:"Both the 15-YR AND 34-YR hit 100 simultaneously in October — a dual annual peak that is the most important seasonal moment for Gas Oil. 5-YR also peaks at ~75–80. Exit longs when 15-YR/34-YR reach 100 and flip short. The winter demand premium is fully priced. Rollover is swift.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"LONG ★★★★★", note:"Both 15-YR and 34-YR surging toward 100; stay long" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s34:"chop", com:"FLIP ★★★★★", note:"DUAL 100 PEAK (15-YR + 34-YR simultaneously) — EXIT / FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★", note:"All TFs reversing from 100; short aggressively" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★★", note:"Rollover confirmed; hold short into November" },
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"SHORT — sustained rollover from October dual peak",
    stars:3,
    note:"Continued seasonal decline from October's dual 100 peak. 34-YR falls from ~100 to ~70–75. 15-YR from ~100 to ~70–75. 5-YR from ~75 to ~55–60. All three declining. The winter demand premium has been fully sold out of the seasonal.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★", note:"Post-peak rollover; 34-YR breaking from 100" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★", note:"All TFs declining from dual peak; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★", note:"34-YR through 80; 15-YR also declining; trend intact" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★", note:"Hold into December moderate continuation" },
    ]
  },
  {
    month:"December", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"BEAR — moderate year-end decline; 34-YR settles at 66.32",
    stars:3,
    note:"Continued orderly seasonal decline. 34-YR falls to ~66.32 by year-end. 15-YR to ~62.43. 5-YR to ~46.77. The decline is moderate and orderly — same pattern as ULSD, reflecting the shared middle-distillate seasonal structure. Year ends at mid-to-high range.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★", note:"Continued post-October decline; 34-YR through 75" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"SHORT ★★★", note:"All TFs declining toward year-end reference values" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"34-YR approaching ~70; moderate decline continues" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★", note:"Year-end: 34-YR=66.32, 15-YR=62.43, 5-YR=46.77; cover near reference" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the Gas Oil seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 34-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== GAS OIL ICE — SEASONAL FRAMEWORK ===
Asset: Gas Oil ICE (G) | 34-Year Seasonal (1986–2019)
Reference 02 Jan 2020: 34-YR=66.32, 15-YR=62.43, 5-YR=46.77

YEARLY ARC:
Year begins with 34-YR falling toward its ANNUAL LOW (~5–10) in February. Spring recovery follows.
April = 15-YR peak (~85–90); May = 5-YR spike to ~100 then crash; June = H1 trough.
July–September = strong H2 recovery (winter heating demand). October = 15-YR AND 34-YR BOTH at 100 simultaneously → FLIP SHORT.
November–December = orderly rollover to ~66/62/47.

=== PLAYBOOK SIGNALS ===
LONG #1: February Wk3 (annual low confirmed) | BUILD through March–April
FLIP #1: May Wk1 — 5-YR at 100; EXIT LONGS | Wait for June H1 trough
LONG #2: Late June / July — H2 recovery entry; hold Sep–Oct
FLIP #2: October Wk2 — DUAL 100 PEAK (15-YR + 34-YR simultaneously); EXIT LONGS / FLIP SHORT

KEY GAS OIL vs ULSD PARALLELS:
• Gas Oil is ICE's equivalent of NYMEX ULSD — same product, different exchange
• Both hit February annual lows; both peak in October
• ULSD has 40-YR seasonal; Gas Oil has 34-YR (started 1986 vs ULSD from 1980)
• Gas Oil 5-YR spike to 100 occurs in early May (vs ULSD 5-YR spike in early April — slight timing difference)
• October dual peak: Gas Oil has BOTH 34-YR AND 15-YR at 100 (ULSD has 40-YR at 100, 15-YR near 100)
• Both end year at similar levels: Gas Oil 66/62/47, ULSD 68/67/54

TF REFERENCE VALUES (02 Jan 2020):
• 34-YR: 66.32 | • 15-YR: 62.43 | • 5-YR: 46.77
Annual high: Both 34-YR and 15-YR at ~100 in October | Annual low: 34-YR near 5 in February
`;
