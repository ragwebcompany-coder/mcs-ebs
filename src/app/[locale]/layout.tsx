import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Literata, Commissioner, JetBrains_Mono } from "next/font/google";
import "../globals.css";

import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { htmlLang, locales, type Locale } from "@/lib/i18n";
import {
  graph,
  organizationNode,
  departmentNode,
  programmeNode,
  websiteNode,
  placeNode,
} from "@/lib/schema";

/*
  This is the root layout. It sits under the [locale] dynamic segment so that
  `lang` and `dir` can be set from the route — the pattern Next documents for
  internationalisation. There is deliberately no app/layout.tsx above it.
*/

// Greek is the primary script here, so every face is subset for it explicitly.
const literata = Literata({
  subsets: ["greek", "latin"],
  variable: "--font-literata",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const commissioner = Commissioner({
  subsets: ["greek", "latin"],
  variable: "--font-commissioner",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["greek", "latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#05121f",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const typed = locale as Locale;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.nameFull[typed]} — ${site.university[typed]}`,
      template: `%s`,
    },
    description: site.description[typed],
    applicationName: site.shortName,
    authors: [{ name: site.university[typed], url: site.external.university }],
    creator: site.university[typed],
    publisher: site.university[typed],
    formatDetection: { telephone: true, address: true, email: true },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: "/apple-icon.png",
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const typed = locale as Locale;

  return (
    <html
      lang={htmlLang[typed]}
      className={`${literata.variable} ${commissioner.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        {/* Site-wide entity graph: university → department → programme. */}
        <JsonLd
          data={graph(
            organizationNode(typed),
            departmentNode(typed),
            programmeNode(typed),
            websiteNode(typed),
            placeNode(typed),
          )}
        />

        <Masthead locale={typed} />
        <main id="main">{children}</main>
        <Footer locale={typed} />
      </body>
    </html>
  );
}
