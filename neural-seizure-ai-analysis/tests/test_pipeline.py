import json
import tempfile
import unittest
from pathlib import Path

from neural_seizure_ai.config import BrainState, SimulationConfig
from neural_seizure_ai.datasets import CsvPublicDatasetAdapter, PublicDatasetManifest
from neural_seizure_ai.ekg import BeagleBoneEkgConfig, BeagleBoneIioAnalogReader, SyntheticEkgGenerator, extract_ekg_feature_windows
from neural_seizure_ai.export import export_student_to_c
from neural_seizure_ai.features import FeatureExtractor, feature_names
from neural_seizure_ai.hil import benchmark_student
from neural_seizure_ai.paper_traceability import (
    FUTURE_UPGRADE_PATH,
    IEEE_11031450_METADATA,
    IEEE_11031450_SOURCE,
    build_ieee_11031450_traceability,
    render_ieee_11031450_markdown,
)
from neural_seizure_ai.pipeline import run_demo
from neural_seizure_ai.plots import write_plot_evidence
from neural_seizure_ai.preprocessing import preprocess_samples, window_samples
from neural_seizure_ai.signals import SyntheticNeuralSignalGenerator


class NeuralSeizurePipelineTests(unittest.TestCase):
    def test_synthetic_generator_produces_expected_labels(self):
        config = SimulationConfig(sensor="eeg", duration_seconds=30.0, preictal_start_seconds=12.0, ictal_start_seconds=22.0)
        samples = SyntheticNeuralSignalGenerator(config).generate()

        labels = {sample.state for sample in samples}

        self.assertIn(BrainState.INTERICTAL, labels)
        self.assertIn(BrainState.PREICTAL, labels)
        self.assertIn(BrainState.ICTAL, labels)
        self.assertEqual(len(samples[0].values_uv), config.profile.channels)

    def test_feature_extractor_exposes_paper_backed_biomarkers(self):
        config = SimulationConfig(sensor="eeg", duration_seconds=30.0, preictal_start_seconds=12.0, ictal_start_seconds=22.0)
        samples = SyntheticNeuralSignalGenerator(config).generate()
        processed = preprocess_samples(samples, baseline_window_samples=config.sampling_rate_hz // 2)
        windows = window_samples(processed, config.sampling_rate_hz, window_seconds=2.0, stride_seconds=2.0)
        extractor = FeatureExtractor(config.sampling_rate_hz)

        features = [extractor.extract(window) for window in windows]
        preictal_rows = [row for row in features if row.label is BrainState.PREICTAL]

        self.assertTrue(preictal_rows)
        self.assertGreater(max(row.hfo_to_total for row in preictal_rows), 0.0)
        self.assertGreaterEqual(max(row.mean_abs_connectivity for row in features), 0.0)
        self.assertIn("hfo_to_beta", feature_names())
        self.assertIn("wavelet_entropy", feature_names())
        self.assertIn("sample_entropy", feature_names())
        self.assertIn("katz_fractal_dimension", feature_names())
        self.assertGreaterEqual(max(row.wavelet_detail_energy for row in features), 0.0)
        self.assertGreaterEqual(max(row.channel_energy_iqr for row in features), 0.0)

    def test_demo_runs_teacher_student_edge_budget_and_safety_case(self):
        config = SimulationConfig(sensor="eeg", duration_seconds=34.0, preictal_start_seconds=14.0, ictal_start_seconds=25.0, seed=7)

        result = run_demo(config)

        self.assertGreater(result.window_count, 10)
        self.assertGreaterEqual(result.teacher_metrics.sensitivity, 0.4)
        self.assertGreaterEqual(result.student_metrics.sensitivity, 0.4)
        self.assertLess(result.student_budget.memory_bytes, result.teacher_budget.memory_bytes)
        self.assertIn("Synthetic research pipeline only", result.safety_case.project_boundary)
        self.assertEqual(result.window_count, len(result.ekg_feature_rows))
        self.assertIsNotNone(result.fused_metrics)
        self.assertGreaterEqual(result.post_processing.warning_count, result.post_processing.actionable_warning_count)
        self.assertGreater(len(result.explainability.top_features), 0)
        self.assertTrue(any("wavelet_entropy_teacher" in prediction.rationale for prediction in result.teacher_predictions))

    def test_beaglebone_iio_reader_converts_raw_adc_to_millivolts(self):
        with tempfile.TemporaryDirectory() as tmp:
            device = Path(tmp)
            (device / "in_voltage0_raw").write_text("2048\n", encoding="utf-8")
            (device / "in_voltage0_scale").write_text("0.43956\n", encoding="utf-8")
            config = BeagleBoneEkgConfig(iio_device_path=device)
            raw, millivolts = BeagleBoneIioAnalogReader(config).read_millivolts()

        self.assertEqual(raw, 2048)
        self.assertAlmostEqual(millivolts, 900.21888, places=4)

    def test_synthetic_ekg_features_provide_autonomic_context(self):
        samples = SyntheticEkgGenerator(duration_seconds=12.0, preictal_start_seconds=4.0, ictal_start_seconds=10.0, seed=3).generate()
        features = extract_ekg_feature_windows(samples, [(0.0, 4.0), (8.0, 12.0)])

        self.assertEqual(len(features), 2)
        self.assertGreater(features[0].heart_rate_bpm, 0.0)
        self.assertGreaterEqual(features[1].autonomic_stress, features[0].autonomic_stress)

    def test_public_dataset_adapter_requires_strict_provenance(self):
        manifest = PublicDatasetManifest(
            dataset_name="Approved public EEG fixture",
            source_url="https://example.org/dataset",
            license="Research use",
            citation="Example et al.",
            consent_or_public_basis="Public deidentified research release",
            deidentified=True,
            patient_id_column="patient",
            timestamp_column="timestamp",
            label_column="label",
            signal_columns=["ch0", "ch1"],
            patient_split={"train": ["p1"], "validation": ["p2"], "test": ["p3"]},
        )
        with tempfile.TemporaryDirectory() as tmp:
            csv_path = Path(tmp) / "signals.csv"
            csv_path.write_text("patient,timestamp,label,ch0,ch1\np1,0.0,interictal,0.1,0.2\n", encoding="utf-8")
            rows = list(CsvPublicDatasetAdapter(manifest, csv_path).iter_rows())

        self.assertEqual(rows[0]["patient_id"], "p1")
        self.assertEqual(rows[0]["signals"], [0.1, 0.2])

    def test_evidence_outputs_include_plots_c_export_and_timing(self):
        config = SimulationConfig(sensor="eeg", duration_seconds=12.0, preictal_start_seconds=4.0, ictal_start_seconds=9.0, seed=5)
        result = run_demo(config)

        with tempfile.TemporaryDirectory() as tmp:
            output_dir = Path(tmp)
            plot_paths = write_plot_evidence(config, result, output_dir)
            c_paths = export_student_to_c(result.distillation, output_dir)
            timing = benchmark_student(result.feature_rows, result.distillation, output_dir=output_dir, iterations=1)

            for path in [*plot_paths, *c_paths, output_dir / "hil-timing-report.json", output_dir / "hil-timing-report.md"]:
                self.assertTrue(path.exists(), path)

            timing_json = json.loads((output_dir / "hil-timing-report.json").read_text(encoding="utf-8"))
            plot_names = {path.name for path in plot_paths}

        self.assertGreater(timing.average_inference_us, 0.0)
        self.assertEqual(timing_json["windows"], result.window_count)
        self.assertIn("algorithm-coverage-map.svg", plot_names)
        self.assertIn("risk-warning-timeline.svg", plot_names)
        self.assertIn("time-frequency-image-map.svg", plot_names)

    def test_ieee_traceability_maps_review_strategies_to_code_and_artifacts(self):
        mappings = build_ieee_11031450_traceability()
        rendered = render_ieee_11031450_markdown(mappings)
        strategies = {mapping.strategy for mapping in mappings}

        self.assertGreaterEqual(len(mappings), 10)
        self.assertIn("High-bandwidth EEG/ECoG/iEEG sensing", strategies)
        self.assertIn("CNN, LSTM, transformer, and GNN model-family comparison", strategies)
        self.assertIn("Knowledge distillation for edge deployment", strategies)
        self.assertIn("EKG/ECG multimodal context on BeagleBone", strategies)
        self.assertIn(IEEE_11031450_SOURCE, rendered)
        self.assertIn("10.1109/ACCESS.2025.3578991", IEEE_11031450_METADATA)
        self.assertIn("DOI 10.1109/ACCESS.2025.3578991", rendered)
        self.assertIn("Future Upgrade Path", rendered)

        for mapping in mappings:
            self.assertTrue(mapping.code_modules, mapping.strategy)
            self.assertTrue(mapping.evidence_artifacts, mapping.strategy)
            self.assertTrue(mapping.verification, mapping.strategy)
            self.assertGreater(len(mapping.safety_boundary), 20)

        for upgrade in FUTURE_UPGRADE_PATH:
            self.assertIn(upgrade, rendered)


if __name__ == "__main__":
    unittest.main()
