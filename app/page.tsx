"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#110720] text-white">
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
            <Header />
            <Banner />
            <Experience />
            <About />
            <Projects />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

