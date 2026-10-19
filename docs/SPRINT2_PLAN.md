# Sakhi Sprint 2 execution plan

Date: 2026-10-19. Status: primary-source research synthesized; approved for execution by the founder instruction. Founder instruction authorizes planning and execution. Goal: a rich, readable public-benefit experience that helps someone prepare, understand a concern or reach an appropriate public service with minimal disclosure.

## What the baseline misses

The current preview is a technically tested directory with an intake flow. It does not yet explain prevention, distinguish support from reporting clearly, make source limits visible at first glance, compare channels, or show enough of the data/permission boundary at the point of action. Typography is small, fonts vary by platform, and the green visual direction does not follow the current Kriseva paper/navy/brass system. These are observed interface gaps. Market unmet-need hypotheses still require moderated user research.

## Product direction

One public navigator, four visible entry goals: understand my options, explore reporting, find support and help someone else. Three contexts: prepare beforehand, something feels concerning, and support after an incident. Context selection does not classify a person, collect a history or force reporting. Emergency access stays immediate and independent of all content, models and tools.

The interface should explain rather than overwhelm: larger readable text, progressive disclosure, clear diagrams, short evidence labels and a single next step per panel. Premium means precision and care. It does not mean more motion, branding over an emergency, institutional-looking endorsements or unexplained dashboards.

Kriseva brand: canonical paper/navy/brass tokens, self-hosted Instrument Serif for short display titles, IBM Plex Sans for reading/actions, IBM Plex Mono only for source/status metadata. No third-party font calls. Indic/RTL shells retain explicit English safety fallback and pending review status.

## Safe differentiators to implement in this sprint

These are evidence-informed hypotheses, not claims of unique market invention or proven impact. Each must produce observable behavior, not just a feature badge.

| ID | Capability | Acceptance evidence |
| --- | --- | --- |
| X01 | Before / concerning now / after context navigator | Switching context changes relevant starting content without storing personal choices |
| X02 | Four-goal action desk with three-selection discovery | All four goals work by keyboard and touch; no report is assumed |
| X03 | Public preparedness library | Source-linked, reviewed-status-visible learning cards; no personalized escape or medical advice |
| X04 | Public-pathway scrolling index | Exact official names, jurisdiction, source date and no-integration status; keyboard scrolling and reduced motion |
| X05 | Side-by-side service comparison | Compare actual channel, eligibility text, limits and source dates for selected public entries |
| X06 | First-contact preparation checklist | Generic questions and official process links; no private story, file upload or invented facts |
| X07 | Public resource kit | User-selected generic cards, downloaded only on action; no narrative, identity or precise location |
| X08 | Explain my data boundary | Interactive browser/local-processing/external-destination diagram with exact data fields per action |
| X09 | Coarse-area Google Maps handoff | Optional city/district text, encoded Maps URL, destination/data preview; no key, GPS, live provider claim or safe-route scoring |
| X10 | User-controlled WhatsApp public-card handoff | Preview only generic public text; user chooses recipient and Send in WhatsApp; no delivery or police-alert claim |
| X11 | Reading comfort | Readable self-hosted typography, accessible sizes, reduced motion/lite mode and stable focus |
| X12 | Session transparency and erase | Show what is held and cached; cancel in-flight work; no sensitive persistence or stealth claim |
| X13 | Resource correction workbench | Structured nonsensitive local proposal with official evidence and moderation gate |
| X14 | Community and public-benefit page | Free-use/no-ads intent, open contribution routes, honest project/review/integration status; no false nonprofit legal identity |

## Integration decisions to resolve from research

- Google Maps: prefer no-key user-opened Maps URLs in this sprint. Places/Routes/Embed APIs require separate setup and usage review. A map result is not a verified provider or a safe route. Current individual OSC coverage remains zero.
- WhatsApp: generic user-controlled sharing can work without pretending to be a helpdesk. A staffed personal connection requires an actual authorized recipient and operations. Business automation needs policy eligibility, opt-in, account and approved template/webhook design. No authority recipient is invented.
- Location-triggered alerts: preserve as a gated adapter contract. A browser permission is not permission to send someone a location, and is not a dispatch acknowledgement. No background monitoring or unapproved authority alert is implemented.
- Historical crime data: use only source-backed aggregate research where appropriate. No alleged offender records, crime-risk score, dangerous-neighborhood map or prediction of an individual's safety. Annual police data cannot provide real-time safety certification.

## Architecture and file boundaries

Keep the zero-key Vite/FastAPI/SQLite core. Do not add a map SDK, cloud LLM, analytics or private-user backend for visual richness.

- Extract landing and trust/community surfaces from App.tsx into focused components; App owns session and permission boundaries.
- Add a source-backed public preparation data module with version, date, scope, limitations and citations.
- Add PublicPathways, PreparationLibrary, ResourceCompare, PublicKit, DataBoundary and LocalMapHandoff components.
- Extend the destination-preview contract with action kind and exact public fields; never reuse a false "no data" explanation for a URL that contains a map query or share text.
- Keep synthetic mode fail-closed across every new outbound action and download.
- Add public font assets with their original OFL notices and include them in the hashed offline allowlist.
- Extend locale keys structurally; new high-stakes content remains English fallback with review_pending.
- Preserve the original 68-feature inventory; track X01-X14 separately with real implementation/test state.

## Verification and release

Write safety/behavior tests before the new interactions. Cover all goals/contexts, source expiry, map input encoding and zero default GPS, WhatsApp preview/no autosend, share payload exclusion, erase races, synthetic blocks, keyboard focus and privacy state. Preserve all baseline regressions. Run responsive checks at 320, 360, 375, 390, 414, 768, 1024, 1280 and 1440; add all new screens, Indic stress cases and RTL. Run axe and manually inspect actual screenshots.

Measure lab performance again with self-hosted fonts, compare source-route time and interaction counts, and run a bounded synthetic local load test. Test the production PWA offline cache with fonts, no sensitive data, no external requests and explicit stale fallback. Native and Docker paths must still work with no paid credentials.

Human release gates are unchanged: qualified safeguarding/contact checks, native-language/domain review, held-out multilingual evaluation, physical Android, assistive technology, real operational ownership and production security. Passing local automation cannot make the product mass-user validated. Public launch, maps/API billing, a live WhatsApp helpdesk, provider handoffs and authority alerts stay gated by the real missing requirements.

## Execution order

1. Preserve Sprint 1 evidence and branch, inspect current brand, finish primary-source research.
2. Publish the research synthesis and concrete X01-X14 acceptance plan in the repository.
3. Implement the canonical design system and public-preparedness/portal/permission vertical slice, then visually verify it.
4. Implement comparison, public kit, coarse map and WhatsApp public-card handoff, comfort/data-state and contribution workflows with tests.
5. Run full regression, accessibility, privacy, performance, offline, packaging and independent review. Fix material findings.
6. Update screenshots, README, release report and company receipt. Report actual readiness and external blockers without simulated integrations.

## Research synthesis decision, 2026-10-19

Reviewed all three research memos in docs/research: eight product comparisons, national/state support pathways, seventeen open-source repositories, official maps/messaging policies and historical crime-data limitations. Evidence supports preparation, service comparison, disclosure literacy and public-resource maintenance as safe differentiators. It does not establish improved safety outcomes or a validated nationwide service network.

Decisions: keep native accessible controls and the existing stack; reuse canonical self-hosted brand fonts with OFL notices. Use optional user-opened Google Maps search for a manually selected coarse area, clearly distinguish map results from vetted support records, and omit origin/GPS. WhatsApp carries only a public generic resource card with user-controlled recipient selection and Send. No personal narrative, coordinates or authority endpoint is guessed. No map SDK, paid API, tracking service, crypto vault or general web agent is added.

The current WhatsApp Business policy restricts platform use by law-enforcement entities. This is a separate policy concern from a citizen voluntarily opening a public contact, and is not interpreted as proof of an authorized Sakhi intake channel. Business helpdesk/authority alert work remains a future reviewed provider deployment.

NCRB/OGD are discovery references for annual administrative data; no verified raw nationwide dataset was acquired. No heatmap or model is fabricated. The community page will explain data limits and link to the research, while user support routing stays independent of crime counts.
