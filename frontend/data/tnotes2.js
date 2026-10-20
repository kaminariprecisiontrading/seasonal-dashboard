// tnotes2.js — 2-Year T-Notes (CBOT) · 30-Year Seasonal (1990–2019)

const ASSET_CONFIG = {
  id:       "tnotes2",
  name:     "2-Year T-Notes (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 30-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 2-Year T-Notes CBOT · 30-Year Seasonal (1990–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "30-YR",
  ltSigKey: "sig30",
  ltKey:    "s30",
  ltAccent: "#0369a1",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sig30: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "30-YR rises mid-month to ~90 then falls; 15-YR starts very high (~80+) and declines; 5-YR around 60 and volatile. No consensus.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s30: "bull", com: "CHOP",     note: "30-YR rallying; 15-YR declining from elevated start" },
      { wk: "Wk 2", s5: "bull", s15: "bear", s30: "bull", com: "CHOP",     note: "30-YR peaks at ~90; 15-YR still falling" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s30: "chop", com: "CHOP",     note: "30-YR fading from peak; mixed signals" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★", note: "Late-Jan all TFs declining; Feb crash incoming" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Sharp crash; 30-YR falls from ~60 to ~25; 15-YR from ~65 to ~20; 5-YR from ~30 to near 0. Annual H1 low forming.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★",  note: "Decline accelerating; sell rallies" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★★", note: "Most aggressive selling week; 30-YR crashing" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★",  note: "Approaching lows; trend dominant" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",   note: "Late-Feb floor forming; near H1 seasonal low" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig30: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Extreme 5-YR volatility: spikes from near 0 to ~85 then collapses again. 30-YR and 15-YR at lows and base-building.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "chop", s30: "chop", com: "CHOP",    note: "5-YR massive spike from lows; 30-YR/15-YR still base" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",    note: "5-YR volatile at high; others lagging" },
      { wk: "Wk 3", s5: "bear", s15: "chop", s30: "chop", com: "CHOP",    note: "5-YR pulling back from spike; no clean direction" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★", note: "Recovery signal; all TFs beginning to lift" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Seasonal recovery; 30-YR and 15-YR climb from lows toward 50+. 5-YR volatile but generally rising. All TFs aligned.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Recovery in progress; add longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "All TFs gaining; trend established" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Continued strength; hold positions" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Month-end push; May continuation expected" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "30-YR reaches ~55; 15-YR to ~55; 5-YR volatile around 50–80. Bull trend intact with 5-YR spike in late May/early June.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Momentum continuing; all TFs up" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "5-YR rising toward mid-high zone" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★",  note: "5-YR pausing; 30-YR/15-YR steady" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Month-end extension; 5-YR spike coming" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Dramatic crash: all TFs collapse to near 0 in second half of June. One of the most bearish seasonal weeks of the year. Sell into strength.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★",   note: "Early June: 5-YR spike to ~80; enjoy briefly" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",      note: "Topping signals; 5-YR near high, others stalling" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Major crash initiates; all TFs collapsing to near 0" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "All TFs near zero; extreme seasonal low" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive recovery from near-zero June lows; 30-YR rises to ~75, 15-YR to ~70, 5-YR to ~70. Best long entry of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "Surge from zero; maximum long opportunity" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "Explosive continuation; all TFs rallying hard" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★",  note: "Strong trend; hold full position" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★",  note: "Approaching Aug/Sep peak; trail stops" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "30-YR reaches ~80; all TFs at or near highs. 30-YR annual high approaches September. Hold longs but begin tightening.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "All TFs at highs; peak imminent" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "30-YR near 80; seasonal high approaching" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★★",  note: "5-YR topping; 30-YR/15-YR holding" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s30: "bull", com: "LONG ★★",   note: "30-YR near Sept peak; tighten stops" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig30: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "30-YR peaks at 100 early September (annual high), then reverses sharply. All TFs declining by month end.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★",   note: "30-YR near annual peak; final long opportunity" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s30: "chop", com: "CHOP",      note: "30-YR topping at 100; reversal likely" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "All TFs now declining; flip to short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Post-peak selling; trend now down" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining post-September peak. 30-YR from ~90 to ~55; 15-YR falling; 5-YR at lows. Bear phase continues.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "October selling; all TFs declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Continued downtrend; 30-YR unwinding" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",      note: "Mid-Oct stabilisation; base forming" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",  note: "Late-Oct reversal; Nov surge anticipated" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "30-YR surges to 85–90; 5-YR also recovers strongly to ~85. Strong bull month for all TFs. Second major seasonal high.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "Nov bull run; all TFs surging" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "Strong push to highs; 5-YR leading" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",  note: "30-YR/5-YR at ~85-90; hold longs" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",      note: "Nearing Dec fade; begin partial profit-taking" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Aggressive year-end selling: 30-YR from ~85 to ~55; 15-YR falls sharply; 5-YR collapses toward annual low (~0-5). Strong seasonal sell.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",  note: "Dec selling begins; 5-YR/15-YR declining fast" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Aggressive year-end unwinding" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "5-YR approaching annual lows; holiday selling" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★",  note: "Year-end flush; 5-YR near zero" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Analyse the 2-Year T-Notes (CBOT) seasonal data below.
Produce: (1) Yearly bias arc summary, (2) Month-by-month table with 5-YR / 15-YR / 30-YR / Combined bias,
(3) Week-by-week breakdown for the top 3 highest-conviction months, (4) Top 3 trade setups with entry timing,
stop placement, and seasonal target.

=== PLAYBOOK SIGNALS ===
Asset: 2-Year T-Notes (CBOT) · CBOT · 30-Year Seasonal (1990–2019)
Timeframes: 5-YR (pink) · 15-YR (brown) · 30-YR (blue)

Yearly arc: High start Jan then fall. Feb crash to H1 lows. March 5-YR volatile spike then collapse.
April-May recovery. JUNE CRASH to near zero for all TFs. July explosive recovery (best long of year).
Aug-Sep 30-YR peaks at 100. Nov second bull surge. December aggressive year-end selling to near-zero 5-YR.

Key features unique to 2-YR T-Notes:
1. June collapse to near 0 — most dramatic in rates complex
2. 30-YR annual high = September (not November like longer instruments)
3. December year-end selling very aggressive (5-YR near 0)
4. March 5-YR has anomalous spike from 0 to ~85 then reversal

Monthly signals:
Jan  — 5-YR CHOP / 15-YR BEAR / 30-YR CHOP  | Combined: CHOP ★★
Feb  — 5-YR BEAR / 15-YR BEAR / 30-YR BEAR  | Combined: SHORT ★★★★
Mar  — 5-YR CHOP / 15-YR CHOP / 30-YR CHOP  | Combined: CHOP ★★ (volatile base)
Apr  — 5-YR BULL / 15-YR BULL / 30-YR BULL  | Combined: LONG ★★★
May  — 5-YR BULL / 15-YR BULL / 30-YR BULL  | Combined: LONG ★★★
Jun  — 5-YR BEAR / 15-YR BEAR / 30-YR BEAR  | Combined: SHORT ★★★★ (collapse to near 0)
Jul  — 5-YR BULL / 15-YR BULL / 30-YR BULL  | Combined: LONG ★★★★★ (best long)
Aug  — 5-YR BULL / 15-YR BULL / 30-YR BULL  | Combined: LONG ★★★★
Sep  — 5-YR BEAR / 15-YR BEAR / 30-YR FLIP  | Combined: FLIP MONTH ★★★ (30-YR peaks at 100)
Oct  — 5-YR BEAR / 15-YR BEAR / 30-YR BEAR  | Combined: SHORT ★★★
Nov  — 5-YR BULL / 15-YR BULL / 30-YR BULL  | Combined: LONG ★★★★ (second bull surge)
Dec  — 5-YR BEAR / 15-YR BEAR / 30-YR BEAR  | Combined: SHORT ★★★★ (year-end selling)

Top playbook weeks:
Wk 1 Jul  — LONG ★★★★★ | Explosive recovery from near-zero June lows
Wk 3 Jun  — SHORT ★★★★ | June collapse begins; all TFs to near 0
Wk 1 Nov  — LONG ★★★★  | Second seasonal bull surge
`;
