// austbonds3.js — 3-Year Aus T-Bonds (SFE) · 33-Year Seasonal (1987–2019)

const ASSET_CONFIG = {
  id:       "austbonds3",
  name:     "3-Year Aus T-Bonds (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 33-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Year Aus T-Bonds SFE · 33-Year Seasonal (1987–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "33-YR",
  ltSigKey: "sig33",
  ltKey:    "s33",
  ltAccent: "#1d4ed8",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig33: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Year opens at seasonal lows — all TFs near the bottom (33-YR ~15–25, 15-YR ~5–15, 5-YR ~5–15). Sideways with no meaningful direction. No trade.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "All TFs at annual lows; flat — no directional signal" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "Marginal drift; no conviction" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "5-YR slightly volatile but range-bound" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "Flat into February; stand aside" },
    ],
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "First directional move of the year — all TFs rise from lows, 5-YR leads toward ~35–40 by mid-month. Bull conviction is strongest early February; fades second half.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "All TFs rising off Jan lows; early Feb bull leg" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "5-YR approaching ~35–40 peak; hold" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "5-YR at peak; topping action — reduce longs" },
      { wk: "Wk 4", s5: "bear", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "5-YR turning down; transition toward March trough begins" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Annual trough — 5-YR crashes sharply to near 0 (more aggressive than the 10-YR equivalent). 15-YR and 33-YR follow. Deepest bear month of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "Decline accelerating from Feb highs; all TFs falling" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★", note: "5-YR dropping hard toward near 0; strong short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★", note: "5-YR near annual low; trough zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "Bottom forming; close shorts and prepare April recovery long" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from March trough — all TFs begin rising. 5-YR leads the rebound. Conviction builds as month progresses; May continues the stronger bull run.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",   note: "Near trough; very early tentative recovery — wait for confirmation" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "Recovery confirmed; all TFs rising" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "Continued bull recovery" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "Strong April close; momentum building for May surge" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Outstanding bull month — 5-YR surges to ~75+ (stronger than the 10-YR equivalent). All TFs in strong agreement. Maximum conviction long; hold throughout May.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Bull continuation from April; accelerating surge" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "5-YR surging strongly toward ~75; maximum long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "5-YR near monthly peak ~75+; all TFs in sync" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "May peak forming; tighten stops ahead of June reversal" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Sharp bear reversal — 5-YR drops from ~75 to ~35–50, 15-YR and 33-YR confirm. Second significant trough of the year. Sets up the July surge.",
    weeks: [
      { wk: "Wk 1", s5: "flip", s15: "chop", s33: "chop", com: "FLIP ★★★",   note: "May highs reversing; rotate from long to short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★", note: "Sharp drop across all TFs; short confirmed" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★", note: "5-YR near June lows; maintain short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "Near trough; close shorts — July surge imminent" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Strongest seasonal month of the year — 5-YR surges from ~35 to ~80–100, all TFs in lockstep. Maximum conviction long. Hold throughout July.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Explosive reversal from June lows; enter long aggressively" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "Surge accelerating; maximum long position" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "5-YR approaching ~80–100; near year peak" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Sustained near highs; hold but monitor for reversal" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Year peak — all TFs at 80–100. 5-YR peaks and reverses aggressively in late August (sharper than 10-YR). 33-YR peaks in September. Take profits into month-end.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "All TFs at year highs; fully long" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "Peak zone — hold maximum longs" },
      { wk: "Wk 3", s5: "flip", s15: "bull", s33: "bull", com: "FLIP ★★★",   note: "5-YR beginning sharp reversal; reduce long exposure quickly" },
      { wk: "Wk 4", s5: "bear", s15: "flip", s33: "bull", com: "FLIP ★★★",   note: "5-YR dropping hard; close longs, prepare September short" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig33: "flip",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "Sharp reversal — 5-YR drops aggressively from highs (more severe than 10-YR). 33-YR peaks then turns. Flip to short quickly; this is not a gradual decline.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bull", com: "FLIP ★★★★",  note: "33-YR peaking; 5-YR/15-YR in sharp decline — flip to short now" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "All TFs declining; hold short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★", note: "Seasonal decline in force; continue short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "Continued decline into October" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-peak decline — all TFs falling from September highs. 33-YR still relatively elevated but declining. Sell rallies throughout the month.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "Continued decline from September; hold short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "All TFs falling; sell bounces" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "5-YR at low levels; 33-YR declining from elevated levels" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",   note: "Decline slowing; stabilisation possible into November" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sig33: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Mixed — 33-YR holds elevated while 5-YR and 15-YR drift lower. No clean directional signal; stand aside.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "Mixed TF signals; no clear trade" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "5-YR attempting partial recovery; 15-YR declining" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s33: "chop", com: "CHOP ★★",  note: "15-YR declining; 33-YR holding — mixed" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "chop", com: "CHOP ★★",  note: "Month ends flat; no signal" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig33: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "TF divergence — 33-YR holds elevated (~84), 5-YR and 15-YR continue declining. No clean combined signal. 33-YR year-end seasonal level resets toward January lows.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s33: "bull", com: "CHOP ★★",  note: "33-YR elevated; shorter TFs declining — no trade" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s33: "bull", com: "CHOP ★★",  note: "TF divergence continues; 33-YR stable near ~84" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "bull", com: "CHOP ★★",  note: "Year-end consolidation; mixed" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "bull", com: "CHOP ★★",  note: "33-YR closes year elevated; resets for January low" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 3-Year Australian T-Bonds (SFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 3-Year Aus T-Bonds (SFE)
Exchange: SFE | Seasonal History: 33-Year (1987–2019)

YEARLY ARC:
Year opens at seasonal LOWS (33-YR ~15–25, 15-YR ~5–15, 5-YR ~5–15).
Jan: Flat — no signal.
Feb: First bull leg; 5-YR rises to ~35–40.
Mar: Annual trough — 5-YR crashes to near 0 (sharper than 10-YR).
Apr–May: Recovery surge — 5-YR surges to ~75+ (stronger than 10-YR equivalent).
Jun: Second trough — sharp drop.
Jul–Aug: Strongest seasonal period — 5-YR surges to ~80–100.
Sep: Sharp peak and reversal (more aggressive than 10-YR).
Oct: Post-peak decline.
Nov–Dec: Mixed; 33-YR elevated, shorter TFs declining.

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | All TFs at lows; no trade
Feb  — LONG  ★★★   | First bull leg; 5-YR leads to ~35–40
Mar  — SHORT ★★★★  | Annual trough; 5-YR crashes to near 0
Apr  — LONG  ★★★   | Recovery from March lows
May  — LONG  ★★★★★ | Outstanding bull; 5-YR surges to ~75+ — stronger than 10-YR
Jun  — SHORT ★★★★  | Sharp drop; sets up July explosion
Jul  — LONG  ★★★★★ | Strongest month; 5-YR surges to ~80–100
Aug  — LONG  ★★★★★ | Year peak; 5-YR reverses aggressively late month
Sep  — FLIP  ★★★★  | Sharp reversal — flip to short quickly
Oct  — SHORT ★★★   | Post-peak decline
Nov  — CHOP  ★★    | Mixed; stand aside
Dec  — CHOP  ★★    | 33-YR elevated; shorter TFs declining

KEY OBSERVATIONS:
- Very similar to 10-YR but more volatile 5-YR with stronger May surge (~75+ vs ~65–70)
- September reversal is sharper — act quickly when flip signal appears
- 33-YR and 15-YR move closely together; 5-YR diverges more at extremes
- Two annual trough windows: March (deepest) and June
- Two bull windows: Apr–May and Jul–Aug (both high conviction)
`;
