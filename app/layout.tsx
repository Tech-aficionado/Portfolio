import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

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
  title: "Shivansh Goel - Full Stack Developer",
  description: "A passionate Full Stack Developer and Software Engineer. Creating meaningful and robust digital solutions.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Shivansh Goel",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
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
    title: "Shivansh Goel - Full Stack Developer",
    description: "A passionate Full Stack Developer and Software Engineer. Creating meaningful and robust digital solutions.",
    siteName: "Shivansh Goel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivansh Goel - Full Stack Developer",
    description: "A passionate Full Stack Developer and Software Engineer.",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shivansh Goel",
              jobTitle: "Full Stack Developer",
              description:
                "A passionate Full Stack Developer and Software Engineer creating robust, user-centric digital solutions.",
              email: "mailto:shivansh.goela12@gmail.com",
              url: "https://ash-labs.tech",
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "AWS",
              ],
              sameAs: [
                "https://github.com/Tech-aficionado",
                "https://www.linkedin.com/in/shivansh-goel-5b2309174/",
                "https://www.instagram.com/shivanxx.__/",
              ],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
