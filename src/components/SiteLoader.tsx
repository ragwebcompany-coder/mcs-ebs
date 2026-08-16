"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Locale } from "@/lib/i18n";

const copy = {
  el: {
    label: "Φόρτωση ιστοσελίδας",
    text: "Economic & Business Strategy",
  },
  en: {
    label: "Loading website",
    text: "Economic & Business Strategy",
  },
} satisfies Record<Locale, Record<string, string>>;

export function SiteLoader({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(true);
  const t = copy[locale];

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label={t.label}
      className="site-loader fixed inset-0 z-100 grid place-items-center bg-abyss"
    >
      <div className="relative grid place-items-center">
        <div className="loader-halo absolute size-48 rounded-full border border-brass/25" />
        <div className="loader-grid absolute size-64 opacity-50" aria-hidden="true" />
        <Image
          src="/media/brand/ebs-logo-mark.png"
          alt=""
          width={138}
          height={163}
          priority
          className="loader-logo relative h-auto w-28 drop-shadow-[0_0_28px_rgba(227,190,114,0.32)] sm:w-32"
        />
        <p className="annot mt-8 text-center text-brass">{t.text}</p>
      </div>
    </div>
  );
}
