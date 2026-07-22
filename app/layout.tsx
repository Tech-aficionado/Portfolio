import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import {
  KNOWS_ABOUT,
  PROFILE,
  PROJECTS,
  SITE_URL,
  SOCIAL_LINKS,
} from "./portfolio-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ash-labs.tech"),
  title: "Shivansh Goel — AI Product Engineer & Full Stack Developer",
  description:
    "AI Product Engineer and Full Stack Developer building dependable AI-enabled products with Next.js, Python, and cloud infrastructure.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Shivansh Goel",
    "AI Product Engineer",
    "Applied AI Developer",
    "Full Stack Developer",
    "Machine Learning Developer",
    "Python Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "Shivansh Goel" }],
  creator: "Shivansh Goel",
  publisher: "Shivansh Goel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ash-labs.tech",
    title: "Shivansh Goel — AI Product Engineer",
    description:
      "Building dependable AI products for the real world with full-stack engineering.",
    siteName: "Shivansh Goel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivansh Goel — AI Product Engineer",
    description:
      "Building dependable AI products for the real world with full-stack engineering.",
  },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f4f1e9",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PROFILE.name,
      jobTitle: PROFILE.headline,
      description: PROFILE.summary,
      email: `mailto:${PROFILE.email}`,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressCountry: PROFILE.location.country,
      },
      knowsAbout: KNOWS_ABOUT,
      sameAs: SOCIAL_LINKS.map((link) => link.url),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PROFILE.name} Portfolio`,
      description: PROFILE.summary,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    ...PROJECTS.map((project) => ({
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: project.tag,
      description: project.outcome,
      url: project.link ?? SITE_URL,
      ...(project.sourceLink ? { codeRepository: project.sourceLink } : {}),
      operatingSystem: "Web",
      author: { "@id": `${SITE_URL}/#person` },
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
