// data/cac.js — CAC 40 (MATIF) · 32-Year Seasonal (1988–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 32-YR=100 · 15-YR=98.72 · 5-YR=75.43

const ASSET_CONFIG = {
  id:       "cac",
  name:     "CAC 40 (MATIF)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 32-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · CAC 40 MATIF (FCE) · 32-Year Seasonal (1988–2019) · 15-Year · 5-Year overlays. Reference: 32-YR=100, 15-YR=98.72, 5-YR=75.43 at 02 Jan 2020.",
  ltLabel:  "32-YR",
  ltSigKey: "sig32",
  ltKey:    "s32",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig32:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH ZONE — all TFs near 0; year-start seasonal low",
    stars:5,
    note:"Annual trough — all TFs near 0 at year-start; accumulate for H1 bull and year-end annual high",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★★", note:"Year opens at trough — all TFs near 0"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★★", note:"January trough persists — no recovery signal yet"},
      {wk:"Wk 3", s5:"chop", s15:"bear", s32:"bear", com:"BEAR ★★★★",  note:"5-YR beginning to firm; LT TFs still depressed"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s32:"bear", com:"CHOP ★★★",   note:"Late January — approaching February recovery"},
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"chop", sig32:"bear",
    combined:"chop", combinedLabel:"RECOVERY BEGINS — 5-YR lifting; 32-YR still in trough",
    stars:3,
    note:"5-YR begins recovery; 32-YR lagging; base-building for French equity seasonal",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"chop", s32:"bear", com:"CHOP ★★★",  note:"5-YR early recovery; 32-YR still anchored near 0"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s32:"bear", com:"CHOP ★★★",  note:"15-YR joining; 32-YR lagging"},
      {wk:"Wk 3", s5:"bull",  s15:"bull", s32:"chop", com:"BULL ★★★★", note:"32-YR beginning to lift — recovery broadening"},
      {wk:"Wk 4", s5:"bull",  s15:"bull", s32:"chop", com:"BULL ★★★★", note:"Three TF recovery building momentum"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig32:"bull",
    combined:"bull", combinedLabel:"BULL — all TFs climbing; H1 French equity seasonal building",
    stars:4,
    note:"All TFs trending upward; March seasonal momentum for European equities; approaching April peak",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"March recovery — all TFs aligned bullish"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"Momentum intact across all three timeframes"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"Mid-March broad strength — H1 bull in motion"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"Pre-April-May peak loading — all TFs heading higher"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig32:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR near ~90; 32-YR at ~78-80; European spring peak zone",
    stars:4,
    note:"5-YR at ~90 approaching peak; 32-YR at ~78-80 near-annual-high zone; European spring seasonal peak",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"April opens — 5-YR at ~85, 32-YR at ~75"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"5-YR at ~90; 32-YR at ~78-80; peak zone reached"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"All TFs near peak — consider scaling positions"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s32:"bull", com:"BULL ★★★",  note:"Late April — 5-YR easing; 32-YR at near-annual-high"},
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"bull", sig32:"bull",
    combined:"bull", combinedLabel:"BULL — 32-YR near annual high (~80); 5-YR cooling from April peak",
    stars:3,
    note:"32-YR near annual high (~78-80); 5-YR easing; seasonal transition approaching June drop",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"bull", s32:"bull", com:"BULL ★★★",  note:"5-YR cooling; 32-YR near annual high zone"},
      {wk:"Wk 2", s5:"chop",  s15:"bull", s32:"bull", com:"BULL ★★★",  note:"Near-term TFs transitioning; LT TFs elevated"},
      {wk:"Wk 3", s5:"chop",  s15:"chop", s32:"bull", com:"CHOP ★★★",  note:"May seasonal softness — 32-YR holds; others soft"},
      {wk:"Wk 4", s5:"bear",  s15:"chop", s32:"chop", com:"CHOP ★★★",  note:"Late May — approach June drop with caution"},
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig32:"bear",
    combined:"bear", combinedLabel:"BEAR — SIGNIFICANT JUNE DROP; all TFs decline; European seasonal reversal",
    stars:4,
    note:"All TFs drop significantly in June; French equity seasonal reversal after April-May peak; 'Sell in May' effect materialises in June for CAC",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"June drop — all TFs declining from spring peak"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"Broad June seasonal weakness — significant CAC drop"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"Mid-June pressure — all TFs in downtrend"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"Late June — watch for July stabilisation"},
    ]
  },
  {
    month:"July", sig5:"chop", sig15:"chop", sig32:"chop",
    combined:"chop", combinedLabel:"CHOP — summer stabilisation; no clear TF direction",
    stars:2,
    note:"Post-June drop stabilisation; summer drift; no clear seasonal edge for CAC in July",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"Post-June stabilisation — summer drift begins"},
      {wk:"Wk 2", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"No seasonal edge — summer malaise"},
      {wk:"Wk 3", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"Mid-July neutral — no conviction signal"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"Late July — approaching August-September weakness"},
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"chop", sig32:"chop",
    combined:"chop", combinedLabel:"CHOP — summer soft patch continues; limited seasonal signal",
    stars:2,
    note:"Summer soft patch; all TFs in neutral territory; seasonal weakness typical but not extreme",
    weeks:[
      {wk:"Wk 1", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"Summer neutral — all TFs mixed"},
      {wk:"Wk 2", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"August soft patch — no clear seasonal direction"},
      {wk:"Wk 3", s5:"bear", s15:"chop", s32:"chop", com:"CHOP ★★",  note:"5-YR slight weakness — approaching September"},
      {wk:"Wk 4", s5:"bear", s15:"chop", s32:"chop", com:"CHOP ★★★", note:"Late August — September weakness approaching"},
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig32:"bear",
    combined:"bear", combinedLabel:"BEAR — SEASONAL WEAKNESS; all TFs declining; classic September trough",
    stars:4,
    note:"September seasonal weakness — all TFs declining; classic European equity September trough before Q4 rally",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"September weakness — all TFs in downtrend"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"Seasonal September trough — all TFs declining"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s32:"bear", com:"BEAR ★★★★", note:"September pressure deepens — patience required"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s32:"chop", com:"CHOP ★★★",  note:"Late September stabilising — Q4 rally loading"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig32:"bull",
    combined:"bull", combinedLabel:"BULL — Q4 rally ignites; all TFs turning up toward year-end annual high",
    stars:4,
    note:"Q4 rally begins after September trough; all TFs aligned upward; 32-YR heading toward December annual high (100)",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"October Q4 rally — all TFs turning up"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"October momentum — 32-YR climbing toward 100"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"All TFs aligned — high conviction Q4 long"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★", note:"Late October — November continuation toward 100"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig32:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging; 32-YR approaching 100 annual high",
    stars:5,
    note:"November power rally — all TFs surging; 32-YR approaching 100 annual high in December",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"November surge — 32-YR approaching 100"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"All TFs at high levels — top conviction long"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"Near-annual-highs across all TFs"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"Pre-December — 32-YR at ~95; 100 in sight"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig32:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 32-YR=100; PERFECT ANNUAL HIGH; 15-YR=98.72; 5-YR=75.43",
    stars:5,
    note:"Year-end: 32-YR=100 (PERFECT annual high) in December; 15-YR=98.72 near-perfect; CAC 32-YR annual high is in December — the year's culmination",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"December opens at annual highs — 32-YR at 100"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"32-YR=100 PERFECT ANNUAL HIGH — December peak!"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"15-YR=98.72; 32-YR=100 — year-end strength"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s32:"bull", com:"BULL ★★★★★", note:"Year closes: 32-YR=100, 15-YR=98.72, 5-YR=75.43"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the CAC 40 (MATIF) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: CAC 40 (MATIF) — FCE
Exchange: MATIF (Euronext Paris)
Long-term timeframe: 32-YR (1988–2019) | Reference: 32-YR=100, 15-YR=98.72, 5-YR=75.43

DEFINING CHARACTERISTICS:
- January: Annual trough — all TFs near 0
- April-May: 5-YR peaks near ~90; 32-YR at ~78-80 (near-annual-high zone)
- June: SIGNIFICANT DROP — all TFs decline (French seasonal reversal)
- September: Seasonal weakness — all TFs declining
- December: 32-YR=100 (PERFECT ANNUAL HIGH); 15-YR=98.72 (near-perfect)

YEARLY ARC:
- January: Annual trough — all TFs near 0; buy the year-start low
- Feb-Mar: All TFs recover in concert
- April: 5-YR near ~90; 32-YR at ~78-80 (near-annual-high zone for 32-YR)
- May: Near-term TFs ease; LT TFs near highs
- June: SIGNIFICANT DROP — all TFs decline (French/European seasonal reversal)
- Jul-Aug: Summer drift/soft patch
- September: All TFs decline — classic autumn weakness
- October: Q4 rally ignites — all TFs turning up
- Nov-Dec: 32-YR reaches 100 (annual high) in December

MONTHLY SIGNALS:
Jan: bear/bear/bear → ANNUAL TROUGH ★★★★★
Feb: bull/chop/bear → RECOVERY BEGINS ★★★
Mar: bull/bull/bull → ALL TFs CLIMBING ★★★★
Apr: bull/bull/bull → 5-YR ~90; 32-YR AT ~78-80 ★★★★
May: chop/bull/bull → NEAR-ANNUAL-HIGH ZONE ★★★
Jun: bear/bear/bear → SIGNIFICANT DROP ★★★★
Jul: chop/chop/chop → SUMMER DRIFT ★★
Aug: chop/chop/chop → SUMMER SOFT PATCH ★★
Sep: bear/bear/bear → SEASONAL WEAKNESS ★★★★
Oct: bull/bull/bull → Q4 RALLY ★★★★
Nov: bull/bull/bull → SURGING TOWARD 100 ★★★★★
Dec: bull/bull/bull → 32-YR=100 PERFECT ANNUAL HIGH ★★★★★

KEY TRADE SETUPS:
1. LONG early January (annual trough) → EXIT late April / early May (5-YR at ~90)
2. SHORT early June (seasonal reversal) → cover early July
3. LONG early October (Q4 rally) → target December 32-YR=100 annual high

NOTES:
- 32-YR=100 in December is a PERFECT annual high reading — the year ends at the statistical maximum
- June drop is significant — French equity seasonal 'Sell in May' materialises in June
- Summer drift July-August is moderate; September weakness more pronounced
`;
