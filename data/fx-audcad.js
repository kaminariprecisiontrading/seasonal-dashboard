/**
 * data/fx-audcad.js — AUDCAD Forex Seasonal
 * Derived from: AUD/USD CME futures + CAD/USD CME futures
 * Methodology: AUD seasonal tendency vs inverted CAD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-audcad",
  name:     "AUD / CAD",
  sub:      "Forex Seasonal · Derived from AUD CME + CAD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · AUD/USD CME (34-YR) · CAD/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD's strongest seasonal window (all TFs aligned bull) meets CAD's structural bear (5-YR sells the open spike then collapses, inverted bullish for AUDCAD). Full double alignment — highest conviction long of Q1.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD lifting off Dec/Jan lows while CAD sells its open spike (inverted bullish). Both push AUDCAD higher — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD continuation, CAD declining. Full alignment — hold and add." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Trend intact across both components. No reason to reduce." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Into Feb — both AUD and CAD (inverted) remain aligned bullish for AUDCAD." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD's full-month bull phase continues while CAD grinds lower toward its trough (inverted bullish). Double alignment persists — second consecutive 5★ month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD sustained rally; CAD continuing its waterfall (inverted tailwind). Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Mid-month strength on both legs of the trade." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"No reversal signal on either side yet." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"CAD beginning to stabilise late Feb — still no threat to the AUD-led trend. Hold." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's final Q1 bull leg (peaking late month) dominates CAD's choppy transition out of its own trough (mixed signal, only mildly bearish for AUDCAD as CAD begins to firm). AUD remains the cleaner driver.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD strong across all TFs. CAD still weak early in its transition — no conflict yet." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD acceleration phase. CAD recovery just beginning — too early to matter." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD approaching its 15-YR peak. CAD's 40-YR now turning up (mild headwind building)." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG → WATCH ★★★☆☆", note:"AUD peaks late Mar while CAD's recovery firms (inverted bearish creeping in). Begin watching for the Apr flip on both sides." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "AUD's most critical reversal month (long Wk1, decisive flip short from Wk2) collides with CAD's clean bull rally (inverted bearish for AUDCAD). Both components turn against AUDCAD in the same window — the year's most violent flip.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG → FLIP ★★★★☆", note:"AUD still bullish early (5-YR hits its peak). CAD also rallying (inverted bearish) — early conflict. Exit longs by end of Wk1." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"FLIP → SHORT ★★★★☆", note:"AUD rolls over hard. CAD's rally firms (inverted bearish). Both now align against AUDCAD — flip short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Double alignment confirmed — AUD in its highest-conviction bear phase, CAD still rallying (inverted bearish). Maximum conviction short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Sustained decline on both legs. Hold shorts into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED / SHORT", stars: 3,
    note: "AUD's deepest waterfall decline of the year (5★ bearish) meets a CAD that is itself rolling over from its own May peak (inverted — turning bullish for AUDCAD as the month progresses). AUD's higher conviction keeps the net bias bearish, but the CAD reversal injects late-month chop.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★☆☆", note:"AUD in steep decline. CAD still near its own peak early May (modest headwind). AUD dominant — lean short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★★☆", note:"AUD acceleration lower. CAD beginning to roll from its peak (inverted bullish creeping in) — still net short, but conviction easing." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD continues lower; CAD now declining too (inverted bullish) — direct conflict emerging. AUD's deeper move still wins, but expect choppier price action." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"CHOP / WATCH ★★☆☆☆", note:"AUD basing into its trough; CAD in its own waterfall (inverted bullish). Net bias turning genuinely mixed — reduce size." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CHOP / CONFLICT", stars: 2,
    note: "Both currencies sit near their own seasonal troughs simultaneously — AUD declining (bearish for AUDCAD) while CAD also declines (inverted bullish for AUDCAD). The two near-equal moves largely cancel each other out — the choppiest, lowest-edge month of the AUDCAD year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"CHOP ★★☆☆☆", note:"AUD still declining; CAD also declining (inverted bullish offset). Conflicting forces — no clean edge." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"CHOP ★★☆☆☆", note:"Both near their own lows. Net AUDCAD effect roughly neutral — stand aside or trade small." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"AUD basing; CAD also basing. Two troughs cancelling — avoid forcing a trade." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Transition for both. Await July's clearer signals — CAD's powerful recovery is the next big driver." },
    ]
  },
  {
    month: "July", sig5: "bear", sig15: "bull", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "AUD's mixed/choppy month is overridden by CAD's powerful seasonal recovery — its highest-conviction long window of the year (inverted, this is strongly bearish for AUDCAD). CAD becomes the dominant, cleaner driver.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD turns up sharply from its trough (inverted bearish, high conviction). AUD only mildly mixed — CAD dominates. Enter short." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD's brief Wk2 bounce creates mild conflict, but CAD's recovery is the stronger, cleaner move (inverted bearish). Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD bounce fades back to neutral. CAD recovery continuing. CAD remains dominant." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD resumes its own decline (adds to the short) while CAD's rally persists (inverted bearish). Now a clean double alignment." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "AUD's secondary bear leg lines up exactly with CAD's continued bull run toward its September peak (inverted bearish for AUDCAD). Clean double alignment — the cleanest short window of the AUDCAD year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"AUD declining again; CAD still climbing toward its peak (inverted bearish). Full alignment — press shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Both legs of the trade confirm. Maximum conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD flattening slightly, but CAD's approach to its annual peak (inverted bearish) keeps the net bias firmly short." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"SHORT / WATCH ★★★☆☆", note:"CAD nearing its absolute peak — the reversal (its highest-conviction flip of the year) is approaching. Begin tightening stops ahead of Sep." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "The most violent reversal of the AUDCAD year. AUD continues its own bear phase while CAD stages its HIGHEST CONVICTION REVERSAL — peaking near 100 mid-month before collapsing (inverted, this flips from bearish to powerfully bullish for AUDCAD). Short early, flip hard to long as CAD's collapse takes over as the dominant force.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", sLt:"bull", com:"SHORT ★★★☆☆", note:"AUD still declining; CAD still climbing toward its peak (inverted bearish, briefly extending the short). Hold remaining shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bull", sLt:"bull", com:"FLIP → LONG ★★★★★", note:"CAD peaks at ~100 and rolls over hard — inverted, this is now powerfully bullish for AUDCAD and overwhelms AUD's own bearish pull. FLIP LONG on confirmation." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★★", note:"CAD's post-peak waterfall (inverted bullish) is now the dominant force — its conviction far exceeds AUD's. Highest conviction long entry of the AUDCAD year." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★★", note:"CAD collapse accelerating (inverted bullish). Hold longs — this is the cleanest reversal trade of the calendar." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's directionless base-building is overridden by CAD's continued sharp post-peak waterfall (inverted, strongly bullish for AUDCAD). CAD remains the dominant, cleaner driver — building toward the longest aligned bullish run of the AUDCAD calendar.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★★", note:"CAD continuing its post-Sep collapse (inverted bullish, high conviction). AUD directionless — CAD dominates. Hold longs." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"CAD broad decline persists. AUD still basing — no conflict. Continue to ride CAD's move." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"AUD's 5-YR begins lifting — now adding to the long instead of opposing it. Both components starting to align." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★★☆", note:"AUD's early recovery confirms alongside CAD's continuing decline (inverted bullish). Building double alignment into November." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's late-month turn (basing through Wk1–3, then a clean inflection in Wk4) now positively reinforces CAD's continuing decline toward its annual lows (inverted bullish). The double-alignment bull stretch that began in October extends through November.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"CAD still declining toward its annual lows (inverted bullish, dominant). AUD basing — not yet opposing." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"CAD weakness persists. AUD remains in its base — net bias still long on CAD's lead." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bear", com:"LONG ★★★★☆", note:"AUD's 5-YR recovering and CAD nearing its own annual lows — both now reinforcing the same AUDCAD direction." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★★★", note:"AUD's decisive late-Nov turn (all TFs inflect) aligns fully with CAD's continued weakness. Full double alignment — enter/add for the December push." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD's confirmed Q1-entry recovery (all TFs aligned) provides the clear directional edge while CAD bases near its annual lows (directionless, no longer opposing). AUD becomes the clean dominant driver to close out the year's longest bullish run.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"AUD recovery firming (5-YR & 15-YR leading). CAD directionless near its lows — no opposition. Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD fully aligned across all TFs — the cleaner, dominant signal. CAD still basing. Best entry of the month." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"bull", com:"LONG ★★★★☆", note:"AUD's 15-YR briefly flat but the broader trend holds. CAD remains directionless. Continue holding." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"AUD carries the position into the new year's Q1 seasonal bull cycle — the same cycle that opened this entire double-alignment run twelve months ago." },
    ]
  },
];

const SEASONAL_DATA = `
AUDCAD — FOREX SEASONAL ANALYSIS
Derived from: AUD/USD CME Futures (34-YR seasonal) + CAD/USD CME Futures (40-YR seasonal)
Methodology: AUD seasonal tendency combined with the inverse of CAD seasonal tendency (AUD is the base currency — its signal applies directly; CAD is the quote currency — its signal is inverted).

=== AUD COMPONENT (bullish AUD = AUDCAD rising) ===
Jan–Mar: AUD strongly bullish — all TFs aligned, peaking late March around 95–100.
Apr: AUD's most critical month — long Wk1 (5-YR peaks ~100) then decisive FLIP SHORT from Wk2, all TFs aligned bearish by Wk3.
May–Jun: AUD's deepest waterfall decline of the year, trough forming into June.
Jul: AUD choppy/mixed — brief Wk2 bounce, no clean trend.
Aug–Sep: AUD secondary bear leg — broad decline, 34-YR extends longest.
Oct–Nov: AUD base-building — choppy, turns decisively in late Nov (Wk4 all TFs inflect).
Dec: AUD confirmed recovery — all TFs aligned bullish, entry for the next Q1 cycle.

=== CAD COMPONENT (bullish CAD = AUDCAD falling, since CAD is inverted) ===
Jan–Feb: CAD bearish — 5-YR sells the Jan 1 open spike then collapses; structural decline (inverted: bullish for AUDCAD).
Mar: CAD choppy/flip — 40-YR begins recovery from its lows while 15-YR lags (inverted: mixed, mildly bearish for AUDCAD as the recovery firms).
Apr: CAD bullish — clean rally, 5-YR spikes to ~85–90 mid-month (inverted: bearish for AUDCAD).
May: CAD bearish — 40-YR peaks first half of May then rolls over hard (inverted: turns bullish for AUDCAD as the month progresses).
Jun: CAD bearish — deep trough zone, all TFs near lows (inverted: bullish for AUDCAD).
Jul: CAD HIGHEST CONVICTION LONG of its year — powerful recovery from the June trough, all TFs aligned (inverted: strongly bearish for AUDCAD).
Aug: CAD bullish — continuing higher toward its September peak (inverted: bearish for AUDCAD).
Sep: CAD's HIGHEST CONVICTION REVERSAL — 40-YR & 15-YR hit absolute annual peak ~100 mid-month then collapse (inverted: flips from bearish to powerfully bullish for AUDCAD).
Oct: CAD sharp post-peak waterfall — drops from 100 toward ~75 (inverted: strongly bullish for AUDCAD).
Nov: CAD continued decline toward its annual lows (inverted: bullish for AUDCAD).
Dec: CAD basing near annual lows — directionless (inverted: neutral, no longer opposing AUD).

=== COMBINED NET EFFECT ===
Jan–Feb: AUD bull + CAD bear (inverted bull) = double alignment bullish. Highest conviction long window of Q1, 5★.
Mar: AUD's clean Q1 bull dominates CAD's early-stage, choppy recovery — net long, conviction easing late month as CAD begins to firm.
Apr: AUD's violent flip-to-short collides with CAD's clean bull rally (inverted bearish) — both turn against AUDCAD simultaneously. THE most violent flip-short setup of the year, 5★.
May: AUD's deepest bear month outweighs a CAD that is itself rolling over (inverted, beginning to turn bullish) — net bearish but increasingly choppy as the month progresses.
Jun: Both currencies sit at their own troughs simultaneously — AUD bearish vs CAD bearish (inverted bullish) — the two largely cancel out. Choppiest, lowest-edge month of the year.
Jul: CAD's most powerful recovery of its year (inverted bearish) overrides AUD's mixed/choppy signal — CAD becomes dominant, net short.
Aug: AUD's secondary bear leg + CAD's continued bull run toward its peak (inverted bearish) = clean double alignment. Cleanest short window of the year, 5★.
Sep: CAD's single highest-conviction reversal of its own year (peak-then-collapse, inverted) overwhelms AUD's continuing bear bias mid-month — THE most violent reversal of the AUDCAD calendar, flipping from short to the year's highest-conviction long, 5★.
Oct–Nov: CAD's sharp post-peak waterfall (inverted bullish) dominates AUD's directionless base-building, then AUD's own late-Nov turn reinforces it — building into the longest aligned bullish run of the AUDCAD year.
Dec: AUD's confirmed Q1-entry recovery is the clear, clean driver while CAD bases at its annual lows (no longer opposing) — AUD dominance closes out the bullish run.

=== PLAYBOOK SIGNALS ===
AUDCAD HIGHEST CONVICTION LONG: September Wk2 → December (CAD's violent reversal flips into the longest, cleanest aligned bullish run of the year, capped by AUD's own December recovery).
AUDCAD HIGHEST CONVICTION SHORT: April (AUD's flip-to-short + CAD's clean bull rally — double alignment reversal, 5★) and August (clean double-alignment bear, 5★).
AUDCAD SECONDARY LONG: January–February (double alignment bullish, 5★).
AUDCAD AVOID: June (two simultaneous troughs cancel each other out — lowest-edge, choppiest month of the year).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for AUDCAD explaining how the AUD and CAD seasonal forces interact month by month, with special attention to the September reversal and the long Sep–Dec bullish stretch.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (AUD or CAD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction AUDCAD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly.
`;
