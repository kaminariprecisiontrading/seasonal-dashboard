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
| **Price** | A live TradingView price chart for the asset |
| **History** | Upload your MT5 price data to validate the seasonal model against real price history |
| **Sessions** | Upload your MT5 intraday data to see which sessions and days of week tend to perform |
| **Macro** | Investing.com economic calendar filtered for this asset's relevant currencies |
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

## History Tab — Validating Seasonals Against Real Price Data

Upload your MetaTrader 5 daily (D1) price data to see how well the seasonal model has performed historically.

### Exporting from MT5

1. Open MetaTrader 5
2. Go to **View → Symbols** → select your asset
3. Click the **Bars** tab
4. Set timeframe to **D1** (daily)
5. Set the date range to cover your full history (e.g. 1993 to today)
6. Click **Request**, then **Export Bars** in the bottom toolbar
7. Save the file as CSV
8. Drag and drop the CSV file onto the upload area in the History tab

### Reading the Results

**Raw Price Tendency heatmap** — shows the % of years that price actually rose during each (month, week) cell, based purely on price data with no reference to the seasonal model. Green = rose more than 60% of years, amber = 40–59%, red = less than 40%. This is the objective baseline.

**Win Rate by Period** — shows how often the seasonal signal (Long/Short/Chop) was directionally correct. A cell with a high win rate means the seasonal model reliably predicted direction during that period. Green ≥ 65%, amber 50–64%, red < 50%. Chop/Flip periods show `~` (no directional claim).

**Average Weekly Return by Month** — bar chart showing the average magnitude of weekly moves per month. Pair this with Win Rate: a high win rate + tall bar = the seasonal signal was right AND the moves were meaningful. A high win rate + short bar = right direction but moves were small.

Your uploaded data is saved in the browser (no re-upload needed on next visit).

---

## Sessions Tab — Intraday Bias Analysis

Upload MetaTrader 5 hourly (H1) or 4-hour (H4) data to see which times of day, trading sessions, and days of week tend to be most favourable for this asset.

### Exporting from MT5

Same steps as the History tab — but select **H1** (or H4) instead of D1 at step 4.

### Broker Timezone

Before uploading, set your broker's server timezone using the offset dropdown (UTC+0 to UTC+3). Most MT5 brokers run on **EET (UTC+2 winter, UTC+3 summer)**. If your broker uses a different offset, change this before uploading so that session boundaries (Asian Open, London Open, etc.) are correctly identified.

The offset is saved per asset, so you only need to set it once per asset.

### Reading the Results

**By Hour chart** — shows average return per hour slot across all uploaded history. The amber line overlay shows the % of bars that closed positive. Session background shading identifies the major session windows.

**By Session cards** — one card per trading session (Late NY/Asian, Asian, London, London/NY Overlap, New York, After-hours):
- The large number is the average return for that session
- `"847 / 1,653 sessions"` means the session closed up on 847 days out of 1,653 total days where data was available for that session window
- Positive average + high session count = reliable bullish session tendency

**By Day of Week cards** — one card per weekday. The count `"682 / 1,654 days"` means price closed up on 682 out of 1,654 trading days that fell on that weekday.

**Signal filter** — the filter row (All / Long weeks / Short weeks / Chop weeks) narrows the dataset to only dates that fall within weeks whose seasonal signal matches. This lets you see, for example, how the London session performs specifically during the bearish seasonal period vs the bullish one.

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

Below the provider selector, four chips show which data layers will be included in the AI's analysis:

- **Seasonal** — month-by-month seasonal analysis from the data file. Always available.
- **Curve** — the cumulative seasonal bias curve summary. Always available.
- **History** — win rates and best/worst months from your uploaded D1 CSV. Shows ✓ after uploading on the History tab.
- **Sessions** — best/worst session and day-of-week from your uploaded H1/H4 CSV. Shows ✓ after uploading on the Sessions tab.

Upload both CSVs before running analysis to get the full four-layer context.

### Running Analysis

Select a provider with the pill buttons, then click **Run Analysis**. The response streams in live. Results are cached for the current week — if you re-open the page during the same week, the cached result loads instantly.

If you upload new CSV data mid-week and want the AI to reflect the new data, click the **✕** on the cached result to clear it and re-run.

### Reading the Output

The AI always produces a structured response:

- **VERDICT block** — `LONG`, `SHORT`, `NEUTRAL`, or `WAIT` with a brief rationale
- **Data table** — 5-row summary of the current seasonal position across all context layers
- **3-Month outlook** — a short paragraph covering the next three months' seasonal bias
- **Trade notes** — 3 bullet points with specific observations or actionable ideas

The verdict reflects the seasonal tendency only — it does not account for current price, news, or technical structure. Use it alongside your own market analysis, not as a standalone entry signal.

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
