# BeagleBone Black Documentation Package

This package is the shared BeagleBone Black reference for the portfolio's BBB projects. It explains the board workflow, boot path, Linux I/O model, device tree work, PRU real-time path, Yocto/Buildroot image options, and validation evidence expected for hardware-backed project reviews.

## Portfolio Projects Covered

| Project | Focus |
| --- | --- |
| BBB Minimal Buildroot Boot Image | U-Boot, kernel, rootfs, microSD boot, boot-time evidence. |
| BBB GPIO Controller Using Sysfs and Character Devices | GPIO through Linux user space and a simple character-device upgrade path. |
| BBB Device Tree Overlay for an I2C Sensor | Header pins, I2C bus enablement, overlay flow, and Linux IIO-style sensor exposure. |
| BBB Modbus Industrial IoT Gateway | UART/RS-485 fieldbus, MQTT/TLS publishing, hardened image ownership. |
| BBB Yocto EKG Sensor Monitor | ADC/IIO capture, systemd acquisition service, Yocto image integration. |
| BBB Real-Time PRU Co-Processor Driver | PRU firmware, remoteproc/rpmsg, deterministic timing, Linux handoff. |
| BBB Safe A/B Remote Update System | eMMC partitioning, U-Boot bootcount, RAUC/Mender style rollback. |
| BeagleBone AD8232 EKG ADC Driver | Protected analog input, IIO ADC reads, lead-off GPIOs, waveform evidence. |

## Documents

| Document | Purpose |
| --- | --- |
| [Hardware Overview](hardware-overview.md) | Board capabilities, AM335x context, headers, boot media, power, ADC limits, and safety notes. |
| [Boot And Image Runbook](boot-and-image-runbook.md) | microSD/eMMC boot flow, flashing, serial console, first boot, network, and recovery workflow. |
| [Peripheral Bring-Up](peripheral-bringup.md) | GPIO, I2C, SPI, UART, PWM, ADC/IIO, and field wiring validation patterns. |
| [Device Tree Overlay Guide](device-tree-overlays.md) | Pinmux, cape compatibility, overlay design, validation, and rollback. |
| [PRU Real-Time Guide](pru-realtime.md) | PRU architecture, remoteproc/rpmsg flow, timing model, and validation captures. |
| [Yocto And Buildroot Guide](yocto-buildroot.md) | When to use Debian, Buildroot, or Yocto for portfolio projects and deployment evidence. |
| [Validation Checklist](validation-checklist.md) | Evidence matrix for boot, power, pins, services, update, network, and timing tests. |
| [Project Map](portfolio-project-map.md) | How this shared BBB documentation maps back to each portfolio project. |

## Quick Start Flow

1. Identify board revision and image:

   ```bash
   cat /proc/device-tree/model
   uname -a
   cat /etc/os-release
   lsblk
   ```

2. Confirm serial console or SSH access before changing pins, overlays, or boot files.

3. Capture baseline hardware state:

   ```bash
   dmesg -T | tail -n 120
   ip addr
   ls /sys/bus/iio/devices
   ls /sys/class/gpio 2>/dev/null || true
   ```

4. Make one hardware change at a time and commit the command output into the project evidence folder.

## Reference Links

- BeagleBone Black product page: https://beagleboard.org/black
- BeagleBoard getting started guide: https://docs.beagleboard.org/intro/support/getting-started.html
- BeagleBoard software images: https://www.beagleboard.org/distros
- BeagleBone Black System Reference Manual PDF: https://docs.beagleboard.org/beaglebone-black.pdf
- BeagleBone cape interface specification: https://docs.beagleboard.org/boards/capes/cape-interface-spec.html
- TI AM335x Technical Reference Manual: https://www.ti.com/lit/ug/spruh73q/spruh73q.pdf
