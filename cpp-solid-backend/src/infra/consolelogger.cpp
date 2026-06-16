#include "consolelogger.h"
#include <QDebug>

void ConsoleLogger::info(const QString& message) {
    qDebug() << "[INFO]" << message;
}

void ConsoleLogger::error(const QString& message) {
    qCritical() << "[ERROR]" << message;
}

void ConsoleLogger::warning(const QString& message) {
    qWarning() << "[WARNING]" << message;
}