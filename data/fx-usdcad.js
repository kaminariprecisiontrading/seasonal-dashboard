/**
 * data/fx-usdcad.js — USDCAD Forex Seasonal
 * Derived from: USD Index/ICE futures + CAD/USD CME futures
 * Methodology: USD seasonal tendency vs inverted CAD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-usdcad",
  name:     "USD / CAD",
  sub:      "Forex Seasonal · Derived from USD ICE + CAD CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · USD Index ICE (35-YR) · CAD/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "USD seasonal bull + CAD seasonal bear (fading its Jan 1 open spike) = double alignment bullish for USDCAD. Highest conviction long window of Q1.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"USD rising while CAD fades its open spike and collapses. Both components push USDCAD higher — strong entry." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Full alignment continues. CAD declining, USD climbing. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Trend intact — both components reinforcing USDCAD upside." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Late Jan — USD strong, CAD weak. Carry the long into Feb." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "USD continuing its push toward its 35-YR peak (LONG → WATCH) while CAD remains in structural decline. Double alignment persists, though USD nearing its own turning point — manage the back half of the month carefully.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"USD still climbing, CAD still declining. Hold longs — alignment intact." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Continuation. Both components reinforcing USDCAD strength." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"USD nearing its 35-YR peak — still bullish, but watch for the turn." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★★☆☆", note:"USD peaking late Feb (set to decline = bearish for USDCAD). CAD still weak. Begin trimming longs ahead of the USD turn." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED / WATCH", stars: 2,
    note: "USD now declining from its peak (bearish for USDCAD) while CAD enters its own choppy transition (flip zone, no clean signal). Two competing forces — net bias turns cautious/short-leaning, lowest conviction window of Q1.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT / WATCH ★★☆☆☆", note:"USD declining post-peak. CAD still indecisive. Lean toward USDCAD weakness but keep size light." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"CAD entering its own transition zone — conflicting with USD's decline. No clean edge." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Both components in flux. Stand aside — wait for April's clearer signals." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"USD still soft. CAD beginning to firm into its April bull window — early warning of a coming bearish USDCAD phase." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "USD's complex flip month (bear Wk1–3, then bull Wk4) collides directly with CAD's clean seasonal bull window (5-YR spikes ~85–90 mid-April — bearish for USDCAD). Through Wk1–3 both components align bearish for USDCAD; Wk4's USD flip creates late-month conflict.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"USD declining, CAD rallying hard into its mid-April spike. Both push USDCAD lower — high conviction short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD at its seasonal peak strength while USD remains weak. Double alignment — strongest short window of the month." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD beginning to roll over from its spike but still elevated; USD still declining. Hold shorts." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"FLIP WATCH ★★☆☆☆", note:"USD flips bullish into Wk4 (bullish for USDCAD) just as CAD starts fading from its peak (also bullish for USDCAD). Conflict resolving — prepare to flip long into May." },
    ]
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Both components now align fully bullish for USDCAD: USD at its seasonal trough turning up, CAD entering its deep May–Jun waterfall. Double alignment — highest conviction long window of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"USD basing and turning up from its trough; CAD beginning its waterfall decline. Both reinforce USDCAD strength — enter long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"CAD waterfall accelerating, USD recovering. Full alignment — press the long." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"CAD deep in its trough phase; USD firm. Highest conviction long of the month." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD still weak, USD steady. Carry the long into Jun — alignment intact." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Continuation of the double-alignment bull theme — USD bouncing while CAD remains stuck in its May–Jun waterfall trough (bearish for CAD = bullish for USDCAD). One of the cleanest extended windows of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"USD bouncing, CAD still mired in its trough. Both reinforce USDCAD — hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Continuation. CAD remains the weaker leg." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD still depressed near its lows. USD firm. Maintain exposure." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★★☆☆", note:"CAD beginning to base ahead of its Jul–Aug recovery. USD bounce also fading. Begin tightening — both legs approaching their own turns." },
    ]
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "CAD's strong seasonal recovery (5★, the cleanest bull leg on its own chart) overwhelms a low-conviction, exiting USD (2★). CAD becomes the dominant driver — net USDCAD turns bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD's recovery accelerating sharply; USD directionless and exiting positions. CAD dominant — flip short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CAD strength is the clean signal here — USD offers no resistance. Highest conviction short of the month." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CAD still rallying hard into Aug. Hold shorts — CAD remains dominant." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD beginning its own Aug bear leg (reinforcing USDCAD downside) while CAD recovery continues. Both now align bearish — press shorts into Aug." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "A genuine head-to-head conflict: USD in a clean seasonal bear leg (bullish for USDCAD) directly opposes CAD's continuing strong recovery (bearish for USDCAD). CAD's higher conviction (4★ vs USD's 4★, but CAD's move is the cleaner/more decisive trend) tips the balance toward continued USDCAD weakness, though expect more chop than July.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"CAD recovery still firm; USD beginning to decline (also bearish for USDCAD by adding to CAD strength's effect — wait, USD bear is bullish for USDCAD). Conflict — CAD's trend wins out early in the month." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"CAD continues to outpace USD's bear-leg offset. Net USDCAD pressure remains down." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both components flattening into their respective Sep turning points. Reduce size — high volatility ahead." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Pre-Sep positioning. CAD nearing its absolute peak; USD nearing its own trough. Stand aside ahead of the Sep flip." },
    ]
  },
  {
    month: "September", sig5: "bull", sig15: "bear", sigLt: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "CAD's HIGHEST CONVICTION REVERSAL of its entire year lands here — the 40-YR and 15-YR spike to their absolute annual peak ~100 mid-month then collapse (CAD playbook: 'long Wk1, flip short Wk2–3'). That CAD collapse, combined with USD's own seasonal bear phase fading into its Oct reversal, creates a powerful late-month double alignment bullish for USDCAD. The single most important flip month of the USDCAD year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", sLt:"bear", com:"SHORT / FADE ★★★☆☆", note:"CAD still pressing toward its absolute peak (bearish for USDCAD short-term). USD weak. Counter-trend — do not fight the CAD spike yet, but do not chase USDCAD lower either." },
      { wk:"Wk 2", s5:"bull", s15:"bear", sLt:"bull", com:"FLIP → LONG ★★★★★", note:"CAD peaks at ~100 and reverses sharply — its highest-conviction turn of the year. USD also stabilising. Flip long aggressively." },
      { wk:"Wk 3", s5:"bull", s15:"bear", sLt:"bull", com:"LONG ★★★★★", note:"CAD collapse accelerating from its peak. USD steadying. Double alignment — highest conviction long window of the quarter." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CAD waterfall continuing into Oct; USD beginning its own major reversal higher. Both reinforcing — carry the long into Oct." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "USD's MAJOR seasonal reversal (bear → bull, its strongest single turning point of the year) lands in perfect sync with CAD's continuation lower from its Sep collapse. Double alignment bullish — one of the two highest-conviction long windows of the USDCAD calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"USD's major reversal confirms; CAD still falling from its Sep peak. Both align — press longs hard." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"USD strength building into its strongest seasonal window; CAD continuing its post-peak decline. Full alignment." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Both legs reinforcing. Hold — the alignment carries straight into Nov." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Momentum accelerating into Nov. No reason to exit — both components remain aligned bullish for USDCAD." },
    ]
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Continuation of the Oct double alignment — USD enters its single strongest seasonal window of the entire year while CAD remains in bear continuation. The cleanest, longest-running bullish stretch on the USDCAD calendar (Sep Wk2 through end of year).",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"USD surging seasonally; CAD still declining. Maximum alignment — add to longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"USD strength persists at full conviction. CAD lagging. Hold the position." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Both components remain aligned. No exit signal — continue to carry." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Late Nov — USD still in its bull window, CAD basing near lows. Maintain longs into Dec." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "USD closes the year in its strongest seasonal stretch (bullish for USDCAD) while CAD merely chops at its annual lows (low conviction, roughly neutral). USD remains the clear dominant driver — sustained long bias into year-end.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"USD still climbing toward its year-end peak. CAD directionless at its lows. USD dominant — hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"USD strength continues unopposed. CAD offers no resistance. Maintain exposure." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"USD pressing toward its absolute year-end peak. CAD still basing. Hold." },
      { wk:"Wk 4", s5:"bull", s15:"chop", sLt:"chop", com:"LONG / WATCH ★★★☆☆", note:"USD peak forming into year close. CAD remains flat. Begin trimming as USD's own Jan turn approaches — but the year-end window remains constructive for USDCAD." },
    ]
  },
];

const SEASONAL_DATA = `
USDCAD — FOREX SEASONAL ANALYSIS
Derived from: USD Index ICE Futures (35-YR seasonal) + CAD/USD CME Futures (40-YR seasonal)
Methodology: USD seasonal tendency combined with inverse CAD seasonal tendency.

=== USD COMPONENT (bullish USD = USDCAD rising) ===
Jan: USD bullish (bullish for USDCAD).
Feb: USD "LONG → WATCH" — peak forming late month.
Mar: USD declining from its peak (bearish for USDCAD).
Apr: USD FLIP MONTH — bear Wk1–3, then bull Wk4.
May: USD at its seasonal trough, turning up (bullish for USDCAD).
Jun: USD bull bounce (bullish for USDCAD).
Jul: USD mixed / exiting positions — low conviction.
Aug–Sep: USD bearish (bearish for USDCAD), fading into its Oct reversal.
Oct: USD MAJOR REVERSAL — flips from bear to bull (bullish for USDCAD from here).
Nov–Dec: USD in its single strongest seasonal window of the year — all TFs aligned bull (bullish for USDCAD).

=== CAD COMPONENT (bullish CAD = USDCAD falling) ===
Jan: CAD bearish — 5-YR spikes ~95 at the Jan 1 open then collapses; fade the open spike (bullish for USDCAD).
Feb: CAD bearish, continuing lower (bullish for USDCAD).
Mar: CAD choppy / flip transition zone — no clean signal.
Apr: CAD bullish — 5-YR spikes to ~85–90 mid-April, its cleanest bull window (bearish for USDCAD).
May–Jun: CAD bearish — deep waterfall trough (bullish for USDCAD).
Jul–Aug: CAD strong bull recovery (bearish for USDCAD).
Sep: CAD's HIGHEST CONVICTION REVERSAL of the year — 40-YR & 15-YR spike to absolute annual peak ~100 mid-month then collapse. "Long Wk1, flip short Wk2–3" on CAD's own chart.
Oct–Nov: CAD bear continuation, declining from its Sep peak (bullish for USDCAD).
Dec: CAD chop / basing at annual lows — low conviction, roughly neutral.

=== COMBINED NET EFFECT ===
Jan–Feb: USD bull + CAD bear = double alignment bullish. Strong long window, though USD nears its turn late Feb.
Mar: USD declining from its peak + CAD in its own choppy transition = conflicting, low-conviction, lean cautious/short.
Apr: USD's Wk1–3 decline aligns with CAD's clean bull spike = both bearish for USDCAD; USD's Wk4 flip to bull creates late-month conflict that resolves into May.
May–Jun: USD recovering from its trough + CAD deep in its waterfall = double alignment bullish. Cleanest extended long stretch alongside Oct–Dec.
Jul–Aug: CAD's strong, clean recovery overwhelms a low-conviction/declining USD = CAD becomes dominant, net USDCAD turns bearish.
Sep: CAD's biggest reversal of its year (peak then collapse) + USD's bear phase fading into its own Oct turn = explosive flip month — short-lived CAD strength early, then a powerful double-alignment bullish stretch from Wk2 onward.
Oct–Dec: USD's major reversal and strongest seasonal window align with CAD's post-peak decline and year-end basing = double alignment bullish. The single longest, cleanest bullish run of the USDCAD calendar.

=== PLAYBOOK SIGNALS ===
USDCAD HIGHEST CONVICTION LONG: September Wk2 → December (CAD's post-peak collapse meets USD's major reversal and strongest seasonal window — the longest aligned bull stretch of the year, 5★).
USDCAD SECONDARY LONG: January (double alignment, fading CAD's open spike, 5★) and May–Jun (USD recovery + CAD waterfall, 5★).
USDCAD HIGHEST CONVICTION SHORT: April Wk1–3 (CAD's cleanest bull spike meets USD's bear phase, 5★) and July (CAD's strong recovery overwhelms a passive USD).
USDCAD AVOID / LOW CONVICTION: March and late August (components in transition or direct conflict — defer to whichever shows the cleaner trend).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for USDCAD explaining how USD and CAD seasonal forces interact month by month, with special attention to the long Sep–Dec aligned bullish stretch.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (USD or CAD) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction USDCAD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly.
`;
