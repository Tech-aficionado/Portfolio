import { NextResponse } from "next/server";
import { PORTFOLIO, PROFILE, SITE_URL } from "../../portfolio-data";

// Public JSON feed of the portfolio for agents and tools. CORS-open, edge-cached.

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
    roles: PORTFOLIO.roles.map((role) => ({
      id: role.id,
      title: role.title,
      summary: role.summary,
      focus: role.focus,
      skills: role.skills,
      resumeUrl: `${SITE_URL}${role.resumeUrl}`,
      exploreUrl: `${SITE_URL}/?role=${role.id}#roles`,
    })),
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
