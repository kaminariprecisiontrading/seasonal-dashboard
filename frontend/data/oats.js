// data/oats.js — Oats (CBOT) · 40-Year Seasonal (1980–2019)
// Moore Research Center · Reference date: 02 Jan 2020
// 40-YR=93.63 · 15-YR=87.13 · 5-YR=68.32

const ASSET_CONFIG = {
  id:       "oats",
  name:     "Oats (CBOT)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 40-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Oats CBOT (ZO) · 40-Year Seasonal (1980–2019) · 15-Year · 5-Year overlays. Reference: 40-YR=93.63, 15-YR=87.13, 5-YR=68.32 at 02 Jan 2020.",
  ltLabel:  "40-YR",
  ltSigKey: "sig40",
  ltKey:    "s40",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month:"January", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — all TFs elevated but declining; 40-YR at ~80; H1 bear begins",
    stars:3,
    note:"All three TFs elevated from the prior year's October-November explosion but declining. 40-YR at ~80 and declining. 15-YR at ~75 and declining. 5-YR at ~75 and declining. The January-August bear is the defining trend in oats. August will mark the annual trough near 0 for all TFs.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs elevated but declining; 40-YR at 82; sell into strength" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 78; declining; hold short" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"5-YR at 68; 15-YR at 70; all declining" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"Hold into February; H1 bear in force" },
    ]
  },
  {
    month:"February", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 15-YR DROPS to ~15 (near annual low); 40-YR at ~70",
    stars:4,
    note:"UNIQUE FEBRUARY EVENT: 15-YR drops sharply to ~15 (near its annual low) while 40-YR holds ~70. 5-YR at ~50 and declining. This creates a dramatic TF divergence — 15-YR near its year's lowest while 40-YR is still elevated. Hold shorts on the 15-YR; the 40-YR bear continues more gradually.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"15-YR crashing to 25; 40-YR at 72; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★★", note:"15-YR at 15 (near annual low for 15-YR!); most extreme" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"15-YR basing at 15; 40-YR at 70; continue short" },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"Hold short into March-August downtrend" },
    ]
  },
  {
    month:"March", sig5:"bear", sig15:"chop", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR declining to ~65; 15-YR recovering from Feb trough",
    stars:3,
    note:"40-YR declining from ~70 to ~65. 15-YR recovering from its February trough (~15) toward ~20. 5-YR at ~35 and declining. Continue the H1 bear. August annual trough for all TFs in sight.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 68; declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"15-YR recovering from 15; 40-YR at 64" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 60; 5-YR at 32" },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"Hold into April; H1 bear continues" },
    ]
  },
  {
    month:"April", sig5:"bear", sig15:"chop", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR at ~55; all TFs declining toward August trough",
    stars:3,
    note:"40-YR declining from ~60 to ~50. 15-YR at ~25 and choppy. 5-YR at ~25 declining. All TFs heading toward the August annual trough near 0. Continue shorts.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 58; declining; hold short" },
      { wk:"Wk 2", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 53; 5-YR at 27" },
      { wk:"Wk 3", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"5-YR at 24; declining toward August trough" },
      { wk:"Wk 4", s5:"bear", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"Hold into May-August; trough approaching" },
    ]
  },
  {
    month:"May", sig5:"chop", sig15:"chop", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR declining to ~45; 15-YR choppy at ~30",
    stars:3,
    note:"40-YR declining from ~50 to ~40. 15-YR choppy around ~30 — neither strong bull nor bear. 5-YR at ~40. Continue shorts on the 40-YR; August near-0 trough loading.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 48; declining; 15-YR choppy" },
      { wk:"Wk 2", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 44; hold short on 40-YR" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"40-YR at 40; June-August trough loading" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"bear", com:"SHORT ★★★", note:"Hold into June; summer bear in force" },
    ]
  },
  {
    month:"June", sig5:"chop", sig15:"bull", sig40:"bear",
    combined:"chop", combinedLabel:"CHOP — 40-YR declining to ~35; 15-YR volatile at ~55; mixed",
    stars:2,
    note:"40-YR declining toward ~35. 15-YR volatile around ~55 — a brief spike mid-summer. 5-YR at ~55 volatility. No clean combined edge. Wait for August trough confirmation.",
    weeks:[
      { wk:"Wk 1", s5:"chop", s15:"bull", s40:"bear", com:"CHOP ★★", note:"40-YR at 37; 15-YR spiking to 55; mixed" },
      { wk:"Wk 2", s5:"chop", s15:"bull", s40:"bear", com:"CHOP ★★", note:"15-YR at 58; 40-YR still declining; divergent" },
      { wk:"Wk 3", s5:"chop", s15:"chop", s40:"bear", com:"CHOP ★★", note:"40-YR at 33; August trough loading" },
      { wk:"Wk 4", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"All TFs declining; August near-0 trough imminent" },
    ]
  },
  {
    month:"July", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"SHORT — 40-YR at ~30; 15-YR crashing toward 0; August annual trough loading",
    stars:3,
    note:"All three TFs declining toward the August annual trough. 40-YR declining from ~33 to ~20. 15-YR declining from ~55 toward ~20. 5-YR at ~35 declining. Cover shorts and prepare for the October-November explosive recovery.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 30; 15-YR crashing from 55; tighten stops" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★★", note:"40-YR at 23; 15-YR at 25; August low approaching" },
      { wk:"Wk 3", s5:"bear", s15:"bear", s40:"bear", com:"SHORT ★★", note:"Near-trough; cover shorts; buy setup loading" },
      { wk:"Wk 4", s5:"chop", s15:"chop", s40:"chop", com:"CHOP ★★", note:"Basing; August trough and explosive recovery imminent" },
    ]
  },
  {
    month:"August", sig5:"bear", sig15:"bear", sig40:"bear",
    combined:"bear", combinedLabel:"ANNUAL TROUGH — ALL THREE TFs near 0; cover shorts; BUY",
    stars:5,
    note:"ALL THREE TFs simultaneously at or near 0 — the absolute annual trough. 40-YR at ~5. 15-YR near 0. 5-YR near 0. Cover all shorts and BUY AGGRESSIVELY. The October-November explosive recovery targets 40-YR=93.63 and 15-YR=87.13 by December. This is one of the most dramatic trough-to-year-end recoveries in all of commodities.",
    weeks:[
      { wk:"Wk 1", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★★", note:"All TFs approaching 0; tighten stops; cover shorts" },
      { wk:"Wk 2", s5:"bear", s15:"bear", s40:"bear", com:"BEAR ★", note:"ALL TFs at near 0; ABSOLUTE TROUGH; cover ALL shorts" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Annual trough confirmed; BUY MAX; Oct-Nov target: 93/87" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"Recovery underway; all TFs surging from near 0" },
    ]
  },
  {
    month:"September", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — explosive recovery from August trough; 40-YR to ~30",
    stars:4,
    note:"Explosive recovery from August's annual trough. 40-YR from ~5 to ~30. 15-YR from near 0 to ~30. 5-YR from near 0 to ~45. The recovery is underway. October explosion to ~100 for 5-YR and 80+ for 40-YR is the primary target.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"All TFs surging from near 0; add longs aggressively" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 20; 15-YR at 22; explosive momentum" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR at 40; 40-YR at 28; hold max longs" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"October explosion imminent; add maximum longs" },
    ]
  },
  {
    month:"October", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"EXPLOSIVE SURGE — 5-YR to ~100; 40-YR to ~80; most extreme October in grains",
    stars:5,
    note:"THE most explosive October in the grain complex. 5-YR SURGES to ~100 (annual high) in October. 40-YR surges from ~30 to ~80. 15-YR surges from ~30 to ~75. The new crop demand, export booking surge, and feed demand combine to create the most violent H2 recovery in oats. Hold maximum longs.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR EXPLODING to 80; 40-YR at 60; hold max longs" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR at 95; 40-YR at 75; most explosive week" },
      { wk:"Wk 3", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"5-YR at 100 (annual high); 15-YR at 73; hold" },
      { wk:"Wk 4", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 83; November approaching annual high" },
    ]
  },
  {
    month:"November", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"LONG — 40-YR near annual high (~90); all TFs at peak zone",
    stars:5,
    note:"40-YR at ~90–95 — near its annual high. 15-YR at ~85–90. 5-YR at ~95 (near its annual high). ALL THREE TFs simultaneously near annual highs in November. December year-end at 40-YR=93.63/15-YR=87.13/5-YR=68.32 — note the 5-YR pulls back from its October peak.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 90; 15-YR at 87; all at near-annual-high" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 93; approaching year-end reference" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"5-YR pulling back from 100 toward 75; 40-YR holding" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"40-YR at 93; 15-YR at 87; December reference near" },
    ]
  },
  {
    month:"December", sig5:"bull", sig15:"bull", sig40:"bull",
    combined:"bull", combinedLabel:"YEAR-END ANNUAL HIGH — 40-YR=93.63/15-YR=87.13/5-YR=68.32",
    stars:5,
    note:"Year-end settles at 40-YR=93.63 — the ANNUAL HIGH for 40-YR (the year ends at its highest point). 15-YR=87.13. 5-YR=68.32 (pulling back from October's 100 peak). The oats cycle: Aug near-0 trough → Oct 5-YR at 100 → Dec 40-YR at annual high (93.63). Year-end is the annual high — unique in the entire grain complex.",
    weeks:[
      { wk:"Wk 1", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 93; 15-YR at 87; approaching annual high" },
      { wk:"Wk 2", s5:"bull", s15:"bull", s40:"bull", com:"LONG ★★★★★", note:"40-YR at 93.63; ANNUAL HIGH at year-end (unique)" },
      { wk:"Wk 3", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Year-end consolidation near annual high" },
      { wk:"Wk 4", s5:"chop", s15:"bull", s40:"bull", com:"LONG ★★★★", note:"Year-end close; 93.63/87.13/68.32; 40-YR at year high" },
    ]
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a professional commodity futures seasonal analyst. Using the oats seasonal data below, provide:
1. A yearly bias summary (2–3 sentences on the macro arc)
2. A month-by-month table: Month | 40-YR bias | 15-YR bias | 5-YR bias | Combined | Action
3. Week-by-week breakdown for the THREE highest-conviction months
4. Top 3 trade setups with entry timing, direction, and seasonal rationale

=== OATS CBOT — SEASONAL FRAMEWORK ===
Asset: Oats CBOT (ZO) · 40-Year Seasonal (1980–2019)
Reference 02 Jan 2020: 40-YR=93.63, 15-YR=87.13, 5-YR=68.32

YEARLY ARC:
Jan = ALL TFs declining from October-November peak (year starts elevated but declining).
February = 15-YR drops to ~15 (near annual low) while 40-YR holds ~70 — unique February divergence.
Jan-August = H1 BEAR; all TFs decline to near-0 annual trough in August.
August = ALL THREE TFs near 0 simultaneously (annual trough).
October = 5-YR EXPLODES to 100; 40-YR surges to ~80 (most extreme October in grains).
November = 40-YR near annual high (~93); ALL TFs near annual highs.
December = 40-YR=93.63 (ANNUAL HIGH); 15-YR=87.13; 5-YR=68.32.

=== PLAYBOOK SIGNALS ===
SHORT #1: January through July — H1 bear; all TFs declining from elevated to near-0
SHORT #2: February — 15-YR drops to ~15 (near annual low for 15-YR)
LONG #1: August Wk3 — ALL TFs near 0; BUY AGGRESSIVELY; October-December target
LONG #2: October — 5-YR EXPLODES to 100; 40-YR surges to 80; maximum conviction
HOLD: December — year-end at 40-YR=93.63 (ANNUAL HIGH for 40-YR)

KEY FEATURES:
• February 15-YR drop to ~15: unique divergence (40-YR holds while 15-YR near-troughs)
• August near-0 trough: all three TFs simultaneously at near 0
• October 5-YR explosion to 100: most extreme single-month surge in oats
• December 40-YR=93.63 = ANNUAL HIGH: year ends at highest point (unique in grain complex)
• Year-end ALL TFs near annual highs: 40-YR=93.63, 15-YR=87.13, 5-YR=68.32
• This is the only grain where year-end is at or near the ANNUAL HIGH for the 40-YR

TF REFERENCE VALUES (02 Jan 2020):
• 40-YR: 93.63 | • 15-YR: 87.13 | • 5-YR: 68.32
Annual high (40-YR): 93.63 in DECEMBER | Annual high (5-YR): ~100 in October
Annual low: All TFs near 0 in August
`;
