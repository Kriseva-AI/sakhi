import { it, expect } from "vitest";
import {
  buildPublicMap,
  buildWhatsAppCard,
  buildPublicKit,
} from "../apps/web/src/public-actions";
it("allows a coarse public map query without precise origin or credentials", () => {
  const d = buildPublicMap("Ahmedabad", "legal");
  const u = new URL(d.url);
  expect(u.origin).toBe("https://www.google.com");
  expect(u.searchParams.get("api")).toBe("1");
  expect(u.searchParams.get("query")).toContain("Ahmedabad");
  expect(u.searchParams.has("origin")).toBe(false);
});
it("rejects arbitrary map text and private coordinates", () => {
  expect(() => buildPublicMap("PRIVATE-STORY", "legal")).toThrow();
  expect(() => buildPublicMap("23.0225,72.5714", "legal")).toThrow();
  expect(() => buildPublicMap("Ahmedabad", "toString" as never)).toThrow();
});
it("WhatsApp is built only from known public resource IDs", () => {
  const d = buildWhatsAppCard(["legal"]);
  expect(new URL(d.url).hostname).toBe("wa.me");
  expect(d.fields?.map((x) => x.value).join(" ")).toContain("nalsa.gov.in");
  expect(d.fields?.map((x) => x.value).join(" ")).not.toContain("undefined");
  expect(() => buildWhatsAppCard(["PRIVATE-STORY"])).toThrow();
});
it("public kit cannot take a personal narrative", () => {
  const kit = buildPublicKit(["legal"]);
  expect(kit).toContain("PUBLIC RESOURCE KIT");
  expect(kit).toContain("https://nalsa.gov.in/womens-assistance/");
  expect(() => buildPublicKit(["SYNTHETIC-PRIVATE"])).toThrow();
});

it("accepts official public PIB article fields but rejects private query data", async () => {
  const { validatePublicEvidenceUrl } =
    await import("../apps/web/src/public-actions");
  const url =
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2224438&lang=1&reg=3";
  expect(validatePublicEvidenceUrl(url).href).toBe(url);
  expect(() =>
    validatePublicEvidenceUrl(
      "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2224438&case=PRIVATE",
    ),
  ).toThrow();
  expect(() =>
    validatePublicEvidenceUrl("https://example.org/?email=PRIVATE"),
  ).toThrow();
  expect(() =>
    validatePublicEvidenceUrl("https://user:password@example.org/"),
  ).toThrow();
});
