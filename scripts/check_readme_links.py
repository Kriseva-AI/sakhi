"""Check the committed README's local targets without fetching external services."""

import json
import re
from urllib.parse import unquote, urlsplit

from services.api.registry import ROOT


def main():
    text = (ROOT / "README.md").read_text()
    targets = re.findall(r"!?\[[^\]]*\]\(([^\s)]+)\)", text)
    targets += re.findall(r'<img[^>]+src="([^"]+)"', text)
    missing, local, external = [], [], []
    for target in targets:
        url = urlsplit(target)
        if url.scheme in ("http", "https"):
            assert url.hostname and not url.username and not url.password
            external.append(target)
        elif target.startswith("#"):
            continue
        else:
            path = (ROOT / unquote(url.path)).resolve()
            assert path.is_relative_to(ROOT)
            (local if path.exists() else missing).append(target)
    report = {
        "local_targets": local,
        "missing": missing,
        "external_urls": external,
        "external_check": "Syntax only here. Public-source HTTP observations are separate in resource-validation.json. A 403 or source check is not service availability.",
    }
    (ROOT / "docs/evidence/readme-links.json").write_text(json.dumps(report, indent=2) + "\n")
    print(f"README: {len(local)} local targets exist, {len(external)} external URLs have valid syntax.")
    assert not missing, f"Missing README targets: {missing}"


if __name__ == "__main__":
    main()
