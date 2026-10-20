/**
 * data/fx-gbpusd.js — GBPUSD Forex Seasonal
 * Derived from: GBP/CME futures + USD Index/ICE futures (inverted)
 */

const ASSET_CONFIG = {
  id:       "fx-gbpusd",
  name:     "GBP / USD",
  sub:      "Forex Seasonal · Derived from GBP CME + USD ICE Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · British Pound CME (40-YR) · USD Index ICE (35-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "BEARISH", stars: 2,
    note: "GBP declining + USD rising = GBPUSD under pressure. Net bearish.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★☆☆☆", note:"GBP falling, USD rising. GBPUSD falls." },
      { wk:"Wk 2", s5:"chop", s15:"bear", sLt:"bear", com:"SHORT ★★☆☆☆", note:"Continue." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"Both forces aligned bearish GBPUSD." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"Into Feb trough. Hold short." },
    ]
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "TROUGH / BASE", stars: 2,
    note: "GBP at annual trough + USD peaking. Both reversing simultaneously. Stand aside.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"bear", sLt:"bear", com:"COVER ★★☆☆☆", note:"GBP near trough. Cover shorts." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both transitioning. Stand aside." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"chop", com:"LONG WATCH ★★★☆☆", note:"GBP beginning recovery + USD starting to decline = GBPUSD lifting. Early long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"LONG ★★★☆☆", note:"GBP recovering + USD declining. GBPUSD rising." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "GBP surging to its annual peak + USD declining = GBPUSD strongest bull window of year. All TFs aligned.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"GBP surging, USD declining. Maximum GBPUSD bull window." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Both forces aligned. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Approaching Apr peak. Remain long." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / WATCH ★★★★☆", note:"GBP near absolute peak. USD still declining. Watch for GBP rollover." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SELL", stars: 5,
    note: "Playbook: BUY Wk1 (GBP peak), SELL Wk4. GBP collapses from peak + USD flips LONG Wk4 = double pressure on GBPUSD.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"chop", com:"EXIT / SHORT ★★★★☆", note:"Playbook BUY Wk1 — GBP at absolute peak ~100. EXIT all longs immediately. Flip short as GBP begins collapse. USD still declining (partial offset)." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"GBP waterfall + USD still declining but slower. GBP dominant → GBPUSD falls hard." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"GBP deep decline. USD flat/declining. GBPUSD high conviction short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★★★", note:"Playbook SELL Wk4 confirmed. GBP declining + USD flips LONG = double pressure. Highest conviction short of month." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "GBP waterfall continues + USD recovering from trough. Both forces push GBPUSD lower.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP still declining. USD recovering = additional GBPUSD downward pressure." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Hold short. Both bearish for GBPUSD." },
      { wk:"Wk 3", s5:"bear", s15:"chop", sLt:"chop", com:"SHORT / COVER ★★★☆☆", note:"GBP trough approaching. Begin covering." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"COVER ★★☆☆☆", note:"GBP basing + USD strengthening. Cover all shorts." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "GBP 5-yr bounces but USD also bouncing. Conflicting forces. Avoid.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"GBP 5-yr bouncing vs USD also recovering. No net edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Remain cautious." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"USD rolling over from mid-year peak = slight GBPUSD positive. Watch." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "Both GBP and USD choppy. No reliable GBPUSD signal.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"No edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Directionless." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Into Aug." },
    ]
  },
  {
    month: "August", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "GBP choppy + USD also declining. No consistent GBPUSD direction.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Both choppy." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"No edge." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Stand aside." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP secondary decline + USD still weak. Net GBPUSD bearish — short." },
    ]
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "GBP secondary trough + USD also weak but recovering. GBP decline dominant.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP declining to trough. USD weak. GBPUSD falls." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"Hold." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP approaching Sep trough." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"COVER ★★☆☆☆", note:"GBP trough. Cover. Oct recovery incoming." },
    ]
  },
  {
    month: "October", sig5: "bull", sig15: "bull", sigLt: "bear",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "GBP recovering + USD major reversal LONG. Conflicting forces. USD dominance may cap GBPUSD.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"GBP recovering vs USD reversing strongly LONG. Conflicted — avoid." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"Both forces active. No clean bias." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"Continue standing aside." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"Into Nov. Still conflicted." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "GBP approaching Nov peak but USD in strongest seasonal bull window. USD dominance pushes GBPUSD lower.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD surging strongest seasonal window. GBP rising but USD faster. GBPUSD net bearish." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD dominance. Short GBPUSD." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"GBP peaking and rolling. USD still strong. GBPUSD falls further." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP declining + USD strong = both forces aligned bearish GBPUSD." },
    ]
  },
  {
    month: "December", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "GBP one of weakest Dec TFs (near annual lows) + USD in peak seasonal window = GBPUSD strongly lower.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"GBP sharply lower + USD still high. GBPUSD falls." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Hold short. Both forces aligned." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"chop", com:"SHORT ★★★☆☆", note:"GBP still at lows. USD slightly easing." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"COVER ★★☆☆☆", note:"Year end. Cover and reset for Jan." },
    ]
  },
];

const SEASONAL_DATA = `
GBPUSD — FOREX SEASONAL ANALYSIS
Derived from: British Pound CME Futures (40-YR) + USD Index ICE Futures (35-YR, inverted)

=== GBP COMPONENT (bullish GBP = GBPUSD rising) ===
Jan: GBP declining to Feb trough.
Feb: GBP absolute trough → recovery late Feb.
Mar–Apr Wk1: GBP surges to absolute annual peak ~100.
Apr Wk2–May: GBP waterfall decline.
Jun–Aug: GBP choppy.
Sep: GBP secondary trough.
Oct–Nov: GBP recovery, peaks Nov.
Dec: GBP near annual lows (sharp decline).

=== USD COMPONENT (bullish USD = GBPUSD falling) ===
Jan: USD rising (bearish GBPUSD).
Feb: USD peaking late Feb then rolling.
Mar–May: USD declining (bullish GBPUSD).
Jun–Jul: USD mid-year bounce.
Aug–Sep: USD declining.
Oct: USD MAJOR reversal LONG.
Nov–Dec: USD peak seasonal strength.

=== COMBINED NET EFFECT ===
Jan: GBP falling + USD rising = GBPUSD lower.
Feb: Both transitioning = stand aside.
Mar: GBP surging + USD declining = GBPUSD strongest LONG of year.
Apr Wk1: GBP peaks → flip short. USD still declining (partial offset — GBP dominant).
Apr Wk2–4: GBP waterfall + USD turning LONG = double GBPUSD downward pressure.
May: GBP still weak + USD recovering = GBPUSD lower.
Jun–Sep: Mixed/choppy.
Oct: GBP recovering but USD reversing strongly = conflicted.
Nov–Dec: GBP weak/declining + USD peak strength = GBPUSD lower.

=== PLAYBOOK SIGNALS (April) ===
GBPUSD BUY: Wk1 (GBP absolute peak — exit/flip immediately)
GBPUSD SELL: Wk4 (GBP declining + USD flipping LONG = double pressure, highest conviction)

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Provide: 1) Yearly bias summary. 2) Month-by-month bias. 3) Week-by-week April. 4) Top 3 setups.
Format clearly. Flag component conflicts explicitly.
`;
