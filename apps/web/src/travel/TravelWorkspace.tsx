import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Navigation,
  Route as RouteIcon,
  CloudSun,
  ListChecks,
  Database,
  X,
} from "lucide-react";
import type { Destination } from "../Modal";
import { PUBLIC_AREAS, PLACE_KINDS, buildPublicMap } from "../public-actions";
import { CITIES, km, lookup, nearestCity } from "./types";
import type { City, Point, Place, Places, Route, Weather } from "./types";
import { Conditions } from "./Conditions";
import { TripPlan } from "./TripPlan";
import { DataLens } from "./DataLens";
import { MapBoundary } from "./MapBoundary";
const LiveMap = lazy(() => import("./LiveMap"));
const TABS = [
  ["places", "Places", MapPin],
  ["conditions", "Conditions", CloudSun],
  ["plan", "My plan", ListChecks],
  ["data", "Data", Database],
] as const;
export function TravelWorkspace({
  open,
  demo = false,
}: {
  open: (d: Destination) => void;
  demo?: boolean;
}) {
  const [area, setArea] = useState(""),
    [city, setCity] = useState<City>(CITIES[0]),
    [suggestedCity, setSuggestedCity] = useState<City | null>(null),
    [query, setQuery] = useState(""),
    [cities, setCities] = useState<City[]>([]);
  const [mapOn, setMapOn] = useState(false),
    [centre, setCentre] = useState<Point>(CITIES[0]),
    [kind, setKind] = useState<
      "police" | "hospital" | "pharmacy" | "transport"
    >("police");
  const [places, setPlaces] = useState<Places | null>(null),
    [selected, setSelected] = useState<Place | null>(null),
    [route, setRoute] = useState<Route | null>(null),
    [mode, setMode] = useState<"foot" | "car">("foot"),
    [weather, setWeather] = useState<Weather | null>(null);
  const mapTitle = useRef<HTMLSpanElement>(null),
    loadMapButton = useRef<HTMLButtonElement>(null),
    priorMapOn = useRef(false);
  useEffect(() => {
    if (mapOn) mapTitle.current?.focus({ preventScroll: true });
    else if (priorMapOn.current)
      loadMapButton.current?.focus({ preventScroll: true });
    priorMapOn.current = mapOn;
  }, [mapOn]);
  const [reminder, setReminder] = useState<string | null>(null);
  const [searchedCentre, setSearchedCentre] = useState<Point | null>(null);
  const [tab, setTab] = useState("places"),
    [busy, setBusy] = useState(""),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [now, setNow] = useState(Date.now());
  const attempt = useRef(0),
    abort = useRef<AbortController | null>(null),
    alive = useRef(true),
    geo = useRef(0),
    pendingFocus = useRef<HTMLHeadingElement>(null);
  const [legacyKind, setLegacyKind] =
    useState<keyof typeof PLACE_KINDS>("legal");
  const cancel = () => {
    attempt.current++;
    abort.current?.abort();
    setBusy("");
  };
  useEffect(() => {
    alive.current = true;
    const tick = () => {
      setNow(Date.now());
      if (document.hidden) geo.current++;
    };
    document.addEventListener("visibilitychange", tick);
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      alive.current = false;
      attempt.current++;
      geo.current++;
      abort.current?.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const resetPlace = () => {
    setPlaces(null);
    setSearchedCentre(null);
    setSelected(null);
    setRoute(null);
  };
  const chooseCity = (next: City) => {
    cancel();
    geo.current++;
    setSuggestedCity(null);
    setCity(next);
    setArea(next.name);
    setCentre(next);
    resetPlace();
    setWeather(null);
    setCities([]);
    setError("");
    setNotice(
      `Chosen ${next.name}, ${next.state}. Map and weather use the city, not your device position.`,
    );
  };
  const action = async <T,>(
    key: string,
    body: unknown,
    success: (r: T) => void,
  ) => {
    if (demo) return;
    cancel();
    const id = ++attempt.current;
    const controller = new AbortController();
    abort.current = controller;
    setBusy(key);
    setError("");
    setNotice("");
    try {
      const r = await lookup<T>(key, body, controller.signal);
      if (alive.current && id === attempt.current) success(r);
    } catch (e) {
      if (
        alive.current &&
        id === attempt.current &&
        e instanceof Error &&
        e.name !== "AbortError"
      )
        setError(e.message);
    } finally {
      if (alive.current && id === attempt.current) setBusy("");
    }
  };
  const locate = () => {
    if (demo || document.hidden) return;
    setSuggestedCity(null);
    geo.current++;
    const id = geo.current;
    setNotice(
      "Asking your browser once. Your coordinates stay on this device.",
    );
    setError("");
    if (!navigator.geolocation) {
      setError("Location is unavailable. Choose a city instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!alive.current || id !== geo.current || document.hidden) return;
        if (
          !Number.isFinite(position.coords.accuracy) ||
          position.coords.accuracy > 5000
        ) {
          setError("The reading is too imprecise. Choose a city instead.");
          return;
        }
        const match = nearestCity(
          position.coords.latitude,
          position.coords.longitude,
        );
        if (!match) {
          setError(
            "No supported city is close enough to this reading. Choose or search for your city.",
          );
          return;
        }
        setSuggestedCity(match);
        setNotice(
          `Suggested city: ${match.name}. Confirm it is right. Your device coordinates were not sent or saved.`,
        );
      },
      () => {
        if (alive.current && id === geo.current)
          setError(
            "Location was denied, timed out or unavailable. Choose a city instead.",
          );
      },
      { enableHighAccuracy: false, maximumAge: 0, timeout: 8000 },
    );
  };
  const expire = (value: { expires_at: string } | null) =>
    !!value && Date.parse(value.expires_at) <= now;
  const selectPlace = (place: Place) => {
    setTab("places");
    cancel();
    setSelected(place);
    setRoute(null);
    setError("");
    requestAnimationFrame(() => pendingFocus.current?.focus());
  };
  const revoke = () => {
    cancel();
    geo.current++;
    setMapOn(false);
    resetPlace();
    setWeather(null);
    setNotice(
      "Live map and results cleared. Requests already received by providers cannot be recalled.",
    );
    setError("");
  };
  return (
    <section className="travel-workspace" lang="en-IN" dir="ltr">
      <div className="travel-heading">
        <div>
          <p className="micro-label">SAKHI / OUT & ABOUT</p>
          <h1 tabIndex={-1}>
            Know your options.
            <br />
            <span>Before you go.</span>
          </h1>
        </div>
        <p>
          A real map. Useful public places.
          <br />
          You choose what to load and share.
        </p>
      </div>
      <div className="city-toolbar">
        <div>
          <label htmlFor="travel-city">Choose a city or district</label>
          <select
            id="travel-city"
            value={area}
            onChange={(e) => {
              const next = CITIES.find((c) => c.name === e.target.value);
              if (next) chooseCity(next);
              else if (e.target.value === city.name) {
                chooseCity(city);
              }
            }}
          >
            <option value="">Start with Mumbai, or choose a city</option>
            {Array.from(
              new Set([
                ...PUBLIC_AREAS,
                ...CITIES.map((c) => c.name),
                ...(area ? [area] : []),
              ]),
            )
              .filter((a) => CITIES.some((c) => c.name === a) || a === area)
              .map((a) => (
                <option key={a}>{a}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="travel-status" role={error ? "alert" : "status"}>
        {error ||
          notice ||
          (busy
            ? `Loading ${busy}…`
            : "Nothing loads from an outside service until you choose it.")}
        {busy && <button onClick={cancel}>Cancel lookup</button>}
      </div>
      {!mapOn ? (
        <div className="map-consent">
          <div>
            <h2>Explore {city.name}.</h2>
            <p>
              OpenStreetMap receives your IP, site origin and the areas you
              view. Your device position is not sent by Sakhi.
            </p>
            <button
              className="button primary"
              ref={loadMapButton}
              disabled={demo}
              onClick={() => {
                setMapOn(true);
                setArea(city.name);
                setNotice(
                  "Map enabled. Other providers load only when you use their buttons.",
                );
              }}
            >
              Load live map
              <ArrowUpRight size={18} />
            </button>
            <p className="small-note">
              Community hosting. Availability varies. No background tracking.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="map-caption">
            <span ref={mapTitle} tabIndex={-1}>
              <i />
              {city.name} · map view, not a crime score
            </span>
            <button className="text-button" onClick={revoke}>
              <X size={15} />
              Turn off map & clear results
            </button>
          </div>
          <MapBoundary>
            <Suspense
              fallback={
                <p className="workspace-empty" role="status">
                  Loading the map tool…
                </p>
              }
            >
              <LiveMap
                key={`${city.name}-${city.lat}-${city.lon}`}
                centre={city}
                places={places?.places || []}
                selected={selected}
                route={expire(route) ? null : route}
                select={selectPlace}
                move={(point) => {
                  if (point.lat !== centre.lat || point.lon !== centre.lon) {
                    if (busy === "places" || busy === "route") cancel();
                    setCentre(point);
                    setRoute(null);
                  }
                }}
              />
            </Suspense>
          </MapBoundary>
          <div className="public-point-action">
            <p className="small-note">
              Pan the crosshair to a public destination. Route estimates start
              at {city.name} city centre, not your device position. Do not
              choose a private address.
            </p>
            <button
              className="button quiet"
              disabled={
                demo ||
                Math.hypot(centre.lat - city.lat, centre.lon - city.lon) < 0.001
              }
              onClick={() => {
                setTab("places");
                selectPlace({
                  ...centre,
                  id: "public-map-point",
                  name: "Public point I selected",
                  distance_m: 0,
                  opening_hours: null,
                  wheelchair: null,
                  phone: null,
                  source_url: `https://www.openstreetmap.org/?mlat=${centre.lat}&mlon=${centre.lon}#map=16/${centre.lat}/${centre.lon}`,
                });
              }}
            >
              Choose map centre as destination
              <ArrowRight size={17} />
            </button>
          </div>
        </>
      )}
      <details className="city-search">
        <summary>Find another city in India</summary>
        <div className="city-private-suggestion">
          {" "}
          <button
            className="button quiet locate-city"
            disabled={demo}
            onClick={locate}
          >
            <Navigation size={17} />
            Suggest my city
          </button>
          <span className="small-note">
            Device location stays local.
            <br />
            No person or authority is alerted.
          </span>
          {suggestedCity && (
            <div
              className="suggested-city-choice"
              role="group"
              aria-label="Suggested city choice"
            >
              <p className="small-note">
                {suggestedCity.name}, {suggestedCity.state}. Accepting changes
                your selected public city and an enabled map. Your device
                coordinates are not shared.
              </p>
              <button
                className="button quiet"
                onClick={() => chooseCity(suggestedCity)}
              >
                Use {suggestedCity.name}
              </button>
              <button
                className="text-button"
                onClick={() => {
                  setSuggestedCity(null);
                  setNotice(
                    "Suggestion dismissed. Your selected city is unchanged.",
                  );
                }}
              >
                Dismiss suggestion
              </button>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCities([]);
            action<{ cities: City[] }>("cities", { name: query }, (r) => {
              setCities(r.cities);
              if (!r.cities.length)
                setNotice("No matching city. Try another public city name.");
            });
          }}
        >
          <label htmlFor="city-query">Public city name only</label>
          <p className="small-note">
            Search matches a public city gazetteer on Sakhi. Only a matched city
            ID goes to Open-Meteo / GeoNames. Do not enter an address, person or
            story.
          </p>
          <div className="inline-action">
            <input
              id="city-query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              minLength={2}
              maxLength={40}
              required
              autoComplete="off"
            />
            <button className="button quiet" disabled={demo || !!busy}>
              Search cities
            </button>
          </div>
        </form>
        <ul className="city-results">
          {cities.map((c) => (
            <li key={`${c.lat},${c.lon}`}>
              <button onClick={() => chooseCity(c)}>
                {c.name}, {c.state}
                <ArrowRight size={16} />
              </button>
            </li>
          ))}
        </ul>
      </details>
      {reminder && (
        <div className="reminder-status" role="status">
          {reminder}
          <button className="text-button" onClick={() => setTab("plan")}>
            Open reminder
          </button>
        </div>
      )}
      <div className="travel-layout">
        <div className="travel-side">
          <nav className="travel-tabs" aria-label="Travel tools">
            {TABS.map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
          <p className="small-note">
            Optional public-data tools. For an immediate concern, use the
            support finder or call 112 if you can.
          </p>
          <button
            className="text-button"
            onClick={() => {
              setTab("data");
            }}
          >
            Where does the data come from?
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="travel-content" aria-busy={!!busy}>
          {tab === "places" && (
            <>
              <div className="workspace-title">
                <h2>Find a public place.</h2>
                <span className="small-note">
                  Within 2 km of the chosen map centre
                </span>
              </div>
              <div
                className="place-kinds"
                role="group"
                aria-label="Mapped place type"
              >
                {(
                  [
                    ["police", "Police"],
                    ["hospital", "Hospitals"],
                    ["pharmacy", "Pharmacies"],
                    ["transport", "Rail & metro"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    aria-pressed={kind === id}
                    key={id}
                    onClick={() => {
                      cancel();
                      setKind(id);
                      resetPlace();
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="small-note">
                Search sends the public map centre ({centre.lat.toFixed(3)},{" "}
                {centre.lon.toFixed(3)}) and place type to Overpass. Only use a
                public area. Panning does not run a search.
              </p>
              <button
                className="button primary"
                disabled={demo || !!busy}
                onClick={() => {
                  resetPlace();
                  action<Places>(
                    "places",
                    { lat: centre.lat, lon: centre.lon, kind },
                    (result) => {
                      setPlaces(result);
                      setSearchedCentre(centre);
                    },
                  );
                }}
              >
                Search this area
                <MapPin size={17} />
              </button>
              {places && (
                <>
                  <p className="lookup-receipt">
                    {places.places.length} mapped records · {places.source}
                    {searchedCentre && (
                      <span>
                        {" "}
                        · Search centre {searchedCentre.lat.toFixed(3)},{" "}
                        {searchedCentre.lon.toFixed(3)}
                      </span>
                    )}
                    <br />
                    Retrieved{" "}
                    {new Date(places.fetched_at).toLocaleString("en-IN")} ·{" "}
                    {places.snapshot_at
                      ? `OSM snapshot ${places.snapshot_at}`
                      : "Snapshot time unavailable"}
                  </p>
                  {expire(places) && (
                    <p className="notice">
                      Results have expired. Search again before choosing a
                      place.
                    </p>
                  )}
                  <p className="small-note">
                    Mapped records are not verified support providers. Distance
                    is straight-line from the search centre. Confirm public
                    access, hours and help available.
                  </p>
                  <ul className="place-list" aria-label="Mapped public places">
                    {places.places.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => selectPlace(p)}
                          aria-pressed={selected?.id === p.id}
                          disabled={expire(places)}
                        >
                          <span>
                            <strong>{p.name}</strong>
                            <small>
                              {p.opening_hours
                                ? `Mapped hours: ${p.opening_hours}`
                                : "Opening hours unknown"}
                            </small>
                          </span>
                          <span>
                            {km(p.distance_m)}
                            <ArrowUpRight size={17} />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {places.places.length === 0 && (
                    <p className="workspace-empty">
                      No records were returned. This is a gap in this map
                      search, not evidence that no services exist. Try another
                      type or the public Google Maps search below.
                    </p>
                  )}
                </>
              )}
              {selected && (
                <div className="selected-place">
                  <p className="micro-label">CHOSEN MAPPED PLACE</p>
                  <h3 tabIndex={-1} ref={pendingFocus}>
                    {selected.name}
                  </h3>
                  <dl>
                    <div>
                      <dt>Hours</dt>
                      <dd>{selected.opening_hours || "Unknown"}</dd>
                    </div>
                    <div>
                      <dt>Wheelchair access</dt>
                      <dd>
                        {selected.wheelchair
                          ? `Mapped tag: ${selected.wheelchair}`
                          : "Unknown"}
                      </dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        {selected.phone
                          ? `${selected.phone} (unverified map tag)`
                          : "Not listed"}
                      </dd>
                    </div>
                  </dl>
                  <button
                    className="text-button"
                    onClick={() =>
                      open({
                        url: selected.source_url,
                        title: `Map record for ${selected.name}. Community data, not a verified service.`,
                      })
                    }
                  >
                    Inspect source record
                    <ArrowUpRight size={15} />
                  </button>
                  <div className="route-controls">
                    <label htmlFor="travel-mode">Route estimate</label>
                    <select
                      id="travel-mode"
                      value={mode}
                      onChange={(e) => {
                        cancel();
                        setMode(e.target.value as "foot" | "car");
                        setRoute(null);
                      }}
                    >
                      <option value="foot">Walking</option>
                      <option value="car">Driving</option>
                    </select>
                    <p className="small-note">
                      Send{" "}
                      {selected.id === "public-map-point"
                        ? `${city.name} city centre`
                        : "the public map centre"}{" "}
                      and this selected destination to FOSSGIS / OSRM. Its
                      server logs route requests. No device position is
                      included.
                    </p>
                    <details>
                      <summary>Exact public route points sent</summary>
                      <p className="small-note">
                        From{" "}
                        {selected.id === "public-map-point"
                          ? `${city.lat}, ${city.lon}`
                          : `${centre.lat}, ${centre.lon}`}{" "}
                        to {selected.lat}, {selected.lon}. Mode:{" "}
                        {mode === "foot" ? "walking" : "driving"}.
                      </p>
                    </details>
                    <button
                      className="button quiet"
                      disabled={demo || !!busy || expire(places)}
                      onClick={() => {
                        setRoute(null);
                        action<Route>(
                          "route",
                          {
                            start:
                              selected.id === "public-map-point"
                                ? { lat: city.lat, lon: city.lon }
                                : { lat: centre.lat, lon: centre.lon },
                            end: { lat: selected.lat, lon: selected.lon },
                            mode,
                          },
                          setRoute,
                        );
                      }}
                    >
                      <RouteIcon size={17} />
                      Calculate public route
                    </button>
                  </div>
                  {route && (
                    <div className="route-result" role="status">
                      <strong>
                        {km(route.distance_m)} · about {route.duration_minutes}{" "}
                        min {route.mode === "foot" ? "walking" : "driving"}
                      </strong>
                      <p>
                        {expire(route)
                          ? "Estimate expired. Calculate again."
                          : "Model estimate, no live traffic, street-lighting or crime assessment. Check the actual path and current conditions."}
                      </p>
                      <small>
                        {route.source} ·{" "}
                        {new Date(route.fetched_at).toLocaleString("en-IN")}
                      </small>
                    </div>
                  )}
                </div>
              )}
              <details className="manual-map">
                <summary>Prefer to use Google Maps?</summary>
                <label htmlFor="place-kind">Public place type</label>
                <select
                  id="place-kind"
                  value={legacyKind}
                  onChange={(e) =>
                    setLegacyKind(e.target.value as keyof typeof PLACE_KINDS)
                  }
                >
                  {Object.entries(PLACE_KINDS).map(([key, label]) => (
                    <option value={key} key={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  className="button quiet"
                  disabled={
                    !PUBLIC_AREAS.includes(
                      area as (typeof PUBLIC_AREAS)[number],
                    )
                  }
                  onClick={() => open(buildPublicMap(area, legacyKind))}
                >
                  Preview map search
                  <ArrowUpRight size={16} />
                </button>
                <p className="small-note">
                  Separate external search for the 16 preset cities. Your origin
                  and GPS are not included.
                </p>
              </details>
            </>
          )}
          {tab === "conditions" && (
            <>
              <h2>Weather & daylight.</h2>
              <p>
                For {city.name}, {city.state}. Loading sends the public city
                centre to Open-Meteo, which may log coordinates for up to 90
                days.
              </p>
              <button
                className="button primary"
                disabled={demo || !!busy}
                onClick={() => {
                  setWeather(null);
                  action<Weather>(
                    "weather",
                    { lat: city.lat, lon: city.lon },
                    setWeather,
                  );
                }}
              >
                Load conditions
                <CloudSun size={17} />
              </button>
              <Conditions weather={weather} expired={expire(weather)} />
              {weather && (
                <p className="lookup-receipt">
                  Open-Meteo · CC BY 4.0 · retrieved{" "}
                  {new Date(weather.fetched_at).toLocaleString("en-IN")}
                </p>
              )}
            </>
          )}
          <div hidden={tab !== "plan"}>
            <TripPlan
              key={`${city.name}-${city.lat}`}
              city={city}
              place={selected}
              route={expire(route) ? null : route}
              demo={demo}
              open={open}
              onReminder={setReminder}
            />
          </div>
          {tab === "data" && <DataLens open={open} />}
        </div>
      </div>
      <details className="travel-provider-details">
        <summary>Providers, permissions & limits</summary>
        <p>
          OpenStreetMap contributors: ODbL. Open-Meteo and GeoNames: CC BY 4.0.
          Routes: FOSSGIS / OSRM from OSM. Map records do not establish a
          service agreement, live opening hours or safe route. These community
          endpoints are for a bounded internal preview. An owned or contracted
          provider and capacity/security review are required before mass launch.
        </p>
        <p>
          Raw device coordinates stay in the browser during city suggestion and
          are discarded. City/map choices and public results stay in page
          memory, except provider-side bounded public-response caching. Clear
          session or leaving this page ends the reminder and drops page state.
          Downloads, browser tile caches and external providers retain their own
          copies.
        </p>
        <p>
          <button
            onClick={() =>
              open({
                url: "https://operations.osmfoundation.org/policies/tiles/",
                title: "OSM tile usage and privacy requirements",
              })
            }
          >
            OSM tile policy
          </button>{" "}
          ·{" "}
          <button
            onClick={() =>
              open({
                url: "https://open-meteo.com/en/terms",
                title: "Open-Meteo terms and provider logging",
              })
            }
          >
            Open-Meteo terms
          </button>{" "}
          ·{" "}
          <button
            onClick={() =>
              open({
                url: "https://routing.openstreetmap.de/about.html",
                title: "FOSSGIS routing usage and privacy",
              })
            }
          >
            Routing terms
          </button>{" "}
          ·{" "}
          <button
            onClick={() =>
              open({
                url: "https://www.openstreetmap.org/fixthemap",
                title:
                  "Report a public map issue to OpenStreetMap. Do not include a private case.",
              })
            }
          >
            Report a map issue
          </button>
        </p>
      </details>
    </section>
  );
}
