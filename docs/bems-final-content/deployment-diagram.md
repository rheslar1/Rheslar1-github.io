# Docker Compose Deployment Diagram

Source: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docker/docker-compose.yml`

```mermaid
flowchart LR
  Browser[Operator Browser] --> UI[React/Vite UI]
  UI --> API[Node.js API]
  API --> DB[(MySQL bems)]
  API --> AI[Python BEMS-ai Service]
  API --> Edge[C++ Edge Core]
  Edge --> BACnet[BACnet/IP Devices]
  API --> Kafka[Kafka/Event Bus]
  API --> RabbitMQ[RabbitMQ Commands]
  API --> Prometheus[Prometheus]
  Prometheus --> Grafana[Grafana]
  Prometheus --> Alertmanager[Alertmanager]
  Watchtower[Watchtower] --> UI
  Watchtower --> API
  Watchtower --> AI
  Watchtower --> Edge
```

## Service Roles

| Service | Role |
| --- | --- |
| UI | Operator dashboard. |
| API | REST/SSE gateway, auth/session, orchestration, persistence boundary. |
| DB | MySQL system of record. |
| AI service | Optimization and feedback engine. |
| Edge core | BACnet/control edge runtime. |
| Kafka/RabbitMQ | Event and command transport scaffolding. |
| Prometheus/Grafana/Alertmanager | Observability stack. |
| Watchtower | Container update automation. |

