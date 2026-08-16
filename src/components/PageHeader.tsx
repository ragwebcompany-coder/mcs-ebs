import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui";
import { href, type Locale, type RouteKey } from "@/lib/i18n";

export interface Crumb {
  label: string;
  route: RouteKey;
  slug?: string;
}

export function Breadcrumbs({
  locale,
  trail,
}: {
  locale: Locale;
  trail: Crumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="annot flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-lume-faint">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={`${crumb.route}-${crumb.slug ?? ""}`} className="flex items-center gap-2.5">
              {isLast ? (
                <span className="text-brass">{crumb.label}</span>
              ) : (
                <>
                  <Link
                    href={href(locale, crumb.route, crumb.slug)}
                    className="transition-colors hover:text-lume"
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="opacity-40">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The standard interior-page opening. The `answer` slot is deliberate: every
 * page states its subject in one self-contained, quotable sentence directly
 * under the H1 — the shape both a hurried reader and a language model extract.
 */
export function PageHeader({
  locale,
  trail,
  annot,
  title,
  answer,
  meta,
  children,
}: {
  locale: Locale;
  trail: Crumb[];
  annot?: string;
  title: string;
  answer: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-piraeus/25 bg-deep pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        aria-hidden="true"
        className="isobath pointer-events-none absolute inset-0 opacity-40"
        style={{ "--isobath-x": "82%", "--isobath-y": "18%" } as React.CSSProperties}
      />

      <Container wide className="relative">
        <Breadcrumbs locale={locale} trail={trail} />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {annot ? <p className="annot mb-6 text-brass">{annot}</p> : null}
            <h1 className="text-display leading-[1.04] text-lume">{title}</h1>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-lede leading-relaxed text-lume-dim">{answer}</p>

            {meta?.length ? (
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
                {meta.map((item) => (
                  <div key={item.label} className="border-t border-piraeus/40 pt-3">
                    <dt className="annot text-lume-faint">{item.label}</dt>
                    <dd className="sounding mt-2 text-lg font-semibold text-brass">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>

        {children}
      </Container>
    </header>
  );
}
