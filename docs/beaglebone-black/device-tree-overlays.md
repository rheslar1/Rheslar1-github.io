# Device Tree Overlay Guide

## Why Device Tree Matters

The BBB expansion headers expose many multiplexed processor pins. A pin can be GPIO, UART, I2C, SPI, PWM, eCAP, eQEP, or another function depending on pinmux configuration. Device tree is the Linux description of that hardware configuration.

For portfolio projects, device tree work proves that the project owns the hardware/software boundary instead of relying only on a library call.

## Overlay Use Cases

| Use Case | Example Project |
| --- | --- |
| Enable I2C sensor bus | BBB Device Tree Overlay for an I2C Sensor |
| Enable SPI device node | Multi-sensor logger or display module |
| Enable UART for Modbus | BBB Modbus Industrial IoT Gateway |
| Reserve PRU pins | BBB Real-Time PRU Co-Processor Driver |
| Expose ADC/IIO path | BBB Yocto EKG Sensor Monitor |

## Overlay Design Steps

1. Identify the header pin.
2. Map header pin to processor ball and mux mode.
3. Check conflicts with HDMI, eMMC, cape overlays, and boot pins.
4. Define pinctrl state.
5. Enable bus node or add child device.
6. Compile overlay.
7. Boot with overlay.
8. Validate device node and dmesg output.
9. Keep a serial-console recovery path.

## Commands To Capture

```bash
cat /proc/device-tree/model
uname -a
dmesg -T | rg -i 'overlay|pinctrl|i2c|spi|uart|pru|cape' || true
find /proc/device-tree -maxdepth 3 -type d | head
ls /dev/i2c-* /dev/spidev* /dev/ttyS* 2>/dev/null || true
```

## Overlay Evidence

Commit these artifacts with a project:

```text
docs/evidence/device-tree/
  overlay-source.dts
  overlay-build.log
  boot-uenv.txt
  dmesg-overlay.txt
  device-node-list.txt
  rollback-note.md
```

## Rollback Rules

Bad overlays can break boot or hide console/network hardware. Before testing:

- Keep a known-good microSD image.
- Keep serial console connected.
- Save original `/boot/uEnv.txt`.
- Change one overlay at a time.
- Avoid disabling eMMC pins unless the project intentionally boots from microSD.

## Review Questions

A reviewer should be able to answer:

- Which header pins are used?
- Which processor mode is selected?
- Which bus or device node appears after boot?
- What conflicts were checked?
- How does the board recover if the overlay is wrong?
