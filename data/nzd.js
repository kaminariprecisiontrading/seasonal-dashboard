/**
 * data/nzd.js — New Zealand Dollar (NZD/USD) seasonal data
 * Source: Moore Research Center · 23-Year (1997–2019) · 15-Year · 5-Year
 */

const ASSET_CONFIG = {
  id:       "nzd",
  name:     "NZD / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 23-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · New Zealand Dollar CME Futures · 23-Year Seasonal (1997–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "23-YR",
  ltSigKey: "sig23",
  ltKey:    "s23",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "5-YR spikes to ~100 at Jan 1 open then collapses. All TFs declining from year-end highs. Fade the open — structural bear month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s23:"bear", com:"SHORT ★★★☆☆", note:"5-YR spikes Jan 1 — sell the open spike immediately." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"All TFs declining. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Continued broad weakness across all timeframes." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★☆☆", note:"Approaching Feb lows — watch for early stabilisation." },
    ]
  },
  {
    month: "February", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All three TFs grinding lower. 23-YR approaching ~35–40 trough zone. Broad seasonal weakness continues.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Continuation of Jan decline. No bounce expected." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Mid-Feb lows forming. All TFs in downtrend." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★☆☆", note:"Approaching potential Feb–Mar trough — begin monitoring for turn." },
      { wk:"Wk 4", s5:"chop", s15:"bear", s23:"chop", com:"CHOP ★★☆☆☆", note:"Late Feb stabilisation. 23-YR and 5-YR beginning to base." },
    ]
  },
  {
    month: "March", sig5: "chop", sig15: "bull", sig23: "bull",
    combined: "chop", combinedLabel: "CHOP / FLIP", stars: 2,
    note: "Transition month. 23-YR troughs Wk1–2 then sharp reversal. 15-YR recovers. 5-YR still lagging. TFs diverging — wait for confirmation.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"chop", com:"CHOP ★★☆☆☆", note:"Still weak early March. Absolute trough forming. Wait." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s23:"bull", com:"CHOP ★★☆☆☆", note:"23-YR leading recovery. 5-YR lagging. Mixed." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★☆☆", note:"5-YR and 23-YR both recovering. Early long bias." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★☆☆", note:"Building into Apr. Recovery conviction building." },
    ]
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs rallying. Strong bull window into mid-Apr, then begin watching for peak as 5-YR approaches ~85–90.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"All TFs rising — strong bull confluence. High conviction long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"5-YR approaching peak. Hold longs into mid-Apr." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s23:"bull", com:"LONG / WATCH ★★★☆☆", note:"5-YR rolling over — begin taking profits. 23-YR still elevated." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s23:"chop", com:"CHOP ★★☆☆☆", note:"5-YR fading. Mixed signals. Reduce long exposure." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "Most critical flip month. 23-YR peaks ~85–90 early May. 5-YR and 15-YR collapse. All TFs align bearish by Wk2 — highest conviction short of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s23:"bull", com:"CHOP / FLIP ★★★☆☆", note:"23-YR near peak. 5-YR already collapsing. Exit longs." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★★", note:"All TFs turning south. Peak confirmed. Enter short with full conviction." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★★", note:"Full waterfall. Highest conviction short window of the year." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Continued broad decline into Jun low." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "All three TFs near annual lows. Absolute trough zone. Deep seasonal waterfall — hold shorts from May flip.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★★", note:"Continuation of May waterfall. Hold short positions." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Broad lows. All TFs depressed. Near absolute trough." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s23:"bear", com:"SHORT / COVER ★★★☆☆", note:"5-YR starting to base. Begin partial cover." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s23:"chop", com:"NEUTRAL ★★☆☆☆", note:"Trough. Cover remaining shorts. Await Jul recovery signal." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "bull", sig23: "bull",
    combined: "chop", combinedLabel: "MIXED", stars: 3,
    note: "23-YR and 15-YR bounce meaningfully from Jun trough. 5-YR more muted. Short-term long trade available but caution required.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s23:"bull", com:"MIXED ★★★☆☆", note:"15-YR and 23-YR lifting. 5-YR neutral. Cautious long entry." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Best week of Jul. All 3 show lift. Highest conviction long of the month." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"NEUTRAL ★★☆☆☆", note:"Bounce fading. Exit longs. Stand aside." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s23:"chop", com:"CHOP ★★☆☆☆", note:"5-YR rolls over. Remain flat." },
    ]
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs recovering. NZD builds toward Sep peak. Re-enter long after Jul consolidation.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Recovery confirmed. Enter long. All TFs aligned up." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Sustained recovery. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Building into Sep peak. No exit signal yet." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Approaching Sep. Hold — peak not yet in." },
    ]
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "Secondary peak month. 23-YR and 15-YR peak ~80–85 mid-Sep. 5-YR peaks before others — use as early flip warning. Exit longs Wk2.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Still rising. Hold longs into Wk1." },
      { wk:"Wk 2", s5:"chop", s15:"bull", s23:"bull", com:"LONG → FLIP ★★★☆☆", note:"5-YR peaking first. Begin taking profits. Watch for reversal." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"All TFs rolling over. Flip short mid-Sep." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Sustained decline. Hold shorts into Oct." },
    ]
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Post-Sep peak waterfall. All TFs declining sharply. Hold shorts from Sep flip.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Full waterfall continuation. Hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"No relief. All TFs declining." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Mid-Oct bear pressure. Hold." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s23:"chop", com:"SHORT / WATCH ★★★☆☆", note:"Late Oct stabilisation beginning. Begin tightening stops." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig23: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued seasonal weakness. All TFs near lows. Late Nov begins to base ahead of strong Dec year-end rally.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★★☆", note:"Still declining. Hold shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s23:"bear", com:"SHORT ★★★☆☆", note:"Near seasonal lows. Maintain exposure." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s23:"chop", com:"CHOP ★★☆☆☆", note:"Base forming. Cover remaining shorts. Stand aside." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★☆", note:"Late Nov turn — all TFs inflect. Enter long for Dec year-end rally." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig23: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Strongest month of the year on 23-YR — surges toward ~95–100 at year close. All TFs aligned. Hold longs through month end.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Year-end rally confirmed. Enter / add to longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"All TFs accelerating higher. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"23-YR surging to ~95–100. Peak approaches Dec 31." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s23:"bull", com:"LONG ★★★★★", note:"Year-end peak. 23-YR reaches ~95–100. Exit into year close." },
    ]
  },
];

const SEASONAL_DATA = `
NEW ZEALAND DOLLAR (NZD/USD) — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, 23-Year (1997–2019), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan: 5-YR spikes to ~100 at Jan 1 open — immediate sell. Full waterfall all month.
Feb: Continuing waterfall. Approaching trough late Feb.
Mar: Bottoms Wk1–2. Recovery follows Wk3–4.
Apr: Rising. Building toward May peak. All-month long.
May Wk1: 5-YR already rolling over as 23-YR peaks. Exit longs.
May Wk2–4: Full collapse. Waterfall confirms short.
Jun: Near absolute lows. Hold shorts. Late Jun trough.
Jul: Choppy. 5-YR muted bounce vs 15-YR. Short-term long only Wk2.
Aug: Recovery underway. Rising toward Sep.
Sep Wk1–2: 5-YR peaks first — early warning signal. Exit longs Wk2.
Sep Wk3–4: Rolling over. Flip short.
Oct: Full decline post-Sep. Hold shorts.
Nov Wk1–3: Near lows. Hold/reduce.
Nov Wk4: Turn up — enter long for Dec rally.
Dec: All-month long. Year-end surge.

=== 15-YEAR SEASONAL ===
Jan–Feb: Declining from year-end highs. Bear all month.
Mar: Trough and recovery. Flip long Wk2–3.
Apr: Rising strongly. High conviction long all month.
May Wk1: Final push then catastrophic reversal Wk2.
May Wk2–4: Sharp collapse. Highest short conviction.
Jun: Near lows. Waterfall confirmed. Hold shorts.
Jul Wk1–2: Sharp bounce. Notable counter-trend — cover shorts, take long trade.
Jul Wk3–4: Bounce fades. Exit longs.
Aug: Recovery resumes. Long bias.
Sep Wk1–2: Rising toward peak. Hold longs.
Sep Wk3: Peak ~80–85. Flip short.
Oct–Nov: Decline. Bear phase.
Nov Wk4: Turn. Enter long.
Dec: All-month recovery. Strong year-end.

=== 23-YEAR SEASONAL ===
Jan: Opens ~65–70 (near year-end highs) and declines all month. Structural bear.
Feb: Continues lower toward ~35–40. Approaching absolute trough.
Mar: ANNUAL TROUGH ~25–30 Wk1–2. Sharp reversal follows — 23-YR leads the recovery.
Apr: Rising from Mar trough. Recovery all month. Bull phase.
May Wk1: Near peak ~85–90. Last long window.
May Wk2: PEAK and reversal. Most important flip signal of the year — flip short hard.
May Wk3–4: Full waterfall. All TFs aligned short.
Jun: Near absolute lows. Deepest trough zone. Hold shorts.
Jul: Recovery from Jun low. Rising ~45–60. Supports short-term long trade.
Aug: Continued recovery. Rising toward Sep secondary peak.
Sep Wk1–2: Near secondary peak ~80–85. Last long window.
Sep Wk3: Rolls over. Flip short.
Oct–Nov: Post-Sep decline. Bear phase.
Nov Wk4: Turn up decisively.
Dec: MASSIVE YEAR-END RALLY. 23-YR surges from ~35–40 to ~95–100 by Dec 31. Highest conviction long of the year.

=== PLAYBOOK SIGNALS ===
NZD BUY SIGNAL 1: Late November Wk4 — enter long for Dec year-end surge.
NZD BUY SIGNAL 2: March Wk3 — enter long for Apr–May bull run.
NZD SELL SIGNAL 1: May Wk2 — all TFs flip. Highest conviction short of the year.
NZD SELL SIGNAL 2: September Wk3 — secondary peak flip. High conviction short.

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY (one paragraph covering the macro seasonal arc for NZD across the full year)

2. MONTH-BY-MONTH BIAS TABLE (Jan through Dec, with overall directional bias and best entry timing per month)

3. WEEK-BY-WEEK CURRENT MONTH BIAS (identify the current month and give specific week-by-week guidance with: bias, reasoning from all 3 timeframes, and the best trade action)

4. KEY SEASONAL TRADE SETUPS (top 3 highest conviction trades for NZD across the year with entry, expected duration, and conviction level)

Format your response clearly with headers. Be specific, analytical, and professional. Use exact week references.
`;
