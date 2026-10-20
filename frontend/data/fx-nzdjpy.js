/**
 * data/fx-nzdjpy.js — NZDJPY Forex Seasonal
 * Derived from: NZD/USD CME futures + JPY/USD CME futures (inverted)
 * Methodology: NZD seasonal tendency vs inverted JPY seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-nzdjpy",
  name:     "NZD / JPY",
  sub:      "Forex Seasonal · Derived from NZD CME + JPY CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · New Zealand Dollar CME (23-YR) · Japanese Yen CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's own opening collapse — \"grinding lower from the new year open, broad seasonal weakness\" (4★, bearish) — dominates over JPY's own modest early-year decline (\"drifting lower off the December highs, low conviction\", 3★ on its own chart — INVERTED, bullish for NZDJPY, the conflicting but weaker signal). NZD's structural edge carries the month outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's opening collapse underway (bearish, dominant, 4★); JPY also drifting lower at low conviction (inverted bullish, weaker conflicting signal). NZD's structural edge carries the early month outright." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's decline accelerating; JPY's drift persisting at low conviction (inverted bullish, still the weaker signal). NZD's dominance continues unchallenged." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad weakness persisting; JPY beginning to stabilise ahead of its own February trough (inverted, narrowing slightly). NZD's edge still carries comfortably." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD continuing lower toward February; JPY nearing its own primary trough (inverted, transitioning). NZD's structural dominance carries into February." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's continuing \"grinding decline toward the March trough\" (4★, bearish) outweighs JPY's own primary trough month — \"choppiest, most directionless stretch of JPY's year, basing near its lows\" (2★ on its own chart — INVERTED, weak bullish lean for NZDJPY). NZD dominates by default over JPY's structurally low-conviction month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's decline continuing toward its trough (bearish, dominant); JPY basing near its own lows at minimal conviction (inverted, weak bullish lean). NZD dominates by default." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD approaching its own trough; JPY's directionless basing persisting (inverted, still minimal conviction). NZD's edge continues to carry by default." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"NZD nearing its own trough and turn (narrowing); JPY's directionless chop persisting near its own lows (inverted, still low conviction). Clarity fading toward neutral as NZD approaches its own reversal." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD's base-building beginning ahead of its own bullish March turn; JPY's basing persisting ahead of its own historic March rally (inverted, transitioning). Both currencies approaching their own reversal points into March." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "JPY's STRONGEST QUARTER-ONE WINDOW — \"powerful rally off the February trough, the strongest Q1 window of JPY's entire year\" (5★ on its own chart — INVERTED, powerfully bearish for NZDJPY) — dominates outright over NZD's own low-conviction trough-to-recovery transition (\"choppy reversal off the lows, TFs diverging\", 2★, weak bullish lean). JPY's higher-conviction inverted move carries the month comfortably.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"NZD basing at its trough, beginning to turn (weak bullish, low conviction); JPY's powerful Q1 rally already underway (inverted bearish, dominant, 5★). JPY's higher conviction carries from the open." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD's reversal still uncertain, TFs diverging; JPY's rally accelerating with maximum conviction (inverted bearish, dominant). JPY's defining Q1 strength overwhelms NZD outright." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD's own recovery still building without confirmation; JPY's rally continuing to surge (inverted bearish, maximum conviction). Hold short on JPY's defining inverted strength." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"NZD's rally beginning to build toward its own April bull window (bullish, strengthening); JPY's powerful Q1 rally persisting toward its own April peak (inverted bearish, still dominant). JPY's edge persists into April's contested stretch." },
    ]
  },
  {
    month: "April", sig5: "bull", sig15: "chop", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG LEAN — RESOLVING ALIGNMENT", stars: 3,
    note: "Early-month conflict resolves into double-alignment bullish: NZD's own \"strong rally to ~85-90, all TFs rallying together\" (4★, bullish) collides with JPY's own historic flip — \"peak then sell, reversing from its Q1 highs\" (3★ on its own chart — INVERTED: bearish at the JPY peak, then bullish for NZDJPY as JPY declines). As JPY's decline takes hold mid-month, both signals align bullish for NZDJPY — a contested open resolving into clean alignment.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT — LEAN LONG ★★★☆☆", note:"NZD's strong rally building (bullish, 4★); JPY still near its own Q1 peak before its historic flip (inverted bearish, briefly opposing). NZD's higher conviction edges the lean long despite the conflict." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD's rally accelerating toward its peak (bullish, dominant); JPY's historic flip fires — reversing from its Q1 highs and beginning to decline (inverted: now turning bullish for NZDJPY). Both signals align bullish as JPY's decline takes hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD's rally continuing into its own May peak; JPY's decline from its flip persisting (inverted bullish, now confirming). Clean double alignment carries the month." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"NZD's rally persisting toward its own historic May flip (bullish, still strong); JPY's decline continuing from its own flip (inverted bullish, confirming alignment). Hold long into May's defining flip month." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "TWO-SIDED — CONTESTED", stars: 4,
    note: "NZD's MOST CRITICAL FLIP MONTH OF ITS ENTIRE YEAR — \"23-YR peaks ~85-90 then collapses, all TFs align bearish by Wk2, the highest-conviction short of NZD's whole year\" (5★) — confronts JPY's own continuing decline from its Q1 peak (\"broad weakness persisting, all TFs lower\", 3★ on its own chart — INVERTED, bullish for NZDJPY). Early alignment near NZD's peak gives way to genuine conflict as NZD collapses while JPY's inverted strength persists.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD still near its absolute annual peak before its historic collapse (bullish); JPY's decline continuing from its own Q1 highs (inverted bullish, aligning). Both signals briefly align bullish near NZD's defining peak." },
      { wk:"Wk 2", s5:"bear", s15:"chop", sLt:"chop", com:"MAXIMUM CONFLICT — NZD FLIP FIRES ★★★★★", note:"NZD's historic flip fires — collapsing from its peak, the single highest-conviction reversal of its entire year (now bearish, dominant); JPY's decline persisting (inverted bullish, directly opposing). NZD's defining annual move collides head-on with JPY's continuing inverted strength." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"NZD's collapse continuing with maximum conviction (bearish, dominant); JPY's decline also persisting (inverted bullish, opposing but lower conviction). NZD's defining move carries the net lower." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"NZD's collapse persisting toward its own June trough (bearish, still dominant, 5★); JPY's decline continuing toward its own May lows (inverted bullish, still the weaker conflicting signal). NZD's higher conviction carries the month's resolution." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "NZD's continuing collapse — \"all three TFs near absolute lows, deep waterfall continuation, the year's deepest trough zone\" (5★, bearish) — dominates outright over JPY's own choppy, directionless transition (\"basing near its own May lows, no clean direction, the year's quietest stretch\", 2★ on its own chart — INVERTED, negligible conflicting signal). NZD's structural dominance carries the month comfortably.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD's waterfall continuing into its absolute lows (bearish, dominant, 5★); JPY basing at low conviction near its own lows (inverted, negligible). NZD's structural dominance carries outright." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD at its deepest trough, all TFs depressed; JPY's directionless chop persisting (inverted, still negligible). Hold short on NZD's defining trough." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's broad weakness persisting near its lows; JPY's chop continuing near its own lows (inverted, low conviction). NZD's dominance remains intact." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD beginning to stabilise ahead of its own July bounce; JPY's chop persisting ahead of its own historic July rally (inverted, transitioning). NZD's edge carries into July's contested resolution." },
    ]
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "JPY's STRONGEST MONTH OF ITS ENTIRE YEAR — \"powerful rally to its annual highs, all TFs aligned, the single highest-conviction long of JPY's whole year\" (5★ on its own chart — INVERTED, powerfully bearish for NZDJPY) — overwhelms NZD's own choppy, mixed bounce off its lows (\"mixed/choppy recovery, no clean direction\", 3★, weak bullish lean) outright. JPY's defining inverted strength dominates comfortably.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD's bounce beginning but unconfirmed (weak bullish, low conviction); JPY's defining annual rally already surging (inverted bearish, dominant, 5★). JPY's higher-conviction inverted move carries from the open." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD's bounce still mixed and unconfirmed; JPY's rally continuing to surge toward its annual highs (inverted bearish, maximum conviction). Hold short on JPY's defining strength." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"NZD's recovery beginning to firm toward its own August rally; JPY's rally persisting at maximum conviction (inverted bearish, dominant). JPY's defining annual move overwhelms NZD outright." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's recovery building with rising conviction toward its own August rally (bullish, narrowing the gap slightly); JPY's rally persisting near its annual highs (inverted bearish, still dominant). JPY's edge carries the month's resolution into August's contested stretch." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED — RESOLVING TO ALIGNMENT", stars: 3,
    note: "NZD's own continuing recovery — \"recovering toward its September peak, all TFs building higher\" (4★, bullish) — confronts JPY's own historic flip — \"peak then short, the highest-conviction short entry of JPY's entire year\" (4★ on its own chart — INVERTED: bearish at the JPY peak, then bullish for NZDJPY as JPY declines). Early-month conflict gives way to alignment as JPY's decline from its own flip takes hold.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT — LEAN LONG ★★★☆☆", note:"NZD's recovery rally building (bullish, dominant); JPY still near its own annual highs before its historic flip (inverted bearish, briefly opposing). NZD's higher conviction edges the lean long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD's rally continuing with rising conviction; JPY's historic flip fires — reversing from its annual peak and beginning to decline (inverted: now turning bullish for NZDJPY). Both signals align bullish as JPY's decline takes hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"NZD's rally building toward its own September secondary peak; JPY's decline from its own flip persisting (inverted bullish, confirming alignment). Hold long on the confirmed double alignment." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"NZD's rally persisting toward its own historic September flip (bullish, still strong); JPY's decline continuing from its own flip toward its own September lows (inverted bullish, still confirming). Hold long into September's defining collision." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "DEFINING COLLISION — TWO-SIDED", stars: 4,
    note: "NZD's own SECONDARY FLIP — \"secondary peak ~80-85 mid-month, 5-YR peaks first as an early warning, exit longs Wk2, flip short mid-September\" (4★) — collides with JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"collapses from its August peak, all TFs align bearish, the single highest-conviction short of JPY's whole year\" (5★ on its own chart — INVERTED, powerfully bullish for NZDJPY). An early double-alignment bullish open gives way to maximum conflict as NZD flips short while JPY's collapse continues to push NZDJPY higher (inverted).",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD still building toward its own secondary peak (bullish, pre-flip); JPY's historic collapse already underway from its August highs (inverted bullish, aligning). Both signals align bullish — hold long ahead of NZD's flip." },
      { wk:"Wk 2", s5:"bear", s15:"bull", sLt:"chop", com:"MAXIMUM CONFLICT — NZD FLIP FIRES ★★★★★", note:"NZD's flip fires — its 5-YR peaking first as an early warning, exit longs, flip short (now turning bearish, dominant on its own chart); JPY's historic collapse persisting at maximum conviction (inverted bullish, directly opposing and the higher-conviction signal). NZD's secondary flip collides head-on with JPY's defining annual collapse." },
      { wk:"Wk 3", s5:"bear", s15:"bull", sLt:"chop", com:"CONFLICT — LEAN LONG ★★★★☆", note:"NZD's flip confirming — turning short on its own chart (bearish, opposing); JPY's collapse continuing with maximum conviction (inverted bullish, dominant, 5★). JPY's defining annual move carries the higher net conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★★☆", note:"NZD's decline continuing from its flip (bearish on its own chart, lower conviction); JPY's historic collapse persisting through month end (inverted bullish, maximum conviction). The defining collision resolves toward JPY's higher-conviction inverted strength as the pair turns into October." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "NZD's own \"sharp post-peak waterfall, broad declines across all TFs\" (4★, bearish) narrowly outweighs JPY's own continuing decline from its historic September collapse (\"broad weakness persisting, all TFs lower\", 3★ on its own chart — INVERTED, bullish for NZDJPY, the conflicting but weaker signal). NZD's higher conviction edges a moderately contested month toward short.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's post-peak waterfall accelerating (bearish, dominant); JPY's continuing decline persisting (inverted bullish, opposing but weaker). NZD's higher conviction edges the net lower." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's broad decline deepening; JPY's weakness persisting from its own collapse (inverted bullish, still the weaker conflicting signal). NZD's edge continues to carry." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD's decline continuing toward its own November base; JPY also continuing its own decline (inverted bullish, narrowing the gap slightly). NZD's marginal edge persists." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD beginning to slow its decline ahead of its own November base; JPY's weakness persisting toward its own November lows (inverted bullish, still mirrored). NZD's edge carries into November's contested stretch." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED — RESOLVING TO ALIGNMENT", stars: 3,
    note: "NZD's own late-month reversal collides early with JPY's continuing decline — \"continued weakness, late-Nov begins to base, Wk4 turn up — enter long for the December rally\" (3★, early bearish then turning bullish) confronts JPY's own \"broad recovery building, all TFs higher off the autumn lows\" (4★ on its own chart — INVERTED, bearish for NZDJPY). Early-month conflict gradually resolves toward alignment as NZD turns bullish late, aligning with JPY's continuing inverted-bullish decline from its own recovery peak.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT LEAN ★★★☆☆", note:"NZD's continued weakness persisting (bearish, direct); JPY's broad recovery rally building from its autumn lows (inverted bearish for NZDJPY, aligning). Both signals point lower together — a narrow early alignment short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"NZD's weakness persisting toward its late-month base; JPY's recovery rally continuing to build (inverted bearish, confirming alignment). Hold short on the confirmed double alignment." },
      { wk:"Wk 3", s5:"bull", s15:"bear", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"NZD beginning to base — \"late Nov begins to base\" (turning toward bullish, direct); JPY's recovery rally persisting near its own highs (inverted bearish, now opposing NZD's emerging turn). Fresh conflict emerges as NZD reverses." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT — DUAL TURN ★★★★☆", note:"NZD's \"Wk4 turn up — enter long for the December rally\" confirms (now bullish, direct); JPY's recovery beginning to slow near its own peak ahead of its own December decline (inverted, narrowing). NZD's emerging turn begins to edge the net higher heading into December's stand-off." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "chop", sigLt: "chop",
    combined: "bull", combinedLabel: "MAXIMUM CONFLICT — YEAR-END STAND-OFF", stars: 4,
    note: "NZD's STRONGEST MONTH OF ITS ENTIRE YEAR — \"surges toward ~95-100, all TFs aligned, the single highest-conviction long of NZD's whole year, hold longs through month end\" (5★, bullish) — collides directly with JPY's own year-end RECOVERY — \"broad recovery building into year end, all TFs higher off the November lows\" (4★ on its own chart — INVERTED, bearish for NZDJPY). Both currencies post strong year-end moves in directly opposing directions for the pair — NZD's higher conviction (5★ vs 4★) ultimately carries the genuine stand-off.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"MAXIMUM CONFLICT — LEAN LONG ★★★★☆", note:"NZD's historic rally beginning to surge with maximum conviction (bullish, 5★, dominant); JPY's own recovery also continuing to build (inverted bearish, 4★, directly opposing but lower conviction). NZD's higher conviction edges the lean long despite genuine two-sided risk." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"NZD's surge accelerating toward its absolute annual peak (bullish, dominant); JPY's recovery persisting near its own highs (inverted bearish, still opposing but weaker). NZD's defining annual move begins to overwhelm JPY's recovery." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"NZD's historic rally continuing across all TFs with maximum conviction; JPY's recovery beginning to slow near its own year-end peak (inverted bearish, weakening further). NZD's higher-conviction defining move carries the net higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG — YEAR-END STAND-OFF RESOLVES ★★★★★", note:"NZD's surge persisting through month end — \"hold longs through month end\" on its own chart (bullish, maximum conviction, 5★); JPY's recovery fading into year end (inverted bearish, now the clearly weaker signal, 4★). The year-end stand-off resolves decisively toward NZD's defining annual strength to close the calendar." },
    ]
  },
];

const SEASONAL_DATA = `
NZDJPY — FOREX SEASONAL ANALYSIS
Derived from: New Zealand Dollar CME Futures (23-YR seasonal) + Japanese Yen CME Futures (40-YR seasonal)
Methodology: NZD seasonal tendency combined with the inverse of JPY seasonal tendency (NZD is the base currency — direct; JPY is the quote currency — inverted, since JPY strength means fewer JPY per unit of NZD).

=== NZD COMPONENT (bullish NZD = NZDJPY rising) ===
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

=== JPY COMPONENT (bullish JPY = NZDJPY falling, since JPY is inverted) ===
Jan: JPY bear — \"drifting lower off the December highs, low conviction\" (3★; inverted: bullish for NZDJPY).
Feb: JPY chop — \"choppiest, most directionless stretch of the year, basing near its lows, the primary trough\" (2★; inverted: weak bullish lean for NZDJPY).
Mar: JPY's STRONGEST Q1 WINDOW — \"powerful rally off the February trough, the strongest Q1 window of JPY's entire year\" (5★; inverted: powerfully bearish for NZDJPY).
Apr: JPY's FIRST FLIP — \"peak then sell, reversing from its Q1 highs\" (3★; inverted: bearish at the JPY peak, then bullish for NZDJPY as JPY declines).
May: JPY bear — \"broad weakness persisting following its April flip, all TFs lower\" (3★; inverted: bullish for NZDJPY).
Jun: JPY chop — \"basing near its own May lows, no clean direction, the year's quietest stretch\" (2★; inverted: negligible).
Jul: JPY's STRONGEST MONTH OF ITS ENTIRE YEAR — \"powerful rally to its annual highs, all TFs aligned, the single highest-conviction long of JPY's whole year\" (5★; inverted: powerfully bearish for NZDJPY).
Aug: JPY's SECOND FLIP — \"peak then short, the highest-conviction short entry of JPY's entire year\" (4★; inverted: bearish at the JPY peak, then bullish for NZDJPY as JPY declines).
Sep: JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"collapses from its August peak, all TFs align bearish, the single highest-conviction short of JPY's whole year\" (5★; inverted: powerfully bullish for NZDJPY).
Oct: JPY bear — \"broad weakness persisting following its September collapse, all TFs lower\" (3★; inverted: bullish for NZDJPY).
Nov: JPY bull — \"broad recovery building, all TFs higher off the autumn lows\" (4★; inverted: bearish for NZDJPY).
Dec: JPY bull — \"recovery continuing into year end, broad strength off the November lows\" (4★; inverted: bearish for NZDJPY).

=== COMBINED NET EFFECT ===
Jan-Feb: NZD's own structural opening collapse and continuing decline dominate by default over JPY's own low-conviction early-year drift and primary trough (inverted, weak conflicting signal) — NZD's structural edge carries two months outright.
Mar: JPY's STRONGEST Q1 WINDOW (inverted, powerfully bearish for NZDJPY) overwhelms NZD's own low-conviction recovery transition outright — JPY's defining inverted strength dominates comfortably.
Apr: An early contested open resolves into clean double alignment bullish — NZD's own strong rally collides with JPY's first historic flip (inverted, turning bullish for NZDJPY as JPY declines from its Q1 peak) — both signals confirm bullish as the month progresses.
May: TWO-SIDED CONTEST — NZD's most critical flip month of its entire year (the single highest-conviction short of NZD's whole year) confronts JPY's own continuing decline (inverted, bullish for NZDJPY) — an early alignment near NZD's defining peak gives way to genuine conflict that ultimately resolves toward NZD's overwhelming annual-defining conviction.
Jun: NZD's own deep structural trough (the year's deepest, 5★) dominates outright over JPY's own choppy, directionless, low-conviction transition (inverted, negligible) — NZD's structural dominance carries comfortably.
Jul: JPY's STRONGEST MONTH OF ITS ENTIRE YEAR (inverted, powerfully bearish for NZDJPY) overwhelms NZD's own choppy, mixed, low-conviction bounce outright — JPY's defining annual strength dominates comfortably.
Aug: An early contested open resolves into clean double alignment bullish — NZD's own continuing recovery collides with JPY's second historic flip (inverted, turning bullish for NZDJPY as JPY declines from its own annual peak) — both signals confirm bullish as JPY's decline takes hold.
Sep: THE DEFINING COLLISION — NZD's own secondary flip (turning short mid-month) collides head-on with JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR (inverted, powerfully bullish for NZDJPY) — an early double-alignment bullish open gives way to maximum conflict, ultimately resolving toward JPY's overwhelming defining-annual inverted strength.
Oct: NZD's own sharp post-peak waterfall narrowly outduels JPY's own continuing decline from its historic September collapse (inverted, bullish for NZDJPY, the conflicting but weaker signal) — NZD's higher conviction edges a moderately contested month toward short.
Nov: An early double-alignment short (NZD's continued weakness + JPY's broad recovery, inverted bearish for NZDJPY) gradually gives way to fresh conflict as NZD's late-month reversal collides with JPY's continuing recovery near its own peak — genuinely two-sided heading into December.
Dec: THE YEAR-END STAND-OFF — both currencies post strong year-end moves in directly opposing directions for the pair: NZD's single highest-conviction long of its ENTIRE year (5★) collides with JPY's own year-end recovery (4★ on its own chart — INVERTED, bearish for NZDJPY) — NZD's higher conviction ultimately resolves the stand-off decisively to close the calendar on a defining bullish note.

=== PLAYBOOK SIGNALS ===
NZDJPY HIGHEST CONVICTION LONG: April and August — both months feature contested opens that resolve cleanly into confirmed double-alignment bullish setups as JPY declines from its own historic flip points, offering the calendar's cleanest multi-week alignment windows (4★ each).
NZDJPY HIGHEST CONVICTION SHORT: March and July — JPY's own strongest windows of its entire year (5★ each, inverted) overwhelm NZD's lower-conviction setups outright, producing the calendar's cleanest dominant-component shorts.
NZDJPY MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (NZD's defining annual flip vs JPY's continuing decline — two-sided into a high-conviction resolution), September (THE DEFINING COLLISION — NZD's secondary flip vs JPY's single highest-conviction short of its entire year), and December (THE YEAR-END STAND-OFF — both currencies post strong, high-conviction year-end moves, 5★ vs 4★, in directly opposing directions for the pair).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for NZDJPY explaining how the NZD and JPY seasonal forces interact month by month, with special attention to April and August's resolving double-alignment windows, May's two-sided contest around NZD's defining annual flip, September's defining collision (NZD's secondary flip vs JPY's single highest-conviction short of its entire year), and December's year-end stand-off between both currencies' strong but opposing seasonal moves.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (NZD or JPY) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction NZDJPY trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially September's defining collision, where NZD's own secondary flip collides with JPY's single highest-conviction short of its entire year, and December's year-end stand-off, where both currencies post strong year-end moves (5★ vs 4★) in directly opposing directions for the pair.
`;
