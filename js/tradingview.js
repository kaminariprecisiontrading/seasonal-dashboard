/**
 * tradingview.js — Injects TradingView Advanced Chart Widget.
 * Reads ASSET_CONFIG.id (from the asset's data file) and looks up the
 * corresponding TradingView symbol.  If no symbol is found for an asset
 * the section stays empty and no error is thrown.
 *
 * Requires #tv-chart-section > .tv-widget-inner in the page HTML.
 * Chart defaults: Weekly interval · Dark theme · Allow symbol change.
 */
(function () {

  /* ─── TradingView symbol map — all 97 dashboard assets ─────────────── */
  /*
   * CME currency futures use the "6X" ticker format on TradingView,
   * not the full currency name.  Expired contracts (Short Sterling,
   * Eurodollar, Euro-Yen) still show historical data on TradingView.
   */
  var TV_SYMBOLS = {

    /* --- Currencies ---
     * Aligned pairs (futures direction = spot direction): use FX spot.
     * Inverted pairs: spot pair shown with a directional warning label
     *   (futures priced in USD per foreign unit; spot pair is the inverse).
     * USD Index: TVC:DXY is always free in TradingView embeds.
     */
    aud:        'FX:AUDUSD',  // aligned: 6A up = AUDUSD up
    gbp:        'FX:GBPUSD',  // aligned: 6B up = GBPUSD up
    eur:        'FX:EURUSD',  // aligned: 6E up = EURUSD up
    nzd:        'FX:NZDUSD',  // aligned: 6N up = NZDUSD up
    usd:        'FX:EURUSD',  // inverted proxy for DX — see TV_INVERTED below
    jpy:        'FX:USDJPY',  // inverted: 6J up = USDJPY DOWN
    cad:        'FX:USDCAD',  // inverted: 6C up = USDCAD DOWN
    chf:        'FX:USDCHF',  // inverted: 6S up = USDCHF DOWN
    mxn:        'FX:USDMXN',  // inverted: 6M up = USDMXN DOWN
    brl:        'FX:USDBRL',  // inverted: 6L up = USDBRL DOWN

    /* --- Metals --- */
    xau:        'COMEX:GC1!',
    xag:        'COMEX:SI1!',
    copper:     'COMEX:HG1!',
    platinum:   'NYMEX:PL1!',
    palladium:  'NYMEX:PA1!',

    /* --- Energy --- */
    cl:         'NYMEX:CL1!',
    brent:      'ICEEUR:B1!',
    ng:         'NYMEX:NG1!',
    ulsd:       'NYMEX:HO1!',  // Heating Oil / ULSD
    rb:         'NYMEX:RB1!',  // Gasoline RBOB
    gasoil:     'ICEEUR:G1!',  // ICE Gasoil

    /* --- Equity Indices --- */
    sp500:      'CBOE:SPX',     // S&P 500 cash index
    es:         'CME:ES1!',
    rty:        'CME:RTY1!',
    ym:         'CBOT:YM1!',
    nq:         'CME:NQ1!',
    md:         'CME:EMD1!',    // S&P MidCap 400 eMini
    gsci:       'TVC:SPGSCI',   // S&P GSCI (TradingView index feed)
    nk:         'CME:NKD1!',    // Nikkei 225 USD-denominated (CME)
    ftse:       'ICEEUR:Z1!',   // FTSE 100 futures (ICE Futures Europe)
    spi:        'ASX:XJO',      // ASX 200 cash index (proxy for SPI 200)
    dax:        'EUREX:FDAX1!',
    cac:        'EURONEXT:PX1', // CAC 40 cash index (Euronext)
    hsi:        'HKEX:HSI',     // Hang Seng Index

    /* --- Interest Rates --- */
    tbonds:       'CBOT:ZB1!',
    tnotes10:     'CBOT:ZN1!',
    tnotes5:      'CBOT:ZF1!',
    tnotes2:      'CBOT:ZT1!',
    eurodollar:   'CME:GE1!',    // Eurodollar — expired Dec 2024; historical data remains
    austbonds10:  'ASX:XT1!',
    austbonds3:   'ASX:YT1!',
    austbills3m:  'ASX:IR1!',    // 90-Day Bank Bills (ASX/SFE)
    longgilt:     'ICEEUR:R1!',  // Long Gilt (ICE Futures Europe / LIFFE)
    shortsterling:'ICEEUR:L1!',  // Short Sterling — expired 2022; historical data remains
    eurobund:     'EUREX:FGBL1!',
    eurobobl:     'EUREX:FGBM1!',
    euroyen:      'CME:EY1!',    // Euro/Yen cross-currency futures (CME)
    fedfunds:     'CBOT:ZQ1!',

    /* --- Grains (CBOT) --- */
    soybeans:   'CBOT:ZS1!',
    sbmeal:     'CBOT:ZM1!',
    sboil:      'CBOT:ZL1!',
    wheat:      'CBOT:ZW1!',
    wheatk:     'CBOT:KE1!',    // KC Hard Red Winter Wheat
    wheatm:     'MGEX:MWE1!',   // Minneapolis Spring Wheat (MGEX)
    corn:       'CBOT:ZC1!',
    oats:       'CBOT:ZO1!',

    /* --- Softs (ICE US) --- */
    coffee:     'ICEUS:KC1!',
    sugar11:    'ICEUS:SB1!',
    cocoa:      'ICEUS:CC1!',
    oj:         'ICEUS:OJ1!',

    /* --- Softs (LCE / ICE EU + CBOT) --- */
    roughrice:    'CBOT:ZR1!',
    londonsugar:  'ICEEUR:W1!',  // White Sugar No.5 (ICE Futures Europe)
    londoncocoa:  'ICEEUR:C1!',  // London Cocoa (ICE Futures Europe)
    robusta:      'ICEEUR:RC1!', // Robusta Coffee (ICE Futures Europe)

    /* --- Fiber, Meats, Dairy --- */
    cotton:     'ICEUS:CT1!',
    lumber:     'CME:LBR1!',    // Physically-settled Lumber (replaced LBS1! Oct 2023)
    lc:         'CME:LE1!',
    fc:         'CME:GF1!',
    lh:         'CME:HE1!',
    milk:       'CME:DA1!',     // Class III Milk (CME)

    /* --- FX Spot Pairs --- */
    'fx-audusd': 'FX:AUDUSD',
    'fx-eurusd': 'FX:EURUSD',
    'fx-gbpusd': 'FX:GBPUSD',
    'fx-usdcad': 'FX:USDCAD',
    'fx-usdchf': 'FX:USDCHF',
    'fx-usdjpy': 'FX:USDJPY',
    'fx-audcad': 'FX:AUDCAD',
    'fx-audchf': 'FX:AUDCHF',
    'fx-audjpy': 'FX:AUDJPY',
    'fx-audnzd': 'FX:AUDNZD',
    'fx-euraud': 'FX:EURAUD',
    'fx-eurchf': 'FX:EURCHF',
    'fx-eurgbp': 'FX:EURGBP',
    'fx-eurjpy': 'FX:EURJPY',
    'fx-eurcad': 'FX:EURCAD',
    'fx-eurnzd': 'FX:EURNZD',
    'fx-gbpaud': 'FX:GBPAUD',
    'fx-gbpcad': 'FX:GBPCAD',
    'fx-gbpchf': 'FX:GBPCHF',
    'fx-gbpjpy': 'FX:GBPJPY',
    'fx-gbpnzd': 'FX:GBPNZD',
    'fx-nzdusd': 'FX:NZDUSD',
    'fx-nzdcad': 'FX:NZDCAD',
    'fx-nzdchf': 'FX:NZDCHF',
    'fx-nzdjpy': 'FX:NZDJPY',
    'fx-cadchf': 'FX:CADCHF',
    'fx-cadjpy': 'FX:CADJPY'
  };

  /* ─── Substitution metadata ─────────────────────────────────────────── */
  /*
   * TV_INVERTED — spot pair moves OPPOSITE to the futures shown on the dashboard.
   * Each entry: [spot pair name, futures ticker label]
   *
   * TV_PROXY — aligned substitute used because the true futures symbol is
   * paywalled or unavailable in TradingView embeds.
   * Each entry: [what is shown, what it replaces, note suffix]
   */
  /*
   * TV_INVERTED: spot pair is directionally OPPOSITE to the futures.
   * Each entry: [displayName, futuresTicker, optional extra context]
   *
   * TV_PROXY: aligned substitute — direction matches but it is not the true
   * futures contract.  Each entry: [displayName, futuresTicker, note suffix]
   */
  var TV_INVERTED = {
    jpy: ['USDJPY', 'JPY futures (6J)', null],
    cad: ['USDCAD', 'CAD futures (6C)', null],
    chf: ['USDCHF', 'CHF futures (6S)', null],
    mxn: ['USDMXN', 'MXN futures (6M)', null],
    brl: ['USDBRL', 'BRL futures (6L)', null],
    usd: ['EURUSD', 'USD Index futures (DX)', 'EUR accounts for ~58% of DXY weighting, making EURUSD the closest freely available proxy.']
  };

  var TV_PROXY = {
    /* Currency futures → spot FX (direction aligned) */
    aud:   ['AUDUSD (spot FX)',          'AUD/USD futures (6A)', 'Direction aligns — both rise when AUD strengthens.'],
    gbp:   ['GBPUSD (spot FX)',          'GBP/USD futures (6B)', 'Direction aligns — both rise when GBP strengthens.'],
    eur:   ['EURUSD (spot FX)',          'EUR/USD futures (6E)', 'Direction aligns — both rise when EUR strengthens.'],
    nzd:   ['NZDUSD (spot FX)',          'NZD/USD futures (6N)', 'Direction aligns — both rise when NZD strengthens.'],
    /* Index cash proxies */
    sp500: ['SPX cash index',            'S&P 500 futures (SP)',  'Tracks futures closely; negligible basis on weekly charts.'],
    spi:   ['ASX 200 cash index (XJO)',  'SPI 200 futures',       'Tracks futures closely; negligible basis on weekly charts.'],
    cac:   ['CAC 40 cash index',         'CAC 40 futures (FCE)',  'Tracks futures closely; negligible basis on weekly charts.'],
    gsci:  ['SPGSCI index (TVC)',        'GSCI futures',          'Computed index — closest freely available representation of the GSCI.']
  };

  /* ─── Resolve asset ID and symbol ───────────────────────────────────── */
  var id       = (typeof ASSET_CONFIG !== 'undefined') ? ASSET_CONFIG.id : null;
  // ASSET_CONFIG.tvSymbol overrides the built-in table (e.g. to use a CFD or spot ticker)
  var symbol   = id ? (ASSET_CONFIG.tvSymbol || TV_SYMBOLS[id] || null) : null;
  var wrap     = document.getElementById('tv-chart-section');
  var inverted = id && TV_INVERTED[id] ? TV_INVERTED[id] : null;
  var proxy    = id && TV_PROXY[id]    ? TV_PROXY[id]    : null;

  if (!symbol || !wrap) return; // no symbol mapped, or section missing → silent exit

  var inner = wrap.querySelector('.tv-widget-inner');
  if (!inner) return;

  /* ─── Skeleton shimmer placeholder ──────────────────────────────────── */
  var container = wrap.querySelector('.tradingview-widget-container');
  if (container) {
    var skel = document.createElement('div');
    skel.className = 'tv-skeleton';
    container.appendChild(skel);
    // Fade out skeleton after iframe has had time to paint
    setTimeout(function () {
      skel.style.transition = 'opacity 0.6s';
      skel.style.opacity = '0';
      setTimeout(function () {
        if (skel.parentElement) skel.parentElement.removeChild(skel);
      }, 700);
    }, 5000);
  }

  /* ─── Helper: build and insert a note banner ─────────────────────────── */
  function insertBanner(html, isWarning) {
    var amber  = 'color:var(--chop,#f59e0b);background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);';
    var muted  = 'color:var(--muted,#94a3b8);background:rgba(148,163,184,0.06);border:1px solid rgba(148,163,184,0.18);';
    var el = document.createElement('div');
    el.style.cssText = (isWarning ? amber : muted) +
      'font-size:11px;border-radius:5px;padding:6px 10px;margin-bottom:8px;letter-spacing:0.4px;line-height:1.5;';
    el.innerHTML = html;
    var container = wrap.querySelector('.tradingview-widget-container');
    if (container) wrap.insertBefore(el, container);
  }

  /* ─── Inversion warning (amber) ─────────────────────────────────────── */
  if (inverted) {
    insertBanner(
      '&#9651;&nbsp; Chart shows <strong>' + inverted[0] + '</strong> &mdash; ' +
      'the true ' + inverted[1] + ' is restricted to TradingView subscribers and cannot be embedded here. ' +
      'Shown as the nearest freely available proxy. ' +
      '<em>Note: this chart is directionally inverse</em> &mdash; a ' +
      '<span style="color:var(--bull,#22c55e)">BULL</span> signal on the futures = ' +
      '<strong>' + inverted[0] + ' falling</strong>.' +
      (inverted[2] ? ' ' + inverted[2] : ''),
      true
    );
  }

  /* ─── Proxy note (muted) ─────────────────────────────────────────────── */
  if (proxy) {
    insertBanner(
      '&#9432;&nbsp; Chart shows <strong>' + proxy[0] + '</strong> &mdash; ' +
      'the true ' + proxy[1] + ' is restricted to TradingView subscribers and cannot be embedded here. ' +
      proxy[2],
      false
    );
  }

  /* ─── Inject TradingView widget script ──────────────────────────────── */
  var script    = document.createElement('script');
  script.type   = 'text/javascript';
  script.src    = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  script.async  = true;
  script.text   = JSON.stringify({
    width:              '100%',
    height:             430,
    symbol:             symbol,
    interval:           'W',
    timezone:           'Etc/UTC',
    theme:              'dark',
    style:              '1',
    locale:             'en',
    allow_symbol_change: true,
    calendar:           false,
    support_host:       'https://www.tradingview.com'
  });

  inner.appendChild(script);

})();
