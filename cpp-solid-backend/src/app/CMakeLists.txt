add_executable(qtrabbitasync-backend
    main.cpp
    backendfacade.cpp
    otamanager.cpp
    otastate.cpp
    devicemodel.cpp
)

target_include_directories(qtrabbitasync-backend
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}
)

target_link_libraries(qtrabbitasync-backend
    PRIVATE
        Qt6::Core
        Qt6::Concurrent
        infra
)

set_target_properties(qtrabbitasync-backend
    PROPERTIES
        AUTOMOC ON
)