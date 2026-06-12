# PRU Real-Time Guide

## Why PRU Matters

The BBB includes programmable real-time units that can handle deterministic tasks beside Linux. This makes the board useful for timing-critical I/O, encoder capture, software-defined protocols, precise pulse generation, and fast sensor handoff.

Linux is excellent for networking, storage, services, and dashboards. PRU firmware is better for tight timing loops. A good BBB design uses each side for the job it is good at.

## Portfolio Architecture

```text
Linux service
  |
  | config, logging, network, filesystem
  v
PRU loader / remoteproc
  |
  | firmware start/stop
  v
PRU firmware
  |
  | deterministic I/O and shared data
  v
rpmsg / shared memory / UIO-style path
  |
  v
Linux reader publishes evidence or telemetry
```

## PRU Project Checklist

1. Define what must be real time.
2. Keep Linux out of the deterministic loop.
3. Define message structure.
4. Bound shared memory writes.
5. Include firmware version and build ID.
6. Capture PRU start/stop logs.
7. Measure jitter or loop timing.
8. Add failure behavior if Linux reader restarts.

## Evidence Commands

Exact file paths depend on kernel/image configuration, but capture:

```bash
uname -a
dmesg -T | rg -i 'pru|remoteproc|rpmsg|uio' || true
find /sys/class/remoteproc -maxdepth 3 -type f -print 2>/dev/null
ls /dev/rpmsg* /dev/uio* 2>/dev/null || true
```

## Timing Evidence

Minimum portfolio evidence:

- Firmware loop rate.
- Linux read interval.
- Timestamp source.
- Min/avg/max latency or jitter.
- CPU load during test.
- Dropped message count.

Example report shape:

```json
{
  "firmware": "pru_encoder_capture_v0.1.0",
  "sample_hz": 10000,
  "duration_s": 60,
  "messages": 6000,
  "drops": 0,
  "latency_us": { "min": 42, "avg": 88, "max": 214 },
  "linux_load": "stress-ng cpu 1 during capture"
}
```

## Failure Modes

| Failure | Mitigation |
| --- | --- |
| PRU firmware fails to start | Log remoteproc state and keep service failed, not silently degraded. |
| Linux reader restarts | PRU should keep bounded state or reset cleanly. |
| Message queue overflows | Count drops and report them. |
| Bad pinmux | Keep overlay rollback path and serial console. |
| Timing target missed | Record measured jitter and reduce Linux-side assumptions. |

## Review Standard

A PRU project is strong when it shows:

- Why Linux alone was not enough.
- Which logic runs in PRU firmware.
- How Linux and PRU exchange data.
- Measured timing evidence.
- Clean failure/restart behavior.
