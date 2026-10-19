.PHONY: setup dev build verify evaluate resources model clean-preview
setup:
	npm ci
	uv sync --frozen --group dev
	npx playwright install chromium
dev:
	uv run --frozen python scripts/dev.py
build:
	PYTHONPATH=. uv run --frozen python scripts/build_public.py
	npm run build
	PYTHONPATH=. uv run --frozen python scripts/build_public.py --after-build
verify:
	uv run --frozen ruff check services scripts tests models
	uv run --frozen pytest -q --junitxml=docs/evidence/pytest.xml
	npm test
	PYTHONPATH=. uv run --frozen python scripts/validate_project.py
	$(MAKE) build
	$(MAKE) evaluate
	npx playwright test
evaluate:
	PYTHONPATH=. uv run --frozen python scripts/evaluate.py
resources:
	PYTHONPATH=. uv run --frozen python scripts/resources.py validate
model:
	uv sync --frozen --group dev --group embeddings
	uv run --frozen --group embeddings python models/setup.py --accept-license
