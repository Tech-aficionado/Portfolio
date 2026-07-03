"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "lab", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav(): React.JSX.Element {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            aria-label={`Go to ${label}`}
            aria-current={isActive}
            className="group flex items-center gap-2"
          >
            <span
              className={`text-xs font-medium opacity-0 transition-all duration-200 group-hover:opacity-100 ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              {label}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-accent"
                  : "h-2 w-2 bg-ink/25 group-hover:bg-ink/50"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
