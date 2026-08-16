import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, Container, Section, ButtonLink } from "@/components/ui";

import { site } from "@/content/site";
import {
  courses,
  semesterLabel,
  kindLabel,
  type Semester,
} from "@/content/courses";
import { facultyById } from "@/content/faculty";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, itemListNode, courseNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Μαθήματα",
    annot: "Πρόγραμμα σπουδών",
    title: "Τα μαθήματα",
    answer:
      "Το ΠΜΣ περιλαμβάνει 12 διδασκόμενα μαθήματα σε τρία εξάμηνα και διπλωματική εργασία στο τέταρτο. Οκτώ μαθήματα είναι υποχρεωτικά και τέσσερα επιλέγονται από 11 προσφερόμενα μαθήματα επιλογής.",
    meta: [
      { label: "Σύνολο", value: "20 αντικείμενα" },
      { label: "Υποχρεωτικά", value: "8" },
      { label: "Επιλογής", value: "11" },
      { label: "ECTS", value: "120" },
    ],
    taughtBy: "Διδάσκει",
    taughtByPlural: "Διδάσκουν",
    ects: "ECTS",
    syllabus: "Περίγραμμα",
    readMore: "Αναλυτικά",
    ctaTitle: "Δεν βρήκες αυτό που έψαχνες;",
    ctaBody:
      "Η Γραμματεία απαντά σε ερωτήματα για την ύλη, τη μεθοδολογία και τις προϋποθέσεις κάθε μαθήματος.",
    ctaLink: "Επικοινωνία",
  },
  en: {
    crumbHome: "Home",
    crumb: "Courses",
    annot: "Curriculum",
    title: "The courses",
    answer:
      "The programme comprises 12 taught courses across three semesters and a dissertation in the fourth. Eight courses are compulsory and four are chosen from 11 electives on offer.",
    meta: [
      { label: "Total", value: "20 subjects" },
      { label: "Core", value: "8" },
      { label: "Electives", value: "11" },
      { label: "ECTS", value: "120" },
    ],
    taughtBy: "Taught by",
    taughtByPlural: "Taught by",
    ects: "ECTS",
    syllabus: "Outline",
    readMore: "Full detail",
    ctaTitle: "Not finding what you need?",
    ctaBody:
      "The Secretariat answers questions on the content, methodology and prerequisites of any course.",
    ctaLink: "Contact us",
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
    route: "courses",
    title:
      l === "el"
        ? "Μαθήματα ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική — Αναλυτικό πρόγραμμα"
        : "Courses — MSc Economic & Business Strategy curriculum",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["μαθήματα μεταπτυχιακού", "πρόγραμμα σπουδών ΠΜΣ", "μαθήματα επιλογής"]
        : ["postgraduate courses", "MSc curriculum", "elective courses"],
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const semesters: Semester[] = [1, 2, 3, 4];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "courses" },
          ]),
          itemListNode(
            t.title as string,
            courses.map((course) => ({
              name: course.title[l],
              url: `${site.url}${href(l, "courses", course.slug[l])}`,
            })),
          ),
          ...courses.map((course) => courseNode(course, l)),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "courses" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {semesters.map((semester, semesterIndex) => {
        const inSemester = courses.filter((c) => c.semester === semester);

        return (
          <Section
            key={semester}
            id={`semester-${semester}`}
            tone={semesterIndex % 2 === 0 ? "abyss" : "deep"}
          >
            <Container wide>
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-piraeus/40 pb-6">
                  <h2 className="text-title text-lume">
                    {semesterLabel[semester][l]}
                  </h2>
                  <p className="annot text-lume-faint">
                    {inSemester.length}{" "}
                    {l === "el"
                      ? inSemester.length === 1
                        ? "αντικείμενο"
                        : "αντικείμενα"
                      : inSemester.length === 1
                        ? "subject"
                        : "subjects"}{" "}
                    · 30 ECTS
                  </p>
                </div>
              </Reveal>

              <ul className="mt-2">
                {inSemester.map((course, index) => {
                  const instructors = course.instructors
                    .map(facultyById)
                    .filter(Boolean);

                  return (
                    <Reveal key={course.id} delay={index * 55} as="li">
                      <Link
                        href={href(l, "courses", course.slug[l])}
                        className="group grid gap-4 border-b border-piraeus/25 py-8 transition-colors duration-300 hover:border-brass lg:grid-cols-12 lg:gap-10"
                      >
                        <div className="lg:col-span-2">
                          <Annot
                            tone={course.kind === "core" ? "brass" : "dim"}
                            className="!gap-2"
                          >
                            {kindLabel[course.kind][l]}
                          </Annot>
                          <p className="sounding mt-3 text-sm text-lume-faint">
                            {course.ects} {t.ects as string}
                          </p>
                        </div>

                        <div className="lg:col-span-6">
                          <h3 className="font-display text-xl leading-snug font-semibold text-lume transition-colors duration-300 group-hover:text-brass md:text-2xl">
                            {course.title[l]}
                          </h3>
                          {instructors.length ? (
                            <p className="mt-2.5 text-sm text-lume-faint">
                              {instructors.length > 1
                                ? (t.taughtByPlural as string)
                                : (t.taughtBy as string)}
                              :{" "}
                              {instructors
                                .map((person) => person!.name[l])
                                .join(", ")}
                            </p>
                          ) : null}
                        </div>

                        <div className="lg:col-span-4">
                          <p className="leading-relaxed text-lume-dim">
                            {course.summary[l]}
                          </p>
                          <span className="annot mt-4 inline-flex items-center gap-2 text-brass opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {t.readMore as string}
                            <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </ul>
            </Container>
          </Section>
        );
      })}

      <Section tone="light">
        <Container wide>
          <Reveal className="max-w-2xl">
            <h2 className="text-title text-deep">{t.ctaTitle as string}</h2>
            <p className="text-lede mt-5 leading-relaxed text-deep/70">
              {t.ctaBody as string}
            </p>
            <div className="mt-9">
              <ButtonLink href={href(l, "contact")} variant="quiet">
                {t.ctaLink as string}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
