import csv
import hashlib
import json
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

from .schemas import Resource

ROOT = Path(__file__).resolve().parents[2]
PACK_PATH = ROOT / "data/public-seeds/resources.json"


def canonical_url(value: str) -> str:
    u = urlsplit(value.strip())
    return urlunsplit((u.scheme.lower(), u.netloc.lower(), u.path.rstrip("/") or "/", u.query, ""))


def load_pack() -> dict:
    return json.loads(PACK_PATH.read_text())


def resources(fresh_only: bool = True, today: date | None = None) -> list[Resource]:
    today = today or date.today()
    records = [Resource.model_validate(x) for x in load_pack()["resources"]]
    return [r for r in records if not fresh_only or date.fromisoformat(r.expires_at) >= today]


def seed_registry() -> list[dict]:
    with (ROOT / "planning/RESOURCE_SEED_CATALOG.csv").open() as file:
        rows = list(csv.DictReader(file))
    output = []
    for row in rows:
        name = row["name"]
        kind = (
            "open_source_repo"
            if "github.com/" in row["url"]
            else "public_directory"
            if "directory" in row["category"]
            else "public_document"
            if row["url"].endswith(".pdf")
            else "optional_approved_api"
            if row["access_kind"] == "REGISTRATION_APPROVAL"
            else "official_public_portal"
            if ".gov.in" in urlsplit(row["url"]).hostname or ".nic.in" in urlsplit(row["url"]).hostname
            else "unverified"
        )
        output.append(
            {
                **row,
                "canonical_url": canonical_url(row["url"]),
                "classification": kind,
                "jurisdiction": name.split(": ", 1)[1] if ": " in name else "not_recorded",
                "license": "not_verified",
                "legal_basis": "public_reference_only",
                "terms": "review_required",
                "approval": "discovery_only",
                "verified_at": None,
                "usage_permission": "no_automated_submission",
            }
        )
    return output


def maintenance() -> dict:
    seeds = seed_registry()
    grouped = {}
    for row in seeds:
        grouped.setdefault(row["canonical_url"], []).append(row["id"])
    pack = load_pack()
    return {
        "seeds": {
            "ingested": len(seeds),
            "reviewed_for_preview": len(pack["resources"]),
            "human_approved": 0,
            "exposed": len(resources()),
            "duplicates": [v for v in grouped.values() if len(v) > 1],
        },
        "pack_version": pack["version"],
        "pack_sha256": hashlib.sha256(PACK_PATH.read_bytes()).hexdigest(),
        "osc": {
            "reported_national": 991,
            "report_date": "2026-08-05",
            "data_through": "2026-06-30",
            "individual_sourced": 0,
            "independently_verified_contacts": 0,
            "integrations": 0,
            "source": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1",
        },
        "release": "internal_demo_only",
        "write_access": False,
        "external_actions": False,
        "private_vault": "not_ready",
    }
