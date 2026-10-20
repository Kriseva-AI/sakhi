# Independent review resolution

The original independent report is retained at research/p0-independent-review-2026-10-20.md. Its findings are not rewritten into an approval. The author made one correction pass, with regression tests and a subsequent complete gate. No second reviewer signoff or independent security audit is claimed.

| Finding | Correction | Regression evidence |
| --- | --- | --- |
| P1 copied position survives draft expiry/revocation | Sensitive destinations carry draft generation and expiry. Position expiry/background invalidates and closes the modal. Native link activation, auxiliary activation and context actions recheck validity before allowing the handoff. | location-sharing: open-preview expiry, background close, activation-time expiry, normal immediate handoff; review-preview-red.log and final green suite |
| P2 cover inaccessible during modal | Cover and explicit quick exit are inside the modal. Cover invalidates the preview before showing Notes. Quick exit synchronously clears app state and renders Notes before initiating external navigation. | recovery modal-cover test; quick-exit navigation-boundary test. The boundary test cancels a synthetic navigation; no external message/request is made. |

The cover finding was treated as important because a user may need to hide a sensitive preview immediately. The one-time position remains distinct from a native external live-location stream. Opening remains an opening request; sent/replied records remain explicitly user-reported; delivery remains unobserved.

Additional acceptance checks found the missing blocked-bundle emergency fallback and a removed language preference being recreated on reload. Both were reproduced and corrected. Static emergency HTML now precedes application code; only an explicit language change creates a saved preference.

Test process limits are recorded honestly: early focused checks used two incorrect selectors and were corrected; a concurrent runner removed a trace file from another run; those failures are retained and are not accepted evidence. A stalled-navigation inspection also waited on the navigation it meant to inspect; the final boundary check uses a cancelled beforeunload observation instead. Final verification runs alone. Human source, safeguarding, language, physical accessibility, security, incident ownership and provider-capacity gates remain open.
