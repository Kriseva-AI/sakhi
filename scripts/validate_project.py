import hashlib
import json

from services.api.registry import ROOT, seed_registry
from services.api.schemas import LOCALES


def main():
    features = json.loads((ROOT / "FEATURES.json").read_text())
    assert len(features) == 68 and len({f["id"] for f in features}) == 68
    base = json.loads((ROOT / "packages/i18n/en-IN.json").read_text())
    rows = []
    for code in LOCALES:
        c = json.loads((ROOT / f"packages/i18n/{code}.json").read_text())
        assert set(c["messages"]) == set(base["messages"])
        assert c["language_status"] == "review_pending" and c["human_review"] is None
        assert all(isinstance(v, str) and v.strip() for v in c["messages"].values())
        assert c["dir"] == ("rtl" if code in ("ur-IN", "ks-Arab-IN", "sd-Arab-IN") else "ltr")
        rows.append(
            {
                "locale": code,
                "keys": len(c["messages"]),
                "coverage": 1.0,
                "english_fallback_keys": len(c["fallback_keys"]),
                "language_status": "review_pending",
            }
        )
    canonical = (ROOT / "data/public-seeds/resources.json").read_bytes()
    assert canonical == (ROOT / "apps/web/public/resource-pack.json").read_bytes()
    assert (
        hashlib.sha256(canonical).hexdigest()
        == (ROOT / "apps/web/public/resource-pack.sha256").read_text().strip()
    )
    assert len(seed_registry()) == 211
    guides = json.loads((ROOT / "data/public-seeds/support-guides.json").read_text())
    assert len(guides["resources"]) == 2 and guides["human_approved"] is False
    assert {r["seed_id"] for r in guides["resources"].values()} == {"SRC-110", "SRC-112"}
    # Only scan project-owned source and docs, never environments, caches or dependencies.
    for folder in ["services", "scripts", "apps/web/src", "docs"]:
        for path in (ROOT / folder).rglob("*"):
            if path.suffix in (".md", ".py", ".tsx", ".ts", ".css"):
                text = path.read_text()
                assert "\u2014" not in text and "\u2013" not in text, f"Forbidden dash in {path}"
    report = {
        "locale_rows": rows,
        "features": len(features),
        "seed_leads": 211,
        "source_pack_consistent": True,
    }
    (ROOT / "docs/evidence/structural-validation.json").write_text(json.dumps(report, indent=2) + "\n")
    print(
        f"{len(LOCALES)} locale shells, {len(base['messages'])} keys each, 68 features, 211 leads; structural validation passed."
    )


if __name__ == "__main__":
    main()
