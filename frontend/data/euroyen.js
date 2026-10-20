// euroyen.js — 3-Mth Euro-Yen (SGX) · 31-Year Seasonal (1989–2019)

const ASSET_CONFIG = {
  id:       "euroyen",
  name:     "3-Mth Euro-Yen (SGX)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 31-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Mth Euro-Yen SGX · 31-Year Seasonal (1989–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "31-YR",
  ltSigKey: "sig31",
  ltKey:    "s31",
  ltAccent: "#0e7490",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig31: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "31-YR opens at extreme lows (~1-5); 15-YR at ~28-33; 5-YR near 0. Worst seasonal reading of the year for all TFs. Seasonal collapse from year-end December crash. Avoid longs — the Feb explosion is coming but not yet.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "Year opens at seasonal floor; 31-YR near 1-5, 5-YR near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "Continued base; all TFs at depressed lows" },
      { wk: "Wk 3", s5: "bear", s15: "chop", s31: "chop", com: "CHOP",      note: "Very late-Jan: 15-YR begins to stir; watch for Feb spike signal" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",      note: "Pre-spike zone; momentum building — do not short here" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "bull", sig31: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "EXPLOSIVE ANNUAL HIGH — 31-YR rockets from ~1 to ~100 (annual high!) early February. 15-YR spikes to ~80+. This is the single most dramatic seasonal spike in the dashboard. 5-YR barely participates (gray). Then late-Feb 31-YR falls to ~55-65. A brief but powerful long-only window.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★★★", note: "LAUNCH: 31-YR spikes from 1 → 100; 15-YR to 80+. Maximum urgency — buy immediately" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★★",  note: "31-YR at or near 100 (annual high); tighten stops aggressively" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",        note: "31-YR falling from 100 to 55-65; spike peak passed — reduce or close longs" },
      { wk: "Wk 4", s5: "bear", s15: "chop", s31: "chop", com: "CHOP",        note: "Late-Feb: 31-YR stabilising at 55-65; 5-YR declining; avoid new longs" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bull", sig31: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "31-YR moderates at ~65-80 after the Feb spike. 15-YR stable at ~75-85. 5-YR declining further. The 31-YR is in an elevated range — not as dramatic as Feb but still constructive. Hold moderate longs.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "31-YR at ~65-80; 15-YR at ~75-85; 5-YR weakening" },
      { wk: "Wk 2", s5: "bear", s15: "bull", s31: "bull", com: "LONG ★★★", note: "Two TFs constructive; 5-YR drag — hold longs on 31-YR/15-YR basis" },
      { wk: "Wk 3", s5: "bear", s15: "bull", s31: "bull", com: "LONG ★★",  note: "31-YR stable; 5-YR continues lower; slight divergence" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "Late-Mar: holding elevated range; 31-YR approaching April plateau" },
    ],
  },
  {
    month: "April", sig5: "chop", sig15: "bull", sig31: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "31-YR stable at ~75-85; approaching second peak. 15-YR at ~75-85 aligned. 5-YR still weak. Maintain long bias on 31-YR — the May run up is building.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "31-YR climbing toward 85; 15-YR aligned" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "Two TFs bullish; 5-YR slowly recovering" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "Mid-Apr; 31-YR at ~80; hold longs" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★",  note: "Late-Apr; stable plateau — watch for May surge" },
    ],
  },
  {
    month: "May", sig5: "chop", sig15: "bull", sig31: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "31-YR approaches ~85-90 — building toward the summer second high. 15-YR at similar levels. 5-YR begins to recover from prior weakness. All TFs converging before the June crash.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★★", note: "31-YR surging toward 85-90; 15-YR aligned" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s31: "bull", com: "LONG ★★★★", note: "All TFs now aligned bullish; strong seasonal convergence" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s31: "bull", com: "LONG ★★★★", note: "31-YR near 85-90; tighten stops — June crash incoming" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",       note: "Late-May: topping signals forming; begin reducing longs" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig31: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "SHARP CRASH — 31-YR drops from ~85-90 to ~60. All TFs decline simultaneously. Similar in character to the post-Feb pullback but less extreme. Sell May highs for this June correction.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★", note: "Crash begins; 31-YR falling from 85-90 highs" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★", note: "All TFs declining sharply; sell into any rally" },
      { wk: "Wk 3", s5: "bear", s15: "chop", s31: "chop", com: "CHOP",        note: "Mid-Jun: 31-YR at ~60; 5-YR lagging; stabilising" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s31: "bull", com: "CHOP",        note: "Late-Jun: 31-YR bottoming; July recovery building" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sig31: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "31-YR recovers strongly from June crash, returning to ~85-90 (second summer peak). This mirrors the earlier Feb-to-Mar pattern. 15-YR aligned. 5-YR still lagging. Strong long setup.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★★", note: "July recovery; 31-YR climbing from June lows" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★★", note: "31-YR back to ~75-80; momentum strong" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★★", note: "31-YR at ~85-90 — second peak approaching" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★",  note: "Late-Jul: at or near second seasonal peak; tighten stops" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig31: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "SECOND CRASH — 31-YR falls sharply from July highs. All TFs declining. Similar pattern to June but post a longer-lasting peak. Sep decline continues. Flip short at August open.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",       note: "Topping out from July peak; indecision" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★", note: "Reversal confirmed; all TFs falling hard" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★", note: "Continued decline; 31-YR falling toward Sep low" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★",  note: "Late-Aug: 31-YR at 55-65; approaching September trough" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig31: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "31-YR at ~55-65 and declining further. Sharp fall to ~55 continues. All TFs weak. The October/November partial recovery begins late September.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "Sep opens weak; 31-YR at ~55-65 and falling" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "Continued decline; 31-YR at ~50-60" },
      { wk: "Wk 3", s5: "bear", s15: "chop", s31: "chop", com: "CHOP",       note: "Stabilising; base forming for November brief recovery" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",       note: "Late-Sep: 31-YR bottoming; watch for Oct direction" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig31: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "October continues the decline. 31-YR trending lower toward December crash zone. 15-YR and 5-YR both weak. Only a brief November uptick interrupts the yearend collapse.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "Oct decline; 31-YR continuing lower" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "All TFs weakening; trend intact" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★",  note: "Mid-Oct; slight stabilisation before Nov bounce" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",       note: "Late-Oct: pre-November minor recovery building" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig31: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "31-YR briefly recovers to ~80 — a short-lived long setup before the December year-end collapse. 15-YR participates. 5-YR barely moves. Tactical long only — must exit before December.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "31-YR recovering to ~70-75; 15-YR following" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s31: "bull", com: "LONG ★★★", note: "31-YR approaches ~80 — brief November high" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s31: "chop", com: "CHOP",      note: "Nov peak zone; begin exiting longs — Dec crash imminent" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★", note: "Late-Nov: SHARP COLLAPSE beginning; all TFs turn hard bear" },
    ],
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sig31: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "CATASTROPHIC YEAR-END COLLAPSE — 31-YR crashes from ~80 to ~40; 15-YR to ~13; 5-YR to ~7. The most dramatic year-end seasonal crash in the entire dashboard. This resets to January lows. SHORT aggressively from late November through December.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★★", note: "Year-end crash accelerating; 31-YR falling hard from ~80" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★★", note: "31-YR at ~60-65; 15-YR at ~30; maximum short conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★★", note: "Crash deepening; 31-YR approaching ~40 year-end floor" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s31: "bear", com: "SHORT ★★★★★", note: "Year closes: 31-YR ~40, 15-YR ~13, 5-YR ~7 — Jan reset awaits" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 3-Mth Euro-Yen (SGX) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 3-Mth Euro-Yen (SGX)
Exchange: SGX (formerly SIMEX) | Seasonal History: 31-Year (1989–2019)

YEARLY ARC:
Year opens at absolute seasonal FLOOR: 31-YR ~1-5, 15-YR ~28-33, 5-YR near 0.
February: EXPLOSIVE spike — 31-YR rockets from ~1 to ~100 (ANNUAL HIGH). Most dramatic seasonal spike in the dashboard.
Post-Feb: 31-YR falls to ~55-65; stabilises March-April at ~65-80.
May: 31-YR approaches ~85-90 (second seasonal high). All TFs briefly aligned.
June: CRASH — 31-YR falls to ~60. 15-YR and 5-YR also decline.
July: Recovery — 31-YR back to ~85-90 (matching May highs).
August: Second crash — all TFs decline from July highs.
September-October: Continued decline.
November: Brief recovery to ~80 — tactical long only.
Late November/December: CATASTROPHIC year-end collapse — 31-YR ~40, 15-YR ~13, 5-YR ~7.
Year resets to same floor it started from.

MONTHLY SIGNALS:
Jan — SHORT ★★★   | Seasonal floor; 31-YR ~1-5; avoid
Feb — LONG  ★★★★★ | 31-YR rockets to 100 (ANNUAL HIGH); explosive buy
Mar — LONG  ★★★   | 31-YR stabilises at 65-80 after spike
Apr — LONG  ★★★   | 31-YR at ~75-85; two TFs bullish
May — LONG  ★★★★  | 31-YR to ~85-90; second high building
Jun — SHORT ★★★★  | Crash from May highs; all TFs down
Jul — LONG  ★★★★  | Recovery to second peak ~85-90
Aug — SHORT ★★★★  | Second post-peak crash
Sep — SHORT ★★★   | Continued decline; 31-YR at 55-65
Oct — SHORT ★★★   | Further decline; all weak
Nov — LONG  ★★★   | Brief 31-YR recovery to ~80; tactical only
Dec — SHORT ★★★★★ | CATASTROPHIC crash; 31-YR: 80→40; 15-YR: →13; 5-YR: →7

KEY OBSERVATIONS:
- February is the SINGLE MOST EXPLOSIVE seasonal spike in the entire dashboard (~99 points in one month for the 31-YR)
- 5-YR line barely participates in ANY of the rallies — only the 31-YR and 15-YR are tradeable
- The December collapse is the most severe year-end bear signal in the dashboard
- Two distinct seasonal peak-crash cycles: Feb spike + June crash, then July peak + August crash
- November recovery is deceptive — must exit before late-November hard turn
- January lows = December lows: the year literally resets to the same seasonal floor
`;
