# Landing Page — Build Brief for Claude Code

**Repo:** `kaminariprecisiontrading/seasonal-dashboard` · **Host:** Netlify (`kpt-seasonals.netlify.app`)
**Design reference:** `landing-mockup.html` (attach it alongside this file). Treat it as the visual spec. Copy, layout, colours and type are approved.

Before starting, read `README.md`, `ARCHITECTURE.md`, `data/signals_manifest.js` and the current `index.html`. Reuse existing code and conventions wherever they exist.

---

## 1. Goal

Add a marketing/onboarding landing page at `/` that explains the project (purpose, features, how to use) before users enter the dashboard. Move the current index dashboard to `/dashboard`.

## 2. Decisions (locked)

| Topic | Decision |
|---|---|
| Routes | Landing = `/`, dashboard = `/dashboard` |
| Hero "This Week" panel | **Live** — pulls from `data/signals_manifest.js`, not hard-coded |
| Signal wording | BULL / BEAR / CHOP / FLIP descriptions in the mockup are approved as-is |
| Repo visibility | Repo is public. Update `README.md`, which still says "Private GitHub repo", and any other docs that say so |
| Accent | `#22c55e`, matching the existing dashboard green |

## 3. Routing changes

1. Rename the current `index.html` → `dashboard.html`. Don't move it into a subfolder: its relative paths (`assets/…`, `data/…`, `css/…`, `js/…`) must keep resolving from the root.
2. Create the new `index.html` from `landing-mockup.html`.
3. Add or extend `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/dashboard"
     to = "/dashboard.html"
     status = 200
   ```
   Also confirm `/dashboard/` (trailing slash) works, or redirect it with a 301 to `/dashboard`.

   Also stop the internal folders from being served publicly. Netlify publishes the repo root, which includes the specs and mockups in `docs/specs/`:
   ```toml
   [[redirects]]
     from = "/docs/*"
     to = "/404.html"
     status = 404
     force = true

   [[redirects]]
     from = "/scripts/*"
     to = "/404.html"
     status = 404
     force = true
   ```
   Add a simple styled `404.html`, using the shared nav and footer and a link back to `/`.
4. Find every link back to the index and point it at `/dashboard`. Check:
   - all 98 asset pages under `assets/` (back/home links, breadcrumbs)
   - shared JS/CSS that builds nav
   - profile-detail and compare pages
   - docs
5. Do the link updates with a script, not by hand. Report the count of files changed.
6. Update `README.md`, `ARCHITECTURE.md` and `docs/USER_GUIDE.md` for the new routes and the "index landing page" wording. The README currently calls the dashboard index the "landing page", so rename it to "dashboard index".

## 4. Live data in the landing page

Load `data/signals_manifest.js` on the landing page. **Reuse the dashboard's existing signal-derivation logic**, the code that maps `currentMonth`/`currentWeek` plus each asset's `com` string to BULL / BEAR / CHOP / FLIP / AVOID. Extract it into a shared module (e.g. `js/signals.js`) used by both pages. Don't duplicate it.

| Element | Data |
|---|---|
| Week label | `OCT WK3 · 2026`, computed from the system clock the same way the dashboard does |
| Tally chips | Count of BULL / BEAR / OTHER across all assets. OTHER = CHOP + FLIP + AVOID, same grouping as the dashboard filter |
| 3 signal cards | Default featured list: `EURUSD, USDCAD, GBPUSD`, as a config const at the top of the script. Show the name, component tags, signal pill and conviction dots, using the same conviction source as the dashboard cards |
| Hero stat "98 Assets live" | Count of manifest entries with live status. Exclude `PLANNED` crypto |
| Coverage counts (70 / 27 / 1 + 19 planned, and sub-categories) | Derive from the manifest or asset config if the category data is available there. Otherwise keep them static and add a `TODO` |
| Card click | Each card links to its asset page (`assets/fx-eurusd.html` etc.) |

**Fallback:** if the manifest fails to load, hide the tally and cards and show "Open the dashboard to see this week's signals". The page must never show `0 / 0 / 0`. Note that the live site's raw HTML currently renders `BULL 0 BEAR 0 OTHER 0` before JS runs, so render the panel only after the data resolves.

Keep the trend curve SVG static and keep its label "Illustrative trend curve · not a live asset".

## 5. Implementation notes

- Move the mockup's inline styles into a stylesheet (e.g. `css/landing.css`) with CSS custom properties:
  `--bg #0a0c0f`, `--surface #11141a`, `--surface-2 #0c0f13`, `--border #1f252e`, `--text #e8eaed`, `--muted #8b93a1`, `--body #b7bec9`, `--accent #22c55e`, `--bull #4ade80`, `--bear #f87171`, `--chop #fbbf24`.
- Fonts (Google Fonts): **Bebas Neue** for display, **JetBrains Mono** for labels and UI, **Barlow** for body. If the dashboard already loads different families, tell me before changing anything.
- Signal pill styles should match the dashboard's existing classes. Reuse them if they exist.
- Every CTA ("Open dashboard", "See this week's signals", "Enter the dashboard") → `/dashboard`.
- "Read the full user guide" → `https://github.com/kaminariprecisiontrading/seasonal-dashboard/blob/main/docs/USER_GUIDE.md`.
- Footer links: Dashboard → `/dashboard`; GitHub → the repo URL; Methodology → `/methodology`.
- Below those links, add the shared legal footer row (Risk · Terms · Privacy · Data Sources · About) and the **Embeds** setting, per `LEGAL_PAGES_BUILD_NOTES.md` §2. The footer text uses the operator line ("…a free personal project by G T, published as Kaminari Precision Trading"). If the legal pages aren't built yet, link to the routes anyway and build them next.
- Under the hero CTAs: "FREE · NO SIGN-UP · HISTORICAL PATTERNS ONLY · NOT FINANCIAL ADVICE", with the last part linking to `/risk`.
- Purpose section, "You keep the trigger" card: end it with a "Read the risk disclosure" link to `/risk`.
- Keep the dual attribution in the footer, as an inline-styled span per the README convention:
  - Moore Research Center © 2020
  - © 2026 Kaminari Precision Trading
- SEO/meta: `<title>`, meta description, and Open Graph title/description. Use a placeholder `og:image` path with a `TODO`.
- Responsive: the page must work at ≤600px, matching the v1.16 mobile tier. Nav links can collapse or wrap. The hero becomes a single column.
- Accessibility:
  - real `<a>`/`<button>` elements
  - `aria-label` on conviction-dot groups
  - decorative SVGs marked `aria-hidden`
  - text contrast ≥ 4.5:1
- No new build step or framework. Keep it static HTML/CSS/JS like the rest of the repo.

## 6. Acceptance checklist

- [ ] `/` shows the landing page and `/dashboard` shows the full dashboard with search, filters and all cards working.
- [ ] The hero week label, tally and 3 cards match what `/dashboard` shows for the same week.
- [ ] With the manifest blocked, the fallback message shows and there are no zeros.
- [ ] Every asset page's back/home link goes to `/dashboard`. Grep finds no remaining links to `index.html` except intentional ones.
- [ ] Layout is checked at 1440px, 768px and 390px widths.
- [ ] The README no longer says the repo is private, and the docs reflect the new routes.
- [ ] `CHANGELOG.md` has a new version entry (next after the current one) describing the landing page and the route change.
- [ ] Changes are committed on a branch with a PR, not pushed straight to `main`, since Netlify auto-deploys from `main`.

## 7. Out of scope

- Redesigning the dashboard itself.
- New signal logic.
- Making the trend curve live.
- Analytics or tracking.
