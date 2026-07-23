"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import LocalTime from "./LocalTime";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shivanxx.__/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    label: "GitHub",
    href: "https://github.com/Tech-aficionado",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shivansh-goel-5b2309174/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Hashnode",
    href: "https://tech-aficionado.hashnode.dev",
    path: "M22.351 8.019l-6.37-6.37a5.63 5.63 0 00-7.962 0l-6.37 6.37a5.63 5.63 0 000 7.962l6.37 6.37a5.63 5.63 0 007.962 0l6.37-6.37a5.63 5.63 0 000-7.962zM12 15.953a3.953 3.953 0 110-7.906 3.953 3.953 0 010 7.906z",
  },
  {
    label: "DEV Community",
    href: "https://dev.to/tech-aficionado",
    path: "M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.34l1.65-.03v1.6zm4.65 5.16c-.24.61-.32.71-.69.71-.38 0-.45-.1-.7-.71-.14-.36-.55-1.62-.89-2.79l-.63-2.12h.75c.42 0 .75.03.75.06 0 .12.58 2.2.69 2.5.06.16.12.33.13.38.02.05.32-.9.68-2.03l.65-2.06.7-.03c.42-.02.72 0 .72.05 0 .07-1.28 4.09-1.58 4.98z",
  },
];

export default function Footer(): React.JSX.Element {
  return (
    <footer
      id="contact"
      className="relative bg-ink text-paper px-4 sm:px-6 pt-24 pb-10 sm:pt-32 rounded-t-[2.5rem] mt-10"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — pitch + direct links */}
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              05 / Contact
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mt-5 font-display text-4xl sm:text-6xl font-medium leading-[1.05] sm:leading-[1] text-paper"
            >
              Let&apos;s build
              <br />
              something <span className="italic text-accent">great.</span>
            </motion.h2>

            <p className="mt-6 text-base sm:text-lg text-paper/70 max-w-md leading-relaxed">
              Have a project in mind? Drop a message and I&apos;ll get back to
              you — or reach out directly.
            </p>

            <a
              href="mailto:shivansh.goela12@gmail.com"
              className="group mt-6 inline-flex max-w-full flex-wrap items-center gap-2 font-display text-lg sm:text-2xl text-paper hover:text-accent transition-colors break-all"
            >
              shivansh.goela12@gmail.com
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <div className="mt-6">
              <LocalTime />
            </div>

            {/* Socials */}
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2.5 text-sm text-paper/80 hover:border-accent hover:text-accent transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — working contact form */}
          <div className="lg:pt-10">
            <ContactForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-paper/10 pt-8">
          <p className="text-sm text-paper/50">
            © {new Date().getFullYear()} Shivansh Goel. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href="/llms.txt"
              className="text-sm text-paper/50 hover:text-paper transition-colors"
              title="Plain-text summary for AI tools"
            >
              llms.txt
            </a>
            <a
              href="/api/profile"
              className="text-sm text-paper/50 hover:text-paper transition-colors"
              title="Profile data as JSON"
            >
              API
            </a>
            <a
              href="#home"
              className="text-sm text-paper/50 hover:text-paper transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
