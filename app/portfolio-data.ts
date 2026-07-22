import { PORTFOLIO_STATS } from "./portfolio-stats";

/**
 * Canonical, machine-readable source of truth for the portfolio.
 *
 * This module is intentionally free of JSX and framework specifics so it can be
 * consumed by UI components, the JSON API (`/api/profile`), the `llms.txt`
 * route, and structured data (JSON-LD) without duplication or drift.
 */

export const SITE_URL = "https://ash-labs.tech";

export interface SocialLink {
  label: string;
  url: string;
}

export interface Capability {
  iconKey: "frontend" | "backend" | "data" | "fullstack";
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

export interface Project {
  id: number;
  title: string;
  tag: string;
  outcome: string;
  image: string;
  stack: string[];
  link?: string;
  sourceLink?: string;
}

export const PROFILE = {
  name: "Shivansh Goel",
  headline: "AI Product Engineer & Full Stack Developer",
  tagline: "Building AI products for the real world.",
  summary:
    "AI Product Engineer and Full Stack Developer building dependable AI-enabled products with Next.js, Python, and cloud infrastructure. I turn AI ideas into dependable web products — from adaptive fitness and learning tools to privacy-first SaaS.",
  roles: ["AI Product Engineer", "Applied AI Builder", "Full Stack Developer"],
  location: {
    label: "India",
    country: "IN",
  },
  email: "shivansh.goela12@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1yd0N1QKORwi_b7wwOQcBD3sO3D1Y4-EL/view?usp=sharing",
  availability: "Open to AI product & full-stack roles",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/Tech-aficionado" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/shivansh-goel-5b2309174/" },
  { label: "Instagram", url: "https://www.instagram.com/shivanxx.__/" },
  { label: "Website", url: SITE_URL },
];

export const KNOWS_ABOUT: string[] = [
  "Artificial Intelligence",
  "Applied Machine Learning",
  "AI Product Development",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "AWS",
];

export const CAPABILITIES: Capability[] = [
  {
    iconKey: "frontend",
    title: "Frontend Development",
    description:
      "Accessible, responsive interfaces with clean component architecture and smooth, purposeful interactions.",
    skills: ["React", "Next.js", "Angular", "Tailwind CSS"],
  },
  {
    iconKey: "backend",
    title: "Backend Development",
    description:
      "Secure, well-structured RESTful APIs and services built for reliability and maintainable growth.",
    skills: ["Node.js", "Python", "REST APIs"],
  },
  {
    iconKey: "data",
    title: "Databases & Cloud",
    description:
      "Efficient data modeling and query optimization, with cloud deployments that scale on demand.",
    skills: ["MySQL", "MongoDB", "AWS"],
  },
  {
    iconKey: "fullstack",
    title: "Full Stack Solutions",
    description:
      "End-to-end product delivery — from architecture and implementation through to deployment and iteration.",
    skills: ["TypeScript", "System Design", "CI/CD"],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    role: "Full Stack Developer — Intern",
    company: "TedForge Solutions Pvt. Ltd.",
    period: "Dec 2023 – May 2025",
    description:
      "Across a 17-month internship, built React and Angular interfaces, developed Node.js REST APIs, and improved MySQL and MongoDB data paths. The work focused on reducing query overhead and making product interactions more responsive and dependable.",
    stack: ["React", "Angular", "Node.js", "MySQL", "MongoDB"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Ziplink",
    tag: "URL Shortener · SaaS",
    outcome:
      "Turns long URLs into trackable, brand-ready links that are easier to distribute across campaigns. QR downloads and edge redirects shorten the path from share to destination, while analytics make each link measurable.",
    stack: ["Next.js", "Firebase", "Edge Redirects"],
    link: "https://ziplink.ash-labs.tech",
    sourceLink: "https://github.com/Tech-aficionado/ZipLink---Open-Source",
    image: "/assets/ziplink.png",
  },
  {
    id: 2,
    title: "GhostRelay",
    tag: "Privacy · SaaS",
    outcome:
      "Keeps a real inbox out of sign-up forms by routing messages through disposable aliases. If an alias attracts spam, it can be disabled without changing the primary address — giving users a practical containment layer.",
    stack: ["Cloudflare Workers", "D1", "Next.js", "React 19", "Resend"],
    link: "https://ghostrelay.me",
    sourceLink: "https://github.com/Tech-aficionado/GhostRelay---Open-Source",
    image: "/assets/ghostrelay.png",
  },
  {
    id: 3,
    title: "FiTrack AI",
    tag: "AI · Fitness",
    outcome:
      "Brings workout, nutrition, and recovery signals into one adaptive flow. AI-guided intensity, macro breakdowns, and fatigue-aware recommendations reduce the manual work of reconciling separate fitness trackers.",
    stack: ["Next.js", "Python", "Machine Learning"],
    link: "https://fitrack-ai.ash-labs.tech/",
    image: "/assets/image 3.png",
  },
  {
    id: 4,
    title: "Quizify",
    tag: "AI · Education",
    outcome:
      "Turns a topic into a ready-to-run assessment in seconds, reducing manual question writing. Instant explanations and mastery tracking show learners what to review next, while classroom codes make sharing straightforward.",
    stack: ["Next.js", "React", "AI"],
    link: "https://quizify.ash-labs.tech",
    image: "/assets/image 2.png",
  },
];

export const PORTFOLIO = {
  profile: PROFILE,
  stats: PORTFOLIO_STATS,
  social: SOCIAL_LINKS,
  knowsAbout: KNOWS_ABOUT,
  capabilities: CAPABILITIES,
  experience: EXPERIENCE,
  projects: PROJECTS,
} as const;
