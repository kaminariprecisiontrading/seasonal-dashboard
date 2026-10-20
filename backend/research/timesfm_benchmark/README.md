# TimesFM daily-range benchmark (Phase 0)

**Question:** does Google's TimesFM 2.5 (200M, zero-shot) forecast an asset's daily range
better than what the dashboard already shows (ADR20) and the standard econometric baseline
(log-HAR)? If it doesn't clearly win out-of-sample, nothing gets built. This is the same
validate-first rule as `market-profiling-system-spec.md` §4.4.

**Why range, not direction:** published evaluations find zero-shot time-series foundation
models are no better than a coin flip on return direction, while range/volatility (persistent and
mean-reverting) is the plausible use (e.g. arXiv 2511.18578 on returns; arXiv 2607.05291 on
realized volatility, where most foundation models fail to beat log-HAR).

## Method

| | |
|---|---|
| Series | `daily_range_pips` from `data/clean/<asset>_daily_clean.csv`; NaN-range rows dropped; weekend rows dropped where they are stubs (FX/CFDs) but kept where they are full sessions (BTCUSD, so its horizons are calendar days) |
| Assets | All 14 Profiling assets. First pass: GBPUSD, EURUSD, XAUUSD (the Tier 5 validation trio); second pass: the other 11 |
| Test window | every trading day from 2016-01-01 (or later where history is short: Brent from 2020-02, DJIA from 2019-08, BTCUSD from 2021-10, because 1,100 prior days are needed) to 2026-09-02; each forecast sees only data up to that day's close |
| Targets | H1 = next day's range; H5 = mean range over the next 5 days; H20 = mean over the next 20 |
| Models | `naive` (yesterday), `adr20` (dashboard today), `har` (direct log-HAR per horizon, expanding OLS refit every 21 days, smearing-corrected), `timesfm` (median forecast, 1024-day context), `timesfm_mean` (same run, mean forecast) |
| Point metrics | MAE, RMSE, QLIKE; MAE relative to ADR20; Diebold-Mariano tests vs ADR20 and vs HAR (Newey-West, lag = horizon) |
| Intervals (H1) | TimesFM's raw q10–q90, plus `timesfm_cal250/500` (each decile rescaled by the matching quantile of realized/forecast ratios over the trailing 250/500 origins); vs ADR20 × and HAR × trailing empirical quantiles. Pinball loss, 80% coverage, tail exceedances, band width; all scored on the same origins after a 500-origin warm-up |
| Stability | relative MAE by calendar year |

## Running it

TimesFM needs PyTorch, so it lives in its own venv (`.venv-forecast/`, gitignored) rather than
bloating the pipeline's `.venv/`:

```bash
# one-time setup, from KPT-Market-Profiling/
python -m venv .venv-forecast
.venv-forecast/Scripts/python.exe -m pip install "timesfm[torch]" pandas scipy

# full run (~45 min on CPU; model weights download from Hugging Face on first run)
.venv-forecast/Scripts/python.exe research/timesfm_benchmark/run_benchmark.py

# quick check
.venv-forecast/Scripts/python.exe research/timesfm_benchmark/run_benchmark.py --assets gbpusd --start 2026-01-01
```

TimesFM forecasts are cached in `cache/` (gitignored; the expensive part). Re-running with the
same assets/window/context only recomputes baselines and metrics, in seconds. Outputs go to
`results/`: `summary.md` (tables), plus `point_metrics.csv`, `interval_metrics.csv`,
`yearly_rel_mae.csv`.

## Findings — all 14 assets (final run 2026-10-06)

Full tables: `results/summary.md`; raw numbers in `results/*.csv`.

### Point forecasts: TimesFM (mean output) vs ADR20

Relative MAE (< 1 = better than what the dashboard shows today):

| Asset | H1 | H5 | H20 | | Asset | H1 | H5 | H20 |
|---|---:|---:|---:|---|---|---:|---:|---:|
| GBPUSD | 0.944 | 0.866 | 0.832 | | XAUUSD | 0.912 | 0.872 | 0.872 |
| EURUSD | 0.960 | 0.918 | 0.898 | | Brent* | 0.901 | 0.873 | 0.858 |
| AUDUSD | 0.953 | 0.902 | 0.886 | | WTI | 0.928 | 0.915 | 0.902 |
| NZDUSD | 0.967 | 0.916 | 0.878 | | S&P 500 | 0.858 | 0.813 | 0.827 |
| USDCAD | 0.957 | 0.919 | 0.884 | | Nasdaq 100 | 0.904 | 0.850 | 0.876 |
| USDCHF | 0.956 | 0.896 | 0.853 | | DJIA* | 0.862 | 0.818 | 0.810 |
| USDJPY | 0.920 | 0.891 | 0.900 | | BTCUSD* | 0.854 | 0.875 | 0.925 |

\* shorter test window (see Method).

1. **TimesFM beats ADR20 in all 42 asset × horizon cells**: 40/42 are significant at p < 0.05,
   and the other two (BTCUSD H20, WTI H20) are at p = 0.056. That's 4–15% lower error next-day and
   8–19% lower over 5–20 days. The gains are largest on the indices and BTC, and smallest
   (but consistent) on the FX majors.
2. **Against log-HAR, it depends on asset class:**
   - **FX (7 pairs):** HAR barely improves on ADR20 (relative MAE 0.93–1.04), while TimesFM is
     significantly better than HAR at H1 and H5 on every pair, and at H20 on 6/7 (not USDJPY).
     This is where TimesFM adds the most.
   - **Gold, oil, indices, BTC:** HAR already captures most of the gain (0.83–0.94). TimesFM
     still edges it next-day (significant for Brent, WTI, DJIA, Nasdaq, BTC; p = 0.05–0.08 for
     S&P and gold), but at H5/H20 the two are **statistically tied** for most of these assets.
     TimesFM is never significantly *worse* than HAR anywhere, so one model for all 14 is fine.
3. **Holds up after the model's release.** 2026 data (after TimesFM 2.5's Sept-2025 release, so it
   cannot be in pretraining): next-day relative MAE 0.78–0.97 on all 14. The only 2026 cell
   above 1 is Nasdaq H20 (1.05). Across 2016–2026, single years occasionally run worse than ADR20
   (H5 worst years: EURUSD and XAUUSD 1.12, WTI 1.08, mostly 2022), so forecasts need ongoing
   scoring, not blind trust.
4. **Mean vs. median:** the median wins next-day MAE, while the mean wins RMSE/QLIKE and most H5/H20 MAE.
   Use the mean as the headline "range outlook" number.

### Intervals (next-day q10–q90)

5. **The raw TimesFM bands under-predict spikes on every asset:** 11.6–15.1% of days exceed q90
   (target 10%), and 7.4–9.8% fall below q10.
6. **Fixed by trailing recalibration (`timesfm_cal500`):** exceedances become 10.1–11.1% above q90
   and 9.7–10.6% below q10 across all 14 assets, close to the well-calibrated empirical baselines.
   Pinball loss stays the best or near-best of all models (≤ 0.3% worse than raw TimesFM; better on
   gold, Nasdaq and WTI). Bands remain **narrower than ADR20's empirical bands on every asset**
   (e.g. BTCUSD 1.13 vs 1.36 × ADR20, S&P 1.09 vs 1.22). `cal250` performs about the same; 500 is
   slightly steadier.

## Verdict

**Go for all 14 Profiling assets.** Production design implied by these results:

- **Headline:** TimesFM 2.5 mean forecast of next-day / next-5-day / next-20-day average range.
- **Band:** q10–q90 recalibrated on the trailing 500 forecasts (`recalibrate()` in
  `run_benchmark.py`). The production stage therefore needs a 500-forecast history per asset to
  calibrate from. That's a one-off backfill (~5 min/asset on CPU), then one new forecast per refresh.
- **Freshness:** forecasts start from the data's last date. Show that date prominently;
  they're only useful if MT5 data is refreshed regularly.
- **Ongoing scoring:** log every published forecast and score it on the next refresh (spec §6 /
  dashboard roadmap §9.4), so bad regimes like 2022 are visible rather than assumed away.

**Built (2026-10-06):** `pipeline/forecast_range.py` implements exactly this design and is part
of `refresh_asset.py`'s chain; the seasonal-dashboard shows it as the Profiling tab's "Range
Outlook" card.

Not tested (possible follow-ups): covariates (NFP flag, weekday) via XReg; context length
(512/2048); fine-tuning; a TimesFM/HAR ensemble for the non-FX assets.
