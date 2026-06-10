// roughrice.js — Rough Rice (CBOT) · 34-Year Seasonal (1986–2019)

const ASSET_CONFIG = {
  id:       "roughrice",
  name:     "Rough Rice (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 34-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Rough Rice CBOT · 34-Year Seasonal (1986–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "34-YR",
  ltSigKey: "sig34",
  ltKey:    "s34",
  ltAccent: "#ca8a04",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig34: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "EXTREME VOLATILITY: 34-YR opens at ~99 (Jan 2 cursor) then crashes to near 0 on the first trading days, then surges back to ~75 by mid-January. One of the most volatile seasonal months in the entire dashboard. Avoid.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s34: "bear", com: "CHOP",      note: "Jan 3-5: 34-YR crashes from ~99 to ~5 immediately; extreme volatility" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "CHOP",      note: "34-YR spikes back to ~75 by mid-Jan; 5-YR and 15-YR recovering" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",      note: "Mid-Jan; 34-YR at ~55-65; volatile; no clean entry" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",      note: "Late-Jan; all TFs choppy; wait for cleaner signal" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sig34: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Continued extreme volatility. 34-YR in the ~40-55 range with sharp swings. 15-YR at ~55-65. 5-YR volatile. No clean directional signal. This instrument requires patience in Q1.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Feb: 34-YR at ~45-55; volatile; 15-YR at ~55-65" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Mid-Feb; 34-YR swinging between ~25 and ~55" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "Late-Feb; indecision; approaching April low" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s34: "chop", com: "CHOP", note: "End of Feb; 34-YR at ~40-50; volatility continuing" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "34-YR declining from Jan-Feb volatility zone, heading toward April low. 15-YR and 5-YR also declining. A cleaner trend emerges — sell rallies toward April seasonal trough.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "Mar: trend clearer; 34-YR declining toward ~40-50" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "All TFs declining; 34-YR at ~40-50" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★",  note: "Mid-Mar; approaching April crash zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★", note: "Late-Mar; 34-YR at ~40-50; April low approaching" },
    ],
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sig34: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 3,
    note: "34-YR CRASHES to near 0 in early April — the second annual low. Then SURGES sharply to ~50 by month-end. FLIP LONG at the April trough. 5-YR and 15-YR less extreme. Best entry point before the May-June bull run.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s34: "bear", com: "SHORT ★★★", note: "Apr Wk1: 34-YR crashes to near 0 (annual low zone); cover shorts" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",       note: "34-YR at or near trough; flip long — May surge incoming" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",   note: "Post-trough recovery; 34-YR surging from 0 toward 40-50" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",   note: "Late-Apr; 34-YR at 40-50; hold longs for May rally" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month — 34-YR surges to ~75-80. 15-YR and 5-YR rising strongly. All TFs in seasonal upswing. Hold longs for June 5-YR annual high. The May-June window is the best long window of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "May: 34-YR surging from April low; all TFs aligned bullish" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "34-YR approaching ~70-75; 5-YR surging toward June peak" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",  note: "Mid-May; 34-YR at ~70-80; 5-YR approaching annual high zone" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",  note: "Late-May; all three surging; 5-YR near 80-90 — June peak imminent" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "5-YR spikes to ANNUAL HIGH (~80-100) early June — then ALL THREE TFs CRASH. 34-YR crashes from ~75 to ~25-30. 5-YR crashes from ~100 to ~25-30. FLIP SHORT at June peak.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",   note: "Early Jun: 5-YR at annual high (~80-100); 34-YR at ~75; top is forming" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",        note: "Peak zone; topping — reduce longs aggressively" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",  note: "CRASH confirmed; all TFs falling from June highs; flip short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",  note: "Late-Jun: 34-YR at 25-30; 5-YR crashing; hold shorts into July" },
    ],
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "ANNUAL LOW APPROACH — 34-YR crashing from June high to annual low zone. 5-YR and 15-YR also crashing. Maximum short conviction. Cover at July/August trough and flip for the Q4 surge.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★★", note: "Jul: all TFs crashing; 34-YR heading to annual low ~5-10" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★★", note: "34-YR at ~15-25 and declining; maximum short conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★",  note: "Mid-Jul; all TFs near lows; approaching trough" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★",   note: "Late-Jul; 34-YR near annual low; cover shorts ahead of August" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig34: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "34-YR ANNUAL LOW (~5-10). 15-YR also very low. 5-YR at ~25-30. COVER ALL SHORTS. This is the seasonal floor — buy the August/September recovery for the Q4 surge to annual highs.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s34: "bear", com: "SHORT ★★★★", note: "Aug: 34-YR at annual low ~5-10; 5-YR and 15-YR very low" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s34: "chop", com: "CHOP",        note: "Annual trough forming; cover all shorts; flip long" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "Recovery beginning; 34-YR rising from annual low" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",    note: "Late-Aug; 34-YR at ~20-30; recovery building for Q4" },
    ],
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery accelerating — 34-YR climbing from annual low toward ~25-45. 15-YR and 5-YR also recovering. Add to longs for the powerful Q4 rally.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★", note: "Sep: 34-YR at 25-35 and rising; all TFs recovering" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★", note: "Recovery gaining pace; 34-YR at 30-45" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★", note: "Mid-Sep; 15-YR and 5-YR leading higher; 34-YR following" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★", note: "Late-Sep; all TFs aligned; Q4 surge building" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong seasonal recovery — 34-YR at ~30-50; 15-YR at ~55-70; 5-YR at ~65-80. All TFs aligned bullish heading into the year-end annual high. Maximum long position.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "Oct: 34-YR at 35-50; 15-YR at 55-70; surging" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "All TFs ascending; 15-YR and 5-YR leading toward November highs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",  note: "Mid-Oct; sustained recovery; hold maximum longs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "Late-Oct; all TFs surging toward November-December annual highs" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong seasonal bull — 34-YR at ~65-80; 15-YR at ~80-90; 5-YR at ~80-85. All TFs at high seasonal readings. Hold longs for December annual high.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "Nov: 34-YR at 65-75; 15-YR at 80-85; all surging" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★", note: "Strong momentum; approaching December annual high" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",  note: "Mid-Nov; 34-YR at ~75-80; tighten stops" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★",  note: "Late-Nov; all TFs near highs; final run into December" },
    ],
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig34: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "ANNUAL HIGH — 34-YR surges to ~95-100 (cursor: 98.96). 15-YR at ~100. 5-YR at ~70-75. ALL THREE TFs at annual seasonal highs simultaneously. The December high sets up the January crash — hold through December, then exit/flip at January 2-3 as the seasonal crashes.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★★", note: "Dec: 34-YR surging toward 95-100 (annual high); maximum conviction" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★★", note: "34-YR at ~95; 15-YR at ~100 — annual highs; hold full position" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",  note: "Mid-Dec; 34-YR approaching 99; tighten stops — Jan crash imminent" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s34: "bull", com: "LONG ★★★★",  note: "Year-end: 34-YR ~99, 15-YR ~100, 5-YR ~71 — EXIT before Jan 3 crash" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Rough Rice (CBOT) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Rough Rice (CBOT)
Exchange: CBOT | Seasonal History: 34-Year (1986–2019)

YEARLY ARC:
UNIQUE PATTERN — a "double crash, double surge" instrument with extreme intra-month volatility.
December/Jan 2 cursor: 34-YR at ANNUAL HIGH ~99, 15-YR at ~100, 5-YR at ~71.
January: Immediately crashes from ~99 to ~5 (Jan 3-5), then recovers to ~75 by mid-Jan. Extreme volatility.
February-March: Volatile ranging at 40-65 for 34-YR. No clean signal.
April: 34-YR CRASHES to near 0 again (second annual low), then reverses — best long entry.
May-June: Bull surge. 5-YR hits ANNUAL HIGH (~80-100) in early June. 34-YR at ~75-80.
Late June/July: ALL TFs CRASH from June highs. 34-YR annual low at ~5-10 in August.
August: 34-YR at absolute annual low (~5-10). Cover shorts, flip long.
Sep-Oct: Recovery. 34-YR climbs from 5 to 30-50.
November: Strong recovery. 34-YR at 65-80; 15-YR at 80-90; 5-YR at 80-85.
December: SURGE TO ANNUAL HIGHS. 34-YR ~99, 15-YR ~100, 5-YR ~71. The cycle repeats.

MONTHLY SIGNALS:
Jan — CHOP  ★★    | Crashes from 99 to 5 then recovers to 75; extreme volatility; avoid
Feb — CHOP  ★★    | Volatile; no clean signal; 34-YR at 40-55 range
Mar — SHORT ★★★   | Trending lower from Jan-Feb; heading toward April low
Apr — FLIP  ★★★   | 34-YR crashes to near 0; flip long at April trough
May — LONG  ★★★★  | Strong surge; 34-YR at 75-80; all TFs aligned
Jun — FLIP  ★★★★  | 5-YR annual high (~100); then all crash; flip short at peak
Jul — SHORT ★★★★★ | All TFs crashing; 34-YR heading to annual low
Aug — SHORT ★★★★  | 34-YR at annual low (~5-10); cover; flip long
Sep — LONG  ★★★   | Recovery; all TFs rising
Oct — LONG  ★★★★  | Strong recovery; 34-YR at 35-50; 15-YR at 55-70
Nov — LONG  ★★★★  | Near-annual highs; 34-YR at 65-80
Dec — LONG  ★★★★★ | ANNUAL HIGH: 34-YR ~99, 15-YR ~100; exit before Jan 3

KEY OBSERVATIONS:
- The January crash (99 → 5 in 1-3 trading days) is one of the sharpest moves in the dashboard
- Exit December longs BEFORE January 3 — the crash is immediate
- April low (~0) → May surge is the cleanest entry point of the year
- December annual high (~99/100) is the most extreme year-end reading for any grain complex asset
- 5-YR June annual high (~80-100) and August low (near 0) provide clean bookends for summer trade
`;
