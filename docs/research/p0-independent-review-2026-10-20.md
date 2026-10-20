# Independent whole-change review, 2026-10-20

Scope: branch build/sakhi-sprint2, baseline fc74056, implementation 4dd9129 and plan d440ef4. Reviewed the complete source/test diff and related current files, including SupportGuide, App, Modal, LocalPosition, LovedOneUpdate, TravelWorkspace, public actions, API budget, source data, model comparison script and browser regressions. Parent-supplied rulings permit the existing branch, pink/black design and explicit location consent. No public deployment, actual messages, model promotion or downloads are authorized or inferred.

Verdict: two actionable issues. No P0 found in this bounded review. Correct the P1 before treating the consented-location flow as complete. This is an engineering review, not safeguarding approval, human source verification, physical assistive-technology acceptance or production readiness.

## P1: Expiring or clearing a position does not invalidate its outbound preview

Primary location: `apps/web/src/travel/LovedOneUpdate.tsx:85-101`. Related locations: expiry at lines 34-46; position clearing callback at lines 167-170; `apps/web/src/travel/LocalPosition.tsx:46-55`; `apps/web/src/Modal.tsx:96-107`.

Trigger: choose a synthetic one-time position, fill a recipient, approve the draft, open the preview, then wait past the position's two-minute lifetime. The local draft drops the position and revokes consent, but App's independent Destination still contains the original precise coordinates, encoded URL and onOpen callback. The modal remains enabled and can open that stale URL. Hiding the browser tab clears the position through the visibility listener but likewise leaves the copied preview intact. The modal checks only its device-history checkbox, not whether the snapshot or draft approval is still valid.

Practical consequence: precise location can still leave the page after the interface has expired or cleared the location and revoked its local approval. The user is also given conflicting states between the underlying draft and modal.

Fix: bind sensitive Destination objects to a draft generation and expiry, invalidate or close them on position expiry, background/revoke/clear and draft changes, and enforce validity again when activating the outbound link. An onOpen callback alone cannot block native navigation. Tests should hold an already-approved preview through expiry and visibility revocation, then prove its URL cannot be activated; also verify normal immediate handoff still works.

Evidence: a portless Chromium component harness imported the current LovedOneUpdate and OutboundModal source, used only synthetic recipient/location values, and advanced the fake clock by 121 seconds. No outbound link was followed. Observed output:

```json
{"case":"expiry","draftContainsPosition":false,"modalContainsPosition":true,"outboundHrefContainsPosition":true}
```

Existing tests verify stale readings and late watcher callbacks, but do not exercise the already-created outbound preview after expiry or visibility revocation.

## P2: The new Hide control cannot be used while the sensitive preview is open

Primary location: `apps/web/src/App.tsx:323-337`. Related locations: `apps/web/src/Modal.tsx:27-40` and lines 45-118.

Trigger: open any outbound preview, especially the new recipient/precise-position preview, then try to activate Hide. OutboundModal uses native showModal(), making the header outside the dialog inert. There is no Hide action inside the modal and no equivalent global keyboard action. Users must dismiss the preview first, leaving the sensitive source page displayed, and then find the header control. Quick exit is only available after covering the page, so it has the same obstruction.

Fix: expose the same cover action inside the outbound modal, with working keyboard focus and focus restoration, or provide an accessible global action that remains available during the modal. Cover should close/invalidate the sensitive preview before displaying Notes. Add a regression that opens the recipient/location preview and covers it directly without an intermediate visible source page.

Evidence: the same portless harness placed a header Hide button outside the actual OutboundModal. Calling focus on the button while the dialog was open could not move focus to it:

```json
{"case":"hideWhileModal","hideCanReceiveFocus":false,"dialogOpen":true}
```

This confirms native modal behavior; App source inspection establishes that the actual Hide control occupies that inaccessible placement. No claim of a full production-browser reproduction is made for this item.

## Other review results and limits

- Unknown image age does not select StopNCII. The under-18 image route and conditional eligibility wording remain distinct. Source dates and human-review limitations are displayed; the new sources were not independently reverified with their publishers during this engineering review.
- LocalPosition generations prevent a late watch callback from restoring a reading after stop, remount/clear, cover or tool exit. The issue above is a separate copied-preview lifecycle problem.
- Public travel lookup keeps its timeout active through response body parsing and supplies an immediate alternate public-map path. Emergency rendering remains outside the request. API rate limiting bypasses deterministic child/emergency routes. Provider capacity is still an external blocker.
- Opening requested, self-reported sent, self-reported reply and unobserved delivery are distinct. No automatic delivery or rescue claim was found in the new status display.
- The model comparison remains an explicit local script with small author-labelled English fixtures. It does not promote a model into application safety routing.
- Parent reports the main gate as 54 Python, 20 unit and 287 browser passes with 2 explicit skips. This reviewer did not rerun the full gate, operate existing listeners, use real GPS, contact services, inspect credentials or send messages. Final production checks were still running during review.
- Two attempts to load the whole App directly with plain esbuild were unsuitable because locale loading requires Vite's import.meta.glob transform. They were not counted as application failures or passing tests. The successful focused harness used actual component source and did not require a server, ports, persistent output or external requests.
