# Implemented architecture

```mermaid
flowchart LR
  U[Anonymous local browser] --> S[Deterministic emergency and minor checks]
  S --> G[Memory-only guided intake]
  G --> A[Same-origin FastAPI POST]
  A --> P[Safety and scope policy]
  P --> F[In-memory SQLite FTS5 and intact words]
  F --> R[Curated public resource pack]
  F --> E[Optional local EmbeddingGemma 2 ranking]
  E --> R
  R --> V[Source receipts and alternatives]
  V --> C[User destination preview]
  C --> O[User opens official website]
  R --> W[Hashed public-only offline pack]
  D[211 discovery leads] --> M[Read-only maintenance and CLI review]
```

No private-user datastore, session server, outbound agent, institutional adapter or general web-search tool is implemented. Retrieval is deterministic category selection plus vetted resource lookup. The FTS index uses Porter/Unicode61 for Latin tokens; intact Indic word matching prevents Unicode61 combining-mark fragments from becoming routing evidence. Ambiguity abstains to general options.

Optional embeddings rank only already approved lexical candidates. They cannot introduce a phone, new resource, legal statement or external action. EmbeddingGemma is an encoder, not a generative model. The tested text-only configuration uses float32 on CPU, native 768 dimensions and publisher SearchQuery/Document formats. Vision/audio encoders are disabled even though the publisher checkpoint download includes their weights. No model runs at page load, and no model is downloaded by app startup.

API contracts: packages/contracts/index.ts and generated packages/contracts/openapi.json. GET /api/health, POST /api/navigate, GET /api/maintenance. API validation errors omit rejected input. Public-only source and locale maintenance is repository/CLI driven. No remotely writable administrative surface exists.
