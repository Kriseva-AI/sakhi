import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Leaf,
  Languages,
  Phone,
  ShieldCheck,
  Sparkles,
  Trash2,
  WifiOff,
} from "lucide-react";
import type {
  Category,
  Locale,
  Page,
  Result,
} from "../../../packages/contracts";
import { catalogs, getCatalog, readLocale } from "./locale";
import { Finder } from "./Finder";
import { ResourceCard } from "./ResourceCard";
import { Maintenance } from "./Maintenance";
import { SakhiHome } from "./SakhiHome";
import { PreparationLibrary } from "./PreparationLibrary";
import { LocalMapHandoff } from "./LocalMapHandoff";
import { Community } from "./Community";
import { ResourceCompare } from "./ResourceCompare";
import { DataBoundary } from "./DataBoundary";
import { ResultGuide } from "./ResultGuide";
import { OutboundModal, type Destination } from "./Modal";
import {
  publicFallback,
  publicDirectory,
  localSafety,
  offlineCategory,
  download,
} from "./local";

const pages: Page[] = [
  "home",
  "finder",
  "resources",
  "trust",
  "maintenance",
  "components",
  "prepare",
  "nearby",
  "community",
];
function currentPage(): Page {
  const value = location.pathname.split("/")[2];
  return pages.includes(value as Page) ? (value as Page) : "home";
}
export function App() {
  const [locale, setLocale] = useState<Locale>(readLocale);
  const [page, setPage] = useState<Page>(currentPage);
  const [result, setResult] = useState<Result | null>(null);
  const [demo, setDemo] = useState(false);
  const [offline, setOffline] = useState(false);
  const [initialCategory, setInitialCategory] = useState<Category>();
  const [initialGoal, setInitialGoal] = useState<string>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [notice, setNotice] = useState("");
  const [lite, setLite] = useState(false);
  const [comfortable, setComfortable] = useState(false);
  const [session, setSession] = useState(0);
  const pendingRequest = useRef<AbortController | null>(null);
  const requestGeneration = useRef(0);
  function invalidateRequest() {
    requestGeneration.current++;
    pendingRequest.current?.abort();
    pendingRequest.current = null;
  }
  const catalog = getCatalog(locale);
  const t = (key: string) =>
    catalog.messages[key] || getCatalog("en-IN").messages[key] || `[${key}]`;
  const languageFor = (key: string) =>
    catalog.fallback_keys.includes(key) ? "en-IN" : locale;
  function go(next: Page, replace = false) {
    invalidateRequest();
    const path = `/${locale}/${next === "home" ? "" : next}`;
    history[replace ? "replaceState" : "pushState"](null, "", path);
    setPage(next);
  }
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = catalog.dir;
    const path = `/${locale}/${page === "home" ? "" : page}`;
    if (location.pathname !== path || location.search || location.hash)
      history.replaceState(null, "", path);
    document.querySelectorAll("link[hreflang]").forEach((n) => n.remove());
    for (const c of catalogs) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = c.locale;
      link.href = `${location.origin}/${c.locale}/`;
      document.head.append(link);
    }
    try {
      localStorage.setItem("sakhi.locale", locale);
    } catch {
      /* optional non-sensitive preference */
    }
  }, [locale, catalog.dir, page]);
  useEffect(() => {
    const handler = () => {
      invalidateRequest();
      setPage(currentPage());
      setLocale(readLocale());
      setDestination(null);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  useEffect(() => {
    document.title = `Sakhi | ${page === "home" ? "Your next step, on your terms" : page === "finder" ? "Find support" : page === "resources" ? "Public options" : page === "trust" ? "Privacy & trust" : page === "prepare" ? "Prepare and learn" : page === "nearby" ? "Public map search" : page === "community" ? "Community contribution" : "Maintainer review"}`;
    const h = document.querySelector<HTMLElement>("main h1");
    h?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, result]);
  function start(category?: Category, goal?: string) {
    setDemo(false);
    setOffline(false);
    setResult(null);
    setInitialCategory(category);
    setInitialGoal(goal);
    setNotice("");
    setSession((s) => s + 1);
    go("finder");
  }
  async function submit(
    text: string,
    category: Category | undefined,
    under18: boolean,
    goal: string,
    scope: string,
  ) {
    setInitialGoal(goal);
    invalidateRequest();
    const generation = requestGeneration.current;
    const safety = localSafety(text, under18);
    if (safety) {
      setResult(publicFallback("unsure", safety));
      go("resources");
      return;
    }
    try {
      const controller = new AbortController();
      pendingRequest.current = controller;
      const timeout = setTimeout(() => controller.abort(), 5000);
      let response: Response;
      try {
        response = await fetch("/api/navigate", {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            category: category ?? null,
            under18,
            goal,
            jurisdiction: scope,
            locale,
          }),
        });
      } finally {
        clearTimeout(timeout);
      }
      if (!response.ok) throw new Error("unavailable");
      const data = await response.json();
      if (generation !== requestGeneration.current) return;
      setResult(data);
      setOffline(false);
    } catch {
      if (generation !== requestGeneration.current) return;
      const fallback = publicFallback(category || offlineCategory(text));
      if (scope === "West Bengal")
        fallback.resources = fallback.resources.filter((r) => r.id !== "women");
      setResult(fallback);
      setOffline(true);
    }
    if (generation === requestGeneration.current) go("resources");
  }
  function synthetic() {
    setDemo(true);
    setOffline(false);
    setResult(publicFallback("cyber"));
    setNotice("");
    go("resources");
  }
  function clearSession() {
    setResult(null);
    setDemo(false);
    setOffline(false);
    setDestination(null);
    setInitialCategory(undefined);
    setInitialGoal(undefined);
    setComfortable(false);
    setLite(false);
    setSession((s) => s + 1);
    setNotice(t("cleared"));
    go("home", true);
  }
  const safeT = (key: string) => getCatalog("en-IN").messages[key] || key;
  return (
    <div
      className={`app ${lite ? "lite" : ""} ${comfortable ? "comfortable" : ""}`}
    >
      <a className="skip-link" href="#main">
        {t("skipContent")}
      </a>
      <div
        className="emergency-strip"
        role="region"
        aria-label="Emergency assistance"
        lang="en-IN"
        dir="ltr"
      >
        <span>{safeT("urgent")}</span>
        {demo ? (
          <span>112 · calls disabled in this example</span>
        ) : (
          <a href="tel:112">
            <Phone size={14} />
            {safeT("call112")}
            <ArrowUpRight size={14} />
          </a>
        )}
        <span className="emergency-boundary">{safeT("urgentNoDispatch")}</span>
      </div>
      <header className="site-header">
        <button
          className="wordmark"
          onClick={() => go("home")}
          title="Home"
          lang="en-IN"
          dir="ltr"
        >
          <span className="brand-symbol">
            <Leaf size={23} strokeWidth={1.5} />
          </span>
          <span>
            sakhi<span className="brand-by">BY KRISEVA</span>
          </span>
        </button>
        <nav aria-label="Main navigation">
          <button
            aria-current={page === "prepare" ? "page" : undefined}
            lang="en-IN"
            onClick={() => go("prepare")}
          >
            {t("prepareEntry")}
          </button>
          <button
            aria-current={page === "resources" ? "page" : undefined}
            onClick={() => {
              setResult(null);
              setDemo(false);
              go("resources");
            }}
          >
            {t("resources")}
          </button>
          <button
            aria-current={page === "trust" ? "page" : undefined}
            onClick={() => go("trust")}
          >
            {t("trust")}
          </button>
          <button
            aria-current={page === "nearby" ? "page" : undefined}
            lang="en-IN"
            onClick={() => go("nearby")}
          >
            {t("mapsEntry")}
          </button>
          <button
            aria-current={page === "community" ? "page" : undefined}
            lang="en-IN"
            onClick={() => go("community")}
          >
            {t("communityEntry")}
          </button>
        </nav>
        <div className="header-tools">
          <button
            className="comfort-control"
            onClick={() => setComfortable(!comfortable)}
            aria-pressed={comfortable}
            aria-label="Larger text"
            title="Larger text"
          >
            Aa
          </button>
          <label className="locale-label">
            <Languages size={17} />
            <span className="sr-only">{t("language")}</span>
            <select
              aria-label="Language"
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
            >
              {catalogs.map((c) => (
                <option key={c.locale} value={c.locale}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="clear-button"
            onClick={clearSession}
            title={t("clear")}
          >
            <Trash2 size={16} />
            <span>{t("clear")}</span>
          </button>
        </div>
      </header>
      <div
        className="preview-line"
        role="region"
        aria-label="Product status"
        lang="en-IN"
        dir="ltr"
      >
        <span>
          <i />
          {safeT("preview")}
        </span>
        <span>{safeT("noIntegrations")}</span>
        <button onClick={() => setLite(!lite)} aria-pressed={lite}>
          {safeT("lite")}
          {lite ? " · on" : ""}
        </button>
      </div>
      {demo && (
        <div className="demo-banner" lang="en-IN">
          <Sparkles size={17} />
          {safeT("demoNotice")}
        </div>
      )}
      {locale !== "en-IN" && (
        <aside className="translation-banner" lang="en-IN" dir="ltr">
          {safeT("translationNotice")} <span lang={locale}>{catalog.name}</span>
        </aside>
      )}
      <p role="status" className={notice ? "toast" : "sr-only"} lang="en-IN">
        {notice}
      </p>
      <main id="main">
        {page === "home" && (
          <SakhiHome
            key={session}
            t={t}
            start={start}
            synthetic={synthetic}
            open={setDestination}
            go={go}
            languageFor={languageFor}
          />
        )}
        {page === "prepare" && (
          <PreparationLibrary
            key={session}
            open={setDestination}
            demo={demo}
            notify={setNotice}
            onFind={() => start()}
          />
        )}
        {page === "nearby" && (
          <LocalMapHandoff key={session} open={setDestination} demo={demo} />
        )}
        {page === "community" && (
          <Community key={session} demo={demo} notify={setNotice} />
        )}
        {page === "finder" && (
          <div className="flow-layout">
            <Finder
              key={session}
              t={t}
              submit={submit}
              initialCategory={initialCategory}
              initialGoal={initialGoal}
            />
            <aside className="flow-aside" lang="en-IN">
              <Leaf size={29} strokeWidth={1.2} />
              <h2>{safeT("flowStartTitle")}</h2>
              <p>{safeT("flowStartBody")}</p>
              <DeviceNotice t={safeT} />
            </aside>
          </div>
        )}
        {page === "resources" && (
          <section className="results">
            <button className="text-button" onClick={() => start()}>
              <ArrowLeft size={16} />
              {t("otherOptions")}
            </button>
            <div className="eyebrow" lang="en-IN">
              INFORMATION, THEN YOUR CHOICE
            </div>
            <h1 tabIndex={-1} lang="en-IN">
              {result?.state === "minor_redirect"
                ? safeT("minorTitle")
                : result?.state === "urgent_redirect"
                  ? safeT("emergencyTitle")
                  : result
                    ? safeT("resultsTitle")
                    : safeT("resourceDirectory")}
            </h1>
            <p className="results-intro" lang="en-IN">
              {result?.state === "minor_redirect"
                ? safeT("minorBody")
                : result?.state === "urgent_redirect"
                  ? safeT("emergencyBody")
                  : result
                    ? safeT("resultsIntro")
                    : safeT("directoryIntro")}
            </p>
            {offline && (
              <div className="notice" lang="en-IN">
                <WifiOff size={18} />
                {safeT("offline")}
              </div>
            )}
            {result?.abstained && (
              <div className="notice" lang="en-IN">
                <strong>{safeT("uncertainTitle")}</strong>{" "}
                {safeT("uncertainBody")}
              </div>
            )}
            {result?.category === "friend" && (
              <p className="notice" lang="en-IN">
                {safeT("friendNote")}
              </p>
            )}
            {result?.warnings
              .filter((w) => w.includes("West Bengal"))
              .map((w) => (
                <p className="notice" key={w} lang="en-IN">
                  {w}
                </p>
              ))}
            {result?.state === "present_options" && (
              <ResultGuide goal={initialGoal || "understand"} />
            )}
            <ResourceCompare
              records={result?.resources ?? publicDirectory()}
              open={setDestination}
            />
            <div className="resource-grid">
              {(result?.resources ?? publicDirectory()).map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  demo={demo}
                  t={safeT}
                  open={setDestination}
                  onNotice={setNotice}
                />
              ))}
            </div>
            {result?.resources.length === 0 && (
              <p className="notice" lang="en-IN">
                {safeT("noResults")}
              </p>
            )}
            <p className="small muted" lang="en-IN">
              {result?.engine === "hybrid_bm25_embeddinggemma2"
                ? safeT("semanticActive")
                : safeT("semantic")}{" "}
              {safeT("sourcePending")}
            </p>
            <DeviceNotice t={safeT} />
          </section>
        )}
        {page === "trust" && (
          <section className="trust-page" lang="en-IN" dir="ltr">
            <div className="eyebrow">PRIVACY & TRUST</div>
            <h1 tabIndex={-1}>{safeT("privacyTitle")}</h1>
            <p className="lead">{safeT("policy")}</p>
            <DataBoundary compact />
            <div className="trust-detail">
              <h2>What stays on this device</h2>
              <p>
                Your choices and any words you enter are held in temporary app
                memory. When the local API is used, it processes your words on
                this machine without saving or logging them. Reloading or
                clearing the session discards app memory. The language
                preference alone is saved in browser storage.
              </p>
              <h2>What leaving Sakhi means</h2>
              <p>
                Before opening an official website, you see its exact
                destination. Sakhi sends no story or form fields. The
                destination receives normal browser network information and has
                its own rules. Calls and complaints are your actions.
              </p>
              <h2>Source checks have limits</h2>
              <p>
                Public sources were inspected on October 19, 2026. Human contact
                verification and safeguarding review are pending. No service has
                accepted a referral through Sakhi. A checked source does not
                prove a service is reachable or available.
              </p>
              <h2>Language quality is visible</h2>
              <p>
                16 locale shells have complete structural keys. Draft navigation
                translations are marked beta. Safety and service content fall
                back explicitly to English. None has professional language and
                safeguarding signoff.
              </p>
              <h2>Offline is a public pack</h2>
              <p>
                {safeT("offlineBoundary")} The pack has a version, content
                hashes and review expiry. Sensitive input and API responses are
                never cached by the service worker.
              </p>
              <h2>What is not available</h2>
              <p>
                {safeT("emptyDraft")} There is no counselling, medical advice,
                police dispatch, personalized escape planning, facial
                recognition or suspect scoring.
              </p>
              <h2>{safeT("correction")}</h2>
              <p>{safeT("correctionBody")}</p>
              <button
                className="button secondary"
                disabled={demo}
                onClick={() => {
                  download(
                    "PUBLIC RESOURCE CORRECTION\nResource ID:\nOfficial source URL:\nProposed correction:\nEvidence date:\nNo personal stories, names, intimate media or private contacts. Submit a reviewed repository issue or pull request after the repository is published.\n",
                    "sakhi-public-correction.txt",
                  );
                  setNotice(safeT("correctionDownloaded"));
                }}
              >
                {safeT("copyCorrection")}
              </button>
            </div>
            <DeviceNotice t={safeT} />
            <button
              className="button secondary"
              onClick={() => go("maintenance")}
            >
              {safeT("maintenance")}
              <ArrowRight size={17} />
            </button>
          </section>
        )}
        {page === "maintenance" && <Maintenance demo={demo} />}
        {page === "components" && (
          <section className="results" lang="en-IN">
            <h1 tabIndex={-1}>{safeT("componentTitle")}</h1>
            <div className="panel">
              <button className="button primary">
                Primary action
                <ArrowRight size={18} />
              </button>
              <button className="button secondary">Secondary action</button>
              <p className="notice">Information notice</p>
              <label htmlFor="sample">Labelled input</label>
              <input id="sample" placeholder="Public information only" />
              <DeviceNotice t={safeT} />
            </div>
          </section>
        )}
      </main>
      <footer lang="en-IN" dir="ltr">
        <div>
          <span className="footer-brand">
            <Leaf size={18} />
            sakhi
          </span>
          <p>{safeT("motto")}</p>
        </div>
        <div className="footer-right">
          <p>{safeT("notService")}</p>
          <p>{safeT("footer")}</p>
          <button className="text-button" onClick={() => go("maintenance")}>
            {safeT("maintenance")}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </footer>
      {destination && (
        <OutboundModal
          destination={destination}
          demo={demo}
          t={safeT}
          close={() => setDestination(null)}
        />
      )}
    </div>
  );
}
function DeviceNotice({ t }: { t: (key: string) => string }) {
  return (
    <aside className="device-notice" lang="en-IN" dir="ltr">
      <ShieldCheck size={21} />
      <div>
        <h2>{t("deviceTitle")}</h2>
        <p>{t("deviceBody")}</p>
      </div>
    </aside>
  );
}
