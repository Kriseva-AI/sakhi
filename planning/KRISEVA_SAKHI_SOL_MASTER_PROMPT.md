# MASTER EXECUTION PROMPT: KRISEVA SAKHI 2.0
## Target coding agent: GPT-6.1 Sol via Codex
## Mission: Ship an open-source, multilingual, privacy-first AI support navigator for women in India
## Prepared: 2026-10-19 | Version: 2.0

READ THIS ENTIRE PROMPT. ALSO READ THESE PROVIDED SUPPORTING FILES IN THE SAME DIRECTORY:
- `FEATURE_MATRIX_68.csv`
- `FEATURE_BACKLOG.md`
- `RESOURCE_SEED_CATALOG.csv`
- `RESOURCE_CATALOG_METHODOLOGY.md`
- `README_BLUEPRINT.md`
- `RELEASE_GATES.md`

IF A SUPPORTING FILE IS MISSING, CONTINUE WITH THIS PROMPT AND CREATE A RECOVERY TASK; NEVER CLAIM TO HAVE REVIEWED A MISSING FILE.

# 0. AUTHORITATIVE PRODUCT MANDATE

You are the principal engineer, founding technical architect, AI retrieval engineer, product designer, privacy/security engineer, multilingual UX specialist, QA lead, and responsible open-source maintainer for KRISEVA SAKHI, a project initiated by Kriseva AI Private Limited.

Your task is not to brainstorm or mock up slides. Build and test an installable working prototype from scratch inside the user's repository. Inspect the local directory, existing files, branches, worktrees, Git history, tool permissions, and platform limitations before changing anything. Preserve existing user work. If empty, bootstrap a clean monorepo. Work autonomously through ordinary implementation decisions. Stop only for necessary credentials/permissions, user-sensitive high-risk launch approval, and irreducible external dependencies.

Core motto: **SAKHI HANDLES THE COMPLEXITY. YOU STAY IN CONTROL.**

Priority order: immediate user safety > factual accuracy > consent/privacy > verified source routing > functional completeness > accessibility > responsiveness > open-source reproducibility > premium visual polish > intelligent automation > feature quantity.

Do NOT make a false promise that AI can prevent crimes, dispatch police, guarantee counselling, contact all One Stop Centres, determine that an allegation is true, or submit official complaints without authorization. Do NOT present prototypes as live institutional integrations. No fabricated users, partnerships, service availability, badges, benchmarks, complaint acknowledgements, testimonials, or usage counts.

Implement an HONEST product status taxonomy: `functional_local`, `verified_public_link`, `synthetic_demo`, `needs_partner_authorization`, `not_ready`. Render truthful badges only when necessary and never conflate demo with live help.

Definition of done: A reviewer can clone the public repo, follow one short quick-start, run the app with **zero paid API credentials**, complete realistic synthetic scenarios, receive source-backed official help options, switch supported languages, inspect the self-hosted architecture, understand the safety boundaries, run automated tests, and contribute a verified correction. Anything beyond that is separately gated.

# 1. SOLVE A REAL USER PROBLEM

Sakhi is ONE public-facing support navigator, with permission-constrained specialist functions underneath. It helps adult women in India find authoritative information and navigate relevant services for:
- Immediate danger: direct route to emergency assistance, no AI delay.
- Digital threats, account impersonation, stalking, sextortion, cybercrime.
- Workplace and campus harassment.
- Domestic violence, coercion, threats, physical violence.
- Legal aid and support-service discovery.
- Helping a friend while respecting her privacy and choices.

Default path: user arrives anonymously -> chooses language -> selects goal or describes concern minimally -> urgency routing -> verified options -> source receipts -> safe next step -> optional draft/checklist -> optionally preserve private information -> explicit confirmation before any external action.

Do not require someone to disclose the full details of an experience. Do not rely on simulated empathy or a generic 'therapist bot'. All crisis counselling, personalized escape planning, medical recommendations, legal representation, police dispatch, and high-risk interventions remain with trained, appropriately authorized human professionals.

If a user is at immediate risk, show the verified 112 emergency pathway and other context-appropriate official support without waiting for an embedding, LLM, login, browser geolocation, or data upload. Make this deterministic. General legal/support discovery is not an emergency system. For minors, expose appropriate child-protection resources and safely stop unsupported adult workflows. Never solicit or store intimate imagery.

# 2. CLEAR DELIVERY TIERS

Build the product as three rigorously separated modes:

**T0: Open local demo, no accounts, no API keys.** Must function on a typical laptop after setup. Includes curated source-backed information, local lexical fallback, optional local embedding engine, guided scenario routes, 16 locale shells, general shareable resource cards, synthetic demo cases, and explicit safety limitations. No private-user case storage, external submissions, or claimed real referrals by default.

**T1: User-controlled private beta.** After security and safeguarding review: opt-in case vault, approval previews, export, deletion, user-supplied reference tracking, assisted document drafting, optional local inference, accessibility enhancements, evidence metadata inventory. No outbound action by default.

**T2: Provider-integrated deployment.** Only after real written permission, data-sharing agreements, trained partners and security review: partner-authenticated case handoffs, acknowledgement receipts, approved messaging/form APIs, availability verification, permissioned status updates. No 'live' icon unless backed by an audited, observed response.

All 68 features are in the engineering backlog. Implement every safe, independently useful T0/P0 capability end-to-end first. Build clear interface contracts and feature flags for P1/P2. Do not claim 68 working features if they are not working.

# 3. SELECT THE BEST STACK BASED ON ACTUAL REQUIREMENTS

The choices below are *strong defaults*, not constraints that prevent a technically better solution. Review actual compatibility, local RAM, binary availability, accessibility, performance and security; record final tradeoffs in `docs/ADRs/`.

- Frontend: Next.js + React + strict TypeScript + Tailwind CSS + Radix/shadcn components, or a demonstrably simpler Vite PWA if server-side features add no value. Build cohesive design tokens and semantic accessible primitives, not a copied component gallery.
- Backend: Python FastAPI + Pydantic strict schemas + typed agent/tool interfaces; no uncontrolled autonomous browser agent.
- Storage: SQLite/FTS5 for zero-configuration local mode; PostgreSQL + pgvector for separately configured server mode. Schema migrations and deterministic fixtures; encryption and database isolation for future private-case mode.
- Primary embeddings: **google/embeddinggemma-2** (Apache 2.0). Text-only encoder subset first; optional vision/audio modules later. It is an embedding model, NOT a generative LLM or legal reasoning engine. Use documented task prefixes, 768-dimensional native vectors, compare 512/256 only after evaluation, L2 renormalize truncated vectors, and use `bfloat16` on supported hardware or `float32` otherwise, NEVER float16. Verify model availability, dependency compatibility, hardware support and licensing at runtime. Make downloads explicit and local/offline cache configurable.
- Reasoning/explanations: reviewed workflow templates and deterministic rules are the default for high stakes. A local instruction model (e.g. a license-compatible, self-hosted LLM available through Ollama/llama.cpp) may be optional **only for non-critical drafting** and must be source-grounded with no model-generated hotline numbers, eligibility rules, deadlines, or accusations. No paid model is needed for core operation.
- Retrieval: exact-match keyword search + FTS + embedding retrieval + metadata filters (jurisdiction, language, service type, last verified, eligibility, confidence) + conservative reranking. Retrieval must abstain when evidence is insufficient. Unit tests must prove lexical fallback works if the embedding engine is disabled.
- Language: reviewed local UI catalogs, IndicTrans2 and IndicXlit as optional self-hosted components after license/quality validation; BHASHINI is optional and registration/approval-gated, not assumed free/unlimited. Voice optional, foreground-only; offline use cannot depend on a cloud speech API.
- Data transport: typed OpenAPI, official outbound links, adapter contracts for approved future APIs. NEVER bypass OTP, CAPTCHA, identity challenges, use hidden authenticated endpoints, or scrape private government data.
- Maps/locality: avoid persistent precise GPS and route histories. If needed later, use coarse district queries and lawful OSM data with provider usage-policy compliance; never claim safe route prediction.
- Observability: metrics that exclude user stories, query strings, personal locations, case IDs and secret metadata. Anonymous/no-tracking by default. Opt-in aggregate usage measurement only after privacy review.
- Distribution: MIT/Apache licensing review for every dependency; default **Apache-2.0** for our own project code, respecting third-party notices. Publish source, NOT model weights if redistribution conditions are unverified; provide a separate first-run download path. Docker Compose and clear non-Docker instructions. Installable PWA with public-only offline caches.

Do a 1-2 page technical decision matrix before the first major implementation, then build without endless framework debates.

# 4. SIXTEEN LAUNCH LOCALES: ENGLISH + FIFTEEN INDIAN LANGUAGES

Mandatory locale inventory and BCP-47 identifiers:
1. `en-IN` English (India)
2. `hi-IN` Hindi
3. `bn-IN` Bengali
4. `mr-IN` Marathi
5. `te-IN` Telugu
6. `ta-IN` Tamil
7. `gu-IN` Gujarati
8. `kn-IN` Kannada
9. `ml-IN` Malayalam
10. `or-IN` Odia
11. `pa-IN` Punjabi (Gurmukhi)
12. `as-IN` Assamese
13. `ur-IN` Urdu (right-to-left)
14. `ne-IN` Nepali
15. `kok-IN` Konkani (document script variant)
16. `ks-Arab-IN` Kashmiri, Perso-Arabic script (consider alternate Devanagari later)

Required internationalization behavior:
- Locale-aware routes, switcher, persisted non-sensitive locale preference, proper `lang`/`dir`/`hreflang`, RTL-safe logical CSS properties, forms and numeric/phone rendering appropriate to language, Unicode shaping and Indic typography.
- Every P0 navigation message, legal/safety boundary, emergency CTA and public resource label must have a locale entry. Build CI enforcing 100% KEY coverage for all 16; missing keys must fall back explicitly with notice, never display gibberish.
- Accessibility: screen readers, native fonts with proper licenses, 200% and 400% zoom, reduced motion, keyboard navigation, error summary and labels.
- Legal and safeguarding content must receive domain-expert + language-expert review before a locale is marketed as fully **verified**. Translation by a model is a draft. Maintain `language_status` per locale: `structurally_complete`, `review_pending`, `reviewed_for_scope`. UI may offer beta translations marked as such, but high-stakes instructions must use reviewed text or a safer language fallback.
- Build a 16-locale synthetic evaluation suite: 20 basic navigation cases per locale plus locale-specific adversarial phrasings, romanized spelling, colloquialisms, ambiguous statements and explicit emergency phrases. Track recall/precision/abstention by language; investigate disparate failures.
- Test on low-end Android viewport and emulator; do not conflate language selection with speech transcription support.

# 5. RESOURCE INTELLIGENCE: 211 SEED DISCOVERY SOURCES, NOT 211 APIs

Read `RESOURCE_SEED_CATALOG.csv` and its methodology note. This seed contains **211 distinct resource entries**, including 35 state/UT police citizen portals indexed by MHA and 35 state/UT legal services authorities indexed by NALSA. It also includes national complaint portals, research references, free/open-source code, model repositories and specialist support resources. This list is a **discovery backlog**: availability, APIs, terms, service details, reuse rights and security are NOT verified for every row.

Create a Resource Intelligence subsystem:
- Parse all 211 entries. Preserve `id`, category, URL, authority/source, access type, review status, jurisdiction, licence, legal basis and notes.
- Deduplicate by canonical URL and actual function. Report broken links; never invent replacement URLs.
- Prioritize critical official sources: 112, 181, Mission Shakti, OSC booking, NCW, NALSA, SHe-Box, National Cyber Crime Reporting Portal, GAC, eCourts as appropriate, State Police and State Legal Aid directories, plus relevant child protection paths.
- Classify accurately: `official_public_portal`, `public_directory`, `downloadable_public_data`, `public_document`, `open_source_repo`, `optional_approved_api`, `partner_only`, `unverified`. The default for official form submission is browser handoff, not an integration.
- Separate 'free to read', 'open source', 'no-charge official service', 'free API with rate limits', and 'account/approval/contract required'. Each source must expose this distinction in maintainer UI.
- Attach authoritative citations, retrieved/verified timestamps, provenance, locale, limits, freshness TTL, scope, terms, usage permission and safe fallback. No status should claim 'verified' until source checks actually pass.
- Build a reviewer workflow for approvals, link changes, incorrect phone numbers and expiry. No crowdsourced edits go live without review.
- Provide a weekly `resources validate` CLI that checks links/rules respectfully, respects robots/ToS, does not access logins, and creates a PR/report instead of silently modifying live critical resources.
- The public UI should show only vetted support sources. Experimental discovery entries should never be surfaced to someone seeking help simply because they appear in this CSV.
- Use the Open Referral Human Services Data Specification (HSDS) as the leading interoperable resource directory schema where appropriate. Do not assume another institution implements the same spec.
- Every country/state-specific help flow must have a verified generic fallback if specialized data is stale or unavailable.

External research allowed in a maintenance/curation pipeline: whitelisted or reviewed official public sources only, rate-limited, citation preserving, prompt-injection hardened, no automatic content endorsement. Do NOT permit a general agent to perform unrestricted web research based on a user's sensitive narrative.

# 6. ONE STOP CENTRES: 991 IS A HISTORICAL REPORTED COUNT

Government report dated August 5, 2026: **991 operational OSCs** out of 1,033 administratively approved. This is a dated national aggregate, not 991 API endpoints, not 991 verified phone numbers, and not current live provider capacity. Source: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1

Build a provider directory ingestion and verification system, not a fake prepopulated directory:
- Data schema: centre_id, canonical_name, state, district, source_link, coordinates_if_public_and_necessary, publicly_verified_contact, public_service_scope, last_verified_at, verification_method, source_date, consented_partner_status, availability_status, update_history.
- `centre_status`: `unseen`, `official_source_found`, `under_review`, `public_details_verified`, `partner_agreement_signed`, `authorized_integration_active`, `stale_or_disputed`.
- Use Mission Shakti public directory and appointment portal as starting references, and 181 as general official referral fallback.
- Import individual OSC records ONLY when obtainable from legally reusable authoritative public records. Never synthesize missing phone numbers, addresses, coordinates, service capacity or referral acceptance. The registry may contain fewer than 991 validated records at first; disclose coverage honestly.
- Dashboard must distinguish **reported national total** vs **individual sourced records** vs **independently verified contacts** vs **provider-integrated endpoints**. No denominator inflation.
- No third-party automated appointment submission without published authorized API or signed partnership. No CAPTCHA/OTP bypass. User-initiated deep link to the official appointment page is acceptable.
- Partner-integrated handoff requires explicit user approval, secure provider authentication, service-specific contract and a true acknowledgement event.
- Expose verification queue and coverage map to maintainers without revealing private user interactions.

# 7. PRODUCT CAPABILITIES: 28 CORE + 40 NEW X-FACTORS = 68

The appended feature inventory is canonical. Mirror it into `docs/FEATURES.md`, `FEATURES.json`/CSV and GitHub Issues with unique IDs and executable acceptance criteria. For each feature, track status, integration requirements, locale readiness, accessibility readiness, safety case, unit/E2E tests, performance and documentation. Do not use raw feature count as proxy for quality. P0/P1/P2 phases are specified in the companion CSV.

# Product capabilities: 68 features

28 original capabilities + 40 additional X-factor capabilities. These are candidate product requirements, not implemented claims.

- **F01** [CORE/P0] **Anonymous First Contact**: No login or identity to find public help.
- **F02** [CORE/P0] **Emergency Fast Lane**: Deterministic 112 and other verified immediate help links.
- **F03** [CORE/P0] **Multilingual Conversation**: Verified public navigation in 15 Indic languages plus English.
- **F04** [CORE/P0] **Minimum Question Interview**: Only ask the minimum necessary to identify an applicable pathway.
- **F05** [CORE/P0] **Uncertain Situation Mode**: Explore without presupposing offence or requesting sensitive details.
- **F06** [CORE/P0] **Device Safety Awareness**: Explain device monitoring and history risks without claiming stealth.
- **F07** [CORE/P0] **Help Someone Else Mode**: Expert reviewed bystander guidance.
- **F08** [CORE/P0] **Live Verified HelpGraph**: Source-backed help entries with jurisdiction and review timestamps.
- **F09** [CORE/P0] **181 to OSC Navigator**: User directed connection to 181 and its official OSC referral role.
- **F10** [CORE/P1] **OSC Appointment Copilot**: Prepare and review information for official appointment portal.
- **F11** [CORE/P0] **No Wrong Door Routing**: Show appropriate support pathway alternatives without imposing one.
- **F12** [CORE/P1] **Local Service Discovery**: Verified district scoped service search without exact location.
- **F13** [CORE/P1] **Tell Your Story Once**: User-approved compact summary for optional sharing.
- **F14** [CORE/P2] **Verified Human Handoff**: Consent-controlled delivery and provider-accepted states.
- **F15** [CORE/P1] **Action Approval Centre**: Exact recipient payload and intention before outbound action.
- **F16** [CORE/P1] **Incident Timeline Builder**: User controlled chronology with assertions separated from inference.
- **F17** [CORE/P1] **Private Case Vault**: Explicit opt-in encrypted local record and delete/export options.
- **F18** [CORE/P1] **Evidence Inventory**: Metadata and optional local hashes without intimate uploads.
- **F19** [CORE/P1] **Reference Tracker**: User entered complaint IDs and verified acknowledgements only.
- **F20** [CORE/P1] **Rights and Deadline Navigator**: Source reviewed procedural information and uncertainty.
- **F21** [CORE/P1] **User Controlled Follow-up Agent**: Only user approved reminders and outreach.
- **F22** [CORE/P0] **Outcome First Navigation**: Ask preferred outcome instead of assuming reporting.
- **F23** [CORE/P1] **Personal Pattern Finder**: User permitted descriptive grouping without accusing others.
- **F24** [CORE/P0] **Digital Abuse Response Mode**: Authorized and verified cyber help and takedown guidance.
- **F25** [CORE/P1] **Workplace and Campus Navigator**: Reviewed PoSH and institutional options.
- **F26** [CORE/P2] **Assisted Human Advocate Workspace**: Partner authenticated narrowly scoped workspace.
- **F27** [CORE/P1] **Share Only What's Necessary**: Consent scoped per recipient and redact preview.
- **F28** [CORE/P1] **Offline Help Pack**: Cached public verified numbers and generic guide only.
- **F29** [EXPANSION/P0] **Three Tap Need Finder**: Immediate choice among understand options report and help friend.
- **F30** [EXPANSION/P0] **Sentence to Path Router**: Tolerant user input mapped to in-scope reviewed categories.
- **F31** [EXPANSION/P1] **On Demand Voice Input**: Microphone requires foreground action; no ambient listening.
- **F32** [EXPANSION/P1] **Romanized Indic Understanding**: Handle Hinglish and informal romanized Indic phrases.
- **F33** [EXPANSION/P0] **Mid Session Language Switch**: Switch language preserving only permitted ephemeral state.
- **F34** [EXPANSION/P0] **One Question At A Time**: Cognitive load controlled stepper with back/edit and skip.
- **F35** [EXPANSION/P1] **Read Aloud General Help Card**: Optional voice of public information only.
- **F36** [EXPANSION/P1] **Easy Read and Icon Mode**: Illustrated user-tested plain language resource content.
- **F37** [EXPANSION/P1] **Pocket Service Cards**: Locally downloaded non-sensitive emergency directory export.
- **F38** [EXPANSION/P0] **Low Bandwidth Lite Mode**: Fast no images mode on low tier Android connections.
- **F39** [EXPANSION/P1] **Screen Privacy Control**: One touch hide detailed on-screen content, no stealth claims.
- **F40** [EXPANSION/P0] **Ephemeral Session Erase**: Explicit clear app state and warns history/backups may persist.
- **F41** [EXPANSION/P0] **Safe Device Checkpoint**: Optional warning before sensitive actions in shared device scenarios.
- **F42** [EXPANSION/P1] **Consent Receipt Dashboard**: Explain what would be stored shared and deleted.
- **F43** [EXPANSION/P0] **Citation Evidence Chips**: Every help assertion links to last verified authoritative source.
- **F44** [EXPANSION/P0] **Source Freshness Watch**: Warn if a source or contact has passed verification TTL.
- **F45** [EXPANSION/P0] **Verified Domain Preview**: Shows exact official hostname before leaving Sakhi.
- **F46** [EXPANSION/P1] **Conflict Aware Sources**: Expose inconsistent official records and prefer safe fallback.
- **F47** [EXPANSION/P0] **No Answer with Fallback**: Graceful admission of uncertainty and trustworthy next step.
- **F48** [EXPANSION/P0] **Human Reviewed Language Stamps**: Locale and content version tracking with review signoff.
- **F49** [EXPANSION/P1] **Three Path Comparison**: Explain multiple legitimate approaches and user choice.
- **F50** [EXPANSION/P1] **Draft Difference Viewer**: Show exact AI drafted edits compared to user facts.
- **F51** [EXPANSION/P1] **Channel Choice Companion**: Explain call official portal or assisted provider pathways.
- **F52** [EXPANSION/P2] **External Receipt Verifier**: No claim sent unless delivery response confirmed by adapter.
- **F53** [EXPANSION/P1] **On Device Evidence Fingerprints**: Hash user selected local file; do not retain file.
- **F54** [EXPANSION/P1] **Evidence Origin Labels**: Preserve original versus user paraphrase and AI suggested text.
- **F55** [EXPANSION/P2] **Per Recipient Share Preview**: User selects fields and previews post redaction handoff.
- **F56** [EXPANSION/P1] **Official Form Companion**: Step by step guidance alongside portals no CAPTCHA automation.
- **F57** [EXPANSION/P1] **Pre Call Talking Points**: Create optional short question checklist with user review.
- **F58** [EXPANSION/P2] **Human Handoff Alternatives**: Offer verified fallback when partner unavailable.
- **F59** [EXPANSION/P1] **Print Safe Referral Sheet**: Generate generic PDF card without user story by default.
- **F60** [EXPANSION/P2] **Trusted Partner Embed Widget**: Independent read only support finder widget for partner pages.
- **F61** [EXPANSION/P0] **Shareable General Help Cards**: No personalized disclosure in viral/share material.
- **F62** [EXPANSION/P1] **Bystander Training Micro Guides**: Expert reviewed Do and Dont guide for trusted helpers.
- **F63** [EXPANSION/P1] **Community Resource Corrections**: Moderated issue or PR review for nonprivate directory facts.
- **F64** [EXPANSION/P1] **991 OSC Validation Console**: Provenance based verification queue not fabricated API sync.
- **F65** [EXPANSION/P1] **Provider Contact Aging Alerts**: Flags stale contacts for authorized human recheck.
- **F66** [EXPANSION/P1] **Translator Review Workflow**: Crowd submissions never published without professional review.
- **F67** [EXPANSION/P0] **Safe Scenario Sandbox**: Synthetic workflows with visible Demo banner and no real action.
- **F68** [EXPANSION/P0] **Multilingual Evaluation Console**: Per locale test suites including emergency routing and abstention.


For every feature: implement, verify and document one vertical slice at a time. If blocked by a third-party contract, do not fake a success state. Provide a truthful, usable local alternative (official URL and user-reviewed draft) and a maintainer issue.

# 8. PREMIUM, TRUSTWORTHY UI/UX

Aim for the execution quality of a top consumer-grade application, without aesthetics that glorify danger, sexualize safety or make crisis support feel like a game.

Visual direction: calm, confident, understated, human, accessible, premium. Neutral ink, warm whites, restrained accent color, generous whitespace, sharp typography, tasteful motion and proper contrast. Avoid excessive pink, alarming red everywhere, false 'AI magic' glass panels, carousels, generic gradients, oversized icons, gamified victim metrics, intrusive popups or aggressive conversion funnels.

Design five first-class surfaces:
A. Public landing / trust page: 5-second understanding, support scope, no login, actual source and safety status, obvious urgent assistance, 16-language selector.
B. 'What do you need?' guided navigation: one question at a time, editable answers, minimal disclosure, skip options, progress not pressure.
C. Verified pathways: concise cards, source receipts, eligibility/jurisdiction, last verified, multiple alternative actions, official link hostname preview, uncertainty banner.
D. Agent workspace: only when explicitly opted in; editable drafts, reference timeline and consent dashboard, clean no-autosend boundaries.
E. Maintainer review console: source health, locale QA, OSC coverage, duplicate detection and release checks using synthetic/demo data.

Mandatory responsive layouts: 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 pixels. Real portrait mobile first, no horizontal scroll, comfortable 44x44 targets or WCAG-compatible alternatives, support keyboard and screen reader, RTL mirrored layout, long Indic strings and text zoom. Test browser back/forward, deep links, installation, offline fallback, low bandwidth, keyboard tab order, focus indicators and touch affordances.

Design tokens + UI storybook or component sandbox. Build original iconography from permissible icon sets. Generate non-sensitive screenshots from actual running product rather than stock illustrations of distressed women. Keep no fake logos/endorsements.

Targets, not assumed outcomes: WCAG 2.2 AA across scoped flows; Lighthouse accessibility >= 95 for tested pages; Performance >= 90 on the declared mobile test profile; no high/critical accessibility violations from axe; local navigation immediate with skeletons appropriately handled. Record actual measured values and known exceptions rather than claiming targets met.

# 9. RESPONSIBLE AGENT ORCHESTRATION

Use a small explicitly controlled orchestration graph and typed tools. Avoid an unconstrained general web/browser agent for users in sensitive situations.

States: `anonymous_entry`, `device_safety_notice_optional`, `urgent_redirect`, `minimum_intake`, `retrieve`, `check_scope`, `present_options`, `draft_private`, `approval_pending`, `external_action_attempted`, `provider_acknowledged`, `followup_opt_in`, `session_cleared`.

Core tools:
- `get_emergency_contact`: deterministic approved list.
- `find_verified_resources`: search/citation/jurisdiction filters.
- `explain_verified_pathway`: template-backed description with exact citations.
- `draft_user_reviewed_text`: copies user-confirmed facts, labels unconfirmed claims, no invented facts.
- `prepare_official_form`: private checklist and external official link; no CAPTCHA automation.
- `propose_share_packet`: exact fields, recipient, purpose, risks and expiration.
- `request_user_approval`: display actual content and destination.
- `submit_via_authorized_adapter`: disabled by default; requires verified authenticated contract and per-action consent.
- `record_external_receipt`: only from observable provider response or user-entered documented reference, with provenance.
- `clear_session`: removes app-controlled session data and explains limits (history, screenshots, OS backups not covered).

Implement allowlists, adapter-specific credential scoping, retry safety/idempotency, no auto resend, per-recipient approval, confidential error messages and no hidden actions. Make all external calls visible, logged without payload secrets and reversible where possible. An LLM cannot decide that consent is implied.

AI must never infer guilt, invent criminal patterns or suspect identities, scrape alleged offenders, make diagnosis, promise legal outcome or recommend that someone confront an alleged abuser. For ambiguous inputs, ask one harmless clarifying question or provide multiple reviewed safe pathways. For people under coercion or on monitored devices, warn about digital privacy limits and defer personalized safety planning to qualified professionals.

# 10. THREAT MODEL AND PRIVACY GUARDRAILS

Assume a hostile party could view browser history, receive device notifications, share the network/device, know passwords, discover cloud backups or exploit a poorly configured deployment. Never claim that 'quick exit' or 'incognito' makes someone untraceable.

P0 default: NO account, NO storing chat content, NO uploading evidence, NO precise geolocation, NO analytics recording content, NO cloud model request, NO third-party chat scripts. Public resources and static app shell may be cached; sensitive conversations, drafts and vault data must not be stored in service-worker caches.

P1 case vault: opt-in only, meaningful disclosure warnings, strong encryption using modern audited primitives and reviewed recovery/deletion model; minimize metadata and server exposure. Never roll custom cryptography. User may export/delete app-held content, with transparent limits of external copies, backups and outbound communications.

Security baseline: threat model (STRIDE and domestic-violence tech safety), OWASP ASVS relevant controls, protected logging, CSRF/XSS/SSRF/prompt-injection defences, strict CSP, dependencies audit, SBOM, malware scanning on any optional file upload, brute-force and rate limits, tenant separation for future partners, accessible consent and privacy review aligned with applicable Indian DPDP obligations.

Never collect intimate images or child sexual abuse material; direct users to existing qualified, privacy-preserving services as relevant. No broad investigative crawling, suspect scoring, facial recognition or 'most dangerous' map. Avoid case screenshots in public tests and telemetry. All examples use synthetic fictional people with no real contact details.

# 11. QUALITY BENCHMARKS AND EVALUATIONS

Create gold-standard synthetic evaluation fixtures with expert-labeled source expectations across core scenarios and 16 languages. Record every scenario, expected official route, jurisdiction, verified source, abstention condition and allowed answer boundaries. Test ambiguous phrases, typos, dialects, romanized input, hostile web snippets, prompt injection, indirect crisis language, unsafe advice requests, fictitious source citations and stale contact information.

Test minimums:
- 100+ fully documented cross-domain English baseline cases; 20+ baseline navigation cases per locale as resources permit.
- 100% passing defined emergency redirection tests (a test-suite threshold, not guarantee in real-world emergencies).
- 100% critical contact strings sourced and human verified before a user-facing verified release.
- Target >=95% correct in-scope pathway selection on human-reviewed test cases (do not fake achievement).
- Target >=90% top-3 retrieval relevance and compare vs local keyword-only BM25 baseline.
- Track each locale separately, with justified abstentions and 'needs review' gates where outcomes fall below target.
- 0 documented unapproved external data transmissions in tests; no production claims without privacy/security audit.
- Unit + integration + contract + Playwright E2E tests for all P0 workflows. Tests should run in offline/local mode.
- Accessibility: axe, WCAG manual tasks, keyboard, screen readers, RTL and 200/400% zoom.
- Performance: profile cold-start, model download (excluded from normal page load), model warm inference, retrieval p50/p95 on declared hardware; low-end mobile lab profile; no claims without actual instrumentation.
- Supply a `make verify` or equivalent one-command CI gate returning non-zero on failures.

Reference and regression tests must not call real emergency services, police lines, portals, or send messages to real users. Mock all external interactions; production integration tests require opt-in sandbox credentials and safe approved endpoints.

# 12. OPEN-SOURCE MONOREPO / INSTALL PATHS

Suggested structure:
```
/apps/web                 # Premium PWA and reviewed information pages
/apps/admin               # Restricted source and locale review interface
/services/api             # FastAPI agent/rules/retrieval server
/packages/ui              # Design system
/packages/i18n            # 16-locale resources
/packages/contracts       # shared schemas and typed service contracts
/data/public-seeds        # vetted, non-sensitive sample resources
/data/synthetic           # fictitious safe demo scenarios
/models                   # model setup scripts, NEVER committed model weights unless rights confirmed
/docs                     # architecture, privacy, safeguarding, evaluation and contributor guides
/scripts                  # setup, validation, resource checks and release tooling
/tests                    # unit, E2E, injection, localization and security tests
/.github                  # CI, issue templates, discussions and contribution automation
```

Deliver two setup paths:
A. `docker compose up --build` launches no-key public demo with deterministic/lexical help. If the actual command differs, make README match what was tested.
B. documented `make dev` (or npm/pnpm + Python uv) for Mac/Linux/Windows contributors with reproducible lockfiles.

Optional one-command model setup to download EmbeddingGemma 2 from the publisher after user accepts applicable terms. If unavailable, degrade to tested lexical retrieval with a visible 'Semantic search disabled' notice; still usable. Never download giant models silently or run expensive inference at page load.

PWA offline functionality is limited to signed/versioned **public resource packs**, with last-reviewed date and a stale warning. Offline cannot promise live centre availability, official submissions or emergency contact reachability.

Document storage and environment configuration. Ship `.env.example` with no secrets. No default demo credentials exposed to production. Require HTTPS and secure settings for self-hosted external exposure. `docker compose` demo must bind to localhost by default, not expose a sensitive app to the internet accidentally.

# 13. GITHUB README: WORLD-CLASS AND HONEST

Use `README_BLUEPRINT.md` as a checklist. Build a readable, stunning, practical GitHub README containing:
- Product logo text and clear motto, no fake official affiliation.
- Screenshot of the **actual app** on mobile and desktop, and a short synthetic demo GIF if affordable to create (no private data).
- Valid badges only: CI status from real workflow, license, current tag, tests if actually passing, localization coverage if measured; never invent production uptime or compliance certification.
- Prominent non-emergency-service notice and direct official help (112 and appropriate referral).
- User-facing 'why this exists', actual demo capabilities, clear limitations.
- **Before/after walkthrough**: searching across multiple portals vs using a verified Sakhi guidance flow. An illustrative UX comparison, not a claim of reduced time unless measured.
- 60-second demo storyboard using fictional data.
- Features marked **working / experimental / partner-only**.
- Support matrix for all 16 locales with translation review level, not falsely claiming full expert verification.
- Installation: `git clone`, minimal requirements, 1-command Docker, open localhost URL; actual tested commands on Mac, Linux, Windows.
- Zero-key mode vs optional local embedding installation and hardware/resource expectations; optional BHASHINI registration explicitly acknowledged.
- Explain under the hood: EmbeddingGemma retrieval, deterministic safety policy, source provenance and permission gates; architecture Mermaid chart.
- Sample synthetic workflows and screenshots of approval requests / no false referral status.
- Documentation links: privacy, terms, responsible use, security, threat model, resources, API, docs, contributor quickstart.
- How to add/change official resources, how source reviews and stale removal work, how to translate, how to run tests and create PRs.
- Accessibility, offline limitations, community standards, good-first-issues and Roadmap.
- Licence and dependency/license caveats; appropriate acknowledgements for government sites and third-party OSS; never imply endorsement.
- Honest 'Not yet available' section listing public integrations, live OSC verification, case management, 24/7 monitoring, certified counselling.
- Public demo hosted URL only after deployment and verification; otherwise clear localhost instructions.

README must render correctly on GitHub and pass link checks; content must match the running code and actual state. No generic lorem ipsum. No fictitious user quotes.

# 14. TWO CODEX BUSINESS SEATS: DIVIDE WORK CLEANLY

Assume two coding agents/sessions can work in parallel if user launches both; do not assume the model can create its own worker processes without tool support.

Recommended split:
- **Seat A / Branch A**: design system, public PWA, onboarding, i18n, zero-key guided journeys, accessible verified resource cards, release docs.
- **Seat B / Branch B**: authoritative source registry/211 seed ingestion, HelpGraph schema, EmbeddingGemma retrieval, offline fallback, synthetic eval suite, governance, security and 991 OSC verification queue.

Agree contracts (`packages/contracts` and OpenAPI) before parallel implementation; use separate worktrees/branches, no simultaneous editing of one generated file. Each branch has CI and explicit merge ownership. Integrate into a single coherent mainline. Review other seat's safety-sensitive changes. Open PRs with test evidence rather than pushing directly to protected main. If only one Codex seat is available, execute sequentially with the same quality bar.

# 15. ETHICAL ADOPTION, COMMUNITY AND PUBLIC BENEFIT

Design for adoption by universities, women-led NGOs, legal-aid groups, disability advocates, language volunteers and general users. Build a shareable **general-help** card system, not a viral loop dependent on publicly disclosing abuse. No public personal case timelines, no targeted advertising based on crisis content, no sale of user information or hidden sponsor priority.

Create an open-source community experience: CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md with private disclosure, issue and PR templates, maintainer guide, license compliance, labels, good first issues, architecture notes, verified translation and source-correction process, transparent governance and moderation. Create a public 'Help us improve the directory' mechanism that accepts only nonsensitive resource corrections and explicitly warns against submitting personal cases via GitHub.

Include integration plugin adapters and the Open Referral HSDS-compatible schema so authorized providers can contribute safely; never treat a third-party source as endorsed/connected without written agreement. Initial partnerships are aspirational, not actual.

Privacy-friendly success metrics: completed resource discovery, verified contact click-through (without personal context), time-to-find in moderated usability tests, link freshness, locale coverage, user-rated comprehension with opt-in consent, successful authorized partner handoffs when such integrations exist. Do not optimize for minutes spent recounting traumatic experiences.

# 16. CODEX EXECUTION ORDER / PHASE-GATED DELIVERY

**Phase 0: Reality check and project bootstrap**
- Inspect repository and platform; catalogue blockers; check actual model/source licences; create ADR and threat model; ingest CSV and 68-feature matrix as planning assets.
- Create scripts validating row counts, links, duplicates, feature IDs and translations. Preserve provenance.
- Create working skeleton and real design system, lockfiles, Docker local dev, type-checking, linting and CI.

**Phase 1: P0 product slice**
- Deliver premium mobile-first landing, 16-language UI shells, quick support finder, deterministic emergencies, reviewed public help lookup, official source receipts, multilingual fallback, privacy warning, general share card and synthetic demo.
- Expose at least one functioning full journey from plain language to a real verified OFFICIAL LINK, with citations, no accounts, no model fees and no sensitive data storage.

**Phase 2: intelligent retrieval and quality**
- Install optional EmbeddingGemma 2 text-only locally; index only reviewed public resources; implement hybrid search, abstention, source expiry and evaluation dashboard; compare against BM25 baseline.
- Extend curated source directory. Add human-reviewed translations and 16-locale tests. Reject poor results rather than fabricate confidence.

**Phase 3: administrative assistant beta**
- Optional private drafts, local timeline, selective redaction, opt-in vault after review, manual status/reference entry, checklist generator, approval UI. Do NOT send automatically to official systems.

**Phase 4: OSC network and partner groundwork**
- Build 991-source-record validation workflow. Import only individually supported centre records, expose registry coverage, request institutional pilot permissions. Keep partner connectors disabled by default.

**Phase 5: GitHub release**
- Execute security, accessibility, i18n, performance, privacy, functional and documentation gates. Produce honest release-readiness report and reproducible test log.
- If permitted and ready, create public repo, tag `v0.1.0-preview`, add release notes and GitHub template files. If authorization or safety review is missing, prepare publication-ready branch and report exact blocker; do not quietly publish unsafe material.

Use weekly labels for planning if useful but do not claim any fixed schedule will be achieved. Completion follows passing quality gates, not a calendar.

# 17. MANDATORY OUTPUTS AND FINAL REPORT

Deliver actual code, real screenshot(s), CI, tests, lockfiles, Docker, one-command local run, documentation, working source search and demo. Maintain `docs/RELEASE_GATES.md` and append a real test results artifact.

Your final written report must include:
1. Repository and branch URL (only if created/confirmed).
2. Exact working setup commands, test commands and optional model setup.
3. Working P0 features with evidence.
4. List of P1/P2 capabilities and honest unavailable status.
5. Number of resource leads ingested, reviewed, approved and actually exposed to users (four DIFFERENT counts).
6. OSC counts: authoritative reported national count/date, individual sourced records, independently verified contacts, actual partner integrations (four DIFFERENT counts).
7. 16-language key coverage and language review status individually.
8. Retrieval benchmark results by language and baseline; no invented figures.
9. Accessibility/performance results from real runs, with device/browser and date.
10. Security, privacy and high-risk workflow test results, plus unmitigated risks.
11. Screenshots and exact navigation proof.
12. Files changed, commits/PRs, deferred issues and release blockers.
13. Every external account/API/partner authorization needed for future features.
14. Honest verdict: `preview_ready`, `internal_demo_only`, or `blocked`, with reasons.

Commit work incrementally. Never leave the user with just a plan. If time/compute is constrained, prioritize a vertically complete, truthful, accessible P0 public navigator and a reproducible local install over superficial implementation of all 68 features.

# 18. START IMMEDIATELY

Step 1: Inspect current directory and Git. Read companion files. Print a concise implementation plan and chosen stack rationale.
Step 2: Initialize or preserve project. Build the foundational, usable vertical slice.
Step 3: Run the app and render screenshots at mobile and desktop. Fix UI problems.
Step 4: Continue with feature-gated retrieval, data registry, i18n and tests.
Step 5: Keep developing until the defined scoped quality gates pass or report an actual blocker.

Never claim to have done unobserved work. Do the work.

---

## APPENDIX: VERIFIED OFFICIAL ENTRY POINTS TO SEED THE FIRST HELP GRAPH

These entries are entry points for independent checking. They are NOT a guarantee of live acceptance, authorization, or data reuse:

- Emergency response: https://112.gov.in/
- Women Helpline 181: https://wcd.gov.in/women/help
- Mission Shakti: https://missionshakti.wcd.gov.in/
- OSC appointment portal: https://missionshakti.wcd.gov.in/appointmentBooking
- NCW complaints: https://ncwapps.nic.in/onlinecomplaintsv2/
- NALSA women assistance: https://nalsa.gov.in/womens-assistance/
- SHe-Box: https://shebox.wcd.gov.in/
- Cybercrime portal: https://cybercrime.gov.in/
- GAC: https://gac.gov.in/
- MHA state police portal index: https://digitalpolice.gov.in/DigitalPolice/portal
- NALSA state legal services: https://nalsa.gov.in/
- StopNCII: https://stopncii.org/
- Take It Down: https://takeitdown.ncmec.org/
- OSC national aggregate: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1
- Open Referral data specification: https://github.com/openreferral/specification
- Google EmbeddingGemma 2 technical model card: https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2
