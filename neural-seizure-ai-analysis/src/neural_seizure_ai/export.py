from __future__ import annotations

from pathlib import Path

from .distillation import DistillationReport


def export_student_to_c(report: DistillationReport, output_dir: Path, symbol_prefix: str = "neural_seizure") -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    header_path = output_dir / "distilled_student.h"
    source_path = output_dir / "distilled_student.c"
    count = len(report.weights)
    guard = "NEURAL_SEIZURE_DISTILLED_STUDENT_H"
    header_path.write_text(
        f"""#ifndef {guard}
#define {guard}

#include <stddef.h>

#define {symbol_prefix.upper()}_FEATURE_COUNT {count}

float {symbol_prefix}_predict_preictal_probability(const float features[{symbol_prefix.upper()}_FEATURE_COUNT]);
int {symbol_prefix}_predict_preictal(const float features[{symbol_prefix.upper()}_FEATURE_COUNT]);

#endif
""",
        encoding="utf-8",
    )
    weights = ", ".join(f"{weight:.9f}f" for weight in report.weights)
    source_path.write_text(
        f"""#include "distilled_student.h"

#include <math.h>

static const float kWeights[{count}] = {{{weights}}};
static const float kBias = {report.bias:.9f}f;
static const float kThreshold = {report.decision_threshold:.9f}f;

float {symbol_prefix}_predict_preictal_probability(const float features[{symbol_prefix.upper()}_FEATURE_COUNT]) {{
    float logit = kBias;
    for (size_t index = 0; index < {symbol_prefix.upper()}_FEATURE_COUNT; ++index) {{
        logit += kWeights[index] * features[index];
    }}
    if (logit > 60.0f) {{
        return 1.0f;
    }}
    if (logit < -60.0f) {{
        return 0.0f;
    }}
    return 1.0f / (1.0f + expf(-logit));
}}

int {symbol_prefix}_predict_preictal(const float features[{symbol_prefix.upper()}_FEATURE_COUNT]) {{
    return {symbol_prefix}_predict_preictal_probability(features) >= kThreshold;
}}
""",
        encoding="utf-8",
    )
    return [header_path, source_path]

