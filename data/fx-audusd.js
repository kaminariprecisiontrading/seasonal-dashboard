/**
 * data/fx-audusd.js — AUDUSD Forex Seasonal
 * Derived from: AUD/CME futures + USD Index/ICE futures
 * Methodology: AUD seasonal tendency vs inverted USD seasonal tendency
 */

const ASSET_CONFIG = {
  id:       "fx-audusd",
  name:     "AUD / USD",
  sub:      "Forex Seasonal · Derived from AUD CME + USD ICE Futures · 5-YR · 15-YR · Long-YR",
  footnote: "Derived from Moore Research Center © 2020 · AUD/USD CME (34-YR) · USD Index ICE (35-YR) · 15-Year · 5-Year overlays.",
  ltLabel:  "Long-YR",
  ltSigKey: "sigLt",
  ltKey:    "sLt",
  ltAccent: "#2563eb",
};

const MONTHS = [
  {
    month: "January", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD seasonal bull + USD seasonal bear = AUDUSD bullish. All TFs aligned.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD rising, USD falling. Strong seasonal tailwind." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Continuation. Hold longs." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Trend intact." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Building into Feb/Mar peak window." },
    ]
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "AUD continues rising. USD choppy/peaking. Net AUDUSD bullish but watch late Feb.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"AUD strong, USD still choppy. Hold." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★☆", note:"Continued strength." },
      { wk:"Wk 3", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★★☆☆", note:"USD 35-yr peaking late Feb. Monitor for AUD divergence." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★★☆☆", note:"USD beginning to decline = AUD tailwind. But AUD near its own peak." },
    ]
  },
  {
    month: "March", sig5: "bull", sig15: "bull", sigLt: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "AUD at peak zone + USD declining = maximum AUDUSD bull window. All TFs aligned.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"AUD peaking, USD declining. Ideal AUDUSD long." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Peak divergence in favour of AUDUSD. Hold." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bull", com:"LONG ★★★★★", note:"Strong window. All TFs aligned." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bull", com:"LONG / WATCH ★★★★☆", note:"AUD approaching its absolute peak. USD declining. Watch for AUD rollover." },
    ]
  },
  {
    month: "April", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "flip", combinedLabel: "FLIP MONTH", stars: 5,
    note: "Both AUD and USD flip simultaneously in Apr — creating extreme volatility. AUD collapses, USD also reverses Wk4. Complex month.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"MIXED ★★☆☆☆", note:"AUD peaks and flips bearish. USD also still declining. Net effect unclear Wk1 — avoid or very short-term." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD sharply lower. USD still declining but slower. Net AUDUSD bearish — short." },
      { wk:"Wk 3", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★★", note:"AUD waterfall. USD flat/declining. AUDUSD falls hard. Highest conviction short." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bull", com:"SHORT ★★★☆☆", note:"AUD still declining. USD flips LONG Wk4 (adds additional AUDUSD downward pressure). Hold short." },
    ]
  },
  {
    month: "May", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "AUD waterfall continues. USD at trough (slightly bullish). Net still AUDUSD bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"AUD deep decline. USD near trough. AUDUSD still falls." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★★☆", note:"Hold short. AUD dominant driver." },
      { wk:"Wk 3", s5:"bear", s15:"chop", sLt:"chop", com:"SHORT / COVER ★★★☆☆", note:"AUD trough approaching. Begin reducing exposure." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"bull", com:"COVER ★★☆☆☆", note:"USD recovering (bearish for AUDUSD) while AUD bases. Cover shorts." },
    ]
  },
  {
    month: "June", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "AUD 15-yr bounces, but USD also bouncing. Conflicting forces. Avoid.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Both AUD and USD bouncing. Net direction unclear." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"No edge." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Still mixed." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★★☆☆☆", note:"Into Jul. Remain cautious." },
    ]
  },
  {
    month: "July", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "CHOPPY", stars: 1,
    note: "AUD choppy. USD peaking then rolling. No clean AUDUSD signal.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"USD peaking early Jul. AUD choppy. No edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"AVOID ★☆☆☆☆", note:"Both choppy." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"WATCH ★★☆☆☆", note:"USD rolling over (positive for AUDUSD). Monitor." },
      { wk:"Wk 4", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD secondary bear leg + USD declining = net uncertain. AUD dominant — short bias." },
    ]
  },
  {
    month: "August", sig5: "bear", sig15: "bear", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "AUD secondary bear. USD also declining. AUD falls faster — AUDUSD net bearish.",
    weeks: [
      { wk:"Wk 1", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD declining. USD also weak. AUDUSD falls on AUD weakness." },
      { wk:"Wk 2", s5:"bear", s15:"bear", sLt:"bear", com:"SHORT ★★★☆☆", note:"Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"HOLD ★★☆☆☆", note:"Flattening. Tighten stops." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"HOLD ★★☆☆☆", note:"Into Sep. Maintain cautious short." },
    ]
  },
  {
    month: "September", sig5: "chop", sig15: "chop", sigLt: "chop",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "AUD basing. USD also near trough. No clean AUDUSD direction.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Both near secondary troughs. No edge." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Stand aside." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"chop", com:"NEUTRAL ★★☆☆☆", note:"Transition month." },
      { wk:"Wk 4", s5:"chop", s15:"chop", sLt:"chop", com:"WATCH ★★☆☆☆", note:"Both beginning recovery. Watch for AUDUSD direction." },
    ]
  },
  {
    month: "October", sig5: "chop", sig15: "chop", sigLt: "flip",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "USD has major Oct reversal LONG — negative for AUDUSD. AUD also recovering. Conflicted.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD 35-yr reversing strongly LONG = AUDUSD downward pressure. Short bias." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD strength continues to weigh." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"AUD recovering vs USD strengthening. Conflicted — avoid." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"Both rising. Net AUDUSD direction unclear." },
    ]
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sigLt: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "USD in strongest seasonal bull window (Nov/Dec). AUD recovering but slower. Net AUDUSD bearish.",
    weeks: [
      { wk:"Wk 1", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD surging seasonally. AUD lagging. AUDUSD falls." },
      { wk:"Wk 2", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"USD bull dominant. Hold short." },
      { wk:"Wk 3", s5:"chop", s15:"chop", sLt:"bear", com:"SHORT ★★★☆☆", note:"Continue." },
      { wk:"Wk 4", s5:"bull", s15:"bull", sLt:"bear", com:"SHORT ★★★☆☆", note:"AUD late Nov recovery vs USD strength. USD dominant. Short AUDUSD." },
    ]
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sigLt: "bear",
    combined: "chop", combinedLabel: "MIXED", stars: 2,
    note: "AUD recovering. USD at peak zone (Nov/Dec high). Conflicting forces. Avoid or light.",
    weeks: [
      { wk:"Wk 1", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"AUD lifting vs USD still high. Net direction unclear." },
      { wk:"Wk 2", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"Both elevated. No edge." },
      { wk:"Wk 3", s5:"bull", s15:"bull", sLt:"bear", com:"MIXED ★★☆☆☆", note:"Remain cautious." },
      { wk:"Wk 4", s5:"chop", s15:"bull", sLt:"chop", com:"WATCH ★★☆☆☆", note:"Into Jan. Both beginning new cycles. Watch for Jan LONG setup." },
    ]
  },
];

const SEASONAL_DATA = `
AUDUSD — FOREX SEASONAL ANALYSIS
Derived from: AUD/USD CME Futures (34-YR seasonal) + USD Index ICE Futures (35-YR seasonal)
Methodology: AUD seasonal tendency combined with inverse USD seasonal tendency.

=== AUD COMPONENT (bullish = AUD rising = AUDUSD rising) ===
Jan–Mar: AUD strongly bullish. Peaks early Apr at absolute high.
Apr Wk1: AUD absolute peak → sharp reversal.
Apr Wk2–4: AUD waterfall decline.
May–Jun: AUD deep trough zone. Weak.
Jul: AUD choppy.
Aug–Sep: AUD secondary bear leg.
Oct–Nov: AUD recovering.
Dec: AUD recovery continues.

=== USD COMPONENT (bullish USD = AUDUSD falling) ===
Jan: USD rising (bearish AUDUSD).
Feb: USD choppy/peaking late Feb.
Mar–May: USD declining (bullish AUDUSD).
Jun–Jul: USD bouncing (bearish AUDUSD).
Aug–Sep: USD declining again.
Oct: USD MAJOR reversal — strongest bull signal of year (bearish AUDUSD).
Nov–Dec: USD surging — peak seasonal strength (bearish AUDUSD).

=== COMBINED NET EFFECT ===
Jan–Mar: AUD bull + USD bear = AUDUSD strongly bullish. Best long window.
Apr Wk1: AUD peaks, USD still declining = brief mixed/chop.
Apr Wk2–4: AUD collapses + USD still declining = AUDUSD net bearish (AUD dominant).
May: AUD still weak = AUDUSD bearish.
Jun–Sep: Both choppy = AUDUSD choppy/avoid.
Oct–Nov: USD surging strongly = AUDUSD bearish despite AUD recovery.
Dec: Conflicted — both in transition.

=== PLAYBOOK SIGNALS ===
AUDUSD priority window: Jan–Mar LONG (highest conviction).
AUDUSD secondary: Apr Wk2–4 SHORT (AUD waterfall dominant).
AUDUSD avoid: Jun–Sep (both assets choppy).
AUDUSD Oct–Nov: SHORT bias (USD seasonal dominance).

=== TASK ===
You are a professional trading analyst and seasonal specialist.

Using the component seasonal data above, provide:

1. YEARLY BIAS SUMMARY — Full-year arc for AUDUSD explaining how AUD and USD seasonal forces interact month by month.

2. MONTH-BY-MONTH BIAS — Jan through Dec. For each: net directional bias, which component (AUD or USD) is dominant, conviction level.

3. WEEK-BY-WEEK APRIL BIAS — Most complex month. AUD collapsing while USD transitioning. Give exact week-by-week guidance.

4. TOP 3 SEASONAL TRADE SETUPS — Highest conviction AUDUSD trades across the year, with entry, duration, conviction, and which components confirm.

Format clearly. Be specific. Flag all component conflicts explicitly.
`;
