import { pack, helpCard } from "./local";
import type { Destination } from "./Modal";
export const PUBLIC_AREAS = [
  "Ahmedabad",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Delhi",
  "Guwahati",
  "Hyderabad",
  "Jaipur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Patna",
  "Pune",
] as const;
export const PLACE_KINDS = {
  legal: "District Legal Services Authority",
  police: "police station",
  hospital: "government hospital",
} as const;
export function buildPublicMap(
  area: string,
  kind: keyof typeof PLACE_KINDS,
): Destination {
  if (
    !PUBLIC_AREAS.includes(area as (typeof PUBLIC_AREAS)[number]) ||
    !Object.hasOwn(PLACE_KINDS, kind)
  )
    throw new Error("Choose a listed coarse area and public place type.");
  const query = `${PLACE_KINDS[kind]} in ${area}, India`;
  const url = new URL("https://www.google.com/maps/search/");
  url.searchParams.set("api", "1");
  url.searchParams.set("query", query);
  return {
    kind: "map",
    title: "Public place search in Google Maps",
    url: url.href,
    fields: [
      { label: "Public search", value: query },
      {
        label: "Location shared by Sakhi",
        value:
          "Manually selected city only. Your origin and GPS are not included.",
      },
    ],
    disclosure:
      "This opens a public map search. Google receives the displayed search and normal browser information. Google may independently use its own account or device permissions. Map listings are not vetted Sakhi providers, verified availability or safe routes. Nothing is sent to a service or authority.",
  };
}
export const PUBLIC_SERVICE_QUESTIONS = [
  "What kind of support do you provide?",
  "What information would you need from me?",
  "Can I ask for information before deciding what to do?",
  "Which language and communication options can you offer?",
  "If this service is not suitable, which official option can I check?",
];
// A proposal is unverified data. Allow public PIB article selectors, never case fields.
export function validatePublicEvidenceUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.hash)
    throw new Error(
      "Use an HTTPS source without credentials, fragments or private reference data.",
    );
  if (url.search) {
    const publicArticle =
      url.hostname === "www.pib.gov.in" &&
      url.pathname === "/PressReleasePage.aspx" &&
      url.searchParams.has("PRID") &&
      [...url.searchParams].every(
        ([key, value]) =>
          ["PRID", "lang", "reg"].includes(key) && /^\d{1,10}$/.test(value),
      );
    if (!publicArticle)
      throw new Error(
        "Query fields are limited to public PIB article selectors PRID, lang and reg. Leave private reference fields out.",
      );
  }
  return url;
}
function publicRecords(ids: string[]) {
  if (!ids.length || ids.length > pack.resources.length)
    throw new Error("Choose public resources.");
  return [...new Set(ids)].map((id) => {
    const r = pack.resources.find((x) => x.id === id);
    if (!r) throw new Error("Only known public resource IDs are accepted.");
    return r;
  });
}
export function buildPublicKit(ids: string[]): string {
  const records = publicRecords(ids);
  return `SAKHI PUBLIC RESOURCE KIT\nGeneral public information only. No personal story or location is included.\nSource pack: ${pack.version}. Source checks are not live availability or human approval.\nFor immediate danger in India, call 112 if possible.\n\n${records.map(helpCard).join("\n")}\nQuestions you can choose to ask a service:\n${PUBLIC_SERVICE_QUESTIONS.join("\n")}\n\nThis file can remain on your device or in backups. Clear session does not erase downloads.\n`;
}
export function buildWhatsAppCard(ids: string[]): Destination {
  const records = publicRecords(ids);
  const text = `Public support resources in India\n${records.map((r) => `${r.title}: ${r.url} (checked ${r.checked_at}; review by ${r.expires_at})`).join("\n")}\nImmediate danger: 112. Source pack ${pack.version}; human verification pending, no live availability promise. General information, no personal case details.`;
  const url = new URL("https://wa.me/");
  url.searchParams.set("text", text);
  return {
    kind: "whatsapp",
    title: "Share a general public help card",
    url: url.href,
    fields: [
      {
        label: "Recipient",
        value: "You choose the recipient and press Send inside WhatsApp.",
      },
      { label: "Public text", value: text },
    ],
    disclosure:
      "WhatsApp receives only the public text shown here, plus normal browser information. No personal narrative or location is included. Opening a draft does not send it. Sakhi cannot observe delivery, a response or a referral. This is not a Sakhi helpdesk or authority alert.",
  };
}
