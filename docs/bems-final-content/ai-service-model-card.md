# BEMS-AI Service Model Card

Source: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/ai-service/app.py`

## Intended Use

The AI service provides advisory optimization and forecasting support for BMS/BEMS operations. It helps estimate energy savings, recommend operating adjustments, and accept reinforcement feedback.

## Non-Use

- Not an autonomous life-safety controller.
- Not a substitute for edge-core safety/writeback limits.
- Not a guarantee of energy savings without building-specific calibration.

## Inputs

- Building and zone telemetry payloads.
- Device states and setpoints.
- Schedule and operating-mode context.
- Optional feedback from reinforcement workflows.

## Outputs

- Optimization JSON.
- Projected savings/cost improvements.
- Recommendations for operator review.
- Feedback acknowledgement/state.

## Risks And Controls

| Risk | Control |
| --- | --- |
| Poor telemetry quality | Keep recommendations advisory and surface confidence/health. |
| Unsafe actuator request | Route final writes through edge-core policy. |
| Over-optimization harms comfort | Track comfort risk and setpoint bounds. |
| Service unavailable | Node API fallback preserves dashboard operation. |

## Validation

- Python syntax check: `python3 -m py_compile ai-service/app.py`
- API integration check through Node API optimization endpoints.
- Operator review of recommendations before production writeback.

