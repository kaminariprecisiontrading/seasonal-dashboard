<#
  setup_task.ps1 — registers the weekly data refresh in Windows Task Scheduler (v1.29).
  See docs/AUTOMATION.md → "One-time setup".

  Run from any PowerShell window (no admin needed — the task runs as you):
      powershell -ExecutionPolicy Bypass -File backend\automation\setup_task.ps1
  Options:
      -Day Sunday -Time 14:00     when to run (local time; 14:00 Botswana = 12:00 UTC)
      -ShowWindow                 run with a visible console (python.exe) instead of hidden (pythonw.exe)
      -RunNow                     start the task once right after registering it
      -Remove                     unregister the task

  Behaviour:
    * Runs only while you're logged in (MT5 is a desktop app and needs your session).
    * If the laptop was off/asleep at the scheduled time, runs as soon as possible afterwards.
    * Wakes the laptop from sleep for the run (not from shutdown/hibernate).
    * Needs a network connection; won't start a second copy if one is still running.
#>
param(
  [string]$Day = "Sunday",
  [string]$Time = "14:00",
  [switch]$ShowWindow,
  [switch]$RunNow,
  [switch]$Remove
)
$ErrorActionPreference = "Stop"
$TaskName = "KPT Weekly Data Refresh"
$Repo = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Exe = if ($ShowWindow) { "python.exe" } else { "pythonw.exe" }
$Python = Join-Path $Repo "backend\.venv\Scripts\$Exe"
$Script = "backend\automation\weekly_run.py"

if ($Remove) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "Removed '$TaskName'."
  return
}

# ── Pre-flight checks ────────────────────────────────────────────────────────────────
$problems = @()
if (-not (Test-Path $Python)) { $problems += "Python venv not found: $Python (see backend/README.md → Environment)" }
else {
  & (Join-Path $Repo "backend\.venv\Scripts\python.exe") -c "import MetaTrader5" 2>$null
  if ($LASTEXITCODE -ne 0) { $problems += "MetaTrader5 package missing: backend\.venv\Scripts\python.exe -m pip install -r backend\automation\requirements-automation.txt" }
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { $problems += "node not on PATH" }
if (-not (Get-Command git -ErrorAction SilentlyContinue))  { $problems += "git not on PATH" }
$cfg = Get-Content (Join-Path $PSScriptRoot "config.json") -Raw | ConvertFrom-Json
foreach ($t in $cfg.terminals.PSObject.Properties) {
  if ($t.Value.enabled -and -not (Test-Path $t.Value.path)) { $problems += "MT5 terminal '$($t.Name)' not found: $($t.Value.path)" }
}
if ($problems.Count) {
  Write-Host "Fix these first:" -ForegroundColor Yellow
  $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
  exit 1
}

# ── Register ─────────────────────────────────────────────────────────────────────────
$action   = New-ScheduledTaskAction -Execute $Python -Argument $Script -WorkingDirectory $Repo
$trigger  = New-ScheduledTaskTrigger -Weekly -DaysOfWeek $Day -At $Time
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -WakeToRun -RunOnlyIfNetworkAvailable `
              -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
              -ExecutionTimeLimit (New-TimeSpan -Hours 8) -MultipleInstances IgnoreNew `
              -RestartCount 2 -RestartInterval (New-TimeSpan -Minutes 30)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings `
  -Principal $principal -Description "KPT Seasonals: MT5 download → pipeline → push (docs/AUTOMATION.md)" -Force | Out-Null

Write-Host "Registered '$TaskName': every $Day at $Time (local), runs $Exe $Script in $Repo" -ForegroundColor Green
Write-Host "Logs: backend\automation\logs\   ·   Last result: Task Scheduler → Task Scheduler Library → $TaskName"

if ($RunNow) {
  Start-ScheduledTask -TaskName $TaskName
  Write-Host "Started. Follow the newest file in backend\automation\logs\."
}
