import { useState } from "react";
import { Columns2, ArrowRight } from "lucide-react";
import type { Resource } from "../../../packages/contracts";
import type { Destination } from "./Modal";
export function ResourceCompare({
  records,
  open,
}: {
  records: Resource[];
  open: (d: Destination) => void;
}) {
  const [shown, setShown] = useState(false);
  const available = records.filter(
    (r) => !["emergency", "child"].includes(r.id),
  );
  const [chosen, setChosen] = useState<string[] | null>(null);
  const selected = chosen ?? available.slice(0, 3).map((r) => r.id);
  const comparable = available.filter((r) => selected.includes(r.id));
  if (available.length < 2) return null;
  return (
    <section className="comparison" lang="en-IN" dir="ltr">
      <button
        className="button secondary"
        aria-expanded={shown}
        aria-controls="pathway-comparison"
        onClick={() => setShown(!shown)}
      >
        <Columns2 size={18} />
        {shown ? "Close comparison" : "Compare public pathways"}
      </button>
      {shown && (
        <div id="pathway-comparison" className="comparison-body">
          <h2>Different doors, different purposes.</h2>
          <p>
            Compare the published scope and what is known. Opening one does not
            commit you to using it.
          </p>
          <fieldset
            className="comparison-select"
            aria-describedby="comparison-instructions"
          >
            <legend>Choose up to three public pathways</legend>
            <p id="comparison-instructions" className="small-note">
              Uncheck a selected pathway to add another. Emergency and child
              fast lanes stay separate.
            </p>
            <div>
              {available.map((r) => (
                <label key={r.id}>
                  <input
                    type="checkbox"
                    checked={selected.includes(r.id)}
                    disabled={!selected.includes(r.id) && selected.length >= 3}
                    aria-label={`Compare ${r.title}`}
                    onChange={() =>
                      setChosen(
                        selected.includes(r.id)
                          ? selected.filter((id) => id !== r.id)
                          : [...selected, r.id],
                      )
                    }
                  />
                  <span>{r.title}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {comparable.length === 0 ? (
            <p role="status">
              Choose at least one pathway to show the comparison.
            </p>
          ) : (
            <div
              className="table-wrap"
              role="region"
              aria-label="Scrollable public pathway comparison"
              tabIndex={0}
            >
              <table aria-label="Public pathway comparison">
                <caption>
                  Published public information for your chosen pathways. Human
                  verification and availability confirmation are pending.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">What to compare</th>
                    {comparable.map((r) => (
                      <th key={r.id} scope="col">
                        {r.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Channel</th>
                    {comparable.map((r) => (
                      <td key={r.id}>
                        {r.phone
                          ? `Phone ${r.phone} or public information page`
                          : "Independent official website"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Eligibility and limits</th>
                    {comparable.map((r) => (
                      <td key={r.id}>
                        {r.eligibility}
                        <br />
                        {r.limitations}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Source and freshness</th>
                    {comparable.map((r) => (
                      <td key={r.id}>
                        {r.authority}
                        <br />
                        Checked {r.checked_at}
                        <br />
                        Review by {r.expires_at}
                        <br />
                        Human review pending
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">What Sakhi sends</th>
                    {comparable.map((r) => (
                      <td key={r.id}>
                        No story or form fields. You choose what to enter on the
                        external service.
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Choose a next step</th>
                    {comparable.map((r) => (
                      <td key={r.id}>
                        <button
                          className="text-button"
                          onClick={() => open({ url: r.url, title: r.title })}
                        >
                          Preview destination
                          <ArrowRight size={15} />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
