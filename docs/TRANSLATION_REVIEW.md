# Translation and language release

All 16 locales are review_pending. Structural key presence is tested separately from translation accuracy. Each catalog carries content_version, human_review, fallback_keys and direction. English contains all source-backed content; the other shells contain 20 draft translated navigation keys and explicit English entries for the rest. Every non-English selection shows a visible beta/fallback notice. Urdu and Kashmiri use RTL; Konkani uses Devanagari and Kashmiri Perso-Arabic.

No locale may be marketed as verified until a language expert and safeguarding/domain expert review the scoped content, emergency phrases, service labels and fallback comprehension. Record reviewer name, role, date, content hash, approved scope and expiry in a versioned review file. Then update the catalog status only through reviewed changes. Machine translation or a passing key-count check cannot grant signoff.

The synthetic suite has 110 English cases and 20 per other locale. Many are punctuation or prefix variants; the base phrases and expectations were authored by the coding agent, are not held out and have no expert labels. It is regression coverage, not a language benchmark or emergency-reliability guarantee. Add independently authored dialect, romanized and adversarial cases with native reviewers.

Browser automation checks lang/dir, overflow, draft notices and selected RTL axe scans. Manual TalkBack/VoiceOver, script shaping on physical low-end Android and full browser text zoom remain release gates. Native fonts are used to avoid unreviewed font downloads; installed fonts affect shaping.

## October21 capability correction

The canonical registry now contains23 distinct language targets:22 scheduled Indian languages plus English. Seven new shells (Bodo, Dogri, Maithili, Manipuri in Meetei Mayek, Sanskrit, Santali in Ol Chiki and Sindhi in Arabic script) have136 explicit English fallback keys and no translated interface/text capability. The older15 non-English shells retain20 draft labels and116 fallback keys. These counts exclude hardcoded page content. No new23-language retrieval evaluation is claimed.

Every non-English selection displays a compact English-guidance/review-pending disclosure, expandable for actual draft counts and unavailable speech/video interpretation. Native names, script and direction are separate metadata. Sindhi joins Urdu and Kashmiri in RTL. Pinned self-hosted Meetei Mayek and Ol Chiki fonts complement the existing script assets; font loading and screenshots do not approve native shaping or translation.

`node scripts/localisation-inventory.mjs` inventories JSX text and string literals with file/line/hash evidence. Technical literals require classification before translation. The rejected Gemma trial in `evidence/release-2026-10-21/translation-probe-schema.json` mixed unrelated scripts and was not used in product catalogues. The mandatory next step remains scoped, source-preserving translation and independent native/domain/safeguarding review. A feature flag or model draft cannot grant approval.
