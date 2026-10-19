# Sakhi design system: public clarity

Updated 2026-10-20 on the founder's explicit direction: pink and black throughout, a short opening screen and one obvious next step. This supersedes Sprint 2's paper/navy/brass palette and long editorial landing. Local brand/script font assets remain.

## Character

Calm, direct public guidance. The opening should explain who it is for and what to do next, without requiring a long read. Rich detail belongs at the point of choice. A visible source and a clear permission boundary create credibility. No false official seals, partner logos, distress photography, generic gradient panels or decorative trust numbers.

## Palette

- Canvas: #FFF4F8, pale pink.
- Raised reading surface: #FFFAFD.
- Sunken supporting surface: #F9E0EB.
- Primary ink and actions: #181216, near black; hover #38232F.
- Secondary ink: #60505A.
- Pink accent: #BE286A for sparse rules; #9F1851 for text and focus on light surfaces.
- Emergency strip: black with pale pink text. Forced-colors mode uses Canvas/CanvasText/LinkText rather than fixed brand colors.
- Borders: #D6BBC7. Honest dashed boundaries only where a documented boundary can be crossed with consent.

The older forest/navy/brass CSS variable names remain compatibility aliases for existing components; their values now belong to this pink/black palette. No separate navy or green theme is rendered.

## Type

Instrument Serif 400/italic for short display headlines. IBM Plex Sans 400/500/600 for reading, navigation and actions. IBM Plex Mono 400 only for source dates, identifiers and status metadata. Faces are self-hosted, with original OFL notices. Indic/Arabic script faces use separately licensed local assets and remain subject to native-language review.

No meaningful text below 14px. Body 17 to 18px, line height 1.65 to 1.8. Controls 16px minimum, 48px target height. Display type scales down to fit 320px without clipping; native scripts use more line height and normal tracking. Do not force English display italics onto long Indic strings.

## Composition

The opening uses a single centered message and primary action, with three privacy facts and small optional friend/example actions. Navigation and honest preview status sit below. At 390x844, the main copy is 40 words and the full opening fits one viewport; this is a layout observation, not a comprehension-study result.

The finder shares the compact header and footer navigation so the current question takes priority over global browsing. Emergency access and session clear remain immediately available. Full source and privacy explanations remain at their relevant decisions and destinations.

Before/concern/after exploration, direct goal choices and the official-source rail live under Prepare & learn. Privacy & trust retains the data-boundary explanation. Responsive working views use one readable primary column and a supporting context panel, becoming a single sequence on phones. No horizontal page scroll; intentional source and comparison scrolling is focusable and labeled. Large text may require more vertical scrolling and must not be compressed to preserve a one-screen target.

Radii: 3px for precise labels, 6px for controls, 10px for main reading panels. Borders establish structure; shadows are scarce. Diagrams are semantic and explanatory, never decorative claims of dispatch or live connectivity.

## Motion and interaction

Short functional transitions only, 160 to 240ms. No automatic crisis-content carousel. The public-pathway rail is manually scrollable, with keyboard controls. Reduced-motion and lite views remain fully functional. A step change focuses the next question. Every external action has destination and data-field preview; emergency dialler access remains immediate.

## Public-benefit voice

Free to use, with no advertising, payment flow, narrative storage or hidden referral. Do not claim legally registered nonprofit status. Explain actual functionality and pending review honestly. Public service links are independent, source-checked entry points, not evidence of a partnership. No service is described as live without an observed authorized response.
