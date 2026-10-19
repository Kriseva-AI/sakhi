"""Bounded synthetic loopback probe. Never logs request text or contacts a provider."""

import asyncio
import json
import math
import time
from collections import Counter

import httpx

from services.api.registry import ROOT

PROFILES = [
    ({"text": "fake profile", "locale": "en-IN"}, "present_options"),
    ({"category": "legal", "locale": "hi-IN"}, "present_options"),
    ({"under18": True, "locale": "en-IN"}, "minor_redirect"),
    ({"urgency": True, "locale": "ur-IN"}, "urgent_redirect"),
    ({"category": "home", "jurisdiction": "West Bengal"}, "present_options"),
    ({"text": "unclassified synthetic question"}, "present_options"),
]


async def main():
    concurrency, count = 10, 240
    semaphore = asyncio.Semaphore(concurrency)
    latencies, failures = [], []
    statuses = Counter()
    async with httpx.AsyncClient(timeout=10, trust_env=False) as client:

        async def request(index):
            payload, expected = PROFILES[index % len(PROFILES)]
            async with semaphore:
                start = time.perf_counter()
                try:
                    response = await client.post("http://127.0.0.1:8787/api/navigate", json=payload)
                    response.raise_for_status()
                    result = response.json()
                    assert result["state"] == expected and result["external_actions"] is False
                    if payload.get("jurisdiction") == "West Bengal":
                        assert all(r["id"] != "women" for r in result["resources"])
                    statuses[result["state"]] += 1
                except (httpx.HTTPError, AssertionError, KeyError, ValueError) as error:
                    failures.append({"index": index, "type": type(error).__name__})
                latencies.append((time.perf_counter() - start) * 1000)

        start = time.perf_counter()
        await asyncio.gather(*(request(i) for i in range(count)))
    elapsed = time.perf_counter() - start
    latencies.sort()
    report = {
        "scope": "240 synthetic requests to local Docker API, one run, no external calls",
        "date": "2026-10-19",
        "concurrency": concurrency,
        "requests": count,
        "elapsed_seconds": round(elapsed, 3),
        "requests_per_second": round(count / elapsed, 2),
        "p50_ms": round(latencies[math.ceil(count * 0.5) - 1], 2),
        "p95_ms": round(latencies[math.ceil(count * 0.95) - 1], 2),
        "max_ms": round(max(latencies), 2),
        "states": dict(statuses),
        "failures": failures,
        "limits": "Local smoke probe, not internet scale, endurance, availability SLA or service outcome validation.",
    }
    (ROOT / "docs/evidence/load-probe.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))
    assert not failures


if __name__ == "__main__":
    asyncio.run(main())
