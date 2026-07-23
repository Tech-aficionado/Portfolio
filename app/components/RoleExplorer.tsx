"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ROLES } from "../portfolio-data";
import ResumeViewer from "./ResumeViewer";

export default function RoleExplorer(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(ROLES[0].id);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Honor a ?role= deep link on load (client-only to avoid a hydration mismatch).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("role");
    if (requested && ROLES.some((role) => role.id === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveId(requested);
    }
  }, []);

  const selectRole = useCallback((id: string) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("role", id);
    window.history.replaceState(null, "", `${url.pathname}${url.search}#roles`);
  }, []);

  const active = ROLES.find((role) => role.id === activeId) ?? ROLES[0];

  return (
    <section
      id="roles"
      className="px-4 py-20 sm:px-6 sm:py-32"
      aria-labelledby="roles-title"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Hiring? Explore by role
          </p>
          <h2
            id="roles-title"
            className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl"
          >
            Pick the role you&apos;re <span className="italic">hiring for.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            The same work, framed for the role you need. Choose a track to see
            tailored positioning and download a résumé built for it.
          </p>
        </div>

        {/* Role tabs */}
        <div
          role="tablist"
          aria-label="Roles"
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {ROLES.map((role) => {
            const isActive = role.id === active.id;
            return (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectRole(role.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {role.title}
              </button>
            );
          })}
        </div>

        {/* Active role panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-8 grid gap-8 rounded-[1.75rem] border border-line bg-paper-2/40 p-6 sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <p className="font-display text-2xl font-medium text-ink sm:text-3xl">
                {active.title}
              </p>
              <p className="mt-1 text-sm font-medium text-accent">
                {active.blurb}
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {active.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setViewerOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                  aria-label={`Preview the ${active.title} résumé`}
                >
                  Preview résumé
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
                <a
                  href={active.resumeUrl}
                  download
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                  aria-label={`Download the ${active.title} résumé (PDF)`}
                >
                  Download PDF
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  Reach out about this role →
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Focus areas
              </p>
              <ul className="mt-4 space-y-2.5">
                {active.focus.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-ink/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Core skills
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewerOpen ? (
          <ResumeViewer
            key="resume-viewer"
            url={active.resumeUrl}
            title={active.title}
            onClose={() => setViewerOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
