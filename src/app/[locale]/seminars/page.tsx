import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, Container, Heading, Section, Sounding } from "@/components/ui";

import { site } from "@/content/site";
import { seminars } from "@/content/programme";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, itemListNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Σεμινάρια ενδυνάμωσης",
    annot: "Πέρα από την ύλη",
    title: "Σεμινάρια ενδυνάμωσης",
    answer:
      "Οκτώ κύκλοι σεμιναρίων εκτός του βασικού προγράμματος σπουδών, που καλύπτουν ψηφιακό μετασχηματισμό, soft skills, business analytics, τεχνητή νοημοσύνη και επικοινωνία. Προσφέρονται χωρίς επιπλέον κόστος στους φοιτητές του ΠΜΣ.",
    meta: [
      { label: "Κύκλοι", value: "8" },
      { label: "Παρασκευή", value: "18:00–21:00" },
      { label: "Σάββατο", value: "11:00–14:00" },
      { label: "Κόστος", value: "Χωρίς χρέωση" },
    ],
    whyTitle: "Γιατί υπάρχουν",
    whyBody:
      "Η αγορά δεν ζητά μόνο αναλυτική επάρκεια. Ζητά ανθρώπους που παρουσιάζουν πειστικά, δουλεύουν με εργαλεία, διαχειρίζονται δύσκολες συνομιλίες και προσαρμόζονται σε τεχνολογίες που δεν υπήρχαν πέρυσι. Τα σεμινάρια ενδυνάμωσης καλύπτουν ακριβώς αυτό το κενό, παράλληλα με τα ακαδημαϊκά μαθήματα.",
    facts: [
      { v: "8", l: "κύκλοι σεμιναρίων", n: "εκτός του βασικού προγράμματος" },
      { v: "2", l: "ημέρες την εβδομάδα", n: "Παρασκευή & Σάββατο" },
      { v: "0 €", l: "επιπλέον κόστος", n: "περιλαμβάνονται στα δίδακτρα" },
    ],
    listAnnot: "Οι κύκλοι",
    listTitle: "Τι καλύπτουν",
    programmeLink: "Δομή προγράμματος",
    deptLink: "Σεμινάρια Τμήματος",
  },
  en: {
    crumbHome: "Home",
    crumb: "Empowerment seminars",
    annot: "Beyond the curriculum",
    title: "Empowerment seminars",
    answer:
      "Eight seminar series outside the core curriculum, covering digital transformation, soft skills, business analytics, artificial intelligence and communication. They are offered to enrolled students at no additional cost.",
    meta: [
      { label: "Series", value: "8" },
      { label: "Friday", value: "18:00–21:00" },
      { label: "Saturday", value: "11:00–14:00" },
      { label: "Cost", value: "No charge" },
    ],
    whyTitle: "Why they exist",
    whyBody:
      "The market does not ask for analytical competence alone. It asks for people who present convincingly, work with tools, handle difficult conversations and adapt to technologies that did not exist last year. The empowerment seminars close exactly that gap, alongside the academic courses.",
    facts: [
      { v: "8", l: "seminar series", n: "outside the core curriculum" },
      { v: "2", l: "days a week", n: "Friday & Saturday" },
      { v: "€0", l: "additional cost", n: "included in tuition" },
    ],
    listAnnot: "The series",
    listTitle: "What they cover",
    programmeLink: "Programme structure",
    deptLink: "Department seminars",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;

  return buildMetadata({
    locale: l,
    route: "seminars",
    title:
      l === "el"
        ? "Σεμινάρια ενδυνάμωσης & soft skills — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Empowerment & soft skills seminars — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["σεμινάρια soft skills", "σεμινάρια τεχνητής νοημοσύνης", "business analytics σεμινάριο"]
        : ["soft skills seminars", "AI seminar", "business analytics workshop"],
  });
}

export default async function SeminarsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "seminars" },
          ]),
          itemListNode(
            t.title as string,
            seminars.map((seminar) => ({
              name: seminar.title[l],
              url: `${site.url}${href(l, "seminars")}`,
            })),
          ),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "seminars" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <h2 className="text-title leading-tight text-lume">
                {t.whyTitle as string}
              </h2>
              <p className="text-lede mt-6 leading-[1.75] text-lume-dim">
                {t.whyBody as string}
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6">
              <div className="grid gap-8 sm:grid-cols-3">
                {(t.facts as { v: string; l: string; n: string }[]).map(
                  (fact) => (
                    <Sounding
                      key={fact.l}
                      value={fact.v}
                      label={fact.l}
                      note={fact.n}
                    />
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.listAnnot as string}
              title={t.listTitle as string}
              tone="light"
            />
          </Reveal>

          <ul className="mt-14 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {seminars.map((seminar, index) => (
              <Reveal key={seminar.id} delay={index * 50} as="li">
                <div className="border-t border-deep/15 pt-5">
                  <h3 className="font-display text-xl leading-snug font-semibold text-deep">
                    {seminar.title[l]}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-deep/65">
                    {seminar.detail[l]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 flex flex-wrap gap-4">
            <ButtonLink href={href(l, "programme")} variant="quiet">
              {t.programmeLink as string}
            </ButtonLink>
            <ButtonLink href={site.external.seminars} variant="quiet" external>
              {t.deptLink as string}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
