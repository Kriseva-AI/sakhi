import { useEffect, useRef, useState } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
export interface Destination {
  url: string;
  title: string;
}
export function OutboundModal({
  destination,
  demo,
  t,
  close,
}: {
  destination: Destination;
  demo: boolean;
  t: (key: string) => string;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    return () => previous?.focus();
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
      <h2 id="outbound-title">{t("leaveTitle")}</h2>
      <p>{destination.title}</p>
      <div className="destination">
        <span>{t("destination")}</span>
        <strong>{domain}</strong>
        <code>{destination.url}</code>
      </div>
      {demo ? (
        <p className="notice">{t("demoDisabled")}</p>
      ) : (
        <>
          <p>{t("payload")}</p>
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
              else close();
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
