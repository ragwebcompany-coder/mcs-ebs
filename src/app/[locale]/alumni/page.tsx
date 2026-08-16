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
    crumb: "Πύλη αποφοίτων",
    annot: "Το δίκτυο",
    title: "Πύλη Αποφοίτων",
    answer:
      "Η Πύλη Αποφοίτων συνδέει τους αποφοίτους του ΠΜΣ με στόχο την επαγγελματική και συναδελφική αλληλεγγύη. Η εγγραφή γίνεται κατόπιν αίτησης και αφορά αποκλειστικά αποφοίτους του προγράμματος.",
    meta: [
      { label: "Πρόσβαση", value: "Μόνο απόφοιτοι" },
      { label: "Εγγραφή", value: "Κατόπιν αίτησης" },
      { label: "Από το", value: "2021" },
    ],
    letterAnnot: "Επιστολή του Διευθυντή",
    letterBody: [
      "Αγαπητοί απόφοιτοι,",
      "Μέσα από αυτή τη σελίδα θα ήθελα να σας ενημερώσω για την Πύλη των Αποφοίτων που δημιουργήσαμε. Η Πύλη δημιουργήθηκε με σκοπό να φέρει σε επικοινωνία και επαφή τους αποφοίτους, με στόχο την επαγγελματική και συναδελφική αλληλεγγύη και τη συμμετοχή τους σε προγράμματα, δράσεις και συνέργειες που θα τους ωφελήσουν στην περαιτέρω επαγγελματική τους πορεία.",
      "Σας καλούμε να αναρτήσετε το βιογραφικό σας, τις δραστηριότητές σας και άρθρα σας, να αναζητήσετε παλιούς συμφοιτητές και να ανταλλάξετε τις εμπειρίες σας. Μέσω της Πύλης μπορείτε να συμμετάσχετε σε μελλοντικές δράσεις του ΠΜΣ ή και να μεταφέρετε την εμπειρία σας στους εν ενεργεία φοιτητές του.",
      "Θα χαρώ να σας δω όλους στην Πύλη.",
    ],
    whatAnnot: "Τι μπορείτε να κάνετε",
    whatTitle: "Μέσα στην Πύλη",
    what: [
      { t: "Αναρτήστε το βιογραφικό σας", d: "Κάντε ορατή την πορεία σας στο δίκτυο των αποφοίτων και στους συνεργαζόμενους εργοδότες." },
      { t: "Βρείτε παλιούς συμφοιτητές", d: "Αναζητήστε αποφοίτους ανά κύκλο σπουδών, κλάδο ή εταιρεία." },
      { t: "Μοιραστείτε άρθρα και δράσεις", d: "Δημοσιεύστε τη δουλειά σας και ενημερώστε την κοινότητα για ευκαιρίες." },
      { t: "Μεντορεύστε φοιτητές", d: "Μεταφέρετε την εμπειρία σας στους εν ενεργεία φοιτητές του προγράμματος." },
    ],
    ctaTitle: "Είσοδος στην Πύλη",
    ctaBody:
      "Η Πύλη λειτουργεί σε ξεχωριστή πλατφόρμα. Εάν είστε απόφοιτος του ΠΜΣ και δεν έχετε ακόμη πρόσβαση, επικοινωνήστε με τη Γραμματεία.",
    ctaEnter: "Είσοδος στην Πύλη",
    ctaContact: "Επικοινωνία με τη Γραμματεία",
    careersLink: "Επαγγελματική αποκατάσταση",
  },
  en: {
    crumbHome: "Home",
    crumb: "Alumni portal",
    annot: "The network",
    title: "Alumni Portal",
    answer:
      "The Alumni Portal connects graduates of the programme for professional and collegial support. Registration is by application and is open to programme graduates only.",
    meta: [
      { label: "Access", value: "Graduates only" },
      { label: "Registration", value: "By application" },
      { label: "Since", value: "2021" },
    ],
    letterAnnot: "Letter from the Director",
    letterBody: [
      "Dear graduates,",
      "Through this page I would like to tell you about the Alumni Portal we have created. The Portal exists to bring graduates into contact with one another, for professional and collegial solidarity, and to involve them in programmes, activities and collaborations that will benefit their careers.",
      "We invite you to post your CV, your activities and your articles, to find former classmates and to exchange experience. Through the Portal you can take part in future programme activities, or pass your own experience on to current students.",
      "I look forward to seeing you all in the Portal.",
    ],
    whatAnnot: "What you can do",
    whatTitle: "Inside the Portal",
    what: [
      { t: "Post your CV", d: "Make your trajectory visible to the alumni network and to partner employers." },
      { t: "Find former classmates", d: "Search graduates by cohort, sector or company." },
      { t: "Share articles and activity", d: "Publish your work and tell the community about opportunities." },
      { t: "Mentor current students", d: "Pass your experience on to students currently on the programme." },
    ],
    ctaTitle: "Enter the Portal",
    ctaBody:
      "The Portal runs on a separate platform. If you are a graduate of the programme and do not yet have access, contact the Secretariat.",
    ctaEnter: "Enter the Portal",
    ctaContact: "Contact the Secretariat",
    careersLink: "Career outcomes",
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
    route: "alumni",
    title:
      l === "el"
        ? "Πύλη Αποφοίτων — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Alumni Portal — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["απόφοιτοι ΠΜΣ ΟΕΣ", "alumni Πανεπιστήμιο Πειραιώς", "δίκτυο αποφοίτων"]
        : ["MSc EBS alumni", "University of Piraeus alumni", "graduate network"],
  });
}

export default async function AlumniPage({
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
            { name: t.crumb as string, route: "alumni" },
          ]),
          {
            "@type": "WebSite",
            name: t.title as string,
            url: site.social.alumni,
            description: t.answer as string,
            publisher: { "@id": `${site.url}/#department` },
          },
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "alumni" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* Director's letter */}
      <Section tone="abyss">
        <Container wide>
          <Reveal className="max-w-3xl">
            <Annot className="mb-8">{t.letterAnnot as string}</Annot>
            <div className="text-lede space-y-5 leading-[1.8] text-lume-dim">
              {(t.letterBody as string[]).map((p, index) => (
                <p
                  key={p.slice(0, 20)}
                  className={index === 0 ? "font-display text-2xl text-lume" : ""}
                >
                  {p}
                </p>
              ))}
            </div>
            <figure className="mt-10 border-l-2 border-brass pl-6">
              <figcaption>
                <span className="block font-display text-lg font-semibold text-lume">
                  {site.contact.director.name[l]}
                </span>
                <span className="mt-1 block text-sm text-lume-faint">
                  {site.contact.director.role[l]}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* What you can do */}
      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.whatAnnot as string}
              title={t.whatTitle as string}
              tone="light"
            />
          </Reveal>

          <dl className="mt-14 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {(t.what as { t: string; d: string }[]).map((item, index) => (
              <Reveal key={item.t} delay={index * 60}>
                <div className="border-t border-deep/15 pt-5">
                  <dt className="font-display text-xl font-semibold text-deep">
                    {item.t}
                  </dt>
                  <dd className="mt-2.5 leading-relaxed text-deep/65">
                    {item.d}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="deep">
        <Container wide>
          <Reveal className="max-w-2xl">
            <h2 className="text-display leading-tight text-lume">
              {t.ctaTitle as string}
            </h2>
            <p className="text-lede mt-6 leading-relaxed text-lume-dim">
              {t.ctaBody as string}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={site.social.alumni} external>
                {t.ctaEnter as string}
              </ButtonLink>
              <ButtonLink href={href(l, "contact")} variant="ghost">
                {t.ctaContact as string}
              </ButtonLink>
            </div>
            <div className="mt-8">
              <ButtonLink href={href(l, "careers")} variant="ghost">
                {t.careersLink as string}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
