"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    // Surface the error for debugging/monitoring.
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-paper text-ink paper-grain flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Something broke
        </p>
        <h1 className="mt-4 font-display text-6xl sm:text-7xl font-medium leading-none">
          Unexpected <span className="italic text-accent">error</span>
        </h1>
        <p className="mt-6 text-base text-muted">
          Sorry about that — something went wrong while rendering this page. You
          can try again or head back home.
        </p>
        {error?.digest && (
          <p className="mt-3 font-mono text-xs text-muted/70">
            ref: {error.digest}
          </p>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink hover:border-ink/50 transition-colors"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
