import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, Container, Heading, Section, Sounding } from "@/components/ui";

import { faqByGroup } from "@/content/faq";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const external = [
  { name: "Ίδρυμα Μποδοσάκη", nameEn: "Bodossaki Foundation", url: "https://www.bodossaki.gr/" },
  { name: "Ίδρυμα Ωνάση", nameEn: "Onassis Foundation", url: "https://www.onassis.org/" },
  { name: "Ίδρυμα Κρατικών Υποτροφιών (ΙΚΥ)", nameEn: "State Scholarships Foundation (IKY)", url: "https://www.iky.gr/" },
  { name: "Κοινωφελές Ίδρυμα Ιωάννου Σ. Λάτση", nameEn: "John S. Latsis Public Benefit Foundation", url: "https://www.latsis-foundation.org/" },
];

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Υποτροφίες",
    annot: "Χρηματοδότηση σπουδών",
    title: "Υποτροφίες",
    answer:
      "Το ΠΜΣ χορηγεί κάθε εξάμηνο τρεις υποτροφίες των 1.000 € στους φοιτητές με την καλύτερη επίδοση. Στο τρίτο εξάμηνο δίνονται επιπλέον πέντε χορηγικές υποτροφίες, τρεις από τη WIND και δύο από τη Data Communication.",
    meta: [
      { label: "Ανά εξάμηνο", value: "3 × 1.000 €" },
      { label: "Χορηγικές", value: "5" },
      { label: "Κριτήριο", value: "Επίδοση" },
    ],
    meritAnnot: "Υποτροφίες αριστείας",
    meritTitle: "Τρεις υποτροφίες κάθε εξάμηνο",
    meritLede:
      "Χορηγούνται από το ίδιο το πρόγραμμα στους φοιτητές με την καλύτερη ακαδημαϊκή επίδοση. Δεν απαιτείται ξεχωριστή αίτηση — η αξιολόγηση γίνεται αυτόματα με βάση τη βαθμολογία του εξαμήνου.",
    meritFacts: [
      { v: "3", l: "υποτροφίες ανά εξάμηνο", n: "με κριτήριο την επίδοση" },
      { v: "1.000 €", l: "ύψος κάθε υποτροφίας", n: "συμψηφίζεται με τα δίδακτρα" },
      { v: "12", l: "υποτροφίες ανά κύκλο", n: "σε τέσσερα εξάμηνα" },
    ],
    sponsorAnnot: "Χορηγικές υποτροφίες",
    sponsorTitle: "WIND και Data Communication",
    sponsorBody:
      "Στο πλαίσιο της συνεργασίας του προγράμματος με τις εταιρείες WIND και Data Communication, χορηγούνται τρεις υποτροφίες από τη WIND και δύο από τη Data Communication σε πέντε διακριθέντες φοιτητές του τρίτου εξαμήνου. Οι υποτροφίες απονέμονται σε ειδική τελετή που πραγματοποιείται την πρώτη εβδομάδα του Οκτωβρίου.",
    cfaAnnot: "Επαγγελματική πιστοποίηση",
    cfaTitle: "Υποτροφίες εξέταστρων CFA",
    cfaBody:
      "Μέσω της συμμετοχής του στο CFA Institute University Affiliation Program, το ΠΜΣ χορηγεί κάθε χρόνο περιορισμένο αριθμό υποτροφιών για μειωμένη καταβολή εξέταστρων στις εξετάσεις επαγγελματικής πιστοποίησης του CFA Program.",
    externalAnnot: "Εξωτερικές πηγές",
    externalTitle: "Ιδρύματα που χορηγούν υποτροφίες μεταπτυχιακών σπουδών",
    externalLede:
      "Πέραν των υποτροφιών του προγράμματος, μπορείτε να συμβουλευτείτε τα παρακάτω ιδρύματα που χορηγούν ενεργά υποτροφίες για μεταπτυχιακές σπουδές στην Ελλάδα.",
    visit: "Επίσκεψη",
    faqTitle: "Ερωτήσεις για δίδακτρα και υποτροφίες",
    tuitionLink: "Δίδακτρα & πληρωμές",
    applyLink: "Κάνε αίτηση",
  },
  en: {
    crumbHome: "Home",
    crumb: "Scholarships",
    annot: "Funding your studies",
    title: "Scholarships",
    answer:
      "The programme awards three scholarships of €1,000 each semester to the highest-performing students. A further five sponsored awards are made in the third semester, three from WIND and two from Data Communication.",
    meta: [
      { label: "Per semester", value: "3 × €1,000" },
      { label: "Sponsored", value: "5" },
      { label: "Criterion", value: "Performance" },
    ],
    meritAnnot: "Merit scholarships",
    meritTitle: "Three awards every semester",
    meritLede:
      "Awarded by the programme itself to the students with the strongest academic performance. No separate application is required — assessment is automatic, based on semester results.",
    meritFacts: [
      { v: "3", l: "awards per semester", n: "on academic performance" },
      { v: "€1,000", l: "value of each award", n: "set against tuition" },
      { v: "12", l: "awards per cohort", n: "across four semesters" },
    ],
    sponsorAnnot: "Sponsored awards",
    sponsorTitle: "WIND and Data Communication",
    sponsorBody:
      "Through the programme's partnerships with WIND and Data Communication, three awards from WIND and two from Data Communication are made to five distinguished third-semester students. They are presented at a ceremony held in the first week of October.",
    cfaAnnot: "Professional certification",
    cfaTitle: "CFA examination fee awards",
    cfaBody:
      "Through its participation in the CFA Institute University Affiliation Program, the programme awards a limited number of reduced examination fee scholarships for the CFA Program each year.",
    externalAnnot: "External sources",
    externalTitle: "Foundations funding postgraduate study",
    externalLede:
      "Beyond the programme's own awards, the following foundations actively fund postgraduate study in Greece.",
    visit: "Visit",
    faqTitle: "Questions on tuition and funding",
    tuitionLink: "Tuition & payment",
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
    route: "scholarships",
    title:
      l === "el"
        ? "Υποτροφίες 1.000 € ανά εξάμηνο — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Scholarships of €1,000 per semester — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["υποτροφίες μεταπτυχιακού", "υποτροφίες ΠΜΣ Πειραιάς", "χρηματοδότηση σπουδών"]
        : ["postgraduate scholarships", "MSc funding", "merit awards"],
  });
}

export default async function ScholarshipsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const costFaq = faqByGroup("cost");

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "scholarships" },
          ]),
          {
            "@type": "FAQPage",
            mainEntity: costFaq.map((item) => ({
              "@type": "Question",
              name: item.question[l],
              acceptedAnswer: { "@type": "Answer", text: item.answer[l] },
            })),
          },
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "scholarships" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.meritAnnot as string}
              title={t.meritTitle as string}
              lede={t.meritLede as string}
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {(t.meritFacts as { v: string; l: string; n: string }[]).map(
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
        </Container>
      </Section>

      <Section tone="light">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Heading
                annot={t.sponsorAnnot as string}
                title={t.sponsorTitle as string}
                tone="light"
              />
              <p className="text-lede mt-6 leading-relaxed text-deep/70">
                {t.sponsorBody as string}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <Heading
                annot={t.cfaAnnot as string}
                title={t.cfaTitle as string}
                tone="light"
              />
              <p className="text-lede mt-6 leading-relaxed text-deep/70">
                {t.cfaBody as string}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="deep">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.externalAnnot as string}
              title={t.externalTitle as string}
              lede={t.externalLede as string}
            />
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {external.map((item, index) => (
              <Reveal key={item.url} delay={index * 60} as="li">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6 border-t border-piraeus/40 py-5 transition-colors duration-300 hover:border-brass"
                >
                  <span className="font-display text-lg font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                    {l === "el" ? item.name : item.nameEn}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lume-faint transition-colors duration-300 group-hover:text-brass"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading title={t.faqTitle as string} />
          </Reveal>
          <dl className="mt-12">
            {costFaq.map((item, index) => (
              <Reveal key={item.id} delay={index * 60}>
                <div className="border-t border-piraeus/40 py-7">
                  <dt className="font-display text-lg font-semibold text-lume">
                    {item.question[l]}
                  </dt>
                  <dd className="mt-3 max-w-4xl leading-relaxed text-lume-dim">
                    {item.answer[l]}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href={href(l, "tuition")} variant="ghost">
              {t.tuitionLink as string}
            </ButtonLink>
            <ButtonLink href={href(l, "admissions")}>
              {t.applyLink as string}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
