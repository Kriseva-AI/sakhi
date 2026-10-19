# Three product pillars, one release decision

Accessibility, usability and UI/UX have equal standing in Sakhi. This is the working maintenance contract for the internal preview, established 2026-10-19. Automation can block a regression. It cannot approve crisis content, prove comprehension or replace people using assistive technology.

The [primary-source research](research/sprint2-three-pillars.md) records what GOV.UK, NHS, USWDS and Carbon actually publish, including tools and contribution governance. Sakhi adopts semantic components, state-specific evidence, recoverable errors, controlled upgrades and explicit human ownership. It keeps its own Kriseva visual system and Indian service authority. Installing those organisations' packages would not transfer their research or accessibility status.

## Pattern records and evidence matrix

Owner entries below are responsible roles that must be assigned before public operation, not claims of staffed teams. Every pattern is currently an internal trial. Critical content cannot become approved merely through time elapsed or a passing build.

| Pattern and owner role | Interaction contract and required states | Local evidence | Human evidence still required |
| --- | --- | --- | --- |
| Service navigation, interface maintainer | Native destination links in a list; ordinary Tab order; modifier/open-new-tab behavior; all five destinations visible at 320px; route heading receives focus after navigation; initial load preserves the skip link | `SiteNavigation.tsx`, `App.tsx`; `pillars.spec.ts` navigation/skip tests | Physical keyboard and screen readers, navigation comprehension |
| Finder, safeguarding + interface maintainers | Four goals; optional text and coarse scope; adult/minor distinction; loading announced outside busy form; Back/clear cancel pending work; delayed responses cannot reopen results; empty/unknown/urgent/stale/offline paths | Python safety tests; e2e/offline/sprint2/pillars browser tests | Qualified safeguarding review, task success and error-recovery research |
| Service card and source rail, source curator | Eligibility, expiry and material limits visible; longer provenance disclosed; exact domain before user-opened external action; independent services never shown as integrations | `ResourceCard.tsx`, `PublicPathways.tsx`; expiry, scope, source and outbound tests | Independent contact verification, comprehension of scope and action state |
| Comparison, interface + source maintainers | User chooses up to three eligible services; real table caption and row/column headers; mobile overflow contained inside comparison; minor/emergency paths kept separate | `ResourceCompare.tsx`; selection, semantic table and reflow tests | Screen-reader table navigation and comparative decision tasks |
| Destination preview, privacy + interface maintainers | Title initially focused; domain, disclosure and public payload visible; optional encoded address; device-safety checkpoint before enabling action; Escape closes and returns focus; synthetic mode disables action | `Modal.tsx`; modal scroll, WhatsApp, focus, synthetic and no-outbound tests | Physical AT focus behavior and understanding of what leaves Sakhi |
| Correction form, source + interface maintainers | Restrained public fields only; error summary focused and linked to invalid fields; matching inline errors; nonsensitive values preserved; title signals error; download is proposed_not_submitted | `ErrorSummary.tsx`, `Community.tsx`; validation unit and browser tests | Readability, contributor task research, source-review process owner |
| Reading and multilingual layout, locale + design maintainers | Self-hosted fonts and fallbacks; native labels marked by language; explicit English fallback; RTL; 200% font preference and text spacing reflow; reduced motion and forced colors | Font codepoint receipt; nine-width axe checks; browser font failure and reflow tests | Native-language shaping/content, physical 200%/400% zoom, low-vision and screen-reader tasks |
| Preparation, sharing and erase, safeguarding + privacy maintainers | Generic source-linked learning; user selects public resources; kit/WhatsApp hold public data only; clear resets local state and cancels requests; device/file limitations remain explicit | Public-action unit tests; prepare/share/erase/browser storage checks | Safeguarding and disclosure-comprehension review; device privacy audit |
| Offline public fallback, operations + privacy maintainers | Hash-checked public-only build cache; no POST/API/query/private cache; expired source warning; no promise of service reachability; JavaScript failure retains a direct emergency link | Production offline tests and noscript test; public cache manifest | Exact physical device Wi-Fi-off/cold-start check, real installation and network failures |

These components are exercised in the running application and synthetic browser fixtures. No separate Storybook, Figma library, Percy account, IBM internal tooling or inherited compliance certification is claimed.

## Repeatable engineering gates

Run from the repository root:

```sh
make setup
make verify
make quality
```

`make verify` runs schema/data/catalog checks, lint, Python and local unit tests, a production build, routing fixtures and browser journeys. Chromium runs the complete browser suite. Firefox and WebKit run the dedicated three-pillar interaction contract. Two forced-colors emulation cases are explicitly skipped on Firefox/WebKit; that assertion is Chromium-only. macOS WebKit uses Apple's documented Option-Tab link behavior with the unchanged default keyboard preference. This is browser-engine testing, not physical Safari, iPhone or screen-reader certification.

`make quality` builds and serves the production bundle on its own loopback port 8768, runs Lighthouse and evaluates every declared regression budget. It refuses an occupied listener and only stops the child it owns. Missing measurements or budget entries fail closed. [quality-budgets.json](../quality-budgets.json) separates release regression limits from product goals. TBT is a lab measure; field INP is not measured. No usage tracking was added.

The GitHub Actions workflow runs both commands and retains evidence, but no remote workflow execution is claimed. Lockfiles and checked-in local fonts make dependency changes reviewable. Local passing scores do not prove low-end device performance or production capacity.

Raw tool-output logs retain their original bytes. `.gitattributes` excludes only those evidence logs from Git whitespace formatting checks; source/documentation whitespace checks and all functional gates remain active. Release checksums identify the final measured artifacts.

## Human usability protocol, ready to run

Recruit with a safeguarding-qualified researcher, including women with access needs and native-language participants. Participation, accommodations, breaks, withdrawal and any recording require explicit consent. Use fictional situations, avoid asking for personal experiences, and retain only consented nonsensitive research findings. Do not put participant identities or recordings in this public repository. No recruitment or sessions have taken place in this sprint.

| Fictional task | Observe and record | Failure requiring design review |
| --- | --- | --- |
| Prepare before a concern | Find one public learning topic and explain its limits | Participant believes the page assesses personal risk or guarantees prevention |
| Find options for a made-up online impersonation concern | Unassisted task completion, wrong turns, optional text avoidance, ability to compare services | Participant cannot find an appropriate official path or thinks a report was filed |
| Help a fictional friend | Find general options without entering her information | Interface encourages disclosure of the friend's identity or incident |
| Recover an invalid public correction | Find the error, correct it and explain the downloaded file's status | Lost input, unreachable error or belief that the correction was submitted |
| Preview a public Maps search or WhatsApp card | Explain the exact outgoing fields, who chooses recipient, and who presses Send | Belief that Sakhi shares GPS, dispatches authorities, vets map results or confirms delivery |
| Clear the session, then use a back button or delayed response | Explain local clearing and device/history/file limitations | Hidden state reappears, or clearing is understood as making browsing untraceable |
| Use narrow view, large text and preferred assistive technology | Complete the same task, identify focus and receive state changes | Content lost, trapped focus, missing name/state, or need for a mouse-only workaround |

Record attempts, assisted/unassisted completion, observed comprehension and voluntarily reported confidence separately. A short task time alone is not success. Do not publish an outcome percentage until a defined participant sample, protocol and actual observations exist. The current automation demonstrates mechanics, not user understanding or life impact.

## Maintaining a production service

Before any public release, assign the owner roles, verify critical contacts independently, complete language/safeguarding/security reviews and the physical accessibility/demo gate. Establish a real private disclosure route and a supported response process. See [RELEASE_GATES.md](RELEASE_GATES.md) and [ROADMAP.md](../ROADMAP.md).

For every meaningful change, update its pattern record and tests, run both engineering gates, inspect the changed states at mobile/tablet/desktop and RTL, and attach actual evidence to review. Copy, source eligibility and focus behavior count as meaningful changes. Review dependencies in bounded updates with release notes and full regression evidence, rather than uncontrolled startup updates. Keep a revertable build and public-data version. The static cache verifies build hashes; it is not independently signed publisher trust.

For source maintenance, follow `MAINTAINER.md`: source evidence, expiry, jurisdiction and human approval remain distinct from link health. Public corrections are proposals until reviewed. Do not log personal journeys to measure success. Public launch needs an operations review covering HTTPS, ingress limits, health/error monitoring without narratives, resource freshness ownership, rollback and incident response. Those arrangements are proposed gates, not an operating service already in place.

Release notes must say what changed, which build was measured, which browser/device combinations were used, who performed human reviews and which evidence is missing. A high score in one pillar cannot waive a blocker in another.

2026-10-20 interface revision: home and finder use compact headers with navigation in the footer. Short-copy/visible-action and first-question-position contracts are in simple-home.spec.ts. All three pillar contracts remain in the full browser suite. The source rail/context exploration moved to the learning page. Seven specified token pairs passed calculated contrast checks; this finite check is not a conformance certification.
