"use client";

import { motion } from "framer-motion";
import AnimatedTechSphere from "./AnimatedTechSphere";

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 bg-paper-2/40 border-y border-line">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-accent">
                01 / About
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-tight text-ink">
                The <span className="italic">mission</span>
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] leading-[1.35] text-ink"
            >
              I empower businesses and startups by delivering{" "}
              <span className="text-accent italic">
                robust, user-centric web solutions
              </span>{" "}
              that drive engagement and growth — turning ambitious ideas into
              polished, dependable products.
            </motion.p>

            <div className="mt-14">
              <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">
                Tools & technologies
              </p>
              <AnimatedTechSphere />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
