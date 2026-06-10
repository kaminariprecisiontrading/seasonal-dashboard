// data/nq.js — Nasdaq 100 eMini (CME) · 24-Year Seasonal (1996–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 24-YR=100 · 15-YR=100 · 5-YR=94.45

const ASSET_CONFIG = {
  id:       "nq",
  name:     "Nasdaq 100 eMini (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 24-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Nasdaq 100 eMini CME (NQ) · 24-Year Seasonal (1996–2019) · 15-Year · 5-Year overlays. Reference: 24-YR=100, 15-YR=100, 5-YR=94.45 at 02 Jan 2020.",
  ltLabel:  "24-YR",
  ltSigKey: "sig24",
  ltKey:    "s24",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig24:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all TFs near 0; year-start seasonal low in tech",
    stars:5,
    note:"Annual trough zone — all TFs depressed; accumulate for year-long bull",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s24:"bear", com:"BEAR ★★★★★", note:"Year opens at trough — all TFs near 0"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s24:"bear", com:"BEAR ★★★★★", note:"Trough persists — no recovery signal yet"},
      {wk:"Wk 3", s5:"chop", s15:"bear", s24:"bear", com:"BEAR ★★★★", note:"5-YR begins to stir; 24-YR still depressed"},
      {wk:"Wk 4", s5:"chop", s15:"chop",  s24:"bear", com:"CHOP ★★★",  note:"Mixed signals — wait for February confirmation"},
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"chop", sig24:"bear",
    combined:"chop", combinedLabel:"DIVERGENCE — 5-YR lifts while 24-YR lags; tech TF split",
    stars:3,
    note:"5-YR recovering; 24-YR still in trough; widening timeframe divergence",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"chop", s24:"bear", com:"CHOP ★★★",  note:"5-YR early lift; 24-YR still lagging"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s24:"bear", com:"CHOP ★★★",  note:"15-YR joins bull; 24-YR anchors below"},
      {wk:"Wk 3", s5:"bull",  s15:"bull", s24:"chop", com:"BULL ★★★★", note:"24-YR begins to climb; momentum building"},
      {wk:"Wk 4", s5:"bull",  s15:"bull", s24:"chop", com:"BULL ★★★★", note:"3 TF recovery underway; February base forms"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL — all TFs climbing in concert; tech seasonals recovering",
    stars:4,
    note:"All TFs trending upward; March momentum builds on Feb recovery",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"All TFs aligned — early March continuation"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"Momentum intact across all timeframes"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"Mid-March strength — tech seasonals firm"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"Late March push toward Q2 peak zone"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR accelerating; 24-YR steady climb",
    stars:4,
    note:"Q2 strength continues; 5-YR surging faster than 24-YR — widening gap",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"April opens strong — all TFs aligned"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"5-YR pulling ahead of 24-YR — divergence widens"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"Near-term TFs more elevated than 24-YR"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"April ends well — 5-YR approaching ~55-60"},
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR near 70; 24-YR only ~28; widest TF gap in US index complex",
    stars:3,
    note:"Massive TF divergence: 5-YR at ~65-70 while 24-YR barely at ~28; NQ defies 'Sell in May'",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"chop", com:"BULL ★★★",  note:"5-YR at ~65; 24-YR only ~28 — widest gap developing"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"chop", com:"BULL ★★★",  note:"Near-term TFs very elevated vs 24-YR"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"chop", com:"BULL ★★★",  note:"5-YR pushing ~70 while 24-YR lags at ~28"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"chop", com:"BULL ★★★",  note:"May ends: extreme 5-YR/24-YR divergence peaks"},
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig24:"chop",
    combined:"bull", combinedLabel:"BULL — 5-YR ~65, 24-YR ~28; WIDEST TF GAP OF ANY US INDEX",
    stars:3,
    note:"5-YR near 65 while 24-YR at only ~28 — the widest gap in any US index; still net bullish short-term",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"bull", s24:"chop", com:"BULL ★★★",  note:"5-YR elevated; 24-YR still weak — divergence max"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s24:"chop", com:"BULL ★★★",  note:"Near-term strength masks 24-YR weakness"},
      {wk:"Wk 3", s5:"chop",  s15:"bull", s24:"chop", com:"CHOP ★★★",  note:"5-YR starts to ease from peak zone"},
      {wk:"Wk 4", s5:"chop",  s15:"chop", s24:"chop", com:"CHOP ★★★",  note:"Late June choppy — TFs begin to reconverge"},
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR near 80 (summer tech peak); 24-YR recovering",
    stars:4,
    note:"5-YR peaks near ~80 in July — highest summer reading in US index complex; 24-YR catching up",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"July opens strong — 5-YR at ~80 summer tech high"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"24-YR recovering from trough; convergence begins"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"All TFs trending up — July broad strength"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"July ends firm — setting up Q3 continuation"},
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL — 24-YR and 15-YR rising; 5-YR summer plateau",
    stars:3,
    note:"5-YR plateaus after July peak; 24-YR continues steady climb toward year-end convergence",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"bull", s24:"bull", com:"BULL ★★★",  note:"5-YR flattens; 24-YR and 15-YR still climbing"},
      {wk:"Wk 2", s5:"chop", s15:"bull", s24:"bull", com:"BULL ★★★",  note:"Net bullish with 24-YR leading the charge"},
      {wk:"Wk 3", s5:"chop", s15:"bull", s24:"bull", com:"BULL ★★★",  note:"Summer consolidation — LT momentum intact"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s24:"bull", com:"BULL ★★★",  note:"Late August — 24-YR rising toward convergence zone"},
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"chop", sig24:"bull",
    combined:"chop", combinedLabel:"CHOP — seasonal digestion; 24-YR the only solid bull signal",
    stars:3,
    note:"September pause; 5-YR and 15-YR digesting while 24-YR continues grinding higher",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s24:"bull", com:"CHOP ★★★",  note:"September digestion begins — near-term TFs soft"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s24:"bull", com:"CHOP ★★★",  note:"Seasonal weakness typical; 24-YR holds bullish"},
      {wk:"Wk 3", s5:"bear",  s15:"chop",  s24:"bull", com:"CHOP ★★★",  note:"5-YR slight dip; 24-YR diverges positively"},
      {wk:"Wk 4", s5:"chop",  s15:"chop",  s24:"bull", com:"CHOP ★★★",  note:"Late September stabilises ahead of Q4 surge"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL — Q4 tech rally ignites; all TFs turning up together",
    stars:4,
    note:"Q4 surge begins; 5-YR and 24-YR reconverging after months-long gap; October acceleration",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"Q4 tech rally begins — all TFs aligned"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"5-YR and 24-YR converging fast — October surge"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"Strong mid-October — TF convergence accelerating"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★", note:"October ends strong — momentum into November"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging toward annual highs",
    stars:5,
    note:"November power rally — all TFs approaching 100; highest-conviction month of the year",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"November blast-off — all TFs charging toward highs"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"All TFs near 90+ — unprecedented tech seasonal strength"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"Approaching annual highs — all TFs near 95-100"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"Pre-December extension — TFs at or near 100"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig24:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 24-YR=100, 15-YR=100, 5-YR=94.45; ALL THREE at annual high simultaneously",
    stars:5,
    note:"Year-end with 24-YR=100, 15-YR=100, 5-YR=94.45 — all three TFs at or near annual high simultaneously; strongest year-end in US index complex",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"December opens at or near annual highs — all TFs 95+"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"Year-end extension — Santa rally in tech"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"All TFs at annual high — 24-YR=100, 15-YR=100"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s24:"bull", com:"BULL ★★★★★", note:"Year closes at 5-YR=94.45 — strongest year-end in US index complex"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the Nasdaq 100 eMini (CME) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: Nasdaq 100 eMini (CME) — NQ
Exchange: CME
Long-term timeframe: 24-YR (1996–2019) | Reference: 24-YR=100, 15-YR=100, 5-YR=94.45

DEFINING CHARACTERISTIC: Massive TF divergence in H1 — 5-YR reaches ~80 by July while 24-YR lags near ~28 in May-June. This is the widest 5-YR vs LT gap of any US index. Both TFs converge to 100 at year-end.

YEARLY ARC:
- January: Annual trough — all TFs near 0; accumulation zone
- Feb-Mar: Recovery with widening TF divergence beginning
- Apr-July: 5-YR surges to ~80 (tech summer peak) while 24-YR barely reaches ~28-30 in May-June
- May-June: WIDEST TF GAP — 5-YR ~65-70, 24-YR only ~28 (unique to NASDAQ)
- August-Sep: 5-YR plateaus; 24-YR continues grinding higher; convergence begins
- October: Q4 tech rally ignites — all TFs turning up; convergence accelerates
- Nov-Dec: ALL TFs surge to annual highs — 24-YR=100, 15-YR=100, 5-YR=94.45 simultaneously

MONTHLY SIGNALS:
Jan: bear/bear/bear → ANNUAL TROUGH ★★★★★
Feb: bull/chop/bear → DIVERGENCE EMERGING ★★★
Mar: bull/bull/bull → ALL TFs CLIMBING ★★★★
Apr: bull/bull/bull → BULL ALL TFs ★★★★
May: bull/bull/chop → 5-YR SURGE, 24-YR LAGGING ★★★
Jun: bull/bull/chop → WIDEST TF GAP ★★★
Jul: bull/bull/bull → 5-YR SUMMER PEAK ~80 ★★★★
Aug: chop/bull/bull → 5-YR PLATEAU, 24-YR CLIMBING ★★★
Sep: chop/chop/bull → DIGESTION ★★★
Oct: bull/bull/bull → Q4 TECH RALLY ★★★★
Nov: bull/bull/bull → ALL TFs SURGING ★★★★★
Dec: bull/bull/bull → ALL TFs AT ANNUAL HIGH ★★★★★

KEY TRADE SETUPS:
1. LONG early January (annual trough) → hold through H1 tech rally
2. LONG early October (Q4 convergence signal) → target year-end 100
3. CAUTION May-June: 5-YR strong but 24-YR weak — divergence creates choppy conditions; prefer shorter-term longs

NOTES:
- NQ is the most divergent index in H1: 5-YR far outpaces 24-YR from May through July
- Unlike DJIA/SP500, the 'Sell in May' signal is NOT supported by 5-YR or 15-YR in NQ
- Year-end convergence to all-TF highs is the most reliable seasonal feature
`;
