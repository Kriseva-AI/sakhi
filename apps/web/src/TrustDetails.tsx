import { download } from "./local";
const DETAILS = [
  [
    "What stays in page memory",
    "Your choices, drafts, recipient label/number and optional location reading stay in temporary app memory. The local API processes optional concern text without saving or logging it. Only the language preference is saved in browser storage. Reload or Clear session discards app memory; leaving a tool stops its local location view.",
  ],
  [
    "What an update can share",
    "A neutral draft includes the recipient number and chosen message. A location is included only after you separately choose a one-time position and approve the exact recipient/content preview. Opening gives WhatsApp that information; Send remains your decision there. A one-time point is not live tracking. Sakhi cannot observe sending, delivery, replies or rescue.",
  ],
  [
    "Cover, quick exit and device traces",
    "Hide page covers the screen locally and changes the tab title to Notes. Quick exit clears app memory and opens Google in this tab. Neither erases earlier visits, other tabs, network logs, notifications, screenshots or device monitoring. Google receives normal browser information. Consider a device you trust if one is available.",
  ],
  [
    "Stop location or revoke an update",
    "Local location stops on hide, background, tool/page exit or Clear session. A frozen position expires after two minutes. Revoking clears the draft and approval here. It cannot unsend a message, remove another app’s copies or stop WhatsApp live sharing. Stop that separately inside the chat; a last-location preview may remain.",
  ],
  [
    "Source checks and service coverage",
    "Directory entries show their own October 19 or 20 source check and expiry. Additional online-abuse guidance has separate source receipts. Agent source inspection does not prove service availability or human approval. No service has accepted a referral through Sakhi. Mapped places have not been independently verified.",
  ],
  [
    "Languages and expert review",
    "23 language shells have complete structural keys. Some navigation labels have draft translations. Page guidance, consent and service details use English. Structural keys are not translated or reviewed language coverage. All locales, including English, still need qualified language, domain and safeguarding review.",
  ],
  [
    "What works offline",
    "Only the public app, resource pack and fonts are cached with version hashes. API responses, recipient details, positions and drafts are excluded. Offline access cannot promise live service availability, connectivity or submissions. Downloads and browser/OS copies remain outside Clear session.",
  ],
  [
    "What is unavailable",
    "Private vaults, uploads, personal case timelines, institutional connectors and staffed handoffs are unavailable. No counselling, medical advice, police dispatch, individualized escape planning, offender profiles or guaranteed safe route is supplied.",
  ],
];
export function TrustDetails({
  notify,
  forgetLocale,
  demo,
}: {
  notify: (s: string) => void;
  forgetLocale: () => void;
  demo: boolean;
}) {
  return (
    <div className="trust-detail">
      {DETAILS.map(([title, body]) => (
        <details key={title}>
          <summary>{title}</summary>
          <p>{body}</p>
        </details>
      ))}
      <details>
        <summary>Storage controls and public corrections</summary>
        <p>
          Clear session removes temporary app state and keeps your language
          choice. You can remove that saved preference separately. A correction
          is a public proposal, never an automatically published change. Leave
          out identities, private contacts, stories and intimate media.
        </p>
        <button className="button quiet" onClick={forgetLocale}>
          Remove saved language preference
        </button>
        <button
          className="button secondary"
          disabled={demo}
          onClick={() => {
            download(
              "PUBLIC RESOURCE CORRECTION\nResource ID:\nOfficial source URL:\nProposed correction:\nEvidence date:\nNo personal stories, names, intimate media or private contacts. Submit a reviewed repository issue or pull request after the repository is published.\n",
              "sakhi-public-correction.txt",
            );
            notify(
              "A blank public correction template was downloaded. Review it before sharing.",
            );
          }}
        >
          Download correction template
        </button>
      </details>
    </div>
  );
}
