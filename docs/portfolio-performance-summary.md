# Portfolio Performance Summary

## Lighthouse Summary

Measured with `lighthouse@11.7.1` against the local production build on 2026-06-11.

| Category | Score |
| --- | ---: |
| Performance | 96 |
| Accessibility | 94 |
| Best Practices | 96 |
| SEO | 100 |
| PWA | 38 |

## Core Metrics

| Metric | Value |
| --- | ---: |
| First Contentful Paint | 1.1 s |
| Largest Contentful Paint | 2.7 s |
| Total Blocking Time | 50 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 1.4 s |

## Evidence

- Raw Lighthouse JSON: `docs/evidence/lighthouse-home.json`

## Notes

- Latest Lighthouse required Node 22, so `lighthouse@11.7.1` was used with the repo's Node 18 toolchain.
- PWA score is low because the portfolio is not currently configured as an installable offline-first PWA.

