import type { I18n, Locale } from "@/lib/i18n";

export type Semester = 1 | 2 | 3 | 4;
export type CourseKind = "core" | "elective" | "dissertation";

export interface Course {
  id: string;
  /** Localised leaf slug — this is where the keyword value actually sits. */
  slug: I18n;
  title: I18n;
  semester: Semester;
  kind: CourseKind;
  ects: number;
  /** Faculty ids, see content/faculty.ts */
  instructors: string[];
  syllabusUrl?: string;
  /** Answer-first, self-contained, quotable. Feeds meta description + JSON-LD. */
  summary: I18n;
  /** Longer positioning paragraph shown under the H1. */
  body: I18n;
  topics: Record<Locale, string[]>;
  outcomes: Record<Locale, string[]>;
}

export const courses: Course[] = [
  // ─────────────────────────── Semester 1 · core ───────────────────────────
  {
    id: "managerial-economics",
    slug: {
      el: "sygchroni-epicheirimatiki-oikonomiki",
      en: "modern-managerial-economics",
    },
    title: {
      el: "Σύγχρονη Επιχειρηματική Οικονομική",
      en: "Modern Managerial Economics",
    },
    semester: 1,
    kind: "core",
    ects: 7.5,
    instructors: ["raikou"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Raikou_Μ_MScStrategy_Micro_Coursedescr_Oct2024_g.pdf",
    summary: {
      el: "Η Σύγχρονη Επιχειρηματική Οικονομική εφαρμόζει τα εργαλεία της μικροοικονομικής θεωρίας στη λήψη επιχειρηματικών και διοικητικών αποφάσεων: κοστολόγηση, τιμολόγηση, δομή αγοράς και συμπεριφορά ανταγωνιστών.",
      en: "Modern Managerial Economics applies the tools of microeconomic theory to business and managerial decisions: costing, pricing, market structure and competitor behaviour.",
    },
    body: {
      el: "Το μάθημα είναι η αναλυτική βάση όλου του προγράμματος. Ξεκινά από τη συμπεριφορά του καταναλωτή και τη θεωρία της παραγωγής και καταλήγει στο ερώτημα που απασχολεί κάθε στέλεχος: πώς τιμολογείς όταν ο ανταγωνιστής σου αντιδρά. Οι φοιτητές μαθαίνουν να διαβάζουν μια αγορά ως δομή κινήτρων και όχι ως σύνολο αριθμών, χρησιμοποιώντας μελέτες περιπτώσεων από την ελληνική και τη διεθνή αγορά.",
      en: "This course is the analytical foundation of the whole programme. It starts from consumer behaviour and production theory and arrives at the question every executive faces: how do you price when your competitor reacts. Students learn to read a market as a structure of incentives rather than a set of numbers, working through case studies from the Greek and international markets.",
    },
    topics: {
      el: [
        "Ζήτηση, ελαστικότητες και εκτίμηση ζήτησης",
        "Θεωρία παραγωγής και συναρτήσεις κόστους",
        "Δομές αγοράς: τέλειος ανταγωνισμός έως μονοπώλιο",
        "Ολιγοπώλιο και στοιχεία θεωρίας παιγνίων",
        "Στρατηγικές τιμολόγησης και διάκριση τιμών",
        "Ασυμμετρία πληροφόρησης και κόστη συναλλαγών",
      ],
      en: [
        "Demand, elasticities and demand estimation",
        "Production theory and cost functions",
        "Market structures: perfect competition to monopoly",
        "Oligopoly and elements of game theory",
        "Pricing strategy and price discrimination",
        "Information asymmetry and transaction costs",
      ],
    },
    outcomes: {
      el: [
        "Να ποσοτικοποιείτε τη ζήτηση και να εκτιμάτε την επίδραση μιας μεταβολής τιμής στα έσοδα",
        "Να επιλέγετε τιμολογιακή πολιτική με βάση τη δομή της αγοράς",
        "Να προβλέπετε την αντίδραση ανταγωνιστή σε στρατηγική κίνηση",
      ],
      en: [
        "Quantify demand and estimate the revenue impact of a price change",
        "Select a pricing policy grounded in market structure",
        "Anticipate a competitor's response to a strategic move",
      ],
    },
  },
  {
    id: "macroeconomic-environment",
    slug: {
      el: "makrooikonomiko-perivallon-kai-epicheiriseis",
      en: "macroeconomic-environment-and-business",
    },
    title: {
      el: "Μακροοικονομικό Περιβάλλον & Επιχειρήσεις",
      en: "Macroeconomic Environment & Business",
    },
    semester: 1,
    kind: "core",
    ects: 7.5,
    instructors: ["chletsos"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Macroeconomic-environment-and-businesses_CΗLETSOS-1.pdf",
    summary: {
      el: "Το μάθημα εξετάζει πώς το μακροοικονομικό πλαίσιο — πληθωρισμός, επιτόκια, δημοσιονομική και νομισματική πολιτική — μεταφράζεται σε συγκεκριμένους περιορισμούς και ευκαιρίες για τις επιχειρηματικές αποφάσεις.",
      en: "This course examines how the macroeconomic framework — inflation, interest rates, fiscal and monetary policy — translates into concrete constraints and opportunities for business decisions.",
    },
    body: {
      el: "Καμία στρατηγική δεν σχεδιάζεται σε κενό. Το μάθημα δίνει στους φοιτητές τον μηχανισμό που συνδέει μια απόφαση της Ευρωπαϊκής Κεντρικής Τράπεζας με το κόστος κεφαλαίου μιας ελληνικής επιχείρησης, και μια δημοσιονομική παρέμβαση με τη ζήτηση του κλάδου τους. Η έμφαση είναι στην ερμηνεία δεικτών σε πραγματικό χρόνο και όχι στην αφηρημένη μοντελοποίηση.",
      en: "No strategy is designed in a vacuum. The course gives students the mechanism connecting a European Central Bank decision to the cost of capital of a Greek firm, and a fiscal intervention to demand in their sector. The emphasis is on reading indicators in real time rather than abstract modelling.",
    },
    topics: {
      el: [
        "Εθνικοί λογαριασμοί και μέτρηση της οικονομικής δραστηριότητας",
        "Πληθωρισμός, ανεργία και η βραχυχρόνια ανταλλαγή τους",
        "Νομισματική πολιτική και ο ρόλος της ΕΚΤ",
        "Δημοσιονομική πολιτική, χρέος και βιωσιμότητα",
        "Οικονομικοί κύκλοι και επιχειρηματικός σχεδιασμός",
        "Ελληνική οικονομία: διαρθρωτικά χαρακτηριστικά",
      ],
      en: [
        "National accounts and measuring economic activity",
        "Inflation, unemployment and their short-run trade-off",
        "Monetary policy and the role of the ECB",
        "Fiscal policy, debt and sustainability",
        "Business cycles and corporate planning",
        "The Greek economy: structural characteristics",
      ],
    },
    outcomes: {
      el: [
        "Να ερμηνεύετε μακροοικονομικούς δείκτες και να εντοπίζετε τη φάση του κύκλου",
        "Να ενσωματώνετε μακροοικονομικά σενάρια στον επιχειρηματικό σχεδιασμό",
        "Να αξιολογείτε την επίδραση μιας πολιτικής απόφασης στον κλάδο σας",
      ],
      en: [
        "Interpret macroeconomic indicators and identify the phase of the cycle",
        "Build macroeconomic scenarios into corporate planning",
        "Assess the impact of a policy decision on your sector",
      ],
    },
  },
  {
    id: "financial-resources",
    slug: {
      el: "diacheirisi-chrimatooikonomikon-poron",
      en: "management-of-financial-resources",
    },
    title: {
      el: "Διαχείριση Χρηματοοικονομικών Πόρων",
      en: "Management of Financial Resources",
    },
    semester: 1,
    kind: "core",
    ects: 7.5,
    instructors: ["kanas", "psillaki"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Management-of-Financial-Resources-2024.doc",
    summary: {
      el: "Το μάθημα καλύπτει τις αρχές της εταιρικής χρηματοοικονομικής: αποτίμηση περιουσιακών στοιχείων, κόστος κεφαλαίου, κεφαλαιακή διάρθρωση και αξιολόγηση επενδύσεων στις αγορές κεφαλαίου.",
      en: "This course covers the principles of corporate finance: asset valuation, cost of capital, capital structure and investment appraisal in capital markets.",
    },
    body: {
      el: "Από τη χρονική αξία του χρήματος μέχρι το υπόδειγμα αποτίμησης κεφαλαιακών στοιχείων, το μάθημα χτίζει τη γλώσσα με την οποία μια επιχείρηση μιλά στους χρηματοδότες της. Οι φοιτητές δουλεύουν με πραγματικές καταστάσεις εισηγμένων εταιρειών και καταλήγουν να υπολογίζουν κόστος κεφαλαίου και να τεκμηριώνουν μια επενδυτική εισήγηση.",
      en: "From the time value of money to the capital asset pricing model, the course builds the language a company uses to speak to its financiers. Students work with the real statements of listed companies and end up computing a cost of capital and defending an investment recommendation.",
    },
    topics: {
      el: [
        "Χρονική αξία χρήματος και προεξόφληση ταμειακών ροών",
        "Αποτίμηση ομολόγων και μετοχών",
        "Κίνδυνος, απόδοση και θεωρία χαρτοφυλακίου",
        "Υπόδειγμα CAPM και κόστος κεφαλαίου",
        "Κεφαλαιακή διάρθρωση και μερισματική πολιτική",
        "Κριτήρια αξιολόγησης επενδύσεων (NPV, IRR, payback)",
      ],
      en: [
        "Time value of money and discounted cash flow",
        "Bond and equity valuation",
        "Risk, return and portfolio theory",
        "The CAPM and the cost of capital",
        "Capital structure and dividend policy",
        "Investment appraisal criteria (NPV, IRR, payback)",
      ],
    },
    outcomes: {
      el: [
        "Να αποτιμάτε ένα περιουσιακό στοιχείο με προεξόφληση ταμειακών ροών",
        "Να υπολογίζετε το μεσοσταθμικό κόστος κεφαλαίου μιας επιχείρησης",
        "Να ιεραρχείτε εναλλακτικές επενδύσεις με συνεπή κριτήρια",
      ],
      en: [
        "Value an asset using discounted cash flows",
        "Compute a firm's weighted average cost of capital",
        "Rank alternative investments against consistent criteria",
      ],
    },
  },
  {
    id: "digital-marketing",
    slug: {
      el: "marketing-stin-psifiaki-epochi",
      en: "marketing-in-the-digital-era",
    },
    title: {
      el: "Αρχές & Πρακτικές του Μάρκετινγκ στην Ψηφιακή Εποχή",
      en: "Principles & Practices of Marketing in the Digital Era",
    },
    semester: 1,
    kind: "core",
    ects: 7.5,
    instructors: ["pollalis"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Pollalis@MKT-in-DIGITAL-ERA-syllabus-2023.pdf",
    summary: {
      el: "Το μάθημα εξετάζει τι αλλάζει στο μάρκετινγκ όταν το κανάλι γίνεται ψηφιακό: τμηματοποίηση με δεδομένα, στρατηγική ηλεκτρονικού εμπορίου, μέτρηση απόδοσης και διαχείριση της εμπειρίας πελάτη.",
      en: "This course examines what changes in marketing when the channel becomes digital: data-driven segmentation, e-commerce strategy, performance measurement and customer experience management.",
    },
    body: {
      el: "Το ψηφιακό μάρκετινγκ δεν είναι το κλασικό μάρκετινγκ σε άλλη οθόνη. Το μάθημα δείχνει πού σπάει η αναλογία: όταν κάθε επαφή μετριέται, η τμηματοποίηση γίνεται συνεχής, η τιμολόγηση δυναμική και η φήμη ρευστή. Οι φοιτητές σχεδιάζουν πλήρη ψηφιακή στρατηγική για μια πραγματική επιχείρηση, από την πρόταση αξίας μέχρι το πλάνο μέτρησης.",
      en: "Digital marketing is not classical marketing on a different screen. The course shows where the analogy breaks: once every touch is measured, segmentation becomes continuous, pricing dynamic and reputation fluid. Students design a full digital strategy for a real business, from value proposition to measurement plan.",
    },
    topics: {
      el: [
        "Πρόταση αξίας, τμηματοποίηση και τοποθέτηση",
        "Στρατηγική ηλεκτρονικού εμπορίου και κανάλια διανομής",
        "Συμπεριφορά καταναλωτή και customer journey",
        "Περιεχόμενο, SEO και απόδοση διαφημιστικής δαπάνης",
        "Ανάλυση δεδομένων μάρκετινγκ και βασικοί δείκτες",
        "Διαχείριση μάρκας και φήμης στα κοινωνικά δίκτυα",
      ],
      en: [
        "Value proposition, segmentation and positioning",
        "E-commerce strategy and distribution channels",
        "Consumer behaviour and the customer journey",
        "Content, SEO and return on ad spend",
        "Marketing analytics and core metrics",
        "Brand and reputation management on social platforms",
      ],
    },
    outcomes: {
      el: [
        "Να χτίζετε ολοκληρωμένη ψηφιακή στρατηγική μάρκετινγκ με μετρήσιμους στόχους",
        "Να επιλέγετε κανάλια με βάση το κόστος απόκτησης και την αξία πελάτη",
        "Να αξιολογείτε καμπάνιες με δεδομένα και όχι με εντυπώσεις",
      ],
      en: [
        "Build an integrated digital marketing strategy with measurable goals",
        "Select channels based on acquisition cost and customer lifetime value",
        "Evaluate campaigns with data rather than impressions",
      ],
    },
  },

  // ─────────────────────────── Semester 2 · core ───────────────────────────
  {
    id: "project-management",
    slug: {
      el: "oikonomotechnikes-meletes-kai-diacheirisi-ergon",
      en: "feasibility-studies-and-project-management",
    },
    title: {
      el: "Οικονομοτεχνικές Μελέτες & Διαχείριση Έργων",
      en: "Feasibility Studies & Project Management",
    },
    semester: 2,
    kind: "core",
    ects: 7.5,
    instructors: ["emiris"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2022/03/EBS@Syllabus_Project-Management-2022.pdf",
    summary: {
      el: "Το μάθημα συνδυάζει την ανάλυση κόστους-οφέλους με τη μεθοδολογία διαχείρισης έργων, ώστε μια επενδυτική ιδέα να τεκμηριώνεται οικονομικά και να υλοποιείται μέσα σε χρόνο και προϋπολογισμό.",
      en: "The course combines cost-benefit analysis with project management methodology, so that an investment idea is both economically justified and delivered on time and on budget.",
    },
    body: {
      el: "Δύο ερωτήματα, ένα μάθημα: αξίζει να γίνει το έργο, και πώς γίνεται. Στο πρώτο μισό οι φοιτητές μαθαίνουν να συντάσσουν οικονομοτεχνική μελέτη με ανάλυση κόστους-οφέλους και ανάλυση ευαισθησίας. Στο δεύτερο, να δομούν χρονοδιάγραμμα, κρίσιμη διαδρομή, προϋπολογισμό και μητρώο κινδύνων κατά τα διεθνή πρότυπα.",
      en: "Two questions, one course: is the project worth doing, and how does it get done. In the first half students learn to produce a feasibility study with cost-benefit and sensitivity analysis. In the second, to build a schedule, critical path, budget and risk register to international standards.",
    },
    topics: {
      el: [
        "Ανάλυση κόστους-οφέλους και κοινωνική απόδοση επένδυσης",
        "Ανάλυση ευαισθησίας και σεναρίων",
        "Δομή ανάλυσης εργασιών και χρονοπρογραμματισμός",
        "Μέθοδος κρίσιμης διαδρομής και διαχείριση πόρων",
        "Προϋπολογισμός έργου και μέθοδος δεδουλευμένης αξίας",
        "Αναγνώριση, αποτίμηση και αντιμετώπιση κινδύνων",
      ],
      en: [
        "Cost-benefit analysis and social return on investment",
        "Sensitivity and scenario analysis",
        "Work breakdown structure and scheduling",
        "Critical path method and resource management",
        "Project budgeting and earned value management",
        "Risk identification, assessment and response",
      ],
    },
    outcomes: {
      el: [
        "Να συντάσσετε οικονομοτεχνική μελέτη που αντέχει σε εξωτερικό έλεγχο",
        "Να σχεδιάζετε χρονοδιάγραμμα και προϋπολογισμό έργου",
        "Να παρακολουθείτε την πρόοδο με αντικειμενικούς δείκτες",
      ],
      en: [
        "Produce a feasibility study that withstands external scrutiny",
        "Design a project schedule and budget",
        "Track progress against objective performance indicators",
      ],
    },
  },
  {
    id: "business-strategy",
    slug: {
      el: "stratigiki-ton-epicheiriseon",
      en: "business-strategy",
    },
    title: {
      el: "Στρατηγική των Επιχειρήσεων",
      en: "Business Strategy",
    },
    semester: 2,
    kind: "core",
    ects: 7.5,
    instructors: ["pollalis"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2023/07/Pollalis-STR_MGT-syllabus-EBS-2022.pdf",
    summary: {
      el: "Το κεντρικό μάθημα του προγράμματος: ανάλυση κλάδου, πηγές διατηρήσιμου ανταγωνιστικού πλεονεκτήματος, στρατηγικές επιλογές και υλοποίηση, με χρήση επιχειρηματικής προσομοίωσης.",
      en: "The programme's flagship course: industry analysis, sources of sustainable competitive advantage, strategic choice and execution, taught through a business simulation.",
    },
    body: {
      el: "Εδώ συγκλίνει το πρόγραμμα. Οι φοιτητές αναλύουν κλάδους, εντοπίζουν από πού πραγματικά προέρχεται ένα πλεονέκτημα και γιατί οι περισσότερες στρατηγικές αποτυγχάνουν στην υλοποίηση. Το μάθημα κορυφώνεται με επιχειρηματική προσομοίωση, όπου ομάδες διοικούν ανταγωνιστικές εταιρείες για πολλαπλές περιόδους και ζουν τις συνέπειες των αποφάσεών τους.",
      en: "This is where the programme converges. Students analyse industries, identify where an advantage genuinely comes from, and confront why most strategies fail at execution. The course culminates in a business simulation in which teams run competing companies over multiple periods and live with the consequences of their decisions.",
    },
    topics: {
      el: [
        "Ανάλυση εξωτερικού περιβάλλοντος και δομής κλάδου",
        "Πόροι, ικανότητες και διατηρήσιμο πλεονέκτημα",
        "Γενικές στρατηγικές και στρατηγικές τοποθέτησης",
        "Εταιρική στρατηγική, διαφοροποίηση και κάθετη ολοκλήρωση",
        "Επιχειρηματικά μοντέλα και ψηφιακός μετασχηματισμός",
        "Υλοποίηση στρατηγικής και οργανωσιακή ευθυγράμμιση",
      ],
      en: [
        "External environment and industry structure analysis",
        "Resources, capabilities and sustainable advantage",
        "Generic strategies and strategic positioning",
        "Corporate strategy, diversification and vertical integration",
        "Business models and digital transformation",
        "Strategy execution and organisational alignment",
      ],
    },
    outcomes: {
      el: [
        "Να αναλύετε έναν κλάδο και να εντοπίζετε πού συγκεντρώνεται η κερδοφορία",
        "Να διατυπώνετε στρατηγική με σαφείς επιλογές και παραιτήσεις",
        "Να μεταφράζετε τη στρατηγική σε οργανωσιακές αποφάσεις",
      ],
      en: [
        "Analyse an industry and locate where profit actually accumulates",
        "Formulate a strategy with explicit choices and trade-offs",
        "Translate strategy into organisational decisions",
      ],
    },
  },

  // ───────────────────────── Semester 2 · electives ─────────────────────────
  {
    id: "financial-statements",
    slug: {
      el: "analysi-logistikon-katastaseon-kai-apotimisi",
      en: "financial-statement-analysis-and-valuation",
    },
    title: {
      el: "Ανάλυση Λογιστικών Καταστάσεων & Αποτίμηση Επιχειρήσεων",
      en: "Financial Statement Analysis & Business Valuation",
    },
    semester: 2,
    kind: "elective",
    ects: 7.5,
    instructors: ["chronopoulos"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2025/01/Msc_syllabus_Ανάλυση-Λογιστικών-Καταστάσεων-Αποτίμηση-Επιχειρήσεων.pdf",
    summary: {
      el: "Το μάθημα διδάσκει την ανάγνωση λογιστικών καταστάσεων ως εργαλείο διάγνωσης και τις βασικές μεθόδους αποτίμησης επιχειρήσεων: προεξοφλημένες ταμειακές ροές, συγκρίσιμοι πολλαπλασιαστές και αποτίμηση περιουσιακών στοιχείων.",
      en: "The course teaches financial statements as a diagnostic instrument, alongside the core valuation methods: discounted cash flow, comparable multiples and asset-based valuation.",
    },
    body: {
      el: "Μια λογιστική κατάσταση είναι αφήγηση με αριθμούς — και όπως κάθε αφήγηση, επιδέχεται κριτική ανάγνωση. Οι φοιτητές μαθαίνουν να εντοπίζουν ποιότητα κερδών, επιθετικές λογιστικές πολιτικές και προειδοποιητικά σήματα, και στη συνέχεια να χτίζουν υπόδειγμα αποτίμησης που καταλήγει σε τεκμηριωμένο εύρος αξίας.",
      en: "A set of accounts is a narrative told in numbers — and like any narrative it rewards critical reading. Students learn to assess earnings quality, spot aggressive accounting policies and read warning signals, then build a valuation model that ends in a defensible value range.",
    },
    topics: {
      el: [
        "Δομή και ανάγνωση των τριών βασικών καταστάσεων",
        "Αριθμοδείκτες ρευστότητας, δραστηριότητας και αποδοτικότητας",
        "Ποιότητα κερδών και εντοπισμός λογιστικών χειρισμών",
        "Αποτίμηση με προεξοφλημένες ταμειακές ροές",
        "Συγκριτική αποτίμηση με πολλαπλασιαστές",
        "Αποτίμηση σε εξαγορές και συγχωνεύσεις",
      ],
      en: [
        "Structure and reading of the three primary statements",
        "Liquidity, activity and profitability ratios",
        "Earnings quality and detecting accounting manipulation",
        "Discounted cash flow valuation",
        "Relative valuation using multiples",
        "Valuation in mergers and acquisitions",
      ],
    },
    outcomes: {
      el: [
        "Να διαγιγνώσκετε τη χρηματοοικονομική υγεία μιας επιχείρησης από τις καταστάσεις της",
        "Να χτίζετε υπόδειγμα αποτίμησης με ρητές παραδοχές",
        "Να υπερασπίζεστε ένα εύρος αξίας απέναντι σε αντίπαλη ανάλυση",
      ],
      en: [
        "Diagnose a company's financial health from its statements",
        "Build a valuation model with explicit assumptions",
        "Defend a value range against an opposing analysis",
      ],
    },
  },
  {
    id: "decision-techniques",
    slug: {
      el: "technikes-lipsis-apofaseon",
      en: "business-decision-making-techniques",
    },
    title: {
      el: "Τεχνικές Λήψης Αποφάσεων στο Επιχειρηματικό Περιβάλλον",
      en: "Decision-Making Techniques in Business",
    },
    semester: 2,
    kind: "elective",
    ects: 7.5,
    instructors: ["polemis"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2025/01/Syllabus-Τεχνικές-Λήψης-Αποφάσεων-στο-Επιχειρηματικό-Περιβάλλον.pdf",
    summary: {
      el: "Το μάθημα εφαρμόζει την οικονομική θεωρία και τα υποδείγματα απόφασης σε στρατηγικά επιχειρηματικά διλήμματα υπό αβεβαιότητα, συμπεριλαμβανομένων δέντρων απόφασης και θεωρίας παιγνίων.",
      en: "The course applies economic theory and decision models to strategic business dilemmas under uncertainty, including decision trees and game theory.",
    },
    body: {
      el: "Οι σημαντικές αποφάσεις λαμβάνονται με ελλιπή πληροφόρηση και ενώ κάποιος άλλος αποφασίζει ταυτόχρονα. Το μάθημα δίνει δομή σε αυτή τη συνθήκη: πώς αποτιμάται μια επιλογή υπό αβεβαιότητα, πότε αξίζει να αγοράσεις πληροφορία, και πώς αλλάζει το πρόβλημα όταν ο αντίπαλός σου σκέφτεται στρατηγικά.",
      en: "The decisions that matter are made with incomplete information while somebody else is deciding at the same time. The course brings structure to that condition: how to value a choice under uncertainty, when information is worth buying, and how the problem changes once your opponent is also thinking strategically.",
    },
    topics: {
      el: [
        "Απόφαση υπό αβεβαιότητα και αναμενόμενη χρησιμότητα",
        "Δέντρα απόφασης και αξία της πληροφορίας",
        "Θεωρία παιγνίων: ισορροπία και στρατηγική αλληλεπίδραση",
        "Πολυκριτηριακή ανάλυση αποφάσεων",
        "Συμπεριφορικές προκαταλήψεις στη λήψη αποφάσεων",
        "Ανάλυση πραγματικών δικαιωμάτων προαίρεσης",
      ],
      en: [
        "Decision under uncertainty and expected utility",
        "Decision trees and the value of information",
        "Game theory: equilibrium and strategic interaction",
        "Multi-criteria decision analysis",
        "Behavioural biases in decision-making",
        "Real options analysis",
      ],
    },
    outcomes: {
      el: [
        "Να δομείτε ένα πολύπλοκο δίλημμα σε αναλυτικά διαχειρίσιμη μορφή",
        "Να αποτιμάτε επιλογές υπό αβεβαιότητα και να ποσοτικοποιείτε την αξία πληροφορίας",
        "Να αναγνωρίζετε στρατηγική αλληλεπίδραση και να απαντάτε σε αυτήν",
      ],
      en: [
        "Structure a complex dilemma into analytically tractable form",
        "Value options under uncertainty and quantify the value of information",
        "Recognise strategic interaction and respond to it",
      ],
    },
  },
  {
    id: "change-management",
    slug: {
      el: "diacheirisi-allagon-kai-metaschimatismos",
      en: "change-management-and-firm-transformation",
    },
    title: {
      el: "Διαχείριση Αλλαγών & Μετασχηματισμός Επιχειρήσεων",
      en: "Change Management & Firm Transformation",
    },
    semester: 2,
    kind: "elective",
    ects: 7.5,
    instructors: ["karkalakos"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2022/03/Syllabus-Governance-of-Changes-and-Firm-Transformation.pdf",
    summary: {
      el: "Το μάθημα εξετάζει τη διοίκηση της αλλαγής στους οργανισμούς: γιατί αποτυγχάνουν οι μετασχηματισμοί, πώς διαχειρίζεσαι την αντίσταση και ποιες ηγετικές πρακτικές κάνουν τη διαφορά.",
      en: "The course examines change management in organisations: why transformations fail, how resistance is handled, and which leadership practices make the difference.",
    },
    body: {
      el: "Οι περισσότεροι μετασχηματισμοί δεν αποτυγχάνουν στον σχεδιασμό αλλά στους ανθρώπους. Το μάθημα μελετά υποδείγματα οργανωσιακής αλλαγής, τα σημεία όπου συνήθως σπάει η υλοποίηση, και τον ρόλο της ηγεσίας και της επικοινωνίας στη διατήρηση της δυναμικής.",
      en: "Most transformations fail not in design but in people. The course studies models of organisational change, the points at which execution typically breaks, and the role of leadership and communication in sustaining momentum.",
    },
    topics: {
      el: [
        "Υποδείγματα οργανωσιακής αλλαγής",
        "Διάγνωση οργανωσιακής κουλτούρας",
        "Αντίσταση στην αλλαγή και διαχείριση ενδιαφερομένων",
        "Ηγεσία σε συνθήκες μετασχηματισμού",
        "Ψηφιακός μετασχηματισμός και νέα λειτουργικά μοντέλα",
        "Μέτρηση και εδραίωση της αλλαγής",
      ],
      en: [
        "Models of organisational change",
        "Diagnosing organisational culture",
        "Resistance to change and stakeholder management",
        "Leadership under transformation",
        "Digital transformation and new operating models",
        "Measuring and embedding change",
      ],
    },
    outcomes: {
      el: [
        "Να σχεδιάζετε πρόγραμμα αλλαγής με ρεαλιστικό χρονικό ορίζοντα",
        "Να χαρτογραφείτε ενδιαφερόμενους και να προβλέπετε πηγές αντίστασης",
        "Να επιλέγετε ηγετικό ύφος ανάλογα με τη φάση του μετασχηματισμού",
      ],
      en: [
        "Design a change programme with a realistic time horizon",
        "Map stakeholders and anticipate sources of resistance",
        "Match leadership style to the phase of the transformation",
      ],
    },
  },
  {
    id: "human-resources",
    slug: {
      el: "diacheirisi-anthropinon-poron",
      en: "human-resource-management",
    },
    title: {
      el: "Διαχείριση & Ανάπτυξη Ανθρώπινων Πόρων",
      en: "Human Resource Management & Development",
    },
    semester: 2,
    kind: "elective",
    ects: 7.5,
    instructors: ["koumartzis"],
    syllabusUrl: "https://msc-ebs.gr/wp-content/uploads/2023/09/ebs-HRM.pdf",
    summary: {
      el: "Το μάθημα καλύπτει τις σύγχρονες πρακτικές διοίκησης ανθρώπινου δυναμικού: προσέλκυση και επιλογή, εκπαίδευση και ανάπτυξη, αξιολόγηση απόδοσης και συστήματα αμοιβών.",
      en: "The course covers contemporary human resource practice: attraction and selection, training and development, performance appraisal and reward systems.",
    },
    body: {
      el: "Το ανθρώπινο κεφάλαιο είναι ο πόρος που καμία στρατηγική δεν μπορεί να παρακάμψει. Το μάθημα συνδέει τις πρακτικές ΔΑΔ με την επιχειρηματική στρατηγική: πώς η επιλογή προσωπικού, το σύστημα αξιολόγησης και η πολιτική αμοιβών παράγουν —ή υπονομεύουν— την απόδοση που επιδιώκει ο οργανισμός.",
      en: "Human capital is the resource no strategy can bypass. The course connects HR practice to business strategy: how selection, appraisal systems and reward policy produce — or undermine — the performance the organisation is aiming for.",
    },
    topics: {
      el: [
        "Στρατηγική διοίκηση ανθρώπινου δυναμικού",
        "Ανάλυση θέσεων εργασίας, προσέλκυση και επιλογή",
        "Εκπαίδευση, ανάπτυξη και διαχείριση ταλέντου",
        "Συστήματα αξιολόγησης απόδοσης",
        "Αμοιβές, παροχές και κίνητρα",
        "Εργασιακές σχέσεις και οργανωσιακή δέσμευση",
      ],
      en: [
        "Strategic human resource management",
        "Job analysis, attraction and selection",
        "Training, development and talent management",
        "Performance appraisal systems",
        "Compensation, benefits and incentives",
        "Employee relations and organisational commitment",
      ],
    },
    outcomes: {
      el: [
        "Να σχεδιάζετε διαδικασία επιλογής με προβλεπτική εγκυρότητα",
        "Να συνδέετε το σύστημα αξιολόγησης με τους στρατηγικούς στόχους",
        "Να αξιολογείτε την απόδοση μιας επένδυσης σε ανθρώπινο κεφάλαιο",
      ],
      en: [
        "Design a selection process with predictive validity",
        "Align the appraisal system with strategic objectives",
        "Assess the return on an investment in human capital",
      ],
    },
  },
  {
    id: "corporate-financial-analysis",
    slug: {
      el: "chrimatooikonomiki-analysi-epicheiriseon",
      en: "corporate-financial-analysis",
    },
    title: {
      el: "Χρηματοοικονομική Ανάλυση Επιχειρήσεων",
      en: "Corporate Financial Analysis",
    },
    semester: 2,
    kind: "elective",
    ects: 7.5,
    instructors: ["kanas", "kokore"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2022/03/Financial-Analysis-Syllabus-2022.pdf",
    summary: {
      el: "Το μάθημα εξετάζει τις αρχές της χρηματοοικονομικής λογιστικής και το ρυθμιστικό πλαίσιο εταιρικής δημοσιοποίησης, με έμφαση στη διεθνή τυποποίηση και τη διαφάνεια.",
      en: "The course examines the principles of financial accounting and the regulatory framework of corporate disclosure, with emphasis on international standards and transparency.",
    },
    body: {
      el: "Πίσω από κάθε δημοσιευμένο νούμερο υπάρχει ένα πρότυπο και μια επιλογή. Το μάθημα εξηγεί πώς διαμορφώνονται οι χρηματοοικονομικές καταστάσεις υπό τα Διεθνή Πρότυπα Χρηματοοικονομικής Αναφοράς, τι υποχρεούται να δημοσιοποιεί μια εταιρεία και πού αφήνει περιθώριο κρίσης το πλαίσιο.",
      en: "Behind every published figure lies a standard and a choice. The course explains how financial statements are formed under International Financial Reporting Standards, what a company is obliged to disclose, and where the framework leaves room for judgement.",
    },
    topics: {
      el: [
        "Αρχές χρηματοοικονομικής λογιστικής",
        "Διεθνή Πρότυπα Χρηματοοικονομικής Αναφοράς",
        "Ρυθμιστικό πλαίσιο εταιρικής δημοσιοποίησης",
        "Αναγνώριση εσόδων και αποτίμηση στοιχείων",
        "Ενοποιημένες καταστάσεις ομίλων",
        "Εταιρική διακυβέρνηση και διαφάνεια",
      ],
      en: [
        "Principles of financial accounting",
        "International Financial Reporting Standards",
        "The regulatory framework of corporate disclosure",
        "Revenue recognition and asset measurement",
        "Consolidated group statements",
        "Corporate governance and transparency",
      ],
    },
    outcomes: {
      el: [
        "Να ερμηνεύετε καταστάσεις συνταγμένες κατά ΔΠΧΑ",
        "Να αξιολογείτε την επάρκεια της εταιρικής δημοσιοποίησης",
        "Να συγκρίνετε επιχειρήσεις με διαφορετικές λογιστικές πολιτικές",
      ],
      en: [
        "Interpret statements prepared under IFRS",
        "Assess the adequacy of corporate disclosure",
        "Compare companies operating under different accounting policies",
      ],
    },
  },
  {
    id: "international-economics",
    slug: {
      el: "diethnes-oikonomiko-perivallon",
      en: "international-economic-environment",
    },
    title: {
      el: "Διεθνές Οικονομικό Περιβάλλον & Επιχειρήσεις",
      en: "International Economic Environment & Business",
    },
    semester: 2,
    kind: "elective",
    ects: 7.5,
    instructors: ["chletsos"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2026/01/Syllabus-ΔΙΕΘΝΕΣ-ΟΙΚΟΝΟΜΙΚΟ-ΠΕΡΙΒΑΛΛΟΝ-ΚΑΙ-ΕΠΙΧΕΙΡΗΣΕΙΣ_Final.pdf",
    summary: {
      el: "Το μάθημα καλύπτει την παγκοσμιοποίηση, το διεθνές εμπόριο, τις συναλλαγματικές ισοτιμίες και τις οικονομικές κρίσεις, και πώς αυτά καθορίζουν τη στρατηγική μιας επιχείρησης που δραστηριοποιείται διεθνώς.",
      en: "The course covers globalisation, international trade, exchange rates and economic crises, and how these shape the strategy of a firm operating internationally.",
    },
    body: {
      el: "Για μια οικονομία σαν την ελληνική, το «διεθνές» δεν είναι επιλογή αλλά συνθήκη. Το μάθημα εξετάζει τι καθορίζει τα εμπορικά ρεύματα, πώς λειτουργούν οι συναλλαγματικές αγορές, τι ρόλο παίζουν οι υπερεθνικοί θεσμοί και πώς μεταδίδονται οι κρίσεις — με άμεση αναφορά στην ευρωπαϊκή και την ελληνική εμπειρία.",
      en: "For an economy like Greece's, \"international\" is not a choice but a condition. The course examines what determines trade flows, how currency markets work, the role of supranational institutions and how crises propagate — with direct reference to the European and Greek experience.",
    },
    topics: {
      el: [
        "Θεωρίες διεθνούς εμπορίου και συγκριτικό πλεονέκτημα",
        "Εμπορική πολιτική, δασμοί και μη δασμολογικά εμπόδια",
        "Συναλλαγματικές ισοτιμίες και ισοζύγιο πληρωμών",
        "Ξένες άμεσες επενδύσεις και πολυεθνικές επιχειρήσεις",
        "Οικονομική ολοκλήρωση και η Ευρωζώνη",
        "Διεθνείς χρηματοπιστωτικές κρίσεις και μετάδοση",
      ],
      en: [
        "Trade theory and comparative advantage",
        "Trade policy, tariffs and non-tariff barriers",
        "Exchange rates and the balance of payments",
        "Foreign direct investment and multinational firms",
        "Economic integration and the Eurozone",
        "International financial crises and contagion",
      ],
    },
    outcomes: {
      el: [
        "Να αξιολογείτε την έκθεση μιας επιχείρησης σε διεθνείς κινδύνους",
        "Να ερμηνεύετε μεταβολές ισοτιμιών και εμπορικής πολιτικής",
        "Να σχεδιάζετε στρατηγική εισόδου σε ξένη αγορά",
      ],
      en: [
        "Assess a firm's exposure to international risk",
        "Interpret movements in exchange rates and trade policy",
        "Design a foreign market entry strategy",
      ],
    },
  },

  // ─────────────────────────── Semester 3 · core ───────────────────────────
  {
    id: "competition-policy",
    slug: {
      el: "oikonomika-tis-politikis-antagonismou",
      en: "economics-of-competition-policy",
    },
    title: {
      el: "Οικονομικά της Πολιτικής Ανταγωνισμού",
      en: "Economics of Competition Policy",
    },
    semester: 3,
    kind: "core",
    ects: 7.5,
    instructors: ["polemis"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2021/10/politiki-antagonismou.pdf",
    summary: {
      el: "Το μάθημα εξετάζει το δίκαιο και τα οικονομικά του ανταγωνισμού: αντι-ανταγωνιστικές πρακτικές, έλεγχος συγκεντρώσεων, κατάχρηση δεσπόζουσας θέσης και ρύθμιση αγορών.",
      en: "The course examines competition law and economics: anti-competitive practices, merger control, abuse of dominance and market regulation.",
    },
    body: {
      el: "Ο ανταγωνισμός έχει κανόνες, και οι κανόνες έχουν οικονομική λογική. Το μάθημα δείχνει πώς οι αρχές ανταγωνισμού ορίζουν τη σχετική αγορά, μετρούν τη δεσπόζουσα θέση και αξιολογούν μια συγκέντρωση — γνώση απαραίτητη τόσο για όποιον σχεδιάζει στρατηγική όσο και για όποιον την υπερασπίζεται ενώπιον ρυθμιστή.",
      en: "Competition has rules, and the rules have an economic logic. The course shows how competition authorities define the relevant market, measure dominance and assess a merger — knowledge that matters as much to whoever designs a strategy as to whoever defends it before a regulator.",
    },
    topics: {
      el: [
        "Οικονομική θεμελίωση της πολιτικής ανταγωνισμού",
        "Ορισμός σχετικής αγοράς και μέτρηση συγκέντρωσης",
        "Συμπράξεις, καρτέλ και προγράμματα επιείκειας",
        "Κατάχρηση δεσπόζουσας θέσης",
        "Έλεγχος συγκεντρώσεων και διορθωτικά μέτρα",
        "Ρύθμιση δικτυακών και ψηφιακών αγορών",
      ],
      en: [
        "The economic foundations of competition policy",
        "Relevant market definition and concentration measurement",
        "Agreements, cartels and leniency programmes",
        "Abuse of a dominant position",
        "Merger control and remedies",
        "Regulation of network and digital markets",
      ],
    },
    outcomes: {
      el: [
        "Να ορίζετε τη σχετική αγορά και να υπολογίζετε δείκτες συγκέντρωσης",
        "Να αξιολογείτε αν μια εμπορική πρακτική εγείρει ζητήματα ανταγωνισμού",
        "Να προβλέπετε τη ρυθμιστική αντίδραση σε μια στρατηγική κίνηση",
      ],
      en: [
        "Define the relevant market and compute concentration indices",
        "Assess whether a commercial practice raises competition concerns",
        "Anticipate the regulatory response to a strategic move",
      ],
    },
  },
  {
    id: "quantitative-methods",
    slug: {
      el: "posotikes-methodoi-gia-oikonomikes-apofaseis",
      en: "quantitative-methods-for-economic-decisions",
    },
    title: {
      el: "Ποσοτικές Μέθοδοι για Οικονομικές Αποφάσεις",
      en: "Quantitative Methods for Economic Decisions",
    },
    semester: 3,
    kind: "core",
    ects: 7.5,
    instructors: ["agiakloglou"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Ποσοτικές-Μέθοδοι-για-Οικονομικές-Αποφάσεις.pdf",
    summary: {
      el: "Το μάθημα καλύπτει τις στατιστικές και οικονομετρικές μεθόδους που στηρίζουν την εμπειρική ανάλυση: περιγραφική στατιστική, στατιστική συμπερασματολογία, υποδείγματα παλινδρόμησης και πρόβλεψη.",
      en: "The course covers the statistical and econometric methods behind empirical analysis: descriptive statistics, inference, regression models and forecasting.",
    },
    body: {
      el: "Χωρίς ποσοτική βάση, η στρατηγική είναι γνώμη. Το μάθημα εξοπλίζει τους φοιτητές με τα εργαλεία που μετατρέπουν δεδομένα σε τεκμηριωμένο συμπέρασμα: πώς εκτιμάται μια σχέση, πότε είναι στατιστικά αξιόπιστη, και —κρίσιμα— πότε μια συσχέτιση δεν είναι αιτιότητα. Είναι επίσης η μεθοδολογική προετοιμασία για τη διπλωματική εργασία.",
      en: "Without a quantitative base, strategy is opinion. The course equips students with the tools that turn data into a defensible conclusion: how a relationship is estimated, when it is statistically reliable, and — critically — when a correlation is not causation. It is also the methodological preparation for the dissertation.",
    },
    topics: {
      el: [
        "Περιγραφική στατιστική και διερευνητική ανάλυση δεδομένων",
        "Κατανομές πιθανότητας και δειγματοληψία",
        "Έλεγχοι υποθέσεων και διαστήματα εμπιστοσύνης",
        "Απλή και πολλαπλή γραμμική παλινδρόμηση",
        "Παραβιάσεις υποθέσεων και διαγνωστικοί έλεγχοι",
        "Χρονοσειρές και τεχνικές πρόβλεψης",
      ],
      en: [
        "Descriptive statistics and exploratory data analysis",
        "Probability distributions and sampling",
        "Hypothesis testing and confidence intervals",
        "Simple and multiple linear regression",
        "Assumption violations and diagnostic testing",
        "Time series and forecasting techniques",
      ],
    },
    outcomes: {
      el: [
        "Να εκτιμάτε και να ερμηνεύετε υπόδειγμα παλινδρόμησης",
        "Να ελέγχετε την εγκυρότητα ενός εμπειρικού αποτελέσματος",
        "Να παράγετε προβλέψεις με ρητή δήλωση αβεβαιότητας",
      ],
      en: [
        "Estimate and interpret a regression model",
        "Test the validity of an empirical result",
        "Produce forecasts with an explicit statement of uncertainty",
      ],
    },
  },

  // ───────────────────────── Semester 3 · electives ─────────────────────────
  {
    id: "real-estate",
    slug: {
      el: "stratigikes-ependyseon-stin-agora-akiniton",
      en: "real-estate-investment-strategies",
    },
    title: {
      el: "Στρατηγικές Επενδύσεων στην Αγορά Ακινήτων",
      en: "Real Estate Investment Strategies",
    },
    semester: 3,
    kind: "elective",
    ects: 7.5,
    instructors: ["vlamis"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Στρατηγικές-Επενδύσεων-στην-Αγορά-Ακινήτων-2024-2025.pdf",
    summary: {
      el: "Το μάθημα καλύπτει τις επενδυτικές στρατηγικές στην αγορά ακινήτων: αποτίμηση, εταιρείες επενδύσεων ακίνητης περιουσίας (ΑΕΕΑΠ/REITs), διαχείριση χαρτοφυλακίου και τιτλοποίηση.",
      en: "The course covers investment strategy in real estate: valuation, real estate investment trusts (REITs), portfolio management and securitisation.",
    },
    body: {
      el: "Τα ακίνητα είναι η μεγαλύτερη κατηγορία περιουσιακών στοιχείων και η λιγότερο ρευστή. Το μάθημα εξετάζει τι κάνει αυτή την αγορά ιδιαίτερη — κυκλικότητα, τοπικότητα, μόχλευση — και πώς την προσεγγίζει ο θεσμικός επενδυτής μέσω REITs, τιτλοποίησης και διαφοροποίησης χαρτοφυλακίου, με αναφορές στην ελληνική αγορά.",
      en: "Real estate is the largest asset class and the least liquid. The course examines what makes this market distinctive — cyclicality, locality, leverage — and how institutional investors approach it through REITs, securitisation and portfolio diversification, with reference to the Greek market.",
    },
    topics: {
      el: [
        "Χαρακτηριστικά και κύκλοι της αγοράς ακινήτων",
        "Μέθοδοι αποτίμησης ακινήτων",
        "Χρηματοδότηση ακινήτων και μόχλευση",
        "ΑΕΕΑΠ και θεσμικά οχήματα επένδυσης",
        "Τιτλοποίηση απαιτήσεων και δευτερογενείς αγορές",
        "Διαχείριση χαρτοφυλακίου ακινήτων και κίνδυνος",
      ],
      en: [
        "Characteristics and cycles of the property market",
        "Property valuation methods",
        "Real estate finance and leverage",
        "REITs and institutional investment vehicles",
        "Securitisation and secondary markets",
        "Property portfolio management and risk",
      ],
    },
    outcomes: {
      el: [
        "Να αποτιμάτε ένα ακίνητο με πολλαπλές μεθόδους",
        "Να αξιολογείτε επενδυτική πρόταση σε ακίνητα με βάση κίνδυνο και απόδοση",
        "Να συνθέτετε διαφοροποιημένο χαρτοφυλάκιο ακινήτων",
      ],
      en: [
        "Value a property using multiple methods",
        "Assess a real estate investment proposal on risk and return",
        "Construct a diversified property portfolio",
      ],
    },
  },
  {
    id: "entrepreneurship",
    slug: {
      el: "epicheirimatikotita-kainotomia-viosimi-anaptyxi",
      en: "entrepreneurship-innovation-sustainable-development",
    },
    title: {
      el: "Επιχειρηματικότητα, Καινοτομία & Βιώσιμη Ανάπτυξη",
      en: "Entrepreneurship, Innovation & Sustainable Development",
    },
    semester: 3,
    kind: "elective",
    ects: 7.5,
    instructors: ["kottaridi"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Επιχειρηματικότητα-Καινοτομία-Βιώσιμη-Ανάπτυξη-2024-2025.pdf",
    summary: {
      el: "Το μάθημα καλύπτει τη διοίκηση καινοτομίας, τη δημιουργία νέων επιχειρηματικών εγχειρημάτων, τα επιχειρηματικά μοντέλα και τον επιχειρηματικό σχεδιασμό με κριτήρια βιωσιμότητας.",
      en: "The course covers innovation management, new venture creation, business models and business planning against sustainability criteria.",
    },
    body: {
      el: "Από την ιδέα στο βιώσιμο εγχείρημα. Οι φοιτητές μαθαίνουν να αναγνωρίζουν ευκαιρία, να ελέγχουν υποθέσεις πριν επενδύσουν, να δομούν επιχειρηματικό μοντέλο και να συντάσσουν σχέδιο που πείθει χρηματοδότη — με τη βιωσιμότητα και τα κριτήρια ESG ενσωματωμένα εξαρχής και όχι ως επίστρωση.",
      en: "From idea to viable venture. Students learn to recognise an opportunity, test assumptions before investing, structure a business model and write a plan that convinces a financier — with sustainability and ESG criteria built in from the start rather than layered on top.",
    },
    topics: {
      el: [
        "Αναγνώριση και αξιολόγηση επιχειρηματικής ευκαιρίας",
        "Επιχειρηματικά μοντέλα και πρόταση αξίας",
        "Διοίκηση καινοτομίας και ανάπτυξη νέων προϊόντων",
        "Χρηματοδότηση νεοφυών επιχειρήσεων και επιχειρηματικά κεφάλαια",
        "Βιώσιμη ανάπτυξη και κριτήρια ESG",
        "Σύνταξη και παρουσίαση επιχειρηματικού σχεδίου",
      ],
      en: [
        "Opportunity recognition and evaluation",
        "Business models and value proposition design",
        "Innovation management and new product development",
        "Startup financing and venture capital",
        "Sustainable development and ESG criteria",
        "Writing and pitching a business plan",
      ],
    },
    outcomes: {
      el: [
        "Να αξιολογείτε μια επιχειρηματική ευκαιρία με δομημένα κριτήρια",
        "Να σχεδιάζετε επιχειρηματικό μοντέλο και να ελέγχετε τις παραδοχές του",
        "Να συντάσσετε και να παρουσιάζετε επενδυτική πρόταση",
      ],
      en: [
        "Evaluate a business opportunity against structured criteria",
        "Design a business model and test its assumptions",
        "Write and pitch an investment proposal",
      ],
    },
  },
  {
    id: "inventory-supply",
    slug: {
      el: "dioikisi-apothematon-kai-promitheion",
      en: "inventory-and-supply-chain-management",
    },
    title: {
      el: "Διοίκηση Αποθεμάτων & Προμηθειών",
      en: "Inventory & Supply Chain Management",
    },
    semester: 3,
    kind: "elective",
    ects: 7.5,
    instructors: ["karkalakos"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Διαχείρηση_αποθεμάτων.pdf",
    summary: {
      el: "Το μάθημα καλύπτει τη διοίκηση εφοδιαστικής αλυσίδας: σχεδιασμό αποθεμάτων, στρατηγική προμηθειών, δίκτυα διανομής και ανθεκτικότητα σε διαταραχές.",
      en: "The course covers supply chain management: inventory planning, procurement strategy, distribution networks and resilience to disruption.",
    },
    body: {
      el: "Η εφοδιαστική αλυσίδα έπαψε να είναι λειτουργικό ζήτημα και έγινε στρατηγικό. Το μάθημα εξετάζει το θεμελιώδες δίλημμα μεταξύ κόστους και διαθεσιμότητας, τα υποδείγματα ελέγχου αποθεμάτων, τη διαπραγμάτευση με προμηθευτές και τον σχεδιασμό δικτύων που αντέχουν σε διαταραχή — ένα ερώτημα με ιδιαίτερη σημασία για μια οικονομία-λιμάνι.",
      en: "Supply chains stopped being an operational matter and became a strategic one. The course examines the fundamental trade-off between cost and availability, inventory control models, supplier negotiation and the design of networks that survive disruption — a question of particular weight for a port economy.",
    },
    topics: {
      el: [
        "Σχεδιασμός εφοδιαστικής αλυσίδας και στρατηγική ευθυγράμμιση",
        "Υποδείγματα ελέγχου αποθεμάτων και οικονομική ποσότητα παραγγελίας",
        "Πρόβλεψη ζήτησης και φαινόμενο μαστιγίου",
        "Στρατηγική προμηθειών και διαχείριση προμηθευτών",
        "Δίκτυα διανομής και logistics",
        "Κίνδυνος, ανθεκτικότητα και βιωσιμότητα αλυσίδας",
      ],
      en: [
        "Supply chain design and strategic alignment",
        "Inventory control models and economic order quantity",
        "Demand forecasting and the bullwhip effect",
        "Procurement strategy and supplier management",
        "Distribution networks and logistics",
        "Supply chain risk, resilience and sustainability",
      ],
    },
    outcomes: {
      el: [
        "Να βελτιστοποιείτε πολιτική αποθεμάτων υπό περιορισμούς κόστους και εξυπηρέτησης",
        "Να σχεδιάζετε στρατηγική προμηθειών και να διαπραγματεύεστε με προμηθευτές",
        "Να αξιολογείτε την έκθεση μιας αλυσίδας σε κίνδυνο διαταραχής",
      ],
      en: [
        "Optimise inventory policy under cost and service constraints",
        "Design a procurement strategy and negotiate with suppliers",
        "Assess a supply chain's exposure to disruption risk",
      ],
    },
  },
  {
    id: "business-analytics",
    slug: {
      el: "epicheirimatiki-analytiki",
      en: "business-analytics",
    },
    title: {
      el: "Επιχειρηματική Αναλυτική",
      en: "Business Analytics",
    },
    semester: 3,
    kind: "elective",
    ects: 7.5,
    instructors: ["agkyropoulos"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Επιχειρηματική-Αναλυτική-Περίγραμμα.pdf",
    summary: {
      el: "Το μάθημα εφαρμόζει την ανάλυση δεδομένων στη λήψη επιχειρηματικών αποφάσεων: επιχειρηματική ευφυΐα, προβλεπτική αναλυτική, οπτικοποίηση και μετάφραση δεδομένων σε δράση.",
      en: "The course applies data analysis to business decisions: business intelligence, predictive analytics, visualisation and translating data into action.",
    },
    body: {
      el: "Τα δεδομένα δεν παράγουν αποφάσεις από μόνα τους — χρειάζονται ερώτημα, μέθοδο και αφήγηση. Το μάθημα καλύπτει και τα τρία: πώς διατυπώνεται ένα επιχειρηματικό ερώτημα ώστε να απαντάται με δεδομένα, ποιες τεχνικές αναλυτικής ταιριάζουν σε ποιο πρόβλημα, και πώς παρουσιάζεται ένα εύρημα ώστε να οδηγήσει σε απόφαση.",
      en: "Data does not produce decisions on its own — it needs a question, a method and a narrative. The course covers all three: how to frame a business question so that data can answer it, which analytical techniques suit which problem, and how to present a finding so it leads to a decision.",
    },
    topics: {
      el: [
        "Από το επιχειρηματικό ερώτημα στο αναλυτικό πρόβλημα",
        "Προετοιμασία, ποιότητα και διαχείριση δεδομένων",
        "Περιγραφική και διαγνωστική αναλυτική",
        "Προβλεπτικά υποδείγματα και εισαγωγή στη μηχανική μάθηση",
        "Οπτικοποίηση δεδομένων και σχεδιασμός πινάκων ελέγχου",
        "Ηθική δεδομένων και ερμηνευσιμότητα υποδειγμάτων",
      ],
      en: [
        "From business question to analytical problem",
        "Data preparation, quality and governance",
        "Descriptive and diagnostic analytics",
        "Predictive models and an introduction to machine learning",
        "Data visualisation and dashboard design",
        "Data ethics and model interpretability",
      ],
    },
    outcomes: {
      el: [
        "Να μεταφράζετε ένα επιχειρηματικό ερώτημα σε αναλυτικό σχέδιο",
        "Να επιλέγετε και να αξιολογείτε κατάλληλο προβλεπτικό υπόδειγμα",
        "Να παρουσιάζετε ευρήματα σε μη τεχνικό ακροατήριο",
      ],
      en: [
        "Translate a business question into an analytical plan",
        "Select and evaluate an appropriate predictive model",
        "Present findings to a non-technical audience",
      ],
    },
  },
  {
    id: "fintech-green-finance",
    slug: {
      el: "trapeziki-fintech-kai-prasini-chrimatodotisi",
      en: "banking-fintech-and-green-finance",
    },
    title: {
      el: "Τραπεζική, FinTech & Πράσινη Χρηματοδότηση",
      en: "Banking, FinTech & Green Finance",
    },
    semester: 3,
    kind: "elective",
    ects: 7.5,
    instructors: ["psillaki"],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2024/09/Τραπεζική-FinTech-και-πράσινη-χρηματοδότηση-περίγραμμα-2024-neo.pdf",
    summary: {
      el: "Το μάθημα εξετάζει την ψηφιακή επανάσταση στις χρηματοπιστωτικές υπηρεσίες: FinTech, κρυπτονομίσματα, ψηφιακές πληρωμές και τη χρηματοδότηση της πράσινης μετάβασης.",
      en: "The course examines the digital revolution in financial services: FinTech, cryptocurrencies, digital payments and the financing of the green transition.",
    },
    body: {
      el: "Δύο δυνάμεις αναδιαμορφώνουν ταυτόχρονα το τραπεζικό σύστημα: η τεχνολογία και το κλίμα. Το μάθημα εξετάζει πώς οι νέοι παίκτες FinTech αποδομούν την παραδοσιακή τραπεζική αλυσίδα αξίας, τι σημαίνουν πραγματικά τα κρυπτονομίσματα και τα ψηφιακά νομίσματα κεντρικών τραπεζών, και πώς τιμολογείται ο κλιματικός κίνδυνος στη χρηματοδότηση.",
      en: "Two forces are reshaping banking at once: technology and climate. The course examines how FinTech entrants unbundle the traditional banking value chain, what cryptocurrencies and central bank digital currencies actually mean, and how climate risk is priced into lending.",
    },
    topics: {
      el: [
        "Δομή και λειτουργία του τραπεζικού συστήματος",
        "FinTech, ψηφιακές πληρωμές και ανοικτή τραπεζική",
        "Κρυπτονομίσματα, blockchain και ψηφιακά νομίσματα κεντρικών τραπεζών",
        "Πράσινη χρηματοδότηση, πράσινα ομόλογα και ταξινομία ΕΕ",
        "Κλιματικός κίνδυνος και τραπεζική εποπτεία",
        "Ρυθμιστικό πλαίσιο και χρηματοπιστωτική σταθερότητα",
      ],
      en: [
        "Structure and function of the banking system",
        "FinTech, digital payments and open banking",
        "Cryptocurrencies, blockchain and central bank digital currencies",
        "Green finance, green bonds and the EU taxonomy",
        "Climate risk and banking supervision",
        "Regulation and financial stability",
      ],
    },
    outcomes: {
      el: [
        "Να αξιολογείτε την επίδραση μιας τεχνολογίας FinTech στο τραπεζικό μοντέλο",
        "Να ερμηνεύετε το πλαίσιο πράσινης χρηματοδότησης και την ταξινομία της ΕΕ",
        "Να αποτιμάτε τον κλιματικό κίνδυνο σε ένα χαρτοφυλάκιο",
      ],
      en: [
        "Assess the impact of a FinTech technology on the banking model",
        "Interpret the green finance framework and the EU taxonomy",
        "Price climate risk within a portfolio",
      ],
    },
  },

  // ─────────────────────────── Semester 4 ───────────────────────────
  {
    id: "dissertation",
    slug: {
      el: "diplomatiki-ergasia",
      en: "master-dissertation",
    },
    title: {
      el: "Διπλωματική Εργασία",
      en: "Master's Dissertation",
    },
    semester: 4,
    kind: "dissertation",
    ects: 30,
    instructors: [],
    syllabusUrl:
      "https://msc-ebs.gr/wp-content/uploads/2026/05/ΟΔΗΓΟΣ-ΕΚΠΟΝΗΣΗ-ΔΙΠΛΩΜΑΤΙΚΗΣ-ΕΡΓΑΣΙΑΣ-2026.pdf",
    summary: {
      el: "Το τέταρτο εξάμηνο αφιερώνεται στη διπλωματική εργασία: μια πρωτότυπη μελέτη υπό επίβλεψη μέλους ΔΕΠ, η οποία υποστηρίζεται δημόσια ενώπιον τριμελούς επιτροπής. Παράλληλα οι φοιτητές μπορούν να πραγματοποιήσουν πρακτική άσκηση.",
      en: "The fourth semester is devoted to the dissertation: an original supervised study, defended publicly before a three-member committee. Students may undertake an internship in parallel.",
    },
    body: {
      el: "Η διπλωματική είναι το σημείο όπου ο φοιτητής παύει να καταναλώνει έρευνα και αρχίζει να την παράγει. Το θέμα επιλέγεται σε συνεννόηση με τον επιβλέποντα και συχνά προκύπτει από πραγματικό ερώτημα συνεργαζόμενης επιχείρησης. Η εργασία απαιτεί σαφές ερευνητικό ερώτημα, τεκμηριωμένη μεθοδολογία και συμπεράσματα που αντέχουν σε κριτική εξέταση.",
      en: "The dissertation is the point at which a student stops consuming research and starts producing it. The topic is chosen with the supervisor and often arises from a live question posed by a partner company. The work requires a clear research question, a defensible methodology and conclusions that withstand critical examination.",
    },
    topics: {
      el: [
        "Διατύπωση ερευνητικού ερωτήματος",
        "Ανασκόπηση βιβλιογραφίας",
        "Σχεδιασμός μεθοδολογίας και συλλογή δεδομένων",
        "Εμπειρική ανάλυση",
        "Συγγραφή κατά ακαδημαϊκά πρότυπα",
        "Δημόσια υποστήριξη ενώπιον τριμελούς επιτροπής",
      ],
      en: [
        "Formulating a research question",
        "Literature review",
        "Methodology design and data collection",
        "Empirical analysis",
        "Writing to academic standards",
        "Public defence before a three-member committee",
      ],
    },
    outcomes: {
      el: [
        "Να σχεδιάζετε και να εκτελείτε αυτοτελές ερευνητικό έργο",
        "Να τεκμηριώνετε μεθοδολογικές επιλογές",
        "Να υπερασπίζεστε τα ευρήματά σας δημόσια",
      ],
      en: [
        "Design and execute an independent research project",
        "Justify methodological choices",
        "Defend your findings in public",
      ],
    },
  },
];

// ─────────────────────────────── helpers ───────────────────────────────

export const semesterLabel: Record<Semester, I18n> = {
  1: { el: "Α΄ Εξάμηνο", en: "Semester 1" },
  2: { el: "Β΄ Εξάμηνο", en: "Semester 2" },
  3: { el: "Γ΄ Εξάμηνο", en: "Semester 3" },
  4: { el: "Δ΄ Εξάμηνο", en: "Semester 4" },
};

export const kindLabel: Record<CourseKind, I18n> = {
  core: { el: "Υποχρεωτικό", en: "Core" },
  elective: { el: "Επιλογής", en: "Elective" },
  dissertation: { el: "Διπλωματική", en: "Dissertation" },
};

export function coursesBySemester(semester: Semester): Course[] {
  return courses.filter((course) => course.semester === semester);
}

export function courseBySlug(slug: string): Course | undefined {
  return courses.find(
    (course) => course.slug.el === slug || course.slug.en === slug,
  );
}

export function courseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export const taughtCourses = courses.filter(
  (course) => course.kind !== "dissertation",
);
