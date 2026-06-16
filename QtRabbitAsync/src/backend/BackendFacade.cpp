#include "BackendFacade.h"
#include <QMetaObject>

BackendFacade::BackendFacade(QObject* parent)
    : QObject(parent)
    , rabbit(std::make_unique<RabbitClient>())
    , ota(std::make_unique<OtaManager>())
{
    connect(rabbit.get(), &RabbitClient::connectionStateChanged, this, &BackendFacade::connectionStateChanged);
}

BackendFacade::~BackendFacade()
{
    if (subscribeWatcher)
        subscribeWatcher->deleteLater();
}

//
// ASYNC PUBLISH
//
QFuture<QString> BackendFacade::publishMessageAsync(const QString& payload)
{
    QPromise<QString> promise;
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise), this, payload]() mutable {
        if (!rabbit->isConnected())
            rabbit->reconnectWithRetry(5, std::chrono::seconds(2));

        const std::string id = rabbit->publish(payload.toStdString());

        // Publish in a single “step” for now (ACK wait happens inside RabbitClient).
        p.setProgressRange(0, 1);
        p.setProgressValue(0);

        rabbit->waitForAck(id);

        p.setProgressValue(1);
        p.addResult(QString::fromStdString(id));
        p.finish();
    });

    return future;
}

void BackendFacade::sendMessage(const QString& payload)
{
    auto future = publishMessageAsync(payload);

    if (!publishWatcher)
        publishWatcher = new QFutureWatcher<QString>(this);

    disconnect(publishWatcher, nullptr, this, nullptr);
    connect(publishWatcher, &QFutureWatcher<QString>::progressValueChanged,
            this, &BackendFacade::publishProgress);

    connect(publishWatcher, &QFutureWatcher<QString>::finished,
            this, [this]() {
                emit publishFinished(publishWatcher->result());
            });

    publishWatcher->setFuture(future);
}

//
// ASYNC SUBSCRIBE (fire-and-forget semantics)
//
QFuture<void> BackendFacade::subscribeAsync(const QString& topic)
{
    QPromise<void> promise;
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise), this, topic]() mutable {
        if (!rabbit->isConnected())
            rabbit->reconnectWithRetry(5, std::chrono::seconds(2));

        rabbit->subscribe(topic.toStdString(), [this](const std::string& msg) {
            QMetaObject::invokeMethod(this,
                                      [this, msg]() { emit cloudMessageReceived(QString::fromStdString(msg)); },
                                      Qt::QueuedConnection);
        });

        // Finite QFuture<void> is not meaningful for a live subscription.
        // Resolve immediately and keep the subscription running inside RabbitClient.
        p.finish();
    });

    return future;
}

void BackendFacade::subscribeToUpdates(const QString& topic)
{
    auto future = subscribeAsync(topic);

    if (!subscribeWatcher)
        subscribeWatcher = new QFutureWatcher<void>(this);

    subscribeWatcher->setFuture(future);
}

//
// OTA UPDATE
//
QFuture<void> BackendFacade::otaUpdateAsync(const QString& deviceId,
                                            const QString& firmwarePath)
{
    QPromise<void> promise;
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise), this, deviceId, firmwarePath]() mutable {
        if (!rabbit->isConnected())
            rabbit->reconnectWithRetry(5, std::chrono::seconds(2));

        p.setProgressRange(0, 100);

        const bool ok = ota->start(deviceId.toStdString(),
                                    firmwarePath.toStdString(),
                                    [&](int percent) {
            p.setProgressValue(percent);
            QMetaObject::invokeMethod(this,
                                      [this, deviceId, percent]() { emit otaProgress(deviceId, percent); },
                                      Qt::QueuedConnection);
        });

        if (!ok) {
            QMetaObject::invokeMethod(this,
                                      [this, deviceId]() { emit otaFinished(deviceId, false, "OTA start failed"); },
                                      Qt::QueuedConnection);
            p.finish();
            return;
        }

        ota->waitForCompletion(deviceId.toStdString());

        QMetaObject::invokeMethod(this,
                                  [this, deviceId]() { emit otaFinished(deviceId, true, ""); },
                                  Qt::QueuedConnection);
        p.finish();
    });

    return future;
}

void BackendFacade::startOtaUpdate(const QString& deviceId, const QString& firmwarePath)
{
    auto future = otaUpdateAsync(deviceId, firmwarePath);
    auto* watcher = new QFutureWatcher<void>(this);
    watcher->setFuture(future);
}

