/**
 * data/fx-eurjpy.js — EURJPY Forex Seasonal
 * Derived from: EUR/USD CME futures + JPY/USD CME futures (inverted)
 * Methodology: EUR seasonal tendency vs inverted JPY seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-eurjpy",
  name:     "EUR / JPY",
  sub:      "Forex Seasonal · Derived from EUR CME + JPY CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · Japanese Yen CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR's structural opening decline — \"5-YR spikes to ~100 at the open then immediate sell\" (4★) — outweighs JPY's own messy, lower-conviction January decline (3★ on its own chart — INVERTED, mildly bullish for EURJPY, the conflicting but weaker signal). EUR's higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"EUR's open-spike fading hard (bearish, dominant); JPY also declining (inverted bullish, conflicting but weaker). EUR's edge prevails." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"EUR's decline continuing; JPY's own messy decline persisting (inverted bullish, minor opposition). Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT LEAN ★★★☆☆", note:"EUR still pressured; JPY beginning to stabilise near its trough (inverted, narrowing). EUR's structural decline still carries." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bull", com:"SHORT LEAN ★★★☆☆", note:"EUR approaching its own base; JPY nearing its primary trough (inverted, neutral). EUR's edge holds by elimination." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "EUR's continuing decline toward its annual trough (4★, \"approaching trough\") faces little resistance from JPY's own choppy, low-conviction trough-formation phase (2★ on its own chart — INVERTED, neutral). EUR remains the only source of clean directional edge.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"EUR declining (bearish, dominant); JPY directionless at its trough (inverted, neutral). EUR in full control." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"EUR's decline persisting; JPY still base-building. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT LEAN ★★★☆☆", note:"EUR nearing its critical March trough; JPY beginning to show early signs of its own March surge (inverted, early bearish signs forming). Minor opposition emerging." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"EUR's trough imminent; JPY building toward its strongest Q1 window (inverted bearish, building toward March's collision). Stand by for the resolution." },
    ]
  },
  {
    month: "March", sig5: "flip", sig15: "flip", sigLt: "bear",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "Both currencies stage decisive reversals in the SAME month, in directly opposing directions for the pair. EUR's FLIP MONTH — \"all three TFs trough then sharp recovery, 22-YR bounces from ~35 to ~65\" (4★, bullish) — collides head-on with JPY's STRONGEST Q1 WINDOW — \"all 3 TFs aligned bullish, the year's cleanest Q1 signal\" (5★ on its own chart — INVERTED, powerfully bearish for EURJPY). A genuine maximum-conviction coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"EUR still weak pre-trough (about to flip); JPY surging with full conviction (inverted bearish, dominant early). JPY's edge controls the early month." },
      { wk:"Wk 2", s5:"flip", s15:"chop", sLt:"bear", com:"DUAL FLIP / MAXIMUM CONFLICT ★★★☆☆", note:"EUR's historic trough confirms — flipping to recovery (bullish); JPY's rally also continuing toward its own exit point (inverted bearish). Two reversals in direct opposition — genuinely two-sided." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR's recovery accelerating (bullish); JPY exiting its long near its own peak (inverted bearish, still strong). Both currencies' defining moves of the month colliding head-on." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR's bounce persisting toward ~65; JPY's rally fading post-exit (inverted, narrowing). The stand-off begins to ease into April." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 2,
    note: "EUR's own directionless, choppy mid-range stretch (2★, \"no clean directional bias\") offers little to set against JPY's SELL→WATCH playbook month (3★ on its own chart — buy Wk1 at the 40-yr peak, then sell — INVERTED: bearish then bullish for EURJPY as JPY declines). JPY's own internal flip dominates an otherwise quiet, two-sided month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"CONTESTED ★★☆☆☆", note:"EUR directionless; JPY at its own 40-yr peak pre-flip (inverted bearish). JPY's edge controls the early stretch." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"FLIP / WATCH ★★☆☆☆", note:"JPY's playbook SELL begins — declining off its peak (inverted now turning bullish); EUR still mixed. The conflict's character flips mid-month." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"JPY's decline accelerating (inverted bullish, now dominant); EUR's chop continuing to offer no opposition. JPY's edge begins to carry." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"JPY's SELL phase persisting toward its re-entry point (inverted bullish); EUR approaching its own most bearish month. JPY's edge carries into May's EUR-dominated collision." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's MOST BEARISH MONTH OF ITS ENTIRE 22-YEAR SEASONAL — \"collapses to near absolute annual low ~5-10\" (5★) — dominates over JPY's own modest, lower-conviction May decline (3★ on its own chart — INVERTED, mildly bullish for EURJPY, the conflicting but significantly weaker signal). EUR's far higher conviction carries the month outright.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"EUR opens with a brief Wk1 long before its historic collapse begins; JPY's own decline beginning (inverted bullish, conflicting). Watch for EUR's reversal confirmation." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR's collapse confirms — its single most bearish month of the year firing (5★, dominant); JPY's modest decline persisting (inverted bullish, far weaker). EUR's extreme conviction takes full control." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR's waterfall toward its absolute annual low accelerating; JPY beginning to recover (inverted bearish, now narrowing — minor reinforcement). Hold short with maximum conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR at its near-absolute annual low; JPY's recovery building (inverted bearish, now aligning). Both reinforcing by month's end." },
    ]
  },
  {
    month: "June", sig5: "flip", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "EUR's FLIP MONTH — \"at/near absolute annual low then recovery begins, flip long from Wk2-3\" (3★) — dominates over JPY's own choppy, low-conviction transition month (2★ on its own chart — INVERTED, similarly without strong signal). EUR's cleaner, higher-conviction reversal carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", sLt:"bull", com:"FLIP / WATCH ★★★☆☆", note:"EUR still at its lows pre-flip (about to reverse); JPY directionless. Early positioning for EUR's flip." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR's historic flip confirms — recovery from its annual low begins (bullish, cleaner signal); JPY still mixed. EUR's reversal beginning to dominate." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR's recovery accelerating; JPY's chop continuing to offer no resistance. EUR's edge carries." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"EUR's bounce persisting; JPY beginning to build toward its own strongest month of the year. EUR dominates into July's JPY-dominated transition." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "JPY's STRONGEST MONTH OF ITS ENTIRE YEAR — \"all 3 TFs aligned strongly bullish, enter long, hold into the August peak\" (5★ on its own chart — INVERTED, powerfully bearish for EURJPY) — completely overwhelms EUR's own choppy, noisy bounce-and-fade stretch (2★, \"high noise, no clean bias\"). JPY's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY surging with full conviction (inverted bearish, dominant, 5★); EUR's early spike fading. JPY in full control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"JPY's rally accelerating (inverted bearish, maximum conviction); EUR directionless, offering no resistance. Hold short with conviction." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY continuing higher toward its August peak; EUR's noise continuing without direction. JPY's edge remains dominant." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY building toward its absolute annual peak (inverted bearish); EUR's lowest-conviction month of the year approaching. JPY's structural dominance carries into August." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 3,
    note: "EUR's lowest-conviction month of its entire year (1★) provides no resistance to JPY's ABSOLUTE ANNUAL PEAK — \"all TFs hit highs ~95-100\" (4★ on its own chart — INVERTED, bearish for EURJPY) — but JPY's mid-month flip to short (its highest-conviction short entry of the year, inverted bullish) introduces sharp late-month conflict in an otherwise quiet, JPY-dominated stretch.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"JPY at its absolute annual peak (inverted bearish, dominant); EUR directionless. JPY's edge carries — hold short from July." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"JPY in its EXIT LONGS peak zone (inverted bearish, still aligned); EUR offering no opposition. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"FLIP / CONFLICT ★★☆☆☆", note:"JPY's historic flip to short fires — its highest conviction short entry of the year (inverted: now bullish for EURJPY, directly opposing). Sharp conflict emerges — trim shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"JPY's waterfall decline accelerating (inverted bullish, high conviction, now dominant); EUR still without signal. The conflict deepens heading into September's collision." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING COLLISION", stars: 3,
    note: "THE DEFINING COLLISION OF THE EURJPY CALENDAR — EUR's continuing decline toward its September trough (\"drops sharply to ~22-25\", 4★, bearish) collides directly with JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"all 3 TFs in sharp decline from the August peak, the single most decisive move of JPY's year\" (5★ on its own chart — INVERTED, powerfully bullish for EURJPY). Both currencies post defining moves of the year in directly opposing directions.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR's decline continuing (bearish); JPY's post-peak waterfall accelerating (inverted bullish, 5★ — its highest-conviction trade of the year). Two defining moves colliding head-on." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR declining toward its trough; JPY's collapse at peak short pressure (inverted bullish, maximum conviction). Both at near-maximum conviction — avoid forcing direction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR nearing its trough; JPY's decline continuing with high conviction (inverted bullish). JPY's higher-conviction move begins to dominate." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"EUR basing at its trough; JPY's waterfall persisting toward its October trough (inverted bullish, still dominant). JPY's edge begins to carry the pair into October." },
    ]
  },
  {
    month: "October", sig5: "flip", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "DOUBLE ALIGNMENT → CONFLICT", stars: 3,
    note: "Early-month double alignment — EUR's brief Wk1 spike (bullish) matches JPY's continuing secondary-trough decline (3★ on its own chart — INVERTED, bullish for EURJPY) — gives way to sharp late-month conflict as EUR stages its own FLIP MONTH: \"all TFs roll back over mid-month, cover Wk1 spike then flip short Wk2-4\" (3★, bearish). The month transitions from alignment to opposition at its midpoint.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★☆☆", note:"EUR's early-month spike launching (bullish); JPY's decline continuing (inverted bullish). Both align early — enter long." },
      { wk:"Wk 2", s5:"flip", s15:"bear", sLt:"bull", com:"FLIP / CONFLICT ★★★☆☆", note:"EUR's historic flip confirms — rolling over from its spike (now bearish); JPY's decline persisting (inverted still bullish, directly opposing). Conflict emerges sharply." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR's flip to short accelerating (bearish); JPY's decline also continuing (inverted bullish, still opposing). Genuinely two-sided." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR's bearish flip confirmed and dominant; JPY's secondary trough nearly complete (inverted, narrowing). EUR's confirmed reversal begins to carry the edge into November." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"absolute annual lows across all timeframes\" (5★) — outweighs JPY's own secondary bear leg — \"all 3 TFs drop sharply, hits near-annual lows\" (4★ on its own chart — INVERTED, bullish for EURJPY, directly opposing but lower conviction). EUR's slightly higher, more extreme conviction ultimately dominates a genuinely contested month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR collapsing toward its absolute annual lows (bearish, 5★, dominant); JPY's own decline accelerating (inverted bullish, conflicting but slightly weaker). EUR's extreme conviction edges ahead." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR at maximum conviction — its single highest-conviction trade of the year; JPY's decline persisting (inverted bullish, still opposing but outweighed). Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR's collapse persisting near its lows; JPY's drop sharpening toward its near-annual lows (inverted bullish, narrowing the gap). Genuinely contested but EUR's extreme conviction still carries." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR closing its defining month at its annual lows; JPY's decline persisting toward its own year-end recovery point (inverted bullish, still conflicting). EUR's edge dominates into December's reversal." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "STAND-OFF — YEAR-END COLLISION", stars: 3,
    note: "A genuine year-end coin-flip — EUR's STRONG BULL recovery (\"mirror image of November's lows, 22-YR surges from ~0 to ~75-80\", 5★, bullish) collides directly with JPY's own year-end recovery from its November lows (4★ on its own chart, \"all 3 TFs recovering, enter long for the Dec/Jan seasonal cycle\" — INVERTED, bearish for EURJPY). Both currencies stage simultaneous, high-conviction recoveries in directly opposing directions, closing the EURJPY year on a genuinely two-sided note.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"STAND-OFF ★★★☆☆", note:"EUR's year-end recovery launching with full conviction (bullish, mirror image of November's collapse); JPY's own recovery also confirming (inverted bearish). Both currencies' rallies launching in direct opposition." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"STAND-OFF ★★★☆☆", note:"EUR's surge accelerating toward ~75-80; JPY's rally also building (inverted bearish). Two confirmed recoveries colliding head-on — avoid forcing size." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR's rally persisting near its highs; JPY's recovery persisting (inverted bearish). The stand-off continues — genuinely two-sided." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED / CLOSE ★★★☆☆", note:"EUR closing the year at its strongest — the mirror image of its November collapse; JPY also closing its recovery strong (inverted bearish). Both currencies' Q1-entry setups remain in direct opposition — the year closes on a genuine coin-flip." },
    ]
  },
];

const SEASONAL_DATA = `
EURJPY — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal) + Japanese Yen CME Futures (40-YR seasonal)
Methodology: EUR seasonal tendency combined with the inverse of JPY seasonal tendency (EUR is the base currency — direct; JPY is the quote currency — inverted, since JPY strength means fewer JPY per unit of EUR).

=== EUR COMPONENT (bullish EUR = EURJPY rising) ===
Jan: EUR bear — \"5-YR spikes to ~100 at the open — immediate sell\" (4★).
Feb: EUR bear — \"approaching trough\" (4★).
Mar: EUR's FLIP MONTH — \"all three TFs trough then sharp recovery, 22-YR bounces from ~35 to ~65\" (4★).
Apr: EUR chop — \"22-YR flat/choppy mid-range, no clean directional bias\" (2★).
May: EUR's MOST BEARISH MONTH ON THE 22-YR — \"collapses to near absolute annual low ~5-10\" (5★).
Jun: EUR's FLIP MONTH — \"22-YR at/near absolute annual low then recovery begins, flip long Wk2-3\" (3★).
Jul: EUR chop — \"5-YR spikes hard early then fades, high noise\" (2★).
Aug: EUR's LOWEST CONVICTION MONTH OF THE YEAR (1★).
Sep: EUR bear — \"22-YR drops sharply to ~22-25 (Sep trough)\" (4★).
Oct: EUR's FLIP MONTH — \"5-YR spikes then rolls back over mid-month, cover Wk1 spike then flip short Wk2-4\" (3★).
Nov: EUR's HIGHEST CONVICTION SHORT OF THE YEAR — \"absolute annual lows across all TFs\" (5★).
Dec: EUR's STRONG BULL — \"year-end recovery, mirror image of Nov lows, 22-YR surges from ~0 to ~75-80\" (5★).

=== JPY COMPONENT (bullish JPY = EURJPY falling, since JPY is inverted) ===
Jan: JPY bear — messy decline, TFs split (3★; inverted: bullish for EURJPY).
Feb: JPY chop/neutral — 40-yr at its primary trough (2★; inverted: neutral).
Mar: JPY's STRONGEST Q1 WINDOW — all 3 TFs aligned bullish (5★; inverted: powerfully bearish for EURJPY).
Apr: JPY's SELL→WATCH playbook — buy Wk1 (40-yr peak) then sell (3★; inverted: bearish then bullish for EURJPY).
May: JPY bear — modest decline, TFs mixed (3★; inverted: mildly bullish for EURJPY).
Jun: JPY chop/mixed — transition month, no clean signal (2★; inverted: similarly without edge).
Jul: JPY's STRONGEST MONTH OF ITS YEAR — all 3 TFs aligned strongly bullish, hold into August peak (5★; inverted: powerfully bearish for EURJPY).
Aug: JPY's ABSOLUTE ANNUAL PEAK then FLIP SHORT — its highest conviction short entry of the year fires mid-month (4★; inverted: bearish for EURJPY early, then powerfully bullish as JPY collapses).
Sep: JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — sharp decline from the August peak, all 3 TFs aligned (5★; inverted: powerfully bullish for EURJPY).
Oct: JPY bear — secondary trough forming (3★; inverted: bullish for EURJPY).
Nov: JPY bear — all 3 TFs drop sharply, hits near-annual lows, secondary bear leg (4★; inverted: bullish for EURJPY).
Dec: JPY bull — all 3 TFs recovering from November lows, enter long for Dec/Jan cycle (4★; inverted: bearish for EURJPY).

=== COMBINED NET EFFECT ===
Jan–Feb: EUR's structural opening decline outweighs JPY's own lower-conviction, choppier early-year moves (inverted, conflicting but weaker) — EUR's higher conviction carries both months.
Mar: MAXIMUM CONFLICT — both currencies stage decisive reversals in the SAME month, in directly opposing directions: EUR's flip-month recovery vs JPY's strongest Q1 window (inverted, powerfully bearish). A genuine maximum-conviction coin-flip.
Apr: EUR's own directionless chop offers little to set against JPY's SELL→WATCH playbook (inverted, internally flipping) — JPY's own internal flip dominates an otherwise quiet, two-sided month.
May: EUR's single most bearish month of its entire 22-year seasonal dominates over JPY's own modest, lower-conviction decline (inverted, conflicting but far weaker) — EUR's extreme conviction carries the month outright.
Jun: EUR's flip-month recovery dominates over JPY's own choppy, low-conviction transition — EUR's cleaner, higher-conviction reversal carries the month.
Jul: JPY's strongest month of its entire year (inverted, powerfully bearish) completely overwhelms EUR's own choppy, noisy bounce-and-fade stretch — JPY's vastly higher conviction dominates outright.
Aug: EUR's lowest-conviction month of its entire year provides no resistance to JPY's absolute annual peak (inverted bearish), but JPY's own historic mid-month flip to short (inverted bullish) introduces sharp late-month conflict.
Sep: THE DEFINING COLLISION — EUR's continuing decline toward its trough collides directly with JPY's single highest-conviction short of its entire year (inverted, powerfully bullish — JPY's single most decisive move of the year). Both post defining moves in directly opposing directions.
Oct: Early-month double alignment (both bullish for the pair) gives way to sharp late-month conflict as EUR stages its own flip-month reversal (becoming bearish) — the month transitions from alignment to opposition at its midpoint.
Nov: EUR's highest-conviction short of its entire year — absolute annual lows across all timeframes — narrowly outweighs JPY's own secondary bear leg (inverted, bullish, directly opposing but lower conviction). EUR's slightly higher, more extreme conviction ultimately dominates a genuinely contested month.
Dec: A GENUINE YEAR-END STAND-OFF — EUR's strong bull recovery (the mirror image of its November collapse) collides directly with JPY's own year-end recovery from its November lows (inverted, bearish for EURJPY). Both currencies stage simultaneous, high-conviction recoveries in directly opposing directions, closing the year on a genuinely two-sided note.

=== PLAYBOOK SIGNALS ===
EURJPY HIGHEST CONVICTION LONG: June (EUR's flip-month recovery from its annual low dominates JPY's own choppy transition, 4★) and the Oct Wk1 double-alignment open (EUR's early-month spike + JPY's continuing decline, inverted bullish, both confirm, 3★).
EURJPY HIGHEST CONVICTION SHORT: May (EUR's single most bearish month of its entire 22-year seasonal dominates JPY's own weaker decline, 5★) and July (JPY's strongest month of its entire year, inverted, powerfully bearish, overwhelms EUR's noisy chop, 4-5★).
EURJPY MOST CONTESTED / REQUIRES CAREFUL FRAMING: March (MAXIMUM CONFLICT — both currencies' decisive reversals collide head-on), September (THE DEFINING COLLISION — EUR's continuing decline vs JPY's single highest-conviction short of its entire year, inverted bullish), and December (THE ULTIMATE STAND-OFF — both currencies stage simultaneous year-end recoveries in directly opposing directions, closing the calendar on a genuine coin-flip).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURJPY explaining how the EUR and JPY seasonal forces interact month by month, with special attention to the three genuinely contested "stand-off" months: March, September, and December.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or JPY) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURJPY trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially March, September, and December, where both currencies repeatedly post their defining moves of the year in directly opposing directions.
`;
