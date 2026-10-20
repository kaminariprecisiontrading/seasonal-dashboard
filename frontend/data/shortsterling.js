// shortsterling.js — 3-Mth Short Sterling (LIFFE) · 38-Year Seasonal (1982–2019)

const ASSET_CONFIG = {
  id:       "shortsterling",
  name:     "3-Mth Short Sterling (LIFFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 38-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Mth Short Sterling LIFFE · 38-Year Seasonal (1982–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "38-YR",
  ltSigKey: "sig38",
  ltKey:    "s38",
  ltAccent: "#6d28d9",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Extreme TF divergence from the outset — 38-YR at ~25, 15-YR at ~75–80 (near annual high), 5-YR at ~55–65. Three TFs are entirely out of sync. No unified trade.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "38-YR at lows; 15-YR at highs; 5-YR mid — extreme TF split" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Divergence throughout; no unified directional signal" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "15-YR starting to decline from highs; 5-YR mixed" },
      { wk: "Wk 4", s5: "chop", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "15-YR declining; 38-YR flat — TF conflict prevents clean signal" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "bear", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "15-YR declining from January highs; 38-YR flat; 5-YR mixed. Marginal bear on 15-YR but no TF alignment. Complex and low-conviction — avoid.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "15-YR declining; others flat/mixed — no clean trade" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "15-YR continuing lower; 38-YR unresponsive" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "5-YR also dipping; 38-YR still flat — approaching March crash" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "Build short into March crash — avoid long entry" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "SEVERE CRASH — 38-YR crashes from ~25 to near 0, 5-YR also crashes to near 0. A defining annual low for ALL TFs simultaneously. Most powerful bear month of the year alongside September.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "ALL TFs crashing; 38-YR and 5-YR toward near 0 — max short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "All TFs near annual lows; hold maximum short exposure" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★",  note: "Near bottom; 38-YR at floor; prepare for April recovery" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",   note: "Trough forming; close shorts — April surge from 38-YR imminent" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "38-YR surges massively from near 0 to ~75+ — one of the sharpest recoveries in the dataset. 15-YR and 5-YR also recover. High-conviction long entry off March lows.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "38-YR surging from near 0; all TFs rising; enter long immediately" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "38-YR climbing toward ~50–60; hold long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "38-YR approaching ~70–75; strong momentum" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",   note: "All TFs elevated; maintain into May peak" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "PEAK MONTH — all three TFs converge near ~90–100 simultaneously. 38-YR near 90, 15-YR near 95, 5-YR near 90. Highest annual convergence. Start reducing late May.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "All TFs near peak; maximum long — best convergence of the year" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "38-YR, 15-YR, 5-YR all near 90–100; hold full position" },
      { wk: "Wk 3", s5: "flip", s15: "flip", s38: "bull", com: "FLIP ★★★★",  note: "15-YR and 5-YR beginning to reverse; begin reducing exposure" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "chop", com: "CHOP ★★",   note: "15-YR/5-YR dropping sharply; close longs — June is complex" },
    ],
  },
  {
    month: "June", sig5: "chop", sig15: "flip", sig38: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "All TFs near highs early, then 15-YR and 5-YR crash dramatically while 38-YR holds. The intra-month reversal is abrupt. Short the shorter TFs on the crash; watch 38-YR for confirmation.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",   note: "All TFs still elevated early June; 15-YR near peak" },
      { wk: "Wk 2", s5: "flip", s15: "flip", s38: "bull", com: "FLIP ★★★★",  note: "15-YR and 5-YR beginning crash; 38-YR holds — TF split emerging" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bull", com: "FLIP ★★★★",  note: "15-YR/5-YR crashing sharply; 38-YR still elevated — short 15-YR/5-YR" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "chop", com: "SHORT ★★★",  note: "15-YR and 5-YR near lows; 38-YR fading too — hold short into July" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Complex TF divergence — 38-YR at ~50–60 (mid-level), 15-YR very low ~25–30, 5-YR recovering to ~70–80. Three TFs pointing different directions. Stand aside.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s38: "chop", com: "CHOP ★★",  note: "38-YR ~55; 15-YR low ~25–30; 5-YR recovering — no unified signal" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "TF chaos; 5-YR recovering while 15-YR depressed — avoid" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "No alignment; stand aside through mid-July" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "5-YR rising toward ~70–80; others mixed — early signal, no entry yet" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig38: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "15-YR and 5-YR surge to ~85–90. 38-YR stable at ~50–60 but not strongly directional. A solid bull window on shorter TFs; hold into early September before crash.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "chop", com: "LONG ★★★",  note: "15-YR and 5-YR surging; 38-YR flat — enter on shorter TF strength" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "chop", com: "LONG ★★★",  note: "15-YR approaching ~85–90; 5-YR rising together; hold" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "chop", com: "LONG ★★★",  note: "15-YR and 5-YR near peak; 38-YR still flat-stable" },
      { wk: "Wk 4", s5: "flip", s15: "flip", s38: "chop", com: "FLIP ★★★",  note: "15-YR and 5-YR peaking; close longs — September devastation ahead" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "DEVASTATING BEAR — 15-YR and 5-YR crash from ~90 to near 0. 38-YR also declines significantly. Matches March as the most powerful bear month. Aggressive short required.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "15-YR and 5-YR in free fall from August highs; maximum short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "All TFs crashing; 15-YR/5-YR near 0 — hold full short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★",  note: "Near annual lows for shorter TFs; maintain short" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",   note: "Trough; close shorts — October recovery begins" },
    ],
  },
  {
    month: "October", sig5: "chop", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "15-YR and 5-YR remain at or near lows from September crash. 38-YR also declining from its own peak. Bear continues but conviction lower as shorter TFs near floor.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "15-YR/5-YR at lows; 38-YR declining — bear continues" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "38-YR declining; shorter TFs near floor — short 38-YR" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "bear", com: "CHOP ★★",   note: "Shorter TFs stabilising at lows; 38-YR still sliding" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s38: "chop", com: "CHOP ★★",   note: "5-YR recovering; mixed signals — close shorts, position for November" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "All TFs recovering from October lows. 15-YR and 5-YR rebounding; 38-YR stabilising. Solid but modest recovery — not as sharp as March→April or June→July.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "All TFs recovering; enter long on confirmed bounce" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "15-YR and 5-YR rising; 38-YR joining the recovery" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Continued recovery; hold position" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Recovery slowing heading into December decline" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "38-YR declining toward year-end; 5-YR also drops to near 0 again. Year closes weak across all TFs. Short on any rallies; year resets to January's diverged low state.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "38-YR declining; 5-YR dropping — all TFs weakening into year-end" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "All TFs lower; 5-YR heading toward near 0 again" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★",   note: "Year-end weakness; 38-YR declining, 5-YR near lows" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",   note: "Year-end; TFs setting up for January divergence — reset" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 3-Month Short Sterling (LIFFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 3-Month Short Sterling (LIFFE)
Exchange: LIFFE | Seasonal History: 38-Year (1982–2019)

YEARLY ARC:
Jan: Extreme TF divergence — 38-YR at ~25 while 15-YR is near ~75–80 annual high. No trade.
Feb: 15-YR declining; 38-YR flat; 5-YR mixed. Low conviction — avoid.
Mar: ALL TFs crash to near 0. Equal to September as most powerful bear month. Maximum short.
Apr: 38-YR surges massively from near 0 to ~75+. All TFs recover. High-conviction long.
May: All TFs converge near 90–100 simultaneously. Peak month. Reduce late May.
Jun: All TFs near highs early, then 15-YR/5-YR crash while 38-YR holds. Complex FLIP month.
Jul: 38-YR at ~50–60, 15-YR very low ~25–30, 5-YR recovering ~70–80. Three directions — no trade.
Aug: 15-YR and 5-YR surge to ~85–90. 38-YR stable. Solid bull on shorter TFs.
Sep: 15-YR and 5-YR CRASH from ~90 to near 0. 38-YR also declines. Devastating bear.
Oct: All TFs at or recovering from lows. Bear continues but momentum fading.
Nov: All TFs recovering from October lows. Modest bull.
Dec: 38-YR and 5-YR declining back toward year-end lows. Short bias.

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | Extreme TF divergence: 38-YR at ~25, 15-YR at ~75–80 — no trade
Feb  — CHOP  ★★    | 15-YR declining; mixed overall — avoid
Mar  — SHORT ★★★★★ | All TFs crash to near 0 — most powerful bear with September
Apr  — LONG  ★★★★  | 38-YR surges massively from near 0; high-conviction long
May  — LONG  ★★★★★ | All TFs at ~90–100 peak convergence; reduce late month
Jun  — FLIP  ★★★★  | All high early; 15-YR/5-YR crash while 38-YR holds
Jul  — CHOP  ★★    | 38-YR ~50–60, 15-YR very low, 5-YR recovering — three directions
Aug  — LONG  ★★★   | 15-YR and 5-YR surge to ~85–90; 38-YR flat
Sep  — SHORT ★★★★★ | 15-YR and 5-YR crash from ~90 to near 0; devastating bear
Oct  — SHORT ★★★   | Bear continues; all TFs at or near lows
Nov  — LONG  ★★★   | All TFs recovering from October lows
Dec  — SHORT ★★★   | 38-YR and 5-YR declining toward year-end lows

KEY OBSERVATIONS:
- This is the most complex chart in the dataset — the three TFs operate almost independently for much of the year
- Two devastating bear months: March (all crash) and September (15-YR/5-YR crash from ~90 to near 0)
- Two primary bull windows: April recovery (38-YR led) and May peak (all TFs converge)
- June has a critical intra-month reversal — short entry mid-month as 15-YR/5-YR crash from highs
- July is unique: 38-YR is at mid-level, 15-YR is very low, 5-YR is recovering — three different stages simultaneously
- The 15-YR spends much of the year near annual highs in January before dropping all the way to near 0 by March/September
- August bull is only the shorter TFs — 38-YR is flat throughout at ~50–60
`;
