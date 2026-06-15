#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>

#include <qtrabbitasync/RabbitAsyncClient.h>
#include <qtrabbitasync/OtaUpdatePipeline.h>
#include <qtrabbitasync/DeviceStateModel.h>

using namespace QtRabbitAsync;

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    // Minimal facade demonstration:
    // In a real integration, expose instances to QML via context properties.
    RabbitAsyncClient rabbit;
    rabbit.setEndpoint(QStringLiteral("amqp://guest:guest@localhost:5672/"));

    OtaUpdatePipeline ota;
    DeviceStateModel model;

    // Smoke async calls (will resolve via placeholders in current stub implementation)
    rabbit.connectAsync();
    rabbit.publishWithAck(RabbitPublishRequest{"ex", "rk", QByteArray("hello")});
    ota.runUpdate(QStringLiteral("https://example.com/firmware.bin"));

    QQmlApplicationEngine engine;
    engine.rootContext()->setContextProperty("rabbitAsync", &rabbit);
    engine.rootContext()->setContextProperty("otaPipeline", &ota);
    engine.rootContext()->setContextProperty("deviceStateModel", &model);

    // no QML file shipped with this stub
    engine.loadData("import QtQuick\nimport QtQuick.Controls\nApplicationWindow{visible:true; width:600; height:200; title:'QtRabbitAsync Example'; Text{anchors.centerIn: parent; text:'Stub backend (no QML shipped)'}}" );

    return app.exec();
}

