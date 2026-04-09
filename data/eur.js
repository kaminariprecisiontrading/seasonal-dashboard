const ASSET_CONFIG = {
  id:       "eur",
  name:     "EUR / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 22-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · EuroFX CME · 22-Year Seasonal (1998–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "22-YR",
  ltSigKey: "sig22",
  ltKey:    "s22",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January",
    sig5: "bear", sig15: "bear", sig22: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "5-YR spikes to ~100 at Jan 1 open — immediate sell. 22-YR opens ~90 and declines. 15-YR ~65 and declining. All TFs dropping from Jan open. Structural bear month.",
    weeks: [
      { wk:"Wk 1", s5:"flip", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"5-YR peaks Jan 1 — sell immediately on open. 22-YR and 15-YR both declining." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"All TFs declining. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"Broad waterfall. Continue short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★☆☆", note:"Late Jan — approaching Feb continuation. Stay short." },
    ]
  },
  {
    month: "February",
    sig5: "bear", sig15: "bear", sig22: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Continued decline across all TFs. 22-YR drops toward ~35–40. 5-YR continuing waterfall. 15-YR ~30–35. Deep seasonal weakness — approaching trough.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"Continuation of Jan decline." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"Mid-Feb — all TFs in downtrend." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"Approaching Feb/Mar trough. Still short." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★☆☆☆", note:"Late Feb — trough imminent. Begin reducing shorts." },
    ]
  },
  {
    month: "March",
    sig5: "bull", sig15: "bull", sig22: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "All three TFs trough around Mar Wk1–2 (~30–35 range) then sharp recovery. 22-YR bounces from ~35 to ~65. Strong flip long from Wk2–3.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s22:"bear", com:"SHORT / FLIP ★★★☆☆", note:"Still weak. Watch for trough confirmation — close shorts Wk1." },
      { wk:"Wk 2", s5:"bull", s15:"chop", s22:"chop", com:"FLIP → LONG ★★★★☆", note:"All TFs trough mid-Mar. FLIP LONG on bounce confirmation." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s22:"bull", com:"LONG ★★★★☆", note:"Recovery underway. 22-YR bouncing hard from ~35 toward 65." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s22:"bull", com:"LONG ★★★☆☆", note:"Recovery continues into Apr. Hold longs — but Apr is choppy on 22-YR." },
    ]
  },
  {
    month: "April",
    sig5: "chop", sig15: "bull", sig22: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "22-YR flat/choppy mid-range ~45–65. 15-YR rising toward 75–80. 5-YR volatile — rising then choppy. Mixed signals — no clean directional bias. Stand aside or use 15-YR as guide.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", s22:"chop", com:"CHOP ★★☆☆☆", note:"22-YR flat. 15-YR leading higher. No clean entry — wait." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s22:"chop", com:"CHOP ★★☆☆☆", note:"5-YR recovering. Still mixed — 22-YR not confirming." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s22:"chop", com:"CHOP ★★☆☆☆", note:"Continued choppy mid-range. Reduce exposure if long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s22:"chop", com:"CHOP ★★★☆☆", note:"15-YR at highs but 22-YR still flat. Prepare for May reversal." },
    ]
  },
  {
    month: "May",
    sig5: "bear", sig15: "bear", sig22: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "MOST BEARISH MONTH ON 22-YR. 22-YR collapses to near absolute annual low (~5–10). 15-YR peaks ~100 mid-May then collapses. 5-YR also peaks Wk1 then waterfall. LONG Wk1 then STRONG SHORT Wk2–4.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s22:"chop", com:"LONG ★★★☆☆", note:"15-YR approaching peak ~100. Long Wk1 only — exit quickly." },
      { wk:"Wk 2", s5:"bear", s15:"flip", s22:"bear", com:"SHORT ★★★★★", note:"15-YR peaks ~100. 22-YR collapsing. FLIP SHORT immediately." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★★", note:"22-YR in freefall toward 5–10. All TFs declining. Maximum short conviction." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★★", note:"22-YR at/near absolute annual low. Hold shorts into Jun trough." },
    ]
  },
  {
    month: "June",
    sig5: "bull", sig15: "chop", sig22: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "22-YR at/near absolute annual low then recovery begins. 5-YR spikes sharply mid-Jun reaching ~80 — leads the bounce. 15-YR also low. Flip long from Wk2–3 on 5-YR leadership.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★☆☆", note:"Still near annual lows early Jun. Hold shorts from May." },
      { wk:"Wk 2", s5:"bull", s15:"chop", s22:"chop", com:"FLIP → LONG ★★★☆☆", note:"5-YR leading recovery. Close shorts, flip long on 5-YR bounce." },
      { wk:"Wk 3", s5:"bull", s15:"chop", s22:"bull", com:"LONG ★★★☆☆", note:"22-YR beginning recovery. Hold longs." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★☆☆☆", note:"Mixed signals late Jun. Reduce long exposure." },
    ]
  },
  {
    month: "July",
    sig5: "bull", sig15: "chop", sig22: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR spikes hard to ~80–85 early Jul then fades. 22-YR recovering toward 50. 15-YR ~35–50 choppy. High noise — Wk1 long bias only on 5-YR spike, then stand aside.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", s22:"chop", com:"LONG ★★★☆☆", note:"5-YR spike early Jul — long Wk1 only. Exit quickly." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★☆☆☆", note:"5-YR fading. Mixed across all TFs — stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★☆☆☆", note:"No directional edge. Avoid." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★☆☆☆", note:"Late Jul — watching for Aug direction." },
    ]
  },
  {
    month: "August",
    sig5: "chop", sig15: "chop", sig22: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 1,
    note: "All three TFs in mid-range with high volatility. 5-YR between 50–85 (very noisy). 22-YR ~45–55. 15-YR ~35–55. No clean seasonal edge — lowest conviction month of the year.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★☆☆☆☆", note:"No seasonal edge. Stand aside." },
      { wk:"Wk 2", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★☆☆☆☆", note:"High noise. Avoid directional positioning." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★☆☆☆☆", note:"5-YR very volatile. No clean bias." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★☆☆☆☆", note:"Stand aside. Wait for Sep directional clarity." },
    ]
  },
  {
    month: "September",
    sig5: "bear", sig15: "bear", sig22: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "22-YR drops sharply to ~22–25 (Sep trough). 5-YR also declining. 15-YR declining toward 35–40. Clear bear month — Sep seasonal weakness after Aug chop.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", s22:"bear", com:"SHORT ★★★☆☆", note:"22-YR and 15-YR declining. Short bias Wk1." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"All TFs declining. Hold shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"22-YR approaching Sep trough ~22–25." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★☆☆☆", note:"Late Sep — trough zone. Begin covering shorts for Oct bounce." },
    ]
  },
  {
    month: "October",
    sig5: "bear", sig15: "bear", sig22: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 3,
    note: "5-YR spikes to ~85–90 early Oct (bounce from Sep low) then all TFs roll back over mid-Oct. Short into Oct, cover on Wk1 spike, flip short Wk2–4.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", s22:"bull", com:"LONG ★★★☆☆", note:"Bounce from Sep low. 5-YR spike early Oct — take the bounce Wk1 only." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"All TFs roll over mid-Oct. FLIP SHORT — into Nov lows." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"Continued decline into Nov absolute lows." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★☆", note:"Hold shorts. Approaching Nov annual lows." },
    ]
  },
  {
    month: "November",
    sig5: "bear", sig15: "bear", sig22: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 5,
    note: "ABSOLUTE ANNUAL LOWS across all TFs. 22-YR, 15-YR, and 5-YR all converge near 0–10 in November. HIGHEST CONVICTION SHORT of the year — all TFs at annual lows simultaneously.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★★", note:"All TFs at annual lows simultaneously. Maximum short conviction." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★★", note:"Deep lows. Hold all shorts." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s22:"bear", com:"SHORT ★★★★★", note:"Nov annual low confirmed. Begin watching for Dec reversal setup." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s22:"chop", com:"CHOP ★★★☆☆", note:"Late Nov — lows likely in. Cover shorts. Prepare for Dec year-end long." },
    ]
  },
  {
    month: "December",
    sig5: "bull", sig15: "bull", sig22: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "STRONG BULL — year-end EUR recovery. Mirror image of Nov lows. 22-YR surges from ~0 to ~75–80. 15-YR also recovering to ~40. 5-YR recovering. High conviction long from Nov lows.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s22:"bull", com:"LONG ★★★★★", note:"Year-end recovery fully underway. All TFs surging from Nov lows." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s22:"bull", com:"LONG ★★★★★", note:"22-YR climbing hard toward 75–80. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s22:"bull", com:"LONG ★★★★★", note:"Strong momentum. Dec year-end EUR surge." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s22:"bull", com:"LONG ★★★★★", note:"Hold into year close. 22-YR reaching ~75–80 peak at Dec 31." },
    ]
  },
];

const SEASONAL_DATA = `
EUR / USD — EuroFX (CME) Seasonal Tendency Data
Source: Moore Research Center © 2020
Timeframes: 5-Year (pink) | 15-Year (brown) | 22-Year (blue, 1998–2019)
Note: EUR launched 1999 — this is the shortest long-term dataset in the project at 22 years.

=== 22-YEAR SEASONAL READINGS (1998–2019) ===
Jan: Opens ~90 and declines sharply all month.
Feb: Continued decline toward ~35–40.
Mar: TROUGH — all TFs bottom Wk1–2 (~30–35) then sharp bounce to ~65.
Apr: Choppy mid-range ~45–65. No clean trend.
May: COLLAPSES to near absolute annual low ~5–10. Most bearish month on 22-YR.
Jun: Absolute trough then recovery begins.
Jul: Recovering toward 50. Choppy.
Aug: Mid-range ~45–55. High noise.
Sep: Drops to secondary trough ~22–25.
Oct: Brief bounce Wk1 then resumes decline into Nov.
Nov: ABSOLUTE ANNUAL LOW — all TFs converge near 0–10.
Dec: STRONG RECOVERY — surges from 0 to ~75–80. Year-end EUR rally.

=== 15-YEAR SEASONAL READINGS ===
Jan: Declining from ~65.
Feb: Lower ~30–35.
Mar: Bottoms. Recovery.
Apr: Rising toward 75–80.
May: PEAKS ~100 mid-May — then collapses.
Jun: Low. Recovery attempt.
Jul: Choppy ~35–50.
Aug: Mid-range volatile.
Sep: Declining toward 35–40.
Oct: Rolling over Wk2 into Nov.
Nov: Absolute lows ~0–10. Maximum weakness.
Dec: Recovering toward ~40.

=== 5-YEAR SEASONAL READINGS ===
Jan: Peaks at ~100 on Jan 1 open — IMMEDIATE SELL. Collapses all month.
Feb: Continuing waterfall.
Mar: Bottoms and turns Wk2.
Apr: Volatile — rising then choppy.
May: Peaks Wk1 then waterfall.
Jun: Spikes mid-Jun to ~80 — leads recovery.
Jul: Spikes early Jul ~80–85 then fades.
Aug: Extremely volatile 50–85. No edge.
Sep: Declining.
Oct: Spikes early Oct ~85–90 then rolls over.
Nov: Near 0–10 absolute lows.
Dec: Recovering.

=== KEY SEASONAL SIGNALS ===
HIGHEST CONVICTION SHORT: November (all TFs near 0–10 simultaneously)
HIGHEST CONVICTION LONG: December (year-end EUR surge, 22-YR from 0 to ~75–80)
SECOND CONVICTION SHORT: May Wk2–4 (22-YR collapses to annual low ~5–10)
KEY FLIP: March Wk2 (annual trough → long), October Wk1–2 (bounce then short)
LOWEST CONVICTION MONTH: August (all TFs choppy, no seasonal edge)
NOTABLE: EUR 22-YR is the shortest long-term dataset — treat with slightly lower weight vs 40-YR assets
5-YR EARLY SIGNAL: 5-YR consistently peaks ahead of other TFs — Jan 1, Wk1 May, early Oct — use as flip trigger

=== TASK ===
You are a professional seasonal trading analyst. Based on the EUR/USD seasonal data above, produce:
1. YEARLY BIAS SUMMARY — the macro arc Jan–Dec in 3–4 sentences
2. MONTH-BY-MONTH TABLE — for each month: directional bias, conviction (★), and one key action note
3. CURRENT MONTH PRIORITY — detailed week-by-week breakdown for the current calendar month
4. TOP 3 TRADE SETUPS — specific entry window, signal confirmation, and target/stop rationale
Format as clean plain text, no markdown headers needed.
`;
