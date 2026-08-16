import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { courses } from "@/content/courses";
import { faculty } from "@/content/faculty";
import { sortedAnnouncements } from "@/content/announcements";
import {
  href,
  htmlLang,
  locales,
  type Locale,
  type RouteKey,
} from "@/lib/i18n";

type Entry = MetadataRoute.Sitemap[number];

/** Static routes, with the priority we actually want to signal. */
const staticRoutes: {
  route: RouteKey;
  priority: number;
  changeFrequency: Entry["changeFrequency"];
}[] = [
  { route: "home", priority: 1, changeFrequency: "weekly" },
  { route: "admissions", priority: 0.95, changeFrequency: "weekly" },
  { route: "programme", priority: 0.9, changeFrequency: "monthly" },
  { route: "courses", priority: 0.9, changeFrequency: "monthly" },
  { route: "tuition", priority: 0.85, changeFrequency: "monthly" },
  { route: "faculty", priority: 0.8, changeFrequency: "monthly" },
  { route: "scholarships", priority: 0.8, changeFrequency: "monthly" },
  { route: "faq", priority: 0.8, changeFrequency: "monthly" },
  { route: "internship", priority: 0.75, changeFrequency: "monthly" },
  { route: "careers", priority: 0.75, changeFrequency: "monthly" },
  { route: "international", priority: 0.7, changeFrequency: "monthly" },
  { route: "seminars", priority: 0.7, changeFrequency: "monthly" },
  { route: "news", priority: 0.7, changeFrequency: "weekly" },
  { route: "contact", priority: 0.7, changeFrequency: "yearly" },
  { route: "alumni", priority: 0.6, changeFrequency: "yearly" },
  { route: "gallery", priority: 0.6, changeFrequency: "monthly" },
  { route: "documents", priority: 0.6, changeFrequency: "yearly" },
];

/**
 * Builds the hreflang alternates block for one logical page.
 * Google needs every URL in a cluster to point at every other, including itself.
 */
function alternates(route: RouteKey, slugs?: Record<Locale, string>) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[htmlLang[locale]] =
      `${site.url}${href(locale, route, slugs?.[locale])}`;
  }
  languages["x-default"] = `${site.url}${href("el", route, slugs?.el)}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const item of staticRoutes) {
      entries.push({
        url: `${site.url}${href(locale, item.route)}`,
        lastModified: now,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
        alternates: alternates(item.route),
      });
    }

    for (const course of courses) {
      entries.push({
        url: `${site.url}${href(locale, "courses", course.slug[locale])}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: alternates("courses", course.slug),
      });
    }

    for (const person of faculty) {
      entries.push({
        url: `${site.url}${href(locale, "faculty", person.slug[locale])}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.55,
        alternates: alternates("faculty", person.slug),
      });
    }

    for (const item of sortedAnnouncements) {
      entries.push({
        url: `${site.url}${href(locale, "news", item.slug[locale])}`,
        lastModified: new Date(item.date),
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: alternates("news", item.slug),
      });
    }
  }

  return entries;
}
