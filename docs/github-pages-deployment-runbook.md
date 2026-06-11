# GitHub Pages Deployment Runbook

## Workflow

Source workflow:

```text
.github/workflows/static.yml
```

The workflow runs on pushes to `main` and manual dispatch.

## Build Steps

```bash
npm ci
npm run typecheck
npm run build
```

The workflow uploads the `build/` directory through `actions/upload-pages-artifact` and deploys with `actions/deploy-pages`.

## Branch Strategy

- `main` is the deployment branch.
- Keep feature work on a branch when changes are risky.
- Merge or push to `main` only after local `typecheck`, tests, and build pass.

## Cache Behavior

- GitHub Actions uses npm cache through `actions/setup-node`.
- Browser caching may keep old static assets until hashed bundle names change.
- React build emits hashed JS/CSS filenames, so normal code changes invalidate browser cache automatically.

## Rollback

1. Identify the last good commit.
2. Revert the bad commit or push a corrective commit.
3. Confirm the Pages workflow completes.
4. Open the live URL and verify the affected route.

## Live URL

```text
https://rheslar1.github.io/Rheslar1-github.io/
```

