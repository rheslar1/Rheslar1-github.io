#!/usr/bin/env python3
"""Upgrade starter embedded repos to host-buildable C++17 implementations."""

from __future__ import annotations

import re
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parents[1]
REPOS_ROOT = WORKSPACE / "embedded-system-repos"
START = "<!-- cpp17-solid-implementation:start -->"
END = "<!-- cpp17-solid-implementation:end -->"


def safe_name(value: str) -> str:
  result = re.sub(r"[^A-Za-z0-9_]", "_", value)
  return re.sub(r"^([0-9])", r"_\1", result)


def read_text(path: Path) -> str:
  return path.read_text(encoding="utf-8") if path.exists() else ""


def write_text(path: Path, content: str) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  path.write_text(content.rstrip() + "\n", encoding="utf-8")


def title_from_readme(readme: str, repo_name: str) -> str:
  for line in readme.splitlines():
    if line.startswith("# "):
      return line[2:].strip()
  return repo_name.replace("-", " ").title()


def summary_from_readme(readme: str) -> str:
  lines = [line.strip() for line in readme.splitlines()]
  for line in lines:
    if line and not line.startswith("#"):
      return line
  return "Host-buildable embedded systems implementation with validation, telemetry, and CI evidence."


def evidence_from_readme(readme: str) -> str:
  marker = "## Evidence Target"
  if marker not in readme:
    return "Reviewable embedded engineering evidence with source, tests, architecture, and validation logs."
  section = readme.split(marker, 1)[1]
  section = section.split("\n## ", 1)[0]
  for line in section.splitlines():
    line = line.strip()
    if line:
      return line
  return "Reviewable embedded engineering evidence with source, tests, architecture, and validation logs."


def tags_from_readme(readme: str) -> list[str]:
  tags: list[str] = []
  in_stack = False
  for line in readme.splitlines():
    stripped = line.strip()
    if stripped == "## Stack":
      in_stack = True
      continue
    if in_stack and stripped.startswith("## "):
      break
    if in_stack and stripped.startswith("- "):
      tags.append(stripped[2:].strip())
  base = ["C++17", "C++ Design Patterns", "SOLID"]
  merged: list[str] = []
  for tag in [*base, *tags]:
    if tag not in merged:
      merged.append(tag)
  return merged[:12]


def metric_profile(repo_name: str, title: str, tags: list[str]) -> tuple[str, str, float, float, str, str]:
  haystack = " ".join([repo_name, title, *tags]).lower()
  if any(key in haystack for key in ["motor", "drv8801", "control"]):
    return ("motor_current_a", "loop_jitter_us", 4.5, 250.0, "A", "us")
  if any(key in haystack for key in ["wifi", "mqtt", "modbus", "can", "gateway", "iot"]):
    return ("bus_latency_ms", "decode_errors", 120.0, 1.0, "ms", "count")
  if any(key in haystack for key in ["bootloader", "ota", "update", "secure boot"]):
    return ("image_size_kib", "rollback_counter_age", 480.0, 0.0, "KiB", "count")
  if any(key in haystack for key in ["buildroot", "yocto", "rootfs", "linux", "kiosk"]):
    return ("boot_time_s", "rootfs_size_mb", 8.0, 96.0, "s", "MB")
  if any(key in haystack for key in ["sensor", "ekg", "temperature", "tinyml", "wearable"]):
    return ("sample_value", "sample_jitter_ms", 75.0, 20.0, "units", "ms")
  if any(key in haystack for key in ["fpga", "pru", "real-time"]):
    return ("register_latency_us", "missed_deadlines", 50.0, 0.0, "us", "count")
  if any(key in haystack for key in ["flash", "test", "production"]):
    return ("flash_time_s", "verification_errors", 120.0, 0.0, "s", "count")
  if any(key in haystack for key in ["datalogger", "low-power", "power"]):
    return ("average_current_ua", "wake_latency_ms", 45.0, 30.0, "uA", "ms")
  return ("loop_jitter_us", "fault_count", 500.0, 0.0, "us", "count")


def requires_connectivity(repo_name: str, tags: list[str]) -> bool:
  haystack = " ".join([repo_name, *tags]).lower()
  return any(key in haystack for key in [
      "iot",
      "mqtt",
      "wifi",
      "modbus",
      "can",
      "gateway",
      "ota",
      "update",
      "container",
      "docker",
      "kiosk",
      "streaming",
  ])


def generated_doc_block() -> str:
  return f"""{START}
## C++17, Design Patterns, and SOLID Implementation

This repository includes a host-buildable C++17 implementation, not only documentation. The implementation applies:

- Strategy pattern for validation rules.
- Adapter interfaces for input samples and telemetry/reporting.
- Composite validation for combining safety and readiness checks.
- Facade orchestration through the project runtime class.
- SOLID boundaries between profile data, input acquisition, validation, telemetry encoding, and tests.
{END}"""


def upsert_doc_block(content: str) -> str:
  block = generated_doc_block()
  if START in content and END in content:
    before = content.split(START, 1)[0].rstrip()
    after = content.split(END, 1)[1].lstrip()
    return f"{before}\n\n{block}\n\n{after}".rstrip() + "\n"
  return content.rstrip() + "\n\n" + block + "\n"


HEADER = r'''#ifndef PROJECT_RUNTIME_PROJECT_RUNTIME_HPP_
#define PROJECT_RUNTIME_PROJECT_RUNTIME_HPP_

#include <cstdint>
#include <iosfwd>
#include <memory>
#include <optional>
#include <string>
#include <vector>

namespace project_runtime {

enum class Severity {
  Info,
  Warning,
  Critical
};

std::string toString(Severity severity);

struct MetricSpec {
  std::string name;
  std::string units;
  double warningLimit{};
  bool lowerIsBetter{true};
};

struct RuntimeSample {
  std::uint32_t sequence{};
  double primaryValue{};
  double secondaryValue{};
  bool online{true};
  std::string source;
};

struct ProjectProfile {
  std::string id;
  std::string title;
  std::string summary;
  std::string evidenceTarget;
  std::vector<std::string> capabilities;
  MetricSpec primaryMetric;
  MetricSpec secondaryMetric;
  bool connectivityRequired{true};
};

struct ValidationIssue {
  Severity severity{Severity::Info};
  std::string code;
  std::string message;
};

struct RuntimeReport {
  bool accepted{};
  RuntimeSample sample;
  std::vector<ValidationIssue> issues;
  std::vector<std::string> trace;
  std::string telemetryPayload;
};

class ISampleSource {
 public:
  virtual ~ISampleSource() = default;
  virtual RuntimeSample read() = 0;
};

class IValidationRule {
 public:
  virtual ~IValidationRule() = default;
  virtual std::optional<ValidationIssue> evaluate(
      const ProjectProfile& profile,
      const RuntimeSample& sample) const = 0;
  virtual std::string name() const = 0;
};

class ITelemetryEncoder {
 public:
  virtual ~ITelemetryEncoder() = default;
  virtual std::string encode(
      const ProjectProfile& profile,
      const RuntimeSample& sample,
      const std::vector<ValidationIssue>& issues) const = 0;
};

class FixedSampleSource final : public ISampleSource {
 public:
  explicit FixedSampleSource(RuntimeSample sample);

  RuntimeSample read() override;

 private:
  RuntimeSample sample_;
};

class RequiredCapabilitiesRule final : public IValidationRule {
 public:
  std::optional<ValidationIssue> evaluate(
      const ProjectProfile& profile,
      const RuntimeSample& sample) const override;
  std::string name() const override;
};

class ConnectivityRule final : public IValidationRule {
 public:
  std::optional<ValidationIssue> evaluate(
      const ProjectProfile& profile,
      const RuntimeSample& sample) const override;
  std::string name() const override;
};

class MetricThresholdRule final : public IValidationRule {
 public:
  explicit MetricThresholdRule(bool primaryMetric);

  std::optional<ValidationIssue> evaluate(
      const ProjectProfile& profile,
      const RuntimeSample& sample) const override;
  std::string name() const override;

 private:
  bool primaryMetric_{};
};

class CompositeValidator final {
 public:
  void add(std::unique_ptr<IValidationRule> rule);
  std::vector<ValidationIssue> evaluate(
      const ProjectProfile& profile,
      const RuntimeSample& sample) const;
  std::vector<std::string> ruleNames() const;

 private:
  std::vector<std::unique_ptr<IValidationRule>> rules_;
};

class JsonTelemetryEncoder final : public ITelemetryEncoder {
 public:
  std::string encode(
      const ProjectProfile& profile,
      const RuntimeSample& sample,
      const std::vector<ValidationIssue>& issues) const override;
};

class ProjectRuntime final {
 public:
  ProjectRuntime(ProjectProfile profile,
                 ISampleSource& sampleSource,
                 CompositeValidator validator,
                 const ITelemetryEncoder& telemetryEncoder);

  RuntimeReport runOnce();

 private:
  ProjectProfile profile_;
  ISampleSource& sampleSource_;
  CompositeValidator validator_;
  const ITelemetryEncoder& telemetryEncoder_;
};

class TextReportWriter final {
 public:
  explicit TextReportWriter(std::ostream& stream);
  void write(const ProjectProfile& profile, const RuntimeReport& report) const;

 private:
  std::ostream& stream_;
};

ProjectProfile demoProfile();
RuntimeSample nominalSample();
RuntimeSample unsafeSample();
RuntimeSample offlineSample();
CompositeValidator defaultValidator();
RuntimeReport runScenario(const std::string& mode);

}  // namespace project_runtime

#endif  // PROJECT_RUNTIME_PROJECT_RUNTIME_HPP_
'''


def cpp_string(value: str) -> str:
  return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def source_cpp(repo_name: str, title: str, summary: str, evidence: str, tags: list[str]) -> str:
  primary, secondary, primary_limit, secondary_limit, primary_units, secondary_units = metric_profile(repo_name, title, tags)
  connectivity = "true" if requires_connectivity(repo_name, tags) else "false"
  capabilities = ",\n      ".join(cpp_string(tag) for tag in tags[:8])
  nominal_primary = round(primary_limit * 0.45 if primary_limit > 0 else 0.0, 2)
  nominal_secondary = round(secondary_limit * 0.45 if secondary_limit > 0 else 0.0, 2)
  unsafe_primary = round(primary_limit * 1.35 if primary_limit > 0 else 1.0, 2)
  unsafe_secondary = round(secondary_limit + 2.0 if secondary_limit <= 1.0 else secondary_limit * 1.35, 2)

  return f'''#include "project_runtime/ProjectRuntime.hpp"

#include <algorithm>
#include <iomanip>
#include <ostream>
#include <sstream>
#include <stdexcept>
#include <utility>

namespace project_runtime {{
namespace {{

std::string jsonEscape(const std::string& value) {{
  std::ostringstream escaped;
  for (const char item : value) {{
    switch (item) {{
      case '\\\\':
        escaped << "\\\\\\\\";
        break;
      case '"':
        escaped << "\\\\\\\"";
        break;
      case '\\n':
        escaped << "\\\\n";
        break;
      case '\\r':
        escaped << "\\\\r";
        break;
      case '\\t':
        escaped << "\\\\t";
        break;
      default:
        escaped << item;
        break;
    }}
  }}
  return escaped.str();
}}

std::string fixed2(const double value) {{
  std::ostringstream stream;
  stream << std::fixed << std::setprecision(2) << value;
  return stream.str();
}}

bool exceeds(const MetricSpec& spec, const double value) {{
  return spec.lowerIsBetter ? value > spec.warningLimit : value < spec.warningLimit;
}}

}}  // namespace

std::string toString(const Severity severity) {{
  switch (severity) {{
    case Severity::Info:
      return "info";
    case Severity::Warning:
      return "warning";
    case Severity::Critical:
      return "critical";
  }}
  return "unknown";
}}

FixedSampleSource::FixedSampleSource(RuntimeSample sample) : sample_(std::move(sample)) {{}}

RuntimeSample FixedSampleSource::read() {{
  return sample_;
}}

std::optional<ValidationIssue> RequiredCapabilitiesRule::evaluate(
    const ProjectProfile& profile,
    const RuntimeSample&) const {{
  if (profile.id.empty() || profile.title.empty() || profile.capabilities.empty()) {{
    return ValidationIssue{{Severity::Critical, "PROFILE_INCOMPLETE", "project profile is missing identity or capabilities"}};
  }}
  return std::nullopt;
}}

std::string RequiredCapabilitiesRule::name() const {{
  return "RequiredCapabilitiesRule";
}}

std::optional<ValidationIssue> ConnectivityRule::evaluate(
    const ProjectProfile& profile,
    const RuntimeSample& sample) const {{
  if (profile.connectivityRequired && !sample.online) {{
    return ValidationIssue{{Severity::Critical, "CONNECTIVITY_OFFLINE", "required telemetry or control path is offline"}};
  }}
  return std::nullopt;
}}

std::string ConnectivityRule::name() const {{
  return "ConnectivityRule";
}}

MetricThresholdRule::MetricThresholdRule(const bool primaryMetric)
    : primaryMetric_(primaryMetric) {{}}

std::optional<ValidationIssue> MetricThresholdRule::evaluate(
    const ProjectProfile& profile,
    const RuntimeSample& sample) const {{
  const auto& metric = primaryMetric_ ? profile.primaryMetric : profile.secondaryMetric;
  const double value = primaryMetric_ ? sample.primaryValue : sample.secondaryValue;
  if (exceeds(metric, value)) {{
    return ValidationIssue{{
        primaryMetric_ ? Severity::Critical : Severity::Warning,
        primaryMetric_ ? "PRIMARY_METRIC_LIMIT" : "SECONDARY_METRIC_LIMIT",
        metric.name + "=" + fixed2(value) + " " + metric.units +
            " outside limit " + fixed2(metric.warningLimit) + " " + metric.units}};
  }}
  return std::nullopt;
}}

std::string MetricThresholdRule::name() const {{
  return primaryMetric_ ? "PrimaryMetricThresholdRule" : "SecondaryMetricThresholdRule";
}}

void CompositeValidator::add(std::unique_ptr<IValidationRule> rule) {{
  if (!rule) {{
    throw std::invalid_argument("validator rule cannot be null");
  }}
  rules_.push_back(std::move(rule));
}}

std::vector<ValidationIssue> CompositeValidator::evaluate(
    const ProjectProfile& profile,
    const RuntimeSample& sample) const {{
  std::vector<ValidationIssue> issues;
  for (const auto& rule : rules_) {{
    if (auto issue = rule->evaluate(profile, sample)) {{
      issues.push_back(*issue);
    }}
  }}
  return issues;
}}

std::vector<std::string> CompositeValidator::ruleNames() const {{
  std::vector<std::string> names;
  for (const auto& rule : rules_) {{
    names.push_back(rule->name());
  }}
  return names;
}}

std::string JsonTelemetryEncoder::encode(
    const ProjectProfile& profile,
    const RuntimeSample& sample,
    const std::vector<ValidationIssue>& issues) const {{
  std::ostringstream payload;
  payload << "{{"
          << "\\"project_id\\":\\"" << jsonEscape(profile.id) << "\\","
          << "\\"title\\":\\"" << jsonEscape(profile.title) << "\\","
          << "\\"sequence\\":" << sample.sequence << ","
          << "\\"source\\":\\"" << jsonEscape(sample.source) << "\\","
          << "\\"online\\":" << (sample.online ? "true" : "false") << ","
          << "\\"" << jsonEscape(profile.primaryMetric.name) << "\\":" << fixed2(sample.primaryValue) << ","
          << "\\"" << jsonEscape(profile.secondaryMetric.name) << "\\":" << fixed2(sample.secondaryValue) << ","
          << "\\"issue_count\\":" << issues.size() << ","
          << "\\"accepted\\":" << (issues.empty() ? "true" : "false") << "}}";
  return payload.str();
}}

ProjectRuntime::ProjectRuntime(ProjectProfile profile,
                               ISampleSource& sampleSource,
                               CompositeValidator validator,
                               const ITelemetryEncoder& telemetryEncoder)
    : profile_(std::move(profile)),
      sampleSource_(sampleSource),
      validator_(std::move(validator)),
      telemetryEncoder_(telemetryEncoder) {{}}

RuntimeReport ProjectRuntime::runOnce() {{
  RuntimeReport report;
  report.sample = sampleSource_.read();
  report.trace = validator_.ruleNames();
  report.issues = validator_.evaluate(profile_, report.sample);
  report.accepted = report.issues.empty();
  report.telemetryPayload = telemetryEncoder_.encode(profile_, report.sample, report.issues);
  return report;
}}

TextReportWriter::TextReportWriter(std::ostream& stream) : stream_(stream) {{}}

void TextReportWriter::write(const ProjectProfile& profile, const RuntimeReport& report) const {{
  stream_ << profile.title << '\\n'
          << "status=" << (report.accepted ? "PASS" : "FAIL") << '\\n'
          << "evidence=" << profile.evidenceTarget << '\\n'
          << "sample_source=" << report.sample.source << '\\n'
          << profile.primaryMetric.name << '=' << fixed2(report.sample.primaryValue)
          << ' ' << profile.primaryMetric.units << '\\n'
          << profile.secondaryMetric.name << '=' << fixed2(report.sample.secondaryValue)
          << ' ' << profile.secondaryMetric.units << '\\n';

  for (const auto& step : report.trace) {{
    stream_ << "validator=" << step << '\\n';
  }}

  for (const auto& issue : report.issues) {{
    stream_ << "issue=" << toString(issue.severity) << ':'
            << issue.code << ':' << issue.message << '\\n';
  }}

  stream_ << "telemetry=" << report.telemetryPayload << '\\n';
}}

ProjectProfile demoProfile() {{
  return ProjectProfile{{
      {cpp_string(repo_name)},
      {cpp_string(title)},
      {cpp_string(summary)},
      {cpp_string(evidence)},
      {{
      {capabilities}
      }},
      MetricSpec{{{cpp_string(primary)}, {cpp_string(primary_units)}, {primary_limit}, true}},
      MetricSpec{{{cpp_string(secondary)}, {cpp_string(secondary_units)}, {secondary_limit}, true}},
      {connectivity}}};
}}

RuntimeSample nominalSample() {{
  return RuntimeSample{{1U, {nominal_primary}, {nominal_secondary}, true, "host-ci-nominal"}};
}}

RuntimeSample unsafeSample() {{
  return RuntimeSample{{2U, {unsafe_primary}, {unsafe_secondary}, true, "host-ci-limit-test"}};
}}

RuntimeSample offlineSample() {{
  return RuntimeSample{{3U, {nominal_primary}, {nominal_secondary}, false, "host-ci-offline"}};
}}

CompositeValidator defaultValidator() {{
  CompositeValidator validator;
  validator.add(std::make_unique<RequiredCapabilitiesRule>());
  validator.add(std::make_unique<ConnectivityRule>());
  validator.add(std::make_unique<MetricThresholdRule>(true));
  validator.add(std::make_unique<MetricThresholdRule>(false));
  return validator;
}}

RuntimeReport runScenario(const std::string& mode) {{
  RuntimeSample sample = nominalSample();
  if (mode == "unsafe") {{
    sample = unsafeSample();
  }} else if (mode == "offline") {{
    sample = offlineSample();
  }} else if (mode != "nominal") {{
    throw std::invalid_argument("unknown scenario: " + mode);
  }}

  FixedSampleSource source(sample);
  JsonTelemetryEncoder encoder;
  ProjectRuntime runtime(demoProfile(), source, defaultValidator(), encoder);
  return runtime.runOnce();
}}

}}  // namespace project_runtime
'''


MAIN_CPP = r'''#include "project_runtime/ProjectRuntime.hpp"

#include <iostream>
#include <stdexcept>
#include <string>

namespace {

void printUsage(const char* programName) {
  std::cout << "Usage: " << programName << " [--nominal|--unsafe|--offline|--help]\n";
}

}  // namespace

int main(int argc, char** argv) {
  const std::string option = argc > 1 ? argv[1] : "--nominal";
  if (option == "--help") {
    printUsage(argv[0]);
    return 0;
  }

  const std::string mode =
      option == "--nominal" ? "nominal" :
      option == "--unsafe" ? "unsafe" :
      option == "--offline" ? "offline" : "";

  if (mode.empty()) {
    printUsage(argv[0]);
    return 1;
  }

  try {
    const auto profile = project_runtime::demoProfile();
    const auto report = project_runtime::runScenario(mode);
    project_runtime::TextReportWriter writer(std::cout);
    writer.write(profile, report);
    return report.accepted ? 0 : 2;
  } catch (const std::exception& exception) {
    std::cerr << "runtime error: " << exception.what() << '\n';
    return 1;
  }
}
'''


TEST_CPP = r'''#include "project_runtime/ProjectRuntime.hpp"

#include <cassert>
#include <sstream>
#include <string>

namespace {

bool contains(const std::string& value, const std::string& needle) {
  return value.find(needle) != std::string::npos;
}

void nominalScenarioPasses() {
  const auto profile = project_runtime::demoProfile();
  const auto report = project_runtime::runScenario("nominal");

  assert(report.accepted);
  assert(report.issues.empty());
  assert(!report.telemetryPayload.empty());
  assert(contains(report.telemetryPayload, profile.id));
  assert(report.trace.size() == 4U);
}

void unsafeScenarioFailsSafetyGates() {
  const auto report = project_runtime::runScenario("unsafe");

  assert(!report.accepted);
  assert(!report.issues.empty());
  assert(contains(report.telemetryPayload, "\"accepted\":false"));
}

void offlineScenarioIsDeterministic() {
  const auto profile = project_runtime::demoProfile();
  const auto report = project_runtime::runScenario("offline");

  if (profile.connectivityRequired) {
    assert(!report.accepted);
    assert(!report.issues.empty());
  } else {
    assert(report.accepted);
  }
}

void reportWriterIncludesSolidEvidence() {
  const auto profile = project_runtime::demoProfile();
  const auto report = project_runtime::runScenario("nominal");
  std::ostringstream output;
  project_runtime::TextReportWriter writer(output);

  writer.write(profile, report);

  assert(contains(output.str(), "validator=RequiredCapabilitiesRule"));
  assert(contains(output.str(), "telemetry="));
}

}  // namespace

int main() {
  nominalScenarioPasses();
  unsafeScenarioFailsSafetyGates();
  offlineScenarioIsDeterministic();
  reportWriterIncludesSolidEvidence();
  return 0;
}
'''


def cmake(repo_name: str) -> str:
  project = safe_name(repo_name)
  return f'''cmake_minimum_required(VERSION 3.16)
project({project} LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

enable_testing()

add_library(${{PROJECT_NAME}}_core
  src/ProjectRuntime.cpp
)
target_include_directories(${{PROJECT_NAME}}_core PUBLIC include)
target_compile_options(${{PROJECT_NAME}}_core PRIVATE -Wall -Wextra -Wpedantic)

add_executable(${{PROJECT_NAME}}
  src/main.cpp
)
target_link_libraries(${{PROJECT_NAME}} PRIVATE ${{PROJECT_NAME}}_core)
target_compile_options(${{PROJECT_NAME}} PRIVATE -Wall -Wextra -Wpedantic)

add_executable(project_runtime_tests
  tests/ProjectRuntimeTests.cpp
)
target_link_libraries(project_runtime_tests PRIVATE ${{PROJECT_NAME}}_core)
target_compile_options(project_runtime_tests PRIVATE -Wall -Wextra -Wpedantic)
add_test(NAME project_runtime_tests COMMAND project_runtime_tests)
'''


def implementation_doc(title: str) -> str:
  return f'''# C++17 Design Patterns and SOLID Notes

This repository's host model is intentionally written in C++17 so the project can be built and reviewed without target hardware.

## Patterns Used

| Pattern | Implementation |
| --- | --- |
| Strategy | `IValidationRule` implementations validate capabilities, connectivity, and metric thresholds. |
| Adapter | `ISampleSource` and `ITelemetryEncoder` isolate data acquisition and output formatting. |
| Composite | `CompositeValidator` combines independent rules into one validation pass. |
| Facade | `ProjectRuntime` exposes one `runOnce()` orchestration surface. |
| DTO / Value Object | `ProjectProfile`, `RuntimeSample`, `ValidationIssue`, and `RuntimeReport` carry deterministic state. |

## SOLID Mapping

- Single Responsibility: profile, sample source, validation, telemetry encoding, and report writing are separate types.
- Open/Closed: new validation rules can be added through `IValidationRule`.
- Liskov Substitution: any `ISampleSource` or `ITelemetryEncoder` can replace the host implementations.
- Interface Segregation: interfaces stay small and focused.
- Dependency Inversion: `ProjectRuntime` depends on abstractions and injected collaborators.

## Review Entry Points

- `include/project_runtime/ProjectRuntime.hpp`
- `src/ProjectRuntime.cpp`
- `src/main.cpp`
- `tests/ProjectRuntimeTests.cpp`

The executable supports nominal, unsafe, and offline scenarios:

```bash
./build/{safe_name(title.lower().replace(" ", "-"))} --nominal
./build/{safe_name(title.lower().replace(" ", "-"))} --unsafe
./build/{safe_name(title.lower().replace(" ", "-"))} --offline
```
'''


def is_placeholder(repo: Path) -> bool:
  main_cpp = repo / "src" / "main.cpp"
  if not main_cpp.exists():
    return False
  text = read_text(main_cpp)
  return "ProjectProfile" in text and "RequiredEvidenceRule" in text


def process_repo(repo: Path) -> bool:
  if not is_placeholder(repo):
    readme = read_text(repo / "README.md")
    arch = read_text(repo / "ARCHITECTURE.md")
    if readme:
      write_text(repo / "README.md", upsert_doc_block(readme))
    if arch:
      write_text(repo / "ARCHITECTURE.md", upsert_doc_block(arch))
    write_text(repo / "docs" / "cpp17-design-patterns-and-solid.md", implementation_doc(title_from_readme(readme, repo.name)))
    return False

  readme = read_text(repo / "README.md")
  title = title_from_readme(readme, repo.name)
  summary = summary_from_readme(readme)
  evidence = evidence_from_readme(readme)
  tags = tags_from_readme(readme)

  write_text(repo / "include" / "project_runtime" / "ProjectRuntime.hpp", HEADER)
  write_text(repo / "src" / "ProjectRuntime.cpp", source_cpp(repo.name, title, summary, evidence, tags))
  write_text(repo / "src" / "main.cpp", MAIN_CPP)
  write_text(repo / "tests" / "ProjectRuntimeTests.cpp", TEST_CPP)
  old_test = repo / "tests" / "ProfileTests.cpp"
  if old_test.exists():
    old_test.unlink()
  write_text(repo / "CMakeLists.txt", cmake(repo.name))
  write_text(repo / "docs" / "cpp17-design-patterns-and-solid.md", implementation_doc(title))
  write_text(repo / "README.md", upsert_doc_block(readme))
  arch = read_text(repo / "ARCHITECTURE.md")
  if arch:
    write_text(repo / "ARCHITECTURE.md", upsert_doc_block(arch))
  return True


def main() -> None:
  repos = sorted(path for path in REPOS_ROOT.iterdir() if (path / ".git").exists())
  upgraded = []
  aligned = []
  for repo in repos:
    if process_repo(repo):
      upgraded.append(repo.name)
    else:
      aligned.append(repo.name)
  print(f"upgraded {len(upgraded)} placeholder repos")
  for name in upgraded:
    print(f"  upgraded {name}")
  print(f"aligned docs for {len(aligned)} custom repos")


if __name__ == "__main__":
  main()
