#ifndef JSONENCODER_H
#define JSONENCODER_H

#include "imeessageencoder.h"

class JsonEncoder : public IMessageEncoder {
public:
    QString encode(const QJsonObject& payload) override;
    QJsonObject decode(const QString& json) override;
};

#endif // JSONENCODER_H