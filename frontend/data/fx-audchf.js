/**
 * data/fx-audchf.js — AUDCHF Forex Seasonal
 * Derived from: AUD/USD CME futures + CHF/USD CME futures
 * Methodology: AUD seasonal tendency vs inverted CHF seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-audchf",
  name:     "AUD / CHF",
  sub:      "Forex Seasonal · Derived from AUD CME + CHF CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · AUD/USD CME (34-YR) · CHF/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD's strongest seasonal window (all TFs aligned bull) meets CHF's early-year decline (inverted bullish for AUDCHF). Double alignment — high conviction long to open the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD lifting off its lows while CHF declines (inverted tailwind). Both push AUDCHF higher — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD continuation; CHF weakness persists. Full alignment — hold and add." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Trend intact on both legs of the trade." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Into Feb — AUD and inverted CHF remain aligned bullish." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD's full-month bull phase continues while CHF extends its decline (inverted bullish, building toward its own annual trough flip in March). Double alignment persists.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD sustained rally; CHF still declining (inverted tailwind). Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Mid-month strength on both legs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"No reversal signal on either side yet." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"CHF approaching its own annual-trough flip month — still a tailwind for now. Hold." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED / FADING LONG", stars: 3,
    note: "AUD's final Q1 bull leg starts the month strong, but CHF's ANNUAL TROUGH FLIP (hits its absolute low ~5–10 mid-March, then sharply reverses — inverted, this flips from bullish to bearish for AUDCHF) injects late-month conflict. The double-bullish open fades into a genuine fight between two strong trends.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD strong; CHF still declining toward its trough (inverted tailwind intact). Continue holding longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"CHF hits its absolute annual low mid-month — the inverted tailwind is about to disappear. Begin trimming." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"CHOP ★★☆☆☆", note:"CHF reverses sharply off its trough (inverted bearish) just as AUD nears its own March peak. Direct conflict — reduce exposure." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"bear", com:"CHOP / WATCH ★★☆☆☆", note:"CHF's flip-recovery accelerates (inverted bearish) and now opposes AUD's still-elevated trend. Net signal turns genuinely mixed heading into April." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "AUD's most critical reversal month (long Wk1, decisive flip short from Wk2) combines with CHF's continuing recovery off its March trough (inverted bearish). Both components turn bearish for AUDCHF in the same window — a clean, violent double-alignment flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"LONG → FLIP ★★★★☆", note:"AUD still bullish early (5-YR peaks ~100); CHF's recovery is already working against the pair (inverted bearish). Exit longs by end of Wk1." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"AUD rolls over hard; CHF recovery firms (inverted bearish). Both align against AUDCHF — flip short with conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Double alignment confirmed — AUD's highest-conviction bear phase meets CHF's continuing rally (inverted bearish). Maximum conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Sustained decline on both legs. Hold shorts into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "The most complex month of the AUDCHF year. AUD's deepest waterfall decline (5★ bearish) opens in direct alignment with CHF's continuing strength (inverted bearish) — but CHF then stages its own CRITICAL FLIP (5-YR spikes to an absolute peak ~100 mid-May, then reverses hard short, inverted bullish). Early double-bearish alignment dominates; CHF's late flip injects conflict but AUD's still-declining trend keeps the net bias bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★★", note:"AUD in steep decline; CHF still strengthening toward its spike-peak (inverted bearish). Full alignment — press shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★★", note:"AUD acceleration lower; CHF nearing its absolute peak (inverted bearish, near maximum). Highest conviction window of the month." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF's CRITICAL FLIP triggers — reverses hard from its peak (inverted, now turning bullish for AUDCHF) just as AUD continues its own waterfall. Direct conflict — AUD's trend still wins, but reduce size." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"CHF's post-flip decline (inverted bullish) is building against AUD's continuing bear move. AUD remains dominant for now — hold but tighten stops." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CHOP / CONFLICT", stars: 2,
    note: "AUD continues toward its trough (bearish) while CHF's post-flip decline deepens (inverted bullish) — a near head-on conflict between two currencies both moving toward their own lows. Roughly balanced, low-edge month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"CHOP ★★☆☆☆", note:"AUD still declining; CHF also declining (inverted bullish offset). Conflicting forces — no clean edge." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"CHOP ★★☆☆☆", note:"Both near their own lows simultaneously. Net AUDCHF effect roughly neutral." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"NEUTRAL ★★☆☆☆", note:"AUD basing; CHF nearing its own trough. Two competing turns — stand aside." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"NEUTRAL ★★☆☆☆", note:"Transition for both. Await July's clearer signals." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "AUD's mixed/choppy month is given a modest directional edge by CHF's continuing post-flip decline (inverted bullish). Low conviction, but CHF provides the cleaner — if unspectacular — signal.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bear", com:"WATCH ★★☆☆☆", note:"15-YR AUD lifts; CHF continues its decline (inverted tailwind). Cautious long bias only." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★☆☆", note:"AUD's best week of July aligns with CHF's continuing weakness (inverted bullish). Modest double-tailwind — short-term long trade." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"AUD bounce fades; CHF still the cleaner signal (inverted bullish). Light long bias only." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CHOP ★★☆☆☆", note:"AUD resumes its own decline, now opposing CHF's recovery setup. Reduce exposure into August." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "AUD's secondary bear leg lines up with CHF's recovery phase (firming into its own bull leg, inverted bearish for AUDCHF). Clean double alignment — one of the cleaner short windows of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"AUD declining again; CHF's recovery firming (inverted bearish). Both align — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★☆", note:"Both legs of the trade confirm. Hold with conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"SHORT ★★★☆☆", note:"AUD flattening slightly; CHF's recovery continues (inverted bearish), keeping the net bias short." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"SHORT ★★★☆☆", note:"CHF building toward its own September flip-peak — still bearish for AUDCHF for now. Hold." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "AUD continues its own bear phase while CHF stages its second major flip of the year — the 15-YR spikes to an absolute peak ~100 early September, then collapses (inverted: flips from bearish to bullish for AUDCHF). Early short conviction gives way to a CHF-driven reversal mid-month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", sLt:"bull", com:"SHORT ★★★☆☆", note:"AUD declining; CHF still spiking toward its peak (inverted bearish, briefly extending the short). Hold." },
      { wk:"Wk 2", s5:"bear", s15:"bull", sLt:"bull", com:"FLIP → LONG ★★★★☆", note:"CHF's 15-YR peaks near 100 then rolls over hard — inverted, now powerfully bullish for AUDCHF. FLIP LONG on confirmation, overriding AUD's own bearish pull." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★☆", note:"CHF's post-spike collapse (inverted bullish) is now the dominant force — its conviction outweighs AUD's continuing bear bias. Hold long." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★☆☆", note:"CHF decline persisting (inverted bullish). AUD still weak but no longer the dominant driver — stay long on CHF's lead, choppiest month of Q3 still in play." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "The single cleanest, highest-conviction long window of the AUDCHF year. AUD's directionless base-building offers no resistance while CHF's post-September decline continues lower (inverted, strongly bullish). CHF is fully dominant — a clean, low-noise trend trade.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★★", note:"CHF continuing its decline from its September peak (inverted bullish, high conviction). AUD directionless — CHF dominates fully. Enter long." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★★", note:"CHF's decline persists with no opposition from AUD. Hold and add — the cleanest trend of the year." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bear", com:"LONG ★★★★★", note:"AUD's 5-YR begins lifting — now reinforcing rather than opposing the long. Both components aligning." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★★★", note:"AUD's early recovery confirms alongside CHF's continuing decline (inverted bullish). Full double alignment — peak conviction of the trade." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "BULL → CONFLICT", stars: 4,
    note: "AUD's strongest seasonal window dominates early as it stages its decisive late-year turn, but CHF's late-month flip into its own year-end rally (the start of its highest-conviction long phase, inverted bearish) begins to challenge the AUDCHF long. Bullish bias holds for most of the month before the conflict builds.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★★☆", note:"CHF still in its post-Sep decline (inverted bullish, dominant). AUD basing — not yet opposing. Hold longs." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★★☆", note:"CHF weakness persists into its own late-year low. AUD remains in its base." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bull", com:"LONG ★★★☆☆", note:"AUD's 5-YR recovering and CHF nearing its own trough — both still reinforcing the long, but CHF's reversal window is approaching." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG / WATCH ★★★☆☆", note:"AUD's decisive late-Nov turn (all TFs inflect bullish) collides with CHF's first stirrings of its massive year-end rally (inverted, beginning to turn bearish). Conflict starts to build heading into December." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "chop", combinedLabel: "MOST CONTESTED", stars: 3,
    note: "AUDCHF's most contested month. AUD stages its confirmed Q1-entry recovery (4★) at the exact moment CHF stages the single most decisive rally of its own entire year — its HIGHEST CONVICTION LONG, rocketing toward an absolute peak at Dec 31 (inverted, this is maximum-conviction bearish for AUDCHF). Both components are at strong conviction in directly opposing directions; CHF's move is the more extreme of the two, tilting the edge toward AUDCHF weakness as the month progresses.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / WATCH ★★★☆☆", note:"AUD recovery firming early; CHF's rally just beginning to build (inverted bearish, not yet dominant). Cautious long — but watch CHF closely." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"CONFLICT ★★☆☆☆", note:"CHF's rally accelerates hard toward its own annual peak (inverted bearish, high conviction) — now directly opposing AUD's recovery. Genuine stand-off — reduce size." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"CONFLICT / SHORT LEAN ★★☆☆☆", note:"CHF's surge toward its absolute peak (inverted bearish) is the more decisive, higher-conviction move of the two. Edge tilts toward AUDCHF weakness despite AUD's own strength." },
      { wk:"Wk 4", s5:"bear", s15:"bull", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"CHF reaches its absolute annual peak at year-end (inverted, maximum bearish pressure on AUDCHF) — the single most decisive move of CHF's entire year overwhelms AUD's more modest recovery. Net bias tilts bearish into the close." },
    ]
  },
];

const SEASONAL_DATA = `
AUDCHF — FOREX SEASONAL ANALYSIS
Derived from: AUD/USD CME Futures (34-YR seasonal) + CHF/USD CME Futures (40-YR seasonal)
Methodology: AUD seasonal tendency combined with the inverse of CHF seasonal tendency (AUD is the base currency — its signal applies directly; CHF is the quote currency — its signal is inverted).

=== AUD COMPONENT (bullish AUD = AUDCHF rising) ===
Jan–Mar: AUD strongly bullish — all TFs aligned, peaking late March around 95–100.
Apr: AUD's most critical month — long Wk1 (5-YR peaks ~100) then decisive FLIP SHORT from Wk2, all TFs aligned bearish by Wk3.
May–Jun: AUD's deepest waterfall decline of the year, trough forming into June.
Jul: AUD choppy/mixed — brief Wk2 bounce, no clean trend.
Aug–Sep: AUD secondary bear leg — broad decline, 34-YR extends longest.
Oct–Nov: AUD base-building — choppy, turns decisively in late Nov (Wk4 all TFs inflect).
Dec: AUD confirmed recovery — all TFs aligned bullish, entry for the next Q1 cycle.

=== CHF COMPONENT (bullish CHF = AUDCHF falling, since CHF is inverted) ===
Jan–Feb: CHF bearish — declining toward its annual trough (inverted: bullish for AUDCHF).
Mar: CHF ANNUAL TROUGH FLIP — hits its absolute low ~5–10 mid-month then reverses sharply (inverted: flips from bullish to bearish for AUDCHF).
Apr: CHF bullish — recovery continues off its March trough (inverted: bearish for AUDCHF).
May: CHF FLIP MONTH — 5-YR spikes to an absolute peak ~100 mid-month, then a CRITICAL FLIP SHORT (inverted: bearish early, turning bullish for AUDCHF late in the month).
Jun–Jul: CHF bearish — post-flip decline / trough phase (inverted: bullish for AUDCHF).
Aug: CHF bullish — recovery firms into a bull leg (inverted: bearish for AUDCHF).
Sep: CHF FLIP MONTH (second major flip of the year) — 15-YR spikes to an absolute peak ~100 then collapses (inverted: flips from bearish to bullish for AUDCHF).
Oct: CHF bearish — continuation lower from its September peak (inverted: strongly bullish for AUDCHF).
Nov: CHF bullish→transition — early continuation lower, then begins its year-end flip into a rally late in the month (inverted: bullish early, turning bearish late).
Dec: CHF HIGHEST CONVICTION LONG of its entire year — rockets toward an absolute peak at Dec 31 (inverted: maximum-conviction bearish for AUDCHF).

=== COMBINED NET EFFECT ===
Jan–Feb: AUD bull + CHF bear (inverted bull) = double alignment bullish. High conviction long to open the year, 5★.
Mar: AUD's strong Q1 bull collides with CHF's violent annual-trough flip (inverted, turning bearish) — the double-bullish open fades into a genuine fight between two strong trends, conviction easing to chop by month end.
Apr: AUD's violent flip-to-short combines with CHF's continuing recovery (inverted bearish) — both turn bearish for AUDCHF simultaneously. Clean double-alignment flip-short, 5★.
May: The most complex month of the year — AUD's deepest bear month opens in alignment with CHF's continuing strength (inverted bearish), but CHF's own CRITICAL FLIP mid-month (inverted, turning bullish) injects conflict. AUD's still-declining trend keeps the net bias bearish through month-end.
Jun: Both currencies head toward their own troughs simultaneously — AUD bearish vs CHF bearish (inverted bullish) — a near head-on conflict that largely cancels out. Choppiest, lowest-edge stretch of the year.
Jul: AUD's mixed month is given a modest edge by CHF's continuing post-flip decline (inverted bullish) — low conviction, CHF the (mildly) cleaner signal.
Aug: AUD's secondary bear leg + CHF's recovery firming into a bull leg (inverted bearish) = clean double alignment. One of the cleaner short windows of the year, 4★.
Sep: AUD continues its own bear phase while CHF stages its second major flip — spike-to-peak-then-collapse (inverted, flips from bearish to bullish). Early short conviction gives way to a CHF-driven reversal mid-month — choppiest month of Q3/Q4.
Oct: CHF's continuation lower from its September peak (inverted bullish) meets AUD's directionless base — CHF fully dominant. THE single cleanest, highest-conviction long window of the year, 5★.
Nov: AUD's strongest seasonal window dominates early (reinforced by CHF's continuing decline, inverted bullish), but CHF's late-month flip into its year-end rally (inverted, turning bearish) begins to challenge the long.
Dec: AUDCHF's MOST CONTESTED MONTH — AUD stages its Q1-entry recovery exactly as CHF stages the single most decisive rally of its entire year (inverted, maximum bearish for the pair). Both components at peak conviction in opposing directions; CHF's move is the more extreme, tilting the net edge toward AUDCHF weakness by year-end.

=== PLAYBOOK SIGNALS ===
AUDCHF HIGHEST CONVICTION LONG: October (CHF's clean post-peak decline meets AUD's directionless base — the single cleanest trend trade of the year, 5★).
AUDCHF HIGHEST CONVICTION SHORT: April (AUD's flip-to-short + CHF's recovery — clean double-alignment reversal, 5★).
AUDCHF SECONDARY LONG: January–February (double alignment bullish, 5★).
AUDCHF MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (AUD's bear month vs CHF's critical flip) and December (AUD's Q1-entry recovery vs CHF's single most decisive rally of its own year — opposing extremes, edge tilts toward AUDCHF weakness).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for AUDCHF explaining how the AUD and CHF seasonal forces interact month by month, with special attention to the October long window and the December stand-off.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (AUD or CHF) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction AUDCHF trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — especially the contested December month where both currencies move in opposing directions at high conviction.
`;
