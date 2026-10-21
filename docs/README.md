# Documentation Index

Project documentation for **KPT Seasonals** (Kaminari Precision Trading's Seasonal Confluence
Engine). For a short overview of the project, see the [root README](../README.md).

**Current version:** v1.27 (October 2026). 98 asset pages with 7 tabs each, Market Profiling for 14
assets, and site-wide This Week, Heatmap and Track Record pages. Since v1.27 the project is a single
repo: `frontend/` (the published site), `backend/` (the Python pipeline, formerly the separate
`KPT-Market-Profiling` repo), `scripts/` and `docs/`.

**Paths in these docs:** site files (`js/`, `css/`, `data/`, `assets/`, the `.html` pages) live in
`frontend/`. Pipeline files (`pipeline/`, `output/`, `data/raw/`, `data/clean/`) live in
`backend/`. Commands run from the repo root unless a doc says "from `backend/`".

---

## Documents

| File | Purpose |
|------|---------|
| [USER_GUIDE.md](USER_GUIDE.md) | Using the site: every page and tab, the step-by-step trade-idea workflow, CSV upload, AI setup, printing. |
| [ASSETS.md](ASSETS.md) | Every market on the site: data source, timeframes, key seasonal finding; which assets have Profiling data. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical reference: repo layout, routes, shared modules, each tab's code, data flow, security headers, build status. |
| [DATA_DICTIONARY.md](DATA_DICTIONARY.md) | Schemas: ASSET_CONFIG, MONTHS[], signal vocabulary and mapping, generated data files, storage keys. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Checklists: adding futures/forex/profiling/derived assets, updating data, changing shared JS, adding tabs. |
| [CHANGELOG.md](CHANGELOG.md) | Full version history: what was built, when, and why. |
| [PLATFORM_ROADMAP.md](PLATFORM_ROADMAP.md) | Current plan and status for platform work since v1.7. |
| [ROADMAP.md](ROADMAP.md) | Original phase roadmap (Phases 1–9). Still the home for un-started Phases 6B–9; `PLATFORM_ROADMAP.md` supersedes it for everything since v1.7. |
| [MARKET_PROFILING_INTEGRATION.md](MARKET_PROFILING_INTEGRATION.md) | Design and build record for the Profiling tab (v1.7). |
| [SKILL.md](SKILL.md) | How to recreate an asset dashboard from scratch with Claude. |
| [PROMPTS.md](PROMPTS.md) | Copy-paste prompt library for the key Claude interactions. |
| [../scripts/README.md](../scripts/README.md) | Every Node script: purpose, run command, status. |
| [../backend/README.md](../backend/README.md) | The data pipeline: setup, refreshing an asset, outputs. |
| [../backend/HANDOVER.md](../backend/HANDOVER.md) | Pipeline handover notes and design decisions. |
| [../backend/market-profiling-system-spec.md](../backend/market-profiling-system-spec.md) | Market profiling spec (profile taxonomy, statistics). |
| [specs/](specs/) | Build briefs and approved mockups (e.g. the October 2026 site expansion). |

**Recommended Claude project files** (load these at the start of a new session):
`docs/README.md` (this file), `ARCHITECTURE.md`, `CHANGELOG.md`, `SKILL.md`, `PLATFORM_ROADMAP.md`.

---

## Project Facts

- **Project start:** April 2026
- **Operator:** a free, non-commercial personal project created and run by **G T**, publishing as
  **Kaminari Precision Trading**; not a company or registered business. The name lives in one
  constant (`KPT_SITE.OPERATOR_NAME` in `js/site.js`). Contact: kaminariprecisiontrading@gmail.com.
  Governing law: Botswana (Data Protection Act, 2024 · IDPC).
- **Repository:** [`kaminariprecisiontrading/seasonal-dashboard`](https://github.com/kaminariprecisiontrading/seasonal-dashboard) (public)
- **Hosting:** Netlify, https://kpt-seasonals.netlify.app/. Free tier; auto-deploys `main` on
  push and publishes only `frontend/` (`netlify.toml` → `[build] publish`).
- **Data sources:** Moore Research Center seasonal charts (futures), derived synthesis (forex), MT5 M1
  history from TradersWay via the `backend/` pipeline (Profiling tab, BTCUSD seasonals, Range Outlook,
  Track Record).
- **Legal pages:** `/risk`, `/terms`, `/privacy`, `/sources`, `/about` (v1.19), plain-language drafts
  for a free personal project, not legal advice. **Open item (owner):** Moore Research Center
  redistribution permission. The pages credit MRCI but don't grant any rights.
- **Scope boundary:** no annotated chart interpretation (Elliott waves, Fibonacci, market structure).
  The tool provides objective data confluence; the trader applies their own execution framework.

---

## Tools & Environment

- **Local preview:** `node scripts/serve_local.js` → http://localhost:8888/. Serves `frontend/` with
  `netlify.toml`'s routes and headers, so `/dashboard` and the other clean routes work. Plain static
  servers (VS Code Live Server, `python -m http.server`) and `file://` don't apply them.
- **Pipeline:** Python 3.13 with two venvs in `backend/`: `.venv` (pandas, numpy, scipy) for the main
  pipeline and `.venv-forecast` (TimesFM 2.5 + PyTorch) for range forecasts. Setup in
  [backend/README.md](../backend/README.md).
- **In-dashboard AI** (the user's own key): Anthropic API (Claude Sonnet 5), OpenAI Responses API
  (ChatGPT, `gpt-6-astra` by default, editable), Google AI Studio (Gemini Flash), or a local Ollama
  model (start it with `set OLLAMA_ORIGINS=* && ollama serve` for browser CORS; `start_kpt.bat`
  automates this).
- **Automation:** one GitHub Action, `.github/workflows/weekly-signal-snapshot.yml`, snapshots the
  week's signals every Monday for the Track Record and commits to `main` without a Netlify deploy
  (details: `CONTRIBUTING.md` → Weekly Signal Snapshot).
- **Building:** Claude (claude.ai / Claude Code) for design, analysis and code; VS Code; Git + GitHub.

| Context | Tool | Best used for |
|---------|------|---------------|
| Design & planning | Claude | New asset analysis, architectural decisions, doc updates |
| Market data pipeline | `backend/` (Python) | Cleans MT5 M1 exports, computes all Profiling statistics, forecasts, track record |
| Dashboard AI (cloud) | Claude / ChatGPT / Gemini APIs | Weekly analysis with a structured verdict |
| Dashboard AI (local) | Ollama | Offline analysis, no API costs |
