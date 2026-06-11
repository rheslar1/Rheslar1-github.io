from __future__ import annotations

import csv
import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PublicDatasetManifest:
    dataset_name: str
    source_url: str
    license: str
    citation: str
    consent_or_public_basis: str
    deidentified: bool
    patient_id_column: str
    timestamp_column: str
    label_column: str
    signal_columns: list[str]
    patient_split: dict[str, list[str]]

    def validate(self) -> None:
        missing = [
            field
            for field, value in self.__dict__.items()
            if value in ("", [], {}) or value is None
        ]
        if missing:
            raise ValueError(f"Dataset manifest missing required fields: {', '.join(missing)}")
        if not self.deidentified:
            raise ValueError("Dataset manifest must confirm deidentified=True before loading signal rows.")
        if not self.source_url.startswith(("https://", "doi:", "s3://", "file://")):
            raise ValueError("Dataset source_url must be explicit and reviewable.")
        if set(self.patient_split) < {"train", "validation", "test"}:
            raise ValueError("patient_split must include train, validation, and test groups.")
        overlap = _find_overlap(self.patient_split)
        if overlap:
            raise ValueError(f"Patient IDs must not overlap across splits: {', '.join(sorted(overlap))}")


class CsvPublicDatasetAdapter:
    """Strict CSV adapter for approved public datasets.

    The adapter refuses to load rows until provenance, de-identification, and
    patient-level train/validation/test separation are documented.
    """

    def __init__(self, manifest: PublicDatasetManifest, csv_path: Path):
        manifest.validate()
        self.manifest = manifest
        self.csv_path = csv_path

    def iter_rows(self):
        with self.csv_path.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            required = {
                self.manifest.patient_id_column,
                self.manifest.timestamp_column,
                self.manifest.label_column,
                *self.manifest.signal_columns,
            }
            missing = required - set(reader.fieldnames or [])
            if missing:
                raise ValueError(f"CSV missing required columns: {', '.join(sorted(missing))}")
            for row in reader:
                yield {
                    "patient_id": row[self.manifest.patient_id_column],
                    "timestamp_seconds": float(row[self.manifest.timestamp_column]),
                    "label": row[self.manifest.label_column],
                    "signals": [float(row[column]) for column in self.manifest.signal_columns],
                }


def load_manifest(path: Path) -> PublicDatasetManifest:
    data = json.loads(path.read_text(encoding="utf-8"))
    manifest = PublicDatasetManifest(**data)
    manifest.validate()
    return manifest


def _find_overlap(split: dict[str, list[str]]) -> set[str]:
    seen: dict[str, str] = {}
    overlap: set[str] = set()
    for split_name, patient_ids in split.items():
        for patient_id in patient_ids:
            if patient_id in seen and seen[patient_id] != split_name:
                overlap.add(patient_id)
            seen[patient_id] = split_name
    return overlap

