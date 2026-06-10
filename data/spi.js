// data/spi.js — SPI 200 (SFE) · 21-Year Seasonal (1999–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 21-YR=97.41 · 15-YR=96.08 · 5-YR=81.71

const ASSET_CONFIG = {
  id:       "spi",
  name:     "SPI 200 (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 21-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · S&P/ASX 200 SFE (AP) · 21-Year Seasonal (1999–2019) · 15-Year · 5-Year overlays. Reference: 21-YR=97.41, 15-YR=96.08, 5-YR=81.71 at 02 Jan 2020.",
  ltLabel:  "21-YR",
  ltSigKey: "sig21",
  ltKey:    "s21",
  ltAccent: "#16a34a",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig21:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all TFs near 0; Australian summer seasonal low",
    stars:5,
    note:"Annual trough — all TFs near 0; Australian summer/financial year positioning",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s21:"bear", com:"BEAR ★★★★★", note:"Year opens at trough — all TFs near 0"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s21:"bear", com:"BEAR ★★★★★", note:"January trough persists — accumulate for H1 surge"},
      {wk:"Wk 3", s5:"chop", s15:"bear", s21:"bear", com:"BEAR ★★★★",  note:"5-YR starting to firm; LT TFs still depressed"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s21:"bear", com:"CHOP ★★★",   note:"Late January — approaching February recovery"},
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL — recovery begins; all TFs climbing; Australian FY season",
    stars:4,
    note:"All TFs recovering in concert; Australian financial year end (June 30) begins driving H1 seasonal",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"February recovery — all TFs lifting from January trough"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"H1 momentum building — AUS FY effect loading"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"All TFs aligned — February recovery in full swing"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Late February — momentum building toward April peak"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL — all TFs climbing; H1 seasonal strength continues",
    stars:4,
    note:"H1 seasonal strength building; all TFs trending upward toward April-May Australian FY peak",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"March continuation — all TFs bullish"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Strong seasonal momentum — all TFs aligned"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Mid-March strength — approaching April peak zone"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Pre-April peak — all TFs at high levels"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR SPIKES TO ~100; Australian FY pre-close positioning",
    stars:5,
    note:"5-YR spikes to near ~100 in April — Australian FY pre-close positioning (June 30 AUS FY end); 15-YR at ~80; near-term annual high",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"5-YR spiking toward 100 — AUS FY pre-close"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"5-YR at ~100; 15-YR at ~80; peak zone reached"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★",  note:"All TFs at highs — consider profit-taking"},
      {wk:"Wk 4", s5:"chop", s15:"bull", s21:"bull", com:"BULL ★★★",   note:"Late April — 5-YR beginning to ease from peak"},
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL — 15-YR at ~80; 21-YR steady; 5-YR easing from April peak",
    stars:3,
    note:"5-YR easing from April peak; 15-YR and 21-YR remain supportive; seasonal transition approaching",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"bull", s21:"bull", com:"BULL ★★★",  note:"5-YR off peak; 15-YR and 21-YR still supportive"},
      {wk:"Wk 2", s5:"chop",  s15:"bull", s21:"bull", com:"BULL ★★★",  note:"Seasonal transition — LT TFs remain elevated"},
      {wk:"Wk 3", s5:"chop",  s15:"chop", s21:"bull", com:"CHOP ★★★",  note:"May softness setting in; 21-YR holds bullish"},
      {wk:"Wk 4", s5:"bear",  s15:"chop", s21:"chop", com:"CHOP ★★★",  note:"Late May — near-term TFs softening; June drop ahead"},
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig21:"bear",
    combined:"bear", combinedLabel:"BEAR — AUS FY end June 30 creates June seasonal DROP; all TFs decline",
    stars:4,
    note:"All TFs drop in June; Australian FY end June 30 causes rebalancing/selling pressure; seasonal drop typical",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s21:"bear", com:"BEAR ★★★★", note:"June drop — AUS FY end selling pressure begins"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s21:"bear", com:"BEAR ★★★★", note:"All TFs declining — FY end rebalancing in play"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s21:"bear", com:"BEAR ★★★★", note:"June pressure deepening — all TFs in downtrend"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s21:"bear", com:"BEAR ★★★★", note:"Late June — AUS FY end trough; watch for July recovery"},
    ]
  },
  {
    month:"July", sig5:"chop", sig15:"chop", sig21:"bull",
    combined:"chop", combinedLabel:"CHOP — post-FY stabilisation; 21-YR holds; near-term TFs recovering",
    stars:3,
    note:"Post-FY end stabilisation; 21-YR resilient; near-term TFs beginning to recover after June drop",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s21:"bull", com:"CHOP ★★★",  note:"Post-FY stabilisation — 21-YR holds above 50"},
      {wk:"Wk 2", s5:"chop",  s15:"bull",  s21:"bull", com:"BULL ★★★",  note:"15-YR beginning to recover; 21-YR steady"},
      {wk:"Wk 3", s5:"chop",  s15:"bull",  s21:"bull", com:"BULL ★★★",  note:"H2 recovery beginning — near-term TFs firming"},
      {wk:"Wk 4", s5:"bull",  s15:"bull",  s21:"bull", com:"BULL ★★★★", note:"Late July — all TFs recovering into H2 bull"},
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL — steady H2 recovery; all TFs climbing toward year-end highs",
    stars:4,
    note:"H2 recovery in full swing; all TFs climbing steadily toward year-end annual highs",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"August H2 recovery — all TFs aligned bullish"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Steady seasonal recovery momentum"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"All TFs trending higher — August strength"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Late August — momentum building into September"},
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"chop", sig21:"bull",
    combined:"chop", combinedLabel:"CHOP — 5-YR and 15-YR pause; 21-YR continues steady climb",
    stars:3,
    note:"Seasonal pause; 5-YR and 15-YR consolidating; 21-YR continues grind higher toward year-end",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s21:"bull", com:"CHOP ★★★",  note:"September pause — near-term TFs consolidating"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s21:"bull", com:"CHOP ★★★",  note:"21-YR leads; 5-YR and 15-YR mixed"},
      {wk:"Wk 3", s5:"chop",  s15:"bull",  s21:"bull", com:"BULL ★★★",  note:"15-YR re-engaging — H2 continuation forming"},
      {wk:"Wk 4", s5:"bull",  s15:"bull",  s21:"bull", com:"BULL ★★★★", note:"Late September all-TF recovery — Q4 loading"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL — Q4 rally; all TFs climbing toward year-end annual highs",
    stars:4,
    note:"Q4 seasonal rally; all TFs aligned upward; 21-YR approaching year-end annual high zone",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Q4 rally — all TFs turning up strongly"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"October momentum — 21-YR climbing toward highs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"All TFs aligned — high conviction Q4 long"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★", note:"Late October — November continuation expected"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging toward annual highs",
    stars:5,
    note:"November power rally — all TFs approaching annual highs; 21-YR near 97 territory",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"November surge — all TFs in high conviction zone"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"21-YR approaching 97 territory — year-end loading"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"All TFs near annual highs — strongest seasonal zone"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"Pre-December — 21-YR and 15-YR at near-annual-highs"},
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig21:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 21-YR=97.41, 15-YR=96.08, 5-YR=81.71; all TFs at strong year-end highs",
    stars:5,
    note:"Year-end: 21-YR=97.41, 15-YR=96.08, 5-YR=81.71 — all three TFs at strong year-end levels; Australian equity seasonal completes year-long bull",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"December opens at or near annual highs — all TFs elevated"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"Year-end rally — 21-YR=97.41, 15-YR=96.08"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"All TFs at year-end highs — complete seasonal"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s21:"bull", com:"BULL ★★★★★", note:"Year closes: 21-YR=97.41, 15-YR=96.08, 5-YR=81.71"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the SPI 200 (SFE) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: SPI 200 (SFE) — AP
Exchange: SFE (Sydney Futures Exchange)
Long-term timeframe: 21-YR (1999–2019) | Reference: 21-YR=97.41, 15-YR=96.08, 5-YR=81.71

DEFINING CHARACTERISTIC: Australian Financial Year End (June 30) shapes the pattern.
- January: Annual trough — all TFs near 0
- April: 5-YR spikes to ~100 (AUS FY pre-close positioning)
- June: ALL TFs DROP (AUS FY end selling/rebalancing)
- H2: Steady recovery toward year-end annual highs
- December: 21-YR=97.41, 15-YR=96.08, 5-YR=81.71

YEARLY ARC:
- January: Annual trough — all TFs near 0; buy the year-start low
- Feb-Mar: All TFs recover in concert — AUS FY effect loading
- April: 5-YR SPIKES to ~100 (AUS FY pre-close positioning)
- May: Near-term TFs ease; LT TFs remain elevated
- June: ALL TFs drop (AUS FY end June 30 — selling/rebalancing)
- July: Post-FY stabilisation; recovery begins
- Aug-Sep: Steady H2 recovery — all TFs trending higher
- Oct-Nov: Q4 rally — all TFs surging toward annual highs
- December: 21-YR=97.41, 15-YR=96.08, 5-YR=81.71 at year-end highs

MONTHLY SIGNALS:
Jan: bear/bear/bear → ANNUAL TROUGH ★★★★★
Feb: bull/bull/bull → RECOVERY BEGINS ★★★★
Mar: bull/bull/bull → H1 BULL CONTINUES ★★★★
Apr: bull/bull/bull → 5-YR SPIKES TO ~100 ★★★★★
May: chop/bull/bull → TRANSITIONING ★★★
Jun: bear/bear/bear → AUS FY END DROP ★★★★
Jul: chop/chop/bull → POST-FY STABILISATION ★★★
Aug: bull/bull/bull → H2 RECOVERY ★★★★
Sep: chop/chop/bull → SEASONAL PAUSE ★★★
Oct: bull/bull/bull → Q4 RALLY ★★★★
Nov: bull/bull/bull → ALL TFs AT HIGHS ★★★★★
Dec: bull/bull/bull → ANNUAL HIGH ★★★★★

KEY TRADE SETUPS:
1. LONG early January (annual trough) → EXIT late April (5-YR at ~100)
2. SHORT early June (AUS FY end selling) → cover late June/early July
3. LONG August (H2 recovery) → target year-end 21-YR=97.41

NOTES:
- Australian FY end is June 30 (not December 31) — this creates a unique mid-year drop
- April 5-YR spike to ~100 is driven by pre-FY positioning (fund managers window-dressing)
- H2 recovery (Jul-Dec) is steady and persistent — reliable seasonal pattern
`;
