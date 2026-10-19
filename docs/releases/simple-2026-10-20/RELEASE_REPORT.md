Historical report: simplified experience before the live-travel revision. Codee412dd1, documentation2f24722. All12 named evidence hashes were recovered from Git and verified. Current state is ../../RELEASE_REPORT.md.

# Sakhi measured release report

Date: **2026-10-20, Asia/Kolkata**. Verdict: **`internal_demo_only`**. The scoped local engineering sprint is implemented, running and verified. The portal is not approved for mass public use, and no safety outcome or operational institution integration is claimed. Accessibility, usability and UI/UX are permanent equal pillars, each with its own evidence and human gates.

The founder requested a much simpler opening and an app-wide pink/black theme on October 20. Implementation commit `e412dd1` provides a 40-word main entrance, one primary next step, compact finder chrome and detailed learning/source exploration on its own destination. At 390x844 the English opening fits one viewport, versus the previous 6,408px page with 609 main words. This is a rendered-density measurement, not a three-second comprehension study. The previous complete measured report is preserved in [releases/SPRINT2_2026-10-19.md](../SPRINT2_2026-10-19.md), with dated evidence JSON beside it.

## 1. Repository and branch

Local standalone Git repository: `/Users/aloo/KRISEVA_AI/01_PRODUCTS/sakhi`. Current branch: `build/sakhi-sprint2`. No GitHub remote, PR, release tag, hosted service or remote CI run exists. No URL is invented. Code is Apache-2.0; dependencies, fonts, public sources and the optional model retain their own terms.

The supplied master and supporting files are preserved under `planning/`. The missing original feature matrix, source methodology and release-gate file were recovered from the master with explicit labels. They were not represented as original documents read. The founder's later Sprint 2 request authorizes the public-only experience expansion while original human P0 gates remain open.

## 2. Exact setup and verification

```sh
cd /Users/aloo/KRISEVA_AI/01_PRODUCTS/sakhi
make setup
make dev
```

Native preview: `http://127.0.0.1:5173/en-IN/`, same-machine API on 8765. Requirements: Node 22+, uv, Make, Python 3.13 and a browser. Observed host: macOS 26.4.1 arm64, Node 25.9.0, uv 0.11.6, Python 3.13.13, 24 GiB RAM. Linux browser dependencies may require `npx playwright install --with-deps chromium firefox webkit`. The pinned Python runtime is selected through uv; a direct system `python` command is not the supported setup path.

```sh
docker compose up --build
```

Production container preview: `http://127.0.0.1:8787/en-IN/`. Latest build is healthy, loopback-only, non-root, read-only filesystem with bounded tmpfs and dropped capabilities. It requires no secret, paid API or model. Docker build and runtime were executed, not inferred from configuration.

```sh
make verify
make quality
make evaluate
PYTHONPATH=. uv run --frozen python scripts/resources.py validate
# Separate, explicit maintainer-only public network operation:
PYTHONPATH=. uv run --frozen python scripts/resources.py validate --online
```

Optional local encoder setup and offline runtime, already executed in Sprint 1:

```sh
make model
HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1 SAKHI_EMBEDDINGS=1 \
  uv run --group embeddings python scripts/dev.py
PYTHONPATH=. HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1 \
  uv run --group embeddings python scripts/model_benchmark.py
```

The optional download is explicit. No model is fetched at application startup. Publisher Apache-2.0 checkpoint, pinned revision `914f7f89142e33e77833254d9c9b90c3cef7303b`; float32 CPU, 768 dimensions, observed cache 1,525,790,864 bytes. The download includes multimodal weights; runtime disables vision/audio encoders. No cloud LLM or generative safety advice is used.

## 3. Working P0 and Sprint 2 scope

The anonymous finder works through goal, optional age choice and concern/category to source-backed public alternatives. All four goals have their own result guidance. Plain-language cyber concern lookup reaches the real official cybercrime entry point and legal/women-support alternatives with source receipts. No report is filed. Emergency rendering and explicit minor handling run before any API request; unclear input abstains. Scope excludes 181 for West Bengal. Source expiry, citation details, domain preview, safe-device checkpoint, local erase, language switching, lite view, fictional sandbox and the public maintenance console are functional.

The [X01-X14 inventory](../../SPRINT2_FEATURES.md) records twelve new public interactions plus two strengthened foundations: before/now/after context, four-goal action desk, five-card preparation library, manually scrolling official pathways, selected service comparison, generic contact questions, public kit, interactive data boundary, coarse-city Maps search, public WhatsApp draft, reading comfort/local script fonts, expanded erase/cancellation, public correction proposal and community/public-benefit surface. These are useful product hypotheses, not proven unique inventions or measured life impact.

Pink/black tokens follow the founder's October 20 direction and supersede the prior corporate paper/navy/brass palette. Self-hosted Instrument Serif/IBM Plex typography remains. The home and finder share compact chrome; context/goal exploration and the official-source rail now live under Prepare & learn, while the data boundary remains under Privacy & trust. Ten local Noto script subsets cover the current catalog glyphs; the codepoint check is not native-language or shaping approval. No advertising, payment funnel or private narrative database was added. Public-benefit intent does not assert registered nonprofit legal status.

Evidence: `tests/e2e.spec.ts`, `tests/offline.spec.ts`, `tests/sprint2.spec.ts`, `tests/pillars.spec.ts`, `tests/simple-home.spec.ts`, `tests/test_api.py`, unit tests and actual screenshots under `docs/evidence/`. [QUALITY.md](../../QUALITY.md) ties accessibility, task mechanics and visual states to their component contracts.

## 4. P1/P2 and unavailable capabilities

The original inventory remains 68 records: 27 P0, 35 P1 and 6 P2. Current local status is 24 P0 implemented plus 3 review-blocked; P1 has 3 implemented local, 1 implemented review-blocked, 6 partial public previews and 25 unavailable; all 6 P2 remain unavailable. These are engineering states, not production approval counts.

P0 review-blocked items include multilingual guidance, qualified bystander advice and human language approval. P1 public work covers cards, comparison, generic questions and limited offline support. A coarse map URL is only partial local discovery; a destination preview is only partial action approval; a local proposed correction is only partial community maintenance. Exact per-feature states and limits are in [FEATURES.json](../../../FEATURES.json) and [FEATURES.md](../../FEATURES.md).

Private vaults, uploads, personal timelines/drafts, evidence handling, voice, reminders, deadline advice, screen stealth, personalized sharing, appointment automation, complaints, reference tracking, verified human handoffs, staff workspaces, authority alerts and partner widgets are not functional. No simulated acknowledgement or provider capacity is shown. GPS permission does not authorize transmission or create a dispatch agreement.

## 5. Directory coverage, four distinct counts

| Measure | Count and meaning |
| --- | --- |
| Discovery leads ingested | 211, from the provided CSV |
| Reviewed for preview | 7 agent official-source-reviewed and preview-curated entries |
| Human production approvals | 0 |
| Actually exposed | 7 public entry points, restricted by policy/scope as appropriate |

Five public learning cards use four source pages and are counted separately from service records. Public link checking is not human verification. Recorded online observations include network errors and 200 responses; earlier tools also observed 403 restrictions. These do not prove live service availability or acceptance. Canonical data, source wording, dates and limitations are in `data/public-seeds/resources.json` and `docs/evidence/resource-validation.json`.

## 6. OSC coverage, four distinct counts

The [PIB report published August 5, 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1) reported **991 operational One Stop Centres**, using data through **June 30, 2026**. Sakhi has **0 individually sourced centre records**, **0 independently verified centre contacts** and **0 authorized partner integrations**. The aggregate is historical national reporting, not an imported directory or integration claim. `osc-registry.json` remains empty. No 991-record dataset, nationwide crime dataset, safe-route engine or predicted danger map was fabricated.

## 7 and 8. Language and retrieval evidence

Every shell is structurally complete at 136 keys. Non-English shells contain 20 draft navigation translations and 116 explicit English fallback keys, visibly disclosed. New preparation/comparison/community/map text is explicitly English and outside this key count. Every locale, including English, lacks qualified human language/safeguarding signoff.

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

The 410 routing cases are authored/generated in-sample surface variants, not independent observations or expert labels. Default engine: SQLite FTS5/BM25 plus intact Indic word matching and deterministic policy. Latest route-evaluation p50 0.081ms, p95 0.106ms measures local engine evaluation, not network response or device performance.

The 104-phrase optional encoder comparison is separate, in-sample and small: 44 English and 4 per other locale. Model load 1,226ms; query ranking p50 27.7ms, p95 45.4ms on the 24 GiB Mac. Pure semantic top-3 ranged 50-100% across locales. English semantic top-1 was 68.2% and hybrid top-1 77.3%, versus lexical top-1 100% on the authored sample. Several other top-1 samples also underperformed lexical. This is why lexical remains the default and optional embeddings cannot expand approved candidates or control emergencies. No production accuracy or multilingual quality claim follows. Full top-1/top-3 figures and fixture limits are in `evaluation.json` and `model-benchmark.json`. A held-out expert gold set is still required.

## 9. Accessibility, usability, UI/UX and performance

Final local `make verify`: Ruff and structural checks pass; **35 Python, 17 unit and 170 browser tests passed**. Two forced-colors emulation cases are explicitly skipped on Firefox/WebKit; Chromium covers that assertion. Total scheduled browser cases: 172. One Starlette TestClient deprecation warning remains; no final test failed. The three-pillar contracts include actual Tab/Option-Tab traversal in all three engines. New acceptance checks cover short opening copy, visible primary action, a first finder question above 320px on a 390x844 view, consistent theme and relocation of source exploration. Initial RED runs and the first failed full pass are retained separately. A real forced-colors contrast issue was corrected with system colors; the old direct-goal test now follows its intentional learning-page location.

Host/browser scope: macOS arm64, Playwright Chromium 156.0.8078.4, Firefox 157 and WebKit 27.2 engine builds. The complete browser suite is Chromium; Firefox/WebKit run 12 targeted interaction contracts each. Apple's default Mac WebKit link traversal uses Option-Tab, without modifying system settings. This is not physical Safari/iOS certification.

Widths exercised: 320, 360, 375, 390, 414, 768, 1024, 1280 and 1440 CSS px. Axe scans cover the landing at all widths, key new surfaces at narrow/wide widths and selected Indic/RTL contexts. Tests cover large-text preference at 200%, text spacing, failed font loads, reduced motion, semantic navigation/table relationships, recoverable validation, modal focus/scroll/return, explicit loading and Back/clear cancellation. Eligibility and key limits remain visible before opening provenance. JavaScript-disabled fallback retains the direct emergency link.

Production screenshots were inspected at desktop 1440, tablet 768, mobile 390 and narrow 320 widths, including Urdu, finder, source result and destination preview. The reproducible capture run records 10 page/viewport combinations with HTTP 200, no document overflow, no outside-origin requests and no page errors, plus synthetic result and dialog images. At 320x640 and with review banners/large text, vertical scrolling remains necessary; content is not compressed to force a one-screen claim. These are screenshot/automation findings, not moderated user research. Physical Android, VoiceOver/TalkBack/Windows screen readers, real installation, physical zoom and cold Wi-Fi-off startup remain untested.

Latest `make quality`, local production mobile simulation: **97 performance / 100 accessibility / 100 best practices**; FCP 1.9s, **LCP 2,409.5ms**, **CLS 0**, **TBT 0ms**, transferred page bytes **236,108**. Profile: 412x823/DPR 1.75, 150ms RTT, 1.6Mbps and 4x CPU slowdown. All regression budgets passed. The separate 2.5s LCP product goal also passed in this run. Field INP is not measured. The earlier 2,559.6ms LCP/96 score belongs to the October 19 interface. The simplified normal-type headline no longer preloads the unused italic face; the asset remains available for other pages and in the public offline pack. Lab measurements vary and are not availability or accessibility certification.

Bounded local Docker smoke probe: 240 synthetic requests, concurrency 10, zero failures, p50 7.94ms/p95 23.72ms. This short single-host observation is not internet-scale, endurance or operational reliability validation. The API was unchanged by the final interface refinements.

[QUALITY.md](../../QUALITY.md) records role ownership, component/state matrix, the consented fictional-task usability protocol, controlled upgrades and every-change gates. GOV.UK/NHS/USWDS/Carbon primary-source tooling and governance were researched; Sakhi uses its own plain components, Playwright/axe, Vitest/Pytest and fail-closed Lighthouse budgets. No unneeded paid Figma/Percy account, inherited compliance or completed participant study is claimed.

## 10. Security and privacy verification

No private-user store, account, analytics, GPS, microphone or notification permission request. Only `sakhi.locale` persists. Memory-only intake reaches the same local machine through strict POST schemas; narratives stay out of URLs, logs and caches. Error responses omit rejected values. Framework tracing/metrics/logging autoconfiguration is explicitly disabled. Trusted hosts, no-referrer, no-store responses, CSP, sensor denial, gzip and no-access-log runtime are implemented. The public service-worker cache uses generated SHA-256 hashes and rejects API/POST/query/private content; those hashes are not independent publisher signatures.

Tests cover unexpected fields, sensitive error leakage, local/outbound separation, fixed maintainer link-check allowlist, disabled adapters, age/context patterns, source expiry, jurisdiction, fictional-mode downloads, pending-response races and no restoration after clear/Back. A source correction is syntactic public evidence validation, not authority approval. WhatsApp/Maps previews expose exact public fields; the app does not select a personal recipient, send a message, alert an authority or infer delivery.

Recorded npm and Python audits found no known vulnerabilities at their run time. `npm-sbom.cdx.json`, dependency-license metadata and original font notices are present. This is not a full redistribution or independent penetration audit. Optional model artifacts stay ignored and outside Docker/Git.

Residual risks: finite emergency/minor phrase matching, unreviewed multilingual/safeguarding content, unverified contacts, absent held-out evaluation, compromised/shared devices, browser history/download/backups, external providers' own permissions/data use, origin/service-worker trust, future reverse-proxy logs and unreviewed public deployment. No clinical, legal or data-protection compliance certification is claimed. No external complaint, call, message, referral or provider action was sent.

## 11. Screenshots and navigation proof

Actual current production captures are under `docs/evidence/`:

- `simple-desktop-home.png`, `simple-mobile-home.png`, `simple-narrow-home.png`, `simple-tablet-home.png` and `simple-urdu-home.png`.
- `simple-finder.png`, `simple-prepare.png`, `simple-trust.png`, `simple-nearby.png` and `simple-community.png` show the theme across the working features.
- `simple-options.png`: Home > Try a fictional example > public cyber alternatives, with real outbound actions disabled.
- `simple-destination.png`: Synthetic result > Preview official website, showing the exact official host and disabled action state.

`simple-visual-network.json`, `simple-capture.log`, `browser-results.json` and `verify-simple-final.log` provide current navigation/check evidence. `scripts/capture-simple.mjs` opens no external destination. `simple-density-comparison.json` compares the old Docker and new native opening at identical 390x844 geometry before replacing the old runtime: 609 to 40 main words; 6408 to 844 page pixels. The current production capture independently confirms the new density. Older `sprint2-*` screenshots and logs refer to the dated October 19 design. They are historical evidence, not current appearance. Source records, permissions and human review status have not been promoted by this design change.

## 12. Commits, files, review and deferred issues

Confirmed local commits: `71544be` API/policy, `04eb8fa` Sprint 1 baseline, `953e969` research/plan, `337103e` Sprint 2 product experience and `fd659de` three-pillar contracts, `d40dfac` October 19 evidence and `e412dd1` simplified pink/black experience. Final revision evidence is committed separately. There are no PRs. The original Sprint 1 measured report is preserved under `docs/releases/SPRINT1_BASELINE.md`.

Main changed groups: React public journey/components and brand/script CSS; font assets/notices; public action contracts; API safety/telemetry regressions; browser/unit tests; public build/cache tooling; quality gate and CI; README/design/research/architecture/privacy/release docs. The Sprint 2 baseline inventory is `docs/evidence/sprint2-changes.txt`; the October 20 revision inventory is `docs/evidence/simple-changes.txt`.

Independent review initially found four material issues, fixed with RED/GREEN tests: synthetic maintenance download, fallback language metadata, comparison selection coverage and official PIB query syntax. Visual review found mobile modal autoscroll and fixed title focus. Three-pillar refinement added actionable errors, always-visible eligibility, larger-text fallback, actual Tab traversal and Back cancellation. The October 19 independent review found no material regression in its recorded scope. The October 20 interface revision received full automated regression and implementer visual review; no new independent human or agent signoff is claimed. The prior review's precise scope is in `docs/research/sprint2-independent-review.md`. Historical failed/partial run logs are retained and do not count as final success.

Deferred work is recorded in `ISSUE_BACKLOG.md`, `FEATURES.json`, `ROADMAP.md` and `RELEASE_GATES.md`. The repo has no remote issue tracker. Future engineering cannot waive the required human evidence.

## 13. Future accounts, permissions and operations

| Capability | Required before enabling |
| --- | --- |
| Core local preview | No external account or paid key |
| Public GitHub/hosted release | Repository/publication decision, public security disclosure channel, safeguarding/contact/language reviews, hosting/HTTPS/ingress/retention and incident ownership |
| Optional model | Explicit publisher download/license acknowledgement and local storage/compute; no paid inference API |
| Google Maps Places/Routes/Embed APIs | Reviewed Google Cloud project, applicable API enablement/key restrictions, billing/cost approval and license/privacy design; current Maps URLs need none |
| Live WhatsApp helpdesk/business automation | Authorized recipient/service owner, eligible WhatsApp Business/Meta account and policy review, informed opt-in, approved templates/webhooks as applicable, staffing and response process; current generic draft is not that service |
| Location alerts or trusted-contact escalation | Specific purpose/data/recipient/action consent, recipient authorization, privacy/security review, delivery/error/withdrawal design and real acknowledgement; browser permission alone is insufficient |
| Police, ERSS, OSC, NCW, SHe-Box or NGO integration | Written institutional agreements, approved authenticated endpoints, lawful scope, trained operators, channel permission, action-time approval and observable receipts; no current agreements are inferred |
| BHASHINI, voice, IndicTrans2 or additional models | Actual availability/license/account approval and native/domain quality evaluation; none is an installed functional integration |
| Private drafts/vault/uploads | Separate threat model, consent/retention/key-recovery design, independent security/safeguarding and applicable legal review; no storage shortcut is enabled |
| Crime or local service data | Authoritative licensed dataset, provenance/update/coverage/bias assessment and appropriate use; no individual safety prediction from annual crime counts |

No credentials, billing account, partnership, staffing or legal status was invented, accessed or created. No scheduled maintenance automation was registered.

## 14. Verdict and next release decision

**`internal_demo_only`**. The local Sprint 2 implementation, research, three-pillar engineering contracts, actual run/test/visual inspection and reproducible documentation are complete. It is suitable for controlled synthetic internal review. It is not certified, human-reviewed or mass-user validated public infrastructure.

Public release requires named safeguarding/contact reviewers, completed native-language/domain review, expert held-out quality evaluation, participant usability/comprehension research, physical-device/assistive-technology and Wi-Fi-off tests, independent security/privacy review and accountable public operations. These are explicit blockers, not simulated engineering success. The GitHub-ready source is kept local until the required release decision and evidence exist.
