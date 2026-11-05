"""
weekly_run.py — the weekly data refresh, end to end (v1.29; docs/AUTOMATION.md).
Run by Windows Task Scheduler every Sunday (automation/setup_task.ps1), or by hand.

  -  branch guard                         (stops unless on main with no changes outside add_paths)
  0  git pull --rebase --autostash        (gets Monday snapshots; continues offline if it fails)
  1  MT5 download → data/raw/incoming/     (automation/mt5_download.py)
  2  merge into data/raw/<KEY>_M1_full.csv (pipeline/concat_raw_csv.py --keep-trailing)
  3  refresh each updated asset            (pipeline/refresh_asset.py <KEY>)
  4  derived seasonals, monthly            (gen_seasonal_signal.py → sync_derived_seasonal.js
                                            → gen_signals_manifest.js → gen_month_signals.js)
  5  sync profiling data to the site       (scripts/sync_profiling_data.js)
  6  re-grade the Track Record             (pipeline/grade_signals.py → scripts/sync_track_record.js)
  7  commit + push → Netlify deploys       (a failed push is retried on the next run)

Every stage is safe to re-run. Downloaded files are kept until merged, so nothing is lost if a
later stage fails: fix the cause and run again (`--skip-download` reuses what's in incoming/).

The guard exists because step 7 pushes HEAD to main: run from a project or topic branch, that
branch's work would land on main and Netlify would deploy it. It also applies to --dry-run.

Usage (from the repo root, with backend/.venv's Python):
    backend\\.venv\\Scripts\\python.exe backend\\automation\\weekly_run.py [options]
      --dry-run          log what would happen; download nothing, change nothing
      --skip-download    merge/refresh whatever is already in data/raw/incoming/
      --assets K [K …]   limit to these asset keys
      --no-push          commit locally but don't push
      --force-derived    regenerate derived seasonals even if done this month
      --accept-gap K [K …]  merge these assets despite a long gap or no overlap, after checking by hand

Logs: backend/automation/logs/run_<date>_<time>.log · state: backend/automation/state.json
"""
import argparse
import datetime as dt
import glob
import json
import os
import shutil
import subprocess
import sys
import time
import traceback

HERE = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.dirname(HERE)
ROOT = os.path.dirname(BACKEND)
RAW = os.path.join(BACKEND, "data", "raw")
INCOMING = os.path.join(RAW, "incoming")
MERGED = os.path.join(INCOMING, "merged")
LOGS = os.path.join(HERE, "logs")
STATE = os.path.join(HERE, "state.json")
LOCK = os.path.join(HERE, ".lock")
PY = sys.executable  # backend/.venv's interpreter when launched as documented
# Under pythonw.exe (the hidden task) there's no console, so each git/node call would open its own.
NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0) if sys.stdout is None else 0

sys.path.insert(0, HERE)
import mt5_download  # noqa: E402

RUN_STARTED = dt.datetime.now()
os.makedirs(LOGS, exist_ok=True)
LOG_PATH = os.path.join(LOGS, f"run_{RUN_STARTED:%Y-%m-%d_%H%M}.log")
_log_f = open(LOG_PATH, "a", encoding="utf-8")
if sys.stdout:                          # piped output is cp1252 on Windows, which can't encode "→"
    sys.stdout.reconfigure(errors="replace")


def log(msg=""):
    line = f"[{dt.datetime.now():%H:%M:%S}] {msg}"
    if sys.stdout:                      # None under pythonw.exe (no console)
        print(line, flush=True)
    _log_f.write(line + "\n")
    _log_f.flush()


def run(cmd, cwd=ROOT, dry=False, check=True):
    shown = " ".join(cmd)
    if dry:
        log(f"  (dry run) {shown}")
        return 0, ""
    log(f"  $ {shown}")
    p = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace", creationflags=NO_WINDOW)
    out = (p.stdout or "") + (p.stderr or "")
    for ln in out.strip().splitlines()[-25:]:      # keep the log readable; tails are enough
        _log_f.write("    " + ln + "\n")
    if check and p.returncode != 0:
        raise RuntimeError(f"command failed ({p.returncode}): {shown}\n{out.strip()[-1500:]}")
    return p.returncode, out


def load_json(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def save_state(state):
    tmp = STATE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=1)
    os.replace(tmp, STATE)


def load_env():
    env = {}
    path = os.path.join(HERE, ".env")
    if os.path.exists(path):
        for ln in open(path, encoding="utf-8"):
            ln = ln.strip()
            if ln and not ln.startswith("#") and "=" in ln:
                k, v = ln.split("=", 1)
                env[k.strip()] = v.strip().strip('"')
    return env


def notify(cfg, ok, summary):
    mode = cfg.get("notify", {}).get("mode", "failures")
    if mode == "never" or (mode == "failures" and ok):
        return
    env = load_env()
    token, chat = env.get("TELEGRAM_BOT_TOKEN"), env.get("TELEGRAM_OWNER_CHAT_ID")
    if not token or not chat:
        return
    try:
        import urllib.request
        text = ("✅" if ok else "⚠️") + " KPT weekly refresh\n" + summary[-3500:]
        req = urllib.request.Request(
            f"https://api.telegram.org/bot{token}/sendMessage",
            data=json.dumps({"chat_id": chat, "text": text, "disable_web_page_preview": True}).encode(),
            headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=20).read()
    except Exception as e:  # notification is best-effort
        log(f"(notify failed: {e})")


def acquire_lock():
    if os.path.exists(LOCK) and time.time() - os.path.getmtime(LOCK) < 12 * 3600:
        raise SystemExit(f"another run holds {LOCK} (started {dt.datetime.fromtimestamp(os.path.getmtime(LOCK))}); "
                         "delete it if that run is dead")
    with open(LOCK, "w") as f:
        f.write(str(os.getpid()))


def git(args, dry, check=True):
    return run(["git"] + args, dry=dry, check=check)


def git_read(args):
    """Read-only git query. Runs even in a dry run, and keeps stderr out of the result."""
    p = subprocess.run(["git"] + args, cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace", creationflags=NO_WINDOW)
    return p.returncode, p.stdout


def wrong_branch(cfg):
    """Why HEAD isn't the configured branch, or None if it is. A rebase in progress reads as "HEAD"."""
    rc, out = git_read(["rev-parse", "--abbrev-ref", "HEAD"])
    if rc != 0:
        return "could not read the current git branch"
    head, branch = out.strip(), cfg["git"]["branch"]
    return None if head == branch else f"on '{head}', not '{branch}'"


def guard_problem(cfg):
    """Why the run must not start, or None. Changes inside add_paths are allowed: step 7 commits those."""
    problem = wrong_branch(cfg)
    if problem:
        return problem
    rc, out = git_read(["status", "--porcelain", "-z", "--untracked-files=all"])
    if rc != 0:
        return "could not read git status"
    prefixes = [p.rstrip("/") + "/" for p in cfg["git"]["add_paths"]]
    outside, entries = [], out.split("\0")
    i = 0
    while i < len(entries):
        entry = entries[i]
        i += 1
        if not entry:
            continue
        status, path = entry[:2], entry[3:]
        names = [path]
        if "R" in status or "C" in status:   # -z puts a rename's original path in the next entry
            names.append(entries[i])
            i += 1
        outside += [n for n in names if not any(n.startswith(p) for p in prefixes)]
    if outside:
        return f"{len(outside)} uncommitted change(s) outside the automation's paths: " + ", ".join(outside[:10])
    return None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--skip-download", action="store_true")
    ap.add_argument("--assets", nargs="*")
    ap.add_argument("--no-push", action="store_true")
    ap.add_argument("--force-derived", action="store_true")
    ap.add_argument("--accept-gap", nargs="*", default=[], metavar="KEY")
    a = ap.parse_args()
    dry = a.dry_run

    cfg = mt5_download.load_config()
    state = load_json(STATE, {})
    report, problems, would_merge = [], [], []
    keys = [x["key"] for x in cfg["assets"] if not a.assets or x["key"] in a.assets]
    log(f"KPT weekly run · {RUN_STARTED:%Y-%m-%d %H:%M} · assets: {', '.join(keys)}" + (" · DRY RUN" if dry else ""))

    # Branch guard: nothing is pulled, committed or pushed unless this passes.
    problem = guard_problem(cfg)
    if problem:
        msg = f"branch guard: {problem}. Stopped without pulling, committing or pushing. Fix it and run again."
        log("WARNING: " + msg)
        problems.append(msg)
        state["last_run"] = {"at": RUN_STARTED.isoformat(timespec="minutes"), "problems": problems, "log": os.path.relpath(LOG_PATH, ROOT)}
        if not dry:
            save_state(state)
            notify(cfg, False, msg + f"\nlog: {os.path.relpath(LOG_PATH, ROOT)}")
        log("RESULT: stopped by the branch guard")
        sys.exit(1)

    try:
        acquire_lock()
    except SystemExit as e:             # stderr goes nowhere under the hidden task
        log(f"WARNING: {e}")
        if not dry:
            notify(cfg, False, f"{e}\nlog: {os.path.relpath(LOG_PATH, ROOT)}")
        log("RESULT: stopped, another run holds the lock")
        sys.exit(1)

    try:
        # 0 — pull
        log("[0] git pull")
        rc, _ = git(["pull", "--rebase", "--autostash", cfg["git"]["remote"], cfg["git"]["branch"]], dry, check=False)
        if rc != 0:
            git(["rebase", "--abort"], dry, check=False)   # a conflict would otherwise leave HEAD detached
            problems.append("git pull failed — continuing offline; push will be retried next run")

        # 1 — download
        if not a.skip_download:
            log("[1] MT5 download")
            results = mt5_download.download_all(cfg, only=keys, dry_run=dry, log=log, accept_gap=a.accept_gap)
            for r in results:
                if r["status"] == "error":
                    problems.append(f"download {r['key']}: {r.get('msg')}")
            got = ", ".join(f"{r['key']} {r.get('bars', 0)}" for r in results if r["status"] == "ok")
            report.append(("would download (bars): " if dry else "download (bars): ") + (got or "nothing new"))
            if dry:    # nothing was written to incoming/, so step 2 has no files to find
                would_merge = [r["key"] for r in results if r["status"] == "ok"]
        else:
            log("[1] download skipped")

        # 2 — merge (oldest file first, per asset)
        log("[2] merge into full raw files")
        updated = list(would_merge)
        for key in keys:
            files = sorted(glob.glob(os.path.join(INCOMING, f"{key}_M1_*.csv")))
            for f in files:
                full = mt5_download.full_csv(key)
                tmp = full + ".new"
                try:
                    run([PY, os.path.join("pipeline", "concat_raw_csv.py"), full, f, tmp, "--keep-trailing"], cwd=BACKEND, dry=dry)
                    if not dry:
                        if os.path.getsize(tmp) < os.path.getsize(full):
                            raise RuntimeError("merged file is smaller than the original — refusing to replace")
                        os.replace(tmp, full)
                        os.makedirs(MERGED, exist_ok=True)
                        shutil.move(f, os.path.join(MERGED, os.path.basename(f)))
                    if key not in updated:
                        updated.append(key)
                except Exception as e:
                    problems.append(f"merge {key}: {e}")
                    if os.path.exists(tmp):
                        os.remove(tmp)
                    break
        # keep 8 weeks of merged incoming files as an audit trail
        cutoff = time.time() - 56 * 86400
        for f in glob.glob(os.path.join(MERGED, "*.csv")):
            if os.path.getmtime(f) < cutoff and not dry:
                os.remove(f)

        # 3 — refresh (plus any asset whose refresh failed last time)
        for key in state.get("needs_refresh", []):
            if key in keys and key not in updated:
                updated.append(key)
        log(f"[3] refresh: {', '.join(updated) or 'nothing to refresh'}")
        refreshed, failed = [], []
        for key in updated:
            try:
                run([PY, os.path.join("pipeline", "refresh_asset.py"), key], cwd=BACKEND, dry=dry)
                refreshed.append(key)
            except Exception as e:
                failed.append(key)
                problems.append(f"refresh {key}: {str(e).splitlines()[0]}")
        state["needs_refresh"] = failed + [k for k in state.get("needs_refresh", []) if k not in keys]
        report.append(("would refresh: " if dry else "refreshed: ") + (", ".join(refreshed) or "none"))

        # 4 — derived seasonals (monthly)
        month = f"{RUN_STARTED:%Y-%m}"
        derived_done = dict(state.get("derived_seasonal_month", {}))   # saved only once the sync succeeds
        derived_changed = False
        for d in cfg.get("derived_seasonal", []):
            k = d["key"]
            due = a.force_derived or (d.get("cadence") == "monthly" and derived_done.get(k) != month)
            if not due or (a.assets and k not in a.assets):
                continue
            log(f"[4] derived seasonal {k} ({month})")
            try:
                run([PY, os.path.join("pipeline", "gen_seasonal_signal.py"), k], cwd=BACKEND, dry=dry)
                derived_done[k] = month
                derived_changed = True
            except Exception as e:
                problems.append(f"derived seasonal {k}: {str(e).splitlines()[0]}")
        if derived_changed:
            try:
                run(["node", "scripts/sync_derived_seasonal.js"], dry=dry)
                run(["node", "scripts/gen_signals_manifest.js"], dry=dry)
                run(["node", "scripts/gen_month_signals.js"], dry=dry)
                run(["node", "scripts/gen_signals_manifest.js", "--check"], dry=dry)
                state["derived_seasonal_month"] = derived_done
                report.append(("would regenerate derived seasonals: " if dry else "derived seasonals regenerated: ") + ", ".join(k for k, m in derived_done.items() if m == month))
            except Exception as e:
                problems.append(f"derived seasonal sync: {str(e).splitlines()[0]}")
        else:
            log("[4] derived seasonals: not due this run")

        # 5 + 6 — site sync and grading (only if something changed)
        if refreshed or derived_changed:
            log("[5] sync profiling data")
            try:
                run(["node", "scripts/sync_profiling_data.js"], dry=dry)
            except Exception as e:
                problems.append(f"sync_profiling_data: {str(e).splitlines()[0]}")
            log("[6] grade track record")
            try:
                run([PY, os.path.join("pipeline", "grade_signals.py")], cwd=BACKEND, dry=dry)
                run(["node", "scripts/sync_track_record.js"], dry=dry)
            except Exception as e:
                problems.append(f"grading: {str(e).splitlines()[0]}")
        else:
            log("[5-6] nothing changed — sync and grading skipped")

        # 7 — commit + push
        log("[7] commit + push")
        problem = wrong_branch(cfg)   # the guard passed at the start; a failed abort or a manual switch can change it
        if problem:
            problems.append(f"branch guard: {problem} at step 7. Not committed or pushed; the data stays in the working tree.")
        else:
            paths = [p for p in cfg["git"]["add_paths"] if os.path.exists(os.path.join(ROOT, p))]
            git(["add", "--"] + paths, dry, check=False)
            rc, _ = git(["diff", "--cached", "--quiet"], dry, check=False)
            if rc != 0 and not dry:
                msg = f"Weekly data refresh {RUN_STARTED:%Y-%m-%d} · {len(refreshed)} asset(s)" + (" + derived seasonals" if derived_changed else "")
                git(["commit", "-m", msg], dry)
                report.append("committed: " + msg)
            elif not dry:
                log("  no data changes to commit")
            if cfg["git"].get("push", True) and not a.no_push:
                rc, out = git(["push", cfg["git"]["remote"], f"HEAD:{cfg['git']['branch']}"], dry, check=False)
                if rc != 0:
                    problems.append("git push failed — commit kept locally, will push next run")
                    state["pending_push"] = True
                else:
                    state["pending_push"] = False
                    report.append("push skipped (dry run)" if dry else "pushed → Netlify deploys")

        state["last_run"] = {"at": RUN_STARTED.isoformat(timespec="minutes"), "problems": problems, "log": os.path.relpath(LOG_PATH, ROOT)}
        if not problems:
            state["last_success"] = RUN_STARTED.isoformat(timespec="minutes")
        if not dry:
            save_state(state)
    except SystemExit as e:             # e.g. MetaTrader5 not installed
        problems.append(str(e))
    except Exception:
        problems.append("unexpected error:\n" + traceback.format_exc()[-1500:])
    finally:
        if os.path.exists(LOCK):
            os.remove(LOCK)

    ok = not problems
    summary = "\n".join(report + (["", "PROBLEMS:"] + problems if problems else [])) + f"\nlog: {os.path.relpath(LOG_PATH, ROOT)}"
    log("")
    log("RESULT: " + ("OK" if ok else f"{len(problems)} problem(s)"))
    for ln in summary.splitlines():
        log("  " + ln)
    if not dry:
        notify(cfg, ok, summary)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
