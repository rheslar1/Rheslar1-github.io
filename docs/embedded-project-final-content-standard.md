# Embedded Project Final Content Standard

This standard applies to each canonical embedded project folder listed in `docs/workspace-repo-implementation-inventory.md`.

## Required Final Content

Each embedded project should include:

- `docs/final-design-report.md`: system context, hardware target, firmware/software layers, interfaces, safety constraints, and validation.
- `docs/pin-connector-register-map.md`: pin map, connector map, register map, or equivalent interface map.
- `docs/build-flash-runbook.md`: host tools, target tools, expected outputs, flash/deploy steps, and recovery path.
- `docs/evidence/README.md`: host simulation evidence and target hardware evidence when available.
- `docs/performance-budget.md`: power, latency, memory, flash, CPU, and storage budgets.
- `docs/hil-validation-report.md`: hardware-in-the-loop validation for timing-sensitive paths.
- `docs/fault-injection-tests.md`: update, communication, sensor, actuator, storage, and recovery failure modes.
- `docs/ci-artifacts.md`: CI badge, test transcript, build artifacts, and generated evidence bundle.

## Canonical Project Matrix

| Folder | Priority Evidence |
| --- | --- |
| `bare-metal-custom-board-bring-up` | Board rails, reset/clock checks, UART/USB CDC diagnostics, register dump. |
| `bbb-gpio-sysfs-character-device` | BBB pin map, sysfs/char-device comparison, LED/motor evidence. |
| `bbb-i2c-sensor-device-tree-overlay` | I2C wiring, overlay load, IIO readout, sensor capture. |
| `bbb-minimal-buildroot-boot-image` | Boot chain, image config, boot-time screenshot, recovery path. |
| `bbb-modbus-industrial-iot-gateway` | UART/Modbus map, MQTT/TLS run, serial fault injection. |
| `bbb-pru-real-time-coprocessor-driver` | PRU timing evidence, rpmsg trace, real-time budget. |
| `bbb-safe-ab-remote-update-system` | A/B partition map, update success/failure, rollback log. |
| `bbb-yocto-ekg-sensor-monitor` | ADC wiring, waveform capture, systemd service, safety notes. |
| `bems-edge-ai-gateway` | BACnet polling, RabbitMQ command transport, fail-safe controls. |
| `can-bus-ecu-simulation` | CAN frame contract, ECU timing, bus fault injection. |
| `closed-loop-motor-control-platform` | Encoder map, PID/FOC timing, current limit, HIL plots. |
| `custom-ota-update-system` | Dual partition, signature verification, staged rollout evidence. |
| `custom-wifi-driver-network-integration` | Kernel module build, interface bring-up, socket traffic capture. |
| `edge-ai-tinyml-microcontroller` | Model size, latency, RAM/flash, fixed-point inference evidence. |
| `embedded-linux-secure-boot-ota-system` | FIT signature, U-Boot policy, RAUC/Mender rollback. |
| `embedded-linux-yocto-image` | Yocto recipe, image build, systemd unit, target boot evidence. |
| `production-flash-test-rig` | Fixture wiring, flash transcript, pass/fail report, soak log. |
| `secure-bare-metal-bootloader` | Flash layout, signing, validation, recovery mode. |
| `tinyml-sensor-anomaly-detector` | Dataset card, quantization, inference budget, anomaly evidence. |
| `zephyr-rtos-iot-sensor-node` | Zephyr threads, provisioning, OTA, power profiling. |

## Implementation Rule

If a repo lacks target hardware evidence, include host simulation evidence and mark target evidence as pending. Do not imply hardware validation has happened until logs, screenshots, or bench captures exist.
