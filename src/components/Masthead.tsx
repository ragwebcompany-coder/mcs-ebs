"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/lib/nav";
import { href, locales, type Locale } from "@/lib/i18n";

const copy = {
  el: {
    apply: "Αίτηση",
    applyNow: "Κάνε αίτηση τώρα",
    menu: "Μενού",
    close: "Κλείσιμο",
    skip: "Μετάβαση στο περιεχόμενο",
    home: "Αρχική",
    brandTop: "Πανεπιστήμιο Πειραιώς",
    brandMain: "Οικονομική & Επιχειρησιακή Στρατηγική",
    brandSub: "ΠΜΣ · Τμήμα Οικονομικής Επιστήμης",
  },
  en: {
    apply: "Apply",
    applyNow: "Apply now",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    home: "Home",
    brandTop: "University of Piraeus",
    brandMain: "Economic & Business Strategy",
    brandSub: "MSc · Department of Economics",
  },
} satisfies Record<Locale, Record<string, string>>;

export function Masthead({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const t = copy[locale];

  // Menus close where they are dismissed — on link activation, Escape, or an
  // outside click — rather than by reacting to the pathname after the fact.
  const closeMenus = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss the open mega-menu on Escape or an outside click.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /** Swaps only the locale segment, keeping the reader where they are. */
  const switchLocaleHref = (target: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return rest ? `/${target}/${rest}` : `/${target}`;
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-brass focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-abyss"
      >
        {t.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen || openGroup !== null
            ? "border-b border-piraeus/30 bg-abyss/95 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav ref={navRef} aria-label={t.menu}>
          <div className="mx-auto flex h-18 w-full max-w-[110rem] items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
            {/* Brand */}
            <Link
              href={href(locale, "home")}
              onClick={closeMenus}
              className="group flex min-w-0 shrink-0 items-center gap-3.5"
            >
              <span
                aria-hidden="true"
                className="relative grid h-12 w-10 shrink-0 place-items-center overflow-hidden border border-brass/35 bg-abyss/60 p-1 shadow-[0_0_30px_-16px_rgba(227,190,114,0.9)] transition-colors duration-300 group-hover:border-brass"
              >
                <Image
                  src="/media/brand/ebs-logo-mark.png"
                  alt=""
                  width={40}
                  height={48}
                  priority
                  className="h-full w-auto object-contain"
                />
              </span>
              <span className="hidden min-w-0 leading-none sm:block">
                <span className="annot block text-[0.58rem] text-lume-faint">
                  {t.brandTop}
                </span>
                <span className="mt-1.5 block font-display text-[0.95rem] font-semibold tracking-tight text-lume">
                  {t.brandMain}
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navigation.map((group, index) => {
                const isOpen = openGroup === index;
                return (
                  <li key={group.label.en} className="relative">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${menuId}-${index}`}
                      onClick={() => setOpenGroup(isOpen ? null : index)}
                      onMouseEnter={() => setOpenGroup(index)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                        isOpen ? "text-brass" : "text-lume-dim hover:text-lume"
                      }`}
                    >
                      {group.label[locale]}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 6"
                        className={`h-1.5 w-2.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex" role="group">
                {locales.map((option) => (
                  <Link
                    key={option}
                    href={switchLocaleHref(option)}
                    hrefLang={option}
                    onClick={closeMenus}
                    aria-current={option === locale ? "true" : undefined}
                    className={`annot px-2 py-1.5 transition-colors duration-200 ${
                      option === locale
                        ? "text-brass"
                        : "text-lume-faint hover:text-lume"
                    }`}
                  >
                    {option}
                  </Link>
                ))}
              </div>

              <Link
                href={href(locale, "admissions")}
                onClick={closeMenus}
                className="hidden border border-brass-lit/40 bg-brass px-5 py-2.5 text-sm font-semibold text-abyss shadow-[0_0_30px_-12px_rgba(227,190,114,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-lit sm:inline-flex sm:items-center sm:gap-2"
              >
                <span className="hidden xl:inline">{t.applyNow}</span>
                <span className="xl:hidden">{t.apply}</span>
                <span aria-hidden="true">→</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? t.close : t.menu}
                className="grid size-10 place-items-center text-lume lg:hidden"
              >
                <span className="relative block h-3.5 w-6">
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                      mobileOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute top-1.5 left-0 block h-px w-full bg-current transition-opacity duration-200 ${
                      mobileOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                      mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Mega-menu */}
          {navigation.map((group, index) => (
            <div
              key={group.label.en}
              id={`${menuId}-${index}`}
              hidden={openGroup !== index}
              onMouseLeave={() => setOpenGroup(null)}
              className="hidden border-t border-piraeus/25 bg-abyss/98 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto grid w-full max-w-[110rem] gap-x-10 gap-y-6 px-6 py-10 sm:px-8 lg:grid-cols-3 lg:px-12 xl:grid-cols-4">
                {group.links.map((link) => (
                  <Link
                    key={link.route}
                    href={href(locale, link.route)}
                    onClick={closeMenus}
                    className="group border-t border-piraeus/30 pt-4 transition-colors duration-300 hover:border-brass"
                  >
                    <span className="block font-display text-base font-semibold text-lume transition-colors duration-200 group-hover:text-brass">
                      {link.label[locale]}
                    </span>
                    {link.hint ? (
                      <span className="mt-1.5 block text-sm leading-snug text-lume-faint">
                        {link.hint[locale]}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        hidden={!mobileOpen}
        className="fixed inset-0 top-18 z-40 overflow-y-auto bg-abyss lg:hidden"
      >
        <div className="px-6 py-8 sm:px-8">
          {navigation.map((group) => (
            <div key={group.label.en} className="mb-9">
              <p className="annot mb-4 text-brass">{group.label[locale]}</p>
              <ul className="space-y-0">
                {group.links.map((link) => (
                  <li key={link.route}>
                    <Link
                      href={href(locale, link.route)}
                      onClick={closeMenus}
                      className="block border-t border-piraeus/25 py-3.5 font-display text-lg text-lume"
                    >
                      {link.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex items-center gap-4 border-t border-piraeus/25 pt-6">
            <Link
              href={href(locale, "admissions")}
              onClick={closeMenus}
              className="flex-1 border border-brass-lit/40 bg-brass px-5 py-3.5 text-center text-sm font-semibold text-abyss shadow-[0_0_30px_-14px_rgba(227,190,114,0.9)]"
            >
              {t.applyNow}
            </Link>
            <div className="flex items-center gap-1">
              {locales.map((option) => (
                <Link
                  key={option}
                  href={switchLocaleHref(option)}
                  hrefLang={option}
                  onClick={closeMenus}
                  className={`annot px-3 py-2.5 ${
                    option === locale ? "text-brass" : "text-lume-faint"
                  }`}
                >
                  {option}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
