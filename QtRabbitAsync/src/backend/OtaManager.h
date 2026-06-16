#pragma once
#include <string>
#include <functional>

class OtaManager {
public:
    bool start(const std::string& deviceId,
               const std::string& firmwarePath,
               std::function<void(int)> onProgress);

    void waitForCompletion(const std::string& deviceId);
};

