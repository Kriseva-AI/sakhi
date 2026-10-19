# ADR 001: a local public navigator

Date: 2026-10-19. Status: accepted for implementation under the supplied specification.

| Choice | Benefit | Cost | Decision |
| --- | --- | --- | --- |
| Vite + React + strict TypeScript | Small static shell, no server rendering dependency, public offline pack | Separate API process | Selected |
| Next.js | Server rendering and routing ecosystem | Unneeded server session surface for anonymous local use | Deferred |
| Buildless HTML | Smallest initial setup | Harder typed state and locale consistency at this scope | Rejected |
| FastAPI + Pydantic + SQLite FTS5 | Typed OpenAPI, deterministic local BM25, no service credentials | Python runtime | Selected |
| PostgreSQL + vector service | Useful for larger provider deployments | Operational and privacy overhead | Deferred |
| Reviewed templates + lexical search | Auditable, fast, offline, no generated contacts | Limited paraphrase recall | Default |
| EmbeddingGemma 2 text encoder | Local semantic ranking, Apache-2.0 publisher card | Explicit download, compatibility and evaluation gate | Optional, never startup download |

Public React app talks to a same-origin API. POST carries ephemeral text; no text in URLs or logs. SQLite indexes public reviewed records in memory. The API never saves query text. Resource curation and reports are CLI-driven, with a read-only local maintenance console. There are no remotely writable maintenance endpoints.

Emergency CTA and explicit danger choices bypass search. All locale shells retain source-backed English safety content with visible fallback until human review. Adult workflows stop for a minor indication. External links require exact hostname and zero-payload preview; synthetic scenarios cannot open or call services. Every outbound adapter fails closed.

Public resource packs have a version and content hash. The service worker caches only a static allowlist, never POST responses, queries, drafts or API responses. No account, vault, upload, analytics, speech, GPS or cloud model exists in T0. P1/P2 stay disabled while P0 review gates remain open.

Hardware observed: macOS, 24 GiB RAM, Node 25.9.0, Python 3.11.15, Docker Engine 29.4.0. Target contributor runtime: Node 22+, Python 3.11+. Container and native paths must be tested separately.
