"""Explicit localhost-only comparison. Frozen synthetic text; no app integration/downloads."""

import hashlib
import json
import time
from datetime import UTC, datetime
from pathlib import Path

import httpx

from services.api.retrieval import retriever
from services.api.safety import safety_route

root = Path(__file__).resolve().parents[1]
fixture = root / "data/synthetic/heldout-routing-2026-10-20.json"
cases = json.loads(fixture.read_text())["cases"]
labels = ["emergency", "child", "cyber", "home", "workplace", "legal", "friend", "unsure"]
prompt = (
    "Classify this synthetic Indian support-navigation example. Reply with exactly one label: "
    + ", ".join(labels)
    + ". Immediate danger overrides everything. Under18 routes to child. "
    "Choose unsure when information is inadequate. Do not generate advice, facts or phone numbers. Text: "
)
report = {
    "observed_at": datetime.now(UTC).isoformat(),
    "fixture_sha256": hashlib.sha256(fixture.read_bytes()).hexdigest(),
    "prompt_sha256": hashlib.sha256(prompt.encode()).hexdigest(),
    "limits": "English author-labelled synthetic holdout. Not expert gold, reasoning quality, native-language or production validation. No tuning after results. Local templates and emergency safeguards unchanged.",
    "runs": [],
}
target = root / "docs/evidence/continuation/heldout-models.json"
with httpx.Client(timeout=120) as client:
    installed = {m["name"] for m in client.get("http://127.0.0.1:11434/api/tags").json()["models"]}
    for model in ["deterministic_local", "gemma3:4b", "qwen3.5:9b-q4_K_M"]:
        run = {"model": model, "cases": [], "correct": 0}
        if model != "deterministic_local" and model not in installed:
            run["status"] = "unavailable_no_download_attempted"
            report["runs"].append(run)
            continue
        for case in cases:
            started = time.monotonic()
            error = None
            try:
                if model == "deterministic_local":
                    safe = safety_route(case["text"])
                    answer = (
                        {"urgent_redirect": "emergency", "minor_redirect": "child"}.get(safe)
                        or retriever.classify(case["text"])
                        or "unsure"
                    )
                else:
                    body = {
                        "model": model,
                        "prompt": prompt + case["text"],
                        "stream": False,
                        "options": {"temperature": 0, "num_predict": 24, "num_ctx": 2048},
                        "keep_alive": "30s",
                    }
                    if model.startswith("qwen"):
                        body["think"] = False
                    response = client.post("http://127.0.0.1:11434/api/generate", json=body)
                    response.raise_for_status()
                    answer = response.json()["response"].strip().lower()
                correct = answer == case["expected"]
            except (httpx.HTTPError, ValueError, KeyError) as exc:
                answer, correct, error = "unavailable", False, type(exc).__name__
            run["cases"].append(
                {
                    "id": case["id"],
                    "expected": case["expected"],
                    "actual": answer[:120],
                    "correct": correct,
                    "elapsed_ms": round((time.monotonic() - started) * 1000),
                    "error": error,
                }
            )
            run["correct"] += int(correct)
            print(model, case["id"], answer, correct, flush=True)
            target.write_text(json.dumps({**report, "in_progress": run}, indent=2) + "\n")
        run["status"] = "observed"
        report["runs"].append(run)
        target.write_text(json.dumps(report, indent=2) + "\n")
