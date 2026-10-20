// robusta.js — London Coffee Robusta (LCE) · 29-Year Seasonal (1991–2019)

const ASSET_CONFIG = {
  id:       "robusta",
  name:     "Robusta Coffee (LCE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 29-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Robusta Coffee LCE · 29-Year Seasonal (1991–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "29-YR",
  ltSigKey: "sig29",
  ltKey:    "s29",
  ltAccent: "#374151",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig29: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs rising from year-start lows. 29-YR starts at ~45-55 and surges to ~75-80 by late January. 5-YR at ~50-60 and rising. 15-YR at ~50-60 and rising. Hold longs for the February annual high.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★★", note: "Jan: 29-YR starting ~45-55 and surging; 5-YR and 15-YR also rising" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★★", note: "All TFs rising strongly; 29-YR at ~60-70" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★",  note: "Mid-Jan; 29-YR at ~70-75; approaching Feb peak" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★",  note: "Late-Jan; 29-YR at ~75-80; tighten stops — Feb annual high imminent" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 5,
    note: "29-YR hits ANNUAL HIGH (~95-100) in early February — then declines. 5-YR peaks at ~85-90. 15-YR at ~75-80. ALL TFs topping simultaneously. FLIP SHORT at February peak. This is the single most important timing signal of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★★★",  note: "Feb Wk1: 29-YR at ANNUAL HIGH ~95-100; 5-YR at ~85-90; top forming" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s29: "chop", com: "CHOP",          note: "Peak zone; all TFs topping; exit all longs; flip short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★★★",   note: "Post-peak decline confirmed; 29-YR from ~95 to ~70-75; hold shorts" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★★",    note: "Late-Feb; 29-YR at ~65-75; March decline continuing" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-February-high decline. 29-YR at ~65-75 and declining. 5-YR declining from ~70 to ~55. 15-YR following. All TFs in downtrend toward the April trough. Sell rallies.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "Mar: 29-YR at ~65-70; post-Feb decline; all TFs falling" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "29-YR declining to ~60-65; 5-YR and 15-YR following" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",  note: "Mid-Mar; 29-YR at ~55-60; heading toward April low" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "Late-Mar; 29-YR at ~45-50; approaching April trough" },
    ],
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "29-YR declines further to ~30-40. All three TFs continue lower. The downtrend is intact. Cover into May secondary peak — do not flip yet.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "Apr: 29-YR at ~40-45; all TFs declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "29-YR at ~35-40; 5-YR and 15-YR also falling" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",  note: "Mid-Apr; 29-YR at ~30-35; approaching May secondary peak" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s29: "chop", com: "CHOP",       note: "Late-Apr; bottoming temporarily; May secondary spike ahead" },
    ],
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sig29: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "29-YR spikes to SECONDARY HIGH at ~70-75 (not the annual high). 5-YR and 15-YR less extreme. This is a SHORT ENTRY opportunity — the secondary high is a relief rally before the final crash to October annual low.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★",    note: "May: 29-YR spiking to secondary high ~70-75; ride up carefully" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★",    note: "29-YR at ~70-75 secondary high; exit longs — this is a short entry" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s29: "chop", com: "CHOP",        note: "Secondary peak forming; 29-YR topping; flip short" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",    note: "Late-May; 29-YR declining from secondary high; hold shorts" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "15-YR spikes to ANNUAL HIGH (~100) in early June — then IMMEDIATELY CRASHES. 29-YR and 5-YR also declining. This 15-YR spike is the most extreme single-TF reading in the entire Robusta dataset. FLIP SHORT at June 15-YR peak.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s29: "chop", com: "CHOP",         note: "Jun Wk1: 15-YR ANNUAL HIGH ~100; 29-YR declining; extreme TF divergence" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s29: "bear", com: "SHORT ★★★★",   note: "15-YR CRASHES from ~100; all TFs now declining; flip short" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★★",   note: "Post-15-YR crash; all TFs declining toward August-October lows" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★",    note: "Late-Jun; 29-YR at ~25-30; decline accelerating" },
    ],
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All TFs declining toward annual lows. 29-YR at ~20-25 and falling. 5-YR and 15-YR also crashing post-June-15-YR-peak. Hold shorts toward the October annual low.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★★", note: "Jul: 29-YR at ~20-25; all TFs declining post-June-crash" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★★", note: "29-YR declining to ~15-20; deep bear trend intact" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★",  note: "Mid-Jul; 29-YR at ~15-20; October annual low is the target" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★",  note: "Late-Jul; all TFs declining; September/October final low approaching" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining — 29-YR at ~20-25, then declining further. 5-YR and 15-YR also near annual lows. Not the final trough (October is lower), but maintain shorts.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "Aug: 29-YR at ~20-25 and falling; hold shorts" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "All TFs declining; 29-YR heading toward ~20" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",  note: "Mid-Aug; 29-YR at ~20; approaching October annual low" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",  note: "Late-Aug; 29-YR declining; September/October trough incoming" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig29: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "29-YR at ~20-25 and still declining toward October annual low. 5-YR and 15-YR also declining. The final leg of the bear trend approaches October near-0 trough.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "Sep: 29-YR at ~20; approaching October annual low near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★", note: "All TFs declining; October low is imminent" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",  note: "Mid-Sep; 29-YR at ~15-20; prepare to cover all shorts at October trough" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★",  note: "Late-Sep; 29-YR near 10-15; October absolute low incoming" },
    ],
  },
  {
    month: "October", sig5: "chop", sig15: "bull", sig29: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 5,
    note: "29-YR ANNUAL LOW — near 0-5! This is the absolute bottom of the year for Robusta. 15-YR also very low but beginning recovery. COVER ALL SHORTS, FLIP LONG at October trough. The November-January bull run is the recovery target.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s29: "bear", com: "SHORT ★★★",  note: "Oct Wk1: 29-YR at annual low near 0-5; cover all shorts" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s29: "chop", com: "CHOP",        note: "Annual trough zone; 29-YR at 0-5; flip long aggressively" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★★★",  note: "Recovery begins; 29-YR surging from annual low toward November" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★★★",  note: "Late-Oct; 29-YR at ~15-25; strong recovery building for November" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig29: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from October annual low. 29-YR at ~25-55. 15-YR at ~25-35. 5-YR recovering. Partial recovery — December ends flat (all TFs low). This is an intermediate recovery, not a return to February highs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★", note: "Nov: 29-YR at ~25-35 and rising; recovery from October trough" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★", note: "29-YR at ~35-45; 15-YR and 5-YR recovering" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s29: "bull", com: "LONG ★★★", note: "Mid-Nov; 29-YR at ~45-55; approaching December level" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s29: "chop", com: "CHOP",      note: "Late-Nov; recovery slowing; December ends flat-low; January surge ahead" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig29: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Year-end cursor: 29-YR at ~31.43, 15-YR at ~26.51, 5-YR at ~17. ALL TFs are LOW — the year ends at or near trough levels. The January surge from these lows is the cycle restart. Hold longs tightly into January.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s29: "chop", com: "CHOP", note: "Dec: 29-YR at ~31; 15-YR at ~27; 5-YR at ~17; all low" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s29: "chop", com: "CHOP", note: "Mid-Dec; all TFs near lows; January surge is the next cycle event" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s29: "chop", com: "CHOP", note: "Year-end positioning; all TFs low; be ready for January lift" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s29: "chop", com: "CHOP", note: "Year-end: 29-YR ~31, 15-YR ~27, 5-YR ~17 — Jan bull run begins" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Robusta Coffee (LCE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Robusta Coffee (LCE)
Exchange: LCE (London Commodity Exchange) | Seasonal History: 29-Year (1991–2019)

YEARLY ARC:
Robusta Coffee has one of the most asymmetric seasonal arcs in the dashboard: the year ENDS at lows
(29-YR ~31, 15-YR ~27, 5-YR ~17) and BEGINS with a powerful January-February surge.

January: All TFs rising from lows. 29-YR surges from ~45-55 to ~75-80 by late January.
February: 29-YR ANNUAL HIGH (~95-100). 5-YR peaks at ~85-90. 15-YR at ~75-80. ALL TFs top simultaneously.
FLIP SHORT at February peak — this is the year's most important timing signal.
March-May: Declining. 29-YR from ~95 to ~35-40. May secondary peak (~70-75) for 29-YR.
June: 15-YR spikes to ANNUAL HIGH (~100) — then immediately crashes. 29-YR declining.
July-September: All TFs declining toward October annual low. 29-YR at ~20-25 declining to near 0.
October: 29-YR ANNUAL LOW (near 0-5). FLIP LONG aggressively at October trough.
November: Partial recovery. 29-YR at ~25-55; 15-YR at ~25-35.
December: All TFs low (29-YR ~31, 15-YR ~27, 5-YR ~17). The January cycle restarts.

MONTHLY SIGNALS:
Jan — LONG  ★★★★  | All TFs surging from lows; ride the January bull run to February peak
Feb — FLIP  ★★★★★ | 29-YR annual high (~95-100); flip short immediately at February peak
Mar — SHORT ★★★   | Post-Feb decline; 29-YR at 65-75 declining
Apr — SHORT ★★★   | Continued decline; 29-YR at 30-40
May — CHOP  ★★    | 29-YR secondary peak (~70-75); brief spike, then short entry
Jun — FLIP  ★★★★  | 15-YR ANNUAL HIGH (~100) early June; flip short on the crash
Jul — SHORT ★★★★  | All TFs declining post-June; heading to October annual low
Aug — SHORT ★★★   | All TFs declining; 29-YR at ~20-25
Sep — SHORT ★★★   | Final leg down; 29-YR near 10-15; October low imminent
Oct — FLIP  ★★★★★ | 29-YR ANNUAL LOW (near 0-5); flip long — the year's best entry
Nov — LONG  ★★★   | Recovery from October; 29-YR at 25-55
Dec — CHOP  ★★    | All TFs low (29-YR ~31, 15-YR ~27, 5-YR ~17); January surge ahead

KEY OBSERVATIONS:
- Year ENDS at trough levels — opposite of most commodities (unusual and tradable)
- February 29-YR annual high (~95-100) → October annual low (near 0) = the full seasonal arc
- June 15-YR annual high (~100) is the most extreme single-TF reading in the Robusta data
- October near-0 is the single cleanest annual long entry in the LCE complex
- May secondary peak (~70-75 for 29-YR) is a short setup, not a long
- Year-end cursor: 29-YR at 31.43, 15-YR at 26.51, 5-YR at 17.0
`;
