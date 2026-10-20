import type { Locale } from "../../../packages/contracts";
export interface Catalog {
  locale: Locale;
  name: string;
  dir: "ltr" | "rtl";
  language_status: string;
  fallback_keys: string[];
  messages: Record<string, string>;
}
const files = import.meta.glob("../../../packages/i18n/*-IN.json", {
  eager: true,
  import: "default",
});
export const catalogs = Object.values(files) as Catalog[];
export const locales = catalogs.map((c) => c.locale);
export function getCatalog(locale: Locale) {
  return catalogs.find((c) => c.locale === locale)!;
}
export function readLocale(): Locale {
  const path = location.pathname.split("/")[1];
  if (locales.includes(path as Locale)) return path as Locale;
  try {
    const value = localStorage.getItem("sakhi.locale");
    if (locales.includes(value as Locale)) return value as Locale;
  } catch {
    /* storage is optional */
  }
  return "en-IN";
}
