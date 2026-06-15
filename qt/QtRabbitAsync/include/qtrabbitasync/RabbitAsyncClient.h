#pragma once

#include <QObject>
#include <QPromise>
#include <QFuture>
#include <QByteArray>
#include <QUrl>

namespace QtRabbitAsync {

struct RabbitPublishRequest
{
    QString exchange;
    QString routingKey;
    QByteArray payload;
    bool mandatory = false;
};

struct RabbitConsumeRequest
{
    QString queue;
    QString consumerTag;
    int prefetch = 10;
};

class RabbitAsyncClient : public QObject
{
    Q_OBJECT
public:
    explicit RabbitAsyncClient(QObject* parent = nullptr);

    Q_PROPERTY(QString endpoint READ endpoint WRITE setEndpoint NOTIFY endpointChanged)

    QString endpoint() const { return m_endpoint; }
    void setEndpoint(const QString& endpoint);

    Q_INVOKABLE QFuture<void> connectAsync();
    Q_INVOKABLE QFuture<void> disconnectAsync();

    // Publish and resolve when message is acked (or fail if nacked)
    Q_INVOKABLE QFuture<void> publishWithAck(const RabbitPublishRequest& request);

    // Streaming consume: each message triggers the callback on the worker thread.
    // Returns a future that resolves when the consume loop stops.
    using MessageCallback = std::function<void(const QString& routingKey, const QByteArray& payload)>;

    Q_INVOKABLE QFuture<void> startConsumeStream(const RabbitConsumeRequest& request,
                                                   MessageCallback onMessage);
    Q_INVOKABLE void stopConsume();

signals:
    void endpointChanged();
    void connected();
    void disconnected();
    void connectionError(QString reason);

private:
    QString m_endpoint;

    // internal state
    std::atomic_bool m_stopConsume{false};
};

} // namespace QtRabbitAsync

