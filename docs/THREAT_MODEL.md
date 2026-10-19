# Threat model

Assume an abusive party can inspect history, share a device/network, know passwords, see notifications or retrieve backups. Also consider hostile web pages, dependency compromise and unsafe operators. This is an engineering assessment, not a completed independent audit.

| Threat | Current mitigation | Remaining risk |
| --- | --- | --- |
| Spoofed service or source | Curated exact origin, hostname preview, official provenance, no arbitrary URL input | Official sites or deployment can be compromised |
| Resource tampering | Versioned Git changes and hashed public cache | No independent signing root or trusted timestamp |
| Repudiated external action | No submission APIs; disabled adapter | Browser actions outside Sakhi are not observable |
| Narrative disclosure | Memory-only state, POST body, no access logs, no telemetry, no-store responses | OS memory, malicious extensions, screenshots and shared device |
| Prompt injection | No LLM-generated advice or web research; allowlisted fixed records | Keyword router can misclassify |
| SSRF | Maintenance CLI fixed HTTPS allowlist, no credentials/ports/redirect following | DNS and trusted official origin compromise |
| Denial of service | Input length cap, explicit model enablement and no uploads | No hardened public rate limiter; preview binds to localhost |
| Privilege escalation | Read-only maintenance UI, no writable admin endpoints, container non-root/capabilities dropped | Host or dependencies may be compromised |
| Stale contact | TTL filter and visible check date, official fallback | Live availability is unknown |
| Translation harm | Pending stamps, explicit English high-stakes fallback | English fallback may be inaccessible; expert review required |

Tests cover hostile hosts, private validation errors, unsafe URL validation, disabled adapters, no narrative persistence, synthetic-mode restrictions and public-only caches. Production needs rate limiting at ingress, security assessment, manual assistive technology testing and an agreed incident-response owner. Do not expose this preview as a crisis channel.

## Opt-in public travel surface, 2026-10-20

The founder now explicitly requests real maps/APIs and optional location. This changes the old T0 no-GPS capability boundary, while preserving no startup requests and no private case transmissions. Geolocation permission is same-origin only; camera/microphone/payment remain disabled. One-shot device position is matched to a known city locally, never forwarded or persisted; hidden/unmounted/cleared attempts are invalidated. Location permission is not permission to send an alert. Manual city selection is equally available.

Tile images allow only tile.openstreetmap.org, use anonymous CORS and an origin-only referrer override. Global no-referrer, self-only scripts/connect, frame denial and no-store responses remain. A live-map action discloses IP/origin/viewed-area flow. OSM HTTP tile caches are governed by the provider; app clear does not delete them. API and query caches remain excluded from the service worker.

Gateway POST bodies are bounded schema inputs. City search matches a local public gazetteer before a known public ID leaves the server. Numeric public-point queries reach only four fixed HTTPS hosts. No client-supplied URL, credentials, redirects, arbitrary Overpass query, provider error-body echo or telemetry exists. A25-second wall timeout,1.5MB response bound, five-minute bounded public-response cache and one-process host/day quotas reduce preview abuse. They do not replace ingress controls or shared production limits. Upstream tags are rendered as text, contacts are not executable links, unknown fields stay unknown. Public facility coordinates retain precision rather than moving an entrance through coarse rounding.

External outage, stale OSM tags, inaccurate routing/forecast, private-address misuse, malicious public-data edits and map-provider compromise remain possible. No hazard prediction or safe route is inferred. Route/conditions expiry and data receipts are shown. Map module/tile failures preserve the list/manual alternatives and emergency access. Reminders are page-only, have no server monitor and never dispatch alerts. Independent review could not run because the review agent exhausted workspace credits; maintainer checks do not substitute for it.
