# EnergyBuildAI Schedule Details

This document describes the schedule details shown in the portfolio dashboard at `#dashboard/schedules`.

## Dashboard Route

- Route: `#dashboard/schedules`
- Component: `src/components/Dashboard.tsx`
- Purpose: show building, zone, floor, room, operating window, mode, setpoint, schedule source, next event, override state, and control intent.

## Schedule Rows

| Building | Zone | Floor | Room | Schedule | Mode | Setpoint | Source | Next Event | Override | Control Intent |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EnergyBuildAI Tower | Lobby | Ground | Lobby | 06:00-20:00 | Occupied | 72 F | Primary weekday | 20:00 lighting setback | Auto-clear pending | Comfort entry path with lobby lighting pulse |
| EnergyBuildAI Tower | Floor 1 | Floor 1 | Conference 101 | 08:30-17:30 | Reserved | 71 F | Room reservation | 17:30 unoccupied reset | None | Meeting comfort during booked occupancy |
| EnergyBuildAI Tower | Floor 2 | Floor 2 | Engineering Lab | 07:30-18:30 | Occupied | 72 F | Lab calendar | 18:30 ventilation setback | None | Maintain lab ventilation and occupied comfort |
| EnergyBuildAI Tower | Tower B Floor 1 | Tower B | Server Room | 24/7 | Cooling priority | 68 F | Critical space | Continuous cooling guard | Locked | Protect server load from temperature drift |
| EnergyBuildAI Tower | Tower B Floor 1 | Tower B | Tower Office | 07:00-19:00 | Demand response | 73 F | BEMS-ai peak guard | 15:00 load trim review | AI trim active | Reduce peak demand while preserving comfort |

## Resolution Policy

EnergyBuildAI resolves schedule state in this priority order:

1. Safety and critical-space protection.
2. Manual override state.
3. AI demand-response trim.
4. Room reservation or local calendar.
5. Base building schedule.

This keeps critical cooling and safety actions above energy optimization while still allowing BEMS-ai to trim noncritical load during peak demand intervals.

## Building Equipment Details

The dashboard also surfaces equipment that influences schedule execution:

| Equipment | Signal | Status Detail | Control Purpose |
| --- | --- | --- | --- |
| AHU-01 Supply Fan | VFD command 92% | Fan proof on, static pressure 1.4 in. w.c. | Hold static reset curve |
| VAV Damper Network | 74% average damper position | 1 stuck-open branch, 18 dampers online | Inspect Floor 1 conference VAV |
| Supply Fan Motor | 6.8 A motor current | 118 F winding/temperature note, no overload | Normal motor load |
| Return Fan Motor | 4.1 A motor current | Tracking supply fan at -8% | Maintain building pressure |
| Chiller Loop Pump Motor | 58% pump speed | 68 F return water | Keep chilled-water loop stable |
| Lighting Relay Bus | 97% online nodes | Lobby override queued | Clear on next schedule pulse |

## Captured Evidence

- `docs/evidence/energybuildai-schedules-desktop.png`: desktop screenshot of `#dashboard/schedules`.
- `docs/evidence/energybuildai-schedules-mobile.png`: mobile screenshot of `#dashboard/schedules`.
- `docs/evidence/energybuildai-building-summary-desktop.png`: screenshot of the Building Summary view after the wording update.
- `docs/evidence/energybuildai-equipment-systems-desktop.png`: screenshot of fans, dampers, motors, pump motor, and lighting relay system details.

## Final Evidence Still Suggested

- API response or database seed record for schedule rows when the dashboard is connected to live BMS data.
- Test report confirming that schedule route parsing opens `Schedules` directly from the hash route.
