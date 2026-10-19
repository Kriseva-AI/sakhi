# Privacy and data flow

Sakhi has no account, people database, evidence upload, microphone, cloud model or analytics. Support choices and optional words exist in browser app memory. POST /api/navigate processes them on the owned local server, without saving or logging the text. The SQLite index contains public category vocabulary only. Synthetic mode disables live lookups, geolocation, calls, external opens and downloads.

Only sakhi.locale is stored in localStorage. Clear session cancels or invalidates pending work, drops app state, closes previews and ends page reminders. Leaving the travel page also ends its reminder. This cannot erase browser history, HTTP tile caches, downloads, screenshots, OS backups, clipboard contents or external providers' records. There is no stealth or erasure guarantee for those systems.

## Optional travel tools

Nothing contacts an outside provider at startup. Opening Public places alone does not request location or load external data. Each service has its own explicit action and visible disclosure:

| Action | Data sent | Recipient and retention boundary |
| --- | --- | --- |
| Load live map | Browser IP, origin-only referrer and tile areas viewed | tile.openstreetmap.org. Browser HTTP caching follows OSM headers. No offline tile package or background prefetch. |
| Search cities | Typed city text goes only to the local Sakhi POST endpoint; local matching uses3,783 public GeoNames records. An unambiguous exact match sends only its known public city ID onward. | Open-Meteo geocoding receives the city ID and server network metadata. Unknown text is not forwarded. Prefix matches use the local gazetteer. No personal address search. |
| Search mapped places | Selected public map centre,2 km radius and one of four fixed categories | Overpass, through the local server. No story or device position. Public records and opening/contact/accessibility tags are not independently verified. |
| Calculate route | Chosen public points and walking/driving mode | FOSSGIS OSRM, through the local server. Its operator says route requests are logged. No raw device position, live traffic or personal danger score. Exact points can be inspected before requesting. |
| Load conditions | Chosen public city centre, rounded to two decimals | Open-Meteo, through the local server. Its API policy allows logs with coordinates for up to 90 days. No device position is sent. |
| Suggest my city | One browser location request after a separate click | Raw coordinates exist transiently in the browser callback and resolve to a known preset city locally. No coordinates are sent to Sakhi's server or providers. A suggested public city requires a separate Use city action before changing any enabled map. Browser/OS location services may have their own data flows. No watchPosition or background tracking. |

Location permission is not consent to share location or notify an authority. The app accepts a local suggestion only within 35 km of a supported preset centre and reported accuracy no worse than 5 km; it is a rough city suggestion that the user must confirm. Denied/unavailable/imprecise/out-of-coverage readings return to manual selection. Acquisition has an 8-second timeout; hidden, unmounted, cleared or superseded attempts are invalidated. This is not a measured physical-device accuracy claim. The preset suggestion list has16 cities; the larger public gazetteer is city-search data, not support-service coverage.

The gateway has fixed HTTPS provider hosts, no redirects or arbitrary query language, sanitized errors,25-second wall timeouts,1.5MB response limits and bounded five-minute public-response caches (one hour for public city IDs). Cache metadata preserves the original retrieval time. Data and request keys stay in server RAM, without a user identifier. One-process host limits are conservative internal-preview controls, not mass-scale rate limiting. Do not enter private addresses or personal details in a public-data tool.

Global no-referrer, self-only scripts/connect, frame denial and no-store app/API responses remain. Only tile images override the referrer to origin as OSM requires. Permissions Policy allows same-origin geolocation because the founder requested explicit city suggestion; camera, microphone and payment remain denied. Merely allowing the capability does not request it. External map scripts, trackers and advertising are not loaded.

## Sharing and reminders

A public TXT travel card contains the selected public city, public destination if chosen, route facts if requested and generic checklist items. It excludes device position and story. A generic check-in WhatsApp URL contains only the displayed neutral message, with no location or trip details. Opening it does not send it: recipient selection and Send happen in WhatsApp. Sakhi cannot observe sending, delivery, availability or an agreed check-in. The existing public resource kit and WhatsApp public-card rules remain.

The local reminder has a page deadline, snooze, cancel and I'm here actions. It is not a server monitor, notification service, automatic contact alert or emergency response. Browser suspension, locking the phone or closing the page can delay or stop it. It must never be relied on for rescue or background protection.

External source/map/message previews show the destination and public fields. Public links carry no story or form data. The emergency tel link uses the device dialler after the user's click. No person, authority or provider receives a referral or complaint through Sakhi. A public correction proposal is temporary local text plus a downloaded file, not a submitted report.

## Offline and operator boundary

The service-worker allowlist caches only versioned public shell, resources, fonts and build assets with SHA-256 integrity checks. No API, query-string URL, story, user draft, travel response or user file enters that cache. OSM tiles are excluded from the service worker and offline export. Map/route/weather services need the network; offline emergency and public support fallback do not depend on them. Hashes do not establish an independent signing root.

Operators must preserve no-access-log settings, disable request telemetry/debug dumps, use HTTPS and protect deployment access. Reverse proxies, hosting logs, browser extensions and compromised devices can undermine these properties. Public deployment still requires independent privacy/security and safeguarding review, source/contact approvals, real-device checks and named operations owners. No legal compliance certification is claimed.
