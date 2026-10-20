// tbonds.js — 30-Year T-Bonds (CBOT) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "tbonds",
  name:     "30-Year T-Bonds (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 30-Year T-Bonds CBOT · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#1d4ed8",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR rallies from ~25 to ~50 early Jan; 40-YR and 15-YR mixed. No clean directional consensus.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "chop", s40: "bull", com: "LONG ★★★",   note: "Early Jan strength; 5-YR and 40-YR gaining" },
      { wk: "Wk 2", s5: "bull", s15: "chop", s40: "bull", com: "LONG ★★",    note: "Rally extension; 5-YR approaching mid-levels" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s40: "chop", com: "CHOP",       note: "Mid-Jan fade; gains begin to give back" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late-Jan weakness; all TFs declining into Feb" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Strong seasonal bear month; all TFs declining toward annual lows. 15-YR and 5-YR most aggressive selling.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Continued decline; sell rallies" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★★", note: "Steepest seasonal decline of the year; high conviction short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Trend intact; approaching seasonal lows" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Late-Feb lows forming; exhaustion possible but trend down" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "bear", sig40: "bear",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Transition month; 40-YR seasonal trough (~10). 5-YR begins tentative recovery from near zero. 15-YR still declining.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Annual low zone; 40-YR near seasonal nadir" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s40: "chop", com: "CHOP",      note: "Possible trough forming; wait for confirmation" },
      { wk: "Wk 3", s5: "bull", s15: "chop", s40: "chop", com: "CHOP",      note: "5-YR stabilising; oversold bounce likely" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s40: "bull", com: "LONG ★★",   note: "Recovery confirmed; 5-YR leading from lows" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Seasonal recovery month; 5-YR spikes dramatically toward 50. All TFs joining recovery from March lows.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Recovery gains momentum; add longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "5-YR surge; breakout from lows" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Continued strength; all TFs aligned bullish" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Month-end extension; 5-YR mid-range, others rising" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Bull trend continues; 5-YR reaches ~50. 15-YR and 40-YR making steady progress upward.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Momentum intact; trend higher" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "5-YR approaching mid-range; all TFs aligned" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★",  note: "5-YR consolidating; 40-YR/15-YR leading" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Month-end push; June continuation expected" },
    ],
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "5-YR volatile with multiple spikes around 50; underlying 40-YR/15-YR trend remains bullish heading into summer peak.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Strong start; all TFs aligned early June" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★",  note: "5-YR choppy; 40-YR/15-YR resilient" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "CHOP",     note: "Mid-June consolidation before summer push" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Late-June breakout; summer rally begins" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Strongest bull month; 5-YR and 15-YR racing toward August peak. 40-YR accelerating. High-conviction long entire month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "July surge begins; add aggressively to longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "Strong continuation; trend is your friend" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Approaching peak zone; maintain longs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Final push toward early-August seasonal peak" },
    ],
  },
  {
    month: "August", sig5: "flip", sig15: "flip", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "Critical inflection; 5-YR and 15-YR hit seasonal peak (~100) then reverse sharply. 40-YR diverges bullish toward November high.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Early Aug still bullish; short-TF peak imminent" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "CHOP",     note: "5-YR/15-YR topping; 40-YR diverging bullish" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bull", com: "CHOP",     note: "5-YR/15-YR breaking down; 40-YR resilient" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bull", com: "CHOP",     note: "TF divergence wide; manage risk carefully" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Seasonal bear phase post-August peak; 5-YR drops from 100 to ~30. 15-YR falls sharply. 40-YR more resilient around 55–65.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★", note: "September selling begins; reduce long exposure" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★", note: "Continued decline; trend intact" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★", note: "Mid-Sep weakness; 5-YR near 40 area" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★",  note: "Approaching Oct; oversold but trend still down" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Transition month; 5-YR at seasonal lows (~15–20). 40-YR and 15-YR stabilising and beginning recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s40: "chop", com: "CHOP",     note: "Early Oct weak; wait for base to form" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "CHOP",     note: "40-YR firming; early recovery signs" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "CHOP",     note: "Mixed signals; 40-YR leading tentative recovery" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Late-Oct reversal; 40-YR rallying into November" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "40-YR annual high in November (~100). 15-YR recovering to ~65–70. 5-YR muted but 40-YR conviction is strong.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Nov bull run begins; 40-YR leading" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Strong push; 40-YR approaching annual high" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "40-YR near 100; maintain long position" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★",   note: "40-YR at seasonal peak; partial profit-taking" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "40-YR stays elevated (~90–95) coming off November peak. 5-YR remains low (~25). Mixed year-end picture.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s40: "chop", com: "CHOP",    note: "Post-Nov consolidation; 40-YR holding high" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s40: "chop", com: "CHOP",    note: "Year-end positioning; no clear trend" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "chop", com: "CHOP",    note: "Holiday thin markets; 5-YR weakening" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★", note: "Year-end window dressing; mild selling" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Analyse the 30-Year T-Bonds (CBOT) seasonal data below.
Produce: (1) Yearly bias arc summary, (2) Month-by-month table with 5-YR / 15-YR / 40-YR / Combined bias,
(3) Week-by-week breakdown for the top 3 highest-conviction months, (4) Top 3 trade setups with entry timing,
stop placement, and seasonal target.

=== PLAYBOOK SIGNALS ===
Asset: 30-Year T-Bonds (CBOT) · CBOT · 40-Year Seasonal (1980–2019)
Timeframes: 5-YR (pink) · 15-YR (brown) · 40-YR (blue)

Yearly arc: Bearish H1 (Jan–Mar decline to annual lows). Recovery Apr–Jun. Strong bull run Jul–Aug for short TFs.
Post-Aug reversal for 5-YR/15-YR; 40-YR peaks in November. Year-end mixed/elevated.

Key divergence: 5-YR and 15-YR peak in early August at ~100, then crash. 40-YR continues rising into November peak (~100).

Monthly signals:
Jan  — 5-YR BULL / 15-YR CHOP / 40-YR CHOP | Combined: CHOP ★★
Feb  — 5-YR BEAR / 15-YR BEAR / 40-YR BEAR | Combined: SHORT ★★★★ (annual low approach)
Mar  — 5-YR CHOP / 15-YR BEAR / 40-YR BEAR | Combined: CHOP ★★ (trough/base)
Apr  — 5-YR BULL / 15-YR BULL / 40-YR BULL | Combined: LONG ★★★
May  — 5-YR BULL / 15-YR BULL / 40-YR BULL | Combined: LONG ★★★
Jun  — 5-YR CHOP / 15-YR BULL / 40-YR BULL | Combined: LONG ★★
Jul  — 5-YR BULL / 15-YR BULL / 40-YR BULL | Combined: LONG ★★★★★ (strongest month)
Aug  — 5-YR FLIP / 15-YR FLIP / 40-YR BULL | Combined: FLIP MONTH ★★★ (short-TF peak Aug 1)
Sep  — 5-YR BEAR / 15-YR BEAR / 40-YR CHOP | Combined: SHORT ★★★
Oct  — 5-YR BEAR / 15-YR CHOP / 40-YR CHOP | Combined: CHOP ★★
Nov  — 5-YR BULL / 15-YR BULL / 40-YR BULL | Combined: LONG ★★★★ (40-YR annual high)
Dec  — 5-YR BEAR / 15-YR CHOP / 40-YR CHOP | Combined: CHOP ★★

Top playbook weeks:
Wk 2 Feb — SHORT ★★★★★ | Steepest seasonal decline
Wk 1 Jul — LONG ★★★★★ | July surge, add longs aggressively
Wk 1 Nov — LONG ★★★★  | 40-YR annual high bull run begins
`;
