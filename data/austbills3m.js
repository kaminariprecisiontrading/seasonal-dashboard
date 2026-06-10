// austbills3m.js — 3-Mth Aus T-Bills (SFE) · 40-Year Seasonal (1980–2019)

const ASSET_CONFIG = {
  id:       "austbills3m",
  name:     "3-Mth Aus T-Bills (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Month Aus T-Bills SFE · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#0369a1",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year opens at elevated levels across all TFs (40-YR ~81, 15-YR ~76, 5-YR ~69). All three declining from December highs. Sell-into-strength setup.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "New year opens high; all TFs at 70–80+ and declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Continued selling pressure from elevated levels" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★",  note: "Mid-Jan weakness; 5-YR leading the decline" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Late-Jan acceleration; approaching Feb bear leg" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Strong bear month; 15-YR remains elevated but declining sharply. 5-YR accelerating lower. All TFs heading toward March trough. High conviction short.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Feb bear in full force; sell into strength" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★★", note: "Steepest seasonal decline; maximum short conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★★",  note: "Continued heavy selling; nearing March trough zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★",   note: "Late-Feb lows approaching; watch for early trough signals" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Annual seasonal trough — ALL three TFs crash to near 0 in March. Very deep and clean trough. Flip to long at the trough for the powerful Apr–Sep bull run.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Annual low zone; all TFs crash to near 0" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Deepest trough; extreme oversold — trough setup" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",      note: "Base forming; early stabilisation near lows" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s40: "chop", com: "CHOP",      note: "5-YR leads recovery; begin building longs" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery gains momentum; all TFs rising from March lows. 15-YR and 5-YR recover fast. 40-YR lagging but directionally aligned. Buy dips aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Recovery confirmation; add longs off March base" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "All TFs recovering; 15-YR and 5-YR leading from lows" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Sustained recovery; add on any mid-month dip" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★", note: "Month-end strength; all three aligned into May" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month; 5-YR recovering toward ~75, 15-YR at ~65, 40-YR at ~50. All TFs aligned bullish. Buy dips — June sees some volatility but trend is up.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "5-YR surging; 15-YR and 40-YR follow" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "All TFs rising; strong seasonal tailwind" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★", note: "Mid-May strength; hold longs into month-end" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★",  note: "Month-end; 5-YR at ~75, 15-YR at ~65, 40-YR climbing" },
    ],
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Volatile month; 40-YR has a sharp intra-month dip (near 30) before recovering. 5-YR also volatile. 15-YR more stable. Buy dips within the overall bull context.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull", s40: "bull",  com: "LONG ★★★",   note: "Month starts bullish; 15-YR stable, others rising" },
      { wk: "Wk 2", s5: "chop",  s15: "bull", s40: "chop",  com: "CHOP",        note: "Mid-June: 40-YR dip to ~30; 5-YR volatile — hold core longs" },
      { wk: "Wk 3", s5: "chop",  s15: "bull", s40: "chop",  com: "CHOP",        note: "Dip-recovery in progress; buy the 40-YR weakness" },
      { wk: "Wk 4", s5: "bull",  s15: "bull", s40: "bull",  com: "LONG ★★★★",  note: "June recovery complete; positioned for explosive July" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive bull month from June lows; all TFs surging. 5-YR near 85–90, 15-YR approaching 100, 40-YR recovering hard. Peak zone forming late July.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "July surge from June lows; maximum long conviction" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "All three surging; strongest bull leg of the cycle" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Near-peak for 15-YR; 40-YR still in bull surge" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "Late-July: 15-YR approaching 100; tighten stops" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "15-YR peaks at ~100 (August high). 5-YR also near highs. 40-YR continues rising toward September peak. Tighten stops on 15-YR/5-YR positions; hold 40-YR.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★★", note: "15-YR at/near 100; 40-YR still advancing" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s40: "bull", com: "LONG ★★★★",  note: "15-YR peak zone; 40-YR and 5-YR still strong" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★★",   note: "15-YR/5-YR stalling near highs; 40-YR still rising" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s40: "bull", com: "LONG ★★",    note: "15-YR/5-YR rolling over; 40-YR approaching Sep peak" },
    ],
  },
  {
    month: "September", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "40-YR peaks at 100 — annual seasonal HIGH. 5-YR also reaches ~95–100. 15-YR declining. Divergence peaks: short 15-YR, hold 40-YR until peak is confirmed.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "chop", s40: "bull",  com: "LONG ★★★★",  note: "40-YR surging toward 100; last long window for 40-YR" },
      { wk: "Wk 2", s5: "bull",  s15: "chop", s40: "bull",  com: "LONG ★★★",   note: "40-YR near annual peak; tighten stops" },
      { wk: "Wk 3", s5: "chop",  s15: "bear", s40: "chop",  com: "CHOP",        note: "40-YR at/near 100; all TFs beginning rollover" },
      { wk: "Wk 4", s5: "bear",  s15: "bear", s40: "bear",  com: "SHORT ★★",    note: "Post-peak; all TFs rolling over — flip short" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-peak decline from September highs; 40-YR falling from 100, 5-YR declining. 15-YR also under pressure. Sell rallies — October is the weakest month post-peak.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Post-Sep peak selloff; all TFs declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s40: "bear", com: "SHORT ★★★", note: "Continued weakness; sell into rallies" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",      note: "Mid-month stabilisation; 40-YR holding ~75–80" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",      note: "Late-Oct: 40-YR stabilising near 75–80; base for Nov–Dec" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sig40: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "40-YR holding at ~75–80. 15-YR declining from August highs, approaching moderate levels. 5-YR stable. Mixed signals — no clean directional trade.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",      note: "November opens mixed; 40-YR stable ~75, 15-YR declining" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",      note: "No clean directional signal; avoid new positions" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s40: "chop", com: "CHOP",      note: "15-YR continuing lower; 40-YR and 5-YR stable" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "chop", com: "CHOP",      note: "Month-end; mixed signals persist into December" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "40-YR holds at ~75–80. 5-YR stable. 15-YR settling near year-end moderate levels. Year closes at elevated levels that carry into the January seasonal reset.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★",  note: "Early Dec; 40-YR carries high into year-end" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★",  note: "Mid-Dec stable; 40-YR at ~78–80" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★",  note: "Year-end consolidation; 40-YR holding elevated" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s40: "bull", com: "LONG ★★",  note: "Final week; all TFs at elevated levels ready for Jan reset" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 3-Month Aus T-Bills (SFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 3-Month Aus T-Bills (SFE)
Exchange: SFE | Seasonal History: 40-Year (1980–2019)

YEARLY ARC:
Year opens at very elevated levels (40-YR ~81, 15-YR ~76, 5-YR ~69) — all three TFs high.
All TFs decline Jan–Mar, arriving at annual trough near 0 in March.
Recovery Apr–Jul: all TFs rising; brief June volatility for 40-YR (dip to ~30) then recovery.
Aug: 15-YR peaks near 100.
Sep: 40-YR annual HIGH at ~100. 5-YR also near 100. Strong Sep peak.
Oct: Post-peak decline; all TFs falling from September highs.
Nov–Dec: 40-YR stabilises at ~75–80. 15-YR at moderate levels. Year closes elevated.

MONTHLY SIGNALS:
Jan  — SHORT ★★★   | All TFs at highs and declining; year-start bear
Feb  — SHORT ★★★★  | Strong bear; all three declining toward trough
Mar  — SHORT ★★★   | Annual trough; all near 0, then recovery
Apr  — LONG  ★★★   | Recovery month; all TFs rising from lows
May  — LONG  ★★★★  | Strong bull; 5-YR near 75, 15-YR at 65
Jun  — CHOP  ★★    | June dip for 40-YR; volatile, buy weakness
Jul  — LONG  ★★★★★ | Explosive recovery from June; all TFs surging
Aug  — LONG  ★★★★  | 15-YR peaks ~100; 40-YR still rising
Sep  — LONG  ★★★   | 40-YR annual high at ~100; then reversal
Oct  — SHORT ★★★   | Post-peak decline; sell rallies
Nov  — CHOP  ★★    | 40-YR stable ~75–80; 15-YR declining; mixed
Dec  — LONG  ★★    | Year-end carry; 40-YR holds ~78–81

KEY OBSERVATIONS:
- This instrument starts AND ends the year at very elevated levels (~75–80+ for all TFs)
- Unlike bonds, even the 5-YR is at 69 in January — this is unusual for short-term rates
- June sees a sharp 40-YR dip to ~30 before recovery — a known false signal; buy the dip
- September is the 40-YR annual high (~100), one month later than 10-YR Aus Bonds
- 15-YR leads the year-end decline: it drops to ~40–50 by Dec while 40-YR stays at 75–80
`;
