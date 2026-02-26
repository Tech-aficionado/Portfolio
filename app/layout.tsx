import type { Metadata, Viewport } from "next";
import { Poppins, Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const signatureFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivansh Goel - Full Stack Developer",
  description: "A passionate Full Stack Developer and Software Engineer. Creating meaningful and robust digital solutions.",
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
    url: "https://shivanshgoel.com",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ibiimemon.com" />
      </head>
      <body
        className={`${poppins.variable} ${signatureFont.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
