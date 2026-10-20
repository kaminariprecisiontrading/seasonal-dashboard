// fedfunds.js — 30-Day Federal Funds (CBOT) · 32-Year Seasonal (1988–2019)

const ASSET_CONFIG = {
  id:       "fedfunds",
  name:     "30-Day Fed Funds (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 32-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 30-Day Federal Funds CBOT · 32-Year Seasonal (1988–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "32-YR",
  ltSigKey: "sig32",
  ltKey:    "s32",
  ltAccent: "#0f766e",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig32: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "INVERTED INSTRUMENT: 5-YR starts at ~100 (annual HIGH!), 15-YR at ~88-90, 32-YR at ~65-75. All three declining from their respective January peaks. Sell-into-strength on the shorter TFs; 32-YR still elevated.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "chop", com: "CHOP",       note: "Jan 1: 5-YR at 100 (annual high); 15-YR at 88-90; 32-YR at 65-75 — all declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "chop", com: "CHOP",       note: "Decline across all TFs; shorter TFs leading lower" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "chop", com: "SHORT ★★",   note: "All TFs declining; 5-YR and 15-YR falling fastest" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★",  note: "Late-Jan: 32-YR joins the decline; all three now bearish" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig32: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining toward mid-year trough. 5-YR falls fastest. 15-YR following. 32-YR still in the ~45-65 range but trending down. The June trough is the seasonal target.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★", note: "Feb: all TFs in decline; 5-YR dropping sharply" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★", note: "Continued decline; sell any rally" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★", note: "Mid-Feb; 5-YR and 15-YR accelerating lower" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★", note: "Late-Feb; 32-YR at ~45-55 and falling" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig32: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "32-YR SHARP DIP to ~25 then recovers. 5-YR continues falling hard. 15-YR also down. The 32-YR spike-down and recovery is notable — a false long signal. Stay short overall.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★", note: "32-YR dipping sharply to ~25; 5-YR and 15-YR also declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "chop", com: "SHORT ★★★",  note: "32-YR at trough (~25-30) then bouncing; don't be fooled" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "chop", com: "SHORT ★★★",  note: "32-YR recovering from Mar dip; 5-YR and 15-YR still weak" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★",  note: "Late-Mar: 32-YR resumes decline toward June trough" },
    ],
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig32: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All three TFs declining in unison toward the June annual trough. 5-YR now in the 35-50 range. 15-YR at 40-55. 32-YR at ~40-55. Trend is clear — stay short.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★", note: "Apr: all TFs trending toward June trough — hold shorts" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★", note: "Continued decline; 5-YR now below 50" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★",  note: "Mid-Apr; 32-YR approaching 40; sell rallies" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★",  note: "Late-Apr: all TFs continuing lower into May-June" },
    ],
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig32: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Approaching the annual trough zone. All three TFs near their lows. 5-YR and 15-YR close to 0. 32-YR at ~15-25. The June 30/July 1 trough is the most extreme reading of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★", note: "May: 5-YR and 15-YR near 0; 32-YR at 15-25 — trough approaching" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★", note: "All TFs at or near lows; final leg into June trough" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★",  note: "Pre-trough; all declining toward 0" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★",  note: "Late-May: positioning for trough; cover shorts at Jun 30" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig32: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "ANNUAL TROUGH — ALL THREE TFs hit near 0 at June 30 / July 1. The most extreme seasonal trough in the entire dashboard. 5-YR: ~0; 15-YR: ~0; 32-YR: ~0. COVER ALL SHORTS at the June 30 low. Flip immediately long for July recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★★", note: "June opens at near-zero; all TFs at absolute floor — deepest bear in dashboard" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★★", note: "All near 0; 32-YR may be the only TF with measurable reading" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★",  note: "Approaching Jun 30 trough; max short conviction" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s32: "chop", com: "CHOP",         note: "Jun 30/Jul 1: ANNUAL TROUGH near 0. Cover shorts. Flip long for July recovery" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig32: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Post-trough bounce — all TFs rising sharply from near 0. 32-YR recovers to ~40-50 by month-end. 15-YR and 5-YR also bouncing. The seasonal low is in — buy the July recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Jul 1: bounce from June trough; all TFs recovering fast" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Recovery accelerating; 32-YR approaching ~30-40" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Mid-Jul: 32-YR at ~40-50; all TFs rising" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★",  note: "Late-Jul: recovery well-established; hold longs toward Aug-Sep" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig32: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "32-YR at ~40-50 and rising. 15-YR and 5-YR continuing their post-trough recovery. 32-YR climbing toward its November annual high (~100). Buy August dips.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Aug: all TFs continuing post-trough recovery" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "32-YR at ~45-55; climbing steadily" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Mid-Aug; 15-YR and 5-YR recovering pace" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Late-Aug: 32-YR approaching 50-60; hold into Sep-Oct" },
    ],
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig32: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "32-YR recovering to ~65. 15-YR and 5-YR also rising from July trough. All TFs trending toward November peak. Stay long — seasonal tailwind building.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Sep: 32-YR at ~55-65; all TFs climbing" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Recovery continues; 32-YR surging" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Mid-Sep; 32-YR at ~65; momentum building toward November" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★", note: "Late-Sep: accelerating toward Oct-Nov highs" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig32: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs surging toward the November peak. 32-YR at ~70-85 and rising. 15-YR and 5-YR also approaching highs. Best pre-peak long month — maximum position size.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Oct: all TFs surging; 32-YR at 70-80 and rising fast" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Strong seasonal tailwind; hold maximum longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Mid-Oct: 32-YR at ~80-85; approaching November peak" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★", note: "Late-Oct: final run into November; maintain full longs" },
    ],
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig32: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "32-YR surges to ~100 — ANNUAL HIGH for the long-term timeframe. But SIMULTANEOUSLY: 5-YR and 15-YR begin their collapse from highs. 32-YR peaks then reverses by month-end. FLIP POINT: exit 32-YR longs at November high, flip short on shorter TFs immediately.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s32: "bull", com: "LONG ★★★★",  note: "Early Nov: 32-YR at ~90-100 (annual high approaching); 5-YR and 15-YR also high" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s32: "bull", com: "LONG ★★★",   note: "32-YR at ~100 (annual HIGH); shorter TFs topping out — tighten stops" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "chop", com: "SHORT ★★★",   note: "FLIP: 5-YR and 15-YR turn hard bear from highs; 32-YR also turning" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★",  note: "All TFs collapsing from November peak; maximum short from here" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig32: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "CATASTROPHIC YEAR-END COLLAPSE — 32-YR from ~100 to ~65; 15-YR to ~13; 5-YR to ~1. The crash is steeper for shorter TFs. Year closes at the same depressed levels it opened with for 15-YR and 5-YR. SHORT from November peak with maximum conviction.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★★", note: "Dec crash: 32-YR falling fast from 100; 5-YR and 15-YR near 0 already" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★★", note: "All TFs in freefall; maximum short conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★★", note: "32-YR at ~75-80; 15-YR at ~25; 5-YR near 5" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s32: "bear", com: "SHORT ★★★★★", note: "Year closes: 32-YR ~65, 15-YR ~13, 5-YR ~1. Same floor as January" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 30-Day Federal Funds (CBOT) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 30-Day Federal Funds (CBOT)
Exchange: CBOT | Seasonal History: 32-Year (1988–2019)

YEARLY ARC:
CRITICAL: This instrument is INVERTED vs all other rates instruments.
Shorter TFs are HIGHEST in January (5-YR ~100, 15-YR ~88-90, 32-YR ~65-75).
All declining Jan through May-June toward the annual trough.
March: 32-YR dips sharply to ~25 (brief dip), then partial recovery.
June 30/July 1: ALL THREE TFs at near 0 — annual TROUGH (most extreme in dashboard).
July: Recovery bounce; all TFs rising.
August-October: Recovery continues; 32-YR climbing toward ~65-80.
November: 32-YR surges to ~100 (ANNUAL HIGH for 32-YR). 5-YR and 15-YR simultaneously collapse.
December: SHARP COLLAPSE — 32-YR: 100→65; 15-YR: →13; 5-YR: →1.
Year closes at SAME depressed levels as it opened (for 5-YR and 15-YR).

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | 5-YR at 100 peak; 32-YR at 65-75; all declining. Inverted instrument.
Feb  — SHORT ★★★   | All TFs declining from Jan peaks
Mar  — SHORT ★★★★  | 32-YR dips to ~25 then recovers; net bear
Apr  — SHORT ★★★★  | All three declining toward Jun trough
May  — SHORT ★★★★  | Approaching trough; 5-YR and 15-YR near 0
Jun  — SHORT ★★★★★ | ANNUAL TROUGH: ALL TFs at ~0 on Jun 30/Jul 1
Jul  — LONG  ★★★★  | Post-trough bounce; all TFs recovering fast
Aug  — LONG  ★★★   | Recovery continues; 32-YR at 40-50
Sep  — LONG  ★★★   | 32-YR climbing to 65; all aligned
Oct  — LONG  ★★★★  | Surging toward Nov; maximum pre-peak positioning
Nov  — FLIP  ★★★★  | 32-YR hits 100 (annual high) then ALL CRASH; flip short
Dec  — SHORT ★★★★★ | 32-YR: 100→65; 15-YR: →13; 5-YR: →1. Max conviction short.

KEY OBSERVATIONS:
- INVERTED vs all other rates: shorter TFs are seasonally HIGHEST in January, not lowest
- The June 30/July 1 trough hits 0 for ALL THREE TFs simultaneously — unique in the dashboard
- November is a flip month: 32-YR peaks at 100 exactly as 5-YR and 15-YR collapse
- December is one of the two ★★★★★ bear months (June being the other)
- The March dip to ~25 for the 32-YR looks like a reversal but is a false signal — trend resumes
- Year-end floor for 5-YR (~1) and 15-YR (~13) mirrors the January opening — perfect seasonal reset
- 32-YR is the most tradeable TF; 5-YR and 15-YR are almost binary (at 0 most of the year)
`;
