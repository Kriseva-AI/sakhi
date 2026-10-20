import type {
  Category,
  Pack,
  Resource,
  Result,
} from "../../../packages/contracts";
import packData from "../../../data/public-seeds/resources.json";
import rules from "./routing.json";
export const pack = packData as Pack;
export const isFresh = (r: Resource, now = new Date()) =>
  now.toISOString().slice(0, 10) <= r.expires_at;
export function localSafety(
  text: string,
  under18 = false,
): "urgent_redirect" | "minor_redirect" | null {
  const value = text.normalize("NFKC").toLowerCase();
  if (
    Object.values(rules.emergency)
      .flat()
      .some((p) => value.includes(p.normalize("NFKC").toLowerCase()))
  )
    return "urgent_redirect";
  if (
    under18 ||
    rules.minor_patterns.some((pattern) => new RegExp(pattern, "u").test(value))
  )
    return "minor_redirect";
  return null;
}
export function publicFallback(
  category: Category,
  state: Result["state"] = "present_options",
): Result {
  const order =
    state === "urgent_redirect"
      ? ["emergency"]
      : state === "minor_redirect"
        ? ["child", "emergency"]
        : {
            cyber: ["cyber", "legal", "women"],
            home: ["women", "legal", "ncw"],
            workplace: ["workplace", "legal", "women"],
            legal: ["legal", "women"],
            friend: ["women", "legal", "ncw"],
            unsure: ["women", "legal", "ncw"],
          }[category];
  let found = order.flatMap((id) =>
    pack.resources.filter(
      (r) => r.id === id && (isFresh(r) || state !== "present_options"),
    ),
  );
  if (!found.length)
    found = pack.resources.filter((r) => ["legal", "emergency"].includes(r.id));
  return {
    state,
    category,
    abstained: category === "unsure" && state === "present_options",
    resources: found,
    engine: "public_pack_local",
    warnings: [],
    language_status: "review_pending",
    content_locale: "en-IN",
    external_actions: false,
  };
}
export function publicDirectory(): Resource[] {
  const fresh = pack.resources.filter((r) => isFresh(r));
  return fresh.length
    ? fresh
    : pack.resources.filter((r) => ["legal", "emergency"].includes(r.id));
}
export function offlineCategory(text: string): Category {
  const value = text.normalize("NFKC").toLowerCase();
  const scores = Object.entries(rules.aliases)
    .map(
      ([c, a]) =>
        [
          c,
          a
            .split(/\s+/)
            .filter((word) => word.length > 2 && value.includes(word)).length,
        ] as const,
    )
    .sort((a, b) => b[1] - a[1]);
  return scores[0][1] && (!scores[1] || scores[0][1] > scores[1][1])
    ? (scores[0][0] as Category)
    : "unsure";
}
export function helpCard(resource: Resource): string {
  return `PUBLIC RESOURCE CARD | Kriseva Sakhi\n${resource.title}\n${resource.summary}\n${resource.url}\n${resource.phone ? "Phone: " + resource.phone + "\n" : ""}Source: ${resource.source_url}\nSource checked: ${resource.checked_at}; review by ${resource.expires_at}\n${resource.limitations}\nNo personal information is included. Sakhi is not an emergency service. For immediate danger in India: 112.\n`;
}
export function download(text: string, filename: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
