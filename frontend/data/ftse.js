// data/ftse.js — FT-SE 100 (LIFFE) · 37-Year Seasonal (1983–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 37-YR=97.78 · 15-YR=100 · 5-YR=70.88

const ASSET_CONFIG = {
  id:       "ftse",
  name:     "FT-SE 100 (LIFFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 37-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · FT-SE 100 LIFFE (Z) · 37-Year Seasonal (1983–2019) · 15-Year · 5-Year overlays. Reference: 37-YR=97.78, 15-YR=100, 5-YR=70.88 at 02 Jan 2020.",
  ltLabel:  "37-YR",
  ltSigKey: "sig37",
  ltKey:    "s37",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"chop", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL — 37-YR and 15-YR elevated; 5-YR mixed after year-end highs",
    stars:3,
    note:"37-YR and 15-YR still elevated from year-end; 5-YR beginning February crash",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"bull", s37:"bull", com:"BULL ★★★★", note:"January opens strong — LT TFs still at highs"},
      {wk:"Wk 2", s5:"chop",  s15:"bull", s37:"bull", com:"BULL ★★★",  note:"5-YR beginning to soften; LT TFs hold"},
      {wk:"Wk 3", s5:"chop",  s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"Near-term TFs softening — February crash coming"},
      {wk:"Wk 4", s5:"bear",  s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"Late January — 5-YR declining ahead of February low"},
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig37:"bear",
    combined:"bear", combinedLabel:"5-YR CRASHES TO 0 — ANNUAL LOW; all TFs at trough; extreme reversal",
    stars:5,
    note:"5-YR crashes to 0 (annual low) in February; 37-YR also very depressed; most extreme February in UK index seasonal",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★★", note:"5-YR crashing toward 0 — February annual low"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★★", note:"All TFs at trough — 5-YR at or near 0"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★★", note:"Extreme annual low — deepest trough of the year"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★★★",   note:"Late February — bottoming; March-April surge loading"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL — explosive recovery from February low; all TFs surging",
    stars:5,
    note:"Explosive recovery after February 0-trough; all TFs surging toward April-May peak zone",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"March surge — all TFs recovering from February 0"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Explosive recovery momentum across all TFs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"High conviction March bull — all TFs aligned"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Pre-April peak — all TFs at high levels"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR PEAKS AT 100; peak zone for near-term TF",
    stars:5,
    note:"5-YR peaks at 100 in April-May (annual high for near-term TF); 37-YR also elevated; UK seasonal spring peak",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"5-YR at or near 100 — April UK spring seasonal peak"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"5-YR at 100; 37-YR at strong level; hold longs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★",  note:"All TFs near peak — begin taking profits"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s37:"bull", com:"BULL ★★★",   note:"Late April — 5-YR beginning to ease from peak"},
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR easing from peak; 37-YR and 15-YR still elevated",
    stars:3,
    note:"5-YR easing after April peak; 37-YR and 15-YR remain elevated; seasonal transition begins",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"bull", s37:"bull", com:"BULL ★★★",  note:"5-YR off peak; LT TFs still supportive"},
      {wk:"Wk 2", s5:"chop",  s15:"bull", s37:"bull", com:"BULL ★★★",  note:"Near-term TF softer; 37-YR holds above 60"},
      {wk:"Wk 3", s5:"chop",  s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"May seasonal softness setting in"},
      {wk:"Wk 4", s5:"bear",  s15:"chop", s37:"chop", com:"CHOP ★★★",  note:"Late May — all TFs softening; June drop approaching"},
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig37:"bear",
    combined:"bear", combinedLabel:"BEAR — significant June drop across all TFs; seasonal reversal",
    stars:4,
    note:"All TFs drop significantly in June after April-May peak; classic UK 'Sell in May' seasonal",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★", note:"June drop — all TFs declining from spring peak"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★", note:"Broad June seasonal weakness for FTSE"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★", note:"Mid-June pressure — all TFs in downtrend"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★★", note:"Late June — watch for early July 15-YR spike"},
    ]
  },
  {
    month:"July", sig5:"chop", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL — 15-YR SPIKES to ~90; 37-YR recovers; unique July surge",
    stars:4,
    note:"15-YR spikes to ~90 in early July — unique UK seasonal bounce after June drop; 37-YR also recovers strongly",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Early July 15-YR spike to ~90 — sharp seasonal bounce"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s37:"bull", com:"BULL ★★★★",  note:"15-YR at ~90; 37-YR recovering strongly from June"},
      {wk:"Wk 3", s5:"chop",  s15:"bull", s37:"bull", com:"BULL ★★★",   note:"5-YR easing; LT TFs holding elevated"},
      {wk:"Wk 4", s5:"chop",  s15:"chop", s37:"bull", com:"CHOP ★★★",   note:"Late July — consolidating after July spike"},
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"chop", sig37:"bull",
    combined:"chop", combinedLabel:"CHOP — summer consolidation; 37-YR steady but near-term soft",
    stars:3,
    note:"Summer consolidation after July spike; 37-YR holds above 60; near-term TFs mixed",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"Summer digestion — near-term TFs choppy"},
      {wk:"Wk 2", s5:"chop", s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"37-YR steady; 5-YR and 15-YR consolidating"},
      {wk:"Wk 3", s5:"chop", s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"Mid-August consolidation — no clear edge"},
      {wk:"Wk 4", s5:"bear", s15:"chop", s37:"bull", com:"CHOP ★★★",  note:"Late August — 5-YR softening; September ahead"},
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"chop", sig37:"bull",
    combined:"chop", combinedLabel:"CHOP — 5-YR DROPS to ~33; seasonal weakness; wait for year-end bull",
    stars:3,
    note:"5-YR pulls back to ~33; 37-YR holds above 50; typical September seasonal weakness for FTSE",
    weeks:[
      {wk:"Wk 1", s5:"bear",  s15:"chop",  s37:"bull", com:"CHOP ★★★",  note:"September weakness — 5-YR pulling back to ~33"},
      {wk:"Wk 2", s5:"bear",  s15:"chop",  s37:"bull", com:"CHOP ★★★",  note:"5-YR near ~33; 37-YR holds above 50"},
      {wk:"Wk 3", s5:"bear",  s15:"bear",  s37:"bull", com:"CHOP ★★★",  note:"15-YR also weakening — September trough forming"},
      {wk:"Wk 4", s5:"chop",  s15:"chop",  s37:"bull", com:"CHOP ★★★",  note:"Late September stabilising — Q4 rally approaching"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL — Q4 rally ignites; all TFs turning up toward annual highs",
    stars:4,
    note:"Q4 rally begins; all TFs turning upward; 37-YR heading toward year-end annual high",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★", note:"Q4 rally — all TFs turning up from September low"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★", note:"October momentum — 37-YR climbing toward highs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★", note:"All TFs aligned — high conviction Q4 long"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★", note:"Late October strength — November continuation"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging toward annual highs",
    stars:5,
    note:"November power rally — all TFs in high zone; 37-YR and 15-YR approaching annual highs",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"November surge — all TFs in high conviction zone"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Approaching annual highs — 37-YR near 90+"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"All TFs at near-annual-high levels — strong signal"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Pre-December — 37-YR and 15-YR approaching 100"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 37-YR=97.78, 15-YR=100; both LT TFs at annual highs; 5-YR=70.88",
    stars:5,
    note:"Year-end: 37-YR=97.78, 15-YR=100 (annual high) — both LT TFs at annual highs; 5-YR=70.88",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"December opens at or near annual highs"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"15-YR at 100; 37-YR at 97.78 — annual highs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Year-end strength — 37-YR and 15-YR at peaks"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★★★", note:"Year closes: 37-YR=97.78, 15-YR=100, 5-YR=70.88"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the FT-SE 100 (LIFFE) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: FT-SE 100 (LIFFE) — Z
Exchange: LIFFE (London)
Long-term timeframe: 37-YR (1983–2019) | Reference: 37-YR=97.78, 15-YR=100, 5-YR=70.88

DEFINING CHARACTERISTICS:
- February: 5-YR CRASHES to 0 (annual low) — most extreme February drop
- April-May: 5-YR peaks at 100 (annual high for near-term TF)
- June: significant drop across all TFs (UK 'Sell in May' seasonal)
- Early July: 15-YR SPIKES to ~90 (unique bounce after June drop)
- September: 5-YR drops to ~33 (seasonal weakness)
- December: 37-YR=97.78, 15-YR=100 (both at annual highs simultaneously)

YEARLY ARC:
- January: Still elevated from year-end; 5-YR beginning to soften
- February: ALL TFs crash to trough — 5-YR hits 0 (annual low)
- March: Explosive recovery — all TFs surge from February 0
- Apr-May: 5-YR peaks at 100; UK spring seasonal high
- June: All TFs drop significantly (UK seasonal reversal)
- Early July: 15-YR spikes to ~90 (sharp seasonal bounce)
- Aug-Sep: Summer/autumn consolidation; 5-YR to ~33 in September
- Oct-Nov: Q4 rally — all TFs climbing toward annual highs
- December: 37-YR=97.78, 15-YR=100 at annual highs

MONTHLY SIGNALS:
Jan: chop/bull/bull → ELEVATED FROM YEAR-END ★★★
Feb: bear/bear/bear → 5-YR CRASHES TO 0 ★★★★★
Mar: bull/bull/bull → EXPLOSIVE RECOVERY ★★★★★
Apr: bull/bull/bull → 5-YR AT 100 SPRING PEAK ★★★★★
May: chop/bull/bull → TRANSITIONING ★★★
Jun: bear/bear/bear → UK SEASONAL DROP ★★★★
Jul: chop/bull/bull → 15-YR SPIKES TO ~90 ★★★★
Aug: chop/chop/bull → SUMMER CONSOLIDATION ★★★
Sep: bear/chop/bull → 5-YR TO ~33 ★★★
Oct: bull/bull/bull → Q4 RALLY ★★★★
Nov: bull/bull/bull → ALL TFs AT HIGHS ★★★★★
Dec: bull/bull/bull → ANNUAL HIGH 97.78/100 ★★★★★

KEY TRADE SETUPS:
1. LONG early March (recovery from February 0) → EXIT April-May (5-YR at 100)
2. SHORT early June (UK seasonal drop) → cover early July (before 15-YR spike)
3. LONG early October (Q4 rally) → target year-end 37-YR=97.78, 15-YR=100

NOTES:
- February 5-YR crash to 0 is the most extreme in the international index complex
- Early July 15-YR spike to ~90 is unique — sharp bounce after June drop
- Year-end 15-YR=100 is a perfect annual high reading
`;
