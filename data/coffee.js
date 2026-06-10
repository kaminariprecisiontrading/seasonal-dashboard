// coffee.js — Coffee "C" (ICE/NYBOT) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "coffee",
  name:     'Coffee "C" (ICE)',
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: 'Moore Research Center © 2020 · Coffee "C" ICE (NYBOT) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.',
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#78350f",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "5-YR at annual HIGH zone (~90-100 early Jan), 40-YR at ~70-85, 15-YR at ~75-80. All three declining from year-start peaks. Sell-into-strength — the Feb crash is coming.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★", note: "5-YR at 90-100 (annual high zone); 40-YR at 70-85; all declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "All TFs falling; 5-YR crashing from high, 40-YR declining from 75-85" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Mid-Jan; all declining; approaching Feb spike zone" },
      { wk: "Wk 4", s5: "bear", s15: "chop", s40: "chop", com: "CHOP",      note: "Late-Jan: 15-YR and 40-YR building toward Feb peak — do not short fresh" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "15-YR peaks at ~95-100 mid-Feb (annual HIGH for 15-YR). 40-YR also peaks at ~88-90 mid-Feb. Then BOTH CRASH sharply. 5-YR already weak. Sell the Feb peak aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s40: "bull", com: "CHOP",        note: "Early Feb: 15-YR and 40-YR rising toward peak; do not chase longs" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",        note: "Mid-Feb: 15-YR peaks ~95-100, 40-YR peaks ~88-90 — top is in" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Post-peak crash confirmed; all TFs falling hard from Feb highs" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Acceleration lower; hold shorts heading into March" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All TFs declining from February peak. 40-YR at ~55-65, 15-YR at ~35-50, 5-YR at ~35-50. The June trough is the seasonal target — hold shorts.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Post-Feb decline; all TFs trending lower" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Continued decline; sell into any bounce" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Mid-Mar; 40-YR at ~60-65; 15-YR and 5-YR weaker" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Late-Mar; all TFs declining toward April-May lows" },
    ],
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sig40: "chop",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "5-YR and 15-YR continuing lower. 40-YR choppy at ~55-65, holding relatively better. Do not be deceived by 40-YR stability — the June trough is ahead.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★★", note: "Apr: 5-YR and 15-YR weak; 40-YR choppy at 55-65" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★",  note: "Slow decline; approaching May spike then crash" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "chop", com: "SHORT ★★",  note: "Mid-Apr; 40-YR stable while others weak" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Late-Apr; pre-May spike zone; indecision" },
    ],
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "40-YR makes a SECONDARY SPIKE to ~75-85 mid-May — a false long signal. 5-YR and 15-YR remain weak. Do NOT chase the 40-YR spike; the June crash follows immediately.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "bull", com: "CHOP",      note: "40-YR rising toward mid-May spike; 5-YR and 15-YR unconfirmed" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "CHOP",      note: "40-YR at ~75-85 peak; false signal — do not go long" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "40-YR reversing from May spike; all TFs turning bearish" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Late-May: all crashing toward June trough; add shorts" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "ANNUAL TROUGH — 40-YR crashes from May ~85 to ~25; 15-YR and 5-YR near 0. COVER SHORTS at June/July trough. The summer low is the best buy point of the year.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "Jun: 40-YR crashing from 85 toward 25; 5-YR and 15-YR at near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★", note: "All three near annual lows; trough approaching" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",  note: "Near trough; 40-YR at ~25; 5-YR and 15-YR near 0" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",        note: "Trough forming — cover shorts, begin watching for July long entry" },
    ],
  },
  {
    month: "July", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "ANNUAL LOW — 40-YR at ~10-25; 15-YR and 5-YR near 0. Absolute seasonal floor. Cover shorts immediately and flip long at July trough for the Sep-Nov recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Jul 1: all TFs at annual trough — 40-YR ~10-25, 5-YR and 15-YR near 0" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Trough base; cover all shorts — flip long for recovery" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Base forming; 40-YR attempting recovery" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",       note: "Late-Jul: recovery beginning; initiate longs" },
    ],
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Still very low — 40-YR at ~15-30, 15-YR and 5-YR recovering slowly. Base-building phase. No urgent signal — hold any longs initiated at July low and wait for September recovery.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Aug: all TFs at depressed levels, slow base-building" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Recovery very slow; 40-YR at ~15-25" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP", note: "Mid-Aug; all TFs still subdued; patience required" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "CHOP", note: "Late-Aug: first signs of recovery — 40-YR edging higher" },
    ],
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery clearly underway — all TFs rising. 40-YR at ~30-40; 15-YR and 5-YR also recovering. Add to longs — the Nov peak is the seasonal target.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Sep recovery confirmed; all TFs rising from July lows" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "40-YR at 30-40; 15-YR and 5-YR recovering pace" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Mid-Sep; sustained recovery; buy dips" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Late-Sep; all TFs trending higher; hold longs into Oct" },
    ],
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery continues — 40-YR at ~35-50, 15-YR at ~40-55, 5-YR recovering. All TFs aligned bullish heading into the strong Nov season.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Oct: all TFs continuing higher; 40-YR at 35-50" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Momentum building; add to longs" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Mid-Oct; 40-YR at ~45-55; recovery well-established" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Late-Oct; final push into November seasonal high" },
    ],
  },
  {
    month: "November", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong seasonal tailwind — 40-YR at ~50-65, 15-YR at ~50-65, 5-YR at ~50-60. All TFs aligned bullish. Hold maximum longs. December plateau ahead.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Nov: all TFs surging; 40-YR at 50-65" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Strong seasonal momentum; hold full position" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Mid-Nov; approaching Dec plateau; tighten stops" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Late-Nov; 40-YR at ~60-68; Jan seasonal reset incoming" },
    ],
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "Year-end plateau — 40-YR at ~65-70 (cursor 67.86), 15-YR at ~55-65 (cursor 60.02), 5-YR at ~38-45 (cursor 40.84). Carry longs but reduce into January when Feb peak/crash cycle repeats.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Early Dec; 40-YR at ~65-70; year-end carry" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★",  note: "Mid-Dec; plateau — not adding but holding" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",     note: "Late Dec: slight softening; consider reducing into Jan" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",     note: "Year-end; 40-YR ~68, 15-YR ~60, 5-YR ~41 — Jan peak/crash ahead" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Coffee "C" (ICE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Coffee "C" (ICE/NYBOT)
Exchange: ICE (formerly NYBOT) | Seasonal History: 40-Year (1980–2019)

YEARLY ARC:
Year opens with 5-YR at annual HIGH zone (~90-100 early Jan), 40-YR at ~68-85, 15-YR at ~60-80. All declining.
February: 15-YR spikes to ~95-100 (annual HIGH for 15-YR), 40-YR to ~88-90, then BOTH CRASH sharply mid-Feb.
March–May: All TFs declining.
May: 40-YR makes a secondary spike to ~75-85 (false long signal) then reverses immediately.
June: 40-YR crashes from ~85 to ~25; 5-YR and 15-YR near 0 — ANNUAL TROUGH.
July: All TFs at annual lows — 40-YR ~10-25, 5-YR and 15-YR near 0. BEST BUY.
August: Slow base-building; all very low.
Sep-Nov: Steady recovery — 40-YR climbs from ~30 to ~65-70.
December: Year-end plateau at ~68/60/41 (40-YR/15-YR/5-YR).

MONTHLY SIGNALS:
Jan — SHORT ★★★   | 5-YR at annual high; all declining; sell-into-strength
Feb — FLIP  ★★★★  | 15-YR/40-YR peak mid-Feb at 95-100/88-90 then crash; sell the peak
Mar — SHORT ★★★   | All declining from Feb peak
Apr — SHORT ★★★   | 5-YR/15-YR weak; 40-YR choppy
May — CHOP  ★★    | 40-YR false spike to 75-85; do not chase; crash follows
Jun — SHORT ★★★★  | 40-YR crashes 85→25; annual trough; cover at low
Jul — SHORT ★★★   | Annual low (40-YR ~10-25, others near 0); flip long at trough
Aug — CHOP  ★★    | Slow base-building; no conviction signal
Sep — LONG  ★★★   | Recovery begins; all TFs rising
Oct — LONG  ★★★   | Recovery continues; 40-YR at 35-50
Nov — LONG  ★★★★  | Strong recovery; all TFs at 50-65
Dec — LONG  ★★    | Year-end plateau; carry longs into January

KEY OBSERVATIONS:
- The 40-YR mid-May spike (~75-85) is a confirmed FALSE signal — do not go long
- February peak is clean and tradeable — 15-YR hits ~100 before the crash
- The July trough is the single best long entry of the year
- 5-YR is the most volatile TF; the 40-YR provides the clearest seasonal trend
- December close (~68/60/41) is well off the January levels — no year-end surge
`;
