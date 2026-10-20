# Release gates

Verdict: `internal_demo_only`, measured 2026-10-20. The support core, recovery paths and optional travel controls are implemented and tested. Live POI acceptance and crime-zone data are incomplete; no claim of 10 to 15 flawless production features is made. Public readiness remains gated by the human, source and operational evidence below. Passing automation does not authorize a user-facing verified release.

| Gate | Actual state | Evidence or blocker |
| --- | --- | --- |
| Zero-key native setup and production build | Implemented and tested on this Mac | `make setup`, `make dev`, final `make verify` log |
| Container build and local runtime | Rebuilt and healthy on loopback 8787 | `docs/evidence/continuation/docker-final-accepted.log`; all 41 assets match; no public host |
| Four anonymous goal journeys | Functional locally, three selections from direct goal | `sprint2.spec.ts`; synthetic screenshot and no-submission assertions |
| Preventive and post-concern public support | Implemented as general source-linked information | X01-X14 inventory; qualified safeguarding review pending |
| Immediate emergency / explicit minor handling | Static HTML before bundle; local child/cyber clarification before API, including failure | Local/browser policy cases; finite phrases, actual contact reachability unverified |
| No sensitive persistence or automatic action | Local checks passed | Storage/cache/no-outbound/cancellation/schema tests; independent deployment audit pending |
| Leads, curated preview and human approval separated | Implemented | 211 leads, 7 source-reviewed directory entries + 2 conditional guide references, 0 human approvals, 9 distinct references in scope |
| Critical contact verification | Agent official-source checks only | Named human independent verification required; HTTP checks do not approve sources |
| 16 locale shells and local script fonts | 136 keys each; 116 English fallback keys in every non-English shell | Glyph checks and RTL tests; all locales including English require human signoff |
| Held-out multilingual retrieval and comprehension | Not established | 410 draft cases/104 encoder phrases remain in-sample; new frozen 16-case English author-labelled holdout is not expert multilingual gold |
| Accessibility engineering | Automated checks and targeted cross-browser contracts passed | 315 browser passes; complete Chromium suite, pillar/travel/recovery/location contracts in Firefox/WebKit; 2 unsupported forced-colors emulations skipped |
| Usability mechanics and recovery | Goal, skip/back/cancel, error recovery and data preview tested | Browser evidence; no moderated participant sessions or measured comprehension |
| Responsive UI/UX and typography | Actual screens inspected, nine widths and text preferences tested | Mobile/tablet/desktop/RTL screenshots; font failure, 200% font and text-spacing checks |
| Performance regression budgets | Passed local mobile Lighthouse | 97/100/100; LCP 2.560s; 3s regression budget passed, separate 2.5s product goal missed by 60.3ms |
| Quality maintenance process | Implemented in code, CI configuration and docs | `make quality`, fail-closed budget tests, `QUALITY.md` state matrix and human protocol |
| Physical accessibility and devices | Not completed | Low-end Android, VoiceOver/TalkBack/Windows AT, physical zoom/orientation and real installation required |
| Physical Wi-Fi-off cold startup | Not completed | Browser-offline reload is narrower; follow company `00_BRAIN/playbooks/DEMO_GATE.md` |
| Dependency/security checks | Local audit reports and notices generated | No known vulnerabilities in recorded audits; no independent certification or full redistribution signoff |
| Public repository, remote CI and hosted release | Not created or run | Local commits only; publication is a separate release decision after reviews |
| Expert bystander and individualized guidance | Withheld | Qualified content review and new design required |
| Private vault, uploads, personal timeline, voice | Unavailable | Separate security, consent, retention, device and language review required |
| Maps, routes and weather | Real optional public-data API/map requests observed | No Google key; POI provider 503; no validated crime zones or guaranteed route |
| Device location and local reminder | Local one-shot city suggestion and foreground reading, separate snapshot choice; page-only reminder tested | Emulated GPS only; chosen snapshot can leave only after recipient/content approval; no background monitor/automatic alert |
| WhatsApp | Public drafts and recipient-specific neutral updates with separate snapshot consent | Draft/open/user-reported states separated; no observed Send/delivery, staffed helpdesk or authority dispatch |
| Fresh independent code review | Completed; two findings reproduced and corrected in one author pass | Original report + resolution retained; full gate passed; no second signoff/security certification |
| Production map/POI/routing capacity | Not established | Owned/contracted hosting, shared quotas/load tests, privacy/terms and incident owner needed |
| Provider/authority handoffs and alerts | Disabled | Written agreements, eligible accounts/APIs, informed action approval, trained recipients and real acknowledgements absent |
| Production ownership and incident response | Not appointed/operating | Assign source, safeguarding, locale, interface, privacy/security and operations owners; private disclosure route and ingress review required |

The original missing release-gate file was recovered from the master and labelled. Sprint 2 extends public-only interactions under the founder's explicit request; it does not waive original P0 human gates. [QUALITY.md](QUALITY.md), [RELEASE_REPORT.md](RELEASE_REPORT.md) and [ROADMAP.md](../ROADMAP.md) contain the engineering evidence and remaining conditions. No safety outcome, mass-user validation or integration is inferred.

Current accepted source: f1fcdfb, final continuation verify/quality/production receipts linked from RELEASE_REPORT.md. Private preparation, live moderation, provider coverage and independent human studies are still incomplete. The ordered 20-priority audit records useful alternatives without promoting these gates.
