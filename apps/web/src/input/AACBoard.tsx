import { useState } from "react";
import {
  HeartHandshake,
  Smartphone,
  BriefcaseBusiness,
  Scale,
  HelpCircle,
  Phone,
  Undo2,
} from "lucide-react";
import type { Category } from "../../../../packages/contracts";

const concepts = [
  { id: "cyber", label: "Online concern", Icon: Smartphone },
  { id: "home", label: "Home concern", Icon: HeartHandshake },
  { id: "workplace", label: "Work concern", Icon: BriefcaseBusiness },
  { id: "legal", label: "Legal information", Icon: Scale },
  { id: "unsure", label: "Not sure", Icon: HelpCircle },
] as const;

/** Labelled native buttons work with keyboard and assistive pointer input.
 * Physical switch/eye-gaze compatibility still requires independent testing. */
export function AACBoard({
  onConfirm,
  onClose,
}: {
  onConfirm: (category: Category) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<Category>();
  return (
    <section
      className="input-workspace"
      aria-label="Symbol and text choices"
      lang="en-IN"
      dir="ltr"
    >
      <h2>Point to what you need</h2>
      <p>
        No speaking or typing needed. Choose a symbol, then check your choice.
        Nothing is read aloud.
      </p>
      <div className="symbol-grid">
        {concepts.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={selected === id}
            onClick={() => setSelected(id)}
          >
            <Icon size={30} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <p role="status">
        {selected
          ? `Your choice: ${concepts.find((c) => c.id === selected)?.label}. You can change it.`
          : "No choice yet. Take your time."}
      </p>
      <div className="input-actions">
        <button
          type="button"
          className="button primary"
          disabled={!selected}
          onClick={() => selected && onConfirm(selected)}
        >
          Use this choice
        </button>
        <button
          type="button"
          className="button quiet"
          disabled={!selected}
          onClick={() => setSelected(undefined)}
        >
          <Undo2 size={16} />
          Undo choice
        </button>
        <button type="button" className="text-button" onClick={onClose}>
          Close symbols
        </button>
      </div>
      <a className="button quiet" href="tel:112">
        <Phone size={18} />
        Immediate danger: call 112
      </a>
      <p className="small-note">
        This link opens your device’s phone action. Sakhi cannot place, monitor
        or acknowledge a call. If calling is not possible, keep the public child
        and support information available; no silent dispatch is connected.
      </p>
    </section>
  );
}
