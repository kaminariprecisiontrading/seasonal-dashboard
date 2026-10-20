/**
 * data/fx-usdjpy.js — USDJPY Forex Seasonal
 * Derived from: USD Index/ICE futures + JPY/CME futures (inverted)
 * Methodology: USD seasonal tendency vs inverted JPY seasonal tendency
 * Note: USD/JPY rises when USD strong OR JPY weak. Falls when USD weak OR JPY strong.
 */

const ASSET_CONFIG = {
  id:       "fx-usdjpy",
  name:     "USD / JPY",
  sub:      "Forex Seasonal · Derived from USD ICE + JPY CME Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · USD Index ICE (35-YR) · Japanese Yen CME (40-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "USD rising but JPY also rising strongly. JPY seasonal dominance → USDJPY falls.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"JPY rising from lows. USD also rising but JPY faster. Net USDJPY bearish." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"JPY strength dominant. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"Continue." },
      { wk:"Wk 4", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT / WATCH ★★☆☆☆", note:"Approaching Feb complex zone." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "USD peaking (35-yr late Feb). JPY troughing. Both reversing → USDJPY direction unclear.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both USD and JPY in transition. No edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"bull", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"USD rolling over (bearish USDJPY) while JPY recovering (also bearish USDJPY). Watch." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"chop", com:"WATCH ★★☆☆☆", note:"Both turning. Direction TBC." },
    ]
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "USD declining + JPY surging = USDJPY strongly bearish. Both forces aligned.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"USD declining, JPY surging. Both forces drive USDJPY lower." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Strong conviction. Hold short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY approaching its peak. USD still declining. Maintain." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Into Apr. USD declining + JPY peaking = USDJPY falls sharply." },
    ]
  },
  {
    month: "April", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "COMPLEX", stars: 2,
    note: "Playbook: BUY Wk1, SELL end Wk2/early Wk3, re-entry Wk4. JPY peaks Wk1 then collapses — USD also turning. Highly complex.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"chop", sLt:"chop", com:"LONG BRIEF ★★☆☆☆", note:"Playbook BUY Wk1 — JPY at absolute peak (USDJPY low). USD still declining. Brief long as JPY begins to collapse. Very short-term." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"Playbook SELL end Wk2 — JPY collapsing fast (USDJPY rising). USD still declining but JPY dominant. Long USDJPY." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG ★★★☆☆", note:"Playbook SELL early Wk3 — JPY waterfall continues. USDJPY rising." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Playbook re-entry Wk4 — USD flips LONG + JPY still weak = USDJPY strongly bullish." },
    ]
  },
  {
    month: "May", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "USD at trough/recovering. JPY weak but stabilising. Direction unclear.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both assets transitioning. No clear USDJPY bias." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"USD recovering + JPY still weak = USDJPY lifting." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"Into Jun. USD/JPY bounce." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "USD mid-year bounce + JPY weak = USDJPY rising. Medium conviction.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"USD bouncing, JPY still weak. USDJPY rising." },
      { wk:"Wk 2", s5:"chop", s15:"bull", sLt:"bull", com:"LONG ★★★☆☆", note:"Continue." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"USD peaking at mid-year bounce. JPY beginning recovery." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"EXIT ★★☆☆☆", note:"USD rolling over + JPY recovering = USDJPY topping. Exit longs." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "USD declining from mid-year peak + JPY surging to annual high = USDJPY strongly lower.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD declining + JPY surging. USDJPY falls." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"Both forces aligned bearish. Hold." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY approaching Aug peak. USD still declining. Maximum bearish pressure." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Hold into Aug." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "JPY at absolute annual peak + USD declining = USDJPY at seasonal low. Exit longs, hold shorts.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"JPY near peak. USD weak. USDJPY at lows. Hold short." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"EXIT / FLIP ★★★★☆", note:"JPY peaks Aug Wk2 → collapses. USD still weak. Complex — begin reducing short." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"JPY waterfall begins. USD still weak but JPY collapse dominant. USDJPY rising — flip long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"JPY declining fast. Hold long USDJPY." },
    ]
  },
  {
    month: "September", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "JPY sharpest decline of year (Sep is highest conviction SHORT for JPY) = USDJPY surges. All TFs aligned.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"JPY in sharpest seasonal decline. USD also recovering. USDJPY highest conviction LONG of year." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Peak USDJPY bull window. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Continue. All forces aligned." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Approaching trough of JPY cycle. Begin watching for reversal." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "USD major reversal LONG in Oct + JPY also recovering. Both rising = USDJPY mixed.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"USD reversing LONG + JPY also recovering. Both up = USDJPY neutral." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Direction unclear." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"WATCH ★★☆☆☆", note:"USD strengthening faster than JPY recovery. Watch for USDJPY LONG." },
    ]
  },
  {
    month: "November", sig5: "bear", sig15: "bear", sigLt: "bull",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "USD in strongest bull window + JPY also recovering. Net direction depends on relative strength.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★☆☆", note:"USD surging seasonally. JPY recovering but slower. Net slight USDJPY bullish." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★☆☆", note:"USD dominance. Hold." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bull", com:"LONG ★★★☆☆", note:"Continue." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"MIXED ★★☆☆☆", note:"JPY strengthening late Nov. USD still high. Conflicted." },
    ]
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "Both USD and JPY in year-end transition. No clean USDJPY signal.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Both transitioning. No edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Year end noise." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"WATCH ★☆☆☆☆", note:"Into Jan. Both begin new cycles." },
    ]
  },
];

const SEASONAL_DATA = `
USDJPY — FOREX SEASONAL ANALYSIS
Derived from: USD Index ICE Futures (35-YR) + Japanese Yen CME Futures (40-YR, inverted)
Note: USDJPY rises when USD seasonal is bullish OR JPY seasonal is bearish (and vice versa).

=== USD COMPONENT (bullish USD = USDJPY rising) ===
Jan: USD rising.
Feb: USD peaking late Feb (35-yr peak).
Mar–May: USD declining.
Jun–Jul: USD mid-year bounce then peaks early Jul.
Aug–Sep: USD declining.
Oct: USD MAJOR reversal LONG — strongest seasonal signal of year.
Nov–Dec: USD surging — peak seasonal strength.

=== JPY COMPONENT (bearish JPY = USDJPY rising) ===
Jan: JPY rising strongly (bearish USDJPY).
Feb: JPY troughing (bullish USDJPY potential).
Mar: JPY surging (bearish USDJPY).
Apr Wk1: JPY absolute peak → collapses (bullish USDJPY).
Apr Wk2–Sep: JPY weak/declining (bullish USDJPY).
Aug: JPY absolute annual peak Aug Wk2 → sharp collapse (strongly bullish USDJPY from Wk3).
Sep: JPY sharpest decline of year (most bullish USDJPY month).
Oct–Nov: JPY recovering (bearish USDJPY).
Dec: Both transitioning.

=== COMBINED NET EFFECT ===
Jan: JPY strong + USD rising = net USDJPY lower (JPY dominant).
Feb: Both transitioning = choppy.
Mar: USD declining + JPY surging = USDJPY strongly lower.
Apr: Complex. JPY peaks Wk1 then collapses. USD turning Wk4.
May–Jun: USD recovering + JPY weak = USDJPY lifting.
Jul–Aug Wk2: USD declining + JPY near peak = USDJPY lower.
Aug Wk3 – Sep: JPY collapsing + USD recovering = USDJPY highest conviction LONG.
Oct: Both rising = neutral.
Nov: USD surging seasonally = moderate USDJPY LONG.
Dec: Both transitioning = avoid.

=== PLAYBOOK SIGNALS (April) ===
USDJPY BUY: Wk1 (JPY at absolute peak — brief long as JPY begins collapse)
USDJPY SELL: End Wk2 / early Wk3 (JPY collapsing = USDJPY rising — this is actually a BUY signal for USDJPY)
USDJPY RE-ENTRY: Wk4 (USD flips long + JPY weak = strong LONG)

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for USDJPY explaining USD and JPY seasonal interaction.

2. MONTH-BY-MONTH BIAS — Jan through Dec. Net directional bias, dominant component, conviction level.

3. WEEK-BY-WEEK APRIL BIAS — Complex month. Explain how JPY peak collapse + USD transition creates USDJPY signals.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction. Sep LONG is the standout — confirm with both components.

Format clearly. Be specific. Flag component conflicts.
`;
