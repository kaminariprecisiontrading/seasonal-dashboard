const ASSET_CONFIG = {
  id:       "brl",
  name:     "BRL / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 25-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Brazilian Real CME Futures · 25-Year Seasonal (1995–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "25-YR",
  ltSigKey: "sig25",
  ltKey:    "s25",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bull", sig25: "bull",
    combined: "chop", combinedLabel: "NEUTRAL / LEAN LONG", stars: 2,
    note: "Mixed open — 15-YR and 25-YR already drifting higher off the year-end base while 5-YR chops sideways.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s25:"bull", com:"NEUTRAL ★★", note:"5-YR lags — wait for confirmation before sizing up." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s25:"bull", com:"NEUTRAL ★★", note:"Long-term TFs continue higher; 5-YR still rangebound." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LEAN LONG ★★★", note:"5-YR finally turns up — early alignment forming." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★", note:"All three TFs now pointed higher into February." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig25: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Broad rising tide — all three timeframes climb together in a clean, sustained uptrend.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Clean three-way alignment — add to longs on dips." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Steady continuation — no signs of stalling yet." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Momentum holds — building toward March's acceleration." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★", note:"Strong close to the month — primed for the March push." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig25: "bull",
    combined: "bull", combinedLabel: "LONG — ACCELERATION", stars: 5,
    note: "The year's strongest rally window — 5-YR explodes higher, 15-YR and 25-YR confirm in lockstep, pushing toward the yearly highs.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Acceleration begins — 5-YR leads the charge higher." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Full alignment — the year's highest-conviction long window." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★★★", note:"Approaching the yearly peak zone — hold size." },
      { wk:"Wk 4", s5:"bull", s15:"chop", s25:"bull", com:"LONG ★★★★", note:"15-YR shows the first signs of stalling — start trimming." },
    ]
  },
  {
    month: "April", sig5: "flip", sig15: "flip", sig25: "bull",
    combined: "flip", combinedLabel: "FLIP — ROLLING TOP", stars: 5,
    note: "THE DEFINING MONTH — 5-YR and 15-YR both crest and roll over from their yearly highs even as 25-YR keeps grinding to its own peak. The single highest-conviction reversal window of BRL's entire year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s25:"bull", com:"LONG ★★★ (fading)", note:"Final push to the yearly highs — distribution begins beneath the surface." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s25:"bull", com:"FLIP ★★★★★", note:"5-YR and 15-YR both crest and turn — the rolling top is confirmed here." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bull", com:"FLIP ★★★★★", note:"Short-term TFs accelerate lower while 25-YR still grinds to its peak — maximum divergence." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bull", com:"SHORT ★★★★", note:"Flip to short confirmed on 5-YR/15-YR — 25-YR's peak is the trailing confirmation signal." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig25: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Full waterfall continuation — all three timeframes now aligned lower as 25-YR finally confirms the April rollover.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"25-YR joins the decline — three-way alignment now complete." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"Clean continuation lower — hold shorts, no signs of a bounce." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"Steady bleed continues toward the mid-year trough." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"Approaching the June low — watch for the first signs of basing." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "bear", sig25: "bear",
    combined: "chop", combinedLabel: "TROUGH / NEUTRAL", stars: 3,
    note: "Mid-year low forms — 5-YR finds its floor and starts to base while 15-YR and 25-YR make their final lows before the turn.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★", note:"Final leg down — capitulation low forming across all TFs." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s25:"bear", com:"TROUGH ★★★", note:"5-YR begins to base — the first sign the decline is exhausting." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s25:"bear", com:"NEUTRAL ★★★", note:"Choppy bottoming continues — wait for a clean turn signal." },
      { wk:"Wk 4", s5:"bull", s15:"chop", s25:"chop", com:"NEUTRAL ★★★", note:"5-YR turns up first — the V-shaped rebound begins to take shape." },
    ]
  },
  {
    month: "July", sig5: "bull", sig15: "chop", sig25: "chop",
    combined: "chop", combinedLabel: "COUNTER-TREND LONG", stars: 3,
    note: "Sharp counter-trend bounce off the mid-year low — 5-YR leads decisively higher while the longer TFs lag in basing mode.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", s25:"chop", com:"LEAN LONG ★★★", note:"5-YR's rebound accelerates — longer TFs still finding their footing." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s25:"chop", com:"LONG ★★★", note:"15-YR joins the bounce — momentum building behind the move." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s25:"chop", com:"LONG ★★★", note:"Strong continuation — but watch for the bounce to lose steam late month." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s25:"bull", com:"LEAN LONG ★★", note:"5-YR stalls first — a warning sign the counter-trend rally is maturing." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "flip", sig25: "bull",
    combined: "flip", combinedLabel: "FLIP — SECONDARY PEAK COLLISION", stars: 4,
    note: "SECONDARY PEAK → SHARP REVERSAL — 15-YR makes its secondary divergence top right as 5-YR is already turning down, then collapses in its sharpest single-month move of the year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s25:"bull", com:"FLIP WATCH ★★★★", note:"15-YR pushes to its secondary peak even as 5-YR stalls — divergence forming." },
      { wk:"Wk 2", s5:"bear", s15:"chop", s25:"bull", com:"FLIP ★★★★", note:"15-YR rolls over from its secondary top — the divergence resolves lower." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"chop", com:"SHORT ★★★★", note:"Sharpest single-month collapse on 15-YR — 5-YR leads it down." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"25-YR finally rolls over too — full alignment lower resumes." },
    ]
  },
  {
    month: "September", sig5: "chop", sig15: "chop", sig25: "bear",
    combined: "chop", combinedLabel: "NEUTRAL / CHOP", stars: 2,
    note: "Choppy, directionless consolidation — 5-YR and 15-YR drift sideways while 25-YR continues its slow grind lower.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s25:"bear", com:"NEUTRAL ★★", note:"No clean edge — range-bound trading dominates." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s25:"bear", com:"NEUTRAL ★★", note:"15-YR attempts a bounce but lacks conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s25:"bear", com:"NEUTRAL ★★", note:"Bounce fades — back to chop." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s25:"bear", com:"LEAN SHORT ★★", note:"5-YR tips back toward bearish — sets up October's weak bounce attempt." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "bear", sig25: "bear",
    combined: "chop", combinedLabel: "WEAK BOUNCE / CAUTION", stars: 2,
    note: "A tentative recovery attempt surfaces early but loses momentum and fails outright by Wk4 — a trap for longs ahead of November's decline.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", s25:"bear", com:"CAUTION ★★", note:"5-YR attempts to bounce — don't trust it without confirmation." },
      { wk:"Wk 2", s5:"bull", s15:"chop", s25:"bear", com:"CAUTION ★★", note:"Bounce continues but 15-YR and 25-YR refuse to confirm." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s25:"bear", com:"CAUTION ★★", note:"5-YR stalls — the failure begins to take shape." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★", note:"Bounce fails outright — opens the door to November's waterfall." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig25: "bear",
    combined: "bear", combinedLabel: "SHORT — HIGHEST CONVICTION", stars: 5,
    note: "THE ANNUAL WATERFALL — the sharpest, deepest decline of the year across all three timeframes, driving toward the yearly lows in a clean, fully-aligned move.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"The waterfall begins — full alignment, no hesitation." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"Acceleration continues — the year's single sharpest decline." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★★", note:"Approaching the annual lows — hold size into the capitulation." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s25:"bear", com:"SHORT ★★★★", note:"Capitulation low forming — start watching for December's basing signs." },
    ]
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig25: "chop",
    combined: "chop", combinedLabel: "BASE-BUILDING / NEUTRAL", stars: 2,
    note: "Choppy, uneven base-building process closes out the year — all three TFs consolidate near their lows ahead of January's tentative turn.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s25:"chop", com:"NEUTRAL ★★", note:"Final flush lower — exhaustion signs beginning to show." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s25:"chop", com:"NEUTRAL ★★", note:"Choppy basing — directionless trade dominates." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s25:"chop", com:"NEUTRAL ★★", note:"15-YR shows the first tentative signs of turning higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s25:"chop", com:"LEAN LONG ★★", note:"5-YR and 15-YR both tick up — sets the stage for January's mixed open." },
    ]
  },
];

const SEASONAL_DATA = `
=== BRL/USD SEASONAL ANALYSIS — MOORE RESEARCH CENTER ===
Source: Brazilian Real (CME) Futures · 25-Year Seasonal (1995–2019) · 15-Year · 5-Year overlays · © 2020

=== 5-YEAR SEASONAL ===
Opens choppy in January (base-building, value ~10.57 reference at 02 Jan 2020), turns up by late January and rallies hard through February–March (the year's strongest rally window — explosive acceleration into the yearly highs). Crests in early-to-mid April and rolls over decisively — the FIRST timeframe to flip from long to short, leading the broader reversal. Waterfalls lower May through the June trough, then stages a sharp V-shaped counter-trend rally in July (the standout long trade window, leading the other TFs higher). Tops again in August — divergent from 15-YR's secondary peak — and leads that timeframe's sharp reversal lower. Chops through September, attempts a weak October bounce that fails by Wk4, then collapses into November's annual waterfall — the sharpest decline of the year. Closes the year choppy, basing for the next cycle.

=== 15-YEAR SEASONAL ===
Already drifting higher in January (value ~22.77 reference), continues climbing through February into the March acceleration, fully aligned with 5-YR and 25-YR at the highs. Cedes the April top slightly behind 5-YR — both crest and roll over in the same window, confirming the rolling-top reversal. Declines May–June alongside 5-YR, lags the turn slightly, then joins July's counter-trend rally a touch behind 5-YR. Makes its OWN SECONDARY DIVERGENCE PEAK in early August — even as 5-YR is already turning down — then suffers its sharpest single-month collapse of the year as the divergence resolves lower. Chops through September–October without confirming the weak bounce attempt, then joins November's waterfall in full alignment. Shows the first tentative signs of a turn in late December.

=== 25-YEAR SEASONAL (1995–2019) ===
THE LAGGARD AND THE CONFIRMER — opens already in a gentle uptrend in January (value ~10.57 reference; chart overlay shows 26-Yr-style base near year-end lows), continues climbing through February–March alongside the shorter TFs. Crucially, KEEPS GRINDING HIGHER through April even as 5-YR and 15-YR are already crashing from their peaks — making its own absolute yearly high LAST, in the same window the shorter TFs are flashing their sharpest sell signals. This trailing-peak behavior is the defining divergence of BRL's year: the long-term timeframe confirms the top only AFTER the reversal is already underway on the shorter TFs — a textbook "rolling top" structure. Finally turns down in May, joins the broad waterfall through the June trough, recovers slowly through the back half of the year, rolls over again in late August behind 15-YR's collapse, and closes the year choppy near its lows.

=== PLAYBOOK SIGNALS ===
- LONG bias: February through mid-April (broad three-TF alignment, accelerating into the year's strongest rally)
- FLIP / DEFINING MONTH: April — 5-YR and 15-YR crest and reverse while 25-YR keeps grinding to its own trailing peak; maximum-conviction reversal window
- SHORT bias: Late April through June (waterfall continuation into the mid-year trough)
- COUNTER-TREND LONG: July (5-YR-led bounce, the year's standout long trade outside the Feb–Apr window)
- SECONDARY FLIP: August — 15-YR's divergence top collides with 5-YR's existing decline, producing the sharpest single-month collapse of the year
- HIGHEST CONVICTION SHORT: November — "the annual waterfall," sharpest and deepest decline of the calendar, fully aligned across all three timeframes
- Cross-reference: consistent with the project's known seasonal playbook framing of BRL as a "broad spring long, autumn short" currency — confirms the README's general LatAm-FX seasonal pattern alongside MXN's mirrored Apr/Nov reversal structure

=== TASK ===
Using the seasonal data above and today's date, please produce:
1. A YEARLY BIAS summary (2-3 sentences capturing the macro arc)
2. A MONTH-BY-MONTH TABLE showing combined bias, conviction (stars), and a one-line trade note for each month
3. A WEEK-BY-WEEK PRIORITY BREAKDOWN for the current month and the next month, highlighting the highest-conviction setups
4. TOP 3 TRADE SETUPS for the next 90 days based on this seasonal data, each with entry timing, expected duration, and conviction rating

Format your response in clean markdown with clear section headers. Be specific about timing (which week of which month) and conviction levels. Where timeframes diverge, call out the divergence explicitly as it often signals the highest-conviction reversal points.
`;
