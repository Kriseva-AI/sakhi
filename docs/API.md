# API and contracts

Interactive OpenAPI is served locally at /docs; JSON at /openapi.json. Committed schema: packages/contracts/openapi.json. No API authentication is needed because T0 stores no private data and implements no outbound actions. Keep the runtime on loopback.

POST /api/navigate accepts text up to 2,000 characters, one of 16 locales, optional category, urgency, under18, goal and coarse jurisdiction. Unknown fields/types/locales fail closed. Rejected user values are excluded from validation responses. Responses contain only public resource records, routing state, abstention, engine and safety warnings. Request and response must not be logged or cached.

GET /api/maintenance exposes only public corpus counts, duplicate leads and honest coverage; it has no write methods. It is a read-only local console, not a production admin login. No endpoint can submit a complaint, receive evidence or create a personal case. DisabledAdapter raises PermissionError even if an apparent consent object is supplied.

Future partner tools require narrow credential scope, approved payload previews, per-recipient consent, idempotency and observed acknowledgement. No such authorization exists in this repository.
