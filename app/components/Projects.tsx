"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";

interface Project {
  id: number;
  title: string;
  tag: string;
  outcome: string;
  image: string;
  stack: string[];
  link?: string;
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Ziplink",
    tag: "URL Shortener · SaaS",
    outcome:
      "Turns long URLs into trackable, brand-ready links that are easier to distribute across campaigns. QR downloads and edge redirects shorten the path from share to destination, while analytics make each link measurable.",
    stack: ["Next.js", "Firebase", "Edge Redirects"],
    link: "https://ziplink.ash-labs.tech",
    image: "/assets/ziplink.png",
  },
  {
    id: 2,
    title: "GhostRelay",
    tag: "Privacy · SaaS",
    outcome:
      "Keeps a real inbox out of sign-up forms by routing messages through disposable aliases. If an alias attracts spam, it can be disabled without changing the primary address — giving users a practical containment layer.",
    stack: ["Cloudflare Workers", "D1", "Next.js", "React 19", "Resend"],
    link: "https://ghostrelay.me",
    image: "/assets/ghostrelay.png",
  },
  {
    id: 3,
    title: "FiTrack AI",
    tag: "AI · Fitness",
    outcome:
      "Brings workout, nutrition, and recovery signals into one adaptive flow. AI-guided intensity, macro breakdowns, and fatigue-aware recommendations reduce the manual work of reconciling separate fitness trackers.",
    stack: ["Next.js", "Python", "Machine Learning"],
    link: "https://fitrack-ai.ash-labs.tech/",
    image: "/assets/image 3.png",
  },
  {
    id: 4,
    title: "Quizify",
    tag: "AI · Education",
    outcome:
      "Turns a topic into a ready-to-run assessment in seconds, reducing manual question writing. Instant explanations and mastery tracking show learners what to review next, while classroom codes make sharing straightforward.",
    stack: ["Next.js", "React", "AI"],
    link: "https://quizify.ash-labs.tech",
    image: "/assets/image 2.png",
  },
];

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

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink"
                      aria-label={`Visit ${project.title}`}
                    >
                      <span className="border-b border-ink/30 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                        View live site
                      </span>
                      <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
