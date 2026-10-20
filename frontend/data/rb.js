// data/rb.js — RBOB Gasoline (NYM) · 35-Year Seasonal (1985–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 35-YR=29.5 · 15-YR=41.59 · 5-YR=37.04

const ASSET_CONFIG = {
  id:       "rb",
  name:     "RBOB Gasoline (NYM)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 35-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · RBOB Gasoline NYMEX (RB) · 35-Year Seasonal (1985–2019) · 15-Year · 5-Year overlays. Reference: 35-YR=29.5, 15-YR=41.59, 5-YR=37.04 at 02 Jan 2020.",
  ltLabel:  "35-YR",
  ltSigKey: "sig35",
  ltKey:    "s35",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"NEAR ANNUAL LOWS — worst time to be long gasoline",
    stars:2,
    note:"All three TFs near annual lows (5–15 range). The post-holiday gasoline demand slump. 35-YR, 15-YR, and 5-YR all depressed. Not a high-conviction month in either direction, but the seasonal bias is clearly downward from here — wait for the explosive March rally.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"BEAR ★★", note:"All TFs at annual lows; no seasonal long case" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"BEAR ★★", note:"Continued weakness; winter gasoline demand trough" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"BEAR ★★", note:"Still depressed; February basing ahead" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"BEAR ★★", note:"Hold flat; watch for February reversal setup" },
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig35:"chop",
    combined:"chop", combinedLabel:"BASING — early-Feb dip then recovery begins; setup for March",
    stars:2,
    note:"Early February brief dip (35-YR near 0), then all TFs begin recovering. This is the final seasonal base before the explosive spring driving-season rally. Key month to confirm position: if price lifts with TFs, the March/April setup is loading.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"BEAR ★★", note:"Brief early-Feb dip; 35-YR touching near 0" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"Annual low forming; basing action" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s35:"chop", com:"CHOP ★★", note:"5-YR lifting first; 15-YR and 35-YR basing" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"BULL ★★★", note:"All three turning up — March explosive rally setup confirmed" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig35:"bull",
    combined:"bull", combinedLabel:"LONG — EXPLOSIVE spring driving-season rally; 15-YR +60 pts in one month",
    stars:4,
    note:"THE explosive month for gasoline. 15-YR surges from ~10 to ~70 — a +60 point single-month move, the largest single-month seasonal move for any TF across all energy assets. 35-YR from ~5 to ~50–55. 5-YR also surges. Buy the dip early March and hold into April peak.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★", note:"Explosive rally begins; 15-YR surging — add aggressively" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★", note:"15-YR through 40; 35-YR through 25; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★", note:"15-YR through 60; driving season demand surge in full force" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"Hold into April — all three TFs heading to simultaneous 100 peak" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig35:"bull",
    combined:"flip", combinedLabel:"THREE-WAY 100 PEAK → FLIP SHORT; cleanest peak in energy complex",
    stars:5,
    note:"THE most precise seasonal peak in all energy. ALL THREE TFs (35-YR, 15-YR, 5-YR) reach 100 simultaneously in April — the cleanest, most extreme peak convergence in the energy complex. This is both the year's highest-conviction LONG (early April) AND its highest-conviction SHORT entry (peak of April). Do NOT miss this reversal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s35:"bull", com:"LONG ★★★★★", note:"All TFs surging toward 100; hold maximum long exposure" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s35:"bull", com:"FLIP ★★★★★", note:"THREE-WAY 100 CONFLUENCE — EXIT ALL LONGS / FLIP SHORT NOW" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★★", note:"All TFs reversing from 100; short aggressively — spring peak over" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"Hold short; May continuation of seasonal bear" },
    ]
  },
  {
    month:"May", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"SHORT — orderly decline from April peak; driving-season pricing complete",
    stars:3,
    note:"Orderly post-peak decline. All three TFs falling from April 100. 15-YR from ~80 to ~65. 35-YR from ~80 to ~65. 5-YR from ~70 to ~55–60. The driving season is fully priced in April; May is the seasonal unwinding. Short bias throughout.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Post-peak selling; all TFs declining from April 100" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"15-YR falling to 75; 35-YR also declining; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"All TFs declining in sync; trend intact" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Hold into June continuation; summer doldrums ahead" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"SHORT — continued summer bear; all TFs declining toward July low",
    stars:3,
    note:"Continued seasonal decline from the April peak. 35-YR falls from ~65 to ~60. 15-YR from ~65 to ~60. 5-YR from ~55 to ~45–50. The summer gasoline bear continues as the driving season premium fades. July 5-YR annual low approaching.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Bear intact; summer premium continuing to fade" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"All TFs declining; 5-YR heading toward summer annual low" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"35-YR and 15-YR in sustained downtrend" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Hold into July; 5-YR annual low zone approaching" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"chop", sig35:"chop",
    combined:"chop", combinedLabel:"MIXED — 5-YR annual low (~25); 35-YR and 15-YR broadly flat",
    stars:2,
    note:"5-YR hits its annual low (~25) in July — extreme short-term weakness. 35-YR and 15-YR however are broadly flat around 60–65, providing a supportive backdrop. The end-of-summer dynamic creates mixed TF signals. Not a high-conviction period.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s35:"chop", com:"CHOP ★★", note:"5-YR falling to annual low; 35-YR/15-YR flat around 60–65" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s35:"chop", com:"CHOP ★★", note:"5-YR at ~25 annual low; 35-YR and 15-YR holding" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"5-YR basing; mixed TF signals — stay flat" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"No clear edge; prepare for late-summer/autumn setup" },
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"chop", sig35:"chop",
    combined:"chop", combinedLabel:"CHOP — end-of-driving-season sideways; 35-YR and 15-YR flat",
    stars:2,
    note:"End of driving season creates a broadly flat/choppy seasonal for all TFs. 35-YR and 15-YR hover around 60–65. 5-YR recovering slightly from July lows. No strong directional bias — this is the 'death zone' before the October-December seasonal bear.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"End-of-driving-season flat; no directional edge" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"All TFs broadly flat; stay flat" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"Awaiting autumn bear catalyst; hold flat" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"BEAR ★★", note:"Seasonal bear beginning to assert; look for short entry" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"SHORT — autumn bear acceleration begins; all TFs declining",
    stars:3,
    note:"Autumn bear acceleration. All three TFs declining from their summer flat zone toward October's extreme lows. 35-YR from ~60 toward ~30–35. 15-YR from ~60 toward ~40. This is the entry for the extended autumn-winter short position.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Autumn seasonal bear confirmed; 35-YR breaking lower" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"All TFs declining in sync; add to short positions" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"35-YR through 45–50; momentum accelerating" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"Hold short into October; extreme low approaching for 35-YR" },
    ]
  },
  {
    month:"October", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"SHORT — 35-YR CRASHES to near 0; highest-conviction short of H2",
    stars:5,
    note:"THE most extreme autumn sell in gasoline. 35-YR CRASHES to near 0 in October — the year's annual low for the long-term seasonal. 15-YR falls to ~30–35. 5-YR also near ~35–40. This is the most extreme single-month seasonal collapse in the energy complex after April's three-way peak. Maximum short conviction.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★★", note:"35-YR in freefall toward 0; maximum short exposure" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★★", note:"35-YR near annual low ~0–5; 15-YR at ~30; stay short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"All TFs at seasonal lows; hold; November continuation likely" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"Hold into November extended bear" },
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"SHORT — extended autumn bear; 35-YR at very low levels",
    stars:4,
    note:"Continued extended bear. 35-YR at very low levels (15–25). 15-YR at ~25–30. 5-YR at ~25–30. All three declining or flat near annual lows. The winter driving season is no match for the post-driving-season structural seasonal weakness.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"35-YR at seasonal lows ~15–25; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"All TFs at or near annual lows; extended bear phase" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Continuing decline; 35-YR deeply depressed" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★", note:"Hold into December; year-end lows for 35-YR approaching" },
    ]
  },
  {
    month:"December", sig5:"bear", sig15:"bear", sig35:"bear",
    combined:"bear", combinedLabel:"BEAR — 35-YR near 0 mid-Dec; year ends at 29.5/41.59/37.04",
    stars:4,
    note:"35-YR continues its late-year decline, touching near 0 in mid-December before a slight recovery. This is one of the most bearish year-end seasonals in the complex. Year ends with 35-YR=29.5, 15-YR=41.59, 5-YR=37.04 — all well below mid-range. Winter is the weakest structural period for gasoline.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"Continued seasonal bear from November; 35-YR still declining" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s35:"bear", com:"SHORT ★★★★", note:"35-YR approaching near-0 trough; maximum H2 short conviction" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"35-YR trough near 0; year-end recovery beginning" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s35:"chop", com:"CHOP ★★", note:"Year-end: 35-YR=29.5, 15-YR=41.59, 5-YR=37.04; cover near reference" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the RBOB gasoline seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 35-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== RBOB GASOLINE NYM — SEASONAL FRAMEWORK ===
Asset: RBOB Gasoline NYMEX (RB) | 35-Year Seasonal (1985–2019)
Reference 02 Jan 2020: 35-YR=29.5, 15-YR=41.59, 5-YR=37.04

YEARLY ARC:
Year begins at annual lows (all TFs 5–10). Jan–Feb: dead zone. March: EXPLOSIVE rally begins.
April: ALL THREE TFs peak simultaneously at ~100 — the cleanest seasonal peak in energy; flip short.
May–Sep: Extended seasonal bear. Oct: 35-YR CRASHES to near 0 (annual low). Nov–Dec: Extended bear; year ends at 29.5/41.59/37.04.

=== PLAYBOOK SIGNALS ===
LONG #1: Late February / March entry — explosive driving-season rally; +60 pts on 15-YR in one month
FLIP #1: April Wk2 — three-way 100 peak (35-YR + 15-YR + 5-YR simultaneously); FLIP SHORT
SHORT #1: October — 35-YR crashes to near 0; strongest autumn short in energy complex
SHORT #2: December — 35-YR near 0 mid-December; extended bear with year ending at 29.5

KEY FEATURES:
• March: 15-YR single-month move of +60 pts — largest single-TF monthly move in energy
• April: ALL THREE TFs at 100 simultaneously — the most precise seasonal peak in all energy
• October: 35-YR crashes to near 0 — most extreme autumn seasonal in energy
• Year-end values (29.5/41.59/37.04) are among the lowest of any energy contract
• Gasoline is the INVERSE of heating oil (ULSD): gasoline peaks in April, troughs in Oct; ULSD peaks in Oct, troughs in Feb

TF REFERENCE VALUES (02 Jan 2020):
• 35-YR: 29.5 | • 15-YR: 41.59 | • 5-YR: 37.04
Annual high: All three TFs at ~100 in April | Annual low: 35-YR near 0 in October
`;
