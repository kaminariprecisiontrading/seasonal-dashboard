// tnotes10.js — 10-Year T-Notes (CBOT) · 39-Year Seasonal (1981–2019)

const ASSET_CONFIG = {
  id:       "tnotes10",
  name:     "10-Year T-Notes (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 39-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 10-Year T-Notes CBOT · 39-Year Seasonal (1981–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "39-YR",
  ltSigKey: "sig39",
  ltKey:    "s39",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig39: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "39-YR rises from ~35 to ~55; 15-YR elevated at 50–60 but falling; 5-YR mixed around 30–40. No clean consensus.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★",  note: "Early Jan: 39-YR and 15-YR leading; 5-YR lagging" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s39: "bull", com: "CHOP",     note: "Mixed signals; 39-YR gaining but 15-YR topping" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s39: "chop", com: "CHOP",     note: "15-YR fading; 39-YR stalling" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★", note: "Late-Jan weakness; all TFs declining into Feb" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig39: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "Most dramatic crash of any rates instrument; all TFs crash to near 0 by late Feb. 39-YR and 15-YR fall from ~50 to near 0.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★",  note: "Decline accelerating; sell strength" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★★", note: "Annual low crash; most bearish week of year" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★★", note: "Near zero levels; extreme seasonal bear pressure" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★★",  note: "Late-Feb lows; exhaustion possible but no signal to cover yet" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig39: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "All TFs at or near zero forming a base. 5-YR begins tentative recovery; 39-YR and 15-YR stabilise around 10–15.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★", note: "Continued low; all TFs near zero" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s39: "chop", com: "CHOP",     note: "Possible trough zone; wait for confirmation" },
      { wk: "Wk 3", s5: "bull", s15: "chop", s39: "chop", com: "CHOP",     note: "5-YR beginning recovery; others still base-building" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★",  note: "Recovery signal confirmed; begin accumulating longs" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Seasonal recovery; 5-YR spikes toward 55, 15-YR to ~35, 39-YR to ~25. All TFs climbing from historic lows.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Recovery momentum builds; add longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "5-YR surge; breakout from lows confirmed" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "All TFs aligned; maintain position" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Month-end extension; May continuation likely" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "5-YR extends to ~65; 15-YR to ~50; 39-YR continues climbing. Bull trend well established.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Momentum intact; trending higher" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "5-YR reaching mid-to-high range; hold longs" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s39: "chop", com: "LONG ★★",  note: "5-YR pausing; 15-YR/39-YR continuing" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Month-end push; July target approaching" },
    ],
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig39: "chop",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "5-YR volatile around 60–65; 39-YR progress slow (~25); 15-YR at ~50. Overall bullish trend intact but pace slows.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "chop", com: "LONG ★★",  note: "5-YR/15-YR leading; 39-YR lagging" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "chop", com: "LONG ★★",  note: "Solid mid-month; 5-YR near seasonal mid-high" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s39: "chop", com: "CHOP",     note: "Mid-June consolidation; prepare for July surge" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Late-June breakout; summer rally initiates" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive bull month; all TFs accelerating. 5-YR and 15-YR race toward 100. 39-YR jumps to 70+. Full position longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★★★", note: "July surge begins; add maximum longs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★★★", note: "Explosive continuation; trend dominant" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★★",  note: "Approaching peak zone; hold all longs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★★",  note: "Final push toward early-August seasonal high" },
    ],
  },
  {
    month: "August", sig5: "flip", sig15: "flip", sig39: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "5-YR and 15-YR peak at ~100 early August then reverse hard. 39-YR continues climbing to ~85–90. Critical TF divergence.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★", note: "Early Aug peak imminent for short TFs; trail stops" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s39: "bull", com: "CHOP",     note: "5-YR/15-YR topping; 39-YR diverging bullish" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bull", com: "CHOP",     note: "Short-TF breakdown; 39-YR holding firm" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bull", com: "CHOP",     note: "Wide TF divergence; size down, monitor 39-YR" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig39: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-August bear pressure; 5-YR drops from 100 to ~30–40. 15-YR declining. 39-YR peaks ~85–90 then joins decline.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "chop", com: "SHORT ★★★", note: "September selling; 5-YR/15-YR in freefall" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "chop", com: "SHORT ★★★", note: "39-YR near peak; 5-YR/15-YR continue lower" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "All TFs now declining; trend down" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★",  note: "Approaching Oct; oversold but bear trend intact" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig39: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued decline; 39-YR falls from ~85 to ~55. 5-YR at lows ~15–20. All TFs heading lower before Nov reversal.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "Early Oct bear continuation; 39-YR unwinding" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★★", note: "Selling ongoing; 39-YR from 85 toward 55" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s39: "chop", com: "CHOP",      note: "Mid-Oct stabilisation; base forming" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★",  note: "Late-Oct reversal; Nov 39-YR peak anticipated" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig39: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "39-YR annual high in November (~100). 15-YR recovers to ~55–65. 5-YR modest recovery to ~25–30. 39-YR dominant.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★★", note: "Nov bull run; 39-YR surging toward annual high" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s39: "bull", com: "LONG ★★★★", note: "Strong continuation; 39-YR approaching 100" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s39: "bull", com: "LONG ★★★",  note: "39-YR near peak; maintain long" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s39: "bull", com: "LONG ★★",   note: "39-YR at seasonal high; partial profit-taking" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "chop", sig39: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "39-YR eases from 100 to ~80–85. 5-YR falls to ~20. 15-YR moderate. Year-end mixed; 39-YR still elevated.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s39: "chop", com: "CHOP",    note: "Post-Nov consolidation; 39-YR holding high" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s39: "chop", com: "CHOP",    note: "Year-end positioning; no strong directional bias" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s39: "chop", com: "CHOP",    note: "Holiday markets; 5-YR drifting lower" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s39: "bear", com: "SHORT ★★", note: "Year-end selling; mild across all TFs" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional futures seasonal analyst. Analyse the 10-Year T-Notes (CBOT) seasonal data below.
Produce: (1) Yearly bias arc summary, (2) Month-by-month table with 5-YR / 15-YR / 39-YR / Combined bias,
(3) Week-by-week breakdown for the top 3 highest-conviction months, (4) Top 3 trade setups with entry timing,
stop placement, and seasonal target.

=== PLAYBOOK SIGNALS ===
Asset: 10-Year T-Notes (CBOT) · CBOT · 39-Year Seasonal (1981–2019)
Timeframes: 5-YR (pink) · 15-YR (brown) · 39-YR (blue)

Yearly arc: Bear Jan–Feb crash to near-zero annual lows. Recovery Mar–Jun. Explosive Jul bull run.
5-YR/15-YR peak early August at 100. 39-YR continues to November peak (~100). Year-end mixed.

Key divergence: 5-YR and 15-YR peak early August; 39-YR peaks in November — same structure as 30-YR T-Bonds.
February crash is even more extreme for 10-YR (all TFs to near 0).

Monthly signals:
Jan  — 5-YR CHOP / 15-YR CHOP / 39-YR BULL | Combined: CHOP ★★
Feb  — 5-YR BEAR / 15-YR BEAR / 39-YR BEAR | Combined: SHORT ★★★★★ (most extreme crash)
Mar  — 5-YR CHOP / 15-YR CHOP / 39-YR CHOP | Combined: CHOP ★★ (base/trough)
Apr  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★
May  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★
Jun  — 5-YR CHOP / 15-YR BULL / 39-YR CHOP | Combined: LONG ★★
Jul  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★★★ (strongest month)
Aug  — 5-YR FLIP / 15-YR FLIP / 39-YR BULL | Combined: FLIP MONTH ★★★
Sep  — 5-YR BEAR / 15-YR BEAR / 39-YR CHOP | Combined: SHORT ★★★
Oct  — 5-YR BEAR / 15-YR BEAR / 39-YR BEAR | Combined: SHORT ★★★
Nov  — 5-YR BULL / 15-YR BULL / 39-YR BULL | Combined: LONG ★★★★ (39-YR annual high)
Dec  — 5-YR BEAR / 15-YR CHOP / 39-YR CHOP | Combined: CHOP ★★

Top playbook weeks:
Wk 2–3 Feb — SHORT ★★★★★ | Most extreme seasonal crash
Wk 1 Jul   — LONG ★★★★★  | Explosive July surge
Wk 1 Nov   — LONG ★★★★   | 39-YR annual high bull run
`;
