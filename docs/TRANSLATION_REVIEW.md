# Translation and language release

All 16 locales are review_pending. Structural key presence is tested separately from translation accuracy. Each catalog carries content_version, human_review, fallback_keys and direction. English contains all source-backed content; the other shells contain 20 draft translated navigation keys and explicit English entries for the rest. Every non-English selection shows a visible beta/fallback notice. Urdu and Kashmiri use RTL; Konkani uses Devanagari and Kashmiri Perso-Arabic.

No locale may be marketed as verified until a language expert and safeguarding/domain expert review the scoped content, emergency phrases, service labels and fallback comprehension. Record reviewer name, role, date, content hash, approved scope and expiry in a versioned review file. Then update the catalog status only through reviewed changes. Machine translation or a passing key-count check cannot grant signoff.

The synthetic suite has 110 English cases and 20 per other locale. Many are punctuation or prefix variants; the base phrases and expectations were authored by the coding agent, are not held out and have no expert labels. It is regression coverage, not a language benchmark or emergency-reliability guarantee. Add independently authored dialect, romanized and adversarial cases with native reviewers.

Browser automation checks lang/dir, overflow, draft notices and selected RTL axe scans. Manual TalkBack/VoiceOver, script shaping on physical low-end Android and full browser text zoom remain release gates. Native fonts are used to avoid unreviewed font downloads; installed fonts affect shaping.
