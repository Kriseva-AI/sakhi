# Kriseva Sakhi GitHub README Blueprint

This is a REQUIREMENT for Codex to generate the repository's final README after the application is actually running. Do not copy fake performance or status statements into the released README. Use only screenshots, CI badges, versions, numbers and commands that have been verified.

## Visual hierarchy and GitHub-first layout

1. Compact wordmark/header with approved project identity and real license/CI badges.
2. Clear opening: `Sakhi handles the complexity. You stay in control.`
3. Safety notice directly visible: not an emergency-response, counselling or legal services provider; for immediate danger in India call 112. No government affiliation unless documented.
4. Device-safety notice: shared devices and browsing history can expose activity; a quick-exit UI does not ensure safety.
5. Three actual screenshots from the running application: public landing, verified resource card, honest demonstration of user approval; include descriptive alt text.
6. One short GIF or MP4 of a SYNTHETIC journey if legally permissible and compact. It must show demo mode clearly and not reveal any personal case or real victim information.
7. Real working feature matrix, visibly separated from experimental/planned/partner-only.
8. Clear `Before Sakhi` vs `With Sakhi` flow based on a fictional example. No unmeasured claim about success rate or speed; show steps not fictional impact figures.
9. Under-60-second quick start with tested commands and expected localhost URL. Exactly one 'happy path', followed by alternate paths.
10. 'No key demo' vs 'optional local AI retrieval' feature comparison, model download size/hardware requirements from observed install, costs/rate limits of optional services, and fallback behavior.
11. Sixteen locale matrix: code, display name, UI key coverage, human language-review status, tested screen readers/fonts/RTL.
12. Explain what EmbeddingGemma 2 does and DOES NOT do. Link to Google model card; no AI safety guarantee.
13. Official resource source/provenance and freshness: tell user how to check current information themselves.
14. Repository architecture diagram with only implemented components. Mermaid Markdown preferred.
15. Screenshots/responsiveness viewport matrix and actual accessibility test results, including exceptions.
16. Docker/local install instructions for Mac, Linux and Windows, minimum RAM/storage, GPU optionality, reproducible setup.
17. Configuration table with types, defaults, purpose and sensitive-secret handling. No secrets in screenshots or examples.
18. How to run `make verify` and test suites offline. Show actual outputs or reproducible instructions.
19. Roadmap with links to real GitHub Issues, truthful completion states, OS goals and partner requirements.
20. Domain-specific risk boundaries, vulnerability disclosure path and expectations for project operators.
21. Contributing: good first issues, pull request and translation workflows, resource verification, privacy-safe bug reports.
22. Code of conduct and moderation: don't submit personal abuse stories, intimate media, contact records or private case details through GitHub Issues.
23. Dependency and model licenses, attribution, logos, and explicit statement that links do not imply partnerships.
24. Demo deployment badge only when real URL verified; do not promise 24/7 availability.
25. One-line footer noting release tag/date of last resource review.

## Example 'Before vs After' copy (illustrative UX only)

**Without the navigator:** A user must independently guess which type of support is relevant, search across different institutions, interpret technical language, verify contact details, and prepare questions.

**With the reviewed Sakhi navigator:** A user picks her preferred language and goal, reads minimal questions, sees multiple official resource options with links and source dates, prepares a private optional checklist, and decides whether to open an official service. Sakhi does not submit complaints or contact people secretly.

## Local preview requirements

- No paid key or user account required for the offline/local demonstration.
- Must not create mock official referral statuses that appear live.
- Explain the two installation tiers: small zero-model app and enhanced optional local embeddings.
- Do not direct vulnerable people to a demo as a crisis-response channel.
- Images must depict only synthetic data, not real incidents.

## GitHub quality files

- LICENSE (project's own Apache-2.0 only after third-party audit)
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, SUPPORT.md, ROADMAP.md
- docs/PRIVACY.md, docs/SAFETY.md, docs/DATA_PROVENANCE.md, docs/TRANSLATION_REVIEW.md
- .github/ISSUE_TEMPLATE/{bug_report,feature_request,resource_correction,translation}.yml
- .github/PULL_REQUEST_TEMPLATE.md
- .github/workflows/{ci,dependency-review,security,links}.yml
- package lockfiles / Python lockfile / container verification
- Dependabot or alternative pin-update process

## README anti-patterns to block

- Made-up stars/downloads/performance badges, fake approvals, false source verification, unfounded security claims.
- Marketing features not present in code.
- Requests for trauma details in issues or comments.
- Screenshots with real provider case details, real contact numbers used as fictional data, secrets or identities.
- Unsupported 'infinite free API' assumption.
