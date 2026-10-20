import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_language_registry_has_all_23_languages_without_invented_reviews():
    target = ROOT / "packages/i18n/locales.json"
    assert target.exists(), "A canonical 23-language registry is required"
    rows = json.loads(target.read_text())["languages"]
    assert len(rows) == 23
    assert len({r["language"] for r in rows}) == 23
    assert {"brx-IN", "doi-IN", "mai-IN", "mni-Mtei-IN", "sa-IN", "sat-Olck-IN", "sd-Arab-IN"} <= {r["locale"] for r in rows}
    assert all(r["human_review"] is None and r["status"] == "review_pending" for r in rows)
    assert all(r["modes"]["asr"] == "unavailable" for r in rows)


def test_catalogues_frontend_and_api_agree_on_language_targets_without_approving_them():
    from services.api.main import app
    from services.api.schemas import LOCALES, NavigateRequest

    declared = (ROOT / "packages/contracts/index.ts").read_text().split(";")[0]
    assert set(re.findall(r'"([a-zA-Z-]+-IN)"', declared)) == set(LOCALES)
    assert set(app.openapi()["components"]["schemas"]["NavigateRequest"]["properties"]["locale"]["enum"]) == set(LOCALES)
    for code in LOCALES:
        assert NavigateRequest(locale=code).locale == code
        catalogue = json.loads((ROOT / f"packages/i18n/{code}.json").read_text())
        assert catalogue["human_review"] is None
        assert catalogue["language_status"] == "review_pending"
