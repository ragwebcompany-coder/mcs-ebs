import Link from "next/link";

import { href, type Locale } from "@/lib/i18n";

const copy = {
  el: {
    label: "Αίτηση στο ΠΜΣ",
    title: "Κάνε αίτηση",
    meta: "Online υποβολή",
  },
  en: {
    label: "Apply to the MSc",
    title: "Apply now",
    meta: "Online submission",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ApplyDock({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Link
      href={href(locale, "admissions")}
      aria-label={t.label}
      data-print="hide"
      className="fixed right-4 bottom-4 z-45 flex min-h-14 items-center gap-3 border border-brass-lit/45 bg-brass px-4 py-3 text-abyss shadow-[0_18px_55px_-18px_rgba(227,190,114,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-lit sm:right-6 sm:bottom-6 md:right-8 md:bottom-8"
    >
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center border border-abyss/25 text-lg leading-none"
      >
        →
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold">{t.title}</span>
        <span className="annot mt-1.5 block text-[0.52rem] text-abyss/65">
          {t.meta}
        </span>
      </span>
    </Link>
  );
}
