import { PORTFOLIO_STATS } from "../portfolio-stats";
import HexMarker from "./HexMarker";

const stats = [
  {
    value: `${PORTFOLIO_STATS.experienceYears}+`,
    label: "Years of experience",
    detail: "Dec 2023 – May 2025 at TedForge Solutions",
  },
  {
    value: String(PORTFOLIO_STATS.liveProducts),
    label: "Products in production",
    detail: "Each one deployed at a public URL you can open now",
  },
  {
    value: String(PORTFOLIO_STATS.aiProducts),
    label: "LLM-backed products",
    detail: "FiTrack AI and Quizify, both running on Gemini",
  },
  {
    value: String(PORTFOLIO_STATS.openSourceProjects),
    label: "Open source",
    detail: "Ziplink, GhostRelay and DareStake, source on GitHub",
  },
];

export default function FeaturedStats(): React.JSX.Element {
  return (
    <section id="stats" className="px-4 py-20 sm:px-6 sm:py-28" aria-labelledby="stats-title">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <HexMarker index={1} label="Stats" />
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
