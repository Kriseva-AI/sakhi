# Canonical public language registry. Approval is tracked separately from key presence.
import json
from pathlib import Path
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

LOCALES = tuple(row["locale"] for row in json.loads(
    (Path(__file__).resolve().parents[2] / "packages/i18n/locales.json").read_text()
)["languages"])
Locale = Literal[*LOCALES]
Category = Literal["cyber", "home", "workplace", "legal", "friend", "unsure"]


class NavigateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    text: str = Field(default="", max_length=2000)
    locale: Locale = "en-IN"
    category: Category | None = None
    urgency: bool = False
    under18: bool = False
    jurisdiction: Literal["India", "West Bengal", "Other state or UT"] = "India"
    goal: Literal["understand", "report", "support", "friend"] = "understand"


class Resource(BaseModel):
    id: str
    title: str
    summary: str
    url: str
    source_url: str
    authority: str
    phone: str | None = None
    categories: list[str]
    jurisdiction: str
    eligibility: str
    checked_at: str
    expires_at: str
    verification_method: str
    review_status: str
    access_type: str
    service_cost: str
    permission: str
    limitations: str
    status: Literal["verified_public_link"] = "verified_public_link"


class NavigateResponse(BaseModel):
    state: Literal["urgent_redirect", "minor_redirect", "present_options"]
    category: str
    abstained: bool
    resources: list[Resource]
    engine: str
    warnings: list[str]
    language_status: Literal["review_pending"] = "review_pending"
    content_locale: str = "en-IN"
    external_actions: bool = False
