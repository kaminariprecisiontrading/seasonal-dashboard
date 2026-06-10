// londonsugar.js — London Sugar No.5 (LCE) · 30-Year Seasonal (1990–2019)

const ASSET_CONFIG = {
  id:       "londonsugar",
  name:     "London Sugar (LCE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 30-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · London Sugar No.5 LCE · 30-Year Seasonal (1990–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "30-YR",
  ltSigKey: "sig30",
  ltKey:    "s30",
  ltAccent: "#854d0e",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining from year-start. 5-YR high (~83-90 at Dec 31) but falling through January. 30-YR and 15-YR declining steadily from ~65-75. Sell rallies — the seasonal downtrend lasts through July.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Jan: 5-YR at ~85 declining; 30-YR at ~65-70 declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "All TFs declining; 30-YR at ~60-65" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Mid-Jan; 5-YR declining from year-start high" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Late-Jan; all three declining; February flash-crash approaching" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "15-YR SHARP FLASH-CRASH to near 0 mid-February — then recovers. 30-YR declining steadily. 5-YR choppy. The 15-YR crash is the notable anomaly here; the dominant trend remains down.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s30: "bear", com: "SHORT ★★",  note: "Feb: 30-YR declining; 15-YR fading" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "15-YR flash-crash to near 0 mid-Feb; cover briefly — not a sustained trough" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "bear", com: "SHORT ★★",  note: "15-YR partially recovering from crash; 30-YR still declining" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Late-Feb; all TFs declining; trend clear into March" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued decline across all TFs. 30-YR at ~50-60; 15-YR at ~45-55; 5-YR at ~60-70. No seasonal bottoms here — the downtrend persists. Sell rallies.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Mar: 30-YR at ~55-60; still declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "All TFs declining; 5-YR at ~65-70" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★",  note: "Mid-Mar; 30-YR at ~50-55" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Late-Mar; heading toward April-May trough zone" },
    ],
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Continued decline — all TFs heading lower. 30-YR at ~35-50; 15-YR at ~30-45; 5-YR declining from ~60-65 to ~45-50. The long downtrend from January is still intact.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Apr: 30-YR at 45-50; all TFs declining; hold shorts" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Continuing lower; 15-YR approaching 30-35" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",  note: "Mid-Apr; 30-YR at ~40; 5-YR at ~50" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",  note: "Late-Apr; approaching May trough zone" },
    ],
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued decline. 30-YR at ~25-40; 15-YR at ~20-35; 5-YR at ~35-50. Approaching the deep annual trough. Hold shorts — the June surge will be sharp, so be ready to flip.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "May: 30-YR at ~35-40; declining toward June spike" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "All TFs declining; 30-YR at ~30-35" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★",  note: "Mid-May; 30-YR at ~25-30; approaching low" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",       note: "Late-May; bottoming out; June EXPLOSION imminent — cover all shorts" },
    ],
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig30: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 5,
    note: "30-YR SURGES TO ANNUAL HIGH (~95-100) — the DEFINING feature of London Sugar. This is the most dramatic single-month surge of any soft commodity in the dashboard. 15-YR follows. 5-YR less extreme. FLIP LONG aggressively early June.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "Jun: 30-YR EXPLODING from ~25 to ~95-100; maximum long conviction" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "30-YR AT ANNUAL HIGH ~95-100; 15-YR also surging; hold maximum longs" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "bear", com: "SHORT ★★★★", note: "POST-SPIKE CRASH: 30-YR crashing from 100 to ~40-45; flip short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Late-Jun: 30-YR at ~40-45 and falling fast; hold shorts into August" },
    ],
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Post-spike crash continues — 30-YR crashing from June annual high toward August annual low. 15-YR and 5-YR also declining. Strong short momentum. The crash from June 100 to August 0 is one of the biggest seasonal reversals in the dashboard.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Jul: 30-YR at ~30-40 and crashing; strong short momentum" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "All TFs declining; 30-YR at ~20-30; August low approaching" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",  note: "Mid-Jul; 30-YR at ~15-20; near annual trough" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",  note: "Late-Jul; approaching August annual low; prepare to flip" },
    ],
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sig30: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 5,
    note: "ANNUAL TROUGH — 30-YR and 15-YR crash to near 0-15. This is the year's lowest point. COVER ALL SHORTS, FLIP LONG aggressively. The Nov 5-YR surge is the key recovery target.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Aug: 30-YR at annual low near 0-10; 15-YR also at trough" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",        note: "Annual trough zone; cover all shorts; flip long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",    note: "Recovery from annual low; 30-YR rising from near 0" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",    note: "Late-Aug; 30-YR at ~15-20; recovery building" },
    ],
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from August trough. 30-YR at ~20-30; 15-YR at ~25-35; 5-YR rising from low. All TFs in recovery mode. Add to longs — targeting November 5-YR surge.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Sep: 30-YR at ~20-25; all recovering from August low" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Recovery accelerating; 30-YR at ~25-30" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Mid-Sep; 5-YR leading recovery" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Late-Sep; all TFs recovering; October recovery incoming" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Continued recovery — 30-YR at ~30-40; 15-YR at ~35-45; 5-YR at ~60-70. All TFs rising. Hold longs for November 5-YR spike.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Oct: 30-YR at 30-35; 5-YR at 55-65; rising" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "All TFs recovering; 15-YR at ~40-45" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Mid-Oct; 5-YR approaching November high zone" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Late-Oct; all TFs rising; November 5-YR surge incoming" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig30: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR surges to ~75-80 (approaching year-start high). 15-YR at ~40-50. 30-YR choppy at ~40-45. Strong 5-YR conviction — the shorter TF dominates. Hold into December.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "chop", com: "LONG ★★★★", note: "Nov: 5-YR at ~70-75 and surging; 15-YR at ~45-50" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "chop", com: "LONG ★★★★", note: "5-YR approaching ~75-80; 30-YR at ~42 (flat/choppy)" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "chop", com: "LONG ★★★",  note: "Mid-Nov; 5-YR near Nov high; 30-YR plateauing" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "chop", com: "LONG ★★★",  note: "Late-Nov; 5-YR at ~78-82; approaching December cursor levels" },
    ],
  },
  {
    month: "December", sig5: "bull", sig15: "chop", sig30: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "End-of-year cursor levels: 30-YR at ~42, 15-YR at ~43, 5-YR at ~83. 5-YR remains elevated (the year ends high for 5-YR). 30-YR and 15-YR are mid-range. Mixed signals — the January decline for 30-YR and 15-YR begins almost immediately.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "chop", s30: "chop", com: "CHOP",       note: "Dec: 5-YR at ~80-83; 30-YR/15-YR at ~42-43; mixed" },
      { wk: "Wk 2", s5: "bull", s15: "chop", s30: "chop", com: "CHOP",       note: "5-YR still elevated; 30-YR/15-YR flat at ~42" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",       note: "Mid-Dec; all TFs choppy; end-of-year positioning" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s30: "chop", com: "CHOP",       note: "Year-end: 30-YR at ~42, 15-YR at ~43, 5-YR at ~83 — Jan decline begins" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following London Sugar No.5 (LCE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: London Sugar No.5 (LCE)
Exchange: LCE (London Commodity Exchange) | Seasonal History: 30-Year (1990–2019)

YEARLY ARC:
London Sugar is defined by one of the most extreme seasonal events in the commodities dashboard: a massive
JUNE SPIKE to 30-YR annual high (~95-100), then an equally violent CRASH to the August annual low (near 0).
Year starts with 5-YR elevated (~83-90) and declining. Jan-May: all three TFs in steady downtrend.
February: 15-YR flash-crash to near 0 (anomaly, not a sustained trough).
June: 30-YR EXPLODES to annual high (~95-100). Most dramatic short-term spike in the dashboard.
Late June-August: all TFs crash. 30-YR crashes from 100 to 0 in ~6 weeks.
August: Annual trough. 30-YR and 15-YR near 0. Flip long.
Sep-Nov: Recovery. 5-YR surges to ~75-80. 30-YR and 15-YR recover to ~40-50.
December: 5-YR at ~83, 30-YR at ~42, 15-YR at ~43. Year ends mixed.

MONTHLY SIGNALS:
Jan — SHORT ★★★   | All TFs declining from year-start; sell rallies
Feb — SHORT ★★★   | 15-YR flash-crash mid-Feb anomaly; 30-YR still declining
Mar — SHORT ★★★   | Steady decline all TFs; 30-YR at ~50-60
Apr — SHORT ★★★★  | Continued decline; 30-YR at ~35-50
May — SHORT ★★★   | Near trough; 30-YR at ~25-40; cover late-May
Jun — FLIP  ★★★★★ | 30-YR ANNUAL HIGH (~95-100); then crash; flip short at peak
Jul — SHORT ★★★★  | Post-spike crash; 30-YR from 100 to 15-20
Aug — FLIP  ★★★★★ | ANNUAL TROUGH: 30-YR near 0; flip long
Sep — LONG  ★★★   | Recovery; 30-YR at 20-30
Oct — LONG  ★★★   | Recovery continuing; 5-YR approaching Nov high
Nov — LONG  ★★★★  | 5-YR surges to ~75-80; 30-YR choppy at ~42
Dec — CHOP  ★★    | Mixed: 5-YR at 83, 30-YR/15-YR at ~42-43

KEY OBSERVATIONS:
- The June 30-YR spike (near 0 → 95-100) is the most dramatic single-month move of any soft
- The 15-YR mid-February flash-crash is a notable anomaly — it recovers; not a reversal signal
- August 30-YR trough (~0) is the single cleanest annual low in the LCE complex
- 5-YR is the strongest TF in recovery (Nov ~80) but the weakest at the June high
- Year-end cursor: 30-YR at 41.85, 15-YR at 43.12, 5-YR at 83.09
`;
