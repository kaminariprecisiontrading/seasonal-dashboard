/**
 * macro.js — Injects a Macro Events panel (Investing.com calendar embed).
 *
 * Two-column layout: calendar (left, fixed width) + collapsible guide (right).
 * Injects <section data-kpt-panel="macro"> before .footnote.
 * ui.js discovers it and adds the Macro tab automatically.
 *
 * Depends on: ASSET_CONFIG.id (loaded before this script).
 * Script load order: data.js → accordion.js → api.js → tradingview.js → macro.js → seasonal-chart.js → upload.js → ui.js
 */
(function () {

  if (typeof ASSET_CONFIG === 'undefined') return;

  /* ─── Investing.com country IDs per currency ─────────────────────────── */
  var CC = {
    USD: '5',
    EUR: '17,26,22',   // Eurozone, Germany, France
    GBP: '4',
    JPY: '35',
    CAD: '6',
    AUD: '25',
    NZD: '43',
    CHF: '12',
    MXN: '71',
    BRL: '32',
    HKD: '39'
  };

  /* ─── Asset → relevant currencies ───────────────────────────────────── */
  var FF_CURRENCIES = {
    aud: ['AUD'], gbp: ['GBP'], jpy: ['JPY'], eur: ['EUR'],
    cad: ['CAD'], chf: ['CHF'], nzd: ['NZD'], usd: ['USD'],
    mxn: ['USD','MXN'], brl: ['USD'],
    xau: ['USD'], xag: ['USD'], copper: ['USD'], platinum: ['USD'], palladium: ['USD'],
    cl: ['USD'], brent: ['USD'], ng: ['USD'], ulsd: ['USD'], rb: ['USD'], gasoil: ['USD'],
    soybeans: ['USD'], sbmeal: ['USD'], sboil: ['USD'],
    wheat: ['USD'], wheatk: ['USD'], wheatm: ['USD'], corn: ['USD'], oats: ['USD'],
    cotton: ['USD'], lumber: ['USD'],
    lc: ['USD'], fc: ['USD'], lh: ['USD'], milk: ['USD'],
    coffee: ['USD'], sugar11: ['USD'], cocoa: ['USD'], oj: ['USD'], roughrice: ['USD'],
    londonsugar: ['GBP','USD'], londoncocoa: ['GBP','USD'], robusta: ['GBP','USD'],
    tbonds: ['USD'], tnotes10: ['USD'], tnotes5: ['USD'], tnotes2: ['USD'],
    eurodollar: ['USD'], fedfunds: ['USD'],
    austbonds10: ['AUD'], austbonds3: ['AUD'], austbills3m: ['AUD'],
    longgilt: ['GBP'], shortsterling: ['GBP'],
    eurobund: ['EUR'], eurobobl: ['EUR'], euroyen: ['JPY','EUR'],
    sp500: ['USD'], es: ['USD'], rty: ['USD'], ym: ['USD'], nq: ['USD'],
    md: ['USD'], gsci: ['USD'],
    nk: ['JPY'], ftse: ['GBP'], spi: ['AUD'],
    dax: ['EUR'], cac: ['EUR'], hsi: ['HKD'],
    'fx-audusd': ['AUD','USD'], 'fx-eurusd': ['EUR','USD'],
    'fx-gbpusd': ['GBP','USD'], 'fx-usdcad': ['USD','CAD'],
    'fx-usdchf': ['USD','CHF'], 'fx-usdjpy': ['USD','JPY'],
    'fx-audcad': ['AUD','CAD'], 'fx-audchf': ['AUD','CHF'],
    'fx-audnzd': ['AUD','NZD'], 'fx-euraud': ['EUR','AUD'],
    'fx-eurchf': ['EUR','CHF'], 'fx-eurgbp': ['EUR','GBP'],
    'fx-gbpaud': ['GBP','AUD'], 'fx-gbpchf': ['GBP','CHF'],
    'fx-nzdusd': ['NZD','USD'],
    'fx-audjpy': ['AUD','JPY'], 'fx-cadchf': ['CAD','CHF'],
    'fx-cadjpy': ['CAD','JPY'], 'fx-eurcad': ['EUR','CAD'],
    'fx-eurjpy': ['EUR','JPY'], 'fx-eurnzd': ['EUR','NZD'],
    'fx-gbpcad': ['GBP','CAD'], 'fx-gbpjpy': ['GBP','JPY'],
    'fx-gbpnzd': ['GBP','NZD'], 'fx-nzdcad': ['NZD','CAD'],
    'fx-nzdchf': ['NZD','CHF'], 'fx-nzdjpy': ['NZD','JPY']
  };

  /* ─── Asset → category ───────────────────────────────────────────────── */
  var ASSET_CLASS = {
    aud:'fx', gbp:'fx', jpy:'fx', eur:'fx', cad:'fx', chf:'fx', nzd:'fx', usd:'fx',
    mxn:'fx', brl:'fx',
    'fx-audusd':'fx','fx-eurusd':'fx','fx-gbpusd':'fx','fx-usdcad':'fx',
    'fx-usdchf':'fx','fx-usdjpy':'fx','fx-audcad':'fx','fx-audchf':'fx',
    'fx-audnzd':'fx','fx-euraud':'fx','fx-eurchf':'fx','fx-eurgbp':'fx',
    'fx-gbpaud':'fx','fx-gbpchf':'fx','fx-nzdusd':'fx',
    'fx-audjpy':'fx','fx-cadchf':'fx','fx-cadjpy':'fx','fx-eurcad':'fx',
    'fx-eurjpy':'fx','fx-eurnzd':'fx','fx-gbpcad':'fx','fx-gbpjpy':'fx',
    'fx-gbpnzd':'fx','fx-nzdcad':'fx','fx-nzdchf':'fx','fx-nzdjpy':'fx',
    tbonds:'rates', tnotes10:'rates', tnotes5:'rates', tnotes2:'rates',
    eurodollar:'rates', fedfunds:'rates',
    austbonds10:'rates', austbonds3:'rates', austbills3m:'rates',
    longgilt:'rates', shortsterling:'rates',
    eurobund:'rates', eurobobl:'rates', euroyen:'rates',
    sp500:'indices', es:'indices', rty:'indices', ym:'indices', nq:'indices',
    md:'indices', gsci:'indices', nk:'indices', ftse:'indices', spi:'indices',
    dax:'indices', cac:'indices', hsi:'indices',
    xau:'metals', xag:'metals', copper:'metals', platinum:'metals', palladium:'metals',
    cl:'energy', brent:'energy', ng:'energy', ulsd:'energy', rb:'energy', gasoil:'energy',
    soybeans:'ags', sbmeal:'ags', sboil:'ags',
    wheat:'ags', wheatk:'ags', wheatm:'ags', corn:'ags', oats:'ags',
    cotton:'ags', lumber:'ags',
    lc:'ags', fc:'ags', lh:'ags', milk:'ags',
    coffee:'ags', sugar11:'ags', cocoa:'ags', oj:'ags', roughrice:'ags',
    londonsugar:'ags', londoncocoa:'ags', robusta:'ags'
  };

  /* ─── Guide content per category ────────────────────────────────────── */
  var GUIDE = {

    fx: [
      { heading: 'Key events to watch',
        items: [
          '<strong>Central bank decisions</strong> — Fed, ECB, BoE, RBA, BoJ, BoC, SNB, RBNZ. The single most powerful scheduled driver.',
          '<strong>CPI (inflation)</strong> — determines whether central banks hike, hold, or cut. Headline and core both matter.',
          '<strong>Employment</strong> — Non-Farm Payrolls (USD), Claimant Count (GBP), Employment Change (AUD/CAD/NZD).',
          '<strong>GDP</strong> — quarterly confirmation of economic trajectory; shapes rate expectations.',
          '<strong>PMI surveys</strong> — forward-looking. Composite PMI above 50 = expansion; below 50 = contraction.'
        ]
      },
      { heading: 'Reading the data',
        body: 'The market reacts to the <em>surprise</em> — how Actual compares to Forecast. The Forecast is already priced in; only the deviation moves price.<br><br>' +
              'Stronger data → central bank stays hawkish → currency bullish<br>' +
              'Weaker data → central bank turns dovish → currency bearish<br><br>' +
              'Central bank forward guidance (tone of statements and press conferences) can override a data print entirely. A hawkish statement on a weak data day will still rally the currency. Watch for revised Forecasts in the lead-up — markets often pre-position.'
      },
      { heading: 'Timing',
        body: 'The biggest moves occur in the first 1–5 minutes after release. Spreads widen sharply at the moment of release — be aware of execution risk. Speeches and testimonies carry less weight than hard data but can shift intraday bias significantly.'
      }
    ],

    rates: [
      { heading: 'Key events to watch',
        items: [
          '<strong>Central bank decisions</strong> — unexpected hike, cut, or hold; and the tone of the statement.',
          '<strong>CPI and PPI</strong> — inflation data is the primary driver of rate expectations and bond prices.',
          '<strong>Employment</strong> — strong jobs data = rate hikes remain on the table = bonds bearish.',
          '<strong>GDP</strong> — economic strength underpins the rate trajectory; weak GDP fuels rate cut expectations.',
          '<strong>Central bank speeches</strong> — forward guidance can shift the yield curve without a formal decision.'
        ]
      },
      { heading: 'Reading the data',
        body: 'Bond futures prices move <em>opposite</em> to yields. When yields rise, futures fall — and vice versa.<br><br>' +
              'Higher inflation → yields rise → bond futures fall (bearish)<br>' +
              'Rate cut expectations → yields fall → bond futures rise (bullish)<br>' +
              'Risk-off / financial stress → flight to bonds → prices rise regardless of data<br><br>' +
              'The seasonal tendency reflects the average directional bias across decades. A major macro surprise — particularly an unexpected central bank decision or CPI shock — can override the seasonal in the short term.'
      },
      { heading: 'Auction results',
        body: 'Bond auction results (bid-to-cover ratio, tail) are a key sentiment indicator for rates markets but do not appear on economic calendars. Check Bloomberg, Reuters, or the relevant Treasury/DMO website directly.'
      }
    ],

    indices: [
      { heading: 'Key events to watch',
        items: [
          '<strong>Non-Farm Payrolls (USD)</strong> — the most-watched monthly release; directly impacts Fed expectations.',
          '<strong>CPI</strong> — high inflation raises rate hike fears, which is typically negative for equities.',
          '<strong>GDP</strong> — confirms growth trajectory; strong GDP bullish unless it raises rate expectations.',
          '<strong>PMI surveys</strong> — forward-looking demand indicator; composite above 50 = expansion.',
          '<strong>Central bank decisions</strong> — the rate hike cycle is the primary macro headwind for equity indices.'
        ]
      },
      { heading: 'Macro regimes',
        body: 'The relationship between macro data and equity direction depends on the current regime:<br><br>' +
              '<strong>Strong growth + low inflation</strong> → equities bullish (goldilocks)<br>' +
              '<strong>Strong growth + high inflation</strong> → mixed (rate hike fears vs growth)<br>' +
              '<strong>Weak growth + falling inflation</strong> → mixed (rate cut hope vs recession fear)<br>' +
              '<strong>Weak growth + high inflation</strong> → equities bearish (stagflation — worst regime)<br><br>' +
              'Identifying which regime the market is currently pricing is more useful than reacting to individual prints.'
      },
      { heading: 'Earnings season',
        body: 'Corporate earnings — the other major driver of equity indices — do not appear on this economic calendar. Earnings season runs roughly 3–6 weeks after each quarter-end. Monitor Yahoo Finance, Earnings Whispers, or your broker for the earnings calendar.'
      }
    ],

    metals: [
      { heading: 'Key events to watch',
        items: [
          '<strong>Fed decisions and forward guidance</strong> — the single strongest macro driver for gold and silver.',
          '<strong>CPI (US)</strong> — real yields (nominal rate minus inflation) are the primary gold framework.',
          '<strong>USD data</strong> — NFP, GDP; USD strength is inversely correlated with gold and silver.',
          '<strong>Chinese PMI and industrial production</strong> — the primary driver for copper, platinum, and palladium.',
          '<strong>Geopolitical events</strong> — not on this calendar; monitor headlines separately.'
        ]
      },
      { heading: 'Reading the data',
        body: '<strong>Gold and silver</strong> — driven by real yields and USD direction.<br>' +
              'Lower real rates or weaker USD → gold/silver bullish<br>' +
              'Higher real rates or stronger USD → gold/silver bearish<br><br>' +
              '<strong>Industrial metals (copper, platinum, palladium)</strong> — driven by global growth expectations.<br>' +
              'Strong Chinese/global PMI → copper and PGMs bullish<br>' +
              'Recession fears or China slowdown → copper and PGMs bearish<br><br>' +
              'Gold also functions as a safe-haven asset. Geopolitical stress and financial market volatility can override the rate/USD relationship in the short term.'
      },
      { heading: 'Further research',
        body: 'Gold: World Gold Council (gold.org) publishes quarterly demand data by sector.<br>Copper: LME warehouse stocks and SHFE inventory are useful supply-side indicators beyond what appears in macro calendars.'
      }
    ],

    energy: [
      { heading: 'Key events to watch',
        items: [
          '<strong>EIA Weekly Petroleum Status (Wednesday)</strong> — crude and products inventory data; the most important weekly release for crude traders.',
          '<strong>EIA Natural Gas Storage (Thursday)</strong> — weekly storage change; primary driver for nat gas price action.',
          '<strong>GDP and PMI surveys</strong> — demand outlook; global growth directly impacts energy consumption.',
          '<strong>USD data</strong> — crude is priced in USD; stronger USD is generally bearish for crude.',
          '<strong>OPEC decisions</strong> — not a regular calendar event; monitor headlines as the dominant supply-side driver.'
        ]
      },
      { heading: 'Reading the data',
        body: '<strong>Crude (WTI / Brent)</strong><br>' +
              'Inventory draw (less than expected) → supply tight → crude bullish<br>' +
              'Inventory build (more than expected) → supply surplus → crude bearish<br><br>' +
              'The EIA report is released Wednesday ~10:30am ET. A larger-than-expected crude draw typically produces an immediate bullish spike; a surprise build produces a sell-off. The magnitude of the surprise matters more than the direction alone.<br><br>' +
              '<strong>Natural Gas</strong> — more seasonal and weather-driven than other energies. Monitor temperature forecasts (heating demand in winter, cooling demand in summer) alongside this calendar. Injection season (Apr–Oct) tends to be bearish; withdrawal season (Nov–Mar) bullish.'
      },
      { heading: 'Baker Hughes Rig Count',
        body: 'Released Friday afternoon — tracks the number of active US oil and gas rigs. A rising rig count signals future supply increases (bearish long-term); a falling count signals tightening supply (bullish). Does not appear on economic calendars — check bhge.com or your data provider.'
      }
    ],

    ags: [
      { heading: 'Key events to watch',
        items: [
          '<strong>USDA WASDE Report (monthly)</strong> — the most important release for all agricultural markets. Covers global supply, demand, and ending stocks. Not on this economic calendar — check USDA.gov directly.',
          '<strong>USDA Export Sales (Thursday)</strong> — weekly net US export commitments; strong sales are bullish.',
          '<strong>USDA Crop Progress (Monday, seasonal)</strong> — condition ratings during the growing season; poor conditions = bullish.',
          '<strong>Cold Storage Reports</strong> — relevant for meats and dairy; tracks inventory levels.',
          '<strong>USD data and risk sentiment</strong> — ags are priced in USD; dollar strength is a headwind.'
        ]
      },
      { heading: 'Reading the data',
        body: 'Agricultural futures are primarily driven by supply and demand fundamentals rather than macro policy. <strong>Weather is often the dominant short-term price driver</strong> and does not appear on this calendar — monitor NOAA forecasts, USDA Crop Progress reports, and drought monitors during growing season.<br><br>' +
              'This economic calendar has limited direct relevance for agricultural futures compared to other asset classes. Use it mainly to monitor:<br>' +
              '· USD direction (ags priced in USD; stronger dollar is a general headwind)<br>' +
              '· Broad global risk sentiment (risk-off flows can sell commodities broadly)<br>' +
              '· Chinese economic data (a key export destination for soybeans, soy products, and cotton)'
      },
      { heading: 'Further research',
        body: 'USDA.gov — WASDE reports, Export Sales, Crop Progress, Grain Stocks, Cattle on Feed.<br>CME Group — commitment of traders data, open interest trends.<br>NOAA.gov — US drought monitor and seasonal outlooks (critical for weather-driven markets).'
      }
    ]

  };

  /* ─── Resolve currencies + country IDs ──────────────────────────────── */
  var currencies = FF_CURRENCIES[ASSET_CONFIG.id] || ['USD'];

  var countryIdSet = {};
  currencies.forEach(function (cur) {
    var ids = (CC[cur] || '5').split(',');
    ids.forEach(function (id) { countryIdSet[id.trim()] = true; });
  });
  var countryIds = Object.keys(countryIdSet).join(',');

  /* ─── Build Investing.com embed URL ─────────────────────────────────── */
  var embedUrl = 'https://sslecal2.investing.com' +
    '?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous' +
    '&features=datepicker,timezone,filters' +
    '&countries=' + countryIds +
    '&importance=2,3' +
    '&calType=week' +
    '&timeZone=20' +
    '&lang=1';

  var ffUrl  = 'https://www.forexfactory.com/calendar';
  var invUrl = 'https://www.investing.com/economic-calendar/';

  /* ─── Build guide HTML ───────────────────────────────────────────────── */
  var category  = ASSET_CLASS[ASSET_CONFIG.id] || 'fx';
  var guideDefs = GUIDE[category] || GUIDE['fx'];

  var guideSectionsHtml = guideDefs.map(function (section) {
    var inner = '';
    if (section.items) {
      inner = '<ul class="macro-guide-list">' +
        section.items.map(function (item) {
          return '<li class="macro-guide-item">' + item + '</li>';
        }).join('') +
      '</ul>';
    } else if (section.body) {
      inner = '<p class="macro-guide-body-text">' + section.body + '</p>';
    }
    return '<div class="macro-guide-section">' +
      '<div class="macro-guide-heading">' + section.heading + '</div>' +
      inner +
    '</div>';
  }).join('');

  var impactLegendHtml =
    '<div class="macro-guide-section macro-guide-section--impact">' +
      '<div class="macro-guide-heading">Impact levels</div>' +
      '<div class="macro-impact-row"><span class="macro-imp macro-imp-high">HIGH</span><span class="macro-imp-desc">Rate decisions, CPI, NFP, GDP — sharp immediate moves expected on release.</span></div>' +
      '<div class="macro-impact-row"><span class="macro-imp macro-imp-med">MED</span><span class="macro-imp-desc">PMI, retail sales, trade balance — significant if the surprise is large.</span></div>' +
      '<div class="macro-impact-row"><span class="macro-imp macro-imp-low">LOW</span><span class="macro-imp-desc">Speeches, CFTC positions, minor data — limited immediate market impact.</span></div>' +
    '</div>';

  /* ─── Build currency chips HTML ─────────────────────────────────────── */
  var chipsHtml = currencies.map(function (c) {
    return '<span class="macro-currency-chip">' + c + '</span>';
  }).join('');

  /* ─── Build the panel ────────────────────────────────────────────────── */
  var panel = document.createElement('section');
  panel.setAttribute('data-kpt-panel', 'macro');
  panel.className = 'macro-panel';

  panel.innerHTML =
    /* Header row */
    '<div class="macro-header">' +
      '<div class="macro-header-left">' +
        '<div class="macro-label">Economic Calendar</div>' +
        '<div class="macro-currencies">' + chipsHtml + '</div>' +
        '<div class="macro-source">Default: Medium &amp; High · use filter bar to adjust · <em>allow ~30 sec to load</em></div>' +
      '</div>' +
      '<div class="macro-links">' +
        '<a class="macro-open-btn" href="' + invUrl + '" target="_blank" rel="noopener">Investing.com ↗</a>' +
        '<a class="macro-open-btn" href="' + ffUrl  + '" target="_blank" rel="noopener">ForexFactory ↗</a>' +
      '</div>' +
    '</div>' +

    /* Two-column body */
    '<div class="macro-body">' +

      /* Left: calendar embed */
      '<div class="macro-embed-outer">' +
        '<iframe class="macro-iframe" src="' + embedUrl + '" frameborder="0" scrolling="yes" allowtransparency="true"></iframe>' +
      '</div>' +

      /* Right: collapsible guide */
      '<div class="macro-guide">' +
        '<details class="macro-guide-toggle" open>' +
          '<summary>How to use this calendar</summary>' +
          '<div class="macro-guide-content">' +
            impactLegendHtml +
            guideSectionsHtml +
          '</div>' +
        '</details>' +
      '</div>' +

    '</div>';

  /* ─── Insert before .footnote ────────────────────────────────────────── */
  var footnote = document.querySelector('.footnote');
  if (footnote) {
    footnote.parentElement.insertBefore(panel, footnote);
  } else {
    (document.querySelector('.container') || document.body).appendChild(panel);
  }

})();
