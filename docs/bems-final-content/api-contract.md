# Node/API Service Contract

Source: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/node-api/server.js`

## Endpoint Table

| Area | Method/Route | Purpose |
| --- | --- | --- |
| Health | `GET /api/health` | API health/readiness response. |
| Watchdog | `GET /api/watchdog` | Service watchdog state. |
| Hierarchy | `GET /api/hierarchy` | Building hierarchy for dashboard navigation. |
| Buildings | `GET /api/buildings` | Building list. |
| Zones | `GET /api/buildings/:buildingId/zones` | Zones scoped to a building. |
| Devices | `GET /api/zones/:zoneId/devices` | Devices scoped to a zone. |
| Devices | `GET /api/devices`, `GET /api/devices/:deviceId` | Device inventory and detail. |
| Device config | `PATCH /api/devices/:deviceId/configuration` | Update device configuration. |
| Device setpoint | `PATCH /api/devices/:deviceId/setpoint` | Update commanded setpoint. |
| Device range | `PATCH /api/devices/:deviceId/range` | Update operating range. |
| Commissioning | `PATCH /api/devices/:deviceId/provision`, `PATCH /api/devices/:deviceId/commission` | Provision/commission device workflow. |
| Digital twin | `GET /api/digital-twin` | Dashboard digital twin aggregate. |
| Telemetry stream | `GET /api/telemetry/stream` | Server-sent telemetry event stream. |
| Alarms | `GET /api/alarms`, `POST /api/alarms` | List and create alarm records. |
| Alarm actions | `PATCH /api/alarms/:alarmId/ack`, `PATCH /api/alarms/:alarmId/clear` | Acknowledge and clear alarms. |
| Alarm stream | `GET /api/alarms/stream` | Server-sent alarm event stream. |
| Schedules | `GET /api/schedules`, `POST /api/schedules` | List and create schedules. |
| Schedule update | `PATCH /api/schedules/:scheduleId` | Edit schedule details. |
| Schedule state | `PATCH /api/schedules/:scheduleId/enable`, `PATCH /api/schedules/:scheduleId/disable` | Toggle schedule state. |
| Schedule delete | `DELETE /api/schedules/:scheduleId` | Remove schedule. |
| AI optimization | `GET /api/ai/optimization`, `GET /api/ai/building-optimization` | Optimization recommendations. |
| AI feedback | `POST /api/ai/reinforcement/feedback` | Reinforcement feedback. |
| Autonomous mode | `GET /api/autonomous-mode/profiles`, `GET/POST /api/autonomous-mode/evaluate` | Evaluate operating mode policies. |
| Edge health | `GET /api/edge/health` | Edge-core health boundary. |
| Edge points | `POST /api/edge/read-point`, `POST /api/edge/write-point` | Point read/write bridge. |
| BACnet | `GET /api/bacnet/discovery` | BACnet discovery evidence. |
| Provisioning | `POST /api/provisioning/discover`, `GET /api/provisioning/status` | Device discovery/provisioning workflow. |
| Remote management | `GET /api/remote/status`, `POST /api/remote/restart`, `POST /api/remote/update`, `POST /api/remote/watchdog/run` | Management-token protected service control. |

## Contract Boundaries

- Browser uses HTTP JSON plus SSE streams.
- Node API persists data through MySQL using `mysql2`.
- Node API calls BEMS-ai through gRPC when configured, with local fallback behavior.
- Node API calls edge-core through gRPC-compatible client boundaries for edge health, point read/write, and discovery.
- Remote management endpoints require a management token and should not be exposed without network controls.

