# Boot And Image Runbook

## Boot Workflow

BeagleBone Black projects usually start from one of three boot models:

| Boot Model | Use |
| --- | --- |
| microSD development image | Fast iteration, rescue path, and experiments that should not risk eMMC. |
| eMMC installed image | Appliance-style deployment and repeatable power-on behavior. |
| custom Buildroot/Yocto image | Portfolio proof of image ownership, service packaging, and controlled userspace. |

## Baseline Board Identification

Run these commands on first boot and commit the output to project evidence:

```bash
cat /proc/device-tree/model
uname -a
cat /etc/os-release
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
df -h
```

## microSD Image Flow

1. Download a known BeagleBoard image.
2. Write it to microSD with a verified imaging tool.
3. Boot the board from microSD.
4. Confirm serial console or SSH access.
5. Capture `uname`, `os-release`, `lsblk`, and `dmesg`.
6. Record whether the board booted from `mmcblk0` or `mmcblk1`.

Expected evidence:

```text
docs/evidence/boot/
  001-image-source.txt
  002-first-boot-uname.txt
  003-lsblk.txt
  004-dmesg-tail.txt
  005-network.txt
```

## Serial Console

Keep serial console available while changing bootloader settings, overlays, or root filesystems. The serial log is the fastest way to diagnose:

- U-Boot environment problems.
- Wrong root filesystem UUID.
- Kernel panic.
- Failed overlay load.
- systemd service boot loops.

Capture:

```bash
sudo picocom -b 115200 /dev/ttyUSB0
```

or the equivalent serial tool used by the host machine.

## Network Bring-Up

Verify IP path:

```bash
ip addr
ip route
ping -c 3 8.8.8.8
ping -c 3 github.com
```

For USB gadget networking, record host-side interface name and board-side IP. For Ethernet, record DHCP lease or static address.

## Service Boot Evidence

For projects that install a daemon:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now project-name.service
systemctl status project-name.service --no-pager
journalctl -u project-name.service -n 120 --no-pager
```

Evidence should show:

- Service enabled.
- Service active.
- No repeated restart loop.
- Logs include version, config path, and hardware path.

## Recovery Plan

Before making persistent boot changes:

- Keep a known-good microSD card.
- Keep serial console connected.
- Copy current `/boot/uEnv.txt`.
- Keep a rollback command or alternate image.
- For eMMC work, confirm a microSD rescue boot still works.

## Portfolio Acceptance

A BBB boot project is review-ready when it includes:

- Image source.
- Boot command/log.
- Board identification.
- Kernel version.
- rootfs layout.
- Service or application startup proof.
- Recovery note.
