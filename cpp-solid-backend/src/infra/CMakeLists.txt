add_library(infra STATIC
    exponentialbackoff.cpp
    consolelogger.cpp
    jsonencoder.cpp
    rabbitclient.cpp
)

target_include_directories(infra
    PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}
)

target_link_libraries(infra
    PUBLIC
        core
    PRIVATE
        Qt6::Core
)

target_compile_features(infra
    PRIVATE
        cxx_std_17
)