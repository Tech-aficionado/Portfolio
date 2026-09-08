import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivansh Goel — Full Stack Developer",
    short_name: "Shivansh Goel",
    description:
      "Full Stack Developer building AI-enabled web products with Next.js, Python, and cloud infrastructure. Six products live in production.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#f4f1e9",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
