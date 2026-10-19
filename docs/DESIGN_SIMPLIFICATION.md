# Simple pink and black experience

Founder direction, 2026-10-20: the opening screen is too dense. Make the purpose and next action apparent in three to four seconds; use pink and black throughout. This direct request supersedes the previous corporate paper/navy/brass palette and long landing-page composition. It authorizes implementation of this reversible design change without another approval round.

Chosen approach: a short typographic opening with one primary action, one optional friend-help action, three plain privacy facts and compact navigation below. A dashboard would keep the current decision load; hiding essential information behind a decorative splash would weaken trust. The short service entrance keeps emergency access and honest preview status visible while moving detailed learning, context and source exploration to Prepare & learn. Privacy remains a direct destination.

Message: Support for women. One clear next step. Explain that this is a free guide to public support in India; do not imply a staffed service or a dispatched response. The primary action opens the existing goal-led finder. No narrative is requested on the opening page. The fictional example remains available as a smaller action.

The finder uses the same compact header and footer navigation. Its first question must start above 320 CSS pixels on a 390x844 view. A RED regression measured the previous header at 412.9px; this extra navigation/status height is removed while emergency access, text size, language and session clear remain available.

Palette: pale pink canvas, near-black text and actions, deeper pink accents with readable contrast. Existing locally hosted fonts and script fallbacks remain. Apply shared tokens and semantic status surfaces across all routes, including dialogs, forms and cards. Use restrained borders, ample reading space and no animation, partner logos or decorative safety claims.

Implementation sequence:

1. Add a failing acceptance test for short main copy, a visible primary action at phone size and the pink/black palette.
2. Replace the long landing; move context/goal and public-source exploration to the learning destination; simplify home header/footer and theme every existing view.
3. Update navigation regressions for the intentional placement changes, retain safety/privacy/offline invariants, run make verify and make quality, rebuild the owned Docker preview, inspect real phone/tablet/desktop/RTL images and record results.

Acceptance: the normal 390x844 opening needs at most a small viewport of scrolling, its main content has at most 60 words, and the primary button is initially visible. This is an engineering proxy for clarity, not proof of three-second comprehension. Large text must reflow even when that requires more scrolling. No new service integration, permission, storage or external action is introduced. All previous human public-release gates remain open.
