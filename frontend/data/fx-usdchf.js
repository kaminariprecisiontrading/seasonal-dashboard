/**
 * data/fx-usdchf.js — USDCHF Forex Seasonal
 * Derived from: USD Index/ICE futures + CHF/USD CME futures
 * Methodology: USD seasonal tendency vs inverted CHF seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-usdchf",
  name:     "USD / CHF",
  sub:      "Forex Seasonal · Derived from USD ICE + CHF CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · USD Index ICE (35-YR) · CHF/USD CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "USD seasonal bull + CHF seasonal bear (declining all month from its ~75 open) = double alignment bullish for USDCHF. Clean start to the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"USD rising while CHF opens weak and declines. Both components reinforce USDCHF strength." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Alignment continues — CHF dropping sharply, USD climbing. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Broad CHF weakness persists. USD firm. No reason to exit." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"Late Jan — both legs still favouring USDCHF higher into Feb continuation lows for CHF." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "CHF continues its deep seasonal decline (toward ~20–25 on the 40-YR) while USD pushes toward its own 35-YR peak. Double alignment persists — though USD nears its turning point late month.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CHF still declining, USD still climbing. Hold — alignment intact." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Mid-Feb — CHF weakness deepening. Both components reinforcing." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"USD nearing its 35-YR peak. CHF still falling. Net still bullish but watch USD." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★★☆☆", note:"USD peaking late Feb (set to decline = bearish for USDCHF) just as CHF begins forming its own trough. Both legs approaching turns — start trimming longs." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sigLt: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH / SHORT", stars: 5,
    note: "A dramatic double-alignment reversal: USD declines from its peak (bearish for USDCHF) at the EXACT moment CHF stages its own ANNUAL TROUGH FLIP — the 40-YR bottoms at ~5–10 mid-March then reverses sharply higher (also bearish for USDCHF, since CHF strengthening). Both components flip bearish for USDCHF in the same window — the most violent reversal month of the USDCHF year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT / WATCH ★★★☆☆", note:"USD declining post-peak. CHF still finishing its final leg down toward the absolute trough — wait for confirmation before pressing." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"FLIP → SHORT ★★★★★", note:"CHF hits its annual trough and reverses sharply higher; USD continues its decline. Both components now align bearish for USDCHF — flip short with conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"CHF recovery confirmed and accelerating; USD weak. Double alignment — highest conviction short of the month." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF momentum building into April; USD still soft. Hold shorts — alignment carries into next month." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "CHF's recovery continues (bridge month building toward its May spike — bearish for USDCHF) while USD works through its own complex flip (bear Wk1–3, bull Wk4). Through the first three weeks both components align bearish for USDCHF; Wk4's USD flip introduces late-month conflict.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF recovering steadily, USD still declining. Both reinforce USDCHF weakness." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Continuation — CHF strength building toward its May spike, USD remains soft." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF momentum still rising. USD weak. Hold shorts into the final week." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"FLIP WATCH ★★☆☆☆", note:"USD flips bullish in Wk4 (bullish for USDCHF) just as CHF accelerates into its pre-spike build (also bearish for USDCHF — direct conflict). Reduce size; await May's resolution." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "bear", sigLt: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "The most complex month of the USDCHF year. CHF's 5-YR spikes to its absolute annual peak ~100 mid-month (bearish for USDCHF) then violently flips short (bullish for USDCHF) — while USD sits at its own seasonal trough turning up (bullish for USDCHF). Early-month conflict between USD's recovery and CHF's spike resolves into strong alignment once CHF's flip confirms mid-month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"CHF still climbing toward its spike (bearish for USDCHF) while USD is basing at its trough (bullish for USDCHF). Direct conflict — avoid until CHF's peak confirms." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT / WATCH ★★★☆☆", note:"CHF approaching its absolute peak ~100. USD turning up. Wait for the CHF reversal — it will resolve this conflict decisively." },
      { wk:"Wk 3", s5:"bull", s15:"bear", sLt:"bull", com:"FLIP → LONG ★★★★★", note:"CHF hits its peak and flips short hard (bullish for USDCHF); USD recovering in parallel. Both now align — flip long with high conviction." },
      { wk:"Wk 4", s5:"bull", s15:"bear", sLt:"bull", com:"LONG ★★★★☆", note:"CHF post-peak waterfall accelerating; USD firm. Double alignment confirmed — hold longs into Jun." },
    ]
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Continuation of May's resolved alignment — CHF deep in its post-spike waterfall (bullish for USDCHF) while USD enjoys its seasonal bull bounce (also bullish for USDCHF). One of the cleanest stretches of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CHF waterfall continuing, USD bouncing. Both reinforce USDCHF strength — hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Broad CHF weakness persists. USD firm. Maintain exposure." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"CHF still falling, no relief bounce. USD steady. Press the long." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★★☆☆", note:"CHF approaching its Jul trough (beginning to stabilise); USD bounce also fading. Both legs nearing their own turns — start tightening." },
    ]
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sigLt: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "USD turns mixed and exits its positions (low conviction) while CHF remains pinned near its multi-month lows in its trough zone (bullish for USDCHF). CHF's continued weakness is the cleaner signal — net USDCHF modestly bullish by elimination.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"CHF still at depressed lows. USD directionless. CHF weakness is the dominant, cleaner signal — modest long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"CHF basing in its trough zone; risk/reward on CHF shorts deteriorating, which keeps USDCHF supported. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"CHF beginning to base; USD also flat. Reduce size — both legs entering transition." },
      { wk:"Wk 4", s5:"bear", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"CHF turning up off its trough (early bearish signal for USDCHF) while USD stays passive. Prepare to flip as CHF's recovery confirms into Aug." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Direct double alignment bearish: CHF's recovery firms into a genuine bull leg (bearish for USDCHF) at the same time USD enters its own clean seasonal bear phase (also bearish for USDCHF). One of the cleanest short windows of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF recovery confirmed and accelerating; USD beginning its bear leg. Both reinforce USDCHF downside — enter short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Continuation — CHF strength building toward its Sep peak, USD declining in parallel. Hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Both legs still aligned bearish for USDCHF. Press the position into Sep." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF rallying hard toward its Sep spike; USD remains weak. Maximum alignment heading into the Sep flip month." },
    ]
  },
  {
    month: "September", sig5: "chop", sig15: "bear", sigLt: "flip",
    combined: "chop", combinedLabel: "MIXED / FLIP", stars: 3,
    note: "CHF stages its second major flip of the year — the 15-YR spikes to its absolute peak ~100 mid-month (bearish for USDCHF) then reverses sharply short (bullish for USDCHF) — while USD continues its own bear phase (bearish for USDCHF). Early-month double alignment bearish gives way to direct conflict once CHF's flip kicks in.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT ★★★★☆", note:"CHF surging toward its peak; USD weak. Both align bearish for USDCHF — hold shorts from Aug." },
      { wk:"Wk 2", s5:"flip", s15:"flip", sLt:"bear", com:"SHORT / WATCH ★★★☆☆", note:"CHF peaks at ~100 and begins its reversal (bullish for USDCHF) while USD remains bearish for USDCHF. Components now beginning to conflict — tighten stops on shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"CONFLICT ★★☆☆☆", note:"CHF's post-peak collapse strengthens (bullish for USDCHF) directly against USD's continuing weakness (bearish for USDCHF). Net direction unclear — reduce exposure." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"chop", com:"WATCH ★★☆☆☆", note:"CHF waterfall accelerating; USD nearing its own major reversal. Stand aside — Oct will resolve this cleanly in USD's favour." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "USD's MAJOR seasonal reversal (bear → bull, its strongest single turning point of the year) lands in perfect sync with CHF's continuation lower from its Sep peak (bearish for CHF = bullish for USDCHF). Double alignment bullish — the cleanest, highest-conviction long window of the USDCHF calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bull", com:"LONG ★★★★★", note:"USD's major reversal confirms higher; CHF continuing its post-peak decline. Both align — enter long with conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bull", com:"LONG ★★★★★", note:"USD strength building into its strongest seasonal window; CHF still falling. Full alignment — press the long." },
      { wk:"Wk 3", s5:"chop", s15:"bear", sLt:"bull", com:"LONG ★★★★☆", note:"CHF showing brief stabilisation but still net weak; USD dominant. Hold." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"LONG ★★★★☆", note:"CHF resumes its decline toward Nov lows; USD accelerating. Maximum alignment carries into Nov." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "flip",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "USD enters its single strongest seasonal window of the entire year (bullish for USDCHF) while CHF spends the first half of the month still weak before flipping into its own massive year-end rally (CHF playbook: 'bear early Nov → flip long'). USD's dominant, high-conviction trend carries the pair higher through most of the month — but CHF's late-month reversal begins to challenge it heading into December.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"LONG ★★★★★", note:"USD surging seasonally; CHF still weak (pre-flip). Maximum alignment — press longs." },
      { wk:"Wk 2", s5:"bear", s15:"chop", sLt:"chop", com:"LONG ★★★★☆", note:"USD strength persists; CHF beginning to turn up. Still USD-dominant, but monitor the CHF inflection closely." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"bull", com:"LONG / WATCH ★★★☆☆", note:"CHF's year-end rally confirming (bearish for USDCHF) just as USD remains strong (bullish for USDCHF). Direct conflict emerging — trim into strength." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT ★★☆☆☆", note:"Both legs now at full conviction in opposite directions — USD's bull window vs CHF's surging year-end rally. Reduce exposure sharply; Dec will be the most contested month of the year." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "chop", combinedLabel: "MIXED / CONFLICT", stars: 3,
    note: "The single most contested month on the USDCHF calendar: USD closes the year in its seasonal bull peak (bullish for USDCHF) while CHF stages its HIGHEST CONVICTION LONG OF THE YEAR — the 40-YR rockets to its absolute peak ~100 at Dec 31 (bearish for USDCHF). Both components are at maximum conviction in opposite directions. CHF's move is described as the single most decisive of its entire year, which tends to tip the net balance toward USDCHF weakness as the month progresses — but expect significant two-way volatility.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT ★★☆☆☆", note:"USD still climbing; CHF's year-end surge fully underway. Both at high conviction, opposing. Avoid forcing a direction — let the trend assert itself." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"CONFLICT ★★☆☆☆", note:"USD pressing toward its peak; CHF climbing toward 100. Stalemate — wait for one side to break." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"FLIP → SHORT ★★★☆☆", note:"CHF's surge becomes the more dramatic, decisive move — its 'highest conviction of the year' status begins to dominate even a strong USD. Lean toward USDCHF weakness." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT ★★★☆☆", note:"CHF reaches its absolute annual peak at Dec 31, overpowering USD's own strength. CHF dominance confirmed late — close the year favouring USDCHF downside, and note Jan historically reopens with CHF weakness (revert to long)." },
    ]
  },
];

const SEASONAL_DATA = `
USDCHF — FOREX SEASONAL ANALYSIS
Derived from: USD Index ICE Futures (35-YR seasonal) + CHF/USD CME Futures (40-YR seasonal)
Methodology: USD seasonal tendency combined with inverse CHF seasonal tendency.

=== USD COMPONENT (bullish USD = USDCHF rising) ===
Jan: USD bullish (bullish for USDCHF).
Feb: USD "LONG → WATCH" — peak forming late month.
Mar: USD declining from its peak (bearish for USDCHF).
Apr: USD FLIP MONTH — bear Wk1–3, then bull Wk4.
May: USD at its seasonal trough, turning up (bullish for USDCHF).
Jun: USD bull bounce (bullish for USDCHF).
Jul: USD mixed / exiting positions — low conviction.
Aug–Sep: USD bearish (bearish for USDCHF), fading into its Oct reversal.
Oct: USD MAJOR REVERSAL — flips from bear to bull (bullish for USDCHF from here).
Nov–Dec: USD in its single strongest seasonal window of the year — all TFs aligned bull (bullish for USDCHF).

=== CHF COMPONENT (bullish CHF = USDCHF falling) ===
Jan–Feb: CHF bearish — declines all month from its ~75 open toward ~20–25 (bullish for USDCHF).
Mar: CHF ANNUAL TROUGH FLIP — 40-YR hits absolute low ~5–10 mid-month then reverses sharply (bearish for USDCHF from the reversal).
Apr: CHF bullish — recovery continues, building toward its May spike (bearish for USDCHF).
May: CHF FLIP MONTH — 5-YR spikes to absolute peak ~100 mid-month, then a CRITICAL FLIP SHORT as it reverses violently (bearish for USDCHF early, bullish for USDCHF from the flip).
Jun: CHF bearish — deep post-spike waterfall (bullish for USDCHF).
Jul: CHF bearish — near multi-month lows, trough zone (bullish for USDCHF).
Aug: CHF bullish — recovery begins (bearish for USDCHF).
Sep: CHF FLIP MONTH — 15-YR spikes to absolute peak ~100 mid-month, then reverses short (bearish for USDCHF early, bullish for USDCHF from the flip).
Oct: CHF bearish — post-Sep peak decline (bullish for USDCHF).
Nov: CHF FLIP MONTH — bearish early in the month, then flips into its massive year-end rally (bullish for USDCHF early, bearish for USDCHF late).
Dec: CHF HIGHEST CONVICTION LONG OF ITS YEAR — 40-YR rockets to absolute peak ~100 at Dec 31 (strongly bearish for USDCHF).

=== COMBINED NET EFFECT ===
Jan–Feb: USD bull + CHF bear = double alignment bullish. Clean, sustained long window.
Mar: USD declining from its peak + CHF's violent annual-trough flip-reversal = both turn bearish for USDCHF simultaneously. The most violent reversal month of the year — strong flip short.
Apr: CHF's steady recovery aligns with USD's Wk1–3 decline = both bearish for USDCHF; USD's Wk4 flip to bull introduces late-month conflict that carries into May.
May: CHF's spike-and-flip collides with USD's trough-and-recovery = the most complex month of the year — early conflict resolves into strong alignment (long) once CHF's reversal confirms mid-month.
Jun–Jul: CHF's post-spike waterfall and trough phase align with USD's bull bounce / passive drift = sustained bullish stretch, one of the cleanest of the year.
Aug: CHF's recovery firms into a genuine bull leg exactly as USD enters its own clean bear phase = direct double alignment bearish. Clean short window.
Sep: CHF's second major flip of the year (peak then reversal) collides with USD's continuing bear phase = early double alignment bearish gives way to direct conflict once CHF's flip kicks in — choppiest month of Q3/Q4.
Oct: USD's major reversal aligns with CHF's continuation lower from its Sep peak = double alignment bullish. The single cleanest, highest-conviction long window of the year.
Nov: USD's strongest seasonal window dominates CHF's still-weak first half, but CHF's late-month flip into its year-end rally begins to directly challenge USD's strength — building toward the Dec stand-off.
Dec: USD's seasonal peak collides head-on with CHF's HIGHEST CONVICTION MOVE OF ITS ENTIRE YEAR (a surge to its absolute annual high). Both components at maximum conviction in opposite directions — CHF's more dramatic, decisive move tends to tip the balance toward USDCHF weakness as the month progresses, but expect the most contested two-way action of the calendar.

=== PLAYBOOK SIGNALS ===
USDCHF HIGHEST CONVICTION LONG: October (USD's major reversal + CHF's post-peak decline — full double alignment, the cleanest window of the year, 5★).
USDCHF SECONDARY LONG: January–February (double alignment bullish, 4★) and June–July (CHF waterfall + USD bounce, 4★).
USDCHF HIGHEST CONVICTION SHORT: March (CHF's violent annual-trough reversal meets USD's post-peak decline — both flip bearish simultaneously, 5★) and August (clean double alignment bearish, 4★).
USDCHF MOST CONTESTED / AVOID: May (complex spike-and-flip — wait for CHF's reversal to confirm), September (CHF's second flip vs continuing USD weakness), and December (USD's peak vs CHF's single most decisive move of the year — high volatility, low directional conviction until late month).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for USDCHF explaining how USD and CHF seasonal forces interact month by month, with special attention to the March double-flip reversal and the December stand-off between each component's most decisive move of the year.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (USD or CHF) is dominant, conviction level.

3. WEEK-BY-WEEK CURRENT MONTH BIAS — Identify the current calendar month and give specific week-by-week guidance with reasoning from both components and the best trade action.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction USDCHF trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly — May, September, and December all involve direct component conflict and deserve careful framing.
`;
