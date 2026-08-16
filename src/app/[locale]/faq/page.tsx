import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, Container, Heading, Section } from "@/components/ui";

import { faq, faqGroups, type FaqItem } from "@/content/faq";
import { locales, href, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbNode, faqNode } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const order: FaqItem["group"][] = [
  "programme",
  "admissions",
  "cost",
  "career",
  "practical",
];

const copy = {
  el: {
    crumbHome: "Αρχική",
    crumb: "Συχνές ερωτήσεις",
    annot: "Απαντήσεις",
    title: "Συχνές ερωτήσεις",
    answer:
      "Είκοσι απαντήσεις για το ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική»: δομή και διάρκεια, δίδακτρα και υποτροφίες, προϋποθέσεις και διαδικασία αίτησης, πρακτική άσκηση και επαγγελματική αποκατάσταση.",
    contents: "Περιεχόμενα",
    ctaTitle: "Δεν απαντήθηκε η ερώτησή σου;",
    ctaBody:
      "Η Γραμματεία του ΠΜΣ απαντά σε κάθε ερώτημα υποψηφίων, στο τηλέφωνο ή στο email.",
    ctaContact: "Επικοινωνία",
    ctaApply: "Κάνε αίτηση",
  },
  en: {
    crumbHome: "Home",
    crumb: "Frequently asked questions",
    annot: "Answers",
    title: "Frequently asked questions",
    answer:
      "Twenty answers about the MSc in Economic & Business Strategy: structure and duration, tuition and scholarships, eligibility and the application process, internships and career outcomes.",
    contents: "Contents",
    ctaTitle: "Question not answered?",
    ctaBody:
      "The Secretariat answers every question from prospective students, by telephone or email.",
    ctaContact: "Contact us",
    ctaApply: "Apply now",
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
    route: "faq",
    title:
      l === "el"
        ? "Συχνές ερωτήσεις — ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική"
        : "Frequently asked questions — MSc Economic & Business Strategy",
    description: copy[l].answer,
    keywords: faq.slice(0, 8).map((item) => item.question[l]),
  });
}

export default async function FaqPage({
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
            { name: t.crumb, route: "faq" },
          ]),
          faqNode(l),
        )}
      />

      <PageHeader
        locale={l}
        trail={[
          { label: t.crumbHome, route: "home" },
          { label: t.crumb, route: "faq" },
        ]}
        annot={t.annot}
        title={t.title}
        answer={t.answer}
      />

      <Section tone="abyss">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Contents — sticky on desktop */}
            <nav
              aria-label={t.contents}
              className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start"
            >
              <p className="annot mb-5 text-brass">{t.contents}</p>
              <ul className="space-y-3">
                {order.map((group) => (
                  <li key={group}>
                    <a
                      href={`#${group}`}
                      className="link-plot text-sm text-lume-dim hover:text-lume"
                    >
                      {faqGroups[group][l]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-9">
              {order.map((group) => {
                const items = faq.filter((item) => item.group === group);

                return (
                  <section key={group} id={group} className="mb-16 last:mb-0">
                    <h2 className="text-title border-b border-piraeus/40 pb-5 text-lume">
                      {faqGroups[group][l]}
                    </h2>

                    <dl>
                      {items.map((item, index) => (
                        <Reveal key={item.id} delay={index * 50}>
                          <div className="border-b border-piraeus/25 py-7">
                            <dt
                              id={item.id}
                              className="font-display text-lg leading-snug font-semibold text-lume md:text-xl"
                            >
                              {item.question[l]}
                            </dt>
                            <dd className="mt-3 max-w-4xl leading-[1.75] text-lume-dim">
                              {item.answer[l]}
                            </dd>
                          </div>
                        </Reveal>
                      ))}
                    </dl>
                  </section>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container wide>
          <Reveal className="max-w-2xl">
            <Heading title={t.ctaTitle} lede={t.ctaBody} tone="light" />
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={href(l, "contact")} variant="quiet">
                {t.ctaContact}
              </ButtonLink>
              <ButtonLink href={href(l, "admissions")}>{t.ctaApply}</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
