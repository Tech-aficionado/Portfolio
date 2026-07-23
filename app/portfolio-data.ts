import { PORTFOLIO_STATS } from "./portfolio-stats";

// All portfolio content lives here so the UI, API, and llms.txt stay in sync.

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
      "Across a 17-month internship, built React and Angular interfaces, developed Node.js REST APIs, and improved MySQL and MongoDB data paths. The work focused on reducing query overhead and making product interactions more responsive and dependable.",
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

// One entry per hiring track, each with its own résumé. Deep-linkable via ?role=<id>.
export const ROLES: Role[] = [
  {
    id: "ai-ml",
    title: "AI / ML Engineer",
    blurb: "Production LLM apps, RAG, and AI agents.",
    summary:
      "AI/ML Engineer building production LLM applications with Retrieval-Augmented Generation (RAG), AI agents, and prompt engineering. Integrates Google Gemini into live products, designs embedding and retrieval pipelines, and hardens AI features with secure server-side model routing — focused on accuracy, grounding, latency, and cost.",
    focus: [
      "RAG pipelines & semantic retrieval",
      "Prompt engineering for structured output",
      "AI security middleware & model routing",
      "Latency & cost optimization with caching",
    ],
    skills: [
      "Google Gemini",
      "RAG",
      "Embeddings",
      "AI Agents",
      "Prompt Engineering",
      "Python",
      "FastAPI",
      "Redis",
      "NLP",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_AI_ML.pdf",
  },
  {
    id: "full-stack",
    title: "Full Stack Developer",
    blurb: "End-to-end product delivery, frontend to backend.",
    summary:
      "Full Stack Developer building production web applications end to end with React, Next.js, and Node.js on modern serverless infrastructure. Designs responsive interfaces, builds REST APIs and database-backed services, and ships features from design through deployment — owning both the frontend experience and the backend logic, including AI and LLM integrations.",
    focus: [
      "End-to-end feature delivery",
      "Responsive UIs with React & Next.js",
      "REST APIs & database-backed services",
      "AI/LLM integration & deployment",
    ],
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "TypeScript",
      "Python",
      "Supabase",
      "Redis",
      "Cloudflare Workers",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_FullStack.pdf",
  },
  {
    id: "backend",
    title: "Backend Developer",
    blurb: "Secure, scalable server-side systems.",
    summary:
      "Backend Developer building secure, scalable server-side systems with Node.js, FastAPI, and Python on serverless and edge infrastructure. Designs REST APIs, database schemas, and caching layers, and hardens services with authentication, API-key proxying, and request gating — optimizing latency and cost through Redis caching and efficient data access.",
    focus: [
      "REST API & database schema design",
      "Caching layers & query optimization",
      "API security, auth & request gating",
      "LLM backends & server-side model routing",
    ],
    skills: [
      "Node.js",
      "FastAPI",
      "Python",
      "REST APIs",
      "Supabase (PostgreSQL)",
      "Redis",
      "Cloudflare D1",
      "MySQL",
      "RAG",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_Backend.pdf",
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    blurb: "Responsive, component-driven interfaces.",
    summary:
      "Frontend Developer building responsive, production-ready user interfaces with React, Next.js, and Angular. Translates requirements into clean, component-driven UIs with Tailwind CSS, PrimeNG, and MUI, integrates REST and AI-powered APIs, and optimizes performance and stability — focused on accessible, maintainable frontends across desktop and mobile.",
    focus: [
      "Component-driven, accessible UI",
      "Responsive design across devices",
      "Client-side state & SSR (Next.js)",
      "REST & AI-powered API integration",
    ],
    skills: [
      "React",
      "React 19",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "PrimeNG",
      "MUI",
      "Responsive Design",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_Frontend.pdf",
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
  roles: ROLES,
  capabilities: CAPABILITIES,
  experience: EXPERIENCE,
  projects: PROJECTS,
} as const;
