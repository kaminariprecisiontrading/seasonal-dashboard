// eurobobl.js — Euro-Bobl (EUREX) · 23-Year Seasonal (1997–2019)

const ASSET_CONFIG = {
  id:       "eurobobl",
  name:     "Euro-Bobl (EUREX)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 23-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Euro-Bobl EUREX · 23-Year Seasonal (1997–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "23-YR",
  ltSigKey: "sig23",
  ltKey:    "s23",
  ltAccent: "#6366f1",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year opens at EXTREME seasonal highs (23-YR ~98, 15-YR ~84, 5-YR ~82 — nearly all TFs at 100). All three declining from December-November peaks. Sell-into-strength.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★", note: "Opens at ~100 for 23-YR; all TFs in seasonal decline" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★", note: "Continued decline from extreme highs; sell into strength" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★",  note: "Mid-Jan; all TFs still declining toward Feb spike zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★", note: "Late-Jan; approaching February volatility spike" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sig23: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR spikes to ~80, 15-YR to ~75, 23-YR to ~70 early February. Then ALL THREE crash violently late February. Similar to Euro-Bund but all TFs participate in the spike. Do not chase.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull",  s23: "bull",  com: "CHOP",       note: "Early-Feb multi-TF spike; 5-YR to ~80, 15-YR to ~75, 23-YR to ~70" },
      { wk: "Wk 2", s5: "chop",  s15: "chop",  s23: "chop",  com: "CHOP",       note: "Spike at highs; peaking and volatile — do not chase" },
      { wk: "Wk 3", s5: "bear",  s15: "bear",  s23: "bear",  com: "SHORT ★★★",  note: "All three crash from Feb highs; sell any rally" },
      { wk: "Wk 4", s5: "bear",  s15: "bear",  s23: "bear",  com: "SHORT ★★★★", note: "Acceleration toward March trough; strong short signal" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Annual seasonal trough — all TFs crash to near 0. Very clean trough. Flip to long at the March low for the powerful Apr–Aug bull run. Best entry point of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★★", note: "Annual trough; all TFs near 0 — deepest bear reading of the year" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★",  note: "Deep trough; wait for stabilisation before flipping long" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s23: "chop", com: "CHOP",       note: "Trough base forming; early recovery signal emerging" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s23: "chop", com: "CHOP",       note: "5-YR leads recovery; scale into longs from March low" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from March trough; all TFs rising from near 0. 5-YR leads with strength. 23-YR lagging slightly but all aligned. Buy dips aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Recovery confirmed; buy off March lows" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "All TFs rising; 5-YR leading the charge" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Sustained recovery; all TFs aligned" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Month-end continuation into May" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month; 5-YR continuing to climb. All TFs aligned bullish. Hold longs aggressively — the summer bull run accelerates from here.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★", note: "5-YR leading; all TFs advancing" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★", note: "Strong seasonal tailwind; buy any dip" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★", note: "Mid-May strength; hold maximum long positions" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★",  note: "Month-end; all TFs climbing into June" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR approaches ~65-70. 15-YR and 23-YR also climbing. All TFs aligned bullish. The July spike is coming — stay long and hold through month-end.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★", note: "5-YR nearing 65–70; 23-YR and 15-YR following" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★", note: "All TFs strong; hold longs ahead of July spike" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★",  note: "Mid-June; slight pause but trend intact" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★", note: "Month-end; positioned for explosive July spike" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive bull month; 5-YR briefly spikes near 100 at early July (very sharp spike), then pulls back, then ALL three TFs surge together. Peak zone forming mid-to-late July.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★★", note: "Early July: 5-YR spikes near 100; all TFs surging — maximum conviction" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★★", note: "Explosive bull; 5-YR and 15-YR near peaks — tighten stops" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★",  note: "All three surging toward 90–100; 23-YR at ~75-85" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★",  note: "Late-July peak zone; 5-YR and 15-YR at/near 100" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "SHARP REVERSAL — all TFs fall from July/August highs. 5-YR, 15-YR, and 23-YR ALL fall sharply from ~90-100 to ~30-50. Most dramatic post-peak reversal in the European rates complex.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s23: "chop", com: "CHOP",       note: "All TFs at peak highs (~100); topping out" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★★", note: "Reversal confirmed; all three falling hard from highs" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★★", note: "Continued steep decline; sell rallies" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★",  note: "Late-Aug: all at 30–50 and declining; approaching Sep low" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-August decline deepens; all TFs at 25–50 range and falling. Sell-into-strength setup — October recovery begins but September remains weak.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★", note: "Sep opens weak; all TFs declining from August peak" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s23: "bear", com: "SHORT ★★★", note: "Continued decline; 23-YR at ~30-40" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s23: "chop", com: "CHOP",      note: "Mid-Sep stabilisation; recovery beginning" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s23: "bull", com: "LONG ★★",   note: "Late-Sep: recovery starting; early long entry for November surge" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from September lows; all TFs rebounding toward November peak. 23-YR and 15-YR leading. Buy September/October weakness for November annual high.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Oct recovery; all TFs rising from Sep lows" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "All TFs climbing; 23-YR leading recovery" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Sustained recovery; add longs into November" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Late-Oct: all TFs surging toward November annual peak" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "23-YR surges to ~100 — ANNUAL HIGH. 15-YR and 5-YR also near highs. All three TFs simultaneously at very high levels. The highest-conviction seasonal month of the year for the Bobl.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★★", note: "23-YR, 15-YR, and 5-YR all surging toward highs; maximum conviction" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★★", note: "23-YR near 100 (annual high); hold maximum longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★★",  note: "All TFs near 100; begin scaling out after peak" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★",   note: "Month-end; all TFs at extreme highs (~98/84/82) into December" },
    ],
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Extraordinary year-end — 23-YR at ~98, 15-YR at ~84, 5-YR at ~82. ALL TFs near 100. Highest sustained year-end reading in the dashboard. Hold into January seasonal reset.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★★", note: "Early Dec: 23-YR and others near 100 — remarkable year-end" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★",  note: "Mid-Dec; 23-YR at ~98 — highest seasonal reading in dashboard" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★",  note: "Year-end; all TFs at extreme highs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s23: "bull", com: "LONG ★★",  note: "Final week: 23-YR ~98, 15-YR ~84, 5-YR ~82 — Jan reset" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Euro-Bobl (EUREX) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Euro-Bobl (EUREX)
Exchange: EUREX | Seasonal History: 23-Year (1997–2019)

YEARLY ARC:
Year opens at extreme seasonal highs (23-YR ~98, 15-YR ~84, 5-YR ~82 — all TFs near 100).
All declining Jan–Mar toward annual trough.
Feb: All three TFs spike sharply (~80/75/70), then crash late Feb.
Mar: Annual trough near 0 for all.
Apr–Jul: Bull recovery; 5-YR leads. Early July: brief 5-YR spike to ~100.
Aug: SHARP REVERSAL — all three TFs fall from ~90-100 highs. Fastest peak-to-trough in complex.
Sep: Continued bear; all at 25–50 range.
Oct: Recovery begins.
Nov: 23-YR surges to ~100 (annual HIGH). All three TFs simultaneously very high.
Dec: All TFs at extreme highs (23-YR ~98, 15-YR ~84, 5-YR ~82). Highest sustained year-end reading.

MONTHLY SIGNALS:
Jan  — SHORT ★★★   | Declining from ~98 year-start; sell-into-strength
Feb  — CHOP  ★★    | Multi-TF spike then crash; avoid
Mar  — SHORT ★★★★  | Annual trough near 0; best entry
Apr  — LONG  ★★★   | Recovery; all TFs rising
May  — LONG  ★★★★  | Strong bull continuation
Jun  — LONG  ★★★★  | All TFs aligned bullish
Jul  — LONG  ★★★★★ | Explosive spike + surge; max conviction
Aug  — SHORT ★★★★  | Sharp reversal from 90-100 highs; flip short
Sep  — SHORT ★★★   | Post-August decline; sell rallies
Oct  — LONG  ★★★   | Recovery for November surge
Nov  — LONG  ★★★★★ | 23-YR annual HIGH at ~100; top trade
Dec  — LONG  ★★★   | Extreme year-end highs; carry into Jan

KEY OBSERVATIONS:
- December closes at ~98 for 23-YR — the highest year-end reading of any instrument in the dashboard
- The August reversal is simultaneous for ALL three TFs — more synchronized than Euro-Bund
- The July early-month spike (5-YR near 100) is followed by a brief pullback then the full August surge
- The short Feb-spike-then-crash is present in both Bund and Bobl — a known false signal
- Bobl has 23 years of data vs Bund's 30 — slightly less historical reliability but very consistent
`;
