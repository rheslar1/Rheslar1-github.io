#ifndef OTASTATE_H
#define OTASTATE_H

#include <QString>
#include <functional>

class OtaManager;

class OtaState {
public:
    virtual ~OtaState() = default;
    virtual void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) = 0;
    virtual QString name() const = 0;
};

class OtaStateIdle : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Idle"; }
};

class OtaStateRunning : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Running"; }
};

class OtaStateCompleted : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Completed"; }
};

class OtaStateFailed : public OtaState {
public:
    void start(OtaManager& ctx, const QString& deviceId, const QString& firmwarePath) override;
    QString name() const override { return "Failed"; }
};

#endif // OTASTATE_H