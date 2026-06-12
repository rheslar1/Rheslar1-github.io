# Yocto And Buildroot Guide

## Choosing An Image Strategy

| Strategy | Best For | Portfolio Proof |
| --- | --- | --- |
| Debian image | Fast hardware bring-up, package installs, demos, and baseline capture. | Can use Linux tools quickly and validate peripherals. |
| Buildroot image | Minimal appliance, fast boot, small rootfs, single-purpose service. | Owns boot chain, rootfs, init, and application packaging. |
| Yocto image | Product-style image, layered recipes, systemd services, update strategy. | Owns reproducible embedded Linux build and deployment model. |

## Buildroot Project Shape

Use Buildroot when the goal is a minimal, understandable boot-to-app image.

Recommended artifacts:

```text
buildroot/
  configs/beaglebone_black_defconfig
  board/beaglebone-black/
  rootfs-overlay/
  post-build.sh
  post-image.sh
docs/evidence/buildroot/
  build-log.txt
  image-size.txt
  boot-time.txt
  serial-console.log
```

Validation:

- U-Boot starts.
- Kernel boots.
- rootfs mounts read-only or as intended.
- Application service starts.
- Boot time is measured.

## Yocto Project Shape

Use Yocto when the goal is a product-style image with package ownership.

Recommended artifacts:

```text
meta-rheslar-bbb/
  conf/layer.conf
  recipes-core/images/rheslar-bbb-image.bb
  recipes-apps/project-service/project-service_git.bb
  recipes-apps/project-service/files/project-service.service
docs/evidence/yocto/
  bitbake-image.log
  package-manifest.txt
  systemd-status.txt
  boot-log.txt
```

Validation:

- Custom layer is listed by `bitbake-layers show-layers`.
- Recipe builds.
- Package appears in image manifest.
- systemd service is enabled or deliberately disabled.
- Hardware permissions are explicit.

## Service Packaging Pattern

For a BBB service:

```ini
[Unit]
Description=BBB project service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/project-service --config /etc/project-service/config.json
Restart=on-failure
RestartSec=2

[Install]
WantedBy=multi-user.target
```

Evidence:

```bash
systemctl status project-service --no-pager
journalctl -u project-service -n 120 --no-pager
```

## Update Strategy

For field-style BBB projects:

- Keep application config separate from application binary.
- Use signed artifacts when possible.
- Keep a known-good boot path.
- Use A/B or rollback tooling for eMMC deployments.
- Record power-loss behavior during update tests.

## Acceptance Standard

The image work is portfolio-ready when a reviewer can reproduce:

1. Build command.
2. Generated image path.
3. Flash command.
4. First boot log.
5. Application service status.
6. Hardware validation command.
7. Rollback or rescue path.
