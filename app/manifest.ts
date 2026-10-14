import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivansh Goel — Full Stack Developer",
    short_name: "Shivansh Goel",
    description:
      "Full Stack Developer shipping AI-enabled products on the web and Android with Next.js, Flutter, and Python. Seven products in production, three on Google Play.",
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
