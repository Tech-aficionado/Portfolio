<div align="center">

# ✦ Shivansh Goel — Portfolio

**A warm, editorial developer portfolio** — fast, accessible, and packed with delightful detail.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

### [🌐 Live at ash-labs.tech →](https://ash-labs.tech)

</div>

---

The personal portfolio of **Shivansh Goel**, a Full Stack Developer & Software Engineer. Built as a single-page experience with a warm editorial aesthetic, buttery motion, a light/dark theme, a mini-games arcade, and a real contact backend.

## ✨ Highlights

**🎨 Design & experience**
- Warm editorial theme with a serif display face, coral accent, and a token-driven **light / dark mode** (defaults to the visitor's system, then remembers their choice)
- Cursor-follow spotlight hero, typing effect, animated count-up stats, and 3D-tilt project cards
- Smooth scroll, a scroll-progress bar, and a scroll-spy section navigator

**⚡ Interactive**
- **Command palette** (`⌘K` / `Ctrl+K`) to jump anywhere, toggle theme, copy email, or open socials
- **Mini-games arcade** (`/play`) — 8 games with locally saved high scores
- A hidden **Konami-code** easter egg 🎮 with confetti

**🔧 Engineering**
- **Working contact form** backed by a Next.js route handler → server-side validation, honeypot, rate limiting, and transactional email via **Brevo** (with a graceful `mailto` fallback)
- Fully **responsive** and **accessible** — skip link, keyboard focus states, `prefers-reduced-motion`
- **SEO-ready** — metadata, Open Graph, dynamic OG image, `robots.txt`, `sitemap.xml`, PWA manifest, and Person JSON-LD
- Custom **404** and **error boundaries**

## 🧱 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-variable design tokens) |
| Animation | Framer Motion |
| Email | Brevo (transactional API) |
| Icons | lucide-react, react-icons |
| Analytics | @vercel/analytics |

## 📁 Structure

```
app/
├── components/           # Header, Banner, About, Services, Experience,
│                         # Projects, Footer, ContactForm, CommandPalette,
│                         # ThemeToggle, SectionNav, arcade widgets, …
├── play/                 # Mini-games arcade (hub + 8 games)
├── api/contact/          # Contact route handler + Brevo email templates
├── globals.css           # Design tokens, light/dark themes
├── layout.tsx            # Fonts, metadata, JSON-LD, theme bootstrap
├── page.tsx              # Page composition
├── opengraph-image.tsx   # Dynamic social card
├── manifest.ts / robots.ts / sitemap.ts
├── not-found.tsx / error.tsx / global-error.tsx
```

## 🛠️ Getting Started

```bash
git clone https://github.com/Tech-aficionado/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx` and it hot-reloads.

```bash
npm run build   # production build
npm run start   # serve the build
npm run lint    # lint
```

## 📬 Contact Form (Brevo)

The contact form posts to `app/api/contact/route.ts` with server-side validation, a
honeypot, and rate limiting. Emails go out via [Brevo](https://www.brevo.com/) — a
**notification** to the owner and a branded **receipt** to the visitor. Without
configuration it gracefully falls back to a prefilled `mailto:` draft.

Create `.env.local`:

```bash
# Brevo API key — https://app.brevo.com/settings/keys/api  (starts with "xkeysib-")
BREVO_API_KEY=

# "From" address — must be a verified sender: https://app.brevo.com/senders/list
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=Shivansh Goel

# Inbox that receives contact notifications
CONTACT_TO_EMAIL=shivansh.goela12@gmail.com
```

| Variable | Required | Description |
| --- | --- | --- |
| `BREVO_API_KEY` | ✅ | Brevo transactional email API key |
| `BREVO_SENDER_EMAIL` | ✅ | Verified Brevo sender address (the `from`) |
| `BREVO_SENDER_NAME` | — | Sender display name (default: Shivansh Goel) |
| `CONTACT_TO_EMAIL` | — | Where notifications are delivered |

> Restart the dev server after editing `.env.local`. On Vercel, add the same
> variables under **Project → Settings → Environment Variables**.

## 🚚 Deployment

Deployed on [Vercel](https://vercel.com/). Pushes to `main` ship to production at
[ash-labs.tech](https://ash-labs.tech); every pull request gets a preview deployment.

## 🏛 License

© 2026 Shivansh Goel. Fork and explore for learning, but please don't republish the
site as a whole — the typography, color, and layout are part of a personal brand
identity. Remix it and make it your own instead.

---

<div align="center">

⭐ If this was helpful or interesting, consider leaving a star.

</div>
