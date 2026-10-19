import type { Locale, Page } from "../../../packages/contracts";

export function SiteNavigation({
  locale,
  page,
  t,
  languageFor,
  go,
  onResources,
}: {
  locale: Locale;
  page: Page;
  t: (key: string) => string;
  languageFor: (key: string) => string;
  go: (page: Page) => void;
  onResources: () => void;
}) {
  const entries: [Page, string][] = [
    ["prepare", "prepareEntry"],
    ["resources", "resources"],
    ["trust", "trust"],
    ["nearby", "mapsEntry"],
    ["community", "communityEntry"],
  ];
  return (
    <nav className="service-navigation" aria-label="Main navigation">
      <ul>
        {entries.map(([target, key]) => (
          <li key={target}>
            <a
              href={`/${locale}/${target}`}
              lang={languageFor(key)}
              aria-current={page === target ? "page" : undefined}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                if (target === "resources") onResources();
                go(target);
              }}
            >
              {t(key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
