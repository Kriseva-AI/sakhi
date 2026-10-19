import { useState } from "react";
import { moveTab } from "./tabs";
import {
  ArrowRight,
  Check,
  MonitorSmartphone,
  ExternalLink,
  Trash2,
} from "lucide-react";
const states = [
  {
    id: "inside",
    label: "Inside Sakhi",
    icon: MonitorSmartphone,
    title: "Only your language preference is saved.",
    body: "Your choices and words stay in temporary app memory. If you ask for a pathway, this local server processes the words without saving or logging them. No account, evidence upload or cloud model is needed.",
    fields: [
      "Browser: temporary choices",
      "Local server: public-resource lookup",
      "Persistent preference: language only",
    ],
  },
  {
    id: "outside",
    label: "Opening a service",
    icon: ExternalLink,
    title: "You see the destination and the data first.",
    body: "Official links carry no story or form fields. A map search carries only the selected public query. A WhatsApp public card contains only the shown resource text. The external service sees normal browser information and applies its own privacy rules.",
    fields: [
      "Exact domain before leaving",
      "Action-specific public fields shown",
      "You choose whether to continue",
    ],
  },
  {
    id: "erase",
    label: "Clearing the session",
    icon: Trash2,
    title: "App memory clears. External copies can remain.",
    body: "Clear session drops app-held choices and cancels pending navigation. It does not erase browser history, public downloads, clipboard content, screenshots, OS backups or another service’s records. It is not a stealth feature.",
    fields: [
      "Pending lookup cancelled",
      "Temporary state discarded",
      "History and external copies not controlled",
    ],
  },
];
export function DataBoundary({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("inside");
  const selected = states.find((x) => x.id === active)!;
  const Icon = selected.icon;
  return (
    <section
      className={`data-boundary ${compact ? "compact" : ""}`}
      lang="en-IN"
      dir="ltr"
    >
      <div className="section-folio">
        <span>YOUR INFORMATION / YOUR CONTROL</span>
        <span>No hidden handoff</span>
      </div>
      <div className="boundary-heading">
        <h2>
          Your concern is not
          <br />
          <em>a data collection form.</em>
        </h2>
        <p>
          Understand the boundary before choosing a next step. There is no
          account, advertising or sale of personal information in this project.
        </p>
      </div>
      <div
        className="boundary-tabs"
        role="tablist"
        aria-label="How Sakhi handles information"
      >
        {states.map((s, i) => (
          <button
            key={s.id}
            id={`data-tab-${s.id}`}
            role="tab"
            aria-selected={active === s.id}
            aria-controls="data-panel"
            tabIndex={active === s.id ? 0 : -1}
            onKeyDown={(e) =>
              moveTab(
                e,
                states.map((x) => x.id),
                active,
                setActive,
              )
            }
            onClick={() => setActive(s.id)}
          >
            <span aria-hidden="true">0{i + 1}</span>
            {s.label}
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      <div
        className="boundary-panel"
        role="tabpanel"
        id="data-panel"
        tabIndex={0}
        aria-labelledby={`data-tab-${selected.id}`}
      >
        <div className="boundary-visual" aria-hidden="true">
          <Icon size={35} strokeWidth={1.2} />
          <span>
            {selected.id === "inside"
              ? "THIS DEVICE"
              : selected.id === "outside"
                ? "YOUR CHOICE"
                : "CLEAR APP MEMORY"}
          </span>
          <div className="boundary-line" />
        </div>
        <div>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
          <ul>
            {selected.fields.map((f) => (
              <li key={f}>
                <Check size={15} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
