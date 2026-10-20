/**
 * data/fx-eurusd.js — EURUSD Forex Seasonal
 * Derived from: EUR/USD CME futures + USD Index/ICE futures
 * Methodology: EUR seasonal tendency vs inverted USD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-eurusd",
  name:     "EUR / USD",
  sub:      "Forex Seasonal · Derived from EUR CME + USD ICE Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · USD Index ICE (35-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "EUR seasonal bear (5-YR sells the Jan 1 spike) + USD seasonal bull = double bearish alignment for EURUSD. Highest conviction short window of Q1.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR fading the Jan open spike while USD rises. Both components push EURUSD down — sell the open." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR declining, USD climbing. Full alignment — hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Continuation. EUR weak, USD strong. No reason to cover." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Late Jan — both components still aligned bearish for EURUSD." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR continuing lower. USD pushing toward its 35-YR peak (LONG → WATCH). Both components remain aligned bearish for EURUSD — though USD nearing its own turn.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR weak, USD still climbing toward its peak. Hold shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Continued alignment. EUR grinding lower." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"USD approaching its 35-YR peak — watch for early USD rollover signal." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"WATCH ★★★☆☆", note:"USD peaking late Feb (turns bearish for USD = bullish for EURUSD). EUR still weak — net unclear, prepare for shift." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "EUR's annual trough/flip month (recovery from Wk1–2 low) coincides with USD's post-peak decline (mixed → falling). Double tailwind develops — strongest flip-long setup of Q1.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"FLIP WATCH ★★★☆☆", note:"EUR still finishing its trough. USD rolling over from its peak. Wait for EUR confirmation." },
      { wk:"Wk 2", s5:"bull", s15:"chop", sLt:"chop", com:"FLIP → LONG ★★★★☆", note:"EUR troughs and turns. USD declining. Both now favour EURUSD higher — flip long." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR recovering sharply, USD falling. Double tailwind — highest conviction long of the month." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Trend intact. Both components aligned bullish for EURUSD." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "EUR's lowest-conviction month (chop, no directional bias) collides with USD's complex flip month (bear Wk1–3 → bull Wk4). Net EURUSD signal is muddy — defer to USD's flip as the cleaner driver late month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"EUR directionless. USD declining (bullish for EURUSD) but low conviction. No clean edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"LONG / WATCH ★★☆☆☆", note:"USD still in its bear leg — modest EURUSD tailwind. EUR remains neutral." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG / WATCH ★★☆☆☆", note:"USD bear phase persisting. Light long bias on USD weakness alone." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"FLIP → SHORT ★★★☆☆", note:"USD flips bullish into Wk4 (bearish for EURUSD) while EUR stays flat. USD becomes the dominant driver — flip short." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's most bearish month of the year (22-YR collapses toward absolute lows) overwhelms a softening USD (bear/trough — modestly bullish for EURUSD). EUR is dominant — net EURUSD bearish, second-highest conviction short of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"LONG / FADE ★★☆☆☆", note:"EUR's brief Wk1 bounce before the collapse. USD also softening. Short-lived long — do not chase." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR begins its waterfall toward annual lows. USD trough only partially offsets — EUR dominant. Flip short hard." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR collapse accelerates. USD weak but EUR weakness far outweighs it. Highest conviction short of the month." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR near annual low. USD beginning to stabilise. EUR still dominant — hold shorts into Jun." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "chop", sigLt: "flip",
    combined: "chop", combinedLabel: "MIXED / FLIP", stars: 3,
    note: "EUR's annual-low flip month (recovery begins from the floor) meets a USD bull bounce (bearish for EURUSD). Two competing turns — expect early chop resolving toward EUR-led recovery by month end.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT / COVER ★★★☆☆", note:"EUR still finishing its capitulation at the annual low. USD bouncing. Both bearish briefly — but EUR low is near." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"EUR basing at the floor. USD bounce continuing. Conflicting forces — stand aside." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"EUR beginning its turn off the lows. USD bounce fading. Early signs favour EURUSD higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG / WATCH ★★★☆☆", note:"EUR recovery gaining traction; USD bounce losing steam. Cautious long bias building into Jul." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "Both components in low-conviction chop — EUR directionless, USD mixed/exiting its own positions. No clean EURUSD edge. Lowest conviction window alongside August.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"EUR and USD both choppy. No edge — stand aside." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Continued lack of directional confluence." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Still no edge. Avoid forcing a trade here." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"USD beginning to roll over (early bullish signal for EURUSD) but EUR remains flat. Light watch only." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "EUR's lowest-conviction month of the year (near-flat) is overridden by USD's clean seasonal bear leg (bullish for EURUSD). USD becomes the dominant driver — modest long bias by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"EUR flat. USD beginning its decline — early tailwind for EURUSD." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"USD bear leg firms up. EUR still passive but not opposing. Net EURUSD modestly bullish." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"USD weakness persists — the cleaner signal. Hold long on USD-led drift." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"Building into Sep. USD remains the dominant (bearish-for-USD) driver." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "chop", combinedLabel: "MIXED / SHORT", stars: 3,
    note: "EUR turns bearish into its autumn decline while USD also weakens (bullish for EURUSD) — a direct conflict. EUR's slightly higher conviction (4★ vs USD's 3★) tilts the net bias toward EURUSD weakness, but expect choppier price action than the raw EUR signal alone suggests.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"EUR rolling over. USD also soft. Conflicting — no clean edge yet." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"EUR weakness becomes the clearer signal despite USD softness. Lean short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"EUR dominant — continue to favour EURUSD downside." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"chop", com:"SHORT / WATCH ★★☆☆☆", note:"Both components nearing their own turning points. Reduce size — Oct flips approaching for both." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "EUR's flip month (brief Wk1 bounce, then short Wk2–4) lines up with USD's MAJOR seasonal reversal (bear → bull, bearish for EURUSD). From Wk2 onward both components push EURUSD lower in unison — high conviction short window opens mid-month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"MIXED ★★☆☆☆", note:"EUR's brief Wk1 bounce vs USD beginning its major reversal. Conflicting — do not chase the EUR bounce." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR flips short as planned; USD reversal confirms and strengthens. Both aligned — enter short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Double alignment — EUR declining into its Nov collapse, USD surging into its strongest seasonal window. Highest conviction short of the month." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"Momentum building toward the Nov extremes on both sides. Hold shorts — the best is yet to come." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "THE standout month of the EURUSD calendar. EUR collapses to its absolute annual lows (highest conviction short of the year on its own chart) at the exact moment USD enters its strongest seasonal bull window (also highest conviction). Full double alignment — the single highest-conviction EURUSD trade of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR accelerating toward its annual floor; USD surging. Both components at maximum conviction — press shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR approaching absolute lows (~0–10 on 22-YR). USD still climbing. Textbook double-alignment short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at/near absolute annual lows. USD at peak strength. Maximum conviction — the defining EURUSD trade of the year." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Late Nov — EUR basing near its floor while USD remains dominant. Hold shorts; prepare for the Dec EUR reversal." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "EUR stages its mirror-image year-end recovery (22-YR surges from ~0 toward ~75–80 — the cleanest reversal of the year) directly against USD's continuing seasonal bull strength. EUR's reversal is the more dramatic and decisive move — it overtakes USD's strength as the month progresses, flipping EURUSD from short to long.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"FLIP WATCH ★★★☆☆", note:"EUR begins its sharp reversal off the Nov floor. USD still elevated — early conflict, do not fight the EUR turn." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"FLIP → LONG ★★★★☆", note:"EUR recovery accelerating fast — the dominant move of the pair. USD strength offsets only partially. Flip long." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR surging hard off its lows; even a strong USD cannot offset the magnitude of the EUR reversal. High conviction long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"EUR closing the year near its recovery highs. Carry the long into the new Jan cycle, but note Jan historically reopens with a EUR sell-the-spike — manage exits." },
    ]
  },
];

const SEASONAL_DATA = `
EURUSD — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal, EUR launched 1999) + USD Index ICE Futures (35-YR seasonal)
Methodology: EUR seasonal tendency combined with inverse USD seasonal tendency.

=== EUR COMPONENT (bullish = EUR rising = EURUSD rising) ===
Jan–Feb: EUR bearish — 5-YR sells the Jan 1 open spike, structural decline continues.
Mar: EUR ANNUAL TROUGH / FLIP — bottoms Wk1–2, sharp recovery follows.
Apr: EUR lowest directional bias of the year — chop, no clean edge.
May: EUR MOST BEARISH MONTH (22-YR) — collapses toward near-absolute annual lows. Brief Wk1 bounce then strong Wk2–4 waterfall.
Jun: EUR FLIP MONTH — annual low reached, recovery begins.
Jul: EUR chop — directionless.
Aug: EUR lowest-conviction month of the entire year — near flat.
Sep: EUR turns bearish heading into autumn decline.
Oct: EUR FLIP MONTH — Wk1 bounce then short Wk2–4.
Nov: EUR ABSOLUTE ANNUAL LOWS — all timeframes converge near 0–10. Highest conviction short of the EUR year.
Dec: EUR STRONG BULL — mirror-image year-end recovery, 22-YR surges from ~0 toward ~75–80.

=== USD COMPONENT (bullish USD = EURUSD falling) ===
Jan: USD rising (bearish for EURUSD).
Feb: USD "LONG → WATCH" — peak forming late month.
Mar: USD mixed — peaks then declines (bullish for EURUSD as the decline takes hold).
Apr: USD FLIP MONTH — bear Wk1–3 then bull Wk4 (bullish for EURUSD early, bearish late).
May: USD bear / trough (bullish for EURUSD).
Jun: USD bull bounce (bearish for EURUSD).
Jul: USD mixed / exiting positions — low conviction.
Aug–Sep: USD bearish (bullish for EURUSD).
Oct: USD MAJOR REVERSAL — flips from bear to bull (bearish for EURUSD from here).
Nov–Dec: USD in its strongest seasonal window of the year — all TFs aligned bull (bearish for EURUSD).

=== COMBINED NET EFFECT ===
Jan–Feb: EUR bear + USD bull = double alignment bearish. Highest conviction short window of Q1.
Mar: EUR flips to recovery while USD declines from its peak = double tailwind. Strong flip-long month.
Apr: EUR chop + USD's own internal flip = muddy, low-conviction, defer to USD's Wk4 reversal as the cleaner signal.
May: EUR collapses to its worst month of the year while USD merely softens = EUR dominant, net bearish.
Jun: Two competing turns — EUR basing at its low, USD bouncing = choppy, resolving toward EUR-led recovery by month end.
Jul: Both components low-conviction chop = avoid.
Aug: EUR near-flat, USD in a clean bear leg = USD becomes the dominant driver, modest long by elimination.
Sep: EUR turns bearish, USD also softens = direct conflict; EUR's slightly higher conviction tilts net bias bearish but choppier than the raw EUR signal.
Oct: EUR flips short Wk2–4 exactly as USD's major reversal takes hold = both align bearish from Wk2 — high conviction short window opens.
Nov: EUR's absolute annual lows + USD's strongest seasonal bull window = full double alignment. THE highest-conviction EURUSD trade of the year (short).
Dec: EUR's dramatic mirror-image recovery overtakes USD's continuing strength = EUR dominance flips EURUSD from short to long.

=== PLAYBOOK SIGNALS ===
EURUSD HIGHEST CONVICTION SHORT: November (EUR absolute lows + USD peak strength — full double alignment, 5★).
EURUSD SECONDARY SHORT: January (double alignment bearish, 5★) and Oct Wk2–4 (both components turning bearish in unison).
EURUSD HIGHEST CONVICTION LONG: March (EUR flip-recovery + USD post-peak decline — double tailwind, 5★) and December (EUR's dramatic reversal overtakes USD strength).
EURUSD AVOID: April, July, August (low-conviction chop / conflicting signals — defer to whichever component shows the cleaner trend).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURUSD explaining how EUR and USD seasonal forces interact month by month, with special attention to the November double-alignment extreme.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or USD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURUSD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly.
`;
