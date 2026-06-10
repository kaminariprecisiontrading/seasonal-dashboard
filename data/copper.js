const ASSET_CONFIG = {
  id:       "copper",
  name:     "Copper (HG)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Copper CMX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — BROAD EARLY-YEAR SURGE", stars: 4,
    note: "All three TFs climb strongly from year-end lows. 15-YR leads with a dramatic surge from near zero, 40-YR rises from ~50 toward ~80, 5-YR climbs toward the mid-60s. The year's strong Q1 bull run begins in force.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR rockets from near 0 — the strongest single-week move of any TF, any month." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Broad acceleration — all three in full agreement." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Momentum sustained — Copper's Q1 seasonal is one of the most reliable in commodities." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Strong close — sets up the February peak window." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — MAXIMUM ALIGNMENT, APPROACHING PEAK", stars: 5,
    note: "THE STRONGEST MONTH — all three TFs near their respective annual highs simultaneously (~85–100 range). 15-YR approaches 100. 5-YR near 85–90. 40-YR near 85. The Q1 peak forms in this window. Highest-conviction long of the first half of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Maximum three-way alignment — full size, ride the seasonal peak." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at or near 100 — the annual seasonal high for the long-term TF." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All three near peaks — start watching for distribution signals." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★ (trim)", note:"5-YR shows first stall — begin trimming; peak window is very near." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — PEAK ZONE (LATE MARCH TOPS)", stars: 4,
    note: "Still bullish overall but the top is forming. 15-YR and 5-YR both push to final highs around late March before the April waterfall begins. 40-YR also at its annual high zone. The bull continues into early-to-mid March, then distribution accelerates.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Continuation of the Q1 bull — still the highest-conviction long of the year." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Still running — but reduce size; the April reversal is close." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★ (trim)", note:"5-YR beginning to stall — trim further, tighten stops." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"chop", com:"EXIT LONGS ★★★", note:"The rolling top begins — 5-YR already turning; exit remaining longs." },
    ]
  },
  {
    month: "April", sig5: "flip", sig15: "bear", sig40: "bear",
    combined: "flip", combinedLabel: "FLIP — THE DEFINING REVERSAL", stars: 5,
    note: "THE MOST DRAMATIC REVERSAL IN COPPER'S YEAR — all three TFs CRASH from the March/April highs toward near zero. The speed and magnitude of the April collapse is the defining feature of copper's seasonal: from ~85–100 to ~10–15 in a single month. This is the highest-conviction flip of any CMX metal.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"All three break down simultaneously — the most powerful single sell signal of the year. Flip short hard." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Waterfall in progress — the collapse is as fast as any asset in the project." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"No signs of slowing — full short exposure maintained." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Approaching the June absolute trough — hold shorts into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — WATERFALL CONTINUES", stars: 5,
    note: "Full continuation of April's collapse — all three TFs declining in unison toward the June absolute low. One of the cleanest, most sustained short windows in all of commodity seasonals. No meaningful bounce; the bears are in full control.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Broadest short alignment of the year — hold without hesitation." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Clean waterfall — no counter-trend signals worth trading." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Approaching the final leg toward the June absolute trough." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Capitulation zone forming — watch for first exhaustion signals." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — ABSOLUTE TROUGH", stars: 4,
    note: "The absolute annual low for copper — all three TFs near or at zero. More extreme than the gold/silver summer low in terms of cross-TF uniformity. Cover shorts in this window; the reversal from the trough is often sharp but the recovery quality is lower than precious metals.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Final waterfall — near-zero readings on all TFs." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"TROUGH ★★★★", note:"Absolute annual trough — the lowest cross-TF reading of the year." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"COVER SHORTS ★★★", note:"5-YR and 15-YR stabilizing — cover shorts ahead of the July reversal." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"chop", com:"TURN WATCH ★★★", note:"5-YR and 15-YR turn up — the summer low is forming." },
    ]
  },
  {
    month: "July", sig5: "flip", sig15: "flip", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP — SUMMER TROUGH REVERSAL", stars: 4,
    note: "The summer low and reversal — 40-YR turns up cleanly, 5-YR and 15-YR more volatile as they bounce off near-zero readings. The recovery quality is messier than precious metals; expect chop and false starts before the trend establishes.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bull", com:"FLIP WATCH ★★★★", note:"40-YR turning — 5-YR/15-YR still choppy. Wait for confirmation." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"FLIP ★★★★", note:"Three-way confirmation — load longs. The recovery is underway." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s40:"bull", com:"LEAN LONG ★★★", note:"5-YR leading, 15-YR lagging — recovery is real but messy." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bull", com:"LEAN LONG ★★★", note:"Chop continues — 40-YR is the clearest signal in this window." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP — RECOVERY IS MESSY", stars: 2,
    note: "Unlike precious metals, copper's summer recovery is unreliable. 40-YR continues climbing but 5-YR and 15-YR are volatile and choppy. The three-way alignment of the July reversal quickly breaks down into an uneven, frustrating recovery pattern.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"40-YR and 15-YR rising; 5-YR unreliable — size accordingly." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"Choppy recovery — use the 40-YR as the primary directional guide." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bull", com:"NEUTRAL ★★", note:"No clean edge — reduce tactical exposure." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bull", com:"NEUTRAL ★★", note:"5-YR dips again — the recovery's fragility is showing." },
    ]
  },
  {
    month: "September", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP — 40-YR STEADY BUT OTHERS NOISY", stars: 2,
    note: "40-YR grinds steadily higher while 5-YR and 15-YR continue their volatile, untrustworthy recovery. Unlike the clean bull signals in precious metals this month, copper remains a frustrating, low-conviction trade in September.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"Moderate lean to the long — 40-YR providing the primary support." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bull", com:"NEUTRAL ★★", note:"5-YR and 15-YR reverting to noise — trade the 40-YR signal only." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"5-YR briefly cooperates — marginal long, not a high-conviction setup." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"FLIP TO SHORT ★★★", note:"Late-month reversal — all three turning down into October weakness." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — AUTUMN WEAKNESS", stars: 3,
    note: "All three TFs declining in the October-November weakness window. 40-YR falls toward its November nadir (~10). Unlike precious metals, copper's autumn weakness is sustained and clean — a reliable secondary short window after April-May.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All three aligned lower — the autumn bear window is confirmed." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Clean continuation — hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR heading toward its November low near 10." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Sustained — sets up November's continued pressure." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig40: "bear",
    combined: "chop", combinedLabel: "MIXED — AUTUMN LOW FORMING", stars: 2,
    note: "40-YR still declining toward its annual low near 10. 15-YR stages a modest recovery. 5-YR choppy. The typical November pattern shows a brief TF divergence as the autumn low forms — similar to precious metals but less extreme.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bear", com:"LEAN SHORT ★★", note:"40-YR near annual lows — approaching the turn window." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bear", com:"NEUTRAL ★★", note:"15-YR bouncing while 40-YR still pressured — divergence forming." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"chop", com:"LEAN LONG ★★", note:"5-YR and 15-YR lead the recovery — early December setup forming." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"Quiet three-way confirmation building — deploy into December." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — YEAR-END RECOVERY", stars: 3,
    note: "All three TFs recover to their year-end reference values (40-YR to 55.91, 15-YR to 68.97, 5-YR to 69.77). The recovery is real and reliable but more moderate than precious metals. A solid seasonal tailwind for longs into the new year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Year-end recovery underway — all three rising off November lows." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Steady climb — particularly clean for 15-YR heading toward 69." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Approaching year-end reference targets — hold longs." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Year-end seasonal highs achieved — a moderate but reliable finish." },
    ]
  },
];

const SEASONAL_DATA = `
=== COPPER (HG) SEASONAL ANALYSIS — MOORE RESEARCH CENTER ===
Source: Copper CMX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays · © 2020
Reference values at 02 Jan 2020: 40-YR = 55.91 | 15-YR = 68.97 | 5-YR = 69.77

=== 5-YEAR SEASONAL ===
Opens ~50 in January and climbs to ~80–85 by late February / early March (the Q1 peak). The ascent is slightly volatile with some intra-month swings. Then CRASHES from the March high toward near zero by late May/early June — the most dramatic April-May collapse of any metal in the complex. Recovery from the June trough through July is sharp but quickly becomes choppy and unreliable through August-September. Autumn weakness in October brings another decline. December recovery to 69.77.

=== 15-YEAR SEASONAL ===
THE DRAMATIC OPENER — starts near 0 at the beginning of January and ROCKETS upward through January and February toward its peak of ~95–100. The January surge for 15-YR is among the most extreme single-month seasonal moves in the project's entire dataset (near 0 to ~65 in a single month). Then CRASHES from the February-March peak toward zero by June. A moderate recovery through August before the autumn weakness sets in. December recovery to 68.97.

=== 40-YEAR SEASONAL (1980–2019) ===
Starts ~50 in January and rises steadily to ~85–90 by late February/March. Declines sharply through April-May toward near zero by June. Recovery from the June trough through July is cleaner and more sustained than the shorter TFs — the 40-YR provides the most reliable H2 signal for copper. Falls in October toward ~10 (its autumn nadir). December recovery to 55.91. The 40-YR's pattern is: clean Q1 bull → sharp Q2 bear → messy Q3 recovery → clean Q4 bear-then-recovery.

=== PLAYBOOK SIGNALS ===
- HIGHEST-CONVICTION LONG: January-February (broad three-way alignment, Q1 seasonal demand; 15-YR's surge from near 0 is the strongest single-month seasonal move in the project)
- THE DEFINING FLIP: April — all three TFs break simultaneously from near-100 levels toward near zero. Copper's April reversal is the most dramatic and clean of any CMX metal — never fade this signal.
- HIGHEST-CONVICTION SHORT: April-May (continuation of the flip; the waterfall is broad, fast, and reliable)
- SUMMER REVERSAL: Late June / early July — near-zero readings on all TFs; load longs but expect choppiness in the recovery (copper's H2 recovery is noisier than gold/silver)
- AUTUMN SHORT: October-November — secondary short window, less extreme than April-May but still reliable
- YEAR-END: December recovery is solid across all TFs; 15-YR and 5-YR both reach ~69 by year-end

=== TASK ===
Using the seasonal data above and today's date, please produce:
1. A YEARLY BIAS summary (2-3 sentences capturing the macro arc)
2. A MONTH-BY-MONTH TABLE showing combined bias, conviction (stars), and a one-line trade note for each month
3. A WEEK-BY-WEEK PRIORITY BREAKDOWN for the current month and the next month, highlighting the highest-conviction setups
4. TOP 3 TRADE SETUPS for the next 90 days based on this seasonal data, each with entry timing, expected duration, and conviction rating

Format your response in clean markdown with clear section headers. Be specific about timing (which week of which month) and conviction levels. Where timeframes diverge, call out the divergence explicitly as it often signals the highest-conviction reversal points.
`;
