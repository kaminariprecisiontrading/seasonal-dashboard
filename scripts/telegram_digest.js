/**
 * telegram_digest.js — builds the weekly signal digest and (optionally) posts it to the
 * private Telegram channel (v1.29; docs/AUTOMATION.md).
 *
 * Same data and rules as /this-week (frontend/js/this-week.js), computed through the site's
 * own js/signals.js so the alert can never disagree with the site:
 *   - This week's signals come from this week's snapshot (data/signal_history/YYYY-MM-Wn.json,
 *     written minutes earlier by the snapshot Action) when it exists, else from the manifest.
 *   - Tally + change vs last week; signals that flipped (top N by conviction);
 *     new five-dot signals; coming up (next 4 weeks, conviction ≥ 4, top 3 each).
 *   - Crypto and synthetics get their own sections listing every live asset.
 *   - Every asset line carries its data-source tag from data/asset_sources.js.
 *
 * Usage (from the repo root):
 *   node scripts/telegram_digest.js                 # print the message (dry run)
 *   node scripts/telegram_digest.js --date 2026-10-19
 *   node scripts/telegram_digest.js --send          # needs TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * Options: --top N (flips listed, default 8), --site PATH (default frontend), --url BASE
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = process.argv.slice(2);
const opt = (name, dflt) => (args.includes(name) ? args[args.indexOf(name) + 1] : dflt);
const SITE = path.resolve(opt('--site', path.join(__dirname, '..', 'frontend')));
const SITE_URL = opt('--url', 'https://kpt-seasonals.netlify.app').replace(/\/$/, '');
const TOP = parseInt(opt('--top', '8'), 10);
const SEND = args.includes('--send');
const dateArg = opt('--date', null);

/* ── Load the site's own data + signal logic into one sandbox ─────────────────────────── */
const sb = { console };
sb.window = sb;
vm.createContext(sb);
const read = (rel) => fs.readFileSync(path.join(SITE, rel), 'utf8');
vm.runInContext([
  read('data/signals_manifest.js'),
  read('data/asset_index.js'),
  read('data/asset_sources.js'),
  read('js/signals.js'),
  ';this.__M = SIGNALS_MANIFEST; this.__G = (typeof SIGNALS_GENERATED !== "undefined") ? SIGNALS_GENERATED : null;'
].join('\n;\n'), sb, { filename: 'site-bundle.js' });
const S = sb.KptSignals;

const today = dateArg ? new Date(dateArg + 'T12:00:00') : new Date();
if (isNaN(today)) { console.error('bad --date'); process.exit(2); }
const week = S.weekOf(today);
const prev = S.shiftWeek(week, -1);

/* ── This week's snapshot (exactly what was recorded) ─────────────────────────────────── */
const snapName = week.year + '-' + String(week.month + 1).padStart(2, '0') + '-W' + (week.week + 1);
const snapPath = path.join(SITE, 'data', 'signal_history', snapName + '.json');
const snap = fs.existsSync(snapPath) ? JSON.parse(fs.readFileSync(snapPath, 'utf8')).signals : null;

function sigFromCom(com) {
  const t = S.comToTag(com);
  return { com, signal: t.label, type: t.type, conviction: S.starCount(com) };
}
function sigAt(id, w) {
  if (snap && w.year === week.year && w.month === week.month && w.week === week.week && id in snap) return sigFromCom(snap[id]);
  return S.getSignal(id, w.month, w.week);
}

/* ── Formatting helpers (Telegram HTML) ───────────────────────────────────────────────── */
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const dots = (n) => '●'.repeat(n) + '○'.repeat(5 - n);
const name = (a) => S.displayName(a);
const tag = (a) => { const s = sb.kptSourceOf(a); return s ? '[' + s.short + ']' : '[?]'; };
const line = (a, s, extra) => '• ' + esc(name(a)) + '  ' + (extra || '') + '<b>' + s.signal + '</b> ' + dots(s.conviction) + '  <code>' + esc(tag(a)) + '</code>';

const live = S.liveAssets().filter((a) => S.getSignal(a.id, 0, 0));
const rows = live.map((a) => ({ a, now: sigAt(a.id, week), before: sigAt(a.id, prev) }));
const usedSources = new Set();
const use = (a) => { const s = sb.kptSourceOf(a); if (s) usedSources.add(s.key); return a; };

/* ── Sections ─────────────────────────────────────────────────────────────────────────── */
const out = [];
out.push('<b>KPT Seasonals · ' + esc(S.weekLabel(week)) + '</b>');
out.push(snap ? '<i>Signals as recorded in this week\'s snapshot.</i>' : '<i>No snapshot for this week yet: signals from the current data.</i>');

const tally = (w) => rows.reduce((t, r) => { const s = w === week ? r.now : r.before; if (s) { t[s.type === 'bull' ? 'bull' : s.type === 'bear' ? 'bear' : 'other']++; } return t; }, { bull: 0, bear: 0, other: 0 });
const t = tally(week), tp = tally(prev);
const d = (n, p) => (n - p > 0 ? ' ▲' + (n - p) : n - p < 0 ? ' ▼' + (p - n) : '');
const changed = rows.filter((r) => r.now && r.before && r.now.signal !== r.before.signal);
out.push('');
out.push('BULL <b>' + t.bull + '</b>' + d(t.bull, tp.bull) + '  ·  BEAR <b>' + t.bear + '</b>' + d(t.bear, tp.bear) + '  ·  OTHER <b>' + t.other + '</b>' + d(t.other, tp.other));
out.push('Changed vs last week: <b>' + changed.length + '</b> of ' + rows.length);

const core = (r) => r.a.block === 'forex' || r.a.block === 'futures';
const flips = changed.filter(core).sort((x, y) => y.now.conviction - x.now.conviction);
out.push('');
out.push('<b>Flipped</b>' + (flips.length > TOP ? ' (top ' + TOP + ' of ' + flips.length + ')' : ''));
if (!flips.length) out.push('No changes.');
flips.slice(0, TOP).forEach((r) => out.push(line(use(r.a), r.now, esc(r.before.signal) + ' → ')));

const maxNew = rows.filter((r) => core(r) && r.now && r.now.conviction === 5 && r.before && r.before.conviction < 5);
out.push('');
out.push('<b>New five-dot signals</b>');
if (!maxNew.length) out.push('None this week.');
maxNew.forEach((r) => out.push(line(use(r.a), r.now)));

out.push('');
out.push('<b>Coming up</b> (conviction ≥ 4)');
for (let i = 1; i <= 4; i++) {
  const w = S.shiftWeek(week, i);
  const top = live.filter((a) => a.block === 'forex' || a.block === 'futures')
    .map((a) => ({ a, s: S.getSignal(a.id, w.month, w.week) }))
    .filter((x) => x.s && x.s.conviction >= 4 && (x.s.type === 'bull' || x.s.type === 'bear'))
    .sort((x, y) => y.s.conviction - x.s.conviction).slice(0, 3);
  out.push(esc(S.MONTH_ABBR[w.month].toUpperCase() + ' WK' + (w.week + 1)) + ': ' +
    (top.length ? top.map((x) => { use(x.a); return esc(name(x.a)) + ' ' + x.s.signal + ' <code>' + esc(tag(x.a)) + '</code>'; }).join(', ') : 'nothing above 3 dots'));
}

[['crypto', 'Crypto'], ['synthetics', 'Synthetics']].forEach(([block, title]) => {
  const list = rows.filter((r) => r.a.block === block && r.now);
  if (!list.length) return;
  out.push('');
  out.push('<b>' + title + '</b>');
  list.forEach((r) => out.push(line(use(r.a), r.now, r.before && r.before.signal !== r.now.signal ? esc(r.before.signal) + ' → ' : '')));
  if (block === 'synthetics') out.push('<i>Synthetic indices are random-generated by Deriv; read signals with that in mind.</i>');
});

out.push('');
out.push('<b>Sources</b>');
[...usedSources].sort().forEach((k) => { const s = sb.KPT_SOURCES[k]; out.push('<code>' + esc(s.short) + '</code> ' + esc(s.desc || s.label)); });
out.push('');
out.push('<i>Historical patterns only. Not financial advice.</i>');
out.push(esc(SITE_URL + '/this-week') + '  ·  ' + esc(SITE_URL + '/risk'));

/* ── Split under Telegram's 4096-char limit, on blank lines ───────────────────────────── */
function chunks(lines, max) {
  const parts = []; let cur = '';
  lines.join('\n').split('\n\n').forEach((block) => {
    const next = cur ? cur + '\n\n' + block : block;
    if (next.length > max && cur) { parts.push(cur); cur = block; } else cur = next;
  });
  if (cur) parts.push(cur);
  return parts;
}
const messages = chunks(out, 3900);

async function send() {
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) { console.error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set'); process.exit(2); }
  for (const text of messages) {
    const res = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body.ok) { console.error('Telegram error:', res.status, body.description || ''); process.exit(1); }
  }
  console.log('sent ' + messages.length + ' message(s) for ' + snapName + (snap ? ' (from snapshot)' : ' (from manifest)'));
}

if (SEND) send();
else messages.forEach((m, i) => console.log((i ? '\n----- message ' + (i + 1) + ' -----\n' : '') + m));
