# Privacy and data flow

T0 has no account, database of people, evidence upload, GPS, microphone, cloud model or analytics. Choices and text exist only in browser app memory. POST /api/navigate processes text on the same local machine and returns public resources. The SQLite index is in memory and contains public category vocabulary only. Query text is never inserted into it.

Only sakhi.locale is saved in localStorage. Language changes preserve temporary in-memory choices. Clear session drops app state and closes destination previews; refresh drops the narrative. App-controlled state deletion does not erase browser history, downloads, screenshots, OS swap, crash captures, backups or external copies. There is no stealth guarantee.

The versioned service-worker allowlist includes the shell, public resources and build assets. Installation checks each SHA-256 hash. No API request/response, query-string URL, story, private draft or user-created file enters the cache. Hashes provide integrity against accidental corruption, not independent cryptographic publisher authentication. The service worker itself is trusted through the serving origin.

The app requests only its own origin. An external action preview is required for public source and provider websites; it contains no story or form fields. User-opened websites receive normal network information and have their own privacy policies. The emergency tel link is immediately available and uses the device dialler after a user click. Synthetic mode disables outbound links, calls and downloads.

Operators must preserve no-access-log runtime settings, HTTPS, same-origin routing and the CSP. Reverse proxies, hosting access logs, browser extensions and compromised devices can undermine these properties. Public deployment and any private-beta storage require independent security, safeguarding and applicable Indian data-protection review. No legal compliance certification is claimed.
