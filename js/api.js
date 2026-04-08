/**
 * api.js — Shared Claude API call for all seasonal dashboards.
 *
 * Depends on: SEASONAL_DATA (string defined in each asset's data file)
 *             ASSET_CONFIG.ltLabel (used in loading message)
 */

async function runAnalysis() {
  const btn    = document.getElementById('run-btn');
  const output = document.getElementById('ai-output');

  btn.disabled    = true;
  btn.textContent = '⟳  Analysing...';
  output.innerHTML = `<span class="loading">Running seasonal analysis across 5-YR, 15-YR and ${ASSET_CONFIG.ltLabel} data...</span>`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2500,
        messages: [{ role: "user", content: SEASONAL_DATA }]
      })
    });

    const data = await response.json();
    const text  = data.content?.map(b => b.text || '').join('') || 'No response received.';
    output.textContent  = text;
    btn.textContent     = '✓  Analysis Complete — Re-run';
    btn.disabled        = false;

  } catch (err) {
    output.textContent = 'Error running analysis: ' + err.message;
    btn.textContent    = '▶  Retry';
    btn.disabled       = false;
  }
}
