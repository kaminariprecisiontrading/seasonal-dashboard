// data/soybeans.js — Soybeans (CBOT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=52.12 · 15-YR=66.44 · 5-YR=48.07

const ASSET_CONFIG = {
  id:       "soybeans",
  name:     "Soybeans (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Soybeans CBOT (ZS) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=52.12, 15-YR=66.44, 5-YR=48.07 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 5-YR declining from ~80; all TFs falling toward February trough",
    stars:3,
    note:"5-YR starts the year elevated (~80) but declining sharply. 40-YR at ~65 and declining. 15-YR at ~50 and declining. The post-harvest supply build continues to pressure the market. February will mark the annual trough for all three TFs before the spring acreage-planting bull begins.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR declining from 80; 40-YR at 62; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; 40-YR through 58" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR at 65; February trough approaching" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short; February annual low imminent" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — all three TFs at year's low; buy setup loading",
    stars:2,
    note:"ANNUAL TROUGH: All three TFs at or near their year's lowest point. 40-YR at ~45–48. 15-YR at ~45. 5-YR at ~50. This is the seasonal floor before the explosive March–June bull. Cover shorts and begin scaling longs late February. The March 5-YR spike to ~90 is imminent.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"40-YR at 48; near annual trough; cover shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"All TFs at annual lows ~45; absolute floor" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Trough confirmed; begin scaling longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"Recovery underway; March explosion incoming" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 5-YR SURGES to ~90; new crop planting-season demand ignites",
    stars:5,
    note:"THE explosive month for soybeans. 5-YR surges from ~50 to ~90–95 — a +40 point move in weeks driven by new crop planting-season demand and South American harvest concern. 40-YR recovers from ~45 to ~65–70. 15-YR recovers strongly. Add aggressively to longs built in late February.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR EXPLODING from 50 to 80+; add all longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR at 90; 40-YR through 60; hold max longs" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 68; 15-YR recovering; momentum strong" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into April; 40-YR approaching 80" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — all TFs elevated; 40-YR to ~85–90; spring planting premium",
    stars:4,
    note:"Spring planting season bull in full force. 40-YR rises from ~70 to ~85–90. 15-YR from ~55 to ~70–75. 5-YR volatile but elevated. Planting intentions and South American supply uncertainty keep the bull alive. Hold longs through May-June peak.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 75; 15-YR through 65; hold longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 85; approaching peak zone" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs elevated; pre-peak; stay long" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"May-June peak approaching; hold max longs" },
    ]
  },
  {
    month:"May", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → PEAK; 40-YR near 100; exit late May/early June",
    stars:5,
    note:"40-YR approaches or reaches 100. 15-YR at ~80. 5-YR volatile ~55–70. The planting-season premium is fully priced. This is the primary exit month for the spring bull. Begin scaling out longs as 40-YR approaches 100. The July crash will be severe.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 90; 15-YR at 78; hold; peak very close" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 95–100; EXIT half longs; flip signal imminent" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"FLIP ★★★★★", note:"40-YR at 100; EXIT ALL / FLIP SHORT" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Post-peak; all TFs rolling; short confirmed" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — post-peak bear; all TFs declining; July crash loading",
    stars:4,
    note:"Post-peak bear confirmed. 40-YR declining from ~95 toward ~60. 15-YR declining from ~80. 5-YR declining. Crop progress reports begin pressuring the market as US planting is complete and crop condition reports emerge. July will bring the most violent crash of the year.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Post-peak; 40-YR declining from 95; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"All TFs declining; 40-YR through 80" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"40-YR at 70; July crash loading; add shorts" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"Hold short; July crash is the most violent event" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"CRASH — ALL THREE TFs from ~90 to ~25; most violent single-month move",
    stars:5,
    note:"THE most dramatic month in soybeans. All three TFs crash from elevated levels (~85–95) to ~20–30 in a single month. 40-YR from ~90 to ~25. 15-YR from ~85 to ~25. 5-YR crashing. Harvest pressure, crop ratings improvement, and South American competition all combine. Maximum short conviction.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"CRASH BEGINNING; all TFs from 80+ to 50; hold max short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 40; crash accelerating; add shorts" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 30; 15-YR at 30; most violent week" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★★", note:"40-YR at 25; hold shorts into August trough" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — near-trough; 40-YR at ~25; brief bounce then October absolute low",
    stars:3,
    note:"Post-crash consolidation near lows. 40-YR at ~25 with a brief mid-August bounce toward ~40, then back down. 15-YR at ~25. 5-YR very low. October will mark the absolute annual trough. Do not exit shorts on bounces — they are temporary.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 25; hold short; brief bounce possible" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Mid-Aug bounce; 40-YR to ~40; DO NOT COVER — false dawn" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Bounce fails; back to bear; October trough in view" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold short; September-October absolute lows approaching" },
    ]
  },
  {
    month:"September", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — approaching October annual trough; all TFs near 0",
    stars:3,
    note:"Continued decline toward October's near-0 annual trough. 40-YR at ~20. 15-YR at ~20. 5-YR at ~15. Harvest pressure peaks as US beans are harvested and supplies overwhelm demand. October trough is the primary exit.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 20; approaching absolute trough" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs at 15–20; near-0 zone approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★", note:"Near-trough; begin tightening stops" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing; October reversal loading" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"NEAR-0 TROUGH → RECOVERY; all three TFs at annual lows; BUY",
    stars:5,
    note:"ALL THREE TFs at or near 0 simultaneously in early October — the absolute annual trough. 40-YR at near 0. 15-YR near 0. 5-YR near 0. Buy aggressively — the November-December recovery targets 52/66/48. Harvest is complete and export demand/new crop demand builds.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Near-0 trough; BUY AGGRESSIVELY; hold into Dec" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Recovery underway; all TFs surging from 0" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR through 20; 15-YR through 25; momentum building" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold longs; November continuation in view" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — strong recovery; all TFs heading to year-end reference",
    stars:4,
    note:"Strong November recovery. 40-YR from ~10 to ~40–45. 15-YR from ~10 to ~55. 5-YR recovering. December targets: 40-YR=52.12, 15-YR=66.44, 5-YR=48.07. Export demand builds as South American planting accelerates.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Recovery accelerating; 40-YR through 25; hold" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 35; 15-YR at 45; strong momentum" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"15-YR approaching 55; year-end target in sight" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Hold into December; reference values approaching" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG → YEAR-END; settles at 40-YR=52.12/15-YR=66.44/5-YR=48.07",
    stars:3,
    note:"Year-end recovery completes. 40-YR=52.12. 15-YR=66.44 (above mid-range). 5-YR=48.07. All three TFs at mid-range recovery. The 15-YR above mid-range signals the demand premium for new crop soybeans is being priced into the forward curve. The soybean cycle is complete.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"40-YR at 48; 15-YR at 62; approaching reference" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★", note:"15-YR approaching 66; year-end target close" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"chop", com:"CHOP ★★", note:"40-YR at 52; 15-YR at 66; reference zone" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Year-end consolidation; 52/66/48; cycle complete" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the soybeans seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== SOYBEANS CBOT — SEASONAL FRAMEWORK ===
Asset: Soybeans CBOT (ZS) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=52.12, 15-YR=66.44, 5-YR=48.07

YEARLY ARC:
Jan-Feb = POST-HARVEST BEAR; all TFs declining to February annual trough (~45).
March = 5-YR EXPLOSION to ~90 (+40 pts); new-crop planting demand ignites.
Apr-May = broad bull; 40-YR approaches 100 (annual high).
Late May/June = PEAK ZONE; exit longs; flip short.
July = CRASH — all TFs from ~90 to ~25 in one month (most violent monthly move).
Aug-Sep = near-trough consolidation. October = ALL THREE TFs near 0 (annual trough).
Nov-Dec = recovery to 52/66/48.

=== PLAYBOOK SIGNALS ===
SHORT #1: January — post-harvest bear; all TFs declining to Feb trough
LONG #1: February Wk3/Wk4 — annual trough confirmed; buy; hold through May
EXIT #1: May Wk2/Wk3 — 40-YR at 100; EXIT ALL LONGS / FLIP SHORT
SHORT #2: July — CRASH confirmed; add max shorts
LONG #2: October Wk1 — near-0 trough; BUY AGGRESSIVELY; hold into December

KEY FEATURES:
• March 5-YR explosion (+40 pts): one of the largest single-month moves in grains
• July CRASH: all TFs from ~90 to ~25 — most violent monthly move in the soybean complex
• October near-0 three-way trough: the annual floor; best entry for year-end recovery
• 15-YR ends at 66.44 (above mid-range) — new crop demand premium persists into year-end
• Full-cycle amplitude: ~100 points peak-to-trough (May 100 → October 0 → December 52)

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 52.12 | • 15-YR: 66.44 | • 5-YR: 48.07
Annual high: 40-YR near 100 in May | Annual low: All three TFs near 0 in October
`;
