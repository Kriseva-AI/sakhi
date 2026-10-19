import {
  ArrowUpRight,
  ChevronDown,
  FileCheck2,
  Download,
  Phone,
  Clock3,
} from "lucide-react";
import type { Resource } from "../../../packages/contracts";
import { download, helpCard, isFresh } from "./local";
import type { Destination } from "./Modal";
export function ResourceCard({
  resource: r,
  demo,
  t,
  open,
  onNotice,
}: {
  resource: Resource;
  demo: boolean;
  t: (key: string) => string;
  open: (d: Destination) => void;
  onNotice: (s: string) => void;
}) {
  return (
    <article className="resource-card" lang="en-IN" dir="ltr">
      <div className="resource-top">
        <span className="source-pill">
          <FileCheck2 size={14} />
          {t("sourceLabel")}
        </span>
        <span className="resource-scope">{r.jurisdiction}</span>
      </div>
      <h2>{r.title}</h2>
      <p>{r.summary}</p>
      <div className="host">
        <span className="dot" />
        {new URL(r.url).hostname}
        <ArrowUpRight size={13} />
      </div>
      <div className="resource-checked">
        <Clock3 size={15} />
        <div>
          <span>
            Checked {r.checked_at} · review by {r.expires_at}
          </span>
          <span>Human verification pending</span>
        </div>
      </div>
      {!isFresh(r) && (
        <p className="notice warning">
          <Clock3 size={16} />
          {t("stale")}
        </p>
      )}
      <div className="card-actions">
        <button
          className="button primary"
          onClick={() => open({ url: r.url, title: r.title })}
        >
          {t(demo ? "demoOpen" : "open")}
          <ArrowUpRight size={16} />
        </button>
        {r.phone && (
          <button
            className="button secondary"
            onClick={() =>
              open({ url: `tel:${r.phone}`, title: `${t("call")} ${r.phone}` })
            }
          >
            <Phone size={16} />
            {t("call")} <bdi>{r.phone}</bdi>
          </button>
        )}
      </div>
      <details>
        <summary>
          {t("source")}
          <ChevronDown size={16} />
        </summary>
        <div className="receipt">
          <p>
            <strong>{r.authority}</strong>
          </p>
          <p>
            {t("checked")}: {r.checked_at}. Review by {r.expires_at}.
          </p>
          <p>{t("sourcePending")}</p>
          <p>
            <strong>{t("scope")}</strong>
            <br />
            {r.eligibility}
          </p>
          <p>
            <strong>{t("limits")}</strong>
            <br />
            {r.limitations}
          </p>
          <p>{r.permission}</p>
          <button
            className="text-button"
            onClick={() => open({ url: r.source_url, title: r.authority })}
          >
            {t("viewSource")}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </details>
      <button
        className="text-button share"
        disabled={demo}
        onClick={() => {
          download(helpCard(r), `sakhi-public-${r.id}.txt`);
          onNotice(t("shareDone"));
        }}
      >
        <Download size={15} />
        {t("share")}
      </button>
      <span className="sr-only">{t("generalShare")}</span>
    </article>
  );
}
