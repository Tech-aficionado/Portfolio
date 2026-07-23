"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface ResumeViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function ResumeViewer({
  url,
  title,
  onClose,
}: ResumeViewerProps): React.JSX.Element {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/70 backdrop-blur-sm p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} résumé preview`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_80px_rgba(23,19,14,0.35)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate font-display text-lg font-medium text-ink">
            {title}
            <span className="ml-2 text-xs font-normal uppercase tracking-[0.18em] text-muted">
              Résumé
            </span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent sm:inline-flex"
            >
              Open in new tab ↗
            </a>
            <a
              href={url}
              download
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent"
            >
              Download ↓
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close résumé preview"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-paper-2/40">
          <iframe
            src={`${url}#toolbar=1&view=FitH`}
            title={`${title} résumé`}
            className="h-full w-full"
          />
          <noscript>
            <p className="p-6 text-sm text-muted">
              Enable JavaScript or{" "}
              <a href={url} className="text-accent underline">
                open the PDF directly
              </a>
              .
            </p>
          </noscript>
        </div>
      </motion.div>
    </motion.div>
  );
}
