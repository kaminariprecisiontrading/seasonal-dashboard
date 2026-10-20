/**
 * data/fx-cadchf.js — CADCHF Forex Seasonal
 * Derived from: CAD/USD CME futures + CHF/USD CME futures (inverted)
 * Methodology: CAD seasonal tendency vs inverted CHF seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-cadchf",
  name:     "CAD / CHF",
  sub:      "Forex Seasonal · Derived from CAD CME + CHF CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · CAD/USD CME (40-YR) · CHF/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "CAD's structural January decline — \"5-YR spikes to ~95 at the open then collapses, fade the spike\" (4★) — outweighs CHF's own opening-month decline (3★ on its own chart — INVERTED, mildly bullish for CADCHF, the conflicting but lower-conviction signal). CAD's higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's open-spike fading hard (bearish, dominant); CHF also declining (inverted bullish, conflicting but weaker). CAD's edge prevails." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's decline continuing; CHF's own weakness persisting (inverted bullish, minor opposition). Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD still pressured; CHF approaching its own trough zone (inverted, narrowing). CAD's structural decline still carries." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD basing into February; CHF nearing its base (inverted, neutral). CAD's edge holds by elimination." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "CONTESTED / MAXIMUM CONFLICT", stars: 2,
    note: "Both currencies post equally high-conviction declines on their own charts — CAD's continuing bear month (4★) directly opposes CHF's own deep seasonal weakness approaching its annual trough (4★ on its own chart — INVERTED, bullish for CADCHF). Two equally-weighted moves collide head-on — a genuine coin-flip with no clean dominant component.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★☆☆☆", note:"CAD declining (bearish); CHF also declining toward its trough (inverted bullish). Equal-conviction collision — no clean edge." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★☆☆☆", note:"Both currencies' declines deepening in directly opposing chart-directions for the pair. Avoid forcing direction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★☆☆☆", note:"CAD approaching its own base; CHF nearing its annual trough (inverted bullish, building). The stand-off persists." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"CHF's trough imminent (inverted, about to flip); CAD also basing. Stand by for March's transition." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "chop", combinedLabel: "CONTESTED / MIXED", stars: 2,
    note: "CAD's own choppy, diverging recovery from its February lows (2★, \"TFs diverging, no clean bias\") provides little resistance to CHF's ANNUAL TROUGH FLIP — \"hits absolute low mid-March then reverses sharply, strong flip long from Wk2-3\" (4★ on its own chart — INVERTED: bearish for CADCHF as CHF rallies off its trough). CHF's higher-conviction, cleaner reversal dominates by month's end.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"CAD directionless; CHF still weak pre-trough (inverted bullish, fading). Low-conviction stretch." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"FLIP / WATCH ★★☆☆☆", note:"CHF's historic trough confirms — flipping to long on its own chart (inverted: now bearish for CADCHF). CAD still mixed. CHF's reversal beginning to dominate." },
      { wk:"Wk 3", s5:"bear", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF's recovery accelerating (inverted bearish, cleaner signal); CAD's own diverging signals offer no resistance. CHF's edge carries." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF's rally off its trough persisting (inverted bearish); CAD remains directionless. CHF dominates into April." },
    ]
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "CAD's strong bull window — \"5-YR spikes hard to ~85-90 mid-month, strong long Wk1-2\" (4★) — edges out CHF's own steady but lower-conviction recovery from its March trough (3★ on its own chart — INVERTED, bearish for CADCHF, the conflicting but weaker signal). CAD's sharper, higher-conviction spike dominates.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's 5-yr spiking hard (bullish, dominant); CHF's recovery continuing (inverted bearish, conflicting but weaker). CAD's sharper move prevails." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's spike at its peak; CHF still rising steadily (inverted bearish, minor opposition). CAD remains in control." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CAD's spike fading slightly; CHF's bull bias persisting (inverted bearish, narrowing). CAD's structural edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CAD building toward its May peak; CHF continuing its recovery (inverted bearish, building toward May's critical flip). Hold into May's contested transition." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 3,
    note: "Early-month double alignment — CAD's 40-yr peaking then rolling over (bearish, 4★) aligns with CHF's own approach to its absolute peak (still bullish pre-flip, inverted bearish) — gives way to sharp late-month conflict as CHF's CRITICAL FLIP fires: \"5-YR spikes to ~100 mid-May then violently reverses short\" (5★ on its own chart — INVERTED, this becomes bullish for CADCHF as CHF collapses). The month flips character entirely at its midpoint.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"CAD's 40-yr rolling over (bearish); CHF still climbing toward its spike (inverted bearish). Both align — short with conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"CAD's decline confirming; CHF approaching its absolute peak ~100 (inverted bearish, still aligned). Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"DUAL FLIP / CONFLICT ★★★☆☆", note:"CHF's historic flip fires — 5-yr peaks at 100 then violently reverses short (inverted: now bullish for CADCHF). CAD's decline continuing (still bearish). Direct conflict emerges — trim shorts." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"CHF's post-peak waterfall accelerating (inverted bullish, high conviction); CAD's decline persisting (bearish, still opposing). Two-sided — avoid forcing size into June." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "CAD's continuing decline into its deep seasonal trough zone (4★, \"near lows\") collides directly with CHF's own post-peak waterfall — \"all TFs depressed, hold shorts from the May flip\" (4★ on its own chart — INVERTED, bullish for CADCHF). Two equally-weighted high-conviction moves in directly opposing directions — a genuine coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"CAD declining toward its trough (bearish); CHF's waterfall continuing (inverted bullish). Two high-conviction moves directly opposing — avoid forcing direction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"CAD near its lows; CHF still falling hard (inverted bullish). The stand-off persists at full intensity." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"CAD basing near its trough; CHF's decline beginning to ease (inverted bullish, narrowing). Genuinely two-sided." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bull", com:"LONG LEAN / WATCH ★★☆☆☆", note:"CAD preparing for its July recovery (early bullish signs); CHF approaching its own trough zone (inverted, narrowing further). Conflict beginning to resolve toward alignment." },
    ]
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "DOUBLE ALIGNMENT — CAD's powerful seasonal recovery (5★, \"high conviction long, the strongest signal of its year\") reinforces CHF's own deep trough-zone weakness (3★ on its own chart, \"all TFs near multi-month lows\" — INVERTED, bullish for CADCHF). Both components confirm in the same direction — the cleanest long window of the CADCHF calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"CAD's powerful recovery launching (bullish, 5★, dominant); CHF still near its lows (inverted bullish). Full alignment — enter long with conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"CAD's rally accelerating; CHF basing at its trough (inverted bullish). Both reinforcing — press the trade." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"CAD's recovery in full swing; CHF beginning to stir off its base (inverted bullish, still aligned). Hold." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD building toward its August peak; CHF's recovery just beginning (inverted, early conflict signs forming). CAD's dominant trend still carries into August." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "CAD's continuing strength near its annual peak (4★, \"5-YR at or near peak ~90-95\") edges out CHF's own early-stage recovery (3★ on its own chart — INVERTED, bearish for CADCHF, the conflicting but lower-conviction signal). CAD's higher conviction dominates.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD near its peak (bullish, dominant); CHF's recovery building (inverted bearish, conflicting but weaker). CAD's edge prevails." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's strength persisting; CHF's rally continuing (inverted bearish, minor opposition). Hold long." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CAD beginning to flatten near its highs; CHF's recovery firming toward its own September spike (inverted bearish, narrowing). CAD's structural strength still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN / WATCH ★★★☆☆", note:"CAD approaching its critical September flip; CHF building toward its own September peak (inverted bearish, building toward conflict). Stand by for the year's defining collision." },
    ]
  },
  {
    month: "September", sig5: "flip", sig15: "flip", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING COLLISION", stars: 3,
    note: "THE DEFINING COLLISION OF THE CADCHF CALENDAR — both currencies stage the single HIGHEST CONVICTION REVERSAL of their respective years in the SAME month. CAD's \"40-yr and 15-yr hit absolute annual peak ~100 mid-month then collapse\" (5★) collides directly with CHF's own \"15-yr spikes to absolute peak ~100 then flips short\" (5★ on its own chart — INVERTED, this becomes bullish for CADCHF as CHF reverses). A genuine, maximum-conviction coin-flip month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"CAD surging toward its annual peak (bullish, 5★); CHF also surging toward its own peak (inverted bearish — wait, both at highs pre-flip create early alignment toward CAD strength). Early-month long bias with high conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"PEAK / WATCH ★★★★★", note:"CAD at its absolute annual peak ~100; CHF also at its own peak ~100 (both about to reverse). Maximum tension — both currencies' defining flip points converge in the same week." },
      { wk:"Wk 3", s5:"flip", s15:"flip", sLt:"chop", com:"DUAL FLIP / MAXIMUM CONFLICT ★★★☆☆", note:"CAD's historic collapse begins (flipping bearish, its highest-conviction reversal of the year); CHF's own flip to short fires simultaneously (inverted: now bullish for CADCHF). Two defining reversals in directly opposing directions — the year's genuine coin-flip." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"CAD's post-peak waterfall accelerating (bearish); CHF's own decline also accelerating (inverted bullish). Both in freefall in opposite chart-directions — genuinely two-sided into October." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "CAD's sharp post-peak decline — \"drops from 100 toward ~75\" (4★) — collides directly with CHF's own continuing post-peak collapse (4★ on its own chart — INVERTED, bullish for CADCHF). Both currencies' September reversals are still unwinding in directly opposing directions for the pair.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"CAD's post-peak waterfall continuing (bearish); CHF's own decline persisting (inverted bullish). Two unwinding reversals directly opposing — avoid forcing direction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"CAD declining further toward ~75; CHF also still falling (inverted bullish). The stand-off from September persists at high intensity." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"CAD showing signs of stabilisation mid-month; CHF's decline beginning to stabilise too (inverted, narrowing). Genuinely two-sided." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★☆☆☆", note:"CAD resuming its decline toward November lows; CHF approaching its own November flip zone (inverted, narrowing further). The conflict eases only slightly heading into November." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED / TWO-SIDED", stars: 2,
    note: "Early-month alignment — CAD's continuing but easing decline (3★, \"severity easing late month\") matches CHF's own pre-flip weakness (inverted bullish) — gives way to late-month conflict as CHF stages its FLIP MONTH: \"40-yr begins its massive year-end rally, bear early → flip long late\" (4★ on its own chart — INVERTED, this becomes bearish for CADCHF as CHF turns up). The month transitions from alignment to opposition at its midpoint.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"DOUBLE ALIGNMENT / SHORT ★★★☆☆", note:"CAD still declining (bearish); CHF also still weak pre-flip (inverted bullish). Early alignment — short with moderate conviction." },
      { wk:"Wk 2", s5:"bear", s15:"chop", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"CAD's decline easing slightly; CHF beginning to show early signs of its turn (inverted, narrowing). The early alignment starts to fray." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"FLIP / CONFLICT ★★☆☆☆", note:"CHF's historic year-end flip confirms — turning to long on its own chart (inverted: now bearish for CADCHF). CAD's decline still easing. Direct conflict emerges." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"CONTESTED ★★☆☆☆", note:"CHF's year-end rally accelerating (inverted bearish, building conviction); CAD basing near its own lows. CHF's emerging strength begins to dominate heading into December." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "CHF's HIGHEST CONVICTION LONG OF ITS ENTIRE YEAR — \"40-yr rockets to its absolute annual peak ~100 at Dec 31, year-end CHF surge, hold into year close\" (5★ on its own chart — INVERTED, powerfully bearish for CADCHF) — completely overwhelms CAD's own directionless, low-conviction year-end base-building phase (2★, \"all TFs converge near 0-25, annual low zone\"). CHF's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"CHF's year-end surge fully underway (inverted bearish, dominant, 5★); CAD basing in its annual low zone, no opposition. CHF in full control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★★", note:"CHF's 40-yr climbing toward 100 (inverted bearish, maximum conviction); CAD still directionless. Hold short with high conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★★", note:"CHF's momentum unrelenting, approaching its annual peak (inverted bearish); CAD remains in its low-conviction base. CHF's structural dominance continues." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★★", note:"CHF peaks at ~100 on Dec 31 — its single highest-conviction trade of the year (inverted bearish, maximum tailwind); CAD's very-late-month recovery just beginning, too small to offset. Hold short into year close." },
    ]
  },
];

const SEASONAL_DATA = `
CADCHF — FOREX SEASONAL ANALYSIS
Derived from: CAD/USD CME Futures (40-YR seasonal) + CHF/USD CME Futures (40-YR seasonal)
Methodology: CAD seasonal tendency combined with the inverse of CHF seasonal tendency (CAD is the base currency — direct; CHF is the quote currency — inverted, since CHF strength means fewer CHF per unit of CAD).

=== CAD COMPONENT (bullish CAD = CADCHF rising) ===
Jan: CAD bear — \"5-YR spikes to ~95 at the Jan 1 open then collapses, fade the open spike\" (4★).
Feb: CAD bear — continuing decline (4★).
Mar: CAD chop/flip — \"40-YR begins recovery from Feb lows, TFs diverging, no clean bias\" (2★).
Apr: CAD bull — \"5-YR spikes hard to ~85-90 mid-month, strong bull window Wk1-2\" (4★).
May: CAD bear — \"40-YR peaks first half of May then rolls over\" (4★).
Jun: CAD bear — \"near lows, deep seasonal trough zone\" (4★).
Jul: CAD's HIGHEST CONVICTION LONG — \"powerful recovery, high conviction long\" (5★).
Aug: CAD bull — \"5-YR at or near peak ~90-95\" (4★).
Sep: CAD's FLIP MONTH — \"HIGHEST CONVICTION REVERSAL OF THE YEAR — 40-yr and 15-yr hit absolute annual peak ~100 mid-month then collapse\" (5★).
Oct: CAD bear — \"sharp post-Sep decline, drops from 100 toward ~75\" (4★).
Nov: CAD bear — \"severity easing late November\" (3★).
Dec: CAD chop/base — \"all TFs converge near 0-25, annual low zone, year-end recovery begins very late\" (2★).

=== CHF COMPONENT (bullish CHF = CADCHF falling, since CHF is inverted) ===
Jan: CHF bear — \"all TFs declining from the open, structural bear month\" (3★; inverted: bullish for CADCHF).
Feb: CHF bear — \"deep seasonal weakness, 40-yr drops toward 20-25\" (4★; inverted: bullish for CADCHF).
Mar: CHF's ANNUAL TROUGH FLIP — \"40-yr hits absolute low ~5-10 mid-month then reverses sharply, strong flip long Wk2-3\" (4★; inverted: bullish early as CHF weakens, then bearish for CADCHF as CHF rallies off its trough).
Apr: CHF bull — \"recovery continues from the March trough\" (3★; inverted: bearish for CADCHF).
May: CHF's CRITICAL FLIP — \"5-YR spikes to absolute peak ~100 mid-month then violently reverses short, the year's highest-conviction reversal\" (5★; inverted: bearish for CADCHF as CHF climbs, then powerfully bullish as CHF collapses).
Jun: CHF bear — \"post-May waterfall continues, all TFs depressed\" (4★; inverted: bullish for CADCHF).
Jul: CHF bear — \"all TFs near multi-month lows, deep trough zone\" (3★; inverted: bullish for CADCHF).
Aug: CHF bull — \"recovery begins, conviction building toward September\" (3★; inverted: bearish for CADCHF).
Sep: CHF's SECOND CRITICAL FLIP — \"15-yr spikes to absolute peak ~100 mid-month then flips short, strong long early then highest-conviction short\" (5★; inverted: bearish for CADCHF as CHF climbs, then powerfully bullish as CHF reverses).
Oct: CHF bear — \"post-Sep peak decline continues\" (4★; inverted: bullish for CADCHF).
Nov: CHF's YEAR-END FLIP — \"40-yr begins its massive year-end rally, bear early month then flip long late as the rally launches\" (4★; inverted: bullish for CADCHF early, then bearish as CHF's rally takes hold).
Dec: CHF's HIGHEST CONVICTION LONG OF ITS ENTIRE YEAR — \"40-yr rockets to its absolute annual peak ~100 at Dec 31, year-end CHF surge, hold into year close\" (5★; inverted: powerfully bearish for CADCHF — CHF's single best trade of the year, working directly against the pair).

=== COMBINED NET EFFECT ===
Jan: CAD's structural opening decline outweighs CHF's own lower-conviction weakness (inverted bullish, conflicting but weaker) — CAD's higher conviction carries the month.
Feb: MAXIMUM CONFLICT — both currencies post equally high-conviction declines on their own charts (CHF's, inverted, bullish for CADCHF) — a genuine coin-flip with no clean dominant component.
Mar: CAD's own choppy, diverging recovery offers little resistance to CHF's annual trough flip (inverted bearish as CHF rallies) — CHF's cleaner, higher-conviction reversal dominates by month's end.
Apr: CAD's sharp bull spike edges out CHF's own steady but lower-conviction recovery (inverted bearish, conflicting but weaker) — CAD's sharper move dominates.
May: Early-month double alignment (both bearish for the pair) gives way to sharp late-month conflict as CHF's critical flip (inverted bullish) directly opposes — the month flips character entirely at its midpoint.
Jun: MAXIMUM CONFLICT — CAD's continuing decline into its trough zone collides directly with CHF's own post-peak waterfall (inverted bullish) — two equally-weighted high-conviction moves in direct opposition.
Jul: DOUBLE ALIGNMENT — CAD's powerful seasonal recovery (its highest-conviction trade of the year) reinforces CHF's own deep trough-zone weakness (inverted bullish). The cleanest long window of the CADCHF calendar.
Aug: CAD's continuing strength near its annual peak edges out CHF's own early-stage recovery (inverted bearish, conflicting but weaker) — CAD's higher conviction dominates.
Sep: THE DEFINING COLLISION — both currencies stage the single highest-conviction reversal of their respective years in the SAME month, in directly opposing chart-directions. A genuine, maximum-conviction coin-flip.
Oct: MAXIMUM CONFLICT — both currencies' September reversals are still unwinding in directly opposing directions for the pair — neither dominates cleanly.
Nov: Early-month alignment (both weak/bearish for the pair) gives way to late-month conflict as CHF stages its year-end flip (inverted bearish as CHF turns up) — transitioning from alignment to opposition at its midpoint.
Dec: CHF's highest conviction long of its entire year completely overwhelms CAD's own directionless, low-conviction year-end base-building phase — CHF's vastly higher conviction dominates outright.

=== PLAYBOOK SIGNALS ===
CADCHF HIGHEST CONVICTION LONG: July (double alignment — CAD's strongest trade of its year + CHF's own deep trough-zone weakness, inverted bullish, both confirm, 5★).
CADCHF HIGHEST CONVICTION SHORT: December (CHF's single highest-conviction trade of its entire year, inverted bearish, completely overwhelms CAD's directionless year-end base, 5★ by Wk2-4).
CADCHF MOST CONTESTED / REQUIRES CAREFUL FRAMING: September (THE DEFINING COLLISION — both currencies' single highest-conviction reversals of their respective years collide head-on in the same month), February and June (MAXIMUM CONFLICT — equally-weighted high-conviction moves in direct opposition), and October (the September stand-off's unresolved aftermath, still genuinely two-sided).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for CADCHF explaining how the CAD and CHF seasonal forces interact month by month, with special attention to September's defining collision and December's CHF-dominated close.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (CAD or CHF) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction CADCHF trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially September, where both currencies post the single highest-conviction reversal of their respective years in the same month.
`;
