import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
  EyeOff,
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
import { TravelWorkspace } from "./travel/TravelWorkspace";
import { Community } from "./Community";
import { ResourceCompare } from "./ResourceCompare";
import { DataBoundary } from "./DataBoundary";
import { TrustDetails } from "./TrustDetails";
import { ResultGuide } from "./ResultGuide";
import { SupportGuide } from "./SupportGuide";
import { JourneyCue } from "./JourneyCue";
import { SiteNavigation } from "./SiteNavigation";
import { LanguageStatus } from "./LanguageStatus";
import { OutboundModal, type Destination } from "./Modal";
import {
  publicFallback,
  publicDirectory,
  localSafety,
  offlineCategory,
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
  const [covered, setCovered] = useState(false);
  const rememberLocale = useRef(false);
  const coverTrigger = useRef<HTMLElement | null>(null);
  const pendingRequest = useRef<AbortController | null>(null);
  const requestGeneration = useRef(0);
  const lastInteraction = useRef<HTMLElement | null>(null);
  const lastFocusTarget = useRef({ page, result });
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
    lastInteraction.current = null;
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
      if (rememberLocale.current) localStorage.setItem("sakhi.locale", locale);
    } catch {
      /* optional non-sensitive preference */
    }
  }, [locale, catalog.dir, page]);
  useEffect(() => {
    const handler = () => {
      invalidateRequest();
      lastInteraction.current = null;
      setPage(currentPage());
      setLocale(readLocale());
      setDestination(null);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  useEffect(() => {
    document.title = covered
      ? "Notes"
      : `Sakhi | ${page === "home" ? "Public support for women" : page === "finder" ? "Find support" : page === "resources" ? "Public options" : page === "trust" ? "Privacy & trust" : page === "prepare" ? "Prepare and learn" : page === "nearby" ? "Public travel tools" : page === "community" ? "Community contribution" : "Maintainer review"}`;
    if (
      lastFocusTarget.current.page !== page ||
      lastFocusTarget.current.result !== result
    ) {
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    lastFocusTarget.current = { page, result };
  }, [page, result, covered]);
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
    setCovered(false);
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
  function coverPage(trigger: HTMLElement | null = lastInteraction.current) {
    coverTrigger.current = trigger;
    invalidateRequest();
    setDestination(null);
    window.dispatchEvent(new Event("sakhi:cover"));
    setCovered(true);
  }
  function quickExit() {
    flushSync(() => {
      clearSession();
      setCovered(true);
    });
    document.title = "Notes";
    window.location.replace("https://www.google.com/");
  }
  const safeT = (key: string) => getCatalog("en-IN").messages[key] || key;
  const compactEntry =
    page === "home" || page === "finder" || page === "nearby";
  return (
    <>
      {covered && (
        <section
          className="discreet-cover"
          aria-label="Page covered"
          lang="en-IN"
        >
          <h1 tabIndex={-1} ref={(node) => node?.focus()}>
            Notes
          </h1>
          <div className="note-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <button
            className="button primary"
            onClick={() => {
              setCovered(false);
              requestAnimationFrame(() => coverTrigger.current?.focus());
            }}
          >
            Return to page
          </button>
          <button className="button quiet" onClick={clearSession}>
            Clear and return home
          </button>
          <button
            className="text-button"
            disabled={demo}
            onClick={() => {
              quickExit();
            }}
          >
            Quick exit to Google
          </button>
          <p>
            Covering or exiting cannot remove browser history or monitoring
            traces. Google receives normal browser information when opened.
          </p>
        </section>
      )}
      <div
        hidden={covered}
        inert={covered}
        className={`app page-${page} ${compactEntry ? "compact-entry" : ""} ${lite ? "lite" : ""} ${comfortable ? "comfortable" : ""}`}
        onClickCapture={(event) => {
          if (event.target instanceof Element) {
            const control = event.target.closest("button,a");
            if (control instanceof HTMLElement && !control.closest("dialog"))
              lastInteraction.current = control;
          }
        }}
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
          <span className="emergency-boundary">
            {safeT("urgentNoDispatch")}
          </span>
        </div>
        <header className="site-header">
          <button
            className="wordmark"
            onClick={() => go("home")}
            title="Home"
            lang="en-IN"
            dir="ltr"
          >
            <span className="sakhi-word">
              sakhi<span className="brand-dot">.</span>
              <span className="brand-by">BY KRISEVA</span>
            </span>
          </button>
          <div className="header-tools">
            <button
              className="hide-control"
              aria-label="Hide page"
              title="Cover this page. History and monitoring traces remain."
              onClick={(event) => {
                coverPage(event.currentTarget);
              }}
            >
              <EyeOff size={18} />
              <span>Hide</span>
            </button>
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
                onChange={(e) => {
                  rememberLocale.current = true;
                  setLocale(e.target.value as Locale);
                }}
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
          {!compactEntry && (
            <SiteNavigation
              locale={locale}
              page={page}
              t={t}
              languageFor={languageFor}
              go={go}
              onResources={() => {
                setResult(null);
                setDemo(false);
              }}
            />
          )}
        </header>
        {!compactEntry && (
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
        )}
        {demo && (
          <div className="demo-banner" lang="en-IN">
            <Sparkles size={17} />
            {safeT("demoNotice")}
          </div>
        )}
        {locale !== "en-IN" && <LanguageStatus catalog={catalog} />}
        <p role="status" className={notice ? "toast" : "sr-only"} lang="en-IN">
          {notice}
        </p>
        <main id="main" tabIndex={-1}>
          <JourneyCue page={page} />
          {page === "home" && (
            <SakhiHome
              key={session}
              t={t}
              start={start}
              synthetic={synthetic}
              languageFor={languageFor}
            />
          )}
          {page === "prepare" && (
            <PreparationLibrary
              key={session}
              open={setDestination}
              demo={demo}
              notify={setNotice}
              onFind={start}
              t={t}
              languageFor={languageFor}
            />
          )}
          {page === "nearby" && (
            <TravelWorkspace key={session} open={setDestination} demo={demo} />
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
                cancel={invalidateRequest}
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
              {(result?.state === "minor_redirect" ||
                (result?.state === "present_options" &&
                  result?.category === "cyber")) && (
                <SupportGuide
                  key={`${session}-${result.state}-${result.category}`}
                  minor={result.state === "minor_redirect"}
                  open={setDestination}
                />
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
              <TrustDetails
                demo={demo}
                notify={setNotice}
                forgetLocale={() => {
                  rememberLocale.current = false;
                  try {
                    localStorage.removeItem("sakhi.locale");
                    setNotice(
                      "Saved language preference removed. Changing language again saves a new preference.",
                    );
                  } catch {
                    setNotice(
                      "Browser storage could not be changed. Use browser settings to remove the saved preference.",
                    );
                  }
                }}
              />
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
        {compactEntry ? (
          <footer className="simple-footer" lang="en-IN" dir="ltr">
            <SiteNavigation
              locale={locale}
              page={page}
              t={t}
              languageFor={languageFor}
              go={go}
              onResources={() => {
                setResult(null);
                setDemo(false);
              }}
            />
            <p>
              <span className="preview-label">Internal preview</span> Public
              information, not an emergency service.
            </p>
          </footer>
        ) : (
          <footer lang="en-IN" dir="ltr">
            <div>
              <span className="footer-brand">
                sakhi<span className="brand-dot">.</span>
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
        )}
        {destination && (
          <OutboundModal
            hide={() => coverPage()}
            exit={demo ? undefined : quickExit}
            returnFocus={lastInteraction.current}
            destination={destination}
            demo={demo}
            t={safeT}
            close={() => setDestination(null)}
          />
        )}
      </div>
    </>
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
