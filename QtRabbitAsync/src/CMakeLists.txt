
cmake_minimum_required(VERSION 3.21)

set(SOURCES
    backend/BackendFacade.cpp
    backend/DeviceModel.cpp
    backend/RabbitClient.cpp
    backend/OtaManager.cpp
    main.cpp
)





set(HEADERS
    backend/BackendFacade.h
    backend/DeviceModel.h
    backend/RabbitClient.h
    backend/OtaManager.h
)

qt_add_executable(QtRabbitAsync
    ${SOURCES}
    ${HEADERS}
)

target_link_libraries(QtRabbitAsync PRIVATE
    Qt6::Core
    Qt6::Concurrent
    Qt6::Qml
    Qt6::Quick
)

target_include_directories(QtRabbitAsync PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/backend
)

set_target_properties(QtRabbitAsync PROPERTIES
    AUTOMOC ON
    AUTORCC ON
    AUTOUIC ON
)



# QML resources
# Note: qt_add_resources(QtRabbitAsync ...) should attach the generated rcc object
# to the target. Keep it simple and make the prefix match the engine URL.
qt_add_resources(QtRabbitAsync
    qml_resources.qrc
    PREFIX "/"
)

# Link resources explicitly (some Qt/CMake setups do not auto-link rcc output).
# This is safe because qt_add_resources creates rcc outputs associated with the target.













