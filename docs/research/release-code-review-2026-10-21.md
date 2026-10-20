# Independent read-only code review, October21

Reviewer: fresh Codex review agent using gpt-6-astra, high reasoning. Range10f5f59..0e2ad0aa28729c076ba59a835096d057a8c25abb. Read-only source review and an isolated transpiled React hook harness. No competing browser suite, service mutation, private input or external transmission. This is scoped code review, not security certification or human safeguarding approval.

## Important finding: P2 stale AAC replacement

Finder's AAC confirmation replaced category/goal/text without cancelling a pending lookup or invalidating its local submission generation. Trigger: begin adult Online lookup, choose and confirm Home symbols before the response arrives. The old Online response could displace the confirmed new concern.

The reviewer hook harness reported `cancelCallsAfterConfirmedReplacement:0`, `stillBusy:true`, `selectedHome:true`. Recommended correction: call cancel, increment the local submission generation and reset busy/error before applying a new confirmed AAC choice. Required delayed-response regression must show the new choice survives and the next request uses Home.

No other substantiated Critical, Important or Minor findings were reported. Verdict: with fixes for the scoped internal implementation; no public launch or whole12-task-plan approval.

## Behaviours the reviewer declined to judge

- ASR negation/dialect, image-age interpretation, media prompt injection, interpretation confirmation and worker deletion: those processing paths are absent and explicitly unavailable.
- Sandboxed server decoding/saturation: no upload/server decoder exists. Native playback checks do not establish physical decoder resilience.
- Full translated guidance, native correctness and shaping: qualified review remains required.
- Physical switch, eye-gaze, screen-reader, phone codecs and cold offline acceptance: synthetic/source checks cannot establish them.
- Hosted authentication/logs/ingress/packaging, provider capacity, executed rollback and reel readiness: the hosted target is not accepted and gates remain open.
- Final full-suite results: the author's suite was running; the reviewer did not run a competing suite.

## Executor disposition

The stale-response finding is accepted as Important and enters the single correction pass. All declined processing paths remain unavailable. Native/physical/language/hosting/provider/public-launch claims remain gated. The author must finish and record fresh full verification after the correction; reviewer reasoning does not replace those results. See the release report for the final evidence.
