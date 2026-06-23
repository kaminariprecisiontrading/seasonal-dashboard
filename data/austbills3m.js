// austbills3m.js — 3-Mth Aus T-Bills (SFE) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "austbills3m",
  name:     "3-Mth Aus T-Bills (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Mth Aus T-Bills SFE · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#0369a1",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Extreme TF divergence — 40-YR is very low (~25–30) while 15-YR (~55–60) and 5-YR (~60–65) are at mid-high levels. TF conflict prevents any clean directional trade.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP ★★",  note: "40-YR at lows; 15-YR/5-YR at mid-high — no unified signal" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP ★★",  note: "TF divergence continues; stand aside" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP ★★",  note: "Mixed; shorter TFs starting to turn down slightly" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "chop", com: "CHOP ★★",  note: "15-YR and 5-YR beginning to decline; watch for Feb bear signal" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "15-YR and 5-YR drop sharply from January mid-high levels. 40-YR remains flat or marginally lower. The short TFs lead the decline toward the March trough.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★",  note: "15-YR and 5-YR declining sharply; short the shorter TFs" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★",  note: "Continued sharp drop; 40-YR flat provides context" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★",   note: "15-YR and 5-YR approaching trough zone; continue short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★",   note: "Near lows; prepare for March trough and April recovery" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Annual trough for shorter TFs — 15-YR and 5-YR crash to near 0. 40-YR stable at low levels. The deepest bear window for this asset; close shorts by month-end.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★★", note: "15-YR and 5-YR continuing sharp decline toward near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★★", note: "Near 0 for 15-YR and 5-YR — trough zone; maximum short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★",  note: "At or near annual lows for shorter TFs" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP ★★",   note: "Trough forming; close shorts — April recovery imminent" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from March trough — all TFs begin rising in sync. 40-YR joins the move as all three TFs align. Conviction builds; May continues the bull.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP ★★",   note: "Near trough; early tentative recovery — wait for confirmation" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Recovery confirmed; all TFs rising together" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Continued recovery; add to longs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Strong close to April; building into May surge" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong upward trend across all TFs. 15-YR surges toward ~90–95 by end of May/early June. All TFs in sync. Hold maximum longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Bull momentum builds; all TFs rising" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "15-YR surging toward higher levels; maintain long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Strong across all TFs; approach June with full exposure" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Continued surge; 15-YR approaching ~90+ zone" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Peak month — 15-YR reaches ~90–95 and 5-YR near ~75. 40-YR also elevated. Strongest bull convergence of the year. Begin reducing longs late June as 15-YR peaks.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "All TFs near highs; maximum long position" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "15-YR at peak ~90–95; hold longs" },
      { wk: "Wk 3", s5: "chop", s15: "flip", s40: "bull", com: "FLIP ★★★",   note: "15-YR peaking and reversing; begin taking profits" },
      { wk: "Wk 4", s5: "chop", s15: "bear", s40: "bull", com: "CHOP ★★",   note: "15-YR declining; 40-YR still elevated — mixed, reduce exposure" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "TF divergence — 40-YR continues rising, 15-YR drops from June peak, 5-YR volatile. No clean combined signal; stand aside and wait for October convergence.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s40: "bull", com: "CHOP ★★",  note: "15-YR declining; 40-YR rising — opposing signals" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "CHOP ★★",  note: "Mixed; 40-YR the only clear bull TF" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "CHOP ★★",  note: "Continued TF divergence; no trade" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "bull", com: "CHOP ★★",  note: "40-YR still rising; 15-YR/5-YR mixed — stand aside" },
    ],
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Continued TF divergence — 40-YR rising toward peak, 15-YR and 5-YR mixed/sideways. Complex period; no clean directional trade until October alignment.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "bull", com: "CHOP ★★",  note: "40-YR rising; shorter TFs flat — mixed" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "CHOP ★★",  note: "No TF alignment; stand aside" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "CHOP ★★",  note: "40-YR approaching peak zone; others mixed" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "flip", com: "CHOP ★★",  note: "40-YR nearing top; watch for Sep reversal signal" },
    ],
  },
  {
    month: "September", sig5: "chop", sig15: "bear", sig40: "flip",
    combined: "flip", combinedLabel: "FLIP", stars: 3,
    note: "Complex — 40-YR peaks near 100 and reverses, 15-YR and 5-YR declining. All TFs eventually converge downward but timing is staggered. Watch for Oct realignment.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s40: "bull", com: "FLIP ★★★",  note: "40-YR at peak; 15-YR declining — divergent signals" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s40: "flip", com: "FLIP ★★★",  note: "40-YR reversing from high; all TFs starting down" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s40: "bear", com: "CHOP ★★",  note: "40-YR declining; shorter TFs mixed" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bear", com: "CHOP ★★",  note: "15-YR/5-YR recovering while 40-YR declines — confused" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Rare second peak — all three TFs converge at or near highs (~90–100) simultaneously. One of the highest-conviction long windows of the year despite coming late in the calendar.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "All TFs aligning at highs; strong long opportunity" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "15-YR and 5-YR near 100; 40-YR near peak — maximum long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "All TFs near highs; hold" },
      { wk: "Wk 4", s5: "flip", s15: "flip", s40: "flip", com: "FLIP ★★★",   note: "Peaks forming; prepare for November sharp drop" },
    ],
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Sharp drop from October peaks — 15-YR falls from ~100 to ~50, 5-YR drops sharply. All TFs declining together. High-conviction bear month.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "All TFs falling sharply from October highs; strong short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "15-YR dropping hard; maximum short exposure" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Continued decline; all TFs below midline" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Month closes lower; maintain short into December" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued decline from November — 15-YR and 5-YR falling, 40-YR also declining. Year closes at lower levels with all TFs heading down. Sell rallies.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Continued decline from November; hold short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "All TFs declining; sell bounces" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",   note: "Sustained decline; 40-YR also heading lower" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP ★★",   note: "Year-end; slowing momentum — take profits, reset for January" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 3-Month Aus T-Bills (SFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 3-Month Aus T-Bills (SFE)
Exchange: SFE | Seasonal History: 40-Year (1980–2019)

YEARLY ARC:
Jan: TF divergence — 40-YR at lows (~25–30), 15-YR and 5-YR at mid-high (~55–65). No unified signal.
Feb–Mar: 15-YR and 5-YR crash to near 0 (annual trough). 40-YR stable.
Apr–Jun: Recovery and bull surge — all TFs rising. 15-YR peaks near 90–95 in June.
Jul–Sep: Complex TF divergence — 40-YR still rising; shorter TFs diverge. No clean signal.
Oct: Rare second bull convergence — all TFs at ~90–100 simultaneously.
Nov–Dec: Sharp drop from October peaks — all TFs declining to year-end.

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | Extreme TF divergence; no trade
Feb  — SHORT ★★★   | 15-YR/5-YR dropping sharply toward trough
Mar  — SHORT ★★★★  | Annual trough for shorter TFs; near 0
Apr  — LONG  ★★★   | Recovery; all TFs rising together
May  — LONG  ★★★★  | Strong bull; 15-YR surging toward 90+
Jun  — LONG  ★★★★★ | Peak month; 15-YR at ~90–95; reduce late month
Jul  — CHOP  ★★    | TF divergence; stand aside
Aug  — CHOP  ★★    | Complex; 40-YR still rising, others mixed
Sep  — FLIP  ★★★   | 40-YR peaks; staggered reversal — careful
Oct  — LONG  ★★★★  | Rare second convergence; all TFs at ~90–100
Nov  — SHORT ★★★★  | Sharp drop from October highs; strong bear
Dec  — SHORT ★★★   | Continued decline; year closes lower

KEY OBSERVATIONS:
- Seasonal structure is completely different from the T-Bonds (10-YR and 3-YR)
- The critical divergence: 40-YR runs its own cycle versus the shorter TFs
- Two bull windows: Apr–Jun (primary) and October (secondary convergence)
- Two bear windows: Feb–Mar (trough) and Nov–Dec (post-Oct drop)
- July–September is the most complex period — TF divergence makes clean signals impossible
- October convergence is the most unusual feature: all TFs simultaneously near 100
`;
