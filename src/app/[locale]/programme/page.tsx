import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
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

import { courses, type Semester } from "@/content/courses";
import { pillars, seminars } from "@/content/programme";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, programmeNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Δομή & περιεχόμενο",
    annot: "Το πρόγραμμα",
    title: "Δομή & περιεχόμενο",
    answer:
      "Το ΠΜΣ διαρκεί τέσσερα εξάμηνα. Ο φοιτητής παρακολουθεί και εξετάζεται συνολικά σε 12 μαθήματα κατά τα τρία πρώτα εξάμηνα και εκπονεί διπλωματική εργασία στο τέταρτο, με δυνατότητα παράλληλης πρακτικής άσκησης.",
    meta: [
      { label: "Διάρκεια", value: "4 εξάμηνα" },
      { label: "Μαθήματα", value: "12" },
      { label: "ECTS", value: "120" },
      { label: "Δίδακτρα", value: "6.500 €" },
    ],
    designAnnot: "Σχεδιασμός",
    designTitle: "Χτισμένο για τις ανάγκες της ελληνικής επιχείρησης",
    designBody: [
      "Το πρόγραμμα έχει διαμορφωθεί με βάση τόσο τις γενικές προδιαγραφές αντίστοιχων προγραμμάτων ελληνικών και ξένων ΑΕΙ, όσο και τις ανάγκες της αγοράς.",
      "Το περιεχόμενο και η έμφασή του αντιστοιχούν στα χαρακτηριστικά των ελληνικών κυρίως επιχειρήσεων, με έμφαση στο μίγμα γνώσεων που προέρχονται από την οικονομική επιστήμη, τα χρηματοοικονομικά και την επιχειρησιακή στρατηγική.",
    ],
    ruleAnnot: "Ο κανόνας επιλογής",
    ruleTitle: "Πώς συμπληρώνονται τα 12 μαθήματα",
    rules: [
      {
        s: "Α΄ Εξάμηνο",
        t: "Και τα τέσσερα μαθήματα υποχρεωτικά",
        d: "Το εξάμηνο χτίζει το κοινό αναλυτικό υπόβαθρο: μικροοικονομική, μακροοικονομική, χρηματοοικονομική και μάρκετινγκ.",
      },
      {
        s: "Β΄ Εξάμηνο",
        t: "Δύο υποχρεωτικά + δύο της επιλογής σας",
        d: "Τα υποχρεωτικά καλύπτουν στρατηγική και διαχείριση έργων. Τα μαθήματα επιλογής επιτρέπουν πρώτη εξειδίκευση.",
      },
      {
        s: "Γ΄ Εξάμηνο",
        t: "Δύο υποχρεωτικά + δύο της επιλογής σας",
        d: "Πολιτική ανταγωνισμού και ποσοτικές μέθοδοι, μαζί με εξειδίκευση σε ακίνητα, FinTech, αναλυτική ή επιχειρηματικότητα.",
      },
      {
        s: "Δ΄ Εξάμηνο",
        t: "Διπλωματική εργασία",
        d: "Πρωτότυπη μελέτη υπό επίβλεψη, με δημόσια υποστήριξη. Παράλληλα μπορεί να γίνει πρακτική άσκηση.",
      },
    ],
    deliveryAnnot: "Τρόπος διδασκαλίας",
    deliveryTitle: "Υβριδικό, γιατί οι φοιτητές μας εργάζονται",
    deliveryBody:
      "Με τη χρήση της υβριδικής μεθόδου διδασκαλίας (blended learning) συνδυάζουμε την ευελιξία της εξ αποστάσεως εκπαίδευσης με την αμεσότητα της δια ζώσης διδασκαλίας, προσαρμοζόμενοι στις ανάγκες των σύγχρονων επαγγελματιών.",
    deliveryFacts: [
      { v: "18:15–21:00", l: "ώρες μαθημάτων", n: "καθημερινές, απογευματινές" },
      { v: "Υβριδικό", l: "τρόπος διδασκαλίας", n: "εξ αποστάσεως & δια ζώσης" },
      { v: "Πλήρης", l: "πρόσβαση στις υπηρεσίες", n: "βιβλιοθήκη, VPN, εργαστήρια" },
    ],
    seminarsAnnot: "Πέρα από την ύλη",
    seminarsTitle: "Οκτώ κύκλοι σεμιναρίων ενδυνάμωσης",
    seminarsLede:
      "Παρασκευή 18:00–21:00 και Σάββατο 11:00–14:00, χωρίς επιπλέον κόστος για τους φοιτητές του ΠΜΣ.",
    seminarsLink: "Αναλυτικά τα σεμινάρια",
    curriculumLink: "Δες όλα τα μαθήματα",
    tuitionLink: "Δίδακτρα & πληρωμές",
    core: "Υποχρεωτικά",
    elective: "Επιλογής",
  },
  en: {
    crumbHome: "Home",
    crumb: "Structure & content",
    annot: "The programme",
    title: "Structure & content",
    answer:
      "The programme runs for four semesters. Students take and are examined in 12 courses over the first three semesters and prepare a dissertation in the fourth, with the option of an internship in parallel.",
    meta: [
      { label: "Duration", value: "4 semesters" },
      { label: "Courses", value: "12" },
      { label: "ECTS", value: "120" },
      { label: "Tuition", value: "€6,500" },
    ],
    designAnnot: "Design",
    designTitle: "Built for what Greek businesses actually need",
    designBody: [
      "The programme is shaped both by the general specifications of comparable programmes at Greek and international universities and by the needs of the market.",
      "Its content and emphasis correspond to the characteristics of Greek businesses in particular, with weight given to the blend of knowledge drawn from economics, finance and business strategy.",
    ],
    ruleAnnot: "The selection rule",
    ruleTitle: "How the 12 courses are made up",
    rules: [
      {
        s: "Semester 1",
        t: "All four courses compulsory",
        d: "The semester builds the shared analytical foundation: microeconomics, macroeconomics, finance and marketing.",
      },
      {
        s: "Semester 2",
        t: "Two compulsory + two of your choosing",
        d: "The compulsory courses cover strategy and project management. The electives allow a first specialisation.",
      },
      {
        s: "Semester 3",
        t: "Two compulsory + two of your choosing",
        d: "Competition policy and quantitative methods, alongside specialisation in real estate, FinTech, analytics or entrepreneurship.",
      },
      {
        s: "Semester 4",
        t: "Dissertation",
        d: "An original supervised study, defended publicly. An internship may be undertaken in parallel.",
      },
    ],
    deliveryAnnot: "Delivery",
    deliveryTitle: "Hybrid, because our students work",
    deliveryBody:
      "Using a blended learning method, we combine the flexibility of distance education with the immediacy of in-person teaching, adapting to the needs of working professionals.",
    deliveryFacts: [
      { v: "18:15–21:00", l: "class hours", n: "weekday evenings" },
      { v: "Hybrid", l: "delivery mode", n: "remote & in person" },
      { v: "Full", l: "access to services", n: "library, VPN, labs" },
    ],
    seminarsAnnot: "Beyond the curriculum",
    seminarsTitle: "Eight empowerment seminar series",
    seminarsLede:
      "Fridays 18:00–21:00 and Saturdays 11:00–14:00, at no extra cost to enrolled students.",
    seminarsLink: "The seminars in detail",
    curriculumLink: "See all courses",
    tuitionLink: "Tuition & payment",
    core: "Core",
    elective: "Electives",
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
    route: "programme",
    title:
      l === "el"
        ? "Δομή & περιεχόμενο σπουδών — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Programme structure & content — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["δομή μεταπτυχιακού", "εξάμηνα ΠΜΣ", "υβριδική διδασκαλία", "120 ECTS"]
        : ["programme structure", "semesters", "blended learning", "120 ECTS"],
  });
}

export default async function ProgrammePage({
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
            { name: t.crumb as string, route: "programme" },
          ]),
          programmeNode(l),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "programme" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* Design rationale */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Annot className="mb-6">{t.designAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-lume">
                {t.designTitle as string}
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="text-lede space-y-5 leading-[1.75] text-lume-dim">
                {(t.designBody as string[]).map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The selection rule */}
      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.ruleAnnot as string}
              title={t.ruleTitle as string}
              tone="light"
            />
          </Reveal>

          <ol className="mt-16">
            {(t.rules as { s: string; t: string; d: string }[]).map(
              (rule, index) => {
                const semester = semesters[index];
                const inSemester = courses.filter(
                  (c) => c.semester === semester,
                );

                return (
                  <Reveal key={rule.s} delay={index * 80} as="li">
                    <div className="grid gap-6 border-t border-deep/15 py-10 lg:grid-cols-12 lg:gap-10">
                      <div className="lg:col-span-3">
                        <p className="sounding text-2xl font-semibold text-brass">
                          {rule.s}
                        </p>
                      </div>
                      <div className="lg:col-span-4">
                        <p className="font-display text-xl leading-snug font-semibold text-deep">
                          {rule.t}
                        </p>
                        <p className="mt-3 leading-relaxed text-deep/65">
                          {rule.d}
                        </p>
                      </div>
                      <div className="lg:col-span-5">
                        <ul className="space-y-1.5">
                          {inSemester.map((course) => (
                            <li key={course.id}>
                              <Link
                                href={href(l, "courses", course.slug[l])}
                                className="link-plot text-sm text-deep/70 hover:text-brass"
                              >
                                {course.title[l]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                );
              },
            )}
          </ol>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href={href(l, "courses")} variant="quiet">
              {t.curriculumLink as string}
            </ButtonLink>
            <ButtonLink href={href(l, "tuition")} variant="quiet">
              {t.tuitionLink as string}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* Delivery */}
      <Section tone="deep">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <Annot className="mb-6">{t.deliveryAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-lume">
                {t.deliveryTitle as string}
              </h2>
              <p className="text-lede mt-6 leading-relaxed text-lume-dim">
                {t.deliveryBody as string}
              </p>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-6">
              <div className="grid gap-8 sm:grid-cols-3">
                {(t.deliveryFacts as { v: string; l: string; n: string }[]).map(
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

      {/* Seminars */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.seminarsAnnot as string}
              title={t.seminarsTitle as string}
              lede={t.seminarsLede as string}
            />
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {seminars.map((seminar, index) => (
              <Reveal key={seminar.id} delay={index * 50} as="li">
                <div className="border-t border-piraeus/40 pt-5">
                  <h3 className="font-display text-base leading-snug font-semibold text-lume">
                    {seminar.title[l]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-lume-faint">
                    {seminar.detail[l]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12">
            <ButtonLink href={href(l, "seminars")} variant="ghost">
              {t.seminarsLink as string}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* Why it works — reuse of the pillars */}
      <Section tone="light">
        <Container wide>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delay={index * 60}>
                <article className="border-t border-deep/15 pt-6">
                  <h3 className="font-display text-xl font-semibold text-deep">
                    {pillar.title[l]}
                  </h3>
                  <p className="mt-3 leading-relaxed text-deep/65">
                    {pillar.detail[l]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
