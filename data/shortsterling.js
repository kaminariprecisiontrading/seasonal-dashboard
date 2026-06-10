// shortsterling.js — 3-Mth Short Sterling (LIFFE) · 38-Year Seasonal (1982–2019)

const ASSET_CONFIG = {
  id:       "shortsterling",
  name:     "3-Mth Short Sterling (LIFFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 38-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Month Short Sterling LIFFE · 38-Year Seasonal (1982–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "38-YR",
  ltSigKey: "sig38",
  ltKey:    "s38",
  ltAccent: "#6d28d9",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Year opens at mixed levels (38-YR ~44, 15-YR ~42, 5-YR ~10). All three TFs at moderate/low levels after December's complex year-end pattern. Choppy, no clean directional edge.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "chop", com: "CHOP",      note: "Jan opens mixed; 5-YR very low (~10), 38-YR and 15-YR moderate (~42)" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "chop", com: "CHOP",      note: "No directional signal; 5-YR beginning to recover" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★",   note: "38-YR beginning to surge from moderate levels" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Late-Jan: all TFs recovering ahead of explosive February spike" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "38-YR spikes dramatically to ~90+ early February; 15-YR also surges toward 100. This is the first major seasonal peak. HOWEVER: late February reversal and crash follows.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull",  s38: "bull",  com: "LONG ★★★★★", note: "38-YR spikes to ~90+; 15-YR near 100 — massive early Feb spike" },
      { wk: "Wk 2", s5: "bull",  s15: "bull",  s38: "bull",  com: "LONG ★★★★",  note: "38-YR and 15-YR at extreme highs; hold but tighten stops" },
      { wk: "Wk 3", s5: "chop",  s15: "chop",  s38: "chop",  com: "CHOP",        note: "Peak zone; 38-YR and 15-YR beginning to reverse from highs" },
      { wk: "Wk 4", s5: "bear",  s15: "bear",  s38: "bear",  com: "SHORT ★★★",   note: "Late-Feb crash begins; flip short for March decline" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "FIRST MAJOR CRASH — all TFs crash to near 0 from February peak highs. The crash from 90+ to near 0 in ~4–6 weeks is the most violent seasonal move of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "Crash from Feb highs; 38-YR and 15-YR collapsing to near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "Deepest trough; 38-YR at 0 — maximum bear conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★",  note: "Trough persists; 5-YR also at near zero" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP",        note: "Base forming; late-March stabilisation before April recovery" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Recovery from March lows; 38-YR recovers to ~50–75, 15-YR and 5-YR also rebounding. All TFs rising toward May-June peak. Buy the March low aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "Recovery from crash lows; all TFs rebounding" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "Strong recovery; 38-YR to ~50–60 area" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Sustained recovery; hold longs into May" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Month-end; all TFs aligned bullish into explosive May" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Strong bull surge; 38-YR to ~75–90, 15-YR at ~65–70, 5-YR at ~75–85. All TFs approaching their June peaks. Second highest-conviction long month of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "38-YR surging to ~75; maximum May conviction" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "All three TFs at 65–90+; hold maximum longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "38-YR approaching 90; tighten stops as June peak nears" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",   note: "Late-May: all TFs high; June peak is imminent — take partial profits" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "SECOND MAJOR CRASH — 38-YR and 15-YR hit ~100 early June then crash violently to near 0 by late June/early July. This is the year's most extreme reversal signal.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull",  s38: "bull",  com: "LONG ★★★",   note: "June opens with 38-YR/15-YR at ~100 (peak); hold but prepare to exit" },
      { wk: "Wk 2", s5: "chop",  s15: "chop",  s38: "chop",  com: "CHOP",        note: "Peak zone; 38-YR and 15-YR at maximums — take profits" },
      { wk: "Wk 3", s5: "bear",  s15: "bear",  s38: "bear",  com: "SHORT ★★★★★", note: "Crash begins; 38-YR and 15-YR collapsing from 100 to near 0" },
      { wk: "Wk 4", s5: "bear",  s15: "bear",  s38: "bear",  com: "SHORT ★★★★★", note: "Deep crash; all TFs near 0 — buy for July recovery" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig38: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Recovery from June crash; brief bounce for all TFs, but subdued vs the Feb and June peaks. 38-YR recovers partially. 5-YR and 15-YR tentative. Mixed signals.",
    weeks: [
      { wk: "Wk 1", s5: "chop",  s15: "chop",  s38: "bull",  com: "LONG ★★",    note: "Bounce from June crash lows; 38-YR recovering" },
      { wk: "Wk 2", s5: "chop",  s15: "chop",  s38: "bull",  com: "LONG ★★",    note: "38-YR continuing recovery; 5-YR and 15-YR tentative" },
      { wk: "Wk 3", s5: "bull",  s15: "bull",  s38: "bull",  com: "LONG ★★★",   note: "All TFs recovering; 5-YR and 15-YR joining" },
      { wk: "Wk 4", s5: "bull",  s15: "bull",  s38: "bull",  com: "LONG ★★★",   note: "Late-July: building into August-September bull run" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Recovery strengthening; all TFs rising from July lows. 5-YR advancing toward September peak near 100. 38-YR recovering toward 55–65. September is the 5-YR peak month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "Aug bull strengthening; all TFs in recovery" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "5-YR surging toward September peak; hold longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "All TFs advancing; 38-YR at ~55–65" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "Late-Aug: peak zone approaching; tighten stops on 5-YR" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig38: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "THIRD CRASH — 5-YR and 15-YR peak near 100 then crash to near 0. 38-YR more moderate. Another violent reversal. Short after the peak is confirmed.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull",  s38: "chop", com: "LONG ★★★",   note: "5-YR and 15-YR at/near 100 (peak); take profits" },
      { wk: "Wk 2", s5: "chop",  s15: "chop",  s38: "chop", com: "CHOP",        note: "Peak zone; 5-YR and 15-YR beginning rollover" },
      { wk: "Wk 3", s5: "bear",  s15: "bear",  s38: "bear", com: "SHORT ★★★★★", note: "Third crash: 5-YR and 15-YR collapsing from 100 to near 0" },
      { wk: "Wk 4", s5: "bear",  s15: "bear",  s38: "bear", com: "SHORT ★★★★",  note: "Deep trough; all TFs near 0 — buy for Oct-Nov recovery" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from September crash; all TFs rebounding from near-0 lows. 38-YR recovering to ~50–75. 15-YR and 5-YR also rising. Buy the September lows for November recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "Recovery from Sep crash; all TFs bouncing from near 0" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "38-YR recovering to ~50+; add longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "Sustained recovery; 38-YR at ~60–70" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "Late-Oct; all TFs rising into November recovery window" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "38-YR recovers to ~50–75. 15-YR and 5-YR stabilising after September crash. Moderate November recovery — 38-YR is the primary long here.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★★", note: "38-YR recovering to ~65–75; buy dips" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★",  note: "38-YR at ~70; 15-YR and 5-YR stabilising" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★★", note: "38-YR holding ~70–75; moderate November high" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "chop", com: "CHOP",     note: "Month-end; 38-YR stabilising, 5-YR/15-YR beginning final Dec decline" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Complex year-end: 38-YR spikes early (~75) then falls to ~44 by year-end. 5-YR near annual low at year-end (~10). 15-YR also declining. Wraps to January starting levels.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★",   note: "Early Dec: 38-YR spikes to ~75; brief bull before year-end decline" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "chop", com: "CHOP",       note: "38-YR begins falling from ~75; 5-YR declining" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★",   note: "Year-end selling; 38-YR falling toward ~44, 5-YR near 0" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "Final week: 5-YR at annual low (~10), 38-YR at ~44 — sets Jan starting levels" },
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
This is the most complex seasonal pattern in the entire dashboard — 3 complete crash-and-recovery cycles per year.
Year opens mixed (38-YR ~44, 15-YR ~42, 5-YR ~10) after December's late-year decline.
Early Feb: 38-YR spikes to ~90+ and 15-YR to ~100 (first peak).
Mar: CRASH #1 — all TFs crash from 90+ to near 0. Most violent seasonal crash.
Apr–May: Strong recovery — 38-YR to ~75–90, 15-YR to ~65–70, 5-YR to ~75–85.
Jun: CRASH #2 — 38-YR and 15-YR hit ~100 then crash to near 0.
Jul–Aug: Recovery — 38-YR to ~55–65, 5-YR surging toward 100.
Sep: CRASH #3 — 5-YR and 15-YR near 100, then crash to near 0.
Oct–Nov: Final recovery; 38-YR to ~50–75.
Dec: 38-YR spikes early (~75) then falls to ~44. 5-YR falls to ~10.

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | Mixed start; 38-YR at ~44 building
Feb  — LONG  ★★★   | 38-YR/15-YR spike to 90+/100; but reversal late-Feb
Mar  — SHORT ★★★★★ | Crash #1; most violent decline of the year
Apr  — LONG  ★★★★  | Recovery from March crash; all TFs rebounding
May  — LONG  ★★★★★ | All TFs at 65–90+; strong bull window
Jun  — SHORT ★★★★★ | Crash #2; 38-YR/15-YR peak then collapse
Jul  — CHOP  ★★    | Partial recovery; subdued bounce
Aug  — LONG  ★★★★  | 5-YR surging toward Sep peak; recovery strengthens
Sep  — SHORT ★★★★  | Crash #3; 5-YR/15-YR near 100 then collapse
Oct  — LONG  ★★★   | Recovery from Sep crash; 38-YR rebounding
Nov  — LONG  ★★★   | 38-YR to ~50–75; moderate recovery
Dec  — CHOP  ★★    | Early spike then year-end decline to Jan levels

KEY OBSERVATIONS:
- THREE crash-and-recovery cycles make this the most volatile seasonal in the dashboard
- The Feb crash (from 90+ to near 0 in March) is the most extreme single-move seasonal
- Each crash creates a high-conviction short entry; each recovery creates a high-conviction long entry
- 38-YR leads on recoveries; 5-YR leads into peaks before crashing
- Timing precision is critical: being early into a peak or trough costs enormous drawdown
- Year closes with 38-YR at ~44, 5-YR at ~10 — the "reset" for January
`;
