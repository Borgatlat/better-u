import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BetterU AI - Your Personal Self-Improvement AI",
    short_name: "BetterU AI",
    description:
      "Transform your life with AI-powered personal development across facial enhancement, fitness, mental wellness, and smart shopping.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00f2fe",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
