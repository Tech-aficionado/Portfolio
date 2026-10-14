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
  /** Public Google Play listing, for products that ship an Android app. */
  playStoreLink?: string;
  /** Where the product runs; drives the structured-data operatingSystem. */
  platforms: ("Web" | "Android")[];
}

const playStore = (packageId: string): string =>
  `https://play.google.com/store/apps/details?id=${packageId}`;

export const PROFILE = {
  name: "Shivansh Goel",
  headline: "Full Stack Developer & AI Developer",
  tagline: "Building AI products for the real world.",
  summary:
    "Full Stack Developer shipping AI-enabled products across web and Android with Next.js, Flutter, Python, and cloud infrastructure. Professional experience is 17 months of full-stack product work; the rest is self-directed and live — three apps on Google Play in production (FiTrack AI, Quizify, and the idle game AI Agent Empire) plus four web products, all inspectable.",
  roles: ["Full Stack Developer", "AI Developer"],
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
  "Flutter",
  "Android Development",
  "AWS",
];

export const CAPABILITIES: Capability[] = [
  {
    iconKey: "frontend",
    title: "Web & Mobile Frontends",
    description:
      "Accessible, responsive interfaces for the browser and Android — clean component architecture, offline-first state, and interactions that feel deliberate on every screen size.",
    skills: ["React", "Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    iconKey: "backend",
    title: "Backend & AI Services",
    description:
      "Secure APIs and serverless functions that keep model calls and keys on the server — authenticated, rate-limited, and observable in production.",
    skills: ["Node.js", "Python", "Supabase Edge Functions", "Google Gemini"],
  },
  {
    iconKey: "data",
    title: "Databases & Cloud",
    description:
      "Data models with constraints that hold under real traffic, plus deployments on edge and serverless platforms that scale without a babysitter.",
    skills: ["PostgreSQL", "Firestore", "MySQL", "Cloudflare", "AWS"],
  },
  {
    iconKey: "fullstack",
    title: "Shipping & Release",
    description:
      "End-to-end delivery through to the store: CI-built signed releases, staged Google Play rollouts from testing to production, crash reporting, and iteration on real usage.",
    skills: ["TypeScript", "GitHub Actions", "Google Play", "Firebase"],
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
      "Full Stack Developer building production web applications end to end with React, Next.js, and Node.js on serverless infrastructure. This is the track my paid experience sits in: 17 months building client-facing React and Angular interfaces, Node.js REST APIs, and MySQL/MongoDB data layers, plus seven self-directed products shipped and running in the open — four on the web and three released to production on Google Play.",
    focus: [
      "End-to-end feature delivery",
      "Responsive UIs with React, Next.js & Flutter",
      "REST APIs & database-backed services",
      "Signed CI releases to the web and Google Play",
    ],
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Flutter",
      "Python",
      "Supabase",
      "Firebase",
      "Cloudflare Workers",
    ],
    resumeUrl: "/resumes/resume_ShivanshGoel_FullStack.pdf",
  },
  {
    id: "ai-ml",
    title: "AI Developer",
    blurb: "LLM features in shipped products: retrieval, prompting, cost.",
    summary:
      "AI Developer integrating LLMs into live web products — document-grounded retrieval, prompt design for structured output, and server-side model calls that keep API keys off the client. My AI work is self-directed rather than employed: three products in production, all Gemini-backed — two of them also shipped as Android apps on Google Play — with retrieval and caching decisions made under real latency and cost constraints.",
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

// Ordered by weight: the three Google Play production releases lead, then web products.
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FiTrack AI",
    tag: "AI · Fitness · Android & Web",
    outcome:
      "Brings workouts, nutrition, hydration and recovery into one adaptive plan instead of four separate trackers. Gemini builds targets and training plans server-side, the exercise library ships preloaded so it opens instantly offline, and the Android app is live on Google Play in production — released through a signed CI pipeline after a staged open-testing rollout.",
    stack: ["Flutter", "Next.js", "Supabase", "Google Gemini", "Firebase App Check"],
    link: "https://fittrack.0xshiv.dev/",
    playStoreLink: playStore("com.fittrackai.fit_track_ai_mobile"),
    platforms: ["Android", "Web"],
    image: "/assets/fittrack.webp",
  },
  {
    id: 2,
    title: "Quizify",
    tag: "AI · Education · Android & Web",
    outcome:
      "Turns a topic or an uploaded document into a ready-to-run quiz in seconds, so nobody writes questions by hand. Answers come with instant explanations, mastery tracking shows what to review next, and Quiz Arena adds live head-to-head rounds with per-arena leaderboards. Available on the web and as an Android app on Google Play.",
    stack: ["Flutter", "Next.js", "Google Gemini", "RAG", "Supabase"],
    link: "https://quizify.0xshiv.dev",
    playStoreLink: playStore("com.quizify.mobile"),
    platforms: ["Android", "Web"],
    image: "/assets/quizify.webp",
  },
  {
    id: 3,
    title: "AI Agent Empire",
    tag: "Game · Idle Tycoon · Android",
    outcome:
      "An idle tycoon where you grow a one-laptop AI startup into a datacenter empire: deploy agents, build out compute, research toward AGI, then prestige to go faster each run. The whole economy is pure, time-parameterised functions, so offline progress is exact and hundreds of simulation tests can replay weeks of play in milliseconds to keep the balance honest. Live on Google Play with Play Games sign-in and achievements.",
    stack: ["Flutter", "Flame", "Riverpod", "Play Games Services", "Firebase"],
    playStoreLink: playStore("com.aiagentempire.ai_agent_empire"),
    platforms: ["Android"],
    image: "/assets/ai-agent-empire.webp",
  },
  {
    id: 4,
    title: "GhostRelay",
    tag: "Privacy · SaaS",
    outcome:
      "Keeps a real inbox out of sign-up forms by routing messages through disposable aliases. If an alias attracts spam, it can be disabled without changing the primary address — giving users a practical containment layer.",
    stack: ["Cloudflare Workers", "D1", "Next.js", "React 19", "Resend"],
    link: "https://ghostrelay.me",
    sourceLink: "https://github.com/Tech-aficionado/GhostRelay---Open-Source",
    platforms: ["Web"],
    image: "/assets/ghostrelay.webp",
  },
  {
    id: 5,
    title: "Ziplink",
    tag: "URL Shortener · SaaS",
    outcome:
      "Turns long URLs into trackable, brand-ready links that are easier to distribute across campaigns. QR downloads and edge redirects shorten the path from share to destination, while analytics make each link measurable.",
    stack: ["Next.js", "Firebase", "Edge Redirects"],
    link: "https://ziplink.0xshiv.dev",
    sourceLink: "https://github.com/Tech-aficionado/ZipLink---Open-Source",
    platforms: ["Web"],
    image: "/assets/ziplink.webp",
  },
  {
    id: 6,
    title: "DareStake",
    tag: "Accountability · PWA",
    outcome:
      "Puts a real cost behind a daily commitment: two people set dares for each other, and a missed deadline moves money to a shared jar instead of passing unnoticed. Deadlines resolve against a single fixed timezone so a late-night check-in lands on the day the user meant, and penalties are claimed in a transaction so the same miss can never be charged twice.",
    stack: ["Next.js", "TypeScript", "Firestore", "PWA", "Vitest"],
    link: "https://darestake.0xshiv.dev",
    sourceLink: "https://github.com/Tech-aficionado/darestake",
    platforms: ["Web"],
    image: "/assets/darestake.webp",
  },
  {
    id: 7,
    title: "MoodRadio",
    tag: "AI · Music",
    outcome:
      "Takes a sentence about how someone feels and returns music that matches it, instead of asking the listener to pick a genre first. The interface adopts the colour of the detected emotion so the mood is visible, not just inferred, and candidate tracks are scored against the listener's own YouTube library and recent plays so the same few artists stop resurfacing.",
    stack: ["Next.js", "TypeScript", "Google Gemini", "YouTube Data API", "Firebase"],
    link: "https://moodradio.0xshiv.dev",
    sourceLink: "https://github.com/Tech-aficionado/MoodRadio",
    platforms: ["Web"],
    image: "/assets/moodradio.webp",
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
