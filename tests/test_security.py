import pytest
from fastapi.testclient import TestClient

from scripts.resources import permitted_url
from services.api.main import app

client = TestClient(app)


def test_validation_errors_never_echo_rejected_story():
    marker = "PRIVATE-REJECTED-STORY"
    response = client.post("/api/navigate", json={"text": marker * 200})
    assert response.status_code == 422
    assert marker not in response.text


def test_hostile_host_is_rejected():
    assert client.get("/api/health", headers={"host": "evil.example"}).status_code == 400


@pytest.mark.parametrize(
    "url",
    [
        "http://127.0.0.1/",
        "https://112.gov.in.evil.example/",
        "https://name:password@112.gov.in/",
        "file:///etc/passwd",
        "https://112.gov.in:443/",
        "https://169.254.169.254/",
    ],
)
def test_maintenance_link_checker_cannot_follow_arbitrary_urls(url):
    assert permitted_url(url) is False


def test_maintenance_link_checker_allows_reviewed_official_origin_only():
    assert permitted_url("https://wcd.gov.in/women/help") is True


def test_security_headers_disable_sensitive_permissions_and_caching():
    response = client.get("/api/health")
    assert response.headers["referrer-policy"] == "no-referrer"
    assert response.headers["cache-control"] == "no-store"
    assert "microphone=()" in response.headers["permissions-policy"]
    assert "frame-ancestors 'none'" in response.headers["content-security-policy"]


def test_runtime_does_not_emit_validation_telemetry_to_ambient_provider(monkeypatch):
    events = []

    class RecordingLogger:
        def emit(self, *args, **kwargs):
            events.append(kwargs)

    class RecordingProvider:
        def get_logger(self, *args, **kwargs):
            return RecordingLogger()

    monkeypatch.setitem(app._telemetry, "logger_provider", RecordingProvider())
    response = client.post("/api/navigate", json={"text": "invalid synthetic input", "recipient": "none"})
    assert response.status_code == 422
    assert events == []
