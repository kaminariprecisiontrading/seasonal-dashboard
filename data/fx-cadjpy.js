/**
 * data/fx-cadjpy.js — CADJPY Forex Seasonal
 * Derived from: CAD/USD CME futures + JPY/USD CME futures (inverted)
 * Methodology: CAD seasonal tendency vs inverted JPY seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-cadjpy",
  name:     "CAD / JPY",
  sub:      "Forex Seasonal · Derived from CAD CME + JPY CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · CAD/USD CME (40-YR) · Japanese Yen CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "CAD's structural opening decline — \"5-YR spikes to ~95 at the open then collapses, fade the spike\" (4★) — outweighs JPY's own messy, lower-conviction January decline (3★ on its own chart — INVERTED, mildly bullish for CADJPY, the conflicting but weaker signal). CAD's higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's open-spike fading hard (bearish, dominant); JPY also declining (inverted bullish, conflicting but weaker). CAD's edge prevails." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's decline continuing; JPY's own messy decline persisting (inverted bullish, minor opposition). Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD still pressured; JPY beginning to stabilise (inverted, narrowing). CAD's structural decline still carries." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD basing into February; JPY nearing its own primary trough (inverted, neutral). CAD's edge holds by elimination." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "CAD's continuing decline (4★) faces no real resistance from JPY's own choppy, low-conviction trough-formation phase (2★ on its own chart — INVERTED, neutral). CAD remains the only source of clean directional edge.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD declining (bearish, dominant); JPY directionless at its trough (inverted, neutral). CAD in full control." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's decline persisting; JPY still base-building. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD approaching its own base; JPY beginning to show early signs of its March turn (inverted, early bearish signs forming). Minor opposition emerging." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD basing; JPY's recovery building toward its own strongest Q1 window (inverted bearish, building toward March's collision). CAD's edge still carries by elimination." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "JPY's STRONGEST Q1 WINDOW — \"all 3 TFs aligned bullish, enter long, exit mid-month\" (5★ on its own chart — INVERTED, powerfully bearish for CADJPY) — overwhelms CAD's own choppy, diverging recovery attempt (2★, \"TFs diverging, no clean bias\"). JPY's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY surging with full conviction (inverted bearish, dominant, 5★); CAD's own signals offer no resistance. JPY in control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"JPY's rally accelerating toward its mid-month exit point (inverted bearish, maximum conviction). Hold short — JPY dominant." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"JPY exiting its long near its peak (inverted, narrowing slightly); CAD still directionless. JPY's edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"JPY's rally fading post-exit (inverted, narrowing further); CAD beginning to show early bullish signs ahead of its own April spike. Conflict starting to build into April." },
    ]
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 3,
    note: "CAD's strong bull spike — \"5-YR spikes hard to ~85-90 mid-month, strong long Wk1-2\" (4★) — opens directly against JPY's SELL→WATCH playbook month (3★ on its own chart — buy Wk1 at the 40-yr peak, then sell — INVERTED: bearish early, then bullish for CADJPY as JPY declines). Early conflict resolves into late-month double alignment as both currencies' moves begin to reinforce.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"CAD's spike launching (bullish); JPY at its own 40-yr peak pre-flip (inverted bearish, directly opposing). Two-sided open to the month." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"CAD's rally continuing; JPY's playbook SELL begins — declining off its peak (inverted now turning bullish, narrowing the conflict). The stand-off begins to ease." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT EMERGING ★★★☆☆", note:"CAD's spike persisting (bullish); JPY's decline accelerating (inverted bullish). Both now reinforcing — building toward alignment." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"CAD building toward its May peak (bullish); JPY's SELL phase persisting toward its re-entry point (inverted bullish). Full alignment by month's end — press longs." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "CAD's rollover from its 40-yr peak — \"peaks first half of May then rolls over\" (4★) — outweighs JPY's own modest, lower-conviction May decline (3★ on its own chart — INVERTED, mildly bullish for CADJPY, the conflicting but weaker signal). CAD's higher conviction dominates.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's 40-yr rolling over from its peak (bearish, dominant); JPY's own decline beginning (inverted bullish, conflicting but weaker). CAD's edge prevails." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's decline confirming; JPY's 15-yr also extending lower (inverted bullish, minor opposition). CAD remains in control." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD continuing toward its June trough; JPY beginning to recover (inverted bearish, narrowing the gap). Maintain shorts but watch the conflict narrow." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN / WATCH ★★★☆☆", note:"CAD basing near its trough; JPY's recovery building (inverted bearish, early conflict). CAD's structural decline still carries the month." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "CAD's continuing decline into its deep seasonal trough zone (4★, \"near lows\") faces little resistance from JPY's own choppy, low-conviction transition month (2★ on its own chart — INVERTED, similarly without strong signal). CAD's cleaner trend dominates by comparison.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD declining toward its trough (bearish, dominant); JPY directionless (inverted, neutral). CAD remains the controlling force." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"CAD nearing its trough; JPY's mixed signals continuing (inverted, no clean opposition). CAD's edge still carries." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD basing at its lows; JPY beginning to show early bullish signs ahead of July (inverted, early bearish signs for CADJPY forming). Minor opposition building." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"Both currencies entering their own pivotal months. Stand by for July's defining stand-off." },
    ]
  },
  {
    month: "July", sig5: "flip", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — STAND-OFF", stars: 3,
    note: "THE DEFINING COLLISION OF THE CADJPY CALENDAR — both currencies post the SINGLE STRONGEST WINDOW OF THEIR RESPECTIVE YEARS in the SAME month, in directly opposing chart-directions. CAD's \"powerful recovery, highest conviction long\" (5★) collides head-on with JPY's own \"strongest month — all 3 TFs aligned strongly bullish\" (5★ on its own chart — INVERTED, powerfully bearish for CADJPY). A genuine maximum-conviction coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"CAD's powerful recovery launching (bullish, 5★); JPY also surging with full conviction (inverted bearish, 5★). Two of the year's highest-conviction trades colliding head-on." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"CAD's rally accelerating; JPY's rally also accelerating (inverted bearish). Genuinely two-sided — avoid forcing direction." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"CAD's recovery persisting; JPY building toward its August peak (inverted bearish, still strong). The stand-off continues at full intensity." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"CAD building toward its own August peak; JPY nearing its absolute annual high (inverted bearish, near maximum conviction). Both currencies' defining trades remain locked in direct opposition heading into August." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 3,
    note: "CAD's continuing strength near its annual peak (4★, \"5-YR at or near peak ~90-95\") opens directly against JPY's own absolute annual peak — \"all TFs hit highs ~95-100\" (4★ on its own chart — INVERTED, bearish for CADJPY) — but JPY's mid-month flip to short (its highest-conviction short entry of the year, inverted bullish) introduces sharp late-month alignment with CAD's own continuing strength.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"CAD near its peak (bullish); JPY also at its absolute annual peak (inverted bearish, directly opposing). Two strong trends colliding." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"CAD's strength persisting; JPY in its EXIT LONGS peak zone (inverted bearish, still opposing). The stand-off continues." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bull", com:"DOUBLE ALIGNMENT EMERGING ★★★☆☆", note:"CAD still strong; JPY's historic flip to short fires — its highest conviction short entry of the year (inverted: now bullish for CADJPY, aligning with CAD). Conflict resolving into alignment." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"CAD approaching its own September flip; JPY's collapse from its peak accelerating (inverted bullish, now reinforcing). Both confirming — press long into September's contested transition." },
    ]
  },
  {
    month: "September", sig5: "flip", sig15: "flip", sigLt: "bull",
    combined: "chop", combinedLabel: "DUAL FLIP / CONTESTED", stars: 3,
    note: "Both currencies stage their own HIGHEST-CONVICTION REVERSAL OF THE YEAR in the same month. CAD's \"40-yr and 15-yr hit absolute annual peak ~100 mid-month then collapse\" (5★) opens in alignment with JPY's continuing post-peak waterfall (5★ on its own chart, \"highest conviction short of the year\" — INVERTED, bullish for CADJPY) — but as CAD's own collapse confirms mid-month, its decline begins to directly oppose JPY's still-falling chart (inverted still bullish), creating sharp late-month conflict.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"CAD surging toward its annual peak (bullish, 5★); JPY's collapse from its August peak continuing (inverted bullish, 5★). Both align — press long with maximum conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"PEAK / WATCH ★★★★★", note:"CAD at its absolute annual peak ~100 (about to flip); JPY's waterfall persisting (inverted bullish). Maximum tension as CAD's historic reversal point approaches." },
      { wk:"Wk 3", s5:"flip", s15:"flip", sLt:"chop", com:"DUAL CONFLICT ★★★☆☆", note:"CAD's historic collapse begins — its highest-conviction reversal of the year (now bearish); JPY's decline continuing (inverted bullish, now directly opposing CAD's own move). Direct conflict emerges sharply." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"CAD's post-peak waterfall accelerating (bearish); JPY's decline persisting near its own trough (inverted bullish, still opposing). Genuinely two-sided into October." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "CAD's sharp post-peak decline — \"drops from 100 toward ~75\" (4★) — outweighs JPY's own lower-conviction secondary-trough decline (3★ on its own chart — INVERTED, mildly bullish for CADJPY, the conflicting but weaker signal). CAD's higher conviction continues to dominate.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's post-peak waterfall continuing (bearish, dominant); JPY's own decline persisting (inverted bullish, conflicting but weaker). CAD's edge prevails." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD declining further toward ~75; JPY's secondary trough forming (inverted bullish, minor opposition). Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD showing signs of stabilisation mid-month; JPY's decline persisting (inverted bullish, narrowing the gap). CAD's structural decline still carries." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD resuming its decline toward November lows; JPY continuing lower (inverted bullish, still conflicting). CAD's edge continues by virtue of higher conviction." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 2,
    note: "CAD's continuing but easing decline (3★, \"severity easing late month\") collides directly with JPY's own secondary bear leg — \"all 3 TFs drop sharply, hits near-annual lows\" (4★ on its own chart — INVERTED, bullish for CADJPY). JPY's slightly higher conviction edges the balance, but the moves remain in genuine opposition.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"CAD still declining (bearish); JPY's secondary leg accelerating (inverted bullish, slightly higher conviction). Genuinely two-sided." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"CAD's decline persisting; JPY's drop sharpening toward its near-annual lows (inverted bullish). The conflict deepens." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CAD's decline beginning to ease; JPY's decline still dominant (inverted bullish, now carrying the higher-conviction edge). JPY's signal begins to dominate." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CAD basing near its lows; JPY's decline persisting toward its own year-end recovery point (inverted bullish). JPY's edge carries into December." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "chop", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "JPY's year-end recovery from its November lows — \"all 3 TFs recovering, enter long for the Dec/Jan seasonal cycle\" (4★ on its own chart — INVERTED, bearish for CADJPY) — outweighs CAD's own directionless, low-conviction year-end base-building phase (2★, \"all TFs converge near 0-25, annual low zone\"). JPY's higher conviction dominates the close of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"JPY's recovery building (inverted bearish, dominant); CAD basing in its annual low zone, no opposition. JPY's edge carries — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"JPY's rally strengthening (inverted bearish); CAD still directionless. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"chop", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"JPY's recovery persisting toward year close (inverted bearish); CAD's very-late-month recovery just beginning (early bullish signs, narrowing). JPY's edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"SHORT LEAN / WATCH ★★☆☆☆", note:"JPY closing its recovery strong (inverted bearish); CAD's year-end base-building giving way to its own Q1 setup (early bullish, narrowing further). The year closes with JPY's edge still in control, but the gap narrowing into January." },
    ]
  },
];

const SEASONAL_DATA = `
CADJPY — FOREX SEASONAL ANALYSIS
Derived from: CAD/USD CME Futures (40-YR seasonal) + Japanese Yen CME Futures (40-YR seasonal)
Methodology: CAD seasonal tendency combined with the inverse of JPY seasonal tendency (CAD is the base currency — direct; JPY is the quote currency — inverted, since JPY strength means fewer JPY per unit of CAD).

=== CAD COMPONENT (bullish CAD = CADJPY rising) ===
Jan: CAD bear — \"5-YR spikes to ~95 at the open then collapses, fade the spike\" (4★).
Feb: CAD bear — continuing decline (4★).
Mar: CAD chop/flip — \"40-YR begins recovery from Feb lows, TFs diverging\" (2★).
Apr: CAD bull — \"5-YR spikes hard to ~85-90 mid-month, strong long Wk1-2\" (4★).
May: CAD bear — \"40-YR peaks first half of May then rolls over\" (4★).
Jun: CAD bear — \"near lows, deep seasonal trough zone\" (4★).
Jul: CAD's HIGHEST CONVICTION LONG — \"powerful recovery, high conviction long\" (5★).
Aug: CAD bull — \"5-YR at or near peak ~90-95\" (4★).
Sep: CAD's FLIP MONTH — \"HIGHEST CONVICTION REVERSAL — 40-yr and 15-yr hit absolute annual peak ~100 mid-month then collapse\" (5★).
Oct: CAD bear — \"sharp post-Sep decline, drops from 100 toward ~75\" (4★).
Nov: CAD bear — \"severity easing late November\" (3★).
Dec: CAD chop/base — \"all TFs converge near 0-25, annual low zone, year-end recovery very late\" (2★).

=== JPY COMPONENT (bullish JPY = CADJPY falling, since JPY is inverted) ===
Jan: JPY bear — messy decline from year-end highs, TFs split (3★; inverted: bullish for CADJPY).
Feb: JPY chop/neutral — 40-yr hits its primary trough, base forming (2★; inverted: neutral).
Mar: JPY's STRONGEST Q1 WINDOW — all 3 TFs aligned bullish, enter long, exit mid-month (5★; inverted: powerfully bearish for CADJPY).
Apr: JPY's SELL→WATCH playbook month — buy Wk1 (40-yr peak) then sell end Wk2/Wk3, re-entry Wk4 (3★; inverted: bearish then bullish for CADJPY as JPY declines).
May: JPY bear — modest decline, TFs mixed (3★; inverted: mildly bullish for CADJPY).
Jun: JPY chop/mixed — transition month, no clean signal (2★; inverted: similarly without edge).
Jul: JPY's STRONGEST MONTH OF ITS YEAR — all 3 TFs aligned strongly bullish, enter long, hold into August peak (5★; inverted: powerfully bearish for CADJPY, maximum conviction).
Aug: JPY's ABSOLUTE ANNUAL PEAK — all TFs hit highs ~95-100, then EXIT LONGS Wk2, FLIP SHORT Wk3 — JPY's highest conviction short entry of the year fires mid-month (4★; inverted: bearish for CADJPY early, then powerfully bullish as JPY collapses).
Sep: JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — sharp decline from the August peak continues, all 3 TFs aligned (5★; inverted: powerfully bullish for CADJPY).
Oct: JPY bear — secondary trough forming, TFs declining (3★; inverted: bullish for CADJPY).
Nov: JPY bear — all 3 TFs drop sharply, 15-yr hits near-annual lows, secondary bear leg (4★; inverted: bullish for CADJPY).
Dec: JPY bull — all 3 TFs recovering from November lows, enter long for the Dec/Jan seasonal cycle (4★; inverted: bearish for CADJPY).

=== COMBINED NET EFFECT ===
Jan–Feb: CAD's structural opening decline outweighs JPY's own lower-conviction, choppier early-year moves (inverted, conflicting but weaker) — CAD's higher conviction carries both months.
Mar: JPY's strongest Q1 window (inverted, powerfully bearish for CADJPY) overwhelms CAD's own choppy, diverging recovery attempt — JPY's vastly higher conviction dominates outright.
Apr: CAD's strong bull spike opens directly against JPY's SELL→WATCH playbook (inverted, initially bearish) — early conflict resolves into late-month double alignment as both currencies' moves begin to reinforce.
May–Jun: CAD's continuing decline into its trough zone faces little resistance from JPY's own choppy, lower-conviction moves — CAD's cleaner, higher-conviction trend dominates by comparison.
Jul: THE DEFINING COLLISION — both currencies post the single strongest window of their respective years in the SAME month, in directly opposing chart-directions (CAD's highest-conviction long vs JPY's strongest month, inverted bearish). A genuine maximum-conviction coin-flip.
Aug: Early-month conflict (CAD's continuing strength vs JPY's own annual peak, inverted bearish) resolves into late-month double alignment as JPY's historic flip to short (inverted bullish) begins to reinforce CAD's continuing strength.
Sep: DUAL FLIP — both currencies stage their own highest-conviction reversal of the year in the same month; early-month double alignment (both bullish for the pair) gives way to sharp late-month conflict as CAD's collapse confirms against JPY's still-falling chart (inverted still bullish).
Oct: CAD's sharp post-peak decline outweighs JPY's own lower-conviction secondary-trough decline (inverted, conflicting but weaker) — CAD's higher conviction continues to dominate.
Nov: MAXIMUM CONFLICT — CAD's continuing but easing decline collides directly with JPY's own secondary bear leg (inverted bullish) — JPY's slightly higher conviction edges the balance by month's end.
Dec: JPY's year-end recovery from its November lows (inverted, bearish for CADJPY) outweighs CAD's own directionless, low-conviction year-end base-building phase — JPY's higher conviction dominates the close of the year.

=== PLAYBOOK SIGNALS ===
CADJPY HIGHEST CONVICTION LONG: the late-Aug/early-Sep double-alignment window (CAD's approach to its own annual peak + JPY's collapse from its own peak, inverted bullish, both confirming, 5★) and the Apr Wk3-4 double alignment (CAD's spike + JPY's SELL phase, inverted bullish, 4★).
CADJPY HIGHEST CONVICTION SHORT: March (JPY's strongest Q1 window, inverted powerfully bearish, overwhelms CAD's own chop, 4-5★) and the Jan-Feb CAD-dominated opening decline (4★).
CADJPY MOST CONTESTED / REQUIRES CAREFUL FRAMING: July (THE DEFINING COLLISION — both currencies' single strongest windows of their respective years collide head-on in direct opposition) and September (DUAL FLIP — both currencies' highest-conviction reversals of the year occur in the same month, with the conflict sharpening as the month progresses).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for CADJPY explaining how the CAD and JPY seasonal forces interact month by month, with special attention to July's defining stand-off and September's dual-flip collision.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (CAD or JPY) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction CADJPY trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially July, where both currencies post the single strongest window of their respective years in direct opposition.
`;
