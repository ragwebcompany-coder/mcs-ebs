import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import { admissionSteps, admissionCriteria } from "@/content/programme";
import { faqByGroup } from "@/content/faq";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Αίτηση",
    annot: "Εισαγωγή",
    title: "Πώς κάνεις αίτηση",
    answer:
      "Η αίτηση υποβάλλεται ηλεκτρονικά με συνημμένα δικαιολογητικά. Η αξιολόγηση γίνεται από την Επιτροπή Επιλογής βάσει δημοσιευμένων και μοριοδοτούμενων κριτηρίων, και οι επικρατέστεροι υποψήφιοι καλούνται σε συνέντευξη.",
    meta: [
      { label: "Υποβολή", value: "Ηλεκτρονικά" },
      { label: "Συστατικές", value: "2 επιστολές" },
      { label: "Στάδια", value: "5" },
    ],
    stepsAnnot: "Η διαδικασία",
    stepsTitle: "Πέντε βήματα",
    stepsLede:
      "Από τον έλεγχο των προϋποθέσεων μέχρι την εγγραφή. Κάθε στάδιο έχει σαφείς απαιτήσεις και η Γραμματεία σας υποστηρίζει σε όλη τη διαδρομή.",
    criteriaAnnot: "Κριτήρια αξιολόγησης",
    criteriaTitle: "Τι μετράει στην επιλογή",
    criteriaLede:
      "Η Επιτροπή Επιλογής αξιολογεί κάθε αίτηση βάσει των παρακάτω μοριοδοτούμενων κριτηρίων. Η αναλυτική διαδικασία είναι δημοσιευμένη.",
    criteriaDoc: "Διαδικασία αξιολόγησης (PDF)",
    docsAnnot: "Έντυπα",
    docsTitle: "Τα έγγραφα που θα χρειαστείς",
    docs: [
      { t: "Έντυπο αίτησης", d: "Η επίσημη φόρμα αίτησης του ΠΜΣ.", k: "applicationForm" },
      { t: "Υπόδειγμα συστατικής επιστολής", d: "Το πρότυπο που συμπληρώνουν οι συστήνοντες.", k: "recommendationLetter" },
      { t: "Κανονισμός λειτουργίας", d: "Το θεσμικό πλαίσιο του προγράμματος (ΦΕΚ).", k: "regulation" },
      { t: "Διαδικασία αξιολόγησης", d: "Τα κριτήρια και η μοριοδότησή τους.", k: "evaluationProcess" },
    ],
    open: "Άνοιγμα PDF",
    faqAnnot: "Πριν ρωτήσεις",
    faqTitle: "Τα πιο συχνά ερωτήματα υποψηφίων",
    faqLink: "Όλες οι ερωτήσεις",
    ctaTitle: "Έτοιμος να υποβάλεις;",
    ctaBody:
      "Εάν έχεις υψηλούς στόχους και φιλοδοξίες, σε προσκαλούμε να υποβάλεις αίτηση σε ένα πρόγραμμα που έχει καταξιωθεί στη χώρα, θέτοντας υψηλά πρότυπα επιστημονικής και πρακτικής τεκμηρίωσης.",
    ctaApply: "Ηλεκτρονική αίτηση",
    ctaContact: "Ρώτησε τη Γραμματεία",
    note: "Η ηλεκτρονική αίτηση εξυπηρετείται από την υπάρχουσα πλατφόρμα του ΠΜΣ.",
  },
  en: {
    crumbHome: "Home",
    crumb: "Apply",
    annot: "Admissions",
    title: "How to apply",
    answer:
      "Applications are submitted online with supporting documents attached. They are assessed by the Selection Committee against published, weighted criteria, and shortlisted candidates are invited to interview.",
    meta: [
      { label: "Submission", value: "Online" },
      { label: "References", value: "2 letters" },
      { label: "Stages", value: "5" },
    ],
    stepsAnnot: "The process",
    stepsTitle: "Five steps",
    stepsLede:
      "From checking your eligibility through to enrolment. Each stage has clear requirements, and the Secretariat supports you throughout.",
    criteriaAnnot: "Assessment criteria",
    criteriaTitle: "What counts in selection",
    criteriaLede:
      "The Selection Committee assesses every application against the weighted criteria below. The full procedure is published.",
    criteriaDoc: "Evaluation procedure (PDF)",
    docsAnnot: "Forms",
    docsTitle: "The documents you will need",
    docs: [
      { t: "Application form", d: "The programme's official application form.", k: "applicationForm" },
      { t: "Reference letter template", d: "The template your referees complete.", k: "recommendationLetter" },
      { t: "Programme regulations", d: "The institutional framework of the programme.", k: "regulation" },
      { t: "Evaluation procedure", d: "The criteria and how they are weighted.", k: "evaluationProcess" },
    ],
    open: "Open PDF",
    faqAnnot: "Before you ask",
    faqTitle: "What candidates ask most",
    faqLink: "All questions",
    ctaTitle: "Ready to apply?",
    ctaBody:
      "If you have high ambitions, we invite you to apply to a programme with an established reputation in Greece, setting high standards of academic and practical rigour.",
    ctaApply: "Online application",
    ctaContact: "Ask the Secretariat",
    note: "The online application is served by the programme's existing platform.",
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
    route: "admissions",
    title:
      l === "el"
        ? "Αίτηση & κριτήρια εισαγωγής — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Apply & admission criteria — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["αίτηση μεταπτυχιακού", "δικαιολογητικά ΠΜΣ", "κριτήρια εισαγωγής"]
        : ["postgraduate application", "admission requirements", "selection criteria"],
  });
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const admissionsFaq = faqByGroup("admissions");

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "admissions" },
          ]),
          {
            "@type": "HowTo",
            name: t.stepsTitle as string,
            description: t.answer as string,
            step: admissionSteps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title[l],
              text: step.detail[l],
            })),
          },
          {
            "@type": "FAQPage",
            mainEntity: admissionsFaq.map((item) => ({
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
          { label: t.crumb as string, route: "admissions" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* Steps — a real sequence, so the numbering carries information */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.stepsAnnot as string}
              title={t.stepsTitle as string}
              lede={t.stepsLede as string}
            />
          </Reveal>

          <ol className="mt-16">
            {admissionSteps.map((step, index) => (
              <Reveal key={step.title.en} delay={index * 70} as="li">
                <div className="grid gap-5 border-t border-piraeus/35 py-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-2">
                    <span className="sounding text-3xl font-semibold text-brass">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl leading-snug font-semibold text-lume lg:col-span-4">
                    {step.title[l]}
                  </h3>
                  <p className="leading-relaxed text-lume-dim lg:col-span-6">
                    {step.detail[l]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Criteria */}
      <Section tone="light">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Annot className="mb-6">{t.criteriaAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-deep">
                {t.criteriaTitle as string}
              </h2>
              <p className="text-lede mt-6 leading-relaxed text-deep/70">
                {t.criteriaLede as string}
              </p>
              <div className="mt-8">
                <ButtonLink
                  href={site.documents.evaluationProcess}
                  variant="quiet"
                  external
                >
                  {t.criteriaDoc as string}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-7">
              <ul>
                {admissionCriteria.map((criterion) => (
                  <li
                    key={criterion.en}
                    className="flex gap-5 border-t border-deep/15 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1.5 w-6 shrink-0 bg-brass"
                    />
                    <span className="text-lede leading-relaxed text-deep/80">
                      {criterion[l]}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Documents */}
      <Section tone="deep">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.docsAnnot as string}
              title={t.docsTitle as string}
            />
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {(t.docs as { t: string; d: string; k: string }[]).map(
              (doc, index) => (
                <Reveal key={doc.k} delay={index * 60} as="li">
                  <a
                    href={
                      site.documents[doc.k as keyof typeof site.documents]
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-t border-piraeus/40 pt-5 transition-colors duration-300 hover:border-brass"
                  >
                    <h3 className="font-display text-lg font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                      {doc.t}
                    </h3>
                    <p className="mt-2 leading-relaxed text-lume-dim">{doc.d}</p>
                    <span className="annot mt-4 inline-flex items-center gap-2 text-lume-faint transition-colors duration-300 group-hover:text-brass">
                      {t.open as string}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </Reveal>
              ),
            )}
          </ul>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <Heading annot={t.faqAnnot as string} title={t.faqTitle as string} />
              <div className="mt-9">
                <ButtonLink href={href(l, "faq")} variant="ghost">
                  {t.faqLink as string}
                </ButtonLink>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <dl>
                {admissionsFaq.map((item, index) => (
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

      {/* CTA */}
      <Section tone="light">
        <Container wide>
          <Reveal className="max-w-3xl">
            <h2 className="text-display leading-[1.08] text-deep">
              {t.ctaTitle as string}
            </h2>
            <p className="text-lede mt-6 leading-relaxed text-deep/70">
              {t.ctaBody as string}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="https://msc-ebs.gr/apply-2/" external>
                {t.ctaApply as string}
              </ButtonLink>
              <ButtonLink href={href(l, "contact")} variant="quiet">
                {t.ctaContact as string}
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-deep/50">{t.note as string}</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
