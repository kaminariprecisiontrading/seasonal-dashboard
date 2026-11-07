# Owner decisions — 2026-11-07

Answers the two items the brief held for the owner (`ALERTS_AUTOMATION_BUILD_NOTES.md` §6–7, §10).

| Item | Decision | Build when |
|---|---|---|
| §6 Track Record view | **Option C**: three views (Real markets · Synthetics · Combined), each with its own disclaimer, as in `mockups/trackrecord-c.html` and the §6 "Option C extras" list. Default tab Real markets; `?view=real\|syn\|all` in the URL. | When the first synthetic asset goes live |
| §7 Broker comparison (`/brokers`) | **Build it**, as in `mockups/brokercompare.html` and §7. | Once the Deriv MT5 app is installed and both feeds exist (`XAUUSD` + `XAUUSD_DERIV`) |

Both depend on the Deriv MT5 app (§10). Until then, nothing in §6–7 is built.
