# Sakhi measured release report

2026-10-20, Asia/Kolkata. Verdict: **internal_demo_only**. P0 engineering recovery is implemented and the accepted local gates pass. Public launch remains blocked by human source/safeguarding/language reviews, physical accessibility/offline acceptance, security/operations ownership and reliable provider capacity. Nearby discovery still returned an actual 503. No fixture is used to close an external dependency.

The opening has one primary action, concrete finder choices, bold pink/black typography and three contextual visual cues on every page. All nine pages were captured and visually inspected at mobile and desktop sizes. Four-second comprehension is a research target, not an observed result. The original report is preserved in [the pre-recovery archive](releases/pre-recovery-2026-10-20/RELEASE_REPORT.md).

## 1. Repository, authority and release scope

Repository: `/Users/aloo/KRISEVA_AI/01_PRODUCTS/sakhi`, branch `build/sakhi-sprint2`. Baseline `fc74056`; recovery commits `d440ef4`, `4dd9129`, `f1fcdfb`. The final documentation/evidence commit follows these in local history. No remote, PR, public tag, hosted deployment or remote CI run was created. Code is Apache-2.0; dependencies, fonts, geographic data and optional model weights retain their own terms.

Root/product instructions, company state, master prompt, all referenced planning companions, 211 catalog rows and existing progress/live/release evidence were read before implementation. Baseline services and broken paths were reproduced before changes. [Blocker register](BLOCKERS_2026-10-20.md), [execution plan](CONTINUATION_PLAN_2026-10-20.md), [ordered 20-priority audit](PRIORITY_AUDIT_2026-10-20.md), [official-source/tool research](research/p0-recovery-2026-10-20.md).

The request authorizes local engineering, optional foreground location and consented user-opened recipient drafts. Location permission alone authorizes no transmission. It does not authorize automatic alerts, private-story transmission, institutional relationships or waive human release gates. The user's untracked next-chat prompt remains untouched.

## 2. Reproducible setup and accepted checks

```sh
cd /Users/aloo/KRISEVA_AI/01_PRODUCTS/sakhi
make setup
make dev
# Alternative production preview, bound to loopback 8787:
docker compose up --build
make verify
make quality
# Explicit actual public Mumbai probes, separate from fixture tests:
PYTHONPATH=. uv run --frozen python scripts/travel_smoke.py --port 8787 --live-public-data
# Actual UI captures, no position or message:
node scripts/capture-recovery.mjs
```

Native setup/dev and Docker were run on this Mac. The final container was rebuilt from `f1fcdfb`, is healthy on [127.0.0.1:8787](http://127.0.0.1:8787/en-IN/), and all 41 runtime assets match the final public manifest. [Production provenance](evidence/continuation/production-provenance.json). Docker is non-root, read-only, loopback-only with bounded tmpfs and dropped capabilities. Only owned Sakhi processes were managed; other product/demo listeners were left running.

Host: macOS arm64, Node 25.9.0, uv 0.11.6, Python 3.13.13, 24 GiB RAM. Linux contributor CI and native Windows execution remain unobserved. Core startup needs no credentials/model download. Optional encoder download and gazetteer refresh remain explicit maintainer actions, not startup operations.

Accepted final source gate: [verify-final-accepted.log](evidence/continuation/verify-final-accepted.log). Accepted final production performance: [quality-final.log](evidence/continuation/quality-final.log). Docker rebuild: [docker-final-accepted.log](evidence/continuation/docker-final-accepted.log). Intermediate failed/red runs are diagnostic history and are not passing evidence.

## 3. Working P0 journeys and actual states

| Journey | Delivered behavior | Evidence and limits |
| --- | --- | --- |
| Immediate help | Static HTML 112 before application JavaScript; deterministic urgent/minor path before API; emergency path bypasses general navigation budget | JavaScript disabled, bundle blocked, network failure and API policy tests; no real call was placed |
| Under 18 | Specific MWCD Child Helpline source, optional online concern clarification and age-appropriate conditional image guidance; no adult intake, image upload or private text | Local/browser tests; human safeguarding review pending |
| Online abuse | Accounts/threats versus intimate images; relevant image-creation age clarification; Take It Down / StopNCII eligibility kept conditional, including declined age; India cybercrime/child/legal alternatives | Official sources dated October 20, November 19 review deadline; no eligibility or takedown outcome invented |
| Discreet use | Local Notes cover, neutral title, accessible Hide/exit inside dialogs; quick exit clears synchronously before navigation | Cover, modal, stale callbacks and cancelled-navigation-boundary tests; browser history/monitoring cannot be erased |
| Prepare a loved-one update | Memory-only chosen recipient and fixed neutral message; exact preview, consent and device checkpoint; user opens WhatsApp and decides Send there | Draft, opening requested, sent/user reported, delivered unobserved and acknowledgement/user reported stay distinct; no actual message sent |
| Foreground location | Explicit local reading with accuracy/time; separate one-time snapshot selection; no automatic recenter/share; stale/poor readings rejected within documented bounds | Emulated permission, expiry, late callback, background/cover/tool-change/unmount/revoke tests; no physical GPS acquired |
| Meaningful live sharing alternative | Provider-sourced native WhatsApp recipient/duration/Send/Stop guidance and call/check-in fallback | Sakhi neither starts nor monitors native live sharing; a snapshot link is never called a live stream |
| Nearby recovery | 12-second cancellable browser wait, visible category-specific manual Maps search preview and public-point routes | Failure/retry/cancel tests; actual POI provider still unavailable |
| Progress/privacy | Anonymous reversible steps, temporary checklist and page reminder; explicit language persistence/removal; no startup storage write | Clear/reload/cancellation/storage tests; no account, case vault or background service |

Real map/city/weather/foot/car adapters remain optional. The latest production probe used public Mumbai coordinates only:

| Endpoint | HTTP | Elapsed |
| --- | --- | --- |
| City | 200 | 683 ms |
| Weather | 200 | 574 ms |
| Police places | **503** | **22,363 ms** |
| Walking route | 200 | 635 ms |
| Driving route | 200 | 653 ms |

[Raw final live API evidence](evidence/continuation/live-api-final.json). The browser stops waiting sooner than the bounded server provider deadline. Successful individual calls do not establish capacity, contact accuracy, opening hours, safety or an SLA. Actual tile/browser-weather evidence from the preceding travel revision is retained separately and is not relabelled as a new observation.

## 4. Incomplete P0 gates and P1/P2 work

The original 68-feature inventory remains 27 P0 / 35 P1 / 6 P2 candidate records, not 68 working or approved features. Additional recovery work does not reclassify those priorities. [Release gates](RELEASE_GATES.md) and the ordered audit distinguish implementation from human/operational acceptance.

OPEN: reliable owned/contracted map/POI/routing capacity, source/contact verification, all language and safeguarding reviews, physical AT/phone/zoom/installation/cold Wi-Fi-off acceptance, consented comprehension studies, independent security/hosting review and named incident/source/operations owners. Working alternatives are national official entry points, manual Maps search after preview, public preparation, local drafts and controlled review.

Unavailable: private document/case vaults, uploads, personal legal drafts/timelines, voice, individualized safety/legal advice, automatic monitoring/background reminders, staffed helpdesk, provider appointments, complaints/referrals, delivery receipts and institutional dispatch. Generic preparation/checklists are usable; they do not imply a private document workflow.

Granular crime zones, offender profiles and safe-route guarantees remain unavailable. No validated lawful granular dataset or independent missingness/bias validation exists. Historical aggregates cannot establish neighbourhood safety. No staffing, agreements or institutional endpoints were fabricated.

## 5. Directory and supplemental coverage

| Count | Actual |
| --- | --- |
| Ingested discovery leads | 211 |
| Source-reviewed directory preview entries | 7 |
| Additional conditional image-guide references | 2 |
| Distinct exposed support references in scope | 9, of which 7 are directory entries |
| Human production approvals | 0 |

The child directory source was refreshed October 20, expires November 19. The other six directory receipts remain October 19 with November 18 expiry; UI changes do not renew them. The two supplemental sources are versioned separately in `data/public-seeds/support-guides.json`, checked October 20 with November 19 review deadlines. The maintenance top-line API metrics cover the seven directory records and explain the two additions separately. HTTP/source inspection does not establish live service acceptance. The 181 West Bengal exception remains online/offline.

Five learning cards/four general source pages are separate educational references. The 3,783 GeoNames geographic points are not verified facilities. No failed POI response is counted as a contact.

## 6. OSC coverage

The [PIB August 5, 2026 publication](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1) reported 991 operational centres using data through June 30, 2026. Sakhi holds **0 individually sourced centre records, 0 independently verified centre contacts and 0 authorized institutional integrations**. No 991-entry directory or national API connection was invented.

## 7. Language status

All 16 shells have 136 keys. Each non-English shell has 20 draft navigation translations and 116 explicit English fallbacks. New preparation, travel, recovery and supplemental guide text is English and outside that key count. Every locale, including English, needs qualified native/domain/safeguarding signoff. Glyph/RTL checks are not language quality approval.

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

The table's model figures are retained October 19 in-sample encoder evidence, not rerun or promoted by this continuation. They are not multilingual production accuracy.

## 8. Held-out model comparison and retrieval

Default remains deterministic emergency safeguards plus local SQLite FTS5/BM25 and intact Indic word matching. The full gate reran the 410 authored/generated in-sample routing variants. A separate frozen 16-case English author-labelled holdout was evaluated without subsequent tuning on already installed local Ollama models:

| Candidate | Route agreement | Median request time |
| --- | --- | --- |
| Deterministic/local default | 16/16 | 0 ms, rounded |
| gemma3:4b | 13/16 | 431 ms |
| qwen3.5:9b-q4_K_M | 14/16 | 491.5 ms |

[Raw holdout cases, hashes, errors and timing](evidence/continuation/heldout-models.json); `scripts/heldout_reasoning.py`. No download/startup/cloud request was needed. This small classification comparison is not general reasoning quality, expert gold, bias validation or multilingual acceptance. Neither generative model was added to runtime. Optional historical EmbeddingGemma ranking remains disabled by default, restricted to lexical candidates and unable to control emergency policy or invent services. [Historical encoder results](evidence/model-benchmark.json).

## 9. Accessibility, UI/UX and performance

Final `make verify`: **54 Python, 20 Vitest and 315 browser tests passed; 2 unsupported forced-colors emulation cases skipped**, 317 browser cases scheduled, zero unexpected/flaky cases. Ruff, structural checks, README links, build and 410 in-sample evaluation passed. One existing Starlette/httpx deprecation warning remains. [Raw browser results](evidence/continuation/browser-results-final.json).

Chromium runs the complete suite; Firefox/WebKit run pillar, travel, recovery and location contracts. The quick-exit navigation-boundary diagnostic is Chromium-specific. Nine required widths, selected Indic/RTL shells, keyboard/focus, axe, text spacing, font failure, 200% font preference, reduced/forced-colour states, offline reload, stale packs, cancellation and no automatic external requests are covered. Permission/expiry/background tests use emulated public positions. None is physical Safari/iOS/AT certification.

Latest `make quality`: **97 performance / 100 accessibility / 100 best practices; LCP 2560.3 ms, CLS 0, TBT 0 ms, 261,345 transferred bytes**. Local production Lighthouse profile: 412x823/DPR 1.75, 150 ms RTT, 1.6 Mbps, 4x CPU. The 3000 ms regression budget passed. The separate 2500 ms LCP product goal was missed by 60.3 ms; no rerun was used to select a better score. Lab scores are not field INP, provider availability, low-end phone or human accessibility acceptance.

## 10. Privacy, abuse prevention and security

No accounts, narrative persistence, analytics, cloud generation, contact import, microphone or private database. Only an explicitly selected language preference can persist, and its removal survives reload. Recipient/position/draft fields stay in page memory. Clear, cover, background, expiry and route/tool exit revoke relevant state. The sensitive destination checks its current generation and expiry again at activation, including auxiliary/context actions.

Location acquisition is separate from selecting a one-time snapshot, separate from approving a recipient/content preview, and separate from opening another app. Once explicitly opened, WhatsApp receives the selected phone, fixed message and any approved snapshot; browser/OS/provider copies are outside Sakhi erasure. Native live sharing must be stopped in that app. An opening request is not confirmation that an app launched, Send occurred or a message arrived.

Same-origin POST narratives use strict schemas, sanitized errors and no access logging. General navigation has a process-local 120/minute budget storing timestamps only; deterministic urgent/minor paths bypass it. Public gateway bounds remain fixed hosts, four categories, size/redirect/quota restrictions and 25-second server deadlines. Browser recovery uses a 12-second cancellable wait. Shared ingress, capacity and abuse controls are still required before hosting.

The hash-checked offline cache excludes APIs, queries, private fields and external tiles. It has no independent publisher-signing root. Static emergency HTML survives a blocked bundle, but a new unvisited device still needs the application/contact information to have loaded. Finite safety phrases cannot reliably detect every emergency. Approximate position bounds are not an exact jurisdiction polygon. External maps/routes do not guarantee safety.

Dependency audit artifacts from the preceding travel revision remain dated observations; no dependency was added in this recovery. They were not rerun as independent security approval. A fresh bounded independent code review did occur and found two defects, corrected as described below. Security/content/AT approval and incident staffing remain OPEN. No credentials were opened, and no real call, message, complaint, private narrative or device position was transmitted.

## 11. Final actual screenshots and navigation

[Production visual receipt](evidence/continuation/production-visual.json): **18 page/viewport pairs**, nine routes at 390x844 and 1440x1000, HTTP 200 throughout, zero document overflow, page errors or pre-consent external requests. Both viewport and full-page images are stored under `evidence/continuation/`; every page was visually inspected. Earlier screenshots remain historical.

- [Mobile opening](evidence/continuation/mobile-home-viewport.png), [desktop opening](evidence/continuation/desktop-home-viewport.png).
- [Child/image pathway](evidence/continuation/child-image-pathway.png): Finder > Understand my options > Under 18 > Online abuse or images > Intimate images or threats to share.
- [Recipient preparation](evidence/continuation/update-empty.png): Public places > My plan. No contact/GPS was entered for production captures.
- [Native live-location instructions](evidence/continuation/native-live-location.png), [neutral cover](evidence/continuation/neutral-cover.png), [expanded device/privacy limits](evidence/continuation/trust-exit-expanded.png).

The capture helper was corrected after element crops included the sticky emergency bar over cropped content; final journey captures use actual full-page framing. This was capture framing, not a hidden UI or source change. Real source contacts, participant data, private addresses and transmission were not used.

## 12. Defects, review and traceable changes

Baseline broken journeys and root causes were recorded first in the blocker register. Fixed: child dead end and wrong uncertainty banner, generic cyber pathway, absent discreet controls, unspecific recipient draft, unbounded browser wait, sensitive copied-preview expiry, modal Hide obstruction, blocked-bundle emergency absence and removed language preference being recreated. Tests exercised failure/permission/late-callback states as well as success.

The [fresh independent review](research/p0-independent-review-2026-10-20.md) reproduced P1 stale sensitive preview and P2 modal cover obstruction. [Resolution evidence](REVIEW_RESOLUTION_2026-10-20.md) records the single author correction pass and full subsequent gate. The original report is retained. No second reviewer signoff or independent security certification is claimed. Earlier review-credit exhaustion is historical, superseded only for this bounded code review.

Intermediate test mistakes are recorded: obsolete selectors, concurrent Playwright runners competing for their shared trace directory, and a stalled navigation inspection. Corrected final verification ran alone and passed. Those failures are not included in accepted pass counts. Exact code/evidence hashes and changed paths are in [release checksums](evidence/release-checksums.json).

## 13. Founder/external dependencies

Appoint qualified source, safeguarding, language, privacy/security and operations owners with a real private disclosure route. Obtain consented usability/physical accessibility/offline acceptance and independent security/hosting review. Select owned/contracted map/POI/routing capacity with terms, budget, quotas, ingress controls, load tests and incident ownership before mass use. No account, billing or credential action was taken.

Staffed WhatsApp, alerts, appointments and authority handoffs require eligible channels, specific recipient consent/authorization, trained staffing, reliable receipt/failure semantics and actual written institutional agreements. None exists on disk. Crime-risk work requires lawful granular data plus reconciliation, bias/missingness and independent validation. Community contributions are prepared public proposals until governed review/publication; there is no live moderation/submission backend or public repository yet.

## 14. Release verdict

**internal_demo_only.** Engineering recovery and measured local acceptance are delivered. Human/external P0 release gates remain OPEN with working alternatives. This preview is suitable for controlled review. It is not launch-ready, a dependable rescue service or validated safety infrastructure.
