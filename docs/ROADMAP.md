# ROADMAP.md — Future Development Ideas

Organised by priority and effort. Items at the top are quick wins; items lower down are larger projects.

---

## Priority 1 — Quick Wins (Low Effort, High Impact)

### Increase AI Analysis Depth
**What:** Raise `max_tokens` from 1000 to 3000 in the API call  
**Why:** Current output is truncated — Claude runs out of tokens before completing all 4 sections  
**How:** In `aud_seasonal.html`, change `max_tokens: 1000` to `max_tokens: 3000`  
**Cost impact:** Triples output cost per press, still ~$0.05 per press — negligible  

### Style the AI Output
**What:** Instead of rendering plain text, parse Claude's response as markdown and apply CSS formatting  
**Why:** Currently the AI panel shows unformatted text. Headers, bold, and tables would make it much more readable  
**How:** Use a lightweight markdown parser (e.g. `marked.js` from cdnjs) and set `innerHTML` instead of `textContent`  

### Streaming Response
**What:** Show Claude's response appearing word-by-word as it generates  
**Why:** Currently there is a 5–10 second blank wait before text appears all at once. Streaming feels alive.  
**How:** Use the Anthropic streaming API (`stream: true`) and process `text_delta` events via `EventSource`  

### Dynamic SEASONAL_DATA Generation
**What:** Auto-generate the `SEASONAL_DATA` string from the `MONTHS[]` JavaScript array instead of hand-writing it  
**Why:** Currently the data is entered twice — once in `MONTHS[]` for the tables, and once as a text string for the API. They can drift out of sync.  
**How:** Write a `buildSeasonalPrompt()` function that iterates `MONTHS[]` and formats it as text  

---

## Priority 2 — Medium Effort, High Value

### Follow-Up Question Box
**What:** After the AI generates its analysis, show a text input where the user can ask follow-up questions  
**Why:** Enables interactive dialogue — "What if I want to hold the April short into June?" or "Rank the top 3 setups by risk/reward"  
**How:** Maintain a `conversationHistory[]` array, append user + assistant turns, send full history each time  

### Asset Selector / Multi-Asset Dashboard
**What:** A single HTML file that can switch between multiple assets (AUD, GBP, XAU, etc.)  
**Why:** Currently one file per asset — harder to navigate. A unified dashboard is cleaner.  
**How:** Store all assets in a master `ASSETS{}` object, render the correct asset on sidebar click  
**Note:** This is a significant refactor — consider doing it after 3–4 more individual assets are built  

### Playbook Integration Panel
**What:** A dedicated section showing the April trading playbook signals (Buy/Sell/Choppy) cross-referenced with the seasonal data  
**Why:** The playbook is the original trading plan. The seasonal data either confirms or challenges it. Showing them side-by-side adds value.  
**How:** Add a new table section: Playbook Signal | Seasonal Confirmation | Conviction | Notes  

### Conviction Score Bar
**What:** Replace the star rating (★★★★☆) with a visual horizontal progress bar  
**Why:** More scannable at a glance  
**How:** CSS `width` percentage on a coloured bar div  

### Month Quick-Jump
**What:** A row of month buttons (Jan Feb Mar Apr...) at the top of the combined table  
**Why:** Scrolling to find a specific month in a 12-row table is fine now, but will become slower as more assets are added  
**How:** `scrollIntoView()` on the target row + auto-open that month's accordion  

---

## Priority 3 — Larger Projects

### Master Playbook Dashboard
**What:** A top-level overview showing all assets side-by-side for a specific month (e.g. "April Overview: all assets, all signals")  
**Why:** The trading playbook covers ~15 assets. Seeing all of them on one screen for the current month is more operationally useful than navigating 15 individual files  
**How:** A separate `playbook.html` file that imports signal data from each asset and renders a grid  

### Metals-Specific Adjustments
**What:** Metals (XAU, XAG, Copper, Platinum, Palladium) have different seasonal characteristics than currencies and need slightly different table notes  
**Why:** Metals don't have the same "choppy all month" designations as CHF or MXN. The language needs to reflect commodity-specific patterns (supply cycles, industrial demand, etc.)  
**How:** Flag metals assets in data and conditionally render additional context rows  

### Long-Hold Trade Tracker
**What:** A dedicated panel for multi-month hold trades (MXN sell Apr → Dec, BRL sell Apr → mid-May)  
**Why:** These are not intra-month trades — they need to be tracked differently. Easy to forget the exit timing.  
**How:** A "Live Positions" panel with entry month, expected hold duration, exit target, and a visual timeline bar  

### Print / Export to PDF
**What:** A "Print / Save PDF" button that renders the dashboard cleanly for printing or saving  
**Why:** Useful for offline reference during trading sessions  
**How:** CSS `@media print` styles to hide the AI panel and buttons, show clean tables only  

### Notes / Annotation Layer
**What:** Allow the user to add personal notes to any week cell — saved to localStorage  
**Why:** Enables real-time annotation as trades develop ("Entered short Apr Wk2 @ 0.6420")  
**How:** Click-to-edit on week cells, save to `localStorage` keyed by asset + month + week  

---

## Priority 4 — Advanced / Future

### Live Price Overlay
**What:** Pull in the current price of the asset and show it alongside the seasonal bias  
**Why:** Contextualises whether the asset is currently at a seasonal high/low  
**How:** Connect to a free FX data API (e.g. exchangerate.host or Alpha Vantage free tier)  

### Multi-Year Backtesting Panel
**What:** Show how often the seasonal signal was correct in each year of the dataset  
**Why:** A signal that worked 9 out of 10 years is more trustworthy than one that worked 6 out of 10  
**How:** Would require raw historical data from Moore Research Center — may not be available in this format  

### Claude Code / Automated Build
**What:** Use Claude Code (CLI) to auto-generate a new asset dashboard from a text description alone  
**Why:** Removes the need to manually paste chart images — just describe the asset's seasonal pattern in text  
**How:** A template script that accepts asset name + seasonal readings and outputs a complete HTML file  

---

## Assets Remaining to Build

In recommended order (by trading priority):

| Asset | Type | Playbook Complexity | Notes |
|-------|------|--------------------|----|
| GBP/USD | Currency | Medium | Clean signals, Wk1 buy / Wk4 sell |
| CAD/USD | Currency | Medium | Wk1 buy, Wk2-4 sell — long bear |
| JPY/USD | Currency | Medium | Wk1 buy, end Wk2 sell + re-entry |
| NZD/USD | Currency | Simple | Mirrors AUD broadly |
| USD | Currency/Index | Complex | Multiple re-entries, Wk4 buy strong |
| EUR/USD | Currency | Complex | Choppy Wk1-3, very strong Wk4 buy |
| CHF | Currency | Very Choppy | Choppy all month, hardest to trade |
| MXN | Currency | Long hold | High of year Apr, hold short to Dec |
| BRL | Currency | Long hold | Wk1-3, hold to mid-May |
| XAU (Gold) | Metal | Simple | Wk2 sell |
| XAG (Silver) | Metal | Simple | Wk3/4 sell |
| Copper | Metal | Simple | Wk4 sell |
| Platinum | Metal | Simple | Wk2/3 sell |
| Palladium | Metal | Mixed | Wk1 buy, Wk4 sell |
