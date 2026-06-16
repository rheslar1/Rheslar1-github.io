#include <QCoreApplication>
#include <QDir>
#include <QFileInfo>
#include <QResource>
#include <QDebug>

static void dump(const char* label, const QString& path) {
    QResource r(path);
    qDebug().noquote() << label
                       << "path=" << path
                       << "isValid=" << r.isValid()
                       << "fileName=" << r.fileName();
}

int main(int argc, char** argv) {
    QCoreApplication app(argc, argv);

    qDebug() << "Current prefix check:";
    dump("/qml/Main.qml", QStringLiteral("/qml/Main.qml"));
    dump("/Main.qml", QStringLiteral("/Main.qml"));
    dump("qml/Main.qml", QStringLiteral("qml/Main.qml"));

    // Also enumerate all known qrc children if possible.
    QResource dummy;
    (void)dummy;

    return 0;
}

