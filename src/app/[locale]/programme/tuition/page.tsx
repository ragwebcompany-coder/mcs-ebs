import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumbProgramme: "Δομή & περιεχόμενο",
    crumb: "Δίδακτρα",
    annot: "Κόστος σπουδών",
    title: "Δίδακτρα & πληρωμές",
    answer:
      "Τα δίδακτρα του ΠΜΣ ανέρχονται σε 6.500 € για το σύνολο του προγράμματος και καταβάλλονται σε τέσσερις ισόποσες δόσεις των 1.625 €, μία στην αρχή κάθε εξαμήνου.",
    meta: [
      { label: "Σύνολο", value: "6.500 €" },
      { label: "Δόσεις", value: "4 × 1.625 €" },
      { label: "Ανά εξάμηνο", value: "1.625 €" },
    ],
    scheduleAnnot: "Χρονοδιάγραμμα καταβολής",
    scheduleTitle: "Τέσσερις δόσεις, μία ανά εξάμηνο",
    scheduleLede:
      "Κάθε δόση καταβάλλεται στην αρχή του αντίστοιχου εξαμήνου. Δεν υπάρχει προκαταβολή πέραν της πρώτης δόσης, η οποία συνοδεύει την εγγραφή.",
    rows: [
      { s: "Α΄ Εξάμηνο", w: "Με την εγγραφή", a: "1.625 €" },
      { s: "Β΄ Εξάμηνο", w: "Αρχή 2ου εξαμήνου", a: "1.625 €" },
      { s: "Γ΄ Εξάμηνο", w: "Αρχή 3ου εξαμήνου", a: "1.625 €" },
      { s: "Δ΄ Εξάμηνο", w: "Αρχή 4ου εξαμήνου", a: "1.625 €" },
    ],
    total: "Σύνολο",
    includedAnnot: "Τι περιλαμβάνεται",
    includedTitle: "Στα δίδακτρα περιλαμβάνονται",
    included: [
      "Η διδασκαλία και των 12 μαθημάτων του προγράμματος",
      "Η επίβλεψη και εξέταση της διπλωματικής εργασίας",
      "Οι οκτώ κύκλοι σεμιναρίων ενδυνάμωσης",
      "Πλήρης πρόσβαση στις υπηρεσίες του Πανεπιστημίου Πειραιώς",
      "Πρόσβαση στη βιβλιοθήκη, στις ηλεκτρονικές πηγές και στην υπηρεσία VPN",
      "Υποστήριξη από τη Γραμματεία καθ' όλη τη διάρκεια των σπουδών",
    ],
    notIncludedTitle: "Δεν περιλαμβάνονται",
    notIncluded: [
      "Το κόστος συμμετοχής στις προαιρετικές εκπαιδευτικές εκδρομές στο εξωτερικό",
      "Τα εξέταστρα των εξετάσεων επαγγελματικής πιστοποίησης CFA",
      "Προσωπικός εξοπλισμός και βιβλία πέραν του παρεχόμενου υλικού",
    ],
    reliefAnnot: "Μείωση κόστους",
    reliefTitle: "Τρόποι να μειώσετε το κόστος",
    reliefBody:
      "Το πρόγραμμα χορηγεί κάθε εξάμηνο τρεις υποτροφίες αριστείας των 1.000 €, ενώ στο τρίτο εξάμηνο δίνονται πέντε επιπλέον χορηγικές υποτροφίες. Υπάρχουν επίσης εξωτερικές πηγές χρηματοδότησης.",
    reliefLink: "Όλες οι υποτροφίες",
    ctaTitle: "Ερωτήσεις για τα δίδακτρα;",
    ctaBody:
      "Η Γραμματεία του ΠΜΣ απαντά σε ερωτήματα για τον τρόπο και τον χρόνο καταβολής πριν από την υποβολή της αίτησης.",
    ctaLink: "Επικοινωνία",
    applyLink: "Κάνε αίτηση",
  },
  en: {
    crumbHome: "Home",
    crumbProgramme: "Structure & content",
    crumb: "Tuition",
    annot: "Cost of study",
    title: "Tuition & payment",
    answer:
      "Tuition for the programme is €6,500 in total, paid in four equal instalments of €1,625, one at the start of each semester.",
    meta: [
      { label: "Total", value: "€6,500" },
      { label: "Instalments", value: "4 × €1,625" },
      { label: "Per semester", value: "€1,625" },
    ],
    scheduleAnnot: "Payment schedule",
    scheduleTitle: "Four instalments, one per semester",
    scheduleLede:
      "Each instalment falls due at the start of the corresponding semester. There is no deposit beyond the first instalment, which accompanies enrolment.",
    rows: [
      { s: "Semester 1", w: "On enrolment", a: "€1,625" },
      { s: "Semester 2", w: "Start of semester 2", a: "€1,625" },
      { s: "Semester 3", w: "Start of semester 3", a: "€1,625" },
      { s: "Semester 4", w: "Start of semester 4", a: "€1,625" },
    ],
    total: "Total",
    includedAnnot: "What is covered",
    includedTitle: "Tuition includes",
    included: [
      "Teaching of all 12 courses on the programme",
      "Supervision and examination of the dissertation",
      "All eight empowerment seminar series",
      "Full access to University of Piraeus services",
      "Library, electronic resources and VPN access",
      "Secretariat support throughout your studies",
    ],
    notIncludedTitle: "Not included",
    notIncluded: [
      "The cost of participating in the optional study trips abroad",
      "CFA professional certification examination fees",
      "Personal equipment and books beyond the material provided",
    ],
    reliefAnnot: "Reducing the cost",
    reliefTitle: "Ways to reduce what you pay",
    reliefBody:
      "The programme awards three merit scholarships of €1,000 every semester, with five further sponsored awards in the third semester. External funding sources are also available.",
    reliefLink: "All scholarships",
    ctaTitle: "Questions about tuition?",
    ctaBody:
      "The Secretariat answers questions on how and when payment is made, before you submit an application.",
    ctaLink: "Contact us",
    applyLink: "Apply now",
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
    route: "tuition",
    title:
      l === "el"
        ? "Δίδακτρα 6.500 € σε 4 δόσεις — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Tuition €6,500 in 4 instalments — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["δίδακτρα μεταπτυχιακού", "κόστος ΠΜΣ", "δόσεις διδάκτρων"]
        : ["postgraduate tuition fees", "MSc cost", "payment instalments"],
  });
}

export default async function TuitionPage({
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
            { name: t.crumbProgramme as string, route: "programme" },
            { name: t.crumb as string, route: "tuition" },
          ]),
          {
            "@type": "Offer",
            name: t.title as string,
            category: "Tuition",
            price: site.facts.tuitionEur,
            priceCurrency: "EUR",
            url: `${site.url}${href(l, "tuition")}`,
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: site.facts.tuitionEur,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumbProgramme as string, route: "programme" },
          { label: t.crumb as string, route: "tuition" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* Schedule */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.scheduleAnnot as string}
              title={t.scheduleTitle as string}
              lede={t.scheduleLede as string}
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-14 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <tbody>
                  {(t.rows as { s: string; w: string; a: string }[]).map(
                    (row) => (
                      <tr key={row.s} className="border-t border-piraeus/35">
                        <th
                          scope="row"
                          className="py-5 pr-6 font-display text-lg font-semibold text-lume"
                        >
                          {row.s}
                        </th>
                        <td className="py-5 pr-6 text-lume-dim">{row.w}</td>
                        <td className="sounding py-5 text-right text-lg font-semibold text-brass">
                          {row.a}
                        </td>
                      </tr>
                    ),
                  )}
                  <tr className="border-t-2 border-brass">
                    <th
                      scope="row"
                      className="annot py-5 pr-6 text-left text-brass"
                    >
                      {t.total as string}
                    </th>
                    <td />
                    <td className="sounding py-5 text-right text-2xl font-semibold text-brass">
                      {l === "el" ? "6.500 €" : "€6,500"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Included / not included */}
      <Section tone="light">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <Annot className="mb-6">{t.includedAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-deep">
                {t.includedTitle as string}
              </h2>
              <ul className="mt-8">
                {(t.included as string[]).map((item) => (
                  <li
                    key={item}
                    className="flex gap-5 border-t border-deep/15 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-5 shrink-0 bg-brass"
                    />
                    <span className="leading-relaxed text-deep/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-5">
              <h2 className="font-display text-xl font-semibold text-deep">
                {t.notIncludedTitle as string}
              </h2>
              <ul className="mt-6">
                {(t.notIncluded as string[]).map((item) => (
                  <li
                    key={item}
                    className="border-t border-deep/15 py-4 text-sm leading-relaxed text-deep/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Relief */}
      <Section tone="deep">
        <Container wide>
          <Reveal className="max-w-3xl">
            <Annot className="mb-6">{t.reliefAnnot as string}</Annot>
            <h2 className="text-title leading-tight text-lume">
              {t.reliefTitle as string}
            </h2>
            <p className="text-lede mt-6 leading-relaxed text-lume-dim">
              {t.reliefBody as string}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={href(l, "scholarships")} variant="ghost">
                {t.reliefLink as string}
              </ButtonLink>
              <ButtonLink href={href(l, "admissions")}>
                {t.applyLink as string}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Contact */}
      <Section tone="abyss">
        <Container wide>
          <Reveal className="max-w-2xl">
            <h2 className="text-title text-lume">{t.ctaTitle as string}</h2>
            <p className="text-lede mt-5 leading-relaxed text-lume-dim">
              {t.ctaBody as string}
            </p>
            <div className="mt-9">
              <ButtonLink href={href(l, "contact")} variant="ghost">
                {t.ctaLink as string}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
