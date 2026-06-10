/**
 * data/fx-gbpnzd.js — GBPNZD Forex Seasonal
 * Derived from: GBP/USD CME futures + NZD/USD CME futures (inverted)
 * Methodology: GBP seasonal tendency vs inverted NZD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-gbpnzd",
  name:     "GBP / NZD",
  sub:      "Forex Seasonal · Derived from GBP CME + NZD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · British Pound CME (40-YR) · New Zealand Dollar CME (23-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own low-conviction bearish drift (\"declining from Dec, no clean trade\", 2★) is outweighed by NZD's own structural opening collapse — \"grinding lower from the new year open, broad seasonal weakness\" (4★ on its own chart — INVERTED, bullish for GBPNZD). NZD's far higher conviction carries the month by default.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"NZD's opening decline underway (inverted bullish, dominant); GBP without a clean signal. NZD's edge controls the early month." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"NZD's decline accelerating (inverted bullish, high conviction); GBP still drifting without edge. NZD's structural weakness carries." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"NZD's broad weakness persisting; GBP approaching its own February trough. Hold long on NZD's edge." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"NZD's decline continuing into February; GBP basing ahead of its own reversal. NZD's structural edge still carries into next month." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own primary annual trough/base-building stretch (\"15-yr near zero, cover shorts and watch for reversal\", 2★) provides little resistance to NZD's continuing structural decline — \"grinding lower, broad seasonal weakness persisting\" (4★ on its own chart — INVERTED, bullish for GBPNZD). NZD's higher conviction continues to dominate by default.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"NZD's decline continuing toward its own March trough (inverted bullish, dominant); GBP near its own annual lows, beginning to base. NZD's structural edge still carries." },
      { wk:"Wk 2", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"NZD approaching its own trough (inverted bullish); GBP's own base-building continuing. Hold long on NZD's edge." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / WATCH ★★☆☆☆", note:"GBP's recovery beginning to confirm — \"all TFs beginning early reversal\" (bullish, now reinforcing); NZD nearing its own trough and turn (inverted, narrowing toward neutral). Both approaching their own reversal points." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's rally confirming — \"enter long, March surge incoming\" (bullish); NZD also turning up from its own trough (inverted bearish, briefly conflicting but minor). GBP's rally dominates as the pair heads into March's collision." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "GBP's STRONGEST AND CLEANEST BULL WINDOW OF ITS ENTIRE YEAR — \"all three TFs surge together from the February trough\" (5★, bullish) — overwhelms NZD's own low-conviction trough-to-recovery transition (\"choppy reversal off the lows, TFs diverging\", 2★ on its own chart — INVERTED, mildly bearish for GBPNZD, the conflicting but far weaker signal). GBP's overwhelming conviction carries the month outright.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP surging with maximum conviction — its single strongest seasonal window of the year (5★, dominant); NZD still near its own lows (inverted bullish, briefly reinforcing). Enter long with full conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP's surge accelerating, all three TFs aligned; NZD's recovery beginning to build (inverted bearish, now mildly opposing but far weaker). GBP's overwhelming edge carries." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP's final leg into its April peak; NZD's own bull build continuing toward its April rally (inverted bearish, still minor opposition). Hold long with maximum conviction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / WATCH ★★★★☆", note:"GBP approaching its absolute peak — begin planning the historic April flip; NZD building toward its own strong April bull window (inverted bearish, narrowing the gap). GBP's edge still carries into April's defining collision." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT — TWO-SIDED COLLISION", stars: 4,
    note: "GBP's DEFINING PLAYBOOK MONTH — \"BUY Wk1 at the absolute peak, then SELL — all 3 TFs collapse, the highest-conviction flip of the year\" (5★) — collides with NZD's own strong bull month (\"all TFs rallying, strong bull confluence\", 4★ on its own chart — INVERTED, bearish for GBPNZD). Early-month conflict (GBP at its peak vs NZD's rally, inverted bearish) resolves into late-month double alignment as GBP's historic collapse confirms.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT / EXIT LONGS ★★★★★", note:"GBP's playbook BUY Wk1 fires — at its absolute annual peak, the single highest-conviction exit point of the year (bullish, about to reverse); NZD's own rally also accelerating (inverted bearish, directly opposing). Exit longs — the historic flip is imminent." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's historic collapse confirms — its highest-conviction short entry of the year (bearish); NZD's rally persisting (inverted bearish, now ALIGNING with GBP's collapse). Both point the same direction — enter short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's waterfall decline accelerating, all TFs aligned bearish; NZD's bull run continuing toward its own May peak (inverted bearish, still reinforcing). Hold short with maximum conviction — clean alignment." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's playbook SELL Wk4 confirmed, declining into May; NZD nearing its own historic May flip (inverted, beginning to transition). The double alignment carries the conviction toward May's defining collision." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT — DEFINING COLLISION", stars: 4,
    note: "A genuine maximum-conviction collision — GBP's continuing steep waterfall — \"steep continuation from the April peak, all TFs declining, hold short, the year's defining bear month\" (5★, bearish) — collides directly with NZD's MOST CRITICAL FLIP MONTH OF ITS ENTIRE YEAR — \"23-YR peaks ~85-90 then collapses, all TFs align bearish by Wk2, the highest-conviction short of NZD's whole year\" (5★ on its own chart — INVERTED: bullish early as NZD peaks, then powerfully bearish as NZD collapses). Both currencies stage their single highest-conviction trade of the year in the same month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's waterfall continuing with peak conviction (bearish); NZD still hovering near its absolute annual peak before the historic collapse (still bullish on its own chart — inverted bearish for GBPNZD, ALIGNING with GBP). Both point the same direction in the opening week — enter short with full conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT — FLIP FIRES ★★★★★", note:"GBP's waterfall persisting with maximum conviction (bearish); NZD's historic flip fires — collapsing from its peak, all TFs aligning bearish on its own chart (inverted: now turning BULLISH for GBPNZD, directly opposing GBP's continuing decline). The two defining moves of the year collide head-on at maximum conviction — avoid forcing size at this historic pivot." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"MAXIMUM CONFLICT ★★★★★", note:"GBP's decline continuing toward its own June trough (bearish); NZD's collapse accelerating with full conviction (inverted bullish, directly opposing GBP). Genuinely two-sided at peak conviction on both sides — the historic stand-off persists." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"CONTESTED — RESOLVING TOWARD NZD ★★★★☆", note:"GBP flattening, beginning to base — its own conviction fading; NZD's collapse persisting toward its own June lows (inverted bullish, still at high conviction). The stand-off begins to resolve as GBP's edge fades and NZD's far higher conviction starts to carry the net into June's clean long." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "NZD's continuing collapse — \"all three TFs near absolute lows, deep waterfall continuation, the year's deepest trough zone\" (5★ on its own chart — INVERTED, powerfully bullish for GBPNZD) — overwhelms GBP's own choppy, unconfirmed bounce (\"5-YR sharp bounce, not confirmed by longer TFs, avoid\", 2★, the conflicting but far weaker signal). NZD's vastly higher conviction dominates outright.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"NZD's waterfall continuing into its absolute lows (inverted bullish, dominant, 5★); GBP's bounce beginning but unconfirmed. NZD's edge takes complete control — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"NZD at its deepest trough, all TFs depressed (inverted bullish, maximum conviction); GBP's bounce still elevated but unconfirmed. Hold long with full conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"NZD's broad weakness persisting near its lows; GBP's bounce rolling over, exit any longs on its own chart. NZD's structural dominance remains intact." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"NZD beginning to stabilise near its lows ahead of its own July bounce (inverted, narrowing slightly); GBP back to chop. NZD's edge still carries into July." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOP — DUAL LOW-CONVICTION", stars: 2,
    note: "Both currencies enter low-conviction, directionless stretches in the same month — GBP's own choppy, lowest-conviction window of its year (1★, \"all 3 TFs volatile, no reliable signal, avoid\") meets NZD's own choppy mid-year bounce (\"mixed/choppy recovery off the June lows, no clean direction\", 3★ on its own chart — INVERTED, mild bearish lean but unconfirmed). NZD's marginally higher conviction offers a faint lean, but neither component provides a workable edge.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL / AVOID ★★☆☆☆", note:"GBP directionless; NZD's choppy bounce beginning but unconfirmed (inverted, faint bearish lean). Avoid forcing a trade in the dual-chop zone." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"GBP's chop persisting; NZD's bounce continuing but still mixed across TFs (inverted, faint lean only). Stand aside — neither offers conviction." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"GBP still without signal; NZD's recovery beginning to firm — \"building toward its August/September peak\" (inverted bearish, now leading). NZD's emerging edge starts to carry the pair." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"GBP's late-month secondary decline beginning to add reinforcement (now bearish, aligning); NZD's recovery building toward its peak (inverted bearish, still leading). Both beginning to align bearish into August." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "NZD's continuing recovery — \"recovering toward its September secondary peak, all TFs building higher\" (4★ on its own chart — INVERTED, bearish for GBPNZD) — dominates over GBP's own continued directionless chop, with GBP's own late-month secondary decline beginning to add reinforcement late in the period. NZD's higher conviction carries the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's recovery rally building toward its secondary peak (inverted bearish, dominant); GBP directionless, offering no resistance. NZD's edge carries the early month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's bull run continuing with rising conviction (inverted bearish); GBP's chop persisting. Hold short on NZD's structural edge." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"NZD nearing its own September peak before its own flip (inverted bearish, still dominant); GBP's own late-month secondary decline beginning (now reinforcing). Both starting to align bearish." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"NZD nearing its own secondary peak before its historic September flip (inverted bearish, still dominant); GBP's own secondary decline confirming (bearish, aligning). Both currencies now reinforcing into September's two-sided resolution." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT — TWO-SIDED", stars: 3,
    note: "GBP's own clear secondary-trough decline (\"all 3 TFs declining to the secondary annual trough ~30, clear short window\", 4★, bearish) initially aligns with NZD's still-rising recovery — \"secondary peak forms ~80-85 mid-month, 5-YR peaks first as an early warning\" (4★ on its own chart — INVERTED, bearish for GBPNZD as NZD strengthens) — before NZD's own historic flip mid-month (\"exit longs Wk2, flip short mid-September\", inverted: turning bullish for GBPNZD as NZD reverses) introduces fresh, genuinely two-sided conflict late in the month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's decline continuing toward its trough (bearish); NZD still rising toward its secondary peak (inverted bearish, both aligned). Enter short on the early alignment." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT — NZD FLIP FIRES ★★★★☆", note:"GBP continuing its decline; NZD's historic flip fires — its 5-YR peaking first as an early warning, exit longs (inverted: beginning to turn bullish for GBPNZD, opposing GBP's continuing weakness). Genuinely two-sided as NZD's reversal collides with GBP's continuing decline." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"GBP nearing its own trough, beginning to base; NZD's flip confirming — turning short on its own chart (inverted bullish for GBPNZD, now directly opposing GBP's basing). The two-sided conflict persists." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"GBP's recovery beginning to confirm (bullish, now reinforcing); NZD's post-flip decline accelerating (inverted bullish, now ALIGNING with GBP's turn). Both beginning to align bullish — the conflict resolves toward October's clean alignment." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 4,
    note: "A clean, confirmed alignment — GBP's own clean recovery rally — \"all 3 TFs recovering from the September trough, clean seasonal lift, enter long\" (4★, bullish) — directly reinforces NZD's continuing post-flip collapse — \"sharp post-peak waterfall, broad declines across all TFs\" (4★ on its own chart — INVERTED, bullish for GBPNZD). Both components point the same direction — one of the calendar's cleanest long windows.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP turning up from its September low (bullish, confirmed entry); NZD's collapse continuing with high conviction (inverted bullish, fully aligned). Enter long on the clean double alignment." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"GBP's recovery rally underway, hold; NZD's broad post-peak decline persisting (inverted bullish, still reinforcing). Both fully aligned — hold long with high conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's strength continuing into November; NZD's decline persisting, no relief (inverted bullish, still aligned). The clean alignment carries." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP building into its own November peak; NZD's late-October decline continuing (inverted bullish, still reinforcing). Both currencies' aligned trends carry into November." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "CONTESTED — TWO-SIDED LEAN LONG", stars: 3,
    note: "GBP's own strong bull month — \"40-yr peaks ~75-80 in November, strong bull month\" (4★, bullish) — initially extends October's alignment against NZD's continuing decline (inverted bullish for GBPNZD), before NZD's own \"late-Nov base-building, Wk4 turn up — enter long for the December rally\" (inverted: beginning to turn bearish for GBPNZD as NZD strengthens late) introduces fresh two-sided conflict heading into December's defining collision.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's 40-yr and 5-yr both strong, hold longs (bullish); NZD's continued post-flip decline persisting (inverted bullish, still reinforcing). October's alignment carries straight through." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP's strength continuing toward its 40-yr peak; NZD's mid-November weakness persisting (inverted bullish, still aligned). Hold long with confidence." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"GBP's 40-yr nearing its peak, beginning to flatten; NZD's late-month base-building beginning — \"continued weakness, late Nov begins to turn\" (inverted, narrowing toward neutral). Watch for both currencies' approaching turns." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"bear", com:"CONFLICT ★★★☆☆", note:"GBP's historic rollover confirms — \"all TFs rolling, exit longs, December weakness begins\" (now bearish); NZD's \"Wk4 turn up — enter long for the December rally\" also confirms (inverted bearish for GBPNZD as NZD strengthens, now ALIGNING with GBP's flip — both currencies turning bearish for the pair simultaneously, setting up December's defining collision)." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "MAXIMUM CONFLICT — DEFINING YEAR-END COLLISION", stars: 4,
    note: "THE DEFINING COLLISION OF THE GBPNZD CALENDAR — GBP's own seasonal year-end weakness (\"all TFs decline into year end, near-annual lows, weak/short bias\", 3★, bearish) directly ALIGNS with NZD's MASSIVE YEAR-END RALLY — \"strongest month of NZD's entire year, surges toward ~95-100, all TFs aligned, the single highest-conviction long of NZD's whole year\" (5★ on its own chart — INVERTED, powerfully bearish for GBPNZD). Both currencies post defining year-end moves — GBP declining, NZD surging (inverted, also bearish) — producing a clean, high-conviction DOUBLE-ALIGNMENT close.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP's decline confirming — \"all TFs declining, short bias confirmed\" (bearish); NZD's historic rally beginning to build with rising conviction (inverted bearish, fully aligned). Enter short on the powerful double alignment." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's weakness continuing; NZD's surge accelerating toward its absolute annual peak (inverted bearish, maximum conviction). Both fully aligned — hold short with the year's highest conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's decline persisting toward its near-annual lows; NZD's historic rally continuing with full conviction across all TFs (inverted bearish, still aligned). Hold short — the calendar's defining collision is now a clean, powerful alignment." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★☆", note:"GBP closing the year near its lows; NZD's surge persisting through month-end — \"hold longs through month end\" on its own chart (inverted bearish, still reinforcing). Both currencies' defining year-end moves close the calendar in clean, high-conviction alignment." },
    ]
  },
];

const SEASONAL_DATA = `
GBPNZD — FOREX SEASONAL ANALYSIS
Derived from: British Pound CME Futures (40-YR seasonal) + New Zealand Dollar CME Futures (23-YR seasonal)
Methodology: GBP seasonal tendency combined with the inverse of NZD seasonal tendency (GBP is the base currency — direct; NZD is the quote currency — inverted, since NZD strength means fewer NZD per unit of GBP).

=== GBP COMPONENT (bullish GBP = GBPNZD rising) ===
Jan: GBP bear — \"declining from Dec highs, 40-yr and 15-yr lower, no clean trade\" (2★).
Feb: GBP chop — \"primary annual trough, 15-yr near zero, cover shorts and watch for reversal\" (2★).
Mar: GBP's STRONGEST AND CLEANEST BULL WINDOW OF THE YEAR — \"all 3 TFs surge together from the Feb trough\" (5★).
Apr: GBP's DEFINING PLAYBOOK MONTH — \"BUY Wk1 (absolute peak), SELL Wk4 — all 3 TFs collapse, the highest conviction flip of the year\" (5★).
May: GBP bear — \"steep waterfall continuation from the April peak, all TFs declining, the year's defining bear month\" (5★).
Jun: GBP chop — \"5-yr sharp bounce, not confirmed by longer TFs, avoid\" (2★).
Jul: GBP chop — \"all 3 TFs volatile and directionless, no reliable signal, avoid\" (1★).
Aug: GBP chop — \"continued chop, no directional bias — late Aug secondary decline into the Sep trough begins\" (1★).
Sep: GBP bear — \"all 3 TFs declining to the secondary annual trough ~30, clear short window\" (4★).
Oct: GBP bull — \"all 3 TFs recovering from the Sep trough, clean seasonal lift, enter long\" (4★).
Nov: GBP bull — \"40-yr peaks ~75-80, strong bull month, begin watching for Dec weakness\" (4★).
Dec: GBP bear — \"all TFs decline into year end, near-annual lows, weak/short bias\" (3★).

=== NZD COMPONENT (bullish NZD = GBPNZD falling, since NZD is inverted) ===
Jan: NZD bear — \"opening collapse, grinding lower, broad seasonal weakness\" (4★; inverted: bullish for GBPNZD).
Feb: NZD bear — \"continued grinding decline toward the March trough\" (4★; inverted: bullish for GBPNZD).
Mar: NZD chop/flip — \"troughs then reverses, choppy transition off the lows\" (2★; inverted: mildly bearish for GBPNZD).
Apr: NZD bull — \"strong rally to ~85-90, all TFs rallying together\" (4★; inverted: bearish for GBPNZD).
May: NZD's MOST CRITICAL FLIP MONTH OF ITS ENTIRE YEAR — \"23-YR peaks ~85-90 then collapses, all TFs align bearish by Wk2, the highest-conviction short of NZD's whole year\" (5★; inverted: bullish early at the NZD peak, then powerfully bearish as NZD collapses).
Jun: NZD bear — \"near absolute lows, deep waterfall continuation, the year's deepest trough zone\" (5★; inverted: powerfully bullish for GBPNZD).
Jul: NZD chop — \"choppy, mixed bounce off the lows, no clean direction\" (3★; inverted: faint bearish lean, unconfirmed).
Aug: NZD bull — \"recovery building toward the September secondary peak\" (4★; inverted: bearish for GBPNZD).
Sep: NZD's SECONDARY FLIP MONTH — \"secondary peak ~80-85 mid-month, 5-YR peaks first as an early warning, exit longs Wk2, flip short mid-September\" (4★; inverted: bearish early as NZD strengthens toward its peak, then bullish for GBPNZD as NZD reverses short).
Oct: NZD bear — \"sharp post-peak waterfall, broad declines across all TFs\" (4★; inverted: bullish for GBPNZD).
Nov: NZD bear — \"continued weakness, late-Nov begins to base, Wk4 turn up — enter long for the December rally\" (3★; inverted: bullish for GBPNZD early, turning bearish late as NZD's Wk4 reversal builds).
Dec: NZD's STRONGEST MONTH OF ITS ENTIRE YEAR — \"surges toward ~95-100, all TFs aligned, the single highest-conviction long of NZD's whole year, hold longs through month end\" (5★; inverted: powerfully bearish for GBPNZD).

=== COMBINED NET EFFECT ===
Jan-Feb: GBP's own low-conviction bearish drift / trough-basing is outweighed by NZD's own structural opening collapse (inverted, bullish for GBPNZD) — NZD's far higher conviction carries both months by default, before GBP's own late-Feb recovery begins to add reinforcement into March.
Mar: GBP's single strongest, cleanest bull window of its year overwhelms NZD's own low-conviction trough-to-recovery transition (inverted, mildly bearish but far weaker) — GBP's overwhelming conviction carries the month outright.
Apr: THE PLAYBOOK COLLISION — GBP's historic peak-then-collapse flip month confronts NZD's own strong bull run (inverted, bearish for GBPNZD). Early-month conflict resolves into late-month DOUBLE ALIGNMENT as GBP's collapse confirms — both then point the same direction with maximum conviction.
May: THE DEFINING COLLISION OF THE FIRST HALF — GBP's continuing steep waterfall (its own defining bear month) collides directly with NZD's single most critical flip month of its entire year (inverted, bullish-then-powerfully-bearish as NZD peaks then collapses). Both currencies stage their single highest-conviction trade of the year in the same month — a genuine maximum-conflict, two-sided collision.
Jun: NZD's continuing collapse into its deepest annual trough (inverted, powerfully bullish for GBPNZD) overwhelms GBP's own choppy, unconfirmed bounce — NZD's vastly higher conviction dominates outright.
Jul: A DUAL LOW-CONVICTION MONTH — GBP's own lowest-conviction stretch of the year meets NZD's own choppy, mixed mid-year bounce — neither component offers a workable edge, though NZD's marginal lean begins to build toward August's clearer dominance.
Aug: NZD's continuing recovery toward its secondary peak (inverted, bearish for GBPNZD) dominates over GBP's continued chop, with GBP's own late-month secondary decline beginning to add reinforcement.
Sep: A genuinely TWO-SIDED month — GBP's secondary-trough decline initially aligns with NZD's still-rising recovery (inverted, bearish for GBPNZD), before NZD's own historic mid-month flip (inverted, turning bullish for GBPNZD) collides with GBP's continuing weakness, producing fresh late-month conflict that resolves only as GBP itself turns at month's end.
Oct: A clean, confirmed DOUBLE ALIGNMENT — GBP's recovery rally directly reinforces NZD's continuing post-flip collapse (inverted, bullish for GBPNZD) — one of the calendar's cleanest long windows.
Nov: October's alignment initially extends, before NZD's own late-month base-building and Wk4 reversal (inverted, beginning to turn bearish for GBPNZD) introduces fresh two-sided conflict that ultimately ALIGNS with GBP's own late-month rollover — both currencies turning bearish for the pair simultaneously, setting up December's defining collision.
Dec: THE DEFINING COLLISION OF THE GBPNZD CALENDAR — GBP's own seasonal year-end weakness directly ALIGNS with NZD's single highest-conviction long of its entire year (inverted, powerfully bearish for GBPNZD as NZD surges) — both currencies post defining year-end moves that, remarkably, point the SAME direction for the pair, producing a clean, maximum-conviction double-alignment close.

=== PLAYBOOK SIGNALS ===
GBPNZD HIGHEST CONVICTION LONG: June (NZD's deepest annual trough, inverted bullish, overwhelms GBP's own weak bounce, 4-5★) and October (GBP's confirmed recovery rally directly reinforces NZD's continuing post-flip collapse, inverted bullish, a clean double-alignment long, 4★).
GBPNZD HIGHEST CONVICTION SHORT: April Wk2-4 (GBP's single highest-conviction collapse of its year aligns directly with NZD's continuing rally, inverted bearish — a clean, powerful double-alignment short, 5★) and December (THE DEFINING COLLISION — both currencies post the single highest-conviction move of their respective years, and remarkably both point the SAME direction for the pair, producing the calendar's cleanest, highest-conviction double-alignment short, 4★).
GBPNZD MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (MAXIMUM CONFLICT — both currencies stage their single highest-conviction trade of the year in the same month, in directly opposing setups, a genuine two-sided collision) and September (GBP's secondary-trough decline collides with NZD's own historic mid-month flip, producing genuinely two-sided risk).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for GBPNZD explaining how the GBP and NZD seasonal forces interact month by month, with special attention to May's maximum-conflict collision (both currencies' single highest-conviction trades of the year colliding head-on) and December's remarkable defining collision where both currencies' defining year-end moves point the SAME direction for the pair.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (GBP or NZD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction GBPNZD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially May's two-sided collision of both currencies' defining annual moves, the June-through-October stretch of clean dominant-component resolutions, and December's remarkable same-direction collision that closes the calendar at maximum conviction.
`;
