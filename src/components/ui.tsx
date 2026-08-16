import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  wide,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${wide ? "max-w-[110rem]" : "max-w-[82rem]"} ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  tone = "abyss",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "abyss" | "deep" | "light" | "none";
  id?: string;
}) {
  const tones = {
    abyss: "bg-abyss text-lume",
    deep: "bg-deep text-lume",
    light: "bg-foam text-deep",
    none: "",
  } as const;

  return (
    <section id={id} className={`relative py-20 md:py-28 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

/**
 * A chart annotation. Carries a number when the thing it labels is one of a
 * counted sequence, and nothing when it is not — never a decorative "01".
 */
export function Annot({
  children,
  index,
  tone = "brass",
  className = "",
}: {
  children: ReactNode;
  index?: string;
  tone?: "brass" | "dim" | "signal";
  className?: string;
}) {
  const tones = {
    brass: "text-brass",
    dim: "text-lume-faint",
    signal: "text-signal",
  } as const;

  return (
    <p className={`annot flex items-center gap-3 ${tones[tone]} ${className}`}>
      {index ? (
        <span className="tabular-nums opacity-70">{index}</span>
      ) : null}
      <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
      {children}
    </p>
  );
}

/** A plotted figure: a real number, set in the data face. */
export function Sounding({
  value,
  label,
  note,
  tone = "dark",
}: {
  value: string;
  label: string;
  note?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`border-t pt-5 ${tone === "dark" ? "border-piraeus/40" : "border-deep/20"}`}
    >
      <p className="sounding text-4xl leading-none font-semibold text-brass md:text-5xl">
        {value}
      </p>
      <p
        className={`mt-3 text-sm leading-snug font-medium ${tone === "dark" ? "text-lume" : "text-deep"}`}
      >
        {label}
      </p>
      {note ? (
        <p
          className={`mt-1.5 text-xs leading-relaxed ${tone === "dark" ? "text-lume-faint" : "text-deep/55"}`}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300";
  const variants = {
    primary:
      "bg-brass text-abyss hover:bg-brass-lit hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(196,151,47,0.6)]",
    ghost:
      "border border-piraeus/60 text-lume hover:border-brass hover:text-brass hover:-translate-y-0.5",
    quiet: "border border-deep/25 text-deep hover:border-brass hover:text-brass",
  } as const;

  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </Link>
  );
}

/** Section heading with its annotation, used across every interior page. */
export function Heading({
  annot,
  title,
  lede,
  tone = "dark",
  className = "",
}: {
  annot?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {annot ? <Annot className="mb-6">{annot}</Annot> : null}
      <h2
        className={`text-display leading-[1.05] ${tone === "dark" ? "text-lume" : "text-deep"}`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`text-lede mt-6 leading-relaxed ${tone === "dark" ? "text-lume-dim" : "text-deep/70"}`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Long-form body copy. */
export function Prose({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`text-lede space-y-5 leading-[1.75] ${tone === "dark" ? "text-lume-dim" : "text-deep/75"} ${className}`}
    >
      {children}
    </div>
  );
}
