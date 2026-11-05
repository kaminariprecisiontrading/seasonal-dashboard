# Alerts & Data Automation — Build Brief for Claude Code (v1.29)

**Repo:** `seasonal-dashboard` (monorepo: `frontend/` published, `backend/` pipeline, `scripts/`, `docs/`)
**Spec folder:** `docs/specs/2026-10-alerts-automation/` (this brief, `files/`, `mockups/`, `sample_digest.txt`)

Read `README.md`, `backend/README.md`, `backend/HANDOVER.md`, `docs/CONTRIBUTING.md`,
`scripts/README.md` and the existing `.github/workflows/weekly-signal-snapshot.yml` first.

---

## 0. Decisions (locked by the owner)

| Topic | Decision |
|---|---|
| Alerts | Private Telegram **channel** (one-way broadcast), invite link shared by DM only, **not on the site**. A discussion group may come later. |
| Alert timing | Straight after the Monday snapshot Action succeeds, so the alert shows exactly the recorded signals |
| Alert scheduler | GitHub Actions (`workflow_run` on "Weekly signal snapshot") |
| Source labels | Every alert line, and later every site feature, shows the asset's data source. Permanent, including future free or paid sources. |
| Weekly data job | Windows Task Scheduler on the owner's laptop, **Sunday 14:00 Botswana (12:00 UTC)**. Runs at next login if missed. |
| Data job scope | MT5 download (weekly append) → pipeline → push → Netlify deploy. If the push fails, the data stays local and is pushed on the next run. |
| Assets | The current 14 profiling assets, config-driven, grow over time |
| MT5 terminals | TradersWay at `C:\Program Files\MetaTrader 5\terminal64.exe` (logged in). A **separate Deriv MT5 app** for synthetics only; path TBD, disabled until installed. Deriv non-synthetics (e.g. XAU) may come from either terminal. |
| BTC derived seasonal | Regenerated **monthly** (first weekly run of each month) |
| Crypto & synthetics | Treated like any other asset: price-derived seasonal signal, alerts, Track Record, labels. Synthetics carry an **educational** note about RNG generation; it informs, it doesn't block anything. |
| 7-day markets | Crypto and synthetics: week = Mon 00:00 → Sun close |
| Track Record | Owner to choose **Option A** (synthetics in the headline) or **Option B** (separate category; leaning B). See mockups. |
| Broker comparison | Mockup only. The owner decides whether it's early or roadmap. |
| Git auth | SSH already works without a prompt (`ssh -T git@github.com` OK) |

## 1. Delivered files (`files/`, repo-relative paths)

Written and tested outside the repo: the digest against the real `frontend/` data, and the
weekly runner end to end against a fake `MetaTrader5` module and a local git remote.
**Review, copy into place, and run the checks in §9.**

| Path | New / changed | Notes |
|---|---|---|
| `backend/automation/config.json` | new | 14 assets with TradersWay symbols (`.US500Cash`, `.USTECHCash`, `.US30Cash`, `.BrentCrude`, `.WTICrude`); Deriv terminal disabled |
| `backend/automation/mt5_download.py` | new | Incremental M1 fetch, **overlap check** (refuses to merge on mismatch), trailing-partial-day trim, Export-Bars format |
| `backend/automation/weekly_run.py` | new | Steps 0–7, lock, log per run, `state.json` (retry failed refreshes, pending push, monthly derived marker), optional Telegram DM |
| `backend/automation/setup_task.ps1` | new | Pre-flight checks + `Register-ScheduledTask` (interactive user, StartWhenAvailable, WakeToRun, network, 8h limit) |
| `backend/automation/requirements-automation.txt` | new | `MetaTrader5`. Pin it after the first install. |
| `backend/automation/.env.example`, `README.md` | new | |
| `backend/pipeline/concat_raw_csv.py` | **changed** | Adds `--keep-trailing` (§2). Default behaviour unchanged. |
| `backend/.gitignore` | changed | `data/raw/incoming/`, `automation/logs/`, `state.json`, `.lock`, `.env`, `*.csv.new` |
| `scripts/telegram_digest.js` | new | Builds the digest through `js/signals.js`; this week from the snapshot; `--send` posts |
| `.github/workflows/weekly-telegram-alert.yml` | new | `workflow_run` after the snapshot + manual dry run / send |
| `frontend/data/asset_sources.js` | new | Source registry (`KPT_SOURCES`, block defaults, per-asset overrides, `kptSourceOf()`) |
| `docs/AUTOMATION.md` | new | Runbook: setup, Telegram, troubleshooting, adding assets, sources |

## 2. `concat_raw_csv.py --keep-trailing`

The script always drops the new export's last date, because a manual "up to today" export can
end mid-day. For Sunday runs that would drop **Friday** for 5-day markets every week, leaving
the data permanently a week behind. `mt5_download.py` trims partial days itself: a day is kept
if its last bar is ≥ 23:50 server time, or if no bar has arrived for 12h+. The weekly run
therefore passes `--keep-trailing`.

**Check:** manual use without the flag behaves exactly as before. Document the flag in
`backend/README.md`.

## 3. Track Record: 7-day weeks (`backend/pipeline/grade_signals.py`)

Today every asset is graded Mon–Fri (`weekly_frames` filters `dayofweek < 5`). BTCUSD trades
seven days a week.

1. Add a week type per graded asset: `ASSETS` entries gain `"5d"` or `"7d"`. Mark `btcusd` as
   `7d`; future crypto and synthetics also `7d`. Prefer reading it from
   `backend/automation/config.json` so there's one list.
2. For `7d`: keep all days; the move is the first day's open → **Sunday's** close; ADR20 uses
   all days. Grade the data's last week only once its Sunday bar exists (for `5d`, keep the
   current Friday rule).
3. FLIP for `7d`: second half = Thursday open → Sunday close (mirrors Wed→Fri for 5-day weeks).
   Document this in the grading rules on `/track-record`.
4. Re-grade, sync, and add a CHANGELOG note that BTCUSD's history was re-graded on 7-day weeks.
5. **Pending row (Option B mockup):** the current, ungraded week shows as `… PENDING` in the log
   for 7-day assets. This is optional; do it if it's simple in `track-record.js`.

## 4. Synthetics, Deriv and multi-broker keys

1. **Dashboard block** `synthetics` (label "Synthetic Indices") after Crypto in `dashboard.html`,
   with `gen_asset_index.js` picking it up. Cards show a `SYN` badge.
2. **Asset keys:** pipeline keys stay `<asset>` for the primary feed. A second broker for the
   same instrument uses `<asset>_<broker>` (e.g. `xauusd_deriv`), per
   `docs/PLATFORM_ROADMAP.md`'s multi-broker note. `config.json → assets[].key` uses the same
   form in upper case (`XAUUSD_DERIV`).
3. **Synthetics note** (educational, shown on synthetic asset pages under the derived-seasonal
   note, on the Track Record synthetics view, and as one line in the alert):
   > Deriv's synthetic indices are generated by a random number generator with fixed
   > statistical properties, independent of real markets, news and trading sessions. Signals
   > are produced and graded exactly like any other asset's; the Track Record is the honest test
   > (a hit rate near 50% is what randomness predicts).
4. **Profiling:** synthetics go through the normal pipeline. Session and timing charts get a
   one-line caption: "expected to be flat for a random-generated index".
5. Adding a synthetic follows "Adding a Statistically-Derived Asset" in `CONTRIBUTING.md`, plus
   `config.json` (`terminal: "deriv"`, `week: "7d"`) and its source (`mt5-deriv-syn` via the
   block default).

## 5. Source labels on the site (`frontend/data/asset_sources.js`)

Load `asset_sources.js` after `asset_index.js` wherever assets are listed. Show the label:

| Where | How |
|---|---|
| Dashboard cards | Small source chip (short form) next to the existing badges |
| Asset page header | Full label, e.g. "Source: MT5 · TradersWay · price-derived" |
| This Week, Heatmap (side panel), Track Record log | Short chip per row |
| `/sources` page | A table of every source key, its description and the number of assets using it (generated at runtime) |

`gen_asset_index.js` stays the registry of cards. Sources are kept separate on purpose: moving an
asset to a new source is a one-line override, not a card edit.

## 6. Track Record view: owner's choice

Mockups:
- `mockups/trackrecord-a.html`: combined headline
- `mockups/trackrecord-b.html`: separate category
- `mockups/trackrecord-c.html`: three views (Real markets · Synthetics · Combined), each with its own disclaimer

**Do not build until the owner picks.** Whichever is chosen:

- Categories come from the asset's block (`synthetics` vs everything else). Crypto stays under
  real markets.
- **Option B extras:** the "each index vs random" chart. The band is 50% ± 1.96·√(0.25/n);
  the dot is the index's hit rate. The verdict tile reads "Inside random" if the combined rate
  is inside the combined band, otherwise "Outside random (n = …)". No "edge" claims either way.
- **Option C extras:** everything in Option B, plus:
  - A **Combined** tab with a composition bar (each group's share of graded signals).
  - A comparison table: group, signals, hit rate, 95% random band with above/inside/below, 5-dot hit rate and data source.
  - One list of all assets with SYN badges.
  - A **per-view disclaimer**, worded as in the mockup:
    - Real: hypothetical results, backfill is in-sample
    - Synthetics: RNG generation and the random band
    - Combined: "read with care", the combined rate is signal-weighted, read the other views first
  - Default tab: Real markets. The tab is kept in the URL (`?view=real|syn|all`), so a link to a view can be shared.

## 7. Broker comparison (roadmap candidate)

Mockup: `mockups/brokercompare.html`. If the owner approves it later:

- **Route** `/brokers`. Needs two cleaned feeds for one instrument (`xauusd` + `xauusd_deriv`).
- **Pipeline:** align both feeds to the 5pm New York daily close before comparing. Run
  `gen_seasonal_signal.py` on each over the **overlap period only** (an option for a common
  start date) so the comparison is like-for-like.
- **Output:** `backend/output/broker_compare_<asset>.json` with coverage, the 48-slot signal per
  feed, agreement counts and profiling deltas. Synced into `frontend/data/` by a new sync script.

## 8. Docs to update

| File | Change |
|---|---|
| `docs/AUTOMATION.md` | New (delivered) |
| `docs/DATA_DICTIONARY.md` | `asset_sources.js` schema; `config.json` schema; incoming file naming; `state.json`; 5d/7d week |
| `docs/ARCHITECTURE.md` | Data-flow diagram: Task Scheduler → pipeline → push → Netlify; snapshot → alert Actions |
| `docs/CONTRIBUTING.md` | "Add an asset to the weekly download"; "Change an asset's data source"; synthetics recipe |
| `docs/ASSETS.md` | Source column |
| `docs/PLATFORM_ROADMAP.md` | Alerts done; MRCI phase-out plan (move assets to MT5-derived via overrides); free long-term sources to evaluate (Stooq, FRED, CFTC; check each one's licence); broker comparison; Deriv synthetics |
| `docs/CHANGELOG.md` | v1.29 |
| `scripts/README.md` | `telegram_digest.js`; the alert workflow |
| `backend/README.md`, `backend/HANDOVER.md` | "Weekly automated refresh" next to the manual steps; `--keep-trailing` |
| `README.md` (root) | One line under "What it does": weekly automated data refresh |
| Privacy / Terms / Risk | **No change**: the site collects nothing new, and the channel is off-site |

## 9. Checks before merging

- [ ] `python -m py_compile backend/automation/*.py`, then `node --check scripts/telegram_digest.js`.
- [ ] Branch guard (`REVIEW_2026-11-04.md`): `weekly_run.py --dry-run` from a non-main branch stops.
- [ ] `node scripts/telegram_digest.js --date 2026-10-19` matches `sample_digest.txt`, apart from
      differences caused by data changes since.
- [ ] Every live asset resolves to a source (`kptSourceOf`): 70 MRCI, 27 MRCI-derived, 1 MT5 · TW.
- [ ] `concat_raw_csv.py` without the flag gives an identical result to before on a sample pair.
      With the flag, the last date is kept.
- [ ] Graded rows are unchanged for all `5d` assets. BTCUSD is re-graded on 7-day weeks.
- [ ] **On the laptop (owner):** `weekly_run.py --dry-run`, then `--no-push`. Review the commit,
      register the task with `-RunNow`, check the log and the Netlify deploy.
- [ ] **Telegram:** manual dry run in Actions, then a real send. Check the formatting in the
      channel.
- [ ] Docs updated per §8. One PR for automation + alert, a separate PR for site labels + grader.

## 10. Owner tasks (not code)

- Create the bot and private channel, add the two GitHub secrets, pin the description
  (`docs/AUTOMATION.md` → Telegram).
- Install the Deriv MT5 app when ready. Set its path in `config.json` and enable it.
- Choose the Track Record option; decide on broker comparison timing.
- **Open item:** Moore Research Center redistribution. Alerts carry MRCI-derived signals to
  a private audience. Moving assets to MT5-derived sources reduces this over time.
