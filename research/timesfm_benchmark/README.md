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
| Series | `daily_range_pips` from `data/clean/<asset>_daily_clean.csv`; weekend stub rows and NaN-range rows dropped |
| Assets | GBPUSD, EURUSD, XAUUSD (the same three used to validate every Tier 5 profile) |
| Test window | every trading day from 2016-01-01 to the data's end; each forecast sees only data up to that day's close |
| Targets | H1 = next day's range; H5 = mean range over the next 5 days; H20 = mean over the next 20 |
| Models | `naive` (yesterday), `adr20` (dashboard today), `har` (direct log-HAR per horizon, expanding OLS refit every 21 days, smearing-corrected), `timesfm` (median forecast, 1024-day context), `timesfm_mean` (same run, mean forecast) |
| Point metrics | MAE, RMSE, QLIKE; MAE relative to ADR20; Diebold-Mariano test vs ADR20 (Newey-West, lag = horizon) |
| Intervals (H1) | TimesFM's q10–q90 vs ADR20 × trailing empirical quantiles and HAR × trailing empirical quantiles; pinball loss, 80% coverage, band width |
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

## Findings (run 2026-10-06, ~2,740 daily origins per asset, 2016-01-04 → 2026-09-02)

Full tables: `results/summary.md`. Relative MAE vs ADR20 (< 1 = better), `timesfm_mean`:

| | H1 next day | H5 next 5 days | H20 next 20 days |
|---|---:|---:|---:|
| GBPUSD | 0.944 | 0.866 | 0.832 |
| EURUSD | 0.960 | 0.918 | 0.898 |
| XAUUSD | 0.912 | 0.872 | 0.872 |

1. **TimesFM beats ADR20 on every asset × horizon** (9/9), all significant (Diebold-Mariano p ≤ 0.034
   for `timesfm_mean`). The error reduction is 4–9% next-day and 8–17% over 5–20 days. In pip terms it is modest but
   real: GBPUSD next-week MAE 23.2 → 20.1 pips.
2. **On FX it also beats log-HAR**, significantly, at every horizon (DM vs HAR p < 0.04, mostly
   far smaller). HAR itself barely improves on ADR20 for FX. **On gold, TimesFM and HAR are
   statistically tied** at H5/H20 (both ~10–13% better than ADR20); TimesFM edges HAR only at H1.
   This is consistent with the published finding that the econometric baseline stays competitive.
3. **Stable across years, including out-of-sample after the model's release.** TimesFM's
   next-day relative MAE is ≤ 1.02 in every calendar year for all three assets. The 2026 rows
   (data after TimesFM 2.5's Sept-2025 release, so no possibility it was in pretraining) are
   0.93 / 0.89 / 0.83 for GBP / EUR / XAU, as good as or better than the full-window figures.
   Its weakest year is 2022 (relative MAE ~1.0, sometimes worse at H20). That year had a regime change in the
   rate-hike cycle, so the forecasts need monitoring rather than blind trust.
4. **Mean vs. median output:** the median (`timesfm`) wins next-day MAE, while the mean
   (`timesfm_mean`) wins RMSE/QLIKE everywhere and MAE at H5/H20. Use the mean for a "range
   outlook" number.
5. **Intervals: the sharpest, but the upper tail is too thin.** TimesFM has the best pinball loss on all
   three assets with bands ~10% narrower than ADR20-scaled empirical bands, and ~79% total
   coverage vs. 80% nominal. However, it is skewed: 11.7–14.4% of days exceed its q90, against
   10% nominal, so it under-predicts range spikes. The empirical baselines are
   almost perfectly calibrated. A spike-risk band shown to traders needs the upper tail fixed
   (e.g. a trailing conformal adjustment to q90) before display.

## Verdict

**Go, with conditions.** TimesFM range forecasts are a genuine, statistically significant
improvement on ADR20 for all three validation assets, robust across a decade and in post-release
data. Conditions for building it into the pipeline:

- Show the **mean** forecast as the headline number, and fix the q90 tail
  (calibrate, then re-check coverage) before showing a band.
- Before wiring each additional asset, re-run this benchmark for it (`--assets <key>`; ~15 min each
  on CPU). Gold shows the gain over HAR is asset-dependent, so don't assume it carries over.
- Production cost is trivial (one forecast per asset per refresh, seconds), but forecasts are only
  meaningful if MT5 data is refreshed regularly. Display the forecast's start date prominently.
- Log every published forecast and score it on the next refresh (spec §6 / dashboard roadmap §9.4).
  That is the ongoing version of this benchmark.

Not tested here (possible follow-ups): covariates (NFP flag, weekday) via XReg; context length
(512/2048); fine-tuning; the other 11 Profiling assets.
