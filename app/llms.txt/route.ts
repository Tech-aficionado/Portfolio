import { PORTFOLIO, PROFILE, SITE_URL } from "../portfolio-data";

/**
 * llms.txt — a plain-text, LLM-friendly summary of this site.
 * See https://llmstxt.org for the emerging convention.
 */

export const revalidate = 21600; // 6 hours

export function GET(): Response {
  const projects = PORTFOLIO.projects
    .map((project) => {
      const links = [
        project.link ? `Live: ${project.link}` : null,
        project.sourceLink ? `Source: ${project.sourceLink}` : null,
      ]
        .filter(Boolean)
        .join(" · ");
      return `- [${project.title}](${project.link ?? SITE_URL}): ${project.tag}. ${project.outcome}${
        links ? ` (${links})` : ""
      }`;
    })
    .join("\n");

  const experience = PORTFOLIO.experience
    .map(
      (item) =>
        `- ${item.role}, ${item.company} (${item.period}): ${item.description}`
    )
    .join("\n");

  const capabilities = PORTFOLIO.capabilities
    .map((cap) => `- ${cap.title}: ${cap.description} [${cap.skills.join(", ")}]`)
    .join("\n");

  const social = PORTFOLIO.social
    .map((link) => `- ${link.label}: ${link.url}`)
    .join("\n");

  const body = `# ${PROFILE.name}

> ${PROFILE.headline}. ${PROFILE.summary}

- Location: ${PROFILE.location.label}
- Availability: ${PROFILE.availability}
- Email: ${PROFILE.email}
- Website: ${SITE_URL}
- Résumé: ${PROFILE.resumeUrl}
- Structured data (JSON): ${SITE_URL}/api/profile

## Roles
${PROFILE.roles.map((role) => `- ${role}`).join("\n")}

## At a glance
- Years of experience: ${PORTFOLIO.stats.experienceYears}+
- Featured products: ${PORTFOLIO.stats.featuredProducts}
- AI products: ${PORTFOLIO.stats.aiProducts}
- Browser games: ${PORTFOLIO.stats.browserGames}

## Skills
${PORTFOLIO.knowsAbout.map((skill) => `- ${skill}`).join("\n")}

## Capabilities
${capabilities}

## Experience
${experience}

## Projects
${projects}

## Links
${social}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
