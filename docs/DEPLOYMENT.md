# Controlled review deployment

Public source publication and a public support-service launch are separate events. The application remains `internal_demo_only` while the [release gates](RELEASE_GATES.md) are open. Use synthetic concerns for review. Never invite real cases into an unreviewed preview.

## Local container

```sh
docker compose up --build -d
curl --fail http://127.0.0.1:8787/api/health
```

The image serves the React application, public packs and FastAPI from one origin. It runs without root, uses a read-only filesystem and binds to loopback. The canonical language registry must be present in the runtime image. No model, account or API key is required. Check listener ownership before replacing any existing service.

## Vercel review target

The root `vercel.json` and `pyproject.toml` declare the FastAPI entrypoint, a locked web build and a30-second function ceiling. Static promotion is disabled so application security middleware remains active for assets. Exact hosting metadata supplies trusted hostnames, with no wildcard. No private content belongs in build output.

This configuration follows [Vercel's FastAPI documentation](https://vercel.com/docs/frameworks/backend/fastapi), checked October21,2026. It is a prepared target, not a claim that a hosted build has passed.

1. Reconnect the Vercel integration or use an owner-authenticated CLI. Do not paste credentials into an issue, terminal transcript or chat.
2. Select the intended project/team, confirm existing plan limits and enable authenticated deployment protection before inviting reviewers. These are owner-controlled account settings. No paid plan is assumed.
3. Deploy a preview. Do not use a production promotion command while human gates are open.
4. Verify HTTPS, authentication for HTML/assets/API, exact allowed hosts, no body/access telemetry at the host, security headers, emergency HTML before JS, resource pack integrity and all deep links. Hosting protection must cover the whole application.
5. Run the synthetic browser journeys against the actual hosted origin, then denied-permission/offline/provider-failure checks. No private narratives or real emergency calls/messages are needed.
6. Record deployment ID, source commit, UTC time, URL, access scope, test evidence and rollback target in the release receipt. Revoke access or roll back if the exact build fails.

The October21 attempt could not begin: Vercel required reauthentication and the installed Cloudflare CLI was signed out. No hosted URL, TLS acceptance or production deployment is asserted. Process-local rate limits are not distributed ingress protection; security, quotas, logs and incident ownership need hosting review.

## Promotion and rollback

Before public promotion, obtain the exact content/language/contact, safeguarding, privacy/security, physical accessibility, offline and operations receipts in the release gates. Record the last accepted source/image digest and provider quotas. Keep the previous protected deployment available until acceptance. A failed provider must show its existing manual/public alternative; a successful individual probe does not prove capacity. Do not promote the Instagram launch while these conditions remain open.
