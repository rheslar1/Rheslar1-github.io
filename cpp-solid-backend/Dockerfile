FROM ubuntu:22.04 AS build

RUN apt-get update && apt-get install -y \
    cmake \
    qt6-base-dev \
    qt6-tools-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY . .

RUN cmake -B build -DCMAKE_BUILD_TYPE=Release \
    && cmake --build build --parallel

FROM ubuntu:22.04 AS runtime
RUN apt-get update && apt-get install -y \
    qt6-base \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /build/build/qtrabbitasync-backend /usr/bin/qtrabbitasync-backend

ENTRYPOINT ["/usr/bin/qtrabbitasync-backend"]