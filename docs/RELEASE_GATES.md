# Release gates

Verdict: `internal_demo_only`, measured 2026-10-20. The Sprint 2 local engineering scope is implemented and verified. Public readiness remains gated by the human, source and operational evidence below. Passing automation does not authorize a user-facing verified release.

| Gate | Actual state | Evidence or blocker |
| --- | --- | --- |
| Zero-key native setup and production build | Implemented and tested on this Mac | `make setup`, `make dev`, final `make verify` log |
| Container build and local runtime | Rebuilt and healthy on loopback 8787 | `docs/evidence/docker-simple.log`; no public host |
| Four anonymous goal journeys | Functional locally, three selections from direct goal | `sprint2.spec.ts`; synthetic screenshot and no-submission assertions |
| Preventive and post-concern public support | Implemented as general source-linked information | X01-X14 inventory; qualified safeguarding review pending |
| Immediate emergency / explicit minor handling | Tested before API and during API failure | Local/browser policy cases; finite phrases, actual contact reachability unverified |
| No sensitive persistence or automatic action | Local checks passed | Storage/cache/no-outbound/cancellation/schema tests; independent deployment audit pending |
| Leads, curated preview and human approval separated | Implemented | 211 leads, 7 agent-reviewed preview entries, 0 human approvals, 7 exposed |
| Critical contact verification | Agent official-source checks only | Named human independent verification required; HTTP checks do not approve sources |
| 16 locale shells and local script fonts | 136 keys each; 116 English fallback keys in every non-English shell | Glyph checks and RTL tests; all locales including English require human signoff |
| Held-out multilingual retrieval and comprehension | Not established | 410 draft surface cases and 104 model phrases are in-sample, not expert gold data |
| Accessibility engineering | Automated checks and targeted cross-browser contracts passed | Complete Chromium suite; 12 contracts in Firefox/WebKit; 2 unsupported forced-colors emulations skipped |
| Usability mechanics and recovery | Goal, skip/back/cancel, error recovery and data preview tested | Browser evidence; no moderated participant sessions or measured comprehension |
| Responsive UI/UX and typography | Actual screens inspected, nine widths and text preferences tested | Mobile/tablet/desktop/RTL screenshots; font failure, 200% font and text-spacing checks |
| Performance regression budgets | Passed local mobile Lighthouse | 97/100/100; LCP 2.41s; 3s regression budget and 2.5s product goal passed in this run |
| Quality maintenance process | Implemented in code, CI configuration and docs | `make quality`, fail-closed budget tests, `QUALITY.md` state matrix and human protocol |
| Physical accessibility and devices | Not completed | Low-end Android, VoiceOver/TalkBack/Windows AT, physical zoom/orientation and real installation required |
| Physical Wi-Fi-off cold startup | Not completed | Browser-offline reload is narrower; follow company `00_BRAIN/playbooks/DEMO_GATE.md` |
| Dependency/security checks | Local audit reports and notices generated | No known vulnerabilities in recorded audits; no independent certification or full redistribution signoff |
| Public repository, remote CI and hosted release | Not created or run | Local commits only; publication is a separate release decision after reviews |
| Expert bystander and individualized guidance | Withheld | Qualified content review and new design required |
| Private vault, uploads, personal timeline, voice | Unavailable | Separate security, consent, retention, device and language review required |
| Maps and WhatsApp | Manual public URL/draft handoffs only | No API key, GPS, recipient service, live helpdesk, delivery state or verified map directory |
| Provider/authority handoffs and alerts | Disabled | Written agreements, eligible accounts/APIs, informed action approval, trained recipients and real acknowledgements absent |
| Production ownership and incident response | Not appointed/operating | Assign source, safeguarding, locale, interface, privacy/security and operations owners; private disclosure route and ingress review required |

The original missing release-gate file was recovered from the master and labelled. Sprint 2 extends public-only interactions under the founder's explicit request; it does not waive original P0 human gates. [QUALITY.md](QUALITY.md), [RELEASE_REPORT.md](RELEASE_REPORT.md) and [ROADMAP.md](../ROADMAP.md) contain the engineering evidence and remaining conditions. No safety outcome, mass-user validation or integration is inferred.
