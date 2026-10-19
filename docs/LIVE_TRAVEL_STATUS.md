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

The map and public-point route estimator are genuine network integrations for public information. There are zero institutional, police, emergency-dispatch or staffed partner integrations. The source-reviewed directory remains7 preview entries,0 human production approvals. No automatic alert, call, complaint or message was sent.

## Verification evidence

`verify-travel-final.log`:53 Python,20 Vitest and239 Playwright cases passed,2 explicitly unsupported forced-colors emulations skipped. The complete Chromium suite and35 cases each in Firefox/WebKit (12 interaction contracts plus 23 travel cases) were scheduled. Only the forced-colors case is skipped in each secondary engine. Fixtures never substitute for live probe results.

`quality-gate.json`: local mobile lab97 performance /100 accessibility /100 best practices, LCP2322.0ms, CLS0, TBT0ms,236808 transferred bytes in the recorded run. Field INP, physical assistive technology and mass-scale operations remain unmeasured. The final map-cancellation and explicit city-consent fixes are included in this refreshed run.

`travel-live-api.json`: five real public-data requests, four200 and one503, with raw public responses and durations. `travel-live-tile-receipt.json`: production captures, six actual tiles, before-consent network audit and page-error/overflow checks. `travel-*.png`: actual production UI, with no fictional POI results presented as live data. Live probe and capture scripts are explicit opt-in maintainer commands, never invoked at startup or in make verify.

## Release blockers

1. Owned or contracted POI/tile/routing capacity, a budget, shared quotas, provider terms, uptime/error targets and a named incident owner. A single successful route request is not an SLA. The current POI provider failure is a material blocker.
2. Authoritative lawfully usable granular crime data, schema/geography/time reconciliation, suitable denominators, missingness and bias assessment, independent validation and update/correction ownership. Annual counts cannot be disaggregated into invented blocks or used to certify a person’s route.
3. Actual recipient agreements, authenticated endpoints, channel permissions, per-action consent, trained operators and observable acknowledgements before any authority alert or helpdesk is offered.
4. Original P0 safeguarding/contact/native-language/domain approvals, held-out evaluation, consented participant usability, physical devices/AT/zoom/Wi-Fi-off testing and independent security/privacy assessment.
5. Fresh independent code review. The requested review agent failed because its workspace credits were exhausted. No independent review signoff for this revision is claimed.

Research and source policies: [research/live-travel-2026-10-20.md](research/live-travel-2026-10-20.md). Specification and scope: [LIVE_TRAVEL_PLAN.md](LIVE_TRAVEL_PLAN.md). Full current report: [RELEASE_REPORT.md](RELEASE_REPORT.md).
