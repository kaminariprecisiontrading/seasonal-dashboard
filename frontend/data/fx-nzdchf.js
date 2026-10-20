/**
 * data/fx-nzdchf.js — NZDCHF Forex Seasonal
 * Derived from: NZD/USD CME futures + CHF/USD CME futures (inverted)
 * Methodology: NZD seasonal tendency vs inverted CHF seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-nzdchf",
  name:     "NZD / CHF",
  sub:      "Forex Seasonal · Derived from NZD CME + CHF CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · New Zealand Dollar CME (23-YR) · Swiss Franc CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's own structural opening collapse — \"grinding lower from the new year open, broad seasonal weakness\" (4★, bearish) — narrowly outweighs CHF's own opening decline (\"declining from December highs, broad early-year weakness\", 3★ on its own chart — INVERTED, bullish for NZDCHF, the conflicting but weaker signal). NZD's higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's opening collapse underway (bearish, dominant); CHF also declining from its December highs (inverted bullish, weaker conflicting signal). NZD's higher conviction carries the early month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's decline accelerating; CHF's early-year weakness persisting (inverted bullish, still the weaker signal). NZD's structural edge continues to dominate." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad weakness persisting; CHF's decline also continuing (inverted bullish, narrowing the gap slightly). NZD's marginal edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD continuing lower toward February; CHF's decline persisting in parallel (inverted bullish, still the weaker conflicting signal). NZD's edge carries into February." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's continuing \"grinding decline toward the March trough\" (4★, bearish) outweighs CHF's own continuing seasonal weakness — \"all TFs declining, broad February weakness persisting\" (4★ on its own chart — INVERTED, bullish for NZDCHF). A genuinely close-fought month where NZD's slightly clearer trajectory edges ahead.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's decline continuing toward its trough (bearish); CHF's own decline also persisting at similar conviction (inverted bullish, near-mirrored). Genuinely close-fought, NZD's edge narrowly ahead." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD approaching its own trough; CHF's broad weakness persisting (inverted bullish, similar pace). NZD's marginal edge continues." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"NZD nearing its own trough and turn (narrowing); CHF's decline persisting but also approaching its own transition (inverted, narrowing). Both nearing their own turning points — clarity fading toward neutral." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD's base-building beginning ahead of its own bullish March turn; CHF's decline persisting toward its own historic March flip (inverted, transitioning). Both currencies approaching simultaneous reversal points into March." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "CHF's own historic flip month — \"trough then long, the year's first major reversal point\" (4★ on its own chart — INVERTED: bullish early as CHF troughs, then bearish for NZDCHF as CHF rallies) — dominates over NZD's own low-conviction trough-to-recovery transition (\"choppy reversal off the lows, TFs diverging\", 2★, weak bullish lean). CHF's higher conviction reversal carries the month, with the flip itself producing a two-sided open.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD basing at its trough, beginning to turn (weak bullish); CHF also at its own trough before its historic flip (inverted bullish at the CHF low, briefly aligning). A fleeting alignment near both currencies' lows." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT — CHF FLIP FIRES ★★★★☆", note:"NZD's reversal still uncertain, TFs diverging; CHF's historic flip fires — rallying from its trough with rising conviction (inverted bearish for NZDCHF, now dominant). CHF's higher-conviction reversal takes control." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's own recovery still building without full confirmation; CHF's rally continuing with rising conviction (inverted bearish, dominant). CHF's edge carries the month." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's rally beginning to build toward its own April bull window (bullish, strengthening); CHF's rally also continuing toward its own April peak (inverted bearish, still dominant). CHF's edge persists into April's contested stretch." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED — TWO-SIDED", stars: 3,
    note: "NZD's own strong bull month — \"strong rally to ~85-90, all TFs rallying together\" (4★, bullish) — confronts CHF's own bull window (\"recovering from its March trough, building higher\", 3★ on its own chart — INVERTED, bearish for NZDCHF). Both currencies post genuine bull months in opposing setups — NZD's marginally higher conviction narrowly carries a contested month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT — LEAN LONG ★★★☆☆", note:"NZD's strong rally building (bullish, 4★); CHF's own rally continuing from its March turn (inverted bearish, 3★, opposing but lower conviction). NZD's higher conviction edges the lean long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally accelerating toward its peak; CHF's rally also continuing but at lower conviction (inverted bearish, narrowing gap). NZD's edge persists." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally continuing into its own May peak; CHF approaching its own April peak before its own historic May flip (inverted, building). The conflict persists but NZD's edge holds." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally persisting toward its own historic May flip (bullish, still strong); CHF nearing its own peak before its own defining May collapse (inverted, transitioning). NZD's sustained conviction carries into May's defining collision." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING COLLISION", stars: 4,
    note: "THE DEFINING COLLISION OF THE FIRST HALF — NZD's MOST CRITICAL FLIP MONTH OF ITS ENTIRE YEAR — \"23-YR peaks ~85-90 then collapses, all TFs align bearish by Wk2, the highest-conviction short of NZD's whole year\" (5★) — collides directly with CHF's own DEFINING FLIP — \"peak ~100 then short, the single highest-conviction reversal of CHF's entire year\" (5★ on its own chart — INVERTED: bullish early as CHF peaks, then powerfully bullish for NZDCHF as CHF collapses). Both currencies stage the single highest-conviction trade of their respective years in the same month — a genuine maximum-conviction stand-off.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD still near its absolute annual peak before its historic collapse (bullish); CHF also still near its own peak before its own historic collapse (inverted bullish, briefly aligning). Both near their own peaks — a fleeting alignment before both reverse violently." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"MAXIMUM CONFLICT — DUAL FLIP FIRES ★★★★★", note:"NZD's historic flip fires — collapsing from its peak, the single highest-conviction reversal of its entire year (now bearish); CHF's own historic flip also fires at the same moment — collapsing from its own peak (inverted: now powerfully bullish for NZDCHF). Two defining annual moves colliding head-on — avoid forcing size at this historic dual pivot." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★★★☆", note:"NZD's collapse persisting with maximum conviction (bearish, dominant on its own chart); CHF's collapse also accelerating (inverted bullish, directly opposing NZD's own bearish move and now the stronger net force as CHF's collapse compounds). Genuinely two-sided at peak conviction on both sides." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★★☆", note:"NZD's collapse continuing toward its own June trough (bearish, still dominant on its own chart); CHF's collapse persisting with high conviction (inverted bullish, now edging ahead as CHF's own decline compounds further). The historic stand-off begins to resolve toward CHF's higher net conviction." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "NZD's continuing collapse — \"all three TFs near absolute lows, deep waterfall continuation, the year's deepest trough zone\" (5★, bearish) — narrowly outweighs CHF's own continuing decline (\"broad weakness following its May collapse, all TFs lower\", 4★ on its own chart — INVERTED, bullish for NZDCHF, the conflicting but slightly weaker signal). NZD's marginally higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's waterfall continuing into its absolute lows (bearish, dominant, 5★); CHF's decline also continuing (inverted bullish, slightly weaker). NZD's edge carries the early month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD at its deepest trough, all TFs depressed; CHF's broad weakness persisting (inverted bullish, narrowing gap). NZD's structural dominance remains intact." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad weakness persisting near its lows; CHF also continuing its decline (inverted bullish, similar conviction). NZD's marginal edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★★☆☆", note:"NZD beginning to stabilise ahead of its own July bounce; CHF's decline persisting toward its own July lows (inverted bullish, still mirrored). Both nearing their own transitions — clarity fading toward July's clearer resolution." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 2,
    note: "NZD's own choppy, mixed bounce off its lows (\"mixed/choppy recovery, no clean direction\", 3★, weak bullish lean) confronts CHF's own continuing decline (\"continued broad weakness, all TFs grinding lower\", 3★ on its own chart — INVERTED, bullish for NZDCHF). Both at modest conviction, but CHF's own clearer downward trajectory edges the net toward short — the calendar's quietest stretch.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"NZD's bounce beginning but unconfirmed (weak bullish); CHF's decline persisting (inverted bullish, similar weak conviction). Genuinely quiet — avoid forcing a trade." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's bounce still mixed and unconfirmed; CHF's decline continuing with slightly clearer trajectory (inverted bullish, edging ahead). CHF's marginal edge begins to carry." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's recovery beginning to firm toward its own August rally; CHF's decline persisting toward its own lows (inverted bullish, still leading). CHF's edge continues to carry the net." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD's recovery building with rising conviction toward its own August rally (bullish, now opposing); CHF nearing its own lows ahead of its own August recovery (inverted, narrowing). The month closes with both currencies approaching their own turns, introducing fresh tension into August." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "chop", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "NZD's own continuing recovery — \"recovering toward its September peak, all TFs building higher\" (4★, bullish) — outweighs CHF's own bull window (\"recovery building from its July lows toward its own August/September stretch\", 3★ on its own chart — INVERTED, bearish for NZDCHF, the conflicting but weaker signal). NZD's higher conviction carries a moderately contested month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's recovery rally building toward its own September peak (bullish, dominant); CHF's own recovery also building (inverted bearish, weaker conflicting signal). NZD's higher conviction carries the early month." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"NZD's rally continuing with rising conviction; CHF's bull window persisting but at lower conviction (inverted bearish, still weaker). Hold long on NZD's edge." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally building toward its own September secondary peak (bullish, dominant); CHF's own rally also continuing (inverted bearish, narrowing the gap slightly). NZD's edge persists." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"NZD's rally persisting toward its own historic September flip (bullish, still strong); CHF approaching its own peak before its own historic September collapse (inverted, transitioning). NZD's sustained conviction carries into September's dual-flip collision." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING DUAL-FLIP COLLISION", stars: 4,
    note: "THE SECOND DEFINING COLLISION OF THE NZDCHF CALENDAR — NZD's own SECONDARY FLIP — \"secondary peak ~80-85 mid-month, 5-YR peaks first as an early warning, exit longs Wk2, flip short mid-September\" (4★) — collides with CHF's own DEFINING SEPTEMBER FLIP — \"peak ~100 then short, the year's second highest-conviction reversal\" (5★ on its own chart — INVERTED: bullish as CHF peaks, then powerfully bullish for NZDCHF as CHF collapses). Both currencies stage major reversals in the same month for the second time this year — another genuine stand-off.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD still building toward its own secondary peak (bullish, pre-flip); CHF also still rising toward its own annual peak (inverted bullish at the CHF high, briefly aligning). Both near their own peaks — a fleeting alignment before both reverse." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT — DUAL FLIP FIRES ★★★★★", note:"NZD's flip fires — its 5-YR peaking first as an early warning, exit longs (now turning bearish); CHF's own historic flip also fires — peaking then collapsing (inverted: turning powerfully bullish for NZDCHF). Two major reversals colliding in the same week — avoid forcing size at this historic dual pivot." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★★★☆", note:"NZD's flip confirming — turning short on its own chart (bearish, dominant on its own chart); CHF's collapse accelerating with maximum conviction (inverted bullish, directly opposing and compounding). CHF's higher-conviction collapse begins to edge the net higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★★☆", note:"NZD's decline continuing from its flip (bearish on its own chart); CHF's collapse persisting with high conviction (inverted bullish, now the dominant net force). The dual-flip stand-off resolves toward CHF's higher conviction as the pair turns into October." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's own \"sharp post-peak waterfall, broad declines across all TFs\" (4★, bearish) directly aligns with CHF's continuing weakness — \"broad decline persisting following its September collapse, all TFs lower\" (4★ on its own chart — INVERTED, bullish for NZDCHF — wait, CHF declining means CHF weaker, which would be bullish for NZDCHF; but NZD is also declining, bearish — these conflict, not align). Re-derivation: NZD bearish + CHF bearish (inverted bullish) = CONFLICT, with NZD's slightly higher conviction narrowly carrying a contested month toward short.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's post-peak waterfall accelerating (bearish, dominant); CHF's continuing decline also persisting (inverted bullish, opposing but weaker). NZD's higher conviction edges the net lower." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad decline deepening; CHF's weakness persisting (inverted bullish, still the weaker conflicting signal). NZD's edge continues to carry." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's decline continuing toward its own November base; CHF also continuing its own decline (inverted bullish, narrowing the gap). NZD's marginal edge persists." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★★☆☆", note:"NZD beginning to slow its decline ahead of its own November base; CHF's weakness persisting toward its own November flip (inverted, transitioning). Both approaching their own turns — clarity fading toward November's contested stretch." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED — TWO-SIDED", stars: 3,
    note: "NZD's own late-month reversal collides with CHF's own historic flip — \"continued weakness, late-Nov begins to base, Wk4 turn up — enter long for the December rally\" (3★, early bearish then turning bullish) confronts CHF's own \"trough then long, a key reversal point ahead of its historic December rally\" (4★ on its own chart — INVERTED: bearish early as CHF troughs, then bearish for NZDCHF as CHF rallies). Early-month alignment gradually gives way to late-month conflict as both currencies approach their own simultaneous late-month turns.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT LEAN ★★★☆☆", note:"NZD's continued weakness persisting (bearish); CHF still near its own lows before its own flip (inverted bullish briefly, but CHF's trough imminent). Both near their own transition points — a narrow early alignment." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"NZD's weakness continuing toward its late-month base; CHF's own historic flip beginning to fire — troughing and turning higher (inverted bearish for NZDCHF, now opposing NZD's continuing weakness). Fresh conflict emerges as CHF reverses." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD beginning to base — \"late Nov begins to base\" (turning toward bullish); CHF's rally building from its trough (inverted bearish, directly opposing NZD's emerging turn). Both currencies now turning in opposite implied directions — genuinely two-sided." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT — DUAL TURN ★★★★☆", note:"NZD's \"Wk4 turn up — enter long for the December rally\" confirms (now bullish); CHF's own rally also building with rising conviction (inverted bearish, directly opposing). Both currencies turning at the same time in opposing setups — real two-sided risk heading into December's defining collision." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "MAXIMUM CONFLICT — ULTIMATE YEAR-END COLLISION", stars: 4,
    note: "THE ULTIMATE COLLISION OF THE NZDCHF CALENDAR — NZD's STRONGEST MONTH OF ITS ENTIRE YEAR — \"surges toward ~95-100, all TFs aligned, the single highest-conviction long of NZD's whole year\" (5★, bullish) — collides directly with CHF's HIGHEST CONVICTION LONG OF ITS ENTIRE YEAR — \"rockets to its peak ~100, all TFs aligned, the single highest-conviction long of CHF's whole year\" (5★ on its own chart — INVERTED, powerfully bearish for NZDCHF). Both currencies post the single highest-conviction trade of their respective years in the SAME month, in DIRECTLY OPPOSING directions for the pair — a genuine maximum-conviction coin-flip closes the calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★★", note:"NZD's historic rally beginning to surge with maximum conviction (bullish, 5★ on its own chart); CHF's own historic rally also beginning to surge (inverted bearish, 5★, directly opposing). Both currencies' single highest-conviction moves of their entire years firing in the same week, in direct opposition — a true coin-flip at maximum conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★★", note:"NZD's surge accelerating toward its absolute annual peak; CHF's own surge also accelerating toward its own absolute annual peak (inverted bearish, near-mirrored maximum conviction). Genuinely the most two-sided week of the entire calendar — avoid forcing size." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★★", note:"NZD's historic rally continuing across all TFs with maximum conviction; CHF's own historic rally also continuing with equal conviction (inverted bearish, still directly opposing). The defining collision of the calendar persists at peak intensity on both sides." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT — YEAR-END COIN-FLIP ★★★★★", note:"NZD's surge persisting through month end — \"hold longs through month end\" on its own chart (bullish, maximum conviction); CHF's own historic rally also persisting through month end on its own chart (inverted bearish, maximum conviction). The calendar closes on a genuine maximum-conviction coin-flip — both currencies' defining annual moves colliding head-on to the very last week." },
    ]
  },
];

const SEASONAL_DATA = `
NZDCHF — FOREX SEASONAL ANALYSIS
Derived from: New Zealand Dollar CME Futures (23-YR seasonal) + Swiss Franc CME Futures (40-YR seasonal)
Methodology: NZD seasonal tendency combined with the inverse of CHF seasonal tendency (NZD is the base currency — direct; CHF is the quote currency — inverted, since CHF strength means fewer CHF per unit of NZD).

=== NZD COMPONENT (bullish NZD = NZDCHF rising) ===
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

=== CHF COMPONENT (bullish CHF = NZDCHF falling, since CHF is inverted) ===
Jan: CHF bear — \"declining from December highs, broad early-year weakness\" (3★; inverted: bullish for NZDCHF).
Feb: CHF bear — \"all TFs declining, broad February weakness persisting\" (4★; inverted: bullish for NZDCHF).
Mar: CHF's FIRST FLIP — \"trough then long, the year's first major reversal point\" (4★; inverted: bullish at the CHF trough, then bearish for NZDCHF as CHF rallies).
Apr: CHF bull — \"recovering from its March trough, building higher\" (3★; inverted: bearish for NZDCHF).
May: CHF's DEFINING FLIP — \"peak ~100 then short, the single highest-conviction reversal of CHF's entire year\" (5★; inverted: bullish at the CHF peak, then powerfully bullish for NZDCHF as CHF collapses).
Jun: CHF bear — \"broad weakness following its May collapse, all TFs lower\" (4★; inverted: bullish for NZDCHF).
Jul: CHF bear — \"continued broad weakness, all TFs grinding lower\" (3★; inverted: bullish for NZDCHF).
Aug: CHF bull — \"recovery building from its July lows toward its own late-summer stretch\" (3★; inverted: bearish for NZDCHF).
Sep: CHF's SECOND DEFINING FLIP — \"peak ~100 then short, the year's second highest-conviction reversal\" (5★; inverted: bullish at the CHF peak, then powerfully bullish for NZDCHF as CHF collapses).
Oct: CHF bear — \"broad decline persisting following its September collapse, all TFs lower\" (4★; inverted: bullish for NZDCHF).
Nov: CHF's THIRD FLIP — \"trough then long, a key reversal point ahead of its historic December rally\" (4★; inverted: bullish at the CHF trough, then bearish for NZDCHF as CHF rallies).
Dec: CHF's HIGHEST CONVICTION LONG OF ITS ENTIRE YEAR — \"rockets to its peak ~100, all TFs aligned, the single highest-conviction long of CHF's whole year\" (5★; inverted: powerfully bearish for NZDCHF).

=== COMBINED NET EFFECT ===
Jan-Feb: NZD's own structural opening collapse narrowly outweighs CHF's own early-year decline (inverted, bullish for NZDCHF, the conflicting but weaker signal) — NZD's slightly higher conviction carries two close-fought months.
Mar: CHF's own first major flip of the year (inverted, bearish for NZDCHF as CHF rallies from its trough) dominates over NZD's own low-conviction recovery transition — CHF's higher-conviction reversal carries the month, with the flip itself producing a brief two-sided open.
Apr: Both currencies post genuine bull months in opposing setups for the pair — NZD's marginally higher conviction narrowly carries a contested month.
May: THE FIRST DEFINING COLLISION — both currencies stage the single highest-conviction trade of their respective years in the same month, in directly opposing setups (NZD's historic collapse vs CHF's own historic collapse, inverted bullish for NZDCHF) — a fleeting early alignment near both peaks gives way to a genuine maximum-conviction stand-off that ultimately resolves toward CHF's compounding collapse.
Jun: A close-fought mirror — NZD's continuing collapse narrowly outweighs CHF's own continuing decline (inverted, bullish for NZDCHF, the conflicting but slightly weaker signal).
Jul: The calendar's quietest stretch — both currencies sit at modest, low-conviction levels, with CHF's slightly clearer downward trajectory (inverted, bullish for NZDCHF) edging the net toward a mild short lean.
Aug: NZD's own continuing recovery rally outweighs CHF's own more modest bull window (inverted, bearish for NZDCHF, the conflicting but weaker signal) — NZD's higher conviction carries a moderately contested month.
Sep: THE SECOND DEFINING COLLISION — a rare repeat dual-flip month: NZD's own secondary flip collides with CHF's own second defining annual flip (inverted, bullish for NZDCHF as CHF collapses) — both currencies stage major reversals in the same month for the second time this year, ultimately resolving toward CHF's higher-conviction collapse.
Oct: NZD's own sharp post-peak waterfall narrowly outduels CHF's own continuing decline (inverted, bullish for NZDCHF, the conflicting signal) in a genuinely contested month that edges toward short on NZD's slightly higher conviction.
Nov: A genuinely two-sided month — NZD's own late-month reversal collides with CHF's own historic flip (inverted, bearish for NZDCHF as CHF rallies from its trough) — both currencies turning at nearly the same time in opposing setups for the pair.
Dec: THE ULTIMATE COLLISION OF THE CALENDAR — both currencies post the single highest-conviction trade of their respective ENTIRE years in the SAME month, in DIRECTLY OPPOSING directions for the pair (NZD's strongest month vs CHF's strongest month, inverted) — a genuine maximum-conviction coin-flip closes the year at peak intensity on both sides.

=== PLAYBOOK SIGNALS ===
NZDCHF HIGHEST CONVICTION LONG: April-August stretch offers the calendar's clearest dominant-component resolutions for NZD (4★ on multiple months), with August standing out as NZD's recovery cleanly outpaces CHF's more modest bull window.
NZDCHF MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (THE FIRST DEFINING COLLISION — both currencies' single highest-conviction trades of the year colliding head-on), September (THE SECOND DEFINING COLLISION — a rare repeat dual-flip month), and December (THE ULTIMATE COLLISION — both currencies' single highest-conviction trades of their respective ENTIRE years firing in the SAME month, in directly opposing directions — a genuine maximum-conviction coin-flip that closes the calendar).
NZDCHF NOTABLE PATTERN: This calendar is unusually dramatic — featuring not one but THREE genuine maximum-conviction collisions (May, September, December), each pitting both currencies' defining annual moves directly against each other.

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for NZDCHF explaining how the NZD and CHF seasonal forces interact month by month, with special attention to the THREE genuine maximum-conviction collisions of the calendar: May, September, and December — each pitting both currencies' defining annual moves directly against each other.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (NZD or CHF) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction NZDCHF trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially the three defining collisions of May, September, and December, where both currencies repeatedly stage their single highest-conviction moves of the year in direct opposition. December in particular should be framed as the calendar's ultimate coin-flip: both currencies' single highest-conviction trades of their ENTIRE years, firing in the same month, in directly opposing directions.
`;
