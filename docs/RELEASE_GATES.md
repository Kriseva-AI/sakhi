# Release gates

Verdict: internal_demo_only. Passing automation is necessary but does not authorize a user-facing verified release.

| Gate | Actual state | Evidence or blocker |
| --- | --- | --- |
| Clone and zero-key native setup | Implemented, tested on this Mac | make setup / make verify |
| Container build and local runtime | Built and running | docs/evidence/docker-build.log |
| Fully functional anonymous journey | Implemented | Browser results and screenshots |
| Emergency before API | Implemented and tested | Local/browser tests; real reachability not tested |
| Minor workflow stop | Implemented for explicit choice and supported phrases | Finite-pattern limitations remain |
| No sensitive persistence/outbound action | Automated local checks | Independent public-deployment audit pending |
| 211 seeds separated from curated pack | Implemented | Discovery registry and source validation |
| Critical contact verification | Agent official-source checks only | Human verification required |
| 16 locale shells and RTL | Structurally complete | Human language and safeguarding signoff required for every locale |
| Expert bystander guidance | Withheld | Qualified content review required |
| Local semantic retrieval | Actual model execution | docs/evidence/model-benchmark.json; optional runtime |
| Held-out retrieval quality | Not established | Draft in-sample fixtures are not a gold standard |
| Automated axe and responsive checks | Executed | Browser artifacts; manual screen readers pending |
| Physical Android and zoom | Not completed | Browser reflow equivalents only |
| Physical Wi-Fi-off cold startup | Not completed | Browser-offline reload is a narrower test |
| Dependency/security checks | Local reports generated | No independent certification or full license signoff |
| Public repository and remote CI | Not created | Local source only; no public safety approval |
| Partner authorization and handoffs | Disabled | Written permission, agreements, authenticated APIs and trained providers absent |

The missing original RELEASE_GATES.md has been recovered here from the master, not represented as reviewed. See docs/evidence and docs/RELEASE_REPORT.md for measured outcomes and remaining work.
