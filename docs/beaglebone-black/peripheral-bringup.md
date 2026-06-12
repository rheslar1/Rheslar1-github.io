# Peripheral Bring-Up

## General Pattern

Every BBB peripheral project should follow the same evidence loop:

1. Confirm the bus exists in Linux.
2. Confirm pinmux state.
3. Connect hardware with voltage protection.
4. Run a minimal read/write smoke test.
5. Capture logs and command output.
6. Add failure modes and rollback notes.

## GPIO

Modern Linux systems prefer the GPIO character device interface over old sysfs GPIO. Some portfolio projects intentionally show sysfs as a beginner stepping stone, then upgrade to a character-device or libgpiod-style workflow.

Evidence commands:

```bash
gpioinfo 2>/dev/null || true
gpiodetect 2>/dev/null || true
ls /dev/gpiochip* 2>/dev/null || true
```

For legacy sysfs examples:

```bash
ls /sys/class/gpio
```

Portfolio note: if a project uses sysfs, document that it is legacy and explain the production migration path.

## I2C

Use I2C for sensors such as BMP280-style temperature/pressure devices.

Evidence commands:

```bash
ls /dev/i2c-*
i2cdetect -l
i2cdetect -y <bus>
dmesg -T | rg -i 'i2c|bmp|sensor' || true
```

Validation:

- Expected address appears.
- No bus lockups.
- Pull-ups are appropriate for voltage domain.
- Kernel driver or user-space reader is documented.

## SPI

SPI requires pinmux, chip select planning, and mode/speed agreement.

Evidence commands:

```bash
ls /dev/spidev*
dmesg -T | rg -i 'spi|spidev' || true
```

Validation:

- Device node exists.
- Clock, MISO, MOSI, and CS are scoped or logic-analyzer verified when hardware is available.
- The project records SPI mode and max clock.

## UART

UART supports serial devices, RS-485 adapters, Modbus RTU, and diagnostic links.

Evidence commands:

```bash
ls /dev/ttyO* /dev/ttyS* 2>/dev/null || true
stty -F /dev/ttyS1 -a 2>/dev/null || true
dmesg -T | rg -i 'tty|uart|serial' || true
```

For Modbus/RS-485:

- Record baud rate, parity, stop bits, slave ID, and termination.
- Capture request/response hex frames.
- Add timeout/retry behavior and bus-fault handling.

## PWM

PWM is used for motor, LED, and actuator control. Evidence should include period, duty cycle, and measured output.

Evidence commands:

```bash
find /sys/class/pwm -maxdepth 3 -type f -print 2>/dev/null
```

Validation:

- Exported channel matches the intended header pin.
- Duty cycle changes are bounded.
- Output is disabled on process exit or service stop.

## ADC / IIO

Analog inputs are exposed through Linux IIO on many images.

Evidence commands:

```bash
ls /sys/bus/iio/devices
find /sys/bus/iio/devices -maxdepth 2 -type f -name 'in_voltage*_raw' -print
find /sys/bus/iio/devices -maxdepth 2 -type f -name 'in_voltage*_scale' -print
```

Validation:

- ADC voltage range is protected.
- Divider ratio is documented.
- Sample rate is measured under CPU load.
- CSV output includes timestamp, raw count, scaled voltage, and reconstructed sensor-side voltage.

## Evidence Template

```text
Peripheral:
Pins:
Voltage domain:
Kernel image:
Device node:
Smoke command:
Expected result:
Measured result:
Failure modes:
Rollback:
```
