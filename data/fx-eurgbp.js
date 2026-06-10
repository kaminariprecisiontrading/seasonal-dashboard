/**
 * data/fx-eurgbp.js — EURGBP Forex Seasonal
 * Derived from: EUR/USD CME futures + GBP/USD CME futures
 * Methodology: EUR seasonal tendency vs inverted GBP seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-eurgbp",
  name:     "EUR / GBP",
  sub:      "Forex Seasonal · Derived from EUR CME + GBP CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · EUR/USD CME (22-YR) · GBP/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR's structural decline (selling its Jan 1 spike, 4★) directly opposes GBP's own modest opening bear leg (inverted bullish for EURGBP, only 2★). EUR's significantly higher conviction dominates a low-conviction GBP move — net bias leans bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★★☆☆", note:"EUR fading its open spike (bearish, dominant) while GBP also drifts lower (inverted bullish, low conviction). EUR's structural move controls the pair." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★★☆☆", note:"EUR declining with conviction; GBP's weak bear leg (inverted bullish) only partially offsets. Hold light shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★☆☆☆", note:"EUR continuing lower; GBP drifting toward its own February trough (inverted bullish, narrowing). EUR remains the cleaner driver." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT LEAN ★★☆☆☆", note:"Late Jan — EUR's edge persists as GBP nears its base. Light short bias only." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sigLt: "chop",
    combined: "bear", combinedLabel: "SHORT LEAN", stars: 3,
    note: "EUR continues its structural decline through most of the month while GBP carves out its primary annual trough — bearish early (inverted bullish, conflicting), then turning bullish late February (inverted bearish, realigning with EUR). The month closes in alignment.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT LEAN ★★☆☆☆", note:"EUR weak (bearish, dominant) while GBP is still finishing its own decline into its trough (inverted bullish, conflicting narrowly). EUR's structural conviction controls." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"GBP basing at its annual trough (inverted, turning neutral) — the offset narrows. EUR continues to grind lower." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"GBP begins its recovery off the trough (inverted bearish — now realigning with EUR's decline). Double alignment forming." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"GBP's rally building (inverted bearish) as EUR also nears its own March trough. Both now aligned bearish for EURGBP — hold into the flip." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bear", sigLt: "chop",
    combined: "chop", combinedLabel: "CONTESTED / BEAR LEAN", stars: 3,
    note: "Direct collision of two strong trends: EUR stages its annual-trough flip and turns up (bullish for EURGBP) at the exact moment GBP enters its STRONGEST, CLEANEST BULL WINDOW of the entire year (5★ on its own chart, inverted bearish for EURGBP — and the higher-conviction move of the two). GBP's superior conviction and cleaner trend gives it the edge.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"EUR still finishing its trough (bearish) while GBP's historic bull run accelerates (inverted bearish). Both aligned short — but EUR's reversal is imminent." },
      { wk:"Wk 2", s5:"bull", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR troughs and turns up (bullish) directly against GBP's continuing 5★ bull run (inverted bearish, higher conviction). Direct conflict — GBP's cleaner trend likely dominates." },
      { wk:"Wk 3", s5:"bull", s15:"bear", sLt:"chop", com:"BEAR LEAN ★★★☆☆", note:"EUR's recovery firms but GBP's strongest bull window of the year (inverted bearish, 5★) carries the larger conviction. Lean toward EURGBP weakness." },
      { wk:"Wk 4", s5:"bull", s15:"bear", sLt:"chop", com:"BEAR LEAN ★★★☆☆", note:"GBP approaching its absolute peak (inverted bearish, maximum conviction) while EUR's bounce continues but with less force. GBP's superior conviction dominates into April's violent flip." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "EUR's directionless chop is completely overshadowed by GBP's PEAK→SELL playbook month — the single most violent reversal of GBP's entire year (5★, all 3 TFs hit absolute peak simultaneously then collapse). Early-month GBP strength (inverted bearish) flips to GBP collapse (inverted bullish) by Wk2 — GBP is overwhelmingly the dominant driver.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP at its absolute annual peak (inverted bearish, dominant, maximum conviction). EUR directionless — GBP fully controls the pair. Sell." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"FLIP → LONG ★★★★★", note:"GBP's historic collapse begins — all 3 TFs roll over simultaneously (inverted: now powerfully bullish for EURGBP). EUR remains neutral; GBP's reversal is the entire story. Flip long with conviction." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★★★", note:"GBP's waterfall decline confirmed across all TFs (inverted bullish, maximum conviction). EUR still flat — GBP fully dominant. Highest conviction long of the month." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★★☆", note:"GBP's playbook SELL Wk4 confirms the collapse (inverted bullish). Hold longs — GBP remains the dominant, cleaner signal into May." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MAXIMUM CONFLICT", stars: 3,
    note: "The single most contested month of the EURGBP year — a genuine coin-flip. EUR stages its MOST BEARISH MONTH of its entire year (22-YR collapsing toward near-absolute lows ~5–10, 5★ bearish for EURGBP) in the very same month that GBP continues its own steep waterfall decline from the April peak (5★ bearish on its own chart — but INVERTED, making it bullish for EURGBP). Both currencies post their highest-conviction moves of the year in directly opposing directions for the pair.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR's brief Wk1 bounce before its collapse vs GBP's steep continuing decline (inverted bullish, maximum conviction). Direct conflict from the opening bell." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR begins its waterfall toward annual lows (bearish, 5★) while GBP's waterfall also peaks in conviction (inverted bullish, 5★). Two highest-conviction moves of the year colliding head-on — reduce size, expect violent two-way action." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"MAXIMUM CONFLICT ★★★☆☆", note:"EUR's collapse toward ~5–10 vs GBP's continuing high-conviction decline (inverted bullish). Both at peak conviction in opposite directions — a genuine coin-flip, avoid forcing direction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"CONTESTED ★★★☆☆", note:"EUR near its absolute annual low; GBP also flattening toward its own June trough (inverted, easing). The stand-off begins to resolve as both currencies approach their respective bases." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 2,
    note: "EUR's annual-low flip month (recovery beginning from its floor) finds a cleaner, higher-conviction signal than GBP's own low-conviction, unconfirmed mid-year bounce (inverted, similarly weak). EUR's clearer recovery dominates by comparison.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"COVER ★★☆☆☆", note:"EUR finishing its capitulation at the annual low; GBP's bounce just beginning (inverted bearish, low conviction). Cover remaining shorts — EUR's low is near." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"NEUTRAL ★★☆☆☆", note:"EUR basing at the floor; GBP's unconfirmed bounce continuing (inverted bearish, weak). Stand by for EUR's turn — the cleaner signal." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"LONG LEAN ★★★☆☆", note:"EUR turning up off its lows (the higher-conviction signal); GBP's bounce fading (inverted, losing its weak edge). EUR's recovery becomes dominant." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"EUR's recovery firming while GBP slips back into chop (inverted, no longer opposing). EUR's cleaner trend now controls — long bias building into July." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "AVOID", stars: 1,
    note: "Both currencies enter their lowest-conviction stretches simultaneously — EUR directionless, GBP volatile and equally without a reliable signal (inverted, similarly noisy). No clean EURGBP edge whatsoever — one of the lowest-conviction windows of the entire year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"EUR and GBP both directionless. No edge — stand aside." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Continued lack of directional confluence on either side." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Still no edge. Both currencies whipsawing without conviction." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"No improvement heading into August. Avoid forcing a trade here." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG LEAN", stars: 2,
    note: "EUR's lowest-conviction month of its entire year (near-flat) faces off against GBP's own continued chop — though GBP's late-August secondary decline begins to emerge (inverted bullish for EURGBP). The marginal edge tilts bullish only by virtue of GBP's late-month move.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Both currencies remain directionless. No edge yet." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Continued chop on both sides." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★☆☆☆☆", note:"Still no clean direction — EUR remains the lowest-conviction asset of its own year here." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"LONG LEAN ★★☆☆☆", note:"GBP begins its secondary decline into the September trough (inverted bullish — the only emerging signal). Modest long lean by elimination." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "CONTESTED", stars: 2,
    note: "EUR drops toward its own secondary trough (bearish for EURGBP, 4★) at the same time GBP also declines toward its secondary annual trough (inverted bullish for EURGBP, also 4★). Two comparable-conviction moves in directly opposing directions for the pair largely cancel, producing a low-edge, choppy month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR and GBP both declining toward their respective secondary troughs — directly offsetting effects on EURGBP. No clean edge." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR weakness and GBP weakness (inverted bullish) directly oppose at comparable conviction — net effect muted. Trade small if at all." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR approaching its trough; GBP also nearing its own secondary low. Roughly balanced — avoid forcing direction." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both currencies basing at their respective lows ahead of October's recoveries. Stand aside." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "EUR's flip month (brief Wk1 bounce, then resumed decline) faces a cleaner, higher-conviction opposing force in GBP's confirmed recovery off its September trough (inverted bearish for EURGBP, 4★). GBP's cleaner trend becomes the dominant driver.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"EUR's brief Wk1 bounce vs GBP's recovery rally just beginning (inverted bearish). Conflicting — do not chase the EUR bounce." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"EUR flips back to its decline (bearish) while GBP's recovery firms (inverted bearish). Double alignment forming — enter short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR's decline accelerating toward November while GBP's rally continues (inverted bearish). Both aligned — hold shorts with rising conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Double alignment confirmed heading into November. EUR collapsing, GBP climbing (inverted bearish). Hold into the standout month." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "DOUBLE ALIGNMENT — the highest-conviction short of the EURGBP year. EUR stages its single highest-conviction trade of its own entire year (collapsing to ABSOLUTE ANNUAL LOWS, all TFs aligned, 5★ bearish for EURGBP) in the exact same month that GBP's 40-YR peaks at its own annual high ~75–80 (4★ bullish on its own chart — INVERTED, also bearish for EURGBP). Both components reinforce each other at near-maximum conviction. A textbook double-alignment trade.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR accelerating toward its annual floor at maximum conviction; GBP's 40-YR climbing toward its own peak (inverted bearish). Double alignment — press shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR approaching absolute lows (~0–10 on the 22-YR); GBP continuing its strong rally (inverted bearish). Textbook double alignment — maximum conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"EUR at its absolute annual lows — the single highest-conviction trade of its own year. GBP's 40-YR near its annual peak (inverted bearish). Both components at peak conviction simultaneously — the defining EURGBP trade of the year." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★★☆", note:"EUR basing near its floor; GBP beginning to roll from its peak (inverted bearish, still confirming). Hold shorts — both components remain aligned into the December mirror trade." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "DOUBLE ALIGNMENT — the mirror image of November, and the highest-conviction long of the EURGBP year. EUR stages its STRONG BULL year-end recovery (22-YR surging from ~0 toward ~75–80, 5★ bullish for EURGBP) in the exact same month that GBP declines into its own seasonal year-end weakness (3★ bearish on its own chart — INVERTED, also bullish for EURGBP). Both components reinforce each other for a clean, high-conviction close to the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★★☆", note:"EUR beginning its sharp reversal off the Nov floor (bullish, dominant) while GBP starts its year-end decline (inverted bullish). Double alignment forming — flip long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR's recovery accelerating fast (its highest-conviction reversal of the year) while GBP's weakness deepens (inverted bullish). Full alignment — maximum conviction." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR surging hard off its lows; GBP's 5-YR and 15-YR hitting near-annual lows (inverted bullish). Double alignment confirmed — the mirror image of November's setup." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"EUR closing the year near its recovery highs while GBP closes near its own annual lows (inverted bullish). Both components aligned at high conviction — carry longs into the new year's reopening." },
    ]
  },
];

const SEASONAL_DATA = `
EURGBP — FOREX SEASONAL ANALYSIS
Derived from: EUR/USD CME Futures (22-YR seasonal) + GBP/USD CME Futures (40-YR seasonal)
Methodology: EUR seasonal tendency combined with the inverse of GBP seasonal tendency (EUR is the base currency — direct; GBP is the quote currency — inverted).

=== EUR COMPONENT (bullish EUR = EURGBP rising) ===
Jan–Feb: EUR bearish — structural decline, sells the Jan 1 open spike (4★).
Mar: EUR ANNUAL TROUGH / FLIP — bottoms Wk1–2, sharp recovery follows (4★).
Apr: EUR's lowest directional bias of the year — chop (2★).
May: EUR's MOST BEARISH MONTH (22-YR) — collapses toward near-absolute annual lows ~5–10 (5★, EUR's single highest-conviction trade of the year on the short side).
Jun: EUR FLIP MONTH — annual low reached, recovery begins (3★).
Jul: EUR chop — directionless (2★).
Aug: EUR's lowest-conviction month of the entire year — near flat (1★).
Sep: EUR turns bearish, dropping toward its secondary trough (4★).
Oct: EUR FLIP MONTH — Wk1 bounce then resumes its decline Wk2–4 (3★).
Nov: EUR's ABSOLUTE ANNUAL LOWS — single highest-conviction short of its entire year (5★).
Dec: EUR STRONG BULL — mirror-image year-end recovery, surges from ~0 toward ~75–80 (5★).

=== GBP COMPONENT (bullish GBP = EURGBP falling, since GBP is inverted) ===
Jan: GBP bearish — declining from December highs (2★, low conviction; inverted: mildly bullish for EURGBP).
Feb: GBP carves its PRIMARY ANNUAL TROUGH — base forms, turns bullish late month (2★; inverted: bearish late).
Mar: GBP's STRONGEST, CLEANEST BULL WINDOW of the entire year — all 3 TFs surge together from the Feb trough (5★; inverted: bearish for EURGBP, the higher-conviction move of the month).
Apr: GBP's PEAK→SELL FLIP MONTH — all 3 TFs hit absolute peak ~95–100 simultaneously (Wk1) then collapse in a violent waterfall (5★; inverted: bearish then powerfully bullish for EURGBP — the single most violent reversal of GBP's year).
May: GBP bear — steep waterfall continuation from the April peak (5★; inverted: bullish for EURGBP, maximum conviction — directly opposing EUR's own collapse this same month).
Jun: GBP chop/mixed — 5-YR sharp bounce unconfirmed by longer TFs (2★; inverted: similarly weak).
Jul: GBP chop — volatile, directionless, no reliable signal (1★).
Aug: GBP chop, with a late-month secondary decline beginning (1★; inverted: mildly bullish late).
Sep: GBP bear — declining to its secondary annual trough ~30 (4★; inverted: bullish for EURGBP).
Oct: GBP bull — recovering cleanly from the September trough (4★; inverted: bearish for EURGBP).
Nov: GBP bull — 40-YR peaks at its own annual high ~75–80 (4★; inverted: bearish for EURGBP).
Dec: GBP bear — declines into year-end seasonal weakness, 5-YR/15-YR hit near-annual lows (3★; inverted: bullish for EURGBP).

=== COMBINED NET EFFECT ===
Jan–Feb: EUR's higher-conviction structural decline dominates GBP's own low-conviction bear leg (inverted bullish, partial offset) — net bias leans bearish through a genuinely two-sided stretch, tightening into alignment by late February as GBP turns up.
Mar: Direct collision of two strong trends — EUR's annual-trough flip (bullish) against GBP's STRONGEST BULL WINDOW of its own year (inverted bearish, the higher-conviction 5★ move). GBP's cleaner trend likely dominates — net bias leans bearish.
Apr: EUR's directionless chop is completely overshadowed by GBP's single most violent reversal of its own year (PEAK→SELL, inverted) — GBP overwhelmingly dominant, flipping EURGBP from short to its highest-conviction long of the month.
May: THE single most contested month of the year — EUR's most bearish month of its own year collides head-on with GBP's continuing high-conviction waterfall decline (inverted bullish). Both post their highest-conviction moves of the year in directly opposing directions — a genuine coin-flip.
Jun: EUR's cleaner, higher-conviction annual-low recovery dominates GBP's own weak, unconfirmed bounce (inverted, similarly low-conviction) — modest long lean by comparison.
Jul: Both currencies enter their lowest-conviction stretches of the year simultaneously — one of the lowest-edge windows of the entire calendar.
Aug: EUR's lowest-conviction month of its own year faces GBP's continued chop — only GBP's late-month secondary decline (inverted bullish) provides a thin emerging edge.
Sep: EUR's drop toward its secondary trough and GBP's own decline toward its secondary trough (inverted bullish) directly oppose at comparable conviction — largely cancel, producing a low-edge, choppy month.
Oct: EUR's flip month (Wk1 bounce, resumed decline) faces GBP's cleaner, higher-conviction recovery off its own trough (inverted bearish) — GBP's cleaner trend becomes dominant, net short.
Nov: DOUBLE ALIGNMENT — EUR's single highest-conviction trade of its own entire year (absolute annual lows) reinforces GBP's own annual peak (inverted bearish). Both components confirm at near-maximum conviction simultaneously — THE highest-conviction short of the EURGBP year.
Dec: DOUBLE ALIGNMENT — the mirror image of November. EUR's STRONG BULL year-end recovery reinforces GBP's own seasonal year-end weakness (inverted bullish). Both components confirm at high conviction simultaneously — THE highest-conviction long of the EURGBP year, closing out a textbook bookend pair of trades.

=== PLAYBOOK SIGNALS ===
EURGBP HIGHEST CONVICTION SHORT: November (DOUBLE ALIGNMENT — EUR's single highest-conviction trade of its own year + GBP's own annual peak, inverted bearish. Both components confirm at near-maximum conviction, 5★. THE defining trade of the EURGBP year.)
EURGBP HIGHEST CONVICTION LONG: December (DOUBLE ALIGNMENT — the mirror image of November. EUR's strongest bull month + GBP's own seasonal weakness, inverted bullish. Both components confirm, 5★.) and April (GBP's single most violent reversal of its own year is overwhelmingly dominant, flipping EURGBP from short to its highest-conviction long of the month).
EURGBP MOST CONTESTED / REQUIRES CAREFUL FRAMING: May (EUR's most bearish month of its own year vs GBP's continuing high-conviction waterfall — both post their highest-conviction moves of the year in directly opposing directions, a genuine coin-flip) and March (EUR's trough-flip vs GBP's strongest, cleanest bull window of its own year).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for EURGBP explaining how the EUR and GBP seasonal forces interact month by month, with special attention to the November/December double-alignment bookend trades — the two highest-conviction setups of the year, mirror images of one another.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (EUR or GBP) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction EURGBP trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — especially May, where both currencies post their highest-conviction moves of the year in directly opposing directions.
`;
