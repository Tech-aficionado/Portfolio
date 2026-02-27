"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "FiTrack AI",
    description: "An AI-powered personal fitness assistant. It utilizes neural networks and adaptive machine learning algorithms to analyze performance patterns, dynamically adjust workout intensity, and provide real-time tracking for optimal fitness results.",
    link: "https://fitrack-ai.ash-labs.tech/",
    image: "/assets/image 3.png",
  },
  {
    id: 2,
    title: "Todotify",
    description: "A comprehensive task management solution allowing users to efficiently organize, track, and manage their daily workflows with a seamless user experience.",
    link: "https://todotify.ash-labs.tech",
    image: "/assets/image.png",
  },
  {
    id: 3,
    title: "Quizify",
    description: "An AI-powered quiz generation platform that crafts engaging learning experiences for users on any topic, complete with an interactive UI.",
    link: "https://quizify.ash-labs.tech",
    image: "/assets/image 2.png",
  }
];

export default function Projects(): React.JSX.Element {
  return (
    <section id="lab" className="py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
        >
          Selected <span className="text-purple-400">Works</span>
        </motion.h2>

        {featuredProjects.map((project, index) => {
          const isEven = index % 2 === 1;
          
          return (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 sm:mb-20 lg:mb-32 last:mb-0"
            >
              <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                isEven ? "lg:grid-flow-dense" : ""
              }`}>
                {/* Text Content */}
                <div className={`${isEven ? "lg:col-start-2" : ""}`}>
                  <motion.p 
                    initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-purple-400 text-base sm:text-lg lg:text-xl mb-2 font-medium"
                  >
                    Featured Project
                  </motion.p>
                  <motion.h3 
                    initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-4xl font-bold text-white mb-6"
                  >
                    {project.title}
                  </motion.h3>
                  
                  {/* Description Card - extends over image on LG, full width on Mobile */}
                  <div className="relative z-10 mb-6 sm:mb-8">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className={`bg-gradient-to-br from-[#1E0D3A]/90 to-[#120526]/95 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl ${
                        isEven ? "lg:ml-[-15%] lg:mr-0" : "lg:mr-[-15%] lg:ml-0"
                      }`}
                    >
                      <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Website link */}
                  {project.link && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                        aria-label="Visit project website"
                      >
                        <span className="text-sm font-medium">View Live Site</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    </motion.div>
                  )}
                </div>

                {/* Image Content */}
                <div className={`${isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotate: isEven ? -2 : 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900/50 p-2 sm:p-2 lg:p-3 shadow-2xl backdrop-blur-sm border border-white/5 hover:border-purple-500/30 transition-colors duration-500"
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#0A0A0A]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


