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
    month: "January", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year opens at elevated levels (38-YR ~89, 15-YR ~63, 5-YR ~35). 38-YR and 15-YR in declining phase from year-end highs. 5-YR lower and stable. Sell rallies.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "38-YR declining from ~89 year-end high; early Jan weakness" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "Continued decline; 15-YR also falling from ~63" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★",  note: "Mid-Jan weakness; all TFs heading lower" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "Late-Jan pressure; approaching Feb-Mar bear leg" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "38-YR in mid-decline (~40–50 range after falling from 89). 15-YR under pressure. 5-YR showing some spikes but ultimately choppy. Trend remains down.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "38-YR mid-decline near 40–50; bear trend intact" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s38: "bear", com: "SHORT ★★",  note: "5-YR spiky but 15-YR and 38-YR continue lower" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "All TFs declining; sell rallies into March trough" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "Late-Feb; final descent toward March annual low" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Annual trough #1 — all TFs crash to near 0. Deepest bear reading of the first half. Flip to long from the March trough into April-May recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★", note: "Annual trough; all TFs near 0 — seasonal nadir" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★",  note: "Deep trough persists; wait for reversal signal" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP",       note: "Oversold base forming; early stabilisation" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s38: "chop", com: "CHOP",       note: "5-YR leads recovery; scale into longs from March base" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery month from March trough; all TFs rising. 5-YR recovers fastest. 38-YR and 15-YR also gaining. Build longs ahead of May-June strength.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "Recovery confirmed; buy the March lows" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "All TFs rising; add longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "Sustained recovery; 5-YR leading, others following" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★", note: "Month-end strength into May" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month; 5-YR spikes dramatically to ~60. 38-YR and 15-YR both at ~50 area and rising. All TFs aligned. BUT be aware: late May/June sees a second trough.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "5-YR explosive spike to ~60; all TFs bullish" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★", note: "All TFs rising strongly; near-mid range for 38-YR" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★",  note: "Sustained strength; hold longs with tighter stops into late May" },
      { wk: "Wk 4", s5: "chop", s15: "bear", s38: "bear", com: "SHORT ★★",  note: "Late-May: second trough forming; 38-YR and 15-YR beginning to crash" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "SECOND ANNUAL TROUGH — 38-YR and 15-YR crash to near 0 in late May/early June (similar to June crash in 2-YR T-Notes). Explosive recovery from June lows into July.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★",  note: "June crash in full force; 38-YR and 15-YR near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★★★", note: "Deepest June trough; annual second low confirmed" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP",        note: "Trough forming; oversold base — prepare for explosive recovery" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "Recovery from June lows; buy aggressively into July bull run" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive recovery from June lows; all TFs surging. 5-YR and 15-YR advancing quickly toward 70–80+. 38-YR recovering hard from near 0. Maximum long conviction.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "July explosive recovery; buy the June low" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "Strongest bull leg; 5-YR and 15-YR surging to 50–70" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "All TFs climbing; 38-YR catching up" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "Late-July: near-peak for 5-YR; 38-YR still surging" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Very strong bull month; 5-YR and 15-YR approach 100. 38-YR at ~55–65 and rising. Peak zone for 5-YR/15-YR — tighten stops. 38-YR continues higher into September.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "Aug bull; 5-YR and 15-YR approaching 100" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "5-YR/15-YR at peaks; 38-YR still climbing" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★★",   note: "5-YR/15-YR topping out; 38-YR diverging bullish" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "bull", com: "LONG ★★",    note: "5-YR/15-YR rolling over; 38-YR still advancing — hold 38-YR" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "chop", sig38: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "TF divergence month; 38-YR continuing higher toward November peak. 5-YR falling from August highs. 15-YR choppy. Carry 38-YR longs; exit shorter TF positions.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s38: "bull", com: "LONG ★★",    note: "38-YR still advancing; 5-YR declining — hold 38-YR only" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s38: "bull", com: "CHOP",        note: "Divergence persists; 5-YR lower, 38-YR steady/rising" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s38: "chop", com: "CHOP",        note: "More TFs joining decline; 38-YR stabilising" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s38: "chop", com: "SHORT ★★",   note: "Sep closes weak; position for October decline then Nov bounce" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig38: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-August-peak decline; all TFs lower. 38-YR at ~45–60, 5-YR at ~35–40. Sell rallies — October sets up the powerful November 38-YR surge.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "Oct decline; all TFs falling from August highs" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s38: "bear", com: "SHORT ★★★", note: "Continued weakness; sell rallies" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "chop", com: "CHOP",      note: "Mid-Oct stabilisation; November setup beginning" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★",   note: "Late-Oct: 38-YR beginning November surge; early long entry" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "38-YR surges to near 100 — ANNUAL HIGH for 38-YR. 15-YR also recovering well. 5-YR lags. This is the highest-conviction long trade of the year for 38-YR.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "38-YR powering toward 100; maximum long conviction" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★★★★", note: "38-YR at or near 100 (annual high); hold all longs" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s38: "bull", com: "LONG ★★★★",  note: "38-YR near 100; begin scaling out after peak" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★★",   note: "Month-end; 38-YR holding elevated into December" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig38: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "38-YR elevated at ~85–90, wrapping toward January starting levels. 15-YR at ~63. 5-YR at ~35. Year closes near starting configuration. Hold 38-YR into January.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★★", note: "Early Dec; 38-YR at ~85–90, year-end carry" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★",  note: "Mid-Dec; 38-YR stable near highs" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★",  note: "Year-end consolidation; 38-YR holding ~85–89" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s38: "bull", com: "LONG ★★",  note: "Final week; 38-YR at ~89 ready for January seasonal reset" },
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
Year opens elevated (38-YR ~89, 15-YR ~63, 5-YR ~35). All TFs declining Jan–Mar.
Mar: Annual trough #1 — all near 0. Recovery begins.
Apr–May: Recovery, 5-YR spikes to ~60. All TFs rising.
Late May/Jun: SECOND CRASH — 38-YR and 15-YR crash to near 0 again. Dual-trough pattern.
Jul: Explosive recovery from June lows; all TFs surging.
Aug: 5-YR and 15-YR peak near 100.
Sep–Oct: 38-YR still climbing; shorter TFs declining. Divergence month.
Nov: 38-YR annual HIGH at ~100. Strongest seasonal signal of the year.
Dec: 38-YR holds ~85–90. Year closes near starting levels.

MONTHLY SIGNALS:
Jan  — SHORT ★★★   | Declining from 89 year-end highs
Feb  — SHORT ★★★   | Mid-decline (38-YR at ~40–50); bear intact
Mar  — SHORT ★★★★  | Annual trough #1; all near 0
Apr  — LONG  ★★★   | Recovery from March lows
May  — LONG  ★★★★  | 5-YR spikes to ~60; but late-May crash risk
Jun  — SHORT ★★★★  | Second annual trough; 38-YR and 15-YR near 0
Jul  — LONG  ★★★★★ | Explosive recovery from June; max conviction
Aug  — LONG  ★★★★  | 5-YR/15-YR peak near 100; 38-YR advancing
Sep  — CHOP  ★★    | Divergence; 38-YR up, 5-YR/15-YR down
Oct  — SHORT ★★★   | Post-August decline; all TFs lower
Nov  — LONG  ★★★★★ | 38-YR annual HIGH at ~100; top seasonal trade
Dec  — LONG  ★★★   | Year-end carry; 38-YR holds ~85–90

KEY OBSERVATIONS:
- DUAL TROUGH pattern (March AND June) is the defining feature — rare and powerful
- The June crash creates the best entry for the July–August bull run
- November 38-YR annual high (~100) is the #1 trade of the year — buy October weakness
- 38-YR peaks 3 months later than 5-YR (Nov vs Aug) — extreme TF divergence
- 5-YR starts the year lowest (~35) vs 38-YR highest (~89) — opposite TF ordering vs bonds
`;
