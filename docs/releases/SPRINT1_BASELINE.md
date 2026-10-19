# Sprint 1 measured baseline

Verdict: internal_demo_only. Preserved before the founder requested a complete Sprint 2 experience redesign on 2026-10-19.

Repository: local 01_PRODUCTS/sakhi. Branch: build/sakhi-p0. No GitHub remote, PR, public deployment or tag.

Native setup and make dev observed on macOS, Node 25.9.0, Python 3.13.13. Docker image built and running on 127.0.0.1:8787. make verify passed: 35 Python tests, 6 browser-local tests, 74 Playwright tests, 410 draft scenario cases, structural validation and production build. The latest workflow log is docs/evidence/verify.log.

Data: 211 leads ingested; 7 agent-reviewed and preview-curated entries; 0 human production approvals; 7 public entries exposed. OSC: 991 operational reported August 5, data through June 30, 2026; 0 individually sourced records, 0 independently verified contacts, 0 integrations.

Lighthouse mobile simulation: performance 99, accessibility 100, best practices 100; 150ms RTT, 1.6Mbps profile, 4x CPU slowdown, local Chromium/macOS. Initial performance 87 improved through response compression. Browser tests cover all nine specified widths, RTL and reflow equivalents. Physical Android, screen readers, full browser zoom and Wi-Fi-off cold boot were not tested.

Optional model: EmbeddingGemma 2 pinned revision 914f7f89142e33e77833254d9c9b90c3cef7303b, float32 CPU, 768 dimensions, observed cache 1,525,790,864 bytes. Offline model benchmark: 104 authored phrases, 44 English and 4 per other locale. Model load about 1.23 seconds; query ranking p50 27.7ms, p95 45.4ms on this 24 GiB Mac. Pure semantic ranking underperformed lexical on this in-sample corpus; default remains lexical, optional semantic ranking stays within approved candidates.

| Locale | Structural keys | English fallback keys | Human review | Routing fixture cases | Lexical route agreement | Semantic top-3 (small sample) | Hybrid top-3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| en-IN | 133/133 | 0 | Pending | 110 | 100% | 90.9% | 100% |
| hi-IN | 133/133 | 113 | Pending | 20 | 100% | 100.0% | 100% |
| bn-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| mr-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| te-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| ta-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| gu-IN | 133/133 | 113 | Pending | 20 | 100% | 100.0% | 100% |
| kn-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| ml-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| or-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| pa-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| as-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| ur-IN | 133/133 | 113 | Pending | 20 | 100% | 50.0% | 100% |
| ne-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| kok-IN | 133/133 | 113 | Pending | 20 | 100% | 75.0% | 100% |
| ks-Arab-IN | 133/133 | 113 | Pending | 20 | 100% | 50.0% | 100% |

All fixtures are draft and in-sample. Repeated punctuation/prefix variants are not independent observations. No real-world accuracy, service outcome or emergency reliability claim. No expert gold standard or held-out target has been established.

Security: tested strict schemas, private validation errors, host restrictions, fixed link-check allowlist, disabled adapters, no sensitive caches, no auto-outbound requests, cancelled pending requests after clear, common minor ages and non-age numeric contexts. Current FastAPI telemetry explicitly disabled. npm and Python audits found no known vulnerabilities at run time. Metadata license inventory and npm SBOM exist; full redistribution audit is not completed.

Independent reviewer found four material issues; all fixed with RED/GREEN tests. A follow-up age-context regression was also corrected. No messages, complaints, calls or provider actions were sent. Source maintenance checks are explicit public read-only operations. Model download used an ungated Apache-2.0 publisher checkpoint, no paid API.

Release blockers: human safeguarding and contact verification; qualified language review for all locales; held-out multilingual quality; physical devices and assistive technology; production ingress and independent security audit; private security disclosure channel; publication approval. P1/P2 remain disabled. External future requirements include Google Maps billing/key review, WhatsApp business opt-in/API permissions, BHASHINI registration and written provider agreements; none exists today.

All 68 feature records and local issue drafts are preserved. Phase distribution: {'P0': 27, 'P1': 35, 'P2': 6}. Original missing matrix/methodology/gates were recovered with labels. Full source, lockfiles, Docker, CI configuration, community files, screenshots, source checks and evaluation artifacts are on disk. No remote CI run is claimed.
