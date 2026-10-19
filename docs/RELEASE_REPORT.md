# Sakhi measured release report

Date: 2026-10-20, Asia/Kolkata. Verdict: **internal_demo_only**. The live-travel revision adds real public-data integrations and a bold pink/black identity. It does not fulfill the requested promise of 10 to 15 flawless production features: live nearby-place availability and granular crime evidence are material external blockers. The [12-workstream status](LIVE_TRAVEL_STATUS.md) separates UI contracts from actual provider outcomes and human approvals.

The old leaf/serif wordmark is replaced with sakhi. in Manrope. The English opening remains40 main words and844px tall at390x844; a tested mobile map action now appears in the first viewport. Detail stays at the relevant choice. No three-second comprehension, crime prediction, safety outcome, partnership or mass-scale readiness is claimed. The previous report and12 checksum-verified artifacts are preserved in [the simplified release archive](releases/simple-2026-10-20/RELEASE_REPORT.md).

## 1. Repository, branch and authority

Local standalone repository:/Users/aloo/KRISEVA_AI/01_PRODUCTS/sakhi, branch build/sakhi-sprint2. No GitHub remote, PR, public tag, hosted deployment or remote CI execution was created. Actual implementation/evidence commits are recorded in evidence/release-checksums.json and Git history. Project code is Apache-2.0; libraries, fonts, geographic data and optional model retain their own licenses.

Original supplied planning files remain under planning/. Previously missing companions were recovered with labels, not described as originals. The founder's later explicit requests authorize optional live public maps/APIs and local city suggestion. They do not approve personal alerts, recipient relationships, offender profiling or waive original human P0 gates.

## 2. Reproducible setup and checks

```sh
cd /Users/aloo/KRISEVA_AI/01_PRODUCTS/sakhi
make setup
make dev
# Alternative production container, bound to loopback 8787:
docker compose up --build
make verify
make quality
# Explicit live public-data smoke, separate from deterministic tests:
PYTHONPATH=. uv run --frozen python scripts/travel_smoke.py --port 8787 --live-public-data
```

Native5173/API8765 and Docker8787 were executed on this Mac. The launcher refuses occupied listeners; no unrelated product listener was replaced. Docker is non-root, read-only, loopback-only with bounded tmpfs and dropped capabilities. No key or automatic model download is required. Host:macOS arm64, Node25.9.0, uv0.11.6, Python3.13.13. Linux browser setup may need npx playwright install --with-deps chromium firefox webkit; Windows native execution and remote CI remain unobserved.

Optional local encoder setup remains explicit: make model, then the documented runtime flag. Its retained benchmark is historical, not rerun for a CSS/map change. Gazetteer refresh is an explicit maintainer action using scripts/import_travel_cities.py --download; setup/startup/tests never download it.

## 3. Working support and travel scope

The original anonymous support journey, four goals, deterministic emergency/minor paths, reviewed-source previews, abstention, source expiry, English fallback, comparison, public kit, community proposal, Clear session and public-only offline shell still pass regression. Initial emergency access does not wait for any map/API.

TravelWorkspace replaces the rendered mock map. Implemented controls include consent/revoke, real OSM map and accessible list, local city matching and public-ID API lookup, four-category POI adapter, public map-point choice, foot/car route geometry, weather/daylight, local checklist/card, page reminder and neutral WhatsApp draft. Actual production probes returned200 for city, weather, walking and driving, but503 for mapped police discovery. Real tiles and weather rendered in the production browser. The [feature matrix](LIVE_TRAVEL_STATUS.md) identifies which claims have live evidence and which only have fixtures or no data.

## 4. P1/P2, incomplete requirements and unavailable capabilities

Original inventory remains68 records:27 P0/35 P1/6 P2, with its prior engineering classifications unchanged by these additional T01-T12 workstreams. Page-only reminders are distinct from private case/deadline automation. The original inventory is not a count of production approvals.

Nearby POI success is unverified because the shared provider is unavailable. Crime zones, nighttime risk scores and named-offender profiles are unavailable because no usable validated granular dataset or model was acquired. Public historical counts were not disaggregated into invented neighbourhoods. The reel was researched as inspiration; no reproducible source code/data or independent accuracy validation was found in the bounded search.

Private vaults, uploads, personal case timelines, voice, individualized safety/legal advice, staffed WhatsApp helpdesk, background monitoring, automatic alerts, appointments, complaints, recipient confirmations and institutional connectors remain unavailable. A prepared draft or map opening never becomes sent/delivered/dispatched. See [release gates](RELEASE_GATES.md) and [research](research/live-travel-2026-10-20.md).

## 5. Directory coverage, four separate counts

| Count | Actual |
| --- | --- |
| Ingested discovery leads |211 |
| Agent-reviewed preview entries |7 |
| Human production approvals |0 |
| Exposed public entry points |7 |

Five learning cards/four source pages remain separate. The new 3,783 GeoNames geographic points are not facilities or service coverage. No live mapped place from the failed API probe is counted as a verified contact. Source checks remain October 19 with November18 expiry; UI work does not renew them. The181 West Bengal exception remains online and offline.

## 6. OSC coverage, four separate counts

The [PIB August5,2026 publication](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1) reports991 operational centres using data through June30,2026. Sakhi has0 individually sourced centres,0 independently verified centre contacts and0 authorized partner integrations. No991-record directory, national crime feed or agency connection was fabricated.

## 7 and 8. Language and retrieval

All16 shells have136 keys; each non-English shell has20 draft navigation translations and116 explicit English fallbacks. New travel text is explicitly English and outside those key counts. All locales, including English, still require qualified native/domain/safeguarding review. Route-evaluation cases and the optional encoder measurements remain in-sample evidence, not production accuracy.

| Locale | Keys | English fallback keys | Human review | Draft routing cases | Lexical route agreement | Model phrases | Model lexical top-3 | Semantic top-3 | Restricted hybrid top-3 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| en-IN | 136/136 | 0 | Pending | 110 | 100% | 44 | 100% | 90.9% | 100% |
| hi-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 100.0% | 100% |
| bn-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| mr-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| te-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| ta-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| gu-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 100.0% | 100% |
| kn-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| ml-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| or-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| pa-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| as-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| ur-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 50.0% | 100% |
| ne-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| kok-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 75.0% | 100% |
| ks-Arab-IN | 136/136 | 116 | Pending | 20 | 100% | 4 | 100% | 50.0% | 100% |

The 410 routing cases are authored/generated in-sample surface variants, not independent observations or expert labels. Default engine: SQLite FTS5/BM25 plus intact Indic word matching and deterministic policy. The current make verify re-executes the 410 in-sample route checks; it does not replace held-out multilingual evaluation.

The retained October 19 optional encoder comparison is separate, in-sample and small: 44 English and 4 per other locale. Model load 1,226ms; query ranking p50 27.7ms, p95 45.4ms on the 24 GiB Mac. Pure semantic top-3 ranged 50-100% across locales. English semantic top-1 was 68.2% and hybrid top-1 77.3%, versus lexical top-1 100% on the authored sample. Several other top-1 samples also underperformed lexical. This is why lexical remains the default and optional embeddings cannot expand approved candidates or control emergencies. No production accuracy or multilingual quality claim follows. Full top-1/top-3 figures and fixture limits are in `evaluation.json` and `model-benchmark.json`. A held-out expert gold set is still required.

## 9. Accessibility, usability, UI/UX and performance

Final make verify: Ruff/structural/readme/build/evaluation gates passed,53 Python tests,20 Vitest checks and239 Playwright cases passed, with2 explicitly unsupported forced-colors emulations skipped.241 browser cases were scheduled. Chromium runs the complete suite; Firefox/WebKit each run 12 interaction contracts plus 23 travel cases. Engines:Chromium156.0.8078.4, Firefox157, WebKit27.2. This is not physical Safari/iOS or AT acceptance.

Checks cover nine required widths, selected RTL/Indic shells, keyboard traversal/focus, semantic structure, font failure,200% font preference/text spacing, reduced/forced-colour states, empty/error/malformed/stale data, consent/revocation, public-point keyboard routing, GPS staying local, cancellation/late results, timer resume/reset, synthetic blocking and public-only offline reload. Source contracts have explicit bounds, timeout, host, redirect and response-size tests. No actual participant comprehension or safety outcome was measured.

Latest measured quality:97 performance/100 accessibility/100 best practices, LCP2322.0ms, CLS0, TBT0ms,236808 transferred bytes. Profile:local production mobile412x823/DPR1.75,150ms RTT,1.6Mbps,4x CPU. Both3s regression and2.5s product LCP goals passed in that run. This run includes the final map-cancellation and explicit city-consent fixes. Lab scores are not field INP, availability or accessibility certification. Physical phones, VoiceOver/TalkBack/Windows AT, actual zoom/orientation, cold Wi-Fi-off and installation remain open.

## 10. Security and privacy

No user account, people database, narrative persistence, analytics, microphone or cloud generation. Only sakhi.locale persists in localStorage. Core narratives use strict same-origin POST processing with sanitized validation and disabled telemetry/access logging. App/API no-store, no-referrer, trusted hosts, self-only scripts/connect and frame denial remain. Same-origin geolocation is now permitted only for explicit one-shot local city suggestion; camera/microphone/payment remain denied. Only OSM tile images are allowlisted externally and use origin-only referrers/anonymous CORS.

Known public city IDs, public map centres/points and selected data fields reach named providers only after their relevant actions. Raw GPS is never serialized. Upstream strings stay text, missing fields stay unknown, errors are sanitized, caching preserves retrieval time, and25-second/1.5 MB/host/quota bounds are enforced. The service worker hashes public assets but excludes API/query/runtime/user data and all external tiles. It has no independent publisher-signing root. Downloads, browser/OS copies and provider logs remain outside app erasure. [Privacy](PRIVACY.md) and [threat model](THREAT_MODEL.md) give exact flows/limits.

Fresh npm audit found0 known vulnerabilities; Python audit and locked dependency inventory are retained with dated artifacts. This is not legal redistribution clearance or an independent penetration test. Model weights remain ignored/outside Docker. Residual risks include abusive devices/operators, unreviewed content/contacts, finite safety phrases, model/route/map inaccuracies, public data tampering, provider outages/logging and future hosting controls. No real call, message, complaint, referral, authority alert or account change occurred.

## 11. Actual screenshots and navigation

Current captures:travel-home-mobile/home-desktop/home-narrow/home-urdu, travel-nearby-consent/nearby-desktop/live-map-mobile, travel-live-conditions-mobile, travel-plan-mobile, travel-checkin-preview, travel-data-mobile, travel-finder/prepare/trust under docs/evidence/. These are real production UI, not mockups or fictional POI records. No private story or device position was captured.

The production capture records9 page/view combinations with HTTP200, no document overflow, no pre-consent outside requests and no page errors, plus an actual public Mumbai map view and weather. Six tile requests returned200. The live API file separately records four200 responses and one503. Regression tests use labelled fictional fixtures and do not count as live availability. scripts/capture-travel.mjs and scripts/travel_smoke.py are reproducible explicit network actions. Earlier simple-/sprint2- images belong to historical revisions.

## 12. Changed files, commits, review and defects

Plan commit4c4b9cf precedes implementation. Changes cover the travel React modules/CSS, wordmark/fonts/icon/tokens, strict API gateway, public city data/provenance, Leaflet dependency/license, public cache generation, tests across three engines, live smoke/capture tools, notices, docs and release evidence. Exact implementation commit and artifact hashes are in evidence/release-checksums.json; no PR exists. Historical reports/evidence are preserved.

Observed/fixed issues include serif CSS precedence, narrow mobile navigation height, map entrance scrolling, consent/revoke focus loss, tile errors becoming false success, stale cache time, malformed solar fields, facility coordinate rounding, late request results, internal-panel reminder resets and the crosshair's canvas anchor. RED logs are historical failures; final gates are separate. The fresh independent review agent failed due exhausted workspace credits, so no new independent signoff is claimed. The old independent review covers an earlier revision only. Remaining defects/dependencies are in LIVE_TRAVEL_STATUS.md and ISSUE_BACKLOG.md.

## 13. Required accounts, permissions and operations

Core internal preview requires no account/key. Mass travel usage needs owned/contracted map/POI/routing capacity, current terms, restrictions/quotas, budget, ingress/security/capacity tests, privacy review and incident ownership. Google APIs would require a founder-owned project, appropriate API enablement, restricted credentials and billing review; none was accessed. Community hosting is not an unlimited or safety-critical backend.

An actual WhatsApp helpdesk or trusted-contact escalation requires eligible accounts/channels, recipient consent/authorization, staffing, per-action approval, reliable transport and real receipt/failure semantics. Police/ERSS/OSC/NCW/SHe-Box/NGO integrations additionally require actual written agreements and approved authenticated endpoints. No such relationship is inferred. Private storage, voice/BHASHINI/models and legal/medical workflows retain their separate design, license, retention and human-quality gates. Crime visualization needs lawfully usable granular source data and independent reconciliation/validation, not generated risk scores. Public GitHub/deployment/CI remains a separate release decision after the gates.

## 14. Verdict

**internal_demo_only**. Real plumbing and independently runnable local tests are delivered. The production promise requested by the founder remains incomplete because the POI source is unavailable, crime-zone evidence is absent and human/operational/security gates remain open. The current preview is for controlled review, not dependable rescue or validated mass-user safety infrastructure. No simulated integration is presented as functional.
