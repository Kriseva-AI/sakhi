"""Explicit live public-data probe, separate from the deterministic test suite.

Run only against an owned Sakhi loopback preview. It sends public Mumbai city/landmark
coordinates. No device position, private address, person, call or message is used.
"""

import argparse
import json
import time
from datetime import UTC, datetime
from pathlib import Path

import httpx

parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=8787, choices=[8787, 8769])
parser.add_argument("--live-public-data", action="store_true", required=True)
args = parser.parse_args()
origin = f"http://127.0.0.1:{args.port}"
report = {
    "date": "2026-10-20",
    "observed_at_utc": datetime.now(UTC).isoformat(),
    "origin": origin,
    "scope": "Actual public Mumbai requests. No fixtures, private location or transmissions to people.",
    "probes": [],
}
lookups = [
    ("cities", {"name": "Mumbai"}),
    ("weather", {"lat": 19.073, "lon": 72.883}),
    ("places", {"lat": 19.073, "lon": 72.883, "kind": "police"}),
    (
        "route",
        {"start": {"lat": 19.073, "lon": 72.883}, "end": {"lat": 18.922, "lon": 72.835}, "mode": "foot"},
    ),
    (
        "route",
        {"start": {"lat": 19.073, "lon": 72.883}, "end": {"lat": 18.922, "lon": 72.835}, "mode": "car"},
    ),
]
with httpx.Client(timeout=32) as client:
    for path, body in lookups:
        if path == "route" and body.get("mode") == "car":
            time.sleep(1.2)
        started = datetime.now(UTC)
        try:
            response = client.post(f"{origin}/api/explore/{path}", json=body)
            data = response.json()
            row = {
                "endpoint": path,
                "mode": body.get("mode"),
                "status": response.status_code,
                "elapsed_ms": round((datetime.now(UTC) - started).total_seconds() * 1000),
                "response": data,
            }
            # Do not immediately retry a shared host. The next route follows the user-visible
            # waiting period only in a subsequent explicit run if it is rate limited.
        except (httpx.HTTPError, ValueError) as error:
            row = {"endpoint": path, "mode": body.get("mode"), "error_type": type(error).__name__}
        report["probes"].append(row)
        print(json.dumps({k: v for k, v in row.items() if k != "response"}), flush=True)
Path("docs/evidence/travel-live-api.json").write_text(json.dumps(report, indent=2) + "\n")
