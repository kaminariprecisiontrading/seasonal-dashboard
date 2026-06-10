/**
 * data/fx-audnzd.js — AUDNZD Forex Seasonal
 * Derived from: AUD/USD CME futures + NZD/USD CME futures
 * Methodology: AUD seasonal tendency vs inverted NZD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-audnzd",
  name:     "AUD / NZD",
  sub:      "Forex Seasonal · Derived from AUD CME + NZD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · AUD/USD CME (34-YR) · NZD/USD CME (23-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD's strongest seasonal window (all TFs aligned bull) meets NZD's structural bear (5-YR sells the Jan 1 spike then collapses, inverted bullish for AUDNZD). Full double alignment to open the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD lifting off its lows while NZD sells its open spike (inverted bullish). Both push AUDNZD higher — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD continuation; NZD declining. Full alignment — hold and add." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Trend intact on both legs of the trade." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Into Feb — AUD and inverted NZD remain aligned bullish." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD's full-month bull phase continues while NZD grinds toward its own trough zone (inverted bullish). Double alignment persists — second consecutive 5★ month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD sustained rally; NZD continuing to decline (inverted tailwind). Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Mid-month strength on both legs of the trade." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"No reversal signal on either side yet." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"NZD beginning to stabilise late Feb — still no threat to the AUD-led trend. Hold." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's clean Q1 bull leg (peaking late month) dominates NZD's choppy transition out of its own trough — a mixed, low-conviction signal that offers little resistance. AUD remains the cleaner driver through month-end.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD strong across all TFs. NZD still finishing its own trough — no conflict yet." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD acceleration phase. NZD's recovery just beginning — too early to matter." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD approaching its 15-YR peak. NZD's recovery firming (mild headwind building, inverted bearish)." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD peaks late March; NZD's bull recovery gaining steam (inverted bearish creeping in). Begin watching for the April flip on both sides." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "AUD's most critical reversal month (long Wk1, decisive flip short from Wk2) lines up with NZD's clean bull recovery (inverted bearish for AUDNZD). Both components turn against AUDNZD in the same window — a clean, violent double-alignment flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"LONG → FLIP ★★★★☆", note:"AUD still bullish early (5-YR peaks ~100); NZD's recovery is already working against the pair (inverted bearish). Exit longs by end of Wk1." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"AUD rolls over hard; NZD's recovery firms (inverted bearish). Both align against AUDNZD — flip short with conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Double alignment confirmed — AUD's highest-conviction bear phase meets NZD's continuing rally (inverted bearish). Maximum conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Sustained decline on both legs. Hold shorts into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "The most complex month of the AUDNZD year. AUD's deepest waterfall decline (5★ bearish) opens in alignment with NZD's continuing strength (inverted bearish) — but NZD then stages its own MOST CRITICAL FLIP of the year (23-YR peaks ~85–90 early May, then collapses hard, inverted bullish). Early double-bearish alignment dominates; the late-month NZD flip injects real conflict, but AUD's still-declining trend keeps the net bias bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★★", note:"AUD in steep decline; NZD still near its own peak (inverted bearish). Full alignment — press shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"NZD's MOST CRITICAL FLIP triggers — peak confirmed, reverses hard (inverted, now turning bullish for AUDNZD) just as AUD continues its own waterfall. Direct conflict emerges — AUD's deeper move still wins for now." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"NZD's post-flip collapse (inverted bullish) is building against AUD's continuing decline. Reduce size — the cleanest short window of the month has passed." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"Both currencies now in their own waterfalls — AUD bearish vs NZD bearish (inverted bullish). Net bias still tilts short on AUD's deeper conviction, but expect chop." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "CHOP / CONFLICT", stars: 3,
    note: "AUD continues toward its own trough (bearish for AUDNZD) while NZD's deeper waterfall toward its annual lows (inverted bullish, 5★ on its own chart) offsets it. NZD's higher-conviction decline largely cancels AUD's own bear phase — net bias turns genuinely mixed.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CHOP ★★★☆☆", note:"AUD still declining; NZD's deeper waterfall (inverted bullish, high conviction on its own chart) offsets much of the move. Conflicting forces." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"CHOP ★★☆☆☆", note:"Both near their own lows — NZD's decline arguably the more violent of the two (inverted bullish). Net AUDNZD effect leans neutral-to-bullish." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bear", com:"NEUTRAL / WATCH ★★☆☆☆", note:"AUD basing; NZD beginning to stabilise from its trough. Two competing turns — stand aside." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Transition for both. Await July's clearer — if still modest — signals." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "Both currencies are in low-conviction bounce-from-trough phases — AUD mixed/choppy, NZD also choppy/mixed (inverted, similarly choppy). Two muted recoveries largely cancel out. Low-edge month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"chop", com:"MIXED ★★☆☆☆", note:"AUD's 15-YR lifts; NZD also lifting from its trough (inverted, offsetting). No clean edge." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG / LIGHT ★★☆☆☆", note:"AUD's best week of July; NZD's bounce also peaking (inverted, partially offsetting). Modest, short-lived long bias only." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both bounces fading simultaneously. Avoid forcing a trade." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"chop", com:"CHOP ★★☆☆☆", note:"AUD rolls over again; NZD also rolling (inverted, offsetting). Stand aside into August." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "AUD's secondary bear leg lines up cleanly with NZD's recovery phase building toward its own September peak (inverted bearish for AUDNZD). Clean double alignment — the cleanest short window of the AUDNZD year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★★", note:"AUD declining again; NZD's recovery confirmed and rising toward its Sep peak (inverted bearish). Both align — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★★", note:"Both legs of the trade confirm. Maximum conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"SHORT ★★★★☆", note:"AUD flattening slightly; NZD's continued climb toward its peak (inverted bearish) keeps the net bias firmly short." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"SHORT ★★★★☆", note:"NZD nearing its own secondary peak — still bearish for AUDNZD for now. Hold into the September flip window." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "AUD continues its own bear phase while NZD's secondary peak month plays out — 23-YR and 15-YR peak ~80–85 mid-month, then flip short (inverted: flips from bearish to bullish for AUDNZD). Early short conviction gives way to an NZD-driven reversal mid-month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", sLt:"bull", com:"SHORT ★★★☆☆", note:"AUD declining; NZD still rising toward its secondary peak (inverted bearish, briefly extending the short). Hold." },
      { wk:"Wk 2", s5:"bear", s15:"bull", sLt:"bull", com:"FLIP → LONG ★★★☆☆", note:"NZD's 5-YR peaks first (early warning) and begins rolling over — inverted, this starts turning bullish for AUDNZD. Begin reducing the short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★☆", note:"NZD's broader rollover confirms (15-YR & 23-YR flip short, inverted bullish for AUDNZD) — now the dominant force, overriding AUD's own bear bias. Flip long." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★☆", note:"NZD's post-peak decline accelerating (inverted bullish). Hold longs — the reversal trade of the month." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's directionless base-building offers no resistance while NZD's post-September waterfall continues lower (inverted, strongly bullish for AUDNZD). NZD remains the dominant, cleaner driver.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★★", note:"NZD continuing its post-peak collapse (inverted bullish, high conviction). AUD directionless — NZD dominates. Hold longs." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"NZD broad decline persists with no opposition from AUD. Continue riding the move." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"AUD's 5-YR begins lifting — now reinforcing rather than opposing the long. Components starting to align." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"AUD's early recovery confirms; NZD's decline beginning to stabilise late month — net bias remains long but conviction easing slightly." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "CHOP / TRANSITION", stars: 3,
    note: "Early-month alignment (NZD still weak = inverted bullish, AUD basing) gives way to late-month conflict as both currencies inflect bullish in their own right — AUD's decisive Wk4 turn is bullish for AUDNZD, while NZD's own Wk4 turn (entering its strongest month of the year) is bearish for AUDNZD (inverted). A genuinely transitional, two-sided month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★☆", note:"NZD still declining toward its lows (inverted bullish, dominant). AUD basing — not yet opposing. Hold longs from October." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★☆☆", note:"NZD weakness persists near its seasonal lows. AUD remains in its base — net bias still long on NZD's lead." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both currencies basing simultaneously — NZD forming its low, AUD still directionless. Reduce exposure; a two-sided turn is approaching." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT ★★☆☆☆", note:"Both AUD and NZD inflect bullish in the same week — AUD's turn is bullish for AUDNZD while NZD's turn (entering its own strongest month) is bearish for AUDNZD (inverted). Direct conflict — stand aside until December clarifies which dominates." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "MOST CONTESTED", stars: 3,
    note: "AUDNZD's most contested month. AUD stages its confirmed Q1-entry recovery (4★) at the exact moment NZD stages the STRONGEST MONTH OF ITS ENTIRE YEAR — surging toward ~95–100 at year close (inverted, maximum-conviction bearish for AUDNZD, 5★ vs AUD's 4★). Both currencies rally hard simultaneously; NZD's is the higher-conviction move, tilting the net edge toward AUDNZD weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT ★★★☆☆", note:"AUD's recovery confirmed and NZD's year-end rally also confirmed (inverted bearish) — both legs strengthening in opposite directions for the pair. Reduce size; avoid the open conflict." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT / SHORT LEAN ★★☆☆☆", note:"NZD's rally is accelerating harder and faster than AUD's (its higher seasonal conviction, 5★ vs 4★, inverted bearish). Edge begins tilting toward AUDNZD weakness." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"SHORT LEAN ★★★☆☆", note:"NZD surging toward ~95–100 — the stronger, more decisive of the two year-end moves (inverted bearish). AUD's own recovery cannot fully offset it." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"SHORT LEAN ★★★☆☆", note:"NZD reaches its year-end peak (inverted, maximum bearish pressure on AUDNZD) — the single strongest move of NZD's entire year overwhelms AUD's more modest recovery. Net bias tilts bearish into the close." },
    ]
  },
];

const SEASONAL_DATA = `
AUDNZD — FOREX SEASONAL ANALYSIS
Derived from: AUD/USD CME Futures (34-YR seasonal) + NZD/USD CME Futures (23-YR seasonal)
Methodology: AUD seasonal tendency combined with the inverse of NZD seasonal tendency (AUD is the base currency — its signal applies directly; NZD is the quote currency — its signal is inverted).

=== AUD COMPONENT (bullish AUD = AUDNZD rising) ===
Jan–Mar: AUD strongly bullish — all TFs aligned, peaking late March around 95–100.
Apr: AUD's most critical month — long Wk1 (5-YR peaks ~100) then decisive FLIP SHORT from Wk2, all TFs aligned bearish by Wk3.
May–Jun: AUD's deepest waterfall decline of the year, trough forming into June.
Jul: AUD choppy/mixed — brief Wk2 bounce, no clean trend.
Aug–Sep: AUD secondary bear leg — broad decline, 34-YR extends longest.
Oct–Nov: AUD base-building — choppy, turns decisively in late Nov (Wk4 all TFs inflect).
Dec: AUD confirmed recovery — all TFs aligned bullish, entry for the next Q1 cycle.

=== NZD COMPONENT (bullish NZD = AUDNZD falling, since NZD is inverted) ===
Jan–Feb: NZD bearish — 5-YR sells the Jan 1 spike then collapses; structural decline (inverted: bullish for AUDNZD).
Mar: NZD choppy/flip — troughs Wk1–2 then sharp reversal, 23-YR leads the recovery (inverted: choppy, mildly bearish as the recovery firms).
Apr: NZD bullish — clean recovery, all TFs rallying (inverted: bearish for AUDNZD).
May: NZD's MOST CRITICAL FLIP MONTH — 23-YR peaks ~85–90 early May then collapses hard, highest-conviction reversal of its year (inverted: bearish early, turning bullish for AUDNZD as the flip confirms).
Jun: NZD bearish — deep waterfall toward absolute annual lows, its own highest-conviction bear phase (inverted: bullish for AUDNZD, high conviction).
Jul: NZD choppy/mixed — bounce from the June trough, muted and uneven (inverted: similarly choppy).
Aug: NZD bullish — clean recovery building toward its September secondary peak (inverted: bearish for AUDNZD).
Sep: NZD FLIP MONTH (secondary peak) — 23-YR & 15-YR peak ~80–85 mid-month (5-YR peaks first as early warning), then flip short (inverted: flips from bearish to bullish for AUDNZD).
Oct: NZD bearish — post-peak waterfall, sharp decline (inverted: strongly bullish for AUDNZD).
Nov: NZD bearish→turning — continues weak through Wk1–3, then inflects decisively bullish in Wk4 entering its own best month (inverted: bullish early, turning bearish late).
Dec: NZD STRONGEST MONTH OF ITS ENTIRE YEAR — surges toward ~95–100 at year close, all TFs aligned (inverted: maximum-conviction bearish for AUDNZD).

=== COMBINED NET EFFECT ===
Jan–Feb: AUD bull + NZD bear (inverted bull) = double alignment bullish. High conviction long to open the year, 5★.
Mar: AUD's clean Q1 bull dominates NZD's choppy, low-conviction trough-transition — net long, conviction steady.
Apr: AUD's violent flip-to-short combines with NZD's clean bull recovery (inverted bearish) — both turn against AUDNZD simultaneously. Clean double-alignment flip-short, 5★.
May: The most complex month of the year — AUD's deepest bear month opens in alignment with NZD's continuing strength (inverted bearish), but NZD's own MOST CRITICAL FLIP (peak-then-collapse, inverted bullish) injects real conflict mid-month. AUD's still-declining trend keeps the net bias bearish through month-end.
Jun: AUD continues toward its trough (bearish) while NZD's deeper, higher-conviction waterfall (inverted bullish, 5★ on its own chart) largely offsets it — net bias turns genuinely mixed.
Jul: Both currencies stage muted, choppy bounces from their own troughs that largely cancel — AUD mixed vs NZD choppy (inverted, similarly choppy). Low-edge month.
Aug: AUD's secondary bear leg + NZD's recovery building toward its own peak (inverted bearish) = clean double alignment. Cleanest short window of the year, 5★.
Sep: AUD continues its own bear phase while NZD's secondary-peak flip plays out (inverted, flips from bearish to bullish) — early short conviction gives way to an NZD-driven reversal mid-month.
Oct: NZD's post-peak waterfall (inverted bullish) dominates AUD's directionless base — NZD fully in control. Clean, high-conviction long window, 4–5★.
Nov: Early alignment (NZD weak = inverted bullish, AUD basing) gives way to late-month conflict as both currencies inflect bullish simultaneously — AUD's turn is bullish for AUDNZD while NZD's turn (entering its strongest month) is bearish (inverted). Genuinely transitional, two-sided month.
Dec: AUDNZD's MOST CONTESTED MONTH — AUD stages its Q1-entry recovery exactly as NZD stages the single strongest month of its entire year (inverted, maximum bearish for the pair, 5★ vs AUD's 4★). NZD's higher conviction tilts the net edge toward AUDNZD weakness by year-end.

=== PLAYBOOK SIGNALS ===
AUDNZD HIGHEST CONVICTION LONG: October (NZD's clean post-peak waterfall meets AUD's directionless base — high-conviction trend trade, 4–5★).
AUDNZD HIGHEST CONVICTION SHORT: April (AUD's flip-to-short + NZD's clean recovery — double-alignment reversal, 5★) and August (clean double-alignment bear, 5★).
AUDNZD SECONDARY LONG: January–February (double alignment bullish, 5★).
AUDNZD MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (AUD's bear month vs NZD's most critical flip of its own year), November (two-sided transition month), and December (AUD's Q1-entry recovery vs NZD's single strongest month of its own year — opposing extremes, edge tilts toward AUDNZD weakness).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for AUDNZD explaining how the AUD and NZD seasonal forces interact month by month, with special attention to the October long window and the December stand-off.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (AUD or NZD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction AUDNZD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — especially May, November, and December where both currencies move at high conviction in opposing directions.
`;
