import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import vercel from "vite-plugin-vercel";

export default defineConfig({
  plugins: [
    react(),
    tanstackRouter(),
    vercel({
      entries: {
        ssr: { id: "endpoints/ssr.ts", name: "ssr", route: "/api/ssr" },
        hello: { id: "endpoints/api/hello.ts", name: "hello", route: "/api/hello" },
        creator: { id: "endpoints/api/creator.ts", name: "creator", route: "/api/creator" },
      },
      rewrites: [
        { source: "/api/(.*)", destination: "/api/$1" },
        { source: "/assets/(.*)", destination: "/assets/$1" },
        { source: "/(.*)", destination: "/api/ssr" },
      ],
      defaultSupportsResponseStreaming: true,
    }),
  ],
});
