/**
 * data/fx-nzdusd.js — NZDUSD Forex Seasonal
 * Derived from: NZD/USD CME futures + USD Index/ICE futures
 * Methodology: NZD seasonal tendency vs inverted USD Index seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-nzdusd",
  name:     "NZD / USD",
  sub:      "Forex Seasonal · Derived from NZD CME + USD Index/ICE Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · NZD/USD CME (23-YR) · USD Index/ICE (35-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "DOUBLE ALIGNMENT / SHORT", stars: 4,
    note: "DOUBLE ALIGNMENT — NZD's structural opening decline (4★, 5-yr spikes at the open then collapses) reinforces the US Dollar Index's own confirmed bullish launch (4★ on its own chart — INVERTED, also bearish for NZDUSD). Both components confirm the same direction at solid conviction.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"NZD's 5-yr spikes at the Jan 1 open then immediately collapses (bearish). USD Index already climbing (inverted bearish). Sell the open spike — both align." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"NZD declining broadly across all TFs; USD Index's bull launch confirming (inverted bearish). Full alignment — press shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"Both components continue lower (NZD) / higher (USD, inverted bearish) in tandem. Hold." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"NZD approaching its Feb lows; USD Index still climbing (inverted bearish). Both reinforcing into February." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "DOUBLE ALIGNMENT / SHORT", stars: 4,
    note: "DOUBLE ALIGNMENT continues — NZD grinding lower toward its ~35–40 trough zone (4★) while the USD Index extends its bullish run toward its late-February peak (3★ on its own chart — INVERTED, also bearish for NZDUSD). Both components confirm.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD continuing its January decline; USD Index's rally persisting (inverted bearish). Both align — hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"NZD forming mid-Feb lows; USD Index nearing its own late-Feb peak (inverted bearish). Full alignment at solid conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"NZD approaching its Feb–Mar trough; USD Index still elevated near its peak (inverted bearish). Maintain shorts." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT / WATCH ★★☆☆☆", note:"NZD beginning to base and stabilise; USD Index also starting to roll over from its peak (inverted, narrowing). Both losing momentum — prepare for March's choppy transition." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "CHOP / TRANSITION", stars: 2,
    note: "Both components enter their own transition phases simultaneously — NZD carves its annual trough then sharply reverses higher (2★, diverging timeframes), while the USD Index also enters a choppy, mixed patch (2★ on its own chart — INVERTED, similarly directionless). Two low-conviction transitions overlapping produce the year's least decisive month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"CHOP ★★☆☆☆", note:"NZD still weak, carving its absolute trough; USD Index drifting without clear direction (inverted, neutral). No edge — wait." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"CHOP ★★☆☆☆", note:"NZD's 23-yr leading the recovery off its trough (early bullish signs); USD Index also choppy/mixed (inverted, no opposition yet). Mixed, low conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / EARLY ★★★☆☆", note:"NZD's recovery firming across TFs (bullish); USD Index remains directionless (inverted, not opposing). Early long bias building." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / BUILDING ★★★☆☆", note:"NZD's rally gaining conviction into April; USD Index still without a clear trend. NZD's cleaner signal begins to dominate." },
    ]
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG LEAN / TWO-SIDED", stars: 3,
    note: "NZD's strong, broad bull run (4★, all TFs rallying into its mid-April peak) opens in alignment with the US Dollar Index's own SELL-then-FLIP playbook month (4★ on its own chart — sell Wk1/2 then flip long late, INVERTED: bullish for NZDUSD early, then bearish as USD flips long late month). A two-sided month that opens cleanly long and grows contested into May.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD rallying with strong confluence (bullish); USD Index opens its SELL playbook (inverted bullish, aligned). Both reinforcing — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"NZD's 5-yr nearing its peak (high conviction bullish); USD Index continuing its sell phase (inverted bullish). Full alignment — hold longs into mid-month." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"chop", com:"LONG / WATCH ★★★☆☆", note:"NZD's 5-yr rolling over from its peak — begin taking profits; USD Index nearing its FLIP point (inverted, about to turn bearish). Early conflict emerging — trim exposure." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"bear", com:"TWO-SIDED / EXIT ★★☆☆☆", note:"NZD fading from its peak (mixed signals); USD Index's FLIP LONG confirming (inverted bearish, now opposing). Direct conflict emerging — exit longs ahead of May's critical collision." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "THE DEFINING COLLISION — NZD's MOST CRITICAL FLIP MONTH, its single highest-conviction trade of its own entire year (5★, all TFs align bearish, \"highest conviction short of the year\") collides head-on with the US Dollar Index's own deepest trough of the year (4★ on its own chart — \"35-yr and 15-yr hit deepest trough\" — INVERTED, powerfully bullish for NZDUSD). Both currencies post their defining moves of the year in directly opposing directions — a genuine coin-flip month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"NZD's 23-yr peaking just before its critical flip (still elevated); USD Index already near its deepest trough (inverted bullish, high conviction). Early divergence — extreme caution." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★☆☆", note:"NZD's historic flip confirms — all TFs turn south with full conviction (bearish, 5★) directly opposing the USD Index's continuing trough formation (inverted bullish, 4★). Two of the year's defining moves colliding head-on." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★☆☆", note:"NZD's full waterfall confirmed (highest conviction short of its year) against USD Index's deepening trough (inverted bullish). Both at near-maximum conviction — avoid forcing direction, expect violent two-way price action." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"NZD continuing its waterfall into the June trough; USD Index beginning its recovery off its own low (inverted, narrowing the conflict). The stand-off begins to resolve toward NZD's dominance as June approaches." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "DOUBLE ALIGNMENT / SHORT", stars: 5,
    note: "DOUBLE ALIGNMENT AT HIGH CONVICTION — NZD remains deep in its post-flip waterfall, near the absolute trough of its entire year (5★, \"deepest trough zone\"), while the US Dollar Index stages its sharp mid-year recovery bounce (3★ on its own chart — INVERTED, also bearish for NZDUSD). Both components confirm in the same direction — one of the cleanest, highest-conviction short windows of the NZDUSD year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"NZD continuing its May waterfall, near absolute lows (bearish, 5★); USD Index's recovery bounce confirming (inverted bearish). Full alignment, maximum conviction — press shorts hard." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"NZD at its broad lows across all TFs; USD Index's bounce continuing to build (inverted bearish). Both reinforcing — hold." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT / COVER ★★★☆☆", note:"NZD's 5-yr beginning to base — start partial cover; USD Index nearing its own mid-year peak (inverted, beginning to ease). Conviction starting to fade — trim into month end." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD basing at its trough; USD Index rolling over from its bounce peak (inverted, losing its edge). Both directionless — cover remaining shorts, await July's transitional signal." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "NZD's meaningful but uneven bounce off its June trough (3★, \"15-yr and 23-yr bounce, 5-yr more muted\") meets the USD Index's own mid-year peak-then-rollover (2★ on its own chart — \"mid-year peak hits early Jul then rolls over\" — INVERTED, mildly bullish for NZDUSD). Both transitional and low-conviction — a genuinely mixed month best traded small.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bull", com:"MIXED / LONG LEAN ★★★☆☆", note:"NZD's 15-yr and 23-yr lifting from the trough (bullish); USD Index nearing its own brief peak (inverted, about to turn). Cautious long entry — both modestly aligned." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD's best week of July — all 3 TFs lift (bullish, highest conviction of the month); USD Index rolling over from its peak (inverted bullish). Both align — the strongest signal of an otherwise choppy month." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD's bounce fading; USD Index's decline stalling (inverted, losing edge). Both directionless — exit, stand aside." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"NZD's 5-yr rolls over; USD Index beginning its secondary bear leg (inverted, early bullish signs for NZDUSD). Remain flat — August will clarify." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 5,
    note: "DOUBLE ALIGNMENT — NZD's confirmed, broad recovery building toward its September peak (4★, \"all TFs aligned up\") reinforces the US Dollar Index's own clean secondary bear leg (4★ on its own chart — INVERTED, also bullish for NZDUSD). Both components confirm at high conviction — one of the cleanest long windows of the NZDUSD year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"NZD's recovery confirmed across all TFs (bullish); USD Index's secondary decline confirming (inverted bullish). Full alignment — enter long with conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"NZD's sustained recovery continuing; USD Index's bear leg deepening (inverted bullish). Both reinforcing — press longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD building toward its September peak; USD Index continuing its decline (inverted bullish). Hold — no exit signal yet from either component." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD approaching its secondary peak; USD Index still declining (inverted bullish). Both aligned into September — hold, but prepare for NZD's looming flip." },
    ]
  },
  {
    month: "September", sig5: "flip", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "CONTESTED / FLIP", stars: 3,
    note: "NZD's own FLIP MONTH — its secondary peak forms early (5-yr peaking first as an early warning) before all TFs roll over and flip short by mid-month (4★, bullish-then-bearish for NZDUSD) — collides with the US Dollar Index's continuing decline toward its own trough (3★ on its own chart — INVERTED, bullish for NZDUSD throughout). Early-month double alignment gives way to direct conflict as NZD reverses.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"NZD still rising toward its peak (bullish); USD Index continuing its decline (inverted bullish). Both aligned — hold longs into the early-month peak." },
      { wk:"Wk 2", s5:"chop", s15:"bull", sLt:"bull", com:"LONG → FLIP WATCH ★★★☆☆", note:"NZD's 5-yr peaking first — early flip warning; USD Index still declining (inverted bullish, briefly aligned). Begin taking profits — NZD's reversal is approaching." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"NZD's flip confirms — all TFs roll over to bearish — directly opposing USD Index's continuing decline (inverted bullish). Direct conflict emerges; reduce size." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"CONTESTED ★★☆☆☆", note:"NZD's flip-short confirmed and accelerating (bearish); USD Index nearing its own trough before its major October reversal (inverted, still bullish for now). Two-sided — the conflict carries into October." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's post-September-peak waterfall (4★, \"full decline, hold shorts\") opens against the US Dollar Index's own MAJOR REVERSAL month — USD hits its secondary trough then reverses hard late month (4★ on its own chart — INVERTED, bullish for NZDUSD early, then bearish as USD's hard reversal confirms). Early-month conflict resolves into late-month double alignment as USD's reversal confirms.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"NZD continuing its post-peak decline (bearish); USD Index nearing its own secondary trough (inverted, still bullish for NZDUSD — opposing). Direct conflict early in the month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"NZD's waterfall persisting; USD Index basing at its trough (inverted bullish, narrowing). Both still somewhat opposed — reduced edge." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT EMERGING ★★★☆☆", note:"NZD's mid-month bear pressure continuing; USD Index's hard reversal beginning to confirm (inverted: now turning bearish for NZDUSD, aligning). The conflict resolves into alignment — enter/add to shorts." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"NZD stabilising near its lows but still net bearish; USD Index's major reversal confirming hard (inverted bearish). Both now aligned — hold shorts into November's high-conviction continuation." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "DOUBLE ALIGNMENT / SHORT", stars: 5,
    note: "DOUBLE ALIGNMENT AT MAXIMUM CONVICTION — NZD's continued seasonal weakness near its annual lows (3★) reinforces the US Dollar Index's STRONGEST SEASONAL WINDOW OF THE YEAR — \"all 3 TFs surging, highest conviction\" (5★ on its own chart — INVERTED, powerfully bearish for NZDUSD). The USD Index's defining month of the year dominates and drives one of the cleanest, highest-conviction shorts of the NZDUSD calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"NZD still declining near its lows (bearish); USD Index's strongest seasonal surge of its entire year confirming (inverted bearish, maximum conviction). Full alignment — enter short with conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"NZD maintaining its weakness; USD Index surging across all TFs (inverted bearish, highest conviction of its year). Both reinforcing — press shorts hard." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"SHORT / WATCH ★★★☆☆", note:"NZD beginning to base ahead of its own December turn; USD Index's surge continuing (inverted bearish, still dominant). USD remains the controlling force — hold, but watch for NZD's looming reversal." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT EMERGING ★★☆☆☆", note:"NZD's late-month turn arrives — all TFs inflect higher (bullish, now opposing); USD Index still surging toward its own peak (inverted bearish). Direct conflict emerges precisely as December's defining stand-off begins." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "ULTIMATE STAND-OFF", stars: 3,
    note: "THE DEFINING COIN-FLIP MONTH OF THE NZDUSD CALENDAR — NZD posts the STRONGEST MONTH OF ITS ENTIRE YEAR, surging toward ~95–100 at year close (5★, \"all TFs aligned, hold longs through month end\"), in the exact same month the US Dollar Index posts the PEAK OF ITS OWN SEASONAL YEAR — \"all TFs converge near 95–100\" (5★ on its own chart — INVERTED, powerfully bearish for NZDUSD). Both currencies post their single highest-conviction months of their own years in directly opposing directions — a genuine coin-flip closing the calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"ULTIMATE STAND-OFF ★★★☆☆", note:"NZD's year-end rally confirming (bullish, 5★ — its strongest month); USD Index's own year-end surge also confirming (inverted bearish, 5★ — its peak month). Two highest-conviction trades of the year colliding head-on." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"ULTIMATE STAND-OFF ★★★☆☆", note:"NZD accelerating toward its annual peak; USD Index also accelerating toward its own peak (inverted bearish). Both at near-maximum conviction in directly opposing directions — avoid forcing size, expect violent two-way action." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"ULTIMATE STAND-OFF ★★★☆☆", note:"NZD's 23-yr surging toward ~95–100; USD Index's TFs also converging near ~95–100 (inverted bearish). The stand-off persists at full intensity into year close." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"ULTIMATE STAND-OFF / CLOSE FLAT ★★★☆☆", note:"NZD closes the year at its peak (bullish, highest conviction of its year); USD Index also closes at its own peak (inverted bearish, highest conviction of its year). The defining coin-flip month of the NZDUSD calendar — both currencies' defining trades cancel at the year's close." },
    ]
  },
];

const SEASONAL_DATA = `
NZDUSD — FOREX SEASONAL ANALYSIS
Derived from: NZD/USD CME Futures (23-YR seasonal) + US Dollar Index ICE Futures (35-YR seasonal)
Methodology: NZD seasonal tendency combined with the inverse of the US Dollar Index seasonal tendency (NZD is the base currency — direct; the USD Index serves as the inverted quote-currency proxy, following the same approach used for EURUSD, since no standalone "USD/USD" futures dataset exists).

=== NZD COMPONENT (bullish NZD = NZDUSD rising) ===
Jan: NZD bear — 5-yr spikes at the open then collapses; structural decline all month (4★).
Feb: NZD bear — grinding lower toward its ~35–40 trough zone (4★).
Mar: NZD chop/flip — carves its annual trough (~25–30) then sharply reverses; TFs diverge (2★).
Apr: NZD bull — strong broad rally, all TFs aligned into its mid-April peak (4★).
May: NZD's MOST CRITICAL FLIP MONTH — 23-yr peaks ~85–90 then all TFs collapse and align bearish; "highest conviction short of the year" (5★).
Jun: NZD bear — near absolute annual lows, deepest trough zone (5★).
Jul: NZD chop/mixed — meaningful but uneven bounce; 15-yr/23-yr lift, 5-yr muted (3★).
Aug: NZD bull — confirmed broad recovery, all TFs aligned up, building toward Sep peak (4★).
Sep: NZD's secondary FLIP MONTH — 5-yr peaks first (early warning), then all TFs roll over and flip short mid-month (4★).
Oct: NZD bear — full post-peak waterfall decline, hold shorts (4★).
Nov: NZD bear — continued weakness near annual lows, late-month base/turn (3★).
Dec: NZD's STRONGEST MONTH OF THE YEAR — 23-yr surges toward ~95–100 at year close, all TFs aligned (5★).

=== USD INDEX COMPONENT (bullish USD = NZDUSD falling, since USD is inverted) ===
Jan: USD bull — confirmed bullish launch (4★; inverted: bearish for NZDUSD).
Feb: USD bull — continuing rally toward its late-Feb peak, then beginning to roll over (3★; inverted: bearish for NZDUSD, easing late month).
Mar: USD chop/mixed — directionless, transitional (2★; inverted: similarly without signal).
Apr: USD's SELL→FLIP playbook month — sell Wk1/2, then FLIP LONG late month (4★; inverted: bullish for NZDUSD early, then bearish as USD flips long).
May: USD bear — its "35-yr and 15-yr hit deepest trough of the year" (4★; inverted: powerfully bullish for NZDUSD, directly opposing NZD's own critical flip this same month).
Jun: USD bull — sharp mid-year recovery bounce (3★; inverted: bearish for NZDUSD).
Jul: USD chop/exit — mid-year peak hits early July then rolls over (2★; inverted: mildly bullish for NZDUSD as USD declines).
Aug: USD bear — clean secondary bear leg, broad decline (4★; inverted: bullish for NZDUSD).
Sep: USD bear — continuation into its own trough (3★; inverted: bullish for NZDUSD).
Oct: USD's MAJOR REVERSAL month — hits its secondary trough then stages a hard reversal late month (4★; inverted: bullish for NZDUSD early, then bearish as USD's reversal confirms).
Nov: USD's STRONGEST SEASONAL WINDOW OF THE ENTIRE YEAR — "all 3 TFs surging, highest conviction" (5★; inverted: powerfully bearish for NZDUSD, maximum conviction).
Dec: USD's PEAK OF ITS SEASONAL YEAR — "all TFs converge near 95–100" (5★; inverted: powerfully bearish for NZDUSD, its own highest-conviction month).

=== COMBINED NET EFFECT ===
Jan–Feb: DOUBLE ALIGNMENT — NZD's structural opening decline reinforces the USD Index's confirmed bullish launch (inverted bearish). Both components confirm at solid conviction — a clean two-month short to open the year.
Mar: CHOP / TRANSITION — both components enter their own low-conviction transition phases simultaneously (NZD's annual-trough flip, USD's directionless chop). The year's least decisive month.
Apr: A two-sided month — NZD's strong bull run opens in alignment with the USD Index's own sell-phase (inverted bullish), then grows contested as USD's late-month FLIP LONG (inverted bearish) introduces direct conflict heading into May.
May: MAXIMUM CONFLICT — the defining collision of the NZDUSD year. NZD's single highest-conviction trade of its own entire year (its critical flip, "highest conviction short of the year") collides head-on with the USD Index's own deepest trough of the year (inverted, powerfully bullish). Both currencies' defining moves of the year, in directly opposing directions — a genuine coin-flip.
Jun: DOUBLE ALIGNMENT at high conviction — NZD remains deep in its post-flip waterfall near its absolute annual low while the USD Index's sharp recovery bounce (inverted bearish) reinforces. One of the cleanest, highest-conviction shorts of the year.
Jul: MIXED — NZD's uneven bounce meets the USD Index's own brief peak-then-rollover (inverted, mildly bullish). Both transitional and low-conviction.
Aug: DOUBLE ALIGNMENT — NZD's confirmed broad recovery reinforces the USD Index's clean secondary bear leg (inverted bullish). One of the cleanest long windows of the year.
Sep: CONTESTED / FLIP — early-month double alignment (both bullish for NZDUSD) gives way to direct conflict as NZD's own flip-month reversal confirms mid-month while the USD Index continues its decline (inverted bullish, now opposing).
Oct: Early-month conflict (NZD's post-peak decline vs USD Index's pre-reversal trough, inverted bullish) resolves into late-month DOUBLE ALIGNMENT as USD's major reversal confirms (inverted bearish) — both ultimately reinforcing the bearish bias.
Nov: DOUBLE ALIGNMENT AT MAXIMUM CONVICTION — NZD's continued weakness reinforces the USD Index's strongest seasonal window of its entire year (inverted bearish, maximum conviction). One of the cleanest, highest-conviction shorts of the NZDUSD calendar — until NZD's late-month turn introduces conflict heading into December.
Dec: THE ULTIMATE STAND-OFF — NZD posts the strongest month of its entire year (surging toward ~95–100) in the exact same month the USD Index posts the peak of its own seasonal year (inverted, also surging toward ~95–100, powerfully bearish). Both currencies' single highest-conviction months of their own years collide in directly opposing directions — the defining coin-flip month closing the NZDUSD calendar.

=== PLAYBOOK SIGNALS ===
NZDUSD HIGHEST CONVICTION SHORT: November (double alignment at maximum conviction — NZD's continued weakness + USD Index's strongest seasonal window of its entire year, inverted bearish, 5★) and June (double alignment — NZD's post-flip waterfall near its absolute lows + USD Index's mid-year bounce, inverted bearish, 5★).
NZDUSD HIGHEST CONVICTION LONG: August (double alignment — NZD's confirmed recovery + USD Index's clean secondary bear leg, inverted bullish, both confirming, 5★).
NZDUSD MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (MAXIMUM CONFLICT — both currencies' single highest-conviction trades of their own years collide head-on in directly opposing directions) and December (THE ULTIMATE STAND-OFF — both currencies post the single highest-conviction months of their own entire years in directly opposing directions, a genuine coin-flip closing the calendar).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for NZDUSD explaining how the NZD and USD Index seasonal forces interact month by month, with special attention to the two defining stand-off months (May and December) where both currencies post their single highest-conviction trades of the year in directly opposing directions.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (NZD or USD Index) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction NZDUSD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially May's and December's defining stand-offs, where both currencies post their single highest-conviction months of the year in directly opposing directions.
`;
