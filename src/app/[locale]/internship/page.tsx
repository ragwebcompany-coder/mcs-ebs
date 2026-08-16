import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import { internshipPartners } from "@/content/partners";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, itemListNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Πρακτική άσκηση",
    annot: "Διασύνδεση με την αγορά",
    title: "Πρακτική άσκηση",
    answer:
      "Η πρακτική άσκηση είναι προαιρετική, διαρκεί 4 έως 6 μήνες και διατίθεται από το πρώτο έως και το τέταρτο εξάμηνο. Ο φοιτητής μπορεί να την ξεκινήσει οποιαδήποτε στιγμή του έτους, σε πάνω από 40 συνεργαζόμενες επιχειρήσεις και οργανισμούς.",
    meta: [
      { label: "Διάρκεια", value: "4–6 μήνες" },
      { label: "Εξάμηνα", value: "1ο–4ο" },
      { label: "Εργοδότες", value: "40+" },
      { label: "Χαρακτήρας", value: "Προαιρετική" },
    ],
    aboutAnnot: "Γιατί έχει σημασία",
    aboutTitle: "Από την αίθουσα στο πραγματικό πρόβλημα",
    aboutBody: [
      "Η πρακτική άσκηση αποτελεί σημαντικό μέρος του προγράμματος σπουδών. Είναι η ευκαιρία να εφαρμόσετε τις θεωρητικές γνώσεις που αποκτήσατε στα μαθήματα σε πραγματικά επαγγελματικά περιβάλλοντα.",
      "Πέρα από την εμπειρία, η πρακτική είναι ευκαιρία να αναπτύξετε δίκτυα επαγγελματικών σχέσεων και να εξερευνήσετε πιθανές κατευθύνσεις καριέρας στον ευρύτερο τομέα της οικονομικής και επιχειρησιακής στρατηγικής.",
    ],
    howAnnot: "Πώς λειτουργεί",
    howTitle: "Τα πρακτικά",
    how: [
      { t: "Πότε ξεκινά", d: "Οποιαδήποτε στιγμή του έτους, από το 1ο έως το 4ο εξάμηνο. Δεν υπάρχει κλειστή περίοδος υποβολής." },
      { t: "Πόσο διαρκεί", d: "Τέσσερις έως έξι μήνες, ανάλογα με τη θέση και τη συμφωνία με τον εργοδότη." },
      { t: "Πώς βρίσκετε θέση", d: "Μέσω του Υπευθύνου Πρακτικής Άσκησης του Τμήματος, που διαχειρίζεται τις συνεργασίες και τις διαθέσιμες θέσεις." },
      { t: "Συνδυασμός με διπλωματική", d: "Η πρακτική μπορεί να γίνει παράλληλα με την εκπόνηση της διπλωματικής εργασίας στο 4ο εξάμηνο." },
    ],
    partnersAnnot: "Συνεργαζόμενοι φορείς",
    partnersTitle: "Πού έχουν κάνει πρακτική οι φοιτητές μας",
    partnersLede:
      "Ενδεικτικές επιχειρήσεις και οργανισμοί με τους οποίους έχουν προκύψει συνεργασίες, ταξινομημένοι κατά κλάδο.",
    contactAnnot: "Υπεύθυνος πρακτικής άσκησης",
    contactTitle: "Ποιον ρωτάτε",
    careersLink: "Επαγγελματική αποκατάσταση",
  },
  en: {
    crumbHome: "Home",
    crumb: "Internship",
    annot: "Connected to the market",
    title: "Internship",
    answer:
      "The internship is optional, lasts 4 to 6 months and is available from the first through the fourth semester. Students may begin at any point in the year, across more than 40 partner companies and organisations.",
    meta: [
      { label: "Duration", value: "4–6 months" },
      { label: "Semesters", value: "1st–4th" },
      { label: "Employers", value: "40+" },
      { label: "Status", value: "Optional" },
    ],
    aboutAnnot: "Why it matters",
    aboutTitle: "From the classroom to the real problem",
    aboutBody: [
      "The internship is a significant part of the curriculum. It is the opportunity to apply the theory acquired in your courses to genuine professional settings.",
      "Beyond the experience itself, the internship is a chance to build professional networks and explore possible career directions across the wider field of economic and business strategy.",
    ],
    howAnnot: "How it works",
    howTitle: "The practicalities",
    how: [
      { t: "When it starts", d: "At any point in the year, from the 1st through the 4th semester. There is no closed application window." },
      { t: "How long it lasts", d: "Four to six months, depending on the position and the agreement with the employer." },
      { t: "Finding a placement", d: "Through the Department's Internship Coordinator, who manages the partnerships and available positions." },
      { t: "Alongside the dissertation", d: "The internship can be undertaken in parallel with the dissertation in the fourth semester." },
    ],
    partnersAnnot: "Partner organisations",
    partnersTitle: "Where our students have interned",
    partnersLede:
      "An indicative list of companies and organisations with which partnerships have been established, grouped by sector.",
    contactAnnot: "Internship coordinator",
    contactTitle: "Who to ask",
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
    route: "internship",
    title:
      l === "el"
        ? "Πρακτική άσκηση σε 40+ επιχειρήσεις — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Internships with 40+ employers — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["πρακτική άσκηση μεταπτυχιακό", "internship Πειραιάς", "Deloitte EY PwC πρακτική"]
        : ["postgraduate internship", "MSc placement Greece", "Deloitte EY PwC internship"],
  });
}

export default async function InternshipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const officer = site.contact.internshipOfficer;

  // Group employers by sector so the list reads as structure, not a wall of names.
  const bySector = new Map<string, string[]>();
  for (const partner of internshipPartners) {
    const key = partner.sector[l];
    bySector.set(key, [...(bySector.get(key) ?? []), partner.name]);
  }
  const sectors = [...bySector.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  );

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "internship" },
          ]),
          itemListNode(
            t.partnersTitle as string,
            internshipPartners.map((partner) => ({
              name: partner.name,
              url: `${site.url}${href(l, "internship")}`,
            })),
          ),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "internship" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Annot className="mb-6">{t.aboutAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-lume">
                {t.aboutTitle as string}
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="text-lede space-y-5 leading-[1.75] text-lume-dim">
                {(t.aboutBody as string[]).map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.howAnnot as string}
              title={t.howTitle as string}
              tone="light"
            />
          </Reveal>

          <dl className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {(t.how as { t: string; d: string }[]).map((item, index) => (
              <Reveal key={item.t} delay={index * 60}>
                <div className="border-t border-deep/15 pt-5">
                  <dt className="font-display text-lg font-semibold text-deep">
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

      <Section tone="deep">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.partnersAnnot as string}
              title={t.partnersTitle as string}
              lede={t.partnersLede as string}
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map(([sector, names], index) => (
              <Reveal key={sector} delay={index * 45}>
                <div className="border-t border-piraeus/40 pt-5">
                  <h3 className="annot mb-4 text-brass">{sector}</h3>
                  <ul className="space-y-1.5">
                    {names.map((name) => (
                      <li key={name} className="text-sm text-lume-dim">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="abyss">
        <Container wide>
          <Reveal className="max-w-2xl">
            <Annot className="mb-6">{t.contactAnnot as string}</Annot>
            <h2 className="text-title leading-tight text-lume">
              {t.contactTitle as string}
            </h2>
            <address className="mt-8 space-y-2 text-lede leading-relaxed text-lume-dim not-italic">
              <p className="font-display text-xl font-semibold text-lume">
                {officer.name[l]}
              </p>
              <p className="text-sm text-brass">{officer.role[l]}</p>
              <p className="pt-3">
                <a
                  href={`tel:${officer.phone}`}
                  className="link-plot sounding hover:text-brass"
                >
                  {officer.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${officer.email}`}
                  className="link-plot text-brass"
                >
                  {officer.email}
                </a>
              </p>
            </address>

            <div className="mt-10">
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
