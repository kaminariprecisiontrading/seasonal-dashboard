// cocoa.js — Cocoa (ICE/NYBOT) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "cocoa",
  name:     "Cocoa (ICE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Cocoa ICE (NYBOT) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#92400e",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "EXTREME TF DIVERGENCE: 40-YR opens at ~55 then spikes to ~78-80 mid-Jan. 15-YR starts near 0 and surges dramatically to ~80 during January. 5-YR at ~40-55. No clean directional signal across TFs.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s40: "chop", com: "CHOP",       note: "Jan 1: 40-YR ~55, 15-YR at near 0 starting to surge, 5-YR ~40-55" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s40: "bull", com: "CHOP",       note: "15-YR surging from near-0 to ~50; 40-YR rising toward 75-80" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s40: "bull", com: "CHOP",       note: "Mid-Jan: 40-YR peaks ~78-80; 15-YR approaching 70-80" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",   note: "Late-Jan: both 40-YR and 15-YR topping; begin reducing longs" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "40-YR peaks at ~80-83 early Feb then declines. 15-YR declining from Jan high. 5-YR remains weak. All TFs declining through Feb-April toward the May-June 40-YR trough.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★",  note: "40-YR at ~80-83 (peak); 15-YR and 5-YR declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "40-YR reversing from Feb high; all TFs declining" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "All three falling; 40-YR at 70-75 and declining" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Late-Feb; all declining toward March-April lows" },
    ],
  },
  {
    month: "March", sig5: "chop", sig15: "chop", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "40-YR continuing decline from Feb peak (at ~70-75 and falling). 15-YR choppy at ~25-35. 5-YR also choppy. 40-YR is the clearest bearish signal — stay short.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "bear", com: "SHORT ★★★", note: "40-YR declining from 70-75; 15-YR and 5-YR choppy" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bear", com: "SHORT ★★",  note: "40-YR at ~65-70; others flat" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bear", com: "SHORT ★★",  note: "Mid-Mar; 40-YR at ~60-65 and declining" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "bear", com: "SHORT ★★★", note: "Late-Mar; 40-YR approaching 55-60; 15-YR/5-YR still weak" },
    ],
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "40-YR declining toward the May-June crash point (~0). 15-YR and 5-YR starting to recover slightly but 40-YR leads lower. The TF divergence intensifying — 40-YR heading to 0, shorter TFs heading to 100.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "bear", com: "SHORT ★★★", note: "Apr: 40-YR at 45-55 and declining; 5-YR/15-YR slightly recovering" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s40: "bear", com: "CHOP",       note: "TF divergence: 15-YR recovering while 40-YR still falling" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bear", com: "CHOP",       note: "Mid-Apr; 5-YR and 15-YR rising; 40-YR still declining" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bear", com: "CHOP",       note: "Late-Apr; divergence at peak — 40-YR heading to 0; 5-YR/15-YR to 100" },
    ],
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "EXTREME DIVERGENCE PEAK: 40-YR crashes to near 0 (annual LOW!) in late May while 5-YR and 15-YR spike to near 100 (annual HIGH!). Inverse signals across TFs. Do not fight either direction — wait for June resolution.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bear", com: "CHOP",       note: "5-YR/15-YR surging toward 85-100; 40-YR crashing toward 0" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bear", com: "CHOP",       note: "5-YR and 15-YR near 95-100 (annual highs!); 40-YR near 0" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "5-YR/15-YR peak passed; all three now declining — brief window" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late May: 5-YR/15-YR falling from highs; 40-YR at near-zero trough" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "40-YR ANNUAL TROUGH at near 0 then EXPLOSIVE RECOVERY. 40-YR surges from ~0 to ~50-65 by late June. 15-YR and 5-YR declining from May highs. BUY the 40-YR recovery aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Jun 1: 40-YR at trough (~0-5); flip long immediately" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★★★",  note: "40-YR surging from trough; 15-YR and 5-YR following" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "40-YR at 30-50; all three TFs now recovering" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Late-Jun: 40-YR at 40-60; massive recovery underway" },
    ],
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "40-YR continues surge toward August ANNUAL HIGH (~85-95). 15-YR also bullish. 5-YR more mixed. Best risk/reward is long 40-YR — hold through August peak.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Jul: 40-YR at 45-65 and surging toward August peak" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "All three TFs bullish; 40-YR at 55-70" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Mid-Jul; 40-YR at ~65-75; approaching August annual high" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Late-Jul; 40-YR at ~70-80; near August annual peak" },
    ],
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "40-YR peaks at ANNUAL HIGH ~85-95 (and hits 100 in late August-September). 15-YR and 5-YR begin to DECLINE from their own earlier highs. FLIP POINT — exit 40-YR longs at the August peak, watch for October reversal.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★★",  note: "40-YR at ~80-90; approaching annual high; tighten stops" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bull", com: "CHOP",       note: "40-YR near peak ~85-95; 15-YR and 5-YR turning lower" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★",  note: "40-YR topping; 15-YR and 5-YR firmly bear — reduce longs" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Late-Aug: all TFs now declining; September crash incoming" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "40-YR at annual HIGH then SHARP CRASH — falls from ~95-100 to ~30-40. 15-YR and 5-YR both declining. The most powerful post-peak crash month. Sell September rallies aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Sep: 40-YR crashing from 95-100; all TFs declining sharply" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "40-YR falls to 60-70; 15-YR and 5-YR also dropping" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Mid-Sep; 40-YR at 40-55 and declining; sell rallies" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",        note: "Late-Sep; base forming at 30-40; October recovery begins" },
    ],
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Post-September stabilisation — 40-YR at ~30-40, recovering slightly. 15-YR and 5-YR also choppy. No clean directional signal. The year-end recovery builds slowly through November.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Oct: 40-YR at 30-40; recovering from Sep crash" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Choppy recovery; no clear direction" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Mid-Oct; indecision; wait for November recovery signal" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★",   note: "Late-Oct; all TFs starting to recover; early long entry" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Year-end recovery — all TFs recovering to ~50-70. 40-YR at ~50-65, 15-YR at ~55-65, 5-YR at ~55-70. The December close (~71/71/41) is the target.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Nov: all TFs recovering; 40-YR at 45-55 and rising" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Recovery gaining pace; 40-YR at 55-65" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Mid-Nov; all TFs at 55-70; continued recovery" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Late-Nov; approaching December close levels" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "Year-end plateau — 40-YR at ~71 (cursor), 15-YR at ~72, 5-YR at ~41. Recovery complete. The January cycle repeats — next month will bring the Jan spike then Feb decline.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Early Dec; 40-YR at ~68-71; recovery plateau" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Mid-Dec; 40-YR at ~71, 15-YR at ~72" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",     note: "Late Dec; 5-YR at ~41 (cursor); Jan divergence about to begin" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",     note: "Year-end; carry reduced longs; Jan spike-and-crash pattern reloading" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Cocoa (ICE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Cocoa (ICE/NYBOT)
Exchange: ICE (formerly NYBOT) | Seasonal History: 40-Year (1980–2019)

YEARLY ARC:
UNIQUE PATTERN — extreme TF divergences, unlike any other instrument.
January: 40-YR spikes from ~55 to ~80; 15-YR surges from near-0 to ~80 during the month. Extreme divergence.
February: 40-YR peaks ~80-83, then declines. All TFs declining through March-April.
May: MOST EXTREME DIVERGENCE IN DASHBOARD — 40-YR crashes to NEAR 0 while 5-YR and 15-YR spike to ~100 simultaneously.
June: 40-YR at trough (0) then EXPLOSIVE recovery; 15-YR and 5-YR falling from May highs.
July: 40-YR surging strongly toward August annual high.
August-September: 40-YR peaks at ANNUAL HIGH ~95-100 (September); then sharp reversal.
October: Post-crash stabilisation.
November: Year-end recovery — all TFs at ~50-70.
December: Close at ~71/72/41 (40-YR/15-YR/5-YR).

MONTHLY SIGNALS:
Jan — CHOP  ★★    | 40-YR spikes; 15-YR surges from 0; extreme divergence; no clean signal
Feb — SHORT ★★★   | 40-YR declining from Feb peak; all TFs weakening
Mar — SHORT ★★★   | 40-YR continuing lower; 15-YR/5-YR choppy
Apr — SHORT ★★★   | 40-YR toward 45-55; shorter TFs recovering (divergence widening)
May — CHOP  ★★    | 40-YR crashes to 0; 5-YR/15-YR at 100 simultaneously; inverse
Jun — LONG  ★★★★  | 40-YR at trough then explosive recovery; buy the 40-YR
Jul — LONG  ★★★★  | 40-YR surging toward annual high; all TFs aligned
Aug — FLIP  ★★★★  | 40-YR at annual high ~85-95; 5-YR/15-YR declining; flip point
Sep — SHORT ★★★★  | 40-YR crashes from 95-100 peak; sell September
Oct — CHOP  ★★    | Post-crash stabilisation; no clear signal
Nov — LONG  ★★★   | Year-end recovery; all TFs at 55-70
Dec — LONG  ★★    | Year-end plateau at 71/72/41

KEY OBSERVATIONS:
- The May divergence (40-YR at 0, 5-YR/15-YR at 100) is the most extreme TF split in the entire dashboard
- The 40-YR is the PRIMARY tradeable timeframe; it provides the clearest signals (June buy, August sell)
- The June recovery from near-0 is explosive — the best long entry of the year for the 40-YR
- The January 15-YR surge from near-0 to ~80 in one month is a recurring quirk — do not fade it
- September post-peak crash is clean and powerful — sell the 40-YR from August highs
- This instrument requires TF-specific analysis; combined signals are often misleading
`;
