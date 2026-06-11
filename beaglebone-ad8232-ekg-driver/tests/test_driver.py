import tempfile
import unittest
from pathlib import Path

from ad8232_bbb_driver.config import Ad8232Config
from ad8232_bbb_driver.heart_rate import analyze
from ad8232_bbb_driver.iio import BeagleBoneIioReader
from ad8232_bbb_driver.plots import write_waveform_plot
from ad8232_bbb_driver.recorder import capture_samples, write_capture


class Ad8232DriverTests(unittest.TestCase):
    def test_iio_reader_converts_ad8232_raw_count(self):
        with tempfile.TemporaryDirectory() as tmp:
            device = Path(tmp)
            (device / "in_voltage0_raw").write_text("2048\n", encoding="utf-8")
            (device / "in_voltage0_scale").write_text("0.43956\n", encoding="utf-8")
            config = Ad8232Config(iio_device_path=device, input_divider_ratio=1.8333333333)
            sample = BeagleBoneIioReader(config).read(0.0)

        self.assertEqual(sample.raw_count, 2048)
        self.assertAlmostEqual(sample.millivolts, 1650.40128, places=3)

    def test_lead_off_gpio_is_reported(self):
        with tempfile.TemporaryDirectory() as tmp:
            device = Path(tmp) / "iio"
            device.mkdir()
            lo_plus = Path(tmp) / "lo_plus"
            (device / "in_voltage0_raw").write_text("1000\n", encoding="utf-8")
            lo_plus.write_text("1\n", encoding="utf-8")
            config = Ad8232Config(iio_device_path=device, lead_off_plus_path=lo_plus)
            sample = BeagleBoneIioReader(config).read(0.0)

        self.assertTrue(sample.lead_off)

    def test_simulated_capture_writes_report(self):
        config = Ad8232Config(sample_rate_hz=250)
        samples, report = capture_samples(config, duration_seconds=4.0, simulate=True)

        self.assertEqual(len(samples), 1000)
        self.assertGreater(report.heart_rate.signal_quality, 0.0)
        self.assertGreaterEqual(analyze(samples, 250).peak_count, 2)

        with tempfile.TemporaryDirectory() as tmp:
            paths = write_capture(samples, report, Path(tmp))
            plot_path = write_waveform_plot(samples, report, Path(tmp))
            for path in paths:
                self.assertTrue(path.exists(), path)
            self.assertTrue(plot_path.exists(), plot_path)
            self.assertIn("AD8232 Single-Lead EKG", plot_path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
