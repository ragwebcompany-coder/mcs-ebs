import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import {
  faculty,
  coreFaculty,
  affiliatedFaculty,
  coursesTaughtBy,
  type FacultyMember,
} from "@/content/faculty";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import {
  graph,
  breadcrumbNode,
  itemListNode,
  personNode,
} from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Διδακτικό προσωπικό",
    annot: "Ποιοι διδάσκουν",
    title: "Διδακτικό προσωπικό",
    answer:
      "Το ΠΜΣ στελεχώνεται από μέλη ΔΕΠ του Τμήματος Οικονομικής Επιστήμης του Πανεπιστημίου Πειραιώς, με γνωστικά αντικείμενα που καλύπτουν την οικονομική θεωρία, τα χρηματοοικονομικά, τη στρατηγική και τις ποσοτικές μεθόδους.",
    metaLabels: {
      instructors: "Διδάσκοντες",
      core: "Μέλη ΔΕΠ",
      courses: "Μαθήματα",
    },
    coreTitle: "Μέλη ΔΕΠ",
    coreLede:
      "Το μόνιμο διδακτικό προσωπικό του Τμήματος Οικονομικής Επιστήμης.",
    affiliatedTitle: "Συνεργαζόμενοι διδάσκοντες",
    affiliatedLede:
      "Διδάσκοντες με εξειδικευμένο αντικείμενο που ενισχύουν συγκεκριμένα μαθήματα του προγράμματος.",
    teaches: "Διδάσκει",
    profile: "Προφίλ",
  },
  en: {
    crumbHome: "Home",
    crumb: "Faculty",
    annot: "Who teaches",
    title: "Teaching staff",
    answer:
      "The programme is staffed by faculty of the Department of Economics at the University of Piraeus, covering economic theory, finance, strategy and quantitative methods.",
    metaLabels: {
      instructors: "Instructors",
      core: "Faculty",
      courses: "Courses",
    },
    coreTitle: "Faculty",
    coreLede: "The permanent teaching staff of the Department of Economics.",
    affiliatedTitle: "Affiliated instructors",
    affiliatedLede:
      "Specialist instructors who lead particular courses on the programme.",
    teaches: "Teaches",
    profile: "Profile",
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
    route: "faculty",
    title:
      l === "el"
        ? "Διδακτικό προσωπικό — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Teaching staff — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords: faculty.slice(0, 8).map((person) => person.name[l]),
  });
}

function FacultyList({
  people,
  locale,
  teachesLabel,
}: {
  people: FacultyMember[];
  locale: Locale;
  teachesLabel: string;
}) {
  return (
    <ul className="mt-2">
      {people.map((person, index) => {
        const taught = coursesTaughtBy(person.id);

        return (
          <Reveal key={person.id} delay={index * 45} as="li">
            <Link
              href={href(locale, "faculty", person.slug[locale])}
              className="group grid gap-4 border-b border-piraeus/25 py-7 transition-colors duration-300 hover:border-brass lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <h3 className="font-display text-xl leading-snug font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                  {person.name[locale]}
                </h3>
                <p className="mt-1.5 text-sm text-brass">
                  {person.rank[locale]}
                </p>
                {person.role ? (
                  <p className="annot mt-2 text-lume-faint">
                    {person.role[locale]}
                  </p>
                ) : null}
              </div>

              <div className="lg:col-span-5">
                <p className="leading-relaxed text-lume-dim">
                  {person.summary[locale]}
                </p>
              </div>

              <div className="lg:col-span-3">
                {taught.length ? (
                  <>
                    <p className="annot mb-2.5 text-lume-faint">
                      {teachesLabel}
                    </p>
                    <ul className="space-y-1.5">
                      {taught.map((course) => (
                        <li
                          key={course.id}
                          className="text-sm leading-snug text-lume-dim"
                        >
                          {course.title[locale]}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const labels = t.metaLabels as Record<"instructors" | "core" | "courses", string>;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "faculty" },
          ]),
          itemListNode(
            t.title as string,
            faculty.map((person) => ({
              name: person.name[l],
              url: `${site.url}${href(l, "faculty", person.slug[l])}`,
            })),
          ),
          ...faculty.map((person) => personNode(person, l)),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "faculty" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={[
          { label: labels.instructors, value: String(faculty.length) },
          { label: labels.core, value: String(coreFaculty.length) },
          {
            label: labels.courses,
            value: String(
              new Set(faculty.flatMap((p) => coursesTaughtBy(p.id).map((c) => c.id)))
                .size,
            ),
          },
        ]}
      />

      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <div className="border-b border-piraeus/40 pb-6">
              <Heading title={t.coreTitle as string} lede={t.coreLede as string} />
            </div>
          </Reveal>
          <FacultyList
            people={coreFaculty}
            locale={l}
            teachesLabel={t.teaches as string}
          />
        </Container>
      </Section>

      <Section tone="deep">
        <Container wide>
          <Reveal>
            <div className="border-b border-piraeus/40 pb-6">
              <Heading
                title={t.affiliatedTitle as string}
                lede={t.affiliatedLede as string}
              />
            </div>
          </Reveal>
          <FacultyList
            people={affiliatedFaculty}
            locale={l}
            teachesLabel={t.teaches as string}
          />
        </Container>
      </Section>
    </>
  );
}
