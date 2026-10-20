<div align="center">

# sakhi

**Sakhi handles the complexity. You stay in control.**

A free public-benefit navigator for women in India: prepare beforehand, understand a concern, and explore support after an incident.

`Internal preview` · `Apache-2.0 project code` · `No paid API key` · `No institutional integrations`

</div>

**Sakhi is not an emergency, counselling or legal services provider. For immediate danger in India, call 112 if you can.** [Official emergency information](https://112.gov.in/). No government affiliation or guaranteed service availability is claimed.

**Device safety:** someone with access to your device, browser history or backups may see your activity. Clearing Sakhi does not erase those copies or make browsing untraceable.

<table>
<tr><td width="70%"><img src="docs/evidence/continuation/desktop-home-viewport.png" alt="Actual Sakhi desktop landing page with public support choices, anonymous entry and emergency information" /></td><td width="30%"><img src="docs/evidence/continuation/mobile-home-viewport.png" alt="Actual mobile landing page at 390 CSS pixels" /></td></tr>
</table>

The recovery revision adds child/online-abuse next steps, discreet cover, consented recipient drafts and foreground location assistance. Actual public city, weather and route requests succeeded; nearby discovery still returned 503. No granular crime prediction or institutional integration has been validated. Read the [blocker register](docs/BLOCKERS_2026-10-20.md), [20-priority audit](docs/PRIORITY_AUDIT_2026-10-20.md) and [measured release report](docs/RELEASE_REPORT.md). Public launch gates remain open.

## Start locally

From this checkout, Docker is the shortest path:

```sh
docker compose up --build
```

Open **[http://127.0.0.1:8787/en-IN/](http://127.0.0.1:8787/en-IN/)**. The container binds to loopback, runs as a non-root user and stores no private cases. No account, API key or model download is needed. The image build and runtime were tested on this Mac using Linux containers. First-time downloads determine setup time; no 60-second guarantee is made.

Prefer native development:

```sh
make setup
make dev
```

Open **[http://127.0.0.1:5173/en-IN/](http://127.0.0.1:5173/en-IN/)**. Requirements: Node 22+, uv, Python 3.13 (uv can install the pinned runtime), Make and a browser. `make setup` installs locked Node/Python dependencies and Chromium, Firefox and WebKit for tests. Linux hosts may also need `npx playwright install --with-deps chromium firefox webkit`. The launcher refuses occupied ports instead of replacing a listener. Ctrl+C stops its own processes.

| Environment | Observed state |
| --- | --- |
| macOS, Node 25.9.0, uv 0.11.6, Python 3.13.13, 24 GiB RAM | Native setup, dev and verification run |
| Linux container, Node 22 build, Python 3.13 runtime | Docker build and HTTP runtime run |
| Linux contributor host | CI workflow prepared; remote execution not observed |
| Windows | Use Docker Desktop or WSL2; native Windows host not tested |

A GitHub remote has not been created. After publication, clone the actual repository URL and run these commands. No placeholder repository, CI badge, public deployment or release tag is presented as real.

## Travel tools

Open **Public places**, choose a city and select **Load live map** after reading the provider disclosure. Pan to a public destination or request mapped places, then choose a route estimate. **Conditions** loads the city forecast and solar times; **My plan** holds a local checklist, public card, neutral check-in message preview and page-only reminder. Device-city suggestion is optional under **Find another city in India**. Only a known public city ID reaches the geocoder. Foreground device position stays local unless a one-time snapshot is separately selected and approved for a chosen recipient. No public-data layer guarantees safety, opening hours or rescue.

Under **My plan**, choose a recipient and neutral update, optionally choose a one-time location snapshot, then review the exact recipient/content and device checkpoint before opening WhatsApp. Location permission alone never authorizes sharing. Send stays in WhatsApp; opening, user-reported sent/replied and unobserved delivery remain separate. Sakhi can explain native live-location sharing but cannot start or monitor it. Cover/background/expiry/revoke clear the relevant local position and consent.

The city gazetteer has 3,783 records under CC BY 4.0; those are geographic points, not vetted facilities. No Google API account or key is configured. The Google search alternative remains available for 16 preset cities. Mass use needs owned/contracted providers and operational controls, not unlimited reliance on donated endpoints.

Live probes are intentionally separate from regression tests:

The script accepts only owned loopback ports 8787/8769. It never sends a real person, private address, alert or message.

```sh
PYTHONPATH=. uv run --frozen python scripts/travel_smoke.py --port 8787 --live-public-data
```

## One real journey

Choose **Find my next step → Understand my options → 18 or older → Online or digital concerns**, or enter the fictional sentence “Someone made an impersonation account of me.” Sakhi clarifies accounts/threats versus intimate images. For image concerns it asks the relevant image-creation age and shows conditional Take It Down or StopNCII information with Indian alternatives; unknown age never implies eligibility. Under-18 users get the child path before API/text intake. No image is collected. Public cybercrime and legal-aid options retain official source receipts. Preview the exact hostname, consider device privacy, then decide whether to open the website. No complaint or referral is submitted.

The landing-page **Try a fictional example** mode visibly disables calls, outbound links and sharing. It never simulates an acknowledgement. See the [60-second synthetic storyboard](docs/DEMO.md).

<table>
<tr><td width="50%"><img src="docs/evidence/simple-options.png" alt="Synthetic mobile cyber concern journey showing official public resources and no-action status" /></td><td width="50%"><img src="docs/evidence/simple-destination.png" alt="Actual destination preview showing cybercrime.gov.in with external actions disabled in the fictional example" /></td></tr>
</table>

Illustrative before/after, with no measured time-saving claim:

| Without the navigator | With this local preview |
| --- | --- |
| Guess which institutions are relevant, search across portals and inspect their scope | Choose a goal, see a few source-backed alternatives and inspect their limits |
| Decide independently what to disclose on each official service | Preview the destination; Sakhi transfers no story or form fields |

## What works, and what does not

| Capability | Actual state |
| --- | --- |
| Anonymous guided discovery and three-selection route from a direct goal | Functional locally |
| Static 112 before JavaScript, local minor/urgent path, conditional child/cyber guidance | Functional locally; finite rules and source checks need human review |
| Local SQLite FTS5 BM25 plus intact Indic word matching | Functional without models |
| Source dates, expiry warnings, coarse jurisdiction and official hostname preview | Functional locally; 181 West Bengal exception preserved |
| Neutral cover, honest quick exit, clear session, cancellation and no sensitive persistence | Functional locally; cannot erase browser/OS/external traces |
| Public learning, generic questions and user-selected resource kit | Functional locally; source and safeguarding review pending |
| Choose up to three services for channel/scope/source comparison | Functional locally |
| Opt-in live OSM map, public city lookup, weather/daylight and walking/driving estimates | Actual map, city, weather and both route modes observed; see live API receipt |
| Mapped public places and place details | Adapter/UI implemented; actual Overpass request 503. Live POI success is blocked, not simulated |
| Local trip checklist, public card and foreground reminder | Functional local controls; no monitoring or automatic alert |
| Public Maps/WhatsApp plus chosen-recipient neutral update and optional one-time position | Exact preview and separate consent; Send/delivery unobserved, user reports labelled |
| Interactive data boundary, reading comfort and structured local corrections | Functional locally; nothing automatically submitted |
| Lite view and synthetic sandbox | Functional locally |
| Hash-checked public-only PWA cache and offline reload | Browser tested; no live-service promise |
| 16 language shells, mid-session switch and RTL | Structurally complete; all require human review |
| Read-only source/locale/evaluation console and 211-lead ingestion | Functional locally; no private interactions shown |
| Optional EmbeddingGemma 2 ranking | Actual local execution measured; disabled by default |
| Expert bystander advice and fully reviewed multilingual guidance | Review blocked |
| Private vault, personal case drafts/timelines, uploads, voice and background reminders | Not available; generic preparation and foreground page reminder are separate |
| Provider handoffs, OSC appointment automation, submissions and acknowledgement tracking | Not available; partner authorization required |

All **68 candidate capabilities** have honest individual states in [FEATURES.json](FEATURES.json) and [the feature inventory](docs/FEATURES.md). This is not a claim that all 68 work. [Issue bodies](docs/ISSUE_BACKLOG.md) are prepared locally; no remote Issues exist. Original priorities are preserved. The founder-requested Sprint 2 public-only extensions are individually implemented or partial, while human P0 release gates remain open. Private workflows and institutional adapters stay disabled. See [the 14-interaction Sprint 2 inventory](docs/SPRINT2_FEATURES.md).

## Sprint 2 research and design

The [October 20 simplification](docs/DESIGN_SIMPLIFICATION.md) supersedes the earlier long landing and corporate palette. Source, privacy and public-release gates remain unchanged.

The [execution plan](docs/SPRINT2_PLAN.md), [design system](DESIGN.md), [service and eight-product comparison](docs/research/sprint2-services-competitors.md), [seventeen-repository review](docs/research/sprint2-open-source.md) and [Maps, messaging and crime-data research](docs/research/sprint2-maps-messaging-data.md) record sources, tradeoffs and gaps. These are evidence-informed hypotheses, not validated uniqueness or user-impact claims.

The opening is a short pink-and-black entrance with one primary finder action. Three contextual visual cues explain choose, prepare and decide. Four-second comprehension remains a research goal. The finder also uses compact chrome. Detailed exploration under Prepare & learn covers before / concerning now / after, a public preparation library, manually scrolling official pathways, user-selected comparison, first-contact questions, public kit, data-boundary explorer, map and WhatsApp previews, comfortable reading and community corrections. It follows the founder's October 20 pink/black direction with a bold Manrope wordmark/headlines, IBM Plex reading text and Noto script fallbacks. No government logo or partner endorsement is implied.

Accessibility, usability and UI/UX are equal product pillars. The [quality contract and state-level evidence matrix](docs/QUALITY.md) turn lessons from GOV.UK, NHS, USWDS and Carbon into semantic controls, actionable errors, visible eligibility, cancellation, large-text reflow and repeatable regression budgets. The [primary-source study](docs/research/sprint2-three-pillars.md) records their published tools and production maintenance practices. No participant research or human assistive-technology signoff has been completed.

Maps URLs do not require a key, but map results are not vetted providers or safe routes. The public WhatsApp card stays generic. The separate loved-one update holds a user-entered recipient and fixed neutral text in memory; an optional one-time snapshot reaches WhatsApp only after separate selection and recipient/content approval. No private narrative is included. Optional city suggestion stays local; no authority alert or staffed helpdesk is supplied. Historical crime statistics cannot certify present safety, so no crime heatmap or prediction is fabricated. [Operational roadmap and gates](ROADMAP.md).

## Public sources and directory coverage

Five learning cards linked to four public source pages are counted separately from directory entries. They carry general information and pending-review labels.

**211 discovery leads · 7 source-reviewed directory preview records + 2 conditional image-guide references · 9 distinct support references in scope · 0 human production approvals.** Leads are not APIs. Public reading, service cost, open-source licensing and permission to integrate are separate facts.

The curated pack contains official emergency, women/child helpline, NALSA, cybercrime, SHe-Box and NCW entry points. Each has exact provenance, scope, check date, expiry and limitations. Some direct fetches failed or differed between tools; a source check does not establish live availability. [Inspect the canonical pack](data/public-seeds/resources.json) and [current offline validation](docs/evidence/resource-validation.json) and [dated historical link observations](docs/releases/pre-recovery-2026-10-20/resource-validation.json). Source review dates: **October 19 for six directory entries; October 20 for Child Helpline and the two supplemental guide references**. Supplemental sources are versioned in [support-guides.json](data/public-seeds/support-guides.json). Specialized recommendations expire; generic official entry points retain explicit stale warnings as a fallback.

**OSC coverage:** the [August 5, 2026 government report](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1) reported 991 operational centres using data through June 30, 2026. Sakhi holds **0 individually sourced centre records, 0 independently verified centre contacts and 0 authorized provider integrations**. It does not fabricate 991 entries or claim access to a national provider API.

See [provenance](docs/DATA_PROVENANCE.md), [maintenance](docs/MAINTAINER.md) and the [empty sourced OSC registry](data/public-seeds/osc-registry.json). The HSDS-inspired reference export does not claim full standard conformance or institutional interoperability.

## Local AI, without generated safety advice

| Default zero-model mode | Optional local model mode |
| --- | --- |
| Deterministic safety policy and local lexical retrieval | Same policy with semantic ranking inside approved candidates |
| No API credentials or model weights | Explicit publisher download; no paid API |
| Small runtime and public-only data | Observed model cache 1.53 GB, CPU float32, 768 dimensions |
| Tested lexical fallback if optional engine is absent | Failures degrade to lexical results |

```sh
make model
HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1 SAKHI_EMBEDDINGS=1 \
  uv run --group embeddings python scripts/dev.py
```

`make model` explicitly downloads the pinned public checkpoint after the Apache-2.0 acknowledgement built into that command. Read the [publisher model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) first. The weights are not committed or included in Docker. Downloaded files include the publisher's multimodal checkpoint; runtime disables vision/audio encoders. The measured host has 24 GiB RAM; smaller-device model capacity was not tested. Core mode does not need a GPU.

EmbeddingGemma is an **encoder, not a generative model or legal reasoning engine**. It cannot write a hotline, allegation, eligibility rule or deadline. Standalone semantic ranking performed worse than the lexical baseline on several small language samples, so it does not control scope or emergencies. BHASHINI, IndicTrans2, voice and a local instruction model are not installed integrations. BHASHINI would require separate registration/approval.

## Language status

Every shell contains **136/136 keys**. Non-English shells have 20 draft navigation translations and **116 explicit English fallback entries**, with a visible notice. Key coverage is not translation completeness or quality. New preparation, map, community and comparison copy is explicitly English and is outside this catalog key count. Even English safeguarding content has no external expert signoff. Locally hosted Noto subsets cover the current catalog codepoints; glyph coverage is not language or shaping approval.

| Locale | Language/script | Structural keys | Human review |
| --- | --- | --- | --- |
| en-IN | English | 136/136 | Pending |
| hi-IN | हिन्दी | 136/136 | Pending |
| bn-IN | বাংলা | 136/136 | Pending |
| mr-IN | मराठी | 136/136 | Pending |
| te-IN | తెలుగు | 136/136 | Pending |
| ta-IN | தமிழ் | 136/136 | Pending |
| gu-IN | ગુજરાતી | 136/136 | Pending |
| kn-IN | ಕನ್ನಡ | 136/136 | Pending |
| ml-IN | മലയാളം | 136/136 | Pending |
| or-IN | ଓଡ଼ିଆ | 136/136 | Pending |
| pa-IN | ਪੰਜਾਬੀ, Gurmukhi | 136/136 | Pending |
| as-IN | অসমীয়া | 136/136 | Pending |
| ur-IN | اردو, RTL | 136/136 | Pending |
| ne-IN | नेपाली | 136/136 | Pending |
| kok-IN | कोंकणी, Devanagari | 136/136 | Pending |
| ks-Arab-IN | کٲشُر, Perso-Arabic, RTL | 136/136 | Pending |

[Translation review process](docs/TRANSLATION_REVIEW.md). No speech or transcription support is implied by language selection.

## Architecture

```mermaid
flowchart LR
  B[Anonymous React PWA] --> S[Immediate safety policy]
  B --> A[Local FastAPI POST]
  A --> F[SQLite FTS5 and intact-word routing]
  F --> P[Curated public pack]
  F --> E[Optional local embeddings]
  E --> P
  P --> C[Source receipts and destination preview]
  C --> O[User opens official service]
  P --> W[Hashed public-only cache]
  D[211 discovery leads] --> M[Read-only maintenance console]
```

No private-user datastore or institutional connector exists. Request text stays out of URLs, logs, caches and persistent storage. Only an explicitly chosen language preference can persist, with a remove control. Recipient/position fields stay in page memory until an explicit external handoff. Strict schemas, confidential validation errors, trusted hosts, CSP, no-referrer, opt-in local geolocation and denied camera/microphone/payment are implemented. Clearing state cancels pending navigation so a delayed response cannot restore it. External websites and device/OS copies remain outside Sakhi's control.

See [architecture](docs/ARCHITECTURE.md), [ADRs](docs/ADRs/001-local-architecture.md), [OpenAPI](packages/contracts/openapi.json), [API guide](docs/API.md), [privacy](docs/PRIVACY.md), [safety](docs/SAFETY.md), [threat model](docs/THREAT_MODEL.md) and [responsible-use terms](docs/TERMS.md).

## Verify and inspect

```sh
make verify
make quality
make evaluate
PYTHONPATH=. uv run python scripts/resources.py validate
# Explicit maintainer-only public link check, never driven by a private story:
PYTHONPATH=. uv run python scripts/resources.py validate --online
# Optional model comparison after make model:
PYTHONPATH=. uv run --group embeddings python scripts/model_benchmark.py
```

`make verify` runs Ruff, Python tests, browser-local tests, catalog/data/README checks, a production build, draft scenario evaluation and Playwright. It exits non-zero on failures. Chromium runs the complete browser suite; Firefox and WebKit run pillar, travel, recovery and location contracts. `make quality` serves its own local production build and fails on missing measurements or exceeded Lighthouse budgets. Application tests use only local/synthetic inputs and do not call real services. Link maintenance and model download are separate explicit online actions.

Measured on 2026-10-20: **54 Python, 20 unit and 315 browser tests passed; 2 unsupported forced-colors emulation cases explicitly skipped.** Local Chromium lab Lighthouse: **97 performance / 100 accessibility / 100 best practices**, LCP 2.560s, CLS 0 and TBT 0ms. The 3s LCP regression budget passed; the separate 2.5s product goal was missed by 60.3ms. Required widths 320, 360, 375, 390, 414, 768, 1024, 1280 and 1440 are exercised. Axe scans cover the landing at every width, other main surfaces at 320/1440 and selected Indic/RTL shells. Browser tests cover cancellation, session erase, minors, focus, stale packs, language switch, offline reload and no automatic external requests. All three engines passed the 200% font-preference, text-spacing and font-failure checks. 200%/400% viewport reflow equivalents use 640/320 CSS-pixel widths; physical zoom, TalkBack/VoiceOver and physical Android remain unverified.

The **410 draft routing cases** are in-sample, include generated surface variants and have no expert labels. The **104 authored-phrase model comparison** is also small and in-sample. A new frozen 16-case English author-labelled holdout scored local16/16, Gemma13/16 and Qwen14/16. Neither model was promoted. These small comparisons do not establish reasoning quality, real-world accuracy or emergency detection reliability. Per-language scores, timing, known limits and test counts are in the [release report](docs/RELEASE_REPORT.md) and [evidence directory](docs/evidence).

No physical Wi-Fi-off cold-start test was performed. Browser offline reload is a narrower observation. Offline resources cannot promise phone connectivity, current service availability or official submissions. Chromium installability diagnostics reported no errors; physical installation is not claimed.

## Configuration and operations

| Setting | Type/default | Purpose |
| --- | --- | --- |
| SAKHI_EMBEDDINGS | string `0` / unset | Set `1` only with explicit optional dependencies and local cache |
| SAKHI_ALLOWED_HOSTS | comma-separated loopback names | Host validation; configure explicitly behind a reviewed proxy |
| SAKHI_WEB_DIST | path, apps/web/dist | Production static bundle location |
| HF_HUB_OFFLINE / TRANSFORMERS_OFFLINE | string `1` recommended at model runtime | Prevent inference-time downloads |

No environment file or secret is required for core operation. No automatic dotenv loader exists. Ports: 5173 web, 8765 local API, 8787 container; test production server 8767 and owned quality-audit server 8768. Keep no-access-log settings. Before external exposure, obtain security/safeguarding review, HTTPS, ingress rate limiting and a real private disclosure channel. No production hardening certification is claimed.

## Contribute carefully

A structured public-resource correction can be prepared locally from the Community page. The trust page also offers a blank template. It never publishes automatically. Propose a pull request with the authoritative source, date, scope and nonsensitive diff. Human verification and review are required for critical contacts. Follow [CONTRIBUTING](CONTRIBUTING.md), [maintainer guidance](docs/MAINTAINER.md), [community conduct](CODE_OF_CONDUCT.md) and [SECURITY](SECURITY.md). **Do not put personal cases, intimate images, private contacts or credentials in GitHub Issues.**

Good first contributions: an independently reviewed source, native-language review, a synthetic held-out case, a physical-device accessibility check or a reproducible setup on another OS. [Roadmap](ROADMAP.md) and [release gates](docs/RELEASE_GATES.md) state what is missing. Private vaults need a separate security design; provider APIs need written agreements, authentication, trained partners and observable acknowledgements.

Project code: [Apache-2.0](LICENSE). Dependencies, OFL font assets, public sources and the optional model retain their own terms. [Notices and license-review limits](docs/THIRD_PARTY_NOTICES.md). Source links and OSS acknowledgements do not imply endorsement.

_Source receipts: 2026-10-19 and 2026-10-20, scoped per record. Local preview only. No public release tag or hosted crisis service._
