export const locales = ["el", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "el";

/** BCP-47 tags used for `lang` attributes and hreflang alternates. */
export const htmlLang: Record<Locale, string> = {
  el: "el-GR",
  en: "en-GB",
};

/** A string that exists in both languages. */
export type I18n = Record<Locale, string>;

export function pick<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}

/**
 * Path segments are stable across locales (`/el/courses`, `/en/courses`) so that
 * hreflang pairs stay mechanically correct across ~50 routes. Leaf slugs for
 * courses, faculty and announcements *are* localised — that is where the
 * keyword value actually sits.
 */
export const routes = {
  home: "",
  programme: "programme",
  tuition: "programme/tuition",
  admissions: "admissions",
  courses: "courses",
  faculty: "faculty",
  scholarships: "scholarships",
  internship: "internship",
  careers: "careers",
  international: "international",
  seminars: "seminars",
  alumni: "alumni",
  news: "news",
  gallery: "gallery",
  documents: "documents",
  faq: "faq",
  contact: "contact",
  apply: "apply",
} as const;

export type RouteKey = keyof typeof routes;

export function href(locale: Locale, route: RouteKey, slug?: string): string {
  // `routes.home` is the empty string, so drop empty parts before joining and
  // add the leading slash separately — never as a part, or it gets filtered out.
  const parts = [locale, routes[route], slug].filter(
    (part): part is string => Boolean(part),
  );
  return `/${parts.join("/")}`;
}

export function localeSwitchHref(
  target: Locale,
  route: RouteKey,
  slug?: string,
): string {
  return href(target, route, slug);
}
