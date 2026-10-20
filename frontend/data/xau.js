const ASSET_CONFIG = {
  id:       "xau",
  name:     "Gold (XAU)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Gold CMX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — YEAR OPENS STRONG", stars: 3,
    note: "All three TFs rise from their year-end lows into January — the classic gold new-year seasonal bid, led by the 40-YR surging from near 0.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Broad early-year lift — 40-YR surges hard from near zero." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Continuation — all three TFs trending higher in step." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"5-YR shows its first hesitation; longer TFs remain bullish." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Strong close to the month — sets up the February peak window." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sig40: "bear",
    combined: "chop", combinedLabel: "PEAK / MIXED — CAUTION", stars: 2,
    note: "40-YR peaks early in the month and enters a long multi-month decline. 15-YR continues higher while 5-YR gets volatile — the first major divergence of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★ (fading)", note:"40-YR's last push before it peaks — take profits on size." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bear", com:"MIXED ★★", note:"40-YR rolls over; 15-YR still climbing. Divergence begins." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bear", com:"MIXED ★★", note:"40-YR accelerating lower — the long-term seasonal has turned." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bear", com:"LEAN SHORT ★★", note:"5-YR joins the decline — no clean long case remains." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig40: "bear",
    combined: "chop", combinedLabel: "CHOP — 40-YR IN FREEFALL", stars: 2,
    note: "40-YR continues its major multi-month decline toward near-zero readings. 5-YR is extremely volatile (huge swings, 40–75 range). 15-YR chops. No clean directional edge.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bear", com:"NEUTRAL ★★", note:"40-YR grinding lower — 5-YR and 15-YR offer no directional clarity." },
      { wk:"Wk 2", s5:"bull", s15:"chop", s40:"bear", com:"NEUTRAL ★★", note:"5-YR spikes briefly — don't chase; the 40-YR tells the real story." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"NEUTRAL ★★", note:"Back to confusion — 40-YR continues its slide toward critical lows." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bear", com:"LEAN SHORT ★★", note:"5-YR tips down — sets up the spring weakness window." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sig40: "bear",
    combined: "chop", combinedLabel: "CHOP — 40-YR NEAR ANNUAL LOWS", stars: 2,
    note: "40-YR is near the bottom of its multi-month drawdown (approaching near zero). 5-YR erratic. 15-YR ranging. No confirmed direction — the definition of a seasonal dead zone.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", s40:"bear", com:"NEUTRAL ★★", note:"40-YR at annual lows; shorter TFs offer no reliable signal." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bear", com:"NEUTRAL ★★", note:"Continued chop — 40-YR near 5, nowhere to hide." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bear", com:"NEUTRAL ★★", note:"15-YR ticks up momentarily — not enough to change the bias." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bear", com:"LEAN SHORT ★★", note:"5-YR turns down again — leans toward the May continuation." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — HEADING FOR THE SUMMER LOW", stars: 3,
    note: "All three TFs now pointing lower as gold approaches the classic summer trough. 40-YR at its absolute lowest readings of the year. 15-YR has also turned down. 5-YR accelerating lower.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Three-way alignment lower — June/July summer low in the crosshairs." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Steady decline — no bounce signals worth trading." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"15-YR shows a brief pause — not a reversal, just noise." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Pressure building into the final leg toward the summer low." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — SUMMER TROUGH FORMING", stars: 3,
    note: "The classic gold summer low — 40-YR at its absolute nadir for the year, 5-YR also crashing toward near zero. The trough forms in late June / early July and sets up the year's best long trade.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Final leg down — 5-YR and 40-YR approaching near-zero readings." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at the absolute trough for the year." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"Capitulation zone — cover shorts; watch for early June reversal signals." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"TURN WATCH ★★★", note:"The first signs of a turn — 15-YR ticks up while 40-YR begins to stabilize." },
    ]
  },
  {
    month: "July", sig5: "flip", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP — THE SUMMER-LOW REVERSAL", stars: 5,
    note: "THE YEAR'S DEFINING TRADE — 5-YR crashes to its absolute annual low in Wk1–2, then REVERSES explosively. 40-YR confirms the turn. 15-YR leads higher. The multi-month bull run to the year-end highs launches from here.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", s40:"bull", com:"FLIP WATCH ★★★★★", note:"5-YR still making its final low — 40-YR and 15-YR already turning. Maximum divergence = maximum signal." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"FLIP ★★★★★", note:"5-YR bottoms and stabilizes — the reversal is confirmed. Load longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Three-way alignment confirmed — the year's most powerful seasonal long trade begins." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Carry the position — the seasonal tailwind runs through September." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — YEAR'S STRONGEST WINDOW", stars: 5,
    note: "PEAK SEASONAL ALIGNMENT — all three TFs in a powerful, synchronized uptrend. 5-YR rockets to 85–90. 15-YR surges. 40-YR accelerates. This is the single highest-conviction long window in gold's entire seasonal year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Full three-way alignment — add to longs on any dip." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Momentum accelerating — ride the seasonal tailwind at full size." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Still firing on all cylinders — no reason to trim yet." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Approaching the peak window — watch for 5-YR signals in September." },
    ]
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — APPROACHING PEAK", stars: 4,
    note: "Continued strong uptrend — 5-YR and 15-YR approach their October peaks, 40-YR keeps climbing. The rally begins to show signs of maturity late in the month as 5-YR tops out.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Full alignment continues — the bull run shows no sign of exhaustion yet." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR approaching the 90-95 zone — start tightening stops." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Near the seasonal peak for 5-YR and 15-YR — trim size." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"5-YR showing first signs of rolling over — scale back exposure." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "chop", sig40: "bear",
    combined: "chop", combinedLabel: "MIXED — 5-YR CORRECTION", stars: 2,
    note: "5-YR peaks and corrects sharply (from ~90 toward ~45–50). 40-YR also pulls back from its high. 15-YR holds relatively well, creating a notable divergence — the long-term seasonal is stickier here.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bear", com:"MIXED ★★", note:"5-YR selling off from its September peak — reduce exposure." },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"bear", com:"MIXED ★★", note:"40-YR joins the pull-back; 15-YR holds — wait before re-engaging." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"MIXED ★★", note:"Correction persists — stand aside or hold core long-term positions only." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"chop", com:"NEUTRAL ★★", note:"5-YR stabilizes — sets up the November consolidation." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CONSOLIDATION — BEFORE YEAR-END SURGE", stars: 2,
    note: "All three TFs in a sideways basing pattern — digesting the October correction and coiling for the December year-end surge. No clean directional edge but the long bias is building beneath the surface.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"Pure consolidation — sit tight; the year-end setup is forming." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"Basing continues — range-bound trade with no edge." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s40:"chop", com:"LEAN LONG ★★", note:"5-YR ticks up first — the early warning of the December surge." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"Quiet three-way confirmation building — deploy into December." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — YEAR-END SURGE TO SEASONAL HIGHS", stars: 5,
    note: "ALL THREE TFs rocket to their annual reference highs simultaneously — 40-YR to 73.69, 15-YR to 100, 5-YR to 71.61. The single sharpest and most synchronized year-end seasonal in gold's 40-year record. The only month that rivals July/August for outright conviction.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Year-end surge ignites — all three TFs pointing straight up." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Acceleration continues — 15-YR heading for 100, its annual peak." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All three at or near their highest readings of the year — hold size." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Seasonal highs achieved as the year closes — the reference values are the destination." },
    ]
  },
];

const SEASONAL_DATA = `
=== GOLD (XAU) SEASONAL ANALYSIS — MOORE RESEARCH CENTER ===
Source: Gold CMX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays · © 2020
Reference values at 02 Jan 2020: 40-YR = 73.69 | 15-YR = 100 | 5-YR = 71.61

=== 5-YEAR SEASONAL ===
Opens ~55–60 in January and climbs — volatile through Jan/Feb, pushing to the mid-70s. February sees elevated levels ~75 before a choppy multi-month drift. Erratic through March-May with big swings. CRASHES to near zero in June-July (the famous gold summer low). Then EXPLODES upward from near 0 to ~85–90 through August-September (the year's single strongest move). Peaks and corrects sharply in October back to ~45–50. Consolidates through November. Then ROCKETS to 71.61 at year-end in December — the second major surge of the year.

=== 15-YEAR SEASONAL ===
Starts near the bottom (~5–10) at the beginning of January and climbs steadily through the early year to ~65 by February. Choppy through the spring months (~45–65). Makes its absolute annual LOW near 10–15 in early-to-mid July alongside the 5-YR summer low. Then begins a massive, persistent rally from ~15 all the way to 100 by late December — a nearly uninterrupted 6-month bull run. The 15-YR's year-end surge to 100 (its absolute seasonal maximum) is the most powerful signal in this dataset.

=== 40-YEAR SEASONAL (1980–2019) ===
THE LAGGARD AND THE CONFIRMER — starts near zero (~15) in January and surges to ~60–65 by February. Then enters a long multi-month BEAR — crashes from ~65 back toward near 0 through March-June, spending extended time near the lows. Makes its absolute annual nadir (near 0–5) in late May/June, then begins a relentless bull run: rises from near 0 all the way to 73.69 at year-end. The July-December recovery is nearly perfectly monotonic — one of the clearest, most durable seasonal patterns in gold's 40-year record. The 40-YR's spring weakness (Feb–June near zero) and subsequent massive H2 recovery define gold's long-term seasonal arc.

=== PLAYBOOK SIGNALS ===
- LONG bias: January (broad opening bid), August-September (the year's highest-conviction window — all TFs aligned from the July summer low), December (year-end surge, all three TFs to their annual reference highs)
- KEY SUMMER REVERSAL: Late June / early July — when 40-YR and 5-YR near zero simultaneously while 15-YR turns up, this is the year's highest-conviction long entry
- CAUTION ZONE: February–June — 40-YR in freefall, 5-YR and 15-YR volatile/choppy; no reliable long edge
- OCTOBER CORRECTION: 5-YR peaks and corrects ~45 points sharply; use as a trim/reduce signal, not a full short

=== TASK ===
Using the seasonal data above and today's date, please produce:
1. A YEARLY BIAS summary (2-3 sentences capturing the macro arc)
2. A MONTH-BY-MONTH TABLE showing combined bias, conviction (stars), and a one-line trade note for each month
3. A WEEK-BY-WEEK PRIORITY BREAKDOWN for the current month and the next month, highlighting the highest-conviction setups
4. TOP 3 TRADE SETUPS for the next 90 days based on this seasonal data, each with entry timing, expected duration, and conviction rating

Format your response in clean markdown with clear section headers. Be specific about timing (which week of which month) and conviction levels. Where timeframes diverge, call out the divergence explicitly as it often signals the highest-conviction reversal points.
`;
