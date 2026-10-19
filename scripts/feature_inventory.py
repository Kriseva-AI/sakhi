import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
text = (ROOT / "planning/FEATURE_BACKLOG.md").read_text()
records = []
review_blocked = {
    "F03": "Draft locale shells and English safety fallback. Expert language review outstanding.",
    "F07": "Public discovery for a friend only. Expert bystander guidance withheld.",
    "F48": "Review metadata and pending status implemented. No human signoff exists.",
}
sprint2_scope = {
    "F12": (
        "partial_preview_only",
        "Coarse city Google Maps search only. No verified district provider directory.",
    ),
    "F15": (
        "partial_preview_only",
        "Exact public-link/map/card preview. No private payload or institutional action centre.",
    ),
    "F28": (
        "implemented_local_review_blocked",
        "Hashed public PWA pack and fonts; human service verification and physical cold boot remain pending.",
    ),
    "F36": (
        "partial_preview_only",
        "Readable illustrated public content; user-tested easy-read content is not established.",
    ),
    "F37": (
        "implemented_local",
        "User-selected public TXT kit. No personal narrative, location or private data.",
    ),
    "F42": (
        "partial_preview_only",
        "Interactive data-boundary explanation only. No persistent consent receipts.",
    ),
    "F49": ("implemented_local", "User-selected comparison of up to three actual public pathways."),
    "F51": ("partial_preview_only", "Published phone/web channel comparison. No assisted-provider handoff."),
    "F57": (
        "implemented_local",
        "Generic user-visible first-contact questions. No generated personal narrative.",
    ),
}
for fid, kind, priority, name, description in re.findall(
    r"- \*\*(F\d+)\*\* \[(CORE|EXPANSION)/(P\d)\] \*\*(.*?)\*\*: (.*)", text
):
    p0 = priority == "P0"
    partner = priority == "P2"
    scope = sprint2_scope.get(fid)
    records.append(
        {
            "id": fid,
            "name": name,
            "priority": priority,
            "group": kind,
            "description": description,
            "implementation_status": scope[0]
            if scope
            else "implemented_local_review_blocked"
            if fid in review_blocked
            else "implemented_local"
            if p0
            else "not_implemented",
            "product_status": "functional_local"
            if p0 or scope and scope[0].startswith("implemented_local")
            else "needs_partner_authorization"
            if partner
            else "not_ready",
            "notes": scope[1]
            if scope
            else review_blocked.get(
                fid,
                "Internal public preview only. Production human review remains open."
                if p0
                else "Deferred until P0 gates pass. No simulated success.",
            ),
            "integration_requirements": "Written provider agreement, authenticated adapter and security review"
            if partner
            else "No external API required"
            if p0
            else "Separate scoped design and privacy review",
            "locale_readiness": f"{len(json.loads((ROOT / 'packages/i18n/en-IN.json').read_text())['messages'])} structural keys, draft or English fallback; review_pending",
            "accessibility_readiness": "Automated browser checks; manual assistive technology review pending",
            "safety_case": "No personal persistence, no external actions, no fabricated contacts",
            "acceptance_command": "make verify" if p0 or scope else None,
            "tests": ["tests/sprint2.spec.ts", "tests/public-actions.test.ts", "tests/offline.spec.ts"]
            if scope
            else ["tests/test_api.py", "tests/e2e.spec.ts"]
            if p0
            else [],
            "performance": "See docs/evidence; no per-feature production claim",
            "documentation": "planning/KRISEVA_SAKHI_SOL_MASTER_PROMPT.md",
        }
    )
assert len(records) == 68
(ROOT / "FEATURES.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")
with (ROOT / "planning/FEATURE_MATRIX_68.csv").open("w") as f:
    f.write("# RECOVERED FROM FEATURE_BACKLOG.md ON 2026-10-19; ORIGINAL NOT PROVIDED\n")
    writer = csv.DictWriter(
        f, fieldnames=["id", "name", "priority", "implementation_status", "notes"], lineterminator="\n"
    )
    writer.writeheader()
    writer.writerows({k: r[k] for k in writer.fieldnames} for r in records)
(ROOT / "docs/FEATURES.md").write_text(
    "# Feature inventory\n\nRecovered from the supplied canonical backlog. The original matrix was absent. No GitHub Issues have been created because no remote has been published.\n\nOriginal priorities are preserved. The founder requested public-only Sprint 2 extensions on 2026-10-19 while human P0 release gates remain open. Partial prototypes are identified individually. Private workflows and institutional P1/P2 adapters remain disabled. Implemented local does not mean production approved.\n\n| ID | Capability | Priority | Actual state |\n| --- | --- | --- | --- |\n"
    + "\n".join(
        f"| {r['id']} | {r['name']} | {r['priority']} | {r['implementation_status']} |" for r in records
    )
    + "\n"
)
(ROOT / "docs/ISSUE_BACKLOG.md").write_text(
    "# Publication issue backlog\n\nPrepared issue bodies, not remotely created issues. Never add private narratives.\n\n"
    + "\n\n".join(
        f"## {r['id']}: {r['name']}\n\nPriority: {r['priority']}. State: {r['implementation_status']}.\n\nAcceptance: {r['description']}\n\nSafety: {r['safety_case']}.\n\nVerification: {r['acceptance_command'] or 'Not available until implementation and review'}.\n\nGate: {r['notes']}"
        for r in records
    )
    + "\n"
)
print("68 feature records and publication issue drafts created.")
