import { it, expect } from "vitest";
import {
  daylight,
  nearestCity,
  publicTrip,
  CITIES,
  indiaNow,
} from "../apps/web/src/travel/types";
it("maps a city locally without exporting a precise position or guessing distant coverage", () => {
  expect(nearestCity(19.08, 72.88)?.name).toBe("Mumbai");
  expect(nearestCity(0, 0)).toBeNull();
  expect(nearestCity(Number.NaN, 72)).toBeNull();
});
it("keeps daylight separate from personal safety and handles unknown dates", () => {
  const days = [
    {
      date: "2026-10-20",
      sunrise: "2026-10-20T06:34",
      sunset: "2026-10-20T18:12",
    },
  ];
  expect(daylight("2026-10-20T12:00", days)).toBe("During forecast daylight");
  expect(daylight("2026-10-20T18:12", days)).toBe("Outside forecast daylight");
  expect(daylight("2026-10-21T12:00", days)).toContain("within the forecast");
  expect(daylight("", days)).toContain("Choose");
  expect(indiaNow(new Date("2026-10-20T00:00:00Z"))).toBe("2026-10-20T05:30");
});
it("exports only the selected public travel information with limitations", () => {
  const text = publicTrip(CITIES[0], null, null, [
    "Choose a public meeting point",
  ]);
  expect(text).toContain("Mumbai");
  expect(text).toContain("No person or authority has been notified.");
  expect(text).not.toContain("72.883");
  expect(text).not.toContain("19.073");
});
