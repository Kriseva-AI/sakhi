from services.api.deployment import trusted_hosts


def test_hosting_allows_only_explicit_valid_hosts_and_no_wildcards():
    hosts = trusted_hosts({"VERCEL_URL": "sakhi-review-abc.vercel.app", "VERCEL_PROJECT_PRODUCTION_URL": "sakhi.vercel.app"})
    assert "sakhi-review-abc.vercel.app" in hosts
    assert "sakhi.vercel.app" in hosts
    assert "*" not in hosts
    assert trusted_hosts({"VERCEL_URL": "https://evil.example/path"}) == ["127.0.0.1", "localhost", "testserver"]
    assert trusted_hosts({"SAKHI_ALLOWED_HOSTS": "review.example.org,localhost"}) == ["review.example.org", "localhost"]


def test_public_build_creates_missing_evidence_directory_in_clean_host_context(tmp_path, monkeypatch):
    from scripts import build_public

    dist = tmp_path / "apps/web/dist"
    dist.mkdir(parents=True)
    for name in ("index.html", "icon.svg", "manifest.webmanifest", "resource-pack.json", "resource-pack.sha256"):
        (dist / name).write_text("synthetic-public-build")
    monkeypatch.setattr(build_public, "ROOT", tmp_path)
    build_public.service_worker()
    assert (dist / "sw.js").exists()
    assert (tmp_path / "docs/evidence/public-cache-manifest.json").exists()
