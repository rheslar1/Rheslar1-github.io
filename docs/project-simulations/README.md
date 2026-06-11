# Project Simulation Evidence

Generated: 2026-06-11T12:00:00-04:00

This folder contains deterministic simulation evidence for every project currently listed in the portfolio catalog. The generator reads the project data source files, produces one synthetic trace per project, renders an SVG evidence dashboard, captures a PNG screenshot with headless Chrome, and verifies the expected artifacts.

## Generate

```bash
npm run simulate:projects
```

## Artifacts

| Project | Data | SVG | Screenshot |
| --- | --- | --- | --- |
| ansible | [JSON](ansible/simulation.json) | [SVG](ansible/simulation.svg) | [PNG](../evidence/project-simulations/ansible.png) |
| Bare-Metal Custom Board Bring-Up | [JSON](bare-metal-custom-board-bring-up/simulation.json) | [SVG](bare-metal-custom-board-bring-up/simulation.svg) | [PNG](../evidence/project-simulations/bare-metal-custom-board-bring-up.png) |
| Bare-Metal RTOS Scheduling | [JSON](bare-metal-rtos-scheduling/simulation.json) | [SVG](bare-metal-rtos-scheduling/simulation.svg) | [PNG](../evidence/project-simulations/bare-metal-rtos-scheduling.png) |
| BBB GPIO Controller Using Sysfs and Character Devices | [JSON](bbb-gpio-sysfs-character-device/simulation.json) | [SVG](bbb-gpio-sysfs-character-device/simulation.svg) | [PNG](../evidence/project-simulations/bbb-gpio-sysfs-character-device.png) |
| BBB Device Tree Overlay for an I2C Sensor | [JSON](bbb-i2c-sensor-device-tree-overlay/simulation.json) | [SVG](bbb-i2c-sensor-device-tree-overlay/simulation.svg) | [PNG](../evidence/project-simulations/bbb-i2c-sensor-device-tree-overlay.png) |
| BBB Minimal Buildroot Boot Image | [JSON](bbb-minimal-buildroot-boot-image/simulation.json) | [SVG](bbb-minimal-buildroot-boot-image/simulation.svg) | [PNG](../evidence/project-simulations/bbb-minimal-buildroot-boot-image.png) |
| BBB Modbus Industrial IoT Gateway | [JSON](bbb-modbus-industrial-iot-gateway/simulation.json) | [SVG](bbb-modbus-industrial-iot-gateway/simulation.svg) | [PNG](../evidence/project-simulations/bbb-modbus-industrial-iot-gateway.png) |
| BBB Real-Time PRU Co-Processor Driver | [JSON](bbb-pru-real-time-coprocessor-driver/simulation.json) | [SVG](bbb-pru-real-time-coprocessor-driver/simulation.svg) | [PNG](../evidence/project-simulations/bbb-pru-real-time-coprocessor-driver.png) |
| BBB Safe A/B Remote Update System | [JSON](bbb-safe-ab-remote-update-system/simulation.json) | [SVG](bbb-safe-ab-remote-update-system/simulation.svg) | [PNG](../evidence/project-simulations/bbb-safe-ab-remote-update-system.png) |
| BBB Yocto EKG Sensor Monitor | [JSON](bbb-yocto-ekg-sensor-monitor/simulation.json) | [SVG](bbb-yocto-ekg-sensor-monitor/simulation.svg) | [PNG](../evidence/project-simulations/bbb-yocto-ekg-sensor-monitor.png) |
| BeagleBone AD8232 EKG ADC Driver | [JSON](beaglebone-ad8232-ekg-driver/simulation.json) | [SVG](beaglebone-ad8232-ekg-driver/simulation.svg) | [PNG](../evidence/project-simulations/beaglebone-ad8232-ekg-driver.png) |
| BEMS | [JSON](bems/simulation.json) | [SVG](bems/simulation.svg) | [PNG](../evidence/project-simulations/bems.png) |
| BEMS-ai | [JSON](bems-ai/simulation.json) | [SVG](bems-ai/simulation.svg) | [PNG](../evidence/project-simulations/bems-ai.png) |
| BEMS Edge AI Gateway | [JSON](bems-edge-ai-gateway/simulation.json) | [SVG](bems-edge-ai-gateway/simulation.svg) | [PNG](../evidence/project-simulations/bems-edge-ai-gateway.png) |
| BMS Portfolio Dashboard | [JSON](bms-portfolio-dashboard/simulation.json) | [SVG](bms-portfolio-dashboard/simulation.svg) | [PNG](../evidence/project-simulations/bms-portfolio-dashboard.png) |
| CameraDemo | [JSON](camerademo/simulation.json) | [SVG](camerademo/simulation.svg) | [PNG](../evidence/project-simulations/camerademo.png) |
| CAN Bus ECU Simulation | [JSON](can-bus-ecu-simulation/simulation.json) | [SVG](can-bus-ecu-simulation/simulation.svg) | [PNG](../evidence/project-simulations/can-bus-ecu-simulation.png) |
| Closed-Loop Motor Control Platform | [JSON](closed-loop-motor-control-platform/simulation.json) | [SVG](closed-loop-motor-control-platform/simulation.svg) | [PNG](../evidence/project-simulations/closed-loop-motor-control-platform.png) |
| Connected IoT Device | [JSON](connected-iot-device/simulation.json) | [SVG](connected-iot-device/simulation.svg) | [PNG](../evidence/project-simulations/connected-iot-device.png) |
| Custom Buildroot Media/Kiosk System | [JSON](custom-buildroot-media-kiosk-system/simulation.json) | [SVG](custom-buildroot-media-kiosk-system/simulation.svg) | [PNG](../evidence/project-simulations/custom-buildroot-media-kiosk-system.png) |
| Custom OTA Update System | [JSON](custom-ota-update-system/simulation.json) | [SVG](custom-ota-update-system/simulation.svg) | [PNG](../evidence/project-simulations/custom-ota-update-system.png) |
| Custom Wi-Fi Driver Compilation & Network Integration | [JSON](custom-wifi-driver-network-integration/simulation.json) | [SVG](custom-wifi-driver-network-integration/simulation.svg) | [PNG](../evidence/project-simulations/custom-wifi-driver-network-integration.png) |
| Digi ConnectCore i.MX93 Peripheral Driver | [JSON](digi-imx93-peripheral-driver/simulation.json) | [SVG](digi-imx93-peripheral-driver/simulation.svg) | [PNG](../evidence/project-simulations/digi-imx93-peripheral-driver.png) |
| DRV8801 Brushed DC Motor Controller | [JSON](drv8801-brushed-dc-motor-controller/simulation.json) | [SVG](drv8801-brushed-dc-motor-controller/simulation.svg) | [PNG](../evidence/project-simulations/drv8801-brushed-dc-motor-controller.png) |
| Edge AI / TinyML Microcontroller | [JSON](edge-ai-tinyml-microcontroller/simulation.json) | [SVG](edge-ai-tinyml-microcontroller/simulation.svg) | [PNG](../evidence/project-simulations/edge-ai-tinyml-microcontroller.png) |
| Secure Boot and OTA Update System | [JSON](embedded-linux-secure-boot-ota-system/simulation.json) | [SVG](embedded-linux-secure-boot-ota-system/simulation.svg) | [PNG](../evidence/project-simulations/embedded-linux-secure-boot-ota-system.png) |
| Embedded Linux / Yocto Image | [JSON](embedded-linux-yocto-image/simulation.json) | [SVG](embedded-linux-yocto-image/simulation.svg) | [PNG](../evidence/project-simulations/embedded-linux-yocto-image.png) |
| FPGA to HPS Memory-Mapped Hardware Driver | [JSON](fpga-hps-memory-mapped-driver/simulation.json) | [SVG](fpga-hps-memory-mapped-driver/simulation.svg) | [PNG](../evidence/project-simulations/fpga-hps-memory-mapped-driver.png) |
| Low-Power Temperature Datalogger | [JSON](low-power-temperature-datalogger/simulation.json) | [SVG](low-power-temperature-datalogger/simulation.svg) | [PNG](../evidence/project-simulations/low-power-temperature-datalogger.png) |
| Medical Wearable Power Manager | [JSON](medical-wearable-power-manager/simulation.json) | [SVG](medical-wearable-power-manager/simulation.svg) | [PNG](../evidence/project-simulations/medical-wearable-power-manager.png) |
| MJPEG Video Streaming Server with Hardware UI | [JSON](mjpeg-video-streaming-hardware-ui/simulation.json) | [SVG](mjpeg-video-streaming-hardware-ui/simulation.svg) | [PNG](../evidence/project-simulations/mjpeg-video-streaming-hardware-ui.png) |
| MQTT-Based Industrial IoT Gateway | [JSON](mqtt-industrial-iot-gateway/simulation.json) | [SVG](mqtt-industrial-iot-gateway/simulation.svg) | [PNG](../evidence/project-simulations/mqtt-industrial-iot-gateway.png) |
| Multi-Sensor Data Logger over I2C/SPI | [JSON](multi-sensor-i2c-spi-data-logger/simulation.json) | [SVG](multi-sensor-i2c-spi-data-logger/simulation.svg) | [PNG](../evidence/project-simulations/multi-sensor-i2c-spi-data-logger.png) |
| Predictive AI Neural Seizure Analysis | [JSON](neural-seizure-ai-analysis/simulation.json) | [SVG](neural-seizure-ai-analysis/simulation.svg) | [PNG](../evidence/project-simulations/neural-seizure-ai-analysis.png) |
| nRF52840 BACnet Field Node | [JSON](nrf52840-bacnet-field-node/simulation.json) | [SVG](nrf52840-bacnet-field-node/simulation.svg) | [PNG](../evidence/project-simulations/nrf52840-bacnet-field-node.png) |
| Rheslar1-github.io | [JSON](portfolio/simulation.json) | [SVG](portfolio/simulation.svg) | [PNG](../evidence/project-simulations/portfolio.png) |
| Production Flash and Test Rig | [JSON](production-flash-test-rig/simulation.json) | [SVG](production-flash-test-rig/simulation.svg) | [PNG](../evidence/project-simulations/production-flash-test-rig.png) |
| pythonProject | [JSON](pythonproject/simulation.json) | [SVG](pythonproject/simulation.svg) | [PNG](../evidence/project-simulations/pythonproject.png) |
| Docker Containerization on a Read-Only Root Filesystem | [JSON](read-only-rootfs-docker-containerization/simulation.json) | [SVG](read-only-rootfs-docker-containerization/simulation.svg) | [PNG](../evidence/project-simulations/read-only-rootfs-docker-containerization.png) |
| Secure Bare-Metal Bootloader | [JSON](secure-bare-metal-bootloader/simulation.json) | [SVG](secure-bare-metal-bootloader/simulation.svg) | [PNG](../evidence/project-simulations/secure-bare-metal-bootloader.png) |
| SPI/I2C/UART MCU Bootloader | [JSON](spi-i2c-uart-mcu-bootloader/simulation.json) | [SVG](spi-i2c-uart-mcu-bootloader/simulation.svg) | [PNG](../evidence/project-simulations/spi-i2c-uart-mcu-bootloader.png) |
| study | [JSON](study/simulation.json) | [SVG](study/simulation.svg) | [PNG](../evidence/project-simulations/study.png) |
| TinyML Sensor Anomaly Detector | [JSON](tinyml-sensor-anomaly-detector/simulation.json) | [SVG](tinyml-sensor-anomaly-detector/simulation.svg) | [PNG](../evidence/project-simulations/tinyml-sensor-anomaly-detector.png) |
| Zephyr RTOS IoT Sensor Node | [JSON](zephyr-rtos-iot-sensor-node/simulation.json) | [SVG](zephyr-rtos-iot-sensor-node/simulation.svg) | [PNG](../evidence/project-simulations/zephyr-rtos-iot-sensor-node.png) |

## Provenance

These are synthetic portfolio simulations. They are intended to show runnable code paths, visual evidence generation, and project-specific validation framing. They are not live hardware captures unless a project-specific evidence note says otherwise.
