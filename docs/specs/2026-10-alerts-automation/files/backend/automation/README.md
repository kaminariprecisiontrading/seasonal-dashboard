# backend/automation/ — weekly data refresh

Runs every Sunday on the owner's Windows laptop via Task Scheduler:
**MT5 download → merge → refresh → sync → grade → commit + push** (Netlify then deploys).
Full runbook: [docs/AUTOMATION.md](../../docs/AUTOMATION.md).

| File | Purpose |
|---|---|
| `config.json` | Terminals, assets (key → broker symbol, 5d/7d week), schedule-independent settings. No secrets. |
| `mt5_download.py` | Pulls new M1 bars per asset, checks them against the existing file, writes `data/raw/incoming/*.csv` |
| `weekly_run.py` | The whole weekly chain, with logs, a lock, retry of failed refreshes and pushes |
| `setup_task.ps1` | Registers / removes the Task Scheduler task |
| `requirements-automation.txt` | `MetaTrader5` package (install into `backend/.venv`) |
| `.env.example` | Optional Telegram DM settings → copy to `.env` (gitignored) |

Local-only (gitignored): `logs/`, `state.json`, `.lock`, `.env`, `../data/raw/incoming/`.
