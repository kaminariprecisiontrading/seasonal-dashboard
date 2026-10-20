// data/hsi.js — Hang Seng (HKFE) · 34-Year Seasonal (1986–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 34-YR=100 · 15-YR=100 · 5-YR=54.61

const ASSET_CONFIG = {
  id:       "hsi",
  name:     "Hang Seng (HKFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Hang Seng Index HKFE (HSI) · 34-Year Seasonal (1986–2019) · 15-Year · 5-Year overlays. Reference: 34-YR=100, 15-YR=100, 5-YR=54.61 at 02 Jan 2020.",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#dc2626",
};

const MONTHS = [
  {
    month:"January", sig5:"bull", sig15:"chop", sig34:"bear",
    combined:"chop", combinedLabel:"LUNAR NEW YEAR — 5-YR surges to ~47; 34-YR near 0; Lunar New Year effect",
    stars:3,
    note:"Lunar New Year drives 5-YR spike to ~47 in January; 34-YR and 15-YR still depressed near 0; near-term seasonal pop",
    weeks:[
      {wk:"Wk 1", s5:"bear",  s15:"bear", s34:"bear", com:"BEAR ★★★",  note:"Year opens weak — 34-YR near 0; LNY approaching"},
      {wk:"Wk 2", s5:"bull",  s15:"chop", s34:"bear", com:"CHOP ★★★",  note:"Lunar New Year effect — 5-YR spikes to ~47"},
      {wk:"Wk 3", s5:"bull",  s15:"chop", s34:"bear", com:"CHOP ★★★",  note:"5-YR elevated; 34-YR still depressed"},
      {wk:"Wk 4", s5:"chop",  s15:"chop", s34:"bear", com:"CHOP ★★★",  note:"Post-LNY — 5-YR easing; approaching March trough"},
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig34:"bear",
    combined:"chop", combinedLabel:"CHOP — post-LNY digestion; 34-YR still depressed; mixed signals",
    stars:3,
    note:"Post-Lunar New Year digestion; 34-YR still near 0; mixed TF signals ahead of March trough",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop", s34:"bear", com:"CHOP ★★★",  note:"Post-LNY — 5-YR easing; 34-YR anchored low"},
      {wk:"Wk 2", s5:"chop",  s15:"bear", s34:"bear", com:"BEAR ★★★",  note:"Near-term TFs softening — March trough approaching"},
      {wk:"Wk 3", s5:"bear",  s15:"bear", s34:"bear", com:"BEAR ★★★",  note:"All TFs declining toward March seasonal trough"},
      {wk:"Wk 4", s5:"bear",  s15:"bear", s34:"bear", com:"BEAR ★★★",  note:"Late February — approaching March low; accumulate"},
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"NEAR-TERM TROUGH — 5-YR and 15-YR at ~15; 34-YR depressed",
    stars:4,
    note:"5-YR and 15-YR both drop to ~15 in March — near-term trough; 34-YR also depressed; accumulate for April 5-YR spike",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★", note:"March trough — 5-YR and 15-YR declining to ~15"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★", note:"5-YR and 15-YR at ~15 — near-term trough zone"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★", note:"All TFs at trough — accumulate for April surge"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",  note:"Late March — bottoming; April spike imminent"},
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"chop", sig34:"bull",
    combined:"bull", combinedLabel:"BULL — 5-YR SPIKES TO 100 (ANNUAL HIGH!); 34-YR recovering strongly",
    stars:5,
    note:"5-YR SPIKES TO 100 — ANNUAL HIGH in April; most explosive single-month move for HSI; 34-YR recovering strongly; 15-YR at ~35-45",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"chop", s34:"bull", com:"BULL ★★★★★", note:"5-YR SPIKES toward 100 — April HSI annual high!"},
      {wk:"Wk 2", s5:"bull",  s15:"chop", s34:"bull", com:"BULL ★★★★★", note:"5-YR at 100 ANNUAL HIGH; 34-YR surging from trough"},
      {wk:"Wk 3", s5:"bull",  s15:"chop", s34:"bull", com:"BULL ★★★★",  note:"5-YR off peak; 34-YR continuing recovery"},
      {wk:"Wk 4", s5:"chop",  s15:"chop", s34:"bull", com:"BULL ★★★",   note:"Late April — 5-YR easing; 34-YR holds bullish"},
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"chop", sig34:"bull",
    combined:"chop", combinedLabel:"CHOP — post-April digestion; 34-YR holds; near-term TFs cooling",
    stars:3,
    note:"Post-April spike digestion; 34-YR remains supportive; near-term TFs mixed ahead of June trough",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop", s34:"bull", com:"CHOP ★★★",  note:"5-YR cooling from April 100 spike; 34-YR holds"},
      {wk:"Wk 2", s5:"chop",  s15:"chop", s34:"bull", com:"CHOP ★★★",  note:"Post-peak digestion — no clear near-term edge"},
      {wk:"Wk 3", s5:"bear",  s15:"bear", s34:"bull", com:"CHOP ★★★",  note:"Near-term TFs weakening — June trough approaching"},
      {wk:"Wk 4", s5:"bear",  s15:"bear", s34:"chop", com:"BEAR ★★★",  note:"Late May — all TFs softening; June trough ahead"},
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig34:"bear",
    combined:"bear", combinedLabel:"BEAR — 15-YR NEAR-0 ANNUAL TROUGH; 34-YR also low; most volatile month",
    stars:5,
    note:"15-YR drops to near-0 ANNUAL TROUGH in June; 34-YR also very low; most volatile seasonal reversal for HSI — June is the annual trough for LT TFs",
    weeks:[
      {wk:"Wk 1", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"June crash — 15-YR heading toward near-0 annual trough"},
      {wk:"Wk 2", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"15-YR at near-0 ANNUAL TROUGH — most extreme HSI month"},
      {wk:"Wk 3", s5:"bear", s15:"bear", s34:"bear", com:"BEAR ★★★★★", note:"All TFs at lows — accumulate for July explosive recovery"},
      {wk:"Wk 4", s5:"chop", s15:"chop", s34:"chop", com:"CHOP ★★★",   note:"Late June bottoming — July explosive recovery imminent"},
    ]
  },
  {
    month:"July", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL — EXPLOSIVE RECOVERY; 15-YR surges +60pts from June near-0 trough",
    stars:5,
    note:"EXPLOSIVE recovery from June near-0 trough; 15-YR surges +60 points in July — one of the most dramatic monthly recoveries in this entire dashboard",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"EXPLOSIVE July recovery — 15-YR surging from near-0"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"15-YR +60pts from June trough — most dramatic recovery"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"All TFs surging — hold longs; 34-YR also recovering"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"July ends strong — 15-YR near 60; 34-YR climbing"},
    ]
  },
  {
    month:"August", sig5:"chop", sig15:"chop", sig34:"bull",
    combined:"chop", combinedLabel:"CHOP — summer digestion after July surge; 34-YR holds",
    stars:3,
    note:"Post-July surge digestion; 34-YR holds above 50; near-term TFs consolidating after explosive move",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"Digesting July surge — near-term TFs neutral"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"34-YR steady; 5-YR and 15-YR mixed"},
      {wk:"Wk 3", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"Summer consolidation — no clear near-term edge"},
      {wk:"Wk 4", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"Late August — approaching October secondary surge"},
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"chop", sig34:"bull",
    combined:"chop", combinedLabel:"CHOP — continued consolidation; 34-YR maintains upward trend",
    stars:3,
    note:"Seasonal consolidation continues; 34-YR grinding higher toward October secondary surge; near-term TFs neutral",
    weeks:[
      {wk:"Wk 1", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"September neutral — 34-YR slowly grind higher"},
      {wk:"Wk 2", s5:"chop",  s15:"chop",  s34:"bull", com:"CHOP ★★★",  note:"No strong near-term signal — LT TF leads"},
      {wk:"Wk 3", s5:"chop",  s15:"bull",  s34:"bull", com:"BULL ★★★",  note:"15-YR beginning to stir — October surge loading"},
      {wk:"Wk 4", s5:"bull",  s15:"bull",  s34:"bull", com:"BULL ★★★★", note:"Late September — all TFs turning up; October ahead"},
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL — 15-YR SECONDARY SURGE to ~75; 34-YR climbing strongly",
    stars:5,
    note:"15-YR spikes to ~75 in October — secondary surge after June trough recovery; 34-YR also climbing strongly toward year-end annual high",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"October surge — 15-YR spiking toward ~75"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"15-YR at ~75 secondary surge; 34-YR at ~75"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"All TFs in high conviction uptrend — hold longs"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Late October — momentum into November; 34-YR surging"},
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"BULL ★★★★★ — all TFs surging toward 100/100 annual highs",
    stars:5,
    note:"All TFs surging toward year-end annual highs; 34-YR and 15-YR approaching 100; 5-YR lagging (will end at 54.61)",
    weeks:[
      {wk:"Wk 1", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"November surge — 34-YR and 15-YR approaching 100"},
      {wk:"Wk 2", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"All TFs in high conviction bull zone"},
      {wk:"Wk 3", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Near-annual-highs — 34-YR and 15-YR at 90+"},
      {wk:"Wk 4", s5:"bull", s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Pre-December — 34-YR and 15-YR at or near 100"},
    ]
  },
  {
    month:"December", sig5:"chop", sig15:"bull", sig34:"bull",
    combined:"bull", combinedLabel:"ANNUAL HIGH — 34-YR=100 AND 15-YR=100 SIMULTANEOUSLY; 5-YR=54.61 (lagging)",
    stars:5,
    note:"Year-end: BOTH 34-YR=100 AND 15-YR=100 simultaneously — dual perfect annual highs; 5-YR=54.61 (relatively low — 5-YR lags significantly at year-end for HSI)",
    weeks:[
      {wk:"Wk 1", s5:"bull",  s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"December opens at annual highs — 34-YR and 15-YR at 100"},
      {wk:"Wk 2", s5:"bull",  s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"34-YR=100 AND 15-YR=100 simultaneously — dual perfect highs"},
      {wk:"Wk 3", s5:"chop",  s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"LT TFs at 100; 5-YR at only 54.61 — significant divergence"},
      {wk:"Wk 4", s5:"chop",  s15:"bull", s34:"bull", com:"BULL ★★★★★", note:"Year closes: 34-YR=100, 15-YR=100, 5-YR=54.61"},
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures market analyst specialising in seasonal tendency analysis.
Analyse the following seasonal data for the Hang Seng (HKFE) and provide:
1. YEARLY BIAS SUMMARY — the macro seasonal arc (2-3 sentences)
2. MONTH-BY-MONTH TABLE — Month | Combined Signal | Stars | Key Action Note
3. WEEK-BY-WEEK BREAKDOWN — for the 3 highest-conviction months only
4. TOP 3 TRADE SETUPS — with entry timing, signal confluence, and exit target

Keep output concise and professional. Use trading terminology.

=== PLAYBOOK SIGNALS ===
Asset: Hang Seng (HKFE) — HSI
Exchange: HKFE (Hong Kong)
Long-term timeframe: 34-YR (1986–2019) | Reference: 34-YR=100, 15-YR=100, 5-YR=54.61

DEFINING CHARACTERISTICS (MOST VOLATILE PATTERN IN DASHBOARD):
- January: Lunar New Year drives 5-YR spike to ~47 (near-term pop)
- March: 5-YR and 15-YR CRASH to ~15 (near-term trough)
- April: 5-YR SPIKES TO 100 (ANNUAL HIGH — most explosive single-month move)
- June: 15-YR hits NEAR-0 ANNUAL TROUGH (34-YR also very low)
- July: EXPLOSIVE RECOVERY — 15-YR surges +60pts from June trough
- October: 15-YR SECONDARY SURGE to ~75
- December: 34-YR=100 AND 15-YR=100 SIMULTANEOUSLY; 5-YR only 54.61

YEARLY ARC:
- January: Lunar New Year 5-YR spike to ~47; 34-YR near 0
- Feb-Mar: 5-YR and 15-YR decline to ~15 (near-term trough)
- April: 5-YR SPIKES TO 100 — ANNUAL HIGH (most explosive move)
- May: Post-peak digestion; June trough approaching
- June: 15-YR at NEAR-0 ANNUAL TROUGH; 34-YR also low
- July: EXPLOSIVE RECOVERY — 15-YR +60pts from June trough
- Aug-Sep: Consolidation; 34-YR grinding higher
- October: 15-YR SECONDARY SURGE to ~75; 34-YR surging
- Nov-Dec: 34-YR=100 AND 15-YR=100 SIMULTANEOUSLY at year-end

MONTHLY SIGNALS:
Jan: bull/chop/bear → LUNAR NEW YEAR 5-YR SPIKE ★★★
Feb: chop/chop/bear → POST-LNY DIGESTION ★★★
Mar: bear/bear/bear → 5-YR AND 15-YR AT ~15 TROUGH ★★★★
Apr: bull/chop/bull → 5-YR SPIKES TO 100 ANNUAL HIGH ★★★★★
May: chop/chop/bull → POST-PEAK DIGESTION ★★★
Jun: bear/bear/bear → 15-YR NEAR-0 ANNUAL TROUGH ★★★★★
Jul: bull/bull/bull → EXPLOSIVE +60PT RECOVERY ★★★★★
Aug: chop/chop/bull → POST-SURGE DIGESTION ★★★
Sep: chop/chop/bull → CONSOLIDATION ★★★
Oct: bull/bull/bull → 15-YR SECONDARY SURGE TO ~75 ★★★★★
Nov: bull/bull/bull → ALL TFs SURGING TO 100 ★★★★★
Dec: chop/bull/bull → 34-YR=100 AND 15-YR=100 SIMULTANEOUSLY ★★★★★

KEY TRADE SETUPS:
1. LONG early April (after March trough) → EXIT on 5-YR spike to 100 (days only)
2. LONG early July (explosive recovery from June near-0 trough) → EXIT October
3. LONG early October (15-YR secondary surge) → target December 34-YR=100, 15-YR=100

NOTES:
- HSI is the MOST VOLATILE seasonal pattern in this entire dashboard
- June is the most dangerous month — 15-YR goes to near-0 (annual trough for LT TF)
- Year-end: BOTH 34-YR=100 AND 15-YR=100 simultaneously — but 5-YR only 54.61 (significant divergence)
- Lunar New Year timing varies — 5-YR January spike timing shifts by several weeks
`;
