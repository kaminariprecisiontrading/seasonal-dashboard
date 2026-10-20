# Legal & Trust Pages — Build Brief for Claude Code

**Repo:** `kaminariprecisiontrading/seasonal-dashboard` · **Host:** Netlify
**Order:** build after the landing page (`LANDING_PAGE_BUILD_NOTES.md`). This can run in parallel with `NEW_PAGES_BUILD_NOTES.md`, because it only touches the shared footer, nav and CSS.

**Design references** (attach all of them):

| File | Page | Route |
|---|---|---|
| `risk.html` | Risk Disclosure | `/risk` |
| `terms.html` | Terms of Use | `/terms` |
| `privacy.html` | Privacy Policy | `/privacy` |
| `sources.html` | Data Sources & Attribution | `/sources` |
| `about.html` | About & Contact | `/about` |
| `legalui.html` | UI patterns: click-to-load embeds, AI key settings, disclaimer placements, footer | (components only) |

**The page text in the mockups is approved — copy it word for word.** Change it only where these notes say so, and list any wording changes in the PR description.

---

## 0. Fixed facts (use exactly)

| Item | Value |
|---|---|
| Site name | Kaminari Seasonals Dashboard |
| Operator line | "a free, non-commercial personal project created and run by **G T**, who publishes under the name **Kaminari Precision Trading**. It is not a company or registered business." |
| Name placeholder | `G T`. Put it in **one** constant/partial (e.g. `OPERATOR_NAME`) so it can be changed in one place later |
| Contact | `kaminariprecisiontrading@gmail.com` |
| Minimum age | 18+ |
| Law | Botswana · Data Protection Act, 2024 · Information and Data Protection Commission (IDPC) |
| Regulator named in Risk | NBFIRA ("not licensed … by NBFIRA, the Bank of Botswana, or any other financial regulator") |
| Last updated | Date the pages ship (mockups say 20 October 2026) |
| Never write | "Ltd", "Pty", "company", "we are registered", "trading as" |

## 1. Pages and layout

1. Add a Netlify 200 rewrite for each route, at root-level files (`risk.html`, `terms.html`, etc.), matching how `/dashboard` is done.
2. Use **one shared legal layout**, as in the mockups:
   - eyebrow label "LEGAL"
   - H1
   - "Last updated" line
   - lead paragraph
   - a left "On this page" table of contents linking to numbered `h2` anchors (it must stack above the content at phone width, and must not be sticky or `100vh`)
   - an article column around 780px max width
3. The in-page anchor link targets get `scroll-margin-top`.
4. The pages use the shared nav and footer from the other briefs. Styles go in `css/site.css` (prose styles under a `.legal` scope), with no inline-style copies.
5. Include a print stylesheet for legal pages: hide the nav, footer and table of contents; dark text on white.
6. **Privacy §8 fonts sentence.** If fonts are self-hosted (§4 below), keep "Fonts are served from this site." Otherwise use the alternative sentence shown in amber in the mockup, and remove the amber note either way.
7. **Privacy §3 storage table.** It must match the real keys:
   - Before writing it, grep the code for every `localStorage` / `sessionStorage` key and reconcile the table with what you find.
   - Fix `docs/DATA_DICTIONARY.md`, which documents `kpt-subtab-{id}`, while the code (`js/ui.js`) uses `kpt-sub-{id}`. Update the docs, not the code.
   - Add `kpt-embeds`, plus `kpt-watchlist` if the This Week brief has shipped.
8. **Sources table.**
   - Confirm the Chart.js and marked versions and licences from the actual script URLs.
   - Confirm every font family actually loaded. The asset pages use IBM Plex Mono; the landing page uses JetBrains Mono and Barlow.

## 2. Site-wide footer (pattern D)

On **every** page: landing, dashboard, all 98 asset pages, the new pages and the legal pages.

- Legal links: Risk Disclosure · Terms · Privacy · Data Sources · About & Contact.
- The disclaimer line and the dual attribution. Keep the existing inline-styled attribution `<span>` convention from the README.
- An **Embeds** setting (`Ask each time` / `Always load`) bound to `kpt-embeds`.
- Implement it once as a shared include; update the asset pages with a script, not by hand.

## 3. Click-to-load embeds (pattern A)

Applies to the TradingView widget (Live Price tab) and the Investing.com calendar (Macro tab).

- **No third-party embed request may happen until the user loads it.** That means no `<script src>` or `<iframe src>` from those domains in the initial HTML. Inject them only on load.
- If `kpt-embeds === "always"`, load the embed as soon as its tab is opened. That's also an improvement on today: nothing loads for tabs that are never opened.
- Otherwise show the placeholder:
  - icon and title
  - "loaded from tradingview.com, which may set its own cookies" + Privacy link
  - a **Load chart** button
  - an "Always load embeds on this device" checkbox
- Loading the embed in one tab doesn't load the others (unless "always" is set).
- The footer setting and the checkbox stay in sync.
- Wrap all storage access in try/catch. If storage is blocked, behave as "Ask each time".
- Keep the existing `tvSymbol` override working.
- **Acceptance:** with a fresh profile, the Network panel shows zero requests to `tradingview.com` or `investing.com` until a load button is clicked.

## 4. Self-host fonts (recommended)

- Download the woff2 files for every family in use (Bebas Neue, IBM Plex Mono, JetBrains Mono, Barlow), with only the weights actually used.
- Put them in `assets/fonts/` with `@font-face` rules and `font-display: swap`.
- Remove all `fonts.googleapis.com` / `fonts.gstatic.com` references.
- Include each font's OFL licence text in `assets/fonts/`.
- If this is skipped, say so in the PR, keep the Google Fonts sentence in Privacy §8, and allow those domains in the CSP.

## 5. AI key hardening (pattern B), in `js/api.js`

| Requirement | Detail |
|---|---|
| Storage choice | Radio buttons: **This session only** (default → `sessionStorage`) / **Remember on this device** (→ `localStorage`). Remember the choice itself in `kpt-cfg-keep`. Reads check session first, then local |
| Migration | Existing users already have keys in `localStorage`. Treat them as "remember" so nothing breaks, and show the radio set to Remember |
| Clear all keys | Removes `kpt-cfg-claude-key` and `kpt-cfg-gemini-key` from **both** storages, then confirms with an inline status message (no `alert()`) |
| Input | `type="password"`, `autocomplete="off"`, `spellcheck="false"`. Once saved, show the key masked, e.g. `sk-ant-…a1F9`, never in full |
| No leaks | Grep to confirm keys never appear in `console.*`, error messages, the AI cache (`kpt-ai-*`), the downloaded `.md` file, or URLs |
| Notices | "Sent only to {provider}, directly from your browser" + spending-limit tip. Ollama shows the "nothing leaves your computer" note |
| Settings note | Replace the existing "Keys stored in browser localStorage · never sent to this server" text with the new wording |

## 6. Security headers (`netlify.toml`)

Add for all paths. Start with `Content-Security-Policy-Report-Only`, test every tab, then switch to enforcing:

```
default-src 'self';
script-src 'self' https://cdnjs.cloudflare.com https://s3.tradingview.com;
style-src 'self' 'unsafe-inline';
font-src 'self';
img-src 'self' data: https:;
frame-src https://*.tradingview.com https://*.investing.com;
connect-src 'self' https://api.anthropic.com https://generativelanguage.googleapis.com http://localhost:11434 http://127.0.0.1:11434;
base-uri 'self'; form-action 'self'; object-src 'none'
```

Also add:
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Notes:
- **Inline scripts:** the asset pages likely use inline `<script>` blocks and `ASSET_CONFIG` inline. Before adding `'unsafe-inline'` to `script-src`, list them in the PR. Prefer moving them to files or using hashes. If that's too big for this PR, allow `'unsafe-inline'` temporarily and open a follow-up issue.
- **Ollama URL:** a user-configured Ollama URL that isn't localhost will be blocked. Document that in `USER_GUIDE.md`.
- **Embed domains:** verify the exact TradingView and Investing.com domains each embed needs, and adjust the policy.

## 7. Disclaimer placements (pattern C)

| Where | Text (from mockup) |
|---|---|
| Analysis tab, above Run Analysis | "AI output can be wrong. The verdict is model output, not financial advice." + Risk link |
| AI result header and downloaded `.md` file | Add the same line at the top of the downloaded file |
| Upload tab, under the drop zone | "Processed in your browser. Your file is never uploaded." |
| Track Record, below the KPIs (when built) | Past performance / hypothetical / backfilled line |
| Landing hero, under the CTAs | "FREE · NO SIGN-UP · HISTORICAL PATTERNS ONLY · NOT FINANCIAL ADVICE" |
| Every page footer | Section 2 above |
| Methodology page | Link to Risk from the "What a seasonal signal is not" section |

## 8. Docs

- `README.md`: new routes, a legal pages section, and the operator line. Fix the "Private GitHub repo" wording if it's still there.
- `DATA_DICTIONARY.md`: the full storage key table, including `kpt-embeds`, `kpt-cfg-keep`, and the `kpt-sub-` fix.
- `docs/USER_GUIDE.md`: key storage options, Clear keys, the embeds setting, and the Ollama/CSP note.
- `CHANGELOG.md`: a new version entry.

## 9. Acceptance checklist

- [ ] All five routes work. The footer with legal links appears on every page, including all 98 asset pages.
- [ ] The words "Ltd", "Pty", "registered" and "company" appear nowhere, except "not a company or registered business".
- [ ] The operator name comes from one constant.
- [ ] With a fresh browser profile, no requests go to TradingView, Investing.com or Google Fonts before the user loads an embed.
- [ ] "Always load" persists, the footer setting syncs with it, and blocked storage degrades to "Ask each time".
- [ ] Session-only keys are gone after the tab closes. Clear removes keys from both storages. Existing remembered keys still work after the update.
- [ ] The CSP is enforcing, with no console CSP errors on landing, dashboard, one futures asset, one FX pair, BTC, and every tab including Live Price, Macro and Analysis (Claude, Gemini and Ollama).
- [ ] The Privacy storage table matches the keys found in the code.
- [ ] Legal pages print cleanly and work at 1440, 768 and 390px wide.
- [ ] One PR per section group (pages + footer · embeds + fonts · keys + CSP) on branches, not pushed straight to `main`.

## 10. Out of scope / not legal review

- Alerts (email/Telegram), cookie banners, accounts.
- These texts are plain-language drafts for a free personal project, not legal advice. Don't add or "strengthen" legal clauses beyond the approved text; flag suggestions in the PR instead.
- **Open item (owner):** Moore Research Center redistribution permission. These pages credit MRCI but don't grant rights.
