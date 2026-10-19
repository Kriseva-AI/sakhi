"""Local-only draft-fixture evaluation. Does not claim expert or real-world accuracy."""

import json
import platform
import statistics
import sys
from collections import defaultdict
from time import perf_counter

from services.api.main import navigate
from services.api.registry import ROOT
from services.api.schemas import NavigateRequest


def main():
    cases = json.loads((ROOT / "data/synthetic/navigation.json").read_text())
    groups = defaultdict(list)
    latencies = []
    failures = []
    emergency_failed = 0
    for c in cases:
        started = perf_counter()
        result = navigate(NavigateRequest(text=c["text"], locale=c["locale"], jurisdiction=c["jurisdiction"]))
        latencies.append((perf_counter() - started) * 1000)
        matched = (
            result.state == c["expected_state"]
            and result.category == c["expected_category"]
            and result.abstained == c["abstain"]
        )
        relevance = any(r.id in c["expected_resources"] for r in result.resources[:3])
        groups[c["locale"]].append(
            {
                "matched": matched,
                "abstained": result.abstained,
                "top3": relevance,
                "expected_abstain": c["abstain"],
                "emergency": c["expected_state"] == "urgent_redirect",
                "got_emergency": result.state == "urgent_redirect",
            }
        )
        if not matched:
            failures.append(
                {
                    "id": c["id"],
                    "expected": c["expected_category"],
                    "actual": result.category,
                    "abstained": result.abstained,
                }
            )
        if c["expected_state"] == "urgent_redirect" and result.state != "urgent_redirect":
            emergency_failed += 1

    def ratio(n, d):
        return n / d if d else None

    by_locale = {
        locale: {
            "cases": len(rows),
            "accuracy": statistics.mean(r["matched"] for r in rows),
            "top3_relevance": statistics.mean(r["top3"] for r in rows),
            "abstention_rate": statistics.mean(r["abstained"] for r in rows),
            "in_scope_recall": ratio(
                sum(r["matched"] and not r["expected_abstain"] for r in rows),
                sum(not r["expected_abstain"] for r in rows),
            ),
            "emergency_recall": ratio(
                sum(r["emergency"] and r["got_emergency"] for r in rows), sum(r["emergency"] for r in rows)
            ),
        }
        for locale, rows in groups.items()
    }
    report = {
        "fixture_status": "draft_not_expert_labeled",
        "surface_variations_not_independent": True,
        "baseline": "SQLite FTS5 BM25 with deterministic safety rules",
        "engine": "lexical",
        "semantic_comparison": "separate optional model benchmark; not used in this baseline",
        "hardware": platform.platform(),
        "cases": len(cases),
        "by_locale": by_locale,
        "latency_ms": {
            "p50": statistics.median(latencies),
            "p95": sorted(latencies)[int(len(latencies) * 0.95)],
        },
        "critical_emergency_failures": emergency_failed,
        "failures": failures,
    }
    for target in ["docs/evidence/evaluation.json", "apps/web/public/evaluation.json"]:
        (ROOT / target).write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(
        json.dumps(
            {
                "cases": len(cases),
                "emergency_failures": emergency_failed,
                "mismatches": len(failures),
                "latency_ms": report["latency_ms"],
                "by_locale": {k: round(v["accuracy"], 3) for k, v in by_locale.items()},
            },
            indent=2,
        )
    )
    if emergency_failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
