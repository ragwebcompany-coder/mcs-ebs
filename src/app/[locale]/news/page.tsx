import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui";

import { site } from "@/content/site";
import { sortedAnnouncements, announcementCategories } from "@/content/announcements";
import { locales, href, htmlLang, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, itemListNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Ανακοινώσεις",
    annot: "Νέα του προγράμματος",
    title: "Ανακοινώσεις",
    answer:
      "Εκδηλώσεις, εργαστήρια, θέσεις πρακτικής άσκησης και ακαδημαϊκές ανακοινώσεις του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική».",
    read: "Διαβάστε περισσότερα",
  },
  en: {
    crumbHome: "Home",
    crumb: "Announcements",
    annot: "Programme news",
    title: "Announcements",
    answer:
      "Events, workshops, internship places and academic announcements from the MSc in Economic & Business Strategy.",
    read: "Read more",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;

  return buildMetadata({
    locale: l,
    route: "news",
    title:
      l === "el"
        ? "Ανακοινώσεις & εκδηλώσεις — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Announcements & events — MSc Economic & Business Strategy",
    description: copy[l].answer,
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];

  const formatter = new Intl.DateTimeFormat(htmlLang[l], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome, route: "home" },
            { name: t.crumb, route: "news" },
          ]),
          itemListNode(
            t.title,
            sortedAnnouncements.map((item) => ({
              name: item.title[l],
              url: `${site.url}${href(l, "news", item.slug[l])}`,
            })),
          ),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumb, route: "news" },
        ]}
        annot={t.annot}
        title={t.title}
        answer={t.answer}
      />

      <Section tone="abyss">
        <Container wide>
          <ul>
            {sortedAnnouncements.map((item, index) => (
              <Reveal key={item.id} delay={index * 45} as="li">
                <article>
                  <Link
                    href={href(l, "news", item.slug[l])}
                    className="group grid gap-4 border-b border-piraeus/25 py-8 transition-colors duration-300 hover:border-brass lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="lg:col-span-3">
                      <time
                        dateTime={item.date}
                        className="sounding text-sm text-brass"
                      >
                        {formatter.format(new Date(item.date))}
                      </time>
                      <p className="annot mt-2.5 text-lume-faint">
                        {announcementCategories[item.category][l]}
                      </p>
                    </div>

                    <div className="lg:col-span-9">
                      <h2 className="font-display text-xl leading-snug font-semibold text-lume transition-colors duration-300 group-hover:text-brass md:text-2xl">
                        {item.title[l]}
                      </h2>
                      <p className="mt-3 max-w-3xl leading-relaxed text-lume-dim">
                        {item.summary[l]}
                      </p>
                      <span className="annot mt-4 inline-flex items-center gap-2 text-lume-faint transition-colors duration-300 group-hover:text-brass">
                        {t.read}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
