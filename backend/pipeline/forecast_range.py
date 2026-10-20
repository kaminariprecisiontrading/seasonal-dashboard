"""
forecast_range.py — Range Outlook: TimesFM 2.5 forecasts of an asset's upcoming daily range,
plus the stage's own scored track record. Folded into the dashboard bundle by
build_dashboard_data.py --range-forecast (-> bundle.range_forecast).

Validated before being built: research/timesfm_benchmark/ (README "Findings"/"Verdict") —
TimesFM's mean forecast beat ADR20 on all 14 Profiling assets x 3 horizons (2016-2026,
~2,700 daily origins each), and the trailing recalibration used below fixed its too-thin
upper tail. This stage reproduces exactly that method; it does not re-tune it.

What it produces, from the cleaned daily CSV (data only up to its last date):
  - forecast.h1   next trading day's range: mean + calibrated q10/q90 band (raw band kept
                  alongside for transparency)
  - forecast.h5   average daily range over the next 5 trading days (mean only)
  - forecast.h20  average daily range over the next 20 trading days (mean only)
  - track_record  how the same forecaster did over the last --window origins whose outcomes
                  are known: MAE vs ADR20 per horizon, band coverage. This is the ongoing
                  version of the benchmark (spec §6) — re-scored on every refresh.
  - recent        the last 60 next-day forecasts vs. what actually happened, for the chart.

Needs PyTorch + timesfm, so it runs under the separate .venv-forecast/ (see README
"Range Outlook"), not the pipeline's own .venv/. refresh_asset.py calls it with that venv's
interpreter when present and skips the stage, loudly, when not.

Cache, not state: every forecast at origin t depends only on y[..t] (deterministic), so
forecasts are cached in data/forecast/<asset>_timesfm_cache.csv keyed by origin date plus a
hash of the exact input window. A cached row is reused only if its hash still matches (a
re-clean that changes past ranges invalidates it automatically). Deleting the cache only
costs recompute time (~0.3s/forecast on CPU; ~1,000 on the first run per asset), never
changes the output — keeping the "always reprocess everything" contract of refresh_asset.py.

Usage:
    python forecast_range.py <clean_csv> <output_json> --asset GBPUSD
        [--cache PATH] [--context 1024] [--window 500] [--batch 32]
"""
import argparse
import hashlib
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

MODEL_ID = "google/timesfm-2.5-200m-pytorch"
QUANTILES = np.arange(0.1, 1.0, 0.1)
HORIZONS = (1, 5, 20)
MAX_H = 32          # model decode length (multiple of its output patch); only 20 steps used
RECENT_N = 60


def load_series(clean_csv):
    """Same series rules as research/timesfm_benchmark/run_benchmark.py's load_series():
    NaN/zero ranges dropped; weekend rows dropped where they are stubs (FX/CFDs), kept where
    they are full sessions (24/7 assets like BTCUSD), decided by row counts."""
    d = pd.read_csv(clean_csv, usecols=["date", "daily_range_pips"], parse_dates=["date"])
    d = d[d.daily_range_pips.notna() & (d.daily_range_pips > 0)]
    wkend = d.date.dt.dayofweek >= 5
    trades_weekends = wkend.sum() / 2 >= 0.5 * (~wkend).sum() / 5
    if not trades_weekends:
        d = d[~wkend]
    return d.date.reset_index(drop=True), d.daily_range_pips.to_numpy(float), bool(trades_weekends)


def window_hash(window):
    return hashlib.sha1(np.round(window, 4).tobytes()).hexdigest()[:16]


def trailing_mean(y, w):
    c = np.concatenate([[0.0], np.cumsum(y)])
    v = np.full(len(y), np.nan)
    v[w - 1:] = (c[w:] - c[:-w]) / w
    return v


def forward_mean(y, k):
    """out[t] = mean(y[t+1..t+k]); NaN where not yet observed."""
    c = np.concatenate([[0.0], np.cumsum(y)])
    t = np.arange(len(y))
    v = np.full(len(y), np.nan)
    ok = t + k < len(y)
    v[ok] = (c[t[ok] + k + 1] - c[t[ok] + 1]) / k
    return v


CACHE_COLS = (["date", "model", "context", "input_hash", "h1_mean", "h5_mean", "h20_mean"]
              + [f"h1_q{int(q * 100)}" for q in QUANTILES])


def get_forecasts(dates, y, origins, context, cache_path, batch):
    """Return a DataFrame (one row per origin, CACHE_COLS) — cached rows reused when their
    input hash matches, the rest computed with TimesFM and written back to the cache."""
    keys = [(dates[t].strftime("%Y-%m-%d"), window_hash(y[max(0, t + 1 - context):t + 1])) for t in origins]
    cache = pd.DataFrame(columns=CACHE_COLS)
    if os.path.exists(cache_path):
        cache = pd.read_csv(cache_path, dtype={"date": str, "input_hash": str})
        cache = cache[(cache.model == MODEL_ID) & (cache.context == context)]
    have = {(r.date, r.input_hash): r for r in cache.itertuples(index=False)}
    missing = [i for i, k in enumerate(keys) if k not in have]
    print(f"  forecasts: {len(origins) - len(missing)} cached, {len(missing)} to compute", file=sys.stderr)

    new_rows = []
    if missing:
        import timesfm
        import torch
        torch.set_float32_matmul_precision("high")
        model = timesfm.TimesFM_2p5_200M_torch.from_pretrained(MODEL_ID)
        model.compile(timesfm.ForecastConfig(
            max_context=context, max_horizon=MAX_H, normalize_inputs=True,
            use_continuous_quantile_head=True, force_flip_invariance=True,
            infer_is_positive=True, fix_quantile_crossing=True, per_core_batch_size=batch))
        step = batch * 4
        for s in range(0, len(missing), step):
            chunk = missing[s:s + step]
            inputs = [y[max(0, origins[i] + 1 - context):origins[i] + 1] for i in chunk]
            _, q = model.forecast(horizon=20, inputs=inputs)
            for j, i in enumerate(chunk):
                mean = q[j, :, 0]                     # quantile head index 0 = mean; 1..9 = q10..q90
                # Rounded to 4 dp at creation (not just when written), so a freshly computed
                # forecast and the same forecast read back from the cache are identical.
                row = {"date": keys[i][0], "model": MODEL_ID, "context": context, "input_hash": keys[i][1],
                       "h1_mean": round(float(mean[0]), 4), "h5_mean": round(float(mean[:5].mean()), 4),
                       "h20_mean": round(float(mean[:20].mean()), 4)}
                for qi, qq in enumerate(QUANTILES):
                    row[f"h1_q{int(qq * 100)}"] = round(float(q[j, 0, qi + 1]), 4)
                new_rows.append(row)
            print(f"  computed {min(s + step, len(missing))}/{len(missing)}", file=sys.stderr, flush=True)

    rows = []
    new_by_key = {(r["date"], r["input_hash"]): r for r in new_rows}
    for k in keys:
        rows.append(new_by_key[k] if k in new_by_key else have[k]._asdict())
    out = pd.DataFrame(rows, columns=CACHE_COLS)

    if new_rows:
        # Keep every still-valid cached row (not just this run's origins) so a shorter
        # --window later doesn't throw history away; drop superseded hashes for these dates.
        dates_now = set(out.date)
        keep = cache[~cache.date.isin(dates_now)] if len(cache) else cache
        merged = pd.concat([keep, out], ignore_index=True).sort_values("date")
        os.makedirs(os.path.dirname(cache_path), exist_ok=True)
        merged.to_csv(cache_path, index=False)
    return out


def recalibrate(q_raw, y1, window):
    """Identical to research/timesfm_benchmark/run_benchmark.py's recalibrate(): scale each
    decile by the matching quantile of realized/forecast ratios over the previous `window`
    origins (all already observed at origin j). NaN until `window` history exists."""
    out = np.full_like(q_raw, np.nan)
    ratio = y1[:, None] / q_raw
    for j in range(window, len(q_raw)):
        r = ratio[j - window:j]
        r = r[np.isfinite(r).all(1)]
        if len(r) < window // 2:
            continue
        c = np.array([np.quantile(r[:, i], tau) for i, tau in enumerate(QUANTILES)])
        out[j] = np.sort(q_raw[j] * c)
    return out


def next_trading_day(d, trades_weekends):
    d = d + pd.Timedelta(days=1)
    while not trades_weekends and d.dayofweek >= 5:
        d += pd.Timedelta(days=1)
    return d


def r1(v):
    return None if v is None or not np.isfinite(v) else round(float(v), 1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("clean_csv")
    ap.add_argument("output_json")
    ap.add_argument("--asset", required=True)
    ap.add_argument("--cache", default=None, help="default: data/forecast/<asset>_timesfm_cache.csv")
    ap.add_argument("--context", type=int, default=1024)
    ap.add_argument("--window", type=int, default=500,
                    help="trailing origins used both to calibrate the band and to score the track record")
    ap.add_argument("--batch", type=int, default=32)
    args = ap.parse_args()

    asset = args.asset.upper()
    cache_path = args.cache or os.path.join(ROOT, "data", "forecast", f"{asset.lower()}_timesfm_cache.csv")
    dates, y, trades_weekends = load_series(args.clean_csv)
    W = args.window

    # Origins: the latest day (the live forecast) plus 2*W before it — W to score the track
    # record, and W more so each scored origin's band was itself calibrated out-of-sample.
    n_orig = min(2 * W + 1, len(y) - 30)
    origins = np.arange(len(y) - n_orig, len(y))
    print(f"=== forecast_range {asset}: {len(y)} days, {n_orig} origins, as of {dates.iloc[-1].date()} ===",
          file=sys.stderr)
    fc = get_forecasts(dates, y, origins, args.context, cache_path, args.batch)

    qcols = [f"h1_q{int(q * 100)}" for q in QUANTILES]
    q_raw = fc[qcols].to_numpy(float)
    y_next = np.append(y[1:], np.nan)
    y1 = y_next[origins]
    q_cal = recalibrate(q_raw, y1, W)
    adr20 = trailing_mean(y, 20)[origins]
    mean = {k: fc[f"h{k}_mean"].to_numpy(float) for k in HORIZONS}
    actual = {k: forward_mean(y, k)[origins] for k in HORIZONS}

    # ── track record: the last W origins with known outcomes ────────────────────────────
    track = {"rel_mae_vs_adr20": {}, "mae": {}, "n": {}}
    for k in HORIZONS:
        ok = np.isfinite(actual[k])
        idx = np.where(ok)[0][-W:]
        mae_tf = np.mean(np.abs(actual[k][idx] - mean[k][idx]))
        mae_adr = np.mean(np.abs(actual[k][idx] - adr20[idx]))
        track["rel_mae_vs_adr20"][f"h{k}"] = round(float(mae_tf / mae_adr), 3)
        track["mae"][f"h{k}"] = {"timesfm": r1(mae_tf), "adr20": r1(mae_adr)}
        track["n"][f"h{k}"] = int(len(idx))
    ok1 = np.isfinite(y1) & np.isfinite(q_cal).all(1)
    idx = np.where(ok1)[0][-W:]
    lo, hi = q_cal[idx, 0], q_cal[idx, 8]
    track.update({
        "from": dates[origins[idx[0]]].strftime("%Y-%m-%d") if len(idx) else None,
        "to": dates[origins[idx[-1]]].strftime("%Y-%m-%d") if len(idx) else None,
        "band_n": int(len(idx)),
        "band_coverage": round(float(np.mean((y1[idx] >= lo) & (y1[idx] <= hi))), 3) if len(idx) else None,
        "above_q90": round(float(np.mean(y1[idx] > hi)), 3) if len(idx) else None,
        "below_q10": round(float(np.mean(y1[idx] < lo)), 3) if len(idx) else None,
    })

    # ── live forecast (latest origin) ───────────────────────────────────────────────────
    as_of = dates.iloc[-1]
    target = next_trading_day(as_of, trades_weekends)
    out = {
        "asset": asset,
        "as_of": as_of.strftime("%Y-%m-%d"),
        "model": MODEL_ID,
        "context_days": args.context,
        "calibration_window": W,
        "trades_weekends": trades_weekends,
        "adr20": r1(adr20[-1]),
        "forecast": {
            "h1": {"target_date": target.strftime("%Y-%m-%d"), "mean": r1(mean[1][-1]),
                   "q10": r1(q_cal[-1, 0]), "q90": r1(q_cal[-1, 8]),
                   "q10_raw": r1(q_raw[-1, 0]), "q90_raw": r1(q_raw[-1, 8])},
            "h5": {"mean": r1(mean[5][-1])},
            "h20": {"mean": r1(mean[20][-1])},
        },
        "track_record": track,
        "recent": [
            {"date": next_trading_day(dates[origins[j]], trades_weekends).strftime("%Y-%m-%d")
                     if j == len(origins) - 1 else dates[origins[j] + 1].strftime("%Y-%m-%d"),
             "actual": r1(y1[j]), "mean": r1(mean[1][j]), "q10": r1(q_cal[j, 0]), "q90": r1(q_cal[j, 8])}
            for j in range(max(0, len(origins) - RECENT_N - 1), len(origins))
        ],
    }
    os.makedirs(os.path.dirname(os.path.abspath(args.output_json)), exist_ok=True)
    with open(args.output_json, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1)
    t = track
    print(f"  next day {out['forecast']['h1']['mean']} (band {out['forecast']['h1']['q10']}-"
          f"{out['forecast']['h1']['q90']}), 5d {out['forecast']['h5']['mean']}, 20d {out['forecast']['h20']['mean']}; "
          f"track rel MAE {t['rel_mae_vs_adr20']}, band coverage {t['band_coverage']}", file=sys.stderr)
    print(f"Wrote {args.output_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
