"""Explicit GeoNames public gazetteer refresh. Never runs during setup/startup/tests."""

import argparse
import hashlib
import io
import json
import zipfile
from datetime import date
from pathlib import Path

import httpx

parser = argparse.ArgumentParser()
parser.add_argument("--download", action="store_true", required=True)
parser.parse_args()
base = "https://download.geonames.org/export/dump/"
with httpx.Client(timeout=30, headers={"User-Agent": "KrisevaSakhi-PublicGazetteer/0.1"}) as client:
    archive = client.get(base + "cities15000.zip")
    admin = client.get(base + "admin1CodesASCII.txt")
    archive.raise_for_status()
    admin.raise_for_status()
states = {
    line.split("\t")[0]: line.split("\t")[1] for line in admin.text.splitlines() if line.startswith("IN.")
}
with zipfile.ZipFile(io.BytesIO(archive.content)) as z:
    lines = z.read("cities15000.txt").decode().splitlines()
rows = []
for line in lines:
    c = line.split("\t")
    if c[8] == "IN" and 6 <= float(c[4]) <= 37.5 and 68 <= float(c[5]) <= 98:
        rows.append(
            {
                "id": int(c[0]),
                "name": c[1],
                "ascii": c[2],
                "state": states.get("IN." + c[10], "India"),
                "lat": float(c[4]),
                "lon": float(c[5]),
            }
        )
path = Path(__file__).resolve().parents[1] / "data/public-seeds/travel-cities.json"
path.write_text(
    json.dumps(
        {
            "source": "GeoNames cities15000 / admin1CodesASCII",
            "url": base,
            "downloaded_on": date.today().isoformat(),
            "sha256_zip": hashlib.sha256(archive.content).hexdigest(),
            "sha256_admin": hashlib.sha256(admin.content).hexdigest(),
            "license": "CC BY 4.0",
            "cities": rows,
        },
        ensure_ascii=False,
        indent=2,
    )
    + "\n"
)
print(f"Wrote {len(rows)} public city records. Review and commit the diff before release.")
