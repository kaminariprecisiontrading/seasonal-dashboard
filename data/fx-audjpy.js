/**
 * data/fx-audjpy.js — AUDJPY Forex Seasonal
 * Derived from: AUD/USD CME futures + JPY/USD CME futures (inverted)
 * Methodology: AUD seasonal tendency vs inverted JPY seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-audjpy",
  name:     "AUD / JPY",
  sub:      "Forex Seasonal · Derived from AUD CME + JPY CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · AUD/USD CME (34-YR) · Japanese Yen CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "DOUBLE ALIGNMENT — AUD's powerful, all-month launch into its multi-month bull phase (5★, \"enter Dec/Jan lows\") reinforces JPY's own messy opening decline (3★ on its own chart — INVERTED, also bullish for AUDJPY). Both components confirm — a clean, high-conviction opening to the AUDJPY year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"AUD surging from its Dec/Jan lows (bullish, 5★); JPY declining (inverted bullish). Full alignment — enter long with conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"AUD's rally continuing across all TFs; JPY's decline persisting (inverted bullish). Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"AUD trend fully intact; JPY still weak (inverted bullish). Both reinforcing — press longs." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"AUD building into February; JPY's decline persisting into its own primary trough (inverted bullish). Hold into next month." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's continued full-month bullish run (5★, \"hold longs\") dominates over JPY's own primary-trough basing phase (2★ on its own chart — INVERTED, neutral/mildly bullish for AUDJPY). AUD's significantly higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD's rally sustained (bullish, dominant); JPY basing at its trough (inverted, neutral). AUD in full control." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD's strength continuing mid-month; JPY still base-building. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD showing no top signal; JPY beginning its recovery (inverted, early bearish signs — minor opposition forming)." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD building toward its March peak; JPY's recovery firming (inverted bearish, early conflict). AUD's dominant trend carries the month." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bear",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "THE FIRST GREAT COLLISION — AUD's final, decisive leg of its Q1 bull run, peaking late month (5★ on its own chart, bullish) collides directly with JPY's own STRONGEST Q1 WINDOW — all 3 TFs aligned bullish (5★ on its own chart — INVERTED, bearish for AUDJPY). Both currencies post maximum-conviction moves of their own years in directly opposing directions — a genuine coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"MAXIMUM CONFLICT ★★★☆☆", note:"AUD still strong, all TFs aligned (bullish, 5★) directly against JPY's surging strength (inverted bearish, 5★). Two of the year's highest-conviction moves colliding head-on." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"MAXIMUM CONFLICT ★★★☆☆", note:"AUD accelerating into its peak; JPY also accelerating (inverted bearish). Genuinely two-sided — avoid forcing direction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"AUD's 15-yr nearing its peak; JPY's 5-yr/15-yr peaking mid-month before its own rollover (inverted, beginning to ease). The stand-off begins to narrow." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED / WATCH ★★★☆☆", note:"AUD peaks late March (about to flip); JPY's 5-yr/15-yr also rolling over from their mid-month peak (inverted, narrowing). Both approaching their own reversals — stand by for April's dual flip." },
    ]
  },
  {
    month: "April", sig5: "flip", sig15: "flip", sigLt: "chop",
    combined: "chop", combinedLabel: "DUAL FLIP / CONFLICT", stars: 3,
    note: "Both currencies stage critical flip months simultaneously — AUD's single most important reversal of its year (long Wk1, then violent flip short, 5★) collides with JPY's own SELL→WATCH playbook month (3★ on its own chart — buy Wk1 at the 40-yr peak, then sell — INVERTED: bearish then bullish for AUDJPY). A genuinely two-sided, high-volatility transition.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"AUD still bullish early Wk1 (about to flip); JPY's 40-yr at its peak (inverted bearish). Both near extremes — caution." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"DUAL FLIP / CONFLICT ★★★☆☆", note:"AUD's historic flip confirms — rolling over to bearish; JPY's playbook SELL begins (5-yr/15-yr declining, inverted bullish). Two violent reversals in opposing chart-directions — direct conflict for the pair." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"DUAL FLIP / CONFLICT ★★★☆☆", note:"AUD's waterfall confirmed across all TFs (bearish, 5★); JPY's SELL phase accelerating (inverted bullish). Both decisive moves continue to directly oppose — extremely volatile, low-edge." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"AUD's collapse sustained into May; JPY entering its COVER/WATCH phase near its lows (inverted, narrowing). The stand-off persists into May's continuation." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "AUD's deepest waterfall decline of its entire year (5★, \"highest conviction short\") outweighs JPY's own modest, lower-conviction May decline (3★ on its own chart — INVERTED, mildly bullish for AUDJPY, the conflicting but weaker signal). AUD's significantly higher conviction dominates.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD's steep decline accelerating (bearish, 5★, dominant); JPY's own decline beginning (inverted bullish, conflicting but lower conviction). AUD's edge prevails." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD at peak short pressure; JPY's 15-yr extending its own decline (inverted bullish, minor opposition). AUD remains in control." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD continuing its waterfall toward the June trough; JPY beginning to recover (inverted bearish, narrowing the gap). Maintain shorts but watch the narrowing conflict." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"AUD basing near its trough; JPY's recovery beginning (inverted bearish, early conflict). AUD's structural decline still carries the month — hold into June." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "AUD's continuing trough-formation phase (4★ bearish) edges out JPY's own choppy, low-conviction transition month (2★ on its own chart — INVERTED, similarly without strong signal). AUD's cleaner, higher-conviction trend dominates by comparison.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD still declining toward its trough (bearish, dominant); JPY directionless (inverted, neutral). AUD remains the controlling force." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"AUD nearing its trough; JPY's recovery building (inverted bearish, beginning to oppose). Conflict narrows the edge slightly." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"AUD basing at its lows; JPY's mixed signals continuing (inverted, no clean opposition). AUD's structural decline still carries by elimination." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both currencies entering directionless patches ahead of July. Stand aside." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "AUD's own choppy, low-conviction bounce (2★) is overridden by JPY's STRONGEST WINDOW OF ITS ENTIRE YEAR — all 3 TFs aligned bullish (5★ on its own chart — INVERTED, powerfully bearish for AUDJPY). JPY's significantly higher conviction dominates.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY surging with full conviction (inverted bearish, dominant, 5★); AUD's own bounce unconfirmed. JPY in control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY's rally accelerating (inverted bearish); AUD's brief Wk2 long fading. Hold short — JPY dominant." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"JPY continuing higher (inverted bearish); AUD directionless. JPY's edge carries the month." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"JPY building toward its August peak (inverted bearish); AUD rolling back into its own decline. Both ultimately reinforcing — hold short into August's contested transition." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT LEAN / CONTESTED", stars: 3,
    note: "AUD's secondary bear leg (4★, \"re-entry short after Jul bounce\") opens in alignment with JPY's own absolute annual peak — \"all TFs hit highs ~95–100\" (4★ on its own chart — INVERTED, bearish for AUDJPY) — but JPY's mid-month flip to short (its highest-conviction short entry of the year, inverted bullish) introduces sharp late-month conflict.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"AUD's secondary decline confirming (bearish); JPY at its absolute annual peak (inverted bearish). Both align — enter/press short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"AUD continuing lower; JPY in its EXIT LONGS peak zone (inverted bearish, still aligned). Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"CONFLICT ★★☆☆☆", note:"AUD flattening slightly; JPY's historic flip to short fires — \"highest conviction short entry of the year\" (inverted: now bullish for AUDJPY, directly opposing). Sharp conflict emerges — trim shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"AUD still weak; JPY's waterfall decline accelerating (inverted bullish, high conviction, now dominant). The conflict deepens heading into September's collision." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "AUD's continuing broad decline (4★, \"34-yr bear extends longest\") collides head-on with JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"all 3 TFs in sharp decline from the August peak\" (5★ on its own chart — INVERTED, this is JPY's single most decisive move of the year, powerfully bullish for AUDJPY). Both currencies post defining moves of the year in directly opposing directions.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"AUD's bear leg continuing (bearish); JPY's post-peak waterfall accelerating (inverted bullish, 5★ — its highest-conviction trade of the year). Two defining moves colliding head-on." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"AUD declining further; JPY's collapse at peak short pressure (inverted bullish, maximum conviction). Both at near-maximum conviction — avoid forcing direction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"AUD beginning to flatten near its base; JPY's decline continuing with high conviction (inverted bullish). JPY's higher-conviction move begins to dominate." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"AUD basing, directionless; JPY's waterfall persisting toward its October trough (inverted bullish, still dominant). JPY's edge begins to carry the pair into October." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 2,
    note: "AUD's own directionless base-building phase (2★) provides no opposition to JPY's continuing secondary-trough decline (3★ on its own chart — INVERTED, bullish for AUDJPY, the only source of edge in an otherwise quiet month).",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"JPY continuing its decline (inverted bullish, the cleaner signal); AUD directionless. JPY carries the edge — enter long." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"JPY's secondary trough forming (inverted bullish); AUD still base-building. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN / WATCH ★★☆☆☆", note:"JPY basing at its trough (inverted, narrowing); AUD's 5-yr beginning to lift (early bullish signs, aligning). Both starting to point the same direction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG / BUILDING ★★★☆☆", note:"AUD's 5-yr/15-yr turning bullish; JPY's decline persisting (inverted bullish). Early double alignment forming heading into November." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 3,
    note: "DOUBLE ALIGNMENT — AUD's late-month decisive turn (\"all 3 TFs turn, enter long for Dec/Q1 cycle\", 4★ by Wk4) reinforces JPY's continuing secondary bear leg (4★ on its own chart, \"all 3 TFs drop sharply, hits near-annual lows\" — INVERTED, bullish for AUDJPY). Both components ultimately confirm in the same direction.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"JPY continuing its decline (inverted bullish, dominant); AUD still base-building. JPY carries the early month." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"JPY's acceleration lower continuing (inverted bullish); AUD beginning to show early recovery signs (bullish, aligning). Conflict narrowing toward alignment." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bull", com:"DOUBLE ALIGNMENT EMERGING ★★★☆☆", note:"AUD's 5-yr recovering (bullish); JPY's 15-yr still weak (inverted bullish). Both now pointing the same direction — building conviction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"AUD's decisive late-month turn confirms — all 3 TFs align bullish (its cleanest long signal of the year); JPY's decline persisting near its lows (inverted bullish). Full alignment — press longs into December." },
    ]
  },
  {
    month: "December", sig5: "chop", sig15: "bull", sigLt: "bear",
    combined: "chop", combinedLabel: "STAND-OFF / CONTESTED", stars: 3,
    note: "A genuine year-end coin-flip — AUD's confirmed Q1-entry recovery (4★, \"all 3 aligned, entry for Q1 bull\") collides directly with JPY's own year-end recovery from its November lows (4★ on its own chart, \"all 3 TFs recovering... enter long for Dec/Jan cycle\" — INVERTED, bearish for AUDJPY). Both currencies stage simultaneous recoveries in directly opposing directions for the pair, closing the AUDJPY year on a genuinely two-sided note.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"STAND-OFF ★★★☆☆", note:"AUD's recovery building (bullish, 5-yr/15-yr leading); JPY's own recovery also confirming (inverted bearish). Both currencies' year-end rallies launching in direct opposition." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"STAND-OFF ★★★☆☆", note:"AUD's best entry of December — all 3 TFs aligned bullish; JPY's rally also building (inverted bearish). Two confirmed recoveries colliding head-on — avoid forcing size." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"AUD's 5-yr and 34-yr continuing higher; JPY's recovery persisting (inverted bearish). The stand-off continues — genuinely two-sided." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"CONTESTED / CLOSE ★★★☆☆", note:"AUD holding its gains into the new year; JPY also closing its recovery strong (inverted bearish). Both currencies' Q1-entry setups remain in direct opposition — the year closes on a genuine coin-flip." },
    ]
  },
];

const SEASONAL_DATA = `
AUDJPY — FOREX SEASONAL ANALYSIS
Derived from: AUD/USD CME Futures (34-YR seasonal) + Japanese Yen CME Futures (40-YR seasonal)
Methodology: AUD seasonal tendency combined with the inverse of JPY seasonal tendency (AUD is the base currency — direct; JPY is the quote currency — inverted, since JPY strength means fewer JPY per unit of AUD).

=== AUD COMPONENT (bullish AUD = AUDJPY rising) ===
Jan–Mar: AUD bullish all quarter — powerful, sustained rally, all TFs aligned, peaking late March (5★ x3, the strongest sustained run of the AUD year).
Apr: AUD's MOST CRITICAL MONTH — long Wk1 then violent FLIP SHORT, all TFs aligned bearish by Wk3 (5★ — single most violent reversal of AUD's year).
May: AUD's deepest waterfall decline of its entire year (5★).
Jun: AUD bear — trough forming, begin covering into month end (4★).
Jul: AUD chop/mixed — brief Wk2 bounce, no clean trend (2★).
Aug–Sep: AUD's secondary bear leg — broad, extended decline (4★).
Oct: AUD chop/neutral — base building, no edge (2★).
Nov: AUD chop/neutral, with a decisive late-month turn — all 3 TFs align bullish by Wk4, entry for Dec/Q1 cycle (2★ early, 4★ by Wk4).
Dec: AUD bull — confirmed recovery, all 3 aligned, entry for Q1 bull (4★).

=== JPY COMPONENT (bullish JPY = AUDJPY falling, since JPY is inverted) ===
Jan: JPY bear — messy decline from year-end highs, TFs split (3★; inverted: bullish for AUDJPY).
Feb: JPY chop/neutral — 40-yr hits its primary trough, base forming (2★; inverted: neutral).
Mar: JPY's STRONGEST Q1 WINDOW — all 3 TFs aligned bullish, enter long, exit mid-month (5★; inverted: bearish for AUDJPY, maximum conviction — directly opposing AUD's own peak this same month).
Apr: JPY's SELL→WATCH playbook month — buy Wk1 (40-yr peak) then sell end Wk2/Wk3, re-entry Wk4 (3★; inverted: bearish then bullish for AUDJPY as JPY declines).
May: JPY bear — 15-yr extends April decline into a May trough; 5-yr/40-yr choppy (3★; inverted: mildly bullish for AUDJPY).
Jun: JPY chop/mixed — transition month, TFs diverging (2★; inverted: similarly without signal).
Jul: JPY's STRONGEST MONTH — all 3 TFs aligned strongly bullish, enter long, hold into August peak (5★; inverted: powerfully bearish for AUDJPY, maximum conviction).
Aug: JPY's ABSOLUTE ANNUAL PEAK — all TFs hit highs ~95–100, then EXIT LONGS Wk2, FLIP SHORT Wk3 — JPY's HIGHEST CONVICTION SHORT ENTRY OF THE YEAR fires mid-month (4★; inverted: bearish for AUDJPY early, then powerfully bullish as JPY collapses).
Sep: JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — sharp decline from the August peak continues, all 3 TFs aligned (5★; inverted: powerfully bullish for AUDJPY, JPY's single most decisive move of the year).
Oct: JPY bear — secondary trough forming, 15-yr/40-yr declining, 5-yr volatile (3★; inverted: bullish for AUDJPY).
Nov: JPY bear — all 3 TFs drop sharply, 15-yr hits near-annual lows, secondary bear leg (4★; inverted: bullish for AUDJPY).
Dec: JPY bull — all 3 TFs recovering from November lows, enter long for the Dec/Jan seasonal cycle (4★; inverted: bearish for AUDJPY).

=== COMBINED NET EFFECT ===
Jan–Feb: DOUBLE ALIGNMENT — AUD's powerful, all-month launch reinforces JPY's own messy opening decline (inverted bullish). A clean, high-conviction opening to the year.
Mar: MAXIMUM CONFLICT — AUD's final, decisive Q1 leg (peaking late month) collides directly with JPY's own strongest Q1 window (inverted bearish). Both post maximum-conviction moves of their own years in directly opposing directions — a genuine coin-flip.
Apr: DUAL FLIP / CONFLICT — both currencies stage critical flip months simultaneously (AUD's single most violent reversal of its year vs JPY's SELL playbook, inverted). The most genuinely two-sided, high-volatility month of the year.
May: AUD's deepest waterfall decline of its entire year outweighs JPY's own modest, lower-conviction decline (inverted bullish, conflicting but weaker) — AUD's significantly higher conviction dominates.
Jun: AUD's continuing trough-formation phase edges out JPY's own choppy, low-conviction transition — AUD's cleaner trend dominates by comparison.
Jul: AUD's own choppy bounce is overridden by JPY's strongest window of its entire year (inverted bearish) — JPY's significantly higher conviction dominates.
Aug: Early-month double alignment (AUD's secondary decline + JPY at its annual peak, inverted bearish) gives way to sharp late-month conflict as JPY's historic flip to short (its highest-conviction short entry of the year, inverted bullish) directly opposes.
Sep: MAXIMUM CONFLICT — AUD's continuing broad decline collides head-on with JPY's highest-conviction short of its entire year (inverted, powerfully bullish — JPY's single most decisive move of the year). Both post defining moves in directly opposing directions.
Oct: AUD's directionless base-building provides no opposition to JPY's continuing secondary-trough decline (inverted bullish) — the only source of edge in an otherwise quiet month.
Nov: DOUBLE ALIGNMENT — AUD's decisive late-month turn (its cleanest long signal of the year) reinforces JPY's continuing secondary bear leg (inverted bullish). Both components ultimately confirm in the same direction.
Dec: A GENUINE YEAR-END STAND-OFF — AUD's confirmed Q1-entry recovery collides directly with JPY's own year-end recovery from its November lows (inverted bearish). Both currencies stage simultaneous recoveries in directly opposing directions, closing the year on a genuinely two-sided note.

=== PLAYBOOK SIGNALS ===
AUDJPY HIGHEST CONVICTION LONG: January (double alignment — AUD's powerful launch + JPY's messy decline, inverted bullish, both confirm, 5★) and November (double alignment — AUD's decisive late-month turn, its cleanest signal of the year, + JPY's continuing bear leg, inverted bullish, 4★).
AUDJPY HIGHEST CONVICTION SHORT: July (JPY's strongest window of its entire year, inverted bearish, dominates AUD's own chop, 4★) and the Aug Wk1–2 double-alignment window (AUD's secondary decline + JPY at its annual peak, inverted bearish, both confirm, 4★).
AUDJPY MOST CONTESTED / REQUIRES CAREFUL FRAMING: March (MAXIMUM CONFLICT — both currencies' single highest-conviction Q1 moves collide head-on), September (MAXIMUM CONFLICT — AUD's broad decline vs JPY's single highest-conviction short of its entire year, inverted bullish), and December (THE ULTIMATE STAND-OFF — both currencies stage simultaneous year-end recoveries in directly opposing directions, closing the calendar on a genuine coin-flip).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for AUDJPY explaining how the AUD and JPY seasonal forces interact month by month, with special attention to the three genuinely contested "stand-off" months: March, September, and December.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (AUD or JPY) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction AUDJPY trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially March, September, and December, where both currencies repeatedly post their defining moves of the year in directly opposing directions.
`;
