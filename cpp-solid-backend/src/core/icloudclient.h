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