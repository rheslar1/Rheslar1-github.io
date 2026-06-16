#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>

#include "BackendFacade.h"
#include "DeviceModel.h"

#include <QDebug>
#include <QResource>



int main(int argc, char* argv[])
{

    QGuiApplication app(argc, argv);

    qmlRegisterType<DeviceModel>("Backend", 1, 0, "DeviceModel");

    BackendFacade backend;

    QQmlApplicationEngine engine;
    engine.rootContext()->setContextProperty("Backend", &backend);

    // Load from the embedded resource.
    // Debug: verify QRC entries exist.
    const QStringList probePaths = {
        QStringLiteral("/qml/Main.qml"),
        QStringLiteral("/Main.qml"),
        QStringLiteral("/qml/Main.qml"),
        QStringLiteral("qml/Main.qml")
    };
    for (const auto& p : probePaths) {
        QResource r(p);
        qDebug() << "QResource path=" << p << "isValid=" << r.isValid() << "fileName=" << r.fileName();
    }

    engine.load(QUrl(QStringLiteral("qrc:/qml/Main.qml")));















    if (engine.rootObjects().isEmpty()) {
        qCritical() << "QQmlApplicationEngine failed to load Main.qml";
        return -1;
    }


    return app.exec();
}

