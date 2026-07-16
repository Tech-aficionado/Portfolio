interface GitHubProfile {
  public_repos: number;
  html_url: string;
}

interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const GITHUB_USER = "Tech-aficionado";
const FEATURED_REPOSITORIES = [
  "Tamagochi---Open-Source-Game",
  "ZipLink---Open-Source",
  "CraftFolio---Open-Sourced-Minecraft-Portfolio-Library",
  "GhostRelay---Open-Source",
];
const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "ZipLink---Open-Source": "Open-source URL shortening project.",
  "GhostRelay---Open-Source": "Open-source privacy-first email aliasing service.",
};

async function getGitHubData() {
  try {
    const options = {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 21600 },
    };
    const [profileResponse, repositoriesResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, options),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, options),
    ]);
    if (!profileResponse.ok || !repositoriesResponse.ok) return null;

    const profile = (await profileResponse.json()) as GitHubProfile;
    const repositories = (await repositoriesResponse.json()) as GitHubRepository[];
    const owned = repositories.filter((repository) => !repository.fork && !repository.archived);
    const highlights = FEATURED_REPOSITORIES.map((name) =>
      owned.find((repository) => repository.name === name)
    ).filter((repository): repository is GitHubRepository => Boolean(repository));

    return {
      profile,
      highlights,
      totalStars: owned.reduce((total, repository) => total + repository.stargazers_count, 0),
    };
  } catch {
    return null;
  }
}
export default async function GitHubActivity(): Promise<React.JSX.Element> {
  const data = await getGitHubData();
  const profileUrl = data?.profile.html_url ?? `https://github.com/${GITHUB_USER}`;

  return (
    <section id="open-source" className="px-4 py-20 sm:px-6 sm:py-32" aria-labelledby="open-source-title">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">GitHub / Open Source</p>
            <h2 id="open-source-title" className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl">
              Building in public.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Reusable tools, product experiments, and source code you can inspect — refreshed from GitHub every six hours.
            </p>
          </div>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent lg:col-span-4 lg:justify-self-end">
            View GitHub profile
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        {data ? (
          <>
            <div className="mt-12 grid overflow-hidden rounded-2xl border border-line bg-paper-2/40 sm:grid-cols-3">
              {[
                [data.profile.public_repos, "Public repositories"],
                [data.totalStars, "Stars across owned repos"],
                [data.highlights.length, "Open-source highlights"],
              ].map(([value, label]) => (
                <div key={label} className="border-b border-line p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="font-display text-4xl font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {data.highlights.map((repository) => (
                <a key={repository.name} href={repository.html_url} target="_blank" rel="noopener noreferrer" className="group rounded-[1.5rem] border border-line bg-paper p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_45px_rgba(23,19,14,0.08)] sm:p-7">
                  <div className="flex items-center justify-between gap-4 text-xs text-muted">
                    <span>{repository.language ?? "Repository"}</span>
                    <span>★ {repository.stargazers_count}</span>
                  </div>
                  <h3 className="mt-5 break-words font-display text-2xl font-medium text-ink transition-colors group-hover:text-accent">
                    {repository.name.replaceAll("---", " ").replaceAll("-", " ")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {repository.description ?? FALLBACK_DESCRIPTIONS[repository.name] ?? "Open-source project by Shivansh Goel."}
                  </p>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-muted/70">
                    Updated {new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(repository.pushed_at))}
                  </p>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-12 rounded-2xl border border-line bg-paper-2/40 p-8 text-muted">
            Live GitHub activity is temporarily unavailable. The profile and repositories remain available through the link above.
          </div>
        )}
      </div>
    </section>
  );
}
