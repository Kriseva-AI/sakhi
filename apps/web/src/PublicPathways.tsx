import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { pack, isFresh } from "./local";
import type { Destination } from "./Modal";
const marks: Record<string, { short: string; description: string }> = {
  emergency: { short: "112", description: "Emergency response" },
  women: { short: "181", description: "Women Helpline & OSC information" },
  child: { short: "1098", description: "Child Helpline information" },
  legal: { short: "NALSA", description: "Public legal aid information" },
  cyber: {
    short: "CYBERCRIME",
    description: "National cybercrime reporting portal",
  },
  workplace: {
    short: "SHe-Box",
    description: "Workplace complaint information",
  },
  ncw: { short: "NCW", description: "Women’s complaint information" },
};
export function PublicPathways({ open }: { open: (d: Destination) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) =>
    ref.current?.scrollBy({
      left: direction * 320,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section className="pathway-section" lang="en-IN" dir="ltr">
      <div className="pathway-heading">
        <div>
          <span className="micro-label">PUBLIC PATHWAYS, IN ONE PLACE</span>
          <h2>
            Know the door.
            <br className="mobile-break" /> Then choose to open it.
          </h2>
        </div>
        <div className="rail-controls">
          <button
            aria-label="Scroll public pathways backward"
            onClick={() => scroll(-1)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Scroll public pathways forward"
            onClick={() => scroll(1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <p className="pathway-disclosure">
        Independent official services you can open. Public source checks are not
        institutional connections, live availability or referral acceptance.
      </p>
      <div
        ref={ref}
        className="pathway-rail"
        tabIndex={0}
        role="region"
        aria-label="Scrollable official public pathways"
      >
        {pack.resources.map((r) => (
          <button
            className="pathway-item"
            key={r.id}
            aria-describedby={`pathway-meta-${r.id}`}
            onClick={() => open({ url: r.url, title: r.title })}
          >
            <span className="pathway-mark">{marks[r.id].short}</span>
            <span className="sr-only"> · </span>
            <strong>{marks[r.id].description}</strong>
            <span className="pathway-host" aria-hidden="true">
              {new URL(r.url).hostname}
              <ArrowUpRight size={15} />
            </span>
            <small id={`pathway-meta-${r.id}`} aria-hidden="true">
              {r.jurisdiction}
              <br />
              {isFresh(r)
                ? `Checked ${r.checked_at}`
                : `Review overdue ${r.expires_at}`}
              <br />
              Human verification pending
            </small>
          </button>
        ))}
      </div>
    </section>
  );
}
