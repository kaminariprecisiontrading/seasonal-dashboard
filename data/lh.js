// data/lh.js — Lean Hogs (CME) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=23.07 · 15-YR=27.48 · 5-YR=34.33

const ASSET_CONFIG = {
  id:       "lh",
  name:     "Lean Hogs (CME)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Lean Hogs CME (HE) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=23.07, 15-YR=27.48, 5-YR=34.33 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"DEAD ZONE — all TFs flat near low; Jan-Mar worst period in hogs",
    stars:1,
    note:"ALL THREE TFs at depressed levels (~15–25). Lean hogs begins the year in the 'dead zone' — flat lows from January through March. No bull signal. No clean short either — it's already been sold. Avoid trading hogs in January. Worst seasonal window in the complex.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Flat low dead zone; no edge; avoid trading" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs at 15–25; no directional catalyst" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Dead zone continues; await late-March step-up" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Final dead zone week; April step-up loading" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"DEAD ZONE — flat low; avoid",
    stars:1,
    note:"Continuation of January's dead zone. ALL THREE TFs flat around 15–25. No directional edge. The hog seasonal is binary — it is either in the dead zone (Jan-Mar and Jul-Dec) or at the annual high (Apr-Jun). February is deep dead zone.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Dead zone; flat at 15–20; no edge" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs flat; avoid all positions" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"No catalyst; await March exit from dead zone" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Dead zone; late-March step-up approaching" },
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"DEAD ZONE EXIT — late-March STEP-UP loading; buy late March",
    stars:3,
    note:"Dead zone continues through early-mid March. Then: THE STEP-UP. All three TFs move from ~15–25 to ~100 in a near-vertical move in late March. This is the most binary step-function in any commodity — from dead flat to annual high in days. BUY late March Wk3/Wk4.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Dead zone; no action; await Wk3 entry signal" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Still flat; patience; step-up imminent" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"STEP-UP BEGINS — all TFs surge from 20 to 60+; BUY NOW" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Step-up accelerating; all TFs at 70–80; hold all longs" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs at ~100; step-up peak; hold longs through June",
    stars:5,
    note:"ALL THREE TFs at or near 100 in April — the annual high for all timeframes simultaneously. The step-up is complete and the plateau begins. Unlike most assets where the peak is a sell, the hog plateau holds through June. Hold longs — the step-DOWN won't come until late June/July.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs at 100; hold all longs; plateau phase begins" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Three-way 100 confirmed; no exit yet; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Plateau holding; June step-down not yet; stay long" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"May continuation; plateau phase intact; hold" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — plateau holding; all TFs near 100; hold into June peak",
    stars:5,
    note:"The plateau continues. ALL THREE TFs remain near 100 throughout May. BBQ/grilling season demand and the spring hog supply cycle keep the seasonal elevated. Hold longs — the step-DOWN begins in late June.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Plateau at 100; hold all longs; no exit yet" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs near 100; BBQ season peak; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Plateau intact; June step-down approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Hold; late June EXIT signal imminent" },
    ]
  },
  {
    month:"June", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"flip", combinedLabel:"ANNUAL PEAK → STEP-DOWN; all TFs at ~100 then VERTICAL DROP to near 0",
    stars:5,
    note:"The year's most dramatic event in lean hogs: ALL THREE TFs plateau near 100 in early June, then THE STEP-DOWN occurs. All three TFs crash from ~100 to near 0 in late June — a vertical drop as sudden as the step-up was. EXIT ALL LONGS by June Wk1-Wk2. This is the cleanest flip signal in the meats complex.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Three-way 100 plateau; final long week — EXIT by Wk2" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"STEP-DOWN BEGINS — all TFs from 100 to 50+; EXIT and FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"Vertical drop confirmed; all TFs crashing; hold short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs near 0; step-down complete; hold short" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"DEAD ZONE — all TFs near 0 again; second dead zone begins",
    stars:1,
    note:"ALL THREE TFs at near 0 — the step-down is complete. July through December is the second dead zone. Unlike the January dead zone, the July start is from a confirmed peak, so the bears are intact but there's little further downside. Year-end reference values are 40-YR=23.07, 15-YR=27.48, 5-YR=34.33.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Near-0 confirmed; second dead zone; hold short or flatten" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs at near 0; no directional edge" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Dead zone; avoid new positions" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Flat low; H2 dead zone in full force" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"DEAD ZONE — flat near 0 through year-end",
    stars:1,
    note:"Dead zone continues. ALL THREE TFs flat near 0–25. No directional edge. The hog seasonal H2 is a flat grind at low levels. Year-end won't reach prior highs — reference values confirm: 40-YR=23.07, 15-YR=27.48, 5-YR=34.33 (all below 40).",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Dead zone; flat low; avoid" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs at 20; no catalyst" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"H2 dead zone grind; no edge" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"Flat; avoid trading hogs in August" },
    ]
  },
  {
    month:"September", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — slight recovery from dead zone lows; no directional edge",
    stars:1,
    note:"Slight recovery from absolute lows. All TFs at ~20–30. Some modest near-term recovery in 5-YR. Not a clean entry month — the dead zone grind continues. The year-end reference values are approaching (~23/27/34) but the move is small.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Slight recovery; 5-YR at 25; no edge" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Mixed; avoid; dead zone persists" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"No directional edge; flat near 25" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Year-end reference approaching; await December close" },
    ]
  },
  {
    month:"October", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — dead zone; approaching year-end reference values",
    stars:1,
    note:"Dead zone grind. All TFs at ~20–30 — approaching year-end reference values. No clear direction. 5-YR at ~30, approaching 34.33 reference. 40-YR at ~22, approaching 23.07. The hog year is essentially done after the June step-down.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Dead zone; near reference values; no edge" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Flat; avoid; await year-end close" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"All TFs near 23/27/34 reference zone" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Dead zone; no action warranted" },
    ]
  },
  {
    month:"November", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — dead zone; near year-end reference; no edge",
    stars:1,
    note:"Dead zone continuation. All TFs at ~23–34 — at or near year-end reference values. Hog seasonals in H2 are notoriously flat. No entry signal.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Dead zone; at reference values; avoid" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Flat; 5-YR at 33; 40-YR at 22" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"No edge; dead zone complete" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Year-end close approaching; no position" },
    ]
  },
  {
    month:"December", sig5:"chop", sig15:"chop", sig40:"chop",
    combined:"chop", combinedLabel:"YEAR-END — settles at 40-YR=23.07/15-YR=27.48/5-YR=34.33; dead zone",
    stars:1,
    note:"Year-end close in the dead zone. 40-YR=23.07. 15-YR=27.48. 5-YR=34.33. ALL reference values are below 40 — confirming that lean hogs spends the majority of the year below 40 on the seasonal scale, with only a brief peak Apr-Jun. The most binary commodity seasonal in the dataset.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Dead zone; year-end reference at 23/27/34" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Flat; no position; dead zone" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"At reference zone; 40-YR=23 / 15-YR=27 / 5-YR=34" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★", note:"Year-end; reset; await late-March step-up next year" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the lean hogs seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== LEAN HOGS CME — SEASONAL FRAMEWORK ===
Asset: Lean Hogs CME (HE) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=23.07, 15-YR=27.48, 5-YR=34.33

YEARLY ARC:
Jan-Feb-early-March = DEAD ZONE (all TFs flat at 15–25 — no edge, avoid trading).
Late March Wk3 = STEP-UP: all TFs surge from ~20 to ~100 in near-vertical move.
April-May-early-June = PLATEAU at ~100 (hold longs through BBQ season).
Late June Wk2 = STEP-DOWN: all TFs crash from 100 to near 0 in near-vertical move.
July-December = second DEAD ZONE. Year-end: 40-YR=23.07/15-YR=27.48/5-YR=34.33 (all below 40).

=== PLAYBOOK SIGNALS ===
AVOID: January, February — dead zone; no directional edge; worst seasonal period
LONG #1: March Wk3 — STEP-UP signal; all TFs surge; BUY AGGRESSIVELY; hold to June
HOLD: April-May — three-way plateau at ~100; do NOT exit early; hold max longs
FLIP #1: June Wk2 — STEP-DOWN confirmed; EXIT ALL / FLIP SHORT
AVOID: July–December — second dead zone; year-end reference values all below 40

KEY FEATURES:
• The most binary step-function seasonal in any commodity — no gradual moves; just vertical steps
• Late March step-up: from ~20 to ~100 in 1–2 weeks (fastest move in the meats complex)
• Late June step-down: from ~100 to near 0 in 1–2 weeks (equally violent)
• The plateau phase (Apr–Jun) is unique — most assets don't hold 100 for 3 months
• Year-end reference values all below 40 — H2 is entirely a dead zone

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 23.07 | • 15-YR: 27.48 | • 5-YR: 34.33
Annual high: All three TFs at ~100 simultaneously in April–June
Annual low: All three TFs at ~15–20 in Jan–Mar (H1 dead zone) and July–Dec (H2 dead zone)
`;
