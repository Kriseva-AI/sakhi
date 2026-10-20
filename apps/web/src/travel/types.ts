export interface Point {
  lat: number;
  lon: number;
}
export interface City extends Point {
  name: string;
  state: string;
}
export interface Receipt {
  source: string;
  fetched_at: string;
  expires_at: string;
}
export interface Place extends Point {
  id: string;
  name: string;
  distance_m: number;
  opening_hours: string | null;
  wheelchair: string | null;
  phone: string | null;
  source_url: string;
}
export interface Places extends Receipt {
  places: Place[];
  snapshot_at: string | null;
}
export interface Route extends Receipt {
  mode: "foot" | "car";
  distance_m: number;
  duration_minutes: number;
  coordinates: [number, number][];
}
export interface Weather extends Receipt {
  current: {
    time: string;
    temperature_2m: number;
    precipitation: number;
    is_day: number;
    wind_speed_10m: number;
  };
  days: { date: string; sunrise: string; sunset: string }[];
  hours: { time: string; rain_probability: number }[];
  timezone: string;
}
export const CITIES: City[] = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.073, lon: 72.883 },
  { name: "Delhi", state: "Delhi", lat: 28.614, lon: 77.209 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.023, lon: 72.571 },
  { name: "Bengaluru", state: "Karnataka", lat: 12.972, lon: 77.595 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.083, lon: 80.271 },
  { name: "Kolkata", state: "West Bengal", lat: 22.573, lon: 88.364 },
  { name: "Pune", state: "Maharashtra", lat: 18.52, lon: 73.857 },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lon: 78.487 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.912, lon: 75.787 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.847, lon: 80.946 },
  { name: "Patna", state: "Bihar", lat: 25.594, lon: 85.138 },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.259, lon: 77.413 },
  { name: "Kochi", state: "Kerala", lat: 9.931, lon: 76.267 },
  { name: "Guwahati", state: "Assam", lat: 26.145, lon: 91.736 },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.733, lon: 76.779 },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.296, lon: 85.825 },
];
export function km(m: number) {
  return m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;
}
export function nearestCity(lat: number, lon: number): City | null {
  const distances = CITIES.map((city) => ({
    city,
    d: Math.hypot(
      (city.lat - lat) * 111,
      (city.lon - lon) * 111 * Math.cos((lat * Math.PI) / 180),
    ),
  })).sort((a, b) => a.d - b.d);
  return distances[0].d <= 35 ? distances[0].city : null;
}
export function indiaNow(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(date)
    .replace(" ", "T");
}
export function daylight(departure: string, days: Weather["days"]): string {
  if (!departure || !days.some((d) => d.date === departure.slice(0, 10)))
    return "Choose a departure within the forecast dates.";
  const day = days.find((d) => d.date === departure.slice(0, 10))!;
  return departure >= day.sunrise && departure < day.sunset
    ? "During forecast daylight"
    : "Outside forecast daylight";
}
export function publicTrip(
  city: City,
  place: Place | null,
  route: Route | null,
  checks: string[],
) {
  return [
    "SAKHI PUBLIC TRAVEL CARD",
    `Prepared ${new Date().toISOString()}`,
    `City: ${city.name}, ${city.state}`,
    "This is public travel information. No device position or private story is included.",
    ...(place
      ? [
          `Mapped destination: ${place.name}`,
          `Source: ${place.source_url}`,
          "Availability and public access have not been verified.",
        ]
      : []),
    ...(route
      ? [
          `${route.mode === "foot" ? "Walking" : "Driving"} estimate: ${km(route.distance_m)}, ${route.duration_minutes} minutes`,
          `Route retrieved: ${route.fetched_at}`,
          `Estimate expires: ${route.expires_at}`,
          "No live traffic, lighting or crime assessment.",
        ]
      : []),
    ...checks.map((c) => `Prepared: ${c}`),
    "For immediate danger in India: 112. Sakhi cannot dispatch help.",
    "No person or authority has been notified.",
  ].join("\n");
}
export async function lookup<T>(
  path: string,
  body: unknown,
  signal: AbortSignal,
): Promise<T> {
  const request = new AbortController();
  let timedOut = false;
  const cancel = () => request.abort();
  signal.addEventListener("abort", cancel, { once: true });
  if (signal.aborted) request.abort();
  const timer = setTimeout(() => {
    timedOut = true;
    request.abort();
  }, 12_000);
  try {
    const response = await fetch(`/api/explore/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: request.signal,
      credentials: "omit",
      cache: "no-store",
    });
    if (!response.ok) {
      if (response.status === 429)
        throw new Error(
          "Please wait a few seconds. This preview has a shared provider limit.",
        );
      if (response.status === 422)
        throw new Error(
          "Use a public city name or an area within India. No address or personal details.",
        );
      throw new Error(
        "The public provider is unavailable. Try later or use the Google Maps alternative.",
      );
    }
    return await response.json();
  } catch (error) {
    if (timedOut)
      throw new Error(
        "Lookup timed out. Try again later or preview the alternative map search. No place or service availability was confirmed.",
      );
    throw error;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", cancel);
  }
}
