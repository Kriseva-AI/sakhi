import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from .registry import ROOT, maintenance, resources
from .retrieval import retriever
from .runtime import optional_rank, semantic_status
from .safety import safety_route, unsafe_request
from .schemas import NavigateRequest, NavigateResponse

app = FastAPI(
    title="Kriseva Sakhi public navigator",
    version="0.1.0",
    description="Local preview. No private storage, submissions or provider integrations.",
    telemetry={
        "tracing": False,
        "metrics": False,
        "logs": False,
        "operation_spans": False,
        "auto_configure": False,
    },
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=os.environ.get("SAKHI_ALLOWED_HOSTS", "127.0.0.1,localhost,testserver").split(","),
)
app.add_middleware(GZipMiddleware, minimum_size=500)


@app.exception_handler(RequestValidationError)
async def private_validation_error(request, exception):
    return JSONResponse(
        status_code=422, content={"detail": "Invalid request. Check supported values and input length."}
    )


@app.middleware("http")
async def security_headers(request, call_next):
    response = await call_next(request)
    response.headers.update(
        {
            "Cache-Control": "no-store",
            "Referrer-Policy": "no-referrer",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; "
            "img-src 'self' data:; font-src 'self'; connect-src 'self'; "
            "frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'",
        }
    )
    return response


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "mode": "functional_local",
        "semantic_search": semantic_status(),
        "engine": "sqlite_fts5_bm25",
        "external_actions": False,
        "storage": "public_index_in_memory",
    }


@app.post("/api/navigate", response_model=NavigateResponse)
def navigate(payload: NavigateRequest):
    state = safety_route(payload.text, payload.urgency, payload.under18)
    warnings = [
        "Sakhi is not an emergency, counselling or legal representation service.",
        "No message or complaint has been sent.",
    ]
    if payload.locale != "en-IN":
        warnings.append("Translation review pending. Source-backed safety and service details use English.")
    if state == "urgent_redirect":
        emergency = [r for r in resources(fresh_only=False) if r.id == "emergency"]
        return NavigateResponse(
            state=state,
            category="emergency",
            abstained=False,
            resources=emergency,
            engine="deterministic",
            warnings=warnings,
        )
    if state == "minor_redirect":
        return NavigateResponse(
            state=state,
            category="child",
            abstained=False,
            resources=retriever.find("unsure", minor=True),
            engine="deterministic",
            warnings=warnings,
        )
    category = None if unsafe_request(payload.text) else payload.category or retriever.classify(payload.text)
    abstained = category is None
    category = category or "unsure"
    if abstained:
        warnings.append("Not enough information for a specific pathway. These are general options.")
    if payload.jurisdiction == "West Bengal":
        warnings.append("The WCD source lists West Bengal as an exception to 181 availability.")
    found = retriever.find(category, payload.jurisdiction)
    ranked, semantic_used = optional_rank(payload.text, found) if not abstained else (found, False)
    return NavigateResponse(
        state="present_options",
        category=category,
        abstained=abstained,
        resources=ranked,
        engine="hybrid_bm25_embeddinggemma2" if semantic_used else "sqlite_fts5_bm25",
        warnings=warnings,
    )


@app.get("/api/maintenance")
def maintenance_summary():
    return maintenance()


dist = Path(os.environ.get("SAKHI_WEB_DIST", str(ROOT / "apps/web/dist")))
if dist.exists():
    app.mount("/assets", StaticFiles(directory=dist / "assets"), name="assets")

    @app.get("/{path:path}", include_in_schema=False)
    def spa(path: str):
        target = (dist / path).resolve()
        if target.is_relative_to(dist.resolve()) and target.is_file():
            return FileResponse(target)
        return FileResponse(dist / "index.html")
