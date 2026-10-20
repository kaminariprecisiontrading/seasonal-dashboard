// data/wheatm.js — Wheat (MGE) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=62.08 · 15-YR=68.24 · 5-YR=51.96

const ASSET_CONFIG = {
  id:       "wheatm",
  name:     "Wheat MGE",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Wheat MGE (MWE) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=62.08, 15-YR=68.24, 5-YR=51.96 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR starts near annual high (~90); SELL from year-start",
    stars:4,
    note:"MGE Wheat mirrors the CBOT/KCBT pattern: 40-YR begins the year at or near its annual high (~90–95). 5-YR at ~80 and declining. 15-YR at ~30 and declining. January is a SELL for the 40-YR. MGE (Minneapolis) tracks hard red spring wheat — same H1 bear structure as CBOT and KCBT.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 92; SELL from year-start annual high" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR declining from 92; 5-YR at 75" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining; 40-YR at 85" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; May-June divergence peak/trough loading" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — all TFs declining; 40-YR to ~80; bear persists",
    stars:3,
    note:"40-YR declining from ~85 to ~80. 15-YR declining from ~30 to ~25. 5-YR declining from ~65 to ~50. All three TFs in confirmed downtrend. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 83; declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 80; 5-YR at 55" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 78; 15-YR at 25" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into March; April setup loading" },
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"chop", sig40:"bull",
    combined:"chop", combinedLabel:"CHOP — 40-YR volatile; 15-YR beginning to recover; 5-YR declining",
    stars:2,
    note:"40-YR volatile around ~80 with an attempt to recover (note: the 40-YR for MGE has a mid-year HIGH in May, distinct from CBOT/KCBT). 15-YR beginning to recover from ~25. 5-YR declining from ~50 toward ~35. Mixed signals in March.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bull", com:"CHOP ★★", note:"40-YR volatile; 15-YR basing; no clean edge" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"bull", com:"CHOP ★★", note:"40-YR at 80; 5-YR at 40; divergent" },
      { wk:"Wk 3", s5:"bear", s15:"bull", s40:"bull", com:"CHOP ★★", note:"15-YR recovering; await cleaner setup" },
      { wk:"Wk 4", s5:"bear", s15:"bull", s40:"bull", com:"CHOP ★★", note:"April-May divergence peak loading" },
    ]
  },
  {
    month:"April", sig5:"bear", sig15:"bull", sig40:"bull",
    combined:"chop", combinedLabel:"CHOP — 40-YR approaching May peak; 15-YR and 5-YR divergent",
    stars:2,
    note:"40-YR recovering toward its May annual high (~100). 15-YR at ~45 and recovering. 5-YR declining to ~25. The MGE pattern is distinctive: 40-YR peaks in MAY (not January). This sets up the May peak and subsequent H2 bear.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bull", s40:"bull", com:"CHOP ★★", note:"40-YR at 85; 5-YR at 28; divergent" },
      { wk:"Wk 2", s5:"bear", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 90; approaching May peak" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 95; May 100 approaching" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold 40-YR longs into May peak" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"40-YR ANNUAL HIGH (~100) → FLIP SHORT; most extreme May signal in wheat",
    stars:5,
    note:"UNIQUE MGE FEATURE: 40-YR reaches ~100 in May — its annual high. 5-YR also spikes to ~100. 15-YR at ~90–95. Then ALL THREE crash from the May peak. This is the opposite of CBOT/KCBT where the 40-YR annual high is in January. EXIT ALL / FLIP SHORT as 40-YR hits 100.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 98; approaching 100; prepare for exit" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"40-YR at 100 — ANNUAL HIGH; EXIT ALL / FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Post-peak crash begins; all TFs declining" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; June-August trough loading" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-peak crash; all TFs declining from May peak",
    stars:4,
    note:"Post-May-peak crash. 40-YR declining sharply from ~100 toward ~60. 15-YR declining from ~90 toward ~55. 5-YR declining toward ~20. The MGE H2 bear begins. Unlike CBOT/KCBT, the divergence has already resolved (both peak in May). Hold maximum shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR declining from 100 to 80; hold max short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 70; crash accelerating" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 60; 15-YR at 55; all declining" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; August annual trough loading" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — continued post-peak bear; 40-YR at ~25; August trough approaching",
    stars:4,
    note:"40-YR declining from ~60 to ~25. 15-YR declining to ~35. 5-YR declining to ~10. August will mark the annual low for all TFs. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 55; crash continuing; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 40; 15-YR at 28; trough approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 28; 5-YR near 0" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; August annual low imminent" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — 40-YR at ~10; ALL TFs at near-0 annual lows",
    stars:5,
    note:"ANNUAL TROUGH: All three TFs hit near 0 simultaneously in August. 40-YR at ~10–15. 15-YR near 0. 5-YR near 0. This is the lowest-conviction short (trough) and highest-conviction BUY. Buy aggressively late August for the September-November recovery. Year-end targets: 62/68/52.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR approaching 10; near absolute trough" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs near 0; absolute annual trough; cover shorts" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Annual trough confirmed; BUY MAX; hold to December" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Recovery underway; all TFs bouncing from 0" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — explosive recovery from August trough; 40-YR to ~45",
    stars:4,
    note:"Explosive recovery from August's annual trough. 40-YR from ~10 to ~45. 15-YR from near 0 to ~30. 5-YR recovering. The September-October recovery is rapid. October will see 15-YR approach ~75.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs surging from 0; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 38; 15-YR at 28; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 43; recovery in force" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into October; 15-YR near-annual-high loading" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 40-YR to ~55; 15-YR spikes to ~75 (near-annual-high in October)",
    stars:4,
    note:"15-YR spikes to ~75 in October — a major near-annual-high reading from near 0 in August (+75 points in 2 months). 40-YR at ~50–55. 5-YR at ~30–35. All three TFs aligned bullish. Hold longs into November continuation.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR surging to 65; 40-YR at 52" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR at 73; 40-YR at 55; hold max longs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR at 75 peak; partial exit; hold others" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"15-YR consolidating from peak; hold 40-YR longs" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs rising toward year-end reference 62/68/52",
    stars:3,
    note:"All TFs rising. 40-YR at ~60. 15-YR at ~68. 5-YR at ~42. Approaching year-end reference values of 62.08/68.24/51.96. November is a mid-range bullish hold month before December's year-end settlement.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 60; 15-YR at 66; approaching reference" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs at reference zone; 62/68/52" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold into December; year-end settlement approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Year-end reference values in sight" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END; settles at 40-YR=62.08/15-YR=68.24/5-YR=51.96",
    stars:3,
    note:"Year-end settles at 62.08/68.24/51.96. The 40-YR at 62 (below the January start of ~90) reflects the net H1 bear pressure. The MGE cycle: Jan SELL from ~90 → May peak at 100 (unique!) → Aug trough near 0 → Dec recovery to 62/68/52.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 62; 15-YR at 68; reference zone" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end consolidation at reference values" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end close; 62/68/52" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Cycle complete; resets for January new year" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the MGE wheat seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== WHEAT MGE — SEASONAL FRAMEWORK ===
Asset: Wheat MGE (MWE) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=62.08, 15-YR=68.24, 5-YR=51.96

YEARLY ARC:
January = 40-YR near annual high (~90); SELL. All TFs declining.
May = 40-YR hits ~100 (ANNUAL HIGH) — UNIQUE: MGE's annual high is in May, not January.
May Wk2 = ALL THREE TFs at peak simultaneously → FLIP SHORT.
August = ALL THREE TFs at near-0 (annual trough) simultaneously.
Sep-Oct = explosive recovery; 15-YR spikes to ~75 in October.
Dec = year-end 62/68/52.

=== PLAYBOOK SIGNALS ===
SHORT #1: January Wk1 — 40-YR at annual high (~90); SELL immediately
LONG #1: March/April — 40-YR recovering toward May peak; hold into May Wk1
FLIP #1: May Wk2 — 40-YR hits 100; ALL TFs peak; EXIT ALL / FLIP SHORT
SHORT #2: May Wk2 through August — post-peak crash; hold to near-0 trough
LONG #2: August Wk3 — ALL TFs near 0; BUY AGGRESSIVELY; hold to October

KEY FEATURES:
• MGE UNIQUE: 40-YR annual high in May (~100) — NOT January like CBOT/KCBT
• This means January 40-YR is a SELL AND the May 40-YR is a BUY followed by a FLIP
• August three-way near-0 trough: same as CBOT/KCBT but arrives in August (not June)
• October 15-YR spike to ~75 (+75 points from August near-0): rapid recovery
• Year-end 40-YR=62.08 (net bearish vs January ~90 start)
• Hard red spring wheat (Minneapolis) premium reflected in May peak timing

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 62.08 | • 15-YR: 68.24 | • 5-YR: 51.96
Annual high (40-YR): ~100 in May | Annual low (all TFs): near 0 in August
`;
