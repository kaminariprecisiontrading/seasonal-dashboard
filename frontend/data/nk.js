// data/nk.js — Nikkei 225 (SIMEX) · 34-Year Seasonal (1986–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 34-YR=88.32 · 15-YR=95.85 · 5-YR=77.73

const ASSET_CONFIG = {
  id:       "nk",
  name:     "Nikkei 225 (SIMEX)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Nikkei 225 SIMEX (NK) · 34-Year Seasonal (1986–2019) · 15-Year · 5-Year overlays. Reference: 34-YR=88.32, 15-YR=95.85, 5-YR=77.73 at 02 Jan 2020.",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#dc2626",
};

const MONTHS = [
  {
    month:"January", sig5:"chop", sig15:"chop", sig34:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH ZONE — 34-YR starts ~15; depressed; Japan FY positioning",
    stars:4,
    note:"34-YR starts at ~15 — annual trough zone; Japan fiscal year end (April 1) drives H1 upswing ahead",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"chop", s34:"bear", com:"BEAR ★★★★", note:"34-YR at ~15 — annual trough; watch for March-April surge"},
      {wk:"Wk 2", s5:"chop", s15:"chop", s34:"bear", com:"BEAR ★★★★", note:"Trough persists — Japan FY end effect loading"},
      {wk:"Wk 3", s5:"chop", s15:"chop", s34:"bear", com:"BEAR ★★★",  note:"5-YR and 15-YR also subdued; broad weakness"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s34:"bear", com:"BEAR ★★★",  note:"Late January — trough zone; accumulate for FY end surge"},
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"ANNUAL LOW — 34-YR drops to NEAR 0; most depressed month of the year",
    stars:5,
    note:"34-YR drops to near 0 in February — annual trough; 5-YR and 15-YR also near-0; extreme annual low before Japan FY end surge",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"34-YR crashes to near-0 — annual trough for Nikkei"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"All TFs near-0 — deepest trough of the year"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"Extreme annual low — position for March surge"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",   note:"Late February — bottoming signals; Japan FY end loading"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL — 34-YR SURGES to ~65; Japan fiscal year end effect firing",
    stars:5,
    note:"34-YR surges from near-0 to ~65 in March — Japan FY end effect (April 1); one of the sharpest monthly moves in the dashboard",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"March surge begins — Japan FY end effect fires"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"34-YR surging from near-0 toward ~65"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Powerful FY-end seasonal — all TFs strongly aligned"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Pre-April FY end peak — 34-YR approaching ~65"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL — 34-YR HITS 100 = ANNUAL HIGH; Japan FY end (April 1) peak",
    stars:5,
    note:"34-YR reaches 100 in April = ANNUAL HIGH; Japan fiscal year end April 1 drives peak; both 5-YR and 15-YR also elevated",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"34-YR at 100 ANNUAL HIGH — Japan FY end peak!"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Post-FY peak; still elevated — hold into May"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★",  note:"34-YR beginning to ease from 100; profits available"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s34:"chop", com:"BULL ★★★",   note:"Late April — 34-YR past peak; 5-YR softening"},
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"chop", sig34:"bull",
    combined:"chop", combinedLabel:"CHOP — post-FY digestion; 34-YR at ~75-80 but declining from peak",
    stars:3,
    note:"Post-FY end digestion; 34-YR declining from 100 to ~75-80; near-term TFs mixed",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop", s34:"bull", com:"CHOP ★★★",  note:"Post-April FY peak digestion — 34-YR declining"},
      {wk:"Wk 2", s5:"chop",  s15:"chop", s34:"bull", com:"CHOP ★★★",  note:"34-YR at ~80; near-term TFs mixed"},
      {wk:"Wk 3", s5:"chop",  s15:"chop", s34:"chop", com:"CHOP ★★★",  note:"May malaise — all TFs digesting FY peak"},
      {wk:"Wk 4", s5:"chop",  s15:"chop", s34:"chop", com:"CHOP ★★★",  note:"Late May — consolidation ahead of summer softness"},
    ]
  },
  {
    month:"June", sig5:"chop", sig15:"chop", sig34:"bull",
    combined:"chop", combinedLabel:"CHOP — seasonal softness; 34-YR declining toward ~70-75",
    stars:3,
    note:"Seasonal softness; 34-YR declining from April peak; near-term TFs choppy",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"Post-peak softness — 34-YR still above 70"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s34:"chop", com:"CHOP ★★★",  note:"Summer malaise setting in for Nikkei"},
      {wk:"Wk 3", s5:"bear",  s15:"chop",  s34:"chop", com:"CHOP ★★★",  note:"5-YR weakening — mixed signals"},
      {wk:"Wk 4", s5:"chop",  s15:"chop",  s34:"chop", com:"CHOP ★★★",  note:"Late June — waiting for September trough signal"},
    ]
  },
  {
    month:"July", sig5:"chop", sig15:"chop", sig34:"bull",
    combined:"chop", combinedLabel:"CHOP — 34-YR still above 70 but declining; summer seasonal softness",
    stars:3,
    note:"34-YR at ~70-75 but declining; summer softness across all TFs; wait for September pattern",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"chop", s34:"bull", com:"CHOP ★★★",  note:"Summer softness — 34-YR declining from April high"},
      {wk:"Wk 2", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",  note:"No clear seasonal edge — mid-summer indecision"},
      {wk:"Wk 3", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",  note:"Near-term TFs mixed; 34-YR near 70"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",  note:"Late July — watch for August-September trough"},
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"bear", sig34:"chop",
    combined:"chop", combinedLabel:"CHOP/BEAR — seasonal softness deepening; 15-YR declining",
    stars:3,
    note:"15-YR declining; 34-YR softening; approaching September secondary trough",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"bear", s34:"chop", com:"CHOP ★★★",  note:"15-YR declining — August seasonal softness"},
      {wk:"Wk 2", s5:"chop",  s15:"bear", s34:"chop", com:"CHOP ★★★",  note:"34-YR softening toward secondary trough"},
      {wk:"Wk 3", s5:"bear",  s15:"bear", s34:"chop", com:"BEAR ★★★",  note:"Nearing September trough — reduce longs"},
      {wk:"Wk 4", s5:"bear",  s15:"bear", s34:"bear", com:"BEAR ★★★",  note:"Late August — approaching September secondary low"},
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"SECONDARY TROUGH — 34-YR CRASHES to ~15-20; most extreme September in index complex",
    stars:5,
    note:"34-YR drops to ~15-20 in September — SECONDARY TROUGH; 15-YR also very low; most extreme September drop in index seasonal complex",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"34-YR crashes to ~15-20 — secondary trough zone"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"Most extreme September drop in index complex"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"15-YR also very low — broad seasonal weakness"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",   note:"Late September — bottoming; November surge approaching"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL — recovery from September trough; all TFs turning up",
    stars:4,
    note:"Recovery from September secondary trough; 34-YR recovering; all TFs turning up",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★", note:"October recovery — all TFs turning up from trough"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★", note:"Recovery momentum building — 34-YR climbing"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★", note:"Broad seasonal recovery from September low"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★", note:"Late October — setting up November surge"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — 15-YR SPIKES to ~90; strong surge from September trough",
    stars:5,
    note:"15-YR spikes to ~90 in November — strong seasonal surge from September trough; 34-YR also climbing strongly",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"November surge — 15-YR spiking toward ~90"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"15-YR at ~90; 34-YR approaching year-end highs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"All TFs strongly bullish — November power move"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Pre-December — all TFs heading toward year-end highs"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"YEAR-END — 34-YR=88.32, 15-YR=95.85, 5-YR=77.73; all TFs at strong year-end highs",
    stars:5,
    note:"Year-end: 34-YR=88.32, 15-YR=95.85, 5-YR=77.73 — all three TFs at strong year-end levels after September trough recovery",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"December opens strong — year-end rally in Nikkei"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"15-YR at 95.85 approaching year-end; 34-YR at 88.32"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Year-end strength — all TFs at elevated levels"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Year closes: 34-YR=88.32, 15-YR=95.85, 5-YR=77.73"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the Nikkei 225 (SIMEX) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: Nikkei 225 (SIMEX) — NK
Exchange: SIMEX (Singapore)
Long-term timeframe: 34-YR (1986–2019) | Reference: 34-YR=88.32, 15-YR=95.85, 5-YR=77.73

DEFINING CHARACTERISTIC: Japan Fiscal Year End (April 1) drives the dominant seasonal pattern.
- February: ALL TFs at near-0 ANNUAL TROUGH (most depressed month)
- March: 34-YR SURGES from near-0 to ~65 (Japan FY end effect)
- April: 34-YR HITS 100 = ANNUAL HIGH (Japan FY end peak)
- September: SECONDARY TROUGH — 34-YR crashes to ~15-20 (most extreme Sept drop in index complex)
- November: 15-YR SPIKES to ~90 (recovery surge)
- December: year-end 34-YR=88.32, 15-YR=95.85, 5-YR=77.73

YEARLY ARC:
- Jan/Feb: Annual trough zone — 34-YR near 0 in February
- March: 34-YR surges from 0 to ~65 (Japan FY end effect firing)
- April: 34-YR hits 100 = ANNUAL HIGH (Japan FY end April 1 peak)
- May-Aug: Gradual decline from April peak; summer softness
- September: SECONDARY TROUGH — 34-YR crashes to ~15-20
- Oct-Nov: Strong recovery; 15-YR spikes to ~90 in November
- December: Year-end 34-YR=88.32, 15-YR=95.85, 5-YR=77.73

MONTHLY SIGNALS:
Jan: chop/chop/bear → ANNUAL TROUGH ZONE ★★★★
Feb: bear/bear/bear → ANNUAL LOW ALL TFs ★★★★★
Mar: bull/bull/bull → 34-YR SURGES TO ~65 ★★★★★
Apr: bull/bull/bull → 34-YR AT 100 ANNUAL HIGH ★★★★★
May: chop/chop/bull → POST-FY DIGESTION ★★★
Jun: chop/chop/bull → SUMMER SOFTNESS ★★★
Jul: chop/chop/bull → SUMMER SOFTNESS CONTINUES ★★★
Aug: chop/bear/chop → APPROACHING TROUGH ★★★
Sep: bear/bear/bear → SECONDARY TROUGH ~15-20 ★★★★★
Oct: bull/bull/bull → RECOVERY ★★★★
Nov: bull/bull/bull → 15-YR SPIKES TO ~90 ★★★★★
Dec: bull/bull/bull → YEAR-END 88.32/95.85/77.73 ★★★★★

KEY TRADE SETUPS:
1. LONG early March (Japan FY end effect) → EXIT April (34-YR at 100 annual high)
2. LONG early October (recovery from September trough) → hold through November surge
3. SHORT late August → cover late September (secondary trough play)

NOTES:
- Japan fiscal year end (April 1) is the most powerful seasonal driver
- September secondary trough at ~15-20 on 34-YR is the most extreme in the index complex
- February annual low is the accumulation opportunity for the FY-end surge
`;
