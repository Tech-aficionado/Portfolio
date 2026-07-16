"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Expertise", href: "#services", id: "services" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Work", href: "#lab", id: "lab" },
  { label: "Open Source", href: "#open-source", id: "open-source" },
];

export default function Header(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-paper/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink">
              Shivansh
            </span>
            <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-accent after:transition-all ${
                  active === item.id
                    ? "text-ink after:w-full"
                    : "text-muted hover:text-ink after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command palette"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="font-sans">⌘K</kbd>
            </button>

            <ThemeToggle />

            <Link
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-line"
          >
            <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-ink/80 hover:bg-paper-2 hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent transition-colors"
              >
                Get in touch →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
