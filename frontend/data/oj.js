// oj.js — Orange Juice (ICE/NYBOT) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "oj",
  name:     "Orange Juice (ICE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Orange Juice ICE (NYBOT) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#ea580c",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR at ANNUAL HIGH (~95-100 at Jan 1) then crashes sharply through January. 40-YR very low (~38-40). 15-YR moderate (~50). Extreme TF divergence — 5-YR sell-off dominates while longer TFs remain subdued.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s40: "chop", com: "CHOP",      note: "Jan 1: 5-YR at ~95-100 (annual high); crashing. 40-YR at ~38-40; 15-YR ~50" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s40: "chop", com: "SHORT ★★",  note: "5-YR crashing from 100 toward 65-75; 40-YR and 15-YR declining" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "All three declining; 5-YR at ~70; approaching Feb crash zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Late-Jan; all three falling toward Feb 40-YR annual low" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "40-YR ANNUAL LOW — crashes to near 0 in February. 5-YR also declining (from 65-75 to 50-60). 15-YR declining. The February 40-YR crash is the most extreme of any month for the long-term line.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "40-YR crashes to near 0 (annual low!); 5-YR at ~65, declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "40-YR at annual trough; 5-YR and 15-YR also declining" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",        note: "40-YR at trough; slow recovery beginning; cover 40-YR shorts" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",        note: "Late-Feb; 40-YR recovering slowly from near-0; 5-YR declining to 55" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "All TFs in the middle range with no clear direction. 40-YR at ~20-30 (slow recovery from Feb). 5-YR at ~50-70 (volatile). 15-YR at ~25-40. No clean signal — avoid.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Mar: 40-YR at ~20-30 recovering slowly; 5-YR volatile at 50-70" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "All TFs in no-man's land; wait for signal" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Mid-Mar; indecision continues; 40-YR at ~25-35" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Late-Mar; no conviction; 5-YR declining toward 40-50" },
    ],
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Still no clean trend — 5-YR volatile at 45-70, 15-YR at 25-50, 40-YR at 25-45. Choppy pattern with sharp reversals. Avoid April — wait for May-June signal.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Apr: all TFs choppy; 5-YR volatile; no signal" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Volatile mid-range; avoid" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Mid-Apr; indecision; approaching May-Jun weak period" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Late-Apr; all TFs beginning second decline" },
    ],
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "5-YR approaches second seasonal low (near 0-25 in late May/June). 40-YR also weak at ~15-30. 15-YR declining. The May-June weakness parallels the Feb 40-YR crash.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "May: 5-YR declining toward 25; 40-YR at 15-30" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "All three declining; 5-YR approaching 0-25 zone" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Mid-May; 5-YR near 0-15; 40-YR and 15-YR also weak" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Late-May; 5-YR at trough; stabilisation before July recovery" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "chop", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "5-YR at seasonal low (near 0); 40-YR and 15-YR moderately weak at 20-35. No strong recovery yet — summer continues to be weak for OJ. July recovery begins only at the very end.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s40: "chop", com: "SHORT ★★★", note: "Jun: 5-YR near 0; 40-YR at 20-35; all subdued" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s40: "chop", com: "SHORT ★★",  note: "5-YR at summer trough; 40-YR and 15-YR still weak" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Mid-Jun; 5-YR recovering slightly; no conviction" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Late-Jun; stabilisation; early July recovery building" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Mixed signals — 5-YR recovering slightly to ~25-40; 40-YR at 30-50 bouncing; 15-YR recovering to ~35-55. Not a clean long setup — August brings another decline for 40-YR and 15-YR.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "CHOP",       note: "Jul: early recovery attempt; 5-YR to ~25-40; 40-YR to 30-50" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Recovery stalling; mixed signals across TFs" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Mid-Jul; 40-YR and 15-YR choppy; 5-YR stalling" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",   note: "Late-Jul; all three declining toward August second crash" },
    ],
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "40-YR and 15-YR both dip to SECOND SEASONAL LOW (~0-15) in August. Another crash point. The October surge will be the recovery. 5-YR more volatile but also weak.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Aug: 40-YR crashing to ~15-25; 15-YR also declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "40-YR and 15-YR at ~0-15 (second seasonal low); 5-YR declining" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Second seasonal low; cover shorts — October surge imminent" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Late-Aug; trough base forming; cover shorts; prepare for Sep-Oct surge" },
    ],
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "SECOND SEASONAL LOW then SURGE begins. 40-YR at/near 0 then EXPLOSIVE recovery starting. All TFs turning bullish. Go long aggressively at September low for the November annual high target.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Sep 1: all near 0-15; trough; cover any remaining shorts" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "LAUNCH: all TFs surging from Sep trough; buy immediately" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "40-YR surging from 0 toward 40-55; maximum long conviction" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Late-Sep; all three TFs rising strongly; hold full position" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "EXPLOSIVE SURGE — 40-YR rockets from near 0 to ~65-75. 15-YR also surging strongly. 5-YR recovering. This is one of the most powerful seasonal surges in the softs complex. MAXIMUM CONVICTION LONG.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "Oct: all TFs surging; 40-YR at 40-55; explosive momentum" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "40-YR at 55-65; 15-YR also surging; hold full position" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Mid-Oct; 40-YR at ~65-75; approaching November annual high" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Late-Oct; 40-YR at ~70-80; November 15-YR peak incoming" },
    ],
  },
  {
    month: "November", sig5: "bear", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "15-YR reaches ANNUAL HIGH (~100) in November. 40-YR also near peak (~80-90). 5-YR turns lower from its own recovery. FLIP POINT — exit longs at November 15-YR peak. December decline follows for 5-YR and eventually all TFs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Nov: 15-YR at ~80-95 and rising; 40-YR at ~75-85; hold longs" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★★",   note: "15-YR at annual high ~100; begin scaling out of longs" },
      { wk: "Wk 3", s5: "bear", s15: "chop", s40: "chop", com: "CHOP",        note: "5-YR turning lower from Nov high; mixed signals; reduce further" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",   note: "Late-Nov; all TFs turning lower; exit remaining longs" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "5-YR declines sharply from November peak to ~25 (cursor). 15-YR declining from ~100 to ~69. 40-YR declining from ~80-90 to ~57. Year closes well below November highs. The 5-YR collapse is the most dramatic.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Dec: all TFs declining from Nov highs; 5-YR falling fastest" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "5-YR at ~40-50; 15-YR at 75-85; 40-YR at ~70-75; all declining" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Mid-Dec; 5-YR approaching ~25; 15-YR to ~69; 40-YR to ~57" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Year-end cursor: 40-YR ~57, 15-YR ~69, 5-YR ~25. Decline continues into Jan" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Orange Juice (ICE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Orange Juice (ICE/NYBOT)
Exchange: ICE (formerly NYBOT) | Seasonal History: 40-Year (1980–2019)

YEARLY ARC:
DUAL-CRASH INSTRUMENT for 40-YR: Two separate near-zero crashes per year.
January: 5-YR at ANNUAL HIGH (~95-100 at Jan 1) then crashes hard. 40-YR very low (~38-40).
February: 40-YR crashes to NEAR 0 (FIRST ANNUAL LOW). 5-YR also declining.
March-June: All TFs weak and choppy in middle ranges. 5-YR reaches its own summer low.
July-August: Mixed; 40-YR and 15-YR dip to SECOND ANNUAL LOW in August.
September: ALL TFs SURGE from September trough — explosive launch.
October: Most explosive surge month — 40-YR rockets from ~0 to ~65-75.
November: 15-YR reaches ANNUAL HIGH (~100). 40-YR at ~80-90.
December: Sharp decline from November peaks: 40-YR to ~57, 15-YR to ~69, 5-YR to ~25.

MONTHLY SIGNALS:
Jan — CHOP  ★★    | 5-YR at 100 crashing; 40-YR very low; extreme TF divergence
Feb — SHORT ★★★★  | 40-YR ANNUAL LOW (near 0); first crash — sell
Mar — CHOP  ★★    | All TFs in middle; no direction; avoid
Apr — CHOP  ★★    | Volatile and directionless; avoid
May — SHORT ★★★   | Second decline; 5-YR near 0; all weak
Jun — SHORT ★★★   | 5-YR at trough; 40-YR/15-YR weak
Jul — CHOP  ★★    | Recovery attempt; inconsistent; hold off
Aug — SHORT ★★★   | 40-YR and 15-YR hit second annual low near 0
Sep — LONG  ★★★★  | ALL TFs surge from Sep trough — explosive launch
Oct — LONG  ★★★★★ | Most powerful surge — 40-YR from 0 to 65-75
Nov — FLIP  ★★★★  | 15-YR at 100 (annual high); all peak then turn; exit longs
Dec — SHORT ★★★   | Sharp decline: 40-YR 80→57; 15-YR 100→69; 5-YR 90→25

KEY OBSERVATIONS:
- 5-YR is at its ANNUAL HIGH on January 1 — the only instrument where the highest reading is at year start
- The 40-YR has two near-zero crashes: February AND August. Both are real sell signals.
- October is the most explosive single surge month in OJ — rival to Sugar #11's October move
- November is a clean flip point — 15-YR annual HIGH at ~100 then immediate reversal
- December 5-YR decline (from ~90-100 to ~25) is one of the steepest month-over-month drops
- The February 40-YR crash and the August 40-YR crash are the two best short entries
`;
