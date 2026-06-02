import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Separate Vite config for static GitHub Pages build (CSR / SPA mode).
// Does NOT use @lovable.dev/vite-tanstack-config or TanStack Start SSR.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  base: "/socialism-decoded-daily/",
  build: {
    outDir: "dist-static",
    emptyOutDir: true,
  },
});
