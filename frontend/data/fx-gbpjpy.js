/**
 * data/fx-gbpjpy.js — GBPJPY Forex Seasonal
 * Derived from: GBP/USD CME futures + JPY/USD CME futures (inverted)
 * Methodology: GBP seasonal tendency vs inverted JPY seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-gbpjpy",
  name:     "GBP / JPY",
  sub:      "Forex Seasonal · Derived from GBP CME + JPY CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · British Pound CME (40-YR) · Japanese Yen CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own low-conviction bearish drift (\"declining from Dec, no clean trade\", 2★) is outweighed by JPY's own structural bear month — \"40-yr/15-yr declining from December highs, broad seasonal weakness\" (3★ on its own chart — INVERTED, bullish for GBPJPY). JPY's slightly higher conviction carries the month by default.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"JPY's decline from its December highs underway (inverted bullish, dominant); GBP without a clean signal. JPY's edge controls the early month." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"JPY's structural weakness persisting (inverted bullish); GBP still drifting lower without conviction. JPY's edge carries." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"JPY continuing its broad decline; GBP approaching its own February trough. Hold long on JPY's edge." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"JPY nearing its own primary trough (inverted bullish, narrowing); GBP basing ahead of its own reversal. JPY's edge still carries into February." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOP — DUAL TROUGH", stars: 2,
    note: "Both currencies sit at their own primary annual troughs in the same month — GBP's \"primary annual trough, 15-yr near zero, cover shorts and watch for reversal\" (2★) directly mirrors JPY's own \"primary annual trough, 15-yr near zero, watch for reversal\" (2★ on its own chart — INVERTED, neutral-to-bearish for GBPJPY). Neither component offers a clean directional edge — both are basing simultaneously.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"GBP at its own annual lows, beginning to base; JPY also near its own trough, basing in parallel (inverted, mirrored). Both currencies basing in tandem — no clean edge yet." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"GBP's base-building continuing; JPY's own trough-forming continuing in parallel (inverted, still mirrored). Avoid forcing a trade — both are reversal-pending." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH FOR TURN ★★☆☆☆", note:"GBP's recovery beginning to confirm — \"all TFs beginning early reversal\" (bullish, now leading); JPY's own base still forming (inverted, lagging). GBP starting to pull ahead of the dual-trough stand-off." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"GBP's rally confirming — \"enter long, March surge incoming\" (bullish, leading); JPY's own base still uncertain (inverted, neutral). GBP's earlier turn now begins to carry the pair into March's collision." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — STAND-OFF", stars: 4,
    note: "A genuine maximum-conviction collision — GBP's STRONGEST AND CLEANEST BULL WINDOW OF ITS ENTIRE YEAR — \"all three TFs surge together from the February trough\" (5★, bullish) — directly confronts JPY's own STRONGEST Q1 WINDOW — \"all TFs surging from the February trough, the year's cleanest early bull run\" (5★ on its own chart — INVERTED, powerfully bearish for GBPJPY). Both currencies post their highest-conviction moves of the early year in directly opposing setups.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★★", note:"GBP surging out of its trough with full conviction (bullish, 5★); JPY also surging from its own trough at the same time (inverted bearish, 5★, directly opposing). Both currencies' defining early-year rallies collide head-on — avoid forcing size at this stand-off." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT ★★★★★", note:"GBP's surge accelerating toward its April peak; JPY's own rally also accelerating with equal conviction (inverted bearish, still opposing). Genuinely two-sided at peak conviction on both sides — let the stand-off resolve before committing." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★★★☆", note:"GBP's rally continuing into its historic April flip; JPY beginning to approach its own peak before its own April rollover (inverted, narrowing slightly). The collision persists but begins to soften as both near their own turning points." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"GBP nearing its absolute peak — the historic April flip approaches; JPY also nearing its own peak before its own reversal (inverted, mirrored). Both currencies converging toward simultaneous flips — April brings a dual-flip resolution." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "chop", combinedLabel: "DUAL FLIP — CONFLICT", stars: 3,
    note: "A rare DUAL-FLIP MONTH — GBP's defining playbook flip — \"BUY Wk1 at the absolute peak, then SELL — all 3 TFs collapse, the highest conviction reversal of the year\" (5★) — collides with JPY's own flip month — \"peak then sell, the year's pivotal reversal point\" (3★ on its own chart — INVERTED: bearish early as JPY peaks, then bullish as JPY declines). Both currencies reverse in the same month, producing a genuinely two-sided, choppy collision.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"CONFLICT / EXIT LONGS ★★★★☆", note:"GBP's playbook BUY Wk1 fires at its absolute peak (bullish, about to reverse); JPY also nearing its own peak (inverted bearish, directly opposing). Both currencies at their own pivotal points — exit longs ahead of the historic flip." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's historic collapse confirms — its highest-conviction short entry of the year (bearish); JPY also rolling over from its own peak (inverted bullish initially, then aligning bearish as JPY's decline persists). Both currencies' reversals beginning to align bearish for the pair." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's waterfall decline accelerating, all TFs aligned bearish; JPY's own decline persisting from its peak (inverted bullish, narrowing — but GBP's far higher conviction dominates the net). Hold short on GBP's overwhelming edge." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"GBP's playbook SELL Wk4 confirmed, declining into May; JPY beginning to base ahead of its own May decline (inverted, narrowing toward neutral). GBP's edge still carries the net into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "GBP's continuing steep waterfall — \"steep continuation from the April peak, all TFs declining, hold short\" (5★, bearish) — outweighs JPY's own moderate seasonal decline (\"broad weakness following its April reversal\", 3★ on its own chart — INVERTED, bullish for GBPJPY, the conflicting but weaker signal). GBP's far higher conviction dominates a contested month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"GBP's waterfall continuing with peak short pressure (bearish, dominant, 5★); JPY's decline also underway but at lower conviction (inverted bullish, weaker). GBP's edge controls the month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP's decline persisting at maximum conviction; JPY's weakness continuing in parallel (inverted bullish, still the weaker conflicting signal). Hold short on GBP's dominant edge." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP's decline continuing toward June's trough; JPY also continuing its own decline (inverted bullish, narrowing the gap slightly). GBP's higher conviction still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★★☆☆", note:"GBP flattening, beginning to base; JPY also approaching its own June chop zone (inverted, neutral). The conflict eases toward neutral as GBP's edge fades into June." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOP — DUAL DIRECTIONLESS", stars: 2,
    note: "Both currencies enter their own quietest, most directionless stretches of the year in the same month — GBP's own choppy, unconfirmed bounce (\"5-YR sharp bounce, not confirmed by longer TFs, avoid\", 2★) mirrors JPY's own low-conviction chop (\"directionless mid-year stretch\", 2★ on its own chart — INVERTED, similarly without edge). Neither component offers a workable signal — a genuinely quiet month for the pair.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / AVOID ★★☆☆☆", note:"GBP's bounce beginning but unconfirmed; JPY also drifting without direction (inverted, neutral). Both quiet — avoid forcing a trade in the dual-chop zone." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"GBP's bounce persisting but still unconfirmed by longer TFs; JPY's own drift continuing (inverted, neutral). Stand aside — neither offers conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"GBP's bounce rolling over, exit any short-term longs; JPY beginning to firm ahead of its own historic July rally (inverted, slowly building toward a clearer edge). The dual-chop begins to resolve toward July's clean conflict." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"GBP back to chop, no signal; JPY's pre-July build-up strengthening (inverted bearish, beginning to lead). JPY's emerging edge starts to carry the pair toward July's outright dominance." },
    ]
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "JPY's STRONGEST MONTH OF ITS ENTIRE YEAR — \"all TFs aligned in a powerful seasonal rally, the single highest-conviction long of JPY's calendar\" (5★ on its own chart — INVERTED, powerfully bearish for GBPJPY) — completely overwhelms GBP's own choppy, lowest-conviction stretch of the year (1★, \"all 3 TFs volatile and directionless, no reliable signal, avoid\"). JPY's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"JPY surging with its single highest conviction of the year (inverted bearish, dominant, 5★); GBP directionless, offering no resistance. JPY's edge takes complete control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"JPY's rally continuing at maximum conviction across all TFs (inverted bearish); GBP's chop persisting. Hold short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY's strongest seasonal window continuing toward its August peak; GBP still without signal. JPY's structural dominance remains intact." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"JPY beginning to approach its own peak ahead of its historic August flip (inverted, narrowing slightly); GBP's chop persisting. JPY's edge still carries into August's reversal." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "chop", combinedLabel: "CONTESTED — TWO-SIDED", stars: 3,
    note: "JPY's own pivotal flip month — \"peak then short, the highest-conviction short ENTRY of JPY's entire year\" (4★ on its own chart — INVERTED: bullish early as JPY peaks, then powerfully bearish as JPY collapses) — dominates by default over GBP's own continued directionless chop (1★, \"no directional bias, avoid — late Aug secondary decline begins\"). JPY's own internal reversal makes the month genuinely two-sided.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"CONFLICT ★★★☆☆", note:"JPY nearing its own annual peak (inverted bearish, building); GBP's chop persisting, offering no resistance. JPY's pre-flip setup begins to dominate by default." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"JPY's flip fires — peaking then beginning to roll over (inverted: briefly bullish for GBPJPY at the JPY peak); GBP still directionless. The reversal point itself produces a contested, two-sided week." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY's collapse confirming — its highest-conviction short entry of the year now in full effect (inverted bearish, dominant); GBP's own late-month secondary decline beginning to add reinforcement. JPY's flip resolution now drives the pair." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"JPY's decline persisting with high conviction (inverted bearish); GBP's own secondary decline confirming (bearish, now aligning). Both currencies reinforcing into September's defining stand-off." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — STAND-OFF", stars: 4,
    note: "A genuine maximum-conviction collision — GBP's own clear secondary-trough decline (\"all 3 TFs declining to the secondary annual trough ~30, clear short window\", 4★, bearish) collides directly with JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"all TFs aligned in the single most decisive bearish move of JPY's calendar\" (5★ on its own chart — INVERTED, powerfully bullish for GBPJPY). Both currencies post their defining moves of the year in directly opposing setups for the pair.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★★★", note:"GBP's decline continuing toward its trough (bearish, 4★); JPY entering its single highest-conviction bearish window of the year (inverted bullish, 5★, directly opposing). Both currencies' defining moves colliding head-on — avoid forcing size at this stand-off." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★★★", note:"GBP nearing its own trough (still bearish); JPY's collapse accelerating with maximum conviction (inverted bullish, directly opposing). Genuinely two-sided at peak conviction on both sides." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"CONFLICT ★★★★☆", note:"GBP basing at its trough, beginning to recover; JPY's historic decline persisting with full conviction (inverted bullish, still dominant). The stand-off persists but JPY's overwhelming conviction begins to edge the net higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★★☆", note:"GBP's recovery confirming (bullish, now reinforcing); JPY's decline continuing toward October (inverted bullish, still aligned). Both now beginning to align — the stand-off resolves toward October's clean alignment." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "A clean, confirmed alignment — GBP's own clean recovery rally — \"all 3 TFs recovering from the September trough, clean seasonal lift, enter long\" (4★, bullish) — directly reinforces JPY's continuing post-collapse decline — \"continued broad weakness following its historic September reversal\" (3★ on its own chart — INVERTED, bullish for GBPJPY). Both components point the same direction — one of the calendar's cleanest long windows.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP turning up from its September low (bullish, confirmed entry); JPY's decline continuing with high conviction (inverted bullish, fully aligned). Enter long on the clean double alignment." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"GBP's recovery rally underway, hold; JPY's broad decline persisting (inverted bullish, still reinforcing). Both fully aligned — hold long with high conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's strength continuing into November; JPY's decline persisting, no relief (inverted bullish, still aligned). The clean alignment carries." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP building into its own November peak; JPY's late-month decline beginning to ease but remains bearish (inverted bullish, still reinforcing). Both currencies' aligned trends carry into November." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "October's clean alignment persists — GBP's own strong bull month — \"40-yr peaks ~75-80 in November, strong bull month\" (4★, bullish) — continues to reinforce JPY's continued seasonal weakness — \"broad decline persisting, bear bias throughout\" (4★ on its own chart — INVERTED, bullish for GBPJPY). Both components remain aligned for a second consecutive month, before GBP's own late-month rollover begins to introduce fresh conflict.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's 40-yr and 5-yr both strong, hold longs (bullish); JPY's continued post-September decline persisting (inverted bullish, still reinforcing). The alignment from October carries straight through." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's strength continuing toward its 40-yr peak; JPY's mid-November weakness persisting across all TFs (inverted bullish, still aligned). Hold long with confidence." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"LONG / WATCH ★★★☆☆", note:"GBP's 40-yr nearing its peak, beginning to flatten — \"begin planning exit\"; JPY beginning to firm ahead of its own December recovery (inverted, narrowing). Watch for the alignment's resolution as both approach their own turns." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"FLIP / CONFLICT ★★★☆☆", note:"GBP's historic rollover confirms — \"all TFs rolling, exit longs, December weakness begins\" (now bearish); JPY's own recovery beginning to build (inverted bearish, now aligning with GBP's flip). Both transitioning bearish into December — but JPY's recovery will soon reverse this dynamic." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "chop", sigLt: "bear",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — YEAR-END STAND-OFF", stars: 4,
    note: "A defining year-end collision — GBP's own seasonal weakness — \"all TFs decline into year end, near-annual lows, weak/short bias\" (3★, bearish) — collides directly with JPY's own December RECOVERY — \"all TFs recovering, building toward the new year\" (4★ on its own chart — INVERTED, bearish for GBPJPY... wait, JPY recovery means JPY strengthens, which is bearish for GBPJPY). Both currencies stage meaningful year-end moves — GBP declining, JPY recovering (inverted, also bearish for the pair) — producing a DOUBLE-ALIGNMENT bearish close that nonetheless carries real two-sided risk as both approach their own January reversals.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's decline confirming — \"all TFs declining, short bias confirmed\" (bearish); JPY's recovery building with rising conviction (inverted bearish, aligning). Both reinforcing — enter short on the alignment." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's weakness continuing; JPY's recovery persisting with strength (inverted bearish, still aligned). Hold short on the clean double alignment." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"GBP's 5-yr and 15-yr hitting their near-annual lows, beginning to stabilise; JPY's recovery still building toward its own peak (inverted bearish, still the dominant force). The alignment narrows as GBP nears its own turn." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT — YEAR-END STAND-OFF ★★★☆☆", note:"GBP beginning to base ahead of its own January-cycle reset (turning bullish); JPY's recovery still in force (inverted bearish, now directly opposing GBP's early turn). The year closes on a genuine two-sided stand-off as both currencies approach their own reversal points into the new year." },
    ]
  },
];

const SEASONAL_DATA = `
GBPJPY — FOREX SEASONAL ANALYSIS
Derived from: British Pound CME Futures (40-YR seasonal) + Japanese Yen CME Futures (40-YR seasonal)
Methodology: GBP seasonal tendency combined with the inverse of JPY seasonal tendency (GBP is the base currency — direct; JPY is the quote currency — inverted, since JPY strength means fewer JPY per unit of GBP).

=== GBP COMPONENT (bullish GBP = GBPJPY rising) ===
Jan: GBP bear — \"declining from Dec highs, 40-yr and 15-yr lower, no clean trade\" (2★).
Feb: GBP chop — \"primary annual trough, 15-yr near zero, cover shorts and watch for reversal\" (2★).
Mar: GBP's STRONGEST AND CLEANEST BULL WINDOW OF THE YEAR — \"all 3 TFs surge together from the Feb trough\" (5★).
Apr: GBP's DEFINING PLAYBOOK FLIP — \"BUY Wk1 (absolute peak ~100), SELL Wk4 — all 3 TFs collapse, the highest conviction reversal of the year\" (5★).
May: GBP bear — \"steep waterfall continuation from the April peak, all TFs declining, hold short\" (5★).
Jun: GBP chop — \"5-yr sharp bounce, not confirmed by longer TFs, avoid\" (2★).
Jul: GBP chop — \"all 3 TFs volatile and directionless, no reliable signal, avoid\" (1★).
Aug: GBP chop — \"continued chop, no directional bias — late Aug secondary decline into the Sep trough begins\" (1★).
Sep: GBP bear — \"all 3 TFs declining to the secondary annual trough ~30, clear short window\" (4★).
Oct: GBP bull — \"all 3 TFs recovering from the Sep trough, clean seasonal lift, enter long\" (4★).
Nov: GBP bull — \"40-yr peaks ~75-80, strong bull month — begin watching for Dec weakness\" (4★).
Dec: GBP bear — \"all TFs decline into year end, near-annual lows, weak/short bias\" (3★).

=== JPY COMPONENT (bullish JPY = GBPJPY falling, since JPY is inverted) ===
Jan: JPY bear — \"40-yr/15-yr declining from December highs, broad seasonal weakness\" (3★; inverted: bullish for GBPJPY).
Feb: JPY chop — \"primary annual trough, 15-yr near zero, watch for reversal\" (2★; inverted: neutral-to-bearish for GBPJPY).
Mar: JPY's STRONGEST Q1 WINDOW — \"all TFs surging from the Feb trough, the year's cleanest early bull run\" (5★; inverted: powerfully bearish for GBPJPY).
Apr: JPY's PIVOTAL FLIP — \"peak then sell, the year's pivotal reversal point\" (3★; inverted: bearish early as JPY peaks, then bullish as JPY declines).
May: JPY bear — \"broad weakness following its April reversal\" (3★; inverted: bullish for GBPJPY).
Jun: JPY chop — \"directionless mid-year stretch\" (2★; inverted: similarly without edge).
Jul: JPY's STRONGEST MONTH OF THE YEAR — \"all TFs aligned in a powerful seasonal rally, the single highest-conviction long of JPY's calendar\" (5★; inverted: powerfully bearish for GBPJPY).
Aug: JPY's PIVOTAL FLIP — \"peak then short, the highest-conviction short ENTRY of JPY's entire year\" (4★; inverted: bullish early at the JPY peak, then powerfully bearish as JPY collapses).
Sep: JPY's HIGHEST CONVICTION SHORT OF ITS ENTIRE YEAR — \"all TFs aligned in the single most decisive bearish move of JPY's calendar\" (5★; inverted: powerfully bullish for GBPJPY).
Oct: JPY bear — \"continued broad weakness following its historic September reversal\" (3★; inverted: bullish for GBPJPY).
Nov: JPY bear — \"broad decline persisting, bear bias throughout\" (4★; inverted: bullish for GBPJPY).
Dec: JPY bull — \"all TFs recovering, building toward the new year\" (4★; inverted: bearish for GBPJPY).

=== COMBINED NET EFFECT ===
Jan: GBP's own low-conviction bearish drift is outweighed by JPY's own structural bear month (inverted, bullish for GBPJPY) — JPY's slightly higher conviction carries the month by default.
Feb: A DUAL-TROUGH STAND-OFF — both currencies sit at their own primary annual troughs simultaneously, neither offering a clean edge — a genuinely quiet, basing month for the pair.
Mar: MAXIMUM CONFLICT — GBP's single strongest, cleanest bull window of its year collides directly with JPY's own strongest Q1 window (inverted, powerfully bearish) — both currencies post their highest-conviction early-year moves in directly opposing directions.
Apr: A rare DUAL-FLIP MONTH — GBP's defining playbook reversal collides with JPY's own pivotal flip in the same month, producing a genuinely two-sided, choppy collision that ultimately resolves toward GBP's far higher conviction (net short).
May: GBP's continuing steep waterfall outweighs JPY's own moderate decline (inverted, bullish for GBPJPY, the conflicting but weaker signal) — GBP's far higher conviction dominates.
Jun: A DUAL-DIRECTIONLESS MONTH — both currencies enter their own quietest stretches of the year simultaneously — a genuinely quiet month offering no workable edge.
Jul: JPY's single strongest month of its entire year completely overwhelms GBP's own lowest-conviction stretch — JPY's vastly higher conviction dominates outright.
Aug: JPY's own pivotal flip month — peaking then collapsing into its highest-conviction short entry of the year (inverted) — dominates by default over GBP's continued chop, producing a genuinely two-sided month around the JPY reversal point.
Sep: THE DEFINING COLLISION OF THE CALENDAR — GBP's own clear secondary-trough decline collides directly with JPY's single highest-conviction short of its entire year (inverted, powerfully bullish for GBPJPY) — both currencies stage defining moves of the year in directly opposing setups.
Oct-Nov: A clean, sustained DOUBLE ALIGNMENT — GBP's confirmed recovery rally directly reinforces JPY's continuing post-collapse decline (inverted, bullish for GBPJPY) for two consecutive months — one of the calendar's cleanest long stretches.
Dec: A genuine YEAR-END STAND-OFF — GBP's own seasonal weakness initially aligns with JPY's recovery (inverted, also bearish for GBPJPY) for a clean double-alignment short, before both currencies approach their own January reversal points and produce two-sided risk into year end.

=== PLAYBOOK SIGNALS ===
GBPJPY HIGHEST CONVICTION LONG: October-November (GBP's confirmed recovery rally directly reinforces JPY's continuing post-September collapse, inverted bullish — one of the calendar's cleanest, longest double-alignment long stretches, 4★).
GBPJPY HIGHEST CONVICTION SHORT: July (JPY's single highest-conviction rally of its entire year, inverted bearish, completely overwhelms GBP's lowest-conviction stretch, 5★) and April Wk2-4 (GBP's single highest-conviction collapse of its year resolves the dual-flip collision into a clean double-alignment short, 4★).
GBPJPY MOST CONTESTED / REQUIRES CAREFUL FRAMING: March (MAXIMUM CONFLICT — both currencies' single highest-conviction early-year rallies collide head-on) and September (THE DEFINING COLLISION — GBP's clear secondary-trough decline meets JPY's single highest-conviction short of its entire year).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for GBPJPY explaining how the GBP and JPY seasonal forces interact month by month, with special attention to the dual-trough February stand-off, March's maximum-conflict collision of both currencies' strongest early-year rallies, April's rare dual-flip month, and September's defining collision between GBP's secondary-trough decline and JPY's single highest-conviction short of its entire year.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (GBP or JPY) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction GBPJPY trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially March and September's stand-offs between both currencies' single highest-conviction moves of their respective years, and the clean October-November double-alignment long stretch.
`;
