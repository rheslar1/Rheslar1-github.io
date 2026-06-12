# Portfolio Project Map

This map connects the shared BeagleBone Black documentation to each BBB project in the portfolio.

## BBB Minimal Buildroot Boot Image

Use:

- [Boot And Image Runbook](boot-and-image-runbook.md)
- [Yocto And Buildroot Guide](yocto-buildroot.md)
- [Validation Checklist](validation-checklist.md)

Evidence target:

- Buildroot defconfig.
- U-Boot/kernel/rootfs build log.
- microSD boot log.
- boot-time measurement.

## BBB GPIO Controller Using Sysfs and Character Devices

Use:

- [Hardware Overview](hardware-overview.md)
- [Peripheral Bring-Up](peripheral-bringup.md)
- [Device Tree Overlay Guide](device-tree-overlays.md)

Evidence target:

- GPIO pin plan.
- sysfs demo output.
- character-device upgrade path.
- LED/button wiring photo.

## BBB Device Tree Overlay for an I2C Sensor

Use:

- [Device Tree Overlay Guide](device-tree-overlays.md)
- [Peripheral Bring-Up](peripheral-bringup.md)
- [Validation Checklist](validation-checklist.md)

Evidence target:

- overlay source.
- `i2cdetect` output.
- dmesg overlay output.
- sensor reading log.

## BBB Modbus Industrial IoT Gateway

Use:

- [Peripheral Bring-Up](peripheral-bringup.md)
- [Yocto And Buildroot Guide](yocto-buildroot.md)
- [Validation Checklist](validation-checklist.md)

Evidence target:

- UART/RS-485 wiring.
- Modbus frame log.
- MQTT/TLS publish log.
- reconnect behavior.

## BBB Yocto EKG Sensor Monitor

Use:

- [Hardware Overview](hardware-overview.md)
- [Peripheral Bring-Up](peripheral-bringup.md)
- [Yocto And Buildroot Guide](yocto-buildroot.md)

Evidence target:

- ADC protection note.
- Linux IIO capture log.
- systemd acquisition service status.
- waveform CSV/plot.

## BBB Real-Time PRU Co-Processor Driver

Use:

- [PRU Real-Time Guide](pru-realtime.md)
- [Device Tree Overlay Guide](device-tree-overlays.md)
- [Validation Checklist](validation-checklist.md)

Evidence target:

- PRU firmware build.
- remoteproc/rpmsg status.
- timing/jitter report.
- Linux reader log.

## BBB Safe A/B Remote Update System

Use:

- [Boot And Image Runbook](boot-and-image-runbook.md)
- [Yocto And Buildroot Guide](yocto-buildroot.md)
- [Validation Checklist](validation-checklist.md)

Evidence target:

- eMMC partition map.
- bootcount or update-state log.
- failed update rollback.
- power-loss test note.

## BeagleBone AD8232 EKG ADC Driver

Use:

- [Hardware Overview](hardware-overview.md)
- [Peripheral Bring-Up](peripheral-bringup.md)
- [Validation Checklist](validation-checklist.md)

Evidence target:

- AD8232-to-BBB protected analog path.
- divider ratio and measured voltages.
- IIO ADC capture.
- waveform and heart-rate report.
