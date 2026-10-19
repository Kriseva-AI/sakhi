# Security reporting

Do not post vulnerabilities with personal data, working credentials or exploit details in public issues. Once a GitHub repository is published with private vulnerability reporting enabled, use its Security > Report a vulnerability flow. No remote repository or monitored security mailbox has been configured yet; public launch is gated on naming and testing a private disclosure route.

Until then, keep findings in a local maintainer review and do not expose this preview to real cases. The project does not promise a response SLA, security certification or bug bounty. See docs/THREAT_MODEL.md for known limits and docs/RELEASE_GATES.md for readiness.

Never send victim narratives or intimate media to maintainers. Dependency updates must preserve lockfiles and run the full gate. No credentials are required for local mode.
