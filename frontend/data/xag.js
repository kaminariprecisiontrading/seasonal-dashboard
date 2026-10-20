const ASSET_CONFIG = {
  id:       "xag",
  name:     "Silver (XAG)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Silver CMX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bear", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP — MAJOR DIVERGENCE", stars: 2,
    note: "The year's defining divergence opens it: 15-YR starts at or near its ANNUAL PEAK (~90–95) and crashes through the month, while 40-YR and 5-YR are rising off their lows. No reliable directional edge with TFs pulling in opposite directions.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bear", s40:"bull", com:"DIVERGENCE ★★", note:"15-YR at the top, falling hard — 40-YR and 5-YR rising. Opposite signals, stand aside." },
      { wk:"Wk 2", s5:"bull", s15:"bear", s40:"bull", com:"DIVERGENCE ★★", note:"Divergence continues — the 15-YR crash dominates the longer-term picture." },
      { wk:"Wk 3", s5:"bull", s15:"bear", s40:"bull", com:"DIVERGENCE ★★", note:"5-YR and 40-YR still climbing toward their Feb peaks." },
      { wk:"Wk 4", s5:"bull", s15:"bear", s40:"bull", com:"LEAN LONG ★★", note:"If fading the 15-YR's decline, 5-YR/40-YR offer a short-term long — high risk." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bear", sig40: "chop",
    combined: "chop", combinedLabel: "PEAK / REVERSAL — CAUTION", stars: 2,
    note: "5-YR peaks near 95–100 and ROLLS OVER sharply. 40-YR also crests and turns down. 15-YR continues its decline from the January high. All three TFs are now pointing lower by month-end — a broad rolling-top reversal.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bear", s40:"bull", com:"CAUTION ★★", note:"5-YR and 40-YR making their final push toward peaks — distribution zone." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"chop", com:"PEAK ★★", note:"5-YR and 40-YR crest — all three TFs now in reversal or decline." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★", note:"First confirmed three-way alignment lower since the year started." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Momentum building lower into the spring decline — size into shorts." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "bull", sig40: "bear",
    combined: "chop", combinedLabel: "CHOP — 15-YR COUNTER-TREND SPIKE", stars: 2,
    note: "SECONDARY DIVERGENCE — 15-YR stages a powerful counter-trend rally from ~35 back toward ~75 (a major bounce within its downtrend) while 40-YR and 5-YR continue declining. The 15-YR's March bounce is the most notable intra-year counter-move in silver's seasonal.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", s40:"bear", com:"NEUTRAL ★★", note:"15-YR bouncing hard — creates a false long signal. Trust the 40-YR." },
      { wk:"Wk 2", s5:"bear", s15:"bull", s40:"bear", com:"NEUTRAL ★★", note:"The 15-YR spike is a counter-trend move; 40-YR and 5-YR remain in decline." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bear", com:"NEUTRAL ★★", note:"5-YR stabilizes briefly but doesn't confirm the 15-YR bounce." },
      { wk:"Wk 4", s5:"bear", s15:"bull", s40:"bear", com:"LEAN SHORT ★★", note:"40-YR and 5-YR lean short; the 15-YR counter-rally is maturing." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "flip", sig40: "bear",
    combined: "flip", combinedLabel: "FLIP — 15-YR SECONDARY PEAK COLLAPSE", stars: 4,
    note: "15-YR PEAKS NEAR 90–95 then collapses — the same rolling-top structure seen in other assets. 5-YR and 40-YR already declining, so when the 15-YR finally rolls over here, it creates the year's highest-conviction short setup as all three TFs align lower.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", s40:"bear", com:"FLIP WATCH ★★★★", note:"15-YR near its secondary peak even as 40-YR and 5-YR fall — classic divergence top." },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"bear", com:"FLIP ★★★★", note:"15-YR crests — the secondary peak is confirmed." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All three now aligned lower — the pre-June waterfall begins in earnest." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Maximum conviction short — hold size into the June absolute trough." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — WATERFALL TO THE TROUGH", stars: 4,
    note: "All three TFs in clean alignment lower — the waterfall from April's secondary peak accelerates. 40-YR heading toward its annual low, 15-YR and 5-YR also in freefall. One of silver's clearest sustained short windows.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Clean three-way alignment — no hesitation." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Waterfall accelerating — hold shorts at full size." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Mid-month, approaching the final approach to the trough." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Nearing the June low — start watching for early capitulation signals." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — ABSOLUTE TROUGH", stars: 3,
    note: "All three TFs crash to near zero — the absolute annual low for silver, more severe than gold's summer trough. This is the single most extreme seasonal low in the metals complex. Cover shorts at the trough; the reversal from here can be violent.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Final leg lower — approaching near-zero readings on all TFs." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"TROUGH ★★★", note:"Absolute annual low zone — the most extreme seasonal reading of the year." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"TROUGH ★★★", note:"First signs of exhaustion — cover shorts, watch for the 5-YR to turn first." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"chop", com:"TURN WATCH ★★★", note:"5-YR leads the reversal — the summer low is in." },
    ]
  },
  {
    month: "July", sig5: "flip", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP — SUMMER-LOW REVERSAL", stars: 5,
    note: "THE DEFINING REVERSAL — near-zero readings give way to an explosive rally. 5-YR SURGES from its trough toward 50+ in a matter of weeks. 15-YR leads steadily. 40-YR turns up. This is silver's highest-conviction long setup of the year — and the reversal is often violent and fast.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bull", com:"FLIP ★★★★★", note:"5-YR making its final low; 15-YR and 40-YR already reversing. Load longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR has turned — three-way alignment confirmed. Maximum long." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Rally accelerating — the summer-to-autumn seasonal bull is underway." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Carry into August — the strongest part of the move is ahead." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — STRONGEST RALLY WINDOW", stars: 5,
    note: "Full three-way alignment in the strongest silver rally window of the year. 5-YR rockets toward 85–90. 15-YR surges from its July lows. 40-YR continues building. Mirrors gold's August strength but often with more explosive short-term moves.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Highest conviction — ride the seasonal tailwind at full size." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR near 70+ and climbing fast — momentum at its peak." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Approaching the 5-YR peak zone (~85-90) — start watching for a top." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Still bullish but peak forming for 5-YR — tighten stops." },
    ]
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — PEAK APPROACHING", stars: 4,
    note: "Continued rally — 5-YR and 15-YR both approach their seasonal highs (~90–95 for 5-YR). 40-YR still climbing. A strong month overall but the peaks for 5-YR and 15-YR form here, requiring position management into October.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Full alignment — the bull continues. 5-YR approaching peak." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR near its seasonal high — start trimming the fastest-moving TF." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LEAN LONG ★★★", note:"5-YR stalling — reduce short-term exposure, keep core long." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bull", com:"LEAN LONG ★★", note:"5-YR rolling — take profits; 15-YR also topping. Reduce further." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — AUTUMN CORRECTION", stars: 3,
    note: "5-YR falls sharply from its September peak. 15-YR also reverses. 40-YR weakens. Unlike gold, silver's autumn correction is more severe — the 40-YR falls toward its November lows near 5–10, making October a genuine short window for silver.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All three rolling over from September peaks — sell the lingering longs." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Decline accelerating — this is a genuine seasonal short, not just noise." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR heading for its November nadir near 5-10 — hold shorts." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Sustained pressure — sets up the November continuation lower." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "BEAR — APPROACHING ANNUAL LOWS", stars: 4,
    note: "ALL THREE TFs falling toward their annual nadir — 40-YR near 5–10 (its absolute yearly low), 5-YR also near 5–10. A sustained, high-conviction bearish window. Unlike gold (which consolidates in November), silver keeps declining into year-end weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Broad alignment lower — 40-YR and 5-YR heading for single-digit readings." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Deepest decline of the autumn — hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR near annual low — approaching the turn window." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bear", com:"COVER SHORTS ★★★", note:"5-YR and 15-YR begin to stabilize — start covering ahead of the December recovery." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG — YEAR-END RECOVERY", stars: 3,
    note: "Recovery from the November lows — all three TFs rise toward their year-end reference values (40-YR to 23.06, 15-YR to 77.09, 5-YR to 54.96). Less explosive than gold's December but still a clean seasonal tailwind. 15-YR's year-end recovery to 77 is the standout here.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Year-end recovery ignites — all three TFs turning up off the November lows." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Steady climb — particularly strong for 15-YR heading toward 77." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Continuation — approaching year-end reference targets." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Year-end seasonal highs achieved — note the 40-YR only reaches 23 (far from gold's 73.69)." },
    ]
  },
];

const SEASONAL_DATA = `
=== SILVER (XAG) SEASONAL ANALYSIS — MOORE RESEARCH CENTER ===
Source: Silver CMX Futures · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays · © 2020
Reference values at 02 Jan 2020: 40-YR = 23.06 | 15-YR = 77.09 | 5-YR = 54.96

=== 5-YEAR SEASONAL ===
Opens ~75–80 in January (already elevated) and climbs toward its peak of ~95–100 in February — the earliest peak of any silver TF. Then ROLLS OVER sharply from the February high, falling through March-April. Makes a brief counter-trend rally, but ultimately crashes to near zero by late June (the absolute annual low). EXPLODES upward from near 0 to ~85–90 through July-August — the year's most powerful move. Peaks in September near 90–95, then SHARP CORRECTION in October-November back to near 5–10 (almost as low as the June trough). December recovery to 54.96.

=== 15-YEAR SEASONAL ===
THE OUTLIER TF — starts at its ANNUAL PEAK (~90–95) at the beginning of January and immediately begins a long decline through January-February toward ~35. Stages a powerful counter-trend rally in March-April back toward 90–95 (the secondary peak). Then COLLAPSES from the April secondary peak through May-June toward zero. Rallies from the June trough through August-September (~70-80 range). Falls again in October-November. December recovery to 77.09. The 15-YR's double-peak structure (January AND April) and massive intra-year swings make it the most volatile of the three silver TFs.

=== 40-YEAR SEASONAL (1980–2019) ===
Starts ~40–50 in January and climbs to ~65–70 by February (the February peak). Then a long decline through spring — from ~65 all the way toward near zero by June. The June-July absolute trough matches the 5-YR and 15-YR. Recovery in July-August reaches only ~35–40 (much less spectacular than gold's H2 recovery). FALLS AGAIN through October-November toward 5–10 (its second near-zero reading of the year — unlike gold, silver's 40-YR makes lows TWICE annually). Modest year-end recovery to 23.06 — far below gold's 73.69. Silver's 40-YR seasonal is persistently weak relative to the other TFs.

=== PLAYBOOK SIGNALS ===
- KEY DIVERGENCE: January — 15-YR crashing from its annual peak while 40-YR and 5-YR are rising. Stand aside or trade the shorter TFs only with tight stops.
- HIGHEST-CONVICTION SHORT: Late April (after the 15-YR secondary peak collapses and all three TFs align lower) through June trough
- SUMMER REVERSAL: Late June / early July (same as gold) — near-zero readings on all TFs signal the year's most powerful long entry. Silver's reversal from this point is typically MORE EXPLOSIVE than gold's.
- STRONGEST LONG WINDOW: July-September (especially August) — full three-way alignment upward; 5-YR can move 80+ points in this window
- AUTUMN SHORT: October-November — silver's autumn weakness is more severe than gold's (40-YR falls to near 5-10 again)
- YEAR-END: December recovery is real but muted (40-YR only reaches 23.06 vs gold's 73.69 — do not confuse silver's year-end with gold's)

=== TASK ===
Using the seasonal data above and today's date, please produce:
1. A YEARLY BIAS summary (2-3 sentences capturing the macro arc)
2. A MONTH-BY-MONTH TABLE showing combined bias, conviction (stars), and a one-line trade note for each month
3. A WEEK-BY-WEEK PRIORITY BREAKDOWN for the current month and the next month, highlighting the highest-conviction setups
4. TOP 3 TRADE SETUPS for the next 90 days based on this seasonal data, each with entry timing, expected duration, and conviction rating

Format your response in clean markdown with clear section headers. Be specific about timing (which week of which month) and conviction levels. Where timeframes diverge, call out the divergence explicitly as it often signals the highest-conviction reversal points.
`;
