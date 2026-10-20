import { useEffect, useState } from "react";
import { catalogs } from "./locale";
import { pack, download } from "./local";
import supportGuides from "../../../data/public-seeds/support-guides.json";
interface Metrics {
  seeds: {
    ingested: number;
    reviewed_for_preview: number;
    human_approved: number;
    exposed: number;
    duplicates: string[][];
  };
  osc: {
    reported_national: number;
    report_date: string;
    data_through: string;
    individual_sourced: number;
    independently_verified_contacts: number;
    integrations: number;
  };
  pack_sha256: string;
}
export function Maintenance({ demo = false }: { demo?: boolean }) {
  const [data, setData] = useState<Metrics | null>(null);
  useEffect(() => {
    fetch("/api/maintenance", { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);
  return (
    <section className="maintenance" lang="en-IN" dir="ltr">
      <div className="eyebrow">READ-ONLY LOCAL CONSOLE</div>
      <h1 tabIndex={-1}>Trust is a process.</h1>
      <p>
        No private interactions are collected here. Changes require a reviewed
        repository commit.
      </p>
      <div className="metric-grid">
        {[
          ["Discovery leads", data?.seeds.ingested ?? "API unavailable"],
          [
            "Preview-curated",
            data?.seeds.reviewed_for_preview ?? pack.resources.length,
          ],
          ["Human-approved", 0],
          ["Publicly exposed", data?.seeds.exposed ?? "API unavailable"],
        ].map(([label, value]) => (
          <div className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <h2>One Stop Centre coverage</h2>
      <p>
        The counts above cover the 7 directory records. Two additional
        image-abuse guide sources are shown conditionally: 9 distinct support
        entry points in total, all with human approval pending.
      </p>
      <p>
        991 operational centres were reported on August 5, 2026, covering data
        through June 30, 2026. This is a historical aggregate.
      </p>
      <div className="metric-grid">
        {[
          ["Individual sourced records", 0],
          ["Independently verified contacts", 0],
          ["Partner integrations", 0],
        ].map(([label, value]) => (
          <div className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <h2>Source queue</h2>
      <p>
        Agent checks permit this internal preview only. None has human
        production approval.
      </p>
      <div
        className="table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Scrollable public review table"
      >
        <table>
          <caption>Public pack {pack.version}</caption>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Checked</th>
              <th>Review by</th>
              <th>Review status</th>
            </tr>
          </thead>
          <tbody>
            {pack.resources.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.checked_at}</td>
                <td>{r.expires_at}</td>
                <td>Human review pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Language review</h2>
      <details>
        <summary>Additional source review queue</summary>
        <p>
          Guide version {supportGuides.version}. Checked{" "}
          {supportGuides.checked_at}; review by {supportGuides.expires_at}.
          Public references, no service integration or human signoff.
        </p>
        {Object.values(supportGuides.resources).map((r) => (
          <p key={r.seed_id}>
            <strong>
              {r.title} ({r.seed_id})
            </strong>
            : {r.publisher}. {r.eligibility} Alternative: {r.fallback}.
          </p>
        ))}
      </details>
      <div
        className="table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Scrollable public review table"
      >
        <table>
          <caption>
            Structural key coverage is separate from translation quality.
          </caption>
          <thead>
            <tr>
              <th>Locale</th>
              <th>Keys</th>
              <th>English fallback keys</th>
              <th>Signoff</th>
            </tr>
          </thead>
          <tbody>
            {catalogs.map((c) => (
              <tr key={c.locale}>
                <td>
                  {c.name} ({c.locale})
                </td>
                <td>
                  {Object.keys(c.messages).length}/
                  {Object.keys(c.messages).length}
                </td>
                <td>{c.fallback_keys.length}</td>
                <td>Review pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Evaluation console</h2>
      <Evaluation />
      <h2>Integration gates</h2>
      <p>
        Outbound adapters: disabled. Private vault: not ready. Provider
        acknowledgement: unavailable. No claimed institutional connections.
      </p>
      <button
        className="button secondary"
        disabled={demo}
        onClick={() =>
          download(
            JSON.stringify(
              {
                type: "public_resource_correction",
                resource_id: "",
                official_source_url: "",
                proposed_change: "",
                evidence_date: "",
                warning:
                  "Public information only. Never add personal stories or private contacts.",
              },
              null,
              2,
            ),
            "sakhi-correction-template.json",
          )
        }
      >
        Download correction template
      </button>
      <p className="small">
        Weekly checks: uv run python scripts/resources.py validate --online.
        Reports never change the public pack.
      </p>
      {data && (
        <p className="small">
          Pack SHA-256: <code className="hash">{data.pack_sha256}</code>
        </p>
      )}
    </section>
  );
}
function Evaluation() {
  const [report, setReport] = useState<Record<
    string,
    { cases: number; accuracy: number; abstention_rate: number }
  > | null>(null);
  useEffect(() => {
    fetch("/evaluation.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setReport(d?.by_locale ?? null))
      .catch(() => {});
  }, []);
  if (!report)
    return (
      <p>
        No published local evaluation artifact is available. Run make evaluate.
        Fixtures require expert review.
      </p>
    );
  return (
    <>
      <p>
        Draft synthetic fixtures. These results are regression coverage, not
        expert-validated real-world accuracy.
      </p>
      <div
        className="table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Scrollable public review table"
      >
        <table>
          <thead>
            <tr>
              <th>Locale</th>
              <th>Cases</th>
              <th>Route agreement</th>
              <th>Abstention</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(report).map(([code, r]) => (
              <tr key={code}>
                <td>{code}</td>
                <td>{r.cases}</td>
                <td>{(r.accuracy * 100).toFixed(1)}%</td>
                <td>{(r.abstention_rate * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
