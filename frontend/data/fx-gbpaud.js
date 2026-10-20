/**
 * data/fx-gbpaud.js — GBPAUD Forex Seasonal
 * Derived from: GBP/USD CME futures + AUD/USD CME futures
 * Methodology: GBP seasonal tendency vs inverted AUD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-gbpaud",
  name:     "GBP / AUD",
  sub:      "Forex Seasonal · Derived from GBP CME + AUD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · GBP/USD CME (40-YR) · AUD/USD CME (34-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "GBP's modest opening decline (2★) lines up with AUD's strong seasonal launch into its multi-month bull phase (5★ — inverted bearish for GBPAUD). AUD's high conviction dominates and sets the bearish tone for the opening months.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP drifting lower while AUD lifts off its lows with conviction (inverted bearish, dominant). Both push GBPAUD down — AUD is the controlling force." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD's rally firming (inverted bearish). GBP's weak decline reinforces. Hold shorts." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD continuing to climb (inverted bearish, dominant). GBP nearing its own trough — narrowing offset." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD's high-conviction rally remains the controlling force as GBP bases. Hold into February." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "GBP carves its primary annual trough and begins turning bullish late month (inverted: turning bearish for GBPAUD, conflicting) — but AUD's continuing high-conviction bull run (inverted bearish) remains the dominant, cleaner force throughout.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD still climbing with conviction (inverted bearish, dominant). GBP basing near its lows — no opposition yet." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP forming its base (turning neutral) while AUD's rally continues (inverted bearish). AUD remains in control." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"CONFLICT EMERGING ★★★☆☆", note:"GBP begins its recovery off the trough (bullish, conflicting) just as AUD also continues higher (inverted bearish). Direct conflict forming — AUD's larger structural move still carries more weight." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED / SHORT LEAN ★★☆☆☆", note:"GBP's rally building (bullish, opposing) against AUD's continuing strength (inverted bearish). Two strong trends fighting — reduce size into March's collision." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bear",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "The most violent collision of conviction in the GBPAUD calendar to this point — GBP enters its STRONGEST, CLEANEST BULL WINDOW of its entire year (5★ on its own chart, bullish for GBPAUD) in the exact same month that AUD also surges to its own late-March peak (5★ on its own chart — INVERTED, bearish for GBPAUD). Both currencies post maximum-conviction moves in directly opposing directions — a genuine coin-flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"MAXIMUM CONFLICT ★★★☆☆", note:"GBP's historic bull run accelerating (bullish, 5★) directly against AUD's continuing march toward its own peak (inverted bearish, 5★). Two of the year's highest-conviction moves colliding head-on." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"MAXIMUM CONFLICT ★★★☆☆", note:"GBP surging with full alignment across all TFs while AUD also pushes toward its absolute peak (inverted bearish). Genuinely two-sided — avoid forcing direction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"GBP's final leg into its April peak (bullish) vs AUD nearing its own late-March top (inverted bearish, peaking). Both at near-maximum conviction — the stand-off persists." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED / WATCH ★★★☆☆", note:"GBP approaching its absolute peak; AUD also topping out late March, about to roll into its own violent April flip. Stand by — April will resolve this collision dramatically." },
    ]
  },
  {
    month: "April", sig5: "flip", sig15: "flip", sigLt: "chop",
    combined: "chop", combinedLabel: "DUAL VIOLENT FLIP", stars: 3,
    note: "Both currencies stage the single most violent reversal of their respective years in the SAME month — GBP's PEAK→SELL playbook collapse (5★, bearish for GBPAUD) collides with AUD's own historic long-then-flip-short reversal (5★, inverted — bearish then powerfully bullish for GBPAUD). The most genuinely two-sided, high-volatility month of the entire GBPAUD calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"CONTESTED ★★★☆☆", note:"GBP at its absolute annual peak (bullish, about to collapse) while AUD is still near its own peak (inverted bearish). Both at extremes simultaneously — extreme caution." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"DUAL FLIP / CONFLICT ★★★☆☆", note:"GBP's historic collapse begins (bearish for GBPAUD) at the SAME moment AUD also rolls over hard into its own bear phase (inverted: now bullish for GBPAUD). Two violent reversals in opposite chart-directions producing direct conflict for the pair — extremely volatile, low-edge." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"DUAL FLIP / CONFLICT ★★★☆☆", note:"GBP's waterfall confirmed (bearish) while AUD's bear phase also confirms across all TFs (inverted bullish). Both decisive moves continue to directly oppose — a true coin-flip stretch." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"GBP's playbook SELL Wk4 confirms its collapse (bearish); AUD's waterfall also continues (inverted bullish). Both currencies' defining reversals remain in direct opposition heading into May's second collision." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "The second consecutive maximum-conflict month — GBP's steep waterfall continuation from its April peak (5★, bearish for GBPAUD) collides directly with AUD's own deepest waterfall decline of its entire year (5★ — INVERTED, bullish for GBPAUD). Both currencies post their highest-conviction declines of the year in the same month, in directly opposing directions for the pair.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"GBP's steep decline continuing (bearish, 5★) while AUD's deepest bear leg of its own year accelerates (inverted bullish, 5★). Two highest-conviction declines of the year colliding — a genuine coin-flip." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"MAXIMUM CONFLICT ★★★☆☆", note:"GBP at peak short pressure (bearish) directly opposing AUD's own peak decline (inverted bullish). Both at maximum conviction — avoid forcing direction, expect violent two-way swings." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bull", com:"CONTESTED ★★★☆☆", note:"GBP continuing its decline toward the June trough zone; AUD also approaching its own trough (inverted bullish, easing slightly). The stand-off begins to narrow." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"WATCH ★★☆☆☆", note:"GBP flattening near its base; AUD basing into its own trough (inverted bullish, narrowing further). Both currencies converging toward their respective bases — prepare for clearer signals in June." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own low-conviction, unconfirmed mid-year bounce (2★) is overridden by AUD's continuing trough-formation phase (4★ bearish on its own chart — INVERTED, bullish for GBPAUD, the cleaner and higher-conviction signal). AUD's edge dominates by comparison.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"AUD's decline toward its trough continuing (inverted bullish, the cleaner signal). GBP's 5-yr bounce is unconfirmed by its own longer TFs — AUD dominates." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"bull", com:"LONG LEAN ★★★☆☆", note:"AUD nearing its own trough (inverted bullish). GBP's bounce fading — AUD's higher-conviction signal remains in control." },
      { wk:"Wk 3", s5:"bear", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"AUD basing at its trough (inverted, easing); GBP's bounce rolling over. Both losing momentum — reduce exposure." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both currencies entering directionless patches. Stand aside into July." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "AVOID", stars: 1,
    note: "Both currencies post their lowest-conviction stretches of the year simultaneously — GBP volatile and directionless, AUD also choppy and mixed (inverted, similarly without signal). No clean GBPAUD edge — one of the lowest-conviction windows of the entire calendar.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Both currencies directionless. No edge — stand aside." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"AUD's brief Wk2 bounce creates only noise. GBP equally without conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Still no edge on either side." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"AUD resumes its own decline late month (inverted, mildly bullish) but GBP remains flat and unconfirmed. Light watch only." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 3,
    note: "GBP's own continued chop is overridden by AUD's clean secondary bear leg (4★ bearish on its own chart — INVERTED, bullish for GBPAUD, the cleaner signal). AUD becomes the dominant driver by elimination — a long bias built on AUD's structural decline.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"LONG LEAN ★★★☆☆", note:"AUD declining again (inverted bullish, the cleaner signal). GBP remains directionless — AUD dominates. Enter long." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"LONG LEAN ★★★☆☆", note:"AUD's secondary low forming (inverted bullish). GBP still passive. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"LONG LEAN / WATCH ★★☆☆☆", note:"AUD flattening slightly — its edge over GBP's chop narrows. GBP's own late-month decline beginning to stir, creating early conflict." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"GBP begins its own secondary decline into the September trough (bearish, conflicting with AUD's inverted-bullish pull). Reduce size — September's conflict is forming." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "CONTESTED", stars: 2,
    note: "GBP's decline toward its own secondary annual trough (bearish for GBPAUD, 4★) directly opposes AUD's continuing secondary bear leg (inverted bullish for GBPAUD, also 4★). Two comparable-conviction moves cancel each other out, producing a low-edge, choppy month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"GBP and AUD both declining toward their respective secondary troughs — directly offsetting effects on GBPAUD. No clean edge." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"GBP weakness and AUD weakness (inverted bullish) directly oppose at comparable conviction. Net effect muted — trade small if at all." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"GBP approaching its trough; AUD also nearing its own secondary low. Roughly balanced — avoid forcing direction." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both currencies basing at their respective lows ahead of October's recoveries. Stand aside." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "GBP's confirmed, clean recovery off its September trough (4★ bullish for GBPAUD) finds little opposition from AUD's own directionless base-building phase (2★ — INVERTED, similarly without conviction). GBP's cleaner trend becomes the dominant driver.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP turning up from its September low with conviction (bullish, dominant); AUD remains directionless (inverted, not opposing). Enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP's recovery rally firming (bullish). AUD still basing — GBP fully in control. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP's rally continuing into November while AUD remains directionless. GBP's cleaner trend dominates." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"GBP building into its November peak; AUD still base-building, offering no opposition. Hold into the month of late-developing conflict." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "chop", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG LEAN / TWO-SIDED", stars: 3,
    note: "GBP's continued strength toward its own annual peak ~75–80 (4★ bullish for GBPAUD) dominates the early part of the month — but AUD's late-November turn (all 3 TFs beginning to flip bullish on its own chart, INVERTED bearish for GBPAUD) introduces genuine late-month conflict. A two-sided month that opens cleanly bullish and closes contested.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP's 40-yr and 5-yr both strong, climbing toward the annual peak (bullish, dominant). AUD remains directionless — no opposition yet." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"GBP's strength continuing (bullish). AUD still basing — GBP fully in control through mid-month." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG / WATCH ★★★☆☆", note:"GBP nearing its peak — flattening slightly. AUD's late-month turn beginning to emerge (inverted bearish, early conflict). Begin trimming exposure." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"TWO-SIDED / EXIT ★★☆☆☆", note:"GBP rolling over from its peak (bearish, reversing) exactly as AUD's decisive late-Nov turn confirms (inverted bearish too — both now aligned bearish for GBPAUD). Exit longs — the conflict resolves bearish into December." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "DOUBLE ALIGNMENT — GBP's own seasonal year-end weakness (3★ bearish for GBPAUD) reinforces AUD's confirmed Q1-entry recovery (4★ bullish on its own chart — INVERTED, also bearish for GBPAUD). Both components confirm in the same direction, producing a clean short to close the GBPAUD year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"GBP declining into its year-end weakness (bearish) while AUD's recovery firms (inverted bearish). Double alignment forming — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP's decline deepening (bearish) alongside AUD's confirmed recovery (inverted bearish). Full alignment — hold." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP's 5-yr and 15-yr near annual lows (bearish); AUD continuing its recovery (inverted bearish). Both components reinforcing — press shorts." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP closing the year weak; AUD closing its recovery phase strong (inverted bearish). Double alignment carries into the new year — hold into January's continuation." },
    ]
  },
];

const SEASONAL_DATA = `
GBPAUD — FOREX SEASONAL ANALYSIS
Derived from: GBP/USD CME Futures (40-YR seasonal) + AUD/USD CME Futures (34-YR seasonal)
Methodology: GBP seasonal tendency combined with the inverse of AUD seasonal tendency (GBP is the base currency — direct; AUD is the quote currency — inverted).

=== GBP COMPONENT (bullish GBP = GBPAUD rising) ===
Jan: GBP bearish — declining from December highs (2★, low conviction).
Feb: GBP carves its PRIMARY ANNUAL TROUGH — base forms, turns bullish late month (2★).
Mar: GBP's STRONGEST, CLEANEST BULL WINDOW of the entire year — all 3 TFs surge together from the trough (5★).
Apr: GBP's PEAK→SELL FLIP MONTH — all 3 TFs hit absolute peak ~95–100 simultaneously (Wk1) then collapse violently (5★ — the single most violent reversal of GBP's year).
May: GBP bear — steep waterfall continuation from the April peak (5★).
Jun: GBP chop/mixed — 5-YR sharp bounce unconfirmed by longer TFs (2★).
Jul: GBP chop — volatile, directionless, no reliable signal (1★).
Aug: GBP chop, with a late-month secondary decline beginning (1★).
Sep: GBP bear — declining to its secondary annual trough ~30 (4★).
Oct: GBP bull — recovering cleanly from the September trough (4★).
Nov: GBP bull — 40-YR peaks at its own annual high ~75–80, then rolls over late month (4★).
Dec: GBP bear — declines into year-end seasonal weakness, 5-YR/15-YR hit near-annual lows (3★).

=== AUD COMPONENT (bullish AUD = GBPAUD falling, since AUD is inverted) ===
Jan–Mar: AUD strongly bullish — all TFs aligned, peaking late March around 95–100 (5★; inverted: bearish for GBPAUD, the controlling force of Q1).
Apr: AUD's most critical month — long Wk1 then a violent FLIP SHORT from Wk2, all TFs aligned bearish by Wk3 (5★ — the single most violent reversal of AUD's year; inverted: bearish for GBPAUD early, then powerfully bullish as AUD collapses).
May: AUD's deepest waterfall decline of its own entire year (5★; inverted: bullish for GBPAUD, maximum conviction — directly opposing GBP's own steep decline this same month).
Jun: AUD basing into its trough (4★ on its own chart; inverted: mildly bullish, easing through the month).
Jul: AUD choppy/mixed — brief Wk2 bounce, no clean trend (2★; inverted: similarly choppy).
Aug–Sep: AUD's secondary bear leg — broad decline (4★; inverted: bullish for GBPAUD).
Oct–Nov: AUD base-building — choppy, directionless, turning decisively only in late November (2★; inverted: offers little resistance to GBP's October–November strength, then flips bearish for GBPAUD as AUD turns up).
Dec: AUD's confirmed recovery — all TFs aligned bullish (4★; inverted: bearish for GBPAUD, reinforcing GBP's own year-end weakness).

=== COMBINED NET EFFECT ===
Jan–Feb: GBP's modest opening decline aligns with AUD's powerful seasonal launch (inverted bearish) — AUD's significantly higher conviction dominates and sets a bearish tone, even as GBP begins turning up late February.
Mar: MAXIMUM CONFLICT — GBP enters its strongest, cleanest bull window of the entire year directly against AUD's own march toward its late-March peak (inverted bearish). Both currencies post maximum-conviction moves in directly opposing directions — a genuine coin-flip.
Apr: DUAL VIOLENT FLIP — both currencies stage the single most violent reversal of their respective years in the SAME month. GBP's PEAK→SELL collapse collides with AUD's own historic long-then-flip-short reversal (inverted). The most genuinely two-sided, high-volatility month of the entire calendar.
May: MAXIMUM CONFLICT (round two) — GBP's steep waterfall continuation collides directly with AUD's own deepest waterfall decline of its entire year (inverted bullish). Both currencies post their highest-conviction declines of the year in the same month, in directly opposing directions.
Jun: GBP's own weak, unconfirmed bounce is overridden by AUD's cleaner, higher-conviction trough-formation phase (inverted bullish) — AUD's edge dominates by comparison.
Jul: Both currencies post their lowest-conviction stretches of the year simultaneously — one of the lowest-edge windows of the entire calendar.
Aug: GBP's continued chop is overridden by AUD's clean secondary bear leg (inverted bullish) — AUD dominant by elimination, though GBP's own late-month decline begins introducing early conflict.
Sep: GBP's decline toward its secondary trough directly opposes AUD's continuing secondary bear leg (inverted bullish) at comparable conviction — largely cancel, producing a low-edge, choppy month.
Oct: GBP's confirmed, clean recovery off its trough finds little opposition from AUD's directionless base-building (inverted) — GBP's cleaner trend becomes dominant, net long.
Nov: A genuinely two-sided month — GBP's continued strength toward its own annual peak dominates the early weeks, but AUD's decisive late-November turn (inverted bearish) flips the alignment and resolves the month bearish into December.
Dec: DOUBLE ALIGNMENT — GBP's own seasonal year-end weakness reinforces AUD's confirmed Q1-entry recovery (inverted bearish). Both components confirm in the same direction — a clean short to close the GBPAUD year.

=== PLAYBOOK SIGNALS ===
GBPAUD HIGHEST CONVICTION SHORT: January–February (AUD's powerful seasonal launch dominates, inverted bearish, 4★) and December (double alignment — GBP's year-end weakness + AUD's recovery, both confirm, 4★).
GBPAUD HIGHEST CONVICTION LONG: October (GBP's clean recovery meets AUD's directionless base — GBP's cleaner trend dominates uncontested, 4★).
GBPAUD MOST CONTESTED / REQUIRES CAREFUL FRAMING: March and April and May — three consecutive months where both currencies post maximum-conviction moves of their own years in directly opposing directions for the pair (March: GBP's strongest bull window vs AUD's pre-flip peak; April: both currencies' single most violent reversals of the year colliding; May: both currencies' deepest declines of the year colliding). This three-month stretch is the most genuinely two-sided window of the entire forex seasonal calendar and requires exceptionally careful, balanced framing.

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for GBPAUD explaining how the GBP and AUD seasonal forces interact month by month, with special attention to the extraordinary March–April–May stretch where both currencies repeatedly post maximum-conviction moves in directly opposing directions.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (GBP or AUD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction GBPAUD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — especially the March–May stretch, where both currencies repeatedly move at maximum conviction in directly opposing directions.
`;
