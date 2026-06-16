#ifndef BACKENDFACADE_H
#define BACKENDFACADE_H

#include <QObject>
#include <QFuture>
#include <QPromise>
#include <memory>

class ICloudClient;
class DeviceModel;

class BackendFacade : public QObject {
    Q_OBJECT

public:
    explicit BackendFacade(QObject* parent = nullptr);
    
    QFuture<QString> publishMessageAsync(const QString& payload);
    QFuture<bool> startOtaUpdateAsync(const QString& deviceId, const QString& firmwarePath);
    
    void cancelOtaUpdate(const QString& deviceId);
    QString otaStateName(const QString& deviceId) const;
    
    DeviceModel* deviceModel() const;

private:
    std::shared_ptr<ICloudClient> cloud_;
    DeviceModel* deviceModel_ = nullptr;
};

#endif // BACKENDFACADE_H