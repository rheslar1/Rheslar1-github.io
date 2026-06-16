#include "RabbitClient.h"

#include <thread>

RabbitClient::RabbitClient(QObject* parent)
    : QObject(parent)
{
    tryConnect();
}

void RabbitClient::setConnected(bool value)
{
    connected.store(value, std::memory_order_relaxed);
    emit connectionStateChanged(value);
}

bool RabbitClient::isConnected() const
{
    return connected.load(std::memory_order_relaxed);
}

bool RabbitClient::tryConnect()
{
    setConnected(true);
    return true;
}

void RabbitClient::reconnectWithRetry(int attempts, std::chrono::seconds delay)
{
    for (int i = 0; i < attempts; ++i) {
        if (tryConnect())
            return;
        std::this_thread::sleep_for(delay);
    }
}

std::string RabbitClient::publish(const std::string& /*payload*/)
{
    return "msg-id-123";
}

void RabbitClient::waitForAck(const std::string& /*id*/)
{
    std::this_thread::sleep_for(std::chrono::milliseconds(200));
}

void RabbitClient::subscribe(const std::string& topic,
                             std::function<void(const std::string&)> onMessage)
{
    stopSubscription();
    running.store(true, std::memory_order_relaxed);

    std::thread([this, topic, onMessage = std::move(onMessage)]() mutable {
        while (running.load(std::memory_order_relaxed)) {
            std::this_thread::sleep_for(std::chrono::seconds(1));
            (void)topic;
            onMessage("{\"msg\":\"hello from cloud\"}");
        }
    }).detach();
}

void RabbitClient::stopSubscription()
{
    running.store(false, std::memory_order_relaxed);
}

