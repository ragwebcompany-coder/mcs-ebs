import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import { locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const groups = [
  {
    id: "governance",
    title: { el: "Θεσμικό πλαίσιο", en: "Institutional framework" },
    docs: [
      {
        key: "regulation",
        title: {
          el: "Κανονισμός Λειτουργίας ΠΜΣ",
          en: "Programme Regulations",
        },
        note: {
          el: "ΦΕΚ Β΄ 1780/19.3.2024 — αντικατάσταση κανονισμού του ΠΜΣ ΟΕΣ.",
          en: "Government Gazette B 1780/19.3.2024 — replacement regulations for the programme.",
        },
      },
      {
        key: "qualityPolicy",
        title: {
          el: "Πολιτική Διασφάλισης Ποιότητας",
          en: "Quality Assurance Policy",
        },
        note: {
          el: "Η πολιτική ποιότητας της ακαδημαϊκής μονάδας για την ανάπτυξη και βελτίωση του ΠΜΣ.",
          en: "The academic unit's quality policy for developing and improving the programme.",
        },
      },
      {
        key: "staffPolicy",
        title: {
          el: "Πολιτική Ανάπτυξης & Υποστήριξης Προσωπικού",
          en: "Staff Development & Support Policy",
        },
        note: {
          el: "Το πλαίσιο υποστήριξης και ανάπτυξης του διδακτικού και διοικητικού προσωπικού.",
          en: "The framework for supporting and developing teaching and administrative staff.",
        },
      },
    ],
  },
  {
    id: "admissions",
    title: { el: "Εισαγωγή & αιτήσεις", en: "Admissions & applications" },
    docs: [
      {
        key: "evaluationProcess",
        title: {
          el: "Διαδικασία Αξιολόγησης & Επιλογής Υποψηφίων",
          en: "Candidate Evaluation & Selection Procedure",
        },
        note: {
          el: "Τα κριτήρια επιλογής και ο τρόπος μοριοδότησής τους.",
          en: "The selection criteria and how they are weighted.",
        },
      },
      {
        key: "applicationForm",
        title: { el: "Έντυπο Αίτησης", en: "Application Form" },
        note: {
          el: "Η επίσημη φόρμα αίτησης για το ΠΜΣ.",
          en: "The official application form for the programme.",
        },
      },
      {
        key: "recommendationLetter",
        title: {
          el: "Υπόδειγμα Συστατικής Επιστολής",
          en: "Reference Letter Template",
        },
        note: {
          el: "Το πρότυπο που συμπληρώνουν οι συστήνοντες.",
          en: "The template completed by your referees.",
        },
      },
    ],
  },
  {
    id: "studies",
    title: { el: "Σπουδές", en: "Studies" },
    docs: [
      {
        key: "dissertationGuide",
        title: {
          el: "Οδηγός Εκπόνησης Διπλωματικής Εργασίας",
          en: "Dissertation Preparation Guide",
        },
        note: {
          el: "Δομή, μεθοδολογία και προδιαγραφές συγγραφής της διπλωματικής.",
          en: "Structure, methodology and writing specifications for the dissertation.",
        },
      },
    ],
  },
  {
    id: "evaluation",
    title: { el: "Αξιολόγηση & απόφοιτοι", en: "Evaluation & graduates" },
    docs: [
      {
        key: "externalEvaluation",
        title: {
          el: "Έκθεση Εξωτερικής Αξιολόγησης",
          en: "External Evaluation Report",
        },
        note: {
          el: "Η αξιολόγηση του Τμήματος από την Επιτροπή Εξωτερικής Αξιολόγησης.",
          en: "The Department's assessment by the External Evaluation Committee.",
        },
      },
      {
        key: "jobProspects",
        title: {
          el: "Έρευνα Επαγγελματικής Αποκατάστασης",
          en: "Career Outcomes Survey",
        },
        note: {
          el: "Καταγραφή της επαγγελματικής κατάστασης των αποφοίτων του ΠΜΣ.",
          en: "A record of the employment status of programme graduates.",
        },
      },
      {
        key: "stevensMou",
        title: {
          el: "Μνημόνιο Συνεργασίας με το Stevens Institute",
          en: "Memorandum of Understanding with Stevens Institute",
        },
        note: {
          el: "Το πλαίσιο εκπαιδευτικής και ερευνητικής συνεργασίας με τη School of Business.",
          en: "The framework for educational and research cooperation with the School of Business.",
        },
      },
    ],
  },
];

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Θεσμικά έγγραφα",
    annot: "Διαφάνεια",
    title: "Θεσμικά έγγραφα",
    answer:
      "Ο κανονισμός λειτουργίας, η πολιτική διασφάλισης ποιότητας, η διαδικασία αξιολόγησης υποψηφίων και τα έντυπα αίτησης του ΠΜΣ, σε ελεύθερη πρόσβαση.",
    open: "Άνοιγμα PDF",
  },
  en: {
    crumbHome: "Home",
    crumb: "Official documents",
    annot: "Transparency",
    title: "Official documents",
    answer:
      "The programme regulations, quality assurance policy, candidate evaluation procedure and application forms, in open access.",
    open: "Open PDF",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;

  return buildMetadata({
    locale: l,
    route: "documents",
    title:
      l === "el"
        ? "Κανονισμός & θεσμικά έγγραφα — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Regulations & official documents — MSc Economic & Business Strategy",
    description: copy[l].answer,
    keywords:
      l === "el"
        ? ["κανονισμός λειτουργίας ΠΜΣ", "ΦΕΚ μεταπτυχιακό", "πολιτική ποιότητας"]
        : ["programme regulations", "quality policy", "official documents"],
  });
}

export default async function DocumentsPage({
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
            { name: t.crumbHome, route: "home" },
            { name: t.crumb, route: "documents" },
          ]),
          ...groups.flatMap((group) =>
            group.docs.map((doc) => ({
              "@type": "DigitalDocument",
              name: doc.title[l],
              description: doc.note[l],
              url: site.documents[doc.key as keyof typeof site.documents],
              encodingFormat: "application/pdf",
              publisher: { "@id": `${site.url}/#department` },
            })),
          ),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumb, route: "documents" },
        ]}
        annot={t.annot}
        title={t.title}
        answer={t.answer}
      />

      {groups.map((group, groupIndex) => (
        <Section
          key={group.id}
          tone={groupIndex % 2 === 0 ? "abyss" : "deep"}
        >
          <Container wide>
            <Reveal>
              <div className="border-b border-piraeus/40 pb-6">
                <Heading title={group.title[l]} />
              </div>
            </Reveal>

            <ul className="mt-2">
              {group.docs.map((doc, index) => (
                <Reveal key={doc.key} delay={index * 60} as="li">
                  <a
                    href={site.documents[doc.key as keyof typeof site.documents]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-4 border-b border-piraeus/25 py-7 transition-colors duration-300 hover:border-brass lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="lg:col-span-6">
                      <h3 className="font-display text-xl leading-snug font-semibold text-lume transition-colors duration-300 group-hover:text-brass">
                        {doc.title[l]}
                      </h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="leading-relaxed text-lume-dim">
                        {doc.note[l]}
                      </p>
                    </div>
                    <div className="lg:col-span-1 lg:text-right">
                      <span className="annot inline-flex items-center gap-2 text-lume-faint transition-colors duration-300 group-hover:text-brass">
                        PDF
                        <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ))}
    </>
  );
}
