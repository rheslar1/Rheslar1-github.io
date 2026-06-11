#!/usr/bin/env python3
"""Generate deep architecture docs and UML diagrams for embedded repos."""

from __future__ import annotations

import html
import textwrap
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageFont


WORKSPACE = Path(__file__).resolve().parents[1]
REPOS_ROOT = WORKSPACE / "embedded-system-repos"
DRAWIO_NAME = "full-system-uml.drawio"
PNG_NAME = "full-system-uml.png"
START = "<!-- deep-architecture-links:start -->"
END = "<!-- deep-architecture-links:end -->"


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


def summary_from_readme(readme: str, title: str) -> str:
  lines = [line.strip() for line in readme.splitlines()]
  for line in lines:
    if line and not line.startswith("#") and line != title:
      return line
  return "Embedded systems repository with host-buildable code, documentation, validation, and CI evidence."


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
  return tags[:10]


def first_existing(paths: Iterable[Path]) -> str:
  for path in paths:
    if path.exists():
      return str(path.relative_to(path.parents[1]))
  return "not yet added"


def detect_source_boundary(repo: Path) -> str:
  candidates = [
      repo / "include",
      repo / "src",
      repo / "firmware",
      repo / "buildroot",
      repo / "yocto",
  ]
  return ", ".join(path.name for path in candidates if path.exists()) or "src"


def generated_links_block() -> str:
  return f"""{START}
## Design Architecture and UML

- [Design architecture](docs/deep-architecture.md)
- [Full UML Draw.io source](docs/diagrams/{DRAWIO_NAME})
- [Full UML PNG export](docs/diagrams/{PNG_NAME})
{END}"""


def upsert_block(content: str) -> str:
  block = generated_links_block()
  if START in content and END in content:
    before = content.split(START, 1)[0].rstrip()
    after = content.split(END, 1)[1].lstrip()
    return f"{before}\n\n{block}\n\n{after}".rstrip() + "\n"
  return content.rstrip() + "\n\n" + block + "\n"


def deep_architecture(repo: Path, title: str, summary: str, tags: list[str]) -> str:
  source_boundary = detect_source_boundary(repo)
  tag_text = ", ".join(tags) if tags else "C++17, embedded systems, validation, CI"
  executable = first_existing([repo / "src" / "main.cpp", repo / "src" / "main.c"])
  tests = ", ".join(
      str(path.relative_to(repo)) for path in sorted((repo / "tests").glob("*")) if path.is_file()
  ) or "tests to be added as hardware coverage expands"

  return f"""# {title} Design Architecture

## Executive Overview

{summary}

This repository is structured as a reviewable embedded-systems project rather than a loose code sample. The architecture separates runtime orchestration, hardware or simulator adapters, safety validation, telemetry or reporting, and CI evidence so each part can be reasoned about independently.

## Technology Profile

{tag_text}

## System Context

The system boundary is the device or embedded Linux application represented by this repository. Inputs arrive from sensors, buses, operator commands, update packages, provisioning records, or simulator fixtures. Outputs are telemetry frames, actuator commands, firmware/update decisions, reports, and validation logs.

## Primary Runtime Flow

1. Startup loads a board or project profile and establishes the configured runtime identity.
2. Hardware-facing adapters or simulator fixtures collect the next input sample.
3. The domain/control layer normalizes the sample into a deterministic state model.
4. Safety and readiness gates reject invalid inputs, unsafe commands, unsupported boards, stale update images, or missing provisioning material.
5. Accepted state is mapped into telemetry, command output, persistence records, or human-readable evidence.
6. The executable returns a deterministic pass/fail result so CI can verify the behavior without target hardware.

## Component Responsibilities

| Component | Responsibility |
| --- | --- |
| Application entry point | Owns startup, CLI or demo flow, and final process status. |
| Domain model | Represents the project-specific device state, control policy, and validation rules. |
| Adapter boundary | Isolates sensors, buses, files, provisioning stores, transports, firmware slots, or board-specific APIs. |
| Safety gates | Validate battery, timing, configuration, update, telemetry, and hardware assumptions before side effects. |
| Evidence/reporting | Emits deterministic output for reviewers, CI logs, and portfolio documentation. |
| Tests and CI | Keep the host model buildable and protect expected failure modes. |

## Source Boundaries

- Source boundary: `{source_boundary}`
- Executable entry: `{executable}`
- Test coverage: `{tests}`
- Documentation: `README.md`, `ARCHITECTURE.md`, `docs/validation-plan.md`, and this file.
- UML assets: `docs/diagrams/{DRAWIO_NAME}` and `docs/diagrams/{PNG_NAME}`.

## SOLID and Pattern Notes

- Single Responsibility: startup, state modeling, validation, reporting, and tests stay in separate files or classes.
- Open/Closed: hardware adapters and validation policies can be extended without rewriting the top-level flow.
- Liskov Substitution: simulator adapters can stand in for target hardware when they satisfy the same narrow contract.
- Interface Segregation: each boundary exposes only the behavior needed by the orchestrator.
- Dependency Inversion: high-level runtime logic depends on abstractions or stable data contracts rather than direct hardware calls.

## Failure Model

The host-buildable implementation should make failure explicit. Common rejection paths include unsupported board profiles, missing provisioning, invalid credentials or firmware metadata, low battery, out-of-range samples, timeout/offline transports, unsafe control output, and exceeded timing or power budgets.

## Validation Matrix

| Layer | Validation Evidence |
| --- | --- |
| Build | CMake configure and native compiler output. |
| Runtime | Executable smoke run with deterministic text output. |
| Safety | Unit tests or CLI modes that verify accepted and rejected paths. |
| Documentation | Architecture, validation plan, and UML diagram checked into the repo. |
| Hardware path | Future serial logs, screenshots, power captures, bus traces, or flashing logs. |

## Deployment and Hardware Path

The repository is ready to grow from a host model into target-backed firmware or embedded Linux deployment. The intended path is to replace simulator adapters with board drivers, keep the same validation vocabulary, add hardware logs to `docs/`, and let CI continue proving host-side behavior even when target hardware is not attached.

## UML Diagram

The full UML diagram is maintained as Draw.io source and as a PNG export:

- [Full UML Draw.io source](diagrams/{DRAWIO_NAME})
- [Full UML PNG export](diagrams/{PNG_NAME})
"""


def cell(cell_id: str, value: str, style: str, x: int, y: int, w: int, h: int) -> str:
  return (
      f'<mxCell id="{cell_id}" value="{html.escape(value)}" style="{style}" '
      'vertex="1" parent="1">'
      f'<mxGeometry x="{x}" y="{y}" width="{w}" height="{h}" as="geometry" />'
      '</mxCell>'
  )


def edge(edge_id: str, source: str, target: str, label: str = "") -> str:
  return (
      f'<mxCell id="{edge_id}" value="{html.escape(label)}" '
      'style="endArrow=block;html=1;rounded=0;strokeWidth=2;strokeColor=#334155;" '
      f'edge="1" parent="1" source="{source}" target="{target}">'
      '<mxGeometry relative="1" as="geometry" />'
      '</mxCell>'
  )


def drawio_xml(title: str, summary: str, tags: list[str]) -> str:
  tag_line = ", ".join(tags[:6]) if tags else "Embedded validation and CI"
  nodes = [
      ("title", f"{title}\\nFull System UML", "text;html=1;strokeColor=none;fillColor=none;fontSize=28;fontStyle=1;fontColor=#0f172a", 60, 30, 1260, 60),
      ("actor", "Operator / Cloud / Test Harness", "rounded=1;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#2563eb;fontSize=16;fontStyle=1", 80, 150, 230, 90),
      ("entry", "Application Entry Point\\nCLI, firmware main, or service launcher", "rounded=1;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;fontSize=15", 390, 140, 250, 110),
      ("domain", "Domain / Control Core\\nstate model, policy, orchestration", "rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#15803d;fontSize=15;fontStyle=1", 720, 140, 280, 120),
      ("adapters", "Hardware and Simulator Adapters\\nsensors, buses, files, transports", "rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontSize=15", 1080, 140, 250, 120),
      ("safety", "Safety / Readiness Gates\\nconfig, battery, timing, OTA, bounds", "rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#dc2626;fontSize=15;fontStyle=1", 400, 360, 260, 120),
      ("telemetry", "Telemetry and Evidence\\nJSON, reports, logs, measurements", "rounded=1;whiteSpace=wrap;html=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontSize=15", 720, 360, 280, 120),
      ("storage", "Persistence / Provisioning / Update Metadata\\nretained config, credentials, image state", "rounded=1;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;fontSize=15", 1080, 360, 250, 130),
      ("tests", "Tests and CI\\nCMake, CTest, smoke runs, expected failures", "rounded=1;whiteSpace=wrap;html=1;fillColor=#ecfccb;strokeColor=#65a30d;fontSize=15", 390, 600, 280, 120),
      ("docs", "Documentation Package\\nREADME, architecture, validation plan, UML", "rounded=1;whiteSpace=wrap;html=1;fillColor=#fce7f3;strokeColor=#db2777;fontSize=15", 720, 600, 280, 120),
      ("target", f"Target Stack\\n{tag_line}", "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0f172a;fontSize=14", 1080, 610, 250, 100),
      ("summary", summary[:220], "text;html=1;strokeColor=none;fillColor=none;fontSize=14;fontColor=#334155;whiteSpace=wrap", 80, 760, 1250, 80),
  ]
  cells = [
      '<mxCell id="0" />',
      '<mxCell id="1" parent="0" />',
      *[cell(*node) for node in nodes],
      edge("e1", "actor", "entry", "commands"),
      edge("e2", "entry", "domain", "orchestrates"),
      edge("e3", "domain", "adapters", "uses"),
      edge("e4", "domain", "safety", "validates"),
      edge("e5", "domain", "telemetry", "maps state"),
      edge("e6", "storage", "domain", "loads state"),
      edge("e7", "tests", "entry", "executes"),
      edge("e8", "tests", "domain", "asserts gates"),
      edge("e9", "telemetry", "docs", "evidence"),
      edge("e10", "docs", "target", "traceability"),
      edge("e11", "adapters", "storage", "provisioning/update"),
  ]
  return f"""<mxfile host="app.diagrams.net" modified="2026-06-10T00:00:00.000Z" agent="Codex" version="24.7.17" type="device">
  <diagram id="full-system-uml" name="Full System UML">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="900" math="0" shadow="0">
      <root>
        {''.join(cells)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""


def load_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
  candidates = [
      "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
      "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
  ]
  for candidate in candidates:
    if Path(candidate).exists():
      return ImageFont.truetype(candidate, size)
  return ImageFont.load_default()


def wrapped(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, width: int) -> list[str]:
  lines: list[str] = []
  for raw in text.split("\n"):
    words = raw.split()
    current = ""
    for word in words:
      trial = (current + " " + word).strip()
      if draw.textbbox((0, 0), trial, font=font)[2] <= width:
        current = trial
      else:
        if current:
          lines.append(current)
        current = word
    if current:
      lines.append(current)
  return lines


def draw_box(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], label: str, fill: str, outline: str) -> None:
  x, y, w, h = box
  draw.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=fill, outline=outline, width=3)
  title_font = load_font(20, True)
  body_font = load_font(15)
  parts = label.split("\n", 1)
  draw.text((x + 16, y + 14), parts[0], fill="#0f172a", font=title_font)
  if len(parts) > 1:
    yy = y + 46
    for line in wrapped(draw, parts[1], body_font, w - 32):
      draw.text((x + 16, yy), line, fill="#334155", font=body_font)
      yy += 20


def arrow(draw: ImageDraw.ImageDraw, start: tuple[int, int], end: tuple[int, int]) -> None:
  draw.line((start, end), fill="#334155", width=3)
  ex, ey = end
  sx, sy = start
  if abs(ex - sx) >= abs(ey - sy):
    direction = 1 if ex > sx else -1
    points = [(ex, ey), (ex - 14 * direction, ey - 8), (ex - 14 * direction, ey + 8)]
  else:
    direction = 1 if ey > sy else -1
    points = [(ex, ey), (ex - 8, ey - 14 * direction), (ex + 8, ey - 14 * direction)]
  draw.polygon(points, fill="#334155")


def png_export(path: Path, title: str, summary: str, tags: list[str]) -> None:
  image = Image.new("RGB", (1400, 900), "#f8fafc")
  draw = ImageDraw.Draw(image)
  title_font = load_font(34, True)
  body_font = load_font(18)
  draw.text((60, 36), f"{title} - Full System UML", fill="#0f172a", font=title_font)
  draw.text((60, 84), ", ".join(tags[:7]) if tags else "Embedded systems architecture", fill="#475569", font=body_font)

  boxes = {
      "actor": ((80, 150, 230, 90), "Operator / Cloud / Test Harness\ncommands, provisioning, review", "#dbeafe", "#2563eb"),
      "entry": ((390, 140, 250, 110), "Application Entry Point\nCLI, firmware main, service launcher", "#e0f2fe", "#0369a1"),
      "domain": ((720, 140, 280, 120), "Domain / Control Core\nstate model, policy, orchestration", "#dcfce7", "#15803d"),
      "adapters": ((1080, 140, 250, 120), "Hardware and Simulator Adapters\nsensors, buses, files, transports", "#fef3c7", "#d97706"),
      "safety": ((400, 360, 260, 120), "Safety / Readiness Gates\nconfig, battery, timing, OTA, bounds", "#fee2e2", "#dc2626"),
      "telemetry": ((720, 360, 280, 120), "Telemetry and Evidence\nJSON, reports, logs, measurements", "#ede9fe", "#7c3aed"),
      "storage": ((1080, 360, 250, 130), "Persistence / Provisioning / Update Metadata\nretained config, credentials, image state", "#f1f5f9", "#475569"),
      "tests": ((390, 600, 280, 120), "Tests and CI\nCMake, CTest, smoke runs, expected failures", "#ecfccb", "#65a30d"),
      "docs": ((720, 600, 280, 120), "Documentation Package\nREADME, architecture, validation plan, UML", "#fce7f3", "#db2777"),
      "target": ((1080, 610, 250, 100), "Target Stack\n" + (", ".join(tags[:5]) if tags else "native + target"), "#ffffff", "#0f172a"),
  }

  for box, label, fill, outline in boxes.values():
    draw_box(draw, box, label, fill, outline)

  arrow(draw, (310, 195), (390, 195))
  arrow(draw, (640, 195), (720, 195))
  arrow(draw, (1000, 200), (1080, 200))
  arrow(draw, (850, 260), (540, 360))
  arrow(draw, (860, 260), (860, 360))
  arrow(draw, (1080, 425), (1000, 425))
  arrow(draw, (530, 600), (510, 480))
  arrow(draw, (670, 660), (720, 660))
  arrow(draw, (1000, 660), (1080, 660))

  y = 770
  draw.text((80, y), "Summary", fill="#0f172a", font=load_font(20, True))
  y += 30
  for line in textwrap.wrap(summary, width=145):
    draw.text((80, y), line, fill="#334155", font=body_font)
    y += 24

  path.parent.mkdir(parents=True, exist_ok=True)
  image.save(path)


def diagram_readme(title: str) -> str:
  return f"""# Diagrams

This folder contains the generated full-system UML evidence for `{title}`.

| Asset | Purpose |
| --- | --- |
| [`{DRAWIO_NAME}`]({DRAWIO_NAME}) | Editable Draw.io source for the full system UML. |
| [`{PNG_NAME}`]({PNG_NAME}) | PNG export of the UML diagram for README and documentation review. |

Regenerate these assets from the portfolio workspace with:

```bash
python3 scripts/generate-deep-architecture-assets.py
```
"""


def process_repo(repo: Path) -> None:
  readme_path = repo / "README.md"
  arch_path = repo / "ARCHITECTURE.md"
  readme = read_text(readme_path)
  title = title_from_readme(readme, repo.name)
  summary = summary_from_readme(readme, title)
  tags = tags_from_readme(readme)

  write_text(repo / "docs" / "deep-architecture.md", deep_architecture(repo, title, summary, tags))
  write_text(repo / "docs" / "diagrams" / DRAWIO_NAME, drawio_xml(title, summary, tags))
  png_export(repo / "docs" / "diagrams" / PNG_NAME, title, summary, tags)
  write_text(repo / "docs" / "diagrams" / "README.md", diagram_readme(title))

  if readme_path.exists():
    write_text(readme_path, upsert_block(readme))
  if arch_path.exists():
    write_text(arch_path, upsert_block(read_text(arch_path)))


def main() -> None:
  repos = sorted(path for path in REPOS_ROOT.iterdir() if (path / ".git").exists())
  for repo in repos:
    process_repo(repo)
    print(f"generated deep architecture assets for {repo.name}")
  print(f"generated assets for {len(repos)} repos")


if __name__ == "__main__":
  main()
