# Energy Baseline Comparison

## Scenario

This comparison uses portfolio-seeded EnergyBuildAI values to show how BEMS-ai recommendations can be presented before live measurement data is available.

| Metric | Baseline | Optimized | Delta |
| --- | ---: | ---: | ---: |
| Sampled building load | 68.0 kWh | 50.0 kWh | 18.0 kWh saved |
| Peak interval demand | 24.1 kWh | 18.0 kWh | 6.1 kWh reduced |
| Comfort risk | Moderate | Low/Moderate | Lower risk after targeted trims |
| Demand-response state | Off | Armed | Peak guard active |
| Operator action | Manual review | Trim noncritical airflow/load | Faster decision path |

## Carbon/Cost Note

Cost and carbon should be calculated from tariff and emissions-factor inputs when real data is available. Until then, the portfolio reports projected savings as simulated evidence only.

## Next Evidence

- Capture baseline vs optimized run from Docker-backed seeded data.
- Add tariff assumptions.
- Add carbon intensity assumptions.
- Export CSV/JSON report from optimization endpoint.

