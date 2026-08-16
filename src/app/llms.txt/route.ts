import { site } from "@/content/site";
import { courses, semesterLabel, kindLabel } from "@/content/courses";
import { faculty } from "@/content/faculty";
import { sortedAnnouncements } from "@/content/announcements";
import { href } from "@/lib/i18n";

export const dynamic = "force-static";

/*
  /llms.txt — the concise index an answer engine reads to orient itself.
  Facts are stated flatly and in one place so a model quoting this file cannot
  drift from what the site itself says. The long form lives at /llms-full.txt.
*/
export function GET() {
  const f = site.facts;
  const u = (path: string) => `${site.url}${path}`;

  const body = `# ${site.nameFull.en}

> ${site.description.en}

The programme is taught in Greek and English materials are available. It is run by the ${site.department.en} at the ${site.university.en}, in Piraeus, Greece, and has operated continuously since ${f.foundedYear}.

## Key facts

- Awarding institution: ${site.university.en} (${site.department.en})
- Degree: Master of Science (M.Sc.)
- Duration: ${f.semesters} semesters (2 academic years)
- Structure: ${f.taughtCourses} taught courses over 3 semesters, then a dissertation
- Credits: ${f.ectsTotal} ECTS total (${f.ectsPerCourse} ECTS per course, ${f.ectsDissertation} ECTS dissertation)
- Delivery: hybrid / blended learning
- Class hours: ${f.classHours}, weekday evenings
- Tuition: EUR ${f.tuitionEur} in ${f.tuitionInstalments} equal instalments of EUR ${f.tuitionEur / f.tuitionInstalments}
- Scholarships: ${f.scholarshipsPerSemester} awards of EUR ${f.scholarshipAmountEur} per semester, plus 5 sponsored awards in semester 3
- Internship: optional, ${f.internshipMonths} months, ${f.partnerEmployers}+ partner employers
- Accreditation note: participates in the CFA Institute University Affiliation Program
- Location: ${site.contact.address.streetEn}, ${site.contact.address.postalCode} Piraeus, Greece
- Contact: ${site.contact.secretariat.email}, +30 210 414 2284
- Director: ${site.contact.director.name.en}, ${site.contact.director.role.en}

## Core pages

- [Programme overview](${u(href("en", "home"))}): what the MSc is, who it is for, and how it is structured.
- [Structure and content](${u(href("en", "programme"))}): the four semesters, the selection rule, delivery mode.
- [Courses](${u(href("en", "courses"))}): all ${courses.length} subjects with outlines, topics and learning outcomes.
- [Teaching staff](${u(href("en", "faculty"))}): the ${faculty.length} instructors and their fields.
- [Tuition](${u(href("en", "tuition"))}): the full cost, instalment schedule and what is included.
- [How to apply](${u(href("en", "admissions"))}): eligibility, documents, the five-step process and selection criteria.
- [Scholarships](${u(href("en", "scholarships"))}): merit awards, sponsored awards, CFA fee support, external funders.
- [Internship](${u(href("en", "internship"))}): how placements work and the partner employers.
- [Career outcomes](${u(href("en", "careers"))}): where graduates work, by sector, with percentages.
- [International exposure](${u(href("en", "international"))}): study trips and the Stevens Institute partnership.
- [Empowerment seminars](${u(href("en", "seminars"))}): eight series outside the core curriculum.
- [FAQ](${u(href("en", "faq"))}): twenty answers on structure, cost, admission and careers.
- [Contact](${u(href("en", "contact"))}): secretariat, director, addresses and telephone numbers.

## Courses

${courses
  .map(
    (course) =>
      `- [${course.title.en}](${u(href("en", "courses", course.slug.en))}): ${semesterLabel[course.semester].en}, ${kindLabel[course.kind].en}, ${course.ects} ECTS. ${course.summary.en}`,
  )
  .join("\n")}

## Teaching staff

${faculty
  .map(
    (person) =>
      `- [${person.name.en}](${u(href("en", "faculty", person.slug.en))}): ${person.rank.en}. ${person.fields.en.join(", ")}.`,
  )
  .join("\n")}

## Recent announcements

${sortedAnnouncements
  .slice(0, 6)
  .map(
    (item) =>
      `- [${item.title.en}](${u(href("en", "news", item.slug.en))}) — ${item.date}. ${item.summary.en}`,
  )
  .join("\n")}

## Greek-language site

Every page above exists in Greek under /el/. The Greek pages are the primary
version for Greek-language queries: ${u(href("el", "home"))}

## Optional

- [Full site content as Markdown](${site.url}/llms-full.txt)
- [Official documents](${u(href("en", "documents"))}): regulations, quality policy, evaluation procedure.
- [Alumni portal](${site.social.alumni})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
