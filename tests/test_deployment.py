from services.api.deployment import trusted_hosts


def test_hosting_allows_only_explicit_valid_hosts_and_no_wildcards():
    hosts = trusted_hosts({"VERCEL_URL": "sakhi-review-abc.vercel.app", "VERCEL_PROJECT_PRODUCTION_URL": "sakhi.vercel.app"})
    assert "sakhi-review-abc.vercel.app" in hosts
    assert "sakhi.vercel.app" in hosts
    assert "*" not in hosts
    assert trusted_hosts({"VERCEL_URL": "https://evil.example/path"}) == ["127.0.0.1", "localhost", "testserver"]
    assert trusted_hosts({"SAKHI_ALLOWED_HOSTS": "review.example.org,localhost"}) == ["review.example.org", "localhost"]
