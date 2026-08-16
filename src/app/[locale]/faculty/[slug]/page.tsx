import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Section } from "@/components/ui";

import {
  faculty,
  facultyBySlug,
  coursesTaughtBy,
} from "@/content/faculty";
import { semesterLabel, kindLabel } from "@/content/courses";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, personNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    faculty.map((person) => ({ locale, slug: person.slug[locale] })),
  );
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumbFaculty: "Διδακτικό προσωπικό",
    rank: "Βαθμίδα",
    department: "Τμήμα",
    coursesCount: "Μαθήματα",
    fieldsAnnot: "Γνωστικά αντικείμενα",
    fieldsTitle: "Ερευνητικά και διδακτικά πεδία",
    coursesAnnot: "Στο πρόγραμμα",
    coursesTitle: "Μαθήματα που διδάσκει",
    noCourses:
      "Ο διδάσκων συμμετέχει στο διδακτικό προσωπικό του ΠΜΣ. Η ανάθεση μαθημάτων ανακοινώνεται ανά ακαδημαϊκό έτος.",
    contactAnnot: "Επικοινωνία",
    email: "Email",
    phone: "Τηλέφωνο",
    allFaculty: "Όλο το διδακτικό προσωπικό",
    viewCourse: "Περίγραμμα μαθήματος",
  },
  en: {
    crumbHome: "Home",
    crumbFaculty: "Faculty",
    rank: "Rank",
    department: "Department",
    coursesCount: "Courses",
    fieldsAnnot: "Fields",
    fieldsTitle: "Research and teaching fields",
    coursesTitle: "Courses taught",
    coursesAnnot: "On the programme",
    noCourses:
      "A member of the programme's teaching staff. Course assignments are announced each academic year.",
    contactAnnot: "Contact",
    email: "Email",
    phone: "Telephone",
    allFaculty: "All teaching staff",
    viewCourse: "Course outline",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const person = facultyBySlug(slug);
  if (!person) return {};

  return buildMetadata({
    locale: l,
    route: "faculty",
    slugs: person.slug,
    title: `${person.name[l]} — ${person.rank[l]} | ${l === "el" ? "ΠΜΣ ΟΕΣ Πανεπιστήμιο Πειραιώς" : "MSc EBS University of Piraeus"}`,
    description: person.summary[l],
    type: "profile",
    keywords: person.fields[l],
  });
}

export default async function FacultyMemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const person = facultyBySlug(slug);
  if (!person || person.slug[l] !== slug) notFound();

  const t = copy[l];
  const taught = coursesTaughtBy(person.id);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome, route: "home" },
            { name: t.crumbFaculty, route: "faculty" },
            { name: person.name[l], route: "faculty", slug: person.slug[l] },
          ]),
          personNode(person, l),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumbFaculty, route: "faculty" },
          { label: person.name[l], route: "faculty", slug: person.slug[l] },
        ]}
        annot={person.role?.[l] ?? person.rank[l]}
        title={person.name[l]}
        answer={person.summary[l]}
        meta={[
          { label: t.rank, value: person.rank[l] },
          { label: t.coursesCount, value: String(taught.length) },
        ]}
      />

      {/* Fields + contact */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <Annot className="mb-6">{t.fieldsAnnot}</Annot>
              <h2 className="text-title leading-tight text-lume">
                {t.fieldsTitle}
              </h2>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {person.fields[l].map((field) => (
                  <li
                    key={field}
                    className="border border-piraeus/45 px-4 py-2 text-sm text-lume-dim"
                  >
                    {field}
                  </li>
                ))}
              </ul>
            </Reveal>

            {person.email || person.phone ? (
              <Reveal delay={110} className="lg:col-span-5">
                <Annot className="mb-6">{t.contactAnnot}</Annot>
                <dl className="space-y-5">
                  {person.email ? (
                    <div className="border-t border-piraeus/40 pt-4">
                      <dt className="annot text-lume-faint">{t.email}</dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${person.email}`}
                          className="link-plot text-brass"
                        >
                          {person.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {person.phone ? (
                    <div className="border-t border-piraeus/40 pt-4">
                      <dt className="annot text-lume-faint">{t.phone}</dt>
                      <dd className="sounding mt-2">
                        <a
                          href={`tel:${person.phone}`}
                          className="link-plot text-lume"
                        >
                          {person.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Courses */}
      <Section tone="light">
        <Container wide>
          <Reveal>
            <Annot className="mb-6">{t.coursesAnnot}</Annot>
            <h2 className="text-title leading-tight text-deep">
              {t.coursesTitle}
            </h2>
          </Reveal>

          {taught.length ? (
            <ul className="mt-12">
              {taught.map((course, index) => (
                <Reveal key={course.id} delay={index * 70} as="li">
                  <Link
                    href={href(l, "courses", course.slug[l])}
                    className="group grid gap-4 border-t border-deep/15 py-8 lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="lg:col-span-3">
                      <p className="annot text-brass">
                        {semesterLabel[course.semester][l]}
                      </p>
                      <p className="mt-2 text-sm text-deep/50">
                        {kindLabel[course.kind][l]} · {course.ects} ECTS
                      </p>
                    </div>
                    <div className="lg:col-span-9">
                      <h3 className="font-display text-xl leading-snug font-semibold text-deep transition-colors duration-300 group-hover:text-brass md:text-2xl">
                        {course.title[l]}
                      </h3>
                      <p className="mt-3 max-w-3xl leading-relaxed text-deep/65">
                        {course.summary[l]}
                      </p>
                      <span className="annot mt-4 inline-flex items-center gap-2 text-deep/40 transition-colors duration-300 group-hover:text-brass">
                        {t.viewCourse}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <p className="text-lede mt-8 max-w-2xl leading-relaxed text-deep/65">
                {t.noCourses}
              </p>
            </Reveal>
          )}

          <Reveal className="mt-12">
            <ButtonLink href={href(l, "faculty")} variant="quiet">
              {t.allFaculty}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
