import { PORTFOLIO_STATS } from "./portfolio-stats";

// All portfolio content lives here so the UI, API, and llms.txt stay in sync.

export const SITE_URL = "https://0xshiv.dev";

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
  headline: "Full Stack Developer & AI Product Engineer",
  tagline: "Building AI products for the real world.",
  summary:
    "Full Stack Developer building AI-enabled web products with Next.js, Python, and cloud infrastructure. Professional experience is 17 months of full-stack product work; the AI work is self-directed and shipped — adaptive fitness, document-grounded assessments, and privacy-first SaaS, all live and inspectable.",
  roles: ["Full Stack Developer", "AI Product Engineer"],
  location: {
    label: "India",
    country: "IN",
  },
  email: "shivansh.goela12@gmail.com",
  // Canonical résumé. Role-specific variants live in ROLES below.
  resumeUrl: "/resumes/resume_ShivanshGoel_FullStack.pdf",
  availability: "Open to full-stack & AI product roles",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/Tech-aficionado" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/shivansh-goel-5b2309174/" },
  { label: "Instagram", url: "https://www.instagram.com/shivanxx.__/" },
  { label: "Hashnode", url: "https://tech-aficionado.hashnode.dev" },
  { label: "Dev.to", url: "https://dev.to/tech-aficionado" },
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
      "A 17-month internship — long enough to own features end to end rather than shadow them. Built client-facing React and Angular interfaces, developed Node.js REST APIs, and reworked MySQL and MongoDB queries to cut overhead on data-heavy screens.",
    stack: ["React", "Angular", "Node.js", "MySQL", "MongoDB"],
  },
];

export interface Role {
  id: string;
  title: string;
  blurb: string;
  summary: string;
  focus: string[];
  skills: string[];
  resumeUrl: string;
}

// Two tracks only. The underlying work is the same body of evidence — splitting it
// into more variants than that reads as keyword targeting, not depth.
// Deep-linkable via ?role=<id>.
export const ROLES: Role[] = [
  {
    id: "full-stack",
    title: "Full Stack Developer",
    blurb: "End-to-end product delivery, frontend to backend.",
    summary:
      "Full Stack Developer building production web applications end to end with React, Next.js, and Node.js on serverless infrastructure. This is the track my paid experience sits in: 17 months building client-facing React and Angular interfaces, Node.js REST APIs, and MySQL/MongoDB data layers, plus five self-directed products shipped and running in the open.",
    focus: [
      "End-to-end feature delivery",
      "Responsive UIs with React & Next.js",
      "REST APIs & database-backed services",
      "Deployment on edge and serverless platforms",
    ],
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Angular",
      "Python",
      "Supabase",
      "MySQL",
      "Cloudflare Workers",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_FullStack.pdf",
  },
  {
    id: "ai-ml",
    title: "AI Product Engineer",
    blurb: "LLM features in shipped products: retrieval, prompting, cost.",
    summary:
      "AI Product Engineer integrating LLMs into live web products — document-grounded retrieval, prompt design for structured output, and server-side model calls that keep API keys off the client. My AI work is self-directed rather than employed: two products in production, both Gemini-backed, both with the retrieval and caching decisions made under real latency and cost constraints.",
    focus: [
      "Retrieval-augmented generation over user documents",
      "Prompt design for schema-consistent output",
      "Server-side model calls & API key handling",
      "Cutting repeat inference cost with caching",
    ],
    skills: [
      "Google Gemini",
      "RAG",
      "Embeddings",
      "Prompt Engineering",
      "Python",
      "FastAPI",
      "Redis",
      "Next.js",
      "Supabase",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_AI_ML.pdf",
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
    link: "https://ziplink.0xshiv.dev",
    sourceLink: "https://github.com/Tech-aficionado/ZipLink---Open-Source",
    image: "/assets/ziplink.webp",
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
    image: "/assets/ghostrelay.webp",
  },
  {
    id: 3,
    title: "FiTrack AI",
    tag: "AI · Fitness",
    outcome:
      "Brings workout, nutrition, and recovery signals into one adaptive flow. AI-guided intensity, macro breakdowns, and fatigue-aware recommendations reduce the manual work of reconciling separate fitness trackers.",
    stack: ["Next.js", "Python", "Google Gemini"],
    link: "https://fittrack.0xshiv.dev/",
    image: "/assets/fittrack.webp",
  },
  {
    id: 4,
    title: "Quizify",
    tag: "AI · Education",
    outcome:
      "Turns a topic into a ready-to-run assessment in seconds, reducing manual question writing. Instant explanations and mastery tracking show learners what to review next, while classroom codes make sharing straightforward.",
    stack: ["Next.js", "Google Gemini", "RAG", "Redis"],
    link: "https://quizify.0xshiv.dev",
    image: "/assets/quizify.webp",
  },
  {
    id: 5,
    title: "DareStake",
    tag: "Accountability · PWA",
    outcome:
      "Puts a real cost behind a daily commitment: two people set dares for each other, and a missed deadline moves money to a shared jar instead of passing unnoticed. Deadlines resolve against a single fixed timezone so a late-night check-in lands on the day the user meant, and penalties are claimed in a transaction so the same miss can never be charged twice.",
    stack: ["Next.js", "TypeScript", "Firestore", "PWA", "Vitest"],
    link: "https://darestake.0xshiv.dev",
    sourceLink: "https://github.com/Tech-aficionado/darestake",
    image: "/assets/darestake.webp",
  },
];

export const PORTFOLIO = {
  profile: PROFILE,
  stats: PORTFOLIO_STATS,
  social: SOCIAL_LINKS,
  knowsAbout: KNOWS_ABOUT,
  roles: ROLES,
  capabilities: CAPABILITIES,
  experience: EXPERIENCE,
  projects: PROJECTS,
} as const;
