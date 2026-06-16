#ifndef DEVICEMODEL_H
#define DEVICEMODEL_H

#include <QObject>
#include <QJsonObject>

class DeviceModel : public QObject {
    Q_OBJECT
    Q_PROPERTY(QString deviceId READ deviceId NOTIFY deviceChanged)
    Q_PROPERTY(QString status READ status NOTIFY deviceChanged)
    Q_PROPERTY(double load READ load NOTIFY deviceChanged)

public:
    explicit DeviceModel(QObject* parent = nullptr);
    
    QString deviceId() const { return deviceId_; }
    QString status() const { return status_; }
    double load() const { return load_; }
    
    void updateFromJson(const QString& json);
    void setDeviceId(const QString& id) { deviceId_ = id; emit deviceChanged(); }
    void setStatus(const QString& s) { status_ = s; emit deviceChanged(); }
    void setLoad(double l) { load_ = l; emit deviceChanged(); }

signals:
    void deviceChanged();

private:
    QString deviceId_;
    QString status_;
    double load_ = 0.0;
};

#endif // DEVICEMODEL_H