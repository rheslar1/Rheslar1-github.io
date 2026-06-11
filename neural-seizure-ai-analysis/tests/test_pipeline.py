import unittest

from neural_seizure_ai.config import BrainState, SimulationConfig
from neural_seizure_ai.features import FeatureExtractor, feature_names
from neural_seizure_ai.pipeline import run_demo
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

    def test_demo_runs_teacher_student_edge_budget_and_safety_case(self):
        config = SimulationConfig(sensor="eeg", duration_seconds=34.0, preictal_start_seconds=14.0, ictal_start_seconds=25.0, seed=7)

        result = run_demo(config)

        self.assertGreater(result.window_count, 10)
        self.assertGreaterEqual(result.teacher_metrics.sensitivity, 0.4)
        self.assertGreaterEqual(result.student_metrics.sensitivity, 0.4)
        self.assertLess(result.student_budget.memory_bytes, result.teacher_budget.memory_bytes)
        self.assertIn("Synthetic research pipeline only", result.safety_case.project_boundary)


if __name__ == "__main__":
    unittest.main()

