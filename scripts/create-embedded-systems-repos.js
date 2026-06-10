const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const projectDataPath = path.join(workspaceRoot, 'src', 'data', 'embeddedSystemsProjects.js');
const outputRoot = path.join(workspaceRoot, 'embedded-system-repos');

const dataSource = fs.readFileSync(projectDataPath, 'utf8');
const specsMatch = dataSource.match(/const embeddedSystemsSpecs = (\[[\s\S]*?\]);/);

if (!specsMatch) {
  throw new Error('Could not locate embeddedSystemsSpecs in src/data/embeddedSystemsProjects.js');
}

const specs = Function(`return ${specsMatch[1]}`)();

const run = (command, args, cwd) => {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed in ${cwd}\n${result.stderr || result.stdout}`);
  }

  return result.stdout.trim();
};

const safeName = (value) => value.replace(/[^A-Za-z0-9_]/g, '_').replace(/^([0-9])/, '_$1');
const cString = (value) => JSON.stringify(value);

const writeFile = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${content.trim()}\n`);
};

const readmeFor = (spec) => `# ${spec.title}

${spec.summary}

## Portfolio Purpose

This repository is an Embedded Systems project scaffold for the Rheslar portfolio. It is designed to become a hardware-backed project with build output, validation logs, and reviewable implementation evidence.

## Stack

${spec.tags.map((tag) => `- ${tag}`).join('\n')}

## Quick Start

\`\`\`bash
cmake -S . -B build
cmake --build build
./build/${safeName(spec.id)}
python -m unittest discover -s tests
\`\`\`

## Implementation Slices

- Native starter executable that exposes the project identity, stack, and validation target.
- Architecture document with control boundaries, data flow, safety assumptions, and evidence plan.
- Unit smoke test that keeps source, docs, and CI files present as the repo grows.
- GitHub Actions workflow for configure, build, executable smoke run, and repository validation.

## Evidence Target

${spec.proof}

## Remote

Intended public repository: https://github.com/rheslar1/${spec.id}
`;

const architectureFor = (spec) => `# ${spec.title} Architecture

## Goal

${spec.proof}

## Runtime Shape

1. Hardware or simulator input is sampled through a narrow driver boundary.
2. A control profile normalizes state into a deterministic decision surface.
3. Safety checks reject unsafe commands before they reach the actuator, transport, or update path.
4. Telemetry and validation logs are emitted for repeatable review.

## Boundaries

- \`src/\`: native starter implementation and future device-specific drivers.
- \`docs/\`: validation plans, timing notes, hardware captures, and acceptance evidence.
- \`tests/\`: repo-level smoke tests and future simulator or host-side unit tests.
- \`.github/workflows/\`: CI entry point for build and validation evidence.

## Validation Plan

- Build the host starter with CMake.
- Run the executable and confirm the reported profile matches this repository.
- Add hardware-specific logs after the first board, simulator, or bus test.
- Capture CI, terminal, and hardware evidence for the portfolio detail page.

## Expansion Notes

Replace the starter profile with the project-specific implementation slice while preserving the same review boundaries: build, tests, architecture notes, validation logs, and screenshots.
`;

const validationFor = (spec) => `# Validation Plan

## Current Scaffold Checks

- CMake configure completes.
- Native starter executable builds.
- Executable prints the project title and validation target.
- Python unittest smoke test verifies required repo artifacts.

## Hardware Evidence To Add

- Board, simulator, or bus setup photo.
- Terminal output from the first successful run.
- Timing, power, memory, or safety measurement relevant to this project.
- CI screenshot after the public repository is pushed.

## Project-Specific Evidence Target

${spec.proof}
`;

const cmakeFor = (spec) => `cmake_minimum_required(VERSION 3.16)
project(${safeName(spec.id)} C)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

add_executable(\${PROJECT_NAME} src/main.c)
target_compile_options(\${PROJECT_NAME} PRIVATE -Wall -Wextra -Wpedantic)
`;

const gitignoreFor = () => `build/
*.o
*.elf
*.bin
*.hex
`;

const sourceFor = (spec) => {
  const tags = spec.tags.map((tag) => `  ${cString(tag)}`).join(',\n');

  return `#include <stdio.h>
#include <stddef.h>

typedef struct {
  const char *title;
  const char *summary;
  const char *evidence_target;
  const char *tags[8];
  size_t tag_count;
} project_profile_t;

static const project_profile_t profile = {
  ${cString(spec.title)},
  ${cString(spec.summary)},
  ${cString(spec.proof)},
  {
${tags}
  },
  ${spec.tags.length}u
};

int main(void) {
  printf("%s\\n", profile.title);
  printf("Summary: %s\\n", profile.summary);
  printf("Evidence target: %s\\n", profile.evidence_target);
  printf("Stack:");

  for (size_t index = 0; index < profile.tag_count; ++index) {
    printf(" %s%s", profile.tags[index], index + 1u == profile.tag_count ? "" : ",");
  }

  printf("\\n");
  return 0;
}
`;
};

const testFor = (spec) => `import pathlib
import unittest


class RepoSmokeTest(unittest.TestCase):
    def setUp(self):
        self.root = pathlib.Path(__file__).resolve().parents[1]

    def test_required_artifacts_exist(self):
        required = [
            'README.md',
            'ARCHITECTURE.md',
            'CMakeLists.txt',
            'src/main.c',
            'docs/validation-plan.md',
            '.github/workflows/ci.yml',
        ]
        for relative_path in required:
            with self.subTest(relative_path=relative_path):
                self.assertTrue((self.root / relative_path).exists())

    def test_readme_names_project(self):
        readme = (self.root / 'README.md').read_text(encoding='utf-8')
        self.assertIn(${cString(spec.title)}, readme)


if __name__ == '__main__':
    unittest.main()
`;

const workflowFor = () => `name: CI

on:
  push:
  pull_request:

jobs:
  build-and-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure
        run: cmake -S . -B build
      - name: Build
        run: cmake --build build
      - name: Run starter executable
        run: ./build/$(basename "$PWD" | tr '-' '_')
      - name: Smoke tests
        run: python -m unittest discover -s tests
`;

fs.mkdirSync(outputRoot, { recursive: true });

for (const spec of specs) {
  const repoDir = path.join(outputRoot, spec.id);

  fs.mkdirSync(repoDir, { recursive: true });
  writeFile(path.join(repoDir, '.gitignore'), gitignoreFor());
  writeFile(path.join(repoDir, 'README.md'), readmeFor(spec));
  writeFile(path.join(repoDir, 'ARCHITECTURE.md'), architectureFor(spec));
  writeFile(path.join(repoDir, 'CMakeLists.txt'), cmakeFor(spec));
  writeFile(path.join(repoDir, 'src', 'main.c'), sourceFor(spec));
  writeFile(path.join(repoDir, 'docs', 'validation-plan.md'), validationFor(spec));
  writeFile(path.join(repoDir, 'tests', 'test_repo_smoke.py'), testFor(spec));
  writeFile(path.join(repoDir, '.github', 'workflows', 'ci.yml'), workflowFor());

  if (!fs.existsSync(path.join(repoDir, '.git'))) {
    const init = spawnSync('git', ['init', '-b', 'main'], { cwd: repoDir, encoding: 'utf8', stdio: 'pipe' });
    if (init.status !== 0) {
      run('git', ['init'], repoDir);
      run('git', ['checkout', '-b', 'main'], repoDir);
    }
  }

  run('git', ['config', 'user.name', 'rheslar'], repoDir);
  run('git', ['config', 'user.email', 'rheslar@gmail.com'], repoDir);

  const remoteCheck = spawnSync('git', ['remote', 'get-url', 'origin'], {
    cwd: repoDir,
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (remoteCheck.status !== 0) {
    run('git', ['remote', 'add', 'origin', `git@github.com:rheslar1/${spec.id}.git`], repoDir);
  }

  run('git', ['add', '.'], repoDir);
  const status = run('git', ['status', '--porcelain'], repoDir);
  if (status) {
    run('git', ['commit', '-m', 'Initial embedded systems project scaffold'], repoDir);
  }
}

console.log(`Created ${specs.length} embedded systems local repositories in ${outputRoot}`);
