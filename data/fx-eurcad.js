/**
 * data/fx-eurcad.js — EURCAD Forex Seasonal
 * Derived from: EUR/USD CME futures + CAD/USD CME futures (inverted)
 * Methodology: EUR seasonal tendency vs inverted CAD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-eurcad",
  name:     "EUR / CAD",
  sub:      "Forex Seasonal · Derived from EUR CME + CAD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · CAD/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "Both currencies open the year with high-conviction declines on their own charts pointed in directly opposing directions for the pair — EUR's \"5-YR spikes to ~100 at the open then immediate sell\" (4★, bearish) collides with CAD's own \"5-YR spikes then collapses, fade the spike\" (4★ on its own chart — INVERTED, bullish for EURCAD). Two equally-weighted moves in direct opposition — a genuine coin-flip open to the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR's open-spike fading hard (bearish); CAD's own spike also fading (inverted bullish). Two equally-weighted opens directly opposing — avoid forcing direction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR's decline persisting; CAD's own decline also continuing (inverted bullish). The stand-off remains genuinely two-sided." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"EUR still pressured toward its trough; CAD also still pressured (inverted bullish). Both currencies' declines deepening in opposite chart-directions for the pair." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"EUR approaching its own base; CAD basing into February (inverted bullish, narrowing). The conflict eases only slightly heading into next month." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 2,
    note: "EUR's continuing decline toward its annual trough (4★, \"approaching trough\") collides directly with CAD's own continuing decline (4★ on its own chart — INVERTED, bullish for EURCAD). Both currencies post equally high-conviction moves in directly opposing directions — the stand-off from January persists at full intensity.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★☆☆☆", note:"EUR declining (bearish); CAD also declining (inverted bullish). Equal-conviction collision — no clean edge." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★☆☆☆", note:"Both currencies' declines deepening in directly opposing chart-directions for the pair. Genuinely two-sided." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"EUR nearing its critical March trough; CAD also approaching its own base (inverted bullish, narrowing). The stand-off begins to ease as EUR's flip month approaches." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"EUR's trough imminent (about to flip); CAD also basing. Stand by for March's resolution." },
    ]
  },
  {
    month: "March", sig5: "flip", sig15: "flip", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "EUR's FLIP MONTH — \"all three TFs trough around Wk1-2 then sharp recovery, 22-YR bounces from ~35 to ~65\" (4★) — dominates over CAD's own choppy, diverging recovery attempt (2★ on its own chart — INVERTED, neutral). EUR's higher-conviction reversal carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"FLIP / WATCH ★★★☆☆", note:"EUR still weak early month, approaching its trough (about to flip); CAD directionless. Watch for EUR's reversal confirmation." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"bull", com:"FLIP → LONG ★★★★☆", note:"EUR's historic trough confirms — flipping to recovery (bullish, 22-yr bouncing from ~35); CAD still mixed. EUR's reversal beginning to dominate." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR's recovery accelerating (bullish, cleaner signal); CAD's own diverging signals offer no resistance. EUR's edge carries." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"EUR's bounce persisting toward ~65; CAD remains directionless. EUR dominates into April." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR's own directionless, choppy mid-range stretch (2★, \"no clean directional bias\") provides no resistance to CAD's strong bull spike — \"5-YR spikes hard to ~85-90 mid-month, strong long Wk1-2\" (4★ on its own chart — INVERTED, bearish for EURCAD). CAD's higher conviction dominates by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's spike launching (inverted bearish, dominant); EUR directionless. CAD's edge carries — enter short." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's rally accelerating (inverted bearish); EUR still mixed. Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's spike persisting; EUR's chop continuing to offer no opposition. CAD's structural edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD building toward its May peak (inverted bearish); EUR approaching its own most bearish month of the year. Stand by for May's defining collision." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT — STAND-OFF", stars: 4,
    note: "THE DEFINING COLLISION OF THE EURCAD CALENDAR — EUR posts its MOST BEARISH MONTH OF ITS ENTIRE 22-YEAR SEASONAL: \"collapses to near absolute annual low ~5-10\" (5★) — in the SAME month CAD's own 40-yr peaks then rolls over (4★ on its own chart — INVERTED, bullish for EURCAD, directly opposing). EUR's slightly higher conviction — its single most extreme month of the year — ultimately dominates, but the collision is genuine.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"STAND-OFF / WATCH ★★★☆☆", note:"EUR opens with a brief Wk1 long before its collapse begins; CAD still climbing toward its peak (inverted bearish). Two extremes approaching from opposite sides." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★☆", note:"EUR's historic collapse confirms — its most bearish month of the year firing; CAD's 40-yr peaking simultaneously (inverted bearish, directly opposing). Both currencies' defining moves collide head-on." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR's waterfall toward its absolute annual low accelerating (its highest-conviction move of the year); CAD beginning to roll over from its peak (inverted bullish, now reinforcing EUR's decline). EUR's extreme conviction takes control." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at its near-absolute annual low — maximum conviction short; CAD's rollover confirming (inverted bullish, now aligned). Both reinforcing by month's end — hold short with conviction." },
    ]
  },
  {
    month: "June", sig5: "flip", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "DOUBLE ALIGNMENT — EUR's FLIP MONTH (\"at/near absolute annual low then recovery begins, flip long from Wk2-3\", 3★, bullish for EURCAD) reinforces CAD's own continuing decline (4★ on its own chart, \"near lows, deep seasonal trough zone\" — INVERTED, bullish for EURCAD). Both components confirm in the same direction — a clean, high-conviction long window.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", sLt:"bull", com:"FLIP / WATCH ★★★☆☆", note:"EUR still at its lows pre-flip (about to reverse); CAD declining toward its own trough (inverted bullish, already aligned). Early positioning for the flip." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"EUR's historic flip confirms — recovery from its annual low begins (bullish); CAD's decline persisting (inverted bullish). Both align — enter long with conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"EUR's recovery accelerating; CAD still near its lows (inverted bullish). Full alignment — press the trade with maximum conviction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"EUR's bounce persisting; CAD basing at its trough (inverted bullish, still aligned). Hold into July's CAD-dominated transition." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "CAD's HIGHEST CONVICTION LONG OF ITS ENTIRE YEAR — \"powerful recovery, high conviction long\" (5★ on its own chart — INVERTED, powerfully bearish for EURCAD) — completely overwhelms EUR's own choppy, noisy bounce-and-fade stretch (2★, \"5-YR spikes early then fades, high noise\"). CAD's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's powerful recovery launching (inverted bearish, dominant, 5★); EUR's early spike fading. CAD in full control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD's rally accelerating (inverted bearish, maximum conviction); EUR directionless, offering no resistance. Hold short with conviction." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's recovery persisting; EUR's noise continuing without direction. CAD's edge remains dominant." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD building toward its August peak (inverted bearish); EUR's lowest-conviction month of the year approaching. CAD's structural dominance carries into August." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR's lowest-conviction month of its entire year (1★, \"no clean directional bias\") provides no opposition to CAD's continuing strength near its annual peak (4★ on its own chart — INVERTED, bearish for EURCAD). CAD dominates by default in an otherwise quiet month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD near its peak (inverted bearish, the only source of edge); EUR directionless. CAD's edge carries — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's strength persisting; EUR offering no opposition. Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★☆☆☆", note:"CAD beginning to flatten near its highs (inverted bearish, narrowing); EUR still without signal. CAD's structural strength still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN / WATCH ★★☆☆☆", note:"CAD approaching its critical September flip; EUR beginning to show early signs ahead of its own September decline. Stand by for next month's contested transition." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "DOUBLE ALIGNMENT → CONFLICT", stars: 3,
    note: "Early-month double alignment — EUR's decline toward its September trough (4★, \"drops sharply to ~22-25\", bearish) matches CAD's continuing strength near its own annual peak (inverted bearish, both pointing the same direction) — gives way to sharp late-month conflict as CAD stages its FLIP MONTH: \"40-yr and 15-yr hit absolute annual peak ~100 mid-month then collapse\" (5★ on its own chart — INVERTED, this becomes bullish for EURCAD as CAD reverses). The month transitions from alignment to opposition at its midpoint.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"EUR declining toward its trough (bearish); CAD still strong near its peak (inverted bearish). Both align — short with conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"EUR's decline persisting; CAD at its absolute annual peak ~100 (inverted bearish, still aligned). Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"DUAL FLIP / CONFLICT ★★★☆☆", note:"CAD's historic collapse begins — its highest-conviction reversal of the year (inverted: now bullish for EURCAD); EUR's decline continuing (still bearish). Direct conflict emerges sharply." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"EUR nearing its trough (bearish); CAD's post-peak waterfall accelerating (inverted bullish, now opposing). Genuinely two-sided into October." },
    ]
  },
  {
    month: "October", sig5: "flip", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 3,
    note: "EUR's own FLIP MONTH — \"5-YR spikes to ~85-90 early-month then all TFs roll back over mid-month, cover Wk1 spike then flip short Wk2-4\" (3★) — opens in alignment with CAD's continuing post-peak collapse (4★ on its own chart, \"sharp post-Sep decline, drops from 100 toward ~75\" — INVERTED, bullish for EURCAD), but EUR's own mid-month flip to bearish creates direct late-month conflict with CAD's still-falling chart.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★☆☆", note:"EUR's early-month spike launching (bullish); CAD's post-peak collapse continuing (inverted bullish). Both align early — enter long." },
      { wk:"Wk 2", s5:"flip", s15:"bear", sLt:"bull", com:"FLIP / CONFLICT ★★★☆☆", note:"EUR's historic flip confirms — rolling over from its spike (now bearish); CAD's decline persisting (inverted still bullish, directly opposing). Conflict emerges sharply." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR's flip to short accelerating (bearish); CAD's waterfall also continuing (inverted bullish, still opposing). Genuinely two-sided." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR's bearish flip confirmed and dominant; CAD's decline beginning to ease (inverted bullish, narrowing). EUR's confirmed reversal begins to carry the edge into November." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"absolute annual lows across all TFs\" (5★) — dominates over CAD's own continuing but easing decline (3★ on its own chart — INVERTED, mildly bullish for EURCAD, the conflicting but significantly weaker signal). EUR's vastly higher conviction carries the month outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR collapsing toward its absolute annual lows (bearish, dominant, 5★); CAD's own decline easing (inverted bullish, conflicting but far weaker). EUR's edge prevails decisively." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at maximum conviction — its single highest-conviction trade of the year; CAD offering only minor opposition. Hold short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR's collapse persisting near its lows; CAD's decline continuing to ease (inverted bullish, narrowing slightly). EUR's structural dominance still carries." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR closing its defining month at its annual lows; CAD basing near its own trough (inverted, neutral). EUR's edge dominates into December's reversal." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "EUR's STRONG BULL — \"year-end recovery, mirror image of November's lows, 22-YR surges from ~0 to ~75-80\" (5★) — dominates over CAD's own directionless, low-conviction year-end base-building phase (2★ on its own chart — INVERTED, neutral). EUR's vastly higher conviction carries the month, closing the EURCAD calendar on a clean, decisive note.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR's year-end recovery launching with full conviction (bullish, mirror image of November's collapse, 5★); CAD basing in its annual low zone, no opposition. EUR in full control — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR's surge accelerating toward ~75-80 on the 22-yr; CAD still directionless. Hold long with maximum conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR's rally persisting near its highs; CAD's very-late-month recovery just beginning (inverted bearish, too small to offset). EUR's structural dominance continues." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR closing the year at its strongest — the mirror image of its November collapse; CAD's recovery still nascent. Hold long into year close — EUR's defining recovery dominates the calendar's final month." },
    ]
  },
];

const SEASONAL_DATA = `
EURCAD — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal) + CAD/USD CME Futures (40-YR seasonal)
Methodology: EUR seasonal tendency combined with the inverse of CAD seasonal tendency (EUR is the base currency — direct; CAD is the quote currency — inverted, since CAD strength means fewer CAD per unit of EUR).

=== EUR COMPONENT (bullish EUR = EURCAD rising) ===
Jan: EUR bear — \"5-YR spikes to ~100 at the open — immediate sell\" (4★).
Feb: EUR bear — \"approaching trough\" (4★).
Mar: EUR's FLIP MONTH — \"all three TFs trough around Wk1-2 then sharp recovery, 22-YR bounces from ~35 to ~65\" (4★).
Apr: EUR chop — \"22-YR flat/choppy mid-range, no clean directional bias\" (2★).
May: EUR's MOST BEARISH MONTH ON THE 22-YR — \"collapses to near absolute annual low ~5-10, long Wk1 then strong short Wk2-4\" (5★).
Jun: EUR's FLIP MONTH — \"22-YR at/near absolute annual low then recovery begins, flip long from Wk2-3\" (3★).
Jul: EUR chop — \"5-YR spikes hard early then fades, high noise\" (2★).
Aug: EUR's LOWEST CONVICTION MONTH OF THE YEAR — no clean directional bias (1★).
Sep: EUR bear — \"22-YR drops sharply to ~22-25 (Sep trough)\" (4★).
Oct: EUR's FLIP MONTH — \"5-YR spikes to ~85-90 early-month then all TFs roll back over mid-month, cover Wk1 spike then flip short Wk2-4\" (3★).
Nov: EUR's HIGHEST CONVICTION SHORT OF THE YEAR — \"absolute annual lows across all TFs\" (5★).
Dec: EUR's STRONG BULL — \"year-end recovery, mirror image of Nov lows, 22-YR surges from ~0 to ~75-80\" (5★).

=== CAD COMPONENT (bullish CAD = EURCAD falling, since CAD is inverted) ===
Jan: CAD bear — \"5-YR spikes to ~95 at the open then collapses, fade the spike\" (4★; inverted: bullish for EURCAD).
Feb: CAD bear — continuing decline (4★; inverted: bullish for EURCAD).
Mar: CAD chop/flip — \"40-YR begins recovery from Feb lows, TFs diverging\" (2★; inverted: neutral).
Apr: CAD bull — \"5-YR spikes hard to ~85-90 mid-month, strong long Wk1-2\" (4★; inverted: bearish for EURCAD).
May: CAD bear — \"40-YR peaks first half of May then rolls over\" (4★; inverted: bullish for EURCAD).
Jun: CAD bear — \"near lows, deep seasonal trough zone\" (4★; inverted: bullish for EURCAD).
Jul: CAD's HIGHEST CONVICTION LONG OF ITS ENTIRE YEAR — \"powerful recovery, high conviction long\" (5★; inverted: powerfully bearish for EURCAD).
Aug: CAD bull — \"5-YR at or near peak ~90-95\" (4★; inverted: bearish for EURCAD).
Sep: CAD's FLIP MONTH — \"HIGHEST CONVICTION REVERSAL OF THE YEAR — 40-yr and 15-yr hit absolute annual peak ~100 mid-month then collapse\" (5★; inverted: bearish for EURCAD as CAD climbs, then powerfully bullish as CAD reverses).
Oct: CAD bear — \"sharp post-Sep decline, drops from 100 toward ~75\" (4★; inverted: bullish for EURCAD).
Nov: CAD bear — \"severity easing late November\" (3★; inverted: mildly bullish for EURCAD).
Dec: CAD chop/base — \"all TFs converge near 0-25, annual low zone, year-end recovery very late\" (2★; inverted: neutral).

=== COMBINED NET EFFECT ===
Jan–Feb: MAXIMUM CONFLICT — both currencies open the year with high-conviction declines on their own charts pointed in directly opposing directions for the pair (CAD's, inverted, bullish for EURCAD). A genuine coin-flip stretch with no clean dominant component.
Mar: EUR's flip-month recovery (its annual trough reversal) dominates over CAD's own choppy, diverging recovery attempt — EUR's higher-conviction reversal carries the month.
Apr: EUR's own directionless chop provides no resistance to CAD's strong bull spike (inverted bearish for EURCAD) — CAD's higher conviction dominates by elimination.
May: THE DEFINING COLLISION — EUR posts its single most bearish month of its entire 22-year seasonal in the SAME month CAD's 40-yr peaks and rolls over (inverted bullish, directly opposing). EUR's slightly higher, more extreme conviction ultimately dominates, but the stand-off is genuine.
Jun: DOUBLE ALIGNMENT — EUR's flip-month recovery from its annual low reinforces CAD's own continuing decline (inverted bullish). Both components confirm — a clean, high-conviction long window.
Jul: CAD's highest-conviction long of its entire year (inverted, powerfully bearish for EURCAD) completely overwhelms EUR's own choppy, noisy bounce-and-fade stretch — CAD's vastly higher conviction dominates outright.
Aug: EUR's lowest-conviction month of its entire year provides no opposition to CAD's continuing strength (inverted bearish) — CAD dominates by default in an otherwise quiet month.
Sep: Early-month double alignment (both bearish for the pair) gives way to sharp late-month conflict as CAD stages its own flip-month reversal (inverted, becoming bullish for EURCAD) — the month transitions from alignment to opposition at its midpoint.
Oct: EUR's own flip-month reversal opens in alignment with CAD's continuing post-peak collapse (inverted bullish), but EUR's mid-month flip to bearish creates direct late-month conflict with CAD's still-falling chart — genuinely two-sided.
Nov: EUR's highest-conviction short of its entire year — absolute annual lows across all timeframes — dominates over CAD's own continuing but easing decline (inverted, mildly bullish, conflicting but far weaker). EUR's vastly higher conviction carries the month outright.
Dec: EUR's strong bull year-end recovery — the mirror image of its November collapse — dominates over CAD's own directionless, low-conviction year-end base-building phase. EUR's vastly higher conviction closes the calendar on a clean, decisive note.

=== PLAYBOOK SIGNALS ===
EURCAD HIGHEST CONVICTION LONG: December (EUR's strong bull year-end recovery — the mirror image of its November lows — dominates CAD's own directionless base, 5★) and June (double alignment — EUR's flip-month recovery + CAD's continuing decline, inverted bullish, both confirm, 4-5★).
EURCAD HIGHEST CONVICTION SHORT: November (EUR's single highest-conviction trade of its entire year — absolute annual lows across all timeframes — dominates CAD's own weaker, easing decline, 5★) and July (CAD's highest-conviction long of its own year, inverted, powerfully bearish for EURCAD, overwhelms EUR's noisy chop, 4-5★).
EURCAD MOST CONTESTED / REQUIRES CAREFUL FRAMING: January-February (MAXIMUM CONFLICT — both currencies' opening declines collide in direct opposition), May (THE DEFINING STAND-OFF — EUR's single most bearish month of its entire year collides with CAD's own 40-yr peak-and-roll, in directly opposing directions), and September-October (DUAL FLIP transition — both currencies stage reversals in close succession, repeatedly flipping the conflict's character).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURCAD explaining how the EUR and CAD seasonal forces interact month by month, with special attention to May's defining stand-off and the January-February and September-October contested stretches.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or CAD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURCAD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially May, where EUR's single most bearish month of its entire year collides with CAD's own defining peak-and-reversal in directly opposing directions.
`;
