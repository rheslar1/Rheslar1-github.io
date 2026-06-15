#include <qtrabbitasync/DeviceStateModel.h>

using namespace QtRabbitAsync;

DeviceStateModel::DeviceStateModel(QObject* parent)
    : QAbstractListModel(parent)
{
}

int DeviceStateModel::rowCount(const QModelIndex& parent) const
{
    if (parent.isValid())
        return 0;
    return m_items.size();
}

QVariant DeviceStateModel::data(const QModelIndex& index, int role) const
{
    if (!index.isValid() || index.row() < 0 || index.row() >= m_items.size())
        return {};

    const auto& item = m_items.at(index.row());

    switch (role) {
    case DeviceIdRole:
        return item.deviceId;
    case StatusRole:
        return item.status;
    case LastSeenIsoRole:
        return item.lastSeenIso;
    default:
        return {};
    }
}

QHash<int, QByteArray> DeviceStateModel::roleNames() const
{
    return {
        {DeviceIdRole, "deviceId"},
        {StatusRole, "status"},
        {LastSeenIsoRole, "lastSeenIso"},
    };
}

void DeviceStateModel::upsert(const DeviceState& state)
{
    for (int i = 0; i < m_items.size(); ++i) {
        if (m_items[i].deviceId == state.deviceId) {
            m_items[i] = state;
            const auto idx = index(i);
            emit dataChanged(idx, idx, {DeviceIdRole, StatusRole, LastSeenIsoRole});
            return;
        }
    }

    beginInsertRows(QModelIndex(), m_items.size(), m_items.size());
    m_items.push_back(state);
    endInsertRows();
}

void DeviceStateModel::clear()
{
    beginResetModel();
    m_items.clear();
    endResetModel();
}

