import type { I18n, RouteKey } from "./i18n";

export interface NavLink {
  label: I18n;
  route: RouteKey;
  /** Shown in the mega-menu under the label. */
  hint?: I18n;
  external?: string;
}

export interface NavGroup {
  label: I18n;
  links: NavLink[];
}

export const navigation: NavGroup[] = [
  {
    label: { el: "Σπουδές", en: "Study" },
    links: [
      {
        route: "programme",
        label: { el: "Δομή & περιεχόμενο", en: "Structure & content" },
        hint: {
          el: "Τέσσερα εξάμηνα, 12 μαθήματα, διπλωματική",
          en: "Four semesters, 12 courses, a dissertation",
        },
      },
      {
        route: "courses",
        label: { el: "Μαθήματα", en: "Courses" },
        hint: {
          el: "Αναλυτικά περιγράμματα και για τα 20 αντικείμενα",
          en: "Full outlines for all 20 subjects",
        },
      },
      {
        route: "faculty",
        label: { el: "Διδακτικό προσωπικό", en: "Faculty" },
        hint: {
          el: "Ποιοι διδάσκουν και τι ερευνούν",
          en: "Who teaches, and what they research",
        },
      },
      {
        route: "seminars",
        label: { el: "Σεμινάρια ενδυνάμωσης", en: "Empowerment seminars" },
        hint: {
          el: "Οκτώ κύκλοι εκτός βασικού προγράμματος",
          en: "Eight series outside the core curriculum",
        },
      },
      {
        route: "tuition",
        label: { el: "Δίδακτρα", en: "Tuition" },
        hint: {
          el: "6.500 € σε τέσσερις δόσεις",
          en: "€6,500 in four instalments",
        },
      },
    ],
  },
  {
    label: { el: "Εισαγωγή", en: "Admissions" },
    links: [
      {
        route: "admissions",
        label: { el: "Πώς κάνω αίτηση", en: "How to apply" },
        hint: {
          el: "Πέντε βήματα, από τα δικαιολογητικά στην εγγραφή",
          en: "Five steps, from documents to enrolment",
        },
      },
      {
        route: "scholarships",
        label: { el: "Υποτροφίες", en: "Scholarships" },
        hint: {
          el: "Τρεις υποτροφίες 1.000 € κάθε εξάμηνο",
          en: "Three €1,000 awards every semester",
        },
      },
      {
        route: "faq",
        label: { el: "Συχνές ερωτήσεις", en: "Frequently asked questions" },
        hint: {
          el: "Είκοσι απαντήσεις για υποψηφίους",
          en: "Twenty answers for candidates",
        },
      },
      {
        route: "documents",
        label: { el: "Θεσμικά έγγραφα", en: "Official documents" },
        hint: {
          el: "Κανονισμός, πολιτική ποιότητας, έντυπα",
          en: "Regulations, quality policy, forms",
        },
      },
    ],
  },
  {
    label: { el: "Φοιτητές & απόφοιτοι", en: "Students & alumni" },
    links: [
      {
        route: "internship",
        label: { el: "Πρακτική άσκηση", en: "Internship" },
        hint: {
          el: "Πάνω από 40 συνεργαζόμενοι εργοδότες",
          en: "More than 40 partner employers",
        },
      },
      {
        route: "careers",
        label: { el: "Επαγγελματική αποκατάσταση", en: "Career outcomes" },
        hint: {
          el: "Πού εργάζονται οι απόφοιτοι, σε αριθμούς",
          en: "Where graduates work, in numbers",
        },
      },
      {
        route: "international",
        label: { el: "Διεθνής εμπειρία", en: "International exposure" },
        hint: {
          el: "Silicon Valley, Νέα Υόρκη, Βρυξέλλες",
          en: "Silicon Valley, New York, Brussels",
        },
      },
      {
        route: "alumni",
        label: { el: "Πύλη αποφοίτων", en: "Alumni portal" },
        hint: {
          el: "Το δίκτυο των αποφοίτων του ΠΜΣ",
          en: "The programme's graduate network",
        },
      },
    ],
  },
  {
    label: { el: "Νέα", en: "News" },
    links: [
      {
        route: "news",
        label: { el: "Ανακοινώσεις", en: "Announcements" },
        hint: {
          el: "Εκδηλώσεις, θέσεις πρακτικής, προκηρύξεις",
          en: "Events, internship places, calls",
        },
      },
      {
        route: "gallery",
        label: { el: "Δραστηριότητες", en: "Activities" },
        hint: {
          el: "Εκπαιδευτικές εκδρομές από το 2012",
          en: "Study trips since 2012",
        },
      },
      {
        route: "contact",
        label: { el: "Επικοινωνία", en: "Contact" },
        hint: {
          el: "Γραμματεία, διεύθυνση, τηλέφωνα",
          en: "Secretariat, address, telephone",
        },
      },
    ],
  },
];

/** Flat list used by the sitemap and the footer. */
export const allNavRoutes: RouteKey[] = navigation.flatMap((group) =>
  group.links.map((link) => link.route),
);
