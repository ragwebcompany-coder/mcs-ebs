import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Section } from "@/components/ui";

import {
  courses,
  courseBySlug,
  semesterLabel,
  kindLabel,
} from "@/content/courses";
import { facultyById } from "@/content/faculty";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, courseNode } from "@/lib/schema";

/** Bottom-up: this page owns both dynamic segments. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    courses.map((course) => ({ locale, slug: course.slug[locale] })),
  );
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumbCourses: "Μαθήματα",
    semester: "Εξάμηνο",
    type: "Τύπος",
    credits: "Πιστωτικές μονάδες",
    instructor: "Διδάσκων",
    instructors: "Διδάσκοντες",
    topicsAnnot: "Θεματικές ενότητες",
    topicsTitle: "Τι καλύπτει το μάθημα",
    outcomesAnnot: "Μαθησιακά αποτελέσματα",
    outcomesTitle: "Τι θα μπορείς να κάνεις",
    outcomesLede:
      "Με την ολοκλήρωση του μαθήματος, θα είσαι σε θέση:",
    syllabusTitle: "Αναλυτικό περίγραμμα",
    syllabusBody:
      "Το επίσημο περίγραμμα του μαθήματος, όπως έχει εγκριθεί από τη Συνέλευση του Τμήματος.",
    syllabusLink: "Άνοιγμα περιγράμματος (PDF)",
    facultyLink: "Προφίλ διδάσκοντα",
    navAnnot: "Στο ίδιο εξάμηνο",
    allCourses: "Όλα τα μαθήματα",
  },
  en: {
    crumbHome: "Home",
    crumbCourses: "Courses",
    semester: "Semester",
    type: "Type",
    credits: "Credits",
    instructor: "Instructor",
    instructors: "Instructors",
    topicsAnnot: "Topics",
    topicsTitle: "What the course covers",
    outcomesAnnot: "Learning outcomes",
    outcomesTitle: "What you will be able to do",
    outcomesLede: "On completing the course, you will be able to:",
    syllabusTitle: "Full course outline",
    syllabusBody:
      "The official course outline, as approved by the Department Assembly.",
    syllabusLink: "Open the outline (PDF)",
    facultyLink: "Instructor profile",
    navAnnot: "In the same semester",
    allCourses: "All courses",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const course = courseBySlug(slug);
  if (!course) return {};

  const instructors = course.instructors
    .map(facultyById)
    .filter(Boolean)
    .map((person) => person!.name[l]);

  return buildMetadata({
    locale: l,
    route: "courses",
    slugs: course.slug,
    title:
      l === "el"
        ? `${course.title.el} — ${semesterLabel[course.semester].el} | ΠΜΣ ΟΕΣ Πανεπιστήμιο Πειραιώς`
        : `${course.title.en} — ${semesterLabel[course.semester].en} | MSc EBS University of Piraeus`,
    description: course.summary[l],
    keywords: [...course.topics[l].slice(0, 4), ...instructors],
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const course = courseBySlug(slug);
  if (!course || course.slug[l] !== slug) notFound();

  const t = copy[l];
  const instructors = course.instructors.map(facultyById).filter(Boolean);
  const siblings = courses.filter(
    (other) => other.semester === course.semester && other.id !== course.id,
  );

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome, route: "home" },
            { name: t.crumbCourses, route: "courses" },
            { name: course.title[l], route: "courses", slug: course.slug[l] },
          ]),
          courseNode(course, l),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumbCourses, route: "courses" },
          { label: course.title[l], route: "courses", slug: course.slug[l] },
        ]}
        annot={`${semesterLabel[course.semester][l]} · ${kindLabel[course.kind][l]}`}
        title={course.title[l]}
        answer={course.summary[l]}
        meta={[
          { label: t.semester, value: semesterLabel[course.semester][l] },
          { label: t.type, value: kindLabel[course.kind][l] },
          { label: t.credits, value: `${course.ects} ECTS` },
        ]}
      />

      {/* Positioning */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <p className="font-display text-2xl leading-[1.5] text-lume md:text-[1.75rem]">
                {course.body[l]}
              </p>
            </Reveal>

            {instructors.length ? (
              <Reveal delay={100} className="lg:col-span-5">
                <Annot className="mb-6">
                  {instructors.length > 1 ? t.instructors : t.instructor}
                </Annot>
                <ul className="space-y-8">
                  {instructors.map((person) => (
                    <li
                      key={person!.id}
                      className="border-t border-piraeus/40 pt-5"
                    >
                      <Link
                        href={href(l, "faculty", person!.slug[l])}
                        className="group block"
                      >
                        <p className="font-display text-xl font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                          {person!.name[l]}
                        </p>
                        <p className="mt-1 text-sm text-brass">
                          {person!.rank[l]}
                        </p>
                        <p className="mt-3 leading-relaxed text-lume-dim">
                          {person!.summary[l]}
                        </p>
                        <span className="annot mt-4 inline-flex items-center gap-2 text-lume-faint transition-colors duration-300 group-hover:text-brass">
                          {t.facultyLink}
                          <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Topics */}
      <Section tone="light">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <Annot className="mb-6">{t.topicsAnnot}</Annot>
              <h2 className="text-title leading-tight text-deep">
                {t.topicsTitle}
              </h2>
            </Reveal>

            <div className="lg:col-span-8">
              <ol className="grid gap-x-10 sm:grid-cols-2">
                {course.topics[l].map((topic, index) => (
                  <Reveal key={topic} delay={index * 45} as="li">
                    <div className="flex gap-5 border-t border-deep/15 py-5">
                      <span className="sounding shrink-0 text-sm text-brass">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed text-deep/80">
                        {topic}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* Outcomes */}
      <Section tone="deep">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <Annot className="mb-6">{t.outcomesAnnot}</Annot>
              <h2 className="text-title leading-tight text-lume">
                {t.outcomesTitle}
              </h2>
              <p className="mt-5 leading-relaxed text-lume-dim">
                {t.outcomesLede}
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              <ul className="space-y-0">
                {course.outcomes[l].map((outcome, index) => (
                  <Reveal key={outcome} delay={index * 60} as="li">
                    <div className="flex gap-6 border-t border-piraeus/40 py-6">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-6 shrink-0 bg-brass"
                      />
                      <span className="text-lede leading-relaxed text-lume">
                        {outcome}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>

              {course.syllabusUrl ? (
                <Reveal delay={200}>
                  <div className="mt-12 border border-piraeus/40 p-8">
                    <h3 className="font-display text-xl font-semibold text-lume">
                      {t.syllabusTitle}
                    </h3>
                    <p className="mt-3 leading-relaxed text-lume-dim">
                      {t.syllabusBody}
                    </p>
                    <div className="mt-7">
                      <ButtonLink
                        href={course.syllabusUrl}
                        variant="ghost"
                        external
                      >
                        {t.syllabusLink}
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* Siblings */}
      {siblings.length ? (
        <Section tone="abyss">
          <Container wide>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-piraeus/40 pb-6">
                <h2 className="text-title text-lume">
                  {semesterLabel[course.semester][l]}
                </h2>
                <Annot tone="dim">{t.navAnnot}</Annot>
              </div>
            </Reveal>

            <ul className="mt-2 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {siblings.map((other, index) => (
                <Reveal key={other.id} delay={index * 50} as="li">
                  <Link
                    href={href(l, "courses", other.slug[l])}
                    className="group block border-b border-piraeus/25 py-6 transition-colors duration-300 hover:border-brass"
                  >
                    <Annot
                      tone={other.kind === "core" ? "brass" : "dim"}
                      className="!gap-2"
                    >
                      {kindLabel[other.kind][l]}
                    </Annot>
                    <p className="mt-3 font-display text-lg leading-snug font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                      {other.title[l]}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-12">
              <ButtonLink href={href(l, "courses")} variant="ghost">
                {t.allCourses}
              </ButtonLink>
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
