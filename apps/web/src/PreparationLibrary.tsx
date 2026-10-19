import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  FileText,
} from "lucide-react";
import type { Destination } from "./Modal";
import { pack, download } from "./local";
import {
  buildPublicKit,
  buildWhatsAppCard,
  PUBLIC_SERVICE_QUESTIONS,
} from "./public-actions";
export const PREPARATION_GUIDES = [
  {
    id: "digital",
    label: "Digital privacy",
    title: "Start with the device you trust",
    intro:
      "A device can reveal more than the words you type. Public information is available without sharing a story.",
    points: [
      "Sakhi does not request images, access your microphone or use your location.",
      "Someone who can see your screen, history or backups may still see your activity.",
      "Specialist technology-safety guidance can help explain device risks. Personalized safety planning belongs with qualified support.",
    ],
    source:
      "https://www.techsafety.org/resources-survivors/technology-safety-plan",
    publisher: "NNEDV Safety Net",
    scope:
      "Technology-awareness reference. US services are not Indian referral options.",
  },
  {
    id: "options",
    label: "Know your options",
    title: "Information can be a first step",
    intro:
      "You can explore public information, support and legal-aid routes before deciding whether to make a complaint.",
    points: [
      "Women Helpline describes information and support, including connection to One Stop Centres. Its current page excludes West Bengal.",
      "NALSA publishes assistance information for women and legal-services authorities.",
      "The external service decides its own scope and information requirements. Sakhi has not contacted it.",
    ],
    source: "https://wcd.gov.in/women/help",
    publisher: "Ministry of Women and Child Development",
    scope:
      "Public service information. Local availability and acceptance are unverified.",
  },
  {
    id: "recovery",
    label: "After an incident",
    title: "Support can mean more than reporting",
    intro:
      "Different public services address different needs. You can compare options or stop here without making a decision.",
    points: [
      "One Stop Centres describe several types of support, including legal, medical and counselling services.",
      "A public description is not a confirmed appointment, available bed or accepted referral.",
      "For immediate danger in India, use the direct 112 pathway. Do not wait for Sakhi to arrange help.",
    ],
    source:
      "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294887&lang=1&reg=1",
    publisher: "Ministry of Women and Child Development, PIB",
    scope:
      "August 5, 2026 publication, data through June 30. No individual centre availability.",
  },
  {
    id: "friend",
    label: "For a friend",
    title: "Explore together, without their details",
    intro:
      "You can look up general options for someone else. Their identity and experience do not need to enter Sakhi.",
    points: [
      "The Women Helpline source includes someone calling on a woman’s behalf.",
      "A shared public card contains resource links, not a person’s experience.",
      "Sakhi does not assess another person, decide what happened or contact anyone for them. Expert bystander training is outside this preview.",
    ],
    source: "https://wcd.gov.in/women/help",
    publisher: "Ministry of Women and Child Development",
    scope: "General public discovery, not personalized intervention guidance.",
  },
  {
    id: "process",
    label: "Reporting literacy",
    title: "Opening a portal is not a submitted complaint",
    intro:
      "Understanding the stages helps you retain control of what happens next.",
    points: [
      "Opening: you view an independent website. No complaint has been sent by Sakhi.",
      "Submitting: you choose what to enter and submit on that official site. Its requirements apply.",
      "Acceptance, acknowledgement and action are separate provider events. Sakhi cannot infer them from a click.",
    ],
    source: "https://ncwapps.nic.in/onlinecomplaintsv2/frmFAQs.aspx",
    publisher: "National Commission for Women",
    scope:
      "Process-literacy summary. Check the current official instructions for scope.",
  },
];
export function PreparationLibrary({
  open,
  demo = false,
  notify,
  onFind,
}: {
  open: (d: Destination) => void;
  demo?: boolean;
  notify: (s: string) => void;
  onFind: () => void;
}) {
  const [active, setActive] = useState("digital");
  const [selected, setSelected] = useState(["legal", "women"]);
  const guide = PREPARATION_GUIDES.find((g) => g.id === active)!;
  function toggle(id: string) {
    setSelected((values) =>
      values.includes(id) ? values.filter((v) => v !== id) : [...values, id],
    );
  }
  return (
    <section className="prepare-page" lang="en-IN" dir="ltr">
      <div className="section-folio">
        <span>01 / PREPARE & UNDERSTAND</span>
        <span>Public information only</span>
      </div>
      <div className="page-intro">
        <h1 tabIndex={-1}>
          A little readiness.
          <br />
          <em>More room to choose.</em>
        </h1>
        <p>
          Before something happens, when something feels off, or after an
          incident. Start with clear information, at your pace.
        </p>
      </div>
      <div className="prepare-layout">
        <aside className="guide-menu" aria-label="Preparation topics">
          {PREPARATION_GUIDES.map((g) => (
            <button
              key={g.id}
              aria-pressed={active === g.id}
              onClick={() => setActive(g.id)}
            >
              {g.label}
              <ArrowRight size={16} />
            </button>
          ))}
          <div className="small-note">
            General guidance is in English. Safeguarding and language review are
            pending.
          </div>
        </aside>
        <article className="guide-content" aria-live="polite">
          <span className="micro-label">PUBLIC LEARNING / REVIEW PENDING</span>
          <h2>{guide.title}</h2>
          <p className="lead-copy">{guide.intro}</p>
          <ol className="guide-points">
            {guide.points.map((point, i) => (
              <li key={point}>
                <span>0{i + 1}</span>
                <p>{point}</p>
              </li>
            ))}
          </ol>
          <div className="guide-source">
            <FileText size={18} />
            <div>
              <strong>{guide.publisher}</strong>
              <p>
                Source checked 19 Oct 2026. Review by 18 Nov 2026. Human review
                pending.
                {new Date().toISOString().slice(0, 10) > "2026-11-18"
                  ? " Source review is overdue."
                  : ""}
              </p>
              <p>{guide.scope}</p>
              <button
                className="text-button"
                onClick={() =>
                  open({ url: guide.source, title: guide.publisher })
                }
              >
                Preview this source
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <button className="button primary" onClick={onFind}>
            Find my next step
            <ArrowRight size={17} />
          </button>
        </article>
      </div>
      <section className="public-kit">
        <div>
          <span className="micro-label">02 / A PUBLIC KIT, ON YOUR TERMS</span>
          <h2>
            Keep the information.
            <br />
            <em>Leave the story out.</em>
          </h2>
          <p>
            Choose public resources and general questions. The kit contains no
            incident, name, identity or location.
          </p>
          <details className="kit-questions">
            <summary>Questions included in your public kit</summary>
            <ul>
              {PUBLIC_SERVICE_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </details>
          <p className="small-note">
            A file or shared link can remain on your device, browser history or
            another person’s phone. Consider your device before choosing an
            action.
          </p>
        </div>
        <div className="kit-controls">
          {pack.resources
            .filter((r) =>
              ["legal", "women", "cyber", "emergency"].includes(r.id),
            )
            .map((r) => (
              <label key={r.id} className="kit-option">
                <input
                  type="checkbox"
                  checked={selected.includes(r.id)}
                  onChange={() => toggle(r.id)}
                  aria-label={`Add ${r.id === "legal" ? "legal aid information" : r.title.toLowerCase()} to my public kit`}
                />
                <span>
                  <strong>{r.title}</strong>
                  <small>{new URL(r.url).hostname}</small>
                </span>
                {selected.includes(r.id) && <Check size={17} />}
              </label>
            ))}
          <button
            className="button primary wide"
            disabled={demo || !selected.length}
            onClick={() => {
              download(buildPublicKit(selected), "sakhi-public-kit.txt");
              notify(
                "Public kit downloaded. It contains no story or location.",
              );
            }}
          >
            <Download size={17} />
            Download my public kit
          </button>
          <button
            className="text-button"
            disabled={demo || !selected.length}
            onClick={() => open(buildWhatsAppCard(selected))}
          >
            Preview WhatsApp public card
            <ArrowUpRight size={16} />
          </button>
          {demo && (
            <p className="small-note">
              Downloads and sharing are disabled in this fictional example.
            </p>
          )}
        </div>
      </section>
    </section>
  );
}
