# Hardware-In-The-Loop Timing Evidence

| Field | Value |
| --- | --- |
| Target label | `host-python-reference` |
| Platform | `Linux 6.17.0-35-generic x86_64` |
| Iterations | 200 |
| Windows per iteration | 89 |
| Total seconds | 0.084931 |
| Average inference | 4.771 us |
| Max observed window latency | 22.845 us |

## Notes

- Python host timing is evidence for software path repeatability, not a substitute for target profiling.
- Run this same benchmark on BeagleBone or MCU-adjacent Linux to collect hardware-in-the-loop timing.
