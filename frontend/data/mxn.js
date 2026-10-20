/**
 * data/mxn.js — Mexican Peso (MXN/USD) seasonal data
 * Source: Moore Research Center · 26-Year (1994–2019) · 15-Year · 5-Year
 */

const ASSET_CONFIG = {
  id:       "mxn",
  name:     "MXN / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 26-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Mexican Peso CME Futures · 26-Year Seasonal (1994–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "26-YR",
  ltSigKey: "sig26",
  ltKey:    "s26",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sig26: "chop",
    combined: "chop", combinedLabel: "CHOP / LONG LEAN", stars: 2,
    note: "Year opens in the mid-40s to mid-60s across all TFs. 5-YR and 15-YR already drifting higher; 26-YR chops near its open before joining the turn late in the month — early-stage base-building ahead of the spring rally.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s26:"chop", com:"CHOP ★★☆☆☆", note:"Year opens choppy near 45–65. 15-YR already trending higher; others searching for direction." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s26:"bear", com:"MIXED ★★☆☆☆", note:"5-YR and 15-YR climb together while 26-YR slips toward a local trough near 50 — divergence to monitor." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s26:"chop", com:"LONG LEAN ★★☆☆☆", note:"26-YR bases and starts to turn up from its dip; 5-YR and 15-YR continue higher." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★☆☆", note:"All three TFs align higher heading into February — early bull confluence builds." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig26: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Broad rising tide develops across all three timeframes as MXN builds toward its strongest seasonal window of the year.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★☆☆", note:"Continuation of January's turn — all three TFs climbing together." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★☆☆", note:"5-YR pushes toward 75, 15-YR toward the low-60s, 26-YR through the 60s. Sustained alignment." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★☆☆", note:"Steady climb continues — all TFs grinding higher into the historically strong March window." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★☆", note:"Late-month acceleration begins as all three TFs prepare to enter the year's strongest rally phase." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sig26: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "The year's strongest rally. 5-YR explodes toward its yearly peak near 95–100 while 15-YR and 26-YR surge close behind — rare full-timeframe alignment heading into the April top.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★☆", note:"5-YR explodes from the mid-70s toward 95–100; 15-YR and 26-YR following hard behind. High-conviction window opens." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★★", note:"5-YR hits its yearly peak near 100; 15-YR and 26-YR continue climbing into the high-70s/80s." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★☆", note:"26-YR and 15-YR converge with 5-YR near 85–90 as the rally broadens — a rare full alignment across all TFs." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★☆", note:"Momentum carries into early April. Hold longs — the absolute yearly peak is just ahead." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "chop", sig26: "bull",
    combined: "flip", combinedLabel: "ROLLING TOP — FLIP SHORT", stars: 5,
    note: "THE DEFINING MONTH. A textbook rolling top: 26-YR pushes on to its absolute yearly peak (~100) even as 5-YR — having already topped in March — turns down first, with 15-YR rolling over in between. By month's end all three TFs have flipped short together, the single highest-conviction reversal of MXN's entire year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s26:"bull", com:"CHOP / WATCH ★★★☆☆", note:"5-YR stalls near its March highs while 15-YR and 26-YR continue pushing toward their own peaks — early divergence warning." },
      { wk:"Wk 2", s5:"bear", s15:"bull", s26:"bull", com:"DIVERGENCE ★★★★☆", note:"26-YR reaches its absolute yearly peak near 100 even as 5-YR turns down — the first crack appears in the rally." },
      { wk:"Wk 3", s5:"bear", s15:"chop", s26:"bear", com:"FLIP BUILDING ★★★★★", note:"15-YR rolls over from its own high; 5-YR accelerates lower. Two of three TFs now declining — flip confirming." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★★", note:"Full rollover — all three timeframes turn down together. The year's defining reversal is in; flip decisively to short." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sig26: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Clean continuation of April's flip. The broad seasonal waterfall takes hold — all three TFs falling together from their respective peaks toward the June trough.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★☆", note:"Clean continuation of April's flip — all three TFs falling together from their respective peaks." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★☆", note:"Decline steepens. 5-YR and 15-YR both shedding ~15–20 points; 26-YR following close behind." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★★", note:"Sharp acceleration lower as the broad seasonal waterfall takes full hold across all timeframes." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s26:"chop", com:"SHORT ★★★★☆", note:"26-YR begins to flatten in the mid-50s while 5-YR and 15-YR continue falling toward the June trough." },
    ]
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig26: "bear",
    combined: "bear", combinedLabel: "SHORT / TROUGH", stars: 3,
    note: "The year's first major trough. 5-YR and 15-YR both probe into the mid-30s before a sharp, broad V-shaped rebound launches a counter-trend rally into July.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★☆", note:"Continued decline toward the year's first major trough — 5-YR and 15-YR both probing into the high-30s." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s26:"chop", com:"TROUGH ★★★☆☆", note:"Absolute mid-year low forms near 33–38 across 5-YR and 15-YR; 26-YR also bottoms in the high-30s." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s26:"bull", com:"TURN ★★★☆☆", note:"Sharp V-shaped rebound begins — all three TFs turn up off the trough simultaneously." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★☆", note:"Recovery confirmed — broad rally off the June low carries into July." },
    ]
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig26: "bull",
    combined: "bull", combinedLabel: "LONG (counter-trend)", stars: 3,
    note: "A strong but ultimately short-lived counter-trend rally. 15-YR leads, pushing toward its own secondary peak near 88–90 just as the calendar turns into August.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★☆☆", note:"Rally continues off the June trough — 15-YR leading the charge toward its own secondary peak." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s26:"bull", com:"LONG ★★★★☆", note:"5-YR and 26-YR both push into the mid-70s/80s; broad alignment supports the counter-trend long." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s26:"bull", com:"LONG / WATCH ★★★☆☆", note:"15-YR nears its early-August top while 5-YR begins to flatten — first signs the bounce is maturing." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s26:"chop", com:"FADING ★★☆☆☆", note:"Momentum starts fading on 5-YR and 26-YR even as 15-YR makes its final push toward the secondary peak." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "chop", sig26: "bear",
    combined: "flip", combinedLabel: "SECONDARY PEAK → SHARP REVERSAL", stars: 4,
    note: "A textbook divergence top followed by the single sharpest reversal of MXN's year: 15-YR makes its secondary peak near 88–90 in early August — even as 5-YR is already declining — then collapses violently toward the low-20s within weeks.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bull", s26:"chop", com:"DIVERGENCE TOP ★★★★☆", note:"15-YR makes its secondary yearly peak near 88–90 even as 5-YR is already declining — a textbook divergence top." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s26:"bear", com:"SHARP REVERSAL ★★★★★", note:"15-YR reverses violently — its sharpest single-month collapse of the year. All three TFs now aligned lower." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★☆", note:"Steep continuation lower; 15-YR plunges toward the low-20s, dragging the combined picture decisively bearish." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s26:"chop", com:"SHORT ★★★☆☆", note:"26-YR begins to flatten in the high-30s/40s as 5-YR and 15-YR continue probing toward the September lows." },
    ]
  },
  {
    month: "September", sig5: "chop", sig15: "chop", sig26: "chop",
    combined: "chop", combinedLabel: "CHOP / NEUTRAL", stars: 2,
    note: "A directionless consolidation at depressed levels. 26-YR slips to its own yearly low near 28 while 5-YR and 15-YR chop sideways in a tight band — no timeframe offers a clean edge.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s26:"bear", com:"CHOP ★★☆☆☆", note:"26-YR continues to slip toward its own September low near 28 while 5-YR and 15-YR stabilise in the high-30s/40s." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s26:"chop", com:"CHOP ★★☆☆☆", note:"All three TFs chop sideways in a tight band — no clear directional edge." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s26:"chop", com:"WEAK BOUNCE ATTEMPT ★★☆☆☆", note:"5-YR attempts a modest bounce while 15-YR and 26-YR remain range-bound." },
      { wk:"Wk 4", s5:"chop", s15:"bull", s26:"bull", com:"TURN BUILDING ★★☆☆☆", note:"26-YR and 15-YR begin a tentative turn higher, setting up October's partial recovery attempt." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sig26: "chop",
    combined: "chop", combinedLabel: "WEAK BOUNCE / CAUTION", stars: 2,
    note: "A brief, unconvincing recovery attempt. 5-YR and 15-YR push higher off the September base, but 26-YR fails to confirm — and by month's end the bounce fails outright, opening the door to November's collapse.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s26:"chop", com:"WEAK BOUNCE ★★☆☆☆", note:"5-YR and 15-YR push higher off the September base; 26-YR lags, capped near the low-30s." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s26:"chop", com:"BOUNCE / CAUTION ★★☆☆☆", note:"Bounce continues but conviction is thin — 26-YR fails to confirm the move higher." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s26:"chop", com:"STALLING ★★☆☆☆", note:"Recovery stalls. All three TFs flatten near their respective October highs without breaking out." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s26:"bear", com:"FAILED BOUNCE → SHORT ★★★★☆", note:"The bounce fails decisively — all three TFs roll over together, opening the door to the November collapse." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sig26: "bear",
    combined: "bear", combinedLabel: "SHORT — HIGHEST CONVICTION", stars: 5,
    note: "THE ANNUAL WATERFALL. The sharpest, deepest decline of MXN's entire year — October's failed bounce gives way to a violent collapse that drives 5-YR and 15-YR toward single digits, the single highest-conviction short window on the calendar.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★★", note:"October's failed bounce gives way to a violent collapse — all three TFs falling together from already-depressed levels." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★★", note:"Steepest single-week decline of the year. 5-YR and 15-YR plunge toward single digits." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s26:"bear", com:"SHORT ★★★★★", note:"Approaching the absolute annual lows — 5-YR and 15-YR scrape along near zero; 26-YR not far behind." },
      { wk:"Wk 4", s5:"bear", s15:"chop", s26:"chop", com:"CAPITULATION LOW ★★★★☆", note:"Capitulation low forms. 26-YR shows the first signs of basing while 5-YR and 15-YR remain pinned near the floor." },
    ]
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig26: "chop",
    combined: "chop", combinedLabel: "CHOP / BASE-BUILDING", stars: 2,
    note: "A choppy, uneven bottoming process closes the year. 26-YR stages a sharp but brief spike off the November low while 5-YR and 15-YR drift unevenly higher — directionless trade as the calendar turns over near multi-year lows.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s26:"bull", com:"SPIKE OFF LOW ★★☆☆☆", note:"26-YR stages a sharp but brief spike off the November low while 5-YR and 15-YR remain range-bound near the floor." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s26:"chop", com:"TENTATIVE RECOVERY ★★☆☆☆", note:"5-YR and 15-YR begin a tentative recovery; 26-YR gives back its early-month spike." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s26:"chop", com:"CHOP ★★☆☆☆", note:"Choppy, directionless trade as the year winds down — no TF shows conviction either way." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s26:"bear", com:"MIXED CLOSE ★★☆☆☆", note:"5-YR and 15-YR close the year on a modest uptick toward the high-teens/low-20s; 26-YR drifts lower into the new year's open near 8–9." },
    ]
  },
];

const SEASONAL_DATA = `
MEXICAN PESO (MXN/USD) — SEASONAL TENDENCY ANALYSIS
Source: Moore Research Center, 26-Year (1994–2019), 15-Year, 5-Year overlays.

=== 5-YEAR SEASONAL ===
Jan–Feb: Choppy-to-higher base-building from the mid-60s, climbing toward 75.
Mar: Explosive rally — hits the absolute yearly peak near 95–100.
Apr: Stalls near the March high then turns down — first TF to flip short.
May–Jun: Full waterfall to the mid-year trough near 33–38.
Jun Wk3–4: Sharp V-shaped rebound off the trough — turns up first.
Jul: Counter-trend rally continues, pushing into the mid-70s before flattening.
Aug: Already declining as 15-YR makes its secondary peak — leads the next leg down.
Sep: Choppy basing near 35–48; attempts a modest bounce Wk3.
Oct: Weak bounce fails by Wk4 — rolls back over.
Nov: Steepest decline of the year — collapses toward single digits.
Dec: Choppy, uneven bottoming; closes the year near 19.

=== 15-YEAR SEASONAL ===
Jan–Feb: Steady climb from the mid-40s toward the low-60s.
Mar: Strong rally continues — pushes into the high-70s/80s.
Apr: Still rising early in the month, then rolls over mid-month as the rally tops out.
May–Jun: Sharp decline to the mid-year trough near 38.
Jul: Strong counter-trend bounce — leads the rally toward its own secondary peak.
Aug Wk1: SECONDARY YEARLY PEAK ~88–90 — even as 5-YR is already falling (key divergence top).
Aug Wk2–4: Violent reversal — the sharpest single-month collapse of the year, toward the low-20s.
Sep–Oct: Choppy consolidation and a weak bounce attempt that ultimately fails.
Nov: Collapses toward the annual low alongside 5-YR.
Dec: Uneven recovery; closes the year near 15.

=== 26-YEAR SEASONAL ===
Jan: Opens near 50–65, choppy, with a brief dip toward 50 mid-month before turning up.
Feb–Mar: Joins the broad rally, climbing from the 60s into the 80s–90s.
Apr: ABSOLUTE YEARLY PEAK ~100 reached mid-month — the last TF to top, confirming the rolling-top reversal.
May–Jun: Declines to the mid-year trough near 33–38, alongside 5-YR and 15-YR.
Jul–Aug: Counter-trend recovery toward the high-70s/80s, then rolls over with the others.
Sep: Slips to its own yearly low near 28.
Oct: Fails to confirm the 5-YR/15-YR bounce — stays capped near 30–37.
Nov: Declines into the single digits alongside the other timeframes.
Dec: Stages a sharp but brief spike toward 28 early in the month, then fades to close the year near 8–9 — the lowest TF reading at year-end.

=== PLAYBOOK SIGNALS ===
MXN BUY SIGNAL: January–March — broad multi-timeframe rally building toward the April top. The only sustained long window of the year.
MXN SELL SIGNAL (PRIMARY): April Wk3–4 — the defining rolling-top flip. Highest-conviction short entry; per the trading playbook, "MXN anytime Wk1–4, hold to early December" — i.e. once short, the position is designed to be held through the bulk of the year.
MXN SELL SIGNAL (SECONDARY): August Wk1–2 — 15-YR's secondary-peak reversal is the sharpest single-month collapse of the year and reinforces the broader short.
MXN HIGHEST-CONVICTION WINDOW: November — the steepest, deepest decline on the calendar; all three timeframes plunge toward single digits together.

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the seasonal data above, provide:

1. YEARLY BIAS SUMMARY (one paragraph covering the macro seasonal arc for MXN across the full year)

2. MONTH-BY-MONTH BIAS TABLE (Jan through Dec, with overall directional bias and best entry timing per month)

3. WEEK-BY-WEEK CURRENT MONTH BIAS (identify the current month and give specific week-by-week guidance with: bias, reasoning from all 3 timeframes, and the best trade action)

4. KEY SEASONAL TRADE SETUPS (top 3 highest conviction trades for MXN across the year with entry, expected duration, and conviction level)

Format your response clearly with headers. Be specific, analytical, and professional. Use exact week references.
`;
