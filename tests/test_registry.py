from datetime import date

import pytest

from services.api.adapters import DisabledAdapter
from services.api.registry import canonical_url, resources, seed_registry


def test_expired_records_cannot_enter_nonemergency_retrieval():
    assert resources(today=date(2030, 1, 1)) == []
    assert len(resources(fresh_only=False)) == 7


def test_all_seed_attributes_survive_ingestion():
    rows = seed_registry()
    assert len(rows) == 211
    assert len({row["id"] for row in rows}) == 211
    assert rows[0]["id"] == "SRC-001"
    assert rows[0]["url"] == "https://citizen.andaman.gov.in"
    assert rows[0]["source_anchor"] == "https://digitalpolice.gov.in/DigitalPolice/portal"
    assert rows[0]["approval"] == "discovery_only"
    assert all(r["api_or_direct_integration"] == "NOT_VERIFIED" for r in rows)


def test_canonicalization_preserves_function_query():
    assert canonical_url("https://EXAMPLE.gov.in/foo/#anchor") == "https://example.gov.in/foo"
    assert canonical_url("https://example.gov.in/?id=1") != canonical_url("https://example.gov.in/?id=2")


def test_adapter_cannot_submit_even_with_apparent_consent():
    with pytest.raises(PermissionError):
        DisabledAdapter().submit(
            recipient="official", approved_payload={}, consent_receipt="yes", idempotency_key="a"
        )


def test_minor_keeps_child_and_emergency_fallback_even_after_source_expiry(monkeypatch):
    import services.api.retrieval as module
    from services.api.registry import resources as real_resources

    monkeypatch.setattr(
        module, "resources", lambda fresh_only=True: [] if fresh_only else real_resources(False)
    )
    result = module.Retriever().find("unsure", minor=True)
    assert {r.id for r in result} == {"child", "emergency"}
