import { useState } from "react";
import { ArrowRight, Check, Download } from "lucide-react";
import { download } from "./local";
import { validatePublicEvidenceUrl } from "./public-actions";
export function Community({
  demo = false,
  notify,
}: {
  demo?: boolean;
  notify: (s: string) => void;
}) {
  const [resource, setResource] = useState("");
  const [source, setSource] = useState("");
  const [change, setChange] = useState("");
  const [error, setError] = useState("");
  function proposal() {
    setError("");
    let url: URL;
    try {
      url = validatePublicEvidenceUrl(source);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Enter a public HTTPS source.",
      );
      return;
    }
    if (!/^[a-zA-Z0-9_-]{1,50}$/.test(resource)) {
      setError("Use the public resource ID, without personal information.");
      return;
    }
    download(
      JSON.stringify(
        {
          kind: "public_resource_correction",
          resource_id: resource,
          official_evidence_url: url.href,
          proposed_public_change: change,
          review_status: "proposed_not_submitted",
          created_date: new Date().toISOString().slice(0, 10),
          warning:
            "Public information only. No personal cases or contact details. Requires human review before publication.",
        },
        null,
        2,
      ),
      "sakhi-public-correction.json",
    );
    notify(
      "Correction proposal downloaded. Nothing was submitted or published.",
    );
  }
  return (
    <section className="community-page" lang="en-IN" dir="ltr">
      <div className="section-folio">
        <span>PUBLIC BENEFIT / OPEN CONTRIBUTION</span>
        <span>Built by Kriseva</span>
      </div>
      <div className="page-intro">
        <h1 tabIndex={-1}>For the community. By the community.</h1>
        <p>
          Free to use. Open to improve. A useful public resource grows through
          careful sourcing, language review and accessible design.
        </p>
      </div>
      <div className="community-principles">
        {[
          {
            n: "01",
            title: "No business model built on your concern.",
            text: "No advertising, payment funnel, sale of personal data or narrative database in this project. “Public benefit” describes our intent, not a registered nonprofit status.",
          },
          {
            n: "02",
            title: "Community work, with accountable review.",
            text: "Propose public-source corrections, translations and accessibility improvements. Critical information never goes live because of an unreviewed edit or a popularity vote.",
          },
          {
            n: "03",
            title: "Clear about what is real.",
            text: "Source-checked public links are independent services. There are no Sakhi institutional integrations, staffed WhatsApp desk or authority-alert agreements. Human review gates remain open.",
          },
        ].map((p) => (
          <article key={p.n}>
            <span className="micro-label">{p.n}</span>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
      <div className="contribution-workbench">
        <div>
          <span className="micro-label">A USEFUL FIRST CONTRIBUTION</span>
          <h2>
            Help make one
            <br />
            public record <em>more accurate.</em>
          </h2>
          <p>
            Prepare a local correction with an authoritative source. It is a
            file for a maintainer to review, not a public submission or a
            complaint.
          </p>
          <ul className="check-list">
            <li>
              <Check size={16} />
              Public facts and source links only
            </li>
            <li>
              <Check size={16} />
              No personal stories or identities
            </li>
            <li>
              <Check size={16} />
              No intimate media or private contacts
            </li>
            <li>
              <Check size={16} />
              No automatic publication
            </li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            proposal();
          }}
        >
          <label htmlFor="public-resource-id">Public resource ID</label>
          <input
            id="public-resource-id"
            maxLength={50}
            required
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            placeholder="For example: legal"
            autoComplete="off"
          />
          <label htmlFor="evidence-url">Official evidence URL</label>
          <input
            id="evidence-url"
            type="url"
            maxLength={300}
            required
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="https://nalsa.gov.in/womens-assistance/"
            autoComplete="off"
          />
          <label htmlFor="public-change">
            Proposed public correction (optional)
          </label>
          <textarea
            id="public-change"
            maxLength={800}
            rows={3}
            value={change}
            onChange={(e) => setChange(e.target.value)}
            placeholder="Public information only. Do not include a personal case."
          />
          <p className="small-note">
            This text is held only in this page’s memory. A downloaded proposal
            may remain on your device or in backups.
          </p>
          {error && (
            <p role="alert" className="notice">
              {error}
            </p>
          )}
          <button className="button primary wide" disabled={demo}>
            <Download size={16} />
            Download correction proposal
          </button>
        </form>
      </div>
      <div className="community-release-note">
        <h2>A stronger interface is not a safety certification.</h2>
        <p>
          We still need qualified safeguarding, contact verification, language
          review, physical-device tests and independent security review before a
          verified public release. No public GitHub remote has been created in
          this local preview.
        </p>
        <span className="text-button">
          Source and contribution files are included in this checkout{" "}
          <ArrowRight size={15} />
        </span>
      </div>
    </section>
  );
}
