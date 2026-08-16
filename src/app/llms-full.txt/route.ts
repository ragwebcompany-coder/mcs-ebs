import { site, employmentBreakdown } from "@/content/site";
import { courses, semesterLabel, kindLabel } from "@/content/courses";
import { faculty, coursesTaughtBy } from "@/content/faculty";
import { faq, faqGroups } from "@/content/faq";
import {
  trips,
  seminars,
  admissionSteps,
  admissionCriteria,
  pillars,
} from "@/content/programme";
import { internshipPartners, sponsors } from "@/content/partners";
import { sortedAnnouncements } from "@/content/announcements";
import { href, locales, type Locale } from "@/lib/i18n";

export const dynamic = "force-static";

/*
  /llms-full.txt — the entire site as one Markdown document, in both languages.
  An answer engine that fetches this gets everything the site knows in a single
  request, in the form models parse most reliably.
*/

function section(locale: Locale): string {
  const l = locale;
  const f = site.facts;
  const u = (path: string) => `${site.url}${path}`;
  const isEl = l === "el";

  return `
# ${site.nameFull[l]}

${site.description[l]}

URL: ${u(href(l, "home"))}
${isEl ? "Ίδρυμα" : "Institution"}: ${site.university[l]} — ${site.department[l]}
${isEl ? "Τίτλος" : "Award"}: ${isEl ? "Μεταπτυχιακό Δίπλωμα Ειδίκευσης (M.Sc.)" : "Master of Science (M.Sc.)"}
${isEl ? "Λειτουργεί από" : "Running since"}: ${f.foundedYear}

## ${isEl ? "Βασικά στοιχεία" : "Key facts"}

| ${isEl ? "Στοιχείο" : "Item"} | ${isEl ? "Τιμή" : "Value"} |
| --- | --- |
| ${isEl ? "Διάρκεια" : "Duration"} | ${f.semesters} ${isEl ? "εξάμηνα" : "semesters"} |
| ${isEl ? "Μαθήματα" : "Taught courses"} | ${f.taughtCourses} |
| ECTS | ${f.ectsTotal} |
| ${isEl ? "Δίδακτρα" : "Tuition"} | ${isEl ? "6.500 €" : "EUR 6,500"} |
| ${isEl ? "Δόσεις" : "Instalments"} | ${f.tuitionInstalments} × ${isEl ? "1.625 €" : "EUR 1,625"} |
| ${isEl ? "Ώρες μαθημάτων" : "Class hours"} | ${f.classHours} |
| ${isEl ? "Τρόπος διδασκαλίας" : "Delivery"} | ${isEl ? "Υβριδικό (blended)" : "Hybrid (blended)"} |
| ${isEl ? "Υποτροφίες" : "Scholarships"} | ${f.scholarshipsPerSemester} × ${isEl ? "1.000 € ανά εξάμηνο" : "EUR 1,000 per semester"} |
| ${isEl ? "Πρακτική άσκηση" : "Internship"} | ${isEl ? "Προαιρετική" : "Optional"}, ${f.internshipMonths} ${isEl ? "μήνες" : "months"} |
| ${isEl ? "Συνεργαζόμενοι εργοδότες" : "Partner employers"} | ${f.partnerEmployers}+ |

## ${isEl ? "Γιατί αυτό το πρόγραμμα" : "Why this programme"}

${pillars.map((p) => `### ${p.title[l]}\n\n${p.detail[l]}`).join("\n\n")}

## ${isEl ? "Πρόγραμμα σπουδών" : "Curriculum"}

${([1, 2, 3, 4] as const)
  .map((semester) => {
    const inSemester = courses.filter((c) => c.semester === semester);
    return `### ${semesterLabel[semester][l]}\n\n${inSemester
      .map((course) => {
        const staff = course.instructors
          .map((id) => faculty.find((p) => p.id === id)?.name[l])
          .filter(Boolean)
          .join(", ");
        return `#### ${course.title[l]}

- URL: ${u(href(l, "courses", course.slug[l]))}
- ${isEl ? "Τύπος" : "Type"}: ${kindLabel[course.kind][l]}
- ECTS: ${course.ects}
${staff ? `- ${isEl ? "Διδάσκουν" : "Taught by"}: ${staff}\n` : ""}
${course.summary[l]}

${course.body[l]}

**${isEl ? "Θεματικές ενότητες" : "Topics"}:**
${course.topics[l].map((topic) => `- ${topic}`).join("\n")}

**${isEl ? "Μαθησιακά αποτελέσματα" : "Learning outcomes"}:**
${course.outcomes[l].map((outcome) => `- ${outcome}`).join("\n")}`;
      })
      .join("\n\n")}`;
  })
  .join("\n\n")}

## ${isEl ? "Διδακτικό προσωπικό" : "Teaching staff"}

${faculty
  .map((person) => {
    const taught = coursesTaughtBy(person.id);
    return `### ${person.name[l]}

- ${isEl ? "Βαθμίδα" : "Rank"}: ${person.rank[l]}
${person.role ? `- ${isEl ? "Ρόλος" : "Role"}: ${person.role[l]}\n` : ""}- URL: ${u(href(l, "faculty", person.slug[l]))}
${person.email ? `- Email: ${person.email}\n` : ""}
${person.summary[l]}

${isEl ? "Πεδία" : "Fields"}: ${person.fields[l].join(", ")}
${taught.length ? `${isEl ? "Μαθήματα" : "Courses"}: ${taught.map((c) => c.title[l]).join(", ")}` : ""}`;
  })
  .join("\n\n")}

## ${isEl ? "Εισαγωγή" : "Admissions"}

${admissionSteps
  .map((step, index) => `${index + 1}. **${step.title[l]}** — ${step.detail[l]}`)
  .join("\n")}

**${isEl ? "Κριτήρια αξιολόγησης" : "Assessment criteria"}:**
${admissionCriteria.map((c) => `- ${c[l]}`).join("\n")}

## ${isEl ? "Επαγγελματική αποκατάσταση" : "Career outcomes"}

${isEl ? "Στοιχεία από την έρευνα αποφοίτων του προγράμματος:" : "Figures from the programme's alumni survey:"}

${employmentBreakdown
  .map(
    (row) =>
      `- ${row.percent}% — ${row.sector[l]}${row.examples ? ` (${row.examples})` : ""}`,
  )
  .join("\n")}

## ${isEl ? "Πρακτική άσκηση" : "Internship"}

${isEl ? "Προαιρετική, διάρκειας 4–6 μηνών, διαθέσιμη από το 1ο έως το 4ο εξάμηνο. Συνεργαζόμενοι φορείς:" : "Optional, 4–6 months, available from the 1st through the 4th semester. Partner organisations:"}

${internshipPartners.map((p) => `- ${p.name} (${p.sector[l]})`).join("\n")}

## ${isEl ? "Σεμινάρια ενδυνάμωσης" : "Empowerment seminars"}

${seminars.map((s) => `- **${s.title[l]}** — ${s.detail[l]}`).join("\n")}

## ${isEl ? "Διεθνής εμπειρία" : "International exposure"}

${trips.map((t) => `- ${t.season[l]} — ${t.place[l]}: ${t.detail[l]}`).join("\n")}

## ${isEl ? "Υποστηρικτές & χορηγοί" : "Supporters & sponsors"}

${sponsors.map((s) => `- ${s.name} (${s.sector[l]})`).join("\n")}

## ${isEl ? "Ανακοινώσεις" : "Announcements"}

${sortedAnnouncements
  .map(
    (item) =>
      `### ${item.title[l]} (${item.date})\n\nURL: ${u(href(l, "news", item.slug[l]))}\n\n${item.body[l].join("\n\n")}`,
  )
  .join("\n\n")}

## ${isEl ? "Συχνές ερωτήσεις" : "Frequently asked questions"}

${(Object.keys(faqGroups) as (keyof typeof faqGroups)[])
  .map((group) => {
    const items = faq.filter((item) => item.group === group);
    return `### ${faqGroups[group][l]}\n\n${items
      .map((item) => `**${item.question[l]}**\n\n${item.answer[l]}`)
      .join("\n\n")}`;
  })
  .join("\n\n")}

## ${isEl ? "Επικοινωνία" : "Contact"}

- ${site.contact.director.role[l]}: ${site.contact.director.name[l]} — ${site.contact.director.email}, ${site.contact.director.phoneDisplay}
- ${site.contact.secretariat.role[l]}: ${site.contact.secretariat.name[l]} — ${site.contact.secretariat.email}, ${site.contact.secretariat.phoneDisplay}, ${site.contact.secretariat.mobileDisplay}
- ${site.contact.internshipOfficer.role[l]}: ${site.contact.internshipOfficer.name[l]} — ${site.contact.internshipOfficer.email}
- ${isEl ? "Διεύθυνση" : "Address"}: ${site.contact.secretariat.office[l]}, ${isEl ? site.contact.address.street : site.contact.address.streetEn}, ${site.contact.address.postalCode} ${site.contact.address.city[l]}, ${site.contact.address.country[l]}
`;
}

export function GET() {
  const header = `<!--
  ${site.nameFull.en}
  Full site content in Markdown, Greek and English.
  Source of truth: ${site.url}
  Generated at build time from the site's own content modules.
-->
`;

  const body = header + locales.map(section).join("\n\n---\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
