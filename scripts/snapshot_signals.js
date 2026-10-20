/**
 * snapshot_signals.js — archives this week's signals exactly as the site shows them, for
 * the Track Record's *live-recorded* history (NEW_PAGES_BUILD_NOTES.md §3a).
 *
 * Writes data/signal_history/YYYY-MM-Wn.json for the dashboard week slot of the given date
 * (default: today): { week, takenAt, manifestGenerated, signals: { <assetId>: "<com>" } }.
 * KPT-Market-Profiling/pipeline/grade_signals.py grades these snapshots — never the
 * current data — once price data for that week exists. Existing snapshots are never
 * overwritten (history must not be rewritten); pass --force only to repair a bad file.
 *
 * Run once a week, ideally on Monday (same week slot rule as the dashboard: days 1-7 =
 * W1, 8-14 = W2, 15-21 = W3, 22+ = W4), from seasonal-dashboard/ root:
 *   node scripts/snapshot_signals.js [--date YYYY-MM-DD] [--force]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', 'frontend');  // site root — the published directory (v1.27)
const args = process.argv.slice(2);
const dateArg = args.includes('--date') ? args[args.indexOf('--date') + 1] : null;
const force = args.includes('--force');

const d = dateArg ? new Date(dateArg + 'T12:00:00') : new Date();
if (isNaN(d)) throw new Error('bad --date');
const month = d.getMonth(), week = Math.min(3, Math.floor((d.getDate() - 1) / 7));
const name = d.getFullYear() + '-' + String(month + 1).padStart(2, '0') + '-W' + (week + 1);

const sb = {};
vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'signals_manifest.js'), 'utf8') +
  ';this.M = SIGNALS_MANIFEST; this.G = typeof SIGNALS_GENERATED !== "undefined" ? SIGNALS_GENERATED : null;', sb);
const signals = {};
Object.keys(sb.M).sort().forEach(id => { signals[id] = sb.M[id][month * 4 + week]; });

const dir = path.join(ROOT, 'data', 'signal_history');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, name + '.json');
if (fs.existsSync(file) && !force) {
  console.log('exists, not overwritten: data/signal_history/' + name + '.json');
  process.exit(0);
}
fs.writeFileSync(file, JSON.stringify({ week: name, takenAt: new Date().toISOString(), manifestGenerated: sb.G, signals }, null, 1) + '\n', 'utf8');
console.log('wrote data/signal_history/' + name + '.json (' + Object.keys(signals).length + ' assets)');
