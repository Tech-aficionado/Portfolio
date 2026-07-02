import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivansh Goel — Full Stack Developer",
    short_name: "Shivansh Goel",
    description:
      "A passionate Full Stack Developer and Software Engineer. Creating meaningful and robust digital solutions.",
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
