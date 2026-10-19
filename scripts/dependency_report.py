import importlib.metadata
import json

from services.api.registry import ROOT

lock = json.loads((ROOT / "package-lock.json").read_text())
node = [
    {
        "name": p.rsplit("node_modules/", 1)[-1],
        "version": v.get("version"),
        "license": v.get("license", "not_recorded"),
        "dev": bool(v.get("dev")),
    }
    for p, v in lock["packages"].items()
    if p
]
python = []
for d in importlib.metadata.distributions():
    m = d.metadata
    license_value = m.get("License-Expression") or (m.get("License") or "not_recorded").splitlines()[0][:120]
    python.append({"name": m.get("Name"), "version": d.version, "license_metadata": license_value})
report = {
    "scope": "Installed development and optional model environment, plus locked npm packages. Metadata inventory is not legal clearance.",
    "node": node,
    "python": sorted(python, key=lambda r: r["name"].lower()),
    "model": {
        "name": "google/embeddinggemma-2",
        "publisher_license": "Apache-2.0",
        "weights_in_repository": False,
    },
    "review_status": "Operator review of redistribution notices and transitive terms remains required.",
}
(ROOT / "docs/evidence/dependency-licenses.json").write_text(json.dumps(report, indent=2) + "\n")
(ROOT / "docs/THIRD_PARTY_NOTICES.md").write_text(
    "# Third-party notices\n\nProject code is Apache-2.0. Third-party libraries retain their own terms. Full lockfile and installed-package license metadata are in evidence/dependency-licenses.json; npm CycloneDX inventory is in evidence/npm-sbom.cdx.json. This metadata inventory is not a completed legal redistribution audit.\n\nReact, Vite, Lucide and FastAPI use permissive licenses in their package metadata; exact versions and transitive licenses are recorded. The optional EmbeddingGemma 2 publisher card and pinned Hub metadata identify Apache-2.0. The model weights are not committed, copied into Docker or redistributed by this repository. Downloading them is an explicit optional action.\n\nNative installed fonts are used. No font files, government logos or official page screenshots are redistributed. Public source text is summarized with citations. Links do not confer API access, reuse permission or endorsement. Review any future dependency or model change before redistribution.\n"
)
print(len(node), "npm packages;", len(python), "installed Python distributions inventoried.")
