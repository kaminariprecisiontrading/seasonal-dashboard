// data/md.js — S&P 400 MidCap eMini (CME) · 29-Year Seasonal (1991–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 29-YR=99.67 · 15-YR=99.65 · 5-YR=78.96

const ASSET_CONFIG = {
  id:       "md",
  name:     "S&P 400 MidCap eMini (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 29-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · S&P 400 MidCap eMini CME (MD) · 29-Year Seasonal (1991–2019) · 15-Year · 5-Year overlays. Reference: 29-YR=99.67, 15-YR=99.65, 5-YR=78.96 at 02 Jan 2020.",
  ltLabel:  "29-YR",
  ltSigKey: "sig29",
  ltKey:    "s29",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig29:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all TFs near 0; year-start seasonal low",
    stars:5,
    note:"Annual trough — all TFs near 0; accumulate for year-long bull seasonal",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Year opens at trough — all TFs depressed"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Trough persists — typical year-start weakness"},
      {wk:"Wk 3", s5:"chop", s15:"bear", s29:"bear", com:"BEAR ★★★★",  note:"5-YR begins to firm; LT still weak"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s29:"bear", com:"CHOP ★★★",   note:"Mixed signals — watch for February lift"},
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"chop", sig29:"bear",
    combined:"chop", combinedLabel:"RECOVERY BEGINS — 5-YR lifts; 29-YR still in trough",
    stars:3,
    note:"5-YR recovering; 29-YR lagging; gradual base-building phase",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"chop", s29:"bear", com:"CHOP ★★★",  note:"5-YR early recovery; 29-YR still anchored low"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s29:"bear", com:"CHOP ★★★",  note:"15-YR joins recovery; 29-YR lagging"},
      {wk:"Wk 3", s5:"bull",  s15:"bull", s29:"chop", com:"BULL ★★★★", note:"29-YR beginning to lift; recovery broadening"},
      {wk:"Wk 4", s5:"bull",  s15:"bull", s29:"chop", com:"BULL ★★★★", note:"Three TF recovery building momentum"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — all TFs climbing; Q1 recovery in full swing",
    stars:4,
    note:"All TFs trending upward together; March seasonal momentum typical for mid-caps",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"All TFs aligned — March recovery in motion"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Momentum intact across all three timeframes"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Mid-March broad strength continues"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late March push — setting up April continuation"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — spring rally continues; 29-YR and 15-YR climbing steadily",
    stars:4,
    note:"Spring rally intact; all TFs climbing toward mid-year peaks",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"April opens strong — all TFs aligned"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Broad-based mid-cap seasonal strength"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Momentum building toward May peak zone"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late April — 5-YR approaching ~75-80"},
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR PEAKS near 85; near-term seasonal high for mid-caps",
    stars:4,
    note:"5-YR peaks near ~85 in May — near-term seasonal high; 29-YR at ~50-55; all TFs still bullish",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"5-YR at ~80 approaching peak zone"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"5-YR peak zone ~85; 29-YR at ~50-55"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"May seasonal strength — all TFs supportive"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s29:"bull", com:"BULL ★★★",  note:"5-YR starting to ease after peak; 29-YR steady"},
    ]
  },
  {
    month:"June", sig5:"chop", sig15:"chop", sig29:"bull",
    combined:"chop", combinedLabel:"CHOP — 5-YR eases from May peak; 29-YR holds bullish",
    stars:3,
    note:"Near-term TFs soften after May peak; 29-YR continues steady grind higher",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"5-YR and 15-YR digesting May high; 29-YR holds"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"Seasonal consolidation — 29-YR the steady hand"},
      {wk:"Wk 3", s5:"chop",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"Mid-June mixed signals — watch 29-YR for direction"},
      {wk:"Wk 4", s5:"chop",  s15:"bull",  s29:"bull", com:"BULL ★★★",  note:"Late June stabilising ahead of H2"},
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — summer recovery; 5-YR re-lifts; all TFs climbing",
    stars:4,
    note:"Summer re-lift across all TFs; mid-caps follow broad equity seasonal recovery",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"July recovery — all TFs turning back up"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Summer momentum building in mid-caps"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"All TFs aligned — July broad strength"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late July strength — watch for August plateau"},
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — 29-YR and 15-YR steady; 5-YR plateaus",
    stars:3,
    note:"5-YR summer plateau; 29-YR and 15-YR continuing higher; net bullish but momentum slowing",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"bull", s29:"bull", com:"BULL ★★★",  note:"5-YR flattens; LT TFs carry the bullish case"},
      {wk:"Wk 2", s5:"chop", s15:"bull", s29:"bull", com:"BULL ★★★",  note:"Summer consolidation — 29-YR leading"},
      {wk:"Wk 3", s5:"chop", s15:"bull", s29:"bull", com:"BULL ★★★",  note:"29-YR and 15-YR holding bullish trend"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s29:"bull", com:"BULL ★★★",  note:"Late August — setting up September digestion"},
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"chop", sig29:"bull",
    combined:"chop", combinedLabel:"CHOP — 5-YR DIPS to ~33; seasonal weakness typical",
    stars:3,
    note:"September weakness: 5-YR pulls back to ~33; 29-YR holds above 50; wait for October signal",
    weeks:[
      {wk:"Wk 1", s5:"bear",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"September weakness begins — 5-YR pulling back"},
      {wk:"Wk 2", s5:"bear",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"5-YR near ~33; LT TF holds; watch for bounce"},
      {wk:"Wk 3", s5:"bear",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"Seasonal September trough — patience required"},
      {wk:"Wk 4", s5:"chop",  s15:"chop",  s29:"bull", com:"CHOP ★★★",  note:"Late September stabilising — Q4 rally approaching"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — Q4 rally ignites; all TFs re-aligning",
    stars:4,
    note:"Q4 surge begins; all TFs re-aligning upward; classic October seasonal turn for mid-caps",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Q4 rally — all TFs turning up in unison"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"October momentum building — conviction rising"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Mid-October all-TF alignment — high-conviction long"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late October strength — November continuation likely"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging; approaching annual highs",
    stars:5,
    note:"November power rally — all TFs in high zone; 29-YR and 15-YR approaching annual highs",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"November blast-off — all TFs in high conviction zone"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"Approaching annual highs — 29-YR near 90+"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"All TFs at near-annual-high levels"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"Pre-December extension — all TFs at highs"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 29-YR=99.67, 15-YR=99.65; year-end at near-perfect annual highs",
    stars:5,
    note:"Year-end with 29-YR=99.67, 15-YR=99.65 — both LT TFs at near-perfect annual highs; 5-YR=78.96",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"December opens at or near annual highs"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"Santa rally — all TFs in annual high zone"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"29-YR=99.67, 15-YR=99.65 — near-perfect annual highs"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"Year closes: 5-YR=78.96; 29-YR and 15-YR near perfect 100"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the S&P 400 MidCap eMini (CME) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: S&P 400 MidCap eMini (CME) — MD
Exchange: CME
Long-term timeframe: 29-YR (1991–2019) | Reference: 29-YR=99.67, 15-YR=99.65, 5-YR=78.96

YEARLY ARC:
- January: Annual trough — all TFs near 0; buy seasonal low
- Feb-Mar: All TFs recovering in concert
- Apr-May: 5-YR peaks near ~85 (near-term seasonal high); 29-YR at ~50-55
- June: Near-term TFs ease; 29-YR holds bullish
- July: Summer re-lift — all TFs climbing
- August: 5-YR plateaus; 29-YR leads higher
- September: 5-YR pulls back to ~33 (seasonal weakness); wait for October
- October: Q4 rally ignites — all TFs align upward
- Nov-Dec: 29-YR=99.67, 15-YR=99.65 — near-perfect annual highs at year-end

MONTHLY SIGNALS:
Jan: bear/bear/bear → ANNUAL TROUGH ★★★★★
Feb: bull/chop/bear → RECOVERY BEGINS ★★★
Mar: bull/bull/bull → ALL TFs CLIMBING ★★★★
Apr: bull/bull/bull → SPRING RALLY ★★★★
May: bull/bull/bull → 5-YR PEAKS ~85 ★★★★
Jun: chop/chop/bull → DIGESTION ★★★
Jul: bull/bull/bull → SUMMER RE-LIFT ★★★★
Aug: chop/bull/bull → 5-YR PLATEAU ★★★
Sep: bear/chop/bull → 5-YR WEAKNESS TO ~33 ★★★
Oct: bull/bull/bull → Q4 RALLY ★★★★
Nov: bull/bull/bull → ALL TFs AT HIGHS ★★★★★
Dec: bull/bull/bull → ANNUAL HIGH ★★★★★

KEY TRADE SETUPS:
1. LONG early January (annual trough) → hold through May 5-YR peak
2. LONG early October (Q4 signal) → target year-end near-perfect highs
3. CAUTION September: 5-YR dips to ~33 — wait for October confirmation before re-entry

NOTES:
- MidCap pattern closely mirrors SP500/ES but with slightly lower 5-YR year-end (78.96 vs 90.71)
- September weakness is pronounced for 5-YR but 29-YR remains supportive
- Year-end 29-YR=99.67 / 15-YR=99.65 are essentially perfect 100 readings
`;
