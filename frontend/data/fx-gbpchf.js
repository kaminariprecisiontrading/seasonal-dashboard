/**
 * data/fx-gbpchf.js — GBPCHF Forex Seasonal
 * Derived from: GBP/USD CME futures + CHF/USD CME futures
 * Methodology: GBP seasonal tendency vs inverted CHF seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-gbpchf",
  name:     "GBP / CHF",
  sub:      "Forex Seasonal · Derived from GBP CME + CHF CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · GBP/USD CME (40-YR) · CHF/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "DOUBLE ALIGNMENT — GBP's own opening decline (2★) reinforces CHF's own opening bear leg (3★ on its own chart — INVERTED, also bearish for GBPCHF). Both components confirm the same direction, giving a clean if modest-conviction short to open the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP drifting lower; CHF also declining toward its own trough (inverted bearish). Both align — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Both components continue lower in tandem. Hold." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP nearing its own base; CHF still declining (inverted bearish, dominant). Maintain shorts." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP basing; CHF's bear leg carries the month into its conclusion. Hold into February." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "GBP forms its primary annual trough and starts turning bullish late month (conflicting), but CHF's continuing decline toward its own annual trough (inverted bearish, the cleaner and more decisive signal) keeps the net bias short.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF still declining toward its trough (inverted bearish, dominant). GBP basing — no opposition yet." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF approaching its annual low (inverted bearish). GBP turning neutral. CHF remains in control." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bear", com:"CONFLICT EMERGING ★★☆☆☆", note:"GBP begins its recovery (bullish, conflicting) while CHF nears its trough. Early conflict forming — reduce size." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"GBP's rally building; CHF basing at its own trough ahead of its violent March flip. Both about to turn — stand by for March's collision." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "DUAL FLIP / CONFLICT", stars: 2,
    note: "GBP's STRONGEST, CLEANEST BULL WINDOW of its entire year (5★, bullish) opens directly against CHF's own ANNUAL-TROUGH FLIP — CHF carves its lowest point of the year then reverses sharply higher (4★ on its own chart — INVERTED, bearish for GBPCHF). Two flips/extremes in the same month produce the year's choppiest, lowest-edge transition.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"GBP's historic bull run launching (bullish, 5★) while CHF carves its annual trough (inverted: still bullish for GBPCHF at this point, briefly aligned)." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"GBP surging; CHF's sharp reversal off its trough begins (inverted bearish, now opposing). Conflict intensifies." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"DUAL FLIP / CONFLICT ★★☆☆☆", note:"GBP continuing its surge (bullish) directly against CHF's confirmed reversal higher (inverted bearish). The year's most genuinely two-sided, lowest-edge week." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"GBP nearing its peak; CHF's recovery firming (inverted bearish). Stand-off persists into April." },
    ]
  },
  {
    month: "April", sig5: "flip", sig15: "flip", sigLt: "bull",
    combined: "chop", combinedLabel: "CONTESTED", stars: 3,
    note: "GBP's PEAK→SELL playbook collapse — the single most violent reversal of GBP's entire year (5★, bearish for GBPCHF) — collides with CHF's continuing recovery off its March trough (3★ on its own chart — INVERTED, also bearish). Late month the two re-converge as GBP confirms its waterfall and CHF's recovery matures, narrowing the conflict into a clearer bearish resolution.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"GBP at its absolute peak (bullish, about to collapse) while CHF's recovery continues (inverted bearish). Both moving — opposing for now." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT EMERGING ★★★★☆", note:"GBP's historic collapse begins (bearish) — and now aligns WITH CHF's recovery (inverted bearish). The conflict resolves into alignment — enter short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's waterfall confirmed across all TFs (bearish, 5★) directly reinforcing CHF's continuing recovery (inverted bearish). Full alignment at high conviction — press shorts." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP's playbook SELL Wk4 confirms (bearish); CHF's recovery still climbing (inverted bearish). One of the cleanest, highest-conviction short windows of the GBPCHF year." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "DOUBLE ALIGNMENT continues — GBP's steep waterfall continuation from its April peak (5★ bearish) reinforces CHF's continuing recovery toward its own May peak (4★ on its own chart — INVERTED, also bearish for GBPCHF). Both components confirm at high conviction.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"GBP's decline accelerating (bearish, 5★) alongside CHF's continuing rally toward its own peak (inverted bearish). Full alignment, maximum conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CHF's 5-yr spikes toward its absolute peak ~100 (inverted bearish, near-maximum conviction) while GBP continues its waterfall. Press shorts hard." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF nearing its peak — about to flip (inverted bearish, peaking). GBP still declining. Both still aligned — hold, but prepare for CHF's looming reversal." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"CHF's CRITICAL FLIP SHORT emerges late month (inverted: now turning bullish for GBPCHF, introducing conflict). GBP still bearish. Trim into June's transition." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "CHF's post-May waterfall decline (4★ bearish on its own chart — INVERTED, bullish for GBPCHF, the cleaner signal) overrides GBP's own weak, unconfirmed mid-year bounce (2★). CHF's sharper move dominates by comparison.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CHF's post-peak collapse accelerating (inverted bullish, the cleaner signal). GBP's bounce unconfirmed — CHF dominates." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"CHF continuing its waterfall (inverted bullish). GBP's bounce fading. Hold long." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF's decline easing slightly but still the dominant force (inverted bullish). GBP directionless." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF approaching its own trough zone (inverted, still mildly bullish). GBP remains passive — CHF carries the month." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bear", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 2,
    note: "CHF's continuing decline near its multi-month trough zone (3★ bearish on its own chart — INVERTED, bullish for GBPCHF) edges out GBP's own lowest-conviction, most directionless month (1★). CHF dominates by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF still declining near its trough (inverted bullish). GBP volatile and directionless — CHF the only source of edge." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF's trough zone persists (inverted bullish). GBP remains without signal." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bull", com:"LONG LEAN ★★☆☆☆", note:"CHF basing near its lows (inverted, mildly bullish). GBP still chopping." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★☆☆☆☆", note:"CHF's edge narrowing as it bases; GBP's own secondary decline beginning to stir. Reduce exposure into August." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "CHF's recovery beginning off its trough (3★ bullish on its own chart — INVERTED, bearish for GBPCHF) overrides GBP's own continued chop and emerging secondary decline. CHF's clearer turn becomes the controlling force.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF's recovery off its trough beginning (inverted bearish, the cleaner signal). GBP also weakening — both align bearish." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF's recovery firming (inverted bearish); GBP's secondary decline continuing. Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"Both components now aligned bearish — CHF's recovery (inverted) and GBP's own decline reinforce. Press." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP nearing its September trough; CHF's recovery continuing (inverted bearish). Both still aligned — hold into September." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED", stars: 3,
    note: "GBP's decline toward its secondary annual trough (4★ bearish for GBPCHF) collides with CHF's HIGHEST-CONVICTION REVERSAL of its own entire year — its 15-yr spikes to an absolute peak then collapses (5★ on its own chart — INVERTED, this flips from bearish to powerfully bullish for GBPCHF mid-month). A genuinely two-sided, high-volatility transition month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP declining toward its trough (bearish); CHF's 15-yr still near its peak (inverted bearish, briefly aligned). Short bias intact early." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"DUAL FLIP / CONFLICT ★★☆☆☆", note:"CHF's HIGHEST-CONVICTION REVERSAL of its year fires — its 15-yr collapses from its peak (inverted: flips to bullish for GBPCHF) directly against GBP's continuing decline (bearish). Violent two-sided week." },
      { wk:"Wk 3", s5:"bear", s15:"bull", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"CHF's collapse accelerating (inverted bullish, high conviction) opposing GBP's continuing weakness (bearish). Genuinely two-sided — avoid forcing direction." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"LONG LEAN / WATCH ★★☆☆☆", note:"CHF's collapse dominant by month's end (inverted bullish, highest conviction reversal of its year); GBP basing at its trough. CHF's higher-conviction move begins to take control heading into October." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "DOUBLE ALIGNMENT / LONG", stars: 5,
    note: "THE CLEANEST DOUBLE-ALIGNMENT WINDOW OF THE YEAR — GBP's confirmed recovery off its September trough (4★ bullish) reinforces CHF's continuing post-peak decline from its own September collapse (4★ bearish on its own chart — INVERTED, also bullish for GBPCHF). Both components point the same direction with high conviction — the standout long of the GBPCHF calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"GBP turning up from its trough (bullish) while CHF's post-collapse decline continues (inverted bullish). Full alignment — enter long with conviction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"GBP's recovery firming; CHF's decline persisting (inverted bullish). Both reinforcing — press longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★★", note:"GBP's rally accelerating; CHF continuing its post-peak waterfall (inverted bullish). The cleanest, highest-conviction stretch of the GBPCHF year." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"DOUBLE ALIGNMENT / LONG ★★★★☆", note:"GBP building toward its November peak; CHF's decline continuing (inverted bullish). Hold the standout long into November." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's continued strength toward its own annual peak ~75–80 (4★ bullish) outweighs CHF's emerging FLIP LONG — CHF's 40-yr begins its massive year-end rally (4★ bullish on its own chart — INVERTED, bearish for GBPCHF, introducing late-month conflict). GBP's higher early-month conviction carries the net bias long, though the month closes contested.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP climbing toward its annual peak (bullish, dominant). CHF still declining early month (inverted bullish, briefly aligned)." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP's strength continuing. CHF beginning its FLIP LONG — early signs of reversal (inverted: starting to turn bearish for GBPCHF). Conflict emerging." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"CONFLICT / TRIM ★★☆☆☆", note:"GBP nearing its peak, flattening; CHF's reversal confirming (inverted bearish). Direct conflict — begin trimming." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"bear", com:"TWO-SIDED / EXIT ★★☆☆☆", note:"GBP rolling over from its peak (bearish, reversing); CHF's year-end rally accelerating (inverted bearish too). Both now aligned bearish — exit longs, the month resolves into December's short." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "DOUBLE ALIGNMENT / SHORT", stars: 5,
    note: "DOUBLE ALIGNMENT AT MAXIMUM CONVICTION — GBP's own seasonal year-end weakness (3★ bearish) reinforces CHF's HIGHEST-CONVICTION LONG OF ITS ENTIRE YEAR — its 40-yr rockets to an absolute peak ~100 at Dec 31 (5★ on its own chart — INVERTED, powerfully bearish for GBPCHF). Both components confirm in the same direction at the year's highest conviction — the standout short to close the GBPCHF calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"GBP declining into its year-end weakness (bearish) while CHF's rocket-rally accelerates (inverted bearish, highest conviction of its year). Full alignment — enter short with conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"CHF's 40-yr surging toward its absolute peak (inverted bearish, maximum conviction); GBP continuing its decline. Press shorts hard." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"CHF nearing its absolute peak ~100 (inverted bearish, highest-conviction long of its entire year); GBP's 5-yr/15-yr near annual lows. Both at maximum conviction in full alignment." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"DOUBLE ALIGNMENT / SHORT ★★★★★", note:"CHF closes the year at its absolute peak (inverted bearish, maximum conviction); GBP closes weak. The single highest-conviction, cleanest-alignment trade of the entire GBPCHF year — a textbook close to the calendar." },
    ]
  },
];

const SEASONAL_DATA = `
GBPCHF — FOREX SEASONAL ANALYSIS
Derived from: GBP/USD CME Futures (40-YR seasonal) + CHF/USD CME Futures (40-YR seasonal)
Methodology: GBP seasonal tendency combined with the inverse of CHF seasonal tendency (GBP is the base currency — direct; CHF is the quote currency — inverted).

=== GBP COMPONENT (bullish GBP = GBPCHF rising) ===
Jan: GBP bearish — declining from December highs (2★, low conviction).
Feb: GBP carves its PRIMARY ANNUAL TROUGH — base forms, turns bullish late month (2★).
Mar: GBP's STRONGEST, CLEANEST BULL WINDOW of the entire year — all 3 TFs surge together (5★).
Apr: GBP's PEAK→SELL FLIP MONTH — all 3 TFs hit absolute peak ~95–100 (Wk1) then collapse violently (5★ — single most violent reversal of GBP's year).
May: GBP bear — steep waterfall continuation from the April peak (5★).
Jun: GBP chop/mixed — 5-YR sharp bounce unconfirmed (2★).
Jul: GBP chop — volatile, directionless (1★).
Aug: GBP chop, secondary decline beginning late month (1★).
Sep: GBP bear — declining to its secondary annual trough ~30 (4★).
Oct: GBP bull — recovering cleanly from the September trough (4★).
Nov: GBP bull — 40-YR peaks at its own annual high ~75–80, rolls over late month (4★).
Dec: GBP bear — declines into year-end seasonal weakness (3★).

=== CHF COMPONENT (bullish CHF = GBPCHF falling, since CHF is inverted) ===
Jan–Feb: CHF bear — declining from ~75 toward its annual trough ~5–10 (3–4★; inverted: bearish for GBPCHF).
Mar: CHF's ANNUAL-TROUGH FLIP — carves its lowest point of the year (~5–10) then reverses sharply higher (4★ — a critical flip; inverted: bullish then bearish for GBPCHF as CHF turns up).
Apr–May: CHF bull recovery — climbing strongly, 5-yr spikes toward its absolute peak ~100 mid-May (5★; inverted: bearish for GBPCHF, near-maximum conviction).
May (late)–Jun: CHF's CRITICAL FLIP SHORT — peaks then reverses into a post-peak waterfall decline (5★; inverted: bullish for GBPCHF).
Jul: CHF bear — continuing decline, near multi-month lows / trough zone (3★; inverted: bullish for GBPCHF).
Aug: CHF bull — recovery begins off its trough (3★; inverted: bearish for GBPCHF).
Sep: CHF's HIGHEST-CONVICTION REVERSAL of its entire year — 15-yr spikes to an absolute peak ~100 then collapses violently (5★; inverted: bearish then powerfully bullish for GBPCHF mid-month).
Oct: CHF bear — continuing its post-peak decline from the September collapse (4★; inverted: bullish for GBPCHF).
Nov: CHF's FLIP LONG — its 40-yr begins its massive year-end rally, BEAR early Nov flips to LONG (4★; inverted: bullish then bearish for GBPCHF as CHF turns up).
Dec: CHF's HIGHEST CONVICTION LONG OF THE YEAR — 40-yr rockets to its absolute peak ~100 at Dec 31 (5★; inverted: powerfully bearish for GBPCHF, maximum conviction).

=== COMBINED NET EFFECT ===
Jan: DOUBLE ALIGNMENT — GBP's opening decline reinforces CHF's own bear leg (inverted bearish). Clean, modest-conviction short.
Feb: GBP's primary-trough turn (conflicting) is outweighed by CHF's continuing, cleaner decline toward its own trough (inverted bearish) — net short lean.
Mar: DUAL FLIP / CONFLICT — GBP's strongest bull window of the year opens directly against CHF's annual-trough flip and sharp reversal higher (inverted bearish). The choppiest, lowest-edge transition month of the year.
Apr: Early conflict resolves into DOUBLE ALIGNMENT by mid-month — GBP's historic collapse (the single most violent reversal of its year) reinforces CHF's continuing recovery (inverted bearish). One of the cleanest, highest-conviction short windows of the year.
May: DOUBLE ALIGNMENT continues at maximum conviction — GBP's waterfall continuation reinforces CHF's continuing rally toward its own absolute peak (inverted bearish) — until CHF's late-month critical flip introduces late conflict.
Jun: CHF's sharper post-peak waterfall decline (inverted bullish) overrides GBP's own weak, unconfirmed bounce — net long lean.
Jul: CHF's continuing decline near its trough (inverted bullish) edges out GBP's lowest-conviction, most directionless month — long lean by elimination.
Aug: CHF's recovery off its trough (inverted bearish) overrides GBP's continued chop and emerging secondary decline — both ultimately align bearish, net short lean.
Sep: CONTESTED / DUAL FLIP — GBP's decline toward its secondary trough collides with CHF's highest-conviction reversal of its entire year (inverted, flips from bearish to powerfully bullish mid-month). Genuinely two-sided, high-volatility month.
Oct: DOUBLE ALIGNMENT, the cleanest of the year — GBP's confirmed recovery reinforces CHF's continuing post-peak decline (inverted bullish). The standout long of the GBPCHF calendar.
Nov: GBP's continued strength toward its own peak outweighs CHF's emerging flip-long reversal (inverted bearish) early, but the month closes contested as both ultimately align bearish into December.
Dec: DOUBLE ALIGNMENT AT MAXIMUM CONVICTION — GBP's year-end weakness reinforces CHF's highest-conviction long of its entire year (inverted, powerfully bearish). The standout short closing the GBPCHF year.

=== PLAYBOOK SIGNALS ===
GBPCHF HIGHEST CONVICTION SHORT: December (double alignment at maximum conviction — GBP's year-end weakness + CHF's highest-conviction long of its entire year, inverted bearish, 5★) and April (double alignment — GBP's most violent reversal of its year + CHF's recovery, both confirm bearish, 5★ by Wk3-4).
GBPCHF HIGHEST CONVICTION LONG: October (double alignment, the cleanest of the year — GBP's confirmed recovery + CHF's continuing post-peak decline, both confirm bullish, 5★).
GBPCHF MOST CONTESTED / REQUIRES CAREFUL FRAMING: March (DUAL FLIP — GBP's strongest bull window collides with CHF's annual-trough reversal, the year's choppiest transition) and September (GBP's secondary-trough decline collides with CHF's single highest-conviction reversal of its entire year, a violent two-sided month).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for GBPCHF explaining how the GBP and CHF seasonal forces interact month by month, with special attention to the standout double-alignment windows (April, October, December) and the genuinely contested transition months (March, September).

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (GBP or CHF) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction GBPCHF trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts and double-alignment windows explicitly — especially March's dual-flip transition and December's maximum-conviction alignment closing the year.
`;
