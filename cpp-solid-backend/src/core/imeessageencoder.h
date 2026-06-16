#ifndef IMESSAGEENCODER_H
#define IMESSAGEENCODER_H

#include <QString>
#include <QJsonObject>

class IMessageEncoder {
public:
    virtual ~IMessageEncoder() = default;
    virtual QString encode(const QJsonObject& payload) = 0;
    virtual QJsonObject decode(const QString& json) = 0;
};

#endif // IMESSAGEENCODER_H