// austbonds10.js — 10-Year Aus T-Bonds (SFE) · 36-Year Seasonal (1984–2019)

const ASSET_CONFIG = {
  id:       "austbonds10",
  name:     "10-Year Aus T-Bonds (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 36-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 10-Year Aus T-Bonds SFE · 36-Year Seasonal (1984–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "36-YR",
  ltSigKey: "sig36",
  ltKey:    "s36",
  ltAccent: "#1e40af",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year begins at seasonal highs (36-YR ~89, 15-YR ~50, 5-YR ~55). All TFs declining from year-end elevated levels. Sell-into-strength environment.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★", note: "Early Jan selloff from elevated year-end levels; all TFs declining" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★", note: "Continued decline; 36-YR losing ground from ~89" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★",  note: "Mid-Jan weakness sustained; sell rallies" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★", note: "Late-Jan accelerating decline heading into Feb bear phase" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Strong seasonal bear month; all TFs declining toward annual lows. 5-YR and 15-YR most aggressive. Sell rallies across all timeframes.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★",  note: "Feb decline in full force; high conviction short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★★", note: "Steepest seasonal decline; maximum bear conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★",  note: "Continued heavy selling; approaching March trough zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",   note: "Late-Feb lows forming; trend intact, watch for early reversal signals" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Annual seasonal trough — all TFs crash to near 0 in early/mid March. Transition from short to long setup near month-end as recovery begins.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Annual low zone; all TFs near 0 — strongest bear signal of year" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Deep trough persists; seasonal nadir, wait for turn" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s36: "chop", com: "CHOP",       note: "Exhaustion near lows; oversold base forming" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s36: "chop", com: "CHOP",       note: "5-YR leads early recovery; 36-YR stabilising near lows" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Seasonal recovery month; all TFs rising from March lows. 5-YR leads the rebound with a notable spike. Initiate longs on dips.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★", note: "Recovery confirmation; add longs off March base" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★", note: "5-YR surging; breakout from lows accelerating" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★", note: "Sustained strength; all TFs aligned bullish" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★", note: "Month-end continuation; 5-YR approaching mid-range" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month; 5-YR spikes dramatically to ~55–65. 15-YR and 36-YR climbing steadily from April base. Hold longs aggressively.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "5-YR accelerating toward 55–65; strong buy-dip month" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "Momentum building; 15-YR and 36-YR joining rally" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "Mid-May dip possible; hold longs, use as entry" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "Month-end strength; all TFs pushing higher into June" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Continued bull run; all three TFs rising steadily. 5-YR at ~55–65, 15-YR and 36-YR climbing toward mid-to-upper range. Strong seasonal tailwind.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "Bull momentum intact; 15-YR and 36-YR following 5-YR higher" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "Mid-June strength; hold all long positions" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "All TFs aligned and rising; best seasonal window open" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "Month-end consolidation; hold into July surge" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive seasonal bull month; all three TFs surging toward 70–90. 5-YR approaching 80+. Peak zone for shorter TFs beginning to form. Hold maximum longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "July surge begins; 5-YR climbing hard toward 80" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "Strongest bull leg of the year; maximum long conviction" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "5-YR approaching 80–90; 15-YR close behind" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "Late-July peak zone forming; watch for 5-YR exhaustion" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR and 15-YR peak at ~100 (annual high for shorter TFs). 36-YR at ~85–90. Peak month for 5-YR/15-YR — tighten stops as shorter TFs near exhaustion.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "5-YR and 15-YR approaching 100; 36-YR in upper range" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "Peak zone for 5-YR/15-YR; 36-YR still rising" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s36: "bull", com: "LONG ★★★",   note: "5-YR at/near 100 and stalling; 36-YR and 15-YR still advancing" },
      { wk: "Wk 4", s5: "bear", s15: "chop", s36: "bull", com: "LONG ★★",    note: "5-YR beginning to roll over; 36-YR still climbing toward Sep high" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "chop", sig36: "bull",
    combined: "flip", combinedLabel: "FLIP", stars: 3,
    note: "36-YR peaks at 100 (annual seasonal high). 5-YR falling sharply from August highs. TF divergence peak — short 5-YR/15-YR, watch for 36-YR rollover.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull",  s36: "bull",  com: "LONG ★★★",   note: "36-YR final surge toward 100; last chance to hold longs" },
      { wk: "Wk 2", s5: "chop",  s15: "chop",  s36: "bull",  com: "CHOP",        note: "36-YR at/near 100; 5-YR reversing hard — divergence peaks" },
      { wk: "Wk 3", s5: "bear",  s15: "bear",  s36: "chop",  com: "SHORT ★★",    note: "36-YR rolling over from highs; short pressure building" },
      { wk: "Wk 4", s5: "bear",  s15: "bear",  s36: "bear",  com: "SHORT ★★★",   note: "All TFs declining; position for October bear leg" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-peak decline; all TFs falling from September highs. 36-YR drops from 100 to ~70–80. 5-YR at ~50–55. Sell rallies into November recovery.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★", note: "Post-September decline accelerates; sell rallies" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★",  note: "Continued weakness; 36-YR falling from 100" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s36: "chop", com: "CHOP",      note: "Mid-month stabilisation; potential base for November recovery" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s36: "bull", com: "LONG ★★",   note: "Late-Oct recovery begins; 36-YR bottoming near 70" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "36-YR surges to near 90–95 (second annual peak). 15-YR also recovering well. 5-YR lags but stable. Strong seasonal buy opportunity on October dip.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "36-YR powering into second annual peak; strong seasonal signal" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "36-YR and 15-YR aligned bullish; add longs" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "36-YR near 90–95; hold through November high" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s36: "bull", com: "LONG ★★",   note: "Month-end; 36-YR holding elevated, preparing December carry" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "36-YR elevated at ~85–90, wrapping back to January starting levels. 15-YR at ~50, 5-YR at ~55. Year-end carry: hold 36-YR longs into January.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★", note: "Early Dec strength; 36-YR carries high year-end levels" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s36: "bull", com: "LONG ★★",  note: "Mid-month pause; 36-YR stable near 85–90" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s36: "bull", com: "LONG ★★",  note: "Year-end consolidation; 36-YR holds elevated" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s36: "bull", com: "LONG ★★",  note: "Final week; 36-YR at ~88 ready to reset January seasonal" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 10-Year Australian T-Bonds (SFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 10-Year Aus T-Bonds (SFE)
Exchange: SFE | Seasonal History: 36-Year (1984–2019)

YEARLY ARC:
Year opens HIGH (36-YR ~89, 15-YR ~50, 5-YR ~55). All TFs decline Jan–Mar toward annual trough.
Mar: Annual low — all near 0. Recovery begins.
Apr–Aug: Strong seasonal bull run — all TFs rising steadily.
Aug: 5-YR and 15-YR peak near 100.
Sep: 36-YR annual HIGH at ~100, then reversal.
Oct: Post-peak decline, all TFs lower.
Nov: 36-YR secondary surge to ~90–95. Second bull peak.
Dec: 36-YR holds ~85–90. Year closes near starting levels.

MONTHLY SIGNALS:
Jan  — SHORT ★★★   | 36-YR bear: declining from ~89 high
Feb  — SHORT ★★★★  | Bear month: all TFs declining toward March lows
Mar  — SHORT ★★★   | Annual trough near 0; late recovery signal
Apr  — LONG  ★★★   | Recovery month; 5-YR leads
May  — LONG  ★★★★  | 5-YR spikes to ~55–65; strong bull
Jun  — LONG  ★★★★  | All TFs rising; sustained bull
Jul  — LONG  ★★★★★ | Explosive bull run; hold maximum longs
Aug  — LONG  ★★★★  | 5-YR/15-YR peak at 100; 36-YR at 85–90
Sep  — FLIP  ★★★   | 36-YR annual high ~100; then reversal begins
Oct  — SHORT ★★★   | Post-peak decline; sell rallies
Nov  — LONG  ★★★★  | 36-YR secondary surge to 90–95
Dec  — LONG  ★★★   | Year-end carry; 36-YR holds ~85–90

KEY OBSERVATIONS:
- Annual trough: March (all TFs near 0)
- Annual peak: September for 36-YR (~100), August for 5-YR/15-YR
- 36-YR is the lagging TF — it peaks 4–6 weeks after 5-YR
- November second high for 36-YR almost as strong as September
- Year-end levels ~88–90 for 36-YR create a consistent seasonal cycle
- TF divergence in Sep creates a complex signal: short 5-YR, hold 36-YR
`;
