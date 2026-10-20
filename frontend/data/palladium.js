const ASSET_CONFIG = {
  id:       "palladium",
  name:     "Palladium (PA)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Palladium NYMEX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bull", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP — 40-YR SURGES, 5-YR LAGGING", stars: 2,
    note: "40-YR rockets upward from near zero in the first dramatic move of the year. 15-YR also rises moderately. 5-YR is at its WEAKEST point of the year — near zero, offering no confirmation. The January signal is powerful on the 40-YR alone but not confirmed by the shorter TFs.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"40-YR surging; 5-YR near absolute lows. Don't size up without cross-TF confirmation." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"40-YR continues higher; 5-YR still lagging badly." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"15-YR joining — a two-TF lean but 5-YR remains the outlier." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"40-YR approaching its Feb peak zone — the early-year surge is maturing." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sig40: "bull",
    combined: "chop", combinedLabel: "40-YR PEAKS — PARTIAL LONG ONLY", stars: 3,
    note: "40-YR approaches its FIRST ANNUAL PEAK (~70–75) — the most significant early-year move in palladium's seasonal. 15-YR continues to rise moderately. 5-YR STILL extremely weak (near 10–25). The divergence between the 40-YR's dramatic surge and the 5-YR's persistent weakness is the defining feature of palladium's first half.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"40-YR near its annual peak; 5-YR still at lows — divergence at maximum." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"40-YR approaching the Feb peak ~70-75 — start trimming." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CAUTION ★★", note:"40-YR cresting — the Feb peak is in. No confirmed direction on 5-YR or 15-YR." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bear", com:"LEAN SHORT ★★", note:"40-YR begins to decline from its peak — prepare for the March-April pullback." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP — 40-YR MAKES ITS ANNUAL HIGH", stars: 2,
    note: "40-YR pushes to its ABSOLUTE ANNUAL HIGH (~85–90) before the multi-month decline begins. 15-YR moderately building. 5-YR still extremely weak (~15–20). No clean three-way alignment exists; the 40-YR's annual peak in March-April is the clearest signal in palladium's first half.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"40-YR near its annual high — the last meaningful long entry for the 40-YR." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"40-YR still climbing; 5-YR and 15-YR offer no help." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bull", com:"CAUTION ★★", note:"40-YR at peak zone — trim aggressively." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bear", com:"LEAN SHORT ★★", note:"40-YR peaks and turns down — the multi-month H1 decline begins." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — 40-YR SHARP DECLINE", stars: 3,
    note: "40-YR drops sharply from its March peak — from ~85 toward ~30–35. 15-YR also weakens. 5-YR finally shows a clear directional signal (also declining). The first broad three-way bearish alignment of the year is the clearest short setup in palladium's first half.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"First clean three-way alignment lower — the H1 decline is confirmed." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR dropping sharply from its 85+ peak." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Continued pressure — 40-YR heading toward the 30-35 range." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"First signs of stabilization — the sharpest decline is easing." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP — NO EDGE", stars: 1,
    note: "The most directionless month of palladium's year — 40-YR volatile and choppy (~40–60), 15-YR ranging (~35–50), 5-YR near its absolute lows (~15–25). No reliable trade setup exists in May. The asset is in a seasonal no-man's-land.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"NO TRADE ★", note:"Worst month of the year for palladium — stand aside." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"NO TRADE ★", note:"Pure noise — no seasonal edge in any TF." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"NO TRADE ★", note:"Range-bound on all TFs. Do not force a trade." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"NO TRADE ★", note:"Patience required — June isn't much better." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP — 5-YR AT ANNUAL LOW", stars: 2,
    note: "5-YR makes its absolute annual low (~20) — the weakest reading of the year for the shortest TF. 40-YR volatile and choppy in the 40–55 range. 15-YR ranging. No clean directional edge but the 5-YR's trough here sets up the first phase of the multi-month year-end surge.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"5-YR near its annual low — watch for the first signs of a turn." },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"chop", com:"TURN WATCH ★★", note:"5-YR at or near the absolute trough — the year-end recovery starts here." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"5-YR stabilizing — the first tentative long signals beginning to form." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"LEAN LONG ★★", note:"Early positioning — the year-end rally is a long way out but the foundation is being laid." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP — BUILDING PHASE BEGINS", stars: 2,
    note: "All three TFs near their mid-year lows — 40-YR volatile ~25–50, 15-YR ~25–30, 5-YR ~20. The foundation for the year-end surge is forming but no reliable trade exists yet. The patience required through May-July separates the best palladium seasonal traders from the rest.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"NEUTRAL ★★", note:"Still in the doldrums — hold any early longs lightly." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"40-YR starting to turn up — the very first signal of the year-end build." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★", note:"15-YR joining the turn — two-TF confirmation building." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"5-YR finally turns up — the three-way confirmation of the year-end rally is taking shape." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — YEAR-END RALLY BEGINS", stars: 3,
    note: "All three TFs now pointing higher — the year-end rally is confirmed. 5-YR rising clearly off its June lows, 40-YR climbing, 15-YR also moving up. The signal is real but still early; the most explosive part of the year-end move comes in October-December.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Three-way confirmation — the year-end rally is underway. Begin building position." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Steady climbing — add on dips. The patient positioning is paying off." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Momentum building — the October-December surge is the destination." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold positions — carry into September's acceleration." },
    ]
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — ACCELERATION BUILDING", stars: 3,
    note: "All three TFs continue rising with gathering momentum. 5-YR now at ~35–40 (after spending most of the year near 20), 15-YR at ~40–45, 40-YR at ~50–55. The year-end convergence toward 100 is becoming visible on all TFs.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Acceleration confirmed — all three moving higher with conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Momentum sustained — stay long at full size." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"The three TFs are converging — the October surge is the next major catalyst." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Pre-October positioning — increase exposure here ahead of the surge." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — SURGE ACCELERATES", stars: 4,
    note: "The year-end surge accelerates — 40-YR from ~50 toward ~75-80, 15-YR from ~40 toward ~60-65, 5-YR from ~40 toward ~65. All three TFs are in strong agreement and gathering pace. October is the month where the convergence becomes unmistakable.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Year-end acceleration clearly underway — hold size, add on dips." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All three gaining velocity — the 100 target is in sight for all TFs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Strong continuation — palladium is the best-performing metal seasonally in Q4." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Setting up for the final November-December push to 100." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — FINAL PUSH TO 100", stars: 5,
    note: "All three TFs in a powerful final surge toward 100 — the year-end convergence is the single most extreme seasonal concentration in any commodity. 40-YR from ~75 toward ~90+, 15-YR and 5-YR both accelerating. Hold maximum size into December.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Maximum conviction — all three TFs headed for 100." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Highest-conviction long of the year — ride at full size." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All three TFs near 80-85+ and still climbing. Do not reduce." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Setting up for December's 100-reading on ALL THREE TFs simultaneously." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — ALL TFs CONVERGE TO 100", stars: 5,
    note: "THE MOST EXTREME SEASONAL CONCENTRATION IN ANY ASSET — all three TFs reach 100 simultaneously at 02 Jan 2020 (40-YR=100, 15-YR=100, 5-YR=100). No other asset in the project has this. Palladium's year-end convergence is a phenomenon: a 5-YR that spent most of the year near 20 arrives at 100 alongside a 40-YR that traced a completely different path. The December long is the highest-conviction seasonal trade in the entire project.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All three TFs surging toward 100 — the year's final and most powerful seasonal move." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Acceleration continues — this is a rare triple-100 seasonal event." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Near the absolute peak for all three simultaneously — hold maximum long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"The 100-100-100 year-end convergence — the most extreme seasonal reading in the entire project." },
    ]
  },
];

const SEASONAL_DATA = `
=== PALLADIUM (PA) SEASONAL ANALYSIS — MOORE RESEARCH CENTER ===
Source: Palladium NYMEX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays · © 2020
Reference values at 02 Jan 2020: 40-YR = 100 | 15-YR = 100 | 5-YR = 100

=== 5-YEAR SEASONAL ===
The most extreme TF in the project for distribution of readings: spends the ENTIRE FIRST HALF of the year near its absolute low (~0–25), hovering in the bottom quartile for January through June. The annual low is made in June (~20). Then SURGES from near zero all the way to 100 at year-end — a gain of ~80 points in six months. The 5-YR trajectory is essentially: flat near zero for 6 months, then one of the most extreme single-half-year rallies of any commodity in the database.

=== 15-YEAR SEASONAL ===
More moderate through the first half — starts ~15-20, rises toward ~35-45 by March, then falls to near 25-30 by mid-year. Recovery from ~30 through August-September toward ~50-55. Then accelerates sharply in Q4, reaching 100 at year-end. The 15-YR's path is a gentle curve that only becomes dramatic in the final quarter — a long base-building phase followed by an explosive finish.

=== 40-YEAR SEASONAL (1980–2019) ===
THE VOLATILE OUTLIER — makes an EARLY ANNUAL PEAK in January-February (~65-70) before most other assets are even off the ground, then a SECONDARY ANNUAL HIGH in March (~85-90). Falls sharply from the March peak through April toward ~30-35. Then choppy and volatile through May-July (~25-60 range, hard to trade). Begins climbing again from August through December, reaching 100 at year-end. The 40-YR's early peak structure is unique: no other metal TF in the project makes its annual high this early before retreating and then re-achieving it at year-end.

=== PLAYBOOK SIGNALS ===
- HIGH-RISK EARLY TRADE: 40-YR Jan-March early-year surge (~0 to 85) — compelling on the 40-YR alone but NOT confirmed by 5-YR (which remains near 20). Use small size; this is a single-TF play.
- BEST FADE: April — 40-YR reversal from the March high back toward 30-35. First clean three-way bearish alignment (5-YR/15-YR also weaken). Short on the 40-YR rollover.
- DEAD ZONE: May-July — the worst seasonal period in the project. All TFs near lows, choppy, no edge. Stand aside.
- THE REAL PALLADIUM TRADE: August-December year-end convergence to 100 on ALL THREE TFs simultaneously. Begin building longs in August (three-way confirmation), add through September-October, hold through December.
- UNIQUENESS FLAG: Palladium is the ONLY asset in the project where ALL THREE TFs reach 100 at the same time (year-end). This convergence is the defining seasonal feature of this market and the project's single highest-conviction trade across all assets.

=== TASK ===
Using the seasonal data above and today's date, please produce:
1. A YEARLY BIAS summary (2-3 sentences capturing the macro arc)
2. A MONTH-BY-MONTH TABLE showing combined bias, conviction (stars), and a one-line trade note for each month
3. A WEEK-BY-WEEK PRIORITY BREAKDOWN for the current month and the next month, highlighting the highest-conviction setups
4. TOP 3 TRADE SETUPS for the next 90 days based on this seasonal data, each with entry timing, expected duration, and conviction rating

Format your response in clean markdown with clear section headers. Be specific about timing (which week of which month) and conviction levels. Where timeframes diverge, call out the divergence explicitly as it often signals the highest-conviction reversal points.
`;
