#include "jsonencoder.h"
#include <QJsonDocument>

QString JsonEncoder::encode(const QJsonObject& payload) {
    QJsonDocument doc(payload);
    return QString::fromUtf8(doc.toJson(QJsonDocument::Compact));
}

QJsonObject JsonEncoder::decode(const QString& json) {
    QJsonDocument doc = QJsonDocument::fromJson(json.toUtf8());
    return doc.object();
}