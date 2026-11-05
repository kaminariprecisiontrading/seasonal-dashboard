# Automation — weekly data refresh & Telegram alerts

Two weekly jobs keep the site's MT5-derived data fresh and post a signal digest to a private
Telegram channel. Added in v1.29.

## Weekly timeline

```
Sun 14:00 Botswana (12:00 UTC)   Windows Task Scheduler on the MSI laptop
                                 backend/automation/weekly_run.py
                                   - branch guard (must be on main, see below)
                                   0 git pull
                                   1 MT5 download (new M1 bars, every configured asset)
                                   2 merge into data/raw/<KEY>_M1_full.csv
                                   3 refresh_asset.py per updated asset
                                   4 derived seasonals (BTCUSD), first run of each month
                                   5 sync_profiling_data.js
                                   6 grade_signals.py → sync_track_record.js
                                   7 commit + push → Netlify deploys
                                 Laptop off at 14:00? Runs at the next login.

Mon 03:17 UTC                    GitHub Action: Weekly signal snapshot (existing, v1.28)
Mon ~03:20 UTC                   GitHub Action: Weekly Telegram alert
                                 starts when the snapshot succeeds → posts the digest
```

Sunday is used so 7-day markets (crypto; later Deriv synthetics) are captured through
Saturday. Sunday's partial day is dropped and picked up the next week, so nothing is lost.

## Branch guard

Step 7 pushes to `main`, and Netlify deploys what lands there. So before doing anything,
`weekly_run.py` checks that:

- the repo is on `main` (`config.json → git.branch`), and
- there are no uncommitted changes outside `config.json → git.add_paths`.

If either fails, it logs a warning, sends the optional DM and exits without pulling, committing or
pushing. This also applies to `--dry-run`, so **a successful dry run has to be on `main`**. Switch
back to `main`, commit or stash your work, and run it again; if the Sunday task was the one that
stopped, run it by hand or wait for next Sunday.

Changes *inside* `add_paths` are allowed, because step 7 commits those. That includes hand edits:
**an uncommitted edit to `frontend/data/<asset>.js` goes into Sunday's commit and gets pushed.**
Commit hand edits before Sunday.

If `git pull` fails, the run aborts the rebase, so the repo returns to `main`, and carries on with
the local data. The branch is checked again just before step 7.

## What's where

| Path | What |
|---|---|
| `backend/automation/config.json` | Terminals, assets (key → broker symbol, `5d`/`7d`), download and git settings |
| `backend/automation/mt5_download.py` | Pulls new bars and checks them against the existing file |
| `backend/automation/weekly_run.py` | The whole Sunday chain, starting with the branch guard |
| `backend/automation/setup_task.ps1` | Registers or removes the Task Scheduler task |
| `backend/automation/logs/` | One log per run (gitignored) |
| `backend/automation/state.json` | Last run, pending retries, monthly derived-seasonal marker (gitignored) |
| `backend/data/raw/incoming/` | Downloads waiting to be merged; `merged/` keeps 8 weeks (gitignored) |
| `scripts/telegram_digest.js` | Builds the digest from the site's own data; `--send` posts it |
| `.github/workflows/weekly-telegram-alert.yml` | Runs the digest after each snapshot |
| `frontend/data/asset_sources.js` | Data-source label for every asset (used by the alert and the site) |

## One-time setup

### A. Weekly refresh (laptop)

1. **Install the MT5 package** into the existing venv:
   ```
   backend\.venv\Scripts\python.exe -m pip install -r backend\automation\requirements-automation.txt
   ```
2. **Check `config.json`.** The TradersWay terminal path is
   `C:/Program Files/MetaTrader 5/terminal64.exe`. Leave the Deriv terminal `enabled: false`
   until its app is installed.
3. **Make sure the MT5 terminal remembers your login** (tick "Save password" when logging in).
4. **Test by hand**, on `main` with a clean tree (the [branch guard](#branch-guard) stops it
   anywhere else), with a visible console:
   ```
   backend\.venv\Scripts\python.exe backend\automation\weekly_run.py --dry-run
   backend\.venv\Scripts\python.exe backend\automation\weekly_run.py --no-push
   ```
   Check the log, `git log -1` and `git diff HEAD~1 --stat`, then `git push` yourself the
   first time.
5. **Register the task:**
   ```
   powershell -ExecutionPolicy Bypass -File backend\automation\setup_task.ps1
   ```
   It checks the venv, the MetaTrader5 package, node, git and the terminal path first.
   Use `-RunNow` to start it once immediately, `-ShowWindow` to see the console while it runs,
   and `-Remove` to unregister it.
6. **Git push** uses your existing SSH key. `ssh -T git@github.com` already succeeds without a
   prompt, so nothing extra is needed.

### B. Telegram channel + alert

1. **Create the bot:** in Telegram, message **@BotFather** → `/newbot` → copy the token.
2. **Create the channel:** New Channel → **Private** → name it (e.g. "KPT Seasonals"). Add the
   bot as an **administrator** with "Post messages".
3. **Find the channel id:** post anything in the channel, then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and read `chat.id`
   (it looks like `-100…`).
4. **Add GitHub secrets** (repo → Settings → Secrets and variables → Actions):
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
5. **Test:** Actions → *Weekly Telegram alert* → Run workflow, with "send" unticked (the message
   appears in the log). Then run it again with "send" ticked.
6. **Pin a post in the channel** with the description text below.
7. **Share the invite link** privately (channel → Manage → Invite links). It's not published on
   the site.

**Optional: a DM to yourself after each Sunday run.** Message your bot once, read your own
`chat.id` from `getUpdates`, copy `backend/automation/.env.example` to `.env` and fill in
both values. `config.json → notify.mode` is `failures` (default), `always` or `never`.

### Channel description / pinned post

> **KPT Seasonals — weekly signals.** A digest of the week's seasonal signals from
> kpt-seasonals.netlify.app, posted every Monday. Every line shows its data source
> (MRCI, MRCI-derived, MT5 · TradersWay, MT5 · Deriv…). Synthetic indices are
> random-generated by Deriv; read their signals with that in mind.
> Historical patterns only. **Not financial advice**, and the operator is not licensed by
> NBFIRA or any regulator. Risk disclosure: kpt-seasonals.netlify.app/risk

## When something goes wrong

| Symptom | What to do |
|---|---|
| `branch guard: on '<branch>', not 'main'` | The repo was on another branch. Nothing was pulled, committed or pushed. Switch to `main` and run again. |
| `branch guard: N uncommitted change(s) outside the automation's paths` | The log lists the files. Commit or stash them, then run again. |
| Task shows "last result 0x1" | Open the newest `backend/automation/logs/run_*.log`; the RESULT block lists the problems |
| `overlap mismatch` for an asset | The bars MT5 returns don't match the file you have. Usual causes: a different broker/account, or a changed server time zone. Nothing was merged. Compare a few rows by hand and re-export the asset in full if the feed really changed. |
| `could not start/connect to … terminal` | Check the path in `config.json`, and that the terminal opens by itself and is logged in. Close any other script that's connected to MT5. |
| `git push failed` | The commit stays local and is pushed on the next run. To push now: `git pull --rebase` then `git push`. |
| `refresh <KEY>` failed | It's retried automatically next run (`state.json → needs_refresh`). Re-run now with `weekly_run.py --skip-download --assets <KEY>`. |
| Run stopped half-way | Re-run it. Downloads wait in `incoming/` until merged, and every stage is safe to repeat. |
| "another run holds .lock" | A run is still going, or one crashed. Delete `backend/automation/.lock` if no run is active. |
| No Monday alert | Check Actions → *Weekly signal snapshot*. The alert only follows a successful snapshot. Fix that, re-run it, and the alert follows. |
| Alert posted twice | Every successful snapshot run triggers the alert, including manual runs and re-runs, and it posts the **current** week's digest even if the snapshot was for a past date. There's no setting for this; delete the extra post in the channel. |
| Alert run fails with `TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set` | The GitHub secrets aren't set yet (see B.4 above). The snapshot isn't affected. |

## Adding an asset to the weekly download

1. Do a **first full export** by hand (MT5 → View → Symbols → Bars → M1, full range) to
   `backend/data/raw/<KEY>_M1_full.csv`, as in `CONTRIBUTING.md`.
2. Add it to `config.json → assets` with its broker symbol, terminal and `week`
   (`7d` for crypto and synthetics).
3. Follow "Adding a New Profiling Asset" in `CONTRIBUTING.md` (pip registry, sync list, …).
4. Price-derived seasonal? Add it to `config.json → derived_seasonal` and to
   `scripts/sync_derived_seasonal.js`.
5. Set its source in `frontend/data/asset_sources.js` if the block default doesn't fit.

## Data sources and labels

Every asset resolves to one source via `frontend/data/asset_sources.js`: a per-asset override,
otherwise the default for its dashboard block.

| Key | Label | Used for |
|---|---|---|
| `mrci` | MRCI | Futures (Moore Research Center charts) |
| `mrci-derived` | MRCI-derived | Forex pairs synthesised from two MRCI currency futures |
| `mt5-tradersway` | MT5 · TradersWay · price-derived | Crypto (BTCUSD); any asset moved off MRCI |
| `mt5-deriv` | MT5 · Deriv · price-derived | Deriv non-synthetic symbols |
| `mt5-deriv-syn` | MT5 · Deriv · price-derived · synthetic | Deriv synthetic indices |

To move an asset to a new source (free, paid with a sharing licence, or MT5), add its
`KPT_SOURCE_OVERRIDES` line. Labels on the alert, and on the site once wired in, follow
automatically. A new source family gets a new `KPT_SOURCES` entry.
