# Live travel delivery status

2026-10-20. Verdict: internal_demo_only. This receipt separates implemented controls, actual provider responses and unfulfilled product requirements. It is not a claim that12 independent innovations work flawlessly or that women are safer because of the product.

| Workstream | Implemented and tested | Actual external / human evidence |
| --- | --- | --- |
| T01 Interactive map | Consent, real Leaflet map, pan/zoom, attribution, public-point choice, module/tile failure, revoke and focus | Production loaded6 actual OSM tile responses, all200. No automatic panning/zooming was used for the live receipt. |
| T02 City lookup |3,783 public GeoNames city records, local matching, exact-match public-ID API resolution, disambiguation, country checks | Actual Mumbai gateway lookup200. Typed unknown text never reaches the geocoder. The gazetteer is not service coverage. |
| T03 Mapped nearby places | Four categories,2 km bounded query, source timestamps, accessible list, empty/error recovery, cancellation | Actual gateway returned 503 after22.3s; public endpoint was at capacity/timed out. Live POI success is NOT verified. Fixtures prove contracts only. Production needs an owned/contracted source. |
| T04 Place inspection | Unknown hours/accessibility/contact states, selected source, exact outbound preview, route preparation | UI tested with fictional mapped records. No actual facility availability, phone or appointment verified. Public manual map points work without the POI provider. |
| T05 Walking/driving estimates | Separate actual provider profiles, public point selection, geometry, distance/time, expiry and cancellation | Production gateway returned200 for both foot and car requests between public Mumbai points. No traffic, route safety, entrance accessibility or real journey validated. |
| T06 Travel weather | Current model estimate, wind/precipitation, short hourly rain chart, source time, expiry/failure | Actual gateway200 and real production browser weather rendered. It is not an official warning or an observed street condition. |
| T07 Departure/daylight | IST date/time selection compared with supplied sunrise/sunset, date bounds and expired-data state | Actual solar fields received; boundary calculations tested. No nighttime crime inference. |
| T08 Local preparation/card | Temporary checklist, selected public city/place/route facts, explicit TXT download | Download observed in browser tests. No private position or story accepted. Downloads remain outside app erasure. |
| T09 Page check-in | Deadline, resume check, snooze/end/cancel, cross-panel status, clear/page/city reset | Emulated elapsed/suspended time and actual UI tested. No background reliability, server monitor, personal notification or rescue claim. |
| T10 Check-in request | Exact neutral WhatsApp draft preview and device checkpoint | No recipient selected and no message sent. External Send and delivery are outside Sakhi. This is a handoff, not a connected helpdesk API. |
| T11 Private city suggestion | Explicit one-shot location permission, local 16-city match, timeout/accuracy/out-of-coverage recovery, invalidation | Browser-emulated location tested in three engines. No raw coordinates sent/saved; a separate Use city action precedes applying a suggestion to an enabled map. Physical GPS/OS behaviour and accuracy not accepted. |
| T12 Crime evidence | Coverage panel, official publication previews, missingness and model limitations | No validated neighbourhood dataset acquired. Crime zones, nighttime scores and named-offender profiles remain unavailable. The reel is inspiration, not data validation. |
| T13 Foreground location | Explicit start/stop, local position/accuracy/time, stale/imprecise/out-of-preview-bounds rejection, cover/background/tool exit and late-callback invalidation | Browser-emulated permission/failure/revocation in three engines. No real device GPS or background accuracy accepted. Public map does not move automatically; approximate bounds are not an exact jurisdiction geofence. |
| T14 Loved-one update | Chosen recipient/neutral message, separate frozen-position choice, exact preview, generation/expiry guard, opening-requested status and clearly unverified user records | Synthetic external handoff intercepted in tests. No real message or delivery observed. Native live-sharing instructions are assistance, not an observed Sakhi tracking service. |
| T15 Discreet controls | Local screen cover, modal cover/exit, neutral title and explicit history/monitoring limitations | Keyboard/UI regression tested. No claim of erasing browser/OS traces or stopping another app's location sharing. |

The map and public-point route estimator are genuine network integrations for public information. There are zero institutional, police, emergency-dispatch or staffed partner integrations. The directory remains7 preview entries; two additional versioned image-abuse guide references bring distinct support entry points to9, all with0 human production approvals. No automatic alert, call, complaint or message was sent. A separately approved recipient handoff may include an explicitly chosen one-time position; merely granting location permission shares nothing with a recipient.

## Verification evidence

The current accepted counts, quality measurements, browser versions, captures and artifact hashes are in [RELEASE_REPORT.md](RELEASE_REPORT.md). `evidence/continuation/` preserves the baseline, reproduced failures, model comparison and final accepted runs separately. Historical239-test and97-score receipts above are superseded by the current report; they do not certify this revision.

Actual public-data probe results are separate from deterministic fixtures. Initial recheck: city/weather/foot/car200, mapped police503 after22.366 seconds. No fixture closes the POI capacity blocker. Production captures use no device position or person contact and audit pre-consent requests, overflow and page errors. Local location/recipient tests use synthetic values and intercepted external handoffs only.

## Release blockers

1. Owned or contracted POI/tile/routing capacity, a budget, shared quotas, provider terms, uptime/error targets and a named incident owner. A single successful route request is not an SLA. The current POI provider failure is a material blocker.
2. Authoritative lawfully usable granular crime data, schema/geography/time reconciliation, suitable denominators, missingness and bias assessment, independent validation and update/correction ownership. Annual counts cannot be disaggregated into invented blocks or used to certify a person’s route.
3. Actual recipient agreements, authenticated endpoints, channel permissions, per-action consent, trained operators and observable acknowledgements before any authority alert or helpdesk is offered.
4. Original P0 safeguarding/contact/native-language/domain approvals, held-out evaluation, consented participant usability, physical devices/AT/zoom/Wi-Fi-off testing and independent security/privacy assessment.
5. Fresh independent code review is now completed in research/p0-independent-review-2026-10-20.md. Its two privacy findings were reproduced and corrected with regression tests. This is not an independent security audit or human safeguarding/source/physical-device approval.

Research and source policies: [research/live-travel-2026-10-20.md](research/live-travel-2026-10-20.md). Specification and scope: [LIVE_TRAVEL_PLAN.md](LIVE_TRAVEL_PLAN.md). Full current report: [RELEASE_REPORT.md](RELEASE_REPORT.md).
