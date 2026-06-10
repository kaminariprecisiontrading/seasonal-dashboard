// sugar11.js — Sugar #11 (ICE/NYBOT) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "sugar11",
  name:     "Sugar #11 (ICE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Sugar #11 ICE (NYBOT) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#d97706",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "ALL THREE TFs start very HIGH (40-YR ~73, 15-YR ~74, 5-YR ~81) and decline steeply from year-start. The dual-trough pattern begins here — sell January strength for the May-June trough.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Jan: all TFs at 73-81, steep decline; sell immediately" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "All three falling sharply from year-start highs" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Mid-Jan; continued decline; 40-YR at ~80-85" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late-Jan; approaching Feb-Mar range ~60-75; hold shorts" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Steep decline continues — all TFs falling from Jan highs toward the April-May trough zone. No recovery in sight. 5-YR leads lower, 15-YR and 40-YR following. Hold shorts.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Feb: steep decline; 5-YR at ~55-65, 40-YR at ~65-75" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Acceleration lower; all TFs dropping toward ~45-55" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Mid-Feb; 40-YR approaching 50; hold shorts" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late-Feb; approaching March continuation" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining toward April-May trough. 40-YR at ~45-55; 15-YR and 5-YR also declining. The May-June annual low is the destination.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Mar: all three declining toward 30-50 range" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Continued decline; 40-YR at ~45-55" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Mid-Mar; approaching 30-40 range" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Late-Mar; all TFs nearing trough zone" },
    ],
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All TFs in final descent toward the May-June annual trough. 40-YR, 15-YR, 5-YR all in the 15-35 range and falling. Peak short conviction — approaching 0 for all.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Apr: all TFs at 15-35; approaching near-zero trough" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Continued decline toward 0; maximum short conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Mid-Apr; all near 10-25; trough zone imminent" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late-Apr; cover shorts soon — May-Jun trough is the floor" },
    ],
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "FIRST ANNUAL TROUGH — all TFs crash to near 0 in late May/early June. Cover shorts at the May-June low. Flip long for the July partial recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "May: all three near 0-15; final approach to trough" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Annual trough zone; 40-YR at ~5-15; 5-YR and 15-YR near 0" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Near absolute low; tighten short stops" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",        note: "Late May: COVER shorts; early June trough — flip long" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "All TFs at trough (~0) then recover sharply. FLIP LONG at the June low. 40-YR bounces to ~45-55 by July. 15-YR and 5-YR also recovering. The July/Aug partial recovery is tradeable.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Jun 1: trough; cover shorts / go long — all near 0" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Post-trough bounce confirmed; all TFs recovering fast" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Recovery building; 40-YR approaching 30-40" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",   note: "Late-Jun: recovery well-established; hold longs for July" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "40-YR recovers to ~45-55. 15-YR at ~35-45. 5-YR more volatile and inconsistent. Partial recovery — NOT returning to January highs. Take profits before August volatility.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Jul: 40-YR at 35-50; recovery gaining pace" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "40-YR approaching 45-55; all TFs recovering" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★",  note: "Mid-Jul; partial recovery plateauing; watch for August signal" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",     note: "Late-Jul; recovery stalling; prepare for second trough" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "SECOND TROUGH APPROACHING — 5-YR and 15-YR begin second decline. 40-YR choppy but weakening. The September crash to near 0 is coming. Reduce longs and flip short.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Aug: recovery stalling; indecision before second bear move" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★",  note: "5-YR and 15-YR turning lower; flip short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "All TFs declining toward September trough" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late-Aug; accelerating toward Sep near-zero low" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "SECOND ANNUAL TROUGH — all three TFs crash to near 0 in September. Exactly mirrors the May-June trough. COVER SHORTS immediately at September low. Flip long for the explosive October-November surge.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★★", note: "Sep: all TFs crashing to near 0 — second annual trough" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★★", note: "All near 0; maximum short conviction before the explosion" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Sep trough; cover shorts NOW — explosive surge imminent" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",         note: "Late-Sep: COVER ALL SHORTS; flip long for Oct explosion" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "EXPLOSIVE SURGE — all three TFs rocket from near-0 to ~65-80 in October. The most powerful seasonal recovery in Sugar. Maximum conviction long from September low through November.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "LAUNCH: all TFs surging from Sep 0 → 40-60 in one week; maximum urgency" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "Explosive rally continues; 40-YR at 55-70; hold maximum longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Oct 3rd week; approaching 70-80; tighten stops but hold" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Late-Oct; 40-YR at ~70-80; heading into November peaks" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs near seasonal highs: 40-YR at ~75-80, 15-YR at ~80-90, 5-YR at ~80-90. The year-end cycle has returned to near Jan levels. Begin taking profits ahead of December.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Nov: all TFs at 75-90; near annual highs — tighten stops" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "All near 80-90; begin scaling out" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Nov highs; reduce position — Dec volatility ahead" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Late-Nov; carry remaining longs into Dec year-end" },
    ],
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Year-end elevated — 40-YR at ~73 (cursor), 15-YR at ~74, 5-YR at ~81. All near January starting levels. Carry longs but prepare for January sell-off. The cycle resets.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Early Dec; all at 70-85; carry longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Mid-Dec; elevated but watch for early Jan sell trigger" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Late Dec; 40-YR ~73, 15-YR ~74, 5-YR ~81 — cycle resets Jan" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",     note: "Year-end; begin reducing — Jan bear phase begins immediately" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Sugar #11 (ICE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Sugar #11 (ICE/NYBOT)
Exchange: ICE (formerly NYBOT) | Seasonal History: 40-Year (1980–2019)

YEARLY ARC:
DUAL-TROUGH INSTRUMENT: Two separate near-zero crashes per year.
Year opens very high (40-YR ~73, 15-YR ~74, 5-YR ~81 — ALL in the 73-81 range).
Jan-May: Steep, relentless decline. All three TFs fall from 73-81 to near 0.
May-Jun: FIRST ANNUAL TROUGH — all TFs near 0. Cover shorts, flip long.
Jul: Partial recovery — 40-YR to ~45-55. NOT returning to January highs.
Aug: Second bear begins. All TFs weakening again.
Sep: SECOND ANNUAL TROUGH — all three again near 0. Exactly mirrors May-June.
Oct: EXPLOSIVE SURGE — all TFs rocket from 0 to ~65-80. Most powerful monthly surge.
Nov: Peak zone — 40-YR at ~75-80, others at ~80-90.
Dec: Elevated (73/74/81 cursor values) — mirrors January opening.

MONTHLY SIGNALS:
Jan — SHORT ★★★★  | All TFs at 73-81; sell immediately from year-start
Feb — SHORT ★★★★  | Steep decline continues toward April-May lows
Mar — SHORT ★★★   | All declining to 30-50 range
Apr — SHORT ★★★★  | All near 15-35; approaching trough
May — SHORT ★★★★  | First trough near 0; cover at low; flip long
Jun — FLIP  ★★★★  | Trough then explosive recovery; long from June low
Jul — LONG  ★★★   | 40-YR at 45-55; partial recovery only
Aug — SHORT ★★★   | Second bear begins; all weakening
Sep — SHORT ★★★★★ | Second trough near 0; cover; flip long for Oct explosion
Oct — LONG  ★★★★★ | Most explosive monthly surge; 0→65-80 in October
Nov — LONG  ★★★★  | All TFs at 75-90; near year-high; scale out
Dec — LONG  ★★★   | Year-end elevated; mirrors January; cycle resets

KEY OBSERVATIONS:
- Two IDENTICAL near-zero troughs: May-June AND September. Both are real buy signals.
- The October surge from the September trough is the most explosive single-month move in this asset.
- All three TFs move together throughout the year — unusually high TF alignment.
- Year-end (Dec close: ~73/74/81) nearly matches year-open — a perfect seasonal reset.
- The July partial recovery (~45-55 for 40-YR) does NOT reach the January highs; do not expect full recovery.
`;
