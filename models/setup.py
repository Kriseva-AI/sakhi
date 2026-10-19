"""Explicit, pinned publisher download. No key, model execution or implicit credential use."""

import argparse
import json
from pathlib import Path
from urllib.request import urlopen

MODEL = "google/embeddinggemma-2"
REVISION = "914f7f89142e33e77833254d9c9b90c3cef7303b"
ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(
        description="Explicit optional local model setup. Apache-2.0 model weights."
    )
    parser.add_argument("--accept-license", action="store_true")
    args = parser.parse_args()
    if not args.accept_license:
        parser.error("Read https://huggingface.co/google/embeddinggemma-2 and rerun with --accept-license.")
    with urlopen(f"https://huggingface.co/api/models/{MODEL}/revision/{REVISION}", timeout=30) as response:
        metadata = json.load(response)
    if metadata.get("cardData", {}).get("license") != "apache-2.0" or metadata.get("gated"):
        raise SystemExit("Publisher license or access changed. Maintainer review is required.")
    from huggingface_hub import snapshot_download

    path = snapshot_download(
        MODEL,
        revision=REVISION,
        token=False,
        local_dir=ROOT / "models/cache/embeddinggemma-2",
        allow_patterns=["*.json", "*.safetensors", "*.model", "*.txt", "*.jinja", "1_Pooling/*", "2_Dense/*"],
    )
    manifest = {
        "model": MODEL,
        "revision": REVISION,
        "license": "apache-2.0",
        "path": str(path),
        "bytes": sum(p.stat().st_size for p in Path(path).rglob("*") if p.is_file()),
        "source": "https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2",
    }
    (ROOT / "models/cache/manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({k: v for k, v in manifest.items() if k != "path"}, indent=2))


if __name__ == "__main__":
    main()
