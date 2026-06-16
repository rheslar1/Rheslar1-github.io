#pragma once
#include <QObject>
#include <QFuture>
#include <QFutureWatcher>
#include <QtConcurrent>

#include <memory>

#include "RabbitClient.h"
#include "OtaManager.h"

class BackendFacade : public QObject {
    Q_OBJECT
public:
    explicit BackendFacade(QObject* parent = nullptr);
    ~BackendFacade() override;

    Q_INVOKABLE void sendMessage(const QString& payload);
    Q_INVOKABLE void subscribeToUpdates(const QString& topic);
    Q_INVOKABLE void startOtaUpdate(const QString& deviceId, const QString& firmwarePath);

signals:
    void publishProgress(int value);
    void publishFinished(const QString& messageId);

    void cloudMessageReceived(const QString& json);

    void otaProgress(const QString& deviceId, int percent);
    void otaFinished(const QString& deviceId, bool success, const QString& error);

    void connectionStateChanged(bool connected);

private:
    QFuture<QString> publishMessageAsync(const QString& payload);
    QFuture<void> subscribeAsync(const QString& topic);
    QFuture<void> otaUpdateAsync(const QString& deviceId, const QString& firmwarePath);

    std::unique_ptr<RabbitClient> rabbit;
    std::unique_ptr<OtaManager> ota;

    QFutureWatcher<QString>* publishWatcher = nullptr;
    QFutureWatcher<void>* subscribeWatcher = nullptr;
};

