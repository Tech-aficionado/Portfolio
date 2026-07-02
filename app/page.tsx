"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import ScrollProgress from "./components/ScrollProgress";
import Banner from "./components/Banner";
import Experience from "./components/Experience";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-paper text-ink paper-grain overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="#home"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
            >
              Skip to content
            </a>
            <ScrollProgress />
            <Header />
            <Banner />
            <About />
            <Services />
            <Experience />
            <Projects />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
