import Link from "next/link";
import { site } from "@/content/site";
import { navigation } from "@/lib/nav";
import { href, type Locale } from "@/lib/i18n";

const copy = {
  el: {
    secretariat: "Γραμματεία ΠΜΣ",
    director: "Διευθυντής",
    resources: "Υποδομές",
    vpn: "Υπηρεσία VPN",
    library: "Βιβλιοθήκη",
    seminars: "Σεμινάρια Τμήματος",
    links: "Χρήσιμοι σύνδεσμοι",
    university: "Πανεπιστήμιο Πειραιώς",
    department: "Τμήμα Οικονομικής Επιστήμης",
    alumniPortal: "Πύλη Αποφοίτων",
    rights:
      "Πανεπιστήμιο Πειραιώς — Τμήμα Οικονομικής Επιστήμης. Με την επιφύλαξη παντός νομίμου δικαιώματος.",
    follow: "Ακολουθήστε μας",
    sitemapNote: "Χάρτης ιστοσελίδας",
  },
  en: {
    secretariat: "Programme Secretariat",
    director: "Director",
    resources: "Facilities",
    vpn: "VPN service",
    library: "Library",
    seminars: "Department seminars",
    links: "Useful links",
    university: "University of Piraeus",
    department: "Department of Economics",
    alumniPortal: "Alumni Portal",
    rights:
      "University of Piraeus — Department of Economics. All rights reserved.",
    follow: "Follow us",
    sitemapNote: "Sitemap",
  },
} satisfies Record<Locale, Record<string, string>>;

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const address = site.contact.address;
  const secretariat = site.contact.secretariat;

  return (
    <footer className="relative border-t border-piraeus/30 bg-abyss">
      {/* The chart lattice, at the quietest weight on the page */}
      <div
        aria-hidden="true"
        className="latticed pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Identity + contact */}
          <div className="lg:col-span-4">
            <p className="annot text-brass">{t.university}</p>
            <p className="mt-4 max-w-xs font-display text-2xl leading-tight font-semibold text-lume">
              {site.name[locale]}
            </p>

            <address className="mt-8 space-y-1.5 text-sm leading-relaxed text-lume-dim not-italic">
              <p className="font-medium text-lume">{t.secretariat}</p>
              <p>{secretariat.name[locale]}</p>
              <p>{secretariat.office[locale]}</p>
              <p>{locale === "el" ? address.street : address.streetEn}</p>
              <p>
                {address.postalCode} {address.city[locale]}, {address.country[locale]}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${secretariat.phone}`}
                  className="link-plot hover:text-brass"
                >
                  {secretariat.phoneDisplay}
                </a>
                {" · "}
                <a
                  href={`tel:${secretariat.mobile}`}
                  className="link-plot hover:text-brass"
                >
                  {secretariat.mobileDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${secretariat.email}`}
                  className="link-plot text-brass"
                >
                  {secretariat.email}
                </a>
              </p>
            </address>

            <div className="mt-8">
              <p className="annot mb-3 text-lume-faint">{t.follow}</p>
              <ul className="flex gap-5 text-sm">
                <li>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-plot text-lume-dim hover:text-brass"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-plot text-lume-dim hover:text-brass"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-plot text-lume-dim hover:text-brass"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sitemap */}
          <nav
            aria-label={t.sitemapNote}
            className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-4"
          >
            {navigation.map((group) => (
              <div key={group.label.en}>
                <p className="annot mb-4 text-brass">{group.label[locale]}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.route}>
                      <Link
                        href={href(locale, link.route)}
                        className="link-plot text-sm text-lume-dim hover:text-lume"
                      >
                        {link.label[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* External resources */}
          <div className="lg:col-span-2">
            <p className="annot mb-4 text-brass">{t.resources}</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: t.university, url: site.external.university },
                { label: t.department, url: site.external.department },
                { label: t.library, url: site.external.library },
                { label: t.vpn, url: site.external.vpn },
                { label: t.seminars, url: site.external.seminars },
                { label: t.links, url: site.external.links },
                { label: t.alumniPortal, url: site.social.alumni },
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-plot text-lume-dim hover:text-lume"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-16 flex flex-col gap-4 border-t border-piraeus/25 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-lume-faint">
            © {new Date().getFullYear()} {t.rights}
          </p>

          <p className="text-xs text-lume-faint">
            Made by{" "}
            <a
              href="https://braingroup.tech/?utm_source=client-site&utm_medium=footer&utm_campaign=made-by"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-brass"
            >
              BRAIN GROUP
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
