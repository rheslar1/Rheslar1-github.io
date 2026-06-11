# CI Deployment Evidence

## Portfolio Build Commands

```bash
npm ci
npm run typecheck
npm test -- --watchAll=false
npm run build
```

## BMS Service Checks

```bash
node --check BMS/BEMS_ENTERPRISE_COMPLETE/repo/node-api/server.js
node --check BMS/BEMS_ENTERPRISE_COMPLETE/repo/node-api/edgeClient.js
node --check BMS/BEMS_ENTERPRISE_COMPLETE/repo/node-api/aiClient.js
python3 -m py_compile BMS/BEMS_ENTERPRISE_COMPLETE/repo/ai-service/app.py
cmake -S BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core -B BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core/build
cmake --build BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core/build
```

## Pages URL

```text
https://rheslar1.github.io/Rheslar1-github.io/
```

## Known Warnings

- `npm ci` reports dependency deprecation and audit warnings inherited from the React toolchain.
- Lighthouse PWA score is low because the portfolio is not configured as a full installable PWA.
- BMS Docker stack evidence should be refreshed when live backend services are available.

