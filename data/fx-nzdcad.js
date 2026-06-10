/**
 * data/fx-nzdcad.js — NZDCAD Forex Seasonal
 * Derived from: NZD/USD CME futures + CAD/USD CME futures (inverted)
 * Methodology: NZD seasonal tendency vs inverted CAD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-nzdcad",
  name:     "NZD / CAD",
  sub:      "Forex Seasonal · Derived from NZD CME + CAD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · New Zealand Dollar CME (23-YR) · Canadian Dollar CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOP — MIRRORED DECLINES", stars: 3,
    note: "Two commodity-bloc currencies opening the year in near-mirror fashion — NZD's own \"opening collapse, grinding lower, broad seasonal weakness\" (4★, bearish) directly confronts CAD's own \"5-YR spikes at the open then immediately collapses, structural bear month\" (4★ on its own chart — INVERTED, bullish for NZDCAD). Both currencies decline together at similar conviction — a near-coin-flip muted by the fact that both moves largely cancel.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD's opening collapse underway (bearish); CAD's open-spike fading hard at the same time (inverted bullish, near-mirror conviction). The two declines largely cancel — genuinely contested from the open." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"NZD's decline persisting (bearish); CAD's structural weakness also continuing (inverted bullish, similar pace). NZD's slightly faster early-month pace edges the lean toward short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad weakness deepening; CAD's grinding decline persisting in parallel (inverted bullish, similar conviction). The mirrored declines keep the net modestly bearish." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD continuing lower toward February; CAD also continuing its own decline (inverted bullish, still mirrored). Both currencies' similar paths keep this a genuinely contested, low-clarity month." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOP — MIRRORED DECLINES", stars: 3,
    note: "The mirrored decline persists into a second month — NZD's continuing \"grinding decline toward the March trough\" (4★, bearish) confronts CAD's own \"all three TFs grinding lower toward the ~50 zone, broad seasonal weakness\" (4★ on its own chart — INVERTED, bullish for NZDCAD). Two similarly-paced commodity currencies declining in parallel produce a genuinely muted, contested month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD's decline continuing toward its trough (bearish); CAD's grinding weakness persisting at similar pace (inverted bullish, near-mirrored). The parallel declines keep the net contested." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"NZD nearing its own March trough and turn (bearish, narrowing); CAD's decline persisting with similar conviction (inverted bullish). NZD's approaching reversal begins to soften its own bearish edge." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD beginning to base ahead of its own March turn; CAD continuing its decline toward its own choppy March transition (inverted bullish, narrowing). Both approaching their own turning points — clarity fading toward neutral." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"NZD's base-building continuing ahead of its own bullish March turn; CAD's own choppy transition beginning (inverted, similarly uncertain). Both currencies approaching simultaneous low-conviction transitions into March." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOP — DUAL TRANSITION", stars: 2,
    note: "Both currencies enter their own low-conviction transition months simultaneously — NZD's own \"trough then reverses, choppy transition off the lows\" (2★, weak bullish lean) meets CAD's own \"40-YR begins recovery from Feb lows, TFs diverging, no clean bias\" (2★ on its own chart — INVERTED, weak bearish lean). Two weak, opposing transitions essentially cancel — the quietest, most directionless month of the NZDCAD calendar.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / AVOID ★★☆☆☆", note:"NZD basing at its trough, beginning to turn (weak bullish); CAD's own recovery beginning to build (inverted bearish, similarly weak). The two weak signals cancel — avoid forcing a trade." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD's reversal still uncertain, TFs diverging; CAD's own recovery also uncertain across TFs (inverted, similarly mixed). The quietest stretch of the calendar — stand aside." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★☆☆☆", note:"NZD's 5-YR beginning to confirm its turn (bullish, building); CAD's recovery still unconfirmed by longer TFs (inverted, weak). NZD's slightly earlier confirmation offers a faint lean." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally beginning to build toward its own April bull window (bullish, strengthening); CAD's recovery still transitional (inverted, weak bearish). NZD's strengthening edge begins to carry into April's collision." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — STAND-OFF", stars: 4,
    note: "Both currencies fire genuine bull months in direct opposition — NZD's own \"strong rally to ~85-90, all TFs rallying together\" (4★, bullish) collides with CAD's own \"all TFs rallying, 5-YR spikes to ~85-90 mid-month, strong bull confluence\" (4★ on its own chart — INVERTED, bearish for NZDCAD). Two near-identical-conviction bull months in directly opposing setups — a genuine high-conviction stand-off.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★☆", note:"NZD's strong rally building (bullish, 4★); CAD's own rally also building at similar conviction (inverted bearish, 4★, directly opposing). Two near-identical bull months colliding head-on from the open." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★★", note:"NZD's rally accelerating toward its peak; CAD's 5-YR spiking hard toward its own mid-month peak (inverted bearish, near-mirrored conviction). Genuinely two-sided at peak conviction on both sides." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★★☆", note:"NZD's rally continuing into its own May peak; CAD's 5-YR beginning to fade from its mid-month spike (inverted, narrowing slightly). The stand-off begins to soften as CAD's edge fades first." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally persisting toward its own historic May flip (bullish, still strong); CAD's spike fading as it consolidates ahead of its own May rollover (inverted, weakening). NZD's sustained conviction begins to edge ahead as the stand-off resolves toward May's collision." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "TWO-SIDED — DUAL FLIP RISK", stars: 4,
    note: "NZD's MOST CRITICAL FLIP MONTH OF ITS ENTIRE YEAR — \"23-YR peaks ~85-90 then collapses, all TFs align bearish by Wk2, the highest-conviction short of NZD's whole year\" (5★) — collides with CAD's own May decline (\"40-YR peaks first half then rolls over, 5-YR collapses from its April peak\", 4★ on its own chart — INVERTED, bullish for NZDCAD). Early-month alignment (both near their own peaks, opposing biases roughly cancel) gives way to genuine two-sided conflict as NZD's defining collapse fires mid-month against CAD's own continuing decline.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD still near its absolute annual peak before its historic collapse (bullish); CAD's 40-YR also still near its own peak before its own rollover (inverted bullish, briefly aligning). Both near their own peaks — a fleeting alignment before both reverse." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT — NZD FLIP FIRES ★★★★★", note:"NZD's historic flip fires — collapsing from its peak, the single highest-conviction reversal of its entire year (now bearish); CAD's own decline also accelerating from its own peak (inverted bullish, directly opposing NZD's collapse). NZD's defining move of the year collides head-on with CAD's continuing weakness." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★★★☆", note:"NZD's collapse persisting with maximum conviction (bearish, dominant); CAD's decline also continuing (inverted bullish, still opposing but lower conviction). NZD's overwhelming conviction begins to edge the net lower." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"NZD's collapse continuing toward its own June trough (bearish, dominant); CAD's decline persisting toward its own June lows (inverted bullish, still the weaker conflicting signal). NZD's higher conviction carries the net into June." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "NZD's continuing collapse — \"all three TFs near absolute lows, deep waterfall continuation, the year's deepest trough zone\" (5★, bearish) — narrowly outweighs CAD's own deep trough — \"all three TFs near lows ~25-30, deep seasonal trough zone, hold shorts from May\" (4★ on its own chart — INVERTED, bullish for NZDCAD, the conflicting but slightly weaker signal). NZD's marginally higher conviction carries a close-fought month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's waterfall continuing into its absolute lows (bearish, dominant, 5★); CAD also near its own deep trough (inverted bullish, similar conviction). NZD's slightly higher conviction edges the net lower." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"NZD at its deepest trough, all TFs depressed; CAD also near its own lows (inverted bullish, close conviction). The mirrored troughs keep this genuinely contested but NZD's edge persists." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad weakness persisting near its lows; CAD also holding near its own trough (inverted bullish, similar). NZD's marginal edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★★☆☆", note:"NZD beginning to stabilise ahead of its own July bounce; CAD also approaching its own historic July reversal (inverted, both transitioning). Both currencies nearing simultaneous turns — clarity fading toward July's clearer resolution." },
    ]
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "CAD's POWERFUL RECOVERY — \"all TFs turning up simultaneously from the June trough, high conviction long, the year's strongest recovery window\" (5★ on its own chart — INVERTED, powerfully bearish for NZDCAD) — overwhelms NZD's own choppy, mixed bounce off its lows (\"mixed/choppy recovery, no clean direction\", 3★, the conflicting but weaker signal). CAD's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD surging with its single highest conviction of the year (inverted bearish, dominant, 5★); NZD's bounce beginning but unconfirmed. CAD's edge takes complete control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD's 5-YR spiking hard early in the month (inverted bearish, maximum conviction); NZD's choppy bounce persisting without confirmation. Hold short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's recovery continuing toward its August highs; NZD's bounce still mixed and unconfirmed. CAD's structural dominance remains intact." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's 5-YR beginning to top, early warning of its own rollover (inverted, narrowing slightly); NZD's bounce beginning to firm toward its own August rally. CAD's edge still carries into August's contested stretch." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED — TWO-SIDED", stars: 3,
    note: "Both currencies post genuine bull months in direct opposition — NZD's own \"recovering toward its September peak, all TFs building higher\" (4★, bullish) confronts CAD's own \"5-YR at or near peak, 40-YR continuing higher toward its September peak\" (4★ on its own chart — INVERTED, bearish for NZDCAD). Two similarly-paced commodity-bloc rallies in opposing setups for the pair — a genuinely contested month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD's recovery building toward its own September peak (bullish); CAD's bull run also continuing near its own highs (inverted bearish, similar conviction). Two similarly-paced rallies in direct opposition — genuinely contested." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD's rally persisting; CAD's bull run continuing toward its own peak (inverted bearish, still mirrored). The stand-off continues with neither component pulling clearly ahead." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally beginning to confirm with rising conviction (bullish, strengthening); CAD's 5-YR beginning to roll over from its peak (inverted, narrowing). NZD's strengthening edge starts to pull ahead." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally building toward its own September secondary peak (bullish, dominant); CAD's 40-YR nearing its own historic September peak before its own collapse (inverted, transitioning). NZD's edge carries into September's defining dual-flip collision." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DUAL FLIP COLLISION", stars: 4,
    note: "A rare DUAL-FLIP MONTH at maximum conviction — NZD's own SECONDARY FLIP — \"secondary peak ~80-85 mid-month, 5-YR peaks first as an early warning, exit longs Wk2, flip short mid-September\" (4★) — collides with CAD's HIGHEST CONVICTION REVERSAL OF ITS ENTIRE YEAR — \"40-YR and 15-YR hit the absolute annual peak ~100 mid-month then collapse, the single most decisive move of CAD's calendar\" (5★ on its own chart — INVERTED: bearish as CAD peaks, then powerfully bullish as CAD collapses). Both currencies stage major reversals in the same month — a genuine stand-off.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"CONFLICT — BOTH NEAR THEIR PEAKS ★★★☆☆", note:"NZD still building toward its own secondary peak (bullish, pre-flip); CAD also still rising toward its own absolute annual peak (inverted bearish, directly opposing NZD's strength). Genuinely contested as both approach their own peaks from opposing implied directions for the pair — the calm before next week's dual-flip storm." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT — DUAL FLIP FIRES ★★★★★", note:"NZD's flip fires — its 5-YR peaking first as an early warning, exit longs (now turning bearish); CAD's historic flip also fires at the very same time — peaking at its absolute annual high then collapsing (inverted: turning from bearish to powerfully bullish for NZDCAD). Two major reversals colliding in the same week — avoid forcing size at this historic dual pivot." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★★", note:"NZD's flip confirming — turning short on its own chart (bearish, dominant); CAD's post-peak collapse accelerating with maximum conviction (inverted bullish, directly opposing). Genuinely two-sided at peak conviction on both sides." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★★☆", note:"NZD's decline continuing from its flip; CAD's collapse persisting toward October (inverted bullish, still dominant). The dual-flip stand-off begins to ease as both transition into October's clearer resolution." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "COIN-FLIP — MIRRORED DECLINES", stars: 3,
    note: "Two commodity-bloc currencies post-collapse, declining in near-mirror fashion — NZD's own \"sharp post-peak waterfall, broad declines across all TFs\" (4★, bearish) confronts CAD's own \"sharp post-September decline, drops from 100 toward ~75\" (4★ on its own chart — INVERTED, bullish for NZDCAD). Both currencies fall together at similar conviction — the moves largely cancel, producing a genuine coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD's post-peak waterfall accelerating (bearish); CAD's post-collapse decline also accelerating (inverted bullish, near-mirrored conviction). The two declines largely cancel — genuinely contested." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"NZD's decline persisting with slightly faster pace; CAD's own decline continuing in parallel (inverted bullish, similar). NZD's marginally faster pace edges the lean toward short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad decline deepening; CAD's own waterfall persisting (inverted bullish, similar conviction). The mirrored declines keep the net modestly bearish." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD continuing lower toward its own November base; CAD also continuing its decline toward its own lows (inverted bullish, still mirrored). Both currencies' similar paths keep this genuinely contested into November." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED — TWO-SIDED", stars: 3,
    note: "NZD's own late-month reversal collides with CAD's continuing decline — \"continued weakness, late-Nov begins to base, Wk4 turn up — enter long for the December rally\" (3★, early bearish then turning bullish) confronts CAD's own \"continued broad decline toward ~50, bear bias throughout, severity easing late\" (3★ on its own chart — INVERTED, bullish for NZDCAD throughout). Early-month alignment (both bearish/inverted-bullish, roughly cancelling) gives way to late-month conflict as NZD's own Wk4 turn introduces fresh opposition.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD's continued weakness persisting (bearish); CAD's continued decline also persisting (inverted bullish, near-mirrored). The two declines roughly cancel — genuinely contested early." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"COIN-FLIP ★★★☆☆", note:"NZD's weakness continuing toward its late-month base; CAD's decline persisting with easing severity (inverted bullish, narrowing slightly). Still genuinely mirrored and contested." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD beginning to base — \"late Nov begins to base\" (turning toward bullish); CAD's decline persisting but easing (inverted bullish, still aligned for now). NZD's early turn begins to introduce fresh tension." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT — NZD TURNS ★★★★☆", note:"NZD's \"Wk4 turn up — enter long for the December rally\" confirms (now bullish, directly opposing CAD's continuing inverted-bullish decline — genuine conflict); CAD's late-month easing also continuing (inverted bullish). NZD's emphatic turn introduces real two-sided risk heading into December." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "NZD's STRONGEST MONTH OF ITS ENTIRE YEAR — \"surges toward ~95-100, all TFs aligned, the single highest-conviction long of NZD's whole year, hold longs through month end\" (5★, bullish) — overwhelms CAD's own directionless, low-conviction base-building stretch (\"all TFs converging near annual lows, beginning to base, year-end recovery begins very late\", 2★ on its own chart — INVERTED, similarly without strong directional edge). NZD's vastly higher conviction dominates outright, closing the calendar on its highest-conviction note.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"NZD's historic rally beginning to surge with maximum conviction (bullish, dominant, 5★); CAD near its own annual lows, no clear signal yet (inverted, neutral). NZD's edge takes complete control from the open." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"NZD's surge accelerating toward its absolute annual peak (bullish, maximum conviction); CAD's base-building persisting without direction (inverted, neutral, offering no resistance). Hold long with full conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"NZD's historic rally continuing across all TFs with maximum conviction; CAD's sideways consolidation continuing at its own lows (inverted, still neutral). NZD's overwhelming edge remains the only clear signal." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / HOLD ★★★★★", note:"NZD's surge persisting through month end — \"hold longs through month end\" on its own chart (bullish, maximum conviction); CAD's 5-YR beginning to turn up only very late (inverted bearish, mild and late opposition). NZD's defining annual move closes the calendar at its highest conviction." },
    ]
  },
];

const SEASONAL_DATA = `
NZDCAD — FOREX SEASONAL ANALYSIS
Derived from: New Zealand Dollar CME Futures (23-YR seasonal) + Canadian Dollar CME Futures (40-YR seasonal)
Methodology: NZD seasonal tendency combined with the inverse of CAD seasonal tendency (NZD is the base currency — direct; CAD is the quote currency — inverted, since CAD strength means fewer CAD per unit of NZD).

=== NZD COMPONENT (bullish NZD = NZDCAD rising) ===
Jan: NZD bear — \"opening collapse, grinding lower, broad seasonal weakness\" (4★).
Feb: NZD bear — \"continued grinding decline toward the March trough\" (4★).
Mar: NZD chop/flip — \"troughs then reverses, choppy transition off the lows\" (2★).
Apr: NZD bull — \"strong rally to ~85-90, all TFs rallying together\" (4★).
May: NZD's MOST CRITICAL FLIP MONTH OF ITS ENTIRE YEAR — \"23-YR peaks ~85-90 then collapses, all TFs align bearish by Wk2, the highest-conviction short of NZD's whole year\" (5★).
Jun: NZD bear — \"near absolute lows, deep waterfall continuation, the year's deepest trough zone\" (5★).
Jul: NZD chop — \"choppy, mixed bounce off the lows, no clean direction\" (3★).
Aug: NZD bull — \"recovering toward the September peak, all TFs building higher\" (4★).
Sep: NZD's SECONDARY FLIP MONTH — \"secondary peak ~80-85 mid-month, 5-YR peaks first as an early warning, exit longs Wk2, flip short mid-September\" (4★).
Oct: NZD bear — \"sharp post-peak waterfall, broad declines across all TFs\" (4★).
Nov: NZD bear — \"continued weakness, late-Nov begins to base, Wk4 turn up — enter long for the December rally\" (3★).
Dec: NZD's STRONGEST MONTH OF ITS ENTIRE YEAR — \"surges toward ~95-100, all TFs aligned, the single highest-conviction long of NZD's whole year, hold longs through month end\" (5★).

=== CAD COMPONENT (bullish CAD = NZDCAD falling, since CAD is inverted) ===
Jan: CAD bear — \"5-YR spikes then immediately collapses, fade the open, structural bear month\" (4★; inverted: bullish for NZDCAD).
Feb: CAD bear — \"all three TFs grinding lower toward the ~50 zone, broad seasonal weakness\" (4★; inverted: bullish for NZDCAD).
Mar: CAD chop/flip — \"40-YR begins recovery from Feb lows, 15-YR still weak, TFs diverging, no clean bias\" (2★; inverted: weak bearish lean for NZDCAD).
Apr: CAD bull — \"all TFs rallying, 5-YR spikes to ~85-90 mid-month, strong bull confluence\" (4★; inverted: bearish for NZDCAD).
May: CAD bear — \"40-YR peaks first half then rolls over, 5-YR collapses from its April peak, strong bear month\" (4★; inverted: bullish for NZDCAD).
Jun: CAD bear — \"all three TFs near lows ~25-30, deep seasonal trough zone, hold shorts from May\" (4★; inverted: bullish for NZDCAD).
Jul: CAD's POWERFUL RECOVERY — \"all TFs turning up simultaneously from the June trough, high conviction long, the year's strongest recovery window\" (5★; inverted: powerfully bearish for NZDCAD).
Aug: CAD bull — \"5-YR at or near peak ~90-95, 40-YR continuing higher toward the Sep peak\" (4★; inverted: bearish for NZDCAD).
Sep: CAD's HIGHEST CONVICTION REVERSAL OF ITS ENTIRE YEAR — \"40-YR and 15-YR hit the absolute annual peak ~100 mid-month then collapse simultaneously — the single most decisive move of CAD's calendar\" (5★; inverted: bearish for NZDCAD as CAD peaks, then powerfully bullish as CAD collapses).
Oct: CAD bear — \"sharp post-Sep decline, drops from 100 toward ~75, hold shorts from the flip\" (4★; inverted: bullish for NZDCAD).
Nov: CAD bear — \"continued broad decline toward ~50, bear bias throughout, severity easing late in the month\" (3★; inverted: bullish for NZDCAD).
Dec: CAD chop/base — \"all TFs converge near 0-25, annual low zone, beginning to base, very late year-end recovery begins\" (2★; inverted: similarly without strong directional edge).

=== COMBINED NET EFFECT ===
Jan-Feb: A NEAR-MIRROR — both commodity-bloc currencies decline together at similar conviction (NZD bearish, CAD inverted-bullish), the moves largely cancelling into a genuinely muted, contested coin-flip stretch.
Mar: A DUAL TRANSITION — both currencies enter their own low-conviction reversal months simultaneously, two weak opposing signals essentially cancelling — the quietest, most directionless month of the calendar.
Apr: MAXIMUM CONFLICT — both currencies fire genuine, near-identical-conviction bull months in directly opposing setups for the pair — a genuine high-conviction stand-off that narrowly resolves toward NZD as CAD's spike fades first.
May: TWO-SIDED DUAL-FLIP RISK — NZD's single highest-conviction reversal of its entire year collides with CAD's own continuing decline (inverted, bullish for NZDCAD); a fleeting early alignment near both currencies' peaks gives way to genuine conflict as NZD's defining collapse fires mid-month.
Jun: A close-fought mirror — NZD's continuing collapse narrowly outweighs CAD's own deep trough (inverted, bullish for NZDCAD, the conflicting but slightly weaker signal) — NZD's marginal edge carries a contested month.
Jul: CAD's single highest-conviction recovery of its entire year (inverted, powerfully bearish for NZDCAD) completely overwhelms NZD's own choppy, lower-conviction bounce — CAD's vastly higher conviction dominates outright.
Aug: Another near-mirror — both currencies post genuine, similarly-paced bull months in direct opposition, producing a genuinely contested stretch that narrows toward NZD as its confirmation comes slightly earlier.
Sep: A RARE DUAL-FLIP COLLISION AT MAXIMUM CONVICTION — NZD's own secondary flip collides with CAD's single highest-conviction reversal of its entire year (inverted) in the very same week — two major reversals firing simultaneously, a genuine historic stand-off.
Oct-Nov: MIRRORED POST-COLLAPSE DECLINES — both currencies fall together at similar conviction for two consecutive months (NZD bearish, CAD inverted-bullish), the moves largely cancelling into genuine coin-flip stretches — until NZD's own emphatic late-November Wk4 turn introduces fresh, real two-sided conflict.
Dec: NZD's single highest-conviction long of its entire year (its strongest month on its own chart) completely overwhelms CAD's own directionless, low-conviction base-building stretch (inverted, similarly without edge) — NZD's vastly higher conviction dominates outright, closing the calendar on its highest note.

=== PLAYBOOK SIGNALS ===
NZDCAD HIGHEST CONVICTION LONG: December (NZD's single highest-conviction long of its entire year overwhelms CAD's directionless base-building stretch outright, 5★ — the calendar's cleanest, highest-conviction trade).
NZDCAD HIGHEST CONVICTION SHORT: July (CAD's single highest-conviction recovery of its entire year, inverted bearish, completely overwhelms NZD's own weaker bounce, 4-5★).
NZDCAD MOST CONTESTED / REQUIRES CAREFUL FRAMING: January-February, June, August, and October-November (a calendar unusually rich in near-mirrored moves between two similarly-cyclical commodity-bloc currencies, producing genuine coin-flip stretches) and September (a rare DUAL-FLIP COLLISION — both currencies stage major reversals in the very same week, at or near their own highest conviction).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for NZDCAD explaining how the NZD and CAD seasonal forces interact month by month. Note that this pair is unusual: NZD and CAD are both commodity-bloc currencies with similarly cyclical seasonal patterns, producing an unusually high number of near-mirrored, genuinely contested months — punctuated by September's rare dual-flip collision and December's clean, single-component dominance.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (NZD or CAD) is dominant (or whether the month is a genuine coin-flip), conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction NZDCAD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially the unusually high frequency of near-mirrored, coin-flip months, September's rare dual-flip collision between both currencies' major reversals, and December's clean single-component dominance that closes the calendar at its highest conviction.
`;
