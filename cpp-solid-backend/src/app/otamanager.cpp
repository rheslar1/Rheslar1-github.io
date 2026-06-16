#include "otamanager.h"
#include <QtConcurrent>
#include <QThread>

OtaManager::OtaManager(QObject* parent)
    : QObject(parent), state_(std::make_unique<OtaStateIdle>()) {
}

bool OtaManager::start(const QString& deviceId, const QString& firmwarePath,
                       std::function<void(int)> onProgress) {
    
    if (state_->name() != "Idle" && state_->name() != "Completed") {
        return false;
    }
    
    canceled_ = false;
    progressCallback_ = onProgress;
    
    QtConcurrent::run([this, deviceId, firmwarePath]() {
        state_->start(*this, deviceId, firmwarePath);
    });
    
    return true;
}

void OtaManager::cancel() {
    canceled_ = true;
}

QString OtaManager::stateName() const {
    return state_->name();
}

void OtaManager::setState(std::unique_ptr<OtaState> newState) {
    state_ = std::move(newState);
    emit stateChanged(state_->name());
}