#include <qtrabbitasync/OtaUpdatePipeline.h>

#include <QtConcurrent/QtConcurrent>
#include <QThread>

using namespace QtRabbitAsync;

OtaUpdatePipeline::OtaUpdatePipeline(QObject* parent)
    : QObject(parent)
{
}

QFuture<void> OtaUpdatePipeline::runUpdate(const QString& url)
{
    Q_UNUSED(url);

    m_cancelled.store(false);
    m_running = true;
    emit runningChanged();

    auto promise = QPromise<void>();
    auto future = promise.future();

    QtConcurrent::run([this, p = std::move(promise)]() mutable {
        auto failIfCancelled = [&]() -> bool {
            if (m_cancelled.load()) {
                return true;
            }
            return false;
        };

        const QStringList stages = {"downloading", "verifying", "applying", "rebooting"};
        int stepCountPerStage = 10;

        for (const auto& stage : stages) {
            for (int step = 0; step <= stepCountPerStage; ++step) {
                if (failIfCancelled()) {
                    emit cancelled();
                    m_running = false;
                    emit runningChanged();
                    p.addResult();
                    p.finish();
                    return;
                }

                double percent = (stages.indexOf(stage) * 25.0) + (step * (25.0 / stepCountPerStage));
                emit progress(OtaProgress{stage, percent});
                QThread::msleep(80);
            }
        }

        emit finished();
        m_running = false;
        emit runningChanged();
        p.addResult();
        p.finish();
    });

    return future;
}

void OtaUpdatePipeline::cancel()
{
    m_cancelled.store(true);
}

