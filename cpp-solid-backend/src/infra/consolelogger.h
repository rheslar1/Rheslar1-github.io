#ifndef CONSOLELOGGER_H
#define CONSOLELOGGER_H

#include "ilogger.h"

class ConsoleLogger : public ILogger {
public:
    void info(const QString& message) override;
    void error(const QString& message) override;
    void warning(const QString& message) override;
};

#endif // CONSOLELOGGER_H