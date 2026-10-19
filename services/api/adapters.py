from typing import Protocol


class AuthorizedAdapter(Protocol):
    def submit(self, *, recipient: str, approved_payload: dict, consent_receipt: str,
               idempotency_key: str) -> dict: ...


class DisabledAdapter:
    def submit(self, **kwargs) -> dict:
        raise PermissionError('No authorized provider adapter is installed. Nothing was sent.')
