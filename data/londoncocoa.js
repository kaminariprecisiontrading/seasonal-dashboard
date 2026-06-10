// londoncocoa.js — London Cocoa (LCE) · 34-Year Seasonal (1986–2019)

const ASSET_CONFIG = {
  id:       "londoncocoa",
  name:     "London Cocoa (LCE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · London Cocoa LCE · 34-Year Seasonal (1986–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#5c2d09",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig34: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "34-YR starts near 0 then SURGES massively to ~80-90 by late January/early February — one of the sharpest January recoveries in the dashboard. 5-YR and 15-YR less extreme. The January entry is difficult due to initial low then spike.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",       note: "Jan Wk1: 34-YR near 0 (extreme low); chaotic early Jan entry; avoid" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "34-YR SURGING from 0 toward 70-80; all TFs lifting" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "Mid-Jan; 34-YR approaching ~80-85; 15-YR rising" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "Late-Jan; 34-YR at ~85-90; approaching Feb annual high" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "34-YR hits ANNUAL HIGH (~90-95) in early February — then SHARP CRASH. All three TFs crash hard from February peak. This is one of the cleanest flip signals in the soft commodities complex. FLIP SHORT at February peak.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",   note: "Feb Wk1: 34-YR at ANNUAL HIGH ~90-95; maximum long; top forming" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",         note: "Peak zone; topping; exit longs; flip short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",   note: "CRASH confirmed; 34-YR from ~90 to ~50-60; all TFs falling" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",   note: "Late-Feb; 34-YR at ~45-55; hold shorts for March/April trough" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-February crash continuing. 34-YR declining to ~25-30. 15-YR and 5-YR also declining. The April second low is approaching — maintain shorts but prepare to cover and re-enter.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "Mar: 34-YR at ~40-50; post-Feb crash continuing" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "34-YR declining to ~35-40; 15-YR following" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "Mid-Mar; 34-YR at ~30-35; heading toward April low" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "Late-Mar; 34-YR at ~25-30; April second crash approaching" },
    ],
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sig34: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "34-YR DIPS TO NEAR 0 AGAIN (second annual low of the year) — then REVERSES SHARPLY. 5-YR and 15-YR less extreme. The April second low is the setup for the May-July bull surge. FLIP LONG at April trough.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★",  note: "Apr Wk1: 34-YR crashing to near 0; cover shorts — the second low is forming" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",        note: "34-YR at or near 0 — trough; flip long for May-July surge" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",   note: "Recovery from April second low; 34-YR surging" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",   note: "Late-Apr; 34-YR at ~20-30; 5-YR and 15-YR surging toward May highs" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "POWERFUL BULL SURGE — 5-YR and 15-YR heading to ANNUAL HIGH (~95-100). 34-YR at ~50-60. All TFs aligned bullishly. Maximum long conviction for the May-July window.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★★", note: "May: 5-YR and 15-YR surging toward 95-100; 34-YR at 35-50" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★★", note: "All TFs accelerating; 5-YR at 80-90 and rising" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",  note: "Mid-May; 5-YR approaching annual high (~95-100) for 5-YR in late May/Jun" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",  note: "Late-May; 5-YR and 15-YR near annual highs; 34-YR at ~55-60" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig34: "chop",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "5-YR and 15-YR hit ANNUAL HIGHS (~95-100) early June — then CRASH HARD. 34-YR peaks at ~55-60 then follows down. FLIP SHORT at June peak.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",   note: "Jun Wk1: 5-YR and 15-YR at annual highs (~95-100); top forming" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",         note: "Peak zone; exit all longs; June crash begins" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",   note: "CRASH from June highs; all TFs falling sharply; flip short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",   note: "Late-Jun; 34-YR at ~40-45; 5-YR crashing from annual high" },
    ],
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Post-June-high crash continuing. 34-YR declining to ~30-35 (heading toward August annual low). 5-YR and 15-YR also crashing from annual highs. Hold shorts.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★", note: "Jul: all TFs crashing from June highs; 34-YR at ~35-40" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★", note: "34-YR declining to ~25-30; 5-YR and 15-YR also crashing" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★",  note: "Mid-Jul; 34-YR at ~20-25; approaching August annual low" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★",  note: "Late-Jul; 34-YR at ~15-20; August low imminent; prepare to cover" },
    ],
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "34-YR ANNUAL LOW (~15-20). Also third time 34-YR has been at extreme lows in this year. COVER SHORTS. Then a SEPTEMBER SECONDARY HIGH approaches for 34-YR (~85). Watch for the spike and play it short again.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★", note: "Aug: 34-YR at annual low ~15-20; 5-YR and 15-YR very low" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",        note: "Annual trough forming; cover all shorts; prepare for Sep spike" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "34-YR beginning recovery; November 5-YR surge is the target" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "Late-Aug; 34-YR at ~30-40; Sep spike imminent" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "34-YR SPIKES TO ~85 (secondary high) — then CRASHES BACK to near 0 AGAIN by October. This is the FOURTH extreme swing of the year for 34-YR. FLIP SHORT at September secondary high.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",   note: "Sep: 34-YR spiking to ~85 (secondary high); ride the spike up" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",         note: "Secondary high forming at ~85; exit longs; flip short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",   note: "34-YR crashing from ~85; another sharp reversal; hold shorts" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",   note: "Late-Sep; 34-YR crashing toward October near-0 level" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig34: "bear",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "34-YR crashes to near 0 AGAIN (fourth time this year at extreme lows). 5-YR and 15-YR diverge — they're recovering. Mixed signal from TF divergence. Wait for November clarity.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★",  note: "Oct: 34-YR crashing toward near 0; 5-YR/15-YR less extreme" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",       note: "34-YR near 0 again; TF divergence — not a clean entry" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★",    note: "Recovery; 5-YR and 15-YR leading; 34-YR from near 0" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",   note: "Late-Oct; all recovering; Nov 5-YR surge ahead" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig34: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "5-YR surges to ~85-95. 15-YR also rising strongly. 34-YR at ~40-50 (recovering but less dramatic). 5-YR dominates — add longs for November 5-YR strength.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "chop", com: "LONG ★★★", note: "Nov: 5-YR surging to ~80-90; 34-YR at ~40-45" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "chop", com: "LONG ★★★", note: "5-YR at ~85-90 (monthly high); 15-YR also strong" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "chop", com: "LONG ★★★", note: "Mid-Nov; 5-YR near peak; 34-YR flat at ~45-50" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",      note: "Late-Nov; 5-YR fading from Nov high; mixed into December" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig34: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Year-end cursor: 34-YR at ~42.51, 15-YR at ~67.98, 5-YR at ~50.09. TF divergence — 15-YR is the highest, 5-YR and 34-YR in mid-range. The January 34-YR surge from near 0 is about to repeat the cycle.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Dec: 34-YR at ~42; 15-YR at ~68; 5-YR at ~50; mixed signals" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Mid-Dec; all TFs ranging; no clean directional signal" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Year-end positioning; 34-YR heading toward Jan near-0 again" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Year-end: 34-YR ~42, 15-YR ~68, 5-YR ~50 — Jan cycle repeat" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following London Cocoa (LCE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: London Cocoa (LCE)
Exchange: LCE (London Commodity Exchange) | Seasonal History: 34-Year (1986–2019)

YEARLY ARC:
London Cocoa is the most volatile instrument in the LCE complex — the 34-YR line visits near 0 FOUR TIMES
in a single year. It is defined by extreme swings with very little sustained trend.

January: 34-YR starts near 0, then SURGES to ~80-90 by late January (first massive rally of year).
February: 34-YR ANNUAL HIGH (~90-95) — then SHARP CRASH (flip short).
March-April: 34-YR declines to second near-0 (April). Flip long at April trough.
May-June: 5-YR and 15-YR hit ANNUAL HIGHS (~95-100) in late May/early June. Dramatic bull surge.
Late June-July: All TFs crash from June highs. 34-YR declining to ~15-20.
August: 34-YR annual low (~15-20). Cover shorts, flip long briefly.
September: 34-YR spikes to secondary high (~85) — then CRASHES AGAIN.
October: 34-YR crashes to near 0 AGAIN (fourth time at extreme lows).
November: 5-YR surges to ~85-95. 15-YR strong. 34-YR recovering at ~40-50.
December: Mixed. 34-YR at ~42, 15-YR at ~68, 5-YR at ~50.

MONTHLY SIGNALS:
Jan — CHOP  ★★    | 34-YR starts near 0 then surges massively; hard entry; wait for Wk2
Feb — FLIP  ★★★★  | 34-YR annual high (~90-95) then crash; flip short immediately
Mar — SHORT ★★★   | Post-Feb crash; 34-YR at 25-40; heading toward April low
Apr — FLIP  ★★★★  | 34-YR second near-0; flip long for May-June surge
May — LONG  ★★★★★ | 5-YR and 15-YR surging toward annual highs; maximum longs
Jun — FLIP  ★★★★  | 5-YR and 15-YR annual highs (~95-100) early Jun; then crash; flip short
Jul — SHORT ★★★★  | Post-June crash; all TFs declining to annual lows
Aug — SHORT ★★★★  | 34-YR annual low (~15-20); cover; flip long
Sep — FLIP  ★★★★  | 34-YR secondary high (~85); flip short immediately
Oct — CHOP  ★★    | 34-YR near 0 again; TF divergence; mixed signals
Nov — LONG  ★★★   | 5-YR surges to 85-95; 15-YR strong; 34-YR recovering
Dec — CHOP  ★★    | Mixed: 34-YR ~42, 15-YR ~68, 5-YR ~50

KEY OBSERVATIONS:
- 34-YR hits near 0 FOUR TIMES per year: Jan, Apr, Aug, Oct — most volatile instrument in the dashboard
- The Feb 34-YR annual high (~90-95) is followed by the sharpest single-month crash
- May-June 5-YR and 15-YR annual highs (~95-100) diverge strongly from 34-YR (~50-60)
- September 34-YR secondary high (~85) is a reliable short setup
- This instrument requires active management — no multi-month holds work here
- Year-end cursor: 34-YR at 42.51, 15-YR at 67.98, 5-YR at 50.09
`;
