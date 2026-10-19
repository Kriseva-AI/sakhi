"""Explicit, bounded public-place lookups. No startup requests or private storage."""

import asyncio
import json
import math
import re
import time
import unicodedata
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Literal
from urllib.parse import urlsplit

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

router = APIRouter(prefix="/api/explore", tags=["Opt-in public travel preview"])
HOSTS = {"geocoding-api.open-meteo.com", "api.open-meteo.com", "overpass-api.de", "routing.openstreetmap.de"}


class PublicGateway:
    """One-process preview caps. Production needs shared quotas and owned providers."""

    def __init__(self):
        self.lock = asyncio.Lock()
        self.last = {}
        self.counts = {}
        self.cache = {}

    @staticmethod
    def check_url(url):
        parts = urlsplit(url)
        if (
            parts.scheme != "https"
            or parts.hostname not in HOSTS
            or parts.username
            or parts.password
            or parts.port
            or parts.query
            or parts.fragment
        ):
            raise ValueError("Unreviewed provider")

    async def request(self, url, *, params=None, data=None, ttl=300):
        self.check_url(url)
        key = (url, str(sorted((params or {}).items())), str(data))
        now = time.monotonic()
        if key in self.cache and now < self.cache[key][0]:
            return self.cache[key][1]
        host = urlsplit(url).hostname
        async with self.lock:
            now = time.monotonic()
            if now - self.last.get(host, -100) < (5 if host == "overpass-api.de" else 1.1):
                raise HTTPException(429, "Please wait a few seconds before another lookup.")
            day = datetime.now(UTC).date().isoformat()
            if self.counts.get((host, day), 0) >= 500:
                raise HTTPException(429, "Preview provider quota reached. Try the manual public map.")
            self.counts = {k: v for k, v in self.counts.items() if k[1] == day}
            self.counts[(host, day)] = self.counts.get((host, day), 0) + 1
            self.last[host] = now
        async with asyncio.timeout(25):
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(22, connect=6),
                follow_redirects=False,
                headers={"User-Agent": "KrisevaSakhi-LocalPreview/0.1", "Accept": "application/json"},
            ) as client:
                async with client.stream(
                    "POST" if data else "GET", url, params=params, data=data
                ) as response:
                    response.raise_for_status()
                    body = bytearray()
                    async for chunk in response.aiter_bytes():
                        body.extend(chunk)
                        if len(body) > 1_500_000:
                            raise ValueError("Provider response too large")
        import json

        result = json.loads(body)
        if not isinstance(result, dict):
            raise ValueError("Invalid provider response")
        result["_sakhi_retrieved_at"] = datetime.now(UTC).isoformat()
        if len(self.cache) >= 128:
            self.cache.clear()
        self.cache[key] = (time.monotonic() + ttl, result)
        return result


gateway = PublicGateway()
CITY_PACK = json.loads(
    (Path(__file__).resolve().parents[2] / "data/public-seeds/travel-cities.json").read_text()
)


def normalize_city(value):
    return "".join(c for c in unicodedata.normalize("NFKD", value.casefold()) if not unicodedata.combining(c))


class Point(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False, strict=True)
    lat: float = Field(ge=6, le=37.5)
    lon: float = Field(ge=68, le=98)

    @field_validator("lat", "lon")
    @classmethod
    def public_precision(cls, value):
        return round(value, 6)


class PlaceRequest(Point):
    kind: Literal["police", "hospital", "pharmacy", "transport"]


class CityRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    name: str = Field(min_length=2, max_length=40)

    @field_validator("name")
    @classmethod
    def city_only(cls, value):
        if len(value.split()) > 4 or not all(c.isalpha() or c in " ,.'-" for c in value) or not value.strip():
            raise ValueError("Use a public city name only")
        return value.strip()


def distance(a, b):
    p, q = math.radians(a.lat), math.radians(b.lat)
    d = (
        math.sin((q - p) / 2) ** 2
        + math.cos(p) * math.cos(q) * math.sin(math.radians(b.lon - a.lon) / 2) ** 2
    )
    return 6_371_000 * 2 * math.atan2(math.sqrt(d), math.sqrt(max(0, 1 - d)))


class RouteRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    start: Point
    end: Point
    mode: Literal["foot", "car"]

    @model_validator(mode="after")
    def local_only(self):
        if distance(self.start, self.end) > 50_000:
            raise ValueError("Preview routes are limited to 50 km straight-line distance")
        return self


def clean(value, limit=180):
    if not isinstance(value, str):
        return None
    return "".join(c for c in value if c.isprintable())[:limit] or None


def stamp(source, minutes=15, raw=None):
    now = (
        datetime.fromisoformat(raw["_sakhi_retrieved_at"])
        if raw and "_sakhi_retrieved_at" in raw
        else datetime.now(UTC)
    )
    return {
        "source": source,
        "fetched_at": now.isoformat(),
        "expires_at": (now + timedelta(minutes=minutes)).isoformat(),
    }


def unavailable():
    return HTTPException(503, "Public provider unavailable. Try again later or use the manual public map.")


@router.post("/cities")
async def cities(payload: CityRequest):
    try:
        query = normalize_city(payload.name)
        matches = [
            c
            for c in CITY_PACK["cities"]
            if any(normalize_city(c[k]).startswith(query) for k in ["name", "ascii"])
        ]
        exact = [c for c in matches if query in [normalize_city(c["name"]), normalize_city(c["ascii"])]]
        if len(exact) != 1:
            return {
                **stamp("GeoNames public local gazetteer"),
                "cities": [
                    {k: c[k] for k in ["name", "state", "lat", "lon"]} for c in (exact or matches)[:6]
                ],
            }
        raw = await gateway.request(
            "https://geocoding-api.open-meteo.com/v1/get",
            params={"id": exact[0]["id"], "language": "en"},
            ttl=3600,
        )
        if "error" in raw or not isinstance(raw.get("results", []), list):
            raise ValueError()
        found = []
        for item in raw.get("results", [raw])[:6]:
            if item.get("country_code") != "IN":
                continue
            point = Point(lat=item["latitude"], lon=item["longitude"])
            name = clean(item.get("name"), 70)
            if not name:
                continue
            found.append(
                {"name": name, "state": clean(item.get("admin1"), 70) or "India", **point.model_dump()}
            )
        return {**stamp("Open-Meteo / GeoNames", 60, raw), "cities": found}
    except HTTPException:
        raise
    except (httpx.HTTPError, TimeoutError, ValueError, KeyError, TypeError, AttributeError):
        raise unavailable() from None


@router.post("/places")
async def places(payload: PlaceRequest):
    filters = {
        "police": "[amenity=police]",
        "hospital": "[amenity=hospital]",
        "pharmacy": "[amenity=pharmacy]",
        "transport": '[railway~"^(station|halt)$"]',
    }
    query = (
        f"[out:json][timeout:15];nwr{filters[payload.kind]}"
        f"(around:2000,{payload.lat},{payload.lon});out center tags 50;"
    )
    try:
        raw = await gateway.request("https://overpass-api.de/api/interpreter", data={"data": query})
        if "remark" in raw or not isinstance(raw.get("elements"), list):
            raise ValueError()
        found = []
        for item in raw["elements"][:50]:
            tags = item.get("tags", {})
            if tags.get("access") in {"private", "no"}:
                continue
            centre = item.get("center", item)
            point = Point(lat=centre["lat"], lon=centre["lon"])
            if distance(payload, point) > 3000:
                continue
            kind = item["type"]
            identity = int(item["id"])
            if kind not in {"node", "way", "relation"} or identity <= 0:
                continue
            phone = clean(tags.get("contact:phone") or tags.get("phone"), 30)
            phone = phone if phone and re.fullmatch(r"[+\d ()-]{5,30}", phone) else None
            found.append(
                {
                    "id": f"{kind}/{identity}",
                    "name": clean(tags.get("name")) or "Unnamed mapped place",
                    **point.model_dump(),
                    "distance_m": round(distance(payload, point)),
                    "opening_hours": clean(tags.get("opening_hours")),
                    "wheelchair": clean(tags.get("wheelchair"), 30),
                    "phone": phone,
                    "source_url": f"https://www.openstreetmap.org/{kind}/{identity}",
                }
            )
        found.sort(key=lambda item: item["distance_m"])
        return {
            **stamp("OpenStreetMap / Overpass", raw=raw),
            "snapshot_at": clean(raw.get("osm3s", {}).get("timestamp_osm_base"), 40),
            "places": found,
        }
    except HTTPException:
        raise
    except (httpx.HTTPError, TimeoutError, ValueError, KeyError, TypeError, AttributeError):
        raise unavailable() from None


@router.post("/weather")
async def weather(payload: Point):
    try:
        raw = await gateway.request(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": round(payload.lat, 2),
                "longitude": round(payload.lon, 2),
                "current": "temperature_2m,precipitation,is_day,wind_speed_10m",
                "hourly": "precipitation_probability",
                "daily": "sunrise,sunset",
                "timezone": "Asia/Kolkata",
                "forecast_days": 2,
            },
        )
        current, daily, hourly = raw["current"], raw["daily"], raw["hourly"]
        for field in ["temperature_2m", "precipitation", "wind_speed_10m"]:
            if not isinstance(current.get(field), (float, int)) or not math.isfinite(current[field]):
                raise ValueError()
        if current["is_day"] not in (0, 1) or not isinstance(current["time"], str):
            raise ValueError()
        datetime.fromisoformat(current["time"])
        days = [
            {"date": date, "sunrise": sunrise, "sunset": sunset}
            for date, sunrise, sunset in zip(daily["time"], daily["sunrise"], daily["sunset"], strict=True)
        ]
        hours = [
            {"time": t, "rain_probability": p}
            for t, p in zip(hourly["time"], hourly["precipitation_probability"], strict=True)
            if isinstance(p, (float, int)) and 0 <= p <= 100
        ]
        for day in days:
            rise, setting = datetime.fromisoformat(day["sunrise"]), datetime.fromisoformat(day["sunset"])
            if rise.date().isoformat() != day["date"] or rise >= setting:
                raise ValueError()
        for hour in hours:
            datetime.fromisoformat(hour["time"])
        if not days or len(hours) < 3:
            raise ValueError()
        return {
            **stamp("Open-Meteo", 30, raw),
            "current": current,
            "days": days[:2],
            "hours": hours[:48],
            "timezone": "Asia/Kolkata",
        }
    except HTTPException:
        raise
    except (httpx.HTTPError, TimeoutError, ValueError, KeyError, TypeError, AttributeError):
        raise unavailable() from None


@router.post("/route")
async def route(payload: RouteRequest):
    points = f"{payload.start.lon},{payload.start.lat};{payload.end.lon},{payload.end.lat}"
    url = f"https://routing.openstreetmap.de/routed-{payload.mode}/route/v1/driving/{points}"
    try:
        raw = await gateway.request(
            url,
            params={
                "overview": "simplified",
                "geometries": "geojson",
                "steps": "false",
                "generate_hints": "false",
            },
        )
        if raw.get("code") != "Ok":
            raise ValueError()
        result = raw["routes"][0]
        coords = result["geometry"]["coordinates"]
        if not 2 <= len(coords) <= 4000 or result["geometry"]["type"] != "LineString":
            raise ValueError()
        for pair in coords:
            if len(pair) != 2:
                raise ValueError()
            Point(lon=pair[0], lat=pair[1])
        length, duration = result["distance"], result["duration"]
        if not 0 < length <= 150_000 or not 0 < duration <= 172_800:
            raise ValueError()
        return {
            **stamp("FOSSGIS / OSRM / OpenStreetMap", raw=raw),
            "mode": payload.mode,
            "distance_m": round(length),
            "duration_minutes": math.ceil(duration / 60),
            "coordinates": coords,
        }
    except HTTPException:
        raise
    except (httpx.HTTPError, TimeoutError, ValueError, KeyError, TypeError, AttributeError, IndexError):
        raise unavailable() from None
