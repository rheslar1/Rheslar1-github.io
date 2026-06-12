# Hardware Overview

## Board Role

BeagleBone Black is a Linux-capable development board built around the TI Sitara AM335x family. For this portfolio it is used as a compact embedded Linux platform for GPIO, I2C, SPI, UART, ADC/IIO, PRU real-time firmware, custom images, and field-gateway projects.

The board is valuable because it exposes enough hardware to prove low-level embedded Linux skills while still supporting normal Linux tooling, package management, SSH, systemd services, and reproducible build systems.

## Core Hardware Context

| Area | Portfolio Relevance |
| --- | --- |
| Processor | AM335x ARM Cortex-A8 class application processor for Linux user space and kernel work. |
| PRUs | Two programmable real-time units for deterministic I/O, timing, and Linux-to-real-time handoff. |
| Headers | P8 and P9 expansion headers expose GPIO, I2C, SPI, UART, PWM, ADC, power, and ground. |
| Boot Media | microSD and onboard eMMC support development, rescue, and deployment workflows. |
| Networking | Ethernet and USB gadget networking support first-boot setup and remote logs. |
| Analog Inputs | AIN channels are useful for sensor capture but require strict voltage protection. |

## Electrical Safety Rules

The BBB is not a 5 V tolerant general-purpose I/O target. Treat all header work as board-protection work:

- Verify every signal voltage before connecting it to P8/P9.
- Use common ground between the board and external circuit.
- Use level shifting for 5 V modules.
- Protect analog inputs with divider, buffer, or clamp strategy as appropriate.
- Never connect AD8232-style 3.3 V analog output directly to an AIN pin without a divider or other protection.
- Keep a board-revision, pin, and wiring note with every evidence capture.

## Pin Planning Checklist

Before wiring a project:

1. Pick the bus or signal path.
2. Identify header pin and processor ball mapping from the System Reference Manual.
3. Check boot-time pin use and cape conflicts.
4. Confirm Linux pinmux state.
5. Decide whether a device tree overlay is required.
6. Record voltage domain and external circuit assumptions.
7. Add a rollback path so the board can boot if the overlay is wrong.

## First Hardware Evidence To Capture

```bash
cat /proc/device-tree/model
uname -a
cat /etc/os-release
lsblk
ip addr
dmesg -T | tail -n 120
```

Add a short photo or diagram showing the BBB, power source, Ethernet/USB path, and connected circuit. For analog work, include the divider values and measured voltage range.

## Documentation Boundary

This documentation is for portfolio and engineering workflow support. Always confirm exact pin electrical limits, boot configuration, and processor details against the BeagleBone Black System Reference Manual and TI AM335x Technical Reference Manual before connecting hardware.
