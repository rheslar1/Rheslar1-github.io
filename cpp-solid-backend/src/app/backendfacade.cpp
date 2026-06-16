#include "backendfacade.h"
#include "icloudclient.h"
#include "devicemodel.h"
#include "consolelogger.h"
#include "rabbitclient.h"
#include <QtConcurrent>

BackendFacade::BackendFacade(QObject* parent)
    : QObject(parent) {
    
    auto logger = std::make_shared<ConsoleLogger>();
    cloud_ = std::make_shared<RabbitClient>(logger, nullptr);
    deviceModel_ = new DeviceModel(this);
}

DeviceModel* BackendFacade::deviceModel() const {
    return deviceModel_;
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
        bool success = true; // Simulated
        promise.addResult(success);
        promise.finish();
    });
    
    return future;
}

void BackendFacade::cancelOtaUpdate(const QString& deviceId) {
    Q_UNUSED(deviceId)
}

QString BackendFacade::otaStateName(const QString& deviceId) const {
    Q_UNUSED(deviceId)
    return "Idle";
}