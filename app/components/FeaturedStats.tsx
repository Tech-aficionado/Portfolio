import { PORTFOLIO_STATS } from "../portfolio-stats";

const stats = [
  {
    value: `${PORTFOLIO_STATS.experienceYears}+`,
    label: "Years of experience",
    detail: "Dec 2023–May 2025 professional experience",
  },
  {
    value: String(PORTFOLIO_STATS.featuredProducts),
    label: "Featured products",
    detail: "Four product case studies showcased below",
  },
  {
    value: String(PORTFOLIO_STATS.aiProducts),
    label: "AI products",
    detail: "FiTrack AI and Quizify",
  },
  {
    value: String(PORTFOLIO_STATS.browserGames),
    label: "Browser games",
    detail: "Playable projects in the site arcade",
  },
];

export default function FeaturedStats(): React.JSX.Element {
  return (
    <section id="stats" className="px-4 py-20 sm:px-6 sm:py-28" aria-labelledby="stats-title">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Featured stats</p>
          <h2 id="stats-title" className="mt-4 font-display text-3xl font-medium text-ink sm:text-5xl">
            Proof, without the padding.
          </h2>
          <p className="mt-4 text-muted">
            Every number maps to dated experience or work you can inspect on this site.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-line bg-paper-2/40 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article key={stat.label} className="relative border-b border-line p-6 last:border-b-0 sm:p-8 sm:[&:nth-child(3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <span className="absolute right-5 top-5 text-[10px] tracking-[0.2em] text-muted/60">0{index + 1}</span>
              <p className="font-display text-5xl font-semibold leading-none text-ink">{stat.value}</p>
              <h3 className="mt-5 text-sm font-semibold text-ink">{stat.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
