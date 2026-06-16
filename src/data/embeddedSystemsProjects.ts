import type { Project } from '../types';

const githubPreview = (repo: string) => `https://opengraph.githubassets.com/embedded-systems/rheslar1/${repo}`;
const githubRepo = (repo: string) => `https://github.com/rheslar1/${repo}`;
const portfolioDoc = (docPath: string) => `https://github.com/rheslar1/Rheslar1-github.io/blob/main/${docPath}`;
const portfolioRaw = (docPath: string) => `https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/${docPath}`;
const projectAsset = (name: string) => `${process.env.PUBLIC_URL}/assets/projects/${name}`;

const embeddedSystemsCoreTags = ['C++17', 'C++ Design Patterns', 'SOLID'];
const withCoreTags = (tags: string[]) => Array.from(new Set([...embeddedSystemsCoreTags, ...tags]));

interface EmbeddedSystemsSpec {
  id: string;
  title: string;
  summary: string;
  label: string;
  tags: string[];
  proof: string;
}

const isBeagleBoneBlackProject = (spec: EmbeddedSystemsSpec) =>
  spec.tags.includes('BeagleBone Black') || /\bBBB\b|BeagleBone Black/i.test(`${spec.title} ${spec.summary}`);

const beagleboneBlackDocs = [
  {
    title: 'BeagleBone Black Documentation',
    path: 'docs/beaglebone-black/README.md',
    url: portfolioDoc('docs/beaglebone-black/README.md'),
    focus: 'Shared BBB reference index covering hardware, boot images, peripherals, overlays, PRU, Yocto/Buildroot, validation, and project mapping'
  },
  {
    title: 'BBB Boot And Image Runbook',
    path: 'docs/beaglebone-black/boot-and-image-runbook.md',
    url: portfolioDoc('docs/beaglebone-black/boot-and-image-runbook.md'),
    focus: 'microSD/eMMC boot, serial console, first boot capture, network bring-up, service startup, and recovery plan'
  },
  {
    title: 'BBB Peripheral Bring-Up',
    path: 'docs/beaglebone-black/peripheral-bringup.md',
    url: portfolioDoc('docs/beaglebone-black/peripheral-bringup.md'),
    focus: 'GPIO, I2C, SPI, UART, PWM, ADC/IIO, voltage protection, and evidence templates'
  },
  {
    title: 'BBB Validation Checklist',
    path: 'docs/beaglebone-black/validation-checklist.md',
    url: portfolioDoc('docs/beaglebone-black/validation-checklist.md'),
    focus: 'Board, image, wiring, device tree, service, PRU, network, update, and evidence acceptance checks'
  }
];

const embeddedSystemsSpecs: EmbeddedSystemsSpec[] = [
  {
    id: 'bems-edge-ai-gateway',
    title: 'BEMS Edge AI Gateway',
    summary: 'C++ edge runtime coordinating BACnet polling, local safety rules, RabbitMQ command transport, and cloud-ready telemetry.',
    label: 'Embedded Systems',
    tags: ['C++', 'BACnet/IP', 'RabbitMQ', 'Docker', 'i.MX93'],
    proof: 'Resilient edge control with simulator-safe fallbacks and observable health checks.'
  },
  {
    id: 'nrf52840-bacnet-field-node',
    title: 'nRF52840 BACnet Field Node',
    summary: 'Battery-aware field device profile with persistent setpoint storage, commissioning evidence, and BACnet object mapping.',
    label: 'Bare-metal device',
    tags: ['nRF52840', 'C', 'EEPROM', 'BACnet', 'BLE-ready'],
    proof: 'Provisioning path for wireless and wired building devices with retained configuration.'
  },
  {
    id: 'production-flash-test-rig',
    title: 'Production Flash and Test Rig',
    summary: 'Repeatable board flashing, update-cycle validation, and long-run soak checks for deployment confidence.',
    label: 'Manufacturing readiness',
    tags: ['SWUpdate', 'Yocto', 'Shell', 'QA logs', 'Hardware lab'],
    proof: 'Clear pass/fail evidence for firmware updates, board bring-up, and field acceptance.'
  },
  {
    id: 'zephyr-rtos-iot-sensor-node',
    title: 'Zephyr RTOS IoT Sensor Node',
    summary: 'Edge sensor node with Zephyr threads, Wi-Fi/BLE provisioning, power-mode profiling, encrypted telemetry, and signed OTA firmware updates.',
    label: 'Senior repo example',
    tags: ['Zephyr RTOS', 'BLE', 'Wi-Fi', 'MCUboot', 'TLS', 'Power profiling'],
    proof: 'Real concurrency, secure update flow, low-power design, and production-grade device lifecycle thinking.'
  },
  {
    id: 'closed-loop-motor-control-platform',
    title: 'Closed-Loop Motor Control Platform',
    summary: 'PID or FOC motor driver with encoder feedback, IMU sensor fusion, current limiting, and deterministic control loops on STM32 or ESP32.',
    label: 'Senior repo example',
    tags: ['STM32', 'FOC/PID', 'IMU', 'Encoders', 'PWM', 'Control theory'],
    proof: 'Math-heavy firmware, timing discipline, safety bounds, calibration tooling, and hardware-in-the-loop validation.'
  },
  {
    id: 'secure-bare-metal-bootloader',
    title: 'Secure Bare-Metal Bootloader',
    summary: 'Custom bootloader with flash memory partitioning, rollback-safe image slots, cryptographic signature verification, and update diagnostics.',
    label: 'Senior repo example',
    tags: ['Bare metal C', 'Linker scripts', 'Flash layout', 'ECDSA', 'SHA-256', 'UART/USB DFU'],
    proof: 'Deep hardware/software integration, secure boot fundamentals, memory maps, and recoverable field updates.'
  },
  {
    id: 'custom-ota-update-system',
    title: 'Custom OTA Update System',
    summary: 'Secure dual-partition firmware update flow for ESP32 or STM32 with signed image verification, staged rollouts, and automatic fallback.',
    label: 'Senior repo example',
    tags: ['ESP32/STM32', 'Dual partition', 'MCUboot', 'ECDSA', 'TLS', 'Rollback logic'],
    proof: 'Production deployment pipelines, secure update handling, flash layout discipline, and field recovery behavior.'
  },
  {
    id: 'bare-metal-rtos-scheduling',
    title: 'Bare-Metal RTOS Scheduling',
    summary: 'Multi-threaded FreeRTOS or Zephyr application with queues, mutexes, semaphores, interrupt handoff, and priority inversion notes.',
    label: 'Senior repo example',
    tags: ['FreeRTOS', 'Zephyr', 'IPC', 'Mutexes', 'Semaphores', 'Priority inheritance'],
    proof: 'Real concurrency, deterministic task design, shared-resource safety, and explainable scheduler tradeoffs.'
  },
  {
    id: 'embedded-linux-yocto-image',
    title: 'Embedded Linux / Yocto Image',
    summary: 'Custom Linux image for Raspberry Pi, BeagleBone, or i.MX-class hardware with Yocto recipes, kernel config, service units, and rootfs notes.',
    label: 'Senior repo example',
    tags: ['Yocto', 'BitBake', 'Kernel config', 'Systemd', 'Device tree', 'Rootfs'],
    proof: 'Board-support fluency, package ownership, appliance-style Linux builds, and reproducible edge deployment.'
  },
  {
    id: 'custom-buildroot-media-kiosk-system',
    title: 'Custom Buildroot Media/Kiosk System',
    summary: 'Lightweight fast-booting Linux distribution built with Buildroot and configured to launch a single headless or kiosk-style application.',
    label: 'Embedded Linux beginner',
    tags: ['Buildroot', 'Rootfs', 'Kernel config', 'Fast boot', 'Raspberry Pi', 'BeagleBone'],
    proof: 'Custom image generation, minimal userspace ownership, and boot-to-application Linux appliance design.'
  },
  {
    id: 'bbb-minimal-buildroot-boot-image',
    title: 'BBB Minimal Buildroot Boot Image',
    summary: 'BeagleBone Black AM335x project that builds U-Boot, Linux kernel, and a tiny root filesystem with Buildroot for a sub-5-second login prompt.',
    label: 'BeagleBone Black beginner',
    tags: ['BeagleBone Black', 'AM335x', 'Buildroot', 'U-Boot', 'Kernel build', 'microSD boot'],
    proof: 'Board-specific boot-chain ownership, fast minimal Linux image generation, and clear startup-time evidence.'
  },
  {
    id: 'bbb-gpio-sysfs-character-device',
    title: 'BBB GPIO Controller Using Sysfs and Character Devices',
    summary: 'BeagleBone Black GPIO project that toggles LEDs and buttons through /sys/class/gpio, then upgrades the workflow into a custom /dev LED character driver.',
    label: 'BeagleBone Black beginner',
    tags: ['BeagleBone Black', 'GPIO', 'Sysfs', 'Character driver', 'P8/P9 headers', 'C'],
    proof: 'Linux file-based hardware control, header-pin wiring evidence, and first custom character-device driver workflow.'
  },
  {
    id: 'custom-wifi-driver-network-integration',
    title: 'Custom Wi-Fi Driver Compilation & Network Integration',
    summary: 'Kernel-module and network-stack project that cross-compiles Wi-Fi driver support, updates device tree integration, and validates socket traffic with a host PC.',
    label: 'Embedded Linux beginner',
    tags: ['Linux kernel', 'Wi-Fi driver', 'Kernel module', 'Device tree', 'Cross-compilation', 'Sockets'],
    proof: 'Kernel module workflow, network interface bring-up, device-tree awareness, and user-space C networking validation.'
  },
  {
    id: 'multi-sensor-i2c-spi-data-logger',
    title: 'Multi-Sensor Data Logger over I2C/SPI',
    summary: 'Multi-threaded C/C++ Linux data logger that reads temperature, pressure, and humidity sensors through /dev/i2c-* or /dev/spidev* and stores records in SQLite.',
    label: 'Embedded Linux beginner',
    tags: ['I2C', 'SPI', 'POSIX threads', 'SQLite', 'C/C++', 'Sensor logging'],
    proof: 'Linux file-based peripheral access, concurrent sensor reads, local persistence, and repeatable data-capture evidence.'
  },
  {
    id: 'bbb-i2c-sensor-device-tree-overlay',
    title: 'BBB Device Tree Overlay for an I2C Sensor',
    summary: 'BeagleBone Black sensor bring-up project that wires a BMP280-style I2C sensor, builds a .dtbo overlay, loads it at boot, and reads values through Linux IIO.',
    label: 'BeagleBone Black intermediate',
    tags: ['BeagleBone Black', 'Device tree overlay', 'I2C', 'BMP280', 'IIO', 'dtbo'],
    proof: 'Device-tree modification skill, kernel-visible sensor integration, and standard /sys/bus/iio device evidence.'
  },
  {
    id: 'bbb-modbus-industrial-iot-gateway',
    title: 'BBB Modbus Industrial IoT Gateway',
    summary: 'BeagleBone Black gateway built on a hardened Yocto image that reads Modbus data over UART and publishes secure MQTT telemetry over Ethernet or Wi-Fi.',
    label: 'BeagleBone Black intermediate',
    tags: ['BeagleBone Black', 'Yocto', 'Modbus', 'UART', 'MQTT/TLS', 'Industrial IoT'],
    proof: 'Factory-style serial telemetry ingestion, secure cloud publishing, and BBB-specific hardened image deployment.'
  },
  {
    id: 'bbb-yocto-ekg-sensor-monitor',
    title: 'BBB Yocto EKG Sensor Monitor',
    summary: 'BeagleBone Black medical-sensor project using a custom Yocto image, ADC-connected EKG/ECG front end, systemd acquisition service, and local waveform logging.',
    label: 'BeagleBone Black intermediate',
    tags: ['BeagleBone Black', 'Yocto', 'EKG/ECG', 'ADC', 'IIO', 'Systemd', 'Signal filtering'],
    proof: 'Custom Linux image ownership, analog biosignal acquisition, timestamped waveform capture, filtering evidence, and board-level validation boundaries.'
  },
  {
    id: 'mjpeg-video-streaming-hardware-ui',
    title: 'MJPEG Video Streaming Server with Hardware UI',
    summary: 'V4L2 camera project that captures snapshots, records raw video, streams MJPEG over a local HTTP server, and maps physical buttons into UI actions.',
    label: 'Embedded Linux intermediate',
    tags: ['V4L2', 'MJPEG', 'HTTP server', 'CSI camera', 'GPIO buttons', 'Hardware UI'],
    proof: 'High-bandwidth peripheral handling, media pipeline design, local network streaming, and physical UI integration.'
  },
  {
    id: 'mqtt-industrial-iot-gateway',
    title: 'MQTT-Based Industrial IoT Gateway',
    summary: 'Yocto-generated gateway image that polls serial telemetry from Modbus or CAN simulation, parses frames, and publishes cloud updates over MQTT/TLS.',
    label: 'Embedded Linux intermediate',
    tags: ['Yocto', 'MQTT', 'TLS', 'Modbus', 'CAN', 'Serial telemetry'],
    proof: 'Industrial protocol bridging, hardened Linux image ownership, secure MQTT publishing, and cloud-ready telemetry flow.'
  },
  {
    id: 'read-only-rootfs-docker-containerization',
    title: 'Docker Containerization on a Read-Only Root Filesystem',
    summary: 'High-reliability embedded Linux deployment model using a read-only root filesystem, volatile writable overlays, and Docker-managed applications.',
    label: 'Embedded Linux intermediate',
    tags: ['Read-only rootfs', 'Docker', 'OverlayFS', 'RAM overlay', 'Systemd', 'Reliability'],
    proof: 'Power-failure resilience, appliance-style filesystem design, containerized deployment, and update-friendly runtime boundaries.'
  },
  {
    id: 'fpga-hps-memory-mapped-driver',
    title: 'FPGA to HPS Memory-Mapped Hardware Driver',
    summary: 'Intel SoC project that maps FPGA logic into Linux user space through the HPS-to-FPGA bridge and toggles hardware registers with mmap().',
    label: 'Embedded Linux advanced',
    tags: ['FPGA', 'HPS bridge', 'mmap', 'Verilog', 'SystemVerilog', 'Register map'],
    proof: 'Hardware co-processing, memory-mapped register control, FPGA/Linux integration, and low-level driver reasoning.'
  },
  {
    id: 'bbb-pru-real-time-coprocessor-driver',
    title: 'BBB Real-Time PRU Co-Processor Driver',
    summary: 'BeagleBone Black PRU project that runs timing-critical firmware on the 200MHz PRUs and exchanges high-speed sensor or encoder data with Linux through rpmsg.',
    label: 'BeagleBone Black advanced',
    tags: ['BeagleBone Black', 'PRU', 'rpmsg', 'Kernel driver', 'Real-time control', 'Encoder input'],
    proof: 'True real-time BBB subsystem control, PRU/Linux messaging, kernel boundary design, and high-speed hardware timing evidence.'
  },
  {
    id: 'bbb-safe-ab-remote-update-system',
    title: 'BBB Safe A/B Remote Update System',
    summary: 'BeagleBone Black update project that partitions eMMC into A/B OS slots, coordinates U-Boot health checks, and uses RAUC or Mender for rollback-safe remote updates.',
    label: 'BeagleBone Black advanced',
    tags: ['BeagleBone Black', 'A/B partition', 'U-Boot', 'RAUC/Mender', 'eMMC', 'Rollback'],
    proof: 'Field-safe BBB update lifecycle, bootloader rollback behavior, and remote fleet-management readiness.'
  },
  {
    id: 'embedded-linux-secure-boot-ota-system',
    title: 'Secure Boot and OTA Update System',
    summary: 'Embedded Linux fleet-lifecycle project using U-Boot verified boot, signed FIT images, A/B partitions, and RAUC or Mender rollback-safe updates.',
    label: 'Embedded Linux advanced',
    tags: ['U-Boot', 'Verified boot', 'FIT images', 'RAUC/Mender', 'A/B partition', 'OTA rollback'],
    proof: 'Device lifecycle security, signed kernel execution, fail-safe OTA updates, and recoverable embedded Linux fleet deployment.'
  },
  {
    id: 'tinyml-sensor-anomaly-detector',
    title: 'TinyML Sensor Anomaly Detector',
    summary: 'Quantized sensor anomaly model running on an ARM Cortex-M core with measured RAM, flash, latency, and power budget constraints.',
    label: 'Senior repo example',
    tags: ['Cortex-M', 'TensorFlow Lite Micro', 'Quantization', 'CMSIS-NN', 'Ring buffers', 'Edge inference'],
    proof: 'Embedded ML optimization, memory budgeting, fixed-point inference, and useful intelligence at the device edge.'
  },
  {
    id: 'can-bus-ecu-simulation',
    title: 'CAN Bus ECU Simulation',
    summary: 'Automotive or industrial CAN network simulator with communicating nodes, arbitration IDs, filters, periodic frames, diagnostics, and bus error handling.',
    label: 'Senior repo example',
    tags: ['CAN', 'SocketCAN', 'STM32', 'DBC', 'Filters', 'Fault injection'],
    proof: 'Fieldbus fundamentals, real-time message design, diagnostic thinking, and resilient network behavior.'
  },
  {
    id: 'low-power-temperature-datalogger',
    title: 'Low-Power Temperature Datalogger',
    summary: 'Battery-powered outdoor datalogger that wakes on schedule, samples temperature, writes compact records, and sleeps aggressively.',
    label: 'Senior repo example',
    tags: ['Low power MCU', 'I2C sensor', 'RTC wake', 'Deep sleep', 'SD/Flash logging', 'Battery profiling'],
    proof: 'Measured power reduction, long-duration testing, hardware tradeoff documentation, and practical battery-life engineering.'
  },
  {
    id: 'spi-i2c-uart-mcu-bootloader',
    title: 'SPI/I2C/UART MCU Bootloader',
    summary: 'Bootloader that reprograms an MCU over UART, SPI, or I2C with packet framing, CRC checks, flash erase/write control, image validation, and recovery mode.',
    label: 'Senior repo example',
    tags: ['Bare metal C', 'UART', 'SPI', 'I2C', 'CRC32', 'Flash driver'],
    proof: 'Board-level protocol handling, robust firmware transfer, boot safety, and hardware/software integration under tight constraints.'
  },
  {
    id: 'digi-imx93-peripheral-driver',
    title: 'Digi ConnectCore i.MX93 Peripheral Driver',
    summary: 'Hardware peripheral driver for the Digi ConnectCore i.MX93 EVK, covering an on-chip SPI or PWM block, application layer, and test boundary.',
    label: 'Senior repo example',
    tags: ['i.MX93', 'Digi ConnectCore', 'SPI/PWM', 'Device tree', 'Linux driver', 'Unit tests'],
    proof: 'Board-specific bring-up, clean driver/application separation, register-level reasoning, and testable hardware abstractions.'
  },
  {
    id: 'drv8801-brushed-dc-motor-controller',
    title: 'DRV8801 Brushed DC Motor Controller',
    summary: 'Single-phase brushed DC motor control app using a DRV8801 driver, encoder feedback, and velocity or position control modes.',
    label: 'Senior repo example',
    tags: ['DRV8801', 'PWM', 'Quadrature encoder', 'PID', 'Velocity mode', 'Position mode'],
    proof: 'Closed-loop control, mode switching, tachometer and angular-offset display, tuning workflow, and safety-limited actuator control.'
  },
  {
    id: 'medical-wearable-power-manager',
    title: 'Medical Wearable Power Manager',
    summary: 'RTOS power-management thread for a battery wearable that schedules sensor reads, enters deep sleep, and uses DMA for autonomous sampling.',
    label: 'Senior repo example',
    tags: ['RTOS', 'Sleep states', 'DMA', 'Sensor sampling', 'Battery telemetry', 'Wake sources'],
    proof: 'Days-to-weeks runtime thinking, measurable sleep-current reduction, autonomous capture, and medical-device-grade power discipline.'
  },
  {
    id: 'connected-iot-device',
    title: 'Connected IoT Device',
    summary: 'RTOS-based sensor node with MQTT cloud integration, signed OTA updates, low-power operating modes, and TLS-backed device identity.',
    label: 'Standout integration project',
    tags: ['FreeRTOS/Zephyr', 'MQTT', 'TLS', 'OTA', 'Low power modes', 'Device identity'],
    proof: 'End-to-end connected-device architecture, secure cloud messaging, field-update readiness, and measured battery-aware behavior.'
  },
  {
    id: 'bare-metal-custom-board-bring-up',
    title: 'Bare-Metal Custom Board Bring-Up',
    summary: 'Custom PCB bring-up path with low-level device drivers, board diagnostics, register checks, and a UART or USB CDC CLI for validation.',
    label: 'Standout integration project',
    tags: ['Custom PCB', 'Bare metal C', 'Device drivers', 'UART CLI', 'USB CDC', 'Board diagnostics'],
    proof: 'Schematic-to-firmware ownership, peripheral validation, practical debug tooling, and confidence with first-board uncertainty.'
  },
  {
    id: 'edge-ai-tinyml-microcontroller',
    title: 'Edge AI / TinyML Microcontroller',
    summary: 'TensorFlow Lite for Microcontrollers model deployed on an MCU with quantization, memory profiling, inference timing, and RAM/flash optimization notes.',
    label: 'Standout integration project',
    tags: ['TFLite Micro', 'Cortex-M', 'Quantization', 'Memory profiling', 'CMSIS-NN', 'Edge inference'],
    proof: 'Model deployment under embedded constraints, measurable optimization work, and useful on-device intelligence without cloud dependence.'
  }
];

const buildEmbeddedSystemsProject = (spec: EmbeddedSystemsSpec): Project => ({
  id: spec.id,
  title: spec.title,
  collection: 'embedded-systems',
  summary: spec.summary,
  deployment:
    'Starter repository scaffolded for public GitHub review with source code, CMake build flow, architecture notes, smoke tests, and CI validation.',
  dependencies: withCoreTags(spec.tags),
  repository: githubRepo(spec.id),
  architectureDocs: [
    {
      title: 'Architecture Notes',
      path: 'ARCHITECTURE.md',
      url: `${githubRepo(spec.id)}/blob/main/ARCHITECTURE.md`,
      focus: spec.proof
    },
    {
      title: 'Simulation Evidence',
      path: `docs/project-simulations/${spec.id}/simulation.json`,
      url: portfolioDoc(`docs/project-simulations/${spec.id}/simulation.json`),
      focus: 'Deterministic project simulation data, generated SVG, and PNG screenshot evidence'
    },
    ...(spec.id === 'bare-metal-custom-board-bring-up'
      ? [
          {
            title: 'Board Bring-Up Schematic',
            path: 'docs/schematics/board-bring-up-schematic.svg',
            url: `${githubRepo(spec.id)}/blob/main/docs/schematics/board-bring-up-schematic.svg`,
            focus: 'Power rails, reset reason, clock lock, masked register checks, peripheral probes, and diagnostic transports'
          }
        ]
      : []),
    ...(isBeagleBoneBlackProject(spec) ? beagleboneBlackDocs : [])
  ],
  preview: githubPreview(spec.id),
  visuals: [
    {
      src: portfolioRaw(`docs/evidence/project-simulations/${spec.id}.png`),
      caption: `${spec.title} deterministic simulation screenshot generated by npm run simulate:projects.`
    }
  ],
  tags: withCoreTags(spec.tags).slice(0, 6),
  problem:
    `Create a portfolio-ready ${spec.label.toLowerCase()} project that demonstrates ${spec.proof.toLowerCase()}`,
  architecture:
    `${spec.summary} The scaffold separates source code, architecture documentation, validation notes, CI, tests, and generated simulation evidence so the repository can grow into hardware-backed evidence.`,
  proofPoints: [
    {
      label: spec.label,
      title: 'Portfolio-Ready Repo Shape',
      detail:
        'The project is represented as a standalone repository concept with README, architecture, source, tests, CI files, and generated simulation evidence instead of only a dashboard card.'
    },
    {
      label: 'Implementation Path',
      title: 'Starter Code Is Included',
      detail:
        'The scaffold includes a small buildable native control-profile executable and a generated simulation screenshot so the repo has an executable starting point before hardware-specific drivers are added.'
    },
    {
      label: 'Evidence Plan',
      title: 'Validation Work Is Explicit',
      detail: spec.proof
    }
  ],
  deepDetails: [
    `Repository target: ${githubRepo(spec.id)}.`,
    `Primary project focus: ${spec.summary}`,
    `Initial stack: ${withCoreTags(spec.tags).join(', ')}.`,
    'The scaffold includes CMake build metadata, a native source stub, README documentation, architecture notes, smoke-test expectations, and GitHub Actions CI.',
    'The README is written for reviewer scanning: purpose, stack, quick start, implementation slices, validation evidence, and next hardware-backed captures.',
    'ARCHITECTURE.md documents control boundaries, data flow, runtime safety, validation plan, and the evidence needed to mature the starter into a senior portfolio repo.',
    'The next implementation step is replacing the neutral control-profile stub with board-specific drivers, simulator inputs, and measured hardware logs.'
  ],
  features: [
    'Standalone public repository target and portfolio project detail entry.',
    'Native source-code starter with CMake build support.',
    'Architecture notes connecting the project concept to hardware, firmware, validation, and evidence.',
    'Generated simulation JSON, SVG, and PNG screenshot evidence from the portfolio simulator.',
    'Smoke-test scaffolding to keep docs and source structure reviewable.',
    'Dashboard shortcut from the EnergyBuildAI operations view.'
  ],
  outcomes: [
    'Project added to the portfolio catalog as an Embedded Systems design repo.',
    'Dashboard can navigate directly to the project detail page.',
    'Repository URL, architecture-doc URL, simulation evidence URL, tags, proof points, and evidence queue are prewired.',
    'Local starter repo scaffolding can be pushed to GitHub once repository creation credentials are available.'
  ],
  resumeBullets: [
    `Designed ${spec.title} as a portfolio-ready embedded systems repository concept.`,
    `Mapped ${spec.tags.slice(0, 3).join(', ')} into a practical implementation and validation plan.`,
    'Structured the project for future hardware-backed screenshots, build logs, and CI evidence.'
  ],
  screenshotCaption:
    'Repository preview uses the intended GitHub project URL. Replace with real build, hardware, or dashboard screenshots after the repo is pushed and validated.',
  suggestedContent: [
    'Push the scaffold to GitHub as a public repository.',
    'Capture the first successful CI run.',
    'Add hardware, simulator, or terminal evidence for the main control workflow.',
    'Replace the generated source stub with board-specific implementation slices.'
  ]
});

const embeddedSystemsProjects = embeddedSystemsSpecs.map(buildEmbeddedSystemsProject);

// QtRabbitAsync - Qt/C++ async backend with RabbitMQ integration
const qtrabbitAsyncProject: Project = {
  id: 'qtrabbit-async',
  title: 'QtRabbitAsync Backend',
  collection: 'embedded-systems',
  summary: 'Qt 6 C++ async backend using QPromise/QFuture, RabbitMQ publish/subscribe, OTA update pipeline, and QML integration.',
  deployment: 'Built as a CMake project for ARM64 Yocto targets or desktop Qt runtime. Includes Dockerfile for containerization.',
  dependencies: ['Qt 6', 'QPromise/QFuture', 'QtConcurrent', 'RabbitMQ/AMQP', 'C++17', 'CMake'],
  repository: 'https://github.com/rheslar1/Rheslar1-github.io/tree/main/QtRabbitAsync',
  architectureDocs: [
    {
      title: 'QtRabbitAsync README',
      path: 'QtRabbitAsync/PROJECT.md',
      url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/QtRabbitAsync/PROJECT.md',
      focus: 'Qt version of async, core interfaces, infrastructure, application layer, State pattern, OTA pipeline'
    },
    {
      title: 'Simulation Evidence',
      path: 'docs/project-simulations/qtrabbit-async/simulation.json',
      url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/project-simulations/qtrabbit-async/simulation.json',
      focus: 'Deterministic async publish latency simulation and scenario checks'
    }
  ],
  preview: projectAsset('qtrabbit-async-dashboard.svg'),
  visuals: [
    {
      src: projectAsset('qtrabbit-async-dashboard.svg'),
      caption: 'QtRabbitAsync dashboard showing async message publishing and OTA progress.'
    },
    {
      src: portfolioRaw('docs/project-simulations/qtrabbit-async/simulation.svg'),
      caption: 'Simulation evidence showing async publish latency and OTA progress over time.'
    }
  ],
  tags: ['Qt 6', 'QPromise', 'Async', 'RabbitMQ', 'C++', 'CMake', 'Embedded'],
  problem: 'Build a Qt-native async backend that can handle RabbitMQ messaging and OTA updates without blocking the UI thread.',
  architecture: 'BackendFacade exposes Q_INVOKABLE async methods. RabbitClient handles AMQP with Qt signal integration. OtaManager uses State pattern. DeviceModel integrates with QML.',
  proofPoints: [
    {
      label: 'Async Patterns',
      title: 'QPromise/QFuture With QtConcurrent',
      detail: 'Async publish/subscribe uses QPromise/QFuture with QtConcurrent::run for non-blocking RabbitMQ operations.'
    },
    {
      label: 'State Machine',
      title: 'OTA Update With Progress',
      detail: 'OtaManager transitions Idle → Running → Completed/Failed with progress callbacks and cancellation support.'
    },
    {
      label: 'QML Ready',
      title: 'UI Integration Ready',
      detail: 'DeviceModel as QAbstractListModel allows QML to bind directly to device state updates from async operations.'
    }
  ],
  deepDetails: [
    'BackendFacade publishes to RabbitMQ asynchronously and returns a QFuture for result handling.',
    'RabbitClient runs AMQP callbacks on its own thread and emits Qt signals for thread-safe UI updates.',
    'OtaManager handles firmware upload with progress reporting and failure recovery.',
    'All async operations support cancellation through QPromise::isCanceled().',
    'CMakeLists.txt supports both desktop Qt and cross-compilation for Yocto targets.',
    'Docker build supports containerized deployment with qt6-base runtime.'
  ],
  features: [
    'Async RabbitMQ publish with ACK tracking',
    'Streaming async subscribe with QFutureWatcher',
    'OTA update pipeline with progress reporting',
    'State machine pattern for update lifecycle',
    'QAbstractListModel for QML device binding',
    'CMake build for desktop and cross-compile',
    'Docker containerization support'
  ],
  outcomes: [
    'Complete Qt/C++ async backend with QPromise/QFuture patterns implemented.',
    'Build system validated with CMake and Qt 6.4+.',
    'Dockerfile created for containerized runtime.',
    'Full PROJECT.md archive with all source code.'
  ],
  resumeBullets: [
    'Designed Qt-native async backend using QPromise/QFuture with QtConcurrent.',
    'Integrated RabbitMQ messaging into Qt signal/slot architecture.',
    'Implemented OTA state machine with progress and cancellation support.'
  ],
  screenshotCaption: 'QtRabbitAsync dashboard showing async device control, OTA progress, and RabbitMQ connection status.',
  suggestedContent: [
    'Capture desktop Qt runtime screenshot after building locally.',
    'Add CMake build log with QtConcurrent/QPromise compile.',
    'Capture Docker build and runtime evidence.'
  ]
};

// Replace the placeholder entry with real implementation
const updatedEmbeddedSystemsProjects = embeddedSystemsProjects.map(p => 
  p.id === 'bems-edge-ai-gateway' ? qtrabbitAsyncProject : p
);

export { embeddedSystemsSpecs };
export default updatedEmbeddedSystemsProjects;
