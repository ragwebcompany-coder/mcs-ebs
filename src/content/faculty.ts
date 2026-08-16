import type { I18n, Locale } from "@/lib/i18n";
import { courses } from "./courses";

export interface FacultyMember {
  id: string;
  slug: I18n;
  name: I18n;
  /** Academic rank exactly as the department states it. */
  rank: I18n;
  /** Set for the programme director. */
  role?: I18n;
  /** Short, answer-first line used in listings, meta descriptions and JSON-LD. */
  summary: I18n;
  /** Research and teaching fields, derived from the courses they lead. */
  fields: Record<Locale, string[]>;
  email?: string;
  phone?: string;
  /**
   * True when the person appears on the department's official faculty roster.
   * Guest and affiliated instructors are listed separately.
   */
  core: boolean;
}

export const faculty: FacultyMember[] = [
  {
    id: "pollalis",
    slug: { el: "giannis-pollalis", en: "yannis-pollalis" },
    name: { el: "Γιάννης Α. Πολλάλης", en: "Yannis A. Pollalis" },
    rank: { el: "Καθηγητής", en: "Professor" },
    role: {
      el: "Ιδρυτής & Διευθυντής του ΠΜΣ",
      en: "Founder & Director of the Programme",
    },
    summary: {
      el: "Καθηγητής στο Τμήμα Οικονομικής Επιστήμης και ιδρυτής του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική», το οποίο διευθύνει από την ίδρυσή του το 2006. Διδάσκει Στρατηγική των Επιχειρήσεων και Μάρκετινγκ στην Ψηφιακή Εποχή.",
      en: "Professor in the Department of Economics and founder of the MSc in Economic & Business Strategy, which he has directed since its establishment in 2006. He teaches Business Strategy and Marketing in the Digital Era.",
    },
    fields: {
      el: [
        "Επιχειρησιακή στρατηγική",
        "Ψηφιακός μετασχηματισμός",
        "Στρατηγικό μάρκετινγκ",
        "Διοίκηση καινοτομίας",
      ],
      en: [
        "Business strategy",
        "Digital transformation",
        "Strategic marketing",
        "Innovation management",
      ],
    },
    email: "yannis@unipi.gr",
    phone: "+302104142353",
    core: true,
  },
  {
    id: "agiakloglou",
    slug: { el: "christos-agiakloglou", en: "christos-agiakloglou" },
    name: { el: "Χρήστος Αγιακλόγλου", en: "Christos Agiakloglou" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής στο Τμήμα Οικονομικής Επιστήμης του Πανεπιστημίου Πειραιώς. Διδάσκει Ποσοτικές Μέθοδοι για Οικονομικές Αποφάσεις, το μεθοδολογικό υπόβαθρο της διπλωματικής εργασίας.",
      en: "Professor in the Department of Economics, University of Piraeus. He teaches Quantitative Methods for Economic Decisions, the methodological foundation for the dissertation.",
    },
    fields: {
      el: ["Οικονομετρία", "Στατιστική ανάλυση", "Χρονοσειρές", "Πρόβλεψη"],
      en: ["Econometrics", "Statistical analysis", "Time series", "Forecasting"],
    },
    core: true,
  },
  {
    id: "vlamis",
    slug: { el: "prodromos-vlamis", en: "prodromos-vlamis" },
    name: { el: "Πρόδρομος Βλάμης", en: "Prodromos Vlamis" },
    rank: { el: "Αναπληρωτής Καθηγητής", en: "Associate Professor" },
    summary: {
      el: "Αναπληρωτής Καθηγητής στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Στρατηγικές Επενδύσεων στην Αγορά Ακινήτων, με έμφαση στις ΑΕΕΑΠ και τη διαχείριση χαρτοφυλακίου.",
      en: "Associate Professor in the Department of Economics. He teaches Real Estate Investment Strategies, with emphasis on REITs and portfolio management.",
    },
    fields: {
      el: [
        "Οικονομικά ακινήτων",
        "Επενδύσεις και χαρτοφυλάκια",
        "Χρηματοδότηση ακινήτων",
      ],
      en: ["Real estate economics", "Investment and portfolios", "Property finance"],
    },
    core: true,
  },
  {
    id: "emiris",
    slug: { el: "dimitrios-emiris", en: "dimitrios-emiris" },
    name: { el: "Δημήτριος Εμίρης", en: "Dimitrios Emiris" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής με αντικείμενο τη διαχείριση έργων και τις οικονομοτεχνικές μελέτες. Διδάσκει Οικονομοτεχνικές Μελέτες & Διαχείριση Έργων στο Β΄ εξάμηνο.",
      en: "Professor in project management and feasibility analysis. He teaches Feasibility Studies & Project Management in the second semester.",
    },
    fields: {
      el: [
        "Διαχείριση έργων",
        "Ανάλυση κόστους-οφέλους",
        "Διαχείριση κινδύνου έργων",
      ],
      en: ["Project management", "Cost-benefit analysis", "Project risk management"],
    },
    core: true,
  },
  {
    id: "kanas",
    slug: { el: "aggelos-kanas", en: "angelos-kanas" },
    name: { el: "Άγγελος Κανάς", en: "Angelos Kanas" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής χρηματοοικονομικής στο Τμήμα Οικονομικής Επιστήμης. Συνδιδάσκει Διαχείριση Χρηματοοικονομικών Πόρων και Χρηματοοικονομική Ανάλυση Επιχειρήσεων.",
      en: "Professor of finance in the Department of Economics. He co-teaches Management of Financial Resources and Corporate Financial Analysis.",
    },
    fields: {
      el: [
        "Εταιρική χρηματοοικονομική",
        "Αγορές κεφαλαίου",
        "Χρηματοοικονομική λογιστική",
      ],
      en: ["Corporate finance", "Capital markets", "Financial accounting"],
    },
    core: true,
  },
  {
    id: "karkalakos",
    slug: { el: "sotiris-karkalakos", en: "sotiris-karkalakos" },
    name: { el: "Σωτήρης Καρκαλάκος", en: "Sotiris Karkalakos" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Διαχείριση Αλλαγών & Μετασχηματισμός Επιχειρήσεων και Διοίκηση Αποθεμάτων & Προμηθειών.",
      en: "Professor in the Department of Economics. He teaches Change Management & Firm Transformation and Inventory & Supply Chain Management.",
    },
    fields: {
      el: [
        "Οργανωσιακή αλλαγή",
        "Εφοδιαστική αλυσίδα",
        "Επιχειρησιακή έρευνα",
      ],
      en: ["Organisational change", "Supply chain", "Operations research"],
    },
    core: true,
  },
  {
    id: "kottaridi",
    slug: { el: "konstantina-kottaridi", en: "constantina-kottaridi" },
    name: { el: "Κωνσταντίνα Κοτταρίδη", en: "Constantina Kottaridi" },
    rank: { el: "Αναπληρώτρια Καθηγήτρια", en: "Associate Professor" },
    summary: {
      el: "Αναπληρώτρια Καθηγήτρια στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Επιχειρηματικότητα, Καινοτομία & Βιώσιμη Ανάπτυξη.",
      en: "Associate Professor in the Department of Economics. She teaches Entrepreneurship, Innovation & Sustainable Development.",
    },
    fields: {
      el: [
        "Επιχειρηματικότητα",
        "Ξένες άμεσες επενδύσεις",
        "Καινοτομία",
        "Βιώσιμη ανάπτυξη",
      ],
      en: [
        "Entrepreneurship",
        "Foreign direct investment",
        "Innovation",
        "Sustainable development",
      ],
    },
    core: true,
  },
  {
    id: "koumartzis",
    slug: { el: "georgios-koumartzis", en: "georgios-koumartzis" },
    name: { el: "Γεώργιος Κουμαρτζής", en: "Georgios Koumartzis" },
    rank: { el: "Διδάσκων", en: "Instructor" },
    summary: {
      el: "Διδάσκων στο ΠΜΣ με αντικείμενο τη διοίκηση ανθρώπινου δυναμικού. Διδάσκει Διαχείριση & Ανάπτυξη Ανθρώπινων Πόρων.",
      en: "Instructor on the programme specialising in human resource management. He teaches Human Resource Management & Development.",
    },
    fields: {
      el: [
        "Διοίκηση ανθρώπινου δυναμικού",
        "Ανάπτυξη ταλέντου",
        "Εργασιακές σχέσεις",
      ],
      en: ["Human resource management", "Talent development", "Employee relations"],
    },
    core: true,
  },
  {
    id: "pantelidis",
    slug: { el: "pantelis-pantelidis", en: "pantelis-pantelidis" },
    name: { el: "Παντελής Παντελίδης", en: "Pantelis Pantelidis" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής στο Τμήμα Οικονομικής Επιστήμης του Πανεπιστημίου Πειραιώς και μέλος του διδακτικού προσωπικού του ΠΜΣ.",
      en: "Professor in the Department of Economics, University of Piraeus, and a member of the programme's teaching staff.",
    },
    fields: {
      el: ["Διεθνή οικονομικά", "Οικονομική ανάπτυξη"],
      en: ["International economics", "Economic development"],
    },
    core: true,
  },
  {
    id: "polemis",
    slug: { el: "michalis-polemis", en: "michael-polemis" },
    name: { el: "Μιχάλης Πολέμης", en: "Michael Polemis" },
    rank: { el: "Αναπληρωτής Καθηγητής", en: "Associate Professor" },
    summary: {
      el: "Αναπληρωτής Καθηγητής στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Οικονομικά της Πολιτικής Ανταγωνισμού και Τεχνικές Λήψης Αποφάσεων.",
      en: "Associate Professor in the Department of Economics. He teaches Economics of Competition Policy and Decision-Making Techniques.",
    },
    fields: {
      el: [
        "Πολιτική ανταγωνισμού",
        "Βιομηχανική οργάνωση",
        "Ρύθμιση αγορών",
        "Ενεργειακά οικονομικά",
      ],
      en: [
        "Competition policy",
        "Industrial organisation",
        "Market regulation",
        "Energy economics",
      ],
    },
    core: true,
  },
  {
    id: "raikou",
    slug: { el: "maria-raikou", en: "maria-raikou" },
    name: { el: "Μαρία Ράικου", en: "Maria Raikou" },
    rank: { el: "Καθηγήτρια", en: "Professor" },
    summary: {
      el: "Καθηγήτρια στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Σύγχρονη Επιχειρηματική Οικονομική, το εισαγωγικό μάθημα μικροοικονομικής ανάλυσης του προγράμματος.",
      en: "Professor in the Department of Economics. She teaches Modern Managerial Economics, the programme's foundational course in microeconomic analysis.",
    },
    fields: {
      el: [
        "Μικροοικονομική ανάλυση",
        "Επιχειρηματική οικονομική",
        "Οικονομικά της υγείας",
      ],
      en: ["Microeconomic analysis", "Managerial economics", "Health economics"],
    },
    core: true,
  },
  {
    id: "smyrlis",
    slug: { el: "ioannis-smyrlis", en: "ioannis-smyrlis" },
    name: { el: "Ιωάννης Σμυρλής", en: "Ioannis Smyrlis" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής και μέλος του διδακτικού προσωπικού του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική».",
      en: "Professor and member of the teaching staff of the MSc in Economic & Business Strategy.",
    },
    fields: {
      el: ["Ποσοτικές μέθοδοι", "Οικονομική ανάλυση"],
      en: ["Quantitative methods", "Economic analysis"],
    },
    core: true,
  },
  {
    id: "tselekounis",
    slug: { el: "markos-tselekounis", en: "markos-tselekounis" },
    name: { el: "Μάρκος Τσελεκούνης", en: "Markos Tselekounis" },
    rank: { el: "Επίκουρος Καθηγητής", en: "Assistant Professor" },
    summary: {
      el: "Επίκουρος Καθηγητής στο Τμήμα Οικονομικής Επιστήμης και μέλος του διδακτικού προσωπικού του ΠΜΣ.",
      en: "Assistant Professor in the Department of Economics and a member of the programme's teaching staff.",
    },
    fields: {
      el: [
        "Οικονομικά τηλεπικοινωνιών",
        "Ρύθμιση δικτύων",
        "Βιομηχανική οργάνωση",
      ],
      en: [
        "Telecommunications economics",
        "Network regulation",
        "Industrial organisation",
      ],
    },
    core: true,
  },
  {
    id: "psillaki",
    slug: { el: "maria-psillaki", en: "maria-psillaki" },
    name: { el: "Μαρία Ψυλλάκη", en: "Maria Psillaki" },
    rank: { el: "Καθηγήτρια", en: "Professor" },
    summary: {
      el: "Καθηγήτρια χρηματοοικονομικής στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Τραπεζική, FinTech & Πράσινη Χρηματοδότηση και συνδιδάσκει Διαχείριση Χρηματοοικονομικών Πόρων.",
      en: "Professor of finance in the Department of Economics. She teaches Banking, FinTech & Green Finance and co-teaches Management of Financial Resources.",
    },
    fields: {
      el: [
        "Τραπεζική",
        "Χρηματοδότηση επιχειρήσεων",
        "FinTech",
        "Πράσινη χρηματοδότηση",
      ],
      en: ["Banking", "Corporate financing", "FinTech", "Green finance"],
    },
    core: true,
  },
  {
    id: "chletsos",
    slug: { el: "michalis-chletsos", en: "michael-chletsos" },
    name: { el: "Μιχάλης Χλέτσος", en: "Michael Chletsos" },
    rank: { el: "Καθηγητής", en: "Professor" },
    summary: {
      el: "Καθηγητής στο Τμήμα Οικονομικής Επιστήμης. Διδάσκει Μακροοικονομικό Περιβάλλον & Επιχειρήσεις και Διεθνές Οικονομικό Περιβάλλον & Επιχειρήσεις.",
      en: "Professor in the Department of Economics. He teaches Macroeconomic Environment & Business and International Economic Environment & Business.",
    },
    fields: {
      el: [
        "Μακροοικονομική",
        "Οικονομικά της εργασίας",
        "Διεθνή οικονομικά",
        "Οικονομική πολιτική",
      ],
      en: [
        "Macroeconomics",
        "Labour economics",
        "International economics",
        "Economic policy",
      ],
    },
    core: true,
  },

  // ── Affiliated instructors (not on the department's faculty roster) ──
  {
    id: "chronopoulos",
    slug: { el: "p-chronopoulos", en: "p-chronopoulos" },
    name: { el: "Π. Χρονόπουλος", en: "P. Chronopoulos" },
    rank: { el: "Διδάσκων", en: "Instructor" },
    summary: {
      el: "Διδάσκων στο ΠΜΣ με αντικείμενο την ανάλυση λογιστικών καταστάσεων και την αποτίμηση επιχειρήσεων.",
      en: "Instructor on the programme specialising in financial statement analysis and business valuation.",
    },
    fields: {
      el: ["Ανάλυση λογιστικών καταστάσεων", "Αποτίμηση επιχειρήσεων"],
      en: ["Financial statement analysis", "Business valuation"],
    },
    core: false,
  },
  {
    id: "kokore",
    slug: { el: "i-kokore", en: "i-kokore" },
    name: { el: "Ι. Κοκορέ", en: "I. Kokore" },
    rank: { el: "Διδάσκουσα", en: "Instructor" },
    summary: {
      el: "Διδάσκουσα στο ΠΜΣ με αντικείμενο τη χρηματοοικονομική λογιστική και την εταιρική δημοσιοποίηση.",
      en: "Instructor on the programme specialising in financial accounting and corporate disclosure.",
    },
    fields: {
      el: ["Χρηματοοικονομική λογιστική", "Εταιρική δημοσιοποίηση"],
      en: ["Financial accounting", "Corporate disclosure"],
    },
    core: false,
  },
  {
    id: "agkyropoulos",
    slug: { el: "ch-agkyropoulos", en: "ch-agkyropoulos" },
    name: { el: "Χ. Αγκυρόπουλος", en: "Ch. Agkyropoulos" },
    rank: { el: "Διδάσκων", en: "Instructor" },
    summary: {
      el: "Διδάσκων στο ΠΜΣ με αντικείμενο την επιχειρηματική αναλυτική και την ανάλυση δεδομένων για τη λήψη αποφάσεων.",
      en: "Instructor on the programme specialising in business analytics and data analysis for decision-making.",
    },
    fields: {
      el: ["Επιχειρηματική αναλυτική", "Επιχειρηματική ευφυΐα", "Οπτικοποίηση δεδομένων"],
      en: ["Business analytics", "Business intelligence", "Data visualisation"],
    },
    core: false,
  },
];

// ─────────────────────────────── helpers ───────────────────────────────

export function facultyBySlug(slug: string): FacultyMember | undefined {
  return faculty.find(
    (person) => person.slug.el === slug || person.slug.en === slug,
  );
}

export function facultyById(id: string): FacultyMember | undefined {
  return faculty.find((person) => person.id === id);
}

export function coursesTaughtBy(id: string) {
  return courses.filter((course) => course.instructors.includes(id));
}

export const coreFaculty = faculty.filter((person) => person.core);
export const affiliatedFaculty = faculty.filter((person) => !person.core);
