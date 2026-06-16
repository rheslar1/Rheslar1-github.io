cmake_minimum_required(VERSION 3.21)

project(QtRabbitAsync
    VERSION 1.0.0
    DESCRIPTION "Qt/C++ Async RabbitMQ Backend with QPromise/QFuture"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

include(GNUInstallDirs)

find_package(Qt6 6.4 REQUIRED COMPONENTS Core Concurrent)

add_subdirectory(src)