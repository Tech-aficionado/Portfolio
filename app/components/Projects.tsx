"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";
import { PROJECTS as featuredProjects } from "../portfolio-data";

export default function Projects(): React.JSX.Element {
  return (
    <section id="lab" className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20 max-w-2xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            04 / Lab
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-medium leading-tight text-ink">
            Selected <span className="italic">works</span>
          </h2>
        </motion.div>

        <div className="space-y-16 sm:space-y-28">
          {featuredProjects.map((project, index) => {
            const flip = index % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-60px" }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image */}
                <div
                  className={`lg:col-span-7 ${
                    flip ? "lg:order-2" : "lg:order-1"
                  }`}
                  style={{ perspective: 1200 }}
                >
                  <TiltCard className="rounded-2xl">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block relative w-full aspect-video rounded-2xl overflow-hidden border border-line bg-paper-2 shadow-[0_20px_50px_rgba(23,19,14,0.08)]"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) calc(100vw - 2rem), 640px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </TiltCard>
                </div>

                {/* Text */}
                <div
                  className={`lg:col-span-5 ${
                    flip ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-line" />
                    <span className="text-xs uppercase tracking-[0.25em] text-muted">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-ink">
                    {project.title}
                  </h3>
                  <div className="mt-5 border-l-2 border-accent/60 pl-4 sm:pl-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                      Outcome
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-muted sm:text-lg">
                      {project.outcome}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-paper-2/50 px-3 py-1 text-xs font-medium text-ink/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
                        aria-label={`Visit ${project.title}`}
                      >
                        <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
                          View live site
                        </span>
                        <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                          ↗
                        </span>
                      </a>
                    )}
                    {project.sourceLink && (
                      <a
                        href={project.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-muted"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <span className="border-b border-line pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
                          View source
                        </span>
                        <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                          ↗
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
