const ASSET_CONFIG = {
  id:       "cad",
  name:     "CAD / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Canadian Dollar CME · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "5-YR spikes to ~95 right at Jan 1 open then collapses immediately. All TFs declining. Fade the open spike — structural bear month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"5-YR peaks Jan 1 — sell any open strength immediately" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"All TFs declining. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continued broad weakness across all timeframes." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Approaching Feb lows — watch for early turn signals." },
    ]
  },
  {
    month: "February",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All three TFs grinding lower. 40-YR approaches ~50, 15-YR near 15–25, 5-YR continuing waterfall. Broad seasonal weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continuation of Jan decline. No bounce expected." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Mid-Feb lows forming. All TFs in downtrend." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Approaching potential Feb trough — begin monitoring for turn." },
      { wk:"Wk 4", s5:"chop", s15:"bear", s40:"chop", com:"CHOP ★★☆☆☆", note:"Late Feb stabilisation. 40-YR and 5-YR beginning to base." },
    ]
  },
  {
    month: "March",
    sig5: "chop", sig15: "bear", sig40: "bull",
    combined: "chop", combinedLabel: "CHOP / FLIP", stars: 2,
    note: "Transition month. 40-YR begins recovery from Feb lows. 15-YR still weak. 5-YR bottoms and turns. TFs diverging — no clean directional bias.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"chop", com:"CHOP ★★☆☆☆", note:"Still weak early March. Wait for trough confirmation." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"bull", com:"CHOP ★★☆☆☆", note:"40-YR leading recovery. 15-YR lagging. Mixed." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s40:"bull", com:"LONG ★★★☆☆", note:"5-YR and 40-YR both recovering. Early long bias." },
      { wk:"Wk 4", s5:"bull", s15:"chop", s40:"bull", com:"LONG ★★★☆☆", note:"Building into Apr. 15-YR still lagging but trend improving." },
    ]
  },
  {
    month: "April",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "All TFs rallying. 5-YR spikes hard to ~85–90 mid-April. 40-YR and 15-YR also rising. Strong bull window Wk1–2, then fade as 5-YR peaks.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"All TFs rising — strong bull confluence. High conviction long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR approaching peak ~85–90. Hold longs into mid-Apr." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"CHOP ★★★☆☆", note:"5-YR rolling over — begin taking profits. 40-YR still up." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★☆☆☆", note:"5-YR fading. Mixed signals. Reduce long exposure." },
    ]
  },
  {
    month: "May",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "40-YR peaks first half of May (~85) then rolls over. 5-YR collapses from April peak to ~25–30. 15-YR also topping. Strong bear month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bull", com:"CHOP ★★☆☆☆", note:"40-YR still near peak early May. 5-YR already collapsing." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"40-YR rolling from peak. All TFs turning south." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Full waterfall. All TFs in decline. Short with conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continued broad decline into Jun low." },
    ]
  },
  {
    month: "June",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All three TFs near lows. 5-YR ~25, 15-YR ~30, 40-YR also declining. Deep seasonal trough zone. Hold shorts from May.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continuation of May waterfall. Hold short positions." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Broad lows. All TFs depressed." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s40:"chop", com:"CHOP ★★☆☆☆", note:"Possible base forming. Watch for 5-YR turn." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★☆☆☆", note:"Late Jun — transition approaching. Close shorts, prepare for reversal." },
    ]
  },
  {
    month: "July",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Powerful recovery. 40-YR rising from ~55 toward 70+. 5-YR spikes sharply to ~90–95 early Jul. 15-YR also rising. All TFs in recovery — high conviction long.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs turning up simultaneously from Jun trough. Strong entry." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR leading spike to ~90–95. Momentum long." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"40-YR and 15-YR continuing higher. Hold longs." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"5-YR may be topping — trim some exposure, hold core long." },
    ]
  },
  {
    month: "August",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR at or near peak (~90–95). 40-YR continuing higher toward Sep peak. 15-YR rising. Bull bias Wk1–2 then watch for 5-YR rollover late Aug.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR peak zone. 40-YR and 15-YR both rising. Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Approaching seasonal highs. Trail stops on 5-YR positions." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"5-YR rolling. 40-YR still climbing toward Sep peak." },
      { wk:"Wk 4", s5:"bear", s15:"bull", s40:"bull", com:"CHOP ★★★☆☆", note:"5-YR declining but 40-YR near peak — hold 40-YR longs only." },
    ]
  },
  {
    month: "September",
    sig5: "bear", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "HIGHEST CONVICTION REVERSAL. 40-YR and 15-YR hit absolute annual peak ~100 mid-Sep. Then all TFs collapse simultaneously. Long Wk1, flip short Wk2–3.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"40-YR still rising toward peak. 5-YR already declining." },
      { wk:"Wk 2", s5:"bear", s15:"bull", s40:"bull", com:"FLIP → SHORT ★★★★★", note:"40-YR and 15-YR peak ~100 mid-Sep. FLIP SHORT on peak confirmation." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs rolling over simultaneously. Highest conviction short entry of the year." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Post-peak waterfall begins. Hold short into Oct." },
    ]
  },
  {
    month: "October",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Sharp post-Sep decline. 40-YR drops from 100 toward ~75. 15-YR collapsing. 5-YR also falling. Hold shorts from Sep flip.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Continuation of Sep waterfall. High conviction — hold all shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Broad decline. All TFs falling." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Mid-Oct — no relief. Continue short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Late Oct — begin watching for Nov trough signals." },
    ]
  },
  {
    month: "November",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Continued broad decline. 40-YR falling toward 50. 15-YR and 5-YR both low and falling. Bear bias throughout but severity easing late Nov.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Continued post-Sep decline. Hold remaining shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Mid-Nov weakness. All TFs depressed." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s40:"bear", com:"CHOP ★★☆☆☆", note:"5-YR stabilising. Consider covering short exposure." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bear", com:"CHOP ★★☆☆☆", note:"Late Nov — approaching annual lows. Close shorts, watch for Dec base." },
    ]
  },
  {
    month: "December",
    sig5: "chop", sig15: "chop", sig40: "bear",
    combined: "chop", combinedLabel: "CHOP / BASE", stars: 2,
    note: "All TFs converge near 0–25 — annual low zone. 40-YR still declining. 5-YR and 15-YR beginning to base. Year-end recovery begins very late Dec into Jan cycle.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★☆☆☆", note:"All TFs near annual lows. No recovery yet." },
      { wk:"Wk 2", s5:"chop", s15:"bear", s40:"bear", com:"CHOP ★★☆☆☆", note:"Base building. Avoid shorts — risk/reward deteriorating." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"CHOP ★★☆☆☆", note:"Sideways consolidation at lows." },
      { wk:"Wk 4", s5:"bull", s15:"chop", s40:"chop", com:"CHOP / LONG ★★☆☆☆", note:"5-YR turns up late Dec. Early positioning for Jan cycle." },
    ]
  },
];

const SEASONAL_DATA = `
CAD / USD — Canadian Dollar (CME) Seasonal Tendency Data
Source: Moore Research Center © 2020
Timeframes: 5-Year (pink) | 15-Year (brown) | 40-Year (blue, 1980–2019)

=== 40-YEAR SEASONAL READINGS (1980–2019) ===
Jan: Declining from ~75 open. Broad bear.
Feb: Continuing lower toward ~50. Structural weakness.
Mar: Beginning recovery from Feb lows. 40-YR leads the turn.
Apr: Rising. Bull phase building.
May: Peaks mid-May (~85) then rolls over sharply.
Jun: Declining. Seasonal trough zone.
Jul: Strong recovery. Rising from ~55 toward 70+.
Aug: Continuing higher toward Sep peak.
Sep: ABSOLUTE ANNUAL PEAK ~100 mid-Sep. Then collapses.
Oct: Sharp post-peak waterfall. Drops from 100 toward ~75.
Nov: Continued decline toward ~50.
Dec: Near annual lows. Base forming late Dec.

=== 15-YEAR SEASONAL READINGS ===
Jan: Declining from low start (~25–35). Broad weakness.
Feb: Grinding lower ~15–25.
Mar: Still weak but stabilising late Mar.
Apr: Recovering — bouncing into mid-range.
May: Peaking and rolling over with 40-YR.
Jun: Low and declining.
Jul: Rising — bull recovery.
Aug: Continuing higher.
Sep: Peaks ~100 simultaneously with 40-YR mid-Sep. Then collapses.
Oct: Sharp decline.
Nov: Low and falling.
Dec: Near lows. Late stabilisation.

=== 5-YEAR SEASONAL READINGS ===
Jan: Spikes to ~95 at Jan 1 open — IMMEDIATE SELL. Then collapses all month.
Feb: Continuing waterfall.
Mar: Bottoms late Feb/early Mar. Recovery begins.
Apr: Spikes sharply to ~85–90 mid-Apr. Peak risk Wk2–3.
May: Collapses from Apr peak to ~25–30 by May end.
Jun: Near absolute trough ~25.
Jul: Spikes hard to ~90–95 early Jul. Powerful recovery.
Aug: At or near peak ~90–95. Wk3–4 rolling.
Sep: Already declining — 5-YR peaks before 40-YR/15-YR.
Oct: Falling.
Nov: Low.
Dec: Near lows late Nov. Very late Dec upturn.

=== KEY SEASONAL SIGNALS ===
HIGHEST CONVICTION LONG: July Wk1–2 (all TFs recovering from Jun trough)
HIGHEST CONVICTION SHORT: September Wk2–3 (40-YR + 15-YR peak ~100, flip short)
SECOND CONVICTION LONG: April Wk1–2 (all TFs rising)
SECOND CONVICTION SHORT: May Wk3–4 (post-Apr peak waterfall)
ANNUAL PEAK: Mid-September (40-YR + 15-YR unanimous ~100)
ANNUAL TROUGH: December (all TFs near 0–25)
KEY DIVERGENCE: 5-YR peaks ahead of 40-YR in both Apr and Jul/Aug — use 5-YR as early warning to trim longs

=== TASK ===
You are a professional seasonal trading analyst. Based on the CAD/USD seasonal data above, produce:
1. YEARLY BIAS SUMMARY — the macro arc Jan–Dec in 3–4 sentences
2. MONTH-BY-MONTH TABLE — for each month: directional bias, conviction (★), and one key action note
3. CURRENT MONTH PRIORITY — detailed week-by-week breakdown for the current calendar month
4. TOP 3 TRADE SETUPS — specific entry window, signal confirmation, and target/stop rationale
Format as clean plain text, no markdown headers needed.
`;
