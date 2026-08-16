import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, Container, Section } from "@/components/ui";

import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Photography from the programme's own activities archive. */
const photos = [
  {
    file: "ny-washington-2024.jpg",
    caption: {
      el: "Εκπαιδευτική εκδρομή σε Νέα Υόρκη και Ουάσιγκτον, Δεκέμβριος 2024",
      en: "Study trip to New York City and Washington DC, December 2024",
    },
    span: "lg:col-span-8 lg:row-span-2",
    ratio: "aspect-16/10",
  },
  {
    file: "nyu-01.jpg",
    caption: {
      el: "Επίσκεψη στο New York University, Άνοιξη 2022",
      en: "Visit to New York University, Spring 2022",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyc-1.jpg",
    caption: {
      el: "Επίσκεψη στα κεντρικά γραφεία της Datasite, Νέα Υόρκη",
      en: "Visit to Datasite headquarters, New York City",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyu-03.jpg",
    caption: {
      el: "Διάλεξη στο Stevens Institute of Technology, Νέα Ιερσέη",
      en: "Lecture at Stevens Institute of Technology, New Jersey",
    },
    span: "lg:col-span-5",
    ratio: "aspect-4/3",
  },
  {
    file: "nyc-3.jpg",
    caption: {
      el: "Φοιτητές και διδάσκοντες του ΠΜΣ στις ΗΠΑ",
      en: "Programme students and faculty in the United States",
    },
    span: "lg:col-span-7",
    ratio: "aspect-16/10",
  },
  {
    file: "nyu-05.jpg",
    caption: {
      el: "Παρουσίαση στο Drexel University, Φιλαδέλφεια",
      en: "Presentation at Drexel University, Philadelphia",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyc-5.jpg",
    caption: {
      el: "Σεμινάριο M&A και due diligence στη Datasite",
      en: "M&A and due diligence seminar at Datasite",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyu-06.jpg",
    caption: {
      el: "Εκπαιδευτική επίσκεψη σε πανεπιστήμια των ΗΠΑ",
      en: "Study visit to universities in the United States",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyc-2.jpg",
    caption: {
      el: "Η ομάδα του ΠΜΣ στη Νέα Υόρκη",
      en: "The programme cohort in New York City",
    },
    span: "lg:col-span-6",
    ratio: "aspect-16/10",
  },
  {
    file: "nyu-04.jpg",
    caption: {
      el: "Διάλεξη για τα κρυπτονομίσματα και την παγκόσμια οικονομία",
      en: "Lecture on cryptocurrencies and the world economy",
    },
    span: "lg:col-span-6",
    ratio: "aspect-16/10",
  },
  {
    file: "nyc-4.jpg",
    caption: {
      el: "Επίσκεψη σε επιχειρήσεις των ΗΠΑ, Άνοιξη 2022",
      en: "Company visits in the United States, Spring 2022",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyu-02.jpg",
    caption: {
      el: "Διάλεξη για τη γεωπολιτική και την ενεργειακή κρίση",
      en: "Lecture on geopolitics and the energy crisis",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
  {
    file: "nyc-6.jpg",
    caption: {
      el: "Η αποστολή του ΠΜΣ στις ΗΠΑ",
      en: "The programme delegation in the United States",
    },
    span: "lg:col-span-4",
    ratio: "aspect-4/3",
  },
];

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Δραστηριότητες",
    annot: "Αρχείο",
    title: "Δραστηριότητες",
    answer:
      "Φωτογραφικό υλικό από τις εκπαιδευτικές εκδρομές, τις επισκέψεις σε πανεπιστήμια και επιχειρήσεις και τις εκδηλώσεις του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική».",
    intlLink: "Χρονολόγιο εκδρομών",
    newsLink: "Ανακοινώσεις",
  },
  en: {
    crumbHome: "Home",
    crumb: "Activities",
    annot: "Archive",
    title: "Activities",
    answer:
      "Photography from the study trips, university and company visits, and events of the MSc in Economic & Business Strategy.",
    intlLink: "Trip timeline",
    newsLink: "Announcements",
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
    route: "gallery",
    title:
      l === "el"
        ? "Δραστηριότητες & φωτογραφίες — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Activities & photography — MSc Economic & Business Strategy",
    description: copy[l].answer,
  });
}

export default async function GalleryPage({
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
            { name: t.crumb, route: "gallery" },
          ]),
          {
            "@type": "ImageGallery",
            name: t.title,
            description: t.answer,
            image: photos.map((photo) => ({
              "@type": "ImageObject",
              contentUrl: `/media/gallery/${photo.file}`,
              caption: photo.caption[l],
            })),
          },
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumb, route: "gallery" },
        ]}
        annot={t.annot}
        title={t.title}
        answer={t.answer}
      />

      <Section tone="abyss">
        <Container wide>
          <ul className="grid gap-5 lg:grid-cols-12">
            {photos.map((photo, index) => (
              <Reveal
                key={photo.file}
                delay={(index % 3) * 70}
                as="li"
                className={photo.span}
              >
                <figure className="group">
                  <div
                    className={`relative w-full overflow-hidden ${photo.ratio}`}
                  >
                    <Image
                      src={`/media/gallery/${photo.file}`}
                      alt={photo.caption[l]}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-lume-faint">
                    {photo.caption[l]}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 flex flex-wrap gap-4">
            <ButtonLink href={href(l, "international")} variant="ghost">
              {t.intlLink}
            </ButtonLink>
            <ButtonLink href={href(l, "news")} variant="ghost">
              {t.newsLink}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
