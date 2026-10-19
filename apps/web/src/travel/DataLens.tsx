import { ArrowUpRight, Database } from "lucide-react";
import type { Destination } from "../Modal";
export function DataLens({ open }: { open: (d: Destination) => void }) {
  return (
    <div className="data-lens">
      <Database size={25} aria-hidden="true" />
      <h2>Show the evidence.</h2>
      <p>
        Crime zones are not available in this preview. We have not validated a
        current, neighbourhood-level dataset for Mumbai.
      </p>
      <dl className="coverage-grid">
        <div>
          <dt>Live map</dt>
          <dd>OpenStreetMap tiles</dd>
        </div>
        <div>
          <dt>Mapped places</dt>
          <dd>Community records, unverified availability</dd>
        </div>
        <div>
          <dt>Crime history</dt>
          <dd>Official publications; no imported area records</dd>
        </div>
        <div>
          <dt>Nighttime crime scores</dt>
          <dd>No validated model or observations</dd>
        </div>
      </dl>
      <p className="small-note">
        Registered cases are not all incidents. Counts need a reporting period,
        geography, denominator and definitions before comparison. A gap in the
        data does not mean an area is safe.
      </p>
      <button
        className="button quiet"
        onClick={() =>
          open({
            title: "NCRB Crime in India publications",
            url: "https://www.ncrb.mha.gov.in/crime-in-india.html",
          })
        }
      >
        NCRB publications
        <ArrowUpRight size={17} />
      </button>
      <button
        className="button quiet"
        onClick={() =>
          open({
            title:
              "Mumbai Police historical city-wide crime statistics: May 2025. This is not a neighbourhood feed or current risk map.",
            url: "https://mumbaipolice.gov.in/files/Cstat/96.pdf",
          })
        }
      >
        Mumbai historical source
        <ArrowUpRight size={17} />
      </button>
      <details>
        <summary>What is needed to add crime zones?</summary>
        <p>
          Lawful geocoded source data, dates, geography and population
          definitions; independent reconciliation; a published uncertainty
          method; safeguarding and bias review; update ownership and correction
          processes. Names or accusations are not a travel risk score. No
          individual offender profiles are collected here.
        </p>
      </details>
    </div>
  );
}
