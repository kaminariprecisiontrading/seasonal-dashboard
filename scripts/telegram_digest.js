/**
 * telegram_digest.js — builds the weekly signal digest and (optionally) posts it to the
 * private Telegram channel (v1.29; docs/AUTOMATION.md).
 *
 * Same data and rules as /this-week (frontend/js/this-week.js), computed through the site's
 * own js/signals.js so the alert can never disagree with the site:
 *   - This week's signals come from this week's snapshot (data/signal_history/YYYY-MM-Wn.json,
 *     written minutes earlier by the snapshot Action) when it exists, else from the manifest.
 *   - Tally + change vs last week, then three sections: new five-dot signals, signals that
 *     flipped (top N by conviction), and coming up (next 4 weeks, conviction ≥ 4, top 3 per week).
 *     Each section has the same subheadings: Forex, Futures, Crypto (and Synthetics once there
 *     are live synthetic assets). A subheading with nothing under it says so.
 *   - A short "All current signals" block lists every live crypto/synthetic asset.
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
const bold = (s) => '<b>' + s + '</b>';
const ital = (s) => '<i>' + s + '</i>';
const dots = (n) => '●'.repeat(n) + '○'.repeat(5 - n);
const name = (a) => S.displayName(a);
const tag = (a) => { const s = sb.kptSourceOf(a); return s ? '[' + s.short + ']' : '[?]'; };
const line = (a, s, extra) => '• ' + esc(name(a)) + '  ' + (extra || '') + bold(s.signal) + ' ' + dots(s.conviction) + '  <code>' + esc(tag(a)) + '</code>';
const glyph = (type) => (type === 'bull' ? '▲' : type === 'bear' ? '▼' : '•');
const dirRank = (type) => (type === 'bull' ? 0 : type === 'bear' ? 1 : 2);

const live = S.liveAssets().filter((a) => S.getSignal(a.id, 0, 0));
const rows = live.map((a) => ({ a, now: sigAt(a.id, week), before: sigAt(a.id, prev) }));
const usedSources = new Set();
const use = (a) => { const s = sb.kptSourceOf(a); if (s) usedSources.add(s.key); return a; };

// Subheadings under every section. A block with no live assets (synthetics, for now) is skipped,
// and shows up by itself once it has some.
const CATS = [['forex', 'Forex'], ['futures', 'Futures'], ['crypto', 'Crypto'], ['synthetics', 'Synthetics']]
  .filter(([block]) => live.some((a) => a.block === block));

// "1–7 Nov": weeks are days 1-7, 8-14, 15-21, and 22 to the end of the month.
function weekRange(w) {
  const first = w.week * 7 + 1;
  const last = w.week < 3 ? first + 6 : new Date(w.year, w.month + 1, 0).getDate();
  return first + '–' + last + ' ' + S.MONTH_ABBR[w.month];
}

// Items → one line per direction and source ("▲ BULL [tag]: A, B"), bulls first, then bears.
function groupLines(items, flaggedAs) {
  const groups = new Map();
  items.forEach(({ a, s }) => {
    const src = sb.kptSourceOf(a);
    const key = s.type + '|' + s.signal + '|' + (src ? src.key : '');
    if (!groups.has(key)) groups.set(key, { a, s, names: [] });
    groups.get(key).names.push(esc(name(use(a))) + (flaggedAs && flaggedAs(a) ? ' (flipped below)' : ''));
  });
  return [...groups.values()]
    .sort((x, y) => dirRank(x.s.type) - dirRank(y.s.type))
    .map((g) => glyph(g.s.type) + ' ' + bold(g.s.signal) + ' <code>' + esc(tag(g.a)) + '</code>: ' + g.names.join(', '));
}

/* ── Sections ─────────────────────────────────────────────────────────────────────────── */
const out = [];
out.push(bold('KPT Seasonals · ' + esc(S.weekLabel(week))) + ' ' + ital('(' + weekRange(week) + ')'));
out.push(esc(SITE_URL + '/this-week'));
if (!snap) out.push(ital('No snapshot for this week yet: signals from the current data.'));

// "—— TITLE note ——": the title in bold capitals, the plain-English note in italics.
const head = (title, note, sep) => '—— ' + bold(title) + (note ? (sep || ' ') + ital(note) : '') + ' ——';

// Heading, a blank line, then Forex / Futures / Crypto each on their own, with a blank line between groups.
function catSection(heading, bodyFor, emptyText) {
  out.push('');
  out.push(heading);
  out.push('');
  CATS.forEach(([block, title], i) => {
    if (i) out.push('');
    out.push(bold(title + ':'));
    const lines = bodyFor(block);
    if (lines.length) lines.forEach((l) => out.push(l)); else out.push(ital(typeof emptyText === 'function' ? emptyText(block) : emptyText));
  });
}

const tally = (w) => rows.reduce((t, r) => { const s = w === week ? r.now : r.before; if (s) { t[s.type === 'bull' ? 'bull' : s.type === 'bear' ? 'bear' : 'other']++; } return t; }, { bull: 0, bear: 0, other: 0 });
const t = tally(week), tp = tally(prev);
const d = (n, p) => (n - p > 0 ? ' (+' + (n - p) + ')' : n - p < 0 ? ' (−' + (p - n) + ')' : '');
const changed = rows.filter((r) => r.now && r.before && r.now.signal !== r.before.signal);
out.push('');
out.push('▲ BULL ' + bold(t.bull) + d(t.bull, tp.bull) + '  ·  ▼ BEAR ' + bold(t.bear) + d(t.bear, tp.bear) + '  ·  OTHER ' + bold(t.other) + d(t.other, tp.other));
out.push('Changed vs last week: ' + bold(changed.length) + ' of ' + rows.length);
out.push(ital('● = conviction: 5 of 5 dots is the strongest'));

const flips = changed.slice().sort((x, y) => y.now.conviction - x.now.conviction);
const shownFlips = flips.slice(0, TOP);
const flippedIds = new Set(shownFlips.map((r) => r.a.id));
const maxNew = rows.filter((r) => r.now && r.now.conviction === 5 && r.before && r.before.conviction < 5);

catSection(
  head('NEW 5-DOT SIGNALS', 'Highest conviction (' + maxNew.length + ')', ' - '),
  (block) => groupLines(maxNew.filter((r) => r.a.block === block).map((r) => ({ a: r.a, s: r.now })), (a) => flippedIds.has(a.id)),
  'None this week');

catSection(
  head('FLIPPED', flips.length > TOP ? '(top ' + TOP + ' of ' + flips.length + ')' : ''),
  (block) => shownFlips.filter((r) => r.a.block === block).map((r) => line(use(r.a), r.now, esc(r.before.signal) + ' → ')),
  // "None" must mean nothing flipped, not that the cap hid it
  (block) => { const hidden = flips.filter((r) => r.a.block === block).length; return hidden ? 'No top-' + TOP + ' flips (' + hidden + ' more flipped)' : 'None this week'; });

const nextWeeks = [1, 2, 3, 4].map((n) => S.shiftWeek(week, n));
catSection(
  head('COMING UP', '(conviction = 4 dots or higher)'),
  (block) => nextWeeks.map((w) => {
    const top = live.filter((a) => a.block === block)
      .map((a) => ({ a, s: S.getSignal(a.id, w.month, w.week) }))
      .filter((x) => x.s && x.s.conviction >= 4 && (x.s.type === 'bull' || x.s.type === 'bear'))
      .sort((x, y) => y.s.conviction - x.s.conviction).slice(0, 3);
    if (!top.length) return null;
    const oneSource = new Set(top.map((x) => tag(x.a))).size === 1;   // tag once at the end when they all share it
    const groups = new Map();
    top.forEach(({ a, s }) => {
      const key = s.type + (oneSource ? '' : '|' + tag(a));
      if (!groups.has(key)) groups.set(key, { a, s, names: [] });
      groups.get(key).names.push(esc(name(use(a))));
    });
    const parts = [...groups.values()].map((g) => glyph(g.s.type) + ' ' + g.names.join(', ') + (oneSource ? '' : ' <code>' + esc(tag(g.a)) + '</code>'));
    return bold(esc(S.MONTH_ABBR[w.month].toUpperCase() + ' WK' + (w.week + 1))) + ': ' + parts.join('  ·  ') + (oneSource ? '  <code>' + esc(tag(top[0].a)) + '</code>' : '');
  }).filter(Boolean),
  'None in the next 4 weeks');

const standing = CATS.filter(([block]) => block === 'crypto' || block === 'synthetics');
if (standing.length) {
  out.push('');
  out.push(head('ALL CURRENT SIGNALS'));
  out.push('');
  standing.forEach(([block, title], i) => {
    if (i) out.push('');
    out.push(bold(title + ':'));
    rows.filter((r) => r.a.block === block && r.now)
      .forEach((r) => out.push(line(use(r.a), r.now, r.before && r.before.signal !== r.now.signal ? esc(r.before.signal) + ' → ' : '')));
    if (block === 'synthetics') out.push(ital('Synthetic indices are random-generated by Deriv; read signals with that in mind.'));
  });
}

out.push('');
out.push(head('SOURCES'));
[...usedSources].sort().forEach((k) => { const s = sb.KPT_SOURCES[k]; out.push('<code>' + esc(s.short) + '</code> ' + esc(s.desc || s.label)); });
out.push('');
out.push(ital('Historical patterns only. Not financial advice.'));
out.push('');
out.push('This week (' + esc(SITE_URL + '/this-week') + ')  ·  Risk disclosure (' + esc(SITE_URL + '/risk') + ')');

/* ── Split under Telegram's 4096-char limit, on blank lines ───────────────────────────── */
function chunks(lines, max) {
  const parts = []; let cur = '';
  const blocks = [];
  lines.join('\n').split('\n\n').forEach((block) => {      // a heading stays with the block under it
    const last = blocks.length - 1;
    if (last >= 0 && /^—— .* ——$/.test(blocks[last])) blocks[last] += '\n\n' + block; else blocks.push(block);
  });
  blocks.forEach((block) => {
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
