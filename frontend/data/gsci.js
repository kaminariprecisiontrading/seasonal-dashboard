// data/gsci.js — GSCI Commodity Index (CME) · 29-Year Seasonal (1991–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 29-YR=64.89 · 15-YR=59.12 · 5-YR=39.32

const ASSET_CONFIG = {
  id:       "gsci",
  name:     "GSCI (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 29-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Goldman Sachs Commodity Index CME (GI) · 29-Year Seasonal (1991–2019) · 15-Year · 5-Year overlays. Reference: 29-YR=64.89, 15-YR=59.12, 5-YR=39.32 at 02 Jan 2020.",
  ltLabel:  "29-YR",
  ltSigKey: "sig29",
  ltKey:    "s29",
  ltAccent: "#b45309",
};

const MONTHS = [
  {
    month:"January", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — commodity seasonal H1 uptrend begins; all TFs rising",
    stars:4,
    note:"H1 commodity bull begins; all TFs trending upward from year-start",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"New year commodity bull — all TFs trending up"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"H1 momentum building across all TFs"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Commodity seasonal continues higher"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late January — H1 bull phase firmly established"},
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — 15-YR approaching peak zone; all TFs climbing strongly",
    stars:4,
    note:"All TFs rising; 15-YR in strong uptrend approaching April peak",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"February continuation — all TFs aligned bullish"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"15-YR climbing toward April peak zone"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Broad commodity seasonal strength"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late February — all TFs in high conviction uptrend"},
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — all TFs in strong uptrend; 15-YR approaching 100",
    stars:5,
    note:"Strong seasonal momentum; 15-YR approaching 100 (April peak); 29-YR at ~80",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"All TFs near highs — 15-YR approaching 100"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"29-YR at ~70-80; all signals align bullish"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"Highest conviction month in H1 — all TFs surging"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"Pre-April peak — 15-YR nearing 100 annual high"},
    ]
  },
  {
    month:"April", sig5:"chop", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — 15-YR PEAKS AT 100; 29-YR AT ~80; 5-YR easing after May peak",
    stars:4,
    note:"15-YR peaks at 100 in April (annual high for LT TF); 29-YR at ~80; 5-YR beginning to soften",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"bull", s29:"bull", com:"BULL ★★★★", note:"April opens — 15-YR at or near 100 peak"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s29:"bull", com:"BULL ★★★★", note:"15-YR at 100 (annual high); 29-YR at ~80"},
      {wk:"Wk 3", s5:"chop",  s15:"bull", s29:"bull", com:"BULL ★★★",  note:"5-YR starting to ease; LT TFs still bullish"},
      {wk:"Wk 4", s5:"chop",  s15:"bull", s29:"bull", com:"BULL ★★★",  note:"Late April — 15-YR past peak; 5-YR softening"},
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"chop", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR PEAKS AT 100 (May near-term peak); TRANSITION MONTH",
    stars:4,
    note:"5-YR peaks at 100 in May — final near-term seasonal high; 15-YR has already peaked; H1 bull concluding",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"chop", s29:"bull", com:"BULL ★★★★", note:"5-YR at or near 100 — near-term peak zone"},
      {wk:"Wk 2", s5:"bull", s15:"chop", s29:"bull", com:"BULL ★★★",  note:"5-YR final push to 100; 15-YR softening"},
      {wk:"Wk 3", s5:"chop", s15:"chop", s29:"bull", com:"CHOP ★★★",  note:"5-YR past peak; GSCI seasonal transition begins"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s29:"chop", com:"BEAR ★★★",  note:"FLIP SHORT signal — H1 bull ending; H2 bear begins"},
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig29:"chop",
    combined:"bear", combinedLabel:"BEAR — H2 CRASH BEGINS; 5-YR from 100 → collapsing toward 0",
    stars:5,
    note:"GSCI H2 crash: 5-YR collapses from 100 toward near-0 in August; 15-YR also declining; classic commodity summer bust",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s29:"chop", com:"BEAR ★★★★★", note:"H2 crash underway — 5-YR plunging from 100"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"All TFs declining — classic commodity summer bust"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Accelerating decline — hold shorts"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Late June crash continues — no seasonal support"},
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig29:"bear",
    combined:"bear", combinedLabel:"BEAR — all TFs declining; 5-YR heading toward August near-0 low",
    stars:5,
    note:"Full bear across all TFs; 5-YR heading toward near-0 in August; seasonal commodity H2 weakness",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"All TFs in downtrend — 5-YR approaching trough"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Commodity summer crash deepening"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Near-term TFs heading toward 0 — classic bust"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★★", note:"Late July — 5-YR near-0 August low approaching"},
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"chop", sig29:"bull",
    combined:"bear", combinedLabel:"BEAR — 5-YR NEAR 0 (ANNUAL TROUGH); 29-YR begins recovery",
    stars:4,
    note:"5-YR at near-0 annual trough in August; 29-YR beginning to recover toward October annual high",
    weeks:[
      {wk:"Wk 1", s5:"bear",  s15:"chop", s29:"chop", com:"BEAR ★★★★", note:"5-YR at/near 0 trough; 29-YR beginning to stir"},
      {wk:"Wk 2", s5:"bear",  s15:"chop", s29:"bull", com:"CHOP ★★★",  note:"5-YR trough; 29-YR early recovery signal"},
      {wk:"Wk 3", s5:"chop",  s15:"chop", s29:"bull", com:"CHOP ★★★",  note:"5-YR bouncing from 0; 29-YR climbing"},
      {wk:"Wk 4", s5:"chop",  s15:"bull", s29:"bull", com:"BULL ★★★",  note:"5-YR recovery begins; 29-YR well into recovery"},
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — strong recovery; 29-YR climbing toward October annual high",
    stars:4,
    note:"Strong recovery phase; 29-YR charging toward October annual high at ~100; all TFs turning up",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"September recovery in full swing — all TFs rising"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"29-YR approaching October annual high zone"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Strong seasonal recovery momentum"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s29:"bull", com:"BULL ★★★★", note:"Late September — 29-YR nearing annual high at 100"},
    ]
  },
  {
    month:"October", sig5:"chop", sig15:"bull", sig29:"bull",
    combined:"bull", combinedLabel:"BULL — 29-YR AT ANNUAL HIGH (~100); LT SEASONAL PEAK OF THE YEAR",
    stars:5,
    note:"29-YR reaches ANNUAL HIGH (~100) in October — LT seasonal peak; 15-YR also elevated; unique October commodity peak",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"29-YR at ~100 annual high — October commodity peak"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s29:"bull", com:"BULL ★★★★★", note:"LT seasonal peak of the year — hold longs"},
      {wk:"Wk 3", s5:"chop",  s15:"bull", s29:"bull", com:"BULL ★★★★",  note:"5-YR starting to ease from October high"},
      {wk:"Wk 4", s5:"chop",  s15:"chop", s29:"chop", com:"CHOP ★★★",   note:"Late October — 29-YR past peak; decline begins"},
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig29:"bear",
    combined:"bear", combinedLabel:"BEAR — post-October decline; all TFs heading lower into year-end",
    stars:4,
    note:"All TFs declining after October LT peak; year-end selloff typical for GSCI",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"Post-October decline — all TFs turning down"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"November selloff in GSCI — broad commodity weakness"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"Declining across all TFs — no seasonal support"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"Late November — year-end decline continues"},
    ]
  },
  {
    month:"December", sig5:"bear", sig15:"bear", sig29:"bear",
    combined:"bear", combinedLabel:"YEAR-END LOW — 29-YR=64.89, 15-YR=59.12, 5-YR=39.32; all TFs well off annual highs",
    stars:4,
    note:"Year closes well below October annual highs: 29-YR=64.89, 15-YR=59.12, 5-YR=39.32 — GSCI is bearish into year-end (opposite of equity indices)",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"December continuation lower — no year-end rally"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"All TFs declining toward year-end lows"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"29-YR at 64.89 — well below October 100 peak"},
      {wk:"Wk 4", s5:"bear", s15:"bear", s29:"bear", com:"BEAR ★★★★", note:"Year closes: 5-YR=39.32; 29-YR=64.89 — GSCI bears into year-end"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the GSCI Commodity Index (CME) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: GSCI Commodity Index (CME) — GI
Exchange: CME
Long-term timeframe: 29-YR (1991–2019) | Reference: 29-YR=64.89, 15-YR=59.12, 5-YR=39.32

DEFINING CHARACTERISTIC: GSCI has a COMPLETELY DIFFERENT pattern from equity indices.
- H1 BULL (Jan-May): 15-YR peaks at 100 in April; 5-YR peaks at 100 in May
- H2 CRASH (Jun-Aug): 5-YR collapses from 100 to near-0 in August
- RECOVERY (Sep-Oct): 29-YR surges to ANNUAL HIGH (~100) in October
- YEAR-END DECLINE (Nov-Dec): all TFs sell off; year closes at 29-YR=64.89

YEARLY ARC:
- January-March: H1 bull phase — all TFs rising; 29-YR at ~70-80
- April: 15-YR peaks at 100 (LT TF annual high)
- May: 5-YR peaks at 100 (near-term annual high); FLIP SHORT signal in Wk4
- June-August: H2 CRASH — 5-YR collapses from 100 to near 0; full bear across TFs
- August trough: 5-YR at near-0 annual trough
- September-October: strong recovery; 29-YR reaches ANNUAL HIGH (~100) in October
- November-December: year-end decline; closes at 29-YR=64.89, 15-YR=59.12, 5-YR=39.32

MONTHLY SIGNALS:
Jan: bull/bull/bull → H1 BULL BEGINS ★★★★
Feb: bull/bull/bull → ALL TFs CLIMBING ★★★★
Mar: bull/bull/bull → HIGHEST H1 CONVICTION ★★★★★
Apr: chop/bull/bull → 15-YR PEAKS AT 100 ★★★★
May: bull/chop/bull → 5-YR PEAKS AT 100; FLIP SHORT Wk4 ★★★★
Jun: bear/bear/chop → H2 CRASH BEGINS ★★★★★
Jul: bear/bear/bear → CRASH DEEPENS ★★★★★
Aug: bear/chop/bull → 5-YR NEAR-0 TROUGH ★★★★
Sep: bull/bull/bull → RECOVERY SURGE ★★★★
Oct: chop/bull/bull → 29-YR AT ANNUAL HIGH ~100 ★★★★★
Nov: bear/bear/bear → POST-PEAK DECLINE ★★★★
Dec: bear/bear/bear → YEAR-END LOW ★★★★

KEY TRADE SETUPS:
1. LONG January (H1 bull) → EXIT late May (5-YR at 100 peak); classic H1 commodity seasonal
2. SHORT late May / early June (FLIP SHORT signal) → cover August (5-YR near-0 trough)
3. LONG September (recovery surge) → EXIT late October (29-YR at 100 annual high)

NOTES:
- GSCI is the only index in this dashboard that is BEARISH into year-end
- October 29-YR annual high at ~100 is unique — opposite of equity indices which peak at year-end
- The H2 crash from May-August is the most violent seasonal move in this entire dashboard
`;
