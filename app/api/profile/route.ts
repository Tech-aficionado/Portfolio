import { NextResponse } from "next/server";
import { PORTFOLIO, PROFILE, SITE_URL } from "../../portfolio-data";

/**
 * Public, machine-readable portfolio data.
 *
 * Returns a stable JSON document that any AI agent, crawler, or online tool can
 * fetch cross-origin. The data is static per build/deploy, so it is cached
 * aggressively at the edge and revalidated periodically.
 */

export const revalidate = 21600; // 6 hours

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export function GET(): NextResponse {
  const payload = {
    $schema: "https://schema.org/Person",
    generatedAt: new Date().toISOString(),
    source: `${SITE_URL}/api/profile`,
    profile: {
      name: PROFILE.name,
      headline: PROFILE.headline,
      tagline: PROFILE.tagline,
      summary: PROFILE.summary,
      roles: PROFILE.roles,
      location: PROFILE.location,
      email: PROFILE.email,
      availability: PROFILE.availability,
      resumeUrl: PROFILE.resumeUrl,
      website: SITE_URL,
    },
    stats: PORTFOLIO.stats,
    skills: PORTFOLIO.knowsAbout,
    capabilities: PORTFOLIO.capabilities,
    experience: PORTFOLIO.experience,
    projects: PORTFOLIO.projects.map((project) => ({
      title: project.title,
      category: project.tag,
      outcome: project.outcome,
      stack: project.stack,
      liveUrl: project.link ?? null,
      sourceUrl: project.sourceLink ?? null,
    })),
    social: PORTFOLIO.social,
  };

  return NextResponse.json(payload, {
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}

export function OPTIONS(): NextResponse {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
