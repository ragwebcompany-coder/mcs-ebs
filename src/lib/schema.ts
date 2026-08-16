import { site } from "@/content/site";
import type { Course } from "@/content/courses";
import { courses, taughtCourses } from "@/content/courses";
import type { FacultyMember } from "@/content/faculty";
import { faculty } from "@/content/faculty";
import { faq } from "@/content/faq";
import type { Announcement } from "@/content/announcements";
import { href, htmlLang, type Locale, type RouteKey } from "./i18n";

/*
  Structured data is written as one connected @graph per page rather than a pile
  of disconnected blocks: every node has an @id and references the others, so a
  crawler resolves the programme, its provider, its courses and its staff as a
  single entity cluster instead of unrelated fragments.
*/

const ids = {
  org: `${site.url}/#organization`,
  dept: `${site.url}/#department`,
  programme: `${site.url}/#programme`,
  website: `${site.url}/#website`,
  place: `${site.url}/#place`,
};

export function organizationNode(locale: Locale) {
  return {
    "@type": "CollegeOrUniversity",
    "@id": ids.org,
    name: site.university[locale],
    alternateName: "University of Piraeus",
    url: site.external.university,
    sameAs: [
      "https://www.unipi.gr/",
      "https://en.wikipedia.org/wiki/University_of_Piraeus",
      "https://www.wikidata.org/wiki/Q2298240",
      "https://ror.org/03xawq690",
    ],
    address: postalAddress(locale),
  };
}

export function departmentNode(locale: Locale) {
  return {
    "@type": "EducationalOrganization",
    "@id": ids.dept,
    name: `${site.department[locale]}, ${site.university[locale]}`,
    url: site.external.department,
    parentOrganization: { "@id": ids.org },
    address: postalAddress(locale),
  };
}

function postalAddress(locale: Locale) {
  const a = site.contact.address;
  return {
    "@type": "PostalAddress",
    streetAddress: locale === "el" ? a.street : a.streetEn,
    postalCode: a.postalCode,
    addressLocality: a.city[locale],
    addressCountry: a.countryCode,
  };
}

export function placeNode(locale: Locale) {
  const a = site.contact.address;
  return {
    "@type": "Place",
    "@id": ids.place,
    name: `${site.university[locale]} — ${site.department[locale]}`,
    address: postalAddress(locale),
    geo: {
      "@type": "GeoCoordinates",
      latitude: a.lat,
      longitude: a.lon,
    },
  };
}

/**
 * The programme itself. `EducationalOccupationalProgram` is the node that
 * search engines use to surface degree programmes, so it carries every hard
 * fact we have: duration, credits, price, delivery mode and outcomes.
 */
export function programmeNode(locale: Locale) {
  const f = site.facts;
  return {
    "@type": "EducationalOccupationalProgram",
    "@id": ids.programme,
    name: site.nameFull[locale],
    alternateName:
      locale === "el"
        ? "MSc in Economic & Business Strategy"
        : "ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική",
    description: site.description[locale],
    url: `${site.url}${href(locale, "home")}`,
    programType: "Master's degree programme",
    educationalCredentialAwarded: locale === "el"
      ? "Μεταπτυχιακό Δίπλωμα Ειδίκευσης (M.Sc.)"
      : "Master of Science (M.Sc.)",
    educationalProgramMode: "blended",
    timeToComplete: "P2Y",
    numberOfCredits: {
      "@type": "StructuredValue",
      value: f.ectsTotal,
      unitText: "ECTS",
    },
    occupationalCategory: [
      "Business strategy",
      "Financial analysis",
      "Management consulting",
      "Business analytics",
    ],
    provider: { "@id": ids.dept },
    inLanguage: ["el", "en"],
    offers: {
      "@type": "Offer",
      category: "Tuition",
      price: f.tuitionEur,
      priceCurrency: "EUR",
      url: `${site.url}${href(locale, "tuition")}`,
    },
    hasCourse: taughtCourses.map((course) => ({
      "@id": `${site.url}${href(locale, "courses", course.slug[locale])}#course`,
    })),
    financialAidEligible:
      locale === "el"
        ? `Υποτροφίες αριστείας ${f.scholarshipAmountEur}€ ανά εξάμηνο`
        : `Merit scholarships of €${f.scholarshipAmountEur} per semester`,
  };
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.nameFull[locale],
    inLanguage: htmlLang[locale],
    publisher: { "@id": ids.dept },
  };
}

export function courseNode(course: Course, locale: Locale) {
  const url = `${site.url}${href(locale, "courses", course.slug[locale])}`;
  const instructors = course.instructors
    .map((id) => faculty.find((person) => person.id === id))
    .filter((person): person is FacultyMember => Boolean(person));

  return {
    "@type": "Course",
    "@id": `${url}#course`,
    name: course.title[locale],
    description: course.summary[locale],
    url,
    inLanguage: htmlLang[locale],
    courseCode: course.id,
    provider: { "@id": ids.dept },
    isPartOf: { "@id": ids.programme },
    numberOfCredits: {
      "@type": "StructuredValue",
      value: course.ects,
      unitText: "ECTS",
    },
    educationalCredentialAwarded: `${course.ects} ECTS`,
    teaches: course.outcomes[locale],
    syllabusSections: course.topics[locale].map((topic, index) => ({
      "@type": "Syllabus",
      name: topic,
      position: index + 1,
    })),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "blended",
      courseWorkload: `PT${Math.round(course.ects * 25)}H`,
      location: { "@id": ids.place },
      instructor: instructors.map((person) => ({
        "@type": "Person",
        name: person.name[locale],
        url: `${site.url}${href(locale, "faculty", person.slug[locale])}`,
      })),
    },
  };
}

export function personNode(person: FacultyMember, locale: Locale) {
  const url = `${site.url}${href(locale, "faculty", person.slug[locale])}`;
  const taught = courses.filter((course) =>
    course.instructors.includes(person.id),
  );

  return {
    "@type": "Person",
    "@id": `${url}#person`,
    name: person.name[locale],
    jobTitle: person.rank[locale],
    description: person.summary[locale],
    url,
    worksFor: { "@id": ids.dept },
    affiliation: { "@id": ids.org },
    knowsAbout: person.fields[locale],
    ...(person.email ? { email: `mailto:${person.email}` } : {}),
    ...(person.phone ? { telephone: person.phone } : {}),
    ...(taught.length
      ? {
          performerIn: taught.map((course) => ({
            "@id": `${site.url}${href(locale, "courses", course.slug[locale])}#course`,
          })),
        }
      : {}),
  };
}

export function announcementNode(item: Announcement, locale: Locale) {
  const url = `${site.url}${href(locale, "news", item.slug[locale])}`;
  return {
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: item.title[locale],
    description: item.summary[locale],
    url,
    datePublished: item.date,
    dateModified: item.date,
    inLanguage: htmlLang[locale],
    author: { "@id": ids.dept },
    publisher: { "@id": ids.dept },
    articleBody: item.body[locale].join("\n\n"),
    mainEntityOfPage: url,
  };
}

export function faqNode(locale: Locale) {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}${href(locale, "faq")}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale],
      },
    })),
  };
}

export function breadcrumbNode(
  locale: Locale,
  trail: { name: string; route: RouteKey; slug?: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${href(locale, crumb.route, crumb.slug)}`,
    })),
  };
}

export function itemListNode(
  name: string,
  items: { name: string; url: string }[],
) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** Wraps any set of nodes into the connected graph shape. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
