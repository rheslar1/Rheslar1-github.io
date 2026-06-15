#include <qtrabbitasync/RabbitAsyncClient.h>

#include <QThreadPool>
#include <QtConcurrent/QtConcurrent>

#include <atomic>

using namespace QtRabbitAsync;

RabbitAsyncClient::RabbitAsyncClient(QObject* parent)
    : QObject(parent)
{
}

void RabbitAsyncClient::setEndpoint(const QString& endpoint)
{
    if (m_endpoint == endpoint)
        return;
    m_endpoint = endpoint;
    emit endpointChanged();
}

QFuture<void> RabbitAsyncClient::connectAsync()
{
    // Production implementation should use proper reconnect + retry.
    // For now, provide a placeholder that resolves asynchronously.
    auto promise = QPromise<void>();
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise), this]() mutable {
        try {
            QThread::sleep(1);
            emit connected();
            p.addResult();
            p.finish();
        } catch (...) {
            emit connectionError(QStringLiteral("connectAsync failed"));
            p.setException(std::current_exception());
        }
    });

    return future;
}

QFuture<void> RabbitAsyncClient::disconnectAsync()
{
    auto promise = QPromise<void>();
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise), this]() mutable {
        try {
            stopConsume();
            QThread::sleep(1);
            emit disconnected();
            p.addResult();
            p.finish();
        } catch (...) {
            emit connectionError(QStringLiteral("disconnectAsync failed"));
            p.setException(std::current_exception());
        }
    });

    return future;
}

QFuture<void> RabbitAsyncClient::publishWithAck(const RabbitPublishRequest& /*request*/)
{
    // Placeholder: real implementation should use publisher confirms (ack/nack)
    // using amqp_rpc_reply_t and channel confirm mode.
    auto promise = QPromise<void>();
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise)]() mutable {
        QThread::sleep(1);
        p.addResult();
        p.finish();
    });

    return future;
}

QFuture<void> RabbitAsyncClient::startConsumeStream(const RabbitConsumeRequest& /*request*/, MessageCallback onMessage)
{
    m_stopConsume.store(false);

    auto promise = QPromise<void>();
    auto future = promise.future();

    QtConcurrent::run([p = std::move(promise), this, cb = std::move(onMessage)]() mutable {
        // Placeholder streaming loop
        int i = 0;
        while (!m_stopConsume.load()) {
            QThread::sleep(1);
            cb(QStringLiteral("routing.key"), QByteArray("{" "\"i\":" + QByteArray::number(i++) + "}"));
        }
        p.addResult();
        p.finish();
    });

    return future;
}

void RabbitAsyncClient::stopConsume()
{
    m_stopConsume.store(true);
}

