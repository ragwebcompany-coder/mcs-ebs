import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { locales, type Locale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MSc in Economic & Business Strategy — University of Piraeus";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The share card carries the same chart grammar as the site: rhumb lines from a
 * fixed point, brass on deep navy. Rendered with system-safe geometry only, so
 * no font file has to be fetched at build time.
 */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (locales.includes(locale as Locale) ? locale : "el") as Locale;

  const rhumbs = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2;
    return {
      x2: 150 + Math.cos(angle) * 900,
      y2: 700 + Math.sin(angle) * 900,
    };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05121f",
          padding: "68px 72px",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {rhumbs.map((line, index) => (
            <line
              key={index}
              x1="150"
              y1="700"
              x2={line.x2}
              y2={line.y2}
              stroke="#1b5c93"
              strokeWidth="1"
              opacity="0.45"
            />
          ))}
          {[180, 320, 470, 640].map((r) => (
            <circle
              key={r}
              cx="150"
              cy="700"
              r={r}
              fill="none"
              stroke="#1b5c93"
              strokeWidth="1"
              opacity="0.32"
            />
          ))}
          <path
            d="M 150 700 C 340 560, 520 470, 700 430 S 1000 330, 1140 210"
            fill="none"
            stroke="#c4972f"
            strokeWidth="3"
          />
          <circle cx="700" cy="430" r="8" fill="none" stroke="#e3be72" strokeWidth="3" />
          <circle cx="1140" cy="210" r="8" fill="none" stroke="#e3be72" strokeWidth="3" />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.2em",
            color: "#c4972f",
            textTransform: "uppercase",
          }}
        >
          {l === "el"
            ? "Πανεπιστήμιο Πειραιώς · Τμήμα Οικονομικής Επιστήμης"
            : "University of Piraeus · Department of Economics"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#e8eef3",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {l === "el"
              ? "Οικονομική & Επιχειρησιακή Στρατηγική"
              : "Economic & Business Strategy"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              color: "#9db3c4",
            }}
          >
            {l === "el"
              ? "Πρόγραμμα Μεταπτυχιακών Σπουδών (M.Sc.) · από το 2006"
              : "Master of Science (M.Sc.) · since 2006"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 44,
            fontSize: 22,
            color: "#e3be72",
            borderTop: "1px solid rgba(27,92,147,0.5)",
            paddingTop: 24,
          }}
        >
          <span>
            {site.facts.semesters} {l === "el" ? "εξάμηνα" : "semesters"}
          </span>
          <span>{site.facts.ectsTotal} ECTS</span>
          <span>
            {l === "el" ? "Υβριδικό" : "Hybrid"}
          </span>
          <span>msc-ebs.gr</span>
        </div>
      </div>
    ),
    size,
  );
}
