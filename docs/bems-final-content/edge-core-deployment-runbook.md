# Edge-Core Deployment Runbook

Source: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core`

## Build

```bash
cd BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core
cmake -S . -B build
cmake --build build
```

## Service Configuration

Systemd unit source:

```text
BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core/packaging/bems-edge-core.service
```

Expected installed binary:

```text
/usr/bin/bems-edge-core
```

## Logs

```bash
journalctl -u bems-edge-core -f
systemctl status bems-edge-core
```

## Restart Policy

- Restart the service through systemd for local recovery.
- Use remote management API only when management token and network controls are configured.
- If BACnet discovery fails, keep the API/UI online and surface edge degraded health.

## Failure Modes

| Failure | Expected Behavior | Recovery |
| --- | --- | --- |
| BACnet device offline | Device marked degraded/unavailable. | Re-run discovery, inspect network, validate device power. |
| Unsafe writeback | Write rejected or rolled back. | Inspect writeback policy and target point limits. |
| gRPC unavailable | API uses fallback/degraded edge health. | Restart edge-core and validate service port. |
| Build failure | CI/deploy stops. | Fix CMake/source error and rerun build. |

