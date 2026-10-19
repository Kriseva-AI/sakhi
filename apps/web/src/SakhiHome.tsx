import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Check,
  FileText,
} from "lucide-react";
import type { Category, Page } from "../../../packages/contracts";
import type { Destination } from "./Modal";
import { PublicPathways } from "./PublicPathways";
import { DataBoundary } from "./DataBoundary";
import { topics } from "./Finder";
import { moveTab } from "./tabs";
const contexts = [
  {
    id: "before",
    label: "Before a concern",
    title: "Build a little readiness, without sharing anything personal.",
    body: "Understand digital privacy, know public support options, and keep a general help kit if that works for you.",
    note: "PREPARE · LEARN · CHOOSE",
  },
  {
    id: "now",
    label: "Something feels off",
    title: "You do not have to name it to explore your options.",
    body: "Choose what you want to understand. You can skip free text, compare support and take no action at all.",
    note: "UNDERSTAND · EXPLORE · DECIDE",
  },
  {
    id: "after",
    label: "After an incident",
    title: "Explore support without committing to a complaint.",
    body: "Look at public support, legal-aid and reporting pathways. A qualified service can explain what is appropriate for you.",
    note: "SUPPORT · INFORMATION · NEXT STEPS",
  },
];
export function SakhiHome({
  t,
  start,
  synthetic,
  open,
  go,
  languageFor,
}: {
  t: (k: string) => string;
  start: (c?: Category, g?: string) => void;
  synthetic: () => void;
  open: (d: Destination) => void;
  go: (p: Page) => void;
  languageFor: (key: string) => string;
}) {
  const [context, setContext] = useState("before");
  const current = contexts.find((c) => c.id === context)!;
  return (
    <>
      <section className="sprint2-hero" lang="en-IN" dir="ltr">
        <div className="hero-folio">
          <span>A KRISEVA PUBLIC PROJECT</span>
          <span>INDIA / PREPARE + SUPPORT</span>
        </div>
        <div className="sprint2-hero-grid">
          <div className="sprint2-hero-copy">
            <p className="hero-annotation">
              Before a concern. When something feels wrong. After an incident.
            </p>
            <h1 tabIndex={-1} lang={languageFor("hero")}>
              {t("hero")
                .split("\n")
                .map((line, i) => (
                  <span key={line}>
                    {i === 1 ? <em>{line}</em> : line}
                    {i === 0 ? <br /> : null}
                  </span>
                ))}
            </h1>
            <p className="sprint2-intro" lang="en-IN">
              A clear starting point for public support in India. Understand
              your options without giving us your identity or telling your whole
              story.
            </p>
            <div className="sprint2-primary-actions">
              <button
                className="button primary"
                lang={languageFor("start")}
                onClick={() => start()}
              >
                {t("start")}
                <ArrowRight size={18} />
              </button>
              <button
                className="button secondary"
                onClick={() => go("prepare")}
              >
                Prepare & learn
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="sprint2-trustline">
              <span>
                <Check size={15} />
                Free to use
              </span>
              <span>
                <Check size={15} />
                No account
              </span>
              <span>
                <Check size={15} />
                No story stored
              </span>
            </div>
            <button
              className="example-button"
              lang={languageFor("example")}
              onClick={synthetic}
            >
              <span className="play-circle" aria-hidden="true">
                ▷
              </span>
              {t("example")}
            </button>
          </div>
          <div className="action-desk" lang="en-IN" dir="ltr">
            <div className="action-desk-top">
              <span>YOUR STARTING POINT</span>
              <span className="desk-status">
                <i />
                On your terms
              </span>
            </div>
            <div
              className="context-tabs"
              role="tablist"
              aria-label="Choose where to start"
            >
              {contexts.map((c) => (
                <button
                  key={c.id}
                  id={`context-tab-${c.id}`}
                  role="tab"
                  aria-selected={context === c.id}
                  aria-controls="context-panel"
                  tabIndex={context === c.id ? 0 : -1}
                  onKeyDown={(e) =>
                    moveTab(
                      e,
                      contexts.map((x) => x.id),
                      context,
                      setContext,
                    )
                  }
                  onClick={() => setContext(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div
              className="context-copy"
              role="tabpanel"
              id="context-panel"
              tabIndex={0}
              aria-labelledby={`context-tab-${current.id}`}
            >
              <span className="micro-label">{current.note}</span>
              <h2>{current.title}</h2>
              <p>{current.body}</p>
            </div>
            <div className="desk-goals">
              {[
                {
                  key: "understand",
                  icon: BookOpen,
                  sub: "Learn what support is available",
                },
                {
                  key: "report",
                  icon: FileText,
                  sub: "Understand the official process",
                },
                {
                  key: "support",
                  icon: HeartHandshake,
                  sub: "Explore support beyond a complaint",
                },
                {
                  key: "friend",
                  icon: ShieldCheck,
                  sub: "Help without entering their details",
                },
              ].map(({ key, icon: Icon, sub }, i) => (
                <button
                  key={key}
                  onClick={() =>
                    start(key === "friend" ? "friend" : undefined, key)
                  }
                >
                  <span className="desk-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>
                    <strong id={`desk-goal-${key}`} lang={languageFor(key)}>
                      {t(key)}
                    </strong>
                    <small id={`desk-goal-detail-${key}`}>{sub}</small>
                  </span>
                  <Icon size={18} />
                  <ArrowRight size={17} />
                </button>
              ))}
            </div>
            <div className="desk-foot">
              You choose. Sakhi explains. Nothing is sent for you.
            </div>
          </div>
        </div>
      </section>
      <PublicPathways open={open} />
      <section className="concern-index" lang="en-IN" dir="ltr">
        <div className="section-folio">
          <span>01 / FIND A RELEVANT START</span>
          <span>No need to label what happened</span>
        </div>
        <div className="index-heading">
          <h2>What’s on your mind?</h2>
          <p>
            Public options for everyday doubts and difficult moments. You can
            start with a topic, change course, or simply read.
          </p>
        </div>
        <div className="concern-list">
          {topics.map(({ category, key, icon: Icon }, i) => (
            <button
              key={category}
              onClick={() => start(category, "understand")}
            >
              <span className="concern-index-number">0{i + 1}</span>
              <Icon size={22} strokeWidth={1.3} />
              <span>
                <strong lang={languageFor(key)}>{t(key)}</strong>
                <small>{t(`detail${category}`)}</small>
              </span>
              <ArrowUpRight size={21} />
            </button>
          ))}
        </div>
      </section>
      <section className="preparedness-promo" lang="en-IN" dir="ltr">
        <div>
          <span className="micro-label">SUPPORT STARTS BEFORE A REPORT</span>
          <h2>
            Not every concern
            <br />
            starts with <em>an incident.</em>
          </h2>
          <p>
            Learn how to explore support, understand digital privacy, and
            prepare a public help kit. No quiz. No risk score. No pressure to
            tell us more.
          </p>
          <button className="button primary" onClick={() => go("prepare")}>
            Explore the preparation library
            <ArrowRight size={17} />
          </button>
        </div>
        <div
          className="readiness-diagram"
          aria-label="A public preparation path"
        >
          <div>
            <span>01</span>
            <strong>Understand</strong>
            <p>Know the kinds of support.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Prepare</strong>
            <p>Choose public information to keep.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Decide</strong>
            <p>Open a service only when you choose.</p>
          </div>
          <p className="diagram-note">
            A map of options, never a prediction of safety.
          </p>
        </div>
      </section>
      <DataBoundary />
      <section className="community-promo" lang="en-IN" dir="ltr">
        <span className="micro-label">FREE TO USE / OPEN TO CONTRIBUTE</span>
        <h2>
          For the community.
          <br />
          <em>By the community.</em>
        </h2>
        <p>
          A public-benefit project by Kriseva. No advertising, payment funnel or
          sale of personal data. The useful work is a maintained directory,
          readable information and accountable review.
        </p>
        <button className="text-button" onClick={() => go("community")}>
          See how to contribute
          <ArrowUpRight size={17} />
        </button>
        <div className="community-proof">
          <span>
            <b>7</b>preview-curated public entries
          </span>
          <span>
            <b>16</b>locale shells, review pending
          </span>
          <span>
            <b>0</b>institutional integrations claimed
          </span>
        </div>
      </section>
    </>
  );
}
