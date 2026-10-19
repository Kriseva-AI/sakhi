# Privacy and data flow

T0 has no account, database of people, evidence upload, GPS, microphone, cloud model or analytics. Choices and text exist only in browser app memory. POST /api/navigate processes text on the same local machine and returns public resources. The SQLite index is in memory and contains public category vocabulary only. Query text is never inserted into it.

Only sakhi.locale is saved in localStorage. Language changes preserve temporary in-memory choices. Clear session drops app state and closes destination previews; refresh drops the narrative. App-controlled state deletion does not erase browser history, downloads, screenshots, OS swap, crash captures, backups or external copies. There is no stealth guarantee.

The versioned service-worker allowlist includes the shell, public resources and build assets. Installation checks each SHA-256 hash. No API request/response, query-string URL, story, private draft or user-created file enters the cache. Hashes provide integrity against accidental corruption, not independent cryptographic publisher authentication. The service worker itself is trusted through the serving origin.

The app requests only its own origin. An external action preview is required for public source and provider websites; it contains no story or form fields. User-opened websites receive normal network information and have their own privacy policies. The emergency tel link is immediately available and uses the device dialler after a user click. Synthetic mode disables outbound links, calls and downloads.

Operators must preserve no-access-log runtime settings, HTTPS, same-origin routing and the CSP. Reverse proxies, hosting access logs, browser extensions and compromised devices can undermine these properties. Public deployment and any private-beta storage require independent security, safeguarding and applicable Indian data-protection review. No legal compliance certification is claimed.

Sprint 2 adds three deliberate public exports. A public TXT kit contains selected known resources and generic service questions. A WhatsApp draft URL carries only its shown public resource text to WhatsApp after destination approval. A Google Maps search URL carries only the chosen preset city and place type after destination approval. Google or WhatsApp can independently use their own account/device permissions and privacy rules. These actions neither send an authority alert nor create a Sakhi referral.

A public correction proposal can contain contributor-entered public text and an evidence URL. It is held in the page's memory and downloaded only by that person's action; it is not sent to the local server or a maintainer. Files can persist outside Sakhi. No case details should be included. URL syntax checks do not verify truth or publisher authority. Review is mandatory before a proposal affects the public pack.

The offline allowlist now also includes self-hosted public font assets and OFL notices. Maps queries, WhatsApp text URLs and correction files do not enter that cache. Comfort settings and map selections are not saved in localStorage. There is still no geolocation, speech, notification, location-triggered alert or background monitoring implementation.
