#pragma once

#include <QAbstractListModel>
#include <QString>

namespace QtRabbitAsync {

struct DeviceState
{
    QString deviceId;
    QString status;   // "online"/"offline"/"updating" etc
    QString lastSeenIso; // ISO-8601 string
};

class DeviceStateModel : public QAbstractListModel
{
    Q_OBJECT
public:
    enum Roles {
        DeviceIdRole = Qt::UserRole + 1,
        StatusRole,
        LastSeenIsoRole
    };

    explicit DeviceStateModel(QObject* parent = nullptr);

    int rowCount(const QModelIndex& parent = QModelIndex()) const override;
    QVariant data(const QModelIndex& index, int role) const override;
    QHash<int, QByteArray> roleNames() const override;

    Q_INVOKABLE void upsert(const DeviceState& state);
    Q_INVOKABLE void clear();

private:
    QList<DeviceState> m_items;
};

} // namespace QtRabbitAsync

