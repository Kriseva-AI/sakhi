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
