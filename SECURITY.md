# Security reporting

Do not post vulnerabilities with personal data, working credentials or exploit details in public issues. Once a GitHub repository is published with private vulnerability reporting enabled, use its Security > Report a vulnerability flow. No remote repository or monitored security mailbox has been configured yet; public launch is gated on naming and testing a private disclosure route.

Until then, keep findings in a local maintainer review and do not expose this preview to real cases. The project does not promise a response SLA, security certification or bug bounty. See docs/THREAT_MODEL.md for known limits and docs/RELEASE_GATES.md for readiness.

Never send victim narratives or intimate media to maintainers. Dependency updates must preserve lockfiles and run the full gate. No credentials are required for local mode.

October21 engineering receipt: CI uses pinned action commits and read-only default permissions. A local full-history Gitleaks scan was clean after a narrow generated-SHA256 allowlist; this is not an independent penetration test. Fresh dependency audits found and patched certifi via the official GHSA-6q48-6c7w-9gw2 advisory. Current receipts are under docs/evidence/release-2026-10-21. Repository owners must still enable and test private vulnerability reporting, appoint an incident owner and verify hosted access/logging/ingress controls before public service use.
