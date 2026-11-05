# ASSETS.md — Asset Roster

Every market on the site, with the source of its seasonal data and its key finding. File paths are
relative to `frontend/`; each page is served at `/assets/<id>.html`.

98 live pages: 70 futures, 27 forex pairs and 1 crypto asset. Planned assets appear on the dashboard
as `PLANNED` cards, including five Deriv synthetic indices (Volatility 10, 25, 50, 75, 100) with no
page or data yet. How signals are read from these pages: [DATA_DICTIONARY.md](DATA_DICTIONARY.md);
adding an asset: [CONTRIBUTING.md](CONTRIBUTING.md).

The **Source** columns show each asset's label as of v1.29. The list that the site and the alert actually
read is `frontend/data/asset_sources.js`.

---

## Futures Seasonals — Live Assets (70 assets)

### Currencies (10)

| Asset | File | Timeframes | Key Finding | Source |
|-------|------|-----------|-------------|---|
| AUD/USD | `assets/aud.html` | 5-YR · 15-YR · 34-YR | Q1 bull, Apr Wk1 peak→flip, May–Jun bear | MRCI |
| USD Index | `assets/usd.html` | 5-YR · 15-YR · 35-YR | Double cycle: Feb/Mar peak→May trough→Jul bounce→Oct trough→Nov/Dec peak | MRCI |
| JPY/USD | `assets/jpy.html` | 5-YR · 15-YR · 40-YR | Mar bull, Jul–Aug peak, Sep highest conviction SHORT | MRCI |
| GBP/USD | `assets/gbp.html` | 5-YR · 15-YR · 40-YR | Feb trough→Mar–Apr unanimous peak ~100→May waterfall→Sep trough→Oct–Nov bull | MRCI |
| CAD/USD | `assets/cad.html` | 5-YR · 15-YR · 40-YR | Jan spike-and-collapse, Apr Wk1 bull→Wk2 flip short, May–Jun waterfall | MRCI |
| EUR/USD | `assets/eur.html` | 5-YR · 15-YR · 22-YR | EUR launched 1999 (22-YR only); strong Q1 bull, Apr Wk4 highest conviction LONG | MRCI |
| CHF/USD | `assets/chf.html` | 5-YR · 15-YR · 40-YR | May ~100 peak; Dec year-end secondary peak on 40-YR | MRCI |
| NZD/USD | `assets/nzd.html` | 5-YR · 15-YR · 23-YR | Jan waterfall, May Wk2 highest conviction short, Nov Wk4→Dec year-end surge | MRCI |
| MXN | `assets/mxn.html` | 5-YR · 15-YR · long-YR | Long-hold bear Apr→Dec; one of the dashboard's sustained trend instruments | MRCI |
| BRL | `assets/brl.html` | 5-YR · 15-YR · long-YR | Apr→mid-May bear; BRL seasonal arc shorter and sharper than MXN | MRCI |

### Metals (5)

| Asset | File | Timeframes | Key Finding | Source |
|-------|------|-----------|-------------|---|
| XAU Gold | `assets/xau.html` | 5-YR · 15-YR · long-YR | Jan bull, Feb–Mar peak, Apr Wk2 short, Jul/Aug/Sep secondary surge | MRCI |
| XAG Silver | `assets/xag.html` | 5-YR · 15-YR · long-YR | Apr Wk3/4 short; more volatile than Gold | MRCI |
| Copper | `assets/copper.html` | 5-YR · 15-YR · long-YR | Apr Wk4 short; Jan–Feb bull; Sep recovery | MRCI |
| Platinum | `assets/platinum.html` | 5-YR · 15-YR · long-YR | Apr Wk1 buy + Wk4 sell; Feb–Mar peak | MRCI |
| Palladium | `assets/palladium.html` | 5-YR · 15-YR · long-YR | Apr Wk1 buy; Wk4 sell; most volatile metal | MRCI |

### Energy (6)

| Asset | File | Exchange | Key Finding | Source |
|-------|------|---------|-------------|---|
| Crude Oil | `assets/cl.html` | NYMEX | Q1 bull, summer peak, autumn trough | MRCI |
| Brent Crude | `assets/brent.html` | ICE | Similar arc to WTI; slightly earlier seasonal peaks | MRCI |
| Natural Gas | `assets/ng.html` | NYMEX | Oct–Nov annual high; Apr–Aug trough zone | MRCI |
| Heating Oil/ULSD | `assets/ulsd.html` | NYMEX | Winter-driven; Jan–Feb peak, spring decline | MRCI |
| Gasoline/RBOB | `assets/rb.html` | NYMEX | Spring driving season; Apr–May peak | MRCI |
| Gas Oil | `assets/gasoil.html` | ICE | European distillate; winter-driven like Heating Oil | MRCI |

### Interest Rates (14)

| Asset | File | Exchange | TF | Key Finding | Source |
|-------|------|---------|---|-------------|---|
| T-Bonds | `assets/tbonds.html` | CBOT | 40-YR | Nov/Dec annual high; June/Jul annual low | MRCI |
| T-Notes 10Y | `assets/tnotes10.html` | CBOT | 39-YR | Similar to T-Bonds with 10Y compression | MRCI |
| T-Notes 5Y | `assets/tnotes5.html` | CBOT | 33-YR | More volatile version of 10Y pattern | MRCI |
| T-Notes 2Y | `assets/tnotes2.html` | CBOT | 30-YR | Shortest US rate; most monetary-policy-reactive | MRCI |
| Eurodollar | `assets/eurodollar.html` | CME | 39-YR | Dec annual high; Jun/Jul annual low | MRCI |
| Aus T-Bonds 10Y | `assets/austbonds10.html` | SFE | 36-YR | Year-end bull; Q2 trough | MRCI |
| Aus T-Bonds 3Y | `assets/austbonds3.html` | SFE | 33-YR | Similar to 10Y with higher short-TF volatility | MRCI |
| Aus T-Bills 3M | `assets/austbills3m.html` | SFE | 40-YR | Smoothest Australian rates instrument | MRCI |
| Long Gilt | `assets/longgilt.html` | LIFFE | 38-YR | UK rates; year-end highs; summer trough | MRCI |
| Short Sterling | `assets/shortsterling.html` | LIFFE | 38-YR | UK short rate; similar arc to Long Gilt | MRCI |
| Euro-Bund | `assets/eurobund.html` | EUREX | 30-YR | Year-end extreme highs; Feb-Mar spike then crash; Aug reversal | MRCI |
| Euro-Bobl | `assets/eurobobl.html` | EUREX | 23-YR | Year-end extreme highs (23-YR ~100); Nov annual high | MRCI |
| Euro-Yen | `assets/euroyen.html` | SGX | 31-YR | Feb EXPLOSIVE spike (31-YR 1→100); most dramatic move in rates complex | MRCI |
| Fed Funds | `assets/fedfunds.html` | CBOT | 32-YR | INVERTED instrument: Jan 5-YR at annual HIGH; Jun/Jul at absolute trough | MRCI |

### Indices (13)

| Asset | File | Exchange | TF | Key Finding | Source |
|-------|------|---------|---|-------------|---|
| S&P 500 | `assets/sp500.html` | CME | 39-YR | Nov/Dec annual high; strong Q4 bull | MRCI |
| S&P eMini | `assets/es.html` | CME | 23-YR | Similar to SP500; confirmed by shorter dataset | MRCI |
| Russell 2000 | `assets/rty.html` | CME | 17-YR | Small-cap divergence; Jan/Dec peaks | MRCI |
| DJIA eMini | `assets/ym.html` | CBOT | 23-YR | Blue-chip seasonals; Nov annual high | MRCI |
| Nasdaq 100 | `assets/nq.html` | CME | 24-YR | Tech bias; Jan/Dec surges; summer weakness | MRCI |
| S&P 400 | `assets/md.html` | CME | 29-YR | Mid-cap; less volatile than RTY | MRCI |
| GSCI | `assets/gsci.html` | CME | 29-YR | Commodity index; unique seasonal driven by energy weightings | MRCI |
| Nikkei 225 | `assets/nk.html` | SIMEX | 34-YR | Jan/Feb peak; Sep trough; year-end recovery | MRCI |
| FTSE 100 | `assets/ftse.html` | LIFFE | 37-YR | Jan bull; May/Jun weakness; Nov/Dec recovery | MRCI |
| SPI 200 | `assets/spi.html` | SFE | 21-YR | Australian equities; Apr peak; Sep/Oct trough | MRCI |
| DAX | `assets/dax.html` | EUREX | 30-YR | Jan bull; May correction; Nov/Dec annual high | MRCI |
| CAC 40 | `assets/cac.html` | MATIF | 32-YR | Mirrors DAX with slight lag | MRCI |
| Hang Seng | `assets/hsi.html` | HKFE | 34-YR | Jan surge; Q2 weakness; Oct/Nov recovery | MRCI |

### Softs (8)

| Asset | File | Exchange | TF | Key Finding | Source |
|-------|------|---------|---|-------------|---|
| Coffee "C" | `assets/coffee.html` | ICE | 40-YR | Jan 5-YR high; Feb 15-YR peak; Jun annual trough; Jul flip long | MRCI |
| Sugar #11 | `assets/sugar11.html` | ICE | 40-YR | DUAL TROUGH: Jun first trough, Sep second trough; Oct explosive surge | MRCI |
| Cocoa | `assets/cocoa.html` | ICE | 40-YR | May: 40-YR at 0 while 5-YR/15-YR at 100 (most extreme TF divergence in dashboard) | MRCI |
| Orange Juice | `assets/oj.html` | ICE | 40-YR | Jan 5-YR at annual HIGH; 40-YR dual crashes (Feb + Aug near 0) | MRCI |
| Rough Rice | `assets/roughrice.html` | CBOT | 34-YR | Dec/Jan annual high ~99→crashes to 5 on Jan 3; April near-0 trough = best long entry | MRCI |
| London Sugar | `assets/londonsugar.html` | LCE | 30-YR | June 30-YR ANNUAL HIGH (~95-100); most dramatic LCE spike; August annual trough near 0 | MRCI |
| London Cocoa | `assets/londoncocoa.html` | LCE | 34-YR | 34-YR visits near 0 FOUR TIMES per year (Jan/Apr/Aug/Oct); Feb 34-YR annual high | MRCI |
| Robusta Coffee | `assets/robusta.html` | LCE | 29-YR | Year ENDS at trough; Feb 29-YR annual high (~95-100); Oct annual low near 0 | MRCI |

### Grains (8)

| Asset | File | Exchange | TF | Key Finding | Source |
|-------|------|---------|---|-------------|---|
| Soybeans | `assets/soybeans.html` | CBOT | 40-YR | Jun/Jul annual high; harvest pressure Sep/Oct | MRCI |
| Soy Meal | `assets/sbmeal.html` | CBOT | 40-YR | Similar arc to Soybeans; tighter seasonal range | MRCI |
| Soy Oil | `assets/sboil.html` | CBOT | 40-YR | More volatile than Meal; tropical oil linkage | MRCI |
| Wheat (CBOT) | `assets/wheat.html` | CBOT | 40-YR | Jul annual high; winter wheat planting dip | MRCI |
| Wheat (KCBT) | `assets/wheatk.html` | KCBT | 40-YR | Hard red winter wheat; similar to CBOT Wheat | MRCI |
| Wheat (MGE) | `assets/wheatm.html` | MGE | 40-YR | Spring wheat; Jul peak aligns with CBOT/KCBT | MRCI |
| Corn | `assets/corn.html` | CBOT | 40-YR | Jun/Jul annual high; Sep harvest pressure trough | MRCI |
| Oats | `assets/oats.html` | CBOT | 40-YR | Feb/Mar peak; Oct trough; thinner market | MRCI |

### Fiber, Meats & Dairy (6)

| Asset | File | Exchange | Key Finding | Source |
|-------|------|---------|-------------|---|
| Cotton | `assets/cotton.html` | NYBOT | Mar peak; Sep/Oct trough | MRCI |
| Lumber | `assets/lumber.html` | CME | Spring building season surge; winter trough | MRCI |
| Live Cattle | `assets/lc.html` | CME | Q1 bull; summer trough; Q4 recovery | MRCI |
| Feeder Cattle | `assets/fc.html` | CME | Similar to Live Cattle; corn-feed cost linkage | MRCI |
| Lean Hogs | `assets/lh.html` | CME | May/Jun peak (summer BBQ season); winter trough | MRCI |
| Class III Milk | `assets/milk.html` | CME | Feb/Mar peak (butter/cheese demand); Jul/Aug trough | MRCI |

---

## Forex Seasonals — Live Assets (27 pairs)

All 27 derived FX pairs are complete. Each pair combines two CME futures seasonal components — base currency direct, quote currency inverted.

**Majors**

| Pair | File | Components | Key Signal | Source |
|------|------|-----------|-----------|---|
| AUDUSD | `assets/fx-audusd.html` | AUD CME + USD ICE (inv.) | Jan–Mar LONG strongest; Oct–Nov SHORT (USD dominant) | MRCI-derived |
| EURUSD | `assets/fx-eurusd.html` | EUR CME + USD ICE (inv.) | Jan–Feb SHORT strongest; Mar FLIP MONTH; May SHORT (component collision) | MRCI-derived |
| GBPUSD | `assets/fx-gbpusd.html` | GBP CME + USD ICE (inv.) | Mar LONG; Nov–Dec SHORT (GBP lows + USD peak) | MRCI-derived |
| USDCAD | `assets/fx-usdcad.html` | USD ICE + CAD CME (inv.) | Jan–Feb & May LONG strongest; Apr SHORT (flip collision) | MRCI-derived |
| USDCHF | `assets/fx-usdchf.html` | USD ICE + CHF CME (inv.) | Jan–Feb LONG; Mar FLIP MONTH → SHORT; Apr SHORT continuation | MRCI-derived |
| USDJPY | `assets/fx-usdjpy.html` | USD ICE + JPY CME (inv.) | Sep LONG standout — JPY collapse + USD recovery | MRCI-derived |

**Minors**

| Pair | File | Components | Key Signal | Source |
|------|------|-----------|-----------|---|
| AUDCAD | `assets/fx-audcad.html` | AUD CME + CAD CME (inv.) | Jan–Mar LONG strongest run; Apr FLIP MONTH | MRCI-derived |
| AUDCHF | `assets/fx-audchf.html` | AUD CME + CHF CME (inv.) | Jan–Feb LONG; Apr FLIP MONTH; May SHORT | MRCI-derived |
| AUDNZD | `assets/fx-audnzd.html` | AUD CME + NZD CME (inv.) | Jan–Mar LONG strongest run; Apr FLIP MONTH | MRCI-derived |
| EURAUD | `assets/fx-euraud.html` | EUR CME + AUD CME (inv.) | Jan–Feb SHORT; Apr FLIP MONTH; Nov SHORT | MRCI-derived |
| EURCHF | `assets/fx-eurchf.html` | EUR CME + CHF CME (inv.) | May & Sep–Nov SHORT; Jun LONG | MRCI-derived |
| EURGBP | `assets/fx-eurgbp.html` | EUR CME + GBP CME (inv.) | Apr FLIP MONTH; Nov SHORT; Dec LONG | MRCI-derived |
| GBPAUD | `assets/fx-gbpaud.html` | GBP CME + AUD CME (inv.) | Jan & Dec SHORT; Oct LONG | MRCI-derived |
| GBPCHF | `assets/fx-gbpchf.html` | GBP CME + CHF CME (inv.) | Oct DOUBLE ALIGNMENT LONG; Dec DOUBLE ALIGNMENT SHORT | MRCI-derived |
| NZDUSD | `assets/fx-nzdusd.html` | NZD CME + USD ICE (inv.) | Jan/Feb/Jun DOUBLE ALIGNMENT SHORT; Aug DOUBLE ALIGNMENT LONG | MRCI-derived |

**Crosses**

| Pair | File | Components | Key Signal | Source |
|------|------|-----------|-----------|---|
| AUDJPY | `assets/fx-audjpy.html` | AUD CME + JPY CME (inv.) | Jan DOUBLE ALIGNMENT LONG; Feb LONG | MRCI-derived |
| CADCHF | `assets/fx-cadchf.html` | CAD CME + CHF CME (inv.) | Jul DOUBLE ALIGNMENT LONG; Dec SHORT | MRCI-derived |
| CADJPY | `assets/fx-cadjpy.html` | CAD CME + JPY CME (inv.) | Mar SHORT standout | MRCI-derived |
| EURCAD | `assets/fx-eurcad.html` | EUR CME + CAD CME (inv.) | May SHORT stand-off; Jun DOUBLE ALIGNMENT LONG; Jul & Nov SHORT | MRCI-derived |
| EURJPY | `assets/fx-eurjpy.html` | EUR CME + JPY CME (inv.) | May, Jul & Nov SHORT strongest | MRCI-derived |
| EURNZD | `assets/fx-eurnzd.html` | EUR CME + NZD CME (inv.) | May MAXIMUM CONFLICT; Jun DOUBLE ALIGNMENT LONG; Dec defining year-end collision | MRCI-derived |
| GBPCAD | `assets/fx-gbpcad.html` | GBP CME + CAD CME (inv.) | Sep MAXIMUM CONFLICT; Oct–Nov DOUBLE ALIGNMENT LONG | MRCI-derived |
| GBPJPY | `assets/fx-gbpjpy.html` | GBP CME + JPY CME (inv.) | Mar & Sep MAXIMUM CONFLICT; Oct–Nov DOUBLE ALIGNMENT LONG | MRCI-derived |
| GBPNZD | `assets/fx-gbpnzd.html` | GBP CME + NZD CME (inv.) | May & Dec defining collisions | MRCI-derived |
| NZDCAD | `assets/fx-nzdcad.html` | NZD CME + CAD CME (inv.) | Sep rare dual-flip collision; Dec clean LONG dominance | MRCI-derived |
| NZDCHF | `assets/fx-nzdchf.html` | NZD CME + CHF CME (inv.) | THREE maximum-conviction collisions (May, Sep, Dec) | MRCI-derived |
| NZDJPY | `assets/fx-nzdjpy.html` | NZD CME + JPY CME (inv.) | Sep defining collision; Dec year-end stand-off | MRCI-derived |

---

## Crypto — Live Assets (1)

| Asset | File | Source | Key Finding |
|-------|------|--------|-------------|
| BTCUSD | `assets/btc.html` | MT5 · TradersWay · price-derived. Statistically derived from MT5 daily history (`backend/pipeline/gen_seasonal_signal.py`) — no Moore Research data exists for crypto | First crypto page; Seasonals + Profiling. ~18 other crypto tickers (incl. MTCUSD) are `PLANNED` cards on the index. See `DATA_DICTIONARY.md` → "Statistically-derived assets" |

---

## Market Profiling — Assets with Profiling Data (14)

Data comes from the pipeline in `backend/` (Python, over full MT5 M1 history from TradersWay) and is copied into `frontend/data/profiling/` by `node scripts/sync_profiling_data.js`. Each asset's data freshness is its `asOf` date in `frontend/data/profiling/manifest.js`.

| Asset key | Page(s) |
|-----------|---------|
| gbpusd, eurusd, audusd, nzdusd, usdcad, usdchf, usdjpy | futures currency page + matching FX pair page (e.g. `gbp.html` + `fx-gbpusd.html`) |
| xauusd, brent, wti, us500, ustech, us30 | `xau.html`, `brent.html`, `cl.html`, `sp500.html`, `nq.html`, `ym.html` |
| btcusd | `btc.html` |

**To refresh:** export new M1 bars from MT5 → merge into `backend/data/raw/<ASSET>_M1_full.csv` with `concat_raw_csv.py` → `python pipeline/refresh_asset.py <ASSET>` (from `backend/`) → `node scripts/sync_profiling_data.js` (from the repo root). Re-running the pipeline without new raw data changes nothing. **To add an asset:** `CONTRIBUTING.md` → "Adding a New Profiling Asset".
