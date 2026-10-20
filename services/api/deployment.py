"""Explicit hosting metadata, never a wildcard or a credential lookup."""

import re
from collections.abc import Mapping


def trusted_hosts(environment: Mapping[str, str]) -> list[str]:
    configured = environment.get("SAKHI_ALLOWED_HOSTS", "127.0.0.1,localhost,testserver")
    candidates = configured.split(",") + [environment.get(key, "") for key in (
        "VERCEL_URL", "VERCEL_BRANCH_URL", "VERCEL_PROJECT_PRODUCTION_URL",
    )]
    return list(dict.fromkeys(host.strip() for host in candidates
                             if re.fullmatch(r"[A-Za-z0-9](?:[A-Za-z0-9.-]{0,251}[A-Za-z0-9])?", host.strip())))
