"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Full Stack Developer — Intern",
    company: "TedForge Solutions Pvt. Ltd.",
    period: "Dec 2023 – May 2025",
    description:
      "Spearheaded the development of high-performance web applications. Built scalable frontend components with React & Angular, while architecting secure and efficient RESTful APIs using Node.js. Optimized database queries in MySQL and MongoDB, significantly improving data retrieval speeds and overall system responsiveness.",
    stack: ["React", "Angular", "Node.js", "MySQL", "MongoDB"],
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Section label */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-accent">
                03 / Experience
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-tight text-ink">
                Where I&apos;ve
                <br />
                <span className="italic">worked</span>
              </h2>
            </motion.div>
          </div>

          {/* Entries */}
          <div className="lg:col-span-8">
            {experiences.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink group-hover:text-accent transition-colors">
                    {item.role}
                  </h3>
                  <span className="text-sm text-muted whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <p className="mt-1 text-base font-medium text-accent">
                  {item.company}
                </p>

                <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted max-w-2xl">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-paper-2/50 px-3 py-1 text-xs font-medium text-ink/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
