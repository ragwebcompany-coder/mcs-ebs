import type { Metadata } from "next";
import { site } from "@/content/site";
import { htmlLang, locales, type Locale, type RouteKey, href } from "./i18n";

interface BuildMetadataArgs {
  locale: Locale;
  route: RouteKey;
  /** Localised leaf slug, keyed by locale — required for course/faculty/news pages. */
  slugs?: Record<Locale, string>;
  title: string;
  description: string;
  /** Extra keywords beyond the site-wide set. */
  keywords?: string[];
  /** Absolute or root-relative image path. Defaults to the generated OG image. */
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  noIndex?: boolean;
}

const brand: Record<Locale, string> = {
  el: "ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική | Παν. Πειραιώς",
  en: "MSc Economic & Business Strategy | University of Piraeus",
};

const baseKeywords: Record<Locale, string[]> = {
  el: [
    "μεταπτυχιακό οικονομικά",
    "ΠΜΣ Πανεπιστήμιο Πειραιώς",
    "οικονομική και επιχειρησιακή στρατηγική",
    "μεταπτυχιακό επιχειρησιακή στρατηγική",
    "MSc EBS",
    "μεταπτυχιακό Πειραιάς",
    "υβριδικό μεταπτυχιακό",
    "μεταπτυχιακό για εργαζόμενους",
  ],
  en: [
    "MSc Economic and Business Strategy",
    "University of Piraeus masters",
    "business strategy masters Greece",
    "economics masters Athens",
    "hybrid MSc Greece",
    "CFA affiliated programme",
  ],
};

/**
 * Every page's metadata is built here so that canonical URLs and the hreflang
 * cluster stay mechanically correct across all ~110 routes.
 */
export function buildMetadata({
  locale,
  route,
  slugs,
  title,
  description,
  keywords = [],
  image,
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataArgs): Metadata {
  const path = href(locale, route, slugs?.[locale]);
  const canonical = `${site.url}${path}`;

  // hreflang cluster: one entry per locale, plus x-default pointing at Greek.
  const languages: Record<string, string> = {};
  for (const other of locales) {
    languages[htmlLang[other]] = `${site.url}${href(other, route, slugs?.[other])}`;
  }
  languages["x-default"] = `${site.url}${href("el", route, slugs?.el)}`;

  // When no image is passed, the `opengraph-image` file convention under
  // app/[locale] supplies one automatically — do not override it here.
  const imageOverride = image
    ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
    : {};

  return {
    title,
    description,
    keywords: [...baseKeywords[locale], ...keywords],
    alternates: { canonical, languages },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      title,
      description,
      url: canonical,
      siteName: brand[locale],
      locale: htmlLang[locale].replace("-", "_"),
      ...imageOverride,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Appends the brand suffix, unless the title already carries it. */
export function pageTitle(title: string, locale: Locale): string {
  return `${title} — ${brand[locale]}`;
}
