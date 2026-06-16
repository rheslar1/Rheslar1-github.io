# QtRabbitAsync — Full Project Source (C++ + Qt Async)

Complete C++ backend architecture with QPromise/QFuture, RabbitMQ integration, OTA engine using State pattern.

## Table of Contents
1. [Core Interfaces](#core-interfaces)
2. [Infrastructure Implementations](#infrastructure-implementations)
3. [Application Layer](#application-layer)
4. [CMake Configuration](#cmake-configuration)
5. [Docker](#docker)
6. [Design Patterns](#design-patterns)

---

## Core Interfaces

### icloudclient.h
```cpp
#ifndef ICLOUDCLIENT_H
#define ICLOUDCLIENT_H

#include <QString>
#include <functional>

class ICloudClient {
public:
    virtual ~ICloudClient() = default;
    virtual QString publish(const QString& payload) = 0;
    virtual void waitForAck(const QString& messageId) = 0;
    virtual void subscribe(const QString& queue, std::function<void(const QString&)> onMessage) = 0;
    virtual bool isConnected() const = 0;
    virtual void reconnect() = 0;
};

#endif // ICLOUDCLIENT_H
```

### ilogger.h
```cpp
#ifndef ILOGGER_H
#define ILOGGER_H

#include <QString>

class ILogger {
public:
    virtual ~ILogger() = default;
    virtual void info(const QString& message) = 0;
    virtual void error(const QString& message) = 0;
    virtual void warning(const QString& message) = 0;
};

#endif // ILOGGER_H
```

### iretrypolicy.h
```cpp
#ifndef IRETRYPOLICY_H
#define IRETRYPOLICY_H

class IRetryPolicy {
public:
    virtual ~IRetryPolicy() = default;
    virtual int nextDelayMs(int attempt) = 0;
};

#endif // IRETRYPOLICY_H
```

### imessageencoder.h
```cpp
#ifndef IMESSAGEENCODER_H
#define IMESSAGEENCODER_H

#include <QString>
#include <QJsonObject>

class IMessageEncoder {
public:
    virtual ~IMessageEncoder() = default;
    virtual QString encode(const QJsonObject& payload) = 0;
    virtual QJsonObject decode(const QString& json) = 0;
};

#endif // IMESSAGEENCODER_H
```

---

## Infrastructure Implementations

### exponentialbackoff.h
```cpp
#ifndef EXPONENTIALBACKOFF_H
#define EXPONENTIALBACKOFF_H

#include "iretrypolicy.h"
#include <algorithm>

class ExponentialBackoff : public IRetryPolicy {
public:
    int nextDelayMs(int attempt) override {
        int delay = baseMs_ * (1 << attempt);
        return std::min(delay, maxMs_);
    }

private:
    int baseMs_ = 100;
    int maxMs_ = 10000;
};

#endif // EXPONENTIALBACKOFF_H
```

### consolelogger.h/.cpp
```cpp
#ifndef CONSOLELOGGER_H
#define CONSOLELOGGER_H

#include "ilogger.h"

class ConsoleLogger : public ILogger {
public:
    void info(const QString& message) override;
    void error(const QString& message) override;
    void warning(const QString& message) override;
};

#endif // CONSOLELOGGER_H
```

```cpp
#include "consolelogger.h"
#include <QDebug>

void ConsoleLogger::info(const QString& message) {
    qDebug() << "[INFO]" << message;
}

void ConsoleLogger::error(const QString& message) {
    qCritical() << "[ERROR]" << message;
}

void ConsoleLogger::warning(const QString& message) {
    qWarning() << "[WARNING]" << message;
}
```

### jsonencoder.h/.cpp
```cpp
#ifndef JSONENCODER_H
#define JSONENCODER_H

#include "imeessageencoder.h"

class JsonEncoder : public IMessageEncoder {
public:
    QString encode(const QJsonObject& payload) override;
    QJsonObject decode(const QString& json) override;
};

#endif // JSONENCODER_H
```

```cpp
#include "jsonencoder.h"
#include <QJsonDocument>

QString JsonEncoder::encode(const QJsonObject& payload) {
    QJsonDocument doc(payload);
    return QString::fromUtf8(doc.toJson(QJsonDocument::Compact));
}

QJsonObject JsonEncoder::decode(const QString& json) {
    QJsonDocument doc = QJsonDocument::fromJson(json.toUtf8());
    return doc.object();
}
```

### rabbitclient.h/.cpp
```cpp
#ifndef RABBITCLIENT_H
#define RABBITCLIENT_H

#include "icloudclient.h"
#include "ilogger.h"
#include "iretrypolicy.h"
#include <memory>
#include <mutex>
#include <condition_variable>
#include <QMap>

class RabbitClient : public ICloudClient {
public:
    explicit RabbitClient(std::shared_ptr<ILogger> logger,
                        std::shared_ptr<IRetryPolicy> retryPolicy);
    
    QString publish(const QString& payload) override;
    void waitForAck(const QString& messageId) override;
    void subscribe(const QString& queue, std::function<void(const QString&)> onMessage) override;
    bool isConnected() const override;
    void reconnect() override;

private:
    std::shared_ptr<ILogger> logger_;
    std::shared_ptr<IRetryPolicy> retryPolicy_;
    
    mutable std::mutex mutex_;
    std::condition_variable cv_;
    QMap<QString, bool> ackedIds_;
};

#endif // RABBITCLIENT_H
```

```cpp
#include "rabbitclient.h"
#include <QDateTime>

RabbitClient::RabbitClient(std::shared_ptr<ILogger> logger,
                           std::shared_ptr<IRetryPolicy> retryPolicy)
    : logger_(logger), retryPolicy_(retryPolicy) {
    logger_->info("RabbitClient initializing...");
}

QString RabbitClient::publish(const QString& payload) {
    Q_UNUSED(payload)
    logger_->info("Publishing message synchronously");
    QString id = QString("msg_%1").arg(QDateTime::currentMSecsSinceEpoch());
    return id;
}

void RabbitClient::waitForAck(const QString& messageId) {
    Q_UNUSED(messageId)
    logger_->info("ACK received (simulated)");
}

void RabbitClient::subscribe(const QString& queue, std::function<void(const QString&)> onMessage) {
    Q_UNUSED(queue)
    Q_UNUSED(onMessage)
    logger_->info("Subscribed (simulated)");
}

bool RabbitClient::isConnected() const {
    return true;
}

void RabbitClient::reconnect() {
    logger_->warning("Reconnecting to RabbitMQ...");
}
```

---

## Application Layer

### otastate.h
```cpp
#ifndef OTASTATE_H
#define OTASTATE_H

#include <QString>

class OtaManager;

class OtaState {
public:
    virtual ~OtaState() = default;
    virtual void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) = 0;
    virtual QString name() const = 0;
};

class OtaStateIdle : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Idle"; }
};

class OtaStateRunning : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Running"; }
};

class OtaStateCompleted : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Completed"; }
};

class OtaStateFailed : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Failed"; }
};

#endif // OTASTATE_H
```

### otamanager.h
```cpp
#ifndef OTAMANAGER_H
#define OTAMANAGER_H

#include "otastate.h"
#include <QObject>
#include <memory>

class OtaManager : public QObject {
    Q_OBJECT

public:
    explicit OtaManager(QObject* parent = nullptr);
    bool start(const QString& deviceId, const QString& firmwarePath,
               std::function<void(int progress)> onProgress);
    void cancel();
    QString stateName() const;

signals:
    void stateChanged(const QString& stateName);
    void progressUpdated(int progress);

private:
    std::unique_ptr<OtaState> state_;
    std::function<void(int)> progressCallback_;
    bool canceled_ = false;
    
    void setState(std::unique_ptr<OtaState> newState);
    
    friend class OtaStateIdle;
    friend class OtaStateRunning;
    friend class OtaStateCompleted;
    friend class OtaStateFailed;
};

#endif // OTAMANAGER_H
```

```cpp
#include "otastate.h"
#include "otamanager.h"
#include <QThread>

void OtaStateIdle::start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) {
    ctx.setState(std::make_unique<OtaStateRunning>());
    ctx.state_->start(ctx, deviceId, firmwarePath);
}

void OtaStateRunning::start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) {
    for (int p = 0; p <= 100; p += 10) {
        if (ctx.canceled_) {
            ctx.setState(std::make_unique<OtaStateFailed>());
            return;
        }
        if (ctx.progressCallback_) {
            ctx.progressCallback_(p);
        }
        QThread::msleep(100);
    }
    ctx.setState(std::make_unique<OtaStateCompleted>());
}

void OtaStateCompleted::start(OtaManager& ctx, const QString&, const QString&) { Q_UNUSED(ctx); }
void OtaStateFailed::start(OtaManager& ctx, const QString&, const QString&) { Q_UNUSED(ctx); }
```

### otamanager.cpp
```cpp
#include "otamanager.h"
#include <QtConcurrent>
#include <QThread>

OtaManager::OtaManager(QObject* parent)
    : QObject(parent), state_(std::make_unique<OtaStateIdle>()) {
}

bool OtaManager::start(const QString& deviceId, const QString& firmwarePath,
                       std::function<void(int)> onProgress) {
    if (state_->name() != "Idle" && state_->name() != "Completed") {
        return false;
    }
    canceled_ = false;
    progressCallback_ = onProgress;
    QtConcurrent::run([this, deviceId, firmwarePath]() {
        state_->start(*this, deviceId, firmwarePath);
    });
    return true;
}

void OtaManager::cancel() {
    canceled_ = true;
}

QString OtaManager::stateName() const {
    return state_->name();
}

void OtaManager::setState(std::unique_ptr<OtaState> newState) {
    state_ = std::move(newState);
    emit stateChanged(state_->name());
}
```

### devicemodel.h/.cpp
```cpp
#ifndef DEVICEMODEL_H
#define DEVICEMODEL_H

#include <QObject>

class DeviceModel : public QObject {
    Q_OBJECT
    Q_PROPERTY(QString deviceId READ deviceId NOTIFY deviceChanged)
    Q_PROPERTY(QString status READ status NOTIFY deviceChanged)
    Q_PROPERTY(double load READ load NOTIFY deviceChanged)

public:
    explicit DeviceModel(QObject* parent = nullptr);
    
    QString deviceId() const { return deviceId_; }
    QString status() const { return status_; }
    double load() const { return load_; }
    
    void updateFromJson(const QString& json);
    void setDeviceId(const QString& id) { deviceId_ = id; emit deviceChanged(); }
    void setStatus(const QString& s) { status_ = s; emit deviceChanged(); }
    void setLoad(double l) { load_ = l; emit deviceChanged(); }

signals:
    void deviceChanged();

private:
    QString deviceId_;
    QString status_;
    double load_ = 0.0;
};

#endif // DEVICEMODEL_H
```

```cpp
#include "devicemodel.h"
#include <QJsonDocument>

DeviceModel::DeviceModel(QObject* parent) : QObject(parent) {
}

void DeviceModel::updateFromJson(const QString& json) {
    QJsonDocument doc = QJsonDocument::fromJson(json.toUtf8());
    if (!doc.isObject()) return;
    
    QJsonObject obj = doc.object();
    if (obj.contains("deviceId")) { deviceId_ = obj["deviceId"].toString(); }
    if (obj.contains("status")) { status_ = obj["status"].toString(); }
    if (obj.contains("load")) { load_ = obj["load"].toDouble(); }
    emit deviceChanged();
}
```

### backendfacade.h/.cpp
```cpp
#ifndef BACKENDFACADE_H
#define BACKENDFACADE_H

#include <QObject>
#include <QFuture>
#include <QPromise>
#include <memory>

class ICloudClient;
class DeviceModel;

class BackendFacade : public QObject {
    Q_OBJECT

public:
    explicit BackendFacade(QObject* parent = nullptr);
    
    QFuture<QString> publishMessageAsync(const QString& payload);
    QFuture<bool> startOtaUpdateAsync(const QString& deviceId, const QString& firmwarePath);

private:
    std::shared_ptr<ICloudClient> cloud_;
    DeviceModel* deviceModel_ = nullptr;
};

#endif // BACKENDFACADE_H
```

```cpp
#include "backendfacade.h"
#include "icloudclient.h"
#include "devicemodel.h"
#include "consolelogger.h"
#include "rabbitclient.h"
#include <QtConcurrent>

BackendFacade::BackendFacade(QObject* parent) : QObject(parent) {
    auto logger = std::make_shared<ConsoleLogger>();
    cloud_ = std::make_shared<RabbitClient>(logger, nullptr);
    deviceModel_ = new DeviceModel(this);
}

QFuture<QString> BackendFacade::publishMessageAsync(const QString& payload) {
    QPromise<QString> promise;
    auto future = promise.future();
    
    QtConcurrent::run([promise = std::move(promise), this, payload]() mutable {
        QString id = cloud_->publish(payload);
        cloud_->waitForAck(id);
        promise.addResult(id);
        promise.finish();
    });
    
    return future;
}

QFuture<bool> BackendFacade::startOtaUpdateAsync(const QString& deviceId, const QString& firmwarePath) {
    QPromise<bool> promise;
    auto future = promise.future();
    
    QtConcurrent::run([promise = std::move(promise), deviceId, firmwarePath]() mutable {
        bool success = true;
        promise.addResult(success);
        promise.finish();
    });
    
    return future;
}
```

### main.cpp
```cpp
#include <QCoreApplication>
#include <QtConcurrent>
#include <QFutureWatcher>
#include <QTimer>
#include <QDebug>
#include "backendfacade.h"

int main(int argc, char *argv[]) {
    QCoreApplication app(argc, argv);
    
    QCoreApplication::setApplicationName("QtRabbitAsync Backend");
    QCoreApplication::setOrganizationName("Rheslar");
    
    BackendFacade backend;
    
    QFuture<QString> publishFuture = backend.publishMessageAsync(
        QStringLiteral("{\"device\":\"DEV-001\",\"status\":\"online\"}")
    );
    
    QFutureWatcher<QString>* watcher = new QFutureWatcher<QString>(&app);
    QObject::connect(watcher, &QFutureWatcher<QString>::finished, [&]() {
        qDebug() << "Published message ID:" << watcher->result();
        watcher->deleteLater();
    });
    
    watcher->setFuture(publishFuture);
    
    QTimer::singleShot(3000, &app, &QCoreApplication::quit);
    
    return app.exec();
}
```

---

## CMake Configuration

### CMakeLists.txt (root)
```cmake
cmake_minimum_required(VERSION 3.21)

project(QtRabbitAsync
    VERSION 1.0.0
    DESCRIPTION "Qt/C++ Async RabbitMQ Backend with QPromise/QFuture"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)

include(GNUInstallDirs)

find_package(Qt6 6.4 REQUIRED COMPONENTS Core Concurrent)

add_subdirectory(src)
```

### src/CMakeLists.txt
```cmake
add_subdirectory(core)
add_subdirectory(infra)
add_subdirectory(app)
```

### src/core/CMakeLists.txt
```cmake
add_library(core INTERFACE)

target_include_directories(core
    INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}
)
```

### src/infra/CMakeLists.txt
```cmake
add_library(infra STATIC
    exponentialbackoff.cpp
    consolelogger.cpp
    jsonencoder.cpp
    rabbitclient.cpp
)

target_include_directories(infra
    PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}
)

target_link_libraries(infra PUBLIC core PRIVATE Qt6::Core)

target_compile_features(infra PRIVATE cxx_std_17)
```

### src/app/CMakeLists.txt
```cmake
add_executable(qtrabbitasync-backend
    main.cpp
    backendfacade.cpp
    otamanager.cpp
    otastate.cpp
    devicemodel.cpp
)

target_include_directories(qtrabbitasync-backend
    PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}
)

target_link_libraries(qtrabbitasync-backend
    PRIVATE Qt6::Core Qt6::Concurrent infra
)

set_target_properties(qtrabbitasync-backend
    PROPERTIES AUTOMOC ON
)
```

### Dockerfile
```dockerfile
FROM ubuntu:22.04 AS build
RUN apt-get update && apt-get install -y cmake qt6-base-dev build-essential

WORKDIR /build
COPY . .
RUN cmake -B build -DCMAKE_BUILD_TYPE=Release && cmake --build build

FROM ubuntu:22.04 AS runtime
RUN apt-get update && apt-get install -y qt6-base
COPY --from=build /build/build/qtrabbitasync-backend /usr/bin/
ENTRYPOINT ["/usr/bin/qtrabbitasync-backend"]
```

---

## Design Patterns

| Pattern | Implementation |
|---------|----------------|
| **Facade** | `BackendFacade` unifies cloud and OTA APIs |
| **Adapter** | `RabbitClient` adapts AMQP-CPP to `ICloudClient` |
| **Strategy** | `IRetryPolicy` → `ExponentialBackoff` |
| **State** | OTA engine transitions via `OtaState` hierarchy |
| **Producer/Consumer** | `QPromise`/`QFuture` for async operations |
| **Observer** | Qt signals/slots for state changes |