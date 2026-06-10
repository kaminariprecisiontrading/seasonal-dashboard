/**
 * data/fx-gbpcad.js — GBPCAD Forex Seasonal
 * Derived from: GBP/USD CME futures + CAD/USD CME futures (inverted)
 * Methodology: GBP seasonal tendency vs inverted CAD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-gbpcad",
  name:     "GBP / CAD",
  sub:      "Forex Seasonal · Derived from GBP CME + CAD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · British Pound CME (40-YR) · Canadian Dollar CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own low-conviction bearish drift (\"declining from Dec, no clean trade\", 2★) is outweighed by CAD's far stronger structural opening collapse — \"5-YR spikes then immediately collapses, fade the open, structural bear month\" (4★ on its own chart — INVERTED, bullish for GBPCAD). CAD's far higher conviction carries the month by default.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"GBP drifting without edge; CAD's open-spike fading hard (inverted bullish, dominant). CAD's structural decline carries from day one." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's decline accelerating (inverted bullish, high conviction); GBP still without clean signal. CAD's edge in full control." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's broad weakness persisting; GBP approaching its own February trough. Hold long on CAD's structural edge." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CAD nearing its Feb lows (inverted bullish, narrowing); GBP basing ahead of its own reversal. CAD's edge still carries into February." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own primary annual trough/base-building stretch (\"15-yr near zero, cover shorts and watch for reversal\", 2★) provides little resistance to CAD's continuing structural weakness — \"all three TFs grinding lower toward the ~50 zone\" (4★ on its own chart — INVERTED, bullish for GBPCAD). CAD's edge continues to dominate by default into its own trough.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's decline continuing (inverted bullish, dominant); GBP near its own annual lows, beginning to base. CAD's structural edge still carries." },
      { wk:"Wk 2", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CAD's mid-month lows forming (inverted bullish); GBP's own base-building continuing. Hold long on CAD's edge." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"chop", com:"LONG LEAN ★★☆☆☆", note:"GBP's recovery beginning to confirm — \"all TFs beginning early reversal\" (bullish, now reinforcing); CAD still declining toward its own trough (inverted bullish, aligned). Both now aligning." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's rally confirming — \"enter long, March surge incoming\" (bullish); CAD also basing near its lows (inverted, neutral-to-bullish). Both currencies now aligning bullish for the pair heading into March's collision." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "GBP's STRONGEST AND CLEANEST BULL WINDOW OF ITS ENTIRE YEAR — \"all three TFs surge together from the February trough\" (5★, bullish) — dominates over CAD's own messy, low-conviction transition month (2★ on its own chart, \"40-YR begins recovery, TFs diverging, no clean bias\" — INVERTED, mildly bearish for GBPCAD, the conflicting but far weaker signal). GBP's overwhelming conviction carries the month outright.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP surging with maximum conviction — its single strongest seasonal window of the year (5★, dominant); CAD still weak pre-recovery (inverted bullish, briefly reinforcing). Enter long with full conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP's surge accelerating, all three TFs aligned; CAD's recovery beginning to lead (inverted bearish, now mildly opposing but far weaker). GBP's overwhelming edge carries." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP's final leg into its April peak; CAD's early long bias forming (inverted bearish, still minor opposition). Hold long with maximum conviction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / WATCH ★★★★☆", note:"GBP approaching its absolute peak — begin planning the historic April flip; CAD building toward its own bull window (inverted bearish, narrowing the gap). GBP's edge still carries into April's defining collision." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT — TWO-SIDED COLLISION", stars: 4,
    note: "GBP's DEFINING PLAYBOOK MONTH — \"BUY Wk1 at the absolute peak ~100, then SELL — all 3 TFs collapse simultaneously, the highest conviction flip of the year\" (5★) — collides with CAD's own strong bull month (\"all TFs rallying, strong bull confluence\", 4★ on its own chart — INVERTED, bearish for GBPCAD). Early-month conflict (GBP at its peak vs CAD's rally, inverted bearish) resolves into late-month double alignment as GBP's historic collapse confirms.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT / EXIT LONGS ★★★★★", note:"GBP's playbook BUY Wk1 fires — at its absolute annual peak, the single highest-conviction exit/flip point of the year (bullish, about to reverse); CAD's own rally also accelerating (inverted bearish, directly opposing). Exit longs — the historic flip is imminent." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's historic collapse confirms — all three TFs rolling over simultaneously, its highest-conviction short entry of the year (bearish); CAD's rally persisting (inverted bearish, now ALIGNING with GBP's collapse). Both point the same direction — enter short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's waterfall decline accelerating, all TFs aligned bearish; CAD's bull run continuing toward its own May peak (inverted bearish, still reinforcing). Hold short with maximum conviction — clean alignment." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's playbook SELL Wk4 confirmed — declining into May; CAD nearing its own peak before its own rollover (inverted bearish, still aligned). The double alignment carries the conviction into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "GBP's continuing steep waterfall — \"steep continuation from the April peak, all TFs declining, hold short\" (5★, bearish) — narrowly outweighs CAD's own strong May decline — \"40-YR peaks then rolls over, 5-YR collapses from its April peak\" (4★ on its own chart — INVERTED, bullish for GBPCAD, the conflicting but slightly weaker signal). GBP's marginally higher conviction carries a genuinely contested month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"GBP's waterfall continuing with peak short pressure (bearish, dominant, 5★); CAD's 40-yr still near its own peak pre-rollover (inverted, neutral early). GBP's edge controls the early month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"GBP's decline persisting at maximum conviction; CAD's own rollover confirming — \"all TFs turning south\" (inverted bullish, now directly opposing). Genuinely contested but GBP's extreme conviction edges ahead." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★★☆", note:"GBP's decline continuing toward June's trough; CAD's full waterfall also accelerating (inverted bullish, narrowing the gap further). The stand-off persists — GBP's marginal edge still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★★☆☆", note:"GBP flattening, beginning to base — \"late May flattening, watch for base\"; CAD's broad decline continuing into its own June trough (inverted bullish, now the stronger signal). The conflict resolves toward neutral as GBP's edge fades." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own choppy, unconfirmed bounce (\"5-YR sharp bounce to ~80, not confirmed by longer TFs, avoid or short-term only\", 2★) is outweighed by CAD's continuing deep trough — \"all three TFs near lows, deep seasonal trough zone, hold shorts from May\" (4★ on its own chart — INVERTED, bullish for GBPCAD). CAD's higher conviction carries the month by default.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD's waterfall continuing into its trough (inverted bullish, dominant); GBP's bounce beginning but unconfirmed by longer TFs. CAD's structural edge controls the month." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD at its broad lows, all TFs depressed (inverted bullish, maximum conviction); GBP's bounce still elevated but unconfirmed. Hold long on CAD's edge." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CAD possibly basing — watch for its own turn (inverted, narrowing); GBP's bounce rolling over, exit any longs on its own chart. CAD's edge softens but still carries." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CAD approaching its own historic July reversal (inverted bullish, transitioning); GBP back to chop. CAD's structural edge persists into its own defining recovery month." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "CAD's POWERFUL RECOVERY — \"all TFs turning up simultaneously from the June trough, high conviction long, the year's strongest recovery window\" (5★ on its own chart — INVERTED, powerfully bearish for GBPCAD) — completely overwhelms GBP's own choppy, directionless, lowest-conviction stretch (1★, \"all 3 TFs volatile, no reliable signal, avoid\"). CAD's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD surging with full conviction from its trough (inverted bearish, dominant, 5★); GBP directionless, offering no resistance. CAD's edge takes complete control — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD's 5-YR leading a sharp spike higher (inverted bearish, maximum conviction); GBP's chop persisting. Hold short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's recovery continuing toward its August highs; GBP still without signal. CAD's structural dominance remains intact." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's 5-YR beginning to top — early warning of its own rollover (inverted, narrowing slightly); GBP's chop persisting. CAD's edge still carries into August." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "GBP's continued directionless chop (1★, \"no directional bias, avoid\") leaves CAD's own continuing bull run — \"5-YR at or near peak, 40-YR continuing higher toward its September peak\" (4★ on its own chart — INVERTED, bearish for GBPCAD) — to dominate the month outright by default, right up to GBP's own late-month secondary decline beginning to add reinforcement.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's bull run persisting near its 5-YR peak zone (inverted bearish, dominant); GBP directionless. CAD's edge carries the month from the open." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD approaching its seasonal highs, all TFs still rising (inverted bearish, still aligned); GBP's chop persisting. Hold short on CAD's structural edge." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CAD's 5-YR rolling over but its 40-YR still climbing toward the September peak (inverted, still net bearish); GBP also beginning its own late-month secondary decline (now reinforcing). Both starting to align bearish." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"CAD's 40-YR near its absolute peak before the historic September flip (inverted bearish, still dominant); GBP's own \"late-Aug secondary decline into the September trough\" now confirms (bearish, aligning). Both currencies now reinforcing into September's defining collision." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING COLLISION", stars: 4,
    note: "THE DEFINING COLLISION OF THE GBPCAD CALENDAR — GBP's own clear secondary-trough decline (\"all 3 TFs declining to the secondary annual trough ~30, clear short window\", 4★, bearish) collides directly with CAD's HIGHEST CONVICTION REVERSAL OF ITS ENTIRE YEAR — \"40-YR and 15-YR hit the absolute annual peak ~100 mid-month, then collapse — the single most decisive move of CAD's year\" (5★ on its own chart — INVERTED: bearish early as CAD peaks, then powerfully bullish as CAD collapses). Both currencies stage defining moves of the year in directly opposing setups.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's decline continuing toward its trough (bearish); CAD still rising toward its absolute annual peak (inverted bearish, both aligned). Enter short on the early alignment." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★★★", note:"GBP continuing its decline; CAD's historic flip fires — peaking at its absolute annual high then immediately rolling over (inverted: turning powerfully bullish for GBPCAD, directly opposing GBP's continuing weakness). Both currencies' defining moves colliding head-on — avoid forcing size at the pivot." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"MAXIMUM CONFLICT ★★★★☆", note:"GBP nearing its own trough (still bearish); CAD's post-peak waterfall confirming with maximum conviction (inverted bullish, directly opposing). Genuinely two-sided at peak conviction on both sides." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"GBP basing at its trough, beginning to recover; CAD's collapse persisting toward October (inverted bullish, still dominant). The stand-off begins to ease as both transition into October's double-alignment recovery." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "A clean, confirmed alignment — GBP's own clean recovery rally — \"all 3 TFs recovering from the September trough, clean seasonal lift, enter long\" (4★, bullish) — directly reinforces CAD's continuing post-peak collapse — \"sharp post-September decline, drops from 100 toward ~75\" (4★ on its own chart — INVERTED, bullish for GBPCAD). Both components point the same direction — conviction amplifies into one of the calendar's cleanest long windows.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP turning up from its September low (bullish, confirmed entry); CAD's waterfall continuing with high conviction (inverted bullish, fully aligned). Enter long on the clean double alignment." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"GBP's recovery rally underway, hold; CAD's broad decline persisting across all TFs (inverted bullish, still reinforcing). Both fully aligned — hold long with high conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's strength continuing into November; CAD's mid-October decline persisting, no relief (inverted bullish, still aligned). The clean alignment carries." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP building into its own November peak; CAD's late-October decline beginning to ease but remains bearish (inverted bullish, still reinforcing). Both currencies' aligned trends carry into November." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "October's clean alignment persists — GBP's own strong bull month — \"40-YR peaks ~75-80 in November, strong bull month\" (4★, bullish) — continues to directly reinforce CAD's continued broad decline — \"40-YR falling toward 50, bear bias throughout\" (3★ on its own chart — INVERTED, bullish for GBPCAD). Both components remain aligned for a second consecutive month — one of the calendar's longest sustained double-alignment stretches.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's 40-yr and 5-yr both strong, hold longs (bullish); CAD's continued post-September decline persisting (inverted bullish, still reinforcing). The alignment from October carries straight through." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's strength continuing toward its 40-yr peak; CAD's mid-November weakness persisting across all TFs (inverted bullish, still aligned). Hold long with confidence." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG / WATCH ★★★☆☆", note:"GBP's 40-yr nearing its peak, 5-yr and 15-yr beginning to flatten — \"begin planning exit\"; CAD's 5-yr beginning to stabilise near its own lows (inverted, narrowing). Watch for the alignment's resolution as both currencies approach their own turning points." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"FLIP / CONFLICT ★★★☆☆", note:"GBP's historic rollover confirms — \"all TFs rolling, exit longs, December weakness begins\" (now bearish); CAD also approaching its own annual lows and beginning to base (inverted, narrowing toward neutral). The long alignment ends as GBP's own flip introduces fresh conflict heading into December." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "GBP's own seasonal year-end weakness — \"all TFs decline into year end, 15-YR and 5-YR hit near-annual lows, weak/short bias\" (3★, bearish) — dominates over CAD's own directionless, low-conviction base-building stretch (2★ on its own chart, \"all TFs converging near annual lows, beginning to base, year-end recovery begins very late\" — INVERTED, similarly without strong directional edge). GBP's clearer, higher-conviction decline carries the calendar to its close.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP's decline confirming — \"all TFs declining, short bias confirmed\" (bearish, dominant); CAD near its own annual lows, no clear signal yet (inverted, neutral). GBP's edge takes the early lead." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP's weakness continuing; CAD's base-building persisting without direction (inverted, neutral, offering no resistance). Hold short on GBP's clearer edge." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"GBP's 5-YR and 15-YR hitting their near-annual lows; CAD's sideways consolidation continuing at its own lows (inverted, still neutral). GBP's edge remains the only clear signal." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT / COVER ★★☆☆☆", note:"GBP beginning to base ahead of its own February trough cycle — \"begin covering, Feb trough cycle repeating\"; CAD's 5-YR turning up late in the month (inverted bearish, now mildly opposing). GBP's fading edge still closes the year, with the relationship resetting into January's renewed long-lean opening." },
    ]
  },
];

const SEASONAL_DATA = `
GBPCAD — FOREX SEASONAL ANALYSIS
Derived from: British Pound CME Futures (40-YR seasonal) + Canadian Dollar CME Futures (40-YR seasonal)
Methodology: GBP seasonal tendency combined with the inverse of CAD seasonal tendency (GBP is the base currency — direct; CAD is the quote currency — inverted, since CAD strength means fewer CAD per unit of GBP).

=== GBP COMPONENT (bullish GBP = GBPCAD rising) ===
Jan: GBP bear — \"declining from Dec highs, 40-yr and 15-yr lower, no clean trade\" (2★).
Feb: GBP chop — \"primary annual trough, 15-yr near zero, cover shorts and watch for reversal\" (2★).
Mar: GBP's STRONGEST AND CLEANEST BULL WINDOW OF THE YEAR — \"all 3 TFs surge together from the Feb trough\" (5★).
Apr: GBP's DEFINING PLAYBOOK MONTH — \"BUY Wk1 (absolute peak ~100), SELL Wk4 — all 3 TFs collapse simultaneously, the highest conviction flip of the year\" (5★).
May: GBP bear — \"steep waterfall continuation from the April peak, all TFs declining, hold short\" (5★).
Jun: GBP chop — \"5-yr sharp bounce to ~80, not confirmed by longer TFs, avoid or short-term only\" (2★).
Jul: GBP chop — \"all 3 TFs volatile and directionless, no reliable signal, avoid\" (1★).
Aug: GBP chop — \"continued chop, no directional bias — late Aug: secondary decline into the Sep trough begins\" (1★).
Sep: GBP bear — \"all 3 TFs declining to the secondary annual trough ~30, clear short window\" (4★).
Oct: GBP bull — \"all 3 TFs recovering from the Sep trough, clean seasonal lift, enter long\" (4★).
Nov: GBP bull — \"40-yr peaks ~75-80, strong bull month — begin watching for Dec weakness late in the month\" (4★).
Dec: GBP bear — \"all TFs decline into year end, 15-yr and 5-yr hit near-annual lows, weak/short bias\" (3★).

=== CAD COMPONENT (bullish CAD = GBPCAD falling, since CAD is inverted) ===
Jan: CAD bear — \"5-yr spikes then immediately collapses, fade the open, structural bear month\" (4★; inverted: bullish for GBPCAD).
Feb: CAD bear — \"all three TFs grinding lower toward the ~50 zone, broad seasonal weakness\" (4★; inverted: bullish for GBPCAD).
Mar: CAD chop/flip — \"40-yr begins recovery from Feb lows, 15-yr still weak, TFs diverging, no clean bias\" (2★; inverted: mildly bearish for GBPCAD).
Apr: CAD bull — \"all TFs rallying, 5-yr spikes to ~85-90 mid-month, strong bull confluence\" (4★; inverted: bearish for GBPCAD).
May: CAD bear — \"40-yr peaks first half of May then rolls over, 5-yr collapses from its April peak\" (4★; inverted: bullish for GBPCAD).
Jun: CAD bear — \"all three TFs near lows, deep seasonal trough zone, hold shorts from May\" (4★; inverted: bullish for GBPCAD).
Jul: CAD's POWERFUL RECOVERY — \"all TFs turning up simultaneously from the June trough, high conviction long, the year's strongest recovery window\" (5★; inverted: powerfully bearish for GBPCAD).
Aug: CAD bull — \"5-yr at or near peak ~90-95, 40-yr continuing higher toward the Sep peak\" (4★; inverted: bearish for GBPCAD).
Sep: CAD's HIGHEST CONVICTION REVERSAL OF ITS ENTIRE YEAR — \"40-yr and 15-yr hit the absolute annual peak ~100 mid-month, then collapse simultaneously — the single most decisive move of CAD's year\" (5★; inverted: bearish for GBPCAD early as CAD peaks, then powerfully bullish as CAD collapses).
Oct: CAD bear — \"sharp post-Sep decline, drops from 100 toward ~75, hold shorts from the Sep flip\" (4★; inverted: bullish for GBPCAD).
Nov: CAD bear — \"continued broad decline toward ~50, bear bias throughout, severity easing late in the month\" (3★; inverted: bullish for GBPCAD).
Dec: CAD chop/base — \"all TFs converge near 0-25, annual low zone, beginning to base, very late year-end recovery begins\" (2★; inverted: similarly without strong directional edge).

=== COMBINED NET EFFECT ===
Jan-Feb: GBP's own low-conviction bearish drift / trough-basing is outweighed by CAD's far stronger structural opening collapse (inverted, bullish for GBPCAD) — CAD's higher conviction carries both months by default, before GBP's own late-Feb recovery begins to add reinforcement into March.
Mar: GBP's single strongest, cleanest bull window of its entire year overwhelms CAD's own messy, low-conviction transition month (inverted, mildly bearish but far weaker) — GBP's overwhelming conviction carries the month outright.
Apr: THE DEFINING PLAYBOOK COLLISION — GBP's historic peak-then-collapse flip month confronts CAD's own strong bull run (inverted, bearish for GBPCAD). Early-month conflict resolves into late-month DOUBLE ALIGNMENT as GBP's collapse confirms — both then point the same direction with maximum conviction.
May: A genuinely contested month — GBP's continuing steep waterfall narrowly outweighs CAD's own strong May decline (inverted, bullish for GBPCAD, the conflicting but slightly weaker signal). GBP's marginally higher conviction carries a close-fought month that fades to neutral by month's end.
Jun: GBP's own choppy, unconfirmed bounce is outweighed by CAD's continuing deep trough (inverted, bullish for GBPCAD) — CAD's higher conviction carries the month by default.
Jul: CAD's powerful recovery from its June trough — its highest-conviction long window of the year — completely overwhelms GBP's own choppy, lowest-conviction stretch of the year. CAD's vastly higher conviction dominates outright.
Aug: GBP's continued directionless chop leaves CAD's own continuing bull run (inverted, bearish for GBPCAD) to dominate by default — until GBP's own late-month secondary decline begins to add reinforcement, setting up September's collision.
Sep: THE DEFINING COLLISION OF THE CALENDAR — GBP's own clear secondary-trough decline collides directly with CAD's single highest-conviction reversal of its entire year (inverted, bearish-then-powerfully-bullish as CAD peaks then collapses). Both currencies stage defining moves of the year in the same month, in directly opposing setups.
Oct-Nov: A clean, sustained DOUBLE ALIGNMENT — GBP's confirmed recovery rally directly reinforces CAD's continuing post-peak collapse (inverted, bullish for GBPCAD) for two consecutive months — one of the calendar's longest aligned long stretches, ending only as GBP's own late-November rollover introduces fresh conflict.
Dec: GBP's own seasonal year-end weakness dominates over CAD's own directionless, low-conviction base-building stretch (inverted, similarly without strong edge) — GBP's clearer, higher-conviction decline carries the calendar to its close.

=== PLAYBOOK SIGNALS ===
GBPCAD HIGHEST CONVICTION LONG: April Wk2-4 (GBP's historic collapse aligns directly with CAD's continuing rally, inverted bearish — a clean double-alignment short turned into the calendar's highest-conviction SHORT, not long — see short signal below) and October-November (GBP's confirmed recovery directly reinforces CAD's post-peak collapse, inverted bullish, the calendar's longest sustained double-alignment long stretch, 4★).
GBPCAD HIGHEST CONVICTION SHORT: April Wk2-4 (GBP's single highest-conviction collapse of the year directly aligns with CAD's continuing rally, inverted bearish — the cleanest, highest-conviction double-alignment trade of the entire calendar, 5★) and July (CAD's single highest-conviction recovery of its year, inverted bearish, completely overwhelms GBP's lowest-conviction stretch, 4-5★).
GBPCAD MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (GBP's continuing waterfall narrowly outduels CAD's own strong decline in a close-fought month) and September (THE DEFINING COLLISION — GBP's clear secondary-trough decline collides with CAD's single highest-conviction reversal of its entire year, both currencies posting defining moves of the year in the same month).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for GBPCAD explaining how the GBP and CAD seasonal forces interact month by month, with special attention to April's playbook collision (resolving into the calendar's cleanest double-alignment short) and September's defining collision (both currencies' highest-conviction reversals of the year colliding head-on).

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (GBP or CAD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction GBPCAD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially April's resolution into a clean double-alignment short, the October-November sustained alignment, and September's defining collision between both currencies' single highest-conviction moves of the year.
`;
