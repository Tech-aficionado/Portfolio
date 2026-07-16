"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function SplashOverlay(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <SplashScreen key="splash" finishLoading={finishLoading} />
      ) : null}
    </AnimatePresence>
  );
}
