# Operator Manual

## Login

1. Open `#bms-login`.
2. Select Operator, Engineer, or Admin profile.
3. Enter username/password.
4. Submit to open the EnergyBuildAI dashboard.

## Building Review

1. Open `#dashboard/building`.
2. Confirm building mode, floors monitored, rooms scheduled, and zone load.
3. Review floor summary and zone energy status.
4. Check connected systems: fans, dampers, motors, pump motor, lighting relay bus.

## Room Review

1. Open `#dashboard/rooms`.
2. Review room mode, schedule, setpoint, and zone context.
3. Confirm critical rooms such as Server Room remain protected.

## Alarm Review

1. Open `#dashboard/alarms`.
2. Select the highest-priority alarm.
3. Review source, current reading, threshold, likely cause, impact, and action.
4. Acknowledge or clear in the BMS UI/API workflow when connected to backend data.

## Building Schedules Review

1. Open `#dashboard/schedules`.
2. Review building, zone, floor, room, schedule, mode, setpoint, source, next event, override, and control intent.
3. Confirm override priority: safety, manual, AI, reservation, base schedule.

## Reports And System Health

- Use API health and watchdog endpoints for service readiness.
- Use Docker Compose health and logs for deployment status.
- Use CI artifacts and screenshots as portfolio evidence.
