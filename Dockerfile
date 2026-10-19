FROM node:22-bookworm-slim AS web
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY apps ./apps
COPY packages ./packages
COPY data ./data
RUN npm run build

FROM python:3.13-slim-bookworm AS runtime
WORKDIR /app
COPY --from=ghcr.io/astral-sh/uv:0.11.6 /uv /usr/local/bin/uv
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev
COPY services ./services
COPY planning ./planning
COPY data ./data
COPY scripts ./scripts
COPY --from=web /app/apps/web/dist ./apps/web/dist
RUN mkdir -p docs/evidence && PYTHONPATH=. uv run --frozen --no-dev python scripts/build_public.py --after-build
RUN useradd --create-home --uid 10001 sakhi && chown -R sakhi:sakhi /app
USER sakhi
EXPOSE 8080
CMD ["/app/.venv/bin/uvicorn", "services.api.main:app", "--host", "0.0.0.0", "--port", "8080", "--no-access-log"]
