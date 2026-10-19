"""Optional text-only, local-only ranking. No startup downloads or generated advice."""

import json
from pathlib import Path
from time import perf_counter

from .registry import ROOT


class EmbeddingEngine:
    def __init__(self, cache: Path | None = None):
        import torch
        from sentence_transformers import SentenceTransformer

        self.cache = cache or ROOT / "models/cache/embeddinggemma-2"
        manifest = json.loads((ROOT / "models/cache/manifest.json").read_text())
        if manifest["license"] != "apache-2.0":
            raise ValueError("Unreviewed model license")
        dtype = (
            torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float32
        )
        started = perf_counter()
        self.model = SentenceTransformer(
            str(self.cache),
            local_files_only=True,
            trust_remote_code=False,
            config_kwargs={"vision_config": None, "audio_config": None},
            model_kwargs={"torch_dtype": dtype},
            device="cpu",
        )
        self.load_ms = (perf_counter() - started) * 1000
        self.dtype = str(dtype)
        self.documents = {}

    def encode_query(self, query: str):
        vector = self.model.encode(query[:2000], prompt_name="SearchQuery", normalize_embeddings=True)
        if len(vector) != 768:
            raise ValueError("Unexpected embedding dimension")
        return vector

    def rank(self, query: str, records: list):
        if not records or not query.strip():
            return records
        import numpy as np

        q = self.encode_query(query)
        for r in records:
            if r.id not in self.documents:
                self.documents[r.id] = self.model.encode(
                    f"title: {r.title} | text: {r.summary}", normalize_embeddings=True
                )
        if not np.isfinite(q).all():
            raise ValueError("Nonfinite query embedding")
        return sorted(records, key=lambda r: float(np.dot(q, self.documents[r.id])), reverse=True)
