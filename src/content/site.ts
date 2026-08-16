import type { I18n } from "@/lib/i18n";

/**
 * Single source of truth for every hard fact about the programme.
 * Everything here is mirrored into JSON-LD, so keep it accurate.
 */
export const site = {
  url: "https://msc-ebs.gr",

  name: {
    el: "ΠΜΣ Οικονομική & Επιχειρησιακή Στρατηγική",
    en: "MSc in Economic & Business Strategy",
  } satisfies I18n,

  nameFull: {
    el: "Πρόγραμμα Μεταπτυχιακών Σπουδών «Οικονομική & Επιχειρησιακή Στρατηγική»",
    en: "MSc Programme in Economic & Business Strategy",
  } satisfies I18n,

  shortName: "MSc EBS",

  department: {
    el: "Τμήμα Οικονομικής Επιστήμης",
    en: "Department of Economics",
  } satisfies I18n,

  university: {
    el: "Πανεπιστήμιο Πειραιώς",
    en: "University of Piraeus",
  } satisfies I18n,

  tagline: {
    el: "Εκεί όπου η οικονομική θεωρία συναντά τη στρατηγική απόφαση.",
    en: "Where economic theory meets the strategic decision.",
  } satisfies I18n,

  description: {
    el: "Υβριδικό μεταπτυχιακό δύο ετών στην Οικονομική & Επιχειρησιακή Στρατηγική από το Τμήμα Οικονομικής Επιστήμης του Πανεπιστημίου Πειραιώς. Λειτουργεί αδιάλειπτα από το 2006, με 12 μαθήματα, διπλωματική εργασία, προαιρετική πρακτική άσκηση σε πάνω από 40 συνεργαζόμενες επιχειρήσεις και συμμετοχή στο CFA Institute University Affiliation Program.",
    en: "A two-year hybrid master's in Economic & Business Strategy from the Department of Economics, University of Piraeus. Running continuously since 2006, with 12 taught courses, a dissertation, an optional internship across more than 40 partner employers, and participation in the CFA Institute University Affiliation Program.",
  } satisfies I18n,

  // ---- Hard programme facts -------------------------------------------------
  facts: {
    foundedYear: 2006,
    semesters: 4,
    taughtCourses: 12,
    /** REVIEW: 7.5 ECTS × 12 courses + 30 ECTS dissertation. Confirm against the ΦΕΚ. */
    ectsPerCourse: 7.5,
    ectsDissertation: 30,
    ectsTotal: 120,
    tuitionEur: 6500,
    tuitionInstalments: 4,
    scholarshipsPerSemester: 3,
    scholarshipAmountEur: 1000,
    /** Taught weekday evenings. */
    classHours: "18:15–21:00",
    internshipMonths: "4–6",
    partnerEmployers: 40,
  },

  contact: {
    director: {
      name: { el: "Καθηγητής Γιάννης Α. Πολλάλης", en: "Professor Yannis A. Pollalis" } satisfies I18n,
      role: {
        el: "Ιδρυτής & Διευθυντής του ΠΜΣ",
        en: "Founder & Director of the Programme",
      } satisfies I18n,
      phone: "+302104142353",
      phoneDisplay: "210 414 2353",
      email: "yannis@unipi.gr",
    },
    secretariat: {
      name: { el: "Λία Αργυρού", en: "Lia Argyrou" } satisfies I18n,
      role: {
        el: "Γραμματεία ΠΜΣ",
        en: "Programme Secretariat",
      } satisfies I18n,
      phone: "+302104142284",
      phoneDisplay: "210 414 2284",
      mobile: "+306944768189",
      mobileDisplay: "694 476 8189",
      email: "strategy@unipi.gr",
      office: {
        el: "5ος όροφος, Γραφείο 518",
        en: "5th floor, Office 518",
      } satisfies I18n,
    },
    departmentSecretariat: {
      name: { el: "Αντώνης Σχοινάς", en: "Antonis Schinas" } satisfies I18n,
      role: {
        el: "Γραμματεία Τμήματος Οικονομικής Επιστήμης",
        en: "Department of Economics Secretariat",
      } satisfies I18n,
      phone: "+302104142367",
      phoneDisplay: "210 414 2367",
      email: "schinas@unipi.gr",
    },
    internshipOfficer: {
      name: { el: "Αντώνιος Σαμπράκος", en: "Antonios Sabrakos" } satisfies I18n,
      role: {
        el: "Υπεύθυνος Πρακτικής Άσκησης",
        en: "Internship Coordinator",
      } satisfies I18n,
      phone: "+306947614341",
      phoneDisplay: "694 761 4341",
      email: "prakt_oe@webmail.unipi.gr",
    },
    address: {
      street: "Καραολή & Δημητρίου 80",
      streetEn: "80 Karaoli & Dimitriou St.",
      postalCode: "185 34",
      city: { el: "Πειραιάς", en: "Piraeus" } satisfies I18n,
      country: { el: "Ελλάδα", en: "Greece" } satisfies I18n,
      countryCode: "GR",
      lat: 37.942_5,
      lon: 23.653_2,
    },
  },

  social: {
    facebook: "https://www.facebook.com/MSC.EBS",
    linkedin: "https://www.linkedin.com/in/economic-business-strategy-0a0b00211/",
    instagram: "https://www.instagram.com/msc_ebs",
    alumni: "https://alumni.msc-ebs.gr/",
  },

  external: {
    university: "https://www.unipi.gr/",
    department: "https://economics.unipi.gr/",
    library: "https://www.lib.unipi.gr/",
    vpn: "https://www.unipi.gr/unipi/el/hu-sundesh-vpn.html",
    seminars: "https://www.unipi.gr/unipi/el/oik-ereuna/seminaria.html",
    links: "https://www.unipi.gr/unipi/el/oik-sundesmoi.html",
    cfa: "https://www.cfainstitute.org/programs/university-affiliation",
    stevens: "https://www.stevens.edu/school-business",
  },

  /** Documents still served from the legacy WordPress uploads directory. */
  documents: {
    regulation:
      "https://msc-ebs.gr/wp-content/uploads/2025/07/ΦΕΚ-Β-1780-19.3.24-ΑΝΤΙΚ-ΚΑΝΟΝΙΣΜΟΥ-ΠΜΣ-ΟΕΣ-1.pdf",
    qualityPolicy:
      "https://msc-ebs.gr/wp-content/uploads/2025/03/M1.1_new-Politiki-poiotitas-tis-akadimaikis-monadas-gia-tin-anaptyksi-kai-ti-veltiwsi-PMS-OES.pdf",
    staffPolicy:
      "https://msc-ebs.gr/wp-content/uploads/2025/03/Politiki-Ypostiriksis-kai-Anaptyksis-Proswpikoy.pdf",
    evaluationProcess:
      "https://msc-ebs.gr/wp-content/uploads/2025/03/Διαδικασία-αξιολογησης-αιτησεων-υποψηφιων-ΠΜΣ-ΟΕΣ.pdf",
    applicationForm:
      "https://msc-ebs.gr/wp-content/uploads/2026/05/aitisi_2026.pdf",
    recommendationLetter:
      "https://msc-ebs.gr/wp-content/uploads/2020/12/recletter.pdf",
    dissertationGuide:
      "https://msc-ebs.gr/wp-content/uploads/2026/05/ΟΔΗΓΟΣ-ΕΚΠΟΝΗΣΗ-ΔΙΠΛΩΜΑΤΙΚΗΣ-ΕΡΓΑΣΙΑΣ-2026.pdf",
    externalEvaluation:
      "https://msc-ebs.gr/wp-content/uploads/2020/12/Departmental_evaluation.pdf",
    stevensMou:
      "https://msc-ebs.gr/wp-content/uploads/2022/10/MoU-New-Jersey_28062022134038.pdf",
    jobProspects:
      "https://msc-ebs.gr/wp-content/uploads/2021/03/job-prospects-2021.pdf",
  },
} as const;

/** Graduate destinations, from the programme's own alumni survey. */
export const employmentBreakdown: {
  percent: number;
  sector: I18n;
  examples?: string;
}[] = [
  {
    percent: 32,
    sector: { el: "Μικρομεσαίες επιχειρήσεις", en: "Small & medium enterprises" },
  },
  {
    percent: 20,
    sector: {
      el: "Τραπεζικός, ελεγκτικός & χρηματοοικονομικός τομέας",
      en: "Banking, audit & financial services",
    },
    examples: "Alpha Bank, Eurobank, Εθνική Τράπεζα, Deloitte, EY, PwC",
  },
  {
    percent: 14,
    sector: { el: "Διεθνείς επιχειρήσεις", en: "International corporations" },
    examples: "BP, BIC Violex",
  },
  {
    percent: 13,
    sector: {
      el: "Τηλεπικοινωνίες & πληροφορική",
      en: "Telecommunications & IT",
    },
    examples: "ΟΤΕ, Vodafone, Intel",
  },
  {
    percent: 12,
    sector: {
      el: "Λιανική, ναυτιλία, ασφάλειες & φάρμακο",
      en: "Retail, shipping, insurance & pharmaceuticals",
    },
    examples: "Lidl, ΑΒ Βασιλόπουλος",
  },
  {
    percent: 9,
    sector: { el: "Δημόσιος τομέας", en: "Public sector" },
    examples: "Υπουργείο Οικονομικών, Υπουργείο Οικονομίας",
  },
];
