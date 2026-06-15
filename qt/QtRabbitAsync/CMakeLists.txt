cmake_minimum_required(VERSION 3.21)

project(QtRabbitAsync
    VERSION 0.1.0
    DESCRIPTION "Production-grade Qt 6 C++ async RabbitMQ backend with OTA pipeline"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

# Qt
find_package(Qt6 6.5 REQUIRED COMPONENTS Core Gui Qml Quick)

# RabbitMQ C client (librabbitmq)
find_path(RABBITMQ_INCLUDE_DIR NAMES rabbitmq.h)
find_library(RABBITMQ_LIBRARY NAMES rabbitmq)

if(NOT RABBITMQ_INCLUDE_DIR OR NOT RABBITMQ_LIBRARY)
    message(FATAL_ERROR "RabbitMQ C client not found (librabbitmq). Install lib rabbitmq-dev (package name varies by distro).")
endif()

add_library(qtrabbitasync
    src/rabbit/RabbitAsyncClient.cpp
    src/ota/OtaUpdatePipeline.cpp
    src/model/DeviceStateModel.cpp
)

target_include_directories(qtrabbitasync
    PUBLIC
        include
    PRIVATE
        ${RABBITMQ_INCLUDE_DIR}
)

target_link_libraries(qtrabbitasync
    PUBLIC
        Qt6::Core Qt6::Gui Qt6::Qml
    PRIVATE
        ${RABBITMQ_LIBRARY}
)

qt_standard_project_setup(REQUIRES 6.5)

# Example app to validate linking
qt_add_executable(qtrabbitasync-example
    src/example/main.cpp
)

target_link_libraries(qtrabbitasync-example PRIVATE qtrabbitasync)

# QML plugin-like module is done via type registration in example/main.cpp
install(TARGETS qtrabbitasync-example RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR})

