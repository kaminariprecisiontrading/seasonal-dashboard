// data/sboil.js — Soybean Oil (CBOT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=50.81 · 15-YR=96.17 · 5-YR=90.12

const ASSET_CONFIG = {
  id:       "sboil",
  name:     "Soybean Oil (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Soybean Oil CBOT (ZL) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=50.81, 15-YR=96.17, 5-YR=90.12 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"BEAR — all TFs declining from year-start elevated levels",
    stars:3,
    note:"All TFs declining from year-start. 5-YR begins at ~70 and falls sharply. 15-YR at ~60 and declining. 40-YR at ~50 and declining to ~35. February will bring the 15-YR spike to 100 (unique) and the 5-YR trough. The year-start position reflects the explosive Dec recovery from prior year.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining from elevated year-start; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR falling from 70 to 50; 15-YR declining" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 40; February divergence loading" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; February spike for 15-YR imminent" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bull", sig40:"bull",
    combined:"chop", combinedLabel:"DIVERGENCE — 15-YR SPIKES TO 100; 5-YR at trough (~25); 40-YR rising",
    stars:3,
    note:"THE most unique February signal in the dataset: 15-YR spikes to 100 (the annual high for 15-YR!) while 5-YR crashes to ~25 (a near-trough). 40-YR rises to ~75. This extreme divergence between timeframes makes February non-tradeable as a combined signal. Watch the 15-YR as the exit signal for short-term traders.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bull", s40:"bull", com:"CHOP ★★", note:"15-YR surging toward 100; 5-YR crashing; extreme divergence" },
      { wk:"Wk 2", s5:"bear", s15:"bull", s40:"bull", com:"CHOP ★★", note:"15-YR at 100 (annual high); 5-YR at 25; avoid combined trades" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"CHOP ★★", note:"15-YR at peak; 5-YR basing; await convergence" },
      { wk:"Wk 4", s5:"bull", s15:"bear", s40:"bear", com:"CHOP ★★", note:"15-YR rolling from peak; 5-YR recovering; still divergent" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bear", sig40:"bull",
    combined:"chop", combinedLabel:"CHOP — 40-YR recovering; 15-YR declining from February peak; mixed",
    stars:2,
    note:"40-YR at ~65 and recovering. 15-YR declining from ~100 toward ~85. 5-YR recovering from ~25 to ~55. Still divergent. The 40-YR April peak is the primary long target. Not a clean month to trade.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bear", s40:"bull", com:"CHOP ★★", note:"40-YR rising; 15-YR declining from peak; mixed" },
      { wk:"Wk 2", s5:"bull", s15:"bear", s40:"bull", com:"CHOP ★★", note:"40-YR at 70; 15-YR at 88; 5-YR at 50" },
      { wk:"Wk 3", s5:"bull", s15:"bear", s40:"bull", com:"CHOP ★★", note:"40-YR approaching 80; April peak setup loading" },
      { wk:"Wk 4", s5:"bull", s15:"chop", s40:"bull", com:"LONG ★★★", note:"40-YR approaching 85; begin longs for April peak" },
    ]
  },
  {
    month:"April", sig5:"bear", sig15:"chop", sig40:"bull",
    combined:"chop", combinedLabel:"40-YR PEAK — 40-YR hits ~90; 15-YR declining; 5-YR diverging",
    stars:3,
    note:"40-YR peaks near ~85–90. 15-YR continues declining from February's peak toward ~75–80. 5-YR mixed around ~50. The 40-YR annual high occurs in April, but the TF divergence reduces conviction. Exit 40-YR longs by April Wk2.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bull", com:"LONG ★★★", note:"40-YR at 87; hold 40-YR longs; exit signal near" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"chop", com:"FLIP ★★★", note:"40-YR at ~90 peak; EXIT 40-YR LONGS; flip to short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR rolling from peak; all TFs declining" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short; summer bear loading; Sep-Oct trough target" },
    ]
  },
  {
    month:"May", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — all TFs declining; 40-YR from 90 to 60; 15-YR declining",
    stars:3,
    note:"Post-peak bear. 40-YR declining from ~90 to ~60. 15-YR from ~75 to ~65. 5-YR volatile around ~45–55. The vegetable oil supply cycle pressures prices post-crush season. Hold shorts into the September-October trough.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 80; declining from peak; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 70; all TFs declining" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 65; 15-YR at 68" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into June; summer bear in force" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — summer bear; 40-YR at ~50; 15-YR declining through 65",
    stars:3,
    note:"Summer bear continues. 40-YR at ~50. 15-YR at ~65. 5-YR at ~25–35. The mid-year is a steady bear for soybean oil as the H1 crush season demand fades. October trough is the target.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 55; summer bear intact" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 50; 15-YR declining" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR at 30; all TFs declining" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short; July-October trough loading" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — approaching October trough; 5-YR near 0",
    stars:3,
    note:"5-YR crashes toward near 0. 40-YR at ~50 then declining to ~25. 15-YR declining from ~65 to ~50. The summer glut in vegetable oil supply overwhelms demand. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR crashing toward 0; 40-YR at 50 declining" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 40; 15-YR at 58; trough approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR near 0; 40-YR at 30" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into August-October trough" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — near-trough; 5-YR near 0; October absolute low approaching",
    stars:3,
    note:"All three TFs approaching their annual low. 5-YR near 0. 40-YR at ~25. 15-YR at ~55 still declining. October will mark the absolute trough before the explosive Nov-Dec recovery to 96 and 90.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR at 5; near absolute low; tighten stops" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 25; near trough zone" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★", note:"Near trough; October reversal in sight" },
      { wk:"Wk 4", s5:"chop", s15:"bear", s40:"bear", com:"CHOP ★★", note:"Basing; October trough and explosive recovery loading" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — final approach to October trough; all TFs near 0",
    stars:2,
    note:"15-YR crashes sharply from ~55 to ~15 in September — a major acceleration. 5-YR near 0. 40-YR at ~25 then near 0. ALL THREE TFs converge at near-0 into October. This is the last short opportunity before the explosive year-end recovery.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★", note:"15-YR accelerating lower to 20; 40-YR near 20" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All TFs approaching 0; cover shorts" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Near-0 for all; basing; October reversal imminent" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"CHOP ★★★", note:"Recovery signals; scale into longs" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"NEAR-0 → EXPLOSIVE RECOVERY BEGINS; target 15-YR=96/5-YR=90 by Dec",
    stars:5,
    note:"ALL THREE TFs at near 0 simultaneously — the absolute annual trough. Then THE EXPLOSIVE RECOVERY begins. Target: 15-YR=96.17 and 5-YR=90.12 by December. This is one of the most powerful year-end recovery signals in the commodity complex — from near 0 to ~96 in 3 months for 15-YR.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Near-0 trough; BUY MAX; 15-YR target 96 by Dec" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Explosive recovery underway; add longs aggressively" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR surging from 0; 5-YR surging from 0; hold all" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs surging toward year-end 96/90/51 targets" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — explosive recovery; 15-YR to ~50; 5-YR to ~60; hold into Dec",
    stars:5,
    note:"Explosive recovery continues. 15-YR from ~10 to ~50. 5-YR from ~10 to ~60. 40-YR from ~10 to ~35. Hold maximum longs — the December year-end at 15-YR=96.17 and 5-YR=90.12 is the target. This is the highest-conviction long period in soybean oil.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 30; 5-YR at 40; explosive recovery; hold max" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 50; 5-YR at 55; December 96/90 targets in sight" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 30; all surging; hold max longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Hold into December; year-end 96/90/51 approaching" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END RECOVERY PEAK — 15-YR=96.17/5-YR=90.12/40-YR=50.81",
    stars:5,
    note:"Year-end explosive recovery completes at 15-YR=96.17 and 5-YR=90.12 — both near their annual highs at year-end. 40-YR=50.81 at mid-range. This is the MOST UNIQUE year-end configuration in the dataset: the near-term TFs (15-YR and 5-YR) end the year at near-annual-high levels after recovering from near-0 in October. 15-YR near-100 at year-end is the defining feature of soybean oil seasonality.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 75; 5-YR at 75; explosive; hold" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 88; 5-YR at 85; year-end peaks approaching" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 95; 5-YR at 89; reference zone" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Year-end; 15-YR=96.17/5-YR=90.12 — both near annual highs" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the soybean oil seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== SOYBEAN OIL CBOT — SEASONAL FRAMEWORK ===
Asset: Soybean Oil CBOT (ZL) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=50.81, 15-YR=96.17, 5-YR=90.12

YEARLY ARC:
Jan-Feb = declining from elevated year-start; UNIQUE: 15-YR spikes to 100 in February while 5-YR troughs.
Mar-Apr = 40-YR recovers to ~90 (40-YR annual high in April); mixed TF signals.
Apr-Sep = broad bear; all TFs declining toward October trough.
September = 15-YR crashes to ~15; all TFs near 0. October = near-0 for ALL THREE TFs.
Oct-Dec = EXPLOSIVE RECOVERY; 15-YR from 0 to 96.17; 5-YR from 0 to 90.12 by year-end.

=== PLAYBOOK SIGNALS ===
LONG #1: April Wk1 — 40-YR approaching 90 annual high; take 40-YR longs; tight exit at peak
EXIT #1: April Wk2 — 40-YR at ~90 peak; EXIT; 40-YR bear begins
SHORT #1: April Wk3 through September — broad bear as all TFs decline to October trough
LONG #2: October Wk1 — near-0 three-way trough; BUY AGGRESSIVELY; hold to Dec
TARGET: 15-YR=96.17/5-YR=90.12 by December 31 — highest TF year-end values in soy complex

KEY FEATURES:
• February 15-YR spike to 100 while 5-YR crashes: most extreme TF divergence in grains
• 40-YR annual high in April (~90) then long bear to October near-0
• Oct-Dec: 15-YR goes from 0 to 96.17 (+96 pts) — most extreme recovery in soy complex
• Year-end 15-YR=96.17 and 5-YR=90.12 — both near-annual-highs at year-end (unique)
• This is the ONLY grain asset where near-term TFs are at ~100 at the START of the new year

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 50.81 | • 15-YR: 96.17 | • 5-YR: 90.12
Annual high (40-YR): ~90 in April | Annual high (15-YR/5-YR): near 100 at year-end
Annual low: All three TFs near 0 in October
`;
