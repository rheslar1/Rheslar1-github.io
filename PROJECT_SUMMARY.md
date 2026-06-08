# Robert Heslar Portfolio Summary

This repository contains a React portfolio for Robert Heslar, focused on embedded engineering, full-stack development, React, Node.js, MySQL, Yocto, embedded Linux, C/C++, Python, and automation.

## Current Live Site

https://rheslar1.github.io/Rheslar1-github.io/

## Core Features

- React 18 portfolio application
- Node.js build tooling
- GitHub Pages deployment
- GitHub Actions workflow for automated publishing
- Responsive layout
- Light/dark theme toggle
- Resume-aligned professional experience section
- Technical skills section
- Selected GitHub projects section
- Project detail pages with summaries, architecture, deployment details, dependencies, features, outcomes, previews, and resume-style highlights
- Contact links for GitHub, LinkedIn, and email

## Main Sections

- Hero
- About
- Professional Experience
- Technical Skills
- Selected GitHub Projects
- Project Details
- Contact
- Footer

## Project Structure

```text
Rheslar1-github.io/
├── .github/workflows/static.yml
├── public/index.html
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Experience.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── Navbar.js
│   │   ├── ProjectDetails.js
│   │   ├── Projects.js
│   │   └── Skills.js
│   ├── data/projects.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
├── package-lock.json
├── CLOUD_DEPLOYMENT.md
├── PERFORMANCE_ANALYTICS.md
├── PROJECT_SUMMARY.md
├── README.md
└── SETUP.md
```

## Deployment

Deployment is GitHub Pages only.

```bash
npm ci
npm run build
git push origin main
```

The workflow in `.github/workflows/static.yml` builds and publishes the `build` folder.

## Verification

Recent deployment checks have confirmed:

- `npm run build` compiles successfully
- GitHub Pages workflow completes successfully
- Live site returns `HTTP 200`
- Project detail pages are included in the published React bundle

## Next Content Improvements

- Add real project screenshots from running applications
- Add deeper README files to each project repository
- Add measurable outcomes where available
- Add case-study images or architecture diagrams for BMS and camera work
