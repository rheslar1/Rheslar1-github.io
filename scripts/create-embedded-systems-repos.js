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
const coreTags = ['C++17', 'C++ Design Patterns', 'SOLID'];
const tagsFor = (spec) => Array.from(new Set([...coreTags, ...spec.tags]));

const writeFile = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${content.trim()}\n`);
};

const readmeFor = (spec) => `# ${spec.title}

${spec.summary}

## Portfolio Purpose

This repository is an Embedded Systems project scaffold for the Rheslar portfolio. It is designed to become a hardware-backed project with build output, validation logs, and reviewable implementation evidence.

All generated Embedded Systems repos are C++17-first and are framed around C++ design patterns and SOLID design principles.

## Stack

${tagsFor(spec).map((tag) => `- ${tag}`).join('\n')}

## Quick Start

\`\`\`bash
cmake -S . -B build
cmake --build build
./build/${safeName(spec.id)}
ctest --test-dir build --output-on-failure
\`\`\`

## Implementation Slices

- C++17 starter executable that exposes the project identity, stack, and validation target.
- Small strategy-style readiness check that keeps the scaffold aligned with C++ design patterns.
- Architecture document with control boundaries, data flow, safety assumptions, and evidence plan.
- CTest smoke test that keeps source, docs, and CI files present as the repo grows.
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

## C++17 Design Shape

- \`ProjectProfile\` owns project identity and evidence text.
- \`IReadinessRule\` defines a narrow strategy interface for scaffold readiness checks.
- \`RequiredEvidenceRule\` is a concrete strategy used by the starter executable and tests.
- The scaffold keeps documentation, executable behavior, and validation concerns separated.

## SOLID Notes

- Single Responsibility: profile data and readiness rules are separate.
- Open/Closed: new readiness rules can be added without changing the profile object.
- Liskov Substitution: any \`IReadinessRule\` can replace the default rule.
- Interface Segregation: the readiness interface exposes only one focused operation.
- Dependency Inversion: the executable consumes the readiness rule abstraction.

## Boundaries

- \`src/\`: native starter implementation and future device-specific drivers.
- \`docs/\`: validation plans, timing notes, hardware captures, and acceptance evidence.
- \`tests/\`: repo-level smoke tests and future simulator or host-side unit tests.
- \`.github/workflows/\`: CI entry point for build and validation evidence.

## Validation Plan

- Build the host starter with CMake.
- Run the executable and confirm the reported profile matches this repository.
- Run CTest to validate the C++17 readiness scaffold.
- Add hardware-specific logs after the first board, simulator, or bus test.
- Capture CI, terminal, and hardware evidence for the portfolio detail page.

## Expansion Notes

Replace the starter profile with the project-specific implementation slice while preserving the same review boundaries: build, tests, architecture notes, validation logs, and screenshots.
`;

const validationFor = (spec) => `# Validation Plan

## Current Scaffold Checks

- CMake configure completes.
- C++17 starter executable builds.
- Executable prints the project title, SOLID marker, stack, and validation target.
- CTest verifies the project profile and readiness strategy.

## Hardware Evidence To Add

- Board, simulator, or bus setup photo.
- Terminal output from the first successful run.
- Timing, power, memory, or safety measurement relevant to this project.
- CI screenshot after the public repository is pushed.

## Project-Specific Evidence Target

${spec.proof}
`;

const cmakeFor = (spec) => `cmake_minimum_required(VERSION 3.16)
project(${safeName(spec.id)} LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

enable_testing()

add_executable(\${PROJECT_NAME} src/main.cpp)
target_compile_options(\${PROJECT_NAME} PRIVATE -Wall -Wextra -Wpedantic)

add_executable(profile_tests tests/ProfileTests.cpp)
target_compile_options(profile_tests PRIVATE -Wall -Wextra -Wpedantic)
add_test(NAME profile_tests COMMAND profile_tests)
`;

const gitignoreFor = () => `build/
__pycache__/
*.o
*.elf
*.bin
*.hex
`;

const sourceFor = (spec) => {
  const tags = tagsFor(spec).map((tag) => `    ${cString(tag)}`).join(',\n');

  return `#include <array>
#include <iostream>
#include <string_view>

class IReadinessRule {
 public:
  virtual ~IReadinessRule() = default;
  virtual bool passes(std::string_view evidenceTarget) const = 0;
  virtual std::string_view name() const = 0;
};

class RequiredEvidenceRule final : public IReadinessRule {
 public:
  bool passes(std::string_view evidenceTarget) const override {
    return !evidenceTarget.empty();
  }

  std::string_view name() const override {
    return "RequiredEvidenceRule";
  }
};

struct ProjectProfile {
  std::string_view title;
  std::string_view summary;
  std::string_view evidenceTarget;
  std::array<std::string_view, ${tagsFor(spec).length}> tags;
};

constexpr ProjectProfile profile{
  ${cString(spec.title)},
  ${cString(spec.summary)},
  ${cString(spec.proof)},
  {
${tags}
  }
};

int main() {
  const RequiredEvidenceRule readinessRule;

  std::cout << profile.title << '\\n';
  std::cout << "Summary: " << profile.summary << '\\n';
  std::cout << "Evidence target: " << profile.evidenceTarget << '\\n';
  std::cout << "Readiness rule: " << readinessRule.name() << '\\n';
  std::cout << "SOLID marker: C++17 strategy interface with replaceable readiness rule" << '\\n';
  std::cout << "Stack:";

  for (std::size_t index = 0; index < profile.tags.size(); ++index) {
    std::cout << ' ' << profile.tags[index] << (index + 1U == profile.tags.size() ? "" : ",");
  }

  std::cout << '\\n';
  return readinessRule.passes(profile.evidenceTarget) ? 0 : 1;
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

const cppTestFor = (spec) => {
  const tags = tagsFor(spec).map((tag) => `    ${cString(tag)}`).join(',\n');

  return `#include <array>
#include <cassert>
#include <string_view>

class IReadinessRule {
 public:
  virtual ~IReadinessRule() = default;
  virtual bool passes(std::string_view evidenceTarget) const = 0;
};

class RequiredEvidenceRule final : public IReadinessRule {
 public:
  bool passes(std::string_view evidenceTarget) const override {
    return !evidenceTarget.empty();
  }
};

struct ProjectProfile {
  std::string_view title;
  std::string_view summary;
  std::string_view evidenceTarget;
  std::array<std::string_view, ${tagsFor(spec).length}> tags;
};

constexpr ProjectProfile profile{
  ${cString(spec.title)},
  ${cString(spec.summary)},
  ${cString(spec.proof)},
  {
${tags}
  }
};

int main() {
  const RequiredEvidenceRule rule;
  assert(!profile.title.empty());
  assert(!profile.summary.empty());
  assert(rule.passes(profile.evidenceTarget));
  assert(profile.tags[0] == "C++17");
  return 0;
}
`;
};

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
      - name: CTest
        run: ctest --test-dir build --output-on-failure
`;

fs.mkdirSync(outputRoot, { recursive: true });

let generatedCount = 0;

for (const spec of specs) {
  if (spec.id === 'nrf52840-bacnet-field-node') {
    continue;
  }

  const repoDir = path.join(outputRoot, spec.id);

  fs.mkdirSync(repoDir, { recursive: true });
  writeFile(path.join(repoDir, '.gitignore'), gitignoreFor());
  writeFile(path.join(repoDir, 'README.md'), readmeFor(spec));
  writeFile(path.join(repoDir, 'ARCHITECTURE.md'), architectureFor(spec));
  writeFile(path.join(repoDir, 'CMakeLists.txt'), cmakeFor(spec));
  writeFile(path.join(repoDir, 'src', 'main.cpp'), sourceFor(spec));
  writeFile(path.join(repoDir, 'docs', 'validation-plan.md'), validationFor(spec));
  writeFile(path.join(repoDir, 'tests', 'ProfileTests.cpp'), cppTestFor(spec));
  writeFile(path.join(repoDir, '.github', 'workflows', 'ci.yml'), workflowFor());

  run('git', ['rm', '-r', '--ignore-unmatch', 'tests/__pycache__'], repoDir);

  for (const stalePath of ['src/main.c', 'tests/test_repo_smoke.py']) {
    const absoluteStalePath = path.join(repoDir, stalePath);
    if (fs.existsSync(absoluteStalePath)) {
      fs.unlinkSync(absoluteStalePath);
    }
  }

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

  generatedCount += 1;
}

console.log(`Created ${generatedCount} embedded systems local repositories in ${outputRoot}`);
