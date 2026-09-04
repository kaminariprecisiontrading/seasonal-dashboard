# MARKET_PROFILING_INTEGRATION.md — Plan for merging in the Market Profiling dashboard

**Status (v1.7):** §1–§7 implemented and merged to `main`, live on Netlify — see the checklist in
§8 for what's done. This doc remains the source of truth for the feature's design; §9 below
captures the roadmap agreed immediately after merge (all-asset rollout, the prediction-accuracy
loop). For the fuller platform-wide plan agreed after live review — including what §9.3 used to
scope as "statistically re-deriving Seasonals," now folded into a larger multi-timeframe Profile
idea — see **`docs/PLATFORM_ROADMAP.md`**, the current source of truth for everything beyond this
merge.

**Source project:** `KPT-Market-Profiling` (sibling repo, `../KPT-Market-Profiling`) — a statistical
market-profiling system for GBPUSD/EURUSD spot FX (percentile range distributions, time-of-extreme
clustering, a rule-based daily "profile" taxonomy, a date calendar, and profile detail pages with
real illustrative charts). Read `KPT-Market-Profiling/HANDOVER.md` and
`KPT-Market-Profiling/market-profiling-system-spec.md` for full background on how that data was
built and why — this doc only covers the *integration*, not the underlying methodology.

---

## 1. Why this merge, and the intended relationship

This dashboard (Seasonals) gives the top-level, macro/monthly-bias view. Market Profiling gives the
zoomed-in daily/weekly/timing view. The intended workflow: a trader reads a page's Seasonals tab for
the month's structural bias, then reads the new Profiling tab for "when in the day/week does it
actually tend to move, and how big."

**Repo roles going forward:**
- `KPT-Market-Profiling` becomes a pure **data-pipeline** repo — the Python scripts (`clean_mt5_csv.py`,
  `stats_engine.py`, `profile_taxonomy.py`, and the `export_*.py` scripts) stay there, and it remains a
  fast local testbed for pipeline/taxonomy changes without any risk to this live, auto-deploying site.
  Its own standalone `dashboard/` there is not the deliverable going forward — this repo is.
- `seasonal-dashboard` (this repo) becomes the **one deployed product**. It gains an 8th tab
  ("Profiling") wherever Market Profiling data exists for that asset.
- **Ongoing sync, not a one-time port:** whenever the pipeline is extended (new asset, taxonomy
  change), there needs to be a repeatable step that regenerates this repo's `data/profiling/*` files
  from KPT-Market-Profiling's pipeline output — not manual copy-paste. Write this as an actual script
  once the initial port is done (mirror the pattern of `scripts/gen_signals_manifest.js`).

---

## 2. Page placement (decided)

**Both the futures page and the FX pair page get the Profiling tab, for any asset where related data
exists** — not just the FX page. E.g. GBPUSD Market Profiling data appears on **both** `gbp.html`
(GBP futures) **and** `fx-gbpusd.html` (GBPUSD spot FX), pointing at the same underlying data.

Reasoning: the Price tab (TradingView) can't show live futures data on the free tier, so futures
pages are otherwise light on real price-action grounding — having real spot-FX-derived Profiling
stats there too (even though the underlying instrument technically differs, GBP futures vs. GBPUSD
spot) gives those pages something concrete. This is a **general principle for future assets** too:
whenever Market Profiling data exists for an asset, add the tab to every page that displays related
data for that currency/instrument, not just the most technically "correct" single page.

**v1 rollout scope:** `gbp.html`, `fx-gbpusd.html`, `eur.html`, `fx-eurusd.html` (4 pages, 2
underlying datasets — GBPUSD and EURUSD, matching what KPT-Market-Profiling has built so far).

---

## 3. Mechanism: the new "Profiling" tab

This repo's tab system (`js/ui.js`) already supports exactly this — tabs are a hardcoded array, and
each tab **only renders on pages that have its markup**:

```js
tabs = tabs.filter(t => scope.querySelector('[data-kpt-panel="' + t.id + '"]'));
```

So a tab that only appears on 4 of 97 pages is the *normal* way this system is extended, not a
workaround. Steps (per this repo's own `CONTRIBUTING.md` → "Adding a New Tab / Feature"):

1. Add `{ id: 'profiling', label: 'Profiling' }` to the `tabs` array in `js/ui.js` (shared file — see
   §6 on testing before this ships).
2. Add `<div data-kpt-panel="profiling">...</div>` panel markup to the 4 pages in scope (§2).
3. Write `js/profiling.js` — a new, self-contained IIFE module (matching the existing pattern of
   `macro.js`/`tradingview.js`), injecting its rendered content into the panel div. Ported from
   KPT-Market-Profiling's `dashboard/js/charts.js` + `dashboard.js` + `tooltip.js` + `glossary.js` +
   `profile-meta.js` — **ported and adapted, not copy-pasted verbatim**: those files were written
   for a page that owns its whole `<body>`; here they need to render into one panel `<div>` alongside
   six other tabs' content.
4. Follow this repo's own patch-script convention (`CONTRIBUTING.md` step 4) to insert the new
   `<script src="js/profiling.js">` tag before `ui.js` — but **only in the 4 pages in scope**, not
   all 97 (unlike the existing 9 shared scripts, which every page currently loads, this one has
   nothing to do on the other 93 pages since they have no Profiling data yet).
5. Update `ARCHITECTURE.md`'s load-order table and `CHANGELOG.md` per this repo's existing convention.

---

## 4. Data model and porting

KPT-Market-Profiling's dashboard data files (`dashboard/data/gbpusd.js`, `profile-examples/gbpusd.js`,
`calendar/gbpusd/*.js`) use asset keys like `GBPUSD`/`gbpusd` — **different from this repo's own id
scheme** (`fx-gbpusd` for the pair, `gbp`/`usd` for the underlying futures legs). To avoid any
collision with this repo's existing `data/{id}.js` convention:

- Put ported data in its own subfolder: `data/profiling/gbpusd.js`, `data/profiling/eurusd.js`,
  `data/profiling/profile-examples/`, `data/profiling/calendar/gbpusd/`, `data/profiling/calendar/eurusd/`.
- Keep the same internal JS-global/`window`-namespacing choices KPT-Market-Profiling already made
  (see its spec §5.3/§5.2 for **why**: a top-level `const X` in a classic `<script>` is a lexical
  binding, not a `window` property, so anything looked up by a runtime-constructed name — like the
  calendar's per-year files — must assign onto a namespaced `window` object instead). Don't
  rediscover this the hard way a third time.

---

## 5. CSS — namespace everything new

KPT-Market-Profiling's `dashboard/css/dashboard.css` was seeded from an early, much smaller snapshot
of this repo's own tokens (~11KB at the time). This repo's `css/dashboard.css` is now 65KB and has
grown its own extensive conventions since (tab bar, backtest heatmaps, intraday tables, macro
calendar iframe, AI panel, etc.). **Do not blindly copy classes over.**

- Reuse the existing `:root` CSS variables (`--bg`, `--surface`, `--border`, `--bull`, `--bear`, etc.)
  directly — those should already match or be trivially reconcilable.
- Prefix every **new** class the Profiling tab introduces (range strips, time-of-extreme heatmap,
  profile cards, calendar grid, etc.) with `.kptp-` (Kaminari Profiling), mirroring this repo's own
  `.kpt-` prefix already used for `.kpt-tabs`/`.kpt-tab-btn`/`data-kpt-panel`. This guarantees zero
  collision risk in a file shared by 97 pages — audit for existing class names before introducing
  each one regardless.

---

## 6. Testing (this repo's own bar, from `CONTRIBUTING.md`)

`js/ui.js` is loaded by all 97 pages — a mistake here has site-wide blast radius even though the
Profiling panel itself only exists on 4 pages. Before merging to `main` (which auto-deploys via
Netlify on push):

- Do the work on a branch, not directly on `main`.
- Test all 4 in-scope pages (`gbp.html`, `fx-gbpusd.html`, `eur.html`, `fx-eurusd.html`).
- Test at least 3 **out-of-scope** asset pages (a futures currency, a metal, a forex pair without
  Profiling data) to confirm the shared `ui.js` change didn't break tab switching elsewhere.
- Check the browser console on each for errors.
- Verify existing localStorage-persisted state (backtest results, intraday stats) still loads
  correctly after a reload on pages that have those tabs.
- Use Live Server (or equivalent `http://` context) — this repo's own convention is not to rely on
  `file://` opens (unlike KPT-Market-Profiling's dashboard, which was deliberately built file://-safe).

---

## 7. Things this integration deliberately does NOT do (v1)

- **Does not try to unify or replace the History/Sessions tabs.** Those are ad-hoc, client-side,
  upload-a-fresh-CSV-each-time analyses tied to validating the *seasonal* thesis specifically.
  Profiling is permanent, pre-computed, and considerably deeper. They're complementary, not
  redundant — leave both in place.
- **Does not turn Calendar or the profile detail pages into tab sub-panels.** They stay their own
  linked pages/sections (e.g. `profiling-calendar/`, `profiling-profiles/` at this repo's root,
  mirroring how `assets/` works today), reached via a "View full calendar →" / "See profile details →"
  link inside the Profiling tab panel. Retrofitting the existing sub-tab mechanism (the TF selector
  inside the Seasonals tab) for this is a bigger lift than this pass needs.
- **Does not roll out to any asset beyond GBP/GBPUSD and EUR/EURUSD** — KPT-Market-Profiling's
  pipeline hasn't been run for anything else yet.
- **Does not write its own footer attribution by copying this repo's Moore Research Center line** —
  the Profiling tab's data source is a TradersWay MT5 export, not Moore Research seasonal charts.
  Needs its own correct sourcing text.

---

## 8. Implementation checklist (for the session that builds this)

- [x] Confirm KPT-Market-Profiling's pipeline output for GBPUSD/EURUSD is current (re-run if stale).
      — Shipped with the pipeline's existing 2019-vintage output by explicit user decision (de-risks
      the plumbing work from data availability); refresh via the sync script once fresher CSVs are
      uploaded and re-piped. Not blocking.
- [x] Audit `css/dashboard.css` for existing class names before choosing final `.kptp-*` names.
      — Found real collisions (`.panel`, `.section-label`, `.header`, `.sub`, `.divider`, `.footnote`,
      `.dial`, `.mode-note` all pre-existed with unrelated meaning); confirmed the 11 base tokens
      (`--bg`/`--surface`/etc.) are byte-for-byte identical and safe to reuse directly.
- [x] Port data: `data/profiling/gbpusd.js`, `eurusd.js`, `profile-examples/`, `calendar/`.
      — Via `scripts/sync_profiling_data.js` (not a manual one-off copy — see the new §9.1 note below).
- [x] Write `js/profiling.js` (ported/adapted rendering logic, panel-scoped, `.kptp-` classed).
      — Split into `js/profiling.js` (panel injection + rendering) and `js/profiling-charts.js`
      (page-independent shared library: tooltip, SVG chart primitives, glossary, profile metadata).
- [x] Add `{id:'profiling', label:'Profiling'}` to `js/ui.js`'s `tabs` array.
- [x] Add `data-kpt-panel="profiling"` markup to `gbp.html`, `fx-gbpusd.html`, `eur.html`, `fx-eurusd.html`.
      — Panel self-injects via JS (same pattern as `macro.js`) rather than static HTML markup — no
      HTML changes needed beyond the script tags below.
- [x] Patch those 4 pages' `<script>` tags to load `js/profiling.js`.
      — 4 tags each: `data/profiling/manifest.js`, `data/profiling/{gbpusd|eurusd}.js`,
      `js/profiling-charts.js`, `js/profiling.js`, all before `ui.js`.
- [x] Build `profiling-calendar/` and `profiling-profiles/` sections, linked from the tab panel.
      — `profiling-calendar/index.html` merges the source's per-asset and cross-asset home views into
      one mode-detecting controller (`?a=` param present or not); `profiling-profiles/detail.html`
      is the templated `?p=<slug>&a=<assetkey>` profile page.
- [x] Write correct attribution/footnote text for Profiling content.
      — Credits the TradersWay MT5 export, not the Moore Research Seasonals line.
- [x] Test per §6, on a branch, before merging to `main`.
      — Automated via a headless-Edge Playwright check (no `chromium-cli` available in this
      environment): all 4 in-scope pages render the Profiling tab correctly with a clean console;
      3 out-of-scope pages (`aud.html`, `xau.html`, `fx-audusd.html`) correctly show no Profiling tab;
      calendar + profile-detail pages render and are interactive; `kpt-sub-{id}` localStorage
      persistence confirmed unaffected by the `ui.js` change. Still merge only after your own review.
- [x] Update `ARCHITECTURE.md`, `CONTRIBUTING.md`, `CHANGELOG.md` per this repo's usual doc discipline.
- [x] Write the ongoing sync script (KPT-Market-Profiling pipeline output → this repo's `data/profiling/`).
      — `scripts/sync_profiling_data.js`, parameterized by an `ASSETS` list from the start so adding
      asset #3 is a one-line addition + re-run, not new code (see §9.2).

---

## 9. Roadmap beyond v1 (agreed after this pass shipped, not yet built)

The v1 scope above (§1–§8) is deliberately GBP/EUR-only. The actual intended trajectory is larger —
captured here so it isn't lost, and so a future session doesn't have to re-derive it.

### 9.1 Data freshness — periodic re-sync, not a one-time port

The current data is 2019-vintage (matching KPT-Market-Profiling's pipeline output at merge time).
The user will download fresh MT5 CSVs (2000 → present, and rolling forward) and re-run that repo's
pipeline periodically. Refreshing this repo is then just: re-run the pipeline in
`KPT-Market-Profiling`, then `node scripts/sync_profiling_data.js` from `seasonal-dashboard/` root.
No other step should be required — if one ever is, that's a bug in the sync script, not an expected
manual step.

### 9.2 All assets, eventually — scope intentionally left open

Profiling should not stay GBP/EUR-only. The user will upload and clean MT5 CSVs per asset over
time; which pages should show a given asset's Profiling data is decided per-asset when that data
actually exists (using the same reasoning as §2 above — any page displaying related data for that
currency/instrument, not just the most technically "correct" one), not pre-committed to a boundary
now. In particular, whether Profiling ever extends beyond FX spot pairs to futures-direct instruments
(gold, indices, rates, grains, etc.) is an open question — MT5 data naturally maps to FX spot pairs,
so that's the easy/default path, but nothing here forecloses futures-direct data if/when it exists.
Mechanics for adding an asset: `docs/CONTRIBUTING.md` → "Adding a New Profiling Asset".

**Update (2026-09-04) — Phase B shipped:** 11 more assets wired in via the mechanics above,
following the KPT-Market-Profiling repo's full-history TradersWay redownload (see that repo's
HANDOVER.md §5): AUDUSD, NZDUSD, USDCAD, USDCHF, USDJPY (`aud`/`fx-audusd`, `nzd`/`fx-nzdusd`,
`cad`/`fx-usdcad`, `chf`/`fx-usdchf`, `jpy`/`fx-usdjpy` — same futures+FX-pair page pattern as
GBP/EUR), plus the first futures-direct instruments answering the "open question" above: XAUUSD
(`xau`), Brent crude (`brent`), WTI crude (`cl`), S&P 500 (`sp500`), Nasdaq 100 (`nq`), and DJIA
(`ym`) — each a single page, no FX-pair counterpart, since none of these have one. 13 assets, 16
pages total. `js/profiling.js`'s `ASSET_MAP` and `js/profiling-calendar.js`'s `ASSET_PAGES` both
needed a page-id → asset-key translation for the futures-direct instruments, since the page
filename (e.g. `cl`, the CME/NYMEX ticker) doesn't match the pipeline's asset key (`wti`) —
`sp500`→`us500`, `nq`→`ustech`, `ym`→`us30` similarly. Verified console-clean on all 16 pages via
headless-browser check.

**Known follow-up, not yet fixed:** stat-tile copy hardcodes the unit as "pips" throughout
(`js/profiling.js`/`js/profiling-charts.js`) — reads fine for the FX pairs and passably for
gold/oil, but odd for the three index instruments (e.g. "ADR 20: 427.8 pips" on the DJIA page,
where "points" is the natural term). No `unit`/pip-size field is threaded through the pipeline's
JSON output today, so fixing this needs either a small pipeline addition (stats_engine.py emitting
a `unit_label`) or a dashboard-side per-asset lookup table. Not blocking — purely a wording nit —
but worth fixing before these pages get real visibility.

A **BTCUSD** raw export was also cleaned in KPT-Market-Profiling this session but deliberately
**not** wired in here — no existing seasonal-dashboard page covers crypto, and the plan is a
dedicated Cryptos category (`docs/PLATFORM_ROADMAP.md` Tier 6: synthetics/crypto/Deriv) rather than
bolting it onto an ad hoc page. Revisit once that category is designed.

### 9.3 Statistically-derived Seasonals data — superseded, see `docs/PLATFORM_ROADMAP.md`

**Update (2026-09-04):** this section originally scoped "statistically re-deriving Seasonals" as
its own separate effort. After the Profiling merge shipped and was reviewed, that idea was folded
into a larger one — multi-timeframe Profiles (Daily → Weekly → Monthly → Yearly), where the
Yearly Profile *is* the statistical re-derivation of Seasonals, not a parallel workstream. Full
current plan, including the sample-size/methodology concerns at yearly granularity and the
recommended additive-cross-check-first sequencing (still the right approach, now under this
merged framing): `docs/PLATFORM_ROADMAP.md` → **Tier 5**. Kept here only as a pointer so this
section isn't read as a still-current, separate plan.

### 9.4 Live feed + prediction accuracy tracking (already spec'd elsewhere, unchanged)

Already covered by `KPT-Market-Profiling/market-profiling-system-spec.md` §6 (log a predicted
profile/range before the outcome is known, score it against the next real CSV update) and §9's
phase order there (gated on a live data feed, Phase 4, before accuracy tracking, Phase 5). Nothing
new to design here — noted so it stays on record alongside the rest of this roadmap. This is the
"ML capability" the user has in mind: not a new model to build now, but the feedback loop that would
eventually let both Profiling's daily predictions and (per §9.3.3) Seasonals' weekly bias improve
against their own real track record over time.
