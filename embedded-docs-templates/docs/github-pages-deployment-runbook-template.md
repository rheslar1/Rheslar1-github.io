# GitHub Pages Deployment Runbook (Template)

## 1) Purpose
Document how to publish the portfolio/docs site to GitHub Pages.

## 2) Prerequisites
- Node.js version: {{NODE_VERSION}}
- Package manager: npm
- Credentials: GitHub token (if needed)

## 3) Build Steps
1. `npm ci`
2. `npm run build`
3. Verify `dist/` or `build/` output

## 4) Deploy Steps
- Which branch drives Pages (e.g., `gh-pages` or `main`)
- Commit/push strategy
- Cache invalidation notes

## 5) Rollback
- Revert last deployment commit

## 6) Evidence & Troubleshooting
- URL of deployed site
- Screenshot/log capture procedure
- Known warnings

