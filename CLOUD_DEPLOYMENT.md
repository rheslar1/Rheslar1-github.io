# GitHub Pages Deployment

This portfolio is deployed with GitHub Pages only.

## Live Site

https://rheslar1.github.io/Rheslar1-github.io/

## Deployment Workflow

The deployment is handled by:

```text
.github/workflows/static.yml
```

On every push to `main`, GitHub Actions:

1. Checks out the repository
2. Sets up Node.js 18
3. Runs `npm ci`
4. Runs `npm run build`
5. Uploads the `build` folder as a Pages artifact
6. Publishes the site to GitHub Pages

## Local Verification

Before pushing changes, run:

```bash
npm ci
npm run build
```

## Deploy Changes

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

The GitHub Pages workflow will publish the updated portfolio automatically.

## Post-Deployment Checklist

- Site loads on desktop and mobile
- Navigation links scroll correctly
- Project cards and project detail pages work
- Repository links open in a new tab
- Contact links work
- No console errors
- Live URL returns `HTTP 200`

## Monitoring

- Use the GitHub Actions run page to verify deployment success
- Use Lighthouse or PageSpeed Insights for performance checks
- Use Google Analytics or Google Search Console if traffic/search reporting is needed
