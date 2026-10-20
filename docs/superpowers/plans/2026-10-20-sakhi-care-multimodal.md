# Sakhi Care and Multimodal Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task in the existing branch. Do not start parallel agents unless the user authorizes them. This is a planned build, not an implementation receipt.

**Goal:** Deliver a caring, accessible23-language Indian public-support product with consent-separated text, voice notes, audio/video, foreground-location and AAC input, followed by a truthful gated public launch and Instagram reel.

**Architecture:** Preserve the React PWA, FastAPI, deterministic emergency policy and local retrieval. Add complete localisation/care content, local accessible input controls and an optional isolated owned media worker. A versioned capability matrix enables only reviewed language/mode scopes; all private processing and sharing have separate approvals.

**Tech Stack:** Existing React19/TypeScript/Vite/FastAPI/SQLite/Leaflet, native File/MediaRecorder APIs, explicit optional pinned local ASR/OCR/VLM adapters selected after evaluation. No mandatory account, paid API, cloud inference or multi-GB browser startup download.

**Spec:** [2026-10-20-sakhi-care-multimodal-design.md](../specs/2026-10-20-sakhi-care-multimodal-design.md)

## Global Constraints

- Language target:22 scheduled Indian languages plus English,23 distinct languages; script/dialect coverage separate. No claim of every Indian language or universally supported speech.
- Emergency contacts appear before JavaScript/media/model/network requests. Deterministic emergency/minor checks and public retrieval remain independent of generative output.
- One active private artifact/session. Audio<=120s/10MiB, video<=60s/20MiB; optional image<=8MiB/16MP. One selected10s segment/five selected frames for analysis. These are proposed limits to validate.
- Two running media jobs/four queued;45s process timeout,90s upload timeout,5min absolute job expiry. No private content in logs/URLs/analytics/persistent browser storage/backups/Git.
- Separate permission to acquire, interpret on a named processor and share an exact payload with a chosen recipient. Editing, replacement, cover/background, expiry, clear and route exit invalidate relevant approvals/results.
- No automatic calls, alerts, community/private-media publication, identity/offender recognition, credibility/emotion/risk verdict or legal/medical guarantee.
- Under18 private-media processing disabled until child-specific legal/safeguarding approval. Accessible AAC/text/public child support remains usable without media or a caregiver disclosure requirement.
- Feature flags cannot grant language/source/security approval. All approvals bind exact version/hash/scope/reviewer/expiry. No account/credentials/payment/agreement action without founder handling.
- Retain pink/black design, relative typography and44px target design; no autoplay/private read-aloud or camera-based gaze tracking.
- Run Playwright suites sequentially. Preserve user-owned untracked planning/NEXT_CHAT_MASTER_PROMPT_2026-10-20.md. No broad staging, credential reads or unrelated listener replacement.

## Review Focus

1. Late microphone permission/job responses after Hide/Clear: stop tracks/delete job and never restore a discarded artifact. Tests owned by Tasks6/7.
2. Negation, image age, dialect and uncertain speech: confirmation cannot be skipped or converted into invented eligibility. Tests owned by Tasks2/8/10.
3. Switch/eye-gaze and a potentially coercive companion: all choices work without speech/gestures, with an accessible cancel and no automatic caregiver contact. Tests owned by Tasks4/11.
4. Media containing prompt injection, third-party/intimate material or malformed decoder payloads: treat it as data, bound processing, refuse excluded use and retain public alternatives. Tests owned by Tasks5/7/9.
5. Reel traffic to an unsupported language/codec or failed provider: honest capability labels, useful public fallback, observable rollback; no simulated sent/delivery or unsafe launch claim. Tests owned by Tasks11/12.

## Delivery sequence and dependency order

R1 internal care/access slice: Tasks1-4. R2 internal private-input/worker slice: Tasks5-9. R3 grounded intelligence and acceptance: Tasks10-11. R4 public deployment/reel: Task12 only after all gates. Reviewer recruitment, source/contact verification, licensing and provider-capacity work must start alongside R1 so they do not become a surprise at release.

Recommended first engineering slice: extract all UI content, implement the care response contract and a fully working local AAC journey with no model required. Prove a woman can choose a need without typing/speaking, correct it and reach a useful reviewed path. This delivers care/access value before private media or model infrastructure.

Order is fixed; calendar is not. Staffing, review capacity and hardware are unassigned. Planning envelope, not commitment:4-8 engineering weeks with dedicated frontend and backend contributors plus concurrent qualified reviews; a single engineer or delayed reviewers will extend it. No launch date, hiring, paid service or reviewer availability is asserted. Re-estimate after Task1's content inventory and Task8's device benchmark.

## Shared planned interfaces

Place types in `packages/contracts/input.ts` and `packages/contracts/care.ts`; generate OpenAPI from actual endpoints, not these notes.

- `InputKind = "text" | "voice_note" | "audio_file" | "video_file" | "aac" | "position" | "image_file"`.
- `ArtifactRef = { id: string; revision: number; kind: InputKind; language: string; state: "local" | "reviewing" | "processing" | "ready" | "failed" | "revoked"; expiresAt: number }`. Browser Blob/text belongs to an in-memory store, not a serializable loggable artifact object.
- `ProcessingApproval = { artifactId: string; revision: number; purpose: "transcribe" | "visible_content" | "interpret"; processorId: string; processorVersion: string; language: string; expiresAt: number }`. External sharing retains its own existing recipient/content approval.
- `ConfirmedInput = { artifactId: string; revision: number; language: string; text: string; confirmedSpans: Array<{start: number; end: number; sourceSegmentId: string}> }`.
- `Capability = {language: string; script: string; mode: string; status: "unavailable" | "draft" | "review_pending" | "approved_scope" | "expired"; contentHash: string; reviewIds: string[]; expiresAt: string | null }`.
- `CareResponse = {acknowledgementKey: string; understanding: string; uncertainty: string[]; nextActionId: string; alternativeId: string; sourceClaimIds: string[]; observedSegmentIds: string[]; status: "local_draft" }`.
- `MediaProposal = { jobId: string; artifactRevision: number; language: string; segments: Array<{ id: string; startMs: number; endMs: number; proposedText: string; uncertain: boolean }>; warnings: string[]; processedScope: string }`.
- Worker endpoints, only when enabled: `POST /api/media/jobs` creates a job/capability from non-content metadata; `PUT /api/media/jobs/{id}/content` accepts a bounded approved stream; `POST /api/media/jobs/{id}/process` starts the approved task; `GET /api/media/jobs/{id}` returns status/proposal; `DELETE /api/media/jobs/{id}` cancels and erases. Capability goes in an authorization header, never a URL. Jobs are anonymous, same-origin, short-lived and isolated; no user account or private URL is created.

### Task1: Capability registry and complete content inventory

Files: create `packages/i18n/locales.json`, `data/public-seeds/language-capabilities.json`, `scripts/localisation_inventory.py`, `tests/test_language_capabilities.py`; modify `packages/contracts/index.ts`, `services/api/schemas.py`, `apps/web/src/locale.ts`, `scripts/validate_project.py`, `docs/TRANSLATION_REVIEW.md`, `services/api/schemas.py:NavigateResponse`.

Consumes existing16 catalogues and23-language target. Produces generated `Locale`/LOCALES, registry lookup `getCapability(language: string, script: string, mode: string): Capability`, a report of all UI/source/consent/care strings and external-owner dependencies. Existing locale URLs remain compatible.

- [ ] Write failing tests for23 unique languages, seven missing languages, explicit script state, expired/mismatched approval and no unknown locale silently approved. Include a regression proving that the old validator's forced review_pending rule cannot accept or verify real approval records.
- [ ] Run `uv run --frozen pytest tests/test_language_capabilities.py -q`; observe the missing registry/contract failure.
- [ ] Implement one canonical registry, generated shared unions/backend language list, approval hash validation and the content inventory. Seed new languages as unavailable/draft with no invented human review. Replace the current hard-coded review_pending response enum with validated capability states, never a blanket approved value.
- [ ] Run the focused test, structural checks and current locale tests; inspect bidi names/old URL compatibility. Save the actual complete content word/key inventory.
- [ ] Commit only named files with `feat: track language and modality readiness`.

### Task2: Whole-product localisation and review pipeline

Files: modify `packages/i18n/*.json`, `apps/web/src/{App,SupportGuide,TrustDetails,Community,Maintenance,PreparationLibrary,ResultGuide,Modal}.tsx`, travel modules and source-card components where inventory identifies copy; create `scripts/check_localisation.ts`, `data/reviews/languages/README.md`, `tests/localisation-complete.spec.ts`, `tests/test_review_receipts.py`.

Consumes registry/inventory. Produces `message(locale: Locale, key: string): string`, translated versioned public content and per-scope review receipts. Machine draft is a maintainer operation, never an approval or a private runtime cloud request.

- [ ] Write failing tests that every product page/control/error/consent/source explanation in an approved scope resolves in the selected language; expired/draft text has a reviewed local-language notice and no silent English masquerade. Include Kashmiri/Sindhi bidi, Manipuri/Santali script cases, negation and age distinctions.
- [ ] Run the new tests against existing English-heavy surfaces to establish RED.
- [ ] Extract copy, add seven language catalogues and script-aware self-hosted font subsets; use pinned translation candidates for drafts only. Build immutable reviewer/version/hash/scope/expiry records. Original official names remain separately identifiable.
- [ ] Run key/content/placeholder checks, all23 route/reflow tests, font codepoint/shaping checks and native/domain review. Approve only actual reviewed scope; if reviewers are unavailable, retain pending status and complete internal engineering without marketing readiness.
- [ ] Commit content extraction/drafts separately from later actual human approval receipts. Record unresolved dialect/script coverage.

### Task3: Care response, one action and user-controlled preparation

Files: create `packages/contracts/care.ts`, `data/public-seeds/care-content.json`, `apps/web/src/care/{CareCard,PreparationSteps}.tsx`, `services/api/care.py`, `tests/test_care.py`, `tests/care.spec.ts`; modify `App.tsx`, `ResultGuide.tsx`, `SupportGuide.tsx` and locale content.

Consumes confirmed choices/text and approved public resource IDs. Produces `build_care_response(confirmed, resources, locale) -> CareResponse` and a memory-only checklist. No model required in this task.

- [ ] Write tests for nonjudgmental acknowledgement, one next action plus alternative, unknown eligibility preserved, no fabricated sent/human status and no instruction to contact an assumed safe family member. Include child/unsafe-caregiver paths and a user declining to tell a story.
- [ ] Run `uv run --frozen pytest tests/test_care.py -q` and the focused browser cases; establish RED.
- [ ] Implement versioned reviewed templates, original/understanding edit, practical question/checklist preparation and expandable source/uncertainty. Keep all nine page changes consistent with the spec.
- [ ] Run focused tests, keyboard/320px/RTL checks; assess copy with the safeguarding and disability reviewers. No source-linked care template becomes clinical care by naming LIVES.
- [ ] Commit `feat: guide each concern with a caring next step`.

### Task4: AAC communication board and access preferences

Files: create `apps/web/src/input/{AACBoard,InputChooser,AccessPreferences}.tsx`, `data/public-seeds/aac-concepts.json`, `tests/aac.spec.ts`, `tests/aac.test.ts`; modify `App.tsx`, core locale content and input contracts.

Consumes stable concept IDs and localised reviewed labels. Produces `composeAAC(conceptIds: string[], locale: Locale): ConfirmedInput` after explicit confirmation. Preferences stay in memory unless a later separate reviewed storage control exists.

- [ ] Write failing tests for labelled symbol+text selection, Yes/No/Not sure, undo/clear/confirm, switching input methods, no automatic audible output and no external/API request for the immediate-help concept. Test actual keyboard traversal, not just programmatic focus.
- [ ] Establish RED with `npx playwright test tests/aac.spec.ts --project=chromium`.
- [ ] Implement a stable fixed board using original/appropriately licensed icons and native buttons. Cover needs, communication preference and concern categories without diagnosing disability; preserve public child/emergency paths.
- [ ] Run focused tests in all three engines and physical switch/eye-gaze/TalkBack/VoiceOver sessions before claiming compatibility. Prototype a complete need-to-action AAC journey even while language approvals are pending.
- [ ] Commit `feat: add symbol and text communication input`.

### Task5: Ephemeral input state and exact processing consent

Files: create `packages/contracts/input.ts`, `apps/web/src/input/session.ts`, `apps/web/src/input/consent.ts`, `apps/web/src/input/{InputWorkspace,ArtifactPreview,ProcessingConsent}.tsx`, `tests/input-session.test.ts`, `tests/input-consent.spec.ts`, `apps/web/src/travel/DevicePositionOverlay.tsx`, `tests/location-input.spec.ts`; modify `App.tsx`, `DataBoundary.tsx`, `TrustDetails.tsx`, `Modal.tsx`, `travel/LocalPosition.tsx`, `travel/LiveMap.tsx`.

Consumes selected local Blob/text and capabilities. Produces `registerArtifact(kind, blobOrText, language): ArtifactRef`, `approveProcessing(ref, processor, purpose): ProcessingApproval`, `invalidateInput(reason): void`, with no upload before approval.

- [ ] Write tests for replacement/revision invalidation, local filenames not in telemetry/URLs, off-origin processor refusal, consent expiry, no private localStorage/IndexedDB/cache and stale results after cover/background/clear.
- [ ] Run focused unit/browser tests to observe missing state-machine failures.
- [ ] Implement memory-only Blob/text ownership, exact size/language/processor/purpose preview, object-URL revocation and generation guards. Keep interpretation and recipient approval separate; synthetic mode disables processing/external opens. Make privacy copy capability-aware: an enabled upload/recorder cannot retain the old blanket “No uploads” or “microphone unavailable” claim; explain actual processor, temporary retention and limits in every enabled language. Add an optional local position overlay without automatic map movement/requests; separately disclose/approve a surrounding-area tile load. Use only a user-confirmed public city ID in care/matching, not raw GPS in a model request.
- [ ] Run privacy-negative tests in three engines, including no tile request from acquiring/showing the local marker, separately approved recentering and marker cleanup/late readings. Show fallback text/AAC on unsupported/declined mode without losing the user's goal.
- [ ] Commit `feat: isolate input preview and processing consent`.

### Task6: Voice recording and existing audio/video input

Files: create `apps/web/src/input/{VoiceRecorder,MediaPicker,MediaReview}.tsx`, `apps/web/src/input/useRecorder.ts`, `tests/recorder.spec.ts`, `tests/media-input.spec.ts`; modify `services/api/main.py` permission/CSP headers behind input flags, `tests/test_api.py`.

Consumes Task5 state. Produces reviewed local voice/audio/video artifacts with typed duration/size/selected-scope metadata. Camera remains denied; initial video input is an existing file, not a live camera or secret recorder.

- [ ] Write failing tests for MIME negotiation, denied/unavailable microphone, late permission after Hide, track stop on all exits, silence, recording memory bound, unsupported codec, oversize/over-duration/zero-byte file and screen-reader duration/status. Exact original filename stays local.
- [ ] Run focused tests; verify that the current microphone-denied policy cannot record and is not bypassed accidentally.
- [ ] Implement explicit start/stop/play/delete, optional paused/re-record flow, record button alternative to hold gestures, native type detection, muted video preview and segment choice. Set microphone=self only for the reviewed flag; narrow blob media CSP. No browser remote-ASR fallback.
- [ ] Run three-engine synthetic-device tests plus physical Android/iOS recording/codec/suspension/indicator checks. Check no startup prompt and no upload before processing consent.
- [ ] Commit `feat: record and review bounded audio and video input`.

### Task7: Isolated owned media worker, cancellation and erasure

Files: create `services/media/{schemas,jobs,decode,worker}.py`, `services/api/media.py`, `tests/test_media_jobs.py`, `tests/test_media_decode.py`, `tests/media-worker.spec.ts`, `docs/ADRs/004-private-media-worker.md`; modify API routing, Docker/compose and dependency locks only as justified by the decoder spike.

Consumes an exact ProcessingApproval and bounded upload; produces status and MediaProposal. Apply the shared job endpoints and time/queue/TTL limits. No network access from the decoder/model worker, no original-filename paths and no general URL ingestion.

- [ ] Write failing tests for content-type spoofing, decoded dimension/duration bombs, path traversal, interrupted upload, worker crash/restart cleanup, queue saturation, anonymous capability isolation, expired job and cancellation during inference. Check metadata/logs/cache/backups for no private content.
- [ ] Establish RED with `uv run --frozen pytest tests/test_media_jobs.py tests/test_media_decode.py -q`.
- [ ] Implement bounded streaming, magic/decode validation, pinned sandboxed decoder, tmpfs quota, capability-only access, immediate revoke and5min cleanup/reaper. Disable media by default until its deployment gate passes; core remains usable without worker/model.
- [ ] Run negative/container tests and an independent security/privacy/legal review of actual transport/retention/child policy before accepting private production inputs. Do not equate RAM/tmpfs with certified erasure.
- [ ] Commit `feat: process consented media in bounded isolated jobs`.

### Task8: Language and speech benchmark, then ASR adapter

Files: create `models/registry.json`, `scripts/evaluate_multimodal.py`, `services/media/asr.py`, `tests/test_asr_contract.py`, `data/synthetic/multimodal-eval-design.json`, `docs/evidence/multimodal/README.md`; extend capability and review registries.

Consumes a bounded approved audio segment and a pinned eligible candidate. Produces `transcribe(audio_ref, language, approval, cancel) -> MediaProposal`; no unsupported language auto-detection guess that changes scope silently.

- [ ] Freeze independently authored text/audio development and speaker-held-out sets before tuning. Implement tests for silence hallucination, negation/age/contact-number changes, mixed speech, unsupported language, unavailable weights and late result. Existing16 English classification cases are not an ASR benchmark.
- [ ] Establish RED for the absent adapter; run no model download until the exact access/licence and maintainer action are authorised. Record unavailable candidates rather than substituting community weights silently.
- [ ] Compare IndicConformer, eligible Indic-Transcribe and whisper.cpp for supported scopes using approved fictional/consented recordings; report per-language/group errors, uncertainty, downstream routing, p50/p95 time, peak memory and real low-end phone behavior. Audit/pin custom code before executing it.
- [ ] Select only candidates/scopes passing the spec's finite promotion gates; populate actual capability evidence. Return editable transcripts, not final allegations/advice. Do not declare22-language speech from the publisher's coverage label.
- [ ] Commit adapter/evaluator separately from actual model approvals. Keep deterministic emergency/local retrieval unchanged and no weights in Git/Docker by default.

### Task9: Video-derived interpretation, OCR and ISL pathway

Files: create `services/media/{frames,ocr,vision}.py`, `apps/web/src/input/{SegmentReview,ISLPathway}.tsx`, `tests/test_visual_scope.py`, `tests/visual-input.spec.ts`, `data/public-seeds/isl-guidance.json` and source/review records.

Consumes approved selected segment/frames. Produces timestamped visible-text/description proposals and processed-scope labels. Video/audio/OCR sources never become authoritative facts without confirmation. ISL translation remains unavailable unless a separate Deaf-led evaluated channel is actually established.

- [ ] Write tests for video without audio, audio without visible text, unreadable/occluded frames, unsupported signs, multilingual text, user correcting a proposal, prompt instructions embedded in media and requests for identity/credibility/offender/age/risk judgments.
- [ ] Establish RED against missing functionality. Prepare safe synthetic visuals, not private/intimate examples.
- [ ] Add selected-frame OCR; compare eligible Qwen3-VL/Gemma visual descriptions only if rights/hardware permit. Fail closed to transcript/OCR/user notes when visual inference fails. Preserve the original file; derivative summaries are not evidence custody/admissibility.
- [ ] Build signed public guidance with actual rights/reviewer receipts and a reviewed external ISL/relay alternative, including scope/hours/unknown availability. Require explicit consent/recipient agreements for any later human interpretation; no invented staff or dictionary-to-universal-translator claim.
- [ ] Run visual/Deaf-led accessibility review and focused tests, publish processed/unprocessed limits; commit `feat: review video-derived content and sign-language alternatives`.

### Task10: Grounded intelligent insights and session-local themes

Files: create `services/api/{interpretation,insights}.py`, `data/public-seeds/claims.json`, `apps/web/src/care/{UnderstandingReview,InsightCard}.tsx`, `tests/test_insights.py`, `tests/insights.spec.ts`.

Consumes ConfirmedInput + approved source claims. Produces CareResponse; `propose_insights(confirmed_inputs, claims, goal, locale) -> list[CareResponse]`, default display one. Two or more confirmed observations are required for a possible-theme suggestion, not proof of abuse or culpability.

- [ ] Write tests for unsupported fact/eligibility, unsourced contact, unconfirmed ASR/OCR, missing/conflicting dates, coercive/blaming advice, sensitive attribute inference, stale claims and false sent/delivery. Include counterfactual demographic/access cases with identical relevant facts, plus transcripts exceeding the current2000-character navigation limit so they cannot be silently truncated.
- [ ] Establish RED before adding model-assisted interpretation.
- [ ] Implement source/segment IDs, user-confirmation boundary, schema validation, restricted local retrieval, one useful clarification/fallback and reviewed care templates. Compare any generative proposer with the deterministic baseline on a sealed set before promotion; no runtime free-form safety adviser.
- [ ] Run groundedness/critical-error/abstention checks per language and unsafe subgroup. Reject output that cannot resolve its allowed claims. Keep personal patterns session-local/opt-in; no cross-person surveillance or statistical crime zones. Preserve the existing2000-character navigate contract; let the user choose/confirm a bounded excerpt for that endpoint or use an explicitly separate reviewed structured interpretation contract. Never silently truncate a long transcript.
- [ ] Commit `feat: ground useful insights in confirmed input and sources`.

### Task11: Complete acceptance, source review and operational release candidate

Files: extend browser/Python tests, `docs/{QUALITY,PRIVACY,THREAT_MODEL,TRANSLATION_REVIEW,RELEASE_GATES,RELEASE_REPORT,PROGRESS}.md`, `scripts/capture-recovery.mjs` or a dedicated new capture helper, release manifest, safety case and incident/rollback runbooks.

Consumes implemented Tasks1-10 and actual human review records. Produces a versioned release candidate with a machine-readable accepted language/mode/journey scope. No placeholder reviewer or fabricated contact approval.

- [ ] Add complete journeys for every input mode,23 languages/scoped scripts, care/result correction, permission/storage/codec/background/provider failure, offline/public emergency and revocation. Test worker-disabled operation. Add a release check that any missing human/physical/operational gate prevents a public-ready verdict.
- [ ] Run `make verify` alone, `make quality`, new media/model evaluation and container/asset-integrity checks; retain actual logs and failures. Inspect every page and changed state on mobile/desktop/RTL. No fixtures close actual provider capacity.
- [ ] Execute named native/domain/source/privacy/security reviews and consented access-needs/physical-phone/offline sessions. Source external operational/legal agreements through founder action; do not collect private stories for product validation.
- [ ] Set an explicit supported concurrent-user capacity from measured ingress/worker/provider tests; define owner, alert, rollback and media-disable procedure. Load-test outside emergency/provider shared endpoints. Appoint a real private disclosure route and community moderation owner.
- [ ] Commit the actual verdict/evidence. If reviews/capacity are missing, deliver a controlled internal candidate with useful alternatives, not a public-launch tag. Retain all unmet full23-language/mode requirements.

### Task12: Public release and Instagram launch package

Files: `docs/launch/INSTAGRAM_LAUNCH_PLAN_2026-10-20.md`, `docs/launch/claim-ledger.json`, `docs/launch/release-manifest.json`, approved caption/subtitle/transcript/cover assets; build the final reel from the accepted release, not these planning mock-ups.

Consumes a passing public gate and actual approved host/release URL. Produces a reproducible signed-off launch package with exact claim-to-build/evidence mapping, captions/descriptive transcript and actual health/capability acceptance. Publish action and account/rights decisions stay separately explicit.

- [ ] Implement a dry-run launch check that fails for no accepted23-language scope, missing public HTTPS URL, unreleased-feature shots, rights/translation/accessibility gaps or an open critical gate. Distinguish a clearly labelled early-feedback announcement from product launch.
- [ ] Prepare the30-second storyboard, source footage from synthetic demo data, reviewed voice/captions, static cover and low-bandwidth public landing. Export1080x1920/30fps H.264/AAC as chosen production targets; inspect crop, sound-off understanding, contrast and captions on a phone.
- [ ] Test the actual hosted build, emergency-before-network, all advertised inputs/languages, no private transmissions, saturation/failure and rollback. Check draft upload rendering against current Instagram behavior. Use licensed music/consented voice only; no fear footage, real survivors or partners' logos.
- [ ] Obtain final content/rights and release decision on the concrete package; do not send/release through someone else's account or announce missing features. Log actual publish/submission only after it occurs.
- [ ] Record exact published state/URL/time, measured errors and rollback owner. Keep narrative-free monitoring and pause promotion if a critical regression appears.

## Completion checklist

- [ ] All requested inputs are actually usable within an explicitly reviewed scope, with useful non-media alternatives.
- [ ]23-language core content is human reviewed; modality/script gaps visible. Full cross-mode marketing waits for full matrix acceptance.
- [ ] Care, source facts, confirmed observations and tentative themes remain distinct; no fabricated results/authority/operations.
- [ ] Security, safeguarding, child/media, privacy, accessibility, source/contact, device/offline and capacity gates have actual named evidence.
- [ ] Every page/journey/failure state tested and visually inspected; model comparisons held out, never substituted for professional review.
- [ ] Production host/HTTPS/incident/rollback/community processes operating; no secret/private-user data committed.
- [ ] Reel uses the accepted build, precise language scope, accessible captions/transcript and actual tested CTA. Public posting is a separately observed action.

## Planning self-review

Requirements covered:23 languages Tasks1/2/8/11; video/audio/voice/text Tasks5-9; location maintained and retested Tasks5/11; additional AAC Task4; ISL Task9; care/preparation Task3; facts/patterns/insights Task10; women-focused product/operating research in linked memo; shippable operations/reel Tasks11/12. Interfaces above are shared by name. Each review-focus failure has an owning negative test. No planned task is marked complete, no human reviewer/availability is invented, and no source/budget/account dependency has been declared resolved.
