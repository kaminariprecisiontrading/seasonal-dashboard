/**
 * data/fx-euraud.js — EURAUD Forex Seasonal
 * Derived from: EUR/USD CME futures + AUD/USD CME futures
 * Methodology: EUR seasonal tendency vs inverted AUD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-euraud",
  name:     "EUR / AUD",
  sub:      "Forex Seasonal · Derived from EUR CME + AUD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · AUD/USD CME (34-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "EUR's structural January bear month (selling its own Jan 1 spike) lines up with AUD's strongest seasonal window (inverted bearish for EURAUD). Full double alignment — highest conviction short to open the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR fading its own open spike while AUD lifts off its lows (inverted bearish). Both push EURAUD down — sell the open." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR declining, AUD climbing (inverted bearish). Full alignment — hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Continuation. EUR weak, AUD strong. No reason to cover." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Late Jan — both components still aligned bearish for EURAUD." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "EUR continuing its structural decline while AUD's full-month bull phase persists (inverted bearish). Double alignment confirmed for a second consecutive month — among the cleanest short stretches of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR weak, AUD still climbing (inverted bearish). Hold shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Continued alignment. EUR grinding lower, AUD sustaining its rally." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"No reversal signal on either side. Maximum conviction." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"SHORT / WATCH ★★★☆☆", note:"EUR nearing its own trough; AUD still strong (inverted bearish). Begin watching for EUR's March reversal." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "FLIP / CONFLICT", stars: 3,
    note: "EUR's annual trough and flip month (bottoms Wk1–2, sharp recovery follows) collides directly with AUD's continuing dominance — AUD is itself peaking late in the month (inverted bearish for EURAUD). Early-month double-bearish alignment (EUR still weak, AUD strong) gives way to a genuine fight as EUR turns up.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"EUR still finishing its trough; AUD still strong (inverted bearish). Both aligned short — but EUR's reversal is imminent." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"chop", com:"FLIP WATCH ★★☆☆☆", note:"EUR troughs and turns up sharply. AUD remains strong (inverted bearish) — direct conflict emerging. Close shorts, do not yet flip long." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR's recovery firms (bullish) while AUD nears its own 15-YR peak (inverted bearish). Two strong trends fighting — reduce size." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT / WATCH ★★☆☆☆", note:"EUR continuing its bounce; AUD peaking late March (about to roll into its own violent April flip). Stand aside — April's dual flip will resolve this conflict." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "EUR's lowest-conviction, directionless month is completely overshadowed by AUD's most violent reversal of its own year — long Wk1, decisive flip to short from Wk2 (inverted: bearish for EURAUD early, then powerfully bullish as AUD collapses). AUD is the dominant driver of EURAUD this month by a wide margin.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD still near its own peak (inverted bearish, dominant). EUR directionless — AUD controls the pair. Lean short." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"FLIP → LONG ★★★★☆", note:"AUD rolls over hard into its own highest-conviction bear phase — inverted, this flips powerfully bullish for EURAUD. EUR remains neutral; AUD's reversal is the whole story. Flip long." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★★★", note:"AUD's bear phase confirmed across all TFs (inverted bullish, maximum conviction). EUR still flat — AUD fully dominant. Highest conviction long of the month." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★★☆", note:"AUD continues its waterfall (inverted bullish). Hold longs — AUD remains the dominant, cleaner signal into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "MOST CONTESTED", stars: 3,
    note: "The single most contested month of the EURAUD year. EUR stages its MOST BEARISH MONTH of its entire year — 22-YR collapsing toward absolute lows ~5–10 (5★ bearish on its own chart) — at the exact moment AUD stages its own deepest waterfall decline of the year (inverted, this is maximum-conviction bullish for EURAUD, also 5★). Both currencies are at peak conviction in directly opposing directions for the pair — a genuine coin-flip month. EUR's structural collapse to near-absolute lows is judged the marginally more extreme of the two moves, tilting the net bias slightly bearish, but expect significant chop.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR's brief Wk1 bounce before its collapse vs AUD still in steep decline (inverted bullish). Direct conflict — do not chase either move." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR begins its waterfall toward annual lows (bearish) while AUD also accelerates lower (inverted bullish). Both at high conviction in opposite directions — reduce size, expect volatility." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED / SHORT LEAN ★★★☆☆", note:"EUR's collapse toward ~5–10 is the more structurally extreme move of the two — marginal edge toward EURAUD weakness, but AUD's own waterfall (inverted bullish) keeps this genuinely two-sided." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED / SHORT LEAN ★★★☆☆", note:"EUR near its absolute annual low; AUD also basing into its own trough (inverted bullish, easing). EUR's extreme low is judged the dominant force into June — slight short lean." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "EUR's annual-low flip month (recovery begins from its floor) aligns constructively with AUD's continuing trough phase (inverted bullish for EURAUD). Building double alignment — a flip-long setup with growing conviction.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT / COVER ★★☆☆☆", note:"EUR still finishing its capitulation at the annual low; AUD also still declining (inverted bullish, partially offsetting). Cover remaining shorts — EUR's low is near." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"NEUTRAL ★★☆☆☆", note:"EUR basing at the floor; AUD nearing its own trough (inverted bullish). Conflicting forces easing — stand by for the turn." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"WATCH ★★★☆☆", note:"EUR beginning its turn off the lows; AUD also beginning to base (inverted, no longer opposing). Early signs favour EURAUD higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"EUR's recovery gaining traction; AUD remains range-bound at its lows (inverted, neutral). Cautious long bias building into July." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "AVOID", stars: 1,
    note: "Both components in low-conviction chop — EUR directionless, AUD also choppy/mixed (inverted, similarly directionless). No clean EURAUD edge whatsoever. One of the lowest conviction windows of the year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"EUR and AUD both choppy. No edge — stand aside." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"AUD's brief Wk2 bounce creates only noise. Continued lack of directional confluence." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Still no edge. Avoid forcing a trade here." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"AUD resumes its own decline (inverted, mildly bullish for EURAUD) but EUR remains flat. Light watch only." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "EUR's lowest-conviction month of the entire year (near-flat) is overridden by AUD's clean secondary bear leg (inverted, strongly bullish for EURAUD). AUD becomes the dominant, cleaner driver — a long bias by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"AUD declining again (inverted bullish, the cleaner signal). EUR flat — AUD dominates. Enter long." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★☆☆", note:"AUD's secondary low forming (inverted bullish). EUR still passive but not opposing. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"LONG / WATCH ★★☆☆☆", note:"AUD flattening slightly — its edge over EUR's chop narrows. Trim some exposure." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"Both currencies entering directionless patches ahead of September. Reduce size into the new month." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "MIXED / CONFLICT", stars: 2,
    note: "EUR drops toward its secondary trough (bearish) at the same time AUD also extends its own secondary bear leg (inverted, bullish for EURAUD). Two roughly comparable bearish moves in directly opposing directions for the pair — they largely cancel, producing a low-conviction, choppy month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"CHOP ★★☆☆☆", note:"EUR and AUD both declining (offsetting effects for EURAUD). No clean edge yet." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"EUR weakness and AUD weakness (inverted bullish) directly oppose — net effect muted. Trade small if at all." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR approaching its trough; AUD beginning to flatten. Roughly balanced — avoid forcing direction." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both currencies nearing their own turning points heading into October's flip windows. Stand aside." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "EUR's flip month (brief Wk1 bounce, then resumes its decline Wk2–4) provides the cleaner signal against AUD's directionless base-building (inverted, offering no clear opposition). EUR's mid-month rollover becomes the dominant driver.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"MIXED ★★☆☆☆", note:"EUR's brief Wk1 bounce vs AUD's own choppy base (inverted, no clear signal). Conflicting — do not chase the EUR bounce." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"EUR flips short as planned; AUD remains directionless (inverted, not opposing). EUR becomes the cleaner, dominant signal — enter short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"EUR's decline firms heading into its November collapse. AUD still basing — EUR fully in control. Hold shorts." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"EUR accelerating toward its annual lows. AUD's early recovery stirring (inverted, a mild headwind) — but EUR's conviction dominates. Hold into November." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "The standout month of the EURAUD calendar. EUR stages its single highest-conviction trade of its entire year — collapsing to ABSOLUTE ANNUAL LOWS across all timeframes (5★) — while AUD merely continues its own directionless base-building (2★, no clear opposition, inverted). EUR's maximum-conviction move stands virtually uncontested.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR accelerating toward its annual floor at maximum conviction. AUD still basing — offering no resistance. Press shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR approaching absolute lows (~0–10 on the 22-YR). AUD remains directionless. Textbook uncontested short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at/near its absolute annual lows — the single highest-conviction trade of its own year. AUD offers no meaningful opposition. Maximum conviction — the defining EURAUD trade of the year." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"SHORT / WATCH ★★★★☆", note:"EUR basing near its floor; AUD's late-Nov turn begins (inverted, a mild headwind building). Hold shorts but prepare for the December reversal on both sides." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Both currencies stage year-end recoveries simultaneously — EUR's mirror-image surge from its November extremes (bullish for EURAUD, 5★ on its own chart) against AUD's confirmed Q1-entry recovery (inverted bearish, 4★). EUR's reversal carries the higher conviction and is the more dramatic of the two moves — the edge tilts toward EURAUD strength.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"EUR begins its sharp reversal off the Nov floor — the dominant move; AUD's own recovery just starting (inverted bearish, only a mild offset). Flip long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★★☆", note:"EUR's recovery accelerating fast (its highest-conviction reversal of the year). AUD's recovery firming too (inverted bearish) — but EUR's magnitude dominates. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★☆☆", note:"EUR surging hard off its lows; AUD's recovery offsets only partially (inverted bearish). EUR's reversal remains the larger, more decisive move." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★☆☆", note:"EUR closing the year near its recovery highs while AUD also closes firm (inverted bearish, a moderating headwind). Carry the long cautiously into the new Jan cycle, where EUR historically reopens with a sell-the-spike." },
    ]
  },
];

const SEASONAL_DATA = `
EURAUD — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal, EUR launched 1999) + AUD/USD CME Futures (34-YR seasonal)
Methodology: EUR seasonal tendency combined with the inverse of AUD seasonal tendency (EUR is the base currency — its signal applies directly; AUD is the quote currency — its signal is inverted).

=== EUR COMPONENT (bullish EUR = EURAUD rising) ===
Jan–Feb: EUR bearish — 5-YR sells the Jan 1 open spike, structural decline continues toward its own trough.
Mar: EUR ANNUAL TROUGH / FLIP — bottoms Wk1–2, sharp recovery follows.
Apr: EUR's lowest directional bias of the year — chop, no clean edge.
May: EUR's MOST BEARISH MONTH (22-YR) — collapses toward near-absolute annual lows ~5–10. Brief Wk1 bounce then a strong Wk2–4 waterfall.
Jun: EUR FLIP MONTH — annual low reached, recovery begins.
Jul: EUR chop — directionless.
Aug: EUR's lowest-conviction month of the entire year — near flat.
Sep: EUR turns bearish, dropping toward its secondary trough.
Oct: EUR FLIP MONTH — Wk1 bounce then resumes its decline Wk2–4.
Nov: EUR's ABSOLUTE ANNUAL LOWS — all timeframes converge near 0–10. The single highest-conviction short of EUR's entire year.
Dec: EUR STRONG BULL — mirror-image year-end recovery, 22-YR surges from ~0 toward ~75–80.

=== AUD COMPONENT (bullish AUD = EURAUD falling, since AUD is inverted) ===
Jan–Mar: AUD strongly bullish — all TFs aligned, peaking late March around 95–100 (inverted: bearish for EURAUD).
Apr: AUD's most critical month — long Wk1 then a violent FLIP SHORT from Wk2, all TFs aligned bearish by Wk3 (inverted: bearish for EURAUD early, then powerfully bullish as AUD collapses).
May: AUD's deepest waterfall decline of its own year (inverted: bullish for EURAUD, maximum conviction — directly opposing EUR's own collapse this same month).
Jun: AUD basing into its trough (inverted: mildly bullish, easing through the month).
Jul: AUD choppy/mixed — brief Wk2 bounce, no clean trend (inverted: similarly choppy).
Aug–Sep: AUD's secondary bear leg — broad decline (inverted: bullish for EURAUD).
Oct–Nov: AUD base-building — choppy, directionless, turning decisively only in late Nov (inverted: offers little resistance to EUR's moves).
Dec: AUD's confirmed recovery — all TFs aligned bullish (inverted: bearish for EURAUD, a moderate headwind to EUR's own December surge).

=== COMBINED NET EFFECT ===
Jan–Feb: EUR bear + AUD bull (inverted bear) = double alignment bearish. Highest conviction short window to open the year, 5★.
Mar: Early-month double-bearish alignment (EUR still weak, AUD still strong) gives way to a genuine fight as EUR stages its annual-trough flip directly against AUD's still-dominant uptrend — net signal turns choppy/contested.
Apr: EUR's directionless chop is completely overshadowed by AUD's own violent reversal (long-then-flip-short, inverted) — AUD is overwhelmingly the dominant driver, flipping EURAUD from short to the month's highest-conviction long.
May: THE single most contested month of the year — EUR's most bearish month of its own year collides head-on with AUD's deepest waterfall decline (inverted bullish), both at maximum conviction in opposing directions. EUR's structural collapse to near-absolute lows is marginally judged the more extreme, tilting the net bias slightly bearish, but expect significant two-way chop.
Jun: EUR's annual-low flip/recovery aligns constructively with AUD's continuing trough phase (inverted bullish) — building double alignment, a flip-long setup gaining conviction.
Jul: Both components in low-conviction chop — EUR directionless, AUD also choppy/mixed (inverted, similarly directionless). One of the lowest-edge windows of the entire year.
Aug: EUR's lowest-conviction month of its own year is overridden by AUD's clean secondary bear leg (inverted, strongly bullish for EURAUD) — AUD becomes dominant by elimination.
Sep: EUR's drop toward its secondary trough and AUD's own secondary bear leg (inverted bullish) directly oppose each other — two roughly comparable moves cancel out, producing a low-conviction, choppy month.
Oct: EUR's flip month (Wk1 bounce then resumed decline) provides the cleaner signal against AUD's directionless base — EUR becomes the dominant driver, net short.
Nov: THE STANDOUT MONTH of the EURAUD calendar — EUR's single highest-conviction trade of its own entire year (absolute annual lows, all TFs aligned, 5★) stands virtually uncontested against AUD's directionless base-building (2★, inverted). Maximum-conviction short, effectively uncontested.
Dec: Both currencies stage year-end recoveries simultaneously — EUR's dramatic mirror-image surge (5★ on its own chart) against AUD's more modest confirmed recovery (inverted bearish, 4★). EUR's larger, more decisive move dominates — net bias tilts toward EURAUD strength.

=== PLAYBOOK SIGNALS ===
EURAUD HIGHEST CONVICTION SHORT: November (EUR's single highest-conviction trade of its own year — absolute annual lows — stands virtually uncontested against AUD's directionless base. THE standout month of the EURAUD year, 5★).
EURAUD HIGHEST CONVICTION LONG: April (AUD's violent reversal is the dominant driver — flips EURAUD from short to the month's clear long, 5★ by Wk3) and December (EUR's larger, more decisive year-end surge dominates AUD's recovery).
EURAUD SECONDARY SHORT: January–February (double alignment bearish, 5★).
EURAUD MOST CONTESTED / REQUIRES CAREFUL FRAMING: March (EUR's trough-flip vs AUD's still-dominant uptrend) and May (EUR's most bearish month of its own year vs AUD's deepest decline — both at maximum conviction in directly opposing directions, a genuine coin-flip month).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURAUD explaining how the EUR and AUD seasonal forces interact month by month, with special attention to the November standout month and the May stand-off.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or AUD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURAUD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — especially May, where both currencies move at maximum conviction in directly opposing directions.
`;
