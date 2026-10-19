import { ArrowRight, Check } from "lucide-react";
import type { Category } from "../../../packages/contracts";

export function SakhiHome({
  t,
  start,
  synthetic,
  languageFor,
}: {
  t: (key: string) => string;
  start: (category?: Category, goal?: string) => void;
  synthetic: () => void;
  languageFor: (key: string) => string;
}) {
  return (
    <section className="simple-home sprint2-hero" lang="en-IN" dir="ltr">
      <p className="simple-kicker">A free public guide</p>
      <h1 tabIndex={-1} lang={languageFor("hero")}>
        {t("hero")
          .split("\n")
          .map((line, index) => (
            <span key={line} className={index === 1 ? "pink-line" : undefined}>
              {line}
              {index === 0 ? " " : ""}
            </span>
          ))}
      </h1>
      <p className="simple-intro sprint2-intro">
        Explore public support in India, before or after a concern.
      </p>
      <button
        className="button primary simple-start"
        lang={languageFor("start")}
        onClick={() => start()}
      >
        {t("start")}
        <ArrowRight size={19} />
      </button>
      <ul className="simple-facts" aria-label="What to expect">
        <li>
          <Check size={15} aria-hidden="true" />
          Free to use
        </li>
        <li>
          <Check size={15} aria-hidden="true" />
          No login
        </li>
        <li>
          <Check size={15} aria-hidden="true" />
          No story stored
        </li>
      </ul>
      <button
        className="text-button simple-friend"
        lang={languageFor("friend")}
        onClick={() => start("friend", "friend")}
      >
        {t("friend")}
        <ArrowRight size={16} />
      </button>
      <button
        className="example-button simple-example"
        lang={languageFor("example")}
        onClick={synthetic}
      >
        {t("example")}
      </button>
    </section>
  );
}
