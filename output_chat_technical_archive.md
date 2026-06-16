# C++ Distributed Backend Architecture — Clean Technical Archive

SOLID • Design Patterns • RabbitMQ (AMQP‑CPP) • OTA Engine • QtConcurrent • CI/CD • Docker

---

## 1. Project Structure (SOLID + Patterns)

```
cpp-solid-backend/
├── CMakeLists.txt
└── src/
├── core/        # Interfaces (DIP, ISP)
├── infra/       # Implementations (Adapter, Strategy, State)
├── app/         # Facade, Device Model
├── main.cpp
```

---

## 2. Core Interfaces (DIP + ISP)

### ICloudClient
```cpp
class ICloudClient {
public:
    virtual QString publish(const QString&) = 0;
    virtual void waitForAck(const QString&) = 0;
    virtual void subscribe(const QString&, std::function<void(const QString&)>) = 0;
    virtual bool isConnected() const = 0;
    virtual void reconnect() = 0;
};
```

### IOtaManager
```cpp
class IOtaManager {
public:
    virtual bool start(const QString&, const QString&, std::function<void(int)>) = 0;
    virtual void waitForCompletion(const QString&) = 0;
};
```

### IRetryPolicy (Strategy)
```cpp
class IRetryPolicy {
public:
    virtual int nextDelayMs(int attempt) = 0;
};
```

### IMessageEncoder
```cpp
class IMessageEncoder {
public:
    virtual QString encode(const QString&) = 0;
};
```

### ILogger
```cpp
class ILogger {
public:
    virtual void info(const QString&) = 0;
    virtual void error(const QString&) = 0;
};
```

---

## 3. Infrastructure Layer (Adapter + Strategy + State)

### 3.1 ExponentialBackoff (Strategy)
```cpp
class ExponentialBackoff : public IRetryPolicy {
public:
    int nextDelayMs(int attempt) override {
        return std::min(base * (1 << attempt), max);
    }
};
```

### 3.2 ConsoleLogger
```cpp
class ConsoleLogger : public ILogger {
public:
    void info(const QString& msg) override { qInfo() << msg; }
    void error(const QString& msg) override { qCritical() << msg; }
};
```

### 3.3 JsonEncoder
```cpp
class JsonEncoder : public IMessageEncoder {
public:
    QString encode(const QString& payload) override;
};
```

---

## 4. AMQP‑CPP RabbitMQ Integration (Adapter)

### 4.1 Confirm‑select channel with ACK/NACK tracking
```cpp
m_channel->confirmSelect()
    .onAck([&](uint64_t tag, bool multiple) { ... })
    .onNack([&](uint64_t tag, bool multiple, bool requeue) { ... });
```

### 4.2 Publish with delivery‑tag → message‑ID mapping
```cpp
QString id = QString::number(++m_nextTag);
m_tagToId[m_nextTag] = id;
m_channel->publish("exchange", "routing.key", payload.toStdString());
```

### 4.3 waitForAck
```cpp
std::unique_lock<std::mutex> lock(m_mutex);
m_cv.wait_for(lock, 5s, [&]{ return m_ackedIds.contains(id); });
```

### 4.4 Consumer callback
```cpp
m_channel->consume(queue)
    .onReceived([onMessage](const AMQP::Message& msg, uint64_t, bool) {
        onMessage(QString::fromStdString({msg.body(), msg.bodySize()}));
    });
```

---

## 5. OTA Engine (State Pattern + Cancellation)

### 5.1 States
- Idle → Running → Completed
- Idle → Running → Failed
- Idle → Running → Failed (Canceled)
- Completed → Completed (ignored)

### 5.2 State Interface
```cpp
class OtaState {
public:
    virtual void start(OtaManager&, const QString&, const QString&) = 0;
    virtual QString name() const = 0;
};
```

### 5.3 Running State with cancellation
```cpp
for (int p = 0; p <= 100; p += 10) {
    if (ctx.promise()->isCanceled()) {
        ctx.setState(std::make_unique<OtaStateFailed>());
        return;
    }
    ctx.progressCallback()(p);
    QThread::msleep(100);
}
ctx.setState(std::make_unique<OtaStateCompleted>());
```

---

## 6. BackendFacade (Facade Pattern)

### Async publish (QtConcurrent + QPromise)
```cpp
QFuture<QString> BackendFacade::publishMessageAsync(const QString& payload) {
    QPromise<QString> p;
    auto f = p.future();

    QtConcurrent::run([p = std::move(p), this, payload]() mutable {
        QString id = m_cloud->publish(payload);
        m_cloud->waitForAck(id);
        p.addResult(id);
        p.finish();
    });

    return f;
}
```

### OTA cancellation
```cpp
m_otaFuture.cancel();
```

---

## 7. DeviceModel (SRP)

```cpp
void DeviceModel::updateFromJson(const QString& json) {
    auto obj = QJsonDocument::fromJson(json.toUtf8()).object();
    ...
}
```

---

## 8. UML Diagrams

### 8.1 Class Diagram (text)
- BackendFacade → ICloudClient → RabbitClient
- BackendFacade → IOtaManager → OtaManager → OtaState (Idle/Running/Completed/Failed)
- BackendFacade → DeviceModel
- RabbitClient → IRetryPolicy (ExponentialBackoff)
- RabbitClient → ILogger (ConsoleLogger)

### 8.2 OTA State Machine (text)
```
+---------+       start        +----------+       success       +-----------+
|  Idle   | -----------------> | Running  | ------------------> | Completed |
+---------+                    +----------+                    +-----------+
                                   |
                                   | cancel/error
                                   v
                              +----------+
                              |  Failed  |
                              +----------+
```

---

## 9. Docker Compose Environment

```yaml
version: "3.9"

services:
  rabbitmq:
    image: rabbitmq:3.13-management
    ports: ["5672:5672", "15672:15672"]

  backend:
    build: .
    depends_on: [rabbitmq]

  tests:
    build: .
    command: ["./integration_tests"]
    depends_on: [rabbitmq]
```

---

## 10. CI/CD Pipeline (GitHub Actions)

### 10.1 Build + Test + Coverage + Artifacts
```yaml
- name: Collect coverage
  run: |
    lcov --capture --directory build --output-file coverage.info
    lcov --remove coverage.info '/usr/*' '*/tests/*' --output-file coverage.info
```

### 10.2 Per‑component coverage thresholds
```bash
check_component "core/" 80
check_component "infra/" 75
check_component "app/" 70
```

### 10.3 Release pipeline (Docker publish)
```yaml
docker build -f Dockerfile.backend -t ghcr.io/${{ github.repository }}/backend:${{ github.ref_name }} .
docker push ghcr.io/${{ github.repository }}/backend:${{ github.ref_name }}
```

---

## 11. Integration Tests (RabbitMQ + OTA) (Examples)

### Publish + Confirm
```cpp
QString id = client.publish("hello");
client.waitForAck(id);
EXPECT_TRUE(true);
```

### Publish + Consume
```cpp
client.subscribe("queue", [&](auto msg){ received = msg; });
client.publish("hello");
EXPECT_EQ(received, "hello");
```

### OTA Cancellation
```cpp
backend.startOtaUpdate("dev1", "/tmp/fw.bin");
QThread::msleep(250);
backend.cancelOtaUpdate("dev1");
EXPECT_EQ(backend.otaStateName(), "Failed");
```

---

## 12. C++ Design Pattern Handbook (Embedded/Distributed)

### SOLID
- S: SRP — each class has one responsibility
- O: OCP — extend via interfaces
- L: LSP — derived classes honor base contracts
- I: ISP — small interfaces (ILogger, IRetryPolicy)
- D: DIP — high‑level depends on abstractions

### Patterns Used
- Facade — BackendFacade
- Adapter — RabbitClient over AMQP‑CPP
- Strategy — IRetryPolicy
- State — OTA engine
- Observer — Qt signals/slots
- Command — QtConcurrent tasks
- Builder/Factory — constructing backend components

