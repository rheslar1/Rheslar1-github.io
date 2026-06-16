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