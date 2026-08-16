import type { I18n } from "@/lib/i18n";

export interface Announcement {
  id: string;
  slug: I18n;
  /** ISO date, used for sorting, <time> and JSON-LD datePublished. */
  date: string;
  title: I18n;
  /** One-paragraph summary shown in listings and used as the meta description. */
  summary: I18n;
  /** Full body, one string per paragraph. */
  body: Record<"el" | "en", string[]>;
  category: "event" | "internship" | "admissions" | "academic";
  link?: { label: I18n; url: string };
}

export const announcementCategories: Record<Announcement["category"], I18n> = {
  event: { el: "Εκδήλωση", en: "Event" },
  internship: { el: "Πρακτική άσκηση", en: "Internship" },
  admissions: { el: "Εισαγωγή", en: "Admissions" },
  academic: { el: "Ακαδημαϊκά", en: "Academic" },
};

/**
 * Announcements, newest first.
 * To publish a new one, add an entry at the top of this array — nothing else changes.
 */
export const announcements: Announcement[] = [
  {
    id: "digital-era-cybersecurity",
    slug: {
      el: "stratigikes-psifiakis-epochis-kai-kyvernoasfaleia",
      en: "digital-era-strategies-and-cybersecurity",
    },
    date: "2024-05-16",
    category: "event",
    title: {
      el: "Digital Era Strategies and Cybersecurity",
      en: "Digital Era Strategies and Cybersecurity",
    },
    summary: {
      el: "Εκδήλωση του ΠΜΣ για τις στρατηγικές της ψηφιακής εποχής και την κυβερνοασφάλεια ως παράγοντα επιχειρηματικού κινδύνου.",
      en: "A programme event on digital era strategies and cybersecurity as a driver of business risk.",
    },
    body: {
      el: [
        "Το ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική» διοργάνωσε εκδήλωση με θέμα τις στρατηγικές της ψηφιακής εποχής και τη διαχείριση του κινδύνου κυβερνοασφάλειας.",
        "Η συζήτηση επικεντρώθηκε στο πώς ο ψηφιακός μετασχηματισμός μεταβάλλει το προφίλ κινδύνου ενός οργανισμού και ποιες στρατηγικές επιλογές απαιτούνται σε επίπεδο διοίκησης.",
      ],
      en: [
        "The MSc in Economic & Business Strategy hosted an event on digital era strategies and the management of cybersecurity risk.",
        "The discussion focused on how digital transformation changes an organisation's risk profile and what strategic choices this demands at management level.",
      ],
    },
  },
  {
    id: "startup-formation-workshop",
    slug: {
      el: "workshop-dimiourgia-startup-kai-stratigikes-apofaseis",
      en: "workshop-startup-formation-and-strategic-decision-making",
    },
    date: "2024-04-23",
    category: "event",
    title: {
      el: "Workshop: Startup Formation and Strategic Decision-Making",
      en: "Workshop: Startup Formation and Strategic Decision-Making",
    },
    summary: {
      el: "Εργαστήριο για τη δημιουργία νεοφυών επιχειρήσεων και τη λήψη στρατηγικών αποφάσεων στα πρώτα στάδια ανάπτυξης.",
      en: "A workshop on new venture creation and strategic decision-making in the early stages of growth.",
    },
    body: {
      el: [
        "Εργαστήριο αφιερωμένο στη διαδικασία δημιουργίας νεοφυούς επιχείρησης, από την αναγνώριση της ευκαιρίας έως τη διαμόρφωση του επιχειρηματικού μοντέλου.",
        "Οι συμμετέχοντες δούλεψαν σε ομάδες πάνω σε πραγματικά σενάρια στρατηγικών αποφάσεων που αντιμετωπίζει μια νεοφυής επιχείρηση στα πρώτα της βήματα.",
      ],
      en: [
        "A workshop devoted to the process of forming a startup, from opportunity recognition through to business model design.",
        "Participants worked in teams on real scenarios of the strategic decisions a startup faces in its earliest stages.",
      ],
    },
  },
  {
    id: "nbg-internship-extra",
    slug: {
      el: "dyo-epipleon-theseis-praktikis-ethniki-trapeza",
      en: "two-additional-internship-places-national-bank",
    },
    date: "2023-06-13",
    category: "internship",
    title: {
      el: "Δύο επιπλέον θέσεις πρακτικής άσκησης στην Εθνική Τράπεζα",
      en: "Two additional internship places at the National Bank of Greece",
    },
    summary: {
      el: "Η Εθνική Τράπεζα διέθεσε δύο επιπλέον θέσεις πρακτικής άσκησης για φοιτητές του ΠΜΣ.",
      en: "The National Bank of Greece has made two additional internship places available to programme students.",
    },
    body: {
      el: [
        "Στο πλαίσιο της συνεργασίας του ΠΜΣ με την Εθνική Τράπεζα, διατέθηκαν δύο επιπλέον θέσεις πρακτικής άσκησης για φοιτητές του προγράμματος.",
        "Οι ενδιαφερόμενοι μπορούν να απευθύνονται στον Υπεύθυνο Πρακτικής Άσκησης του Τμήματος.",
      ],
      en: [
        "As part of the programme's cooperation with the National Bank of Greece, two additional internship places were made available to students.",
        "Interested students should contact the Department's Internship Coordinator.",
      ],
    },
  },
  {
    id: "nbg-iwork",
    slug: {
      el: "programma-praktikis-askisis-ethnikis-trapezas-i-work",
      en: "national-bank-internship-programme-i-work",
    },
    date: "2023-06-13",
    category: "internship",
    title: {
      el: "Πρόγραμμα πρακτικής άσκησης της Εθνικής Τράπεζας i-work@nbg",
      en: "National Bank of Greece internship programme i-work@nbg",
    },
    summary: {
      el: "Ανακοίνωση για το πρόγραμμα πρακτικής άσκησης i-work@nbg της Εθνικής Τράπεζας, ανοικτό σε φοιτητές του ΠΜΣ.",
      en: "Announcement of the National Bank of Greece i-work@nbg internship programme, open to programme students.",
    },
    body: {
      el: [
        "Η Εθνική Τράπεζα ανακοίνωσε το πρόγραμμα πρακτικής άσκησης i-work@nbg, στο οποίο μπορούν να συμμετάσχουν φοιτητές του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική».",
        "Το πρόγραμμα προσφέρει δομημένη εμπειρία σε τραπεζικό περιβάλλον με καθοδήγηση από στελέχη του οργανισμού.",
      ],
      en: [
        "The National Bank of Greece announced its i-work@nbg internship programme, open to students of the MSc in Economic & Business Strategy.",
        "The programme offers structured experience in a banking environment with mentoring from the bank's own staff.",
      ],
    },
  },
  {
    id: "disciplined-entrepreneurship",
    slug: {
      el: "workshop-eisagogi-stin-peitharchimeni-epicheirimatikotita",
      en: "workshop-introduction-to-disciplined-entrepreneurship",
    },
    date: "2023-03-24",
    category: "event",
    title: {
      el: "Workshop: Εισαγωγή στην πειθαρχημένη επιχειρηματικότητα",
      en: "Workshop: Introduction to disciplined entrepreneurship",
    },
    summary: {
      el: "Εργαστήριο πάνω στη μεθοδολογία της πειθαρχημένης επιχειρηματικότητας και τη συστηματική δοκιμή επιχειρηματικών υποθέσεων.",
      en: "A workshop on the disciplined entrepreneurship methodology and the systematic testing of business assumptions.",
    },
    body: {
      el: [
        "Εργαστήριο με αντικείμενο τη μεθοδολογία της πειθαρχημένης επιχειρηματικότητας: πώς μια επιχειρηματική ιδέα μετατρέπεται σε σειρά ελέγξιμων υποθέσεων.",
        "Η προσέγγιση δίνει έμφαση στη συστηματική επικύρωση της αγοράς πριν από τη δέσμευση πόρων.",
      ],
      en: [
        "A workshop on the disciplined entrepreneurship methodology: how a business idea is converted into a series of testable assumptions.",
        "The approach emphasises systematic market validation before committing resources.",
      ],
    },
  },
  {
    id: "real-estate-workshop",
    slug: {
      el: "workshop-stratigikes-ependyseon-se-akinita",
      en: "workshop-real-estate-investment-strategies",
    },
    date: "2022-12-01",
    category: "event",
    title: {
      el: "Workshop on Real Estate Investment Strategies",
      en: "Workshop on Real Estate Investment Strategies",
    },
    summary: {
      el: "Εργαστήριο για τις επενδυτικές στρατηγικές στην αγορά ακινήτων, με έμφαση στην ελληνική αγορά.",
      en: "A workshop on real estate investment strategies, with emphasis on the Greek market.",
    },
    body: {
      el: [
        "Εργαστήριο αφιερωμένο στις επενδυτικές στρατηγικές στην αγορά ακινήτων, σε συνέχεια του ομώνυμου μαθήματος επιλογής του Γ΄ εξαμήνου.",
        "Συζητήθηκαν οι μέθοδοι αποτίμησης, ο ρόλος των ΑΕΕΑΠ και οι ιδιαιτερότητες της ελληνικής αγοράς ακινήτων.",
      ],
      en: [
        "A workshop devoted to real estate investment strategies, following on from the third-semester elective of the same name.",
        "Valuation methods, the role of REITs and the particularities of the Greek property market were discussed.",
      ],
    },
  },
  {
    id: "investor-education-2022",
    slug: {
      el: "programma-ependytikis-paideias-kai-katartisis-2022",
      en: "investment-education-and-training-programme-2022",
    },
    date: "2022-03-14",
    category: "academic",
    title: {
      el: "Πρόγραμμα Επενδυτικής Παιδείας & Κατάρτισης 2022",
      en: "Investment Education & Training Programme 2022",
    },
    summary: {
      el: "Ο Σύνδεσμος Επενδυτών & Διαδικτύου ανακοίνωσε την έναρξη του Προγράμματος Επενδυτικής Παιδείας & Κατάρτισης 2022.",
      en: "The Association of Investors & Internet announced the launch of its 2022 Investment Education & Training Programme.",
    },
    body: {
      el: [
        "Ο Σύνδεσμος Επενδυτών & Διαδικτύου ανακοίνωσε την έναρξη του «Προγράμματος Επενδυτικής Παιδείας & Κατάρτισης 2022».",
        "Το πρόγραμμα απευθύνεται σε φοιτητές και νέους επαγγελματίες που επιθυμούν να εμβαθύνουν στη λειτουργία των κεφαλαιαγορών.",
      ],
      en: [
        "The Association of Investors & Internet announced the launch of its 2022 Investment Education & Training Programme.",
        "The programme is aimed at students and early-career professionals seeking a deeper understanding of how capital markets operate.",
      ],
    },
  },
  {
    id: "ileads-webinars",
    slug: {
      el: "seira-webinars-ileads-lab",
      en: "ileads-lab-webinar-series",
    },
    date: "2021-12-10",
    category: "event",
    title: {
      el: "Σειρά webinars του iLeads LAB",
      en: "iLeads LAB webinar series",
    },
    summary: {
      el: "Σειρά διαδικτυακών σεμιναρίων από το iLeads LAB, το Κέντρο Έρευνας Στρατηγικής & Επιχειρηματικότητας του Πανεπιστημίου Πειραιώς.",
      en: "A series of webinars from iLeads LAB, the University of Piraeus Center for Research in Strategy & Entrepreneurship.",
    },
    body: {
      el: [
        "Το iLeads LAB — University of Piraeus Center for Research@Strategy & Entrepreneurship — διοργάνωσε σειρά διαδικτυακών σεμιναρίων ανοικτών στους φοιτητές του ΠΜΣ.",
        "Τα θέματα κάλυψαν τη στρατηγική, την επιχειρηματικότητα και την καινοτομία, με ομιλητές από τον ακαδημαϊκό και τον επιχειρηματικό χώρο.",
      ],
      en: [
        "iLeads LAB — the University of Piraeus Center for Research@Strategy & Entrepreneurship — ran a series of webinars open to programme students.",
        "Topics covered strategy, entrepreneurship and innovation, with speakers from both academia and industry.",
      ],
    },
  },
  {
    id: "graduation-welcome-2021",
    slug: {
      el: "ekdilosi-orkomosias-kai-kalosorismatos",
      en: "graduation-and-welcome-ceremony",
    },
    date: "2021-12-01",
    category: "event",
    title: {
      el: "Εκδήλωση ορκωμοσίας και καλωσορίσματος",
      en: "Graduation and welcome ceremony",
    },
    summary: {
      el: "Ολοκληρώθηκε με επιτυχία η υποδοχή των νέων φοιτητών και φοιτητριών του ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική».",
      en: "The welcome event for the new cohort of the MSc in Economic & Business Strategy was successfully held.",
    },
    body: {
      el: [
        "Με επιτυχία ολοκληρώθηκε η υποδοχή των νέων φοιτητών και φοιτητριών του Μεταπτυχιακού Προγράμματος Σπουδών «Οικονομική & Επιχειρησιακή Στρατηγική» του Πανεπιστημίου Πειραιώς.",
        "Στην ίδια εκδήλωση πραγματοποιήθηκε η ορκωμοσία των αποφοίτων του προηγούμενου κύκλου σπουδών.",
      ],
      en: [
        "The welcome event for the new cohort of the MSc in Economic & Business Strategy at the University of Piraeus was successfully held.",
        "The graduation ceremony for the previous cohort took place at the same event.",
      ],
    },
  },
  {
    id: "erasmus-loans",
    slug: {
      el: "dynatotites-chrimatodotisis-metaptychiakon-spoudon",
      en: "funding-options-for-postgraduate-study",
    },
    date: "2018-07-09",
    category: "admissions",
    title: {
      el: "Δυνατότητες χρηματοδότησης μεταπτυχιακών σπουδών",
      en: "Funding options for postgraduate study",
    },
    summary: {
      el: "Το πρόγραμμα Erasmus+ παρέχει δάνεια σε φοιτητές για μεταπτυχιακά προγράμματα επιπέδου Master's.",
      en: "The Erasmus+ programme provides student loans for master's level study.",
    },
    body: {
      el: [
        "Το πρόγραμμα Erasmus+ παρέχει δάνεια σε φοιτητές που παρακολουθούν μεταπτυχιακά προγράμματα επιπέδου Master's.",
        "Υποψήφιοι που εξετάζουν τρόπους χρηματοδότησης των σπουδών τους μπορούν επίσης να συμβουλευτούν τον οδηγό υποτροφιών του Υπουργείου Παιδείας και τα ιδρύματα Μποδοσάκη, Ωνάση, Λάτση και το ΙΚΥ.",
      ],
      en: [
        "The Erasmus+ programme provides loans to students enrolled on master's level programmes.",
        "Candidates considering how to fund their studies may also consult the Ministry of Education scholarship guide and the Bodossaki, Onassis and Latsis foundations, as well as the State Scholarships Foundation (IKY).",
      ],
    },
  },
];

export function announcementBySlug(slug: string): Announcement | undefined {
  return announcements.find(
    (item) => item.slug.el === slug || item.slug.en === slug,
  );
}

export const sortedAnnouncements = [...announcements].sort((a, b) =>
  b.date.localeCompare(a.date),
);
