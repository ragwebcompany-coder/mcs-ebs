import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Section } from "@/components/ui";

import {
  announcements,
  announcementBySlug,
  announcementCategories,
  sortedAnnouncements,
} from "@/content/announcements";
import { locales, href, htmlLang, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, announcementNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    announcements.map((item) => ({ locale, slug: item.slug[locale] })),
  );
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumbNews: "Ανακοινώσεις",
    published: "Δημοσιεύτηκε",
    category: "Κατηγορία",
    moreAnnot: "Περισσότερα",
    moreTitle: "Άλλες ανακοινώσεις",
    all: "Όλες οι ανακοινώσεις",
  },
  en: {
    crumbHome: "Home",
    crumbNews: "Announcements",
    published: "Published",
    category: "Category",
    moreAnnot: "More",
    moreTitle: "Other announcements",
    all: "All announcements",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const item = announcementBySlug(slug);
  if (!item) return {};

  return buildMetadata({
    locale: l,
    route: "news",
    slugs: item.slug,
    title: `${item.title[l]} | ${l === "el" ? "ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική" : "MSc Economic & Business Strategy"}`,
    description: item.summary[l],
    type: "article",
    publishedTime: item.date,
  });
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const item = announcementBySlug(slug);
  if (!item || item.slug[l] !== slug) notFound();

  const t = copy[l];
  const formatter = new Intl.DateTimeFormat(htmlLang[l], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const others = sortedAnnouncements
    .filter((other) => other.id !== item.id)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome, route: "home" },
            { name: t.crumbNews, route: "news" },
            { name: item.title[l], route: "news", slug: item.slug[l] },
          ]),
          announcementNode(item, l),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumbNews, route: "news" },
          { label: item.title[l], route: "news", slug: item.slug[l] },
        ]}
        annot={announcementCategories[item.category][l]}
        title={item.title[l]}
        answer={item.summary[l]}
        meta={[
          {
            label: t.published,
            value: formatter.format(new Date(item.date)),
          },
          { label: t.category, value: announcementCategories[item.category][l] },
        ]}
      />

      <Section tone="abyss">
        <Container wide>
          <Reveal className="max-w-3xl">
            <div className="text-lede space-y-6 leading-[1.8] text-lume-dim">
              {item.body[l].map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            {item.link ? (
              <div className="mt-10">
                <ButtonLink href={item.link.url} variant="ghost" external>
                  {item.link.label[l]}
                </ButtonLink>
              </div>
            ) : null}
          </Reveal>
        </Container>
      </Section>

      {others.length ? (
        <Section tone="deep">
          <Container wide>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-piraeus/40 pb-6">
                <h2 className="text-title text-lume">{t.moreTitle}</h2>
                <Annot tone="dim">{t.moreAnnot}</Annot>
              </div>
            </Reveal>

            <ul className="mt-2 grid gap-x-10 md:grid-cols-3">
              {others.map((other, index) => (
                <Reveal key={other.id} delay={index * 60} as="li">
                  <Link
                    href={href(l, "news", other.slug[l])}
                    className="group block border-b border-piraeus/25 py-6 transition-colors duration-300 hover:border-brass"
                  >
                    <time
                      dateTime={other.date}
                      className="sounding text-xs text-brass"
                    >
                      {formatter.format(new Date(other.date))}
                    </time>
                    <p className="mt-3 font-display text-lg leading-snug font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                      {other.title[l]}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-12">
              <ButtonLink href={href(l, "news")} variant="ghost">
                {t.all}
              </ButtonLink>
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
