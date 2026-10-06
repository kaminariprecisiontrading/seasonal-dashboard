# USER_GUIDE.md — Dashboard User Guide

A plain-English guide to using the KPT Seasonal Dashboard. No coding knowledge required.

---

## Opening a Dashboard

The dashboard is hosted at **[https://kpt-seasonals.netlify.app/](https://kpt-seasonals.netlify.app/)** — open this URL in any browser to access it directly, with no local setup required. The site auto-updates within ~60 seconds of any push to GitHub.

If you are working on the project locally (adding new assets, editing data), open the index page via **Live Server** in VSCode instead. Do not open the HTML files directly from File Explorer — the relative paths (CSS, JS, data) require a local web server to resolve correctly.

From the index page, click any asset card marked **Live** to open its dashboard.

Each asset dashboard has seven tabs along the top:

| Tab | What it shows |
|-----|---------------|
| **Seasonals** | The seasonal tendency accordion — month-by-month analysis, week-by-week breakdown |
| **Trend** | The seasonal bias curve — visual representation of the full-year seasonal arc |
| **Profiling** | Statistics from decades of real price data: typical range, profile shapes, and when highs/lows form (14 assets) |
| **Live Price** | A live TradingView price chart for the asset |
| **Macro** | Investing.com economic calendar filtered for this asset's relevant currencies |
| **Upload** | Upload your own MT5 price data (any timeframe) to validate the seasonal model and see intraday timing |
| **Analysis** | AI-generated seasonal analysis using Claude, Gemini, or your own local Ollama model |

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

Click the **⚙** (gear) icon to open the settings panel. You only need to do this once.

**Claude (Anthropic)**
1. Go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create a new key
2. Paste the key into the Claude API Key field

**Gemini (Google)**
1. Go to [aistudio.google.com](https://aistudio.google.com) → Get API Key
2. Paste the key into the Gemini API Key field

**Ollama (local — no API key needed)**
1. Download Ollama from [ollama.ai](https://ollama.ai) and install
2. Run `start_kpt.bat` (found in the `KPT Seasonals` folder alongside the dashboard) — this starts Ollama with the browser CORS permissions it needs
3. In the settings panel, enter `http://localhost:11434` as the URL (do not add anything else)
4. Enter your model name exactly as shown by `ollama list` (e.g. `mistral:latest`, `llama3.2`)

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

The calendar widget may take 20–30 seconds to load on first open (it is an embedded third-party iframe). Change the date range using the widget's own controls. The importance filter (High / Medium / Low) can be toggled within the widget.

**Note for anyone testing locally:** the widget only loads correctly on the deployed site (`kpt-seasonals.netlify.app`) — it will not load via Live Server on `127.0.0.1`, since Investing.com's free embed requires the parent domain to be registered with them. This is expected and not a bug.

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

**Signals manifest:** The signal chips on the index page are generated from a static manifest file. If data files are updated, the manifest needs to be rebuilt (a developer task). The "Signal data as of [date]" note at the bottom of the index page shows when it was last generated.

**Local Ollama must be running:** Ollama is not a cloud service — it only works while the `start_kpt.bat` script is running in the background on your computer. If the Analysis tab shows a connection error for Ollama, re-run the batch file.
