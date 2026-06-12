# Validation Checklist

Use this checklist before claiming a BBB project is hardware-backed.

## Board And Image

- [ ] Board model captured with `/proc/device-tree/model`.
- [ ] Kernel version captured with `uname -a`.
- [ ] OS release captured with `/etc/os-release`.
- [ ] Boot media shown with `lsblk`.
- [ ] Serial or SSH access documented.
- [ ] Recovery path documented.

## Power And Wiring

- [ ] Power source recorded.
- [ ] Common ground verified.
- [ ] Header pins listed.
- [ ] Voltage domains listed.
- [ ] Analog inputs protected.
- [ ] Photo, schematic, or wiring diagram attached.

## Device Tree And Pins

- [ ] Pinmux plan documented.
- [ ] Overlay source committed when used.
- [ ] Overlay build log captured.
- [ ] dmesg overlay output captured.
- [ ] Device nodes listed.
- [ ] Rollback plan documented.

## Peripheral

- [ ] GPIO/I2C/SPI/UART/PWM/ADC device path captured.
- [ ] Minimal smoke test recorded.
- [ ] Expected result described.
- [ ] Actual result captured.
- [ ] Failure behavior documented.

## Service

- [ ] systemd unit committed.
- [ ] `systemctl status` captured.
- [ ] `journalctl` captured.
- [ ] Restart policy explained.
- [ ] Permissions explained.

## PRU

- [ ] Firmware build captured.
- [ ] remoteproc/rpmsg/UIO path captured.
- [ ] Timing target stated.
- [ ] Jitter or latency measured.
- [ ] Dropped-message count recorded.

## Network And Gateway

- [ ] IP route captured.
- [ ] MQTT/HTTP endpoint configured safely.
- [ ] TLS/certificate handling documented if used.
- [ ] Offline/reconnect behavior tested.

## Update And Recovery

- [ ] Image version recorded.
- [ ] Update mechanism documented.
- [ ] Rollback behavior tested or clearly planned.
- [ ] Power-loss risk documented.

## Evidence Folder Pattern

```text
docs/evidence/
  board/
  boot/
  wiring/
  device-tree/
  peripheral/
  service/
  timing/
  update/
```

## Minimum Review-Ready Bar

A project should not be marked hardware-backed until it has:

- Board identity.
- Wiring/pin note.
- Command output.
- Service or app result.
- Failure modes.
- Screenshot/photo/log evidence.
