# Performance Budget — BeagleBone AD8232 EKG ADC Driver

Scrub date: 2026-06-11

## 1) Budget goals
- Provide practical budgets for:
  - acquisition loop latency
  - compute time for filtering + peak detection
  - throughput and sample drop detection
  - memory overhead of in-memory buffers

## 2) Current evidence state
- Simulator/host evidence exists (waveform plot + computed report).
- Hardware timing under CPU load is **pending**.

## 3) Pending additions
- Add embedded timing evidence and dropped-sample checks once a BeagleBone capture is available.
- Add CPU load test procedure and measured sample rate.

