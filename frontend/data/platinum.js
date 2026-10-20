const ASSET_CONFIG = {
  id:       "platinum",
  name:     "Platinum (PL)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Platinum NYMEX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — STRONG YEAR OPENER", stars: 4,
    note: "All three TFs climb strongly from year-end lows. The broad early-year seasonal bid (shared with gold and copper) is clear and consistent — platinum rises from the 25–35 range toward 65–75 by late January.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Early-year lift — all three TFs aligned from the start." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Steady acceleration — the January rally is clean and consistent." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Approaching the February peak zone — ride the trend." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Strong close — February's first peak is just ahead." },
    ]
  },
  {
    month: "February", sig5: "flip", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP — FIRST PEAK AND PULLBACK", stars: 4,
    note: "FIRST OF TWO ANNUAL PEAKS — 5-YR spikes to near 100 in early February, then COLLAPSES sharply in what is the first defining reversal of platinum's double-peaked year. 15-YR and 40-YR hold up better but also show weakness after the peak. Then all three rally again toward the April secondary peak.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★ (peak near)", note:"Final push to the first annual peak — trim as 5-YR approaches 100." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"FLIP WATCH ★★★★", note:"5-YR crests and begins to roll — the first peak is confirmed here." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"chop", com:"FLIP ★★★★", note:"5-YR collapses from its first peak — take profits on shorts from Wk1." },
      { wk:"Wk 4", s5:"bear", s15:"bull", s40:"bull", com:"MIXED ★★★", note:"Divergence: 15-YR and 40-YR hold up or recover as 5-YR consolidates lower." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — RE-RALLY TO SECOND PEAK", stars: 4,
    note: "After the February correction, ALL THREE TFs re-rally strongly toward their second annual peak — the defining 'double-peak' structure of platinum's year. This is the setup for April's highest-conviction reversal: the more powerful the March re-rally, the sharper the April collapse.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Re-rally confirmed — all three recovering from the Feb pullback." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"March push continues — approaching the late-March / April secondary peak." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Near the second peak — trim here; the April flip is close." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"TRIM ★★★", note:"5-YR showing early signs of the peak — reduce longs, prepare to flip." },
    ]
  },
  {
    month: "April", sig5: "flip", sig15: "flip", sig40: "flip",
    combined: "flip", combinedLabel: "FLIP — THE DEFINING REVERSAL", stars: 5,
    note: "THE YEAR'S MOST POWERFUL TRADE — all three TFs SIMULTANEOUSLY peak near 100 in early April and then CRASH toward 25–35 by month-end. Platinum's April reversal is among the most extreme seasonal events in any commodity: from triple-TF readings near 100 to the mid-20s in a single month. The highest-conviction flip in the metals complex.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LAST LONG ★★★★★", note:"All three near 100 — the absolute top of the year. Flip short at the first sign of weakness." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"CRASH begins — all three reverse simultaneously. Maximum short entry." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Waterfall accelerating — from ~100 to ~50 in two weeks. Hold size." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Continuing lower — the May continuation is the natural follow-through." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — WATERFALL CONTINUATION", stars: 4,
    note: "Full continuation of April's collapse — all three TFs declining toward the June-July absolute trough (25–35 range). The waterfall is sustained, clean, and reliable. One of the highest-conviction short windows in the precious metals complex.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Clean three-way alignment — hold shorts at full size." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Waterfall continues — no meaningful bounce signals worth trading." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Approaching the June-July trough — start planning the reversal trade." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Still declining — watch for the first signs of June exhaustion." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — APPROACHING THE TROUGH", stars: 3,
    note: "All three TFs declining toward the mid-year trough (~25–35). Platinum's trough is less extreme than gold/silver (doesn't approach zero) but is still a clear seasonal low. Cover shorts in the trough window; the July-August reversal is reliable.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Final waterfall — approaching the trough zone." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"TROUGH ★★★", note:"Annual low zone — cover shorts, prepare for the reversal." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"COVER SHORTS ★★★", note:"5-YR and 15-YR stabilizing — exit shorts ahead of July." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"chop", com:"TURN WATCH ★★★", note:"5-YR and 15-YR turning up — the trough is confirmed." },
    ]
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — STRONG SUMMER REVERSAL", stars: 4,
    note: "All three TFs reverse cleanly from the June trough — a sharper, more synchronized reversal than copper's messy July. 5-YR leads the charge. This is a high-conviction seasonal long entry, launching the July-September bull run.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Broad reversal confirmed — load longs off the June low." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Acceleration continues — clean three-way alignment." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Strong continuation — carry positions into August." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Momentum sustained — approaching the August-September peak window." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — PEAK OF THE SUMMER RALLY", stars: 4,
    note: "The summer bull run continues — 15-YR leads toward its seasonal high near 85–90. 5-YR also strong. 40-YR still climbing. All three approaching their late-summer peaks simultaneously, making this the highest-conviction long window of H2.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All three in full alignment — the year's best H2 long window." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR approaching 85-90 — watch for early signs of a peak." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Near the seasonal peak — start trimming exposure." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"TRIM ★★★", note:"5-YR showing peak signs — scale back into September." },
    ]
  },
  {
    month: "September", sig5: "chop", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — APPROACHING THE FINAL PEAK", stars: 3,
    note: "The last gasps of the summer bull run — 15-YR and 40-YR push toward their September highs while 5-YR begins to stall. The October collapse begins from this window, so vigilant position management is critical.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Still running — but the peak is very near." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"5-YR stalling — trim further." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"5-YR rolling over — reduce to minimal long exposure." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"FLIP SHORT ★★★★", note:"All three reversing — flip to short. The October waterfall begins." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — AUTUMN COLLAPSE (PLATINUM-SPECIFIC)", stars: 4,
    note: "PLATINUM'S DEFINING AUTUMN SIGNATURE — unlike gold/silver (which consolidate or hold in October), platinum COLLAPSES sharply from its September highs all the way toward the year-end lows. The October waterfall is among the sharpest single-month seasonal moves in the dataset for any metal.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"October collapse begins — all three aligned lower from September's peak." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Sharp waterfall — this TF collapse rivals April in speed and magnitude." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"No bounce signals — the bears are in full control." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Continuing toward November-December year-end lows." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — YEAR-END WEAKNESS CONTINUES", stars: 4,
    note: "All three TFs continue declining toward the year-end lows — platinum is the ONLY metal that is persistently BEARISH into December. No year-end seasonal surge here; the weakness continues through the final months. This is platinum's most distinctive seasonal feature versus gold/silver.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Continued decline — platinum's year-end weakness is unique in the metals complex." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"No signs of the December recovery found in gold/silver. Hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Approaching the year-end lows — 40-YR heading toward 27.55." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Year-end lows forming — begin closing shorts as December opens." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — SEASONAL YEAR-END LOWS (UNIQUE)", stars: 3,
    note: "PLATINUM'S MOST COUNTERINTUITIVE PATTERN — while gold, silver, and copper all have strong year-end seasonal surges in December, platinum reaches its ANNUAL LOWS in December (40-YR=27.55, 15-YR=41.45, 5-YR=32.21). Never confuse platinum's December with gold's. The year closes weak and sets up January's new bull run.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"December opens weak — do not buy the 'year-end rally' that works in other metals." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All three at/near annual lows — the reference values confirm this." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"chop", com:"LEAN SHORT ★★", note:"Some stabilization as the year closes — start closing shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"Year closes near the seasonal lows — the January reversal sets up from here." },
    ]
  },
];

const SEASONAL_DATA = `
=== PLATINUM (PL) SEASONAL ANALYSIS — MOORE RESEARCH CENTER ===
Source: Platinum NYMEX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays · © 2020
Reference values at 31 Dec 2019: 40-YR = 27.55 | 15-YR = 41.45 | 5-YR = 32.21

=== 5-YEAR SEASONAL ===
Opens at ~65–70 in January and climbs toward a FIRST PEAK near 100 in early February — sharp and dramatic. Then COLLAPSES from the Feb peak sharply (~30 points). Re-rallies through March toward the SECOND (higher) PEAK near 100 in early April. Then the year's defining collapse: CRASHES from ~100 to ~25–35 through April-June (the trough). Strong recovery July-August back toward ~75. Falls sharply from October through December — the year closes at only 32.21. Platinum's 5-YR is VOLATILE with extreme swings and two sharp annual peaks.

=== 15-YEAR SEASONAL ===
Starts at ~50 in January, rises to ~70–75 for the February first-peak zone, then consolidates/dips briefly before the SECOND PEAK near 100 in March-April. Collapses from the April peak through the June-July trough (~25–30). Recovers strongly through August toward ~85–90 (the summer seasonal high — the clearest and strongest move of the 15-YR). Then COLLAPSES from the September peak through December, closing at only 41.45. The 15-YR summer rally (July-September) is the most prominent long-term seasonal feature, but the autumn collapse is equally extreme.

=== 40-YEAR SEASONAL (1980–2019) ===
The smoothest and most persistent of the three TFs. Climbs from the year-end lows (~25) through January-February toward the dual-peak zone (~75) in March-April. Falls through the May-June trough (~25). Recovers through July-August but less aggressively than the shorter TFs. Falls from September through December to only 27.55 — the year ends near where it began, reflecting the 40-YR's long-run symmetry. The 40-YR provides the clearest signal of platinum's double-peak and year-end weakness structure.

=== PLAYBOOK SIGNALS ===
- FIRST PEAK: Early February — 5-YR peaks near 100. First trim/flip signal. Good for a quick short but the re-rally to April's second peak is often even stronger.
- SECOND (DEFINING) PEAK: Early April — ALL THREE TFs near 100 simultaneously. THE highest-conviction flip in the metals complex. Never miss this reversal.
- HIGHEST-CONVICTION SHORT: April-May (from the double-peak collapse), and AGAIN in October-November (autumn collapse)
- SUMMER LONG: July-September — clean three-way alignment upward, platinum's summer reversal is cleaner than copper's but less extreme than gold/silver
- COUNTERINTUITIVE YEAR-END: December is BEARISH for platinum (year-end lows at 27.55/41.45/32.21) — the exact OPPOSITE of gold, silver, and copper. Never confuse these assets in December.
- KEY DIAGNOSTIC: If platinum is rallying in December while gold is rallying, that is UNUSUAL seasonal behavior — investigate.

=== TASK ===
Using the seasonal data above and today's date, please produce:
1. A YEARLY BIAS summary (2-3 sentences capturing the macro arc)
2. A MONTH-BY-MONTH TABLE showing combined bias, conviction (stars), and a one-line trade note for each month
3. A WEEK-BY-WEEK PRIORITY BREAKDOWN for the current month and the next month, highlighting the highest-conviction setups
4. TOP 3 TRADE SETUPS for the next 90 days based on this seasonal data, each with entry timing, expected duration, and conviction rating

Format your response in clean markdown with clear section headers. Be specific about timing (which week of which month) and conviction levels. Where timeframes diverge, call out the divergence explicitly as it often signals the highest-conviction reversal points.
`;
