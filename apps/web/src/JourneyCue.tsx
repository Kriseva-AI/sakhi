import type { Page } from "../../../packages/contracts";
const CUES: Record<Page, string[]> = {
  home: ["Choose", "Prepare", "You decide"],
  finder: ["Choose", "Check fit", "Next step"],
  resources: ["Check scope", "Prepare", "You decide"],
  prepare: ["Learn", "Make a list", "Decide later"],
  nearby: ["Choose area", "Check details", "Plan together"],
  trust: ["See data", "Choose consent", "Clear anytime"],
  community: ["Propose", "Human review", "Publish if approved"],
  maintenance: ["Check sources", "Review gaps", "Approve scope"],
  components: ["Read", "Interact", "Check access"],
};
export function JourneyCue({ page }: { page: Page }) {
  return (
    <ol
      className={`journey-cue cue-${page}`}
      aria-label="How this page helps"
      lang="en-IN"
      dir="ltr"
    >
      {CUES[page].map((text, i) => (
        <li key={text} data-cue>
          <span className="cue-number" aria-hidden="true">
            0{i + 1}
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  );
}
