# Shivansh Goel — Portfolio 🚀

The personal portfolio of **Shivansh Goel** — a Full Stack Developer and Software Engineer. A fast, accessible, single-page site built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com), featuring a warm editorial design, smooth motion, and production-grade SEO.

🔗 **Live:** [ash-labs.tech](https://ash-labs.tech)

> ℹ️ The preview above shows the previous design and will be refreshed with a new screenshot.

## ✨ Features

- **Editorial light theme** — warm paper palette, bold serif display type, and a vivid coral accent
- **Cursor-follow spotlight** in the hero for a subtle interactive glow
- **Animated typing effect** cycling through roles (Full Stack Developer, Software Engineer, Web Developer)
- **Count-up stats** that animate into view
- **3D tilt** on project cards that respond to the pointer
- **Scroll progress bar** and **scroll-spy** navigation that highlights the active section
- **Responsive mobile menu** with an animated dropdown
- **Skills marquee** and a structured **Expertise** section
- **Accessibility built in** — skip-to-content link, keyboard focus states, and `prefers-reduced-motion` support
- **SEO ready** — metadata, Open Graph, `robots.txt`, `sitemap.xml`, PWA manifest, and Person JSON-LD structured data
- **Analytics** via Vercel Analytics

## 🧱 Tech Stack

| Area        | Tools                                             |
| ----------- | ------------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19                 |
| Language    | TypeScript                                        |
| Styling     | Tailwind CSS v4                                    |
| Animation   | Framer Motion                                     |
| Icons       | lucide-react, react-icons                         |
| Analytics   | @vercel/analytics                                 |

## ✍🏻 Typography

Loaded and optimized with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts):

- **[Fraunces](https://fonts.google.com/specimen/Fraunces)** — display / headings (serif, with italics)
- **[Inter](https://fonts.google.com/specimen/Inter)** — body / UI (sans-serif)

## 📁 Project Structure

```
app/
├── components/
│   ├── Header.tsx            # Nav, mobile menu, scroll-spy
│   ├── Banner.tsx            # Hero with spotlight, typing, count-up stats
│   ├── About.tsx             # Mission statement + skills marquee
│   ├── AnimatedTechSphere.tsx# Tech skills marquee
│   ├── Services.tsx          # Expertise cards
│   ├── Experience.tsx        # Work experience
│   ├── Projects.tsx          # Selected works (with 3D tilt)
│   ├── Footer.tsx            # Contact + socials
│   ├── SplashScreen.tsx      # Intro loader
│   ├── ScrollProgress.tsx    # Top progress bar
│   ├── CountUp.tsx           # Animated number counter
│   └── TiltCard.tsx          # 3D tilt wrapper
├── globals.css               # Design tokens & base styles
├── layout.tsx                # Fonts, metadata, JSON-LD
├── page.tsx                  # Page composition
├── manifest.ts               # PWA manifest
├── robots.ts                 # robots.txt
└── sitemap.ts                # sitemap.xml

public/assets/                # Images referenced by the app
```

## 🖼️ Project Images

Project and profile images live in `public/assets/` and are referenced in `Projects.tsx` and `Banner.tsx`.

## 🛠️ Development

```bash
# clone
git clone https://github.com/Tech-aficionado/portfolio.git
cd portfolio

# install
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start editing `app/page.tsx` — the page auto-updates as you save.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## 🚚 Deployment

Deployed on [Vercel](https://vercel.com/). Pushes to `main` deploy to production at [ash-labs.tech](https://ash-labs.tech), and each pull request gets its own preview deployment.

## 🏛 License

© Copyright 2026 Shivansh Goel

Feel free to fork and explore for learning. Please don't republish the site as a whole without written permission — the combination of typography, color, and layout is part of a personal brand identity. Remix it and make it your own instead.

---

⭐ If you found this project helpful or interesting, consider giving it a star!
