import { useEffect, useRef, useState } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
export interface Destination {
  url: string;
  title: string;
  kind?: "public_link" | "map" | "whatsapp";
  fields?: { label: string; value: string }[];
  disclosure?: string;
  onOpen?: () => void;
}
export function OutboundModal({
  destination,
  demo,
  t,
  close,
  returnFocus,
}: {
  destination: Destination;
  demo: boolean;
  t: (key: string) => string;
  close: () => void;
  returnFocus?: HTMLElement | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(returnFocus ?? null);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const dialog = ref.current;
    if (!trigger.current)
      trigger.current = document.activeElement as HTMLElement;
    dialog?.showModal();
    dialog
      ?.querySelector<HTMLElement>("#outbound-title")
      ?.focus({ preventScroll: true });
    if (dialog) dialog.scrollTop = 0;
    return () => {
      dialog?.close();
      if (trigger.current?.isConnected) trigger.current.focus();
    };
  }, []);
  const domain = destination.url.startsWith("tel:")
    ? destination.url
    : new URL(destination.url).hostname;
  return (
    <dialog
      ref={ref}
      className="outbound"
      onCancel={close}
      aria-labelledby="outbound-title"
      lang="en-IN"
      dir="ltr"
    >
      <div className="modal-icon">
        <ShieldCheck size={26} />
      </div>
      <h2 id="outbound-title" tabIndex={-1}>
        {t("leaveTitle")}
      </h2>
      <p>{destination.title}</p>
      <div className="destination">
        <span>{t("destination")}</span>
        <strong>{domain}</strong>
        {destination.fields?.length ? (
          <details className="address-details">
            <summary>Show exact encoded address</summary>
            <code>{destination.url}</code>
          </details>
        ) : (
          <code>{destination.url}</code>
        )}
      </div>
      {demo ? (
        <p className="notice">{t("demoDisabled")}</p>
      ) : (
        <>
          <p>{destination.disclosure || t("payload")}</p>
          {destination.fields && (
            <dl className="payload-fields">
              {destination.fields.map((field) => (
                <div key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p>{t("deviceBody")}</p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>{t("deviceCheck")}</span>
          </label>
          <a
            className={`button primary ${!checked ? "disabled" : ""}`}
            href={checked ? destination.url : undefined}
            aria-disabled={!checked}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!checked) e.preventDefault();
              else {
                destination.onOpen?.();
                close();
              }
            }}
          >
            {t("continue")}
            <ExternalLink size={16} />
          </a>
        </>
      )}
      <button className="button quiet" onClick={close}>
        {t("stay")}
      </button>
    </dialog>
  );
}
