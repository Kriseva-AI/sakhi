# Sakhi Sprint 2: services, products and testable opportunities

Research date and access date for every external source below: **2026-10-19**. Scope: public primary sources, provider documentation and publisher-authored app listings. No accounts, installations, calls, messages, complaint submissions, personal location searches or private crime data were used.

**Recommendation, an inference:** build a source-backed preparation and support-navigation experience across prevention, uncertainty and recovery. The useful gap is understanding what a service does, what using it involves and what can happen next. Prioritize that gap before GPS, automated alarms, evidence storage or provider automation. This is a product hypothesis, not evidence that Sakhi improves safety or that competitors lack these capabilities.

## Evidence standard and current Sakhi boundary

- **Observed:** a public page, published document or app listing contains the stated feature or rule. This is documentary observation, not an operational service test.
- **Claimed:** a provider describes its own capability or benefit. No crime-prevention, response-time or survivor-outcome claim is adopted as proven.
- **Inference:** an opportunity derived from those observations and Sakhi's local limits.
- **Validation required:** named domain, language, accessibility, security or institutional review is still needed. This research does not approve a critical contact or translation for production.

Local baseline was read from [README](../../README.md), [SAFETY](../SAFETY.md), [PRIVACY](../PRIVACY.md), [AGENTS](../../AGENTS.md), the master prompt and progress file. It was not independently retested during this research.

| Current capability | Documentary local state | Consequence for Sprint 2 |
| --- | --- | --- |
| Anonymous adult discovery, minimal choices, local lexical retrieval, 112 CTA, explicit minor stop | Functional locally per README; finite phrase rules can miss unsupported wording | Preserve direct help before retrieval and allow exploration without a story |
| Seven public entry points, dates, expiry and official-domain preview | Agent-curated; zero human production approvals | More entries alone do not solve preparation, suitability or comprehension |
| Public-only offline cache, general resource cards, lite view, synthetic mode | Browser-tested per README; physical cold offline gate not observed | Reusable public learning packs are feasible; offline provider availability is not |
| Sixteen locale shells | All human review pending; most non-English text is explicit English fallback | Measure reviewed journey comprehension, not language-selector count |
| Vaults, narratives, private drafts, timelines, uploads, GPS, microphone and reminders | Not available in T0 | Richer public checklists and fictional rehearsal can add depth without private storage |
| Provider handoff, appointments, submissions, receipt/status integration | Disabled or partner-gated | External links remain user actions; no accepted referral or complaint state may be inferred |

## Official pathways: important differences to explain

| Pathway and primary evidence | Observed public scope | Design implication and limit |
| --- | --- | --- |
| [ERSS / 112](https://112.gov.in/) and [official FAQ](https://112.gov.in/faq) | Emergency requests for police, fire and health; documentation describes phone and other channels. The 112 India app describes SHOUT alerts to registered nearby volunteers as well as the emergency centre. | Keep the direct dial option. Do not recreate a volunteer-dispatch network or claim that app channels work uniformly in every jurisdiction. Direct page fetches timed out here; indexed official text was available. No reachability or dispatch test occurred. |
| [Women Helpline 181](https://wcd.gov.in/women/help) | Information and support, emergency referral to ERSS, non-emergency links including OSCs. Someone may call on a woman's behalf. The FAQ permits anonymity but describes a safety-related exception to confidentiality. It explicitly excludes West Bengal from current operational coverage. | Separate information-seeking from emergency response. Explain source-specific disclosure limits; do not say every official service is anonymous. Preserve the West Bengal exception and a national fallback. |
| [One Stop Centre scheme](https://www.wcd.gov.in/offerings/one-stop-centre-scheme) | Medical, legal, police, temporary shelter and psychological/counselling support. The FAQ describes a maximum five-day temporary stay and child-specific coordination. | Show support categories as separate options. Do not promise a shelter bed, appointment or local capacity. Family eligibility and procedures need careful source review, rather than an undifferentiated “shelter available” badge. |
| [MWCD parliamentary answer, 5 August 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1) | Reports 991 operational OSCs out of 1,033 approved using data through 30 June 2026. It separately reports 661 OSCs integrated with Women Helpline. | The national total is not a current contact directory, API or proof that every centre participates in the same referral workflow. Sakhi still has zero individually sourced centre records in its baseline. |
| [National Cyber Crime Reporting Portal FAQ](https://cybercrime.gov.in/Webform/FAQ.aspx) and [MHA financial-fraud portal](https://mrm-ncrp.mha.gov.in/restoration/) | The FAQ separates reporting categories and describes a narrowly scoped anonymous route for specified sexual content; it is not blanket anonymous reporting for all online harassment. The MHA portal labels 1930 for financial fraud. | Distinguish impersonation, image abuse and financial fraud. Explain the relevant reporting route and identity prompts before handoff. Direct cybercrime FAQ fetch failed; indexed official content needs human recheck before translating detailed procedures. |
| [NCW complaints FAQ](https://ncwapps.nic.in/onlinecomplaintsv2/frmFAQs.aspx) and [NCW contact page](https://ncwapps.nic.in/frmContactUS.aspx) | NCW scrutinizes mandate, has exclusions including anonymous complaints, and requires complainant contact details. Accepted complaints receive identifiers for tracking. The contact page lists 14490 as a 24x7 violence-against-women helpline. | A portal visit, a submission, acceptance and action taken are different states. Show mandate and disclosure expectations without predicting eligibility or success. The FAQ's office-hours information concerns a different contact context; do not collapse it into the 14490 service. |
| [NALSA FAQ](https://nalsa.gov.in/faqs/) | Women may apply for free legal aid irrespective of income. Consultation alone is possible without pursuing a court case. Routes include the relevant legal-services institution, online and other channels; 15100 is listed. Grant of representation has institutional scrutiny. | A useful pathway is “understand legal options first”. Avoid an income filter that incorrectly hides this route from women. Sakhi cannot promise appointment, representation or outcome. |
| [SHe-Box official government description, February 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227349&lang=1&reg=3) | Workplace sexual-harassment complaint filing, forwarding to the concerned Internal or Local Committee, status tracking and committee information are described. | Explain the intended recipient and process before a user enters the separate portal. No automated filing, committee completeness or live acceptance is established. The Mission Shakti root returned 403; no authenticated process was examined. |

An official source can itself contain older material. The live OSC page still links a “770 functional” document while the later parliamentary answer reports 991. Preserve each document's date and purpose. Do not silently replace a dated count with a new denominator or call an older directory current.

## State initiatives: patterns worth learning from

These are jurisdiction-specific public services, not Sakhi partners. Their stated aims and throughput are not controlled evidence of effectiveness.

| Initiative | Primary-source observation | Transferable idea and boundary |
| --- | --- | --- |
| Telangana [SHE Module](https://womensafetywing.telangana.gov.in/she-module/) | Police documentation describes issue-specific support and a Telugu/English/Urdu QR complaint route. Its WhatsApp channel is explicitly non-emergency. Indexed text was available; direct fetch returned 502. | Clearly label channel purpose and jurisdiction. A QR can open a public, nonsensitive language pack; it should not quietly submit a case or suggest emergency monitoring. |
| Telangana [Bharosa Society](https://womensafetywing.telangana.gov.in/bharosa-society/) | Describes integrated police, medical, legal, psychological and rehabilitation services, with professional case workers. Indexed official content was available; direct fetch failed. | Recovery is a set of human services beyond complaint filing. Build explanations and a maintained referral map before claiming handoff continuity. |
| Gujarat [Abhayam 181](https://wcd.gujarat.gov.in/initiativedetails?id=280) | Gujarati official page describes information, guidance, counselling and rescue support statewide; no income limit, and women visiting from another state may use the service. | Coarse current jurisdiction can matter more than domicile. Public navigation should not assume a local identity document is always needed. The English interpretation here needs native-language and service review before use in product copy. |
| Uttar Pradesh [Women and Child Security Organization / WPL 1090](https://uppolice.gov.in/article/en-about-us-mahila-samman-prakostha) | Official description covers calls, social media harassment, stalking and domestic violence and describes a police-led response process. | Show specialized non-emergency options alongside national routes where supported. Do not transplant the number nationally or imitate police contact with alleged offenders. |

## Eight product comparisons

“Available” below means a public product page, web tool or publisher listing was discoverable on the research date. Installation, India-specific store eligibility, permissions, paid-plan behavior and response operations were not tested. Publisher descriptions establish a feature claim, not its reliability or effectiveness.

| Product | Availability and claimed capability from primary sources | Evidence limit and relevant lesson |
| --- | --- | --- |
| **My Safetipin** | [Official app help](https://safetipin.com/my-safetipin-app-help/) describes public-space audits, infrastructure/perception-based scores and a route feature. It explicitly says the app cannot help in immediate danger. [Official site](https://safetipin.com/) describes the public app as free; Nite is a separate partner app. | An infrastructure score is not an individual crime prediction. Learn from structured community observations and clear scope. Sakhi should not call a route safe or infer low risk from missing reports. |
| **Safecity / Red Dot Foundation** | [Working public web page](https://webapp.safecity.in/) presents anonymous incident and safety-tip submissions, maps and languages. [Provider privacy policy](https://webapp.safecity.in/privacy_policy) discusses device/network information even for anonymous reports and possible use of aggregated reports with institutions. | Anonymous narrative submission does not mean zero data collection. Crowd reports are self-selected observations, not a population risk denominator or an official police complaint. Learn community accountability through reviewed, nonsensitive contributions. |
| **bSafe** | [Publisher Google Play listing](https://play.google.com/store/apps/details?id=com.bipper.app.bsafe&hl=en) lists SOS/voice activation, guardian live location, streaming, audio/video recording, Follow Me and fake call; it shows in-app purchases. [Provider page](https://getbsafe.com/how-it-works) is discoverable but returned no extractable body. | The listing's crime-prevention language is marketing, not outcome proof. Guardian readiness, permissions, network, cost and false alarms need testing. These capabilities would materially change Sakhi's threat model and are not a small T0 enhancement. |
| **MyAmbar** | [Vodafone Foundation publisher listing](https://play.google.com/store/apps/details?id=com.app.myambar) describes a free support app: information, self-assessments, helplines, emergency contacts, service discovery and recovery resources. It states that it supplements professional services. [Nasscom Foundation](https://www.nasscomfoundation.org/techforgood) still identifies it in its programme portfolio. | Strong inspiration for a journey extending into recovery. Listed service verification is the provider's claim. Indexed and opened store views differed on update date and deletion fields, so this memo makes no definitive privacy/deletion or version claim. No current functionality was installed or tested. |
| **Bright Sky UK / Hestia** | [Current Hestia page](https://www.hestia.org/brightsky) describes a free app and website for users, friends, relatives and colleagues: recognition information, support discovery, conversation prompts and a journal that sends to a chosen email address. [Directory criteria](https://www.hestia.org/about-the-bright-sky-service-directory) require suitable support scope, self-referral and training/accreditation. | UK service and legal content is not an India referral pack. Learn audience-specific journeys and explicit admission criteria for directory entries. Emailing a journal creates external copies; do not copy this workflow under a local-only privacy promise. |
| **Hollie Guard** | [Official site](https://hollieguard.com/) describes shake/panic activation, journey/meeting tools, recording and paid professional monitoring. [Publisher store listing](https://play.google.com/store/apps/details?id=com.mm.hollieguard) is public and describes contact alerts and the Extra service. | UK monitoring and police escalation cannot be assumed in India. Institutional monitoring requires trained operations, agreements and observable receipts. Downloads, endorsements and testimonials do not establish reduced violence. |
| **StopNCII / SWGfL** | [How it works](https://stopncii.org/how-it-works/) describes local generation of image/video hashes and transfer of hashes rather than imagery to participating platforms. [FAQ](https://stopncii.org/faq/) permits worldwide use by the depicted person, covers adult imagery and describes deepfakes and other limits. | It cannot remove content across the whole internet or cover encrypted messaging. Eligibility and age in the image matter. Sakhi can explain and link to the tool without accepting, hashing or retaining intimate files itself. |
| **Take It Down / NCMEC** | [Official service](https://takeitdown.ncmec.org/) offers a free hash-based tool for sexual imagery taken when the person was under 18, including when the person is now an adult. It explicitly says not to obtain or share files to use it; only existing device files are used. | Limited to participating public/unencrypted platforms; no universal removal promise. Current user age alone is insufficient for image-abuse routing. Any minor-facing expansion needs specialist approval and cannot reuse Sakhi's adult intake. |

The [Safety Net Project's app-selection guidance](https://www.techsafety.org/choosingapps), written by a specialist survivor-technology programme, reports app-test failures and highlights location, message, evidence and device risks. This supports a conservative engineering position: feature presence is not dependable assistance, and technology should complement expert human support. It is US-oriented guidance, not an Indian legal or helpline source.

## Underserved needs to test

These are **inferences from the reviewed material**, not prevalence findings or established competitive white space:

1. Understanding options without identifying an offence, disclosing a detailed story or deciding to file a complaint.
2. Knowing the difference between emergency response, information, counselling, legal consultation, complaint registration and representation.
3. Seeing disclosure, jurisdiction and process expectations before leaving a navigator for another service.
4. Navigating recovery as selectable needs, including support for a friend, rather than a forced police-first funnel.
5. Public resources that explain their freshness and coverage honestly, including source conflicts and unavailable details.
6. Finding human-reviewed language and accessibility information instead of assuming a translated interface means the destination provides that language or accommodation.
7. Community participation that improves services without requiring public disclosure of a survivor's experience.

## Sixteen evidence-informed feature hypotheses

All are proposals. “T0 candidate” means compatible with no private persistence, not approved for public release. Existing safeguarding, language and security gates still apply.

| ID | Observed basis | Inference / proposed experience | Required validation and useful acceptance signal |
| --- | --- | --- | --- |
| H01 | 181, OSC, NALSA and NCW have different roles | **Support chooser:** compare “information”, “someone to speak with”, “legal consultation”, “complaint route” and “urgent help”, using a few plain-language cards | T0 candidate. Indian safeguarding practitioner and lawyer review. In moderated fictional tasks, users can explain the next service's role and whether Sakhi has contacted it. |
| H02 | Bright Sky and MyAmbar include recognition information | **Something feels wrong:** reviewed examples of concerning behavior and available support, with “I do not want to label it” | T0 candidate. Survivor-informed and domain review; no diagnosis or personal danger score. Test that an ambiguous scenario can reach general options without forced disclosure. |
| H03 | NALSA permits consultation without a court case | **Understand first:** a distinct route for someone who wants general legal information or consultation before deciding what to do | T0 candidate. Legal-services review. Test that income and readiness to complain never incorrectly hide the women’s legal-aid route. |
| H04 | NCW needs identity/contact details; 181 and cybercrime anonymity have different rules | **Before you open:** resource-specific explanation of purpose, potential information requested, confidentiality limits and destination | T0 candidate. Verify against current public forms without submitting. Test that users do not infer anonymity transfers from Sakhi to the external service. |
| H05 | OSC and Bharosa describe several support disciplines | **After something happened:** independently selectable medical/support-service, counselling, legal and reporting discovery | T0 candidate for generic information only. Indian medical, safeguarding and legal review. No home treatment, forensic evidence instructions or mandatory sequence. Test easy switching and skipping. |
| H06 | Safecity and SHE Teams offer public-space/community approaches | **Preventive learning pack:** reviewed rights, digital-privacy and public-support literacy with fictional situations, openable offline | T0 candidate. No surveillance or prediction. Experts and disability/language reviewers approve each module; test recall of service scope rather than “crime prevented”. |
| H07 | Gujarat guidance permits visiting women; 181 has a state exception | **Coarse current-place selector:** state or optional district, with a skip route and visible jurisdiction reasons | T0 candidate only when each result has individual provenance. Native-language and local-service review. No GPS, home address or location history; test visitors and West Bengal. |
| H08 | Bright Sky maintains directory admission criteria | **Provider quality passport:** service scope, eligibility, self-referral method, source age, language evidence, accessibility evidence and unknown fields | T0 schema candidate. Initial district pilot requires human contact approval through a separately authorized process. Unknown must stay unknown; link health cannot award a trust badge. |
| H09 | StopNCII and Take It Down differ by age when imagery was made | **Image-abuse options explainer:** separate platform reporting, the relevant specialist tool and Indian public help | T0 candidate only after specialist approval. Never request imagery. Synthetic tests include an adult whose image was made under 18 and a friend asking on someone else's behalf. |
| H10 | NCW distinguishes scrutiny, acceptance and tracking | **What this status means:** public explanation of opened, prepared, user reports submitted, accepted and action recorded | T0 literacy candidate; any private reference tracker remains T1. Legal review and fictional comprehension tests. No provider acknowledgement may originate from Sakhi inference. |
| H11 | Bright Sky supports friends and workplace colleagues | **Help a friend without their details:** reviewed conversation openings and choice-respecting public resources | T0 candidate after trained bystander review. No identifying fields, confrontation prompts or pressure to disclose/report. Test that the friend retains decision control. |
| H12 | Safety Net identifies risks in messages and app-held evidence | **Private-action preview:** explain the footprints of downloading, copying, printing or opening before the user chooses | T0 candidate with expert/security review. No “invisible” or “untraceable” claims. Test that cancelling leaves no app-created draft or download. |
| H13 | Many products depend on contacts, permissions or monitoring | **Practice with a fictional example:** rehearse finding and comparing resources, with all outbound actions disabled | Extend the existing synthetic mode. Test mistaken beliefs explicitly: no real contact, dispatch, appointment or report occurred. Never test emergency apps by generating real alarms. |
| H14 | Official counts, directory material and app listings can conflict | **Resource uncertainty receipt:** separate source publication date, checked date, human review, contact verification and partner status | T0 candidate. Maintainer source-review protocol and conflict fixtures. UI must preserve competing dated claims and avoid calling an untested provider live. |
| H15 | SHE QR journeys and Bright Sky public assets lower discovery friction | **Campus/workplace public pack:** nonsensitive QR cards linking to a reviewed language/jurisdiction pack, usable by anyone | T0 candidate. Institution and safeguarding review before branded distribution. No hidden analytics, public case form or implication of campus/NGO partnership. |
| H16 | Source corrections and specialist directory criteria support maintenance | **Community verification queue:** structured public-source corrections, language review and accessibility observations, all moderated | T0 governance candidate. No personal cases in issues. A named reviewer approves critical changes; test rollback, expiry and disputed-source handling. |

Recommended first slice: H01, H04, H05, H10 and H13 as one coherent fictional journey, with H14 supporting every card. These make the post-incident experience deeper without creating a private case-management system. H02, H06 and H11 require expert-authored content before release. H07/H08 should start with a small sourced locality pilot, not a fabricated national directory.

## Public-benefit positioning and community

**Proposed wording:** “An open, source-backed way to understand support options in India, prepare for the next step and remain in control of what you share.” “Preventive” should mean awareness, readiness and public-resource literacy. It must not mean that Sakhi predicts or prevents violence.

The community contribution is a maintained public resource: versioned sources, reviewed language, accessible navigation and honest correction history. Universities, women-led organisations, legal-aid practitioners and disability advocates are potential reviewers or pilot collaborators, not existing partners. Invite contributions through bounded public tasks, not public survivor stories, peer crisis chats, suspect reports or unmoderated safety tips.

Measure fictional-task comprehension, task completion, source freshness, correction turnaround, accessibility and reviewed language coverage. A contact click is intent, not a successful referral; a source fetch is not service availability; a download is not a safety outcome. Real survivor research needs a separate expert-led ethics and safeguarding protocol with voluntary recruitment and minimal data.

## Source register

All accessed **2026-10-19**. “Indexed” means search-retrieved text from the named primary publisher; it is weaker than a successful direct page read. HTTP/tool failures describe this research environment, not a conclusion that a service is down.

| ID | Exact primary URL | Source / observation status |
| --- | --- | --- |
| S01 | https://112.gov.in/ | Government ERSS; indexed official text; direct timeout |
| S02 | https://112.gov.in/faq | Government FAQ; indexed official text; direct timeout |
| S03 | https://wcd.gov.in/women/help | MWCD; direct page read |
| S04 | https://www.wcd.gov.in/offerings/one-stop-centre-scheme | MWCD; direct page read; older linked directory title observed |
| S05 | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1 | MWCD parliamentary answer; direct page read; published 2026-08-05 |
| S06 | https://cybercrime.gov.in/Webform/FAQ.aspx | Government NCRP; indexed official FAQ; direct fetch error |
| S07 | https://mrm-ncrp.mha.gov.in/restoration/ | MHA/I4C public page; indexed official financial-fraud label |
| S08 | https://ncwapps.nic.in/onlinecomplaintsv2/frmFAQs.aspx | NCW; direct page read |
| S09 | https://ncwapps.nic.in/frmContactUS.aspx | NCW; indexed official contact text |
| S10 | https://nalsa.gov.in/faqs/ | NALSA; direct page read; questions 11, 14, 16 and 17 particularly relevant |
| S11 | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227349&lang=1&reg=3 | MWCD; indexed 2026 description of SHe-Box |
| S12 | https://missionshakti.wcd.gov.in/ | Government portal; direct 403; no booking or live workflow validated |
| S13 | https://womensafetywing.telangana.gov.in/she-module/ | Telangana Police; indexed text; direct 502 |
| S14 | https://womensafetywing.telangana.gov.in/bharosa-society/ | Telangana Police; indexed text; direct fetch error |
| S15 | https://wcd.gujarat.gov.in/initiativedetails?id=280 | Gujarat WCD; direct Gujarati page read; interpretation requires language review |
| S16 | https://uppolice.gov.in/article/en-about-us-mahila-samman-prakostha | UP Police; direct page and indexed main text |
| S17 | https://safetipin.com/my-safetipin-app-help/ | Provider help; direct page read |
| S18 | https://safetipin.com/ | Provider site; indexed public app and partner-app distinction |
| S19 | https://webapp.safecity.in/ | Provider public web app; direct page read; no submissions |
| S20 | https://webapp.safecity.in/privacy_policy | Provider privacy policy; indexed text |
| S21 | https://play.google.com/store/apps/details?id=com.bipper.app.bsafe&hl=en | Publisher-authored store description; indexed listing |
| S22 | https://getbsafe.com/how-it-works | Provider page; indexed feature text; no direct extractable body |
| S23 | https://play.google.com/store/apps/details?id=com.app.myambar | Publisher listing; direct and indexed views differ on metadata |
| S24 | https://www.nasscomfoundation.org/techforgood | Programme operator; indexed MyAmbar portfolio mention |
| S25 | https://www.hestia.org/brightsky | Provider; direct read; page updated 2026-01-09 |
| S26 | https://www.hestia.org/about-the-bright-sky-service-directory | Provider directory admission criteria; indexed text; dated 2020 |
| S27 | https://hollieguard.com/ | Provider claims and current paid-monitoring distinction; indexed text |
| S28 | https://play.google.com/store/apps/details?id=com.mm.hollieguard | Publisher-authored store description; indexed listing |
| S29 | https://stopncii.org/how-it-works/ | Service operator; direct page read |
| S30 | https://stopncii.org/faq/ | Service operator; direct page read |
| S31 | https://takeitdown.ncmec.org/ | NCMEC service; direct page read |
| S32 | https://www.techsafety.org/choosingapps | NNEDV Safety Net specialist guidance; direct page read |

No source in this register establishes a Sakhi partnership, approved API, current telephone reachability, guaranteed outcome or permission to copy third-party product content. Re-author short, reviewed explanations with citations; do not transplant assessments or safety plans without permission and local expert validation.
