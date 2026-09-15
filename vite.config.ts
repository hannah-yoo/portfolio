import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import tailwindcss from "@tailwindcss/vite";

// Plugin to duplicate index.html as 404.html for GitHub Pages SPA routing
const copy404Plugin = () => ({
  name: "copy-404",
  closeBundle() {
    const distDir = path.resolve(__dirname, "dist");
    const indexPath = path.join(distDir, "index.html");
    const notFoundPath = path.join(distDir, "404.html");
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
    }
  },
});

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
      copy404Plugin(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
