import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeAux",
    short_name: "CodeAux",
    description:
      "Revenue-focused website design and development for ambitious businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#050608",
    theme_color: "#050608",
    icons: [
      {
        src: "/codeaux-logo.png",
        sizes: "1536x1536",
        type: "image/png",
      },
    ],
  };
}
