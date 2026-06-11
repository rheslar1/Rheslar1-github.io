from __future__ import annotations

from dataclasses import asdict, dataclass


IEEE_11031450_SOURCE = "https://ieeexplore.ieee.org/document/11031450/"
IEEE_11031450_LOCAL_SOURCE = "A_Comprehensive_Review_of_EEG-Based_Seizure_Detection_Techniques.pdf"
IEEE_11031450_METADATA = (
    "A Comprehensive Review of EEG-Based Seizure Detection Techniques, "
    "IEEE Access 2025, DOI 10.1109/ACCESS.2025.3578991"
)
FUTURE_UPGRADE_PATH = (
    "Replace synthetic data with approved public datasets.",
    "Add PyTorch dataset and dataloader boundaries.",
    "Train CNN/LSTM/transformer/GNN baselines against the same WindowFeatures contract or raw windows.",
    "Export a trained student to ONNX or C for embedded inference.",
    "Add calibration, uncertainty, and patient-specific thresholding.",
)


@dataclass(frozen=True)
class PaperImplementationMapping:
    strategy: str
    rationale: str
    code_modules: tuple[str, ...]
    evidence_artifacts: tuple[str, ...]
    verification: tuple[str, ...]
    safety_boundary: str

    def to_dict(self) -> dict[str, object]:
        return asdict(self)


def build_ieee_11031450_traceability() -> list[PaperImplementationMapping]:
    return [
        PaperImplementationMapping(
            strategy="High-bandwidth EEG/ECoG/iEEG sensing",
            rationale="Represent multiple neural acquisition profiles with different sampling rates, channels, noise, and HFO visibility.",
            code_modules=("config.py", "signals.py"),
            evidence_artifacts=("synthetic-neural-ekg-traces.png", "window-features.csv"),
            verification=("test_synthetic_generator_produces_expected_labels",),
            safety_boundary="Synthetic signals only; no patient recordings are committed.",
        ),
        PaperImplementationMapping(
            strategy="Preprocessing and labeled windowing",
            rationale="Normalize high-rate multichannel signals into repeatable windows before model scoring.",
            code_modules=("preprocessing.py", "pipeline.py"),
            evidence_artifacts=("window-features.csv", "demo-report.json"),
            verification=("test_feature_extractor_exposes_paper_backed_biomarkers",),
            safety_boundary="Window labels are simulation labels, not clinician-adjudicated seizure labels.",
        ),
        PaperImplementationMapping(
            strategy="Time-frequency biomarkers",
            rationale="Expose bandpower, HFO ratios, line length, and PAC-style markers used by seizure detection literature.",
            code_modules=("features.py", "plots.py"),
            evidence_artifacts=("feature-trajectories.png", "biomarker-feature-curves.png", "window-features.csv"),
            verification=("test_feature_extractor_exposes_paper_backed_biomarkers",),
            safety_boundary="Biomarkers support engineering review and cannot diagnose seizures.",
        ),
        PaperImplementationMapping(
            strategy="Wavelet and nonlinear complexity biomarkers",
            rationale="Add Haar detail energy, wavelet entropy, sample entropy, Katz FD, and Higuchi FD as review-backed signal descriptors.",
            code_modules=("features.py", "models.py"),
            evidence_artifacts=("algorithm-coverage-map.png", "window-features.csv"),
            verification=("test_feature_extractor_exposes_paper_backed_biomarkers", "test_demo_runs_teacher_student_edge_budget_and_safety_case"),
            safety_boundary="Complexity scores are synthetic features until validated on approved datasets.",
        ),
        PaperImplementationMapping(
            strategy="Image-style EEG representation",
            rationale="Build dependency-free time-frequency and connectivity matrices that can feed CNN/pretrained-model design reviews.",
            code_modules=("representations.py", "plots.py"),
            evidence_artifacts=("time-frequency-image-map.png",),
            verification=("test_evidence_outputs_include_plots_c_export_and_timing",),
            safety_boundary="Generated images are synthetic feature maps, not diagnostic medical images.",
        ),
        PaperImplementationMapping(
            strategy="CNN, LSTM, transformer, and GNN model-family comparison",
            rationale="Use interpretable teacher heuristics as stand-ins for deep model families without overclaiming trained clinical performance.",
            code_modules=("models.py", "pipeline.py"),
            evidence_artifacts=("demo-report.json", "algorithm-coverage-map.png"),
            verification=("test_demo_runs_teacher_student_edge_budget_and_safety_case",),
            safety_boundary="Teacher outputs are deterministic risk proxies, not trained clinical models.",
        ),
        PaperImplementationMapping(
            strategy="Knowledge distillation for edge deployment",
            rationale="Train a compact logistic student from teacher probabilities and expose weights, bias, threshold, memory, and MAC budget.",
            code_modules=("distillation.py", "edge_budget.py", "export.py"),
            evidence_artifacts=("distilled_student.c", "distilled_student.h", "demo-report.json"),
            verification=("test_demo_runs_teacher_student_edge_budget_and_safety_case", "test_evidence_outputs_include_plots_c_export_and_timing"),
            safety_boundary="C export is for embedded review and must not be used as a medical device controller.",
        ),
        PaperImplementationMapping(
            strategy="EKG/ECG multimodal context on BeagleBone",
            rationale="Read AD8232-style auxiliary cardiac context through Linux IIO ADC and bound its effect through conservative fusion.",
            code_modules=("ekg.py", "fusion.py"),
            evidence_artifacts=("bbb-ekg-features.csv", "synthetic-neural-ekg-traces.png"),
            verification=("test_beaglebone_iio_reader_converts_raw_adc_to_millivolts", "test_synthetic_ekg_features_provide_autonomic_context"),
            safety_boundary="EKG context cannot forecast seizures by itself and is treated only as auxiliary autonomic context.",
        ),
        PaperImplementationMapping(
            strategy="Post-processing and false-warning control",
            rationale="Apply EMA smoothing, consecutive-window hysteresis, seizure prediction horizon, and seizure occurrence horizon checks.",
            code_modules=("postprocessing.py", "pipeline.py"),
            evidence_artifacts=("risk-warning-timeline.png", "demo-report.json"),
            verification=("test_demo_runs_teacher_student_edge_budget_and_safety_case",),
            safety_boundary="Warning events are simulated and do not authorize clinical intervention.",
        ),
        PaperImplementationMapping(
            strategy="Explainability and reviewable outputs",
            rationale="Rank normalized feature contributions from the distilled student so reviewers can inspect the highest-impact signals.",
            code_modules=("explainability.py", "pipeline.py"),
            evidence_artifacts=("demo-report.json",),
            verification=("test_demo_runs_teacher_student_edge_budget_and_safety_case",),
            safety_boundary="Explanations are model introspection artifacts, not clinician-facing explanations.",
        ),
        PaperImplementationMapping(
            strategy="Notebook trace and feature visualization",
            rationale="Provide a reproducible reviewer notebook for synthetic traces, HFO ratio, PAC proxy, connectivity curves, generated artifacts, and C export.",
            code_modules=("notebooks/neural-seizure-feature-visualization.ipynb", "plots.py"),
            evidence_artifacts=("synthetic-neural-ekg-traces.png", "biomarker-feature-curves.png", "feature-trajectories.png"),
            verification=("test_evidence_outputs_include_plots_c_export_and_timing",),
            safety_boundary="Notebook outputs are synthetic engineering evidence and not patient traces.",
        ),
        PaperImplementationMapping(
            strategy="Generated artifact schema validation",
            rationale="Validate JSON and CSV evidence artifacts so generated reports, feature tables, and EKG feature tables have reviewable contracts.",
            code_modules=("artifact_schema.py", "pipeline.py"),
            evidence_artifacts=("demo-report.json", "window-features.csv", "bbb-ekg-features.csv"),
            verification=("test_artifact_schema_rejects_missing_fields_and_reports_numeric_backend", "test_evidence_outputs_include_plots_c_export_and_timing"),
            safety_boundary="Schema validation proves artifact shape only; it does not validate clinical performance.",
        ),
        PaperImplementationMapping(
            strategy="Dataset provenance and validation boundary",
            rationale="Require source URL, citation, license, consent/public basis, de-identification, and patient split before public data import.",
            code_modules=("datasets.py", "safety.py"),
            evidence_artifacts=("public-dataset-adapter.md", "safety-review.md"),
            verification=("test_public_dataset_adapter_requires_strict_provenance",),
            safety_boundary="Approved public data may be adapted only with provenance and patient split controls.",
        ),
        PaperImplementationMapping(
            strategy="Hardware and timing evidence",
            rationale="Export host or target timing measurements and an embedded C boundary for the distilled student.",
            code_modules=("hil.py", "export.py", "cli.py"),
            evidence_artifacts=("hil-timing-report.md", "hil-timing-report.json"),
            verification=("test_evidence_outputs_include_plots_c_export_and_timing",),
            safety_boundary="Host timing is repeatability evidence, not a substitute for target hardware verification.",
        ),
    ]


def render_ieee_11031450_markdown(mappings: list[PaperImplementationMapping] | None = None) -> str:
    rows = mappings or build_ieee_11031450_traceability()
    table_rows = [
        "| Strategy | Code modules | Evidence artifacts | Verification |",
        "| --- | --- | --- | --- |",
    ]
    for item in rows:
        table_rows.append(
            "| "
            + " | ".join(
                [
                    item.strategy,
                    ", ".join(f"`{module}`" for module in item.code_modules),
                    ", ".join(f"`{artifact}`" for artifact in item.evidence_artifacts),
                    ", ".join(f"`{check}`" for check in item.verification),
                ]
            )
            + " |"
        )
    return "\n".join(
        [
            "# IEEE 11031450 Paper-To-Code Traceability",
            "",
            f"Requested source: `{IEEE_11031450_SOURCE}`",
            "",
            f"Local extracted source: `{IEEE_11031450_LOCAL_SOURCE}`",
            "",
            f"Extracted metadata: `{IEEE_11031450_METADATA}`",
            "",
            "## Strategy Map",
            "",
            *table_rows,
            "",
            "## Safety Boundary",
            "",
            "This mapping is synthetic engineering evidence. It is not a medical device, "
            "clinical seizure detector, patient monitor, or treatment recommendation.",
            "",
            "## Future Upgrade Path",
            "",
            *[f"- {item}" for item in FUTURE_UPGRADE_PATH],
        ]
    )
