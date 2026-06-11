# EnergyBuildAI Schedule API And Seed Evidence

This evidence documents the current seeded Schedule Details rows used by the portfolio dashboard at `#dashboard/schedules`.

## Source Boundary

- UI route: `#dashboard/schedules`
- Component data source: `src/components/Dashboard.tsx`
- Seed object: `roomSchedules`
- Backend status: portfolio-seeded evidence, ready to map to BEMS API/database rows when the dashboard is connected to live BMS services.

## Seed Records

```json
[
  {
    "building": "EnergyBuildAI Tower",
    "zone": "Lobby",
    "floor": "Ground",
    "room": "Lobby",
    "schedule": "06:00-20:00",
    "mode": "Occupied",
    "setpoint": "72 F",
    "source": "Primary weekday",
    "nextEvent": "20:00 lighting setback",
    "override": "Auto-clear pending",
    "controlIntent": "Comfort entry path with lobby lighting pulse"
  },
  {
    "building": "EnergyBuildAI Tower",
    "zone": "Floor 1",
    "floor": "Floor 1",
    "room": "Conference 101",
    "schedule": "08:30-17:30",
    "mode": "Reserved",
    "setpoint": "71 F",
    "source": "Room reservation",
    "nextEvent": "17:30 unoccupied reset",
    "override": "None",
    "controlIntent": "Meeting comfort during booked occupancy"
  },
  {
    "building": "EnergyBuildAI Tower",
    "zone": "Floor 2",
    "floor": "Floor 2",
    "room": "Engineering Lab",
    "schedule": "07:30-18:30",
    "mode": "Occupied",
    "setpoint": "72 F",
    "source": "Lab calendar",
    "nextEvent": "18:30 ventilation setback",
    "override": "None",
    "controlIntent": "Maintain lab ventilation and occupied comfort"
  },
  {
    "building": "EnergyBuildAI Tower",
    "zone": "Tower B Floor 1",
    "floor": "Tower B",
    "room": "Server Room",
    "schedule": "24/7",
    "mode": "Cooling priority",
    "setpoint": "68 F",
    "source": "Critical space",
    "nextEvent": "Continuous cooling guard",
    "override": "Locked",
    "controlIntent": "Protect server load from temperature drift"
  },
  {
    "building": "EnergyBuildAI Tower",
    "zone": "Tower B Floor 1",
    "floor": "Tower B",
    "room": "Tower Office",
    "schedule": "07:00-19:00",
    "mode": "Demand response",
    "setpoint": "73 F",
    "source": "BEMS-ai peak guard",
    "nextEvent": "15:00 load trim review",
    "override": "AI trim active",
    "controlIntent": "Reduce peak demand while preserving comfort"
  }
]
```

## API Mapping

When wired to the BEMS API, these rows map to:

- `GET /api/schedules`: list building, zone, floor, room, and operating-window records.
- `GET /api/rooms/:roomId/schedule`: return one room schedule with mode, setpoint, source, next event, override, and control intent.
- `PATCH /api/schedules/:scheduleId`: update operating windows, override state, or source.

## Provenance

This is deterministic portfolio seed evidence. It is not live building telemetry. The rows are intentionally aligned with the screenshots in `docs/evidence/energybuildai-schedules-desktop.png` and `docs/evidence/energybuildai-schedules-mobile.png`.
