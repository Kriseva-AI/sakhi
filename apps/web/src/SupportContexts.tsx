import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import type { Category } from "../../../packages/contracts";
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
export function SupportContexts({
  t,
  start,
  languageFor,
}: {
  t: (key: string) => string;
  start: (category?: Category, goal?: string) => void;
  languageFor: (key: string) => string;
}) {
  const [context, setContext] = useState("before");
  const current = contexts.find((c) => c.id === context)!;
  return (
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
            onClick={() => start(key === "friend" ? "friend" : undefined, key)}
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
  );
}
