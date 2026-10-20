// austbonds10.js — 10-Year Aus T-Bonds (SFE) · 36-Year Seasonal (1984–2019)

const ASSET_CONFIG = {
  id:       "austbonds10",
  name:     "10-Year Aus T-Bonds (SFE)",
  sub:      "Seasonal Tendency Analysis · 5-YR · 15-YR · 36-YR · Moore Research Center",
  footnote: "Moore Research Center © 2020 · 10-Year Aus T-Bonds SFE · 36-Year Seasonal (1984–2019) · 15-Year · 5-Year overlays.",
  ltLabel:  "36-YR",
  ltSigKey: "sig36",
  ltKey:    "s36",
  ltAccent: "#1e40af",
};

const MONTHS = [
  {
    month: "January", sig5: "chop", sig15: "chop", sig36: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Year opens at seasonal lows across all TFs (36-YR ~5–10, 15-YR ~15–20, 5-YR ~20–25). Sideways to very slightly higher with no conviction. No directional trade.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "All TFs at annual lows; flat with slight upward drift" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "Marginally rising; no meaningful signal" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "5-YR slightly volatile but no trend; wait for Feb signal" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "Month ends flat; set up for Feb bull attempt" },
    ],
  },
  {
    month: "February", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "First directional month of the year — all TFs rise from Jan lows, with 5-YR leading to ~35–40 by mid-month. Bull first half, topping second half.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "All TFs rising; clean early-Feb bull leg" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "5-YR approaching ~35–40 peak; continuation" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",   note: "5-YR peaking and reversing; take profits on longs" },
      { wk: "Wk 4", s5: "bear", s15: "chop", s36: "chop", com: "CHOP ★★",   note: "5-YR declining; transition to March bear phase begins" },
    ],
  },
  {
    month: "March", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Annual seasonal trough — 5-YR crashes to near 0, 15-YR follows. March is the year's deepest bear month. All TFs confirm short. Late month may see first recovery signal.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Decline accelerates from Feb; all TFs falling" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★", note: "5-YR in freefall toward year lows; maximum bear" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★", note: "5-YR near 0; trough zone — stay short, watch for reversal" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Annual lows forming; close shorts, prepare April recovery long" },
    ],
  },
  {
    month: "April", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 3,
    note: "Recovery from March trough — all TFs begin rising from near-zero lows. 5-YR leads. Conviction builds as month progresses toward May's stronger bull leg.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",   note: "Still near lows; early tentative recovery — watch, don't rush" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "Recovery confirmed; all TFs rising from trough" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",  note: "Continued bull recovery; add to longs" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★", note: "Strong close to April; momentum building into May" },
    ],
  },
  {
    month: "May", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 4,
    note: "Strong bull month — 5-YR surges from ~30 to ~65–70, 15-YR and 36-YR rise solidly. One of the two key bull windows of the year. Hold longs through the month.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "Bull momentum from April carries strongly into May" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "5-YR surging; all TFs in strong uptrend" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "5-YR approaching ~65–70; hold maximum exposure" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★",   note: "May peak forming; begin tightening stops ahead of June reversal" },
    ],
  },
  {
    month: "June", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 4,
    note: "Sharp bear reversal — 5-YR drops from ~65 to ~28–30, 15-YR and 36-YR confirm. Second significant trough of the year. Sets up the most powerful seasonal move: the July surge.",
    weeks: [
      { wk: "Wk 1", s5: "flip", s15: "chop", s36: "chop", com: "FLIP ★★★",   note: "May highs giving way; begin rotating from long to short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★", note: "Sharp decline across all TFs; short confirmed" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★", note: "5-YR near June lows (~28–30); hold shorts" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Near June trough; close shorts — explosive July rally imminent" },
    ],
  },
  {
    month: "July", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "The strongest seasonal month of the year — 5-YR surges from near 0 to ~100, 15-YR and 36-YR surge in lockstep. Maximum conviction long. Hold throughout July.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "Explosive reversal from June lows; buy aggressively" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "5-YR surging toward ~70–80; maximum long position" },
      { wk: "Wk 3", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "5-YR approaching ~100; all TFs near year peaks" },
      { wk: "Wk 4", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★",  note: "Near year peak; hold longs but tighten into August" },
    ],
  },
  {
    month: "August", sig5: "bull", sig15: "bull", sig36: "bull",
    combined: "bull", combinedLabel: "LONG", stars: 5,
    note: "Year peak month — all TFs at 80–100. 5-YR and 15-YR peak during August; 36-YR peaks in September. Hold early-month longs; prepare to flip short as September approaches.",
    weeks: [
      { wk: "Wk 1", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "All TFs at year highs; fully long" },
      { wk: "Wk 2", s5: "bull", s15: "bull", s36: "bull", com: "LONG ★★★★★", note: "Peak zone — hold maximum longs" },
      { wk: "Wk 3", s5: "flip", s15: "bull", s36: "bull", com: "FLIP ★★★",   note: "5-YR peaking and reversing; 36-YR still rising — begin reducing" },
      { wk: "Wk 4", s5: "bear", s15: "flip", s36: "bull", com: "FLIP ★★★",   note: "Shorter TFs rolling over; close longs, set up Sept short" },
    ],
  },
  {
    month: "September", sig5: "bear", sig15: "bear", sig36: "flip",
    combined: "flip", combinedLabel: "FLIP", stars: 4,
    note: "Peak and reversal — 36-YR reaches its seasonal high (~100) early September then declines. 5-YR and 15-YR already falling. Flip from long to short as month progresses.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bull", com: "FLIP ★★★★",  note: "36-YR still near peak; 5-YR/15-YR reversing — critical flip point" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "All TFs now declining; short confirmed" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★★", note: "Seasonal decline in full force; hold shorts" },
      { wk: "Wk 4", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Continued decline into October; maintain short" },
    ],
  },
  {
    month: "October", sig5: "bear", sig15: "bear", sig36: "bear",
    combined: "bear", combinedLabel: "SHORT", stars: 3,
    note: "Post-peak seasonal decline — all TFs falling from September highs. 5-YR drops to ~30–40, 15-YR and 36-YR declining. Sell rallies throughout the month.",
    weeks: [
      { wk: "Wk 1", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "Continued decline from September peak; hold short" },
      { wk: "Wk 2", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "All TFs falling; sell into any bounces" },
      { wk: "Wk 3", s5: "bear", s15: "bear", s36: "bear", com: "SHORT ★★★",  note: "5-YR at low levels; 36-YR still declining from highs" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",   note: "Decline slowing; possible stabilisation into November" },
    ],
  },
  {
    month: "November", sig5: "chop", sig15: "chop", sig36: "chop",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "Mixed month — 36-YR stabilises at elevated levels (~70–80), 5-YR and 15-YR declining but without strong trend. No clean directional trade; stand aside.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "Mixed signals across TFs; no clear trade" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "5-YR attempting partial recovery; 15-YR still declining" },
      { wk: "Wk 3", s5: "chop", s15: "bear", s36: "chop", com: "CHOP ★★",  note: "15-YR declining; 36-YR holding elevated — mixed" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s36: "chop", com: "CHOP ★★",  note: "Month ends mixed; 36-YR stable, shorter TFs flat" },
    ],
  },
  {
    month: "December", sig5: "chop", sig15: "chop", sig36: "bull",
    combined: "chop", combinedLabel: "CHOP", stars: 2,
    note: "TF divergence defines December — 36-YR holds at year-end highs (~88–90), while 5-YR and 15-YR drift lower. The 36-YR seasonal position resets for the next year's January trough.",
    weeks: [
      { wk: "Wk 1", s5: "chop", s15: "chop", s36: "bull", com: "CHOP ★★",  note: "36-YR elevated; 5-YR and 15-YR declining — mixed" },
      { wk: "Wk 2", s5: "chop", s15: "chop", s36: "bull", com: "CHOP ★★",  note: "TF divergence continues; 36-YR stable near 85–90" },
      { wk: "Wk 3", s5: "chop", s15: "chop", s36: "bull", com: "CHOP ★★",  note: "Year-end consolidation; no strong signal" },
      { wk: "Wk 4", s5: "chop", s15: "chop", s36: "bull", com: "CHOP ★★",  note: "36-YR closes year at ~88–90; resets for January low" },
    ],
  },
];

const SEASONAL_DATA = `
=== TASK ===
You are a seasonal tendency analyst. Analyse the following 10-Year Australian T-Bonds (SFE) seasonal data and produce:
1. A one-paragraph YEARLY BIAS summary — the macro arc across the full year
2. A MONTHLY TABLE — for each month: bias direction, conviction stars (1–5), and a one-sentence action note
3. A WEEK-BY-WEEK breakdown for the 3 highest-conviction months
4. TOP 3 TRADE SETUPS — entry month/week, direction, rationale, and approximate seasonal exit

Format clearly with headers. Be specific and actionable.

=== PLAYBOOK SIGNALS ===
Asset: 10-Year Aus T-Bonds (SFE)
Exchange: SFE | Seasonal History: 36-Year (1984–2019)

YEARLY ARC:
Year opens at seasonal LOWS across all TFs (36-YR ~5–10, 15-YR ~15–20, 5-YR ~20–25).
Jan: Flat/sideways — no directional signal.
Feb: First bull leg — 5-YR rises to ~35–40.
Mar: Annual trough — 5-YR crashes to near 0.
Apr–May: Recovery bull run — 5-YR surges to ~65–70.
Jun: Second trough — sharp drop across all TFs.
Jul–Aug: Strongest seasonal period — 5-YR surges from near 0 to ~100.
Sep: Annual peak — 36-YR reaches ~100, then reversal.
Oct: Post-peak decline.
Nov: Mixed/choppy.
Dec: 36-YR holds ~88–90; 5-YR/15-YR declining. Year ends high for 36-YR.

MONTHLY SIGNALS:
Jan  — CHOP  ★★    | All TFs at lows; flat — no trade
Feb  — LONG  ★★★   | First bull leg; 5-YR leads to ~35–40
Mar  — SHORT ★★★★  | Annual trough; 5-YR crashes to near 0
Apr  — LONG  ★★★   | Recovery from March lows; 5-YR leads
May  — LONG  ★★★★  | Strong bull; 5-YR surges to ~65–70
Jun  — SHORT ★★★★  | Sharp drop; sets up the July explosion
Jul  — LONG  ★★★★★ | Strongest month; 5-YR surges from 0 to ~100
Aug  — LONG  ★★★★★ | Year peak; all TFs at 80–100; flip late month
Sep  — FLIP  ★★★★  | 36-YR peaks ~100; reversal begins — flip short
Oct  — SHORT ★★★   | Post-peak decline; sell rallies
Nov  — CHOP  ★★    | Mixed TF signals; stand aside
Dec  — CHOP  ★★    | 36-YR elevated; 5-YR/15-YR declining

KEY OBSERVATIONS:
- Two trough windows: March (deepest) and June
- Two bull windows: Apr–May and Jul–Aug (July is the explosive one)
- 36-YR lags 5-YR by 4–6 weeks at both peaks and troughs
- September is the flip month: 36-YR still rising while 5-YR/15-YR already reversing
- Year ends high for 36-YR (~88–90) but low for 5-YR/15-YR — classic TF divergence at year-end
`;
