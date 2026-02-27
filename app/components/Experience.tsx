"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    title: "Full Stack Developer - Intern",
    description: "During my internship at **TedForge Solutions Pvt. Ltd.**, I spearheaded the development of high-performance web applications. I focused on building scalable frontend components with **React & Angular**, while architecting secure and efficient RESTful APIs using **Node.js**. I also optimized database queries in **MySQL and MongoDB**, significantly improving data retrieval speeds and overall system responsiveness.",
    icon: "/cards/card-1.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center"
        >
          Work <span className="text-purple-400">Experience</span>
        </motion.h2>
        
        <div className="flex justify-center">
          {experienceCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative bg-[#1E0D3A]/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 hover:border-purple-500/30 transition-all duration-700 flex flex-col lg:flex-row items-center lg:items-start gap-10 hover:bg-[#1E0D3A]/30 overflow-hidden max-w-4xl"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="flex-shrink-0 relative z-10 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </motion.div>
              
              <div className="relative z-10 text-center lg:text-left flex-1">
                <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                  Dec 2023 – May 2025
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
                  {card.description}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {["React", "Angular", "Node.js", "MySQL", "MongoDB"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 text-xs font-medium tracking-wider uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


