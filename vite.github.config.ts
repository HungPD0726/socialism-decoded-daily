import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Separate Vite config for static GitHub Pages build (CSR / SPA mode).
// Does NOT use @lovable.dev/vite-tanstack-config or TanStack Start SSR.
export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), react(), tailwindcss(), tsconfigPaths()],
  base: "/socialism-decoded-daily/",
  build: {
    outDir: "dist-static",
    emptyOutDir: true,
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // Extract the package name (handles scoped packages like @radix-ui/react-*)
          const match = id.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
          const pkg = match?.[1];
          if (!pkg) return;

          // Core React runtime + scheduler (react-dom's internal dep) — maximize cache hit
          if (pkg === "react" || pkg === "react-dom" || pkg === "scheduler") {
            return "vendor-react";
          }
          // TanStack router + query
          if (pkg.startsWith("@tanstack/")) {
            return "vendor-tanstack";
          }
          // Radix UI — large but stable
          if (pkg.startsWith("@radix-ui/")) {
            return "vendor-radix";
          }
          // Lucide icons — many small SVGs, rarely changes
          if (pkg === "lucide-react") {
            return "vendor-lucide";
          }
          // Everything else in node_modules → shared vendor chunk
          return "vendor-misc";
        },
      },
    },
  },
});
