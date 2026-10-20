# USER_GUIDE.md — Dashboard User Guide

A plain-English guide to using the KPT Seasonal Dashboard. No coding knowledge required.

---

## Opening a Dashboard

The dashboard is hosted at **[https://kpt-seasonals.netlify.app/](https://kpt-seasonals.netlify.app/)** — open this URL in any browser to access it directly, with no local setup required. The site auto-updates within ~60 seconds of any push to GitHub.

The site opens on a **landing page** that explains what the dashboard does, with this week's signal tally. Click **Dashboard** in the top menu (or any "Open dashboard" button) to reach the **dashboard index** at `/dashboard`, then click any asset card marked **Live** to open its dashboard.

If you are working on the project locally (adding new assets, editing data), run `node scripts/serve_local.js` from the repo root and open http://localhost:8888/. It applies the site's routing rules, so `/dashboard` and the other clean addresses work. Do not open the HTML files directly from File Explorer.

Each asset dashboard has seven tabs along the top:

| Tab | What it shows |
|-----|---------------|
| **Seasonals** | The seasonal tendency accordion — month-by-month analysis, week-by-week breakdown |
| **Trend** | The seasonal bias curve — visual representation of the full-year seasonal arc |
| **Profiling** | Statistics from decades of real price data: typical range, profile shapes, and when highs/lows form (14 assets) |
| **Live Price** | A live TradingView price chart for the asset |
| **Macro** | Investing.com economic calendar filtered for this asset's relevant currencies |
| **Upload** | Upload your own MT5 price data (any timeframe) to validate the seasonal model and see intraday timing |
| **Analysis** | AI-generated seasonal analysis using Claude, ChatGPT, Gemini, or your own local Ollama model |

---

## Site Pages

The top menu on the landing page, dashboard and content pages links to: **Dashboard** · **This Week** · **Heatmap** · **Track Record** · **Methodology**.

- **This Week** (`/this-week`) — the weekly digest: BULL / BEAR / OTHER counts and how they changed since last week, every signal that flipped (top 6, then **See all**), new five-dot signals, your watchlist, and the strongest BULL/BEAR windows in each of the next four weeks. Use **‹ ›** to look at other weeks; the address bar keeps the week so you can bookmark it.
- **Watchlist** — click the **☆** on any dashboard card or next to an asset's name at the top of its page to star it (★). Starred assets appear on This Week, and the dashboard's **★ Watchlist** filter shows only them. The list is saved in this browser only (`kpt-watchlist`); with site storage blocked it can't be saved.
- **Heatmap** (`/heatmap`) — every market on one grid. **Months** shows each month's overall verdict from the seasonal data; **Weeks** shows a rolling 12 weeks (four before this month, this month, four after) using the same weekly signal as the dashboard. ▲ BULL, ▼ BEAR, – CHOP (and AVOID), ↻ FLIP; stronger colour = more conviction; the current month/week is highlighted. Filter rows by asset group, click a cell for details and **Open asset →**. On a phone the grid scrolls sideways inside its box with the names frozen.
- **Track Record** (`/track-record`) — how past weekly signals actually did on the 14 assets with full price history: hit rate, average move on hits vs misses (in ADR20 multiples), whether higher conviction did better, the last 12 weeks, and every graded signal in the log. **BACKFILL** rows are graded with today's seasonal data (which already contains those years, so they flatter the signals); **LIVE** rows use the signals exactly as the site showed them that week. The grading rules are on the page. Past results don't predict future ones.
- **Methodology** (`/methodology`) — how a signal is built, what CHOP / FLIP / AVOID mean, how conviction is set, how forex pairs are synthesised, and what a seasonal signal is *not*.

---

## Building a Trade Idea — Step-by-Step Workflow

The dashboard is designed to be worked through in layer order, from broad seasonal context down to execution timing. Each step narrows the picture.

**1. Scan the index for current-week bias.**
Open the dashboard (`/dashboard`). Every asset card shows a live signal (BULL / BEAR / CHOP / FLIP) for the current week, derived from the signals manifest. Use the filter bar to isolate all BULL or BEAR assets at a glance. The freshness note shows when the manifest was last regenerated.

**2. Open an asset and check the Seasonals tab.**
The combined accordion auto-opens to the current month. Read the week-level combined signal and conviction stars (★★★★★ = maximum confluence across all three timeframes). Expand adjacent weeks to see whether the bias is building or fading. Use the quick-jump buttons to check the broader monthly arc.

**3. Confirm direction on the Trend tab.**
The seasonal curve shows the cumulative directional bias across the year. The NOW marker shows where the asset sits in its seasonal cycle today. A rising curve confirms a bullish seasonal; a curve already past its peak is a caution signal even if the week reads BULL.

**4. Check the statistical profile on the Profiling tab** *(14 assets)*.
The Range Outlook at the top forecasts how big the next day, week and month's ranges are likely to be (and says when that forecast is out of date). Below it: expected daily range (median, ADR20), the most common profile shapes at each granularity, and when the day's/week's high and low typically form. This turns "bullish this week" into "how far, and at what time of day/week, does a move usually happen." The NFP panel shows how much first-Friday releases change the picture.

**5. Check current price on the Live Price tab.**
The live TradingView chart shows where price is trading relative to recent structure. Seasonal bias is directional context — not an entry signal. Price should be approaching a logical level before acting.

**6. Validate the edge on the Upload tab.**
Upload a CSV export from MT5 (see [Exporting from MT5](#exporting-from-mt5)); any timeframe from M1 to monthly works, and sub-daily bars are aggregated to daily closes. The Seasonal Tendency view shows raw tendency, win rate, and average return for each month and week historically. A seasonal signal with a 35% win rate over 30 years is much less interesting than one with 70%.

**7. Find the timing window (also on the Upload tab).**
If the upload is intraday (M1–H4), the Upload tab also breaks down average return by hour of day, by session (London / New York / Asian / Pacific), and by day of week. This answers "given the seasonal is bullish this week, *when* in the week has price historically moved?" Filter the session cards by seasonal signal to isolate the relevant subset.

**8. Check for macro risk on the Macro tab.**
The Investing.com calendar is pre-filtered to the currencies and events most relevant to the asset. A high-impact event mid-week can override any seasonal tendency. The interpretation guide explains which event types matter most for each asset class.

**9. Run the AI synthesis on the Analysis tab.**
Click Run Analysis. The AI draws on all available data layers — seasonal signals, curve position, backtest win rates, and session timing — and produces a structured verdict: LONG / SHORT / NEUTRAL / WAIT, with rationale and a risk note. Use the provider toggle to switch between Claude, ChatGPT, Gemini, or a local Ollama model. Results are cached weekly so subsequent opens are instant, and can be downloaded as a `.md` file.

**10. Apply your own execution framework.**
The dashboard provides objective confluence data. Entry trigger, position sizing, stop placement, and trade management are the trader's own decisions. The tool's job is to ensure every angle has been considered before a bias is formed.

---

## Seasonals Tab

This is the main tab. The combined accordion shows all 12 months of the year:

- Click any **month row** to expand the week-by-week breakdown (Wk 1–4)
- The **current month** auto-opens when the page loads
- Use the **quick-jump buttons** (Jan … Dec) above the accordion to jump to any month instantly
- The coloured signal tags show the directional bias: **green = Long**, **red = Short**, **amber = Mixed/Chop**
- The **★ star rating** indicates conviction — 5 stars = highest confidence, 1 star = very uncertain

Scroll down past the accordion to see the individual 5-YR, 15-YR, and Long-term timeframe tables for detailed per-TF analysis.

---

## Trend Tab

The seasonal bias curve is generated live from the seasonal data — no external data feed is needed.

Four curves are shown: 5-YR (pink), 15-YR (brown), Long-term (blue), and Combined (green filled area).

How to read it: a **rising curve** means seasonal tailwind (bullish bias during that period); a **falling curve** means seasonal headwind (bearish bias). The curve is cumulative — it doesn't show absolute price, just the net directional tendency built up week by week through the year.

The **amber dashed vertical line** marks today's position in the seasonal year. The **NOW badge** in the header shows the current month and week with its combined signal.

Monthly background shading reflects the combined signal for each month: green = Long, red = Short, amber = Mixed.

---

## Profiling Tab — Statistical Market Profile

Available for **14 assets** with full MT5 minute-level history behind them: GBPUSD, EURUSD, AUDUSD, NZDUSD, USDCAD, USDCHF, USDJPY (on both the futures currency page and the FX pair page), Gold (XAU), Brent, WTI crude, S&P 500, Nasdaq 100, DJIA and BTCUSD. On every other asset the tab shows an empty state.

Where the Seasonals tab says *which direction* this time of year tends to favour, Profiling says *how far price usually moves and when*, measured directly from decades of real price data.

- **Range Outlook** (top of the tab) — a forecast of *how much* price is likely to move, not which way: the next day's expected range with an 80% band, and the average daily range expected over the next 5 and 20 trading days, each compared to ADR20. Made by TimesFM, Google's pretrained time-series model, from the asset's last ~4 years of daily ranges; it was tested against ADR20 on all 14 assets over 2016–2026 before being added. The chart shows the last 60 forecasts against what actually happened (coloured dots fell outside the band), and the **Track record** line shows how it has done recently, updated every time the data is refreshed. If the forecast was made for a date that has already passed, an amber **Historical forecast** notice says so: it updates only when new MT5 data is exported and the pipeline is re-run.
- **Granularity switcher** — Daily / Weekly / Monthly / Yearly. Each shows the profile taxonomy, range distribution, and timing of the period's high and low at that scale.
- **Lookback dial** — choose how much history the stats use (e.g. recent years vs. full history). Hidden on Yearly, where it has no effect.
- **Profile Taxonomy** — how often each profile shape occurs (Trend Day, Normal Day, Volatile Day, Compression Day, etc.). Click a profile card to open its detail page, with a real example chart; from there **Compare across assets** opens a side-by-side view of up to 10 assets.
- **Range Distribution** — the typical size of a day/week/month/year's range (median, percentiles, ADR20).
- **Time of Extreme** — when the high and low usually form.
- **Pairing heatmaps** — which session / hour (Daily), weekday (Weekly), week-of-month (Monthly) or month (Yearly) the high and low tend to land in *together*. Same-period highs and lows are rare, which is useful for anticipating where the opposite extreme forms.
- **Hourly Activity** (Daily) — average range per hour; the London–New York overlap is the most active window for every asset.
- **NFP Fridays vs. Other Fridays** (Daily) — how first-Friday US jobs reports change the day's range and the chance of an extreme forming in the release window.
- **Profiling calendar** — a day-by-day calendar of past profiles, linked from the tab.

**Yearly** statistics are based on only ~20–34 years of data per asset, and the page says so. Treat them as context, not as a tested edge.

Data freshness: the **Data As Of** figure shows the last date included. It updates only when new MT5 data is exported and the pipeline is re-run (a developer task).

---

## Live Price Tab

An embedded TradingView chart (weekly interval by default) for checking where price is right now relative to its seasonal and statistical context. You can change the interval and symbol inside the widget.

**Third-party embeds load only when you choose.** The Live Price chart (TradingView) and the Macro calendar (Investing.com) are provided by other companies that may set their own cookies, so nothing is requested from them until you click **Load chart** / **Load calendar**. Loading one doesn't load the other. To skip the button, tick **Always load embeds on this device**, or set **Embeds → Always load** in the site footer — the two settings are the same and stay in sync. With "Always load" on, an embed loads as soon as you open its tab (never before). If your browser blocks site storage, the setting can't be saved and the site falls back to asking each time.

---

## Upload Tab — Your Own Price Data

Upload a MetaTrader 5 CSV export at **any timeframe from M1 (1-minute) up to MN1 (monthly)**. The timeframe is detected automatically, and the tab shows whichever views the data supports. This tab replaced the former History and Sessions tabs.

### Exporting from MT5

1. Open MetaTrader 5
2. Go to **View → Symbols** → select your asset
3. Click the **Bars** tab
4. Choose a timeframe: **D1** is enough for the seasonal backtest; **H1** (or any of M1–H4) also gives you the intraday timing view
5. Set the date range to cover your full history (e.g. 1993 to today)
6. Click **Request**, then **Export Bars** in the bottom toolbar
7. Save the file as CSV
8. Drag and drop the CSV file onto the upload area in the Upload tab

### Broker Timezone

For intraday (M1–H4) uploads, set your broker's server timezone using the offset dropdown. Most MT5 brokers run on **EET (UTC+2 winter, UTC+3 summer)**. If your broker uses a different offset, change this before uploading so that session boundaries (Asian, London, etc.) are identified correctly. The offset is saved per asset, and it doesn't affect daily or higher-timeframe uploads.

### Seasonal Tendency view (every timeframe)

Sub-daily bars are aggregated to daily closes first.

**Raw Price Tendency heatmap**: the % of years that price actually rose during each (month, week) cell, based purely on price data with no reference to the seasonal model. Green means it rose in more than 60% of years, amber 40–59%, red less than 40%. This is the objective baseline.

**Win Rate by Period**: how often the seasonal signal (Long/Short/Chop) was directionally correct. A high win rate means the seasonal model reliably predicted direction during that period. Green ≥ 65%, amber 50–64%, red < 50%. Chop/Flip periods show `~` (no directional claim).

**Average Weekly Return by Month**: a bar chart of the average size of weekly moves per month. Read it together with Win Rate: a high win rate with a tall bar means the signal was right AND the moves were meaningful. A high win rate with a short bar means the direction was right but the moves were small.

A monthly (MN1) upload collapses the week axis to a single "Month" slot, since one bar per month has no weekly detail.

### Intraday Timing view (M1–H4 uploads only)

**By Hour chart**: average return per hour slot across all uploaded history. The amber line overlay shows the % of bars that closed positive. Session background shading identifies the major session windows.

**By Session cards**: one card per trading session (Late NY/Asian, Asian, London, London/NY Overlap, New York, After-hours).
- The large number is the average return for that session
- `"847 / 1,653 sessions"` means the session closed up on 847 of the 1,653 days with data for that session window
- A positive average across a high session count means a reliable bullish session tendency

**By Day of Week cards**: one card per weekday. The count `"682 / 1,654 days"` means price closed up on 682 of the 1,654 trading days that fell on that weekday.

**Signal filter**: the filter row (All / Long weeks / Short weeks / Chop weeks) narrows the data to dates in weeks whose seasonal signal matches. For example, you can compare how the London session performs in the bearish seasonal period against the bullish one.

Your uploaded data is saved in the browser (no re-upload needed on next visit).

---

## Analysis Tab — AI-Generated Seasonal Synthesis

The Analysis tab synthesises all available data layers into a structured seasonal assessment using your choice of AI model.

### Setting Up a Provider

Click the **⚙** (gear) icon to open the settings panel.

**Claude (Anthropic)**
1. Go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create a new key
2. Paste the key into the Anthropic API key field

**ChatGPT (OpenAI)**
1. Go to [platform.openai.com](https://platform.openai.com) → API keys → Create a new secret key
2. Paste the key into the OpenAI API key field
3. Optional: **ChatGPT model** — leave blank for OpenAI's current flagship (`gpt-6-astra` as of October 2026; capable but relatively expensive per run), or type another model name your key can use, e.g. a cheaper one

**Gemini (Google)**
1. Go to [aistudio.google.com](https://aistudio.google.com) → Get API Key
2. Paste the key into the Gemini API key field

**Keeping your keys safe**
- **Keep my keys → This session only** (the default): keys are forgotten when you close the tab. **Remember on this device**: keys survive restarts — don't choose this on a shared computer. Changing the option moves any saved keys straight away. If you saved keys before this option existed, they're treated as remembered, so nothing stops working.
- Keys are never shown in full again after saving — only a masked form like `sk-ant…a1F9`. To replace a key, type the new one and click **Save**; leaving a field blank keeps the saved key.
- **Clear all keys** removes every saved key from this browser (both session and remembered).
- A key is sent **only** to its own provider, directly from your browser — never to this site, and never in a web address. Set a **monthly spending limit** on any key you use here, in your provider's console.

**Ollama (local — no API key needed)**
1. Download Ollama from [ollama.ai](https://ollama.ai) and install
2. Run `start_kpt.bat` (found in the `KPT Seasonals` folder alongside the dashboard) — this starts Ollama with the browser CORS permissions it needs
3. In the settings panel, enter `http://localhost:11434` as the URL (do not add anything else)
4. Enter your model name exactly as shown by `ollama list` (e.g. `mistral:latest`, `llama3.2`)

The site's security policy only lets the Analysis tab connect to Ollama at `http://localhost:11434` or `http://127.0.0.1:11434`. An Ollama server on another machine or port will be blocked by your browser — run Ollama locally on the default port. With Ollama, nothing leaves your computer.

Above **Run Analysis** you'll always see: *AI output can be wrong. The verdict is model output, not financial advice.* The same line appears above every result and at the top of a downloaded `.md` file.

### Context Chips

Below the provider selector, five chips show which data layers will be included in the AI's analysis:

- **Seasonal** — month-by-month seasonal analysis from the data file. Always available.
- **Curve** — the cumulative seasonal bias curve summary. Always available.
- **History**: win rates and best/worst months from your upload. Shows ✓ after uploading any CSV on the Upload tab.
- **Sessions**: best/worst session and day of week. Shows ✓ after uploading an intraday (M1–H4) CSV on the Upload tab.
- **Profiling**: typical range, the most common daily/weekly/monthly/yearly profile shape, dominant high/low timing, and the Range Outlook forecast. Shows ✓ automatically on the 14 Profiling assets. During an NFP week, the event risk is included too.

A single intraday upload (e.g. H1) lights up both History and Sessions.

### Running Analysis

Select a provider with the pill buttons, then click **Run Analysis**. The response streams in live. Results are cached for the current week — if you re-open the page during the same week, the cached result loads instantly.

If you upload new CSV data mid-week and want the AI to reflect the new data, click **✕ Clear & re-run** on the cached result.

Click **⬇ Download .md** to save the result as a Markdown file (`{asset}_Analysis_{date}_{time}.md`).

### Reading the Output

The AI always produces a structured response:

- **VERDICT block** — `LONG`, `SHORT`, `NEUTRAL`, or `WAIT` with a brief rationale
- **Data table**: a 6-row summary (Seasonal Signal, Historical Accuracy, Curve Position, Market Profile, Best Entry Window, Key Risk). Layers without data are marked N/A
- **3-Month outlook** — a short paragraph covering the next three months' seasonal bias
- **Trade notes** — 3 bullet points with specific observations or actionable ideas

The verdict reflects the dashboard's data layers only. It does not account for current price, news, or technical structure. Use it alongside your own market analysis, not as a standalone entry signal.

---

## Macro Tab

Shows the Investing.com economic calendar, pre-filtered for the currencies and country events relevant to this asset. Useful for identifying upcoming high-impact events that may accelerate or disrupt the seasonal tendency.

Click **Load calendar** to load it (see the Live Price tab for how embeds and the **Always load** setting work). The calendar widget may take 20–30 seconds to load on first open (it is an embedded third-party iframe). Change the date range using the widget's own controls. The importance filter (High / Medium / Low) can be toggled within the widget.

**Note for anyone testing locally:** the widget only loads correctly on the deployed site (`kpt-seasonals.netlify.app`) — it will not load on a local preview (`localhost`), since Investing.com's free embed requires the parent domain to be registered with them. This is expected and not a bug.

---

## Printing / Saving to PDF

To print all panels at once, use your browser's **File → Print** or **Ctrl+P** function. The print stylesheet automatically:
- Shows all 7 panels (regardless of which tab is active)
- Converts the dark theme to a white background
- Hides navigation, buttons, and iframes
- Adds page breaks between major sections

To print only the currently active tab, click the **Print this tab** button in the top bar before printing. This restricts the print output to the active panel only.

---

## Tips

**Keep CSVs:** Save your MT5 exports somewhere accessible. If you clear your browser storage or switch browsers, you will need to re-upload.

**AI cache is weekly:** The AI response refreshes automatically each calendar week. If your seasonal data file is updated, use the ✕ button to clear the cache and get a fresh analysis immediately.

**Signals manifest:** The signal chips on the dashboard index (and the landing page's tally) are generated from a static manifest file. If data files are updated, the manifest needs to be rebuilt (a developer task). The "Signal data as of [date]" note on the dashboard index shows when it was last generated.

**Local Ollama must be running:** Ollama is not a cloud service — it only works while the `start_kpt.bat` script is running in the background on your computer. If the Analysis tab shows a connection error for Ollama, re-run the batch file.
