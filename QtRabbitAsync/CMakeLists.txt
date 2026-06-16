cmake_minimum_required(VERSION 3.21)


project(QtRabbitAsync LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.4 REQUIRED COMPONENTS

    Core
    Concurrent
    Qml
    Quick
)

add_subdirectory(src)

# Used by qt_add_resources() when the QRC specifies a prefix, but the target
# needs a default as well.
set_property(TARGET QtRabbitAsync PROPERTY QT_RESOURCE_PREFIX "/")


