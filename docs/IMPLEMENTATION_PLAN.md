# Sakhi P0 implementation plan

Goal: anonymous, source-backed local navigation with no paid credentials.
Spec: planning/KRISEVA_SAKHI_SOL_MASTER_PROMPT.md.
Method: native sequential execution, test first for safety and functional behavior.

## Constraints and review focus

No persistent personal data, automatic calls, fabricated provider records, unreviewed verified language claims or sensitive cache entries. Emergency UI cannot depend on backend health. Stale sources, minors, unknown input, hostile instructions, offline use and shared devices require explicit tested behavior.

## Tasks

- [ ] 1. Public data and safety API: tests/test_api.py first, then services/api/{schemas,registry,safety,retrieval,main}.py. Typed POST /api/navigate returns state, category, vetted resources and abstention. Test emergency/minor precedence, unknowns, no leaked text, stale exclusion and disabled adapters. Ingest all 211 original rows into a separate discovery registry. Commit after passing API suite.
- [ ] 2. Accessible web journey: tests/e2e first, then apps/web/src/{App,Finder,ResourceCard,Maintenance}.tsx and CSS tokens. Anonymous landing, goal, age/situation routing, resource receipts, device checkpoint, source preview, erase, generic share and synthetic sandbox. Test blocked external action in sandbox, keyboard flow, language switch, back/forward and all specified viewport widths. Commit after browser verification.
- [ ] 3. Locale and retrieval quality: packages/i18n catalogs, local FTS5 BM25 and optional embedding adapter. Generate independently specified synthetic scenario corpus, >=100 English and >=20 per locale. Report draft fixture status and per-language performance. Test key completeness, fallback notice, RTL, prompt injection, stale pack and semantic-disabled fallback. Commit after evaluation.
- [ ] 4. Reproducibility and governance: make dev/verify, uv.lock, npm lockfile, Docker, source validation CLI, review queues, HSDS-compatible export, source corrections, security and community documentation. Recover absent planning files under explicit recovery labels. Commit after native/container tests.
- [ ] 5. Release audit: actual app screenshots, axe and performance measurement, dependency audit and SBOM, independent whole-branch review, final regression pass, release report and company receipt. Keep internal_demo_only until human safeguarding and language reviews pass.

Interfaces: public resource schema is shared through generated OpenAPI and TypeScript; frontend emergency contacts are a generated subset of the approved public pack. Source corpus changes invalidate the pack hash. Evaluation reports are nonsensitive and readable by the maintenance surface. No task introduces writable partner interfaces.
