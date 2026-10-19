"""Explicit local model comparison using only public synthetic fixture text."""

import json
import os
import statistics
from collections import defaultdict
from time import perf_counter

from services.api.registry import ROOT, resources
from services.api.retrieval import retriever


def main():
    os.environ["HF_HUB_OFFLINE"] = "1"
    os.environ["TRANSFORMERS_OFFLINE"] = "1"
    from services.api.embeddings import EmbeddingEngine

    engine = EmbeddingEngine()
    # Only authored in-scope phrases; generated surface variations are excluded.
    cases = [
        c
        for c in json.loads((ROOT / "data/synthetic/navigation.json").read_text())
        if c["variation"] == "authored_phrase" and c["expected_state"] == "present_options"
    ]
    approved = resources()
    timings = []
    rows = defaultdict(list)
    for case in cases:
        category = retriever.classify(case["text"]) or "unsure"
        lexical = retriever.find(category)
        started = perf_counter()
        semantic = engine.rank(case["text"], approved)
        timings.append((perf_counter() - started) * 1000)
        hybrid = engine.rank(case["text"], lexical)
        expected = case["expected_resources"]
        rows[case["locale"]].append(
            {
                "lexical_top3": any(r.id in expected for r in lexical[:3]),
                "semantic_top3": any(r.id in expected for r in semantic[:3]),
                "hybrid_top3": any(r.id in expected for r in hybrid[:3]),
                "lexical_top1": bool(lexical) and lexical[0].id in expected,
                "semantic_top1": bool(semantic) and semantic[0].id in expected,
                "hybrid_top1": bool(hybrid) and hybrid[0].id in expected,
            }
        )
    by_locale = {
        code: {"cases": len(values), **{key: statistics.mean(v[key] for v in values) for key in values[0]}}
        for code, values in rows.items()
    }
    report = {
        "model": "google/embeddinggemma-2",
        "revision": "914f7f89142e33e77833254d9c9b90c3cef7303b",
        "dtype": engine.dtype,
        "dimensions": 768,
        "device": "CPU on macOS 24 GiB machine",
        "load_ms": engine.load_ms,
        "cache_bytes": json.loads((ROOT / "models/cache/manifest.json").read_text())["bytes"],
        "query_rank_latency_ms": {
            "p50": statistics.median(timings),
            "p95": sorted(timings)[int(0.95 * len(timings))],
        },
        "fixture_status": "Draft, in-sample, not expert reviewed. Small per-language samples. No real-world claim.",
        "by_locale": by_locale,
        "cases": len(cases),
        "network_mode": "offline_cache_only",
        "policy": "Runtime semantic ranking cannot expand the approved lexical candidate scope. No generated answers.",
    }
    (ROOT / "docs/evidence/model-benchmark.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
