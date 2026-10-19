"""No-network contracts for the opt-in public travel gateway."""

import httpx
import pytest
from fastapi.testclient import TestClient

from services.api import explore
from services.api.main import app

client = TestClient(app)


@pytest.mark.parametrize(
    "payload",
    [
        {"lat": 19, "lon": 72, "kind": "police", "url": "http://127.0.0.1"},
        {"lat": float("inf"), "lon": 72, "kind": "police"},
        {"lat": 0, "lon": 0, "kind": "police"},
        {"lat": 19, "lon": 72, "kind": "people"},
    ],
)
def test_places_rejects_invalid_or_extra_input(payload):
    if payload["lat"] == float("inf"):
        with pytest.raises(ValueError):
            explore.PlaceRequest(**payload)
    else:
        assert client.post("/api/explore/places", json=payload).status_code == 422


def test_invalid_city_text_is_not_echoed_or_forwarded():
    marker = "PRIVATE-ADDRESS-123"
    result = client.post("/api/explore/cities", json={"name": marker})
    assert result.status_code == 422
    assert marker not in result.text


def test_upstream_timeout_is_sanitized(monkeypatch):
    async def failing(*args, **kwargs):
        raise httpx.ReadTimeout("PRIVATE-UPSTREAM-PAYLOAD")

    monkeypatch.setattr(explore.gateway, "request", failing)
    result = client.post("/api/explore/places", json={"lat": 19.076, "lon": 72.878, "kind": "police"})
    assert result.status_code == 503
    assert "PRIVATE" not in result.text
    assert "unavailable" in result.text


def test_places_preserve_unknowns_and_ignore_hostile_contact_tags(monkeypatch):
    async def public(*args, **kwargs):
        return {
            "osm3s": {"timestamp_osm_base": "2026-10-20T00:00:00Z"},
            "elements": [
                {
                    "type": "node",
                    "id": 12,
                    "lat": 19.076,
                    "lon": 72.878,
                    "tags": {"name": "<script>mapped place</script>", "phone": "javascript:alert(1)"},
                },
                {"type": "node", "id": 13, "lat": 19.076, "lon": 72.878, "tags": {"access": "private"}},
            ],
        }

    monkeypatch.setattr(explore.gateway, "request", public)
    result = client.post("/api/explore/places", json={"lat": 19.076, "lon": 72.878, "kind": "police"})
    assert result.status_code == 200
    data = result.json()
    assert len(data["places"]) == 1
    assert data["places"][0]["opening_hours"] is None
    assert data["places"][0]["phone"] is None
    assert data["snapshot_at"] == "2026-10-20T00:00:00Z"
    assert data["source"] == "OpenStreetMap / Overpass"


def test_malformed_provider_response_is_not_empty_success(monkeypatch):
    async def malformed(*args, **kwargs):
        return {"remark": "runtime error"}

    monkeypatch.setattr(explore.gateway, "request", malformed)
    result = client.post("/api/explore/places", json={"lat": 19.076, "lon": 72.878, "kind": "police"})
    assert result.status_code == 503


def test_route_rejects_long_distance_before_provider():
    result = client.post(
        "/api/explore/route",
        json={"start": {"lat": 19.076, "lon": 72.878}, "end": {"lat": 28.6, "lon": 77.2}, "mode": "foot"},
    )
    assert result.status_code == 422


def test_route_uses_distinct_profile_and_limits_geometry(monkeypatch):
    calls = []

    async def route(url, **kwargs):
        calls.append(url)
        return {
            "code": "Ok",
            "routes": [
                {
                    "distance": 1000,
                    "duration": 900,
                    "geometry": {"type": "LineString", "coordinates": [[72.878, 19.076], [72.88, 19.08]]},
                }
            ],
        }

    monkeypatch.setattr(explore.gateway, "request", route)
    result = client.post(
        "/api/explore/route",
        json={"start": {"lat": 19.076, "lon": 72.878}, "end": {"lat": 19.08, "lon": 72.88}, "mode": "foot"},
    )
    assert result.status_code == 200
    assert "/routed-foot/" in calls[0]
    assert result.json()["duration_minutes"] == 15


def test_city_filters_non_indian_results(monkeypatch):
    async def city(*args, **kwargs):
        return {
            "results": [
                {
                    "id": 1,
                    "name": "Test city",
                    "admin1": "Test state",
                    "country_code": "IN",
                    "latitude": 19,
                    "longitude": 73,
                },
                {"id": 2, "name": "Outside", "country_code": "DE", "latitude": 50, "longitude": 13},
            ]
        }

    monkeypatch.setattr(explore.gateway, "request", city)
    result = client.post("/api/explore/cities", json={"name": "Mumbai"})
    assert result.status_code == 200
    assert len(result.json()["cities"]) == 1


def test_gateway_disallows_unreviewed_hosts():
    with pytest.raises(ValueError):
        explore.PublicGateway.check_url("http://169.254.169.254/latest/")


def test_weather_rejects_malformed_solar_times(monkeypatch):
    async def malformed(*args, **kwargs):
        return {
            "current": {
                "time": "2026-10-20T12:00",
                "temperature_2m": 20,
                "precipitation": 0,
                "wind_speed_10m": 3,
                "is_day": 1,
            },
            "daily": {"time": ["2026-10-20"], "sunrise": ["wrong"], "sunset": ["wrong"]},
            "hourly": {"time": ["wrong"] * 3, "precipitation_probability": [0, 1, 2]},
        }

    monkeypatch.setattr(explore.gateway, "request", malformed)
    result = client.post("/api/explore/weather", json={"lat": 19, "lon": 73})
    assert result.status_code == 503


def test_stamp_retains_original_cached_retrieval_time():
    data = {"_sakhi_retrieved_at": "2026-10-19T10:00:00+00:00"}
    assert explore.stamp("test", raw=data)["fetched_at"] == data["_sakhi_retrieved_at"]


def test_public_place_coordinates_are_not_rounded_to_a_different_entrance():
    point = explore.Point(lat=19.076123, lon=72.878456)
    assert point.lon == 72.878456


def test_gateway_cache_and_rate_limit_are_shared_across_queries(monkeypatch):
    import asyncio

    real_client = httpx.AsyncClient
    seen = []

    def respond(request):
        seen.append(request.url.host)
        return httpx.Response(200, json={"results": []})

    monkeypatch.setattr(
        httpx, "AsyncClient", lambda **kwargs: real_client(transport=httpx.MockTransport(respond), **kwargs)
    )

    async def exercise():
        gateway = explore.PublicGateway()
        url = "https://geocoding-api.open-meteo.com/v1/search"
        first = await gateway.request(url, params={"name": "Mumbai"})
        cached = await gateway.request(url, params={"name": "Mumbai"})
        assert first["_sakhi_retrieved_at"] == cached["_sakhi_retrieved_at"]
        with pytest.raises(explore.HTTPException) as error:
            await gateway.request(url, params={"name": "Pune"})
        assert error.value.status_code == 429

    asyncio.run(exercise())
    assert seen == ["geocoding-api.open-meteo.com"]


def test_gateway_rejects_oversized_response_and_redirect(monkeypatch):
    import asyncio

    real_client = httpx.AsyncClient
    replies = [
        httpx.Response(200, content=b" " * 1_500_001),
        httpx.Response(302, headers={"location": "http://169.254.169.254/"}),
    ]
    monkeypatch.setattr(
        httpx,
        "AsyncClient",
        lambda **kwargs: real_client(transport=httpx.MockTransport(lambda request: replies.pop(0)), **kwargs),
    )

    async def exercise():
        with pytest.raises(ValueError, match="too large"):
            await explore.PublicGateway().request("https://api.open-meteo.com/v1/forecast")
        with pytest.raises(httpx.HTTPStatusError):
            await explore.PublicGateway().request("https://api.open-meteo.com/v1/forecast")

    asyncio.run(exercise())


def test_city_lookup_sends_a_public_id_and_never_the_typed_query(monkeypatch):
    calls = []

    async def city(url, **kwargs):
        calls.append(kwargs["params"])
        return {
            "id": 1275339,
            "name": "Mumbai",
            "admin1": "Maharashtra",
            "country_code": "IN",
            "latitude": 19.07283,
            "longitude": 72.88261,
        }

    monkeypatch.setattr(explore.gateway, "request", city)
    result = client.post("/api/explore/cities", json={"name": "mumbai"})
    assert result.status_code == 200
    assert calls == [{"id": 1275339, "language": "en"}]
    calls.clear()
    result = client.post("/api/explore/cities", json={"name": "My ex attacked me"})
    assert result.status_code == 200
    assert result.json()["cities"] == []
    assert calls == []
