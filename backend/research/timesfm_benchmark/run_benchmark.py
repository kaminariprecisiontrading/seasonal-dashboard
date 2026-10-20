"""
run_benchmark.py — Phase 0 benchmark: does TimesFM 2.5 forecast daily range better than
what the dashboard already shows (ADR20) and the standard econometric baseline (log-HAR)?

Validate-first study (same rule as spec §4.4): nothing here feeds the dashboard. Only if
TimesFM clearly beats ADR20 out-of-sample does a pipeline stage get built.

Design
  - Series: daily_range_pips from data/clean/<asset>_daily_clean.csv (weekend stub rows and
    NaN-range rows dropped; full weekend sessions kept for 24/7 assets, so for BTCUSD the
    horizons are calendar days).
  - Origins: every trading day t from --start onward. A forecast made at origin t sees only
    y[0..t] (the close of day t). Targets:
        H1  = y[t+1]
        H5  = mean(y[t+1..t+5])     ("next week")
        H20 = mean(y[t+1..t+20])    ("next month")
  - Point forecasters:
        naive  — y[t]
        adr20  — mean(y[t-19..t])   (what the Profiling tab shows today)
        har    — log-HAR, one direct regression per horizon:
                 log(target_k) ~ 1 + log y_t + log mean5_t + log mean22_t
                 fit by OLS on origins whose target was fully observed before t (expanding
                 window, refit every --refit days), smearing-corrected back to levels.
        timesfm — TimesFM 2.5 200M zero-shot on the last --context days; H5/H20 = mean of
                 the first 5/20 step forecasts. Its point output is the forecast median;
        timesfm_mean — same run, the quantile head's mean output (better suited to RMSE/QLIKE).
  - Interval forecasters (H1 only, deciles q10..q90):
        adr20_emp — adr20 x trailing-500-origin empirical quantiles of y[s+1]/adr20_s
        har_emp   — har x trailing-500-origin empirical quantiles of y[s+1]/har_s
        timesfm   — the model's own quantile head
        timesfm_cal250/500 — the same quantiles recalibrated on the trailing 250/500 origins'
                    realized/forecast ratios (fixes the raw head's thin upper tail)
  - Metrics: MAE, RMSE, QLIKE (y/f - log(y/f) - 1), relative MAE vs adr20, Diebold-Mariano
    test vs adr20 on absolute error (Newey-West, lag = horizon); mean pinball loss and
    q10-q90 coverage (nominal 80%); per-year relative MAE.

TimesFM forecasts are cached in cache/ (the expensive step); everything else recomputes in
seconds, so re-running with different metrics never re-runs the model.

Run from backend/ with the forecast venv:
  .venv-forecast/Scripts/python.exe research/timesfm_benchmark/run_benchmark.py
  .venv-forecast/Scripts/python.exe research/timesfm_benchmark/run_benchmark.py --assets gbpusd --start 2024-01-01
"""
import argparse
import math
import time
from pathlib import Path

import numpy as np
import pandas as pd
from scipy import stats

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
CLEAN = ROOT / "data" / "clean"
CACHE = HERE / "cache"
RESULTS = HERE / "results"

HORIZONS = (1, 5, 20)
QUANTILES = np.arange(0.1, 1.0, 0.1)
MAX_H = max(HORIZONS)


# ── data ────────────────────────────────────────────────────────────────────────────────
def load_series(asset):
    d = pd.read_csv(CLEAN / f"{asset}_daily_clean.csv", parse_dates=["date"])
    # Weekend rows are short stubs for FX/CFDs (drop) but full sessions for 24/7 assets
    # like BTCUSD (keep). Decided by how many weekend rows exist relative to an average weekday
    # (BTC ~0.65, FX/CFDs < 0.01), not by bar counts: assets whose history is mostly the
    # daily-only era (n_bars = 1 every day) would make a bar-count comparison meaningless.
    dow = d.date.dt.dayofweek
    wkend = dow >= 5
    if wkend.sum() / 2 < 0.5 * (~wkend).sum() / 5:
        d = d[~wkend]
    d = d[d.daily_range_pips.notna() & (d.daily_range_pips > 0)]
    return d.date.reset_index(drop=True), d.daily_range_pips.to_numpy(float)


def targets(y):
    """tgt[k][t] = mean(y[t+1..t+k]), NaN where not fully observed."""
    n = len(y)
    c = np.concatenate([[0.0], np.cumsum(y)])
    out = {}
    for k in HORIZONS:
        t = np.arange(n)
        ok = t + k < n
        v = np.full(n, np.nan)
        v[ok] = (c[t[ok] + k + 1] - c[t[ok] + 1]) / k
        out[k] = v
    return out


def trailing_mean(y, w):
    c = np.concatenate([[0.0], np.cumsum(y)])
    v = np.full(len(y), np.nan)
    v[w - 1:] = (c[w:] - c[:-w]) / w
    return v


# ── TimesFM (cached) ────────────────────────────────────────────────────────────────────
def timesfm_forecasts(asset, y, origins, context, batch):
    path = CACHE / f"{asset}_ctx{context}_n{len(y)}_o{origins[0]}-{origins[-1]}.npz"
    if path.exists():
        z = np.load(path)
        return z["point"], z["quant"]

    import timesfm
    import torch
    torch.set_float32_matmul_precision("high")
    model = timesfm.TimesFM_2p5_200M_torch.from_pretrained("google/timesfm-2.5-200m-pytorch")
    model.compile(timesfm.ForecastConfig(
        max_context=context, max_horizon=32, normalize_inputs=True,
        use_continuous_quantile_head=True, force_flip_invariance=True,
        infer_is_positive=True, fix_quantile_crossing=True, per_core_batch_size=batch))

    points, quants = [], []
    t0 = time.time()
    for i in range(0, len(origins), batch * 4):
        chunk = origins[i:i + batch * 4]
        inputs = [y[max(0, t + 1 - context):t + 1] for t in chunk]
        p, q = model.forecast(horizon=MAX_H, inputs=inputs)
        points.append(p[:len(chunk)])
        quants.append(q[:len(chunk)])
        done = i + len(chunk)
        rate = (time.time() - t0) / done
        print(f"  {asset}: {done}/{len(origins)}  ~{rate * (len(origins) - done) / 60:.1f} min left",
              flush=True)
    point, quant = np.concatenate(points), np.concatenate(quants)
    CACHE.mkdir(exist_ok=True)
    np.savez_compressed(path, point=point, quant=quant)
    return point, quant


# ── HAR ─────────────────────────────────────────────────────────────────────────────────
def har_forecasts(y, tgt, origins, refit):
    """Direct log-HAR per horizon; returns {k: forecast array over origins} and residual
    ratios (y/f, H1) for the empirical-interval baseline."""
    ly = np.log(y)
    f1, f5, f22 = ly, np.log(trailing_mean(y, 5)), np.log(trailing_mean(y, 22))
    X = np.column_stack([np.ones(len(y)), f1, f5, f22])
    out = {}
    for k in HORIZONS:
        lt = np.log(tgt[k])
        fc = np.full(len(origins), np.nan)
        beta, smear = None, 1.0
        for j, t in enumerate(origins):
            if beta is None or j % refit == 0:
                train = np.arange(21, t - k + 1)          # target fully observed by day t
                train = train[np.isfinite(lt[train]) & np.isfinite(X[train]).all(1)]
                beta, *_ = np.linalg.lstsq(X[train], lt[train], rcond=None)
                resid = lt[train] - X[train] @ beta
                smear = np.mean(np.exp(resid))
            fc[j] = math.exp(X[t] @ beta) * smear
        out[k] = fc
    return out


# ── empirical intervals ─────────────────────────────────────────────────────────────────
def empirical_quantiles(base_all, y_next_all, origins, window=500):
    """base x trailing empirical quantiles of y[s+1]/base_s, using only s with s+1 <= t."""
    ratio = y_next_all / base_all
    q = np.full((len(origins), len(QUANTILES)), np.nan)
    for j, t in enumerate(origins):
        r = ratio[max(0, t - window):t]                   # s in [t-window, t-1] → s+1 <= t
        r = r[np.isfinite(r)]
        q[j] = base_all[t] * np.quantile(r, QUANTILES)
    return q


def recalibrate(q_raw, y1, window):
    """Trailing per-quantile multiplicative recalibration (split-conformal style).
    For decile tau at origin j: scale q_raw[j, tau] by the tau-quantile of y/q_raw[., tau]
    over the previous `window` origins, all of whose targets (next-day ranges) are already
    observed by origin j. Fixes systematic tail under/over-coverage without touching the
    model. NaN for the first `window` origins (no calibration history yet)."""
    out = np.full_like(q_raw, np.nan)
    ratio = y1[:, None] / q_raw
    for j in range(window, len(q_raw)):
        r = ratio[j - window:j]
        r = r[np.isfinite(r).all(1)]
        c = np.array([np.quantile(r[:, i], tau) for i, tau in enumerate(QUANTILES)])
        out[j] = np.sort(q_raw[j] * c)                     # re-sort: no quantile crossing
    return out


# ── metrics ─────────────────────────────────────────────────────────────────────────────
def qlike(y, f):
    r = y / f
    return r - np.log(r) - 1


def dm_test(e_model, e_base, lag):
    """Diebold-Mariano on loss differential d = e_model - e_base (negative = model better).
    Newey-West variance with Bartlett weights. Returns (mean d, t-stat, two-sided p)."""
    d = e_model - e_base
    d = d[np.isfinite(d)]
    n = len(d)
    dc = d - d.mean()
    var = dc @ dc / n
    for L in range(1, lag + 1):
        w = 1 - L / (lag + 1)
        var += 2 * w * (dc[L:] @ dc[:-L]) / n
    t = d.mean() / math.sqrt(var / n)
    return d.mean(), t, 2 * (1 - stats.norm.cdf(abs(t)))


def pinball(y, q):
    diff = y[:, None] - q
    return np.mean(np.maximum(QUANTILES * diff, (QUANTILES - 1) * diff), axis=1)


# ── main ────────────────────────────────────────────────────────────────────────────────
def run_asset(asset, args):
    dates, y = load_series(asset)
    start_idx = int(np.searchsorted(dates.values, np.datetime64(args.start)))
    start_idx = max(start_idx, args.context, 1100)         # HAR warm-up (500) + its own history
    origins = np.arange(start_idx, len(y) - 1)             # last origin needs ≥1 day ahead
    tgt = targets(y)
    print(f"{asset}: {len(y)} days, {len(origins)} origins "
          f"{dates[origins[0]].date()} -> {dates[origins[-1]].date()}", flush=True)

    tf_point, tf_quant = timesfm_forecasts(asset, y, origins, args.context, args.batch)
    adr20_all = trailing_mean(y, 20)
    # HAR also runs over a 500-origin warm-up before the test window, so har_emp's trailing
    # residual window is populated from the first test origin.
    warm = np.arange(origins[0] - 500, origins[0])
    har_ext = har_forecasts(y, tgt, np.concatenate([warm, origins]), args.refit)
    har = {k: v[len(warm):] for k, v in har_ext.items()}

    point = {
        k: {
            "naive": y[origins],
            "adr20": adr20_all[origins],
            "har": har[k],
            "timesfm": tf_point[:, :k].mean(axis=1),            # point output = median
            "timesfm_mean": tf_quant[:, :k, 0].mean(axis=1),    # quantile head index 0 = mean
        } for k in HORIZONS
    }

    rows, yearly = [], []
    years = dates[origins].dt.year.to_numpy()
    for k in HORIZONS:
        yt = tgt[k][origins]
        ok = np.isfinite(yt)
        base_ae = np.abs(yt - point[k]["adr20"])
        har_ae = np.abs(yt - point[k]["har"])
        for name, f in point[k].items():
            ae = np.abs(yt - f)
            dm_mean, dm_t, dm_p = dm_test(ae[ok], base_ae[ok], lag=k) if name != "adr20" else (0, np.nan, np.nan)
            rows.append(dict(
                asset=asset, horizon=k, model=name, n=int(ok.sum()),
                mae=np.mean(ae[ok]), rmse=math.sqrt(np.mean((yt[ok] - f[ok]) ** 2)),
                qlike=np.mean(qlike(yt[ok], f[ok])),
                rel_mae_vs_adr20=np.mean(ae[ok]) / np.mean(base_ae[ok]),
                dm_t=dm_t, dm_p=dm_p,
                dm_vs_har_t=dm_test(ae[ok], har_ae[ok], lag=k)[1] if name.startswith("timesfm") else np.nan,
                dm_vs_har_p=dm_test(ae[ok], har_ae[ok], lag=k)[2] if name.startswith("timesfm") else np.nan))
            for yr in np.unique(years[ok]):
                m = ok & (years == yr)
                yearly.append(dict(asset=asset, horizon=k, model=name, year=int(yr),
                                   rel_mae_vs_adr20=np.mean(ae[m]) / np.mean(base_ae[m])))

    # Intervals, H1
    y_next_all = np.append(y[1:], np.nan)
    har1_all = np.full(len(y), np.nan)
    har1_all[np.concatenate([warm, origins])] = har_ext[1]
    ivals = {
        "adr20_emp": empirical_quantiles(adr20_all, y_next_all, origins),
        "har_emp": empirical_quantiles(har1_all, y_next_all, origins),
        "timesfm": tf_quant[:, 0, 1:],                     # index 0 is the mean; 1..9 = q10..q90
    }
    y1 = tgt[1][origins]
    for w in (250, 500):
        ivals[f"timesfm_cal{w}"] = recalibrate(ivals["timesfm"], y1, w)
    # Every interval model is scored on the same origins: those after the longest
    # recalibration warm-up (500), so the calibrated variants are compared like-for-like.
    common = np.arange(len(origins)) >= 500
    iv_rows = []
    for name, q in ivals.items():
        ok = common & np.isfinite(y1) & np.isfinite(q).all(1)
        pl = pinball(y1[ok], q[ok])
        iv_rows.append(dict(
            asset=asset, model=name, n=int(ok.sum()), pinball=pl.mean(),
            cover_80=np.mean((y1[ok] >= q[ok, 0]) & (y1[ok] <= q[ok, 8])),
            below_q10=np.mean(y1[ok] < q[ok, 0]), above_q90=np.mean(y1[ok] > q[ok, 8]),
            width_80_rel=np.mean((q[ok, 8] - q[ok, 0]) / adr20_all[origins][ok])))

    return pd.DataFrame(rows), pd.DataFrame(yearly), pd.DataFrame(iv_rows)


def write_summary(pt, yr, iv, args):
    L = [f"# TimesFM 2.5 daily-range benchmark — results",
         "",
         f"Generated {pd.Timestamp.now():%Y-%m-%d %H:%M} · origins from {args.start} · "
         f"context {args.context} days · HAR refit every {args.refit} origins.",
         "",
         "## Point forecasts",
         "",
         "`rel MAE` < 1.00 beats ADR20. `DM p` tests the MAE difference vs ADR20 "
         "(Newey-West, lag = horizon); negative `DM t` = better than ADR20. The `vs HAR` "
         "columns run the same test against log-HAR (TimesFM rows only).",
         ""]
    for k in HORIZONS:
        L += [f"### H{k} — " + {1: "next day", 5: "next 5 days (avg)", 20: "next 20 days (avg)"}[k], "",
              "| Asset | Model | MAE | RMSE | QLIKE | rel MAE | DM t | DM p | vs HAR: DM t | DM p |",
              "|---|---|---:|---:|---:|---:|---:|---:|---:|---:|"]
        for _, r in pt[pt.horizon == k].iterrows():
            L.append(f"| {r.asset} | {r.model} | {r.mae:.1f} | {r.rmse:.1f} | {r.qlike:.4f} | "
                     f"{r.rel_mae_vs_adr20:.3f} | {r.dm_t:.2f} | {r.dm_p:.3g} | "
                     f"{r.dm_vs_har_t:.2f} | {r.dm_vs_har_p:.3g} |"
                     .replace("| nan | nan |", "| — | — |"))
        L.append("")
    L += ["## H1 intervals (q10–q90)", "",
          "Nominal coverage is 80%. Lower pinball = better calibrated *and* sharper. "
          "`width` is the q10–q90 band width as a multiple of ADR20. `timesfm_calN` = TimesFM "
          "quantiles recalibrated on the trailing N origins' realized ratios. All rows are scored "
          "on the same origins (after a 500-origin warm-up), so `n` is smaller than in the point tables.", "",
          "| Asset | Model | n | pinball | cover 80% | < q10 | > q90 | width |",
          "|---|---|---:|---:|---:|---:|---:|---:|"]
    for _, r in iv.iterrows():
        L.append(f"| {r.asset} | {r.model} | {r.n} | {r.pinball:.2f} | {r.cover_80:.1%} | "
                 f"{r.below_q10:.1%} | {r.above_q90:.1%} | {r.width_80_rel:.2f} |")
    L += ["", "## Per-year relative MAE vs ADR20 (TimesFM and HAR)", ""]
    piv = (yr[yr.model.isin(["timesfm", "har"])]
           .pivot_table(index=["asset", "horizon", "model"], columns="year", values="rel_mae_vs_adr20"))
    L.append("| asset | H | model | " + " | ".join(str(c) for c in piv.columns) + " |")
    L.append("|---|---|---|" + "---:|" * len(piv.columns))
    for idx, row in piv.iterrows():
        L.append("| " + " | ".join(str(x) for x in idx) + " | " +
                 " | ".join("" if pd.isna(v) else f"{v:.2f}" for v in row) + " |")
    (RESULTS / "summary.md").write_text("\n".join(L) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--assets", nargs="+", default=["gbpusd", "eurusd", "xauusd"])
    ap.add_argument("--start", default="2016-01-01")
    ap.add_argument("--context", type=int, default=1024)
    ap.add_argument("--batch", type=int, default=32)
    ap.add_argument("--refit", type=int, default=21)
    args = ap.parse_args()

    pts, yrs, ivs = [], [], []
    for a in args.assets:
        p, y_, i = run_asset(a, args)
        pts.append(p); yrs.append(y_); ivs.append(i)
    pt, yr, iv = pd.concat(pts), pd.concat(yrs), pd.concat(ivs)
    RESULTS.mkdir(exist_ok=True)
    pt.to_csv(RESULTS / "point_metrics.csv", index=False)
    yr.to_csv(RESULTS / "yearly_rel_mae.csv", index=False)
    iv.to_csv(RESULTS / "interval_metrics.csv", index=False)
    write_summary(pt, yr, iv, args)
    print(f"\nWrote {RESULTS / 'summary.md'}")


if __name__ == "__main__":
    main()
