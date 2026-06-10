/**
 * data/fx-eurchf.js — EURCHF Forex Seasonal
 * Derived from: EUR/USD CME futures + CHF/USD CME futures
 * Methodology: EUR seasonal tendency vs inverted CHF seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-eurchf",
  name:     "EUR / CHF",
  sub:      "Forex Seasonal · Derived from EUR CME + CHF CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · CHF/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONFLICT / BEAR LEAN", stars: 3,
    note: "EUR's structural decline (selling its Jan 1 spike) directly opposes CHF's own opening bear leg (inverted bullish for EURCHF). EUR's higher conviction and cleaner structural decline gives it the marginal edge — net bias leans bearish but expect chop.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR fading its open spike (bearish) while CHF also opens weak (inverted bullish). Conflict — EUR's structural decline is the marginally cleaner signal." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"Both currencies declining in their own charts — directly opposing effects on EURCHF largely cancel." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT / SHORT LEAN ★★☆☆☆", note:"EUR continuing lower; CHF also weak (inverted bullish, partial offset). EUR's edge persists narrowly." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★☆☆☆", note:"Late Jan — EUR still the cleaner bearish driver. Light short bias only." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR continues its structural decline while CHF also extends lower toward its own annual trough zone (inverted bullish for EURCHF — partial offset). EUR's larger, more structural move keeps the marginal edge bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR weak, CHF also declining (inverted bullish, partial offset). EUR remains the cleaner driver." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"Continued EUR weakness dominates the narrower CHF offset." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★☆☆☆", note:"EUR nearing its own trough; CHF also approaching its low. Both converging toward March reversals." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"Both currencies basing ahead of their respective March flips. Reduce exposure into the turn." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "DUAL FLIP / CONFLICT", stars: 2,
    note: "Both currencies stage their annual-trough reversals in the very same month — EUR bottoms and turns up (bullish for EURCHF) while CHF ALSO bottoms and reverses sharply higher (inverted bearish for EURCHF). Two simultaneous flips in opposing directions for the pair produce the year's choppiest, lowest-edge transition month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"EUR still finishing its trough (bearish); CHF also still near its absolute low (inverted bullish). Conflicting forces — stand aside." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"chop", com:"DUAL FLIP ★★☆☆☆", note:"EUR troughs and turns up. CHF simultaneously hits its own absolute low and reverses (inverted bearish). Both flip in the same week — pure noise." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR's recovery firms (bullish) while CHF's reversal also firms (inverted bearish). Two strong opposing trends — avoid forcing direction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT / WATCH ★★☆☆☆", note:"Both currencies now in confirmed recoveries pulling EURCHF in opposite directions. Wait for April to clarify which dominates." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "EUR's lowest-conviction, directionless month is overridden by CHF's continuing recovery from its March trough (inverted bearish for EURCHF). CHF becomes the cleaner, dominant driver.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF's recovery firming (inverted bearish, dominant). EUR directionless — CHF controls the pair." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF continuing its climb out of the March trough (inverted bearish). Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"EUR remains flat; CHF's bridge-month rally toward its May spike continues (inverted bearish). CHF fully in control." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF building toward its critical May 5-YR spike (inverted bearish, strengthening). Hold shorts into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's MOST BEARISH MONTH of its entire year (22-YR collapsing toward near-absolute lows ~5–10) opens in direct double alignment with CHF's own 5-YR spike to its absolute peak (inverted bearish for EURCHF, maximum conviction). Late month CHF's CRITICAL FLIP SHORT reverses the inverted effect to bullish, injecting conflict — but EUR's continuing collapse keeps the net bias bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"EUR beginning its waterfall toward annual lows (bearish) while CHF's 5-YR surges toward its own absolute peak ~100 (inverted bearish). Double alignment — high conviction short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★★", note:"EUR collapsing toward ~5–10; CHF's 5-YR peaking at its absolute high (inverted bearish, maximum conviction). Highest-conviction alignment of the month." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT EMERGING ★★★☆☆", note:"EUR still collapsing (bearish) but CHF's CRITICAL FLIP SHORT reverses mid-month (now inverted bullish) — conflict emerges. EUR's structural collapse remains the larger move." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"EUR near its absolute annual low — the larger, more extreme move of the two. CHF's post-flip decline (inverted bullish) only partially offsets. Net bearish into June." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "EUR's annual-low flip month (recovery off its floor) aligns constructively with CHF's continuing post-May waterfall decline (inverted bullish for EURCHF). Double alignment building — a clean flip-long setup.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"COVER ★★☆☆☆", note:"EUR finishing its capitulation at the annual low; CHF's decline continuing (inverted bullish, partially offsetting). Cover remaining shorts." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"WATCH ★★★☆☆", note:"EUR basing at its floor while CHF's waterfall persists (inverted bullish). Forces aligning constructively for EURCHF higher." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG ★★★★☆", note:"EUR turning up off its lows; CHF still declining (inverted bullish). Double alignment confirmed — enter long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"EUR's recovery gaining traction alongside CHF's continued post-peak decline (inverted bullish). Hold into July." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 2,
    note: "EUR enters its own directionless chop while CHF remains near its multi-month lows in its trough zone (inverted bullish for EURCHF). CHF's cleaner — if low-conviction — signal gives EURCHF a modest bullish edge by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF still in its trough zone (inverted bullish, the only directional signal). EUR flat." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF basing near multi-month lows (inverted bullish). Modest edge persists." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★☆☆☆☆", note:"CHF beginning to base — its edge narrows. EUR remains directionless. Reduce size." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"CHF's 40-YR turning up (inverted bearish — early signal of CHF's coming recovery). Prepare for the edge to flip in August." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 2,
    note: "EUR's lowest-conviction month of its entire year (near-flat) is overridden by CHF's recovery off its July trough (inverted bearish for EURCHF). CHF becomes the dominant — if modest — driver by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★☆☆☆", note:"CHF's recovery underway (inverted bearish, dominant). EUR flat." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★☆☆☆", note:"CHF continuing to climb toward its September peak (inverted bearish). Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF's rally strengthening into its Sep spike (inverted bearish). EUR remains passive — CHF dominant." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF approaching its 15-YR spike toward its own absolute peak (inverted bearish, strengthening). Hold into September." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's drop toward its secondary trough opens in double alignment with CHF's spike to its own absolute peak (inverted bearish for EURCHF, maximum conviction). Late month CHF's HIGHEST-CONVICTION REVERSAL of its year flips the inverted effect to bullish — injecting conflict — but the strong early-month alignment carries the net bias bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR declining toward its secondary trough (bearish) while CHF's 15-YR surges toward its absolute peak ~100 (inverted bearish). Double alignment — high conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CHF's 15-YR peaks at its absolute high (inverted bearish, maximum conviction) exactly as EUR continues its own decline. Highest-conviction alignment of the month." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT EMERGING ★★★☆☆", note:"CHF's HIGHEST-CONVICTION REVERSAL of its own year flips mid-month (now inverted bullish) — direct conflict with EUR's continuing decline. Reduce size." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"EUR nearing its trough; CHF's post-peak collapse (inverted bullish) now offsetting. Net edge fading into October." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONFLICT", stars: 2,
    note: "EUR's flip month (Wk1 bounce, then resumes its decline) collides with CHF's continuing post-peak waterfall decline (inverted bullish for EURCHF). EUR's bearish resumption fights CHF's inverted-bullish pull — a genuinely two-sided, low-edge month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR's brief Wk1 bounce vs CHF's continuing post-Sep-peak decline (inverted bullish). Directly opposing — avoid chasing either." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR flips back to its decline (bearish) while CHF also keeps declining (inverted bullish). Comparable opposing forces — net edge thin." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT / SHORT LEAN ★★☆☆☆", note:"EUR's decline firming heading toward its November collapse — marginally the cleaner signal. Light short lean only." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"EUR accelerating toward its annual lows; CHF's decline beginning to stabilise. EUR's building conviction starts to dominate." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR stages its single highest-conviction trade of its entire year — collapsing to ABSOLUTE ANNUAL LOWS (5★). CHF opens its own flip month still in its early-November bear phase (inverted bullish, conflicting) before reversing to its year-end rally (inverted bearish, realigning) by month's end. EUR's extreme, uncontested conviction is the dominant force throughout.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR accelerating toward its annual floor at maximum conviction. CHF still in its early-Nov bear phase (inverted bullish, a mild headwind). EUR's structural collapse dominates." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR approaching absolute lows (~0–10 on the 22-YR) — the single highest-conviction trade of its own year. CHF's headwind narrows as it nears its own turn." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at its absolute annual lows — maximum conviction. CHF's FLIP LONG begins (inverted bearish, now realigning with EUR). Double alignment forming — press shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR basing near its floor; CHF's year-end rally accelerating (inverted bearish, now reinforcing). Hold shorts into December's stand-off." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bear",
    combined: "chop", combinedLabel: "MOST CONTESTED", stars: 3,
    note: "The single most contested month of the EURCHF year — and arguably of the entire forex seasonal calendar. EUR stages its STRONG BULL mirror-image year-end recovery (22-YR surging from ~0 toward ~75–80, 5★ on its own chart) in the very same month that CHF stages the HIGHEST-CONVICTION LONG OF ITS ENTIRE YEAR (40-YR rocketing to its absolute annual peak ~100, also 5★, inverted bearish for EURCHF). Two currencies at maximum conviction, in directly opposing directions, in their own defining trades of the year — a genuine coin-flip month. The magnitudes are judged roughly comparable; expect significant two-way volatility rather than a clean trend.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR beginning its sharp reversal off the Nov floor (bullish) while CHF's year-end surge is also fully underway (inverted bearish). Two powerful moves launching simultaneously — reduce size." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"EUR's recovery accelerating fast (its highest-conviction reversal of the year) while CHF climbs toward its own absolute peak ~100 (inverted bearish). Both at peak conviction in opposite directions — genuinely two-sided." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"EUR surging hard off its lows; CHF's 40-YR nearing its absolute annual peak (inverted bearish, maximum conviction). The defining stand-off of the EURCHF year — avoid forcing direction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"EUR closing near its recovery highs; CHF's 40-YR peaks at ~100 on Dec 31 (inverted bearish, also at its annual extreme). Both currencies close the year at their own maximum-conviction extremes in opposite directions for the pair." },
    ]
  },
];

const SEASONAL_DATA = `
EURCHF — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal) + CHF/USD CME Futures (40-YR seasonal)
Methodology: EUR seasonal tendency combined with the inverse of CHF seasonal tendency (EUR is the base currency — direct; CHF is the quote currency — inverted).

=== EUR COMPONENT (bullish EUR = EURCHF rising) ===
Jan–Feb: EUR bearish — structural decline, sells the Jan 1 open spike.
Mar: EUR ANNUAL TROUGH / FLIP — bottoms Wk1–2, sharp recovery follows.
Apr: EUR's lowest directional bias of the year — chop.
May: EUR's MOST BEARISH MONTH (22-YR) — collapses toward near-absolute annual lows ~5–10.
Jun: EUR FLIP MONTH — annual low reached, recovery begins.
Jul: EUR chop — directionless.
Aug: EUR's lowest-conviction month of the entire year — near flat.
Sep: EUR turns bearish, dropping toward its secondary trough.
Oct: EUR FLIP MONTH — Wk1 bounce then resumes its decline Wk2–4.
Nov: EUR's ABSOLUTE ANNUAL LOWS — single highest-conviction short of its entire year.
Dec: EUR STRONG BULL — mirror-image year-end recovery, surges from ~0 toward ~75–80.

=== CHF COMPONENT (bullish CHF = EURCHF falling, since CHF is inverted) ===
Jan–Feb: CHF bearish — 40-YR declining from ~75 toward ~20–25 (inverted: bullish for EURCHF, partial offset to EUR's own decline).
Mar: CHF ANNUAL TROUGH / FLIP — 40-YR hits absolute low ~5–10 mid-month then reverses sharply (inverted: bearish for EURCHF as CHF turns up).
Apr: CHF bull — recovery continuing from its trough (inverted: bearish for EURCHF).
May: CHF FLIP MONTH — 5-YR SPIKES TO ABSOLUTE PEAK ~100 mid-month (inverted: bearish, maximum conviction) then a CRITICAL FLIP SHORT reverses the effect to bullish late month.
Jun: CHF bear — post-May waterfall decline (inverted: bullish for EURCHF).
Jul: CHF bear — near multi-month lows, trough zone (inverted: bullish, lower conviction).
Aug: CHF bull — recovery begins off its trough (inverted: bearish for EURCHF).
Sep: CHF FLIP MONTH — 15-YR spikes to its absolute peak ~100 mid-month (inverted: bearish, maximum conviction) then its HIGHEST-CONVICTION REVERSAL of the year flips the effect to bullish late month.
Oct: CHF bear — post-Sep-peak decline continues (inverted: bullish for EURCHF).
Nov: CHF FLIP MONTH — bearish early, then begins its massive year-end rally (inverted: bullish early, then bearish as CHF turns up).
Dec: CHF's HIGHEST-CONVICTION LONG OF ITS ENTIRE YEAR — 40-YR rockets to its absolute annual peak ~100 on Dec 31 (inverted: bearish for EURCHF, maximum conviction).

=== COMBINED NET EFFECT ===
Jan–Feb: EUR's structural decline (bearish) directly opposes CHF's own bear leg (inverted bullish) — EUR's larger, cleaner move keeps a marginal bearish edge through a genuinely two-sided stretch.
Mar: Both currencies stage their annual-trough reversals in the SAME month, in opposite directions for the pair — the year's choppiest, lowest-edge transition.
Apr: EUR's directionless chop is overridden by CHF's continuing post-trough recovery (inverted bearish) — CHF becomes the clean, dominant driver.
May: EUR's MOST BEARISH MONTH of its own year opens in powerful double alignment with CHF's 5-YR spike to its absolute peak (inverted bearish, maximum conviction) — among the highest-conviction short windows of the year — before CHF's CRITICAL FLIP SHORT injects late-month conflict.
Jun: EUR's annual-low flip/recovery aligns constructively with CHF's continuing post-peak waterfall (inverted bullish) — clean double alignment, a confident flip-long setup.
Jul: EUR enters its own chop while CHF's low-conviction trough phase (inverted bullish) gives EURCHF a modest bullish edge by elimination.
Aug: EUR's lowest-conviction month of its own year is overridden by CHF's recovery off its trough (inverted bearish) — CHF dominant by elimination, net bearish lean.
Sep: EUR's drop toward its secondary trough opens in powerful double alignment with CHF's spike to its own absolute peak (inverted bearish, maximum conviction) before CHF's HIGHEST-CONVICTION REVERSAL of its year flips the inverted effect to bullish late month.
Oct: EUR's flip month (Wk1 bounce, resumed decline) collides directly with CHF's continuing post-peak decline (inverted bullish) — a genuinely two-sided, low-edge month.
Nov: EUR's single highest-conviction trade of its own entire year (absolute annual lows, 5★) dominates throughout — CHF's own flip month only strengthens the alignment as it turns bearish (inverted) by month's end.
Dec: THE MOST CONTESTED MONTH of the EURCHF year (and arguably of the entire seasonal calendar) — EUR's STRONG BULL mirror-image surge collides head-on with CHF's HIGHEST-CONVICTION LONG OF ITS ENTIRE YEAR (inverted bearish). Both currencies at maximum conviction, in directly opposing directions, in the defining trades of their own years — a genuine coin-flip standoff.

=== PLAYBOOK SIGNALS ===
EURCHF HIGHEST CONVICTION SHORT: September Wk1–2 (double alignment — EUR's secondary-trough decline + CHF's spike to its absolute peak, both at maximum conviction, 5★) and November (EUR's single highest-conviction trade of its own year stands largely uncontested, 4–5★).
EURCHF HIGHEST CONVICTION LONG: June (EUR's annual-low flip aligns cleanly with CHF's continuing post-peak waterfall — double alignment, 4★).
EURCHF MOST CONTESTED / REQUIRES CAREFUL FRAMING: March (both currencies' annual-trough flips collide in the same month) and December (EUR's strongest bull month vs CHF's single highest-conviction long of its entire year — both at maximum conviction in directly opposing directions, a genuine coin-flip).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURCHF explaining how the EUR and CHF seasonal forces interact month by month, with special attention to the December stand-off between each currency's single highest-conviction trade of its own year.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or CHF) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURCHF trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — especially March and December, where both currencies move at maximum conviction in directly opposing directions.
`;
