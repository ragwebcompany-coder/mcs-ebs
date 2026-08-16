import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Portolan } from "@/components/Portolan";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import {
  Annot,
  ButtonLink,
  Container,
  Heading,
  Section,
  Sounding,
} from "@/components/ui";

import { site, employmentBreakdown } from "@/content/site";
import { courses, semesterLabel, type Semester } from "@/content/courses";
import { pillars, trips } from "@/content/programme";
import { internshipPartners } from "@/content/partners";
import { faq } from "@/content/faq";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, faqNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    eyebrow: "Πανεπιστήμιο Πειραιώς · Τμήμα Οικονομικής Επιστήμης · από το 2006",
    h1a: "Οικονομική &",
    h1b: "Επιχειρησιακή",
    h1c: "Στρατηγική",
    kicker: "Πρόγραμμα Μεταπτυχιακών Σπουδών (M.Sc.)",
    lede: "Υβριδικό μεταπτυχιακό δύο ετών που γεφυρώνει την οικονομική ανάλυση με τη στρατηγική απόφαση. Δώδεκα μαθήματα, διπλωματική εργασία και προαιρετική πρακτική άσκηση σε πάνω από 40 συνεργαζόμενες επιχειρήσεις.",
    ctaPrimary: "Κάνε αίτηση",
    ctaSecondary: "Δες τα μαθήματα",
    applyStripTitle: "Η αίτηση γίνεται ηλεκτρονικά",
    applyStripBody:
      "Δες τα βήματα, τα δικαιολογητικά και τα στοιχεία επικοινωνίας της Γραμματείας πριν την υποβολή.",
    factsAnnot: "Το πρόγραμμα σε αριθμούς",
    facts: [
      { v: "4", l: "εξάμηνα φοίτησης", n: "3 διδακτικά + 1 διπλωματική" },
      { v: "120", l: "πιστωτικές μονάδες ECTS", n: "12 μαθήματα + διπλωματική" },
      { v: "6.500 €", l: "συνολικά δίδακτρα", n: "σε 4 ισόποσες δόσεις" },
      { v: "40+", l: "συνεργαζόμενοι εργοδότες", n: "για πρακτική άσκηση" },
    ],
    letterAnnot: "Από τον Διευθυντή",
    letterTitle: "Δεν παρέχουμε γνώσεις. Δημιουργούμε στελέχη που αποφασίζουν.",
    letterBody: [
      "Σε ένα διεθνές περιβάλλον που μεταβάλλεται ραγδαία, η επιλογή των μεταπτυχιακών σας σπουδών αποτελεί στρατηγική επένδυση για το μέλλον σας.",
      "Το πρόγραμμά μας γεφυρώνει την οικονομική θεωρία με την αγορά εργασίας, χρησιμοποιώντας μελέτες περιπτώσεων από την ελληνική και τη διεθνή πραγματικότητα. Αν θέλετε να συνδυάσετε την οικονομική θεωρία με τη στρατηγική διοίκηση στην πράξη, αυτή είναι η στιγμή σας.",
    ],
    letterSign: "Ιδρυτής και Διευθυντής του ΠΜΣ",
    pillarsAnnot: "Γιατί αυτό το πρόγραμμα",
    pillarsTitle: "Έξι λόγοι που το ξεχωρίζουν",
    courseAnnot: "Η πορεία σπουδών",
    courseTitle: "Τέσσερα εξάμηνα, χαραγμένα",
    courseLede:
      "Το πρώτο εξάμηνο χτίζει το αναλυτικό θεμέλιο. Το δεύτερο και το τρίτο συνδυάζουν υποχρεωτικά μαθήματα με εξειδίκευση της επιλογής σας. Το τέταρτο είναι δικό σας.",
    coursesLink: "Όλα τα μαθήματα",
    core: "Υποχρεωτικά",
    elective: "Επιλογής",
    careersAnnot: "Επαγγελματική αποκατάσταση",
    careersTitle: "Πού εργάζονται οι απόφοιτοί μας",
    careersLede:
      "Στοιχεία από την έρευνα αποφοίτων του ΠΜΣ. Το πρόγραμμα λειτουργεί αδιάλειπτα από το 2006 και η σύνδεσή του με την αγορά εργασίας έχει αναγνωριστεί από την Επιτροπή Εξωτερικής Αξιολόγησης.",
    careersLink: "Αναλυτικά στοιχεία",
    intlAnnot: "Διεθνής εμπειρία",
    intlTitle: "Η αίθουσα δεν σταματά στον Πειραιά",
    intlLede:
      "Κάθε χρόνο το πρόγραμμα ταξιδεύει. Κορυφαία πανεπιστήμια, θεσμικά όργανα και εργοστάσια — εκεί όπου η στρατηγική εφαρμόζεται στην πράξη.",
    intlLink: "Όλες οι δραστηριότητες",
    partnersAnnot: "Διασύνδεση με την αγορά",
    partnersTitle: "Εκεί κάνουν πρακτική οι φοιτητές μας",
    partnersLink: "Πρόγραμμα πρακτικής άσκησης",
    cfaAnnot: "Θεσμική αναγνώριση",
    cfaTitle: "CFA Institute University Affiliation Program",
    cfaBody:
      "Η συμμετοχή στο πρόγραμμα πιστοποιεί ότι η ύλη μας είναι στενά συνδεδεμένη με τις πρακτικές της αγοράς και προετοιμάζει τους φοιτητές για τις εξετάσεις Chartered Financial Analyst. Το ΠΜΣ χορηγεί κάθε χρόνο περιορισμένο αριθμό υποτροφιών για μειωμένα εξέταστρα CFA.",
    faqAnnot: "Συχνές ερωτήσεις",
    faqTitle: "Τα βασικά, χωρίς περιστροφές",
    faqLink: "Όλες οι ερωτήσεις",
    ctaTitle: "Αναζητούμε τα επόμενα στελέχη της επιχειρησιακής στρατηγικής.",
    ctaBody:
      "Οι αιτήσεις υποβάλλονται ηλεκτρονικά. Η Γραμματεία απαντά σε κάθε ερώτημα πριν από την υποβολή.",
    ctaContact: "Επικοινωνία",
  },
  en: {
    eyebrow: "University of Piraeus · Department of Economics · since 2006",
    h1a: "Economic &",
    h1b: "Business",
    h1c: "Strategy",
    kicker: "Master of Science (M.Sc.)",
    lede: "A two-year hybrid master's bridging economic analysis and the strategic decision. Twelve courses, a dissertation and an optional internship across more than 40 partner employers.",
    ctaPrimary: "Apply now",
    ctaSecondary: "See the courses",
    applyStripTitle: "Applications are submitted online",
    applyStripBody:
      "Review the steps, required documents and Secretariat contact details before submission.",
    factsAnnot: "The programme in figures",
    facts: [
      { v: "4", l: "semesters", n: "3 taught + 1 dissertation" },
      { v: "120", l: "ECTS credits", n: "12 courses + dissertation" },
      { v: "€6,500", l: "total tuition", n: "in 4 equal instalments" },
      { v: "40+", l: "partner employers", n: "for internships" },
    ],
    letterAnnot: "From the Director",
    letterTitle: "We do not deliver knowledge. We build people who decide.",
    letterBody: [
      "In an international environment changing at speed, the choice of your postgraduate studies is a strategic investment in your future.",
      "Our programme bridges economic theory and the labour market, working through case studies drawn from Greek and international practice. If you want to combine economic theory with strategic management in practice, this is your moment.",
    ],
    letterSign: "Founder and Director of the Programme",
    pillarsAnnot: "Why this programme",
    pillarsTitle: "Six things that set it apart",
    courseAnnot: "The course of study",
    courseTitle: "Four semesters, plotted",
    courseLede:
      "The first semester builds the analytical foundation. The second and third combine compulsory courses with a specialism of your choosing. The fourth is yours.",
    coursesLink: "All courses",
    core: "Core",
    elective: "Electives",
    careersAnnot: "Career outcomes",
    careersTitle: "Where our graduates work",
    careersLede:
      "Figures from the programme's own alumni survey. The programme has run continuously since 2006, and its connection to the labour market has been recognised by the External Evaluation Committee.",
    careersLink: "Full breakdown",
    intlAnnot: "International exposure",
    intlTitle: "The classroom does not stop at Piraeus",
    intlLede:
      "The programme travels every year. Leading universities, institutions and factories — where strategy is actually applied.",
    intlLink: "All activities",
    partnersAnnot: "Connected to the market",
    partnersTitle: "Where our students intern",
    partnersLink: "Internship programme",
    cfaAnnot: "Institutional recognition",
    cfaTitle: "CFA Institute University Affiliation Program",
    cfaBody:
      "Participation certifies that our curriculum is closely tied to professional practice and prepares students for the Chartered Financial Analyst examinations. The programme awards a limited number of reduced CFA exam fee scholarships each year.",
    faqAnnot: "Frequently asked",
    faqTitle: "The essentials, without the runaround",
    faqLink: "All questions",
    ctaTitle: "We are looking for the next generation of strategy professionals.",
    ctaBody:
      "Applications are submitted online. The Secretariat answers any question before you apply.",
    ctaContact: "Contact us",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typed = locale as Locale;

  return buildMetadata({
    locale: typed,
    route: "home",
    title:
      typed === "el"
        ? "ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική | Πανεπιστήμιο Πειραιώς"
        : "MSc in Economic & Business Strategy | University of Piraeus",
    description: site.description[typed],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const semesters: Semester[] = [1, 2, 3, 4];
  const featuredFaq = faq.slice(0, 5);

  return (
    <>
      <JsonLd data={graph(faqNode(l))} />

      {/* ─────────────────────────── Hero ─────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-abyss pt-32 pb-24 md:pt-40 md:pb-28">
        {/* The chart occupies the right field; the headline column stays clear. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-45 lg:w-[68%] lg:opacity-100">
          <Portolan locale={l} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-abyss from-25% via-abyss/85 via-55% to-transparent"
        />

        <Container wide className="relative">
          <p
            className="annot plot-in text-brass"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            {t.eyebrow}
          </p>

          <h1 className="mt-8 max-w-5xl">
            <span className="sr-only">
              {l === "el"
                ? "Πρόγραμμα Μεταπτυχιακών Σπουδών Οικονομική και Επιχειρησιακή Στρατηγική, Πανεπιστήμιο Πειραιώς"
                : "MSc in Economic and Business Strategy, University of Piraeus"}
            </span>
            <span aria-hidden="true" className="block">
              {[t.h1a, t.h1b, t.h1c].map((line, index) => (
                <span
                  key={line}
                  className="plot-in text-hero block leading-[0.92] font-semibold tracking-[-0.035em] text-lume"
                  style={{ "--delay": `${180 + index * 110}ms` } as React.CSSProperties}
                >
                  {index === 2 ? (
                    <span className="text-brass italic">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </span>
          </h1>

          <div
            className="plot-in mt-10 grid max-w-2xl gap-4 sm:gap-6"
            style={{ "--delay": "560ms" } as React.CSSProperties}
          >
            <p className="annot border-l-2 border-brass pl-4 text-lume-dim">
              {t.kicker}
            </p>
            <p className="text-lede leading-relaxed text-lume-dim">{t.lede}</p>
          </div>

          <div
            className="plot-in mt-12 flex flex-wrap gap-4"
            style={{ "--delay": "680ms" } as React.CSSProperties}
          >
            <ButtonLink href={href(l, "admissions")}>{t.ctaPrimary}</ButtonLink>
            <ButtonLink href={href(l, "courses")} variant="ghost">
              {t.ctaSecondary}
            </ButtonLink>
          </div>

          <Link
            href={href(l, "admissions")}
            className="plot-in group mt-8 grid max-w-2xl gap-3 border border-brass/45 bg-deep/70 p-5 shadow-[0_0_60px_-35px_rgba(227,190,114,0.9)] backdrop-blur-sm transition-all duration-300 hover:border-brass hover:bg-deep sm:grid-cols-[1fr_auto] sm:items-center"
            style={{ "--delay": "740ms" } as React.CSSProperties}
          >
            <span>
              <span className="annot text-brass">{t.applyStripTitle}</span>
              <span className="mt-2 block text-sm leading-relaxed text-lume-dim">
                {t.applyStripBody}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center border border-brass/55 text-xl text-brass transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          {/* Plotted figures */}
          <div
            className="plot-in mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            style={{ "--delay": "820ms" } as React.CSSProperties}
          >
            {t.facts.map((fact) => (
              <Sounding key={fact.l} value={fact.v} label={fact.l} note={fact.n} />
            ))}
          </div>
        </Container>
      </section>

      {/* ────────────────────── Director's position ────────────────────── */}
      <Section tone="deep">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <Annot className="mb-7">{t.letterAnnot}</Annot>
              <h2 className="text-display leading-[1.08] text-lume">
                {t.letterTitle}
              </h2>
              <div className="text-lede mt-8 space-y-5 leading-[1.75] text-lume-dim">
                {t.letterBody.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <figure className="mt-10 border-l-2 border-brass pl-6">
                <figcaption className="text-sm">
                  <span className="block font-display text-lg font-semibold text-lume">
                    {site.contact.director.name[l]}
                  </span>
                  <span className="mt-1 block text-lume-faint">
                    {t.letterSign}
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src="/media/gallery/ny-washington-2024.jpg"
                  alt={
                    l === "el"
                      ? "Φοιτητές και διδάσκοντες του ΠΜΣ στην εκπαιδευτική εκδρομή σε Νέα Υόρκη και Ουάσιγκτον, Δεκέμβριος 2024"
                      : "Students and faculty of the programme on the study trip to New York City and Washington DC, December 2024"
                  }
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent"
                />
              </div>
              <p className="annot mt-4 text-lume-faint">
                {l === "el"
                  ? "Νέα Υόρκη & Ουάσιγκτον · Δεκέμβριος 2024"
                  : "New York City & Washington DC · December 2024"}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── Pillars ─────────────────────────── */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading annot={t.pillarsAnnot} title={t.pillarsTitle} />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delay={index * 70}>
                <article className="group border-t border-piraeus/40 pt-6 transition-colors duration-500 hover:border-brass">
                  <h3 className="font-display text-xl font-semibold text-lume">
                    {pillar.title[l]}
                  </h3>
                  <p className="mt-3 leading-relaxed text-lume-dim">
                    {pillar.detail[l]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ──────────────────────── The four semesters ──────────────────────── */}
      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.courseAnnot}
              title={t.courseTitle}
              lede={t.courseLede}
              tone="light"
            />
          </Reveal>

          <div className="mt-16 space-y-px">
            {semesters.map((semester, index) => {
              const inSemester = courses.filter((c) => c.semester === semester);
              const core = inSemester.filter((c) => c.kind === "core");
              const electives = inSemester.filter((c) => c.kind === "elective");
              const dissertation = inSemester.filter(
                (c) => c.kind === "dissertation",
              );

              return (
                <Reveal key={semester} delay={index * 90}>
                  <div className="grid gap-6 border-t border-deep/15 py-9 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-3">
                      <p className="sounding text-3xl font-semibold text-brass">
                        {semesterLabel[semester][l]}
                      </p>
                      <p className="mt-2 text-sm text-deep/55">
                        {semester === 4
                          ? l === "el"
                            ? "30 ECTS · διπλωματική"
                            : "30 ECTS · dissertation"
                          : l === "el"
                            ? "30 ECTS · 4 μαθήματα"
                            : "30 ECTS · 4 courses"}
                      </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:col-span-9">
                      {core.length ? (
                        <div>
                          <p className="annot mb-3 text-deep/45">{t.core}</p>
                          <ul className="space-y-2">
                            {core.map((course) => (
                              <li key={course.id}>
                                <Link
                                  href={href(l, "courses", course.slug[l])}
                                  className="link-plot text-[0.95rem] leading-snug font-medium text-deep hover:text-brass"
                                >
                                  {course.title[l]}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {electives.length ? (
                        <div>
                          <p className="annot mb-3 text-deep/45">
                            {t.elective} ({electives.length})
                          </p>
                          <ul className="space-y-2">
                            {electives.map((course) => (
                              <li key={course.id}>
                                <Link
                                  href={href(l, "courses", course.slug[l])}
                                  className="link-plot text-[0.95rem] leading-snug text-deep/75 hover:text-brass"
                                >
                                  {course.title[l]}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {dissertation.map((course) => (
                        <div key={course.id} className="sm:col-span-2">
                          <Link
                            href={href(l, "courses", course.slug[l])}
                            className="link-plot font-display text-xl font-semibold text-deep hover:text-brass"
                          >
                            {course.title[l]}
                          </Link>
                          <p className="mt-2 max-w-2xl leading-relaxed text-deep/60">
                            {course.summary[l]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12">
            <ButtonLink href={href(l, "courses")} variant="quiet">
              {t.coursesLink}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* ─────────────────────────── Careers ─────────────────────────── */}
      <Section tone="deep">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Heading
                annot={t.careersAnnot}
                title={t.careersTitle}
                lede={t.careersLede}
              />
              <div className="mt-9">
                <ButtonLink href={href(l, "careers")} variant="ghost">
                  {t.careersLink}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-7">
              <dl className="space-y-7">
                {employmentBreakdown.map((row) => (
                  <div key={row.sector.en}>
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="font-medium text-lume">{row.sector[l]}</dt>
                      <dd className="sounding shrink-0 text-2xl font-semibold text-brass">
                        {row.percent}%
                      </dd>
                    </div>
                    {/* Proportional bar, scaled against the largest share */}
                    <div
                      className="mt-2.5 h-px w-full bg-piraeus/35"
                      aria-hidden="true"
                    >
                      <div
                        className="h-px bg-brass"
                        style={{ width: `${(row.percent / 32) * 100}%` }}
                      />
                    </div>
                    {row.examples ? (
                      <p className="mt-2 text-xs text-lume-faint">
                        {row.examples}
                      </p>
                    ) : null}
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ────────────────────── International ────────────────────── */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading annot={t.intlAnnot} title={t.intlTitle} lede={t.intlLede} />
          </Reveal>

          <ol className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {trips.slice(0, 6).map((trip, index) => (
              <Reveal key={`${trip.year}-${trip.place.en}`} delay={index * 60}>
                <li className="border-t border-piraeus/40 pt-5">
                  <p className="annot text-brass">{trip.season[l]}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-lume">
                    {trip.place[l]}
                  </h3>
                  <p className="mt-2 leading-relaxed text-lume-dim">
                    {trip.detail[l]}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12">
            <ButtonLink href={href(l, "international")} variant="ghost">
              {t.intlLink}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* ─────────────────────── Internship partners ─────────────────────── */}
      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.partnersAnnot}
              title={t.partnersTitle}
              tone="light"
            />
          </Reveal>

          <Reveal delay={90}>
            <ul className="mt-14 flex flex-wrap gap-x-3 gap-y-3">
              {internshipPartners.map((partner) => (
                <li
                  key={partner.name}
                  className="border border-deep/15 px-4 py-2.5 text-sm text-deep/75 transition-colors duration-300 hover:border-brass hover:text-deep"
                >
                  {partner.name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <ButtonLink href={href(l, "internship")} variant="quiet">
              {t.partnersLink}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* ─────────────────────────── CFA ─────────────────────────── */}
      <Section tone="deep">
        <Container wide>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <div className="relative aspect-3/2 w-full max-w-xs bg-bone p-8">
                <Image
                  src="/media/brand/cfa-uap.jpg"
                  alt="CFA Institute University Affiliation Program"
                  fill
                  sizes="320px"
                  className="object-contain p-8"
                />
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8">
              <Annot className="mb-6">{t.cfaAnnot}</Annot>
              <h2 className="text-title leading-tight text-lume">{t.cfaTitle}</h2>
              <p className="text-lede mt-6 leading-relaxed text-lume-dim">
                {t.cfaBody}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── FAQ ─────────────────────────── */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <Heading annot={t.faqAnnot} title={t.faqTitle} />
              <div className="mt-9">
                <ButtonLink href={href(l, "faq")} variant="ghost">
                  {t.faqLink}
                </ButtonLink>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <dl className="space-y-px">
                {featuredFaq.map((item, index) => (
                  <Reveal key={item.id} delay={index * 60}>
                    <div className="border-t border-piraeus/40 py-7">
                      <dt className="font-display text-lg font-semibold text-lume">
                        {item.question[l]}
                      </dt>
                      <dd className="mt-3 leading-relaxed text-lume-dim">
                        {item.answer[l]}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────── Closing CTA ─────────────────────────── */}
      <section className="relative overflow-hidden border-t border-piraeus/30 bg-deep py-28 md:py-36">
        <div
          aria-hidden="true"
          className="isobath pointer-events-none absolute inset-0 opacity-45"
          style={{ "--isobath-x": "12%", "--isobath-y": "88%" } as React.CSSProperties}
        />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display mx-auto max-w-4xl leading-[1.08] text-lume">
              {t.ctaTitle}
            </h2>
            <p className="text-lede mx-auto mt-7 max-w-2xl leading-relaxed text-lume-dim">
              {t.ctaBody}
            </p>
            <div className="mt-11 flex flex-wrap justify-center gap-4">
              <ButtonLink href={href(l, "admissions")}>
                {t.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={href(l, "contact")} variant="ghost">
                {t.ctaContact}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
