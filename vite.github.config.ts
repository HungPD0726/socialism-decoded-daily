import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

function githubPagesSpaFallback(): PluginOption {
  let outDir = "";

  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

function localChatApiPlugin(): PluginOption {
  return {
    name: "local-chat-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        try {
          const module = await server.ssrLoadModule("/api/chat.ts");
          await module.default(req, res);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

function loadServerEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");

  for (const key of ["GROQ_API_KEY", "GROQ_MODEL", "ALLOWED_ORIGIN"]) {
    process.env[key] ??= env[key];
  }
}

// Separate Vite config for static GitHub Pages build (CSR / SPA mode).
// Does NOT use @lovable.dev/vite-tanstack-config or TanStack Start SSR.
export default defineConfig(({ mode }) => {
  loadServerEnv(mode);

  return {
    plugins: [
      localChatApiPlugin(),
      tanstackRouter({ target: "react" }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
      githubPagesSpaFallback(),
    ],
    base: "/socialism-decoded-daily/",
    build: {
      outDir: "dist-static",
      emptyOutDir: true,
      target: "esnext",
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        input: "index.html",
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
  };
});
