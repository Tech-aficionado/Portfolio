"use client";

import { motion } from "framer-motion";
import { Code2, Server, Layers, Database } from "lucide-react";

interface Capability {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

const capabilities: Capability[] = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Frontend Development",
    description:
      "Accessible, responsive interfaces with clean component architecture and smooth, purposeful interactions.",
    skills: ["React", "Next.js", "Angular", "Tailwind CSS"],
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Backend Development",
    description:
      "Secure, well-structured RESTful APIs and services built for reliability and maintainable growth.",
    skills: ["Node.js", "Python", "REST APIs"],
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Databases & Cloud",
    description:
      "Efficient data modeling and query optimization, with cloud deployments that scale on demand.",
    skills: ["MySQL", "MongoDB", "AWS"],
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Full Stack Solutions",
    description:
      "End-to-end product delivery — from architecture and implementation through to deployment and iteration.",
    skills: ["TypeScript", "System Design", "CI/CD"],
  },
];

export default function Services(): React.JSX.Element {
  return (
    <section id="services" className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-accent">
                02 / Expertise
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-tight text-ink">
                What I <span className="italic">do</span>
              </h2>
              <p className="mt-5 text-base text-muted leading-relaxed max-w-xs">
                A focused set of capabilities I bring to every engagement,
                across the full product lifecycle.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl border border-line bg-paper p-6 sm:p-7 transition-all hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(23,19,14,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-paper">
                    {cap.icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {cap.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cap.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-ink/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
