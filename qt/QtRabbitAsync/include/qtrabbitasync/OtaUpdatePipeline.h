#pragma once

#include <QObject>
#include <QPromise>
#include <QFuture>
#include <QString>

namespace QtRabbitAsync {

struct OtaProgress
{
    QString stage;   // e.g. "downloading", "verifying", "applying", "rebooting"
    double percent = 0.0;
};

class OtaUpdatePipeline : public QObject
{
    Q_OBJECT
public:
    explicit OtaUpdatePipeline(QObject* parent = nullptr);

    Q_INVOKABLE QFuture<void> runUpdate(const QString& url);
    Q_INVOKABLE void cancel();

    Q_PROPERTY(bool running READ running NOTIFY runningChanged)
    bool running() const { return m_running; }

signals:
    void runningChanged();
    void progress(const QtRabbitAsync::OtaProgress& p);
    void finished();
    void cancelled();
    void error(QString reason);

private:
    void emitProgress(QPromise<void>& promise, const QString& stage, double percent);

    std::atomic_bool m_cancelled{false};
    bool m_running = false;
};

} // namespace QtRabbitAsync

