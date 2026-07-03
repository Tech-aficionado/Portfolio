import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-paper text-ink paper-grain flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-7xl sm:text-8xl font-medium leading-none">
          Lost the <span className="italic text-accent">thread</span>
        </h1>
        <p className="mt-6 text-base text-muted">
          This page wandered off — the link may be broken or the page may have
          moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
          >
            Back home
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink hover:border-ink/50 transition-colors"
          >
            Play a game instead
          </Link>
        </div>
      </div>
    </main>
  );
}
