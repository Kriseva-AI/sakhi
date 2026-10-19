"""Generate public-only assets from canonical reviewed data. No private input."""

import hashlib
import json
import shutil

from services.api.registry import ROOT
from services.api.retrieval import ALIASES
from services.api.safety import EMERGENCY_PHRASES, MINOR_PATTERNS


def prepare():
    public = ROOT / "apps/web/public"
    source = ROOT / "data/public-seeds/resources.json"
    shutil.copyfile(source, public / "resource-pack.json")
    (public / "resource-pack.sha256").write_text(hashlib.sha256(source.read_bytes()).hexdigest() + "\n")
    (ROOT / "apps/web/src/routing.json").write_text(
        json.dumps(
            {"emergency": EMERGENCY_PHRASES, "minor_patterns": MINOR_PATTERNS, "aliases": ALIASES},
            ensure_ascii=False,
            indent=2,
        )
        + "\n"
    )


def service_worker():
    dist = ROOT / "apps/web/dist"
    paths = [
        "/index.html",
        "/icon.svg",
        "/manifest.webmanifest",
        "/resource-pack.json",
        "/resource-pack.sha256",
    ]
    paths.extend("/" + str(p.relative_to(dist)) for p in (dist / "assets").rglob("*") if p.is_file())
    paths.extend("/" + str(p.relative_to(dist)) for p in (dist / "fonts").rglob("*") if p.is_file())
    paths.extend("/" + str(p.relative_to(dist)) for p in (dist / "licenses").rglob("*") if p.is_file())
    mapping = {p: hashlib.sha256((dist / p.lstrip("/")).read_bytes()).hexdigest() for p in paths}
    version = hashlib.sha256(json.dumps(mapping, sort_keys=True).encode()).hexdigest()[:16]
    worker = """// Generated versioned public-only cache. Does not cache runtime requests.
const CACHE='sakhi-public-VERSION';
const HASHES=MAPPING;
async function verifiedResponse(path){
  const response=await fetch(path,{cache:'reload',credentials:'omit'});
  if(!response.ok)throw new Error('Public pack unavailable');
  const bytes=await response.clone().arrayBuffer();
  const digest=await crypto.subtle.digest('SHA-256',bytes);
  const hex=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
  if(hex!==HASHES[path])throw new Error('Public content hash mismatch');
  return response;
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  for(const path of Object.keys(HASHES)){await cache.put(path,await verifiedResponse(path));}
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('sakhi-public-')&&key!==CACHE)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/')||url.search)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match('/index.html')));return;
  }
  if(HASHES[url.pathname])event.respondWith(caches.match(url.pathname).then(r=>r||fetch(event.request)));
});
""".replace("VERSION", version).replace("MAPPING", json.dumps(mapping))
    (dist / "sw.js").write_text(worker)
    (ROOT / "docs/evidence/public-cache-manifest.json").write_text(
        json.dumps({"version": version, "sha256": mapping}, indent=2) + "\n"
    )
    print(f"Generated immutable public cache {version}, {len(paths)} assets. No API or query cache.")


if __name__ == "__main__":
    import sys

    service_worker() if "--after-build" in sys.argv else prepare()
