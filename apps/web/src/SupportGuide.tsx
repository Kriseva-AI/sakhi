import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileCheck2, Shield, Smartphone } from "lucide-react";
import type { Destination } from "./Modal";
import guidePack from "../../../data/public-seeds/support-guides.json";

export const GUIDE_SOURCES = {
  child: {
    title: "Child Helpline information",
    url: "https://wcd.gov.in/child/child-helpline",
    publisher: "Ministry of Women and Child Development",
  },
  ...guidePack.resources,
  cyber: {
    title: "Indian cybercrime portal",
    url: "https://cybercrime.gov.in/",
    publisher: "Ministry of Home Affairs",
  },
};
type Source = keyof typeof GUIDE_SOURCES;
export function SupportGuide({
  minor,
  open,
}: {
  minor: boolean;
  open: (d: Destination) => void;
}) {
  const [topic, setTopic] = useState(minor ? "" : "online");
  const [kind, setKind] = useState("");
  const [imageAge, setImageAge] = useState("");
  const panel = useRef<HTMLElement>(null);
  const selection = `${topic}:${kind}:${imageAge}`;
  const prior = useRef(selection);
  useEffect(() => {
    if (prior.current !== selection)
      panel.current
        ?.querySelector<HTMLElement>("h3")
        ?.focus({ preventScroll: true });
    prior.current = selection;
  }, [selection]);
  const source: Source | null =
    kind === "images"
      ? minor || imageAge === "young"
        ? "young"
        : imageAge === "adult"
          ? "adult"
          : null
      : null;
  const fresh = new Date().toISOString().slice(0, 10) <= guidePack.expires_at;
  function preview(id: Source) {
    const s = GUIDE_SOURCES[id];
    open({ url: s.url, title: s.title });
  }
  return (
    <section
      ref={panel}
      className="support-guide"
      aria-label="Next step companion"
      lang="en-IN"
      dir="ltr"
    >
      <div className="guide-heading">
        <Shield size={24} aria-hidden="true" />
        <div>
          <span className="micro-label">LET’S FIND A USEFUL NEXT STEP</span>
          <h2>
            {minor
              ? "Help for someone under 18."
              : "Online abuse. A practical next step."}
          </h2>
        </div>
      </div>
      {minor && (
        <p>
          In India, Child Helpline 1098 is a starting point for child-protection
          support. If there is immediate danger, use 112. No adult complaint
          workflow or images are collected here.
        </p>
      )}
      {minor && !topic && (
        <>
          <h3 tabIndex={-1}>Is this about something online?</h3>
          <div className="guide-choices">
            <button
              className="button primary"
              onClick={() => setTopic("online")}
            >
              <Smartphone size={18} />
              Online abuse or images
            </button>
            <button className="button quiet" onClick={() => setTopic("other")}>
              Something else / not sure
            </button>
          </div>
        </>
      )}
      {topic === "online" && !kind && (
        <>
          <h3 tabIndex={-1}>Which next step would help?</h3>
          <div className="guide-choices">
            <button className="choice" onClick={() => setKind("account")}>
              Threats, fake account or stalking
              <ArrowRight size={17} />
            </button>
            <button className="choice" onClick={() => setKind("images")}>
              Intimate images or threats to share
              <ArrowRight size={17} />
            </button>
            <button className="text-button" onClick={() => setKind("unknown")}>
              Not sure / skip
            </button>
          </div>
        </>
      )}
      {kind === "images" && !minor && !imageAge && (
        <>
          <h3 tabIndex={-1}>How old was the person when the image was made?</h3>
          <p>No image or exact age is needed.</p>
          <div className="guide-choices">
            <button className="choice" onClick={() => setImageAge("young")}>
              Under 18 when it was made
              <ArrowRight size={17} />
            </button>
            <button className="choice" onClick={() => setImageAge("adult")}>
              18 or older then and now
              <ArrowRight size={17} />
            </button>
            <button
              className="text-button"
              onClick={() => setImageAge("unknown")}
            >
              Not sure / prefer not to say
            </button>
          </div>
        </>
      )}
      {source && (
        <div className="next-action" role="status">
          <span className="micro-label">YOUR NEXT ACTION</span>
          <h3 tabIndex={-1}>
            {source === "young"
              ? "Check Take It Down’s eligibility."
              : "Check StopNCII’s eligibility."}
          </h3>
          <p>
            {source === "young"
              ? "For intimate images made before age 18, including if the person is now an adult. The file must already be on their device. The service works with participating platforms, not the whole internet."
              : "For the person shown, if they are an adult now and were 18 or older in the intimate image, and already have the file. Read the provider’s current criteria; participating-platform coverage is limited."}
          </p>
          <p>
            <strong>
              Do not download, forward or upload intimate images to Sakhi.
            </strong>
          </p>
          {fresh ? (
            <button className="button primary" onClick={() => preview(source)}>
              Preview {GUIDE_SOURCES[source].title}
              <ArrowRight size={17} />
            </button>
          ) : (
            <p className="notice">
              This guidance is past its review date. Use the source below to
              check current scope before deciding.
            </p>
          )}
        </div>
      )}
      {(kind === "account" || kind === "unknown" || imageAge === "unknown") && (
        <div className="next-action" role="status">
          <h3 tabIndex={-1}>
            {imageAge === "unknown"
              ? "Eligibility is not established."
              : "Use the Indian cybercrime reporting entry point."}
          </h3>
          <p>
            Read the portal’s categories and information requirements before
            deciding to report. Anonymous reporting is limited to specific
            categories; it is not promised for every online concern. If the
            portal is unavailable,{" "}
            {minor
              ? "1098 remains a child-support option"
              : "the legal-aid option below can help you explore whom to approach"}
            .
          </p>
          <button className="button primary" onClick={() => preview("cyber")}>
            Preview cybercrime portal
            <ArrowRight size={17} />
          </button>
        </div>
      )}
      {topic === "other" && (
        <div className="next-action" role="status">
          <h3 tabIndex={-1}>Start with Child Helpline 1098.</h3>
          <p>
            You can read the Ministry’s scope before calling. Ask the service
            what information it needs and what happens next. Sakhi cannot
            promise confidentiality, connection or a response on its behalf. For
            immediate danger, use 112.
          </p>
          <button className="button primary" onClick={() => preview("child")}>
            Preview child-support information
          </button>
        </div>
      )}
      {(kind || topic === "other") && (
        <button
          className="text-button"
          onClick={() => {
            setTopic(minor ? "" : "online");
            setKind("");
            setImageAge("");
          }}
        >
          Change this choice
        </button>
      )}
      <div className="guide-receipt">
        <FileCheck2 size={18} aria-hidden="true" />
        <div>
          <strong>Source check: 2026-10-20 · Review by 2026-11-19</strong>
          <p>
            Agent source check only. Human safeguarding review pending. No
            service contacted.
          </p>
          <div className="guide-source-links">
            {(
              [
                ...(minor ? ["child"] : []),
                ...(source ? [source] : []),
                "cyber",
              ] as Source[]
            ).map((id) => (
              <button
                className="text-button"
                key={id}
                onClick={() => preview(id)}
              >
                Source: {GUIDE_SOURCES[id].title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="small-note">
        Alternative:{" "}
        {minor
          ? "Child Helpline 1098 and emergency 112 below"
          : "the official cybercrime and legal-aid options below"}
        . No report or takedown request has been made.{" "}
        {source &&
          "If the file is not already available, do not obtain a copy for this tool; use the provider’s support guidance or Indian reporting/support alternatives."}
      </p>
    </section>
  );
}
