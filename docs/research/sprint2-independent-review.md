Maintainer context added 2026-10-20: this is the historical independent review of fd659de. Its structured results are preserved under [the dated evidence folder](../releases/2026-10-19/). The [current report](../RELEASE_REPORT.md) covers the subsequent pink/black revision; no independent signoff for that revision is implied.

# Sprint 2 independent review

Date: 2026-10-19. Current scope: three-pillar refinements at implementation commit `fd659de`, following the earlier Sprint 2 implementation `337103e`, assessed against `docs/SPRINT2_PLAN.md` and the existing safety contract. This latest pass inspected source and stable verification artifacts. The reviewer ran no suites, changed no shared code and contacted no service. Only this report was written during the latest task.

No new material implementation regression was identified in the bounded scope. Four earlier P2 findings remain closed. The nonblocking keyboard coverage follow-up was corrected and its three-engine targeted regression passed. The verdict remains **`internal_demo_only`**. Engineering checks do not close public human release gates.

## Current code assessment

| Area | Evidence and assessment |
| --- | --- |
| Cancellation and progress | `App.tsx` lines 73 to 86 and 144 to 196 use an abort controller plus generation checks before committing either a response or fallback. Clear, navigation and browser history invalidate work. `Finder.tsx` lines 93 to 103 and 247 to 255 invalidate its completion state on Back, clear busy/error state and move to the earlier question. The status explicitly offers Back or clear to cancel. No stale-result path was found in the inspected flow. |
| Page and step focus | `App.tsx` lines 121 to 133 focus the next main heading on an actual page/result change without taking initial focus away from the skip link. The main region is programmatically focusable. `Finder.tsx` lines 79 to 83 focus changed question headings. Maintenance now has a focusable main heading. |
| Native navigation | `SiteNavigation.tsx` lines 30 to 45 provide real route URLs, per-key language, current-page state and ordinary modified-click behavior. Header DOM order follows the visible brand, tools and navigation order. Wrapping styles keep all five destinations visible rather than requiring a concealed menu. |
| Correction recovery | `Community.tsx` lines 19 to 58 collect field errors, focus the summary after each failed attempt and prefix the document title with Error. Lines 151 to 205 connect labels, hints, inline errors and invalid state. `ErrorSummary.tsx` lines 14 to 35 provide an alert, a focusable named region and field links. Entered correction text remains intact. No transmission or publication was added. |
| Scope and limits | `ResourceCard.tsx` lines 56 to 61 place eligibility and limitations before actions and outside the closed details element. The West Bengal exclusion is immediately visible. Comparison now has a caption and explicit row/column header scopes. |
| Destination review | `Modal.tsx` lines 24 to 38 retain the actual originating control, start at the title and restore focus on close when the trigger remains connected. `App.tsx` lines 222 to 226 capture the invoked control independently of browser click-focus differences. Readable action fields and disclosure remain visible; only the long encoded URL is collapsed. The domain and exact address remain inspectable before consent. Demo mode renders no continuation link. |
| Reading and reflow | `sprint2.css` uses rem typography, wrapping navigation/header controls, breakable long text and forced-colors states. The narrow-screen overrides avoid a horizontal navigation strip. Tests cover browser font enlargement, spacing overrides and font failure. These are automated layout proxies, not native typography or physical-device acceptance. |
| Quality gate | `scripts/quality-budgets.mjs` lines 1 to 28 require all seven measured budgets, reject missing/nonfinite values and reject invalid limits. Missing reports or malformed configuration stop the script. `quality-gate.mjs` owns a dedicated loopback audit listener, rejects Lighthouse failure and throws on failed assessment. Its finally block stops only that spawned process. |
| CI | `.github/workflows/ci.yml` lines 20 to 27 install Chromium, Firefox and WebKit, run verification and the measured quality gate, then retain artifacts even on failure. This is inspected CI wiring; no hosted CI run was observed. |

The inspected changes add no sensitive persistence, model/cloud request, sensor request, service submission or background handoff. Source expiry, synthetic download restrictions, exact outbound action states and read-only maintenance remain covered by the current suite. This is a bounded regression review, not a complete security or network audit.

## Prior RED findings and closure

The reviewer previously reproduced these four P2 behaviors locally in the earlier implementation, without opening an external destination. A test download was cancelled. Their dedicated regressions passed again in the current full verification artifact.

| Earlier finding | Current resolution and regression |
| --- | --- |
| Synthetic maintenance template could download while the fictional-example banner remained active. | `App.tsx` line 547 passes demo state. `Maintenance.tsx` line 149 disables the download. `tests/sprint2.spec.ts` lines 319 to 334 cover the cross-page path. Closed. |
| Static English home content inherited Urdu language and RTL metadata. | Static sections have explicit English/LTR scope, with translated labels using per-key language markers. `tests/sprint2.spec.ts` lines 405 to 421 cover English fallback sections and the Urdu hero label. Closed; native-language review remains pending. |
| Comparison used only the first three entries and offered no user selection. | `ResourceCompare.tsx` lines 13 to 18 and 38 to 67 expose every eligible entry with a three-selection limit. Tests at lines 336 to 385 include actual workplace and NCW columns. Closed. |
| Correction validation rejected a canonical official PIB article because its URL contained a query. | `public-actions.ts` lines 63 to 88 accept exact PIB public article selectors while rejecting credentials, fragments and unknown/private query fields. `Community.tsx` line 44 uses that validator. Browser and unit regressions cover the accepted article and rejected private fields. Closed. |

Prior RED evidence is retained in the earlier `docs/evidence/sprint2-review-*` logs. An intermediate missing-language-prop failure during concurrent edits was superseded by stable successful verification. Neither that transient state nor older 74/132-test artifacts describe the current final result.

## Differentiator assessment

These are implemented local capabilities, not claims of uniqueness, proven safety outcomes or production readiness.

| ID | Observed behavior and remaining limits |
| --- | --- |
| X01 | Three local context tabs change the starting content. Context-switching regression passed. |
| X02 | Four goals reach options through goal, age and topic selections. All four journey regressions passed. Differences beyond helper routing remain limited. |
| X03 | Five public preparation guides expose source, scope, overdue status and review-pending labels. Qualified content/language review remains open. |
| X04 | Public pathway rail exposes official names, jurisdiction, source dates and human-verification limits, with keyboard/reduced-motion behavior. Actual assistive-technology acceptance remains open. |
| X05 | Selected public records can be compared by channel, eligibility, limitations and source dates. Header semantics and workplace/NCW selection passed. |
| X06 | Generic first-contact questions appear in the kit. No incident narrative or upload is requested. |
| X07 | Known public IDs create a generic kit on user action. Synthetic downloads remain disabled, including maintenance. |
| X08 | Data-boundary tabs and outbound previews disclose actual fields and device limits. No sent, delivered or referral state is fabricated. |
| X09 | Allowlisted coarse cities/place types create an encoded map search, with no GPS, origin or API key. Map listings are not represented as vetted providers. |
| X10 | Known resource IDs create a public WhatsApp draft; the recipient and Send remain user choices inside WhatsApp. Dates derive from each resource's checked_at/expires_at. No destination was opened by this reviewer. |
| X11 | Self-hosted script fonts, rem typography, larger-text/lite controls and focus management are present. Native shaping, physical devices and screen readers remain unverified. |
| X12 | Clear resets session state and invalidates pending work. Delayed-response, contribution and coarse-map erase regressions passed. Downloads/browser history are not claimed to be erased. |
| X13 | Local correction files retain proposed_not_submitted status, official evidence and a human publication gate. PIB acceptance, private-field rejection and error-recovery regressions passed. |
| X14 | Community intent, lack of registered nonprofit status, unavailable integrations and absent public GitHub remote are explicit. A staffed help channel or published contribution is not represented as active. |

## Stable automated evidence inspected

The reviewer read `verify-sprint2-final.log`, `pillars-cross-browser.log`, `pillars-tab-traversal.log`, `quality-gate.log` and `quality-gate.json`, and parsed the structured browser artifacts at each evidence checkpoint. These are implementer-produced results read after the parent confirmed completion. No fresh reviewer test execution was performed.

| Check | Observed current result |
| --- | --- |
| Ruff and TypeScript/production build | Passed |
| Python | 35 passed, one Starlette/httpx deprecation warning |
| Vitest | 17 passed across three files, including six quality-budget cases |
| Structure and README targets | 16 locale shells, 136 keys each, 68 feature records, 211 leads; 41 local README targets exist and five external URLs have valid syntax |
| Public cache generation | 36 hashed public assets; generation reports no API or query caching |
| Draft fixture evaluation | 410 cases, zero defined emergency failures and zero mismatches |
| Full Playwright | 167 passed, two explicit skips, zero unexpected/flaky tests and no top-level errors |
| Dedicated pillars run | 34 passed, two explicit skips across Chromium, Firefox and WebKit |
| Revised actual Tab traversal | Three passed, one each in Chromium, Firefox and WebKit |
| Measured mobile quality gate | Passed: performance 96, accessibility 100, best practices 100, LCP 2559.57315 ms, CLS 0, TBT 0 ms, page weight 259445 bytes |

The two skipped cases are forced-colors emulation in Firefox and WebKit; the test explicitly limits that assertion to Chromium. The final full-suite refresh is complete at `fd659de`. Its structured browser artifact starts at `2026-10-19T18:24:02.811Z` and records 169 scheduled cases: 167 expected passes and two skips, with zero unexpected or flaky tests and no top-level errors. The matching log ends with 167 passed in 59.5 seconds. This complete result supersedes the temporary three-pass targeted browser artifact. It covers previous safety/privacy regressions plus native links, error summary recovery, readable modal payload/focus return, comparison headers, enlarged text/font failure, visible eligibility, spacing, Back cancellation and JavaScript-disabled emergency fallback.

LCP passes the configured 3000 ms regression limit but misses the 2500 ms product goal. Lighthouse audits only the local English home route under mobile simulation. Its scores do not establish field INP, route-wide accessibility, physical-device performance or availability. Hosted CI and Docker were not independently executed in this review.

SHA-256 at this closure check:

- `verify-sprint2-final.log`: `f5b43e512b4a3c032bb53cd1e4df99de5909b5c438a6d9154491ed7d72fdade8`
- `pillars-cross-browser.log`: `73a46c9ad5410dab029acb216ae08d4865cb5fcfdde92308f5c7c12fb617c863`
- `pillars-tab-traversal.log`: `d8976e86768d19ff3d7b7207aaf0ccdd34c23222251f8e48081dc5eb12fb0be3`
- `browser-results.json`: `2076fc6532d83facaf21a2fa91b1b26af14880cff712937ec1eb2ac4a0ea7cdd`
- `quality-gate.json`: `561dd484ad5dc0ae2209e6c628990ebdf616a63dd80c6b1cab01012492ace949`

Reviewed implementation provenance is `fd659de`. The final refreshed verification log and browser result were inspected from the working tree after that implementation commit. Preserve those exact artifacts with this receipt in the next evidence commit; earlier 74/132-test snapshots and the temporary targeted three-test JSON are superseded.

## Keyboard follow-up closure and public gates

Closed P3 coverage follow-up: the prior test programmatically focused journey controls before pressing Enter, which did not establish sequential keyboard reachability. `tests/pillars.spec.ts` lines 120 to 153 now use a bounded actual Tab traversal with active-element assertions before activating every journey control. The updated test has no locator.focus() calls. Its three-engine targeted run passed in `pillars-tab-traversal.log`. This establishes forward-keyboard reachability for the tested path; it does not establish all reverse traversal, native screen-reader behavior or physical keyboard acceptance. F63 is also correctly marked partial_preview_only in FEATURES.json, with remote intake, moderation and publication unavailable.

The 410 fixtures remain draft regression inputs, not expert-reviewed gold labels or real-world safety performance. Existing finite emergency/minor patterns have language and context limits. Browser font/spacing overrides, axe and three-engine automation are useful engineering evidence, not real assistive-technology testing, moderated usability evidence or public conformance certification.

Qualified safeguarding, critical-contact verification, native-language/domain review, representative disabled-user research, physical Android/assistive-technology testing, held-out multilingual evaluation, operational ownership and production security gates remain open. No real emergency call, official-portal submission, WhatsApp send, map search or private-case transmission was performed by the reviewer.

Final status: **four prior P2 findings closed; no new material implementation issue identified; keyboard-test follow-up closed. Public release remains gated and the verdict is `internal_demo_only`.**
