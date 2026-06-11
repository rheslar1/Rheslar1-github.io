# All Projects Suggested Content Audit

Generated from `src/data/projects.ts` and `src/data/embeddedSystemsProjects.ts`.

- Total projects scanned: 44
- Hand-authored project entries: 10
- Generated embedded-system entries: 34

## Cross-Project Content Standard

- Every project should have a final design report, architecture diagram, build/run transcript, validation evidence, and one visual proof artifact.
- Embedded projects should include pin maps, register maps, wiring/schematic notes, power/latency/memory budgets, and fault-injection evidence where relevant.
- Dashboard and web projects should include desktop/mobile screenshots, route or API evidence, deployment runbook, accessibility notes, and data provenance.
- AI projects should include dataset provenance, model card, feature contract, metrics, calibration notes, export path, and safety boundary.

## Highest-Impact Portfolio Backlog

1. Add real hardware or simulator transcripts to projects that currently rely on generated simulation screenshots.
2. Add CI run screenshots/badges and test transcripts across every public repo.
3. Add final design reports using the standard: system context, interfaces, constraints, validation, evidence, and future work.
4. Add desktop/mobile screenshots for web dashboards and operator flows.
5. Add provenance notes for every generated image, notebook, data artifact, and copied source document.

## Hand-Authored Project Audit

### pythonProject

- Project ID: `pythonProject`
- Source: `hand-authored`

Current project backlog:
- Capture a real terminal screenshot showing show users, add user, del user, and updated users.csv output.
- Add unit-test output once model and persistence tests are added.
- Add a MySQL adapter diagram if the storage layer is upgraded from CSV.

Additional suggested content:
- Add terminal transcript for the primary command workflow and failure handling.
- Add CI/test badge or static-analysis transcript linked from the project README.

### study

- Project ID: `study`
- Source: `hand-authored`

Current project backlog:
- Capture GitHub Actions passing for the C++ CI workflow.
- Add screenshots of selected C++ examples running locally.
- Add a diagram index image that links each UML visual to its source example.

Additional suggested content:
- Add terminal transcript for the primary command workflow and failure handling.
- Add CI/test badge or static-analysis transcript linked from the project README.

### BEMS-ai

- Project ID: `BEMS-ai`
- Source: `hand-authored`

Current project backlog:
- Capture pytest and CTest output from a clean run.
- Add a training/reward plot from a PPO training session.
- Add an ONNX export/validation screenshot once a trained policy artifact is generated.
- Add a before/after energy-cost comparison using a representative simulation scenario.

Additional suggested content:
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.
- Add fresh desktop/mobile screenshot pair for the primary operator workflow.
- Add endpoint/seed-data evidence tying visible dashboard rows to data contracts.

### Predictive AI Neural Seizure Analysis

- Project ID: `neural-seizure-ai-analysis`
- Source: `hand-authored`

Current project backlog:
- Replace synthetic data with approved public datasets.
- Add PyTorch dataset and dataloader boundaries.
- Train CNN/LSTM/transformer/GNN baselines against the same WindowFeatures contract or raw windows.
- Export a trained student to ONNX or C for embedded inference.
- Add calibration, uncertainty, and patient-specific thresholding.
- Run the timing evidence on real BeagleBone hardware and commit the target report.
- Add a fixed-point student inference path for MCU-class targets.
- Add notebook execution output snapshots after the next evidence refresh.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.

### BeagleBone AD8232 EKG ADC Driver

- Project ID: `beaglebone-ad8232-ekg-driver`
- Source: `hand-authored`

Current project backlog:
- Capture a live BeagleBone run with board revision, ADC channel, divider values, and oscilloscope notes.
- Add a systemd service example for long-running local waveform logging.
- Add hardware-in-the-loop timing evidence from the BeagleBone under load.
- Create a dedicated GitHub repository if the driver should be published outside the portfolio repo.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add terminal transcript for the primary command workflow and failure handling.
- Add CI/test badge or static-analysis transcript linked from the project README.

### Rheslar1-github.io

- Project ID: `portfolio`
- Source: `hand-authored`

Current project backlog:
- Capture desktop and mobile screenshots after every major content update.
- Add a GitHub Actions deployment screenshot showing the latest successful Pages run.
- Add Lighthouse or accessibility results after the final content pass.

Additional suggested content:
- Add fresh desktop/mobile screenshot pair for the primary operator workflow.
- Add endpoint/seed-data evidence tying visible dashboard rows to data contracts.

### BMS Portfolio Dashboard

- Project ID: `bms-portfolio-dashboard`
- Source: `hand-authored`

Current project backlog:
- Capture a fresh screenshot from https://rheslar1.github.io/BMS/portfolio once the route is serving the final page.
- Add a deployment or Pages screenshot for the BMS repository.
- Add mobile and desktop captures of the hosted BMS portfolio dashboard.

Additional suggested content:
- Add fresh desktop/mobile screenshot pair for the primary operator workflow.
- Add endpoint/seed-data evidence tying visible dashboard rows to data contracts.

### BEMS

- Project ID: `bems`
- Source: `hand-authored`

Current project backlog:
- Run the Docker stack and capture the real React dashboard with seeded MySQL data.
- Capture a real BEMS energy heat map and usage dashboard over the production building floorplan from telemetry or MySQL sample data.
- Capture API health, digital-twin, alarm, and schedule endpoint responses.
- Add MySQL schema/entity screenshots or an ERD generated from schema.sql.
- Add a deployment screenshot showing Docker services healthy together.

Additional suggested content:
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.

### ansible

- Project ID: `ansible`
- Source: `hand-authored`

Current project backlog:
- Capture a real ansible-playbook run with hostnames/IPs masked if needed.
- Add ansible-lint or syntax-check output once linting is configured.
- Add a short deployment before/after example for a real managed host.

Additional suggested content:
- Add terminal transcript for the primary command workflow and failure handling.
- Add CI/test badge or static-analysis transcript linked from the project README.

### CameraDemo

- Project ID: `CameraDemo`
- Source: `hand-authored`

Current project backlog:
- Capture real target terminal output from make run with /dev/video0 connected.
- Add a real frame or HDMI preview photo from the embedded target.
- Add a hardware setup photo showing camera, target board, display, and network connection.
- Add format/capability output for the tested camera module.

Additional suggested content:
- Add real frame capture and camera capability output for the tested sensor module.
- Add latency/bandwidth measurement for capture, encode, stream, and display path.

## Embedded Systems Project Audit

### BEMS Edge AI Gateway

- Project ID: `bems-edge-ai-gateway`
- Label: `Embedded Systems`
- Tags: `C++`, `BACnet/IP`, `RabbitMQ`, `Docker`, `i.MX93`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.

### nRF52840 BACnet Field Node

- Project ID: `nrf52840-bacnet-field-node`
- Label: `Bare-metal device`
- Tags: `nRF52840`, `C`, `EEPROM`, `BACnet`, `BLE-ready`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### Production Flash and Test Rig

- Project ID: `production-flash-test-rig`
- Label: `Manufacturing readiness`
- Tags: `SWUpdate`, `Yocto`, `Shell`, `QA logs`, `Hardware lab`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### Zephyr RTOS IoT Sensor Node

- Project ID: `zephyr-rtos-iot-sensor-node`
- Label: `Senior repo example`
- Tags: `Zephyr RTOS`, `BLE`, `Wi-Fi`, `MCUboot`, `TLS`, `Power profiling`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.

### Closed-Loop Motor Control Platform

- Project ID: `closed-loop-motor-control-platform`
- Label: `Senior repo example`
- Tags: `STM32`, `FOC/PID`, `IMU`, `Encoders`, `PWM`, `Control theory`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add step-response plot with overshoot, settling time, current limit, and fault handling.
- Add HIL or bench video frame showing motor, encoder, driver, and safety stop.

### Secure Bare-Metal Bootloader

- Project ID: `secure-bare-metal-bootloader`
- Label: `Senior repo example`
- Tags: `Bare metal C`, `Linker scripts`, `Flash layout`, `ECDSA`, `SHA-256`, `UART/USB DFU`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### Custom OTA Update System

- Project ID: `custom-ota-update-system`
- Label: `Senior repo example`
- Tags: `ESP32/STM32`, `Dual partition`, `MCUboot`, `ECDSA`, `TLS`, `Rollback logic`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.

### Bare-Metal RTOS Scheduling

- Project ID: `bare-metal-rtos-scheduling`
- Label: `Senior repo example`
- Tags: `FreeRTOS`, `Zephyr`, `IPC`, `Mutexes`, `Semaphores`, `Priority inheritance`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add final design report with system context, interfaces, constraints, validation, and evidence index.
- Add screenshot or terminal transcript proving the primary workflow runs from a clean checkout.

### Embedded Linux / Yocto Image

- Project ID: `embedded-linux-yocto-image`
- Label: `Senior repo example`
- Tags: `Yocto`, `BitBake`, `Kernel config`, `Systemd`, `Device tree`, `Rootfs`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### Custom Buildroot Media/Kiosk System

- Project ID: `custom-buildroot-media-kiosk-system`
- Label: `Embedded Linux beginner`
- Tags: `Buildroot`, `Rootfs`, `Kernel config`, `Fast boot`, `Raspberry Pi`, `BeagleBone`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### BBB Minimal Buildroot Boot Image

- Project ID: `bbb-minimal-buildroot-boot-image`
- Label: `BeagleBone Black beginner`
- Tags: `BeagleBone Black`, `AM335x`, `Buildroot`, `U-Boot`, `Kernel build`, `microSD boot`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### BBB GPIO Controller Using Sysfs and Character Devices

- Project ID: `bbb-gpio-sysfs-character-device`
- Label: `BeagleBone Black beginner`
- Tags: `BeagleBone Black`, `GPIO`, `Sysfs`, `Character driver`, `P8/P9 headers`, `C`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.

### Custom Wi-Fi Driver Compilation & Network Integration

- Project ID: `custom-wifi-driver-network-integration`
- Label: `Embedded Linux beginner`
- Tags: `Linux kernel`, `Wi-Fi driver`, `Kernel module`, `Device tree`, `Cross-compilation`, `Sockets`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.

### Multi-Sensor Data Logger over I2C/SPI

- Project ID: `multi-sensor-i2c-spi-data-logger`
- Label: `Embedded Linux beginner`
- Tags: `I2C`, `SPI`, `POSIX threads`, `SQLite`, `C/C++`, `Sensor logging`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add step-response plot with overshoot, settling time, current limit, and fault handling.
- Add HIL or bench video frame showing motor, encoder, driver, and safety stop.
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### BBB Device Tree Overlay for an I2C Sensor

- Project ID: `bbb-i2c-sensor-device-tree-overlay`
- Label: `BeagleBone Black intermediate`
- Tags: `BeagleBone Black`, `Device tree overlay`, `I2C`, `BMP280`, `IIO`, `dtbo`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### BBB Modbus Industrial IoT Gateway

- Project ID: `bbb-modbus-industrial-iot-gateway`
- Label: `BeagleBone Black intermediate`
- Tags: `BeagleBone Black`, `Yocto`, `Modbus`, `UART`, `MQTT/TLS`, `Industrial IoT`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### BBB Yocto EKG Sensor Monitor

- Project ID: `bbb-yocto-ekg-sensor-monitor`
- Label: `BeagleBone Black intermediate`
- Tags: `BeagleBone Black`, `Yocto`, `EKG/ECG`, `ADC`, `IIO`, `Systemd`, `Signal filtering`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### MJPEG Video Streaming Server with Hardware UI

- Project ID: `mjpeg-video-streaming-hardware-ui`
- Label: `Embedded Linux intermediate`
- Tags: `V4L2`, `MJPEG`, `HTTP server`, `CSI camera`, `GPIO buttons`, `Hardware UI`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add real frame capture and camera capability output for the tested sensor module.
- Add latency/bandwidth measurement for capture, encode, stream, and display path.

### MQTT-Based Industrial IoT Gateway

- Project ID: `mqtt-industrial-iot-gateway`
- Label: `Embedded Linux intermediate`
- Tags: `Yocto`, `MQTT`, `TLS`, `Modbus`, `CAN`, `Serial telemetry`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.

### Docker Containerization on a Read-Only Root Filesystem

- Project ID: `read-only-rootfs-docker-containerization`
- Label: `Embedded Linux intermediate`
- Tags: `Read-only rootfs`, `Docker`, `OverlayFS`, `RAM overlay`, `Systemd`, `Reliability`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add build transcript with image artifact names, boot logs, systemd status, and boot-time measurement.
- Add rollback/recovery path for a corrupted image or failed service start.
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.

### FPGA to HPS Memory-Mapped Hardware Driver

- Project ID: `fpga-hps-memory-mapped-driver`
- Label: `Embedded Linux advanced`
- Tags: `FPGA`, `HPS bridge`, `mmap`, `Verilog`, `SystemVerilog`, `Register map`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add final design report with system context, interfaces, constraints, validation, and evidence index.
- Add screenshot or terminal transcript proving the primary workflow runs from a clean checkout.

### BBB Real-Time PRU Co-Processor Driver

- Project ID: `bbb-pru-real-time-coprocessor-driver`
- Label: `BeagleBone Black advanced`
- Tags: `BeagleBone Black`, `PRU`, `rpmsg`, `Kernel driver`, `Real-time control`, `Encoder input`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add step-response plot with overshoot, settling time, current limit, and fault handling.
- Add HIL or bench video frame showing motor, encoder, driver, and safety stop.

### BBB Safe A/B Remote Update System

- Project ID: `bbb-safe-ab-remote-update-system`
- Label: `BeagleBone Black advanced`
- Tags: `BeagleBone Black`, `A/B partition`, `U-Boot`, `RAUC/Mender`, `eMMC`, `Rollback`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add pinout/wiring photo or schematic with BeagleBone header pins and voltage limits.
- Add live target log showing sensor/device discovery and one captured data window.
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.

### Secure Boot and OTA Update System

- Project ID: `embedded-linux-secure-boot-ota-system`
- Label: `Embedded Linux advanced`
- Tags: `U-Boot`, `Verified boot`, `FIT images`, `RAUC/Mender`, `A/B partition`, `OTA rollback`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.

### TinyML Sensor Anomaly Detector

- Project ID: `tinyml-sensor-anomaly-detector`
- Label: `Senior repo example`
- Tags: `Cortex-M`, `TensorFlow Lite Micro`, `Quantization`, `CMSIS-NN`, `Ring buffers`, `Edge inference`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.

### CAN Bus ECU Simulation

- Project ID: `can-bus-ecu-simulation`
- Label: `Senior repo example`
- Tags: `CAN`, `SocketCAN`, `STM32`, `DBC`, `Filters`, `Fault injection`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### Low-Power Temperature Datalogger

- Project ID: `low-power-temperature-datalogger`
- Label: `Senior repo example`
- Tags: `Low power MCU`, `I2C sensor`, `RTC wake`, `Deep sleep`, `SD/Flash logging`, `Battery profiling`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### SPI/I2C/UART MCU Bootloader

- Project ID: `spi-i2c-uart-mcu-bootloader`
- Label: `Senior repo example`
- Tags: `Bare metal C`, `UART`, `SPI`, `I2C`, `CRC32`, `Flash driver`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### Digi ConnectCore i.MX93 Peripheral Driver

- Project ID: `digi-imx93-peripheral-driver`
- Label: `Senior repo example`
- Tags: `i.MX93`, `Digi ConnectCore`, `SPI/PWM`, `Device tree`, `Linux driver`, `Unit tests`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### DRV8801 Brushed DC Motor Controller

- Project ID: `drv8801-brushed-dc-motor-controller`
- Label: `Senior repo example`
- Tags: `DRV8801`, `PWM`, `Quadrature encoder`, `PID`, `Velocity mode`, `Position mode`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add step-response plot with overshoot, settling time, current limit, and fault handling.
- Add HIL or bench video frame showing motor, encoder, driver, and safety stop.

### Medical Wearable Power Manager

- Project ID: `medical-wearable-power-manager`
- Label: `Senior repo example`
- Tags: `RTOS`, `Sleep states`, `DMA`, `Sensor sampling`, `Battery telemetry`, `Wake sources`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add final design report with system context, interfaces, constraints, validation, and evidence index.
- Add screenshot or terminal transcript proving the primary workflow runs from a clean checkout.

### Connected IoT Device

- Project ID: `connected-iot-device`
- Label: `Standout integration project`
- Tags: `FreeRTOS/Zephyr`, `MQTT`, `TLS`, `OTA`, `Low power modes`, `Device identity`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add flash/partition map and rollback-state transcript for pass and failed update paths.
- Add signed-image verification evidence and recovery-mode operator notes.
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### Bare-Metal Custom Board Bring-Up

- Project ID: `bare-metal-custom-board-bring-up`
- Label: `Standout integration project`
- Tags: `Custom PCB`, `Bare metal C`, `Device drivers`, `UART CLI`, `USB CDC`, `Board diagnostics`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add protocol frame table with sample request/response bytes, error cases, and timeout policy.
- Add simulator transcript or bus capture showing nominal and fault-injection cases.

### Edge AI / TinyML Microcontroller

- Project ID: `edge-ai-tinyml-microcontroller`
- Label: `Standout integration project`
- Tags: `TFLite Micro`, `Cortex-M`, `Quantization`, `Memory profiling`, `CMSIS-NN`, `Edge inference`

Current generated backlog:
- Push the scaffold to GitHub as a public repository.
- Capture the first successful CI run.
- Add hardware, simulator, or terminal evidence for the main control workflow.
- Replace the generated source stub with board-specific implementation slices.

Additional suggested content:
- Add model card with dataset boundary, feature contract, metrics, calibration notes, and embedded memory/latency budget.
- Add exported model artifact plus host and target inference transcript.

## Suggested Next Pass

- Convert the highest-priority suggestions into per-repo GitHub issues.
- Add one evidence bundle per project under `docs/evidence/` or each project `docs/evidence/` folder.
- Re-run project simulation generation after any project title, screenshot, or evidence-link changes.
