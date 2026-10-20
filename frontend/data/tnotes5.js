// tnotes5.js — 5-Year T-Notes (CBOT) · 33-Year Seasonal (1987–2019)

const ASSET_CONFIG = {
  id:       "tnotes5",
  name:     "5-Year T-Notes (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 33-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 5-Year T-Notes CBOT · 33-Year Seasonal (1987–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "33-YR",
  ltSigKey: "sig33",
  ltKey:    "s33",
  ltAccent: "#0891b2",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sig33: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "15-YR starts very high (~90) and declines; 33-YR rises from ~35; 5-YR around 65 and mixed. Cross-TF divergence.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bear", s33: "bull", com: "CHOP",     note: "15-YR declining from elevated start; 33-YR rising" },
      { wk: "Wk 2", s5: "chop", s15: "bear", s33: "bull", com: "CHOP",     note: "Divergence continues; mixed signals" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s33: "chop", com: "CHOP",     note: "15-YR bear dominant; 33-YR stalling" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★", note: "Late-Jan alignment to downside; Feb bear ahead" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Sharp crash for all TFs; 33-YR falls from ~50 to near 0, 15-YR from ~75 to ~5, 5-YR from ~65 to ~25. Strong seasonal sell.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Decline begins; sell strength" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★★", note: "Steepest crash; all TFs collapsing" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Near annual lows; stay short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Final Feb flush; lows forming" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "bear", sig33: "bear",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "33-YR near zero; 15-YR near zero; 5-YR bottoms and begins recovery. Trough zone — base-building before Apr recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★", note: "Annual lows; all TFs at floor" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s33: "chop", com: "CHOP",     note: "Stabilisation; trough likely forming" },
      { wk: "Wk 3", s5: "bull", s15: "chop", s33: "chop", com: "CHOP",     note: "5-YR recovering; others base-building" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★",  note: "Recovery signal; begin building longs" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "5-YR spikes dramatically toward 75 from near zero. 15-YR and 33-YR recover. Strong recovery month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Recovery gains pace; add longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "5-YR surge; breakout confirmed" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "All TFs aligned bullish; hold position" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Month-end strength; May continuation expected" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "5-YR extends toward 75; 15-YR reaches ~50; 33-YR climbing toward 30. Bull trend well established.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Momentum solid; trending higher across TFs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "5-YR holding high; 15-YR and 33-YR gaining" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★",  note: "5-YR pausing; longer TFs continuing" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Month-end extension; June 5-YR peak ahead" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR spikes to seasonal high (~100) — annual peak for 5-YR in this instrument. 15-YR at ~60; 33-YR at ~45. Strong month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "5-YR surging toward annual peak; all TFs aligned" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "5-YR approaching or at 100; high conviction" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "5-YR near peak; 33-YR/15-YR continuing" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "5-YR topping; longer TFs still rising into Aug" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR consolidates after June peak; 33-YR and 15-YR accelerate toward August high (~100 for both). Strong longer-TF bull.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "33-YR/15-YR surging; 5-YR holds after June peak" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "Strong continuation; add to 33-YR/15-YR longs" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "Approaching August peak; maintain longs" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "Final push; 33-YR/15-YR near 100" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "flip", sig33: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "33-YR peaks at 100 (annual high) then reverses. 15-YR also peaks. 5-YR already declining from June peak. Critical reversal month.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bull", s33: "bull", com: "LONG ★★",  note: "33-YR/15-YR still climbing; 5-YR already falling" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s33: "chop", com: "CHOP",     note: "33-YR at peak; topping signals emerging" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★", note: "All TFs declining; reversal confirmed" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★", note: "Post-peak selloff; trend now down" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining; 33-YR from 100 to ~60–70; 15-YR falling; 5-YR at lows. Seasonal bear phase.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "September selling; all TFs in downtrend" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Continued decline; 33-YR unwinding from peak" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Mid-Sep weakness; stay short" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "chop", com: "CHOP",      note: "Approaching Oct base; possible stabilisation" },
    ],
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sig33: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "33-YR stabilises ~60–70; 5-YR at lows (~5–15); 15-YR ~60–70. Mixed signals; transition before Nov recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s33: "chop", com: "CHOP",    note: "Early Oct weak; 5-YR near lows" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s33: "chop", com: "CHOP",    note: "Range-bound; base-building" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "bull", com: "CHOP",    note: "33-YR firming; early recovery signs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★", note: "Late-Oct recovery; November bull run anticipated" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "33-YR surges back toward 95–100. 15-YR recovers to ~70–75. 5-YR mild recovery to ~25. Strong seasonal bull month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "Nov bull run; 33-YR leading strongly" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "Strong push; 33-YR near seasonal highs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "33-YR at high levels; maintain longs" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "bull", com: "LONG ★★",   note: "33-YR holding high; partial profit-taking" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig33: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "33-YR eases from high levels; 5-YR falls toward annual lows (~10–15); 15-YR declining. Year-end selling pressure.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s33: "chop", com: "CHOP",    note: "Post-Nov fade; 33-YR holding, others softening" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "chop", com: "CHOP",    note: "5-YR/15-YR declining; 33-YR resilient" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★", note: "Holiday selling; all TFs declining" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★", note: "Year-end flush; 5-YR near annual lows" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Analyse the 5-Year T-Notes (CBOT) seasonal data below.
Produce: (1) Yearly bias arc summary, (2) Month-by-month table with 5-YR / 15-YR / 33-YR / Combined bias,
(3) Week-by-week breakdown for the top 3 highest-conviction months, (4) Top 3 trade setups with entry timing,
stop placement, and seasonal target.

=== PLAYBOOK SIGNALS ===
Asset: 5-Year T-Notes (CBOT) · CBOT · 33-Year Seasonal (1987–2019)
Timeframes: 5-YR (pink) · 15-YR (brown) · 33-YR (blue)

Yearly arc: Bearish Jan–Feb crash. Recovery Mar. Strong rally Apr–Jun (5-YR peaks in June at ~100).
33-YR/15-YR peak in August. November strong recovery for all TFs. December year-end selling.

Key distinction: 5-YR annual peak is in JUNE (not August like 30-YR/10-YR). 33-YR annual high in August.
January starts with 15-YR already at very high levels (~90) which are then declining.

Monthly signals:
Jan  — 5-YR CHOP / 15-YR BEAR / 33-YR BULL | Combined: CHOP ★★ (TF divergence)
Feb  — 5-YR BEAR / 15-YR BEAR / 33-YR BEAR | Combined: SHORT ★★★★
Mar  — 5-YR CHOP / 15-YR BEAR / 33-YR BEAR | Combined: CHOP ★★ (trough)
Apr  — 5-YR BULL / 15-YR BULL / 33-YR BULL | Combined: LONG ★★★
May  — 5-YR BULL / 15-YR BULL / 33-YR BULL | Combined: LONG ★★★
Jun  — 5-YR BULL / 15-YR BULL / 33-YR BULL | Combined: LONG ★★★★ (5-YR annual peak)
Jul  — 5-YR CHOP / 15-YR BULL / 33-YR BULL | Combined: LONG ★★★★
Aug  — 5-YR BEAR / 15-YR FLIP / 33-YR FLIP | Combined: FLIP MONTH ★★★ (33-YR/15-YR peak)
Sep  — 5-YR BEAR / 15-YR BEAR / 33-YR BEAR | Combined: SHORT ★★★
Oct  — 5-YR CHOP / 15-YR CHOP / 33-YR CHOP | Combined: CHOP ★★
Nov  — 5-YR BULL / 15-YR BULL / 33-YR BULL | Combined: LONG ★★★★ (strong recovery)
Dec  — 5-YR BEAR / 15-YR BEAR / 33-YR CHOP | Combined: CHOP ★★

Top playbook weeks:
Wk 1–2 Jun — LONG ★★★★ | 5-YR surging to annual peak
Wk 2 Feb   — SHORT ★★★★★ | Steepest crash
Wk 1 Nov   — LONG ★★★★  | Nov recovery bull run
`;
