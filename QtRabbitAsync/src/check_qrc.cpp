#include <QCoreApplication>
#include <QDebug>
#include <QResource>

int main(int argc, char** argv) {
    QCoreApplication app(argc, argv);

    const auto paths = {
        QStringLiteral("/qml/Main.qml"),
        QStringLiteral("/Main.qml"),
        QStringLiteral("/qml/Main.qml"),
        QStringLiteral("qml/Main.qml")
    };

    for (const auto& p : paths) {
        QResource r(p);
        qDebug() << "QResource path=" << p << " isValid=" << r.isValid() << " fileName=" << r.fileName();
    }

    return 0;
}

