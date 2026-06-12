# Performance Budget — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) Budget goals
- Provide an evidence-backed estimate of:
  - inference compute (MAC-like cost)
  - memory footprint (weights + working buffers)
  - latency budgets suitable for edge review
  - power estimate directionally (where available)

## 2) Current evidence sources
- `docs/edge-inference-budget.md`: budget approach and estimates
- `docs/evidence/hil-timing-report.json/.md`: host timing/HIL evidence generator output

## 3) Budget boundaries (what is claimed)
- Claimed: **host timing evidence** and **budget estimates** for the distilled student path.
- Not claimed yet: **measured embedded Linux timing** for the exact export path on a target board.

## 4) Pending additions
- Add embedded measured latency: “distilled student inference path” on embedded Linux / BeagleBone-like hardware.
- Add dropped-sample / throughput evidence for real streaming windows.

