// data/cl.js — Crude Oil (NYM) · 37-Year Seasonal (1983–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 37-YR=46.27 · 15-YR=62.73 · 5-YR=44.87

const ASSET_CONFIG = {
  id:       "cl",
  name:     "Crude Oil (NYM)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 37-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Crude Oil NYMEX (CL) · 37-Year Seasonal (1983–2019) · 15-Year · 5-Year overlays. Reference: 37-YR=46.27, 15-YR=62.73, 5-YR=44.87 at 02 Jan 2020.",
  ltLabel:  "37-YR",
  ltSigKey: "sig37",
  ltKey:    "s37",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig37:"bear",
    combined:"bear", combinedLabel:"AVOID — annual lows zone, no seasonal edge",
    stars:1,
    note:"All TFs languish near annual lows (5–15 range). Brief 5-YR spike in Wk1 is a headfake — crashes immediately. No long bias; seasonal bottom still forming.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bear", s37:"bear", com:"CHOP ★★", note:"5-YR momentary spike then immediate reversal; remain flat" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"All three TFs grinding lower toward annual lows" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"Continued seasonal weakness; no reversal signal yet" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"Hold short or flat into February trough setup" },
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig37:"chop",
    combined:"chop", combinedLabel:"TROUGH — annual low forms early Feb, then basing",
    stars:2,
    note:"Annual low for short TFs in early February (near 0). 37-YR also dips to its lowest. Recovery begins mid-Feb but conviction is low. Watch for Wk3 reversal candle to confirm seasonal turn.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"5-YR and 15-YR at annual lows near 0; final capitulation" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★★", note:"Annual low forming; basing action, no directional edge" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s37:"chop", com:"CHOP ★★", note:"5-YR lifts first; 15-YR and 37-YR still basing" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★", note:"All three TFs begin recovering — confirm with price action" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"LONG — broad seasonal bull, all TFs rising steeply",
    stars:4,
    note:"Strong broad bull. All three TFs rally steeply from February lows. By month-end: 37-YR ~50–55, 15-YR ~65, 5-YR ~35–40. This is the primary seasonal long entry of H1.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★", note:"Bull momentum confirmed across all TFs; add on dips" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★", note:"15-YR accelerating toward 65; 37-YR through 35–40 zone" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★", note:"Broad alignment continues; stay with trend" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★", note:"Hold longs into April peak zone setup" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"LONG (early) → TOP WATCH (late) — 15-YR peaks mid-April",
    stars:3,
    note:"15-YR reaches its H1 seasonal peak (~95–100) in mid-April. 37-YR at ~75–80. 5-YR still rising. Late April begins the seasonal top formation. Manage longs; 15-YR peaking is the first caution signal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★", note:"All TFs still rising; hold longs from March" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★", note:"15-YR near peak zone (~95); tighten stops" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s37:"bull", com:"CHOP ★★", note:"15-YR peaks ~100, beginning to roll; 5-YR still elevated" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★★", note:"Top formation; reduce exposure, await May volatility" },
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"bear", sig37:"chop",
    combined:"chop", combinedLabel:"VOLATILE — 5-YR spike to 100 then crash; avoid new longs",
    stars:1,
    note:"Most volatile month. 5-YR spikes to ~100 in early May then crashes sharply. 15-YR falling from its April peak. 37-YR choppy around 70–80 before dipping. No clean directional edge — stay flat.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bear", s37:"chop", com:"CHOP ★", note:"5-YR final spike to ~100; 15-YR already declining; conflicting signals" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s37:"chop", com:"BEAR ★★", note:"5-YR reversing hard from peak; 15-YR confirming breakdown" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"All three declining; short bias if confirmed on price" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s37:"chop", com:"CHOP ★★", note:"37-YR holding better than short TFs; wait for June setup" },
    ]
  },
  {
    month:"June", sig5:"chop", sig15:"chop", sig37:"chop",
    combined:"chop", combinedLabel:"CHOP — secondary bounce then fade; no clean edge",
    stars:2,
    note:"15-YR and 37-YR have a secondary bounce to ~80–85 in mid-June. 5-YR remains weak (~40–50). The bounce fades by late June. No sustained directional bias — secondary highs often provide short entries.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★★", note:"Mixed signals; short TF weak, long TF bouncing" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s37:"bull", com:"CHOP ★★", note:"15-YR/37-YR secondary bounce to ~80–85; 5-YR lagging" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"Secondary high forming; fade the bounce, bias short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"Heading into July summer low; hold short or flat" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig37:"bear",
    combined:"bear", combinedLabel:"SUMMER LOW — trough forming, watch for late-July reversal",
    stars:2,
    note:"Summer low. 5-YR weakest (~40), 37-YR and 15-YR also dip. Trough forms mid-to-late July. Late-July reversal candle marks the H2 seasonal entry setup. This is NOT a high-conviction short — it's a trough to watch for the August long.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"Continued selling into summer low zone" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"5-YR near 40 — approaching seasonal trough" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★★", note:"Basing action; summer low likely forming here" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"BULL ★★★", note:"Late-July reversal: H2 bull entry setup — confirm before adding" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"LONG — H2 recovery rally, all TFs rising",
    stars:3,
    note:"H2 recovery gains traction. 37-YR rises from ~55 to ~80. 15-YR from ~55 to ~70. 5-YR from ~40 to ~60. The bull is building toward the 37-YR seasonal high in September.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★", note:"H2 bull confirmed; build position on the rally" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★", note:"37-YR climbing through 65–70; momentum building" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★", note:"All TFs rising in sync; hold longs into September" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★", note:"37-YR approaching 80; September peak in view" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig37:"bull",
    combined:"bull", combinedLabel:"LONG — 37-YR annual high; highest-conviction trade of the year",
    stars:5,
    note:"The year's defining seasonal trade. 37-YR surges to its annual high (~95–100) in late September. 15-YR peaks ~75–80. 5-YR at ~70–75. Full TF alignment — this is the highest-conviction long period in the crude oil seasonal. Late September the 37-YR peaks and the reversal begins.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★★", note:"All TFs surging; full seasonal alignment — maximum long exposure" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★★", note:"37-YR through 80; 15-YR and 5-YR confirming; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s37:"bull", com:"LONG ★★★★★", note:"37-YR approaching annual high ~95–100; stay long" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s37:"chop", com:"FLIP ★★★★★", note:"37-YR peaks ~100; THE seasonal top — begin exit / flip short" },
    ]
  },
  {
    month:"October", sig5:"bear", sig15:"bear", sig37:"bear",
    combined:"bear", combinedLabel:"SHORT — major rollover from September annual high",
    stars:4,
    note:"Major seasonal reversal from September's 37-YR annual high. 37-YR falls from 100 to ~65–70. 15-YR from ~75 to ~60–65. 5-YR from ~70 to ~40–45. The bear is broad and sustained. High-conviction short month.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★★★", note:"Rollover confirmed; 37-YR breaking from 100; short aggressively" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★★", note:"All TFs declining in sync; add to short on bounces" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★★", note:"37-YR through 75–70; trend intact, stay short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★★", note:"Hold short into November continuation" },
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig37:"bear",
    combined:"bear", combinedLabel:"SHORT — sustained bear continuation after October rollover",
    stars:3,
    note:"Continued seasonal decline. 37-YR falls from ~65 to ~50. 15-YR ~60. 5-YR ~40–45. All three declining. The December cascade toward annual lows is approaching.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★", note:"Seasonal bear intact; 37-YR through 60; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★", note:"All TFs declining; no seasonal reason to cover yet" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★", note:"37-YR near 50; approaching zone for December cascade" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s37:"bear", com:"SHORT ★★★", note:"Hold into December; annual lows within reach for 37-YR" },
    ]
  },
  {
    month:"December", sig5:"chop", sig15:"chop", sig37:"bear",
    combined:"bear", combinedLabel:"BEAR/VOLATILE — 37-YR crashes to near 0 mid-Dec, recovers to 46",
    stars:2,
    note:"37-YR experiences its most extreme intra-month move of the year — cascades from ~50 to near 0–15 in mid-December, then partially recovers to ~46 by year-end. Short TFs choppy. Avoid new positions; seasonal ambiguity. Year ends with 37-YR=46.27, 15-YR=62.73, 5-YR=44.87.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★", note:"Continued seasonal decline; 37-YR falling toward cascade zone" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s37:"bear", com:"BEAR ★★★", note:"37-YR cascade accelerates toward near-0 annual low" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★", note:"37-YR at trough; partial recovery begins — no directional edge" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s37:"chop", com:"CHOP ★", note:"Year-end recovery to reference values; hold flat into January" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the crude oil seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 37-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== CRUDE OIL NYM — SEASONAL FRAMEWORK ===
Asset: Crude Oil (CL) NYMEX | 37-Year Seasonal (1983–2019)
Reference 02 Jan 2020: 37-YR=46.27, 15-YR=62.73, 5-YR=44.87

YEARLY ARC:
Year begins at annual lows. Feb = absolute trough. Mar–Apr = primary H1 bull (15-YR peaks mid-April ~100).
May = violent 5-YR spike then crash; most treacherous month. Jun = secondary bounce fades.
Jul = summer low (all TFs dip). Aug = H2 recovery begins. Sep = 37-YR ANNUAL HIGH (95–100).
Oct = major reversal from Sep peak (highest conviction bear). Nov–Dec = sustained decline; 37-YR cascades toward near-0 in mid-December.

=== PLAYBOOK SIGNALS ===
LONG #1: March entry (broad bull, all TFs rising) | EXIT early-mid April when 15-YR ~95–100
LONG #2: Late July reversal entry | HOLD through September 37-YR annual high
SHORT #1: September Wk4 / October Wk1 — 37-YR peaks ~100; primary seasonal short of H2
SHORT #2: December — 37-YR cascade; reduce risk before mid-December

KEY DIVERGENCES:
• May: 5-YR spikes to 100 while 15-YR already falling — conflicting, avoid new trades
• June: 15-YR and 37-YR bounce while 5-YR weak — secondary high, fade on strength
• December: 37-YR extreme intra-month volatility vs 15-YR stability (15-YR only falls to ~62)

TF REFERENCE VALUES (02 Jan 2020):
• 37-YR: 46.27 | • 15-YR: 62.73 | • 5-YR: 44.87
Annual high: 37-YR ~95–100 in September | Annual low: 37-YR ~0–15 mid-December
`;
