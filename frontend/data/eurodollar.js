// eurodollar.js — Eurodollars (CME) · 39-Year Seasonal (1981–2019)

const ASSET_CONFIG = {
  id:       "eurodollar",
  name:     "Eurodollars (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 39-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Eurodollars CME · 39-Year Seasonal (1981–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "39-YR",
  ltSigKey: "sig39",
  ltKey:    "s39",
  ltAccent: "#0284c7",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig39: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "All three TFs start at very elevated levels (90–100 range). 5-YR and 15-YR declining from highs; 39-YR still rising toward 100.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bull", com: "CHOP",     note: "5-YR/15-YR declining from ~90+; 39-YR rising" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "bull", com: "CHOP",     note: "Divergence continues; 39-YR approaching 100" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bull", com: "CHOP",     note: "5-YR/15-YR well off highs; 39-YR near peak" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "chop", com: "CHOP",     note: "39-YR at peak (~100); all three about to turn" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig39: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "Dramatic crash from elevated January levels: 39-YR falls from ~100 to ~15; 15-YR from ~90 to ~35; 5-YR from ~85 to ~50. Annual H1 low.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★",  note: "Crash begins; all TFs from elevated levels" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★★", note: "Most aggressive decline; 39-YR plummeting" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★★", note: "Near annual lows; extreme bear pressure" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★",  note: "Late-Feb lows forming; 39-YR near 15" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "chop", sig39: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "39-YR at lows (~15); 5-YR continues declining then stabilises; 15-YR around 35 and choppy. Base-building month.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s39: "chop", com: "CHOP",    note: "39-YR at seasonal floor; 5-YR still sliding" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s39: "chop", com: "CHOP",    note: "Stabilisation; possible trough forming" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s39: "bull", com: "CHOP",    note: "39-YR beginning recovery; 5-YR flat" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★", note: "Recovery signal; begin accumulating longs" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "39-YR recovers from ~15 to ~45; 15-YR recovers to ~50; 5-YR climbs to ~65. Solid recovery month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Recovery in force; add longs across TFs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "39-YR gaining momentum; all aligned" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Continued strength; hold positions" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Month-end extension; May continuation likely" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "39-YR to ~50; 15-YR to ~60; 5-YR to ~65–70. Bull trend accelerating. All TFs gaining before June anomaly.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Momentum intact; trending higher" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "All TFs aligned; increasing gains" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Strong mid-May; 5-YR leading" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Month-end strength; watch for June 39-YR crash" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "chop", sig39: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "Extreme TF divergence: 39-YR crashes to near 0 (second annual low!) while 5-YR surges to ~80–85. Most divergent month in rates.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "chop", com: "CHOP",      note: "5-YR/15-YR rising; 39-YR starting to stall" },
      { wk: "Wk 2", s5: "bull", s15: "chop", s39: "bear", com: "CHOP",      note: "39-YR beginning to crack; 5-YR still elevated" },
      { wk: "Wk 3", s5: "bull", s15: "chop", s39: "bear", com: "CHOP",      note: "Wide divergence; 5-YR at ~85, 39-YR collapsing" },
      { wk: "Wk 4", s5: "chop", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "39-YR near zero; 5-YR fading; extreme caution" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "39-YR recovers explosively from near-zero June lows, rising to ~65–70. 15-YR also gains. 5-YR declining from June peak.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★★", note: "39-YR surge from near zero; excellent long entry" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★★", note: "Explosive continuation; 39-YR/15-YR dominant" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★",  note: "39-YR approaching 65; maintain longs" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★",  note: "Month-end strength; Sep peak target" },
    ],
  },
  {
    month: "August", sig5: "chop", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "39-YR continues climbing to ~75–85; 15-YR to ~55–60; 5-YR at ~45 and declining. Longer TFs dominant.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★", note: "39-YR/15-YR trending higher; 5-YR flat" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Strong continuation; approaching Sep peak" },
      { wk: "Wk 3", s5: "bear", s15: "bull", s39: "bull", com: "LONG ★★",  note: "5-YR declining; 39-YR/15-YR holding" },
      { wk: "Wk 4", s5: "bear", s15: "bull", s39: "bull", com: "LONG ★★",  note: "Mixed; 39-YR near seasonal high zone" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig39: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "39-YR peaks (~85–90) then begins declining. 15-YR also rolling over. 5-YR continues lower. Complex transition month.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s39: "bull", com: "CHOP",    note: "39-YR near peak; 5-YR/15-YR already declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "chop", com: "CHOP",    note: "39-YR topping; all TFs converging lower" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★", note: "39-YR joining decline; transition to bear" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★", note: "All TFs declining; Oct bear phase ahead" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig39: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining; 39-YR from ~85 to ~45; 15-YR falling; 5-YR at lows ~25–30. Bear phase before Nov recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "October bear; all TFs in downtrend" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "39-YR unwinding from ~85 toward 45" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s39: "chop", com: "CHOP",      note: "Mid-Oct stabilisation; base forming" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★",  note: "Late-Oct reversal; Nov bull run anticipated" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "39-YR recovers to ~80; 15-YR rises; 5-YR modest recovery to ~35–40. Bull month but less extreme than longer TF instruments.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Nov recovery; 39-YR leading from Oct lows" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Strong push; 39-YR toward 80" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "39-YR at highs; maintain longs" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s39: "chop", com: "CHOP",     note: "Approaching Dec selling; begin reducing" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig39: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year-end selling: 39-YR falls from ~80 to ~65; 15-YR drops sharply; 5-YR near 0–10 (annual low). Dec is consistently bearish.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "Dec selling begins; 5-YR declining fast" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "Year-end unwinding; all TFs falling" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★",  note: "Holiday markets; 5-YR near zero" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★",  note: "Year-end flush; 5-YR at annual low" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Analyse the Eurodollars (CME) seasonal data below.
Produce: (1) Yearly bias arc summary, (2) Month-by-month table with 5-YR / 15-YR / 39-YR / Combined bias,
(3) Week-by-week breakdown for the top 3 highest-conviction months, (4) Top 3 trade setups with entry timing,
stop placement, and seasonal target.

=== PLAYBOOK SIGNALS ===
Asset: Eurodollars (CME) · CME · 39-Year Seasonal (1981–2019)
Timeframes: 5-YR (pink) · 15-YR (brown) · 39-YR (blue)

Yearly arc: Starts from VERY HIGH levels in January (all TFs at 90–100). 5-YR/15-YR declining from Jan highs;
39-YR peaks at 100 in Jan then crashes in Feb. Late-Feb crash to annual H1 lows. Apr-May recovery.
JUNE ANOMALY: 39-YR crashes to near 0 while 5-YR surges to ~85 — extreme TF divergence.
July: 39-YR explosive recovery. Sep peak (~85). Oct decline. Nov recovery. Dec year-end selling.

Key feature unique to Eurodollars:
1. January starts at very elevated levels — no other instrument does this
2. June 39-YR crash to near 0 simultaneous with 5-YR surge to ~85 — extreme divergence
3. February crash is from even higher starting point than T-Bond instruments
4. December 5-YR collapses to near annual low (near 0)

Monthly signals:
Jan  — 5-YR BEAR / 15-YR BEAR / 39-YR BULL | Combined: CHOP ★★ (TF divergence at high levels)
Feb  — 5-YR BEAR / 15-YR BEAR / 39-YR BEAR | Combined: SHORT ★★★★★ (crash from elevated start)
Mar  — 5-YR BEAR / 15-YR CHOP / 39-YR CHOP | Combined: CHOP ★★ (base)
Apr  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★
May  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★
Jun  — 5-YR BULL / 15-YR CHOP / 39-YR BEAR | Combined: FLIP MONTH ★★★ (extreme TF divergence)
Jul  — 5-YR CHOP / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★★ (39-YR surge from zero)
Aug  — 5-YR CHOP / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★
Sep  — 5-YR BEAR / 15-YR BEAR / 39-YR CHOP | Combined: CHOP ★★ (39-YR peak)
Oct  — 5-YR BEAR / 15-YR BEAR / 39-YR BEAR | Combined: SHORT ★★★
Nov  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★
Dec  — 5-YR BEAR / 15-YR BEAR / 39-YR BEAR | Combined: SHORT ★★★

Top playbook weeks:
Wk 2 Feb  — SHORT ★★★★★ | Crash from very elevated start; extreme bear
Wk 1 Jul  — LONG ★★★★   | 39-YR explosive recovery from near-zero June low
Wk 4 Jun  — SHORT ★★★    | 39-YR near zero; 5-YR fading; watch for Jun/Jul reversal
`;
