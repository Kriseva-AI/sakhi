import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
export interface Destination {
  url: string;
  title: string;
  kind?: "public_link" | "map" | "whatsapp";
  fields?: { label: string; value: string }[];
  disclosure?: string;
  onOpen?: () => void;
  sensitive?: boolean;
  expiresAt?: number;
  isValid?: () => boolean;
  onInvalidate?: () => void;
}
export function OutboundModal({
  destination,
  demo,
  t,
  close,
  returnFocus,
  hide,
  exit,
}: {
  destination: Destination;
  demo: boolean;
  t: (key: string) => string;
  close: () => void;
  returnFocus?: HTMLElement | null;
  hide?: () => void;
  exit?: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(returnFocus ?? null);
  const [checked, setChecked] = useState(false);
  const valid = () => !destination.isValid || destination.isValid();
  const invalidate = () => {
    destination.onInvalidate?.();
    close();
  };
  useEffect(() => {
    if (!destination.sensitive) return;
    const hidden = () => {
      if (document.hidden) invalidate();
    };
    document.addEventListener("visibilitychange", hidden);
    const timer =
      destination.expiresAt === undefined
        ? undefined
        : setTimeout(
            invalidate,
            Math.max(0, destination.expiresAt - Date.now()),
          );
    return () => {
      document.removeEventListener("visibilitychange", hidden);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [destination]);
  const activate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!checked || !valid()) {
      event.preventDefault();
      if (!valid()) invalidate();
      return;
    }
    destination.onOpen?.();
    close();
  };
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
      <div className="modal-safety">
        {hide && (
          <button className="button quiet" onClick={hide}>
            Hide page
          </button>
        )}
        {exit && (
          <button className="text-button" onClick={exit}>
            Quick exit to Google
          </button>
        )}
      </div>
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
            href={checked && valid() ? destination.url : undefined}
            aria-disabled={!checked || !valid()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={activate}
            onAuxClick={activate}
            onContextMenu={(event) => {
              if (!valid()) {
                event.preventDefault();
                invalidate();
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
