# Maintainer operations

Read docs/PRIVACY.md and docs/DATA_PROVENANCE.md before handling any correction. The console is public-data-only and read-only. It has no production access control because it exposes no private data or writable API; future administrative access needs a separate authenticated design.

Commands from the repository root:

```sh
PYTHONPATH=. uv run python scripts/resources.py ingest
PYTHONPATH=. uv run python scripts/resources.py validate
PYTHONPATH=. uv run python scripts/resources.py validate --online
PYTHONPATH=. uv run python scripts/resources.py hsds
make evaluate
make verify
make quality
```

Online validation is explicit and allowlisted. Do not run it based on sensitive narratives. The command reports network failures, robots restrictions, HTTP redirects and hashes without approving resources. Run it weekly manually or arrange an authorized scheduled PR process after repository publication. No automation was registered in this task.

Update canonical source records in data/public-seeds/resources.json, preserve the old evidence, obtain review, bump pack version and run make build. Never edit the generated web pack directly. Catalog generation is only for unreviewed shells; after human review, edit individual catalogs and preserve review evidence instead of regenerating.

Current OSC registry is intentionally empty. Validate centre_id, canonical_name, state, district, authoritative source, publicly verified contact, service scope, last verification method/date, source date, partner permission and availability separately. Centre lifecycle: unseen, official_source_found, under_review, public_details_verified, partner_agreement_signed, authorized_integration_active, stale_or_disputed. Do not infer missing contacts or operational capacity.

Accessibility, usability and UI/UX changes follow [QUALITY.md](QUALITY.md). Update the pattern's state evidence, inspect the affected layouts and run both verification gates. Critical safety copy, source approval and native-language approval each need a named qualified human reviewer. Dependencies are pinned through lockfiles; review updates with release notes and rerun the interaction contracts. Research metrics remain unmeasured until consented sessions actually occur. No production operations owner or hosted monitoring process has been appointed in this local build.

Conditional image guidance uses `data/public-seeds/support-guides.json` separately from directory metrics. Preserve its version, publisher/source URL, check/review deadline, eligibility, jurisdiction, fallback and human approval state. Review both the source and SupportGuide conditional branches together. Do not refresh dates because a build passed, infer unknown age, download imagery or turn an agent source check into expert approval. Update the distinct7directory+2guide count without counting broad educational pages or geographic points as services. Preserve previous online evidence before running offline validation, which replaces the current report.

Recipient/position privacy changes require the expiry/background/late-callback/activation/clear negative tests, plus modal Hide and quick-exit boundary checks. Run Playwright suites sequentially because they share test-results. New source/payload fields require a reviewed exact preview and no automatic outbound request. Public release requires independent human review, not just the local regression gate.
