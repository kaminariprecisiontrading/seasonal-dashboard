// data/ng.js — Natural Gas (NYM) · 30-Year Seasonal (1990–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 30-YR=43.96 · 15-YR=45.1 · 5-YR=27.82

const ASSET_CONFIG = {
  id:       "ng",
  name:     "Natural Gas (NYM)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 30-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Natural Gas NYMEX (NG) · 30-Year Seasonal (1990–2019) · 15-Year · 5-Year overlays. Reference: 30-YR=43.96, 15-YR=45.1, 5-YR=27.82 at 02 Jan 2020.",
  ltLabel:  "30-YR",
  ltSigKey: "sig30",
  ltKey:    "s30",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig30:"bear",
    combined:"bear", combinedLabel:"SELL — year opens at seasonal HIGHS; opposite of crude",
    stars:4,
    note:"CRITICAL DIFFERENCE: Natural gas STARTS the year at annual highs (5-YR ~70, 15-YR ~75, 30-YR ~55). The seasonal trade is an IMMEDIATE SELL from January 1. This is the exact inverse of crude oil and the most important structural feature of the NG seasonal.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★", note:"All TFs at annual highs on Jan 1; sell immediately — winter demand peak behind us" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★", note:"5-YR falling from ~70; 15-YR from ~75; momentum strong" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"All TFs declining; seasonal sell-off accelerating" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"Hold short into February capitulation" },
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig30:"chop",
    combined:"chop", combinedLabel:"TROUGH — 30-YR annual low ~5; transition from H1 bear to base",
    stars:2,
    note:"30-YR hits its annual low near 5 in early February. All three TFs near 0. The crash from January highs is complete. Basing action begins mid-month. Not a high-conviction entry either direction — wait for March signal.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★", note:"Final capitulation; 30-YR approaching ~5 annual low" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★", note:"Annual low forming; basing — all three TFs near 0" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★", note:"Basing continues; no directional edge" },
      { wk:"Wk 4", s5:"bull", s15:"chop", s30:"chop", com:"CHOP ★★", note:"5-YR first to lift; 30-YR and 15-YR still flat" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"chop", sig30:"chop",
    combined:"chop", combinedLabel:"CHOP — gradual recovery, low conviction; watch for 15-YR confirmation",
    stars:2,
    note:"Gradual recovery from February lows. 30-YR recovers from ~5 to ~20–25. 15-YR from ~15 to ~25. 5-YR leading but at modest levels. No sustained bull signal yet — NG spring recovery is slow compared to crude.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"chop", s30:"chop", com:"CHOP ★★", note:"5-YR leading recovery; 30-YR and 15-YR lagging" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s30:"chop", com:"CHOP ★★", note:"15-YR beginning to recover; 30-YR still flat" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★", note:"30-YR finally lifting; conviction still low" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★", note:"All recovering; watch for May spike setup" },
    ]
  },
  {
    month:"April", sig5:"chop", sig15:"chop", sig30:"chop",
    combined:"chop", combinedLabel:"CHOP — consolidation before May injection-demand spike",
    stars:2,
    note:"April is a consolidation month. TFs broadly choppy around 25–35. Pre-injection season dynamics create mixed signals. Not a high-conviction period for NG — stay flat and watch for the May 15-YR spike opportunity.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★", note:"Consolidation; no directional edge in April" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★", note:"TFs broadly flat; await injection season dynamic" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s30:"chop", com:"CHOP ★★", note:"15-YR beginning to stir; 30-YR and 5-YR flat" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s30:"chop", com:"CHOP ★★", note:"15-YR pickup; watch for May spike continuation" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"INJECTION SPIKE — 15-YR surges to ~80–85 (storage demand)",
    stars:3,
    note:"15-YR has a distinctive injection-season spike to ~80–85 in May. 30-YR also rises to ~35–45. 5-YR more volatile. This is driven by early summer injection demand dynamics. The move can be sharp but fades quickly — it's NOT the H2 bull; it's a seasonal trading opportunity.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★", note:"15-YR surging toward 80; injection demand spike underway" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★", note:"15-YR approaching 80–85; 30-YR at 40; ride the spike" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★", note:"15-YR spike fading; do not overstay — reduce longs" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★", note:"Spike reverting; head toward June-July absolute trough" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig30:"bear",
    combined:"bear", combinedLabel:"BEAR — summer injection flood; all TFs heading to July absolute trough",
    stars:3,
    note:"All three TFs declining toward July's absolute annual trough. 15-YR falls from ~80 to ~30–35. 30-YR from ~35–45 to ~20. 5-YR also falling. The summer injection surplus overwhelms seasonal demand. Short bias.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"All TFs declining from May spike; short the fades" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"15-YR falling hard from ~80 toward 30–35" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"30-YR approaching 20; July trough in sight" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"Hold short into July absolute trough" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig30:"bear",
    combined:"chop", combinedLabel:"ABSOLUTE TROUGH — all TFs near 0; NO EDGE; watch for late reversal",
    stars:1,
    note:"ABSOLUTE ANNUAL TROUGH. All three TFs crash to near 0 — the lowest point of the entire year. This is THE most bearish seasonal moment for natural gas. However, with all TFs already at 0, the downside is exhausted. Late July begins the setup for the H2 bull. Avoid new shorts at 0.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★", note:"All TFs crashing toward 0; absolute trough zone" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★", note:"All three near 0 — lowest seasonal point of the year" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★", note:"Basing at annual lows; potential reversal zone" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★", note:"Late-July reversal signal: H2 heating season bull begins — BUILD POSITION" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"LONG — H2 heating season bull begins; build position",
    stars:3,
    note:"The H2 winter heating demand seasonal begins in August. All three TFs rising from July trough. 30-YR from ~5 to ~25–30. 15-YR from near 0 to ~20–25. 5-YR also recovering. This is the early-entry phase of the major H2 bull that peaks in November.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★", note:"H2 bull confirmed; build position — November 100 in view" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★", note:"30-YR recovering strongly from ~5; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★", note:"All TFs rising in sync; hold and add" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★", note:"30-YR through 20; September acceleration ahead" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"LONG — primary H2 bull acceleration; 30-YR surges toward 100",
    stars:5,
    note:"September is the KEY ENTRY MONTH for the NG winter heating bull. 30-YR and 15-YR surge toward their November peak. 5-YR also strongly bullish. This is the highest-conviction long period of H2 — full TF alignment driving toward November 100.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"Full TF alignment; maximum long — heating season surge underway" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"30-YR through 40; 15-YR also surging; hold and add" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"All TFs accelerating toward November peak" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"Hold into October continuation; November 100 approach" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"LONG — H2 surge continues; all three TFs rushing toward 100",
    stars:5,
    note:"October is a continuation of the September surge. 30-YR and 15-YR both approaching 100 — winter heating demand in full force. 5-YR also strongly bullish. Hold full position into November peak. This is a 5★ hold.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"All TFs surging toward 100; stay long, no exit signal yet" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"30-YR and 15-YR approaching 95; maximum hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"Near-100 alignment; November peak in view" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"Hold into November — do not exit early; peak is in November" },
    ]
  },
  {
    month:"November", sig5:"chop", sig15:"chop", sig30:"chop",
    combined:"flip", combinedLabel:"ANNUAL PEAK — ALL THREE TFs AT 100 SIMULTANEOUSLY; then SHARP REVERSAL",
    stars:5,
    note:"THE DEFINING SEASONAL MOMENT for natural gas. All three TFs (30-YR, 15-YR, 5-YR) converge at 100 simultaneously in November — the annual peak. This is also the most extreme REVERSAL setup in the NG seasonal: immediately after the 100 confluence, ALL THREE crash sharply. Exit longs and flip short at the November peak.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"LONG ★★★★★", note:"All TFs near 100; maximum long exposure; watch for peak candle" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"FLIP ★★★★★", note:"THREE-WAY 100 CONFLUENCE — EXIT LONGS / FLIP SHORT immediately" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★★", note:"All TFs reversing from 100; short aggressively — December crash underway" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★★", note:"Hold short; December seasonal crash from November peak is sharp" },
    ]
  },
  {
    month:"December", sig5:"bear", sig15:"bear", sig30:"bear",
    combined:"bear", combinedLabel:"SHORT — sharp crash from November peak; 30-YR falls to ~44",
    stars:4,
    note:"The December crash from November's 100 peak is the year's final seasonal trade. 30-YR falls from ~100 to ~43.96. 15-YR falls to ~45.1. 5-YR to ~27.82. All three declining sharply. The bear is broad and sustained, ending the year exactly where the seasonal data suggests — mid-range, well below November's highs.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★", note:"Sharp December crash from November 100 peak; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★", note:"All TFs declining hard; 30-YR through 70" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★★", note:"30-YR approaching 50; maintain short exposure" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s30:"bear", com:"SHORT ★★★", note:"Year-end: 30-YR=43.96, 15-YR=45.1, 5-YR=27.82; cover near reference" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the natural gas seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 30-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== NATURAL GAS NYM — SEASONAL FRAMEWORK ===
Asset: Natural Gas NYMEX (NG) | 30-Year Seasonal (1990–2019)
Reference 02 Jan 2020: 30-YR=43.96, 15-YR=45.1, 5-YR=27.82

YEARLY ARC:
OPPOSITE OF CRUDE. Year BEGINS at annual highs (5-YR~70, 15-YR~75, 30-YR~55) — sell from January 1.
Feb = annual trough (~0–5). May = injection-demand spike (15-YR to ~80). Jul = absolute trough (all near 0).
Sep-Oct = H2 heating season surge. Nov = ALL THREE TFs at 100 simultaneously (ANNUAL PEAK + FLIP SHORT).
Dec = sharp crash back to ~44/45/28. Year-end reference is mid-range.

=== PLAYBOOK SIGNALS ===
SHORT #1: January 1 — sell from annual highs; 30-YR falls from ~55, 15-YR from ~75
LONG #1: Late July — all TFs at 0; H2 heating season begins; hold Sep-Oct-Nov
FLIP #1: November Wk2 — three-way 100 confluence; EXIT LONGS / FLIP SHORT immediately
SHORT #2: December — sharp crash from November peak; 30-YR falls ~50 points in one month

CRITICAL FEATURES:
• Natural gas is the ONLY major energy contract that starts the year at annual highs
• July = absolute trough (all three TFs near 0 simultaneously)
• November = three-way 100 confluence — unique high-conviction flip signal
• May injection spike is a TRADING spike (secondary), NOT the primary seasonal bull
• December crash is sharper and more reliable than any other energy December move

TF REFERENCE VALUES (02 Jan 2020):
• 30-YR: 43.96 | • 15-YR: 45.1 | • 5-YR: 27.82
Annual high: All three TFs at ~100 in November | Annual low: All three TFs near 0 in July
`;
