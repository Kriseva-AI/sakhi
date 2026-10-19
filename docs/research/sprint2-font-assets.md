# Sprint 2 self hosted script font assets

Prepared: 2026-10-19. Scope: ten regular WOFF2 script subsets and their original OFL notices. All font packages are pinned to observed Fontsource version `5.3.0`. No npm dependency or lockfile was changed. The main implementation still needs to import the CSS and include these public assets in its versioned offline cache.

## Selected assets

WOFF2 payload total: **337,296 bytes** (329.4 KiB). Original font licenses: **43,811 bytes**. Ten weight-400 normal subsets cover the scripts used by the current fifteen non-English locales. Latin and Latin Extended, mathematical, symbol, italic, extra weight and variable font files were not copied. System fonts remain the fallback for ASCII, punctuation and text outside the selected script subsets.

| Family and subset                 | Current locales             | WOFF2 bytes | Line height |
| --------------------------------- | --------------------------- | ----------- | ----------- |
| Noto Sans Devanagari / devanagari | hi-IN, mr-IN, ne-IN, kok-IN | 50,416      | 1.8         |
| Noto Sans Bengali / bengali       | bn-IN, as-IN                | 44,352      | 1.85        |
| Noto Sans Telugu / telugu         | te-IN                       | 35,760      | 1.85        |
| Noto Sans Tamil / tamil           | ta-IN                       | 14,552      | 1.8         |
| Noto Sans Gujarati / gujarati     | gu-IN                       | 36,972      | 1.8         |
| Noto Sans Kannada / kannada       | kn-IN                       | 27,736      | 1.85        |
| Noto Sans Malayalam / malayalam   | ml-IN                       | 24,144      | 1.85        |
| Noto Sans Oriya / oriya           | or-IN                       | 39,296      | 1.85        |
| Noto Sans Gurmukhi / gurmukhi     | pa-IN                       | 11,400      | 1.8         |
| Noto Naskh Arabic / arabic        | ur-IN, ks-Arab-IN           | 52,668      | 1.9         |

The upstream family/package is named Oriya. Sakhi continues to call the language Odia. Konkani uses the current Devanagari catalog. `ks-Arab-IN` uses the Arabic selector; a future Devanagari Kashmiri locale would need an explicit font choice.

## Sources and pinned packages

[Fontsource](https://github.com/fontsource/fontsource) packages self-hostable font files. Each selected package identifies [fontsource/font-files](https://github.com/fontsource/font-files) as its repository and [Google Fonts](https://github.com/google/fonts) as its source. The package metadata identifies each font license as OFL-1.1. This is distinct from the Fontsource tooling repository license. Original font copyright and full license text are retained separately for every family.

Tarballs were fetched directly from their pinned npm registry URLs without running package scripts. Each archive was checked against the registry SHA-512 integrity value before selected files were copied. These checks bind the bytes to the retrieved npm metadata; npm signing attestations were not independently verified. No font binaries were modified or re-subsetted.

| Package                                  | Exact metadata                                                                   | Tarball                                                                                                 | Upstream font metadata   |
| ---------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------ |
| `@fontsource/noto-sans-devanagari@5.3.0` | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-devanagari/5.3.0) | [archive](https://registry.npmjs.org/@fontsource/noto-sans-devanagari/-/noto-sans-devanagari-5.3.0.tgz) | v30, modified 2025-09-05 |
| `@fontsource/noto-sans-bengali@5.3.0`    | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-bengali/5.3.0)    | [archive](https://registry.npmjs.org/@fontsource/noto-sans-bengali/-/noto-sans-bengali-5.3.0.tgz)       | v33, modified 2026-01-28 |
| `@fontsource/noto-sans-telugu@5.3.0`     | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-telugu/5.3.0)     | [archive](https://registry.npmjs.org/@fontsource/noto-sans-telugu/-/noto-sans-telugu-5.3.0.tgz)         | v30, modified 2025-09-08 |
| `@fontsource/noto-sans-tamil@5.3.0`      | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-tamil/5.3.0)      | [archive](https://registry.npmjs.org/@fontsource/noto-sans-tamil/-/noto-sans-tamil-5.3.0.tgz)           | v31, modified 2025-09-16 |
| `@fontsource/noto-sans-gujarati@5.3.0`   | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-gujarati/5.3.0)   | [archive](https://registry.npmjs.org/@fontsource/noto-sans-gujarati/-/noto-sans-gujarati-5.3.0.tgz)     | v27, modified 2025-09-16 |
| `@fontsource/noto-sans-kannada@5.3.0`    | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-kannada/5.3.0)    | [archive](https://registry.npmjs.org/@fontsource/noto-sans-kannada/-/noto-sans-kannada-5.3.0.tgz)       | v32, modified 2026-03-03 |
| `@fontsource/noto-sans-malayalam@5.3.0`  | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-malayalam/5.3.0)  | [archive](https://registry.npmjs.org/@fontsource/noto-sans-malayalam/-/noto-sans-malayalam-5.3.0.tgz)   | v29, modified 2025-09-11 |
| `@fontsource/noto-sans-oriya@5.3.0`      | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-oriya/5.3.0)      | [archive](https://registry.npmjs.org/@fontsource/noto-sans-oriya/-/noto-sans-oriya-5.3.0.tgz)           | v35, modified 2026-02-19 |
| `@fontsource/noto-sans-gurmukhi@5.3.0`   | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-sans-gurmukhi/5.3.0)   | [archive](https://registry.npmjs.org/@fontsource/noto-sans-gurmukhi/-/noto-sans-gurmukhi-5.3.0.tgz)     | v29, modified 2025-09-05 |
| `@fontsource/noto-naskh-arabic@5.3.0`    | [pinned JSON](https://registry.npmjs.org/@fontsource/noto-naskh-arabic/5.3.0)    | [archive](https://registry.npmjs.org/@fontsource/noto-naskh-arabic/-/noto-naskh-arabic-5.3.0.tgz)       | v44, modified 2026-01-28 |

The machine-readable [asset manifest](../../apps/web/public/fonts/indic/manifest.json) records package, exact source URLs, attribution, upstream metadata, archive integrity, selected subset, glyph counts, coverage and hashes. Source labels above are package metadata, not a claim that each file matches the newest upstream Noto release.

## Asset hashes

Paths below are relative to `apps/web/public/fonts/indic/`. Each license is an unchanged copy of its corresponding package `LICENSE`.

| File                                                                    | Bytes  | SHA-256                                                            |
| ----------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| `noto-sans-devanagari/noto-sans-devanagari-devanagari-400-normal.woff2` | 50,416 | `f86f14cbd1004f5795689ee9cc70d5d87d915f5135b30283525c1c7b8f0eb192` |
| `noto-sans-devanagari/OFL.txt`                                          | 4,384  | `79c44862256af9a67fc23df7c45ae289e730c7f6d4f8fb8ef593bd3c314b6d6d` |
| `noto-sans-bengali/noto-sans-bengali-bengali-400-normal.woff2`          | 44,352 | `adb805ae2eb639cc5d7276ee0e3798a8092fbfe02a6e5a0e19d82587680b528c` |
| `noto-sans-bengali/OFL.txt`                                             | 4,381  | `c0d17a4a6f928d78749dbebfa9d2953b6086c2a1f64cdd1e450cc77fb8199b32` |
| `noto-sans-telugu/noto-sans-telugu-telugu-400-normal.woff2`             | 35,760 | `98b86e85da4f346bad6585b1e8b695696e38d002ed0e874da26c762f488f3d57` |
| `noto-sans-telugu/OFL.txt`                                              | 4,380  | `eacb6e3b470b5894f81fa7091663983068a391ad1741f868e70b131051ad48ea` |
| `noto-sans-tamil/noto-sans-tamil-tamil-400-normal.woff2`                | 14,552 | `6b240e875a16a2e0c1c918f9927531c3bf27874768bdaef9f204da88270275c8` |
| `noto-sans-tamil/OFL.txt`                                               | 4,379  | `8127ad10afbdf273676361de0b3a486e1c30ac5711458309b2cbb51a4a7ea8cb` |
| `noto-sans-gujarati/noto-sans-gujarati-gujarati-400-normal.woff2`       | 36,972 | `6490241c73f384a2462c13ce37381aa836c59a3e5b303d21a39eb52ed4d9a1d7` |
| `noto-sans-gujarati/OFL.txt`                                            | 4,382  | `b31f1c1cece80ac67ece3e29678436faead9924b08674cd17e4447b2d64e2a00` |
| `noto-sans-kannada/noto-sans-kannada-kannada-400-normal.woff2`          | 27,736 | `34bf66abc80e683d140f2109f703a546662f932a285ee4ef69cf4462e6df34dd` |
| `noto-sans-kannada/OFL.txt`                                             | 4,381  | `9c599f3447330d7339871ffeb177d9f4c87a5bf4ead932b8705ae055990adf96` |
| `noto-sans-malayalam/noto-sans-malayalam-malayalam-400-normal.woff2`    | 24,144 | `4b0f383b9ebf2e7ecc82a06dc5e40efec4bd6d7a4f1a090652028ab856412dfe` |
| `noto-sans-malayalam/OFL.txt`                                           | 4,383  | `29b7a0d250007948e23d1d2c734fdcf0bf6c3e278c98d6ad2c7c6bb9fedbd11c` |
| `noto-sans-oriya/noto-sans-oriya-oriya-400-normal.woff2`                | 39,296 | `7a8423c635edff22719ec5ec3e49cb2e9dfa048011b1b1f7b2295b15beac57b9` |
| `noto-sans-oriya/OFL.txt`                                               | 4,379  | `939d6db1ffc18f9c6bfd51e7dd660772cd1244a2e96a183b8f1eec72cedb05a8` |
| `noto-sans-gurmukhi/noto-sans-gurmukhi-gurmukhi-400-normal.woff2`       | 11,400 | `a66c5f026e9dec312d62e65328b0522efd0235e10f1b36a72e5b803f459f56d2` |
| `noto-sans-gurmukhi/OFL.txt`                                            | 4,382  | `f8712907be9e05ad0461ea8af2417851ffc0da41c40ec623052883ea84c4a2c9` |
| `noto-naskh-arabic/noto-naskh-arabic-arabic-400-normal.woff2`           | 52,668 | `9cc2d2e90f7b51904468558b4ed529de8a8206497c8edb5e33122bd077e0158c` |
| `noto-naskh-arabic/OFL.txt`                                             | 4,380  | `91053c23e8a0fe5fc9b5fdbe5ff74ceffd66f6f996c123f1a6ca4c23487c1fff` |

## CSS behavior and integration

[indic-fonts.css](../../apps/web/src/indic-fonts.css) contains ten `@font-face` rules with only same-origin `/fonts/indic/...` WOFF2 URLs. Every face is weight 400, normal, and `font-display: swap`. The original subset Unicode ranges prevent unnecessary loading for unrelated scripts. No `local()` font lookup, remote import, CDN, preconnect or remote font URL is used.

Language selectors choose the font for text carrying or inheriting its supported `lang`, set body/display variables, restore normal tracking, and use line heights from 1.8 to 1.9. They do not set direction or translate content. `font-synthesis: weight` permits the browser to synthesize requested heavier weights from the one regular face; synthetic italics are not enabled. No evidence currently justifies the added payload of true heavier faces. Review synthesized bold before deciding otherwise.

Import this stylesheet after the main styles. Keep English fallback blocks explicitly tagged `lang="en-IN"`. Existing system fallbacks handle Latin inside a mixed-script block. Do not preload all ten fonts. First use of a script normally loads only its associated subset; caching every subset for offline language switching is a separate product/byte-budget decision. The stylesheet has not been wired into App, shared styles or build scripts by this asset task.

## Arabic and Kashmiri assessment

Noto Naskh Arabic was selected as the compact upright UI face for Urdu and Arabic-script Kashmiri. Its Arabic weight-400 subset is 52,668 bytes, compared with 159,368 bytes for the inspected `@fontsource/noto-nastaliq-urdu@5.3.0` Arabic weight-400 subset. Both contain GSUB and GPOS shaping tables and the Arabic codepoints found in the current Urdu and Kashmiri catalogs. Naskh is a typography choice pending native review, not a claim of preferred or superior Urdu/Kashmiri reading quality. The unselected Nastaliq asset was kept only in the temporary assessment folder.

A fontTools 4.60.2 cmap inspection found the following seven probe codepoints in both inspected Arabic fonts: `U+0620`, `U+065F`, `U+0672`, `U+0673`, `U+06CD`, `U+06EE`, `U+06EF`. The selected Naskh subset has 1,225 cmap entries. A cmap entry and shaping tables do not prove correct contextual forms, diacritic placement, linguistic coverage or readability. The probe is finite, and Kashmiri catalog text remains a draft.

## Checks actually run

- All ten copied WOFF2 files were parsed successfully with fontTools. Each contains GSUB and GPOS tables.
- The distinct codepoints in each catalog within its primary script block were compared with its selected font cmap. No missing script codepoints were found for the current fifteen non-English catalogs. This does not test every Unicode character or an independent corpus.
- An isolated headless Chromium 156.0.8078.4 specimen at 320 CSS pixels loaded the ten local faces and showed the expected custom font for eleven script samples, including Assamese-specific letters and both Arabic locales. No horizontal overflow was observed in that specimen.
- Chromium received ten WOFF2 requests, all fulfilled from the selected local files. Zero external requests occurred. Heavier specimen headings used the regular asset through browser synthesis.
- The specimen was not the integrated app and was not a human shaping, font preference or accessibility review. FontTools and its parsing dependencies were installed only into this task's temporary directory, not Sakhi's package/runtime environments.

| Locale     | Distinct current catalog script codepoints | Missing from selected cmap |
| ---------- | ------------------------------------------ | -------------------------- |
| hi-IN      | 41                                         | 0                          |
| mr-IN      | 43                                         | 0                          |
| ne-IN      | 46                                         | 0                          |
| kok-IN     | 39                                         | 0                          |
| bn-IN      | 41                                         | 0                          |
| as-IN      | 42                                         | 0                          |
| te-IN      | 38                                         | 0                          |
| ta-IN      | 30                                         | 0                          |
| gu-IN      | 41                                         | 0                          |
| kn-IN      | 38                                         | 0                          |
| ml-IN      | 45                                         | 0                          |
| or-IN      | 44                                         | 0                          |
| pa-IN      | 39                                         | 0                          |
| ur-IN      | 31                                         | 0                          |
| ks-Arab-IN | 39                                         | 0                          |

## Remaining limits

Native language, safeguarding and typography signoff remain pending for every locale. Physical Android/iOS rendering, browser zoom, screen-reader interaction, app-wide reflow, cold-font layout shift, font failure behavior, integrated offline loading and the final hashed cache require checks after integration. Latin fallback can vary by operating system. Single-weight synthesis is a payload tradeoff and may need true heavier faces if reviewed samples lose distinction. Local font files remove runtime font CDN requests; they do not hide browsing history, app installation or other device activity.

No claims of verified language quality, comprehensive Kashmiri coverage, accessibility conformance or integrated offline readiness are made by this asset receipt.
