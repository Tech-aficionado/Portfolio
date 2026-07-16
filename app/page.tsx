"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import ArcadeButton from "./components/ArcadeButton";
import CommandPalette from "./components/CommandPalette";
import SectionNav from "./components/SectionNav";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import Banner from "./components/Banner";
import FeaturedStats from "./components/FeaturedStats";
import Experience from "./components/Experience";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return (
    <main className="min-h-screen bg-paper text-ink paper-grain overflow-x-clip">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SectionNav />
      <Header />
      <Banner />
      <FeaturedStats />
      <About />
      <Services />
      <Experience />
      <Projects />
      <GitHubActivity />
      <Footer />
      <BackToTop />
      <ArcadeButton />
      <CommandPalette />
      <KonamiEasterEgg />

      <AnimatePresence>
        {isLoading ? (
          <SplashScreen key="splash" finishLoading={finishLoading} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
