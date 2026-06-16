#pragma once
#include <QObject>
#include <string>
#include <functional>
#include <chrono>
#include <atomic>

class RabbitClient : public QObject {
    Q_OBJECT
public:
    explicit RabbitClient(QObject* parent = nullptr);

    bool isConnected() const;
    bool tryConnect();
    void reconnectWithRetry(int attempts, std::chrono::seconds delay);

    std::string publish(const std::string& payload);
    void waitForAck(const std::string& id);

    void subscribe(const std::string& topic,
                   std::function<void(const std::string&)> onMessage);

    Q_INVOKABLE void stopSubscription();

signals:
    void connectionStateChanged(bool connected);

private:
    void setConnected(bool value);

    std::atomic<bool> connected{false};
    std::atomic<bool> running{false};
};

