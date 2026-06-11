# Workspace Repository Implementation Inventory

Generated for the Rheslar workspace on 2026-06-11.

## Scope

The canonical embedded project set lives in `embedded-system-repos/`. Several matching top-level clones also exist in the workspace; those are fast-forwarded mirrors or older working copies. For new implementation work, use the canonical nested repo unless a specific top-level repo is requested.

## Validation Pattern

Most embedded repos are host-buildable C++17 projects. The common validation command is:

```bash
cmake -S . -B build
cmake --build build
ctest --test-dir build --output-on-failure
```

Documentation-only or service repos use their local stack checks, such as `npm run build`, `node --check`, `python3 -m py_compile`, Docker Compose validation, or repo-specific scripts.

## Canonical Embedded Repos

| Repo | Primary Code | Key Documentation | Notes |
| --- | --- | --- | --- |
| `bare-metal-custom-board-bring-up` | `include/project_runtime/`, `src/ProjectRuntime.cpp`, `tests/ProjectRuntimeTests.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Published to existing remote `rheslar1/-bare-metal-custom-board-bring-up` because the no-leading-hyphen remote was not found. |
| `bare-metal-rtos-scheduling` | `include/scheduling/`, `src/Scheduler.cpp`, `tests/SchedulerTests.cpp` | `docs/bare-metal-vs-rtos-linux.md`, `docs/design/README.md` | Includes bare-metal scheduler and Linux-threaded RTOS-style model. |
| `bbb-gpio-sysfs-character-device` | `include/bbb_gpio/`, `src/MotorController.cpp`, `kernel/bbb_motor_char.c` | `docs/beagleboard-motor-driver.md`, `docs/design/README.md` | BeagleBone motor driver board controller with sysfs and character-device paths. |
| `bbb-i2c-sensor-device-tree-overlay` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | I2C sensor and device-tree overlay model. |
| `bbb-minimal-buildroot-boot-image` | `include/bbb_boot/`, `src/BbbBootImage.cpp`, `tests/BbbBootImageTests.cpp` | `docs/bbb-buildroot-plan.md`, `docs/design/README.md` | BBB Buildroot boot image model. |
| `bbb-modbus-industrial-iot-gateway` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Modbus industrial gateway scaffold with C++17 runtime boundary. |
| `bbb-pru-real-time-coprocessor-driver` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | PRU real-time coprocessor driver model. |
| `bbb-safe-ab-remote-update-system` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | BBB A/B update design and host runtime model. |
| `bbb-yocto-ekg-sensor-monitor` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | BBB Yocto EKG sensor monitor project. |
| `bems-edge-ai-gateway` | `include/bems_gateway/`, `src/Gateway.cpp`, `tests/GatewayTests.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | BEMS edge AI gateway model and docs. |
| `can-bus-ecu-simulation` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | CAN ECU simulation runtime and validation docs. |
| `closed-loop-motor-control-platform` | `include/motor_control/`, `src/MotorControl.cpp`, `tests/MotorControlTests.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Encoder, IMU, PID, current-limit, and PWM control model. |
| `connected-iot-device` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Remote history merged while preserving implementation. |
| `custom-buildroot-media-kiosk-system` | `include/kiosk/`, `src/KioskImage.cpp`, `buildroot/` | `docs/buildroot-kiosk-plan.md`, `docs/design/README.md` | Buildroot media/kiosk image model. |
| `custom-ota-update-system` | `include/ota/`, `src/OtaUpdate.cpp`, `tests/OtaUpdateTests.cpp` | `docs/linux-ota.md`, `docs/design/README.md` | MCU dual-slot and Linux A/B OTA model. |
| `custom-wifi-driver-network-integration` | `include/wifi_integration/`, `src/WifiIntegration.cpp`, `tests/WifiIntegrationTests.cpp` | `docs/driver-network-integration-runbook.md`, `docs/design/README.md` | Driver build, DT awareness, interface bring-up, and socket validation model. |
| `digi-imx93-peripheral-driver` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Digi i.MX93 peripheral driver model. |
| `drv8801-brushed-dc-motor-controller` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Remote history merged while preserving implementation. |
| `edge-ai-tinyml-microcontroller` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | TinyML host runtime plus design package; remote history merged while preserving implementation. |
| `embedded-linux-secure-boot-ota-system` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Embedded Linux secure boot and OTA model. |
| `embedded-linux-yocto-image` | `include/yocto_image/`, `src/YoctoImage.cpp`, `yocto/` | `docs/bems-ota-integration.md`, `docs/design/README.md` | BEMS Yocto image plus OTA integration model. |
| `fpga-hps-memory-mapped-driver` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Published to existing remote `rheslar1/-fpga-hps-memory-mapped-driver` because the no-leading-hyphen remote was not found. |
| `low-power-temperature-datalogger` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Low-power datalogger runtime and validation docs. |
| `medical-wearable-power-manager` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Remote history merged while preserving implementation. |
| `mjpeg-video-streaming-hardware-ui` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | MJPEG video streaming and hardware UI model. |
| `mqtt-industrial-iot-gateway` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | MQTT industrial IoT gateway model. |
| `multi-sensor-i2c-spi-data-logger` | `include/data_logger/`, `src/DataLogger.cpp`, `tests/DataLoggerTests.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Multi-bus sensor logger model. |
| `nrf52840-bacnet-field-node` | `include/field_node/`, `src/FieldNode.cpp`, `tools/generate_pages_site.py` | `docs/bacnet-object-map.md`, `docs/persistence-and-power.md` | Canonical nested remote currently points at `rheslar1/nrf52840-bacnet-field-node-`. |
| `production-flash-test-rig` | `include/flash_rig/`, `src/FlashRig.cpp`, `tests/FlashRigTests.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Production flashing, test fixture, and evidence model. |
| `read-only-rootfs-docker-containerization` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Published to existing remote `rheslar1/-read-only-rootfs-docker-containerization` because the no-leading-hyphen remote was not found. |
| `secure-bare-metal-bootloader` | `include/bootloader/`, `src/Bootloader.cpp`, `tests/BootloaderTests.cpp` | `docs/flash-layout.md`, `docs/design/README.md` | Secure bootloader model with flash layout and verification flow. |
| `spi-i2c-uart-mcu-bootloader` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | Multi-interface MCU bootloader model. |
| `tinyml-sensor-anomaly-detector` | `include/project_runtime/`, `src/ProjectRuntime.cpp` | `docs/deep-architecture.md`, `docs/design/README.md` | TinyML anomaly detector model. |
| `zephyr-rtos-iot-sensor-node` | `firmware/zephyr/`, `include/sensor_node/`, `src/SensorNode.cpp` | `docs/nrf52840-bringup.md`, `docs/design/README.md` | nRF52840 Zephyr sensor node with firmware skeleton and host validation model. |

## BMS / BEMS Enterprise Repo

`BMS/` is a separate Git repository and is clean against `origin/main`.

| Area | Entry Point |
| --- | --- |
| Root overview | `BMS/README.md` |
| Deep implementation guide | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docs/bems-enterprise-complete-implementation-guide.md` |
| Runtime sequence diagram source | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docs/diagrams/bems-runtime-sequence.mmd` |
| Layered architecture diagram source | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docs/diagrams/bems-layered-architecture.mmd` |
| Data model diagram source | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docs/diagrams/bems-data-model.mmd` |
| C++ edge core | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core/` |
| Node.js API | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/node-api/` |
| React UI | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/ui/` |
| Python AI service | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/ai-service/` |
| Database schema | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/database/schema.sql` |

Validated BMS checks:

- `node --check` on `node-api/server.js`, `edgeClient.js`, and `aiClient.js`.
- `python3 -m py_compile ai-service/app.py`.
- `cmake` configure/build for `edge-core`.
- `npm run build` for the React UI. Vite reports only the existing large chunk warning.

## Other Workspace Repos

| Repo | State | Notes |
| --- | --- | --- |
| `Rheslar1-github.io` | Portfolio repo, active worktree in this update. | EnergyBuildAI dashboard project-link and embedded-repo cards were removed so the dashboard stays operations-focused. |
| `ansible` | Clean against `origin/main`. | Automation architecture guide is already present. |
| `containers` | Clean against `origin/main`. | Container repo is present but not part of the embedded C++ project set. |
| `pythonHelpers` | Clean against `origin/main`. | Existing helper library repo. |
| `pythonProject` | Clean against `origin/main`. | Existing Python project with architecture overview. |
| `home-automation` | No local commits; upstream branch is gone. | Needs repo initialization or reclone before implementation work. |

## Duplicate Top-Level Embedded Clones

The workspace also contains top-level clones for many embedded repos, such as `zephyr-rtos-iot-sensor-node/`, `production-flash-test-rig/`, and `custom-ota-update-system/`. These were fast-forwarded after the canonical nested repos were pushed. Treat them as convenience mirrors unless explicitly requested.

## Remote Naming Notes

These naming mismatches are intentional records of the current remote state:

- `embedded-system-repos/bare-metal-custom-board-bring-up` tracks `git@github.com:rheslar1/-bare-metal-custom-board-bring-up.git`.
- `embedded-system-repos/fpga-hps-memory-mapped-driver` tracks `git@github.com:rheslar1/-fpga-hps-memory-mapped-driver.git`.
- `embedded-system-repos/read-only-rootfs-docker-containerization` tracks `git@github.com:rheslar1/-read-only-rootfs-docker-containerization.git`.
- `embedded-system-repos/nrf52840-bacnet-field-node` tracks `git@github.com:rheslar1/nrf52840-bacnet-field-node-.git`.

The clean no-leading-hyphen remotes for the first three returned `Repository not found` during fetch, so the implementation was published to the existing leading-hyphen repositories instead of being left local-only.

## Final Workspace State

At the time this inventory was written:

- Canonical embedded repos under `embedded-system-repos/` are clean and tracking their configured remotes.
- BMS is clean and pushed after adding the BEMS implementation guide.
- Top-level duplicate embedded clones are clean and fast-forwarded.
- `home-automation` is the only Git worktree without commits.
