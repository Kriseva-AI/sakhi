# Live travel and identity revision, 2026-10-20

Goal: replace the nearby mock illustration with a real consented map and useful travel workflows, while retaining the short support entrance. Founder authorizes research and implementation; no further design approval round is required.

## Design and architecture

Use a strong typographic wordmark without the leaf symbol. Manrope headings and existing IBM Plex reading text; bright pink, black and warm white. No gradient, floating badge collection or decorative abstract map. A compact city toolbar, real map, accessible equivalent list and four short workspace choices: Places, Conditions, My plan, Data.

React lazily loads Leaflet only after map consent. The map uses OSM standard tiles with visible attribution and an origin-only referrer override for tile images. No prefetch, offline tile package or external script. FastAPI proxies allowlisted providers through bounded POST endpoints, no access logs, no provider error bodies. External requests only follow the relevant user action, never startup. Browser geolocation is one shot and resolves to a known city locally; no GPS is transmitted. Manual city selection remains available.

## Twelve workstreams and evidence needed

| ID | User outcome | Dependency and completion proof |
| --- | --- | --- |
| T01 | Explore a real interactive map | Leaflet plus OSM tiles; explicit load/revoke, provider errors, accessible list, actual tile receipt. Public hosting is preview capacity only. |
| T02 | Find a city with disambiguation | Open-Meteo GeoNames city lookup, manual submission, India filter, visible city/state selection, no autocomplete. |
| T03 | Find mapped police, hospitals, pharmacies and transport | Overpass bounded 2km search around a public map centre, real results and timestamps, empty/error distinction, no vetted/open/safe claims. |
| T04 | Inspect a place before going | Map/list selection, public map tags, missing opening/accessibility/contact fields explicit, source link and exact destination preview. |
| T05 | Compare a walking or driving route to a selected place | FOSSGIS OSRM distinct profiles, geometry/distance/model duration, no traffic or safety score, user-requested only. |
| T06 | Check travel weather | Open-Meteo current and short hourly precipitation forecast, source time, expiry, failure and no official-warning claim. |
| T07 | See daylight for a chosen departure | Same forecast sunrise/sunset, local-time comparison, no inference that darkness predicts crime. |
| T08 | Prepare a trip checklist and public travel card | Temporary memory checklist and explicit TXT export of selected public city/place/route facts with time and limitations; never device position. |
| T09 | Set a check-in reminder | Page-only deadline, snooze/cancel/I'm here, sleep/resume handling, no background or automatic alert promise. |
| T10 | Ask someone for a check-in | Neutral draft and explicit WhatsApp destination preview; recipient and Send stay in WhatsApp, no private location URL, no sent/delivered fiction. |
| T11 | Choose a city from device location privately | One-shot permission, finite timeout, local nearest-city match only within 35km, accuracy/unsupported/manual recovery; hides invalidate callbacks, no raw coordinates rendered/saved/transmitted. |
| T12 | Inspect Mumbai historical crime evidence | Dated city-wide Mumbai Police source with explicit coverage/missingness, no area heatmap, prediction or criminal profiles until usable lawful data, validation and safeguarding approval exist. |

These are implementation workstreams, not a claim of twelve independent innovations or impact. T04 and T07 intentionally belong to the same underlying journeys as T03 and T06. Existing source-backed support lookup, emergency fallback and community tools remain available.

## Concrete sequence

- [x] Record primary-source feasibility, reel search limits, provider policies and actual probes.
- [x] Write gateway tests for validation, rate limits, timeouts, malformed/oversized upstream data, strict hosts and sanitized failures. Implement providers and API contracts.
- [x] Implement consented map, city search, mapped places, route geometry and provider states. Test with deterministic provider fixtures; fixtures are explicitly labelled automated tests, not live verification.
- [x] Implement conditions, daylight, local plan/reminder/share, GPS-to-city and historical evidence panel. Test cancellation, revocation, date expiry, hidden tab, offline, synthetic mode and storage boundaries.
- [x] Apply bold identity across home and tools; retain <=60 opening words and primary CTA above fold at 390x844.
- [x] Run actual bounded public-city API smoke requests separately from offline deterministic tests. No real person, private address or transmission to authorities.
- [x] Run make verify and quality. Capture and inspect mobile/desktop production map/workspace states; fix observed issues.
- [x] Update design/privacy/threat/release documentation and 00_BRAIN receipt with actual counts and remaining public launch blockers.

## Review focus

A successful HTTP response with missing fields is unavailable, never zero risk or empty verified coverage. Failed/new searches clear old results and routes. Revocation/unmount/clear abort or invalidate work. Late location and API callbacks cannot restore cleared state. Third-party OSM text is plain React text; phone/URL values are not trusted links. No story, raw GPS, provider payload or private reminder enters localStorage/service worker/cache. All external actions remain disabled in synthetic mode.

## Launch dependencies

Community public APIs have limits and no application SLA. Mass use needs an owned/contracted tile, POI and routing service, capacity testing, quotas, monitoring and incident ownership. Google Maps/Places/Routes would require founder-owned project, restricted credentials and billing approval; none were inspected or created. Direct authority alerts need actual recipient agreement and receipt semantics. Granular crime zones need a licensed, current, geocoded dataset with denominators, timestamps and independent validation. Public offender profiling and person identification are not enabled by a social reel. Existing human safeguarding, language, contact, security, usability and physical-device release gates remain open.

## Delivery ruling

Implementation b06dff1 plus cancellation/consent fix88e7243. All listed engineering tasks ran; completing those tasks does not make the 12 proposed outcomes production ready. Live POI verification failed with 503 and no granular crime dataset was acquired. T03/T04 live-service acceptance and the requested T12 crime-zone outcome remain blocked. See LIVE_TRAVEL_STATUS.md. Fresh independent review was attempted but its agent failed for exhausted workspace credits. Source and human approvals remain open.
