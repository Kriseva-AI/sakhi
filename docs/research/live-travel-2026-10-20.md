# Live travel, Mumbai data and the Raj Gomani example

Research date: 2026-10-20, Asia/Kolkata. This is a feasibility receipt, not a safeguarding approval or evidence of safety outcomes. Previous Sprint 2 competitor, open-source, maps/messaging and safeguarding research remains linked from the plan.

## What the reel establishes

The user identified Raj Gomani, @retardraj. Searches found reporting about his Delhi map, including [NewsGram, October 1](https://www.newsgram.com/amp/story/delhi/2026/10/01/women-safety-in-delhi-unsafe-areas-for-women-map-viral-video) and [Times of India, October 15](https://timesofindia.indiatimes.com/life-style/people/i-am-disgusted-that-i-even-have-to-point-out-unsafe-areas-how-a-20-year-old-mit-student-used-ai-and-crime-data-to-map-potentially-unsafe-areas-for-women-in-delhi/amp_articleshow/134956416.cms). Secondary coverage also mentions Mumbai work. Instagram itself was throttled. No reproducible repository, raw dataset, license, denominator, geocoding method, nighttime schema or held-out validation was found in this bounded search. Existence of a social demonstration is supported by reporting; accuracy and reproducibility were not established. No contact was made with the creator.

## What official crime sources establish

[NCRB's own publication page](https://www.ncrb.gov.in/crime-in-india.html) describes annual collection through state/district bureaux, separate large-city records and some district tables. It currently identifies 2024 as the latest edition. This supports research on registered cases at their published geographic and temporal grain. It does not itself supply a Mumbai street-level, current-night feed or named-offender travel database.

The [Mumbai Police May 2025 city-wide comparative statement](https://mumbaipolice.gov.in/files/Cstat/96.pdf) appears in official indexed extraction. Direct acquisition failed with connection/timeout/502 responses. Its rows were not imported or presented as validated numbers. The indexed table is city-wide and mixes statutory labels; it cannot justify neighbourhood polygons or current risk rankings. The earlier OGD catalog findings remain discovery metadata, not an acquired geocoded feed.

Decision: no inferred crime zones, fabricated rates, named accusations, offender profiles or green safe areas. The Data panel states the missing evidence and links the official publications. Historical area visualization remains blocked until a lawfully usable dataset, geography, observation period, missingness, denominators, update owner and independent reconciliation are available. A useful travel map can proceed without those claims.

## Real providers selected for the internal preview

| Capability | Source and documented constraints | Engineering decision |
| --- | --- | --- |
| Interactive map | [OSMF tile policy](https://operations.osmfoundation.org/policies/tiles/) requires attribution, browser identification/referrer, normal HTTP caching, no bulk/offline prefetch. Best effort, no SLA. | Leaflet 1.9.4 BSD-2-Clause, bundled locally. One explicit map-load action. Only visible tiles, no background city downloads. Tile images send origin-only referrer and anonymous CORS; no arbitrary external scripts. |
| Cities | [GeoNames dump](https://download.geonames.org/export/dump/) is CC BY 4.0, as-is; cities15000 plus admin1CodesASCII. [Open-Meteo geocoding docs](https://open-meteo.com/en/docs/geocoding-api) document public IDs. | Acquired 3,783 Indian city records within the preview bounding box, public gazetteer only. Raw typed search stays on Sakhi; prefix matching is local and exact matches send only a known city ID to the API. This count is not service coverage. Original ZIP hash is retained. |
| Mapped POIs | [Overpass operator guidance](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html) warns against relying on shared instances for a large public app. | Fixed four categories and 2 km public-area query, max 50 records, strict parse/timeout/size limits. Main public instance returned capacity failures during research. Empty success and failure are distinct. No availability or provider-vetting inference. |
| Routes | [FOSSGIS operator](https://routing.openstreetmap.de/about.html) supports separate foot/car profiles, limits requests, logs routes, and describes periodic graph updates. | User-requested public points only, no raw device location. Separate foot and car endpoints, geometry and model estimates. No live traffic, lighting, safe-route or emergency-routing claim. Bounded routes, preview quotas, no automatic polling. |
| Weather/daylight | [Open-Meteo terms](https://open-meteo.com/en/terms) allow qualifying non-commercial use within limits and state uncertainty; API logs can include coordinates and remain up to 90 days. [Forecast docs](https://open-meteo.com/en/docs) define current/hourly/solar fields. | Public city centre only after a user action, current model values, rain forecast and solar-time comparison. Attribution and expiry displayed. Not an official warning or a crime model. |
| Sharing | Existing official WhatsApp click-to-chat research in sprint2-maps-messaging-data.md. | Generic check-in request only, recipient and Send chosen externally. No delivery, availability or monitoring claim. Page reminder is local and expressly unreliable when closed/suspended. |

Nominatim was not adopted as a generic generated geocoding service. Its [usage policy](https://operations.osmfoundation.org/policies/nominatim/) imposes specific responsibility and usage restrictions; the local gazetteer/public-ID design avoids forwarding arbitrary user text.

Private.coffee's Overpass endpoint was also researched and probed. Its [terms](https://overpass.private.coffee/) explicitly disallow use for critical infrastructure or consequential reliance. The request timed out. It was not added as a silent failover. No third-party service is called an institutional integration or partner.

## Production choice still required

The zero-key preview proves real plumbing, not a free mass-scale operating model. Before broad use, choose an owned or contracted tile/POI/routing provider, reviewed account and terms, restricted credentials if applicable, shared quotas, capacity/load tests, monitoring, an incident owner and a budget. Google Maps/Places/Routes remains an option described in the prior memo; no keys, billing settings or accounts were opened. A Google public search alternative remains available for the 16 preset cities.

Actual gateway and tile responses belong in docs/evidence/travel-live-api.json and travel-live-tile-receipt.json. Deterministic regression fixtures are explicitly labelled test fixtures and do not count as live provider success. Dataset and font license notices are in THIRD_PARTY_NOTICES.md.
