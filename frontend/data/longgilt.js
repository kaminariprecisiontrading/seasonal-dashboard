// longgilt.js — Long Gilt (LIFFE) · 38-Year Seasonal (1982–2019)

const ASSET_CONFIG = {
  id:       "longgilt",
  name:     "Long Gilt (LIFFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 38-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Long Gilt LIFFE · 38-Year Seasonal (1982–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "38-YR",
  ltSigKey: "sig38",
  ltKey:    "s38",
  ltAccent: "#7c3aed",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "All TFs start at low levels — 38-YR ~20, 15-YR ~30, 5-YR ~10–15. No clear direction early in the year; cautious stance ahead of February recovery.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "All TFs at lows; no directional signal — stand aside" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Flat, low levels across all TFs" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Muted; wait for February bull signal" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "5-YR starting to turn up; others still flat — premature to enter" },
    ],
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "All TFs rising from January lows. 5-YR leads, climbing to ~50. 38-YR and 15-YR also lift. Solid early-year bull window heading into March consolidation.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "All TFs rising from lows; enter long" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "5-YR climbing toward ~50; maintain long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Continued rise; all TFs on upswing" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Pace slows ahead of March consolidation; trim longs" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR volatile and choppy — consolidation after February's rise. 38-YR flat/sideways. No unified direction; stand aside and wait for May's stronger push.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Consolidation; 5-YR volatile — no clean signal" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Mixed; 5-YR oscillating around midpoint" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "No trend; stand aside" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Late March still choppy; April may dip slightly" },
    ],
  },
  {
    month: "April", sig5: "bear", sig15: "chop", sig38: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR dips slightly from March levels; 15-YR and 38-YR flat/mixed. No clean directional trade — potential short for the 5-YR only; overall ambiguous.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "5-YR declining; longer TFs flat — no unified signal" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "5-YR soft; mixed overall — stand aside" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "Directionless; May bull building" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s38: "chop", com: "CHOP ★★",  note: "15-YR starting to tick up; wait for May confirmation" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Second bull window before June's crash — 5-YR surges to ~65, all TFs rising together. Take the bull trade but size cautiously: June erases all gains.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "All TFs rising; enter long — 5-YR surging toward ~65" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Strong bull momentum; all TFs in sync" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "5-YR near highs for pre-June period; hold" },
      { wk: "Wk 4", s5: "flip", s15: "chop", s38: "chop", com: "CHOP ★★",  note: "May highs forming; close longs — June bear is severe" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "DEFINING FEATURE of Long Gilt — ALL three TFs crash to near 0 simultaneously. This is the most reliable and severe bear window of the year. Aggressive short positioning justified.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "All TFs crashing from May highs; maximum short position" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "All TFs plummeting toward near 0 — strongest bear signal" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "Near annual lows for all TFs; maintain full short exposure" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",   note: "Bottom forming; close shorts — July surge imminent" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "MASSIVE SURGE from near 0 — all TFs explode upward from June lows. Mirrors the June severity in reverse. The most powerful bull month of the year. High conviction long from June-end.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "Explosive recovery from June lows; enter long immediately" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "All TFs surging; 5-YR reaching toward ~70–80; hold max long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "Continued strong surge; 38-YR leading to higher levels" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "Momentum continuing into August; maintain long" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "All TFs near annual peaks — 5-YR and 15-YR approach ~95–100, 38-YR also elevated. Hold maximum long positions. Sep reversal comes — begin reducing late in month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "All TFs near peak; maximum long — best annual position" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "5-YR and 15-YR near 95–100; 38-YR elevated — hold" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "Peaks forming; begin reducing exposure selectively" },
      { wk: "Wk 4", s5: "flip", s15: "flip", s38: "bull", com: "FLIP ★★★★",  note: "5-YR/15-YR reversing; 38-YR still high — start exiting" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig38: "flip",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "38-YR peaks and reverses while shorter TFs decline. Staggered reversal — shorter TFs confirm bear faster than 38-YR. Watch for full TF alignment downward before shorting.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "flip", com: "FLIP ★★★★",  note: "38-YR peaking; 5-YR/15-YR declining — close remaining longs" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★", note: "All TFs now declining; short entry confirmed" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "Continued decline; maintain short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "Closing September lower; carry short into October" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued decline from September — all TFs falling. 38-YR drops from peak. 5-YR and 15-YR both declining. Hold shorts, but November brings a 38-YR recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "All TFs declining; hold short position" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "Continued drop; all TFs heading lower" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "Mid-October lows; watch for 38-YR turning in late month" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "chop", com: "CHOP ★★",   note: "38-YR starting to recover; close shorts, prepare for Nov bull" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "38-YR recovers strongly from October lows to ~80+. 15-YR also rising. 5-YR mixed but not bearish. Solid long opportunity driven by the longer TFs.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "38-YR and 15-YR recovering; enter long on longer TF strength" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "38-YR climbing toward ~80; hold long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "5-YR joins the recovery; all three TFs rising together" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "38-YR near 80+; maintain; December can extend further" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig38: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Extreme TF divergence year-end — 38-YR climbs near 100, but 5-YR is at ~30–35 and declining. The long-term TF is bullish but shorter TFs are bearish/flat. No clean unified trade.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "bull", com: "CHOP ★★",  note: "38-YR still rising; 5-YR flat/low — TF split; no clean trade" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "bull", com: "CHOP ★★",  note: "Divergence widens; 38-YR near 90–100, 5-YR declining" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "bull", com: "CHOP ★★",  note: "Year-end TF split; 38-YR near highs, shorter TFs weak" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "bull", com: "CHOP ★★",  note: "Year-end; 38-YR elevated, 5-YR at lows — setup for January flat start" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Long Gilt (LIFFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Long Gilt (LIFFE)
Exchange: LIFFE | Seasonal History: 38-Year (1982–2019)

YEARLY ARC:
Jan: All TFs at lows (~10–30). Flat — no trade.
Feb: All TFs rising. Early-year bull. 5-YR reaches ~50.
Mar: Consolidation. 5-YR volatile. Stand aside.
Apr: 5-YR dips; longer TFs flat/mixed. Ambiguous.
May: Second bull window. All TFs rising to ~65+. Size cautiously — June crash follows.
Jun: ALL TFs crash to near 0. Defining bear month. Most severe and reliable in the calendar.
Jul: MASSIVE surge from near 0. All TFs explode upward. Mirror of June. Maximum long.
Aug: All TFs at annual peaks (~95–100). Hold longs; 38-YR reverses late month.
Sep: 38-YR peaks, reversal staggered. Shorter TFs decline faster. Transition to bear.
Oct: All TFs declining. Short window. 38-YR starts recovering late Oct.
Nov: 38-YR recovers strongly to ~80+. 15-YR rises. Solid bull on longer TFs.
Dec: TF divergence — 38-YR near 100, 5-YR at ~30–35. No clean unified trade.

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | All TFs at lows; no directional signal
Feb  — LONG  ★★★   | All rising from January lows; early-year bull
Mar  — CHOP  ★★    | Consolidation; 5-YR volatile — stand aside
Apr  — CHOP  ★★    | 5-YR soft; mixed — no trade
May  — LONG  ★★★   | All TFs surge; be cautious of June reversal
Jun  — SHORT ★★★★★ | ALL TFs crash to near 0 — most powerful bear signal
Jul  — LONG  ★★★★★ | Explosive surge from near 0; mirror of June crash
Aug  — LONG  ★★★★★ | All TFs at annual peaks; maximum long
Sep  — FLIP  ★★★★  | 38-YR peaks; staggered reversal — close longs, build short
Oct  — SHORT ★★★   | All TFs declining; carry short from September
Nov  — LONG  ★★★   | 38-YR recovers strongly to ~80+; 15-YR rises
Dec  — CHOP  ★★    | Extreme TF divergence: 38-YR near 100, 5-YR at ~30

KEY OBSERVATIONS:
- June is the defining feature: all three TFs reach near 0 — the most reliable bear signal across all SFE/LIFFE rates assets
- July mirrors June precisely in reverse — the explosive recovery from near 0 is equally reliable
- August is the peak month — all TFs near 95–100 simultaneously
- The June–August window (short June, long July) is the premium seasonal trade for this asset
- November has an unusual pattern: 38-YR recovers strongly while 5-YR is sluggish
- December ends with extreme TF divergence — 38-YR near 100 while 5-YR is back near lows
`;
