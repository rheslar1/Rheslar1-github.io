#ifndef IRETRYPOLICY_H
#define IRETRYPOLICY_H

class IRetryPolicy {
public:
    virtual ~IRetryPolicy() = default;
    virtual int nextDelayMs(int attempt) = 0;
};

#endif // IRETRYPOLICY_H