import { ArrowRight } from "lucide-react";
import { useState } from "react";
export const GOAL_GUIDES: Record<
  string,
  { label: string; title: string; steps: string[] }
> = {
  understand: {
    label: "Understand my options",
    title: "Start with information. Decide later.",
    steps: [
      "Compare the published purpose of each service.",
      "Check its source, scope and review date.",
      "Read more, explore another option, or stop here.",
    ],
  },
  report: {
    label: "Explore reporting options",
    title: "Explore the process before choosing to report.",
    steps: [
      "Read the current instructions on the official portal.",
      "Review what personal information that service requests.",
      "Only your action on that service can submit a complaint.",
    ],
  },
  support: {
    label: "Find support",
    title: "Support can start without a report.",
    steps: [
      "Look at the service’s published support and eligibility.",
      "Ask the service what it can offer and what information it needs.",
      "Availability and acceptance must be confirmed with that service.",
    ],
  },
  friend: {
    label: "Help someone else",
    title: "Keep their details out of the lookup.",
    steps: [
      "Explore general options without entering their identity.",
      "A public help card contains links, not a personal story.",
      "The person using a service chooses what to share there.",
    ],
  },
};
export function ResultGuide({ goal }: { goal: string }) {
  const [prepared, setPrepared] = useState<number[]>([]);
  const guide = GOAL_GUIDES[goal] ?? GOAL_GUIDES.understand;
  return (
    <aside className="result-guide" lang="en-IN" dir="ltr">
      <div>
        <span className="micro-label">YOUR CHOICE / {guide.label}</span>
        <h2>{guide.title}</h2>
        <p>
          You do not have to explain everything to take one useful step. These
          are options for you to consider, at your pace.
        </p>
        <p role="status">
          {prepared.length} of {guide.steps.length} preparation steps marked.
          Nothing submitted or sent.
        </p>
      </div>
      <ol>
        {guide.steps.map((step, i) => (
          <li key={step}>
            <ArrowRight size={15} />
            <label className="preparation-check">
              <input
                type="checkbox"
                checked={prepared.includes(i)}
                onChange={() =>
                  setPrepared((values) =>
                    values.includes(i)
                      ? values.filter((value) => value !== i)
                      : [...values, i],
                  )
                }
              />
              <span>{step}</span>
            </label>
          </li>
        ))}
      </ol>
      <p className="small-note">
        Your checklist stays on this page and clears when you leave or clear the
        session. It does not confirm eligibility, availability, a referral or a
        complaint. If an option does not fit, compare another public service
        below.
      </p>
    </aside>
  );
}
