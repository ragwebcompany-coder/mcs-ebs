import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Annot, ButtonLink, Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";
import { faqByGroup } from "@/content/faq";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, placeNode, departmentNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Επικοινωνία",
    annot: "Πού θα μας βρείτε",
    title: "Επικοινωνία",
    answer:
      "Η Γραμματεία του ΠΜΣ βρίσκεται στον 5ο όροφο, Γραφείο 518, Καραολή & Δημητρίου 80, 185 34 Πειραιάς. Τηλέφωνο 210 414 2284 και 694 476 8189, email strategy@unipi.gr.",
    meta: [
      { label: "Τηλέφωνο", value: "210 414 2284" },
      { label: "Κινητό", value: "694 476 8189" },
      { label: "Email", value: "strategy@unipi.gr" },
    ],
    peopleAnnot: "Ποιον ρωτάτε",
    peopleTitle: "Επικοινωνία ανά αντικείμενο",
    addressAnnot: "Διεύθυνση",
    addressTitle: "Πανεπιστήμιο Πειραιώς",
    mapLink: "Άνοιγμα στους χάρτες",
    faqTitle: "Πρακτικά ερωτήματα",
    faqLink: "Όλες οι ερωτήσεις",
    applyLink: "Κάνε αίτηση",
    phone: "Τηλέφωνο",
    mobile: "Κινητό",
    email: "Email",
  },
  en: {
    crumbHome: "Home",
    crumb: "Contact",
    annot: "Where to find us",
    title: "Contact",
    answer:
      "The programme Secretariat is on the 5th floor, Office 518, 80 Karaoli & Dimitriou Street, 185 34 Piraeus, Greece. Telephone +30 210 414 2284 and +30 694 476 8189, email strategy@unipi.gr.",
    meta: [
      { label: "Telephone", value: "+30 210 414 2284" },
      { label: "Mobile", value: "+30 694 476 8189" },
      { label: "Email", value: "strategy@unipi.gr" },
    ],
    peopleAnnot: "Who to ask",
    peopleTitle: "Contacts by subject",
    addressAnnot: "Address",
    addressTitle: "University of Piraeus",
    mapLink: "Open in maps",
    faqTitle: "Practical questions",
    faqLink: "All questions",
    applyLink: "Apply now",
    phone: "Telephone",
    mobile: "Mobile",
    email: "Email",
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
    route: "contact",
    title:
      l === "el"
        ? "Επικοινωνία & Γραμματεία — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Contact & Secretariat — MSc Economic & Business Strategy",
    description: copy[l].answer as string,
    keywords:
      l === "el"
        ? ["γραμματεία ΠΜΣ ΟΕΣ", "επικοινωνία μεταπτυχιακό Πειραιάς", "strategy@unipi.gr"]
        : ["MSc EBS secretariat", "contact University of Piraeus", "strategy@unipi.gr"],
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = copy[l];
  const address = site.contact.address;
  const practicalFaq = faqByGroup("practical");

  const people = [
    site.contact.director,
    site.contact.secretariat,
    site.contact.departmentSecretariat,
    site.contact.internshipOfficer,
  ];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${address.lat},${address.lon}`;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbNode(l, [
            { name: t.crumbHome as string, route: "home" },
            { name: t.crumb as string, route: "contact" },
          ]),
          departmentNode(l),
          placeNode(l),
          {
            "@type": "ContactPage",
            name: t.title as string,
            description: t.answer as string,
            url: `${site.url}${href(l, "contact")}`,
            mainEntity: {
              "@id": `${site.url}/#department`,
            },
          },
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome as string, route: "home" },
          { label: t.crumb as string, route: "contact" },
        ]}
        annot={t.annot as string}
        title={t.title as string}
        answer={t.answer as string}
        meta={t.meta as { label: string; value: string }[]}
      />

      {/* People */}
      <Section tone="abyss">
        <Container wide>
          <Reveal>
            <Heading
              annot={t.peopleAnnot as string}
              title={t.peopleTitle as string}
            />
          </Reveal>

          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {people.map((person, index) => (
              <Reveal key={person.email} delay={index * 60} as="li">
                <div className="border-t border-piraeus/40 pt-5">
                  <p className="annot mb-3 text-brass">{person.role[l]}</p>
                  <p className="font-display text-xl font-semibold text-lume">
                    {person.name[l]}
                  </p>
                  <dl className="mt-4 space-y-1.5 text-sm">
                    {"phoneDisplay" in person && person.phoneDisplay ? (
                      <div className="flex gap-3">
                        <dt className="w-20 shrink-0 text-lume-faint">
                          {t.phone as string}
                        </dt>
                        <dd className="sounding">
                          <a
                            href={`tel:${person.phone}`}
                            className="link-plot text-lume-dim hover:text-brass"
                          >
                            {person.phoneDisplay}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {"mobileDisplay" in person && person.mobileDisplay ? (
                      <div className="flex gap-3">
                        <dt className="w-20 shrink-0 text-lume-faint">
                          {t.mobile as string}
                        </dt>
                        <dd className="sounding">
                          <a
                            href={`tel:${person.mobile}`}
                            className="link-plot text-lume-dim hover:text-brass"
                          >
                            {person.mobileDisplay}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 text-lume-faint">
                        {t.email as string}
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${person.email}`}
                          className="link-plot break-all text-brass"
                        >
                          {person.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Address */}
      <Section tone="light">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Annot className="mb-6">{t.addressAnnot as string}</Annot>
              <h2 className="text-title leading-tight text-deep">
                {t.addressTitle as string}
              </h2>
              <address className="text-lede mt-8 space-y-1 leading-relaxed text-deep/75 not-italic">
                <p>{site.department[l]}</p>
                <p>{site.contact.secretariat.office[l]}</p>
                <p>{l === "el" ? address.street : address.streetEn}</p>
                <p>
                  {address.postalCode} {address.city[l]}
                </p>
                <p>{address.country[l]}</p>
              </address>
              <div className="mt-9">
                <ButtonLink href={mapUrl} variant="quiet" external>
                  {t.mapLink as string}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-7">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-deep/5">
                <iframe
                  title={t.addressTitle as string}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${address.lon - 0.004}%2C${address.lat - 0.003}%2C${address.lon + 0.004}%2C${address.lat + 0.003}&layer=mapnik&marker=${address.lat}%2C${address.lon}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Practical FAQ */}
      <Section tone="deep">
        <Container wide>
          <Reveal>
            <Heading title={t.faqTitle as string} />
          </Reveal>
          <dl className="mt-12">
            {practicalFaq.map((item, index) => (
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
            <ButtonLink href={href(l, "faq")} variant="ghost">
              {t.faqLink as string}
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
