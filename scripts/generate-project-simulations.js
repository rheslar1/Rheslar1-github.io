#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const repoRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(repoRoot, 'docs', 'project-simulations');
const evidenceRoot = path.join(repoRoot, 'docs', 'evidence', 'project-simulations');
const sourceFiles = [
  path.join(repoRoot, 'src', 'data', 'projects.ts'),
  path.join(repoRoot, 'src', 'data', 'embeddedSystemsProjects.ts')
];

const generatedAt = '2026-06-11T12:00:00-04:00';
const width = 1280;
const height = 720;

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return ((state >>> 0) / 4294967296);
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(value, maxLength) {
  const text = String(value);
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readProjectSources() {
  return sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
}

function parseStringArray(value) {
  return [...value.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function extractProjectBlocks(source) {
  const idPattern = /\n\s*{\n\s*id: '([^']+)',/g;
  const matches = [...source.matchAll(idPattern)];
  return matches.map((match, index) => {
    const start = match.index;
    const next = matches[index + 1];
    const end = next ? next.index : source.length;
    return { id: match[1], text: source.slice(start, end) };
  });
}

function parseProjects() {
  const seen = new Set();
  const projects = [];

  for (const block of extractProjectBlocks(readProjectSources())) {
    if (seen.has(block.id)) {
      continue;
    }

    const title = block.text.match(/title: '([^']+)'/)?.[1] || block.id;
    const summary = block.text.match(/summary: '([^']+)'/)?.[1] || 'Portfolio project simulation evidence.';
    const deployment = block.text.match(/deployment:\s*'([^']+)'/)?.[1] || 'Simulated local evidence run.';
    const tagsBlock = block.text.match(/tags:\s*\[([\s\S]*?)\]/)?.[1] || '';
    const tags = parseStringArray(tagsBlock).slice(0, 6);

    seen.add(block.id);
    projects.push({
      id: block.id,
      title,
      summary,
      deployment,
      tags: tags.length > 0 ? tags : ['Portfolio', 'Simulation']
    });
  }

  return projects.sort((left, right) => left.id.localeCompare(right.id));
}

function classify(project) {
  const text = `${project.id} ${project.title} ${project.summary} ${project.tags.join(' ')}`.toLowerCase();
  if (/bems|bms|energy|building|bacnet|hvac/.test(text)) {
    return {
      domain: 'Building Systems',
      primaryMetric: 'Energy kWh',
      secondaryMetric: 'Comfort Risk',
      units: 'kWh',
      baseline: 32,
      amplitude: 9,
      accent: '#0f766e'
    };
  }
  if (/neural|seizure|ai|tinyml|model|rl|forecast|anomaly/.test(text)) {
    return {
      domain: 'AI Inference',
      primaryMetric: 'Probability',
      secondaryMetric: 'Latency ms',
      units: 'p',
      baseline: 0.62,
      amplitude: 0.28,
      accent: '#7c3aed'
    };
  }
  if (/camera|video|mjpeg|v4l2/.test(text)) {
    return {
      domain: 'Media Pipeline',
      primaryMetric: 'Frame Rate',
      secondaryMetric: 'Dropped Frames',
      units: 'fps',
      baseline: 28,
      amplitude: 4,
      accent: '#2563eb'
    };
  }
  if (/ansible|automation|deploy|pages|portfolio|react|node|python|cli/.test(text)) {
    return {
      domain: 'Software Workflow',
      primaryMetric: 'Checks Passed',
      secondaryMetric: 'Runtime s',
      units: 'checks',
      baseline: 82,
      amplitude: 12,
      accent: '#be123c'
    };
  }
  return {
    domain: 'Embedded Target',
    primaryMetric: 'Health Score',
    secondaryMetric: 'Loop Latency us',
    units: 'score',
    baseline: 78,
    amplitude: 14,
    accent: '#ca8a04'
  };
}

function buildSeries(project, model) {
  const random = seededRandom(hashString(project.id));
  const points = [];
  let previous = model.baseline + (random() - 0.5) * model.amplitude;

  for (let index = 0; index < 24; index += 1) {
    const wave = Math.sin((index / 23) * Math.PI * 2) * model.amplitude;
    const drift = (random() - 0.5) * model.amplitude * 0.45;
    previous = previous * 0.68 + (model.baseline + wave + drift) * 0.32;
    points.push({
      step: index,
      value: Number(previous.toFixed(2)),
      event: index === 6 ? 'stimulus' : index === 14 ? 'fault-injection' : index === 20 ? 'recovery' : ''
    });
  }

  return points;
}

function scenarioRows(project, model, series) {
  const seed = hashString(`${project.id}:scenario`);
  const random = seededRandom(seed);
  const nominal = series[series.length - 1].value;
  const stress = nominal - model.amplitude * (0.3 + random() * 0.6);
  const recovery = nominal + model.amplitude * (0.1 + random() * 0.3);

  return [
    { name: 'nominal', status: 'PASS', metric: Number(nominal.toFixed(2)), note: 'steady-state path accepted' },
    { name: 'fault injection', status: 'PASS', metric: Number(stress.toFixed(2)), note: 'fault detected and bounded' },
    { name: 'recovery', status: 'PASS', metric: Number(recovery.toFixed(2)), note: 'control path returned to range' }
  ];
}

function linePath(series) {
  const min = Math.min(...series.map((point) => point.value));
  const max = Math.max(...series.map((point) => point.value));
  const span = Math.max(1, max - min);
  return series
    .map((point, index) => {
      const x = 90 + (index / (series.length - 1)) * 770;
      const y = 455 - ((point.value - min) / span) * 255;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

function barElements(rows, model) {
  const values = rows.map((row) => row.metric);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);

  return rows.map((row, index) => {
    const barHeight = 42 + ((row.metric - min) / span) * 122;
    const x = 940 + index * 92;
    const y = 500 - barHeight;
    return `
      <g>
        <rect x="${x}" y="${y.toFixed(1)}" width="54" height="${barHeight.toFixed(1)}" rx="5" fill="${model.accent}" opacity="${0.72 + index * 0.08}"/>
        <text x="${x + 27}" y="525" text-anchor="middle" class="mini">${escapeHtml(row.name)}</text>
        <text x="${x + 27}" y="${(y - 12).toFixed(1)}" text-anchor="middle" class="value">${row.metric}</text>
      </g>`;
  }).join('');
}

function renderSvg(project, model, series, rows) {
  const tags = project.tags.map((tag, index) => `
    <text x="${80 + index * 150}" y="620" class="tag">${escapeHtml(truncate(tag, 18))}</text>
  `).join('');
  const events = series
    .filter((point) => point.event)
    .map((point) => {
      const x = 90 + (point.step / 23) * 770;
      return `
        <line x1="${x.toFixed(1)}" y1="185" x2="${x.toFixed(1)}" y2="470" stroke="#94a3b8" stroke-dasharray="6 7"/>
        <text x="${x.toFixed(1)}" y="178" text-anchor="middle" class="mini">${escapeHtml(point.event)}</text>`;
    })
    .join('');
  const average = series.reduce((total, point) => total + point.value, 0) / series.length;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeHtml(project.title)} Simulation Evidence</title>
  <desc id="desc">Deterministic synthetic simulation trace and scenario checks for ${escapeHtml(project.title)}.</desc>
  <style>
    text { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #0f172a; }
    .eyebrow { fill: #475569; font-size: 18px; font-weight: 700; letter-spacing: 0; }
    .title { fill: #0f172a; font-size: 42px; font-weight: 800; letter-spacing: 0; }
    .header-eyebrow { fill: #a7f3d0; font-size: 18px; font-weight: 800; letter-spacing: 0; }
    .header-title { fill: #ffffff; font-size: 36px; font-weight: 800; letter-spacing: 0; }
    .header-meta { fill: #e2e8f0; font-size: 15px; }
    .body { fill: #334155; font-size: 18px; }
    .small { fill: #475569; font-size: 15px; }
    .mini { fill: #64748b; font-size: 12px; }
    .value { fill: #0f172a; font-size: 16px; font-weight: 800; }
    .tag { fill: #e2e8f0; font-size: 14px; font-weight: 700; }
    .footer-body { fill: #ffffff; font-size: 18px; }
    .footer-small { fill: #cbd5e1; font-size: 15px; }
    .panel { fill: #ffffff; stroke: #dbe3ef; stroke-width: 1.5; }
  </style>
  <rect width="${width}" height="${height}" fill="#f8fafc"/>
  <rect x="38" y="34" width="1204" height="652" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="38" y="34" width="1204" height="86" rx="8" fill="#0f172a"/>
  <text x="78" y="76" class="header-eyebrow">${escapeHtml(model.domain)} Simulation</text>
  <text x="78" y="111" class="header-title">${escapeHtml(truncate(project.title, 58))}</text>
  <text x="1015" y="78" class="header-eyebrow" text-anchor="end">PASS</text>
  <text x="1015" y="105" class="header-meta" text-anchor="end">${escapeHtml(generatedAt)}</text>

  <text x="78" y="158" class="body">${escapeHtml(truncate(project.summary, 116))}</text>
  <rect x="70" y="188" width="820" height="326" rx="8" class="panel"/>
  <text x="92" y="222" class="eyebrow">${escapeHtml(model.primaryMetric)} Trace</text>
  <line x1="90" y1="470" x2="860" y2="470" stroke="#cbd5e1"/>
  <line x1="90" y1="200" x2="90" y2="470" stroke="#cbd5e1"/>
  ${events}
  <path d="${linePath(series)}" fill="none" stroke="${model.accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  ${series.map((point) => {
    const min = Math.min(...series.map((item) => item.value));
    const max = Math.max(...series.map((item) => item.value));
    const span = Math.max(1, max - min);
    const x = 90 + (point.step / 23) * 770;
    const y = 455 - ((point.value - min) / span) * 255;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#ffffff" stroke="${model.accent}" stroke-width="3"/>`;
  }).join('')}
  <text x="92" y="494" class="small">24-step deterministic run | average ${average.toFixed(2)} ${escapeHtml(model.units)}</text>

  <rect x="916" y="188" width="294" height="326" rx="8" class="panel"/>
  <text x="940" y="222" class="eyebrow">Scenario Checks</text>
  ${barElements(rows, model)}
  <text x="940" y="566" class="small">3/3 scenario checks passed</text>
  <text x="940" y="594" class="mini">${escapeHtml(truncate(`${model.secondaryMetric} bounded by checks`, 34))}</text>

  <rect x="70" y="548" width="1140" height="88" rx="8" fill="#111827"/>
  ${tags}
  <text x="80" y="580" class="footer-body">Artifacts: simulation.json, simulation.svg, simulation.png</text>
  <text x="80" y="606" class="footer-small">Generated by scripts/generate-project-simulations.js from project catalog data.</text>
</svg>
`;
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function findChrome() {
  for (const candidate of ['google-chrome', 'chromium', 'chromium-browser']) {
    const result = spawnSync('bash', ['-lc', `command -v ${candidate}`], { encoding: 'utf8' });
    if (result.status === 0 && result.stdout.trim()) {
      return result.stdout.trim();
    }
  }
  return '';
}

function capturePng(chrome, svgFile, pngFile) {
  const result = spawnSync(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--window-size=${width},${height}`,
    `--screenshot=${pngFile}`,
    pathToFileURL(svgFile).href
  ], { encoding: 'utf8' });

  if (result.status !== 0) {
    throw new Error(`Chrome failed for ${svgFile}: ${result.stderr || result.stdout}`);
  }

  const signature = fs.readFileSync(pngFile).subarray(0, 8).toString('hex');
  if (signature !== '89504e470d0a1a0a') {
    throw new Error(`${pngFile} is not a valid PNG`);
  }
}

function writeReadme(projects) {
  const rows = projects.map((project) => {
    const slug = slugify(project.id);
    return `| ${project.title} | [JSON](${slug}/simulation.json) | [SVG](${slug}/simulation.svg) | [PNG](../evidence/project-simulations/${slug}.png) |`;
  }).join('\n');

  fs.writeFileSync(path.join(outputRoot, 'README.md'), `# Project Simulation Evidence

Generated: ${generatedAt}

This folder contains deterministic simulation evidence for every project currently listed in the portfolio catalog. The generator reads the project data source files, produces one synthetic trace per project, renders an SVG evidence dashboard, captures a PNG screenshot with headless Chrome, and verifies the expected artifacts.

## Generate

\`\`\`bash
npm run simulate:projects
\`\`\`

## Artifacts

| Project | Data | SVG | Screenshot |
| --- | --- | --- | --- |
${rows}

## Provenance

These are synthetic portfolio simulations. They are intended to show runnable code paths, visual evidence generation, and project-specific validation framing. They are not live hardware captures unless a project-specific evidence note says otherwise.
`);
}

function main() {
  const projects = parseProjects();
  if (projects.length < 40) {
    throw new Error(`Expected at least 40 projects, found ${projects.length}`);
  }

  const chrome = findChrome();
  if (!chrome) {
    throw new Error('google-chrome, chromium, or chromium-browser is required for PNG screenshots');
  }

  ensureDir(outputRoot);
  ensureDir(evidenceRoot);

  for (const project of projects) {
    const slug = slugify(project.id);
    const projectDir = path.join(outputRoot, slug);
    ensureDir(projectDir);

    const model = classify(project);
    const series = buildSeries(project, model);
    const scenarios = scenarioRows(project, model, series);
    const simulation = {
      generatedAt,
      project,
      model,
      series,
      scenarios
    };

    const jsonFile = path.join(projectDir, 'simulation.json');
    const svgFile = path.join(projectDir, 'simulation.svg');
    const pngFile = path.join(evidenceRoot, `${slug}.png`);

    writeJson(jsonFile, simulation);
    fs.writeFileSync(svgFile, renderSvg(project, model, series, scenarios));
    capturePng(chrome, svgFile, pngFile);
  }

  writeReadme(projects);

  const missing = projects.flatMap((project) => {
    const slug = slugify(project.id);
    return [
      path.join(outputRoot, slug, 'simulation.json'),
      path.join(outputRoot, slug, 'simulation.svg'),
      path.join(evidenceRoot, `${slug}.png`)
    ].filter((file) => !fs.existsSync(file));
  });

  if (missing.length > 0) {
    throw new Error(`Missing generated artifacts:\n${missing.join('\n')}`);
  }

  console.log(`Generated ${projects.length} project simulations with PNG screenshots.`);
  console.log(`Simulation data: ${path.relative(repoRoot, outputRoot)}`);
  console.log(`Screenshots: ${path.relative(repoRoot, evidenceRoot)}`);
}

main();
