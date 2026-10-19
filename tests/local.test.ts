import { describe, it, expect } from "vitest";
import {
  localSafety,
  publicFallback,
  isFresh,
  helpCard,
  pack,
} from "../apps/web/src/local";
describe("browser local safety", () => {
  it("redirects immediate risk before a server call", () =>
    expect(localSafety("he is attacking me now")).toBe("urgent_redirect"));
  it("stops an adult route for a minor", () =>
    expect(localSafety("I am 15 and need legal help")).toBe("minor_redirect"));
  it("does not turn ordinary uncertainty into an emergency", () =>
    expect(localSafety("I am not sure about my options")).toBeNull());
  it("public emergency remains available when a pack is stale", () => {
    expect(isFresh(pack.resources[0], new Date("2030-01-01"))).toBe(false);
    expect(publicFallback("unsure", "urgent_redirect").resources[0].phone).toBe(
      "112",
    );
  });
  it("general cards contain no personalized payload", () => {
    const text = helpCard(pack.resources.find((r) => r.id === "cyber")!);
    expect(text).toContain("https://cybercrime.gov.in/");
    expect(text).toContain("No personal information");
  });
});
it("does not treat number words describing groups or pregnancy as age", () => {
  expect(
    localSafety("I am one of several women experiencing workplace harassment"),
  ).toBeNull();
  expect(
    localSafety("I am sixteen weeks pregnant and need legal help"),
  ).toBeNull();
  expect(localSafety("I am 16 weeks pregnant and need legal help")).toBeNull();
});
