// data/brent.js — Brent Crude Oil (ICE) · 31-Year Seasonal (1989–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 31-YR=62.72 · 15-YR=67.17 · 5-YR=48.81

const ASSET_CONFIG = {
  id:       "brent",
  name:     "Brent Crude (ICE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 31-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Brent Crude Oil ICE · 31-Year Seasonal (1989–2019) · 15-Year · 5-Year overlays. Reference: 31-YR=62.72, 15-YR=67.17, 5-YR=48.81 at 02 Jan 2020.",
  ltLabel:  "31-YR",
  ltSigKey: "sig31",
  ltKey:    "s31",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig31:"bear",
    combined:"bear", combinedLabel:"AVOID — annual lows zone, all TFs depressed",
    stars:1,
    note:"All TFs begin the year near annual lows (5–15 range). No seasonal edge. Very similar to CL but with slightly more aggressive selling in early January. Flat or short bias.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"All TFs at annual lows; no long case seasonally" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"Continued weakness; 5-YR and 15-YR both declining" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"31-YR also pressing lower; no reversal signal yet" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"Hold short or flat into Feb trough setup" },
    ]
  },
  {
    month:"February", sig5:"chop", sig15:"chop", sig31:"chop",
    combined:"chop", combinedLabel:"TROUGH — annual low forms, recovery begins mid-month",
    stars:2,
    note:"Annual trough for all TFs in early February. 31-YR dips near 0. Recovery building from Wk2 onward but conviction low. Brent's 5-YR can touch 0 — more extreme trough than CL.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"Pressing into annual lows; final capitulation phase" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s31:"chop", com:"CHOP ★★", note:"Annual low forming; basing, no directional edge" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s31:"chop", com:"CHOP ★★", note:"5-YR lifts first; 15-YR and 31-YR still basing" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s31:"bull", com:"BULL ★★★", note:"All three turning up — confirm before adding longs" },
    ]
  },
  {
    month:"March", sig5:"bull", sig15:"bull", sig31:"bull",
    combined:"bull", combinedLabel:"LONG — primary H1 bull, broad TF alignment",
    stars:4,
    note:"Strong broad bull — identical dynamic to CL. All three TFs rising steeply from February lows. 31-YR reaches ~45–55 by month end. Primary seasonal long entry of H1. Buy the dips.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★", note:"Bull momentum confirmed; add on pullbacks" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★", note:"15-YR accelerating; 31-YR through 30–35 zone" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★", note:"Broad alignment intact; stay with trend" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★", note:"Hold into April peak zone" },
    ]
  },
  {
    month:"April", sig5:"bull", sig15:"bull", sig31:"bull",
    combined:"bull", combinedLabel:"LONG (early) → TOP WATCH — 15-YR peaks mid-April ~100",
    stars:3,
    note:"15-YR approaches its H1 peak (~95–100) in mid-April. 31-YR at ~75–80. 5-YR still rising. Late April sees top formation begin. Manage longs tightly; Brent's 15-YR peaking is the primary caution signal.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★", note:"All TFs still rising; hold March longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★", note:"15-YR near peak zone; tighten stops on longs" },
      { wk:"Wk 3", s5:"bull", s15:"chop", s31:"bull", com:"CHOP ★★", note:"15-YR peaks ~100; begins rolling; reduce long exposure" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s31:"chop", com:"CHOP ★★", note:"Top forming; step aside, await May volatility" },
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"bear", sig31:"chop",
    combined:"chop", combinedLabel:"VOLATILE — 5-YR spike/crash; conflicting TF signals",
    stars:1,
    note:"Extreme May volatility matching CL. 5-YR spikes to ~100 in early May then crashes. 15-YR falling from April peak. 31-YR choppy. Brent's 5-YR summer weakness is more pronounced than CL's. No directional edge — stay flat.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bear", s31:"chop", com:"CHOP ★", note:"5-YR final spike; 15-YR already declining; conflicting — flat" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s31:"chop", com:"BEAR ★★", note:"5-YR reversing hard; 15-YR confirming breakdown" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"All three declining; short if price confirms" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s31:"chop", com:"CHOP ★★", note:"31-YR holding better than short TFs; wait for June" },
    ]
  },
  {
    month:"June", sig5:"bear", sig15:"chop", sig31:"chop",
    combined:"chop", combinedLabel:"WEAK — 5-YR more bearish than CL; secondary bounce fades",
    stars:2,
    note:"Brent's 5-YR is more bearish in June (~30–35) than CL's equivalent. 31-YR and 15-YR have a secondary bounce but it fades. Summer low approaches. Brent summer weakness is the most extreme of the crude complex.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s31:"chop", com:"CHOP ★★", note:"5-YR weak; 31-YR/15-YR bouncing — no clean edge" },
      { wk:"Wk 2", s5:"bear", s15:"bull", s31:"bull", com:"CHOP ★★", note:"31-YR/15-YR secondary bounce; 5-YR lagging hard" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"Secondary high fading; fade strength, short bias" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"Heading into July summer low; flat or short" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig31:"bear",
    combined:"bear", combinedLabel:"SUMMER LOW — 5-YR hits ~20 (more extreme than CL); reversal late July",
    stars:2,
    note:"Brent's 5-YR summer low (~20) is MORE extreme than CL's (~40) — a key differentiating feature. 31-YR and 15-YR also dip. Late-July reversal is the H2 long setup. The extreme 5-YR weakness makes the eventual reversal more powerful.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"All TFs pressing into summer low zone" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"5-YR approaching extreme low ~20; Brent weakest crude" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s31:"chop", com:"CHOP ★★", note:"Basing; summer low likely forming — watch for reversal" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s31:"bull", com:"BULL ★★★", note:"Late-July reversal: H2 long entry — confirm before adding" },
    ]
  },
  {
    month:"August", sig5:"bull", sig15:"bull", sig31:"bull",
    combined:"bull", combinedLabel:"LONG — H2 recovery rally, all TFs rising toward Sep peak",
    stars:3,
    note:"H2 recovery. 31-YR rises from ~55 to ~80. 15-YR and 5-YR also recovering. The bull builds toward the 31-YR seasonal high in September. Identical structure to CL's August recovery.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★", note:"H2 bull confirmed; build position" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★", note:"31-YR through 65; momentum accelerating" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★", note:"All TFs rising; hold longs into September" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★", note:"31-YR approaching 80; September peak in view" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig31:"bull",
    combined:"bull", combinedLabel:"LONG — 31-YR annual high; peak seasonal long of the year",
    stars:5,
    note:"The year's primary seasonal long trade. 31-YR surges to annual high (~95–100) in late September. 15-YR peaks ~75–80. 5-YR at ~70–75. Full alignment identical to CL. Late September 31-YR peaks and reversal begins. Brent's 31-YR high is the definitive seasonal moment.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★★", note:"Full TF alignment; maximum long exposure" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★★", note:"31-YR through 80; 15-YR confirming; hold" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s31:"bull", com:"LONG ★★★★★", note:"31-YR approaching annual high ~95–100; stay long" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s31:"chop", com:"FLIP ★★★★★", note:"31-YR peaks ~100; seasonal top — begin exit / flip short" },
    ]
  },
  {
    month:"October", sig5:"bear", sig15:"bear", sig31:"bear",
    combined:"bear", combinedLabel:"SHORT — major rollover from September annual high",
    stars:4,
    note:"Identical to CL — major reversal from September's annual high. 31-YR falls from 100 to ~50–55 (a larger move than CL's 100→65, making Brent's October the stronger short). High conviction. Bear is broad and sustained.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★★★", note:"31-YR breaks from 100; short aggressively — Brent drops harder than CL" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★★", note:"All TFs declining in sync; add on bounces" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★★", note:"31-YR through 65; trend intact, stay short" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★★", note:"Hold short into November continuation" },
    ]
  },
  {
    month:"November", sig5:"bear", sig15:"bear", sig31:"bear",
    combined:"bear", combinedLabel:"SHORT — sustained bear; 31-YR falls to ~35–40",
    stars:3,
    note:"Continued seasonal decline. Brent's 31-YR falls harder than CL's (reaching ~35–40 vs CL's ~50). 15-YR ~60. 5-YR ~40–45. All three declining into December.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★", note:"Bear intact; 31-YR through 55 and falling" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★", note:"All TFs declining; 31-YR heading toward 40" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★", note:"31-YR near 40; approaching December recovery zone" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s31:"bear", com:"SHORT ★★★", note:"Hold short into December; monitor for trough" },
    ]
  },
  {
    month:"December", sig5:"chop", sig15:"chop", sig31:"chop",
    combined:"chop", combinedLabel:"CHOP/RECOVERY — 31-YR recovers to 62.72; higher than CL year-end",
    stars:2,
    note:"KEY DIFFERENCE FROM CL: Brent's 31-YR recovers to 62.72 at year-end (vs CL's 46.27). The 31-YR trough is less extreme, and the recovery more complete. Still choppy overall. Year ends with 31-YR=62.72, 15-YR=67.17, 5-YR=48.81.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s31:"bear", com:"BEAR ★★", note:"Continued seasonal decline from November" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s31:"chop", com:"CHOP ★★", note:"31-YR trough less extreme than CL; base forming" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s31:"bull", com:"CHOP ★★", note:"31-YR beginning recovery toward 62.72 reference" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s31:"bull", com:"CHOP ★★", note:"Year-end recovery; 31-YR higher than CL at year-end" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the Brent crude seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 31-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== BRENT CRUDE OIL ICE — SEASONAL FRAMEWORK ===
Asset: Brent Crude Oil ICE | 31-Year Seasonal (1989–2019)
Reference 02 Jan 2020: 31-YR=62.72, 15-YR=67.17, 5-YR=48.81

YEARLY ARC:
Structurally identical to CL but with key differences: 5-YR summer low more extreme (~20 vs CL ~40).
October sell-off sharper (31-YR drops from 100 to ~35–40 vs CL 100→65). December recovery higher (31-YR=62.72 vs CL=46.27).
Year begins at annual lows → Feb trough → Mar–Apr H1 bull → May volatile → Jul summer low → Sep 31-YR annual high → Oct/Nov major bear.

=== PLAYBOOK SIGNALS ===
LONG #1: March entry (broad bull) | EXIT mid-April when 15-YR ~95–100
LONG #2: Late July reversal | HOLD through September 31-YR annual high
SHORT #1: September Wk4 / October Wk1 — 31-YR peaks; PRIMARY seasonal short; Brent drops HARDER than CL
SHORT #2: November — sustained bear; 31-YR to ~35–40 (more extreme than CL's ~50)

KEY BRENT vs CL DIFFERENCES:
• 5-YR summer low: Brent ~20 (more extreme) vs CL ~40
• October bear: Brent 31-YR drops harder from 100 than CL
• December: Brent 31-YR recovers to 62.72 (higher) vs CL 37-YR at 46.27 (stays lower)

TF REFERENCE VALUES (02 Jan 2020):
• 31-YR: 62.72 | • 15-YR: 67.17 | • 5-YR: 48.81
Annual high: 31-YR ~95–100 in September | Annual low: 31-YR near 0 in February
`;
