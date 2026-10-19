"""Public source maintenance. No narrative input, login, crawling or live mutation."""

import argparse
import hashlib
import json
import time
from datetime import datetime, timezone
from urllib.parse import urlsplit
from urllib.robotparser import RobotFileParser

import httpx

from services.api.registry import ROOT, maintenance, resources, seed_registry

ALLOWED = {
    "112.gov.in",
    "www.112.gov.in",
    "wcd.gov.in",
    "www.spniwcd.wcd.gov.in",
    "nalsa.gov.in",
    "cybercrime.gov.in",
    "shebox.wcd.gov.in",
    "ncwapps.nic.in",
    "www.pib.gov.in",
}
AGENT = "SakhiSourceReview/0.1 (public-link-health; no user data)"


def permitted_url(url: str) -> bool:
    try:
        parsed = urlsplit(url)
        return (
            parsed.scheme == "https"
            and parsed.hostname in ALLOWED
            and parsed.port is None
            and parsed.username is None
            and parsed.password is None
        )
    except ValueError:
        return False


def online_report() -> list[dict]:
    records = []
    robots_cache = {}
    with httpx.Client(timeout=15, follow_redirects=False, headers={"User-Agent": AGENT}) as client:
        for r in resources(fresh_only=False):
            url = r.url
            result = {
                "id": r.id,
                "url": url,
                "checked_at": datetime.now(timezone.utc).isoformat(),
                "human_verified": False,
                "public_pack_modified": False,
            }
            if not permitted_url(url):
                records.append({**result, "status": "blocked_origin"})
                continue
            parsed = urlsplit(url)
            origin = f"{parsed.scheme}://{parsed.netloc}"
            try:
                if origin not in robots_cache:
                    response = client.get(origin + "/robots.txt")
                    if response.status_code == 404:
                        robots_cache[origin] = None
                    elif response.status_code == 200:
                        robot = RobotFileParser()
                        robot.parse(response.text.splitlines())
                        robots_cache[origin] = robot
                    else:
                        records.append(
                            {**result, "status": "robots_unavailable", "http": response.status_code}
                        )
                        continue
                    time.sleep(1)
                robot = robots_cache[origin]
                if robot is not None and not robot.can_fetch(AGENT, url):
                    records.append({**result, "status": "robots_disallowed"})
                    continue
                response = client.get(url)
                # Redirects are reported, never followed or silently approved.
                result.update(
                    status="reachable" if response.status_code == 200 else "needs_review",
                    http=response.status_code,
                    content_sha256=hashlib.sha256(response.content).hexdigest(),
                )
                if response.is_redirect:
                    result["redirect_requires_review"] = response.headers.get("location", "")
                records.append(result)
            except httpx.HTTPError as error:
                records.append({**result, "status": "network_error", "error_type": type(error).__name__})
            time.sleep(1)
    return records


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["ingest", "validate", "hsds"])
    parser.add_argument(
        "--online", action="store_true", help="Explicit official allowlist-only link health check."
    )
    args = parser.parse_args()
    if args.command == "ingest":
        rows = seed_registry()
        (ROOT / "data/discovery-registry.json").write_text(
            json.dumps(rows, ensure_ascii=False, indent=2) + "\n"
        )
        print(f"Ingested {len(rows)} discovery leads. None automatically approved.")
    elif args.command == "hsds":
        result = {
            "profile": "HSDS-inspired service export; not a full HSDS compliance claim",
            "service": [
                {
                    "id": r.id,
                    "name": r.title,
                    "description": r.summary,
                    "url": r.url,
                    "organization_id": r.authority,
                    "status": "preview_information_only",
                }
                for r in resources()
            ],
            "location": [],
            "organization": [],
            "phone": [],
            "note": "No individual OSC locations or partner capacity records.",
        }
        (ROOT / "data/public-seeds/hsds-export.json").write_text(json.dumps(result, indent=2) + "\n")
        print("Public service reference export created. No provider integration.")
    else:
        rows = seed_registry()
        assert len(rows) == 211 and len({r["id"] for r in rows}) == 211
        result = maintenance()
        result["link_results"] = online_report() if args.online else "not_run_offline_validation_only"
        (ROOT / "docs/evidence/resource-validation.json").write_text(json.dumps(result, indent=2) + "\n")
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
