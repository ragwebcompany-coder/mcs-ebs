import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // The project sits inside a Google Drive folder; pin the workspace root so
  // Turbopack does not walk up and find an unrelated lockfile.
  turbopack: { root: import.meta.dirname },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // The bare root has no content of its own; Greek is the primary audience.
      { source: "/", destination: "/el", permanent: false },

      // Preserve inbound links and accumulated authority from the WordPress site.
      { source: "/domi", destination: "/el/programme", permanent: true },
      { source: "/courses", destination: "/el/courses", permanent: true },
      { source: "/professors", destination: "/el/faculty", permanent: true },
      { source: "/scholarships", destination: "/el/scholarships", permanent: true },
      { source: "/intership-program", destination: "/el/internship", permanent: true },
      { source: "/job-prospects", destination: "/el/careers", permanent: true },
      { source: "/pyli-apofoiton-alumni", destination: "/el/alumni", permanent: true },
      { source: "/announcements", destination: "/el/news", permanent: true },
      { source: "/gallery", destination: "/el/gallery", permanent: true },
      { source: "/apply-2", destination: "/el/admissions", permanent: true },
      { source: "/contact", destination: "/el/contact", permanent: true },
      { source: "/curriculum", destination: "/en/courses", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Fingerprinted media never changes under the same name.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
