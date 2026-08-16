import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import { trips } from "@/content/programme";
import { academicPartners } from "@/content/partners";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, itemListNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const hosts = [
  { name: "Stevens Institute of Technology", note: { el: "Νέα Ιερσέη · School of Business", en: "New Jersey · School of Business" } },
  { name: "New York University", note: { el: "Νέα Υόρκη · γεωπολιτική & ενέργεια", en: "New York · geopolitics & energy" } },
  { name: "Drexel University", note: { el: "Φιλαδέλφεια · οικονομικά κυρώσεων", en: "Philadelphia · economics of sanctions" } },
  { name: "Datasite", note: { el: "Νέα Υόρκη · M&A και due diligence", en: "New York · M&A and due diligence" } },
  { name: "Ευρωπαϊκή Επιτροπή", note: { el: "Βρυξέλλες · χάραξη πολιτικής", en: "Brussels · policy-making" } },
  { name: "BMW", note: { el: "Μόναχο · βιομηχανική παραγωγή", en: "Munich · industrial production" } },
  { name: "Airbus", note: { el: "Τουλούζη · γραμμή συναρμολόγησης", en: "Toulouse · assembly line" } },
  { name: "Mercedes-Benz", note: { el: "Στουτγκάρδη · εργοστάσιο", en: "Stuttgart · factory" } },
  { name: "Škoda", note: { el: "Πράγα · εγκαταστάσεις παραγωγής", en: "Prague · production facilities" } },
  { name: "Vitra", note: { el: "Weil am Rhein · design campus", en: "Weil am Rhein · design campus" } },
];

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Διεθνής εμπειρία",
    annot: "Εκτός συνόρων",
    title: "Διεθνής εμπειρία",
    answer:
      "Το ΠΜΣ διοργανώνει τακτικά εκπαιδευτικές εκδρομές σε κορυφαία πανεπιστήμια, θεσμικά όργανα και επιχειρήσεις. Πρόσφατοι προορισμοί περιλαμβάνουν τη Silicon Valley (2025), τη Νέα Υόρκη και την Ουάσιγκτον (2024) και τα Stevens, NYU και Drexel (2022).",
    meta: [
      { label: "Εκδρομές", value: "9+" },
      { label: "Από το", value: "2012" },
      { label: "Συνεργασία", value: "Stevens MOU" },
    ],
    mouAnnot: "Θεσμική συνεργασία",
    mouTitle: "Μνημόνιο με το Stevens Institute of Technology",
    mouBody:
      "Το μνημόνιο συνεργασίας μεταξύ της School of Business του Stevens Institute of Technology και του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική» του Πανεπιστημίου Πειραιώς αποσκοπεί στην ανάπτυξη εκπαιδευτικής και ερευνητικής συνεργασίας, με βάση την ισοτιμία και την αμοιβαιότητα, και στην προαγωγή των σχέσεων και της αμοιβαίας κατανόησης μεταξύ των δύο ιδρυμάτων.",
    mouDoc: "Το μνημόνιο (PDF)",
    timelineAnnot: "Χρονολόγιο",
    timelineTitle: "Πού έχει ταξιδέψει το πρόγραμμα",
    hostsAnnot: "Φιλοξενούντες φορείς",
    hostsTitle: "Ιδρύματα και επιχειρήσεις που μας υποδέχθηκαν",
    galleryLink: "Φωτογραφικό υλικό",
  },
  en: {
    crumbHome: "Home",
    crumb: "International exposure",
    annot: "Beyond borders",
    title: "International exposure",
    answer:
      "The programme regularly organises study trips to leading universities, institutions and companies. Recent destinations include Silicon Valley (2025), New York City and Washington DC (2024), and Stevens, NYU and Drexel (2022).",
    meta: [
      { label: "Trips", value: "9+" },
      { label: "Since", value: "2012" },
      { label: "Partnership", value: "Stevens MOU" },
    ],
    mouAnnot: "Institutional partnership",
    mouTitle: "Memorandum with Stevens Institute of Technology",
    mouBody:
      "The memorandum of understanding between the School of Business at Stevens Institute of Technology and the MSc in Economic & Business Strategy at the University of Piraeus develops educational and research cooperation on the basis of equality and reciprocity, and promotes relations and mutual understanding between the two institutions.",
    mouDoc: "The memorandum (PDF)",
    timelineAnnot: "Timeline",
    timelineTitle: "Where the programme has travelled",
    hostsAnnot: "Hosts",
    hostsTitle: "Institutions and companies that received us",
    galleryLink: "Photography",
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
    route: "international",
    title:
      l === "el"
        ? "Εκπαιδευτικές εκδρομές & διεθνείς συνεργασίες — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Study trips & international partnerships — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["εκπαιδευτική εκδρομή μεταπτυχιακό", "Silicon Valley", "Stevens Institute συνεργασία"]
        : ["MSc study trip", "Silicon Valley", "Stevens Institute partnership"],
  });
}

export default async function InternationalPage({
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
            { name: t.crumb as string, route: "international" },
          ]),
          itemListNode(
            t.timelineTitle as string,
            trips.map((trip) => ({
              name: `${trip.season[l]} — ${trip.place[l]}`,
              url: `${site.url}${href(l, "international")}`,
            })),
          ),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "international" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* MOU */}
      <Section tone="abyss">
        <Container wide>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-3">
              <div className="relative aspect-square w-full max-w-[13rem] bg-bone p-6">
                <Image
                  src="/media/brand/stevens.png"
                  alt="Stevens Institute of Technology"
                  fill
                  sizes="208px"
                  className="object-contain p-6"
                />
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-9">
              <Annot className="mb-6">{t.mouAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-lume">
                {t.mouTitle as string}
              </h2>
              <p className="text-lede mt-6 max-w-3xl leading-relaxed text-lume-dim">
                {t.mouBody as string}
              </p>
              <div className="mt-8">
                <ButtonLink
                  href={site.documents.stevensMou}
                  variant="ghost"
                  external
                >
                  {t.mouDoc as string}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Timeline — a real chronology, so the years carry the ordering */}
      <Section tone="light">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.timelineAnnot as string}
              title={t.timelineTitle as string}
              tone="light"
            />
          </Reveal>

          <ol className="mt-16">
            {trips.map((trip, index) => (
              <Reveal key={`${trip.year}-${trip.place.en}`} delay={index * 55} as="li">
                <div className="grid gap-5 border-t border-deep/15 py-8 lg:grid-cols-12 lg:gap-10">
                  <p className="sounding text-2xl font-semibold text-brass lg:col-span-2">
                    {trip.year}
                  </p>
                  <div className="lg:col-span-4">
                    <p className="annot mb-2 text-deep/40">{trip.season[l]}</p>
                    <h3 className="font-display text-xl leading-snug font-semibold text-deep">
                      {trip.place[l]}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-deep/65 lg:col-span-6">
                    {trip.detail[l]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12">
            <ButtonLink href={href(l, "gallery")} variant="quiet">
              {t.galleryLink as string}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* Hosts */}
      <Section tone="deep">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.hostsAnnot as string}
              title={t.hostsTitle as string}
            />
          </Reveal>

          <ul className="mt-14 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {hosts.map((host, index) => (
              <Reveal key={host.name} delay={index * 45} as="li">
                <div className="border-t border-piraeus/40 pt-4">
                  <p className="font-display text-lg font-semibold text-lume">
                    {host.name}
                  </p>
                  <p className="mt-1.5 text-sm text-lume-faint">
                    {host.note[l]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {academicPartners.map((partner) => (
            <Reveal key={partner.name} delay={120}>
              <p className="mt-14 max-w-3xl border-l-2 border-brass pl-6 leading-relaxed text-lume-dim">
                {partner.note[l]}
              </p>
            </Reveal>
          ))}
        </Container>
      </Section>
    </>
  );
}
