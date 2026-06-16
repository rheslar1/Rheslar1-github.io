#include "devicemodel.h"
#include <QJsonDocument>

DeviceModel::DeviceModel(QObject* parent) : QObject(parent) {
}

void DeviceModel::updateFromJson(const QString& json) {
    QJsonDocument doc = QJsonDocument::fromJson(json.toUtf8());
    if (!doc.isObject()) return;
    
    QJsonObject obj = doc.object();
    if (obj.contains("deviceId")) setDeviceId(obj["deviceId"].toString());
    if (obj.contains("status")) setStatus(obj["status"].toString());
    if (obj.contains("load")) setLoad(obj["load"].toDouble());
}