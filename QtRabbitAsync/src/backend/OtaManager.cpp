#include "OtaManager.h"

#include <thread>
#include <chrono>

bool OtaManager::start(const std::string& /*deviceId*/,
                        const std::string& /*firmwarePath*/,
                        std::function<void(int)> onProgress)
{
    std::thread([onProgress = std::move(onProgress)]() mutable {
        for (int i = 0; i <= 100; i += 10) {
            std::this_thread::sleep_for(std::chrono::milliseconds(300));
            onProgress(i);
        }
    }).detach();

    return true;
}

void OtaManager::waitForCompletion(const std::string& /*deviceId*/)
{
    std::this_thread::sleep_for(std::chrono::seconds(3));
}

