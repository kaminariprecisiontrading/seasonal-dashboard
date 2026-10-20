// data/corn.js — Corn (CBOT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=48.8 · 15-YR=71.43 · 5-YR=47.63

const ASSET_CONFIG = {
  id:       "corn",
  name:     "Corn (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Corn CBOT (ZC) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=48.8, 15-YR=71.43, 5-YR=47.63 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"chop",
    combined:"chop", combinedLabel:"CHOP — 40-YR at ~45; 15-YR at ~35; February spike loading",
    stars:2,
    note:"40-YR at ~45 and moderately declining. 15-YR at ~35. 5-YR at ~48 and declining. January is a transitional month before the February 40-YR spike. Not a high-conviction directional month. The February surge in 40-YR to ~85 is the first major trade setup of the year.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"chop", com:"CHOP ★★", note:"40-YR at 47; 5-YR at 50; mixed signals" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"chop", com:"CHOP ★★", note:"40-YR at 44; 15-YR at 33; wait for February" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"chop", com:"CHOP ★★", note:"February spike loading; no edge yet" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bull", com:"CHOP ★★★", note:"40-YR beginning to surge; February bull loading" },
    ]
  },
  {
    month:"February", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"40-YR SURGES TO ~85; all TFs rising; most explosive Feb in grains",
    stars:5,
    note:"THE defining February event in corn: 40-YR surges from ~45 to ~85 — a +40 point move in a single month. 15-YR surges from ~35 to ~75–80. 5-YR recovering. This is the most explosive February in the grain complex (rivaling only Soybean Oil). The planting-intent survey and export demand drive the surge. Buy aggressively.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR surging from 45; buy NOW; February spike beginning" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 70; 15-YR at 65; most explosive week" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 82; 15-YR at 76; hold max longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 85; March-May peak loading; hold" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — holding at elevated levels; 40-YR at ~85; planting season",
    stars:4,
    note:"40-YR holding elevated near ~85. 15-YR at ~60–65. 5-YR volatile but recovering. Planting-season demand and South American competition keep the spring bull alive. April-May will bring all TFs toward their pre-crash peaks.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 86; holding elevated; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 85; 15-YR at 63; planting season" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs elevated; May peak loading" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; April-May all-TF peak approaching" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs at ~90+; approaching June crash trigger",
    stars:5,
    note:"All three TFs at near peak levels. 40-YR at ~90–95. 15-YR at ~90–95. 5-YR at ~70–75. Spring planting season at maximum demand. June will trigger the ALL-CRASH simultaneously. This is the last month to hold maximum longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 90; all TFs at near-peak; hold max longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"15-YR at 92; 5-YR at 72; approaching crash trigger" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 93; 15-YR at 93; EXIT ZONE APPROACHING" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs near 95+; May-June flip imminent; prepare exit" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → EXIT; all TFs near 100; June ALL-CRASH loading",
    stars:5,
    note:"All three TFs at or near 100 simultaneously. The crop planting premium is fully priced. EXIT ALL LONGS by May Wk2-Wk3 as the June ALL-CRASH is imminent. The crash will take all TFs from ~95 to near 0 in 3 months. 5-YR spikes to 100 in early June (last exit signal).",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"All TFs at 95+; LAST LONG WEEK; EXIT begins" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"FLIP ★★★★★", note:"5-YR at 100 (peak); EXIT ALL LONGS / FLIP SHORT" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"ALL CRASH BEGINNING; hold maximum short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"All TFs collapsing from 100; harvest bear in force" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ALL-CRASH CONFIRMED — all TFs from 100 to 30+ in one month; hold short",
    stars:5,
    note:"THE ALL-CRASH: all three TFs simultaneously collapsing from near-100 peaks. 40-YR from ~90 to ~30. 15-YR from ~90 to ~35. 5-YR from 100 to ~25. The harvest supply wave overwhelms demand. This is the defining short of the corn seasonal — maximum conviction short.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"ALL CRASH: all TFs from 100 to 70; hold max short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 55; 15-YR at 55; crash accelerating" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 38; 15-YR at 40; harvest bear in full force" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 30; August annual trough approaching" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-crash continuation; 40-YR heading to near-0",
    stars:4,
    note:"Post-crash continuation. 40-YR declining from ~30 toward ~10–5. 15-YR declining from ~35 toward ~20. 5-YR declining toward near 0. August will mark the absolute trough for all TFs. Hold shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 25; post-crash; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 18; 15-YR at 25; trough approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"5-YR near 0; August absolute low loading" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Tighten stops; August trough imminent" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — 40-YR near 0; ALL TFs at annual lows simultaneously",
    stars:4,
    note:"ALL THREE TFs at or near 0 simultaneously. 40-YR at ~5. 15-YR at ~25. 5-YR near 0. Absolute annual trough. Cover shorts and buy aggressively late August. October begins the November-December recovery to 48.8/71.43/47.63.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR at 8; near-0 trough; tighten stops; cover shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs near 0; ABSOLUTE TROUGH; cover all shorts" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★★", note:"Trough confirmed; begin scaling longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery confirmed; add longs aggressively" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — recovery from August trough; 40-YR to ~25; build positions",
    stars:3,
    note:"Recovery from August's annual trough. 40-YR from ~5 to ~25. 15-YR from ~20 to ~45. 5-YR recovering. The Q4 recovery begins. October-December bull targets 48.8/71.43/47.63.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"All TFs recovering from near-0; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 18; 15-YR at 35; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 23; October acceleration approaching" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold longs; October-December bull loading" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — Q4 bull begins; 40-YR to ~35; 15-YR to ~55 accelerating",
    stars:4,
    note:"Q4 bull accelerating. 40-YR from ~25 to ~35. 15-YR from ~45 to ~55. 5-YR from ~30 to ~45. All three TFs aligned bullish for the first time since May. December year-end targets: 48.8/71.43/47.63.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs rising; 40-YR at 30; add longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 35; 15-YR at 52; momentum strong" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs aligned; hold max longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into November; year-end reference loading" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — strong Q4 bull; 40-YR to ~45; 15-YR approaching reference",
    stars:4,
    note:"Strong November recovery. 40-YR from ~35 to ~45. 15-YR from ~55 to ~68. 5-YR from ~45 to ~47. December targets: 40-YR=48.8, 15-YR=71.43, 5-YR=47.63.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 40; 15-YR at 62; approaching reference" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 45; 15-YR at 68; December close near" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"At reference zone; 48/71/48" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Hold into December; year-end settlement" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END; settles at 40-YR=48.8/15-YR=71.43/5-YR=47.63",
    stars:3,
    note:"Year-end recovery completes. 40-YR=48.8. 15-YR=71.43 (well above mid-range — export demand premium). 5-YR=47.63 (mid-range). The 15-YR at 71 is notably higher than 40-YR at 49 — this divergence reflects the Q4 export demand that has dominated the past 15 years vs. the longer 40-YR history.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 48; 15-YR at 71; reference zone" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"chop", com:"CHOP ★★", note:"15-YR at 71; year-end consolidation" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end settlement; 49/71/48" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end close; cycle resets; Feb spike loading" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the corn seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== CORN CBOT — SEASONAL FRAMEWORK ===
Asset: Corn CBOT (ZC) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=48.8, 15-YR=71.43, 5-YR=47.63

YEARLY ARC:
January = transitional; 40-YR at ~45; February spike loading.
February = 40-YR SURGES from 45 to 85 (+40 points); most explosive February in grains.
Mar-Apr = hold bull at ~90; all TFs near peak.
May = 5-YR spikes to 100; ALL EXIT; FLIP SHORT.
Jun = ALL-CRASH confirmed; all TFs from ~95 to 30 in one month.
Jul-Aug = continued crash; August ALL THREE TFs near 0 (annual trough).
Sep-Nov = recovery bull; 15-YR accelerates to 71.43 by December.
December = year-end 48.8/71.43/47.63.

=== PLAYBOOK SIGNALS ===
LONG #1: February — 40-YR surges from 45 to 85 (+40 pts); BUY IMMEDIATELY; hold to May
EXIT #1: May Wk2 — 5-YR at 100 peak; EXIT ALL / FLIP SHORT
SHORT #1: May Wk2 through August — ALL-CRASH; most violent multi-TF crash in grains
LONG #2: August Wk3/Wk4 — all TFs near-0 annual trough; BUY AGGRESSIVELY
TARGET: 15-YR=71.43 by December (the dominant year-end recovery)

KEY FEATURES:
• February 40-YR surge: +40 points in one month (from 45 to 85)
• May ALL-CRASH: all three TFs simultaneously collapse from ~100 peak
• This is the most violent multi-TF crash in the grain complex
• August near-0 trough: all three TFs simultaneously at or near 0
• 15-YR at 71.43 year-end vs 40-YR at 48.8: growing export demand premium in recent 15 years
• Full cycle amplitude: ~100 points (0 to 100 and back)

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 48.8 | • 15-YR: 71.43 | • 5-YR: 47.63
Annual high: All TFs near 100 in April-May | Annual low: All TFs near 0 in August
`;
