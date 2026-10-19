"""Explicitly enabled local semantic ranker. Failure always returns lexical results."""

import os
import threading

_engine = None
_failed = False
_lock = threading.Lock()


def semantic_status() -> str:
    if os.environ.get("SAKHI_EMBEDDINGS") != "1":
        return "disabled"
    return "unavailable" if _failed else "ready" if _engine is not None else "configured_not_loaded"


def optional_rank(text, records):
    global _engine, _failed
    if semantic_status() in ("disabled", "unavailable") or not text.strip():
        return records, False
    with _lock:
        try:
            if _engine is None:
                from .embeddings import EmbeddingEngine

                _engine = EmbeddingEngine()
            return _engine.rank(text, records), True
        except (ImportError, OSError, ValueError, RuntimeError, KeyError):
            _failed = True
            return records, False
