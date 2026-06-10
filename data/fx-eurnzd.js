/**
 * data/fx-eurnzd.js — EURNZD Forex Seasonal
 * Derived from: EUR/USD CME futures + NZD/USD CME futures (inverted)
 * Methodology: EUR seasonal tendency vs inverted NZD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-eurnzd",
  name:     "EUR / NZD",
  sub:      "Forex Seasonal · Derived from EUR CME + NZD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · New Zealand Dollar CME (23-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CONFLICT — COIN-FLIP OPEN", stars: 3,
    note: "The year opens on direct opposition — EUR's structural opening decline (\"5-YR spikes to ~100 then immediate sell\", 4★, bearish) collides with NZD's own near-identical opening collapse (\"5-YR spikes to ~100 at the open then collapses, fade the open\", 4★ on its own chart — INVERTED, bullish for EURNZD). Both currencies post their own near-mirror opening waterfalls in directly opposing directions for the pair — a genuine coin-flip start to the year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bull", com:"CONFLICT ★★★☆☆", note:"EUR's open-spike fading (bearish); NZD's own open-spike also fading (inverted bullish). Both currencies' opening reversals colliding from day one." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"CONFLICT ★★★☆☆", note:"EUR's decline confirmed; NZD's decline also confirmed (inverted bullish). Two near-identical structural collapses in direct opposition — avoid forcing size." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"EUR's pressure persisting; NZD's broad weakness continuing across all timeframes (inverted bullish). The stand-off holds." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR approaching its own base; NZD nearing its Feb lows (inverted, narrowing). Genuinely two-sided into February's near-repeat." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CONFLICT — REPEAT COLLISION", stars: 3,
    note: "January's stand-off persists into February — EUR's continuing decline toward its trough (\"approaching trough\", 4★, bearish) directly opposes NZD's own continuing seasonal weakness (\"all three TFs grinding lower toward the ~35-40 trough zone\", 4★ on its own chart — INVERTED, bullish for EURNZD). Both currencies remain locked in near-equal-conviction declines for a second consecutive month, in opposite directions for the pair.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"CONFLICT ★★★☆☆", note:"EUR declining (bearish); NZD continuing its own collapse toward its trough (inverted bullish). The January stand-off carries over unresolved." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"CONFLICT ★★★☆☆", note:"EUR's decline persisting; NZD's mid-Feb lows forming (inverted bullish). Both still near-equal in conviction — hold off forcing a side." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR nearing its critical March trough; NZD also approaching its own Feb-Mar trough (inverted bullish, beginning to base). The stand-off nears resolution." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"WATCH / TRANSITION ★★☆☆☆", note:"EUR's trough imminent; NZD's late-Feb stabilisation beginning (inverted, narrowing toward neutral). Stand by for March's resolution as EUR's flip approaches." },
    ]
  },
  {
    month: "March", sig5: "flip", sig15: "flip", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "EUR's FLIP MONTH — \"all three TFs trough then sharp recovery, 22-YR bounces from ~35 to ~65\" (4★, bullish) — dominates over NZD's own lower-conviction, choppier transition month (2★ on its own chart, \"23-YR troughs then reverses, TFs diverging\" — INVERTED, similarly without strong directional edge early). EUR's cleaner, higher-conviction reversal carries the resolution of the January-February stand-off.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"WATCH / FLIP ★★★☆☆", note:"EUR still weak pre-trough (about to flip); NZD also still weak early-March (inverted bullish, conflicting but lower conviction). Watch for EUR's confirmation." },
      { wk:"Wk 2", s5:"flip", s15:"chop", sLt:"bear", com:"LONG / FLIP ★★★☆☆", note:"EUR's historic trough confirms — flipping to recovery (bullish, dominant); NZD's own recovery also beginning (inverted bearish, now reinforcing EUR's flip). Early alignment forming." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"EUR's recovery accelerating (bullish, higher conviction); NZD's own bounce continuing (inverted bearish, reinforcing). Both now aligning — hold long with rising conviction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"EUR's bounce persisting toward ~65; NZD building into its own April bull run (inverted bearish, still reinforcing). EUR's edge carries into April's reversal of roles." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR's own directionless, choppy mid-range stretch (2★, \"no clean directional bias\") offers little resistance to NZD's strong bull window — \"all TFs rallying into mid-April, approaching the ~85-90 peak\" (4★ on its own chart — INVERTED, bearish for EURNZD). NZD's far higher conviction dominates an otherwise quiet month by default.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"NZD surging with full conviction (inverted bearish, dominant — \"strong bull confluence\"); EUR directionless. NZD's edge controls the month from the open." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★★★", note:"NZD approaching its annual peak zone (inverted bearish, maximum conviction, \"hold longs into mid-April\"); EUR still without signal. NZD dominates outright." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"NZD's 5-YR beginning to roll over near its peak (inverted, narrowing); EUR's chop persisting. NZD's edge softens but still carries." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"NZD topping out ahead of its historic May flip (inverted, transitioning); EUR still directionless. The stage is set for May's maximum-conviction collision." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — TWO-SIDED COLLISION", stars: 4,
    note: "Both currencies post the single highest-conviction trade of their respective years in the SAME month. EUR's MOST BEARISH MONTH OF ITS ENTIRE 22-YEAR SEASONAL — \"collapses to near absolute annual low ~5-10\" (5★, bearish) — collides with NZD's MOST CRITICAL FLIP MONTH — \"23-YR peaks ~85-90 then collapses; all TFs align bearish by Wk2, highest conviction short of the year\" (5★ on its own chart — INVERTED: bearish early as NZD peaks, then powerfully bullish as NZD collapses). Early-month double alignment gives way to a sharp late-month reversal of the relationship.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"EUR opens with a brief Wk1 long before its historic collapse; NZD at its own near-peak (inverted bearish). Both bearish for the pair early — align short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★★", note:"EUR's collapse confirms — its single most bearish month of the year firing (5★, bearish); NZD's historic flip also confirms — \"all TFs turn south, enter short with full conviction\" (inverted: now turning bullish for EURNZD). Both currencies' defining moves of the year collide head-on — avoid forcing size at the pivot." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★★★☆", note:"EUR's waterfall toward its absolute annual low continuing (bearish, dominant); NZD's full collapse also continuing (inverted bullish, directly opposing). Genuinely two-sided at maximum conviction on both sides." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"EUR nearing its near-absolute annual low (still dominant, 5★); NZD's decline persisting into June's trough (inverted bullish, still opposing but slightly lower conviction by month's end). EUR's extreme conviction narrowly carries the close." },
    ]
  },
  {
    month: "June", sig5: "flip", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "The cleanest long window of the EURNZD calendar — EUR's FLIP MONTH (\"at/near absolute annual low then recovery begins\", 3★, bullish) directly aligns with NZD's own deep seasonal waterfall — \"all three TFs near annual lows, absolute trough zone, deep waterfall\" (5★ on its own chart — INVERTED, powerfully bullish for EURNZD). Both components point the same direction — conviction amplifies sharply.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", sLt:"bull", com:"LONG / FLIP ★★★★☆", note:"EUR still at its lows pre-flip (about to reverse, bullish); NZD continuing its waterfall (inverted bullish, already aligned and dominant). Double alignment forming early." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR's historic flip confirms — recovery from its annual low begins (bullish); NZD at its broad lows, near absolute trough (inverted bullish, maximum conviction). Both fully aligned — enter long with full conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR's recovery accelerating; NZD's 5-YR beginning to base near its trough (inverted bullish, still aligned). Hold long — the cleanest double-alignment window of the year." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR's bounce persisting; NZD at its trough, awaiting its own July recovery signal (inverted bullish, still reinforcing). Both currencies' bottoming processes carry the alignment into July." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "CHOP / DIRECTIONLESS", stars: 2,
    note: "Two of the calendar's lowest-conviction months collide — EUR's own choppy, noisy bounce-and-fade stretch (2★, \"high noise, no clean bias\") meets NZD's own mixed, muted recovery attempt (3★ on its own chart, \"choppy, short-term long only Wk2, caution required\" — INVERTED, similarly without strong edge). Neither component offers a clean signal — the quietest month of the EURNZD year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"CHOP ★★☆☆☆", note:"EUR's early spike fading without direction; NZD's tentative bounce attempt beginning (inverted, mixed). Neither side offers clean edge — stand mostly aside." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"CHOP / WATCH ★★☆☆☆", note:"EUR still directionless; NZD posting its best week of the month — \"all 3 show lift, highest conviction long of July\" (inverted bearish, the month's only real signal). Slight short lean on NZD's edge alone." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"EUR's noise continuing; NZD's bounce fading, reverting to neutral (inverted, narrowing). Both components flat — avoid the month." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"EUR's lowest-conviction month of the year approaching; NZD rolling back toward chop (inverted, neutral). The quietest stretch of the EURNZD calendar closes without resolution." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "EUR's lowest-conviction month of its entire year (1★, \"no signal of note\") leaves NZD's own clean recovery — \"all TFs recovering, NZD builds toward its September peak\" (4★ on its own chart — INVERTED, bearish for EURNZD) — to dominate the month outright by default.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"NZD's recovery confirming with full conviction (inverted bearish, dominant); EUR directionless, offering no resistance. NZD's edge takes full control." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"NZD's sustained recovery continuing (inverted bearish, all TFs aligned); EUR still without signal. Hold short on NZD's edge alone." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"NZD building toward its September secondary peak (inverted bearish, still dominant); EUR's lowest-conviction stretch persisting. NZD's structural edge carries." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"NZD approaching its peak, beginning to near its own September flip (inverted bearish, narrowing slightly); EUR still flat. NZD's dominance persists into the transition." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "DOUBLE ALIGNMENT → CONFLICT", stars: 3,
    note: "Early-month double alignment — EUR's continuing decline toward its trough (\"drops sharply to ~22-25\", 4★, bearish) matches NZD's own approach to its secondary peak (4★ on its own chart, \"23-YR and 15-YR peak ~80-85 mid-month\" — INVERTED, bearish for EURNZD, both reinforcing) — gives way to sharp late-month conflict as NZD stages its own FLIP MONTH (\"5-YR peaks first as early warning, all TFs roll over and flip short mid-September\" — inverted, becoming bullish), directly opposing EUR's continuing weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"EUR's decline continuing (bearish); NZD nearing its secondary peak (inverted bearish, both aligned). Enter short on the alignment." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT / FLIP WATCH ★★★☆☆", note:"EUR declining toward its trough; NZD's 5-YR beginning to peak first — its early flip-warning signal (inverted, starting to narrow). Begin watching for the reversal." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"EUR nearing its trough (still bearish); NZD's historic flip confirms — \"all TFs roll over, flip short mid-month\" (inverted: now bullish for EURNZD, directly opposing). Sharp conflict emerges at the pivot." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"EUR basing at its trough; NZD's decline accelerating post-flip (inverted bullish, now dominant). The alignment has fully reversed into opposition heading into October." },
    ]
  },
  {
    month: "October", sig5: "flip", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 3,
    note: "Early-month double alignment gives way to late-month conflict as EUR stages its own FLIP MONTH — \"5-YR spikes then rolls back over mid-month, cover the spike then flip short Wk2-4\" (3★) — while NZD continues its own post-peak waterfall (\"full decline post-September peak, all TFs declining sharply\", 4★ on its own chart — INVERTED, bullish for EURNZD throughout). The relationship transitions from alignment to opposition at EUR's mid-month pivot.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★☆☆", note:"EUR's early-month spike launching (bullish); NZD's post-peak decline continuing (inverted bullish). Both align early — enter long." },
      { wk:"Wk 2", s5:"flip", s15:"bear", sLt:"bull", com:"FLIP / CONFLICT ★★★☆☆", note:"EUR's historic flip confirms — rolling over from its spike (now bearish); NZD's waterfall persisting (inverted still bullish, directly opposing). Conflict emerges sharply at the pivot." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR's flip to short accelerating (bearish); NZD's decline also continuing (inverted bullish, still opposing). Genuinely two-sided." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"EUR's bearish flip confirmed; NZD's late-month stabilisation beginning ahead of its own turn (inverted, narrowing). The conflict eases into November's EUR-dominated close." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"absolute annual lows across all timeframes\" (5★) — dominates over NZD's own continued seasonal weakness, which itself inflects to a late-month turn (\"continued weakness, all TFs near lows, late-Nov begins to base ahead of the December rally\", 3★ on its own chart — INVERTED, bullish early then bearish late as NZD turns up). EUR's extreme, single-highest conviction of its year carries the month outright regardless of NZD's late inflection.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR collapsing toward its absolute annual lows (bearish, 5★, dominant); NZD's own decline continuing (inverted bullish, conflicting but far weaker). EUR's extreme conviction takes full control." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at maximum conviction — its single highest-conviction trade of the year; NZD near its own seasonal lows (inverted bullish, still opposing but outweighed). Hold short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR's collapse persisting near its lows; NZD beginning to base ahead of its own turn (inverted, narrowing toward neutral). EUR's edge remains firmly dominant." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"EUR closing its defining month at its annual lows; NZD's late-month turn confirms — \"all TFs inflect, enter long for the December rally\" (inverted: now bearish for EURNZD, briefly reinforcing EUR). EUR's dominance carries into December's maximum stand-off." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING YEAR-END COLLISION", stars: 4,
    note: "THE DEFINING COLLISION OF THE EURNZD CALENDAR — EUR's STRONG BULL recovery (\"mirror image of November's lows, 22-YR surges from ~0 to ~75-80\", 5★, bullish) collides head-on with NZD's MASSIVE YEAR-END RALLY — \"strongest month of the year on the 23-YR, surges toward ~95-100 at year close, highest conviction long of NZD's entire year\" (5★ on its own chart — INVERTED, powerfully bearish for EURNZD). Both currencies stage the single highest-conviction trade of their respective years in the SAME month, in directly opposing directions — closing the EURNZD calendar on a genuine maximum-conviction coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★☆", note:"EUR's year-end recovery launching with full conviction (bullish, mirror image of its November collapse); NZD's own year-end rally also confirming — \"enter / add to longs\" (inverted bearish, maximum conviction). Both currencies' defining trades of the year launching in direct opposition." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★★", note:"EUR's surge accelerating toward ~75-80; NZD's rally also accelerating — \"all TFs accelerating higher, hold longs\" (inverted bearish, maximum conviction). Two highest-conviction trades of the year colliding head-on — avoid forcing size at the peak of the stand-off." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★☆", note:"EUR's rally persisting near its highs; NZD surging toward its ~95-100 year-end peak (inverted bearish, still maximal). The defining collision continues — genuinely two-sided at the highest conviction levels of the year on both sides." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT / CLOSE ★★★★☆", note:"EUR closing the year at its strongest — the mirror image of its November collapse; NZD also closing at its year-end peak ~95-100 (inverted bearish, equally extreme). Both currencies' single highest-conviction trades of their respective years remain in direct opposition as the calendar closes on its ultimate coin-flip." },
    ]
  },
];

const SEASONAL_DATA = `
EURNZD — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal) + New Zealand Dollar CME Futures (23-YR seasonal)
Methodology: EUR seasonal tendency combined with the inverse of NZD seasonal tendency (EUR is the base currency — direct; NZD is the quote currency — inverted, since NZD strength means fewer NZD per unit of EUR).

=== EUR COMPONENT (bullish EUR = EURNZD rising) ===
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

=== NZD COMPONENT (bullish NZD = EURNZD falling, since NZD is inverted) ===
Jan: NZD bear — \"5-YR spikes to ~100 at the open then collapses, fade the open, structural bear month\" (4★; inverted: bullish for EURNZD).
Feb: NZD bear — \"all three TFs grinding lower toward the ~35-40 trough zone\" (4★; inverted: bullish for EURNZD).
Mar: NZD chop/flip — \"23-YR troughs Wk1-2 then sharp reversal, TFs diverging\" (2★; inverted: bearish for EURNZD as NZD recovers).
Apr: NZD bull — \"all TFs rallying, strong bull window into mid-April toward the ~85-90 peak\" (4★; inverted: bearish for EURNZD).
May: NZD's MOST CRITICAL FLIP MONTH — \"23-YR peaks ~85-90 early May then collapses, all TFs align bearish by Wk2, highest conviction short of NZD's entire year\" (5★; inverted: bearish for EURNZD early as NZD peaks, then powerfully bullish as NZD collapses).
Jun: NZD bear — \"all three TFs near annual lows, absolute trough zone, deep seasonal waterfall\" (5★; inverted: powerfully bullish for EURNZD).
Jul: NZD chop/mixed — \"23-YR and 15-YR bounce from the June trough, 5-YR muted, short-term long only Wk2, caution required\" (3★; inverted: similarly without strong edge).
Aug: NZD bull — \"all TFs recovering, NZD builds toward its September peak, re-enter long\" (4★; inverted: bearish for EURNZD).
Sep: NZD's secondary FLIP MONTH — \"23-YR and 15-YR peak ~80-85 mid-month, 5-YR peaks first as early warning, all TFs roll over and flip short mid-September\" (4★; inverted: bearish for EURNZD early as NZD peaks, then bullish as NZD declines).
Oct: NZD bear — \"post-September-peak waterfall, all TFs declining sharply, hold shorts\" (4★; inverted: powerfully bullish for EURNZD).
Nov: NZD bear — \"continued seasonal weakness, all TFs near lows, late-Nov begins to base ahead of the December rally — turn confirms Wk4\" (3★; inverted: bullish for EURNZD early, then bearish late as NZD turns up).
Dec: NZD's MASSIVE YEAR-END RALLY — \"strongest month of the year on the 23-YR, surges toward ~95-100 at year close, highest conviction long of NZD's entire year\" (5★; inverted: powerfully bearish for EURNZD).

=== COMBINED NET EFFECT ===
Jan-Feb: A genuine COIN-FLIP OPEN — EUR's structural opening decline collides directly with NZD's own near-mirror opening collapse (inverted, bullish for EURNZD). Both currencies post near-equal-conviction declines in directly opposing directions for the pair across both months — a true stand-off start to the year.
Mar: EUR's flip-month recovery dominates over NZD's own lower-conviction, choppier transition — EUR's cleaner, higher-conviction reversal carries the resolution of the January-February stand-off into a clean long.
Apr: EUR's own directionless chop offers no resistance to NZD's strong bull window (inverted, bearish for EURNZD) — NZD's far higher conviction dominates an otherwise quiet month by default.
May: MAXIMUM CONFLICT — TWO-SIDED COLLISION — both currencies post the single highest-conviction trade of their respective years in the SAME month: EUR's most bearish month of its entire 22-year seasonal collides with NZD's most critical flip month (inverted, bearish-then-powerfully-bullish). Early double alignment gives way to a sharp late-month reversal of the relationship.
Jun: DOUBLE ALIGNMENT — the cleanest long window of the EURNZD calendar — EUR's flip-month recovery directly aligns with NZD's own deep seasonal waterfall (inverted, powerfully bullish). Both components point the same direction — conviction amplifies sharply.
Jul: Two of the calendar's lowest-conviction months collide — neither EUR's noisy chop nor NZD's own mixed, muted recovery offers a clean signal — the quietest month of the EURNZD year.
Aug: EUR's lowest-conviction month of its entire year leaves NZD's own clean recovery (inverted, bearish for EURNZD) to dominate the month outright by default.
Sep: Early-month double alignment (EUR's continuing decline matches NZD's approach to its secondary peak, inverted bearish, both reinforcing) gives way to sharp late-month conflict as NZD stages its own flip month (inverted, becoming bullish), directly opposing EUR's continuing weakness.
Oct: Early-month double alignment gives way to late-month conflict as EUR stages its own flip-month reversal (becoming bearish) while NZD continues its post-peak waterfall (inverted, bullish throughout) — the relationship transitions from alignment to opposition at EUR's mid-month pivot.
Nov: EUR's highest-conviction short of its entire year — absolute annual lows across all timeframes — dominates over NZD's own continued weakness (inverted, conflicting but far lower conviction, and itself inflecting late). EUR's extreme, single-highest conviction of its year carries the month outright.
Dec: THE DEFINING COLLISION OF THE CALENDAR — EUR's strong bull recovery (its second-highest-conviction trade of the year) collides head-on with NZD's massive year-end rally — the single highest-conviction trade of NZD's entire year (inverted, powerfully bearish for EURNZD). Both currencies stage their defining trades of the year in the SAME month, in directly opposing directions — the ultimate coin-flip close.

=== PLAYBOOK SIGNALS ===
EURNZD HIGHEST CONVICTION LONG: June (DOUBLE ALIGNMENT — EUR's flip-month recovery directly reinforces NZD's deep seasonal waterfall, inverted bullish, the cleanest long window of the year, 4-5★) and the March recovery (EUR's flip-month reversal resolves the January-February stand-off into a clean trend, 3-4★).
EURNZD HIGHEST CONVICTION SHORT: November (EUR's single highest-conviction short of its entire year — absolute annual lows across all timeframes — dominates outright regardless of NZD's weaker counter-signal, 4-5★) and August (NZD's clean recovery dominates EUR's lowest-conviction month of the year by default, 3-4★).
EURNZD MOST CONTESTED / REQUIRES CAREFUL FRAMING: January-February (the COIN-FLIP OPEN — both currencies' near-mirror opening collapses collide in direct opposition for two consecutive months), May (MAXIMUM CONFLICT — both currencies' single highest-conviction trades of their years collide in the same month), and December (THE DEFINING COLLISION — both currencies stage their defining year-end trades in directly opposing directions, closing the calendar on the ultimate coin-flip).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURNZD explaining how the EUR and NZD seasonal forces interact month by month, with special attention to the calendar's three genuine stand-offs: the January-February coin-flip open, May's maximum-conflict collision, and December's defining year-end collision.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or NZD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURNZD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially the January-February stand-off, May's maximum collision, and December's defining year-end coin-flip, where both currencies repeatedly post their highest-conviction moves of the year in directly opposing directions.
`;
