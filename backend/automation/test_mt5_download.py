"""Tests for mt5_download.py against a fake MetaTrader5 module. Needs no terminal, and only writes to a
temp folder. Run from backend/:  python automation/test_mt5_download.py"""
import datetime as dt
import json
import os
import shutil
import sys
import tempfile
import types

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mt5_download as d  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

UTC = dt.timezone.utc
pass_n = fail_n = 0


def ok(c, m, x=''):
    global pass_n, fail_n
    if c:
        pass_n += 1
    else:
        fail_n += 1
    print(('PASS ' if c else 'FAIL ') + m + (f' — {x}' if x != '' else ''))


class Clock:
    t = 0.0


d.time = types.SimpleNamespace(monotonic=lambda: Clock.t, sleep=lambda s: setattr(Clock, 't', Clock.t + s))


def ts(*a):
    return int(dt.datetime(*a, tzinfo=UTC).timestamp())


def bar(t):
    # Same OHLC per minute everywhere, so overlap always matches unless a test changes it.
    v = 1.1 + (t % 600) / 1e6
    return {'time': t, 'open': v, 'high': v + 1e-4, 'low': v - 1e-4, 'close': v, 'tick_volume': 5, 'real_volume': 0, 'spread': 3}


def row(t):
    x = dt.datetime.fromtimestamp(t, UTC)
    b = bar(t)
    return f"{x:%Y.%m.%d}\t{x:%H:%M:%S}\t{b['open']:.5f}\t{b['high']:.5f}\t{b['low']:.5f}\t{b['close']:.5f}\t5\t0\t3\n"


class Fake:
    """history: list of bar times. visible(read_no) → how many of them this read can see."""
    TIMEFRAME_M1 = 1

    def __init__(self, history, visible=None, tick=None, connected=None, ipc_on=(), init_ok=True):
        self.history, self.visible, self.reads = sorted(history), visible or (lambda n: 10 ** 9), 0
        self.tick = tick if tick is not None else (self.history[-1] if self.history else 0)
        self.connected, self.ipc_on, self.calls, self.err = connected or (lambda n: True), set(ipc_on), 0, (1, 'Success')
        self.init_ok, self.shutdowns, self.inits, self.conn_calls = init_ok, 0, 0, 0

    def initialize(self, path=None):
        self.inits += 1
        self.err = (1, 'Success')
        return self.init_ok

    def shutdown(self):
        self.shutdowns += 1

    def last_error(self):
        return self.err

    def terminal_info(self):
        self.conn_calls += 1
        return types.SimpleNamespace(connected=self.connected(self.conn_calls))

    def symbol_select(self, s, on):
        return True

    def symbol_info(self, s):
        return types.SimpleNamespace(digits=5, time=self.tick)

    def _now(self):
        return self.history[:self.visible(self.reads)]

    def copy_rates_from_pos(self, s, tf, pos, n):
        h = self._now()
        return [bar(h[-1])] if h else []

    def copy_rates_range(self, s, tf, a, b):
        self.calls += 1
        if self.calls in self.ipc_on:
            self.err = (-10001, 'IPC send failed')
            return None
        self.reads = self.calls
        lo, hi = int(a.timestamp()), int(b.timestamp())
        return [bar(t) for t in self._now() if lo <= t <= hi]


CFG = {'download': {'overlap_days': 1, 'chunk_days': 20, 'min_overlap_match': 0.98, 'complete_day_after': '23:50',
                    'connect_timeout_seconds': 30, 'sync_timeout_seconds': 60, 'sync_poll_seconds': 5, 'sync_stable_reads': 3,
                    'end_tolerance_minutes': 5, 'max_gap_days': {'5d': 2, '7d': 2.5}}}
TMP = tempfile.mkdtemp(prefix='mt5t')
d.RAW, d.INCOMING = TMP, os.path.join(TMP, 'incoming')
real_now = dt.datetime


class FixedNow(dt.datetime):
    now_value = None

    @classmethod
    def now(cls, tz=None):
        return cls.now_value


d.dt = types.SimpleNamespace(datetime=FixedNow, timedelta=dt.timedelta, timezone=dt.timezone)


def setup(key, last, now):
    FixedNow.now_value = FixedNow.fromtimestamp(now, UTC)
    shutil.rmtree(d.INCOMING, ignore_errors=True)
    hist = [last - 60 * i for i in range(2000, -1, -1)]
    with open(d.full_csv(key), 'w', newline='') as f:
        f.write(d.HEADER)
        for t in hist:
            f.write(row(t))
    return hist


def minutes(a, b):
    return list(range(a, b + 1, 60))


def run(fake, key='EURUSD', week='5d', dry=False, accept=()):
    Clock.t = 0
    return d.download_asset(fake, {'key': key, 'symbol': key, 'week': week}, CFG, dry_run=dry, log=lambda m: None, accept_gap=accept)


def written():
    return sorted(os.listdir(d.INCOMING)) if os.path.isdir(d.INCOMING) else []


# Common calendar: file ends Fri 2026-10-23 23:59; run on Sun 2026-11-01 12:00 UTC, with a full week of new bars.
LAST = ts(2026, 10, 23, 23, 59)
NOW = ts(2026, 11, 1, 12, 0)
WEEK = minutes(ts(2026, 10, 26, 0, 0), ts(2026, 10, 30, 23, 59))

# 1 settling: loads over several reads; final file has all of it
h = setup('EURUSD', LAST, NOW)
full = h + WEEK
f = Fake(full, visible=lambda n: len(h) + min(len(WEEK), 1000 * n))
r = run(f)
ok(r['status'] == 'ok' and r['bars'] == len(WEEK), 'partial reads: waits until all bars are in', f"{r.get('bars')} of {len(WEEK)} after {f.calls} reads")
ok(len(written()) == 1, '  ...one file written')
ok(f.calls > 2 and Clock.t > 0, '  ...it really polled')

# 2 never finishes: stuck short of the latest tick, count stable
h = setup('EURUSD', LAST, NOW)
f = Fake(h + WEEK, visible=lambda n: len(h) + 500, tick=WEEK[-1])
r = run(f)
ok(r['status'] == 'error' and 'still loading' in r['msg'] and not written(), 'stuck short of the latest tick: error, nothing written', r['msg'][:60])

# 3 the exact dry-run case: stops one day after the file, ticks live, count stable
h = setup('EURUSD', ts(2026, 9, 3, 23, 59), ts(2026, 11, 5, 9, 0))
oneday = minutes(ts(2026, 9, 4, 0, 0), ts(2026, 9, 4, 18, 30))
f = Fake(h + oneday, tick=ts(2026, 11, 5, 11, 0))
r = run(f)
ok(r['status'] == 'error' and not written(), 'the real dry-run case (1,111 bars, ticks live): refused', r['msg'][:60])

# 4 same, but ticks stale too: the age check catches it
h = setup('EURUSD', ts(2026, 9, 3, 23, 59), ts(2026, 11, 5, 9, 0))
f = Fake(h + oneday)
r = run(f)
ok(r['status'] == 'error' and 'days ago' in r['msg'] and not written(), 'history and ticks both stale: refused by age', r['msg'][:60])
r = run(Fake(h + oneday), accept=('EURUSD',))
ok(r['status'] == 'ok', '  ...--accept-gap lets it through')

# 5 hole in the middle
h = setup('EURUSD', LAST, ts(2026, 11, 22, 12, 0))
hole = minutes(ts(2026, 10, 26, 0, 0), ts(2026, 10, 27, 23, 59)) + minutes(ts(2026, 11, 16, 0, 0), ts(2026, 11, 20, 23, 59))
r = run(Fake(h + hole))
ok(r['status'] == 'error' and 'gap' in r['msg'] and not written(), 'hole in the new bars: refused', r['msg'][:60])
r = run(Fake(h + hole), accept=('EURUSD',))
ok(r['status'] == 'ok' and len(written()) == 1, '  ...merges with --accept-gap')

# 6 long holiday within the limit: Fri → Tue, 4 days
h = setup('EURUSD', ts(2026, 12, 25, 23, 59), ts(2027, 1, 3, 12, 0))
xmas = minutes(ts(2026, 12, 29, 0, 0), ts(2027, 1, 1, 23, 59))
r = run(Fake(h + xmas))
ok(r['status'] == 'ok', 'normal holiday gap (4 days, 1 of them a weekday) on a 5d asset: accepted', r.get('largest_gap_days'))

# 6b the longest real gap since 2021: Thu 2021-12-23 08:00 to Mon 2021-12-27 01:00, 1.71 weekday days
h = setup('US500', ts(2021, 12, 23, 8, 0), ts(2021, 12, 31, 12, 0))
r = run(Fake(h + minutes(ts(2021, 12, 27, 1, 0), ts(2021, 12, 30, 23, 59))), key='US500')
ok(r['status'] == 'ok' and r['largest_gap_days'] == 1.7, 'longest real 5d gap since 2021: accepted', r.get('largest_gap_days'))

# 6c short holes the old 5-day limit missed: Tue-Thu midweek, and Thu + Fri beside a weekend
h = setup('EURUSD', LAST, NOW)
hole = minutes(ts(2026, 10, 26, 0, 0), ts(2026, 10, 26, 23, 59)) + minutes(ts(2026, 10, 30, 0, 0), ts(2026, 10, 30, 23, 59))
r = run(Fake(h + hole))
ok(r['status'] == 'error' and 'weekday gap' in r['msg'] and not written(), 'midweek hole (3 days): refused', r['msg'][:60])
r = run(Fake(h + hole), accept=('EURUSD',))
ok(r['status'] == 'ok', '  ...merges with --accept-gap')
h = setup('EURUSD', ts(2026, 10, 28, 23, 59), ts(2026, 11, 3, 12, 0))
r = run(Fake(h + minutes(ts(2026, 11, 2, 0, 0), ts(2026, 11, 2, 23, 59))))
ok(r['status'] == 'error' and 'weekday gap' in r['msg'], 'Thu + Fri missing beside a weekend: refused', r['msg'][:60])

# 6d a normal weekend counts as no gap at all on a 5d asset
ok(d.gap_days(ts(2026, 10, 30, 23, 59), ts(2026, 11, 2, 0, 0), '5d') < 0.001, 'gap_days: a weekend counts for nothing on 5d')
ok(abs(d.gap_days(ts(2026, 10, 30, 23, 59), ts(2026, 11, 2, 0, 0), '7d') - 2.0) < 0.001, 'gap_days: the same weekend is 2 days on 7d')
ok(abs(d.gap_days(ts(2026, 10, 27, 0, 0), ts(2026, 10, 29, 0, 0), '5d') - 2.0) < 0.001, 'gap_days: Tue to Thu is 2 days on 5d')

# 7 7-day market: 4-day gap is too long there, 2-day isn't
h = setup('BTCUSD', LAST, NOW)
r = run(Fake(h + minutes(ts(2026, 10, 28, 0, 0), ts(2026, 10, 31, 23, 59))), key='BTCUSD', week='7d')
ok(r['status'] == 'error' and '2.5-day limit' in r['msg'], '7d asset: 4-day gap refused', r.get('largest_gap_days'))
h = setup('BTCUSD', LAST, NOW)
r = run(Fake(h + minutes(ts(2026, 10, 26, 0, 0), ts(2026, 10, 31, 23, 59))), key='BTCUSD', week='7d')
ok(r['status'] == 'ok', '7d asset: 2-day gap accepted', r.get('largest_gap_days'))

# 8 no overlap
h = setup('EURUSD', LAST, NOW)
r = run(Fake(WEEK))
ok(r['status'] == 'error' and 'overlap' in r['msg'] and not written(), 'no overlap with the file: refused', r['msg'][:60])
r = run(Fake(WEEK), accept=('EURUSD',))
ok(r['status'] != 'error' or 'gap' in r.get('msg', ''), '  ...--accept-gap gets past the overlap check', r['status'])

# 9 overlap mismatch still refuses, even with accept
h = setup('EURUSD', LAST, NOW)
orig = bar


def other(t):
    b = orig(t)
    b['close'] += 0.01
    return b


bar = other
r = run(Fake(h + WEEK))
bar = orig
ok(r['status'] == 'error' and 'mismatch' in r['msg'] and not written(), 'overlap mismatch still refused', r['msg'][:50])

# 10 connection drops mid-load, then returns: re-reads and gets everything
h = setup('EURUSD', LAST, NOW)
f = Fake(h + WEEK, connected=lambda n: n not in (2, 3))
r = run(f)
ok(r['status'] == 'ok' and r['bars'] == len(WEEK), 'connection flaps, then returns: completes')

# 11 connection lost for good
h = setup('EURUSD', LAST, NOW)
f = Fake(h + WEEK, connected=lambda n: n < 2)
r = run(f)
ok(r['status'] == 'error' and 'no connection' in r['msg'] and not written(), 'connection never returns: error, nothing written', r['msg'][:50])

# 12 IPC once: download_all reconnects, retries, others finish
cfgall = dict(CFG, terminals={'tw': {'path': 'x', 'enabled': True}}, assets=[{'key': k, 'symbol': k, 'terminal': 'tw', 'week': '5d'} for k in ('AAA', 'BBB', 'CCC')])
for k in ('AAA', 'BBB', 'CCC'):
    h = setup(k, LAST, NOW)
fake = Fake(h + WEEK, ipc_on={4})
sys.modules['MetaTrader5'] = fake
Clock.t = 0
rs = d.download_all(cfgall, log=lambda m: None)
ok([r['status'] for r in rs] == ['ok', 'ok', 'ok'] and fake.inits == 2 and fake.shutdowns >= 1, 'IPC failure once: reconnects, all 3 assets complete', f'inits {fake.inits}')

# 13 IPC twice for one asset: only that asset errors
for k in ('AAA', 'BBB', 'CCC'):
    h = setup(k, LAST, NOW)
fake = Fake(h + WEEK, ipc_on={1, 2})
sys.modules['MetaTrader5'] = fake
Clock.t = 0
rs = d.download_all(cfgall, log=lambda m: None)
ok([r['status'] for r in rs] == ['error', 'ok', 'ok'], 'IPC failure twice: that asset errors, the others run', [r['status'] for r in rs])

# 14 terminal never connects: every asset errors
for k in ('AAA', 'BBB', 'CCC'):
    h = setup(k, LAST, NOW)
fake = Fake(h + WEEK, connected=lambda n: False)
sys.modules['MetaTrader5'] = fake
Clock.t = 0
rs = d.download_all(cfgall, log=lambda m: None)
ok(all(r['status'] == 'error' and 'not connected' in r['msg'] for r in rs) and not written(), 'never connects: all error, nothing written', rs[0]['msg'][:60])

# 15 terminal won't start
fake = Fake(h + WEEK, init_ok=False)
sys.modules['MetaTrader5'] = fake
Clock.t = 0
rs = d.download_all(cfgall, log=lambda m: None)
ok(all(r['status'] == 'error' and 'could not start' in r['msg'] for r in rs), 'terminal will not start: all error')

# 16 Friday close seen on a Sunday: Friday kept
h = setup('EURUSD', LAST, NOW)
fri_early = minutes(ts(2026, 10, 26, 0, 0), ts(2026, 10, 30, 20, 30))    # session ends before 23:50
r = run(Fake(h + fri_early))
ok(r['status'] == 'ok' and r['last'].startswith('2026-10-30') and 'dropped_partial_day' not in r, 'Friday close seen on a Sunday: Friday kept', r['last'])

# 17 BTC's in-progress Sunday: dropped
h = setup('BTCUSD', LAST, NOW)
btc = minutes(ts(2026, 10, 24, 0, 0), ts(2026, 11, 1, 11, 58))
r = run(Fake(h + btc), key='BTCUSD', week='7d')
ok(r['status'] == 'ok' and r['last'].startswith('2026-10-31') and r['dropped_partial_day']['date'] == '2026-11-01', "BTC's in-progress Sunday: dropped, Saturday kept", r['last'])

# 18 empty ranges (MT5 returns an empty array): not a failure; second chunk empty
h = setup('EURUSD', LAST, ts(2026, 11, 12, 12, 0))
cover = minutes(ts(2026, 10, 26, 0, 0), ts(2026, 11, 10, 20, 0))         # the second 20-day chunk has no bars
r = run(Fake(h + cover))
ok(r['status'] == 'ok', 'chunk with no bars is not a failure', r.get('bars'))

# 19 re-run with nothing new, market closed: not an error
h = setup('EURUSD', ts(2026, 10, 30, 23, 59), NOW)
r = run(Fake(h))
ok(r['status'] == 'nothing-new', 'nothing new while the market is closed: not an error', r.get('msg'))

# 20 the written file has the right format and merges through concat
h = setup('EURUSD', LAST, NOW)
r = run(Fake(h + WEEK))
p = r['file']
first = open(p).read().splitlines()[1]
ok(r['status'] == 'ok' and first.split('\t')[:2] == ['2026.10.26', '00:00:00'] and 'overlap' in r['msg'], 'written file format and message', r['msg'])



# 21 a load that pauses past two reads: three matching reads are needed, so the full history is what's kept
class Paused(Fake):
    def __init__(self, reads_short, short, full):
        super().__init__(full, tick=full[-1])
        self.reads_short, self.short = reads_short, short

    def _now(self):
        return self.short if self.reads <= self.reads_short else self.history


h = setup('EURUSD', LAST, NOW)
f = Paused(2, h + WEEK[:10] + WEEK[-10:], h + WEEK)
r = run(f)
ok(r['status'] == 'ok' and r['bars'] == len(WEEK) and f.calls == 5, 'load pauses for two reads: waits, keeps the full history', f"{r.get('bars')} bars, {f.calls} reads")


# 22 both "latest" lookups fail with a non-IPC error: unknown, never "caught up"
class Blind(Fake):
    def __init__(self, history):
        super().__init__(history)
        self.infos = 0

    def symbol_info(self, s):
        self.infos += 1
        if self.infos > 1:      # the first call only reads the symbol's digits
            self.err = (-1, 'Terminal: Call failed')
            return None
        return super().symbol_info(s)

    def copy_rates_from_pos(self, s, tf, pos, n):
        return None


h = setup('EURUSD', LAST, NOW)
r = run(Blind(h + WEEK))
ok(r['status'] == 'error' and 'latest tick unknown' in r['msg'] and not written(), 'latest-tick lookups fail: error, nothing written', r['msg'][:70])

shutil.rmtree(TMP, ignore_errors=True)
print(f'=== fake MT5: {pass_n} passed, {fail_n} failed')
sys.exit(1 if fail_n else 0)
