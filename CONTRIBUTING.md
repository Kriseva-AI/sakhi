# Contributing to Sakhi

Help make public support easier to understand while preserving people's choices and privacy. This is an internal review preview with open human release gates. Repository participation is not emergency or case support.

## Start here

1. Read the [README](README.md), [safety rules](docs/SAFETY.md), [privacy boundary](docs/PRIVACY.md) and [current blockers](docs/BLOCKERS_2026-10-21.md).
2. Use Node22+, uv and Python3.13. Run `make setup`, then `make dev`. The launcher refuses occupied ports.
3. Create a focused branch, for example `fix/keyboard-symbol-choice`. Keep one user-visible problem per PR.
4. Reproduce a bug with synthetic data, make the change and run `make verify`. Run `make quality` for layout, font, bundle or loading changes. Run browser suites sequentially.
5. Use the PR template to explain behaviour, provenance, safety/privacy impact, accessibility, actual results and unresolved dependencies. Include mobile/desktop captures for visible changes, with synthetic data only.

Never submit a private story, identity, intimate media, credential or personal case document in an issue, PR, test, trace or screenshot. Do not contact a service or a vulnerable person as part of a test. Use [security reporting](SECURITY.md) for vulnerability handling limits.

## Choose a contribution

- Reproduce setup or a synthetic journey on another OS/browser.
- Improve keyboard, screen-reader, touch or low-bandwidth behaviour.
- Propose a public-source correction with a dated authoritative link and exact scope.
- Classify the localisation inventory or arrange qualified native/domain review.
- Add independently authored, nonsensitive failure and uncertainty cases.

The [issue backlog](docs/ISSUE_BACKLOG.md) distinguishes engineering from external dependencies. Before starting substantial work, describe the synthetic problem and proposed scope in an issue. Issues are public and are not a private communication channel.

## Changes that need scoped review

Critical contacts require source provenance, human contact verification and a second review. Discovery leads never become approved resources by import. Eligibility, jurisdiction, operating hours and availability must preserve unknown values. A successful HTTP request is not service acceptance.

Translations need native language and safeguarding/domain expert signoff with exact content version/hash, reviewer, scope and expiry. See [translation review](docs/TRANSLATION_REVIEW.md). Key presence, model output, a feature flag or a popularity vote cannot approve a language.

New private processing or external actions need a threat model, bounded retention, cancellation/deletion semantics and exact action-time consent. Acquisition, interpretation and sharing are separate decisions. Protect deterministic emergency/child safeguards and useful alternatives. No automatic transmission, narrative analytics, mandatory account or personal persistence belongs in the current preview.

## Maintainer acceptance

Require green local/remote checks, an independent review for consequential changes and recorded source/permission impact. A maintainer must verify the exact deployment build and release gates. Do not merge a failing change or bypass hooks. Prefer small descriptive commits; do not rewrite shared history. Lockfile changes should be intentional, reviewed and audited.

Human safety, language, contact, physical-device and operational approvals remain separate from CI. Public promotion and the Instagram launch wait for those gates. Follow the [community conduct](CODE_OF_CONDUCT.md) rules in every contribution.
