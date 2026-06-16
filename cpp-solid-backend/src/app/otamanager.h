#ifndef OTAMANAGER_H
#define OTAMANAGER_H

#include "otastate.h"
#include <QObject>
#include <memory>

class OtaManager : public QObject {
    Q_OBJECT

public:
    explicit OtaManager(QObject* parent = nullptr);
    
    bool start(const QString& deviceId, const QString& firmwarePath,
               std::function<void(int progress)> onProgress);
    void cancel();
    QString stateName() const;

signals:
    void stateChanged(const QString& stateName);
    void progressUpdated(int progress);

private:
    std::unique_ptr<OtaState> state_;
    std::function<void(int)> progressCallback_;
    bool canceled_ = false;
    
    void setState(std::unique_ptr<OtaState> newState);
    
    friend class OtaStateIdle;
    friend class OtaStateRunning;
    friend class OtaStateCompleted;
    friend class OtaStateFailed;
};

#endif // OTAMANAGER_H