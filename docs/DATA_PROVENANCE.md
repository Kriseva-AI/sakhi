# Data provenance and correction

Canonical discovery source: planning/RESOURCE_SEED_CATALOG.csv, supplied 2026-10-19, 211 rows. data/discovery-registry.json adds derived classification and explicit unknowns without overwriting original fields. No discovery entry is automatically user-visible.

Canonical preview pack: data/public-seeds/resources.json. Seven public entry points were agent checked (six on 2026-10-19; Child Helpline refreshed 2026-10-20): 112, Women Helpline 181, Child Helpline 1098, NALSA, National Cyber Crime Reporting Portal, SHe-Box and NCW. Seven are preview curated; zero have human production approval. The exact supporting URLs, limits and freshness are stored per record. The machine link-health report is a separate observation and cannot prove a phone is answered, a portal accepts complaints or a source is expert reviewed.

The WCD page explicitly lists West Bengal as an exception to 181 operation. Selecting that state removes 181 from default options. Unknown state does not imply national availability; the resource card retains the exception. Mission Shakti appointment data, GAC, eCourts, state directories and other specialist services stay in the discovery queue until scoped curation. Two image-guide sources have now received scoped agent source checks as described below.

PIB's August 5, 2026 report states 991 operational OSCs among 1,033 approved, using data through June 30, 2026. This repository holds zero individually sourced OSC records, zero independently verified centre contacts and zero authorized provider integrations. The aggregate does not seed 991 invented records.

A maintainer checks the authoritative page, contact scope, date, terms and jurisdiction, proposes a nonsensitive correction and obtains a second reviewer. Critical phone and safety changes require human verification before release. Corrections never publish automatically. Use resource_correction issue template only for public information. No victim details belong in GitHub.

The optional HSDS-inspired export is a service-reference prototype, not full HSDS conformance. No centre locations are invented. Source text is summarized rather than copied wholesale. Linking does not imply endorsement, partnership or broad data-reuse permission.

## Conditional image-guide references

`data/public-seeds/support-guides.json` version2026-10-20.1 records Take It Down (SRC-112) and StopNCII (SRC-110), source check2026-10-20/review by2026-11-19. Their provider/eligibility/jurisdiction/alternative fields remain separate from the seven directory entries. Total distinct support references in scope is9, human approvals0. They are informational user-directed handoffs with no integration. Unknown image age or other criteria never becomes eligibility. No imagery/private narrative is collected. Expert safeguarding review remains required. The child directory link now points to the specific MWCD Child Helpline page, with its own refreshed receipt.

The latest offline structural validator intentionally records `not_run_offline_validation_only`; historical online link-health observations are preserved under releases/pre-recovery-2026-10-20/resource-validation.json. Source research, link health, call/portal acceptance and human approval remain distinct.
