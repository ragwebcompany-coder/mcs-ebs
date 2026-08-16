import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Heading, Section } from "@/components/ui";

import { site, employmentBreakdown } from "@/content/site";
import { faqByGroup } from "@/content/faq";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const roles = {
  el: [
    "Στέλεχος στρατηγικού σχεδιασμού",
    "Χρηματοοικονομικός αναλυτής",
    "Σύμβουλος επιχειρήσεων",
    "Business analyst",
    "Στέλεχος τραπεζικού τομέα",
    "Υπεύθυνος έργων (project manager)",
    "Αναλυτής αγορών & ανταγωνισμού",
    "Στέλεχος ψηφιακού μετασχηματισμού",
    "Υπεύθυνος εφοδιαστικής αλυσίδας",
    "Στέλεχος δημόσιου τομέα",
  ],
  en: [
    "Strategic planning executive",
    "Financial analyst",
    "Management consultant",
    "Business analyst",
    "Banking sector professional",
    "Project manager",
    "Market and competition analyst",
    "Digital transformation lead",
    "Supply chain manager",
    "Public sector official",
  ],
};

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Επαγγελματική αποκατάσταση",
    annot: "Μετά το πτυχίο",
    title: "Επαγγελματική αποκατάσταση",
    answer:
      "Σύμφωνα με την έρευνα αποφοίτων του ΠΜΣ, το 32% εργάζεται σε μικρομεσαίες επιχειρήσεις, το 20% στον τραπεζικό και χρηματοοικονομικό τομέα, το 14% σε διεθνείς επιχειρήσεις και το 13% στις τηλεπικοινωνίες και την πληροφορική.",
    meta: [
      { label: "Από το", value: "2006" },
      { label: "Κύκλοι", value: "19" },
      { label: "Μεγαλύτερος κλάδος", value: "ΜμΕ 32%" },
    ],
    recognitionAnnot: "Αναγνώριση",
    recognitionTitle: "Ένα πρόγραμμα με ιστορικό, όχι με υποσχέσεις",
    recognitionBody: [
      "Η μοναδικότητα του προγράμματος στον ελληνικό χώρο, όσο και η πετυχημένη πορεία των αποφοίτων του από το 2006, το καθιστούν μία από τις καλύτερες επιλογές για όσους διαθέτουν ανήσυχο και δημιουργικό πνεύμα.",
      "Η μεγάλη επιτυχία του προγράμματος και η σύνδεσή του με την αγορά εργασίας, καθώς και η επαγγελματική αποκατάσταση των αποφοίτων μας, έχουν αναγνωριστεί τόσο από την Επιτροπή Εξωτερικής Αξιολόγησης της Α.ΔΙ.Π. όσο και από έρευνα που διεξήχθη για τους αποφοίτους του ΠΜΣ-ΟΕΣ.",
    ],
    evalDoc: "Έκθεση εξωτερικής αξιολόγησης (PDF)",
    jobsDoc: "Έρευνα επαγγελματικής αποκατάστασης (PDF)",
    breakdownAnnot: "Κατανομή αποφοίτων",
    breakdownTitle: "Πού εργάζονται, σε ποσοστά",
    breakdownLede:
      "Καταγραφή επαγγελματικής κατάστασης των αποφοίτων του προγράμματος, ανά κλάδο δραστηριότητας.",
    rolesAnnot: "Τυπικοί ρόλοι",
    rolesTitle: "Θέσεις που στελεχώνουν οι απόφοιτοι",
    rolesLede:
      "Ο συνδυασμός οικονομικής ανάλυσης, στρατηγικής και ποσοτικών μεθόδων ανοίγει ρόλους σε πολλαπλούς κλάδους.",
    faqTitle: "Ερωτήσεις για καριέρα",
    internshipLink: "Πρακτική άσκηση",
    alumniLink: "Πύλη αποφοίτων",
  },
  en: {
    crumbHome: "Home",
    crumb: "Career outcomes",
    annot: "After graduation",
    title: "Career outcomes",
    answer:
      "According to the programme's alumni survey, 32% work in small and medium enterprises, 20% in banking and financial services, 14% in international corporations and 13% in telecommunications and IT.",
    meta: [
      { label: "Running since", value: "2006" },
      { label: "Cohorts", value: "19" },
      { label: "Largest sector", value: "SMEs 32%" },
    ],
    recognitionAnnot: "Recognition",
    recognitionTitle: "A programme with a record, not a promise",
    recognitionBody: [
      "The programme's distinctiveness in Greece, together with the successful trajectory of its graduates since 2006, make it one of the strongest choices for restless and creative minds.",
      "The programme's success, its connection to the labour market and the career outcomes of its graduates have been recognised both by the External Evaluation Committee and by a dedicated survey of MSc EBS alumni.",
    ],
    evalDoc: "External evaluation report (PDF)",
    jobsDoc: "Career outcomes survey (PDF)",
    breakdownAnnot: "Graduate destinations",
    breakdownTitle: "Where they work, in percentages",
    breakdownLede:
      "A record of the employment status of programme graduates, by sector of activity.",
    rolesAnnot: "Typical roles",
    rolesTitle: "Positions our graduates hold",
    rolesLede:
      "The combination of economic analysis, strategy and quantitative method opens roles across many sectors.",
    faqTitle: "Career questions",
    internshipLink: "Internship programme",
    alumniLink: "Alumni portal",
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
    route: "careers",
    title:
      l === "el"
        ? "Επαγγελματική αποκατάσταση αποφοίτων — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Graduate career outcomes — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["επαγγελματική αποκατάσταση", "καριέρα μετά το μεταπτυχιακό", "απόφοιτοι ΠΜΣ"]
        : ["graduate employment", "career after MSc", "alumni outcomes"],
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const careerFaq = faqByGroup("career");
  const max = Math.max(...employmentBreakdown.map((row) => row.percent));

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "careers" },
          ]),
          {
            "@type": "Dataset",
            name: t.breakdownTitle as string,
            description: t.breakdownLede as string,
            creator: { "@id": `${site.url}/#department` },
            variableMeasured: employmentBreakdown.map((row) => ({
              "@type": "PropertyValue",
              name: row.sector[l],
              value: row.percent,
              unitText: "PERCENT",
            })),
          },
          {
            "@type": "FAQPage",
            mainEntity: careerFaq.map((item) => ({
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
          { label: t.crumb as string, route: "careers" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* Breakdown */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <Heading
                annot={t.breakdownAnnot as string}
                title={t.breakdownTitle as string}
                lede={t.breakdownLede as string}
              />
            </Reveal>

            <Reveal delay={110} className="lg:col-span-8">
              <dl className="space-y-8">
                {employmentBreakdown.map((row) => (
                  <div key={row.sector.en}>
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-lede font-medium text-lume">
                        {row.sector[l]}
                      </dt>
                      <dd className="sounding shrink-0 text-3xl font-semibold text-brass">
                        {row.percent}%
                      </dd>
                    </div>
                    <div
                      className="mt-3 h-px w-full bg-piraeus/35"
                      aria-hidden="true"
                    >
                      <div
                        className="h-px bg-brass"
                        style={{ width: `${(row.percent / max) * 100}%` }}
                      />
                    </div>
                    {row.examples ? (
                      <p className="mt-2.5 text-sm text-lume-faint">
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

      {/* Recognition */}
      <Section tone="light">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Annot className="mb-6">{t.recognitionAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-deep">
                {t.recognitionTitle as string}
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="text-lede space-y-5 leading-[1.75] text-deep/70">
                {(t.recognitionBody as string[]).map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <ButtonLink
                  href={site.documents.externalEvaluation}
                  variant="quiet"
                  external
                >
                  {t.evalDoc as string}
                </ButtonLink>
                <ButtonLink
                  href={site.documents.jobProspects}
                  variant="quiet"
                  external
                >
                  {t.jobsDoc as string}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Roles */}
      <Section tone="deep">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.rolesAnnot as string}
              title={t.rolesTitle as string}
              lede={t.rolesLede as string}
            />
          </Reveal>
          <Reveal delay={90}>
            <ul className="mt-14 flex flex-wrap gap-2.5">
              {roles[l].map((role) => (
                <li
                  key={role}
                  className="border border-piraeus/45 px-4 py-2.5 text-sm text-lume-dim"
                >
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading title={t.faqTitle as string} />
          </Reveal>
          <dl className="mt-12">
            {careerFaq.map((item, index) => (
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
            <ButtonLink href={href(l, "internship")} variant="ghost">
              {t.internshipLink as string}
            </ButtonLink>
            <ButtonLink href={href(l, "alumni")} variant="ghost">
              {t.alumniLink as string}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
