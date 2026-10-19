import { useState } from "react";
import { ArrowRight, MapPin, ExternalLink } from "lucide-react";
import type { Destination } from "./Modal";
import { PUBLIC_AREAS, PLACE_KINDS, buildPublicMap } from "./public-actions";
export function LocalMapHandoff({
  open,
  demo = false,
}: {
  open: (d: Destination) => void;
  demo?: boolean;
}) {
  const [area, setArea] = useState("");
  const [kind, setKind] = useState<keyof typeof PLACE_KINDS>("legal");
  return (
    <section className="nearby-page" lang="en-IN" dir="ltr">
      <div className="section-folio">
        <span>PUBLIC PLACES / USER-OPENED MAPS</span>
        <span>No location access requested</span>
      </div>
      <div className="page-intro">
        <h1 tabIndex={-1}>
          A place to look.
          <br />
          <em>A choice to make.</em>
        </h1>
        <p>
          Search Google Maps for a type of public place in a city you choose.
          Your origin and GPS stay out of Sakhi.
        </p>
      </div>
      <div className="map-layout">
        <div className="map-controls">
          <span className="micro-label">01 / CHOOSE A COARSE AREA</span>
          <label htmlFor="map-area">Choose a city or district</label>
          <select
            id="map-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="">Choose an area</option>
            {PUBLIC_AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <p className="small-note">
            This is a limited set of search locations, not verified provider
            coverage. No address or private location is needed.
          </p>
          <label htmlFor="place-kind">Public place type</label>
          <select
            id="place-kind"
            value={kind}
            onChange={(e) =>
              setKind(e.target.value as keyof typeof PLACE_KINDS)
            }
          >
            {Object.entries(PLACE_KINDS).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
          <button
            className="button primary wide"
            disabled={!area}
            onClick={() => open(buildPublicMap(area, kind))}
          >
            Preview map search
            <ExternalLink size={17} />
          </button>
          {demo && (
            <p className="small-note">
              The destination preview cannot open externally in this fictional
              example.
            </p>
          )}
        </div>
        <div className="map-explainer">
          <div className="abstract-map" aria-hidden="true">
            <div className="map-street street-a" />
            <div className="map-street street-b" />
            <div className="map-street street-c" />
            <span className="map-pin pin-one">
              <MapPin size={25} />
            </span>
            <span className="map-pin pin-two">
              <MapPin size={25} />
            </span>
            <span className="map-label">PUBLIC SEARCH / NO LIVE DATA</span>
          </div>
          <h2>
            A map is a search tool.
            <br />
            It cannot tell you you’re safe.
          </h2>
          <p>
            Google’s results may be incomplete or outdated. They are not
            Sakhi-vetted support services, verified appointments, open
            facilities or safe routes.
          </p>
          <ol className="map-boundaries">
            <li>
              <span>01</span>You select a city. Sakhi does not read your
              position.
            </li>
            <li>
              <span>02</span>You review the exact Google query before leaving.
            </li>
            <li>
              <span>03</span>You decide what to do inside Google Maps.
            </li>
          </ol>
        </div>
      </div>
      <div className="source-context-note">
        <strong>Why there is no crime-risk map</strong>
        <p>
          Historical police records count registered cases over reporting
          periods. They do not establish a current threat on a street, or
          certify an individual’s safety. Missing reports do not mean zero
          danger.
        </p>
        <button
          className="text-button"
          onClick={() =>
            open({
              url: "https://www.ncrb.mha.gov.in/crime-in-india.html",
              title: "NCRB historical publications",
            })
          }
        >
          Preview the official historical-publications source
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
