// data/dax.js — DAX (EUREX) · 30-Year Seasonal (1990–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 30-YR=98.48 · 15-YR=98.2 · 5-YR=82.41

const ASSET_CONFIG = {
  id:       "dax",
  name:     "DAX (EUREX)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 30-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · DAX EUREX (FDAX) · 30-Year Seasonal (1990–2019) · 15-Year · 5-Year overlays. Reference: 30-YR=98.48, 15-YR=98.2, 5-YR=82.41 at 02 Jan 2020.",
  ltLabel:  "30-YR",
  ltSigKey: "sig30",
  ltKey:    "s30",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig30:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH ZONE — 30-YR and 15-YR near 0; year-start seasonal low",
    stars:5,
    note:"30-YR and 15-YR near 0 at year-start — annual trough zone; accumulate for April-May surge",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★★★★", note:"Year opens at trough — 30-YR and 15-YR near 0"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★★★★", note:"January trough persists — all TFs depressed"},
      {wk:"Wk 3", s5:"chop", s15:"bear", s30:"bear", com:"BEAR ★★★★",  note:"5-YR beginning to firm; LT TFs still near 0"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s30:"bear", com:"CHOP ★★★",   note:"Late January — approaching February recovery"},
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"chop", sig30:"bear",
    combined:"chop", combinedLabel:"RECOVERY BEGINS — 5-YR lifting; 30-YR still in trough",
    stars:3,
    note:"5-YR begins recovery; 30-YR lagging near 0; base-building phase for German equity seasonal",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"chop", s30:"bear", com:"CHOP ★★★",  note:"5-YR early recovery; 30-YR still anchored near 0"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s30:"bear", com:"CHOP ★★★",  note:"15-YR joining recovery; 30-YR lagging"},
      {wk:"Wk 3", s5:"bull",  s15:"bull", s30:"chop", com:"BULL ★★★★", note:"30-YR beginning to lift — recovery broadening"},
      {wk:"Wk 4", s5:"bull",  s15:"bull", s30:"chop", com:"BULL ★★★★", note:"Three TF recovery building — March continuation ahead"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"BULL — all TFs climbing; H1 DAX seasonal recovery in full swing",
    stars:4,
    note:"All TFs trending upward; March seasonal momentum typical for European equities",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★", note:"March recovery — all TFs aligned bullish"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★", note:"Momentum intact — all TFs climbing"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★", note:"Mid-March broad strength for DAX"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★", note:"Pre-April peak loading — all TFs heading higher"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR SPIKES TO 95-100 (ANNUAL HIGH!); European spring peak",
    stars:5,
    note:"5-YR spikes to 95-100 in April — annual high for near-term TF; 30-YR climbing strongly; European spring seasonal peak",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"5-YR at ~95-100 — April annual high for DAX 5-YR"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"Peak zone — 5-YR at annual high; 30-YR strong"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★",  note:"All TFs at high levels — begin scaling profits"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s30:"bull", com:"BULL ★★★",   note:"Late April — 5-YR easing from peak; transition approaching"},
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"chop", sig30:"bull",
    combined:"chop", combinedLabel:"CHOP — post-April digestion; 30-YR steady; near-term TFs cooling",
    stars:3,
    note:"Post-April peak digestion; 30-YR remains supportive; 5-YR and 15-YR cooling from peak",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s30:"bull", com:"CHOP ★★★",  note:"April peak digestion — 30-YR holds; near-term soft"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s30:"bull", com:"CHOP ★★★",  note:"European 'Sell in May' setting in for near-term TFs"},
      {wk:"Wk 3", s5:"chop",  s15:"chop",  s30:"bull", com:"CHOP ★★★",  note:"30-YR steady; near-term TFs mixed signals"},
      {wk:"Wk 4", s5:"bear",  s15:"chop",  s30:"chop", com:"CHOP ★★★",  note:"Late May — softening ahead of summer period"},
    ]
  },
  {
    month:"June", sig5:"chop", sig15:"chop", sig30:"chop",
    combined:"chop", combinedLabel:"CHOP — 5-YR soft; summer seasonal mixed signals for DAX",
    stars:3,
    note:"European summer seasonal mixed; no clear TF alignment; wait for August-September pattern",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s30:"chop", com:"CHOP ★★★",  note:"June mixed signals — no strong seasonal edge"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s30:"chop", com:"CHOP ★★★",  note:"Summer malaise — all TFs choppy"},
      {wk:"Wk 3", s5:"chop",  s15:"chop",  s30:"chop", com:"CHOP ★★★",  note:"Mid-June indecision — watch for August trough"},
      {wk:"Wk 4", s5:"chop",  s15:"chop",  s30:"chop", com:"CHOP ★★★",  note:"Late June — summer drift; no seasonal conviction"},
    ]
  },
  {
    month:"July", sig5:"chop", sig15:"chop", sig30:"chop",
    combined:"chop", combinedLabel:"CHOP — European summer soft patch; no TF alignment",
    stars:2,
    note:"European summer soft patch; all TFs in neutral territory; approaching Aug-Sep weakness",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★",  note:"Summer drift — all TFs neutral; no seasonal edge"},
      {wk:"Wk 2", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★",  note:"July indecision — no strong seasonal signal"},
      {wk:"Wk 3", s5:"chop", s15:"chop", s30:"chop", com:"CHOP ★★",  note:"Mid-July neutral — watch for August weakness"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s30:"bear", com:"CHOP ★★",  note:"Late July — 30-YR beginning to soften into Aug-Sep"},
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig30:"bear",
    combined:"bear", combinedLabel:"BEAR — 30-YR drops to ~33-35; NOTABLE WEAKNESS for DAX",
    stars:4,
    note:"30-YR drops to ~33-35 in August — notable seasonal weakness for DAX; all TFs declining from April-May highs",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★★★", note:"August weakness — 30-YR dropping toward ~33-35"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★★★", note:"All TFs declining — notable DAX seasonal trough"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★★★", note:"30-YR at ~33-35 trough — deepest reading since Jan"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s30:"bear", com:"BEAR ★★★★", note:"Late August — approaching September stabilisation"},
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"chop", sig30:"bear",
    combined:"bear", combinedLabel:"BEAR — continued weakness; 30-YR at ~33-35; wait for October",
    stars:4,
    note:"September continued weakness; 30-YR holding at trough (~33-35); accumulate for October Q4 surge",
    weeks:[
      {wk:"Wk 1", s5:"bear",  s15:"chop",  s30:"bear", com:"BEAR ★★★★", note:"September weakness continues — 30-YR at trough"},
      {wk:"Wk 2", s5:"bear",  s15:"chop",  s30:"bear", com:"BEAR ★★★",  note:"5-YR and 30-YR weak; 15-YR mixed"},
      {wk:"Wk 3", s5:"chop",  s15:"chop",  s30:"chop", com:"CHOP ★★★",  note:"Late September stabilising — Q4 rally approaching"},
      {wk:"Wk 4", s5:"bull",  s15:"bull",  s30:"bull", com:"BULL ★★★★", note:"October signal fires — all TFs turning up"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — Q4 EXPLOSIVE RALLY; all TFs surge from Aug-Sep trough",
    stars:5,
    note:"Q4 explosive rally from August-September trough; all TFs surging; most powerful Q4 recovery in European index complex",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"October blast-off — all TFs surging from trough"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"Explosive Q4 rally — 30-YR surging from ~33 to 70+"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"All TFs in high conviction uptrend — hold longs"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"Late October — momentum into November; 30-YR at ~80"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging toward annual highs",
    stars:5,
    note:"November power rally — all TFs approaching annual highs; 30-YR climbing toward 98 territory",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"November surge — all TFs approaching annual highs"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"30-YR at 90+ approaching 98 year-end target"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"All TFs at near-annual-high levels — top conviction"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"Pre-December — 30-YR and 15-YR near annual highs"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig30:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 30-YR=98.48, 15-YR=98.2, 5-YR=82.41; all TFs at near-perfect annual highs",
    stars:5,
    note:"Year-end: 30-YR=98.48, 15-YR=98.2 — both LT TFs at near-perfect annual highs after Aug-Sep 33-35 trough recovery",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"December opens at or near annual highs"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"30-YR at 98.48; 15-YR at 98.2 — near-perfect highs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"Year-end strength — all TFs at annual highs"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s30:"bull", com:"BULL ★★★★★", note:"Year closes: 30-YR=98.48, 15-YR=98.2, 5-YR=82.41"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the DAX (EUREX) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: DAX (EUREX) — FDAX
Exchange: EUREX (Germany)
Long-term timeframe: 30-YR (1990–2019) | Reference: 30-YR=98.48, 15-YR=98.2, 5-YR=82.41

DEFINING CHARACTERISTICS:
- January: 30-YR and 15-YR near 0 (annual trough zone)
- April: 5-YR SPIKES to 95-100 (ANNUAL HIGH for near-term TF)
- Aug-Sep: 30-YR drops to ~33-35 (NOTABLE WEAKNESS — unique to DAX vs other European indices)
- October: EXPLOSIVE Q4 RALLY — 30-YR surges from ~33 to 70+ in one month
- December: 30-YR=98.48, 15-YR=98.2 (near-perfect annual highs)

YEARLY ARC:
- Jan-Feb: Annual trough — 30-YR and 15-YR near 0
- March: All TFs recovering; H1 seasonal momentum building
- April: 5-YR peaks at 95-100 (annual high); European spring peak
- May-Jul: Post-peak digestion; summer soft patch
- Aug-Sep: 30-YR drops to ~33-35 (notable seasonal weakness)
- October: EXPLOSIVE Q4 RALLY from trough — strongest monthly recovery
- Nov-Dec: 30-YR=98.48, 15-YR=98.2 — near-perfect annual highs

MONTHLY SIGNALS:
Jan: bear/bear/bear → ANNUAL TROUGH ★★★★★
Feb: bull/chop/bear → RECOVERY BEGINS ★★★
Mar: bull/bull/bull → ALL TFs CLIMBING ★★★★
Apr: bull/bull/bull → 5-YR AT 95-100 ANNUAL HIGH ★★★★★
May: chop/chop/bull → POST-PEAK DIGESTION ★★★
Jun: chop/chop/chop → SUMMER DRIFT ★★
Jul: chop/chop/chop → SUMMER SOFT PATCH ★★
Aug: bear/bear/bear → 30-YR DROPS TO ~33-35 ★★★★
Sep: bear/chop/bear → CONTINUED WEAKNESS ★★★★
Oct: bull/bull/bull → EXPLOSIVE Q4 RALLY ★★★★★
Nov: bull/bull/bull → ALL TFs AT HIGHS ★★★★★
Dec: bull/bull/bull → ANNUAL HIGH 98.48/98.2 ★★★★★

KEY TRADE SETUPS:
1. LONG early January (annual trough) → EXIT April (5-YR at 95-100)
2. SHORT August (30-YR dropping to ~33-35) → cover late September
3. LONG early October (explosive Q4 rally from trough) → target year-end 30-YR=98.48

NOTES:
- August-September weakness is the most pronounced of any European index in this dashboard
- October Q4 recovery is the most explosive monthly move in the DAX seasonal pattern
- Year-end 30-YR=98.48 and 15-YR=98.2 are essentially perfect 100 readings
`;
