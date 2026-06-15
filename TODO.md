# TODO - QtRabbitAsync backend integration

- [ ] Confirm required scope: implement production-grade Qt 6 C++ backend using QPromise/QFuture, QtConcurrent, RabbitMQ; include OTA pipeline w/ progress + cancellation, reconnection + retry, QML/PySide façade, and QAbstractListModel device state.
- [ ] Add new Qt 6 C++ project folder under `qt/QtRabbitAsync/` (buildable via CMake) since repo has no existing RabbitMQ/QPromise code.
- [ ] Define public API headers: `RabbitAsyncClient`, `OtaUpdatePipeline`, `DeviceStateModel`.
- [ ] Implement RabbitMQ async cloud publish/subscribe w/ ACK and streaming consume using a worker thread + QPromise/QFuture.
- [ ] Implement reconnection + retry with exponential backoff.
- [ ] Implement OTA update pipeline: download/apply steps emitting progress; support cancellation.
- [ ] Expose model to QML/PySide: register types and/or provide context property façade.
- [ ] Add a minimal Qt Quick QML integration example (optional) or update existing dashboard to demonstrate usage.
- [ ] Add tests (unit/integration stubs) for publish/consume and OTA cancellation behavior.
- [ ] Run `cmake` configure/build to ensure compilation.

