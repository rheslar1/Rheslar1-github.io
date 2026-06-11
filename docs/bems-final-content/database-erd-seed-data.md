# Database ERD And Seed Data

Source: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/database/schema.sql`

## Mermaid ERD

```mermaid
erDiagram
  buildings ||--o{ zones : contains
  zones ||--o{ devices : contains
  buildings ||--o{ schedules : owns
  zones ||--o{ schedules : scopes
  devices ||--o{ schedules : targets
  devices ||--o{ alarms : raises
  devices ||--o{ analytics_events : emits
  buildings ||--o{ building_optimization_runs : optimizes
  roles ||--o{ users : grants

  buildings {
    int id
    string name
    string address
    string description
  }
  zones {
    int id
    int building_id
    string name
    string description
  }
  devices {
    int id
    int zone_id
    string name
    string type
    int bacnet_instance
    decimal present_value
    string units
    string status
  }
  schedules {
    int schedule_id
    int building_id
    int zone_id
    int device_id
    bool enabled
    time start_time
    time end_time
    string action
    decimal target_value
  }
  alarms {
    int id
    int device_id
    string message
    string severity
    string status
    bool acked
  }
```

## Seeded Data Explanation

- Buildings: seeded with the primary BMS/BEMS building record.
- Zones: seeded to group rooms and device contexts under the building.
- Devices: seeded with BACnet-oriented device metadata, object identifiers, present values, units, status, and JSON configuration.
- Roles/users: seeded with Admin, Operator, and Viewer permissions for operations and dashboard access.
- Schedules: seeded for building, zone, and device-level control windows.
- Alarms: schema supports active, acknowledged, and cleared alarm lifecycle states.
- Analytics and optimization: `analytics_events` and `building_optimization_runs` preserve operational and AI evidence.

## Review Notes

The schema is intentionally small enough for local Docker startup but expressive enough to support hierarchy, devices, telemetry, alarms, schedules, users, roles, and optimization history.

