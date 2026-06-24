# DATA_DICTIONARY.md — Data File Schema Reference

Complete field-by-field reference for all objects defined in `data/*.js` files. Each asset file defines two things: `ASSET_CONFIG` (static asset metadata) and `MONTHS[]` (seasonal analysis, 12 entries). Some files also define a legacy `SEASONAL_DATA` string, now used only as a fallback.

---

## ASSET_CONFIG

A `const` object exported at file scope. Consumed by `accordion.js`, `api.js`, `tradingview.js`, `backtest.js`, `intraday.js`, `macro.js`, `seasonal-chart.js`, and `ui.js`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✓ | Asset identifier. Must be unique across all 97 files. Used as: localStorage key prefix (`kpt-bt-{id}`, `kpt-idt-{id}`, `kpt-ai-{id}-*`), index card `data-id` attribute. Use lowercase ASCII, hyphens allowed. FX pairs prefix with `fx-` (e.g. `fx-audusd`). |
| `name` | `string` | ✓ | Display name shown in the dashboard header (e.g. `"AUD / USD"`, `"Gold (XAU)"`). |
| `sub` | `string` | ✓ | Subtitle shown below the header name. Typically lists TF labels and data source. |
| `footnote` | `string` | ✓ | Copyright and source statement rendered at page bottom. Should credit Moore Research Center, contract exchange, TF years, and date range. |
| `ltLabel` | `string` | ✓ | Display label for the long-term timeframe column (e.g. `"34-YR"`, `"40-YR"`, `"Long-YR"`). Used in accordion headers, AI prompt, and `_buildSeasonalSummary()`. |
| `ltSigKey` | `string` | ✓ | Field name for the long-term signal at **month level** in `MONTHS[]`. Must match the key used in month objects. Values: `"sig34"`, `"sig35"`, `"sig40"`, `"sigLt"`. |
| `ltKey` | `string` | ✓ | Field name for the long-term signal at **week level** in `MONTHS[].weeks[]`. Must match the key used in week objects. Values: `"s34"`, `"s35"`, `"s40"`, `"sLt"`. |
| `ltAccent` | `string` | ✓ | Hex colour for the long-term TF column header and seasonal curve line. All assets currently use `"#2563eb"` (blue). |
| `tvSymbol` | `string` | — | *Optional.* TradingView symbol string to override the default from `tradingview.js`'s built-in table (e.g. `"CME:AUD1!"`). If omitted, the built-in table is used. Set this when the built-in symbol is wrong or you want to use a CFD/spot ticker instead of the exchange futures contract. |

### Futures vs Forex ASSET_CONFIG

**Futures assets** use a numeric long-term TF:
```javascript
ltLabel:  "34-YR",
ltSigKey: "sig34",
ltKey:    "s34",
```

**Forex pairs** use the generic long-term label (because they are derived from two futures sources, each with a different TF):
```javascript
ltLabel:  "Long-YR",
ltSigKey: "sigLt",
ltKey:    "sLt",
```

---

## MONTHS[]

An array of exactly **12 objects**, one per calendar month (index 0 = January, index 11 = December). Consumed by `accordion.js` (builds the accordion and sub-tab tables), `api.js` (`_buildSeasonalSummary()`, `_buildCurveCtx()`), `seasonal-chart.js` (Trend curve), and `intraday.js` (signal filter).

### Month-level fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `month` | `string` | ✓ | Full month name (`"January"` … `"December"`). Used in accordion row labels and AI prompt headings. |
| `sig5` | `string` | ✓ | 5-Year seasonal signal for the month as a whole. See **Signal Values** below. |
| `sig15` | `string` | ✓ | 15-Year seasonal signal for the month as a whole. |
| `sig34` / `sig35` / `sig40` / `sigLt` | `string` | ✓ | Long-term seasonal signal for the month as a whole. The field name must match `ASSET_CONFIG.ltSigKey`. Only one of these four variants is present per file. |
| `combined` | `string` | ✓ | Combined signal for the month — the synthesised verdict across all three TFs. See **Signal Values**. Used by `intraday.js` signal filter to classify which signal applied to each trading day. |
| `combinedLabel` | `string` | ✓ | Human-readable combined signal label (e.g. `"LONG"`, `"SHORT"`, `"MIXED"`, `"FLIP MONTH"`, `"NEUTRAL"`). Shown in accordion month header and index signal chips. |
| `stars` | `number` | ✓ | Conviction rating, 1–5. Rendered as `★` filled / `☆` empty. 5 = highest conviction, 1 = lowest. |
| `note` | `string` | ✓ | One-sentence description of the month's overall seasonal character. Shown in month accordion header and included in AI prompt output. |
| `weeks` | `array` | ✓ | Array of exactly 4 week objects. See **Week-level fields** below. |

### Week-level fields (inside `MONTHS[n].weeks[]`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `wk` | `string` | ✓ | Week label (always `"Wk 1"`, `"Wk 2"`, `"Wk 3"`, `"Wk 4"`). |
| `s5` | `string` | ✓ | 5-Year signal for this specific week. See **Signal Values**. |
| `s15` | `string` | ✓ | 15-Year signal for this specific week. |
| `s34` / `s35` / `s40` / `sLt` | `string` | ✓ | Long-term signal for this week. Field name must match `ASSET_CONFIG.ltKey`. Only one variant per file. |
| `com` | `string` | ✓ | Combined week verdict string. Format: `"DIRECTION ★★★☆☆"` (stars embedded). Used in accordion week rows and `_buildSeasonalSummary()`. Also used by `intraday.js` to derive the signal for that week (`com` is parsed for `LONG`/`SHORT`/`CHOP`/`FLIP` substring). |
| `note` | `string` | ✓ | Action note for this week. Shown in accordion week row. Included in AI prompt. |

---

## Signal Values

The vocabulary used for `sig5`, `sig15`, `sig34/35/40/Lt`, `combined`, `s5`, `s15`, `s34/35/40/Lt` fields.

| Value | CSS Class | Colour | Meaning |
|-------|-----------|--------|---------|
| `"bull"` | `.bull` | Green (`#22c55e`) | Seasonal directional bias is upward |
| `"bear"` | `.bear` | Red (`#ef4444`) | Seasonal directional bias is downward |
| `"chop"` | `.chop` | Amber (`#f59e0b`) | No clear directional bias; range-bound or conflicted |
| `"flip"` | `.flip` | Amber (`#f59e0b`) | Transition month — direction reverses mid-period (usually month-level only) |

The `combined` field at month level can also take `"flip"` when the month spans a directional reversal (e.g. bullish Wk1 then bearish Wk2–4).

---

## combinedLabel Values

The `combinedLabel` string is not constrained to a fixed set, but the following conventions are used across all 97 files:

| combinedLabel | Typical Use |
|---------------|-------------|
| `"LONG"` | Strong or moderate bull signal across TFs |
| `"SHORT"` | Strong or moderate bear signal across TFs |
| `"MIXED"` | TFs disagree — some bull, some bear or chop |
| `"NEUTRAL"` | All TFs in chop; no directional edge |
| `"FLIP MONTH"` | Reversal month — signal changes direction during the month |
| `"AVOID"` | Extremely choppy or unreliable — no trade |

---

## `com` Field (Week Level) — Parsing Convention

`com` is a free-form string but follows a pattern that several modules parse programmatically:

```
"DIRECTION ★★★★☆"
```

`intraday.js` determines the week's signal for filtering purposes by checking whether `com` contains `LONG`, `SHORT`, `CHOP`, or `FLIP` (case-sensitive substring match). Ensure `com` always starts with one of these keywords. Examples:

```javascript
com: "LONG ★★★★★"          // → intraday maps to 'bull'
com: "SHORT ★★★★☆"         // → intraday maps to 'bear'
com: "NEUTRAL ★★☆☆☆"       // → intraday maps to 'chop'
com: "FLIP ★★★★☆"           // → intraday maps to 'flip'
com: "LONG → FLIP ★★★★☆"   // → intraday maps to 'bull' (LONG found first)
com: "SHORT / COVER ★★★☆☆" // → intraday maps to 'bear'
com: "HOLD ★★★☆☆"           // → intraday maps to 'chop' (no keyword matched)
```

---

## SEASONAL_DATA (Legacy Fallback)

A `const` string at file scope containing a structured plain-text representation of the seasonal analysis. Present in most files for historical reasons.

**Status as of v1.5:** This string is no longer the primary source for the AI prompt. `api.js` calls `_buildSeasonalSummary()` which generates an equivalent structured text live from `MONTHS[]`. `SEASONAL_DATA` is only used if `MONTHS` is undefined at runtime — which should never happen in normal operation.

**Maintenance:** Do not update this string when you update `MONTHS[]`. The two can legitimately diverge — `_buildSeasonalSummary()` will always reflect the current `MONTHS[]` data regardless. If a future refactor removes this legacy string entirely, no functionality is lost.

---

## localStorage Keys

These keys are written by the shared JS modules and keyed by `ASSET_CONFIG.id`:

| Key | Written by | Contents |
|-----|-----------|----------|
| `kpt-bt-{id}` | `backtest.js` | Computed History tab stats (schemaVer, win rates, heatmap, avg returns) |
| `kpt-idt-{id}` | `intraday.js` | Computed Sessions tab stats (schemaVer: 3, hourly, by-session, by-DoW) |
| `kpt-ai-{id}-{provider}-{year}-w{week}` | `api.js` | Cached AI analysis text, provider-scoped, weekly |
| `kpt-cfg-claude-key` | `api.js` | Anthropic API key (global, not per-asset) |
| `kpt-cfg-gemini-key` | `api.js` | Google Gemini API key (global) |
| `kpt-cfg-ollama-url` | `api.js` | Ollama server URL (global) |
| `kpt-cfg-ollama-mdl` | `api.js` | Ollama model name (global) |
| `kpt-cfg-provider` | `api.js` | Last-selected provider (`claude` / `gemini` / `ollama`) |
| `kpt-tz-{id}` | `intraday.js` | Broker UTC offset in hours (e.g. `2` for EET) |
| `kpt-subtab-{id}` | `ui.js` | Last-selected sub-tab on the Seasonals tab |
