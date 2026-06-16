#include "DeviceModel.h"

#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>

int DeviceModel::rowCount(const QModelIndex&) const
{
    return entries.size();
}

QVariant DeviceModel::data(const QModelIndex& index, int role) const
{
    const auto& e = entries[index.row()];
    if (role == NameRole) return e.name;
    if (role == ValueRole) return e.value;
    return {};
}

QHash<int, QByteArray> DeviceModel::roleNames() const
{
    return { {NameRole, "name"}, {ValueRole, "value"} };
}

void DeviceModel::updateFromJson(const QString& json)
{
    auto doc = QJsonDocument::fromJson(json.toUtf8());
    if (!doc.isObject())
        return;

    auto obj = doc.object();

    beginResetModel();
    entries.clear();

    for (auto it = obj.begin(); it != obj.end(); ++it) {
        entries.push_back({it.key(), it.value().toVariant().toString()});
    }

    endResetModel();
}

