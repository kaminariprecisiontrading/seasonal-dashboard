// data/lc.js — Live Cattle (CME) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=81.92 · 15-YR=99.78 · 5-YR=72.37

const ASSET_CONFIG = {
  id:       "lc",
  name:     "Live Cattle (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Live Cattle CME (LC) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=81.92, 15-YR=99.78, 5-YR=72.37 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"chop", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 40-YR rising from ~55 to ~75; 15-YR surging; Q1 bull setup",
    stars:4,
    note:"40-YR rises from ~55 to ~75. 15-YR surging strongly upward from ~45 to ~75. 5-YR more muted around ~40–50. Q1 cattle demand premium begins building. The January bull sets up the March-April VERTICAL CRASH — hold longs from Jan through late March then exit.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR rising fast; 15-YR surging; build longs" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 60; 15-YR at 55; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR beginning to rise; all TFs aligned" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; February continuation; late-March crash ahead" },
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising; approaching Q1 peak at ~90",
    stars:4,
    note:"Strong Q1 bull continuation. 40-YR rising from ~75 to ~85. 15-YR rising from ~75 to ~90. 5-YR rising from ~50 to ~60. All three TFs in strong uptrend. Hold longs — the crash is coming in late March/April but February is a clean bull month.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs surging; Q1 peak in sight; hold and add" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 80; 15-YR at 85; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR approaching 90; peak zone in sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into March; prepare exit plan for Wk2 crash" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"flip", combinedLabel:"PEAK → VERTICAL CRASH — 40-YR at 90; most dramatic crash in dataset",
    stars:5,
    note:"THE most dramatic seasonal event in the cattle dataset — and arguably in the entire futures complex. 40-YR reaches ~90 in early March. 15-YR at ~95–100. Then: VERTICAL CRASH from 90 to 25 for 40-YR in the space of one month. This is the single most extreme intra-month reversal in the dataset. Exit ALL longs by March Wk1-Wk2.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 90; 15-YR near 100 — EXIT ALL LONGS NOW" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"VERTICAL CRASH BEGINS — 40-YR from 90 toward 25; FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Crash accelerating; most extreme weekly drop in dataset; hold short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 30; crash confirmed; hold short into April" },
    ]
  },
  {
    month:"April", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-crash; 40-YR at ~25; hold short through summer",
    stars:4,
    note:"Post-crash consolidation at lows. 40-YR at ~25. 15-YR at ~25. 5-YR at ~25. All three TFs crashed and holding lows. The summer cattle bear phase begins from here. No recovery until October-November. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 25; post-crash held lows; short intact" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs at lows; summer bear in full force" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Consolidation at lows; no recovery signal yet" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into May; no catalyst for reversal" },
    ]
  },
  {
    month:"May", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — summer bear; all TFs at lows around ~20–25",
    stars:3,
    note:"All three TFs remain at depressed levels. 40-YR around ~20–25. 15-YR around ~20–25. 5-YR around ~20. Summer cattle demand weak; feedlot placement cycle creating supply pressure. Hold shorts into the summer trough.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs at lows; summer bear intact; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 20; no recovery signal; short intact" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Continued weak; 5-YR weak around 20" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short into June; summer grind continues" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — extended summer low; all TFs near trough zone",
    stars:3,
    note:"Continued summer bear. 40-YR at ~20–25. 15-YR at ~20. 5-YR at ~20. The summer slaughter-season supply pressure keeps cattle seasonally weak. No early October recovery signal yet.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Summer bear grinding; all TFs at lows" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR flat at 20; no catalyst for recovery" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs at absolute lows; grind intact" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short; October reversal is the exit" },
    ]
  },
  {
    month:"July", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — slight recovery; 5-YR begins firming; no clean direction",
    stars:2,
    note:"Slight recovery from absolute lows. 40-YR to ~30–35. 15-YR to ~25–30. 5-YR beginning to recover to ~30–35. Mixed signals — not a clean entry month. Partial short cover appropriate.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Slight recovery from lows; mixed signals" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"40-YR at 30; 5-YR firming; cover some shorts" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"No clean edge; avoid new positions" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Transition month; await August direction" },
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — mid-range consolidation; all TFs around 35–45",
    stars:2,
    note:"Mid-range consolidation. 40-YR at ~35–40. 15-YR at ~35–40. 5-YR at ~35–40. Waiting for the October-November year-end bull setup. No clean seasonal edge in August.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Mid-range consolidation; no edge" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"40-YR at 38; flat; await October setup" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"chop", com:"CHOP ★★", note:"15-YR beginning to firm; Q4 bull loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"chop", com:"CHOP ★★★", note:"15-YR and 5-YR firming; October bull incoming" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 bull begins; all TFs recovering toward year-end highs",
    stars:4,
    note:"Q4 bull phase begins. 40-YR recovering from ~40 to ~55. 15-YR recovering from ~40 to ~65. 5-YR recovering from ~40 to ~55. The year-end cattle demand premium begins building. November-December will see the 15-YR approach 100 (its annual high).",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Q4 bull confirmed; all TFs recovering; build longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 45; 15-YR surging; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs in sync; year-end bull fully underway" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; October-December highest conviction period" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — strong Q4 bull; 40-YR to ~70; 15-YR to ~85",
    stars:5,
    note:"High conviction Q4 bull. 40-YR rises to ~70. 15-YR rises to ~85. 5-YR rises to ~60. The year-end bull is the highest-conviction long period in the cattle seasonal. 15-YR's target of ~100 at year-end is in sight. Add to longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR through 60; 15-YR through 75; add to longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 80; approaching 100; hold and add" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 70; 15-YR at 85; November 100 target in view" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Hold max longs; November-December year-end high approaching" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 15-YR approaching 100; 40-YR at 80; year-end premium",
    stars:5,
    note:"15-YR approaches or reaches 100 — the ANNUAL HIGH for 15-YR, which occurs at YEAR-END (opposite of most assets). 40-YR to ~80. 5-YR to ~65. The year-end cattle demand premium peaks with holiday beef demand. December will be the exit month for longs. 15-YR=99.78 reference is reached at year-end.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR approaching 90; 40-YR at 78; hold max longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 95; near annual high; don't exit yet" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 98; at annual high; begin taking profits" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at ~100; 40-YR at 82; hold into December reference" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → YEAR-END; settles at 40-YR=81.92/15-YR=99.78/5-YR=72.37 — ANNUAL HIGH",
    stars:5,
    note:"Year-end completes at the ANNUAL HIGH for 15-YR (99.78) and near-annual highs for 40-YR (81.92) and 5-YR (72.37). Live Cattle is UNIQUE: its annual high occurs at YEAR-END, not mid-year. The strongest seasonal month for 15-YR in the entire dataset. Hold longs through December 31 before January reassessment.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 81; 15-YR at 99; at reference zone" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 100; 5-YR at 72; ANNUAL HIGH in December" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs at reference values; 81.92/99.78/72.37" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Hold through year-end; most unique seasonal in meats" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the live cattle seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== LIVE CATTLE CME — SEASONAL FRAMEWORK ===
Asset: Live Cattle CME (LC) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=81.92, 15-YR=99.78, 5-YR=72.37

YEARLY ARC:
Jan–Feb = strong Q1 bull (40-YR rises from 55 to 90). Late March = VERTICAL CRASH from 90 to 25
(most dramatic single-month move in the dataset). Apr–Aug = extended summer bear near lows.
Sep–Oct = Q4 bull recovery. Nov–Dec = YEAR-END ANNUAL HIGH (15-YR=99.78 at December 31).

=== PLAYBOOK SIGNALS ===
LONG #1: January — 40-YR rising fast; build longs; hold through late February
EXIT #1: March Wk1 — 40-YR at 90; EXIT ALL LONGS before the vertical crash
FLIP #1: March Wk2 — VERTICAL CRASH begins; FLIP SHORT aggressively
LONG #2: September Wk1 — Q4 bull confirmed; add max longs for Oct-Dec
HOLD #1: November-December — 15-YR approaching 100 (ANNUAL HIGH at year-end); hold max longs

KEY FEATURES:
• March VERTICAL CRASH: 40-YR from 90 to 25 in one month — most extreme intra-month move in dataset
• Live Cattle's annual high for 15-YR occurs in DECEMBER (99.78) — opposite of most assets
• The Q4 bull (Sep–Dec) is the highest-conviction period in the entire meats complex
• Jan–Feb Q1 bull is equally strong — two high-conviction windows per year
• 5-YR at 72.37 at year-end: significant, but 15-YR at 99.78 is the dominant signal

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 81.92 | • 15-YR: 99.78 | • 5-YR: 72.37
Annual high: 15-YR at ~100 in December | Annual low: All three TFs at ~20–25 in April–June
`;
