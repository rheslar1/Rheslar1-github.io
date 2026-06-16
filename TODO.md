# TODO

## Completed Tasks

- [x] QtRabbitAsync C++ backend architecture
  - Core interfaces (ICloudClient, ILogger, IRetryPolicy, IMessageEncoder)
  - Infrastructure implementations (RabbitClient, ConsoleLogger, JsonEncoder, ExponentialBackoff)
  - OtaManager with State pattern (Idle/Running/Completed/Failed)
  - BackendFacade with QPromise/QFuture async
  - DeviceModel for QML integration
  - CMake build system and Dockerfile
  - full PROJECT.md documentation archive

- [x] Web dashboard (dashboard.html)
  - Device status table
  - OTA progress controls
  - Message publishing UI

- [x] Removed axe accessibility check artifacts