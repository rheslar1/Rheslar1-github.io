#ifndef RABBITCLIENT_H
#define RABBITCLIENT_H

#include "icloudclient.h"
#include "ilogger.h"
#include "iretrypolicy.h"
#include <memory>
#include <mutex>
#include <condition_variable>
#include <QMap>
#include <QString>

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