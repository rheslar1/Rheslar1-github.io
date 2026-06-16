#ifndef EXPONENTIALBACKOFF_H
#define EXPONENTIALBACKOFF_H

#include "iretrypolicy.h"
#include <algorithm>

class ExponentialBackoff : public IRetryPolicy {
public:
    int nextDelayMs(int attempt) override {
        int delay = baseMs_ * (1 << attempt);
        return std::min(delay, maxMs_);
    }

private:
    int baseMs_ = 100;
    int maxMs_ = 10000;
};

#endif // EXPONENTIALBACKOFF_H