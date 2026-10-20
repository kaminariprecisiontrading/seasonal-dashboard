// eurobund.js — Euro-Bund (EUREX) · 30-Year Seasonal (1990–2019)

const ASSET_CONFIG = {
  id:       "eurobund",
  name:     "Euro-Bund (EUREX)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 30-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · Euro-Bund EUREX · 30-Year Seasonal (1990–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "30-YR",
  ltSigKey: "sig30",
  ltKey:    "s30",
  ltAccent: "#4338ca",
};

const MONTHS = [
  {
    month: "January", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Year opens at elevated seasonal levels (30-YR ~90, 15-YR ~83, 5-YR ~72 carried from Dec). All TFs declining from November-December highs. Sell-into-strength setup.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "New year opens high; all TFs declining from Dec/Nov seasonal peaks" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Continued selling from elevated levels; 5-YR leading decline" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★",  note: "Mid-Jan weakness; approaching Feb volatility zone" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Late-Jan; all TFs still declining into the February spike-and-crash" },
    ],
  },
  {
    month: "February", sig5: "chop", sig15: "chop", sig30: "bear",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR spikes sharply to ~70 in early February, 15-YR briefly spikes to ~55, then BOTH CRASH back late Feb. 30-YR continues declining steadily. High volatility — avoid new positions.",
    weeks: [
      { wk: "Wk 1", s5: "bull",  s15: "bull",  s30: "chop", com: "CHOP",      note: "Early-Feb 5-YR spike to ~70; 15-YR rises to ~55 — do not chase" },
      { wk: "Wk 2", s5: "chop",  s15: "chop",  s30: "bear", com: "CHOP",      note: "5-YR and 15-YR at spike highs, peaking; 30-YR still declining" },
      { wk: "Wk 3", s5: "bear",  s15: "bear",  s30: "bear", com: "SHORT ★★★", note: "Post-spike crash; all TFs falling hard toward March trough" },
      { wk: "Wk 4", s5: "bear",  s15: "bear",  s30: "bear", com: "SHORT ★★★", note: "Late-Feb collapse in full force; approaching annual trough" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Annual seasonal trough — all TFs crash to near 0. Very deep and clean trough similar to Aus Bonds and Gilt. Flip to long at the trough for the Apr–Sep bull run.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Annual low zone; all TFs near 0 — deepest bear reading" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★★", note: "Trough depth continues; maximum bear conviction" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",       note: "Oversold base forming; early stabilisation" },
      { wk: "Wk 4", s5: "bull", s15: "chop", s30: "chop", com: "CHOP",       note: "5-YR leads early recovery; scale into longs from March trough" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from March trough; all TFs rising. 5-YR leads with a strong spike. 30-YR lagging but aligned. Build long positions on dips.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Recovery confirmed; buy off March base" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "All TFs rising; 5-YR breakout from lows" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Sustained recovery; add longs on dips" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Month-end continuation; all TFs aligned" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month; 5-YR continuing to lead. All TFs rising steadily from April base. High conviction — hold longs aggressively through month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "5-YR and 15-YR climbing fast; 30-YR following" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "All TFs strong; hold maximum long positions" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",  note: "Mid-May strength; buy any dip" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "Month-end; all TFs aligned bullish into June" },
    ],
  },
  {
    month: "June", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR spikes to ~65 in June (brief mid-cycle surge). 15-YR and 30-YR also climbing. Brief intra-month dip possible but primary trend is bullish. Hold longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "5-YR heading toward ~65; all TFs in strong bull phase" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",  note: "5-YR at peak or consolidating near 65; 30-YR still rising" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★", note: "Recovery from any mid-June dip; buy weakness" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",  note: "Month-end; positioned for July surge" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Explosive bull month; all TFs surging toward 70–90+. 5-YR leading toward 100. This is the strongest seasonal month of the year for Bund — hold maximum longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "July surge begins; all TFs accelerating" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "Peak bull conviction; 5-YR approaching 80-90" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★",  note: "Near-peak for 5-YR; 30-YR still surging" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★",  note: "Late-July: all approaching peaks; tighten stops on 5-YR" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "5-YR and 15-YR peak at ~100 (annual high for shorter TFs). 30-YR at ~70-75 and still rising toward Nov peak. Tighten stops on 5-YR/15-YR; hold 30-YR longs.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "5-YR and 15-YR at ~100; 30-YR strong and rising" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★★",  note: "Peak zone for 5-YR/15-YR; 30-YR still advancing" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "bull", com: "LONG ★★★",   note: "5-YR/15-YR stalling; 30-YR diverges bullish" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bull", com: "LONG ★★",    note: "5-YR/15-YR rolling over; hold 30-YR only" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "chop", sig30: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "5-YR falls sharply from August highs. 15-YR choppy. 30-YR moderating. TF divergence — exit shorter TF longs, hold 30-YR as it builds toward November peak.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "chop", s30: "bull",  com: "LONG ★★",   note: "30-YR still advancing; 5-YR declining — hold 30-YR only" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "chop",  com: "CHOP",       note: "Increasing pressure; 30-YR stabilising" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s30: "chop",  com: "CHOP",       note: "No clean signal; await October directional clarity" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s30: "bear",  com: "SHORT ★★",   note: "Sep closes bear; all TFs declining into Oct" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig30: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-August decline continues; all TFs below mid-range. Sell rallies — October sets up the powerful November 30-YR surge.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★★", note: "Oct bear; all TFs declining post-August peak" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s30: "bear", com: "SHORT ★★",  note: "Continued weakness; sell rallies" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s30: "chop", com: "CHOP",      note: "Mid-Oct stabilisation; base for November surge" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★",   note: "Late-Oct: 30-YR begins November surge — early long entry" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "30-YR surges to near 100 — ANNUAL HIGH for the 30-YR. 15-YR also recovering strongly. The highest-conviction seasonal trade in the Bund calendar. Buy October weakness.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "30-YR powering toward 100; maximum long conviction" },
      { wk: "Wk 2", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★★★★", note: "30-YR at or near 100 (annual high); hold all longs" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★★★",  note: "30-YR near peak; begin scaling out" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★",   note: "Month-end; 30-YR, 15-YR and 5-YR all elevated into Dec" },
    ],
  },
  {
    month: "December", sig5: "bull", sig15: "bull", sig30: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Year ends at very high seasonal levels (30-YR ~90, 15-YR ~83, 5-YR ~72) — the cycle completes back to January starting levels. Year-end carry: hold positions into January.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★★", note: "Early Dec; all TFs at elevated levels from November peak" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s30: "bull", com: "LONG ★★",  note: "Mid-Dec consolidation; 30-YR stable ~90" },
      { wk: "Wk 3", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★",  note: "Year-end; 30-YR holds near 90 into Jan seasonal" },
      { wk: "Wk 4", s5: "chop", s15: "bull", s30: "bull", com: "LONG ★★",  note: "Final week: 30-YR ~90, 15-YR ~83, 5-YR ~72 — Jan reset" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following Euro-Bund (EUREX) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: Euro-Bund (EUREX)
Exchange: EUREX | Seasonal History: 30-Year (1990–2019)

YEARLY ARC:
Year carries elevated from Dec/Nov (30-YR ~90, 15-YR ~83, 5-YR ~72). Declining Jan–Mar.
Feb: 5-YR anomalous spike to ~70 early, then crashes back.
Mar: Annual trough — all near 0.
Apr–Aug: Strong bull run; all TFs rising. 5-YR leads to ~65 in June, surges to ~100 in Aug.
Aug: 5-YR and 15-YR peak at ~100 (shorter TF annual high).
Sep–Oct: Post-peak decline for 5-YR and 15-YR; 30-YR moderating.
Nov: 30-YR annual HIGH at ~100. Top seasonal trade.
Dec: All TFs at year-end highs (~90/83/72). Carries into January.

MONTHLY SIGNALS:
Jan  — SHORT ★★★   | Declining from elevated year-start levels
Feb  — CHOP  ★★    | 5-YR spike to ~70 then crash; volatile
Mar  — SHORT ★★★★  | Annual trough near 0; flip to long
Apr  — LONG  ★★★   | Recovery; 5-YR leads from March lows
May  — LONG  ★★★★  | Strong bull; all TFs rising
Jun  — LONG  ★★★★  | 5-YR spikes to ~65; all aligned bullish
Jul  — LONG  ★★★★★ | Explosive bull; max long conviction
Aug  — LONG  ★★★★  | 5-YR/15-YR peak at ~100; 30-YR advancing
Sep  — CHOP  ★★    | TF divergence; exit 5-YR, hold 30-YR
Oct  — SHORT ★★★   | Post-peak decline; sell rallies
Nov  — LONG  ★★★★★ | 30-YR annual HIGH at ~100; top trade
Dec  — LONG  ★★★   | Year-end carry; all TFs elevated

KEY OBSERVATIONS:
- March trough is the cleanest setup entry for the April–August bull run
- November is the 30-YR annual high — this is the #1 seasonal trade of the year
- 5-YR leads the recovery and peaks first (August); 30-YR peaks later (November)
- European rates tend to follow a similar seasonal arc to UK Gilt and Aus Bonds
- The February 5-YR spike is a false signal — do NOT chase it
`;
