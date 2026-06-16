#include <QCoreApplication>
#include <QtConcurrent>
#include <QFutureWatcher>
#include <QTimer>
#include <QDebug>
#include "backendfacade.h"

int main(int argc, char *argv[]) {
    QCoreApplication app(argc, argv);
    
    QCoreApplication::setApplicationName("QtRabbitAsync Backend");
    QCoreApplication::setOrganizationName("Rheslar");
    
    BackendFacade backend;
    
    QFuture<QString> publishFuture = backend.publishMessageAsync(
        QStringLiteral("{\"device\":\"DEV-001\",\"status\":\"online\"}")
    );
    
    QFutureWatcher<QString>* watcher = new QFutureWatcher<QString>(&app);
    QObject::connect(watcher, &QFutureWatcher<QString>::finished, [&]() {
        qDebug() << "Published message ID:" << watcher->result();
        watcher->deleteLater();
    });
    
    watcher->setFuture(publishFuture);
    
    QTimer::singleShot(3000, &app, &QCoreApplication::quit);
    
    return app.exec();
}