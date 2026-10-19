import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Fingerprint,
  HelpCircle,
  HeartHandshake,
  Shield,
  Smartphone,
  Scale,
  BriefcaseBusiness,
} from "lucide-react";
import type { Category } from "../../../packages/contracts";
export const topics: {
  category: Category;
  key: string;
  icon: typeof Shield;
  detail: string;
}[] = [
  {
    category: "cyber",
    key: "cyber",
    icon: Smartphone,
    detail: "Impersonation, threats, digital harassment",
  },
  {
    category: "home",
    key: "homeConcern",
    icon: HeartHandshake,
    detail: "Violence, pressure, feeling unsafe",
  },
  {
    category: "workplace",
    key: "workplace",
    icon: BriefcaseBusiness,
    detail: "Harassment and institutional options",
  },
  {
    category: "legal",
    key: "legal",
    icon: Scale,
    detail: "Understand where to seek legal assistance",
  },
  {
    category: "friend",
    key: "friend",
    icon: HeartHandshake,
    detail: "Explore without sharing her details",
  },
  {
    category: "unsure",
    key: "unsure",
    icon: HelpCircle,
    detail: "Start with general support options",
  },
];
export function Finder({
  t,
  submit,
  cancel,
  initialCategory,
  initialGoal,
}: {
  t: (s: string) => string;
  submit: (
    text: string,
    cat: Category | undefined,
    under18: boolean,
    goal: string,
    scope: string,
  ) => Promise<void>;
  cancel: () => void;
  initialCategory?: Category;
  initialGoal?: string;
}) {
  const [step, setStep] = useState(initialGoal ? 1 : 0);
  const heading = useRef<HTMLHeadingElement>(null);
  const lastStep = useRef(step);
  useEffect(() => {
    if (lastStep.current !== step)
      heading.current?.focus({ preventScroll: true });
    lastStep.current = step;
  }, [step]);
  const [goal, setGoal] = useState(initialGoal || "understand");
  const [text, setText] = useState("");
  const [scope, setScope] = useState("India");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submission = useRef(0);
  const [category, setCategory] = useState<Category | undefined>(
    initialCategory,
  );
  async function finish(minor = false, cat = category) {
    const attempt = ++submission.current;
    setBusy(true);
    setError("");
    try {
      await submit(text, cat, minor, goal, scope);
    } catch {
      if (attempt === submission.current) setError(t("error"));
    } finally {
      if (attempt === submission.current) setBusy(false);
    }
  }
  return (
    <section className="finder panel" aria-labelledby="finder-heading">
      <div className="step-line">
        <span>
          {t("step")} {step + 1} / 3
        </span>
        <div className="steps" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <i key={n} className={n <= step ? "active" : ""} />
          ))}
        </div>
      </div>
      <h1
        ref={heading}
        id="finder-heading"
        tabIndex={-1}
        aria-live="polite"
        lang="en-IN"
      >
        {t(["goalQuestion", "ageQuestion", "situationQuestion"][step])}
      </h1>
      <p className="muted" lang="en-IN">
        {t("textHint")}
      </p>
      {busy && (
        <p role="status" lang="en-IN">
          Looking up public information. You can go back or clear the session to
          cancel.
        </p>
      )}
      {step === 0 && (
        <div className="choices">
          {["understand", "report", "support", "friend"].map((key) => (
            <button
              key={key}
              className="choice"
              onClick={() => {
                setGoal(key);
                if (key === "friend") setCategory("friend");
                setStep(1);
              }}
            >
              <span>{t(key)}</span>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="choices">
          <button className="choice" onClick={() => setStep(2)}>
            {t("adult")}
            <ArrowRight size={18} />
          </button>
          <button
            className="choice"
            disabled={busy}
            onClick={() => finish(true)}
          >
            {t("minor")}
            <ArrowRight size={18} />
          </button>
          <button className="text-button" onClick={() => setStep(2)}>
            {t("skipAge")}
          </button>
        </div>
      )}
      {step === 2 && (
        <form
          aria-busy={busy}
          onSubmit={(e) => {
            e.preventDefault();
            finish();
          }}
        >
          <fieldset>
            <legend className="sr-only">{t("situationQuestion")}</legend>
            <div className="topic-choices">
              {topics.map(({ category: c, key, icon: Icon }) => (
                <button
                  type="button"
                  key={c}
                  aria-pressed={category === c}
                  className={`topic-choice ${category === c ? "selected" : ""}`}
                  disabled={busy}
                  onClick={() => {
                    setCategory(c);
                    if (!text.trim()) void finish(false, c);
                  }}
                >
                  <Icon size={18} />
                  {t(key)}
                </button>
              ))}
            </div>
          </fieldset>
          <label htmlFor="concern">{t("textLabel")}</label>
          <textarea
            id="concern"
            maxLength={2000}
            rows={3}
            value={text}
            placeholder={t("placeholder")}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value) setCategory(undefined);
            }}
            aria-describedby="text-hint"
            autoComplete="off"
            spellCheck={false}
          />
          <p id="text-hint" className="small muted" lang="en-IN">
            {t("textHint")}
          </p>
          <label htmlFor="scope">{t("location")}</label>
          <select
            id="scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="India">{t("india")}</option>
            <option value="West Bengal">{t("westBengal")}</option>
            <option value="Other state or UT">{t("otherState")}</option>
          </select>
          <button className="button primary wide" disabled={busy}>
            <span lang={busy ? "en-IN" : undefined}>
              {busy ? "Looking up options" : t("showOptions")}
            </span>
            <ArrowRight size={18} />
          </button>
          <button
            className="text-button"
            type="button"
            disabled={busy}
            onClick={() => finish(false, "unsure")}
          >
            {t("skip")}
          </button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
      {step > 0 && (
        <button
          className="text-button back"
          onClick={() => {
            submission.current++;
            cancel();
            setBusy(false);
            setError("");
            setStep(step - 1);
          }}
        >
          <ArrowLeft size={16} />
          {t("back")}
        </button>
      )}
      <div className="inline-boundary" lang="en-IN">
        <Fingerprint size={17} />
        <span>
          {t("private")}. {t("control")}.
        </span>
      </div>
    </section>
  );
}
