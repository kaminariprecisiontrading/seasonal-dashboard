const ASSET_CONFIG = {
  id:       "chf",
  name:     "CHF / USD",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Swiss Franc CME · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "40-YR opens ~75 and declines. 5-YR opens ~70 and drops. 15-YR low and choppy. All TFs declining from Jan open. Structural bear month.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★☆☆", note:"All TFs declining from open. No reason to be long." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continued decline. 40-YR dropping sharply." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Broad weakness. Hold shorts." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Late Jan — approaching Feb continuation lows." },
    ]
  },
  {
    month: "February",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "All three TFs continuing lower. 40-YR drops toward 20–25 by late Feb. 5-YR also declining. 15-YR grinding low. Deep seasonal weakness.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continuation of Jan decline. Hold shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Mid-Feb — all TFs in downtrend." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Approaching trough. Still short but watch for reversal signals." },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★☆☆☆", note:"Late Feb — potential trough forming. Close shorts, prepare for flip." },
    ]
  },
  {
    month: "March",
    sig5: "bull", sig15: "bull", sig40: "flip",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "ANNUAL TROUGH MONTH. 40-YR hits absolute low (~5–10) mid-Mar then reverses sharply. 15-YR and 5-YR also bottom and turn. Strong flip long from Wk2–3.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT / FLIP ★★★☆☆", note:"Still weak early March. Watch for trough confirmation — close shorts." },
      { wk:"Wk 2", s5:"bull", s15:"chop", s40:"chop", com:"FLIP → LONG ★★★★☆", note:"40-YR hits absolute trough mid-Mar. FLIP LONG on reversal confirmation." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"All TFs turning up. Strong long entry — annual trough confirmed." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Recovery momentum building. Hold longs into Apr." },
    ]
  },
  {
    month: "April",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery continues from Mar trough. 40-YR rising. 15-YR bouncing. 5-YR rising. Bull bias but not the peak month — building toward May spike.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"All TFs recovering from Mar trough. Hold longs." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"Continued recovery. Building toward May." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"Momentum ongoing. Apr is a bridge month — stay long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"Apr end — preparing for May 5-YR spike. Increase exposure." },
    ]
  },
  {
    month: "May",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "5-YR SPIKES TO ABSOLUTE PEAK ~100 mid-May. 15-YR also peaks ~75. 40-YR rising more moderately. Strong LONG Wk1–2 then CRITICAL FLIP SHORT as 5-YR hits 100.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"All TFs rising. Strong long into the May spike." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR approaching peak ~100. Hold longs — peak imminent." },
      { wk:"Wk 3", s5:"flip", s15:"bear", s40:"chop", com:"FLIP → SHORT ★★★★★", note:"5-YR hits ~100 mid-May. FLIP SHORT immediately. 15-YR also rolling." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs reversing. Post-peak waterfall. High conviction short." },
    ]
  },
  {
    month: "June",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "5-YR collapses from May peak. 40-YR also declining. 15-YR rolling over. Post-May waterfall continues. All TFs depressed — hold shorts from May flip.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continuation of May waterfall. Hold shorts." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Broad decline. All TFs falling." },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Mid-Jun — no relief bounce. Stay short." },
      { wk:"Wk 4", s5:"chop", s15:"bear", s40:"chop", com:"CHOP ★★☆☆☆", note:"Late Jun — approaching Jul trough. Begin covering shorts." },
    ]
  },
  {
    month: "July",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "All three TFs near multi-month lows. 40-YR at ~15–20. 5-YR and 15-YR also depressed. Deep seasonal trough zone — bear into early Jul then watch for base.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"All TFs at lows. Short bias but approaching trough." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Trough zone. Close remaining shorts — risk/reward deteriorating." },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★☆☆☆", note:"Base building. No directional edge — stand aside." },
      { wk:"Wk 4", s5:"bull", s15:"chop", s40:"bull", com:"CHOP / LONG ★★☆☆☆", note:"40-YR turning up. Early positioning for Aug-Sep recovery." },
    ]
  },
  {
    month: "August",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery begins. 15-YR shows bounce. 5-YR also attempting recovery. 40-YR beginning to turn up from Jul lows. Early BULL — conviction building toward Sep.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"All TFs recovering. Build long positions." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★☆☆", note:"Recovery momentum. Hold longs toward Sep peak." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Strong Aug rally. All TFs rising toward Sep." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"Building into Sep peak. Increase long exposure." },
    ]
  },
  {
    month: "September",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "15-YR spikes to absolute peak ~100 in Sep. 5-YR also at highs. 40-YR rising strongly. Strong LONG early Sep then FLIP SHORT as 15-YR peaks.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs surging. Highest conviction long — Sep peak approaching." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR approaching peak ~100. Hold longs — peak imminent." },
      { wk:"Wk 3", s5:"flip", s15:"flip", s40:"bull", com:"FLIP → SHORT ★★★★★", note:"15-YR peaks ~100 mid-Sep. FLIP SHORT on peak confirmation." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Post-peak reversal. All TFs rolling. Hold shorts into Oct." },
    ]
  },
  {
    month: "October",
    sig5: "bear", sig15: "bear", sig40: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Post-Sep peak decline. 15-YR rolling over from 100. 5-YR declining. 40-YR pulling back. Hold shorts from Sep flip — mid-Oct stabilisation possible.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Post-Sep waterfall. Hold all short positions." },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★☆", note:"Continued decline. All TFs falling." },
      { wk:"Wk 3", s5:"chop", s15:"bear", s40:"chop", com:"CHOP ★★★☆☆", note:"Mid-Oct possible stabilisation — trim shorts, hold core." },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★☆☆", note:"Late Oct — resuming decline toward Nov lows." },
    ]
  },
  {
    month: "November",
    sig5: "bear", sig15: "bear", sig40: "bull",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 4,
    note: "40-YR begins its massive year-end rally. 15-YR also turning up. 5-YR low but stabilising. BEAR early Nov → FLIP LONG as 40-YR surges into year-end.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"chop", com:"SHORT ★★★☆☆", note:"Early Nov still weak. Hold remaining shorts." },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"bull", com:"CHOP ★★★☆☆", note:"40-YR turning up. Mixed signals — begin covering shorts." },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★☆", note:"40-YR and 15-YR both surging. FLIP LONG — year-end rally begins." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs recovering. Strong long into Dec year-end surge." },
    ]
  },
  {
    month: "December",
    sig5: "bull", sig15: "bull", sig40: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "HIGHEST CONVICTION LONG OF THE YEAR. 40-YR rockets to absolute peak ~100 at Dec 31. 15-YR surges to ~90. 5-YR recovering. Year-end CHF surge — hold longs into year close.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Year-end surge fully underway. All TFs rising strongly." },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR climbing toward 100. Hold all long positions." },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Strong momentum. 40-YR approaching annual peak." },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR peaks at ~100 Dec 31. Hold into year close — maximum seasonal tailwind." },
    ]
  },
];

const SEASONAL_DATA = `
CHF / USD — Swiss Franc (CME) Seasonal Tendency Data
Source: Moore Research Center © 2020
Timeframes: 5-Year (pink) | 15-Year (brown) | 40-Year (blue, 1980–2019)

=== 40-YEAR SEASONAL READINGS (1980–2019) ===
Jan: Opens ~75, declines all month.
Feb: Continues lower toward ~20–25. Near absolute lows by late Feb.
Mar: ANNUAL TROUGH — hits ~5–10 mid-Mar then sharp reversal.
Apr: Recovery. Rising from Mar trough.
May: Continuing higher.
Jun: Declining post-May.
Jul: Near lows ~15–20. Trough zone.
Aug: Turning up. Recovery begins.
Sep: Rising strongly toward peak.
Oct: Post-Sep decline.
Nov: TURNS UP — begins massive year-end rally.
Dec: ABSOLUTE ANNUAL PEAK ~100 at Dec 31. Highest conviction long of the year.

=== 15-YEAR SEASONAL READINGS ===
Jan: Low and choppy. Declining.
Feb: Grinding lower.
Mar: Bottoms with 40-YR. Recovery follows.
Apr: Rising.
May: Peaks ~75 mid-May. Rolling over Wk3–4.
Jun: Declining.
Jul: Depressed.
Aug: Bounce beginning.
Sep: PEAKS ~100 mid-Sep — simultaneous with 5-YR spike. Then collapses.
Oct: Rolling over from Sep peak.
Nov: Turning up late Nov with 40-YR.
Dec: Surging to ~90. High conviction long.

=== 5-YEAR SEASONAL READINGS ===
Jan: Opens ~70, drops sharply.
Feb: Declining.
Mar: Recovers with other TFs from trough.
Apr: Rising.
May: SPIKES TO ~100 mid-May — ABSOLUTE PEAK. Flip short immediately.
Jun: Collapses from May peak.
Jul: Depressed.
Aug: Recovery beginning.
Sep: Spikes to highs — peak before 15-YR. Flip short mid-Sep.
Oct: Declining.
Nov: Low but stabilising late Nov.
Dec: Recovering.

=== KEY SEASONAL SIGNALS ===
HIGHEST CONVICTION LONG: December (40-YR peaks at 100 Dec 31 — year-end CHF surge)
SECOND CONVICTION LONG: September Wk1–2 (all TFs surging before 15-YR peak)
HIGHEST CONVICTION SHORT: May Wk3 (5-YR peaks ~100) + September Wk3 (15-YR peaks ~100)
ANNUAL TROUGH (40-YR): Mid-March
ANNUAL PEAK (40-YR): December 31
KEY DIVERGENCE: 5-YR peaks in May while 40-YR does not peak until December — two separate peak/trough cycles
DOUBLE FLIP PATTERN: Mar (trough → long), May (peak → short), Sep (peak → short), Nov (trough → long)

=== TASK ===
You are a professional seasonal trading analyst. Based on the CHF/USD seasonal data above, produce:
1. YEARLY BIAS SUMMARY — the macro arc Jan–Dec in 3–4 sentences
2. MONTH-BY-MONTH TABLE — for each month: directional bias, conviction (★), and one key action note
3. CURRENT MONTH PRIORITY — detailed week-by-week breakdown for the current calendar month
4. TOP 3 TRADE SETUPS — specific entry window, signal confirmation, and target/stop rationale
Format as clean plain text, no markdown headers needed.
`;
