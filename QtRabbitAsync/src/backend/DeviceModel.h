#pragma once
#include <QAbstractListModel>
#include <QVector>

class DeviceModel : public QAbstractListModel {
    Q_OBJECT
public:
    enum Roles { NameRole = Qt::UserRole + 1, ValueRole };

    int rowCount(const QModelIndex&) const override;
    QVariant data(const QModelIndex& index, int role) const override;
    QHash<int, QByteArray> roleNames() const override;

    Q_INVOKABLE void updateFromJson(const QString& json);

private:
    struct Entry { QString name; QString value; };
    QVector<Entry> entries;
};

