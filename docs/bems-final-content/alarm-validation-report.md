# Alarm Validation Report

## Alarm Lifecycle

| State | Source Behavior | Evidence |
| --- | --- | --- |
| Triggered | `POST /api/alarms` creates a new alarm. | UI alarm form, API response, row in `alarms`. |
| Active | `GET /api/alarms` lists alarm with active status. | Alarm table and SSE alarm stream. |
| Acknowledged | `PATCH /api/alarms/:alarmId/ack` marks operator acknowledgement. | UI ack button, API response, alarm row. |
| Resolved/Cleared | `PATCH /api/alarms/:alarmId/clear` clears alarm. | UI clear button, status update. |
| Historical | Cleared alarms remain queryable as operational history. | `alarms` table and dashboard history. |

## Validation Scenarios

1. Create a simulated alarm for a device.
2. Confirm the alarm appears in `GET /api/alarms`.
3. Confirm the alarm stream publishes an update.
4. Acknowledge the alarm.
5. Clear the alarm.
6. Confirm historical status and audit/event notes.

## Current Portfolio Evidence

The EnergyBuildAI dashboard includes alarm cards for active, acknowledged, and auto-clear states, plus operator guidance for likely cause, impact, action, owner, SLA, event history, and response steps.

