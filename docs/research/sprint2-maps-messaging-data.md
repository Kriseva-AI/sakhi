# Sprint 2: maps, location, messaging and historical crime data

Research date: 2026-10-19, Asia/Kolkata. Researcher: Codex. Status: implementation proposal based on official documentation, not an integration or release receipt. No account was created or changed, no credentials were inspected, and no message, location, complaint or test alert was transmitted.

Local authority read: root and Sakhi `AGENTS.md`, `00_BRAIN/STATE.md`, `docs/SAFETY.md`, `docs/PRIVACY.md`, the master execution prompt and `docs/PROGRESS.md`. The existing T0 contract has no GPS, no persistent people database and no institutional adapters. This document does not silently change that contract.

## Decision

Sprint 2 can provide district selection, a reviewed public-destination map handoff, local message preparation and public-resource sharing without paid keys. A destination link can omit the user's origin, letting the user handle location inside the external map application. A WhatsApp handoff can open a prefilled public-resource or neutral message, but the person must review and press Send in WhatsApp. Neither handoff gives Sakhi a delivery, referral, appointment or dispatch receipt.

Keep embedded maps, browser location and provider messaging disabled in the default T0 build. They are separate opt-in capabilities with separate dependencies. Historical crime material may support a dated research library after file validation. It must not determine personal danger, route choice, offender scores or whether someone deserves emergency help.

## 1. Google Maps options and dependencies

| Option | Documented capability | Account, key and cost boundary | Sprint 2 contract |
|---|---|---|---|
| Maps URLs | Cross-platform search and directions in Google Maps app or browser. | No Google API key. `api=1`, URL encoding and the 2,048-character limit apply. | Default external handoff for a reviewed public destination. [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started) |
| Maps Embed API | An interactive map in an iframe, including place and directions modes. | Google Cloud project, enabled API and API key setup. Embed usage is currently no charge, with unlimited requests. No charge does not mean no account or no external data flow. | Optional later adapter. Do not insert an iframe on startup. [Overview](https://developers.google.com/maps/documentation/embed/get-started), [setup](https://developers.google.com/maps/documentation/embed/get-api-key), [billing](https://developers.google.com/maps/documentation/embed/usage-and-billing) |
| Maps JavaScript API | Programmatic interactive map UI. | Enabled billing and authenticated configuration; usage has product-specific SKUs. | Not required for the first functional local release. [Usage and billing](https://developers.google.com/maps/documentation/javascript/usage-and-billing) |
| Routes API | In-app route and route-matrix calculations. | Billing enabled; API key or OAuth token. Compute Routes is charged per request and matrices per returned origin-destination element, with feature-dependent SKUs. | Disabled. External directions meet the immediate discovery need. [Setup](https://developers.google.com/maps/documentation/routes/get-api-key), [billing](https://developers.google.com/maps/documentation/routes/usage-and-billing) |
| Places API (New) | Place search, details and related discovery. | Billing enabled and key or OAuth. Requested fields can change the billed SKU. | A Google result is a map listing, not a vetted support partner or proof of service availability. [Usage and billing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing) |

The pricing pages were read on 2026-10-19. Several show a 2026-10-16 update. This proposal deliberately does not promise a permanent free allowance or quote a rupee tariff. The account owner must review the applicable current price list, India eligibility, quotas and fees before enabling paid APIs. The Places page also contains an expired 2025 credit statement in its generated summary, so that statement must not become a current pricing claim.

Google requires key restrictions appropriate to the application and the APIs used. A future browser key needs website restrictions and the smallest API allowlist. A service credential belongs on the server with appropriate restrictions; putting a server key in public JavaScript is unacceptable. A browser-visible Maps key is still an account credential whose restriction configuration matters. This research did not create or inspect any key. [Google Maps Platform security guidance](https://developers.google.com/maps/api-security-best-practices)

### Terms, privacy and offline implications

Google Maps Platform terms require relevant end-user terms/privacy notices, attribution and express, prior, revocable location consent. They restrict scraping and caching and acknowledge collection of search terms, IP addresses and coordinates. They also restrict use for High Risk Activities. A public destination-discovery feature must not be marketed as a safety-critical emergency system. Account owner and counsel review are needed before any materially different use. [Current Google Maps Platform terms, sections 3.2 and 4.4](https://cloud.google.com/maps-platform/terms)

Places-specific policies limit storage, allow the documented Place ID exception and require attribution. Places content displayed on a map must follow the applicable Google-map requirements; content without a map has attribution obligations too. Do not bulk copy Google's listings into the Sakhi provider registry or its offline cache. Independently sourced public institution records must retain their own provenance. [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies)

Google documents API request logging, including identifiers and requesting IP addresses. Loading a map SDK or iframe therefore changes the current same-origin-only promise. A user-approved map feature requires an updated privacy notice, destination preview, origin allowlist/CSP review, and a provider-specific service-worker exclusion. Never send the user's story, case reference, identity or suspect details in a map query. [Google Maps Platform data handling](https://developers.google.com/maps/security/compliance/security-compliance)

Google's route documentation warns that walking, cycling and two-wheeler routes may omit suitable paths and requires a warning when those routes are displayed in the application. This is another reason a route result cannot be described as protection from violence. [Routes travel modes](https://developers.google.com/maps/documentation/routes/vehicles)

### No-key handoff contract

1. Accept a curated `resource_id` or a manually chosen district. Resolve only an already reviewed public destination name/address and, if lawfully obtained and reviewed, a Place ID. Missing coordinates or Place ID do not justify inventing them.
2. Build the URL locally with `URL` and `URLSearchParams`. Allow only `https://www.google.com/maps/search/` or `https://www.google.com/maps/dir/`. For search use `api=1&query=<public destination>`; for directions use `api=1&destination=<public destination>`. Omit `origin`, precise user coordinates, story and case identifiers.
3. Show provider, public destination and exact data to be sent. State that opening Google Maps uses Google's service and privacy policy. Do not prefetch, preconnect, resolve a link through a tracking service or load a preview image from Google.
4. Open only after a fresh user click, with opener/referrer protections. User cancellation sends nothing from Sakhi. Opening the destination is recorded, if needed, only in temporary app memory as `external_open_requested`; never as `route_verified` or `arrived`.
5. Keep manual destination text available if the app/browser cannot open the map. Keep 112 visible throughout. Map availability cannot gate emergency contact rendering.

These URL parameters and the ability to leave origin unspecified are documented by [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started). The privacy restrictions and product states above are Sakhi design choices.

An alternative is a reviewed link to the OpenStreetMap website for a public place. Its own browsing documentation describes public name search and map viewing. This remains an external website handoff, not a local map engine. [OpenStreetMap browsing](https://wiki.openstreetmap.org/wiki/Browsing)

OpenStreetMap data availability must not be confused with unrestricted use of OSM Foundation hosting. Its public tile service requires attribution, identification, compliant caching and forbids offline prefetch/bulk downloading. It offers no SLA and says not to submit personal or confidential data. Nominatim's public policy limits request rates, forbids client-side autocomplete and says not to submit personal or confidential material. A Leaflet installation alone supplies neither a lawful unlimited tile service nor routing. A real offline map needs lawfully obtained data, attribution and self-hosting or a provider that expressly permits offline packaging. [OSMF tile policy](https://operations.osmfoundation.org/policies/tiles/), [Nominatim policy](https://operations.osmfoundation.org/policies/nominatim/)

## 2. Foreground browser location

`getCurrentPosition()` requires a secure context and user permission and can be blocked by Permissions Policy. It offers timeout, cache-age and accuracy-preference options. Setting `enableHighAccuracy: false` is an efficiency preference, not a promise that the browser returns only coarse data. [MDN API reference](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)

The W3C specification gives no guarantee of the device's actual location. Its current algorithm limits position updates to fully active visible documents, so a web PWA must not promise continuous background tracking after a tab is hidden, phone is locked or app is closed. Its privacy guidance calls for purpose limitation, disposal after the task and express permission before retransmission. Browser permission lifetimes vary. A grant to read location is not consent to send it to Google, WhatsApp, a friend or an authority. [W3C Geolocation, sections 1, 3 and 6](https://www.w3.org/TR/geolocation/)

Proposed later beta contract, disabled until the privacy and safeguarding review changes the current no-GPS contract:

| Boundary | Required implementation |
|---|---|
| User initiation | A separate button explains the exact purpose and has an equally usable manual district alternative. No permission request on load, during emergency routing or because a user typed a narrative. |
| Collection | One `getCurrentPosition` request with `enableHighAccuracy: false`, `maximumAge: 0`, finite acquisition timeout. No `watchPosition`, periodic refresh, service-worker location request or IP-derived location fallback. |
| Foreground | Check document visibility before requesting; invalidate the request if the page hides, session clears or task ends. Ignore late callbacks using an operation token. A pending one-shot request has no returned watch ID to cancel. |
| Minimization | Transform transient coordinates locally to a reviewed coarse locality if suitable local boundary data exists. Rounding coordinates is not a reliable district lookup and is not anonymization. Keep no route history. |
| Retention | Coordinates exist in memory for the immediate task only. Clear on cancel, clear-session, hide and expiry. No URL, backend request, logs, analytics, localStorage, IndexedDB, cache, error report or fixture gets coordinates. Browser/OS data remains outside this app deletion guarantee. |
| Uncertainty | Display source time and reported accuracy when showing a reading. Denied, unavailable, stale, implausible or inaccurate results return to manual selection without guessing a district or destination. |
| Sharing | No default share. A new reviewed action must name the recipient and include the exact payload. The default Maps URL path does not need Sakhi to collect user location at all. |

The numeric timeout/expiry, local boundary asset and review owner must be fixed in the implementation ADR before the flag can be enabled. A permission prompt or a browser-emulated position is not a field-readiness test.

## 3. WhatsApp and personal connections

### User-controlled handoff

WhatsApp's official click-to-chat feature opens a chat with an active WhatsApp number in international format. A `text` parameter prepopulates the text field. It does not document automatic sending or a callback to Sakhi. [WhatsApp Help Center: click to chat](https://faq.whatsapp.com/5913398998672934)

Implement only these truthful states: `draft_ready`, `preview_open`, `external_open_requested`, `cancelled`. In this mode `sent`, `delivered`, `read`, `provider_accepted` and `police_dispatched` are unavailable. Copying or opening a draft must not create them. User-entered notes about sending, if ever introduced, must be labelled user-reported.

Current T0 sharing should carry public resource cards or a short neutral message, not sensitive narratives. A prefilled `wa.me` message is in a URL sent to an external service and may persist in browser history. Therefore the existing no-sensitive-story-in-URLs rule rules out passing an incident narrative, victim name, exact private address or precise user location through `?text=`. A later reviewed private-message flow can prepare text locally and let the user explicitly copy and paste it into their chosen application. Clipboard contents and the recipient's copies cannot be erased by Clear session.

Do not read the address book, infer trusted relationships, import WhatsApp contacts, use a personal account session as an API, automate WhatsApp Web or loop across recipients. No institution phone number becomes a WhatsApp endpoint merely because it is publicly listed. Selecting a contact is not proof that person is trusted, available or willing to help.

Proposed handoff input: `{channel: "whatsapp", recipient: "user_selected_number", content_kind: "public_resource" | "neutral_message", body: string}`. Construct an allowlisted `https://wa.me/` URL locally only after format validation. Preserve international digits and never guess the country code. Present the full recipient and text, permit edit/cancel, and require the person to press Send inside WhatsApp. Approval expires on any edit, recipient change or session clear. A `wa.me` number does not prove account ownership or deliverability.

### Cloud API is a separate provider deployment

Meta's own API collection lists a business portfolio, WhatsApp Business Account, business phone number and access token, with `whatsapp_business_management` and `whatsapp_business_messaging` permissions. This is business messaging, not permission to send from the user's personal WhatsApp account. Test resources are separate from production. [Meta's official WhatsApp Cloud API collection](https://www.postman.com/meta/whatsapp-business-platform/collection/wlk6lh4/whatsapp-cloud-api)

The current Business Messaging Policy, updated 2026-09-23, requires recipient opt-in, opt-out handling and accurate identity/affiliation. Initiation requires approved templates; replies without templates are limited to the 24-hour customer-service window. The policy also explicitly prohibits Business Platform use by law enforcement agencies, military services, and national security/intelligence agencies. This is not evidence that a particular authority accepts citizen alerts over a Sakhi business sender. [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/policy/)

Meta's webhook reference requires a reachable HTTPS endpoint with a valid certificate and subscription to the relevant WABA. It distinguishes transport `sent`, `delivered`, `read` and `failed` events. None is a police dispatch, a complaint registration or a provider acceptance. [Meta's official webhook reference](https://www.postman.com/meta/whatsapp-business-platform/folder/tduohwq/webhook-payload-reference)

Production gating must include a named account owner, permitted business use, applicable provider/recipient agreements, consent evidence, secure server-side token storage, approved templates where required, validated webhook authenticity, replay/idempotency handling, failure/timeout states, human escalation and retention rules. Delivery events must match the exact outbound message ID and recipient. A Graph API acceptance is not delivery. Localhost alone is not an externally reachable webhook service.

The platform currently charges per delivered message according to market and category, with specified free-use conditions. The actual deployment can also have hosting and solution-provider costs. Test numbers or a no-charge service window do not justify a free-production promise. [Official platform pricing](https://whatsappbusiness.com/products/platform-pricing/)

Do not enable this adapter through ordinary application startup. Founder-owned account, billing and credential decisions remain outstanding. No production send or provider relationship was verified in this research.

## 4. Public Indian crime data: what exists and what was verified

| Source | Period and spatial unit actually evidenced | Verification and appropriate use |
|---|---|---|
| [NCRB Crime in India landing page](https://www.ncrb.mha.gov.in/crime-in-india.html) | The page currently identifies 2024 as the latest edition. It describes annual collection through state/district crime records bureaux, separate large-city reporting and some district tables. Scope includes registered cases and disposal. | Live landing-page text read. Current report-table files and row schemas were not acquired or reconciled. Do not claim a complete 2024 district data feed. Suitable starting point for a maintainer's publication library. |
| [OGD district crimes against women](https://www.data.gov.in/catalog/district-wise-crimes-committed-against-women) | Official indexed metadata lists annual 2001 to 2012, 2013, 2014 and 2015 resources. Notes identify police districts and special units, which can differ from revenue districts. | Discovery metadata, not an imported dataset. The current page rendered no resource results and a sandbox warning. The 2013 resource's later metadata-update date does not make its observations recent. |
| [OGD district IPC crimes](https://www.data.gov.in/catalog/district-wise-crimes-under-various-sections-indian-penal-code-ipc-crimes) | Indexed official catalog metadata lists annual 2001 to 2012, 2013 and 2014 district aggregates across IPC categories. | Same distinction between observation year and publication/update year. No street coordinates or live events evidenced. Raw CSV completeness not validated here. |
| [OGD Akola police-station crime/performance catalog](https://data.gov.in/catalog/police-station-wise-crime-and-service-performance-statistics-akola) | Catalog describes 2025 police-station totals and performance fields for Akola; published 2026-01-09, updated 2026-01-10. | Official metadata discovery only. Its rendered page also carries a sandbox disclaimer. A single local catalog is not nationwide police-station coverage and contains no evidenced live incident stream. |

NCRB's landing page has a footer update date that is not a reliable observation date for every linked publication. The file's title page, reporting period, definitions and table notes must control any imported record. Metadata was sufficient to rule out live-route use; it was not sufficient to certify a current downloadable dataset.

The OGD help page provides API-key generation to registered users. A catalog displaying an API button is not proof of a working, anonymous API or a live institutional integration. Prefer a lawful, reviewed public download for a reproducible offline research snapshot when available. Use a separately configured maintainer API only if its resource, terms, pagination and key requirements are verified. No registration, key generation or CAPTCHA bypass was attempted. [OGD help](https://www.data.gov.in/help)

The Government Open Data License permits specified reuse of licensed shareable data with attribution and non-endorsement obligations, excludes personal/sensitive information, and makes no warranty of accuracy or continued updates. Check the individual record's licence, preserve provider/title/version/URL and do not imply government endorsement. A public PDF is not automatically an unrestricted data licence. [GODL India](https://data.gov.in/Godl), [OGD terms](https://www.data.gov.in/terms-of-use)

### Why historical police records cannot certify route safety

This is a methodological conclusion from the sources, not a validated Sakhi prediction model:

- Registered offences are a selected administrative record. Unreported experiences and incidents not registered in that system are outside that count. MHA has specifically explained that easier reporting and e-FIR registration may contribute to higher recorded numbers, so more records need not mean a more dangerous place. [MHA Lok Sabha answer 374, 2019-11-19](https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/ls-19112019/374.pdf)
- The official NFHS-5 Himachal Pradesh report includes women who experienced physical or sexual violence but never sought help or told anyone. This illustrates non-disclosure in a defined survey population. It is not a national crime-underreporting rate and must not be used as a multiplier for police counts. [Government NFHS-5 state report, Help seeking](https://www.nhm.hp.gov.in/storage/app/media/uploaded-files/NFHS-5_%20Himachal_Pradesh.pdf)
- Annual district counts cannot locate a current threat on a road segment or hour. Assigning them to a district centroid or spreading them along streets fabricates precision. Police and revenue districts, special police units and boundary changes complicate joins.
- Counts, persons, victims, cases registered and case disposals are different measures. Population size and exposure differ. A population rate still does not estimate the danger to this person on this journey. Missing records must remain missing, never become zero crime or green safety.
- Offence definitions and recording systems can change. MHA confirms the new criminal laws came into force on 2024-07-01, with specified exceptions. IPC-era and BNS-era categories must not be treated as a seamless series without an explicit reviewed crosswalk. [MHA Lok Sabha answer 2401, 2024-12-10](https://www.mha.gov.in/MHA1/Par2017/pdfs/par2024-pdfs/LS10122024/2401.pdf)
- Records provide no evidence of today's lighting, staffing, accessibility, road closure, immediate threat or recipient availability. Absence of a recorded incident cannot establish safety; a registered allegation cannot establish an individual's guilt.

Accordingly: no crime-derived route ranking, hotspot warnings aimed at an individual's movement, offender database, suspect scoring, red/green safety map or claim of crime prevention. An educational table may say: "Registered cases reported by [source] for [area] in [year]. These historical administrative records do not describe current danger or route safety."

### Public-data ingestion contract

Keep any future crime dataset in a maintainer research path, separate from support routing. Until raw-file review passes, its status is `official_metadata_found`, not `data_verified`.

Required provenance: `provider`, `catalog_url`, `resource_url`, `source_title`, `source_publication_date`, `observation_period`, `retrieved_at`, `sha256`, `licence_url`, `geographic_unit_type`, `geographic_label_original`, `boundary_version`, `offence_definition_original`, `legal_code_version`, `measure_type`, `unit`, `value`, `missingness_code`, `table_notes`, `reviewer` and `review_status`.

Validate file/schema, number parsing, totals and special units; prevent double-counting totals plus components; retain blanks, suppressed values and unavailable categories; reconcile any boundary mapping and denominators; record revisions. Exclude personal/incident-level identifying data. Do not scrape CCTNS, a login-only police dashboard, private FIR details or sensitive material. No synthetic numeric records should wear an official-data label. A research source link can be functional before ingestion; a fabricated heatmap cannot.

## 5. Authority alerts and release acceptance

Keep the existing user-clicked 112 dialler pathway visible before retrieval, location, login or map loading. The official MHA record identifies ERSS 112 as a public assistance system. This research found no authorized Sakhi dispatch API, recipient agreement or observed agency acknowledgement. [MHA answer on support pathways, 2021-03-24](https://www.mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/rs-24032021/3268.pdf)

A proposed alert-to-authority flow must stay `needs_partner_authorization`. A public number, Google listing, successful URL open, HTTP 200 or WhatsApp delivery event cannot establish emergency intake authority. Do not ask a person to wait for Sakhi to contact someone. Do not forward a location to an unverified recipient. Complaint portals remain user-operated handoffs with their own identity, OTP and CAPTCHA rules.

| Capability | Can be built and verified locally now | Remaining external/user dependency |
|---|---|---|
| Manual district/service discovery | Deterministic selection against reviewed public records, no GPS. | Real local records, expert review and freshness maintenance. No coverage inflation. |
| Public destination map link | URL construction, exact preview, cancellation and default no-origin behavior. | Person opens external map; map/network availability remains external. |
| Public-resource or neutral WhatsApp draft | Local preview, recipient entry and URL construction. | Person's WhatsApp session and explicit Send. Delivery unobserved by Sakhi. |
| Sensitive personal message | Local preparation only within an approved private-flow scope. | Safeguarding/privacy review and explicit copy/share action. No story in URLs. |
| Browser position | Synthetic permission/error testing only while feature disabled. | Reviewed opt-in beta contract and real-device foreground/permission tests. |
| Embedded Google map or Routes/Places API | Adapter interface and disabled state. | Owner's account, permitted use, key/auth, billing where required, privacy/CSP changes and live verification. |
| Cloud API messaging | Disabled adapter contract and synthetic webhook fixtures. | Meta setup, permissible use, recipient consent, template rules, HTTPS webhook, production security and fees. |
| Historical crime library | Source receipts and parser contract. | Actual licensed file acquisition, schema/methodology review and dated data QA. No route prediction. |
| Institution referral or authority alert | Clear unavailable state and public user-directed alternatives. | Written permission, verified recipient/channel, appropriate agreement, trained operations and an audited real response. Not satisfied here. |

Acceptance tests for implementation: zero provider requests and permission prompts at startup; 112 available with APIs offline; map URLs contain only approved public destination fields; narrative/location never reaches URLs, storage, logs or SW cache; edited previews require renewed approval; denial/timeout/cancel remains usable; synthetic mode cannot call/open/send; `wa.me` opening never sets sent or delivered; no fake provider acknowledgements; no crime measure affects emergency routing, provider eligibility or route safety. Full project `make verify` remains the implementing agent's release gate. These are proposed tests, not a claim they ran in this research task.

## Source access limits and freshness

All citations are official provider documentation, provider-maintained documentation, government publications or the OSM project's own policies. Meta's developer pages returned rate-limit errors during this pass, so setup/webhook facts use Meta's own Postman workspace, corroborated by its official business policy and developer hub. Some OGD facts were available in official indexed metadata while their live pages rendered empty or sandbox states. Those facts are explicitly discovery-only. The national NFHS PDF was not accessible; only the cited official state-report extract is used, with no national extrapolation.

This is a 2026-10-19 research snapshot. Recheck commercial terms, policy eligibility, dataset files and institution contact evidence immediately before enabling an adapter or publishing any integration claim.
