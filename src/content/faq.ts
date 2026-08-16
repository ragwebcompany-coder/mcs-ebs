import type { I18n } from "@/lib/i18n";

export interface FaqItem {
  id: string;
  question: I18n;
  /** Plain text. Written to be quotable standalone — this is what LLMs extract. */
  answer: I18n;
  group: "programme" | "admissions" | "cost" | "career" | "practical";
}

export const faqGroups: Record<FaqItem["group"], I18n> = {
  programme: { el: "Το πρόγραμμα", en: "The programme" },
  admissions: { el: "Αιτήσεις & εισαγωγή", en: "Applications & admission" },
  cost: { el: "Δίδακτρα & υποτροφίες", en: "Tuition & scholarships" },
  career: { el: "Καριέρα", en: "Careers" },
  practical: { el: "Πρακτικά θέματα", en: "Practical matters" },
};

export const faq: FaqItem[] = [
  {
    id: "what-is-it",
    group: "programme",
    question: {
      el: "Τι είναι το ΠΜΣ «Οικονομική & Επιχειρησιακή Στρατηγική»;",
      en: "What is the MSc in Economic & Business Strategy?",
    },
    answer: {
      el: "Είναι μεταπτυχιακό πρόγραμμα σπουδών του Τμήματος Οικονομικής Επιστήμης του Πανεπιστημίου Πειραιώς, που λειτουργεί από το 2006. Διαρκεί τέσσερα εξάμηνα, οδηγεί σε Μεταπτυχιακό Δίπλωμα Ειδίκευσης (M.Sc.) και συνδυάζει οικονομική ανάλυση με επιχειρησιακή στρατηγική, χρηματοοικονομικά και ψηφιακό μετασχηματισμό.",
      en: "It is a postgraduate programme of the Department of Economics at the University of Piraeus, running since 2006. It lasts four semesters, leads to a Master of Science degree, and combines economic analysis with business strategy, finance and digital transformation.",
    },
  },
  {
    id: "duration",
    group: "programme",
    question: {
      el: "Πόσο διαρκεί το πρόγραμμα;",
      en: "How long is the programme?",
    },
    answer: {
      el: "Τέσσερα εξάμηνα, δηλαδή δύο ακαδημαϊκά έτη. Τα πρώτα τρία εξάμηνα είναι διδακτικά και περιλαμβάνουν συνολικά 12 μαθήματα. Το τέταρτο εξάμηνο αφιερώνεται στη διπλωματική εργασία, με δυνατότητα παράλληλης πρακτικής άσκησης.",
      en: "Four semesters, that is two academic years. The first three semesters are taught and comprise 12 courses in total. The fourth semester is devoted to the dissertation, with the option of undertaking an internship in parallel.",
    },
  },
  {
    id: "structure",
    group: "programme",
    question: {
      el: "Πώς κατανέμονται τα μαθήματα στα εξάμηνα;",
      en: "How are the courses distributed across semesters?",
    },
    answer: {
      el: "Στο Α΄ εξάμηνο και τα τέσσερα μαθήματα είναι υποχρεωτικά. Στο Β΄ και στο Γ΄ εξάμηνο ο φοιτητής παρακολουθεί δύο υποχρεωτικά και δύο μαθήματα επιλογής ανά εξάμηνο. Το Δ΄ εξάμηνο αφιερώνεται εξ ολοκλήρου στη διπλωματική εργασία.",
      en: "In the first semester all four courses are compulsory. In the second and third semesters students take two compulsory courses and two electives per semester. The fourth semester is devoted entirely to the dissertation.",
    },
  },
  {
    id: "hybrid",
    group: "programme",
    question: {
      el: "Το πρόγραμμα είναι εξ αποστάσεως ή δια ζώσης;",
      en: "Is the programme taught remotely or in person?",
    },
    answer: {
      el: "Το πρόγραμμα είναι υβριδικό (blended learning): συνδυάζει την ευελιξία της εξ αποστάσεως εκπαίδευσης με την αμεσότητα της δια ζώσης διδασκαλίας. Ο σχεδιασμός αυτός επιτρέπει σε εργαζόμενους επαγγελματίες να παρακολουθήσουν χωρίς να διακόψουν την επαγγελματική τους δραστηριότητα.",
      en: "The programme is hybrid (blended learning): it combines the flexibility of distance education with the immediacy of in-person teaching. This design allows working professionals to attend without interrupting their careers.",
    },
  },
  {
    id: "schedule",
    group: "practical",
    question: {
      el: "Πότε γίνονται τα μαθήματα;",
      en: "When are classes held?",
    },
    answer: {
      el: "Τα μαθήματα πραγματοποιούνται καθημερινά απογευματινές ώρες, από τις 18:15 έως τις 21:00, ώστε να είναι συμβατά με πλήρες ωράριο εργασίας. Τα σεμινάρια ενδυνάμωσης γίνονται Παρασκευή 18:00–21:00 και Σάββατο 11:00–14:00.",
      en: "Classes run on weekday evenings, from 18:15 to 21:00, so that they remain compatible with full-time employment. The empowerment seminars are held on Fridays 18:00–21:00 and Saturdays 11:00–14:00.",
    },
  },
  {
    id: "where",
    group: "practical",
    question: {
      el: "Πού βρίσκεται το πρόγραμμα;",
      en: "Where is the programme based?",
    },
    answer: {
      el: "Στο Πανεπιστήμιο Πειραιώς, Καραολή & Δημητρίου 80, 185 34 Πειραιάς. Η Γραμματεία του ΠΜΣ βρίσκεται στον 5ο όροφο, Γραφείο 518.",
      en: "At the University of Piraeus, 80 Karaoli & Dimitriou Street, 185 34 Piraeus, Greece. The programme Secretariat is on the 5th floor, Office 518.",
    },
  },
  {
    id: "tuition",
    group: "cost",
    question: {
      el: "Πόσο κοστίζουν τα δίδακτρα;",
      en: "How much is the tuition?",
    },
    answer: {
      el: "Τα δίδακτρα ανέρχονται σε 6.500 € για το σύνολο του προγράμματος. Καταβάλλονται σε τέσσερις ισόποσες δόσεις των 1.625 €, μία στην αρχή κάθε εξαμήνου.",
      en: "Tuition is €6,500 for the entire programme, paid in four equal instalments of €1,625, one at the start of each semester.",
    },
  },
  {
    id: "scholarships",
    group: "cost",
    question: {
      el: "Υπάρχουν υποτροφίες;",
      en: "Are scholarships available?",
    },
    answer: {
      el: "Ναι. Το πρόγραμμα χορηγεί κάθε εξάμηνο τρεις υποτροφίες των 1.000 € στους φοιτητές με την καλύτερη επίδοση. Επιπλέον, στο τρίτο εξάμηνο χορηγούνται πέντε χορηγικές υποτροφίες — τρεις από τη WIND και δύο από τη Data Communication — σε ειδική τελετή την πρώτη εβδομάδα του Οκτωβρίου. Μέσω του CFA Institute University Affiliation Program διατίθεται επίσης περιορισμένος αριθμός υποτροφιών για μειωμένα εξέταστρα CFA.",
      en: "Yes. The programme awards three scholarships of €1,000 each semester to the highest-performing students. In addition, five sponsored scholarships are awarded in the third semester — three from WIND and two from Data Communication — at a ceremony held in the first week of October. A limited number of reduced CFA exam fee scholarships is also available through the CFA Institute University Affiliation Program.",
    },
  },
  {
    id: "who-can-apply",
    group: "admissions",
    question: {
      el: "Ποιοι μπορούν να κάνουν αίτηση;",
      en: "Who can apply?",
    },
    answer: {
      el: "Πτυχιούχοι Πανεπιστημίων και ΤΕΙ της ημεδαπής, καθώς και αναγνωρισμένων ομοταγών ιδρυμάτων της αλλοδαπής. Το πρόγραμμα δέχεται υποψηφίους από ευρύ φάσμα γνωστικών αντικειμένων — οικονομικά, διοίκηση, μηχανική, θετικές επιστήμες — και δεν απαιτεί προηγούμενη εξειδίκευση στη στρατηγική.",
      en: "Graduates of Greek universities and technological institutions, as well as recognised equivalent institutions abroad. The programme admits candidates from a wide range of disciplines — economics, management, engineering, sciences — and does not require prior specialisation in strategy.",
    },
  },
  {
    id: "documents",
    group: "admissions",
    question: {
      el: "Τι δικαιολογητικά χρειάζονται;",
      en: "What documents are required?",
    },
    answer: {
      el: "Αντίγραφο πτυχίου και αναλυτική βαθμολογία, βιογραφικό σημείωμα, δύο συστατικές επιστολές, πιστοποιητικά γνώσης ξένων γλωσσών, φωτοαντίγραφο ταυτότητας, φωτογραφία και συνοδευτική επιστολή που τεκμηριώνει τον σκοπό της αίτησης.",
      en: "Degree certificate and academic transcript, CV, two letters of recommendation, foreign language certificates, a copy of an identity document, a photograph, and a covering letter setting out the purpose of the application.",
    },
  },
  {
    id: "selection",
    group: "admissions",
    question: {
      el: "Πώς επιλέγονται οι υποψήφιοι;",
      en: "How are candidates selected?",
    },
    answer: {
      el: "Η επιλογή γίνεται από την Επιτροπή Επιλογής βάσει δημοσιευμένων και μοριοδοτούμενων κριτηρίων: βαθμός και συνάφεια πτυχίου, επίδοση σε συναφή μαθήματα, γνώση αγγλικής, επαγγελματική εμπειρία, ερευνητική δραστηριότητα, συστατικές επιστολές και προσωπική συνέντευξη. Η αναλυτική διαδικασία αξιολόγησης είναι δημοσιευμένη και διαθέσιμη στην ιστοσελίδα.",
      en: "Selection is made by the Selection Committee against published, weighted criteria: degree grade and relevance, performance in related courses, knowledge of English, professional experience, research activity, letters of recommendation and a personal interview. The full evaluation procedure is published and available on the website.",
    },
  },
  {
    id: "english",
    group: "admissions",
    question: {
      el: "Χρειάζεται πιστοποιητικό αγγλικών;",
      en: "Is an English certificate required?",
    },
    answer: {
      el: "Ναι, απαιτείται τεκμηριωμένη γνώση της αγγλικής γλώσσας. Μέρος της βιβλιογραφίας και του διδακτικού υλικού είναι στα αγγλικά, ενώ οι εκπαιδευτικές δραστηριότητες στο εξωτερικό διεξάγονται στην αγγλική.",
      en: "Yes, documented knowledge of English is required. Part of the reading list and teaching material is in English, and the programme's activities abroad are conducted in English.",
    },
  },
  {
    id: "internship",
    group: "career",
    question: {
      el: "Περιλαμβάνεται πρακτική άσκηση;",
      en: "Is an internship included?",
    },
    answer: {
      el: "Η πρακτική άσκηση είναι προαιρετική και διαρκεί 4 έως 6 μήνες. Διατίθεται από το πρώτο έως και το τέταρτο εξάμηνο και ο φοιτητής μπορεί να την ξεκινήσει οποιαδήποτε στιγμή του έτους. Το πρόγραμμα συνεργάζεται με πάνω από 40 εργοδότες, μεταξύ των οποίων Deloitte, EY, PwC, Microsoft, Unilever, Alpha Bank, Eurobank και η Εθνική Τράπεζα.",
      en: "The internship is optional and lasts 4 to 6 months. It is available from the first through the fourth semester and students may begin at any point in the year. The programme works with more than 40 employers, including Deloitte, EY, PwC, Microsoft, Unilever, Alpha Bank, Eurobank and the National Bank of Greece.",
    },
  },
  {
    id: "employment",
    group: "career",
    question: {
      el: "Πού εργάζονται οι απόφοιτοι;",
      en: "Where do graduates work?",
    },
    answer: {
      el: "Σύμφωνα με την έρευνα αποφοίτων του προγράμματος, 32% εργάζονται σε μικρομεσαίες επιχειρήσεις, 20% στον τραπεζικό, ελεγκτικό και χρηματοοικονομικό τομέα, 14% σε διεθνείς επιχειρήσεις, 13% στις τηλεπικοινωνίες και την πληροφορική, 12% σε λιανική, ναυτιλία, ασφάλειες και φάρμακο, και 9% στον δημόσιο τομέα.",
      en: "According to the programme's alumni survey, 32% work in small and medium enterprises, 20% in banking, audit and financial services, 14% in international corporations, 13% in telecommunications and IT, 12% in retail, shipping, insurance and pharmaceuticals, and 9% in the public sector.",
    },
  },
  {
    id: "cfa",
    group: "career",
    question: {
      el: "Τι σημαίνει η συμμετοχή στο CFA Institute University Affiliation Program;",
      en: "What does participation in the CFA Institute University Affiliation Program mean?",
    },
    answer: {
      el: "Σημαίνει ότι το πρόγραμμα σπουδών έχει αξιολογηθεί ως στενά συνδεδεμένο με τις πρακτικές της αγοράς και ότι προετοιμάζει τους φοιτητές για τις εξετάσεις πιστοποίησης Chartered Financial Analyst. Το ΠΜΣ μπορεί να χορηγεί κάθε χρόνο περιορισμένο αριθμό υποτροφιών για μειωμένη καταβολή εξέταστρων στο CFA Program.",
      en: "It means the curriculum has been assessed as closely tied to professional practice and that it prepares students for the Chartered Financial Analyst examinations. The programme can award a limited number of reduced CFA exam fee scholarships each year.",
    },
  },
  {
    id: "trips",
    group: "programme",
    question: {
      el: "Υπάρχουν εκπαιδευτικές εκδρομές στο εξωτερικό;",
      en: "Are there study trips abroad?",
    },
    answer: {
      el: "Ναι. Το πρόγραμμα διοργανώνει τακτικά εκπαιδευτικές εκδρομές σε κορυφαία πανεπιστήμια και επιχειρήσεις. Πρόσφατοι προορισμοί περιλαμβάνουν τη Silicon Valley (2025), τη Νέα Υόρκη και την Ουάσιγκτον (2024), και τα Stevens Institute of Technology, New York University και Drexel University (2022). Παλαιότερες εκδρομές περιλαμβάνουν την Ευρωπαϊκή Επιτροπή στις Βρυξέλλες, την BMW στο Μόναχο και την Airbus στην Τουλούζη.",
      en: "Yes. The programme regularly organises study trips to leading universities and companies. Recent destinations include Silicon Valley (2025), New York City and Washington DC (2024), and Stevens Institute of Technology, New York University and Drexel University (2022). Earlier trips include the European Commission in Brussels, BMW in Munich and Airbus in Toulouse.",
    },
  },
  {
    id: "dissertation",
    group: "programme",
    question: {
      el: "Είναι υποχρεωτική η διπλωματική εργασία;",
      en: "Is the dissertation compulsory?",
    },
    answer: {
      el: "Ναι. Το τέταρτο εξάμηνο αφιερώνεται στην εκπόνηση διπλωματικής εργασίας υπό την επίβλεψη μέλους του διδακτικού προσωπικού. Η εργασία υποστηρίζεται δημόσια ενώπιον τριμελούς εξεταστικής επιτροπής. Οδηγός εκπόνησης διατίθεται από τη Γραμματεία.",
      en: "Yes. The fourth semester is devoted to a dissertation prepared under the supervision of a member of the teaching staff. It is defended publicly before a three-member examination committee. A preparation guide is available from the Secretariat.",
    },
  },
  {
    id: "seminars",
    group: "programme",
    question: {
      el: "Τι είναι τα σεμινάρια ενδυνάμωσης;",
      en: "What are the empowerment seminars?",
    },
    answer: {
      el: "Είναι οκτώ κύκλοι σεμιναρίων εκτός του βασικού προγράμματος, που καλύπτουν ψηφιακό μετασχηματισμό, διαχείριση καριέρας και soft skills, δημιουργική σκέψη, business analytics, web design και digital marketing, τεχνητή νοημοσύνη και μηχανική μάθηση, επικοινωνία και γλώσσα σώματος, και συναισθηματική νοημοσύνη. Προσφέρονται χωρίς επιπλέον κόστος στους φοιτητές του ΠΜΣ.",
      en: "They are eight seminar series outside the core curriculum, covering digital transformation, career management and soft skills, creative thinking, business analytics, web design and digital marketing, artificial intelligence and machine learning, communication and body language, and emotional intelligence. They are offered to enrolled students at no additional cost.",
    },
  },
  {
    id: "alumni",
    group: "career",
    question: {
      el: "Τι είναι η Πύλη Αποφοίτων;",
      en: "What is the Alumni Portal?",
    },
    answer: {
      el: "Είναι δίκτυο που συνδέει τους αποφοίτους του ΠΜΣ με στόχο την επαγγελματική και συναδελφική αλληλεγγύη. Μέσω της Πύλης οι απόφοιτοι αναρτούν βιογραφικά και άρθρα, αναζητούν παλαιούς συμφοιτητές, συμμετέχουν σε δράσεις του προγράμματος και μεταφέρουν την εμπειρία τους στους ενεργούς φοιτητές. Η εγγραφή γίνεται κατόπιν αίτησης και αφορά αποκλειστικά αποφοίτους.",
      en: "It is a network connecting programme graduates for professional and collegial support. Through the portal alumni post CVs and articles, find former classmates, take part in programme activities and pass their experience on to current students. Registration is by application and is open to graduates only.",
    },
  },
  {
    id: "contact",
    group: "practical",
    question: {
      el: "Πώς επικοινωνώ με τη Γραμματεία;",
      en: "How do I contact the Secretariat?",
    },
    answer: {
      el: "Στο τηλέφωνο 210 414 2284 ή στο κινητό 694 476 8189, και στο email strategy@unipi.gr. Η Γραμματεία βρίσκεται στον 5ο όροφο, Γραφείο 518, Καραολή & Δημητρίου 80, 185 34 Πειραιάς.",
      en: "By telephone on +30 210 414 2284 or +30 694 476 8189, or by email at strategy@unipi.gr. The Secretariat is on the 5th floor, Office 518, 80 Karaoli & Dimitriou Street, 185 34 Piraeus.",
    },
  },
];

export function faqByGroup(group: FaqItem["group"]): FaqItem[] {
  return faq.filter((item) => item.group === group);
}
