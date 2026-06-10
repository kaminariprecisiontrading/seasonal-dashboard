// austbonds3.js — 3-Year Aus T-Bonds (SFE) · 33-Year Seasonal (1987–2019)

const ASSET_CONFIG = {
  id:       "austbonds3",
  name:     "3-Year Aus T-Bonds (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 33-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 3-Year Aus T-Bonds SFE · 33-Year Seasonal (1987–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "33-YR",
  ltSigKey: "sig33",
  ltKey:    "s33",
  ltAccent: "#1d4ed8",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year opens elevated (33-YR ~84, 15-YR ~40, 5-YR ~49). All TFs declining from year-end highs toward the March trough. Sell-into-strength environment.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "New year opens high; all TFs begin seasonal decline" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Continued selling from elevated levels; trend down" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★",  note: "Mid-Jan weakness; sell rallies" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Late-Jan pressure builds; approaching Feb bear phase" },
    ],
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Strong seasonal bear month; all TFs declining decisively. 5-YR selling is aggressive, dragging 15-YR and 33-YR lower. High conviction short.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Feb bear in full swing; sell any strength" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★★", note: "Steepest decline of the year; maximum short conviction" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Continued heavy selling; nearing March trough zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",   note: "Late-Feb lows approaching; watch for early exhaustion signals" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Annual seasonal trough — all TFs crash to near 0 in early/mid March. Brief oversold bounce possible but primary trend is down. Flip to long at low.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Annual low zone; all TFs at or near 0" },
      { wk: "Wk 2", s5: "bear", s15: "chop", s33: "chop", com: "CHOP",      note: "Trough forming; 33-YR and 15-YR stabilising near lows" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "chop", com: "CHOP",      note: "Oversold base; wait for recovery signal" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s33: "chop", com: "CHOP",      note: "5-YR leading early recovery; begin scaling into longs" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery month; all TFs rising from March lows. 5-YR leads with a strong spike from near-zero base. Build long positions on any dip.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Recovery confirmation; add longs off March base" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "5-YR breakout; 15-YR and 33-YR joining" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Sustained strength across all TFs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Month-end continuation into May strength" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "5-YR spikes dramatically to ~75–80 — strongest short-term signal of the year. 15-YR at ~55, 33-YR at ~55. All TFs aligned bullish. High-conviction long month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "5-YR explosive spike to ~75; maximum buy signal for shorter TFs" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "Highest conviction bull week; 5-YR near 75–80" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Momentum sustains; 15-YR and 33-YR climbing" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★",   note: "5-YR may plateau late May; hold via 15/33-YR strength" },
    ],
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "5-YR volatile with mid-June pullback from May spike. 15-YR and 33-YR continuing higher. Dip-and-recover dynamic — buy mid-month weakness.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "Month starts strong; 15-YR and 33-YR leading now" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★",   note: "5-YR mid-June dip; 33-YR holds and leads" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "Recovery from dip; buy the weakness before July surge" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "Month-end; all TFs aligned into explosive July" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive bull month; all TFs surging to 70–90+ range. 5-YR, 15-YR, and 33-YR all heading toward 100. Peak zone forming late July. Hold maximum longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "July surge begins; all three TFs surging together" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "Peak conviction; 5-YR near 80, 33-YR approaching 80+" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Near-peak; tighten stops as all three approach 90–100" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Late-July: approaching annual peaks; hold but prepare to exit" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "ALL THREE TFs peak at ~100 — including 33-YR (annual high). This is the single most powerful seasonal peak. Scale out aggressively after the August climax.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★★", note: "All three TFs at or near 100; annual seasonal climax" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★★",  note: "Peak zone; begin scaling out of longs aggressively" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "chop", com: "CHOP",       note: "All TFs at exhaustion highs; hold tight stops" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",  note: "Reversal confirmed; all TFs rolling over from 100 — flip short" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Post-peak decline across all TFs from August highs. 5-YR falls sharply from 100 to ~45. 15-YR and 33-YR also declining significantly. Strong bear phase.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Post-August peak selloff; all TFs falling hard" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★",  note: "Decline accelerates; sell rallies aggressively" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★★★", note: "Deepening decline; 5-YR at ~50, 33-YR falling from 100" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★",   note: "Late-Sep lows; watch for early October stabilisation" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig33: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued post-peak decline; 33-YR at ~45–55, 5-YR at ~40. All TFs still bearing. Sell-into-any-rally setup until November recovery begins.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Oct bear continues; 33-YR falling from 100 toward 50" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s33: "bear", com: "SHORT ★★★", note: "Continued weakness; sell rallies" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "chop", com: "CHOP",      note: "Mid-month stabilisation; base building for Nov recovery" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★",   note: "Late-Oct early recovery; 33-YR bottoming near 45–50" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "33-YR surges to 90–95 (second annual high). 15-YR also recovering well. 5-YR lags but stable. Strong November — buy October weakness for November rally.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "33-YR powering higher; strong secondary bull signal" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★★", note: "33-YR and 15-YR aligned; add longs on any dip" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s33: "bull", com: "LONG ★★★",  note: "33-YR reaching 90–95; hold into month-end" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "bull", com: "LONG ★★",   note: "Month-end; 33-YR at secondary high, preparing Dec carry" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig33: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 2,
    note: "33-YR at ~75–85 (year-end carry), wrapping back toward January ~84. 15-YR at ~40, 5-YR at ~49. Moderate year-end; hold 33-YR positions into January.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s33: "bull", com: "LONG ★★★", note: "Early Dec strength; 33-YR carries high year-end" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s33: "bull", com: "LONG ★★",  note: "Mid-month pause; 33-YR stable ~80–84" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s33: "bull", com: "LONG ★★",  note: "Year-end consolidation; 33-YR holding elevated" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s33: "bull", com: "LONG ★★",  note: "Final week; 33-YR at ~84 ready for January seasonal reset" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 3-Year Australian T-Bonds (SFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 3-Year Aus T-Bonds (SFE)
Exchange: SFE | Seasonal History: 33-Year (1987–2019)

YEARLY ARC:
Year opens elevated (33-YR ~84, 15-YR ~40, 5-YR ~49). All TFs decline Jan–Mar to annual trough.
Mar: Annual low — all near 0. Recovery begins.
Apr–May: 5-YR spikes dramatically to ~75–80, strongest short-term reading.
May–Aug: All three TFs rising strongly; all reach ~100 in August.
Aug: Annual HIGH for ALL three TFs simultaneously — the peak month.
Sep–Oct: Post-peak decline; all TFs falling from August highs.
Nov: 33-YR secondary surge to ~90–95. Second bull window.
Dec: 33-YR holds ~75–85. Year closes near starting levels.

MONTHLY SIGNALS:
Jan  — SHORT ★★★   | All TFs declining from year-end highs
Feb  — SHORT ★★★★  | Strong bear; all TFs falling decisively
Mar  — SHORT ★★★   | Annual trough; all TFs near 0, then recovery
Apr  — LONG  ★★★   | Recovery month; 5-YR leads from lows
May  — LONG  ★★★★★ | 5-YR spikes to ~75–80; all TFs strong
Jun  — LONG  ★★★   | 5-YR dip mid-month; 33-YR and 15-YR continue
Jul  — LONG  ★★★★★ | All three surging toward 100; max conviction
Aug  — LONG  ★★★★  | ALL TFs peak at ~100 — August annual high
Sep  — SHORT ★★★★  | Post-August decline; all TFs falling sharply
Oct  — SHORT ★★★   | Continued decline; late-month recovery begins
Nov  — LONG  ★★★★  | 33-YR secondary surge to 90–95
Dec  — LONG  ★★    | Year-end carry; 33-YR holds ~75–85

KEY OBSERVATIONS:
- Unlike 10-YR Aus Bonds, ALL THREE TFs peak simultaneously in August (not staggered)
- 5-YR has an extreme early spike in May (~75–80) before the July-August surge
- The March trough is the annual setup point for the year's best trade: long Apr–Aug
- November second peak is significant (33-YR to 90–95) — trade separately from Aug peak
- 33-YR lags slightly vs. 5-YR/15-YR on the recovery but matches on the August peak
`;
