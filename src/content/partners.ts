import type { I18n } from "@/lib/i18n";

export interface Partner {
  name: string;
  /** Logo file in /public/media/partners, when one exists. */
  logo?: string;
  sector: I18n;
}

/**
 * Employers that have hosted MSc EBS students on internship.
 * Source: the programme's own internship page.
 */
export const internshipPartners: Partner[] = [
  { name: "Deloitte", logo: "deloitte.jpg", sector: { el: "Συμβουλευτική", en: "Consulting" } },
  { name: "EY", logo: "ernst.jpg", sector: { el: "Συμβουλευτική", en: "Consulting" } },
  { name: "PwC", logo: "pwc.jpg", sector: { el: "Συμβουλευτική", en: "Consulting" } },
  { name: "Microsoft", logo: "microsoft.jpg", sector: { el: "Τεχνολογία", en: "Technology" } },
  { name: "Unilever", logo: "unilever.jpg", sector: { el: "Καταναλωτικά αγαθά", en: "Consumer goods" } },
  { name: "Johnson & Johnson", logo: "johnson.jpg", sector: { el: "Υγεία", en: "Healthcare" } },
  { name: "Estée Lauder", logo: "estee-lauder.jpg", sector: { el: "Καταναλωτικά αγαθά", en: "Consumer goods" } },
  { name: "Alpha Bank", logo: "alpha-bank.jpg", sector: { el: "Τραπεζική", en: "Banking" } },
  { name: "Eurobank", logo: "eurobank.jpg", sector: { el: "Τραπεζική", en: "Banking" } },
  { name: "Εθνική Τράπεζα", logo: "ethniki.jpg", sector: { el: "Τραπεζική", en: "Banking" } },
  { name: "Εθνική Ασφαλιστική", logo: "ethiki-asf.jpg", sector: { el: "Ασφάλειες", en: "Insurance" } },
  { name: "Papastratos – Philip Morris", logo: "papastratos.jpg", sector: { el: "Βιομηχανία", en: "Manufacturing" } },
  { name: "Coca-Cola 3E", logo: "3e.jpg", sector: { el: "Καταναλωτικά αγαθά", en: "Consumer goods" } },
  { name: "BIC Hellas", logo: "bic.jpg", sector: { el: "Βιομηχανία", en: "Manufacturing" } },
  { name: "Invest in Greece", logo: "invest.jpg", sector: { el: "Δημόσιος τομέας", en: "Public sector" } },
  { name: "Ελληνικό Κοινοβούλιο", logo: "vouli.jpg", sector: { el: "Δημόσιος τομέας", en: "Public sector" } },
  { name: "ΙΟΒΕ", logo: "iove.jpg", sector: { el: "Έρευνα", en: "Research" } },
  { name: "ICAP", logo: "icap.jpg", sector: { el: "Υπηρεσίες", en: "Business services" } },
  { name: "Dixons South Europe (Κωτσόβολος)", logo: "dixons.jpg", sector: { el: "Λιανική", en: "Retail" } },
  { name: "ΑΒ Βασιλόπουλος", logo: "vasilopoulos.jpg", sector: { el: "Λιανική", en: "Retail" } },
  { name: "Σκλαβενίτης", logo: "sklavenitis.jpg", sector: { el: "Λιανική", en: "Retail" } },
  { name: "Attica Department Stores", logo: "attica.jpg", sector: { el: "Λιανική", en: "Retail" } },
  { name: "Jumbo", sector: { el: "Λιανική", en: "Retail" } },
  { name: "MAKRO", sector: { el: "Χονδρική", en: "Wholesale" } },
  { name: "Chipita", sector: { el: "Βιομηχανία", en: "Manufacturing" } },
  { name: "Ολυμπιακή Ζυθοποιία", sector: { el: "Βιομηχανία", en: "Manufacturing" } },
  { name: "Χαλκόρ", sector: { el: "Βιομηχανία", en: "Manufacturing" } },
  { name: "ΑΚΤΩΡ", logo: "aktor.jpg", sector: { el: "Κατασκευές", en: "Construction" } },
  { name: "Korinthos Power", sector: { el: "Ενέργεια", en: "Energy" } },
  { name: "WIND", logo: "wind.jpg", sector: { el: "Τηλεπικοινωνίες", en: "Telecommunications" } },
  { name: "Chandris (Hellas) Inc.", logo: "chandris.jpg", sector: { el: "Ναυτιλία", en: "Shipping" } },
  { name: "Neda Maritime Agency", sector: { el: "Ναυτιλία", en: "Shipping" } },
  { name: "Andriaki Shipping Co. Ltd", sector: { el: "Ναυτιλία", en: "Shipping" } },
  { name: "Επιτροπή Ανταγωνισμού", sector: { el: "Ρυθμιστική αρχή", en: "Regulator" } },
  { name: "ΚΕΠΕ", sector: { el: "Έρευνα", en: "Research" } },
  { name: "Ινστιτούτο Παστέρ", logo: "paster.jpg", sector: { el: "Έρευνα", en: "Research" } },
  { name: "Ωνάσειο Καρδιοχειρουργικό Κέντρο", logo: "onassis.jpg", sector: { el: "Υγεία", en: "Healthcare" } },
  { name: "Metropolitan Hospital", logo: "metropolitan.jpg", sector: { el: "Υγεία", en: "Healthcare" } },
  { name: "ΙΑΣΩ", logo: "iaso.jpg", sector: { el: "Υγεία", en: "Healthcare" } },
  { name: "Pharmathen", sector: { el: "Φαρμακευτικά", en: "Pharmaceuticals" } },
  { name: "Mediacube", sector: { el: "Μέσα", en: "Media" } },
  { name: "Citrine", sector: { el: "Υπηρεσίες", en: "Business services" } },
  { name: "InfoAccounting", sector: { el: "Υπηρεσίες", en: "Business services" } },
  { name: "Seagull", sector: { el: "Υπηρεσίες", en: "Business services" } },
];

/** Organisations funding scholarships, awards, conferences and events. */
export const sponsors: Partner[] = [
  { name: "WIND", logo: "wind.jpg", sector: { el: "Υποτροφίες", en: "Scholarships" } },
  { name: "Data Communication", sector: { el: "Υποτροφίες", en: "Scholarships" } },
  { name: "Ayvens", logo: "ayvens.png", sector: { el: "Χορηγός", en: "Sponsor" } },
  { name: "Datasite", logo: "datasite.jpg", sector: { el: "Χορηγός", en: "Sponsor" } },
  { name: "Κωτσόβολος", logo: "kotsovolos.jpg", sector: { el: "Χορηγός", en: "Sponsor" } },
  { name: "OTE Academy", logo: "oteacademy.jpg", sector: { el: "Χορηγός", en: "Sponsor" } },
  { name: "ΕΙΑΣ", logo: "eias.jpg", sector: { el: "Χορηγός", en: "Sponsor" } },
  { name: "iLeads", logo: "ileads.jpg", sector: { el: "Ερευνητικό εργαστήριο", en: "Research lab" } },
  { name: "Pashalidis Broken Hill", logo: "pashalidis.png", sector: { el: "Χορηγός", en: "Sponsor" } },
];

/** Academic partners abroad. */
export const academicPartners = [
  {
    name: "Stevens Institute of Technology — School of Business",
    country: { el: "ΗΠΑ", en: "USA" } satisfies I18n,
    logo: "stevens.png",
    note: {
      el: "Μνημόνιο συνεργασίας για εκπαιδευτική και ερευνητική συνεργασία, με βάση την ισοτιμία και την αμοιβαιότητα.",
      en: "Memorandum of understanding for educational and research cooperation on the basis of equality and reciprocity.",
    } satisfies I18n,
  },
];
