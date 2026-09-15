import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const base = process.env.BASE_URL || (process.env.GITHUB_ACTIONS || isProd ? "/portfolio/" : "/");

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      tailwindcss(),
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
