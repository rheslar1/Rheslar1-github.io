#include "otastate.h"
#include "otamanager.h"
#include <QThread>

void OtaStateIdle::start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) {
    ctx.setState(std::make_unique<OtaStateRunning>());
}

void OtaStateRunning::start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) {
    for (int p = 0; p <= 100; p += 10) {
        if (ctx.canceled_) {
            ctx.setState(std::make_unique<OtaStateFailed>());
            return;
        }
        if (ctx.progressCallback_) {
            ctx.progressCallback_(p);
        }
        QThread::msleep(100);
    }
    ctx.setState(std::make_unique<OtaStateCompleted>());
}

void OtaStateCompleted::start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) {
    Q_UNUSED(ctx)
    Q_UNUSED(deviceId)
    Q_UNUSED(firmwarePath)
}

void OtaStateFailed::start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) {
    Q_UNUSED(ctx)
    Q_UNUSED(deviceId)
    Q_UNUSED(firmwarePath)
}