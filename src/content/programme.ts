import type { I18n } from "@/lib/i18n";

// ─────────────────────────── Study trips ───────────────────────────

export interface Trip {
  year: number;
  season: I18n;
  place: I18n;
  detail: I18n;
  image?: string;
}

/** Chronological, most recent first. Source: the programme's activities gallery. */
export const trips: Trip[] = [
  {
    year: 2025,
    season: { el: "2025", en: "2025" },
    place: { el: "Silicon Valley", en: "Silicon Valley" },
    detail: {
      el: "Εκπαιδευτική εκδρομή στο επίκεντρο της παγκόσμιας τεχνολογικής βιομηχανίας.",
      en: "Study trip to the centre of the global technology industry.",
    },
    image: "campus-2.jpg",
  },
  {
    year: 2024,
    season: { el: "Δεκέμβριος 2024", en: "December 2024" },
    place: { el: "Νέα Υόρκη & Ουάσιγκτον", en: "New York City & Washington, DC" },
    detail: {
      el: "Επισκέψεις σε πανεπιστήμια, θεσμικούς φορείς και επιχειρήσεις των ΗΠΑ.",
      en: "Visits to universities, institutions and companies across the United States.",
    },
    image: "ny-washington-2024.jpg",
  },
  {
    year: 2022,
    season: { el: "Άνοιξη 2022", en: "Spring 2022" },
    place: { el: "ΗΠΑ — Νέα Υόρκη & Νέα Ιερσέη", en: "USA — New York & New Jersey" },
    detail: {
      el: "Stevens Institute of Technology, New York University, Drexel University και τα κεντρικά γραφεία της Datasite στη Νέα Υόρκη.",
      en: "Stevens Institute of Technology, New York University, Drexel University and Datasite's headquarters in New York City.",
    },
    image: "nyc-1.jpg",
  },
  {
    year: 2018,
    season: { el: "Χειμώνας 2018", en: "Winter 2018" },
    place: { el: "Vitra, Στρασβούργο & Χαϊδελβέργη", en: "Vitra, Strasbourg & Heidelberg" },
    detail: {
      el: "Επίσκεψη στο Vitra Campus και στα ευρωπαϊκά θεσμικά όργανα του Στρασβούργου.",
      en: "Visit to the Vitra Campus and the European institutions in Strasbourg.",
    },
  },
  {
    year: 2016,
    season: { el: "Άνοιξη 2016", en: "Spring 2016" },
    place: { el: "Škoda, Πράγα", en: "Škoda, Prague" },
    detail: {
      el: "Επίσκεψη στις εγκαταστάσεις παραγωγής της Škoda.",
      en: "Visit to Škoda's production facilities.",
    },
  },
  {
    year: 2014,
    season: { el: "Άνοιξη 2014", en: "Spring 2014" },
    place: { el: "Ευρωπαϊκή Επιτροπή, Βρυξέλλες", en: "European Commission, Brussels" },
    detail: {
      el: "Επίσκεψη στην Ευρωπαϊκή Επιτροπή και ενημέρωση για τη διαδικασία χάραξης πολιτικής.",
      en: "Visit to the European Commission and a briefing on the policy-making process.",
    },
  },
  {
    year: 2013,
    season: { el: "Άνοιξη 2013", en: "Spring 2013" },
    place: { el: "BMW, Μόναχο", en: "BMW, Munich" },
    detail: {
      el: "Επίσκεψη στα κεντρικά γραφεία και το εργοστάσιο της BMW.",
      en: "Visit to BMW's headquarters and manufacturing plant.",
    },
  },
  {
    year: 2013,
    season: { el: "Χειμώνας 2013", en: "Winter 2013" },
    place: { el: "Airbus, Τουλούζη", en: "Airbus, Toulouse" },
    detail: {
      el: "Επίσκεψη στις εγκαταστάσεις συναρμολόγησης της Airbus.",
      en: "Visit to Airbus's final assembly line.",
    },
  },
  {
    year: 2012,
    season: { el: "Άνοιξη 2012", en: "Spring 2012" },
    place: { el: "Mercedes-Benz, Στουτγκάρδη", en: "Mercedes-Benz, Stuttgart" },
    detail: {
      el: "Επίσκεψη στο εργοστάσιο της Mercedes-Benz.",
      en: "Visit to the Mercedes-Benz factory.",
    },
  },
];

// ─────────────────────────── Empowerment seminars ───────────────────────────

export interface Seminar {
  id: string;
  title: I18n;
  detail: I18n;
}

/** Held Friday 18:00–21:00 and Saturday 11:00–14:00, outside the taught timetable. */
export const seminars: Seminar[] = [
  {
    id: "digital-transformation",
    title: {
      el: "Εφαρμογές Ψηφιακού Μετασχηματισμού",
      en: "Digital Transformation Applications",
    },
    detail: {
      el: "Πρακτικά εργαλεία και μεθοδολογίες για τον ψηφιακό μετασχηματισμό οργανισμών.",
      en: "Practical tools and methodologies for the digital transformation of organisations.",
    },
  },
  {
    id: "career-soft-skills",
    title: {
      el: "Προσωπική Ανάπτυξη, Διαχείριση Καριέρας & Soft Skills",
      en: "Personal Development, Career Management & Soft Skills",
    },
    detail: {
      el: "Σχεδιασμός καριέρας, σύνταξη βιογραφικού, προετοιμασία συνέντευξης και επαγγελματική δικτύωση.",
      en: "Career planning, CV writing, interview preparation and professional networking.",
    },
  },
  {
    id: "creative-thinking",
    title: { el: "Creative Thinking", en: "Creative Thinking" },
    detail: {
      el: "Τεχνικές δημιουργικής σκέψης και δομημένης επίλυσης προβλημάτων.",
      en: "Techniques for creative thinking and structured problem-solving.",
    },
  },
  {
    id: "business-analytics-seminar",
    title: { el: "Business Analytics", en: "Business Analytics" },
    detail: {
      el: "Εργαστηριακή εξάσκηση σε εργαλεία ανάλυσης δεδομένων για επιχειρηματικές αποφάσεις.",
      en: "Hands-on practice with data analysis tools for business decisions.",
    },
  },
  {
    id: "web-digital-marketing",
    title: {
      el: "Web Design & Digital Marketing Tools",
      en: "Web Design & Digital Marketing Tools",
    },
    detail: {
      el: "Πρακτική εξοικείωση με εργαλεία σχεδιασμού ιστοσελίδων και ψηφιακού μάρκετινγκ.",
      en: "Practical familiarity with website design and digital marketing tooling.",
    },
  },
  {
    id: "ai-machine-learning",
    title: {
      el: "Τεχνητή Νοημοσύνη & Μηχανική Μάθηση",
      en: "Artificial Intelligence & Machine Learning",
    },
    detail: {
      el: "Εφαρμογές μεγάλων γλωσσικών μοντέλων και μηχανικής μάθησης στο επιχειρηματικό περιβάλλον.",
      en: "Applications of large language models and machine learning in a business setting.",
    },
  },
  {
    id: "communication-body-language",
    title: {
      el: "Επικοινωνία & Γλώσσα Σώματος",
      en: "Communication & Body Language",
    },
    detail: {
      el: "Παρουσιάσεις, πειθώ και μη λεκτική επικοινωνία σε επαγγελματικό περιβάλλον.",
      en: "Presentation, persuasion and non-verbal communication in a professional setting.",
    },
  },
  {
    id: "emotional-intelligence",
    title: {
      el: "Συναισθηματική Νοημοσύνη & Διαχείριση Δύσκολων Ανθρώπων",
      en: "Emotional Intelligence & Managing Difficult People",
    },
    detail: {
      el: "Αναγνώριση και διαχείριση συναισθημάτων, διαχείριση συγκρούσεων και δύσκολων διαπροσωπικών δυναμικών.",
      en: "Recognising and managing emotions, handling conflict and difficult interpersonal dynamics.",
    },
  },
];

// ─────────────────────────── Admissions ───────────────────────────

export interface AdmissionStep {
  title: I18n;
  detail: I18n;
}

export const admissionSteps: AdmissionStep[] = [
  {
    title: {
      el: "Έλεγχος προϋποθέσεων",
      en: "Check your eligibility",
    },
    detail: {
      el: "Το ΠΜΣ δέχεται πτυχιούχους ΑΕΙ και ΤΕΙ της ημεδαπής ή αναγνωρισμένων ομοταγών ιδρυμάτων της αλλοδαπής. Απαιτείται τεκμηριωμένη γνώση αγγλικής γλώσσας.",
      en: "The programme admits graduates of Greek higher education institutions or recognised equivalent institutions abroad. Documented knowledge of English is required.",
    },
  },
  {
    title: {
      el: "Συγκέντρωση δικαιολογητικών",
      en: "Assemble your documents",
    },
    detail: {
      el: "Αντίγραφο πτυχίου και αναλυτικής βαθμολογίας, βιογραφικό σημείωμα, δύο συστατικές επιστολές, πιστοποιητικά ξένων γλωσσών, φωτοτυπία ταυτότητας, φωτογραφία και επιστολή σκοπού.",
      en: "Degree certificate and transcript, CV, two letters of recommendation, language certificates, identity document, photograph and a statement of purpose.",
    },
  },
  {
    title: {
      el: "Υποβολή ηλεκτρονικής αίτησης",
      en: "Submit the online application",
    },
    detail: {
      el: "Η αίτηση υποβάλλεται ηλεκτρονικά. Τα δικαιολογητικά επισυνάπτονται ψηφιακά στην ίδια φόρμα.",
      en: "Applications are submitted online, with supporting documents attached digitally to the same form.",
    },
  },
  {
    title: {
      el: "Αξιολόγηση & συνέντευξη",
      en: "Assessment & interview",
    },
    detail: {
      el: "Η αξιολόγηση γίνεται από την Επιτροπή Επιλογής βάσει δημοσιευμένων και μοριοδοτούμενων κριτηρίων. Οι επικρατέστεροι υποψήφιοι καλούνται σε συνέντευξη.",
      en: "Applications are assessed by the Selection Committee against published, weighted criteria. Shortlisted candidates are invited to interview.",
    },
  },
  {
    title: {
      el: "Αποτελέσματα & εγγραφή",
      en: "Results & enrolment",
    },
    detail: {
      el: "Οι επιτυχόντες ενημερώνονται από τη Γραμματεία και εγγράφονται καταβάλλοντας την πρώτη από τις τέσσερις δόσεις των διδάκτρων.",
      en: "Successful applicants are notified by the Secretariat and enrol by paying the first of the four tuition instalments.",
    },
  },
];

/** Criteria the Selection Committee weighs, per the published evaluation procedure. */
export const admissionCriteria: I18n[] = [
  { el: "Βαθμός και συνάφεια του πρώτου πτυχίου", en: "Grade and relevance of the first degree" },
  { el: "Επίδοση σε συναφή προπτυχιακά μαθήματα", en: "Performance in related undergraduate courses" },
  { el: "Πιστοποιημένη γνώση αγγλικής γλώσσας", en: "Certified knowledge of English" },
  { el: "Επαγγελματική εμπειρία", en: "Professional experience" },
  { el: "Ερευνητική ή συγγραφική δραστηριότητα", en: "Research or publication activity" },
  { el: "Συστατικές επιστολές", en: "Letters of recommendation" },
  { el: "Προσωπική συνέντευξη", en: "Personal interview" },
];

// ─────────────────────────── Why this programme ───────────────────────────

export interface Pillar {
  id: string;
  title: I18n;
  detail: I18n;
}

export const pillars: Pillar[] = [
  {
    id: "hybrid",
    title: { el: "Υβριδική διδασκαλία", en: "Hybrid teaching" },
    detail: {
      el: "Ο συνδυασμός εξ αποστάσεως και δια ζώσης διδασκαλίας επιτρέπει σε εργαζόμενους επαγγελματίες να παρακολουθήσουν χωρίς να διακόψουν την καριέρα τους.",
      en: "Combining remote and in-person teaching lets working professionals attend without interrupting their careers.",
    },
  },
  {
    id: "market",
    title: { el: "Σύνδεση με την αγορά", en: "Connected to the market" },
    detail: {
      el: "Πάνω από 40 συνεργαζόμενοι εργοδότες προσφέρουν θέσεις πρακτικής άσκησης, από τις Big Four και τις συστημικές τράπεζες μέχρι τη ναυτιλία και τον δημόσιο τομέα.",
      en: "More than 40 partner employers host internships, from the Big Four and the systemic banks to shipping and the public sector.",
    },
  },
  {
    id: "cfa",
    title: { el: "Αναγνώριση CFA", en: "CFA recognition" },
    detail: {
      el: "Η συμμετοχή στο CFA Institute University Affiliation Program πιστοποιεί ότι η ύλη είναι ευθυγραμμισμένη με τις πρακτικές της αγοράς και δίνει πρόσβαση σε υποτροφίες εξέταστρων.",
      en: "Participation in the CFA Institute University Affiliation Program certifies that the curriculum is aligned with market practice and gives access to exam fee scholarships.",
    },
  },
  {
    id: "international",
    title: { el: "Διεθνής εμπειρία", en: "International exposure" },
    detail: {
      el: "Ετήσιες εκπαιδευτικές εκδρομές σε κορυφαία πανεπιστήμια και επιχειρήσεις — από τη Silicon Valley και τη Νέα Υόρκη μέχρι τις Βρυξέλλες και το Μόναχο.",
      en: "Annual study trips to leading universities and companies — from Silicon Valley and New York to Brussels and Munich.",
    },
  },
  {
    id: "track-record",
    title: { el: "Ιστορικό από το 2006", en: "A record since 2006" },
    detail: {
      el: "Δεκαεννέα συνεχείς κύκλοι σπουδών και μια κοινότητα αποφοίτων που στελεχώνει επιχειρήσεις σε όλους τους κλάδους της ελληνικής οικονομίας.",
      en: "Nineteen consecutive cohorts and an alumni community staffing companies across every sector of the Greek economy.",
    },
  },
  {
    id: "scholarships",
    title: { el: "Υποτροφίες αριστείας", en: "Merit scholarships" },
    detail: {
      el: "Τρεις υποτροφίες των 1.000 € κάθε εξάμηνο στους φοιτητές με την καλύτερη επίδοση, επιπλέον των χορηγικών υποτροφιών του τρίτου εξαμήνου.",
      en: "Three scholarships of €1,000 each semester for the highest-performing students, on top of the sponsored awards in the third semester.",
    },
  },
];
